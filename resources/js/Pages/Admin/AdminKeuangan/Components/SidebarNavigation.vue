<!-- AdminKeuangan Sidebar Navigation Component -->
<template>
  <!-- Mobile Sidebar Overlay -->
  <div
    v-if="isMobileSidebarOpen"
    @click="closeMobileSidebar"
    class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
  ></div>

  <!-- Sidebar -->
  <aside
    class="fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"
    :class="{
      'translate-x-0': isMobileSidebarOpen,
      '-translate-x-full': !isMobileSidebarOpen,
    }"
  >
    <!-- Sidebar Header -->
    <div class="px-6 py-6 border-b border-sage-200">
      <div class="flex items-center space-x-3">
        <div
          class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center"
        >
          <svg
            class="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div>
          <h2 class="text-lg font-bold text-sage-700">Admin Keuangan</h2>
          <p class="text-xs text-sage-500">Finance Admin</p>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="p-4 space-y-2 flex-1 overflow-y-auto">
      <!-- Dashboard -->
      <a
        href="/admin-keuangan/dashboard"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
        :class="
          isActive('admin-keuangan.dashboard')
            ? 'bg-sage-100 text-sage-800 shadow-sm'
            : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
        "
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span class="font-medium">Dashboard</span>
      </a>

      <!-- Customers -->
      <a
        href="/admin-keuangan/customers"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
        :class="
          isActive('admin-keuangan.customers')
            ? 'bg-sage-100 text-sage-800 shadow-sm'
            : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
        "
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span class="font-medium">Customers</span>
      </a>

      <!-- Vendors -->
      <a
        href="/admin-keuangan/vendors"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
        :class="
          isActive('admin-keuangan.vendors')
            ? 'bg-sage-100 text-sage-800 shadow-sm'
            : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
        "
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
        <span class="font-medium">Vendors</span>
      </a>

      <!-- Sales Orders -->
      <a
        href="/admin-keuangan/sales-orders"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
        :class="
          isActive('admin-keuangan.sales-orders')
            ? 'bg-sage-100 text-sage-800 shadow-sm'
            : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
        "
      >
        <svg
          class="w-5 h-5"
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
        <span class="font-medium">Sales Orders</span>
      </a>

      <!-- Invoices -->
      <a
        href="/admin-keuangan/invoices"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
        :class="
          isActive('admin-keuangan.invoices')
            ? 'bg-sage-100 text-sage-800 shadow-sm'
            : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
        "
      >
        <svg
          class="w-5 h-5"
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
        <span class="font-medium">Invoices</span>
      </a>

      <!-- Payment Monitoring -->
      <a
        href="/admin-keuangan/invoices/payment-history"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
        :class="
          isActive('admin-keuangan.payment-history')
            ? 'bg-sage-100 text-sage-800 shadow-sm'
            : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
        "
      >
        <svg
          class="w-5 h-5"
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
        <span class="font-medium">Payment Monitoring</span>
      </a>

      <!-- Financial Reports -->
      <a
        href="#"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-sage-700 hover:bg-sage-50 hover:text-sage-800"
      >
        <svg
          class="w-5 h-5"
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
        <span class="font-medium">Financial Reports</span>
      </a>

      <!-- Budget Management -->
      <a
        href="#"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-sage-700 hover:bg-sage-50 hover:text-sage-800"
      >
        <svg
          class="w-5 h-5"
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
        <span class="font-medium">Budget Management</span>
      </a>

      <!-- Quick Actions -->
      <div class="pt-4 mt-6 border-t border-sage-200">
        <div
          class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2"
        >
          Quick Actions
        </div>
        <a
          href="/admin-keuangan/sales-orders"
          class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 5a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM9 17a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
            />
          </svg>
          <span class="font-medium">Pending Reviews</span>
        </a>
        <a
          href="#"
          class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span class="font-medium">Generate Report</span>
        </a>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { usePage } from "@inertiajs/vue3";

// Props
const props = defineProps({
  isMobileSidebarOpen: {
    type: Boolean,
    default: false,
  },
});

// Emits
const emit = defineEmits(["closeMobileSidebar"]);

// Get current route
const page = usePage();

// Use global route function if available
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.dashboard': '/admin-keuangan/dashboard',
    'admin-keuangan.customers.index': '/admin-keuangan/customers',
    'admin-keuangan.vendors.index': '/admin-keuangan/vendors',
    'admin-keuangan.sales-orders.index': '/admin-keuangan/sales-orders',
  };
  return routes[name] || '#';
};

// Methods
const closeMobileSidebar = () => {
  emit("closeMobileSidebar");
};

const isActive = (routePattern) => {
  const currentUrl = window.location.pathname;
  
  // Handle wildcard patterns
  if (routePattern.includes("*")) {
    const basePattern = routePattern.replace("*", "");
    const routeMap = {
      'admin-keuangan.dashboard': '/admin-keuangan/dashboard',
      'admin-keuangan.customers': '/admin-keuangan/customers',
      'admin-keuangan.vendors': '/admin-keuangan/vendors',
      'admin-keuangan.sales-orders': '/admin-keuangan/sales-orders',
    };
    
    const basePath = routeMap[basePattern] || basePattern;
    return currentUrl.startsWith(basePath);
  }

  // Direct route matching  
  const routeMap = {
    'admin-keuangan.dashboard': '/admin-keuangan/dashboard',
    'admin-keuangan.customers': '/admin-keuangan/customers',
    'admin-keuangan.vendors': '/admin-keuangan/vendors',
    'admin-keuangan.sales-orders': '/admin-keuangan/sales-orders',
    'admin-keuangan.invoices': '/admin-keuangan/invoices',
    'admin-keuangan.payment-history': '/admin-keuangan/invoices/payment-history',
  };
  
  const routePath = routeMap[routePattern];
  if (routePath) {
    // Check if current URL starts with the route path (for sub-pages like create, edit)
    return currentUrl.startsWith(routePath);
  }
  
  return currentUrl === routePattern;
};
</script>

<style scoped>
/* Custom Sage Colors - consistent with Master Admin */
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
.border-sage-600 {
  border-color: #8db580;
}

.hover\:bg-sage-50:hover {
  background-color: #f4f6f3;
}
.hover\:text-sage-800:hover {
  color: #6b8f5e;
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