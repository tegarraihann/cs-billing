<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales Order - {{ $salesOrder->order_number }}</title>
    <style>
        @page {
            margin: 1cm 1cm;
            font-family: 'Times New Roman', serif;
        }

        body {
            font-family: 'Times New Roman', serif;
            font-size: 9px;
            line-height: 1.2;
            color: #000;
            margin: 0;
            padding: 0;
        }

        .header {
            margin-bottom: 15px;
            border-bottom: 2px solid #000;
            padding-bottom: 8px;
        }

        .company-info {
            float: left;
            width: 60%;
        }

        .company-name {
            font-size: 14px;
            font-weight: bold;
            color: #000;
            margin-bottom: 3px;
        }

        .company-address {
            font-size: 8px;
            color: #333;
            line-height: 1.2;
        }

        .document-info {
            float: right;
            width: 35%;
            text-align: right;
        }

        .document-title {
            font-size: 12px;
            font-weight: bold;
            color: #000;
            margin-bottom: 3px;
        }

        .document-number {
            font-size: 10px;
            font-weight: bold;
            color: #000;
            margin-bottom: 2px;
        }

        .document-date {
            font-size: 8px;
            color: #333;
        }

        .clearfix::after {
            content: "";
            display: table;
            clear: both;
        }

        .main-content {
            margin-top: 15px;
        }

        .section {
            margin-bottom: 10px;
        }

        .section-title {
            font-size: 9px;
            font-weight: bold;
            color: #000;
            margin-bottom: 5px;
            padding: 2px 5px;
            background-color: #f5f5f5;
            border: 1px solid #ccc;
        }

        .info-grid {
            display: table;
            width: 100%;
            margin-bottom: 8px;
        }

        .info-row {
            display: table-row;
        }

        .info-col {
            display: table-cell;
            padding: 1px 3px;
            vertical-align: top;
            width: 50%;
        }

        .info-label {
            font-weight: bold;
            width: 30%;
            display: inline-block;
        }

        .info-value {
            width: 65%;
            display: inline-block;
            white-space: pre-wrap;
        }

        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 10px;
            font-size: 8px;
        }

        .table th,
        .table td {
            border: 1px solid #ccc;
            padding: 3px 2px;
            text-align: left;
            vertical-align: top;
        }

        .table th {
            background-color: #f5f5f5;
            font-weight: bold;
            text-align: center;
            font-size: 8px;
        }

        .table td.center {
            text-align: center;
        }

        .table td.right {
            text-align: right;
        }

        .financial-summary {
            margin-top: 10px;
            border: 1px solid #000;
            padding: 5px;
        }

        .summary-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 2px;
            font-size: 8px;
        }

        .summary-label {
            font-weight: bold;
        }

        .summary-value {
            font-weight: bold;
            text-align: right;
        }

        .total-row {
            border-top: 1px solid #000;
            margin-top: 3px;
            padding-top: 3px;
            font-size: 9px;
            font-weight: bold;
        }

        .footer {
            margin-top: 15px;
            font-size: 7px;
        }

        .signature-section {
            margin-top: 20px;
            display: table;
            width: 100%;
        }

        .signature-col {
            display: table-cell;
            width: 33.33%;
            text-align: center;
            vertical-align: top;
            padding: 0 10px;
        }

        .signature-title {
            font-size: 8px;
            font-weight: bold;
            margin-bottom: 30px;
        }

        .signature-name {
            font-size: 8px;
            border-top: 1px solid #000;
            padding-top: 2px;
        }

        .status-badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 7px;
            font-weight: bold;
            text-transform: uppercase;
        }

        .status-draft {
            background-color: #f0f0f0;
            color: #666;
            border: 1px solid #ccc;
        }

        .status-released {
            background-color: #e3f2fd;
            color: #1976d2;
            border: 1px solid #1976d2;
        }

        .status-confirmed {
            background-color: #e8f5e8;
            color: #2e7d32;
            border: 1px solid #2e7d32;
        }

        .status-approved {
            background-color: #f3e5f5;
            color: #7b1fa2;
            border: 1px solid #7b1fa2;
        }

        .status-rejected {
            background-color: #ffebee;
            color: #d32f2f;
            border: 1px solid #d32f2f;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header clearfix">
        <div class="company-info">
            <div class="company-name">PT. NAMA PERUSAHAAN</div>
            <div class="company-address">
                Alamat Perusahaan<br>
                Kota, Kode Pos<br>
                Telp: (021) 1234-5678 | Email: info@company.com
            </div>
        </div>
        <div class="document-info">
            <div class="document-title">SALES ORDER</div>
            <div class="document-number">{{ $salesOrder->order_number }}</div>
            <div class="document-date">
                Tanggal: {{ $salesOrder->so_date ? \Carbon\Carbon::parse($salesOrder->so_date)->format('d/m/Y') : \Carbon\Carbon::parse($salesOrder->created_at)->format('d/m/Y') }}
            </div>
            <div class="status-badge status-{{ $salesOrder->status ?? 'draft' }}">
                {{ strtoupper($salesOrder->status ?? 'DRAFT') }}
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
        <!-- Basic Information -->
        <div class="section">
            <div class="section-title">INFORMASI DASAR</div>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-col">
                        <span class="info-label">ORDER NUMB:</span>
                        <span class="info-value">{{ $salesOrder->order_number }}</span>
                    </div>
                    <div class="info-col">
                        <span class="info-label">REF NO:</span>
                        <span class="info-value">{{ $salesOrder->ref_no ?: '-' }}</span>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-col">
                        <span class="info-label">CUSTOMER:</span>
                        <span class="info-value">{{ $salesOrder->customer }}</span>
                    </div>
                    <div class="info-col">
                        <span class="info-label">SHIPPER:</span>
                        <span class="info-value">{{ $salesOrder->shipper ?: '-' }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Shipping Information -->
        <div class="section">
            <div class="section-title">INFORMASI PENGIRIMAN</div>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-col">
                        <span class="info-label">BL/AWB:</span>
                        <span class="info-value">{{ $salesOrder->bl_awb ?: '-' }}</span>
                    </div>
                    <div class="info-col">
                        <span class="info-label">LINER:</span>
                        <span class="info-value">{{ $salesOrder->liner ?: '-' }}</span>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-col">
                        <span class="info-label">VESSEL:</span>
                        <span class="info-value">{{ $salesOrder->vessel ?: '-' }}</span>
                    </div>
                    <div class="info-col">
                        <span class="info-label">POL/POD:</span>
                        <span class="info-value">{{ collect([$salesOrder->pol, $salesOrder->pod])->filter()->join(' / ') ?: '-' }}</span>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-col">
                        <span class="info-label">ETA:</span>
                        <span class="info-value">{{ $salesOrder->eta ? \Carbon\Carbon::parse($salesOrder->eta)->format('d/m/Y') : '-' }}</span>
                    </div>
                    <div class="info-col">
                        <span class="info-label">ETD:</span>
                        <span class="info-value">{{ $salesOrder->etd ? \Carbon\Carbon::parse($salesOrder->etd)->format('d/m/Y') : '-' }}</span>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-col">
                        <span class="info-label">SHIPMENT TYPE:</span>
                        <span class="info-value">{{ $salesOrder->shipment_type ?: '-' }}</span>
                    </div>
                    <div class="info-col">
                        <span class="info-label">EXCHANGE RATE:</span>
                        <span class="info-value">{{ $salesOrder->exchange_rate ? number_format($salesOrder->exchange_rate, 4) : '-' }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Financial Breakdown -->
        @if(!empty($salesOrder->vendor_breakdown) && is_array($salesOrder->vendor_breakdown))
        <div class="section">
            <div class="section-title">RINCIAN KEUANGAN</div>
            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 20%;">JENIS BIAYA</th>
                        <th style="width: 20%;">VENDOR</th>
                        <th style="width: 15%;">BUYING</th>
                        <th style="width: 15%;">SELLING</th>
                        <th style="width: 15%;">PROFIT</th>
                        <th style="width: 15%;">REMARKS</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($salesOrder->vendor_breakdown as $item)
                    <tr>
                        <td>{{ $item['description'] ?? 'Service Type' }}</td>
                        <td>{{ $item['nama_vendor'] ?? '-' }}</td>
                        <td class="right">{{ 'Rp ' . number_format($item['buying_amount'] ?? 0, 0, ',', '.') }}</td>
                        <td class="right">{{ 'Rp ' . number_format($item['selling_amount'] ?? 0, 0, ',', '.') }}</td>
                        <td class="right" style="{{ (($item['selling_amount'] ?? 0) - ($item['buying_amount'] ?? 0)) >= 0 ? 'color: green;' : 'color: red;' }}">
                            {{ 'Rp ' . number_format(($item['selling_amount'] ?? 0) - ($item['buying_amount'] ?? 0), 0, ',', '.') }}
                        </td>
                        <td>{{ $item['remarks'] ?? '-' }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
        @endif

        <!-- Financial Summary -->
        <div class="financial-summary">
            <div class="summary-row">
                <span class="summary-label">Total Buying:</span>
                <span class="summary-value">Rp {{ number_format($salesOrder->total_buying ?? 0, 0, ',', '.') }}</span>
            </div>
            <div class="summary-row">
                <span class="summary-label">Total Selling:</span>
                <span class="summary-value">Rp {{ number_format($salesOrder->total_selling ?? 0, 0, ',', '.') }}</span>
            </div>
            <div class="summary-row total-row" style="{{ (($salesOrder->total_selling ?? 0) - ($salesOrder->total_buying ?? 0)) >= 0 ? 'color: green;' : 'color: red;' }}">
                <span class="summary-label">Total Profit:</span>
                <span class="summary-value">Rp {{ number_format(($salesOrder->total_selling ?? 0) - ($salesOrder->total_buying ?? 0), 0, ',', '.') }}</span>
            </div>
        </div>

        <!-- Commodity Information -->
        @if($salesOrder->commodity || $salesOrder->qty || $salesOrder->net_weight || $salesOrder->measurement)
        <div class="section">
            <div class="section-title">INFORMASI BARANG</div>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-col">
                        <span class="info-label">COMMODITY:</span>
                        <span class="info-value">{{ $salesOrder->commodity ?: '-' }}</span>
                    </div>
                    <div class="info-col">
                        <span class="info-label">QTY:</span>
                        <span class="info-value">{{ $salesOrder->qty ?: '-' }}</span>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-col">
                        <span class="info-label">NET WEIGHT:</span>
                        <span class="info-value">{{ $salesOrder->net_weight ? $salesOrder->net_weight . ' KG' : '-' }}</span>
                    </div>
                    <div class="info-col">
                        <span class="info-label">MEASUREMENT:</span>
                        <span class="info-value">{{ $salesOrder->measurement ? $salesOrder->measurement . ' M³' : '-' }}</span>
                    </div>
                </div>
            </div>
        </div>
        @endif

        <!-- Remarks -->
        @if($salesOrder->remarks || $salesOrder->note)
        <div class="section">
            <div class="section-title">CATATAN</div>
            @if($salesOrder->remarks)
            <div style="margin-bottom: 5px;">
                <span class="info-label">REMARKS:</span>
                <span class="info-value">{{ $salesOrder->remarks }}</span>
            </div>
            @endif
            @if($salesOrder->note)
            <div>
                <span class="info-label">NOTE:</span>
                <span class="info-value">{{ $salesOrder->note }}</span>
            </div>
            @endif
        </div>
        @endif

        <!-- Signatures -->
        <div class="signature-section">
            <div class="signature-col">
                <div class="signature-title">PREPARED BY</div>
                <div class="signature-name">{{ $salesOrder->creator->name ?? 'System' }}</div>
            </div>
            <div class="signature-col">
                <div class="signature-title">CHECKED BY</div>
                <div class="signature-name">Admin CS</div>
            </div>
            <div class="signature-col">
                <div class="signature-title">APPROVED BY</div>
                <div class="signature-name">Admin Keuangan</div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <div class="footer">
        <div>Dicetak pada: {{ $generatedAt->format('d/m/Y H:i:s') }}</div>
        <div>Dokumen ini digenerate secara otomatis oleh sistem.</div>
    </div>
</body>
</html>