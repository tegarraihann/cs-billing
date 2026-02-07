<template>
    <AdminKeuanganLayout>
        <Head title="Equity Entry Details" />

        <div class="py-6">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Equity Entry Details</h1>
                        <p class="mt-1 text-sm text-gray-600">{{ typeLabel }}</p>
                    </div>
                    <Link
                        :href="route('admin-keuangan.equity.index', filters || {})"
                        class="inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        Back
                    </Link>
                </div>

                <div class="bg-white shadow rounded-lg mb-6">
                    <div class="px-6 py-6 space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p class="text-xs text-gray-500 uppercase tracking-wide">Entry Date</p>
                                <p class="text-sm font-semibold text-gray-900">{{ formatDate(entry.entry_date) }}</p>
                            </div>
                            <div v-if="entry.employee_name">
                                <p class="text-xs text-gray-500 uppercase tracking-wide">Employee Name</p>
                                <p class="text-sm font-semibold text-gray-900">{{ entry.employee_name }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 uppercase tracking-wide">Amount</p>
                                <p class="text-sm font-semibold" :class="entry.direction === 'decrease' ? 'text-red-600' : 'text-green-600'">
                                    {{ entry.direction === 'decrease' ? '-' : '+' }}{{ formatCurrency(entry.amount) }}
                                </p>
                            </div>
                            <div v-if="entry.payment_date">
                                <p class="text-xs text-gray-500 uppercase tracking-wide">Payment Date</p>
                                <p class="text-sm text-gray-900">{{ formatDate(entry.payment_date) }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 uppercase tracking-wide">Opening Balance</p>
                                <p class="text-sm text-gray-900">{{ entry.is_opening ? 'Yes' : 'No' }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-gray-500 uppercase tracking-wide">Status</p>
                                <span
                                    :class="entry.status === 'settled' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                                >
                                    {{ entry.status === 'settled' ? 'Settled' : 'Recorded' }}
                                </span>
                            </div>
                        </div>

                        <div v-if="entry.reference">
                            <p class="text-xs text-gray-500 uppercase tracking-wide">Reference</p>
                            <p class="text-sm text-gray-900">{{ entry.reference }}</p>
                        </div>

                        <div v-if="entry.notes">
                            <p class="text-xs text-gray-500 uppercase tracking-wide">Notes</p>
                            <p class="text-sm text-gray-900 whitespace-pre-line">{{ entry.notes }}</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white shadow rounded-lg mb-6">
                    <div class="px-6 py-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Bank Impact</h2>
                        <div v-if="entry.affects_bank" class="space-y-2">
                            <div class="text-sm text-gray-700">
                                <span class="font-medium">Bank:</span>
                                {{ entry.bank_account?.bank_name || '-' }} ({{ entry.bank_account?.account_number || '-' }})
                            </div>
                            <div class="text-sm text-gray-700">
                                <span class="font-medium">Transaction Type:</span>
                                {{ entry.bank_transaction_type || '-' }}
                            </div>
                            <div v-if="entry.settled_at" class="text-sm text-gray-700">
                                <span class="font-medium">Settlement Date:</span>
                                {{ formatDate(entry.settled_at) }}
                            </div>
                        </div>
                        <div v-else class="text-sm text-gray-500">
                            This entry does not create a bank transaction.
                        </div>
                    </div>
                </div>

                <div v-if="canSettle" class="bg-white shadow rounded-lg">
                    <form @submit.prevent="submitSettlement" class="px-6 py-6 space-y-4">
                        <h2 class="text-lg font-semibold text-gray-900">Settle Through Bank</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Settlement Date</label>
                                <input
                                    v-model="settlementForm.settlement_date"
                                    type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                                <div v-if="settlementForm.errors.settlement_date" class="text-xs text-red-600 mt-2">{{ settlementForm.errors.settlement_date }}</div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
                                <select
                                    v-model="settlementForm.bank_account_id"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                >
                                    <option value="">Select bank account</option>
                                    <option v-for="bank in bankAccounts" :key="bank.id" :value="bank.id">
                                        {{ bank.bank_name }} - {{ bank.account_number }}
                                    </option>
                                </select>
                                <div v-if="settlementForm.errors.bank_account_id" class="text-xs text-red-600 mt-2">{{ settlementForm.errors.bank_account_id }}</div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                            <textarea
                                v-model="settlementForm.notes"
                                rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                placeholder="Settlement notes"
                            ></textarea>
                        </div>

                        <div class="flex justify-end">
                            <button
                                type="submit"
                                :disabled="settlementForm.processing"
                                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                Mark as Settled
                            </button>
                        </div>

                        <div v-if="settlementForm.errors.error" class="text-xs text-red-600">{{ settlementForm.errors.error }}</div>
                    </form>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { computed } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

const props = defineProps({
    entry: Object,
    typeConfig: Object,
    bankAccounts: Array,
    canSettle: Boolean,
    filters: {
        type: Object,
        default: () => ({}),
    },
})

const typeLabel = computed(() => props.typeConfig?.label || props.entry.entry_type)

const settlementForm = useForm({
    bank_account_id: '',
    settlement_date: props.entry?.payment_date || new Date().toISOString().slice(0, 10),
    notes: '',
})

const submitSettlement = () => {
    settlementForm.post(route('admin-keuangan.equity.settle', props.entry.id))
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
