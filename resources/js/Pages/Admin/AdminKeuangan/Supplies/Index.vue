<template>
    <AdminKeuanganLayout>
        <Head title="Supplies Ledger" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Supplies Ledger</h1>
                        <p class="text-sm text-gray-600">Catat top-up dan pemakaian supplies agar laporan neraca otomatis.</p>
                    </div>
                    <div class="flex flex-wrap gap-3">
                        <button
                            type="button"
                            class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-md text-sm font-semibold hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                            @click="openTopupModal"
                        >
                            Tambah Top-up
                        </button>
                        <button
                            type="button"
                            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            @click="openUsageModal"
                        >
                            Catat Pemakaian/Penyusutan
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white border border-sage-200 rounded-lg shadow-sm p-5">
                        <p class="text-sm text-gray-500">Total Top-up</p>
                        <p class="text-2xl font-bold text-gray-900 mt-1">{{ formatCurrency(summary.total_topup) }}</p>
                    </div>
                    <div class="bg-white border border-sage-200 rounded-lg shadow-sm p-5">
                        <p class="text-sm text-gray-500">Total Pemakaian</p>
                        <p class="text-2xl font-bold text-gray-900 mt-1">{{ formatCurrency(summary.total_usage) }}</p>
                    </div>
                    <div class="bg-white border border-sage-200 rounded-lg shadow-sm p-5">
                        <p class="text-sm text-gray-500">Saldo Supplies</p>
                        <p class="text-2xl font-bold text-gray-900 mt-1">{{ formatCurrency(summary.balance) }}</p>
                    </div>
                </div>

                <datalist id="supply-category-list">
                    <option v-for="category in categories" :key="category" :value="category"></option>
                </datalist>

                <div class="bg-white border border-sage-200 rounded-lg shadow-sm">
                    <div class="px-4 py-5 sm:px-6 border-b border-sage-100">
                        <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                            <div class="flex flex-wrap gap-3">
                                <div>
                                    <label class="block text-xs font-medium text-gray-500 mb-1">Kategori</label>
                                    <select
                                        v-model="filters.category"
                                        class="rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                        @change="applyFilters"
                                    >
                                        <option value="">Semua</option>
                                        <option v-for="category in categories" :key="category" :value="category">
                                            {{ category }}
                                        </option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-500 mb-1">Jenis</label>
                                    <select
                                        v-model="filters.transaction_type"
                                        class="rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                        @change="applyFilters"
                                    >
                                        <option value="">Semua</option>
                                        <option value="topup">Top-up</option>
                                        <option value="usage">Pemakaian</option>
                                        <option value="depreciation">Penyusutan</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-500 mb-1">Dari</label>
                                    <input
                                        v-model="filters.date_from"
                                        type="date"
                                        class="rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                        @change="applyFilters"
                                    />
                                </div>
                                <div>
                                    <label class="block text-xs font-medium text-gray-500 mb-1">Sampai</label>
                                    <input
                                        v-model="filters.date_to"
                                        type="date"
                                        class="rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                        @change="applyFilters"
                                    />
                                </div>
                            </div>
                            <button
                                type="button"
                                class="inline-flex items-center px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                                @click="resetFilters"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Barang</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Harga / pcs</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="entry in transactions.data" :key="entry.id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 text-sm text-gray-900">{{ formatDate(entry.transaction_date) }}</td>
                                    <td class="px-6 py-4 text-sm text-gray-900">{{ entry.category }}</td>
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        <div>{{ entry.description || '-' }}</div>
                                        <div v-if="entry.notes" class="text-xs text-gray-500">{{ entry.notes }}</div>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-900 text-right">
                                        <span v-if="entry.quantity">{{ entry.quantity }}</span>
                                        <span v-else>-</span>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-900 text-right">
                                        <span v-if="pricePerPcs(entry)">{{ formatCurrency(pricePerPcs(entry)) }}</span>
                                        <span v-else>-</span>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-900 text-right">
                                        {{ formatCurrency(entry.amount) }}
                                    </td>
                                    <td class="px-6 py-4 text-sm">
                                        <span :class="badgeClass(entry.transaction_type)">
                                            {{ labelFor(entry.transaction_type) }}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="transactions.data.length === 0">
                                    <td colspan="7" class="px-6 py-8 text-center text-sm text-gray-500">
                                        Belum ada transaksi supplies.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="p-4 border-t border-sage-100">
                        <Pagination :data="transactions" />
                    </div>
                </div>
            </div>
        </div>

        <!-- Topup Modal -->
        <div
            v-if="showTopupModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            @click.self="closeTopupModal"
        >
            <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
                <div class="px-6 py-4 border-b border-sage-100 flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900">Tambah Top-up Supplies</h3>
                    <button type="button" class="text-gray-500 hover:text-gray-700" @click="closeTopupModal">×</button>
                </div>
                <div class="px-6 py-5">
                    <form @submit.prevent="submitTopup" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                                <input
                                    v-model="topupForm.transaction_date"
                                    type="date"
                                    class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                <SearchableSelect
                                    v-model="selectedTopupCategoryId"
                                    :options="topupCategoryOptions"
                                    placeholder="Pilih kategori"
                                    :search-fields="['label']"
                                    :input-class="topupCategoryInputClass"
                                />
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                            <textarea
                                v-model="topupForm.description"
                                rows="2"
                                class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                            ></textarea>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Jumlah (Rp)</label>
                                <input
                                    v-model="topupForm.amount"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Total Barang</label>
                                <input
                                    v-model="topupForm.quantity"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">
                                    Sumber Dana <span class="text-red-500">*</span>
                                </label>
                                <select
                                    v-model="topupForm.source_type"
                                    class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                    required
                                >
                                    <option value="">Pilih sumber dana</option>
                                    <option value="bank">Bank</option>
                                    <option value="petty_cash">Petty Cash</option>
                                </select>
                                <p class="text-xs text-gray-500 mt-1">Harga per pcs: <span class="font-semibold">{{ topupUnitPrice ? formatCurrency(topupUnitPrice) : '-' }}</span></p>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Akun Beban (P&L)</label>
                            <SearchableSelect
                                v-model="topupForm.pl_account_id"
                                :options="expenseAccountOptions"
                                placeholder="Cari akun..."
                                label-field="label"
                                value-field="value"
                                :search-fields="['label', 'code', 'name']"
                                :input-class="topupPlAccountInputClass"
                            />
                        </div>
                        <div v-if="topupForm.source_type === 'bank'">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Akun Bank</label>
                            <select
                                v-model="topupForm.bank_account_id"
                                class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                required
                            >
                                <option value="">Pilih akun bank</option>
                                <option v-for="bank in bankAccounts" :key="bank.id" :value="bank.id">
                                    {{ bank.bank_name }} - {{ bank.account_number }}
                                </option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                            <textarea
                                v-model="topupForm.notes"
                                rows="2"
                                class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                            ></textarea>
                        </div>
                    </form>
                </div>
                <div class="px-6 py-4 border-t border-sage-100 flex justify-end gap-3">
                    <button type="button" class="px-4 py-2 text-sm text-gray-600" @click="closeTopupModal">Batal</button>
                    <button
                        type="button"
                        class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-md text-sm font-semibold hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="isTopupDisabled"
                        @click="submitTopup"
                    >
                        Tambah Top-up
                    </button>
                </div>
            </div>
        </div>

        <!-- Usage Modal -->
        <div
            v-if="showUsageModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            @click.self="closeUsageModal"
        >
            <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
                <div class="px-6 py-4 border-b border-sage-100 flex items-center justify-between">
                    <h3 class="text-lg font-semibold text-gray-900">Catat Pemakaian / Penyusutan</h3>
                    <button type="button" class="text-gray-500 hover:text-gray-700" @click="closeUsageModal">×</button>
                </div>
                <div class="px-6 py-5">
                    <form @submit.prevent="submitUsage" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                                <input
                                    v-model="usageForm.transaction_date"
                                    type="date"
                                    class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                <input
                                    v-model="usageForm.category"
                                    list="supply-category-list"
                                    class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                    required
                                />
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Jenis</label>
                                <select
                                    v-model="usageForm.transaction_type"
                                    class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                >
                                    <option value="usage">Pemakaian</option>
                                    <option value="depreciation">Penyusutan</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Jumlah (Rp)</label>
                                <input
                                    v-model="usageForm.amount"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                    required
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Total Barang</label>
                                <input
                                    v-model="usageForm.quantity"
                                    type="number"
                                    step="0.01"
                                    min="0.01"
                                    class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                                />
                                <p class="text-xs text-gray-500 mt-1">Harga per pcs: <span class="font-semibold">{{ usageUnitPrice ? formatCurrency(usageUnitPrice) : '-' }}</span></p>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                            <textarea
                                v-model="usageForm.description"
                                rows="2"
                                class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                            ></textarea>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Akun Beban (P&L)</label>
                            <SearchableSelect
                                v-model="usageForm.pl_account_id"
                                :options="expenseAccountOptions"
                                placeholder="Cari akun..."
                                label-field="label"
                                value-field="value"
                                :search-fields="['label', 'code', 'name']"
                                :input-class="usagePlAccountInputClass"
                            />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                            <textarea
                                v-model="usageForm.notes"
                                rows="2"
                                class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                            ></textarea>
                        </div>
                    </form>
                </div>
                <div class="px-6 py-4 border-t border-sage-100 flex justify-end gap-3">
                    <button type="button" class="px-4 py-2 text-sm text-gray-600" @click="closeUsageModal">Batal</button>
                    <button
                        type="button"
                        class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-md text-sm font-semibold hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        :disabled="isUsageDisabled"
                        @click="submitUsage"
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import Pagination from '@/Components/Pagination.vue'
import { Head, useForm, router } from '@inertiajs/vue3'
import { computed, reactive, ref, watch } from 'vue'
import SearchableSelect from '@/Components/SearchableSelect.vue'

const props = defineProps({
    transactions: Object,
    summary: Object,
    bankAccounts: Array,
    categories: Array,
    pettyCashCategories: Array,
    filters: Object,
    expenseAccounts: {
        type: Array,
        default: () => [],
    },
})

const categories = computed(() => props.categories ?? [])
const pettyCashCategories = computed(() => props.pettyCashCategories ?? [])
const selectedTopupCategoryId = ref(pettyCashCategories.value[0]?.id || '')
const topupCategoryOptions = computed(() => {
    const baseOptions = [{ value: '', label: 'Pilih kategori' }]
    const options = pettyCashCategories.value.map((category) => ({
        value: category.id,
        label: category.name,
    }))
    return [...baseOptions, ...options]
})
const expenseAccounts = computed(() => props.expenseAccounts ?? [])
const expenseAccountOptions = computed(() =>
    expenseAccounts.value.map((account) => ({
        label: `${account.account_code} - ${account.account_name}`,
        value: account.id,
        code: account.account_code,
        name: account.account_name,
    }))
)
const baseAccountInputClass =
    'w-full px-3 py-2 pr-10 border rounded-md text-sm focus:border-sage-500 focus:ring focus:ring-sage-200'
const topupPlAccountInputClass = computed(() => {
    const error = topupForm.errors?.pl_account_id ? ' border-red-300' : ' border-gray-300'
    return `${baseAccountInputClass}${error}`
})
const topupCategoryInputClass = computed(() => {
    const error = topupForm.errors?.petty_cash_category_id || topupForm.errors?.category ? ' border-red-300' : ' border-gray-300'
    return `${baseAccountInputClass}${error}`
})
const usagePlAccountInputClass = computed(() => {
    const error = usageForm.errors?.pl_account_id ? ' border-red-300' : ' border-gray-300'
    return `${baseAccountInputClass}${error}`
})
const defaultExpenseAccountId = computed(() => expenseAccounts.value[0]?.id || '')

const today = new Date().toISOString().split('T')[0]

const topupForm = useForm({
    transaction_date: today,
    category: '',
    description: '',
    amount: '',
    quantity: '',
    pl_account_id: '',
    source_type: '',
    bank_account_id: '',
    petty_cash_category_id: '',
    reference_number: '',
    notes: '',
})

const usageForm = useForm({
    transaction_date: today,
    category: '',
    description: '',
    amount: '',
    quantity: '',
    transaction_type: 'usage',
    pl_account_id: '',
    notes: '',
})

const filters = reactive({
    category: props.filters?.category || '',
    transaction_type: props.filters?.transaction_type || '',
    date_from: props.filters?.date_from || '',
    date_to: props.filters?.date_to || '',
})

const showTopupModal = ref(false)
const showUsageModal = ref(false)

const formatCurrency = (value) => {
    const amount = Number(value || 0)
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount)
}

const calculateUnitPrice = (amount, qty) => {
    const total = parseFloat(amount)
    const quantity = parseFloat(qty)
    if (!total || !quantity) return null
    return total / quantity
}

const pricePerPcs = (entry) => calculateUnitPrice(entry.amount, entry.quantity)
const topupUnitPrice = computed(() => calculateUnitPrice(topupForm.amount, topupForm.quantity))
const usageUnitPrice = computed(() => calculateUnitPrice(usageForm.amount, usageForm.quantity))
const isTopupDisabled = computed(() => {
    if (topupForm.processing) return true
    // semua field wajib terisi: tanggal, kategori, amount, quantity, source_type, akun biaya
    if (!topupForm.transaction_date || !topupForm.category || !topupForm.amount || !topupForm.quantity || !topupForm.source_type || !topupForm.pl_account_id) {
        return true
    }
    // jika sumber bank/petty cash, wajib akun terkait
    if (topupForm.source_type === 'bank' && !topupForm.bank_account_id) return true
    if (topupForm.source_type === 'petty_cash' && !topupForm.petty_cash_category_id) return true
    return false
})

const isUsageDisabled = computed(() => {
    if (usageForm.processing) return true
    if (!usageForm.transaction_date || !usageForm.category || !usageForm.amount || !usageForm.pl_account_id) return true
    return false
})

const formatDate = (value) => {
    if (!value) return '-'
    return new Date(value).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

const labelFor = (type) => {
    return {
        topup: 'Top-up',
        usage: 'Pemakaian',
        depreciation: 'Penyusutan',
    }[type] || type
}

const badgeClass = (type) => {
    switch (type) {
        case 'topup':
            return 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800'
        case 'usage':
            return 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800'
        default:
            return 'inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800'
    }
}

const submitTopup = () => {
    topupForm.post(route('admin-keuangan.supplies.topup'), {
        preserveScroll: true,
        onSuccess: () => {
            topupForm.reset()
            topupForm.transaction_date = today
            topupForm.source_type = ''
            topupForm.petty_cash_category_id = ''
            selectedTopupCategoryId.value = pettyCashCategories.value[0]?.id || ''
            closeTopupModal()
        },
    })
}

const submitUsage = () => {
    usageForm.post(route('admin-keuangan.supplies.usage'), {
        preserveScroll: true,
        onSuccess: () => {
            usageForm.reset()
            usageForm.transaction_date = today
            usageForm.transaction_type = 'usage'
            closeUsageModal()
        },
    })
}

const applyFilters = () => {
    router.get(route('admin-keuangan.supplies.index'), filters, {
        preserveState: true,
        replace: true,
    })
}

const resetFilters = () => {
    filters.category = ''
    filters.transaction_type = ''
    filters.date_from = ''
    filters.date_to = ''
    applyFilters()
}

const openTopupModal = () => {
    topupForm.reset()
    topupForm.transaction_date = today
    topupForm.source_type = ''
    topupForm.pl_account_id = defaultExpenseAccountId.value
    topupForm.bank_account_id = ''
    topupForm.petty_cash_category_id = ''
    if (selectedTopupCategoryId.value) {
        const cat = pettyCashCategories.value.find((c) => c.id === selectedTopupCategoryId.value)
        if (cat) {
            topupForm.category = cat.name
        }
    }
    showTopupModal.value = true
}

const closeTopupModal = () => {
    showTopupModal.value = false
}

const openUsageModal = () => {
    usageForm.reset()
    usageForm.transaction_date = today
    usageForm.pl_account_id = defaultExpenseAccountId.value
    showUsageModal.value = true
}

const closeUsageModal = () => {
    showUsageModal.value = false
}

watch(
    () => topupForm.source_type,
    (value) => {
        if (value !== 'bank') {
            topupForm.bank_account_id = ''
        }
        if (value !== 'petty_cash') {
            topupForm.petty_cash_category_id = ''
        }
        if (value === 'petty_cash' && selectedTopupCategoryId.value) {
            topupForm.petty_cash_category_id = selectedTopupCategoryId.value
        }
    }
)

watch(
    pettyCashCategories,
    (cats) => {
        if (!selectedTopupCategoryId.value && cats.length > 0) {
            selectedTopupCategoryId.value = cats[0].id
        }
    },
    { immediate: true }
)

watch(
    selectedTopupCategoryId,
    (id) => {
        const cat = pettyCashCategories.value.find((c) => c.id === id)
        if (cat) {
            topupForm.category = cat.name
            if (topupForm.source_type === 'petty_cash') {
                topupForm.petty_cash_category_id = cat.id
            }
        } else {
            topupForm.category = ''
            if (topupForm.source_type === 'petty_cash') {
                topupForm.petty_cash_category_id = ''
            }
        }
    },
    { immediate: true }
)
</script>
