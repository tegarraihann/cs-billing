<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>{{ $invoice->invoice_number }}</title>
    <style>
        @page {
            size: A4;
            margin: 20mm 15mm;
        }

        body {
            font-family: 'Courier New', monospace;
            font-size: 9pt;
            line-height: 1.0;
            margin: 0;
            padding: 0;
            color: #000;
            background: #fff;
        }

        .container {
            width: 100%;
            position: relative;
        }

        /* Logo positioned exactly like the example */
        .logo-section {
            position: absolute;
            top: -10mm;
            right: -5mm;
            width: 100px;
            text-align: center;
        }

        .logo-image {
            width: 80px;
            height: auto;
            margin-bottom: 3px;
        }

        .logo-text {
            font-size: 7pt;
            font-weight: bold;
            color: #2c5530;
            letter-spacing: 1px;
            line-height: 1.1;
        }

        .logo-subtitle {
            font-size: 5.5pt;
            color: #666;
            font-style: italic;
            line-height: 1.0;
        }

        /* First line: CUSTOMER CODE and DEBIT NOTE */
        .header-line {
            margin-top: 70px;
            margin-bottom: 2px;
            font-size: 9pt;
        }

        .customer-code {
            float: left;
        }

        .debit-note-title {
            float: right;
            font-size: 20pt;
            font-weight: bold;
            letter-spacing: 8px;
        }

        .clear {
            clear: both;
        }

        /* Company name - bold and big */
        .company-name {
            font-size: 11pt;
            font-weight: bold;
            text-transform: uppercase;
            margin: 8px 0 2px 0;
        }

        /* Address line */
        .company-address {
            font-size: 9pt;
            text-transform: uppercase;
            margin-bottom: 15px;
        }

        /* Invoice details table - right aligned like example */
        .invoice-details-table {
            float: right;
            width: 180px;
            margin-bottom: 15px;
            font-size: 9pt;
        }

        .invoice-details-table tr {
            line-height: 1.1;
        }

        .invoice-details-table td {
            padding: 1px 0;
            vertical-align: top;
        }

        .inv-label {
            width: 60px;
            text-align: left;
        }

        .inv-colon {
            width: 15px;
            text-align: center;
        }

        .inv-value {
            text-align: left;
        }

        /* Shipment details section - exactly like example layout */
        .shipment-section {
            clear: both;
            margin-top: 20px;
            margin-bottom: 15px;
        }

        .shipment-table {
            width: 100%;
            font-size: 8.5pt;
            border-collapse: collapse;
        }

        .shipment-table td {
            padding: 1px 0;
            vertical-align: top;
            line-height: 1.1;
        }

        .ship-label {
            width: 90px;
            font-weight: bold;
        }

        .ship-colon {
            width: 10px;
        }

        .ship-value {
            width: 200px;
            text-transform: uppercase;
        }

        .ship-label-right {
            width: 80px;
            font-weight: bold;
            padding-left: 20px;
        }

        .ship-colon-right {
            width: 10px;
        }

        .ship-value-right {
            text-transform: uppercase;
        }

        /* Items table exactly like example */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 8.5pt;
            margin-bottom: 20px;
        }

        .items-table th {
            border-top: 2px solid #000;
            border-bottom: 1px solid #000;
            padding: 4px 2px;
            font-weight: bold;
            text-align: center;
            line-height: 1.0;
        }

        .items-table td {
            padding: 3px 2px;
            line-height: 1.0;
            border-bottom: none;
        }

        .desc-col {
            text-align: left;
            width: 40%;
        }

        .qty-col {
            text-align: center;
            width: 8%;
        }

        .unit-col {
            text-align: center;
            width: 10%;
        }

        .rate-col {
            text-align: right;
            width: 15%;
        }

        .cur-col {
            text-align: center;
            width: 8%;
        }

        .amount-col {
            text-align: right;
            width: 19%;
        }

        /* Bottom section with bank details and totals */
        .bottom-section {
            display: table;
            width: 100%;
            margin-top: 25px;
        }

        .bank-details {
            display: table-cell;
            width: 60%;
            vertical-align: top;
            font-size: 8pt;
        }

        .bank-block {
            margin-bottom: 10px;
        }

        .bank-name {
            font-weight: bold;
            margin-bottom: 2px;
        }

        .bank-info {
            line-height: 1.2;
            margin-left: 0;
        }

        .totals-section {
            display: table-cell;
            width: 40%;
            vertical-align: top;
            text-align: right;
            font-size: 9pt;
        }

        .subtotal-line {
            border-top: 1px solid #000;
            padding: 3px 0;
            margin-bottom: 3px;
        }

        .total-line {
            border-top: 2px solid #000;
            border-bottom: 2px solid #000;
            padding: 4px 0;
            font-weight: bold;
        }

        /* Footer exactly like example */
        .footer {
            position: fixed;
            bottom: 15mm;
            left: 15mm;
            right: 15mm;
            font-size: 6.5pt;
            text-align: center;
            color: #666;
            line-height: 1.3;
        }

        .footer-disclaimer {
            margin-bottom: 3px;
            font-style: italic;
        }

        /* Container numbers - handle multiline */
        .container-list {
            line-height: 1.1;
        }

        /* Remove any extra spacing */
        .no-margin {
            margin: 0;
            padding: 0;
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Company Logo positioned exactly like example -->
        <div class="logo-section">
            <img src="{{ public_path('images/logo/logo.png') }}" alt="Eshaka Wijaya Logistics" class="logo-image">
            <div class="logo-text">ESHAKA WIJAYA<br>LOGISTICS</div>
            <div class="logo-subtitle">International Freight<br>Forwarder</div>
        </div>

        <!-- Header line with CUSTOMER CODE and DEBIT NOTE -->
        <div class="header-line">
            <span class="customer-code">CUSTOMER CODE :{{ $invoice->customer->customer_code ?? 'CPP-MRS79' }}</span>
            <span class="debit-note-title">DEBIT NOTE</span>
            <div class="clear"></div>
        </div>

        <!-- Company Name -->
        <div class="company-name">
            {{ strtoupper($invoice->customer->company_name ?? $invoice->salesOrder->customer ?? 'PT CITRA PERDANA PUTRA') }}
        </div>

        <!-- Company Address -->
        <div class="company-address">
            {{ strtoupper($invoice->customer->company_address ?? $invoice->customer->invoice_address ?? 'KO. CITY PARK BLOK L NO.11 CENGKARENG') }}<br>
            {{ strtoupper(($invoice->customer->city ?? 'JAKARTA BARAT') . ' ' . ($invoice->customer->postal_code ?? '11730')) }}
        </div>

        <!-- Invoice Details Table (Right Side) -->
        <table class="invoice-details-table">
            <tr>
                <td class="inv-label">INV DATE</td>
                <td class="inv-colon">:</td>
                <td class="inv-value">
                    @php
                    $invoiceDate = $invoice->invoice_date;
                    if (is_string($invoiceDate)) {
                    $invoiceDate = \Carbon\Carbon::parse($invoiceDate);
                    }
                    @endphp
                    {{ $invoiceDate->format('d-m-Y') }}
                </td>
            </tr>
            <tr>
                <td colspan="3">&nbsp;</td>
            </tr>
            <tr>
                <td class="inv-label">TERM</td>
                <td class="inv-colon">:</td>
                <td class="inv-value">{{ $invoice->term_days ?? 30 }} DAYS</td>
            </tr>
            <tr>
                <td class="inv-label">INV No.</td>
                <td class="inv-colon">:</td>
                <td class="inv-value">{{ $invoice->invoice_number }}</td>
            </tr>
            <tr>
                <td class="inv-label">AJU No.</td>
                <td class="inv-colon">:</td>
                <td class="inv-value">{{ $invoice->salesOrder->aju ?? '0173' }}</td>
            </tr>
        </table>

        <!-- Shipment Details Section -->
        <div class="shipment-section">
            <table class="shipment-table">
                <tr>
                    <td class="ship-label">SHIPPER</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value">{{ strtoupper($invoice->shipper ?? $invoice->salesOrder->shipper ?? 'INNER MONGOLIA EPPEN BIOTECH') }}</td>
                    <td class="ship-label-right">VESSEL</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">{{ strtoupper($invoice->vessel ?? $invoice->salesOrder->vessel ?? 'HOLSATIA') }}</td>
                </tr>
                <tr>
                    <td class="ship-label">CONSIGNEE</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value">{{ strtoupper($invoice->consignee ?? $invoice->customer->company_name ?? $invoice->salesOrder->customer ?? 'PT CITRA PERDANA PUTRA') }}</td>
                    <td class="ship-label-right">FLIGHT/VOY</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">{{ $invoice->flight_voy ?? '507S' }}</td>
                </tr>
                <tr>
                    <td class="ship-label">AWB/BL No.</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value">{{ $invoice->awb_bl_no ?? $invoice->salesOrder->bl_awb ?? '285517558' }}</td>
                    <td class="ship-label-right">POL / POD</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">{{ strtoupper(($invoice->salesOrder->pol ?? 'XINGANG') . ' / ' . ($invoice->salesOrder->pod ?? 'SEMARANG')) }}</td>
                </tr>
                <tr>
                    <td class="ship-label">MAWB/OBL No.</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value">{{ $invoice->mawb_obl_no ?? '-' }}</td>
                    <td class="ship-label-right">ORIGIN</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">{{ strtoupper($invoice->salesOrder->pol ?? 'XINGANG') }}, CHINA</td>
                </tr>
                <tr>
                    <td class="ship-label">GROSS WT</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value">{{ $invoice->gross_weight ? number_format($invoice->gross_weight, 4) . 'KGS' : '69276,0000KGS' }}</td>
                    <td class="ship-label-right">DEST</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">{{ strtoupper($invoice->salesOrder->pod ?? 'SEMARANG') }}</td>
                </tr>
                <tr>
                    <td class="ship-label">VOLUME</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value">{{ $invoice->volume ?? '-' }}</td>
                    <td class="ship-label-right">ETD / ETA</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">
                        @php
                        $etd = $invoice->etd ?? $invoice->salesOrder->etd ?? null;
                        $eta = $invoice->eta ?? $invoice->salesOrder->eta ?? null;

                        $etdFormatted = '14-02-25';
                        $etaFormatted = '06-05-25';

                        if ($etd) {
                        try {
                        $etdFormatted = is_string($etd) ? \Carbon\Carbon::parse($etd)->format('d-m-y') : $etd->format('d-m-y');
                        } catch (Exception $e) {
                        $etdFormatted = '14-02-25';
                        }
                        }

                        if ($eta) {
                        try {
                        $etaFormatted = is_string($eta) ? \Carbon\Carbon::parse($eta)->format('d-m-y') : $eta->format('d-m-y');
                        } catch (Exception $e) {
                        $etaFormatted = '06-05-25';
                        }
                        }
                        @endphp
                        {{ $etdFormatted }} / {{ $etaFormatted }}
                    </td>
                </tr>
                <tr>
                    <td class="ship-label">No. OF PKGS</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value">{{ $invoice->no_of_packages ? $invoice->no_of_packages . ' ' . ($invoice->package_type ?? 'BAG') : '2760 BAG' }}</td>
                    <td class="ship-label-right">CONTAINER No.</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">
                        <div class="container-list">
                            @if($invoice->container_no)
                            {{ $invoice->container_no }}
                            @elseif($invoice->salesOrder && $invoice->salesOrder->containers && $invoice->salesOrder->containers->count() > 0)
                            @foreach($invoice->salesOrder->containers as $container)
                            {{ $container->container_number }}<br>
                            @endforeach
                            @else
                            MSKU2934199<br>MSKU5012720<br>MSKU3839977
                            @endif
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="ship-label">20'/40'/45'</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value">{{ $invoice->container_size ?? '3X20' }}</td>
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td colspan="6">&nbsp;</td>
                </tr>
                <tr>
                    <td class="ship-label">REMARKS</td>
                    <td class="ship-colon">:</td>
                    <td colspan="4">{{ $invoice->remarks ?? '-' }}</td>
                </tr>
            </table>
        </div>

        <!-- Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th class="desc-col">DESCRIPTION</th>
                    <th class="qty-col">QTY</th>
                    <th class="unit-col">UNIT</th>
                    <th class="rate-col">RATE</th>
                    <th class="cur-col">CUR</th>
                    <th class="amount-col">AMOUNT</th>
                </tr>
            </thead>
            <tbody>
                @php
                // Try different possible relationship names
                $items = null;
                if (isset($invoice->invoiceItems) && $invoice->invoiceItems->count() > 0) {
                $items = $invoice->invoiceItems;
                } elseif (isset($invoice->items) && $invoice->items->count() > 0) {
                $items = $invoice->items;
                } elseif (isset($invoice->invoice_items) && $invoice->invoice_items->count() > 0) {
                $items = $invoice->invoice_items;
                }
                @endphp

                @if($items && $items->count() > 0)
                @foreach($items as $item)
                <tr>
                    <td class="desc-col">{{ strtoupper($item->description ?? $item->item_description ?? 'SERVICE') }}</td>
                    <td class="qty-col">{{ $item->quantity ?? $item->qty ?? 1 }}</td>
                    <td class="unit-col">{{ strtoupper($item->unit ?? $item->unit_type ?? 'SET') }}</td>
                    <td class="rate-col">{{ number_format($item->unit_price ?? $item->rate ?? $item->price ?? 0, 2) }}</td>
                    <td class="cur-col">{{ $item->currency ?? 'IDR' }}</td>
                    <td class="amount-col">
                        @php
                        $amount = $item->total_price ?? $item->amount ?? $item->total ?? ($item->quantity ?? 1) * ($item->unit_price ?? $item->rate ?? $item->price ?? 0);
                        @endphp
                        {{ $amount > 0 ? number_format($amount, 2) : '-' }}
                    </td>
                </tr>
                @endforeach
                @else
                {{-- Fallback static data jika tidak ada items dinamis --}}
                <tr>
                    <td class="desc-col">DO CHARGES</td>
                    <td class="qty-col">1</td>
                    <td class="unit-col">SET</td>
                    <td class="rate-col">0,00</td>
                    <td class="cur-col">IDR</td>
                    <td class="amount-col">-</td>
                </tr>
                <tr>
                    <td class="desc-col">LOLO</td>
                    <td class="qty-col">1</td>
                    <td class="unit-col">SET</td>
                    <td class="rate-col">1.398.600,00</td>
                    <td class="cur-col">IDR</td>
                    <td class="amount-col">1.398.600,00</td>
                </tr>
                <tr>
                    <td class="desc-col">STORAGE</td>
                    <td class="qty-col">1</td>
                    <td class="unit-col">SET</td>
                    <td class="rate-col">771.228,00</td>
                    <td class="cur-col">IDR</td>
                    <td class="amount-col">771.228,00</td>
                </tr>
                <tr>
                    <td class="desc-col">BONGKAR</td>
                    <td class="qty-col">3</td>
                    <td class="unit-col">20GP</td>
                    <td class="rate-col">40.000,00</td>
                    <td class="cur-col">IDR</td>
                    <td class="amount-col">120.000,00</td>
                </tr>
                @endif
            </tbody>
        </table>

        <!-- Bottom Section: Bank Details and Totals -->
        <div class="bottom-section">
            <div class="bank-details">
                <div class="bank-block">
                    <div class="bank-name">BANK NAME : Mandiri</div>
                    <div class="bank-info">
                        BANK NUMBER : {{ $invoice->customer->bank_account_mandiri ?? '122-00-12330539' }}<br>
                        ACCOUNT NAME : Eshaka Wijaya Logistics<br>
                        SWIFT CODE : BMRIIDJA<br>
                        ADDRESS : KCP JAKARTA R.S.C.M
                    </div>
                </div>

                <div class="bank-block">
                    <div class="bank-name">BANK NAME : BCA</div>
                    <div class="bank-info">
                        BANK NUMBER : {{ $invoice->customer->bank_account_bca ?? '5445-974 975' }}<br>
                        ACCOUNT NAME : Eshaka Wijaya Logistics<br>
                        SWIFT CODE : CENAIDJAXXX<br>
                        ADDRESS : KCP CITRA 2 EXT
                    </div>
                </div>
            </div>

            <div class="totals-section">
                @php
                $subtotal = $invoice->subtotal ?? ($invoice->total ?? 2289828);
                $total = $invoice->total ?? 2289828;
                @endphp

                <div class="subtotal-line">
                    SUB TOTAL {{ number_format($subtotal, 2) }}
                </div>

                <div class="total-line">
                    TOTAL {{ number_format($total, 2) }}
                </div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-disclaimer">
                This is system generated document, No signature is required
            </div>
            <div class="footer-address">
                Ruko AEROHUB Citra 8 ,C7-10, Kel Pegadungan, Kec Kalideres,<br>
                Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11830
            </div>
        </div>
    </div>
</body>

</html>
