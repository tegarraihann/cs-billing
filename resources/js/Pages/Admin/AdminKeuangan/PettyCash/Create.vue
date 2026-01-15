<template>
  <AdminKeuanganLayout>
    <div class="p-6 max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center space-x-4 mb-2">
          <Link
            :href="route('admin-keuangan.petty-cash.index')"
            class="text-sage-600 hover:text-sage-800 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 class="text-2xl font-bold text-sage-800">Tambah Transaksi Petty Cash</h1>
        </div>
        <div class="flex items-center justify-between">
          <p class="text-sm text-sage-600">Buat transaksi baru untuk petty cash</p>
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

            <!-- Akun Beban (P&L) -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">
                Akun Beban (P&L) <span v-if="form.type === 'expense'" class="text-red-500">*</span>
              </label>
              <SearchableSelect
                v-model="form.pl_account_id"
                :options="plAccountOptions"
                placeholder="Pilih Akun"
                :input-class="plAccountInputClass"
                :disabled="form.type !== 'expense'"
                :search-fields="['label', 'code', 'name']"
              />
              <p v-if="errors.pl_account_id" class="mt-1 text-sm text-red-600">
                {{ errors.pl_account_id }}
              </p>
              <p v-if="form.type !== 'expense'" class="mt-1 text-xs text-sage-500">
                Akun P&L hanya untuk transaksi pengeluaran
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
            </p>
            <p v-if="errors.receipt_file" class="mt-1 text-sm text-red-600">
              {{ errors.receipt_file }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-sage-200">
            <Link
              :href="route('admin-keuangan.petty-cash.index')"
              class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              :disabled="isDisabled"
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
                {{ willBeNegative ? 'Simpan (Saldo Minus!)' : 'Simpan Transaksi' }}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { Link, useForm } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import SearchableSelect from '@/Components/SearchableSelect.vue'

// Props
const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  expenseAccounts: {
    type: Array,
    default: () => []
  },
  bankAccounts: {
    type: Array,
    required: true
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

// Form data
const form = useForm({
  transaction_date: new Date().toISOString().split('T')[0],
  description: '',
  category_id: '',
  pl_account_id: '',
  amount: '',
  type: '',
  bank_account_id: '',
  so_number: '',
  notes: '',
  receipt_file: null
})

const errors = computed(() => props.errors ?? {})
const expenseAccounts = computed(() => props.expenseAccounts ?? [])
const plAccountOptions = computed(() => {
  return expenseAccounts.value.map((account) => ({
    value: account.id,
    label: `${account.account_code} - ${account.account_name}`,
    code: account.account_code,
    name: account.account_name
  }))
})

// Computed
const today = computed(() => {
  return new Date().toISOString().split('T')[0]
})

const projectedBalance = computed(() => {
  if (!form.amount || isNaN(form.amount)) return props.currentBalance
  
  const amount = parseFloat(form.amount)
  if (form.type === 'expense') {
    return props.currentBalance - amount
  } else if (form.type === 'topup' || form.type === 'refund') {
    return parseFloat(props.currentBalance) + amount
  }
  
  return props.currentBalance
})

const willBeNegative = computed(() => {
  return form.type === 'expense' && projectedBalance.value < 0
})

const isDisabled = computed(() => {
  if (processing.value) return true
  // wajib umum
  if (!form.transaction_date || !form.type || !form.amount || !form.description) return true
  // jika expense, wajib kategori
  if (form.type === 'expense' && !form.category_id) return true
  if (form.type === 'expense' && !form.pl_account_id) return true
  // jika topup/refund, wajib bank
  if (['topup', 'refund'].includes(form.type) && !form.bank_account_id) return true
  // amount harus > 0
  if (parseFloat(form.amount) <= 0) return true
  return false
})

const plAccountInputClass = computed(() => {
  const base = 'w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm'
  const border = errors.value?.pl_account_id ? 'border-red-300' : 'border-sage-300'
  return `${base} ${border}`
})

// Watchers
watch(() => form.type, (newType) => {
  if (newType !== 'expense') {
    form.category_id = ''
    form.pl_account_id = ''
  } else if (!form.pl_account_id && expenseAccounts.value.length > 0) {
    form.pl_account_id = expenseAccounts.value[0].id
  }

  if (!['topup', 'refund'].includes(newType)) {
    form.bank_account_id = ''
  }
})

watch(
  expenseAccounts,
  (options) => {
    if (form.type === 'expense' && !form.pl_account_id && options.length > 0) {
      form.pl_account_id = options[0].id
    }
  },
  { immediate: true }
)

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount || 0)
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

  form.post(route('admin-keuangan.petty-cash.store'), {
    onStart: () => processing.value = true,
    onFinish: () => processing.value = false
  })
}

// Route helper
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.petty-cash.index': '/admin-keuangan/petty-cash',
    'admin-keuangan.petty-cash.store': '/admin-keuangan/petty-cash'
  }
  return routes[name] || '#'
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
