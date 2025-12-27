<template>
    <AdminKeuanganLayout>

        <Head title="Add Income Statement Period" />

        <div class="py-6">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-6">
                    <Link :href="route('admin-keuangan.profit-loss.index')"
                        class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
                        <ArrowLeft class="w-4 h-4 mr-2" />
                        Back to Income Statement Reports
                    </Link>
                    <h1 class="text-2xl font-bold text-gray-900">Add Income Statement Period</h1>
                    <p class="mt-1 text-sm text-gray-600">Create a new period for the income statement</p>
                </div>

                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
                    <div class="px-6 py-8">
                        <!-- Error Alert -->
                        <div v-if="errors.error" class="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
                            <div class="flex">
                                <div class="flex-shrink-0">
                                    <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <div class="ml-3">
                                    <h3 class="text-sm font-medium text-red-800">An Error Occurred</h3>
                                    <div class="mt-2 text-sm text-red-700">
                                        {{ errors.error }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form @submit.prevent="submit">
                            <div class="grid grid-cols-1 gap-6">
                                <div>
                                    <label for="period_name" class="block text-sm font-medium text-gray-700 mb-2">
                                        Period Name <span class="text-red-500">*</span>
                                    </label>
                                    <input id="period_name" v-model="form.period_name" type="text"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                        :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.period_name }"
                                        placeholder="Example: December 2024 Income Statement" />
                                    <div v-if="errors.period_name" class="mt-1 text-sm text-red-600">
                                        {{ errors.period_name }}
                                    </div>
                                </div>

                                <div>
                                    <label for="period_type" class="block text-sm font-medium text-gray-700 mb-2">
                                        Period Type <span class="text-red-500">*</span>
                                    </label>
                                    <select id="period_type" v-model="form.period_type"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                        :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.period_type }"
                                        @change="updateDateSuggestions">
                                        <option value="">Select Period Type</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="quarterly">Quarterly</option>
                                        <option value="yearly">Yearly</option>
                                    </select>
                                    <div v-if="errors.period_type" class="mt-1 text-sm text-red-600">
                                        {{ errors.period_type }}
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label for="start_date" class="block text-sm font-medium text-gray-700 mb-2">
                                            Start Date <span class="text-red-500">*</span>
                                        </label>
                                        <input id="start_date" v-model="form.start_date" type="date"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.start_date }" />
                                        <div v-if="errors.start_date" class="mt-1 text-sm text-red-600">
                                            {{ errors.start_date }}
                                        </div>
                                    </div>

                                    <div>
                                        <label for="end_date" class="block text-sm font-medium text-gray-700 mb-2">
                                            End Date <span class="text-red-500">*</span>
                                        </label>
                                        <input id="end_date" v-model="form.end_date" type="date"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.end_date }" />
                                        <div v-if="errors.end_date" class="mt-1 text-sm text-red-600">
                                            {{ errors.end_date }}
                                        </div>
                                    </div>
                                </div>

                                <div v-if="dateSuggestions.length > 0" class="p-4 bg-blue-50 rounded-md">
                                    <h3 class="text-sm font-medium text-blue-900 mb-2">Date Suggestions:</h3>
                                    <div class="space-y-2">
                                        <button v-for="suggestion in dateSuggestions" :key="suggestion.label"
                                            type="button" @click="applySuggestion(suggestion)"
                                            class="inline-flex items-center px-3 py-1 border border-blue-200 rounded-md text-sm text-blue-700 hover:bg-blue-100 mr-2">
                                            {{ suggestion.label }}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
                                        Notes
                                    </label>
                                    <textarea id="notes" v-model="form.notes" rows="3"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                        placeholder="Additional notes for this period..."></textarea>
                                </div>
                            </div>

                            <div class="mt-8 flex justify-end space-x-3">
                                <Link :href="route('admin-keuangan.profit-loss.index')"
                                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                                    Cancel
                                </Link>
                                <button type="submit" :disabled="processing"
                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50">
                                    <Loader2 v-if="processing" class="animate-spin -ml-1 mr-2 h-4 w-4" />
                                    {{ processing ? 'Saving...' : 'Save Period' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <AlertTriangle class="h-5 w-5 text-yellow-400" />
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-yellow-800">Important Information</h3>
                            <div class="mt-2 text-sm text-yellow-700">
                                <ul class="list-disc list-inside space-y-1">
                                    <li>After the period is created, the system will automatically import data from
                                        Sales Orders, Petty Cash, and Employee Salaries based on the date range.</li>
                                    <li>You can still add or edit manual entries before the period is finalized.</li>
                                    <li>Make sure the date range is correct because it affects the imported data.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { ArrowLeft, Loader2, AlertTriangle } from 'lucide-vue-next'
import { ref, computed } from 'vue'

const props = defineProps({
    errors: Object,
})

const form = useForm({
    period_name: '',
    period_type: '',
    start_date: '',
    end_date: '',
    notes: '',
})

const processing = computed(() => form.processing)
const dateSuggestions = ref([])

const submit = () => {
    console.log('Submitting profit loss period form:', form.data())

    form.post(route('admin-keuangan.profit-loss.store'), {
        onSuccess: (page) => {
            console.log('Profit loss period created successfully', page)
        },
        onError: (errors) => {
            console.error('Income statement period creation failed:', errors)
            alert('Failed to create income statement period. Check the console for details.')
        },
        onFinish: () => {
            console.log('Profit loss period creation request finished')
        }
    })
}

const updateDateSuggestions = () => {
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()

    dateSuggestions.value = []

    if (form.period_type === 'monthly') {
        // Current month
        const startOfMonth = new Date(currentYear, currentMonth, 1)
        const endOfMonth = new Date(currentYear, currentMonth + 1, 0)

        dateSuggestions.value.push({
            label: `This Month (${getMonthName(currentMonth)} ${currentYear})`,
            start_date: formatDate(startOfMonth),
            end_date: formatDate(endOfMonth)
        })

        // Previous month
        const startOfPrevMonth = new Date(currentYear, currentMonth - 1, 1)
        const endOfPrevMonth = new Date(currentYear, currentMonth, 0)

        dateSuggestions.value.push({
            label: `Last Month (${getMonthName(currentMonth - 1)} ${currentMonth === 0 ? currentYear - 1 : currentYear})`,
            start_date: formatDate(startOfPrevMonth),
            end_date: formatDate(endOfPrevMonth)
        })
    } else if (form.period_type === 'quarterly') {
        const quarter = Math.floor(currentMonth / 3) + 1
        const startOfQuarter = new Date(currentYear, (quarter - 1) * 3, 1)
        const endOfQuarter = new Date(currentYear, quarter * 3, 0)

        dateSuggestions.value.push({
            label: `Quarter ${quarter} ${currentYear}`,
            start_date: formatDate(startOfQuarter),
            end_date: formatDate(endOfQuarter)
        })
    } else if (form.period_type === 'yearly') {
        const startOfYear = new Date(currentYear, 0, 1)
        const endOfYear = new Date(currentYear, 11, 31)

        dateSuggestions.value.push({
            label: `Year ${currentYear}`,
            start_date: formatDate(startOfYear),
            end_date: formatDate(endOfYear)
        })

        const startOfPrevYear = new Date(currentYear - 1, 0, 1)
        const endOfPrevYear = new Date(currentYear - 1, 11, 31)

        dateSuggestions.value.push({
            label: `Year ${currentYear - 1}`,
            start_date: formatDate(startOfPrevYear),
            end_date: formatDate(endOfPrevYear)
        })
    }
}

const applySuggestion = (suggestion) => {
    form.start_date = suggestion.start_date
    form.end_date = suggestion.end_date

    if (!form.period_name) {
        form.period_name = `Income Statement ${suggestion.label}`
    }
}

const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

const getMonthName = (monthIndex) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    return months[monthIndex < 0 ? monthIndex + 12 : monthIndex]
}
</script>
