<template>
  <div class="min-h-screen bg-sage-50">
    <!-- Top Navigation Bar -->
    <nav
      class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50"
    >
      <div class="px-4 sm:px-6 lg:ml-64 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Mobile menu button -->
          <div class="lg:hidden">
            <button
              @click="toggleMobileSidebar"
              class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <!-- Page Title -->
          <div class="flex-1 lg:flex-none">
            <h1 class="text-lg sm:text-xl font-semibold text-sage-800">
              Dashboard
            </h1>
          </div>

          <!-- User Profile Dropdown -->
          <div class="flex items-center space-x-2 sm:space-x-4">
            <Dropdown align="right" width="48">
              <template #trigger>
                <button
                  class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors"
                >
                  <div
                    class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center"
                  >
                    <span class="text-white font-semibold text-xs sm:text-sm">
                      {{ getInitials($page.props.auth.user?.name) }}
                    </span>
                  </div>
                  <div class="hidden sm:block text-left">
                    <p class="text-sm font-medium text-sage-700">
                      {{ $page.props.auth.user?.name }}
                    </p>
                    <p class="text-xs text-sage-500">Admin CS</p>
                  </div>
                  <svg
                    class="w-4 h-4 text-sage-600 hidden sm:block"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </template>

              <template #content>
                <div class="py-1">
                  <DropdownLink
                    :href="route('profile.edit')"
                    class="flex items-center space-x-2 px-4 py-2"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Profile</span>
                  </DropdownLink>

                  <div class="border-t border-gray-100 my-1"></div>

                  <DropdownLink
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Log Out</span>
                  </DropdownLink>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>

    <!-- Mobile Sidebar Overlay -->
    <div
      v-if="isMobileSidebarOpen"
      @click="closeMobileSidebar"
      class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
    ></div>

    <!-- Sidebar -->
    <SidebarNavigation
      :is-mobile-sidebar-open="isMobileSidebarOpen"
      @close-mobile-sidebar="closeMobileSidebar"
    />

    <!-- Main Content Area -->
    <main class="lg:ml-64 pt-16 min-h-screen">
      <div class="p-4 sm:p-6 lg:p-8">
        <!-- Welcome Section -->
        <div
          class="bg-gradient-to-r from-sage-600 to-sage-700 rounded-xl shadow-lg p-6 mb-8 text-white"
        >
          <h2 class="text-2xl font-bold mb-2">
            Welcome back, {{ $page.props.auth.user?.name }}!
          </h2>
          <p class="text-sage-100">
            Manage customer service operations and support tickets efficiently.
          </p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Total Sales Orders This Month -->
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Sales Orders This Month</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.totalSalesOrdersThisMonth }}</p>
              </div>
            </div>
          </div>

          <!-- Sales Orders Today -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-green-100">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Orders Today</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.salesOrdersToday }}</p>
              </div>
            </div>
          </div>

          <!-- Pending Approvals -->
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
                <p class="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p class="text-2xl font-semibold text-gray-900">{{ stats.pendingSalesOrders }}</p>
              </div>
            </div>
          </div>

          <!-- Revenue This Month -->
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
                <p class="text-sm font-medium text-gray-600">Revenue This Month</p>
                <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(stats.revenueThisMonth) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Sales Orders -->
        <div
          class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-sage-200"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-sage-800">
              Recent Sales Orders
            </h3>
            <a
              :href="route('admin-cs.sales-orders.index')"
              class="text-sm font-medium text-sage-600 hover:text-sage-800 transition-colors"
            >
              View All →
            </a>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-sage-200">
                  <th class="text-left py-3 px-4 font-semibold text-sage-800">
                    Order Number
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sage-800">
                    Customer
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sage-800">
                    Total Selling
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sage-800">
                    Status
                  </th>
                  <th class="text-left py-3 px-4 font-semibold text-sage-800">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="order in recentSalesOrders" 
                  :key="order.id" 
                  class="border-b border-gray-100 hover:bg-sage-50 transition-colors"
                >
                  <td class="py-3 px-4 text-sage-600 font-medium">
                    <a 
                      :href="route('admin-cs.sales-orders.show', order.id)"
                      class="hover:text-sage-800 transition-colors"
                    >
                      {{ order.order_number || `SO-${order.id}` }}
                    </a>
                  </td>
                  <td class="py-3 px-4">{{ order.customer }}</td>
                  <td class="py-3 px-4 font-medium">
                    {{ order.total_selling ? formatCurrency(order.total_selling) : '-' }}
                  </td>
                  <td class="py-3 px-4">
                    <span
                      :class="getStatusClass(order)"
                      class="px-2 py-1 text-xs font-medium rounded-full"
                    >
                      {{ getStatusLabel(order) }}
                    </span>
                  </td>
                  <td class="py-3 px-4 text-sm text-gray-600">
                    {{ formatDate(order.created_at) }}
                  </td>
                </tr>
                <tr v-if="recentSalesOrders.length === 0">
                  <td colspan="5" class="py-8 px-4 text-center text-gray-500">
                    No sales orders found
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Create Sales Order -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <div class="flex items-center mb-4">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-sage-800 ml-3">
                Create New Sales Order
              </h4>
            </div>
            <p class="text-sm text-gray-600 mb-4">
              Create a new sales order for customers
            </p>
            <a
              :href="route('admin-cs.sales-orders.create')"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Create Order
            </a>
          </div>

          <!-- View All Orders -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <div class="flex items-center mb-4">
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
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-sage-800 ml-3">
                Manage Sales Orders
              </h4>
            </div>
            <p class="text-sm text-gray-600 mb-4">
              View and manage all sales orders
            </p>
            <a
              :href="route('admin-cs.sales-orders.index')"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            >
              View Orders
            </a>
          </div>

          <!-- Status Overview -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <div class="flex items-center mb-4">
              <div class="p-3 rounded-lg bg-green-100">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-sage-800 ml-3">
                Status Overview
              </h4>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Pending:</span>
                <span class="text-sm font-medium text-yellow-600">{{ statusStats.pending }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Approved:</span>
                <span class="text-sm font-medium text-green-600">{{ statusStats.approved }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Rejected:</span>
                <span class="text-sm font-medium text-red-600">{{ statusStats.rejected }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import SidebarNavigation from "@/Pages/Admin/AdminCS/Components/SidebarNavigation.vue";

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

// Reactive state
const isMobileSidebarOpen = ref(false);

// Methods
const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false;
};

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

const getStatusClass = (order) => {
  if (order.rejected_at) return 'bg-red-100 text-red-800';
  if (order.approved_at) return 'bg-green-100 text-green-800';
  return 'bg-yellow-100 text-yellow-800';
};

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

// Auto-close mobile sidebar on screen resize
const handleResize = () => {
  if (window.innerWidth >= 1024) {
    isMobileSidebarOpen.value = false;
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-100 {
  color: #f4f6f3;
}
.text-sage-500 {
  color: #8db580;
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
.bg-sage-50 {
  background-color: #f4f6f3;
}
.bg-sage-100 {
  background-color: #e8ece5;
}
.bg-sage-200 {
  background-color: #d4ddd0;
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
.hover\:bg-sage-50:hover {
  background-color: #f4f6f3;
}
.hover\:bg-sage-100:hover {
  background-color: #e8ece5;
}
.from-sage-600 {
  --tw-gradient-from: #8db580;
}
.to-sage-700 {
  --tw-gradient-to: #7ba169;
}

/* Custom scrollbar for sidebar */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: #f1f5f9;
}

aside::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
