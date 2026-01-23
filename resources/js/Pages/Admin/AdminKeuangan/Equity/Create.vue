<template>
    <AdminKeuanganLayout>
        <Head title="Create Equity Entry" />

        <div class="py-6">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-gray-900">Create Equity Entry</h1>
                    <p class="mt-1 text-sm text-gray-600">Record equity movements and owner-related balances</p>
                </div>

                <div class="bg-white shadow rounded-lg">
                    <form @submit.prevent="submitForm" class="px-6 py-6 space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Equity Type</label>
                            <select
                                v-model="form.entry_type"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                required
                            >
                                <option value="" disabled>Select type</option>
                                <option v-for="option in typeOptions" :key="option.value" :value="option.value">
                                    {{ option.label }}
                                </option>
                            </select>
                            <p class="text-xs text-gray-500 mt-2" v-if="selectedConfig.helper">
                                {{ selectedConfig.helper }}
                            </p>
                            <div v-if="form.errors.entry_type" class="text-xs text-red-600 mt-2">{{ form.errors.entry_type }}</div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Entry Date</label>
                                <input
                                    v-model="form.entry_date"
                                    type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                    required
                                />
                                <div v-if="form.errors.entry_date" class="text-xs text-red-600 mt-2">{{ form.errors.entry_date }}</div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Amount (IDR)</label>
                                <input
                                    v-model="form.amount"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                    required
                                />
                                <div v-if="form.errors.amount" class="text-xs text-red-600 mt-2">{{ form.errors.amount }}</div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Reference (Optional)</label>
                                <input
                                    v-model="form.reference"
                                    type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                    placeholder="Example: EO-2026-001"
                                />
                                <div v-if="form.errors.reference" class="text-xs text-red-600 mt-2">{{ form.errors.reference }}</div>
                            </div>
                            <div class="flex items-center space-x-3 mt-6">
                                <input id="opening_balance" v-model="form.is_opening" type="checkbox" class="rounded border-gray-300 text-sage-600 focus:ring-sage-500" />
                                <label for="opening_balance" class="text-sm text-gray-700">Opening Balance</label>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                            <textarea
                                v-model="form.notes"
                                rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                placeholder="Additional notes"
                            ></textarea>
                            <div v-if="form.errors.notes" class="text-xs text-red-600 mt-2">{{ form.errors.notes }}</div>
                        </div>

                        <div class="bg-sage-50 border border-sage-100 rounded-lg p-4">
                            <div class="flex items-center space-x-3">
                                <input
                                    id="affects_bank"
                                    v-model="form.affects_bank"
                                    type="checkbox"
                                    class="rounded border-gray-300 text-sage-600 focus:ring-sage-500"
                                    :disabled="!selectedConfig.bankAllowed"
                                />
                                <label for="affects_bank" class="text-sm text-gray-700">
                                    Create Bank Transaction
                                </label>
                            </div>
                            <p class="text-xs text-gray-500 mt-2">
                                {{ selectedConfig.bankHint }}
                            </p>
                            <div v-if="form.affects_bank" class="mt-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
                                <select
                                    v-model="form.bank_account_id"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                >
                                    <option value="">Select bank account</option>
                                    <option v-for="bank in bankAccounts" :key="bank.id" :value="bank.id">
                                        {{ bank.bank_name }} - {{ bank.account_number }}
                                    </option>
                                </select>
                                <div v-if="form.errors.bank_account_id" class="text-xs text-red-600 mt-2">{{ form.errors.bank_account_id }}</div>
                            </div>
                        </div>

                        <div class="flex justify-end space-x-2">
                            <Link
                                :href="route('admin-keuangan.equity.index')"
                                class="inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                :disabled="form.processing"
                                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                Save Entry
                            </button>
                        </div>

                        <div v-if="form.errors.error" class="text-xs text-red-600">{{ form.errors.error }}</div>
                    </form>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { computed, watch } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

const props = defineProps({
    typeOptions: Array,
    bankAccounts: Array,
})

const typeConfigMap = {
    paid_in_capital: {
        bankAllowed: true,
        bankHint: 'Paid-in capital usually increases bank balance (credit).',
        helper: 'Use this for shareholder capital injections.',
    },
    retained_earnings: {
        bankAllowed: false,
        bankHint: 'Retained earnings are recorded without bank movement.',
        helper: 'Record retained earnings adjustments here.',
    },
    current_year_profit: {
        bankAllowed: false,
        bankHint: 'Current year profit is recorded without bank movement.',
        helper: 'Manual adjustments for current year profit.',
    },
    dividend_prive: {
        bankAllowed: true,
        bankHint: 'Dividends and prive reduce equity and usually decrease bank balance (debit).',
        helper: 'Owner withdrawals or dividend distributions.',
    },
    management_loan: {
        bankAllowed: true,
        bankHint: 'Management loan settlement increases bank balance (credit).',
        helper: 'Record management loans owed to the company.',
    },
    deferred_liability: {
        bankAllowed: true,
        bankHint: 'Deferred liabilities can be settled into bank balance (credit).',
        helper: 'Record deferred liabilities and settle later.',
    },
    annual_closing: {
        bankAllowed: false,
        bankHint: 'Annual closing transfers current year profit to retained earnings.',
        helper: 'Creates retained earnings increase and current year profit reduction.',
    },
}

const form = useForm({
    entry_type: '',
    entry_date: new Date().toISOString().slice(0, 10),
    amount: '',
    reference: '',
    notes: '',
    is_opening: false,
    affects_bank: false,
    bank_account_id: '',
})

const selectedConfig = computed(() => typeConfigMap[form.entry_type] || { bankAllowed: false, bankHint: '' })

watch(
    () => form.entry_type,
    () => {
        if (!selectedConfig.value.bankAllowed) {
            form.affects_bank = false
            form.bank_account_id = ''
        }
    }
)

const submitForm = () => {
    form.post(route('admin-keuangan.equity.store'))
}
</script>
