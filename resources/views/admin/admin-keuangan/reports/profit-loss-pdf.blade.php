<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Laporan Laba Rugi - {{ $period->period_name }}</title>
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
            @php
                $periodLabel = $period->start_date
                    ? \Carbon\Carbon::parse($period->start_date)->translatedFormat('F Y')
                    : $period->period_name;
            @endphp
            <strong>{{ mb_strtoupper($periodLabel, 'UTF-8') }} TRANSACTION PERIODE</strong>
        </div>
        {{-- <div class="period-info">
            Periode: {{ \Carbon\Carbon::parse($period->start_date)->format('d M Y') }} - {{ \Carbon\Carbon::parse($period->end_date)->format('d M Y') }}
        </div> --}}
        {{-- <div class="period-info">
            Tanggal Cetak: {{ $generatedAt->format('d M Y H:i') }}
        </div> --}}
    </div>

    <!-- PENDAPATAN -->
    <div class="section">
        <div class="section-title">REVENUE</div>

        @php
            $mainRevenueEntries = collect($reportData['revenues']['main'] ?? []);
            $otherRevenueEntries = collect($reportData['revenues']['other'] ?? []);
            $allRevenueEntries = $mainRevenueEntries->merge($otherRevenueEntries);

            $isInterestEntry = function ($entry) {
                $name = strtolower((string) data_get($entry, 'account.account_name', ''));
                $desc = strtolower((string) data_get($entry, 'description', ''));
                $cat = strtolower((string) data_get($entry, 'additional_data.category', ''));
                $combined = $name . ' ' . $desc . ' ' . $cat;

                return str_contains($combined, 'bunga bank')
                    || str_contains($combined, 'interest')
                    || str_contains($combined, 'bunga');
            };

            $interestEntries = $allRevenueEntries->filter($isInterestEntry);
            $interestTotal = $interestEntries->sum(fn($entry) => data_get($entry, 'amount', 0));

            $otherIncomeEntries = $allRevenueEntries->filter(function ($entry) use ($isInterestEntry) {
                if ($isInterestEntry($entry)) {
                    return false;
                }
                if (data_get($entry, 'reference_type') === 'other_income') {
                    return true;
                }
                return data_get($entry, 'account.account_category') === 'revenue_other';
            });
            $otherIncomeTotal = $otherIncomeEntries->sum(fn($entry) => data_get($entry, 'amount', 0));

            $serviceRevenueTotal = (float) data_get($reportData, 'revenues.total', 0) - $interestTotal - $otherIncomeTotal;
            if ($serviceRevenueTotal < 0) {
                $serviceRevenueTotal = 0;
            }
        @endphp

        <div class="item" style="background-color: #e8f2e8;">
            <span class="item-name">Service Revenue</span>
            <span class="item-amount">Rp {{ number_format($serviceRevenueTotal, 0, ',', '.') }}</span>
        </div>

        <div class="item" style="background-color: #e8f2e8;">
            <span class="item-name">Interest Revenue</span>
            <span class="item-amount">Rp {{ number_format($interestTotal, 0, ',', '.') }}</span>
        </div>

        <div class="item" style="background-color: #e8f2e8;">
            <span class="item-name">Other Income</span>
            <span class="item-amount">Rp {{ number_format($otherIncomeTotal, 0, ',', '.') }}</span>
        </div>

        <div class="total-row" style="background: #f1f1f1; border-top: 1px solid #ccc; padding: 8px 10px;">
            <span class="item-name" style="font-weight: bold;">TOTAL REVENUES</span>
            <span class="item-amount" style="font-weight: bold;">Rp {{ number_format($reportData['revenues']['total'] ?? 0, 0, ',', '.') }}</span>
        </div>
    </div>

    <!-- EXPENSES -->
    <div class="section">
        <div class="section-title">EXPENSES</div>

        @php
            $operationalGrouped = data_get($reportData, 'expenses.operational.grouped', []);
            $salaryEntries = data_get($reportData, 'expenses.salary', []);
            $adminEntries = data_get($reportData, 'expenses.admin', []);
            $otherEntries = data_get($reportData, 'expenses.other', []);
            $marketingEntries = data_get($reportData, 'expenses.marketing', []);
            $consumptionEntries = data_get($reportData, 'expenses.consumption', []);
            $outsideEntries = data_get($reportData, 'expenses.outside', []);
            $prepaidEntries = data_get($reportData, 'expenses.prepaid', []);

            $allExpenseEntries = collect($salaryEntries)
                ->merge(collect($operationalGrouped)->flatMap(fn($cat) => $cat['entries'] ?? []))
                ->merge($adminEntries)
                ->merge($consumptionEntries)
                ->merge($outsideEntries)
                ->merge($prepaidEntries)
                ->merge($otherEntries)
                ->merge($marketingEntries);

            $normalizeText = function ($value) {
                return strtolower(trim((string) $value));
            };

            $matchesAny = function ($haystack, array $keywords) {
                foreach ($keywords as $keyword) {
                    $keyword = strtolower($keyword);
                    if ($keyword !== '' && str_contains($haystack, $keyword)) {
                        return true;
                    }
                }
                return false;
            };

            $expenseTotals = [
                'Salaries Expense' => 0,
                'Rent Expense' => 0,
                'Outside Assignments Expense' => 0,
                'Operational Expense' => 0,
                'Electricity, Water & Internet Expense' => 0,
                'E-Toll & Gasoline Expense' => 0,
                'IPL Expense' => 0,
                'Equipment Expense' => 0,
                'Marketing Comission Expense' => 0,
                'Entertainment Expense' => 0,
                'Maintenance Expenses' => 0,
                'Supplies Expense' => 0,
                'Consumption Expense' => 0,
                'Other Expense' => 0,
                'Administrative Bank Expense' => 0,
                'Monthly Card Expense' => 0,
            ];

            $assignExpenseLine = function ($entry) use ($normalizeText, $matchesAny) {
                $name = $normalizeText(data_get($entry, 'account.account_name', ''));
                $desc = $normalizeText(data_get($entry, 'description', ''));
                $cat = $normalizeText(data_get($entry, 'additional_data.category_name', ''));
                $pcat = $normalizeText(data_get($entry, 'additional_data.category', ''));
                $text = trim($name . ' ' . $desc . ' ' . $cat . ' ' . $pcat);

                $accountCategory = data_get($entry, 'account.account_category');
                if ($accountCategory === 'expense_salary') {
                    return 'Salaries Expense';
                }
                if ($accountCategory === 'expense_consumption') {
                    return 'Consumption Expense';
                }
                if ($accountCategory === 'expense_outside') {
                    return 'Outside Assignments Expense';
                }
                if ($accountCategory === 'expense_monthly_card') {
                    return 'Monthly Card Expense';
                }

                if ($matchesAny($text, ['entertain'])) {
                    return 'Entertainment Expense';
                }
                if ($matchesAny($text, ['monthly card', 'kartu bulanan', 'card bulanan', 'biaya kartu', 'kartu kredit', 'kartu bank', 'bank card', 'card bank', 'admin kartu', 'potongan kartu', 'biaya kartu bank'])) {
                    return 'Monthly Card Expense';
                }
                if ($matchesAny($text, ['bunga bank', 'interest'])) {
                    return 'Administrative Bank Expense';
                }
                if ($matchesAny($text, ['admin bank', 'bank admin'])) {
                    return 'Administrative Bank Expense';
                }
                if ($matchesAny($text, ['electric', 'listrik', 'water', 'air', 'internet'])) {
                    return 'Electricity, Water & Internet Expense';
                }
                if ($matchesAny($text, ['delivery', 'pengiriman', 'dokumen', 'invoice', 'toll', 'tol', 'e-toll', 'gasoline', 'bensin', 'fuel', 'bbm'])) {
                    return 'E-Toll & Gasoline Expense';
                }
                if ($matchesAny($text, ['ipl'])) {
                    return 'IPL Expense';
                }
                if ($matchesAny($text, ['marketing', 'komisi', 'commission'])) {
                    return 'Marketing Comission Expense';
                }
                if ($matchesAny($text, ['maintenance', 'pemeliharaan'])) {
                    return 'Maintenance Expenses';
                }
                if ($matchesAny($text, ['vehicle', 'kendaraan', 'fleet'])) {
                    return 'Operational Expense';
                }
                if ($matchesAny($text, ['equipment', 'peralatan'])) {
                    return 'Equipment Expense';
                }
                if ($matchesAny($text, ['supplies', 'atk'])) {
                    return 'Supplies Expense';
                }
                if ($matchesAny($text, ['consumption', 'konsumsi', 'galon', 'snack', 'makan', 'minum'])) {
                    return 'Consumption Expense';
                }
                if ($matchesAny($text, ['outside assignment', 'dinas', 'luar kota', 'luar negeri'])) {
                    return 'Outside Assignments Expense';
                }
                if ($matchesAny($text, ['service', 'jasa'])) {
                    return 'Maintenance Expenses';
                }
                if ($matchesAny($text, ['rent', 'sewa'])) {
                    return 'Rent Expense';
                }
                if ($matchesAny($text, ['operational', 'operasional', 'trucking', 'handling'])) {
                    return 'Operational Expense';
                }

                return null;
            };

            foreach ($allExpenseEntries as $entry) {
                $amount = (float) data_get($entry, 'amount', 0);
                if ($amount == 0) {
                    continue;
                }

                $line = $assignExpenseLine($entry);
                if ($line) {
                    $expenseTotals[$line] += $amount;
                    continue;
                }

                $expenseTotals['Other Expense'] += $amount;
            }

            $expenseLines = collect([
                ['label' => 'Salaries Expense', 'amount' => $expenseTotals['Salaries Expense']],
                ['label' => 'Rent Expense', 'amount' => $expenseTotals['Rent Expense']],
                ['label' => 'Outside Assignments Expense', 'amount' => $expenseTotals['Outside Assignments Expense']],
                ['label' => 'Operational Expense', 'amount' => $expenseTotals['Operational Expense']],
                ['label' => 'Electricity, Water & Internet Expense', 'amount' => $expenseTotals['Electricity, Water & Internet Expense']],
                ['label' => 'E-Toll & Gasoline Expense', 'amount' => $expenseTotals['E-Toll & Gasoline Expense']],
                ['label' => 'IPL Expense', 'amount' => $expenseTotals['IPL Expense']],
                ['label' => 'Equipment Expense', 'amount' => $expenseTotals['Equipment Expense']],
                ['label' => 'Marketing Comission Expense', 'amount' => $expenseTotals['Marketing Comission Expense']],
                ['label' => 'Entertainment Expense', 'amount' => $expenseTotals['Entertainment Expense']],
                ['label' => 'Maintenance Expenses', 'amount' => $expenseTotals['Maintenance Expenses']],
                ['label' => 'Supplies Expense', 'amount' => $expenseTotals['Supplies Expense']],
                ['label' => 'Consumption Expense', 'amount' => $expenseTotals['Consumption Expense']],
                ['label' => 'Other Expense', 'amount' => $expenseTotals['Other Expense']],
                ['label' => 'Administrative Bank Expense', 'amount' => $expenseTotals['Administrative Bank Expense']],
                ['label' => 'Monthly Card Expense', 'amount' => $expenseTotals['Monthly Card Expense']],
            ]);
        @endphp

        @if($expenseLines->count() > 0)
            @foreach($expenseLines as $line)
                <div class="item" style="background-color: #e8f2e8;">
                    <span class="item-name">{{ $line['label'] }}</span>
                    <span class="item-amount">Rp {{ number_format($line['amount'] ?? 0, 0, ',', '.') }}</span>
                </div>
            @endforeach
        @else
            <div class="item" style="text-align: center; font-style: italic; color: #666;">
                Tidak ada data expenses
            </div>
        @endif

        <div class="total-row" style="background: #f1f1f1; border-top: 1px solid #ccc; padding: 8px 10px;">
            <span class="item-name" style="font-weight: bold;">TOTAL EXPENSES</span>
            <span class="item-amount" style="font-weight: bold;">Rp {{ number_format($reportData['expenses']['total'] ?? 0, 0, ',', '.') }}</span>
        </div>
        @php
            $profitBeforeTax = ($reportData['revenues']['total'] ?? 0) - ($reportData['expenses']['total'] ?? 0);
        @endphp
        <div class="total-row" style="background: #e6e6e6; border-top: 1px solid #999; padding: 8px 10px;">
            <span class="item-name" style="font-weight: bold">PROFIT BEFORE TAX EXPENSES</span>
            <span class="item-amount" style="font-weight: bold">Rp {{ number_format($profitBeforeTax, 0, ',', '.') }}</span>
        </div>
    </div>

    <!-- TAX EXPENSES -->
    @php
        $taxE05 = data_get($reportData, 'taxes.e05.total', 0);
        $tax2 = data_get($reportData, 'taxes.two_percent.total', 0);
        $totalTax = data_get($reportData, 'taxes.total', $taxE05 + $tax2);
        $netProfitMonthly = data_get($reportData, 'net_profit_closing', $profitBeforeTax - $totalTax);
    @endphp
    <div class="section">
        <div class="section-title">TAX EXPENSES</div>
        <div class="item" style="background-color: #e8f2e8;">
            <span class="item-name">TAX EXPENSE 0.5%</span>
            <span class="item-amount">Rp {{ number_format($taxE05, 0, ',', '.') }}</span>
        </div>
        <div class="item" style="background-color: #e8f2e8;">
            <span class="item-name">TAX EXPENSE 2%</span>
            <span class="item-amount">Rp {{ number_format($tax2, 0, ',', '.') }}</span>
        </div>
        <div class="total-row" style="background: #f1f1f1; border-top: 1px solid #ccc; padding: 8px 10px;">
            <span class="item-name" style="font-weight: bold">TOTAL TAX EXPENSE</span>
            <span class="item-amount">Rp {{ number_format($totalTax, 0, ',', '.') }}</span>
        </div>
        <div style="height: 24px;"></div>
        <div class="total-row" style="background: #e0e0e0; border-top: 1px solid #999; padding: 8px 10px;">
            <span class="item-name" style="font-weight: bold">PROFIT/LOSS FOR THE CURRENT PERIOD</span>
            <span class="item-amount" style="font-weight: bold">Rp {{ number_format($netProfitMonthly, 0, ',', '.') }}</span>
        </div>
    </div>

    <!-- RINGKASAN -->
    @php
        $totalRevenue = $reportData['revenues']['total'] ?? 0;
        $totalExpense = $reportData['expenses']['total'] ?? 0;
        $netProfit = $totalRevenue - $totalExpense;
        $isProfit = $netProfit >= 0;
    @endphp


    <!-- Footer -->
    <div class="footer">
        <div><strong>© {{ date('Y') }} PT. Eshaka Wijaya Logistics</strong></div>
        <div>Laporan ini bersifat rahasia dan dibuat secara otomatis oleh sistem</div>
        <div>Dicetak pada: {{ $generatedAt->format('d/m/Y H:i:s') }}</div>

        @if($period->status === 'closed' && $period->approved_at)
            <div style="margin-top: 10px; font-weight: bold; color: #155724;">
                ✓ LAPORAN TELAH DIFINALISASI
            </div>
            <div style="color: #155724;">
                Tanggal Finalisasi: {{ \Carbon\Carbon::parse($period->approved_at)->format('d M Y H:i') }}
            </div>
        @endif
    </div>
</body>
</html>
