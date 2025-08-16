<!-- AdminCS Sidebar Navigation Component -->
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <div>
          <h2 class="text-lg font-bold text-sage-700">Admin CS</h2>
          <p class="text-xs text-sage-500">Customer Service</p>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="p-4 space-y-2 flex-1 overflow-y-auto">
      <!-- Dashboard -->
      <a
        :href="route('admin-cs.dashboard')"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
        :class="
          isActive('admin-cs.dashboard')
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

      <!-- Customer Management -->
      <a
        :href="route('admin-cs.customers.index')"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
        :class="
          isActive('admin-cs.customers.*')
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
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
          />
        </svg>
        <span class="font-medium">Customer Management</span>
      </a>

      <!-- Sales Orders -->
      <a
        :href="route('admin-cs.sales-orders.index')"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
        :class="
          isActive('admin-cs.sales-orders.*')
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

      <!-- Quick Actions -->
      <div class="pt-4 mt-6 border-t border-sage-200">
        <div
          class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2"
        >
          Quick Actions
        </div>
        <a
          :href="route('admin-cs.customers.create')"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span class="font-medium">Add Customer</span>
        </a>
        <a
          :href="route('admin-cs.sales-orders.create')"
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
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span class="font-medium">New Sales Order</span>
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

// Methods
const closeMobileSidebar = () => {
  emit("closeMobileSidebar");
};

const isActive = (routePattern) => {
  const currentRoute = page.props.ziggy?.route;
  if (!currentRoute) return false;

  // Handle wildcard patterns
  if (routePattern.includes("*")) {
    const basePattern = routePattern.replace("*", "");
    return currentRoute.startsWith(basePattern);
  }

  return currentRoute === routePattern;
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