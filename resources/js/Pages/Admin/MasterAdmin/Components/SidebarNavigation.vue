<!-- Sidebar Navigation Component dengan Dropdown Website Settings -->
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div>
          <h2 class="text-lg font-bold text-sage-700">Master Admin</h2>
          <p class="text-xs text-sage-500">Full System Control</p>
        </div>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="p-4 space-y-2 flex-1 overflow-y-auto">
      <!-- Dashboard -->
      <a
        :href="route('masteradmin.dashboard')"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
        :class="
          isActive('masteradmin.dashboard')
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

      <!-- User Management -->
      <a
        :href="route('masteradmin.users.index')"
        class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
        :class="
          isActive('masteradmin.users.*')
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
        <span class="font-medium">User Management</span>
      </a>

      <!-- Website Settings Dropdown -->
      <div class="space-y-1">
        <button
          @click="toggleWebsiteSettings"
          class="w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200"
          :class="
            isWebsiteSettingsActive
              ? 'bg-sage-100 text-sage-800 shadow-sm'
              : 'text-sage-700 hover:bg-sage-50 hover:text-sage-800'
          "
        >
          <div class="flex items-center space-x-3">
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span class="font-medium">Website Settings</span>
          </div>
          <svg
            class="w-4 h-4 transition-transform duration-200"
            :class="{ 'rotate-180': isWebsiteSettingsOpen }"
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

        <!-- Website Settings Submenu -->
        <div
          class="ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out"
          :class="
            isWebsiteSettingsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          "
        >
          <!-- Pengaturan Umum -->
          <a
            :href="route('masteradmin.website-settings.pengaturan-umum.index')"
            class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
            :class="
              isActive('masteradmin.website-settings.pengaturan-umum.*')
                ? 'bg-sage-100 text-sage-800 shadow-sm border-l-4 border-sage-600'
                : 'text-sage-600 hover:bg-sage-50 hover:text-sage-800 pl-4'
            "
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
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              />
            </svg>
            <span class="font-medium text-sm">Pengaturan Umum</span>
          </a>

          <!-- Services -->
          <a
            :href="route('masteradmin.website-settings.services.index')"
            class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
            :class="
              isActive('masteradmin.website-settings.services.*')
                ? 'bg-sage-100 text-sage-800 shadow-sm border-l-4 border-sage-600'
                : 'text-sage-600 hover:bg-sage-50 hover:text-sage-800 pl-4'
            "
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span class="font-medium text-sm">Services</span>
          </a>

          <!-- Support Services -->
          <a
            :href="route('masteradmin.website-settings.support-services.index')"
            class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
            :class="
              isActive('masteradmin.website-settings.support-services.*')
                ? 'bg-sage-100 text-sage-800 shadow-sm border-l-4 border-sage-600'
                : 'text-sage-600 hover:bg-sage-50 hover:text-sage-800 pl-4'
            "
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
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span class="font-medium text-sm">Support Services</span>
          </a>

          <!-- Team -->
          <a
            :href="route('masteradmin.website-settings.team.index')"
            class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
            :class="
              isActive('masteradmin.website-settings.team.*')
                ? 'bg-sage-100 text-sage-800 shadow-sm border-l-4 border-sage-600'
                : 'text-sage-600 hover:bg-sage-50 hover:text-sage-800 pl-4'
            "
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span class="font-medium text-sm">Team</span>
          </a>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="pt-4 mt-6 border-t border-sage-200">
        <div
          class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2"
        >
          Quick Actions
        </div>
        <a
          :href="route('home')"
          class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200"
          target="_blank"
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
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          <span class="font-medium">View Website</span>
        </a>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref, computed } from "vue";
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

// Reactive state
const isWebsiteSettingsOpen = ref(false);

// Get current route
const page = usePage();

// Computed
const isWebsiteSettingsActive = computed(() => {
  const currentRoute = page.props.ziggy?.route;
  if (!currentRoute) return false;
  return currentRoute.includes("website-settings");
});

// Auto-open dropdown if we're on a website settings page
const checkAndOpenDropdown = () => {
  if (isWebsiteSettingsActive.value) {
    isWebsiteSettingsOpen.value = true;
  }
};

// Call on component mount
checkAndOpenDropdown();

// Methods
const closeMobileSidebar = () => {
  emit("closeMobileSidebar");
};

const toggleWebsiteSettings = () => {
  isWebsiteSettingsOpen.value = !isWebsiteSettingsOpen.value;
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
.border-sage-600 {
  border-color: #8db580;
}

.hover\:bg-sage-50:hover {
  background-color: #f4f6f3;
}
.hover\:text-sage-800:hover {
  color: #6b8f5e;
}

/* Animation for dropdown */
.max-h-0 {
  max-height: 0;
}
.max-h-96 {
  max-height: 24rem;
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

/* Smooth rotation for chevron */
.rotate-180 {
  transform: rotate(180deg);
}
</style>
