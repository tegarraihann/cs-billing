<template>
  <AdminKeuanganLayout>
    <Head title="Add Service Type" />

    <div class="py-6">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-6">
          <Link
            :href="route('admin-keuangan.service-types.index')"
            class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            Back to Service Type Management
          </Link>
          <h1 class="text-2xl font-bold text-gray-900">Add New Service Type</h1>
          <p class="mt-1 text-sm text-gray-600">Add a new service/fee type for vendor items.</p>
        </div>

        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
          <div class="px-6 py-8">
            <form @submit.prevent="submit" class="space-y-6">
              <!-- Kode -->
              <div>
                <label for="code" class="block text-sm font-medium text-gray-700 mb-2">
                  Service Type Code <span class="text-red-500">*</span>
                </label>
                <input
                  id="code"
                  v-model="form.code"
                  type="text"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': form.errors.code }"
                  placeholder="Example: OF/AF, HANDLING"
                />
                <div v-if="form.errors.code" class="mt-1 text-sm text-red-600">
                  {{ form.errors.code }}
                </div>
              </div>

              <!-- Deskripsi -->
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="4"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                  placeholder="Detailed description of the service/fee type..."
                ></textarea>
              </div>

              <!-- Status Aktif -->
              <div class="flex items-center">
                <label class="flex items-center cursor-pointer">
                  <input
                    v-model="form.is_active"
                    type="checkbox"
                    class="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 block text-sm text-gray-900">
                    Active Status
                  </span>
                </label>
              </div>

              <!-- Submit Button -->
              <div class="mt-8 flex justify-end space-x-3">
                <Link
                  :href="route('admin-keuangan.service-types.index')"
                  class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  :disabled="processing"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"
                >
                  <Loader2 v-if="processing" class="animate-spin -ml-1 mr-2 h-4 w-4" />
                  {{ processing ? 'Saving...' : 'Save Service Type' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { computed } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { ArrowLeft, Loader2 } from 'lucide-vue-next'

const form = useForm({
  code: '',
  description: '',
  is_active: true
})

const processing = computed(() => form.processing)

const submit = () => {
  form.post(route('admin-keuangan.service-types.store'))
}
</script>
