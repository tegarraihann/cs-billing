<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Statement of Account - <?php echo e($customer->company_name); ?></title>
    <style>
        @page {
            margin: 14mm 12mm 14mm 12mm;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 10px;
            color: #111827;
            margin: 0;
        }

        .header {
            width: 100%;
            margin-bottom: 14px;
            border-bottom: 1px solid #d1d5db;
            padding-bottom: 10px;
        }

        .header-table,
        .summary-table,
        .transactions-table {
            width: 100%;
            border-collapse: collapse;
        }

        .header-left {
            width: 62%;
            vertical-align: top;
        }

        .header-right {
            width: 38%;
            vertical-align: top;
            text-align: right;
        }

        .company-name {
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 4px;
            color: #111827;
        }

        .muted {
            color: #4b5563;
        }

        .title {
            font-size: 18px;
            font-weight: 700;
            letter-spacing: .5px;
            text-transform: uppercase;
            margin-bottom: 6px;
        }

        .section {
            margin-bottom: 12px;
        }

        .section-title {
            font-size: 11px;
            font-weight: 700;
            margin-bottom: 6px;
            text-transform: uppercase;
            color: #111827;
        }

        .summary-card {
            border: 1px solid #d1d5db;
            border-radius: 4px;
            padding: 8px 10px;
        }

        .summary-table td {
            padding: 3px 0;
        }

        .summary-label {
            width: 55%;
            font-weight: 600;
        }

        .summary-value {
            width: 45%;
            text-align: right;
            font-family: "Courier New", monospace;
        }

        .transactions-table {
            table-layout: fixed;
        }

        .transactions-table th,
        .transactions-table td {
            border: 1px solid #d1d5db;
            padding: 6px 5px;
            vertical-align: top;
        }

        .transactions-table th {
            background: #f3f4f6;
            text-transform: uppercase;
            font-size: 9px;
            letter-spacing: .3px;
            text-align: center;
        }

        .text-left {
            text-align: left;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
            font-family: "Courier New", monospace;
        }

        .badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 999px;
            font-size: 8px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .3px;
            border: 1px solid #d1d5db;
            background: #f9fafb;
        }

        .total-row td {
            background: #f9fafb;
            font-weight: 700;
        }

        .footer {
            margin-top: 10px;
            font-size: 8px;
            color: #6b7280;
            text-align: right;
        }
    </style>
</head>

<body>
    <div class="header">
        <table class="header-table">
            <tr>
                <td class="header-left">
                    <div class="company-name">PT. ESHAKA WIJAYA LOGISTICS</div>
                    <div class="muted">
                        Ruko Aerohub Citra 8 No.C7-10, Pegadungan, Kalideres, Jakarta Barat 11830<br>
                        Telp: (021) 538-1234 | Email: info@eshakawijaya.com
                    </div>
                </td>
                <td class="header-right">
                    <div class="title">Statement of Account</div>
                    <div><strong>Customer:</strong> <?php echo e($customer->company_name); ?></div>
                    <div><strong>Printed At:</strong> <?php echo e($generated_at->locale('id')->isoFormat('DD MMM YYYY HH:mm')); ?></div>
                    <div>
                        <strong>Period:</strong>
                        <?php if($all_month ?? false): ?>
                            All Month
                        <?php elseif($date_from || $date_to): ?>
                            <?php echo e($date_from ? \Carbon\Carbon::parse($date_from)->locale('id')->isoFormat('DD MMM YYYY') : 'Start'); ?>

                            -
                            <?php echo e($date_to ? \Carbon\Carbon::parse($date_to)->locale('id')->isoFormat('DD MMM YYYY') : 'End'); ?>

                        <?php else: ?>
                            Current Filter
                        <?php endif; ?>
                    </div>
                </td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">Customer Information</div>
        <div>
            <strong>Company:</strong> <?php echo e($customer->company_name); ?><br>
            <strong>Address:</strong> <?php echo e($customer->address ?? 'N/A'); ?><br>
            <strong>Contact:</strong> <?php echo e($customer->pic_name ?? 'N/A'); ?> | <?php echo e($customer->pic_phone ?? 'N/A'); ?><br>
            <strong>Email:</strong> <?php echo e($customer->pic_email ?? 'N/A'); ?>

        </div>
    </div>

    <div class="section summary-card">
        <div class="section-title">Summary</div>
        <table class="summary-table">
            <tr>
                <td class="summary-label">Total Invoice</td>
                <td class="summary-value">Rp <?php echo e(number_format($summary['total_invoiced'], 0, '.', '.')); ?></td>
            </tr>
            <tr>
                <td class="summary-label">Total Paid</td>
                <td class="summary-value">Rp <?php echo e(number_format($summary['total_paid'], 0, '.', '.')); ?></td>
            </tr>
            <tr>
                <td class="summary-label">Total Outstanding</td>
                <td class="summary-value">Rp <?php echo e(number_format($summary['total_outstanding'], 0, '.', '.')); ?></td>
            </tr>
            <tr>
                <td class="summary-label">Overdue Count</td>
                <td class="summary-value"><?php echo e(number_format($summary['count_overdue'] ?? 0, 0, '.', '.')); ?></td>
            </tr>
        </table>
    </div>

    <div class="section">
        <div class="section-title">Receivable Details</div>
        <table class="transactions-table">
            <thead>
                <tr>
                    <th style="width: 10%;">Date</th>
                    <th style="width: 17%;">Invoice No</th>
                    <th style="width: 17%;">SO No</th>
                    <th style="width: 11%;">Type</th>
                    <th style="width: 15%;">Total</th>
                    <th style="width: 12%;">Paid</th>
                    <th style="width: 12%;">Outstanding</th>
                    <th style="width: 6%;">Status</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    $totalInvoiced = 0;
                    $totalPaid = 0;
                    $totalOutstanding = 0;
                ?>

                <?php $__empty_1 = true; $__currentLoopData = $receivables; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $receivable): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                    <?php
                        $totalInvoiced += (float) $receivable->invoice_amount;
                        $totalPaid += (float) $receivable->paid_amount;
                        $totalOutstanding += (float) $receivable->outstanding_amount;
                        $soaType = $receivable->is_opening ? 'Opening Balance' : 'Invoice';
                    ?>
                    <tr>
                        <td class="text-center">
                            <?php echo e($receivable->invoice_date ? \Carbon\Carbon::parse($receivable->invoice_date)->format('d/m/Y') : '-'); ?>

                        </td>
                        <td class="text-left"><?php echo e($receivable->invoice_number ?? '-'); ?></td>
                        <td class="text-left"><?php echo e($receivable->salesOrder->order_number ?? $receivable->source_so_number ?? '-'); ?></td>
                        <td class="text-center"><?php echo e($soaType); ?></td>
                        <td class="text-right"><?php echo e(number_format((float) $receivable->invoice_amount, 0, '.', '.')); ?></td>
                        <td class="text-right"><?php echo e(number_format((float) $receivable->paid_amount, 0, '.', '.')); ?></td>
                        <td class="text-right"><?php echo e(number_format((float) $receivable->outstanding_amount, 0, '.', '.')); ?></td>
                        <td class="text-center">
                            <span class="badge"><?php echo e(strtoupper($receivable->status)); ?></span>
                        </td>
                    </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                    <tr>
                        <td colspan="8" class="text-center">No receivables found for this customer and filter.</td>
                    </tr>
                <?php endif; ?>

                <tr class="total-row">
                    <td colspan="4" class="text-center">TOTAL</td>
                    <td class="text-right"><?php echo e(number_format($totalInvoiced, 0, '.', '.')); ?></td>
                    <td class="text-right"><?php echo e(number_format($totalPaid, 0, '.', '.')); ?></td>
                    <td class="text-right"><?php echo e(number_format($totalOutstanding, 0, '.', '.')); ?></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="footer">
        Generated by <?php echo e(auth()->user()->name ?? 'System'); ?>

    </div>
</body>

</html>
<?php /**PATH C:\laragon\www\OfficeManagement\resources\views/admin/admin-keuangan/account-receivables/soa.blade.php ENDPATH**/ ?>