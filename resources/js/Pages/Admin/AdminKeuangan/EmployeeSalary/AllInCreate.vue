<template>
    <AdminKeuanganLayout>
        <Head title="Input Gaji All In" />

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
                    <h1 class="text-2xl font-bold text-gray-900">Input Gaji All In</h1>
                    <p class="mt-1 text-sm text-gray-600">Input gaji untuk seluruh karyawan, divisi, atau jabatan sekaligus</p>
                </div>

                <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl">
                    <div class="px-6 py-8">
                        <form @submit.prevent="submit">
                            <!-- Target Selection -->
                            <div class="border-b border-gray-200 pb-6 mb-6">
                                <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Pilih Target Karyawan</h3>

                                <div class="space-y-4">
                                    <!-- All Staff Option -->
                                    <div class="flex items-center">
                                        <input
                                            id="target_all_staff"
                                            v-model="form.target_type"
                                            value="all_staff"
                                            type="radio"
                                            class="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300"
                                        />
                                        <label for="target_all_staff" class="ml-3 block text-sm font-medium text-gray-700">
                                            <span class="font-semibold">ALL STAFF</span>
                                            <span class="text-gray-500 ml-2">({{ previewStats.total_staff || 0 }} karyawan)</span>
                                        </label>
                                    </div>

                                    <!-- All Division Option -->
                                    <div class="flex items-start">
                                        <input
                                            id="target_all_division"
                                            v-model="form.target_type"
                                            value="all_division"
                                            type="radio"
                                            class="mt-1 h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300"
                                        />
                                        <div class="ml-3 flex-1">
                                            <label for="target_all_division" class="block text-sm font-medium text-gray-700 mb-2">
                                                <span class="font-semibold">ALL DIVISI</span>
                                            </label>
                                            <select
                                                v-model="form.target_value"
                                                :disabled="form.target_type !== 'all_division'"
                                                class="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                :class="{
                                                    'bg-gray-100 text-gray-400': form.target_type !== 'all_division',
                                                    'border-red-300 focus:border-red-500 focus:ring-red-500': errors.target_value
                                                }"
                                            >
                                                <option value="">Pilih Divisi</option>
                                                <option
                                                    v-for="(division, key) in previewStats.divisions"
                                                    :key="key"
                                                    :value="key"
                                                >
                                                    {{ division.label }} ({{ division.count }} karyawan)
                                                </option>
                                            </select>
                                            <div v-if="errors.target_value && form.target_type === 'all_division'" class="mt-1 text-sm text-red-600">
                                                {{ errors.target_value }}
                                            </div>
                                        </div>
                                    </div>

                                    <!-- All Position Option -->
                                    <div class="flex items-start">
                                        <input
                                            id="target_all_position"
                                            v-model="form.target_type"
                                            value="all_position"
                                            type="radio"
                                            class="mt-1 h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300"
                                        />
                                        <div class="ml-3 flex-1">
                                            <label for="target_all_position" class="block text-sm font-medium text-gray-700 mb-2">
                                                <span class="font-semibold">ALL JABATAN</span>
                                            </label>
                                            <input
                                                v-model="form.target_value"
                                                :disabled="form.target_type !== 'all_position'"
                                                type="text"
                                                class="mt-1 block w-full max-w-xs border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                                :class="{
                                                    'bg-gray-100 text-gray-400': form.target_type !== 'all_position',
                                                    'border-red-300 focus:border-red-500 focus:ring-red-500': errors.target_value
                                                }"
                                                placeholder="Masukkan nama jabatan (contoh: Manager)"
                                            />
                                            <div v-if="errors.target_value && form.target_type === 'all_position'" class="mt-1 text-sm text-red-600">
                                                {{ errors.target_value }}
                                            </div>
                                            <div class="mt-2 text-xs text-gray-500">
                                                <strong>Jabatan yang tersedia:</strong>
                                                <div class="mt-1">
                                                    <span
                                                        v-for="(count, position) in previewStats.positions"
                                                        :key="position"
                                                        class="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs mr-2 mb-1"
                                                    >
                                                        {{ position }} ({{ count }})
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="errors.target_type" class="mt-2 text-sm text-red-600">
                                    {{ errors.target_type }}
                                </div>
                            </div>

                            <!-- Period Information -->
                            <div class="border-b border-gray-200 pb-6 mb-6">
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
                            </div>

                            <!-- Salary Information -->
                            <div class="border-b border-gray-200 pb-6 mb-6">
                                <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">Detail Gaji Uniform</h3>

                                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div>
                                        <label for="basic_salary" class="block text-sm font-medium text-gray-700 mb-2">
                                            Gaji Pokok <span class="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="basic_salary"
                                            v-model.number="form.basic_salary"
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
                                            v-model.number="form.allowances"
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
                                            v-model.number="form.deductions"
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
                                </div>

                                <!-- Total Salary Display -->
                                <div class="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <div class="flex justify-between items-center">
                                        <span class="text-lg font-medium text-gray-900">Total Gaji per Karyawan:</span>
                                        <span class="text-2xl font-bold text-sage-600">
                                            Rp {{ formatCurrency(totalSalary) }}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Notes -->
                            <div class="mb-8">
                                <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
                                    Catatan
                                </label>
                                <textarea
                                    id="notes"
                                    v-model="form.notes"
                                    rows="3"
                                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                                    :class="{ 'border-red-300 focus:border-red-500 focus:ring-red-500': errors.notes }"
                                    placeholder="Catatan tambahan untuk gaji ini..."
                                ></textarea>
                                <div v-if="errors.notes" class="mt-1 text-sm text-red-600">
                                    {{ errors.notes }}
                                </div>
                            </div>

                            <!-- Submit Button -->
                            <div class="flex items-center justify-end space-x-3">
                                <Link
                                    :href="route('admin-keuangan.employee-salary.index')"
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                                >
                                    Batal
                                </Link>
                                <button
                                    type="submit"
                                    :disabled="processing || !form.target_type"
                                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Loader2 v-if="processing" class="w-4 h-4 mr-2 animate-spin" />
                                    {{ processing ? 'Memproses...' : 'Simpan Gaji All In' }}
                                </button>
                            </div>

                            <!-- Preview Info -->
                            <div v-if="form.target_type" class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div class="flex">
                                    <Info class="h-5 w-5 text-blue-400 mt-0.5 mr-2" />
                                    <div>
                                        <h4 class="text-sm font-medium text-blue-800 mb-1">Preview Eksekusi</h4>
                                        <p class="text-sm text-blue-700">
                                            Sistem akan membuat record gaji individual untuk
                                            <strong>{{ getTargetDescription() }}</strong>
                                            dengan total gaji <strong>Rp {{ formatCurrency(totalSalary) }}</strong> per karyawan.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </form>
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
    previewStats: Object,
    errors: Object,
})

const form = useForm({
    target_type: '',
    target_value: '',
    period_month: new Date().toISOString().slice(0, 7),
    salary_date: new Date().toISOString().split('T')[0],
    basic_salary: '',
    allowances: '',
    deductions: '',
    notes: '',
})

const processing = computed(() => form.processing)

const totalSalary = computed(() => {
    const basic = parseFloat(form.basic_salary) || 0
    const allowances = parseFloat(form.allowances) || 0
    const deductions = parseFloat(form.deductions) || 0
    return basic + allowances - deductions
})

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID').format(amount || 0)
}

const getTargetDescription = () => {
    switch (form.target_type) {
        case 'all_staff':
            return `${props.previewStats.total_staff || 0} karyawan (ALL STAFF)`
        case 'all_division':
            if (form.target_value && props.previewStats.divisions[form.target_value]) {
                const division = props.previewStats.divisions[form.target_value]
                return `${division.count} karyawan dari divisi ${division.label}`
            }
            return 'divisi yang dipilih'
        case 'all_position':
            if (form.target_value && props.previewStats.positions[form.target_value]) {
                return `${props.previewStats.positions[form.target_value]} karyawan dengan jabatan "${form.target_value}"`
            }
            return 'jabatan yang dimasukkan'
        default:
            return 'target yang dipilih'
    }
}

const submit = () => {
    form.post(route('admin-keuangan.employee-salary.all-in-store'))
}
</script>