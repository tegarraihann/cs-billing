<template>
    <AdminKeuanganLayout>
        <Head title="Opening Payables" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Opening Payables</h1>
                        <p class="mt-1 text-sm text-gray-600">Opening balance records for accounts payable.</p>
                    </div>
                    <Link
                        :href="route('admin-keuangan.opening-payables.create')"
                        class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                    >
                        Add Opening Payable
                    </Link>
                </div>

                <div class="space-y-8">
                    <div v-for="section in sections" :key="section.key">
                        <div class="mb-3">
                            <h2 class="text-lg font-semibold text-gray-900">{{ section.title }}</h2>
                            <p class="text-sm text-gray-600">{{ section.description }}</p>
                        </div>

                        <div class="bg-white shadow overflow-hidden sm:rounded-md">
                            <div v-if="section.data && section.data.data && section.data.data.length" class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SO Number</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Date</th>
                                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Outstanding</th>
                                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                                            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr v-for="payable in section.data.data" :key="payable.id">
                                            <td class="px-6 py-4 text-sm text-gray-900">
                                                {{ payable.vendor?.nama_vendor || payable.vendor_name || '-' }}
                                            </td>
                                            <td class="px-6 py-4 text-sm text-gray-600">
                                                {{ payable.source_so_number || '-' }}
                                            </td>
                                            <td class="px-6 py-4 text-sm text-gray-900">
                                                {{ payable.vendor_invoice_number || '-' }}
                                            </td>
                                            <td class="px-6 py-4 text-sm text-gray-600">
                                                {{ formatDate(payable.vendor_invoice_date) }}
                                            </td>
                                            <td class="px-6 py-4 text-right text-sm text-gray-900">
                                                {{ formatCurrency(payable.amount) }}
                                            </td>
                                            <td class="px-6 py-4 text-right text-sm text-gray-900">
                                                {{ formatCurrency(payable.outstanding_amount) }}
                                            </td>
                                            <td class="px-6 py-4 text-sm text-gray-600">
                                                {{ formatDate(payable.opening_payment_date) }}
                                            </td>
                                            <td class="px-6 py-4 text-right text-sm font-medium">
                                                <Link
                                                    :href="buildPayableDetailUrl(payable.id)"
                                                    class="text-sage-600 hover:text-sage-900"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else class="px-6 py-8 text-center text-sm text-gray-500">
                                No opening payables recorded.
                            </div>
                        </div>

                        <div v-if="section.data && section.data.data && section.data.data.length" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
                            <div class="flex items-center justify-between">
                                <div class="text-sm text-gray-700">
                                    Showing {{ section.data.from || 0 }} to {{ section.data.to || 0 }} of {{ section.data.total || 0 }} results
                                </div>
                                <div class="flex space-x-1">
                                    <template v-for="(link, linkIndex) in section.data.links" :key="`${section.key}-${linkIndex}`">
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
import { computed } from 'vue'
import { Head, Link, router } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

const props = defineProps({
    payablesMain: Object,
    payablesReimbursement: Object,
})

const sections = computed(() => ([
    {
        key: 'main',
        title: 'Main Invoice Opening',
        description: 'Opening payables for main invoices.',
        data: props.payablesMain,
    },
    {
        key: 'reimbursement',
        title: 'Reimbursement Opening',
        description: 'Opening payables for reimbursements.',
        data: props.payablesReimbursement,
    },
]))

const currentOpeningPaginationQuery = computed(() => ({
    source: 'opening-payables',
    main_page: props.payablesMain?.current_page || 1,
    reim_page: props.payablesReimbursement?.current_page || 1,
}))

const buildUrlWithQuery = (path, query = {}) => {
    const params = new URLSearchParams()

    Object.entries(query).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            params.append(key, value)
        }
    })

    const queryString = params.toString()
    return queryString ? `${path}?${queryString}` : path
}

const buildPayableDetailUrl = (payableId) => {
    return buildUrlWithQuery(
        `/admin-keuangan/account-payables/${payableId}`,
        currentOpeningPaginationQuery.value
    )
}

const visitPage = (url) => {
    router.visit(url, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    })
}

const formatDate = (value) => {
    if (!value) return '-'
    return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const formatCurrency = (value) => {
    const amount = Number(value || 0)
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)
}
</script>
