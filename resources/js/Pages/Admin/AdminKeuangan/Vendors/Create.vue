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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">
                Tambah Vendor Baru
              </h2>
              <p class="text-sage-600">
                Tambahkan data vendor baru ke dalam master data
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
            Form Tambah Vendor
          </h3>
          <p class="text-sm text-sage-600 mt-1">
            Lengkapi informasi vendor dengan benar
          </p>
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
              <input
                type="file"
                id="photo"
                @change="handlePhotoChange"
                accept="image/*"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                :class="{ 'border-red-500': errors.photo }"
              />
              <p class="mt-1 text-xs text-gray-500">
                Format yang didukung: JPG, PNG, GIF. Maksimal 2MB.
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
              <input
                type="file"
                id="legal_document"
                @change="handleLegalDocumentChange"
                accept=".pdf"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                :class="{ 'border-red-500': errors.legal_document }"
              />
              <p class="mt-1 text-xs text-gray-500">
                Format yang didukung: PDF. Maksimal 10MB.
              </p>
              <div v-if="errors.legal_document" class="mt-1 text-sm text-red-600">
                {{ errors.legal_document }}
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end pt-4 border-t border-sage-200">
              <button
                type="submit"
                :disabled="form.processing"
                class="inline-flex items-center px-6 py-3 bg-sage-600 text-white rounded-lg hover:bg-sage-700 focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  v-if="form.processing"
                  class="w-4 h-4 mr-2 animate-spin"
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
                <svg
                  v-else
                  class="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {{ form.processing ? "Menyimpan..." : "Simpan Vendor" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { reactive } from "vue";
import { router, Link, useForm } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";

const props = defineProps({
  errors: Object,
});

// Form data using Inertia's useForm helper
const form = useForm({
  nama_vendor: "",
  pic: "",
  no_hp: "",
  email: "",
  no_kantor: "",
  nomor_rekening: "",
  nama_rekening: "",
  nib: "",
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
  form.post(route("admin-keuangan.vendors.store"), {
    onSuccess: () => {
      // Redirect will be handled by the controller
    },
    onError: (errors) => {
      console.log("Validation errors:", errors);
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

.focus\:ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
</style>