<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title><?php echo e($invoice->invoice_number); ?></title>
    <style>
        @page {
            margin: 0.83in 0.89in 1.39in 0.89in;
            size: A4 portrait;
        }

        body {
            font-family: courier, monospace;
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
    <?php
        $logoFile = public_path('images/logo/logo.png');
        $logoBase64 = null;
        if (is_file($logoFile) && is_readable($logoFile)) {
            $logoBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($logoFile));
        }
    ?>
    <div class="container">
        <!-- Company Logo -->
        <div class="logo-section">
            <?php if($logoBase64): ?>
                <img src="<?php echo e($logoBase64); ?>" alt="Eshaka Wijaya Logistics" class="logo-image">
            <?php else: ?>
                <span class="logo-text">ESHAKA WIJAYA LOGISTICS</span>
            <?php endif; ?>
            
        </div>

        <!-- Top Header Line -->
        <div class="top-line">
            <div class="customer-code">CUSTOMER CODE :<?php echo e($invoice->customer->customer_code ?? 'CPP-MRS79'); ?></div>
            <div class="debit-note-header">
                DEBIT NOTE
                <br>
                <div class="status-label">
                    <?php echo e($invoice->status === 'draft' ? 'PREVIEW' : 'ORIGINAL'); ?>

                </div>
            </div>
        </div>

        <!-- Customer Information -->
        <div class="customer-info">
            <div class="customer-name"><?php echo e(strtoupper($invoice->customer->company_name ?? $invoice->salesOrder->customer ?? 'PT CITRA PERDANA PUTRA')); ?></div>
            <div class="customer-address"><?php echo e(strtoupper($invoice->customer->company_address ?? $invoice->customer->invoice_address ?? 'KO. CITY PARK BLOK L NO.11 CENGKARENG')); ?><br><?php echo e(strtoupper($invoice->customer->city ?? 'JAKARTA BARAT')); ?> <?php echo e($invoice->customer->postal_code ?? '11730'); ?></div>
        </div>

        <!-- Invoice Details -->
        <div class="invoice-details">
            <div class="invoice-row">
                <span class="invoice-label">INV DATE</span> :<?php echo e($invoice->invoice_date->format('d-m-Y')); ?>

            </div>
            <div style="height: 8px;"></div>
            <div class="invoice-row">
                <span class="invoice-label">TERM</span> :<?php echo e($invoice->term_days); ?> DAYS
            </div>
            <div class="invoice-row">
                <span class="invoice-label">INV No.</span> :<?php echo e($invoice->invoice_number); ?>

            </div>
            <div class="invoice-row">
                <span class="invoice-label">AJU No.</span> :<?php echo e($invoice->salesOrder->aju ?? '0173'); ?>

            </div>
        </div>

        <!-- Center Title -->
        

        <!-- Shipment Details -->
        <div class="shipment-section">
            <div class="shipment-left">
                <div class="shipment-row">
                    <span class="field-label">SHIPPER</span> :<?php echo e(strtoupper($invoice->shipper ?? $invoice->salesOrder->shipper ?? 'INNER MONGOLIA EPPEN BIOTECH')); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label">CONSIGNEE</span> :<?php echo e(strtoupper($invoice->consignee ?? $invoice->customer->company_name ?? $invoice->salesOrder->customer ?? 'PT CITRA PERDANA PUTRA')); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label">AWB/BL No.</span> :<?php echo e($invoice->awb_bl_no ?? $invoice->salesOrder->bl_awb ?? '285517558'); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label">MAWB/OBL No.</span> :<?php echo e($invoice->mawb_obl_no ?? '-'); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label">GROSS WT</span> :<?php echo e($invoice->gross_weight ? number_format($invoice->gross_weight, 4) . 'KGS' : '69276,0000KGS'); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label">NETT WT</span> :<?php echo e($invoice->net_weight ? number_format($invoice->net_weight, 4) . 'KGS' : ($invoice->salesOrder->net_weight ? number_format($invoice->salesOrder->net_weight, 4) . 'KGS' : '-')); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label">VOLUME</span> :<?php echo e($invoice->volume ?? '-'); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label">No. OF PKGS</span> :<?php echo e($invoice->no_of_packages ? $invoice->no_of_packages . ' ' . strtoupper($invoice->package_unit ?? $invoice->salesOrder->package_unit ?? 'BAG') : '2760 BAG'); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label">20'/40'/45'</span> :<?php echo e($invoice->party_lcl ?? $invoice->salesOrder->party_lcl ?? '-'); ?>

                </div>
                <?php if($invoice->salesOrder->container_no ?? null): ?>
                <div class="container-numbers">
                    <?php
                        $containerNo = $invoice->salesOrder->container_no;
                        $containers = is_array($containerNo) ? $containerNo : explode("\n", str_replace(',', "\n", $containerNo));
                    ?>
                    <?php $__currentLoopData = $containers; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $container): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <?php if(trim($container)): ?>
                            :<?php echo e(trim($container)); ?><br>
                        <?php endif; ?>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
                <?php else: ?>
                <div class="container-numbers">
                    :MSKU2934199<br>
                    :MSKU5012720<br>
                    :MSKU3839977
                </div>
                <?php endif; ?>
                <div style="height: 8px;"></div>
                <div class="shipment-row">
                    <span class="field-label">REMARKS</span> :<?php echo e($invoice->remarks ?? '-'); ?>

                </div>
            </div>

            <div class="shipment-right">
                <div class="shipment-row">
                    <span class="field-label-right">VESSEL</span> :<?php echo e(strtoupper($invoice->vessel ?? $invoice->salesOrder->vessel ?? 'HOLSATIA')); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label-right">FLIGHT/VOY</span> :<?php echo e($invoice->flight_voy ?? '507S'); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label-right">POL / POD</span> :<?php echo e(strtoupper($invoice->pol_pod ?? ($invoice->salesOrder->pol ?? 'XINGANG') . ' / ' . ($invoice->salesOrder->pod ?? 'SEMARANG'))); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label-right">ORIGIN</span> :<?php echo e(strtoupper($invoice->origin ?? ($invoice->salesOrder->pol ?? 'XINGANG') . ' , CHINA')); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label-right">DEST</span> :<?php echo e(strtoupper($invoice->destination ?? $invoice->salesOrder->pod ?? 'SEMARANG')); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label-right">ETD / ETA</span> :<?php echo e(isset($invoice->etd) ? $invoice->etd->format('d-m-Y') : '14-02-2025'); ?> / <?php echo e(isset($invoice->eta) ? $invoice->eta->format('d-m-Y') : ($invoice->salesOrder->eta ? $invoice->salesOrder->eta->format('d-m-Y') : '06-05-2025')); ?>

                </div>
                <div class="shipment-row">
                    <span class="field-label-right">CONTAINER No.</span> :<?php echo e($invoice->container_no ?? 'MSKU2934199'); ?>

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
                    <?php $__empty_1 = true; $__currentLoopData = $invoice->items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); $__empty_1 = false; ?>
                    <tr>
                        <td class="desc-col"><?php echo e(strtoupper($item->description)); ?></td>
                        <td class="qty-col"><?php echo e(number_format($item->quantity, 0)); ?></td>
                        <td class="unit-col"><?php echo e(strtoupper($item->unit)); ?></td>
                        <td class="rate-col"><?php echo e(number_format($item->rate, 2)); ?></td>
                        <td class="cur-col"><?php echo e($item->currency); ?></td>
                        <td class="amount-col"><?php echo e($item->amount == 0 ? '-' : number_format($item->amount, 2)); ?></td>
                    </tr>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); if ($__empty_1): ?>
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
                    <?php endif; ?>
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
                <div class="subtotal-line">SUB TOTAL <?php echo e(number_format($invoice->subtotal ?? $invoice->total ?? 2289828, 2)); ?></div>
                <?php if(($invoice->vat_amount ?? 0) > 0): ?>
                <div style="height: 4px;"></div>
                <div class="subtotal-line">
                    VAT <?php echo e(rtrim(rtrim(number_format($invoice->vat_rate ?? 0, 2, '.', ''), '0'), '.')); ?>% <?php echo e(number_format($invoice->vat_amount ?? 0, 2)); ?>

                </div>
                <?php endif; ?>
                <?php if($invoice->hasDownPayment()): ?>
                <div style="height: 4px;"></div>
                <div class="subtotal-line">DOWN PAYMENT (-) <?php echo e(number_format($invoice->down_payment_amount, 2)); ?></div>
                <?php endif; ?>
                <div style="height: 8px;"></div>
                <div class="total-line">TOTAL <?php echo e(number_format($invoice->total ?? 2289828, 2)); ?></div>
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-disclaimer">This is system generated document, No signature is required</div>
            <div class="footer-disclaimer">Dicetak pada: <?php echo e($generatedAt->format('d/m/Y H:i:s')); ?></div>
            <div class="footer-address">
                Ruko AEROHUB Citra 8 ,C7-10, Kel Pegadungan, Kec Kalideres,<br>
                Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11830
            </div>
        </div>
    </div>
</body>
</html>
<?php /**PATH C:\laragon\www\OfficeManagement\resources\views\invoices\print.blade.php ENDPATH**/ ?>