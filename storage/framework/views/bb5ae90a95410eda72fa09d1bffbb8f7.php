<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Laporan Laba Rugi - <?php echo e($period->period_name); ?></title>
    <style>
        body {
            font-family: "Courier", monospace;
            font-size: 10px;
            line-height: 1.4;
            margin: 20px;
            color: #000;
        }

        * {
            font-family: inherit;
        }

        .section-title,
        .item,
        .total-row,
        .header div,
        .item-name,
        .item-amount {
            font-family: "Courier", monospace !important;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
        }

        .company-name,
        .report-title,
        .period-info {
            display: block;
            margin: 0;
            padding: 8px 0;
            background-color: #556B2F;
            color: white;
            font-family: "Courier", monospace;
        }

        .company-name {
            font-size: 16px;
            font-weight: bold;
        }

        .report-title {
            font-size: 16px;
            font-weight: bold;
        }

        .period-info {
            font-size: 16px;
        }

        .section {
            margin: 20px 0;
        }

        .section-title {
            font-size: small;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .item {
            padding: 3px 10px;
            margin-left: 38px; /* indent sub items without shrinking content width */
            border-bottom: 1px dotted #ccc;
            font-size: small;
            font-weight: normal;
        }

        .item-name {
            width: 70%;
            display: inline-block;
            font-family: 'Courier New', monospace;
            font-weight: normal;
        }

        .item-amount {
            width: 25%;
            display: inline-block;
            text-align: right;
            font-family: 'Courier New', monospace;
            font-weight: normal;
        }

        .total-row {
            font-weight: bold;
            font-size: small;
            background-color: #e0e0e0;
            padding: 8px 10px;
            border-top: 2px solid #000;
            margin-top: 10px;
        }

        .summary {
            margin-top: 30px;
            border: 2px solid #000;
            padding: 15px;
        }

        .summary-title {
            font-size: 12px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 15px;
        }

        .summary-item {
            padding: 5px 0;
            border-bottom: 1px solid #ccc;
        }

        .net-profit {
            font-weight: bold;
            font-size: 12px;
            padding: 10px;
            margin-top: 10px;
            border-top: 2px solid #000;
        }

        .profit {
            background-color: #d4edda;
            color: #155724;
        }

        .loss {
            background-color: #f8d7da;
            color: #721c24;
        }

        .footer {
            margin-top: 40px;
            font-size: 8px;
            text-align: center;
            border-top: 1px solid #ccc;
            padding-top: 15px;
        }

        .status-badge {
            display: inline-block;
            padding: 3px 8px;
            border: 1px solid #666;
            font-size: 8px;
            font-weight: bold;
        }

        .status-closed {
            background-color: #d4edda;
            color: #155724;
            border-color: #155724;
        }

        .status-draft {
            background-color: #fff3cd;
            color: #856404;
            border-color: #856404;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="company-name">PT. ESHAKA WIJAYA LOGISTICS</div>
        <div class="report-title">INCOME STATEMENT</div>
        <div class="period-info">
            <?php
                $periodLabel = $period->start_date
                    ? \Carbon\Carbon::parse($period->start_date)->translatedFormat('F Y')
                    : $period->period_name;
            ?>
            <strong><?php echo e(mb_strtoupper($periodLabel, 'UTF-8')); ?> TRANSACTION PERIODE</strong>
        </div>
        
        
    </div>

    <!-- PENDAPATAN -->
    <div class="section">
        <div class="section-title">REVENUE</div>

        <?php
            $serviceRevenueEntries = $reportData['revenues']['main'] ?? [];
            $serviceRevenueTotal = collect($serviceRevenueEntries)->sum(fn($entry) => data_get($entry, 'amount', 0));

            $interestMandiri = (float) data_get($reportData, 'revenues.other_income_breakdown.bunga_mandiri.total', 0);
            $interestBca = (float) data_get($reportData, 'revenues.other_income_breakdown.bunga_bca.total', 0);
            $interestTotal = $interestMandiri + $interestBca;

            $otherIncomeTotal = (float) data_get($reportData, 'revenues.other_income_breakdown.lainnya.total', 0);
        ?>

        <div class="item" style="background-color: #e8f2e8;">
            <span class="item-name">Service Revenue</span>
            <span class="item-amount">Rp <?php echo e(number_format($serviceRevenueTotal, 0, ',', '.')); ?></span>
        </div>

        <div class="item" style="background-color: #e8f2e8;">
            <span class="item-name">Interest Revenue</span>
            <span class="item-amount">Rp <?php echo e(number_format($interestTotal, 0, ',', '.')); ?></span>
        </div>

        <div class="item" style="background-color: #e8f2e8;">
            <span class="item-name">Other Income</span>
            <span class="item-amount">Rp <?php echo e(number_format($otherIncomeTotal, 0, ',', '.')); ?></span>
        </div>

        <div class="total-row" style="background: #f1f1f1; border-top: 1px solid #ccc; padding: 8px 10px;">
            <span class="item-name" style="font-weight: bold;">TOTAL REVENUES</span>
            <span class="item-amount" style="font-weight: bold;">Rp <?php echo e(number_format($reportData['revenues']['total'] ?? 0, 0, ',', '.')); ?></span>
        </div>
    </div>

    <!-- EXPENSES -->
    <div class="section">
        <div class="section-title">EXPENSES</div>

        <?php
            $operationalGrouped = data_get($reportData, 'expenses.operational.grouped', []);
            $salaryEntries = data_get($reportData, 'expenses.salary', []);
            $adminEntries = data_get($reportData, 'expenses.admin', []);
            $otherEntries = data_get($reportData, 'expenses.other', []);

            $allExpenseEntries = collect($salaryEntries)
                ->merge(collect($operationalGrouped)->flatMap(fn($cat) => $cat['entries'] ?? []))
                ->merge($adminEntries)
                ->merge($otherEntries);

            $sumByKeyword = function ($keywords) use ($allExpenseEntries) {
                $keywords = (array) $keywords;
                return $allExpenseEntries
                    ->filter(function ($entry) use ($keywords) {
                        $name = strtolower((string) data_get($entry, 'account.account_name', ''));
                        $desc = strtolower((string) data_get($entry, 'description', ''));
                        $cat = strtolower((string) data_get($entry, 'additional_data.category_name', ''));
                        foreach ($keywords as $kw) {
                            $kw = strtolower($kw);
                            if ($kw !== '' && (str_contains($name, $kw) || str_contains($desc, $kw) || str_contains($cat, $kw))) {
                                return true;
                            }
                        }
                        return false;
                    })
                    ->sum(fn($e) => data_get($e, 'amount', 0));
            };

            $expenseLines = collect([
                ['label' => 'Salaries Expense', 'amount' => collect($salaryEntries)->sum(fn($e) => data_get($e, 'amount', 0))],
                ['label' => 'Rent Expense', 'amount' => $sumByKeyword(['rent', 'sewa'])],
                ['label' => 'General & Administrative Expense', 'amount' => $sumByKeyword(['petty', 'administrative'])],
                ['label' => 'Operating Expense', 'amount' => $sumByKeyword(['operational', 'operasional', 'lain', 'truck', 'trucking'])],
                ['label' => 'Electricity, Water & Internet Expense', 'amount' => $sumByKeyword(['electric', 'listrik', 'water', 'air', 'internet'])],
                ['label' => 'Delivery Expense', 'amount' => $sumByKeyword(['delivery', 'pengiriman', 'dokumen'])],
                ['label' => 'IPL Expense', 'amount' => $sumByKeyword(['ipl'])],
                ['label' => 'Vehicle Maintenance Expense', 'amount' => $sumByKeyword(['vehicle', 'kendaraan', 'fleet'])],
                ['label' => 'Equipment Maintenance Expense', 'amount' => $sumByKeyword(['equipment', 'peralatan', 'maintenance'])],
                ['label' => 'Marketing Comission Expense', 'amount' => $sumByKeyword(['marketing', 'komisi'])],
                ['label' => 'Depreciation Expense - Equipment', 'amount' => $sumByKeyword(['depreciation', 'penyusutan'])],
                ['label' => 'Entertainment Expense', 'amount' => $sumByKeyword(['entertain'])],
                ['label' => 'Service Expense', 'amount' => $sumByKeyword(['service'])],
                ['label' => 'Supplies Expense', 'amount' => $sumByKeyword(['supplies', 'atk'])],
                ['label' => 'Other Expense', 'amount' => $sumByKeyword(['other', 'lain'])],
                ['label' => 'Administrative Bank Expense', 'amount' => $sumByKeyword(['admin bank', 'bank admin'])],
                ['label' => 'Bank Interest Expense', 'amount' => $sumByKeyword(['interest', 'bunga bank'])],
                ['label' => 'Monthly Card Expense', 'amount' => $sumByKeyword(['card', 'kartu'])],
            ]);
        ?>

        <?php if($expenseLines->count() > 0): ?>
            <?php $__currentLoopData = $expenseLines; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $line): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="item" style="background-color: #e8f2e8;">
                    <span class="item-name"><?php echo e($line['label']); ?></span>
                    <span class="item-amount">Rp <?php echo e(number_format($line['amount'] ?? 0, 0, ',', '.')); ?></span>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        <?php else: ?>
            <div class="item" style="text-align: center; font-style: italic; color: #666;">
                Tidak ada data expenses
            </div>
        <?php endif; ?>

        <div class="total-row" style="background: #f1f1f1; border-top: 1px solid #ccc; padding: 8px 10px;">
            <span class="item-name" style="font-weight: bold;">TOTAL EXPENSES</span>
            <span class="item-amount" style="font-weight: bold;">Rp <?php echo e(number_format($reportData['expenses']['total'] ?? 0, 0, ',', '.')); ?></span>
        </div>
        <?php
            $profitBeforeTax = ($reportData['revenues']['total'] ?? 0) - ($reportData['expenses']['total'] ?? 0);
        ?>
        <div class="total-row" style="background: #e6e6e6; border-top: 1px solid #999; padding: 8px 10px;">
            <span class="item-name" style="font-weight: bold">PROFIT BEFORE TAX EXPENSES</span>
            <span class="item-amount" style="font-weight: bold">Rp <?php echo e(number_format($profitBeforeTax, 0, ',', '.')); ?></span>
        </div>
    </div>

    <!-- TAX EXPENSES -->
    <?php
        $taxE05 = data_get($reportData, 'taxes.e05.total', 0);
        $tax2 = data_get($reportData, 'taxes.two_percent.total', 0);
        $totalTax = data_get($reportData, 'taxes.total', $taxE05 + $tax2);
        $netProfitMonthly = data_get($reportData, 'net_profit_closing', $profitBeforeTax - $totalTax);
    ?>
    <div class="section">
        <div class="section-title">TAX EXPENSES</div>
        <div class="item" style="background-color: #e8f2e8;">
            <span class="item-name">TAX EXPENSE 0.5%</span>
            <span class="item-amount">Rp <?php echo e(number_format($taxE05, 0, ',', '.')); ?></span>
        </div>
        <div class="item" style="background-color: #e8f2e8;">
            <span class="item-name">TAX EXPENSE 2%</span>
            <span class="item-amount">Rp <?php echo e(number_format($tax2, 0, ',', '.')); ?></span>
        </div>
        <div class="total-row" style="background: #f1f1f1; border-top: 1px solid #ccc; padding: 8px 10px;">
            <span class="item-name" style="font-weight: bold">TOTAL TAX EXPENSE</span>
            <span class="item-amount">Rp <?php echo e(number_format($totalTax, 0, ',', '.')); ?></span>
        </div>
        <div style="height: 24px;"></div>
        <div class="total-row" style="background: #e0e0e0; border-top: 1px solid #999; padding: 8px 10px;">
            <span class="item-name" style="font-weight: bold">PROFIT/LOSS FOR THE CURRENT PERIOD</span>
            <span class="item-amount" style="font-weight: bold">Rp <?php echo e(number_format($netProfitMonthly, 0, ',', '.')); ?></span>
        </div>
    </div>

    <!-- RINGKASAN -->
    <?php
        $totalRevenue = $reportData['revenues']['total'] ?? 0;
        $totalExpense = $reportData['expenses']['total'] ?? 0;
        $netProfit = $totalRevenue - $totalExpense;
        $isProfit = $netProfit >= 0;
    ?>


    <!-- Footer -->
    <div class="footer">
        <div><strong>© <?php echo e(date('Y')); ?> PT. Eshaka Wijaya Logistics</strong></div>
        <div>Laporan ini bersifat rahasia dan dibuat secara otomatis oleh sistem</div>
        <div>Dicetak pada: <?php echo e($generatedAt->format('d/m/Y H:i:s')); ?></div>

        <?php if($period->status === 'closed' && $period->approved_at): ?>
            <div style="margin-top: 10px; font-weight: bold; color: #155724;">
                ✓ LAPORAN TELAH DIFINALISASI
            </div>
            <div style="color: #155724;">
                Tanggal Finalisasi: <?php echo e(\Carbon\Carbon::parse($period->approved_at)->format('d M Y H:i')); ?>

            </div>
        <?php endif; ?>
    </div>
</body>
</html>
<?php /**PATH C:\laragon\www\OfficeManagement\resources\views/admin/admin-keuangan/reports/profit-loss-pdf.blade.php ENDPATH**/ ?>