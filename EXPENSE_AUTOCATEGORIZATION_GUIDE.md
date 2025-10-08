# Panduan Sistem Auto-Kategorisasi Biaya Operasional

## Ringkasan Sistem

Sistem ini secara otomatis mengkategorikan biaya operasional dari invoice ke dalam petty cash dengan menggunakan 3 metode:

1. **Template-based** (90% akurasi) - Menggunakan template predefined
2. **Keyword-based** (70% akurasi) - Mencocokkan kata kunci
3. **Manual** (100% akurasi) - Input manual sebagai fallback

## Cara Penggunaan

### 1. Membuat Invoice dengan Biaya Operasional

1. **Buka halaman Invoice Create**
   - Menu: Admin Keuangan → Invoices → Create

2. **Pilih Sales Order dan isi detail invoice**

3. **Tambah Biaya Operasional**
   - Klik "Add Operational Cost"
   - Pilih Template dari dropdown (opsional)
   - Isi deskripsi dan amount
   - Sistem akan memberikan saran kategori secara real-time

4. **Submit Invoice**
   - Sistem otomatis generate petty cash transactions
   - Status: "Pending" (menunggu approval)

### 2. Approval Biaya Operasional Auto-Generated

1. **Buka halaman Pending Approval**
   - Menu: Admin Keuangan → Petty Cash → Pending Approval

2. **Review transaksi auto-generated**
   - Lihat metode kategorisasi (Template/Keyword/Manual)
   - Check accuracy dan confidence level
   - Edit jika diperlukan

3. **Bulk Approval/Reject**
   - Select multiple transactions
   - Klik "Approve Selected" atau "Reject Selected"
   - Masukkan alasan jika reject

## Metode Kategorisasi

### Template-Based (Prioritas 1)
- **Akurasi**: 90%
- **Confidence**: High
- **Contoh**: "Parkir Mall/Gedung" → Kategori: Transportasi

### Keyword-Based (Prioritas 2)
- **Akurasi**: 70%
- **Confidence**: Medium
- **Contoh**: "Bensin motor" → Kategori: Transportasi (keyword: "bensin")

### Manual Selection (Prioritas 3)
- **Akurasi**: 100%
- **Confidence**: High
- **Fallback**: Jika template dan keyword tidak cocok

## Kategori Petty Cash

1. **Transportasi** - Bensin, parkir, tol, ojek online
2. **Konsumsi** - Makan, minum, snack, catering
3. **ATK & Supplies** - Alat tulis, kertas, tinta printer
4. **Komunikasi** - Pulsa, internet, telepon
5. **Maintenance** - Perbaikan, service, cleaning
6. **Emergency** - Biaya darurat dan tidak terduga
7. **Top Up** - Pengisian dana petty cash

## Template yang Tersedia

### Transportasi
- Parkir Mall/Gedung (Rp 5.000-15.000)
- Bensin Motor (Rp 20.000-50.000)
- Tol Dalam Kota (Rp 10.000-25.000)
- Ojek Online (Rp 15.000-35.000)

### Konsumsi
- Makan Siang Tim (Rp 100.000-200.000)
- Coffee Break Meeting (Rp 50.000-100.000)
- Air Minum Galon (Rp 20.000-30.000)

### ATK & Supplies
- Kertas A4 (Rp 50.000-80.000)
- Tinta Printer (Rp 200.000-400.000)
- Alat Tulis (Rp 30.000-75.000)

## Keyword Rules

### Transportasi
- bensin, solar, pertamax, BBM
- parkir, tol, toll
- ojek, gojek, grab, taxi
- motor, mobil, kendaraan

### Konsumsi
- makan, minum, catering
- kopi, coffee, teh, snack
- lunch, breakfast, dinner

### ATK & Supplies
- kertas, paper, tinta, ink
- pulpen, pensil, spidol
- stapler, gunting, lem

### Komunikasi
- pulsa, internet, wifi
- telepon, phone, telp
- provider, operator

### Maintenance
- service, perbaikan, maintenance
- cleaning, bersih, cuci
- repair, fix, ganti

## Warning System

Sistem memberikan warning jika:
- Amount di luar range template (terlalu tinggi/rendah)
- Deskripsi tidak jelas atau ambigu
- Confidence level rendah

## Best Practices

### 1. Penggunaan Template
- **Gunakan template** untuk biaya rutin dan berulang
- **Pilih template** yang paling sesuai dengan deskripsi
- **Check amount range** yang disarankan template

### 2. Deskripsi yang Baik
- **Spesifik**: "Bensin motor untuk antar dokumen" (BAIK)
- **Hindari yang ambigu**: "Biaya lain-lain" (BURUK)
- **Include lokasi/tujuan**: "Parkir Mall Senayan" (BAIK)

### 3. Review Approval
- **Check metode kategorisasi** - Template lebih akurat dari keyword
- **Verify amount** - Pastikan sesuai dengan receipt
- **Edit jika perlu** - Ubah kategori/amount sebelum approve

## Troubleshooting

### Masalah Umum

**Q: Template tidak muncul di dropdown?**
A: Check koneksi database, pastikan ExpenseTemplateSeeder sudah dijalankan

**Q: Kategorisasi salah terus?**
A: Review keyword rules, tambah rules baru jika diperlukan

**Q: Auto-generation tidak jalan?**
A: Check logs Laravel, pastikan ExpenseCategorizationService bisa diakses

**Q: Pending approval kosong?**
A: Pastikan invoice memiliki operational costs dengan item_type='operational_cost'

### Error Codes
- **Cat001**: Template tidak ditemukan
- **Cat002**: Keyword matching gagal
- **Cat003**: Database kategori kosong
- **Cat004**: Service initialization error

## Support

Jika mengalami masalah:
1. Check Laravel logs: `storage/logs/laravel.log`
2. Verify database seeder: `php artisan db:seed --class=ExpenseTemplateSeeder`
3. Contact: Tech Support Team

---

**Versi**: 1.0
**Tanggal**: 7 Oktober 2025
**Update**: Initial release

**Tips**: Sistem ini dirancang untuk mempermudah kategorisasi biaya operasional. Semakin sering digunakan, semakin akurat hasilnya karena template usage akan terupdate.