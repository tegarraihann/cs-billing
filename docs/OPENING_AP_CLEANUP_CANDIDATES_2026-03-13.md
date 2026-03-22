# Kandidat Cleanup Opening AP per 13 Maret 2026

## Tujuan

Dokumen ini menyaring record opening AP yang **paling patut dicurigai** untuk:

- dihapus
- di-merge
- atau minimal diverifikasi dulu ke sheet client

Dokumen ini **belum** berarti semua record harus langsung dihapus. Kategorinya dibagi agar aman:

- `merge_or_delete_duplicate`: duplikasi yang sudah sangat kuat
- `needs_validation`: belum terbukti duplikat, tetapi patut dicek ke sheet client
- `keep_paid`: sudah dibayar, normalnya dipertahankan kecuali batch 09 Maret terbukti invalid total
- `status_correction_only`: bukan kandidat hapus, hanya perlu koreksi status

## Kandidat Paling Kuat untuk Hapus / Merge

### Duplikasi Pasti

| AP ID Baru | AP ID Lama | Vendor | SO Baru | SO Lama | Vendor Invoice | Amount | Outstanding | Rekomendasi |
|---|---|---|---|---|---|---:|---:|---|
| 552 | 341 | SHENZHEN MAXSPEED LOGISTICS CO., LTD | EWL2511255006 | 2511-255006 | SML25101357 | 13.733.360 | 13.733.360 | `merge / hapus salah satu` |

Kesimpulan:

- Vendor sama
- Nomor invoice vendor sama
- Nominal sama
- Sama-sama outstanding
- Perbedaan hanya format nomor SO

Nilai yang berpotensi membuat hutang dobel: `Rp 13.733.360,00`

## Record Batch 09 Maret 2026 yang Perlu Validasi

### SHENZHEN MAXSPEED LOGISTICS CO., LTD

| AP ID | SO Number | Vendor Invoice | Amount | Paid | Outstanding | Status | Kategori |
|---|---|---|---:|---:|---:|---|---|
| 552 | EWL2511255006 | SML25101357 | 13.733.360 | 0 | 13.733.360 | unpaid | merge_or_delete_duplicate |
| 553 | EWL2511269020 | SML25111261 | 18.471.200 | 0 | 18.471.200 | unpaid | needs_validation |
| 559 | 2512-294016 | SML25121345 | 4.354.480 | 0 | 4.354.480 | unpaid | needs_validation |

### PT ABE TRANSINDO PERKASA

| AP ID | SO Number | Vendor Invoice | Amount | Paid | Outstanding | Status | Kategori |
|---|---|---|---:|---:|---:|---|---|
| 554 | EWL2512284006 | 20/ATP-SBY/INV/IMP.2026.I.1174 | 2.612.450 | 2.612.450 | 0 | paid | keep_paid |
| 555 | EWL2512290012 | 76/ATP-SBY/INV/IMP.2026.I.1218 | 4.547.750 | 4.547.750 | 0 | paid | keep_paid |
| 556 | EWL2512291013 | 77/ATP-SBY/INV/IMP.2026.I.1219 | 2.410.250 | 0 | 2.410.250 | unpaid | needs_validation |

### PT PRASETYA MITRA PERSADA

| AP ID | SO Number | Vendor Invoice | Amount | Paid | Outstanding | Status | Kategori |
|---|---|---|---:|---:|---:|---|---|
| 557 | EWL2512292014 | 052.PMP.TRK-EWL.122025 | 6.499.044 | 0 | 6.499.044 | unpaid | needs_validation |
| 558 | EWL2512293015 | 001.PMP.TRK.EWL.0126 | 2.221.750 | 0 | 2.221.750 | unpaid | needs_validation |
| 560 | EWL2512296018 | 007.PMP.TRK.EWL.0126 | 2.305.000 | 0 | 2.305.000 | unpaid | needs_validation |
| 563 | EWL2512300022 | 006.PMP.TRK.EWL.0126 | 2.660.594 | 0 | 2.660.594 | unpaid | needs_validation |
| 564 | EWL2512301023 | 005.PMP.TRK.EWL.0126 | 2.399.522 | 0 | 2.399.522 | unpaid | needs_validation |
| 565 | EWL2512302024 | 002.PMP.TRK.EWL.0126 | 9.330.400 | 9.330.400 | 0 | paid | keep_paid |

### SAMUDERA PERDANA SELARAS

| AP ID | SO Number | Vendor Invoice | Amount | Paid | Outstanding | Status | Kategori |
|---|---|---|---:|---:|---:|---|---|
| 561 | EWL2512297019 | INV/EMKL-IMP/2026/II/0066 | 6.377.927 | 0 | 6.377.927 | unpaid | needs_validation |
| 562 | EWL2512298020 | INV/EMKL-IMP/2026/II/0066 | 2.792.248 | 0 | 2.792.248 | unpaid | needs_validation |

## Record yang Tidak Perlu Dihapus, Tapi Perlu Koreksi Status

| AP ID | Vendor | SO Number | Amount | Paid | Outstanding | Status | Tindakan |
|---|---|---|---:|---:|---:|---|---|
| 349 | RIDWAN ( TRUCKING VENDOR BY AIR ) | 2512-295017 | 352.500 | 2.500 | 350.000 | partial | koreksi ke `paid` jika sesuai bukti client |

## Ringkasan Nominal per Kategori

- `merge_or_delete_duplicate`
  - total outstanding: `Rp 13.733.360,00`
- `needs_validation`
  - total outstanding: `Rp 50.492.015,00`
- `keep_paid`
  - total paid: `Rp 16.490.600,00`
- `status_correction_only`
  - total outstanding: `Rp 350.000,00`

## Kesimpulan

1. Kandidat hapus / merge yang **sudah paling kuat** saat ini baru:
   - `AP#552` terhadap `AP#341`
2. Kandidat lain pada batch `09/03/2026` belum bisa langsung dihapus dari database hanya dari pola query.
3. Untuk batch selain duplikasi Shenzhen, tindakan yang aman adalah:
   - cocokkan dulu ke sheet client
   - tentukan mana yang memang opening valid
   - baru putuskan keep / paid / hapus

## Rekomendasi Langkah Lanjut

1. Konfirmasi ke client apakah seluruh batch `09/03/2026` memang intended.
2. Jika tidak intended, susun script cleanup bertahap:
   - tahap 1: hapus duplikasi pasti `552`
   - tahap 2: status correction `349`
   - tahap 3: cleanup batch lain sesuai validasi sheet client
