<template>
  <AdminKeuanganLayout>
    <div class="min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold text-sage-800">
              Chart Of Accounts
            </h1>
            <p class="text-sage-600 mt-1">
              Kelola chart of accounts untuk sistem finance
            </p>
          </div>
          <Link
            :href="route('admin-keuangan.operational-cost-categories.create')"
            class="bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
          >
            <svg
              class="w-5 h-5"
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
            <span>Tambah Kategori</span>
          </Link>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-4 mb-6">
        <form @submit.prevent="submitSearch" class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-64">
            <label for="search" class="block text-sm font-medium text-sage-700 mb-1">
              Pencarian
            </label>
            <input
              id="search"
              v-model="form.search"
              type="text"
              placeholder="Cari nama atau deskripsi kategori..."
              class="w-full rounded-lg border-sage-300 focus:border-sage-500 focus:ring-sage-500"
            />
          </div>
          <div class="w-48">
            <label for="status" class="block text-sm font-medium text-sage-700 mb-1">
              Status
            </label>
            <select
              id="status"
              v-model="form.status"
              class="w-full rounded-lg border-sage-300 focus:border-sage-500 focus:ring-sage-500"
            >
              <option value="">Semua Status</option>
              <option value="active">Aktif</option>
              <option value="inactive">Tidak Aktif</option>
            </select>
          </div>
          <div class="flex items-end space-x-2">
            <button
              type="submit"
              class="bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>Cari</span>
            </button>
            <button
              type="button"
              @click="resetFilters"
              class="bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200">
        <div class="p-6 border-b border-sage-200">
          <h2 class="text-lg font-semibold text-sage-800">
            Daftar Chart Of Accounts
          </h2>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-sage-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Nama Kategori
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Dibuat Oleh
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Dibuat Pada
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-sage-200">
              <tr
                v-for="category in operationalCostCategories.data"
                :key="category.id"
                class="hover:bg-sage-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-sage-900">
                    {{ category.name }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-sage-600 max-w-xs truncate">
                    {{ category.description || '-' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      category.is_active
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ category.is_active ? 'Aktif' : 'Tidak Aktif' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-sage-600">
                    {{ category.creator?.name || '-' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-sage-600">
                    {{ formatDate(category.created_at) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <Link
                      :href="route('admin-keuangan.operational-cost-categories.show', category.id)"
                      class="text-sage-600 hover:text-sage-900 transition-colors"
                      title="Lihat Detail"
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
                    </Link>
                    <Link
                      :href="route('admin-keuangan.operational-cost-categories.edit', category.id)"
                      class="text-blue-600 hover:text-blue-900 transition-colors"
                      title="Edit"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </Link>
                    <button
                      @click="confirmDelete(category)"
                      class="text-red-600 hover:text-red-900 transition-colors"
                      title="Hapus"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="operationalCostCategories.data.length === 0" class="text-center py-8">
            <p class="text-sage-500">Tidak ada data kategori biaya operasional.</p>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="operationalCostCategories.last_page > 1"
          class="px-6 py-3 border-t border-sage-200"
        >
          <div class="flex items-center justify-between">
            <div class="text-sm text-sage-700">
              Menampilkan {{ operationalCostCategories.from }} sampai
              {{ operationalCostCategories.to }} dari
              {{ operationalCostCategories.total }} hasil
            </div>
            <div class="flex space-x-1">
              <template v-for="(link, index) in operationalCostCategories.links" :key="index">
                <Link
                  v-if="link.url"
                  :href="link.url"
                  :class="[
                    'px-3 py-2 text-sm border rounded',
                    link.active
                      ? 'bg-sage-600 text-white border-sage-600'
                      : 'bg-white text-sage-700 border-sage-300 hover:bg-sage-50'
                  ]"
                  v-html="link.label"
                />
                <span
                  v-else
                  class="px-3 py-2 text-sm border rounded bg-sage-100 text-sage-400 border-sage-200 cursor-not-allowed"
                  v-html="link.label"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Konfirmasi Hapus</h3>
        <p class="text-sm text-gray-600 mb-6">
          Apakah Anda yakin ingin menghapus kategori "{{ categoryToDelete?.name }}"?
          Tindakan ini tidak dapat dibatalkan.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            Batal
          </button>
          <button
            @click="deleteCategory"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

const props = defineProps({
  operationalCostCategories: Object,
  filters: Object,
})

// Route helper (fallback if Ziggy helper is unavailable)
const fallbackRoute = (name, params = null) => {
  const routes = {
    'admin-keuangan.operational-cost-categories.index': '/admin-keuangan/operational-cost-categories',
    'admin-keuangan.operational-cost-categories.create': '/admin-keuangan/operational-cost-categories/create',
    'admin-keuangan.operational-cost-categories.show': '/admin-keuangan/operational-cost-categories',
    'admin-keuangan.operational-cost-categories.edit': '/admin-keuangan/operational-cost-categories',
    'admin-keuangan.operational-cost-categories.destroy': '/admin-keuangan/operational-cost-categories',
  }
  const baseRoute = routes[name] || '#'
  if (params === null || params === undefined) {
    return baseRoute
  }

  // Support sending an object (e.g., { id: 1 })
  if (typeof params === 'object') {
    const value = params.id ?? params
    return `${baseRoute}/${value}`
  }

  return `${baseRoute}/${params}`
}

const route = (...args) => {
  if (typeof window !== 'undefined' && typeof window.route === 'function') {
    return window.route(...args)
  }
  return fallbackRoute(...args)
}

// Form data
const form = reactive({
  search: props.filters.search || '',
  status: props.filters.status || '',
})

// Delete modal
const showDeleteModal = ref(false)
const categoryToDelete = ref(null)

// Methods
const submitSearch = () => {
  router.get(route('admin-keuangan.operational-cost-categories.index'), form, {
    preserveState: true,
    replace: true,
  })
}

const resetFilters = () => {
  form.search = ''
  form.status = ''
  router.get(route('admin-keuangan.operational-cost-categories.index'), {}, {
    preserveState: true,
    replace: true,
  })
}

const confirmDelete = (category) => {
  categoryToDelete.value = category
  showDeleteModal.value = true
}

const deleteCategory = () => {
  if (categoryToDelete.value) {
    router.delete(route('admin-keuangan.operational-cost-categories.destroy', categoryToDelete.value.id), {
      onSuccess: () => {
        showDeleteModal.value = false
        categoryToDelete.value = null
      }
    })
  }
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Watch for changes in form to auto-submit (debounced)
let searchTimeout = null
watch(() => form.search, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    submitSearch()
  }, 500)
})

watch(() => form.status, () => {
  submitSearch()
})
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
.bg-sage-600 { background-color: #8db580; }
.bg-sage-700 { background-color: #7ba169; }
.border-sage-200 { border-color: #d4ddd0; }
.border-sage-300 { border-color: #c1cbb9; }
.border-sage-500 { border-color: #8db580; }
.border-sage-600 { border-color: #8db580; }
.hover\:bg-sage-50:hover { background-color: #f4f6f3; }
.hover\:bg-sage-200:hover { background-color: #d4ddd0; }
.hover\:bg-sage-700:hover { background-color: #7ba169; }
.hover\:text-sage-900:hover { color: #5a7a4d; }
.focus\:border-sage-500:focus { border-color: #8db580; }
.focus\:ring-sage-500:focus { --tw-ring-color: #8db580; }
</style>
