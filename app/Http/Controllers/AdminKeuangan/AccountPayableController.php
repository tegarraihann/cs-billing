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
        $query = AccountPayable::with([
                'vendor',
                'salesOrder',
                'creator',
                'components' => function ($query) {
                    $query->orderBy('component_type');
                },
            ])
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

        $vendorSummary = $currentResults
            ->flatMap(function (AccountPayable $payable) {
                $payable->loadMissing('components');

                if ($payable->components->isEmpty()) {
                    return [[
                        'vendor_id' => $payable->vendor_id,
                        'vendor_name' => $payable->vendor->nama_vendor ?? $payable->vendor_name,
                        'source_type' => $payable->vendor_id ? 'vendor_payment' : 'operational_cost',
                        'source_label' => $payable->vendor_id ? 'Vendor Payment' : 'Biaya Operasional',
                        'total_amount' => (float) $payable->amount,
                        'total_paid' => (float) $payable->paid_amount,
                        'total_outstanding' => (float) $payable->outstanding_amount,
                        'count_payables' => 1,
                        'count_overdue' => in_array($payable->status, ['unpaid', 'partial'], true) && $payable->payment_due_date && $payable->payment_due_date < now() ? 1 : 0,
                    ]];
                }

                return $payable->components->map(function ($component) use ($payable) {
                    return [
                        'vendor_id' => $payable->vendor_id,
                        'vendor_name' => $payable->vendor->nama_vendor ?? $payable->vendor_name,
                        'source_type' => $component->component_type,
                        'source_label' => $component->getComponentLabel(),
                        'total_amount' => (float) $component->amount,
                        'total_paid' => (float) $component->paid_amount,
                        'total_outstanding' => (float) $component->outstanding_amount,
                        'count_payables' => 1,
                        'count_overdue' => $component->due_date && $component->status !== 'paid' && $component->due_date < now() ? 1 : 0,
                    ];
                });
            })
            ->groupBy(function ($entry) {
                return ($entry['vendor_id'] ?? 'internal') . '::' . $entry['source_type'];
            })
            ->map(function ($entries) {
                $first = $entries->first();
                return [
                    'vendor_id' => $first['vendor_id'],
                    'vendor_name' => $first['vendor_name'],
                    'source_type' => $first['source_type'],
                    'source_label' => $first['source_label'],
                    'total_amount' => (float) $entries->sum('total_amount'),
                    'total_paid' => (float) $entries->sum('total_paid'),
                    'total_outstanding' => (float) $entries->sum('total_outstanding'),
                    'count_payables' => (int) $entries->sum('count_payables'),
                    'count_overdue' => (int) $entries->sum('count_overdue'),
                ];
            })
            ->sortByDesc('total_outstanding')
            ->values();

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
    public function show(Request $request, AccountPayable $accountPayable)
    {
        $accountPayable->load(['vendor', 'salesOrder', 'creator', 'paidByUser']);

        // Sync components to ensure they are up to date
        $accountPayable->syncComponents();
        $accountPayable->load('components');

        $bankAccounts = BankAccount::all();
        $reimbursementItems = $this->mapReimbursementItems($accountPayable);
        $selectedComponentId = $request->query('component_id');
        $selectedComponentId = $selectedComponentId !== null ? (int) $selectedComponentId : null;

        return Inertia::render('Admin/AdminKeuangan/AccountPayables/Show', [
            'payable' => $accountPayable,
            'bankAccounts' => $bankAccounts,
            'reimbursementItems' => $reimbursementItems,
            'selectedComponentId' => $selectedComponentId,
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
        // Sync components first
        $accountPayable->syncComponents();
        $accountPayable->refresh();
        $components = $accountPayable->components()->get();
        $requiresComponent = $components->count() > 1;

        // Prepare validation rules
        $rules = [
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
        ];

        // Add component_id validation if multiple components
        if ($requiresComponent) {
            $rules['component_id'] = 'required|exists:account_payable_components,id';
        } else {
            $rules['component_id'] = 'nullable|exists:account_payable_components,id';
        }

        $validated = $request->validate($rules);

        // Get the component to pay
        $component = null;
        if (!empty($validated['component_id'])) {
            $component = $components->firstWhere('id', (int) $validated['component_id']);
        } elseif ($components->count() === 1) {
            $component = $components->first();
        }

        // If multiple components and no component selected, return error
        if ($requiresComponent && !$component) {
            return redirect()->back()->withErrors([
                'component_id' => 'Pilih komponen pembayaran.'
            ])->withInput();
        }

        // Validate amount doesn't exceed component outstanding
        if ($component && $validated['amount'] > $component->outstanding_amount) {
            return redirect()->back()->withErrors([
                'amount' => 'Amount cannot exceed outstanding balance for ' . $component->getComponentLabel() . ' (Rp ' . number_format($component->outstanding_amount, 0, ',', '.') . ')'
            ])->withInput();
        }

        DB::transaction(function () use ($accountPayable, $component, $validated) {
            // Record payment to component
            $success = $accountPayable->recordPaymentToComponent(
                $component,
                $validated['amount'],
                $validated['payment_method'],
                $validated['notes'],
                \Carbon\Carbon::parse($validated['payment_date'])
            );

            if (!$success) {
                throw new \Exception('Failed to mark payment');
            }

            $componentLabel = $component
                ? $component->getComponentLabel() . ' - ' . $component->recipient_name
                : $accountPayable->vendor_name;

            // Record bank transaction (Vendor Payment = Debit from bank)
            \App\Models\BankTransaction::recordVendorPayment(
                $validated['bank_account_id'],
                $validated['amount'],
                "Payment for {$componentLabel}: {$accountPayable->service_description}",
                $accountPayable->id,
                $validated['payment_date']
            );

            // If component is reimbursement, mark related reimbursement items as paid
            if ($component && $component->component_type === 'reimbursement' && !empty($validated['reimbursement_items'])) {
                $reimbursementVendor = $validated['reimbursement_vendor_name']
                    ?? $accountPayable->vendor_name
                    ?? 'Eshaka Wijaya Logistics';

                $reimbursementPaidAt = $validated['reimbursement_paid_at'] ?? $validated['payment_date'];
                $reimbursementNotes = $validated['reimbursement_notes'] ?? $validated['notes'] ?? null;

                $reimbursementExtras = [
                    'account_payable_id' => $accountPayable->id,
                    'account_payable_component_id' => $component->id,
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
