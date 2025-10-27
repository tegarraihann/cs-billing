<template>
  <AdminKeuanganLayout>
    <Head title="Manajemen Service Type" />

    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Manajemen Service Type</h1>
            <p class="mt-1 text-sm text-gray-600">Kelola data jenis biaya/service untuk vendor items</p>
          </div>
          <Link
            :href="route('admin-keuangan.service-types.create')"
            class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <Plus class="w-4 h-4 mr-2" />
            Tambah Service Type
          </Link>
        </div>

        <!-- Search Section -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Search Input -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Cari Data</label>
                <input
                  v-model="form.search"
                  type="text"
                  placeholder="Cari kode, nama, atau deskripsi..."
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                  @keyup.enter="search"
                />
              </div>

              <!-- Status Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  v-model="form.status"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
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
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              >
                <Search class="w-4 h-4 mr-2" />
                Cari
              </button>
            </div>
          </div>
        </div>

        <!-- Service Types Table -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Urutan
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kode
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Deskripsi
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="serviceType in serviceTypes.data" :key="serviceType.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ serviceType.sort_order }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ serviceType.code }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ serviceType.name }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
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
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="flex space-x-2">
                        <Link
                          :href="route('admin-keuangan.service-types.edit', serviceType.id)"
                          class="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit class="w-4 h-4" />
                        </Link>
                        <button
                          @click="confirmDelete(serviceType)"
                          class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50"
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

            <div v-if="serviceTypes.data.length === 0" class="text-center py-12">
              <PackageSearch class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">Belum ada service type</h3>
              <p class="mt-1 text-sm text-gray-500">Mulai dengan menambahkan service type pertama</p>
            </div>

            <div v-if="serviceTypes?.data && serviceTypes.data.length > 0" class="mt-6">
              <Pagination :data="serviceTypes" />
            </div>
          </div>
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
import { reactive } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import AlertDialog from '@/Components/AlertDialog.vue';
import { Plus, Search, Edit, Trash2, PackageSearch } from 'lucide-vue-next';

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
