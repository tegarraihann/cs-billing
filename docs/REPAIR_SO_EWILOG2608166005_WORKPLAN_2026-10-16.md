# Rencana Repair TKBM dan PARKIR SO EWILOG2608166005

Tanggal: 16 Oktober 2026.
Status: script tersedia dan dry-run lokal sudah lolos. Apply pada data operasional belum dijalankan.

Catatan 19 Oktober 2026: pembacaan database lokal menunjukkan repair pertama sudah diterapkan (ID 685, 686, 687 beserta pasangan invoice/AP hilang, invoice Rp32.417.498). Dokumen ini dipertahankan sebagai histori scope awal. Rencana perubahan berikutnya mengikuti REPAIR_SO_EWILOG2608166005_FINAL_REIMBURSEMENT_WORKPLAN_2026-10-19.md, yang menetapkan enam item final dan menggantikan ketentuan lama mengenai baris yang dipertahankan.

## 1. Tujuan dan Batas Scope

Menghapus tiga reimbursement yang disepakati sebagai duplikat beserta referensinya, kemudian menyesuaikan nominal invoice, hutang, dan piutang yang terdampak.

Target SO: EWILOG2608166005, ID lokal 322.
Target invoice: EWL2608166005, ID lokal 308.
ID harus divalidasi bersama nomor dokumen, deskripsi, vendor, quantity, dan nominal saat script dijalankan. Jika database hosting berbeda, script berhenti; tidak menebak berdasarkan nama.

| Reimbursement Dihapus | Deskripsi | Qty x Tarif | Total | Invoice Item | Komponen AP | Header AP |
| --- | --- | --- | --- | --- | --- | --- |
| 685 | PARKIR 1 | 1 x 50.000 | 50.000 | 9561 | 5262 | 1095 |
| 686 | TKBM 1 | 1 x 150.000 | 150.000 | 9562 | 5263 | 1095 |
| 687 | TKBM | 2 x 150.000 | 300.000 | 9563 | 5261 | 1093 |

Total pengurangan yang direncanakan: Rp500.000. Quantity harus dikalikan tarif; nilai amount reimbursement ID 687 adalah tarif Rp150.000, bukan total baris.

Dipertahankan tanpa perubahan:

- TKBM ID 663: qty 1, tarif dan total Rp300.000.
- PARKIR ID 683: qty 1, tarif dan total Rp100.000.
- PARKIR GUDANG ID 691, TKBM STUFFING ID 690, TBM 1 ID 684, dan seluruh item lainnya.
- Vendor, buying/selling main items, DP, pajak, tanggal dokumen, customer, serta snapshot CS.

Penghapusan menggunakan daftar ID eksplisit. Dilarang menggunakan LIKE '%TKBM%' atau LIKE '%PARKIR%' sebagai filter penghapusan.

## 2. Deliverable dan Mode Script

Script: scripts/repair-so-ewilog2608166005-remove-duplicate-tkbm-parkir.php.

- Default dry-run: hanya membaca dan mencetak rencana sebelum/sesudah.
- --apply: mengeksekusi rencana yang sudah lolos validasi dan membuat backup JSON sebelum perubahan.
- Jalankan ulang: tidak mengurangi total lagi jika semua target dan referensinya sudah bersih.
- Kondisi hanya sebagian target hilang atau referensi tidak cocok: berhenti untuk diperiksa, bukan meneruskan penghapusan parsial.
- Gunakan query terbatas dan transaksi database; hindari helper sinkronisasi global yang bisa membuat atau mengubah item di luar scope.
- Script dirancang kompatibel dengan schema produksi lama. Tidak bergantung pada migration fase lokal yang belum dideploy, seperti invoice_adjustments.

Perintah yang direncanakan, setelah script tersedia:

```bash
php scripts/repair-so-ewilog2608166005-remove-duplicate-tkbm-parkir.php
php scripts/repair-so-ewilog2608166005-remove-duplicate-tkbm-parkir.php --apply
```

## 3. Pemeriksaan Sebelum Eksekusi

1. Cocokkan identitas SO, invoice, tiga target hapus, dua item utama yang dipertahankan, dan pasangan invoice/AP-nya.
2. Cari seluruh referensi target, termasuk item_ref reimbursement_685/686/687, related_items AP, referensi ap_component, dan invoice lain yang mungkin menggunakannya.
3. Periksa pembayaran pada reimbursement, invoice items, AP components, catatan pembayaran, bank, dan petty cash. Jika ada pembayaran atau referensi yang memerlukan pemindahan histori, hentikan apply.
4. Periksa skema opsional yang memang tersedia, misalnya alokasi vendor invoice, audit, atau posting baru. Jika ditemukan hubungan yang belum didukung script, hentikan apply.
5. Cocokkan header invoice/AP/AR terhadap komponen pembentuknya sebelum menghitung perubahan. Selisih lama di luar target harus dilaporkan, bukan dibetulkan diam-diam.
6. Ambil snapshot seluruh baris yang akan berubah, item yang dipertahankan, dan referensi terkait. Backup wajib berhasil sebelum transaksi perubahan dimulai.

Temuan lokal saat rencana dibuat: ketiga reimbursement, invoice items, dan AP components target memiliki paid_amount nol; tidak ditemukan catatan AP pada tiga komponen atau petty cash pada tiga invoice items. Pemeriksaan wajib diulang saat apply di hosting; hasil lokal bukan jaminan keadaan hosting.

## 4. Urutan Repair dalam Satu Transaksi

1. Kunci baris SO, invoice, header AP/AR dan dependensi yang terdampak. Baca ulang dan validasi bahwa data masih sama dengan rencana.
2. Hapus tiga invoice items berdasarkan item_ref dan identitas yang sudah dicocokkan. Jika ada referensi AP lain yang dapat membentuk kembali item yang sama, hentikan apply sampai semua sumbernya tercakup.
3. Hapus tiga AP components target setelah memastikan tidak ada pembayaran, alokasi, atau catatan yang akan menjadi orphan.
4. Hapus reimbursement ID 685, 686, dan 687. Sumber reimbursement dan salinan invoice harus dibersihkan bersamaan.
5. Hitung ulang subtotal/total invoice dari item tersisa dengan formula invoice yang berlaku. Pertahankan DP, pajak main items, paid_amount, dan status dokumen. Jangan memakai helper yang sekaligus mereset field pajak lain.
6. Sesuaikan AR ID 368 dan komponen debit_note ID 537. Komponen main ID 538 harus tetap sama. Hitung outstanding dari nominal baru dikurangi pembayaran sah, dan pertahankan aturan overdue berdasarkan jatuh tempo.
7. Hitung ulang header AP 1093 dan 1095 dari komponen tersisa. Perbarui service_description hanya untuk menghilangkan deskripsi milik komponen yang dihapus. Pertahankan komponen lain, pembayaran, dan catatan vendor.
8. Jalankan pemeriksaan konsistensi seluruh scope sebelum commit. Jika ada kegagalan, rollback seluruh perubahan database.

Tidak menjalankan ulang generateFromSalesOrder atau sinkronisasi seluruh SO untuk memperbarui tiga item ini, karena berisiko mengubah komponen lain atau menulis ulang data non-target.

## 5. Perkiraan Nominal

Angka berikut berdasarkan pembacaan database lokal tanggal 16 Oktober 2026 dan harus dihitung ulang saat dry-run di lingkungan target.

| Bagian | Sebelum | Pengurangan | Sesudah |
| --- | --- | --- | --- |
| Invoice 308: subtotal/total | 32.917.498 | 500.000 | 32.417.498 |
| AR 368: invoice_amount/outstanding | 32.917.498 | 500.000 | 32.417.498 |
| AR debit_note 537: amount/outstanding | 21.569.498 | 500.000 | 21.069.498 |
| AR main 538 | 11.348.000 | 0 | 11.348.000 |
| AP 1093: amount/outstanding | 4.621.622 | 300.000 | 4.321.622 |
| AP 1095: amount/outstanding | 5.793.244 | 200.000 | 5.593.244 |

Pembayaran yang terbaca untuk header tersebut nol. Total baru harus berasal dari item/komponen tersisa dan lolos pembandingan delta, bukan sekadar pengurangan tanpa rekonsiliasi.

## 6. Bank, Profit, dan Laporan Posting

- Tidak membuat, menghapus, atau mengubah transaksi bank dan petty cash dalam repair ini. Jika target ternyata mempunyai transaksi terkait, apply berhenti.
- Invoice tercatat posted_to_profit_loss dan terhubung dengan profit_loss_entries ID 1341, periode 36. Periode tersebut terbaca draft.
- Formula model invoice lama mengecualikan reimbursement dari gross revenue dan operational costs. Karena itu penghapusan tiga reimbursement ini tidak otomatis berarti profit harus dikurangi Rp500.000.
- Cocokkan dasar posting sebelum/sesudah. Jika dampaknya nol sesuai formula, pertahankan entry 1341 dan total laporan posting. Selisih profit lama yang tidak berkaitan dengan target dilaporkan terpisah.
- Jika ditemukan posting AR/AP atau aturan reimbursement yang membuat koreksi laporan diperlukan, dry-run harus menjelaskan entry, periode, dan selisihnya. Apply berhenti jika koreksi tersebut belum didukung; jangan menyatakan seluruh laporan sinkron tanpa verifikasi.
- Laporan/export yang membaca invoice, AP, dan AR akan mengambil nominal hasil repair. Laporan yang membaca posting harus diverifikasi melalui sumber postingnya masing-masing.

## 7. Validasi Hasil dan Pencegahan Kemunculan Kembali

Pemeriksaan script sebelum commit:

- Tiga reimbursement target dan seluruh referensi invoice/AP target sudah tidak ada.
- TKBM 663 dan PARKIR 683 beserta seluruh item non-target tetap utuh.
- Invoice turun Rp500.000; AR reimbursement turun Rp500.000; total AP terdampak turun Rp500.000.
- Main invoice/AR, DP, pajak, pembayaran, transaksi bank, petty cash, snapshot CS, dan posting yang tidak terdampak tetap sama.
- Tidak ada referensi yatim ke target yang dihapus.

Pengujian setelah repair di salinan database lokal:

1. Buka ulang detail SO finance, invoice, AP terkait, dan AR; periksa jumlah baris dan nominal.
2. Buka preview/download PDF invoice; pastikan tiga item target tidak tercetak.
3. Buka detail invoice berulang kali; pastikan jumlah reimbursement tidak bertambah.
4. Simpan ulang SO tanpa menambahkan target, kemudian buka ulang invoice/AP/AR; pastikan target tidak terbentuk kembali dan nominal tetap sama.
5. Jalankan ulang dry-run; hasil harus sudah bersih tanpa usulan pengurangan kedua.

Uji membuka halaman dapat menjalankan sinkronisasi yang menulis database pada kode lama; lakukan pengujian tersebut setelah apply di salinan database, bukan dalam dry-run.

Repair ini membersihkan sumber dan referensi tiga item yang sudah ada. Perbaikan permanen logic hapus/sinkronisasi aplikasi merupakan pekerjaan terpisah; script data tidak dapat mencegah pengguna mengirim ulang item dari tab/form lama.

## 8. Tahapan Pelaksanaan

1. Tinjau dan setujui scope dokumen ini.
2. Buat script terisolasi sesuai daftar ID dan pengaman di atas.
3. Validasi sintaks, uji dry-run tanpa perubahan, dan uji apply/rollback/idempotensi pada salinan database lokal. Kasus pembayaran atau identitas berbeda harus ditolak.
4. Sampaikan hasil dry-run serta bukti pengujian sebelum menjalankan pada database operasional.
5. Eksekusi pada lingkungan target hanya setelah rencana hasil dry-run sesuai; simpan backup dan laporan before/after.

Tidak perlu import ulang seluruh database lokal ke hosting untuk menjalankan repair ini. Script terarah menghindari penimpaan transaksi hosting yang dibuat setelah backup lokal.

## 9. Hasil Pembuatan dan Pengujian Script

- Script menggunakan query builder, tanpa memanggil event model atau sinkronisasi global aplikasi.
- Dry-run pada database lokal office_app lolos. Daftar delete dan nominal sesudahnya cocok dengan tabel di atas.
- Sintaks PHP diperiksa menggunakan php -l.
- Pengujian otomatis menggunakan SQLite :memory: terpisah: 16 tests, 38 assertions, seluruhnya lulus.
- Pengujian mencakup dry-run tanpa penulisan, apply dan backup, data non-target tetap, eksekusi ulang tanpa pengurangan kedua, rollback ketika delete gagal, perubahan sejak rencana dibuat, target parsial, nominal berubah, pembayaran, catatan AP, referensi invoice tambahan, petty cash, foreign key tambahan, posting lain, periode tertutup, dan header yang tidak cocok dengan komponen.
- Apply otomatis hanya diuji pada database pengujian. Pengujian browser setelah repair pada salinan database nyata belum dilakukan; database operasional belum direpair.
- Script berhenti jika mendeteksi schema posting baru berisi data yang belum didukung. Untuk database lama yang diperiksa, schema tambahan tersebut tidak diperlukan.
- Backup sebelum apply disimpan ke storage/app/private/repair-backups/so-322-tkbm-parkir-<timestamp>-<random>.json. File berisi snapshot sebelum dan rencana sesudah; jika transaksi gagal, backup tetap tersedia dan perubahan database di-rollback.
- Script menjaga updated_at yang sudah ada agar pemeriksaan perubahan non-target dapat ketat; audit repair tersedia pada backup dan output CLI.

Catatan tambahan hasil dry-run: posting profit ID 1341 sebesar Rp3.341.500, sementara basis main billable dikurangi operational cost dari invoice sekarang Rp3.271.500. Selisih lama Rp70.000 ini tidak disebabkan oleh penghapusan tiga reimbursement; script mencetak catatan dan mempertahankan posting tersebut. Koreksi selisih profit merupakan scope terpisah.

Perintah verifikasi:

```bash
php -l scripts/repair-so-ewilog2608166005-remove-duplicate-tkbm-parkir.php
php vendor/bin/phpunit tests/Unit/RepairSo2608166005Test.php --do-not-cache-result
php scripts/repair-so-ewilog2608166005-remove-duplicate-tkbm-parkir.php
```

Untuk hosting, cukup tempatkan script ini di folder scripts pada aplikasi Laravel yang benar, jalankan dry-run, lalu tinjau nomor dokumen, database, dan nominal sebelum mempertimbangkan --apply. Tidak perlu menyalin codebase lokal yang masih berisi pengembangan lain. Tutup tab/form edit lama agar payload lama tidak mengirim ulang item setelah repair.
