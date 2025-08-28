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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
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
            <a
              :href="route('admin-keuangan.vendors.pdf', vendor.id)"
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

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Vendor Information -->
        <div class="lg:col-span-1">
          <div
            class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
          >
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">
                Informasi Vendor
              </h3>
            </div>

            <div class="p-6">
              <div class="space-y-6">
                <!-- ID Vendor -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    ID Vendor
                  </label>
                  <p class="text-gray-900 font-medium">#{{ vendor.id }}</p>
                </div>

                <!-- Nama Vendor -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Nama Vendor
                  </label>
                  <p class="text-gray-900">{{ vendor.nama_vendor }}</p>
                </div>

                <!-- PIC -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    PIC (Person In Charge)
                  </label>
                  <p class="text-gray-900">{{ vendor.pic || '-' }}</p>
                </div>

                <!-- No HP -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    No HP
                  </label>
                  <p class="text-gray-900 font-mono">{{ vendor.no_hp || '-' }}</p>
                </div>

                <!-- Email -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Email
                  </label>
                  <p class="text-gray-900">{{ vendor.email || '-' }}</p>
                </div>

                <!-- No Kantor -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    No Kantor
                  </label>
                  <p class="text-gray-900 font-mono">{{ vendor.no_kantor || '-' }}</p>
                </div>

                <!-- Nomor Rekening -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Nomor Rekening
                  </label>
                  <p class="text-gray-900 font-mono">{{ vendor.nomor_rekening }}</p>
                </div>

                <!-- Nama Rekening -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Nama Rekening
                  </label>
                  <p class="text-gray-900">{{ vendor.nama_rekening }}</p>
                </div>

                <!-- NIB -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    NIB (Nomor Induk Berusaha)
                  </label>
                  <p class="text-gray-900 font-mono">{{ vendor.nib || '-' }}</p>
                </div>

                <!-- Foto Vendor -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Foto Vendor
                  </label>
                  <div v-if="vendor.photo_path">
                    <img 
                      :src="`/storage/${vendor.photo_path}`" 
                      alt="Foto Vendor" 
                      class="w-32 h-32 object-cover rounded-lg border border-gray-200 mt-2"
                    />
                  </div>
                  <p v-else class="text-gray-500 italic">Tidak ada foto</p>
                </div>

                <!-- Dokumen Legal -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Dokumen Legal
                  </label>
                  <div v-if="vendor.legal_document_path">
                    <a 
                      :href="`/storage/${vendor.legal_document_path}`" 
                      target="_blank"
                      class="inline-flex items-center px-4 py-2 mt-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      Lihat Dokumen
                    </a>
                  </div>
                  <p v-else class="text-gray-500 italic">Tidak ada dokumen</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Information -->
        <div class="lg:col-span-1">
          <div
            class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
          >
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">
                Informasi Sistem
              </h3>
            </div>

            <div class="p-6">
              <div class="space-y-6">
                <!-- Tanggal Dibuat -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Tanggal Dibuat
                  </label>
                  <p class="text-gray-900">{{ formatDateTime(vendor.created_at) }}</p>
                </div>

                <!-- Terakhir Diperbarui -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Terakhir Diperbarui
                  </label>
                  <p class="text-gray-900">{{ formatDateTime(vendor.updated_at) }}</p>
                </div>

                <!-- Status -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Status
                  </label>
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
                      <circle cx="4" cy="4" r="3" />
                    </svg>
                    Aktif
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-6">
            <div
              class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
            >
              <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
                <h3 class="text-lg font-semibold text-sage-800">
                  Aksi
                </h3>
              </div>

              <div class="p-6">
                <div class="space-y-3">
                  <a
                    :href="route('admin-keuangan.vendors.pdf', vendor.id)"
                    target="_blank"
                    class="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                    :href="route('admin-keuangan.vendors.edit', vendor.id)"
                    class="w-full inline-flex items-center justify-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
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
                    Edit Vendor
                  </Link>

                  <button
                    @click="deleteVendor"
                    class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Hapus Vendor
                  </button>
                </div>
              </div>
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

// Route helper definitions
const routes = {
  'admin-keuangan.vendors.pdf': (id) => `/admin-keuangan/vendors/${id}/pdf`,
  'admin-keuangan.vendors.export.pdf': '/admin-keuangan/vendors/export/pdf',
};

// Override global route function for this component
const route = (name, params) => {
  if (routes[name]) {
    return typeof routes[name] === 'function' ? routes[name](params) : routes[name];
  }
  return window.route ? window.route(name, params) : `#${name}`;
};

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const deleteVendor = () => {
  if (confirm(`Apakah Anda yakin ingin menghapus vendor "${props.vendor.nama_vendor}"?`)) {
    router.delete(route("admin-keuangan.vendors.destroy", props.vendor.id), {
      onSuccess: () => {
        // Redirect will be handled by the controller
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

.text-sage-500 {
  color: #9fb894;
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