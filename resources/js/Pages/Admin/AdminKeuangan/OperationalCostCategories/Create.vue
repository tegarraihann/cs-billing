<template>
  <AdminKeuanganLayout>
    <div class="min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-sage-800">
              Add Chart Of Accounts
            </h1>
            <p class="text-sage-600 mt-1">
              Buat Chart Of Accounts baru untuk sistem finance
            </p>
          </div>
          <Link
            :href="route('admin-keuangan.operational-cost-categories.index')"
            class="bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
          >
            <svg
              class="w-4 h-4"
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
            <span>Kembali</span>
          </Link>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200">
        <div class="p-6 border-b border-sage-200">
          <h2 class="text-lg font-semibold text-sage-800">
            Informasi Kategori
          </h2>
          <p class="text-sm text-sage-600 mt-1">
            Lengkapi form di bawah untuk menambahkan chart of accounts baru
          </p>
        </div>

        <form @submit.prevent="submit" class="p-6 space-y-6">
          <!-- Nama Kategori -->
          <div>
            <label for="name" class="block text-sm font-medium text-sage-700 mb-2">
              Nama Kategori <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Masukkan nama chart of accounts"
              class="w-full rounded-lg border-sage-300 focus:border-sage-500 focus:ring-sage-500"
              :class="{ 'border-red-300 focus:border-red-500': form.errors.name }"
              required
            />
            <div v-if="form.errors.name" class="mt-1 text-sm text-red-600">
              {{ form.errors.name }}
            </div>
          </div>

          <!-- Deskripsi -->
          <div>
            <label for="description" class="block text-sm font-medium text-sage-700 mb-2">
              Deskripsi
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="3"
              placeholder="Masukkan deskripsi kategori (opsional)"
              class="w-full rounded-lg border-sage-300 focus:border-sage-500 focus:ring-sage-500"
              :class="{ 'border-red-300 focus:border-red-500': form.errors.description }"
            ></textarea>
            <div v-if="form.errors.description" class="mt-1 text-sm text-red-600">
              {{ form.errors.description }}
            </div>
          </div>

          <!-- Status -->
          <div>
            <label for="is_active" class="block text-sm font-medium text-sage-700 mb-2">
              Status
            </label>
            <div class="flex items-center space-x-6">
              <label class="flex items-center">
                <input
                  id="is_active_true"
                  v-model="form.is_active"
                  type="radio"
                  :value="true"
                  class="text-sage-600 focus:ring-sage-500"
                />
                <span class="ml-2 text-sm text-sage-700">Aktif</span>
              </label>
              <label class="flex items-center">
                <input
                  id="is_active_false"
                  v-model="form.is_active"
                  type="radio"
                  :value="false"
                  class="text-sage-600 focus:ring-sage-500"
                />
                <span class="ml-2 text-sm text-sage-700">Tidak Aktif</span>
              </label>
            </div>
            <div v-if="form.errors.is_active" class="mt-1 text-sm text-red-600">
              {{ form.errors.is_active }}
            </div>
          </div>

          <!-- Submit Buttons -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-sage-200">
            <Link
              :href="route('admin-keuangan.operational-cost-categories.index')"
              class="bg-sage-100 hover:bg-sage-200 text-sage-700 px-6 py-2 rounded-lg transition-colors font-medium"
            >
              Batal
            </Link>
            <button
              type="submit"
              :disabled="form.processing"
              class="bg-sage-600 hover:bg-sage-700 disabled:bg-sage-400 text-white px-6 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
            >
              <svg
                v-if="form.processing"
                class="animate-spin w-4 h-4"
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
                class="w-4 h-4"
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
              <span>{{ form.processing ? 'Menyimpan...' : 'Simpan Kategori' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { reactive } from 'vue'
import { Link, useForm } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

// Route function
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.operational-cost-categories.index': '/admin-keuangan/operational-cost-categories',
    'admin-keuangan.operational-cost-categories.store': '/admin-keuangan/operational-cost-categories',
  }
  return routes[name] || '#'
}

// Form
const form = useForm({
  name: '',
  description: '',
  is_active: true,
})

// Methods
const submit = () => {
  form.post(route('admin-keuangan.operational-cost-categories.store'), {
    onSuccess: () => {
      // Success message will be handled by the controller redirect
    },
  })
}
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-100 { color: #f4f6f3; }
.text-sage-500 { color: #8db580; }
.text-sage-600 { color: #8db580; }
.text-sage-700 { color: #7ba169; }
.text-sage-800 { color: #6b8f5e; }
.text-sage-900 { color: #5a7a4d; }
.bg-sage-50 { background-color: #f4f6f3; }
.bg-sage-100 { background-color: #e8ece5; }
.bg-sage-200 { background-color: #d4ddd0; }
.bg-sage-400 { background-color: #a8b89c; }
.bg-sage-600 { background-color: #8db580; }
.bg-sage-700 { background-color: #7ba169; }
.border-sage-200 { border-color: #d4ddd0; }
.border-sage-300 { border-color: #c1cbb9; }
.border-sage-500 { border-color: #8db580; }
.hover\:bg-sage-200:hover { background-color: #d4ddd0; }
.hover\:bg-sage-700:hover { background-color: #7ba169; }
.focus\:border-sage-500:focus { border-color: #8db580; }
.focus\:ring-sage-500:focus { --tw-ring-color: #8db580; }
.disabled\:bg-sage-400:disabled { background-color: #a8b89c; }
</style>
