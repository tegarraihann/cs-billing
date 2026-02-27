# Dokumentasi Fitur Invoice Tambahan

## Ringkasan
Fitur `Invoice Tambahan` digunakan untuk membuat tagihan baru pada SO yang sudah memiliki invoice sebelumnya, termasuk ketika invoice sebelumnya sudah lunas.

Tujuan utama:
- menjaga invoice lama tetap final (tidak diubah),
- menyediakan dokumen tagihan tambahan terpisah,
- menjaga audit trail finance tetap bersih.

## Kapan Dipakai
Gunakan `Invoice Tambahan` jika:
- ada biaya/tagihan baru setelah invoice existing dibuat,
- customer harus ditagih kembali tanpa membuka invoice lama,
- tim finance membutuhkan dokumen terpisah untuk kebutuhan audit.

## Aturan Bisnis
- Invoice existing (`main/reimbursement/combined`) tidak diubah.
- Invoice tambahan dibuat sebagai dokumen baru.
- Setiap invoice tambahan punya nomor unik berurutan per SO.
- Pembayaran invoice tambahan tetap melalui alur AR existing.
- Status lunas invoice lama tidak berubah karena adanya invoice tambahan.

## Perilaku Sistem
### Pembuatan
- User memilih SO target.
- User klik aksi `Buat Invoice Tambahan`.
- User mengisi alasan tambahan dan item tambahan.
- Sistem menyimpan invoice baru dengan penanda invoice tambahan.

### Penomoran
- Nomor invoice tambahan menggunakan suffix urutan per SO.
- Contoh: `...-ADD1`, `...-ADD2`, dst.

### AR/AP
- AR untuk invoice tambahan otomatis terbentuk menggunakan mekanisme existing.
- Pembayaran tetap dicatat di modul AR.
- Jika ada item operational cost tambahan, AP mengikuti flow existing.

### Tampilan
- Invoice tambahan ditampilkan terpisah dari invoice utama/reimbursement pada halaman SO.
- Pada list invoice, invoice tambahan bisa difilter agar tidak tercampur.

## Data yang Perlu Ditandai
Untuk membedakan dari invoice biasa, invoice tambahan membawa metadata:
- `is_additional`
- `additional_sequence`
- `base_invoice_id` (opsional, bila perlu referensi invoice dasar)
- `additional_reason`

## Dampak ke Fitur Existing
- Tidak mengubah flow pembuatan invoice existing.
- Tidak mengubah histori pembayaran invoice lama.
- Tidak mengubah aturan filter item paid pada flow existing.

## Batasan
- Invoice tambahan bukan alat untuk memperbaiki nominal invoice lama.
- Jika ada salah input pada invoice lama, tetap gunakan proses koreksi sesuai prosedur yang berlaku.

## Contoh Skenario
1. Invoice utama SO sudah `paid`.
2. Muncul biaya admin tambahan setelah proses selesai.
3. Finance membuat `Invoice Tambahan` baru.
4. Customer membayar invoice tambahan tersebut.
5. Invoice utama tetap `paid`, invoice tambahan punya lifecycle sendiri (`sent/partial/paid`).
