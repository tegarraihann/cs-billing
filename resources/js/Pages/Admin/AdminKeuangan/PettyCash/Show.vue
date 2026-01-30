<template>
  <AdminKeuanganLayout>
    <div class="p-6 max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-4">
            <Link
              :href="route('admin-keuangan.petty-cash.index')"
              class="text-sage-600 hover:text-sage-800 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 class="text-2xl font-bold text-sage-800">Petty Cash Transaction Details</h1>
              <p class="text-sm text-sage-600">ID: {{ transaction.id }}</p>
            </div>
          </div>
          <div class="flex space-x-3">
            <Link
              :href="route('admin-keuangan.petty-cash.edit', transaction.id)"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
            <button
              @click="confirmDelete"
              class="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Transaction Details -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
            <h2 class="text-lg font-semibold text-sage-800 mb-4">Transaction Information</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Transaction Date</label>
                <p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg">
                  {{ formatDate(transaction.transaction_date) }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Transaction Type</label>
                <span :class="getTypeClass(transaction.type)" class="inline-flex px-3 py-1 rounded-full text-sm font-medium">
                  {{ getTypeLabel(transaction.type) }}
                </span>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Description</label>
                <p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg">
                  {{ transaction.description }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Category</label>
                <p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg">
                  {{ transaction.category?.name || '-' }}
                </p>
              </div>

              <div v-if="transaction.so_number">
                <label class="block text-sm font-medium text-sage-700 mb-2">Sales Order Number</label>
                <p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg">
                  {{ transaction.so_number }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">Status</label>
                <span :class="getStatusClass(transaction.status)" class="inline-flex px-3 py-1 rounded-full text-sm font-medium">
                  {{ getStatusLabel(transaction.status) }}
                </span>
              </div>
            </div>

            <div v-if="transaction.notes" class="mt-6">
              <label class="block text-sm font-medium text-sage-700 mb-2">Notes</label>
              <p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg">
                {{ transaction.notes }}
              </p>
            </div>
          </div>

          <!-- Receipt File -->
          <div v-if="transaction.receipt_file" class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
            <h2 class="text-lg font-semibold text-sage-800 mb-4">Receipt File</h2>
            <div class="flex items-center space-x-3">
              <svg class="w-8 h-8 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <p class="text-sm font-medium text-sage-900">{{ getFileName(transaction.receipt_file) }}</p>
                <a
                  :href="getFileUrl(transaction.receipt_file)"
                  target="_blank"
                  class="text-sm text-sage-600 hover:text-sage-800 transition-colors"
                >
                  View File
                </a>
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
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-sage-700">Amount:</span>
                <span class="text-lg font-bold" :class="getAmountClass(transaction.type)">
                  {{ transaction.type === 'expense' ? '-' : '+' }}{{ formatCurrency(transaction.amount) }}
                </span>
              </div>
              
              <div class="border-t border-sage-200 pt-4">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-sage-700">Balance After:</span>
                  <span class="text-lg font-bold text-sage-900">
                    {{ formatCurrency(transaction.balance_after) }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Transaction Meta -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
            <h2 class="text-lg font-semibold text-sage-800 mb-4">Additional Information</h2>
            
            <div class="space-y-4 text-sm">
              <div>
                <span class="font-medium text-sage-700">Created by:</span>
                <p class="text-sage-900 mt-1">{{ transaction.user?.name }}</p>
              </div>
              
              <div>
                <span class="font-medium text-sage-700">Created date:</span>
                <p class="text-sage-900 mt-1">{{ formatDateTime(transaction.created_at) }}</p>
              </div>
              
              <div v-if="transaction.updated_at !== transaction.created_at">
                <span class="font-medium text-sage-700">Last updated:</span>
                <p class="text-sage-900 mt-1">{{ formatDateTime(transaction.updated_at) }}</p>
              </div>

              <div v-if="transaction.approved_by && transaction.approved_at">
                <span class="font-medium text-sage-700">Approved by:</span>
                <p class="text-sage-900 mt-1">{{ transaction.approver?.name }}</p>
                <p class="text-sage-600 text-xs mt-1">{{ formatDateTime(transaction.approved_at) }}</p>
              </div>
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
          Are you sure you want to delete the transaction "{{ transaction.description }}"?
          This action cannot be undone and will affect the petty cash balance.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="deleteTransaction"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

// Props
defineProps({
  transaction: {
    type: Object,
    required: true
  }
})

// Reactive state
const showDeleteModal = ref(false)

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
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
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

const getStatusLabel = (status) => {
  const labels = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected'
  }
  return labels[status] || status
}

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-sage-100 text-sage-800'
}

const getAmountClass = (type) => {
  return type === 'expense' ? 'text-red-600' : 'text-green-600'
}

const getFileName = (filePath) => {
  if (!filePath) return ''
  return filePath.split('/').pop() || filePath
}

const getFileUrl = (filePath) => {
  if (!filePath) return '#'
  return `/storage/${filePath}`
}

const confirmDelete = () => {
  showDeleteModal.value = true
}

const deleteTransaction = () => {
  router.delete(route('admin-keuangan.petty-cash.destroy', transaction.id), {
    onSuccess: () => {
      router.visit(route('admin-keuangan.petty-cash.index'))
    }
  })
}

// Route helper
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.petty-cash.index': '/admin-keuangan/petty-cash',
    'admin-keuangan.petty-cash.edit': '/admin-keuangan/petty-cash',
    'admin-keuangan.petty-cash.destroy': '/admin-keuangan/petty-cash'
  }
  let url = routes[name] || '#'
  if (params) {
    url += `/${params}`
  }
  return url
}
</script>

<style scoped>
/* Sage color variables for consistency */
.bg-sage-50 { background-color: #f4f6f3; }
.bg-sage-100 { background-color: #e8ece5; }
.bg-sage-200 { background-color: #d4ddd0; }
.bg-sage-600 { background-color: #8db580; }
.bg-sage-700 { background-color: #7ba169; }
.text-sage-500 { color: #8db580; }
.text-sage-600 { color: #8db580; }
.text-sage-700 { color: #7ba169; }
.text-sage-800 { color: #6b8f5e; }
.text-sage-900 { color: #5a7a51; }
.border-sage-200 { border-color: #d4ddd0; }
.border-sage-300 { border-color: #c2ccbe; }
.hover\:bg-sage-50:hover { background-color: #f4f6f3; }
.hover\:text-sage-800:hover { color: #6b8f5e; }
</style>
