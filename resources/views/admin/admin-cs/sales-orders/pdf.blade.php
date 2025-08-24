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
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .document-details {
            font-size: 8px;
            line-height: 1.2;
        }
        
        .clear {
            clear: both;
        }
        
        .content {
            margin-top: 10px;
        }
        
        .section {
            margin-bottom: 12px;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 10px;
            font-weight: bold;
            color: #000;
            border-bottom: 1px solid #000;
            padding-bottom: 2px;
            margin-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.3px;
        }
        
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 8px;
        }
        
        .info-table td {
            padding: 2px 4px;
            vertical-align: top;
            border-bottom: 1px solid #eee;
            font-size: 8px;
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
            padding: 8px;
            margin-top: 10px;
            background-color: #fafafa;
        }
        
        .pricing-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .pricing-table td {
            padding: 3px;
            border-bottom: 1px dotted #ccc;
            font-size: 8px;
        }
        
        .pricing-label {
            font-weight: bold;
            text-align: left;
        }
        
        .pricing-value {
            text-align: right;
            font-family: monospace;
            font-size: 8px;
        }
        
        .total-row {
            border-top: 2px solid #000;
            font-weight: bold;
            font-size: 9px;
        }
        
        .footer {
            position: fixed;
            bottom: 0.5cm;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 7px;
            color: #666;
            border-top: 1px solid #ccc;
            padding-top: 4px;
            background: white;
        }
        
        .status-info {
            margin-top: 8px;
            text-align: right;
        }
        
        .status-badge {
            display: inline-block;
            padding: 2px 6px;
            border: 1px solid #333;
            font-size: 7px;
            font-weight: bold;
            text-transform: uppercase;
            background-color: white;
        }
        
        .print-info {
            text-align: right;
            font-size: 7px;
            color: #666;
            margin-bottom: 8px;
            font-style: italic;
        }
        
        .signature-section {
            margin-top: 20px;
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
            padding: 8px 5px;
        }
        
        .signature-line {
            border-bottom: 1px solid #000;
            margin-bottom: 3px;
            height: 25px;
        }
        
        .signature-label {
            font-size: 8px;
            font-weight: bold;
        }
        
        .remarks-section {
            margin-top: 10px;
            border: 1px solid #ddd;
            padding: 6px;
        }
        
        .remarks-title {
            font-weight: bold;
            margin-bottom: 3px;
            font-size: 8px;
        }
        
        .remarks-content {
            font-size: 8px;
            line-height: 1.2;
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
            <div class="document-title">Sales Order</div>
            <div class="document-details">
                <strong>No: {{ $salesOrder->order_number }}</strong><br>
                Tanggal: {{ $salesOrder->created_at ? $salesOrder->created_at->locale('id')->isoFormat('DD MMMM YYYY') : date('d F Y') }}<br>
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
        
        <!-- Primary Information -->
        <div class="section">
            <div class="section-title">Informasi Sales Order</div>
            
            <!-- Two Column Layout -->
            <div style="width: 100%; display: table; margin-bottom: 15px;">
                <!-- Left Column -->
                <div style="width: 48%; display: table-cell; vertical-align: top; padding-right: 2%;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="width: 35%; font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">ORDER NUMB</td>
                            <td style="width: 5%; font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="width: 60%; font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">{{ $salesOrder->order_number }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">CUSTOMER</td>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->customer }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">SHIPPER</td>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->shipper ?: '-' }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">BL/AWB</td>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->bl_awb ?: '-' }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">LINER</td>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->liner ?: '-' }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">VESSEL</td>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->vessel ?: '-' }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">ETA</td>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->eta ? \Carbon\Carbon::parse($salesOrder->eta)->locale('id')->isoFormat('DD MMMM YYYY') : '-' }}</td>
                        </tr>
                    </table>
                </div>

                <!-- Right Column -->
                <div style="width: 48%; display: table-cell; vertical-align: top; padding-left: 2%;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="width: 35%; font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">AJU</td>
                            <td style="width: 5%; font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="width: 60%; font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->aju ?: '-' }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">SPPB DATE</td>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->sppb_date ? \Carbon\Carbon::parse($salesOrder->sppb_date)->locale('id')->isoFormat('DD MMMM YYYY') : '-' }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">SHIPMENT TYPE</td>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->shipment_type ?: '-' }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">POL/POD</td>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ ($salesOrder->pol && $salesOrder->pod) ? $salesOrder->pol . ' / ' . $salesOrder->pod : ($salesOrder->pol ?: ($salesOrder->pod ?: '-')) }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">GUDANG/UTC</td>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->gudang_utc ?: '-' }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">PARTY/LCL</td>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->party_lcl ?: '-' }}</td>
                        </tr>
                        <tr>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">PREPARED BY</td>
                            <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                            <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->prepared_by ?: '-' }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

        <!-- Detail Information -->
        <div class="section">
            <div class="section-title">Detail Informasi</div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
                <tbody style="background: white;">
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; width: 25%; border-bottom: 1px solid #ddd;">EXCHANGE RATE</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->exchange_rate ? number_format($salesOrder->exchange_rate, 2, ',', '.') : '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">JENIS BIAYA</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->jenis_biaya ?: '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">BUYING</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->buying ? 'Rp ' . number_format($salesOrder->buying, 0, ',', '.') : '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">SELLING</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->selling ? 'Rp ' . number_format($salesOrder->selling, 0, ',', '.') : '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">REVENUE</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->revenue ? 'Rp ' . number_format($salesOrder->revenue, 0, ',', '.') : '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">REMARKS</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->remarks ?: '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">GOODS</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->goods ?: '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">COMMODITY/URAIAN BARANG</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->commodity ?: '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">QTY</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->qty ?: '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">NET WEIGHT (KG)</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->net_weight ? number_format($salesOrder->net_weight, 2, ',', '.') . ' kg' : '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">CONTAINER NO</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->container_no ?: '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">INVOICE NUMB</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->invoice_number ?: '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">INVOICE DATE</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->invoice_date ? \Carbon\Carbon::parse($salesOrder->invoice_date)->locale('id')->isoFormat('DD MMMM YYYY') : '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; background-color: #f5f5f5; border-bottom: 1px solid #ddd;">T.O.P</td>
                        <td style="padding: 3px 6px; font-size: 8px; border-bottom: 1px solid #ddd;">{{ $salesOrder->top ?: '-' }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Vendor Information -->
        @if($salesOrder->vendors)
        @php
            $vendorInfo = is_array($salesOrder->vendors) ? 
                (count($salesOrder->vendors) > 0 ? $salesOrder->vendors[0] : null) : 
                (is_object($salesOrder->vendors) ? $salesOrder->vendors : null);
        @endphp
        @if($vendorInfo)
        <div class="section">
            <div class="section-title">Buying to Vendor</div>
            <div style="border: 1px solid #ddd; padding: 6px; background-color: #fafafa;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold; width: 25%;">Deskripsi:</td>
                        <td style="padding: 3px 6px; font-size: 8px;" colspan="3">{{ $vendorInfo['deskripsi'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold;">Nominal:</td>
                        <td style="padding: 3px 6px; font-size: 8px;">{{ isset($vendorInfo['nominal']) ? 'Rp ' . number_format($vendorInfo['nominal'], 0, ',', '.') : '-' }}</td>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold;">Company:</td>
                        <td style="padding: 3px 6px; font-size: 8px;">{{ $vendorInfo['company_name'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold;">No Rekening:</td>
                        <td style="padding: 3px 6px; font-size: 8px;">{{ $vendorInfo['no_rekening'] ?? '-' }}</td>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold;">Nama Rekening:</td>
                        <td style="padding: 3px 6px; font-size: 8px;">{{ $vendorInfo['nama_rekening'] ?? '-' }}</td>
                    </tr>
                    <tr>
                        <td style="padding: 3px 6px; font-size: 8px; font-weight: bold;">RCVD INV:</td>
                        <td style="padding: 3px 6px; font-size: 8px;" colspan="3">{{ $vendorInfo['rcvd_inv'] ?? '-' }}</td>
                    </tr>
                </table>
            </div>
        </div>
        @endif
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
        Sales Order No: {{ $salesOrder->order_number }} | PT. Eshaka Wijaya Logistics | Halaman 1 dari 1
    </div>
</body>
</html>