<template>
    <AdminKeuanganLayout>

        <Head title="Customer Management" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header Section -->
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Customer Management</h1>
                        <p class="mt-1 text-sm text-gray-600">Manage customer records and contact information</p>
                    </div>
                    <div class="flex space-x-2">
                        <button @click="handleExportPdf"
                            class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-900 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            <FileDown class="w-4 h-4 mr-2" />
                            Export PDF
                        </button>
                        <Link :href="route('admin-keuangan.customers.create')"
                            class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-900 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            <Plus class="w-4 h-4 mr-2" />
                            Add Customer
                        </Link>
                    </div>
                </div>

                <!-- Search Section -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Filters</h3>
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div class="md:col-span-3">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                <input v-model="form.search" type="text"
                                    placeholder="Search company name, contact, email, marketing..."
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                            </div>
                            <div class="flex items-end">
                                <button @click="search"
                                    class="w-full px-4 py-2 bg-sage-600 text-white rounded-md hover:bg-sage-900 transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Customers Table -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="sm:flex sm:items-center sm:justify-between mb-4">
                            <div>
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Customer Data List</h3>
                                <p class="mt-1 text-sm text-gray-600">Total: {{ customers?.total || 0 }} records</p>
                            </div>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer Code
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Company Name
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Business Type
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact Name
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Contact Email
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Marketing
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Handler
                                        </th>
                                        <th scope="col" class="relative px-6 py-3">
                                            <span class="sr-only">Delete</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="customer in customers.data" :key="customer.id"
                                        class="hover:bg-gray-50 cursor-pointer" @click="goToDetail(customer)">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">{{ customer.customer_code ||
                                                '-' }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">{{ customer.company_name }}
                                            </div>
                                            <div class="text-sm text-gray-500">{{ customer.company_type }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ customer.company_type }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ customer.pic_name }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ customer.pic_email }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ customer.marketing_name || '-' }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ customer.handler?.name || '-' }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button @click.stop="deleteCustomer(customer)"
                                                class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50"
                                                title="Delete">
                                                <Trash2 class="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div v-if="!customers.data || customers.data.length === 0" class="text-center py-12">
                            <Users class="mx-auto h-12 w-12 text-gray-400" />
                            <h3 class="mt-2 text-sm font-medium text-gray-900">No customer data yet</h3>
                            <p class="mt-1 text-sm text-gray-500">Start by adding your first customer</p>
                        </div>

                        <div v-if="customers.links" class="mt-6">
                            <Pagination :data="customers" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Dialog -->
        <AlertDialog :show="showDeleteDialog" type="confirm" title="Delete Customer"
            :message="`Are you sure you want to delete customer '${customerToDelete?.company_name}'? This action cannot be undone.`"
            confirm-text="Yes, Delete" cancel-text="Cancel" @confirm="confirmDelete" @cancel="cancelDelete"
            @close="cancelDelete" />
    </AdminKeuanganLayout>
</template>

<script setup>
import { reactive, watch, ref, computed } from "vue";
import { router, Link, Head } from "@inertiajs/vue3";
import axios from "axios";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";
import Pagination from "@/Components/Pagination.vue";
import AlertDialog from "@/Components/AlertDialog.vue";
import { Plus, FileDown, Trash2, Users } from 'lucide-vue-next';

const props = defineProps({
    customers: Object,
    filters: Object,
});

// Route helper definitions
const routes = {
    'admin-keuangan.customers.export.pdf': '/admin-keuangan/customers/export/pdf',
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
    const baseUrl = route('admin-keuangan.customers.export.pdf');
    const params = new URLSearchParams();

    if (form.search) {
        params.append('search', form.search);
    }

    return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
});

const search = () => {
    const params = {};
    if (form.search) params.search = form.search;

    router.get(route("admin-keuangan.customers.index"), params, {
        preserveState: true,
        replace: true,
    });
};

const goToDetail = (customer) => {
    router.get(route('admin-keuangan.customers.show', customer.id));
};

// Delete dialog state
const showDeleteDialog = ref(false);
const customerToDelete = ref(null);

const deleteCustomer = (customer) => {
    customerToDelete.value = customer;
    showDeleteDialog.value = true;
};

const confirmDelete = () => {
    if (customerToDelete.value) {
        router.delete(route("admin-keuangan.customers.destroy", customerToDelete.value.id), {
            onSuccess: () => {
                // Refresh the page
                router.get(route("admin-keuangan.customers.index"), {
                    search: form.search,
                }, {
                    preserveState: true,
                    replace: true,
                });
            },
            onError: (errors) => {
                alert('Failed to delete customer: ' + Object.values(errors).join(', '));
            }
        });
    }
    showDeleteDialog.value = false;
    customerToDelete.value = null;
};

const cancelDelete = () => {
    showDeleteDialog.value = false;
    customerToDelete.value = null;
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

const handleExportPdf = async () => {
    try {
        const response = await axios.get(exportPdfUrl.value, {
            responseType: 'blob'
        });

        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Check if iframe exists, if not create one
        let iframe = document.getElementById('pdf-print-iframe');
        if (!iframe) {
            iframe = document.createElement('iframe');
            iframe.id = 'pdf-print-iframe';
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
        }

        iframe.src = url;

        iframe.onload = function () {
            setTimeout(function () {
                iframe.focus();
                iframe.contentWindow.print();
            }, 1);
        };
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Gagal mengunduh PDF');
    }
};
</script>

<style scoped>
/* Custom Sage Colors untuk focus ring */
.focus\:ring-sage-500:focus {
    --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
    border-color: #8db580;
}
</style>
