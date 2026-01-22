<template>
    <AdminKeuanganLayout>
        <div class="py-6">

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="bg-white shadow rounded-lg mb-6">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div class="flex items-center">
                                <div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4">
                                    <Users class="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 class="text-2xl font-semibold text-gray-900">{{ vendor.nama_vendor }}</h1>
                                    <p class="mt-1 text-sm text-gray-600">Vendor details and profile</p>
                                </div>
                            </div>
                            <div class="mt-4 sm:mt-0 flex space-x-3">
                                <a :href="route('admin-keuangan.vendors.pdf', vendor.id)" target="_blank"
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-sage-600 text-sm font-medium text-white hover:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <FileText class="mr-2 h-4 w-4" />
                                    Export PDF
                                </a>
                                <Link :href="route('admin-keuangan.vendors.edit', vendor.id)"
                                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                                    <Edit class="mr-2 h-4 w-4" />
                                    Edit
                                </Link>
                                <Link :href="route('admin-keuangan.vendors.index')"
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <ArrowLeft class="mr-2 h-4 w-4" />
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <!-- Vendor Information -->
                    <div class="lg:col-span-2">
                        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="text-lg font-medium text-gray-900">Vendor Information</h3>
                            </div>

                            <div class="p-6">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <!-- Vendor ID -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Vendor ID</label>
                                        <p class="text-gray-900 font-medium">#{{ vendor.id }}</p>
                                    </div>

                                    <!-- Vendor Name -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Vendor Name
                                        </label>
                                        <p class="text-gray-900">{{ vendor.nama_vendor }}</p>
                                    </div>

                                    <!-- Primary Contact (PIC) -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Primary Contact (PIC)
                                        </label>
                                        <p class="text-gray-900">{{ vendor.pic || '-' }}</p>
                                    </div>

                                    <!-- Mobile Phone -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Mobile Phone
                                        </label>
                                        <p class="text-gray-900 font-mono">{{ vendor.no_hp || '-' }}</p>
                                    </div>

                                    <!-- Email -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <p class="text-gray-900">{{ vendor.email || '-' }}</p>
                                    </div>

                                    <!-- Office Phone -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Office Phone
                                        </label>
                                        <p class="text-gray-900 font-mono">{{ vendor.no_kantor || '-' }}</p>
                                    </div>

                                    <!-- Account Number -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Account Number
                                        </label>
                                        <p class="text-gray-900 font-mono">{{ vendor.nomor_rekening }}</p>
                                    </div>

                                    <!-- Account Name -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Account Name
                                        </label>
                                        <p class="text-gray-900">{{ vendor.nama_rekening }}</p>
                                    </div>

                                    <!-- NIB -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            NIB (Business Registration ID)
                                        </label>
                                        <p class="text-gray-900 font-mono">{{ vendor.nib || '-' }}</p>
                                    </div>

                                    <!-- Vendor Photo -->
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Vendor Photo
                                        </label>
                                        <div v-if="vendor.photo_path">
                                            <img :src="`/storage/${vendor.photo_path}`" alt="Vendor Photo"
                                                class="w-32 h-32 object-cover rounded-lg border border-gray-200 mt-2" />
                                        </div>
                                        <p v-else class="text-gray-500 italic">No photo available</p>
                                    </div>

                                    <!-- Legal Document -->
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Legal Document
                                        </label>
                                        <div v-if="vendor.legal_document_path">
                                            <a :href="`/storage/${vendor.legal_document_path}`" target="_blank"
                                                class="inline-flex items-center px-4 py-2 mt-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                View Document
                                            </a>
                                        </div>
                                        <p v-else class="text-gray-500 italic">No document available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- System Information -->
                    <div class="lg:col-span-1">
                        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="text-lg font-medium text-gray-900">System Information</h3>
                            </div>

                            <div class="p-6">
                                <div class="space-y-6">
                                    <!-- Tanggal Dibuat -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Created Date
                                        </label>
                                        <p class="text-gray-900">{{ formatDateTime(vendor.created_at) }}</p>
                                    </div>

                                    <!-- Terakhir Diperbarui -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Last Updated
                                        </label>
                                        <p class="text-gray-900">{{ formatDateTime(vendor.updated_at) }}</p>
                                    </div>

                                    <!-- Status -->
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">
                                            Status
                                        </label>
                                        <span
                                            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 8 8">
                                                <circle cx="4" cy="4" r="3" />
                                            </svg>
                                            Active
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { Link, router } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";
import { Users, FileText, Edit, ArrowLeft, Trash2 } from "lucide-vue-next";

const props = defineProps({
    vendor: Object,
});

// Route helper definitions
const routes = {
    'admin-keuangan.vendors.pdf': (id) => `/admin-keuangan/vendors/${id}/pdf`,
    'admin-keuangan.vendors.export.pdf': '/admin-keuangan/vendors/export/pdf',
};

// Override global route function for this component
const route = (name, params) => {
    if (routes[name]) {
        return typeof routes[name] === 'function' ? routes[name](params) : routes[name];
    }
    return window.route ? window.route(name, params) : `#${name}`;
};

const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

const deleteVendor = () => {
    if (confirm(`Are you sure you want to delete vendor "${props.vendor.nama_vendor}"?`)) {
        router.delete(route("admin-keuangan.vendors.destroy", props.vendor.id), {
            onSuccess: () => {
                // Redirect will be handled by the controller
            },
        });
    }
};
</script>

<style scoped>
/* Custom Sage Colors */
.hover\:bg-sage-700:hover {
    background-color: #6b8f5e;
}

.focus\:ring-sage-500:focus {
    --tw-ring-color: #8db580;
}
</style>
