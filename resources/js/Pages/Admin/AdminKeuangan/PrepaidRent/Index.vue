<template>
    <AdminKeuanganLayout>
        <Head title="Prepaid Rent" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Prepaid Rent Ledger</h1>
                        <p class="text-sm text-gray-500">Pantau pembayaran dan penyusutan sewa gedung yang dibayar di muka.</p>
                    </div>
                    <div class="flex space-x-3">
                        <button
                            @click="openTopupModal"
                            class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        >
                            Tambah Pembayaran
                        </button>
                        <button
                            @click="openAmortizationModal"
                            class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        >
                            Catat Penyusutan
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white shadow rounded-lg p-4">
                        <p class="text-sm text-gray-500">Total Top-up</p>
                        <p class="text-2xl font-semibold text-gray-900 mt-1">Rp {{ formatNumber(summary.total_topup || 0) }}</p>
                    </div>
                    <div class="bg-white shadow rounded-lg p-4">
                        <p class="text-sm text-gray-500">Total Penyusutan</p>
                        <p class="text-2xl font-semibold text-gray-900 mt-1">Rp {{ formatNumber(summary.total_amortization || 0) }}</p>
                    </div>
                    <div class="bg-white shadow rounded-lg p-4">
                        <p class="text-sm text-gray-500">Saldo Prepaid Rent</p>
                        <p class="text-2xl font-semibold text-green-600 mt-1">Rp {{ formatNumber(summary.balance || 0) }}</p>
                    </div>
                </div>

                <div class="bg-white shadow rounded-lg">
                    <form @submit.prevent="applyFilters" class="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Jenis Transaksi</label>
                                <select
                                    v-model="filterForm.transaction_type"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                >
                                    <option value="">Semua</option>
                                    <option value="topup">Top-up / Pembayaran</option>
                                    <option value="amortization">Penyusutan</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
                                <input
                                    type="date"
                                    v-model="filterForm.date_from"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
                                <input
                                    type="date"
                                    v-model="filterForm.date_to"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                />
                            </div>
                            <div class="flex items-end space-x-2">
                                <button
                                    type="submit"
                                    class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                                >
                                    Terapkan
                                </button>
                                <button
                                    type="button"
                                    @click="resetFilters"
                                    class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </form>

                    <div class="px-4 py-5 sm:px-6">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe</th>
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nominal</th>
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sumber</th>
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="transaction in transactions.data" :key="transaction.id">
                                        <td class="px-3 py-3 text-sm text-gray-900">{{ formatDate(transaction.transaction_date) }}</td>
                                        <td class="px-3 py-3">
                                            <span
                                                :class="transaction.transaction_type === 'topup' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                            >
                                                {{ transaction.transaction_type === 'topup' ? 'Top-up' : 'Penyusutan' }}
                                            </span>
                                        </td>
                                        <td class="px-3 py-3 text-sm text-gray-900">
                                            <div class="font-medium">{{ transaction.description || '-' }}</div>
                                            <div v-if="transaction.notes" class="text-xs text-gray-500 mt-1 line-clamp-2">{{ transaction.notes }}</div>
                                        </td>
                                        <td class="px-3 py-3 text-sm font-semibold text-gray-900">
                                            Rp {{ formatNumber(transaction.amount) }}
                                        </td>
                                        <td class="px-3 py-3 text-sm text-gray-900">
                                            <div class="capitalize">{{ transaction.source_type || '-' }}</div>
                                            <div v-if="transaction.bank_account" class="text-xs text-gray-500">
                                                {{ transaction.bank_account.bank_name }} - {{ transaction.bank_account.account_number }}
                                            </div>
                                        </td>
                                        <td class="px-3 py-3 text-sm text-gray-900">
                                            {{ transaction.creator?.name || 'System/Auto' }}
                                        </td>
                                    </tr>
                                    <tr v-if="transactions.data.length === 0">
                                        <td colspan="6" class="px-3 py-6 text-center text-sm text-gray-500">Belum ada transaksi.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div class="mt-4">
                            <Pagination :data="transactions" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showTopupModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto mx-4">
                <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-900">Tambah Pembayaran Sewa</h3>
                    <button @click="closeTopupModal" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <form @submit.prevent="submitTopup" class="px-6 py-4 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal *</label>
                            <input v-model="topupForm.transaction_date" type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" />
                            <p v-if="topupForm.errors.transaction_date" class="text-xs text-red-600 mt-1">{{ topupForm.errors.transaction_date }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nominal *</label>
                            <input
                                v-model="topupForm.amount"
                                type="number"
                                min="0"
                                step="0.01"
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                placeholder="0"
                            />
                            <p v-if="topupForm.errors.amount" class="text-xs text-red-600 mt-1">{{ topupForm.errors.amount }}</p>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                        <input v-model="topupForm.description" type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Contoh: Sewa kantor Q1" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">
                            Biaya <span class="text-red-500">*</span>
                        </label>
                        <select
                            v-model="topupForm.pl_account_id"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                            required
                        >
                            <option value="">Pilih biaya</option>
                            <option v-for="account in expenseAccounts" :key="account.id" :value="account.id">
                                {{ account.account_code }} - {{ account.account_name }}
                            </option>
                        </select>
                        <p v-if="topupForm.errors.pl_account_id" class="text-xs text-red-600 mt-1">{{ topupForm.errors.pl_account_id }}</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Sumber Dana *</label>
                            <select
                                v-model="topupForm.source_type"
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                            >
                                <option value="bank">Transfer Bank</option>
                                <option value="petty_cash">Petty Cash</option>
                                <option value="other">Lainnya</option>
                            </select>
                            <p v-if="topupForm.errors.source_type" class="text-xs text-red-600 mt-1">{{ topupForm.errors.source_type }}</p>
                        </div>
                        <div v-if="topupForm.source_type === 'bank'">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Akun Bank *</label>
                            <select
                                v-model="topupForm.bank_account_id"
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                            >
                                <option value="">Pilih Akun</option>
                                <option v-for="bank in bankAccounts" :key="bank.id" :value="bank.id">
                                    {{ bank.bank_name }} - {{ bank.account_number }}
                                </option>
                            </select>
                            <p v-if="topupForm.errors.bank_account_id" class="text-xs text-red-600 mt-1">{{ topupForm.errors.bank_account_id }}</p>
                        </div>
                        <div v-if="topupForm.source_type === 'petty_cash'">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Kategori Petty Cash *</label>
                            <select
                                v-model="topupForm.petty_cash_category_id"
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                            >
                                <option value="">Pilih Kategori</option>
                                <option v-for="category in pettyCashCategories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                            <p v-if="topupForm.errors.petty_cash_category_id" class="text-xs text-red-600 mt-1">{{ topupForm.errors.petty_cash_category_id }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Mulai Sewa</label>
                            <input v-model="topupForm.rental_start_date" type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Akhir Sewa</label>
                            <input v-model="topupForm.rental_end_date" type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" />
                            <p v-if="topupForm.errors.rental_end_date" class="text-xs text-red-600 mt-1">{{ topupForm.errors.rental_end_date }}</p>
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Jumlah Bulan Penyusutan</label>
                        <input
                            v-model="topupForm.amortization_months"
                            type="number"
                            min="1"
                            max="60"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                            placeholder="Contoh: 12"
                        />
                        <p v-if="topupForm.errors.amortization_months" class="text-xs text-red-600 mt-1">{{ topupForm.errors.amortization_months }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                        <textarea
                            v-model="topupForm.notes"
                            rows="3"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        ></textarea>
                    </div>
                    <div class="flex justify-end space-x-3 pt-2">
                        <button type="button" @click="closeTopupModal" class="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700">Batal</button>
                        <button
                            type="submit"
                            :disabled="isTopupDisabled"
                            class="px-4 py-2 rounded-md bg-sage-600 text-white text-sm font-semibold hover:bg-sage-700 disabled:opacity-50"
                        >
                            {{ topupForm.processing ? 'Menyimpan...' : 'Simpan' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="showAmortizationModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto mx-4">
                <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-900">Catat Penyusutan</h3>
                    <button @click="closeAmortizationModal" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <form @submit.prevent="submitAmortization" class="px-6 py-4 space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal *</label>
                        <input v-model="amortizationForm.transaction_date" type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" />
                        <p v-if="amortizationForm.errors.transaction_date" class="text-xs text-red-600 mt-1">{{ amortizationForm.errors.transaction_date }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nominal *</label>
                        <input
                            v-model="amortizationForm.amount"
                            type="number"
                            min="0"
                            step="0.01"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                            placeholder="0"
                        />
                        <p v-if="amortizationForm.errors.amount" class="text-xs text-red-600 mt-1">{{ amortizationForm.errors.amount }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                        <input v-model="amortizationForm.description" type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Contoh: Penyusutan bulan Januari" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Biaya *</label>
                        <select
                            v-model="amortizationForm.pl_account_id"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        >
                            <option value="">Pilih biaya</option>
                            <option v-for="account in expenseAccounts" :key="account.id" :value="account.id">
                                {{ account.account_code }} - {{ account.account_name }}
                            </option>
                        </select>
                        <p v-if="amortizationForm.errors.pl_account_id" class="text-xs text-red-600 mt-1">{{ amortizationForm.errors.pl_account_id }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                        <textarea
                            v-model="amortizationForm.notes"
                            rows="3"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        ></textarea>
                    </div>
                    <div class="flex justify-end space-x-3 pt-2">
                        <button type="button" @click="closeAmortizationModal" class="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700">Batal</button>
                        <button
                            type="submit"
                            :disabled="isAmortizationDisabled"
                            class="px-4 py-2 rounded-md bg-sage-600 text-white text-sm font-semibold hover:bg-sage-700 disabled:opacity-50"
                        >
                            {{ amortizationForm.processing ? 'Menyimpan...' : 'Simpan' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import Pagination from '@/Components/Pagination.vue'
import { Head, router, useForm } from '@inertiajs/vue3'
import { reactive, ref, computed, watch } from 'vue'

const props = defineProps({
    transactions: Object,
    summary: {
        type: Object,
        default: () => ({})
    },
    bankAccounts: {
        type: Array,
        default: () => []
    },
    pettyCashCategories: {
        type: Array,
        default: () => []
    },
    expenseAccounts: {
        type: Array,
        default: () => []
    },
    filters: {
        type: Object,
        default: () => ({})
    }
})

const showTopupModal = ref(false)
const showAmortizationModal = ref(false)

const bankAccounts = computed(() => props.bankAccounts ?? [])
const pettyCashCategories = computed(() => props.pettyCashCategories ?? [])
const expenseAccounts = computed(() => props.expenseAccounts ?? [])

const filterForm = reactive({
    transaction_type: props.filters?.transaction_type ?? '',
    date_from: props.filters?.date_from ?? '',
    date_to: props.filters?.date_to ?? ''
})

const topupForm = useForm({
    transaction_date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
    reference_number: '',
    source_type: 'bank',
    bank_account_id: '',
    petty_cash_category_id: '',
    pl_account_id: '',
    rental_start_date: '',
    rental_end_date: '',
    amortization_months: '',
    notes: ''
})

const amortizationForm = useForm({
    transaction_date: new Date().toISOString().split('T')[0],
    amount: '',
    description: '',
    pl_account_id: '',
    notes: ''
})

watch(
    () => topupForm.source_type,
    (value) => {
        if (value !== 'bank') {
            topupForm.bank_account_id = ''
        }
        if (value !== 'petty_cash') {
            topupForm.petty_cash_category_id = ''
        }
    }
)

const openTopupModal = () => {
    topupForm.reset()
    topupForm.transaction_date = new Date().toISOString().split('T')[0]
    topupForm.source_type = 'bank'
    showTopupModal.value = true
}

const closeTopupModal = () => {
    showTopupModal.value = false
}

const openAmortizationModal = () => {
    amortizationForm.reset()
    amortizationForm.transaction_date = new Date().toISOString().split('T')[0]
    showAmortizationModal.value = true
}

const closeAmortizationModal = () => {
    showAmortizationModal.value = false
}

const applyFilters = () => {
    router.get(route('admin-keuangan.prepaid-rent.index'), filterForm, {
        preserveState: true,
        replace: true
    })
}

const resetFilters = () => {
    filterForm.transaction_type = ''
    filterForm.date_from = ''
    filterForm.date_to = ''
    applyFilters()
}

const submitTopup = () => {
    topupForm.post(route('admin-keuangan.prepaid-rent.topup'), {
        onSuccess: () => {
            closeTopupModal()
            topupForm.reset()
            applyFilters()
        }
    })
}

const submitAmortization = () => {
    amortizationForm.post(route('admin-keuangan.prepaid-rent.amortization'), {
        onSuccess: () => {
            closeAmortizationModal()
            amortizationForm.reset()
            applyFilters()
        }
    })
}

const isTopupDisabled = computed(() => {
    if (topupForm.processing) return true
    if (!topupForm.transaction_date || !topupForm.amount) return true
    if (!topupForm.pl_account_id) return true
    if (topupForm.source_type === 'bank' && !topupForm.bank_account_id) return true
    if (topupForm.source_type === 'petty_cash' && !topupForm.petty_cash_category_id) return true
    return false
})

const isAmortizationDisabled = computed(() => {
    if (amortizationForm.processing) return true
    if (!amortizationForm.transaction_date || !amortizationForm.amount) return true
    if (!amortizationForm.pl_account_id) return true
    return false
})

const formatNumber = (value) => {
    return new Intl.NumberFormat('id-ID').format(Number(value) || 0)
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}
</script>
