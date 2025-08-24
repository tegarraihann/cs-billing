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
                  v-for="transaction in sampleTransactions"
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
});

// Computed properties
const authUser = computed(() => props.user);

// Sample data for transactions
const sampleTransactions = ref([
  {
    id: "#FIN-001",
    customer: "PT. Tech Solutions",
    amount: 2500000,
    type: "Payment",
    status: "Completed",
    date: "2025-07-28",
  },
  {
    id: "#FIN-002",
    customer: "CV. Mandiri Jaya",
    amount: 1200000,
    type: "Invoice",
    status: "Pending",
    date: "2025-07-27",
  },
  {
    id: "#FIN-003",
    customer: "UD. Berkah Usaha",
    amount: 800000,
    type: "Payment",
    status: "Completed",
    date: "2025-07-27",
  },
  {
    id: "#FIN-004",
    customer: "PT. Digital Kreatif",
    amount: 3200000,
    type: "Refund",
    status: "Processing",
    date: "2025-07-26",
  },
]);

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
