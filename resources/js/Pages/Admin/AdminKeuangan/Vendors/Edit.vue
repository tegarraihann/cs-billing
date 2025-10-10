<template>
  <AdminKeuanganLayout>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="bg-white shadow rounded-lg mb-6">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4">
                <Edit class="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 class="text-2xl font-semibold text-gray-900">Edit Vendor: {{ vendor.nama_vendor }}</h1>
                <p class="mt-1 text-sm text-gray-600">Perbarui informasi vendor</p>
              </div>
            </div>
            <div class="mt-4 sm:mt-0 flex space-x-3">
              <Link
                :href="route('admin-keuangan.vendors.show', vendor.id)"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <Eye class="mr-2 h-4 w-4" />
                Lihat Detail
              </Link>
              <Link
                :href="route('admin-keuangan.vendors.index')"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <ArrowLeft class="mr-2 h-4 w-4" />
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Form Edit Vendor</h3>
          <p class="mt-1 text-sm text-gray-600">Perbarui informasi vendor dengan benar</p>
        </div>

        <div class="p-6">
          <form @submit.prevent="submit" class="space-y-6">
            <!-- Nama Vendor -->
            <div>
              <label
                for="nama_vendor"
                class="block text-sm font-medium text-sage-700 mb-2"
              >
                Nama Vendor <span class="text-red-500">*</span>
              </label>
              <input
                id="nama_vendor"
                v-model="form.nama_vendor"
                type="text"
                placeholder="Masukkan nama vendor"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                :class="{ 'border-red-500': errors.nama_vendor }"
              />
              <div v-if="errors.nama_vendor" class="mt-1 text-sm text-red-600">
                {{ errors.nama_vendor }}
              </div>
            </div>

            <!-- PIC -->
            <div>
              <label
                for="pic"
                class="block text-sm font-medium text-sage-700 mb-2"
              >
                PIC (Person In Charge)
              </label>
              <input
                id="pic"
                v-model="form.pic"
                type="text"
                placeholder="Masukkan nama PIC"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                :class="{ 'border-red-500': errors.pic }"
              />
              <div v-if="errors.pic" class="mt-1 text-sm text-red-600">
                {{ errors.pic }}
              </div>
            </div>

            <!-- No HP -->
            <div>
              <label
                for="no_hp"
                class="block text-sm font-medium text-sage-700 mb-2"
              >
                No HP
              </label>
              <input
                id="no_hp"
                v-model="form.no_hp"
                type="text"
                placeholder="Masukkan nomor HP"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                :class="{ 'border-red-500': errors.no_hp }"
              />
              <div v-if="errors.no_hp" class="mt-1 text-sm text-red-600">
                {{ errors.no_hp }}
              </div>
            </div>

            <!-- Email -->
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-sage-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="Masukkan alamat email"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                :class="{ 'border-red-500': errors.email }"
              />
              <div v-if="errors.email" class="mt-1 text-sm text-red-600">
                {{ errors.email }}
              </div>
            </div>

            <!-- No Kantor -->
            <div>
              <label
                for="no_kantor"
                class="block text-sm font-medium text-sage-700 mb-2"
              >
                No Kantor
              </label>
              <input
                id="no_kantor"
                v-model="form.no_kantor"
                type="text"
                placeholder="Masukkan nomor kantor"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                :class="{ 'border-red-500': errors.no_kantor }"
              />
              <div v-if="errors.no_kantor" class="mt-1 text-sm text-red-600">
                {{ errors.no_kantor }}
              </div>
            </div>

            <!-- Nomor Rekening -->
            <div>
              <label
                for="nomor_rekening"
                class="block text-sm font-medium text-sage-700 mb-2"
              >
                Nomor Rekening <span class="text-red-500">*</span>
              </label>
              <input
                id="nomor_rekening"
                v-model="form.nomor_rekening"
                type="text"
                placeholder="Masukkan nomor rekening"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                :class="{ 'border-red-500': errors.nomor_rekening }"
              />
              <div v-if="errors.nomor_rekening" class="mt-1 text-sm text-red-600">
                {{ errors.nomor_rekening }}
              </div>
            </div>

            <!-- Nama Rekening -->
            <div>
              <label
                for="nama_rekening"
                class="block text-sm font-medium text-sage-700 mb-2"
              >
                Nama Rekening <span class="text-red-500">*</span>
              </label>
              <input
                id="nama_rekening"
                v-model="form.nama_rekening"
                type="text"
                placeholder="Masukkan nama pemilik rekening"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                :class="{ 'border-red-500': errors.nama_rekening }"
              />
              <div v-if="errors.nama_rekening" class="mt-1 text-sm text-red-600">
                {{ errors.nama_rekening }}
              </div>
            </div>

            <!-- NIB -->
            <div>
              <label
                for="nib"
                class="block text-sm font-medium text-sage-700 mb-2"
              >
                NIB (Nomor Induk Berusaha)
              </label>
              <input
                id="nib"
                v-model="form.nib"
                type="text"
                placeholder="Masukkan nomor induk berusaha"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                :class="{ 'border-red-500': errors.nib }"
              />
              <div v-if="errors.nib" class="mt-1 text-sm text-red-600">
                {{ errors.nib }}
              </div>
            </div>

            <!-- Foto Vendor -->
            <div>
              <label
                for="photo"
                class="block text-sm font-medium text-sage-700 mb-2"
              >
                Foto Vendor
              </label>
              <div v-if="vendor.photo_path" class="mb-3">
                <p class="text-sm text-gray-600 mb-2">Foto saat ini:</p>
                <img 
                  :src="`/storage/${vendor.photo_path}`" 
                  alt="Foto Vendor" 
                  class="w-20 h-20 object-cover rounded-lg border border-gray-200"
                />
              </div>
              <input
                type="file"
                id="photo"
                @change="handlePhotoChange"
                accept="image/*"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                :class="{ 'border-red-500': errors.photo }"
              />
              <p class="mt-1 text-xs text-gray-500">
                Format yang didukung: JPG, PNG, GIF. Maksimal 2MB. Kosongkan jika tidak ingin mengubah foto.
              </p>
              <div v-if="errors.photo" class="mt-1 text-sm text-red-600">
                {{ errors.photo }}
              </div>
            </div>

            <!-- Dokumen Legal -->
            <div>
              <label
                for="legal_document"
                class="block text-sm font-medium text-sage-700 mb-2"
              >
                Dokumen Legal
              </label>
              <div v-if="vendor.legal_document_path" class="mb-3">
                <p class="text-sm text-gray-600 mb-2">Dokumen saat ini:</p>
                <a 
                  :href="`/storage/${vendor.legal_document_path}`" 
                  target="_blank"
                  class="inline-flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Lihat Dokumen
                </a>
              </div>
              <input
                type="file"
                id="legal_document"
                @change="handleLegalDocumentChange"
                accept=".pdf"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                :class="{ 'border-red-500': errors.legal_document }"
              />
              <p class="mt-1 text-xs text-gray-500">
                Format yang didukung: PDF. Maksimal 10MB. Kosongkan jika tidak ingin mengubah dokumen.
              </p>
              <div v-if="errors.legal_document" class="mt-1 text-sm text-red-600">
                {{ errors.legal_document }}
              </div>
            </div>

            <!-- Submit & Cancel Buttons -->
            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <Link
                :href="route('admin-keuangan.vendors.show', vendor.id)"
                class="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <X class="w-4 h-4 mr-2" />
                Batal
              </Link>
              <button
                type="submit"
                :disabled="form.processing"
                class="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <LoaderCircle
                  v-if="form.processing"
                  class="w-4 h-4 mr-2 animate-spin"
                />
                <CheckCircle
                  v-else
                  class="w-4 h-4 mr-2"
                />
                {{ form.processing ? "Menyimpan..." : "Simpan Perubahan" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { Link, useForm } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";
import { Edit, Eye, ArrowLeft, X, LoaderCircle, CheckCircle } from "lucide-vue-next";

const props = defineProps({
  vendor: Object,
  errors: Object,
});

// Form data using Inertia's useForm helper with pre-filled data
const form = useForm({
  nama_vendor: props.vendor.nama_vendor,
  pic: props.vendor.pic || "",
  no_hp: props.vendor.no_hp || "",
  email: props.vendor.email || "",
  no_kantor: props.vendor.no_kantor || "",
  nomor_rekening: props.vendor.nomor_rekening,
  nama_rekening: props.vendor.nama_rekening,
  nib: props.vendor.nib || "",
  photo: null,
  legal_document: null,
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
  // Check if there are any files to upload
  const hasFiles = form.photo || form.legal_document;
  
  if (hasFiles) {
    // Use POST with _method: PUT for file uploads
    form.transform((data) => ({
      ...data,
      _method: 'PUT'
    })).post(route("admin-keuangan.vendors.update", props.vendor.id), {
      onSuccess: () => {
        // Redirect will be handled by the controller
      },
      onError: (errors) => {
        console.log("Validation errors:", errors);
      },
    });
  } else {
    // Use PUT method for regular data updates
    form.put(route("admin-keuangan.vendors.update", props.vendor.id), {
      onSuccess: () => {
        // Redirect will be handled by the controller
      },
      onError: (errors) => {
        console.log("Validation errors:", errors);
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
  background-color: #7ba169;
}

.bg-sage-700 {
  background-color: #6b8f5e;
}

.border-sage-200 {
  border-color: #d4ddd0;
}

.border-sage-300 {
  border-color: #c0cdb8;
}

.hover\:bg-sage-700:hover {
  background-color: #6b8f5e;
}

.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
  border-color: #8db580;
}

.focus\:ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
</style>