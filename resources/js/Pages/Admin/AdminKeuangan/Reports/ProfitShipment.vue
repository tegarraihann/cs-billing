<template>
    <AdminKeuanganLayout>
        <Head title="Total Profit Shipment Report" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Total Profit Shipment Report</h1>
                        <p class="mt-1 text-sm text-gray-600">Laporan profit per shipment dengan detail breakdown</p>
                    </div>
                    <button
                        @click="exportPdf"
                        :disabled="isExporting"
                        :class="[
                            'inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150',
                            isExporting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2'
                        ]"
                    >
                        <Download class="w-4 h-4 mr-2" />
                        <span>{{ isExporting ? 'Exporting...' : 'Export PDF' }}</span>
                    </button>
                </div>

                <!-- Filters -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Filter Laporan</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Periode</label>
                                <select
                                    v-model="searchForm.period"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="handlePeriodChange"
                                >
                                    <option
                                        v-for="option in periodOptions"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>
                            <div v-if="isMonthly" class="">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Bulan</label>
                                <select
                                    v-model="searchForm.month"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="handleMonthChange"
                                >
                                    <option
                                        v-for="option in monthOptions"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>
                            <div v-else-if="isQuarterly">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Kuartal</label>
                                <select
                                    v-model="searchForm.quarter"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="handleQuarterChange"
                                >
                                    <option
                                        v-for="option in quarterOptions"
                                        :key="option.value"
                                        :value="option.value"
                                    >
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>
                            <div v-if="showYearSelect">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
                                <select
                                    v-model="searchForm.year"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="handleYearChange"
                                >
                                    <option
                                        v-for="year in yearOptions"
                                        :key="year"
                                        :value="year"
                                    >
                                        {{ year }}
                                    </option>
                                </select>
                            </div>
                            <div class="lg:col-span-2">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Customer</label>
                                <select
                                    v-model="searchForm.customer_id"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                    @change="applyFilters"
                                >
                                    <option value="">Semua Customer</option>
                                    <option
                                        v-for="customer in customers"
                                        :key="customer.id"
                                        :value="customer.id"
                                    >
                                        {{ customer.company_name }}
                                    </option>
                                </select>
                            </div>
                            <div class="flex items-end">
                                <button
                                    @click="resetFilters"
                                    class="w-full bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Dari Tanggal</label>
                                <input
                                    v-model="searchForm.date_from"
                                    type="date"
                                    :disabled="!isCustomPeriod"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    @change="handleCustomRangeChange"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Sampai Tanggal</label>
                                <input
                                    v-model="searchForm.date_to"
                                    type="date"
                                    :disabled="!isCustomPeriod"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    @change="handleCustomRangeChange"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            <!-- Summary Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="bg-blue-50 p-6 rounded-lg border border-blue-200">
                    <div class="text-sm font-medium text-blue-600 mb-1">Total Revenue</div>
                    <div class="text-2xl font-bold text-blue-900">
                        Rp {{ formatNumber(summary.total_revenue) }}
                    </div>
                </div>
                <div class="bg-red-50 p-6 rounded-lg border border-red-200">
                    <div class="text-sm font-medium text-red-600 mb-1">Total Costs</div>
                    <div class="text-2xl font-bold text-red-900">
                        Rp {{ formatNumber(summary.total_costs) }}
                    </div>
                </div>
                <div class="bg-green-50 p-6 rounded-lg border border-green-200">
                    <div class="text-sm font-medium text-green-600 mb-1">Total Profit</div>
                    <div class="text-2xl font-bold" :class="summary.total_profit >= 0 ? 'text-green-900' : 'text-red-900'">
                        Rp {{ formatNumber(summary.total_profit) }}
                    </div>
                </div>
                <div class="bg-purple-50 p-6 rounded-lg border border-purple-200">
                    <div class="text-sm font-medium text-purple-600 mb-1">Avg Profit Margin</div>
                    <div class="text-2xl font-bold text-purple-900">
                        {{ formatPercentage(summary.average_profit_margin) }}%
                    </div>
                </div>
            </div>

            <!-- Additional Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div class="text-sm font-medium text-gray-500 mb-1">Profitable Shipments</div>
                    <div class="text-lg font-bold text-green-600">
                        {{ summary.profitable_shipments }} shipments
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div class="text-sm font-medium text-gray-500 mb-1">Loss Shipments</div>
                    <div class="text-lg font-bold text-red-600">
                        {{ summary.loss_shipments }} shipments
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                    <div class="text-sm font-medium text-gray-500 mb-1">Breakeven Shipments</div>
                    <div class="text-lg font-bold text-gray-600">
                        {{ summary.breakeven_shipments }} shipments
                    </div>
                </div>
            </div>

            <!-- Data Table -->
            <div class="bg-white rounded-lg shadow-sm overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    SO Number
                                </th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Revenue
                                </th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Costs
                                </th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Profit
                                </th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Margin
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
                                v-for="item in profitData"
                                :key="item.sales_order.id"
                                class="hover:bg-gray-50"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ item.sales_order.order_number }}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        {{ formatDate(item.sales_order.created_at) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm font-medium text-gray-900">
                                        {{ item.sales_order.customer?.company_name || item.sales_order.customer }}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                    Rp {{ formatNumber(item.revenue) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                    Rp {{ formatNumber(item.costs) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" 
                                    :class="item.profit >= 0 ? 'text-green-600' : 'text-red-600'">
                                    Rp {{ formatNumber(item.profit) }}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm" 
                                    :class="item.profit_margin >= 0 ? 'text-green-600' : 'text-red-600'">
                                    {{ formatPercentage(item.profit_margin) }}%
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <span
                                        :class="getProfitStatusClass(item.profit_status)"
                                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                                    >
                                        {{ getProfitStatusText(item.profit_status) }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                    <button
                                        @click="viewDetail(item.sales_order)"
                                        class="text-blue-600 hover:text-blue-900"
                                        title="View Detail"
                                    >
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            <tr v-if="profitData.length === 0">
                                <td colspan="8" class="px-6 py-4 text-center text-gray-500">
                                    Tidak ada data untuk periode yang dipilih
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue"
import { Head, router } from "@inertiajs/vue3"
import { Download } from "lucide-vue-next"
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue"

const props = defineProps({
    profitData: {
        type: Array,
        default: () => []
    },
    summary: {
        type: Object,
        default: () => ({})
    },
    filters: {
        type: Object,
        default: () => ({})
    },
    customers: {
        type: Array,
        default: () => []
    }
})

const periodOptions = [
    { value: "monthly", label: "Monthly" },
    { value: "quarterly", label: "Quarterly" },
    { value: "yearly", label: "Yearly" },
    { value: "custom", label: "Custom" }
]

const quarterOptions = [
    { value: "Q1", label: "Q1 (Jan-Mar)", startMonth: 0 },
    { value: "Q2", label: "Q2 (Apr-Jun)", startMonth: 3 },
    { value: "Q3", label: "Q3 (Jul-Sep)", startMonth: 6 },
    { value: "Q4", label: "Q4 (Oct-Dec)", startMonth: 9 }
]

const monthFormatter = new Intl.DateTimeFormat("id-ID", { month: "long" })
const monthOptions = Array.from({ length: 12 }, (_, idx) => ({
    value: String(idx + 1).padStart(2, "0"),
    label: monthFormatter.format(new Date(2000, idx, 1))
}))

const currentDate = new Date()
const currentMonth = currentDate.getMonth() + 1
const currentYear = currentDate.getFullYear()
const yearOptions = Array.from({ length: 5 }, (_, idx) => (currentYear - idx).toString())

const defaultPeriod = props.filters.period || "monthly"
const defaultYear = (props.filters.year || currentYear).toString()
const defaultMonth = props.filters.month || String(currentMonth).padStart(2, "0")
const defaultQuarter = props.filters.quarter || getQuarterFromMonth(parseInt(defaultMonth, 10))

const searchForm = reactive({
    period: defaultPeriod,
    month: defaultMonth,
    quarter: defaultQuarter,
    year: defaultYear,
    date_from: props.filters.dateFrom || "",
    date_to: props.filters.dateTo || "",
    customer_id: props.filters.customerId || ""
})

const isMonthly = computed(() => searchForm.period === "monthly")
const isQuarterly = computed(() => searchForm.period === "quarterly")
const isCustomPeriod = computed(() => searchForm.period === "custom")
const showYearSelect = computed(() => ["monthly", "quarterly", "yearly"].includes(searchForm.period))

const isInitializing = ref(true)
const isExporting = ref(false)

function formatInputDate(date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
}

function getQuarterFromMonth(month) {
    if (month >= 1 && month <= 3) return "Q1"
    if (month >= 4 && month <= 6) return "Q2"
    if (month >= 7 && month <= 9) return "Q3"
    return "Q4"
}

function getQuarterDefinition(quarterValue) {
    return quarterOptions.find((option) => option.value === quarterValue) || quarterOptions[0]
}

function getMonthRange(year, month) {
    const start = new Date(year, month - 1, 1)
    const end = new Date(year, month, 0)
    return {
        start: formatInputDate(start),
        end: formatInputDate(end)
    }
}

function getQuarterRange(year, quarterValue) {
    const definition = getQuarterDefinition(quarterValue)
    const start = new Date(year, definition.startMonth, 1)
    const end = new Date(year, definition.startMonth + 3, 0)
    return {
        start: formatInputDate(start),
        end: formatInputDate(end)
    }
}

function getYearRange(year) {
    const start = new Date(year, 0, 1)
    const end = new Date(year, 11, 31)
    return {
        start: formatInputDate(start),
        end: formatInputDate(end)
    }
}

function ensureCustomDates() {
    if (searchForm.date_from && searchForm.date_to) {
        return
    }

    const fallback = getMonthRange(currentYear, currentMonth)
    if (!searchForm.date_from) {
        searchForm.date_from = fallback.start
    }
    if (!searchForm.date_to) {
        searchForm.date_to = fallback.end
    }
}

function updateDateRangeForCurrentSelection() {
    if (searchForm.period === "custom") {
        ensureCustomDates()
        return
    }

    const yearNumber = parseInt(searchForm.year, 10)
    if (Number.isNaN(yearNumber)) {
        return
    }

    let range
    if (searchForm.period === "monthly") {
        const monthNumber = parseInt(searchForm.month, 10)
        if (Number.isNaN(monthNumber)) {
            return
        }
        range = getMonthRange(yearNumber, monthNumber)
    } else if (searchForm.period === "quarterly") {
        range = getQuarterRange(yearNumber, searchForm.quarter)
    } else if (searchForm.period === "yearly") {
        range = getYearRange(yearNumber)
    }

    if (!range) {
        return
    }

    searchForm.date_from = range.start
    searchForm.date_to = range.end
}

function buildFilterPayload() {
    return {
        period: searchForm.period,
        month: searchForm.month,
        quarter: searchForm.quarter,
        year: searchForm.year,
        date_from: searchForm.date_from,
        date_to: searchForm.date_to,
        customer_id: searchForm.customer_id
    }
}

const handlePeriodChange = () => {
    if (searchForm.period === "monthly" && !searchForm.month) {
        searchForm.month = defaultMonth
    }

    if (searchForm.period === "quarterly" && !searchForm.quarter) {
        searchForm.quarter = defaultQuarter
    }

    if (searchForm.period !== "custom" && !searchForm.year) {
        searchForm.year = defaultYear
    }

    if (searchForm.period === "custom") {
        ensureCustomDates()
    } else {
        updateDateRangeForCurrentSelection()
    }

    if (!isInitializing.value) {
        applyFilters()
    }
}

const handleMonthChange = () => {
    if (searchForm.period !== "monthly") return
    updateDateRangeForCurrentSelection()
    if (!isInitializing.value) {
        applyFilters()
    }
}

const handleQuarterChange = () => {
    if (searchForm.period !== "quarterly") return
    updateDateRangeForCurrentSelection()
    if (!isInitializing.value) {
        applyFilters()
    }
}

const handleYearChange = () => {
    if (searchForm.period === "custom") return
    updateDateRangeForCurrentSelection()
    if (!isInitializing.value) {
        applyFilters()
    }
}

const handleCustomRangeChange = () => {
    if (!isCustomPeriod.value || isInitializing.value) {
        return
    }
    applyFilters()
}

if (searchForm.period === "custom") {
    ensureCustomDates()
} else if (!searchForm.date_from || !searchForm.date_to) {
    updateDateRangeForCurrentSelection()
}

onMounted(() => {
    isInitializing.value = false
})

const formatNumber = (number) => {
    return new Intl.NumberFormat("id-ID").format(number || 0)
}

const formatPercentage = (number) => {
    return (number || 0).toFixed(1)
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
    })
}

const getProfitStatusClass = (status) => {
    const classes = {
        excellent: "bg-green-100 text-green-800",
        good: "bg-blue-100 text-blue-800",
        low: "bg-yellow-100 text-yellow-800",
        breakeven: "bg-gray-100 text-gray-800",
        loss: "bg-red-100 text-red-800"
    }
    return classes[status] || "bg-gray-100 text-gray-800"
}

const getProfitStatusText = (status) => {
    const texts = {
        excellent: "Excellent",
        good: "Good",
        low: "Low Profit",
        breakeven: "Breakeven",
        loss: "Loss"
    }
    return texts[status] || status
}

const applyFilters = () => {
    router.get(route("admin-keuangan.profit-reports.index"), buildFilterPayload(), {
        preserveState: true,
        replace: true
    })
}

const resetFilters = () => {
    searchForm.period = "monthly"
    searchForm.month = String(currentMonth).padStart(2, "0")
    searchForm.quarter = getQuarterFromMonth(currentMonth)
    searchForm.year = currentYear.toString()
    searchForm.customer_id = ""
    updateDateRangeForCurrentSelection()
    applyFilters()
}

const exportPdf = async () => {
    if (isExporting.value) return

    try {
        isExporting.value = true
        const params = new URLSearchParams(buildFilterPayload()).toString()
        const url = route("admin-keuangan.profit-reports.export-pdf") + "?" + params

        const newWindow = window.open(url, "_blank")

        if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
            window.location.href = url
        }

        await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
        console.error("Error exporting PDF:", error)
        alert("Error exporting PDF. Please try again.")
    } finally {
        isExporting.value = false
    }
}

const viewDetail = (salesOrder) => {
    router.visit(route("admin-keuangan.profit-reports.sales-order-detail", salesOrder.id))
}
</script>

