# Rencana Patch Repair Production SO EWILOG2608166005

Tanggal: 28 Oktober 2026.
Status: rencana disetujui user; patch script dan tes diimplementasikan 29 Oktober 2026. User mengizinkan commit/push ke branch repair pada 29 Oktober 2026. Apply ke database operasional/production belum dilakukan. Hasil verifikasi ada di bagian 9.

## 1. Tujuan dan Batas Scope

Hasil akhir reimbursement production mengikuti hasil repair lokal: nama, quantity, unit, tarif, total, dan vendor. Identitas record production tidak harus sama dengan identitas keeper lokal karena isi record dengan ID yang sama ternyata berbeda.

Target tunggal:

- SO EWILOG2608166005, sales_orders.id 322.
- Invoice EWL2608166005, invoices.id 308.
- AR 368, komponen debit_note 537 dan main 538.
- AP terkait SO 322 dan komponen reimbursement yang telah diverifikasi.

Acuan hasil lokal adalah bagian hasil eksekusi dokumen 19 Oktober dan snapshot `plan.after` pada backup `storage/app/private/repair-backups/so-322-tkbm-parkir-20261019-151249-d0a669d8b6.json`. Keduanya telah diperiksa untuk penyusunan rencana ini. Database demo yang sudah dimigrasikan bukan acuan struktur production.

Tidak termasuk SO lain, migrasi production, deploy pengembangan finance yang belum selesai, perubahan controller/UI, import seluruh database, atau perubahan transaksi bank dan petty cash.

## 2. Temuan dan Baseline Production

Script lama berhenti karena pemetaan record lokal tidak sesuai production. Contohnya, sumber 663 di acuan lama adalah TKBM, sedangkan di production adalah UANG KULI. Mengganti ID komponen AP saja atau menonaktifkan guard tidak menyelesaikan masalah.

Baseline berikut berasal dari output query dan screenshot hosting yang diberikan user, bukan pembacaan langsung database production oleh agent. Semua harus divalidasi ulang ketika dry-run.

| Bagian | Nilai Production Sekarang | Target |
| --- | ---: | ---: |
| Jumlah reimbursement | 16 | 6 |
| Reimbursement / AR debit_note 537 | 20.547.876 | 10.620.904 |
| Main invoice / AR main 538 | 11.448.000 | 11.448.000 |
| Subtotal dan total invoice / AR | 31.995.876 | 22.068.904 |
| PPN | 0 | 0 |
| DP | 0 | 0 |
| Pengurangan bersih invoice / AR | | 9.926.972 |

Pembayaran header invoice, AR, komponen AR, dan AP pada output yang diterima adalah nol. Ini belum menggantikan pemeriksaan histori pembayaran, alokasi, notes, bank, dan posting sebelum apply.

Main production lebih tinggi Rp100.000 daripada acuan lokal. Karena scope hanya reimbursement, target total production Rp22.068.904, bukan menyalin total lokal Rp21.968.904. Nilai main production tidak diturunkan untuk menyamakan angka akhir.

## 3. Pemetaan Enam Item Final

Usulan menggunakan sumber production yang sudah berada di vendor tujuan, sehingga tidak perlu memindahkan keeper antar-vendor atau membuat ID baru. Pasangan invoice dan AP berikut berasal dari data production yang diberikan.

| Sumber Production | Kondisi Awal | Hasil Final: Qty x Tarif | Unit | Vendor / AP | Invoice Item / AP Component |
| --- | --- | --- | --- | --- | --- |
| 653 | DEVOSIT CONTAINER, 1 x 280.000 | DEPOSIT KONTAINER, 1 x 2.800.000 | SET | 19 / 1067 | 8645 / 5685 |
| 663 | UANG KULI, 1 x 100.000 | EXTRA KULI, 1 x 100.000 | SET | 19 / 1067 | 8647 / 5686 |
| 662 | STORAGE, 1 x 5.677.660 | STORAGE, 1 x 5.677.660 | SET | 62 / 1066 | 8646 / 5688 |
| 689 | LOLO, 2 x 821.622 | LOLO, 2 x 821.622 | 20GP | 19 / 1067 | 9696 / 5362 |
| 691 | PARKIR GUDANG, 2 x 50.000 | PARKIR, 2 x 50.000 | 20GP | 19 / 1067 | 9698 / 5364 |
| 690 | TKBM STUFFING, 2 x 50.000 | TKBM, 2 x 150.000 | 20GP | 19 / 1067 | 9697 / 5363 |

Total final enam item: Rp10.620.904.

Penting: sumber 690 tidak sekadar diganti nama; totalnya naik dari Rp100.000 menjadi Rp300.000. Sumber 653 naik Rp2.520.000. Kedua koreksi harus tercetak pada dry-run. Pemilihan ini mengikuti hasil final lokal, bukan klaim bahwa semua baris yang dikeluarkan merupakan duplikat identik.

## 4. Sumber Production yang Dikeluarkan

Hapus hanya pasangan berikut setelah seluruh identitas, nominal, pembayaran, dan referensinya cocok. Hapus child invoice/AP beserta sumber reimbursement dalam satu transaksi.

| Sumber | Nama Production | Total | Invoice Item | AP Component / Header |
| --- | --- | ---: | --- | --- |
| 652 | DELIVERY ORDER | 7.353.728 | 8644 | 5684 / 1067 |
| 664 | PARKIR 1 | 50.000 | 8648 | 5693 / 1095 |
| 676 | PARKIR 2 | 50.000 | 9175 | 5690 / 1093 |
| 677 | TKBM 1 | 150.000 | 9176 | 5694 / 1095 |
| 683 | TKBM 2 | 150.000 | 9512 | 5691 / 1093 |
| 684 | LOLO 1 | 821.622 | 9513 | 5259 / 1095 |
| 685 | LOLO 2 | 821.622 | 9561 | 5692 / 1093 |
| 686 | TKBM 1 | 150.000 | 9562 | 5263 / 1095 |
| 687 | TKBM | 300.000 | 9563 | 5261 / 1093 |
| 692 | CHARGE LINER CONTAINER | 2.800.000 | 9699 | 5365 / 1067 |

Total dikeluarkan Rp12.646.972; penambahan pada keeper Rp2.720.000; pengurangan bersih Rp9.926.972.

ID yang dipertahankan pada profil production berbeda dari profil lokal lama. Script tidak boleh menganggap profil sudah final hanya karena jumlah item enam atau karena ID duplikat versi lama hilang.

## 5. Dampak AP dan Data Terhubung

Target vendor mengikuti hasil lokal yang diminta user: STORAGE vendor 62; lima reimbursement lainnya vendor 19 INTERNAL DIVISION. Ini mengubah hutang reimbursement vendor 101 dan 102, bukan sekadar tampilan customer.

| AP | Vendor | Sebelum | Sesudah |
| --- | --- | ---: | ---: |
| 1066 | UTC 3 / TPK KOJA, 62 | 5.677.660 | 5.677.660 |
| 1067 | INTERNAL DIVISION, 19 | 12.686.972 | 5.253.244 |
| 1068 | JOHAN GUMILAR, 99 | 100.000 | 100.000 |
| 1093 | PUTRA TRANSINDO PACIFIC PT, 101 | 4.821.622 | 3.500.000 |
| 1095 | BUDI SETIAWAN, 102 | 4.971.622 | 3.800.000 |
| 1111 | ABADI CEMERLANG, 15 | 166.500 | 166.500 |

Target AP wajib dihitung ulang dari semua komponen tersisa dan dibandingkan dengan angka tabel, bukan langsung menimpa header. Rincian non-reimbursement production masih perlu diverifikasi untuk memastikan target tersebut benar; perbedaan harus menghentikan proses.

Penyesuaian terkait:

- Reimbursement master: description, quantity, unit, amount sebagai tarif, customer outstanding, serta metadata receipt_info yang relevan.
- Invoice item: item_ref tetap mengarah ke keeper production; nama, quantity, unit, rate, line amount, dan outstanding mengikuti hasil final. Klasifikasi reimbursement tetap benar.
- AP component: nama, amount/outstanding, serta related_items termasuk ID sumber, quantity, unit, dan unit_price tetap konsisten.
- AP header: amount/outstanding dan deskripsi dihitung dari komponen; hutang non-reimbursement dan pembayaran tidak diubah.
- AR debit_note 537 menjadi Rp10.620.904; main 538 tetap Rp11.448.000; header AR dan invoice menjadi Rp22.068.904.
- Detail SO Finance, invoice, PDF, serta rincian/export AP/AR diverifikasi membaca sumber yang sudah diperbaiki.

Snapshot CS historis dipertahankan seperti hasil repair lokal. Jangan menimpa seluruh snapshot SO atau menyalin snapshot lokal ke production. Bila ada payload aktif yang terbukti dapat membentuk ulang item lama, hentikan apply dan dokumentasikan perubahan terbatas yang diperlukan sebelum memperluas scope. Kesamaan tampilan semua role tidak diklaim sebelum jalur bacanya diperiksa.

## 6. Tahapan Implementasi Setelah Rencana Disetujui

1. Inventarisasi schema legacy, metadata lengkap, komponen AP non-reimbursement, histori pembayaran/alokasi/notes, serta posting dan periode terkait. Gunakan query builder read-only; jangan memanggil model atau sync yang dapat menulis ketika membaca.
2. Tambahkan profil production yang eksplisit ke script existing. Deteksi profil melalui gabungan identitas, isi, vendor, nominal, referensi, dan total. Pertahankan dukungan profil lokal lama melalui tes regresi; tolak campuran profil atau kondisi parsial.
3. Buat rencana before/after untuk enam keeper, sepuluh penghapusan, metadata, AP per vendor, invoice, dan AR. Semua perubahan harus dicetak, termasuk perubahan vendor secara agregat dan perbedaan total main terhadap lokal.
4. Pertahankan guard referensi, pembayaran, schema, alokasi, periode, dan transaksi. Jangan menambahkan opsi force atau deduplikasi berdasarkan nama saja.
5. Tambahkan pengujian profil production dan jalankan tes lama pada database tes terisolasi. Uji integrasi MySQL dan alur baca/sync terhadap salinan database dengan kode production yang relevan, bukan hanya aplikasi lokal versi baru.
6. Review diff di worktree repair terpisah. Commit/push hanya script, tes, dan dokumentasi yang relevan setelah diizinkan; jangan membawa source/migration/build dari pengembangan finance yang belum selesai.
7. Di hosting, ambil backup database terbaru, hentikan sementara input terhadap dokumen target dan tutup formulir lama, lalu jalankan dry-run patched script. Apply hanya setelah hasilnya cocok dengan rencana ini dan izin eksekusi telah diberikan.
8. Apply dalam satu transaksi dengan locking, validasi ulang data, backup record sebelum penulisan, dan pemeriksaan before/after. Bila gagal, rollback; jangan melakukan perbaikan sebagian.
9. Verifikasi enam item, seluruh referensi, AP per vendor, AR, invoice, PDF, serta tidak ada duplikat setelah akses berulang. Dry-run/apply ulang harus no-op.

CLI default tetap dry-run dan penulisan tetap memerlukan `--apply`. Pemeriksaan ulang dalam transaksi wajib dilakukan walaupun dry-run sebelumnya sudah cocok; jika ada perubahan terhadap baseline, hentikan dan tinjau ulang.

## 7. Pengaman dan Pengujian Penerimaan

- Tepat enam master, enam invoice items reimbursement, dan pasangan AP yang sesuai profil production final; tidak ada referensi yatim.
- Total reimbursement Rp10.620.904; main Rp11.448.000; invoice/AR Rp22.068.904; AP sesuai tabel bagian 5.
- Tarif tidak tertukar dengan line amount: LOLO 821.622 x 2, PARKIR 50.000 x 2, TKBM 150.000 x 2.
- Uji kondisi sebelum repair, sesudah repair, pembayaran baru, metadata berbeda, referensi tambahan, profil campuran, serta kondisi parsial. Hanya baseline dikenal atau final valid yang diterima.
- Uji backup gagal, perubahan data setelah perencanaan, dan kegagalan saat update setelah delete; tidak boleh ada commit parsial.
- Main invoice, item COGS, Other Cost REFUND, customer, tanggal, pajak, DP, snapshot CS historis, serta seluruh SO lain tetap.
- Transaksi bank, petty cash, dan posting tidak diubah. Posting terkait/periode tertutup harus ditinjau sebelum apply; selisih historis tidak boleh dikoreksi diam-diam.
- Buka detail invoice berulang, preview/download PDF dan jalur sinkronisasi SO pada salinan production; jika item muncul kembali, jangan rilis script sebelum sumber pembentuk ulang teridentifikasi.
- Jangan menyimpan ulang SO di production sebagai tes sebelum lulus pada salinan terisolasi. Hindari formulir lama yang masih membawa daftar reimbursement sebelum repair.
- Laporan tersimpan/posting tidak dianggap otomatis diperbaiki hanya karena invoice/AP/AR berubah; laporkan batas verifikasi secara eksplisit.

## 8. File dan Hasil Kerja

Perkiraan perubahan implementasi:

- `scripts/repair-so-ewilog2608166005-remove-duplicate-tkbm-parkir.php`: tambah profil dan rencana production dengan guard lengkap.
- Tes production baru pada `tests/Unit/` dan penyesuaian tes existing bila diperlukan, tanpa menurunkan cakupan regresi.
- Dokumen ini: catatan hasil tes, dry-run, eksekusi, backup, dan verifikasi sesudahnya.

Tidak ada perubahan kode aplikasi atau database pada tahap penyusunan rencana ini. Persetujuan rencana belum berarti izin menjalankan apply di production. Apabila hasil inventarisasi berbeda dari baseline, laporkan perbedaannya dan revisi rencana terlebih dahulu.

## 9. Hasil Implementasi Patch - 29 Oktober 2026

Patch disiapkan pada worktree `C:/laragon/www/OfficeManagement-hotfix-repair-so-2608166005`, branch `hotfix/repair-so-ewilog2608166005`. Script pada workspace utama juga diperbarui ke versi identik setelah isi awalnya dipastikan sama dengan script branch repair. File aplikasi yang sedang dikembangkan tidak diubah.

### Perubahan yang Selesai

- Tambahan profil `production-2026-10-28` dengan 16 sumber dan pasangan invoice/AP sesuai output hosting. Profil lokal lama tetap tersedia dan lulus tes regresi.
- Petunjuk profil berasal dari sumber 663, tetapi bukan otorisasi perubahan: seluruh ID, nama, quantity, tarif, unit, vendor, relasi, metadata, pembayaran, serta total tetap divalidasi.
- Hasil production memakai keeper 653, 662, 663, 689, 690, 691. Tidak menyalin identitas keeper lokal yang memiliki arti berbeda.
- Tepat sepuluh sumber dan pasangan invoice/AP dikeluarkan; koreksi Deposit dan TKBM mengikuti bagian 3. Seluruh AP terkait diverifikasi terhadap baseline, dihitung dari komponen, dan dibandingkan dengan target.
- Main billable dan AR main production diverifikasi Rp11.448.000. Reimbursement akhir Rp10.620.904; invoice/AR Rp22.068.904.
- Ditambahkan penolakan histori pembayaran di metadata receipt_info/related_items, serta data invoice vendor pada AP production yang hendak diubah.
- Dry-run menampilkan profil, enam item final dengan vendor/quantity/tarif, AP sebelum/sesudah, daftar delete/update, dan total invoice/AR.
- Backup record sebelum penulisan, transaksi, validasi ulang/fingerprint, rollback, dan no-op tetap dipertahankan.

### Verifikasi yang Sudah Dijalankan

- PHP syntax lint script dan file tes baru: lulus.
- `git diff --check`: lulus pada worktree repair.
- SQLite terisolasi: **72 tests, 434 assertions lulus**, termasuk 33 tes regresi lama.
- MySQL lokal terisolasi: **39 tests, 299 assertions lulus**. Tes hanya membuat schema acak berawalan `office_repair_322_test_` di 127.0.0.1:3306 dan menghapus schema tesnya setelah selesai; tidak menggunakan konfigurasi database aplikasi dari .env.
- Tes apply memeriksa enam sumber, invoice item, metadata receipt/AP, target tiap vendor, AR, backup, serta kesamaan data non-target. Eksekusi kedua menghasilkan no-op tanpa backup tambahan.
- Tes negatif mencakup profil campuran, nominal/vendor/klasifikasi berubah, histori pembayaran, relasi lintas invoice/AP, alokasi vendor, notes, periode closed, perubahan setelah perencanaan, backup gagal, serta rollback setelah delete dan update sebagian.
- Jalur helper legacy `prepareReimbursementInvoicePayload`, `updateReimbursementItems`, dan `syncOperationalAndReimbursementToInvoices` diuji tiga putaran dengan input SO final yang sama. Hasil tetap enam item, reimbursement Rp10.620.904, invoice/AR Rp22.068.904, dan status script tetap clean.
- File class legacy dimuat dari worktree repair secara eksplisit agar tes tidak diam-diam menggunakan model/controller baru di workspace utama.

Perintah tes SQLite, dari folder worktree repair:

```powershell
php C:/laragon/www/OfficeManagement/vendor/bin/phpunit --no-configuration --bootstrap C:/laragon/www/OfficeManagement/vendor/autoload.php --do-not-cache-result tests/Unit/RepairSo2608166005ProductionTest.php tests/Unit/RepairSo2608166005FinalTest.php tests/Unit/RepairSo2608166005Test.php
```

Untuk mengulang tes production di MySQL lokal, set `$env:REPAIR_TEST_MYSQL='1'` pada terminal tes lalu jalankan file `RepairSo2608166005ProductionTest.php` dengan opsi PHPUnit yang sama. Kredensial tes opsional melalui `REPAIR_TEST_MYSQL_USER` dan `REPAIR_TEST_MYSQL_PASSWORD`; tidak mengubah .env aplikasi.

### Batas Verifikasi dan Langkah Hosting

- Saat verifikasi implementasi selesai, belum dilakukan commit/push atau deploy. User kemudian mengizinkan commit/push ke branch repair pada 29 Oktober 2026. Tidak dilakukan apply terhadap office_app, office_app_demo, maupun database production.
- Fixture production disusun dari output hosting yang tersedia. Metadata lengkap, histori/alokasi, rincian non-reimbursement dan posting production terbaru belum tersedia sebagai dump lengkap. Dry-run patched script tetap wajib dijalankan pada hosting; bila guard menolak, tinjau data yang berbeda, bukan melonggarkan guard.
- Uji helper legacy bukan UAT browser, render PDF penuh, export AP/AR, atau seluruh request simpan SO. Pengujian HTTP/UAT lengkap dan pemeriksaan versi kode hosting masih perlu dilakukan pada lingkungan yang sesuai sebelum menyatakan verifikasi end-to-end selesai.
- Snapshot CS historis tidak diubah. Formulir lama harus ditutup; perbaikan ini tidak melindungi dari import ulang dump lama atau pengiriman ulang payload lama oleh pengguna.
- Posting/profit dan bank tidak diperbaiki atau ditimpa. Selisih posting dilaporkan sebagai warning; periode tertutup atau histori terkait tetap menghentikan repair.

Setelah patch dipindahkan ke hosting melalui proses Git yang disetujui, jalankan terlebih dahulu:

```bash
php scripts/repair-so-ewilog2608166005-remove-duplicate-tkbm-parkir.php
```

Output untuk baseline hosting yang ditinjau harus menampilkan `PROFIL: production-2026-10-28`, enam item final dan total invoice/AR `31995876.00 -> 22068904.00`. Jangan menjalankan script lama atau menggunakan `--apply` sebelum hasil dry-run sesuai, backup database terbaru tersedia, dan izin apply diberikan.
