<template>
    <AdminKeuanganLayout>
        <Head title="Detail Pendapatan Lain-lain" />
        <AlertDialog
            :show="alertDialog.show"
            :type="alertDialog.type"
            :title="alertDialog.title"
            :message="alertDialog.message"
            confirm-text="Ya, lanjutkan"
            cancel-text="Batal"
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
                                <h1 class="text-2xl font-bold text-gray-900">Detail Pendapatan Lain-lain</h1>
                                <p class="mt-1 text-sm text-gray-600">Informasi lengkap pendapatan</p>
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
                        {{ otherIncome.posted_to_profit_loss ? 'Posted ke Laba Rugi' : 'Pending' }}
                    </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div class="bg-white border border-sage-200 rounded-lg p-4">
                        <p class="text-xs text-gray-500 uppercase tracking-wider">Outstanding</p>
                        <p class="text-xl font-semibold text-gray-900">{{ formatCurrency(otherIncome.outstanding_amount) }}</p>
                    </div>
                    <div class="bg-white border border-sage-200 rounded-lg p-4">
                        <p class="text-xs text-gray-500 uppercase tracking-wider">Status Piutang</p>
                        <span :class="['inline-flex px-2 py-1 text-xs font-semibold rounded-full', receivableStatusBadge(otherIncome.status)]">
                            {{ formatStatus(otherIncome.status) }}
                        </span>
                    </div>
                    <div class="bg-white border border-sage-200 rounded-lg p-4">
                        <p class="text-xs text-gray-500 uppercase tracking-wider">Jatuh Tempo</p>
                        <p class="text-sm font-medium text-gray-900">
                            {{ otherIncome.due_date ? formatDate(otherIncome.due_date) : '-' }}
                        </p>
                    </div>
                </div>

                <!-- Main Info -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                    <div class="px-4 py-5 sm:px-6 bg-sage-50">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Informasi Pendapatan</h3>
                    </div>
                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <Calendar class="w-4 h-4 mr-2 text-gray-400" />
                                    Tanggal
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                                    {{ formatDate(otherIncome.transaction_date) }}
                                </dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Nomor Referensi</dt>
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
                                    Kategori
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full" :class="getCategoryBadge(otherIncome.category)">
                                        {{ otherIncome.category }}
                                    </span>
                                </dd>
                            </div>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Outstanding Sekarang</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                                    {{ formatCurrency(otherIncome.outstanding_amount) }}
                                </dd>
                            </div>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <FileText class="w-4 h-4 mr-2 text-gray-400" />
                                    Deskripsi
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.description }}
                                </dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <DollarSign class="w-4 h-4 mr-2 text-gray-400" />
                                    Jumlah
                                </dt>
                                <dd class="mt-1 text-lg font-bold text-green-600 sm:mt-0 sm:col-span-2">
                                    {{ formatCurrency(otherIncome.amount) }}
                                </dd>
                            </div>
                            <div v-if="otherIncome.notes" class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <MessageSquare class="w-4 h-4 mr-2 text-gray-400" />
                                    Catatan
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.notes }}
                                </dd>
                            </div>
                            <div v-if="otherIncome.receipt_file" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <Paperclip class="w-4 h-4 mr-2 text-gray-400" />
                                    Bukti Pendapatan
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <a :href="`/storage/${otherIncome.receipt_file}`" target="_blank" class="inline-flex items-center text-sage-600 hover:text-sage-800">
                                        <FileText class="w-4 h-4 mr-1" />
                                        Lihat File
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <!-- Audit Info -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                    <div class="px-4 py-5 sm:px-6 bg-gray-50">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Informasi Audit</h3>
                    </div>
                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Dibuat Oleh</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.creator?.name || '-' }}
                                    <span class="text-gray-500 ml-2">{{ formatDateTime(otherIncome.created_at) }}</span>
                                </dd>
                            </div>
                            <div v-if="otherIncome.posted_to_profit_loss" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Di-post ke Laba Rugi Oleh</dt>
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
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Pembayaran Piutang</h3>
                            <p class="mt-1 text-sm text-gray-500">Catat penerimaan kas untuk pendapatan ini.</p>
                        </div>
                        <span v-if="!canRecordPayment" class="text-xs text-gray-500">Piutang sudah lunas</span>
                    </div>
                    <div class="border-t border-gray-200">
                        <div class="p-4 space-y-6">
                            <div v-if="otherIncome.payments?.length" class="overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metode</th>
                                            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                                            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Adjustment</th>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catatan</th>
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
                            <div v-else class="text-sm text-gray-500">Belum ada pembayaran yang tercatat.</div>

                            <form v-if="canRecordPayment" @submit.prevent="recordPayment" class="space-y-4 border-t border-gray-200 pt-4">
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Pembayaran</label>
                                        <input
                                            v-model="paymentForm.payment_date"
                                            type="date"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Metode Pembayaran</label>
                                        <select
                                            v-model="paymentForm.payment_method"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                                            required
                                        >
                                            <option value="bank">Transfer Bank</option>
                                            <option value="petty_cash">Petty Cash</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Jumlah Pembayaran</label>
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
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Akun Bank</label>
                                        <select
                                            v-model="paymentForm.bank_account_id"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500 text-sm"
                                            required
                                        >
                                            <option value="">Pilih Akun Bank</option>
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
                                                <option value="tax_expense">Beban Pajak</option>
                                                <option value="other_expense">Beban Lain-lain</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
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
                                        class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition"
                                    >
                                        Catat Pembayaran
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Aksi</h3>
                        <div class="flex flex-wrap gap-3">
                            <button
                                v-if="!otherIncome.posted_to_profit_loss"
                                @click="postToProfitLoss"
                                class="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 transition"
                            >
                                <CheckCircle class="w-4 h-4 mr-2" />
                                Post ke Laba Rugi
                            </button>
                            <button
                                v-if="otherIncome.posted_to_profit_loss"
                                @click="unpostFromProfitLoss"
                                class="inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 transition"
                            >
                                <XCircle class="w-4 h-4 mr-2" />
                                Unpost dari Laba Rugi
                            </button>
                            <button
                                v-if="!otherIncome.posted_to_profit_loss"
                                @click="deleteIncome"
                                class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 transition"
                            >
                                <Trash2 class="w-4 h-4 mr-2" />
                                Hapus Pendapatan
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

// Alert dialog
const alertDialog = reactive({
    show: false,
    type: 'confirm',
    title: '',
    message: '',
    onConfirm: null,
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
            'Total pembayaran + adjustment melebihi outstanding. Periksa kembali nominalnya.',
            () => closeAlert(),
            'Validasi Pembayaran'
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
        'Posting pendapatan ini ke Laba Rugi?',
        () => router.post(route('admin-keuangan.other-incomes.post-to-profit-loss', props.otherIncome.id))
    )
}

const unpostFromProfitLoss = () => {
    openConfirm(
        'Unpost pendapatan ini dari Laba Rugi?',
        () => router.post(route('admin-keuangan.other-incomes.unpost-from-profit-loss', props.otherIncome.id))
    )
}

const deleteIncome = () => {
    openConfirm(
        'Apakah Anda yakin ingin menghapus pendapatan ini?',
        () => router.delete(route('admin-keuangan.other-incomes.destroy', props.otherIncome.id)),
        'Hapus Pendapatan'
    )
}

const paymentMethodLabel = (method) => {
    return method === 'petty_cash' ? 'Petty Cash' : 'Transfer Bank'
}

const adjustmentLabel = (type) => {
    if (type === 'tax_expense') return 'Beban Pajak'
    if (type === 'other_expense') return 'Beban Lain-lain'
    return '-'
}
</script>
