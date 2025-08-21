<template>
  <AdminLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div
        class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">
                Tambah Pelanggan Baru
              </h2>
              <p class="text-sage-600">
                Tambahkan data pelanggan baru ke dalam sistem
              </p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0">
            <Link
              :href="route('admin-cs.customers.index')"
              class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali
            </Link>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div
        class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
          <h3 class="text-lg font-semibold text-sage-800">
            Form Tambah Pelanggan
          </h3>
          <p class="text-sm text-sage-600 mt-1">
            Lengkapi informasi pelanggan dengan benar
          </p>
        </div>

        <div class="p-6">
          <form @submit.prevent="submit" class="space-y-8">
            <!-- Company Information Section -->
            <div class="border border-sage-200 rounded-lg">
              <button
                type="button"
                @click="toggleCompanyInfo"
                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
              >
                <h4 class="text-lg font-semibold text-sage-800">
                  🏢 Informasi Perusahaan/Perorangan
                </h4>
                <svg
                  :class="{'rotate-180': isCompanyInfoOpen}"
                  class="w-5 h-5 text-sage-600 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="isCompanyInfoOpen" class="p-4 space-y-4">
                <!-- Nama PT/Perorangan -->
                <div>
                  <label
                    for="company_name"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Nama PT/Perorangan <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.company_name"
                    type="text"
                    id="company_name"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Masukkan nama perusahaan atau nama lengkap"
                  />
                  <div v-if="form.errors.company_name" class="mt-2 text-sm text-red-600">
                    {{ form.errors.company_name }}
                  </div>
                </div>

                <!-- Jenis Usaha -->
                <div>
                  <label
                    for="company_type"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Jenis Usaha <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.company_type"
                    id="company_type"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  >
                    <option value="">Pilih jenis usaha...</option>
                    <option value="PT">PT (Perseroan Terbatas)</option>
                    <option value="CV">CV (Commanditaire Vennootschap)</option>
                    <option value="Perorangan">Perorangan</option>
                    <option value="Yayasan">Yayasan</option>
                    <option value="Koperasi">Koperasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                  <div v-if="form.errors.company_type" class="mt-2 text-sm text-red-600">
                    {{ form.errors.company_type }}
                  </div>
                </div>

                <!-- Alamat PT/Domisili -->
                <div>
                  <label
                    for="company_address"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Alamat PT/Domisili <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="form.company_address"
                    id="company_address"
                    rows="3"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                    placeholder="Masukkan alamat lengkap perusahaan/domisili"
                  ></textarea>
                  <div v-if="form.errors.company_address" class="mt-2 text-sm text-red-600">
                    {{ form.errors.company_address }}
                  </div>
                </div>

                <!-- Alamat Kirim Invoice -->
                <div>
                  <label
                    for="invoice_address"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Alamat Kirim Invoice
                  </label>
                  <textarea
                    v-model="form.invoice_address"
                    id="invoice_address"
                    rows="3"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                    placeholder="Masukkan alamat untuk pengiriman invoice (opsional)"
                  ></textarea>
                  <div v-if="form.errors.invoice_address" class="mt-2 text-sm text-red-600">
                    {{ form.errors.invoice_address }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Legal Information Section -->
            <div class="border border-sage-200 rounded-lg">
              <button
                type="button"
                @click="toggleLegalInfo"
                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
              >
                <h4 class="text-lg font-semibold text-sage-800">
                  📄 Data Legalitas
                </h4>
                <svg
                  :class="{'rotate-180': isLegalInfoOpen}"
                  class="w-5 h-5 text-sage-600 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="isLegalInfoOpen" class="p-4 space-y-4">
                <!-- NIB -->
                <div>
                  <label
                    for="nib"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    NIB (Nomor Induk Berusaha)
                  </label>
                  <input
                    v-model="form.nib"
                    type="text"
                    id="nib"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Masukkan nomor induk berusaha"
                  />
                  <div v-if="form.errors.nib" class="mt-2 text-sm text-red-600">
                    {{ form.errors.nib }}
                  </div>
                </div>

                <!-- NPWP -->
                <div>
                  <label
                    for="npwp"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    NPWP
                  </label>
                  <input
                    v-model="form.npwp"
                    type="text"
                    id="npwp"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Masukkan nomor NPWP"
                  />
                  <div v-if="form.errors.npwp" class="mt-2 text-sm text-red-600">
                    {{ form.errors.npwp }}
                  </div>
                </div>

                <!-- KTP (jika perorangan) -->
                <div v-show="form.company_type === 'Perorangan'">
                  <label
                    for="ktp_number"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Nomor KTP
                  </label>
                  <input
                    v-model="form.ktp_number"
                    type="text"
                    id="ktp_number"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Masukkan nomor KTP"
                  />
                  <div v-if="form.errors.ktp_number" class="mt-2 text-sm text-red-600">
                    {{ form.errors.ktp_number }}
                  </div>
                </div>
              </div>
            </div>

            <!-- PIC Information Section -->
            <div class="border border-sage-200 rounded-lg">
              <button
                type="button"
                @click="togglePicInfo"
                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
              >
                <h4 class="text-lg font-semibold text-sage-800">
                  👤 Data PIC (Person In Charge)
                </h4>
                <svg
                  :class="{'rotate-180': isPicInfoOpen}"
                  class="w-5 h-5 text-sage-600 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="isPicInfoOpen" class="p-4 space-y-4">
                <!-- Nama PIC -->
                <div>
                  <label
                    for="pic_name"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Nama PIC <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.pic_name"
                    type="text"
                    id="pic_name"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Masukkan nama lengkap PIC"
                  />
                  <div v-if="form.errors.pic_name" class="mt-2 text-sm text-red-600">
                    {{ form.errors.pic_name }}
                  </div>
                </div>

                <!-- Kontak/Telepon PIC -->
                <div>
                  <label
                    for="pic_phone"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Kontak/Telepon Aktif PIC <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.pic_phone"
                    type="tel"
                    id="pic_phone"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Contoh: 08123456789"
                  />
                  <div v-if="form.errors.pic_phone" class="mt-2 text-sm text-red-600">
                    {{ form.errors.pic_phone }}
                  </div>
                </div>

                <!-- Email PIC -->
                <div>
                  <label
                    for="pic_email"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Email Aktif PIC <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.pic_email"
                    type="email"
                    id="pic_email"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="contoh@email.com"
                  />
                  <div v-if="form.errors.pic_email" class="mt-2 text-sm text-red-600">
                    {{ form.errors.pic_email }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Marketing Information Section -->
            <div class="border border-sage-200 rounded-lg">
              <button
                type="button"
                @click="toggleMarketingInfo"
                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
              >
                <h4 class="text-lg font-semibold text-sage-800">
                  📈 Data Marketing
                </h4>
                <svg
                  :class="{'rotate-180': isMarketingInfoOpen}"
                  class="w-5 h-5 text-sage-600 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="isMarketingInfoOpen" class="p-4 space-y-4">
                <!-- Nama Marketing -->
                <div>
                  <label
                    for="marketing_name"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Nama Marketing
                  </label>
                  <input
                    v-model="form.marketing_name"
                    type="text"
                    id="marketing_name"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Masukkan nama marketing yang bertanggung jawab"
                  />
                  <div v-if="form.errors.marketing_name" class="mt-2 text-sm text-red-600">
                    {{ form.errors.marketing_name }}
                  </div>
                </div>

                <!-- Nomor Telepon Marketing -->
                <div>
                  <label
                    for="marketing_phone"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Nomor Telepon Marketing
                  </label>
                  <input
                    v-model="form.marketing_phone"
                    type="tel"
                    id="marketing_phone"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Contoh: 08123456789"
                  />
                  <div v-if="form.errors.marketing_phone" class="mt-2 text-sm text-red-600">
                    {{ form.errors.marketing_phone }}
                  </div>
                </div>

                <!-- Email Marketing -->
                <div>
                  <label
                    for="marketing_email"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Email Marketing
                  </label>
                  <input
                    v-model="form.marketing_email"
                    type="email"
                    id="marketing_email"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="marketing@email.com"
                  />
                  <div v-if="form.errors.marketing_email" class="mt-2 text-sm text-red-600">
                    {{ form.errors.marketing_email }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Shipping Information Section -->
            <div class="border border-sage-200 rounded-lg">
              <button
                type="button"
                @click="toggleShippingInfo"
                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
              >
                <h4 class="text-lg font-semibold text-sage-800">
                  Informasi Pengiriman
                </h4>
                <svg
                  :class="{'rotate-180': isShippingInfoOpen}"
                  class="w-5 h-5 text-sage-600 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="isShippingInfoOpen" class="p-4 space-y-4">
                <!-- SO NUMBER -->
                <div>
                  <label
                    for="so_number"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    SO Number <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.so_number"
                    type="text"
                    id="so_number"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.so_number" class="mt-2 text-sm text-red-600">
                    {{ form.errors.so_number }}
                  </div>
                </div>

                <!-- CUSTOMER CODE -->
                <div>
                  <label
                    for="customer_code"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Customer Code <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.customer_code"
                    type="text"
                    id="customer_code"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.customer_code" class="mt-2 text-sm text-red-600">
                    {{ form.errors.customer_code }}
                  </div>
                </div>

                <!-- CONSIGNEE/SHIPPER -->
                <div>
                  <label
                    for="consignee_shipper"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Consignee/Shipper <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.consignee_shipper"
                    type="text"
                    id="consignee_shipper"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.consignee_shipper" class="mt-2 text-sm text-red-600">
                    {{ form.errors.consignee_shipper }}
                  </div>
                </div>

                <!-- AWB/BL NUMBER -->
                <div>
                  <label
                    for="awb_bl_number"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    AWB/BL Number <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.awb_bl_number"
                    type="text"
                    id="awb_bl_number"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.awb_bl_number" class="mt-2 text-sm text-red-600">
                    {{ form.errors.awb_bl_number }}
                  </div>
                </div>

                <!-- CUST DOC NAME -->
                <div>
                  <label
                    for="cust_doc_name"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Cust Doc Name
                  </label>
                  <input
                    v-model="form.cust_doc_name"
                    type="text"
                    id="cust_doc_name"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.cust_doc_name" class="mt-2 text-sm text-red-600">
                    {{ form.errors.cust_doc_name }}
                  </div>
                </div>

                <!-- TYPE QTY -->
                <div>
                  <label
                    for="type_qty"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Type Qty
                  </label>
                  <input
                    v-model="form.type_qty"
                    type="text"
                    id="type_qty"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.type_qty" class="mt-2 text-sm text-red-600">
                    {{ form.errors.type_qty }}
                  </div>
                </div>

                <!-- NO KONT/PALLET -->
                <div>
                  <label
                    for="no_kont_pallet"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    No Kont/Pallet
                  </label>
                  <input
                    v-model="form.no_kont_pallet"
                    type="text"
                    id="no_kont_pallet"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.no_kont_pallet" class="mt-2 text-sm text-red-600">
                    {{ form.errors.no_kont_pallet }}
                  </div>
                </div>

                <!-- POL/POD -->
                <div>
                  <label
                    for="pol_pod"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    POL/POD
                  </label>
                  <input
                    v-model="form.pol_pod"
                    type="text"
                    id="pol_pod"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.pol_pod" class="mt-2 text-sm text-red-600">
                    {{ form.errors.pol_pod }}
                  </div>
                </div>

                <!-- ETA -->
                <div>
                  <label
                    for="eta"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    ETA
                  </label>
                  <input
                    v-model="form.eta"
                    type="date"
                    id="eta"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.eta" class="mt-2 text-sm text-red-600">
                    {{ form.errors.eta }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Document Upload Section -->
            <div class="border border-sage-200 rounded-lg">
              <button
                type="button"
                @click="toggleDocumentInfo"
                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
              >
                <h4 class="text-lg font-semibold text-sage-800">
                  Dokumen & Foto
                </h4>
                <svg
                  :class="{'rotate-180': isDocumentInfoOpen}"
                  class="w-5 h-5 text-sage-600 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="isDocumentInfoOpen" class="p-4 space-y-4">
                <!-- FOTO -->
                <div>
                  <label
                    for="photo"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Foto Pelanggan
                  </label>
                  <input
                    type="file"
                    id="photo"
                    @change="handlePhotoChange"
                    accept="image/*"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                  />
                  <p class="mt-1 text-xs text-gray-500">
                    Format yang didukung: JPG, PNG, GIF. Maksimal 2MB.
                  </p>
                  <div v-if="form.errors.photo" class="mt-2 text-sm text-red-600">
                    {{ form.errors.photo }}
                  </div>
                </div>

                <!-- DOKUMEN LEGAL -->
                <div>
                  <label
                    for="legal_document"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Dokumen Legal
                  </label>
                  <input
                    type="file"
                    id="legal_document"
                    @change="handleLegalDocumentChange"
                    accept=".pdf"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                  />
                  <p class="mt-1 text-xs text-gray-500">
                    Format yang didukung: PDF. Maksimal 10MB.
                  </p>
                  <div v-if="form.errors.legal_document" class="mt-2 text-sm text-red-600">
                    {{ form.errors.legal_document }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Buying to Vendor Section -->
            <div class="border border-sage-200 rounded-lg">
              <button
                type="button"
                @click="toggleVendorInfo"
                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
              >
                <h4 class="text-lg font-semibold text-sage-800">
                  Buying to Vendor
                </h4>
                <svg
                  :class="{'rotate-180': isVendorInfoOpen}"
                  class="w-5 h-5 text-sage-600 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="isVendorInfoOpen" class="p-4 space-y-4">
                <!-- DESKRIPSI -->
                <div>
                  <label
                    for="deskripsi"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Deskripsi <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="form.vendor.deskripsi"
                    id="deskripsi"
                    rows="2"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                  ></textarea>
                  <div v-if="form.errors.vendor?.deskripsi" class="mt-2 text-sm text-red-600">
                    {{ form.errors.vendor.deskripsi }}
                  </div>
                </div>

                <!-- NOMINAL -->
                <div>
                  <label
                    for="nominal"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Nominal <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.vendor.nominalFormatted"
                    type="text"
                    id="nominal"
                    required
                    @input="formatNominal($event)"
                    @blur="updateNominalValue()"
                    placeholder="0"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.vendor?.nominal" class="mt-2 text-sm text-red-600">
                    {{ form.errors.vendor.nominal }}
                  </div>
                </div>

                <!-- PILIH VENDOR -->
                <div>
                  <label
                    for="vendor_id"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Pilih Vendor <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.vendor.vendor_id"
                    id="vendor_id"
                    required
                    @change="onVendorChange()"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  >
                    <option value="">Pilih vendor...</option>
                    <option v-for="vendorOption in vendors" :key="vendorOption.id" :value="vendorOption.id">
                      {{ vendorOption.nama_vendor }}
                    </option>
                  </select>
                  <div v-if="form.errors.vendor?.vendor_id" class="mt-2 text-sm text-red-600">
                    {{ form.errors.vendor.vendor_id }}
                  </div>
                </div>

                <!-- INFO VENDOR (Auto-filled from selected vendor) -->
                <div v-if="form.vendor.vendor_id" class="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-sage-100 rounded-lg">
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-1">
                      Nomor Rekening
                    </label>
                    <p class="text-sm text-gray-900 font-mono">{{ form.vendor.no_rekening || '-' }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-1">
                      Nama Rekening
                    </label>
                    <p class="text-sm text-gray-900">{{ form.vendor.nama_rekening || '-' }}</p>
                  </div>
                </div>

                <!-- RCVD INV -->
                <div>
                  <label
                    for="rcvd_inv"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    RCVD INV
                  </label>
                  <input
                    v-model="form.vendor.rcvd_inv"
                    type="text"
                    id="rcvd_inv"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.vendor?.rcvd_inv" class="mt-2 text-sm text-red-600">
                    {{ form.errors.vendor.rcvd_inv }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Submit Buttons -->
            <div
              class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200"
            >
              <Link
                :href="route('admin-cs.customers.index')"
                class="inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                :disabled="form.processing"
                class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  v-if="form.processing"
                  class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span v-if="form.processing">Menyimpan...</span>
                <span v-else>Simpan Pelanggan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Alert Dialog -->
    <AlertDialog
      :show="alertDialog.show"
      :type="alertDialog.type"
      :title="alertDialog.title"
      :message="alertDialog.message"
      :confirm-text="alertDialog.confirmText"
      :cancel-text="alertDialog.cancelText"
      @confirm="handleAlertConfirm"
      @cancel="handleAlertCancel"
      @close="closeAlert"
    />
  </AdminLayout>
</template>

<script setup>
import { ref } from "vue";
import { useForm, Link } from "@inertiajs/vue3";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import AlertDialog from "@/Components/AlertDialog.vue";

// Props
const props = defineProps({
  vendors: Array,
});

// Alert Dialog State
const alertDialog = ref({
  show: false,
  type: "info",
  title: "",
  message: "",
  confirmText: "",
  cancelText: "",
  onConfirm: null,
});

// Collapsible states
const isCompanyInfoOpen = ref(true);
const isLegalInfoOpen = ref(true);
const isPicInfoOpen = ref(true);
const isMarketingInfoOpen = ref(true);
const isShippingInfoOpen = ref(true);
const isDocumentInfoOpen = ref(true);
const isVendorInfoOpen = ref(true);

const toggleCompanyInfo = () => {
  isCompanyInfoOpen.value = !isCompanyInfoOpen.value;
};

const toggleLegalInfo = () => {
  isLegalInfoOpen.value = !isLegalInfoOpen.value;
};

const togglePicInfo = () => {
  isPicInfoOpen.value = !isPicInfoOpen.value;
};

const toggleMarketingInfo = () => {
  isMarketingInfoOpen.value = !isMarketingInfoOpen.value;
};

const toggleShippingInfo = () => {
  isShippingInfoOpen.value = !isShippingInfoOpen.value;
};

const toggleDocumentInfo = () => {
  isDocumentInfoOpen.value = !isDocumentInfoOpen.value;
};

const toggleVendorInfo = () => {
  isVendorInfoOpen.value = !isVendorInfoOpen.value;
};

const form = useForm({
  so_number: "",
  customer_code: "",
  // Informasi Perusahaan/Perorangan
  company_name: "",
  company_type: "",
  company_address: "",
  invoice_address: "",
  // Data Legalitas
  nib: "",
  npwp: "",
  ktp_number: "",
  // Data PIC
  pic_name: "",
  pic_phone: "",
  pic_email: "",
  // Data Marketing
  marketing_name: "",
  marketing_phone: "",
  marketing_email: "",
  // Data Pengiriman
  consignee_shipper: "",
  awb_bl_number: "",
  cust_doc_name: "",
  type_qty: "",
  no_kont_pallet: "",
  pol_pod: "",
  eta: "",
  photo: null,
  legal_document: null,
  vendor: {
    vendor_id: "",
    deskripsi: "",
    nominal: "",
    nominalFormatted: "",
    no_rekening: "",
    company_name: "",
    nama_rekening: "",
    rcvd_inv: ""
  }
});


const onVendorChange = () => {
  const selectedVendorId = form.vendor.vendor_id;
  if (selectedVendorId) {
    const selectedVendor = props.vendors.find(v => v.id == selectedVendorId);
    if (selectedVendor) {
      form.vendor.no_rekening = selectedVendor.nomor_rekening;
      form.vendor.company_name = selectedVendor.nama_vendor;
      form.vendor.nama_rekening = selectedVendor.nama_rekening;
    }
  } else {
    // Clear vendor data if no vendor selected
    form.vendor.no_rekening = "";
    form.vendor.company_name = "";
    form.vendor.nama_rekening = "";
  }
};

const formatNominal = (event) => {
  let value = event.target.value;
  // Remove all non-digit characters
  value = value.replace(/\D/g, '');
  
  // Add thousand separators (dots)
  if (value) {
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  
  form.vendor.nominalFormatted = value;
};

const updateNominalValue = () => {
  // Convert formatted value back to number for form submission
  form.vendor.nominal = form.vendor.nominalFormatted ? parseInt(form.vendor.nominalFormatted.replace(/\./g, '')) : '';
};

const handlePhotoChange = (event) => {
  const file = event.target.files[0];
  form.photo = file || null;
};

const handleLegalDocumentChange = (event) => {
  const file = event.target.files[0];
  form.legal_document = file || null;
};

const showAlert = (type, title, message, confirmText = "", cancelText = "") => {
  alertDialog.value = {
    show: true,
    type,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm: null,
  };
};

const handleAlertConfirm = () => {
  if (alertDialog.value.onConfirm) {
    alertDialog.value.onConfirm();
  }
};

const handleAlertCancel = () => {
  // Cancel logic if needed
};

const closeAlert = () => {
  alertDialog.value.show = false;
};

const submit = () => {
  form.post(route("admin-cs.customers.store"), {
    onSuccess: () => {
      showAlert(
        "success",
        "Berhasil",
        "Data pelanggan berhasil ditambahkan ke dalam sistem."
      );
    },
    onError: (errors) => {
      const errorMessage =
        Object.keys(errors).length > 0
          ? "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan."
          : "Terjadi kesalahan saat menyimpan data pelanggan.";
      showAlert("error", "Gagal Menyimpan", errorMessage);
    },
  });
};
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-600 {
  color: #8db580;
}

.text-sage-700 {
  color: #7ba169;
}

.text-sage-800 {
  color: #6b8f5e;
}

.bg-sage-50 {
  background-color: #f4f6f3;
}

.bg-sage-600 {
  background-color: #8db580;
}

.bg-sage-700 {
  background-color: #7ba169;
}

.border-sage-200 {
  border-color: #d4ddd0;
}

.border-sage-300 {
  border-color: #c0cdb8;
}

.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}

.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
  border-color: #8db580;
}
</style>
