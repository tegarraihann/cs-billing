<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\AccountPayable;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OpeningBalancePayableController extends Controller
{
    public function index()
    {
        $payablesMain = AccountPayable::query()
            ->with('vendor')
            ->where('is_opening', true)
            ->where('opening_type', 'main')
            ->orderByDesc('vendor_invoice_date')
            ->paginate(15, ['*'], 'main_page')
            ->withQueryString();

        $payablesReimbursement = AccountPayable::query()
            ->with('vendor')
            ->where('is_opening', true)
            ->where('opening_type', 'reimbursement')
            ->orderByDesc('vendor_invoice_date')
            ->paginate(15, ['*'], 'reim_page')
            ->withQueryString();

        return Inertia::render('Admin/AdminKeuangan/OpeningPayables/Index', [
            'payablesMain' => $payablesMain,
            'payablesReimbursement' => $payablesReimbursement,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/OpeningPayables/Create', [
            'vendors' => Vendor::orderBy('nama_vendor')->get(['id', 'nama_vendor', 'nomor_rekening', 'nama_rekening']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vendor_id' => 'required|exists:vendors,id',
            'vendor_invoice_number' => 'required|string|max:255',
            'vendor_invoice_date' => 'required|date',
            'amount' => 'required|numeric|min:0.01',
            'source_so_number' => 'required|string|max:255',
            'opening_type' => 'required|in:main,reimbursement',
            'payment_due_date' => 'nullable|date',
            'opening_payment_date' => 'nullable|date',
            'service_description' => 'nullable|string|max:255',
            'service_remarks' => 'nullable|string|max:1000',
            'vendor_bank_account' => 'nullable|string|max:255',
            'vendor_account_name' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:1000',
        ]);

        $vendor = Vendor::findOrFail($validated['vendor_id']);
        $serviceDescription = $validated['service_description']
            ?: ($validated['opening_type'] === 'reimbursement' ? 'Opening Balance - Reimbursement' : 'Opening Balance - Main');

        AccountPayable::create([
            'sales_order_id' => null,
            'vendor_id' => $vendor->id,
            'vendor_name' => $vendor->nama_vendor,
            'vendor_invoice_number' => $validated['vendor_invoice_number'],
            'vendor_invoice_date' => $validated['vendor_invoice_date'],
            'service_description' => $serviceDescription,
            'service_remarks' => $validated['service_remarks'] ?? null,
            'amount' => $validated['amount'],
            'paid_amount' => 0,
            'outstanding_amount' => $validated['amount'],
            'status' => 'unpaid',
            'payment_due_date' => $validated['payment_due_date'] ?? null,
            'payment_date' => null,
            'payment_method' => null,
            'payment_notes' => $validated['notes'] ?? null,
            'vendor_bank_account' => $validated['vendor_bank_account'] ?: $vendor->nomor_rekening,
            'vendor_account_name' => $validated['vendor_account_name'] ?: $vendor->nama_rekening,
            'days_overdue' => 0,
            'created_by' => Auth::id(),
            'paid_by' => null,
            'is_opening' => true,
            'opening_type' => $validated['opening_type'],
            'source_so_number' => $validated['source_so_number'],
            'opening_payment_date' => $validated['opening_payment_date'] ?? null,
        ]);

        return redirect()
            ->route('admin-keuangan.opening-payables.index')
            ->with('success', 'Opening payable has been recorded.');
    }
}
