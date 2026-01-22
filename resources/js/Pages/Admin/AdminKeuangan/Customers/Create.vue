<template>
    <AdminKeuanganLayout>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header Section -->
            <div class="bg-white shadow rounded-lg mb-6">
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4">
                                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div>
                                <h2 class="text-2xl font-semibold text-sage-800">
                                    Add New Customer
                                </h2>
                                <p class="mt-1 text-sm text-sage-600">
                                    Add new customer details to the system
                                </p>
                            </div>
                        </div>
                        <div class="mt-4 sm:mt-0 flex space-x-3">
                            <Link :href="route('admin-keuangan.customers.index')"
                                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Form Section -->
            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
                    <h3 class="text-lg font-semibold text-sage-800">
                        New Customer Form
                    </h3>
                    <p class="text-sm text-sage-600 mt-1">
                        Complete the customer information accurately
                    </p>
                </div>

                <div class="p-6">
                    <form @submit.prevent="submit" class="space-y-8">
                        <!-- Company Information Section -->
                        <div class="border border-sage-200 rounded-lg">
                            <button type="button" @click="toggleCompanyInfo"
                                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg">
                                <h4 class="text-lg font-semibold text-sage-800">
                                    Company / Individual Information
                                </h4>
                                <svg :class="{ 'rotate-180': isCompanyInfoOpen }"
                                    class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div v-show="isCompanyInfoOpen" class="p-4 space-y-4">
                                <!-- Customer Code -->
                                <div>
                                    <label for="customer_code" class="block text-sm font-medium text-sage-700 mb-2">
                                        Customer Code
                                    </label>
                                    <input v-model="form.customer_code" type="text" id="customer_code"
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                        placeholder="Leave blank to auto-generate (CUST0001)" />
                                    <div v-if="form.errors.customer_code" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.customer_code }}
                                    </div>
                                    <p class="mt-1 text-sm text-gray-500">
                                        If left blank, the system will auto-generate in CUST0001 format
                                    </p>
                                </div>

                                <!-- Nama PT/Perorangan -->
                                <div>
                                    <label for="company_name" class="block text-sm font-medium text-sage-700 mb-2">
                                        Company / Individual Name <span class="text-red-500">*</span>
                                    </label>
                                    <input v-model="form.company_name" type="text" id="company_name" required
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                        placeholder="Enter the company name or full name" />
                                    <div v-if="form.errors.company_name" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.company_name }}
                                    </div>
                                </div>

                                <!-- Jenis Usaha -->
                                <div>
                                    <label for="company_type" class="block text-sm font-medium text-sage-700 mb-2">
                                        Business Type <span class="text-red-500">*</span>
                                    </label>
                                    <select v-model="form.company_type" id="company_type" required
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors">
                                        <option value="">Select business type...</option>
                                        <option value="PT">PT (Limited Liability Company)</option>
                                        <option value="CV">CV (Limited Partnership)</option>
                                        <option value="Perorangan">Individual</option>
                                        <option value="Yayasan">Foundation</option>
                                        <option value="Koperasi">Cooperative</option>
                                        <option value="Lainnya">Other</option>
                                    </select>
                                    <div v-if="form.errors.company_type" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.company_type }}
                                    </div>
                                </div>

                                <!-- Alamat PT/Domisili -->
                                <div>
                                    <label for="company_address" class="block text-sm font-medium text-sage-700 mb-2">
                                        Company / Domicile Address <span class="text-red-500">*</span>
                                    </label>
                                    <textarea v-model="form.company_address" id="company_address" rows="3" required
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                                        placeholder="Enter the full company/domicile address"></textarea>
                                    <div v-if="form.errors.company_address" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.company_address }}
                                    </div>
                                </div>

                                <!-- Alamat Kirim Invoice -->
                                <div>
                                    <label for="invoice_address" class="block text-sm font-medium text-sage-700 mb-2">
                                        Invoice Mailing Address
                                    </label>
                                    <textarea v-model="form.invoice_address" id="invoice_address" rows="3"
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                                        placeholder="Enter the invoice mailing address (optional)"></textarea>
                                    <div v-if="form.errors.invoice_address" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.invoice_address }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Legal Information Section -->
                        <div class="border border-sage-200 rounded-lg">
                            <button type="button" @click="toggleLegalInfo"
                                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg">
                                <h4 class="text-lg font-semibold text-sage-800">
                                    Legal Information
                                </h4>
                                <svg :class="{ 'rotate-180': isLegalInfoOpen }"
                                    class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div v-show="isLegalInfoOpen" class="p-4 space-y-4">
                                <!-- NIB -->
                                <div>
                                    <label for="nib" class="block text-sm font-medium text-sage-700 mb-2">
                                        Business Registration Number (NIB)
                                    </label>
                                    <input v-model="form.nib" type="text" id="nib"
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                        placeholder="Enter the business registration number" />
                                    <div v-if="form.errors.nib" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.nib }}
                                    </div>
                                </div>

                                <!-- NPWP -->
                                <div>
                                    <label for="npwp" class="block text-sm font-medium text-sage-700 mb-2">
                                        NPWP (Tax ID)
                                    </label>
                                    <input v-model="form.npwp" type="text" id="npwp"
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                        placeholder="Enter the NPWP number" />
                                    <div v-if="form.errors.npwp" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.npwp }}
                                    </div>
                                </div>

                                <!-- KTP (jika perorangan) -->
                                <div v-show="form.company_type === 'Perorangan'">
                                    <label for="ktp_number" class="block text-sm font-medium text-sage-700 mb-2">
                                        National ID Number (KTP)
                                    </label>
                                    <input v-model="form.ktp_number" type="text" id="ktp_number"
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                        placeholder="Enter the KTP number" />
                                    <div v-if="form.errors.ktp_number" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.ktp_number }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- PIC Information Section -->
                        <div class="border border-sage-200 rounded-lg">
                            <button type="button" @click="togglePicInfo"
                                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg">
                                <h4 class="text-lg font-semibold text-sage-800">
                                    PIC (Person in Charge) Details
                                </h4>
                                <svg :class="{ 'rotate-180': isPicInfoOpen }"
                                    class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div v-show="isPicInfoOpen" class="p-4 space-y-4">
                                <!-- Nama PIC -->
                                <div>
                                    <label for="pic_name" class="block text-sm font-medium text-sage-700 mb-2">
                                        PIC Name <span class="text-red-500">*</span>
                                    </label>
                                    <input v-model="form.pic_name" type="text" id="pic_name" required
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                        placeholder="Enter the PIC's full name" />
                                    <div v-if="form.errors.pic_name" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.pic_name }}
                                    </div>
                                </div>

                                <!-- Kontak/Telepon PIC -->
                                <div>
                                    <label for="pic_phone" class="block text-sm font-medium text-sage-700 mb-2">
                                        Active PIC Phone Number <span class="text-red-500">*</span>
                                    </label>
                                    <input v-model="form.pic_phone" type="tel" id="pic_phone" required
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                        placeholder="Example: 08123456789" />
                                    <div v-if="form.errors.pic_phone" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.pic_phone }}
                                    </div>
                                </div>

                                <!-- Email PIC -->
                                <div>
                                    <label for="pic_email" class="block text-sm font-medium text-sage-700 mb-2">
                                        Active PIC Email <span class="text-red-500">*</span>
                                    </label>
                                    <input v-model="form.pic_email" type="email" id="pic_email" required
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                        placeholder="example@email.com" />
                                    <div v-if="form.errors.pic_email" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.pic_email }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Marketing Information Section -->
                        <div class="border border-sage-200 rounded-lg">
                            <button type="button" @click="toggleMarketingInfo"
                                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg">
                                <h4 class="text-lg font-semibold text-sage-800">
                                    Marketing Details
                                </h4>
                                <svg :class="{ 'rotate-180': isMarketingInfoOpen }"
                                    class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div v-show="isMarketingInfoOpen" class="p-4 space-y-4">
                                <!-- Nama Marketing -->
                                <div>
                                    <label for="marketing_name" class="block text-sm font-medium text-sage-700 mb-2">
                                        Marketing Name
                                    </label>
                                    <input v-model="form.marketing_name" type="text" id="marketing_name"
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                        placeholder="Enter the responsible marketing contact" />
                                    <div v-if="form.errors.marketing_name" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.marketing_name }}
                                    </div>
                                </div>

                                <!-- Nomor Telepon Marketing -->
                                <div>
                                    <label for="marketing_phone" class="block text-sm font-medium text-sage-700 mb-2">
                                        Marketing Phone Number
                                    </label>
                                    <input v-model="form.marketing_phone" type="tel" id="marketing_phone"
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                        placeholder="Example: 08123456789" />
                                    <div v-if="form.errors.marketing_phone" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.marketing_phone }}
                                    </div>
                                </div>

                                <!-- Email Marketing -->
                                <div>
                                    <label for="marketing_email" class="block text-sm font-medium text-sage-700 mb-2">
                                        Marketing Email
                                    </label>
                                    <input v-model="form.marketing_email" type="email" id="marketing_email"
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                        placeholder="marketing@email.com" />
                                    <div v-if="form.errors.marketing_email" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.marketing_email }}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Document Upload Section -->
                        <div class="border border-sage-200 rounded-lg">
                            <button type="button" @click="toggleDocumentInfo"
                                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg">
                                <h4 class="text-lg font-semibold text-sage-800">
                                    Documents & Photos
                                </h4>
                                <svg :class="{ 'rotate-180': isDocumentInfoOpen }"
                                    class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                    stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div v-show="isDocumentInfoOpen" class="p-4 space-y-4">
                                <!-- FOTO -->
                                <div>
                                    <label for="photo" class="block text-sm font-medium text-sage-700 mb-2">
                                        Customer Photo
                                    </label>
                                    <input type="file" id="photo" @change="handlePhotoChange" accept="image/*"
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200" />
                                    <p class="mt-1 text-xs text-gray-500">
                                        Supported formats: JPG, PNG, GIF. Max 2MB.
                                    </p>
                                    <div v-if="form.errors.photo" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.photo }}
                                    </div>
                                </div>

                                <!-- DOKUMEN LEGAL -->
                                <div>
                                    <label for="legal_document" class="block text-sm font-medium text-sage-700 mb-2">
                                        Legal Document
                                    </label>
                                    <input type="file" id="legal_document" @change="handleLegalDocumentChange"
                                        accept=".pdf"
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200" />
                                    <p class="mt-1 text-xs text-gray-500">
                                        Supported format: PDF. Max 10MB.
                                    </p>
                                    <div v-if="form.errors.legal_document" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.legal_document }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Submit Buttons -->
                        <div
                            class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200">
                            <Link :href="route('admin-keuangan.customers.index')"
                                class="inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                                Cancel
                            </Link>
                            <button type="submit" :disabled="form.processing"
                                class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <svg v-if="form.processing" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                    fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                <span v-if="form.processing">Saving...</span>
                                <span v-else>Save Customer</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Alert Dialog -->
        <AlertDialog :show="alertDialog.show" :type="alertDialog.type" :title="alertDialog.title"
            :message="alertDialog.message" :confirm-text="alertDialog.confirmText" :cancel-text="alertDialog.cancelText"
            @confirm="handleAlertConfirm" @cancel="handleAlertCancel" @close="closeAlert" />
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref } from "vue";
import { useForm, Link } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";
import AlertDialog from "@/Components/AlertDialog.vue";

// Alert Dialog State
const alertDialog = ref({
    show: false,
    type: "info",
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    onConfirm: null,
});

// Collapsible states
const isCompanyInfoOpen = ref(true);
const isLegalInfoOpen = ref(true);
const isPicInfoOpen = ref(true);
const isMarketingInfoOpen = ref(true);
const isDocumentInfoOpen = ref(true);

const toggleCompanyInfo = () => {
    isCompanyInfoOpen.value = !isCompanyInfoOpen.value;
};

const toggleLegalInfo = () => {
    isLegalInfoOpen.value = !isLegalInfoOpen.value;
};

const togglePicInfo = () => {
    isPicInfoOpen.value = !isPicInfoOpen.value;
};

const toggleMarketingInfo = () => {
    isMarketingInfoOpen.value = !isMarketingInfoOpen.value;
};


const toggleDocumentInfo = () => {
    isDocumentInfoOpen.value = !isDocumentInfoOpen.value;
};

const form = useForm({
    // Customer Code
    customer_code: "",
    // Informasi Perusahaan/Perorangan
    company_name: "",
    company_type: "",
    company_address: "",
    invoice_address: "",
    // Data Legalitas
    nib: "",
    npwp: "",
    ktp_number: "",
    // Data PIC
    pic_name: "",
    pic_phone: "",
    pic_email: "",
    // Data Marketing
    marketing_name: "",
    marketing_phone: "",
    marketing_email: "",
    photo: null,
    legal_document: null
});

const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    form.photo = file || null;
};

const handleLegalDocumentChange = (event) => {
    const file = event.target.files[0];
    form.legal_document = file || null;
};

const showAlert = (type, title, message, confirmText = "", cancelText = "") => {
    alertDialog.value = {
        show: true,
        type,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: null,
    };
};

const handleAlertConfirm = () => {
    if (alertDialog.value.onConfirm) {
        alertDialog.value.onConfirm();
    }
};

const handleAlertCancel = () => {
    // Cancel logic if needed
};

const closeAlert = () => {
    alertDialog.value.show = false;
};

const submit = () => {
    form.post(route("admin-keuangan.customers.store"), {
        onSuccess: () => {
            showAlert(
                "success",
                "Success",
                "The customer was added successfully."
            );
        },
        onError: (errors) => {
            const errorMessage =
                Object.keys(errors).length > 0
                    ? "There are errors in the form. Please review the entered data."
                    : "An error occurred while saving the customer data.";
            showAlert("error", "Save Failed", errorMessage);
        },
    });
};
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-600 {
    color: #8db580;
}

.text-sage-700 {
    color: #7ba169;
}

.text-sage-800 {
    color: #6b8f5e;
}

.bg-sage-50 {
    background-color: #f4f6f3;
}

.bg-sage-600 {
    background-color: #8db580;
}

.bg-sage-700 {
    background-color: #7ba169;
}

.border-sage-200 {
    border-color: #d4ddd0;
}

.border-sage-300 {
    border-color: #c0cdb8;
}

.hover\:bg-sage-700:hover {
    background-color: #7ba169;
}

.focus\:ring-sage-500:focus {
    --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
    border-color: #8db580;
}
</style>
