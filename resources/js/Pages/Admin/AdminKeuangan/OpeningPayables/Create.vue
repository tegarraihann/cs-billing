<template>
    <AdminKeuanganLayout>
        <Head title="Create Opening Payable" />

        <div class="py-6">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-6">
                    <h1 class="text-2xl font-bold text-gray-900">Create Opening Payable</h1>
                    <p class="mt-1 text-sm text-gray-600">Record opening balance for vendor payables.</p>
                </div>

                <div class="bg-white shadow rounded-lg">
                    <form @submit.prevent="submit" class="px-6 py-6 space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                            <SearchableSelect
                                v-model="form.vendor_id"
                                :options="vendorOptions"
                                placeholder="Select vendor"
                                :search-fields="['label']"
                                label-field="label"
                                value-field="value"
                                :input-class="'w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500'"
                            />
                            <div v-if="form.errors.vendor_id" class="text-xs text-red-600 mt-2">{{ form.errors.vendor_id }}</div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Vendor Invoice Number</label>
                                <input
                                    v-model="form.vendor_invoice_number"
                                    type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                    required
                                />
                                <div v-if="form.errors.vendor_invoice_number" class="text-xs text-red-600 mt-2">{{ form.errors.vendor_invoice_number }}</div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Vendor Invoice Date</label>
                                <input
                                    v-model="form.vendor_invoice_date"
                                    type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                    required
                                />
                                <div v-if="form.errors.vendor_invoice_date" class="text-xs text-red-600 mt-2">{{ form.errors.vendor_invoice_date }}</div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">SO Number</label>
                                <input
                                    v-model="form.source_so_number"
                                    type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                    required
                                />
                                <div v-if="form.errors.source_so_number" class="text-xs text-red-600 mt-2">{{ form.errors.source_so_number }}</div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Opening Amount</label>
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
                                <label class="block text-sm font-medium text-gray-700 mb-2">Payment Due Date (Optional)</label>
                                <input
                                    v-model="form.payment_due_date"
                                    type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                                <div v-if="form.errors.payment_due_date" class="text-xs text-red-600 mt-2">{{ form.errors.payment_due_date }}</div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Payment Date (Optional)</label>
                                <input
                                    v-model="form.opening_payment_date"
                                    type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                                <div v-if="form.errors.opening_payment_date" class="text-xs text-red-600 mt-2">{{ form.errors.opening_payment_date }}</div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Service Description</label>
                                <input
                                    v-model="form.service_description"
                                    type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                                <div v-if="form.errors.service_description" class="text-xs text-red-600 mt-2">{{ form.errors.service_description }}</div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Service Remarks (Optional)</label>
                                <input
                                    v-model="form.service_remarks"
                                    type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                                <div v-if="form.errors.service_remarks" class="text-xs text-red-600 mt-2">{{ form.errors.service_remarks }}</div>
                            </div>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Vendor Bank Account (Optional)</label>
                                <input
                                    v-model="form.vendor_bank_account"
                                    type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                                <div v-if="form.errors.vendor_bank_account" class="text-xs text-red-600 mt-2">{{ form.errors.vendor_bank_account }}</div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Vendor Account Name (Optional)</label>
                                <input
                                    v-model="form.vendor_account_name"
                                    type="text"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                                <div v-if="form.errors.vendor_account_name" class="text-xs text-red-600 mt-2">{{ form.errors.vendor_account_name }}</div>
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
                            <textarea
                                v-model="form.notes"
                                rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                            ></textarea>
                            <div v-if="form.errors.notes" class="text-xs text-red-600 mt-2">{{ form.errors.notes }}</div>
                        </div>

                        <div class="flex justify-end space-x-2">
                            <Link
                                :href="route('admin-keuangan.opening-payables.index')"
                                class="inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                :disabled="form.processing"
                                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 disabled:opacity-50"
                            >
                                Save Opening Payable
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
import { computed } from 'vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import SearchableSelect from '@/Components/SearchableSelect.vue'

const props = defineProps({
    vendors: Array,
})

const vendorOptions = computed(() => {
    return (props.vendors || []).map((vendor) => ({
        value: vendor.id,
        label: vendor.nama_vendor,
    }))
})

const form = useForm({
    vendor_id: '',
    vendor_invoice_number: '',
    vendor_invoice_date: '',
    source_so_number: '',
    amount: '',
    payment_due_date: '',
    opening_payment_date: '',
    service_description: 'Opening Balance',
    service_remarks: '',
    vendor_bank_account: '',
    vendor_account_name: '',
    notes: '',
})

const submit = () => {
    form.post(route('admin-keuangan.opening-payables.store'))
}
</script>
