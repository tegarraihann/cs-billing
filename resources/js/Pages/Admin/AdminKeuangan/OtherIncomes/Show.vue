<template>
    <AdminKeuanganLayout>
        <Head title="Detail Pendapatan Lain-lain" />

        <div class="py-6">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="mb-6">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <Link
                                :href="route('admin-keuangan.other-incomes.index')"
                                class="text-sage-600 hover:text-sage-800 transition-colors"
                            >
                                <ArrowLeft class="w-5 h-5" />
                            </Link>
                            <div>
                                <h1 class="text-2xl font-bold text-gray-900">Detail Pendapatan Lain-lain</h1>
                                <p class="mt-1 text-sm text-gray-600">Informasi lengkap pendapatan</p>
                            </div>
                        </div>
                        <div class="flex space-x-2">
                            <Link
                                v-if="!otherIncome.posted_to_profit_loss"
                                :href="route('admin-keuangan.other-incomes.edit', otherIncome.id)"
                                class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition"
                            >
                                <Edit class="w-4 h-4 mr-2" />
                                Edit
                            </Link>
                        </div>
                    </div>
                </div>

                <!-- Status Badge -->
                <div class="mb-6">
                    <span :class="otherIncome.posted_to_profit_loss ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'" class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                        <CheckCircle v-if="otherIncome.posted_to_profit_loss" class="w-4 h-4 mr-2" />
                        <Clock v-else class="w-4 h-4 mr-2" />
                        {{ otherIncome.posted_to_profit_loss ? 'Posted ke Laba Rugi' : 'Pending' }}
                    </span>
                </div>

                <!-- Main Info -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                    <div class="px-4 py-5 sm:px-6 bg-sage-50">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Informasi Pendapatan</h3>
                    </div>
                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <Calendar class="w-4 h-4 mr-2 text-gray-400" />
                                    Tanggal
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium">
                                    {{ formatDate(otherIncome.transaction_date) }}
                                </dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <Tag class="w-4 h-4 mr-2 text-gray-400" />
                                    Kategori
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full" :class="getCategoryBadge(otherIncome.category)">
                                        {{ otherIncome.category }}
                                    </span>
                                </dd>
                            </div>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <FileText class="w-4 h-4 mr-2 text-gray-400" />
                                    Deskripsi
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.description }}
                                </dd>
                            </div>
                            <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <DollarSign class="w-4 h-4 mr-2 text-gray-400" />
                                    Jumlah
                                </dt>
                                <dd class="mt-1 text-lg font-bold text-green-600 sm:mt-0 sm:col-span-2">
                                    {{ formatCurrency(otherIncome.amount) }}
                                </dd>
                            </div>
                            <div v-if="otherIncome.notes" class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <MessageSquare class="w-4 h-4 mr-2 text-gray-400" />
                                    Catatan
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.notes }}
                                </dd>
                            </div>
                            <div v-if="otherIncome.receipt_file" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500 flex items-center">
                                    <Paperclip class="w-4 h-4 mr-2 text-gray-400" />
                                    Bukti Pendapatan
                                </dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <a :href="`/storage/${otherIncome.receipt_file}`" target="_blank" class="inline-flex items-center text-sage-600 hover:text-sage-800">
                                        <FileText class="w-4 h-4 mr-1" />
                                        Lihat File
                                    </a>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <!-- Audit Info -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
                    <div class="px-4 py-5 sm:px-6 bg-gray-50">
                        <h3 class="text-lg leading-6 font-medium text-gray-900">Informasi Audit</h3>
                    </div>
                    <div class="border-t border-gray-200">
                        <dl>
                            <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Dibuat Oleh</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.creator?.name || '-' }}
                                    <span class="text-gray-500 ml-2">{{ formatDateTime(otherIncome.created_at) }}</span>
                                </dd>
                            </div>
                            <div v-if="otherIncome.posted_to_profit_loss" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt class="text-sm font-medium text-gray-500">Di-post ke Laba Rugi Oleh</dt>
                                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {{ otherIncome.approver?.name || '-' }}
                                    <span class="text-gray-500 ml-2">{{ formatDateTime(otherIncome.posted_at) }}</span>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <!-- Actions -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-4 py-5 sm:px-6">
                        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Aksi</h3>
                        <div class="flex flex-wrap gap-3">
                            <button
                                v-if="!otherIncome.posted_to_profit_loss"
                                @click="postToProfitLoss"
                                class="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 transition"
                            >
                                <CheckCircle class="w-4 h-4 mr-2" />
                                Post ke Laba Rugi
                            </button>
                            <button
                                v-if="otherIncome.posted_to_profit_loss"
                                @click="unpostFromProfitLoss"
                                class="inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 transition"
                            >
                                <XCircle class="w-4 h-4 mr-2" />
                                Unpost dari Laba Rugi
                            </button>
                            <button
                                v-if="!otherIncome.posted_to_profit_loss"
                                @click="deleteIncome"
                                class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 transition"
                            >
                                <Trash2 class="w-4 h-4 mr-2" />
                                Hapus Pendapatan
                            </button>
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
import {
    ArrowLeft,
    Edit,
    Calendar,
    Tag,
    FileText,
    DollarSign,
    MessageSquare,
    Paperclip,
    CheckCircle,
    Clock,
    XCircle,
    Trash2
} from 'lucide-vue-next'

const props = defineProps({
    otherIncome: Object,
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
        month: 'long',
        day: 'numeric'
    })
}

const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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

const postToProfitLoss = () => {
    if (confirm(`Posting pendapatan ini ke Laba Rugi?`)) {
        router.post(route('admin-keuangan.other-incomes.post-to-profit-loss', props.otherIncome.id))
    }
}

const unpostFromProfitLoss = () => {
    if (confirm(`Unpost pendapatan ini dari Laba Rugi?`)) {
        router.post(route('admin-keuangan.other-incomes.unpost-from-profit-loss', props.otherIncome.id))
    }
}

const deleteIncome = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus pendapatan ini?`)) {
        router.delete(route('admin-keuangan.other-incomes.destroy', props.otherIncome.id))
    }
}
</script>
