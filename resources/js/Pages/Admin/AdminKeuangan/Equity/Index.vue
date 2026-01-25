<template>
    <AdminKeuanganLayout>
        <Head title="Equity" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Equity</h1>
                        <p class="mt-1 text-sm text-gray-600">Track equity movements and owner-related balances</p>
                    </div>
                    <Link
                        :href="route('admin-keuangan.equity.create')"
                        class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <Plus class="w-4 h-4 mr-2" />
                        Add Entry
                    </Link>
                </div>

                <div v-if="summary && summary.length" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div
                        v-for="row in summary"
                        :key="row.entry_type"
                        class="bg-white shadow-sm rounded-lg p-4 border border-gray-100"
                    >
                        <div class="text-xs text-gray-500 uppercase tracking-wide">{{ resolveTypeLabel(row.entry_type) }}</div>
                        <div class="mt-2 text-lg font-semibold text-gray-900">{{ formatCurrency(row.total_amount) }}</div>
                        <div class="text-xs text-gray-500 mt-1">{{ row.entries_count }} entries</div>
                    </div>
                </div>

                <div v-if="openingSummary" class="bg-white shadow rounded-lg mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
                            <div>
                                <h2 class="text-lg font-semibold text-gray-900">Opening Balance Notes</h2>
                                <p class="text-sm text-gray-500">Latest opening receivables and payables recorded in the system.</p>
                            </div>
                            <div class="text-sm text-gray-600">
                                Receivables: {{ openingSummary.receivables_count }} -
                                {{ formatCurrency(openingSummary.receivables_total) }} |
                                Payables: {{ openingSummary.payables_count }} -
                                {{ formatCurrency(openingSummary.payables_total) }}
                            </div>
                        </div>

                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <h3 class="text-sm font-semibold text-gray-900 mb-2">Opening Receivables</h3>
                                <div v-if="openingReceivables.length" class="overflow-x-auto border border-gray-200 rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200 text-sm">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                                <th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                                                <th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Source SO</th>
                                                <th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Invoice Date</th>
                                                <th class="px-4 py-2 text-right font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            <tr v-for="row in openingReceivables" :key="row.id">
                                                <td class="px-4 py-2 text-gray-900">
                                                    {{ row.customer?.company_name || row.customer_name || '-' }}
                                                </td>
                                                <td class="px-4 py-2 text-gray-700">{{ openingTypeLabel(row.opening_type) }}</td>
                                                <td class="px-4 py-2 text-gray-700">{{ row.invoice_number }}</td>
                                                <td class="px-4 py-2 text-gray-700">{{ row.source_so_number || '-' }}</td>
                                                <td class="px-4 py-2 text-gray-700">{{ formatDate(row.invoice_date) }}</td>
                                                <td class="px-4 py-2 text-right text-gray-900">
                                                    {{ formatCurrency(row.outstanding_amount) }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-else class="text-sm text-gray-500">No opening receivables recorded.</div>
                            </div>
                            <div>
                                <h3 class="text-sm font-semibold text-gray-900 mb-2">Opening Payables</h3>
                                <div v-if="openingPayables.length" class="overflow-x-auto border border-gray-200 rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200 text-sm">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                                                <th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                                                <th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Source SO</th>
                                                <th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider">Invoice Date</th>
                                                <th class="px-4 py-2 text-right font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            <tr v-for="row in openingPayables" :key="row.id">
                                                <td class="px-4 py-2 text-gray-900">
                                                    {{ row.vendor?.nama_vendor || row.vendor_name || '-' }}
                                                </td>
                                                <td class="px-4 py-2 text-gray-700">{{ openingTypeLabel(row.opening_type) }}</td>
                                                <td class="px-4 py-2 text-gray-700">{{ row.vendor_invoice_number || '-' }}</td>
                                                <td class="px-4 py-2 text-gray-700">{{ row.source_so_number || '-' }}</td>
                                                <td class="px-4 py-2 text-gray-700">{{ formatDate(row.vendor_invoice_date) }}</td>
                                                <td class="px-4 py-2 text-right text-gray-900">
                                                    {{ formatCurrency(row.outstanding_amount) }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-else class="text-sm text-gray-500">No opening payables recorded.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white shadow rounded-lg mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                                <input
                                    v-model="filterForm.start_date"
                                    type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                                <input
                                    v-model="filterForm.end_date"
                                    type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
                                <select
                                    v-model="filterForm.type"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                >
                                    <option value="">All Types</option>
                                    <option v-for="option in typeOptions" :key="option.value" :value="option.value">
                                        {{ option.label }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    v-model="filterForm.status"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                >
                                    <option value="">All</option>
                                    <option value="recorded">Recorded</option>
                                    <option value="settled">Settled</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Opening</label>
                                <select
                                    v-model="filterForm.opening"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                >
                                    <option value="">All</option>
                                    <option value="1">Opening Only</option>
                                    <option value="0">Non-opening</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-4 flex items-center space-x-2">
                            <button
                                type="button"
                                @click="applyFilters"
                                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                            >
                                Apply Filters
                            </button>
                            <button
                                type="button"
                                @click="resetFilters"
                                class="inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <div v-if="entries.data.length" class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opening</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Impact</th>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr v-for="entry in entries.data" :key="entry.id">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {{ formatDate(entry.entry_date) }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        {{ resolveTypeLabel(entry.entry_type) }}
                                        <div v-if="entry.reference" class="text-xs text-gray-500">Ref: {{ entry.reference }}</div>
                                    </td>
                                    <td class="px-6 py-4 text-sm font-semibold" :class="entry.direction === 'decrease' ? 'text-red-600' : 'text-green-600'">
                                        {{ entry.direction === 'decrease' ? '-' : '+' }}{{ formatCurrency(entry.amount) }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        {{ entry.is_opening ? 'Yes' : 'No' }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        <span v-if="entry.affects_bank">
                                            {{ entry.bank_account?.bank_name || 'Bank' }}
                                        </span>
                                        <span v-else>-</span>
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        <span
                                            :class="entry.status === 'settled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                                            class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                                        >
                                            {{ entry.status === 'settled' ? 'Settled' : 'Recorded' }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 text-right text-sm font-medium">
                                        <Link :href="route('admin-keuangan.equity.show', entry.id)" class="text-sage-600 hover:text-sage-900">
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else class="px-6 py-8 text-center text-sm text-gray-500">
                        No equity entries found.
                    </div>
                </div>

                <div v-if="entries" class="mt-6">
                    <Pagination :data="entries" />
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { reactive } from 'vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { Plus } from 'lucide-vue-next'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import Pagination from '@/Components/Pagination.vue'

const props = defineProps({
    entries: Object,
    filters: Object,
    typeOptions: Array,
    summary: Array,
    openingReceivables: {
        type: Array,
        default: () => [],
    },
    openingPayables: {
        type: Array,
        default: () => [],
    },
    openingSummary: {
        type: Object,
        default: null,
    },
})

const filterForm = reactive({
    start_date: props.filters?.start_date || '',
    end_date: props.filters?.end_date || '',
    type: props.filters?.type || '',
    status: props.filters?.status || '',
    opening: props.filters?.opening ?? '',
})

const applyFilters = () => {
    router.get(route('admin-keuangan.equity.index'), { ...filterForm }, { preserveState: true })
}

const resetFilters = () => {
    filterForm.start_date = ''
    filterForm.end_date = ''
    filterForm.type = ''
    filterForm.status = ''
    filterForm.opening = ''
    applyFilters()
}

const formatDate = (value) => {
    if (!value) return '-'
    return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const formatCurrency = (value) => {
    const amount = Number(value || 0)
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)
}

const resolveTypeLabel = (type) => {
    const match = props.typeOptions?.find((option) => option.value === type)
    return match?.label || type
}

const openingTypeLabel = (type) => {
    if (type === 'reimbursement') {
        return 'Reimbursement'
    }
    return 'Main Invoice'
}
</script>
