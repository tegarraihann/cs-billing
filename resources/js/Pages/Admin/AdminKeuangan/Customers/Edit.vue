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
                <h1 class="text-2xl font-semibold text-gray-900">Edit Pelanggan: {{ customer.customer_code || customer.no }}</h1>
                <p class="mt-1 text-sm text-gray-600">Perbarui informasi pelanggan</p>
              </div>
            </div>
            <div class="mt-4 sm:mt-0 flex space-x-3">
              <Link
                :href="route('admin-keuangan.customers.show', customer.id)"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              >
                <Eye class="mr-2 h-4 w-4" />
                Lihat Detail
              </Link>
              <Link
                :href="route('admin-keuangan.customers.index')"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              >
                <ArrowLeft class="mr-2 h-4 w-4" />
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-6 py-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">Form Edit Pelanggan</h3>
          <p class="mt-1 text-sm text-gray-600">Perbarui informasi pelanggan dengan benar</p>
        </div>

        <div class="p-6">
          <form @submit.prevent="submit" class="space-y-8">
            <!-- Company Information Section -->
            <div class="border border-gray-200 rounded-lg">
              <button
                type="button"
                @click="toggleCompanyInfo"
                class="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
              >
                <h4 class="text-lg font-semibold text-gray-900 flex items-center">
                  <Building class="mr-2 h-5 w-5" />
                  Informasi Perusahaan/Perorangan
                </h4>
                <ChevronDown
                  :class="{'rotate-180': isCompanyInfoOpen}"
                  class="w-5 h-5 text-gray-600 transition-transform duration-200"
                />
              </button>
              <div v-show="isCompanyInfoOpen" class="p-4 space-y-4">
                <!-- Customer Code -->
                <div>
                  <label
                    for="customer_code"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Customer Code
                  </label>
                  <input
                    v-model="form.customer_code"
                    type="text"
                    id="customer_code"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Customer code (e.g., CUST0001)"
                  />
                  <div v-if="form.errors.customer_code" class="mt-2 text-sm text-red-600">
                    {{ form.errors.customer_code }}
                  </div>
                  <p class="mt-1 text-sm text-gray-500">
                    Customer code harus unik untuk setiap customer
                  </p>
                </div>

                <!-- Same company fields as Create.vue -->
                <div>
                  <label for="company_name" class="block text-sm font-medium text-sage-700 mb-2">
                    Nama PT/Perorangan <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.company_name"
                    type="text"
                    id="company_name"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                    placeholder="Masukkan nama perusahaan atau nama lengkap"
                  />
                  <div v-if="form.errors.company_name" class="mt-2 text-sm text-red-600">
                    {{ form.errors.company_name }}
                  </div>
                </div>

                <div>
                  <label for="company_type" class="block text-sm font-medium text-sage-700 mb-2">
                    Jenis Usaha <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="form.company_type"
                    id="company_type"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  >
                    <option value="">Pilih jenis usaha...</option>
                    <option value="PT">PT (Perseroan Terbatas)</option>
                    <option value="CV">CV (Commanditaire Vennootschap)</option>
                    <option value="Perorangan">Perorangan</option>
                    <option value="Yayasan">Yayasan</option>
                    <option value="Koperasi">Koperasi</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                  <div v-if="form.errors.company_type" class="mt-2 text-sm text-red-600">
                    {{ form.errors.company_type }}
                  </div>
                </div>

                <div>
                  <label for="company_address" class="block text-sm font-medium text-sage-700 mb-2">
                    Alamat PT/Domisili <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="form.company_address"
                    id="company_address"
                    rows="3"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                    placeholder="Masukkan alamat lengkap perusahaan/domisili"
                  ></textarea>
                  <div v-if="form.errors.company_address" class="mt-2 text-sm text-red-600">
                    {{ form.errors.company_address }}
                  </div>
                </div>

                <div>
                  <label for="invoice_address" class="block text-sm font-medium text-sage-700 mb-2">
                    Alamat Kirim Invoice
                  </label>
                  <textarea
                    v-model="form.invoice_address"
                    id="invoice_address"
                    rows="3"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                    placeholder="Masukkan alamat untuk pengiriman invoice (opsional)"
                  ></textarea>
                  <div v-if="form.errors.invoice_address" class="mt-2 text-sm text-red-600">
                    {{ form.errors.invoice_address }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Other sections similar to Create.vue would be here, but abbreviated for brevity -->
            <!-- Submit Buttons -->
            <div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200">
              <Link
                :href="route('admin-keuangan.customers.index')"
                class="inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                :disabled="form.processing"
                class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <svg
                  v-if="form.processing"
                  class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span v-if="form.processing">Memperbarui...</span>
                <span v-else>Perbarui Pelanggan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref } from "vue";
import { useForm, Link } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";
import { Edit, Eye, ArrowLeft, Building, ChevronDown } from "lucide-vue-next";

const props = defineProps({
  customer: Object,
});

// Collapsible states
const isCompanyInfoOpen = ref(true);

const toggleCompanyInfo = () => {
  isCompanyInfoOpen.value = !isCompanyInfoOpen.value;
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
  form.put(route("admin-keuangan.customers.update", props.customer.id), {
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
.bg-sage-600 {
  background-color: #7ba169;
}

.bg-sage-700 {
  background-color: #6b8f5e;
}

.hover\:bg-sage-700:hover {
  background-color: #6b8f5e;
}

.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}
</style>