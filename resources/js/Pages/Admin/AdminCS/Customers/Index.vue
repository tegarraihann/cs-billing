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
          <div>
            <h2 class="text-2xl font-bold text-sage-800 mb-2">
              Manajemen Data Pelanggan
            </h2>
            <p class="text-sage-600">
              Kelola data pengiriman dan vendor pelanggan
            </p>
          </div>
          <div class="mt-4 sm:mt-0">
            <Link
              :href="route('admin-cs.customers.create')"
              class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Tambah Data Pelanggan
            </Link>
          </div>
        </div>
      </div>

      <!-- Search Section -->
      <div
        class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Search Input -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2"
              >Cari Data</label
            >
            <input
              v-model="form.search"
              type="text"
              placeholder="Cari No, SO Number, Customer Code, AWB/BL..."
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            />
          </div>

          <!-- Search Button -->
          <div class="flex items-end">
            <button
              @click="search"
              class="w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            >
              Cari
            </button>
          </div>
        </div>
      </div>

      <!-- Customers Table -->
      <div
        class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-sage-200">
          <h3 class="text-lg font-semibold text-sage-800">Daftar Data Pelanggan</h3>
          <p class="text-sm text-sage-600 mt-1">
            Total: {{ customers?.total || 0 }} data
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-sage-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  SO Number
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Customer Code
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Consignee/Shipper
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  AWB/BL Number
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  ETA
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Vendors
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-sage-200">
              <tr
                v-for="customer in customers.data"
                :key="customer.id"
                class="hover:bg-sage-50 transition-colors"
              >
                <!-- No -->
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  {{ customer.no }}
                </td>

                <!-- SO Number -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ customer.so_number }}
                </td>

                <!-- Customer Code -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ customer.customer_code }}
                </td>

                <!-- Consignee/Shipper -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ customer.consignee_shipper }}
                </td>

                <!-- AWB/BL Number -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ customer.awb_bl_number }}
                </td>

                <!-- ETA -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ customer.eta ? formatDate(customer.eta) : '-' }}
                </td>

                <!-- Vendors -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div v-if="getVendorInfo(customer.vendors)">
                    <div class="space-y-1">
                      <div class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block">
                        {{ getVendorInfo(customer.vendors).company_name || 'Vendor' }}
                      </div>
                      <div class="text-xs text-gray-500">
                        {{ formatCurrency(getVendorInfo(customer.vendors).nominal) }}
                      </div>
                    </div>
                  </div>
                  <span v-else class="text-gray-400">-</span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <a
                      :href="`/admin-cs/customers/${customer.id}/print`"
                      class="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                      title="Cetak PDF"
                      target="_blank"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                    </a>
                    <Link
                      :href="route('admin-cs.customers.show', customer.id)"
                      class="inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors"
                      title="Lihat Detail"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="!customers.data || customers.data.length === 0">
                <td colspan="8" class="px-6 py-8 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <svg
                      class="w-12 h-12 text-gray-300 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                      />
                    </svg>
                    <p class="text-lg font-medium mb-2">Tidak ada data</p>
                    <p class="text-sm text-gray-400">
                      Belum ada data pelanggan yang tersedia
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          v-if="customers.last_page > 1"
          class="px-6 py-4 border-t border-sage-200"
        >
          <Pagination :data="customers" />
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { reactive, watch } from "vue";
import { router, Link } from "@inertiajs/vue3";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import Pagination from "@/Components/Pagination.vue";

const props = defineProps({
  customers: Object,
  filters: Object,
});

// Form data
const form = reactive({
  search: props.filters?.search || "",
});

const search = () => {
  const params = {};
  if (form.search) params.search = form.search;

  router.get(route("admin-cs.customers.index"), params, {
    preserveState: true,
    replace: true,
  });
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID");
};

const getVendorInfo = (vendors) => {
  if (!vendors) return null;
  
  // Handle if vendors is an array
  if (Array.isArray(vendors) && vendors.length > 0) {
    return vendors[0];
  }
  
  // Handle if vendors is an object
  if (typeof vendors === 'object' && !Array.isArray(vendors)) {
    return vendors;
  }
  
  return null;
};

const formatCurrency = (amount) => {
  if (!amount) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Watch for changes in search input and trigger search after a delay
watch(
  () => form.search,
  () => {
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      search();
    }, 500);
  }
);
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

.hover\:bg-sage-50:hover {
  background-color: #f4f6f3;
}

.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}

.hover\:text-sage-900:hover {
  color: #5a7a4f;
}

.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
  border-color: #8db580;
}

.divide-sage-200 > :not([hidden]) ~ :not([hidden]) {
  border-color: #d4ddd0;
}
</style>