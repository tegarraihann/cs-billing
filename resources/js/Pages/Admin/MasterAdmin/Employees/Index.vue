<template>
  <MasterAdminLayout>
    <Head title="Employee Management" />

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
                Employee Management
              </h2>
              <p class="text-sage-600">
                Manage all employees data - view, add, edit, and delete employee records
              </p>
            </div>
            <div class="mt-4 sm:mt-0">
              <a
                :href="createEmployeeRoute"
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
                Add New Employee
              </a>
            </div>
          </div>
        </div>

        <!-- Search and Filter Section -->
        <div
          class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Search Input -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2"
                >Search Employees</label
              >
              <input
                v-model="searchForm.search"
                @input="debounceSearch"
                type="text"
                placeholder="Search by name, email, or employee ID..."
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
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

        <!-- Employees Table -->
        <div
          class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800">Employees List</h3>
            <p class="text-sm text-sage-600 mt-1">
              Total: {{ employees?.total || 0 }} employees
            </p>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-sage-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                  >
                    Employee
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                  >
                    Position
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                  >
                    Contact
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                  >
                    Join Date
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
                  v-for="employee in employees?.data || []"
                  :key="employee.id"
                  class="hover:bg-sage-50 transition-colors"
                >
                  <!-- Employee Info -->
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div
                        class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center mr-3"
                      >
                        <span class="text-white font-semibold text-sm">{{
                          getInitials(employee.nama)
                        }}</span>
                      </div>
                      <div>
                        <div class="text-sm font-medium text-gray-900">
                          {{ employee.nama }}
                        </div>
                        <div class="text-sm text-gray-500">
                          ID: {{ employee.employee_id }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <!-- Position -->
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">
                      {{ employee.posisi || '-' }}
                    </div>
                  </td>

                  <!-- Contact -->
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">
                      {{ employee.email }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ employee.nomor_hp }}
                    </div>
                  </td>

                  <!-- Status -->
                  <td class="px-6 py-4">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="
                        employee.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      "
                    >
                      {{ employee.status === "active" ? "Active" : "Inactive" }}
                    </span>
                  </td>

                  <!-- Join Date -->
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ formatDate(employee.tanggal_masuk) }}
                  </td>

                  <!-- Actions -->
                  <td class="px-6 py-4">
                    <div class="flex items-center space-x-2">
                      <a
                        :href="getShowRoute(employee.id)"
                        class="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors"
                        title="View"
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
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </a>

                      <a
                        :href="getEditRoute(employee.id)"
                        class="text-green-600 hover:text-green-800 p-1 rounded transition-colors"
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
                        @click="toggleEmployeeStatus(employee)"
                        class="p-1 rounded transition-colors"
                        :class="
                          employee.status === 'active'
                            ? 'text-orange-600 hover:text-orange-800'
                            : 'text-green-600 hover:text-green-800'
                        "
                        :title="
                          employee.status === 'active' ? 'Deactivate' : 'Activate'
                        "
                      >
                        <svg
                          v-if="employee.status === 'active'"
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
                        @click="confirmDelete(employee)"
                        class="text-red-600 hover:text-red-800 p-1 rounded transition-colors"
                        title="Delete"
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
            v-if="employees?.last_page > 1"
            class="px-6 py-4 border-t border-sage-200"
          >
            <div class="flex items-center justify-between">
              <div class="text-sm text-sage-600">
                Showing {{ employees.from }} to {{ employees.to }} of
                {{ employees.total }} results
              </div>
              <div class="flex space-x-1">
                <a
                  v-for="(link, index) in employees.links"
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
    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete employee "{{ employeeToDelete?.nama }}"? This
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
            @click="deleteEmployee"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </MasterAdminLayout>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { Head } from "@inertiajs/vue3";
import MasterAdminLayout from "@/Layouts/MasterAdminLayout.vue";

// Props
const props = defineProps({
  employees: Object,
  filters: Object,
});

// Computed properties
const flashSuccess = computed(() => {
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
const createEmployeeRoute = "/master-admin/employees/create";

// Reactive state
const showDeleteModal = ref(false);
const employeeToDelete = ref(null);

const searchForm = reactive({
  search: props.filters?.search || "",
  status: props.filters?.status || "",
});

// Methods
const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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

const getShowRoute = (employeeId) => {
  return `/master-admin/employees/${employeeId}`;
};

const getEditRoute = (employeeId) => {
  return `/master-admin/employees/${employeeId}/edit`;
};

const performSearch = () => {
  const params = new URLSearchParams();
  if (searchForm.search) params.append("search", searchForm.search);
  if (searchForm.status) params.append("status", searchForm.status);

  const queryString = params.toString();
  const url = `/master-admin/employees/search${
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

const confirmDelete = (employee) => {
  employeeToDelete.value = employee;
  showDeleteModal.value = true;
};

const cancelDelete = () => {
  employeeToDelete.value = null;
  showDeleteModal.value = false;
};

const deleteEmployee = () => {
  if (employeeToDelete.value) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = `/master-admin/employees/${employeeToDelete.value.id}`;

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

const toggleEmployeeStatus = (employee) => {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = `/master-admin/employees/${employee.id}/toggle-status`;

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

// Lifecycle hooks
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
