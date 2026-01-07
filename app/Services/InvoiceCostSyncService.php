<?php

namespace App\Services;

use App\Models\AccountPayableComponent;
use App\Models\AccountReceivable;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\ProfitLossEntry;
use App\Models\ProfitLossPeriod;
use App\Models\ReimbursementItem;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class InvoiceCostSyncService
{
    /**
     * Ensure invoice items, account receivable, and profit & loss stay in sync
     * after a manual Account Payable component is created.
     */
    public function syncFromAccountPayableComponent(AccountPayableComponent $component): void
    {
        $component->loadMissing('accountPayable.salesOrder');
        $accountPayable = $component->accountPayable;
        $salesOrder = $accountPayable?->salesOrder;

        if (!$this->isManualComponent($component)) {
            Log::info('InvoiceCostSyncService: skipped non-manual component sync', [
                'component_id' => $component->id,
                'account_payable_id' => $accountPayable?->id,
            ]);
            return;
        }

        if ($component->component_type === 'vat_reimbursement') {
            Log::info('InvoiceCostSyncService: skipped VAT reimbursement component sync', [
                'component_id' => $component->id,
                'account_payable_id' => $accountPayable?->id,
            ]);
            return;
        }

        if (!$salesOrder) {
            Log::info('InvoiceCostSyncService: skipped sync because sales order was not found', [
                'account_payable_id' => $accountPayable?->id,
                'component_id' => $component->id,
            ]);
            return;
        }

        $targetInvoices = $this->targetInvoicesForComponent($salesOrder, $component);

        if ($targetInvoices->isEmpty()) {
            Log::info('InvoiceCostSyncService: no invoices eligible for sync', [
                'sales_order_id' => $salesOrder->id,
                'component_id' => $component->id,
                'component_type' => $component->component_type,
            ]);
            return;
        }

        foreach ($targetInvoices as $invoice) {
            $this->cleanupInvoiceComponentItems($invoice);
            $this->syncComponentToInvoice($component, $invoice);
        }
    }

    /**
     * Ensure an invoice has all manual Account Payable components attached.
     */
    public function syncInvoiceWithAccountPayables(Invoice $invoice): void
    {
        if (!$invoice->sales_order_id) {
            return;
        }

        $this->cleanupInvoiceComponentItems($invoice);

        $components = AccountPayableComponent::query()
            ->with('accountPayable')
            ->whereIn('component_type', ['operational_cost', 'reimbursement'])
            ->whereHas('accountPayable', function ($query) use ($invoice) {
                $query->where('sales_order_id', $invoice->sales_order_id);
            })
            ->get();

        $hasChanges = false;

        foreach ($components as $component) {
            if (!$this->isManualComponent($component)) {
                continue;
            }

            if ($this->syncComponentToInvoice($component, $invoice, true)) {
                $hasChanges = true;
            }
        }

        if ($hasChanges) {
            $this->refreshInvoiceAggregates($invoice);
        }
    }

    /**
     * Find invoices that should reflect the new component.
     */
    protected function targetInvoicesForComponent($salesOrder, AccountPayableComponent $component): Collection
    {
        $prioritizedTypes = match ($component->component_type) {
            'reimbursement' => ['combined', 'reimbursement'],
            default => ['combined', 'main'],
        };

        return $salesOrder->invoices()
            ->whereIn('invoice_type', $prioritizedTypes)
            ->orderByRaw("FIELD(invoice_type, '" . implode("','", $prioritizedTypes) . "')")
            ->get();
    }

    /**
     * Insert or update invoice item that represents the payable component.
     */
    protected function syncComponentToInvoice(AccountPayableComponent $component, Invoice $invoice, bool $deferRefresh = false): bool
    {
        $itemRef = 'ap_component_' . $component->id;

        $isReimbursement = $component->component_type === 'reimbursement';

        $payload = [
            'description' => $this->buildItemDescription($component),
            'quantity' => 1,
            'unit' => 'SET',
            'rate' => (float) $component->amount,
            'currency' => 'IDR',
            'amount' => (float) $component->amount,
            'item_ref' => $itemRef,
            'item_type' => $isReimbursement ? 'reimbursement' : 'operational_cost',
            'vendor_id' => $component->vendor_id,
            'include_in_customer_invoice' => $isReimbursement,
            'is_hidden_from_customer' => !$isReimbursement,
        ];

        $invoiceItem = InvoiceItem::updateOrCreate(
            [
                'invoice_id' => $invoice->id,
                'item_ref' => $itemRef,
            ],
            $payload
        );

        $wasUpdated = $invoiceItem->wasRecentlyCreated || $invoiceItem->wasChanged();
        if (!$wasUpdated) {
            return false;
        }

        if ($isReimbursement) {
            $this->linkReimbursementRecord($component, $invoice);
        }

        if (!$deferRefresh) {
            $this->refreshInvoiceAggregates($invoice);
        }

        Log::info('InvoiceCostSyncService: synced component to invoice', [
            'invoice_id' => $invoice->id,
            'invoice_type' => $invoice->invoice_type,
            'component_id' => $component->id,
            'component_type' => $component->component_type,
        ]);

        return true;
    }

    /**
     * Build description shown on invoice item.
     */
    protected function buildItemDescription(AccountPayableComponent $component): string
    {
        $category = trim((string) data_get($component->related_items, 'category_name', ''));
        $base = trim($component->description ?? '-');
        $prefix = $component->component_type === 'reimbursement'
            ? 'Reimbursement'
            : 'Operational Cost';

        if ($category !== '') {
            return sprintf('%s (%s) - %s', $prefix, $category, $base);
        }

        return sprintf('%s - %s', $prefix, $base);
    }

    /**
     * Link reimbursement record (if any) so status follows invoice.
     */
    protected function linkReimbursementRecord(AccountPayableComponent $component, Invoice $invoice): void
    {
        $reimbursementId = data_get($component->related_items, 'reimbursement_item_id');

        $reimbursement = $reimbursementId
            ? ReimbursementItem::find($reimbursementId)
            : ReimbursementItem::where('sales_order_id', $invoice->sales_order_id)
                ->whereNull('invoice_id')
                ->where('description', $component->description)
                ->latest()
                ->first();

        if (!$reimbursement) {
            return;
        }

        $reimbursement->markAsInvoiced($invoice->id);

        $receiptInfo = $reimbursement->receipt_info ?? [];
        if (!is_array($receiptInfo)) {
            $receiptInfo = [];
        }

        $receiptInfo['component_id'] = $component->id;
        $reimbursement->receipt_info = $receiptInfo;
        $reimbursement->save();
    }

    protected function refreshInvoiceAggregates(Invoice $invoice): void
    {
        $invoice->refresh();
        $invoice->calculateTotals();
        $invoice->refresh();

        AccountReceivable::syncFromInvoice($invoice);
        $this->maybeRepostProfitLoss($invoice);
    }

    protected function cleanupInvoiceComponentItems(Invoice $invoice): void
    {
        $componentItems = $invoice->items()
            ->where('item_ref', 'like', 'ap_component_%')
            ->get();

        if ($componentItems->isEmpty()) {
            return;
        }

        $removed = false;

        foreach ($componentItems as $item) {
            if (!preg_match('/ap_component_(\d+)/', (string) $item->item_ref, $matches)) {
                continue;
            }

            $componentId = (int) $matches[1];
            $component = AccountPayableComponent::find($componentId);

            if (!$this->isManualComponent($component) || ($component && $component->component_type === 'vat_reimbursement')) {
                $item->delete();
                $removed = true;
                Log::info('InvoiceCostSyncService: removed non-manual component item from invoice', [
                    'invoice_id' => $invoice->id,
                    'component_id' => $componentId,
                    'item_id' => $item->id,
                ]);
            }
        }

        if ($removed) {
            $this->refreshInvoiceAggregates($invoice->fresh());
        }
    }

    protected function isManualComponent(?AccountPayableComponent $component): bool
    {
        if (!$component) {
            return false;
        }

        return data_get($component->related_items, 'source') === 'account_payable_manual_entry';
    }

    /**
     * Repost profit & loss if invoice was previously posted.
     */
    protected function maybeRepostProfitLoss(Invoice $invoice): void
    {
        if (!$invoice->posted_to_profit_loss) {
            return;
        }

        $entryIds = $invoice->profit_loss_entries ?? [];
        $periodId = null;

        if (!empty($entryIds)) {
            $periodId = ProfitLossEntry::whereIn('id', $entryIds)
                ->pluck('period_id')
                ->first();
        }

        try {
            $invoice->unpostFromProfitLoss();
        } catch (\Throwable $th) {
            Log::warning('InvoiceCostSyncService: failed to unpost invoice before reposting', [
                'invoice_id' => $invoice->id,
                'error' => $th->getMessage(),
            ]);
            return;
        }

        $invoice->refresh();
        $periodId = $periodId ?? $this->resolvePeriodIdForInvoice($invoice);

        if (!$periodId) {
            Log::warning('InvoiceCostSyncService: no profit & loss period available for repost', [
                'invoice_id' => $invoice->id,
            ]);
            return;
        }

        try {
            $invoice->postToProfitLoss($periodId);
        } catch (\Throwable $th) {
            Log::error('InvoiceCostSyncService: failed to repost invoice to profit & loss', [
                'invoice_id' => $invoice->id,
                'period_id' => $periodId,
                'error' => $th->getMessage(),
            ]);
        }
    }

    protected function resolvePeriodIdForInvoice(Invoice $invoice): ?int
    {
        if (!$invoice->invoice_date) {
            return ProfitLossPeriod::active()
                ->orderByDesc('start_date')
                ->value('id');
        }

        $period = ProfitLossPeriod::active()
            ->whereDate('start_date', '<=', $invoice->invoice_date)
            ->whereDate('end_date', '>=', $invoice->invoice_date)
            ->orderBy('start_date')
            ->first();

        if ($period) {
            return $period->id;
        }

        return ProfitLossPeriod::active()
            ->orderByDesc('start_date')
            ->value('id');
    }
}
