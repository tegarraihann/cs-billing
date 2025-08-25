<template>
    <AdminKeuanganLayout>
        <Head title="Tambah Periode Laba Rugi" />
        
        <div class="py-6">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-6">
                    <Link 
                        :href="route('admin-keuangan.profit-loss.index')" 
                        class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    >
                        <ArrowLeft class="w-4 h-4 mr-2" />
                        Kembali ke Laporan Laba Rugi
                    </Link>
                    <h1 class="text-2xl font-bold text-gray-900">Tambah Periode Laba Rugi</h1>
                    <p class="mt-1 text-sm text-gray-600">Buat periode baru untuk laporan laba rugi</p>
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
                                        Tipe Periode <span class="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="period_type"
                                        v-model="form.period_type"
                                        class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                        :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.period_type }"
                                        @change="updateDateSuggestions"
                                    >
                                        <option value="">Pilih Tipe Periode</option>
                                        <option value="monthly">Bulanan</option>
                                        <option value="quarterly">Triwulan</option>
                                        <option value="yearly">Tahunan</option>
                                    </select>
                                    <div v-if="errors.period_type" class="mt-1 text-sm text-red-600">
                                        {{ errors.period_type }}
                                    </div>
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

                                <div v-if="dateSuggestions.length > 0" class="p-4 bg-blue-50 rounded-md">
                                    <h3 class="text-sm font-medium text-blue-900 mb-2">Saran Tanggal:</h3>
                                    <div class="space-y-2">
                                        <button
                                            v-for="suggestion in dateSuggestions"
                                            :key="suggestion.label"
                                            type="button"
                                            @click="applySuggestion(suggestion)"
                                            class="inline-flex items-center px-3 py-1 border border-blue-200 rounded-md text-sm text-blue-700 hover:bg-blue-100 mr-2"
                                        >
                                            {{ suggestion.label }}
                                        </button>
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
                            </div>

                            <div class="mt-8 flex justify-end space-x-3">
                                <Link
                                    :href="route('admin-keuangan.profit-loss.index')"
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
                                    {{ processing ? 'Menyimpan...' : 'Simpan Periode' }}
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
                            <h3 class="text-sm font-medium text-yellow-800">Informasi Penting</h3>
                            <div class="mt-2 text-sm text-yellow-700">
                                <ul class="list-disc list-inside space-y-1">
                                    <li>Setelah periode dibuat, sistem akan otomatis mengimpor data dari Sales Order, Petty Cash, dan Gaji Karyawan sesuai rentang tanggal</li>
                                    <li>Anda masih bisa menambah atau mengedit entry manual sebelum periode difinalisasi</li>
                                    <li>Pastikan rentang tanggal sudah benar karena akan mempengaruhi data yang diimpor</li>
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
    form.post(route('admin-keuangan.profit-loss.store'))
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
            label: `Bulan Ini (${getMonthName(currentMonth)} ${currentYear})`,
            start_date: formatDate(startOfMonth),
            end_date: formatDate(endOfMonth)
        })
        
        // Previous month
        const startOfPrevMonth = new Date(currentYear, currentMonth - 1, 1)
        const endOfPrevMonth = new Date(currentYear, currentMonth, 0)
        
        dateSuggestions.value.push({
            label: `Bulan Lalu (${getMonthName(currentMonth - 1)} ${currentMonth === 0 ? currentYear - 1 : currentYear})`,
            start_date: formatDate(startOfPrevMonth),
            end_date: formatDate(endOfPrevMonth)
        })
    } else if (form.period_type === 'quarterly') {
        const quarter = Math.floor(currentMonth / 3) + 1
        const startOfQuarter = new Date(currentYear, (quarter - 1) * 3, 1)
        const endOfQuarter = new Date(currentYear, quarter * 3, 0)
        
        dateSuggestions.value.push({
            label: `Kuartal ${quarter} ${currentYear}`,
            start_date: formatDate(startOfQuarter),
            end_date: formatDate(endOfQuarter)
        })
    } else if (form.period_type === 'yearly') {
        const startOfYear = new Date(currentYear, 0, 1)
        const endOfYear = new Date(currentYear, 11, 31)
        
        dateSuggestions.value.push({
            label: `Tahun ${currentYear}`,
            start_date: formatDate(startOfYear),
            end_date: formatDate(endOfYear)
        })
        
        const startOfPrevYear = new Date(currentYear - 1, 0, 1)
        const endOfPrevYear = new Date(currentYear - 1, 11, 31)
        
        dateSuggestions.value.push({
            label: `Tahun ${currentYear - 1}`,
            start_date: formatDate(startOfPrevYear),
            end_date: formatDate(endOfPrevYear)
        })
    }
}

const applySuggestion = (suggestion) => {
    form.start_date = suggestion.start_date
    form.end_date = suggestion.end_date
    
    if (!form.period_name) {
        form.period_name = `Laporan Laba Rugi ${suggestion.label}`
    }
}

const formatDate = (date) => {
    return date.toISOString().split('T')[0]
}

const getMonthName = (monthIndex) => {
    const months = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ]
    return months[monthIndex < 0 ? monthIndex + 12 : monthIndex]
}
</script>