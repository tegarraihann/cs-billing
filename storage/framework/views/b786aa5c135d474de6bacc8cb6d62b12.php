<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title><?php echo e($invoice->invoice_number); ?></title>
    <style>
        @page {
            size: A4;
            margin: 20mm 15mm;
        }

        body {
            font-family: courier, monospace;
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
            right: 6mm;
            width: 100px;
            text-align: center;
        }

        .logo-image {
            width: 120px;
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
            font-size: 11pt;
        }

        .customer-code {
            float: left;
        }

        .debit-note-title {
            float: right;
            font-size: 22pt;
            font-weight: bold;
            letter-spacing: 8px;
        }

        .clear {
            clear: both;
        }

        /* Company name - bold and big */
        .company-name {
            font-size: 13pt;
            font-weight: bold;
            text-transform: uppercase;
            margin: 8px 0 2px 0;
        }

        /* Address line */
        .company-address {
            font-size: 10pt;
            text-transform: uppercase;
            margin-bottom: 15px;
        }

        /* Invoice details table - right aligned like example */
        .invoice-details-table {
            float: right;
            width: 180px;
            margin-bottom: 15px;
            font-size: 10pt;
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
            font-size: 10pt;
            border-collapse: collapse;
        }

        .shipment-table td {
            padding: 1px 0;
            vertical-align: top;
            line-height: 1.1;
        }

        .ship-label {
            width: 100px;
            font-weight: bold;
        }

        .ship-colon {
            width: 10px;
        }

        .ship-value {
            width: 250px;
            text-transform: uppercase;
        }

        .ship-label-right {
            width: 130px;
            font-weight: bold;
            padding-left: 20px;
            text-indent: 40px;
        }

        .ship-colon-right {
            width: 0px;
        }

        .ship-value-right {
            text-transform: uppercase;
            text-indent: 10px;
        }

        /* Items table exactly like example */
        .items-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10pt;
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
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        /* Remove any extra spacing */
        .no-margin {
            margin: 0;
            padding: 0;
        }

        /* Status label styles - watermark appearance like the reference */
        .status-label {
            display: inline-block;
            padding: 4px 12px;
            border: 2px solid #000;
            font-size: 10pt;
            font-weight: bold;
            margin-top: 5px;
            text-align: center;
            color: #000;
            background-color: #fff;
            letter-spacing: 1px;
        }

        /* Large watermark background text */
        .container::before {
            content: attr(data-status);
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 120pt;
            font-weight: bold;
            color: rgba(80, 80, 80, 0.28);
            z-index: -1;
            pointer-events: none;
            white-space: nowrap;
        }

        /* Bank Totals Table Layout */
        .bank-totals-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 8pt;
            margin-top: 20px;
        }

        .bank-totals-table td {
            padding: 2px 4px;
            vertical-align: top;
            line-height: 1.2;
        }

        .bank-label-col {
            width: 15%;
            font-weight: bold;
        }

        .bank-value-col {
            width: 35%;
        }

        .total-label-col {
            font-size: 10pt;
            width: 20%;
            text-align: right;
            padding-right: 10px;
        }

        .total-value-col {
            font-size: 10pt;
            width: 30%;
            text-align: right;
        }

        .total-bold {
            font-weight: bold;
            border-top: 1px solid #000;
            border-bottom: 1px solid #000;
        }

        .invoice-notes {
            font-size: 7pt;
            margin: 18px 0;
            line-height: 1.4;
            text-transform: none;
            max-width: 100%;
            margin-left: 0px;
            margin-top: 90px;
            text-align: justify;
        }

        /* Invoice Footer */
        .page-footer {
            position: fixed;
            bottom: 10mm;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 7pt;
            line-height: 1.3;
        }

        /* Shipment Details Table Layout for proper alignment */
        .shipment-details-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 8.5pt;
            margin-bottom: 15px;
        }

        .shipment-details-table td {
            padding: 1px 0;
            vertical-align: top;
            line-height: 1.1;
        }

        .shipment-label-cell {
            width: 90px;
            font-weight: bold;
        }

        .shipment-value-cell {
            width: 200px;
            text-transform: uppercase;
        }

        .invoice-label-cell {
            width: 80px;
            font-weight: bold;
            padding-left: 20px;
        }

        .invoice-value-cell {
            text-transform: uppercase;
        }

        /* Container Numbers Layout */
        .container-details-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 8.5pt;
            margin-top: -15px;
        }

        .container-details-table td {
            padding: 1px 0;
            vertical-align: top;
            line-height: 1.1;
        }

        .container-label-cell {
            width: 90px;
            font-weight: bold;
        }

        .container-value-cell {
            text-transform: uppercase;
        }
    </style>
</head>

<body>
    <?php
        $logoFile = public_path('images/logo/logo.png');
        $logoBase64 = null;
        if (is_file($logoFile) && is_readable($logoFile)) {
            $logoBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($logoFile));
        }
    ?>
    <div class="container" data-status="<?php echo e($invoice->status === 'draft' ? 'PREVIEW' : 'ORIGINAL'); ?>">
        <!-- Company Logo positioned exactly like example -->
        <div class="logo-section">
            <?php if($logoBase64): ?>
                <img src="<?php echo e($logoBase64); ?>" alt="Eshaka Wijaya Logistics" class="logo-image">
            <?php else: ?>
                <span class="logo-text">ESHAKA WIJAYA LOGISTICS</span>
            <?php endif; ?>
        </div>

        <!-- Header line with CUSTOMER CODE and DEBIT NOTE -->
        <div class="header-line">
            <span class="customer-code">CUSTOMER CODE :<?php echo e($invoice->customer->customer_code ?? '-'); ?></span>
            <span class="debit-note-title">
                INVOICE
            </span>
            <div class="clear"></div>
        </div>

        <!-- Company Name -->
        <div class="company-name">
            <?php echo e(strtoupper($invoice->customer->company_name ?? $invoice->salesOrder->customer ?? '-')); ?>

        </div>

        <!-- Company Address -->
        <div class="company-address">
            <?php echo e(strtoupper($invoice->customer->invoice_address ?? $invoice->customer->company_address ?? '-')); ?><br>
            <?php echo e(strtoupper(($invoice->customer->city ?? '') . ' ' . ($invoice->customer->postal_code ?? ''))); ?>

        </div>

        <!-- Invoice Details Table (Right Side) -->
        <table class="invoice-details-table">
            <tr>
                <td class="inv-label">INV No.</td>
                <td class="inv-colon">:</td>
                <td class="inv-value"><?php echo e($invoice->invoice_number); ?></td>
            </tr>
            <tr>
                <td class="inv-label">INV DATE</td>
                <td class="inv-colon">:</td>
                <td class="inv-value">
                    <?php
                        $invoiceDate = $invoice->invoice_date;
                        if (is_string($invoiceDate)) {
                            $invoiceDate = \Carbon\Carbon::parse($invoiceDate);
                        }
                    ?>
                    <?php echo e($invoiceDate->format('d-m-Y')); ?>

                </td>
            </tr>
            <tr>
                <td class="inv-label">TERM</td>
                <td class="inv-colon">:</td>
                <td class="inv-value"><?php echo e($invoice->term_days ?? 30); ?> DAYS</td>
            </tr>

            <tr>
                <td class="inv-label">AJU</td>
                <td class="inv-colon">:</td>
                <td class="inv-value">
                    <?php
                        $aju = $invoice->salesOrder->aju ?? '-';
                        if (stripos($aju, 'lorem') !== false)
                            $aju = '-';
                    ?>
                    <?php echo e($aju); ?>

                </td>
            </tr>
        </table>

        <!-- Shipment Details Section -->
        <div class="shipment-section">
            <table class="shipment-table">
                <tr>
                    <td class="ship-label">SHIPPER</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value"><?php echo e(strtoupper($invoice->shipper ?? $invoice->salesOrder->shipper ?? '-')); ?>

                    </td>
                    <td class="ship-label-right">VESSEL</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">
                        <?php echo e(strtoupper($invoice->vessel ?? $invoice->salesOrder->vessel ?? '-')); ?>

                    </td>
                </tr>
                <tr>
                    <td class="ship-label">CONSIGNEE</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value">
                        <?php echo e(strtoupper($invoice->consignee ?? $invoice->customer->company_name ?? $invoice->salesOrder->customer ?? '-')); ?>

                    </td>
                    <td class="ship-label-right">FLIGHT/VOY</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right"><?php echo e($invoice->flight_voy ?? '-'); ?></td>
                </tr>
                <tr>
                    <td class="ship-label">AWB/BL No.</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value"><?php echo e($invoice->awb_bl_no ?? $invoice->salesOrder->bl_awb ?? '-'); ?></td>
                    <td class="ship-label-right">POL / POD</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">
                        <?php
                            $pol = $invoice->salesOrder->pol ?? '-';
                            $pod = $invoice->salesOrder->pod ?? '-';

                            // Filter out Lorem Ipsum dummy data
                            if (stripos($pol, 'lorem') !== false)
                                $pol = '-';
                            if (stripos($pod, 'lorem') !== false)
                                $pod = '-';
                        ?>
                        <?php echo e(strtoupper($pol . ' / ' . $pod)); ?>

                    </td>
                </tr>
                <tr>
                    <td class="ship-label">MAWB/OBL No.</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value"><?php echo e($invoice->mawb_obl_no ?? '-'); ?></td>
                    <td class="ship-label-right">ORIGIN</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">
                        <?php
                            $origin = $invoice->salesOrder->pol ?? '-';
                            if (stripos($origin, 'lorem') !== false)
                                $origin = '-';
                        ?>
                        <?php echo e(strtoupper($origin)); ?>

                    </td>
                </tr>
                <tr>
                    <td class="ship-label">GROSS WT</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value">
                        <?php echo e($invoice->gross_weight ? number_format($invoice->gross_weight, 4) . 'KGS' : '-'); ?>

                    </td>
                    <td class="ship-label-right">DEST</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">
                        <?php
                            $dest = $invoice->salesOrder->pod ?? '-';
                            if (stripos($dest, 'lorem') !== false)
                                $dest = '-';
                        ?>
                        <?php echo e(strtoupper($dest)); ?>

                    </td>
                </tr>
                <tr>
                    <td class="ship-label">NETT WT</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value">
                        <?php echo e($invoice->salesOrder->net_weight ? number_format($invoice->salesOrder->net_weight, 2) . ' KG' : '-'); ?>

                    </td>
                    <td class="ship-label-right">COMMODITY</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">
                        <?php
                            $commodity = $invoice->salesOrder->commodity ?? '-';
                            if (stripos($commodity, 'lorem') !== false)
                                $commodity = '-';
                        ?>
                        <?php echo e(strtoupper($commodity)); ?>

                    </td>
                </tr>
                <tr>
                    <td class="ship-label">VOLUME</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value"><?php echo e($invoice->volume ?? '-'); ?></td>
                    <td class="ship-label-right">ETD / ETA</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">
                        <?php
                            $etd = $invoice->etd ?? $invoice->salesOrder->etd ?? null;
                            $eta = $invoice->eta ?? $invoice->salesOrder->eta ?? null;

                            $etdFormatted = '-';
                            $etaFormatted = '-';

                            if ($etd) {
                                try {
                                    $etdFormatted = is_string($etd) ? \Carbon\Carbon::parse($etd)->format('d-m-y') : $etd->format('d-m-y');
                                } catch (Exception $e) {
                                    $etdFormatted = '-';
                                }
                            }

                            if ($eta) {
                                try {
                                    $etaFormatted = is_string($eta) ? \Carbon\Carbon::parse($eta)->format('d-m-y') : $eta->format('d-m-y');
                                } catch (Exception $e) {
                                    $etaFormatted = '-';
                                }
                            }
                        ?>
                        <?php echo e($etdFormatted); ?> / <?php echo e($etaFormatted); ?>

                    </td>
                </tr>
                <tr>
                    <td class="ship-label">No. OF PKGS</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value">
                        <?php echo e($invoice->no_of_packages ? $invoice->no_of_packages . ' ' . strtoupper($invoice->package_unit ?? $invoice->salesOrder->package_unit ?? 'PCS') : '-'); ?>

                    </td>
                    <td class="ship-label-right">CONTAINER</td>
                    <td class="ship-colon-right">:</td>
                    <td class="ship-value-right">
                        <div class="container-list">
                            <?php
                                $containerDisplay = blank($invoice->container_no) ? ($invoice->salesOrder->container_no ?? null) : $invoice->container_no;
                            ?>
                            <?php if($containerDisplay): ?>
                                <?php echo e(is_array($containerDisplay) ? implode(', ', $containerDisplay) : $containerDisplay); ?>

                            <?php else: ?>
                                -
                            <?php endif; ?>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="ship-label">20'/40'/45'</td>
                    <td class="ship-colon">:</td>
                    <td class="ship-value"><?php echo e($invoice->party_lcl ?? $invoice->salesOrder->party_lcl ?? '-'); ?></td>
                    <td colspan="3"></td>
                </tr>
                <tr>
                    <td class="ship-label">REMARKS</td>
                    <td class="ship-colon">:</td>
                    <td colspan="4"><?php echo e($invoice->remarks ?? '-'); ?></td>
                </tr>
            </table>
        </div>

        <!-- Items Table -->
        <table class="items-table">
            <thead>
                <tr>
                    <th class="desc-col" style="text-align: left;">DESCRIPTION</th>
                    <th class="qty-col">QTY</th>
                    <th class="unit-col">UNIT</th>
                    <th class="rate-col" style="text-align: right;">RATE</th>
                    <th class="cur-col">CUR</th>
                    <th class="amount-col" style="text-align: right;">AMOUNT</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    // Use the filtered items already passed from controller
                    $items = $invoice->items ?? collect();
                ?>

                <?php if($items && $items->count() > 0): ?>
                    <?php $__currentLoopData = $items; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $item): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <tr>
                            <td class="desc-col"><?php echo e(strtoupper($item->description ?? 'SERVICE')); ?></td>
                            <td class="qty-col"><?php echo e($item->quantity ?? 1); ?></td>
                            <td class="unit-col"><?php echo e(strtoupper($item->unit ?? 'SET')); ?></td>
                            <td class="rate-col"><?php echo e(number_format($item->rate ?? 0, 2)); ?></td>
                            <td class="cur-col"><?php echo e($item->currency ?? 'IDR'); ?></td>
                            <td class="amount-col"><?php echo e(number_format($item->amount ?? 0, 2)); ?></td>
                        </tr>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                <?php else: ?>
                    
                    <tr>
                        <td colspan="6" class="desc-col" style="text-align: center; font-style: italic; color: #666;">
                            No items found for this invoice
                        </td>
                    </tr>
                <?php endif; ?>
            </tbody>
        </table>

        <!-- Bank Details and Totals Table -->
        <table class="bank-totals-table">
            <tr>
                <td class="bank-label-col" style="color: #0000">BANK NAME</td>
                <td class="bank-value-col" style="color: #0000">: <?php echo e($invoice->bank_name ?? 'Mandiri'); ?></td>
                <td class="total-label-col total-bold">SUB TOTAL</td>
                <td class="total-value-col total-bold">
                    <?php echo e(number_format($calculatedSubtotal ?? $invoice->subtotal ?? 0, 2)); ?>

                </td>
            </tr>
          <tr>
              <td class="bank-label-col" style="color: #0000">BANK NUMBER</td>
              <td class="bank-value-col" style="color: #0000">:
                  <?php echo e($invoice->bank_number ?? $invoice->bank_account ?? '122-00-12330539'); ?>

              </td>
              <?php if(($invoice->vat_amount ?? 0) > 0): ?>
                  <td class="total-label-col">
                      VAT <?php echo e(rtrim(rtrim(number_format($invoice->vat_rate ?? 0, 2, '.', ''), '0'), '.')); ?>%
                  </td>
                  <td class="total-value-col">
                      <?php echo e(number_format($invoice->vat_amount ?? 0, 2)); ?>

                  </td>
              <?php else: ?>
                  <td class="total-label-col"></td>
                  <td class="total-value-col"></td>
              <?php endif; ?>
          </tr>
            <tr>
                <td class="bank-label-col" style="color: #0000">ACCOUNT NAME</td>
                <td class="bank-value-col" style="color: #0000">:
                    <?php echo e($invoice->bank_account_name ?? 'Eshaka Wijaya Logistics'); ?>

                </td>
                <?php if($invoice->hasDownPayment()): ?>
                    <td class="total-label-col" style="color: #0000">DOWN PAYMENT (-)</td>
                    <td class="total-value-col" style="color: #0000"><?php echo e(number_format($invoice->down_payment_amount, 2)); ?>

                    </td>
                <?php else: ?>
                    <td class="total-label-col"></td>
                    <td class="total-value-col"></td>
                <?php endif; ?>
            </tr>
            <tr>
                <td class="bank-label-col" style="color: #0000">SWIFT CODE</td>
                <td class="bank-value-col" style="color: #0000">: <?php echo e($invoice->swift_code ?? 'BMRIIDJA'); ?></td>
                <td class="total-label-col total-bold">TOTAL</td>
                <td class="total-value-col total-bold">
                    <?php echo e(number_format($calculatedTotal ?? $invoice->total ?? 0, 2)); ?>

                </td>
            </tr>
            <tr>
                <td class="bank-label-col"></td>
                <td class="bank-value-col"></td>
                <td class="total-label-col"></td>
                <td class="total-value-col"></td>
            </tr>
            <tr>
                <td class="bank-label-col" style="color: #0000">BANK NAME</td>
                <td class="bank-value-col" style="color: #0000">: <?php echo e($invoice->bank_name_bca ?? 'BCA'); ?></td>
                <td class="total-label-col"></td>
                <td class="total-value-col"></td>
            </tr>
            <tr>
                <td class="bank-label-col" style="color: #0000">BANK NUMBER</td>
                <td class="bank-value-col" style="color: #0000">: <?php echo e($invoice->bank_number_bca ?? '5445-974 975'); ?></td>
                <td class="total-label-col"></td>
                <td class="total-value-col"></td>
            </tr>
            <tr>
                <td class="bank-label-col" style="color: #0000">ACCOUNT NAME</td>
                <td class="bank-value-col" style="color: #0000">:
                    <?php echo e($invoice->bank_account_name_bca ?? 'Eshaka Wijaya Logistics'); ?>

                </td>
                <td class="total-label-col"></td>
                <td class="total-value-col"></td>
            </tr>
            <tr>
                <td class="bank-label-col" style="color: #0000">SWIFT CODE</td>
                <td class="bank-value-col" style="color: #0000">: <?php echo e($invoice->swift_code_bca ?? 'CENAIDJAXXX'); ?></td>
                <td class="total-label-col"></td>
                <td class="total-value-col"></td>
            </tr>
        </table>

        <div class="invoice-notes">
            NOTE : <br>1. Payments made by bank transfer must be made to the company account in the name of Eshaka
            Wijaya
            Logistics, PT.<br>
            2. Payment is considered complete once the funds are confirmed to have been credited to the company account
            in full.<br>
            3. Objections or corrections must be submitted no later than 7 days after receipt of the invoice. Failure to
            do so will be deemed correct or approved.<br>
            4. Bank Details:
            <table style="width: 100%; border-collapse: collapse; font-size: 7pt; margin-top: 4px;">
                <thead>
                    <tr>
                        <th style="text-align: left;">Bank Name</th>
                        <th style="text-align: left;">Bank Branch</th>
                        <th style="text-align: left;">Account No.</th>
                        <th style="text-align: left;">Curr.</th>
                        <th style="text-align: left;">Swift No.</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>MANDIRI</td>
                        <td>Jakarta</td>
                        <td>1220012330539</td>
                        <td>IDR</td>
                        <td>BMRIIDJA</td>
                    </tr>
                    <tr>
                        <td>BCA</td>
                        <td>Jakarta</td>
                        <td>5445974975</td>
                        <td>IDR</td>
                        <td>CENAIDJAXXX</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Footer -->
        <div class="page-footer">
            Ruko AEROHUB Citra 8 ,C7-10, Kel Pegadungan, Kec Kalideres,<br>
            Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11830<br><br>
            This is a computer generated invoice. No signature and stamp duty is required.
        </div>
    </div>
</body>

</html>
<?php /**PATH C:\laragon\www\OfficeManagement\resources\views/invoices/main-pdf.blade.php ENDPATH**/ ?>