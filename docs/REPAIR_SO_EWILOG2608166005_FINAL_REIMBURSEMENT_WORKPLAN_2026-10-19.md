# Rencana Repair Final Reimbursement SO EWILOG2608166005

Tanggal: 19 Oktober 2026.
Status: disetujui dan sudah diterapkan pada database lokal office_app, 19 Oktober 2026. Hosting belum diubah. Hasil eksekusi ada di bagian 12.
Dokumen sebelumnya: REPAIR_SO_EWILOG2608166005_WORKPLAN_2026-10-16.md.

## 1. Acuan Final

Daftar terbaru dari user menjadi acuan seluruh reimbursement SO EWILOG2608166005. Hasil akhir tepat enam baris berikut, bukan enam baris ditambahkan ke data lama.

| Nama Final | Qty | Tarif | Total | ID Sumber Dipertahankan |
| --- | --- | --- | --- | --- |
| DEPOSIT KONTAINER | 1 | 2.800.000 | 2.800.000 | 653 |
| EXTRA KULI | 1 | 100.000 | 100.000 | 664 |
| STORAGE | 1 | 5.677.660 | 5.677.660 | 662 |
| LOLO | 2 | 821.622 | 1.643.244 | 689 |
| PARKIR | 2 | 50.000 | 100.000 | 683 |
| TKBM | 2 | 150.000 | 300.000 | 663 |
| Total | | | 10.620.904 | |

Nama terbaru DEPOSIT KONTAINER menggantikan usulan nama Liner kontainer pada diskusi sebelumnya. Main invoice, buying/selling jasa utama, other costs, customer, tanggal dokumen, DP dan pajak tidak termasuk perubahan ini.

## 2. Kondisi Setelah Repair Pertama

- SO ID 322; invoice EWL2608166005 ID 308; AR ID 368.
- Reimbursement ID 685, 686, 687 sudah tidak ada, termasuk pasangan invoice/AP-nya. Tidak boleh dikurangi Rp500.000 untuk kedua kalinya.
- Sekarang ada 13 baris reimbursement dengan total Rp21.069.498.
- Main invoice/AR Rp11.348.000; invoice/AR total Rp32.417.498; pembayaran terbaca nol.
- Target baru menggantikan batas scope lama yang dahulu mempertahankan seluruh item selain tiga duplikat tersebut.

## 3. Perubahan Baris yang Dipertahankan

| Reimbursement | Sebelum | Sesudah | Invoice Item | AP Component / Header |
| --- | --- | --- | --- | --- |
| 653 | DEVOSIT CONTAINER; 280.000 x 1 | DEPOSIT KONTAINER; 2.800.000 x 1 | 8645 | 5685 / 1067 |
| 664 | UANG KULI; 100.000 x 1 | EXTRA KULI; 100.000 x 1 | 8648 | 5160 / 1067 |
| 662 | STORAGE; 5.677.660 x 1 | Tetap | 8646 | 5688 / 1066 |
| 689 | LOLO; 821.622 x 2 | Tetap, menjadi satu-satunya LOLO | 9696 | 5362 / 1067 |
| 683 | PARKIR; 100.000 x 1 | PARKIR; 50.000 x 2 | 9512 | 5687 / 1067 |
| 663 | TKBM; 300.000 x 1 | TKBM; 150.000 x 2 | 8647 | 5686 / 1067 |

Untuk PARKIR dan TKBM, total baris tetap. Perubahan berada pada quantity/tarif, sehingga outstanding tidak boleh ikut dikalikan dua lagi.

Unit baris quantity 2 direncanakan 20GP, sesuai unit kontainer yang sudah digunakan pada data SO ini; baris quantity 1 mempertahankan unit SET. Unit baru harus terlihat di dry-run sebelum apply.

## 4. Baris Tambahan yang Dikeluarkan

| Reimbursement Dihapus | Nama | Total | Invoice Item | AP Component / Header |
| --- | --- | --- | --- | --- |
| 652 | DELIVERY ORDER | 7.353.728 | 8644 | 5684 / 1067 |
| 676 | LOLO | 1.643.244 | 9175 | 5232 / 1095 |
| 677 | LOLO 2 | 821.622 | 9176 | 5227 / 1093 |
| 684 | TBM 1 | 150.000 | 9513 | 5259 / 1095 |
| 690 | TKBM STUFFING | 100.000 | 9697 | 5363 / 1067 |
| 691 | PARKIR GUDANG | 100.000 | 9698 | 5364 / 1067 |
| 692 | CHARGE LINER CONTAINER | 2.800.000 | 9699 | 5365 / 1067 |

Total baris yang dikeluarkan Rp12.968.594. Koreksi Deposit menambah Rp2.520.000. Pengurangan bersih dari kondisi setelah repair pertama Rp10.448.594.

DELIVERY ORDER dan biaya tambahan lain dihapus karena tidak termasuk daftar final enam item, bukan karena seluruhnya otomatis dinyatakan duplikat berdasarkan nama.

## 5. Vendor AP dan Batas Asumsi

- STORAGE tetap vendor 62, UTC 3 / TPK KOJA.
- Rencana menggunakan vendor yang sudah melekat pada enam sumber terpilih. Lima sumber selain STORAGE saat ini vendor 19, INTERNAL DIVISION.
- Khusus LOLO, sumber 689 yang sudah berformat 821.622 x 2 menjadi kandidat final. Menghapus sumber 676 dan 677 mengurangi hutang BUDI SETIAWAN dan PUTRA TRANSINDO PACIFIC PT, bukan hanya mengubah tampilan invoice.
- Pemetaan sumber/vendor 689 dicantumkan saat persetujuan rencana dan ditegaskan kembali sebelum eksekusi. Eksekusi mengikuti pemetaan yang disetujui ini, tanpa memindahkan keeper ke vendor lain.
- Jika vendor sebenarnya berbeda, pemetaan AP dan perhitungan per vendor harus diperbarui dahulu. Total customer bisa tetap sama, tetapi rincian hutang tidak boleh diasumsikan sama.

## 6. Sinkronisasi Halaman dan Tabel

| Bagian | Penyesuaian |
| --- | --- |
| SO Finance | Tepat enam reimbursement live dengan nama, qty, tarif dan total final |
| Invoice detail | Update empat baris keeper dan hapus tujuh baris tambahan berdasarkan item_ref dan ID yang sudah diverifikasi |
| Preview/download PDF | Mengambil item invoice yang sudah bersih; pastikan enam baris dan total final |
| Reimbursement ledger | Sesuaikan amount sebagai tarif, quantity, unit, customer_outstanding_amount dan receipt_info.quantity/unit/unit_price; paid tetap nol |
| AP component | Update nama/total serta related_items.quantity/unit/unit_price pada keeper; hapus komponen target yang tidak memiliki histori |
| AP header/detail/export vendor | Hitung ulang dari komponen tersisa, perbarui service_description, outstanding dan status tanpa mengubah hutang jasa utama |
| AR header/detail/export customer | Hitung ulang nilai invoice dan outstanding; komponen debit_note menjadi 10.620.904, main tetap 11.348.000 |
| Financial Position | Pada kode yang diperiksa, piutang/hutang membaca AR/AP; verifikasi setelah keduanya diperbaiki. Snapshot laporan tersimpan tidak boleh dianggap otomatis ikut berubah |
| Profit Report / Income Statement | Verifikasi basis perhitungan dan posting; jangan mengurangi profit sebesar pengurangan reimbursement |

Snapshot CS adalah histori pengajuan awal. Rencana ini mempertahankannya, sehingga tampilan CS yang memang membaca snapshot tidak dipaksa sama dengan enam baris live Finance. Mengubah histori snapshot atau mekanisme tampilan CS memerlukan scope tersendiri.

## 7. Nominal Sebelum dan Sesudah

Angka AP berikut menggunakan asumsi vendor sumber 689 tetap INTERNAL DIVISION.

| Bagian | Sekarang | Target | Selisih |
| --- | --- | --- | --- |
| Reimbursement / AR debit_note 537 | 21.069.498 | 10.620.904 | -10.448.594 |
| Main invoice / AR main 538 | 11.348.000 | 11.348.000 | 0 |
| Invoice 308 / AR 368 | 32.417.498 | 21.968.904 | -10.448.594 |
| AP 1066: STORAGE | 5.677.660 | 5.677.660 | 0 |
| AP 1067: INTERNAL DIVISION | 13.086.972 | 5.253.244 | -7.833.728 |
| AP 1093: PUTRA TRANSINDO PACIFIC PT | 4.321.622 | 3.500.000 | -821.622 |
| AP 1095: BUDI SETIAWAN | 5.593.244 | 3.800.000 | -1.793.244 |

AP 1067 tetap mencakup biaya non-reimbursement HANDLING FIRST Rp100.000, MATERAI Rp10.000 dan REFUND Rp200.000. AP 1068 dan 1111 serta seluruh komponen non-reimbursement tetap. Angka target berasal dari komponen tersisa, bukan sekadar menimpa header dengan konstanta.

Pembayaran tetap nol sesuai pembacaan sekarang. Jika ada pembayaran baru sebelum eksekusi, script harus berhenti dan melaporkannya.

## 8. Penyelarasan Script dengan Repair Lama

Revisi script scripts/repair-so-ewilog2608166005-remove-duplicate-tkbm-parkir.php untuk menangani tiga keadaan yang dikenal:

1. Sebelum repair lama: 16 item sesuai identitas yang ditinjau. Rencana mencakup pembersihan tiga duplikat lama dan finalisasi enam item sekaligus. Delta total berbeda dari kondisi 13 item dan harus dicetak eksplisit.
2. Setelah repair lama: 13 item seperti data saat ini. Langsung finalisasi enam item; tidak mengurangi Rp500.000 lagi.
3. Sudah final: tepat enam item beserta seluruh nominal invoice/AP/AR yang sesuai. No-op, tidak menghapus atau mengurangi lagi.

Kondisi parsial, identitas berbeda, item baru di luar daftar yang ditinjau, nominal berbeda, atau referensi tambahan: hentikan script. Jangan menghapus seluruh reimbursement lalu membuat ulang dengan ID baru.

Pengaman status clean pada script lama harus direvisi: tidak cukup mengecek tiga ID lama sudah hilang; harus memeriksa seluruh enam item final, referensi, metadata quantity/tarif, dan total yang terhubung.

## 9. Langkah Eksekusi yang Direncanakan

1. Tinjau pemetaan item dan vendor AP, terutama LOLO.
2. Revisi script dan pengujian otomatis. Default tetap dry-run tanpa penulisan; --apply untuk perubahan.
3. Validasi seluruh identitas target, pembayaran, invoice vendor/alokasi, notes, bank, petty cash, foreign keys, serta posting dan status periode.
4. Cetak rencana lengkap sebelum/sesudah untuk SO, invoice, tiap vendor AP, AR dan laporan terkait. Validasi bahwa sumber lama yang bisa membuat item kembali sudah tercakup.
5. Saat apply, kunci dokumen dan baris terkait, baca ulang, buat backup JSON yang tervalidasi, dan lakukan semua perubahan dalam satu transaksi database.
6. Hapus salinan invoice/AP target bersama sumber reimbursement; update keeper beserta metadata; perbarui header AP dan AR dari komponen tersisa.
7. Cocokkan data setelah perubahan dengan rencana dan fingerprint data non-target. Jika satu langkah gagal, rollback semuanya.
8. Simpan laporan sebelum/sesudah dan lokasi backup. Hindari import ulang seluruh database hosting.

Script tidak memanggil sync global yang bisa mengganti vendor, mengubah buying/selling jasa lain, mengosongkan pajak atau membuat data tambahan.

## 10. Bank, Posting, dan Histori

- Tidak menghapus atau membuat transaksi bank/petty cash. Jika ditemukan histori pembayaran terkait item yang diubah/dihapus, hentikan apply.
- Pemeriksaan sekarang: paid_amount sumber/komponen target nol, tidak ditemukan notes pada komponen target maupun petty cash pada invoice items target. Wajib diulang di lingkungan eksekusi.
- Profit legacy mengecualikan reimbursement. Main billable dan operational cost tidak berubah pada repair ini, sehingga basis profit tidak boleh berubah hanya karena reimbursement dirapikan.
- Posting profit 1341 saat ini Rp3.341.500, sedangkan basis item invoice yang terakhir diperiksa Rp3.271.500. Selisih lama Rp70.000 dilaporkan terpisah dan tidak dikoreksi diam-diam.
- Periode 36 terbaca draft. Jika statusnya berubah menjadi closed atau ditemukan posting baru yang terdampak, script berhenti untuk penanganan periode/posting yang benar.

## 11. Pengujian Penerimaan

- Dari kondisi 16 item dan 13 item, hasil akhirnya sama: enam item dan total reimbursement Rp10.620.904.
- Eksekusi ulang pada kondisi final tidak mengubah angka, ID, atau metadata lagi.
- DP, pajak, main invoice/AR, jasa utama, other costs, bank, petty cash dan snapshot CS tetap.
- Nama EXTRA KULI dan DEPOSIT KONTAINER sama di SO Finance, invoice, PDF dan AP terkait.
- PARKIR tampil 50.000 x 2; TKBM 150.000 x 2; LOLO 821.622 x 2. Jangan menampilkan total baris sebagai tarif lalu mengalikannya lagi.
- Tidak ada DELIVERY ORDER, TBM 1, LOLO tambahan, TKBM STUFFING, PARKIR GUDANG atau CHARGE LINER CONTAINER pada reimbursement live/invoice/AP target.
- Tidak ada referensi yatim atau sumber tambahan yang dapat membentuk kembali item yang dikeluarkan.
- Uji pembayaran, alokasi/vendor invoice, perubahan nominal, data parsial, perubahan setelah dry-run, backup gagal dan kegagalan di tengah transaksi; semua harus ditolak atau rollback.
- Pada salinan database, buka detail invoice berulang kali, preview/download PDF, serta simpan ulang SO tanpa perubahan. Pastikan item tidak muncul kembali dan semua total stabil.
- Periksa rincian AP per vendor, AR customer, export, dan sumber Financial Position yang sebenarnya. Jangan menyatakan laporan posting sudah tersinkron sebelum diperiksa.

Apply dilakukan setelah persetujuan user, hasil dry-run dan pemetaan vendor AP sesuai rencana.

## 12. Hasil Eksekusi Lokal

- Database: MySQL office_app pada localhost; proses menolak lingkungan production atau host/database di luar lokal yang ditinjau.
- Transaksi berhasil commit. Tujuh sumber tambahan beserta tujuh invoice items dan tujuh AP components dihapus. Tiga sumber duplikat lama tetap tidak ada dan tidak dikurangi ulang.
- Empat sumber keeper diperbarui tanpa mengganti ID; lima invoice items diperbarui, termasuk normalisasi outstanding lama yang salah pada STORAGE. Empat AP components diperbarui nama/nominal/metadata.
- Tepat enam sumber dan enam invoice items reimbursement tersisa, sesuai tabel bagian 1. customer_outstanding_amount, invoice outstanding, receipt_info dan AP related_items sesuai quantity x tarif.
- Invoice 308 subtotal/total dan AR 368 invoice_amount/outstanding_amount: 21.968.904. AR debit_note 537: 10.620.904. AR main 538: tetap 11.348.000.
- AP 1066: 5.677.660; AP 1067: 5.253.244; AP 1093: 3.500.000; AP 1095: 3.800.000. AP 1068 tetap 100.000 dan AP 1111 tetap 166.500.
- Pembayaran tetap nol. Status invoice sent dan AR overdue dipertahankan. Tanggal dokumen, pajak, DP dan histori tidak diubah.
- Seluruh nilai setelah penulisan dibandingkan dengan snapshot rencana dalam transaksi. Seluruh baris non-target dalam snapshot harus identik atau transaksi rollback.
- Hash seluruh tabel sales_orders, bank_transactions, petty_cash_transactions, profit_loss_entries dan profit_loss_periods sebelum/sesudah sama. Snapshot CS yang berada pada SO juga dipertahankan.
- Apply kedua melalui CLI menghasilkan no-op, tanpa perubahan atau backup kedua.
- Posting profit 1341 tetap 3.341.500. Selisih lama 70.000 terhadap basis invoice 3.271.500 hanya dilaporkan, bukan dikoreksi.

Backup sebelum repair, termasuk snapshot sebelum/sesudah, daftar penulisan dan fingerprint:

`storage/app/private/repair-backups/so-322-tkbm-parkir-20261019-151249-d0a669d8b6.json`

Backup dibuat dan diverifikasi sebelum penulisan pertama; nama file memakai waktu runtime PHP. Ini backup record scope repair, bukan dump seluruh database dan bukan perintah restore otomatis.

### Verifikasi Otomatis

```powershell
php vendor/bin/phpunit tests/Unit/RepairSo2608166005FinalTest.php tests/Unit/RepairSo2608166005Test.php --do-not-cache-result
php scripts/repair-so-ewilog2608166005-remove-duplicate-tkbm-parkir.php
```

Hasil: 33 tests, 135 assertions lulus. Cakupan mencakup kondisi 16/13 item menuju hasil final yang sama, no-op, data tambahan/parsial/berubah, metadata quantity, pembayaran keeper, referensi invoice/AP tambahan, vendor invoice allocation, bank, notes, periode closed, fingerprint stale, backup gagal, dan rollback setelah delete ketika update gagal. Tes menggunakan SQLite terisolasi, bukan database operasional. Apply dan verifikasi akhir dijalankan pada MySQL lokal.

### Batas Verifikasi dan Hosting

- Verifikasi database dan pengaman script selesai; belum mengklaim UAT browser/PDF/export atau uji simpan ulang SO pada salinan aplikasi selesai.
- Database lokal masih tidak memiliki tabel invoice_adjustments yang diminta kode detail invoice versi lokal. Kendala schema/kode yang sudah ada ini tidak diperbaiki lewat migrasi atau perubahan controller dalam scope repair data.
- Tutup form SO/invoice lama sebelum melakukan input lagi; jangan menyimpan formulir yang masih memuat data sebelum repair.
- Perubahan hanya pada script repair, tes, dokumentasi dan record database lokal yang ditargetkan. Tidak ada deploy, push atau perubahan database hosting.
- CLI script sekarang menggunakan rencana final enam item, bukan hanya pembersihan tiga duplikat awal. Dry-run default dan --apply tetap eksplisit. Constructor dua argumen masih mempertahankan mode legacy untuk pengujian/kompatibilitas; mode final programmatic memakai argumen ketiga true.
- Jika akan menerapkan ke hosting, jalankan dry-run terhadap data hosting terbaru dan tinjau hasilnya; jangan menimpa seluruh database hosting dengan dump lokal karena dapat menghilangkan transaksi terbaru.
