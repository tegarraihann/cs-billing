<template>
    <AdminKeuanganLayout>
        <Head title="Income Statement" />
        
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Income Statement</h1>
                        <p class="mt-1 text-sm text-gray-600">Manage the company's income statement periods.</p>
                    </div>
                    <Link 
                        :href="route('admin-keuangan.profit-loss.create')"
                        class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <Plus class="w-4 h-4 mr-2" />
                        Add Period
                    </Link>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <Calendar class="h-6 w-6 text-gray-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Periods</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.total_periods }}</dd>
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
                                        <dt class="text-sm font-medium text-gray-500 truncate">Closed Periods</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ stats.closed_periods }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <TrendingUp class="h-6 w-6 text-blue-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Revenue This Month</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(stats.current_revenue) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <DollarSign :class="stats.current_profit >= 0 ? 'h-6 w-6 text-green-400' : 'h-6 w-6 text-red-400'" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Net Profit This Month</dt>
                                        <dd :class="stats.current_profit >= 0 ? 'text-lg font-medium text-green-600' : 'text-lg font-medium text-red-600'">
                                            {{ formatCurrency(stats.current_profit) }}
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Period Filters</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                                <input
                                    v-model="formFilters.start_date"
                                    type="date"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                                <input
                                    v-model="formFilters.end_date"
                                    type="date"
                                    class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                                />
                            </div>
                        </div>
                        <div class="flex justify-end space-x-3 mt-4">
                            <button
                                @click="clearFilters"
                                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Clear
                            </button>
                            <button
                                @click="applyFilters"
                                class="px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                            >
                                Apply Filters
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
                                            Period
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Dates
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total Revenue
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Net Profit
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Created By
                                        </th>
                                        <th scope="col" class="relative px-6 py-3">
                                            <span class="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="period in periods.data" :key="period.id" class="hover:bg-gray-50">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">{{ period.period_name }}</div>
                                            <div class="text-sm text-gray-500">{{ period.period_code }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ formatDate(period.start_date) }} - {{ formatDate(period.end_date) }}</div>
                                            <div class="text-sm text-gray-500">{{ period.period_type }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm font-medium text-gray-900">{{ formatCurrency(period.total_revenue) }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div :class="period.net_profit >= 0 ? 'text-sm font-medium text-green-600' : 'text-sm font-medium text-red-600'">
                                                {{ formatCurrency(period.net_profit) }}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span :class="getStatusBadge(period.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                                {{ getStatusText(period.status) }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {{ period.creator.name }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div class="flex space-x-2">
                                                <Link 
                                                    :href="route('admin-keuangan.profit-loss.show', {
                                                        profitLoss: period.id,
                                                        ...currentIndexQuery
                                                    })"
                                                    class="text-sage-600 hover:text-sage-900 p-2 rounded-md hover:bg-sage-50"
                                                title="View Details"
                                                >
                                                    <Eye class="w-4 h-4" />
                                                </Link>
                                                <Link 
                                                    v-if="period.status !== 'closed'"
                                                    :href="route('admin-keuangan.profit-loss.edit', {
                                                        profitLoss: period.id,
                                                        ...currentIndexQuery
                                                    })"
                                                    class="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50"
                                                    title="Edit"
                                                >
                                                    <Edit class="w-4 h-4" />
                                                </Link>
                                                <button
                                                    v-if="period.status !== 'closed'"
                                                    @click="deletePeriod(period)"
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

                        <div v-if="periods.data.length === 0" class="text-center py-12">
                            <Calendar class="mx-auto h-12 w-12 text-gray-400" />
                            <h3 class="mt-2 text-sm font-medium text-gray-900">No periods available</h3>
                            <p class="mt-1 text-sm text-gray-500">Start by creating the first income statement period</p>
                        </div>

                        <div v-if="periods.links" class="mt-6">
                            <Pagination :data="periods" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { computed } from 'vue'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import Pagination from '@/Components/Pagination.vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { Plus, Calendar, CheckCircle, TrendingUp, DollarSign, Eye, Edit, Trash2 } from 'lucide-vue-next'

const props = defineProps({
    periods: Object,
    stats: Object,
    filters: {
        type: Object,
        default: () => ({})
    }
})

const formFilters = reactive({
    start_date: props.filters.start_date || '',
    end_date: props.filters.end_date || ''
})

const currentIndexQuery = computed(() => {
    const query = {
        start_date: formFilters.start_date || '',
        end_date: formFilters.end_date || '',
    }

    const currentPage = props.periods?.current_page
    if (currentPage && Number(currentPage) > 1) {
        query.page = currentPage
    }

    return query
})

const applyFilters = () => {
    router.get(route('admin-keuangan.profit-loss.index'), {
        ...formFilters,
        page: 1,
    }, {
        preserveState: true,
        preserveScroll: true,
        replace: true,
    })
}

const clearFilters = () => {
    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
    const format = (date) => date.toISOString().split('T')[0]
    formFilters.start_date = format(start)
    formFilters.end_date = format(end)

    router.get(route('admin-keuangan.profit-loss.index'), formFilters, {
        preserveState: true,
        preserveScroll: true,
        replace: true
    })
}

const setDefaultMonthFilter = () => {
    if (props.filters.start_date || props.filters.end_date) {
        return
    }
    clearFilters()
}

onMounted(() => {
    setDefaultMonthFilter()
})

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

const getStatusBadge = (status) => {
    const badges = {
        'draft': 'bg-yellow-100 text-yellow-800',
        'published': 'bg-blue-100 text-blue-800', 
        'closed': 'bg-green-100 text-green-800'
    }
    return badges[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status) => {
    const texts = {
        'draft': 'Draft',
        'published': 'Published',
        'closed': 'Closed'
    }
    return texts[status] || status
}

const deletePeriod = (period) => {
    if (confirm('Are you sure you want to delete this period? All related data will also be removed.')) {
        router.delete(route('admin-keuangan.profit-loss.destroy', {
            profitLoss: period.id,
            ...currentIndexQuery.value
        }))
    }
}
</script>
