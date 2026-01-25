<template>
    <AdminKeuanganLayout>
        <Head title="Opening Receivables" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Opening Receivables</h1>
                        <p class="mt-1 text-sm text-gray-600">Opening balance records for accounts receivable.</p>
                    </div>
                    <Link
                        :href="route('admin-keuangan.opening-receivables.create')"
                        class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                    >
                        Add Opening Receivable
                    </Link>
                </div>

                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <div v-if="receivables.data.length" class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
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
                                <tr v-for="receivable in receivables.data" :key="receivable.id">
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        {{ receivable.customer?.company_name || receivable.customer_name || '-' }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-600">
                                        {{ receivable.source_so_number || '-' }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-900">
                                        {{ receivable.invoice_number }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-600">
                                        {{ formatDate(receivable.invoice_date) }}
                                    </td>
                                    <td class="px-6 py-4 text-right text-sm text-gray-900">
                                        {{ formatCurrency(receivable.invoice_amount) }}
                                    </td>
                                    <td class="px-6 py-4 text-right text-sm text-gray-900">
                                        {{ formatCurrency(receivable.outstanding_amount) }}
                                    </td>
                                    <td class="px-6 py-4 text-sm text-gray-600">
                                        {{ formatDate(receivable.opening_payment_date) }}
                                    </td>
                                    <td class="px-6 py-4 text-right text-sm font-medium">
                                        <Link
                                            :href="route('admin-keuangan.account-receivables.show', receivable.id)"
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
                        No opening receivables recorded.
                    </div>
                </div>

                <div v-if="receivables" class="mt-6">
                    <Pagination :data="receivables" />
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { Head, Link } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import Pagination from '@/Components/Pagination.vue'

const props = defineProps({
    receivables: Object,
})

const formatDate = (value) => {
    if (!value) return '-'
    return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const formatCurrency = (value) => {
    const amount = Number(value || 0)
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount)
}
</script>
