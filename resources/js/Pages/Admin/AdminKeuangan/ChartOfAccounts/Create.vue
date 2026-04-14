<template>
  <AdminKeuanganLayout>
    <Head title="Create Chart of Account" />

    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-6">
          <Link
            :href="route('admin-keuangan.chart-of-accounts.index')"
            class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
          >
            <ArrowLeft class="w-4 h-4 mr-2" />
            Back to Chart of Accounts
          </Link>
          <h1 class="text-2xl font-bold text-gray-900">Create New Account</h1>
          <p class="mt-1 text-sm text-gray-600">Add a new account without altering existing integrations</p>
        </div>

        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
          <div class="px-4 py-5 sm:p-6">
            <form @submit.prevent="submit" class="space-y-6">
              <div>
                <label for="account_code" class="block text-sm font-medium text-gray-700 mb-2">
                  Account Code <span class="text-red-500">*</span>
                </label>
                <input
                  id="account_code"
                  v-model="form.account_code"
                  type="text"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': form.errors.account_code }"
                  placeholder="Example: 5200"
                />
                <div v-if="form.errors.account_code" class="mt-1 text-sm text-red-600">
                  {{ form.errors.account_code }}
                </div>
              </div>

              <div>
                <label for="account_name" class="block text-sm font-medium text-gray-700 mb-2">
                  Account Name <span class="text-red-500">*</span>
                </label>
                <input
                  id="account_name"
                  v-model="form.account_name"
                  type="text"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                  :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': form.errors.account_name }"
                  placeholder="Example: Operational Expense"
                />
                <div v-if="form.errors.account_name" class="mt-1 text-sm text-red-600">
                  {{ form.errors.account_name }}
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="account_type" class="block text-sm font-medium text-gray-700 mb-2">
                    Account Type <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="account_type"
                    v-model="form.account_type"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                    :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': form.errors.account_type }"
                  >
                    <option value="">Select type</option>
                    <option value="asset">Asset</option>
                    <option value="liability">Liability</option>
                    <option value="equity">Equity</option>
                    <option value="revenue">Revenue</option>
                    <option value="expense">Expense</option>
                  </select>
                  <div v-if="form.errors.account_type" class="mt-1 text-sm text-red-600">
                    {{ form.errors.account_type }}
                  </div>
                </div>

                <div>
                  <label for="account_category" class="block text-sm font-medium text-gray-700 mb-2">
                    Account Category <span class="text-red-500">*</span>
                  </label>
                  <select
                    id="account_category"
                    v-model="form.account_category"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                    :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': form.errors.account_category }"
                  >
                    <option value="">Select category</option>
                    <option v-for="category in categories" :key="category" :value="category">
                      {{ category }}
                    </option>
                  </select>
                  <div v-if="form.errors.account_category" class="mt-1 text-sm text-red-600">
                    {{ form.errors.account_category }}
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label for="parent_code" class="block text-sm font-medium text-gray-700 mb-2">
                    Parent Account (optional)
                  </label>
                  <select
                    id="parent_code"
                    v-model="form.parent_code"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                  >
                    <option value="">No parent</option>
                    <option v-for="parent in parentAccounts" :key="parent.account_code" :value="parent.account_code">
                      {{ parent.account_code }} - {{ parent.account_name }}
                    </option>
                  </select>
                </div>

                <div>
                  <label for="sort_order" class="block text-sm font-medium text-gray-700 mb-2">
                    Sort Order (optional)
                  </label>
                  <input
                    id="sort_order"
                    v-model="form.sort_order"
                    type="number"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                    placeholder="Example: 10"
                  />
                </div>
              </div>

              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  v-model="form.description"
                  rows="4"
                  class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                  placeholder="Add notes or usage details..."
                ></textarea>
              </div>

              <div class="flex items-center">
                <label class="flex items-center cursor-pointer">
                  <input
                    v-model="form.is_active"
                    type="checkbox"
                    class="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded"
                  />
                  <span class="ml-2 block text-sm text-gray-900">
                    Active
                  </span>
                </label>
              </div>

              <div class="mt-8 flex justify-end space-x-3">
                <Link
                  :href="route('admin-keuangan.chart-of-accounts.index')"
                  class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  :disabled="processing"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"
                >
                  <Loader2 v-if="processing" class="animate-spin -ml-1 mr-2 h-4 w-4" />
                  {{ processing ? 'Saving...' : 'Create Account' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { computed } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { ArrowLeft, Loader2 } from 'lucide-vue-next'

const props = defineProps({
  categories: Array,
  parentAccounts: Array,
})

const form = useForm({
  account_code: '',
  account_name: '',
  account_type: '',
  account_category: '',
  parent_code: '',
  sort_order: '',
  description: '',
  is_active: true,
})

const processing = computed(() => form.processing)

const submit = () => {
  form.post(route('admin-keuangan.chart-of-accounts.store'))
}
</script>
