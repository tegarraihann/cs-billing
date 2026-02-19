<template>
    <AdminKeuanganLayout>
        <Head title="Equipment Ledger" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Equipment Ledger</h1>
                        <p class="text-sm text-gray-500">Track asset purchases and depreciation for financial reporting.</p>
                    </div>
                    <div class="flex space-x-3">
                        <button
                            @click="openPurchaseModal"
                            class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        >
                            Add Purchase
                        </button>
                        <button
                            @click="openDepreciationModal"
                            class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        >
                            Record Depreciation
                        </button>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div class="bg-white shadow rounded-lg p-4">
                        <p class="text-sm text-gray-500">Total Purchases</p>
                        <p class="text-2xl font-semibold text-gray-900 mt-1">Rp {{ formatNumber(summary.total_purchase || 0) }}</p>
                    </div>
                    <div class="bg-white shadow rounded-lg p-4">
                        <p class="text-sm text-gray-500">Total Depreciation</p>
                        <p class="text-2xl font-semibold text-gray-900 mt-1">Rp {{ formatNumber(summary.total_depreciation || 0) }}</p>
                    </div>
                    <div class="bg-white shadow rounded-lg p-4">
                        <p class="text-sm text-gray-500">Net Book Value</p>
                        <p class="text-2xl font-semibold text-green-600 mt-1">Rp {{ formatNumber(summary.net_book_value || 0) }}</p>
                    </div>
                </div>

                <div class="bg-white shadow rounded-lg">
                    <form @submit.prevent="applyFilters" class="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
                                <select v-model="filterForm.transaction_type" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500">
                                    <option value="">All</option>
                                    <option value="purchase">Purchase</option>
                                    <option value="depreciation">Depreciation</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select v-model="filterForm.category" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500">
                                    <option value="">All</option>
                                    <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                                <input type="date" v-model="filterForm.date_from" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                                <input type="date" v-model="filterForm.date_to" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" />
                            </div>
                            <div class="flex items-end space-x-2">
                                <button
                                    type="submit"
                                    class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                                >
                                    Apply
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
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="transaction in transactions.data" :key="transaction.id">
                                        <td class="px-3 py-3 text-sm text-gray-900">{{ formatDate(transaction.transaction_date) }}</td>
                                        <td class="px-3 py-3">
                                            <span
                                                :class="transaction.transaction_type === 'purchase' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                            >
                                                {{ transaction.transaction_type === 'purchase' ? 'Purchase' : 'Depreciation' }}
                                            </span>
                                        </td>
                                        <td class="px-3 py-3 text-sm text-gray-900">
                                            <div class="font-medium">{{ transaction.asset_name }}</div>
                                            <div class="text-xs text-gray-500">{{ transaction.category || '-' }}</div>
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
                                        <td colspan="6" class="px-3 py-6 text-center text-sm text-gray-500">No transactions yet.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div
                            v-if="transactions.links && transactions.data.length > 0"
                            class="mt-4 bg-white px-4 py-3 border-t border-gray-200 sm:px-6"
                        >
                            <div class="flex items-center justify-between">
                                <div class="text-sm text-gray-700">
                                    Showing {{ transactions.from || 0 }} to {{ transactions.to || 0 }} of {{ transactions.total || 0 }} results
                                </div>
                                <div class="flex space-x-1">
                                    <template v-for="link in transactions.links" :key="link.label">
                                        <button
                                            v-if="link.url"
                                            @click="visitPage(link.url)"
                                            :class="[
                                                'px-3 py-2 text-sm rounded-md',
                                                link.active
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-white text-gray-500 hover:text-gray-700 border border-gray-300'
                                            ]"
                                            v-html="link.label"
                                        ></button>
                                        <span
                                            v-else
                                            class="px-3 py-2 text-sm text-gray-400"
                                            v-html="link.label"
                                        ></span>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showPurchaseModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto mx-4">
                <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-900">Add Equipment Purchase</h3>
                    <button @click="closePurchaseModal" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <form @submit.prevent="submitPurchase" class="px-6 py-4 space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                            <input v-model="purchaseForm.transaction_date" type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" />
                            <p v-if="purchaseForm.errors.transaction_date" class="text-xs text-red-600 mt-1">{{ purchaseForm.errors.transaction_date }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                            <input
                                v-model="purchaseForm.amount"
                                type="number"
                                min="0"
                                step="0.01"
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                placeholder="0"
                            />
                            <p v-if="purchaseForm.errors.amount" class="text-xs text-red-600 mt-1">{{ purchaseForm.errors.amount }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Asset Name *</label>
                            <input v-model="purchaseForm.asset_name" type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Example: Admin Laptop" />
                            <p v-if="purchaseForm.errors.asset_name" class="text-xs text-red-600 mt-1">{{ purchaseForm.errors.asset_name }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input v-model="purchaseForm.category" type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Optional" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input v-model="purchaseForm.description" type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Additional details" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Expense Account (P&L) *</label>
                        <SearchableSelect
                            v-model="purchaseForm.pl_account_id"
                            :options="expenseAccountOptions"
                            placeholder="Search accounts..."
                            label-field="label"
                            value-field="value"
                            :search-fields="['label', 'code', 'name']"
                            :input-class="purchasePlAccountInputClass"
                        />
                        <p v-if="purchaseForm.errors.pl_account_id" class="text-xs text-red-600 mt-1">{{ purchaseForm.errors.pl_account_id }}</p>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Funding Source *</label>
                            <select v-model="purchaseForm.source_type" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500">
                                <option value="">Select funding source</option>
                                <option value="bank">Bank Transfer</option>
                                <option value="petty_cash">Petty Cash</option>
                                <option value="opening_balance">Opening Balance</option>
                            </select>
                            <p v-if="purchaseForm.errors.source_type" class="text-xs text-red-600 mt-1">{{ purchaseForm.errors.source_type }}</p>
                        </div>
                        <div v-if="purchaseForm.source_type === 'bank'">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Bank Account *</label>
                            <select v-model="purchaseForm.bank_account_id" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500">
                                <option value="">Select account</option>
                                <option v-for="bank in bankAccounts" :key="bank.id" :value="bank.id">
                                    {{ bank.bank_name }} - {{ bank.account_number }}
                                </option>
                            </select>
                            <p v-if="purchaseForm.errors.bank_account_id" class="text-xs text-red-600 mt-1">{{ purchaseForm.errors.bank_account_id }}</p>
                        </div>
                        <div v-if="purchaseForm.source_type === 'petty_cash'">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Petty Cash Category *</label>
                            <select v-model="purchaseForm.petty_cash_category_id" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500">
                                <option value="">Select category</option>
                                <option v-for="category in pettyCashCategories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                            <p v-if="purchaseForm.errors.petty_cash_category_id" class="text-xs text-red-600 mt-1">{{ purchaseForm.errors.petty_cash_category_id }}</p>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Useful Life (months)</label>
                            <input
                                v-model="purchaseForm.useful_life_months"
                                type="number"
                                min="1"
                                max="240"
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                placeholder="Example: 36"
                            />
                            <p v-if="purchaseForm.errors.useful_life_months" class="text-xs text-red-600 mt-1">{{ purchaseForm.errors.useful_life_months }}</p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Depreciation Start</label>
                            <input v-model="purchaseForm.depreciation_start_date" type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" />
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea v-model="purchaseForm.notes" rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"></textarea>
                    </div>
                    <div class="flex justify-end space-x-3 pt-2">
                        <button type="button" @click="closePurchaseModal" class="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700">Cancel</button>
                        <button
                            type="submit"
                            :disabled="isPurchaseDisabled"
                            class="px-4 py-2 rounded-md bg-sage-600 text-white text-sm font-semibold hover:bg-sage-700 disabled:opacity-50"
                        >
                            {{ purchaseForm.processing ? 'Saving...' : 'Save' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div v-if="showDepreciationModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
                <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 class="text-lg font-semibold text-gray-900">Record Equipment Depreciation</h3>
                    <button @click="closeDepreciationModal" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <form @submit.prevent="submitDepreciation" class="px-6 py-4 space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                        <input v-model="depreciationForm.transaction_date" type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" />
                        <p v-if="depreciationForm.errors.transaction_date" class="text-xs text-red-600 mt-1">{{ depreciationForm.errors.transaction_date }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Asset Name *</label>
                        <input v-model="depreciationForm.asset_name" type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Example: Admin Laptop" />
                        <p v-if="depreciationForm.errors.asset_name" class="text-xs text-red-600 mt-1">{{ depreciationForm.errors.asset_name }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                        <input
                            v-model="depreciationForm.amount"
                            type="number"
                            min="0"
                            step="0.01"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                            placeholder="0"
                        />
                        <p v-if="depreciationForm.errors.amount" class="text-xs text-red-600 mt-1">{{ depreciationForm.errors.amount }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input v-model="depreciationForm.description" type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Example: April depreciation" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                        <textarea v-model="depreciationForm.notes" rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"></textarea>
                    </div>
                    <div class="flex justify-end space-x-3 pt-2">
                        <button type="button" @click="closeDepreciationModal" class="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700">Cancel</button>
                        <button
                            type="submit"
                            :disabled="depreciationForm.processing"
                            class="px-4 py-2 rounded-md bg-sage-600 text-white text-sm font-semibold hover:bg-sage-700 disabled:opacity-50"
                        >
                            {{ depreciationForm.processing ? 'Saving...' : 'Save' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { Head, router, useForm } from '@inertiajs/vue3'
import { reactive, ref, computed, watch } from 'vue'
import SearchableSelect from '@/Components/SearchableSelect.vue'

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
    categories: {
        type: Array,
        default: () => []
    },
    filters: {
        type: Object,
        default: () => ({})
    },
    expenseAccounts: {
        type: Array,
        default: () => []
    }
})

const showPurchaseModal = ref(false)
const showDepreciationModal = ref(false)

const bankAccounts = computed(() => props.bankAccounts ?? [])
const pettyCashCategories = computed(() => props.pettyCashCategories ?? [])
const expenseAccounts = computed(() => props.expenseAccounts ?? [])
const defaultExpenseAccountId = computed(() => expenseAccounts.value[0]?.id || '')
const expenseAccountOptions = computed(() =>
    expenseAccounts.value.map((account) => ({
        value: account.id,
        label: `${account.account_code} - ${account.account_name}`,
        code: account.account_code,
        name: account.account_name
    }))
)
const purchasePlAccountInputClass = computed(() => {
    const base = 'w-full rounded-md border border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500 pr-10'
    const error = purchaseForm.errors.pl_account_id ? ' border-red-300 focus:border-red-400 focus:ring-red-200' : ''
    return `${base}${error}`
})

const filterForm = reactive({
    transaction_type: props.filters?.transaction_type ?? '',
    category: props.filters?.category ?? '',
    date_from: props.filters?.date_from ?? '',
    date_to: props.filters?.date_to ?? ''
})

const currentIndexQuery = computed(() => {
    const query = {
        transaction_type: filterForm.transaction_type || '',
        category: filterForm.category || '',
        date_from: filterForm.date_from || '',
        date_to: filterForm.date_to || ''
    }

    const currentPage = props.transactions?.current_page
    if (currentPage && Number(currentPage) > 1) {
        query.page = currentPage
    }

    return query
})

const purchaseForm = useForm({
    transaction_date: new Date().toISOString().split('T')[0],
    asset_name: '',
    category: '',
    amount: '',
    description: '',
    reference_number: '',
    source_type: '',
    bank_account_id: '',
    petty_cash_category_id: '',
    pl_account_id: '',
    useful_life_months: '',
    depreciation_start_date: '',
    notes: ''
})

const depreciationForm = useForm({
    transaction_date: new Date().toISOString().split('T')[0],
    asset_name: '',
    amount: '',
    description: '',
    notes: ''
})

watch(
    () => purchaseForm.source_type,
    (value) => {
        if (value !== 'bank') {
            purchaseForm.bank_account_id = ''
        }
        if (value !== 'petty_cash') {
            purchaseForm.petty_cash_category_id = ''
        }
    }
)

const openPurchaseModal = () => {
    purchaseForm.reset()
    purchaseForm.transaction_date = new Date().toISOString().split('T')[0]
    purchaseForm.source_type = ''
    purchaseForm.bank_account_id = ''
    purchaseForm.petty_cash_category_id = ''
    purchaseForm.pl_account_id = defaultExpenseAccountId.value
    showPurchaseModal.value = true
}

const closePurchaseModal = () => {
    showPurchaseModal.value = false
}

const openDepreciationModal = () => {
    depreciationForm.reset()
    depreciationForm.transaction_date = new Date().toISOString().split('T')[0]
    showDepreciationModal.value = true
}

const closeDepreciationModal = () => {
    showDepreciationModal.value = false
}

const applyFilters = () => {
    router.get(route('admin-keuangan.equipment.index'), {
        ...filterForm,
        page: 1
    }, {
        preserveState: true,
        preserveScroll: true,
        replace: true
    })
}

const resetFilters = () => {
    filterForm.transaction_type = ''
    filterForm.category = ''
    filterForm.date_from = ''
    filterForm.date_to = ''
    router.get(route('admin-keuangan.equipment.index'), {}, {
        preserveState: true,
        preserveScroll: true,
        replace: true
    })
}

const visitPage = (url) => {
    if (!url) return

    const target = new URL(url, window.location.origin)
    const page = target.searchParams.get('page')

    router.get(route('admin-keuangan.equipment.index'), {
        ...filterForm,
        page: page || 1
    }, {
        preserveState: true,
        preserveScroll: true,
        replace: true
    })
}

const reloadCurrentState = () => {
    router.get(route('admin-keuangan.equipment.index'), currentIndexQuery.value, {
        preserveState: true,
        preserveScroll: true,
        replace: true
    })
}

const submitPurchase = () => {
    purchaseForm.post(route('admin-keuangan.equipment.purchase'), {
        onSuccess: () => {
            closePurchaseModal()
            purchaseForm.reset()
            reloadCurrentState()
        }
    })
}

const submitDepreciation = () => {
    depreciationForm.post(route('admin-keuangan.equipment.depreciation'), {
        onSuccess: () => {
            closeDepreciationModal()
            depreciationForm.reset()
            reloadCurrentState()
        }
    })
}

const isPurchaseDisabled = computed(() => {
    if (purchaseForm.processing) return true
    if (!purchaseForm.transaction_date || !purchaseForm.asset_name || !purchaseForm.amount || !purchaseForm.source_type) {
        return true
    }
    if (purchaseForm.source_type !== 'opening_balance' && !purchaseForm.pl_account_id) return true
    if (purchaseForm.source_type === 'bank' && !purchaseForm.bank_account_id) return true
    if (purchaseForm.source_type === 'petty_cash' && !purchaseForm.petty_cash_category_id) return true
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
