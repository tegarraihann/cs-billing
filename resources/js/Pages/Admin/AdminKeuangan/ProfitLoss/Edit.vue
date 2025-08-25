<template>
    <AdminKeuanganLayout>
        <Head title="Edit Periode Laba Rugi" />
        
        <div class="py-6">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-6">
                    <Link 
                        :href="route('admin-keuangan.profit-loss.show', period.id)" 
                        class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    >
                        <ArrowLeft class="w-4 h-4 mr-2" />
                        Kembali ke Detail
                    </Link>
                    <h1 class="text-2xl font-bold text-gray-900">Edit Periode Laba Rugi</h1>
                    <p class="mt-1 text-sm text-gray-600">Edit periode {{ period.period_name }}</p>
                </div>

                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
                    <div class="px-6 py-8">
                        <form @submit.prevent="submit">
                            <div class="grid grid-cols-1 gap-6">
                                <div>
                                    <label for="period_name" class="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Periode <span class="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="period_name"
                                        v-model="form.period_name"
                                        type="text"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                        :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.period_name }"
                                        placeholder="Contoh: Laporan Laba Rugi Desember 2024"
                                    />
                                    <div v-if="errors.period_name" class="mt-1 text-sm text-red-600">
                                        {{ errors.period_name }}
                                    </div>
                                </div>

                                <div>
                                    <label for="period_type" class="block text-sm font-medium text-gray-700 mb-2">
                                        Tipe Periode
                                    </label>
                                    <select
                                        id="period_type"
                                        v-model="period.period_type"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 cursor-not-allowed"
                                        disabled
                                    >
                                        <option value="monthly">Bulanan</option>
                                        <option value="quarterly">Triwulan</option>
                                        <option value="yearly">Tahunan</option>
                                    </select>
                                    <p class="mt-1 text-sm text-gray-500">
                                        Tipe periode tidak dapat diubah setelah dibuat
                                    </p>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label for="start_date" class="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Mulai <span class="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="start_date"
                                            v-model="form.start_date"
                                            type="date"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.start_date }"
                                        />
                                        <div v-if="errors.start_date" class="mt-1 text-sm text-red-600">
                                            {{ errors.start_date }}
                                        </div>
                                    </div>

                                    <div>
                                        <label for="end_date" class="block text-sm font-medium text-gray-700 mb-2">
                                            Tanggal Selesai <span class="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="end_date"
                                            v-model="form.end_date"
                                            type="date"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                            :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.end_date }"
                                        />
                                        <div v-if="errors.end_date" class="mt-1 text-sm text-red-600">
                                            {{ errors.end_date }}
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
                                        Catatan
                                    </label>
                                    <textarea
                                        id="notes"
                                        v-model="form.notes"
                                        rows="3"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                        placeholder="Catatan tambahan untuk periode ini..."
                                    ></textarea>
                                </div>

                                <div class="bg-blue-50 border border-blue-200 rounded-md p-4">
                                    <h3 class="text-sm font-medium text-blue-900 mb-2">Informasi Periode</h3>
                                    <div class="text-sm text-blue-700 space-y-1">
                                        <p><strong>Kode Periode:</strong> {{ period.period_code }}</p>
                                        <p><strong>Status:</strong> 
                                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                                                :class="{
                                                    'bg-yellow-100 text-yellow-800': period.status === 'draft',
                                                    'bg-green-100 text-green-800': period.status === 'closed'
                                                }"
                                            >
                                                {{ period.status === 'draft' ? 'Draft' : 'Ditutup' }}
                                            </span>
                                        </p>
                                        <p><strong>Dibuat:</strong> {{ formatDate(period.created_at) }}</p>
                                        <p v-if="period.approved_at"><strong>Disetujui:</strong> {{ formatDate(period.approved_at) }}</p>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 flex justify-end space-x-3">
                                <Link
                                    :href="route('admin-keuangan.profit-loss.show', period.id)"
                                    class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    :disabled="processing"
                                    class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"
                                >
                                    <Loader2 v-if="processing" class="animate-spin -ml-1 mr-2 h-4 w-4" />
                                    {{ processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
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
                            <h3 class="text-sm font-medium text-yellow-800">Peringatan</h3>
                            <div class="mt-2 text-sm text-yellow-700">
                                <ul class="list-disc list-inside space-y-1">
                                    <li>Mengubah tanggal periode akan mempengaruhi data yang diimpor otomatis</li>
                                    <li>Setelah menyimpan, Anda mungkin perlu melakukan regenerate entries untuk memperbarui data otomatis</li>
                                    <li>Periode yang sudah ditutup tidak dapat diedit</li>
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
import { computed } from 'vue'

const props = defineProps({
    period: Object,
    accounts: Array,
    errors: Object,
})

const form = useForm({
    period_name: props.period.period_name,
    start_date: props.period.start_date,
    end_date: props.period.end_date,
    notes: props.period.notes || '',
})

const processing = computed(() => form.processing)

const submit = () => {
    form.put(route('admin-keuangan.profit-loss.update', props.period.id))
}

const formatDate = (dateString) => {
    if (!dateString) return '-'
    
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}
</script>