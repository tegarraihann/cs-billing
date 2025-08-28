<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $voucher->type === 'payment' ? 'Payment' : 'Receipt' }} Voucher - {{ $voucher->voucher_no }}</title>
    <style>
        @page {
            margin: 2cm 1.5cm;
            font-family: Arial, sans-serif;
        }

        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            line-height: 1.2;
            color: #000;
            margin: 0;
            padding: 0;
        }

        .header {
            text-align: left;
            margin-bottom: 40px;
            top: -16px;
            position: absolute;
        }

        .header-line {
            margin-bottom: 5px;
        }

        .header-line label {
            font-weight: bold;
            margin-right: 10px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
        }

        .title {
            text-align: right;
            font-size: 14px;
            font-weight: bold;
            top: 1px;
            position: relative;
            text-transform: uppercase;
            right: 90px;
        }

        .voucher-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 0px;
        }

        .voucher-table th {
            background-color: #dc3545;
            color: black;
            font-weight: bold;
            padding: 2px;
            border: 2px solid #000;
            text-align: center;
            font-size: 13px;
            font-family: 'Courier New', monospace;
        }

        .voucher-table td {
            border: 2px solid #000;
            vertical-align: top;
            height: 18px;
            font-family: 'Courier New', monospace;
            padding: 2px;
        }

        .date-col {
            width: 15%;
            text-align: center;
        }

        .description-col {
            width: 60%;
            text-align: left;
        }

        .amount-col {
            width: 25%;
            text-align: center;
        }

        .total-row {
            font-weight: bold;
            background-color: #f8f9fa;
        }

        .total-row td {
            text-align: center;
            font-weight: bold;
        }

        .signatures {
            margin-top: -1px;
        }

        .signature-table {
            width: 100%;
            border-collapse: collapse;
        }

        .signature-table td {
            width: 25%;
            text-align: center;
            vertical-align: top;
            padding: 20px 5px;
            border: 2px solid #000;
            border-top: none;
        }

        .signature-label {
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 40px;
            font-family: 'Courier New', monospace;
        }

        .signature-name {
            font-size: 9px;
            color: #666;
            margin-top: 5px;
            font-family: 'Courier New', monospace;
        }

        .logo {
            position: absolute;
            top: 150px;
            right: 50px;
            width: 80px;
            opacity: 0.1;
        }

        /* Empty rows for the table */
        .empty-row {
            height: 18px;
        }
    </style>
</head>

<body>
    <!-- Logo watermark -->
    <div class="logo">
        <svg width="80" height="60" viewBox="0 0 100 75" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="37" r="25" fill="none" stroke="#28a745" stroke-width="3" />
            <path d="M35 37 L45 47 L65 27" fill="none" stroke="#28a745" stroke-width="3" />
        </svg>
    </div>

    <!-- Header -->
    <div class="header">
        <div class="header-line">
            <label>No.</label>: {{ $voucher->voucher_no }}
        </div>
        <div class="header-line">
            <label>Date</label>:
            {{ $voucher->date ? \Carbon\Carbon::parse($voucher->date)->format('d/m/Y') : date('d/m/Y') }}
        </div>
    </div>

    <!-- Title -->
    <div class="title">
        EWILOG {{ $voucher->type === 'payment' ? 'PAYMENT' : 'RECEIPT' }} VOUCHER (KAS/BANK)
    </div>

    <!-- Main Table -->
    <table class="voucher-table">
        <thead>
            <tr>
                <th class="date-col">Date</th>
                <th class="description-col">Description</th>
                <th class="amount-col">Amount</th>
            </tr>
        </thead>
        <tbody>
            <!-- Main voucher entry -->
            <tr>
                <td class="date-col">{{ $voucher->date ? \Carbon\Carbon::parse($voucher->date)->format('d/m/Y') : '' }}
                </td>
                <td class="description-col">{{ $voucher->description ?: '' }}</td>
                <td class="amount-col">{{ number_format($voucher->amount, 0, ',', '.') }}</td>
            </tr>
            <!-- Empty rows to match original format -->
            @for ($i = 0; $i < 6; $i++)
                <tr class="empty-row">
                    <td class="date-col">&nbsp;</td>
                    <td class="description-col">&nbsp;</td>
                    <td class="amount-col">&nbsp;</td>
                </tr>
            @endfor
            <!-- Total row -->
            <tr class="total-row">
                <td colspan="2" class="total-row">TOTAL</td>
                <td class="amount-col">{{ number_format($voucher->amount, 0, ',', '.') }}</td>
            </tr>
        </tbody>
    </table>

    <!-- Signatures -->
    <div class="signatures">
        <table class="signature-table">
            <tr>
                <td>
                    <div class="signature-label">Authorized</div>
                    <div class="signature-name">{{ $voucher->authorized_by ?: '' }}</div>
                </td>
                <td>
                    <div class="signature-label">Accounting</div>
                    <div class="signature-name">{{ $voucher->finance_by ?: '' }}</div>
                </td>
                <td>
                    <div class="signature-label">Prepared</div>
                    <div class="signature-name">{{ $voucher->prepared_by ?: '' }}</div>
                </td>
                <td>
                    <div class="signature-label">Receipt</div>
                    <div class="signature-name">{{ $voucher->receipt_by ?: '' }}</div>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>
