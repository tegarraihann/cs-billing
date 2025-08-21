<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\SalesOrder;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SalesOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = SalesOrder::with(['creator', 'releasedBy', 'vouchers'])
            ->where('status', 'released')
            ->orderBy('released_at', 'desc');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhere('customer', 'like', "%{$search}%")
                  ->orWhere('invoice_number', 'like', "%{$search}%");
            });
        }

        $salesOrders = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/AdminKeuangan/SalesOrders/Index', [
            'salesOrders' => $salesOrders,
            'filters' => $request->only(['search']),
        ]);
    }

    public function show(SalesOrder $salesOrder)
    {
        if ($salesOrder->status !== 'released') {
            return redirect()->route('admin-keuangan.sales-orders.index')
                ->withErrors(['error' => 'Sales order belum dirilis oleh CS.']);
        }

        $salesOrder->load(['creator', 'releasedBy', 'vouchers']);

        return Inertia::render('Admin/AdminKeuangan/SalesOrders/Show', [
            'salesOrder' => $salesOrder,
        ]);
    }

    public function approve(SalesOrder $salesOrder)
    {
        if ($salesOrder->status !== 'released') {
            return redirect()->back()->withErrors(['error' => 'Sales order belum dirilis atau sudah diproses.']);
        }

        $salesOrder->update([
            'status' => 'approved',
            'approved_at' => now(),
            'approved_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Sales order berhasil disetujui.');
    }

    public function reject(Request $request, SalesOrder $salesOrder)
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:500'
        ]);

        if ($salesOrder->status !== 'released') {
            return redirect()->back()->withErrors(['error' => 'Sales order belum dirilis atau sudah diproses.']);
        }

        $salesOrder->update([
            'status' => 'rejected',
            'rejected_at' => now(),
            'rejected_by' => auth()->id(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return redirect()->back()->with('success', 'Sales order berhasil ditolak.');
    }

    public function approveVoucher(Request $request, SalesOrder $salesOrder, Voucher $voucher)
    {
        if ($salesOrder->status !== 'released') {
            return redirect()->back()->withErrors(['error' => 'Sales order belum dirilis.']);
        }

        if ($voucher->sales_order_id !== $salesOrder->id) {
            return redirect()->back()->withErrors(['error' => 'Voucher tidak terkait dengan sales order ini.']);
        }

        if ($voucher->status !== Voucher::STATUS_RELEASED) {
            return redirect()->back()->withErrors(['error' => 'Voucher belum dirilis atau sudah diproses.']);
        }

        $voucher->update([
            'status' => Voucher::STATUS_APPROVED,
            'approved_at' => now(),
            'approved_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Voucher berhasil disetujui.');
    }

    public function rejectVoucher(Request $request, SalesOrder $salesOrder, Voucher $voucher)
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:500'
        ]);

        if ($salesOrder->status !== 'released') {
            return redirect()->back()->withErrors(['error' => 'Sales order belum dirilis.']);
        }

        if ($voucher->sales_order_id !== $salesOrder->id) {
            return redirect()->back()->withErrors(['error' => 'Voucher tidak terkait dengan sales order ini.']);
        }

        if ($voucher->status !== Voucher::STATUS_RELEASED) {
            return redirect()->back()->withErrors(['error' => 'Voucher belum dirilis atau sudah diproses.']);
        }

        $voucher->update([
            'status' => 'rejected',
            'rejected_at' => now(),
            'rejected_by' => auth()->id(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return redirect()->back()->with('success', 'Voucher berhasil ditolak.');
    }
}