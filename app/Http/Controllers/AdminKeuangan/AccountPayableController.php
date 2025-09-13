<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\AccountPayable;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AccountPayableController extends Controller
{
    /**
     * Display a listing of account payables
     */
    public function index(Request $request)
    {
        $query = AccountPayable::with(['vendor', 'salesOrder', 'creator'])
            ->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('vendor_invoice_number', 'like', "%{$search}%")
                    ->orWhere('vendor_name', 'like', "%{$search}%")
                    ->orWhere('service_description', 'like', "%{$search}%")
                    ->orWhereHas('vendor', function ($vendorQuery) use ($search) {
                        $vendorQuery->where('nama_vendor', 'like', "%{$search}%");
                    });
            });
        }

        // Status filter
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Vendor filter
        if ($request->has('vendor_id') && $request->vendor_id) {
            $query->where('vendor_id', $request->vendor_id);
        }

        // Date range filter
        if ($request->has('date_from') && $request->date_from) {
            $query->where('vendor_invoice_date', '>=', $request->date_from);
        }
        if ($request->has('date_to') && $request->date_to) {
            $query->where('vendor_invoice_date', '<=', $request->date_to);
        }

        $payables = $query->paginate(15);

        // Calculate summary
        $summary = [
            'total_outstanding' => AccountPayable::sum('outstanding_amount'),
            'total_overdue' => AccountPayable::where('payment_due_date', '<', now())
                ->whereIn('status', ['unpaid', 'partial'])
                ->sum('outstanding_amount'),
            'count_overdue' => AccountPayable::where('payment_due_date', '<', now())
                ->whereIn('status', ['unpaid', 'partial'])
                ->count(),
            'count_unpaid' => AccountPayable::whereIn('status', ['unpaid', 'partial'])->count()
        ];

        // Get vendors for filter
        $vendors = Vendor::select('id', 'nama_vendor')->orderBy('nama_vendor')->get();

        return Inertia::render('Admin/AdminKeuangan/AccountPayables/Index', [
            'payables' => $payables,
            'summary' => $summary,
            'vendors' => $vendors,
            'filters' => $request->only(['search', 'status', 'vendor_id', 'date_from', 'date_to'])
        ]);
    }

    /**
     * Display the specified account payable
     */
    public function show(AccountPayable $accountPayable)
    {
        $accountPayable->load(['vendor', 'salesOrder', 'creator', 'paidByUser']);
        
        return Inertia::render('Admin/AdminKeuangan/AccountPayables/Show', [
            'payable' => $accountPayable
        ]);
    }

    /**
     * Mark payment for account payable
     */
    public function markAsPaid(Request $request, AccountPayable $accountPayable)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01|max:' . $accountPayable->outstanding_amount,
            'payment_method' => 'required|string|max:100',
            'notes' => 'nullable|string|max:500'
        ]);

        DB::transaction(function () use ($accountPayable, $validated) {
            $success = $accountPayable->markAsPaid(
                $validated['amount'],
                $validated['payment_method'],
                $validated['notes']
            );

            if (!$success) {
                throw new \Exception('Failed to mark payment');
            }
        });

        return redirect()->back()->with('success', 'Payment marked successfully');
    }

    /**
     * Bulk update overdue status
     */
    public function updateOverdueStatus()
    {
        $updated = 0;
        AccountPayable::whereIn('status', ['unpaid', 'partial'])
            ->chunk(100, function ($payables) use (&$updated) {
                foreach ($payables as $payable) {
                    $payable->updateOverdueStatus();
                    $updated++;
                }
            });

        return response()->json(['message' => "Updated {$updated} payables"]);
    }

    /**
     * Get payables by vendor
     */
    public function getByVendor(Vendor $vendor)
    {
        $payables = AccountPayable::where('vendor_id', $vendor->id)
            ->whereIn('status', ['unpaid', 'partial'])
            ->with(['salesOrder'])
            ->orderBy('vendor_invoice_date', 'desc')
            ->get();

        return response()->json($payables);
    }

    /**
     * Export payables to Excel/CSV
     */
    public function export(Request $request)
    {
        // This can be implemented later with Laravel Excel
        return response()->json(['message' => 'Export feature coming soon']);
    }

    /**
     * Update payment due date
     */
    public function updateDueDate(Request $request, AccountPayable $accountPayable)
    {
        $validated = $request->validate([
            'payment_due_date' => 'required|date|after_or_equal:today'
        ]);

        $accountPayable->update([
            'payment_due_date' => $validated['payment_due_date']
        ]);

        return redirect()->back()->with('success', 'Due date updated successfully');
    }

    /**
     * Add vendor invoice details
     */
    public function updateVendorInvoice(Request $request, AccountPayable $accountPayable)
    {
        $validated = $request->validate([
            'vendor_invoice_number' => 'nullable|string|max:100',
            'vendor_invoice_date' => 'nullable|date',
            'service_remarks' => 'nullable|string'
        ]);

        $accountPayable->update($validated);

        return redirect()->back()->with('success', 'Vendor invoice details updated');
    }

    /**
     * Dashboard summary for payables
     */
    public function summary()
    {
        $summary = [
            'total_amount' => AccountPayable::sum('amount'),
            'total_outstanding' => AccountPayable::sum('outstanding_amount'),
            'total_paid' => AccountPayable::sum('paid_amount'),
            'overdue_amount' => AccountPayable::where('payment_due_date', '<', now())
                ->whereIn('status', ['unpaid', 'partial'])
                ->sum('outstanding_amount'),
            'count_total' => AccountPayable::count(),
            'count_unpaid' => AccountPayable::where('status', 'unpaid')->count(),
            'count_partial' => AccountPayable::where('status', 'partial')->count(),
            'count_paid' => AccountPayable::where('status', 'paid')->count(),
            'count_overdue' => AccountPayable::where('payment_due_date', '<', now())
                ->whereIn('status', ['unpaid', 'partial'])
                ->count(),
        ];

        return response()->json($summary);
    }
}