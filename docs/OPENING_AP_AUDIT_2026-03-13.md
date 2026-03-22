# Audit Opening AP per 13 Maret 2026

## Ringkasan

- Total hutang versi client: `Rp 242.599.252,52`
- Total hutang versi sistem: `Rp 189.387.032,00`
- Selisih: `Rp 53.212.220,52`

Hasil audit menunjukkan bahwa sumber selisih terbesar ada di **opening payable / hutang lama**, terutama batch record yang dibuat pada **09 Maret 2026**.

## Validasi Tambahan dari Screenshot PDF Client

Setelah screenshot PDF `HUTANG BELUM JATUH TEMPO` dan `HUTANG SUDAH JATUH TEMPO` diterima, beberapa blok hutang client sekarang sudah bisa dipastikan dengan jelas.

### Hutang Belum Jatuh Tempo Versi Client

| Vendor | SO Number | Nilai Hutang |
|---|---|---:|
| PT GEMILANG SUKSES MANDIRI | 2602-036006 | 2.500.000 |
| PT GEMILANG SUKSES MANDIRI | 2602-043013 | 1.250.000 |
| GMT PLUS 8 SDN BHD | 2603-048002 | 1.256.577 |
| PT PRASETYA MITRA PERSADA | 2602-031001 | 4.476.500 |
| PT PRASETYA MITRA PERSADA | 2602-032002 | 4.899.044 |
| PT PRASETYA MITRA PERSADA | 2602-033003 | 4.899.044 |
| PT PRASETYA MITRA PERSADA | 2602-037007 | 3.360.000 |
| PT PRASETYA MITRA PERSADA | 2602-039009 | 9.330.400 |
| PT PRASETYA MITRA PERSADA 2 | 2503-070012 | 64.712.000 |
| PT PRASETYA MITRA PERSADA 2 | 2504-105019 | 11.530.428 |
| PT PRASETYA MITRA PERSADA 2 | 2505-108001 | 7.601.718 |
| PT PRASETYA MITRA PERSADA 2 | 2505-114007 | 6.400.000 |
| PT PRASETYA MITRA PERSADA 2 | 2505-117010 | 3.200.000 |
| PT PRASETYA MITRA PERSADA 2 | 2505-118011 | 3.200.000 |
| PT PRASETYA MITRA PERSADA 2 | 2506-128008 | 700.000 |
| PT SAMUDERA PERDANA SELARAS | 2512-297019 | 6.377.927 |
| PT SAMUDERA PERDANA SELARAS | 2512-298020 | 2.792.248 |
| REIMBURST MUSTIKA | - | 5.066.684 |

Total client belum jatuh tempo: `Rp 143.552.570`

### Hutang Sudah Jatuh Tempo Versi Client

| Vendor | SO Number | Nilai Hutang |
|---|---|---:|
| PT ABE TRANSINDO PERKASA | 2601-001001 | 5.706.050 |
| PT ABE TRANSINDO PERKASA | 2601-002002 | 2.375.600 |
| PT ABE TRANSINDO PERKASA | 2512-291013 | 2.410.250 |
| PT ABE TRANSINDO PERKASA | 2601-012012 | 2.367.650 |
| PT ABE TRANSINDO PERKASA | 2601-014014 | 2.620.400 |
| PT PRASETYA MITRA PERSADA | 2512-293015 | 2.221.750 |
| PT PRASETYA MITRA PERSADA | 2512-296018 | 2.305.000 |
| PT PRASETYA MITRA PERSADA | 2512-300022 | 2.660.594 |
| PT PRASETYA MITRA PERSADA | 2512-301023 | 2.399.522 |
| PT PRASETYA MITRA PERSADA | 2601-004004 | 2.305.000 |
| PT PRASETYA MITRA PERSADA | 2601-026026 | 2.947.050 |
| PT PRASETYA MITRA PERSADA | 2512-292014 | 6.499.044 |
| PT PRASETYA MITRA PERSADA | 2601-013013 | 2.449.522 |
| PT PRASETYA MITRA PERSADA | 2601-021021 | 2.000.000 |
| PT GEMILANG SUKSES MANDIRI | 2601-017017 | 1.100.000 |
| PT GEMILANG SUKSES MANDIRI | 2602-038008 | 1.100.000 |
| CV JSN SENTOSA CARGO | 2601-024024 | 6.720.000 |
| REIMBURST MUSTIKA | - | 5.459.000 |
| SHENZHEN MAXSPEED LOGISTICS | 2511-255006 | 13.733.360 |
| SHENZHEN MAXSPEED LOGISTICS | 2512-294016 | 4.354.480 |
| SHENZHEN MAXSPEED LOGISTICS | 2601-003003 | 6.741.200 |
| SHENZHEN MAXSPEED LOGISTICS | 2511-269020 | 18.471.200 |

Total client sudah jatuh tempo: `Rp 98.946.672`

### Implikasi Validasi PDF terhadap Audit

Dari screenshot PDF, beberapa poin yang sebelumnya masih dugaan sekarang menjadi lebih kuat:

1. `PT SAMUDERA PERDANA SELARAS` **match** dengan sistem
   - client: `Rp 9.170.175`
   - sistem: `Rp 9.170.175`

2. `CV JSN SENTOSA CARGO` **match** dengan sistem
   - client: `Rp 6.720.000`
   - sistem: `Rp 6.720.000`

3. `PT PRASETYA MITRA PERSADA` sebagian besar **punya padanan kuat** di sistem
   - terutama blok opening AP batch `09/03/2026`
   - sehingga vendor ini tidak bisa langsung dianggap batch salah / harus dihapus semua

4. `SHENZHEN MAXSPEED LOGISTICS` tetap menjadi vendor paling bermasalah
   - client: `Rp 43.300.240`
   - sistem: `Rp 69.392.400`
   - selisih: `Rp 26.092.160`
   - di dalamnya sudah ada **duplikasi pasti** `AP#341` dan `AP#552`

5. `PT GEMILANG SUKSES MANDIRI` masih mismatch
   - client total: `Rp 5.950.000`
   - sistem total: `Rp 13.250.000`
   - sistem lebih tinggi `Rp 7.300.000`

6. `REIMBURST MUSTIKA` juga masih mismatch
   - client total: `Rp 10.525.684`
   - sistem yang terdeteksi belum map langsung dengan nama dan nominal yang sama
   - perlu audit vendor mapping / sumber payable lebih lanjut

## Temuan Utama

1. Ada batch opening AP baru yang dibuat pada `2026-03-09`.
2. Total nominal batch ini: `Rp 80.715.975,00`
3. Outstanding batch ini per audit: `Rp 64.225.375,00`
4. Nilai tersebut sangat dekat dengan selisih hutang yang dikeluhkan client.
5. Minimal ada satu duplikasi yang sudah pasti, yaitu vendor `SHENZHEN MAXSPEED LOGISTICS CO., LTD` invoice `SML25101357`.

## Daftar Record Opening AP Batch 09 Maret 2026

| AP ID | Vendor | SO Number | Vendor Invoice | Amount | Paid | Outstanding | Status |
|---|---|---|---|---:|---:|---:|---|
| 552 | SHENZHEN MAXSPEED LOGISTICS CO., LTD | EWL2511255006 | SML25101357 | 13.733.360 | 0 | 13.733.360 | unpaid |
| 553 | SHENZHEN MAXSPEED LOGISTICS CO., LTD | EWL2511269020 | SML25111261 | 18.471.200 | 0 | 18.471.200 | unpaid |
| 559 | SHENZHEN MAXSPEED LOGISTICS CO., LTD | 2512-294016 | SML25121345 | 4.354.480 | 0 | 4.354.480 | unpaid |
| 554 | PT ABE TRANSINDO PERKASA | EWL2512284006 | 20/ATP-SBY/INV/IMP.2026.I.1174 | 2.612.450 | 2.612.450 | 0 | paid |
| 555 | PT ABE TRANSINDO PERKASA | EWL2512290012 | 76/ATP-SBY/INV/IMP.2026.I.1218 | 4.547.750 | 4.547.750 | 0 | paid |
| 556 | PT ABE TRANSINDO PERKASA | EWL2512291013 | 77/ATP-SBY/INV/IMP.2026.I.1219 | 2.410.250 | 0 | 2.410.250 | unpaid |
| 557 | PT PRASETYA MITRA PERSADA | EWL2512292014 | 052.PMP.TRK-EWL.122025 | 6.499.044 | 0 | 6.499.044 | unpaid |
| 558 | PT PRASETYA MITRA PERSADA | EWL2512293015 | 001.PMP.TRK.EWL.0126 | 2.221.750 | 0 | 2.221.750 | unpaid |
| 560 | PT PRASETYA MITRA PERSADA | EWL2512296018 | 007.PMP.TRK.EWL.0126 | 2.305.000 | 0 | 2.305.000 | unpaid |
| 563 | PT PRASETYA MITRA PERSADA | EWL2512300022 | 006.PMP.TRK.EWL.0126 | 2.660.594 | 0 | 2.660.594 | unpaid |
| 564 | PT PRASETYA MITRA PERSADA | EWL2512301023 | 005.PMP.TRK.EWL.0126 | 2.399.522 | 0 | 2.399.522 | unpaid |
| 565 | PT PRASETYA MITRA PERSADA | EWL2512302024 | 002.PMP.TRK.EWL.0126 | 9.330.400 | 9.330.400 | 0 | paid |
| 561 | SAMUDERA PERDANA SELARAS | EWL2512297019 | INV/EMKL-IMP/2026/II/0066 | 6.377.927 | 0 | 6.377.927 | unpaid |
| 562 | SAMUDERA PERDANA SELARAS | EWL2512298020 | INV/EMKL-IMP/2026/II/0066 | 2.792.248 | 0 | 2.792.248 | unpaid |

## Record Duplikat yang Sudah Pasti

### SHENZHEN MAXSPEED LOGISTICS CO., LTD

Invoice `SML25101357` muncul dua kali:

| AP ID | SO Number | Amount | Outstanding | Status |
|---|---|---:|---:|---|
| 341 | 2511-255006 | 13.733.360 | 13.733.360 | unpaid |
| 552 | EWL2511255006 | 13.733.360 | 13.733.360 | unpaid |

Kesimpulan:

- Ini adalah **duplikasi pasti**
- Vendor sama
- Nomor invoice sama
- Nominal sama
- Sama-sama outstanding
- Perbedaan hanya format nomor SO lama vs format `EWL...`

Potensi overstated hutang dari duplikasi ini: `Rp 13.733.360,00`

## Opening AP Outstanding per Vendor

| Vendor | Jumlah Record | Total Amount | Total Paid | Total Outstanding |
|---|---:|---:|---:|---:|
| SHENZHEN MAXSPEED LOGISTICS CO., LTD | 4 | 50.292.400 | 0 | 50.292.400 |
| PT PRASETYA MITRA PERSADA | 5 | 16.085.910 | 0 | 16.085.910 |
| SAMUDERA PERDANA SELARAS | 2 | 9.170.175 | 0 | 9.170.175 |
| PT ABE TRANSINDO PERKASA | 1 | 2.410.250 | 0 | 2.410.250 |
| RIDWAN ( TRUCKING VENDOR BY AIR) | 1 | 352.500 | 2.500 | 350.000 |

## Catatan Tambahan

### RIDWAN

Record:

- AP ID `349`
- SO `2512-295017`
- amount `Rp 352.500,00`
- paid `Rp 2.500,00`
- outstanding `Rp 350.000,00`
- status `partial`

Menurut informasi client, vendor ini seharusnya sudah lunas. Maka record ini masih salah status, tetapi nilainya kecil dan **bukan sumber utama** gap hutang total.

## Kesimpulan

Selisih hutang saat ini paling kuat berasal dari:

1. opening payable batch `09 Maret 2026`
2. record opening lama yang dibuka ulang
3. minimal satu duplikasi pasti pada vendor Shenzhen
4. beberapa record opening yang status outstanding-nya masih perlu diverifikasi ke sheet client

Setelah validasi screenshot PDF client, kesimpulan ini menjadi lebih tajam:

5. `PT PRASETYA MITRA PERSADA` tidak lagi layak dianggap kandidat hapus massal, karena banyak itemnya cocok dengan daftar client
6. mismatch utama sekarang paling kuat terfokus pada:
   - `SHENZHEN MAXSPEED LOGISTICS`
   - `PT GEMILANG SUKSES MANDIRI`
   - `REIMBURST MUSTIKA`

## Rekomendasi Langkah Lanjut

1. Prioritaskan audit vendor berikut:
   - `SHENZHEN MAXSPEED LOGISTICS`
   - `PT GEMILANG SUKSES MANDIRI`
   - `REIMBURST MUSTIKA`
2. Tetap cocokkan seluruh batch `09 Maret 2026` ke sheet client
3. Putuskan per record apakah:
   - valid outstanding
   - duplikat
   - sudah seharusnya paid
   - harus dihapus / merge
4. Setelah validasi selesai, baru lakukan script cleanup/repair
