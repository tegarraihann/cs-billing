<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-sage-800">Buat Template Biaya</h2>
            <p class="text-sage-600">Buat template biaya baru untuk efisiensi input dan konsistensi</p>
          </div>
          <Link
            :href="route('admin-keuangan.expense-templates.index')"
            class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali
          </Link>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Name -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nama Template <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              v-model="form.name"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              placeholder="e.g., Biaya Konsumsi Meeting, Ongkos Kirim Dokumen"
              required
            />
            <div v-if="errors.name" class="text-red-500 text-sm mt-1">
              {{ errors.name }}
            </div>
          </div>

          <!-- Category -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Kategori <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.category_id"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              required
            >
              <option value="">-- Pilih Kategori --</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
            <div v-if="errors.category_id" class="text-red-500 text-sm mt-1">
              {{ errors.category_id }}
            </div>
          </div>

          <!-- Status -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="form.is_active"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            >
              <option :value="true">Aktif</option>
              <option :value="false">Tidak Aktif</option>
            </select>
          </div>

          <!-- Description -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              placeholder="Deskripsi detail tentang template biaya ini..."
            ></textarea>
            <div v-if="errors.description" class="text-red-500 text-sm mt-1">
              {{ errors.description }}
            </div>
          </div>

          <!-- Amount Range -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Biaya Minimum <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              v-model="form.typical_amount_min"
              min="0"
              step="1000"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              placeholder="50000"
              required
            />
            <div class="text-xs text-gray-500 mt-1">Estimasi biaya terendah</div>
            <div v-if="errors.typical_amount_min" class="text-red-500 text-sm mt-1">
              {{ errors.typical_amount_min }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Biaya Maksimum <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              v-model="form.typical_amount_max"
              min="0"
              step="1000"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              placeholder="200000"
              required
            />
            <div class="text-xs text-gray-500 mt-1">Estimasi biaya tertinggi</div>
            <div v-if="errors.typical_amount_max" class="text-red-500 text-sm mt-1">
              {{ errors.typical_amount_max }}
            </div>
          </div>
        </div>

        <!-- Preview -->
        <div v-if="form.name && form.category_id" class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 class="text-sm font-medium text-blue-800 mb-2">Preview Template</h4>
          <div class="text-sm text-blue-700">
            <div><strong>Nama:</strong> {{ form.name }}</div>
            <div><strong>Kategori:</strong> {{ getSelectedCategoryName() }}</div>
            <div v-if="form.typical_amount_min && form.typical_amount_max">
              <strong>Range Biaya:</strong> {{ formatCurrency(form.typical_amount_min) }} - {{ formatCurrency(form.typical_amount_max) }}
            </div>
            <div v-if="form.description"><strong>Deskripsi:</strong> {{ form.description }}</div>
            <div><strong>Status:</strong> {{ form.is_active ? 'Aktif' : 'Tidak Aktif' }}</div>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
          <Link
            :href="route('admin-keuangan.expense-templates.index')"
            class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            :disabled="form.processing"
            class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50"
          >
            {{ form.processing ? 'Menyimpan...' : 'Simpan Template' }}
          </button>
        </div>
      </form>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { useForm, Link } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

const props = defineProps({
  categories: Array,
  errors: Object
})

const form = useForm({
  name: '',
  category_id: '',
  description: '',
  typical_amount_min: '',
  typical_amount_max: '',
  is_active: true
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID').format(amount || 0)
}

const getSelectedCategoryName = () => {
  const category = props.categories.find(cat => cat.id == form.category_id)
  return category ? category.name : ''
}

const submit = () => {
  form.post(route('admin-keuangan.expense-templates.store'))
}

const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.expense-templates.index': '/admin-keuangan/expense-templates',
    'admin-keuangan.expense-templates.store': '/admin-keuangan/expense-templates'
  }
  return routes[name] || '#'
}
</script>

<style scoped>
.text-sage-600 { color: #8db580; }
.text-sage-800 { color: #6b8f5e; }
.bg-sage-600 { background-color: #8db580; }
.bg-sage-700 { background-color: #7ba169; }
.border-sage-200 { border-color: #d4ddd0; }
.hover\:bg-sage-700:hover { background-color: #7ba169; }
.focus\:ring-sage-500:focus { --tw-ring-color: #8db580; }
.focus\:border-sage-500:focus { border-color: #8db580; }
</style>