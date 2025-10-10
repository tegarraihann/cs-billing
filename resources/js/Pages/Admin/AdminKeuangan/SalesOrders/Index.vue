<template>
  <AdminKeuanganLayout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Manajemen Sales Orders</h1>
            <p class="mt-1 text-sm text-gray-600">Kelola sales order dari CS dan buat sales order baru</p>
          </div>
          <div class="flex space-x-2">
            <Link
              :href="route('admin-keuangan.sales-orders.create')"
              class="inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            >
              <Plus class="w-4 h-4 mr-2" />
              Buat Sales Order
            </Link>
          </div>
        </div>

        <!-- Search Section -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Filter Data</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="md:col-span-3">
                <label class="block text-sm font-medium text-gray-700 mb-2">Cari Data</label>
                <input
                  v-model="form.search"
                  @input="search"
                  type="text"
                  placeholder="Cari berdasarkan nomor order, customer, atau invoice..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
              </div>
              <div class="flex items-end">
                <button
                  @click="search"
                  class="w-full px-4 py-2 bg-sage-800 text-white rounded-md transition-colors"
                >
                  Cari
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
                <h3 class="text-lg leading-6 font-medium text-gray-900">Daftar Sales Orders</h3>
                <p class="mt-1 text-sm text-gray-600">Total: {{ salesOrders?.total || 0 }} data</p>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Number
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dirilis Oleh
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal Rilis
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vouchers
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="salesOrder in salesOrders.data" :key="salesOrder.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ salesOrder.order_number }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ salesOrder.customer }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ salesOrder.released_by?.name || 'N/A' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDateTime(salesOrder.released_at) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ salesOrder.revenue ? formatCurrency(salesOrder.revenue) : '-' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    <div v-if="salesOrder.vouchers && salesOrder.vouchers.length > 0" class="flex flex-wrap gap-1">
                      <span v-for="voucher in salesOrder.vouchers" :key="voucher.id" 
                            class="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                            :class="getVoucherTypeColor(voucher.type)">
                        {{ voucher.voucher_no }}
                      </span>
                    </div>
                    <span v-else class="text-gray-400">-</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusColor(salesOrder.status)"
                  >
                    {{ getStatusLabel(salesOrder.status) }}
                  </span>
                </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="flex space-x-2">
                        <Link
                          :href="route('admin-keuangan.sales-orders.show', salesOrder.id)"
                          class="text-sage-800 p-2 rounded-md"
                          title="Lihat Detail"
                        >
                          <Eye class="w-4 h-4" />
                        </Link>
                        <Link
                          :href="route('admin-keuangan.sales-orders.edit', salesOrder.id)"
                          class="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit class="w-4 h-4" />
                        </Link>
                        <a
                          :href="route('admin-keuangan.sales-orders.print', salesOrder.id)"
                          class="text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50"
                          title="Download PDF"
                          target="_blank"
                        >
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
              <h3 class="mt-2 text-sm font-medium text-gray-900">Belum ada data sales orders</h3>
              <p class="mt-1 text-sm text-gray-500">Mulai dengan menambahkan sales order pertama</p>
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
import { ref, reactive } from 'vue';
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
});

const search = debounce(() => {
  router.get(route('admin-keuangan.sales-orders.index'), {
    search: form.search,
  }, {
    preserveState: true,
    replace: true,
  });
}, 300);

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
    released: 'Dirilis',
    approved: 'Disetujui',
    rejected: 'Ditolak'
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
.divide-sage-200 > :not([hidden]) ~ :not([hidden]) {
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