<template>
    <AdminKeuanganLayout>
        <Head title="Statement of Financial Position" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Statement of Financial Position</h1>
                        <p class="mt-1 text-sm text-gray-600">
                            Summary of assets, liabilities, and equity as of the selected cut-off date.
                        </p>
                        <p v-if="statement.generated_at" class="mt-1 text-xs text-gray-400">
                            Last updated: {{ formatDateTime(statement.generated_at) }}
                        </p>
                    </div>
                    <form
                        class="bg-white border border-sage-200 rounded-lg p-4 shadow-sm w-full sm:w-auto"
                        @submit.prevent="refreshData"
                    >
                        <div class="flex flex-col sm:flex-row sm:items-end gap-4">
                            <div v-if="closedYears.length">
                                <label for="closing-year" class="block text-sm font-medium text-gray-700">
                                    Closed Year
                                </label>
                                <div class="mt-1 relative">
                                    <select
                                        id="closing-year"
                                        v-model="selectedYear"
                                        @change="handleYearChange"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring focus:ring-sage-200 focus:ring-opacity-50 text-sm"
                                    >
                                        <option value="">Custom Date</option>
                                        <option v-for="year in closedYears" :key="year" :value="year">
                                            {{ year }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label for="cutoff-date" class="block text-sm font-medium text-gray-700">
                                    Cut-off Date
                                </label>
                                <div class="mt-1 relative">
                                    <input
                                        id="cutoff-date"
                                        type="date"
                                        v-model="selectedDate"
                                        @change="handleDateChange"
                                        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring focus:ring-sage-200 focus:ring-opacity-50 text-sm"
                                    />
                                    <Calendar class="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" />
                                </div>
                            </div>
                            <div class="flex gap-3">
                                <button
                                    type="submit"
                                    :disabled="isRefreshing || !selectedDate"
                                    class="inline-flex items-center justify-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150"
                                >
                                    <Loader2 v-if="isRefreshing" class="w-4 h-4 mr-2 animate-spin" />
                                    <RefreshCw v-else class="w-4 h-4 mr-2" />
                                    Reload
                                </button>
                                <button
                                    type="button"
                                    @click="exportPdf"
                                    :disabled="!selectedDate"
                                    class="inline-flex items-center justify-center px-4 py-2 bg-white border border-sage-300 rounded-md font-semibold text-xs text-sage-700 uppercase tracking-widest hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150"
                                >
                                    <Download class="w-4 h-4 mr-2" />
                                    Download PDF
                                </button>
                            </div>
                        </div>
                        <p class="mt-2 text-xs text-gray-400">
                            Changes will automatically reload the report.
                        </p>
                    </form>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div class="bg-white border border-sage-200 rounded-lg shadow-sm p-5 flex items-center">
                        <div class="p-3 bg-sage-100 rounded-lg">
                            <Layers class="w-6 h-6 text-sage-700" />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-500">Total Assets</p>
                            <p class="text-lg font-semibold text-gray-900">
                                {{ formatCurrency(balanceCheck.assets_total) }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-white border border-sage-200 rounded-lg shadow-sm p-5 flex items-center">
                        <div class="p-3 bg-blue-100 rounded-lg">
                            <Scale class="w-6 h-6 text-blue-600" />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-500">Total Liabilities</p>
                            <p class="text-lg font-semibold text-gray-900">
                                {{ formatCurrency(liabilitiesTotal) }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-white border border-sage-200 rounded-lg shadow-sm p-5 flex items-center">
                        <div class="p-3 bg-emerald-100 rounded-lg">
                            <Wallet class="w-6 h-6 text-emerald-600" />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-500">Equity (Info)</p>
                            <p class="text-lg font-semibold text-gray-900">
                                {{ equityTotalDisplay }}
                            </p>
                        </div>
                    </div>
                    <div
                        class="bg-white border rounded-lg shadow-sm p-5 flex items-center"
                        :class="isBalanced ? 'border-emerald-200' : 'border-amber-200'"
                    >
                        <div
                            class="p-3 rounded-lg"
                            :class="isBalanced ? 'bg-emerald-100' : 'bg-amber-100'"
                        >
                            <component
                                :is="isBalanced ? CheckCircle2 : AlertTriangle"
                                class="w-6 h-6"
                                :class="isBalanced ? 'text-emerald-600' : 'text-amber-600'"
                            />
                        </div>
                        <div class="ml-4">
                            <p class="text-sm text-gray-500">
                                {{ isBalanced ? 'Balanced' : 'Difference' }}
                            </p>
                            <p
                                class="text-lg font-semibold"
                                :class="isBalanced ? 'text-emerald-600' : 'text-amber-600'"
                            >
                                {{ formatCurrency(balanceCheck.difference) }}
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    v-if="!isBalanced"
                    class="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 flex items-start gap-3"
                >
                    <AlertTriangle class="w-5 h-5 mt-0.5 shrink-0" />
                    <div>
                        There is a difference between total assets and total liabilities + equity.
                        Review manual adjustments or ensure all modules are posted correctly.
                    </div>
                </div>

                <div
                    class="rounded-lg border border-sage-200 bg-white px-4 py-3 text-sm text-gray-600 flex items-start gap-3"
                >
                    <Info class="w-5 h-5 mt-0.5 shrink-0 text-sage-600" />
                    <div>
                        The <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">Auto</span>
                        label indicates balances calculated automatically from related modules. If manual adjustments are needed,
                        create entries in <span class="font-medium">Financial Position Adjustments</span>.
                        Manual entries are labeled
                        <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium">Manual</span>.
                    </div>
                </div>

                <div class="space-y-6">
                    <div
                        v-for="(section, sectionKey) in visibleSections"
                        :key="sectionKey"
                        class="bg-white border border-sage-200 rounded-xl shadow-sm overflow-hidden"
                    >
                        <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
                            <h2 class="text-lg font-semibold text-sage-800">{{ section.title }}</h2>
                        </div>

                        <div class="p-6 space-y-8">
                            <div
                                v-for="group in section.groups"
                                :key="group.title"
                                class="space-y-3"
                            >
                                <div class="flex items-center justify-between">
                                    <h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                        {{ group.title }}
                                    </h3>
                                    <span v-if="sectionKey !== 'equity'" class="text-sm font-semibold text-gray-900">
                                        {{ formatCurrency(group.total) }}
                                    </span>
                                </div>

                                <div class="bg-white border border-gray-100 rounded-lg overflow-hidden">
                                    <table class="min-w-full divide-y divide-gray-100">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Account
                                                </th>
                                                <th scope="col" class="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Balance
                                                </th>
                                                <th scope="col" class="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                                    Source
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-100">
                                            <tr v-for="row in group.rows" :key="row.account_code">
                                                <td class="px-4 py-3">
                                                    <div class="text-sm font-medium text-gray-900">
                                                        {{ row.account_name }}
                                                    </div>
                                                    <div class="text-xs text-gray-400">
                                                        {{ row.account_code }}
                                                    </div>
                                                </td>
                                                <td class="px-4 py-3 text-right">
                                                    <span
                                                        class="text-sm font-semibold"
                                                        :class="row.amount < 0 ? 'text-red-600' : 'text-gray-900'"
                                                    >
                                                        {{ formatCurrency(row.amount) }}
                                                    </span>
                                                </td>
                                                <td class="px-4 py-3">
                                                    <div class="flex items-center justify-end gap-2">
                                                        <span
                                                            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                                                            :class="sourceBadgeClass(row)"
                                                        >
                                                            {{ sourceLabel(row) }}
                                                        </span>
                                                        <span
                                                            v-if="row.details.manual_override?.effective_date"
                                                            class="text-xs text-gray-400"
                                                        >
                                                            {{ formatDate(row.details.manual_override.effective_date) }}
                                                        </span>
                                                        <span
                                                            v-else-if="row.source === 'manual'"
                                                            class="text-[11px] text-amber-700 text-right"
                                                        >
                                                            Input via Financial Position Adjustments
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tfoot v-if="sectionKey !== 'equity'">
                                            <tr class="bg-gray-50">
                                                <td class="px-4 py-3 text-sm font-semibold text-gray-700">
                                                    Total {{ group.title }}
                                                </td>
                                                <td class="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                                                    {{ formatCurrency(group.total) }}
                                                </td>
                                                <td></td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div v-if="sectionKey !== 'equity'" class="px-6 py-4 border-t border-sage-200 bg-sage-50 flex items-center justify-between">
                            <span class="text-sm font-semibold text-sage-800">
                                Total {{ section.title }}
                            </span>
                            <span class="text-base font-bold text-sage-900">
                                {{ formatCurrency(section.total) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { Head, router } from '@inertiajs/vue3'
import { ref, computed, watch } from 'vue'
import {
    AlertTriangle,
    Calendar,
    CheckCircle2,
    Download,
    Info,
    Layers,
    Loader2,
    RefreshCw,
    Scale,
    Wallet,
} from 'lucide-vue-next'

const props = defineProps({
    statement: {
        type: Object,
        default: () => ({}),
    },
    filters: {
        type: Object,
        default: () => ({}),
    },
    closedYears: {
        type: Array,
        default: () => [],
    },
})

const selectedDate = ref(props.filters?.date || new Date().toISOString().slice(0, 10))
const selectedYear = ref(props.filters?.year || '')
const isRefreshing = ref(false)

watch(
    () => props.filters?.date,
    (value) => {
        if (value && value !== selectedDate.value) {
            selectedDate.value = value
        }
    }
)

const sections = computed(() => props.statement?.sections || {})
const visibleSections = computed(() => sections.value)

const balanceCheck = computed(() => ({
    assets_total: Number(props.statement?.balance_check?.assets_total || 0),
    liabilities_equity_total: Number(props.statement?.balance_check?.liabilities_equity_total || 0),
    difference: Number(props.statement?.balance_check?.difference || 0),
}))

const liabilitiesTotal = computed(() => Number(props.statement?.sections?.liabilities?.total || 0))
const equityTotal = computed(() => Number(props.statement?.sections?.equity?.total || 0))
const equityTotalDisplay = computed(() => '-')

const isBalanced = computed(() => Math.abs(balanceCheck.value.difference) < 0.01)

const refreshData = () => {
    if (!selectedDate.value || isRefreshing.value) {
        return
    }

    isRefreshing.value = true
    router.get(
        route('admin-keuangan.financial-position.index'),
        { date: selectedDate.value, year: selectedYear.value || undefined },
        {
            preserveState: true,
            replace: true,
            onFinish: () => {
                isRefreshing.value = false
            },
        }
    )
}

const handleYearChange = () => {
    if (selectedYear.value) {
        selectedDate.value = `${selectedYear.value}-12-31`
    }
    refreshData()
}

const handleDateChange = () => {
    selectedYear.value = ''
    refreshData()
}

const exportPdf = () => {
    if (!selectedDate.value) {
        return
    }

    const url = route('admin-keuangan.financial-position.pdf', {
        date: selectedDate.value,
        year: selectedYear.value || undefined,
    })
    window.open(url, '_blank')
}

const formatCurrency = (value) => {
    const amount = Number(value || 0)
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 2,
    }).format(amount)
}

const formatDate = (value) => {
    if (!value) return '-'
    return new Date(value).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const formatDateTime = (value) => {
    if (!value) return '-'
    return new Date(value).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

const hasManualOverride = (row) => !!row.details?.manual_override

const sourceBadgeClass = (row) => {
    if (row.source === 'manual') {
        return hasManualOverride(row)
            ? 'bg-amber-100 text-amber-800'
            : 'bg-amber-50 text-amber-700 border border-amber-200'
    }

    if (row.source === 'auto') {
        return 'bg-blue-100 text-blue-800'
    }

    return 'bg-gray-100 text-gray-800'
}

const sourceLabel = (row) => {
    if (row.source === 'manual') {
        return hasManualOverride(row) ? 'Manual' : 'Manual (Pending)'
    }

    if (row.source === 'auto') {
        return 'Auto'
    }

    return 'Unknown'
}
</script>
