<template>
  <AdminKeuanganLayout>
    <Head title="Edit Service Type" />

    <div class="py-6">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-6">
          <Link
            :href="route('admin-keuangan.service-types.index')"
            class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            Kembali ke Manajemen Service Type
          </Link>
          <h1 class="text-2xl font-bold text-gray-900">Edit Service Type</h1>
          <p class="mt-1 text-sm text-gray-600">Edit service type {{ serviceType.code }}</p>
        </div>

        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
          <div class="px-6 py-8">
            <form @submit.prevent="submit" class="space-y-6">
              <!-- Kode -->
              <div>
                <label for="code" class="block text-sm font-medium text-gray-700 mb-2">
                  Kode Service Type <span class="text-red-500">*</span>
                </label>
                <input
                  id="code"
                  v-model="form.code"
                  type="text"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': form.errors.code }"
                  placeholder="Contoh: OF/AF, HANDLING"
                />
                <div v-if="form.errors.code" class="mt-1 text-sm text-red-600">
                  {{ form.errors.code }}
                </div>
              </div>

              <!-- Deskripsi -->
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="4"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                  placeholder="Deskripsi detail tentang jenis biaya/service..."
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
                    Status Aktif
                  </span>
                </label>
              </div>

              <!-- Submit Button -->
              <div class="mt-8 flex justify-end space-x-3">
                <Link
                  :href="route('admin-keuangan.service-types.index')"
                  class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                >
                  Batal
                </Link>
                <button
                  type="submit"
                  :disabled="processing"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"
                >
                  <Loader2 v-if="processing" class="animate-spin -ml-1 mr-2 h-4 w-4" />
                  {{ processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
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

const props = defineProps({
  serviceType: Object
})

const form = useForm({
  code: props.serviceType.code,
  description: props.serviceType.description || '',
  is_active: props.serviceType.is_active
})

const processing = computed(() => form.processing)

const submit = () => {
  form.put(route('admin-keuangan.service-types.update', props.serviceType.id))
}
</script>
