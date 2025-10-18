<template>
  <AdminKeuanganLayout>
    <Head title="Master Satuan Package" />

    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 class="text-2xl font-bold text-sage-800">Master Satuan Package</h1>
            <p class="mt-1 text-sm text-sage-600">
              Kelola master data satuan packaging untuk Sales Order dan Invoice
            </p>
          </div>
          <div class="mt-4 sm:mt-0">
            <Link
              :href="route('admin-keuangan.master-package-units.create')"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            >
              <Plus class="w-5 h-5 mr-2" />
              Tambah Satuan
            </Link>
          </div>
        </div>

        <!-- Search & Filter -->
        <div class="mb-6 bg-white rounded-lg shadow-sm p-4 border border-sage-200">
          <div class="flex flex-col sm:flex-row gap-4">
            <div class="flex-1">
              <input
                v-model="searchForm.search"
                @input="debounceSearch"
                type="text"
                placeholder="Cari berdasarkan kode, nama, atau deskripsi..."
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <button
              @click="clearSearch"
              v-if="search"
              class="px-4 py-2 text-sage-600 hover:text-sage-800 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        <!-- Package Units Table -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">
              Daftar Satuan Package ({{ packageUnits.total }})
            </h3>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-sage-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                    Kode
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                    Deskripsi
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                    Urutan
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-sage-200">
                <tr v-for="unit in packageUnits.data" :key="unit.id" class="hover:bg-sage-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-medium text-sage-900">
                      {{ unit.code }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-sage-900">{{ unit.name }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-sage-600">
                      {{ unit.description || '-' }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <button
                      @click="toggleStatus(unit)"
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors"
                      :class="unit.is_active
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'"
                    >
                      {{ unit.is_active ? 'Aktif' : 'Nonaktif' }}
                    </button>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-sage-600">{{ unit.sort_order }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end space-x-2">
                      <Link
                        :href="route('admin-keuangan.master-package-units.show', unit.id)"
                        class="text-sage-600 hover:text-sage-900 transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye class="w-4 h-4" />
                      </Link>
                      <Link
                        :href="route('admin-keuangan.master-package-units.edit', unit.id)"
                        class="text-blue-600 hover:text-blue-900 transition-colors"
                        title="Edit"
                      >
                        <Edit class="w-4 h-4" />
                      </Link>
                      <button
                        @click="confirmDelete(unit)"
                        class="text-red-600 hover:text-red-900 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Empty State -->
          <div v-if="packageUnits.data.length === 0" class="px-6 py-12 text-center">
            <div class="text-sage-400 mb-4">
              <Package class="w-12 h-12 mx-auto" />
            </div>
            <h3 class="text-lg font-medium text-sage-900 mb-2">Belum ada satuan package</h3>
            <p class="text-sage-500 mb-6">Mulai dengan menambahkan satuan package pertama.</p>
            <Link
              :href="route('admin-keuangan.master-package-units.create')"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700"
            >
              <Plus class="w-5 h-5 mr-2" />
              Tambah Satuan Package
            </Link>
          </div>

          <!-- Pagination -->
          <div v-if="packageUnits.data.length > 0" class="px-6 py-4 border-t border-sage-200">
            <Pagination :data="packageUnits" />
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <AlertDialog
      :show="showDeleteModal"
      type="danger"
      title="Hapus Satuan Package"
      :message="`Apakah Anda yakin ingin menghapus satuan '${unitToDelete?.code}'? Aksi ini tidak dapat dibatalkan.`"
      confirm-text="Hapus"
      cancel-text="Batal"
      @confirm="deleteUnit"
      @cancel="showDeleteModal = false"
    />
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { Plus, Eye, Edit, Trash2, Package } from 'lucide-vue-next'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import Pagination from '@/Components/Pagination.vue'
import AlertDialog from '@/Components/AlertDialog.vue'
import { debounce } from 'lodash'

const props = defineProps({
  packageUnits: Object,
  search: String,
})

const searchForm = reactive({
  search: props.search || ''
})

const showDeleteModal = ref(false)
const unitToDelete = ref(null)

// Search functionality
const debounceSearch = debounce(() => {
  router.get(route('admin-keuangan.master-package-units.index'), {
    search: searchForm.search
  }, {
    preserveState: true,
    replace: true
  })
}, 300)

const clearSearch = () => {
  searchForm.search = ''
  router.get(route('admin-keuangan.master-package-units.index'))
}

// Toggle status
const toggleStatus = (unit) => {
  router.patch(route('admin-keuangan.master-package-units.toggle-status', unit.id), {}, {
    preserveScroll: true
  })
}

// Delete functionality
const confirmDelete = (unit) => {
  unitToDelete.value = unit
  showDeleteModal.value = true
}

const deleteUnit = () => {
  router.delete(route('admin-keuangan.master-package-units.destroy', unitToDelete.value.id), {
    onSuccess: () => {
      showDeleteModal.value = false
      unitToDelete.value = null
    }
  })
}
</script>