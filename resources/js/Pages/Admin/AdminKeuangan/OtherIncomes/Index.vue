<template>
    <AdminKeuanganLayout>
        <Head title="Pendapatan Lain-lain" />

        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h1 class="text-2xl font-bold text-gray-900">Pendapatan Lain-lain</h1>
                        <p class="mt-1 text-sm text-gray-600">Kelola pendapatan selain dari jasa logistik</p>
                    </div>
                    <Link
                        :href="route('admin-keuangan.other-incomes.create')"
                        class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        <Plus class="w-4 h-4 mr-2" />
                        Tambah Pendapatan
                    </Link>
                </div>

                <!-- Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <TrendingUp class="h-6 w-6 text-blue-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Total Semua</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(summary.total_amount) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <Calendar class="h-6 w-6 text-green-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Bulan Ini</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(summary.total_this_month) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <CalendarDays class="h-6 w-6 text-purple-400" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Tahun Ini</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(summary.total_this_year) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white overflow-hidden shadow rounded-lg">
                        <div class="p-5">
                            <div class="flex items-center">
                                <div class="flex-shrink-0">
                                    <CheckCircle class="h-6 w-6 text-green-500" />
                                </div>
                                <div class="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt class="text-sm font-medium text-gray-500 truncate">Posted</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(summary.total_posted) }}</dd>
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
                                        <dt class="text-sm font-medium text-gray-500 truncate">Pending</dt>
                                        <dd class="text-lg font-medium text-gray-900">{{ formatCurrency(summary.total_not_posted) }}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Filters -->
                <div class="bg-white shadow rounded-lg mb-6">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
                                <input
                                    v-model="filterForm.start_date"
                                    type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Akhir</label>
                                <input
                                    v-model="filterForm.end_date"
                                    type="date"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                                <select
                                    v-model="filterForm.category"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                >
                                    <option value="">Semua Kategori</option>
                                    <option v-for="category in categories" :key="category" :value="category">
                                        {{ category }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                <select
                                    v-model="filterForm.posted"
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="yes">Posted</option>
                                    <option value="no">Pending</option>
                                </select>
                            </div>
                        </div>
                        <div class="mt-4 flex space-x-2">
                            <button
                                @click="applyFilters"
                                class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition"
                            >
                                <Filter class="w-4 h-4 mr-2" />
                                Terapkan Filter
                            </button>
                            <button
                                @click="resetFilters"
                                class="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
                            >
                                <X class="w-4 h-4 mr-2" />
                                Reset
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Table -->
                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 sm:p-6">
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kategori
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Deskripsi
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Jumlah
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Dibuat Oleh
                                        </th>
                                        <th scope="col" class="relative px-6 py-3">
                                            <span class="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr v-for="income in otherIncomes.data" :key="income.id" class="hover:bg-gray-50">
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <div class="text-sm text-gray-900">{{ formatDate(income.transaction_date) }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full" :class="getCategoryBadge(income.category)">
                                                {{ income.category }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4">
                                            <div class="text-sm text-gray-900">{{ income.description }}</div>
                                            <div v-if="income.notes" class="text-sm text-gray-500">{{ income.notes }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right">
                                            <div class="text-sm font-medium text-green-600">{{ formatCurrency(income.amount) }}</div>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span :class="income.posted_to_profit_loss ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                                {{ income.posted_to_profit_loss ? 'Posted' : 'Pending' }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {{ income.creator?.name || '-' }}
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div class="flex justify-end space-x-2">
                                                <Link
                                                    :href="route('admin-keuangan.other-incomes.show', income.id)"
                                                    class="text-sage-600 hover:text-sage-900 p-2 rounded-md hover:bg-sage-50"
                                                    title="Lihat Detail"
                                                >
                                                    <Eye class="w-4 h-4" />
                                                </Link>
                                                <Link
                                                    v-if="!income.posted_to_profit_loss"
                                                    :href="route('admin-keuangan.other-incomes.edit', income.id)"
                                                    class="text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50"
                                                    title="Edit"
                                                >
                                                    <Edit class="w-4 h-4" />
                                                </Link>
                                                <button
                                                    v-if="!income.posted_to_profit_loss"
                                                    @click="postToProfitLoss(income)"
                                                    class="text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50"
                                                    title="Post ke Laba Rugi"
                                                >
                                                    <CheckCircle class="w-4 h-4" />
                                                </button>
                                                <button
                                                    v-if="income.posted_to_profit_loss"
                                                    @click="unpostFromProfitLoss(income)"
                                                    class="text-orange-600 hover:text-orange-900 p-2 rounded-md hover:bg-orange-50"
                                                    title="Unpost dari Laba Rugi"
                                                >
                                                    <XCircle class="w-4 h-4" />
                                                </button>
                                                <button
                                                    v-if="!income.posted_to_profit_loss"
                                                    @click="deleteIncome(income)"
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

                        <div v-if="otherIncomes.data.length === 0" class="text-center py-12">
                            <TrendingUp class="mx-auto h-12 w-12 text-gray-400" />
                            <h3 class="mt-2 text-sm font-medium text-gray-900">Belum ada pendapatan lain-lain</h3>
                            <p class="mt-1 text-sm text-gray-500">Mulai dengan menambahkan pendapatan lain-lain pertama</p>
                            <div class="mt-6">
                                <Link
                                    :href="route('admin-keuangan.other-incomes.create')"
                                    class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700"
                                >
                                    <Plus class="w-4 h-4 mr-2" />
                                    Tambah Pendapatan
                                </Link>
                            </div>
                        </div>

                        <div v-if="otherIncomes.links && otherIncomes.data.length > 0" class="mt-6">
                            <Pagination :data="otherIncomes" />
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
import { ref } from 'vue'
import {
    Plus,
    Calendar,
    CalendarDays,
    CheckCircle,
    TrendingUp,
    Clock,
    Eye,
    Edit,
    Trash2,
    Filter,
    X,
    XCircle
} from 'lucide-vue-next'

const props = defineProps({
    otherIncomes: Object,
    summary: Object,
    categories: Array,
    filters: Object,
})

const filterForm = ref({
    start_date: props.filters?.start_date || '',
    end_date: props.filters?.end_date || '',
    category: props.filters?.category || '',
    posted: props.filters?.posted || '',
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

const getCategoryBadge = (category) => {
    const badges = {
        'Bunga Bank Mandiri': 'bg-blue-100 text-blue-800',
        'Bunga Bank BCA': 'bg-purple-100 text-purple-800',
        'Lainnya': 'bg-gray-100 text-gray-800'
    }
    return badges[category] || 'bg-gray-100 text-gray-800'
}

const applyFilters = () => {
    router.get(route('admin-keuangan.other-incomes.index'), filterForm.value, {
        preserveState: true,
        preserveScroll: true,
    })
}

const resetFilters = () => {
    filterForm.value = {
        start_date: '',
        end_date: '',
        category: '',
        posted: '',
    }
    router.get(route('admin-keuangan.other-incomes.index'))
}

const postToProfitLoss = (income) => {
    if (confirm(`Posting pendapatan "${income.description}" ke Laba Rugi?`)) {
        router.post(route('admin-keuangan.other-incomes.post-to-profit-loss', income.id))
    }
}

const unpostFromProfitLoss = (income) => {
    if (confirm(`Unpost pendapatan "${income.description}" dari Laba Rugi?`)) {
        router.post(route('admin-keuangan.other-incomes.unpost-from-profit-loss', income.id))
    }
}

const deleteIncome = (income) => {
    if (confirm(`Apakah Anda yakin ingin menghapus pendapatan "${income.description}"?`)) {
        router.delete(route('admin-keuangan.other-incomes.destroy', income.id))
    }
}
</script>
