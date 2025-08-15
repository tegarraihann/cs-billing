<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sales Order - {{ $salesOrder->order_number }}</title>
    <style>
        @page {
            margin: 2cm 1.5cm;
            font-family: 'Times New Roman', serif;
        }
        
        body {
            font-family: 'Times New Roman', serif;
            font-size: 11px;
            line-height: 1.5;
            color: #000;
            margin: 0;
            padding: 0;
        }
        
        .header {
            margin-bottom: 40px;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
        }
        
        .company-info {
            float: left;
            width: 60%;
        }
        
        .company-name {
            font-size: 18px;
            font-weight: bold;
            color: #000;
            margin-bottom: 5px;
        }
        
        .company-address {
            font-size: 10px;
            color: #333;
            line-height: 1.3;
        }
        
        .document-info {
            float: right;
            width: 35%;
            text-align: right;
        }
        
        .document-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .document-details {
            font-size: 10px;
            line-height: 1.4;
        }
        
        .clear {
            clear: both;
        }
        
        .content {
            margin-top: 30px;
        }
        
        .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 12px;
            font-weight: bold;
            color: #000;
            border-bottom: 1px solid #000;
            padding-bottom: 3px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        
        .info-table td {
            padding: 4px 8px;
            vertical-align: top;
            border-bottom: 1px solid #eee;
        }
        
        .info-label {
            font-weight: bold;
            width: 25%;
            color: #333;
        }
        
        .info-value {
            width: 25%;
            word-wrap: break-word;
        }
        
        .pricing-section {
            border: 1px solid #ddd;
            padding: 15px;
            margin-top: 20px;
            background-color: #fafafa;
        }
        
        .pricing-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .pricing-table td {
            padding: 8px;
            border-bottom: 1px dotted #ccc;
        }
        
        .pricing-label {
            font-weight: bold;
            text-align: left;
        }
        
        .pricing-value {
            text-align: right;
            font-family: monospace;
            font-size: 11px;
        }
        
        .total-row {
            border-top: 2px solid #000;
            font-weight: bold;
            font-size: 12px;
        }
        
        .footer {
            position: fixed;
            bottom: 1cm;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 9px;
            color: #666;
            border-top: 1px solid #ccc;
            padding-top: 8px;
            background: white;
        }
        
        .status-info {
            float: right;
            margin-top: 10px;
        }
        
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border: 1px solid #333;
            font-size: 10px;
            font-weight: bold;
            text-transform: uppercase;
            background-color: white;
        }
        
        .print-info {
            text-align: right;
            font-size: 9px;
            color: #666;
            margin-bottom: 20px;
            font-style: italic;
        }
        
        .signature-section {
            margin-top: 50px;
            page-break-inside: avoid;
        }
        
        .signature-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .signature-cell {
            width: 33.33%;
            text-align: center;
            vertical-align: top;
            padding: 20px 10px;
        }
        
        .signature-line {
            border-bottom: 1px solid #000;
            margin-bottom: 5px;
            height: 50px;
        }
        
        .signature-label {
            font-size: 10px;
            font-weight: bold;
        }
        
        .remarks-section {
            margin-top: 20px;
            border: 1px solid #ddd;
            padding: 10px;
        }
        
        .remarks-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .remarks-content {
            font-size: 10px;
            line-height: 1.4;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="company-info">
            <div class="company-name">PT. OFFICE MANAGEMENT SYSTEM</div>
            <div class="company-address">
                Jl. Contoh Alamat No. 123<br>
                Jakarta Selatan 12345<br>
                Telp: (021) 123-4567 | Email: info@officems.com
            </div>
        </div>
        <div class="document-info">
            <div class="document-title">Sales Order</div>
            <div class="document-details">
                <strong>No: {{ $salesOrder->order_number }}</strong><br>
                Tanggal: {{ $salesOrder->created_at ? $salesOrder->created_at->locale('id')->isoFormat('DD MMMM YYYY') : date('d F Y') }}
                <div class="status-info">
                    <span class="status-badge">{{ strtoupper($salesOrder->status ?: 'draft') }}</span>
                </div>
            </div>
        </div>
        <div class="clear"></div>
    </div>

    <!-- Print Info -->
    <div class="print-info">
        Dicetak pada: {{ \Carbon\Carbon::now()->locale('id')->isoFormat('DD MMMM YYYY HH:mm') }}
    </div>

    <!-- Content -->
    <div class="content">
        
        <!-- Customer & Basic Information -->
        <div class="section">
            <div class="section-title">Informasi Pelanggan & Order</div>
            <table class="info-table">
                <tr>
                    <td class="info-label">Customer</td>
                    <td class="info-value">{{ $salesOrder->customer }}</td>
                    <td class="info-label">Prepared By</td>
                    <td class="info-value">{{ $salesOrder->prepared_by ?: '-' }}</td>
                </tr>
                <tr>
                    <td class="info-label">Shipper</td>
                    <td class="info-value">{{ $salesOrder->shipper ?: '-' }}</td>
                    <td class="info-label">Dibuat Oleh</td>
                    <td class="info-value">{{ $salesOrder->creator->name ?? '-' }}</td>
                </tr>
                <tr>
                    <td class="info-label">BL/AWB</td>
                    <td class="info-value">{{ $salesOrder->bl_awb ?: '-' }}</td>
                    <td class="info-label">Shipment Type</td>
                    <td class="info-value">{{ $salesOrder->shipment_type ?: '-' }}</td>
                </tr>
            </table>
        </div>

        <!-- Shipping Details -->
        <div class="section">
            <div class="section-title">Detail Pengiriman</div>
            <table class="info-table">
                <tr>
                    <td class="info-label">Liner</td>
                    <td class="info-value">{{ $salesOrder->liner ?: '-' }}</td>
                    <td class="info-label">Vessel</td>
                    <td class="info-value">{{ $salesOrder->vessel ?: '-' }}</td>
                </tr>
                <tr>
                    <td class="info-label">POL (Port of Loading)</td>
                    <td class="info-value">{{ $salesOrder->pol ?: '-' }}</td>
                    <td class="info-label">POD (Port of Discharge)</td>
                    <td class="info-value">{{ $salesOrder->pod ?: '-' }}</td>
                </tr>
                <tr>
                    <td class="info-label">ETA</td>
                    <td class="info-value">{{ $salesOrder->eta ? \Carbon\Carbon::parse($salesOrder->eta)->locale('id')->isoFormat('DD MMMM YYYY') : '-' }}</td>
                    <td class="info-label">SPPB Date</td>
                    <td class="info-value">{{ $salesOrder->sppb_date ? \Carbon\Carbon::parse($salesOrder->sppb_date)->locale('id')->isoFormat('DD MMMM YYYY') : '-' }}</td>
                </tr>
                <tr>
                    <td class="info-label">AJU</td>
                    <td class="info-value">{{ $salesOrder->aju ?: '-' }}</td>
                    <td class="info-label">Gudang/UTC</td>
                    <td class="info-value">{{ $salesOrder->gudang_utc ?: '-' }}</td>
                </tr>
                <tr>
                    <td class="info-label">Party/LCL</td>
                    <td class="info-value">{{ $salesOrder->party_lcl ?: '-' }}</td>
                    <td class="info-label">Container No</td>
                    <td class="info-value">{{ $salesOrder->container_no ?: '-' }}</td>
                </tr>
            </table>
        </div>

        <!-- Goods Information -->
        <div class="section">
            <div class="section-title">Informasi Barang</div>
            <table class="info-table">
                <tr>
                    <td class="info-label">Goods Description</td>
                    <td class="info-value" colspan="3">{{ $salesOrder->goods ?: '-' }}</td>
                </tr>
            </table>
        </div>

        <!-- Financial Information -->
        <div class="section">
            <div class="section-title">Informasi Keuangan</div>
            <table class="info-table">
                <tr>
                    <td class="info-label">Exchange Rate</td>
                    <td class="info-value">{{ $salesOrder->exchange_rate ? number_format($salesOrder->exchange_rate, 2, ',', '.') : '-' }}</td>
                    <td class="info-label">Jenis Biaya</td>
                    <td class="info-value">{{ $salesOrder->jenis_biaya ?: '-' }}</td>
                </tr>
            </table>
            
            @if($salesOrder->buying || $salesOrder->selling || $salesOrder->revenue)
            <div class="pricing-section">
                <table class="pricing-table">
                    @if($salesOrder->buying)
                    <tr>
                        <td class="pricing-label">Buying Price</td>
                        <td class="pricing-value">{{ 'Rp ' . number_format($salesOrder->buying, 0, ',', '.') }}</td>
                    </tr>
                    @endif
                    @if($salesOrder->selling)
                    <tr>
                        <td class="pricing-label">Selling Price</td>
                        <td class="pricing-value">{{ 'Rp ' . number_format($salesOrder->selling, 0, ',', '.') }}</td>
                    </tr>
                    @endif
                    @if($salesOrder->revenue)
                    <tr class="total-row">
                        <td class="pricing-label">Revenue</td>
                        <td class="pricing-value">{{ 'Rp ' . number_format($salesOrder->revenue, 0, ',', '.') }}</td>
                    </tr>
                    @endif
                </table>
            </div>
            @endif
        </div>

        <!-- Invoice Information -->
        <div class="section">
            <div class="section-title">Informasi Invoice</div>
            <table class="info-table">
                <tr>
                    <td class="info-label">Invoice Number</td>
                    <td class="info-value">{{ $salesOrder->invoice_number ?: '-' }}</td>
                    <td class="info-label">Invoice Date</td>
                    <td class="info-value">{{ $salesOrder->invoice_date ? \Carbon\Carbon::parse($salesOrder->invoice_date)->locale('id')->isoFormat('DD MMMM YYYY') : '-' }}</td>
                </tr>
                <tr>
                    <td class="info-label">Terms of Payment (T.O.P)</td>
                    <td class="info-value" colspan="3">{{ $salesOrder->top ?: '-' }}</td>
                </tr>
            </table>
        </div>

        <!-- Remarks -->
        @if($salesOrder->remarks)
        <div class="remarks-section">
            <div class="remarks-title">Remarks / Catatan:</div>
            <div class="remarks-content">{{ $salesOrder->remarks }}</div>
        </div>
        @endif

        <!-- Signature Section -->
        <div class="signature-section">
            <table class="signature-table">
                <tr>
                    <td class="signature-cell">
                        <div class="signature-line"></div>
                        <div class="signature-label">Prepared By</div>
                    </td>
                    <td class="signature-cell">
                        <div class="signature-line"></div>
                        <div class="signature-label">Checked By</div>
                    </td>
                    <td class="signature-cell">
                        <div class="signature-line"></div>
                        <div class="signature-label">Approved By</div>
                    </td>
                </tr>
            </table>
        </div>

    </div>

    <!-- Footer -->
    <div class="footer">
        Sales Order No: {{ $salesOrder->order_number }} | PT. Office Management System | Halaman 1 dari 1
    </div>
</body>
</html>