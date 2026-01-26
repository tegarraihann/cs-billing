<template>
  <MasterAdminLayout>

    <Head title="Master Admin Dashboard" />

    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Master Admin Dashboard</h1>
            <p class="mt-1 text-sm text-gray-600">Manage system users, services, and core configurations.</p>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <Users class="h-6 w-6 text-blue-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ userStats.totalUsers || 0 }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <Briefcase class="h-6 w-6 text-green-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Services</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ userStats.totalServices || 0 }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <UsersRound class="h-6 w-6 text-purple-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Team Members</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ userStats.totalTeamMembers || 0 }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <CheckCircle class="h-6 w-6 text-orange-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Active Services</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ userStats.activeServices || 0 }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Link :href="route('masteradmin.users.index')"
                class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                <div class="flex-shrink-0">
                  <Users class="h-6 w-6 text-sage-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="text-sm font-medium text-gray-900">Manage Users</p>
                  <p class="text-sm text-gray-500 truncate">View and manage all user accounts</p>
                </div>
              </Link>

              <Link :href="route('masteradmin.website-settings.pengaturan-umum.index')"
                class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                <div class="flex-shrink-0">
                  <Settings class="h-6 w-6 text-sage-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="text-sm font-medium text-gray-900">Website Settings</p>
                  <p class="text-sm text-gray-500 truncate">Manage homepage, services & team content</p>
                </div>
              </Link>

              <Link :href="route('masteradmin.users.create')"
                class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                <div class="flex-shrink-0">
                  <Plus class="h-6 w-6 text-sage-600" />
                </div>
                <div class="flex-1 min-w-0">
                  <span class="absolute inset-0" aria-hidden="true"></span>
                  <p class="text-sm font-medium text-gray-900">Add New User</p>
                  <p class="text-sm text-gray-500 truncate">Create new user accounts for the system</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MasterAdminLayout>
</template>

<script setup>
import { computed } from "vue";
import { Head, Link } from "@inertiajs/vue3";
import MasterAdminLayout from "@/Layouts/MasterAdminLayout.vue";
import { Users, Briefcase, UsersRound, CheckCircle, Settings, Plus } from "lucide-vue-next";

// Props
const props = defineProps({
  user: Object,
  userRole: String,
  stats: Object,
  recentUsers: Array,
});

// Computed properties
const authUser = computed(() => props.user);
const userStats = computed(() => props.stats || {});
</script>

<style scoped>
/* Custom Sage Colors untuk focus ring */
.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}

.text-sage-600 {
  color: #8db580;
}
</style>
