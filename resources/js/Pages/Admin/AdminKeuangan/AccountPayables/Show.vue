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
        <div v-if="visibleComponents.length" class="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold text-gray-900">Rincian Komponen Hutang</h2>
                <button
                    @click="openAdditionalCostModal"
                    class="inline-flex items-center px-4 py-2 border border-red-200 text-red-700 text-sm font-medium rounded-md bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                >
                    <Plus class="w-4 h-4 mr-2" />
                    Tambah Biaya
                </button>
            </div>
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
                            <template v-for="component in visibleComponents" :key="component.id">
                            <tr>
                                <td class="px-4 py-3 text-sm text-gray-900">
                                    <div class="flex items-start gap-2">
                                        <button
                                            type="button"
                                            class="text-gray-400 hover:text-gray-600 mt-0.5"
                                            @click="toggleComponentDetails(component.id)"
                                        >
                                            <ChevronDown
                                                class="w-4 h-4 transition-transform duration-150"
                                                :class="{ 'rotate-180': isComponentOpen(component.id) }"
                                            />
                                        </button>
                                        <div>
                                            <div class="font-medium text-gray-900">
                                                {{ getComponentLabel(component.component_type) }}
                                            </div>
                                            <div class="text-xs text-gray-500">
                                                {{ component.description || 'Tidak ada deskripsi' }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-4 py-3 text-sm text-gray-900">
                                    <div>{{ component.recipient_name || '-' }}</div>
                                    <div v-if="getComponentCategory(component)" class="text-xs text-gray-500 mt-1">
                                        Kategori: {{ getComponentCategory(component) }}
                                    </div>
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
                            <tr
                                v-if="isComponentOpen(component.id)"
                                class="bg-gray-50"
                            >
                                <td colspan="6" class="px-6 py-4 text-sm text-gray-700">
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <div class="text-xs text-gray-500 uppercase tracking-wide mb-1">Kategori</div>
                                            <div class="font-medium text-gray-900">
                                                {{ getComponentCategory(component) || '-' }}
                                            </div>
                                        </div>
                                        <div>
                                            <div class="text-xs text-gray-500 uppercase tracking-wide mb-1">Vendor / Penerima</div>
                                            <div class="font-medium text-gray-900">
                                                {{ component.recipient_name || '-' }}
                                            </div>
                                        </div>
                                        <div>
                                            <div class="text-xs text-gray-500 uppercase tracking-wide mb-1">Sumber</div>
                                            <div class="font-medium text-gray-900">
                                                {{ component.related_items?.source || 'Manual' }}
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="getComponentNotes(component)" class="mt-3">
                                        <div class="text-xs text-gray-500 uppercase tracking-wide mb-1">Catatan</div>
                                        <div class="bg-white rounded-md border border-gray-200 px-3 py-2">
                                            {{ getComponentNotes(component) }}
                                        </div>
                                    </div>
                                    <div
                                        v-if="getComponentReimbursements(component).length"
                                        class="mt-4"
                                    >
                                        <div class="text-xs text-gray-500 uppercase tracking-wide mb-2">
                                            Item Reimbursement ({{ getComponentReimbursements(component).length }})
                                        </div>
                                        <div class="divide-y divide-gray-200 bg-white border border-gray-200 rounded-md">
                                            <div
                                                v-for="item in getComponentReimbursements(component)"
                                                :key="item.id"
                                                class="flex items-center justify-between px-3 py-2"
                                            >
                                                <div>
                                                    <div class="text-sm font-medium text-gray-900">{{ item.description }}</div>
                                                    <div class="text-xs text-gray-500">
                                                        Status: {{ item.status }}
                                                        <span v-if="item.invoice_number">
                                                            · Invoice {{ item.invoice_number }}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="text-sm font-semibold text-gray-900">
                                                    Rp {{ formatNumber(item.amount) }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            class="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 text-xs font-medium rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                                            @click="openAdditionalCostModal({
                                                componentType: component.component_type,
                                                categoryId: component.related_items?.category_id || '',
                                                vendorId: component.vendor_id ? String(component.vendor_id) : (payable.vendor_id ? String(payable.vendor_id) : ''),
                                                fromComponent: true
                                            })"
                                        >
                                            <Plus class="w-4 h-4 mr-1" />
                                            Tambah Biaya dari Komponen Ini
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            </template>
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
                            <p class="text-sm text-gray-600">
                                Vendor: {{ selectedComponent?.recipient_name || payable.vendor?.nama_vendor || payable.vendor_name }}
                            </p>
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
                                :max="selectedComponent ? selectedComponent.outstanding_amount : payable.outstanding_amount"
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

        <!-- Additional Cost Modal -->
        <div v-if="showAdditionalCostModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-[420px] shadow-lg rounded-md bg-white">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Tambah Biaya</h3>
                    <button @click="closeAdditionalCostModal" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <form @submit.prevent="submitAdditionalCost">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Jenis Biaya *</label>
                        <select
                            v-model="additionalCostForm.component_type"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        >
                            <option value="operational_cost">Biaya Operasional (Internal)</option>
                            <option value="reimbursement">Reimbursement (Ter-tagih)</option>
                        </select>
                        <p class="text-xs text-gray-500 mt-1">
                            Biaya operasional hanya memengaruhi profit. Reimbursement akan otomatis masuk ke invoice reimbursement.
                        </p>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi *</label>
                        <input
                            v-model="additionalCostForm.description"
                            type="text"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            placeholder="Contoh: Admin Bank"
                            required
                        />
                        <p v-if="additionalCostForm.errors.description" class="text-sm text-red-600 mt-1">
                            {{ additionalCostForm.errors.description }}
                        </p>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nominal *</label>
                        <input
                            v-model="additionalCostForm.amount"
                            type="number"
                            min="0"
                            step="0.01"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            placeholder="0"
                            required
                        />
                        <p v-if="additionalCostForm.errors.amount" class="text-sm text-red-600 mt-1">
                            {{ additionalCostForm.errors.amount }}
                        </p>
                    </div>
                    <div v-if="shouldShowCategoryField" class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Kategori Biaya *</label>
                        <select
                            v-model="additionalCostForm.category_id"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            :required="shouldShowCategoryField"
                        >
                            <option value="">-- Pilih Kategori --</option>
                            <option
                                v-for="category in operationalCostCategories"
                                :key="category.id"
                                :value="String(category.id)"
                            >
                                {{ category.name }}
                            </option>
                        </select>
                        <p v-if="additionalCostForm.errors.category_id" class="text-sm text-red-600 mt-1">
                            {{ additionalCostForm.errors.category_id }}
                        </p>
                    </div>
                    <div v-else-if="isCategoryLocked && additionalCostForm.category_id" class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Kategori Biaya</label>
                        <div class="px-3 py-2 rounded-md border border-gray-200 bg-gray-50 text-gray-700">
                            {{ getCategoryNameById(additionalCostForm.category_id) || 'Mengikuti komponen' }}
                        </div>
                        <p class="text-xs text-gray-500 mt-1">Kategori mengikuti komponen yang sedang dibuka.</p>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Vendor / Penerima</label>
                        <select
                            v-model="additionalCostForm.vendor_id"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        >
                            <option value="">-- Internal (Divisi Operational) --</option>
                            <option
                                v-for="vendor in vendors"
                                :key="vendor.id"
                                :value="String(vendor.id)"
                            >
                                {{ vendor.nama_vendor }}
                            </option>
                        </select>
                        <p v-if="additionalCostForm.errors.vendor_id" class="text-sm text-red-600 mt-1">
                            {{ additionalCostForm.errors.vendor_id }}
                        </p>
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                        <textarea
                            v-model="additionalCostForm.notes"
                            rows="3"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                            placeholder="Catatan tambahan"
                        ></textarea>
                        <p v-if="additionalCostForm.errors.notes" class="text-sm text-red-600 mt-1">
                            {{ additionalCostForm.errors.notes }}
                        </p>
                    </div>
                    <div class="flex justify-end space-x-3">
                        <button
                            type="button"
                            @click="closeAdditionalCostModal"
                            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            :disabled="additionalCostForm.processing"
                            class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                        >
                            {{ additionalCostForm.processing ? 'Menyimpan...' : 'Simpan Biaya' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { router, Head, useForm } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { ArrowLeft, CreditCard, Edit, Plus, ChevronDown } from 'lucide-vue-next'

const props = defineProps({
    payable: Object,
    bankAccounts: {
        type: Array,
        default: () => []
    },
    selectedComponentId: {
        type: [Number, String, null],
        default: null
    },
    reimbursementItems: {
        type: Array,
        default: () => []
    },
    operationalCostCategories: {
        type: Array,
        default: () => []
    },
    vendors: {
        type: Array,
        default: () => []
    }
})

const showPaymentModal = ref(false)
const showEditModal = ref(false)
const showAdditionalCostModal = ref(false)
const componentDetailsOpen = ref({})
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

const additionalCostForm = useForm({
    component_type: 'operational_cost',
    description: '',
    amount: '',
    category_id: '',
    vendor_id: props.payable.vendor_id ? String(props.payable.vendor_id) : '',
    notes: ''
})

const additionalCostContext = ref({
    componentType: 'operational_cost',
    categoryId: '',
    vendorId: props.payable.vendor_id ? String(props.payable.vendor_id) : '',
    categoryLocked: false
})

// Computed properties for components
const componentOptions = computed(() => (props.payable.components || []).map(component => ({
    ...component,
    id: Number(component.id),
    amount: parseFloat(component.amount || 0),
    paid_amount: parseFloat(component.paid_amount || 0),
    outstanding_amount: parseFloat(component.outstanding_amount || 0)
})))

const selectedComponentIdProp = computed(() => {
    if (props.selectedComponentId === null || props.selectedComponentId === undefined || props.selectedComponentId === '') {
        return null
    }
    const numeric = Number(props.selectedComponentId)
    return Number.isNaN(numeric) ? null : numeric
})

const operationalCostCategories = computed(() => props.operationalCostCategories ?? [])
const reimbursementItems = computed(() => props.reimbursementItems ?? [])
const isCategoryLocked = computed(() => additionalCostContext.value.categoryLocked)
const requiresCategory = computed(() => {
    if (additionalCostForm.component_type !== 'operational_cost') {
        return false
    }
    return !additionalCostContext.value.categoryLocked
})
const shouldShowCategoryField = computed(() => requiresCategory.value)

const visibleComponents = computed(() => {
    if (!componentOptions.value.length) {
        return []
    }

    if (selectedComponentIdProp.value) {
        const match = componentOptions.value.find(component => component.id === selectedComponentIdProp.value)
        if (match) {
            return [match]
        }
    }

    return componentOptions.value
})

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

// Initialize component selection
watch(
    () => [selectedComponentIdProp.value, componentOptions.value],
    ([selectedId, options]) => {
        if (!options.length) {
            paymentForm.component_id = ''
            return
        }

        if (selectedId && options.find(component => component.id === selectedId)) {
            paymentForm.component_id = String(selectedId)
            return
        }

        if (!paymentForm.component_id) {
            const defaultComponent = options.find(component => parseFloat(component.outstanding_amount || 0) > 0) || options[0]
            paymentForm.component_id = defaultComponent ? String(defaultComponent.id) : ''
        }
    },
    { immediate: true, deep: true }
)

watch(
    () => additionalCostForm.component_type,
    (type) => {
        if (type !== 'operational_cost') {
            additionalCostForm.category_id = ''
        }
    }
)

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

const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(number || 0)
}

const toggleComponentDetails = (id) => {
    componentDetailsOpen.value[id] = !componentDetailsOpen.value[id]
}

const isComponentOpen = (id) => !!componentDetailsOpen.value[id]

const getComponentCategory = (component) => component?.related_items?.category_name || ''

const getComponentNotes = (component) => component?.related_items?.notes || ''

const getComponentReimbursements = (component) => {
    if (!component) {
        return []
    }

    const componentId = Number(component.id)
    if (!componentId) {
        return []
    }

    return reimbursementItems.value.filter((item) => Number(item.component_id) === componentId)
}

const normalizeCurrencyInput = (value) => {
    if (value === null || value === undefined) {
        return 0
    }

    if (typeof value === 'number') {
        return value
    }

    let normalized = value.toString().trim()

    if (normalized === '') {
        return 0
    }

    if (normalized.includes('.') && normalized.includes(',')) {
        normalized = normalized.replace(/\./g, '').replace(',', '.')
    } else if (normalized.includes('.') && !normalized.includes(',')) {
        const parts = normalized.split('.')
        if (parts.length === 2) {
            const decimalPart = parts[1]
            const likelyDecimal = decimalPart.length <= 2 && Number(decimalPart) < 100
            if (!likelyDecimal) {
                normalized = normalized.replace(/\./g, '')
            }
        } else {
            normalized = normalized.replace(/\./g, '')
        }
    } else if (normalized.includes(',')) {
        normalized = normalized.replace(',', '.')
    }

    normalized = normalized.replace(/\s+/g, '')

    const parsed = parseFloat(normalized)
    return Number.isNaN(parsed) ? 0 : parsed
}

const getCategoryNameById = (id) => {
    if (!id) {
        return ''
    }
    const match = operationalCostCategories.value.find((category) => String(category.id) === String(id))
    return match ? match.name : ''
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
    const defaultComponent = visibleComponents.value.length === 1
        ? visibleComponents.value[0]
        : (componentOptions.value.find(component => parseFloat(component.outstanding_amount || 0) > 0) || componentOptions.value[0])
    paymentForm.component_id = defaultComponent ? String(defaultComponent.id) : ''
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

const resetAdditionalCostForm = () => {
    additionalCostForm.reset()
    additionalCostContext.value = {
        componentType: 'operational_cost',
        categoryId: '',
        vendorId: props.payable.vendor_id ? String(props.payable.vendor_id) : '',
        categoryLocked: false
    }
    additionalCostForm.component_type = additionalCostContext.value.componentType
    additionalCostForm.vendor_id = additionalCostContext.value.vendorId
    additionalCostForm.category_id = additionalCostContext.value.categoryId
    additionalCostForm.clearErrors()
}

const openAdditionalCostModal = (context = {}) => {
    resetAdditionalCostForm()

    const fromComponent = Boolean(context.fromComponent)
    const contextCategoryId = context.categoryId ? String(context.categoryId) : ''

    additionalCostContext.value = {
        componentType: context.componentType || 'operational_cost',
        categoryId: contextCategoryId,
        vendorId: context.vendorId
            ? String(context.vendorId)
            : (props.payable.vendor_id ? String(props.payable.vendor_id) : ''),
        categoryLocked: fromComponent
    }

    additionalCostForm.component_type = additionalCostContext.value.componentType
    additionalCostForm.category_id = additionalCostContext.value.categoryId
    additionalCostForm.vendor_id = additionalCostContext.value.vendorId

    showAdditionalCostModal.value = true
}

const closeAdditionalCostModal = () => {
    showAdditionalCostModal.value = false
    resetAdditionalCostForm()
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

const submitAdditionalCost = () => {
    additionalCostForm
        .transform((data) => ({
            ...data,
            amount: normalizeCurrencyInput(data.amount)
        }))
        .post(
        route('admin-keuangan.account-payables.components.store', props.payable.id),
        {
            preserveScroll: true,
            onSuccess: () => {
                closeAdditionalCostModal()
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
