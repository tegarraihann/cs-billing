# Invoice Template Directory

## Template Word (.docx)

Letakkan file template Word dengan nama: `invoice_template.docx`

## Struktur Placeholder

### Field Tunggal
```
${CUSTOMER_CODE} - Kode customer
${CUSTOMER_NAME} - Nama customer 
${CUSTOMER_ADDRESS} - Alamat customer
${INVOICE_NUMBER} - Nomor invoice
${INVOICE_DATE} - Tanggal invoice
${TERM_DAYS} - Term pembayaran
${SHIPPER} - Nama shipper
${CONSIGNEE} - Nama consignee
${VESSEL} - Nama kapal
${POL_POD} - Port of Loading / Port of Discharge
${SUBTOTAL} - Subtotal
${TOTAL} - Total
```

### Tabel Items
Untuk tabel yang dinamis, buat 1 baris contoh di Word lalu gunakan placeholder:
```
${ITEM_DESC} - Deskripsi item
${ITEM_QTY} - Quantity
${ITEM_UNIT} - Unit (SET, BAG, etc)
${ITEM_RATE} - Rate/harga
${ITEM_CURRENCY} - Currency (IDR, USD)
${ITEM_AMOUNT} - Amount
```

## Upload Template

1. Akses halaman test: `/admin-keuangan/invoices-word-test`
2. Upload file .docx dengan struktur placeholder di atas
3. Test dengan invoice yang ada

## Catatan

- Template harus format .docx (bukan .doc)
- Placeholder case-sensitive: gunakan ${FIELD_NAME}
- Untuk tabel dinamis, PhpWord akan clone row otomatis
- Pastikan format template sesuai kebutuhan sebelum upload