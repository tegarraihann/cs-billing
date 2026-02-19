<template>
  <AdminKeuanganLayout>
    <Head title="Edit General Expense" />

    <div class="p-6 max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center space-x-4 mb-2">
          <Link
            :href="route('admin-keuangan.general-expenses.index', returnQuery)"
            class="text-sage-600 hover:text-sage-800 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 class="text-2xl font-bold text-sage-800">Edit General Expense</h1>
        </div>
        <div class="flex justify-between items-center">
          <p class="text-sm text-sage-600">Edit non-SO, non-petty cash expense</p>
          <div class="flex items-center space-x-2">
            <span :class="getStatusClass(generalExpense.status)" class="px-2 py-1 rounded-full text-xs font-medium">
              {{ getStatusLabel(generalExpense.status) }}
            </span>
            <span class="text-xs text-sage-500">ID: {{ generalExpense.id }}</span>
          </div>
        </div>
      </div>

      <!-- Alert for approved expenses -->
      <div v-if="generalExpense.status === 'approved'" class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div class="flex items-center">
          <svg class="w-5 h-5 text-yellow-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <div>
            <h4 class="text-sm font-medium text-yellow-800">Expense Already Approved</h4>
            <p class="text-sm text-yellow-700 mt-1">
              This expense has already been approved. Any changes will reset the status to Draft.
            </p>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Header Information -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Tanggal Pengeluaran -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">
                Expense Date <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.expense_date"
                type="date"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                :class="{ 'border-red-300': errors.expense_date }"
              />
              <p v-if="errors.expense_date" class="mt-1 text-sm text-red-600">
                {{ errors.expense_date }}
              </p>
            </div>

            <!-- Kategori -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">
                Category <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.category"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                :class="{ 'border-red-300': errors.category }"
                :disabled="categoryOptions.length === 0"
              >
                <option value="" disabled>Select Category</option>
                <option
                  v-for="category in categoryOptions"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
              <p v-if="categoryOptions.length === 0" class="mt-1 text-sm text-sage-500">
                No active categories. Please add categories in the Operational Cost Categories master first.
              </p>
              <p v-if="errors.category" class="mt-1 text-sm text-red-600">
                {{ errors.category }}
              </p>
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">
                Status <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.status"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                :class="{ 'border-red-300': errors.status }"
              >
                <option value="draft">Draft</option>
                <option value="approved">Approved</option>
              </select>
              <p v-if="errors.status" class="mt-1 text-sm text-red-600">
                {{ errors.status }}
              </p>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              v-model="form.notes"
              rows="3"
              placeholder="General notes for this expense"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"
              :class="{ 'border-red-300': errors.notes }"
            ></textarea>
            <p v-if="errors.notes" class="mt-1 text-sm text-red-600">
              {{ errors.notes }}
            </p>
          </div>

          <!-- Akun P&L -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">
              Expense Account (P&L) <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.pl_account_id"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
              :class="{ 'border-red-300': errors.pl_account_id }"
            >
              <option value="">Select Account</option>
              <option v-for="acc in expenseAccounts" :key="acc.id" :value="acc.id">
                {{ acc.account_code }} - {{ acc.account_name }}
              </option>
            </select>
            <p v-if="errors.pl_account_id" class="mt-1 text-sm text-red-600">
              {{ errors.pl_account_id }}
            </p>
            <p class="mt-1 text-xs text-sage-500">
              This expense will be recorded to this account in the profit & loss report.
            </p>
          </div>

          <!-- Bank Source -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">
              Source Bank <span v-if="form.status === 'approved'" class="text-red-500">*</span>
            </label>
            <select
              v-model="form.bank_account_id"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
              :class="{ 'border-red-300': errors.bank_account_id }"
            >
              <option value="">Select Bank</option>
              <option v-for="bank in bankAccounts" :key="bank.id" :value="bank.id">
                {{ bank.bank_name }} • {{ bank.account_number }} ({{ bank.account_name }})
              </option>
            </select>
            <p v-if="errors.bank_account_id" class="mt-1 text-sm text-red-600">
              {{ errors.bank_account_id }}
            </p>
            <p class="mt-1 text-xs text-sage-500">
              When status is Approved, the expense will automatically debit the selected bank balance.
            </p>
          </div>

          <!-- Items Section -->
          <div class="border-t border-sage-200 pt-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-sage-800">Expense Item Details</h3>
              <button
                type="button"
                @click="addItem"
                class="inline-flex items-center px-3 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
              >
                <Plus class="w-4 h-4 mr-2" />
                Add Item
              </button>
            </div>

            <!-- Items List -->
            <div class="space-y-4">
              <div
                v-for="(item, index) in form.items"
                :key="index"
                class="p-4 border border-sage-200 rounded-lg bg-white"
              >
                <div class="flex justify-between items-start mb-4">
                  <h4 class="text-sm font-medium text-sage-700">Item #{{ index + 1 }}</h4>
                  <button
                    v-if="form.items.length > 1"
                    type="button"
                    @click="removeItem(index)"
                    class="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete Item"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Description -->
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-2">
                      Description <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="item.description"
                      type="text"
                      placeholder="Example: Bank Admin Fee for January"
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                      :class="{ 'border-red-300': errors[`items.${index}.description`] }"
                    />
                    <p v-if="errors[`items.${index}.description`]" class="mt-1 text-sm text-red-600">
                      {{ errors[`items.${index}.description`] }}
                    </p>
                  </div>

                  <!-- Amount -->
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-2">
                      Amount (Rp) <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="item.amount"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0"
                      @input="calculateTotal"
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                      :class="{ 'border-red-300': errors[`items.${index}.amount`] }"
                    />
                    <p v-if="errors[`items.${index}.amount`]" class="mt-1 text-sm text-red-600">
                      {{ errors[`items.${index}.amount`] }}
                    </p>
                  </div>
                </div>

                <!-- Item Notes -->
                <div class="mt-4">
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Item Notes (Optional)
                  </label>
                  <textarea
                    v-model="item.notes"
                    rows="2"
                    placeholder="Notes for this item"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"
                    :class="{ 'border-red-300': errors[`items.${index}.notes`] }"
                  ></textarea>
                  <p v-if="errors[`items.${index}.notes`]" class="mt-1 text-sm text-red-600">
                    {{ errors[`items.${index}.notes`] }}
                  </p>
                </div>
              </div>

              <!-- Empty state when no items -->
              <div v-if="form.items.length === 0" class="text-center py-8 text-gray-500">
                <DollarSign class="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p class="text-sm">No expense items yet</p>
                <p class="text-xs mt-1">Click "Add Item" to add an expense item</p>
              </div>
            </div>

            <!-- Total Summary -->
            <div v-if="form.items.length > 0" class="mt-6 p-4 bg-white border border-sage-200 rounded-lg">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-sage-700">Total Amount:</span>
                <span class="text-lg font-bold text-sage-800">{{ formatCurrency(calculatedTotal) }}</span>
              </div>
              <div class="flex justify-between items-center mt-1">
                <span class="text-xs text-sage-600">{{ form.items.length }} item{{ form.items.length > 1 ? 's' : '' }}</span>
                <span class="text-xs text-sage-600">Period: {{ formatCurrentPeriod() }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-sage-200">
            <Link
              :href="route('admin-keuangan.general-expenses.index', returnQuery)"
              class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
            >
              Cancel
            </Link>
            <Link
              :href="route('admin-keuangan.general-expenses.show', {
                generalExpense: generalExpense.id,
                ...returnQuery
              })"
              class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
            >
              View Details
            </Link>
            <button
              type="submit"
              :disabled="processing || form.items.length === 0 || categoryOptions.length === 0"
              class="px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-lg hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="processing">Saving...</span>
              <span v-else>Update Expense</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Plus, Trash2, DollarSign } from 'lucide-vue-next'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

// Props
const props = defineProps({
  generalExpense: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    default: () => []
  },
  bankAccounts: {
    type: Array,
    default: () => []
  },
  expenseAccounts: {
    type: Array,
    default: () => []
  },
  returnQuery: {
    type: Object,
    default: () => ({})
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})

// Form state
const form = useForm({
  expense_date: props.generalExpense.expense_date,
  category: props.generalExpense.category,
  status: props.generalExpense.status,
  notes: props.generalExpense.notes || '',
  bank_account_id: '',
  pl_account_id: props.generalExpense.pl_account_id || '',
  items: props.generalExpense.items?.map(item => ({
    id: item.id,
    description: item.description,
    amount: item.amount,
    notes: item.notes || ''
  })) || []
})

const processing = ref(false)
const errors = ref(props.errors)
const categoryOptions = computed(() => props.categories ?? [])
const bankAccounts = computed(() => props.bankAccounts ?? [])
const expenseAccounts = computed(() => props.expenseAccounts ?? [])

watch(
  bankAccounts,
  (options) => {
    if (!form.bank_account_id && options.length > 0) {
      form.bank_account_id = options[0].id
    }
  },
  { immediate: true }
)

watch(
  expenseAccounts,
  (options) => {
    if (!form.pl_account_id && options.length > 0) {
      form.pl_account_id = options[0].id
    }
  },
  { immediate: true }
)

watch(
  categoryOptions,
  (options) => {
    if (!options.length) {
      return
    }

    if (!options.includes(form.category)) {
      form.category = options[0]
    }
  },
  { immediate: true }
)

// Computed properties
const calculatedTotal = computed(() => {
  return form.items.reduce((total, item) => {
    return total + (parseFloat(item.amount) || 0)
  }, 0)
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatCurrentPeriod = () => {
  if (!form.expense_date) return ''

  const date = new Date(form.expense_date)
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
}

const getStatusLabel = (status) => {
  const labels = {
    draft: 'Draft',
    approved: 'Approved'
  }
  return labels[status] || status
}

const getStatusClass = (status) => {
  const classes = {
    draft: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const addItem = () => {
  form.items.push({
    description: '',
    amount: '',
    notes: ''
  })
}

const removeItem = (index) => {
  if (form.items.length > 1) {
    form.items.splice(index, 1)
    calculateTotal()
  }
}

const calculateTotal = () => {
  // This will trigger the computed property to recalculate
  // The total is automatically calculated via the computed property
}

const submitForm = () => {
  processing.value = true

  // Set total_amount to calculated total
  form.total_amount = calculatedTotal.value

  form.put(route('admin-keuangan.general-expenses.update', {
    generalExpense: props.generalExpense.id,
    ...props.returnQuery
  }), {
    onSuccess: () => {
      processing.value = false
    },
    onError: (formErrors) => {
      processing.value = false
      errors.value = formErrors
    }
  })
}

// Initialize form with at least one item if none exist
onMounted(() => {
  if (form.items.length === 0) {
    addItem()
  }
})

// Route helper
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.general-expenses.index': '/admin-keuangan/general-expenses',
    'admin-keuangan.general-expenses.show': (id) => `/admin-keuangan/general-expenses/${id}`,
    'admin-keuangan.general-expenses.update': (id) => `/admin-keuangan/general-expenses/${id}`
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
    const resourceId = params.generalExpense ?? params.id
    const query = { ...params }
    delete query.generalExpense
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
