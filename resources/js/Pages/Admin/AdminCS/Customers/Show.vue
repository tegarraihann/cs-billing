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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">
                {{ customer.company_name }}
              </h2>
              <p class="text-sage-600">
                Detail informasi pelanggan
              </p>
            </div>
          </div>
          <div class="flex space-x-2 mt-4 sm:mt-0">
            <a
              :href="route('admin-cs.customers.pdf', customer.id)"
              target="_blank"
              class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                />
              </svg>
              Export PDF
            </a>
            <Link
              :href="route('admin-cs.customers.edit', customer.id)"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </Link>
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

      <!-- Company Information -->
      <div class="mb-6">
        <div
          class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
            <h3 class="text-lg font-semibold text-sage-800">
              🏢 Informasi Perusahaan/Perorangan
            </h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Nama PT/Perorangan -->
              <div class="lg:col-span-2">
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Nama PT/Perorangan
                </label>
                <p class="text-gray-900 font-semibold">{{ customer.company_name || '-' }}</p>
              </div>

              <!-- Jenis Usaha -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Jenis Usaha
                </label>
                <p class="text-gray-900">
                  <span v-if="customer.company_type" class="inline-flex px-2 py-1 bg-sage-100 text-sage-800 text-sm rounded-full">
                    {{ customer.company_type }}
                  </span>
                  <span v-else>-</span>
                </p>
              </div>

              <!-- Alamat PT/Domisili -->
              <div class="lg:col-span-2">
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Alamat PT/Domisili
                </label>
                <p class="text-gray-900">{{ customer.company_address || '-' }}</p>
              </div>

              <!-- Alamat Kirim Invoice -->
              <div class="lg:col-span-2">
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Alamat Kirim Invoice
                </label>
                <p class="text-gray-900">{{ customer.invoice_address || '-' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Legal Information -->
      <div class="mb-6">
        <div
          class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
            <h3 class="text-lg font-semibold text-sage-800">
              📄 Data Legalitas
            </h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <!-- NIB -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  NIB (Nomor Induk Berusaha)
                </label>
                <p class="text-gray-900 font-mono">{{ customer.nib || '-' }}</p>
              </div>

              <!-- NPWP -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  NPWP
                </label>
                <p class="text-gray-900 font-mono">{{ customer.npwp || '-' }}</p>
              </div>

              <!-- KTP -->
              <div v-if="customer.company_type === 'Perorangan' || customer.ktp_number">
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Nomor KTP
                </label>
                <p class="text-gray-900 font-mono">{{ customer.ktp_number || '-' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- PIC and Marketing Information -->
      <div class="mb-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- PIC Information -->
          <div
            class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
          >
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">
                👤 Data PIC (Person In Charge)
              </h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <!-- Nama PIC -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Nama PIC
                  </label>
                  <p class="text-gray-900 font-semibold">{{ customer.pic_name || '-' }}</p>
                </div>

                <!-- Kontak PIC -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Kontak/Telepon Aktif PIC
                  </label>
                  <p class="text-gray-900">
                    <a v-if="customer.pic_phone" :href="`tel:${customer.pic_phone}`" class="text-sage-600 hover:text-sage-800">
                      {{ customer.pic_phone }}
                    </a>
                    <span v-else>-</span>
                  </p>
                </div>

                <!-- Email PIC -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Email Aktif PIC
                  </label>
                  <p class="text-gray-900">
                    <a v-if="customer.pic_email" :href="`mailto:${customer.pic_email}`" class="text-sage-600 hover:text-sage-800">
                      {{ customer.pic_email }}
                    </a>
                    <span v-else>-</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Marketing Information -->
          <div
            class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
          >
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">
                📈 Data Marketing
              </h3>
            </div>
            <div class="p-6">
              <div class="space-y-4">
                <!-- Nama Marketing -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Nama Marketing
                  </label>
                  <p class="text-gray-900 font-semibold">{{ customer.marketing_name || '-' }}</p>
                </div>

                <!-- Nomor Telepon Marketing -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Nomor Telepon Marketing
                  </label>
                  <p class="text-gray-900">
                    <a v-if="customer.marketing_phone" :href="`tel:${customer.marketing_phone}`" class="text-sage-600 hover:text-sage-800">
                      {{ customer.marketing_phone }}
                    </a>
                    <span v-else>-</span>
                  </p>
                </div>

                <!-- Email Marketing -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Email Marketing
                  </label>
                  <p class="text-gray-900">
                    <a v-if="customer.marketing_email" :href="`mailto:${customer.marketing_email}`" class="text-sage-600 hover:text-sage-800">
                      {{ customer.marketing_email }}
                    </a>
                    <span v-else>-</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- System Information -->
      <div class="mb-6">
        <div
          class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
            <h3 class="text-lg font-semibold text-sage-800">
              ℹ️ Informasi Sistem
            </h3>
          </div>

          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Handler -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Ditangani Oleh
                </label>
                <p class="text-gray-900">{{ customer.handler?.name || '-' }}</p>
              </div>

              <!-- Created At -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Dibuat
                </label>
                <p class="text-gray-900">{{ formatDateTime(customer.created_at) }}</p>
              </div>

              <!-- Updated At -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Terakhir Diperbarui
                </label>
                <p class="text-gray-900">{{ formatDateTime(customer.updated_at) }}</p>
              </div>

              <!-- Last Contact -->
              <div v-if="customer.last_contact_at">
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Kontak Terakhir
                </label>
                <p class="text-gray-900">{{ formatDateTime(customer.last_contact_at) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Document and Photo Information -->
      <div class="mt-6" v-if="customer.photo_path || customer.legal_document_path || (customer.legal_documents && customer.legal_documents.length > 0)">
        <div
          class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
            <h3 class="text-lg font-semibold text-sage-800">
              Dokumen & Foto
            </h3>
            <p class="text-sm text-sage-600 mt-1">
              File yang telah diunggah untuk pelanggan ini
            </p>
          </div>
          <div class="p-6 space-y-6">
            
            <!-- Photo Section -->
            <div v-if="customer.photo_path">
              <h4 class="text-md font-medium text-sage-700 mb-3">Foto Pelanggan</h4>
              <div class="border border-gray-200 rounded-lg p-4">
                <img
                  :src="`/storage/${customer.photo_path}`"
                  :alt="`Foto ${customer.company_name}`"
                  class="w-full max-w-sm h-auto rounded-lg shadow-sm"
                />
                <div class="mt-2">
                  <p class="text-sm text-gray-600">{{ customer.photo_path.split('/').pop() }}</p>
                  <a
                    :href="`/storage/${customer.photo_path}`"
                    target="_blank"
                    class="text-xs text-sage-600 hover:text-sage-800 mt-1 inline-block"
                  >
                    Buka gambar penuh
                  </a>
                </div>
              </div>
            </div>

            <!-- Multiple Legal Documents Section -->
            <div v-if="customer.legal_documents && customer.legal_documents.length > 0">
              <h4 class="text-md font-medium text-sage-700 mb-3">Dokumen Legal ({{ customer.legal_documents.length }} file)</h4>
              <div class="space-y-3">
                <div v-for="document in customer.legal_documents" :key="document.id" 
                     class="border border-gray-200 rounded-lg p-4">
                  <div class="flex items-center space-x-3">
                    <svg class="w-10 h-10 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">{{ document.document_name }}</p>
                      <p class="text-sm text-gray-500">{{ document.file_size_human }} • PDF</p>
                      <p class="text-xs text-gray-400">Diunggah: {{ formatDateTime(document.created_at) }}</p>
                      <div class="mt-2 flex space-x-4">
                        <a
                          :href="`/storage/${document.document_path}`"
                          target="_blank"
                          class="inline-flex items-center text-sm text-sage-600 hover:text-sage-800"
                        >
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          Lihat
                        </a>
                        <a
                          :href="`/storage/${document.document_path}`"
                          download
                          class="inline-flex items-center text-sm text-sage-600 hover:text-sage-800"
                        >
                          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                          Unduh
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Legacy Single Legal Document (fallback) -->
            <div v-if="customer.legal_document_path && (!customer.legal_documents || customer.legal_documents.length === 0)">
              <h4 class="text-md font-medium text-sage-700 mb-3">Dokumen Legal (Legacy)</h4>
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center space-x-3">
                  <svg class="w-12 h-12 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">{{ customer.legal_document_path.split('/').pop() }}</p>
                    <p class="text-sm text-gray-500">Dokumen PDF</p>
                    <div class="mt-2 space-x-4">
                      <a
                        :href="`/storage/${customer.legal_document_path}`"
                        target="_blank"
                        class="inline-flex items-center text-sm text-sage-600 hover:text-sage-800"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                        </svg>
                        Lihat
                      </a>
                      <a
                        :href="`/storage/${customer.legal_document_path}`"
                        download
                        class="inline-flex items-center text-sm text-sage-600 hover:text-sage-800"
                      >
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Unduh
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </AdminLayout>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import AdminLayout from "@/Layouts/AdminLayout.vue";

const props = defineProps({
  customer: Object,
});

// Route helper definitions
const routes = {
  'admin-cs.customers.pdf': (id) => `/admin-cs/customers/${id}/pdf`,
};

// Override global route function for this component
const route = (name, params) => {
  if (routes[name]) {
    return typeof routes[name] === 'function' ? routes[name](params) : routes[name];
  }
  return window.route ? window.route(name, params) : `#${name}`;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("id-ID", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
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

.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}
</style>
