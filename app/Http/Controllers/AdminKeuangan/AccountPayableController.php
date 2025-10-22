<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\AccountPayable;
use App\Models\Vendor;
use App\Models\ReimbursementItem;
use App\Models\BankAccount;
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

        // Calculate summary per vendor (for current filtered results)
        $currentQuery = clone $query;
        $currentResults = $currentQuery->get();

        $vendorSummary = $currentResults->groupBy('vendor_id')->map(function ($payables, $vendorId) {
            $vendor = $payables->first()->vendor;
            return [
                'vendor_id' => $vendorId,
                'vendor_name' => $vendor ? $vendor->nama_vendor : $payables->first()->vendor_name,
                'total_amount' => (float) $payables->sum('amount'),
                'total_paid' => (float) $payables->sum('paid_amount'),
                'total_outstanding' => (float) $payables->sum('outstanding_amount'),
                'count_invoices' => (int) $payables->count(),
                'count_overdue' => (int) $payables->where('payment_due_date', '<', now())->whereIn('status', ['unpaid', 'partial'])->count()
            ];
        })->sortByDesc('total_outstanding')->values();

        // Get vendors for filter
        $vendors = Vendor::select('id', 'nama_vendor')->orderBy('nama_vendor')->get();

        return Inertia::render('Admin/AdminKeuangan/AccountPayables/Index', [
            'payables' => $payables,
            'summary' => $summary,
            'vendorSummary' => $vendorSummary,
            'vendors' => $vendors,
            'filters' => $request->only(['search', 'status', 'vendor_id', 'date_from', 'date_to']),
            'bankAccounts' => BankAccount::all(),
        ]);
    }

    /**
     * Display the specified account payable
     */
    public function show(AccountPayable $accountPayable)
    {
        $accountPayable->load(['vendor', 'salesOrder', 'creator', 'paidByUser']);
        $bankAccounts = BankAccount::all();
        $reimbursementItems = $this->mapReimbursementItems($accountPayable);

        return Inertia::render('Admin/AdminKeuangan/AccountPayables/Show', [
            'payable' => $accountPayable,
            'bankAccounts' => $bankAccounts,
            'reimbursementItems' => $reimbursementItems
        ]);
    }

    public function reimbursementItems(AccountPayable $accountPayable)
    {
        return response()->json($this->mapReimbursementItems($accountPayable));
    }

    /**
     * Mark payment for account payable
     */
    public function markAsPaid(Request $request, AccountPayable $accountPayable)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01|max:' . $accountPayable->outstanding_amount,
            'payment_method' => 'required|string|max:100',
            'bank_account_id' => 'required|exists:bank_accounts,id',
            'payment_date' => 'required|date',
            'notes' => 'nullable|string|max:500',
            'reimbursement_items' => 'nullable|array',
            'reimbursement_items.*' => 'integer|exists:reimbursement_items,id',
            'reimbursement_vendor_name' => 'nullable|string|max:255',
            'reimbursement_paid_at' => 'nullable|date',
            'reimbursement_notes' => 'nullable|string|max:500'
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

            // Record bank transaction (Vendor Payment = Debit from bank)
            \App\Models\BankTransaction::recordVendorPayment(
                $validated['bank_account_id'],
                $validated['amount'],
                "Vendor payment for {$accountPayable->service_description} to {$accountPayable->vendor_name}",
                $accountPayable->id,
                $validated['payment_date']
            );

            if (!empty($validated['reimbursement_items'])) {
                $reimbursementVendor = $validated['reimbursement_vendor_name']
                    ?? $accountPayable->vendor_name
                    ?? 'Eshaka Wijaya Logistics';

                $reimbursementPaidAt = $validated['reimbursement_paid_at'] ?? $validated['payment_date'];
                $reimbursementNotes = $validated['reimbursement_notes'] ?? $validated['notes'] ?? null;

                $reimbursementExtras = [
                    'account_payable_id' => $accountPayable->id,
                    'account_payable_vendor' => $accountPayable->vendor_name,
                    'account_payable_invoice_number' => $accountPayable->vendor_invoice_number,
                ];

                $items = ReimbursementItem::whereIn('id', $validated['reimbursement_items'])->get();
                foreach ($items as $item) {
                    $item->markAsPaid($reimbursementVendor, $reimbursementPaidAt, $reimbursementNotes, $reimbursementExtras);
                }
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

    private function mapReimbursementItems(AccountPayable $accountPayable)
    {
        return ReimbursementItem::query()
            ->with(['invoice:id,invoice_number,invoice_type'])
            ->when($accountPayable->sales_order_id, function ($query) use ($accountPayable) {
                $query->where('sales_order_id', $accountPayable->sales_order_id);
            })
            ->whereNotNull('invoice_id')
            ->whereHas('invoice', function ($query) {
                $query->whereIn('invoice_type', ['reimbursement', 'combined']);
            })
            ->orderBy('created_at')
            ->get()
            ->map(function (ReimbursementItem $item) {
                $receiptInfo = $item->receipt_info ?? [];

                return [
                    'id' => $item->id,
                    'description' => $item->description,
                    'amount' => (float) $item->amount,
                    'status' => $item->status,
                    'paid_at' => optional($item->paid_at)->toDateTimeString(),
                    'invoice_id' => $item->invoice_id,
                    'invoice_number' => $item->invoice?->invoice_number,
                    'invoice_type' => $item->invoice?->invoice_type,
                    'vendor_name' => data_get($receiptInfo, 'vendor_name'),
                ];
            });
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
