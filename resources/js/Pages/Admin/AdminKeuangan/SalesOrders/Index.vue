<template>
    <AdminKeuanganLayout>
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header Section -->
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Shipping Order Management</h1>
                        <p class="mt-1 text-sm text-gray-600">Manage CS shipping orders and create new shipping orders
                        </p>
                    </div>
                    <div class="flex space-x-2">
                        <Link :href="route('admin-keuangan.sales-orders.create')"
                            class="inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2">
                            <Plus class="w-4 h-4 mr-2" />
                            Create Shipping Order
                        </Link>
                    </div>
                </div>

                <!-- Search Section -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Filters</h3>
                        <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
                            <div class="md:col-span-3">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
                                <input v-model="form.search" @input="search" type="text"
                                    placeholder="Search by order number, customer, or invoice..."
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                <input v-model="form.start_date" type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                <input v-model="form.end_date" type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                            </div>
                            <div class="flex items-end">
                                <button @click="search"
                                    class="w-full px-4 py-2 bg-sage-800 text-white rounded-md transition-colors">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Sales Orders Table -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="sm:flex sm:items-center sm:justify-between mb-4">
                            <div>
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Shipping Orders List</h3>
                                <p class="mt-1 text-sm text-gray-600">Total: {{ salesOrders?.total || 0 }} records</p>
                            </div>
                        </div>

                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order Number
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Shipper
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Shipment Type
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Commodity
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            QTY
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Container No
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="salesOrder in salesOrders.data" :key="salesOrder.id"
                                        class="hover:bg-gray-50">
                                        <!-- Order Number -->
                                        <td class="px-6 py-4 text-sm font-medium text-gray-900">
                                            {{ salesOrder.order_number || salesOrder.so_number }}
                                        </td>

                                        <!-- Customer -->
                                        <td class="px-6 py-4 text-sm text-gray-900">
                                            <div>
                                                <div class="font-medium">{{ salesOrder.customer ||
                                                    salesOrder.customer_name }}</div>
                                                <div class="text-gray-500" v-if="salesOrder.customer_code">
                                                    {{ salesOrder.customer_code }}
                                                </div>
                                            </div>
                                        </td>

                                        <!-- Shipper -->
                                        <td class="px-6 py-4 text-sm text-gray-900">
                                            {{ salesOrder.shipper || salesOrder.consignee_shipper || '-' }}
                                        </td>

                                        <!-- Shipment Type -->
                                        <td class="px-6 py-4 text-sm text-gray-900">
                                            <span
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {{ salesOrder.shipment_type || '-' }}
                                            </span>
                                        </td>

                                        <!-- Commodity -->
                                        <td class="px-6 py-4 text-sm text-gray-900">
                                            <div class="max-w-32 truncate" :title="salesOrder.commodity">
                                                {{ salesOrder.commodity || salesOrder.goods || '-' }}
                                            </div>
                                        </td>

                                        <!-- QTY -->
                                        <td class="px-6 py-4 text-sm text-gray-900">
                                            {{ salesOrder.qty || '-' }}
                                        </td>

                                        <!-- Container No -->
                                        <td class="px-6 py-4 text-sm text-gray-900">
                                            <div v-if="salesOrder.container_no && Array.isArray(salesOrder.container_no)"
                                                class="space-y-1">
                                                <span v-for="(container, index) in salesOrder.container_no.slice(0, 2)"
                                                    :key="index"
                                                    class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1">
                                                    {{ container }}
                                                </span>
                                                <div v-if="salesOrder.container_no.length > 2"
                                                    class="text-xs text-gray-500">
                                                    +{{ salesOrder.container_no.length - 2 }} more
                                                </div>
                                            </div>
                                            <span v-else-if="salesOrder.container_no"
                                                class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                {{ salesOrder.container_no }}
                                            </span>
                                            <span v-else class="text-gray-500">-</span>
                                        </td>

                                        <!-- Status -->
                                        <td class="px-6 py-4 text-sm">
                                            <span
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                                :class="getStatusColor(salesOrder.status)">
                                                {{ getStatusLabel(salesOrder.status) }}
                                            </span>
                                        </td>

                                        <!-- Aksi -->
                                        <td class="px-6 py-4 text-sm font-medium">
                                            <div class="flex items-center space-x-2">
                                                <Link :href="route('admin-keuangan.sales-orders.show', salesOrder.id)"
                                                    class="text-sage-800 hover:text-sage-900 p-2 rounded-md hover:bg-sage-50"
                                                    title="View Details">
                                                    <Eye class="w-4 h-4" />
                                                </Link>
                                                <Link :href="route('admin-keuangan.sales-orders.edit', salesOrder.id)"
                                                    class="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50"
                                                    title="Edit">
                                                    <Edit class="w-4 h-4" />
                                                </Link>
                                                <a :href="route('admin-keuangan.sales-orders.print', salesOrder.id)"
                                                    class="text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50"
                                                    title="Download PDF" target="_blank">
                                                    <FileText class="w-4 h-4" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div v-if="!salesOrders.data || salesOrders.data.length === 0" class="text-center py-12">
                            <FileText class="mx-auto h-12 w-12 text-gray-400" />
                            <h3 class="mt-2 text-sm font-medium text-gray-900">No shipping orders yet</h3>
                            <p class="mt-1 text-sm text-gray-500">Start by adding your first shipping order</p>
                        </div>

                        <div v-if="salesOrders.links" class="mt-6">
                            <Pagination :data="salesOrders" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { router, Link } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';
import Pagination from '@/Components/Pagination.vue';
import { debounce } from 'lodash';
import { Plus, Eye, Edit, FileText } from 'lucide-vue-next';

const props = defineProps({
    salesOrders: Object,
    filters: Object,
});

const form = reactive({
    search: props.filters.search || '',
    start_date: props.filters.start_date || '',
    end_date: props.filters.end_date || '',
});

const applyFilters = () => {
    router.get(route('admin-keuangan.sales-orders.index'), {
        search: form.search,
        start_date: form.start_date,
        end_date: form.end_date,
    }, {
        preserveState: true,
        replace: true,
    });
};

const search = debounce(() => {
    applyFilters();
}, 300);

const setDefaultMonthFilter = () => {
    if (props.filters.start_date || props.filters.end_date) {
        return;
    }
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const format = (date) => date.toISOString().split('T')[0];
    form.start_date = format(start);
    form.end_date = format(end);
    applyFilters();
};

onMounted(() => {
    setDefaultMonthFilter();
});

const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('id-ID');
};

const formatCurrency = (amount, currency = 'IDR') => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
    }).format(amount);
};

const getStatusLabel = (status) => {
    const labels = {
        released: 'Released',
        approved: 'Approved',
        rejected: 'Rejected'
    };
    return labels[status] || status;
};

const getStatusColor = (status) => {
    const colors = {
        released: 'bg-purple-100 text-purple-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

const getVoucherTypeColor = (type) => {
    const colors = {
        payment: 'bg-blue-100 text-blue-800',
        receipt: 'bg-green-100 text-green-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
};
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-500 {
    color: #9fb894;
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

.text-sage-900 {
    color: #5a7a4f;
}

.bg-sage-50 {
    background-color: #f4f6f3;
}

.bg-sage-100 {
    background-color: #e8ece5;
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

.divide-sage-200> :not([hidden])~ :not([hidden]) {
    border-color: #d4ddd0;
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
