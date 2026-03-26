<template>
    <AdminKeuanganLayout>
        <Head title="Accounts Payable" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Accounts Payable</h1>
                        <p class="mt-1 text-sm text-gray-600">Manage payables and vendor payments</p>
                    </div>
                </div>

                <!-- Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <CreditCard class="h-6 w-6 text-red-400" />
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
                                    <AlertTriangle class="h-6 w-6 text-orange-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Overdue</dt>
                                        <dd class="text-lg font-medium text-orange-600">{{ formatCurrency(summary.total_overdue) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <Users class="h-6 w-6 text-yellow-400" />
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
                                    <Building2 class="h-6 w-6 text-blue-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Unpaid Active</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ summary.count_unpaid }}</dd>
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
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
                                <input
                                    v-model="searchForm.search"
                                    type="text"
                                    placeholder="Search vendors or services..."
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
                                    <option value="unpaid">Unpaid</option>
                                    <option value="partial">Partial</option>
                                    <option value="paid">Paid</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
                                <select
                                    v-model="searchForm.vendor_id"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="applyFilters"
                                >
                                    <option value="">All Vendors</option>
                                    <option
                                        v-for="vendor in vendors"
                                        :key="vendor.id"
                                        :value="vendor.id"
                                    >
                                        {{ vendor.nama_vendor }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                                <input
                                    v-model="searchForm.date_from"
                                    type="date"
                                    :disabled="searchForm.all_month"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="applyFilters"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                                <input
                                    v-model="searchForm.date_to"
                                    type="date"
                                    :disabled="searchForm.all_month"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="applyFilters"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Period</label>
                                <button
                                    type="button"
                                    class="w-full rounded-md border px-3 py-2 text-sm font-medium transition"
                                    :class="searchForm.all_month ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'"
                                    @click="toggleAllMonth"
                                >
                                    {{ searchForm.all_month ? 'All Month' : 'This Month / Custom' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Vendor Summary Section -->
                <div v-if="vendorSummaryRows.length > 0" class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
                            <div>
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Vendor Summary</h3>
                                <p class="text-xs text-gray-500 mt-1">Summary for outstanding payables</p>
                            </div>
                            <div class="flex items-center gap-4 text-xs text-gray-600">
                                <div>
                                    <span class="font-semibold text-gray-800">{{ vendorSummaryRows.length }}</span> Vendors
                                </div>
                                <div>
                                    Total Outstanding:
                                    <span class="font-semibold text-red-600">Rp {{ formatNumber(vendorSummaryTotals.outstanding) }}</span>
                                </div>
                            </div>
                        </div>
                        <div ref="vendorSummaryContainer" class="overflow-x-auto max-h-96 overflow-y-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
                                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Outstanding</th>
                                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Count</th>
                                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Overdue</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr
                                v-for="vendor in vendorSummaryRows"
                                :key="vendor.key"
                                class="hover:bg-gray-50"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div
                                        class="inline-flex items-center space-x-1 text-sm font-medium text-gray-900 cursor-pointer select-none"
                                        data-vendor-popover-trigger="true" :data-vendor-popover-trigger-key="vendor.key"
                                        @mouseenter="showVendorSummaryPopover(vendor)"
                                        @mouseleave="scheduleHideVendorSummaryPopover"
                                        @focus="showVendorSummaryPopover(vendor)"
                                        @blur="scheduleHideVendorSummaryPopover"
                                        @click="toggleVendorSummaryPopover(vendor)"
                                        tabindex="0"
                                    >
                                        <span>{{ vendor.vendor_name }}</span>
                                        <svg class="w-4 h-4 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M12 18a6 6 0 100-12 6 6 0 000 12z" />
                                        </svg>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                    Rp {{ formatNumber(vendor.total_amount) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600">
                                    Rp {{ formatNumber(vendor.total_paid) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <span :class="vendor.total_outstanding > 0 ? 'text-red-600' : 'text-green-600'">
                                        Rp {{ formatNumber(vendor.total_outstanding) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900">
                                    {{ vendor.count_invoices }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm">
                                    <span v-if="vendor.count_overdue > 0" class="text-red-600 font-medium">
                                        {{ vendor.count_overdue }}
                                    </span>
                                    <span v-else class="text-gray-400">0</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>

                <Teleport to="body">
                    <transition name="fade">
                        <div
                            v-if="activeVendorPopover"
                            ref="vendorPopoverElement"
                            class="absolute z-50 w-72 rounded-lg border border-sage-200 bg-white shadow-xl p-4"
                            :style="{ top: popoverPosition.top + 'px', left: popoverPosition.left + 'px', transform: 'translateX(-50%)' }"
                            @mouseenter="cancelVendorPopoverHide"
                            @mouseleave="scheduleHideVendorSummaryPopover"
                        >
                            <div class="flex items-start justify-between">
                                <div>
                                    <h4 class="text-sm font-semibold text-gray-900">{{ activeVendorPopover.vendor_name }}</h4>
                                    <p class="text-xs text-gray-500">
                                        Summary for outstanding payables
                                    </p>
                                </div>
                                <span
                                    class="px-2 py-0.5 text-xs font-medium rounded-full"
                                    :class="activeVendorPopover.total_outstanding > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'"
                                >
                                    {{ activeVendorPopover.total_outstanding > 0 ? 'Outstanding' : 'Cleared' }}
                                </span>
                            </div>
                            <div class="mt-3 space-y-2 text-sm">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Total Amount</span>
                                    <span class="font-medium text-gray-900">{{ formatCurrency(activeVendorPopover.total_amount) }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Total Paid</span>
                                    <span class="font-medium text-green-600">{{ formatCurrency(activeVendorPopover.total_paid) }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Outstanding</span>
                                    <span :class="activeVendorPopover.total_outstanding > 0 ? 'font-medium text-red-600' : 'font-medium text-green-600'">
                                        {{ formatCurrency(activeVendorPopover.total_outstanding) }}
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Invoices</span>
                                    <span class="font-medium text-gray-900">{{ activeVendorPopover.count_invoices }}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Overdue</span>
                                    <span :class="activeVendorPopover.count_overdue > 0 ? 'font-medium text-red-600' : 'font-medium text-gray-500'">
                                        {{ activeVendorPopover.count_overdue }}
                                    </span>
                                </div>
                            </div>
                            <div class="mt-4">
                                <button
                                    type="button"
                                    class="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 rounded-md transition"
                                    @click="goToVendorSummaryDetail()"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </transition>
                </Teleport>

            <!-- Table Section -->
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sales Order
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Vendor / Service
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Invoice
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
                                v-for="row in tableRows"
                                :key="row.key"
                                class="hover:bg-gray-50"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ row.salesOrder?.order_number || row.sourceSoNumber || 'No Sales Order' }}
                                    </div>
                                    <div v-if="row.isOpening" class="mt-1 inline-flex items-center rounded-full bg-sage-100 px-2 py-0.5 text-xs font-semibold text-sage-700">
                                        {{ openingTypeLabel(row.openingType) }}
                                    </div>
                                    <div class="text-sm text-gray-600">
                                        {{ row.salesOrder?.customer || '-' }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ row.salesOrder?.shipper || '-' }}
                                    </div>
                                    <div class="text-xs text-gray-500 mt-1">
                                        Release: {{ row.salesOrder?.released_at ? formatDate(row.salesOrder.released_at) : '-' }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ row.vendorSummaryLabel || '-' }}
                                    </div>
                                    <div class="text-sm text-gray-600" v-if="row.serviceDescription">
                                        {{ row.serviceDescription }}
                                    </div>
                                    <div class="text-sm text-gray-500" v-if="row.serviceRemarks">
                                        {{ row.serviceRemarks.substring(0, 50) }}{{ row.serviceRemarks.length > 50 ? '...' : '' }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900">
                                        <div>
                                            Invoice: {{ row.invoiceSummary || '-' }}
                                        </div>
                                        <div v-if="row.salesOrder?.order_number">
                                            SO: {{ row.salesOrder.order_number }}
                                        </div>
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ row.vendorInvoiceDate ? formatDate(row.vendorInvoiceDate) : '-' }}
                                    </div>
                                    <div v-if="row.isOpening && row.openingPaymentDate" class="text-xs text-gray-500">
                                        Opening Payment: {{ formatDate(row.openingPaymentDate) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                    Rp {{ formatNumber(row.amount) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                    Rp {{ formatNumber(row.paidAmount) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                    Rp {{ formatNumber(row.outstanding) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <span
                                        :class="getStatusClass(row.status)"
                                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                                    >
                                        {{ getStatusText(row.status) }}
                                        <span v-if="row.daysOverdue > 0" class="ml-1">
                                            ({{ row.daysOverdue }} days)
                                        </span>
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <button
                                        @click="showPayable(row)"
                                        class="inline-flex items-center px-3 py-2 border border-blue-200 rounded-md text-blue-600 hover:text-blue-900 hover:border-blue-400 disabled:text-gray-400 disabled:border-gray-200"
                                        :disabled="!row.primaryPayableId"
                                    >
                                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                        Details
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                    <div class="flex items-center justify-between">
                        <div class="text-sm text-gray-700">
                            Showing {{ payables.from || 0 }} to {{ payables.to || 0 }} of {{ payables.total || 0 }} results
                        </div>
                        <div class="flex space-x-1">
                            <template v-for="link in payables.links" :key="link.label">
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
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { router, Head } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { CreditCard, AlertTriangle, Users, Building2 } from 'lucide-vue-next'

const props = defineProps({
    payables: Object,
    summary: Object,
    vendorSummary: Array,
    vendors: Array,
    filters: Object,
    bankAccounts: Array
})

const searchForm = reactive({
    search: props.filters.search || '',
    status: props.filters.status || '',
    vendor_id: props.filters.vendor_id || '',
    date_from: props.filters.date_from || '',
    date_to: props.filters.date_to || '',
    all_month: !!props.filters.all_month
})

const currentIndexQuery = computed(() => {
    const query = {
        search: searchForm.search || undefined,
        status: searchForm.status || undefined,
        vendor_id: searchForm.vendor_id || undefined,
        date_from: searchForm.date_from || undefined,
        date_to: searchForm.date_to || undefined,
        all_month: searchForm.all_month ? 1 : undefined,
    }

    const currentPage = props.payables?.current_page
    if (currentPage && Number(currentPage) > 1) {
        query.page = currentPage
    }

    return query
})

const setDefaultMonthFilter = () => {
    if (searchForm.all_month) {
        searchForm.date_from = ''
        searchForm.date_to = ''
        return
    }

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

const summarizeList = (items = []) => {
    const filtered = items.filter(Boolean)
    if (filtered.length === 0) {
        return ''
    }
    if (filtered.length <= 2) {
        return filtered.join(', ')
    }
    return `${filtered.slice(0, 2).join(', ')} +${filtered.length - 2} others`
}

const summarizeNames = (names = []) => {
    const uniqueNames = [...new Set(names.filter(Boolean))]
    return summarizeList(uniqueNames)
}

const vendorSummaryRows = computed(() => {
    const summary = Array.isArray(props.vendorSummary) ? props.vendorSummary : []
    if (summary.length === 0) {
        return []
    }

    const groups = new Map()

    summary.forEach((item) => {
        if (!item) {
            return
        }

        const vendorId = item.vendor_id ?? null
        const vendorName = item.vendor_name || 'Internal'
        const key = vendorId !== null ? `id_${vendorId}` : `name_${vendorName}`

        if (!groups.has(key)) {
            groups.set(key, {
                key,
                vendor_id: vendorId,
                vendor_name: vendorName,
                total_amount: 0,
                total_paid: 0,
                total_outstanding: 0,
                count_invoices: 0,
                count_overdue: 0
            })
        }

        const aggregated = groups.get(key)
        aggregated.total_amount += Number(item.total_amount || 0)
        aggregated.total_paid += Number(item.total_paid || 0)
        aggregated.total_outstanding += Number(item.total_outstanding || 0)
        aggregated.count_invoices += Number(item.count_invoices || 0)
        aggregated.count_overdue += Number(item.count_overdue || 0)
    })

    return Array.from(groups.values())
})

const vendorSummaryTotals = computed(() => {
    return vendorSummaryRows.value.reduce(
        (acc, row) => {
            acc.outstanding += Number(row.total_outstanding || 0)
            return acc
        },
        { outstanding: 0 }
    )
})

const activeVendorPopover = ref(null)
const vendorSummaryContainer = ref(null)
const vendorPopoverElement = ref(null)

const popoverPosition = reactive({
    top: 0,
    left: 0
})
const POPOVER_WIDTH = 288
const POPOVER_MARGIN = 16
let hidePopoverTimeout = null

const cancelVendorPopoverHide = () => {
    if (hidePopoverTimeout) {
        clearTimeout(hidePopoverTimeout)
        hidePopoverTimeout = null
    }
}

const updatePopoverPosition = () => {
    if (!activeVendorPopover.value || typeof window === 'undefined') {
        return
    }

    const triggerEl = document.querySelector(`[data-vendor-popover-trigger-key="${activeVendorPopover.value.key}"]`)
    if (!triggerEl) {
        return
    }

    const rect = triggerEl.getBoundingClientRect()
    const scrollX = window.scrollX
    const scrollY = window.scrollY

    const center = rect.left + scrollX + rect.width / 2
    const viewportWidth = window.innerWidth
    const minCenter = scrollX + POPOVER_MARGIN + POPOVER_WIDTH / 2
    const maxCenter = scrollX + viewportWidth - POPOVER_MARGIN - POPOVER_WIDTH / 2

    popoverPosition.left = Math.max(minCenter, Math.min(maxCenter, center))
    popoverPosition.top = rect.bottom + scrollY + 12
}

const scheduleHideVendorSummaryPopover = () => {
    cancelVendorPopoverHide()
    hidePopoverTimeout = setTimeout(() => {
        activeVendorPopover.value = null
    }, 120)
}

const showVendorSummaryPopover = (vendor) => {
    cancelVendorPopoverHide()
    activeVendorPopover.value = vendor ?? null
    nextTick(() => updatePopoverPosition())
}

const toggleVendorSummaryPopover = (vendor) => {
    if (activeVendorPopover.value?.key === vendor.key) {
        activeVendorPopover.value = null
    } else {
        showVendorSummaryPopover(vendor)
    }
}

const goToVendorSummaryDetail = (vendor = activeVendorPopover.value) => {
    if (!vendor) return

    const params = {
        search: vendor.vendor_id ? '' : (vendor.vendor_name || ''),
        status: searchForm.status,
        vendor_id: vendor.vendor_id ?? '',
        date_from: searchForm.all_month ? '' : searchForm.date_from,
        date_to: searchForm.all_month ? '' : searchForm.date_to,
        all_month: searchForm.all_month ? 1 : ''
    }

    searchForm.vendor_id = params.vendor_id
    searchForm.search = params.search

    router.get(route('admin-keuangan.account-payables.index'), params, {
        preserveState: true,
        replace: true
    })

    activeVendorPopover.value = null
}

const handleDocumentClick = (event) => {
    if (!activeVendorPopover.value) return

    const trigger = event.target.closest('[data-vendor-popover-trigger="true"]')
    if (trigger && trigger.getAttribute('data-vendor-popover-trigger-key') === activeVendorPopover.value.key) {
        return
    }

    if (vendorPopoverElement.value?.contains(event.target)) {
        return
    }

    activeVendorPopover.value = null
}

const handleViewportChange = () => {
    if (activeVendorPopover.value) {
        updatePopoverPosition()
    }
}

onMounted(() => {
    if (typeof window !== 'undefined') {
        document.addEventListener('click', handleDocumentClick, true)
        window.addEventListener('scroll', handleViewportChange, true)
        window.addEventListener('resize', handleViewportChange)
    }
    if (vendorSummaryContainer.value) {
        vendorSummaryContainer.value.addEventListener('scroll', handleViewportChange)
    }

    setDefaultMonthFilter()
})

onBeforeUnmount(() => {
    cancelVendorPopoverHide()
    if (typeof window !== 'undefined') {
        document.removeEventListener('click', handleDocumentClick, true)
        window.removeEventListener('scroll', handleViewportChange, true)
        window.removeEventListener('resize', handleViewportChange)
    }
    if (vendorSummaryContainer.value) {
        vendorSummaryContainer.value.removeEventListener('scroll', handleViewportChange)
    }
})

const calculateDaysOverdue = (dueDate, status) => {
    if (!dueDate || status === 'paid') {
        return 0
    }

    const parsedDate = new Date(dueDate)
    if (Number.isNaN(parsedDate.getTime())) {
        return 0
    }

    const diff = Math.floor((Date.now() - parsedDate.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
}

const tableRows = computed(() => {
    const data = props.payables?.data || []

    return data.map((group, index) => {
        const payables = Array.isArray(group.account_payables) ? group.account_payables : []
        const vendorSummary = Array.isArray(group.vendor_summary) ? group.vendor_summary : []
        const invoiceNumbers = Array.isArray(group.invoice_numbers) ? group.invoice_numbers : []
        const salesOrder = group.sales_order || null
        const firstPayable = payables[0] || {}
        const dueDate = group.due_date || firstPayable.payment_due_date || null
        const status = group.status || 'unpaid'

        const vendorNames = vendorSummary.length
            ? vendorSummary.map((entry) => entry.vendor_name)
            : payables.map((current) => current.vendor?.nama_vendor || current.vendor_name)
        const openingPayable = payables.find((current) => current.is_opening)
        const isOpening = payables.some((current) => current.is_opening)

        const fallbackKey = salesOrder?.id
            ? `sales-order-${salesOrder.id}`
            : (firstPayable.id ? `payable-${firstPayable.id}` : `group-${index}`)

        return {
            key: group.group_key || fallbackKey,
            groupType: group.group_type || 'sales_order',
            salesOrder,
            accountPayables: payables,
            primaryPayableId: firstPayable.id || null,
            vendorSummary,
            vendorSummaryLabel: summarizeNames(vendorNames),
            invoiceSummary: summarizeList(
                invoiceNumbers.length ? invoiceNumbers : payables.map((current) => current.vendor_invoice_number)
            ),
            vendorInvoiceDate: group.latest_vendor_invoice_date || firstPayable.vendor_invoice_date || null,
            isOpening,
            sourceSoNumber: openingPayable?.source_so_number || null,
            openingPaymentDate: openingPayable?.opening_payment_date || null,
            openingType: openingPayable?.opening_type || null,
            serviceDescription: group.service_description || firstPayable.service_description || '',
            serviceRemarks: group.service_remarks || firstPayable.service_remarks || '',
            amount: Number(group.totals?.amount ?? 0),
            paidAmount: Number(group.totals?.paid ?? 0),
            outstanding: Number(group.totals?.outstanding ?? 0),
            status,
            dueDate,
            daysOverdue: calculateDaysOverdue(dueDate, status)
        }
    })
})

let debounceTimer = null

const debounceSearch = () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        applyFilters()
    }, 500)
}

const applyFilters = () => {
    const payload = {
        ...searchForm,
        all_month: searchForm.all_month ? 1 : undefined,
        date_from: searchForm.all_month ? undefined : (searchForm.date_from || undefined),
        date_to: searchForm.all_month ? undefined : (searchForm.date_to || undefined),
    }

    router.get(route('admin-keuangan.account-payables.index'), payload, {
        preserveState: false,
        replace: true
    })
}

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

const getStatusClass = (status) => {
    const classes = {
        unpaid: 'bg-red-100 text-red-800',
        partial: 'bg-yellow-100 text-yellow-800',
        paid: 'bg-green-100 text-green-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
    const texts = {
        unpaid: 'Unpaid',
        partial: 'Partial',
        paid: 'Paid'
    }
    return texts[status] || status
}

const showPayable = (row) => {
    if (!row.primaryPayableId) {
        return
    }

    router.visit(route('admin-keuangan.account-payables.show', {
        accountPayable: row.primaryPayableId,
        ...currentIndexQuery.value
    }))
}

const visitPage = (url) => {
    const payload = {
        ...searchForm,
        all_month: searchForm.all_month ? 1 : undefined,
        date_from: searchForm.all_month ? undefined : (searchForm.date_from || undefined),
        date_to: searchForm.all_month ? undefined : (searchForm.date_to || undefined),
    }

    router.visit(url, {
        data: payload,
        preserveState: true,
        replace: true
    })
}

const toggleAllMonth = () => {
    searchForm.all_month = !searchForm.all_month

    if (searchForm.all_month) {
        searchForm.date_from = ''
        searchForm.date_to = ''
    } else if (!searchForm.date_from && !searchForm.date_to) {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth(), 1)
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        const format = (date) => date.toISOString().split('T')[0]

        searchForm.date_from = format(start)
        searchForm.date_to = format(end)
    }

    applyFilters()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
