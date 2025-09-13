<template>
    <AdminKeuanganLayout title="Detail Hutang">
        <div class="max-w-4xl mx-auto">
            <!-- Header -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center space-x-3">
                        <button
                            @click="goBack"
                            class="text-gray-400 hover:text-gray-600"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                            </svg>
                        </button>
                        <h1 class="text-2xl font-bold text-gray-900">Detail Hutang</h1>
                    </div>
                    
                    <div class="flex items-center space-x-3">
                        <span
                            :class="getStatusClass(payable.status)"
                            class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
                        >
                            {{ getStatusText(payable.status) }}
                            <span v-if="payable.days_overdue > 0" class="ml-1">
                                ({{ payable.days_overdue }} hari overdue)
                            </span>
                        </span>
                        
                        <button
                            v-if="payable.status !== 'paid'"
                            @click="openPaymentModal"
                            class="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                        >
                            Mark Payment
                        </button>
                        
                        <button
                            @click="openEditModal"
                            class="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                        >
                            Edit Details
                        </button>
                    </div>
                </div>
            </div>

            <!-- Vendor Information -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Informasi Vendor</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div class="space-y-3">
                            <div>
                                <label class="text-sm font-medium text-gray-500">Vendor Name</label>
                                <p class="text-sm text-gray-900">
                                    {{ payable.vendor?.nama_vendor || payable.vendor_name }}
                                </p>
                            </div>
                            <div v-if="payable.vendor?.alamat">
                                <label class="text-sm font-medium text-gray-500">Address</label>
                                <p class="text-sm text-gray-900">{{ payable.vendor.alamat }}</p>
                            </div>
                            <div v-if="payable.vendor_bank_account">
                                <label class="text-sm font-medium text-gray-500">Bank Account</label>
                                <p class="text-sm text-gray-900">{{ payable.vendor_bank_account }}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="space-y-3">
                            <div v-if="payable.vendor?.pic_name">
                                <label class="text-sm font-medium text-gray-500">PIC Name</label>
                                <p class="text-sm text-gray-900">{{ payable.vendor.pic_name }}</p>
                            </div>
                            <div v-if="payable.vendor?.pic_phone">
                                <label class="text-sm font-medium text-gray-500">PIC Phone</label>
                                <p class="text-sm text-gray-900">{{ payable.vendor.pic_phone }}</p>
                            </div>
                            <div v-if="payable.vendor_account_name">
                                <label class="text-sm font-medium text-gray-500">Account Name</label>
                                <p class="text-sm text-gray-900">{{ payable.vendor_account_name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Service Information -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Informasi Service</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div class="space-y-3">
                            <div>
                                <label class="text-sm font-medium text-gray-500">Service Description</label>
                                <p class="text-sm text-gray-900">{{ payable.service_description }}</p>
                            </div>
                            <div v-if="payable.vendor_invoice_number">
                                <label class="text-sm font-medium text-gray-500">Vendor Invoice Number</label>
                                <p class="text-sm text-gray-900">{{ payable.vendor_invoice_number }}</p>
                            </div>
                            <div v-if="payable.vendor_invoice_date">
                                <label class="text-sm font-medium text-gray-500">Vendor Invoice Date</label>
                                <p class="text-sm text-gray-900">{{ formatDate(payable.vendor_invoice_date) }}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="space-y-3">
                            <div v-if="payable.sales_order">
                                <label class="text-sm font-medium text-gray-500">Sales Order</label>
                                <p class="text-sm text-gray-900">{{ payable.sales_order.order_number }}</p>
                            </div>
                            <div v-if="payable.payment_due_date">
                                <label class="text-sm font-medium text-gray-500">Payment Due Date</label>
                                <p class="text-sm text-gray-900">{{ formatDate(payable.payment_due_date) }}</p>
                            </div>
                            <div v-if="payable.payment_date">
                                <label class="text-sm font-medium text-gray-500">Payment Date</label>
                                <p class="text-sm text-gray-900">{{ formatDate(payable.payment_date) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div v-if="payable.service_remarks" class="mt-4">
                    <label class="text-sm font-medium text-gray-500">Service Remarks</label>
                    <div class="mt-1 bg-gray-50 p-3 rounded-md">
                        <p class="text-sm text-gray-700 whitespace-pre-line">{{ payable.service_remarks }}</p>
                    </div>
                </div>
            </div>

            <!-- Financial Summary -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Ringkasan Keuangan</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <div class="text-sm font-medium text-blue-600 mb-1">Total Amount</div>
                        <div class="text-xl font-bold text-blue-900">
                            Rp {{ formatNumber(payable.amount) }}
                        </div>
                    </div>
                    <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div class="text-sm font-medium text-green-600 mb-1">Paid Amount</div>
                        <div class="text-xl font-bold text-green-900">
                            Rp {{ formatNumber(payable.paid_amount) }}
                        </div>
                    </div>
                    <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div class="text-sm font-medium text-red-600 mb-1">Outstanding Amount</div>
                        <div class="text-xl font-bold text-red-900">
                            Rp {{ formatNumber(payable.outstanding_amount) }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Payment Information -->
            <div v-if="payable.payment_method || payable.payment_notes" class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div v-if="payable.payment_method">
                        <label class="text-sm font-medium text-gray-500">Payment Method</label>
                        <p class="text-sm text-gray-900">{{ payable.payment_method }}</p>
                    </div>
                    <div v-if="payable.paid_by_user">
                        <label class="text-sm font-medium text-gray-500">Paid By</label>
                        <p class="text-sm text-gray-900">{{ payable.paid_by_user.name }}</p>
                    </div>
                </div>
                
                <div v-if="payable.payment_notes" class="mt-4">
                    <label class="text-sm font-medium text-gray-500">Payment Notes</label>
                    <div class="mt-1 bg-gray-50 p-3 rounded-md">
                        <p class="text-sm text-gray-700 whitespace-pre-line">{{ payable.payment_notes }}</p>
                    </div>
                </div>
            </div>

            <!-- System Information -->
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">System Information</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div class="space-y-3">
                            <div v-if="payable.creator">
                                <label class="text-sm font-medium text-gray-500">Created By</label>
                                <p class="text-sm text-gray-900">{{ payable.creator.name }}</p>
                            </div>
                            <div>
                                <label class="text-sm font-medium text-gray-500">Created At</label>
                                <p class="text-sm text-gray-900">{{ formatDateTime(payable.created_at) }}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="space-y-3">
                            <div>
                                <label class="text-sm font-medium text-gray-500">Last Updated</label>
                                <p class="text-sm text-gray-900">{{ formatDateTime(payable.updated_at) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Payment Modal -->
        <div v-if="showPaymentModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Mark Payment</h3>
                    <div class="mb-4 bg-gray-50 p-3 rounded-md">
                        <p class="text-sm text-gray-600">Vendor: {{ payable.vendor?.nama_vendor || payable.vendor_name }}</p>
                        <p class="text-sm text-gray-600">Outstanding: Rp {{ formatNumber(payable.outstanding_amount) }}</p>
                    </div>
                    <form @submit.prevent="markPayment">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                            <input
                                v-model="paymentForm.amount"
                                type="number"
                                step="0.01"
                                :max="payable.outstanding_amount"
                                required
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Enter payment amount"
                            />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
                            <select
                                v-model="paymentForm.payment_method"
                                required
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Transfer Bank">Transfer Bank</option>
                                <option value="Cash">Cash</option>
                                <option value="Check">Check</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                            <textarea
                                v-model="paymentForm.notes"
                                rows="3"
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Payment notes (optional)"
                            ></textarea>
                        </div>
                        <div class="flex justify-end space-x-3">
                            <button
                                type="button"
                                @click="closePaymentModal"
                                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                :disabled="processing"
                                class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                            >
                                {{ processing ? 'Processing...' : 'Mark Payment' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Edit Modal -->
        <div v-if="showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div class="mt-3">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Edit Vendor Invoice Details</h3>
                    <form @submit.prevent="updateDetails">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Vendor Invoice Number</label>
                            <input
                                v-model="editForm.vendor_invoice_number"
                                type="text"
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Enter vendor invoice number"
                            />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Vendor Invoice Date</label>
                            <input
                                v-model="editForm.vendor_invoice_date"
                                type="date"
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Service Remarks</label>
                            <textarea
                                v-model="editForm.service_remarks"
                                rows="3"
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Additional remarks"
                            ></textarea>
                        </div>
                        <div class="flex justify-end space-x-3">
                            <button
                                type="button"
                                @click="closeEditModal"
                                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                :disabled="processing"
                                class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                            >
                                {{ processing ? 'Updating...' : 'Update Details' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

const props = defineProps({
    payable: Object
})

const showPaymentModal = ref(false)
const showEditModal = ref(false)
const processing = ref(false)

const paymentForm = reactive({
    amount: '',
    payment_method: '',
    notes: ''
})

const editForm = reactive({
    vendor_invoice_number: props.payable.vendor_invoice_number || '',
    vendor_invoice_date: props.payable.vendor_invoice_date || '',
    service_remarks: props.payable.service_remarks || ''
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
        unpaid: 'bg-red-100 text-red-800',
        partial: 'bg-yellow-100 text-yellow-800',
        paid: 'bg-green-100 text-green-800'
    }
    return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
    const texts = {
        unpaid: 'Unpaid',
        partial: 'Partial Payment',
        paid: 'Paid'
    }
    return texts[status] || status
}

const goBack = () => {
    router.visit(route('admin-keuangan.account-payables.index'))
}

const openPaymentModal = () => {
    paymentForm.amount = ''
    paymentForm.payment_method = ''
    paymentForm.notes = ''
    showPaymentModal.value = true
}

const closePaymentModal = () => {
    showPaymentModal.value = false
}

const openEditModal = () => {
    showEditModal.value = true
}

const closeEditModal = () => {
    showEditModal.value = false
}

const markPayment = () => {
    processing.value = true
    
    router.post(
        route('admin-keuangan.account-payables.mark-as-paid', props.payable.id),
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

const updateDetails = () => {
    processing.value = true
    
    router.post(
        route('admin-keuangan.account-payables.update-vendor-invoice', props.payable.id),
        editForm,
        {
            onSuccess: () => {
                closeEditModal()
                processing.value = false
            },
            onError: () => {
                processing.value = false
            }
        }
    )
}
</script>