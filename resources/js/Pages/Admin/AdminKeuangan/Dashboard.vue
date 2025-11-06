<template>
  <AdminKeuanganLayout>
    <Head title="Dashboard Finance" />

    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Dashboard Finance</h1>
            <p class="mt-1 text-sm text-gray-600">Kelola operasi keuangan, penagihan, dan pembayaran secara efisien</p>
          </div>
        </div>

        <!-- Profit Analytics Section -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <DollarSign class="h-6 w-6 text-green-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Gross Revenue</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats?.grossRevenue || 0) }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <TrendingDown class="h-6 w-6 text-red-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Operational Costs</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats?.operationalCosts || 0) }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <TrendingUp class="h-6 w-6 text-blue-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Net Profit</dt>
                    <dd :class="stats?.netProfit >= 0 ? 'text-lg font-medium text-green-600' : 'text-lg font-medium text-red-600'">{{ formatCurrency(stats?.netProfit || 0) }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <Calculator class="h-6 w-6 text-purple-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Profit Margin</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats?.profitMargin || 0 }}%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Profit Trends -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" v-if="monthlyProfits && monthlyProfits.length > 0">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Tren Profit 6 Bulan Terakhir</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Revenue</th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Operational Costs</th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net Profit</th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Profit Margin</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="month in monthlyProfits" :key="month.month" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ month.month }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-green-600">
                      {{ formatCurrency(month.gross_revenue) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-red-600">
                      {{ formatCurrency(month.operational_costs) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-gray-900">
                      {{ formatCurrency(month.net_profit) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right">
                      <span :class="getStatusBadge(month.profit_margin)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                        {{ month.profit_margin.toFixed(1) }}%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Additional Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <Receipt class="h-6 w-6 text-gray-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats?.totalRevenue || 0) }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <AlertTriangle class="h-6 w-6 text-yellow-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Outstanding Bills</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats?.pendingPayments || 0) }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <CheckCircle class="h-6 w-6 text-green-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Paid This Month</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats?.paidThisMonth || 0) }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <Clock class="h-6 w-6 text-red-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Overdue Invoices</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats?.overdueInvoices || 0 }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Financial Transactions</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="transaction in recentTransactions" :key="transaction.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ transaction.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.customer }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ formatCurrency(transaction.amount) }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ transaction.type }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="getStatusBadge(transaction.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                        {{ transaction.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ transaction.date }}</td>
                  </tr>
                </tbody>
              </table>

              <div v-if="recentTransactions.length === 0" class="text-center py-12">
                <FileText class="mx-auto h-12 w-12 text-gray-400" />
                <h3 class="mt-2 text-sm font-medium text-gray-900">Belum ada transaksi</h3>
                <p class="mt-1 text-sm text-gray-500">Belum ada transaksi keuangan terbaru</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a href="/admin-keuangan/invoices/create" class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                <div class="flex-shrink-0">
                  <Plus class="h-6 w-6 text-sage-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="text-sm font-medium text-gray-900">New Invoice</p>
                  <p class="text-sm text-gray-500 truncate">Create billing invoice</p>
                </div>
              </a>

              <div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 cursor-pointer">
                <div class="flex-shrink-0">
                  <BarChart3 class="h-6 w-6 text-purple-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900">Financial Report</p>
                  <p class="text-sm text-gray-500 truncate">Generate reports</p>
                </div>
              </div>

              <a href="/admin-keuangan/invoices?status=overdue" class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                <div class="flex-shrink-0">
                  <AlertCircle class="h-6 w-6 text-orange-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="text-sm font-medium text-gray-900">Pending Bills</p>
                  <p class="text-sm text-gray-500 truncate">Review overdue</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";
import { Head } from '@inertiajs/vue3';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calculator,
  Receipt,
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  BarChart3,
  AlertCircle,
  FileText
} from 'lucide-vue-next';

// Props
const props = defineProps({
  user: Object,
  userRole: String,
  stats: Object,
  monthlyProfits: Array,
  recentTransactions: Array,
});

// Computed properties
const authUser = computed(() => props.user);
const recentTransactions = computed(() => props.recentTransactions || []);

// Methods
const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const getStatusClass = (status) => {
  const classes = {
    Completed: "bg-green-100 text-green-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusBadge = (value) => {
  if (typeof value === 'number') {
    // For profit margins
    if (value >= 20) return 'bg-green-100 text-green-800';
    if (value >= 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  }

  // For transaction status
  const badges = {
    'Completed': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Processing': 'bg-red-100 text-red-800'
  };
  return badges[value] || 'bg-gray-100 text-gray-800';
};

// Lifecycle hooks
onMounted(() => {
  console.log("AdminKeuangan Dashboard props:", props);
});
</script>

<style scoped>
/* Custom Sage Colors untuk focus ring */
.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}
</style>
