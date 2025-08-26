<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">Edit Sales Order: {{ salesOrder.order_number }}</h2>
              <p class="text-sage-600">Perbarui informasi sales order</p>
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
            <!-- Buying Breakdown -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <label class="block text-sm font-medium text-sage-700">BUYING BREAKDOWN</label>
                <button
                  type="button"
                  @click="addBuyingItem"
                  class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Item
                </button>
              </div>
              <div class="space-y-3">
                <div v-for="(item, index) in form.buying_breakdown" :key="'buying-' + index" class="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border border-gray-200 rounded-lg">
                  <div class="md:col-span-6">
                    <input
                      v-model="item.vendor"
                      type="text"
                      placeholder="Vendor name"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <div class="md:col-span-5">
                    <input
                      v-model="item.amount"
                      type="number"
                      step="0.01"
                      placeholder="Amount"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <div class="md:col-span-1">
                    <button
                      type="button"
                      @click="removeBuyingItem(index)"
                      class="w-full h-10 text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:border-red-400 transition-colors"
                    >
                      <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="p-2 bg-gray-50 rounded-md">
                <strong>Total Buying: {{ formatCurrency(totalBuying) }}</strong>
              </div>
            </div>

            <!-- Selling Breakdown -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <label class="block text-sm font-medium text-sage-700">SELLING BREAKDOWN</label>
                <button
                  type="button"
                  @click="addSellingItem"
                  class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Item
                </button>
              </div>
              <div class="space-y-3">
                <div v-for="(item, index) in form.selling_breakdown" :key="'selling-' + index" class="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border border-gray-200 rounded-lg">
                  <div class="md:col-span-6">
                    <input
                      v-model="item.description"
                      type="text"
                      placeholder="Service description"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <div class="md:col-span-5">
                    <input
                      v-model="item.amount"
                      type="number"
                      step="0.01"
                      placeholder="Amount"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <div class="md:col-span-1">
                    <button
                      type="button"
                      @click="removeSellingItem(index)"
                      class="w-full h-10 text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:border-red-400 transition-colors"
                    >
                      <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="p-2 bg-gray-50 rounded-md">
                <strong>Total Selling: {{ formatCurrency(totalSelling) }}</strong>
              </div>
            </div>

            <!-- Revenue Summary -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">REVENUE (AUTO CALCULATED)</label>
              <div class="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                <div class="text-lg font-bold" :class="totalRevenue >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ formatCurrency(totalRevenue) }}
                </div>
                <div class="text-sm text-gray-600 mt-1">
                  Selling: {{ formatCurrency(totalSelling) }} - Buying: {{ formatCurrency(totalBuying) }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Multiple Vendors Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
            <h3 class="text-lg font-semibold text-sage-800">Vendor Information (Buying)</h3>
          </div>
          <div class="p-6 space-y-4">
            
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm text-gray-600">Tambahkan detail vendor untuk setiap item buying</p>
              <button
                type="button"
                @click="addVendorDetail"
                class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Vendor
              </button>
            </div>

            <div v-if="vendorDetails.length === 0" class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              No vendor details added yet. Click "Add Vendor" to start.
            </div>

            <div v-for="(vendorDetail, index) in vendorDetails" :key="'vendor-detail-' + index" class="border border-sage-200 rounded-lg p-4 space-y-4">
              <div class="flex justify-between items-center">
                <h5 class="font-medium text-sage-700">Vendor #{{ index + 1 }}</h5>
                <button
                  type="button"
                  @click="removeVendorDetail(index)"
                  class="text-red-600 hover:text-red-800 p-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Pilih Vendor -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Pilih Vendor <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="vendorDetail.vendor_id"
                    @change="onVendorSelect(index)"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  >
                    <option value="">Pilih vendor...</option>
                    <option v-for="vendorOption in vendors" :key="vendorOption.id" :value="vendorOption.id">
                      {{ vendorOption.nama_vendor }}
                    </option>
                  </select>
                </div>

                <!-- Deskripsi -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Deskripsi Service
                  </label>
                  <input
                    v-model="vendorDetail.deskripsi"
                    type="text"
                    placeholder="Deskripsi layanan vendor"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
              </div>

              <!-- Info Vendor (Auto-filled) -->
              <div v-if="vendorDetail.vendor_id" class="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-sage-50 rounded-lg">
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">Nama Vendor</label>
                  <p class="text-sm text-gray-900">{{ vendorDetail.nama_vendor || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">Nomor Rekening</label>
                  <p class="text-sm text-gray-900 font-mono">{{ vendorDetail.no_rekening || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">Nama Rekening</label>
                  <p class="text-sm text-gray-900">{{ vendorDetail.nama_rekening || '-' }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Nominal -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Nominal <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="vendorDetail.nominal"
                    type="number"
                    step="0.01"
                    placeholder="0"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>

                <!-- RCVD INV -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    RCVD INV
                  </label>
                  <input
                    v-model="vendorDetail.rcvd_inv"
                    type="text"
                    placeholder="Nomor invoice yang diterima"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
              </div>
            </div>

            <!-- Total Vendor Costs -->
            <div v-if="vendorDetails.length > 0" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="flex justify-between items-center">
                <span class="font-medium text-blue-700">Total Vendor Costs:</span>
                <span class="text-xl font-bold text-blue-800">{{ formatCurrency(totalVendorCosts) }}</span>
              </div>
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
            <span v-if="form.processing">Memperbarui...</span>
            <span v-else>Perbarui Sales Order</span>
          </button>
        </div>
      </form>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useForm, Link } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";

const props = defineProps({
  salesOrder: Object,
  vendors: Array,
});

const form = useForm({
  order_number: props.salesOrder.order_number || "",
  customer: props.salesOrder.customer || "",
  shipper: props.salesOrder.shipper || "",
  bl_awb: props.salesOrder.bl_awb || "",
  pol: props.salesOrder.pol || "",
  pod: props.salesOrder.pod || "",
  eta: props.salesOrder.eta ? new Date(props.salesOrder.eta).toISOString().split('T')[0] : "",
  vessel: props.salesOrder.vessel || "",
  buying_breakdown: props.salesOrder.buying_breakdown || [{ vendor: '', amount: 0 }],
  selling_breakdown: props.salesOrder.selling_breakdown || [{ description: '', amount: 0 }],
});

// Vendor details data - supports multiple vendors
const vendorDetails = ref([]);

// Initialize vendor details from existing data
(() => {
  if (props.salesOrder.vendors) {
    if (Array.isArray(props.salesOrder.vendors) && props.salesOrder.vendors.length > 0) {
      props.salesOrder.vendors.forEach(vendorData => {
        vendorDetails.value.push({
          vendor_id: vendorData.vendor_id || "",
          nama_vendor: vendorData.company_name || vendorData.nama_vendor || "",
          no_rekening: vendorData.no_rekening || "",
          nama_rekening: vendorData.nama_rekening || "",
          deskripsi: vendorData.deskripsi || "",
          nominal: parseFloat(vendorData.nominal) || 0,
          rcvd_inv: vendorData.rcvd_inv || ""
        });
      });
    } else if (typeof props.salesOrder.vendors === 'object' && !Array.isArray(props.salesOrder.vendors)) {
      // Handle single vendor data (convert to array for backward compatibility)
      vendorDetails.value.push({
        vendor_id: props.salesOrder.vendors.vendor_id || "",
        nama_vendor: props.salesOrder.vendors.company_name || props.salesOrder.vendors.nama_vendor || "",
        no_rekening: props.salesOrder.vendors.no_rekening || "",
        nama_rekening: props.salesOrder.vendors.nama_rekening || "",
        deskripsi: props.salesOrder.vendors.deskripsi || "",
        nominal: parseFloat(props.salesOrder.vendors.nominal) || 0,
        rcvd_inv: props.salesOrder.vendors.rcvd_inv || ""
      });
    }
  }
  
  // If no vendors exist, add one empty vendor
  if (vendorDetails.value.length === 0) {
    vendorDetails.value.push({
      vendor_id: "",
      nama_vendor: "",
      no_rekening: "",
      nama_rekening: "",
      deskripsi: "",
      nominal: 0,
      rcvd_inv: ""
    });
  }
})();

// Add a new vendor detail entry
const addVendorDetail = () => {
  vendorDetails.value.push({
    vendor_id: "",
    nama_vendor: "",
    no_rekening: "",
    nama_rekening: "",
    deskripsi: "",
    nominal: 0,
    rcvd_inv: ""
  });
};

// Remove a vendor detail entry
const removeVendorDetail = (index) => {
  vendorDetails.value.splice(index, 1);
};

// Handle vendor selection and auto-fill data
const onVendorSelect = (index) => {
  const selectedVendor = props.vendors.find(v => v.id == vendorDetails.value[index].vendor_id);
  if (selectedVendor) {
    vendorDetails.value[index].nama_vendor = selectedVendor.nama_vendor;
    vendorDetails.value[index].no_rekening = selectedVendor.nomor_rekening;
    vendorDetails.value[index].nama_rekening = selectedVendor.nama_rekening;
  }
};

// Calculate total vendor costs
const totalVendorCosts = computed(() => {
  return vendorDetails.value.reduce((total, vendor) => {
    return total + (parseFloat(vendor.nominal) || 0);
  }, 0);
});

// Breakdown management functions
const addBuyingItem = () => {
  form.buying_breakdown.push({ vendor: '', amount: 0 });
};

const removeBuyingItem = (index) => {
  if (form.buying_breakdown.length > 1) {
    form.buying_breakdown.splice(index, 1);
  }
};

const addSellingItem = () => {
  form.selling_breakdown.push({ description: '', amount: 0 });
};

const removeSellingItem = (index) => {
  if (form.selling_breakdown.length > 1) {
    form.selling_breakdown.splice(index, 1);
  }
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount || 0);
};

// Computed properties for totals
const totalBuying = computed(() => {
  return form.buying_breakdown.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
});

const totalSelling = computed(() => {
  return form.selling_breakdown.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
});

const totalRevenue = computed(() => {
  return totalSelling.value - totalBuying.value;
});

const calculateTotals = () => {
  // This function is called to trigger reactivity if needed
  // The actual calculation is done by computed properties
  return {
    totalBuying: totalBuying.value,
    totalSelling: totalSelling.value,
    totalRevenue: totalRevenue.value
  };
};

const submit = () => {
  // Add vendor details to form data
  const formData = {
    ...form.data(),
    vendor_details: vendorDetails.value
  };
  
  form.transform(data => formData).put(route("admin-keuangan.sales-orders.update", props.salesOrder.id), {
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
/* Custom Sage Colors (same as Create) */
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