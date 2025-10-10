<template>
  <AdminKeuanganLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4">
                <Users class="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 class="text-2xl font-semibold text-gray-900">{{ customer.company_name }}</h1>
                <p class="mt-1 text-sm text-gray-600">Detail informasi pelanggan</p>
              </div>
            </div>
            <div class="mt-4 sm:mt-0 flex space-x-3">
              <a
                :href="route('admin-keuangan.customers.pdf', customer.id)"
                target="_blank"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              >
                <FileText class="mr-2 h-4 w-4" />
                Export PDF
              </a>
              <Link
                :href="route('admin-keuangan.customers.edit', customer.id)"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              >
                <Edit class="mr-2 h-4 w-4" />
                Edit
              </Link>
              <Link
                :href="route('admin-keuangan.customers.index')"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              >
                <ArrowLeft class="mr-2 h-4 w-4" />
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Company Information -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900 flex items-center">
                <Building class="mr-2 h-5 w-5" />
                Informasi Perusahaan
              </h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-500">Nama Perusahaan</label>
                  <p class="text-gray-900 font-medium">{{ customer.company_name || '-' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Jenis Usaha</label>
                  <p class="text-gray-900 font-medium">{{ customer.company_type || '-' }}</p>
                </div>
                <div class="md:col-span-2">
                  <label class="text-sm font-medium text-gray-500">Alamat</label>
                  <p class="text-gray-900">{{ customer.company_address || '-' }}</p>
                </div>
                <div class="md:col-span-2" v-if="customer.invoice_address">
                  <label class="text-sm font-medium text-gray-500">Alamat Invoice</label>
                  <p class="text-gray-900">{{ customer.invoice_address }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- PIC Information -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900 flex items-center">
                <User class="mr-2 h-5 w-5" />
                Informasi PIC
              </h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-500">Nama PIC</label>
                  <p class="text-gray-900 font-medium">{{ customer.pic_name || '-' }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Email PIC</label>
                  <p class="text-gray-900 font-medium">{{ customer.pic_email || '-' }}</p>
                </div>
                <div class="md:col-span-2">
                  <label class="text-sm font-medium text-gray-500">Telepon PIC</label>
                  <p class="text-gray-900">{{ customer.pic_phone || '-' }}</p>
                </div>
              </div>
            </div>
          </div>


          <!-- Legal Information -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg" v-if="customer.nib || customer.npwp || customer.ktp_number">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900 flex items-center">
                <FileText class="mr-2 h-5 w-5" />
                Data Legalitas
              </h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div v-if="customer.nib">
                  <label class="text-sm font-medium text-gray-500">NIB</label>
                  <p class="text-gray-900 font-medium">{{ customer.nib }}</p>
                </div>
                <div v-if="customer.npwp">
                  <label class="text-sm font-medium text-gray-500">NPWP</label>
                  <p class="text-gray-900 font-medium">{{ customer.npwp }}</p>
                </div>
                <div v-if="customer.ktp_number">
                  <label class="text-sm font-medium text-gray-500">Nomor KTP</label>
                  <p class="text-gray-900 font-medium">{{ customer.ktp_number }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Status Information -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Status</h3>
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
                <span class="text-gray-900 text-sm">{{ formatDate(customer.created_at) }}</span>
              </div>
              <div class="flex items-center justify-between" v-if="customer.handler">
                <span class="text-sm font-medium text-gray-500">Ditangani oleh</span>
                <span class="text-gray-900 text-sm font-medium">{{ customer.handler.name }}</span>
              </div>
            </div>
          </div>

          <!-- Marketing Information -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg" v-if="customer.marketing_name || customer.marketing_email || customer.marketing_phone">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900 flex items-center">
                <TrendingUp class="mr-2 h-5 w-5" />
                Data Marketing
              </h3>
            </div>
            <div class="p-6 space-y-3">
              <div v-if="customer.marketing_name">
                <label class="text-sm font-medium text-gray-500">Nama Marketing</label>
                <p class="text-gray-900 font-medium">{{ customer.marketing_name }}</p>
              </div>
              <div v-if="customer.marketing_email">
                <label class="text-sm font-medium text-gray-500">Email Marketing</label>
                <p class="text-gray-900">{{ customer.marketing_email }}</p>
              </div>
              <div v-if="customer.marketing_phone">
                <label class="text-sm font-medium text-gray-500">Telepon Marketing</label>
                <p class="text-gray-900">{{ customer.marketing_phone }}</p>
              </div>
            </div>
          </div>

          <!-- Files Section -->
          <div class="bg-white shadow overflow-hidden sm:rounded-lg" v-if="customer.photo_path || customer.legal_document_path">
            <div class="px-6 py-4 border-b border-gray-200">
              <h3 class="text-lg font-medium text-gray-900">Dokumen</h3>
            </div>
            <div class="p-6 space-y-3">
              <div v-if="customer.photo_path" class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-500">Foto</span>
                <a :href="`/storage/${customer.photo_path}`" target="_blank" class="text-indigo-600 hover:text-indigo-900 text-sm">
                  Lihat Foto
                </a>
              </div>
              <div v-if="customer.legal_document_path" class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-500">Dokumen Legal</span>
                <a :href="`/storage/${customer.legal_document_path}`" target="_blank" class="text-indigo-600 hover:text-indigo-900 text-sm">
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
import { Users, FileText, Edit, ArrowLeft, Building, User, TrendingUp } from "lucide-vue-next";

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
.bg-sage-600 {
  background-color: #7ba169;
}

.bg-sage-700 {
  background-color: #6b8f5e;
}

.hover\:bg-sage-700:hover {
  background-color: #6b8f5e;
}

.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}
</style>