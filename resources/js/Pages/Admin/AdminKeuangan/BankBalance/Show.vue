<template>
    <AdminKeuanganLayout>
        <Head :title="`Bank ${bank.bank_name} Details`" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">Bank {{ bank.bank_name }} Details</h1>
                            <p class="mt-1 text-sm text-gray-600">
                                Detail saldo dan transaksi bank {{ bank.bank_name }}
                            </p>
                        </div>
                        <Link
                            :href="route('admin-keuangan.bank-balance.index')"
                            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                        >
                            <ArrowLeft class="w-4 h-4 mr-2" />
                            Kembali
                        </Link>
                    </div>
                </div>

                <!-- Bank Info Card -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <CreditCard class="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <div class="ml-6 flex-1">
                                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Bank Name</dt>
                                        <dd class="mt-1 text-lg font-semibold text-gray-900">{{ bank.bank_name }}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Account Number</dt>
                                        <dd class="mt-1 text-lg font-semibold text-gray-900">{{ bank.account_number }}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Account Name</dt>
                                        <dd class="mt-1 text-lg font-semibold text-gray-900">{{ bank.account_name }}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Swift Code</dt>
                                        <dd class="mt-1 text-lg font-semibold text-gray-900">{{ bank.swift_code || '-' }}</dd>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <DollarSign class="h-6 w-6 text-green-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Current Balance</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(currentBalance) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <TrendingUp class="h-6 w-6 text-blue-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Credit This Month</dt>
                                        <dd class="text-lg font-medium text-green-600">{{ formatCurrency(stats.credit_this_month) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <TrendingDown class="h-6 w-6 text-red-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Debit This Month</dt>
                                        <dd class="text-lg font-medium text-red-600">{{ formatCurrency(stats.debit_this_month) }}</dd>
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
                                        <dt class="text-sm font-medium text-gray-500 truncate">Transactions</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.transactions_count }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Net Flow Indicator -->
                <div class="mb-6">
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="px-4 py-5 sm:p-6">
                            <div class="flex items-center justify-between">
                                <div>
                                    <h3 class="text-lg font-medium text-gray-900">Net Cash Flow This Month</h3>
                                    <p class="mt-1 text-sm text-gray-500">
                                        Total credit minus total debit untuk bulan ini
                                    </p>
                                </div>
                                <div class="text-right">
                                    <p :class="stats.net_flow >= 0 ? 'text-2xl font-bold text-green-600' : 'text-2xl font-bold text-red-600'">
                                        {{ formatCurrency(stats.net_flow) }}
                                    </p>
                                    <div class="flex items-center mt-1">
                                        <TrendingUp v-if="stats.net_flow >= 0" class="w-4 h-4 text-green-500 mr-1" />
                                        <TrendingDown v-else class="w-4 h-4 text-red-500 mr-1" />
                                        <span :class="stats.net_flow >= 0 ? 'text-sm text-green-600' : 'text-sm text-red-600'">
                                            {{ stats.net_flow >= 0 ? 'Positive Flow' : 'Negative Flow' }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex space-x-4 mb-6">
                    <Link
                        :href="route('admin-keuangan.bank-balance.history', bank.id)"
                        class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <History class="w-4 h-4 mr-2" />
                        View Full History
                    </Link>
                    <Link
                        :href="route('admin-keuangan.bank-balance.create')"
                        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                    >
                        <Plus class="w-4 h-4 mr-2" />
                        Input Opening Balance
                    </Link>
                </div>

                <!-- Recent Transactions -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h3>

                        <div v-if="transactions && transactions.length > 0" class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Type
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Reference
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="transaction in transactions.slice(0, 10)" :key="transaction.id">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {{ formatDate(transaction.transaction_date) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span :class="transaction.transaction_type === 'credit' ? 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800' : 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800'">
                                                <TrendingUp v-if="transaction.transaction_type === 'credit'" class="w-3 h-3 mr-1" />
                                                <TrendingDown v-else class="w-3 h-3 mr-1" />
                                                {{ transaction.transaction_type === 'credit' ? 'Credit' : 'Debit' }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                                            {{ transaction.description }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" :class="transaction.transaction_type === 'credit' ? 'text-green-600' : 'text-red-600'">
                                            {{ transaction.transaction_type === 'credit' ? '+' : '-' }}{{ formatCurrency(transaction.amount) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {{ transaction.reference_type || '-' }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div v-else class="text-center py-8">
                            <Activity class="mx-auto h-12 w-12 text-gray-400" />
                            <h3 class="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
                            <p class="mt-1 text-sm text-gray-500">
                                Transaksi akan muncul setelah ada customer payment atau vendor payment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import {
    ArrowLeft, CreditCard, DollarSign, TrendingUp, TrendingDown,
    Activity, History, Plus
} from 'lucide-vue-next'

defineProps({
    bank: {
        type: Object,
        required: true
    },
    currentBalance: {
        type: Number,
        default: 0
    },
    stats: {
        type: Object,
        default: () => ({
            credit_this_month: 0,
            debit_this_month: 0,
            transactions_count: 0,
            net_flow: 0
        })
    },
    transactions: {
        type: Array,
        default: () => []
    }
})

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount || 0)
}

const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}
</script>