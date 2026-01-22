<template>
    <AdminKeuanganLayout>
        <Head title="Other Income Details" />
        <AlertDialog
            :show="alertDialog.show"
            :type="alertDialog.type"
            :title="alertDialog.title"
            :message="alertDialog.message"
            confirm-text="Yes, continue"
            cancel-text="Cancel"
            @confirm="handleAlertConfirm"
            @close="closeAlert"
        />

        <div class="py-6">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <Link
                                :href="route('admin-keuangan.other-incomes.index')"
                                class="text-sage-600 hover:text-sage-800 transition-colors"
                            >
                                <ArrowLeft class="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900">Other Income Details</h1>
                                <p class="mt-1 text-sm text-gray-600">Full income information</p>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <Link
                                v-if="!otherIncome.posted_to_profit_loss"
                                :href="route('admin-keuangan.other-incomes.edit', otherIncome.id)"
                                class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition"
                            >
                                <Edit class="w-4 h-4 mr-2" />
                                Edit
                            </Link>
                        </div>
                    </div>
                </div>

                <!-- Status Badge -->
                <div class="mb-6">
                    <span :class="otherIncome.posted_to_profit_loss ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle v-if="otherIncome.posted_to_profit_loss" class="w-4 h-4 mr-2" />
                        <Clock v-else class="w-4 h-4 mr-2" />
                        {{ otherIncome.posted_to_profit_loss ? 'Posted to Profit & Loss' : 'Pending' }}
                    </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div class="bg-white border border-sage-200 rounded-lg p-4">
                        <p class="text-xs text-gray-500 uppercase tracking-wider">Outstanding</p>
                        <p class="text-xl font-semibold text-gray-900">{{ formatCurrency(otherIncome.outstanding_amount) }}</p>
                    </div>
                    <div class="bg-white border border-sage-200 rounded-lg p-4">
                        <p class="text-xs text-gray-500 uppercase tracking-wider">Receivable Status</p>
                        <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', receivableStatusBadge(otherIncome.status)]">
                            {{ formatStatus(otherIncome.status) }}
                        </span>
                    </div>
                    <div class="bg-white border border-sage-200 rounded-lg p-4">
                        <p class="text-xs text-gray-500 uppercase tracking-wider">Due Date</p>
                        <p class="text-sm font-medium text-gray-900">
                            {{ otherIncome.due_date ? formatDate(otherIncome.due_date) : '-' }}
                        </p>
                    </div>
                </div>

                <!-- Main Info -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                    <div class="px-4 py-5 sm:px-6 bg-sage-50">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Income Information</h3>
                    </div>
                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <Calendar class="w-4 h-4 mr-2 text-gray-400" />
                                    Date
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                                    {{ formatDate(otherIncome.transaction_date) }}
                                </dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Reference Number</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.reference_number || '-' }}
                                </dd>
                            </div>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Customer</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.customer_name || otherIncome.customer?.company_name || '-' }}
                                </dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <Tag class="w-4 h-4 mr-2 text-gray-400" />
                                    Category
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full" :class="getCategoryBadge(otherIncome.category)">
                                        {{ otherIncome.category }}
                                    </span>
                                </dd>
                            </div>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Current Outstanding</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                                    {{ formatCurrency(otherIncome.outstanding_amount) }}
                                </dd>
                            </div>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <FileText class="w-4 h-4 mr-2 text-gray-400" />
                                    Description
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.description }}
                                </dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <DollarSign class="w-4 h-4 mr-2 text-gray-400" />
                                    Amount
                                </dt>
                                <dd class="mt-1 text-lg font-bold text-green-600 sm:mt-0 sm:col-span-2">
                                    {{ formatCurrency(otherIncome.amount) }}
                                </dd>
                            </div>
                            <div v-if="otherIncome.notes" class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <MessageSquare class="w-4 h-4 mr-2 text-gray-400" />
                                    Notes
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.notes }}
                                </dd>
                            </div>
                            <div v-if="otherIncome.receipt_file" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <Paperclip class="w-4 h-4 mr-2 text-gray-400" />
                                    Income Receipt
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <a :href="`/storage/${otherIncome.receipt_file}`" target="_blank" class="inline-flex items-center text-sage-600 hover:text-sage-800">
                                        <FileText class="w-4 h-4 mr-1" />
                                        View File
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <!-- Audit Info -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                    <div class="px-4 py-5 sm:px-6 bg-gray-50">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Audit Information</h3>
                    </div>
                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Created By</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.creator?.name || '-' }}
                                    <span class="text-gray-500 ml-2">{{ formatDateTime(otherIncome.created_at) }}</span>
                                </dd>
                            </div>
                            <div v-if="otherIncome.posted_to_profit_loss" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Posted to Profit & Loss By</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.approver?.name || '-' }}
                                    <span class="text-gray-500 ml-2">{{ formatDateTime(otherIncome.posted_at) }}</span>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <!-- Payments -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                    <div class="px-4 py-5 sm:px-6 flex items-center justify-between">
                        <div>
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Receivable Payments</h3>
                            <p class="mt-1 text-sm text-gray-500">Record cash receipts for this income.</p>
                        </div>
                        <span v-if="!canRecordPayment" class="text-xs text-gray-500">Receivable is settled</span>
                    </div>
                    <div class="border-t border-gray-200">
                        <div class="p-4 space-y-6">
                            <div v-if="otherIncome.payments?.length" class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                                            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Adjustment</th>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200">
                                        <tr v-for="payment in otherIncome.payments" :key="payment.id">
                                            <td class="px-4 py-2 text-sm text-gray-900">{{ formatDate(payment.payment_date) }}</td>
                                            <td class="px-4 py-2 text-sm text-gray-900">
                                                {{ paymentMethodLabel(payment.payment_method) }}
                                                <div v-if="payment.bank_account" class="text-xs text-gray-500">
                                                    {{ payment.bank_account.bank_name }} - {{ payment.bank_account.account_number }}
                                                </div>
                                            </td>
                                            <td class="px-4 py-2 text-sm text-gray-900 text-right">{{ formatCurrency(payment.amount) }}</td>
                                            <td class="px-4 py-2 text-sm text-gray-900 text-right">
                                                <div>{{ formatCurrency(payment.adjustment_amount) }}</div>
                                                <div class="text-xs text-gray-500">{{ adjustmentLabel(payment.adjustment_type) }}</div>
                                            </td>
                                            <td class="px-4 py-2 text-sm text-gray-600">
                                                {{ payment.notes || '-' }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div v-else class="text-sm text-gray-500">No payments recorded yet.</div>

                            <form v-if="canRecordPayment" @submit.prevent="recordPayment" class="space-y-4 border-t border-gray-200 pt-4">
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Payment Date</label>
                                        <input
                                            v-model="paymentForm.payment_date"
                                            type="date"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                                        <select
                                            v-model="paymentForm.payment_method"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                                            required
                                        >
                                            <option value="bank">Bank Transfer</option>
                                            <option value="petty_cash">Petty Cash</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Payment Amount</label>
                                        <input
                                            v-model="paymentForm.amount"
                                            type="number"
                                            step="0.01"
                                            min="0.01"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                                            required
                                        />
                                    </div>
                                </div>

                                <div v-if="paymentForm.payment_method === 'bank'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
                                        <select
                                            v-model="paymentForm.bank_account_id"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                                            required
                                        >
                                            <option value="">Select Bank Account</option>
                                            <option v-for="bank in bankOptions" :key="bank.id" :value="bank.id">
                                                {{ bank.bank_name }} - {{ bank.account_number }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Adjustment</label>
                                        <div class="flex space-x-2">
                                            <input
                                                v-model="paymentForm.adjustment_amount"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                                            />
                                            <select
                                                v-model="paymentForm.adjustment_type"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                                            >
                                                <option value="">-</option>
                                                <option value="tax_expense">Tax Expense</option>
                                                <option value="other_expense">Other Expense</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                        <textarea
                                            v-model="paymentForm.notes"
                                            rows="2"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                                        ></textarea>
                                    </div>
                                </div>

                                <div class="flex justify-end">
                                    <button
                                        type="submit"
                                        class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        :disabled="isPaymentDisabled"
                                    >
                                        Record Payment
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Actions</h3>
                        <div class="flex flex-wrap gap-3">
                            <button
                                v-if="!otherIncome.posted_to_profit_loss"
                                @click="postToProfitLoss"
                                class="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 transition"
                            >
                                <CheckCircle class="w-4 h-4 mr-2" />
                                Post to Profit & Loss
                            </button>
                            <button
                                v-if="otherIncome.posted_to_profit_loss"
                                @click="unpostFromProfitLoss"
                                class="inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 transition"
                            >
                                <XCircle class="w-4 h-4 mr-2" />
                                Unpost from Profit & Loss
                            </button>
                            <button
                                v-if="!otherIncome.posted_to_profit_loss"
                                @click="deleteIncome"
                                class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 transition"
                            >
                                <Trash2 class="w-4 h-4 mr-2" />
                                Delete Income
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { Head, Link, useForm, router } from '@inertiajs/vue3'
import { computed, watch, reactive } from 'vue'
import {
    ArrowLeft,
    Edit,
    Calendar,
    Tag,
    FileText,
    DollarSign,
    MessageSquare,
    Paperclip,
    CheckCircle,
    Clock,
    XCircle,
    Trash2
} from 'lucide-vue-next'
import AlertDialog from '@/Components/AlertDialog.vue'

const props = defineProps({
    otherIncome: Object,
    bankAccounts: {
        type: Array,
        default: () => [],
    },
})

const paymentForm = useForm({
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'bank',
    bank_account_id: '',
    amount: '',
    adjustment_amount: '',
    adjustment_type: '',
    notes: '',
})

const bankOptions = computed(() => props.bankAccounts ?? [])
const outstandingAmount = computed(() => Number(props.otherIncome.outstanding_amount || 0))
const canRecordPayment = computed(() => outstandingAmount.value > 0)
const isPaymentDisabled = computed(() => {
    if (paymentForm.processing) return true
    if (!paymentForm.payment_date || !paymentForm.payment_method || !paymentForm.amount) return true
    if (paymentForm.payment_method === 'bank' && !paymentForm.bank_account_id) return true
    if (parseFloat(paymentForm.amount) <= 0) return true
    return false
})

// Alert dialog
const alertDialog = reactive({
    show: false,
    type: 'confirm',
    title: '',
    message: '',
    onConfirm: null,
})

const openConfirm = (message, onConfirm, title = 'Confirmation') => {
    alertDialog.show = true
    alertDialog.type = 'confirm'
    alertDialog.title = title
    alertDialog.message = message
    alertDialog.onConfirm = onConfirm
}

const closeAlert = () => {
    alertDialog.show = false
    alertDialog.onConfirm = null
}

const handleAlertConfirm = () => {
    if (alertDialog.onConfirm) {
        alertDialog.onConfirm()
    }
    closeAlert()
}

watch(
    () => paymentForm.payment_method,
    (method) => {
        if (method !== 'bank') {
            paymentForm.bank_account_id = ''
        }
    }
)

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(amount || 0)
}

const formatStatus = (status) => {
    if (!status) return '-'
    return status.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const receivableStatusBadge = (status) => {
    switch (status) {
        case 'paid':
            return 'bg-green-100 text-green-800'
        case 'partial':
            return 'bg-blue-100 text-blue-800'
        default:
            return 'bg-yellow-100 text-yellow-800'
    }
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const formatDateTime = (dateTime) => {
    if (!dateTime) return '-'
    return new Date(dateTime).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const getCategoryBadge = (category) => {
    const badges = {
        'Bunga Bank Mandiri': 'bg-blue-100 text-blue-800',
        'Bunga Bank BCA': 'bg-purple-100 text-purple-800',
        'Lainnya': 'bg-gray-100 text-gray-800'
    }
    return badges[category] || 'bg-gray-100 text-gray-800'
}

const recordPayment = () => {
    const amount = parseFloat(paymentForm.amount || 0)
    const adj = parseFloat(paymentForm.adjustment_amount || 0)
    if (amount + adj - 0.01 > outstandingAmount.value) {
        openConfirm(
            'Total payment + adjustment exceeds outstanding. Please review the amounts.',
            () => closeAlert(),
            'Payment Validation'
        )
        return
    }

    paymentForm.post(route('admin-keuangan.other-incomes.record-payment', props.otherIncome.id), {
        preserveScroll: true,
        onSuccess: () => {
            paymentForm.reset({
                payment_date: new Date().toISOString().split('T')[0],
                payment_method: 'bank',
                bank_account_id: '',
                amount: '',
                adjustment_amount: '',
                adjustment_type: '',
                notes: '',
            })
        },
    })
}

const postToProfitLoss = () => {
    openConfirm(
        'Post this income to Profit & Loss?',
        () => router.post(route('admin-keuangan.other-incomes.post-to-profit-loss', props.otherIncome.id))
    )
}

const unpostFromProfitLoss = () => {
    openConfirm(
        'Unpost this income from Profit & Loss?',
        () => router.post(route('admin-keuangan.other-incomes.unpost-from-profit-loss', props.otherIncome.id))
    )
}

const deleteIncome = () => {
    openConfirm(
        'Are you sure you want to delete this income?',
        () => router.delete(route('admin-keuangan.other-incomes.destroy', props.otherIncome.id)),
        'Delete Income'
    )
}

const paymentMethodLabel = (method) => {
    return method === 'petty_cash' ? 'Petty Cash' : 'Bank Transfer'
}

const adjustmentLabel = (type) => {
    if (type === 'tax_expense') return 'Tax Expense'
    if (type === 'other_expense') return 'Other Expense'
    return '-'
}
</script>
