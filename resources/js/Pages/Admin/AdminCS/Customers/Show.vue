<template>
    <AdminLayout>
        <div class="p-4 sm:p-6 lg:p-8">
            <!-- Header Section -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div class="flex items-center">
                        <div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4">
                            <span class="text-white font-semibold text-lg">
                                {{ getInitials(customer.name) }}
                            </span>
                        </div>
                        <div>
                            <h2 class="text-2xl font-bold text-sage-800">
                                {{ customer.name }}
                            </h2>
                            <p class="text-sage-600">
                                Detail informasi pelanggan dan riwayat komunikasi
                            </p>
                        </div>
                    </div>
                    <div class="flex space-x-2 mt-4 sm:mt-0">
                        <Link :href="route('admin-cs.customers.edit', customer.id)" 
                              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                        </Link>
                        <Link :href="route('admin-cs.customers.index')" 
                              class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Kembali
                        </Link>
                    </div>
                </div>
            </div>

            <!-- Customer Information -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <!-- Basic Information -->
                <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                    <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
                        <h3 class="text-lg font-semibold text-sage-800">Informasi Dasar</h3>
                    </div>
                    <div class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-sage-700">Nama Lengkap</label>
                            <p class="mt-1 text-sm text-gray-900 font-semibold">{{ customer.name }}</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-sage-700">Email</label>
                            <p class="mt-1 text-sm">
                                <a :href="`mailto:${customer.email}`" class="text-sage-600 hover:text-sage-800 transition-colors">
                                    {{ customer.email }}
                                </a>
                            </p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-sage-700">Nomor Telepon</label>
                            <p class="mt-1 text-sm">
                                <a :href="`tel:${customer.phone}`" class="text-sage-600 hover:text-sage-800 transition-colors">
                                    {{ customer.phone }}
                                </a>
                            </p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-sage-700">Perusahaan</label>
                            <p class="mt-1 text-sm text-gray-900">{{ customer.company || '-' }}</p>
                        </div>
                    </div>
                </div>

                <!-- Status Information -->
                <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                    <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
                        <h3 class="text-lg font-semibold text-sage-800">Status & Tracking</h3>
                    </div>
                    <div class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-sage-700">Sumber Inquiry</label>
                            <p class="mt-1 text-sm text-gray-900">{{ customer.inquiry_source_label }}</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-sage-700">Status</label>
                            <span :class="customer.status_color" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1">
                                {{ customer.status_label }}
                            </span>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-sage-700">Ditangani Oleh</label>
                            <p class="mt-1 text-sm text-gray-900">{{ customer.handler?.name || '-' }}</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-sage-700">Kontak Terakhir</label>
                            <p class="mt-1 text-sm text-gray-900">
                                {{ customer.last_contact_at ? formatDate(customer.last_contact_at) : '-' }}
                            </p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-sage-700">Tanggal Dibuat</label>
                            <p class="mt-1 text-sm text-gray-900">{{ formatDate(customer.created_at) }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Address -->
            <div v-if="customer.address" class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
                    <h3 class="text-lg font-semibold text-sage-800">Alamat</h3>
                </div>
                <div class="p-6">
                    <p class="text-sm text-gray-900 whitespace-pre-line">{{ customer.address }}</p>
                </div>
            </div>

            <!-- Notes -->
            <div v-if="customer.notes" class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
                    <h3 class="text-lg font-semibold text-sage-800">Catatan</h3>
                </div>
                <div class="p-6">
                    <p class="text-sm text-gray-900 whitespace-pre-line">{{ customer.notes }}</p>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
                    <h3 class="text-lg font-semibold text-sage-800">Aksi Cepat</h3>
                </div>
                <div class="p-6">
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <a :href="`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}`" 
                           target="_blank"
                           class="inline-flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                            </svg>
                            WhatsApp
                        </a>
                        
                        <a :href="`mailto:${customer.email}?subject=Inquiry%20Follow-up`" 
                           class="inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            Email
                        </a>
                        
                        <a :href="`tel:${customer.phone}`" 
                           class="inline-flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Telepon
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const props = defineProps({
    customer: Object
})

const formatDate = (dateString) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
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
.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}
.hover\:text-sage-800:hover {
  color: #6b8f5e;
}
</style>