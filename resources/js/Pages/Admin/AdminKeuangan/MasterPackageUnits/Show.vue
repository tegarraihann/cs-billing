<template>
  <AdminKeuanganLayout>
    <Head title="Package Unit Details" />

    <div class="py-6">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-6">
          <Link
            :href="route('admin-keuangan.master-package-units.index')"
            class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            Back to Master Package Units
          </Link>
          <h1 class="text-2xl font-bold text-gray-900">Package Unit Details</h1>
          <p class="mt-1 text-sm text-gray-600">View package unit information</p>
        </div>

        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
          <div class="px-6 py-8 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Unit Code</label>
                <div class="text-sm text-gray-900">{{ packageUnit.code }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Unit Name</label>
                <div class="text-sm text-gray-900">{{ packageUnit.name }}</div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <div class="text-sm text-gray-900">{{ packageUnit.description || '-' }}</div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sort Order</label>
                <div class="text-sm text-gray-900">{{ packageUnit.sort_order }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="packageUnit.is_active
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'"
                >
                  {{ packageUnit.is_active ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>

            <div class="pt-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                @click="toggleStatus"
                class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              >
                {{ packageUnit.is_active ? 'Deactivate' : 'Activate' }}
              </button>
              <Link
                :href="route('admin-keuangan.master-package-units.edit', packageUnit.id)"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              >
                Edit Package Unit
              </Link>
              <button
                @click="showDeleteModal = true"
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AlertDialog
      :show="showDeleteModal"
      title="Delete Package Unit"
      :message="`Are you sure you want to delete package unit '${packageUnit.code}'?`"
      confirm-text="Delete"
      cancel-text="Cancel"
      @confirm="deleteUnit"
      @cancel="showDeleteModal = false"
    />
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';
import AlertDialog from '@/Components/AlertDialog.vue';
import { ArrowLeft } from 'lucide-vue-next';

const props = defineProps({
  packageUnit: Object,
});

const showDeleteModal = ref(false);

const toggleStatus = () => {
  router.patch(route('admin-keuangan.master-package-units.toggle-status', props.packageUnit.id), {}, {
    preserveScroll: true,
  });
};

const deleteUnit = () => {
  router.delete(route('admin-keuangan.master-package-units.destroy', props.packageUnit.id), {
    onSuccess: () => {
      showDeleteModal.value = false;
    },
  });
};
</script>
