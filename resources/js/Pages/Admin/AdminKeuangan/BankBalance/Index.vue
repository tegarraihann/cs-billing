<template>
    <AdminKeuanganLayout>
        <Head title="Bank Balance Management" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Bank Balance Management</h1>
                        <p class="mt-1 text-sm text-gray-600">Manage bank balances and input monthly opening balances.</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <button
                            type="button"
                            @click="showTransfer = true"
                            class="inline-flex items-center px-4 py-2 border border-sage-300 rounded-md font-semibold text-xs text-sage-700 uppercase tracking-widest hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <ArrowLeftRight class="w-4 h-4 mr-2" />
                            Transfer Bank
                        </button>
                        <Link
                            :href="route('admin-keuangan.bank-balance.create')"
                            class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <Plus class="w-4 h-4 mr-2" />
                            Input Opening Balance
                        </Link>
                    </div>
                </div>

                <!-- Period Filter -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Period Filter</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Period (YYYY-MM)</label>
                                <input
                                    v-model="filterForm.period_month"
                                    type="month"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                            </div>
                            <div class="flex items-end">
                                <button
                                    type="button"
                                    @click="applyFilters"
                                    class="w-full px-4 py-2 bg-sage-600 text-white rounded-md transition-colors hover:bg-sage-700"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="showTransfer" class="bg-white border border-sage-200 rounded-lg shadow-sm p-6 mb-6">
                    <div class="flex items-center justify-between mb-4">
                        <div>
                            <h2 class="text-lg font-semibold text-gray-900">Bank Transfer</h2>
                            <p class="text-sm text-gray-500">Move funds between bank accounts without affecting other modules.</p>
                        </div>
                        <button
                            type="button"
                            @click="closeTransfer"
                            class="text-xs font-semibold text-gray-500 uppercase tracking-widest hover:text-gray-700"
                        >
                            Close
                        </button>
                    </div>

                    <form @submit.prevent="submitTransfer" class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">From Bank</label>
                                <select
                                    v-model="transferForm.from_bank_id"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                >
                                    <option value="">Select bank</option>
                                    <option v-for="bank in bankData" :key="bank.id" :value="bank.id">
                                        {{ bank.bank_name }} - {{ bank.account_number }}
                                    </option>
                                </select>
                                <div v-if="transferForm.errors.from_bank_id" class="text-xs text-red-600 mt-2">{{ transferForm.errors.from_bank_id }}</div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">To Bank</label>
                                <select
                                    v-model="transferForm.to_bank_id"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                >
                                    <option value="">Select bank</option>
                                    <option v-for="bank in bankData" :key="bank.id" :value="bank.id">
                                        {{ bank.bank_name }} - {{ bank.account_number }}
                                    </option>
                                </select>
                                <div v-if="transferForm.errors.to_bank_id" class="text-xs text-red-600 mt-2">{{ transferForm.errors.to_bank_id }}</div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Transfer Date</label>
                                <input
                                    v-model="transferForm.transfer_date"
                                    type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                                <div v-if="transferForm.errors.transfer_date" class="text-xs text-red-600 mt-2">{{ transferForm.errors.transfer_date }}</div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Amount (IDR)</label>
                                <input
                                    v-model="transferForm.amount"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                                <div v-if="transferForm.errors.amount" class="text-xs text-red-600 mt-2">{{ transferForm.errors.amount }}</div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                            <textarea
                                v-model="transferForm.notes"
                                rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                placeholder="Transfer notes"
                            ></textarea>
                            <div v-if="transferForm.errors.notes" class="text-xs text-red-600 mt-2">{{ transferForm.errors.notes }}</div>
                        </div>

                        <div class="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                @click="closeTransfer"
                                class="inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                :disabled="transferForm.processing"
                                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                Save Transfer
                            </button>
                        </div>

                        <div v-if="transferForm.errors.error" class="text-xs text-red-600">{{ transferForm.errors.error }}</div>
                    </form>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <CreditCard class="h-6 w-6 text-blue-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Mandiri Bank Balance</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats.mandiri_balance) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <CreditCard class="h-6 w-6 text-green-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">BCA Bank Balance</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats.bca_balance) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <DollarSign class="h-6 w-6 text-sage-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Bank Balance</dt>
                                        <dd class="text-lg font-medium text-sage-600 font-bold">{{ formatCurrency(stats.total_balance) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <Activity class="h-6 w-6 text-purple-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Transactions This Month</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.transactions_this_month }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Current Month Info -->
                <div class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <Calendar class="h-5 w-5 text-blue-400" />
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-blue-800">
                                Active Period: {{ currentMonth }}
                            </h3>
                            <div class="mt-2 text-sm text-blue-700">
                                <p>Make sure the opening balance is entered for this period to keep bank balance tracking accurate.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bank Accounts List -->
                <div class="space-y-6">
                    <div v-for="bank in bankData" :key="bank.id" class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <div class="flex-shrink-0">
                                        <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <CreditCard class="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div class="ml-4">
                                        <h3 class="text-lg font-medium text-gray-900">
                                            Bank {{ bank.bank_name }}
                                        </h3>
                                        <p class="text-sm text-gray-500">
                                            Account: {{ bank.account_number }} • {{ bank.account_name }}
                                        </p>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm text-gray-500">Current Balance</p>
                                    <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(bank.current_balance) }}</p>
                                    <p class="text-xs text-gray-400" v-if="bank.last_updated">
                                        Last updated: {{ formatDate(bank.last_updated) }}
                                    </p>
                                </div>
                            </div>

                            <div class="mt-6 flex justify-between items-center">
                                <div class="flex space-x-4">
                                    <!-- Recent Balances Preview -->
                                    <div v-if="bank.recent_balances && bank.recent_balances.length > 0" class="text-sm text-gray-600">
                                        <span class="font-medium">Recent Opening Balances:</span>
                                        <div class="mt-1 space-y-1">
                                            <div v-for="balance in bank.recent_balances.slice(0, 3)" :key="balance.id" class="flex justify-between">
                                                <span>{{ balance.period_month }}</span>
                                                <span class="font-medium">{{ formatCurrency(balance.opening_balance) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex space-x-3">
                                    <Link
                                        :href="route('admin-keuangan.bank-balance.history', bank.id)"
                                        class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                                    >
                                        <History class="w-4 h-4 mr-2" />
                                        View History
                                    </Link>
                                    <Link
                                        :href="route('admin-keuangan.bank-balance.show', bank.id)"
                                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                                    >
                                        <Eye class="w-4 h-4 mr-2" />
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="!bankData || bankData.length === 0" class="text-center py-12">
                    <CreditCard class="mx-auto h-12 w-12 text-gray-400" />
                    <h3 class="mt-2 text-sm font-medium text-gray-900">No bank accounts found</h3>
                    <p class="mt-1 text-sm text-gray-500">
                        Bank accounts will appear after opening balances are entered.
                    </p>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { Head, Link, useForm, router } from '@inertiajs/vue3'
import { ref, onMounted } from 'vue'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import {
    Plus,
    CreditCard,
    DollarSign,
    Activity,
    Calendar,
    History,
    Eye,
    TrendingUp,
    ArrowLeftRight,
} from 'lucide-vue-next'

const props = defineProps({
    bankData: {
        type: Array,
        default: () => []
    },
    currentMonth: {
        type: String,
        required: true
    },
    stats: {
        type: Object,
        default: () => ({
            mandiri_balance: 0,
            bca_balance: 0,
            total_balance: 0,
            transactions_this_month: 0
        })
    },
    filters: {
        type: Object,
        default: () => ({})
    }
})

const filterForm = useForm({
    period_month: props.filters?.period_month || props.currentMonth
})

const applyFilters = () => {
    router.get(route('admin-keuangan.bank-balance.index'), {
        period_month: filterForm.period_month
    }, {
        preserveState: true,
        replace: true
    })
}

onMounted(() => {
    if (!props.filters?.period_month) {
        applyFilters()
    }
})

const showTransfer = ref(false)
const transferForm = useForm({
    from_bank_id: '',
    to_bank_id: '',
    transfer_date: new Date().toISOString().slice(0, 10),
    amount: '',
    notes: '',
})

const closeTransfer = () => {
    showTransfer.value = false
    transferForm.reset()
    transferForm.clearErrors()
    transferForm.transfer_date = new Date().toISOString().slice(0, 10)
}

const submitTransfer = () => {
    transferForm.post(route('admin-keuangan.bank-balance.transfer'), {
        onSuccess: () => {
            closeTransfer()
        },
    })
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount || 0)
}

const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}
</script>
