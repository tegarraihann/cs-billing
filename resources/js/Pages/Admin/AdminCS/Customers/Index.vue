<template>
    <AdminLayout>
        <div class="p-4 sm:p-6 lg:p-8">
            <!-- Header Section -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-sage-800 mb-2">
                            Manajemen Pelanggan
                        </h2>
                        <p class="text-sage-600">
                            Kelola data pelanggan - lihat, tambah, edit, dan hapus data pelanggan
                        </p>
                    </div>
                    <div class="mt-4 sm:mt-0">
                        <Link :href="route('admin-cs.customers.create')"
                              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Tambah Pelanggan
                        </Link>
                    </div>
                </div>
            </div>

            <!-- Search and Filter Section -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <!-- Search Input -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">Cari Pelanggan</label>
                        <input v-model="form.search"
                               type="text"
                               placeholder="Cari nama, email, telepon..."
                               class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500">
                    </div>

                    <!-- Status Filter -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">Filter Status</label>
                        <select v-model="form.status"
                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500">
                            <option value="">Semua Status</option>
                            <option v-for="(label, value) in statuses" :key="value" :value="value">
                                {{ label }}
                            </option>
                        </select>
                    </div>

                    <!-- Source Filter -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">Filter Sumber</label>
                        <select v-model="form.source"
                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500">
                            <option value="">Semua Sumber</option>
                            <option v-for="(label, value) in sources" :key="value" :value="value">
                                {{ label }}
                            </option>
                        </select>
                    </div>

                    <!-- Search Button -->
                    <div class="flex items-end">
                        <button @click="search"
                                class="w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors">
                            Filter
                        </button>
                    </div>
                </div>
            </div>

            <!-- Customers Table -->
            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                <div class="px-6 py-4 border-b border-sage-200">
                    <h3 class="text-lg font-semibold text-sage-800">Daftar Pelanggan</h3>
                    <p class="text-sm text-sage-600 mt-1">
                        Total: {{ customers?.total || 0 }} pelanggan
                    </p>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-sage-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Pelanggan
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Perusahaan
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Sumber
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Handler
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-sage-200">
                            <tr v-for="customer in customers.data" :key="customer.id" class="hover:bg-sage-50 transition-colors">
                                <!-- Customer Info -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center mr-3">
                                            <span class="text-white font-semibold text-sm">
                                                {{ getInitials(customer.name) }}
                                            </span>
                                        </div>
                                        <div>
                                            <div class="text-sm font-medium text-gray-900">
                                                {{ customer.name }}
                                            </div>
                                            <div class="text-sm text-gray-500">
                                                {{ customer.email }}
                                            </div>
                                            <div class="text-xs text-gray-400">
                                                {{ customer.phone }}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                <!-- Company -->
                                <td class="px-6 py-4 text-sm text-gray-900">
                                    {{ customer.company || '-' }}
                                </td>

                                <!-- Source -->
                                <td class="px-6 py-4 text-sm text-gray-900">
                                    {{ customer.inquiry_source_label }}
                                </td>

                                <!-- Status -->
                                <td class="px-6 py-4">
                                    <span :class="customer.status_color" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                        {{ customer.status_label }}
                                    </span>
                                </td>

                                <!-- Handler -->
                                <td class="px-6 py-4 text-sm text-gray-900">
                                    {{ customer.handler?.name || '-' }}
                                </td>

                                <!-- Actions -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-2">
                                        <Link :href="route('admin-cs.customers.show', customer.id)"
                                              class="text-sage-600 hover:text-sage-800 p-1 rounded transition-colors"
                                              title="Lihat Detail">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </Link>

                                        <Link :href="route('admin-cs.customers.edit', customer.id)"
                                              class="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                                              title="Edit">
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>

                                        <button @click="deleteCustomer(customer)"
                                                class="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                                                title="Hapus">
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
                <div v-if="customers?.last_page > 1" class="px-6 py-4 border-t border-sage-200">
                    <div class="flex items-center justify-between">
                        <div class="text-sm text-sage-600">
                            Menampilkan {{ customers.from }} sampai {{ customers.to }} dari {{ customers.total }} hasil
                        </div>
                        <div class="flex space-x-1">
                            <Link v-for="(link, index) in customers.links" :key="index"
                                  v-if="link.url"
                                  :href="link.url"
                                  v-html="link.label"
                                  class="px-3 py-2 text-sm rounded-md transition-colors"
                                  :class="link.active ? 'bg-sage-600 text-white' : 'text-sage-600 hover:bg-sage-100'">
                            </Link>
                            <span v-else
                                  v-html="link.label"
                                  class="px-3 py-2 text-sm text-gray-500"
                                  style="pointer-events: none; opacity: 0.5;">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alert Dialog -->
        <AlertDialog
            :show="alertDialog.show"
            :type="alertDialog.type"
            :title="alertDialog.title"
            :message="alertDialog.message"
            :confirm-text="alertDialog.confirmText"
            :cancel-text="alertDialog.cancelText"
            @confirm="handleAlertConfirm"
            @cancel="handleAlertCancel"
            @close="closeAlert"
        />
    </AdminLayout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'
import AlertDialog from '@/Components/AlertDialog.vue'

const props = defineProps({
    customers: Object,
    filters: Object,
    statuses: Object,
    sources: Object
})

const form = ref({
    search: props.filters.search || '',
    status: props.filters.status || '',
    source: props.filters.source || ''
})

// Alert Dialog State
const alertDialog = ref({
    show: false,
    type: 'info',
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    onConfirm: null
})

const search = () => {
    router.get(route('admin-cs.customers.index'), form.value, {
        preserveState: true,
        replace: true
    })
}

const deleteCustomer = (customer) => {
    alertDialog.value = {
        show: true,
        type: 'confirm',
        title: 'Konfirmasi Hapus',
        message: `Apakah Anda yakin ingin menghapus data pelanggan "${customer.name}"? Tindakan ini tidak dapat dibatalkan.`,
        confirmText: 'Ya, Hapus',
        cancelText: 'Batal',
        onConfirm: () => {
            router.delete(route('admin-cs.customers.destroy', customer.id), {
                onSuccess: () => {
                    showAlert('success', 'Berhasil', 'Data pelanggan berhasil dihapus.')
                },
                onError: () => {
                    showAlert('error', 'Gagal', 'Terjadi kesalahan saat menghapus data pelanggan.')
                }
            })
        }
    }
}

const showAlert = (type, title, message, confirmText = '', cancelText = '') => {
    alertDialog.value = {
        show: true,
        type,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: null
    }
}

const handleAlertConfirm = () => {
    if (alertDialog.value.onConfirm) {
        alertDialog.value.onConfirm()
    }
}

const handleAlertCancel = () => {
    // Cancel logic if needed
}

const closeAlert = () => {
    alertDialog.value.show = false
}

const getInitials = (name) => {
    if (!name) return "U";
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
}

// Check for flash messages on mount
onMounted(() => {
    // Check URL parameters for success/error messages
    const urlParams = new URLSearchParams(window.location.search)
    const successParam = urlParams.get('success')
    const errorParam = urlParams.get('error')
    
    if (successParam) {
        showAlert('success', 'Berhasil', decodeURIComponent(successParam))
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname)
    } else if (errorParam) {
        showAlert('error', 'Terjadi Kesalahan', decodeURIComponent(errorParam))
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname)
    }
})

// Auto search when filters change
watch(form, () => {
    search()
}, { deep: true })
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-500 {
  color: #8db580;
}
.text-sage-600 {
  color: #8db580;
}
.text-sage-700 {
  color: #7ba169;
}
.text-sage-800 {
  color: #6b8f5e;
}
.bg-sage-50 {
  background-color: #f4f6f3;
}
.bg-sage-100 {
  background-color: #e8ece5;
}
.bg-sage-200 {
  background-color: #d4ddd0;
}
.bg-sage-300 {
  background-color: #c0cdb8;
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
.hover\:bg-sage-100:hover {
  background-color: #e8ece5;
}
.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}
.hover\:text-sage-800:hover {
  color: #6b8f5e;
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
