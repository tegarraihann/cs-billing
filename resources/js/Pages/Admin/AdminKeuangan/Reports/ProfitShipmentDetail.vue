<template>
    <AdminKeuanganLayout>
        <Head title="Shipment Profit Details" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Shipment Profit Details</h1>
                        <p class="mt-1 text-sm text-gray-600">Profit analysis details for Sales Order {{ salesOrder.order_number }}</p>
                    </div>
                    <Link
                        :href="route('admin-keuangan.profit-reports.index')"
                        class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                        </svg>
                        Back
                    </Link>
                </div>

                <!-- Sales Order Info -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <h3 class="text-lg font-medium text-gray-900 mb-3">Sales Order Information</h3>
                                <dl class="space-y-2">
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Order Number</dt>
                                        <dd class="text-sm text-gray-900">{{ salesOrder.order_number }}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Customer</dt>
                                        <dd class="text-sm text-gray-900">{{ salesOrder.customer?.company_name || salesOrder.customer }}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Created Date</dt>
                                        <dd class="text-sm text-gray-900">{{ formatDate(salesOrder.created_at) }}</dd>
                                    </div>
                                    <div>
                                        <dt class="text-sm font-medium text-gray-500">Status</dt>
                                        <dd class="text-sm">
                                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                {{ salesOrder.status }}
                                            </span>
                                        </dd>
                                    </div>
                                </dl>
                            </div>

                            <div>
                                <h3 class="text-lg font-medium text-gray-900 mb-3">Total Selling</h3>
                                <div class="text-3xl font-bold text-green-600">
                                    Rp {{ formatNumber(salesOrder.total_selling) }}
                                </div>
                            </div>

                            <div>
                                <h3 class="text-lg font-medium text-gray-900 mb-3">Status Profit</h3>
                                <span
                                    :class="getProfitStatusClass(profitAnalysis.profit_status)"
                                    class="inline-flex px-3 py-2 text-sm font-semibold rounded-lg"
                                >
                                    {{ getProfitStatusText(profitAnalysis.profit_status) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Profit Analysis Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div class="text-sm font-medium text-gray-500 mb-1">Revenue</div>
                        <div class="text-lg font-bold text-gray-900">
                            Rp {{ formatNumber(profitAnalysis.revenue) }}
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div class="text-sm font-medium text-gray-500 mb-1">Operational Costs</div>
                        <div class="text-lg font-bold text-gray-900">
                            Rp {{ formatNumber(profitAnalysis.operational_costs) }}
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div class="text-sm font-medium text-gray-500 mb-1">Tax Expense</div>
                        <div class="text-lg font-bold text-gray-900">
                            Rp {{ formatNumber(profitAnalysis.tax_expense) }}
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div class="text-sm font-medium text-gray-500 mb-1">Net Profit</div>
                        <div class="text-lg font-bold" :class="profitAnalysis.profit >= 0 ? 'text-green-600' : 'text-red-600'">
                            Rp {{ formatNumber(profitAnalysis.profit) }}
                        </div>
                    </div>
                    <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div class="text-sm font-medium text-gray-500 mb-1">Profit Margin</div>
                        <div class="text-lg font-bold text-gray-900">
                            {{ formatPercentage(profitAnalysis.profit_margin) }}%
                        </div>
                    </div>
                </div>

                <!-- Revenue Breakdown -->
                <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <div class="px-6 py-4 border-b border-gray-200 bg-blue-50">
                        <h3 class="text-lg font-semibold text-blue-800">Revenue Breakdown</h3>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Invoice Number
                                    </th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Paid Amount
                                    </th>
                                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="revenue in revenueBreakdown" :key="revenue.invoice_number" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">{{ revenue.invoice_number }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                        Rp {{ formatNumber(revenue.total) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                        Rp {{ formatNumber(revenue.paid_amount) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        <span
                                            :class="getInvoiceStatusClass(revenue.status)"
                                            class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                                        >
                                            {{ getInvoiceStatusText(revenue.status) }}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-if="revenueBreakdown.length === 0">
                                    <td colspan="4" class="px-6 py-4 text-center text-gray-500">
                                        No invoice data
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Cost Breakdown -->
                <div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                    <div class="px-6 py-4 border-b border-gray-200 bg-red-50">
                        <h3 class="text-lg font-semibold text-red-800">Cost Breakdown by Vendor</h3>
                    </div>
                    <div class="px-6 py-4 border-b border-gray-200 bg-white">
                        <div class="flex items-center justify-between text-sm font-medium text-gray-700">
                            <span>Tax Expense</span>
                            <span class="text-gray-900">Rp {{ formatNumber(profitAnalysis.tax_expense) }}</span>
                        </div>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vendor
                                    </th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total Cost
                                    </th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Paid Amount
                                    </th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Outstanding
                                    </th>
                                    <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Services
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="cost in costBreakdown" :key="cost.vendor_name" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm font-medium text-gray-900">{{ cost.vendor_name }}</div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                        Rp {{ formatNumber(cost.total_cost) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                        Rp {{ formatNumber(cost.paid_amount) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                        Rp {{ formatNumber(cost.outstanding_amount) }}
                                    </td>
                                    <td class="px-6 py-4 text-center">
                                        <div class="space-y-1">
                                            <div v-for="service in cost.services" :key="service.description" class="text-xs text-gray-600">
                                                {{ service.description }} - Rp {{ formatNumber(service.amount) }}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="costBreakdown.length === 0">
                                    <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                                        No vendor cost data
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Invoice Items Detail -->
                <div v-if="revenueBreakdown.length > 0" class="space-y-6">
                    <div v-for="revenue in revenueBreakdown" :key="revenue.invoice_number" class="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h3 class="text-lg font-semibold text-gray-800">Items - {{ revenue.invoice_number }}</h3>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Description
                                        </th>
                                        <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Quantity
                                        </th>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Rate
                                        </th>
                                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Amount
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="item in revenue.items" :key="item.id" class="hover:bg-gray-50">
                                        <td class="px-6 py-4">
                                            <div class="text-sm text-gray-900">{{ item.description }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                            {{ formatNumber(item.quantity) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                            Rp {{ formatNumber(item.rate) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                            Rp {{ formatNumber(item.amount) }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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

const props = defineProps({
    salesOrder: Object,
    profitAnalysis: Object,
    costBreakdown: Array,
    revenueBreakdown: Array
})

const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID').format(number || 0)
}

const formatPercentage = (number) => {
    return (number || 0).toFixed(1)
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const getProfitStatusClass = (status) => {
    const classes = {
        excellent: 'bg-green-100 text-green-800',
        good: 'bg-blue-100 text-blue-800',
        low: 'bg-yellow-100 text-yellow-800',
        breakeven: 'bg-gray-100 text-gray-800',
        loss: 'bg-red-100 text-red-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
}

const getProfitStatusText = (status) => {
    const texts = {
        excellent: 'Excellent Profit',
        good: 'Good Profit',
        low: 'Low Profit',
        breakeven: 'Breakeven',
        loss: 'Loss'
    }
    return texts[status] || status
}

const getInvoiceStatusClass = (status) => {
    const classes = {
        draft: 'bg-gray-100 text-gray-800',
        sent: 'bg-blue-100 text-blue-800',
        paid: 'bg-green-100 text-green-800',
        overdue: 'bg-red-100 text-red-800',
        cancelled: 'bg-red-100 text-red-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
}

const getInvoiceStatusText = (status) => {
    const texts = {
        draft: 'Draft',
        sent: 'Sent',
        paid: 'Paid',
        overdue: 'Overdue',
        cancelled: 'Cancelled'
    }
    return texts[status] || status
}
</script>
