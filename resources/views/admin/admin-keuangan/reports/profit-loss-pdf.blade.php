<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Laba Rugi - {{ $period->period_name }}</title>
    <style>
        body {
            font-size: 10px;
            line-height: 1.4;
            margin: 20px;
            color: #000;
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
        }

        .company-name {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .report-title {
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0;
        }

        .period-info {
            font-size: 10px;
            margin: 5px 0;
        }

        .section {
            margin: 20px 0;
        }

        .section-title {
            font-size: 12px;
            font-weight: bold;
            background-color: #f0f0f0;
            padding: 8px;
            border: 1px solid #ccc;
            margin-bottom: 10px;
        }

        .item {
            padding: 3px 10px;
            border-bottom: 1px dotted #ccc;
        }

        .item-name {
            width: 70%;
            display: inline-block;
        }

        .item-amount {
            width: 25%;
            display: inline-block;
            text-align: right;
        }

        .total-row {
            font-weight: bold;
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
        <div class="report-title">LAPORAN LABA RUGI</div>
        <div class="period-info">
            <strong>{{ $period->period_name }}</strong>
            <span class="status-badge {{ $period->status === 'closed' ? 'status-closed' : 'status-draft' }}">
                {{ strtoupper($period->status === 'closed' ? 'FINALISASI' : 'DRAFT') }}
            </span>
        </div>
        <div class="period-info">
            Periode: {{ \Carbon\Carbon::parse($period->start_date)->format('d M Y') }} - {{ \Carbon\Carbon::parse($period->end_date)->format('d M Y') }}
        </div>
        <div class="period-info">
            Tanggal Cetak: {{ $generatedAt->format('d M Y H:i') }}
        </div>
    </div>

    <!-- PENDAPATAN -->
    <div class="section">
        <div class="section-title">PENDAPATAN</div>

        @if($reportData['revenues']['main'] && count($reportData['revenues']['main']) > 0)
            <div style="font-weight: bold; padding: 5px 10px; background-color: #f8f9fa;">Pendapatan Utama</div>
            @foreach($reportData['revenues']['main'] as $entry)
            <div class="item">
                <span class="item-name">{{ $entry['account']['account_name'] ?? 'N/A' }}</span>
                <span class="item-amount">Rp {{ number_format($entry['amount'], 0, ',', '.') }}</span>
            </div>
            @endforeach
        @endif

        @if($reportData['revenues']['other'] && count($reportData['revenues']['other']) > 0)
            <div style="font-weight: bold; padding: 5px 10px; background-color: #f8f9fa; margin-top: 10px;">Pendapatan Lainnya</div>
            @foreach($reportData['revenues']['other'] as $entry)
            <div class="item">
                <span class="item-name">{{ $entry['account']['account_name'] ?? 'N/A' }}</span>
                <span class="item-amount">Rp {{ number_format($entry['amount'], 0, ',', '.') }}</span>
            </div>
            @endforeach
        @endif

        @if((!$reportData['revenues']['main'] || count($reportData['revenues']['main']) === 0) &&
            (!$reportData['revenues']['other'] || count($reportData['revenues']['other']) === 0))
            <div class="item" style="text-align: center; font-style: italic; color: #666;">
                Tidak ada data pendapatan
            </div>
        @endif

        <div class="total-row">
            <span class="item-name">TOTAL PENDAPATAN</span>
            <span class="item-amount">Rp {{ number_format($reportData['revenues']['total'] ?? 0, 0, ',', '.') }}</span>
        </div>
    </div>

    <!-- BEBAN -->
    <div class="section">
        <div class="section-title">BEBAN</div>

        @if($reportData['expenses']['operational'] && count($reportData['expenses']['operational']) > 0)
            <div style="font-weight: bold; padding: 5px 10px; background-color: #f8f9fa;">Beban Operasional</div>
            @foreach($reportData['expenses']['operational'] as $entry)
            <div class="item">
                <span class="item-name">{{ $entry['account']['account_name'] ?? 'N/A' }}</span>
                <span class="item-amount">Rp {{ number_format($entry['amount'], 0, ',', '.') }}</span>
            </div>
            @endforeach
        @endif

        @if(isset($reportData['expenses']['administrative']) && $reportData['expenses']['administrative'] && count($reportData['expenses']['administrative']) > 0)
            <div style="font-weight: bold; padding: 5px 10px; background-color: #f8f9fa; margin-top: 10px;">Beban Administrasi</div>
            @foreach($reportData['expenses']['administrative'] as $entry)
            <div class="item">
                <span class="item-name">{{ $entry['account']['account_name'] ?? 'N/A' }}</span>
                <span class="item-amount">Rp {{ number_format($entry['amount'], 0, ',', '.') }}</span>
            </div>
            @endforeach
        @endif

        @if($reportData['expenses']['other'] && count($reportData['expenses']['other']) > 0)
            <div style="font-weight: bold; padding: 5px 10px; background-color: #f8f9fa; margin-top: 10px;">Beban Lainnya</div>
            @foreach($reportData['expenses']['other'] as $entry)
            <div class="item">
                <span class="item-name">{{ $entry['account']['account_name'] ?? 'N/A' }}</span>
                <span class="item-amount">Rp {{ number_format($entry['amount'], 0, ',', '.') }}</span>
            </div>
            @endforeach
        @endif

        @if((!isset($reportData['expenses']['operational']) || !$reportData['expenses']['operational'] || count($reportData['expenses']['operational']) === 0) &&
            (!isset($reportData['expenses']['administrative']) || !$reportData['expenses']['administrative'] || count($reportData['expenses']['administrative']) === 0) &&
            (!isset($reportData['expenses']['other']) || !$reportData['expenses']['other'] || count($reportData['expenses']['other']) === 0))
            <div class="item" style="text-align: center; font-style: italic; color: #666;">
                Tidak ada data beban
            </div>
        @endif

        <div class="total-row">
            <span class="item-name">TOTAL BEBAN</span>
            <span class="item-amount">Rp {{ number_format($reportData['expenses']['total'] ?? 0, 0, ',', '.') }}</span>
        </div>
    </div>

    <!-- RINGKASAN -->
    @php
        $totalRevenue = $reportData['revenues']['total'] ?? 0;
        $totalExpense = $reportData['expenses']['total'] ?? 0;
        $netProfit = $totalRevenue - $totalExpense;
        $isProfit = $netProfit >= 0;
    @endphp

    <div class="summary">
        <div class="summary-title">RINGKASAN LABA RUGI</div>

        <div class="summary-item">
            <span class="item-name">Total Pendapatan</span>
            <span class="item-amount" style="color: #155724;">Rp {{ number_format($totalRevenue, 0, ',', '.') }}</span>
        </div>

        <div class="summary-item">
            <span class="item-name">Total Beban</span>
            <span class="item-amount" style="color: #721c24;">Rp {{ number_format($totalExpense, 0, ',', '.') }}</span>
        </div>

        <div class="net-profit {{ $isProfit ? 'profit' : 'loss' }}">
            <span class="item-name">{{ $isProfit ? 'LABA BERSIH' : 'RUGI BERSIH' }}</span>
            <span class="item-amount">Rp {{ number_format(abs($netProfit), 0, ',', '.') }}</span>
        </div>
    </div>

    <!-- INFORMASI KEUANGAN TERKINI -->
    <div class="section" style="margin-top: 30px;">
        <div class="section-title">INFORMASI KEUANGAN TERKINI</div>

        <div class="item">
            <span class="item-name">Saldo Bank/Kas</span>
            <span class="item-amount">Rp {{ number_format($financialInfo['bank_balance'] ?? 0, 0, ',', '.') }}</span>
        </div>

        <div class="item">
            <span class="item-name">Total Piutang</span>
            <span class="item-amount">Rp {{ number_format($financialInfo['total_receivables'] ?? 0, 0, ',', '.') }}</span>
        </div>

        <div class="item">
            <span class="item-name">Total Hutang</span>
            <span class="item-amount">Rp {{ number_format($financialInfo['total_payables'] ?? 0, 0, ',', '.') }}</span>
        </div>
    </div>

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