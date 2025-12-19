# OfficeManagement – Dokumentasi Ringkas

## Peran & Akses
- **Admin CS**: Buat/rilis Sales Order (SO), cetak SO (snapshot CS).
- **Admin Keuangan/Finance**: Kelola SO (data live), Invoice, Piutang (AR), Hutang (AP), Petty Cash, Bank, Profit & Loss, Financial Position.

## Fitur Utama
- **Sales Order**: Penomoran berformat `EWILOG + YYMM + opening(lintas bulan) + sequential(reset per bulan)`. PDF CS pakai snapshot; PDF Finance pakai data live.
- **Invoice & P&L**: Auto-post ke laba rugi berbasis invoice_date (periode aktif). Logo invoice di-embed base64.
- **AR – Post VAT Payable**: Tombol “Post VAT Payable” menutup AR, menambah VAT Payable, dan catat beban pajak (expense_tax) ke P&L.
- **AP**: Kelola hutang, bayar, tambah biaya komponen.
- **Bank Balance**: Saldo per bulan, mutasi, setoran modal (akun 3100). Opening bulan baru bisa dibuat otomatis (cron) dari closing bulan sebelumnya.
- **Financial Position**: Neraca otomatis (Assets, Liabilities, Equity). Equity: 3100 modal disetor (adjustment), 3200 laba ditahan (akumulasi P&L published/closed), 3300 current year earnings (P&L tahun berjalan).

## Cron / Scheduler (cpanel/host)
Jalankan Laravel scheduler tiap menit:
```
* * * * * /usr/local/bin/php /home/USERNAME/path/to/artisan schedule:run >> /dev/null 2>&1
```
Ganti path PHP dan project sesuai hosting.

### Jadwal penting
- `bank:rollover-opening` setiap tanggal 1 pukul 00:10 (buat opening balance bulan berjalan dari closing bulan sebelumnya).
- `equipment:post-depreciation` setiap hari pukul 01:30 (posting otomatis penyusutan equipment berdasarkan jadwal).

## Jalankan Manual (opsional)
- Rollover opening bank: `php artisan bank:rollover-opening`
- Post otomatis penyusutan equipment: `php artisan equipment:post-depreciation`

## File Penting
- SO Finance PDF: `resources/views/admin/admin-keuangan/sales-orders/pdf.blade.php` (data live).
- SO CS PDF: `resources/views/admin/admin-cs/sales-orders/pdf.blade.php` (snapshot CS).
- Invoice PDF: `resources/views/invoices/*.blade.php` (logo base64, font courier).
- Financial Position PDF simple: `resources/views/admin/admin-keuangan/financial-position/pdf-simple.blade.php`.
- Perintah rollover: `app/Console/Commands/RolloverBankOpening.php`.

## Catatan Implementasi
- Penomoran SO tidak reset per bulan untuk opening; sequential reset per bulan.
- Post VAT Payable tidak otomatis mengurangi profit SO kecuali lewat beban pajak yang kini dicatat di P&L (expense_tax).
- Opening bank bulanan diisi dari closing bulan sebelumnya via cron; jika opening sudah ada, cron skip.
