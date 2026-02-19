<template>
    <AdminKeuanganLayout>
        <Head :title="`Bank ${bank.bank_name} History`" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">Bank {{ bank.bank_name }} History</h1>
                            <p class="mt-1 text-sm text-gray-600">
                                Opening balance and transaction history for {{ bank.bank_name }}
                            </p>
                        </div>
                        <div class="flex space-x-3">
                            <Link
                                :href="route('admin-keuangan.bank-balance.show', { bankBalance: bank.id, ...indexFilters })"
                                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                            >
                                <Eye class="w-4 h-4 mr-2" />
                                View Details
                            </Link>
                            <Link
                                :href="route('admin-keuangan.bank-balance.index', indexFilters)"
                                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                            >
                                <ArrowLeft class="w-4 h-4 mr-2" />
                                Back to Overview
                            </Link>
                        </div>
                    </div>
                </div>

                <!-- Current Balance Card -->
                <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg mb-6">
                    <div class="px-6 py-8 text-white">
                        <div class="flex items-center justify-between">
                            <div>
                                <h2 class="text-lg font-medium">Current Balance</h2>
                                <p class="text-3xl font-bold mt-2">{{ formatCurrency(currentBalance) }}</p>
                                <p class="text-blue-100 mt-1">{{ bank.account_number }} • {{ bank.account_name }}</p>
                            </div>
                            <div class="text-right">
                                <CreditCard class="w-16 h-16 text-blue-200" />
                            </div>
                        </div>
                    </div>
                </div>

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

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Opening Balances History -->
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <Calendar class="w-5 h-5 mr-2 text-gray-400" />
                                Opening Balances History
                            </h3>

                            <div v-if="balances && balances.data && balances.data.length > 0" class="space-y-4">
                                <div v-for="balance in balances.data" :key="balance.id" class="border border-gray-200 rounded-lg p-4">
                                    <div class="flex justify-between items-start">
                                        <div>
                                            <h4 class="text-sm font-medium text-gray-900">{{ balance.period_month }}</h4>
                                            <p class="text-lg font-semibold text-sage-600 mt-1">{{ formatCurrency(balance.opening_balance) }}</p>
                                            <p v-if="balance.notes" class="text-sm text-gray-500 mt-1">{{ balance.notes }}</p>
                                        </div>
                                        <div class="text-right">
                                            <p class="text-xs text-gray-400">Created by</p>
                                            <p class="text-sm text-gray-600">{{ balance.creator?.name || '-' }}</p>
                                            <p class="text-xs text-gray-400 mt-1">{{ formatDateTime(balance.created_at) }}</p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Pagination for Balances -->
                                <div v-if="balances.links" class="mt-4">
                                    <div class="flex items-center justify-between">
                                        <div class="text-sm text-gray-700">
                                            Showing {{ balances.from || 0 }} to {{ balances.to || 0 }} of {{ balances.total || 0 }} results
                                        </div>
                                        <div class="flex space-x-1">
                                            <template v-for="link in balances.links" :key="`balances-${link.label}`">
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

                            <div v-else class="text-center py-8">
                                <Calendar class="mx-auto h-12 w-12 text-gray-400" />
                                <h3 class="mt-2 text-sm font-medium text-gray-900">No opening balances found</h3>
                                <p class="mt-1 text-sm text-gray-500">
                                    Opening balances will appear after they are entered.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Transactions -->
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
                                <Activity class="w-5 h-5 mr-2 text-gray-400" />
                                Recent Transactions
                            </h3>

                            <div v-if="transactions && transactions.data && transactions.data.length > 0" class="space-y-3">
                                <div v-for="transaction in transactions.data" :key="transaction.id" class="border border-gray-200 rounded-lg p-4">
                                    <div class="flex justify-between items-start">
                                        <div class="flex-1">
                                            <div class="flex items-center space-x-2">
                                                <span :class="transaction.transaction_type === 'credit' ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800' : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'">
                                                    <TrendingUp v-if="transaction.transaction_type === 'credit'" class="w-3 h-3 mr-1" />
                                                    <TrendingDown v-else class="w-3 h-3 mr-1" />
                                                    {{ transaction.transaction_type === 'credit' ? 'Credit' : 'Debit' }}
                                                </span>
                                                <span class="text-xs text-gray-500">{{ formatDate(transaction.transaction_date) }}</span>
                                            </div>
                                            <p class="text-sm text-gray-900 mt-1 font-medium">{{ transaction.description }}</p>
                                            <p class="text-xs text-gray-500 mt-1">{{ transaction.reference_type || 'Manual' }}</p>
                                        </div>
                                        <div class="text-right ml-4">
                                            <p :class="transaction.transaction_type === 'credit' ? 'text-lg font-semibold text-green-600' : 'text-lg font-semibold text-red-600'">
                                                {{ transaction.transaction_type === 'credit' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Pagination for Transactions -->
                                <div v-if="transactions.links" class="mt-4">
                                    <div class="flex items-center justify-between">
                                        <div class="text-sm text-gray-700">
                                            Showing {{ transactions.from || 0 }} to {{ transactions.to || 0 }} of {{ transactions.total || 0 }} results
                                        </div>
                                        <div class="flex space-x-1">
                                            <template v-for="link in transactions.links" :key="`transactions-${link.label}`">
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

                            <div v-else class="text-center py-8">
                                <Activity class="mx-auto h-12 w-12 text-gray-400" />
                                <h3 class="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
                                <p class="mt-1 text-sm text-gray-500">
                                    Transactions will appear after customer or vendor payments are posted.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { computed } from 'vue'
import { Head, Link, router, useRemember } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import {
    ArrowLeft, Eye, CreditCard, Calendar, Activity,
    TrendingUp, TrendingDown
} from 'lucide-vue-next'

const props = defineProps({
    bank: {
        type: Object,
        required: true
    },
    balances: {
        type: Object,
        default: () => ({ data: [] })
    },
    transactions: {
        type: Object,
        default: () => ({ data: [] })
    },
    currentBalance: {
        type: Number,
        default: 0
    },
    filters: {
        type: Object,
        default: () => ({})
    }
})

const filterForm = useRemember({
    period_month: props.filters?.period_month || ''
}, `bank-balance-history-filters-${props.bank?.id}`)

const indexFilters = computed(() => ({
    period_month: filterForm.period_month || undefined
}))

const applyFilters = () => {
    router.get(route('admin-keuangan.bank-balance.history', props.bank.id), {
        period_month: filterForm.period_month || undefined
    }, {
        preserveState: true,
        preserveScroll: true,
        replace: true
    })
}

const visitPage = (url) => {
    router.visit(url, {
        data: {
            period_month: filterForm.period_month || undefined
        },
        preserveState: true,
        preserveScroll: true,
        replace: true
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
        day: 'numeric'
    })
}

const formatDateTime = (datetime) => {
    if (!datetime) return '-'
    return new Date(datetime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}
</script>
