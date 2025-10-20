<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{ $invoice->invoice_number }}</title>
    <style>
        @page {
            margin: 0.83in 0.89in 1.39in 0.89in;
            size: A4 portrait;
        }

        body {
            font-family: 'Courier New', monospace;
            font-size: 9px;
            line-height: 1.15;
            margin: 0;
            padding: 0;
            color: #000;
            font-weight: normal;
        }

        .container {
            width: 100%;
            position: relative;
            height: 100vh;
        }

        /* Company Logo - Top Right */
        .logo-section {
            position: absolute;
            top: 0;
            left: 4.38in;
            right: 0;
            width: 1.48in;
            text-align: left;
        }

        .logo-image {
            width: 1.48in;
            height: 0.83in;
            margin: 0;
            display: block;
        }

        .logo-text {
            font-size: 7px;
            font-weight: bold;
            line-height: 1.1;
            color: #6b8e67;
            letter-spacing: 0.3px;
        }

        .logo-subtitle {
            font-size: 5px;
            font-style: italic;
            color: #888;
            line-height: 1.0;
        }

        /* Top Header - Customer Code and Debit Note */
        .top-line {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 12px;
        }

        .customer-code {
            position: absolute;
            left: 0.09in;
            right: 0;
            top: calc(0.83in + 3 * 7.5px * 1.0);
            font-size: 7.5px;
            line-height: 1.0;
            margin-top: 0.1pt;
            margin-bottom: 0;
        }

        .customer-code::before {
            content: '';
            display: inline-block;
            width: 0.38in;
        }

        .debit-note-header {
            position: absolute;
            right: 170px;
            top: calc(0.83in + 3 * 7.5px * 1.0);
            font-size: 25px;
            font-weight: bold;
            line-height: 1.0;
            tab-size: 0.38in;
        }

        /* Customer Info Section */
        .customer-info {
            position: absolute;
            top: 190px;
            left: 52px;
            width: 250px;
        }

        .customer-name {
            font-weight: bold;
            font-size: 13px;
            margin-bottom: 1px;
        }

        .customer-address {
            font-size: 13px;
            line-height: 1.1;
        }

        /* Invoice Details - Right Side */
        .invoice-details {
            position: absolute;
            top: 200px;
            right: 170px;
            width: 150px;
        }

        .invoice-row {
            font-size: 12%;
            margin-bottom: 1px;
            display: flex;
            justify-content: flex-start;
        }

        .invoice-label {
            width: 70px;
            display: inline-block;
            font-size: 12px;
        }

        /* Center Title - DEBIT NOTE */
        .center-title {
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            text-align: center;
            font-size: 14px;
            font-weight: bold;
            letter-spacing: 8px;
        }

        /* Shipment Details Section */
        .shipment-section {
            position: absolute;
            top: 93px;
            left: 0;
            width: 100%;
            height: 140px;
        }

        .shipment-left {
            position: absolute;
            left: 52px;
            top: 200px;
            width: 280px;
        }

        .shipment-right {
            position: absolute;
            right: 40px;
            top: 200px;
            width: 280px;
        }

        .shipment-row {
            font-size: 12px;
            line-height: 1.5;
            margin-bottom: 0px;
        }

        .field-label {
            display: inline-block;
            width: 95px;
        }

        .field-label-right {
            display: inline-block;
            width: 85px;
        }

        /* Items Table Section */
        .items-section {
            position: absolute;
            top: 500px;
            left: 52px;
            width: 83%;
        }

        .items-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9px;
            font-family: 'Courier New', monospace;
        }

        .items-table th {
            border-top: 1px dashed #000;
            border-bottom: 1px dashed #000;
            border-left: none;
            border-right: none;
            padding: 2px 4px;
            text-align: left;
            font-weight: bold;
            font-size: 12px;
            letter-spacing: 0.5px;
        }

        .items-table td {
            border: none;
            padding: 1px 4px;
            font-size: 11px;
            line-height: 1.25;
        }

        .items-table th.desc-col { width: 5%; text-align: left; }
        .items-table th.qty-col { width: 2%; text-align: center; }
        .items-table th.unit-col { width: 7%; text-align: left; }
        .items-table th.rate-col { width: 3%; text-align: right; }
        .items-table th.cur-col { width: 3%; text-align: left; }
        .items-table th.amount-col { width: 12%; text-align: right; }

        .items-table td.desc-col { text-align: left; }
        .items-table td.qty-col { text-align: center; }
        .items-table td.unit-col { text-align: left; }
        .items-table td.rate-col { text-align: right; }
        .items-table td.cur-col { text-align: left; }
        .items-table td.amount-col { text-align: right; }

        /* Bank Details and Totals */
        .bottom-section {
            position: absolute;
            top: 600px;
            left: 52px;
            width: 100%;
            height: 120px;
        }

        .bank-details {
            position: absolute;
            left: 0;
            top: 0;
            width: 280px;
        }

        .bank-block {
            margin-bottom: 8px;
        }

        .bank-row {
            font-size: 12px;
            line-height: 1.15;
        }

        .totals-section {
            position: absolute;
            right: 120px;
            top: 0;
            width: 200px;
            text-align: right;
        }

        .subtotal-line {
            border-top: 1px dashed #000;
            padding: 3px 0;
            font-size: 12px;
        }

        .total-line {
            border-top: 1px dashed #000;
            border-bottom: 1px dashed #000;
            padding: 3px 0;
            font-size: 12px;
            font-weight: bold;
        }

        /* Footer */
        .footer {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            font-size: 7px;
            line-height: 1.2;
            text-align: center;
        }

        .footer-disclaimer {
            margin-bottom: 8px;
        }

        .footer-address {
            line-height: 1.1;
        }

        /* Container No. Multi-line handling */
        .container-numbers {
            margin-left: 95px;
            font-size: 9px;
            line-height: 1.25;
        }

        /* Status label styles */
        .status-label {
            display: inline-block;
            padding: 2px 8px;
            border: 1px solid #000;
            font-size: 8px;
            font-weight: bold;
            margin-top: 3px;
            text-align: center;
        }
    </style>
</head>
<body>
    <script>
        // Auto trigger print dialog when page loads
        window.onload = function() {
            window.print();
        };
    </script>
    <div class="container">
        <!-- Company Logo -->
        <div class="logo-section">
            <img src="{{ public_path('images/logo/logo.png') }}" alt="Eshaka Wijaya Logistics" class="logo-image">
            {{-- <div class="logo-text">ESHAKA WIJAYA LOGISTICS</div>
            <div class="logo-subtitle">International Freight Forwarder</div> --}}
        </div>

        <!-- Top Header Line -->
        <div class="top-line">
            <div class="customer-code">CUSTOMER CODE :{{ $invoice->customer->customer_code ?? 'CPP-MRS79' }}</div>
            <div class="debit-note-header">
                DEBIT NOTE
                <br>
                <div class="status-label">
                    {{ $invoice->status === 'draft' ? 'PREVIEW' : 'ORIGINAL' }}
                </div>
            </div>
        </div>

        <!-- Customer Information -->
        <div class="customer-info">
            <div class="customer-name">{{ strtoupper($invoice->customer->company_name ?? $invoice->salesOrder->customer ?? 'PT CITRA PERDANA PUTRA') }}</div>
            <div class="customer-address">{{ strtoupper($invoice->customer->company_address ?? $invoice->customer->invoice_address ?? 'KO. CITY PARK BLOK L NO.11 CENGKARENG') }}<br>{{ strtoupper($invoice->customer->city ?? 'JAKARTA BARAT') }} {{ $invoice->customer->postal_code ?? '11730' }}</div>
        </div>

        <!-- Invoice Details -->
        <div class="invoice-details">
            <div class="invoice-row">
                <span class="invoice-label">INV DATE</span> :{{ $invoice->invoice_date->format('d-m-Y') }}
            </div>
            <div style="height: 8px;"></div>
            <div class="invoice-row">
                <span class="invoice-label">TERM</span> :{{ $invoice->term_days }} DAYS
            </div>
            <div class="invoice-row">
                <span class="invoice-label">INV No.</span> :{{ $invoice->invoice_number }}
            </div>
            <div class="invoice-row">
                <span class="invoice-label">AJU No.</span> :{{ $invoice->salesOrder->aju ?? '0173' }}
            </div>
        </div>

        <!-- Center Title -->
        {{-- <div class="center-title">DEBIT NOTE</div> --}}

        <!-- Shipment Details -->
        <div class="shipment-section">
            <div class="shipment-left">
                <div class="shipment-row">
                    <span class="field-label">SHIPPER</span> :{{ strtoupper($invoice->shipper ?? $invoice->salesOrder->shipper ?? 'INNER MONGOLIA EPPEN BIOTECH') }}
                </div>
                <div class="shipment-row">
                    <span class="field-label">CONSIGNEE</span> :{{ strtoupper($invoice->consignee ?? $invoice->customer->company_name ?? $invoice->salesOrder->customer ?? 'PT CITRA PERDANA PUTRA') }}
                </div>
                <div class="shipment-row">
                    <span class="field-label">AWB/BL No.</span> :{{ $invoice->awb_bl_no ?? $invoice->salesOrder->bl_awb ?? '285517558' }}
                </div>
                <div class="shipment-row">
                    <span class="field-label">MAWB/OBL No.</span> :{{ $invoice->mawb_obl_no ?? '-' }}
                </div>
                <div class="shipment-row">
                    <span class="field-label">GROSS WT</span> :{{ $invoice->gross_weight ? number_format($invoice->gross_weight, 4) . 'KGS' : '69276,0000KGS' }}
                </div>
                <div class="shipment-row">
                    <span class="field-label">NETT WT</span> :{{ $invoice->net_weight ? number_format($invoice->net_weight, 4) . 'KGS' : ($invoice->salesOrder->net_weight ? number_format($invoice->salesOrder->net_weight, 4) . 'KGS' : '-') }}
                </div>
                <div class="shipment-row">
                    <span class="field-label">VOLUME</span> :{{ $invoice->volume ?? '-' }}
                </div>
                <div class="shipment-row">
                    <span class="field-label">No. OF PKGS</span> :{{ $invoice->no_of_packages ? $invoice->no_of_packages . ' ' . strtoupper($invoice->package_unit ?? $invoice->salesOrder->package_unit ?? 'BAG') : '2760 BAG' }}
                </div>
                <div class="shipment-row">
                    <span class="field-label">20'/40'/45'</span> :{{ $invoice->container_size ?? '3X20' }}
                </div>
                @if($invoice->salesOrder->container_no ?? null)
                <div class="container-numbers">
                    @php
                        $containerNo = $invoice->salesOrder->container_no;
                        $containers = is_array($containerNo) ? $containerNo : explode("\n", str_replace(',', "\n", $containerNo));
                    @endphp
                    @foreach($containers as $container)
                        @if(trim($container))
                            :{{ trim($container) }}<br>
                        @endif
                    @endforeach
                </div>
                @else
                <div class="container-numbers">
                    :MSKU2934199<br>
                    :MSKU5012720<br>
                    :MSKU3839977
                </div>
                @endif
                <div style="height: 8px;"></div>
                <div class="shipment-row">
                    <span class="field-label">REMARKS</span> :{{ $invoice->remarks ?? '-' }}
                </div>
            </div>

            <div class="shipment-right">
                <div class="shipment-row">
                    <span class="field-label-right">VESSEL</span> :{{ strtoupper($invoice->vessel ?? $invoice->salesOrder->vessel ?? 'HOLSATIA') }}
                </div>
                <div class="shipment-row">
                    <span class="field-label-right">FLIGHT/VOY</span> :{{ $invoice->flight_voy ?? '507S' }}
                </div>
                <div class="shipment-row">
                    <span class="field-label-right">POL / POD</span> :{{ strtoupper($invoice->pol_pod ?? ($invoice->salesOrder->pol ?? 'XINGANG') . ' / ' . ($invoice->salesOrder->pod ?? 'SEMARANG')) }}
                </div>
                <div class="shipment-row">
                    <span class="field-label-right">ORIGIN</span> :{{ strtoupper($invoice->origin ?? ($invoice->salesOrder->pol ?? 'XINGANG') . ' , CHINA') }}
                </div>
                <div class="shipment-row">
                    <span class="field-label-right">DEST</span> :{{ strtoupper($invoice->destination ?? $invoice->salesOrder->pod ?? 'SEMARANG') }}
                </div>
                <div class="shipment-row">
                    <span class="field-label-right">ETD / ETA</span> :{{ isset($invoice->etd) ? $invoice->etd->format('d-m-Y') : '14-02-2025' }} / {{ isset($invoice->eta) ? $invoice->eta->format('d-m-Y') : ($invoice->salesOrder->eta ? $invoice->salesOrder->eta->format('d-m-Y') : '06-05-2025') }}
                </div>
                <div class="shipment-row">
                    <span class="field-label-right">CONTAINER No.</span> :{{ $invoice->container_no ?? 'MSKU2934199' }}
                </div>
            </div>
        </div>

        <!-- Items Section -->
        <div class="items-section">
            <table class="items-table">
                <thead>
                    <tr>
                        <th class="desc-col">DESCRIPTRION</th>
                        <th class="qty-col">QTY</th>
                        <th class="unit-col">UNIT</th>
                        <th class="rate-col">RATE</th>
                        <th class="cur-col">CUR</th>
                        <th class="amount-col">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    @forelse($invoice->items as $item)
                    <tr>
                        <td class="desc-col">{{ strtoupper($item->description) }}</td>
                        <td class="qty-col">{{ number_format($item->quantity, 0) }}</td>
                        <td class="unit-col">{{ strtoupper($item->unit) }}</td>
                        <td class="rate-col">{{ number_format($item->rate, 2) }}</td>
                        <td class="cur-col">{{ $item->currency }}</td>
                        <td class="amount-col">{{ $item->amount == 0 ? '-' : number_format($item->amount, 2) }}</td>
                    </tr>
                    @empty
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
                    @endforelse
                </tbody>
            </table>
        </div>

        <!-- Bank Details and Totals -->
        <div class="bottom-section">
            <div class="bank-details">
                <div class="bank-block">
                    <div class="bank-row">BANK NAME : Mandiri</div>
                    <div class="bank-row">BANK NUMBER : 122-00-12330539</div>
                    <div class="bank-row">ACCOUNT NAME : Eshaka Wijaya Logistics</div>
                    <div class="bank-row">SWIFT CODE : BMRIIDJA</div>
                    <div class="bank-row">ADDRESS : KCP JAKARTA R.S.C.M</div>
                </div>
                <div class="bank-block">
                    <div class="bank-row">BANK NAME : BCA</div>
                    <div class="bank-row">BANK NUMBER : 5445-974 975</div>
                    <div class="bank-row">ACCOUNT NAME : Eshaka Wijaya Logistics</div>
                    <div class="bank-row">SWIFT CODE : CENAIDJAXXX</div>
                    <div class="bank-row">ADDRESS : KCP CITRA 2 EXT</div>
                </div>
            </div>

            <div class="totals-section">
                <div class="subtotal-line">SUB TOTAL {{ number_format($invoice->subtotal ?? $invoice->total ?? 2289828, 2) }}</div>
                @if($invoice->hasDownPayment())
                <div style="height: 4px;"></div>
                <div class="subtotal-line">DOWN PAYMENT (-) {{ number_format($invoice->down_payment_amount, 2) }}</div>
                @endif
                <div style="height: 8px;"></div>
                <div class="total-line">TOTAL {{ number_format($invoice->total ?? 2289828, 2) }}</div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-disclaimer">This is system generated document, No signature is required</div>
            <div class="footer-disclaimer">Dicetak pada: {{ $generatedAt->format('d/m/Y H:i:s') }}</div>
            <div class="footer-address">
                Ruko AEROHUB Citra 8 ,C7-10, Kel Pegadungan, Kec Kalideres,<br>
                Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11830
            </div>
        </div>
    </div>
</body>
</html>
