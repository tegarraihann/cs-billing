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
              User Management
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
    <SidebarNavigation
      :is-mobile-sidebar-open="isMobileSidebarOpen"
      @close-mobile-sidebar="closeMobileSidebar"
    />

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

        <!-- Header Section -->
        <div
          class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
        >
          <div
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 class="text-2xl font-bold text-sage-800 mb-2">
                User Management
              </h2>
              <p class="text-sage-600">
                Manage all system users - view, add, edit, and delete user
                accounts
              </p>
            </div>
            <div class="mt-4 sm:mt-0">
              <a
                :href="createUserRoute"
                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New User
              </a>
            </div>
          </div>
        </div>

        <!-- Search and Filter Section -->
        <div
          class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Search Input -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2"
                >Search Users</label
              >
              <input
                v-model="searchForm.search"
                @input="debounceSearch"
                type="text"
                placeholder="Search by name or email..."
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>

            <!-- Role Filter -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2"
                >Filter by Role</label
              >
              <select
                v-model="searchForm.role"
                @change="performSearch"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              >
                <option value="">All Roles</option>
                <option value="masteradmin">Master Admin</option>
                <option value="admin_cs">Admin CS</option>
                <option value="admin_keuangan">Finance Dept</option>
              </select>
            </div>

            <!-- Status Filter -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2"
                >Filter by Status</label
              >
              <select
                v-model="searchForm.status"
                @change="performSearch"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div
          class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Users List</h3>
            <p class="text-sm text-sage-600 mt-1">
              Total: {{ users?.total || 0 }} users
            </p>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-sage-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                  >
                    Created
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-sage-200">
                <tr
                  v-for="user in users?.data || []"
                  :key="user.id"
                  class="hover:bg-sage-50 transition-colors"
                >
                  <!-- User Info -->
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div
                        class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center mr-3"
                      >
                        <span class="text-white font-semibold text-sm">{{
                          getInitials(user.name)
                        }}</span>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">
                          {{ user.name }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ user.email }}
                        </div>
                        <div v-if="user.phone" class="text-xs text-gray-400">
                          {{ user.phone }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Role -->
                  <td class="px-6 py-4">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getRoleClass(user.role)"
                    >
                      {{ getRoleLabel(user.role) }}
                    </span>
                  </td>

                  <!-- Status -->
                  <td class="px-6 py-4">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      "
                    >
                      {{ user.status === "active" ? "Active" : "Inactive" }}
                    </span>
                  </td>

                  <!-- Created Date -->
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ formatDate(user.created_at) }}
                  </td>

                  <!-- Actions -->
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-2">
                      <a
                        :href="getEditRoute(user.id)"
                        class="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                        title="Edit"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </a>

                      <button
                        @click="toggleUserStatus(user)"
                        :disabled="user.role === 'masteradmin' && user.id === currentAuthUser?.id && user.status === 'active'"
                        class="p-1 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-gray-100"
                        :class="
                          user.role === 'masteradmin' && user.id === currentAuthUser?.id && user.status === 'active'
                            ? 'text-gray-400'
                            : user.status === 'active'
                              ? 'text-orange-600 hover:text-orange-800'
                              : 'text-green-600 hover:text-green-800'
                        "
                        :title="
                          user.role === 'masteradmin' && user.id === currentAuthUser?.id && user.status === 'active'
                            ? 'Master Admin tidak dapat menonaktifkan akun sendiri'
                            : user.status === 'active'
                              ? 'Deactivate'
                              : 'Activate'
                        "
                      >
                        <svg
                          v-if="user.status === 'active'"
                          class="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                          />
                        </svg>
                        <svg
                          v-else
                          class="w-4 h-4"
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
                      </button>

                      <button
                        @click="confirmDelete(user)"
                        :disabled="user.role === 'masteradmin' && user.id === currentAuthUser?.id"
                        class="p-1 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-gray-100"
                        :class="
                          user.role === 'masteradmin' && user.id === currentAuthUser?.id
                            ? 'text-gray-400'
                            : 'text-red-600 hover:text-red-800'
                        "
                        :title="
                          user.role === 'masteradmin' && user.id === currentAuthUser?.id
                            ? 'Master Admin tidak dapat menghapus akun sendiri'
                            : 'Delete'
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div
            v-if="users?.last_page > 1"
            class="px-6 py-4 border-t border-sage-200"
          >
            <div class="flex items-center justify-between">
              <div class="text-sm text-sage-600">
                Showing {{ users.from }} to {{ users.to }} of
                {{ users.total }} results
              </div>
              <div class="flex space-x-1">
                <a
                  v-for="(link, index) in users.links"
                  :key="index"
                  :href="link.url"
                  v-html="link.label"
                  class="px-3 py-2 text-sm rounded-md transition-colors"
                  :class="
                    link.active
                      ? 'bg-sage-600 text-white'
                      : 'text-sage-600 hover:bg-sage-100'
                  "
                  :style="
                    !link.url ? 'pointer-events: none; opacity: 0.5;' : ''
                  "
                >
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete user "{{ userToDelete?.name }}"? This
          action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="cancelDelete"
            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="deleteUser"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import Dropdown from "@/Components/Dropdown.vue";
import DropdownLink from "@/Components/DropdownLink.vue";
import SidebarNavigation from "@/Pages/Admin/MasterAdmin/Components/SidebarNavigation.vue";

// Props
const props = defineProps({
  users: Object,
  filters: Object,
  authUser: Object,
});

// Computed properties untuk akses data
const currentAuthUser = computed(() => {
  return props.authUser || null;
});

const flashSuccess = computed(() => {
  // Check URL parameter for success message
  const urlParams = new URLSearchParams(window.location.search);
  const successParam = urlParams.get("success");
  if (successParam) {
    return successParam;
  }
  return window.$page?.props?.flash?.success || null;
});

const flashError = computed(() => {
  return window.$page?.props?.flash?.error || null;
});

// Routes
const dashboardRoute = "/master-admin/dashboard";
const usersIndexRoute = "/master-admin/users";
const createUserRoute = "/master-admin/users/create";

// Reactive state
const isMobileSidebarOpen = ref(false);
const showDeleteModal = ref(false);
const userToDelete = ref(null);

const searchForm = reactive({
  search: props.filters?.search || "",
  role: props.filters?.role || "",
  status: props.filters?.status || "",
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

const getRoleClass = (role) => {
  const classes = {
    masteradmin: "bg-purple-100 text-purple-800",
    admin_cs: "bg-blue-100 text-blue-800",
    admin_keuangan: "bg-green-100 text-green-800",
  };
  return classes[role] || "bg-gray-100 text-gray-800";
};

const getRoleLabel = (role) => {
  const labels = {
    masteradmin: "Master Admin",
    admin_cs: "Admin CS",
    admin_keuangan: "Finance Dept",
  };
  return labels[role] || role;
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getEditRoute = (userId) => {
  return `/master-admin/users/${userId}/edit`;
};

const performSearch = () => {
  const params = new URLSearchParams();
  if (searchForm.search) params.append("search", searchForm.search);
  if (searchForm.role) params.append("role", searchForm.role);
  if (searchForm.status) params.append("status", searchForm.status);

  const queryString = params.toString();
  const url = `/master-admin/users/search${
    queryString ? "?" + queryString : ""
  }`;
  window.location.href = url;
};

// Simple debounce function
let searchTimeout;
const debounceSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    performSearch();
  }, 300);
};

const confirmDelete = (user) => {
  // Prevent master admin from deleting themselves only
  if (user.role === 'masteradmin' && user.id === currentAuthUser.value?.id) {
    alert('Master Admin tidak dapat menghapus akun sendiri.');
    return;
  }

  userToDelete.value = user;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  userToDelete.value = null;
  showDeleteModal.value = false;
};

const deleteUser = () => {
  if (userToDelete.value) {
    // Create form and submit
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `/master-admin/users/${userToDelete.value.id}`;

    const methodInput = document.createElement("input");
    methodInput.type = "hidden";
    methodInput.name = "_method";
    methodInput.value = "DELETE";

    const tokenInput = document.createElement("input");
    tokenInput.type = "hidden";
    tokenInput.name = "_token";
    tokenInput.value = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");

    form.appendChild(methodInput);
    form.appendChild(tokenInput);
    document.body.appendChild(form);
    form.submit();
  }
};

const isCurrentUser = (user) => {
  const currentUserId = currentAuthUser.value?.id;
  return currentUserId === user.id;
};

const toggleUserStatus = (user) => {
  // Prevent master admin from deactivating themselves only
  if (user.role === 'masteradmin' && user.id === currentAuthUser.value?.id && user.status === 'active') {
    alert('Master Admin tidak dapat menonaktifkan akun sendiri.');
    return;
  }

  // Create form and submit
  const form = document.createElement("form");
  form.method = "POST";
  form.action = `/master-admin/users/${user.id}/toggle-status`;

  const tokenInput = document.createElement("input");
  tokenInput.type = "hidden";
  tokenInput.name = "_token";
  tokenInput.value = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

  form.appendChild(tokenInput);
  document.body.appendChild(form);
  form.submit();
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
  console.log("Users data:", props.users);
  console.log("Filters:", props.filters);
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
