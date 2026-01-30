<template>
  <div class="min-h-screen bg-sage-50">
    <!-- Top Navigation Bar -->
    <nav
      class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50 lg:left-64"
    >
      <div class="px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Mobile menu button -->
          <div class="lg:hidden">
            <button
              @click="toggleMobileSidebar"
              class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500"
            >
              <Menu class="w-6 h-6" />
            </button>
          </div>

          <!-- Page Title -->
          <div class="flex-1 lg:flex-none lg:pl-0">
            <h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate">
              Customer Service Dashboard
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
                    <p class="text-sm font-medium">
                      {{ $page.props.auth.user?.name }}
                    </p>
                    <p class="text-xs text-sage-500">Customer Service</p>
                  </div>
                  <ChevronDown class="w-4 h-4 text-sage-600 hidden sm:block" />
                </button>
              </template>

              <template #content>
                <div class="py-1">
                  <DropdownLink
                    :href="route('profile.edit')"
                    class="flex items-center space-x-2 px-4 py-2"
                  >
                    <UserRound class="w-4 h-4" />
                    <span>Profile</span>
                  </DropdownLink>

                  <div class="border-t border-gray-100 my-1"></div>

                  <DropdownLink
                    :href="route('logout')"
                    method="post"
                    as="button"
                    class="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    <LogOut class="w-4 h-4" />
                    <span>Log Out</span>
                  </DropdownLink>
                </div>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>

    <!-- Sidebar Component -->
    <SidebarNavigation
      :is-mobile-sidebar-open="isMobileSidebarOpen"
      @close-mobile-sidebar="closeMobileSidebar"
    />

    <!-- Main Content Area -->
    <main class="lg:ml-64 pt-16 min-h-screen">
      <slot />
    </main>

    <!-- Idle logout modal -->
    <div
      v-if="showIdleModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4">
        <div class="text-lg font-semibold text-gray-900">Session will expire</div>
        <p class="text-sm text-gray-600">
          No activity for 10 minutes. You will be logged out in
          <span class="font-semibold text-red-600">{{ idleCountdown }}</span> seconds.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            class="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            @click="stayLoggedIn"
            :disabled="idleProcessing"
          >
            Continue
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
            @click="forceLogout"
            :disabled="idleProcessing"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import SidebarNavigation from "@/Pages/Admin/AdminCS/Components/SidebarNavigation.vue";
import { Menu, ChevronDown, UserRound, LogOut } from "lucide-vue-next";
import { useIdleTimeout } from "@/Composables/useIdleTimeout";

// Route function (use global route helper)
const route = window.route || function(name, params) {
  const routes = {
    'admin-cs.dashboard': '/admin-cs/dashboard',
    'admin-cs.sales-orders.index': '/admin-cs/sales-orders',
    'admin-cs.sales-orders.create': '/admin-cs/sales-orders/create',
    'admin-cs.sales-orders.show': '/admin-cs/sales-orders',
    'admin-cs.sales-orders.edit': '/admin-cs/sales-orders',
    'profile.edit': '/profile',
    'logout': '/logout'
  };
  return routes[name] || '#';
};

// Reactive state
const isMobileSidebarOpen = ref(false);
const { showIdleModal, idleCountdown, idleProcessing, stayLoggedIn, forceLogout } = useIdleTimeout({
  idleMinutes: 10,
  warningSeconds: 30,
});

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
.bg-sage-50 {
  background-color: #f4f6f3;
}
.bg-sage-100 {
  background-color: #e8f0e3;
}
.bg-sage-200 {
  background-color: #d4ddd0;
}
.bg-sage-600 {
  background-color: #8db580;
}
.border-sage-200 {
  border-color: #d4ddd0;
}
.hover\:bg-sage-100:hover {
  background-color: #e8f0e3;
}
.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
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
