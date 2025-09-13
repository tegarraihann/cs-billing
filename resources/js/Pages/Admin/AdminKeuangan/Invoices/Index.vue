<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">Invoice Management</h2>
              <p class="text-sage-600">Kelola invoice untuk sales order yang telah disetujui</p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0 flex gap-3">
            <Link
              :href="route('admin-keuangan.invoices.payment-history')"
              class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75" />
              </svg>
              Payment History
            </Link>
            <Link
              :href="route('admin-keuangan.invoices.create')"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Buat Invoice
            </Link>
          </div>
        </div>
      </div>

      <!-- Statistics Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-600">Total Invoice</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats?.total_invoices || 0 }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-full">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-600">Invoice Lunas</p>
              <p class="text-2xl font-bold text-green-600">{{ stats?.paid_invoices || 0 }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-full">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-600">Invoice Overdue</p>
              <p class="text-2xl font-bold text-red-600">{{ stats?.overdue_invoices || 0 }}</p>
            </div>
            <div class="p-3 bg-red-100 rounded-full">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-600">Outstanding Amount</p>
              <p class="text-2xl font-bold text-amber-600">{{ formatCurrency(stats?.outstanding_amount || 0) }}</p>
            </div>
            <div class="p-3 bg-amber-100 rounded-full">
              <svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Search & Filter Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="flex-1">
            <input
              v-model="form.search"
              @input="search"
              type="text"
              placeholder="Cari berdasarkan nomor invoice, customer, atau sales order..."
              class="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            />
          </div>
          <div class="w-48">
            <select
              v-model="form.status"
              @change="search"
              class="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            >
              <option value="">Semua Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Terkirim</option>
              <option value="paid">Dibayar</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>
          <div class="w-48">
            <input
              v-model="form.date_from"
              @change="search"
              type="date"
              placeholder="Dari Tanggal"
              class="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            />
          </div>
          <div class="w-48">
            <input
              v-model="form.date_to"
              @change="search"
              type="date"
              placeholder="Sampai Tanggal"
              class="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            />
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
          <h3 class="text-lg font-semibold text-sage-800">Daftar Invoice</h3>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-sage-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Invoice Number
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Sales Order
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Invoice Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Total
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Payment Status
                </th>
                <th class="px-6 py-3 text-center text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-sage-200">
              <tr v-for="invoice in invoices.data" :key="invoice.id" class="hover:bg-sage-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ invoice.invoice_number }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ invoice.customer?.consignee_shipper || invoice.customer?.company_name || invoice.sales_order?.customer || invoice.sales_order?.customer_name || '-' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ invoice.sales_order?.order_number || '-' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(invoice.invoice_date) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(invoice.due_date) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ formatCurrency(invoice.total) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusColor(invoice.status)"
                  >
                    {{ getStatusLabel(invoice.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getPaymentStatusColor(invoice)"
                  >
                    {{ getPaymentStatusLabel(invoice) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center space-x-2">
                  <div class="flex items-center justify-center space-x-2">
                    <Link
                      :href="route('admin-keuangan.invoices.show', invoice.id)"
                      class="inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors"
                      title="Lihat Detail"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                    <Link
                      :href="route('admin-keuangan.invoices.edit', invoice.id)"
                      class="inline-flex items-center justify-center w-8 h-8 text-amber-600 hover:text-amber-900 hover:bg-amber-100 rounded-full transition-colors"
                      title="Edit"
                      v-if="invoice.status === 'draft'"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <a
                      :href="route('admin-keuangan.invoices.export-pdf', invoice.id)"
                      class="inline-flex items-center justify-center w-8 h-8 text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-full transition-colors"
                      title="Export to PDF"
                      target="_blank"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                      </svg>
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="invoices.data.length === 0" class="text-center py-12">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p class="text-gray-500">Belum ada invoice yang dibuat</p>
        </div>

        <!-- Pagination -->
        <div v-if="invoices.data.length > 0" class="px-6 py-4 border-t border-sage-200">
          <Pagination :data="invoices" />
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { Link } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';
import Pagination from '@/Components/Pagination.vue';

import { reactive } from 'vue';
import { router } from '@inertiajs/vue3';
import { debounce } from 'lodash';

const props = defineProps({
  invoices: Object,
  filters: Object,
  stats: Object,
});

const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.invoices.index': '/admin-keuangan/invoices',
    'admin-keuangan.invoices.create': '/admin-keuangan/invoices/create',
    'admin-keuangan.invoices.show': (id) => `/admin-keuangan/invoices/${id}`,
    'admin-keuangan.invoices.edit': (id) => `/admin-keuangan/invoices/${id}/edit`,
    'admin-keuangan.invoices.pdf': (id) => `/admin-keuangan/invoices/${id}/pdf`,
    'admin-keuangan.invoices.payment-history': '/admin-keuangan/invoices/payment-history',
  };
  return typeof routes[name] === 'function' ? routes[name](params) : routes[name] || '#';
};

const form = reactive({
  search: props.filters.search || '',
  status: props.filters.status || '',
  date_from: props.filters.date_from || '',
  date_to: props.filters.date_to || '',
});

const search = debounce(() => {
  router.get(route('admin-keuangan.invoices.index'), {
    search: form.search,
    status: form.status,
    date_from: form.date_from,
    date_to: form.date_to,
  }, {
    preserveState: true,
    replace: true,
  });
}, 300);

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID');
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
    draft: 'Draft',
    sent: 'Terkirim',
    paid: 'Dibayar',
    overdue: 'Overdue',
    cancelled: 'Dibatalkan'
  };
  return labels[status] || status;
};

const getStatusColor = (status) => {
  const colors = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const getPaymentStatusLabel = (invoice) => {
  if (invoice.status === 'paid') {
    return 'Lunas';
  }
  
  const dueDate = new Date(invoice.due_date);
  const today = new Date();
  
  if (invoice.status !== 'paid' && dueDate < today) {
    return 'Overdue';
  }
  
  return 'Belum Dibayar';
};

const getPaymentStatusColor = (invoice) => {
  const status = getPaymentStatusLabel(invoice);
  const colors = {
    'Lunas': 'bg-green-100 text-green-800',
    'Overdue': 'bg-red-100 text-red-800',
    'Belum Dibayar': 'bg-yellow-100 text-yellow-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
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