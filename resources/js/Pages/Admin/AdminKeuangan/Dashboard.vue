<template>
  <AdminKeuanganLayout>
      <div class="p-4 sm:p-6 lg:p-8">
        <!-- Welcome Section -->
        <div
          class="bg-gradient-to-r from-sage-600 to-sage-700 rounded-xl shadow-lg p-6 mb-8 text-white"
        >
          <h2 class="text-2xl font-bold mb-2">
            Welcome back, {{ authUser?.name }}!
          </h2>
          <p class="text-sage-100">
            Manage financial operations, billing, and payments efficiently.
          </p>
        </div>

        <!-- Profit Analytics Section -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-sage-200">
          <h3 class="text-xl font-bold text-sage-800 mb-6 flex items-center">
            <svg class="w-6 h-6 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analisis Profit
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Gross Revenue -->
            <div class="bg-green-50 rounded-lg p-4 border border-green-200">
              <div class="flex items-center">
                <div class="p-3 rounded-lg bg-green-100">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-3-6h6" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-green-700">Gross Revenue</p>
                  <p class="text-2xl font-semibold text-green-800">
                    {{ formatCurrency(stats?.grossRevenue || 0) }}
                  </p>
                  <p class="text-xs text-green-600">Total yang dapat ditagih</p>
                </div>
              </div>
            </div>

            <!-- Operational Costs -->
            <div class="bg-red-50 rounded-lg p-4 border border-red-200">
              <div class="flex items-center">
                <div class="p-3 rounded-lg bg-red-100">
                  <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-red-700">Operational Costs</p>
                  <p class="text-2xl font-semibold text-red-800">
                    {{ formatCurrency(stats?.operationalCosts || 0) }}
                  </p>
                  <p class="text-xs text-red-600">Biaya operasional internal</p>
                </div>
              </div>
            </div>

            <!-- Net Profit -->
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div class="flex items-center">
                <div class="p-3 rounded-lg bg-blue-100">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-blue-700">Net Profit</p>
                  <p class="text-2xl font-semibold text-blue-800">
                    {{ formatCurrency(stats?.netProfit || 0) }}
                  </p>
                  <p class="text-xs text-blue-600">Keuntungan bersih</p>
                </div>
              </div>
            </div>

            <!-- Profit Margin -->
            <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div class="flex items-center">
                <div class="p-3 rounded-lg bg-purple-100">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-purple-700">Profit Margin</p>
                  <p class="text-2xl font-semibold text-purple-800">
                    {{ stats?.profitMargin || 0 }}%
                  </p>
                  <p class="text-xs text-purple-600">Persentase keuntungan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Monthly Profit Trends -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-sage-200" v-if="monthlyProfits && monthlyProfits.length > 0">
          <h3 class="text-xl font-bold text-sage-800 mb-6 flex items-center">
            <svg class="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Tren Profit 6 Bulan Terakhir
          </h3>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-sage-200">
                  <th class="text-left py-3 px-4 font-semibold text-sage-800">Periode</th>
                  <th class="text-right py-3 px-4 font-semibold text-sage-800">Gross Revenue</th>
                  <th class="text-right py-3 px-4 font-semibold text-sage-800">Operational Costs</th>
                  <th class="text-right py-3 px-4 font-semibold text-sage-800">Net Profit</th>
                  <th class="text-right py-3 px-4 font-semibold text-sage-800">Profit Margin</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="month in monthlyProfits" :key="month.month" class="border-b border-sage-100 hover:bg-sage-50">
                  <td class="py-3 px-4 font-medium text-sage-800">{{ month.month }}</td>
                  <td class="py-3 px-4 text-right font-semibold text-green-700">
                    {{ formatCurrency(month.gross_revenue) }}
                  </td>
                  <td class="py-3 px-4 text-right font-semibold text-red-700">
                    {{ formatCurrency(month.operational_costs) }}
                  </td>
                  <td class="py-3 px-4 text-right font-semibold text-blue-700">
                    {{ formatCurrency(month.net_profit) }}
                  </td>
                  <td class="py-3 px-4 text-right">
                    <span
                      class="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium"
                      :class="getProfitMarginClass(month.profit_margin)"
                    >
                      {{ month.profit_margin.toFixed(1) }}%
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Revenue -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-sage-100">
                <svg
                  class="w-6 h-6 text-sage-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Revenue</p>
                <p class="text-2xl font-semibold text-gray-900">
                  {{ formatCurrency(stats?.totalRevenue || 0) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Outstanding Bills -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-yellow-100">
                <svg
                  class="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">
                  Outstanding Bills
                </p>
                <p class="text-2xl font-semibold text-gray-900">
                  {{ formatCurrency(stats?.pendingPayments || 0) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Paid This Month -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-blue-100">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Paid This Month</p>
                <p class="text-2xl font-semibold text-gray-900">
                  {{ formatCurrency(stats?.paidThisMonth || 0) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Overdue Invoices -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-red-100">
                <svg
                  class="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Overdue Invoices</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats?.overdueInvoices || 0 }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div
          class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-sage-200"
        >
          <h3 class="text-xl font-bold text-sage-800 mb-4">
            Recent Financial Transactions
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-sage-200">
                  <th class="text-left py-3 px-4 font-semibold text-sage-800">
                    Transaction ID
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sage-800">
                    Customer
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sage-800">
                    Amount
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sage-800">
                    Type
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sage-800">
                    Status
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sage-800">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="transaction in recentTransactions"
                  :key="transaction.id"
                  class="border-b border-gray-100"
                >
                  <td class="py-3 px-4 text-sage-600 font-medium">
                    {{ transaction.id }}
                  </td>
                  <td class="py-3 px-4">{{ transaction.customer }}</td>
                  <td class="py-3 px-4 font-semibold">
                    {{ formatCurrency(transaction.amount) }}
                  </td>
                  <td class="py-3 px-4">{{ transaction.type }}</td>
                  <td class="py-3 px-4">
                    <span
                      class="px-2 py-1 text-xs font-medium rounded-full"
                      :class="getStatusClass(transaction.status)"
                    >
                      {{ transaction.status }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-gray-500">
                    {{ transaction.date }}
                  </td>
                </tr>
              </tbody>
            </table>

            <!-- Empty State -->
            <div v-if="recentTransactions.length === 0" class="text-center py-12">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <p class="text-gray-500">Belum ada transaksi keuangan terbaru</p>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a
            href="/admin-keuangan/invoices/create"
            class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer block"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-green-100 rounded-lg">
                <svg
                  class="w-6 h-6 text-green-600"
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
              </div>
              <div>
                <h4 class="font-semibold text-sage-800">New Invoice</h4>
                <p class="text-sm text-sage-600">Create billing invoice</p>
              </div>
            </div>
          </a>

          <a
            href="/admin-keuangan/invoices/payment-history"
            class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer block"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-blue-100 rounded-lg">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-sage-800">Payment Monitoring</h4>
                <p class="text-sm text-sage-600">Monitor payment status</p>
              </div>
            </div>
          </a>

          <div
            class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-purple-100 rounded-lg">
                <svg
                  class="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-sage-800">Financial Report</h4>
                <p class="text-sm text-sage-600">Generate reports</p>
              </div>
            </div>
          </div>

          <a
            href="/admin-keuangan/invoices?status=overdue"
            class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer block"
          >
            <div class="flex items-center space-x-4">
              <div class="p-3 bg-orange-100 rounded-lg">
                <svg
                  class="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 class="font-semibold text-sage-800">Pending Bills</h4>
                <p class="text-sm text-sage-600">Review overdue</p>
              </div>
            </div>
          </a>
        </div>
      </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";

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

const getProfitMarginClass = (margin) => {
  if (margin >= 20) return "bg-green-100 text-green-800";
  if (margin >= 10) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

// Lifecycle hooks
onMounted(() => {
  console.log("AdminKeuangan Dashboard props:", props);
});
</script>

<style scoped>
/* Custom Sage Colors untuk Dashboard Content */
.text-sage-100 {
  color: #f4f6f3;
}
.bg-sage-600 {
  background-color: #8db580;
}
.bg-sage-700 {
  background-color: #7ba169;
}
.from-sage-600 {
  --tw-gradient-from: #8db580;
}
.to-sage-700 {
  --tw-gradient-to: #7ba169;
}
</style>
