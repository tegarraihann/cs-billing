# Prepaid Rent Automation

Fitur ini otomatis membebankan biaya sewa dibayar dimuka per bulan berdasarkan data top-up prepaid rent.

## Alur
- Catat pembayaran sewa di `/admin-keuangan/prepaid-rent` (top-up) dengan mengisi periode sewa dan `amortization_months`.
- Sistem membuat jadwal amortisasi per bulan (prepaid_rent_schedules).
- Cron/command `prepaid-rent:amortize` berjalan harian (lihat jadwal di `routes/console.php`) lalu:
  - Membuat transaksi penyusutan (type `amortization`) untuk periode yang sudah jatuh tempo dan belum diposting.
  - Menandai jadwal sebagai posted, menyimpan referensi transaksi.

## Command manual
```
php artisan prepaid-rent:amortize
```
Opsional override tanggal untuk backfill/testing:
```
php artisan prepaid-rent:amortize --date=2025-12-01
```

## Cron di hosting
Pastikan cron memanggil scheduler Laravel tiap menit:
```
* * * * * /usr/bin/php /path/to/project/artisan schedule:run >> /dev/null 2>&1
```
Scheduler akan menjalankan `prepaid-rent:amortize` setiap jam 01:00 server time.

## Catatan
- Jadwal bersifat idempotent: kombinasi top-up + bulan/tahun unik. Posting ulang aman.
- Tanggal amortisasi default ke akhir bulan periode terkait.
- Jika `rental_start_date` kosong, periode mulai diambil dari tanggal transaksi.
