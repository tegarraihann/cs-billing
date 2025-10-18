<template>
  <AdminKeuanganLayout>
    <Head title="Tambah Satuan Package" />

    <div class="py-6">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-6">
          <div class="flex items-center space-x-3 mb-2">
            <Link
              :href="route('admin-keuangan.master-package-units.index')"
              class="text-sage-600 hover:text-sage-800 transition-colors"
            >
              <ArrowLeft class="w-5 h-5" />
            </Link>
            <h1 class="text-2xl font-bold text-sage-800">Tambah Satuan Package</h1>
          </div>
          <p class="text-sm text-sage-600">
            Buat satuan packaging baru untuk digunakan di Sales Order dan Invoice
          </p>
        </div>

        <!-- Form -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
          <form @submit.prevent="submit">
            <div class="space-y-6">
              <!-- Code -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Kode Satuan <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.code"
                  type="text"
                  required
                  maxlength="10"
                  placeholder="e.g., PLT, CTN, BOX"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-500': form.errors.code }"
                />
                <p v-if="form.errors.code" class="mt-1 text-sm text-red-600">
                  {{ form.errors.code }}
                </p>
                <p class="mt-1 text-xs text-gray-500">
                  Maksimal 10 karakter, gunakan huruf kapital
                </p>
              </div>

              <!-- Name -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Satuan <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  maxlength="50"
                  placeholder="e.g., Pallet, Carton, Box"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-500': form.errors.name }"
                />
                <p v-if="form.errors.name" class="mt-1 text-sm text-red-600">
                  {{ form.errors.name }}
                </p>
              </div>

              <!-- Description -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  v-model="form.description"
                  rows="3"
                  maxlength="255"
                  placeholder="Deskripsi tambahan tentang satuan ini..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-500': form.errors.description }"
                ></textarea>
                <p v-if="form.errors.description" class="mt-1 text-sm text-red-600">
                  {{ form.errors.description }}
                </p>
              </div>

              <!-- Sort Order -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Urutan Tampil
                </label>
                <input
                  v-model="form.sort_order"
                  type="number"
                  min="0"
                  placeholder="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-500': form.errors.sort_order }"
                />
                <p v-if="form.errors.sort_order" class="mt-1 text-sm text-red-600">
                  {{ form.errors.sort_order }}
                </p>
                <p class="mt-1 text-xs text-gray-500">
                  Angka kecil akan tampil di urutan atas
                </p>
              </div>

              <!-- Status -->
              <div>
                <label class="flex items-center">
                  <input
                    v-model="form.is_active"
                    type="checkbox"
                    class="rounded border-gray-300 text-sage-600 shadow-sm focus:ring-sage-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">Aktif</span>
                </label>
                <p class="mt-1 text-xs text-gray-500">
                  Satuan aktif akan muncul di dropdown form
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div class="mt-8 flex items-center justify-end space-x-3">
              <Link
                :href="route('admin-keuangan.master-package-units.index')"
                class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                :disabled="form.processing"
                class="px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 transition-colors flex items-center"
              >
                <Loader2 v-if="form.processing" class="w-4 h-4 mr-2 animate-spin" />
                {{ form.processing ? 'Menyimpan...' : 'Simpan' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3'
import { ArrowLeft, Loader2 } from 'lucide-vue-next'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

const form = useForm({
  code: '',
  name: '',
  description: '',
  sort_order: 0,
  is_active: true
})

const submit = () => {
  form.post(route('admin-keuangan.master-package-units.store'))
}
</script>