<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $invoice->invoice_number }}</title>
    <style>
        @page {
            margin: 3cm 3cm 3cm 3cm;
            size: A4 portrait;
        }

        body {
            font-family: 'Courier New', monospace;
            font-size: 8px;
            line-height: 1.0;
            margin: 0;
            padding: 0;
            color: #000;
            font-weight: normal;
        }

        .page-container {
            width: 100%;
            height: 100%;
            position: relative;
        }

        /* Top Header Line */
        .top-header {
            width: 100%;
            margin-bottom: 8px;
        }

        .customer-code {
            float: left;
            font-size: 8px;
            font-weight: normal;
        }

        .debit-note-right {
            float: right;
            font-size: 8px;
            font-weight: bold;
        }

        /* Customer Section */
        .customer-section {
            clear: both;
            margin-bottom: 8px;
        }

        .customer-left {
            float: left;
            width: 50%;
            font-size: 8px;
            line-height: 1.0;
        }

        .invoice-details-right {
            float: right;
            width: 45%;
            font-size: 8px;
            line-height: 1.0;
            text-align: left;
        }

        /* Company Logo */
        .logo-section {
            position: absolute;
            top: -10px;
            right: 10px;
            width: 140px;
            text-align: center;
            font-size: 6px;
        }

        .logo-circle {
            width: 50px;
            height: 50px;
            border: 2px solid #666;
            border-radius: 50%;
            margin: 0 auto 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 10px;
            background-color: #f8f8f8;
        }

        .logo-text {
            font-size: 7px;
            font-weight: bold;
            line-height: 1.1;
        }

        .logo-subtitle {
            font-size: 5px;
            font-style: italic;
            line-height: 1.0;
        }

        /* Center Title */
        .center-title {
            clear: both;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            margin: 10px 0 8px 0;
            letter-spacing: 2px;
        }

        /* Shipment Details */
        .shipment-details {
            width: 100%;
            margin-bottom: 8px;
        }

        .shipment-left {
            float: left;
            width: 48%;
            font-size: 8px;
            line-height: 1.0;
        }

        .shipment-right {
            float: right;
            width: 48%;
            font-size: 8px;
            line-height: 1.0;
        }

        /* Dashed Line */
        .dashed-line {
            clear: both;
            border-top: 1px dashed #000;
            margin: 8px 0;
        }

        /* Items Table */
        .items-section {
            width: 100%;
            margin: 5px 0;
        }

        .items-header {
            font-size: 8px;
            font-weight: bold;
            border-top: 1px dashed #000;
            border-bottom: 1px dashed #000;
            padding: 2px 0;
            margin-bottom: 2px;
        }

        .item-row {
            font-size: 8px;
            padding: 1px 0;
            line-height: 1.0;
        }

        /* Bank and Totals */
        .bank-totals-section {
            clear: both;
            margin-top: 10px;
        }

        .bank-left {
            float: left;
            width: 48%;
            font-size: 8px;
            line-height: 1.0;
        }

        .totals-right {
            float: right;
            width: 48%;
            font-size: 8px;
            text-align: right;
            line-height: 1.0;
        }

        .total-line {
            border-top: 1px dashed #000;
            border-bottom: 1px dashed #000;
            padding: 2px 0;
            font-weight: bold;
        }

        .subtotal-line {
            border-top: 1px dashed #000;
            padding: 2px 0;
        }

        /* Footer */
        .footer {
            clear: both;
            margin-top: 20px;
            font-size: 7px;
            line-height: 1.1;
        }

        .clearfix::after {
            content: "";
            display: table;
            clear: both;
        }

        /* Spacing classes */
        .mb-1 { margin-bottom: 1px; }
        .mb-2 { margin-bottom: 2px; }
        .mb-4 { margin-bottom: 4px; }
        .mt-2 { margin-top: 2px; }

        /* Text formatting */
        .bold { font-weight: bold; }
        .right { text-align: right; }
    </style>
</head>
<body>
    <div class="page-container">
        <!-- Company Logo -->
        <div class="logo-section">
            <div class="logo-circle">
                <div style="transform: rotate(-10deg); color: #4a7c59;">🍃</div>
            </div>
            <div class="logo-text">ESHAKA WIJAYA LOGISTICS</div>
            <div class="logo-subtitle">International Freight Forwarder</div>
        </div>

        <!-- Top Header Line -->
        <div class="top-header clearfix">
            <div class="customer-code">CUST CODE :{{ $invoice->customer->customer_code ?? $invoice->salesOrder->customer_code ?? 'N/A' }}</div>
            <div class="debit-note-right"><strong>DEBIT NOTE</strong></div>
        </div>

        <!-- Customer Section -->
        <div class="customer-section clearfix">
            <div class="customer-left">
                <strong>{{ strtoupper($invoice->customer->consignee_shipper ?? $invoice->customer->company_name ?? $invoice->salesOrder->customer ?? $invoice->salesOrder->customer_name ?? 'UNKNOWN CUSTOMER') }}</strong><br>
                {{ strtoupper($invoice->customer->company_address ?? $invoice->customer->invoice_address ?? $invoice->salesOrder->customer_address ?? 'N/A') }}
            </div>

            <div class="invoice-details-right">
                INV DATE :{{ $invoice->invoice_date->format('d-n-y') }}<br><br>
                TERM :{{ $invoice->term_days }} DAYS<br><br>
                INV No. :{{ $invoice->invoice_number }}<br>
                AJU No. :{{ $invoice->salesOrder->aju ?? '0173' }}
            </div>
        </div>

        <!-- Center Title -->
        <div class="center-title">DEBIT NOTE</div>

        <!-- Shipment Details -->
        <div class="shipment-details clearfix">
            <div class="shipment-left">
                SHIPPER :{{ strtoupper($invoice->shipper ?? '') }}<br>
                CONSIGNEE :{{ strtoupper($invoice->consignee ?? '') }}<br>
                AWB/BL No. :{{ $invoice->awb_bl_no ?? '' }}<br>
                MAWB/OBL No. :{{ $invoice->mawb_obl_no ?? '-' }}<br>
                GROSS WT :{{ $invoice->gross_weight ? number_format($invoice->gross_weight, 4) . 'KGS' : '' }}<br>
                VOLUME :{{ $invoice->volume ?? '-' }}<br>
                No. OF PKGS :{{ $invoice->no_of_packages ? $invoice->no_of_packages . ' BAG' : '' }}<br>
                20'/40'/45' :{{ $invoice->container_size ?? '' }}<br>
                @if($invoice->container_no)
                    @foreach(explode(',', $invoice->container_no) as $container)
                    :{{ trim($container) }}<br>
                    @endforeach
                @endif
                <br>
                REMARKS :{{ $invoice->remarks ?? '-' }}
            </div>

            <div class="shipment-right">
                VESSEL :{{ strtoupper($invoice->vessel ?? '') }}<br>
                FLIGHT/VOY :{{ $invoice->flight_voy ?? '' }}<br>
                POL / POD :{{ strtoupper($invoice->pol_pod ?? '') }}<br>
                ORIGIN :{{ strtoupper($invoice->origin ?? '') }}<br>
                DEST :{{ strtoupper($invoice->destination ?? '') }}<br>
                ETD / ETA :{{ $invoice->etd ? $invoice->etd->format('d-m-y') : '' }} / {{ $invoice->eta ? $invoice->eta->format('d-m-y') : '' }}<br>
                CONTAINER No. :{{ $invoice->container_no ?? '' }}
            </div>
        </div>

        <!-- Items Section -->
        <div class="items-section">
            <div class="items-header">
                DESCRIPTRION&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;QTY&nbsp;&nbsp;UNIT&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;RATE&nbsp;&nbsp;CUR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;AMOUNT
            </div>
            @foreach($invoice->items as $item)
            <div class="item-row">
                {{ str_pad(strtoupper($item->description), 45, ' ', STR_PAD_RIGHT) }} {{ str_pad(number_format($item->quantity, 0), 3, ' ', STR_PAD_LEFT) }} {{ str_pad(strtoupper($item->unit), 8, ' ', STR_PAD_RIGHT) }} {{ str_pad(number_format($item->rate, 2), 12, ' ', STR_PAD_LEFT) }} {{ str_pad($item->currency, 4, ' ', STR_PAD_RIGHT) }} {{ str_pad($item->amount == 0 ? '-' : number_format($item->amount, 2), 15, ' ', STR_PAD_LEFT) }}
            </div>
            @endforeach
        </div>

        <!-- Bank and Totals Section -->
        <div class="bank-totals-section clearfix">
            <div class="bank-left">
                BANK NAME : Mandiri<br>
                BANK NUMBER : 122-00-12330539<br>
                ACCOUNT NAME : Eshaka Wijaya Logistics<br>
                SWIFT CODE : BMRIIDJA<br>
                ADDRESS : KCP JAKARTA R.S.C.M<br>
                <br>
                BANK NAME : BCA<br>
                BANK NUMBER : 5445-974 975<br>
                ACCOUNT NAME : Eshaka Wijaya Logistics<br>
                SWIFT CODE : CENAIDJAXXX<br>
                ADDRESS : KCP CITRA 2 EXT
            </div>

            <div class="totals-right">
                <div class="subtotal-line">SUB TOTAL {{ number_format($invoice->subtotal, 2) }}</div>
                <br>
                <div class="total-line">TOTAL {{ number_format($invoice->total, 2) }}</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            This is system generated document, No signature is required<br><br>
            Ruko AEROHUB Citra 8 ,C7-10, Kel Pegadungan, Kec Kalideres,<br>
            Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11830
        </div>
    </div>
</body>
</html>
