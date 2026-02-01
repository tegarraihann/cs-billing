<template>
    <AdminKeuanganLayout>
        <Head title="Accounts Receivable" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Accounts Receivable</h1>
                        <p class="mt-1 text-sm text-gray-600">Manage receivables and customer payments</p>
                    </div>
                </div>

                <!-- Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <DollarSign class="h-6 w-6 text-blue-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Outstanding</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(summary.total_outstanding) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <AlertTriangle class="h-6 w-6 text-red-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Overdue</dt>
                                        <dd class="text-lg font-medium text-red-600">{{ formatCurrency(summary.total_overdue) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <FileText class="h-6 w-6 text-yellow-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Overdue Count</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ summary.count_overdue }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <CheckCircle class="h-6 w-6 text-green-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Outstanding Active</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ summary.count_outstanding }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Filters</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
                                <input
                                    v-model="searchForm.search"
                                    type="text"
                                    placeholder="Search invoices or customers..."
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @input="debounceSearch"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    v-model="searchForm.status"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="applyFilters"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="outstanding">Outstanding</option>
                                    <option value="partial">Partial</option>
                                    <option value="overdue">Overdue</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                                <select
                                    v-model="searchForm.customer_id"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="applyFilters"
                                >
                                    <option value="">All Customers</option>
                                    <option
                                        v-for="customer in customers"
                                        :key="customer.id"
                                        :value="customer.id"
                                    >
                                        {{ customer.company_name }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                                <input
                                    v-model="searchForm.date_from"
                                    type="date"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="applyFilters"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                                <input
                                    v-model="searchForm.date_to"
                                    type="date"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="applyFilters"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            <!-- Customer Summary Section (only show if there are results) -->
            <div v-if="customerSummary && customerSummary.length > 0" class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                <div class="px-4 py-5 sm:p-6">
                    <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Customer Summary</h3>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Invoice</th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
                                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
                                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Count</th>
                                    <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue Count</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="customer in customerSummary" :key="customer.customer_id" class="hover:bg-gray-50">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ customer.customer_name }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{{ formatCurrency(customer.total_amount) }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900">{{ formatCurrency(customer.total_paid) }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold" :class="customer.total_outstanding > 0 ? 'text-red-600' : 'text-green-600'">
                                        {{ formatCurrency(customer.total_outstanding) }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900">{{ customer.count_invoices }}</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-center" :class="customer.count_overdue > 0 ? 'text-red-600 font-semibold' : 'text-gray-900'">
                                        {{ customer.count_overdue }}
                                    </td>
                                </tr>
                            </tbody>
                        <tfoot class="bg-gray-50 font-semibold">
                            <tr>
                                <td class="py-2 text-sm text-gray-900">Total</td>
                                <td class="py-2 text-sm text-right text-gray-900">
                                    Rp {{ formatNumber(customerSummaryTotals.totalAmount) }}
                                </td>
                                <td class="py-2 text-sm text-right text-gray-900">
                                    Rp {{ formatNumber(customerSummaryTotals.totalPaid) }}
                                </td>
                                <td class="py-2 text-sm text-right text-red-600">
                                    Rp {{ formatNumber(customerSummaryTotals.totalOutstanding) }}
                                </td>
                                <td class="py-2 text-sm text-center text-gray-900">
                                    {{ customerSummaryTotals.totalInvoices }}
                                </td>
                                <td class="py-2 text-sm text-center text-red-600">
                                    {{ customerSummaryTotals.totalOverdue }}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                    </div>
                </div>
            </div>

            <!-- Table Section -->
            <div class="bg-white shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 sm:p-6">
                    <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Invoice
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    SO Number
                                </th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Paid
                                </th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Outstanding
                                </th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr
                                v-for="receivable in receivables.data"
                                :key="receivable.id"
                                class="hover:bg-gray-50"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ receivable.invoice_number }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ formatDate(receivable.invoice_date) }}
                                    </div>
                                    <div
                                        v-if="receivable.is_opening"
                                        class="mt-1 inline-flex items-center rounded-full bg-sage-100 px-2 py-0.5 text-xs font-semibold text-sage-700"
                                    >
                                        {{ openingTypeLabel(receivable.opening_type) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ receivable.customer?.company_name || receivable.customer_name }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {{ receivable.sales_order?.order_number || receivable.source_so_number || '-' }}
                                    <div v-if="receivable.is_opening && receivable.opening_payment_date" class="text-xs text-gray-500">
                                        Opening Payment: {{ formatDate(receivable.opening_payment_date) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                    Rp {{ formatNumber(receivable.invoice_amount) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                    Rp {{ formatNumber(receivable.paid_amount) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                    Rp {{ formatNumber(receivable.outstanding_amount) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <span
                                        :class="getStatusClass(receivable.status)"
                                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                                    >
                                        {{ getStatusText(receivable.status) }}
                                        <span v-if="receivable.days_overdue > 0" class="ml-1">
                                            ({{ receivable.days_overdue }} days)
                                        </span>
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <div class="flex items-center justify-center space-x-2">
                                        <button
                                            @click="showReceivable(receivable)"
                                            class="text-blue-600 hover:text-blue-900"
                                            title="View Details"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                        </button>
                                        <button
                                            v-if="receivable.status !== 'paid'"
                                            @click="openPaymentModal(receivable)"
                                            class="text-green-600 hover:text-green-900"
                                            title="Record Payment"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                            </svg>
                                        </button>
                                        <button
                                            v-if="receivable.customer || receivable.customer_id"
                                            type="button"
                                            class="text-purple-600 hover:text-purple-900"
                                            title="Generate SOA"
                                            @click.stop="downloadSOA(receivable)"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        <!-- Footer with totals for current page -->
                        <tfoot class="bg-gray-100 font-semibold">
                            <tr>
                                <td colspan="3" class="px-6 py-4 text-left text-sm text-gray-900">
                                    Total This Page ({{ receivables.data.length }} items)
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                    Rp {{ formatNumber(currentPageTotals.totalAmount) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                    Rp {{ formatNumber(currentPageTotals.totalPaid) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                    Rp {{ formatNumber(currentPageTotals.totalOutstanding) }}
                                </td>
                                <td colspan="2" class="px-6 py-4"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                    <div class="flex items-center justify-between">
                        <div class="text-sm text-gray-700">
                            Showing {{ receivables.from || 0 }} to {{ receivables.to || 0 }} of {{ receivables.total || 0 }} results
                        </div>
                        <div class="flex space-x-1">
                            <template v-for="link in receivables.links" :key="link.label">
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

        <!-- Payment Modal -->
        <div v-if="showPaymentModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-12 mx-auto w-full max-w-lg px-4">
                <div class="bg-white rounded-lg shadow-lg border">
                    <div class="flex items-center justify-between px-6 py-4 border-b">
                        <div>
                            <h3 class="text-lg font-medium text-gray-900">Record Payment</h3>
                            <p class="text-sm text-gray-600 mt-1">
                                Invoice {{ selectedReceivable?.invoice_number }}
                                <span v-if="paymentContext.outstanding_amount">
                                    · Outstanding: Rp {{ formatNumber(paymentContext.outstanding_amount) }}
                                </span>
                            </p>
                        </div>
                        <button @click="closePaymentModal" class="text-gray-400 hover:text-gray-600">
                            <span class="sr-only">Close</span>
                            ✕
                        </button>
                    </div>

                    <div class="px-6 py-5">
                        <div v-if="paymentDataLoading" class="py-6 text-center text-sm text-gray-600">
                            Loading payment data...
                        </div>

                        <div v-else>
                            <div v-if="paymentDataError" class="mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
                                {{ paymentDataError }}
                            </div>

                            <form @submit.prevent="recordPayment">
                                <div v-if="paymentComponents.length > 0" class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">
                                        Payment Component <span v-if="requiresComponent">*</span>
                                    </label>
                                    <select
                                        v-model="paymentForm.component_id"
                                        :disabled="paymentComponents.length === 1"
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Select Component</option>
                                        <option v-for="component in paymentComponents" :key="component.id" :value="component.id.toString()">
                                            {{ getComponentLabel(component.component_type) }} - Outstanding Rp {{ formatNumber(component.outstanding_amount) }}
                                        </option>
                                    </select>
                                    <p v-if="formErrors.component_id" class="mt-1 text-xs text-red-600">{{ formErrors.component_id }}</p>
                                </div>

                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                                    <input
                                        v-model="paymentForm.amount"
                                        type="text"
                                        @input="formatAmountInput"
                                        @blur="validateAmount"
                                        :disabled="requiresComponent && !paymentForm.component_id"
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Enter amount (e.g., 2500 or 2.500)"
                                    />
                                    <p v-if="amountError" class="mt-1 text-xs text-red-600">{{ amountError }}</p>
                                    <p v-else-if="formErrors.amount" class="mt-1 text-xs text-red-600">{{ formErrors.amount }}</p>
                                    <p v-else class="mt-1 text-xs text-gray-500">
                                        Maximum: Rp {{ formatNumber(currentOutstandingLimit) }}
                                    </p>
                                </div>

                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
                                    <input
                                        v-model="paymentForm.payment_date"
                                        type="date"
                                        required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    <p v-if="formErrors.payment_date" class="mt-1 text-xs text-red-600">{{ formErrors.payment_date }}</p>
                                </div>

                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Bank Account *</label>
                                    <select
                                        v-model="paymentForm.bank_account_id"
                                        required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">Select Bank Account</option>
                                        <option v-for="bank in bankAccounts" :key="bank.id" :value="bank.id.toString()">
                                            {{ bank.bank_name }} · {{ bank.account_name }} ({{ bank.account_number }})
                                        </option>
                                    </select>
                                    <p v-if="bankAccounts.length === 0" class="mt-1 text-xs text-red-600">
                                        No active bank accounts. Add a bank account first.
                                    </p>
                                    <p v-if="formErrors.bank_account_id" class="mt-1 text-xs text-red-600">{{ formErrors.bank_account_id }}</p>
                                </div>

                                <div class="mb-6">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                    <textarea
                                        v-model="paymentForm.notes"
                                        rows="3"
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Payment notes (optional)"
                                    ></textarea>
                                    <p v-if="formErrors.notes" class="mt-1 text-xs text-red-600">{{ formErrors.notes }}</p>
                                </div>

                                <div class="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        @click="closePaymentModal"
                                        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        :disabled="processing || bankAccounts.length === 0"
                                        class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                                    >
                                        {{ processing ? 'Saving...' : 'Record Payment' }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { router, Head } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { DollarSign, AlertTriangle, FileText, CheckCircle } from 'lucide-vue-next'
import axios from 'axios'

const props = defineProps({
    receivables: Object,
    summary: Object,
    customerSummary: Array,
    customers: Array,
    filters: Object
})

const searchForm = reactive({
    search: props.filters.search || '',
    status: props.filters.status || '',
    customer_id: props.filters.customer_id || '',
    date_from: props.filters.date_from || '',
    date_to: props.filters.date_to || ''
})

const setDefaultMonthFilter = () => {
    if (props.filters.date_from || props.filters.date_to) {
        return
    }

    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    const format = (date) => date.toISOString().split('T')[0]

    searchForm.date_from = format(start)
    searchForm.date_to = format(end)

    applyFilters()
}

const showPaymentModal = ref(false)
const selectedReceivable = ref(null)
const processing = ref(false)

const paymentForm = reactive({
    component_id: '',
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    bank_account_id: '',
    notes: ''
})

const paymentComponents = ref([])
const bankAccounts = ref([])
const paymentContext = reactive({
    outstanding_amount: 0,
    requires_component: false
})
const paymentDataLoading = ref(false)
const paymentDataError = ref('')
const amountError = ref('')
const formErrors = ref({})

let debounceTimer = null

const debounceSearch = () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        applyFilters()
    }, 500)
}

// Computed property for current page totals
const currentPageTotals = computed(() => {
    if (!props.receivables.data || props.receivables.data.length === 0) {
        return {
            totalAmount: 0,
            totalPaid: 0,
            totalOutstanding: 0
        }
    }

    return {
        totalAmount: props.receivables.data.reduce((sum, item) => sum + (parseFloat(item.invoice_amount) || 0), 0),
        totalPaid: props.receivables.data.reduce((sum, item) => sum + (parseFloat(item.paid_amount) || 0), 0),
        totalOutstanding: props.receivables.data.reduce((sum, item) => sum + (parseFloat(item.outstanding_amount) || 0), 0)
    }
})

// Computed property for customer summary totals
const customerSummaryTotals = computed(() => {
    if (!props.customerSummary || props.customerSummary.length === 0) {
        return {
            totalAmount: 0,
            totalPaid: 0,
            totalOutstanding: 0,
            totalInvoices: 0,
            totalOverdue: 0
        }
    }

    return {
        totalAmount: props.customerSummary.reduce((sum, customer) => sum + (parseFloat(customer.total_amount) || 0), 0),
        totalPaid: props.customerSummary.reduce((sum, customer) => sum + (parseFloat(customer.total_paid) || 0), 0),
        totalOutstanding: props.customerSummary.reduce((sum, customer) => sum + (parseFloat(customer.total_outstanding) || 0), 0),
        totalInvoices: props.customerSummary.reduce((sum, customer) => sum + (parseInt(customer.count_invoices) || 0), 0),
        totalOverdue: props.customerSummary.reduce((sum, customer) => sum + (parseInt(customer.count_overdue) || 0), 0)
    }
})

const applyFilters = () => {
    router.get(route('admin-keuangan.account-receivables.index'), searchForm, {
        preserveState: true,
        replace: true
    })
}

onMounted(() => {
    setDefaultMonthFilter()
})

const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID').format(number || 0)
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount || 0)
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const openingTypeLabel = (type) => {
    if (type === 'reimbursement') {
        return 'Opening Balance - Reimbursement'
    }
    return 'Opening Balance - Main'
}

const getComponentLabel = (type) => {
    switch (type) {
        case 'invoice_main':
            return 'Invoice Main'
        case 'debit_note':
            return 'Debit Note'
        case 'reimbursement':
            return 'Reimbursement'
        default:
            return type ? type.replace(/_/g, ' ').toUpperCase() : 'Component'
    }
}

const getStatusClass = (status) => {
    const classes = {
        outstanding: 'bg-yellow-100 text-yellow-800',
        partial: 'bg-blue-100 text-blue-800',
        overdue: 'bg-red-100 text-red-800',
        paid: 'bg-green-100 text-green-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
    const texts = {
        outstanding: 'Outstanding',
        partial: 'Partial',
        overdue: 'Overdue',
        paid: 'Paid'
    }
    return texts[status] || status
}

const showReceivable = (receivable) => {
    router.visit(route('admin-keuangan.account-receivables.show', receivable.id))
}

const openPaymentModal = (receivable) => {
    selectedReceivable.value = receivable
    showPaymentModal.value = true
    paymentDataLoading.value = true
    paymentDataError.value = ''
    paymentComponents.value = []
    bankAccounts.value = []
    paymentForm.component_id = ''
    paymentForm.amount = ''
    paymentForm.payment_date = new Date().toISOString().split('T')[0]
    paymentForm.bank_account_id = ''
    paymentForm.notes = ''
    amountError.value = ''
    formErrors.value = {}

    axios
        .get(route('admin-keuangan.account-receivables.payment-data', receivable.id))
        .then(({ data }) => {
            paymentComponents.value = (data.components || []).map((component) => ({
                ...component,
                id: component.id.toString()
            }))
            bankAccounts.value = (data.bank_accounts || []).map((bank) => ({
                ...bank,
                id: bank.id.toString()
            }))
            paymentContext.outstanding_amount = data.receivable?.outstanding_amount || 0
            paymentContext.requires_component = !!data.requires_component
            paymentForm.payment_date = data.default_payment_date || new Date().toISOString().split('T')[0]
            paymentForm.bank_account_id = bankAccounts.value.length > 0 ? bankAccounts.value[0].id : ''

            if (paymentComponents.value.length === 1) {
                paymentForm.component_id = paymentComponents.value[0].id
            }

            amountError.value = ''
            formErrors.value = {}
        })
        .catch(() => {
            paymentDataError.value = 'Failed to load payment data. Please try again.'
        })
        .finally(() => {
            paymentDataLoading.value = false
        })
}

const closePaymentModal = () => {
    showPaymentModal.value = false
    selectedReceivable.value = null
    paymentComponents.value = []
    bankAccounts.value = []
    paymentContext.outstanding_amount = 0
    paymentContext.requires_component = false
    paymentForm.component_id = ''
    paymentForm.amount = ''
    paymentForm.bank_account_id = ''
    paymentForm.notes = ''
    amountError.value = ''
    paymentDataError.value = ''
    formErrors.value = {}
}

const recordPayment = () => {
    amountError.value = ''
    if (formErrors.value.amount) {
        const { amount, ...rest } = formErrors.value
        formErrors.value = rest
    }

    validateAmount()
    if (amountError.value) {
        return
    }

    processing.value = true

    router.post(
        route('admin-keuangan.account-receivables.record-payment', selectedReceivable.value.id),
        {
            component_id: paymentForm.component_id || null,
            amount: paymentForm.amount,
            payment_date: paymentForm.payment_date,
            bank_account_id: paymentForm.bank_account_id,
            notes: paymentForm.notes
        },
        {
            preserveScroll: true,
            onSuccess: () => {
                formErrors.value = {}
                closePaymentModal()
            },
            onError: (errors) => {
                formErrors.value = { ...errors }
                if (errors?.amount) {
                    amountError.value = ''
                }
            },
            onFinish: () => {
                processing.value = false
            }
        }
    )
}

const selectedComponent = computed(() => {
    if (!paymentForm.component_id) {
        return null
    }
    return paymentComponents.value.find((component) => component.id === paymentForm.component_id) || null
})
const requiresComponent = computed(() => paymentContext.requires_component)
const currentOutstandingLimit = computed(() => {
    if (selectedComponent.value) {
        return selectedComponent.value.outstanding_amount || 0
    }
    return paymentContext.outstanding_amount || 0
})

const clearFormError = (field) => {
    if (formErrors.value[field]) {
        const newErrors = { ...formErrors.value }
        delete newErrors[field]
        formErrors.value = newErrors
    }
}

const formatAmountInput = (event) => {
    clearFormError('amount')
    amountError.value = ''

    if (requiresComponent.value && !paymentForm.component_id) {
        amountError.value = 'Select a component first'
        paymentForm.amount = ''
        return
    }

    let value = event.target.value || ''
    value = value.replace(/[^\d.,]/g, '')
    paymentForm.amount = value
}

const validateAmount = () => {
    clearFormError('amount')
    amountError.value = ''

    if (requiresComponent.value && !paymentForm.component_id) {
        amountError.value = 'Select a component first'
        return
    }

    const rawValue = (paymentForm.amount || '').toString().trim()
    if (!rawValue) {
        amountError.value = 'Amount is required'
        return
    }

    let normalizedValue = rawValue

    if (rawValue.includes('.') && rawValue.includes(',')) {
        normalizedValue = rawValue.replace(/\./g, '').replace(',', '.')
    } else if (rawValue.includes('.') && !rawValue.includes(',')) {
        const parts = rawValue.split('.')
        if (parts.length === 2) {
            const decimalPart = parts[1]
            if (decimalPart.length <= 2 && parseInt(decimalPart) < 100 && parts[0].length <= 4) {
                normalizedValue = rawValue
            } else {
                normalizedValue = rawValue.replace(/\./g, '')
            }
        } else {
            normalizedValue = rawValue.replace(/\./g, '')
        }
    } else if (rawValue.includes(',')) {
        normalizedValue = rawValue.replace(',', '.')
    }

    const numericValue = parseFloat(normalizedValue)
    if (isNaN(numericValue) || numericValue <= 0) {
        amountError.value = 'Please enter a valid amount'
        return
    }

    const limit = currentOutstandingLimit.value
    if (numericValue > limit) {
        const label = selectedComponent.value
            ? getComponentLabel(selectedComponent.value.component_type)
            : 'invoice'
        amountError.value = `Amount cannot exceed outstanding balance for ${label} (Rp ${formatNumber(limit)})`
        return
    }

    paymentForm.amount = normalizedValue
}

watch(
    () => paymentForm.component_id,
    (newValue, oldValue) => {
        if (newValue !== oldValue) {
            clearFormError('component_id')
            amountError.value = ''
            if (!newValue && requiresComponent.value) {
                paymentForm.amount = ''
                return
            }
            if (selectedComponent.value) {
                paymentForm.amount = selectedComponent.value.outstanding_amount
            }
        }
    }
)

const getSoaUrl = (receivable) => {
    const customerId = receivable?.customer?.id || receivable?.customer_id
    if (!customerId) {
        return '#'
    }

    const params = new URLSearchParams()
    if (searchForm.date_from) {
        params.set('date_from', searchForm.date_from)
    }
    if (searchForm.date_to) {
        params.set('date_to', searchForm.date_to)
    }

    const queryString = params.toString()
    const baseUrl = `/admin-keuangan/account-receivables/customers/${customerId}/generate-soa`

    return queryString ? `${baseUrl}?${queryString}` : baseUrl
}

const downloadSOA = (receivable) => {
    const url = getSoaUrl(receivable)
    if (url === '#') {
        return
    }

    window.location.href = url
}

const visitPage = (url) => {
    router.visit(url, {
        preserveState: true,
        replace: true
    })
}
</script>
