<template>
  <AdminKeuanganLayout>
    <div class="p-6 max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center space-x-4 mb-2">
          <Link
            :href="route('admin-keuangan.petty-cash.show', transaction.id)"
            class="text-sage-600 hover:text-sage-800 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 class="text-2xl font-bold text-sage-800">Edit Transaksi Petty Cash</h1>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-sm text-sage-600">Edit transaksi ID: {{ transaction.id }}</p>
          <div class="text-right">
            <div class="text-xs text-sage-500">Saldo Saat Ini</div>
            <div class="text-lg font-bold text-sage-800">
              {{ formatCurrency(currentBalance) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Tanggal Transaksi -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">
                Tanggal Transaksi <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.transaction_date"
                type="date"
                :max="today"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                :class="{ 'border-red-300': errors.transaction_date }"
              />
              <p v-if="errors.transaction_date" class="mt-1 text-sm text-red-600">
                {{ errors.transaction_date }}
              </p>
            </div>

            <!-- Jenis Transaksi -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">
                Jenis Transaksi <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.type"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                :class="{ 'border-red-300': errors.type }"
              >
                <option value="">Pilih Jenis Transaksi</option>
                <option value="expense">Pengeluaran</option>
                <option value="topup">Top Up</option>
                <option value="refund">Refund</option>
              </select>
              <p v-if="errors.type" class="mt-1 text-sm text-red-600">
                {{ errors.type }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Kategori -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">
                Kategori <span v-if="form.type === 'expense'" class="text-red-500">*</span>
              </label>
              <select
                v-model="form.category_id"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                :class="{ 'border-red-300': errors.category_id }"
                :disabled="form.type !== 'expense'"
              >
                <option value="">Pilih Kategori</option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>
              <p v-if="errors.category_id" class="mt-1 text-sm text-red-600">
                {{ errors.category_id }}
              </p>
              <p v-if="form.type !== 'expense'" class="mt-1 text-xs text-sage-500">
                Kategori hanya untuk transaksi pengeluaran
              </p>
            </div>

            <!-- Sumber Bank (untuk Top Up / Refund) -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">
                Sumber Bank <span v-if="['topup', 'refund'].includes(form.type)" class="text-red-500">*</span>
              </label>
              <select
                v-model="form.bank_account_id"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                :disabled="!['topup', 'refund'].includes(form.type)"
                :class="{ 'border-red-300': errors.bank_account_id }"
              >
                <option value="">Pilih Bank</option>
                <option v-for="bank in bankAccounts" :key="bank.id" :value="bank.id">
                  {{ bank.bank_name }} • {{ bank.account_number }} ({{ bank.account_name }})
                </option>
              </select>
              <p v-if="errors.bank_account_id" class="mt-1 text-sm text-red-600">
                {{ errors.bank_account_id }}
              </p>
              <p v-if="['topup', 'refund'].includes(form.type)" class="mt-1 text-xs text-sage-500">
                Saldo bank akan berkurang sesuai nominal top up/refund.
              </p>
            </div>

            <!-- Jumlah -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">
                Jumlah (Rp) <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                :class="{ 'border-red-300': errors.amount }"
              />
              <p v-if="errors.amount" class="mt-1 text-sm text-red-600">
                {{ errors.amount }}
              </p>
              <div v-if="form.amount && form.type === 'expense'" class="mt-1 text-xs" :class="willBeNegative ? 'text-red-500' : 'text-sage-500'">
                Saldo setelah transaksi: {{ formatCurrency(projectedBalance) }}
                <span v-if="willBeNegative" class="font-medium">(Saldo akan minus!)</span>
              </div>
              <div v-else-if="form.amount && form.type !== 'expense'" class="mt-1 text-xs text-sage-500">
                Saldo setelah transaksi: {{ formatCurrency(projectedBalance) }}
              </div>
            </div>
          </div>

          <!-- Deskripsi -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">
              Deskripsi <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.description"
              type="text"
              placeholder="Masukkan deskripsi transaksi"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
              :class="{ 'border-red-300': errors.description }"
            />
            <p v-if="errors.description" class="mt-1 text-sm text-red-600">
              {{ errors.description }}
            </p>
          </div>

          <!-- SO Number (Optional) -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">
              Nomor Sales Order (Opsional)
            </label>
            <input
              v-model="form.so_number"
              type="text"
              placeholder="Contoh: SO-2024-001"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
              :class="{ 'border-red-300': errors.so_number }"
            />
            <p v-if="errors.so_number" class="mt-1 text-sm text-red-600">
              {{ errors.so_number }}
            </p>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">
              Catatan (Opsional)
            </label>
            <textarea
              v-model="form.notes"
              rows="3"
              placeholder="Catatan tambahan untuk transaksi ini"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"
              :class="{ 'border-red-300': errors.notes }"
            ></textarea>
            <p v-if="errors.notes" class="mt-1 text-sm text-red-600">
              {{ errors.notes }}
            </p>
          </div>

          <!-- Receipt File Upload -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">
              File Bukti (Opsional)
            </label>
            
            <!-- Current file display -->
            <div v-if="transaction.receipt_file && !form.receipt_file" class="mb-3 p-3 bg-sage-50 rounded-lg">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="text-sm text-sage-700">File saat ini: {{ getFileName(transaction.receipt_file) }}</span>
                </div>
                <a
                  :href="getFileUrl(transaction.receipt_file)"
                  target="_blank"
                  class="text-sm text-sage-600 hover:text-sage-800 transition-colors"
                >
                  Lihat
                </a>
              </div>
            </div>

            <input
              ref="fileInput"
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              @change="handleFileChange"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
              :class="{ 'border-red-300': errors.receipt_file }"
            />
            <p class="mt-1 text-xs text-sage-500">
              Maksimal 2MB. Format yang didukung: JPG, PNG, PDF
              <br>
              <span class="font-medium">Pilih file baru untuk mengganti file yang sudah ada</span>
            </p>
            <p v-if="errors.receipt_file" class="mt-1 text-sm text-red-600">
              {{ errors.receipt_file }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-sage-200">
            <Link
              :href="route('admin-keuangan.petty-cash.show', transaction.id)"
              class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              :disabled="processing || willBeNegative"
              class="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="willBeNegative ? 'bg-red-600 hover:bg-red-700' : 'bg-sage-600 hover:bg-sage-700'"
            >
              <span v-if="processing" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25"></circle>
                  <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" class="opacity-75"></path>
                </svg>
                Menyimpan...
              </span>
              <span v-else>
                {{ willBeNegative ? 'Simpan (Saldo Minus!)' : 'Simpan Perubahan' }}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Link, useForm } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

// Props
const props = defineProps({
  transaction: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    required: true
  },
  bankAccounts: {
    type: Array,
    required: true
  },
  linkedBankAccountId: {
    type: [Number, String, null],
    default: null
  },
  currentBalance: {
    type: [Number, String],
    required: true
  },
  errors: {
    type: Object,
    default: () => ({})
  }
})

// Reactive state
const fileInput = ref(null)
const processing = ref(false)

// Form data - populate with existing transaction data
const form = useForm({
  transaction_date: props.transaction.transaction_date,
  description: props.transaction.description,
  category_id: props.transaction.category_id,
  amount: props.transaction.amount,
  type: props.transaction.type,
  bank_account_id: props.linkedBankAccountId || '',
  so_number: props.transaction.so_number || '',
  notes: props.transaction.notes || '',
  receipt_file: null
})

// Computed
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const projectedBalance = computed(() => {
  if (!form.amount || isNaN(form.amount)) return props.currentBalance
  
  const amount = parseFloat(form.amount)
  const originalAmount = parseFloat(props.transaction.amount)
  const originalType = props.transaction.type
  
  // Reverse the original transaction impact
  let adjustedBalance = parseFloat(props.currentBalance)
  if (originalType === 'expense') {
    adjustedBalance += originalAmount
  } else {
    adjustedBalance -= originalAmount
  }
  
  // Apply the new transaction
  if (form.type === 'expense') {
    return adjustedBalance - amount
  } else if (form.type === 'topup' || form.type === 'refund') {
    return adjustedBalance + amount
  }
  
  return adjustedBalance
})

const willBeNegative = computed(() => {
  return form.type === 'expense' && projectedBalance.value < 0
})

// Watchers
watch(() => form.type, (newType) => {
  if (newType !== 'expense') {
    form.category_id = ''
  }

  if (!['topup', 'refund'].includes(newType)) {
    form.bank_account_id = ''
  }
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount || 0)
}

const getFileName = (filePath) => {
  if (!filePath) return ''
  return filePath.split('/').pop() || filePath
}

const getFileUrl = (filePath) => {
  if (!filePath) return '#'
  return `/storage/${filePath}`
}

const handleFileChange = (event) => {
  const file = event.target.files[0]
  form.receipt_file = file
}

const submitForm = () => {
  if (willBeNegative.value) {
    if (!confirm('Transaksi ini akan membuat saldo petty cash menjadi minus. Apakah Anda yakin ingin melanjutkan?')) {
      return
    }
  }

  form.put(route('admin-keuangan.petty-cash.update', props.transaction.id), {
    onStart: () => processing.value = true,
    onFinish: () => processing.value = false
  })
}

// Route helper
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.petty-cash.show': '/admin-keuangan/petty-cash',
    'admin-keuangan.petty-cash.update': '/admin-keuangan/petty-cash'
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
.hover\:bg-sage-50:hover { background-color: #f4f6f3; }
.hover\:bg-sage-700:hover { background-color: #7ba169; }
.hover\:text-sage-800:hover { color: #6b8f5e; }
.focus\:ring-sage-500:focus { --tw-ring-color: #8db580; }
.focus\:border-sage-500:focus { border-color: #8db580; }
</style>
