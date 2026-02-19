<template>
    <AdminKeuanganLayout>
        <Head title="Employee Salary" />
        
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Employee Salary</h1>
                        <p class="mt-1 text-sm text-gray-600">Manage employee salary records.</p>
                    </div>
                    <div class="flex space-x-3">
                        <Link
                            :href="route('admin-keuangan.employee-salary.all-in-create')"
                            class="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <Globe class="w-4 h-4 mr-2" />
                            ALL IN
                        </Link>
                        <Link
                            :href="route('admin-keuangan.employee-salary.bulk-create')"
                            class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <Users class="w-4 h-4 mr-2" />
                            Bulk Input
                        </Link>
                        <Link 
                            :href="route('admin-keuangan.employee-salary.create')"
                            class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            <Plus class="w-4 h-4 mr-2" />
                            Add Salary
                        </Link>
                    </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <Users class="h-6 w-6 text-gray-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.total_employees }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <DollarSign class="h-6 w-6 text-blue-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total This Month</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats.current_month_total) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <Clock class="h-6 w-6 text-yellow-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Draft</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.draft_count }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <CheckCircle class="h-6 w-6 text-green-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Paid</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.paid_count }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Filters</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Period</label>
                                <select
                                    v-model="filterForm.period"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                >
                                    <option value="">All Periods</option>
                                    <option v-for="period in periods" :key="period" :value="period">
                                        {{ formatPeriod(period) }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Division</label>
                                <select
                                    v-model="filterForm.division"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                >
                                    <option value="">All Divisions</option>
                                    <option v-for="(label, key) in divisions" :key="key" :value="key">
                                        {{ label }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <select
                                    v-model="filterForm.status"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                >
                                    <option value="">All Statuses</option>
                                    <option value="draft">Draft</option>
                                    <option value="paid">Paid</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-4 flex items-center gap-2">
                            <button
                                type="button"
                                @click="applyFilters"
                                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                            >
                                Apply Filters
                            </button>
                            <button
                                type="button"
                                @click="resetFilters"
                                class="inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Employee
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Position
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Period
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total Salary
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Salary Date
                                        </th>
                                        <th scope="col" class="relative px-6 py-3">
                                            <span class="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-if="!salaries || !salaries.data || salaries.data.length === 0">
                                        <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                                            <div class="flex flex-col items-center">
                                                <Users class="w-12 h-12 text-gray-300 mb-4" />
                                                <h3 class="text-lg font-medium text-gray-900 mb-2">No salary records yet</h3>
                                                <p class="text-sm text-gray-500 mb-4">Start by adding an employee salary record.</p>
                                                <Link 
                                                    :href="route('admin-keuangan.employee-salary.create')"
                                                    class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                >
                                                    <Plus class="w-4 h-4 mr-2" />
                                                    Add First Salary
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-else v-for="salary in salaries.data" :key="salary.id" class="hover:bg-gray-50">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">{{ salary.employee_name }}</div>
                                            <div class="text-sm text-gray-500">{{ salary.employee_id || 'N/A' }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ salary.position }}</div>
                                            <div class="text-sm text-gray-500">{{ getDivisionLabel(salary.division) }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {{ formatPeriod(salary.period_month) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">{{ formatCurrency(salary.total_salary) }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span :class="getStatusBadge(salary.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                                {{ getStatusText(salary.status) }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {{ formatDate(salary.salary_date) }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div class="flex space-x-2">
                                                <Link 
                                                    :href="route('admin-keuangan.employee-salary.show', { employeeSalary: salary.id, ...currentIndexQuery })"
                                                    class="text-sage-600 hover:text-sage-900 p-2 rounded-md hover:bg-sage-50"
                                                title="View Details"
                                                >
                                                    <Eye class="w-4 h-4" />
                                                </Link>
                                                <Link 
                                                    v-if="salary.status === 'draft'"
                                                    :href="route('admin-keuangan.employee-salary.edit', salary.id)"
                                                    class="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50"
                                                    title="Edit"
                                                >
                                                    <Edit class="w-4 h-4" />
                                                </Link>
                                                <button
                                                    v-if="salary.status === 'draft'"
                                                    @click="openApproveModal(salary)"
                                                    class="text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50"
                                                    title="Approve"
                                                >
                                                    <Check class="w-4 h-4" />
                                                </button>
                                                <button
                                                    v-if="salary.status === 'draft'"
                                                    @click="deleteSalary(salary)"
                                                    class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 class="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div v-if="salaries && salaries.links" class="mt-6 bg-white px-4 py-3 border border-gray-200 rounded-lg">
                            <div class="flex items-center justify-between">
                                <div class="text-sm text-gray-700">
                                    Showing {{ salaries.from || 0 }} to {{ salaries.to || 0 }} of {{ salaries.total || 0 }} results
                                </div>
                                <div class="flex space-x-1">
                                    <template v-for="link in salaries.links" :key="link.label">
                                        <button
                                            v-if="link.url"
                                            @click="visitPage(link.url)"
                                            :class="[
                                                'px-3 py-2 text-sm rounded-md',
                                                link.active
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-white text-gray-500 hover:text-gray-700 border border-gray-300'
                                            ]"
                                            v-html="link.label"
                                        ></button>
                                        <span
                                            v-else
                                            class="px-3 py-2 text-sm text-gray-400"
                                            v-html="link.label"
                                        ></span>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showApproveModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">Approve & Pay Salary</h3>
                    <button @click="closeApproveModal" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div class="space-y-4">
                    <div class="text-sm text-gray-600">
                        {{ selectedSalary ? `Salary for ${selectedSalary.employee_name} totaling ${formatCurrency(selectedSalary.total_salary)}` : '' }}
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
                        <select
                            v-model="selectedBankAccountId"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        >
                            <option value="" disabled>Select bank account</option>
                            <option v-for="account in bankAccounts" :key="account.id" :value="account.id">
                                {{ account.bank_name }} - {{ account.account_number }} ({{ account.account_name }})
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">P&amp;L Account (Salary Expense)</label>
                        <select
                            v-model="selectedPlAccountId"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        >
                            <option value="" disabled>Select P&amp;L account</option>
                            <option v-for="account in salaryAccounts" :key="account.id" :value="account.id">
                                {{ account.account_code }} - {{ account.account_name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        @click="closeApproveModal"
                        class="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        @click="submitApprove"
                        :disabled="!selectedBankAccountId || !selectedPlAccountId"
                        class="px-4 py-2 rounded-md text-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Approve & Pay
                    </button>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { Head, Link, router, useRemember } from '@inertiajs/vue3'
import { Plus, Users, DollarSign, Clock, CheckCircle, Eye, Edit, Check, Trash2, Globe } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const props = defineProps({
    salaries: Object,
    stats: Object,
    filters: Object,
    divisions: Object,
    periods: Array,
    bankAccounts: Array,
    salaryAccounts: Array,
})

const filterForm = useRemember({
    period: props.filters?.period || '',
    division: props.filters?.division || '',
    status: props.filters?.status || '',
}, 'employee-salary-filters')

const currentIndexQuery = computed(() => {
    const query = {
        period: filterForm.period || undefined,
        division: filterForm.division || undefined,
        status: filterForm.status || undefined,
    }

    const currentPage = props.salaries?.current_page
    if (currentPage && Number(currentPage) > 1) {
        query.page = currentPage
    }

    return query
})

const applyFilters = () => {
    router.get(route('admin-keuangan.employee-salary.index'), {
        period: filterForm.period || undefined,
        division: filterForm.division || undefined,
        status: filterForm.status || undefined,
    }, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    })
}

const resetFilters = () => {
    filterForm.period = ''
    filterForm.division = ''
    filterForm.status = ''
    applyFilters()
}

const visitPage = (url) => {
    router.visit(url, {
        data: {
            period: filterForm.period || undefined,
            division: filterForm.division || undefined,
            status: filterForm.status || undefined,
        },
        preserveState: true,
        preserveScroll: true,
        replace: true,
    })
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR'
    }).format(amount || 0)
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const formatPeriod = (period) => {
    const [year, month] = period.split('-')
    const months = {
        '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr',
        '05': 'May', '06': 'Jun', '07': 'Jul', '08': 'Aug',
        '09': 'Sep', '10': 'Oct', '11': 'Nov', '12': 'Dec'
    }
    return `${months[month]} ${year}`
}

const getDivisionLabel = (division) => {
    const labels = {
        'customer_support': 'Customer Support',
        'marketing': 'Marketing',
        'finance': 'Finance',
        'operations': 'Operations',
        'management': 'Management'
    }
    return labels[division] || division
}

const getStatusBadge = (status) => {
    const badges = {
        'draft': 'bg-yellow-100 text-yellow-800',
        'paid': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
    }
    return badges[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
    const texts = {
        'draft': 'Draft',
        'paid': 'Paid',
        'cancelled': 'Cancelled'
    }
    return texts[status] || status
}

const showApproveModal = ref(false)
const selectedSalary = ref(null)
const selectedBankAccountId = ref('')
const selectedPlAccountId = ref('')

const openApproveModal = (salary) => {
    selectedSalary.value = salary
    selectedBankAccountId.value = ''
    selectedPlAccountId.value = ''
    showApproveModal.value = true
}

const closeApproveModal = () => {
    showApproveModal.value = false
    selectedSalary.value = null
    selectedBankAccountId.value = ''
    selectedPlAccountId.value = ''
}

const submitApprove = () => {
    if (!selectedSalary.value || !selectedBankAccountId.value || !selectedPlAccountId.value) return

    router.post(
        route('admin-keuangan.employee-salary.approve', selectedSalary.value.id),
        {
            bank_account_id: selectedBankAccountId.value,
            pl_account_id: selectedPlAccountId.value,
        },
        {
            onFinish: closeApproveModal,
        }
    )
}

const deleteSalary = (salary) => {
    if (confirm(`Delete salary record for ${salary.employee_name}?`)) {
        router.delete(route('admin-keuangan.employee-salary.destroy', salary.id))
    }
}
</script>
