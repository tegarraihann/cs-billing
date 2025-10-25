<template>
    <AdminKeuanganLayout>
        <Head title="Edit Pendapatan Lain-lain" />

        <div class="p-6 max-w-4xl mx-auto">
            <!-- Header -->
            <div class="mb-6">
                <div class="flex items-center space-x-4 mb-2">
                    <Link
                        :href="route('admin-keuangan.other-incomes.index')"
                        class="text-sage-600 hover:text-sage-800 transition-colors"
                    >
                        <ArrowLeft class="w-5 h-5" />
                    </Link>
                    <h1 class="text-2xl font-bold text-sage-800">Edit Pendapatan Lain-lain</h1>
                </div>
                <p class="text-sm text-sage-600 ml-9">Ubah data pendapatan lain-lain</p>
            </div>

            <!-- Alert jika sudah posted -->
            <div v-if="otherIncome.posted_to_profit_loss" class="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <AlertTriangle class="h-5 w-5 text-yellow-400" />
                    </div>
                    <div class="ml-3">
                        <p class="text-sm text-yellow-700">
                            <strong>Perhatian:</strong> Pendapatan ini sudah diposting ke Laba Rugi dan tidak dapat diedit.
                            Silakan unpost terlebih dahulu jika ingin melakukan perubahan.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Form -->
            <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
                <form @submit.prevent="submitForm" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Tanggal -->
                        <div>
                            <label class="block text-sm font-medium text-sage-700 mb-2">
                                Tanggal Pendapatan <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.transaction_date"
                                type="date"
                                :max="today"
                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                                :class="{ 'border-red-300': form.errors.transaction_date }"
                                :disabled="otherIncome.posted_to_profit_loss"
                                required
                            />
                            <p v-if="form.errors.transaction_date" class="mt-1 text-sm text-red-600">
                                {{ form.errors.transaction_date }}
                            </p>
                        </div>

                        <!-- Kategori -->
                        <div>
                            <label class="block text-sm font-medium text-sage-700 mb-2">
                                Kategori <span class="text-red-500">*</span>
                            </label>
                            <select
                                v-model="form.category"
                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                                :class="{ 'border-red-300': form.errors.category }"
                                :disabled="otherIncome.posted_to_profit_loss"
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                <option v-for="category in categories" :key="category" :value="category">
                                    {{ category }}
                                </option>
                            </select>
                            <p v-if="form.errors.category" class="mt-1 text-sm text-red-600">
                                {{ form.errors.category }}
                            </p>
                        </div>
                    </div>

                    <!-- Deskripsi -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">
                            Deskripsi <span class="text-red-500">*</span>
                        </label>
                        <textarea
                            v-model="form.description"
                            rows="3"
                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"
                            :class="{ 'border-red-300': form.errors.description }"
                            :disabled="otherIncome.posted_to_profit_loss"
                            placeholder="Contoh: Bunga bank periode Desember 2024"
                            required
                        ></textarea>
                        <p v-if="form.errors.description" class="mt-1 text-sm text-red-600">
                            {{ form.errors.description }}
                        </p>
                    </div>

                    <!-- Jumlah -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">
                            Jumlah (Rp) <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="text-gray-500 text-sm">Rp</span>
                            </div>
                            <input
                                v-model="form.amount"
                                type="number"
                                step="0.01"
                                min="0.01"
                                class="w-full pl-12 pr-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                                :class="{ 'border-red-300': form.errors.amount }"
                                :disabled="otherIncome.posted_to_profit_loss"
                                placeholder="0.00"
                                required
                            />
                        </div>
                        <p v-if="form.errors.amount" class="mt-1 text-sm text-red-600">
                            {{ form.errors.amount }}
                        </p>
                    </div>

                    <!-- Catatan -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">
                            Catatan (Optional)
                        </label>
                        <textarea
                            v-model="form.notes"
                            rows="2"
                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"
                            :class="{ 'border-red-300': form.errors.notes }"
                            :disabled="otherIncome.posted_to_profit_loss"
                            placeholder="Catatan tambahan jika ada..."
                        ></textarea>
                        <p v-if="form.errors.notes" class="mt-1 text-sm text-red-600">
                            {{ form.errors.notes }}
                        </p>
                    </div>

                    <!-- Upload Bukti -->
                    <div>
                        <label class="block text-sm font-medium text-sage-700 mb-2">
                            Upload Bukti (Optional)
                        </label>

                        <!-- Existing file -->
                        <div v-if="otherIncome.receipt_file && !filePreview" class="mb-2">
                            <a :href="`/storage/${otherIncome.receipt_file}`" target="_blank" class="inline-flex items-center text-sm text-sage-600 hover:text-sage-800">
                                <FileText class="w-4 h-4 mr-1" />
                                Lihat file saat ini
                            </a>
                        </div>

                        <div v-if="!otherIncome.posted_to_profit_loss" class="flex items-center space-x-4">
                            <label class="flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-sage-300 rounded-lg cursor-pointer hover:border-sage-400 transition-colors">
                                <div class="text-center">
                                    <Upload class="mx-auto h-8 w-8 text-sage-400" />
                                    <p class="mt-1 text-sm text-sage-600">
                                        <span class="font-medium">Klik untuk upload</span> atau drag & drop
                                    </p>
                                    <p class="text-xs text-sage-500">JPG, PNG, PDF (max 2MB)</p>
                                </div>
                                <input
                                    type="file"
                                    @change="handleFileUpload"
                                    accept=".jpg,.jpeg,.png,.pdf"
                                    class="hidden"
                                />
                            </label>
                        </div>
                        <p v-if="filePreview" class="mt-2 text-sm text-sage-600">
                            File baru terpilih: <span class="font-medium">{{ filePreview }}</span>
                            <button @click="removeFile" type="button" class="ml-2 text-red-600 hover:text-red-800">
                                <X class="w-4 h-4 inline" />
                            </button>
                        </p>
                        <p v-if="form.errors.receipt_file" class="mt-1 text-sm text-red-600">
                            {{ form.errors.receipt_file }}
                        </p>
                    </div>

                    <!-- Buttons -->
                    <div class="flex justify-end space-x-3 pt-4 border-t border-sage-200">
                        <Link
                            :href="route('admin-keuangan.other-incomes.index')"
                            class="inline-flex items-center px-4 py-2 border border-sage-300 rounded-lg text-sm font-medium text-sage-700 bg-white hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        >
                            Batal
                        </Link>
                        <button
                            v-if="!otherIncome.posted_to_profit_loss"
                            type="submit"
                            :disabled="form.processing"
                            class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition disabled:opacity-50"
                        >
                            <Save class="w-4 h-4 mr-2" />
                            {{ form.processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'
import { Head, Link, useForm } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import { ArrowLeft, Save, Upload, X, AlertTriangle, FileText } from 'lucide-vue-next'

const props = defineProps({
    otherIncome: Object,
    categories: Array,
})

const form = useForm({
    transaction_date: props.otherIncome.transaction_date,
    category: props.otherIncome.category,
    description: props.otherIncome.description,
    amount: props.otherIncome.amount,
    notes: props.otherIncome.notes || '',
    receipt_file: null,
})

const filePreview = ref('')

const today = computed(() => {
    return new Date().toISOString().split('T')[0]
})

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
        form.receipt_file = file
        filePreview.value = file.name
    }
}

const removeFile = () => {
    form.receipt_file = null
    filePreview.value = ''
}

const submitForm = () => {
    form.post(route('admin-keuangan.other-incomes.update', props.otherIncome.id), {
        preserveScroll: true,
        forceFormData: true,
        _method: 'put'
    })
}
</script>
