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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">
                Edit Pelanggan: {{ customer.customer_code || customer.no }}
              </h2>
              <p class="text-sage-600">
                Perbarui informasi pelanggan dan status komunikasi
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
            Form Edit Pelanggan
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
                <!-- CURRENT PHOTO -->
                <div v-if="customer.photo_path">
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Foto Saat Ini
                  </label>
                  <div class="flex items-center space-x-4">
                    <img
                      :src="`/storage/${customer.photo_path}`"
                      alt="Foto Pelanggan"
                      class="w-20 h-20 object-cover rounded-lg border border-gray-200"
                    />
                    <p class="text-sm text-gray-600">{{ customer.photo_path.split('/').pop() }}</p>
                  </div>
                </div>

                <!-- FOTO -->
                <div>
                  <label
                    for="photo"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    {{ customer.photo_path ? 'Ganti Foto Pelanggan' : 'Foto Pelanggan' }}
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

                <!-- EXISTING LEGAL DOCUMENTS -->
                <div v-if="customer.legal_documents && customer.legal_documents.length > 0">
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Dokumen Legal Saat Ini
                  </label>
                  <div class="space-y-3">
                    <div v-for="document in customer.legal_documents" :key="document.id" 
                         class="flex items-center justify-between p-3 bg-gray-50 rounded border">
                      <div class="flex items-center space-x-3">
                        <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        <div>
                          <p class="text-sm font-medium text-gray-900">{{ document.document_name }}</p>
                          <p class="text-xs text-gray-500">{{ document.file_size_human }}</p>
                          <div class="mt-1 space-x-3">
                            <a
                              :href="`/storage/${document.document_path}`"
                              target="_blank"
                              class="text-xs text-sage-600 hover:text-sage-800"
                            >
                              Lihat
                            </a>
                            <a
                              :href="`/storage/${document.document_path}`"
                              download
                              class="text-xs text-sage-600 hover:text-sage-800"
                            >
                              Unduh
                            </a>
                          </div>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        @click="deleteExistingDocument(document.id)"
                        class="text-red-600 hover:text-red-800 text-sm px-3 py-1 border border-red-300 rounded hover:bg-red-50"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>

                <!-- OLD LEGAL DOCUMENT (fallback) -->
                <div v-if="customer.legal_document_path">
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Dokumen Legal Lama
                  </label>
                  <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-2">
                      <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                      </svg>
                      <div>
                        <p class="text-sm text-gray-900">{{ customer.legal_document_path.split('/').pop() }}</p>
                        <a
                          :href="`/storage/${customer.legal_document_path}`"
                          target="_blank"
                          class="text-xs text-sage-600 hover:text-sage-800"
                        >
                          Lihat Dokumen
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- TAMBAH DOKUMEN LEGAL BARU -->
                <div>
                  <label
                    for="legal_documents"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Tambah Dokumen Legal Baru (Multiple file)
                  </label>
                  <input
                    type="file"
                    id="legal_documents"
                    @change="handleLegalDocumentsChange"
                    accept=".pdf"
                    multiple
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                  />
                  <p class="mt-1 text-xs text-gray-500">
                    Format yang didukung: PDF. Maksimal 10MB per file. Dapat memilih multiple file sekaligus.
                  </p>
                  
                  <!-- Display selected files -->
                  <div v-if="selectedLegalDocuments.length > 0" class="mt-3">
                    <p class="text-sm font-medium text-sage-700 mb-2">File yang akan ditambahkan:</p>
                    <div class="space-y-2">
                      <div v-for="(file, index) in selectedLegalDocuments" :key="index" 
                           class="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
                        <div class="flex items-center space-x-2">
                          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                          </svg>
                          <span class="text-sm text-blue-900">{{ file.name }}</span>
                          <span class="text-xs text-blue-600">({{ formatFileSize(file.size) }})</span>
                        </div>
                        <button type="button" @click="removeLegalDocument(index)" 
                                class="text-red-600 hover:text-red-800 text-sm">
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div v-if="form.errors.legal_documents" class="mt-2 text-sm text-red-600">
                    {{ form.errors.legal_documents }}
                  </div>
                  <div v-if="form.errors['legal_documents.0']" class="mt-2 text-sm text-red-600">
                    {{ form.errors['legal_documents.0'] }}
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
                <span v-else>Update Pelanggan</span>
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
import axios from "axios";

const props = defineProps({
  customer: Object,
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
const isDocumentInfoOpen = ref(true);

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


const toggleDocumentInfo = () => {
  isDocumentInfoOpen.value = !isDocumentInfoOpen.value;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  // Parse tanggal dari string ISO dan konversi ke format yyyy-MM-dd
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const form = useForm({
  // Informasi Perusahaan/Perorangan
  company_name: props.customer.company_name || "",
  company_type: props.customer.company_type || "",
  company_address: props.customer.company_address || "",
  invoice_address: props.customer.invoice_address || "",
  // Data Legalitas
  nib: props.customer.nib || "",
  npwp: props.customer.npwp || "",
  ktp_number: props.customer.ktp_number || "",
  // Data PIC
  pic_name: props.customer.pic_name || "",
  pic_phone: props.customer.pic_phone || "",
  pic_email: props.customer.pic_email || "",
  // Data Marketing
  marketing_name: props.customer.marketing_name || "",
  marketing_phone: props.customer.marketing_phone || "",
  marketing_email: props.customer.marketing_email || "",
  photo: null,
  legal_documents: []
});


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


const handlePhotoChange = (event) => {
  const file = event.target.files[0];
  form.photo = file || null;
};

const selectedLegalDocuments = ref([]);

const handleLegalDocumentsChange = (event) => {
  const files = Array.from(event.target.files);
  selectedLegalDocuments.value = files;
  form.legal_documents = files;
};

const removeLegalDocument = (index) => {
  selectedLegalDocuments.value.splice(index, 1);
  form.legal_documents = selectedLegalDocuments.value;
};

const formatFileSize = (bytes) => {
  if (bytes >= 1048576) {
    return (bytes / 1048576).toFixed(2) + ' MB';
  } else if (bytes >= 1024) {
    return (bytes / 1024).toFixed(2) + ' KB';
  }
  return bytes + ' bytes';
};

const deleteExistingDocument = async (documentId) => {
  if (confirm('Apakah Anda yakin ingin menghapus dokumen ini?')) {
    try {
      await axios.delete(`/admin-cs/customers/documents/${documentId}`);
      
      // Remove from the customer.legal_documents array
      const index = props.customer.legal_documents.findIndex(doc => doc.id === documentId);
      if (index !== -1) {
        props.customer.legal_documents.splice(index, 1);
      }
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Terjadi kesalahan saat menghapus dokumen.');
    }
  }
};

const submit = () => {
  // Check if there are any files to upload
  const hasFiles = form.photo || (form.legal_documents && form.legal_documents.length > 0);
  
  if (hasFiles) {
    // Use POST with _method: PUT for file uploads
    form.transform((data) => ({
      ...data,
      _method: 'PUT'
    })).post(route("admin-cs.customers.update", props.customer.id), {
      onSuccess: () => {
        showAlert("success", "Berhasil", "Data pelanggan berhasil diperbarui.");
      },
      onError: (errors) => {
        console.log('Validation errors:', errors); // Debug log
        const errorMessage =
          Object.keys(errors).length > 0
            ? "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan."
            : "Terjadi kesalahan saat memperbarui data pelanggan.";
        showAlert("error", "Gagal Memperbarui", errorMessage);
      },
    });
  } else {
    // Use PUT method for regular data updates
    form.put(route("admin-cs.customers.update", props.customer.id), {
      onSuccess: () => {
        showAlert("success", "Berhasil", "Data pelanggan berhasil diperbarui.");
      },
      onError: (errors) => {
        console.log('Validation errors:', errors); // Debug log
        const errorMessage =
          Object.keys(errors).length > 0
            ? "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan."
            : "Terjadi kesalahan saat memperbarui data pelanggan.";
        showAlert("error", "Gagal Memperbarui", errorMessage);
      },
    });
  }
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
