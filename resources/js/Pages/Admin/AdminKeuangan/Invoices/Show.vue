<template>
    <AdminKeuanganLayout>
        <div class="p-4 sm:p-6 lg:p-8">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
                <div class="flex itemss-center justify-between">
                    <div>
                        <h2 class="text-2xl font-bold text-sage-800">Invoice Details</h2>
                        <p class="text-sage-600">{{ invoice.invoice_number }}</p>
                    </div>
                    <div class="flex space-x-3">
                        <Link :href="backToIndexUrl"
                            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-600 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back
                        </Link>
                        <button @click="showMarkSentModal = true"
                            class="inline-flex itemss-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            v-if="invoice.status === 'draft'">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Mark as Sent
                        </button>
                        <button @click="fixOperationalCosts"
                            class="inline-flex itemss-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                            v-if="shouldShowFixOperationalCostsButton">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-l  inecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Fix Operational Costs
                        </button>
                        <button @click="openProfitLossModal"
                            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-600 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            v-if="shouldShowProfitLossButton">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Post to Profit & Loss
                        </button>
                        <button @click="unpostFromProfitLoss"
                            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-600 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            v-if="invoice.posted_to_profit_loss">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                            Unpost Profit & Loss
                        </button>
                    </div>
                </div>
            </div>

            <!-- Invoice Info -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <!-- Basic Info -->
                <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
                    <h3 class="text-lg font-semibold text-sage-800 mb-4">Invoice Information</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Invoice Number:</span>
                            <span class="font-medium">{{ invoice.invoice_number }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Sales Order:</span>
                            <span class="font-medium">{{ invoice.sales_order?.order_number }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Customer:</span>
                            <span class="font-medium">{{ invoice.customer?.consignee_shipper ||
                                invoice.customer?.company_name }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Invoice Date:</span>
                            <span class="font-medium">{{ formatDate(invoice.invoice_date) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Due Date:</span>
                            <span class="font-medium">{{ formatDate(invoice.due_date) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Term:</span>
                            <span class="font-medium">{{ invoice.term_days }} Days</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Status:</span>
                            <span class="inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                :class="getStatusColor(invoice.status)">
                                {{ getStatusLabel(invoice.status) }}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Payment Status:</span>
                            <span class="inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                :class="getPaymentStatusColor(invoice)">
                                {{ getPaymentStatusLabel(invoice) }}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Down Payment (DP):</span>
                            <span class="font-medium">
                                {{ hasDownPayment ? formatCurrency(downPaymentAmount) : '-' }}
                            </span>
                        </div>
                        <div v-if="hasDownPayment" class="flex justify-between">
                            <span class="text-gray-600">DP Date:</span>
                            <span class="font-medium">{{ formatDate(invoice.down_payment_date) }}</span>
                        </div>
                        <div v-if="hasDownPayment && invoice.down_payment_notes" class="flex justify-between">
                            <span class="text-gray-600">DP Notes:</span>
                            <span class="font-medium text-right">{{ invoice.down_payment_notes }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Profit & Loss Status:</span>
                            <span class="inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                :class="invoice.posted_to_profit_loss ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'">
                                {{ invoice.posted_to_profit_loss ? 'Posted' : 'Not Posted' }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Shipment Details -->
                <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
                    <h3 class="text-lg font-semibold text-sage-800 mb-4">Shipment Details</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Shipper:</span>
                            <span class="font-medium">{{ invoice.shipper || '-' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Consignee:</span>
                            <span class="font-medium">{{ invoice.consignee || '-' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Vessel:</span>
                            <span class="font-medium">{{ invoice.vessel || '-' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Flight/VOY:</span>
                            <span class="font-medium">{{ invoice.flight_voy || '-' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">AWB/BL No:</span>
                            <span class="font-medium">{{ invoice.awb_bl_no || '-' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">POL/POD:</span>
                            <span class="font-medium">{{ invoice.pol_pod || '-' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Origin:</span>
                            <span class="font-medium">{{ invoice.origin || '-' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Destination:</span>
                            <span class="font-medium">{{ invoice.destination || '-' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Gross Weight:</span>
                            <span class="font-medium">{{ invoice.gross_weight || '-' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Volume:</span>
                            <span class="font-medium">{{ invoice.volume || '-' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">No. of Packages:</span>
                            <span class="font-medium">
                                {{ invoice.no_of_packages || '-' }}
                                {{ invoice.package_unit || 'BAG' }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Payment Information (if paid) -->
                <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" v-if="invoice.status === 'paid'">
                    <h3 class="text-lg font-semibold text-sage-800 mb-4">Payment Information</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Payment Date:</span>
                            <span class="font-medium">{{ formatDate(invoice.paid_date) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Amount Paid:</span>
                            <span class="font-medium">{{ formatCurrency(invoice.paid_amount) }}</span>
                        </div>
                        <div class="flex justify-between" v-if="invoice.payment_method">
                            <span class="text-gray-600">Payment Method:</span>
                            <span class="font-medium">{{ invoice.payment_method }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Confirmed By:</span>
                            <span class="font-medium">{{ invoice.confirmed_by?.name || '-' }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Confirmation Time:</span>
                            <span class="font-medium">{{ formatDateTime(invoice.payment_confirmed_at) }}</span>
                        </div>
                        <div v-if="invoice.payment_notes" class="pt-2">
                            <span class="text-gray-600">Notes:</span>
                            <p class="text-gray-900 mt-1">{{ invoice.payment_notes }}</p>
                        </div>
                    </div>
                </div>

                <!-- Profit Loss Posting Information (if posted) -->
                <div class="bg-white rounded-lg shadow-sm p-6 border border-purple-200"
                    v-if="invoice.posted_to_profit_loss">
                    <h3 class="text-lg font-semibold text-purple-800 mb-4">Profit & Loss Posting Information</h3>
                    <div class="space-y-3">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Status:</span>
                            <span
                                class="inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                Posted
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Posting Date:</span>
                            <span class="font-medium">{{ formatDateTime(invoice.posted_to_profit_loss_at) }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Posted By:</span>
                            <span class="font-medium">{{ invoice.posted_by_user?.name || '-' }}</span>
                        </div>
                        <div v-if="invoice.profit_loss_entries && invoice.profit_loss_entries.length > 0" class="pt-2">
                            <span class="text-gray-600">Entry IDs:</span>
                            <p class="text-gray-900 mt-1 text-sm">{{ invoice.profit_loss_entries.join(', ') }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Invoice Items -->
            <div v-if="invoice.invoice_type === 'main' || invoice.invoice_type === 'combined' || getMainItems.length > 0"
                class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-sage-200 bg-blue-50">
                    <div class="flex itemss-center justify-between">
                        <div class="flex itemss-center space-x-3">
                            <h3 class="text-lg font-semibold text-blue-800">Main Invoice Items</h3>
                            <span
                                class="inline-flex itemss-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                {{ displayMainInvoice.invoice_number }}
                            </span>
                        </div>
                        <div class="flex space-x-2">
                            <a :href="route('admin-keuangan.invoices.preview-pdf', displayMainInvoice.id)"
                                class="inline-flex itemss-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                                target="_blank">
                                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Preview PDF
                            </a>
                            <a :href="route('admin-keuangan.invoices.export-pdf', displayMainInvoice.id)"
                                class="inline-flex itemss-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                                target="_blank">
                                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                </svg>
                                Download PDF
                            </a>
                        </div>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-sage-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Qty
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Unit
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Rate
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Currency
                                </th>
                                <th
                                    class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-sage-200">
                            <tr v-for="items in getMainItems" :key="items.id" class="hover:bg-sage-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ items.description }}</div>
                                    <div v-if="getReimbursementLatestHistory(items)"
                                        class="text-xs text-gray-500 mt-1 space-y-0.5">
                                        <div class="flex flex-wrap itemss-center gap-2">
                                            <span>Latest:</span>
                                            <span
                                                class="inline-flex itemss-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                                {{
                                                    getReimbursementStatusLabel(getReimbursementLatestHistory(items).status)
                                                }}
                                            </span>
                                            <span v-if="getReimbursementLatestHistory(items).vendor_name">
                                                by {{ getReimbursementLatestHistory(items).vendor_name }}
                                            </span>
                                            <span v-if="getReimbursementLatestHistory(items).timestamp">
                                                ({{ formatDate(getReimbursementLatestHistory(items).timestamp) }})
                                            </span>
                                        </div>
                                        <div v-if="getReimbursementLatestHistory(items).notes">
                                            Notes: {{ getReimbursementLatestHistory(items).notes }}
                                        </div>
                                        <div v-if="getReimbursementLatestHistory(items).user">
                                            Processed by: {{ getReimbursementLatestHistory(items).user }}
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ getOperationalQtyDisplay(items) }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ getOperationalUnitDisplay(items) }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ formatCurrency(items.rate, items.currency) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ items.currency }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right">
                                    <div class="text-sm font-medium text-gray-900">{{
                                        formatCurrency(getOperationalAmountValue(items),
                                        items.currency) }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Main Total -->
                <div class="px-6 py-4 bg-blue-50 border-t border-sage-200">
                    <div class="flex justify-end">
                        <div class="w-64 space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">Subtotal Main:</span>
                                <span class="text-sm font-medium">{{ formatCurrency(getMainTotal) }}</span>
                            </div>
                            <div v-if="hasDownPayment && invoice.invoice_type === 'main'" class="flex justify-between">
                                <span class="text-sm text-gray-600">Down Payment (-):</span>
                                <span class="text-sm font-medium text-red-700">- {{ formatCurrency(downPaymentAmount)
                                    }}</span>
                            </div>
                            <div class="flex justify-between pt-2 border-t border-blue-200">
                                <span class="text-lg font-semibold text-blue-800">Total Main:</span>
                                <span class="text-lg font-bold text-blue-800">{{
                                    formatCurrency(hasDownPayment && invoice.invoice_type === 'main'
                                        ? mainTotalAfterDownPayment
                                        : getMainTotal)
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reimbursement Invoice Items -->
            <div v-if="invoice.invoice_type === 'reimbursement' || invoice.invoice_type === 'combined' || getReimbursementItems.length > 0"
                class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-sage-200 bg-orange-50">
                    <div class="flex itemss-center justify-between">
                        <div class="flex itemss-center space-x-3">
                            <h3 class="text-lg font-semibold text-orange-800">Reimbursement Invoice Items</h3>
                            <span
                                class="inline-flex itemss-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                {{ displayReimbursementInvoice.invoice_number }}
                            </span>
                        </div>
                        <div class="flex space-x-2">
                            <a :href="route('admin-keuangan.invoices.preview-pdf-reimbursement', displayReimbursementInvoice.id)"
                                class="inline-flex itemss-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                                target="_blank">
                                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Preview PDF
                            </a>
                            <a :href="route('admin-keuangan.invoices.export-pdf-reimbursement', displayReimbursementInvoice.id)"
                                class="inline-flex itemss-center px-3 py-1.5 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors"
                                target="_blank">
                                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                </svg>
                                Download PDF
                            </a>
                        </div>
                    </div>
                </div>

                <!-- <div v-if="hasReimbursementEntries"
                    class="px-6 py-3 bg-white border-b border-sage-200 flex flex-wrap itemss-center gap-2">
                    <span class="text-sm text-sage-600 mr-2">Filter Status:</span>
                    <button type="button" @click="reimbursementFilter = 'all'" :class="reimbursementFilter === 'all'
                        ? 'bg-orange-600 text-white border border-orange-600 shadow-sm'
                        : 'bg-white text-sage-700 border border-sage-200 hover:border-orange-300'"
                        class="px-3 py-1.5 text-sm rounded-md transition-colors">
                        Semua
                    </button>
                    <button type="button" @click="reimbursementFilter = 'unpaid'" :class="reimbursementFilter === 'unpaid'
                        ? 'bg-orange-600 text-white border border-orange-600 shadow-sm'
                        : 'bg-white text-sage-700 border border-sage-200 hover:border-orange-300'"
                        class="px-3 py-1.5 text-sm rounded-md transition-colors">
                        Unpaid
                    </button>
                    <button type="button" @click="reimbursementFilter = 'paid'" :class="reimbursementFilter === 'paid'
                        ? 'bg-orange-600 text-white border border-orange-600 shadow-sm'
                        : 'bg-white text-sage-700 border border-sage-200 hover:border-orange-300'"
                        class="px-3 py-1.5 text-sm rounded-md transition-colors">
                        Paid
                    </button>
                </div> -->

                <div class="overflow-x-auto" v-if="hasReimbursementEntries">
                    <table class="w-full">
                        <thead class="bg-sage-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Qty
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Unit
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Rate
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Currency
                                </th>
                                <th
                                    class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Vendor
                                </th>
                                <!-- <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Payment Date
                                </th> -->
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-sage-200">
                            <tr v-if="filteredReimbursementEntries.length === 0">
                                <td colspan="10" class="px-6 py-6 text-center text-sm text-gray-500">
                                    No reimbursement data matches this filter.
                                </td>
                            </tr>
                            <tr v-for="items in filteredReimbursementEntries" :key="items.id" class="hover:bg-sage-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ items.description }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ getOperationalQtyDisplay(items) }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ getOperationalUnitDisplay(items) }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                        {{ formatCurrency(items.rate, items.currency || reimbursementCurrency) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ items.currency || reimbursementCurrency }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ formatCurrency(items.amount, items.currency || reimbursementCurrency) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ items.vendor_name }}</div>
                                </td>
                                <!-- <td class="px-6 py-4 whitespace-nowrap">
                                    <span
                                        class="inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                        :class="getReimbursementStatusColor(items.status)">
                                        {{ getReimbursementStatusLabel(items.status) }}
                                    </span>
                                </td> -->
                                <!-- <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                        {{ items.paid_at ? formatDate(items.paid_at) : '-' }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right">
                                    <button v-if="items.can_update" @click="openReimbursementPaymentModal(items)"
                                        class="px-3 py-1.5 text-sm rounded-md border border-orange-500 text-orange-600 hover:bg-orange-50 transition-colors">
                                        {{ items.status === 'paid' ? 'Update Status' : 'Mark as Paid' }}
                                    </button>
                                </td> -->
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="overflow-x-auto" v-else>
                    <table class="w-full">
                        <thead class="bg-sage-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Qty
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Unit
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Rate
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Currency
                                </th>
                                <th
                                    class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-sage-200">
                            <tr v-for="items in getReimbursementItems" :key="items.id" class="hover:bg-sage-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ items.description }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ formatNumber(items.quantity) }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ items.unit }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ formatCurrency(items.rate, items.currency) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ items.currency }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right">
                                    <div class="text-sm font-medium text-gray-900">{{ formatCurrency(items.amount,
                                        items.currency) }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Reimbursement Total -->
                <div class="px-6 py-4 bg-orange-50 border-t border-sage-200">
                    <div class="flex justify-end">
                        <div class="w-64 space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">{{ reimbursementSubtotalLabel }}</span>
                                <span class="text-sm font-medium">
                                    {{ formatCurrency(reimbursementFilteredSubtotal, reimbursementCurrency) }}
                                </span>
                            </div>
                            <div v-if="hasReimbursementEntries && reimbursementFilter !== 'all'"
                                class="text-xs text-gray-500 text-right">
                                Showing {{ filteredReimbursementEntries.length }} of {{
                                    normalizedReimbursementEntries.length }} items
                            </div>
                            <div class="flex justify-between pt-2 border-t border-orange-200">
                                <span class="text-lg font-semibold text-orange-800">Total Reimbursement:</span>
                                <span class="text-lg font-bold text-orange-800">
                                    {{ formatCurrency(reimbursementOverallSubtotal, reimbursementCurrency) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Operational Costs Section -->
            <div v-if="getOperationalCosts.length > 0"
                class="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-red-200 bg-red-50">
                    <div class="flex itemss-center justify-between">
                        <div class="flex itemss-center space-x-3">
                            <h3 class="text-lg font-semibold text-red-800">Other Costs / Operational Costs</h3>
                            <span
                                class="inline-flex itemss-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                Internal Only
                            </span>
                        </div>
                        <div class="text-sm text-red-600">
                            Not visible to customer
                        </div>
                    </div>
                </div>

                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-red-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                                    Qty
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                                    Unit
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                                    Rate
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                                    Currency
                                </th>
                                <th
                                    class="px-6 py-3 text-right text-xs font-medium text-red-500 uppercase tracking-wider">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-red-200">
                            <tr v-for="items in getOperationalCosts" :key="items.id" class="hover:bg-red-50">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">{{ items.description }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ formatNumber(items.quantity) }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ items.unit }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ formatCurrency(items.rate, items.currency) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">{{ items.currency }}</div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right">
                                    <div class="text-sm font-medium text-gray-900">{{ formatCurrency(items.amount,
                                        items.currency) }}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Operational Costs Total -->
                <div class="px-6 py-4 bg-red-50 border-t border-red-200">
                    <div class="flex justify-end">
                        <div class="w-64 space-y-2">
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-600">Other Costs Subtotal:</span>
                                <span class="text-sm font-medium">{{ formatCurrency(getOperationalCostsTotal) }}</span>
                            </div>
                            <div class="flex justify-between pt-2 border-t border-red-200">
                                <span class="text-lg font-semibold text-red-800">Total Other Costs:</span>
                                <span class="text-lg font-bold text-red-800">{{ formatCurrency(getOperationalCostsTotal)
                                }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Profit Breakdown Section -->
            <div class="bg-white rounded-lg shadow-sm border border-purple-200 overflow-hidden mb-6">
                <div class="px-6 py-4 border-b border-purple-200 bg-purple-50">
                    <div class="flex itemss-center justify-between">
                        <div class="flex itemss-center space-x-3">
                            <h3 class="text-lg font-semibold text-purple-800">Profit Analysis</h3>
                            <span
                                class="inline-flex itemss-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                                Internal Analysis
                            </span>
                        </div>
                    </div>
                </div>

                <div class="px-6 py-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <!-- Gross Revenue -->
                        <div class="bg-green-50 rounded-lg p-4 border border-green-200">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-green-800">{{ formatCurrency(getGrossRevenue) }}
                                </div>
                                <div class="text-sm text-green-600 mt-1">Gross Revenue</div>
                                <div class="text-xs text-gray-500 mt-1">Total billable</div>
                            </div>
                        </div>

                        <!-- Operational Costs -->
                        <div class="bg-red-50 rounded-lg p-4 border border-red-200">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-red-800">{{ formatCurrency(getOperationalCostsTotal)
                                }}</div>
                                <div class="text-sm text-red-600 mt-1">Operational Costs</div>
                                <div class="text-xs text-gray-500 mt-1">Operational costs</div>
                            </div>
                        </div>

                        <!-- Net Profit -->
                        <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-blue-800">{{ formatCurrency(getNetProfit) }}</div>
                                <div class="text-sm text-blue-600 mt-1">Net Profit</div>
                                <div class="text-xs text-gray-500 mt-1">Net profit</div>
                            </div>
                        </div>

                        <!-- Profit Margin -->
                        <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
                            <div class="text-center">
                                <div class="text-2xl font-bold text-purple-800">{{ getProfitMargin }}%</div>
                                <div class="text-sm text-purple-600 mt-1">Profit Margin</div>
                                <div class="text-xs text-gray-500 mt-1">Profit percentage</div>
                            </div>
                        </div>
                    </div>

                    <!-- Profit Calculation Details -->
                    <div class="mt-6 bg-gray-50 rounded-lg p-4">
                        <h4 class="text-sm font-semibold text-gray-800 mb-3">Calculation Details:</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Main Invoice</span>
                                <span class="font-medium text-gray-900">{{ formatCurrency(getGrossRevenue) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">VAT</span>
                                <span class="font-medium text-gray-900">{{ formatCurrency(vatAmount) }}</span>
                            </div>
                            <div class="flex justify-between py-1 border-t border-b border-gray-200">
                                <span class="text-gray-700">Total Main Invoice + VAT</span>
                                <span class="font-semibold text-blue-700">{{ formatCurrency(getGrossRevenue + vatAmount)
                                    }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Reimbursement</span>
                                <span class="font-medium text-gray-900">{{ formatCurrency(getReimbursementTotal)
                                    }}</span>
                            </div>
                            <div class="flex justify-between py-1 border-t border-b border-gray-200">
                                <span class="text-gray-700">Total Invoice + Reimbursement</span>
                                <span class="font-semibold text-blue-700">{{ formatCurrency(getGrossRevenue + vatAmount
                                    + getReimbursementTotal) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Operational Costs</span>
                                <span class="font-medium text-red-700">- {{ formatCurrency(getOperationalCostsTotal)
                                    }}</span>
                            </div>
                            <div class="flex justify-between font-semibold">
                                <span class="text-gray-800">Net Profit</span>
                                <span class="text-green-700">{{ formatCurrency(getNetProfit) }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="text-gray-600">Profit Percentage</span>
                                <span class="text-purple-700 font-medium">{{ getProfitMargin }}%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Combined Total -->
            <div v-if="invoice.invoice_type === 'combined' && getMainItems.length > 0 && getReimbursementItems.length > 0"
                class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                <div class="px-6 py-4 bg-sage-50">
                    <div class="flex justify-end">
                        <div class="w-80 space-y-3">
                            <div class="text-center text-lg font-semibold text-sage-800 pb-2 border-b border-sage-300">
                                Combined Invoice Summary
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-blue-700">Total Main Items:</span>
                                <span class="text-sm font-medium text-blue-700">{{ formatCurrency(getMainTotal)
                                }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-gray-700">{{ vatRateLabel }}:</span>
                                <span class="text-sm font-medium text-gray-700">{{ formatCurrency(vatAmount) }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-sm text-orange-700">Total Reimbursement Items:</span>
                                <span class="text-sm font-medium text-orange-700">{{
                                    formatCurrency(getReimbursementTotal) }}</span>
                            </div>
                            <div class="flex justify-between pt-3 border-t border-sage-400">
                                <span class="text-xl font-bold text-sage-800">Grand Total:</span>
                                <span class="text-xl font-bold text-sage-800">{{
                                    formatCurrency(combinedTotalBeforeDownPayment)
                                    }}</span>
                            </div>
                            <div v-if="hasDownPayment" class="flex justify-between text-sm text-red-700">
                                <span>Down Payment (-):</span>
                                <span class="font-medium">- {{ formatCurrency(downPaymentAmount) }}</span>
                            </div>
                            <div v-if="hasDownPayment" class="flex justify-between pt-2 border-t border-sage-300">
                                <span class="text-lg font-bold text-sage-800">Total After DP:</span>
                                <span class="text-lg font-bold text-sage-800">{{
                                    formatCurrency(combinedTotalAfterDownPayment)
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Payment Confirmation Modal -->
        <div v-if="showPaymentModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex itemss-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Confirm Payment</h3>

                <form @submit.prevent="confirmPayment">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Amount Paid</label>
                            <input type="number" v-model="paymentForm.paid_amount"
                                :placeholder="formatCurrency(invoice.total)" step="0.01" min="0"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                required />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
                            <input type="date" v-model="paymentForm.paid_date"
                                :max="new Date().toISOString().split('T')[0]"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                required />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                            <input type="text" v-model="paymentForm.payment_method"
                                placeholder="Bank transfer, cash, etc."
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                            <textarea v-model="paymentForm.payment_notes" rows="3"
                                placeholder="Additional notes about this payment..."
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"></textarea>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" @click="showPaymentModal = false"
                            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" :disabled="processing"
                            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50">
                            {{ processing ? 'Processing...' : 'Confirm Payment' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Mark Sent Modal -->
        <div v-if="showMarkSentModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex itemss-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">Mark Invoice as Sent</h3>
                <p class="text-gray-600 mb-6">Are you sure you want to mark this invoice as sent to the customer?
                </p>

                <div class="flex justify-end space-x-3">
                    <button @click="showMarkSentModal = false"
                        class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Cancel
                    </button>
                    <button @click="markAsSent"
                        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        Yes, Mark as Sent
                    </button>
                </div>
            </div>
        </div>

        <!-- Reimbursement Payment Modal -->
        <div v-if="showReimbursementPaymentModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex itemss-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 class="text-lg font-semibold text-orange-800 mb-4">Update Reimbursement Status</h3>

                <div v-if="selectedReimbursementEntry" class="mb-4 text-sm text-gray-600">
                    <div class="font-medium text-gray-800">{{ selectedReimbursementEntry.description }}</div>
                    <div>Amount: {{ formatCurrency(selectedReimbursementEntry.amount,
                        selectedReimbursementEntry.currency || 'IDR') }}</div>
                </div>

                <form @submit.prevent="submitReimbursementPayment">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select v-model="reimbursementPaymentForm.status"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                <option value="paid">Paid</option>
                                <option value="invoiced">Unpaid</option>
                            </select>
                        </div>

                        <div v-if="reimbursementPaymentForm.status === 'paid'"
                            class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Vendor / Payer</label>
                                <input type="text" v-model="reimbursementPaymentForm.vendor_name"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Eshaka Wijaya Logistics" required />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Payment Date</label>
                                <input type="date" v-model="reimbursementPaymentForm.paid_at"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    required />
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                            <textarea v-model="reimbursementPaymentForm.notes" rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Example: Paid via the company BCA account"></textarea>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" @click="closeReimbursementPaymentModal"
                            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" :disabled="reimbursementPaymentForm.processing"
                            class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50">
                            {{ reimbursementPaymentForm.processing ? 'Saving...' : 'Save Changes' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Profit Loss Posting Modal -->
        <div v-if="showProfitLossModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex itemss-center justify-center z-50">
            <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
                <h3 class="text-lg font-semibold text-purple-800 mb-4">Post Invoice to Profit & Loss</h3>

                <!-- Invoice Summary -->
                <div class="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-200">
                    <h4 class="text-sm font-semibold text-purple-800 mb-3">Invoice Summary:</h4>
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span class="text-gray-600">Invoice Number:</span>
                            <span class="font-medium text-purple-800 ml-2">{{ invoice.invoice_number }}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">Customer:</span>
                            <span class="font-medium text-purple-800 ml-2">{{ invoice.customer?.company_name }}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">Gross Revenue:</span>
                            <span class="font-medium text-green-700 ml-2">{{ formatCurrency(getGrossRevenue) }}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">Operational Costs:</span>
                            <span class="font-medium text-red-700 ml-2">{{ formatCurrency(getOperationalCostsTotal)
                            }}</span>
                        </div>
                        <div class="col-span-2 pt-2 border-t border-purple-200">
                            <span class="text-gray-600">Net Profit:</span>
                            <span class="font-bold text-blue-700 ml-2">{{ formatCurrency(getNetProfit) }}</span>
                        </div>
                    </div>
                </div>

                <form @submit.prevent="submitProfitLossPosting">
                    <div class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                Profit & Loss Period <span class="text-red-500">*</span>
                            </label>
                            <select v-model="profitLossForm.period_id"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                required>
                                <option value="">Select period...</option>
                                <option v-for="period in profitLossPeriods" :key="period.id" :value="period.id">
                                    {{ formatPeriodLabel(period) }}
                                </option>
                            </select>
                            <p class="text-xs text-gray-500 mt-1">
                                Select the profit & loss period where this transaction will be recorded.
                            </p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                            <textarea v-model="profitLossForm.notes" rows="3"
                                placeholder="Additional notes for profit & loss posting..."
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"></textarea>
                        </div>

                        <!-- Info Box -->
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div class="flex itemss-start">
                                <svg class="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <div class="text-sm">
                                    <p class="text-blue-800 font-medium mb-1">Items to be posted:</p>
                                    <ul class="text-blue-700 space-y-1">
                                        <li v-if="getGrossRevenue > 0">Revenue: {{ formatCurrency(getGrossRevenue) }}
                                        </li>
                                        <li v-if="getOperationalCostsTotal > 0">Operational Costs: {{
                                            formatCurrency(getOperationalCostsTotal) }}</li>
                                        <li>Net Profit Impact: {{ formatCurrency(getNetProfit) }}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3 mt-6">
                        <button type="button" @click="showProfitLossModal = false"
                            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" :disabled="processing || !profitLossForm.period_id"
                            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50">
                            {{ processing ? 'Processing...' : 'Post to Profit & Loss' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useForm, Link, router, usePage } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';

const props = defineProps({
    invoice: Object,
    mainInvoice: Object,
    reimbursementInvoice: Object,
    relatedInvoices: Array,
    reimbursementEntries: {
        type: Array,
        default: () => [],
    },
});

const showPaymentModal = ref(false);
const showMarkSentModal = ref(false);
const showProfitLossModal = ref(false);
const showReimbursementPaymentModal = ref(false);
const processing = ref(false);

const paymentForm = reactive({
    paid_amount: props.invoice.total,
    paid_date: new Date().toISOString().split('T')[0],
    payment_method: '',
    payment_notes: ''
});

const profitLossForm = reactive({
    period_id: '',
    notes: ''
});

const profitLossPeriods = ref([]);
const profitLossAccounts = ref([]);
const selectedReimbursementEntry = ref(null);
const page = usePage();

const reimbursementPaymentForm = useForm({
    status: 'paid',
    vendor_name: '',
    paid_at: '',
    notes: ''
});

const appendQuery = (path, query = {}) => {
    const params = new URLSearchParams();

    Object.entries(query || {}).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            params.append(key, value);
        }
    });

    const queryString = params.toString();
    return queryString ? `${path}?${queryString}` : path;
};

const route = function (name, params = {}) {
    if (window.route) {
        return window.route(name, params);
    }

    const routes = {
        'admin-keuangan.invoices.index': '/admin-keuangan/invoices',
        'admin-keuangan.invoices.pdf': (id) => `/admin-keuangan/invoices/${id}/pdf`,
        'admin-keuangan.invoices.confirm-payment': (id) => `/admin-keuangan/invoices/${id}/confirm-payment`,
        'admin-keuangan.invoices.mark-sent': (id) => `/admin-keuangan/invoices/${id}/mark-sent`,
        'admin-keuangan.invoices.post-to-profit-loss': (id) => `/admin-keuangan/invoices/${id}/post-to-profit-loss`,
        'admin-keuangan.invoices.unpost-from-profit-loss': (id) => `/admin-keuangan/invoices/${id}/unpost-from-profit-loss`,
        'admin-keuangan.invoices.profit-loss-periods': '/admin-keuangan/invoices/profit-loss-periods',
        'admin-keuangan.invoices.reimbursement-itemss.update-payment': (value) => {
            if (Array.isArray(value)) {
                const [invoiceId, itemsId] = value;
                return `/admin-keuangan/invoices/${invoiceId}/reimbursement-itemss/${itemsId}/update-payment`;
            }
            if (typeof value === 'object' && value !== null) {
                const invoiceId = value.invoice || value.id;
                const itemsId = value.reimbursementItem || value.items;
                return `/admin-keuangan/invoices/${invoiceId}/reimbursement-itemss/${itemsId}/update-payment`;
            }
            return '#';
        },
    };

    const resolver = routes[name];
    if (!resolver) {
        return '#';
    }

    if (typeof resolver === 'function') {
        return resolver(params);
    }

    return appendQuery(resolver, params);
};

const backQuery = computed(() => {
    const queryString = page.url.includes('?') ? page.url.split('?')[1] : '';
    const params = new URLSearchParams(queryString);
    const query = {};

    ['search', 'status', 'invoice_type', 'date_from', 'date_to', 'page'].forEach((key) => {
        const value = params.get(key);
        if (value) {
            query[key] = value;
        }
    });

    return query;
});

const backToIndexUrl = computed(() => route('admin-keuangan.invoices.index', backQuery.value));

const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('id-ID');
};

const formatPeriodLabel = (period) => {
    if (!period || typeof period !== 'object') {
        return 'Period';
    }

    const name =
        period.period_name ||
        period.name ||
        period.period_code ||
        `Period ${period.id ?? ''}`.trim();

    const start = period.start_date ? formatDate(period.start_date) : '-';
    const end = period.end_date ? formatDate(period.end_date) : '-';

    return `${name} (${start} - ${end})`;
};

const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(number);
};

const formatCurrency = (amount, currency = 'IDR') => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
    }).format(amount);
};

const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('id-ID');
};

const reimbursementFilter = ref('all');

const hasReimbursementEntries = computed(() => Array.isArray(props.reimbursementEntries) && props.reimbursementEntries.length > 0);

const normalizedReimbursementEntries = computed(() => {
    if (!hasReimbursementEntries.value) {
        return [];
    }

    return props.reimbursementEntries.map((entry, index) => {
        const amount = parseFloat(entry.amount ?? entry.total ?? 0) || 0;
        const rate = parseFloat(entry.rate ?? entry.unit_price ?? amount) || amount;
        const quantity = parseFloat(entry.quantity ?? 1) || 1;

        return {
            id: entry.id ?? `reimbursement-entry-${index}`,
            description: entry.description ?? 'Reimbursement',
            quantity,
            unit: entry.unit ?? 'UNIT',
            rate,
            currency: entry.currency ?? 'IDR',
            amount,
            status: entry.status ?? null,
            vendor_name: entry.vendor_name ?? 'Eshaka Wijaya Logistics',
            paid_at: entry.paid_at ?? entry.paid_at_date ?? null,
            category: entry.category ?? null,
            notes: entry.notes ?? null,
            can_update: entry.can_update !== false,
        };
    });
});

const filteredReimbursementEntries = computed(() => {
    if (!hasReimbursementEntries.value) {
        return [];
    }

    return normalizedReimbursementEntries.value.filter((items) => {
        const status = (items.status || '').toLowerCase();
        if (reimbursementFilter.value === 'paid') {
            return status === 'paid';
        }
        if (reimbursementFilter.value === 'unpaid') {
            return status !== 'paid';
        }
        return true;
    });
});

watch(
    () => reimbursementPaymentForm.status,
    (status) => {
        if (status === 'paid') {
            if (!reimbursementPaymentForm.vendor_name) {
                reimbursementPaymentForm.vendor_name = 'Eshaka Wijaya Logistics';
            }
            if (!reimbursementPaymentForm.paid_at) {
                reimbursementPaymentForm.paid_at = new Date().toISOString().split('T')[0];
            }
        } else {
            reimbursementPaymentForm.vendor_name = '';
            reimbursementPaymentForm.paid_at = '';
        }
    }
);

const getStatusLabel = (status) => {
    const labels = {
        draft: 'Draft',
        sent: 'Sent',
        paid: 'Paid',
        overdue: 'Overdue',
        cancelled: 'Cancelled'
    };
    return labels[status] || status;
};

const getStatusColor = (status) => {
    const colors = {
        draft: 'bg-gray-100 text-gray-800',
        sent: 'bg-blue-100 text-blue-800',
        paid: 'bg-green-100 text-green-800',
        overdue: 'bg-red-100 text-red-800',
        cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

const getPaymentStatusLabel = (invoice) => {
    if (invoice.status === 'paid') {
        return 'Paid';
    }

    const dueDate = new Date(invoice.due_date);
    const today = new Date();

    if (invoice.status !== 'paid' && dueDate < today) {
        return 'Overdue';
    }

    return 'Unpaid';
};

const getPaymentStatusColor = (invoice) => {
    const status = getPaymentStatusLabel(invoice);
    const colors = {
        'Paid': 'bg-green-100 text-green-800',
        'Overdue': 'bg-red-100 text-red-800',
        'Unpaid': 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

const confirmPayment = () => {
    processing.value = true;

    router.post(route('admin-keuangan.invoices.confirm-payment', props.invoice.id), paymentForm, {
        onSuccess: () => {
            showPaymentModal.value = false;
            processing.value = false;
        },
        onError: () => {
            processing.value = false;
        }
    });
};

const markAsSent = () => {
    processing.value = true;

    router.post(route('admin-keuangan.invoices.mark-sent', props.invoice.id), {}, {
        onSuccess: () => {
            showMarkSentModal.value = false;
            processing.value = false;
        },
        onError: () => {
            processing.value = false;
        }
    });
};

const openReimbursementPaymentModal = (entry) => {
    if (!entry?.id) {
        return;
    }

    selectedReimbursementEntry.value = entry;
    reimbursementPaymentForm.reset();
    reimbursementPaymentForm.status = 'paid';
    reimbursementPaymentForm.vendor_name = entry.vendor_name || 'Eshaka Wijaya Logistics';
    reimbursementPaymentForm.paid_at = entry.paid_at ? entry.paid_at.split(' ')[0] : new Date().toISOString().split('T')[0];
    reimbursementPaymentForm.notes = entry.notes || '';

    showReimbursementPaymentModal.value = true;
};

const closeReimbursementPaymentModal = () => {
    showReimbursementPaymentModal.value = false;
    selectedReimbursementEntry.value = null;
    reimbursementPaymentForm.reset();
};

const submitReimbursementPayment = () => {
    if (!selectedReimbursementEntry.value) {
        return;
    }

    if (reimbursementPaymentForm.status !== 'paid') {
        reimbursementPaymentForm.vendor_name = '';
        reimbursementPaymentForm.paid_at = '';
    }

    reimbursementPaymentForm.post(
        route('admin-keuangan.invoices.reimbursement-itemss.update-payment', [props.invoice.id, selectedReimbursementEntry.value.id]),
        {
            preserveScroll: true,
            onSuccess: () => {
                closeReimbursementPaymentModal();
            }
        }
    );
};

const isMainInvoiceItem = (items) => {
    if (!items) {
        return false;
    }

    const itemsType = (items.item_type || items.items_type || '').toLowerCase();
    const includeInInvoice = items.include_in_customer_invoice ?? true;
    const hiddenFromCustomer = items.is_hidden_from_customer ?? false;

    if (!includeInInvoice || hiddenFromCustomer) {
        return false;
    }

    if (itemsType === 'operational_cost' || itemsType === 'reimbursement') {
        return false;
    }

    const description = (items.description || '').toLowerCase();
    if (description.includes('reimbur')) {
        return false;
    }

    if (itemsType === 'billable' || itemsType === '') {
        return true;
    }

    const ref = (items.item_ref || items.items_ref || '').toLowerCase().trim();
    return !ref ||
        ref === 'main' ||
        ref === 'm' ||
        ref === '1' ||
        ref.includes('main');
};

const filterMainInvoiceItems = (itemss = []) => {
    return (itemss || []).filter(isMainInvoiceItem);
};

const getInvoiceItems = (invoiceLike) => {
    if (!invoiceLike) {
        return [];
    }

    return invoiceLike.items || invoiceLike.itemss || [];
};

const isAdditionalInvoice = computed(() => !!props.invoice?.is_additional);

const displayMainInvoice = computed(() => {
    return isAdditionalInvoice.value ? props.invoice : (props.mainInvoice || props.invoice);
});

const displayReimbursementInvoice = computed(() => {
    return isAdditionalInvoice.value ? props.invoice : (props.reimbursementInvoice || props.invoice);
});

const isReimbursementInvoiceItem = (items) => {
    const itemType = (items.item_type || items.items_type || '').toLowerCase();
    if (itemType === 'reimbursement') {
        return true;
    }

    if (!itemType) {
        const ref = (items.item_ref || items.items_ref || '').toLowerCase().trim();
        return ref === 'reimbursement' ||
            ref === 'r' ||
            ref === '2' ||
            ref.includes('reimbur');
    }

    return false;
};

// Computed properties untuk memisahkan itemss berdasarkan items_ref
const getMainItems = computed(() => {
    if (isAdditionalInvoice.value) {
        return filterMainInvoiceItems(getInvoiceItems(props.invoice));
    }

    if (props.invoice.invoice_type === 'combined') {
        // Untuk invoice combined, pisahkan itemss berdasarkan items_type dan items_ref
        const mainItems = getInvoiceItems(props.mainInvoice);
        if (mainItems.length > 0) {
            return filterMainInvoiceItems(mainItems);
        }
        return filterMainInvoiceItems(getInvoiceItems(props.invoice));
    }

    // Untuk invoice type main atau jika ada mainInvoice
    if (props.mainInvoice && !isAdditionalInvoice.value) {
        return filterMainInvoiceItems(getInvoiceItems(props.mainInvoice));
    }

    // Fallback untuk invoice type main
    if (props.invoice.invoice_type === 'main') {
        return filterMainInvoiceItems(getInvoiceItems(props.invoice));
    }

    return filterMainInvoiceItems(getInvoiceItems(props.invoice));
});

const getReimbursementItems = computed(() => {
    if (isAdditionalInvoice.value) {
        return getInvoiceItems(props.invoice).filter(isReimbursementInvoiceItem);
    }

    if (props.invoice.invoice_type === 'combined') {
        // Untuk invoice combined, pisahkan itemss berdasarkan items_type dan items_ref
        return getInvoiceItems(props.invoice).filter(isReimbursementInvoiceItem);
    }

    // Untuk invoice type reimbursement atau jika ada reimbursementInvoice
    if (props.reimbursementInvoice && !isAdditionalInvoice.value) {
        return getInvoiceItems(props.reimbursementInvoice);
    }

    // Fallback untuk invoice type reimbursement
    if (props.invoice.invoice_type === 'reimbursement') {
        return getInvoiceItems(props.invoice);
    }

    return [];
});

// Computed untuk total amount per section
const getMainTotal = computed(() => {
    return getMainItems.value.reduce((total, items) => total + (parseFloat(items.amount) || 0), 0);
});

const getReimbursementTotal = computed(() => {
    return getReimbursementItems.value.reduce((total, items) => total + (parseFloat(items.amount) || 0), 0);
});

const vatAmount = computed(() => {
    return Number(props.invoice?.vat_amount || 0);
});

const vatRateLabel = computed(() => {
    const rate = Number(props.invoice?.vat_rate || 0);
    if (!rate) {
        return 'Total VAT';
    }
    const formatted = rate % 1 === 0 ? rate.toFixed(0) : rate.toString();
    return `Total VAT (${formatted}%)`;
});

const downPaymentAmount = computed(() => {
    return Number(props.invoice?.down_payment_amount || 0);
});

const hasDownPayment = computed(() => downPaymentAmount.value > 0);

const mainTotalAfterDownPayment = computed(() => {
    return Math.max(getMainTotal.value - downPaymentAmount.value, 0);
});

const combinedTotalBeforeDownPayment = computed(() => {
    return getMainTotal.value + vatAmount.value + getReimbursementTotal.value;
});

const combinedTotalAfterDownPayment = computed(() => {
    return Math.max(combinedTotalBeforeDownPayment.value - downPaymentAmount.value, 0);
});

const reimbursementCurrency = computed(() => {
    if (hasReimbursementEntries.value && normalizedReimbursementEntries.value.length > 0) {
        return normalizedReimbursementEntries.value[0].currency || 'IDR';
    }

    const fallbackItem = getReimbursementItems.value[0];
    return fallbackItem?.currency || 'IDR';
});

const reimbursementFilteredSubtotal = computed(() => {
    if (!hasReimbursementEntries.value) {
        return getReimbursementTotal.value;
    }

    return filteredReimbursementEntries.value.reduce((total, items) => total + (parseFloat(items.amount) || 0), 0);
});

const reimbursementOverallSubtotal = computed(() => {
    if (!hasReimbursementEntries.value) {
        return getReimbursementTotal.value;
    }

    return normalizedReimbursementEntries.value.reduce((total, items) => total + (parseFloat(items.amount) || 0), 0);
});

const reimbursementSubtotalLabel = computed(() => {
    if (!hasReimbursementEntries.value || reimbursementFilter.value === 'all') {
        return 'Subtotal Reimbursement';
    }

    return 'Subtotal (Filtered)';
});

const getReimbursementStatusLabel = (status) => {
    const labels = {
        pending: 'Pending',
        linked: 'Linked',
        invoiced: 'Invoiced',
        paid: 'Paid',
    };

    if (!status) {
        return 'Unknown';
    }

    return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
};

const getReimbursementStatusColor = (status) => {
    const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        linked: 'bg-blue-100 text-blue-800',
        invoiced: 'bg-orange-100 text-orange-800',
        paid: 'bg-green-100 text-green-800',
    };

    return colors[status] || 'bg-gray-100 text-gray-800';
};

const getReimbursementLatestHistory = (entry) => {
    if (!entry?.payment_history || entry.payment_history.length === 0) {
        return null;
    }

    const latest = [...entry.payment_history].pop();
    if (!latest) {
        return null;
    }

    return {
        status: latest.status,
        vendor_name: latest.vendor_name,
        notes: latest.notes,
        user: latest.user?.name,
        timestamp: latest.timestamp,
    };
};

// Computed untuk operational costs (menampilkan semua termasuk buying/COGS)
const getOperationalCosts = computed(() => {
    return getInvoiceItems(props.invoice).filter(items => {
        const itemType = (items.item_type || items.items_type || '').toLowerCase();
        return itemType === 'operational_cost';
    });
});

const getItemQuantityValue = (items) => {
    const quantity = items?.quantity ?? items?.qty ?? null;
    if (quantity === null || quantity === '' || !isFinite(Number(quantity)) || Number(quantity) <= 0) {
        return null;
    }

    return Number(quantity);
};

const getItemUnitValue = (items) => {
    const unit = items?.unit ?? items?.package_unit ?? null;
    if (!unit || !String(unit).trim()) {
        return null;
    }

    return unit;
};

const getOperationalQtyValue = (items) => {
    const itemQuantity = getItemQuantityValue(items);
    if (itemQuantity) {
        return itemQuantity;
    }

    const source = resolveOperationalCostSource(items);
    if (!source) {
        return null;
    }

    const quantity = source.quantity ?? source.qty ?? null;
    if (quantity === null || quantity === '' || !isFinite(Number(quantity)) || Number(quantity) <= 0) {
        return null;
    }

    return Number(quantity);
};

const getOperationalAmountValue = (items) => {
    const quantity = getOperationalQtyValue(items);
    const rate = Number(items.rate || 0);

    if (quantity) {
        return rate * quantity;
    }

    return Number(items.amount || 0);
};

const getOperationalCostsTotal = computed(() => {
    return getOperationalCosts.value.reduce((total, items) => total + getOperationalAmountValue(items), 0);
});

const salesOrderSource = computed(() => {
    return props.invoice?.salesOrder || props.invoice?.sales_order || null;
});

const getOperationalQtyDisplay = (items) => {
    const itemQuantity = getItemQuantityValue(items);
    if (itemQuantity) {
        return formatNumber(itemQuantity);
    }

    const source = resolveOperationalCostSource(items);
    if (!source) {
        return '-';
    }

    const quantity = source.quantity ?? source.qty ?? null;
    if (quantity === null || quantity === '' || !isFinite(Number(quantity)) || Number(quantity) <= 0) {
        return '-';
    }

    return formatNumber(Number(quantity));
};

const getOperationalUnitDisplay = (items) => {
    const itemUnit = getItemUnitValue(items);
    if (itemUnit) {
        return itemUnit;
    }

    const source = resolveOperationalCostSource(items);
    if (!source) {
        return '-';
    }

    const unit = source.unit ?? source.package_unit ?? null;
    if (!unit || !String(unit).trim()) {
        return '-';
    }

    return unit;
};

const resolveOperationalCostSource = (items) => {
    const refValue = items?.item_ref ?? items?.items_ref ?? null;
    if (!refValue) {
        return null;
    }

    const itemsRef = String(refValue);
    const so = salesOrderSource.value;

    if (!so) {
        return null;
    }

    if (itemsRef.startsWith('other_cost_')) {
        return resolveOtherCostSource(itemsRef.replace('other_cost_', ''), so.other_costs);
    }

    if (itemsRef.startsWith('cogs_vendor_')) {
        return resolveVendorBreakdownSource(itemsRef.replace('cogs_vendor_', ''), so.vendor_breakdown);
    }

    if (itemsRef.startsWith('vendor_')) {
        return resolveVendorBreakdownSource(itemsRef.replace('vendor_', ''), so.vendor_breakdown);
    }

    return null;
};

const resolveOtherCostSource = (suffix, otherCosts) => {
    if (!Array.isArray(otherCosts) || otherCosts.length === 0) {
        return null;
    }

    const normalizedSuffix = String(suffix);
    const byId = otherCosts.find(cost => String(cost?.id ?? '') === normalizedSuffix);
    if (byId) {
        return byId;
    }

    const index = Number(normalizedSuffix);
    if (Number.isInteger(index) && index >= 0 && index < otherCosts.length) {
        return otherCosts[index];
    }

    return null;
};

const resolveVendorBreakdownSource = (suffix, vendorBreakdown) => {
    if (!Array.isArray(vendorBreakdown) || vendorBreakdown.length === 0) {
        return null;
    }

    const normalizedSuffix = String(suffix);
    const byVendorId = vendorBreakdown.find(vendor => String(vendor?.vendor_id ?? '') === normalizedSuffix);
    if (byVendorId) {
        return byVendorId;
    }

    const index = Number(normalizedSuffix);
    if (Number.isInteger(index) && index >= 0 && index < vendorBreakdown.length) {
        return vendorBreakdown[index];
    }

    return null;
};

// Computed untuk profit calculation - hanya main itemss (billable) yang dihitung sebagai revenue
const getBillableItems = computed(() => {
    return filterMainInvoiceItems(getInvoiceItems(props.invoice));
});

const getGrossRevenue = computed(() => {
    return getBillableItems.value.reduce((total, items) => total + (parseFloat(items.amount) || 0), 0);
});

const getNetProfit = computed(() => {
    // Reimbursement is cost neutral (does not reduce profit because it will be reimbursed).
    // Only operational costs reduce the profit
    return getGrossRevenue.value - getOperationalCostsTotal.value;
});

const getProfitMargin = computed(() => {
    if (getGrossRevenue.value <= 0) {
        return 0;
    }
    return ((getNetProfit.value / getGrossRevenue.value) * 100).toFixed(2);
});

// Computed property untuk menampilkan tombol Fix Operational Costs
const shouldShowFixOperationalCostsButton = computed(() => {
    // Show if invoice has sales order with vendor breakdown but no operational costs
    return props.invoice.sales_order_id &&
        getOperationalCostsTotal.value === 0 &&
        props.invoice.status !== 'paid' &&
        !props.invoice.posted_to_profit_loss;
});

// Computed property untuk menampilkan tombol Post to Profit & Loss
const shouldShowProfitLossButton = computed(() => {
    return props.invoice.status === 'sent' &&
        !props.invoice.posted_to_profit_loss &&
        (getGrossRevenue.value > 0 || getOperationalCostsTotal.value > 0);
});

// Method untuk load profit loss periods
const loadProfitLossPeriods = async () => {
    try {
        const response = await fetch(route('admin-keuangan.invoices.profit-loss-periods'), {
            headers: {
                'Accept': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
            credentials: 'same-origin',
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        profitLossPeriods.value = Array.isArray(data) ? data : (data.periods || []);
        profitLossAccounts.value = (!Array.isArray(data) && data.accounts) ? data.accounts : [];
    } catch (error) {
        console.error('Error loading profit loss periods:', error);
        profitLossPeriods.value = [];
        profitLossAccounts.value = [];
    }
};

// Method untuk submit profit loss posting
const submitProfitLossPosting = () => {
    processing.value = true;

    router.post(route('admin-keuangan.invoices.post-to-profit-loss', props.invoice.id), profitLossForm, {
        onSuccess: () => {
            showProfitLossModal.value = false;
            processing.value = false;
        },
        onError: () => {
            processing.value = false;
        }
    });
};

// Method untuk unpost of profit loss
const unpostFromProfitLoss = () => {
    if (confirm('Are you sure you want to unpost from profit & loss?')) {
        processing.value = true;

        router.delete(route('admin-keuangan.invoices.unpost-from-profit-loss', props.invoice.id), {
            onSuccess: () => {
                processing.value = false;
            },
            onError: () => {
                processing.value = false;
            }
        });
    }
};

// Method untuk fix operational costs
const fixOperationalCosts = () => {
    if (confirm('Add operational costs from the sales order vendor breakdown. Continue?')) {
        processing.value = true;

        router.post(route('admin-keuangan.invoices.fix-operational-costs', props.invoice.id), {}, {
            onSuccess: (page) => {
                processing.value = false;
                // Refresh the page to show updated data
                window.location.reload();
            },
            onError: (errors) => {
                processing.value = false;
                console.error('Error fixing operational costs:', errors);
            }
        });
    }
};

// Method untuk open profit loss modal
const openProfitLossModal = async () => {
    await loadProfitLossPeriods();
    showProfitLossModal.value = true;
};
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-500 {
    color: #9fb894;
}

.text-sage-600 {
    color: #8db580;
}

.text-sage-800 {
    color: #6b8f5e;
}

.bg-sage-50 {
    background-color: #f4f6f3;
}

.border-sage-200 {
    border-color: #d4ddd0;
}

.divide-sage-200> :not([hidden])~ :not([hidden]) {
    border-color: #d4ddd0;
}

.hover\:bg-sage-50:hover {
    background-color: #f4f6f3;
}
</style>
