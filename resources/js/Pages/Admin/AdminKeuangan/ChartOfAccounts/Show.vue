<template>
  <AdminKeuanganLayout>
    <Head title="Chart of Accounts - Details" />

    <div class="min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8">
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-sage-800">Chart of Accounts</h1>
            <p class="text-sage-600 mt-1">Account details and configuration</p>
          </div>
          <div class="flex items-center space-x-3">
            <Link
              :href="route('admin-keuangan.chart-of-accounts.edit', account.id)"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
            >
              <span>Edit</span>
            </Link>
            <Link
              :href="route('admin-keuangan.chart-of-accounts.index')"
              class="bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
            >
              <span>Back</span>
            </Link>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="p-6 border-b border-sage-200">
              <h2 class="text-lg font-semibold text-sage-800">Account Details</h2>
            </div>
            <div class="p-6 space-y-6">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Account Code</label>
                <div class="text-lg font-semibold text-sage-900">{{ account.account_code }}</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Account Name</label>
                <div class="text-sage-800">{{ account.account_name }}</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Account Type</label>
                <div class="text-sage-800">{{ formatType(account.account_type) }}</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Account Category</label>
                <div class="text-sage-800">{{ account.account_category }}</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Parent Account</label>
                <div class="text-sage-800">
                  <span v-if="account.parent">
                    {{ account.parent.account_code }} - {{ account.parent.account_name }}
                  </span>
                  <span v-else>-</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Sort Order</label>
                <div class="text-sage-800">{{ account.sort_order ?? '-' }}</div>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Description</label>
                <div class="text-sage-800 whitespace-pre-wrap">
                  {{ account.description || 'No description provided' }}
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Status</label>
                <span
                  :class="[
                    'inline-flex px-3 py-1 text-sm font-semibold rounded-full',
                    account.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700',
                  ]"
                >
                  {{ account.is_active ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="p-6 border-b border-sage-200">
              <h3 class="text-lg font-semibold text-sage-800">System Info</h3>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-1">Created At</label>
                <div class="text-sm text-sage-800">{{ formatDate(account.created_at) }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-1">Updated At</label>
                <div class="text-sm text-sage-800">{{ formatDate(account.updated_at) }}</div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-sm border border-sage-200">
            <div class="p-6 border-b border-sage-200">
              <h3 class="text-lg font-semibold text-sage-800">Quick Actions</h3>
            </div>
            <div class="p-6 space-y-3">
              <Link
                :href="route('admin-keuangan.chart-of-accounts.edit', account.id)"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <span>Edit Account</span>
              </Link>
              <button
                v-if="account.is_active"
                @click="confirmDeactivate"
                class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
              >
                <span>Deactivate Account</span>
              </button>
              <span
                v-else
                class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-400 border border-gray-200 rounded-lg"
              >
                Account is inactive
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AlertDialog
      :show="showDeactivateModal"
      title="Deactivate Account"
      :message="`Are you sure you want to deactivate account '${account.account_code}'?`"
      confirm-text="Deactivate"
      cancel-text="Cancel"
      @confirm="deactivateAccount"
      @cancel="showDeactivateModal = false"
    />
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';
import AlertDialog from '@/Components/AlertDialog.vue';

const props = defineProps({
  account: Object,
});

const route = window.route || function (name, params) {
  const routes = {
    'admin-keuangan.chart-of-accounts.index': '/admin-keuangan/chart-of-accounts',
    'admin-keuangan.chart-of-accounts.edit': '/admin-keuangan/chart-of-accounts',
    'admin-keuangan.chart-of-accounts.destroy': '/admin-keuangan/chart-of-accounts',
  };
  const baseRoute = routes[name] || '#';
  return params ? `${baseRoute}/${params}` : baseRoute;
};

const showDeactivateModal = ref(false);

const confirmDeactivate = () => {
  showDeactivateModal.value = true;
};

const deactivateAccount = () => {
  router.delete(route('admin-keuangan.chart-of-accounts.destroy', props.account.id), {
    onSuccess: () => {
      showDeactivateModal.value = false;
    },
  });
};

const formatType = (value) => {
  if (!value) return '-';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
</script>

<style scoped>
.text-sage-100 { color: #f4f6f3; }
.text-sage-500 { color: #8db580; }
.text-sage-600 { color: #8db580; }
.text-sage-700 { color: #7ba169; }
.text-sage-800 { color: #6b8f5e; }
.text-sage-900 { color: #5a7a4d; }
.bg-sage-50 { background-color: #f4f6f3; }
.bg-sage-100 { background-color: #e8ece5; }
.bg-sage-200 { background-color: #d4ddd0; }
.bg-sage-600 { background-color: #8db580; }
.bg-sage-700 { background-color: #7ba169; }
.border-sage-200 { border-color: #d4ddd0; }
.hover\:bg-sage-200:hover { background-color: #d4ddd0; }
</style>
