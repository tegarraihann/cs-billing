<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo e($type == 'individual' ? 'Data Vendor - ' . $vendor->nama_vendor : 'Daftar Vendor'); ?></title>
    <style>
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
            margin-bottom: 15px;
        }
        
        .info-row {
            display: table-row;
        }
        
        .info-label {
            display: table-cell;
            width: 30%;
            padding: 8px;
            font-weight: bold;
            vertical-align: top;
            background-color: #f8f9fa;
            border: 1px solid #ddd;
        }
        
        .info-value {
            display: table-cell;
            padding: 8px;
            vertical-align: top;
            border: 1px solid #ddd;
        }
        
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        
        .table th {
            background-color: #f8f9fa;
            padding: 10px;
            text-align: left;
            font-weight: bold;
            border: 1px solid #ddd;
            font-size: 11px;
        }
        
        .table td {
            padding: 8px 10px;
            border: 1px solid #ddd;
            vertical-align: top;
            font-size: 10px;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        
        .table tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        
        .footer {
            margin-top: 30px;
            padding-top: 15px;
            border-top: 1px solid #ddd;
            text-align: right;
            font-size: 10px;
            color: #666;
        }
        
        .search-info {
            background-color: #e3f2fd;
            padding: 10px;
            margin-bottom: 20px;
            border-left: 4px solid #2196f3;
            font-size: 11px;
        }
        
        .empty-value {
            color: #999;
            font-style: italic;
        }
        
        .status-badge {
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 9px;
            font-weight: bold;
        }
        
        .status-aktif {
            background-color: #d4edda;
            color: #155724;
        }
        
        .text-center {
            text-align: center;
        }
        
        .text-right {
            text-align: right;
        }
        
        .font-mono {
            font-family: 'Courier New', monospace;
        }
        
        .page-break {
            page-break-before: always;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>PT. ESHAKA WIJAYA LOGISTICS</h1>
        <p><?php echo e($type == 'individual' ? 'Data Detail Vendor' : 'Daftar Master Data Vendor'); ?></p>
        <p>Dicetak pada: <?php echo e(date('d F Y H:i:s')); ?></p>
    </div>

    <?php if($type == 'individual'): ?>
        <!-- Individual Vendor Detail -->
        <div class="info-section">
            <h2>Informasi Vendor</h2>
            <div class="info-grid">
                <div class="info-row">
                    <div class="info-label">ID Vendor</div>
                    <div class="info-value">#<?php echo e($vendor->id); ?></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Nama Vendor</div>
                    <div class="info-value"><?php echo e($vendor->nama_vendor); ?></div>
                </div>
                <div class="info-row">
                    <div class="info-label">PIC (Person In Charge)</div>
                    <div class="info-value"><?php echo e($vendor->pic ?: '-'); ?></div>
                </div>
                <div class="info-row">
                    <div class="info-label">No HP</div>
                    <div class="info-value font-mono"><?php echo e($vendor->no_hp ?: '-'); ?></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Email</div>
                    <div class="info-value"><?php echo e($vendor->email ?: '-'); ?></div>
                </div>
                <div class="info-row">
                    <div class="info-label">No Kantor</div>
                    <div class="info-value font-mono"><?php echo e($vendor->no_kantor ?: '-'); ?></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Nomor Rekening</div>
                    <div class="info-value font-mono"><?php echo e($vendor->nomor_rekening); ?></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Nama Rekening</div>
                    <div class="info-value"><?php echo e($vendor->nama_rekening); ?></div>
                </div>
                <div class="info-row">
                    <div class="info-label">NIB</div>
                    <div class="info-value font-mono"><?php echo e($vendor->nib ?: '-'); ?></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Status Dokumen</div>
                    <div class="info-value">
                        <?php if($vendor->photo_path): ?>
                            <span class="status-badge status-aktif">Foto Ada</span>
                        <?php endif; ?>
                        <?php if($vendor->legal_document_path): ?>
                            <span class="status-badge status-aktif">Dokumen Legal Ada</span>
                        <?php endif; ?>
                        <?php if(!$vendor->photo_path && !$vendor->legal_document_path): ?>
                            <span class="empty-value">Tidak ada dokumen</span>
                        <?php endif; ?>
                    </div>
                </div>
                <div class="info-row">
                    <div class="info-label">Tanggal Dibuat</div>
                    <div class="info-value"><?php echo e($vendor->created_at->format('d F Y H:i')); ?></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Terakhir Diperbarui</div>
                    <div class="info-value"><?php echo e($vendor->updated_at->format('d F Y H:i')); ?></div>
                </div>
            </div>
        </div>
    <?php else: ?>
        <!-- All Vendors List -->
        <?php if($search): ?>
            <div class="search-info">
                <strong>Filter pencarian:</strong> "<?php echo e($search); ?>"<br>
                <strong>Hasil ditemukan:</strong> <?php echo e($vendors->count()); ?> vendor
            </div>
        <?php endif; ?>

        <div class="info-section">
            <h2>Daftar Vendor (<?php echo e($vendors->count()); ?> vendor)</h2>
            
            <?php if($vendors->count() > 0): ?>
                <table class="table">
                    <thead>
                        <tr>
                            <th width="4%">No</th>
                            <th width="16%">Nama Vendor</th>
                            <th width="12%">PIC</th>
                            <th width="10%">No HP</th>
                            <th width="15%">Email</th>
                            <th width="9%">No Kantor</th>
                            <th width="12%">Nomor Rekening</th>
                            <th width="12%">Nama Rekening</th>
                            <th width="10%">NIB</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php $__currentLoopData = $vendors; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $index => $vendor): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <tr>
                                <td class="text-center"><?php echo e($index + 1); ?></td>
                                <td><?php echo e($vendor->nama_vendor); ?></td>
                                <td><?php echo e($vendor->pic ?: '-'); ?></td>
                                <td class="font-mono"><?php echo e($vendor->no_hp ?: '-'); ?></td>
                                <td><?php echo e($vendor->email ?: '-'); ?></td>
                                <td class="font-mono"><?php echo e($vendor->no_kantor ?: '-'); ?></td>
                                <td class="font-mono"><?php echo e($vendor->nomor_rekening); ?></td>
                                <td><?php echo e($vendor->nama_rekening); ?></td>
                                <td class="font-mono"><?php echo e($vendor->nib ?: '-'); ?></td>
                            </tr>
                        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    </tbody>
                </table>
            <?php else: ?>
                <div class="text-center" style="padding: 40px; color: #666;">
                    <p>Tidak ada data vendor yang ditemukan.</p>
                </div>
            <?php endif; ?>
        </div>
    <?php endif; ?>

    <div class="footer">
        <p>Dokumen ini digenerate secara otomatis oleh sistem PT. Eshaka Wijaya Logistics</p>
        <p>Admin Keuangan - <?php echo e(date('d/m/Y H:i:s')); ?></p>
    </div>
</body>
</html><?php /**PATH C:\laragon\www\OfficeManagement\resources\views/admin/admin-keuangan/vendors/pdf.blade.php ENDPATH**/ ?>