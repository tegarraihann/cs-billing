<template>
    <AdminKeuanganLayout>
        <div class="py-6">

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <!-- Header -->
                <div class="bg-white shadow rounded-lg mb-6">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div class="flex items-center">
                                <div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4">
                                    <Edit class="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 class="text-2xl font-semibold text-gray-900">Edit Vendor: {{ vendor.nama_vendor
                                        }}
                                    </h1>
                                    <p class="mt-1 text-sm text-gray-600">Update vendor information</p>
                                </div>
                            </div>
                            <div class="mt-4 sm:mt-0 flex space-x-3">
                                <Link :href="showVendorUrl"
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <Eye class="mr-2 h-4 w-4" />
                                    View Details
                                </Link>
                                <Link :href="backToIndexUrl"
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <ArrowLeft class="mr-2 h-4 w-4" />
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form Section -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-medium text-sage-800">Edit Vendor Form</h3>
                        <p class="mt-1 text-sm text-gray-600">Update vendor information accurately</p>
                    </div>

                    <div class="p-6">
                        <form @submit.prevent="submit" class="space-y-6">
                            <!-- Vendor Name -->
                            <div>
                                <label for="nama_vendor" class="block text-sm font-medium text-sage-700 mb-2">
                                    Vendor Name <span class="text-red-500">*</span>
                                </label>
                                <input id="nama_vendor" v-model="form.nama_vendor" type="text"
                                    placeholder="Enter vendor name"
                                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                    :class="{ 'border-red-500': errors.nama_vendor }" />
                                <div v-if="errors.nama_vendor" class="mt-1 text-sm text-red-600">
                                    {{ errors.nama_vendor }}
                                </div>
                            </div>

                            <!-- PIC -->
                            <div>
                                <label for="pic" class="block text-sm font-medium text-sage-700 mb-2">
                                    PIC (Person in Charge)
                                </label>
                                <input id="pic" v-model="form.pic" type="text" placeholder="Enter PIC name"
                                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                    :class="{ 'border-red-500': errors.pic }" />
                                <div v-if="errors.pic" class="mt-1 text-sm text-red-600">
                                    {{ errors.pic }}
                                </div>
                            </div>

                            <!-- Phone Number -->
                            <div>
                                <label for="no_hp" class="block text-sm font-medium text-sage-700 mb-2">
                                    Phone Number
                                </label>
                                <input id="no_hp" v-model="form.no_hp" type="text" placeholder="Enter phone number"
                                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                    :class="{ 'border-red-500': errors.no_hp }" />
                                <div v-if="errors.no_hp" class="mt-1 text-sm text-red-600">
                                    {{ errors.no_hp }}
                                </div>
                            </div>

                            <!-- Email -->
                            <div>
                                <label for="email" class="block text-sm font-medium text-sage-700 mb-2">
                                    Email
                                </label>
                                <input id="email" v-model="form.email" type="email" placeholder="Enter email address"
                                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                    :class="{ 'border-red-500': errors.email }" />
                                <div v-if="errors.email" class="mt-1 text-sm text-red-600">
                                    {{ errors.email }}
                                </div>
                            </div>

                            <!-- Office Phone -->
                            <div>
                                <label for="no_kantor" class="block text-sm font-medium text-sage-700 mb-2">
                                    Office Phone
                                </label>
                                <input id="no_kantor" v-model="form.no_kantor" type="text"
                                    placeholder="Enter office phone number"
                                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                    :class="{ 'border-red-500': errors.no_kantor }" />
                                <div v-if="errors.no_kantor" class="mt-1 text-sm text-red-600">
                                    {{ errors.no_kantor }}
                                </div>
                            </div>

                            <!-- Bank Account Number -->
                            <div>
                                <label for="nomor_rekening" class="block text-sm font-medium text-sage-700 mb-2">
                                    Bank Account Number <span class="text-red-500">*</span>
                                </label>
                                <input id="nomor_rekening" v-model="form.nomor_rekening" type="text"
                                    placeholder="Enter bank account number"
                                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                    :class="{ 'border-red-500': errors.nomor_rekening }" />
                                <div v-if="errors.nomor_rekening" class="mt-1 text-sm text-red-600">
                                    {{ errors.nomor_rekening }}
                                </div>
                            </div>

                            <!-- Account Holder Name -->
                            <div>
                                <label for="nama_rekening" class="block text-sm font-medium text-sage-700 mb-2">
                                    Account Holder Name <span class="text-red-500">*</span>
                                </label>
                                <input id="nama_rekening" v-model="form.nama_rekening" type="text"
                                    placeholder="Enter account holder name"
                                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                    :class="{ 'border-red-500': errors.nama_rekening }" />
                                <div v-if="errors.nama_rekening" class="mt-1 text-sm text-red-600">
                                    {{ errors.nama_rekening }}
                                </div>
                            </div>

                            <!-- Business Identification Number -->
                            <div>
                                <label for="nib" class="block text-sm font-medium text-sage-700 mb-2">
                                    Business Identification Number (NIB)
                                </label>
                                <input id="nib" v-model="form.nib" type="text"
                                    placeholder="Enter business identification number"
                                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                    :class="{ 'border-red-500': errors.nib }" />
                                <div v-if="errors.nib" class="mt-1 text-sm text-red-600">
                                    {{ errors.nib }}
                                </div>
                            </div>

                            <!-- Vendor Photo -->
                            <div>
                                <label for="photo" class="block text-sm font-medium text-sage-700 mb-2">
                                    Vendor Photo
                                </label>
                                <div v-if="vendor.photo_path" class="mb-3">
                                    <p class="text-sm text-gray-600 mb-2">Current photo:</p>
                                    <img :src="`/storage/${vendor.photo_path}`" alt="Vendor Photo"
                                        class="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                                </div>
                                <input type="file" id="photo" @change="handlePhotoChange" accept="image/*"
                                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                                    :class="{ 'border-red-500': errors.photo }" />
                                <p class="mt-1 text-xs text-gray-500">
                                    Supported formats: JPG, PNG, GIF. Max 2MB. Leave empty if you do not want to replace
                                    the photo.
                                </p>
                                <div v-if="errors.photo" class="mt-1 text-sm text-red-600">
                                    {{ errors.photo }}
                                </div>
                            </div>

                            <!-- Legal Document -->
                            <div>
                                <label for="legal_document" class="block text-sm font-medium text-sage-700 mb-2">
                                    Legal Document
                                </label>
                                <div v-if="vendor.legal_document_path" class="mb-3">
                                    <p class="text-sm text-gray-600 mb-2">Current document:</p>
                                    <a :href="`/storage/${vendor.legal_document_path}`" target="_blank"
                                        class="inline-flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                        View Document
                                    </a>
                                </div>
                                <input type="file" id="legal_document" @change="handleLegalDocumentChange" accept=".pdf"
                                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                                    :class="{ 'border-red-500': errors.legal_document }" />
                                <p class="mt-1 text-xs text-gray-500">
                                    Supported format: PDF. Max 10MB. Leave empty if you do not want to replace the
                                    document.
                                </p>
                                <div v-if="errors.legal_document" class="mt-1 text-sm text-red-600">
                                    {{ errors.legal_document }}
                                </div>
                            </div>

                            <!-- Submit & Cancel Buttons -->
                            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                                <Link :href="showVendorUrl"
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <X class="w-4 h-4 mr-2" />
                                    Cancel
                                </Link>
                                <button type="submit" :disabled="form.processing"
                                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed">
                                    <LoaderCircle v-if="form.processing" class="w-4 h-4 mr-2 animate-spin" />
                                    <CheckCircle v-else class="w-4 h-4 mr-2" />
                                    {{ form.processing ? "Saving..." : "Save Changes" }}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { Link, useForm, usePage } from "@inertiajs/vue3";
import { computed } from "vue";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";
import { Edit, Eye, ArrowLeft, X, LoaderCircle, CheckCircle } from "lucide-vue-next";

const props = defineProps({
    vendor: Object,
    errors: Object,
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

const backToIndexUrl = computed(() => route('admin-keuangan.vendors.index', backQuery.value));
const showVendorUrl = computed(() => route('admin-keuangan.vendors.show', {
    vendor: props.vendor.id,
    ...backQuery.value,
}));

// Form data using Inertia's useForm helper with pre-filled data
const form = useForm({
    nama_vendor: props.vendor.nama_vendor,
    pic: props.vendor.pic || "",
    no_hp: props.vendor.no_hp || "",
    email: props.vendor.email || "",
    no_kantor: props.vendor.no_kantor || "",
    nomor_rekening: props.vendor.nomor_rekening,
    nama_rekening: props.vendor.nama_rekening,
    nib: props.vendor.nib || "",
    photo: null,
    legal_document: null,
});

const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    form.photo = file || null;
};

const handleLegalDocumentChange = (event) => {
    const file = event.target.files[0];
    form.legal_document = file || null;
};

const submit = () => {
    // Check if there are any files to upload
    const hasFiles = form.photo || form.legal_document;

    if (hasFiles) {
        // Use POST with _method: PUT for file uploads
        form.transform((data) => ({
            ...data,
            _method: 'PUT'
        })).post(route("admin-keuangan.vendors.update", {
            vendor: props.vendor.id,
            ...backQuery.value,
        }), {
            onSuccess: () => {
                // Redirect will be handled by the controller
            },
            onError: (errors) => {
                console.log("Validation errors:", errors);
            },
        });
    } else {
        // Use PUT method for regular data updates
        form.put(route("admin-keuangan.vendors.update", {
            vendor: props.vendor.id,
            ...backQuery.value,
        }), {
            onSuccess: () => {
                // Redirect will be handled by the controller
            },
            onError: (errors) => {
                console.log("Validation errors:", errors);
            },
        });
    }
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

.text-sage-500 {
    color: #9fb894;
}

.bg-sage-50 {
    background-color: #f4f6f3;
}

.bg-sage-600 {
    background-color: #7ba169;
}

.bg-sage-700 {
    background-color: #6b8f5e;
}

.border-sage-200 {
    border-color: #d4ddd0;
}

.border-sage-300 {
    border-color: #c0cdb8;
}

.hover\:bg-sage-700:hover {
    background-color: #6b8f5e;
}

.focus\:ring-sage-500:focus {
    --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
    border-color: #8db580;
}

.focus\:ring-offset-2:focus {
    --tw-ring-offset-width: 2px;
}
</style>
