<template>
    <AdminKeuanganLayout>

        <Head title="Detail Piutang" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <div class="flex items-center space-x-3">
                        <button @click="goBack" class="text-gray-400 hover:text-gray-600">
                            <ArrowLeft class="w-6 h-6" />
                        </button>
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">Detail Piutang</h1>
                            <p class="mt-1 text-sm text-gray-600">Invoice {{ receivable.invoice_number }}</p>
                        </div>
                    </div>

                    <div class="flex items-center space-x-3">
                        <span :class="getStatusClass(receivable.status)"
                            class="inline-flex px-3 py-1 text-sm font-semibold rounded-full">
                            {{ getStatusText(receivable.status) }}
                            <span v-if="receivable.days_overdue > 0" class="ml-1">
                                ({{ receivable.days_overdue }} hari overdue)
                            </span>
                        </span>

                        <button v-if="receivable.status !== 'paid'" @click="openPaymentModal"
                            class="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            <CreditCard class="w-4 h-4 mr-2" />
                            Record Payment
                        </button>

                        <button v-if="receivable.customer" @click="generateSOA"
                            class="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            <FileText class="w-4 h-4 mr-2" />
                            Generate SOA
                        </button>
                    </div>
                </div>

                <!-- Invoice Information -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Informasi Invoice</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div class="space-y-3">
                                    <div>
                                        <label class="text-sm font-medium text-gray-500">Invoice Number</label>
                                        <p class="text-sm text-gray-900">{{ receivable.invoice_number }}</p>
                                    </div>
                                    <div>
                                        <label class="text-sm font-medium text-gray-500">Invoice Date</label>
                                        <p class="text-sm text-gray-900">{{ formatDate(receivable.invoice_date) }}</p>
                                    </div>
                                    <div v-if="receivable.due_date">
                                        <label class="text-sm font-medium text-gray-500">Due Date</label>
                                        <p class="text-sm text-gray-900">{{ formatDate(receivable.due_date) }}</p>
                                    </div>
                                    <div v-if="receivable.payment_terms_days">
                                        <label class="text-sm font-medium text-gray-500">Payment Terms</label>
                                        <p class="text-sm text-gray-900">{{ receivable.payment_terms_days }} hari</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="space-y-3">
                                    <div>
                                        <label class="text-sm font-medium text-gray-500">SO Number</label>
                                        <p class="text-sm text-gray-900">{{ receivable.sales_order?.order_number || '-' }}</p>
                                    </div>
                                    <div v-if="receivable.last_payment_date">
                                        <label class="text-sm font-medium text-gray-500">Last Payment</label>
                                        <p class="text-sm text-gray-900">{{ formatDateTime(receivable.last_payment_date) }}</p>
                                    </div>
                                    <div v-if="receivable.creator">
                                        <label class="text-sm font-medium text-gray-500">Created By</label>
                                        <p class="text-sm text-gray-900">{{ receivable.creator.name }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Customer Information -->
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Informasi Customer</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div class="space-y-3">
                                    <div>
                                        <label class="text-sm font-medium text-gray-500">Company Name</label>
                                        <p class="text-sm text-gray-900">
                                            {{ receivable.customer?.company_name || receivable.customer_name }}
                                        </p>
                                    </div>
                                    <div v-if="receivable.customer?.address">
                                        <label class="text-sm font-medium text-gray-500">Address</label>
                                        <p class="text-sm text-gray-900">{{ receivable.customer.address }}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="space-y-3">
                                    <div v-if="receivable.customer?.pic_name">
                                        <label class="text-sm font-medium text-gray-500">PIC Name</label>
                                        <p class="text-sm text-gray-900">{{ receivable.customer.pic_name }}</p>
                                    </div>
                                    <div v-if="receivable.customer?.pic_phone">
                                        <label class="text-sm font-medium text-gray-500">PIC Phone</label>
                                        <p class="text-sm text-gray-900">{{ receivable.customer.pic_phone }}</p>
                                    </div>
                                    <div v-if="receivable.customer?.pic_email">
                                        <label class="text-sm font-medium text-gray-500">PIC Email</label>
                                        <p class="text-sm text-gray-900">{{ receivable.customer.pic_email }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Financial Summary -->
                    <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Ringkasan Keuangan</h2>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <div class="text-sm font-medium text-blue-600 mb-1">Invoice Amount</div>
                                <div class="text-xl font-bold text-blue-900">
                                    Rp {{ formatNumber(receivable.invoice_amount) }}
                                </div>
                            </div>
                            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div class="text-sm font-medium text-green-600 mb-1">Paid Amount</div>
                                <div class="text-xl font-bold text-green-900">
                                    Rp {{ formatNumber(receivable.paid_amount) }}
                                </div>
                            </div>
                            <div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                                <div class="text-sm font-medium text-yellow-600 mb-1">Outstanding Amount</div>
                                <div class="text-xl font-bold text-yellow-900">
                                    Rp {{ formatNumber(receivable.outstanding_amount) }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Notes -->
                    <div v-if="receivable.notes" class="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
                        <div class="bg-gray-50 p-4 rounded-md">
                            <p class="text-sm text-gray-700 whitespace-pre-line">{{ receivable.notes }}</p>
                        </div>
                    </div>

                    <!-- Related Invoice -->
                    <div v-if="receivable.invoice" class="bg-white rounded-lg shadow-sm p-6">
                        <h2 class="text-lg font-semibold text-gray-900 mb-4">Related Invoice</h2>
                        <div class="border border-gray-200 rounded-lg p-4">
                            <div class="flex justify-between items-center">
                                <div>
                                    <p class="font-medium text-gray-900">{{ receivable.invoice.invoice_number }}</p>
                                    <p class="text-sm text-gray-500">{{ formatDate(receivable.invoice.invoice_date) }}
                                    </p>
                                </div>
                                <div class="text-right">
                                    <p class="font-medium text-gray-900">Rp {{ formatNumber(receivable.invoice.total) }}
                                    </p>
                                    <span :class="getInvoiceStatusClass(receivable.invoice.status)"
                                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                        {{ receivable.invoice.status }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Payment Modal -->
                <div v-if="showPaymentModal"
                    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div class="mt-3">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Record Payment</h3>
                            <div class="mb-4 bg-gray-50 p-3 rounded-md">
                                <p class="text-sm text-gray-600">Invoice: {{ receivable.invoice_number }}</p>
                                <p class="text-sm text-gray-600">Outstanding: Rp {{
                                    formatNumber(receivable.outstanding_amount) }}</p>
                            </div>
                            <form @submit.prevent="recordPayment">
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                                    <input v-model="paymentForm.amount" type="text"
                                        @input="formatAmountInput"
                                        @blur="validateAmount"
                                        required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Enter payment amount (e.g., 2500 or 2.500)" />
                                    <p v-if="amountError" class="mt-1 text-sm text-red-600">{{ amountError }}</p>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
                                    <input v-model="paymentForm.payment_date" type="date" required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                                    <textarea v-model="paymentForm.notes" rows="3"
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Payment notes (optional)"></textarea>
                                </div>
                                <div class="flex justify-end space-x-3">
                                    <button type="button" @click="closePaymentModal"
                                        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        Cancel
                                    </button>
                                    <button type="submit" :disabled="processing"
                                        class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50">
                                        {{ processing ? 'Recording...' : 'Record Payment' }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { router, Head } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { ArrowLeft, CreditCard, FileText } from 'lucide-vue-next'

const props = defineProps({
    receivable: Object
})

const showPaymentModal = ref(false)
const processing = ref(false)
const amountError = ref('')

const paymentForm = reactive({
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    notes: ''
})

const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID').format(number || 0)
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}

const formatDateTime = (datetime) => {
    return new Date(datetime).toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const getStatusClass = (status) => {
    const classes = {
        outstanding: 'bg-yellow-100 text-yellow-800',
        partial: 'bg-blue-100 text-blue-800',
        overdue: 'bg-red-100 text-red-800',
        paid: 'bg-green-100 text-green-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
    const texts = {
        outstanding: 'Outstanding',
        partial: 'Partial Payment',
        overdue: 'Overdue',
        paid: 'Paid'
    }
    return texts[status] || status
}

const getInvoiceStatusClass = (status) => {
    const classes = {
        draft: 'bg-gray-100 text-gray-800',
        sent: 'bg-blue-100 text-blue-800',
        paid: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
}

const goBack = () => {
    router.visit(route('admin-keuangan.account-receivables.index'))
}

const openPaymentModal = () => {
    paymentForm.amount = ''
    paymentForm.notes = ''
    amountError.value = ''
    showPaymentModal.value = true
}

const closePaymentModal = () => {
    showPaymentModal.value = false
    amountError.value = ''
}

// Format amount input to handle Indonesian number format
const formatAmountInput = (event) => {
    amountError.value = ''
    let value = event.target.value

    // Remove any non-numeric characters except dots and commas
    value = value.replace(/[^\d.,]/g, '')

    // Handle Indonesian format (2.500,50) or standard format (2500.50)
    // Allow both formats during typing
    paymentForm.amount = value
}

// Validate and normalize amount when user leaves input
const validateAmount = () => {
    let value = paymentForm.amount.toString().trim()

    if (!value) {
        amountError.value = 'Amount is required'
        return
    }

    // Convert Indonesian format to standard format
    // Indonesian: 2.500,50 -> Standard: 2500.50
    // Indonesian: 2.500 -> Standard: 2500
    let normalizedValue = value

    // Check if it's Indonesian format (contains dots as thousand separator)
    if (value.includes('.') && value.includes(',')) {
        // Format: 2.500,50 (dot = thousand separator, comma = decimal)
        normalizedValue = value.replace(/\./g, '').replace(',', '.')
    } else if (value.includes('.') && !value.includes(',')) {
        // Could be: 2.500 (thousand) or 2500.50 (decimal)
        const parts = value.split('.')
        if (parts.length === 2) {
            // Check decimal part length and value
            const decimalPart = parts[1]
            if (decimalPart.length <= 2 && parseInt(decimalPart) < 100 && parts[0].length <= 4) {
                // Likely decimal: 2500.50 or 25.50
                normalizedValue = value
            } else {
                // Likely thousand separator: 2.500 or 12.500
                normalizedValue = value.replace(/\./g, '')
            }
        } else {
            // Multiple dots, treat as thousand separators: 1.000.500
            normalizedValue = value.replace(/\./g, '')
        }
    } else if (value.includes(',')) {
        // Format: 2500,50 (comma as decimal)
        normalizedValue = value.replace(',', '.')
    }

    const numericValue = parseFloat(normalizedValue)

    if (isNaN(numericValue) || numericValue <= 0) {
        amountError.value = 'Please enter a valid amount'
        return
    }

    if (numericValue > props.receivable.outstanding_amount) {
        amountError.value = `Amount cannot exceed outstanding balance (Rp ${formatNumber(props.receivable.outstanding_amount)})`
        return
    }

    // Update the form with normalized value for submission
    paymentForm.amount = normalizedValue
    amountError.value = ''
}

const recordPayment = () => {
    // Validate amount before submission
    validateAmount()

    if (amountError.value) {
        return // Don't submit if there's an error
    }

    processing.value = true

    router.post(
        route('admin-keuangan.account-receivables.record-payment', props.receivable.id),
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

const generateSOA = () => {
    if (!props.receivable.customer) {
        alert('Customer information not available')
        return
    }

    window.open(
        route('admin-keuangan.account-receivables.generate-soa', props.receivable.customer.id),
        '_blank'
    )
}
</script>
