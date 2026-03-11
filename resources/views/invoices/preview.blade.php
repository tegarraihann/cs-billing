<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Preview - {{ $invoice->invoice_number }}</title>
    <style>
        body {
            font-family: courier, monospace;
            font-size: 9px;
            line-height: 1.15;
            margin: 15mm 12mm 15mm 12mm;
            padding: 0;
            color: #000;
            font-weight: normal;
            background: #f5f5f5;
        }

        .preview-container {
            background: white;
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            position: relative;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            padding: 15mm 12mm;
            box-sizing: border-box;
        }

        .container {
            width: 100%;
            position: relative;
            height: 100%;
        }

        /* Company Logo - Top Right */
        .logo-section {
            position: absolute;
            top: 35px;
            right: 3cm;
            width: 150px;
            text-align: center;
        }

        .logo-image {
            width: auto;
            height: 80px;
            margin: 0 auto 3px;
            display: block;
            max-width: 100%;
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
            left: 50px;
            top: 167px;
            font-size: 12px;
        }

        .debit-note-header {
            position: absolute;
            right: 170px;
            top: 160px;
            font-size: 25px;
            font-weight: bold;
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
            font-size: 15px;
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
            font-size: 13px;
            margin-bottom: 1px;
            display: flex;
            justify-content: flex-start;
        }

        .invoice-label {
            width: 70px;
            display: inline-block;
            font-size: 14px;
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
            font-size: 13px;
            line-height: 1.25;
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

        /* Container Numbers Section - Positioned at same level as No. OF PKGS */
        .container-section {
            position: absolute;
            top: 430px; /* Same level as No. OF PKGS row */
            left: 0;
            width: 100%;
            height: 50px;
        }

        .container-right {
            position: absolute;
            right: 40px;
            top: 0;
            width: 280px;
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
            margin-bottom: 10px;
        }

        .bank-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
        }

        .bank-table td {
            padding: 3px 6px;
            vertical-align: top;
        }

        .bank-table td.label {
            width: 105px;
            font-weight: bold;
            white-space: nowrap;
        }

        .bank-table td.value {
            width: auto;
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
            font-size: 10px;
            font-weight: bold;
            margin-top: 5px;
            text-align: center;
        }

        /* Preview specific styles */
        .preview-header {
            background: #333;
            color: white;
            padding: 10px;
            text-align: center;
            margin-bottom: 20px;
            border-radius: 4px;
        }

        .preview-actions {
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 1000;
        }

        .btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            text-decoration: none;
            display: inline-block;
            margin-left: 5px;
            font-size: 12px;
        }

        .btn:hover {
            background: #0056b3;
        }

        .btn-success {
            background: #28a745;
        }

        .btn-success:hover {
            background: #1e7e34;
        }

        .btn-primary {
            background: #007bff;
            color: white;
            border: 1px solid #007bff;
        }

        .btn-primary:hover {
            background: #0056b3;
        }
    </style>
</head>
<body>
    <div class="preview-actions">
        <a href="{{ route('admin-keuangan.invoices.pdf', $invoice) }}" class="btn btn-success" target="_blank">Download Invoice</a>
        <button onclick="printInvoice()" class="btn btn-primary">Print Invoice</button>
        <a href="{{ route('admin-keuangan.invoices.show', $invoice) }}" class="btn">Back to Invoice</a>
    </div>

    <script>
        function printInvoice() {
            // Create hidden iframe to load and print the content
            const iframe = document.createElement('iframe');
            iframe.style.position = 'absolute';
            iframe.style.top = '-1000px';
            iframe.style.left = '-1000px';
            iframe.style.width = '0';
            iframe.style.height = '0';
            iframe.style.border = 'none';

            document.body.appendChild(iframe);

            // Load the invoice print content (HTML version)
            iframe.src = '{{ route("admin-keuangan.invoices.print", $invoice) }}';

            iframe.onload = function() {
                setTimeout(function() {
                    try {
                        // Focus on iframe and trigger print
                        iframe.contentWindow.focus();
                        iframe.contentWindow.print();

                        // Clean up iframe after printing
                        setTimeout(function() {
                            document.body.removeChild(iframe);
                        }, 1000);
                    } catch (e) {
                        // Fallback: open in new window if iframe print fails
                        window.open('{{ route("admin-keuangan.invoices.pdf", $invoice) }}', '_blank');
                        document.body.removeChild(iframe);
                    }
                }, 500);
            };
        }
    </script>

    <div class="preview-header">
        <h3>Invoice Preview - {{ $invoice->invoice_number }}</h3>
        <small>This is how your PDF will look. Use this for quick modifications without exporting PDF repeatedly.</small>
    </div>

    <div class="preview-container">
        <div class="container">
            @php
                $logoFile = public_path('images/logo/logo.png');
                $logoBase64 = null;
                if (is_file($logoFile) && is_readable($logoFile)) {
                    $logoBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($logoFile));
                }
            @endphp
            <!-- Company Logo -->
            <div class="logo-section">
                @if($logoBase64)
                    <img src="{{ $logoBase64 }}" alt="Eshaka Wijaya Logistics" class="logo-image">
                @else
                    <span class="logo-text">ESHAKA WIJAYA LOGISTICS</span>
                @endif
            </div>

            <!-- Top Header Line -->
            <div class="top-line">
                <div class="customer-code">CUSTOMER CODE :{{ $invoice->customer->customer_code ?? '-' }}</div>
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
                        <span class="field-label">VOLUME</span> :{{ $invoice->volume ?? '-' }}
                    </div>
                    <div class="shipment-row">
                        <span class="field-label">No. OF PKGS</span> :{{ $invoice->no_of_packages ? $invoice->no_of_packages . ' BAG' : '2760 BAG' }}
                    </div>
                    <div class="shipment-row">
                        <span class="field-label">20'/40'/45'</span> :{{ $invoice->party_lcl ?? $invoice->salesOrder->party_lcl ?? '-' }}
                    </div>
                    @php
                        $containerDisplay = blank($invoice->container_no) ? ($invoice->salesOrder->container_no ?? null) : $invoice->container_no;
                    @endphp
                    @if($containerDisplay)
                    <div class="container-numbers">
                        @php
                            $containers = is_array($containerDisplay) ? $containerDisplay : explode("\n", str_replace(',', "\n", (string) $containerDisplay));
                        @endphp
                        @foreach($containers as $container)
                            @if(trim($container))
                                -[{{ trim($container) }}]<br>
                            @endif
                        @endforeach
                    </div>
                    @else
                    <div class="container-numbers">
                        -[MSKU2934199]<br>
                        -[MSKU5012720]<br>
                        -[MSKU3839977]
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
                </div>
            </div>

            <!-- Container Numbers Section - Positioned at same level as No. OF PKGS -->
            <div class="container-section">
                <div class="container-right">
                    <div class="shipment-row">
                        <span class="field-label-right">CONTAINER No.</span> :
                        @if($containerDisplay)
                            @php
                                $containers = is_array($containerDisplay) ? $containerDisplay : explode("\n", str_replace(',', "\n", (string) $containerDisplay));
                            @endphp
                            @foreach($containers as $index => $container)
                                @if(trim($container))
                                    {{ $index > 0 ? '<br>' : '' }}-[{{ trim($container) }}]
                                @endif
                            @endforeach
                        @else
                            -[MSKU2934199]
                        @endif
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
                        <table class="bank-table">
                            <tr><td class="label">BANK NAME</td><td class="value">Mandiri</td></tr>
                            <tr><td class="label">BRANCH</td><td class="value">KCP JAKARTA R.S.C.M</td></tr>
                            <tr><td class="label">ACCOUNT NAME</td><td class="value">Eshaka Wijaya Logistics</td></tr>
                            <tr><td class="label">ACCOUNT NO.</td><td class="value">122-00-12330539</td></tr>
                            <tr><td class="label">SWIFT CODE</td><td class="value">BMRIIDJA</td></tr>
                        </table>
                    </div>
                    <div class="bank-block">
                        <table class="bank-table">
                            <tr><td class="label">BANK NAME</td><td class="value">BCA</td></tr>
                            <tr><td class="label">BRANCH</td><td class="value">KCP CITRA 2 EXT</td></tr>
                            <tr><td class="label">ACCOUNT NAME</td><td class="value">Eshaka Wijaya Logistics</td></tr>
                            <tr><td class="label">ACCOUNT NO.</td><td class="value">5445-974 975</td></tr>
                            <tr><td class="label">SWIFT CODE</td><td class="value">CENAIDJAXXX</td></tr>
                        </table>
                    </div>
                </div>

                  <div class="totals-section">
                      <div class="subtotal-line">SUB TOTAL {{ number_format($invoice->subtotal ?? $invoice->total ?? 2289828, 2) }}</div>
                      @if(($invoice->vat_amount ?? 0) > 0)
                      <div style="height: 4px;"></div>
                      <div class="subtotal-line">
                          VAT {{ rtrim(rtrim(number_format($invoice->vat_rate ?? 0, 2, '.', ''), '0'), '.') }}% {{ number_format($invoice->vat_amount ?? 0, 2) }}
                      </div>
                      @endif
                      @if($invoice->hasDownPayment())
                      <div style="height: 4px;"></div>
                      <div class="subtotal-line">DOWN PAYMENT (-) {{ number_format($invoice->down_payment_amount, 2) }}</div>
                      @endif
                    <div style="height: 8px;"></div>
                    <div class="total-line">TOTAL {{ number_format($invoice->total ?? 2289828, 2) }}</div>
                </div>
            </div>

            <!-- Footer -->
            {{-- <div class="footer">
                <div class="footer-disclaimer">This is system generated document, No signature is required</div>
                <div class="footer-address">
                    Ruko AEROHUB Citra 8 ,C7-10, Kel Pegadungan, Kec Kalideres,<br>
                    Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11830
                </div>
            </div> --}}
        </div>
    </div>
</body>
</html>
