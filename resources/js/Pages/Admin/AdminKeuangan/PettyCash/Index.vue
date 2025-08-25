<template>
  <AdminKeuanganLayout>
    <div class="p-6 space-y-6">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 class="text-2xl font-bold text-sage-800">Petty Cash Management</h1>
          <p class="text-sm text-sage-600">Kelola transaksi petty cash harian</p>
        </div>
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <div class="text-right">
            <div class="text-xs text-sage-500">Saldo Saat Ini</div>
            <div class="text-xl font-bold text-sage-800">
              {{ formatCurrency(currentBalance) }}
            </div>
          </div>
          <Link
            :href="route('admin-keuangan.petty-cash.create')"
            class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Tambah Transaksi
          </Link>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">Tanggal Mulai</label>
            <input
              v-model="filters.start_date"
              type="date"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">Tanggal Selesai</label>
            <input
              v-model="filters.end_date"
              type="date"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">Kategori</label>
            <select
              v-model="filters.category_id"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
            >
              <option value="">Semua Kategori</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">Jenis</label>
            <select
              v-model="filters.type"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
            >
              <option value="">Semua Jenis</option>
              <option value="expense">Pengeluaran</option>
              <option value="topup">Top Up</option>
              <option value="refund">Refund</option>
            </select>
          </div>
        </div>
        <div class="flex justify-end space-x-3 mt-4">
          <button
            @click="clearFilters"
            class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
          >
            Clear
          </button>
          <button
            @click="applyFilters"
            class="px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-lg hover:bg-sage-700 transition-colors"
          >
            Filter
          </button>
        </div>
      </div>

      <!-- Transactions Table -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
        <div class="px-6 py-4 border-b border-sage-200">
          <h3 class="text-lg font-medium text-sage-800">Daftar Transaksi</h3>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-sage-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Tanggal</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Deskripsi</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Kategori</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">Jenis</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider">Jumlah</th>
                <th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider">Saldo</th>
                <th class="px-6 py-3 text-center text-xs font-medium text-sage-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-sage-200">
              <tr v-for="transaction in transactions.data" :key="transaction.id" class="hover:bg-sage-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-sage-900">
                  {{ formatDate(transaction.transaction_date) }}
                </td>
                <td class="px-6 py-4 text-sm text-sage-900">
                  <div class="font-medium">{{ transaction.description }}</div>
                  <div v-if="transaction.so_number" class="text-xs text-sage-500">
                    SO: {{ transaction.so_number }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-sage-900">
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
                <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-sage-900">
                  {{ formatCurrency(transaction.balance_after) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                  <div class="flex items-center justify-center space-x-2">
                    <Link
                      :href="route('admin-keuangan.petty-cash.show', transaction.id)"
                      class="text-sage-600 hover:text-sage-800 transition-colors"
                      title="Lihat Detail"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                    <Link
                      :href="route('admin-keuangan.petty-cash.edit', transaction.id)"
                      class="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Edit"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button
                      @click="confirmDelete(transaction)"
                      class="text-red-600 hover:text-red-800 transition-colors"
                      title="Hapus"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="transactions.data.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-sm text-sage-500">
                  Tidak ada transaksi ditemukan
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div v-if="transactions.links.length > 3" class="px-6 py-4 border-t border-sage-200">
          <div class="flex items-center justify-between">
            <div class="text-sm text-sage-700">
              Menampilkan {{ transactions.from ?? 0 }} sampai {{ transactions.to ?? 0 }} dari {{ transactions.total }} transaksi
            </div>
            <nav class="flex space-x-1">
              <Link
                v-for="link in transactions.links"
                :key="link.label"
                :href="link.url"
                :class="[
                  'px-3 py-2 text-sm rounded-lg transition-colors',
                  link.active
                    ? 'bg-sage-600 text-white'
                    : link.url
                    ? 'text-sage-700 hover:bg-sage-100'
                    : 'text-sage-400 cursor-not-allowed'
                ]"
                v-html="link.label"
              />
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h3 class="text-lg font-medium text-sage-900 mb-4">Konfirmasi Hapus</h3>
        <p class="text-sm text-sage-600 mb-6">
          Apakah Anda yakin ingin menghapus transaksi "{{ selectedTransaction?.description }}"? 
          Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi saldo petty cash.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
          >
            Batal
          </button>
          <button
            @click="deleteTransaction"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Link, router } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

// Props
defineProps({
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

// Reactive state
const filters = reactive({
  start_date: '',
  end_date: '',
  category_id: '',
  type: '',
  status: ''
})

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
    expense: 'Pengeluaran',
    topup: 'Top Up',
    refund: 'Refund'
  }
  return labels[type] || type
}

const getTypeClass = (type) => {
  const classes = {
    expense: 'bg-red-100 text-red-800',
    topup: 'bg-green-100 text-green-800',
    refund: 'bg-blue-100 text-blue-800'
  }
  return classes[type] || 'bg-sage-100 text-sage-800'
}

const getAmountClass = (type) => {
  return type === 'expense' ? 'text-red-600' : 'text-green-600'
}

const applyFilters = () => {
  router.get(route('admin-keuangan.petty-cash.index'), filters, {
    preserveState: true,
    preserveScroll: true
  })
}

const clearFilters = () => {
  Object.keys(filters).forEach(key => {
    filters[key] = ''
  })
  router.get(route('admin-keuangan.petty-cash.index'))
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

// Route helper
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.petty-cash.index': '/admin-keuangan/petty-cash',
    'admin-keuangan.petty-cash.create': '/admin-keuangan/petty-cash/create',
    'admin-keuangan.petty-cash.show': '/admin-keuangan/petty-cash',
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
.border-sage-500 { border-color: #8db580; }
</style>