<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="text-2xl font-bold text-sage-800 mb-2">
              Manajemen Service Type
            </h2>
            <p class="text-sage-600">
              Kelola data jenis biaya/service untuk vendor items
            </p>
          </div>
          <div class="mt-4 sm:mt-0">
            <Link
              :href="route('admin-keuangan.service-types.create')"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Tambah Service Type
            </Link>
          </div>
        </div>
      </div>

      <!-- Search Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search Input -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-sage-700 mb-2">Cari Data</label>
            <input
              v-model="form.search"
              type="text"
              placeholder="Cari kode, nama, atau deskripsi..."
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            />
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">Status</label>
            <select
              v-model="form.status"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            >
              <option value="">Semua Status</option>
              <option value="1">Aktif</option>
              <option value="0">Tidak Aktif</option>
            </select>
          </div>
        </div>

        <!-- Search Button -->
        <div class="mt-4">
          <button
            @click="search"
            class="w-full md:w-auto px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
          >
            Cari
          </button>
        </div>
      </div>

      <!-- Service Types Table -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-sage-200">
          <h3 class="text-lg font-semibold text-sage-800">Daftar Service Type</h3>
          <p class="text-sm text-sage-600 mt-1">
            Total: {{ serviceTypes?.total || 0 }} data
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-sage-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Urutan
                </th>
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
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-sage-200">
              <tr
                v-for="serviceType in serviceTypes.data"
                :key="serviceType.id"
                class="hover:bg-sage-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-sage-600">
                  {{ serviceType.sort_order }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900">
                  {{ serviceType.code }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-sage-900">
                  {{ serviceType.name }}
                </td>
                <td class="px-6 py-4 text-sm text-sage-900">
                  {{ serviceType.description || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="
                      serviceType.is_active
                        ? 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'
                        : 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800'
                    "
                  >
                    {{ serviceType.is_active ? 'Aktif' : 'Tidak Aktif' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <Link
                      :href="route('admin-keuangan.service-types.edit', serviceType.id)"
                      class="inline-flex items-center justify-center w-8 h-8 text-amber-600 hover:text-amber-900 hover:bg-amber-100 rounded-full transition-colors"
                      title="Edit"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button
                      @click="confirmDelete(serviceType)"
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

        <!-- Pagination -->
        <div v-if="serviceTypes?.data && serviceTypes.data.length > 0" class="px-6 py-4 border-t border-sage-200">
          <Pagination :data="serviceTypes" />
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <AlertDialog
      :show="deleteModal.show"
      title="Konfirmasi Hapus"
      :message="`Apakah Anda yakin ingin menghapus service type '${deleteModal.serviceType?.code}'?`"
      confirm-text="Hapus"
      cancel-text="Batal"
      @confirm="deleteServiceType"
      @cancel="deleteModal.show = false"
    />
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Link, router, useForm } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import AlertDialog from '@/Components/AlertDialog.vue';

const props = defineProps({
  serviceTypes: Object,
  filters: Object,
});

const form = reactive({
  search: props.filters?.search || '',
  status: props.filters?.status || '',
});

const deleteModal = reactive({
  show: false,
  serviceType: null,
});

const search = () => {
  router.get(
    route('admin-keuangan.service-types.index'),
    {
      search: form.search,
      status: form.status,
    },
    {
      preserveState: true,
      preserveScroll: true,
    }
  );
};

const confirmDelete = (serviceType) => {
  deleteModal.serviceType = serviceType;
  deleteModal.show = true;
};

const deleteServiceType = () => {
  router.delete(route('admin-keuangan.service-types.destroy', deleteModal.serviceType.id), {
    onSuccess: () => {
      deleteModal.show = false;
      deleteModal.serviceType = null;
    },
  });
};
</script>
