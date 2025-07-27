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
              class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
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
            <h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate">
              Admin Keuangan Dashboard
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
                    <p class="text-xs text-sage-500">Admin Keuangan</p>
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h2 class="text-lg font-bold text-sage-700">Admin Keuangan</h2>
            <p class="text-xs text-sage-500">Financial Management</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="p-4 space-y-2 flex-1 overflow-y-auto">
        <!-- Dashboard -->
        <Link
          :href="route('admin-keuangan.dashboard')"
          class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 group"
          :class="{
            'bg-sage-100 text-sage-800': route().current(
              'admin-keuangan.dashboard'
            ),
          }"
        >
          <svg
            class="w-5 h-5 group-hover:scale-110 transition-transform"
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
        </Link>

        <!-- Finance Management -->
      </nav>

      <!-- User Profile Section -->
      <div class="p-4 border-t border-sage-200 bg-sage-50">
        <div
          class="flex items-center space-x-3 p-3 rounded-lg hover:bg-sage-100 transition-colors cursor-pointer"
        >
          <div
            class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center"
          >
            <span class="text-white font-semibold text-sm">
              {{ getInitials($page.props.auth.user?.name) }}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-sage-700 truncate">
              {{ $page.props.auth.user?.name }}
            </p>
            <p class="text-xs text-sage-500 truncate">
              {{ $page.props.auth.user?.email }}
            </p>
          </div>
        </div>
      </div>
    </aside>

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
                <p class="text-2xl font-semibold text-gray-900">Rp 125.4M</p>
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
                <p class="text-2xl font-semibold text-gray-900">Rp 8.2M</p>
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
                <p class="text-2xl font-semibold text-gray-900">Rp 18.5M</p>
              </div>
            </div>
          </div>

          <!-- Profit Margin -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <div class="flex items-center">
              <div class="p-3 rounded-lg bg-purple-100">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Profit Margin</p>
                <p class="text-2xl font-semibold text-gray-900">24.8%</p>
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
                <tr class="border-b border-gray-100">
                  <td class="py-3 px-4 text-sage-600 font-medium">#FIN-001</td>
                  <td class="py-3 px-4">PT. Tech Solutions</td>
                  <td class="py-3 px-4 font-semibold">Rp 2.500.000</td>
                  <td class="py-3 px-4">Payment</td>
                  <td class="py-3 px-4">
                    <span
                      class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                      >Completed</span
                    >
                  </td>
                  <td class="py-3 px-4 text-gray-500">2025-07-28</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="py-3 px-4 text-sage-600 font-medium">#FIN-002</td>
                  <td class="py-3 px-4">CV. Mandiri Jaya</td>
                  <td class="py-3 px-4 font-semibold">Rp 1.200.000</td>
                  <td class="py-3 px-4">Invoice</td>
                  <td class="py-3 px-4">
                    <span
                      class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
                      >Pending</span
                    >
                  </td>
                  <td class="py-3 px-4 text-gray-500">2025-07-27</td>
                </tr>
                <tr class="border-b border-gray-100">
                  <td class="py-3 px-4 text-sage-600 font-medium">#FIN-003</td>
                  <td class="py-3 px-4">UD. Berkah Usaha</td>
                  <td class="py-3 px-4 font-semibold">Rp 800.000</td>
                  <td class="py-3 px-4">Payment</td>
                  <td class="py-3 px-4">
                    <span
                      class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                      >Completed</span
                    >
                  </td>
                  <td class="py-3 px-4 text-gray-500">2025-07-27</td>
                </tr>
                <tr>
                  <td class="py-3 px-4 text-sage-600 font-medium">#FIN-004</td>
                  <td class="py-3 px-4">PT. Digital Kreatif</td>
                  <td class="py-3 px-4 font-semibold">Rp 3.200.000</td>
                  <td class="py-3 px-4">Refund</td>
                  <td class="py-3 px-4">
                    <span
                      class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full"
                      >Processing</span
                    >
                  </td>
                  <td class="py-3 px-4 text-gray-500">2025-07-26</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"></div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Link } from "@inertiajs/vue3";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";

// Props
const getInitials = (name) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
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
