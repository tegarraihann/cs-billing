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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">
                Edit Vendor: {{ vendor.nama_vendor }}
              </h2>
              <p class="text-sage-600">
                Perbarui informasi vendor
              </p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0">
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

      <!-- Form Section -->
      <div
        class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
          <h3 class="text-lg font-semibold text-sage-800">
            Form Edit Vendor
          </h3>
          <p class="text-sm text-sage-600 mt-1">
            Perbarui informasi vendor dengan benar
          </p>
        </div>

        <div class="p-6">
          <form @submit.prevent="submit" class="space-y-6">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="nama_vendor"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Nama Vendor <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.nama_vendor"
                  type="text"
                  id="nama_vendor"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  placeholder="Masukkan nama vendor"
                />
                <div v-if="form.errors.nama_vendor" class="mt-2 text-sm text-red-600">
                  {{ form.errors.nama_vendor }}
                </div>
              </div>

              <div>
                <label
                  for="nib"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  NIB
                </label>
                <input
                  v-model="form.nib"
                  type="text"
                  id="nib"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  placeholder="Nomor Induk Berusaha"
                />
                <div v-if="form.errors.nib" class="mt-2 text-sm text-red-600">
                  {{ form.errors.nib }}
                </div>
              </div>
            </div>

            <!-- Banking Information -->
            <div class="border-t border-sage-200 pt-6">
              <h4 class="text-lg font-semibold text-sage-800 mb-4">Informasi Rekening</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    for="nomor_rekening"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Nomor Rekening <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.nomor_rekening"
                    type="text"
                    id="nomor_rekening"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Masukkan nomor rekening"
                  />
                  <div v-if="form.errors.nomor_rekening" class="mt-2 text-sm text-red-600">
                    {{ form.errors.nomor_rekening }}
                  </div>
                </div>

                <div>
                  <label
                    for="nama_rekening"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Nama Rekening <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.nama_rekening"
                    type="text"
                    id="nama_rekening"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Nama pemilik rekening"
                  />
                  <div v-if="form.errors.nama_rekening" class="mt-2 text-sm text-red-600">
                    {{ form.errors.nama_rekening }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Document Upload -->
            <div class="border-t border-sage-200 pt-6">
              <h4 class="text-lg font-semibold text-sage-800 mb-4">Dokumen & File</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Photo Upload -->
                <div>
                  <label
                    for="photo"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Foto Vendor
                  </label>
                  <div v-if="vendor.photo_path" class="mb-2">
                    <p class="text-sm text-gray-600">Current file:</p>
                    <a 
                      :href="`/storage/${vendor.photo_path}`" 
                      target="_blank"
                      class="text-sage-600 hover:text-sage-700 text-sm"
                    >
                      Lihat foto saat ini
                    </a>
                  </div>
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

                <!-- Legal Document Upload -->
                <div>
                  <label
                    for="legal_document"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Dokumen Legal
                  </label>
                  <div v-if="vendor.legal_document_path" class="mb-2">
                    <p class="text-sm text-gray-600">Current file:</p>
                    <a 
                      :href="`/storage/${vendor.legal_document_path}`" 
                      target="_blank"
                      class="text-sage-600 hover:text-sage-700 text-sm"
                    >
                      Download dokumen saat ini
                    </a>
                  </div>
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

            <!-- Submit Buttons -->
            <div
              class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200"
            >
              <Link
                :href="route('admin-keuangan.vendors.index')"
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
                <span v-if="form.processing">Memperbarui...</span>
                <span v-else>Perbarui Vendor</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { useForm, Link } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";

const props = defineProps({
  vendor: Object,
});

const form = useForm({
  nama_vendor: props.vendor.nama_vendor || "",
  nomor_rekening: props.vendor.nomor_rekening || "",
  nama_rekening: props.vendor.nama_rekening || "",
  nib: props.vendor.nib || "",
  photo: null,
  legal_document: null
});

const handlePhotoChange = (event) => {
  const file = event.target.files[0];
  form.photo = file || null;
};

const handleLegalDocumentChange = (event) => {
  const file = event.target.files[0];
  form.legal_document = file || null;
};

const submit = () => {
  form.put(route("admin-keuangan.vendors.update", props.vendor.id), {
    onSuccess: () => {
      // Handle success
    },
    onError: (errors) => {
      // Handle errors
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