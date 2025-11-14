<?php

namespace App\Services;

use App\Models\Invoice;
use App\Models\ProfitLossPeriod;
use Illuminate\Support\Facades\Log;

class InvoicePostingService
{
    public function sync(Invoice $invoice): void
    {
        $invoice->loadMissing(['customer']);

        $shouldPost = $invoice->canBePostedToProfitLoss();
        $periodId = $shouldPost ? $this->resolvePeriodIdForInvoice($invoice) : null;

        if ($invoice->posted_to_profit_loss) {
            if (!$shouldPost) {
                $this->safeUnpost($invoice);
                return;
            }

            if (!$periodId) {
                Log::warning('InvoicePostingService: skip repost, period not found', [
                    'invoice_id' => $invoice->id,
                    'invoice_date' => $invoice->invoice_date,
                ]);
                return;
            }

            if ($this->safeUnpost($invoice)) {
                $invoice->refresh();
                $this->safePost($invoice, $periodId);
            }

            return;
        }

        if ($shouldPost && $periodId) {
            $this->safePost($invoice, $periodId);
        } elseif ($shouldPost && !$periodId) {
            Log::warning('InvoicePostingService: no active period for invoice, posting skipped', [
                'invoice_id' => $invoice->id,
                'invoice_date' => $invoice->invoice_date,
            ]);
        }
    }

    protected function safeUnpost(Invoice $invoice): bool
    {
        try {
            $invoice->unpostFromProfitLoss();
            return true;
        } catch (\Throwable $th) {
            Log::error('InvoicePostingService: failed to unpost invoice', [
                'invoice_id' => $invoice->id,
                'error' => $th->getMessage(),
            ]);
            return false;
        }
    }

    protected function safePost(Invoice $invoice, int $periodId): void
    {
        try {
            $invoice->postToProfitLoss($periodId);
        } catch (\Throwable $th) {
            Log::error('InvoicePostingService: failed to post invoice', [
                'invoice_id' => $invoice->id,
                'period_id' => $periodId,
                'error' => $th->getMessage(),
            ]);
        }
    }

    protected function resolvePeriodIdForInvoice(Invoice $invoice): ?int
    {
        if (!$invoice->invoice_date) {
            return null;
        }

        return ProfitLossPeriod::active()
            ->whereDate('start_date', '<=', $invoice->invoice_date)
            ->whereDate('end_date', '>=', $invoice->invoice_date)
            ->orderBy('start_date')
            ->value('id');
    }
}
