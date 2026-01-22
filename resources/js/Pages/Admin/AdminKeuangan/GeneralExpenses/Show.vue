<template>
  <AdminKeuanganLayout>
    <Head title="General Expense Details" />

    <div class="p-6 max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4">
            <Link
              :href="route('admin-keuangan.general-expenses.index')"
              class="text-sage-600 hover:text-sage-800 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 class="text-2xl font-bold text-sage-800">General Expense Details</h1>
              <p class="text-sm text-sage-600">ID: {{ generalExpense.id }}</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <span :class="getStatusClass(generalExpense.status)" class="px-3 py-1 rounded-full text-sm font-medium">
              {{ getStatusLabel(generalExpense.status) }}
            </span>
            <div class="flex space-x-2">
              <Link
                v-if="generalExpense.status === 'draft'"
                :href="route('admin-keuangan.general-expenses.edit', generalExpense.id)"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Edit class="w-4 h-4 mr-2" />
                Edit
              </Link>
              <button
                v-if="generalExpense.status === 'draft' && generalExpense.can_approve"
                @click="approveExpense"
                class="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <CheckCircle class="w-4 h-4 mr-2" />
                Approve
              </button>
              <button
                v-if="generalExpense.status === 'draft'"
                @click="confirmDelete"
                class="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <Trash2 class="w-4 h-4 mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Expense Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
            <h2 class="text-lg font-semibold text-sage-800 mb-4">Expense Information</h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Expense Date</label>
                <p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg">
                  {{ formatDate(generalExpense.expense_date) }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Category</label>
                <p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg">
                  {{ generalExpense.category }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Period</label>
                <p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg">
                  {{ formatPeriod(generalExpense.period_month, generalExpense.period_year) }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Status</label>
                <span :class="getStatusClass(generalExpense.status)" class="inline-flex px-3 py-1 rounded-full text-sm font-medium">
                  {{ getStatusLabel(generalExpense.status) }}
                </span>
              </div>
            </div>

            <div v-if="generalExpense.notes" class="mt-6">
              <label class="block text-sm font-medium text-sage-700 mb-2">Notes</label>
              <p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg">
                {{ generalExpense.notes }}
              </p>
            </div>
          </div>

          <!-- Items List -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
            <h2 class="text-lg font-semibold text-sage-800 mb-4">Expense Item Details</h2>

            <div class="space-y-4">
              <div
                v-for="(item, index) in generalExpense.items"
                :key="item.id"
                class="p-4 border border-sage-200 rounded-lg bg-sage-50"
              >
                <div class="flex justify-between items-start mb-3">
                  <h3 class="text-sm font-medium text-sage-800">Item #{{ index + 1 }}</h3>
                  <span class="text-lg font-semibold text-sage-900">{{ formatCurrency(item.amount) }}</span>
                </div>

                <div class="grid grid-cols-1 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-1">Description</label>
                    <p class="text-sm text-sage-900">{{ item.description }}</p>
                  </div>

                  <div v-if="item.notes">
                    <label class="block text-sm font-medium text-sage-700 mb-1">Item Notes</label>
                    <p class="text-sm text-sage-600">{{ item.notes }}</p>
                  </div>
                </div>
              </div>

              <!-- Empty state -->
              <div v-if="!generalExpense.items || generalExpense.items.length === 0" class="text-center py-8 text-gray-500">
                <DollarSign class="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p class="text-sm">No expense items</p>
              </div>
            </div>

            <!-- Items Summary -->
            <div v-if="generalExpense.items && generalExpense.items.length > 0" class="mt-6 pt-4 border-t border-sage-200">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-sage-700">Total {{ generalExpense.items.length }} item{{ generalExpense.items.length > 1 ? 's' : '' }}:</span>
                <span class="text-lg font-bold text-sage-900">{{ formatCurrency(generalExpense.total_amount) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary and Meta -->
        <div class="space-y-6">
          <!-- Amount Summary -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
            <h2 class="text-lg font-semibold text-sage-800 mb-4">Amount Summary</h2>

            <div class="space-y-4">
              <div class="text-center">
                <div class="text-3xl font-bold text-red-600 mb-2">
                  {{ formatCurrency(generalExpense.total_amount) }}
                </div>
                <div class="text-sm text-sage-600">
                  Total Expense
                </div>
              </div>

              <div class="border-t border-sage-200 pt-4">
                <div class="flex justify-between items-center text-sm">
                  <span class="text-sage-600">Item Count:</span>
                  <span class="font-medium">{{ generalExpense.items?.length || 0 }}</span>
                </div>
                <div class="flex justify-between items-center text-sm mt-2">
                  <span class="text-sage-600">Average per Item:</span>
                  <span class="font-medium">
                    {{ generalExpense.items?.length > 0 ? formatCurrency(generalExpense.total_amount / generalExpense.items.length) : formatCurrency(0) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Expense Meta -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
            <h2 class="text-lg font-semibold text-sage-800 mb-4">Additional Information</h2>

            <div class="space-y-4 text-sm">
              <div>
                <span class="font-medium text-sage-700">Created by:</span>
                <p class="text-sage-900 mt-1">{{ generalExpense.creator?.name || '-' }}</p>
              </div>

              <div>
                <span class="font-medium text-sage-700">Created date:</span>
                <p class="text-sage-900 mt-1">{{ formatDateTime(generalExpense.created_at) }}</p>
              </div>

              <div v-if="generalExpense.updated_at !== generalExpense.created_at">
                <span class="font-medium text-sage-700">Last updated:</span>
                <p class="text-sage-900 mt-1">{{ formatDateTime(generalExpense.updated_at) }}</p>
              </div>

              <div v-if="generalExpense.approved_by && generalExpense.approved_at">
                <span class="font-medium text-sage-700">Approved by:</span>
                <p class="text-sage-900 mt-1">{{ generalExpense.approver?.name || '-' }}</p>
                <p class="text-sage-600 text-xs mt-1">{{ formatDateTime(generalExpense.approved_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
            <h2 class="text-lg font-semibold text-sage-800 mb-4">Actions</h2>

            <div class="space-y-3">
              <Link
                :href="route('admin-keuangan.general-expenses.index')"
                class="w-full inline-flex justify-center items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-700 transition-colors"
              >
                <ArrowLeft class="w-4 h-4 mr-2" />
                Back to List
              </Link>

              <button
                @click="exportExpense"
                class="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download class="w-4 h-4 mr-2" />
                Export Detail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-sage-900 mb-4">Confirm Delete</h3>
        <p class="text-sm text-sage-600 mb-6">
          Are you sure you want to delete the expense in category "{{ generalExpense.category }}"?
          This action cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="deleteExpense"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Approve Confirmation Modal -->
    <div v-if="showApproveModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-sage-900 mb-4">Confirm Approval</h3>
        <p class="text-sm text-sage-600 mb-6">
          Are you sure you want to approve the expense in category "{{ generalExpense.category }}"
          with a total of {{ formatCurrency(generalExpense.total_amount) }}?
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showApproveModal = false"
            class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="confirmApprove"
            class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref } from 'vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { Edit, Trash2, CheckCircle, DollarSign, ArrowLeft, Download } from 'lucide-vue-next'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

// Props
const props = defineProps({
  generalExpense: {
    type: Object,
    required: true
  }
})

// Reactive state
const showDeleteModal = ref(false)
const showApproveModal = ref(false)

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
    month: 'long',
    year: 'numeric'
  })
}

const formatDateTime = (datetime) => {
  return new Date(datetime).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatPeriod = (month, year) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return `${monthNames[month - 1]} ${year}`
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

const confirmDelete = () => {
  showDeleteModal.value = true
}

const deleteExpense = () => {
  router.delete(route('admin-keuangan.general-expenses.destroy', props.generalExpense.id), {
    onSuccess: () => {
      showDeleteModal.value = false
    }
  })
}

const approveExpense = () => {
  showApproveModal.value = true
}

const confirmApprove = () => {
  router.post(route('admin-keuangan.general-expenses.approve', props.generalExpense.id), {}, {
    onSuccess: () => {
      showApproveModal.value = false
    }
  })
}

const exportExpense = () => {
  window.open(route('admin-keuangan.general-expenses.export', { id: props.generalExpense.id }), '_blank')
}

// Route helper
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.general-expenses.index': '/admin-keuangan/general-expenses',
    'admin-keuangan.general-expenses.edit': (id) => `/admin-keuangan/general-expenses/${id}/edit`,
    'admin-keuangan.general-expenses.destroy': (id) => `/admin-keuangan/general-expenses/${id}`,
    'admin-keuangan.general-expenses.approve': (id) => `/admin-keuangan/general-expenses/${id}/approve`,
    'admin-keuangan.general-expenses.export': '/admin-keuangan/general-expenses/export'
  }
  return typeof routes[name] === 'function' ? routes[name](params) : routes[name] || '#'
}
</script>
