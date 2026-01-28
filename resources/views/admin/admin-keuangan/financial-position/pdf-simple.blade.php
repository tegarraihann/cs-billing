<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Statement of Financial Position - {{ $cutoffDate->format('d F Y') }}</title>
    <style>
        @page { margin: 18mm 16mm; }
        body {
            font-family: courier, monospace;
            font-size: 11px;
            color: #000;
            margin: 0;
            padding: 0;
        }
        .wrapper { padding: 8px 8px; }
        .header { text-align: center; margin-bottom: 8px; line-height: 1.3; }
        .company { font-size: 13px; font-weight: bold; text-transform: uppercase; }
        .title { font-size: 14px; font-weight: bold; text-transform: uppercase; margin-top: 2px; }
        .subtitle { font-size: 11px; margin-top: 2px; }
        .summary {
            margin: 6px 0 4px;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4px;
        }
        .card { padding: 4px 6px 6px; }
        .card .label { font-size: 10px; font-weight: bold; }
        .card .value { font-size: 12px; font-weight: bold; text-align: right; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 6px 4px; border-bottom: 1px solid #ccc; }
        th { text-align: left; font-size: 10px; font-weight: bold; }
        td.amount { text-align: right; }
        .section-title { font-weight: bold; margin-bottom: 2px; }
        .group-title { font-size: 10px; font-weight: bold; margin: 4px 0 2px; }
        .total { font-weight: bold; border-top: 1px solid #000; }
        .footer { margin-top: 10px; font-size: 9px; text-align: center; }
    </style>
</head>
<body>
    @php
        $sections = $statement['sections'] ?? [];
        $balanceCheck = $statement['balance_check'] ?? ['assets_total' => 0, 'liabilities_equity_total' => 0, 'difference' => 0];
        $formatCurrency = fn($v) => 'Rp ' . number_format((float) $v, 0, ',', '.');
    @endphp

    <div class="wrapper">
        <div class="header">
            <div class="company">PT. ESHAKA WIJAYA LOGISTICS</div>
            <div class="title">Statement of Financial Position</div>
            <div class="subtitle">{{ $cutoffDate->format('d F Y') }} | {{ $generatedAt->format('d/m/Y H:i') }}</div>
        </div>

        <div class="summary">
            <div class="card">
                <div class="label">Total Assets</div>
                <div class="value">{{ $formatCurrency($balanceCheck['assets_total'] ?? 0) }}</div>
            </div>
            <div class="card">
                <div class="label">Total Liabilities</div>
                <div class="value">{{ $formatCurrency($sections['liabilities']['total'] ?? 0) }}</div>
            </div>
            <div class="card">
                <div class="label">Total Equity</div>
                <div class="value">{{ $formatCurrency($sections['equity']['total'] ?? 0) }}</div>
            </div>
        </div>

        <div class="grid">
            <div>
                <div class="section-title">Assets</div>
                @foreach(($sections['assets']['groups'] ?? []) as $group)
                    <div class="group-title">{{ $group['title'] }}</div>
                    <table>
                        <tbody>
                            @foreach($group['rows'] as $row)
                                <tr>
                                    <td>{{ $row['account_code'] }} - {{ $row['account_name'] }}</td>
                                    <td class="amount">{{ $formatCurrency($row['amount']) }}</td>
                                </tr>
                            @endforeach
                            <tr class="total">
                                <td>Total {{ $group['title'] }}</td>
                                <td class="amount">{{ $formatCurrency($group['total']) }}</td>
                            </tr>
                        </tbody>
                    </table>
                @endforeach
                <div class="group-title">Total Assets</div>
                <table><tr class="total"><td>Total Assets</td><td class="amount">{{ $formatCurrency($sections['assets']['total'] ?? 0) }}</td></tr></table>
            </div>

            <div>
                <div class="section-title">Liabilities & Equity</div>
                @foreach(array_merge($sections['liabilities']['groups'] ?? [], $sections['equity']['groups'] ?? []) as $group)
                    <div class="group-title">{{ $group['title'] }}</div>
                    <table>
                        <tbody>
                            @foreach($group['rows'] as $row)
                                <tr>
                                    <td>{{ $row['account_code'] }} - {{ $row['account_name'] }}</td>
                                    <td class="amount">{{ $formatCurrency($row['amount']) }}</td>
                                </tr>
                            @endforeach
                            <tr class="total">
                                <td>Total {{ $group['title'] }}</td>
                                <td class="amount">{{ $formatCurrency($group['total']) }}</td>
                            </tr>
                        </tbody>
                    </table>
                @endforeach
                <div class="group-title">Total Liabilities & Equity</div>
                <table><tr class="total"><td>Total Liabilities & Equity</td><td class="amount">{{ $formatCurrency($balanceCheck['liabilities_equity_total'] ?? 0) }}</td></tr></table>
            </div>
        </div>

        {{-- <div class="footer">
            Balance Check: Assets {{ $formatCurrency($balanceCheck['assets_total'] ?? 0) }} vs Liabilities+Equity {{ $formatCurrency($balanceCheck['liabilities_equity_total'] ?? 0) }} | Selisih {{ $formatCurrency($balanceCheck['difference'] ?? 0) }}
        </div> --}}
    </div>
</body>
</html>
