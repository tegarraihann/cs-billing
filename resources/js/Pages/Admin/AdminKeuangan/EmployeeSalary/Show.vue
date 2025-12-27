<template>
    <AdminKeuanganLayout>
        <Head :title="'Detail Gaji - ' + salary.employee_name" />
        
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
                    
                    <div class="flex justify-between items-start">
                        <div>
                            <h1 class="text-2xl font-bold text-gray-900">{{ salary?.employee_name || 'Nama tidak tersedia' }}</h1>
                            <p class="mt-1 text-sm text-gray-600">{{ salary?.position || 'Posisi tidak tersedia' }} - {{ salary?.division_label || 'Divisi tidak tersedia' }}</p>
                        </div>
                        
                        <div v-if="salary" class="flex space-x-3">
                            <Link 
                                v-if="salary.status === 'draft'"
                                :href="route('admin-keuangan.employee-salary.edit', salary.id)"
                                class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                            >
                                <Edit class="w-4 h-4 mr-2" />
                                Edit
                            </Link>
                            
                            <button
                                v-if="salary.status === 'draft'"
                                @click="openApproveModal"
                                :disabled="loading"
                                class="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                <CheckCircle class="w-4 h-4 mr-2" />
                                {{ loading ? 'Processing...' : 'Approve & Bayar' }}
                            </button>
                        </div>
                    </div>
                </div>

                <div class="space-y-6">
                    <!-- Employee Information Card -->
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Informasi Karyawan</h3>
                        </div>
                        <div class="border-t border-gray-200">
                            <dl>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Nama Lengkap</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ salary?.employee_name || '-' }}</dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">ID Karyawan</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ salary?.employee_id || '-' }}</dd>
                                </div>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Divisi</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ salary?.division_label || '-' }}</dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Jabatan</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ salary?.position || '-' }}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <!-- Salary Information Card -->
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Informasi Gaji</h3>
                            <p class="mt-1 max-w-2xl text-sm text-gray-500">Periode {{ salary?.formatted_period || '-' }}</p>
                        </div>
                        <div class="border-t border-gray-200">
                            <dl>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Gaji Pokok</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ formatCurrency(salary?.basic_salary) }}</dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Tunjangan</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ formatCurrency(salary?.allowances) }}</dd>
                                </div>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Potongan</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ formatCurrency(salary?.deductions) }}</dd>
                                </div>
                                <div class="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t-2 border-green-200">
                                    <dt class="text-sm font-bold text-green-900">TOTAL GAJI</dt>
                                    <dd class="mt-1 text-lg font-bold text-green-900 sm:mt-0 sm:col-span-2">{{ formatCurrency(salary?.total_salary) }}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <!-- Status & Timeline Card -->
                    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Status & Timeline</h3>
                        </div>
                        <div class="border-t border-gray-200">
                            <dl>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Status</dt>
                                    <dd class="mt-1 sm:mt-0 sm:col-span-2">
                                        <span :class="salary?.status_badge?.class" class="inline-flex px-2 py-1 text-xs font-semibold rounded-full">
                                            {{ salary?.status_badge?.text || '-' }}
                                        </span>
                                    </dd>
                                </div>
                                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Tanggal Gaji</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ formatDate(salary?.salary_date) }}</dd>
                                </div>
                                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Dibuat oleh</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{{ salary?.creator?.name || '-' }}</dd>
                                </div>
                                <div v-if="salary?.approved_at" class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Disetujui oleh</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                        {{ salary?.approver?.name || '-' }} 
                                        <span class="text-gray-500">pada {{ formatDate(salary?.approved_at) }}</span>
                                    </dd>
                                </div>
                                <div v-if="salary?.notes" class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt class="text-sm font-medium text-gray-500">Catatan</dt>
                                    <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-line">{{ salary?.notes }}</dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    <!-- Integration Info -->
                    <div v-if="salary?.profit_loss_entries && salary.profit_loss_entries.length > 0" class="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div class="px-4 py-5 sm:px-6">
                            <h3 class="text-lg leading-6 font-medium text-gray-900">Integrasi Laporan Laba Rugi</h3>
                            <p class="mt-1 max-w-2xl text-sm text-gray-500">Data gaji ini telah terintegrasi dengan laporan laba rugi</p>
                        </div>
                        <div class="border-t border-gray-200">
                            <div class="px-4 py-5">
                                <div class="space-y-3">
                                    <div v-for="entry in salary?.profit_loss_entries" :key="entry.id" class="flex items-center justify-between p-3 bg-green-50 rounded-md">
                                        <div>
                                            <p class="text-sm font-medium text-green-900">{{ entry.description }}</p>
                                            <p class="text-xs text-green-700">Periode: {{ entry.period?.period_name }}</p>
                                        </div>
                                        <div class="text-sm font-semibold text-green-900">
                                            {{ formatCurrency(entry.amount) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="showApproveModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div class="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                <div class="flex items-center justify-between mb-4">
                    <h3 class="text-lg font-semibold text-gray-900">Approve & Bayar Gaji</h3>
                    <button @click="closeApproveModal" class="text-gray-400 hover:text-gray-600">&times;</button>
                </div>
                <div class="space-y-4">
                    <div class="text-sm text-gray-600">
                        {{ salary ? `Gaji ${salary.employee_name} sebesar ${formatCurrency(salary.total_salary)}` : '' }}
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Akun Bank</label>
                        <select
                            v-model="selectedBankAccountId"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        >
                            <option value="" disabled>Pilih akun bank</option>
                            <option v-for="account in bankAccounts" :key="account.id" :value="account.id">
                                {{ account.bank_name }} - {{ account.account_number }} ({{ account.account_name }})
                            </option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Akun P&amp;L (Beban Gaji)</label>
                        <select
                            v-model="selectedPlAccountId"
                            class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        >
                            <option value="" disabled>Pilih akun P&amp;L</option>
                            <option v-for="account in salaryAccounts" :key="account.id" :value="account.id">
                                {{ account.account_code }} - {{ account.account_name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="mt-6 flex justify-end gap-2">
                    <button
                        type="button"
                        @click="closeApproveModal"
                        class="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700"
                    >
                        Batal
                    </button>
                    <button
                        type="button"
                        @click="submitApprove"
                        :disabled="!selectedBankAccountId || !selectedPlAccountId"
                        class="px-4 py-2 rounded-md text-sm text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Approve & Bayar
                    </button>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { Head, Link, router } from '@inertiajs/vue3'
import { ArrowLeft, Edit, CheckCircle } from 'lucide-vue-next'
import { ref } from 'vue'

const props = defineProps({
    salary: Object,
    bankAccounts: Array,
    salaryAccounts: Array,
})

const loading = ref(false)
const showApproveModal = ref(false)
const selectedBankAccountId = ref('')
const selectedPlAccountId = ref('')

const openApproveModal = () => {
    selectedBankAccountId.value = ''
    selectedPlAccountId.value = ''
    showApproveModal.value = true
}

const closeApproveModal = () => {
    showApproveModal.value = false
    selectedBankAccountId.value = ''
    selectedPlAccountId.value = ''
}

const submitApprove = () => {
    if (!selectedBankAccountId.value || !selectedPlAccountId.value) return

    loading.value = true
    router.post(
        route('admin-keuangan.employee-salary.approve', props.salary.id),
        {
            bank_account_id: selectedBankAccountId.value,
            pl_account_id: selectedPlAccountId.value,
        },
        {
            onFinish: () => {
                loading.value = false
                closeApproveModal()
            },
        }
    )
}

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount || 0)
}

const formatDate = (dateString) => {
    if (!dateString) return '-'
    
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}
</script>
