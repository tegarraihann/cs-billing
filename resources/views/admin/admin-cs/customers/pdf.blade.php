<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Pelanggan - {{ $customer->customer_code }}</title>
    <style>
        @page {
            margin: 2cm 1.5cm;
            font-family: 'Times New Roman', serif;
        }
        
        body {
            font-family: 'Times New Roman', serif;
            font-size: 11px;
            line-height: 1.5;
            color: #000;
            margin: 0;
            padding: 0;
        }
        
        .header {
            margin-bottom: 40px;
            border-bottom: 2px solid #000;
            padding-bottom: 15px;
        }
        
        .company-info {
            float: left;
            width: 60%;
        }
        
        .company-name {
            font-size: 18px;
            font-weight: bold;
            color: #000;
            margin-bottom: 5px;
        }
        
        .company-address {
            font-size: 10px;
            color: #333;
            line-height: 1.3;
        }
        
        .document-info {
            float: right;
            width: 35%;
            text-align: right;
        }
        
        .document-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .document-details {
            font-size: 10px;
            line-height: 1.4;
        }
        
        .clear {
            clear: both;
        }
        
        .content {
            margin-top: 30px;
        }
        
        .section {
            margin-bottom: 30px;
            page-break-inside: avoid;
        }
        
        .section-title {
            font-size: 12px;
            font-weight: bold;
            color: #000;
            border-bottom: 1px solid #000;
            padding-bottom: 3px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }
        
        .info-table td {
            padding: 4px 8px;
            vertical-align: top;
            border-bottom: 1px solid #eee;
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
        
        .vendor-section {
            border: 1px solid #ddd;
            padding: 15px;
            margin-top: 20px;
            background-color: #fafafa;
        }
        
        .vendor-table {
            width: 100%;
            border-collapse: collapse;
        }
        
        .vendor-table td {
            padding: 8px;
            border-bottom: 1px dotted #ccc;
        }
        
        .vendor-label {
            font-weight: bold;
            text-align: left;
        }
        
        .vendor-value {
            text-align: left;
            font-family: monospace;
            font-size: 11px;
        }
        
        .footer {
            position: fixed;
            bottom: 1cm;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 9px;
            color: #666;
            border-top: 1px solid #ccc;
            padding-top: 8px;
            background: white;
        }
        
        .print-info {
            text-align: right;
            font-size: 9px;
            color: #666;
            margin-bottom: 20px;
            font-style: italic;
        }
        
        .signature-section {
            margin-top: 50px;
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
            padding: 20px 10px;
        }
        
        .signature-line {
            border-bottom: 1px solid #000;
            margin-bottom: 5px;
            height: 50px;
        }
        
        .signature-label {
            font-size: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="company-info">
            <div class="company-name">PT. OFFICE MANAGEMENT SYSTEM</div>
            <div class="company-address">
                Jl. Contoh Alamat No. 123<br>
                Jakarta Selatan 12345<br>
                Telp: (021) 123-4567 | Email: info@officems.com
            </div>
        </div>
        <div class="document-info">
            <div class="document-title">Data Pelanggan</div>
            <div class="document-details">
                <strong>No: {{ $customer->no }}</strong><br>
                <strong>Customer Code: {{ $customer->customer_code }}</strong><br>
                Tanggal: {{ $customer->created_at ? $customer->created_at->locale('id')->isoFormat('DD MMMM YYYY') : date('d F Y') }}
            </div>
        </div>
        <div class="clear"></div>
    </div>

    <!-- Print Info -->
    <div class="print-info">
        Dicetak pada: {{ \Carbon\Carbon::now()->locale('id')->isoFormat('DD MMMM YYYY HH:mm') }}
    </div>

    <!-- Content -->
    <div class="content">
        
        <!-- Basic Customer Information -->
        <div class="section">
            <div class="section-title">Informasi Dasar Pelanggan</div>
            <table class="info-table">
                <tr>
                    <td class="info-label">SO Number</td>
                    <td class="info-value">{{ $customer->so_number ?: '-' }}</td>
                    <td class="info-label">Customer Code</td>
                    <td class="info-value">{{ $customer->customer_code ?: '-' }}</td>
                </tr>
                <tr>
                    <td class="info-label">Consignee/Shipper</td>
                    <td class="info-value">{{ $customer->consignee_shipper ?: '-' }}</td>
                    <td class="info-label">AWB/BL Number</td>
                    <td class="info-value">{{ $customer->awb_bl_number ?: '-' }}</td>
                </tr>
                <tr>
                    <td class="info-label">Customer Doc Name</td>
                    <td class="info-value">{{ $customer->cust_doc_name ?: '-' }}</td>
                    <td class="info-label">Type Qty</td>
                    <td class="info-value">{{ $customer->type_qty ?: '-' }}</td>
                </tr>
                <tr>
                    <td class="info-label">No Kont/Pallet</td>
                    <td class="info-value">{{ $customer->no_kont_pallet ?: '-' }}</td>
                    <td class="info-label">POL/POD</td>
                    <td class="info-value">{{ $customer->pol_pod ?: '-' }}</td>
                </tr>
                <tr>
                    <td class="info-label">ETA</td>
                    <td class="info-value">{{ $customer->eta ? \Carbon\Carbon::parse($customer->eta)->locale('id')->isoFormat('DD MMMM YYYY') : '-' }}</td>
                    <td class="info-label">Handled By</td>
                    <td class="info-value">{{ $customer->handler->name ?? '-' }}</td>
                </tr>
            </table>
        </div>

        <!-- Document Information -->
        @if($customer->photo_path || $customer->legal_document_path)
        <div class="section">
            <div class="section-title">Dokumen & File</div>
            <table class="info-table">
                @if($customer->photo_path)
                <tr>
                    <td class="info-label">Foto Pelanggan</td>
                    <td class="info-value" colspan="3">
                        File: {{ basename($customer->photo_path) }}<br>
                        <small style="color: #666;">Path: storage/{{ $customer->photo_path }}</small>
                    </td>
                </tr>
                @endif
                @if($customer->legal_document_path)
                <tr>
                    <td class="info-label">Dokumen Legal</td>
                    <td class="info-value" colspan="3">
                        File: {{ basename($customer->legal_document_path) }}<br>
                        <small style="color: #666;">Path: storage/{{ $customer->legal_document_path }}</small>
                    </td>
                </tr>
                @endif
            </table>
            <div style="margin-top: 10px; padding: 10px; background-color: #f9f9f9; border-left: 3px solid #007bff; font-size: 10px; color: #666;">
                <strong>Catatan:</strong> File yang tercantum di atas tersimpan dalam sistem dan dapat diakses melalui aplikasi web.
            </div>
        </div>
        @endif

        <!-- Vendor Information -->
        <div class="section">
            <div class="section-title">Informasi Vendor</div>
            @if($customer->vendor && is_array($customer->vendor))
                <div class="vendor-section">
                    <table class="vendor-table">
                        <tr>
                            <td class="vendor-label">Deskripsi</td>
                            <td class="vendor-value">{{ $customer->vendor['deskripsi'] ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="vendor-label">Nominal</td>
                            <td class="vendor-value">{{ isset($customer->vendor['nominal']) ? 'Rp ' . number_format($customer->vendor['nominal'], 0, ',', '.') : '-' }}</td>
                        </tr>
                        <tr>
                            <td class="vendor-label">Nama Vendor</td>
                            <td class="vendor-value">{{ $customer->vendor['company_name'] ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="vendor-label">Nomor Rekening</td>
                            <td class="vendor-value">{{ $customer->vendor['no_rekening'] ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="vendor-label">Nama Rekening</td>
                            <td class="vendor-value">{{ $customer->vendor['nama_rekening'] ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="vendor-label">RCVD INV</td>
                            <td class="vendor-value">{{ $customer->vendor['rcvd_inv'] ?? '-' }}</td>
                        </tr>
                    </table>
                </div>
            @elseif($customer->vendors && is_array($customer->vendors) && count($customer->vendors) > 0)
                <!-- Legacy vendor format support -->
                @foreach($customer->vendors as $index => $vendor)
                <div class="vendor-section">
                    <h4 style="margin-bottom: 10px; font-size: 11px;">Vendor {{ $index + 1 }}</h4>
                    <table class="vendor-table">
                        <tr>
                            <td class="vendor-label">Deskripsi</td>
                            <td class="vendor-value">{{ $vendor['deskripsi'] ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="vendor-label">Nominal</td>
                            <td class="vendor-value">{{ isset($vendor['nominal']) ? 'Rp ' . number_format($vendor['nominal'], 0, ',', '.') : '-' }}</td>
                        </tr>
                        <tr>
                            <td class="vendor-label">Nama Vendor</td>
                            <td class="vendor-value">{{ $vendor['company_name'] ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="vendor-label">Nomor Rekening</td>
                            <td class="vendor-value">{{ $vendor['no_rekening'] ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="vendor-label">Nama Rekening</td>
                            <td class="vendor-value">{{ $vendor['nama_rekening'] ?? '-' }}</td>
                        </tr>
                        <tr>
                            <td class="vendor-label">RCVD INV</td>
                            <td class="vendor-value">{{ $vendor['rcvd_inv'] ?? '-' }}</td>
                        </tr>
                    </table>
                </div>
                @endforeach
            @else
                <div class="vendor-section">
                    <p style="text-align: center; color: #666; font-style: italic;">Tidak ada data vendor</p>
                </div>
            @endif
        </div>

        <!-- Additional Information -->
        <div class="section">
            <div class="section-title">Informasi Tambahan</div>
            <table class="info-table">
                <tr>
                    <td class="info-label">Tanggal Input</td>
                    <td class="info-value">{{ $customer->created_at ? $customer->created_at->locale('id')->isoFormat('DD MMMM YYYY HH:mm') : '-' }}</td>
                    <td class="info-label">Terakhir Diperbarui</td>
                    <td class="info-value">{{ $customer->updated_at ? $customer->updated_at->locale('id')->isoFormat('DD MMMM YYYY HH:mm') : '-' }}</td>
                </tr>
                <tr>
                    <td class="info-label">Last Contact</td>
                    <td class="info-value" colspan="3">{{ $customer->last_contact_at ? \Carbon\Carbon::parse($customer->last_contact_at)->locale('id')->isoFormat('DD MMMM YYYY HH:mm') : '-' }}</td>
                </tr>
            </table>
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
        Customer Data No: {{ $customer->customer_code }} | PT. Office Management System | Halaman 1 dari 1
    </div>
</body>
</html>