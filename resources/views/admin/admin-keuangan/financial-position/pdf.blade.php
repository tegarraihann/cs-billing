<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Statement of Financial Position - {{ $cutoffDate->format('d F Y') }}</title>
    <style>
        body {
            font-family: "Courier New", monospace;
            font-size: 10px;
            color: #000;
            margin: 20px;
            line-height: 1.4;
        }

        .header {
            text-align: center;
            margin-bottom: 25px;
            padding-bottom: 12px;
            border-bottom: 2px solid #000;
        }

        .company-name {
            font-family: "Helvetica", "Arial", sans-serif;
            font-size: 16px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .report-title {
            font-family: "Helvetica", "Arial", sans-serif;
            font-size: 14px;
            font-weight: bold;
            margin-top: 5px;
        }

        .period-info {
            font-family: "Helvetica", "Arial", sans-serif;
            font-size: 10px;
            margin-top: 4px;
        }

        .section {
            margin-bottom: 18px;
        }

        .section-title {
            font-size: 12px;
            font-weight: bold;
            padding: 8px 10px;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
        }

        .group-title {
            font-size: 11px;
            font-weight: bold;
            padding: 6px 10px;
            background-color: #fafafa;
            border: 1px solid #e0e0e0;
            border-top: none;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
        }

        th, td {
            padding: 6px 10px;
            border-bottom: 1px solid #e6e6e6;
        }

        th {
            text-align: left;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            background-color: #f9f9f9;
        }

        td.amount {
            text-align: right;
            width: 25%;
        }


        .total-row td {
            font-weight: bold;
            background-color: #f4f4f4;
            border-top: 2px solid #000;
        }

        .summary-box {
            border: 2px solid #000;
            padding: 12px 15px;
            margin-top: 25px;
        }

        .summary-title {
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            text-align: center;
            margin-bottom: 12px;
        }

        .summary-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
        }

        .summary-item strong {
            font-size: 11px;
        }

        .difference-positive {
            color: #155724;
        }

        .difference-negative {
            color: #b10000;
        }

        .footer {
            margin-top: 35px;
            font-size: 8px;
            text-align: center;
            border-top: 1px solid #ccc;
            padding-top: 12px;
        }

        .badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 10px;
            font-size: 8px;
            border: 1px solid #ccc;
        }

        .badge-auto {
            background-color: #dbeafe;
            border-color: #bfdbfe;
            color: #1d4ed8;
        }

        .badge-manual {
            background-color: #fef3c7;
            border-color: #fcd34d;
            color: #92400e;
        }

        .note {
            font-size: 9px;
            background-color: #f9fafb;
            border: 1px solid #e5e7eb;
            padding: 8px 10px;
            margin-top: 8px;
        }
    </style>
</head>
<body>
    @php
        $sections = $statement['sections'] ?? [];
        $balanceCheck = $statement['balance_check'] ?? ['assets_total' => 0, 'liabilities_equity_total' => 0, 'difference' => 0];

        $formatCurrency = function ($value) {
            return 'Rp ' . number_format((float) $value, 0, ',', '.');
        };

        $isBalanced = isset($balanceCheck['difference']) ? abs($balanceCheck['difference']) < 0.01 : false;
        $hiddenAccountCodes = ['1200', '2100'];
    @endphp

    <div class="header">
        <div class="company-name">PT. ESHAKA WIJAYA LOGISTICS</div>
        <div class="report-title">STATEMENT OF FINANCIAL POSITION</div>
        <div class="period-info">{{ $cutoffDate->translatedFormat('d F Y') }} TRANSACTION PERIOD</div>
    </div>

    @foreach($sections as $sectionKey => $section)
        <div class="section">
            <div class="section-title">{{ $section['title'] }}</div>

            @foreach($section['groups'] as $group)
                <div class="group-title">{{ $group['title'] }}</div>

                <table>
                    <thead>
                        <tr>
                            <th>Akun</th>
                            <th class="amount" style="text-align: right;">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($group['rows'] as $row)
                            @if(in_array((string) $row['account_code'], $hiddenAccountCodes, true))
                                @continue
                            @endif
                            @php
                                $manual = isset($row['details']['manual_override']);
                                $sourceLabel = $manual ? 'Manual' : (strtolower($row['source'] ?? '') === 'auto' ? 'Auto' : 'N/A');
                                $badgeClass = $manual ? 'badge-manual' : 'badge-auto';
                            @endphp
                            <tr>
                                <td>
                                    <div>{{ $row['account_name'] }}</div>
                                    <div style="font-size: 8px; color: #666;">{{ $row['account_code'] }}</div>
                                </td>
                                <td class="amount">{{ $formatCurrency($row['amount']) }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                    <tfoot>
                        <tr class="total-row">
                            <td>Total {{ $group['title'] }}</td>
                            <td class="amount">{{ $formatCurrency($group['total']) }}</td>
                        </tr>
                    </tfoot>
                </table>
            @endforeach

            <table>
                <tr class="total-row">
                    <td>Total {{ $section['title'] }}</td>
                    <td class="amount">{{ $formatCurrency($section['total']) }}</td>
                </tr>
            </table>
        </div>
    @endforeach

    <div class="summary-box">
        <div class="summary-title">Ringkasan</div>

        <div class="summary-item">
            <span><strong>Total Assets</strong></span>
            <span>{{ $formatCurrency($balanceCheck['assets_total'] ?? 0) }}</span>
        </div>
        <div class="summary-item">
            <span>Total Liabilities</span>
            <span>{{ $formatCurrency($sections['liabilities']['total'] ?? 0) }}</span>
        </div>
        <div class="summary-item">
            <span>Total Equity</span>
            <span>{{ $formatCurrency($sections['equity']['total'] ?? 0) }}</span>
        </div>
        <div class="summary-item">
            <span><strong>Total Liabilities & Equity</strong></span>
            <span>{{ $formatCurrency($balanceCheck['liabilities_equity_total'] ?? 0) }}</span>
        </div>

        <div class="summary-item" style="margin-top: 10px;">
            <span>Differensi</span>
            @php
                $difference = $balanceCheck['difference'] ?? 0;
                $differenceClass = $difference == 0 ? 'difference-positive' : 'difference-negative';
            @endphp
            <span class="{{ $differenceClass }}">{{ $formatCurrency($difference) }}</span>
        </div>

        @if(!$isBalanced)
            <div class="note">
                Perbedaan saldo terdeteksi. Pastikan seluruh penyesuaian dan data dari modul terkait telah lengkap.
            </div>
        @endif
    </div>

    <div class="footer">
        <div><strong>&copy; {{ now()->year }} {{ strtoupper($companyName) }}</strong></div>
        <div>Laporan ini dihasilkan secara otomatis oleh sistem.</div>
        <div>Dicetak pada {{ $generatedAt->format('d/m/Y H:i') }}</div>
    </div>
</body>
</html>
