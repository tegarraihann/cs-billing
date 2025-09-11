<?php
// BACKUP: Original generatePdf method from InvoiceController
// Date: <?= date('Y-m-d H:i:s') ?>

public function generatePdf(Invoice $invoice)
{
    $invoice->load(['salesOrder', 'customer', 'items']);

    $pdf = PDF::loadView('invoices.pdf', compact('invoice'));
    
    return $pdf->download($invoice->invoice_number . '.pdf');
}