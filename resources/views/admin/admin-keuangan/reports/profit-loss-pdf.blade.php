<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Laba Rugi - {{ $period->period_name }}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            margin: 0;
            padding: 20px;
            color: #333;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 15px;
        }

        .header h1 {
            font-size: 20px;
            margin: 0;
            color: #2c3e50;
            font-weight: bold;
        }

        .header .company-name {
            font-size: 14px;
            color: #666;
            margin-top: 5px;
        }

        .header .period {
            font-size: 12px;
            color: #666;
            margin-top: 10px;
        }

        .section {
            margin-bottom: 25px;
            background-color: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 5px;
            overflow: hidden;
        }

        .section-header {
            background-color: #343a40;
            color: white;
            padding: 12px 15px;
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .section-content {
            padding: 15px;
        }

        .subsection {
            margin-bottom: 15px;
        }

        .subsection-title {
            font-size: 12px;
            font-weight: bold;
            color: #495057;
            margin-bottom: 8px;
            text-transform: uppercase;
            border-bottom: 1px solid #dee2e6;
            padding-bottom: 4px;
        }

        .entry-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 6px 0;
            border-bottom: 1px dotted #dee2e6;
        }

        .entry-item:last-child {
            border-bottom: none;
        }

        .entry-description {
            flex-grow: 1;
        }

        .entry-account {
            font-weight: 500;
            color: #495057;
        }

        .entry-detail {
            font-size: 9px;
            color: #6c757d;
            margin-top: 2px;
        }

        .entry-amount {
            font-weight: 500;
            text-align: right;
            min-width: 100px;
        }

        .total-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 15px;
            background-color: #e9ecef;
            border-top: 2px solid #dee2e6;
            font-weight: bold;
            font-size: 13px;
        }

        .grand-total {
            background-color: #28a745;
            color: white;
            font-size: 14px;
        }

        .loss {
            background-color: #dc3545;
            color: white;
        }

        .summary-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
        }

        .summary-table th,
        .summary-table td {
            padding: 10px;
            text-align: left;
            border: 1px solid #dee2e6;
        }

        .summary-table th {
            background-color: #f8f9fa;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 10px;
        }

        .summary-table .amount {
            text-align: right;
            font-weight: 500;
        }

        .profit { color: #28a745; }
        .loss-text { color: #dc3545; }
        .neutral { color: #6c757d; }

        .footer {
            margin-top: 40px;
            text-align: center;
            font-size: 9px;
            color: #6c757d;
            border-top: 1px solid #dee2e6;
            padding-top: 15px;
        }

        .status-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
            text-transform: uppercase;
            margin-left: 10px;
        }

        .status-open {
            background-color: #fff3cd;
            color: #856404;
        }

        .status-closed {
            background-color: #d4edda;
            color: #155724;
        }

        .no-data {
            text-align: center;
            color: #6c757d;
            font-style: italic;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>LAPORAN LABA RUGI</h1>
        <div class="company-name">Eshaka Wijaya Logistics</div>
        <div class="period">
            <strong>{{ $period->period_name }}</strong>
            <span class="status-badge {{ $period->status === 'closed' ? 'status-closed' : 'status-open' }}">
                {{ $period->status === 'closed' ? 'Finalisasi' : 'Draft' }}
            </span>
        </div>
        <div class="period">
            Periode: {{ \Carbon\Carbon::parse($period->start_date)->format('d M Y') }} - {{ \Carbon\Carbon::parse($period->end_date)->format('d M Y') }}
        </div>
        <div class="period">
            Dicetak pada: {{ $generatedAt->format('d M Y H:i') }}
        </div>
    </div>

    <!-- PENDAPATAN -->
    <div class="section">
        <div class="section-header">PENDAPATAN</div>
        <div class="section-content">
            @if($reportData['revenues']['main'] && count($reportData['revenues']['main']) > 0)
                <div class="subsection">
                    <div class="subsection-title">Pendapatan Utama</div>
                    @foreach($reportData['revenues']['main'] as $entry)
                    <div class="entry-item">
                        <div class="entry-description">
                            <div class="entry-account">{{ $entry['account']['account_name'] ?? 'N/A' }}</div>
                            <div class="entry-detail">{{ $entry['description'] }}</div>
                        </div>
                        <div class="entry-amount">Rp {{ number_format($entry['amount'], 0, ',', '.') }}</div>
                    </div>
                    @endforeach
                </div>
            @endif

            @if($reportData['revenues']['other'] && count($reportData['revenues']['other']) > 0)
                <div class="subsection">
                    <div class="subsection-title">Pendapatan Lainnya</div>
                    @foreach($reportData['revenues']['other'] as $entry)
                    <div class="entry-item">
                        <div class="entry-description">
                            <div class="entry-account">{{ $entry['account']['account_name'] ?? 'N/A' }}</div>
                            <div class="entry-detail">{{ $entry['description'] }}</div>
                        </div>
                        <div class="entry-amount">Rp {{ number_format($entry['amount'], 0, ',', '.') }}</div>
                    </div>
                    @endforeach
                </div>
            @endif

            @if((!$reportData['revenues']['main'] || count($reportData['revenues']['main']) === 0) &&
                (!$reportData['revenues']['other'] || count($reportData['revenues']['other']) === 0))
                <div class="no-data">Tidak ada data pendapatan</div>
            @endif
        </div>
        <div class="total-row">
            <span>TOTAL PENDAPATAN</span>
            <span>Rp {{ number_format($reportData['revenues']['total'] ?? 0, 0, ',', '.') }}</span>
        </div>
    </div>

    <!-- BEBAN -->
    <div class="section">
        <div class="section-header">BEBAN</div>
        <div class="section-content">
            @if($reportData['expenses']['operational'] && count($reportData['expenses']['operational']) > 0)
                <div class="subsection">
                    <div class="subsection-title">Beban Operasional</div>
                    @foreach($reportData['expenses']['operational'] as $entry)
                    <div class="entry-item">
                        <div class="entry-description">
                            <div class="entry-account">{{ $entry['account']['account_name'] ?? 'N/A' }}</div>
                            <div class="entry-detail">{{ $entry['description'] }}</div>
                        </div>
                        <div class="entry-amount">Rp {{ number_format($entry['amount'], 0, ',', '.') }}</div>
                    </div>
                    @endforeach
                </div>
            @endif

            @if(isset($reportData['expenses']['administrative']) && $reportData['expenses']['administrative'] && count($reportData['expenses']['administrative']) > 0)
                <div class="subsection">
                    <div class="subsection-title">Beban Administrasi</div>
                    @foreach($reportData['expenses']['administrative'] as $entry)
                    <div class="entry-item">
                        <div class="entry-description">
                            <div class="entry-account">{{ $entry['account']['account_name'] ?? 'N/A' }}</div>
                            <div class="entry-detail">{{ $entry['description'] }}</div>
                        </div>
                        <div class="entry-amount">Rp {{ number_format($entry['amount'], 0, ',', '.') }}</div>
                    </div>
                    @endforeach
                </div>
            @endif

            @if($reportData['expenses']['other'] && count($reportData['expenses']['other']) > 0)
                <div class="subsection">
                    <div class="subsection-title">Beban Lainnya</div>
                    @foreach($reportData['expenses']['other'] as $entry)
                    <div class="entry-item">
                        <div class="entry-description">
                            <div class="entry-account">{{ $entry['account']['account_name'] ?? 'N/A' }}</div>
                            <div class="entry-detail">{{ $entry['description'] }}</div>
                        </div>
                        <div class="entry-amount">Rp {{ number_format($entry['amount'], 0, ',', '.') }}</div>
                    </div>
                    @endforeach
                </div>
            @endif

            @if((!isset($reportData['expenses']['operational']) || !$reportData['expenses']['operational'] || count($reportData['expenses']['operational']) === 0) &&
                (!isset($reportData['expenses']['administrative']) || !$reportData['expenses']['administrative'] || count($reportData['expenses']['administrative']) === 0) &&
                (!isset($reportData['expenses']['other']) || !$reportData['expenses']['other'] || count($reportData['expenses']['other']) === 0))
                <div class="no-data">Tidak ada data beban</div>
            @endif
        </div>
        <div class="total-row">
            <span>TOTAL BEBAN</span>
            <span>Rp {{ number_format($reportData['expenses']['total'] ?? 0, 0, ',', '.') }}</span>
        </div>
    </div>

    <!-- RINGKASAN -->
    @php
        $totalRevenue = $reportData['revenues']['total'] ?? 0;
        $totalExpense = $reportData['expenses']['total'] ?? 0;
        $netProfit = $totalRevenue - $totalExpense;
        $isProfit = $netProfit >= 0;
    @endphp

    <table class="summary-table">
        <thead>
            <tr>
                <th style="width: 60%;">RINGKASAN LABA RUGI</th>
                <th style="width: 40%;" class="amount">JUMLAH</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Total Pendapatan</td>
                <td class="amount profit">Rp {{ number_format($totalRevenue, 0, ',', '.') }}</td>
            </tr>
            <tr>
                <td>Total Beban</td>
                <td class="amount loss-text">Rp {{ number_format($totalExpense, 0, ',', '.') }}</td>
            </tr>
            <tr style="background-color: {{ $isProfit ? '#d4edda' : '#f8d7da' }};">
                <td><strong>{{ $isProfit ? 'LABA BERSIH' : 'RUGI BERSIH' }}</strong></td>
                <td class="amount {{ $isProfit ? 'profit' : 'loss-text' }}">
                    <strong>Rp {{ number_format(abs($netProfit), 0, ',', '.') }}</strong>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="footer">
        <div><strong>© {{ date('Y') }} Eshaka Wijaya Logistics - Laporan Laba Rugi</strong></div>
        <div>Laporan ini bersifat rahasia dan dibuat secara otomatis oleh sistem</div>
        @if($period->status === 'closed')
            <div style="margin-top: 5px; color: #28a745; font-weight: bold;">
                ✓ Laporan ini telah difinalisasi pada {{ $period->approved_at ? \Carbon\Carbon::parse($period->approved_at)->format('d M Y H:i') : '-' }}
            </div>
        @endif
    </div>
</body>
</html>