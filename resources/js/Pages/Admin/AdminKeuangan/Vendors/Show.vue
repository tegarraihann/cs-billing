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
                {{ vendor.nama_vendor }}
              </h2>
              <p class="text-sage-600">
                Detail informasi vendor
              </p>
            </div>
          </div>
          <div class="flex space-x-2 mt-4 sm:mt-0">
            <Link
              :href="route('admin-keuangan.vendors.edit', vendor.id)"
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
              :href="route('admin-keuangan.vendors.index')"
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
          <!-- Basic Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800 flex items-center">
                🏢 Informasi Dasar
              </h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-500">ID</label>
                  <p class="text-sage-900 font-medium">#{{ vendor.id }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Nama Vendor</label>
                  <p class="text-sage-900 font-medium">{{ vendor.nama_vendor }}</p>
                </div>
                <div v-if="vendor.nib" class="md:col-span-2">
                  <label class="text-sm font-medium text-gray-500">NIB (Nomor Induk Berusaha)</label>
                  <p class="text-sage-900">{{ vendor.nib }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Banking Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800 flex items-center">
                🏦 Informasi Rekening
              </h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="text-sm font-medium text-gray-500">Nomor Rekening</label>
                  <p class="text-sage-900 font-medium font-mono">{{ vendor.nomor_rekening }}</p>
                </div>
                <div>
                  <label class="text-sm font-medium text-gray-500">Nama Rekening</label>
                  <p class="text-sage-900 font-medium">{{ vendor.nama_rekening }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Files Section -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200" v-if="vendor.photo_path || vendor.legal_document_path">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">📄 Dokumen & File</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Photo -->
                <div v-if="vendor.photo_path" class="space-y-3">
                  <label class="text-sm font-medium text-gray-500">Foto Vendor</label>
                  <div class="border border-sage-200 rounded-lg overflow-hidden">
                    <img 
                      :src="`/storage/${vendor.photo_path}`" 
                      :alt="vendor.nama_vendor"
                      class="w-full h-48 object-cover"
                    />
                  </div>
                  <a 
                    :href="`/storage/${vendor.photo_path}`" 
                    target="_blank"
                    class="inline-flex items-center text-sage-600 hover:text-sage-700 text-sm"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Buka di tab baru
                  </a>
                </div>

                <!-- Legal Document -->
                <div v-if="vendor.legal_document_path" class="space-y-3">
                  <label class="text-sm font-medium text-gray-500">Dokumen Legal</label>
                  <div class="border border-sage-200 rounded-lg p-4 text-center">
                    <svg class="w-12 h-12 text-red-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" />
                    </svg>
                    <p class="text-sm text-gray-600">PDF Document</p>
                  </div>
                  <a 
                    :href="`/storage/${vendor.legal_document_path}`" 
                    target="_blank"
                    class="inline-flex items-center text-sage-600 hover:text-sage-700 text-sm"
                  >
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </a>
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
                <span class="text-sm font-medium text-gray-500">Status Vendor</span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Aktif
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-500">Dibuat</span>
                <span class="text-sage-900 text-sm">{{ formatDate(vendor.created_at) }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-500">Terakhir Diupdate</span>
                <span class="text-sage-900 text-sm">{{ formatDate(vendor.updated_at) }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">Quick Actions</h3>
            </div>
            <div class="p-6 space-y-3">
              <Link
                :href="route('admin-keuangan.vendors.edit', vendor.id)"
                class="w-full inline-flex items-center justify-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Vendor
              </Link>
              <button
                @click="deleteVendor"
                class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Hapus Vendor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { Link, router } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";

const props = defineProps({
  vendor: Object,
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const deleteVendor = () => {
  if (confirm(`Apakah Anda yakin ingin menghapus vendor ${props.vendor.nama_vendor}?`)) {
    router.delete(route("admin-keuangan.vendors.destroy", props.vendor.id), {
      onSuccess: () => {
        // Handle success - redirect to index
      }
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