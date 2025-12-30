<template>
  <AdminKeuanganLayout>
    <Head title="Master Package Units" />

    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Master Package Units</h1>
            <p class="mt-1 text-sm text-gray-600">Manage package units for Sales Orders and Invoices</p>
          </div>
          <Link
            :href="route('admin-keuangan.master-package-units.create')"
            class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <Plus class="w-4 h-4 mr-2" />
            Add Package Unit
          </Link>
        </div>

        <!-- Search Section -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  v-model="form.search"
                  type="text"
                  placeholder="Search by code, name, or description..."
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                  @keyup.enter="search"
                />
              </div>
            </div>

            <div class="mt-4">
              <button
                @click="search"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              >
                <Search class="w-4 h-4 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>

        <!-- Package Units Table -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sort Order
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(unit, index) in packageUnits.data" :key="unit.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ (packageUnits.from ?? 1) + index }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ unit.code }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ unit.name }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                      {{ unit.description || '-' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <button
                        @click="toggleStatus(unit)"
                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors"
                        :class="unit.is_active
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-red-100 text-red-800 hover:bg-red-200'"
                      >
                        {{ unit.is_active ? 'Active' : 'Inactive' }}
                      </button>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ unit.sort_order }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="flex space-x-2">
                        <Link
                          :href="route('admin-keuangan.master-package-units.edit', unit.id)"
                          class="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit class="w-4 h-4" />
                        </Link>
                        <button
                          @click="confirmDelete(unit)"
                          class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="packageUnits.data.length === 0" class="text-center py-12">
              <PackageSearch class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No package units found</h3>
              <p class="mt-1 text-sm text-gray-500">Start by adding your first package unit</p>
            </div>

            <div v-if="packageUnits?.data && packageUnits.data.length > 0" class="mt-6">
              <Pagination :data="packageUnits" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <AlertDialog
      :show="deleteModal.show"
      title="Delete Package Unit"
      :message="`Are you sure you want to delete package unit '${deleteModal.unit?.code}'?`"
      confirm-text="Delete"
      cancel-text="Cancel"
      @confirm="deleteUnit"
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
  packageUnits: Object,
  search: String,
});

const form = reactive({
  search: props.search || '',
});

const deleteModal = reactive({
  show: false,
  unit: null,
});

const search = () => {
  router.get(
    route('admin-keuangan.master-package-units.index'),
    {
      search: form.search,
    },
    {
      preserveState: true,
      preserveScroll: true,
    }
  );
};

const toggleStatus = (unit) => {
  router.patch(route('admin-keuangan.master-package-units.toggle-status', unit.id), {}, {
    preserveScroll: true,
  });
};

const confirmDelete = (unit) => {
  deleteModal.unit = unit;
  deleteModal.show = true;
};

const deleteUnit = () => {
  router.delete(route('admin-keuangan.master-package-units.destroy', deleteModal.unit.id), {
    onSuccess: () => {
      deleteModal.show = false;
      deleteModal.unit = null;
    },
  });
};
</script>
