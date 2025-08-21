<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-blue-800">Sales Orders dari CS</h2>
              <p class="text-blue-600">Kelola sales order yang sudah dirilis oleh CS</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Search Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="form.search"
              @input="search"
              type="text"
              placeholder="Cari berdasarkan nomor order, customer, atau invoice..."
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-blue-200 bg-blue-50">
          <h3 class="text-lg font-semibold text-blue-800">Daftar Sales Orders</h3>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Number
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dirilis Oleh
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Rilis
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vouchers
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
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
                <td class="px-6 py-4 whitespace-nowrap text-center space-x-2">
                  <Link
                    :href="route('admin-keuangan.sales-orders.show', salesOrder.id)"
                    class="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                  >
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Detail
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="salesOrders.data.length === 0" class="text-center py-12">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-gray-500">Belum ada sales order yang dirilis dari CS</p>
        </div>

        <!-- Pagination -->
        <div v-if="salesOrders.data.length > 0" class="px-6 py-4 border-t border-gray-200">
          <Pagination :data="salesOrders" />
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
.text-blue-600 {
  color: #2563eb;
}
.text-blue-700 {
  color: #1d4ed8;
}
.text-blue-800 {
  color: #1e40af;
}
.bg-blue-50 {
  background-color: #eff6ff;
}
.bg-blue-600 {
  background-color: #2563eb;
}
.bg-blue-700 {
  background-color: #1d4ed8;
}
.border-blue-200 {
  border-color: #bfdbfe;
}
.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}
</style>