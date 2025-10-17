<template>
  <AdminKeuanganLayout>
    <div class="min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-sage-800">
              Edit Kategori Biaya Operasional
            </h1>
            <p class="text-sage-600 mt-1">
              Perbarui informasi kategori biaya operasional
            </p>
          </div>
          <div class="flex items-center space-x-3">
            <Link
              :href="route('admin-keuangan.operational-cost-categories.show', operationalCostCategory.id)"
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              <span>Lihat Detail</span>
            </Link>
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
      </div>

      <!-- Form Section -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200">
        <div class="p-6 border-b border-sage-200">
          <h2 class="text-lg font-semibold text-sage-800">
            Informasi Kategori
          </h2>
          <p class="text-sm text-sage-600 mt-1">
            Perbarui form di bawah untuk mengubah informasi kategori biaya operasional
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
              placeholder="Masukkan nama kategori biaya operasional"
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
              :href="route('admin-keuangan.operational-cost-categories.show', operationalCostCategory.id)"
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
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              <span>{{ form.processing ? 'Menyimpan...' : 'Update Kategori' }}</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Current Information Card -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6">
        <div class="p-6 border-b border-sage-200">
          <h3 class="text-lg font-semibold text-sage-800">
            Informasi Saat Ini
          </h3>
        </div>
        <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-1">
              Nama Kategori
            </label>
            <div class="text-sm text-sage-800">
              {{ operationalCostCategory.name }}
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-1">
              Status
            </label>
            <span
              :class="[
                'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                operationalCostCategory.is_active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              ]"
            >
              {{ operationalCostCategory.is_active ? 'Aktif' : 'Tidak Aktif' }}
            </span>
          </div>
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-1">
              Terakhir Diperbarui
            </label>
            <div class="text-sm text-sage-800">
              {{ formatDate(operationalCostCategory.updated_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { Link, useForm } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

const props = defineProps({
  operationalCostCategory: Object,
})

// Route function
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.operational-cost-categories.index': '/admin-keuangan/operational-cost-categories',
    'admin-keuangan.operational-cost-categories.show': '/admin-keuangan/operational-cost-categories',
    'admin-keuangan.operational-cost-categories.update': '/admin-keuangan/operational-cost-categories',
  }
  const baseRoute = routes[name] || '#'
  return params ? `${baseRoute}/${params}` : baseRoute
}

// Form
const form = useForm({
  name: props.operationalCostCategory.name,
  description: props.operationalCostCategory.description || '',
  is_active: props.operationalCostCategory.is_active,
})

// Methods
const submit = () => {
  form.put(route('admin-keuangan.operational-cost-categories.update', props.operationalCostCategory.id), {
    onSuccess: () => {
      // Success message will be handled by the controller redirect
    },
  })
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
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