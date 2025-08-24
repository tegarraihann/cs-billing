<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">Buat Sales Order Baru</h2>
              <p class="text-sage-600">Buat dokumen sales order untuk pelanggan</p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0">
            <Link
              :href="route('admin-keuangan.sales-orders.index')"
              class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </Link>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <form @submit.prevent="submit" class="space-y-6">
        <!-- Basic Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
            <h3 class="text-lg font-semibold text-sage-800">Informasi Dasar</h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="order_number" class="block text-sm font-medium text-sage-700 mb-2">
                  Order Number <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.order_number"
                  type="text"
                  id="order_number"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Masukkan order number"
                />
                <div v-if="form.errors.order_number" class="mt-2 text-sm text-red-600">
                  {{ form.errors.order_number }}
                </div>
              </div>

              <div>
                <label for="customer" class="block text-sm font-medium text-sage-700 mb-2">
                  Customer <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.customer"
                  type="text"
                  id="customer"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Masukkan nama customer"
                />
                <div v-if="form.errors.customer" class="mt-2 text-sm text-red-600">
                  {{ form.errors.customer }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Shipping Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
            <h3 class="text-lg font-semibold text-sage-800">Informasi Pengiriman</h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="shipper" class="block text-sm font-medium text-sage-700 mb-2">Shipper</label>
                <input
                  v-model="form.shipper"
                  type="text"
                  id="shipper"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Masukkan shipper"
                />
              </div>

              <div>
                <label for="bl_awb" class="block text-sm font-medium text-sage-700 mb-2">BL/AWB</label>
                <input
                  v-model="form.bl_awb"
                  type="text"
                  id="bl_awb"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Masukkan BL/AWB"
                />
              </div>

              <div>
                <label for="pol" class="block text-sm font-medium text-sage-700 mb-2">POL</label>
                <input
                  v-model="form.pol"
                  type="text"
                  id="pol"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Port of Loading"
                />
              </div>

              <div>
                <label for="pod" class="block text-sm font-medium text-sage-700 mb-2">POD</label>
                <input
                  v-model="form.pod"
                  type="text"
                  id="pod"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Port of Discharge"
                />
              </div>

              <div>
                <label for="eta" class="block text-sm font-medium text-sage-700 mb-2">ETA</label>
                <input
                  v-model="form.eta"
                  type="date"
                  id="eta"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
              </div>

              <div>
                <label for="vessel" class="block text-sm font-medium text-sage-700 mb-2">Vessel</label>
                <input
                  v-model="form.vessel"
                  type="text"
                  id="vessel"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Masukkan vessel"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Financial Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
            <h3 class="text-lg font-semibold text-sage-800">Informasi Keuangan</h3>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label for="buying" class="block text-sm font-medium text-sage-700 mb-2">Buying</label>
                <input
                  v-model="form.buying"
                  type="number"
                  id="buying"
                  step="0.01"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label for="selling" class="block text-sm font-medium text-sage-700 mb-2">Selling</label>
                <input
                  v-model="form.selling"
                  type="number"
                  id="selling"
                  step="0.01"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label for="revenue" class="block text-sm font-medium text-sage-700 mb-2">Revenue</label>
                <input
                  v-model="form.revenue"
                  type="number"
                  id="revenue"
                  step="0.01"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Vendor Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
            <h3 class="text-lg font-semibold text-sage-800">Informasi Vendor</h3>
          </div>
          <div class="p-6 space-y-4">
            <div>
              <label for="vendor_id" class="block text-sm font-medium text-sage-700 mb-2">
                Vendor <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.vendor.vendor_id"
                @change="onVendorSelect"
                id="vendor_id"
                required
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              >
                <option value="">-- Pilih Vendor --</option>
                <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">
                  {{ vendor.nama_vendor }}
                </option>
              </select>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="vendor_company_name" class="block text-sm font-medium text-sage-700 mb-2">
                  Company Name <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.vendor.company_name"
                  type="text"
                  id="vendor_company_name"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Nama perusahaan vendor"
                />
              </div>

              <div>
                <label for="vendor_no_rekening" class="block text-sm font-medium text-sage-700 mb-2">
                  No Rekening <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.vendor.no_rekening"
                  type="text"
                  id="vendor_no_rekening"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Nomor rekening"
                />
              </div>

              <div>
                <label for="vendor_nama_rekening" class="block text-sm font-medium text-sage-700 mb-2">
                  Nama Rekening <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.vendor.nama_rekening"
                  type="text"
                  id="vendor_nama_rekening"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="Nama pemilik rekening"
                />
              </div>

              <div>
                <label for="vendor_nominal" class="block text-sm font-medium text-sage-700 mb-2">Nominal</label>
                <input
                  v-model="form.vendor.nominal"
                  type="number"
                  id="vendor_nominal"
                  step="0.01"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label for="vendor_deskripsi" class="block text-sm font-medium text-sage-700 mb-2">
                Deskripsi <span class="text-red-500">*</span>
              </label>
              <textarea
                v-model="form.vendor.deskripsi"
                id="vendor_deskripsi"
                rows="3"
                required
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                placeholder="Deskripsi layanan vendor"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6">
          <Link
            :href="route('admin-keuangan.sales-orders.index')"
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
            <span v-if="form.processing">Menyimpan...</span>
            <span v-else>Simpan Sales Order</span>
          </button>
        </div>
      </form>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { useForm, Link } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";

const props = defineProps({
  customers: Array,
  vendors: Array,
});

const form = useForm({
  order_number: "",
  customer: "",
  shipper: "",
  bl_awb: "",
  pol: "",
  pod: "",
  eta: "",
  vessel: "",
  buying: 0,
  selling: 0,
  revenue: 0,
  vendor: {
    vendor_id: "",
    company_name: "",
    no_rekening: "",
    nama_rekening: "",
    nominal: 0,
    deskripsi: ""
  }
});

const onVendorSelect = () => {
  const selectedVendor = props.vendors.find(v => v.id == form.vendor.vendor_id);
  if (selectedVendor) {
    form.vendor.company_name = selectedVendor.nama_vendor;
    form.vendor.no_rekening = selectedVendor.nomor_rekening;
    form.vendor.nama_rekening = selectedVendor.nama_rekening;
  }
};

const submit = () => {
  form.post(route("admin-keuangan.sales-orders.store"), {
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