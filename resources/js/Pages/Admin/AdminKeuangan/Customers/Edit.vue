<template>
    <AdminKeuanganLayout>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Header -->
            <div class="bg-white shadow rounded-lg mb-6">
                <div class="px-6 py-4 border-b border-gray-200">
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div class="flex items-center">
                            <div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4">
                                <Edit class="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 class="text-2xl font-semibold text-gray-900">Edit Customer: {{
                                    customer.customer_code || customer.no }}</h1>
                                <p class="mt-1 text-sm text-gray-600">Update customer information</p>
                            </div>
                        </div>
                        <div class="mt-4 sm:mt-0 flex space-x-3">
                            <Link :href="showCustomerUrl"
                                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                                <Eye class="mr-2 h-4 w-4" />
                                View Details
                            </Link>
                            <Link :href="backToIndexUrl"
                                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                                <ArrowLeft class="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Form Section -->
            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
                    <h3 class="text-lg font-semibold text-gray-900">Edit Customer Form</h3>
                    <p class="mt-1 text-sm text-gray-600">Update the customer information accurately</p>
                </div>

                <div class="p-6">
                    <form @submit.prevent="submit" class="space-y-8">
                        <!-- Company Information Section -->
                        <div class="border border-sage-200 rounded-lg">
                            <button type="button" @click="toggleCompanyInfo"
                                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg">
                                <h4 class="text-lg font-semibold text-sage-800 flex items-center">
                                    Company / Individual Information
                                </h4>
                                <ChevronDown :class="{ 'rotate-180': isCompanyInfoOpen }"
                                    class="w-5 h-5 text-sage-600 transition-transform duration-200" />
                            </button>
                            <div v-show="isCompanyInfoOpen" class="p-4 space-y-4">
                                <!-- Customer Code -->
                                <div>
                                    <label for="customer_code" class="block text-sm font-medium text-sage-700 mb-2">
                                        Customer Code
                                    </label>
                                    <input v-model="form.customer_code" type="text" id="customer_code"
                                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                        placeholder="Customer code (e.g., CUST0001)" />
                                    <div v-if="form.errors.customer_code" class="mt-2 text-sm text-red-600">
                                        {{ form.errors.customer_code }}
                                    </div>
                                    <p class="mt-1 text-sm text-gray-500">
                                        Customer codes must be unique for each customer
                                    </p>
                                </div>

                                <!-- Same company fields as Create.vue -->
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
                                <ChevronDown :class="{ 'rotate-180': isLegalInfoOpen }"
                                    class="w-5 h-5 text-sage-600 transition-transform duration-200" />
                            </button>
                            <div v-show="isLegalInfoOpen" class="p-4 space-y-4">
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
                                <ChevronDown :class="{ 'rotate-180': isPicInfoOpen }"
                                    class="w-5 h-5 text-sage-600 transition-transform duration-200" />
                            </button>
                            <div v-show="isPicInfoOpen" class="p-4 space-y-4">
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
                                <ChevronDown :class="{ 'rotate-180': isMarketingInfoOpen }"
                                    class="w-5 h-5 text-sage-600 transition-transform duration-200" />
                            </button>
                            <div v-show="isMarketingInfoOpen" class="p-4 space-y-4">
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

                        <!-- Documents & Photos Section -->
                        <div class="border border-sage-200 rounded-lg">
                            <button type="button" @click="toggleDocumentInfo"
                                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg">
                                <h4 class="text-lg font-semibold text-sage-800">
                                    Documents & Photos
                                </h4>
                                <ChevronDown :class="{ 'rotate-180': isDocumentInfoOpen }"
                                    class="w-5 h-5 text-sage-600 transition-transform duration-200" />
                            </button>
                            <div v-show="isDocumentInfoOpen" class="p-4 space-y-4">
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
                            <Link :href="backToIndexUrl"
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
                                <span v-if="form.processing">Updating...</span>
                                <span v-else>Update Customer</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useForm, Link, usePage } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";
import { Edit, Eye, ArrowLeft, Building, ChevronDown } from "lucide-vue-next";

const props = defineProps({
    customer: Object,
});

const page = usePage();

const backQuery = computed(() => {
    const queryString = page.url.includes('?') ? page.url.split('?')[1] : '';
    const params = new URLSearchParams(queryString);
    const query = {};

    ['search', 'page'].forEach((key) => {
        const value = params.get(key);
        if (value) {
            query[key] = value;
        }
    });

    return query;
});

const backToIndexUrl = computed(() => route('admin-keuangan.customers.index', backQuery.value));
const showCustomerUrl = computed(() => route('admin-keuangan.customers.show', {
    customer: props.customer.id,
    ...backQuery.value,
}));

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

const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    form.photo = file || null;
};

const handleLegalDocumentChange = (event) => {
    const file = event.target.files[0];
    form.legal_document = file || null;
};

const form = useForm({
    customer_code: props.customer.customer_code || "",
    company_name: props.customer.company_name || "",
    company_type: props.customer.company_type || "",
    company_address: props.customer.company_address || "",
    invoice_address: props.customer.invoice_address || "",
    nib: props.customer.nib || "",
    npwp: props.customer.npwp || "",
    ktp_number: props.customer.ktp_number || "",
    pic_name: props.customer.pic_name || "",
    pic_phone: props.customer.pic_phone || "",
    pic_email: props.customer.pic_email || "",
    marketing_name: props.customer.marketing_name || "",
    marketing_phone: props.customer.marketing_phone || "",
    marketing_email: props.customer.marketing_email || "",
    photo: null,
    legal_document: null
});

const submit = () => {
    form.put(route("admin-keuangan.customers.update", {
        customer: props.customer.id,
        ...backQuery.value,
    }), {
        onSuccess: () => {
            // Handle success
        },
        onError: (errors) => {
            // Handle errors
        },
    });
};
</script>

<style scoped>
/* Custom Sage Colors */
.bg-sage-50 {
    background-color: #f4f6f3;
}

.bg-sage-700 {
    background-color: #6b8f5e;
}

.border-sage-200 {
    border-color: #d4ddd0;
}

.text-sage-800 {
    color: #556B2F;
}

.hover\:bg-sage-700:hover {
    background-color: #6b8f5e;
}

.focus\:ring-sage-500:focus {
    --tw-ring-color: #8db580;
}
</style>
