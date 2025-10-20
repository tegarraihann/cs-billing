<template>
    <AdminKeuanganLayout>
        <Head title="Input Opening Balance" />

        <div class="py-6">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">Input Opening Balance</h1>
                            <p class="mt-1 text-sm text-gray-600">
                                Input saldo awal bank untuk periode bulan tertentu
                            </p>
                        </div>
                        <Link
                            :href="route('admin-keuangan.bank-balance.index')"
                            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                        >
                            <ArrowLeft class="w-4 h-4 mr-2" />
                            Kembali
                        </Link>
                    </div>
                </div>

                <!-- Info Alert -->
                <div class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <Info class="h-5 w-5 text-blue-400" />
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-blue-800">
                                Informasi Opening Balance
                            </h3>
                            <div class="mt-2 text-sm text-blue-700">
                                <ul class="list-disc list-inside space-y-1">
                                    <li>Opening balance hanya perlu diinput sekali per bulan untuk setiap bank</li>
                                    <li>Saldo akan otomatis terupdate saat ada customer payment atau vendor payment</li>
                                    <li>Jika sudah ada opening balance untuk periode ini, input baru akan mengupdate data sebelumnya</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <form @submit.prevent="submit">
                        <div class="px-4 py-5 sm:p-6 space-y-6">
                            <!-- Period Selection -->
                            <div>
                                <label for="period_month" class="block text-sm font-medium text-gray-700 mb-2">
                                    Periode Bulan
                                </label>
                                <input
                                    id="period_month"
                                    v-model="form.period_month"
                                    type="month"
                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                    :class="{ 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500': errors.period_month }"
                                />
                                <div v-if="errors.period_month" class="mt-2 text-sm text-red-600">
                                    {{ errors.period_month }}
                                </div>
                                <p class="mt-1 text-sm text-gray-500">
                                    Pilih bulan dan tahun untuk opening balance
                                </p>
                            </div>

                            <!-- Existing Balances Alert -->
                            <div v-if="hasExistingBalances" class="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <AlertTriangle class="h-5 w-5 text-yellow-400" />
                                    </div>
                                    <div class="ml-3">
                                        <h3 class="text-sm font-medium text-yellow-800">
                                            Opening Balance Sudah Ada
                                        </h3>
                                        <div class="mt-2 text-sm text-yellow-700">
                                            <p>Opening balance untuk periode {{ form.period_month }} sudah pernah diinput. Input baru akan mengupdate data yang ada.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Bank Balances -->
                            <div class="space-y-6">
                                <div v-for="(bank, index) in bankAccounts" :key="bank.id">
                                    <div class="border border-gray-200 rounded-lg p-6">
                                        <div class="flex items-center mb-4">
                                            <div class="flex-shrink-0">
                                                <div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                                    <CreditCard class="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                            <div class="ml-4">
                                                <h3 class="text-lg font-medium text-gray-900">
                                                    Bank {{ bank.bank_name }}
                                                </h3>
                                                <p class="text-sm text-gray-500">
                                                    {{ bank.account_number }} • {{ bank.account_name }}
                                                </p>
                                            </div>
                                        </div>

                                        <!-- Show existing balance if any -->
                                        <div v-if="existingBalances[bank.id]" class="mb-4 p-3 bg-gray-50 rounded-md">
                                            <p class="text-sm text-gray-700">
                                                <span class="font-medium">Current Opening Balance:</span>
                                                {{ formatCurrency(existingBalances[bank.id].opening_balance) }}
                                            </p>
                                        </div>

                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label :for="`opening_balance_${bank.id}`" class="block text-sm font-medium text-gray-700 mb-2">
                                                    Opening Balance <span class="text-red-500">*</span>
                                                </label>
                                                <div class="relative rounded-md shadow-sm">
                                                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <span class="text-gray-500 sm:text-sm">Rp</span>
                                                    </div>
                                                    <input
                                                        :id="`opening_balance_${bank.id}`"
                                                        v-model="form.balances[index].opening_balance"
                                                        type="text"
                                                        class="mt-1 block w-full pl-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                        :class="{ 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500': errors[`balances.${index}.opening_balance`] }"
                                                        placeholder="0"
                                                        @input="formatCurrencyInput($event, index)"
                                                    />
                                                </div>
                                                <div v-if="errors[`balances.${index}.opening_balance`]" class="mt-2 text-sm text-red-600">
                                                    {{ errors[`balances.${index}.opening_balance`] }}
                                                </div>
                                            </div>

                                            <div>
                                                <label :for="`notes_${bank.id}`" class="block text-sm font-medium text-gray-700 mb-2">
                                                    Catatan (Opsional)
                                                </label>
                                                <textarea
                                                    :id="`notes_${bank.id}`"
                                                    v-model="form.balances[index].notes"
                                                    rows="3"
                                                    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                    placeholder="Catatan untuk opening balance ini..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Form Actions -->
                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <div class="flex justify-end space-x-3">
                                <Link
                                    :href="route('admin-keuangan.bank-balance.index')"
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    :disabled="form.processing"
                                    class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    :class="{ 'opacity-25': form.processing }"
                                >
                                    <span v-if="form.processing" class="mr-2">
                                        <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    </span>
                                    {{ form.processing ? 'Menyimpan...' : 'Simpan Opening Balance' }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import {
    ArrowLeft, Info, AlertTriangle, CreditCard, Save
} from 'lucide-vue-next'

const props = defineProps({
    bankAccounts: {
        type: Array,
        required: true
    },
    currentMonth: {
        type: String,
        required: true
    },
    existingBalances: {
        type: Object,
        default: () => ({})
    },
    errors: {
        type: Object,
        default: () => ({})
    }
})

// Initialize form
const form = useForm({
    period_month: props.currentMonth,
    balances: props.bankAccounts.map(bank => ({
        bank_account_id: bank.id,
        opening_balance: props.existingBalances[bank.id]?.opening_balance || '',
        notes: props.existingBalances[bank.id]?.notes || ''
    }))
})

const hasExistingBalances = computed(() => {
    return Object.keys(props.existingBalances).length > 0
})

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount || 0)
}

const formatCurrencyInput = (event, index) => {
    let value = event.target.value.replace(/[^\d]/g, '')
    if (value) {
        // Format with thousand separators
        value = new Intl.NumberFormat('id-ID').format(parseInt(value))
    }
    form.balances[index].opening_balance = value
}

const submit = () => {
    // Convert formatted currency back to numbers
    const processedBalances = form.balances.map(balance => ({
        ...balance,
        opening_balance: balance.opening_balance.replace(/[^\d]/g, '') || '0'
    }))

    form.transform(data => ({
        ...data,
        balances: processedBalances
    })).post(route('admin-keuangan.bank-balance.store'), {
        onSuccess: () => {
            // Form will be redirected on success
        }
    })
}
</script>