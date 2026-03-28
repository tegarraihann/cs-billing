# Pending Status AR/AP

Tanggal: 28 Maret 2026

## Status Umum

- Audit **AP/hutang** saat ini **ditahan sementara**
- Alasan:
  - tim finance menyampaikan ada beberapa hutang yang **memang tidak boleh dimasukkan ke sistem**
  - beberapa poin lain masih menunggu konfirmasi **pihak ketiga**
  - update lanjutan diperkirakan baru ada **Senin, 30 Maret 2026**

- Audit **AR/piutang** masih bisa dilanjutkan, tetapi ada beberapa poin yang juga masih menunggu klarifikasi client

## Perbaikan yang Sudah Selesai

### AP

- Duplicate opening payable Shenzhen invoice `SML25101357` sudah dibersihkan
  - `AP#341` dipertahankan
  - `AP#552` dihapus

- Opening payable Ridwan yang stale sudah ditutup
  - `AP#349` sekarang `paid`
  - outstanding `0`

- Transaksi general expense `MONTHLY CARD Rp 6.500` sudah dipindahkan dari **BCA** ke **Mandiri**
  - `BankTx#711`
  - referensi `general_expense#87`

### AR

- Cleanup opening AR duplicate/split lama sudah dijalankan
  - `2512-297019`
    - `AR#170` dan `AR#171` dihapus
    - `AR#197` dipertahankan
  - `2512-298020`
    - `AR#173` dan `AR#174` dihapus
    - `AR#198` dipertahankan

## Posisi Audit AR Terbaru

- Total piutang client terbaru: `Rp 421.381.545`
- Total AR raw di sistem: `Rp 398.194.097`
- Selisih saat ini: `Rp 23.187.448`

### Fokus utama AR

- customer: `PT Citra Perdana Putra`
- selisih customer ini: `Rp 24.442.661`

### Catatan penting AR

- Banyak baris CPP sudah match langsung dengan sistem
- Selisih CPP sekarang lebih mengarah ke:
  - beda basis pembacaan sheet vs outstanding aktual sistem
  - bukan lagi duplikasi stale seperti kasus sebelumnya

- SO `2512-302024` ada di sistem, tetapi:
  - tercatat sebagai `AR#97`
  - amount `Rp 7.998.100`
  - status `paid`
  - outstanding `0`

- Jadi angka sheet client `2512-302024 = Rp 26.688.087` **tidak cocok langsung** dengan record SO yang ada di sistem saat ini

## Posisi Audit AP Terbaru

- Total hutang client terbaru: `Rp 242.499.242`
- Total AP raw di sistem: `Rp 181.944.322`
- Selisih raw saat ini: `Rp 60.554.920`

### Catatan penting AP

- Selisih AP **belum bisa dianggap final**
- Tim finance sudah menyampaikan ada beberapa hutang yang **memang tidak boleh dimasukkan ke sistem**
- Karena itu beberapa mismatch AP saat ini bisa jadi **bukan bug**, melainkan memang **excluded**

## Item AP yang Statusnya Masih Pending

### 1. Prasetya 2

- total di daftar client: `Rp 97.344.146`
- belum terlihat sebagai outstanding terpisah di sistem
- sudah ditanyakan ke client
- menunggu jawaban apakah:
  - memang harus sudah masuk ke sistem
  - atau memang belum diinput / belum mau dihitung

### 2. Shenzhen

Masih ada 2 item non-opening di sistem yang belum jelas harus dihitung atau tidak:

- `EWILOG2601022022 = Rp 11.900.000`
- `EWILOG2602035005 = Rp 8.500.000`

Selain itu ada 1 beda nominal:

- `EWILOG2601003003`
  - sistem `Rp 7.200.000`
  - sheet client `Rp 6.741.200`
  - selisih `Rp 458.800`

### 3. ABE

- mapping SO ke sistem sudah ketemu
- tetapi nominal outstanding sistem lebih rendah dari sheet client
- status saat ini:
  - **bukan duplikasi**
  - lebih ke beda basis outstanding
- masih menunggu jawaban client apakah acuan yang dipakai:
  - angka sheet
  - atau outstanding aktual sistem

### 4. GMT Plus 8

- SO `2603-048002` ada di sistem
- tetapi payable/vendor item `GMT PLUS 8 SDN BHD` belum terbentuk di sistem
- masih menunggu jawaban client apakah item ini memang harus dimasukkan sebagai hutang

### 5. Mustika

- client:
  - belum jatuh tempo `Rp 5.066.684`
  - sudah jatuh tempo `Rp 5.459.000`
  - total `Rp 10.525.684`

- sistem:
  - `EKA MUSTIKASARI = Rp 11.180.000`
  - `MUSTIKA RAHMAH = Rp 200.000`
  - total `Rp 11.380.000`

- selisih saat ini:
  - `Rp 854.316`

- status:
  - masih pending
  - belum cukup aman untuk cleanup otomatis

## Pertanyaan yang Sudah Dikirim ke Client

### AR

- klarifikasi basis pembacaan CPP:
  - tetap per SO di sheet
  - atau pakai outstanding invoice aktual di sistem

### AP

- `Prasetya 2`
- `Shenzhen`
- `ABE`
- `GMT`

## Instruksi Kerja Sementara

Sampai ada update dari client / pihak ketiga:

1. **Jangan** tambah atau hapus payable lagi
2. **Jangan** ambil keputusan final untuk AP
3. Boleh lanjut analisis **AR** jika ada kebutuhan tambahan
4. Gunakan dokumen ini sebagai titik lanjut saat update masuk pada **Senin, 30 Maret 2026**

## Next Step Saat Update Client Masuk

1. Update status jawaban client untuk:
   - `Prasetya 2`
   - `Shenzhen`
   - `ABE`
   - `GMT`
   - `CPP`
2. Tentukan item mana yang:
   - valid
   - excluded
   - perlu dibentuk di sistem
   - perlu cleanup
3. Baru setelah itu lakukan:
   - repair AP lanjutan jika diperlukan
   - finalisasi rekonsiliasi AR/AP
