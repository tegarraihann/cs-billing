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
              Manajemen Sales Order
            </h2>
            <p class="text-sage-600">
              Kelola dokumen sales order dan penawaran harga
            </p>
          </div>
          <div class="mt-4 sm:mt-0">
            <Link
              :href="route('admin-cs.sales-orders.create')"
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
              Buat Sales Order
            </Link>
          </div>
        </div>
      </div>

      <!-- Search and Filter Section -->
      <div
        class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Search Input -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2"
              >Cari Data</label
            >
            <input
              v-model="form.search"
              type="text"
              placeholder="Cari SO Number, Customer, Consignee..."
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            />
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-sage-700 mb-2"
              >Status</label
            >
            <select
              v-model="form.status"
              class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            >
              <option value="">Semua Status</option>
              <option value="draft">Draft</option>
              <option value="sent">Terkirim</option>
              <option value="confirmed">Dikonfirmasi</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
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

      <!-- Sales Orders Table -->
      <div
        class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-sage-200">
          <h3 class="text-lg font-semibold text-sage-800">Daftar Sales Order</h3>
          <p class="text-sm text-sage-600 mt-1">
            Total: {{ salesOrders?.total || 0 }} data
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-sage-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  SO Number
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Tanggal SO
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Consignee/Shipper
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Total Amount
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"
                >
                  Status
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
                v-for="salesOrder in salesOrders.data"
                :key="salesOrder.id"
                class="hover:bg-sage-50 transition-colors"
              >
                <!-- SO Number -->
                <td class="px-6 py-4 text-sm font-medium text-gray-900">
                  {{ salesOrder.so_number }}
                </td>

                <!-- SO Date -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ formatDate(salesOrder.so_date) }}
                </td>

                <!-- Customer -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div>
                    <div class="font-medium">{{ salesOrder.customer_name }}</div>
                    <div class="text-gray-500" v-if="salesOrder.customer_code">
                      {{ salesOrder.customer_code }}
                    </div>
                  </div>
                </td>

                <!-- Consignee/Shipper -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ salesOrder.consignee_shipper }}
                </td>

                <!-- Total Amount -->
                <td class="px-6 py-4 text-sm text-gray-900">
                  <span class="font-medium">
                    {{ formatCurrency(salesOrder.total_amount, salesOrder.currency) }}
                  </span>
                </td>

                <!-- Status -->
                <td class="px-6 py-4 text-sm">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getStatusColor(salesOrder.status)"
                  >
                    {{ getStatusLabel(salesOrder.status) }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="releaseSalesOrder(salesOrder.id)"
                      :disabled="salesOrder.status === 'released' || salesOrder.status === 'confirmed' || salesOrder.status === 'approved' || salesOrder.status === 'rejected'"
                      class="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                      :class="salesOrder.status === 'released' || salesOrder.status === 'confirmed' || salesOrder.status === 'approved' || salesOrder.status === 'rejected'
                        ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                        : 'text-blue-600 hover:text-blue-900 hover:bg-blue-100'"
                      :title="salesOrder.status === 'released' || salesOrder.status === 'confirmed' || salesOrder.status === 'approved' || salesOrder.status === 'rejected' ? 'Sudah Diproses' : 'Rilis Sales Order'"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                    <Link
                      :href="route('admin-cs.sales-orders.show', salesOrder.id)"
                      class="inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors"
                      title="Lihat Detail"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                  </Link>
                  <Link
                    :href="route('admin-cs.sales-orders.edit', salesOrder.id)"
                    class="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                    title="Edit"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>
                  </div>
                </td>
              </tr>

              <!-- Empty State -->
              <tr v-if="!salesOrders.data || salesOrders.data.length === 0">
                <td colspan="7" class="px-6 py-8 text-center text-gray-500">
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
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p class="text-lg font-medium mb-2">Tidak ada data</p>
                    <p class="text-sm text-gray-400">
                      Belum ada sales order yang tersedia
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          v-if="salesOrders.last_page > 1"
          class="px-6 py-4 border-t border-sage-200"
        >
          <Pagination :data="salesOrders" />
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
  salesOrders: Object,
  filters: Object,
});

// Form data
const form = reactive({
  search: props.filters?.search || "",
  status: props.filters?.status || "",
});

const search = () => {
  const params = {};
  if (form.search) params.search = form.search;
  if (form.status) params.status = form.status;

  router.get(route("admin-cs.sales-orders.index"), params, {
    preserveState: true,
    replace: true,
  });
};

const releaseSalesOrder = (salesOrderId) => {
  if (confirm('Apakah Anda yakin ingin merilis sales order ini? Sales order yang sudah dirilis akan dikirim ke admin keuangan dan tidak dapat diubah lagi.')) {
    router.post(route('admin-cs.sales-orders.release', salesOrderId), {}, {
      onSuccess: () => {
        // Refresh the page to show updated status
        router.get(route("admin-cs.sales-orders.index"), {
          search: form.search,
          status: form.status
        }, {
          preserveState: true,
          replace: true,
        });
      },
      onError: (errors) => {
        alert('Terjadi kesalahan saat merilis sales order: ' + Object.values(errors).join(', '));
      }
    });
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID");
};

const formatCurrency = (amount, currency = 'IDR') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

const getStatusLabel = (status) => {
  const labels = {
    draft: 'Draft',
    sent: 'Terkirim',
    confirmed: 'Dikonfirmasi',
    cancelled: 'Dibatalkan',
    released: 'Dirilis',
    approved: 'Disetujui',
    rejected: 'Ditolak'
  };
  return labels[status] || status;
};

const getStatusColor = (status) => {
  const colors = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    released: 'bg-purple-100 text-purple-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
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

// Watch for changes in status filter
watch(
  () => form.status,
  () => {
    search();
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