<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\AccountReceivable;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;

class AccountReceivableController extends Controller
{
    /**
     * Display a listing of account receivables
     */
    public function index(Request $request)
    {
        $query = AccountReceivable::with(['customer', 'invoice', 'salesOrder'])
            ->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($customerQuery) use ($search) {
                        $customerQuery->where('company_name', 'like', "%{$search}%");
                    });
            });
        }

        // Status filter
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Customer filter
        if ($request->has('customer_id') && $request->customer_id) {
            $query->where('customer_id', $request->customer_id);
        }

        // Date range filter
        if ($request->has('date_from') && $request->date_from) {
            $query->where('invoice_date', '>=', $request->date_from);
        }
        if ($request->has('date_to') && $request->date_to) {
            $query->where('invoice_date', '<=', $request->date_to);
        }

        $receivables = $query->paginate(15);

        // Calculate summary
        $summary = [
            'total_outstanding' => AccountReceivable::sum('outstanding_amount'),
            'total_overdue' => AccountReceivable::where('status', 'overdue')->sum('outstanding_amount'),
            'count_overdue' => AccountReceivable::where('status', 'overdue')->count(),
            'count_outstanding' => AccountReceivable::whereIn('status', ['outstanding', 'partial'])->count()
        ];

        // Get customers for filter
        $customers = Customer::select('id', 'company_name')->orderBy('company_name')->get();

        return Inertia::render('Admin/AdminKeuangan/AccountReceivables/Index', [
            'receivables' => $receivables,
            'summary' => $summary,
            'customers' => $customers,
            'filters' => $request->only(['search', 'status', 'customer_id', 'date_from', 'date_to'])
        ]);
    }

    /**
     * Display the specified account receivable
     */
    public function show(AccountReceivable $accountReceivable)
    {
        $accountReceivable->load(['customer', 'invoice', 'salesOrder', 'creator']);
        
        return Inertia::render('Admin/AdminKeuangan/AccountReceivables/Show', [
            'receivable' => $accountReceivable
        ]);
    }

    /**
     * Record a payment for account receivable
     */
    public function recordPayment(Request $request, AccountReceivable $accountReceivable)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01|max:' . $accountReceivable->outstanding_amount,
            'payment_date' => 'required|date',
            'notes' => 'nullable|string|max:500'
        ]);

        DB::transaction(function () use ($accountReceivable, $validated) {
            $success = $accountReceivable->recordPayment(
                $validated['amount'],
                $validated['notes']
            );

            if (!$success) {
                throw new \Exception('Failed to record payment');
            }

            // Update related invoice status if fully paid
            if ($accountReceivable->status === 'paid') {
                $accountReceivable->invoice->update([
                    'status' => 'paid',
                    'paid_date' => now(),
                    'paid_amount' => $accountReceivable->invoice_amount
                ]);
            }
        });

        return redirect()->back()->with('success', 'Payment recorded successfully');
    }

    /**
     * Generate SOA for a customer
     */
    public function generateSOA(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date',
            'include_paid' => 'nullable|boolean'
        ]);

        $query = AccountReceivable::where('customer_id', $customer->id);

        if ($validated['date_from'] ?? false) {
            $query->where('invoice_date', '>=', $validated['date_from']);
        }

        if ($validated['date_to'] ?? false) {
            $query->where('invoice_date', '<=', $validated['date_to']);
        }

        if (!($validated['include_paid'] ?? false)) {
            $query->whereIn('status', ['outstanding', 'partial', 'overdue']);
        }

        $receivables = $query->with(['invoice', 'salesOrder'])
            ->orderBy('invoice_date', 'asc')
            ->get();

        $summary = [
            'total_invoiced' => $receivables->sum('invoice_amount'),
            'total_paid' => $receivables->sum('paid_amount'),
            'total_outstanding' => $receivables->sum('outstanding_amount'),
            'oldest_invoice' => $receivables->where('status', '!=', 'paid')->min('invoice_date'),
            'count_overdue' => $receivables->where('status', 'overdue')->count()
        ];

        $pdf = Pdf::loadView('admin.admin-keuangan.account-receivables.soa', [
            'customer' => $customer,
            'receivables' => $receivables,
            'summary' => $summary,
            'date_from' => $validated['date_from'] ?? null,
            'date_to' => $validated['date_to'] ?? null,
            'generated_at' => now()
        ])
        ->setPaper('a4', 'portrait')
        ->setOptions([
            'defaultFont' => 'Arial',
            'isRemoteEnabled' => true,
            'isHtml5ParserEnabled' => true
        ]);

        $fileName = 'SOA_' . str_replace(' ', '_', $customer->company_name) . '_' . now()->format('Y-m-d') . '.pdf';

        return $pdf->download($fileName);
    }

    /**
     * Bulk update overdue status
     */
    public function updateOverdueStatus()
    {
        $updated = 0;
        AccountReceivable::whereIn('status', ['outstanding', 'partial'])
            ->chunk(100, function ($receivables) use (&$updated) {
                foreach ($receivables as $receivable) {
                    $receivable->updateOverdueStatus();
                    $updated++;
                }
            });

        return response()->json(['message' => "Updated {$updated} receivables"]);
    }

    /**
     * Get receivables by customer for SOA preview
     */
    public function getByCustomer(Customer $customer)
    {
        $receivables = AccountReceivable::where('customer_id', $customer->id)
            ->whereIn('status', ['outstanding', 'partial', 'overdue'])
            ->with(['invoice', 'salesOrder'])
            ->orderBy('invoice_date', 'desc')
            ->get();

        return response()->json($receivables);
    }

    /**
     * Export receivables to Excel/CSV
     */
    public function export(Request $request)
    {
        // This can be implemented later with Laravel Excel
        return response()->json(['message' => 'Export feature coming soon']);
    }
}
