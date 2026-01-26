<template>
  <MasterAdminLayout>

    <Head title="User Management" />

    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Flash Messages -->
        <div v-if="flashSuccess"
          class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span class="block sm:inline">{{ flashSuccess }}</span>
        </div>

        <div v-if="flashError" class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span class="block sm:inline">{{ flashError }}</span>
        </div>

        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
            <p class="mt-1 text-sm text-gray-600">Manage all system users - view, add, edit, and delete user accounts
            </p>
          </div>
          <div>
            <Link :href="route('masteradmin.users.create')"
              class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150">
              <Plus class="w-4 h-4 mr-2" />
              Add New User
            </Link>
          </div>
        </div>

        <!-- Search and Filter Section -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Search Input -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
                <input v-model="searchForm.search" @input="debounceSearch" type="text"
                  placeholder="Search by name or email..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" />
              </div>

              <!-- Role Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Role</label>
                <select v-model="searchForm.role" @change="performSearch"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500">
                  <option value="">All Roles</option>
                  <option value="masteradmin">Master Admin</option>
                  <option value="admin_cs">Admin CS</option>
                  <option value="admin_keuangan">Finance Dept</option>
                </select>
              </div>

              <!-- Status Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
                <select v-model="searchForm.status" @change="performSearch"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500">
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div v-if="users?.data?.length" class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="user in users.data" :key="user.id" class="hover:bg-gray-50">
                  <!-- User Info -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center mr-3">
                        <span class="text-white font-semibold text-sm">{{ getInitials(user.name) }}</span>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                        <div class="text-sm text-gray-500">{{ user.email }}</div>
                      </div>
                    </div>
                  </td>

                  <!-- Role -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getRoleClass(user.role)">
                      {{ getRoleLabel(user.role) }}
                    </span>
                  </td>

                  <!-- Status -->
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      {{ user.status === 'active' ? 'Active' : 'Inactive' }}
                    </span>
                  </td>

                  <!-- Created Date -->
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(user.created_at) }}
                  </td>

                  <!-- Actions -->
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex items-center justify-end space-x-2">
                      <Link :href="route('masteradmin.users.edit', user.id)" class="text-sage-600 hover:text-sage-900">
                        Edit
                      </Link>
                      <button @click="toggleUserStatus(user)"
                        :disabled="user.role === 'masteradmin' && user.id === currentAuthUser?.id && user.status === 'active'"
                        class="text-orange-600 hover:text-orange-900 disabled:opacity-30 disabled:cursor-not-allowed">
                        {{ user.status === 'active' ? 'Deactivate' : 'Activate' }}
                      </button>
                      <button @click="confirmDelete(user)"
                        :disabled="user.role === 'masteradmin' && user.id === currentAuthUser?.id"
                        class="text-red-600 hover:text-red-900 disabled:opacity-30 disabled:cursor-not-allowed">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="px-6 py-8 text-center text-sm text-gray-500">
            No users found.
          </div>

          <!-- Pagination -->
          <div v-if="users" class="mt-6 px-6 pb-6">
            <Pagination :data="users" />
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete user "{{ userToDelete?.name }}"? This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button @click="cancelDelete"
            class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            Cancel
          </button>
          <button @click="deleteUser"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  </MasterAdminLayout>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { Head, Link, router } from "@inertiajs/vue3";
import MasterAdminLayout from "@/Layouts/MasterAdminLayout.vue";
import Pagination from "@/Components/Pagination.vue";
import { Plus } from "lucide-vue-next";

// Props
const props = defineProps({
  users: Object,
  filters: Object,
  authUser: Object,
});

// Computed properties
const currentAuthUser = computed(() => props.authUser || null);

const flashSuccess = computed(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const successParam = urlParams.get("success");
  if (successParam) return successParam;
  return window.$page?.props?.flash?.success || null;
});

const flashError = computed(() => {
  return window.$page?.props?.flash?.error || null;
});

// Reactive state
const showDeleteModal = ref(false);
const userToDelete = ref(null);

const searchForm = reactive({
  search: props.filters?.search || "",
  role: props.filters?.role || "",
  status: props.filters?.status || "",
});

// Methods
const getInitials = (name) => {
  if (!name) return "U";
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
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

const performSearch = () => {
  router.get(route('masteradmin.users.index'), { ...searchForm }, { preserveState: true });
};

let searchTimeout;
const debounceSearch = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    performSearch();
  }, 500);
};

const confirmDelete = (user) => {
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
    router.delete(route('masteradmin.users.destroy', userToDelete.value.id), {
      onSuccess: () => {
        showDeleteModal.value = false;
        userToDelete.value = null;
      }
    });
  }
};

const toggleUserStatus = (user) => {
  if (user.role === 'masteradmin' && user.id === currentAuthUser.value?.id && user.status === 'active') {
    alert('Master Admin tidak dapat menonaktifkan akun sendiri.');
    return;
  }
  router.post(route('masteradmin.users.toggle-status', user.id));
};
</script>

<style scoped>
/* Custom Sage Colors */
.bg-sage-600 {
  background-color: #8db580;
}

.bg-sage-700 {
  background-color: #7ba169;
}

.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}

.text-sage-600 {
  color: #8db580;
}

.hover\:text-sage-900:hover {
  color: #6b8f5e;
}

.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
  border-color: #8db580;
}
</style>
