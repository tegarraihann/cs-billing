<template>
  <AdminLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div
        class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h2 class="text-2xl font-bold text-sage-800 mb-2">
              Manajemen Shipment Type
            </h2>
            <p class="text-sage-600">
              Kelola data jenis pengiriman untuk sales order
            </p>
          </div>
          <div class="mt-4 sm:mt-0">
            <Link
              :href="route('admin-cs.shipment-types.create')"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            >
              <svg
                class="w-5 h-5 mr-2"
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
              Tambah Shipment Type
            </Link>
          </div>
        </div>
      </div>

      <!-- Search Section -->
      <div
        class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Search Input -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2"
              >Cari Data</label
            >
            <input
              v-model="form.search"
              type="text"
              placeholder="Cari nama, kode, atau deskripsi..."
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            />
          </div>

          <!-- Search Button -->
          <div class="flex items-end">
            <button
              @click="search"
              class="w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      <!-- Shipment Types Table -->
      <div
        class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-sage-200">
          <h3 class="text-lg font-semibold text-sage-800">Daftar Shipment Type</h3>
          <p class="text-sm text-sage-600 mt-1">
            Total: {{ shipmentTypes?.total || 0 }} data
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-sage-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Kode
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Nama
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Deskripsi
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-sage-200">
              <tr
                v-for="shipmentType in shipmentTypes.data"
                :key="shipmentType.id"
                class="hover:bg-sage-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900">
                  {{ shipmentType.code }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-sage-900">
                  {{ shipmentType.name }}
                </td>
                <td class="px-6 py-4 text-sm text-sage-900">
                  {{ shipmentType.description || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="
                      shipmentType.is_active
                        ? 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'
                        : 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800'
                    "
                  >
                    {{ shipmentType.is_active ? 'Aktif' : 'Tidak Aktif' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <Link
                      :href="route('admin-cs.shipment-types.edit', shipmentType.id)"
                      class="inline-flex items-center justify-center w-8 h-8 text-amber-600 hover:text-amber-900 hover:bg-amber-100 rounded-full transition-colors"
                      title="Edit"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button
                      @click="confirmDelete(shipmentType)"
                      class="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors"
                      title="Hapus"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- No Data Message -->
        <div
          v-if="shipmentTypes.data.length === 0"
          class="px-6 py-8 text-center text-sage-500"
        >
          <div class="flex flex-col items-center">
            <svg
              class="w-12 h-12 text-sage-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <p class="text-lg font-medium">Tidak ada data shipment type</p>
            <p class="text-sm mt-1">Mulai dengan menambahkan shipment type baru</p>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="shipmentTypes.data.length > 0 && shipmentTypes.last_page > 1"
          class="px-6 py-4 border-t border-sage-200"
        >
          <Pagination :data="shipmentTypes" />
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialog -->
    <AlertDialog
      :show="showDeleteDialog"
      type="confirm"
      title="Konfirmasi Hapus Shipment Type"
      :message="`Apakah Anda yakin ingin menghapus shipment type '${selectedShipmentType?.name}'? Tindakan ini tidak dapat dibatalkan.`"
      confirm-text="Ya, Hapus"
      cancel-text="Batal"
      @confirm="confirmDeleteAction"
      @cancel="cancelDelete"
      @close="cancelDelete"
    />
  </AdminLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import Pagination from '@/Components/Pagination.vue'
import AlertDialog from '@/Components/AlertDialog.vue'

const props = defineProps({
  shipmentTypes: Object,
  filters: Object
})

const form = reactive({
  search: props.filters.search || ''
})

const showDeleteDialog = ref(false)
const selectedShipmentType = ref(null)

const search = () => {
  router.get(route('admin-cs.shipment-types.index'), form, {
    preserveState: true,
    replace: true
  })
}


const confirmDelete = (shipmentType) => {
  selectedShipmentType.value = shipmentType
  showDeleteDialog.value = true
}

const confirmDeleteAction = () => {
  if (selectedShipmentType.value) {
    router.delete(route('admin-cs.shipment-types.destroy', selectedShipmentType.value.id), {
      onSuccess: () => {
        // Refresh the page
        router.get(route("admin-cs.shipment-types.index"), {
          search: form.search,
        }, {
          preserveState: true,
          replace: true,
        });
      },
      onError: (errors) => {
        alert('Terjadi kesalahan saat menghapus shipment type: ' + Object.values(errors).join(', '));
      }
    });
  }
  showDeleteDialog.value = false
  selectedShipmentType.value = null
}

const cancelDelete = () => {
  showDeleteDialog.value = false
  selectedShipmentType.value = null
}
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