<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\ChartOfAccount;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChartOfAccountController extends Controller
{
    public function index(Request $request)
    {
        $query = ChartOfAccount::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('account_code', 'like', "%{$search}%")
                    ->orWhere('account_name', 'like', "%{$search}%")
                    ->orWhere('account_type', 'like', "%{$search}%")
                    ->orWhere('account_category', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            if ($request->status === '1' || $request->status === '0') {
                $query->where('is_active', $request->status === '1');
            }
        }

        $accounts = $query->ordered()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/AdminKeuangan/ChartOfAccounts/Index', [
            'accounts' => $accounts,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        $categories = ChartOfAccount::query()
            ->select('account_category')
            ->distinct()
            ->orderBy('account_category')
            ->pluck('account_category')
            ->values();

        $parentAccounts = ChartOfAccount::ordered()
            ->get(['account_code', 'account_name']);

        return Inertia::render('Admin/AdminKeuangan/ChartOfAccounts/Create', [
            'categories' => $categories,
            'parentAccounts' => $parentAccounts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'account_code' => 'required|string|max:50|unique:chart_of_accounts,account_code',
            'account_name' => 'required|string|max:255',
            'account_type' => 'required|in:asset,liability,equity,revenue,expense',
            'account_category' => 'required|string|max:255',
            'parent_code' => 'nullable|exists:chart_of_accounts,account_code',
            'sort_order' => 'nullable|integer',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        ChartOfAccount::create($validated);

        return redirect()
            ->route('admin-keuangan.chart-of-accounts.index')
            ->with('success', 'Account created successfully.');
    }

    public function show(ChartOfAccount $chartOfAccount)
    {
        $chartOfAccount->load('parent');

        return Inertia::render('Admin/AdminKeuangan/ChartOfAccounts/Show', [
            'account' => $chartOfAccount,
        ]);
    }

    public function edit(ChartOfAccount $chartOfAccount)
    {
        $chartOfAccount->load('parent');

        return Inertia::render('Admin/AdminKeuangan/ChartOfAccounts/Edit', [
            'account' => $chartOfAccount,
        ]);
    }

    public function update(Request $request, ChartOfAccount $chartOfAccount)
    {
        $validated = $request->validate([
            'account_name' => 'required|string|max:255',
            'sort_order' => 'nullable|integer',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $chartOfAccount->update($validated);

        return redirect()
            ->route('admin-keuangan.chart-of-accounts.index')
            ->with('success', 'Account updated successfully.');
    }

    public function destroy(ChartOfAccount $chartOfAccount)
    {
        $chartOfAccount->update(['is_active' => false]);

        return redirect()
            ->route('admin-keuangan.chart-of-accounts.index')
            ->with('success', 'Account deactivated successfully.');
    }
}
