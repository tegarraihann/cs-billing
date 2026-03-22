# Final Report AR/AP Balance

Tanggal: 14 Maret 2026

## Ringkasan Utama

Setelah dilakukan pengecekan ulang menggunakan:

- data sistem terbaru
- update saldo per 13 Maret 2026
- daftar hutang client
- daftar piutang client

maka kesimpulannya adalah:

1. **Saldo bank sudah sesuai**
2. **Masalah yang tersisa ada di hutang dan piutang**
3. Penyebabnya **bukan karena semua data salah**
4. Penyebabnya adalah karena **data yang benar masih bercampur dengan data lama yang belum dibersihkan**

## Kondisi yang Sudah Sesuai

### 1. Saldo Bank

Per 13 Maret 2026, saldo bank pada sistem sudah sangat dekat atau sudah sama dengan data client:

- **Mandiri**: sudah sesuai secara praktik
- **BCA**: sudah sesuai

Artinya, fokus masalah sekarang **bukan lagi di saldo bank**.

## Kondisi yang Masih Belum Sesuai

### 1. Hutang

Total hutang di sistem masih belum sama dengan daftar hutang client.

Setelah dicocokkan dengan dokumen hutang client, hasilnya:

- ada beberapa hutang yang memang **benar dan valid**
- ada beberapa hutang yang **tercatat dobel**
- ada beberapa hutang yang **jumlahnya lebih besar dari daftar client**
- ada beberapa hutang yang **statusnya belum diperbarui**

### 2. Piutang

Total piutang di sistem juga masih belum sama dengan daftar piutang client.

Setelah dicocokkan dengan dokumen piutang client, hasilnya:

- ada banyak piutang yang memang **sudah benar**
- tetapi ada beberapa piutang yang **terbaca ganda**
- penyebab utamanya adalah ada data lama yang masih terbaca bersamaan dengan data final yang baru

## Penjelasan Sederhana Penyebab Masalah

### A. Penyebab Hutang Belum Balance

Masalah hutang saat ini terjadi karena:

1. Ada hutang vendor yang memang valid dan harus tetap ada
2. Ada hutang vendor yang tercatat **lebih dari sekali**
3. Ada hutang vendor yang nominalnya di sistem **lebih besar** dari daftar client
4. Ada beberapa data vendor yang penamaannya atau pengelompokannya belum rapi
5. Ada beberapa data yang sebenarnya sudah lunas, tetapi statusnya belum ikut berubah

### Vendor yang Perlu Diprioritaskan untuk Dicek / Dibereskan

1. **Shenzhen Maxspeed Logistics**
   - ini yang paling jelas bermasalah
   - ada data yang tercatat dobel

2. **PT Gemilang Sukses Mandiri**
   - total hutang di sistem masih lebih besar dari daftar client

3. **Reimburst Mustika**
   - perlu dirapikan karena pencatatan di sistem belum terbaca sejelas daftar client

4. **Ridwan**
   - menurut informasi client seharusnya sudah lunas
   - tetapi di sistem masih tersisa outstanding

### Vendor yang Sudah Cukup Sehat / Sesuai

1. **PT Samudera Perdana Selaras**
2. **CV JSN Sentosa Cargo**
3. **Sebagian besar PT Prasetya Mitra Persada**

Artinya, tidak semua hutang harus dibersihkan. Ada banyak yang memang sudah benar.

## B. Penyebab Piutang Belum Balance

Masalah piutang saat ini terjadi karena:

1. Ada piutang yang memang valid dan harus tetap ada
2. Ada beberapa nomor SO yang punya:
   - data lama yang dipecah
   - lalu dibuat data final baru
3. Di sistem, keduanya masih terbaca bersama
4. Akibatnya total piutang menjadi terlihat lebih besar atau tidak sama dengan daftar client

### Kasus Piutang yang Paling Jelas

Ada dua kelompok yang paling kuat menunjukkan masalah ini:

1. **SO 2512-297019**
2. **SO 2512-298020**

Di dua SO ini, angka pada daftar client menunjukkan bahwa yang benar adalah **nilai final gabungan**.

Namun di sistem, data pecahan lamanya masih ikut terbaca.

Akibatnya, piutang untuk kelompok ini menjadi tidak bersih.

### Bagian Piutang yang Sudah Terbukti Sesuai

Banyak data piutang lain ternyata sudah sesuai dengan daftar client.

Artinya, sama seperti hutang:

- masalahnya bukan semua piutang salah
- masalahnya hanya di beberapa kelompok tertentu yang belum dibersihkan

## Kesimpulan Akhir

Masalah hutang dan piutang yang belum balance **bukan karena seluruh sistem salah**, dan juga **bukan karena semua data belum diinput**.

Masalah utamanya adalah:

1. Data yang benar masih bercampur dengan data lama
2. Ada beberapa data yang dobel
3. Ada beberapa data yang statusnya belum diperbarui
4. Ada beberapa data vendor/customer yang perlu dirapikan agar sesuai dengan daftar client

## Solusi yang Disarankan

Solusi yang paling aman **bukan** menghapus data secara massal.

Solusinya adalah:

1. Jadikan dokumen hutang dan piutang client sebagai acuan resmi
2. Bersihkan data secara bertahap
3. Pisahkan mana yang:
   - valid
   - dobel
   - salah status
   - perlu dirapikan

### Urutan Perbaikan yang Disarankan

#### Tahap 1: Hutang

Prioritas vendor:

1. Shenzhen Maxspeed Logistics
2. PT Gemilang Sukses Mandiri
3. Reimburst Mustika
4. Ridwan

#### Tahap 2: Piutang

Prioritas SO:

1. 2512-297019
2. 2512-298020

## Rekomendasi Tindakan

Langkah berikutnya yang paling aman:

1. Buat daftar final data mana yang harus dipertahankan
2. Buat daftar data mana yang harus dibersihkan
3. Jalankan perbaikan secara bertahap dengan script khusus
4. Setelah itu hitung ulang total hutang dan piutang
5. Cocokkan lagi dengan daftar client

## Penutup

Jadi posisi saat ini adalah:

- **saldo bank sudah aman**
- **masalah hutang dan piutang sudah mulai jelas sumbernya**
- **perbaikannya bisa dilakukan**
- tetapi harus dilakukan **bertahap dan hati-hati**, agar data yang benar tidak ikut terhapus
