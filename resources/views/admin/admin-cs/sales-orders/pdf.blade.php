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
            text-align: left;
            font-size: 7px;
            color: #666;
            margin-bottom: 8px;
            font-style: italic;
            margin-left: 85%;
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
    <div class="print-info" style="line-height: 1.5;">
        Dicetak pada: {{ \Carbon\Carbon::now()->locale('id')->isoFormat('DD MMMM YYYY HH:mm') }}<br>
        Account: {{ auth()->user()->name ?? 'System' }}
    </div>

    <!-- Content -->
    <div class="content">

        <!-- Primary Information -->
        <div class="section">
            <div class="section-title">Informasi Sales Order</div>

            <!-- Two Column Layout -->
            <div style="width: 100%; display: table; margin-bottom: 25px;">
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

        <!-- Exchange Rate -->
        <div style="margin-bottom: 2px;">
            <table style="width: 49%; border-collapse: collapse;">
                <tr>
                    <td style="width: 35%; font-size: 8px; font-style: italic; padding: 1px 0; vertical-align: top;">EXCHANGE RATE</td>
                    <td style="width: 5%; font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                    <td style="width: 60%; font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->exchange_rate ? number_format($salesOrder->exchange_rate, 4, '.', '.') : '-' }}</td>
                </tr>
            </table>
        </div>

        <!-- Detail Information -->
        <div class="section">
            <div class="section-title">Detail Informasi</div>

            <!-- Vendor Breakdown -->
            @if($salesOrder->vendor_breakdown && is_array($salesOrder->vendor_breakdown))
            <div style="font-family: 'Times New Roman', serif; font-size: 9px; margin-bottom: 20px;">
                <table style="width: 100%; border-collapse: collapse; border: 1px solid #000;">
                    <tr style="background-color: #f0f0f0;">
                        <td style="width: 20%; font-weight: bold; padding: 4px; vertical-align: top; border: 1px solid #000; text-align: center;">VENDOR</td>
                        <td style="width: 20%; font-weight: bold; padding: 4px; vertical-align: top; border: 1px solid #000; text-align: center;">JENIS BIAYA</td>
                        <td style="width: 15%; font-weight: bold; padding: 4px; vertical-align: top; border: 1px solid #000; text-align: center;">BUYING</td>
                        <td style="width: 15%; font-weight: bold; padding: 4px; vertical-align: top; border: 1px solid #000; text-align: center;">SELLING</td>
                        <td style="width: 15%; font-weight: bold; padding: 4px; vertical-align: top; border: 1px solid #000; text-align: center;">PROFIT</td>
                        <td style="width: 15%; font-weight: bold; padding: 4px; vertical-align: top; border: 1px solid #000; text-align: center;">REMARKS</td>
                    </tr>
                    @php
                        $totalBuying = 0;
                        $totalSelling = 0;
                    @endphp
                    @foreach($salesOrder->vendor_breakdown as $item)
                    @php
                        $buying = floatval($item['buying_amount'] ?? 0);
                        $selling = floatval($item['selling_amount'] ?? 0);
                        $profit = $selling - $buying;
                        $totalBuying += $buying;
                        $totalSelling += $selling;
                    @endphp
                    <tr>
                        <td style="padding: 3px; vertical-align: top; border: 1px solid #000; font-size: 8px;">{{ $item['nama_vendor'] ?? '-' }}</td>
                        <td style="padding: 3px; vertical-align: top; border: 1px solid #000; font-size: 8px;">{{ $item['description'] ?? '-' }}</td>
                        <td style="padding: 3px; vertical-align: top; border: 1px solid #000; text-align: right; font-size: 8px;">{{ $buying > 0 ? 'Rp ' . number_format($buying, 0, '.', '.') : '-' }}</td>
                        <td style="padding: 3px; vertical-align: top; border: 1px solid #000; text-align: right; font-size: 8px;">{{ $selling > 0 ? 'Rp ' . number_format($selling, 0, '.', '.') : '-' }}</td>
                        <td style="padding: 3px; vertical-align: top; border: 1px solid #000; text-align: right; font-size: 8px; {{ $profit >= 0 ? 'color: green;' : 'color: red;' }}">{{ 'Rp ' . number_format($profit, 0, '.', '.') }}</td>
                        <td style="padding: 3px; vertical-align: top; border: 1px solid #000; font-size: 8px;">{{ $item['remarks'] ?? '-' }}</td>
                    </tr>
                    @endforeach
                    <!-- Total Row -->
                    <tr style="background-color: #e0e0e0; font-weight: bold;">
                        <td style="padding: 4px; border: 1px solid #000; text-align: center;" colspan="2">TOTAL</td>
                        <td style="padding: 4px; border: 1px solid #000; text-align: right;">Rp {{ number_format($totalBuying, 0, '.', '.') }}</td>
                        <td style="padding: 4px; border: 1px solid #000; text-align: right;">Rp {{ number_format($totalSelling, 0, '.', '.') }}</td>
                        <td style="padding: 4px; border: 1px solid #000; text-align: right; {{ ($totalSelling - $totalBuying) >= 0 ? 'color: green;' : 'color: red;' }}">Rp {{ number_format($totalSelling - $totalBuying, 0, '.', '.') }}</td>
                        <td style="padding: 4px; border: 1px solid #000;"></td>
                    </tr>
                </table>
            </div>
            @else
            <!-- Fallback for legacy data -->
            <div style="font-family: 'Times New Roman', serif; font-size: 10px; margin-bottom: 35px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 20%; font-weight: bold; padding: 2px 0; vertical-align: top;">JENIS BIAYA</td>
                        <td style="width: 20%; font-weight: bold; padding: 2px 16px; vertical-align: top;">BUYING</td>
                        <td style="width: 20%; font-weight: bold; padding: 2px 16px; vertical-align: top;">SELLING</td>
                        <td style="width: 20%; font-weight: bold; padding: 2px 16px; vertical-align: top;">REVENUE</td>
                        <td style="width: 20%; font-weight: bold; padding: 2px 16px; vertical-align: top;">REMARKS</td>
                    </tr>
                    <tr>
                        <td style="padding: 2px 0; vertical-align: top; border-bottom: 1px solid #ddd;">{{ $salesOrder->jenis_biaya ?: '-' }}</td>
                        <td style="padding: 2px 16px; vertical-align: top; border-bottom: 1px solid #ddd;">{{ $salesOrder->total_buying ? 'Rp ' . number_format($salesOrder->total_buying, 0, '.', '.') : '-' }}</td>
                        <td style="padding: 2px 16px; vertical-align: top; border-bottom: 1px solid #ddd;">{{ $salesOrder->total_selling ? 'Rp ' . number_format($salesOrder->total_selling, 0, '.', '.') : '-' }}</td>
                        <td style="padding: 2px 16px; vertical-align: top; border-bottom: 1px solid #ddd;">{{ $salesOrder->total_revenue ? 'Rp ' . number_format($salesOrder->total_revenue, 0, '.', '.') : '-' }}</td>
                        <td style="padding: 2px 16px; vertical-align: top; border-bottom: 1px solid #ddd;">{{ $salesOrder->remarks ?: '-' }}</td>
                    </tr>
                </table>
            </div>
            @endif

        </div>

        <!-- Detail Invoice -->
        <div class="section">
            <div class="section-title">Detail Invoice</div>
            <div style="margin-bottom: 15px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 35%; font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">INVOICE NUMB</td>
                        <td style="width: 5%; font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                        <td style="width: 60%; font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->invoice_number ?: '-' }}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">INVOICE DATE</td>
                        <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                        <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->invoice_date ? \Carbon\Carbon::parse($salesOrder->invoice_date)->locale('id')->isoFormat('DD MMMM YYYY') : '-' }}</td>
                    </tr>
                    <tr>
                        <td style="font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">TERM</td>
                        <td style="font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                        <td style="font-size: 8px; padding: 1px 0; vertical-align: top;">{{ $salesOrder->top ?: '-' }}</td>
                    </tr>
                </table>
            </div>

            <!-- Garis pemisah -->
            <div style="border-bottom: 1px solid #000; margin: 10px 0;"></div>

            <!-- Note -->
            <div style="margin-bottom: 15px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 10%; font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">NOTE</td>
                        <td style="width: 3%; font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                        <td style="width: 87%; font-size: 8px; padding: 1px 0; vertical-align: top; min-height: 30px; padding: 5px;">
                            {{ $salesOrder->note ?: 'Tidak ada catatan tambahan' }}
                        </td>
                    </tr>
                </table>
            </div>

            <!-- Remarks -->
            @if($salesOrder->remarks)
            <div style="margin-bottom: 15px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="width: 10%; font-size: 8px; font-weight: bold; padding: 1px 0; vertical-align: top;">REMARKS</td>
                        <td style="width: 3%; font-size: 8px; font-weight: bold; padding: 1px 0; text-align: center; vertical-align: top;">:</td>
                        <td style="width: 87%; font-size: 8px; padding: 1px 0; vertical-align: top; min-height: 20px; padding: 5px;">
                            {{ $salesOrder->remarks }}
                        </td>
                    </tr>
                </table>
            </div>
            @endif
        </div>

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
