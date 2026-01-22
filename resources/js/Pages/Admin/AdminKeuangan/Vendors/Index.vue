<template>
    <AdminKeuanganLayout>
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="bg-white shadow rounded-lg mb-6">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 class="text-2xl font-semibold text-gray-900">Vendor Master Data</h1>
                                <p class="mt-1 text-sm text-gray-600">Manage vendor records for transactions</p>
                            </div>
                            <div class="mt-4 sm:mt-0 flex space-x-3">
                                <a :href="exportPdfUrl" target="_blank"
                                    class="inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2">
                                    <FileDown class="mr-2 h-4 w-4" />
                                    Export PDF
                                </a>
                                <Link :href="route('admin-keuangan.vendors.create')"
                                    class="inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2">
                                    <Plus class="mr-2 h-4 w-4" />
                                    Add Vendor
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Search Section -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-6 py-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Search Input -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                <input v-model="form.search" type="text"
                                    placeholder="Search vendor name, contact, phone, email, office, account number, account name, NIB..."
                                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500 sm:text-sm" />
                            </div>

                            <!-- Search Button -->
                            <div class="flex items-end">
                                <button @click="search"
                                    class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Vendors Table -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-medium text-gray-900">Vendor List</h3>
                        <p class="mt-1 text-sm text-gray-600">
                            Total: {{ vendors?.total || 0 }} records
                        </p>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        ID
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vendor Name
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Contact
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Office Phone
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Account Number
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Account Name
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        NIB
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Document Status
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created Date
                                    </th>
                                    <th
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="vendor in vendors.data" :key="vendor.id"
                                    class="hover:bg-gray-50 cursor-pointer" @click="goToDetail(vendor)">
                                    <!-- ID -->
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                                        {{ vendor.id }}
                                    </td>

                                    <!-- Nama Vendor -->
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        {{ vendor.nama_vendor }}
                                    </td>

                                    <!-- PIC -->
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        {{ vendor.pic || '-' }}
                                    </td>

                                    <!-- No HP -->
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        {{ vendor.no_hp || '-' }}
                                    </td>

                                    <!-- Email -->
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        {{ vendor.email || '-' }}
                                    </td>

                                    <!-- No Kantor -->
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        {{ vendor.no_kantor || '-' }}
                                    </td>

                                    <!-- Nomor Rekening -->
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        {{ vendor.nomor_rekening }}
                                    </td>

                                    <!-- Nama Rekening -->
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        {{ vendor.nama_rekening }}
                                    </td>

                                    <!-- NIB -->
                                    <td class="px-6 py-4 text-sm text-gray-900 font-mono">
                                        {{ vendor.nib || '-' }}
                                    </td>

                                    <!-- Status Dokumen -->
                                    <td class="px-6 py-4 text-sm">
                                        <div class="flex space-x-1">
                                            <span v-if="vendor.photo_path"
                                                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Photo
                                            </span>
                                            <span v-if="vendor.legal_document_path"
                                                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Legal
                                            </span>
                                            <span v-if="!vendor.photo_path && !vendor.legal_document_path"
                                                class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                None
                                            </span>
                                        </div>
                                    </td>

                                    <!-- Tanggal Dibuat -->
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        {{ formatDate(vendor.created_at) }}
                                    </td>

                                    <!-- Actions -->
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button @click.stop="deleteVendor(vendor.id)"
                                            class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50"
                                            title="Delete Vendor">
                                            <Trash2 class="h-4 w-4" />
                                        </button>
                                    </td>
                                </tr>

                                <!-- Empty State -->
                                <tr v-if="!vendors.data || vendors.data.length === 0">
                                    <td colspan="12" class="px-6 py-12 text-center">
                                        <div class="flex flex-col items-center">
                                            <Users class="h-12 w-12 text-gray-300 mb-4" />
                                            <h3 class="text-sm font-medium text-gray-900 mb-1">No vendor data</h3>
                                            <p class="text-sm text-gray-500">There are no vendor records yet</p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div v-if="vendors.last_page > 1" class="bg-white px-6 py-3 border-t border-gray-200">
                        <Pagination :data="vendors" />
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { reactive, watch, computed } from "vue";
import { router, Link } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";
import Pagination from "@/Components/Pagination.vue";
import { Trash2, Users, Plus, FileDown } from "lucide-vue-next";

const props = defineProps({
    vendors: Object,
    filters: Object,
});

// Route helper definitions
const routes = {
    'admin-keuangan.vendors.export.pdf': '/admin-keuangan/vendors/export/pdf',
};

// Override global route function for this component
const route = (name, params) => {
    if (routes[name]) {
        return typeof routes[name] === 'function' ? routes[name](params) : routes[name];
    }
    return window.route ? window.route(name, params) : `#${name}`;
};

// Form data
const form = reactive({
    search: props.filters?.search || "",
});

// Computed property for export PDF URL
const exportPdfUrl = computed(() => {
    const baseUrl = route('admin-keuangan.vendors.export.pdf');
    const params = new URLSearchParams();

    if (form.search) {
        params.append('search', form.search);
    }

    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
});

const search = () => {
    const params = {};
    if (form.search) params.search = form.search;

    router.get(route("admin-keuangan.vendors.index"), params, {
        preserveState: true,
        replace: true,
    });
};

const goToDetail = (vendor) => {
    router.get(route("admin-keuangan.vendors.show", vendor.id));
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US");
};

const deleteVendor = (vendorId) => {
    if (confirm("Are you sure you want to delete this vendor?")) {
        router.delete(route("admin-keuangan.vendors.destroy", vendorId), {
            onSuccess: () => {
                alert("Vendor deleted successfully!");
            },
        });
    }
};

// Watch for changes in search input and trigger search after a delay
watch(
    () => form.search,
    () => {
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
            search();
        }, 500);
    }
);
</script>

<style scoped>
/* Custom Sage Colors */
.bg-sage-600 {
    background-color: #7ba169;
}

.bg-sage-700 {
    background-color: #6b8f5e;
}

.text-sage-600 {
    color: #7ba169;
}

.text-sage-900 {
    color: #5a7a4f;
}

.hover\:bg-sage-700:hover {
    background-color: #6b8f5e;
}

.hover\:text-sage-900:hover {
    color: #5a7a4f;
}

.focus\:ring-sage-500:focus {
    --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
    border-color: #8db580;
}
</style>
