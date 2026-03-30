# Finance Function Rulebook

Tanggal: 30 Maret 2026
Scope: Modul finance yang sudah diaudit
Status: Draft kerja

## Tujuan

Dokumen ini menjadi acuan resmi untuk:

- aturan bisnis
- perilaku sistem saat ini
- gap implementasi
- keputusan teknis yang sudah diambil

Dokumen ini sengaja dibuat dalam format rulebook agar 1 file bisa menampung banyak rule tanpa menjadi berantakan.

## Cara Baca

Setiap rule memakai struktur tetap:

1. `Fungsi`
2. `Tujuan`
3. `Trigger`
4. `Aturan Bisnis`
5. `Perilaku Sistem Saat Ini`
6. `Dampak`
7. `Gap / Catatan`

## Istilah

- `SO`: Sales Order
- `Invoice`: tagihan customer
- `AR`: Account Receivable / piutang
- `AP`: Account Payable / hutang
- `FP`: Financial Position
- `VAT Payable`: pajak keluaran / kewajiban pajak
- `VAT Receivable`: pajak masukan / pengurang setoran pajak

---

## Ringkasan Aturan Pajak

### Kelompok VAT Payable

1. `VAT PAYABLE 11%`
2. `VAT PAYABLE 1.1%`
3. `VAT PAYABLE PPH23 0.5% / 2%`

### Kelompok VAT Receivable

1. `VAT RECEIVABLE 11%`
2. `VAT RECEIVABLE 1.1%`
3. `VAT RECEIVABLE PPH23 0.5% / 2%`

### Makna Bisnis

- `VAT Payable`
  - pajak keluaran
  - nantinya disetor ke pajak
- `VAT Receivable`
  - pajak masukan
  - nantinya mengurangi setoran pajak

---

## Rule 01 - Sales Order Sebagai Sumber Data Utama

### Fungsi

Sales Order

### Tujuan

Menetapkan bahwa rincian biaya operasional berasal dari SO, lalu diturunkan ke modul lain.

### Trigger

- create SO
- edit SO
- sync vendor breakdown
- generate invoice dari SO

### Aturan Bisnis

1. `vendor_breakdown` adalah sumber utama biaya vendor.
2. `reimbursement_items` adalah sumber utama reimbursement.
3. Invoice harus diturunkan dari SO.
4. SO yang sudah punya turunan ke invoice / AR / AP tidak boleh diubah sembarangan.

### Perilaku Sistem Saat Ini

1. SO menyimpan:
   - `vendor_breakdown`
   - `reimbursement_items`
2. Perubahan SO dapat mempengaruhi:
   - `sales_order_vendor_items`
   - `invoice_items`
   - `AR`
   - `AP`

### Dampak

Kalau rincian SO diubah, yang wajib dicek ulang:

- invoice items
- total invoice
- AR
- AP
- AP components

### Gap / Catatan

- Auto-hydration `Invoice -> SO` pada flow edit sudah dinonaktifkan agar SO tidak terisi balik otomatis dari invoice.

---

## Rule 02 - Invoice Diturunkan dari SO

### Fungsi

Invoice

### Tujuan

Menetapkan bahwa invoice adalah turunan dari SO dan menjadi dasar pembentukan AR.

### Trigger

- create invoice
- edit invoice
- sync invoice items

### Aturan Bisnis

1. Invoice mengambil data utama dari SO.
2. VAT pada invoice menjadi dasar posting `VAT Payable` di AR.
3. Invoice yang sudah valid menjadi dasar pembentukan AR.

### Perilaku Sistem Saat Ini

1. Invoice menyimpan:
   - `subtotal`
   - `vat_rate`
   - `vat_amount`
   - `total`
2. VAT invoice dianggap valid jika:
   - `vat_amount > 0`
   - `vat_rate > 0`
3. Status posting VAT invoice disimpan di:
   - `vat_posted_at`
   - `vat_posted_account_id`

### Dampak

- Perubahan invoice mempengaruhi AR.
- Perubahan invoice tidak boleh membuat SO menjadi sumber sekunder.

### Gap / Catatan

- Invoice tetap menjadi dokumen customer-facing.
- SO tetap harus dianggap sumber biaya operasional.

---

## Rule 03 - Account Receivable Mewakili Tagihan Customer

### Fungsi

Account Receivable

### Tujuan

Menetapkan bahwa AR adalah representasi tagihan ke customer.

### Trigger

- create AR dari invoice
- create pre-invoice AR dari SO
- record payment AR

### Aturan Bisnis

1. AR mewakili kewajiban customer ke perusahaan.
2. Pembayaran customer mengurangi outstanding AR.
3. AR dapat terdiri dari beberapa komponen.

### Perilaku Sistem Saat Ini

1. AR bisa terbentuk dari:
   - invoice customer
   - pre-invoice dari SO
   - opening receivable
2. AR invoice disinkronkan dari item invoice.
3. Pre-invoice AR dapat membaca reimbursement dari SO secara agregat.

### Dampak

- Kesalahan invoice akan mempengaruhi AR.
- Kesalahan reimbursement pre-invoice akan mempengaruhi outstanding AR.

### Gap / Catatan

- Untuk reimbursement pre-invoice, pembacaan saat ini masih agregat.

---

## Rule 04 - Account Payable Mewakili Kewajiban ke Vendor

### Fungsi

Account Payable

### Tujuan

Menetapkan bahwa AP adalah representasi hutang ke vendor.

### Trigger

- generate AP dari SO
- generate AP dari reimbursement
- opening payable
- add component manual
- sync components

### Aturan Bisnis

1. AP mewakili kewajiban ke vendor.
2. Pembayaran vendor mengurangi outstanding AP.
3. AP dapat terdiri dari beberapa komponen.

### Perilaku Sistem Saat Ini

AP saat ini mengenal komponen:

- `vendor_payment`
- `reimbursement`
- `vat_reimbursement`
- `operational_cost`

Sumber AP dapat berasal dari:

- `vendor_breakdown` SO
- `reimbursement_items`
- opening payable
- komponen tambahan manual

### Dampak

- Perubahan SO atau reimbursement dapat mengubah AP.
- Sinkronisasi AP yang salah dapat merusak histori komponen.

### Gap / Catatan

- Kasus `STORAGE` dan `STORAGE 2` membuktikan komponen paid harus dipertahankan sebagai histori.
- Matching reimbursement sekarang sudah dipisahkan per `reimbursement_item_id` agar item baru tidak menimpa histori lama.

---

## Rule 05 - Reimbursement Harus Punya Histori Jelas

### Fungsi

Reimbursement

### Tujuan

Menjaga agar reimbursement tidak hilang jejak saat sudah dibayar atau disinkronkan ulang.

### Trigger

- create reimbursement item
- sync ke AP
- sync ke AR
- record payment reimbursement

### Aturan Bisnis

1. Reimbursement bisa muncul di SO.
2. Reimbursement bisa ikut ke invoice customer.
3. Reimbursement bisa membentuk AP jika memang ada vendor terkait.
4. Reimbursement yang sudah paid tetap harus terlihat dalam histori.

### Perilaku Sistem Saat Ini

1. Reimbursement punya identitas item sendiri.
2. Reimbursement di AP yang sudah paid sekarang dipertahankan sebagai histori komponen.

### Dampak

- Histori AP akan salah kalau reimbursement paid ditimpa reimbursement baru.

### Gap / Catatan

- Patch pencegahan overwrite histori reimbursement sudah dipasang.

---

## Rule 06 - POST VAT di AR

### Fungsi

Posting VAT dari piutang ke Financial Position

### Tujuan

Mencatat pajak keluaran dan potongan pajak customer ke akun FP yang tepat.

### Trigger

- AR / invoice customer lunas
- ada VAT invoice
- atau ada potongan PPh23 dari customer

### Aturan Bisnis

#### A. VAT Payable 11% / 1.1%

1. Berasal dari invoice customer.
2. Muncul di invoice dan AR.
3. Dipost setelah customer melunasi invoice / AR.
4. Dicatat sebagai `VAT Payable` karena itu pajak keluaran.

#### B. VAT Receivable PPh23 0.5% / 2%

1. Berasal dari piutang yang dipotong customer.
2. Customer tidak membayar full karena ada potongan pajak.
3. Sisa outstanding pajak dipost sebagai `VAT Receivable PPh23`.

### Perilaku Sistem Saat Ini

#### AR - VAT Payable

`Post VAT Payable` di AR hanya boleh dilakukan jika:

1. AR status `paid`
2. invoice status `paid`
3. invoice memiliki VAT
4. VAT invoice belum pernah dipost

Posting masuk ke:

- `2110` untuk 11%
- `2111` untuk 1.1%

#### AR - PPh23 Receivable

`Post VAT Receivable PPh23` dipakai saat:

1. payment customer tidak full
2. outstanding mewakili potongan pajak
3. outstanding tersebut dipindahkan ke FP

### Dampak

- Posting VAT yang salah di AR akan merusak posisi pajak keluaran / receivable tax.

### Gap / Catatan

- Untuk AR, aturan sistem saat ini pada dasarnya sudah sejalan dengan aturan bisnis.

---

## Rule 07 - POST VAT di AP

### Fungsi

Posting VAT dari hutang vendor ke Financial Position

### Tujuan

Mencatat pajak masukan vendor dan potongan pajak vendor ke akun FP yang tepat.

### Trigger

- hutang vendor dibayar
- ada pajak vendor pada komponen hutang
- atau ada potongan PPh23 pada hutang vendor

### Aturan Bisnis

#### A. VAT Receivable 11% / 1.1%

1. Berasal dari tagihan vendor ke kita.
2. Vendor mengenakan pajak ke kita.
3. Kita bayar vendor full.
4. Nilai pajak vendor dipost ke FP sebagai `VAT Receivable`.

#### B. VAT Payable PPh23 0.5% / 2%

1. Berasal dari tagihan vendor yang dipotong pajak.
2. Vendor tidak dibayar full.
3. Selisih pajak dipost ke FP sebagai `VAT Payable PPh23`.

### Perilaku Sistem Saat Ini

#### AP - VAT Receivable

Saat ini `Post VAT Receivable` di AP hanya enable jika komponen:

1. `component_type = vat_reimbursement`
2. status `paid`
3. outstanding `0`
4. belum pernah dipost

Posting masuk ke:

- `1230` untuk 11%
- `1231` untuk 1.1%

#### AP - VAT Payable

Saat ini `Post VAT Payable` di AP enable pada level payable jika:

1. masih ada outstanding
2. status belum `paid`
3. belum pernah dipost

#### AP - PPh23 Payable

`Post VAT Payable PPh23 0.5% / 2%` dipakai saat:

1. hutang vendor tidak dibayar full
2. outstanding mewakili potongan pajak
3. outstanding itu dipost ke FP

### Dampak

- Jika rule enable salah, user bisa diarahkan ke akun pajak yang salah.

### Gap / Catatan

Untuk case bisnis client:

- vendor mengenakan pajak ke kita
- kita bayar vendor full
- pajak vendor harus dipost sebagai `VAT Receivable`

maka perilaku sistem saat ini **belum sepenuhnya sesuai** jika komponen vendor tax tidak dibuat sebagai `vat_reimbursement`.

Kesimpulan:

1. aturan bisnis client valid
2. implementasi AP saat ini masih terlalu sempit
3. pada case vendor charge tax, yang semestinya enable adalah `VAT Receivable`, bukan `VAT Payable`

---

## Rule 08 - Paid Data Tidak Boleh Diubah Sembarangan

### Fungsi

Locking / proteksi histori pembayaran

### Tujuan

Menjaga agar data yang sudah punya histori payment tidak rusak saat diedit atau disinkronkan ulang.

### Trigger

- edit SO
- edit reimbursement
- sync AP
- sync komponen

### Aturan Bisnis

1. Item yang sudah paid tidak boleh hilang historinya.
2. Item paid tidak boleh diganti sembarangan.
3. Jika ada perubahan, histori tetap harus terbaca.

### Perilaku Sistem Saat Ini

Sudah ada mekanisme lock untuk mencegah:

- item paid dihapus
- item paid diganti asal
- histori payment hilang

Area utama:

- reimbursement
- other cost
- komponen AP tertentu

### Dampak

- Jika locking gagal, histori pembayaran bisa collapse atau tertimpa.

### Gap / Catatan

- Kasus paid reimbursement yang tertimpa item baru sudah diidentifikasi dan dipatch.

---

## Rule 09 - Alur Sinkronisasi Harus Satu Arah

### Fungsi

Aturan arsitektur alur data

### Tujuan

Menjaga konsistensi sumber data antar modul finance.

### Trigger

- create / edit SO
- create / edit invoice
- sync AR
- sync AP

### Aturan Bisnis

Alur utama harus:

- `SO -> Invoice`
- `Invoice -> AR`
- `SO / reimbursement -> AP`

### Perilaku Sistem Saat Ini

1. SO adalah sumber utama rincian biaya.
2. Invoice adalah turunan dari SO.
3. AR adalah turunan dari invoice atau pre-invoice rule.
4. AP adalah turunan dari vendor breakdown, reimbursement, opening, atau komponen manual.

### Dampak

- Jika ada alur balik seperti `Invoice -> SO`, data sumber bisa tercampur.

### Gap / Catatan

Larangan utama:

1. Invoice tidak boleh mengisi balik SO secara otomatis di flow normal edit.
2. Komponen historis paid tidak boleh ditimpa item baru.
3. Cleanup data tidak boleh dilakukan hanya di satu layer jika data turunan lain sudah terbentuk.

---

## Rule 10 - Cleanup Data Harus End-to-End

### Fungsi

Perbaikan data yang sudah salah

### Tujuan

Mencegah cleanup setengah jalan yang membuat data antar modul tidak sinkron.

### Trigger

- ada data salah di SO
- data sudah turun ke invoice / AR / AP
- perlu repair atau cleanup

### Aturan Bisnis

Kalau data salah sudah menyentuh:

- SO
- Invoice
- AR
- AP
- AP Components

maka cleanup harus dilakukan end-to-end.

### Perilaku Sistem Saat Ini

Cleanup yang aman minimal harus memeriksa:

1. sumber data utama
2. data turunan
3. total header
4. status paid / unpaid
5. link histori pembayaran

### Dampak

- Cleanup hanya di SO tidak aman jika invoice / AR / AP sudah terbentuk.

### Gap / Catatan

- Kasus `SO 2602035005` menjadi contoh bahwa cleanup harus dilihat sampai ke invoice, AR, AP, dan AP component.

---

## Known Gap per 30 Maret 2026

### Sudah Diperbaiki / Dicegah

1. Auto-hydration `Invoice -> SO` di edit flow SO sudah dinonaktifkan.
2. Komponen reimbursement AP yang sudah paid sekarang dipertahankan sebagai histori.
3. Reimbursement baru vendor yang sama tidak boleh lagi menimpa komponen historis lama.

### Masih Perlu Keputusan / Patch Lanjutan

1. Rule enable `VAT Receivable` di AP masih terlalu sempit untuk case vendor charge tax.
2. Dokumentasi di file ini masih fokus pada area finance yang sudah diaudit.

---

## Cara Update Dokumen Ini

Kalau ada rule baru, tambahkan dengan format:

1. `Rule XX - Nama Rule`
2. `Fungsi`
3. `Tujuan`
4. `Trigger`
5. `Aturan Bisnis`
6. `Perilaku Sistem Saat Ini`
7. `Dampak`
8. `Gap / Catatan`

## Kesimpulan

Dokumen ini adalah rulebook finance versi awal yang dipakai untuk:

- menyamakan bahasa bisnis dan sistem
- membedakan rule valid vs bug
- menjadi acuan saat audit, patch, dan cleanup data
