<template>
    <AdminKeuanganLayout>
        <Head title="Edit Other Income" />

        <div class="p-6 max-w-4xl mx-auto">
            <!-- Header -->
            <div class="mb-6">
                <div class="flex items-center space-x-4 mb-2">
                    <Link
                        :href="route('admin-keuangan.other-incomes.index', returnQuery)"
                        class="text-sage-600 hover:text-sage-800 transition-colors"
                    >
                        <ArrowLeft class="w-5 h-5" />
                    </Link>
                    <h1 class="text-2xl font-bold text-sage-800">Edit Other Income</h1>
                </div>
                <p class="text-sm text-sage-600 ml-9">Update other income details</p>
            </div>

            <!-- Alert jika sudah posted -->
            <div v-if="otherIncome.posted_to_profit_loss" class="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <AlertTriangle class="h-5 w-5 text-yellow-400" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-yellow-700">
                            <strong>Warning:</strong> This income has been posted to Profit & Loss and cannot be edited.
                            Please unpost first if you need to make changes.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Form -->
            <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
                <form @submit.prevent="submitForm" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-sage-700 mb-2">
                                Reference Number
                            </label>
                            <input
                                v-model="form.reference_number"
                                type="text"
                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                                :disabled="otherIncome.posted_to_profit_loss"
                            />
                            <p v-if="form.errors.reference_number" class="mt-1 text-sm text-red-600">
                                {{ form.errors.reference_number }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-sage-700 mb-2">
                                Due Date
                            </label>
                            <input
                                v-model="form.due_date"
                                type="date"
                                :min="form.transaction_date"
                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                                :class="{ 'border-red-300': form.errors.due_date }"
                                :disabled="otherIncome.posted_to_profit_loss"
                            />
                            <p v-if="form.errors.due_date" class="mt-1 text-sm text-red-600">
                                {{ form.errors.due_date }}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-sage-700 mb-2">
                                Customer
                            </label>
                            <select
                                v-model="form.customer_id"
                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                                :disabled="otherIncome.posted_to_profit_loss"
                            >
                                <option value="">- No Customer -</option>
                                <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                                    {{ customer.company_name }}
                                </option>
                            </select>
                            <p v-if="form.errors.customer_id" class="mt-1 text-sm text-red-600">
                                {{ form.errors.customer_id }}
                            </p>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-sage-700 mb-2">
                                Customer Name (optional)
                            </label>
                            <input
                                v-model="form.customer_name"
                                type="text"
                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                                :disabled="otherIncome.posted_to_profit_loss"
                            />
                            <p v-if="form.errors.customer_name" class="mt-1 text-sm text-red-600">
                                {{ form.errors.customer_name }}
                            </p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Tanggal -->
                        <div>
                            <label class="block text-sm font-medium text-sage-700 mb-2">
                                Income Date <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.transaction_date"
                                type="date"
                                :max="todayDate"
                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                                :class="{ 'border-red-300': form.errors.transaction_date }"
                                :disabled="otherIncome.posted_to_profit_loss"
                            />
                            <p v-if="form.errors.transaction_date" class="mt-1 text-sm text-red-600">
                                {{ form.errors.transaction_date }}
                            </p>
                        </div>

                        <!-- Kategori -->
                        <div>
                            <label class="block text-sm font-medium text-sage-700 mb-2">
                                Category <span class="text-red-500">*</span>
                            </label>
                            <select
                                v-model="form.category"
                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                                :class="{ 'border-red-300': form.errors.category }"
                                :disabled="otherIncome.posted_to_profit_loss || categoryOptions.length === 0"
                            >
                                <option value="" disabled>Select Category</option>
                                <option v-for="category in categoryOptions" :key="category" :value="category">
                                    {{ category }}
                                </option>
                            </select>
                            <p v-if="!otherIncome.posted_to_profit_loss && categoryOptions.length === 0" class="mt-1 text-xs text-sage-500">
                                No active categories. Add categories in the Operational Cost Categories master.
                            </p>
                            <p v-if="form.errors.category" class="mt-1 text-sm text-red-600">
                                {{ form.errors.category }}
                            </p>
                        </div>
                    </div>

                    <!-- Deskripsi -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">
                            Description <span class="text-red-500">*</span>
                        </label>
                            <textarea
                                v-model="form.description"
                                rows="3"
                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"
                                :class="{ 'border-red-300': form.errors.description }"
                                :disabled="otherIncome.posted_to_profit_loss"
                                placeholder="Example: Bank interest for December 2024"
                            ></textarea>
                        <p v-if="form.errors.description" class="mt-1 text-sm text-red-600">
                            {{ form.errors.description }}
                        </p>
                    </div>

                    <!-- Jumlah -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">
                            Amount (Rp) <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="text-gray-500 text-sm">Rp</span>
                            </div>
                            <input
                                v-model="form.amount"
                                type="number"
                                step="0.01"
                                min="0.01"
                                class="w-full pl-12 pr-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                                :class="{ 'border-red-300': form.errors.amount }"
                                :disabled="otherIncome.posted_to_profit_loss"
                                placeholder="0.00"
                            />
                        </div>
                        <p v-if="form.errors.amount" class="mt-1 text-sm text-red-600">
                            {{ form.errors.amount }}
                        </p>
                    </div>

                    <!-- Bank -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">
                            Receiving Bank <span class="text-red-500">*</span>
                        </label>
                        <select
                            v-model="form.bank_account_id"
                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                            :class="{ 'border-red-300': form.errors.bank_account_id }"
                            :disabled="otherIncome.posted_to_profit_loss"
                        >
                            <option value="">Select Bank</option>
                            <option v-for="bank in bankAccounts" :key="bank.id" :value="bank.id">
                                {{ bank.bank_name }} • {{ bank.account_number }} ({{ bank.account_name }})
                            </option>
                        </select>
                        <p v-if="form.errors.bank_account_id" class="mt-1 text-sm text-red-600">
                            {{ form.errors.bank_account_id }}
                        </p>
                        <p class="mt-1 text-xs text-sage-500">
                            This income will immediately increase the selected bank balance.
                        </p>
                    </div>

                    <!-- Akun Laba Rugi -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">
                            Revenue Account (P&L) <span class="text-red-500">*</span>
                        </label>
                        <SearchableSelect
                            v-model="form.pl_account_id"
                            :options="plAccountOptions"
                            placeholder="Search accounts..."
                            label-field="label"
                            value-field="value"
                            :search-fields="['label', 'code', 'name']"
                            :input-class="plAccountInputClass"
                            :disabled="otherIncome.posted_to_profit_loss"
                        />
                        <p v-if="form.errors.pl_account_id" class="mt-1 text-sm text-red-600">
                            {{ form.errors.pl_account_id }}
                        </p>
                        <p class="mt-1 text-xs text-sage-500">
                            Income will be recorded to this account in the profit & loss report.
                        </p>
                    </div>

                    <!-- Catatan -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">
                            Notes (Optional)
                        </label>
                        <textarea
                            v-model="form.notes"
                            rows="2"
                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"
                            :class="{ 'border-red-300': form.errors.notes }"
                            :disabled="otherIncome.posted_to_profit_loss"
                            placeholder="Additional notes if any..."
                        ></textarea>
                        <p v-if="form.errors.notes" class="mt-1 text-sm text-red-600">
                            {{ form.errors.notes }}
                        </p>
                    </div>

                    <!-- Upload Bukti -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">
                            Upload Receipt (Optional)
                        </label>

                        <!-- Existing file -->
                        <div v-if="otherIncome.receipt_file && !filePreview" class="mb-2">
                            <a :href="`/storage/${otherIncome.receipt_file}`" target="_blank" class="inline-flex items-center text-sm text-sage-600 hover:text-sage-800">
                                <FileText class="w-4 h-4 mr-1" />
                                View current file
                            </a>
                        </div>

                        <div v-if="!otherIncome.posted_to_profit_loss" class="flex items-center space-x-4">
                            <label class="flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-sage-300 rounded-lg cursor-pointer hover:border-sage-400 transition-colors">
                                <div class="text-center">
                                    <Upload class="mx-auto h-8 w-8 text-sage-400" />
                                    <p class="mt-1 text-sm text-sage-600">
                                        <span class="font-medium">Click to upload</span> or drag & drop
                                    </p>
                                    <p class="text-xs text-sage-500">JPG, PNG, PDF (max 2MB)</p>
                                </div>
                                <input
                                    type="file"
                                    @change="handleFileUpload"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    class="hidden"
                                />
                            </label>
                        </div>
                        <p v-if="filePreview" class="mt-2 text-sm text-sage-600">
                            New file selected: <span class="font-medium">{{ filePreview }}</span>
                            <button @click="removeFile" type="button" class="ml-2 text-red-600 hover:text-red-800">
                                <X class="w-4 h-4 inline" />
                            </button>
                        </p>
                        <p v-if="form.errors.receipt_file" class="mt-1 text-sm text-red-600">
                            {{ form.errors.receipt_file }}
                        </p>
                    </div>

                    <!-- Buttons -->
                    <div class="flex justify-end space-x-3 pt-4 border-t border-sage-200">
                        <Link
                            :href="route('admin-keuangan.other-incomes.index', returnQuery)"
                            class="inline-flex items-center px-4 py-2 border border-sage-300 rounded-lg text-sm font-medium text-sage-700 bg-white hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        >
                            Cancel
                        </Link>
                        <button
                            v-if="!otherIncome.posted_to_profit_loss"
                            type="submit"
                            :disabled="form.processing || categoryOptions.length === 0"
                            class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition disabled:opacity-50"
                        >
                            <Save class="w-4 h-4 mr-2" />
                            {{ form.processing ? 'Saving...' : 'Save Changes' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { ref, computed, watch } from 'vue'
import { ArrowLeft, Save, Upload, X, AlertTriangle, FileText } from 'lucide-vue-next'
import SearchableSelect from '@/Components/SearchableSelect.vue'

const props = defineProps({
    otherIncome: {
        type: Object,
        required: true,
    },
    categories: {
        type: Array,
        default: () => [],
    },
  customers: {
    type: Array,
    default: () => [],
  },
    bankAccounts: {
        type: Array,
        default: () => [],
    },
    linkedBankAccountId: {
        type: [Number, String, null],
        default: null,
    },
    revenueAccounts: {
        type: Array,
        default: () => [],
    },
    returnQuery: {
        type: Object,
        default: () => ({}),
    },
})

const todayDate = new Date().toISOString().split('T')[0]
const formatDateInput = (value) => {
    if (!value) return ''
    // Jika string sudah dalam format yyyy-mm-dd atau berawalan itu, ambil 10 char pertama
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
        return value.slice(0, 10)
    }
    const date = new Date(value)
    if (isNaN(date.getTime())) return ''
    return date.toISOString().split('T')[0]
}

const form = useForm({
    reference_number: props.otherIncome.reference_number || '',
    customer_id: props.otherIncome.customer_id || '',
    customer_name: props.otherIncome.customer_name || '',
    transaction_date: formatDateInput(props.otherIncome.transaction_date),
    due_date: formatDateInput(props.otherIncome.due_date),
    category: props.otherIncome.category,
    description: props.otherIncome.description,
    amount: props.otherIncome.amount,
    notes: props.otherIncome.notes || '',
    bank_account_id: props.linkedBankAccountId || '',
    pl_account_id: props.otherIncome.pl_account_id || '',
    receipt_file: null,
})

const filePreview = ref('')
const categoryOptions = computed(() => props.categories ?? [])
const customers = computed(() => props.customers ?? [])
const bankAccounts = computed(() => props.bankAccounts ?? [])
const revenueAccounts = computed(() => props.revenueAccounts ?? [])
const plAccountOptions = computed(() =>
    revenueAccounts.value.map((account) => ({
        label: `${account.account_code} - ${account.account_name}`,
        value: account.id,
        code: account.account_code,
        name: account.account_name,
    }))
)
const plAccountInputClass = computed(() => {
    const base = 'w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm'
    const error = form.errors?.pl_account_id ? ' border-red-300' : ' border-sage-300'
    const disabled = props.otherIncome.posted_to_profit_loss ? ' bg-gray-100 cursor-not-allowed' : ''
    return `${base}${error}${disabled}`
})

watch(
    categoryOptions,
    (options) => {
        if (!options.length) {
            return
        }

        if (!options.includes(form.category)) {
            form.category = options[0]
        }
    },
    { immediate: true }
)

watch(
    bankAccounts,
    (options) => {
        if (!form.bank_account_id && options.length > 0) {
            form.bank_account_id = options[0].id
        }
    },
    { immediate: true }
)

watch(
    revenueAccounts,
    (options) => {
        if (!form.pl_account_id && options.length > 0) {
            form.pl_account_id = options[0].id
        }
    },
    { immediate: true }
)

watch(
    () => form.customer_id,
    (value) => {
        if (value) {
            const found = customers.value.find((customer) => customer.id === value)
            if (found) {
                form.customer_name = found.company_name
            }
        }
    },
    { immediate: true }
)

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        form.receipt_file = file
        filePreview.value = file.name
    }
}

const removeFile = () => {
    form.receipt_file = null
    filePreview.value = ''
}

const normalizeBeforeSubmit = () => {
    // Normalisasi tanggal ke yyyy-mm-dd
    form.transaction_date = formatDateInput(form.transaction_date)
    form.due_date = formatDateInput(form.due_date)

    // Normalisasi amount (hilangkan pemisah ribuan, ganti koma ke titik)
    if (form.amount !== null && form.amount !== undefined && form.amount !== '') {
        const normalized = String(form.amount)
            .replace(/\s+/g, '')
            .replace(/,/g, '.')
        const parsed = parseFloat(normalized)
        form.amount = isNaN(parsed) ? '' : parsed
    }

    // Pastikan bank terisi jika ada opsi
    if (!form.bank_account_id && bankAccounts.value.length > 0) {
        form.bank_account_id = bankAccounts.value[0].id
    }
}

const submitForm = () => {
    normalizeBeforeSubmit()
    form
        .transform((data) => ({
            ...data,
            _method: 'put',
        }))
        .post(route('admin-keuangan.other-incomes.update', {
            otherIncome: props.otherIncome.id,
            ...props.returnQuery,
        }), {
            preserveScroll: true,
            forceFormData: true,
        })
}
</script>
