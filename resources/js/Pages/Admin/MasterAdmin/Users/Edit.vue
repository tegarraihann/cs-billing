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
              Edit User
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
                    <p class="text-xs text-sage-500">Master Administrator</p>
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
          :href="dashboardRoute"
          class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200"
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
          :href="usersIndexRoute"
          class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 bg-sage-100 text-sage-800"
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
        <!-- Flash Messages -->
        <div
          v-if="flashSuccess"
          class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
        >
          <span class="block sm:inline">{{ flashSuccess }}</span>
        </div>

        <div
          v-if="flashError"
          class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        >
          <span class="block sm:inline">{{ flashError }}</span>
        </div>

        <!-- Breadcrumb -->
        <div class="mb-6">
          <nav class="flex" aria-label="Breadcrumb">
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <a
                  :href="dashboardRoute"
                  class="text-sage-600 hover:text-sage-800"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 text-sage-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <a
                    :href="usersIndexRoute"
                    class="ml-1 text-sage-600 hover:text-sage-800 md:ml-2"
                  >
                    User Management
                  </a>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg
                    class="w-4 h-4 text-sage-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="ml-1 text-sage-500 md:ml-2">Edit User</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        <!-- Header Section -->
        <div
          class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 class="text-2xl font-bold text-sage-800 mb-2">Edit User</h2>
              <p class="text-sage-600">
                Update user information and permissions
              </p>
            </div>
            <div class="mt-4 sm:mt-0">
              <a
                :href="usersIndexRoute"
                class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Users
              </a>
            </div>
          </div>
        </div>

        <!-- Edit Form -->
        <div
          class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">
              User Information
            </h3>
            <p class="text-sm text-sage-600 mt-1">
              Edit the user details below
            </p>
          </div>

          <form @submit.prevent="submitForm" class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Name -->
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Full Name <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-300': errors.name }"
                  placeholder="Enter full name"
                />
                <div v-if="errors.name" class="mt-1 text-sm text-red-600">
                  {{ errors.name[0] }}
                </div>
              </div>

              <!-- Email -->
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Email Address <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-300': errors.email }"
                  placeholder="Enter email address"
                />
                <div v-if="errors.email" class="mt-1 text-sm text-red-600">
                  {{ errors.email[0] }}
                </div>
              </div>

              <!-- Phone -->
              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-300': errors.phone }"
                  placeholder="Enter phone number"
                />
                <div v-if="errors.phone" class="mt-1 text-sm text-red-600">
                  {{ errors.phone[0] }}
                </div>
              </div>

              <!-- Role -->
              <div>
                <label
                  for="role"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Role <span class="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  v-model="form.role"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-300': errors.role }"
                >
                  <option value="">Select Role</option>
                  <option value="masteradmin">Master Admin</option>
                  <option value="admin_cs">Admin CS</option>
                  <option value="admin_keuangan">Admin Keuangan</option>
                </select>
                <div v-if="errors.role" class="mt-1 text-sm text-red-600">
                  {{ errors.role[0] }}
                </div>
              </div>

              <!-- Status -->
              <div>
                <label
                  for="status"
                  class="block text-sm font-medium text-sage-700 mb-2"
                >
                  Status <span class="text-red-500">*</span>
                </label>
                <select
                  id="status"
                  v-model="form.status"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  :class="{ 'border-red-300': errors.status }"
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <div v-if="errors.status" class="mt-1 text-sm text-red-600">
                  {{ errors.status[0] }}
                </div>
              </div>
            </div>

            <!-- Password Section -->
            <div class="mt-8 pt-6 border-t border-sage-200">
              <h4 class="text-lg font-medium text-sage-800 mb-4">
                Change Password
              </h4>
              <p class="text-sm text-sage-600 mb-4">
                Leave password fields empty if you don't want to change the
                password
              </p>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- New Password -->
                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    New Password
                  </label>
                  <input
                    id="password"
                    v-model="form.password"
                    type="password"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-300': errors.password }"
                    placeholder="Enter new password"
                  />
                  <div v-if="errors.password" class="mt-1 text-sm text-red-600">
                    {{ errors.password[0] }}
                  </div>
                </div>

                <!-- Confirm Password -->
                <div>
                  <label
                    for="password_confirmation"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Confirm New Password
                  </label>
                  <input
                    id="password_confirmation"
                    v-model="form.password_confirmation"
                    type="password"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div
              class="mt-8 pt-6 border-t border-sage-200 flex justify-end space-x-3"
            >
              <a
                :href="usersIndexRoute"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </a>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting">Updating...</span>
                <span v-else>Update User</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";

// Props
const props = defineProps({
  user: Object,
  errors: Object,
});

// Computed properties untuk akses data
const authUser = computed(() => {
  return window.$page?.props?.auth?.user || null;
});

const flashSuccess = computed(() => {
  return window.$page?.props?.flash?.success || null;
});

const flashError = computed(() => {
  return window.$page?.props?.flash?.error || null;
});

// Routes
const dashboardRoute = "/master-admin/dashboard";
const usersIndexRoute = "/master-admin/users";

// Reactive state
const isMobileSidebarOpen = ref(false);
const showUserDropdown = ref(false);
const isSubmitting = ref(false);
const errors = ref(props.errors || {});

// Form data
const form = reactive({
  name: props.user?.name || "",
  email: props.user?.email || "",
  phone: props.user?.phone || "",
  role: props.user?.role || "",
  status: props.user?.status || "",
  password: "",
  password_confirmation: "",
});

// Methods
const toggleMobileSidebar = () => {
  isMobileSidebarOpen.value = !isMobileSidebarOpen.value;
};

const closeMobileSidebar = () => {
  isMobileSidebarOpen.value = false;
};

const toggleUserDropdown = () => {
  showUserDropdown.value = !showUserDropdown.value;
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

const submitForm = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  errors.value = {};

  try {
    // Create form data
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append(
      "_token",
      document.querySelector('meta[name="csrf-token"]')?.getAttribute("content")
    );
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone || "");
    formData.append("role", form.role);
    formData.append("status", form.status);

    if (form.password) {
      formData.append("password", form.password);
      formData.append("password_confirmation", form.password_confirmation);
    }

    // Submit form
    const response = await fetch(`/master-admin/users/${props.user.id}`, {
      method: "POST",
      body: formData,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      // Redirect on success
      window.location.href =
        usersIndexRoute + "?success=" + encodeURIComponent(data.message);
    } else {
      // Handle validation errors
      if (response.status === 422 && data.errors) {
        errors.value = data.errors;
      } else {
        // Handle other errors
        alert(data.message || "Terjadi kesalahan saat mengupdate user.");
      }
    }
  } catch (error) {
    console.error("Form submission error:", error);
    alert("Terjadi kesalahan saat mengirim data.");
  } finally {
    isSubmitting.value = false;
  }
};

// Auto-close dropdowns when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest(".relative")) {
    showUserDropdown.value = false;
  }
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
  window.addEventListener("click", handleClickOutside);
  console.log("User data:", props.user);
  console.log("Errors:", props.errors);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("click", handleClickOutside);
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
.bg-sage-300 {
  background-color: #c0cdb8;
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
.border-sage-300 {
  border-color: #c0cdb8;
}
.hover\:bg-sage-50:hover {
  background-color: #f4f6f3;
}
.hover\:bg-sage-100:hover {
  background-color: #e8ece5;
}
.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}
.hover\:text-sage-700:hover {
  color: #7ba169;
}
.hover\:text-sage-800:hover {
  color: #6b8f5e;
}
.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}
.focus\:border-sage-500:focus {
  border-color: #8db580;
}
</style>
