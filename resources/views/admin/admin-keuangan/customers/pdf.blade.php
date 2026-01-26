<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $type == 'individual' ? 'Data Customer - ' . $customer->company_name : 'Daftar Customer' }}</title>
    <style>
        @page {
            size: landscape;
            margin: 1cm;
        }

        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            font-size: 12px;
            line-height: 1.4;
        }
        
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 15px;
        }
        
        .header h1 {
            margin: 0;
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }
        
        .header p {
            margin: 5px 0 0 0;
            font-size: 12px;
            color: #666;
        }
        
        .info-section {
            margin-bottom: 25px;
        }
        
        .info-section h2 {
            font-size: 14px;
            font-weight: bold;
            margin: 0 0 15px 0;
            color: #333;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
        }
        
        .info-grid {
            display: table;
            width: 100%;
        }
        
        .info-row {
            display: table-row;
        }
        
        .info-label {
            display: table-cell;
            font-weight: bold;
            width: 30%;
            padding: 8px 15px 8px 0;
            vertical-align: top;
        }
        
        .info-value {
            display: table-cell;
            padding: 8px 0;
            vertical-align: top;
        }
        
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .table th, .table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            vertical-align: top;
        }
        
        .table th {
            background-color: #f5f5f5;
            font-weight: bold;
            font-size: 11px;
        }
        
        .table td {
            font-size: 10px;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
            text-align: center;
            font-size: 10px;
            color: #666;
        }
        
        .status-badge {
            display: inline-block;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: bold;
        }
        
        .status-active {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        
        .text-center {
            text-align: center;
        }
        
        .clearfix::after {
            content: "";
            display: table;
            clear: both;
        }
        
        .no-data {
            text-align: center;
            font-style: italic;
            color: #666;
            padding: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>PT. ESHAKA WIJAYA LOGISTICS</h1>
        <p>{{ $type == 'individual' ? 'Data Detail Customer' : 'Daftar Master Data Customer' }}</p>
        <p>Dicetak pada: {{ date('d F Y H:i:s') }}</p>
    </div>

    @if($type == 'individual')
        <!-- Individual Customer Detail -->
        <div class="info-section">
            <h2>Informasi Customer</h2>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-label">ID Customer:</div>
                    <div class="info-value">#{{ $customer->id }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Nama Perusahaan:</div>
                    <div class="info-value">{{ $customer->company_name }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Jenis Perusahaan:</div>
                    <div class="info-value">{{ $customer->company_type ?? '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Alamat Perusahaan:</div>
                    <div class="info-value">{{ $customer->company_address ?? '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Alamat Invoice:</div>
                    <div class="info-value">{{ $customer->invoice_address ?? '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">PIC Name:</div>
                    <div class="info-value">{{ $customer->pic_name ?? '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">PIC Phone:</div>
                    <div class="info-value">{{ $customer->pic_phone ?? '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">PIC Email:</div>
                    <div class="info-value">{{ $customer->pic_email ?? '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Marketing Name:</div>
                    <div class="info-value">{{ $customer->marketing_name ?? '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Marketing Phone:</div>
                    <div class="info-value">{{ $customer->marketing_phone ?? '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Marketing Email:</div>
                    <div class="info-value">{{ $customer->marketing_email ?? '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">NPWP:</div>
                    <div class="info-value">{{ $customer->npwp ?? '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">NIB:</div>
                    <div class="info-value">{{ $customer->nib ?? '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Tanggal Dibuat:</div>
                    <div class="info-value">{{ $customer->created_at ? $customer->created_at->format('d F Y H:i:s') : '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Terakhir Diupdate:</div>
                    <div class="info-value">{{ $customer->updated_at ? $customer->updated_at->format('d F Y H:i:s') : '-' }}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Status:</div>
                    <div class="info-value">
                        <span class="status-badge status-active">Aktif</span>
                    </div>
                </div>
            </div>
        </div>
    @else
        <!-- Multiple Customers List -->
        <div class="info-section">
            <h2>Daftar Customer</h2>
            @if(isset($search) && $search)
                <p><strong>Filter pencarian:</strong> {{ $search }}</p>
            @endif
            
            @if($customers && count($customers) > 0)
                <table class="table">
                    <thead>
                        <tr>
                            <th style="width: 4%;">No</th>
                            <th style="width: 18%;">Nama Perusahaan</th>
                            <th style="width: 10%;">Jenis Perusahaan</th>
                            <th style="width: 12%;">PIC Name</th>
                            <th style="width: 10%;">PIC Phone</th>
                            <th style="width: 16%;">PIC Email</th>
                            <th style="width: 12%;">NPWP</th>
                            <th style="width: 10%;">NIB</th>
                            <th style="width: 8%;">Tanggal Dibuat</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($customers as $index => $customer)
                            <tr>
                                <td class="text-center">{{ $index + 1 }}</td>
                                <td>{{ $customer->company_name }}</td>
                                <td>{{ $customer->company_type ?? '-' }}</td>
                                <td>{{ $customer->pic_name ?? '-' }}</td>
                                <td>{{ $customer->pic_phone ?? '-' }}</td>
                                <td>{{ $customer->pic_email ?? '-' }}</td>
                                <td>{{ $customer->npwp ?? '-' }}</td>
                                <td>{{ $customer->nib ?? '-' }}</td>
                                <td>{{ $customer->created_at ? $customer->created_at->format('d/m/Y') : '-' }}</td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                
                <div style="margin-top: 15px;">
                    <strong>Total: {{ count($customers) }} customer</strong>
                </div>
            @else
                <div class="no-data">
                    <p>Tidak ada data customer yang ditemukan.</p>
                </div>
            @endif
        </div>
    @endif

    <div class="footer">
        <p>Dokumen ini digenerate secara otomatis oleh sistem PT. Eshaka Wijaya Logistics</p>
        <p>Admin Keuangan - {{ date('d/m/Y H:i:s') }}</p>
    </div>
</body>
</html>