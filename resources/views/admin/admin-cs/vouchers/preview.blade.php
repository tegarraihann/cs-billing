<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview: {{ $voucher->type === 'payment' ? 'Payment' : 'Receipt' }} Voucher - {{ $voucher->voucher_no }}
    </title>
    <style>
        /* Print styles - sama seperti PDF */
        @media print {
            .no-print {
                display: none !important;
            }

            body {
                font-family: Arial, sans-serif;
                font-size: 11px;
                line-height: 1.2;
                color: #000;
                margin: 0;
                padding: 0;
            }
        }

        /* Screen styles */
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.3;
            color: #000;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }

        .preview-container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            padding: 2cm 1.5cm;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            min-height: 297mm;
        }

        .preview-header {
            background: #007bff;
            color: white;
            padding: 10px 20px;
            margin: -20px -20px 20px -20px;
            border-radius: 5px 5px 0 0;
        }

        .preview-actions {
            text-align: center;
            margin-bottom: 20px;
        }

        .btn {
            display: inline-block;
            padding: 8px 16px;
            margin: 0 5px;
            text-decoration: none;
            border-radius: 4px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            border: none;
        }

        .btn-primary {
            background-color: #007bff;
            color: white;
        }

        .btn-success {
            background-color: #28a745;
            color: white;
        }

        .btn-secondary {
            background-color: #6c757d;
            color: white;
        }

        .btn:hover {
            opacity: 0.9;
        }

        .editable {
            border: 1px dashed #ccc;
            padding: 2px;
            min-height: 20px;
            cursor: text;
        }

        .editable:hover {
            background-color: #f9f9f9;
            border-color: #007bff;
        }

        .editable:focus {
            outline: 2px solid #007bff;
            background-color: #fff;
            border-color: #007bff;
        }

        /* Voucher styles - sama seperti PDF template */
        .header {
            text-align: left;
            margin-bottom: 40px;
            top: 304px;
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

        .header-line .editable {
            font-family: 'Courier New', monospace;
            font-size: 14px;
        }

        .title {
            text-align: right;
            font-size: 14px;
            font-weight: bold;
            top: 3px;
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

        .empty-row {
            height: 18px;
        }

        .edit-note {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 10px;
            margin-bottom: 20px;
            border-radius: 4px;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="no-print">
        <div class="preview-header">
            <h1>📄 Preview Voucher - {{ $voucher->voucher_no }}</h1>
            <p>Anda dapat mengedit konten dengan mengklik area yang ingin diubah</p>
        </div>

        <div class="preview-actions">
            <button onclick="window.print()" class="btn btn-primary">🖨️ Print</button>
            <a href="{{ route('admin-keuangan.sales-orders.vouchers.print', [$salesOrder->id, $voucher->id]) }}"
                class="btn btn-success" target="_blank">📄 Download PDF</a>
            <a href="{{ route('admin-keuangan.sales-orders.show', $salesOrder->id) }}" class="btn btn-secondary">←
                Kembali</a>
        </div>

        <div class="edit-note">
            <strong>💡 Tips:</strong> Klik pada area yang ingin diedit (berbingkai putus-putus).
            Untuk mencetak hasil editan, gunakan tombol Print di atas.
            Perubahan tidak akan tersimpan di database.
        </div>
    </div>

    <div class="preview-container">
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
                <label>No.</label>: <span class="editable" contenteditable="true">{{ $voucher->voucher_no }}</span>
            </div>
            <div class="header-line">
                <label>Date</label>: <span class="editable"
                    contenteditable="true">{{ $voucher->date ? \Carbon\Carbon::parse($voucher->date)->format('d/m/Y') : date('d/m/Y') }}</span>
            </div>
        </div>

        <!-- Title -->
        <div class="title editable" contenteditable="true">
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
                    <td class="date-col editable" contenteditable="true">
                        {{ $voucher->date ? \Carbon\Carbon::parse($voucher->date)->format('d/m/Y') : '' }}</td>
                    <td class="description-col editable" contenteditable="true">{{ $voucher->description ?: '' }}</td>
                    <td class="amount-col editable" contenteditable="true">
                        {{ number_format($voucher->amount, 0, ',', '.') }}</td>
                </tr>
                <!-- Empty rows to match original format -->
                @for ($i = 0; $i < 6; $i++)
                    <tr class="empty-row">
                        <td class="date-col editable" contenteditable="true">&nbsp;</td>
                        <td class="description-col editable" contenteditable="true">&nbsp;</td>
                        <td class="amount-col editable" contenteditable="true">&nbsp;</td>
                    </tr>
                @endfor
                <!-- Total row -->
                <tr class="total-row">
                    <td colspan="2" class="total-row">TOTAL</td>
                    <td class="amount-col editable" contenteditable="true">
                        {{ number_format($voucher->amount, 0, ',', '.') }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Signatures -->
        <div class="signatures">
            <table class="signature-table">
                <tr>
                    <td>
                        <div class="signature-label">Authorized</div>
                        <div class="signature-name editable" contenteditable="true">{{ $voucher->authorized_by ?: '' }}
                        </div>
                    </td>
                    <td>
                        <div class="signature-label">Accounting</div>
                        <div class="signature-name editable" contenteditable="true">{{ $voucher->finance_by ?: '' }}
                        </div>
                    </td>
                    <td>
                        <div class="signature-label">Prepared</div>
                        <div class="signature-name editable" contenteditable="true">{{ $voucher->prepared_by ?: '' }}
                        </div>
                    </td>
                    <td>
                        <div class="signature-label">Receipt</div>
                        <div class="signature-name editable" contenteditable="true">{{ $voucher->receipt_by ?: '' }}
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <script>
        // Auto-focus on editable elements when clicked
        document.querySelectorAll('.editable').forEach(function (element) {
            element.addEventListener('click', function () {
                this.focus();
            });

            // Remove placeholder &nbsp; when user starts typing
            element.addEventListener('focus', function () {
                if (this.innerHTML === '&nbsp;' || this.innerHTML === ' ') {
                    this.innerHTML = '';
                }
            });

            // Add &nbsp; back if empty when focus is lost
            element.addEventListener('blur', function () {
                if (this.innerHTML.trim() === '') {
                    this.innerHTML = '&nbsp;';
                }
            });
        });

        // Format numbers in amount fields
        document.querySelectorAll('.amount-col.editable').forEach(function (element) {
            element.addEventListener('blur', function () {
                let value = this.innerHTML.replace(/[^\d]/g, '');
                if (value && value !== '') {
                    let formatted = parseInt(value).toLocaleString('id-ID');
                    this.innerHTML = formatted;
                }
            });
        });
    </script>
</body>

</html>
