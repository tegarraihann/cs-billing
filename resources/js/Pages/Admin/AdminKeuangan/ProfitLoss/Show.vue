<template>
    <AdminKeuanganLayout>
        <Head :title="period.period_name" />
        
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-6">
                    <Link 
                        :href="route('admin-keuangan.profit-loss.index')" 
                        class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    >
                        <ArrowLeft class="w-4 h-4 mr-2" />
                        Kembali ke Laporan Laba Rugi
                    </Link>
                    
                    <div class="flex justify-between items-start">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">{{ period.period_name }}</h1>
                            <p class="mt-1 text-sm text-gray-600">
                                {{ formatDate(period.start_date) }} - {{ formatDate(period.end_date) }}
                                <span class="mx-2">•</span>
                                <span :class="getStatusBadge(period.status)" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                    {{ getStatusText(period.status) }}
                                </span>
                            </p>
                        </div>
                        
                        <div class="flex space-x-3">
                            <button
                                @click="exportPdf"
                                :disabled="isExporting"
                                :class="[
                                    'inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md transition-colors',
                                    isExporting
                                        ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                        : 'text-white bg-red-600 hover:bg-red-700 border-red-600'
                                ]"
                            >
                                <Download class="w-4 h-4 mr-2" />
                                {{ isExporting ? 'Exporting...' : 'Export PDF' }}
                            </button>

                            <button
                                v-if="period.status !== 'closed'"
                                @click="regenerateEntries"
                                :disabled="loading"
                                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                            >
                                <RefreshCw class="w-4 h-4 mr-2" />
                                Regenerate Data
                            </button>

                            <Link
                                v-if="period.status !== 'closed'"
                                :href="route('admin-keuangan.profit-loss.edit', period.id)"
                                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                            >
                                <Edit class="w-4 h-4 mr-2" />
                                Edit Periode
                            </Link>

                            <button
                                v-if="period.status !== 'closed'"
                                @click="finalizePeriod"
                                :disabled="loading"
                                class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                <CheckCircle class="w-4 h-4 mr-2" />
                                Tutup Periode
                            </button>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div class="lg:col-span-2 space-y-8">
                        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">PENDAPATAN</h3>
                            </div>
                            <div class="px-4 py-5 sm:p-6">
                                <div class="space-y-4">
                                    <div v-if="reportData.revenues.main.length > 0">
                                        <h4 class="text-sm font-medium text-gray-700 mb-2">Pendapatan Utama</h4>
                                        <div class="space-y-2">
                                            <div v-for="entry in reportData.revenues.main" :key="entry.id" class="flex justify-between items-center py-2 border-b border-gray-100">
                                                <div>
                                                    <div class="text-sm font-medium text-gray-900">{{ entry.account.account_name }}</div>
                                                    <div class="text-xs text-gray-500">{{ entry.description }}</div>
                                                </div>
                                                <div class="text-sm font-medium text-gray-900">{{ formatCurrency(entry.amount) }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div v-if="reportData.revenues.other.length > 0">
                                        <h4 class="text-sm font-medium text-gray-700 mb-3">Pendapatan Lain-lain</h4>

                                        <!-- Bunga Bank Mandiri -->
                                        <div v-if="reportData.revenues.other_income_breakdown.bunga_mandiri.total > 0" class="mb-4">
                                            <div class="flex justify-between items-center py-2 bg-blue-50 px-3 rounded">
                                                <div class="text-sm font-medium text-blue-900">Pendapatan Lain-lain (Bunga Bank Mandiri)</div>
                                                <div class="text-sm font-semibold text-blue-900">{{ formatCurrency(reportData.revenues.other_income_breakdown.bunga_mandiri.total) }}</div>
                                            </div>
                                            <div class="ml-4 mt-2 space-y-1">
                                                <div v-for="entry in reportData.revenues.other_income_breakdown.bunga_mandiri.entries" :key="entry.id" class="flex justify-between items-center py-1 text-xs">
                                                    <div class="text-gray-600">{{ entry.description }}</div>
                                                    <div class="text-gray-900">{{ formatCurrency(entry.amount) }}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Bunga Bank BCA -->
                                        <div v-if="reportData.revenues.other_income_breakdown.bunga_bca.total > 0" class="mb-4">
                                            <div class="flex justify-between items-center py-2 bg-green-50 px-3 rounded">
                                                <div class="text-sm font-medium text-green-900">Pendapatan Lain-lain (Bunga Bank BCA)</div>
                                                <div class="text-sm font-semibold text-green-900">{{ formatCurrency(reportData.revenues.other_income_breakdown.bunga_bca.total) }}</div>
                                            </div>
                                            <div class="ml-4 mt-2 space-y-1">
                                                <div v-for="entry in reportData.revenues.other_income_breakdown.bunga_bca.entries" :key="entry.id" class="flex justify-between items-center py-1 text-xs">
                                                    <div class="text-gray-600">{{ entry.description }}</div>
                                                    <div class="text-gray-900">{{ formatCurrency(entry.amount) }}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Lainnya -->
                                        <div v-if="reportData.revenues.other_income_breakdown.lainnya.total > 0" class="mb-4">
                                            <div class="flex justify-between items-center py-2 bg-purple-50 px-3 rounded">
                                                <div class="text-sm font-medium text-purple-900">Pendapatan Lain-lain (Lainnya)</div>
                                                <div class="text-sm font-semibold text-purple-900">{{ formatCurrency(reportData.revenues.other_income_breakdown.lainnya.total) }}</div>
                                            </div>
                                            <div class="ml-4 mt-2 space-y-1">
                                                <div v-for="entry in reportData.revenues.other_income_breakdown.lainnya.entries" :key="entry.id" class="flex justify-between items-center py-1 text-xs">
                                                    <div class="text-gray-600">{{ entry.description }}</div>
                                                    <div class="text-gray-900">{{ formatCurrency(entry.amount) }}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="pt-4 border-t border-gray-200">
                                        <div class="flex justify-between items-center">
                                            <div class="text-base font-semibold text-gray-900">TOTAL PENDAPATAN</div>
                                            <div class="text-base font-semibold text-green-600">{{ formatCurrency(reportData.revenues.total) }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">BEBAN</h3>
                            </div>
                            <div class="px-4 py-5 sm:p-6">
                                <div class="space-y-6">
                                    <div v-if="reportData.expenses.salary.length > 0">
                                        <h4 class="text-sm font-medium text-gray-700 mb-2">Beban Gaji Karyawan</h4>
                                        <div class="space-y-2">
                                            <div v-for="entry in reportData.expenses.salary" :key="entry.id" class="flex justify-between items-center py-2 border-b border-gray-100">
                                                <div>
                                                    <div class="text-sm font-medium text-gray-900">{{ entry.description }}</div>
                                                    <div class="text-xs text-gray-500">{{ formatDate(entry.transaction_date) }}</div>
                                                </div>
                                                <div class="text-sm font-medium text-red-600">{{ formatCurrency(entry.amount) }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div v-if="operationalCategories.length > 0" class="space-y-3">
                                        <div class="flex items-center justify-between">
                                            <div>
                                                <div class="text-sm font-medium text-gray-900">Beban Operasional</div>
                                                <div class="text-xs text-gray-500">
                                                    {{ operationalCategories.length }} kategori &middot; {{ formatCurrency(operationalExpensesTotal) }}
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                class="text-sm text-gray-500 hover:text-gray-700 flex items-center"
                                                @click="showOperationalDetails = !showOperationalDetails"
                                            >
                                                {{ showOperationalDetails ? 'Tutup' : 'Detail' }}
                                                <ChevronDown
                                                    class="w-4 h-4 ml-1 transform transition-transform duration-150"
                                                    :class="{ 'rotate-180': showOperationalDetails }"
                                                />
                                            </button>
                                        </div>
                                        <transition name="fade">
                                            <div v-if="showOperationalDetails" class="space-y-3">
                                                <div
                                                    v-for="category in operationalCategories"
                                                    :key="category.category_name"
                                                    class="border border-gray-200 rounded-lg"
                                                >
                                                    <div class="px-4 py-3 bg-gray-50 flex justify-between items-center">
                                                        <div>
                                                            <div class="text-sm font-medium text-gray-900">
                                                                {{ category.category_name || 'Kategori Lainnya' }}
                                                            </div>
                                                            <div class="text-xs text-gray-500">
                                                                {{ category.entries.length }} transaksi
                                                            </div>
                                                        </div>
                                                        <div class="text-sm font-semibold text-red-600">
                                                            {{ formatCurrency(category.total) }}
                                                        </div>
                                                    </div>
                                                    <div class="divide-y divide-gray-100">
                                                        <div
                                                            v-for="entry in category.entries"
                                                            :key="entry.id"
                                                            class="flex justify-between items-center px-4 py-3 bg-white"
                                                        >
                                                            <div>
                                                                <div class="text-sm font-medium text-gray-900">{{ entry.description }}</div>
                                                                <div v-if="entry.transaction_date" class="text-xs text-gray-500">
                                                                    {{ formatDate(entry.transaction_date) }}
                                                                </div>
                                                            </div>
                                                            <div class="text-sm font-medium text-red-600">{{ formatCurrency(entry.amount) }}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </transition>
                                    </div>
                                    
                                    <div v-if="reportData.expenses.admin.length > 0">
                                        <h4 class="text-sm font-medium text-gray-700 mb-2">Beban Administrasi</h4>
                                        <div class="space-y-2">
                                            <div v-for="entry in reportData.expenses.admin" :key="entry.id" class="flex justify-between items-center py-2 border-b border-gray-100">
                                                <div>
                                                    <div class="text-sm font-medium text-gray-900">{{ entry.account.account_name }}</div>
                                                    <div class="text-xs text-gray-500">{{ entry.description }}</div>
                                                </div>
                                                <div class="text-sm font-medium text-red-600">{{ formatCurrency(entry.amount) }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div v-if="reportData.expenses.other.length > 0">
                                        <h4 class="text-sm font-medium text-gray-700 mb-2">Beban Lainnya</h4>
                                        <div class="space-y-2">
                                            <div v-for="entry in reportData.expenses.other" :key="entry.id" class="flex justify-between items-center py-2 border-b border-gray-100">
                                                <div>
                                                    <div class="text-sm font-medium text-gray-900">{{ entry.account.account_name }}</div>
                                                    <div class="text-xs text-gray-500">{{ entry.description }}</div>
                                                </div>
                                                <div class="text-sm font-medium text-red-600">{{ formatCurrency(entry.amount) }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="pt-4 border-t border-gray-200">
                                        <div class="flex justify-between items-center">
                                            <div class="text-base font-semibold text-gray-900">TOTAL BEBAN</div>
                                            <div class="text-base font-semibold text-red-600">{{ formatCurrency(reportData.expenses.total) }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div class="px-4 py-5 sm:p-6">
                                <div class="flex justify-between items-center py-4 border-t-2 border-gray-300">
                                    <div class="text-xl font-bold text-gray-900">LABA (RUGI) BERSIH</div>
                                    <div :class="reportData.net_profit >= 0 ? 'text-xl font-bold text-green-600' : 'text-xl font-bold text-red-600'">
                                        {{ formatCurrency(reportData.net_profit) }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6">
                        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Ringkasan</h3>
                            </div>
                            <div class="px-4 py-5 sm:p-6 space-y-4">
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-500">Periode</span>
                                    <span class="text-sm font-medium text-gray-900">{{ period.period_type }}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-500">Total Pendapatan</span>
                                    <span class="text-sm font-medium text-green-600">{{ formatCurrency(period.total_revenue) }}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-500">Beban Gaji</span>
                                    <span class="text-sm font-medium text-red-600">{{ formatCurrency(reportData.summary?.total_salary_expense || 0) }}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-500">Beban Operasional</span>
                                    <span class="text-sm font-medium text-red-600">{{ formatCurrency(reportData.summary?.total_operational_expense || 0) }}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-500">Beban Admin</span>
                                    <span class="text-sm font-medium text-red-600">{{ formatCurrency(reportData.summary?.total_admin_expense || 0) }}</span>
                                </div>
                                <div class="flex justify-between items-center">
                                    <span class="text-sm text-gray-500">Beban Lainnya</span>
                                    <span class="text-sm font-medium text-red-600">{{ formatCurrency(reportData.summary?.total_other_expense || 0) }}</span>
                                </div>
                                <div class="border-t border-gray-200 pt-4">
                                    <div class="flex justify-between items-center">
                                        <span class="text-base font-semibold text-gray-900">Laba Bersih</span>
                                        <span :class="period.net_profit >= 0 ? 'text-base font-semibold text-green-600' : 'text-base font-semibold text-red-600'">
                                            {{ formatCurrency(period.net_profit) }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
                                <h3 class="text-lg leading-6 font-medium text-gray-900">Informasi</h3>
                            </div>
                            <div class="px-4 py-5 sm:p-6 space-y-3">
                                <div>
                                    <dt class="text-sm font-medium text-gray-500">Dibuat oleh</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{ period.creator.name }}</dd>
                                </div>
                                <div>
                                    <dt class="text-sm font-medium text-gray-500">Tanggal dibuat</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(period.created_at) }}</dd>
                                </div>
                                <div v-if="period.approved_by">
                                    <dt class="text-sm font-medium text-gray-500">Disetujui oleh</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{ period.approver.name }}</dd>
                                </div>
                                <div v-if="period.approved_at">
                                    <dt class="text-sm font-medium text-gray-500">Tanggal disetujui</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(period.approved_at) }}</dd>
                                </div>
                                <div v-if="period.notes">
                                    <dt class="text-sm font-medium text-gray-500">Catatan</dt>
                                    <dd class="mt-1 text-sm text-gray-900">{{ period.notes }}</dd>
                                </div>
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
import { Head, Link, router } from '@inertiajs/vue3'
import { ArrowLeft, Edit, RefreshCw, CheckCircle, Download, ChevronDown } from 'lucide-vue-next'
import { ref, computed } from 'vue'

const props = defineProps({
    period: Object,
    reportData: Object,
    accounts: Object,
})

const operationalGroup = computed(() => props.reportData?.expenses?.operational || { grouped: [], total: 0 })
const operationalCategories = computed(() => Array.isArray(operationalGroup.value.grouped) ? operationalGroup.value.grouped : [])
const operationalExpensesTotal = computed(() => Number(operationalGroup.value.total || 0))
const showOperationalDetails = ref(false)

const loading = ref(false)
const isExporting = ref(false)

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

const formatDateTime = (datetime) => {
    return new Date(datetime).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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

const regenerateEntries = () => {
    if (confirm('Regenerate akan menghapus semua entry otomatis dan membuat ulang berdasarkan data terbaru. Lanjutkan?')) {
        loading.value = true
        router.post(route('admin-keuangan.profit-loss.regenerate', props.period.id), {}, {
            onFinish: () => loading.value = false
        })
    }
}

const finalizePeriod = () => {
    if (confirm('Setelah ditutup, periode tidak dapat diubah lagi. Lanjutkan?')) {
        loading.value = true
        router.post(route('admin-keuangan.profit-loss.finalize', props.period.id), {}, {
            onFinish: () => loading.value = false
        })
    }
}

const exportPdf = async () => {
    if (isExporting.value) return

    try {
        isExporting.value = true
        const url = route('admin-keuangan.profit-loss.export-pdf', props.period.id)

        // Try to open in new window first
        const newWindow = window.open(url, '_blank')

        // If popup was blocked, fallback to current window
        if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
            // Popup blocked, use current window
            window.location.href = url
        }

        // Add small delay to show loading state
        await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
        console.error('Error exporting PDF:', error)
        alert('Error exporting PDF. Please try again.')
    } finally {
        isExporting.value = false
    }
}
</script>


<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: all 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(-4px);
}
</style>
