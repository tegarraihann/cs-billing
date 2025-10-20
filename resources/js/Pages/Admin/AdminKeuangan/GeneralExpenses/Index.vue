<template>
  <AdminKeuanganLayout>
    <Head title="Pengeluaran Lain-lain" />

    <!-- Header -->
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Pengeluaran Lain-lain</h1>
            <p class="mt-1 text-sm text-gray-600">Kelola pengeluaran tanpa SO non petty cash</p>
          </div>
          <div class="flex items-center space-x-3">
            <button
              @click="exportData"
              class="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Download class="w-4 h-4 mr-2" />
              Export
            </button>
            <Link
              :href="route('admin-keuangan.general-expenses.create')"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            >
              <Plus class="w-4 h-4 mr-2" />
              Tambah Pengeluaran
            </Link>
          </div>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <DollarSign class="h-6 w-6 text-red-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Bulan Ini</dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ formatCurrency(stats?.current_month_total || 0) }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <Calendar class="h-6 w-6 text-blue-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Tahun Ini</dt>
                    <dd class="text-lg font-medium text-gray-900">
                      {{ formatCurrency(stats?.current_year_total || 0) }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <Clock class="h-6 w-6 text-yellow-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Draft</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats?.draft_count || 0 }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <CheckCircle class="h-6 w-6 text-green-400" />
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Approved</dt>
                    <dd class="text-lg font-medium text-gray-900">{{ stats?.approved_count || 0 }}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Filters -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Filter Pengeluaran</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Periode (Bulan-Tahun)</label>
                <input
                  v-model="formFilters.period"
                  type="month"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                <select
                  v-model="formFilters.category"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                >
                  <option value="">Semua Kategori</option>
                  <option value="Salary Staff">Gaji Staff</option>
                  <option value="Bank Admin">Biaya Admin Bank</option>
                  <option value="Reimbursements">Reimbursements</option>
                  <option value="Office Expenses">Biaya Kantor</option>
                  <option value="Other">Lainnya</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  v-model="formFilters.status"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                >
                  <option value="">Semua Status</option>
                  <option value="draft">Draft</option>
                  <option value="approved">Approved</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                <input
                  v-model="formFilters.expense_date"
                  type="date"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                />
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
                Filter
              </button>
            </div>
          </div>
        </div>

        <!-- Expenses Table -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Daftar Pengeluaran</h3>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periode</th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="expense in expenses?.data || []" :key="expense.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(expense.expense_date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div class="font-medium">{{ expense.category }}</div>
                    <div v-if="expense.notes" class="text-xs text-gray-500 mt-1">
                      {{ expense.notes.substring(0, 50) }}{{ expense.notes.length > 50 ? '...' : '' }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatPeriod(expense.period_month, expense.period_year) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    {{ formatCurrency(expense.total_amount) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ expense.items_count }} item{{ expense.items_count > 1 ? 's' : '' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <span :class="getStatusClass(expense.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                      {{ getStatusLabel(expense.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                    <div class="flex items-center justify-center space-x-2">
                      <Link
                        :href="route('admin-keuangan.general-expenses.show', expense.id)"
                        class="text-gray-600 hover:text-gray-800 transition-colors"
                        title="Lihat Detail"
                      >
                        <Eye class="w-4 h-4" />
                      </Link>
                      <Link
                        v-if="expense.status === 'draft'"
                        :href="route('admin-keuangan.general-expenses.edit', expense.id)"
                        class="text-blue-600 hover:text-blue-800 transition-colors"
                        title="Edit"
                      >
                        <Edit class="w-4 h-4" />
                      </Link>
                      <button
                        v-if="expense.status === 'draft' && expense.can_approve"
                        @click="approveExpense(expense)"
                        class="text-green-600 hover:text-green-800 transition-colors"
                        title="Approve"
                      >
                        <CheckCircle class="w-4 h-4" />
                      </button>
                      <button
                        v-if="expense.status === 'draft'"
                        @click="confirmDelete(expense)"
                        class="text-red-600 hover:text-red-800 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="!expenses?.data || expenses.data.length === 0">
                  <td colspan="7" class="px-6 py-12 text-center text-sm text-gray-500">
                    <div class="flex flex-col items-center">
                      <DollarSign class="w-12 h-12 text-gray-300 mb-4" />
                      <h3 class="text-lg font-medium text-gray-900 mb-2">Belum ada pengeluaran</h3>
                      <p class="text-sm text-gray-500 mb-4">Mulai dengan menambahkan pengeluaran pertama</p>
                      <Link
                        :href="route('admin-keuangan.general-expenses.create')"
                        class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700"
                      >
                        <Plus class="w-4 h-4 mr-2" />
                        Tambah Pengeluaran Pertama
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="expenses?.links && expenses.links.length > 3" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div class="flex-1 flex justify-between sm:hidden">
              <Link
                v-if="expenses.prev_page_url"
                :href="expenses.prev_page_url"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Previous
              </Link>
              <Link
                v-if="expenses.next_page_url"
                :href="expenses.next_page_url"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Next
              </Link>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Menampilkan
                  <span class="font-medium">{{ expenses?.from ?? 0 }}</span>
                  sampai
                  <span class="font-medium">{{ expenses?.to ?? 0 }}</span>
                  dari
                  <span class="font-medium">{{ expenses?.total ?? 0 }}</span>
                  pengeluaran
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <template v-for="link in expenses?.links || []" :key="link.label">
                    <Link
                      v-if="link.url"
                      :href="link.url"
                      :class="[
                        'relative inline-flex items-center px-2 py-2 text-sm font-medium',
                        link.active
                          ? 'z-10 bg-sage-50 border-sage-500 text-sage-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                        link.label.includes('Previous') ? 'rounded-l-md' : '',
                        link.label.includes('Next') ? 'rounded-r-md' : '',
                        !link.label.includes('Previous') && !link.label.includes('Next') ? 'border-t border-b' : 'border'
                      ]"
                      v-html="link.label"
                    />
                    <span
                      v-else
                      :class="[
                        'relative inline-flex items-center px-2 py-2 text-sm font-medium',
                        'bg-white border-gray-300 text-gray-300 cursor-default',
                        link.label.includes('Previous') ? 'rounded-l-md' : '',
                        link.label.includes('Next') ? 'rounded-r-md' : '',
                        !link.label.includes('Previous') && !link.label.includes('Next') ? 'border-t border-b' : 'border'
                      ]"
                      v-html="link.label"
                    />
                  </template>
                </nav>
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
          <h3 class="text-lg font-medium text-gray-900 mb-4">Konfirmasi Hapus</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Apakah Anda yakin ingin menghapus pengeluaran kategori "{{ selectedExpense?.category }}"?
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
          <div class="flex justify-center space-x-3 mt-4">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Batal
            </button>
            <button
              @click="deleteExpense"
              class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { DollarSign, Plus, Download, Calendar, Clock, CheckCircle, Eye, Edit, Trash2 } from 'lucide-vue-next'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

// Props
const props = defineProps({
  expenses: {
    type: Object,
    default: () => ({
      data: [],
      links: [],
      from: 0,
      to: 0,
      total: 0
    })
  },
  stats: {
    type: Object,
    default: () => ({
      current_month_total: 0,
      current_year_total: 0,
      draft_count: 0,
      approved_count: 0
    })
  },
  filters: {
    type: Object,
    default: () => ({})
  }
})

// Reactive state
const formFilters = reactive({
  period: props.filters.period || '',
  category: props.filters.category || '',
  status: props.filters.status || '',
  expense_date: props.filters.expense_date || ''
})

const showDeleteModal = ref(false)
const selectedExpense = ref(null)

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

const formatPeriod = (month, year) => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
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

const applyFilters = () => {
  router.get(route('admin-keuangan.general-expenses.index'), formFilters, {
    preserveState: true,
    preserveScroll: true
  })
}

const clearFilters = () => {
  Object.keys(formFilters).forEach(key => {
    formFilters[key] = ''
  })
  router.get(route('admin-keuangan.general-expenses.index'))
}

const confirmDelete = (expense) => {
  selectedExpense.value = expense
  showDeleteModal.value = true
}

const deleteExpense = () => {
  if (selectedExpense.value) {
    router.delete(route('admin-keuangan.general-expenses.destroy', selectedExpense.value.id), {
      onSuccess: () => {
        showDeleteModal.value = false
        selectedExpense.value = null
      }
    })
  }
}

const approveExpense = (expense) => {
  router.post(route('admin-keuangan.general-expenses.approve', expense.id), {}, {
    preserveState: true,
    preserveScroll: true
  })
}

const exportData = () => {
  window.open(route('admin-keuangan.general-expenses.export', formFilters), '_blank')
}

// Route helper
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.general-expenses.index': '/admin-keuangan/general-expenses',
    'admin-keuangan.general-expenses.create': '/admin-keuangan/general-expenses/create',
    'admin-keuangan.general-expenses.show': (id) => `/admin-keuangan/general-expenses/${id}`,
    'admin-keuangan.general-expenses.edit': (id) => `/admin-keuangan/general-expenses/${id}/edit`,
    'admin-keuangan.general-expenses.destroy': (id) => `/admin-keuangan/general-expenses/${id}`,
    'admin-keuangan.general-expenses.approve': (id) => `/admin-keuangan/general-expenses/${id}/approve`,
    'admin-keuangan.general-expenses.export': '/admin-keuangan/general-expenses/export'
  }
  return typeof routes[name] === 'function' ? routes[name](params) : routes[name] || '#'
}
</script>