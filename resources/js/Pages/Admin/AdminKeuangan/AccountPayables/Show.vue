<template>
    <AdminKeuanganLayout>

        <Head title="Detail Hutang" />

        <AlertDialog :show="alertDialog.show" :type="alertDialog.type" :title="alertDialog.title"
            :message="alertDialog.message" :confirm-text="alertDialog.confirmText" :cancel-text="alertDialog.cancelText"
            @confirm="handleAlertConfirm" @close="closeAlert" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="flex justify-between items-center mb-6">
                    <div class="flex flex-wrap items-center justify-end gap-2">
                        <button @click="goBack" class="text-gray-400 hover:text-gray-600">
                            <ArrowLeft class="w-6 h-6" />
                        </button>
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">Detail Hutang</h1>
                            <p class="mt-1 text-sm text-gray-600">{{ headerSubtitle }}</p>
                        </div>
                    </div>

                    <div class="flex items-center space-x-3">
                        <span :class="getStatusClass(summaryStatus)"
                            class="inline-flex px-3 py-1 text-sm font-semibold rounded-full">
                            {{ getStatusText(summaryStatus) }}
                            <span v-if="overdueDays > 0" class="ml-1">
                                ({{ overdueDays }} hari overdue)
                            </span>
                        </span>

                        <button v-if="summary.total_outstanding > 0" @click="openPaymentModal"
                            class="inline-flex items-center justify-center px-4 py-2 min-w-[170px] bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wider hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            <CreditCard class="w-4 h-4 mr-2" />
                            Mark Payment
                        </button>

                        <button @click="openEditModal"
                            class="inline-flex items-center justify-center px-4 py-2 min-w-[170px] bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-wider hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150">
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
                                        <p class="text-sm text-gray-900">{{ formatDate(payable.vendor_invoice_date) }}
                                        </p>
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
                                    Rp {{ formatNumber(summary.total_amount) }}
                                </div>
                            </div>
                            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                                <div class="text-sm font-medium text-green-600 mb-1">Paid Amount</div>
                                <div class="text-xl font-bold text-green-900">
                                    Rp {{ formatNumber(summary.total_paid) }}
                                </div>
                            </div>
                            <div class="bg-red-50 p-4 rounded-lg border border-red-200">
                                <div class="text-sm font-medium text-red-600 mb-1">Outstanding Amount</div>
                                <div class="text-xl font-bold text-red-900">
                                    Rp {{ formatNumber(summary.total_outstanding) }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Components Breakdown -->
                    <div v-if="visibleComponents.length" class="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                            <div>
                                <h2 class="text-lg font-semibold text-gray-900">Rincian Komponen Hutang</h2>
                                <p class="text-sm text-gray-500">Semua komponen biaya (main invoice, reimbursement,
                                    operasional) ditampilkan di tabel ini.</p>
                            </div>
                            <button @click="openAdditionalCostModal"
                                class="inline-flex items-center px-4 py-2 border border-red-200 text-red-700 text-sm font-medium rounded-md bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition">
                                <Plus class="w-4 h-4 mr-2" />
                                Tambah Biaya
                            </button>
                        </div>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Komponen
                                        </th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th
                                            class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Penerima
                                        </th>
                                        <th
                                            class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nilai Hutang
                                        </th>
                                        <th
                                            class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Terbayar
                                        </th>
                                        <th
                                            class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Outstanding
                                        </th>
                                        <th
                                            class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th
                                            class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <template v-for="component in visibleComponents" :key="component.id">
                                        <tr>
                                            <td class="px-4 py-3 text-sm text-gray-900">
                                                <div class="font-medium text-gray-900">
                                                    {{ component.description || 'Tidak ada deskripsi' }}
                                                </div>
                                            </td>
                                            <td class="px-4 py-3 text-sm text-gray-900">
                                                {{ getComponentCategory(component) || '-' }}
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
                                            <td class="px-4 py-3 text-sm text-right">
                                                <div v-if="hasVatActions(component)"
                                                    class="relative inline-flex justify-end w-full" @click.stop>
                                                    <button type="button"
                                                        class="inline-flex items-center justify-center rounded-md border border-sage-300 bg-white px-2.5 py-2 text-sage-700 hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition"
                                                        @click.stop="toggleVatMenu(component.id)"
                                                        aria-label="VAT actions">
                                                        <MoreVertical class="h-4 w-4" />
                                                    </button>
                                                    <div v-if="isVatMenuOpen(component.id)"
                                                        class="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                                                        @click.stop>
                                                        <div class="py-1">
                                                            <button v-if="canPostVatForComponent(component)"
                                                                type="button"
                                                                class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                :disabled="isPostingVat"
                                                                @click="handleVatAction(postVatPayable11)">
                                                                Post VAT Payable 11%
                                                            </button>
                                                            <button v-if="canPostVatForComponent(component)"
                                                                type="button"
                                                                class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                :disabled="isPostingVat"
                                                                @click="handleVatAction(postVatPayable11_1)">
                                                                Post VAT Payable 1.1%
                                                            </button>
                                                            <button v-if="canPostVatForComponent(component)"
                                                                type="button"
                                                                class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                :disabled="isPostingVat"
                                                                @click="handleVatAction(postPph23Payable05)">
                                                                Post VAT Payable PPh23 0.5%
                                                            </button>
                                                            <button v-if="canPostVatForComponent(component)"
                                                                type="button"
                                                                class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                                :disabled="isPostingVat"
                                                                @click="handleVatAction(postPph23Payable2)">
                                                                Post VAT Payable PPh23 2%
                                                            </button>
                                                            <div class="my-1 border-t border-gray-100"></div>
                                                            <button type="button"
                                                                class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                :disabled="isPostingVat || !canPostVatReceivable"
                                                                @click="canPostVatReceivable && handleVatAction(postVatReceivable11)">
                                                                Post VAT Receivable 11%
                                                            </button>
                                                            <button type="button"
                                                                class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                :disabled="isPostingVat || !canPostVatReceivable"
                                                                @click="canPostVatReceivable && handleVatAction(postVatReceivable11_1)">
                                                                Post VAT Receivable 1.1%
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span v-else class="text-gray-400">-</span>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Payment Information -->
                    <div v-if="payable.payment_method || payable.payment_notes"
                        class="bg-white rounded-lg shadow-sm p-6 mb-6">
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
                <div v-if="showPaymentModal"
                    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div class="mt-3">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Mark Payment</h3>
                            <div class="mb-4 bg-gray-50 p-3 rounded-md">
                                <p class="text-sm text-gray-600">
                                    Vendor: {{ selectedComponent?.recipient_name || payable.vendor?.nama_vendor ||
                                    payable.vendor_name
                                    }}
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
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Komponen Pembayaran
                                        *</label>
                                    <select v-model="paymentForm.component_id" required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        :class="paymentForm.errors.component_id ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'">
                                        <option value="">Pilih Komponen</option>
                                        <option v-for="component in payableComponentOptions" :key="component.id"
                                            :value="component.id">
                                            {{ getComponentLabel(component.component_type) }}
                                            - {{ component.recipient_name }}
                                            - Outstanding Rp {{ formatNumber(component.outstanding_amount) }}
                                        </option>
                                    </select>
                                    <p v-if="paymentForm.errors.component_id" class="text-sm text-red-600 mt-1">
                                        {{ paymentForm.errors.component_id }}
                                    </p>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
                                    <input v-model="paymentForm.amount" type="text" inputmode="decimal" required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        :class="paymentForm.errors.amount ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'"
                                        placeholder="Masukkan nominal pembayaran (mis. 120000 atau 120.000)" />
                                    <p v-if="paymentForm.errors.amount" class="text-sm text-red-600 mt-1">
                                        {{ paymentForm.errors.amount }}
                                    </p>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
                                    <input v-model="paymentForm.payment_date" type="date" required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        :class="paymentForm.errors.payment_date ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'" />
                                    <p v-if="paymentForm.errors.payment_date" class="text-sm text-red-600 mt-1">
                                        {{ paymentForm.errors.payment_date }}
                                    </p>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Sumber Pembayaran
                                        *</label>
                                    <select v-model="paymentForm.payment_source" required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        :class="paymentForm.errors.payment_source ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'">
                                        <option value="bank">Bank</option>
                                        <option value="petty_cash">Petty Cash</option>
                                    </select>
                                    <p v-if="paymentForm.errors.payment_source" class="text-sm text-red-600 mt-1">
                                        {{ paymentForm.errors.payment_source }}
                                    </p>
                                </div>
                                <div class="mb-4" v-if="paymentForm.payment_source === 'bank'">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Bank Account *</label>
                                    <select v-model="paymentForm.bank_account_id"
                                        :required="paymentForm.payment_source === 'bank'"
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        :class="paymentForm.errors.bank_account_id ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'">
                                        <option value="">Select Bank Account</option>
                                        <option v-for="bank in bankAccounts" :key="bank.id" :value="bank.id">
                                            {{ bank.bank_name }} - {{ bank.account_number }}
                                        </option>
                                    </select>
                                    <p v-if="paymentForm.errors.bank_account_id" class="text-sm text-red-600 mt-1">
                                        {{ paymentForm.errors.bank_account_id }}
                                    </p>
                                </div>
                                <div class="mb-4" v-if="paymentForm.payment_source === 'petty_cash'">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Kategori Petty Cash
                                        *</label>
                                    <select v-model="paymentForm.petty_cash_category_id"
                                        :required="paymentForm.payment_source === 'petty_cash'"
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        :class="paymentForm.errors.petty_cash_category_id ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'">
                                        <option value="">Pilih Kategori</option>
                                        <option v-for="category in pettyCashCategories" :key="category.id"
                                            :value="category.id">
                                            {{ category.name }}
                                        </option>
                                    </select>
                                    <p v-if="paymentForm.errors.petty_cash_category_id"
                                        class="text-sm text-red-600 mt-1">
                                        {{ paymentForm.errors.petty_cash_category_id }}
                                    </p>
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
                                    <select v-model="paymentForm.payment_method" required
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        :class="paymentForm.errors.payment_method ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'">
                                        <option value="">Select Payment Method</option>
                                        <option value="Transfer Bank">Transfer Bank</option>
                                        <option value="Cash">Cash</option>
                                        <option value="Check">Check</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <p v-if="paymentForm.errors.payment_method" class="text-sm text-red-600 mt-1">
                                        {{ paymentForm.errors.payment_method }}
                                    </p>
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
                                        {{ processing ? 'Processing...' : 'Mark Payment' }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Edit Modal -->
                <div v-if="showEditModal"
                    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div class="mt-3">
                            <h3 class="text-lg font-medium text-gray-900 mb-4">Edit Vendor Invoice Details</h3>
                            <form @submit.prevent="updateDetails">
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Vendor Invoice
                                        Number</label>
                                    <input v-model="editForm.vendor_invoice_number" type="text"
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Enter vendor invoice number" />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Vendor Invoice
                                        Date</label>
                                    <input v-model="editForm.vendor_invoice_date" type="date"
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Service Remarks</label>
                                    <textarea v-model="editForm.service_remarks" rows="3"
                                        class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Additional remarks"></textarea>
                                </div>
                                <div class="flex justify-end space-x-3">
                                    <button type="button" @click="closeEditModal"
                                        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        Cancel
                                    </button>
                                    <button type="submit" :disabled="processing"
                                        class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50">
                                        {{ processing ? 'Updating...' : 'Update Details' }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Additional Cost Modal -->
                <div v-if="showAdditionalCostModal"
                    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div class="relative top-20 mx-auto p-5 border w-[420px] shadow-lg rounded-md bg-white">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-medium text-gray-900">Tambah Biaya</h3>
                            <button @click="closeAdditionalCostModal"
                                class="text-gray-400 hover:text-gray-600">&times;</button>
                        </div>
                        <form @submit.prevent="submitAdditionalCost">
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Jenis Biaya *</label>
                                <select v-model="additionalCostForm.component_type"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                                    <option value="operational_cost">Biaya Operasional (Internal)</option>
                                    <option value="reimbursement">Reimbursement (Ter-tagih)</option>
                                    <option value="vat_reimbursement">VAT Reimbursement Vendor</option>
                                </select>
                                <p class="text-xs text-gray-500 mt-1">
                                    Biaya operasional hanya memengaruhi profit. Reimbursement akan otomatis masuk ke
                                    invoice reimbursement. VAT reimbursement tidak masuk invoice customer dan akan
                                    dipost ke Financial Position setelah hutang paid.
                                </p>
                            </div>
                            <div v-if="shouldShowVatRateField" class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-1">VAT Rate *</label>
                                <select v-model="additionalCostForm.vat_rate"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    :required="shouldShowVatRateField">
                                    <option value="">-- Pilih VAT Rate --</option>
                                    <option value="11">11%</option>
                                    <option value="1.1">1.1%</option>
                                </select>
                                <p v-if="additionalCostForm.errors.vat_rate" class="text-sm text-red-600 mt-1">
                                    {{ additionalCostForm.errors.vat_rate }}
                                </p>
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi *</label>
                                <input v-model="additionalCostForm.description" type="text"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    placeholder="Contoh: Admin Bank" required />
                                <p v-if="additionalCostForm.errors.description" class="text-sm text-red-600 mt-1">
                                    {{ additionalCostForm.errors.description }}
                                </p>
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Nominal *</label>
                                <input v-model="additionalCostForm.amount" type="number" min="0" step="0.01"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    placeholder="0" required />
                                <p v-if="additionalCostForm.errors.amount" class="text-sm text-red-600 mt-1">
                                    {{ additionalCostForm.errors.amount }}
                                </p>
                            </div>
                            <div v-if="shouldShowCategoryField" class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Kategori Biaya *</label>
                                <select v-model="additionalCostForm.category_id"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    :required="shouldShowCategoryField">
                                    <option value="">-- Pilih Kategori --</option>
                                    <option v-for="category in operationalCostCategories" :key="category.id"
                                        :value="String(category.id)">
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
                                <p class="text-xs text-gray-500 mt-1">Kategori mengikuti komponen yang sedang dibuka.
                                </p>
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Vendor / Penerima</label>
                                <select v-model="additionalCostForm.vendor_id"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
                                    <option value="">-- Internal (Divisi Operational) --</option>
                                    <option v-for="vendor in vendors" :key="vendor.id" :value="String(vendor.id)">
                                        {{ vendor.nama_vendor }}
                                    </option>
                                </select>
                                <p v-if="additionalCostForm.errors.vendor_id" class="text-sm text-red-600 mt-1">
                                    {{ additionalCostForm.errors.vendor_id }}
                                </p>
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                                <textarea v-model="additionalCostForm.notes" rows="3"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                                    placeholder="Catatan tambahan"></textarea>
                                <p v-if="additionalCostForm.errors.notes" class="text-sm text-red-600 mt-1">
                                    {{ additionalCostForm.errors.notes }}
                                </p>
                            </div>
                            <div class="flex justify-end space-x-3">
                                <button type="button" @click="closeAdditionalCostModal"
                                    class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Batal
                                </button>
                                <button type="submit" :disabled="additionalCostForm.processing"
                                    class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50">
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
import { ref, reactive, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { router, Head, useForm } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { ArrowLeft, CreditCard, Edit, Plus, MoreVertical } from 'lucide-vue-next'
import AlertDialog from '@/Components/AlertDialog.vue'

const props = defineProps({
    payable: Object,
    groupSummary: {
        type: Object,
        default: () => null
    },
    groupPayables: {
        type: Array,
        default: () => []
    },
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
    },
    pettyCashCategories: {
        type: Array,
        default: () => []
    }
})

const bankAccounts = computed(() => props.bankAccounts ?? [])
const pettyCashCategories = computed(() => props.pettyCashCategories ?? [])

const payables = computed(() => {
    if (Array.isArray(props.groupPayables) && props.groupPayables.length) {
        return props.groupPayables
    }
    return props.payable ? [props.payable] : []
})

const payable = computed(() => {
    if (props.payable) {
        return props.payable
    }
    return payables.value[0] || null
})

const showPaymentModal = ref(false)
const showEditModal = ref(false)
const showAdditionalCostModal = ref(false)
const processing = ref(false)
const postingVat11 = ref(false)
const postingVat11_1 = ref(false)
const postingVatReceivable11 = ref(false)
const postingVatReceivable11_1 = ref(false)
const postingPph23_05 = ref(false)
const postingPph23_2 = ref(false)

const alertDialog = reactive({
    show: false,
    type: 'confirm',
    title: '',
    message: '',
    confirmText: 'Post',
    cancelText: 'Batal',
    onConfirm: null
})

const openConfirm = (message, onConfirm, title = 'Konfirmasi') => {
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

const paymentForm = useForm({
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    payment_source: 'bank',
    bank_account_id: '',
    petty_cash_category_id: '',
    payment_method: '',
    notes: '',
    component_id: ''
})

const summary = computed(() => {
    if (props.groupSummary) {
        return {
            total_amount: props.groupSummary.total_amount ?? 0,
            total_paid: props.groupSummary.total_paid ?? 0,
            total_outstanding: props.groupSummary.total_outstanding ?? 0,
            status: props.groupSummary.status ?? null,
            sales_order: props.groupSummary.sales_order ?? null,
            invoice_numbers: props.groupSummary.invoice_numbers ?? [],
            vendor_names: props.groupSummary.vendor_names ?? [],
            due_date: props.groupSummary.due_date ?? null,
            latest_vendor_invoice_date: props.groupSummary.latest_vendor_invoice_date ?? null
        }
    }

    const current = payable.value

    return {
        total_amount: current?.amount ?? 0,
        total_paid: current?.paid_amount ?? 0,
        total_outstanding: current?.outstanding_amount ?? 0,
        status: current?.status ?? null,
        sales_order: current?.sales_order ?? null,
        invoice_numbers: current?.vendor_invoice_number ? [current.vendor_invoice_number] : [],
        vendor_names: current?.vendor_name ? [current.vendor_name] : [],
        due_date: current?.payment_due_date ?? null,
        latest_vendor_invoice_date: current?.vendor_invoice_date ?? null
    }
})

const summaryStatus = computed(() => summary.value.status ?? payable.value?.status ?? 'unpaid')
const activeVendorName = computed(() => payable.value?.vendor?.nama_vendor ?? payable.value?.vendor_name ?? '-')
const activeDaysOverdue = computed(() => payable.value?.days_overdue ?? 0)
const overdueDays = computed(() => activeDaysOverdue.value)
const canPostVat = computed(() => (summary.value.total_outstanding || 0) > 0 && summaryStatus.value !== 'paid')
const canPostVatReceivable = computed(() => {
    const outstanding = summary.value.total_outstanding ?? 0
    return summaryStatus.value === 'paid' && Number(outstanding) <= 0 && !payable.value?.vat_receivable_posted_at
})

const activeVatMenuId = ref(null)

const isPostingVat = computed(() => (
    postingVat11.value
    || postingVat11_1.value
    || postingPph23_05.value
    || postingPph23_2.value
    || postingVatReceivable11.value
    || postingVatReceivable11_1.value
))

const canPostVatForComponent = (component) => {
    const outstanding = Number(component?.outstanding_amount ?? 0)
    return canPostVat.value && outstanding > 0
}

const hasVatActions = (component) => (
    canPostVatForComponent(component) || canPostVatReceivable.value
)

const toggleVatMenu = (componentId) => {
    activeVatMenuId.value = activeVatMenuId.value === componentId ? null : componentId
}

const isVatMenuOpen = (componentId) => activeVatMenuId.value === componentId

const closeVatMenu = () => {
    activeVatMenuId.value = null
}

const handleVatAction = (action) => {
    closeVatMenu()
    action()
}

onMounted(() => {
    window.addEventListener('click', closeVatMenu)
})

onBeforeUnmount(() => {
    window.removeEventListener('click', closeVatMenu)
})

const headerSubtitle = computed(() => {
    if (summary.value.sales_order?.order_number) {
        return `SO ${summary.value.sales_order.order_number}`
    }
    if (summary.value.vendor_names?.length) {
        return `Vendor ${summary.value.vendor_names[0]}`
    }
    return `Vendor ${activeVendorName.value}`
})

const editForm = reactive({
    vendor_invoice_number: '',
    vendor_invoice_date: '',
    service_remarks: ''
})

const additionalCostForm = useForm({
    component_type: 'operational_cost',
    description: '',
    amount: '',
    category_id: '',
    vendor_id: '',
    notes: '',
    vat_rate: ''
})

const additionalCostContext = ref({
    componentType: 'operational_cost',
    categoryId: '',
    vendorId: '',
    categoryLocked: false
})

watch(payable, (current) => {
    editForm.vendor_invoice_number = current?.vendor_invoice_number || ''
    editForm.vendor_invoice_date = current?.vendor_invoice_date || ''
    editForm.service_remarks = current?.service_remarks || ''

    const vendorId = current?.vendor_id ? String(current.vendor_id) : ''
    additionalCostContext.value.vendorId = vendorId
    additionalCostForm.vendor_id = vendorId
}, { immediate: true })

// Computed properties for components
const componentOptions = computed(() => {
    const items = []

    payables.value.forEach((payableItem = {}, payableIndex) => {
        const components = Array.isArray(payableItem.components) ? payableItem.components : []
        const fallbackBase = Number(payableItem.id) || payableIndex + 1

        components.forEach((component = {}, componentIndex) => {
            // Gunakan hanya ID komponen yang valid dari database, hindari fallback agar tidak gagal validasi server
            const numericId = Number(component.id ?? component.component_id)
            if (Number.isNaN(numericId) || numericId <= 0) {
                return
            }

            items.push({
                ...component,
                parent_payable_id: payableItem.id ?? component.account_payable_id ?? null,
                parent_vendor_name: payableItem.vendor?.nama_vendor || payableItem.vendor_name || component.recipient_name || '',
                parent_invoice_number: payableItem.vendor_invoice_number || null,
                id: numericId,
                amount: parseFloat(component.amount || 0),
                paid_amount: parseFloat(component.paid_amount || 0),
                outstanding_amount: parseFloat(component.outstanding_amount || 0)
            })
        })
    })

    return items
})

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
const shouldShowVatRateField = computed(() => additionalCostForm.component_type === 'vat_reimbursement')
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

const payableComponentOptions = computed(() =>
    componentOptions.value.filter(component => parseFloat(component.outstanding_amount || 0) > 0.01)
)

const hasMultipleComponents = computed(() => payableComponentOptions.value.length > 1)

const selectedComponent = computed(() => {
    const options = payableComponentOptions.value.length ? payableComponentOptions.value : componentOptions.value
    const id = paymentForm.component_id ? Number(paymentForm.component_id) : null
    if (!id && options.length === 1) {
        return options[0]
    }
    return options.find(component => component.id === id) || null
})

// Watch for component selection
watch(() => paymentForm.component_id, () => {
    if (hasMultipleComponents.value && !paymentForm.component_id) {
        paymentForm.amount = ''
    }
})

watch(() => paymentForm.payment_source, (source) => {
    if (source === 'bank') {
        if (!paymentForm.bank_account_id && bankAccounts.value.length) {
            paymentForm.bank_account_id = String(bankAccounts.value[0].id)
        }
        paymentForm.petty_cash_category_id = ''
        if (!paymentForm.payment_method || paymentForm.payment_method === 'Petty Cash') {
            paymentForm.payment_method = 'Transfer Bank'
        }
    } else if (source === 'petty_cash') {
        paymentForm.bank_account_id = ''
        if (!paymentForm.payment_method || paymentForm.payment_method === 'Transfer Bank') {
            paymentForm.payment_method = 'Petty Cash'
        }
    }
})

// Initialize component selection
watch(
    () => [selectedComponentIdProp.value, payableComponentOptions.value, componentOptions.value],
    ([selectedId, payableOptions, allOptions]) => {
        const options = payableOptions.length ? payableOptions : allOptions
        if (!options.length) {
            paymentForm.component_id = ''
            return
        }

        if (selectedId && options.find(component => component.id === selectedId)) {
            paymentForm.component_id = String(selectedId)
            return
        }

        if (!paymentForm.component_id) {
            const defaultComponent =
                payableOptions.find(component => parseFloat(component.outstanding_amount || 0) > 0) ||
                payableOptions[0] ||
                allOptions.find(component => parseFloat(component.outstanding_amount || 0) > 0) ||
                allOptions[0]
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
        if (type !== 'vat_reimbursement') {
            additionalCostForm.vat_rate = ''
            return
        }
        if (!additionalCostForm.vat_rate) {
            additionalCostForm.vat_rate = '11'
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

const getComponentCategory = (component) => component?.related_items?.category_name || ''

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
        'reimbursement': 'Reimbursement',
        'vat_reimbursement': 'VAT Reimbursement'
    }
    return labels[type] || type
}

const postVatPayable11 = () => {
    if (!canPostVat.value || postingVat11.value || !payable.value) {
        return
    }
    openConfirm(
        `Post VAT Payable 11% untuk hutang ${payable.value.vendor_invoice_number || payable.value.id}?`,
        () => {
            postingVat11.value = true
            router.post(
                route('admin-keuangan.account-payables.post-vat-11', payable.value.id),
                {},
                {
                    onFinish: () => {
                        postingVat11.value = false
                    }
                }
            )
        },
        'Konfirmasi Post VAT Payable'
    )
}

const postVatPayable11_1 = () => {
    if (!canPostVat.value || postingVat11_1.value || !payable.value) {
        return
    }
    openConfirm(
        `Post VAT Payable 1.1% untuk hutang ${payable.value.vendor_invoice_number || payable.value.id}?`,
        () => {
            postingVat11_1.value = true
            router.post(
                route('admin-keuangan.account-payables.post-vat-1-1', payable.value.id),
                {},
                {
                    onFinish: () => {
                        postingVat11_1.value = false
                    }
                }
            )
        },
        'Konfirmasi Post VAT Payable'
    )
}

const postVatReceivable11 = () => {
    if (!canPostVatReceivable.value || postingVatReceivable11.value || !payable.value) {
        return
    }
    openConfirm(
        `Post VAT Receivable 11% untuk hutang ${payable.value.vendor_invoice_number || payable.value.id}?`,
        () => {
            postingVatReceivable11.value = true
            router.post(
                route('admin-keuangan.account-payables.post-vat-receivable-11', payable.value.id),
                {},
                {
                    onFinish: () => {
                        postingVatReceivable11.value = false
                    }
                }
            )
        },
        'Konfirmasi Post VAT Receivable'
    )
}

const postVatReceivable11_1 = () => {
    if (!canPostVatReceivable.value || postingVatReceivable11_1.value || !payable.value) {
        return
    }
    openConfirm(
        `Post VAT Receivable 1.1% untuk hutang ${payable.value.vendor_invoice_number || payable.value.id}?`,
        () => {
            postingVatReceivable11_1.value = true
            router.post(
                route('admin-keuangan.account-payables.post-vat-receivable-1-1', payable.value.id),
                {},
                {
                    onFinish: () => {
                        postingVatReceivable11_1.value = false
                    }
                }
            )
        },
        'Konfirmasi Post VAT Receivable'
    )
}

const postPph23Payable05 = () => {
    if (!canPostVat.value || postingPph23_05.value || !payable.value) {
        return
    }
    openConfirm(
        `Post VAT Payable PPh23 0.5% untuk hutang ${payable.value.vendor_invoice_number || payable.value.id}?`,
        () => {
            postingPph23_05.value = true
            router.post(
                route('admin-keuangan.account-payables.post-pph23-0-5', payable.value.id),
                {},
                {
                    onFinish: () => {
                        postingPph23_05.value = false
                    }
                }
            )
        },
        'Konfirmasi Post VAT Payable PPh23'
    )
}

const postPph23Payable2 = () => {
    if (!canPostVat.value || postingPph23_2.value || !payable.value) {
        return
    }
    openConfirm(
        `Post VAT Payable PPh23 2% untuk hutang ${payable.value.vendor_invoice_number || payable.value.id}?`,
        () => {
            postingPph23_2.value = true
            router.post(
                route('admin-keuangan.account-payables.post-pph23-2', payable.value.id),
                {},
                {
                    onFinish: () => {
                        postingPph23_2.value = false
                    }
                }
            )
        },
        'Konfirmasi Post VAT Payable PPh23'
    )
}

const goBack = () => {
    router.visit(route('admin-keuangan.account-payables.index'))
}

const resetPaymentForm = () => {
    paymentForm.reset()
    paymentForm.payment_date = new Date().toISOString().split('T')[0]
    paymentForm.payment_source = 'bank'
    paymentForm.petty_cash_category_id = ''
    paymentForm.payment_method = 'Transfer Bank'
    const defaultBank = bankAccounts.value.length ? bankAccounts.value[0] : null
    paymentForm.bank_account_id = defaultBank ? String(defaultBank.id) : ''
}

const openPaymentModal = () => {
    resetPaymentForm()
    const availableOptions = payableComponentOptions.value.length ? payableComponentOptions.value : componentOptions.value
    const defaultComponent = availableOptions.length === 1
        ? availableOptions[0]
        : (availableOptions.find(component => parseFloat(component.outstanding_amount || 0) > 0) || availableOptions[0])
    paymentForm.component_id = defaultComponent ? String(defaultComponent.id) : ''
    showPaymentModal.value = true
}

const closePaymentModal = () => {
    showPaymentModal.value = false
    resetPaymentForm()
}

const openEditModal = () => {
    showEditModal.value = true
}

const closeEditModal = () => {
    showEditModal.value = false
}

const resetAdditionalCostForm = () => {
    additionalCostForm.reset()
    const vendorId = payable.value?.vendor_id ? String(payable.value.vendor_id) : ''
    additionalCostContext.value = {
        componentType: 'operational_cost',
        categoryId: '',
        vendorId,
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
            : (payable.value?.vendor_id ? String(payable.value.vendor_id) : ''),
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

    const targetComponent = selectedComponent.value
    const targetPayableId = targetComponent?.parent_payable_id || payable.value?.id

    if (!targetPayableId) {
        processing.value = false
        return
    }
    paymentForm
        .transform((data) => ({
            ...data,
            amount: normalizeCurrencyInput(data.amount),
            bank_account_id: data.bank_account_id || null,
            petty_cash_category_id: data.petty_cash_category_id || null
        }))
        .post(
            route('admin-keuangan.account-payables.mark-as-paid', targetPayableId),
            {
                onSuccess: () => {
                    closePaymentModal()
                    resetPaymentForm()
                    processing.value = false
                },
                onError: () => {
                    processing.value = false
                }
            }
        )
}

const submitAdditionalCost = () => {
    if (!payable.value?.id) {
        return
    }

    additionalCostForm
        .transform((data) => ({
            ...data,
            amount: normalizeCurrencyInput(data.amount)
        }))
        .post(
            route('admin-keuangan.account-payables.components.store', payable.value.id),
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeAdditionalCostModal()
                }
            }
        )
}

const updateDetails = () => {
    if (!payable.value?.id) {
        return
    }

    processing.value = true

    router.post(
        route('admin-keuangan.account-payables.update-vendor-invoice', payable.value.id),
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
