<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">
                Tambah Service Type Baru
              </h2>
              <p class="text-sage-600">
                Tambahkan jenis biaya/service baru untuk vendor items
              </p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0">
            <Link
              :href="route('admin-keuangan.service-types.index')"
              class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </Link>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
          <h3 class="text-lg font-semibold text-sage-800">
            Form Tambah Service Type
          </h3>
          <p class="text-sm text-sage-600 mt-1">
            Lengkapi informasi service type dengan benar
          </p>
        </div>

        <div class="p-6">
          <form @submit.prevent="submit" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Kode -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">
                  Kode Service Type <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.code"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  :class="{ 'border-red-500': form.errors.code }"
                  placeholder="Contoh: OF/AF, HANDLING"
                />
                <div v-if="form.errors.code" class="mt-2 text-sm text-red-600">
                  {{ form.errors.code }}
                </div>
              </div>

              <!-- Nama -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">
                  Nama Service Type <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  :class="{ 'border-red-500': form.errors.name }"
                  placeholder="Contoh: Ocean Freight / Air Freight"
                />
                <div v-if="form.errors.name" class="mt-2 text-sm text-red-600">
                  {{ form.errors.name }}
                </div>
              </div>
            </div>

            <!-- Deskripsi -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">
                Deskripsi
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                :class="{ 'border-red-500': form.errors.description }"
                placeholder="Deskripsi detail tentang jenis biaya/service..."
              />
              <div v-if="form.errors.description" class="mt-2 text-sm text-red-600">
                {{ form.errors.description }}
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Urutan -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">
                  Urutan Tampilan
                </label>
                <input
                  v-model.number="form.sort_order"
                  type="number"
                  min="0"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  :class="{ 'border-red-500': form.errors.sort_order }"
                  placeholder="0"
                />
                <p class="mt-1 text-xs text-gray-500">Angka lebih kecil akan muncul lebih dahulu</p>
                <div v-if="form.errors.sort_order" class="mt-2 text-sm text-red-600">
                  {{ form.errors.sort_order }}
                </div>
              </div>

              <!-- Status Aktif -->
              <div class="flex items-center">
                <label class="flex items-center cursor-pointer">
                  <input
                    v-model="form.is_active"
                    type="checkbox"
                    class="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 block text-sm text-sage-900">
                    Status Aktif
                  </span>
                </label>
              </div>
            </div>

            <!-- Submit Button -->
            <div class="flex justify-end space-x-3">
              <Link
                :href="route('admin-keuangan.service-types.index')"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                :disabled="processing"
                class="px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50"
              >
                <span v-if="processing">Menyimpan...</span>
                <span v-else>Simpan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useForm, Link } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

const form = useForm({
  code: '',
  name: '',
  description: '',
  is_active: true,
  sort_order: 0
})

const submit = () => {
  form.post(route('admin-keuangan.service-types.store'))
}

const processing = computed(() => form.processing)
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

.hover\:bg-sage-50:hover {
  background-color: #f4f6f3;
}

.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}

.hover\:text-sage-900:hover {
  color: #5a7a4f;
}

.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
  border-color: #8db580;
}

.divide-sage-200 > :not([hidden]) ~ :not([hidden]) {
  border-color: #d4ddd0;
}
</style>
