<template>
  <AdminKeuanganLayout>
    <Head title="Tambah Pengeluaran Lain-lain" />

    <div class="p-6 max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-6">
        <div class="flex items-center space-x-4 mb-2">
          <Link
            :href="route('admin-keuangan.general-expenses.index')"
            class="text-sage-600 hover:text-sage-800 transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 class="text-2xl font-bold text-sage-800">Tambah Pengeluaran Lain-lain</h1>
        </div>
        <p class="text-sm text-sage-600">Buat pengeluaran baru tanpa SO non petty cash</p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- Header Information -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Tanggal Pengeluaran -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">
                Tanggal Pengeluaran <span class="text-red-500">*</span>
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
                Kategori <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.category"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                :class="{ 'border-red-300': errors.category }"
                :disabled="categoryOptions.length === 0"
              >
                <option value="" disabled>Pilih Kategori</option>
                <option
                  v-for="category in categoryOptions"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
              <p v-if="categoryOptions.length === 0" class="mt-1 text-sm text-sage-500">
                Tidak ada kategori aktif. Silakan tambah kategori di master Operational Cost Categories terlebih dahulu.
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
              Catatan (Opsional)
            </label>
            <textarea
              v-model="form.notes"
              rows="3"
              placeholder="Catatan umum untuk pengeluaran ini"
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
              Akun Beban (P&L) <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.pl_account_id"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
              :class="{ 'border-red-300': errors.pl_account_id }"
            >
              <option value="">Pilih Akun</option>
              <option v-for="acc in expenseAccounts" :key="acc.id" :value="acc.id">
                {{ acc.account_code }} - {{ acc.account_name }}
              </option>
            </select>
            <p v-if="errors.pl_account_id" class="mt-1 text-sm text-red-600">
              {{ errors.pl_account_id }}
            </p>
            <p class="mt-1 text-xs text-sage-500">
              Pengeluaran ini akan dicatat ke akun ini di laporan laba rugi.
            </p>
          </div>

          <!-- Bank Source -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2">
              Bank Sumber Dana <span v-if="form.status === 'approved'" class="text-red-500">*</span>
            </label>
            <select
              v-model="form.bank_account_id"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
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
            <p class="mt-1 text-xs text-sage-500">
              Saat status Approved, pengeluaran akan otomatis mendebit saldo bank terpilih.
            </p>
          </div>

          <!-- Items Section -->
          <div class="border-t border-sage-200 pt-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-medium text-sage-800">Detail Item Pengeluaran</h3>
              <button
                type="button"
                @click="addItem"
                class="inline-flex items-center px-3 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
              >
                <Plus class="w-4 h-4 mr-2" />
                Tambah Item
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
                    title="Hapus Item"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Description -->
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-2">
                      Deskripsi <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="item.description"
                      type="text"
                      placeholder="Contoh: Biaya Admin Bank Mandiri Bulan Januari"
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
                      Jumlah (Rp) <span class="text-red-500">*</span>
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
                    Catatan Item (Opsional)
                  </label>
                  <textarea
                    v-model="item.notes"
                    rows="2"
                    placeholder="Catatan khusus untuk item ini"
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
                <p class="text-sm">Belum ada item pengeluaran</p>
                <p class="text-xs mt-1">Klik "Tambah Item" untuk menambahkan item pengeluaran</p>
              </div>
            </div>

            <!-- Total Summary -->
            <div v-if="form.items.length > 0" class="mt-6 p-4 bg-white border border-sage-200 rounded-lg">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-sage-700">Total Keseluruhan:</span>
                <span class="text-lg font-bold text-sage-800">{{ formatCurrency(calculatedTotal) }}</span>
              </div>
              <div class="flex justify-between items-center mt-1">
                <span class="text-xs text-sage-600">{{ form.items.length }} item{{ form.items.length > 1 ? 's' : '' }}</span>
                <span class="text-xs text-sage-600">Periode: {{ formatCurrentPeriod() }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 pt-4 border-t border-sage-200">
            <Link
              :href="route('admin-keuangan.general-expenses.index')"
              class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              :disabled="processing || form.items.length === 0 || categoryOptions.length === 0"
              class="px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-lg hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="processing">Menyimpan...</span>
              <span v-else>Simpan Pengeluaran</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { Plus, Trash2, DollarSign } from 'lucide-vue-next'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

// Props
const props = defineProps({
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
  errors: {
    type: Object,
    default: () => ({})
  }
})

// Get current date in YYYY-MM-DD format
const getCurrentDate = () => {
  return new Date().toISOString().split('T')[0]
}

// Form state
const form = useForm({
  expense_date: getCurrentDate(),
  category: '',
  status: 'draft',
  notes: '',
  bank_account_id: '',
  pl_account_id: '',
  items: [
    {
      description: '',
      amount: '',
      notes: ''
    }
  ]
})

const processing = ref(false)
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
const errors = ref(props.errors)

watch(
  expenseAccounts,
  (options) => {
    if (!form.pl_account_id && options.length > 0) {
      form.pl_account_id = options[0].id
    }
  },
  { immediate: true }
)
const categoryOptions = computed(() => props.categories ?? [])

watch(
  categoryOptions,
  (options) => {
    if (!form.category && options.length > 0) {
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
    'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
  ]
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
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

  form.post(route('admin-keuangan.general-expenses.store'), {
    onSuccess: () => {
      processing.value = false
    },
    onError: (formErrors) => {
      processing.value = false
      errors.value = formErrors
    }
  })
}

// Route helper
const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.general-expenses.index': '/admin-keuangan/general-expenses',
    'admin-keuangan.general-expenses.store': '/admin-keuangan/general-expenses'
  }
  return routes[name] || '#'
}
</script>
