<template>
  <AdminKeuanganLayout>
    <Head title="Petty Cash Management" />

    <!-- Header -->
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Petty Cash Management</h1>
            <p class="mt-1 text-sm text-gray-600">Manage daily petty cash transactions</p>
          </div>
          <div class="flex items-center space-x-3">
            <button
              @click="syncTransactionBalances"
              class="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              title="Sync table balances with current balance"
            >
              <RefreshCw class="w-4 h-4 mr-2" />
              Sync Balance
            </button>
            <Link
              :href="route('admin-keuangan.petty-cash.create', { type: 'opening' })"
              class="inline-flex items-center px-3 py-2 bg-amber-600 text-white text-sm font-medium rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              Opening Balance
            </Link>
            <Link
              :href="route('admin-keuangan.petty-cash.create')"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            >
              <Plus class="w-4 h-4 mr-2" />
              Add Transaction
            </Link>
          </div>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <DollarSign class="h-6 w-6 text-gray-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Current Balance</dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ formatCurrency(props.currentBalance) }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Transaction Filters</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  v-model="formFilters.start_date"
                  type="date"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  v-model="formFilters.end_date"
                  type="date"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  v-model="formFilters.category_id"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                >
                  <option value="">All Categories</option>
                  <option v-for="category in props.categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  v-model="formFilters.type"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                >
                  <option value="">All Types</option>
                  <option value="expense">Expense</option>
                  <option value="topup">Top Up</option>
                  <option value="refund">Refund</option>
                  <option value="opening">Opening Balance</option>
                </select>
              </div>
            </div>
            <div class="flex justify-end space-x-3 mt-4">
              <button
                @click="clearFilters"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Clear
              </button>
              <button
                @click="applyFilters"
                class="px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        <!-- Transactions Table -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Transaction List</h3>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="transaction in props.transactions.data" :key="transaction.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(transaction.transaction_date) }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-900">
                    <div class="font-medium">{{ transaction.description }}</div>
                    <div v-if="transaction.so_number" class="text-xs text-gray-500">
                      SO: {{ transaction.so_number }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ transaction.category?.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span :class="getTypeClass(transaction.type)" class="px-2 py-1 rounded-full text-xs font-medium">
                      {{ getTypeLabel(transaction.type) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium" :class="getAmountClass(transaction.type)">
                    {{ transaction.type === 'expense' ? '-' : '+' }}{{ formatCurrency(transaction.amount) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">
                    {{ formatCurrency(transaction.balance_after) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <div class="flex items-center justify-center space-x-2">
                      <Link
                        :href="route('admin-keuangan.petty-cash.show', {
                          pettyCash: transaction.id,
                          ...currentIndexQuery
                        })"
                        class="text-gray-600 hover:text-gray-800 transition-colors"
                        title="View Details"
                      >
                        <Eye class="w-4 h-4" />
                      </Link>
                      <Link
                        :href="route('admin-keuangan.petty-cash.edit', {
                          pettyCash: transaction.id,
                          ...currentIndexQuery
                        })"
                        class="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit"
                      >
                        <Edit class="w-4 h-4" />
                      </Link>
                      <button
                        @click="confirmDelete(transaction)"
                        class="text-red-600 hover:text-red-800 transition-colors"
                        title="Delete"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="props.transactions.data.length === 0">
                  <td colspan="7" class="px-6 py-12 text-center text-sm text-gray-500">
                    No transactions found
                  </td>
                </tr>
            </tbody>
          </table>
        </div>

          <!-- Pagination -->
          <div v-if="props.transactions.links.length > 3" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-700">
                Showing {{ props.transactions.from ?? 0 }} to {{ props.transactions.to ?? 0 }} of {{ props.transactions.total }} transactions
              </div>
              <div class="flex space-x-1">
                <template v-for="link in props.transactions.links" :key="link.label">
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

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Are you sure you want to delete the transaction "{{ selectedTransaction?.description }}"?
              This action cannot be undone and will affect the petty cash balance.
            </p>
          </div>
          <div class="flex justify-center space-x-3 mt-4">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              @click="deleteTransaction"
              class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { DollarSign, Plus, RefreshCw, Eye, Edit, Trash2 } from 'lucide-vue-next'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

// Props
const props = defineProps({
  transactions: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    required: true
  },
  currentBalance: {
    type: [Number, String],
    required: true
  },
  filters: {
    type: Object,
    default: () => ({})
  }
})

// Reactive state - initialize with props filters
const formFilters = reactive({
  start_date: props.filters.start_date || '',
  end_date: props.filters.end_date || '',
  category_id: props.filters.category_id || '',
  type: props.filters.type || '',
  status: props.filters.status || ''
})

const currentIndexQuery = computed(() => {
  const query = {
    start_date: formFilters.start_date || undefined,
    end_date: formFilters.end_date || undefined,
    category_id: formFilters.category_id || undefined,
    type: formFilters.type || undefined,
    status: formFilters.status || undefined
  }

  const currentPage = props.transactions?.current_page
  if (currentPage && Number(currentPage) > 1) {
    query.page = currentPage
  }

  return query
})

const setDefaultMonthFilter = () => {
  if (props.filters.start_date || props.filters.end_date) {
    return
  }

  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)

  const format = (date) => date.toISOString().split('T')[0]
  formFilters.start_date = format(start)
  formFilters.end_date = format(end)

  router.get(route('admin-keuangan.petty-cash.index'), formFilters, {
    preserveState: true,
    preserveScroll: true,
    replace: true
  })
}

const showDeleteModal = ref(false)
const selectedTransaction = ref(null)

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const getTypeLabel = (type) => {
  const labels = {
    expense: 'Expense',
    topup: 'Top Up',
    refund: 'Refund',
    opening: 'Opening Balance'
  }
  return labels[type] || type
}

const getTypeClass = (type) => {
  const classes = {
    expense: 'bg-red-100 text-red-800',
    topup: 'bg-green-100 text-green-800',
    refund: 'bg-blue-100 text-blue-800',
    opening: 'bg-amber-100 text-amber-800'
  }
  return classes[type] || 'bg-sage-100 text-sage-800'
}

const getAmountClass = (type) => {
  return type === 'expense' ? 'text-red-600' : 'text-green-600'
}

const applyFilters = () => {
  router.get(route('admin-keuangan.petty-cash.index'), formFilters, {
    preserveState: true,
    preserveScroll: true,
    replace: true
  })
}

const clearFilters = () => {
  Object.keys(formFilters).forEach(key => {
    formFilters[key] = ''
  })
  router.get(route('admin-keuangan.petty-cash.index'))
}

const visitPage = (url) => {
  router.visit(url, {
    data: { ...formFilters },
    preserveState: true,
    preserveScroll: true,
    replace: true
  })
}

const confirmDelete = (transaction) => {
  selectedTransaction.value = transaction
  showDeleteModal.value = true
}

const deleteTransaction = () => {
  if (selectedTransaction.value) {
    router.delete(route('admin-keuangan.petty-cash.destroy', selectedTransaction.value.id), {
      onSuccess: () => {
        showDeleteModal.value = false
        selectedTransaction.value = null
      }
    })
  }
}

const syncTransactionBalances = () => {
  router.post(route('admin-keuangan.petty-cash.sync-transaction-balances'), {}, {
    onSuccess: (page) => {
      // Reload page to show updated balances
      router.reload()
    }
  })
}

onMounted(() => {
  setDefaultMonthFilter()
})

// Route helper - using the same pattern as other working files
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.petty-cash.index': '/admin-keuangan/petty-cash',
    'admin-keuangan.petty-cash.create': '/admin-keuangan/petty-cash/create',
    'admin-keuangan.petty-cash.show': (id) => `/admin-keuangan/petty-cash/${id}`,
    'admin-keuangan.petty-cash.edit': (id) => `/admin-keuangan/petty-cash/${id}/edit`,
    'admin-keuangan.petty-cash.destroy': (id) => `/admin-keuangan/petty-cash/${id}`,
    'admin-keuangan.petty-cash.sync-transaction-balances': '/admin-keuangan/petty-cash/sync-transaction-balances'
  }
  const definition = routes[name]
  if (!definition) {
    return '#'
  }

  if (typeof definition !== 'function') {
    if (!params || typeof params !== 'object') {
      return definition
    }
    const queryString = new URLSearchParams(
      Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== '')
    ).toString()
    return queryString ? `${definition}?${queryString}` : definition
  }

  if (params && typeof params === 'object') {
    const resourceId = params.pettyCash ?? params.id
    const query = { ...params }
    delete query.pettyCash
    delete query.id

    let url = definition(resourceId)
    const queryString = new URLSearchParams(
      Object.entries(query).filter(([, value]) => value !== undefined && value !== null && value !== '')
    ).toString()

    if (queryString) {
      url += `?${queryString}`
    }

    return url
  }

  return definition(params)
}
</script>
