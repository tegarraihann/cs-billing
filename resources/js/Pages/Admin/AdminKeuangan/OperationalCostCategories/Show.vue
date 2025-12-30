<template>
  <AdminKeuanganLayout>
    <Head title="Operational Cost Category Details" />
    <div class="min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-sage-800">
              Operational Cost Category Details
            </h1>
            <p class="text-sage-600 mt-1">
              Detailed information about this category
            </p>
          </div>
          <div class="flex items-center space-x-3">
            <Link
              :href="route('admin-keuangan.operational-cost-categories.edit', operationalCostCategory.id)"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
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
              <span>Edit</span>
            </Link>
            <Link
              :href="route('admin-keuangan.operational-cost-categories.index')"
              class="bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
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
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span>Back</span>
            </Link>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Information -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="p-6 border-b border-sage-200">
              <h2 class="text-lg font-semibold text-sage-800">
                Category Information
              </h2>
            </div>
            <div class="p-6 space-y-6">
              <!-- Nama Kategori -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">
                  Category Name
                </label>
                <div class="text-lg font-semibold text-sage-900">
                  {{ operationalCostCategory.name }}
                </div>
              </div>

              <!-- Deskripsi -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">
                  Description
                </label>
                <div class="text-sage-800 whitespace-pre-wrap">
                  {{ operationalCostCategory.description || 'No description provided' }}
                </div>
              </div>

              <!-- Status -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">
                  Status
                </label>
                <span
                  :class="[
                    'inline-flex px-3 py-1 text-sm font-semibold rounded-full',
                    operationalCostCategory.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  ]"
                >
                  {{ operationalCostCategory.is_active ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Metadata Sidebar -->
        <div class="space-y-6">
          <!-- Audit Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="p-6 border-b border-sage-200">
              <h3 class="text-lg font-semibold text-sage-800">
                Audit Information
              </h3>
            </div>
            <div class="p-6 space-y-4">
              <!-- Dibuat Oleh -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Created By
                </label>
                <div class="text-sm text-sage-800">
                  {{ operationalCostCategory.creator?.name || '-' }}
                </div>
              </div>

              <!-- Tanggal Dibuat -->
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Created At
                </label>
                <div class="text-sm text-sage-800">
                  {{ formatDate(operationalCostCategory.created_at) }}
                </div>
              </div>

              <!-- Diperbarui Oleh -->
              <div v-if="operationalCostCategory.updater">
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Updated By
                </label>
                <div class="text-sm text-sage-800">
                  {{ operationalCostCategory.updater.name }}
                </div>
              </div>

              <!-- Tanggal Diperbarui -->
              <div v-if="operationalCostCategory.updated_at !== operationalCostCategory.created_at">
                <label class="block text-sm font-medium text-sage-700 mb-1">
                  Updated At
                </label>
                <div class="text-sm text-sage-800">
                  {{ formatDate(operationalCostCategory.updated_at) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="p-6 border-b border-sage-200">
              <h3 class="text-lg font-semibold text-sage-800">
                Quick Actions
              </h3>
            </div>
            <div class="p-6 space-y-3">
              <Link
                :href="route('admin-keuangan.operational-cost-categories.edit', operationalCostCategory.id)"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
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
                <span>Edit Category</span>
              </Link>

              <button
                @click="confirmDelete"
                class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
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
                <span>Delete Category</span>
              </button>
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
        <h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
        <p class="text-sm text-gray-600 mb-6">
          Are you sure you want to delete category "{{ operationalCostCategory.name }}"?
          This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            @click="deleteCategory"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref } from 'vue'
import { Head, Link, router } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

const props = defineProps({
  operationalCostCategory: Object,
})

// Route function
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.operational-cost-categories.index': '/admin-keuangan/operational-cost-categories',
    'admin-keuangan.operational-cost-categories.edit': '/admin-keuangan/operational-cost-categories',
    'admin-keuangan.operational-cost-categories.destroy': '/admin-keuangan/operational-cost-categories',
  }
  const baseRoute = routes[name] || '#'
  return params ? `${baseRoute}/${params}` : baseRoute
}

// Delete modal
const showDeleteModal = ref(false)

// Methods
const confirmDelete = () => {
  showDeleteModal.value = true
}

const deleteCategory = () => {
  router.delete(route('admin-keuangan.operational-cost-categories.destroy', props.operationalCostCategory.id), {
    onSuccess: () => {
      // Will redirect to index page
    }
  })
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
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
.hover\:bg-sage-200:hover { background-color: #d4ddd0; }
</style>
