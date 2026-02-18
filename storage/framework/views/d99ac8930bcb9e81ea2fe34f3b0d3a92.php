<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>General Expenses Report</title>
    <style>
        @page { size: A4; margin: 18mm 14mm; }
        body { font-family: courier, monospace; font-size: 9pt; color: #000; }
        h1 { margin: 0 0 4px 0; font-size: 14pt; letter-spacing: 1px; }
        h2 { margin: 2px 0 10px 0; font-size: 11pt; }
        .header { border-bottom: 2px solid #1f3b2c; padding-bottom: 6px; margin-bottom: 10px; }
        .meta { font-size: 8pt; margin-bottom: 6px; }
        .meta span { display: inline-block; margin-right: 12px; }
        table { width: 100%; border-collapse: collapse; }
        th { background: #2e5b3a; color: #fff; padding: 6px 4px; text-align: left; font-weight: bold; }
        td { padding: 5px 4px; border-bottom: 1px solid #ddd; }
        tr:nth-child(even) td { background: #f7f9f7; }
        .right { text-align: right; }
        .total-row td { border-top: 2px solid #000; font-weight: bold; background: #eef3ee; }
        .small { font-size: 8pt; }
    </style>
<?php
    $periodLabel = '-';
    if (!empty($filters['period'])) {
        $periodLabel = $filters['period'];
    } elseif (!empty($filters['month']) && !empty($filters['year'])) {
        $periodLabel = sprintf('%02d-%04d', $filters['month'], $filters['year']);
    }
?>
</head>
<body>
    <div class="header">
        <h1>PT. ESHAKA WIJAYA LOGISTICS</h1>
        <h2>General Expenses Report</h2>
        <div class="meta">
            <span>Period: <?php echo e($periodLabel); ?></span>
            <?php if($filters['expense_date']): ?> <span>Date: <?php echo e($filters['expense_date']); ?></span><?php endif; ?>
            <?php if($filters['category']): ?> <span>Category: <?php echo e($filters['category']); ?></span><?php endif; ?>
            <?php if($filters['status']): ?> <span>Status: <?php echo e(strtoupper($filters['status'])); ?></span><?php endif; ?>
            <span>Generated: <?php echo e($generatedAt->format('Y-m-d H:i')); ?></span>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th style="width: 12%;">Date</th>
                <th style="width: 18%;">Category</th>
                <th style="width: 30%;">Description</th>
                <th style="width: 12%;">Status</th>
                <th style="width: 12%;">Items</th>
                <th style="width: 16%;" class="right">Amount</th>
            </tr>
        </thead>
        <tbody>
            <?php $__empty_1 = true; $__currentLoopData = $expenses; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $exp): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                <tr>
                    <td><?php echo e(optional($exp->expense_date)->format('Y-m-d')); ?></td>
                    <td><?php echo e($exp->category); ?></td>
                    <td><?php echo e($exp->notes ?? '-'); ?></td>
                    <td><?php echo e(strtoupper($exp->status)); ?></td>
                    <td><?php echo e($exp->items->count()); ?></td>
                    <td class="right"><?php echo e(number_format($exp->total_amount, 2)); ?></td>
                </tr>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
                <tr>
                    <td colspan="6" class="small">No data.</td>
                </tr>
            <?php endif; ?>
            <tr class="total-row">
                <td colspan="5">TOTAL</td>
                <td class="right"><?php echo e(number_format($totalAmount, 2)); ?></td>
            </tr>
        </tbody>
    </table>
</body>
</html>
<?php /**PATH C:\laragon\www\OfficeManagement\resources\views\admin\admin-keuangan\general-expenses\pdf.blade.php ENDPATH**/ ?>