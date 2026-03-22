# Audit Opening AR per 13 Maret 2026

## Ringkasan

- Total piutang versi client: `Rp 547.153.200,00`
- Total piutang versi sistem: `Rp 497.943.393,00`
- Selisih: `Rp 49.209.807,00`

Komponen piutang sistem saat ini:

- Opening AR: `Rp 328.580.369,00`
- AR non-opening / transaksi aktif: `Rp 169.363.024,00`

Selisih piutang tidak tampak berasal dari satu duplikasi pasti yang sederhana. Polanya lebih banyak berupa:

1. batch opening AR yang dibuat ulang pada awal Maret
2. beberapa pasangan `SO + invoice` yang muncul lebih dari sekali
3. split record yang perlu diverifikasi ke sheet client

## Temuan Utama

1. Porsi opening AR masih besar, yaitu `Rp 328.580.369,00`
2. Tidak ditemukan duplikasi exact match sederhana pada kombinasi:
   - customer
   - invoice number
   - invoice amount
3. Tetapi ada kelompok record dengan `source_so_number + invoice_number` yang berulang, dan totalnya besar
4. Kelompok berulang terbesar ada pada:
   - `2512-297019 / EWL2512297019`
   - `2512-298020 / EWL2512298020`

## Validasi Tambahan dari Screenshot PDF Client

Setelah screenshot PDF `PIUTANG BELUM JATUH TEMPO` dan `PIUTANG SUDAH JATUH TEMPO` diterima, daftar piutang client sekarang sudah bisa dipastikan lebih jelas.

### Piutang Belum Jatuh Tempo Versi Client

| Customer | SO Number | Nilai Piutang |
|---|---|---:|
| PT CITRA PERDANA PUTRA | 2512-297019 | 27.771.877 |
| PT CITRA PERDANA PUTRA | 2512-298020 | 15.693.000 |
| PT CITRA PERDANA PUTRA | 2512-302024 | 26.688.087 |
| PT CITRA PERDANA PUTRA | 2601-001001 | 11.129.270 |
| PT CITRA PERDANA PUTRA | 2601-002002 | 6.676.409 |
| PT CITRA PERDANA PUTRA | 2601-004004 | 4.588.530 |
| PT CITRA PERDANA PUTRA | 2601-012012 | 4.280.466 |
| PT CITRA PERDANA PUTRA | 2601-013013 | 7.428.848 |
| PT CITRA PERDANA PUTRA | 2601-014014 | 4.430.466 |
| PT CITRA PERDANA PUTRA | 2602-031001 | 7.567.578 |
| PT CITRA PERDANA PUTRA | 2602-032002 | 10.150.304 |
| PT CITRA PERDANA PUTRA | 2602-033003 | 11.858.604 |
| PT JAKARANA TAMA | 2602-037007 | 12.599.507 |
| PT VICTORY ABADI MEGACHEMINDO | 2601-022022 | 29.443.599 |

Total client belum jatuh tempo: `Rp 180.306.545`

### Piutang Sudah Jatuh Tempo Versi Client

| Customer | SO Number | Nilai Piutang |
|---|---|---:|
| PT CITRA PERDANA PUTRA | 2510-231006 | 369.647 |
| PT CITRA PERDANA PUTRA | 2511-251002 | 19.443.626 |
| PT CITRA PERDANA PUTRA | 2511-252003 | 7.657.318 |
| PT CITRA PERDANA PUTRA | 2511-253004 | 18.856.690 |
| PT CITRA PERDANA PUTRA | 2511-254005 | 28.679.033 |
| PT CITRA PERDANA PUTRA | 2511-260011 | 3.803.338 |
| PT CITRA PERDANA PUTRA | 2511-261012 | 4.079.883 |
| PT CITRA PERDANA PUTRA | 2511-266017 | 4.166.952 |
| PT CITRA PERDANA PUTRA | 2511-268019 | 7.596.860 |
| PT CITRA PERDANA PUTRA | 2511-270021 | 5.115.830 |
| PT CITRA PERDANA PUTRA | 2511-271022 | 7.908.812 |
| PT CITRA PERDANA PUTRA | 2511-273024 | 6.311.030 |
| PT CITRA PERDANA PUTRA | 2511-274025 | 15.684.165 |
| PT CITRA PERDANA PUTRA | 2511-276027 | 9.163.062 |
| PT CITRA PERDANA PUTRA | 2512-279001 | 16.599.920 |
| PT CITRA PERDANA PUTRA | 2512-284006 | 4.396.794 |
| PT CITRA PERDANA PUTRA | 2512-290012 | 11.934.188 |
| PT CITRA PERDANA PUTRA | 2512-291013 | 6.277.194 |
| PT CITRA PERDANA PUTRA | 2512-292014 | 13.484.204 |
| PT CITRA PERDANA PUTRA | 2512-293015 | 6.738.330 |
| PT CITRA PERDANA PUTRA | 2512-296018 | 21.385.729 |
| PT OMNI TRANS LOGISTICS | 2601-007007 | 14.282.683 |
| PT PRIMAPLAST INDONESIA | 2601-015015 | 1.181.750 |
| PT PRIMAPLAST INDONESIA | 2601-016016 | 22.475.514 |
| PT KHARISMA ESTETIKA INDONESIA | 2512-287009 | 21.625.000 |
| PT KHARISMA ESTETIKA INDONESIA | 2512-294016 | 23.291.758 |
| PT KHARISMA ESTETIKA INDONESIA | 2512-295017 | 24.118.821 |
| PT KHARISMA ESTETIKA INDONESIA | 2601-003003 | 23.822.161 |
| PT VICTORY ABADI MEGACHEMINDO | 2512-289011 | 8.918.030 |
| PT VICTORY ABADI MEGACHEMINDO | 2512-301023 | 7.478.333 |

Total client sudah jatuh tempo: `Rp 366.846.655`

### Implikasi Validasi PDF terhadap Audit

Dari screenshot PDF, beberapa pola sekarang menjadi jauh lebih jelas:

1. `2512-297019` di PDF client = `Rp 27.771.877`
   - di sistem ada:
     - `AR#170 = 24.673.000`
     - `AR#171 = 3.098.877`
     - `AR#197 = 27.771.877`
   - ini menunjukkan bahwa `AR#197` kemungkinan adalah record final yang benar menurut client
   - sedangkan `AR#170 + AR#171` adalah split lama yang tidak boleh ikut dihitung bersamaan

2. `2512-298020` di PDF client = `Rp 15.693.000`
   - di sistem ada:
     - `AR#173 = 14.673.000`
     - `AR#174 = 1.020.000`
     - `AR#198 = 15.693.000`
   - pola yang sama:
     - `AR#198` tampak sebagai record final
     - `AR#173 + AR#174` tampak sebagai split lama

3. Banyak record overdue client cocok langsung dengan opening AR final di sistem, misalnya:
   - `2511-251002 = 19.443.626`
   - `2511-253004 = 18.856.690`
   - `2511-254005 = 28.679.033`
   - `2512-279001 = 16.599.920`
   - `2512-292014 = 13.484.204`
   - `2512-296018 = 21.385.729`

4. Customer non-opening juga cocok sebagai pembanding:
   - `PT JAKARANA TAMA = 12.599.507`
   - `PT OMNI TRANS LOGISTICS = 14.282.683`
   - `PT PRIMAPLAST INDONESIA = 23.657.264`
   - `PT KHARISMA ESTETIKA INDONESIA = 92.857.740`

Artinya, setelah validasi PDF client:

- tidak semua selisih AR berasal dari pembacaan yang salah
- tetapi kasus `split lama + record gabungan baru` sekarang punya bukti yang kuat

## Opening AR Outstanding per Customer

| Customer | Jumlah Record | Total Amount | Total Paid | Total Outstanding |
|---|---:|---:|---:|---:|
| PT CITRA PERDANA PUTRA | 18 | 242.752.427 | 0 | 242.752.427 |
| PT KHARISMA ESTETIKA INDONESIA | 3 | 69.035.579 | 0 | 69.035.579 |
| PT VICTORY ABADI MEGACHEMINDO | 3 | 16.792.363 | 0 | 16.792.363 |

## Top Record Opening AR Outstanding

| AR ID | SO Number | Invoice Number | Customer | Invoice Date | Amount | Outstanding | Status |
|---|---|---|---|---|---:|---:|---|
| 183 | 2511-254005 | EWL2511254005 | PT CITRA PERDANA PUTRA | 09 Mar 2026 | 28.679.033 | 28.679.033 | outstanding |
| 197 | 2512-297019 | EWL2512297019 | PT CITRA PERDANA PUTRA | 10 Mar 2026 | 27.771.877 | 27.771.877 | outstanding |
| 170 | 2512-297019 | EWL2512297019 | PT CITRA PERDANA PUTRA | 02 Mar 2026 | 24.673.000 | 24.673.000 | outstanding |
| 194 | 2512-295017 | EWL2512295017 | PT KHARISMA ESTETIKA INDONESIA | 10 Mar 2026 | 24.118.821 | 24.118.821 | outstanding |
| 193 | 2512-294016 | EWL2512294016 | PT KHARISMA ESTETIKA INDONESIA | 10 Mar 2026 | 23.291.758 | 23.291.758 | outstanding |
| 187 | 2512-287009 | EWL2512287009 | PT KHARISMA ESTETIKA INDONESIA | 10 Mar 2026 | 21.625.000 | 21.625.000 | outstanding |
| 196 | 2512-296018 | EWL2512296018 | PT CITRA PERDANA PUTRA | 10 Mar 2026 | 21.385.729 | 21.385.729 | outstanding |
| 180 | 2511-251002 | EWL2511251002 | PT CITRA PERDANA PUTRA | 09 Mar 2026 | 19.443.626 | 19.443.626 | outstanding |
| 182 | 2511-253004 | EWL2511253004 | PT CITRA PERDANA PUTRA | 09 Mar 2026 | 18.856.690 | 18.856.690 | outstanding |
| 184 | 2512-279001 | EWL2512279001 | PT CITRA PERDANA PUTRA | 10 Mar 2026 | 16.599.920 | 16.599.920 | outstanding |

## Kelompok Record Berulang yang Perlu Validasi

### 1. SO `2512-297019` / Invoice `EWL2512297019`

| AR ID | Amount | Outstanding | Invoice Date | Created At |
|---|---:|---:|---|---|
| 170 | 24.673.000 | 24.673.000 | 02 Mar 2026 | 02 Mar 2026 |
| 171 | 3.098.877 | 3.098.877 | 02 Mar 2026 | 02 Mar 2026 |
| 197 | 27.771.877 | 27.771.877 | 10 Mar 2026 | 10 Mar 2026 |

Total outstanding grup: `Rp 55.543.754,00`

Catatan:

- `197` secara nominal = `170 + 171`
- ini pola yang sangat kuat mengarah ke:
  - re-open / recreate record gabungan
  - sementara record lama split-nya masih tertinggal
 - screenshot PDF client sekarang menguatkan bahwa angka final yang dipakai client adalah `Rp 27.771.877`

### 2. SO `2512-298020` / Invoice `EWL2512298020`

| AR ID | Amount | Outstanding | Invoice Date | Created At |
|---|---:|---:|---|---|
| 173 | 14.673.000 | 14.673.000 | 02 Mar 2026 | 02 Mar 2026 |
| 174 | 1.020.000 | 1.020.000 | 02 Mar 2026 | 02 Mar 2026 |
| 198 | 15.693.000 | 15.693.000 | 10 Mar 2026 | 10 Mar 2026 |

Total outstanding grup: `Rp 31.386.000,00`

Catatan:

- `198` secara nominal = `173 + 174`
- ini juga pola kuat bahwa record gabungan baru dibuat, tetapi split lama belum dibersihkan
 - screenshot PDF client sekarang menguatkan bahwa angka final yang dipakai client adalah `Rp 15.693.000`

## Duplikasi Exact Match

Tidak ditemukan duplikasi exact match sederhana pada kombinasi:

- customer_name
- invoice_number
- invoice_amount

Artinya, masalah AR saat ini kemungkinan **bukan** duplikasi copy-paste identik, tetapi:

- split record lama yang belum ditutup
- lalu dibuat record gabungan baru

## Kesimpulan

Selisih piutang saat ini paling mungkin berasal dari:

1. opening AR yang dibuat ulang / digabung ulang pada awal Maret
2. split record lama yang belum dibersihkan
3. pasangan `SO + invoice` yang sekarang tampil dalam bentuk:
   - record split lama
   - plus record gabungan baru

Kasus paling kuat saat ini:

- `2512-297019 / EWL2512297019`
- `2512-298020 / EWL2512298020`

Kedua grup ini layak jadi prioritas audit sheet client, karena secara nominal polanya sangat jelas.

Setelah validasi screenshot PDF client, kesimpulan ini menjadi lebih kuat:

4. `AR#197` dan `AR#198` sangat mungkin adalah record final yang benar untuk dua SO tersebut
5. split record lama `170 + 171` dan `173 + 174` sangat mungkin merupakan penyebab utama overstate pada grup terkait

## Rekomendasi Langkah Lanjut

1. Cocokkan grup opening AR berulang ke sheet client
2. Tentukan apakah record gabungan baru adalah versi final yang benar
3. Jika ya, maka split record lama perlu:
   - ditutup
   - di-merge
   - atau dihapus dari perhitungan outstanding
4. Prioritas audit:
   - `2512-297019 / EWL2512297019`
   - `2512-298020 / EWL2512298020`
   - lalu record top outstanding lain pada customer `PT CITRA PERDANA PUTRA`
