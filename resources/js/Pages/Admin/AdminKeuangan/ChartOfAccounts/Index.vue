<template>
  <AdminKeuanganLayout>
    <Head title="Chart of Accounts" />

    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Chart of Accounts</h1>
            <p class="mt-1 text-sm text-gray-600">Manage P&L account names and activation status</p>
          </div>
          <Link
            :href="route('admin-keuangan.chart-of-accounts.create')"
            class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
          >
            <Plus class="w-4 h-4 mr-2" />
            Add Account
          </Link>
        </div>

        <!-- Search Section -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
          <div class="px-4 py-5 sm:p-6">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Search Input -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <input
                  v-model="form.search"
                  type="text"
                  placeholder="Search by code, name, type, category..."
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                  @keyup.enter="search"
                />
              </div>

              <!-- Status Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  v-model="form.status"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                >
                  <option value="">All Statuses</option>
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
            </div>

            <!-- Search Button -->
            <div class="mt-4">
              <button
                @click="search"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              >
                <Search class="w-4 h-4 mr-2" />
                Search
              </button>
            </div>
          </div>
        </div>

        <!-- Accounts Table -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:p-6">
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(account, index) in accounts.data" :key="account.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ (accounts.from ?? 1) + index }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ account.account_code }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {{ account.account_name }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatType(account.account_type) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ account.account_category }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span
                        :class="account.is_active
                          ? 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'
                          : 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700'"
                      >
                        {{ account.is_active ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div class="flex space-x-2">
                        <Link
                          :href="getEditUrl(account.id)"
                          class="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit class="w-4 h-4" />
                        </Link>
                        <button
                          v-if="account.is_active"
                          @click="confirmDeactivate(account)"
                          class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50"
                          title="Deactivate"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                        <span
                          v-else
                          class="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 border border-gray-200 rounded"
                        >
                          Deactivated
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="accounts.data.length === 0" class="text-center py-12">
              <BookOpen class="mx-auto h-12 w-12 text-gray-400" />
              <h3 class="mt-2 text-sm font-medium text-gray-900">No accounts found</h3>
              <p class="mt-1 text-sm text-gray-500">Start by adding your first account</p>
            </div>

            <div v-if="accounts?.links && accounts.links.length > 3" class="mt-6 bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div class="flex items-center justify-between">
                <div class="text-sm text-gray-700">
                  Showing {{ accounts?.from ?? 0 }} to {{ accounts?.to ?? 0 }} of {{ accounts?.total ?? 0 }} accounts
                </div>
                <div class="flex space-x-1">
                  <template v-for="link in accounts?.links || []" :key="link.label">
                    <button
                      v-if="link.url"
                      @click="visitPage(link.url)"
                      :class="[
                        'px-3 py-2 text-sm rounded-md',
                        link.active
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-500 hover:text-gray-700 border border-gray-300'
                      ]"
                      v-html="link.label"
                    ></button>
                    <span
                      v-else
                      class="px-3 py-2 text-sm text-gray-400"
                      v-html="link.label"
                    ></span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Deactivate Confirmation Modal -->
    <AlertDialog
      :show="deleteModal.show"
      title="Deactivate Account"
      :message="`Are you sure you want to deactivate account '${deleteModal.account?.account_code}'?`"
      confirm-text="Deactivate"
      cancel-text="Cancel"
      @confirm="deactivateAccount"
      @cancel="deleteModal.show = false"
    />
  </AdminKeuanganLayout>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';
import AlertDialog from '@/Components/AlertDialog.vue';
import { Plus, Search, Edit, Trash2, BookOpen } from 'lucide-vue-next';

const props = defineProps({
  accounts: Object,
  filters: Object,
});

const form = reactive({
  search: props.filters?.search || '',
  status: props.filters?.status || '',
});

const currentIndexQuery = computed(() => {
  const query = {
    search: form.search || undefined,
    status: form.status || undefined,
  };

  const currentPage = props.accounts?.current_page;
  if (currentPage && Number(currentPage) > 1) {
    query.page = currentPage;
  }

  return query;
});

const deleteModal = reactive({
  show: false,
  account: null,
});

const formatType = (value) => {
  if (!value) return '-';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const search = () => {
  router.get(
    route('admin-keuangan.chart-of-accounts.index'),
    {
      search: form.search,
      status: form.status,
    },
    {
      preserveState: true,
      preserveScroll: true,
    }
  );
};

const visitPage = (url) => {
  const targetUrl = new URL(url, window.location.origin);
  const page = targetUrl.searchParams.get('page');

  router.visit(targetUrl.pathname, {
    data: {
      search: form.search || undefined,
      status: form.status || undefined,
      page: page || undefined,
    },
    preserveState: true,
    preserveScroll: true,
    replace: true,
  });
};

const appendQuery = (url, query) => {
  const queryString = new URLSearchParams(
    Object.entries(query).filter(([, value]) => value !== undefined && value !== null && value !== '')
  ).toString();

  return queryString ? `${url}${url.includes('?') ? '&' : '?'}${queryString}` : url;
};

const getEditUrl = (accountId) => {
  return appendQuery(route('admin-keuangan.chart-of-accounts.edit', accountId), currentIndexQuery.value);
};

const confirmDeactivate = (account) => {
  deleteModal.account = account;
  deleteModal.show = true;
};

const deactivateAccount = () => {
  router.delete(route('admin-keuangan.chart-of-accounts.destroy', deleteModal.account.id), {
    data: { ...currentIndexQuery.value },
    onSuccess: () => {
      deleteModal.show = false;
      deleteModal.account = null;
    },
  });
};
</script>
