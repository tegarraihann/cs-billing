<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>NOTA - {{ $invoice->invoice_number }}</title>
    <style>
        @page {
            size: A4;
            margin: 20mm 15mm;
        }

        body {
            font-family: 'Arial', sans-serif;
            font-size: 10pt;
            line-height: 1.2;
            margin: 0;
            padding: 0;
            color: #000;
            background: #fff;
        }

        .container {
            width: 100%;
            position: relative;
            min-height: 100vh;
        }

        /* Header Company Name */
        .company-header {
            text-align: left;
            font-size: 8pt;
            font-weight: bold;
            margin-bottom: 30px;
            text-transform: uppercase;
        }

        /* NOTA Title Section */
        .nota-title {
            text-align: center;
            margin-bottom: 5px;
        }

        .nota-title h1 {
            font-size: 9pt;
            font-weight: bold;
            margin: 0;
            letter-spacing: 0px;
            text-decoration: underline;
            margin-left: 44pt;
        }

        .nota-number {
            text-align: center;
            font-size: 10pt;
            margin-left: 115pt;
            font-family: 'Times New Roman', Times, serif;
            font-weight: 400;
        }

        .nota-subtitle {
            font-size: 7pt;
            margin-bottom: 30px;
            margin-left: 263pt;
        }

        /* Invoice Details */
        .invoice-details {
            margin-bottom: 30px;
            font-size: 7pt;
        }

        .invoice-details table {
            width: 100%;
            border-collapse: collapse;
        }

        .invoice-details td {
            padding: 3px 0;
            vertical-align: top;

        }

        .detail-label {
            width: 120px;
            font-weight: bold;
        }

        .detail-colon {
            width: 20px;
            text-align: center;
        }

        .detail-value {
            font-weight: normal;
        }

        /* Items Table */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
            font-size: 7pt;
        }

        .items-table th {
            border-top: 2px solid #000;
            border-bottom: 1px solid #000;
            padding: 8px 5px;
            text-align: center;
            font-weight: bold;
            background-color: #f5f5f5;
        }

        .items-table td {
            padding: 8px 5px;
            border-bottom: 1px solid #ccc;
            text-align: center;
        }

        .items-table tbody tr:last-child td {
            border-bottom: none;
        }

        .items-table td:first-child {
            text-align: left;
        }

        .items-table td:nth-child(2),
        .items-table td:nth-child(3),
        .items-table td:nth-child(4) {
            text-align: right;
        }

        /* Terms and Conditions Box */
        .terms-box {
            border: 2px solid #000;
            border-bottom: 3px solid #000;
            padding: 15px;
            margin: 30px 0;
            font-size: 8pt;
            line-height: 1.4;
        }

        .terms-box ol {
            margin: 0;
            padding-left: 15px;
        }

        .terms-box li {
            margin-bottom: 5px;
            font-weight: bold
        }

        /* NOTE and TOTAL Section */
        .note-total-section {
            margin: 20px 0;
            border-top: 2px solid #000;
            padding-top: 10px;
        }

        .note-total-info {
            display: flex;
            justify-content: space-between;
            width: 100%;
        }

        .note-left {
            text-align: left;
            font-size: 7pt;
            font-weight: bold;
            flex: 1;
            position: relative;
            top: 5px;
        }

        .total-right {
            text-align: right;
            font-size: 9pt;
            font-weight: normal;
            flex: 1;
            position: relative;
            top: -19px;
        }

        /* Footer Section */
        .footer-section {
            position: absolute;
            bottom: 100px;
            left: 0;
            right: 0;
            font-size: 8pt;
        }

        .footer-info {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
        }

        .footer-left {
            text-align: left;
            padding-bottom: 10px;
        }

        .footer-right {
            text-align: right;
        }

        .meterai-section {
            text-align: center;
            font-size: 7pt;
            margin-bottom: 10px;
            margin-left: 430px;
        }

        /* .qr-placeholder {
            width: 50px;
            height: 50px;
            border: 1px solid #000;
            display: inline-block;
            margin-left: 10px;
        } */

        .computer-generated {
            text-align: center;
            font-size: 8pt;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .copy-label {
            text-align: center;
            font-size: 12pt;
            font-weight: bold;
            margin-top: 10px;
        }

        /* Watermark */
        .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 100pt;
            font-weight: bold;
            color: rgba(128, 128, 128, 0.1);
            z-index: -1;
            pointer-events: none;
            white-space: nowrap;
        }

        /* Currency formatting */
        .currency {
            text-align: right;
        }

        .amount-large {
            font-size: 9pt;
            font-weight: normal;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Watermark -->
        <div class="watermark">{{ $invoice->status === 'draft' ? 'ORIGINAL' : 'ORIGINAL' }}</div>

        <!-- Company Header -->
        <div class="company-header">
            ESHAKA WIJAYA LOGISTICS, PT
        </div>

        <!-- NOTA Title -->
        <div class="nota-title">
            <h1>NOTA</h1>
        </div>

        <div class="nota-number">
            No. {{ $invoice->invoice_number }}
        </div>

        <div class="nota-subtitle">
            <strong>Kami mendebit anda untuk pengiriman<br></strong>
            {{ strtoupper($invoice->vessel ?? $invoice->salesOrder->vessel ?? 'VESSEL NAME') }}
            {{ strtoupper($invoice->salesOrder->pol ?? 'ORIGIN') }} to
            {{ strtoupper($invoice->salesOrder->pod ?? 'DESTINATION') }}
        </div>

        <!-- Invoice Details -->
        <div class="invoice-details">
            <table>
                <tr>
                    <td class="detail-label">Kepada</td>
                    <td class="detail-colon">:</td>
                    <td class="detail-value">
                        {{ strtoupper($invoice->customer->company_name ?? $invoice->salesOrder->customer ?? 'PT LOGISTICS NUSANTARA SEJAHTERA') }}
                    </td>
                </tr>
                <tr>
                    <td class="detail-label">Tanggal</td>
                    <td class="detail-colon">:</td>
                    <td class="detail-value">
                        @php
                            $invoiceDate = $invoice->invoice_date;
                            if (is_string($invoiceDate)) {
                                $invoiceDate = \Carbon\Carbon::parse($invoiceDate);
                            }
                        @endphp
                        {{ $invoiceDate->format('d/m/Y') }}
                    </td>
                </tr>
                <tr>
                    <td class="detail-label">Jatuh Tempo</td>
                    <td class="detail-colon">:</td>
                    <td class="detail-value">
                        @php
                            $dueDate = $invoice->due_date;
                            if (is_string($dueDate)) {
                                $dueDate = \Carbon\Carbon::parse($dueDate);
                            }
                        @endphp
                        {{ $dueDate->format('d/m/Y') }}
                    </td>
                </tr>
                <tr>
                    <td class="detail-label">No. BL</td>
                    <td class="detail-colon">:</td>
                    <td class="detail-value">{{ $invoice->awb_bl_no ?? $invoice->salesOrder->bl_awb ?? '-' }}</td>
                </tr>
                <tr>
                    <td class="detail-label">Nota Tambahan</td>
                    <td class="detail-colon">:</td>
                    <td class="detail-value">{{ $invoice->remarks ?? '-' }}</td>
                </tr>
            </table>
        </div>

        <!-- Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th style="width: 50%; text-align: left;">KETERANGAN</th>
                    <th style="width: 15%; text-align: right;">JUMLAH</th>
                    <th style="width: 20%; text-align: right;">HARGA</th>
                    <th style="width: 15%; text-align: right;">SUBTOTAL</th>
                </tr>
            </thead>
            <tbody>
                @php
                    // Get reimbursement items only
                    $allItems = null;
                    if (isset($invoice->invoiceItems) && $invoice->invoiceItems->count() > 0) {
                        $allItems = $invoice->invoiceItems;
                    } elseif (isset($invoice->items) && $invoice->items->count() > 0) {
                        $allItems = $invoice->items;
                    }

                    // Filter for reimbursement items only
                    $items = $allItems ? $allItems->filter(function ($item) {
                        return ($item->item_ref === 'reimbursement') ||
                            ($item->item_type ?? 'billable') !== 'operational_cost';
                    }) : collect();

                    $totalAmount = 0;
                @endphp

                @if($items && $items->count() > 0)
                    @foreach($items as $item)
                        @php
                            $itemAmount = $item->total_price ?? $item->amount ?? $item->total ?? (($item->quantity ?? 1) * ($item->unit_price ?? $item->rate ?? $item->price ?? 0));
                            $totalAmount += $itemAmount;
                        @endphp
                        <tr>
                            <td>{{ strtoupper($item->description ?? $item->item_description ?? 'SERVICE') }}</td>
                            <td>{{ $item->quantity ?? $item->qty ?? 1 }}</td>
                            <td class="currency">RP
                                {{ number_format($item->unit_price ?? $item->rate ?? $item->price ?? 0, 2, ',', '.') }}</td>
                            <td class="currency">RP {{ number_format($itemAmount, 2, ',', '.') }}</td>
                        </tr>
                    @endforeach
                @else
                    {{-- Default reimbursement items if none exist --}}
                    <tr>
                        <td>ADMIN FEE</td>
                        <td>1</td>
                        <td class="currency">RP 0,00</td>
                        <td class="currency">RP 0,00</td>
                    </tr>
                    <tr>
                        <td>PLATFORM FEE</td>
                        <td>1</td>
                        <td class="currency">RP 5.000,00</td>
                        <td class="currency">RP 5.000,00</td>
                    </tr>
                    @php $totalAmount = 5000; @endphp
                @endif
            </tbody>
        </table>

        <!-- Terms and Conditions -->
        <div class="terms-box">
            <ol>
                <li>Pembayaran dengan CH/BG harus diatas namakan Eshaka Wijaya Logistics, PT.</li>
                <li>Pembayaran dengan Bank Transfer harus ditujukan ke Rekening Perusahaan a/n Eshaka Wijaya Logistics,
                    PT.</li>
                <li>Pembayaran dianggap lunas setelah dana dipastikan masuk Rekening Perusahaan dalam FULL AMOUNT.</li>
                <li>Pengajuan keberatan / koreksi harus diajukan selambat-lambatnya 7 hari sejak nota diterima, apabila
                    melampaui dianggap benar / disetujui.</li>
                <li>Keterlambatan pembayaran akan dikenakan kenaikan sebesar 1% dari tunggakan yang belum diselesaikan.
                </li>
            </ol>
        </div>

        <!-- NOTE and TOTAL Section -->
        <div class="note-total-section">
            <div class="note-total-info">
                <div class="note-left">
                    <strong>NOTE :</strong> {{ $invoice->notes ?? $invoice->remarks ?? $invoice->description ?? '-' }}
                </div>
                <div class="total-right">
                    <div class="amount-large">
                        TOTAL &nbsp;&nbsp;&nbsp;&nbsp; RP {{ number_format($totalAmount, 2, ',', '.') }}
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Section -->
        <div class="footer-section">
            <div class="footer-info">
                <div class="footer-left">
                    <hr style="border: none; border-top: 1px solid #000; margin: 10px 0; width: 100%;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div style="text-align: left; flex: 1;">
                            Payable (PREPAID) at : {{ strtoupper($invoice->salesOrder->pol ?? 'JAKARTA') }} - CY(FIOST)/PORT<br>
                            Penyelesaian piutang atas nota ini menjadi tanggung jawab
                        </div>
                        <div style="text-align: right; flex: 1; position: relative; top: -27px; font-weight: bold; right: 40px;">
                            PT. ESHAKA WIJAYA LOGISTICS
                        </div>
                    </div>
                </div>
                <div class="footer-right">
                    <div class="meterai-section">
                        <strong>BEA METERAI LUNAS</strong><br>
                        Rp. 10000,-<br><br>
                        <strong>Ijin Pembubuhan Bea Meterai Lunas<br>
                        dengan Sistem Komputerisasi<br>
                        Dirjen Pajak No. SI-00025/SK/WPJ.11/KP.0104/2017<br>
                        (01/01/2017)</strong>
                    </div>
                    <!-- QR Code placeholder -->
                    {{-- <div class="qr-placeholder"></div> --}}
                </div>
            </div>

            <div class="computer-generated">
                ** COMPUTER GENERATED DOCUMENT --- NO SIGNATURE / NO STAMP NEEDED
            </div>

            <div class="copy-label">
                {{ $invoice->status === 'draft' ? 'ASLI (ORIGINAL)' : 'ASLI (ORIGINAL)' }}
            </div>
        </div>
    </div>
</body>

</html>
