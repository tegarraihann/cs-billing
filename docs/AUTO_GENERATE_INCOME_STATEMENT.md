# Auto Generate Income Statement Bulanan

## Ringkasan

Fitur ini membuat periode `Income Statement` bulanan secara otomatis setiap awal bulan, tanpa perlu dibuat manual dari halaman admin.

Nama periode yang dihasilkan mengikuti format:

`INCOME STATEMENT {BULAN} {TAHUN}`

Contoh:

- `INCOME STATEMENT APRIL 2026`
- `INCOME STATEMENT MEI 2026`

## Tujuan

Fitur ini dibuat agar:

- periode bulanan `Income Statement` selalu tersedia tepat waktu
- tim finance tidak perlu membuat periode bulanan secara manual
- ketika periode dibuat, entry otomatis langsung digenerate seperti alur manual yang sudah ada

## Cara Kerja

Sistem menjalankan command berikut:

```bash
php artisan profit-loss:ensure-monthly
```

Command ini akan:

1. Menentukan bulan target.
2. Mengecek apakah periode bulanan bulan tersebut sudah ada.
3. Jika belum ada, sistem akan membuat periode baru.
4. Nama periode akan otomatis dibuat dengan format:
   `INCOME STATEMENT {BULAN} {TAHUN}`
5. Setelah periode dibuat, sistem langsung menjalankan generate entry otomatis.
6. Jika periode bulan tersebut sudah ada, command akan berhenti tanpa membuat duplikat.

## Sifat Penting

Fitur ini bersifat **idempotent**, artinya:

- aman dijalankan berulang kali
- tidak akan membuat periode ganda untuk bulan yang sama

## File Terkait

- Command:
  [EnsureMonthlyProfitLossPeriod.php](c:\laragon\www\OfficeManagement\app\Console\Commands\EnsureMonthlyProfitLossPeriod.php)
- Service:
  [ProfitLossPeriodService.php](c:\laragon\www\OfficeManagement\app\Services\ProfitLossPeriodService.php)
- Scheduler:
  [console.php](c:\laragon\www\OfficeManagement\routes\console.php)

## Jadwal Otomatis

Scheduler Laravel sudah diatur untuk menjalankan command ini:

- setiap tanggal `1`
- pukul `00:20`

Jadwal internal Laravel:

```php
Schedule::command('profit-loss:ensure-monthly --user-id=1')->monthlyOn(1, '00:20');
```

Catatan:

- `--user-id=1` dipakai sebagai `created_by` default saat periode dibuat otomatis.
- Jika ingin user lain menjadi pencatat default, ubah nilai `user-id` pada scheduler tersebut.

## Command Manual

### 1. Generate / cek bulan berjalan

```bash
php artisan profit-loss:ensure-monthly
```

### 2. Simulasi tanpa menyimpan data

```bash
php artisan profit-loss:ensure-monthly --dry-run
```

### 3. Generate untuk bulan tertentu

```bash
php artisan profit-loss:ensure-monthly --month=4 --year=2026
```

### 4. Simulasi untuk bulan tertentu

```bash
php artisan profit-loss:ensure-monthly --month=4 --year=2026 --dry-run
```

### 5. Tentukan user pencatat

```bash
php artisan profit-loss:ensure-monthly --month=4 --year=2026 --user-id=3
```

## Setup Cronjob di Server

Fitur ini **tidak akan berjalan otomatis** hanya dengan deploy code.

Supaya scheduler Laravel berjalan, server harus menjalankan:

```bash
php artisan schedule:run
```

secara berkala lewat cronjob.

### Kenapa Perlu Cronjob

Laravel scheduler hanya menyimpan jadwal di code.  
Tanpa cronjob, jadwal tersebut tidak pernah dipanggil oleh server.

Jadi:

- scheduler sudah ada di aplikasi
- tetapi cronjob tetap wajib diaktifkan di hosting

## Setup Cronjob Linux / VPS

### 1. Masuk ke server

Login ke server via SSH.

### 2. Buka crontab

```bash
crontab -e
```

### 3. Tambahkan cron Laravel scheduler

Gunakan format berikut:

```bash
* * * * * php /path/to/project/artisan schedule:run >> /dev/null 2>&1
```

Contoh:

```bash
* * * * * php /home/username/public_html/OfficeManagement/artisan schedule:run >> /dev/null 2>&1
```

Atau jika perlu memakai path PHP tertentu:

```bash
* * * * * /usr/local/bin/php /home/username/public_html/OfficeManagement/artisan schedule:run >> /dev/null 2>&1
```

### 4. Simpan crontab

Setelah disimpan, cron akan menjalankan Laravel scheduler setiap menit.

### 5. Cara kerja setelah itu

- setiap menit cron memanggil `schedule:run`
- Laravel memeriksa semua jadwal internal
- pada tanggal `1` pukul `00:20`, command auto-generate Income Statement akan dijalankan otomatis

## Setup Cronjob di cPanel

### 1. Login ke cPanel

Masuk ke panel hosting Anda.

### 2. Buka menu `Cron Jobs`

Biasanya ada di bagian `Advanced`.

### 3. Tambahkan cron baru

Gunakan setting:

- Minute: `*`
- Hour: `*`
- Day: `*`
- Month: `*`
- Weekday: `*`

Command:

```bash
php /home/USERNAME/public_html/OfficeManagement/artisan schedule:run >> /dev/null 2>&1
```

Jika server meminta path PHP lengkap, gunakan:

```bash
/usr/local/bin/php /home/USERNAME/public_html/OfficeManagement/artisan schedule:run >> /dev/null 2>&1
```

### 4. Simpan cron job

Setelah itu, scheduler Laravel akan aktif.

## Verifikasi Setelah Deploy

### 1. Cek command tersedia

```bash
php artisan list | grep profit-loss:ensure-monthly
```

Jika `grep` tidak tersedia:

```bash
php artisan list
```

Lalu cari command:

`profit-loss:ensure-monthly`

### 2. Jalankan simulasi

```bash
php artisan profit-loss:ensure-monthly --dry-run
```

Pastikan output menampilkan:

- period code
- period name
- tanggal awal dan akhir

### 3. Uji bulan tertentu

```bash
php artisan profit-loss:ensure-monthly --month=4 --year=2026 --dry-run
```

Contoh output yang benar:

- `Period Code : PL-M-2026-04`
- `Period Name : INCOME STATEMENT APRIL 2026`

### 4. Jalankan manual sekali jika diperlukan

Jika ingin langsung membuat periode tanpa menunggu scheduler:

```bash
php artisan profit-loss:ensure-monthly --month=4 --year=2026
```

## Hal yang Perlu Diperhatikan

### 1. Cronjob harus aktif terus

Kalau cronjob mati, fitur otomatis tidak akan jalan.

### 2. Pastikan path `php` benar

Jika path PHP salah, scheduler tidak akan jalan.

### 3. Pastikan path project benar

Path ke `artisan` harus sesuai lokasi deploy.

### 4. Pastikan user ID valid

Scheduler default memakai:

```bash
--user-id=1
```

Pastikan user dengan ID tersebut memang ada.

### 5. Tidak membuat periode ganda

Jika periode bulan yang sama sudah ada, command hanya akan skip.

## Troubleshooting

### Scheduler tidak jalan

Cek manual:

```bash
php artisan schedule:run
```

Jika command ini berhasil saat dijalankan manual tetapi tidak otomatis, masalahnya ada di cronjob server.

### Periode tidak dibuat

Kemungkinan:

- periode bulan tersebut sudah ada
- cronjob tidak aktif
- path PHP salah
- path project salah

### Ingin ganti nama format

Saat ini format nama sudah dikunci menjadi:

`INCOME STATEMENT {BULAN} {TAHUN}`

Jika ingin diubah, update logic di:

[ProfitLossPeriodService.php](c:\laragon\www\OfficeManagement\app\Services\ProfitLossPeriodService.php)

## Ringkasan Singkat untuk Operasional

1. Deploy code.
2. Pastikan cronjob `schedule:run` aktif setiap menit.
3. Scheduler Laravel akan otomatis membuat periode bulanan setiap tanggal 1 pukul 00:20.
4. Nama periode akan otomatis menjadi:
   `INCOME STATEMENT {BULAN} {TAHUN}`
5. Jika bulan tersebut sudah ada, sistem akan skip dan tidak membuat duplikat.
