<template>
  <MasterAdminLayout>

    <Head :title="`Edit User: ${user?.name}`" />

    <div class="py-6">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb -->
        <nav class="flex mb-6" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <Link :href="route('masteradmin.dashboard')" class="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </li>
            <li>
              <div class="flex items-center">
                <ChevronRight class="w-4 h-4 text-gray-400" />
                <Link :href="route('masteradmin.users.index')" class="ml-1 text-gray-600 hover:text-gray-900 md:ml-2">
                  User Management
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <ChevronRight class="w-4 h-4 text-gray-400" />
                <span class="ml-1 text-gray-500 md:ml-2">Edit User</span>
              </div>
            </li>
          </ol>
        </nav>

        <!-- Header -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4">
                  <Edit class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 class="text-2xl font-semibold text-gray-900">Edit User: {{ user?.name }}</h1>
                  <p class="mt-1 text-sm text-gray-600">Update user information and permissions</p>
                </div>
              </div>
              <div class="mt-4 sm:mt-0">
                <Link :href="route('masteradmin.users.index')"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                  <ArrowLeft class="mr-2 h-4 w-4" />
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Section -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h3 class="text-lg font-semibold text-gray-900">User Information</h3>
            <p class="mt-1 text-sm text-gray-600">Edit the user details below</p>
          </div>

          <div class="p-6">
            <form @submit.prevent="submit" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name -->
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span class="text-red-500">*</span>
                  </label>
                  <input v-model="form.name" type="text" id="name" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    :class="{ 'border-red-300': form.errors.name }" placeholder="Enter full name" />
                  <div v-if="form.errors.name" class="mt-2 text-sm text-red-600">
                    {{ form.errors.name }}
                  </div>
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span class="text-red-500">*</span>
                  </label>
                  <input v-model="form.email" type="email" id="email" required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    :class="{ 'border-red-300': form.errors.email }" placeholder="Enter email address" />
                  <div v-if="form.errors.email" class="mt-2 text-sm text-red-600">
                    {{ form.errors.email }}
                  </div>
                </div>

                <!-- Phone -->
                <div>
                  <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input v-model="form.phone" type="tel" id="phone"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Enter phone number" />
                  <div v-if="form.errors.phone" class="mt-2 text-sm text-red-600">
                    {{ form.errors.phone }}
                  </div>
                </div>

                <!-- Role -->
                <div>
                  <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
                    Role <span class="text-red-500">*</span>
                  </label>
                  <select v-model="form.role" id="role" required :disabled="user?.role === 'masteradmin'"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed">
                    <option value="">Select Role</option>
                    <option value="masteradmin">Master Admin</option>
                    <option value="admin_cs">Admin CS</option>
                    <option value="admin_keuangan">Finance Dept</option>
                  </select>
                  <div v-if="form.errors.role" class="mt-2 text-sm text-red-600">
                    {{ form.errors.role }}
                  </div>
                  <div v-if="user?.role === 'masteradmin'" class="mt-2 text-sm text-amber-600 flex items-center">
                    <AlertTriangle class="w-4 h-4 mr-1" />
                    Role Master Admin tidak dapat diubah
                  </div>
                </div>

                <!-- Status -->
                <div>
                  <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
                    Status <span class="text-red-500">*</span>
                  </label>
                  <select v-model="form.status" id="status" required :disabled="user?.role === 'masteradmin'"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed">
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <div v-if="form.errors.status" class="mt-2 text-sm text-red-600">
                    {{ form.errors.status }}
                  </div>
                  <div v-if="user?.role === 'masteradmin'" class="mt-2 text-sm text-amber-600 flex items-center">
                    <AlertTriangle class="w-4 h-4 mr-1" />
                    Status Master Admin tidak dapat diubah
                  </div>
                </div>
              </div>

              <!-- Password Section -->
              <div class="pt-6 border-t border-gray-200">
                <h4 class="text-lg font-medium text-gray-900 mb-2">Change Password</h4>
                <p class="text-sm text-gray-600 mb-4">
                  Leave password fields empty if you don't want to change the password
                </p>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <!-- New Password -->
                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input v-model="form.password" type="password" id="password"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                      placeholder="Enter new password" />
                    <div v-if="form.errors.password" class="mt-2 text-sm text-red-600">
                      {{ form.errors.password }}
                    </div>
                  </div>

                  <!-- Confirm Password -->
                  <div>
                    <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input v-model="form.password_confirmation" type="password" id="password_confirmation"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                      placeholder="Confirm new password" />
                  </div>
                </div>
              </div>

              <!-- Submit Buttons -->
              <div
                class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-gray-200">
                <Link :href="route('masteradmin.users.index')"
                  class="inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                  Cancel
                </Link>
                <button type="submit" :disabled="form.processing"
                  class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                  <svg v-if="form.processing" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  <span v-if="form.processing">Updating...</span>
                  <span v-else>Update User</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </MasterAdminLayout>
</template>

<script setup>
import { Head, Link, useForm } from "@inertiajs/vue3";
import MasterAdminLayout from "@/Layouts/MasterAdminLayout.vue";
import { Edit, ArrowLeft, ChevronRight, AlertTriangle } from "lucide-vue-next";

const props = defineProps({
  user: Object,
  errors: Object,
});

const form = useForm({
  name: props.user?.name || "",
  email: props.user?.email || "",
  phone: props.user?.phone || "",
  role: props.user?.role || "",
  status: props.user?.status || "",
  password: "",
  password_confirmation: "",
});

const submit = () => {
  // Protect master admin role/status from being changed
  if (props.user?.role === 'masteradmin') {
    form.role = props.user.role;
    form.status = props.user.status;
  }

  form.put(route("masteradmin.users.update", props.user.id), {
    onSuccess: () => {
      // Handle success
    },
    onError: (errors) => {
      // Handle errors
    },
  });
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

.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
  border-color: #8db580;
}
</style>
