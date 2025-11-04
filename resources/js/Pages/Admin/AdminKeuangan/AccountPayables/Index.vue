<template>
    <AdminKeuanganLayout>
        <Head title="Manajemen Hutang" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Manajemen Hutang</h1>
                        <p class="mt-1 text-sm text-gray-600">Kelola hutang dan pembayaran vendor</p>
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
                                        <dt class="text-sm font-medium text-gray-500 truncate">Jumlah Overdue</dt>
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
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Filter Data</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
                                <input
                                    v-model="searchForm.search"
                                    type="text"
                                    placeholder="Cari vendor atau service..."
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
                                    <option value="">Semua Status</option>
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
                                    <option value="">Semua Vendor</option>
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
                                <label class="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
                                <input
                                    v-model="searchForm.date_from"
                                    type="date"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="applyFilters"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
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

                <!-- Vendor Summary Section -->
                <div v-if="vendorSummaryRows.length > 0" class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Ringkasan per Vendor</h3>
                        <div ref="vendorSummaryContainer" class="overflow-x-auto" style="overflow-x: auto;">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Paid</th>
                                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total Outstanding</th>
                                        <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah Invoice</th>
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
                                    Vendor
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Service
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Invoice/SO
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
                                        {{ row.vendorName }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ row.vendorInvoiceDate ? formatDate(row.vendorInvoiceDate) : '-' }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ row.serviceLabel }}
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
                                        <div v-if="row.invoiceNumber">
                                            Invoice: {{ row.invoiceNumber }}
                                        </div>
                                        <div v-if="row.salesOrder">
                                            SO: {{ row.salesOrder.order_number }}
                                        </div>
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
                                            ({{ row.daysOverdue }} hari)
                                        </span>
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <div class="flex items-center justify-center space-x-2">
                                        <button
                                            @click="showPayable(row)"
                                            class="text-blue-600 hover:text-blue-900"
                                            title="Lihat Detail"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                            </svg>
                                        </button>
                                        <button
                                            v-if="row.status !== 'paid'"
                                            @click="openPaymentModal(row)"
                                            class="text-green-600 hover:text-green-900"
                                            title="Mark Payment"
                                        >
                                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                                            </svg>
                                        </button>
                                    </div>
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

        <ReimbursementPaymentModal
            :visible="showPaymentModal"
            :processing="processing"
            :form="paymentForm"
            :bank-accounts="props.bankAccounts"
            :reimbursement-items="reimbursementItems"
            :max-amount="selectedComponent ? Number(selectedComponent.outstanding_amount || 0) : (selectedPayable ? Number(selectedPayable.outstanding_amount || 0) : 0)"
            title="Mark Payment"
            submit-label="Mark Payment"
            @close="closePaymentModal"
            @submit="markPayment"
        >
            <template #summary>
                <div class="mb-4 bg-gray-50 p-3 rounded-md">
                    <p class="text-sm text-gray-600">Vendor: {{ modalVendorName }}</p>
                    <p class="text-sm text-gray-600">Komponen: {{ modalServiceLabel }}</p>
                    <p class="text-sm text-gray-600">Outstanding: Rp {{ formatNumber(modalOutstanding) }}</p>
                </div>
            </template>
        </ReimbursementPaymentModal>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { router, Head } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import ReimbursementPaymentModal from '@/Components/ReimbursementPaymentModal.vue'
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
    date_to: props.filters.date_to || ''
})

const showPaymentModal = ref(false)
const selectedRow = ref(null)
const selectedPayable = ref(null)
const processing = ref(false)
const reimbursementItems = ref([])

const paymentForm = reactive({
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    bank_account_id: '',
    payment_method: '',
    notes: '',
    component_id: '',
    reimbursement_items: [],
    reimbursement_vendor_name: '',
    reimbursement_paid_at: new Date().toISOString().split('T')[0],
    reimbursement_notes: ''
})

const componentTypeLabels = {
    vendor_payment: 'Vendor Payment',
    operational_cost: 'Biaya Operational',
    reimbursement: 'Reimbursement'
}

const componentLabel = (type) => {
    return componentTypeLabels[type] || 'Komponen'
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
        date_from: searchForm.date_from,
        date_to: searchForm.date_to
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

const selectedComponent = computed(() => selectedRow.value?.component || null)

const modalOutstanding = computed(() => {
    if (selectedComponent.value) {
        return Number(selectedComponent.value.outstanding_amount || 0)
    }
    if (selectedPayable.value) {
        return Number(selectedPayable.value.outstanding_amount || 0)
    }
    return 0
})

const modalServiceLabel = computed(() => {
    if (selectedComponent.value) {
        return componentLabel(selectedComponent.value.component_type)
    }
    return 'Total Hutang'
})

const modalVendorName = computed(() => {
    if (selectedComponent.value && selectedComponent.value.recipient_name) {
        return selectedComponent.value.recipient_name
    }
    if (selectedPayable.value?.vendor?.nama_vendor) {
        return selectedPayable.value.vendor.nama_vendor
    }
    if (selectedPayable.value?.vendor_name) {
        return selectedPayable.value.vendor_name
    }
    return 'Eshaka Wijaya Logistics'
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
    const rows = []
    const data = props.payables?.data || []

    data.forEach((payable) => {
        const vendorName = payable.vendor?.nama_vendor || payable.vendor_name
        const vendorInvoiceDate = payable.vendor_invoice_date || null
        const invoiceNumber = payable.vendor_invoice_number || null
        const salesOrder = payable.sales_order || null
        const baseRemarks = payable.service_remarks || ''
        const baseDueDate = payable.payment_due_date || null
        const baseStatus = payable.status || 'unpaid'
        const baseDaysOverdue = payable.days_overdue || calculateDaysOverdue(baseDueDate, baseStatus)
        const components = payable.components || []

        if (!components.length) {
            rows.push({
                key: `${payable.id}-base`,
                payable,
                vendorName,
                vendorInvoiceDate,
                invoiceNumber,
                salesOrder,
                serviceLabel: componentLabel('vendor_payment'),
                serviceDescription: payable.service_description || '',
                serviceRemarks: baseRemarks,
                amount: payable.amount || 0,
                paidAmount: payable.paid_amount || 0,
                outstanding: payable.outstanding_amount || 0,
                status: baseStatus,
                daysOverdue: baseDaysOverdue
            })
            return
        }

        components.forEach((component) => {
            const label = componentLabel(component.component_type)
            const status = component.status || baseStatus
            const dueDate = component.due_date || baseDueDate

            rows.push({
                key: `${payable.id}-${component.id}`,
                payable,
                component,
                vendorName,
                vendorInvoiceDate,
                invoiceNumber,
                salesOrder,
                serviceLabel: label,
                serviceDescription: component.description || payable.service_description || '',
                serviceRemarks: baseRemarks,
                amount: component.amount || 0,
                paidAmount: component.paid_amount || 0,
                outstanding: component.outstanding_amount || 0,
                status,
                daysOverdue: calculateDaysOverdue(dueDate, status)
            })
        })
    })

    return rows
})

let debounceTimer = null

const debounceSearch = () => {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        applyFilters()
    }, 500)
}

const applyFilters = () => {
    router.get(route('admin-keuangan.account-payables.index'), searchForm, {
        preserveState: true,
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
    const params = {
        accountPayable: row.payable.id
    }
    if (row.component) {
        params.component_id = row.component.id
    }
    router.visit(route('admin-keuangan.account-payables.show', params))
}

const openPaymentModal = async (row) => {
    selectedRow.value = row
    selectedPayable.value = row.payable
    paymentForm.amount = ''
    paymentForm.bank_account_id = ''
    paymentForm.payment_method = ''
    paymentForm.notes = ''
    paymentForm.component_id = row.component ? String(row.component.id) : ''
    paymentForm.reimbursement_vendor_name = modalVendorName.value
    paymentForm.reimbursement_paid_at = new Date().toISOString().split('T')[0]
    paymentForm.reimbursement_notes = ''
    reimbursementItems.value = []

    if (row.component && row.component.component_type === 'reimbursement') {
        try {
            const response = await fetch(route('admin-keuangan.account-payables.reimbursement-items', {
                accountPayable: row.payable.id
            }))
            if (response.ok) {
                reimbursementItems.value = await response.json()
                paymentForm.reimbursement_items = reimbursementItems.value
                    .filter(item => item.status !== 'paid')
                    .map(item => item.id)
            }
        } catch (error) {
            console.error('Failed to fetch reimbursement items', error)
        }
    } else {
        paymentForm.reimbursement_items = []
        reimbursementItems.value = []
    }

    showPaymentModal.value = true
}

const closePaymentModal = () => {
    showPaymentModal.value = false
    selectedPayable.value = null
    selectedRow.value = null
    reimbursementItems.value = []
    paymentForm.component_id = ''
    paymentForm.reimbursement_items = []
    paymentForm.reimbursement_vendor_name = ''
    paymentForm.reimbursement_notes = ''
}

const markPayment = () => {
    processing.value = true

    router.post(
        route('admin-keuangan.account-payables.mark-as-paid', selectedPayable.value.id),
        paymentForm,
        {
            onSuccess: () => {
                closePaymentModal()
                processing.value = false
            },
            onError: () => {
                processing.value = false
            }
        }
    )
}

const visitPage = (url) => {
    router.visit(url, {
        preserveState: true,
        replace: true
    })
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
















