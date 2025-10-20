<template>
    <AdminKeuanganLayout>
        <Head title="Bank Balance Management" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Bank Balance Management</h1>
                        <p class="mt-1 text-sm text-gray-600">Kelola saldo bank dan input opening balance bulanan</p>
                    </div>
                    <Link
                        :href="route('admin-keuangan.bank-balance.create')"
                        class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <Plus class="w-4 h-4 mr-2" />
                        Input Opening Balance
                    </Link>
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
                                        <dt class="text-sm font-medium text-gray-500 truncate">Saldo Bank Mandiri</dt>
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
                                        <dt class="text-sm font-medium text-gray-500 truncate">Saldo Bank BCA</dt>
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
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Saldo Bank</dt>
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
                                        <dt class="text-sm font-medium text-gray-500 truncate">Transaksi Bulan Ini</dt>
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
                                Periode Aktif: {{ currentMonth }}
                            </h3>
                            <div class="mt-2 text-sm text-blue-700">
                                <p>Pastikan opening balance sudah diinput untuk periode ini agar tracking saldo bank akurat.</p>
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
                        Bank accounts akan muncul setelah opening balance diinput.
                    </p>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import {
    Plus, CreditCard, DollarSign, Activity, Calendar,
    History, Eye, TrendingUp
} from 'lucide-vue-next'

defineProps({
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
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}
</script>