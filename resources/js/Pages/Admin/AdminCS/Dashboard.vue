<template>
  <AdminCSLayout>
    <Head title="Dashboard CS" />

    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Dashboard Customer Service</h1>
            <p class="mt-1 text-sm text-gray-600">Kelola operasi customer service dan shipping orders secara efisien</p>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <!-- Total Sales Orders This Month -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <FileText class="h-6 w-6 text-blue-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Sales Orders This Month</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.totalSalesOrdersThisMonth }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Sales Orders Today -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <Clock class="h-6 w-6 text-green-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Orders Today</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.salesOrdersToday }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Pending Approvals -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <AlertTriangle class="h-6 w-6 text-yellow-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Pending Approvals</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats.pendingSalesOrders }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Recent Sales Orders -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Recent Sales Orders</h3>
              <a
                :href="route('admin-cs.sales-orders.index')"
                class="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View All &rarr;
              </a>
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
                      Status
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="order in recentSalesOrders"
                    :key="order.id"
                    class="hover:bg-gray-50"
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <a
                        :href="route('admin-cs.sales-orders.show', order.id)"
                        class="text-blue-600 hover:text-blue-800"
                      >
                        {{ order.order_number || `SO-${order.id}` }}
                      </a>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ order.customer }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="getStatusBadge(order)"
                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      >
                        {{ getStatusLabel(order) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(order.created_at) }}
                    </td>
                  </tr>
                  <tr v-if="recentSalesOrders.length === 0">
                    <td colspan="4" class="px-6 py-12 text-center">
                      <FileText class="mx-auto h-12 w-12 text-gray-400" />
                      <h3 class="mt-2 text-sm font-medium text-gray-900">No sales orders</h3>
                      <p class="mt-1 text-sm text-gray-500">Belum ada sales orders terbaru</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Quick Actions and Status Overview -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Quick Actions -->
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div class="space-y-3">
                <a
                  :href="route('admin-cs.sales-orders.create')"
                  class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                >
                  <div class="flex-shrink-0">
                    <Plus class="h-6 w-6 text-sage-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    <p class="text-sm font-medium text-gray-900">Create New Sales Order</p>
                    <p class="text-sm text-gray-500 truncate">Create a new sales order for customers</p>
                  </div>
                </a>

                <a
                  :href="route('admin-cs.sales-orders.index')"
                  class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                >
                  <div class="flex-shrink-0">
                    <FileText class="h-6 w-6 text-blue-600" />
                  </div>
                  <div class="flex-1 min-w-0">
                    <span class="absolute inset-0" aria-hidden="true"></span>
                    <p class="text-sm font-medium text-gray-900">Manage Sales Orders</p>
                    <p class="text-sm text-gray-500 truncate">View and manage all sales orders</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <!-- Status Overview -->
          <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 sm:p-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Status Overview</h3>
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    </div>
                    <span class="ml-3 text-sm font-medium text-gray-900">Pending:</span>
                  </div>
                  <span class="text-sm font-semibold text-yellow-600">{{ statusStats.pending }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                    <span class="ml-3 text-sm font-medium text-gray-900">Approved:</span>
                  </div>
                  <span class="text-sm font-semibold text-green-600">{{ statusStats.approved }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <div class="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                    <span class="ml-3 text-sm font-medium text-gray-900">Rejected:</span>
                  </div>
                  <span class="text-sm font-semibold text-red-600">{{ statusStats.rejected }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminCSLayout>
</template>

<script setup>
import { onMounted } from "vue";
import AdminCSLayout from "@/Layouts/AdminCSLayout.vue";
import { Head } from '@inertiajs/vue3';
import {
  FileText,
  Clock,
  AlertTriangle,
  Plus
} from 'lucide-vue-next';

// Props
const props = defineProps({
  user: Object,
  userRole: String,
  stats: {
    type: Object,
    required: true,
  },
  recentSalesOrders: {
    type: Array,
    required: true,
  },
  statusStats: {
    type: Object,
    required: true,
  },
});

// Route helper function
const route = window.route || function(name, params) {
  const routes = {
    'admin-cs.sales-orders.index': '/admin-cs/sales-orders',
    'admin-cs.sales-orders.create': '/admin-cs/sales-orders/create',
    'admin-cs.sales-orders.show': '/admin-cs/sales-orders',
  };
  let url = routes[name] || '#';
  if (params) {
    url += `/${params}`;
  }
  return url;
};

// Methods
const formatCurrency = (amount) => {
  if (!amount) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusLabel = (order) => {
  if (order.rejected_at) return 'Rejected';
  if (order.approved_at) return 'Approved';
  return 'Pending';
};

const getStatusBadge = (order) => {
  if (order.rejected_at) return 'bg-red-100 text-red-800';
  if (order.approved_at) return 'bg-green-100 text-green-800';
  return 'bg-yellow-100 text-yellow-800';
};

// Lifecycle hooks
onMounted(() => {
  console.log("AdminCS Dashboard props:", props);
});
</script>

<style scoped>
.text-sage-600 {
  color: #8db580;
}
.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}
</style>
