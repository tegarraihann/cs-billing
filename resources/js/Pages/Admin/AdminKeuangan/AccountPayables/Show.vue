<template>
    <AdminKeuanganLayout>
        <Head title="Detail Hutang" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <div class="flex items-center space-x-3">
                        <button
                            @click="goBack"
                            class="text-gray-400 hover:text-gray-600"
                        >
                            <ArrowLeft class="w-6 h-6" />
                        </button>
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">Detail Hutang</h1>
                            <p class="mt-1 text-sm text-gray-600">Vendor {{ payable.vendor?.nama_vendor }}</p>
                        </div>
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
                            class="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <CreditCard class="w-4 h-4 mr-2" />
                            Mark Payment
                        </button>

                        <button
                            @click="openEditModal"
                            class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <Edit class="w-4 h-4 mr-2" />
                            Edit Details
                        </button>
                    </div>
                </div>

                <!-- Vendor Information -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Informasi Vendor</h3>
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

            <!-- Components Breakdown -->
            <div v-if="componentOptions.length" class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 class="text-lg font-semibold text-gray-900 mb-4">Rincian Komponen Hutang</h2>
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Komponen
                                </th>
                                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Penerima
                                </th>
                                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Nilai Hutang
                                </th>
                                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Terbayar
                                </th>
                                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Outstanding
                                </th>
                                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <tr v-for="component in componentOptions" :key="component.id">
                                <td class="px-4 py-3 text-sm text-gray-900">
                                    {{ getComponentLabel(component.component_type) }}
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-900">
                                    {{ component.recipient_name || '-' }}
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-900 text-right">
                                    Rp {{ formatNumber(component.amount) }}
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-900 text-right">
                                    Rp {{ formatNumber(component.paid_amount) }}
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-900 text-right">
                                    Rp {{ formatNumber(component.outstanding_amount) }}
                                </td>
                                <td class="px-4 py-3 text-sm text-right">
                                    <span :class="getStatusClass(component.status)"
                                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                        {{ getStatusText(component.status) }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                        <p v-if="selectedComponent" class="text-sm text-gray-600">
                            Komponen: {{ getComponentLabel(selectedComponent.component_type) }}
                        </p>
                        <p class="text-sm text-gray-600">
                            Outstanding: Rp {{
                                formatNumber(
                                    selectedComponent
                                        ? selectedComponent.outstanding_amount
                                        : payable.outstanding_amount
                                )
                            }}
                        </p>
                    </div>
                    <form @submit.prevent="markPayment">
                        <div v-if="hasMultipleComponents" class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Komponen Pembayaran *</label>
                            <select
                                v-model="paymentForm.component_id"
                                required
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Pilih Komponen</option>
                                <option
                                    v-for="component in componentOptions"
                                    :key="component.id"
                                    :value="component.id"
                                >
                                    {{ getComponentLabel(component.component_type) }}
                                    - {{ component.recipient_name }}
                                    - Outstanding Rp {{ formatNumber(component.outstanding_amount) }}
                                </option>
                            </select>
                        </div>
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
                            <label class="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
                            <input
                                v-model="paymentForm.payment_date"
                                type="date"
                                required
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Bank Account *</label>
                            <select
                                v-model="paymentForm.bank_account_id"
                                required
                                class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Select Bank Account</option>
                                <option v-for="bank in bankAccounts" :key="bank.id" :value="bank.id">
                                    {{ bank.bank_name }} - {{ bank.account_number }}
                                </option>
                            </select>
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
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { router, Head } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { ArrowLeft, CreditCard, Edit } from 'lucide-vue-next'

const props = defineProps({
    payable: Object,
    bankAccounts: {
        type: Array,
        default: () => []
    }
})

const showPaymentModal = ref(false)
const showEditModal = ref(false)
const processing = ref(false)

const paymentForm = reactive({
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    bank_account_id: '',
    payment_method: '',
    notes: '',
    component_id: ''
})

const editForm = reactive({
    vendor_invoice_number: props.payable.vendor_invoice_number || '',
    vendor_invoice_date: props.payable.vendor_invoice_date || '',
    service_remarks: props.payable.service_remarks || ''
})

// Computed properties for components
const componentOptions = computed(() => (props.payable.components || []).map(component => ({
    ...component,
    id: Number(component.id),
    amount: parseFloat(component.amount || 0),
    paid_amount: parseFloat(component.paid_amount || 0),
    outstanding_amount: parseFloat(component.outstanding_amount || 0)
})))

const hasMultipleComponents = computed(() => componentOptions.value.length > 1)

const selectedComponent = computed(() => {
    const id = paymentForm.component_id ? Number(paymentForm.component_id) : null
    if (!id && componentOptions.value.length === 1) {
        return componentOptions.value[0]
    }
    return componentOptions.value.find(component => component.id === id) || null
})

// Watch for component selection
watch(() => paymentForm.component_id, () => {
    if (hasMultipleComponents.value && !paymentForm.component_id) {
        paymentForm.amount = ''
    }
})

// Initialize component_id
watch(componentOptions, (options) => {
    if (!showPaymentModal.value) {
        return
    }

    if (!options.length) {
        paymentForm.component_id = ''
        return
    }

    const currentId = paymentForm.component_id ? Number(paymentForm.component_id) : null

    if (!currentId || !options.find(component => component.id === currentId)) {
        const defaultComponent = options.find(component => parseFloat(component.outstanding_amount || 0) > 0) || options[0]
        paymentForm.component_id = defaultComponent ? String(defaultComponent.id) : ''
    }
}, { immediate: true })

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

const getComponentLabel = (type) => {
    const labels = {
        'vendor_payment': 'Pembayaran Vendor',
        'operational_cost': 'Biaya Operational',
        'reimbursement': 'Reimbursement'
    }
    return labels[type] || type
}

const goBack = () => {
    router.visit(route('admin-keuangan.account-payables.index'))
}

const openPaymentModal = () => {
    paymentForm.amount = ''
    paymentForm.bank_account_id = ''
    paymentForm.payment_method = ''
    paymentForm.notes = ''
    paymentForm.component_id = hasMultipleComponents.value
        ? ''
        : (componentOptions.value[0] ? String(componentOptions.value[0].id) : '')
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