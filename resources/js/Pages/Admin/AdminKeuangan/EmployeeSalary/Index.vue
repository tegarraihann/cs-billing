<template>
    <AdminKeuanganLayout>
        <Head title="Gaji Karyawan" />
        
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Gaji Karyawan</h1>
                        <p class="mt-1 text-sm text-gray-600">Kelola data gaji karyawan perusahaan</p>
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
                            Tambah Gaji
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
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Karyawan</dt>
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
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Bulan Ini</dt>
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
                                        <dt class="text-sm font-medium text-gray-500 truncate">Dibayar</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.paid_count }}</dd>
                                    </dl>
                                </div>
                            </div>
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
                                            Karyawan
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Posisi
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Periode
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total Gaji
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal Gaji
                                        </th>
                                        <th scope="col" class="relative px-6 py-3">
                                            <span class="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-if="!salaries || !salaries.data || salaries.data.length === 0">
                                        <td colspan="6" class="px-6 py-12 text-center text-gray-500">
                                            <div class="flex flex-col items-center">
                                                <Users class="w-12 h-12 text-gray-300 mb-4" />
                                                <h3 class="text-lg font-medium text-gray-900 mb-2">Belum ada data gaji</h3>
                                                <p class="text-sm text-gray-500 mb-4">Mulai dengan menambahkan data gaji karyawan</p>
                                                <Link 
                                                    :href="route('admin-keuangan.employee-salary.create')"
                                                    class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                                >
                                                    <Plus class="w-4 h-4 mr-2" />
                                                    Tambah Gaji Pertama
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
                                                    :href="route('admin-keuangan.employee-salary.show', salary.id)"
                                                    class="text-sage-600 hover:text-sage-900 p-2 rounded-md hover:bg-sage-50"
                                                    title="Lihat Detail"
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
                                                    @click="approveSalary(salary)"
                                                    class="text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50"
                                                    title="Approve"
                                                >
                                                    <Check class="w-4 h-4" />
                                                </button>
                                                <button
                                                    v-if="salary.status === 'draft'"
                                                    @click="deleteSalary(salary)"
                                                    class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50"
                                                    title="Hapus"
                                                >
                                                    <Trash2 class="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>


                        <div v-if="salaries && salaries.links && salaries.last_page > 1" class="mt-6">
                            <Pagination :links="salaries.links" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import Pagination from '@/Components/Pagination.vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { Plus, Users, DollarSign, Clock, CheckCircle, Eye, Edit, Check, Trash2, Globe } from 'lucide-vue-next'

defineProps({
    salaries: Object,
    stats: Object,
    filters: Object,
    divisions: Object,
    periods: Array,
})

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(amount || 0)
}

const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

const formatPeriod = (period) => {
    const [year, month] = period.split('-')
    const months = {
        '01': 'Jan', '02': 'Feb', '03': 'Mar', '04': 'Apr', 
        '05': 'Mei', '06': 'Jun', '07': 'Jul', '08': 'Agu',
        '09': 'Sep', '10': 'Okt', '11': 'Nov', '12': 'Des'
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
        'paid': 'Dibayar',
        'cancelled': 'Dibatalkan'
    }
    return texts[status] || status
}

const approveSalary = (salary) => {
    if (confirm(`Approve gaji ${salary.employee_name} sebesar ${formatCurrency(salary.total_salary)}?`)) {
        router.post(route('admin-keuangan.employee-salary.approve', salary.id))
    }
}

const deleteSalary = (salary) => {
    if (confirm(`Hapus data gaji ${salary.employee_name}?`)) {
        router.delete(route('admin-keuangan.employee-salary.destroy', salary.id))
    }
}
</script>