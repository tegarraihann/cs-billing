<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-sage-800">Template Biaya</h2>
            <p class="text-sage-600">Kelola template biaya operasional untuk efisiensi input dan konsistensi</p>
          </div>
          <Link
            :href="route('admin-keuangan.expense-templates.create')"
            class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Template
          </Link>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div class="text-blue-600 text-sm font-medium">Fungsi Template:</div>
          <div class="text-blue-800 text-xs">Nama standar + referensi biaya</div>
        </div>
        <div class="bg-green-50 rounded-lg p-4 border border-green-200">
          <div class="text-green-600 text-sm font-medium">Range Biaya:</div>
          <div class="text-green-800 text-xs">Panduan estimasi wajar</div>
        </div>
        <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
          <div class="text-purple-600 text-sm font-medium">Usage Count:</div>
          <div class="text-purple-800 text-xs">Statistik & prioritas template</div>
        </div>
        <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
          <div class="text-orange-600 text-sm font-medium">Auto-Kategori:</div>
          <div class="text-orange-800 text-xs">Otomatis ke petty cash sesuai kategori</div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
            <select
              v-model="filters.category_id"
              @change="search"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            >
              <option value="">Semua Kategori</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="filters.is_active"
              @change="search"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            >
              <option value="">Semua Status</option>
              <option value="1">Aktif</option>
              <option value="0">Tidak Aktif</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Pencarian</label>
            <input
              type="text"
              v-model="filters.search"
              @keyup.enter="search"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              placeholder="Nama template..."
            />
          </div>
          <div class="flex items-end">
            <button
              @click="search"
              class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      <!-- Templates Table -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Template</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Range Biaya</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penggunaan</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="templates.data.length === 0">
                <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                  <svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>Tidak ada template biaya ditemukan</p>
                  <Link
                    :href="route('admin-keuangan.expense-templates.create')"
                    class="inline-flex items-center mt-4 text-sage-600 hover:text-sage-800"
                  >
                    Buat template pertama
                  </Link>
                </td>
              </tr>
              <tr v-for="template in templates.data" :key="template.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ template.name }}</div>
                    <div v-if="template.description" class="text-sm text-gray-500">{{ template.description }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ template.category.name }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div v-if="template.typical_amount_min > 0">
                    {{ formatCurrency(template.typical_amount_min) }} - {{ formatCurrency(template.typical_amount_max) }}
                  </div>
                  <div v-else class="text-gray-400">Tidak ditentukan</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm">
                    <span class="font-medium text-purple-600">{{ template.usage_count }}x</span>
                    <span class="text-gray-500">digunakan</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    @click="toggleStatus(template)"
                    :class="[
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      template.is_active
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    ]"
                  >
                    {{ template.is_active ? 'Aktif' : 'Tidak Aktif' }}
                  </button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-3">
                    <Link
                      :href="route('admin-keuangan.expense-templates.show', template.id)"
                      class="text-sage-600 hover:text-sage-900"
                    >
                      Lihat
                    </Link>
                    <Link
                      :href="route('admin-keuangan.expense-templates.edit', template.id)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    <button
                      @click="confirmDelete(template)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="templates.links" class="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Menampilkan {{ templates.from || 0 }} - {{ templates.to || 0 }} dari {{ templates.total || 0 }} template
            </div>
            <div class="flex space-x-1">
              <template v-for="link in templates.links" :key="link.label">
                <Link
                  v-if="link.url"
                  :href="link.url"
                  :class="[
                    'px-3 py-2 text-sm rounded-lg border',
                    link.active
                      ? 'bg-sage-600 text-white border-sage-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  ]"
                  v-html="link.label"
                />
                <span
                  v-else
                  :class="[
                    'px-3 py-2 text-sm rounded-lg border cursor-not-allowed',
                    link.active
                      ? 'bg-sage-600 text-white border-sage-600'
                      : 'bg-gray-100 text-gray-400 border-gray-300'
                  ]"
                  v-html="link.label"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Hapus Template Biaya</h3>
        <p class="text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus template "{{ templateToDelete?.name }}"?
          Tindakan ini tidak dapat dibatalkan.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Batal
          </button>
          <button
            @click="deleteTemplate"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

const props = defineProps({
  templates: Object,
  categories: Array,
  filters: Object
})

const showDeleteModal = ref(false)
const templateToDelete = ref(null)

const filters = reactive({
  category_id: props.filters.category_id || '',
  is_active: props.filters.is_active || '',
  search: props.filters.search || ''
})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID').format(amount || 0)
}

const search = () => {
  router.get(route('admin-keuangan.expense-templates.index'), filters, {
    preserveState: true,
    replace: true
  })
}

const toggleStatus = (template) => {
  router.patch(route('admin-keuangan.expense-templates.toggle-status', template.id), {}, {
    preserveScroll: true
  })
}

const confirmDelete = (template) => {
  templateToDelete.value = template
  showDeleteModal.value = true
}

const deleteTemplate = () => {
  router.delete(route('admin-keuangan.expense-templates.destroy', templateToDelete.value.id), {
    onSuccess: () => {
      showDeleteModal.value = false
      templateToDelete.value = null
    }
  })
}

const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.expense-templates.index': '/admin-keuangan/expense-templates',
    'admin-keuangan.expense-templates.create': '/admin-keuangan/expense-templates/create',
    'admin-keuangan.expense-templates.show': (id) => `/admin-keuangan/expense-templates/${id}`,
    'admin-keuangan.expense-templates.edit': (id) => `/admin-keuangan/expense-templates/${id}/edit`,
    'admin-keuangan.expense-templates.destroy': (id) => `/admin-keuangan/expense-templates/${id}`,
    'admin-keuangan.expense-templates.toggle-status': (id) => `/admin-keuangan/expense-templates/${id}/toggle-status`
  }
  return typeof routes[name] === 'function' ? routes[name](params) : routes[name] || '#'
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