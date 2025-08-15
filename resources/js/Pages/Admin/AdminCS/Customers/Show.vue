<template>
  <AdminLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div
        class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">
                {{ customer.customer_code || customer.no }}
              </h2>
              <p class="text-sage-600">
                Detail informasi pelanggan dan data pengiriman
              </p>
            </div>
          </div>
          <div class="flex space-x-2 mt-4 sm:mt-0">
            <Link
              :href="route('admin-cs.customers.edit', customer.id)"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit
            </Link>
            <Link
              :href="route('admin-cs.customers.index')"
              class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali
            </Link>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Shipping Information -->
        <div class="lg:col-span-2">
          <div
            class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
          >
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">
                Informasi Pengiriman
              </h3>
            </div>

            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- No -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    No
                  </label>
                  <p class="text-gray-900">{{ customer.no || '-' }}</p>
                </div>

                <!-- SO Number -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    SO Number
                  </label>
                  <p class="text-gray-900">{{ customer.so_number || '-' }}</p>
                </div>

                <!-- Customer Code -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Customer Code
                  </label>
                  <p class="text-gray-900">{{ customer.customer_code || '-' }}</p>
                </div>

                <!-- Consignee/Shipper -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Consignee/Shipper
                  </label>
                  <p class="text-gray-900">{{ customer.consignee_shipper || '-' }}</p>
                </div>

                <!-- AWB/BL Number -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    AWB/BL Number
                  </label>
                  <p class="text-gray-900">{{ customer.awb_bl_number || '-' }}</p>
                </div>

                <!-- Cust Doc Name -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Cust Doc Name
                  </label>
                  <p class="text-gray-900">{{ customer.cust_doc_name || '-' }}</p>
                </div>

                <!-- Type Qty -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Type Qty
                  </label>
                  <p class="text-gray-900">{{ customer.type_qty || '-' }}</p>
                </div>

                <!-- No Kont/Pallet -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    No Kont/Pallet
                  </label>
                  <p class="text-gray-900">{{ customer.no_kont_pallet || '-' }}</p>
                </div>

                <!-- POL/POD -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    POL/POD
                  </label>
                  <p class="text-gray-900">{{ customer.pol_pod || '-' }}</p>
                </div>

                <!-- ETA -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    ETA
                  </label>
                  <p class="text-gray-900">{{ customer.eta ? formatDate(customer.eta) : '-' }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- System Information -->
        <div>
          <div
            class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
          >
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">
                Informasi Sistem
              </h3>
            </div>

            <div class="p-6">
              <div class="space-y-4">
                <!-- Handler -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Ditangani Oleh
                  </label>
                  <p class="text-gray-900">{{ customer.handler?.name || '-' }}</p>
                </div>

                <!-- Created At -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Dibuat
                  </label>
                  <p class="text-gray-900">{{ formatDateTime(customer.created_at) }}</p>
                </div>

                <!-- Updated At -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Terakhir Diperbarui
                  </label>
                  <p class="text-gray-900">{{ formatDateTime(customer.updated_at) }}</p>
                </div>

                <!-- Last Contact -->
                <div v-if="customer.last_contact_at">
                  <label class="block text-sm font-medium text-sage-700 mb-1">
                    Kontak Terakhir
                  </label>
                  <p class="text-gray-900">{{ formatDateTime(customer.last_contact_at) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vendor Information -->
      <div class="mt-6">
        <div
          class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
        >
          <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
            <h3 class="text-lg font-semibold text-sage-800">
              Buying to Vendor
            </h3>
            <p class="text-sm text-sage-600 mt-1">
              {{ customer.vendors?.length || 0 }} vendor terdaftar
            </p>
          </div>

          <div class="p-6">
            <div v-if="customer.vendors && customer.vendors.length > 0" class="space-y-6">
              <div 
                v-for="(vendor, index) in customer.vendors" 
                :key="index" 
                class="border border-sage-200 rounded-lg p-4 bg-sage-50"
              >
                <div class="flex items-center justify-between mb-4">
                  <h4 class="font-medium text-sage-800">Vendor {{ index + 1 }}</h4>
                  <span 
                    v-if="vendor.nominal"
                    class="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full"
                  >
                    {{ formatCurrency(vendor.nominal) }}
                  </span>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <!-- Deskripsi -->
                  <div class="md:col-span-2 lg:col-span-3">
                    <label class="block text-sm font-medium text-sage-700 mb-1">
                      Deskripsi
                    </label>
                    <p class="text-gray-900 bg-white p-3 rounded border border-sage-200">
                      {{ vendor.deskripsi || '-' }}
                    </p>
                  </div>

                  <!-- Nominal -->
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-1">
                      Nominal
                    </label>
                    <p class="text-gray-900">{{ vendor.nominal ? formatCurrency(vendor.nominal) : '-' }}</p>
                  </div>

                  <!-- No Rekening -->
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-1">
                      No Rekening
                    </label>
                    <p class="text-gray-900">{{ vendor.no_rekening || '-' }}</p>
                  </div>

                  <!-- Company Name -->
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-1">
                      Company Name
                    </label>
                    <p class="text-gray-900">{{ vendor.company_name || '-' }}</p>
                  </div>

                  <!-- RCVD INV -->
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-1">
                      RCVD INV
                    </label>
                    <p class="text-gray-900">{{ vendor.rcvd_inv || '-' }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Empty State -->
            <div v-else class="text-center py-8">
              <svg
                class="w-12 h-12 text-gray-300 mb-4 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <p class="text-lg font-medium text-gray-900 mb-2">Tidak ada data vendor</p>
              <p class="text-sm text-gray-400">
                Belum ada vendor yang terdaftar untuk data ini
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import AdminLayout from "@/Layouts/AdminLayout.vue";

const props = defineProps({
  customer: Object,
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("id-ID", {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
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

.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}
</style>