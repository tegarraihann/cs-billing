<template>
    <AdminKeuanganLayout>
        <Head title="Tambah Gaji Karyawan" />
        
        <div class="py-6">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="mb-6">
                    <Link 
                        :href="route('admin-keuangan.employee-salary.index')" 
                        class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    >
                        <ArrowLeft class="w-4 h-4 mr-2" />
                        Kembali ke Daftar Gaji Karyawan
                    </Link>
                    <h1 class="text-2xl font-bold text-gray-900">Tambah Gaji Karyawan</h1>
                    <p class="mt-1 text-sm text-gray-600">Input data gaji karyawan baru</p>
                </div>

                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
                    <div class="px-6 py-8">
                        <form @submit.prevent="submit">
                            <div class="grid grid-cols-1 gap-6">
                                
                                <!-- Employee Information -->
                                <div class="border-b border-gray-200 pb-6">
                                    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Informasi Karyawan</h3>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label for="employee_name" class="block text-sm font-medium text-gray-700 mb-2">
                                                Nama Karyawan <span class="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="employee_name"
                                                v-model="form.employee_name"
                                                type="text"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.employee_name }"
                                                placeholder="Nama lengkap karyawan"
                                            />
                                            <div v-if="errors.employee_name" class="mt-1 text-sm text-red-600">
                                                {{ errors.employee_name }}
                                            </div>
                                        </div>

                                        <div>
                                            <label for="employee_id" class="block text-sm font-medium text-gray-700 mb-2">
                                                ID Karyawan
                                            </label>
                                            <input
                                                id="employee_id"
                                                v-model="form.employee_id"
                                                type="text"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.employee_id }"
                                                placeholder="Nomor ID karyawan"
                                            />
                                            <div v-if="errors.employee_id" class="mt-1 text-sm text-red-600">
                                                {{ errors.employee_id }}
                                            </div>
                                        </div>

                                        <div>
                                            <label for="division" class="block text-sm font-medium text-gray-700 mb-2">
                                                Divisi <span class="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="division"
                                                v-model="form.division"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.division }"
                                            >
                                                <option value="">Pilih Divisi</option>
                                                <option v-for="(label, value) in divisions" :key="value" :value="value">
                                                    {{ label }}
                                                </option>
                                            </select>
                                            <div v-if="errors.division" class="mt-1 text-sm text-red-600">
                                                {{ errors.division }}
                                            </div>
                                        </div>

                                        <div>
                                            <label for="position" class="block text-sm font-medium text-gray-700 mb-2">
                                                Jabatan <span class="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="position"
                                                v-model="form.position"
                                                type="text"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.position }"
                                                placeholder="Jabatan karyawan"
                                            />
                                            <div v-if="errors.position" class="mt-1 text-sm text-red-600">
                                                {{ errors.position }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Salary Information -->
                                <div class="border-b border-gray-200 pb-6">
                                    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Informasi Gaji</h3>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label for="basic_salary" class="block text-sm font-medium text-gray-700 mb-2">
                                                Gaji Pokok <span class="text-red-500">*</span>
                                            </label>
                                            <input
                                                id="basic_salary"
                                                v-model="form.basic_salary"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.basic_salary }"
                                                placeholder="0"
                                            />
                                            <div v-if="errors.basic_salary" class="mt-1 text-sm text-red-600">
                                                {{ errors.basic_salary }}
                                            </div>
                                        </div>

                                        <div>
                                            <label for="allowances" class="block text-sm font-medium text-gray-700 mb-2">
                                                Tunjangan
                                            </label>
                                            <input
                                                id="allowances"
                                                v-model="form.allowances"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.allowances }"
                                                placeholder="0"
                                            />
                                            <div v-if="errors.allowances" class="mt-1 text-sm text-red-600">
                                                {{ errors.allowances }}
                                            </div>
                                        </div>

                                        <div>
                                            <label for="deductions" class="block text-sm font-medium text-gray-700 mb-2">
                                                Potongan
                                            </label>
                                            <input
                                                id="deductions"
                                                v-model="form.deductions"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.deductions }"
                                                placeholder="0"
                                            />
                                            <div v-if="errors.deductions" class="mt-1 text-sm text-red-600">
                                                {{ errors.deductions }}
                                            </div>
                                        </div>

                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                                Total Gaji
                                            </label>
                                            <div class="mt-1 block w-full border border-gray-200 bg-gray-50 rounded-md shadow-sm py-2 px-3 text-lg font-semibold text-gray-900">
                                                {{ formatCurrency(totalSalary) }}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Period Information -->
                                <div>
                                    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Informasi Periode</h3>
                                    
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label for="period_month" class="block text-sm font-medium text-gray-700 mb-2">
                                                Periode (Bulan-Tahun) <span class="text-red-500">*</span>
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
                                                Tanggal Gaji <span class="text-red-500">*</span>
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

                                    <div class="mt-6">
                                        <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
                                            Catatan
                                        </label>
                                        <textarea
                                            id="notes"
                                            v-model="form.notes"
                                            rows="3"
                                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                            placeholder="Catatan tambahan..."
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-8 flex justify-end space-x-3">
                                <Link
                                    :href="route('admin-keuangan.employee-salary.index')"
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
                                    {{ processing ? 'Menyimpan...' : 'Simpan Gaji' }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div class="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div class="flex">
                        <div class="flex-shrink-0">
                            <Info class="h-5 w-5 text-blue-400" />
                        </div>
                        <div class="ml-3">
                            <h3 class="text-sm font-medium text-blue-800">Informasi</h3>
                            <div class="mt-2 text-sm text-blue-700">
                                <ul class="list-disc list-inside space-y-1">
                                    <li>Gaji yang dibuat akan berstatus "Draft" terlebih dahulu</li>
                                    <li>Setelah di-approve, gaji akan otomatis masuk ke laporan laba rugi</li>
                                    <li>Pastikan periode sudah sesuai dengan bulan gaji yang akan dibayarkan</li>
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
import { ArrowLeft, Loader2, Info } from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps({
    divisions: Object,
    errors: Object,
})

const form = useForm({
    employee_name: '',
    employee_id: '',
    division: '',
    position: '',
    basic_salary: '',
    allowances: '',
    deductions: '',
    salary_date: new Date().toISOString().split('T')[0],
    period_month: new Date().toISOString().substr(0, 7),
    notes: '',
})

const processing = computed(() => form.processing)

const totalSalary = computed(() => {
    const basic = parseFloat(form.basic_salary) || 0
    const allowances = parseFloat(form.allowances) || 0
    const deductions = parseFloat(form.deductions) || 0
    return basic + allowances - deductions
})

const submit = () => {
    form.post(route('admin-keuangan.employee-salary.store'))
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount || 0)
}
</script>