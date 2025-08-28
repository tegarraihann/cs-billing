<template>
  <AdminKeuanganLayout>
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
              :href="route('admin-keuangan.customers.pdf', customer.id)"
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
              :href="route('admin-keuangan.customers.edit', customer.id)"
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
              :href="route('admin-keuangan.customers.index')"
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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Company Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800 flex items-center">
                🏢 Informasi Perusahaan
              </h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-500">Nama Perusahaan</label>
                  <p class="text-sage-900 font-medium">{{ customer.company_name || '-' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Jenis Usaha</label>
                  <p class="text-sage-900 font-medium">{{ customer.company_type || '-' }}</p>
                </div>
                <div class="md:col-span-2">
                  <label class="text-sm font-medium text-gray-500">Alamat</label>
                  <p class="text-sage-900">{{ customer.company_address || '-' }}</p>
                </div>
                <div class="md:col-span-2" v-if="customer.invoice_address">
                  <label class="text-sm font-medium text-gray-500">Alamat Invoice</label>
                  <p class="text-sage-900">{{ customer.invoice_address }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- PIC Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800 flex items-center">
                👤 Informasi PIC
              </h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-500">Nama PIC</label>
                  <p class="text-sage-900 font-medium">{{ customer.pic_name || '-' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Email PIC</label>
                  <p class="text-sage-900 font-medium">{{ customer.pic_email || '-' }}</p>
                </div>
                <div class="md:col-span-2">
                  <label class="text-sm font-medium text-gray-500">Telepon PIC</label>
                  <p class="text-sage-900">{{ customer.pic_phone || '-' }}</p>
                </div>
              </div>
            </div>
          </div>


          <!-- Legal Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200" v-if="customer.nib || customer.npwp || customer.ktp_number">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800 flex items-center">
                📄 Data Legalitas
              </h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-if="customer.nib">
                  <label class="text-sm font-medium text-gray-500">NIB</label>
                  <p class="text-sage-900 font-medium">{{ customer.nib }}</p>
                </div>
                <div v-if="customer.npwp">
                  <label class="text-sm font-medium text-gray-500">NPWP</label>
                  <p class="text-sage-900 font-medium">{{ customer.npwp }}</p>
                </div>
                <div v-if="customer.ktp_number">
                  <label class="text-sm font-medium text-gray-500">Nomor KTP</label>
                  <p class="text-sage-900 font-medium">{{ customer.ktp_number }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Status Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">Status</h3>
            </div>
            <div class="p-6 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-500">Status Pelanggan</span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Aktif
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-500">Dibuat</span>
                <span class="text-sage-900 text-sm">{{ formatDate(customer.created_at) }}</span>
              </div>
              <div class="flex items-center justify-between" v-if="customer.handler">
                <span class="text-sm font-medium text-gray-500">Ditangani oleh</span>
                <span class="text-sage-900 text-sm font-medium">{{ customer.handler.name }}</span>
              </div>
            </div>
          </div>

          <!-- Marketing Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200" v-if="customer.marketing_name || customer.marketing_email || customer.marketing_phone">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800 flex items-center">
                📈 Data Marketing
              </h3>
            </div>
            <div class="p-6 space-y-3">
              <div v-if="customer.marketing_name">
                <label class="text-sm font-medium text-gray-500">Nama Marketing</label>
                <p class="text-sage-900 font-medium">{{ customer.marketing_name }}</p>
              </div>
              <div v-if="customer.marketing_email">
                <label class="text-sm font-medium text-gray-500">Email Marketing</label>
                <p class="text-sage-900">{{ customer.marketing_email }}</p>
              </div>
              <div v-if="customer.marketing_phone">
                <label class="text-sm font-medium text-gray-500">Telepon Marketing</label>
                <p class="text-sage-900">{{ customer.marketing_phone }}</p>
              </div>
            </div>
          </div>

          <!-- Files Section -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200" v-if="customer.photo_path || customer.legal_document_path">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">Dokumen</h3>
            </div>
            <div class="p-6 space-y-3">
              <div v-if="customer.photo_path" class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-500">Foto</span>
                <a :href="`/storage/${customer.photo_path}`" target="_blank" class="text-sage-600 hover:text-sage-700 text-sm">
                  Lihat Foto
                </a>
              </div>
              <div v-if="customer.legal_document_path" class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-500">Dokumen Legal</span>
                <a :href="`/storage/${customer.legal_document_path}`" target="_blank" class="text-sage-600 hover:text-sage-700 text-sm">
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";

const props = defineProps({
  customer: Object,
});

// Route helper definitions
const routes = {
  'admin-keuangan.customers.pdf': (id) => `/admin-keuangan/customers/${id}/pdf`,
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

.text-sage-900 {
  color: #5a7a4f;
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

.hover\:text-sage-700:hover {
  color: #7ba169;
}
</style>