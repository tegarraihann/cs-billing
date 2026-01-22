<template>
    <AdminKeuanganLayout>
        <Head title="Bulk Employee Salary Input" />
        
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-6">
                    <Link 
                        :href="route('admin-keuangan.employee-salary.index')" 
                        class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    >
                        <ArrowLeft class="w-4 h-4 mr-2" />
                        Back to Salary List
                    </Link>
                    <h1 class="text-2xl font-bold text-gray-900">Bulk Employee Salary Input</h1>
                    <p class="mt-1 text-sm text-gray-600">Add salary data for multiple employees at once.</p>
                </div>

                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
                    <div class="px-6 py-8">
                        <form @submit.prevent="submit">
                            <!-- Period Information -->
                            <div class="border-b border-gray-200 pb-6 mb-6">
                                <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Period Information</h3>
                                
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label for="period_month" class="block text-sm font-medium text-gray-700 mb-2">
                                            Period (Month-Year) <span class="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="period_month"
                                            v-model="form.period_month"
                                            type="month"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.period_month }"
                                        />
                                        <div v-if="errors.period_month" class="mt-1 text-sm text-red-600">
                                            {{ errors.period_month }}
                                        </div>
                                    </div>

                                    <div>
                                        <label for="salary_date" class="block text-sm font-medium text-gray-700 mb-2">
                                            Salary Date <span class="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="salary_date"
                                            v-model="form.salary_date"
                                            type="date"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.salary_date }"
                                        />
                                        <div v-if="errors.salary_date" class="mt-1 text-sm text-red-600">
                                            {{ errors.salary_date }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Employee List -->
                            <div class="mb-6">
                                <div class="flex justify-between items-center mb-4">
                                    <h3 class="text-lg font-medium leading-6 text-gray-900">Employee Data</h3>
                                    <button
                                        type="button"
                                        @click="addEmployee"
                                        class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-sage-700 bg-sage-100 hover:bg-sage-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                                    >
                                        <Plus class="w-4 h-4 mr-2" />
                                        Add Employee
                                    </button>
                                </div>

                                <div v-if="form.employees.length === 0" class="text-center py-12 border-2 border-gray-300 border-dashed rounded-lg">
                                    <Users class="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                    <h3 class="text-sm font-medium text-gray-900 mb-2">No employees added yet</h3>
                                    <p class="text-sm text-gray-500 mb-4">Start by adding the first employee.</p>
                                    <button
                                        type="button"
                                        @click="addEmployee"
                                        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                                    >
                                        <Plus class="w-4 h-4 mr-2" />
                                        Add First Employee
                                    </button>
                                </div>

                                <div v-else class="space-y-6">
                                    <div 
                                        v-for="(employee, index) in form.employees" 
                                        :key="index"
                                        class="border border-gray-200 rounded-lg p-6 bg-gray-50"
                                    >
                                        <div class="flex justify-between items-center mb-4">
                                            <h4 class="text-md font-medium text-gray-900">Employee #{{ index + 1 }}</h4>
                                            <button
                                                v-if="form.employees.length > 1"
                                                type="button"
                                                @click="removeEmployee(index)"
                                                class="text-red-600 hover:text-red-900 p-1"
                                            >
                                                <Trash2 class="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div class="md:col-span-2">
                                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                                    Select Employee (optional)
                                                </label>
                                                <select
                                                    v-model="employee.employee_record_id"
                                                    @change="applyEmployee(index)"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                >
                                                    <option value="">Select employee from master data</option>
                                                    <option v-for="option in employees" :key="option.id" :value="option.id">
                                                        {{ option.nama }}{{ option.employee_id ? ` (${option.employee_id})` : '' }}
                                                    </option>
                                                </select>
                                                <p class="mt-1 text-xs text-gray-500">
                                                    Auto-fills Name, ID, and Position from the employee record.
                                                </p>
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                                    Employee Name <span class="text-red-500">*</span>
                                                </label>
                                                <input
                                                    v-model="employee.employee_name"
                                                    type="text"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                    :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors[`employees.${index}.employee_name`] }"
                                                    placeholder="Employee full name"
                                                />
                                                <div v-if="errors[`employees.${index}.employee_name`]" class="mt-1 text-sm text-red-600">
                                                    {{ errors[`employees.${index}.employee_name`] }}
                                                </div>
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                                    Employee ID
                                                </label>
                                                <input
                                                    v-model="employee.employee_id"
                                                    type="text"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                    placeholder="Employee ID (optional)"
                                                />
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                                    Division <span class="text-red-500">*</span>
                                                </label>
                                                <select
                                                    v-model="employee.division"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                    :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors[`employees.${index}.division`] }"
                                                >
                                                    <option value="">Select Division</option>
                                                    <option v-for="(label, value) in divisions" :key="value" :value="value">
                                                        {{ label }}
                                                    </option>
                                                </select>
                                                <div v-if="errors[`employees.${index}.division`]" class="mt-1 text-sm text-red-600">
                                                    {{ errors[`employees.${index}.division`] }}
                                                </div>
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                                    Position <span class="text-red-500">*</span>
                                                </label>
                                                <input
                                                    v-model="employee.position"
                                                    type="text"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                    :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors[`employees.${index}.position`] }"
                                                    placeholder="Employee position"
                                                />
                                                <div v-if="errors[`employees.${index}.position`]" class="mt-1 text-sm text-red-600">
                                                    {{ errors[`employees.${index}.position`] }}
                                                </div>
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                                    Basic Salary <span class="text-red-500">*</span>
                                                </label>
                                                <input
                                                    v-model="employee.basic_salary"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                    :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors[`employees.${index}.basic_salary`] }"
                                                    placeholder="0"
                                                />
                                                <div v-if="errors[`employees.${index}.basic_salary`]" class="mt-1 text-sm text-red-600">
                                                    {{ errors[`employees.${index}.basic_salary`] }}
                                                </div>
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                                    Allowances
                                                </label>
                                                <input
                                                    v-model="employee.allowances"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                    placeholder="0"
                                                />
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                                    Deductions
                                                </label>
                                                <input
                                                    v-model="employee.deductions"
                                                    type="number"
                                                    step="0.01"
                                                    min="0"
                                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                    placeholder="0"
                                                />
                                            </div>

                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-2">
                                                    Total Salary
                                                </label>
                                                <div class="mt-1 block w-full border border-gray-200 bg-gray-100 rounded-md shadow-sm py-2 px-3 text-sm font-semibold text-gray-900">
                                                    {{ formatCurrency(calculateTotal(employee)) }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Summary -->
                            <div v-if="form.employees.length > 0" class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <Info class="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div class="ml-3">
                                        <h3 class="text-sm font-medium text-blue-800">Summary</h3>
                                        <div class="mt-2 text-sm text-blue-700">
                                            <p>Total Employees: <span class="font-semibold">{{ form.employees.length }}</span></p>
                                            <p>Total Salary Amount: <span class="font-semibold">{{ formatCurrency(grandTotal) }}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex justify-end space-x-3">
                                <Link
                                    :href="route('admin-keuangan.employee-salary.index')"
                                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                                >
                                    Cancel
                                </Link>
                                <button
                                    type="submit"
                                    :disabled="processing || form.employees.length === 0"
                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"
                                >
                                    <Loader2 v-if="processing" class="animate-spin -ml-1 mr-2 h-4 w-4" />
                                    {{ processing ? 'Saving...' : `Save ${form.employees.length} Salary Records` }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Help Info -->
                <div class="mt-6 bg-gray-50 border border-gray-200 rounded-md p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <HelpCircle class="h-5 w-5 text-gray-400" />
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-gray-800">Bulk Input Tips</h3>
                            <div class="mt-2 text-sm text-gray-600">
                                <ul class="list-disc list-inside space-y-1">
                                    <li>Use this feature to input salaries for multiple employees with the same period.</li>
                                    <li>All records are saved as "Draft" and can be edited before approval.</li>
                                    <li>Total salary is calculated automatically: Basic Salary + Allowances - Deductions.</li>
                                    <li>You can add or remove employees before saving.</li>
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
import { ArrowLeft, Plus, Trash2, Users, Info, HelpCircle, Loader2 } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
    divisions: Object,
    employees: {
        type: Array,
        default: () => [],
    },
    errors: Object,
})

const form = useForm({
    period_month: new Date().toISOString().slice(0, 7), // Current month
    salary_date: new Date().toISOString().slice(0, 10), // Today
    employees: []
})

const processing = computed(() => form.processing)

const addEmployee = () => {
    form.employees.push({
        employee_record_id: '',
        employee_name: '',
        employee_id: '',
        division: '',
        position: '',
        basic_salary: 0,
        allowances: 0,
        deductions: 0,
    })
}

const removeEmployee = (index) => {
    if (confirm('Remove this employee entry?')) {
        form.employees.splice(index, 1)
    }
}

const applyEmployee = (index) => {
    const selectedId = form.employees[index]?.employee_record_id
    const selected = props.employees.find((employee) => String(employee.id) === String(selectedId))
    if (!selected) {
        return
    }
    form.employees[index].employee_name = selected.nama || ''
    form.employees[index].employee_id = selected.employee_id || ''
    form.employees[index].position = selected.posisi || ''
}

const calculateTotal = (employee) => {
    const basic = parseFloat(employee.basic_salary) || 0
    const allowances = parseFloat(employee.allowances) || 0
    const deductions = parseFloat(employee.deductions) || 0
    return basic + allowances - deductions
}

const grandTotal = computed(() => {
    return form.employees.reduce((total, employee) => {
        return total + calculateTotal(employee)
    }, 0)
})

const submit = () => {
    form.transform((data) => ({
        ...data,
        employees: data.employees.map(({ employee_record_id, ...rest }) => rest),
    })).post(route('admin-keuangan.employee-salary.bulk-store'))
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount || 0)
}

// Add first employee by default
if (form.employees.length === 0) {
    addEmployee()
}
</script>
