<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Statement of Account - <?php echo e($customer->company_name); ?></title>
    <style>
        @page {
            margin: 1cm 1cm;
            font-family: 'Times New Roman', serif;
        }

        body {
            font-family: 'Times New Roman', serif;
            font-size: 10px;
            line-height: 1.3;
            color: #000;
            margin: 0;
            padding: 0;
        }

        .header {
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
        }

        .company-info {
            float: left;
            width: 60%;
        }

        .company-name {
            font-size: 16px;
            font-weight: bold;
            color: #000;
            margin-bottom: 5px;
        }

        .company-address {
            font-size: 9px;
            color: #333;
            line-height: 1.3;
        }

        .document-info {
            float: right;
            width: 35%;
            text-align: right;
        }

        .document-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 8px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .document-details {
            font-size: 9px;
            line-height: 1.3;
        }

        .clear {
            clear: both;
        }

        .customer-section {
            margin: 20px 0;
            padding: 8px 0;
        }

        .customer-title {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 8px;
            color: #000;
        }

        .customer-details {
            font-size: 9px;
            line-height: 1.4;
        }

        .summary-section {
            margin: 12px 0;
            padding: 8px 0;
        }

        .summary-title {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 10px;
            text-align: center;
        }

        .summary-table {
            width: 100%;
            border-collapse: collapse;
        }

        .summary-table td {
            padding: 4px 8px;
            font-size: 9px;
        }

        .summary-label {
            font-weight: bold;
            text-align: left;
            width: 50%;
        }

        .summary-value {
            text-align: right;
            font-family: monospace;
            width: 50%;
        }

        .transactions-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        .transactions-table th,
        .transactions-table td {
            padding: 6px 4px;
            font-size: 8px;
            text-align: center;
        }

        .transactions-table th {
            font-weight: bold;
            text-transform: uppercase;
        }

        .transactions-table .text-left {
            text-align: left;
        }

        .transactions-table .text-right {
            text-align: right;
            font-family: monospace;
        }

        .status-outstanding,
        .status-overdue,
        .status-partial,
        .status-paid {
            background: transparent;
            color: inherit;
        }

        .total-row {
            font-weight: bold;
        }

        .footer {
            position: fixed;
            bottom: 0.5cm;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 8px;
            color: #666;
            padding-top: 5px;
            border-top: 1px solid #ccc;
        }

        .print-info {
            text-align: right;
            font-size: 8px;
            color: #666;
            margin-top: 10px;
            font-style: italic;
        }

        .aging-section {
            margin-top: 20px;
            page-break-inside: avoid;
        }

        .aging-title {
            font-size: 12px;
            font-weight: bold;
            margin-bottom: 8px;
        }

        .aging-table {
            width: 100%;
            border-collapse: collapse;
        }

        .aging-table td {
            padding: 5px;
            font-size: 9px;
            text-align: center;
        }
    </style>
</head>

<body>
    <!-- Header -->
    <div class="header">
        <div class="company-info">
            <div class="company-name">PT. ESHAKA WIJAYA LOGISTICS</div>
            <div class="company-address">
                Ruko Aerohub Citra 8 No.C7-10<br>
                Pegadungan, Kec.Kalideres, Jakarta Barat 11830<br>
                Telp: (021) 538-1234 | Email: info@eshakawijaya.com
            </div>
        </div>
        <div class="document-info">
            <div class="document-title">Statement of Account</div>
            <div class="document-details">
                <strong>Date:</strong> <?php echo e($generated_at->locale('id')->isoFormat('DD MMMM YYYY')); ?><br>
                <?php if($date_from || $date_to): ?>
                    <strong>Period:</strong>
                    <?php echo e($date_from ? \Carbon\Carbon::parse($date_from)->locale('id')->isoFormat('DD MMM YYYY') : 'Start'); ?> -
                    <?php echo e($date_to ? \Carbon\Carbon::parse($date_to)->locale('id')->isoFormat('DD MMM YYYY') : 'End'); ?>

                <?php endif; ?>
            </div>
        </div>
        <div class="clear"></div>
    </div>

    <!-- Customer Information -->
    <div class="customer-section">
        <div class="customer-title">Customer Information</div>
        <div class="customer-details">
            <strong>Company:</strong> <?php echo e($customer->company_name); ?><br>
            <strong>Address:</strong> <?php echo e($customer->address ?? 'N/A'); ?><br>
            <strong>Contact:</strong> <?php echo e($customer->pic_name ?? 'N/A'); ?> | <?php echo e($customer->pic_phone ?? 'N/A'); ?><br>
            <strong>Email:</strong> <?php echo e($customer->pic_email ?? 'N/A'); ?>

        </div>
    </div>

    <!-- Summary -->
    <div class="summary-section">
        <div class="summary-title">Account Summary</div>
        <table class="summary-table">
            <tr>
                <td class="summary-label">Total Invoiced Amount:</td>
                <td class="summary-value">Rp <?php echo e(number_format($summary['total_invoiced'], 0, '.', '.')); ?></td>
            </tr>
            <tr>
                <td class="summary-label">Total Paid Amount:</td>
                <td class="summary-value">Rp <?php echo e(number_format($summary['total_paid'], 0, '.', '.')); ?></td>
            </tr>
            <tr style="font-weight: bold;">
                <td class="summary-label">Total Outstanding:</td>
                <td class="summary-value">Rp <?php echo e(number_format($summary['total_outstanding'], 0, '.', '.')); ?></td>
            </tr>
            <?php if($summary['oldest_invoice']): ?>
                <tr>
                    <td class="summary-label">Oldest Invoice Date:</td>
                    <td class="summary-value">
                        <?php echo e(\Carbon\Carbon::parse($summary['oldest_invoice'])->locale('id')->isoFormat('DD MMMM YYYY')); ?>

                    </td>
                </tr>
            <?php endif; ?>
            <?php if($summary['count_overdue'] > 0): ?>
                <tr style="background-color: #fab1a0;">
                    <td class="summary-label">Overdue Invoices:</td>
                    <td class="summary-value"><?php echo e($summary['count_overdue']); ?> invoice(s)</td>
                </tr>
            <?php endif; ?>
        </table>
    </div>

    <table class="transactions-table">
        <thead style="border: 1px solid #000;">
            <tr>
                <th style="width: 10%;">Date</th>
                <th style="width: 15%;">Invoice No</th>
                <th style="width: 12%;">SO No</th>
                <th style="width: 15%;">Description</th>
                <th style="width: 12%;">Amount</th>
                <th style="width: 12%;">Paid</th>
                <th style="width: 12%;">Outstanding</th>
                <th style="width: 12%;">Status</th>
            </tr>
        </thead>
        <tbody>
            <?php
                $totalInvoiced = 0;
                $totalPaid = 0;
                $totalOutstanding = 0;
            ?>
            <?php $__currentLoopData = $receivables; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $receivable): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <?php
                    $totalInvoiced += $receivable->invoice_amount;
                    $totalPaid += $receivable->paid_amount;
                    $totalOutstanding += $receivable->outstanding_amount;
                ?>
                <tr class="status-<?php echo e($receivable->status); ?>">
                    <td><?php echo e($receivable->invoice_date->format('d/m/Y')); ?></td>
                    <td class="text-left"><?php echo e($receivable->invoice_number); ?></td>
                    <td class="text-left"><?php echo e($receivable->salesOrder->order_number ?? '-'); ?></td>
                    <td class="text-left">
                        <?php if($receivable->salesOrder && $receivable->salesOrder->customer): ?>
                            Logistics Service - <?php echo e($receivable->salesOrder->shipment_type ?? 'General'); ?>

                        <?php else: ?>
                            Service Charge
                        <?php endif; ?>
                    </td>
                    <td class="text-right"><?php echo e(number_format($receivable->invoice_amount, 0, '.', '.')); ?></td>
                    <td class="text-right"><?php echo e(number_format($receivable->paid_amount, 0, '.', '.')); ?></td>
                    <td class="text-right"><?php echo e(number_format($receivable->outstanding_amount, 0, '.', '.')); ?></td>
                    <td style="text-transform: uppercase; font-weight: bold;">
                        <?php echo e($receivable->status); ?><?php if($receivable->days_overdue > 0): ?> (<?php echo e($receivable->days_overdue); ?>

                        days)<?php endif; ?>
                    </td>
                </tr>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

            <!-- Total Row -->
            <tr class="total-row">
                <td colspan="4" style="text-align: center; font-weight: bold;">TOTAL</td>
                <td class="text-right"><?php echo e(number_format($totalInvoiced, 0, '.', '.')); ?></td>
                <td class="text-right"><?php echo e(number_format($totalPaid, 0, '.', '.')); ?></td>
                <td class="text-right"><?php echo e(number_format($totalOutstanding, 0, '.', '.')); ?></td>
                <td></td>
            </tr>
        </tbody>
    </table>

    <?php if($receivables->where('status', '!=', 'paid')->count() > 0): ?>
        <!-- Aging Analysis -->
        <div class="aging-section">
            <div class="aging-title">Aging Analysis</div>
            <table class="aging-table">
                <thead style="border: 1px solid #333; fonr-weight: bold;">
                    <tr>
                        <th>Current (0-30 days)</th>
                        <th>31-60 days</th>
                        <th>61-90 days</th>
                        <th>Over 90 days</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        $aging = [
                            'current' => 0,
                            'days_31_60' => 0,
                            'days_61_90' => 0,
                            'over_90' => 0
                        ];

                        foreach ($receivables->where('status', '!=', 'paid') as $receivable) {
                            $days = $receivable->days_overdue;
                            if ($days <= 30) {
                                $aging['current'] += $receivable->outstanding_amount;
                            } elseif ($days <= 60) {
                                $aging['days_31_60'] += $receivable->outstanding_amount;
                            } elseif ($days <= 90) {
                                $aging['days_61_90'] += $receivable->outstanding_amount;
                            } else {
                                $aging['over_90'] += $receivable->outstanding_amount;
                            }
                        }
                    ?>
                    <tr>
                        <td>Rp <?php echo e(number_format($aging['current'], 0, '.', '.')); ?></td>
                        <td>Rp <?php echo e(number_format($aging['days_31_60'], 0, '.', '.')); ?></td>
                        <td>Rp <?php echo e(number_format($aging['days_61_90'], 0, '.', '.')); ?></td>
                        <td>Rp <?php echo e(number_format($aging['over_90'], 0, '.', '.')); ?></td>
                    </tr>
                </tbody>
            </table>
        </div>
    <?php endif; ?>

    <!-- Print Information -->
    <div class="print-info">
        Generated on: <?php echo e($generated_at->locale('id')->isoFormat('DD MMMM YYYY HH:mm')); ?><br>
        By: <?php echo e(auth()->user()->name ?? 'System'); ?>

    </div>

    <!-- Footer -->
    <div class="footer">
        Statement of Account | <?php echo e($customer->company_name); ?> | PT. Eshaka Wijaya Logistics | Page 1 of 1
    </div>
</body>

</html>
<?php /**PATH C:\laragon\www\OfficeManagement\resources\views/admin/admin-keuangan/account-receivables/soa.blade.php ENDPATH**/ ?>
