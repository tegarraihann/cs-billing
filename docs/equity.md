# Dokumentasi Fitur Equity (Admin Keuangan)

Dokumentasi ini menjelaskan modul **Equity** yang digunakan untuk pencatatan modal dan perubahan ekuitas perusahaan. Seluruh UI untuk modul ini **menggunakan bahasa Inggris**, namun dokumentasi ini ditulis dalam Bahasa Indonesia.

## Ringkasan
Modul Equity berfungsi untuk:
- Mencatat transaksi modal/ekuitas yang **tidak terintegrasi** dengan shipment, pendapatan, atau pengeluaran lain.
- Terintegrasi dengan **Bank Balance** jika transaksi memang mempengaruhi kas/bank.
- Mempengaruhi **Financial Position** pada bagian **Equity**.

## Cakupan Fitur

| Fitur | Deskripsi | Integrasi |
| --- | --- | --- |
| Paid-in Capital (Modal Disetor) | Setoran modal dari pemilik | Dapat membuat transaksi bank (credit) |
| Retained Earnings (Laba Ditahan) | Pencatatan laba yang ditahan | Tidak membuat transaksi bank |
| Current Year Profit (Laba Tahun Berjalan) | Pencatatan laba berjalan (manual) | Tidak membuat transaksi bank |
| Dividend / Prive | Penarikan/dividen oleh pemilik | Dapat membuat transaksi bank (debit) |
| Employee Receivable (Kasbon) | Piutang karyawan/management ke perusahaan | Dapat membuat transaksi bank saat penyaluran/pelunasan |
| Employee Receivable Payment | Pelunasan kasbon (cicilan) | Dapat membuat transaksi bank (credit) |
| Deferred Liabilities | Catatan hutang tertahan | Dapat membuat transaksi bank saat pelunasan |
| Annual Closing | Penutupan tahunan (memindahkan laba berjalan ke laba ditahan) | Tidak membuat transaksi bank |

## Aturan Opening Balance
- **Opening balance tidak membuat transaksi bank**.
- Jika transaksi opening adalah **arus kas nyata**, user dapat menyalakan `Create Bank Transaction`.
- Default: `is_opening = true`, `affects_bank = false`.

## Integrasi Bank
Transaksi bank akan dibuat hanya jika `affects_bank = true`.
Aturan arah bank:
- **Paid-in Capital**: bank **credit**
- **Dividend/Prive**: bank **debit**
- **Employee Receivable (Kasbon)**: bank **debit**
- **Employee Receivable Payment**: bank **credit**
- **Deferred Liabilities**: bank **credit**

Settlement bank untuk entry yang belum mempengaruhi bank dilakukan di halaman **Show** melalui form **Settle Through Bank**.

## Integrasi Financial Position
Financial Position membaca data Equity dari:
- **Equity entries** (`equity_entries`) sebagai sumber manual/penyesuaian.
- **Profit & Loss** untuk laba berjalan dan laba ditahan (tetap dipakai), lalu ditambah equity entries jika ada.

Catatan:
- Jika ada equity entry untuk `Retained Earnings` atau `Current Year Profit`, nilainya **menambah** nilai dari Profit & Loss.
- Tujuannya agar entry manual (opening/adjustment) tidak menimpa perhitungan otomatis.

## Struktur Data
Tabel utama: `equity_entries`

Field utama:
- `entry_type`: jenis entry (lihat daftar tipe).
- `account_id`: relasi ke COA (Chart of Accounts).
- `entry_date`: tanggal transaksi.
- `amount`: nominal.
- `direction`: `increase` atau `decrease` (dipakai untuk total equity).
- `is_opening`: penanda opening balance.
- `affects_bank`: penanda transaksi bank.
- `bank_account_id`: bank yang digunakan (opsional).
- `bank_transaction_id`: relasi ke `bank_transactions` (opsional).
- `bank_transaction_type`: `credit` atau `debit`.
- `status`: `recorded` atau `settled`.
- `settled_at`: tanggal settlement (jika sudah masuk bank).
- `reference`, `notes`: informasi tambahan.
- `created_by`: user pembuat.

## Tipe Entry dan Mapping COA

| Entry Type | Label UI | COA | Direction | Bank Default |
| --- | --- | --- | --- | --- |
| `paid_in_capital` | Paid-in Capital | 3100 | increase | credit |
| `retained_earnings` | Retained Earnings | 3200 | increase | - |
| `current_year_profit` | Current Year Profit | 3300 | increase | - |
| `dividend_prive` | Dividend / Prive | 3400 | decrease | debit |
| `management_loan` | Employee Receivable (Kasbon) | 3500 | increase | debit |
| `management_loan_repayment` | Employee Receivable Payment | 3500 | decrease | credit |
| `deferred_liability` | Deferred Liabilities | 3600 | increase | credit |
| `annual_closing` | Annual Closing | - | neutral | - |

**Annual Closing** membuat 2 entry otomatis:
- Retained Earnings **increase**
- Current Year Profit **decrease**

## Status Entry
- **Recorded**: belum ada transaksi bank.
- **Settled**: sudah ada transaksi bank.

## UI (English)
Halaman:
- `Equity > Index`: list + filter + summary.
- `Equity > Create`: input entry.
- `Equity > Show`: detail + form settlement ke bank (jika belum settled).

Semua label dan pesan UI menggunakan **bahasa Inggris**.

## Integrasi Bank Balance
- Jika `affects_bank = true`, sistem membuat `bank_transactions` otomatis.
- Arah transaksi mengikuti konfigurasi tipe entry (credit/debit).
- Untuk entry yang belum settled, tersedia aksi **Settle Through Bank** di halaman Show.

## Integrasi dari Bank Balance (Setor Modal)
Fitur "Deposit Capital" di `Bank Balance` sekarang:
- Membuat transaksi bank **credit**.
- Membuat `equity_entries` dengan tipe `paid_in_capital`.

## Tidak Terintegrasi
- Tidak terhubung dengan shipment/SO/invoice.
- Tidak otomatis dari pendapatan/pengeluaran lain.

## Alur Transaksi (Non-Teknis)
Berikut alur ringkas yang bisa disampaikan ke user non-teknis:

### Modal Disetor (Paid-in Capital)
1. Input tanggal, jumlah, keterangan modal disetor.
2. Jika uang masuk ke bank, centang **Create Bank Transaction** dan pilih bank.
3. Sistem menambah saldo bank (credit) dan mencatat di Equity.
4. Status **Recorded** jika belum ke bank, **Settled** jika sudah.

### Laba Ditahan (Retained Earnings)
1. Input tanggal, jumlah, keterangan.
2. Tidak ada transaksi bank.
3. Sistem mencatat penyesuaian di Equity.

### Laba Tahun Berjalan (Current Year Profit)
1. Sistem menghitung otomatis dari laporan laba rugi.
2. Di Equity hanya tampil angka hasil perhitungan.
3. Tidak ada transaksi bank.

### Prive / Dividen
1. Input tanggal, jumlah, keterangan prive/dividen.
2. Jika dibayar lewat bank, centang **Create Bank Transaction** dan pilih bank.
3. Sistem mengurangi saldo bank (debit) dan mengurangi Equity.

### Piutang Karyawan (Kasbon) + Pelunasan
1. Untuk kasbon baru, pilih tipe **Employee Receivable (Kasbon)** lalu isi tanggal, nominal, dan keterangan (nama karyawan).
2. Jika uang benar-benar keluar dari bank, centang **Create Bank Transaction** dan pilih bank (bank **debit**).
3. Untuk pelunasan/cicilan, buat entry baru dengan tipe **Employee Receivable Payment**.
4. Setiap cicilan masuk ke bank sebagai **credit** dan otomatis mengurangi total kasbon di Equity.

### Annual Closing
1. Input annual closing.
2. Sistem otomatis membuat:
   - Retained Earnings **increase**
   - Current Year Profit **decrease**
3. Tidak ada transaksi bank.

## Lokasi Kode Penting
- Model: `app/Models/EquityEntry.php`
- Controller: `app/Http/Controllers/AdminKeuangan/EquityController.php`
- Migration: `database/migrations/2026_02_01_000000_create_equity_entries_table.php`
- COA tambahan: `database/migrations/2026_02_01_000001_add_equity_accounts.php`
- UI: `resources/js/Pages/Admin/AdminKeuangan/Equity/`
- Sidebar: `resources/js/Pages/Admin/AdminKeuangan/Components/SidebarNavigation.vue`
- Financial Position: `app/Services/FinancialPositionService.php`
- Bank Balance deposit: `app/Http/Controllers/AdminKeuangan/BankBalanceController.php`

## Alur Contoh
1. **Opening Balance Modal Disetor**
   - Entry: `paid_in_capital`, `is_opening = true`, `affects_bank = false`.
2. **Prive Dibayar via Bank**
   - Entry: `dividend_prive`, `affects_bank = true`, pilih bank.
   - Sistem membuat transaksi bank debit.
3. **Kasbon dicatat lalu dicicil**
   - Entry kasbon: `management_loan`, `affects_bank = true` (bank debit).
   - Setiap cicilan: `management_loan_repayment`, `affects_bank = true` (bank credit).
