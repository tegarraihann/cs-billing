<template>
  <AdminKeuanganLayout>
    <Head title="Detail Satuan Package" />

    <div class="py-6">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <Link
                :href="route('admin-keuangan.master-package-units.index')"
                class="text-sage-600 hover:text-sage-800 transition-colors"
              >
                <ArrowLeft class="w-5 h-5" />
              </Link>
              <div>
                <h1 class="text-2xl font-bold text-sage-800">{{ packageUnit.name }}</h1>
                <p class="text-sm text-sage-600">Kode: {{ packageUnit.code }}</p>
              </div>
            </div>
            <div class="flex items-center space-x-3">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="packageUnit.is_active
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'"
              >
                {{ packageUnit.is_active ? 'Aktif' : 'Nonaktif' }}
              </span>
              <Link
                :href="route('admin-keuangan.master-package-units.edit', packageUnit.id)"
                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
              >
                <Edit class="w-4 h-4 mr-2" />
                Edit
              </Link>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Package Unit Details -->
          <div class="lg:col-span-2">
            <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
              <h3 class="text-lg font-semibold text-sage-800 mb-4">Informasi Satuan</h3>

              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Kode</label>
                    <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <span class="text-sm font-mono">{{ packageUnit.code }}</span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <span class="text-sm">{{ packageUnit.name }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[60px]">
                    <span class="text-sm">{{ packageUnit.description || 'Tidak ada deskripsi' }}</span>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Urutan Tampil</label>
                    <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <span class="text-sm">{{ packageUnit.sort_order }}</span>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <span
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        :class="packageUnit.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'"
                      >
                        {{ packageUnit.is_active ? 'Aktif' : 'Nonaktif' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions & Meta -->
          <div class="space-y-6">
            <!-- Quick Actions -->
            <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
              <h3 class="text-lg font-semibold text-sage-800 mb-4">Aksi Cepat</h3>

              <div class="space-y-3">
                <Link
                  :href="route('admin-keuangan.master-package-units.edit', packageUnit.id)"
                  class="w-full inline-flex items-center justify-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                >
                  <Edit class="w-4 h-4 mr-2" />
                  Edit Satuan
                </Link>

                <button
                  @click="toggleStatus"
                  class="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ToggleLeft class="w-4 h-4 mr-2" />
                  {{ packageUnit.is_active ? 'Nonaktifkan' : 'Aktifkan' }}
                </button>

                <button
                  @click="showDeleteModal = true"
                  class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 class="w-4 h-4 mr-2" />
                  Hapus Satuan
                </button>
              </div>
            </div>

            <!-- Meta Information -->
            <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
              <h3 class="text-lg font-semibold text-sage-800 mb-4">Informasi Sistem</h3>

              <div class="space-y-3 text-sm">
                <div>
                  <label class="block font-medium text-gray-700">ID</label>
                  <span class="text-gray-600">{{ packageUnit.id }}</span>
                </div>
                <div>
                  <label class="block font-medium text-gray-700">Dibuat</label>
                  <span class="text-gray-600">{{ formatDate(packageUnit.created_at) }}</span>
                </div>
                <div>
                  <label class="block font-medium text-gray-700">Diperbarui</label>
                  <span class="text-gray-600">{{ formatDate(packageUnit.updated_at) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <AlertDialog
      :show="showDeleteModal"
      type="danger"
      title="Hapus Satuan Package"
      :message="`Apakah Anda yakin ingin menghapus satuan '${packageUnit.code}'? Aksi ini tidak dapat dibatalkan.`"
      confirm-text="Hapus"
      cancel-text="Batal"
      @confirm="deleteUnit"
      @cancel="showDeleteModal = false"
    />
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref } from 'vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { ArrowLeft, Edit, ToggleLeft, Trash2 } from 'lucide-vue-next'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import AlertDialog from '@/Components/AlertDialog.vue'

const props = defineProps({
  packageUnit: Object
})

const showDeleteModal = ref(false)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const toggleStatus = () => {
  router.patch(route('admin-keuangan.master-package-units.toggle-status', props.packageUnit.id), {}, {
    preserveScroll: true
  })
}

const deleteUnit = () => {
  router.delete(route('admin-keuangan.master-package-units.destroy', props.packageUnit.id), {
    onSuccess: () => {
      showDeleteModal.value = false
    }
  })
}
</script>