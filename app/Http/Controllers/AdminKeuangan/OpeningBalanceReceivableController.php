<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\AccountReceivable;
use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OpeningBalanceReceivableController extends Controller
{
    public function index()
    {
        $receivablesMain = AccountReceivable::query()
            ->with('customer')
            ->where('is_opening', true)
            ->where('opening_type', 'main')
            ->orderByDesc('invoice_date')
            ->paginate(5, ['*'], 'main_page')
            ->withQueryString();

        $receivablesReimbursement = AccountReceivable::query()
            ->with('customer')
            ->where('is_opening', true)
            ->where('opening_type', 'reimbursement')
            ->orderByDesc('invoice_date')
            ->paginate(5, ['*'], 'reim_page')
            ->withQueryString();

        return Inertia::render('Admin/AdminKeuangan/OpeningReceivables/Index', [
            'receivablesMain' => $receivablesMain,
            'receivablesReimbursement' => $receivablesReimbursement,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/OpeningReceivables/Create', [
            'customers' => Customer::orderBy('company_name')->get(['id', 'company_name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required|exists:customers,id',
            'invoice_number' => 'required|string|max:255',
            'invoice_date' => 'required|date',
            'amount' => 'required|numeric|min:0.01',
            'source_so_number' => 'required|string|max:255',
            'opening_type' => 'required|in:main,reimbursement',
            'due_date' => 'nullable|date',
            'payment_terms_days' => 'nullable|integer|min:0',
            'payment_terms_text' => 'nullable|string|max:255',
            'opening_payment_date' => 'nullable|date',
            'notes' => 'nullable|string|max:1000',
        ]);

        $customer = Customer::findOrFail($validated['customer_id']);

        $dueDate = $validated['due_date'] ?? null;
        if (!$dueDate && !empty($validated['payment_terms_days'])) {
            $dueDate = Carbon::parse($validated['invoice_date'])
                ->addDays((int) $validated['payment_terms_days'])
                ->toDateString();
        }

        AccountReceivable::create([
            'invoice_id' => null,
            'customer_id' => $customer->id,
            'customer_name' => $customer->company_name,
            'sales_order_id' => null,
            'invoice_number' => $validated['invoice_number'],
            'invoice_date' => $validated['invoice_date'],
            'due_date' => $dueDate,
            'invoice_amount' => $validated['amount'],
            'paid_amount' => 0,
            'outstanding_amount' => $validated['amount'],
            'status' => 'outstanding',
            'payment_terms_days' => $validated['payment_terms_days'] ?? null,
            'payment_terms_text' => $validated['payment_terms_text'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'created_by' => Auth::id(),
            'is_opening' => true,
            'opening_type' => $validated['opening_type'],
            'source_so_number' => $validated['source_so_number'],
            'opening_payment_date' => $validated['opening_payment_date'] ?? null,
        ]);

        return redirect()
            ->route('admin-keuangan.opening-receivables.index')
            ->with('success', 'Opening receivable has been recorded.');
    }
}
