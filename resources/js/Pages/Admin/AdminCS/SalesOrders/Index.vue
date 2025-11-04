<template>
  <AdminCSLayout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Manajemen Shipping Order</h1>
            <p class="mt-1 text-sm text-gray-600">Kelola dokumen Shipping Order dan penawaran harga</p>
          </div>
          <div class="mt-4 sm:mt-0 flex space-x-2">
            <Link
              :href="route('admin-cs.sales-orders.create')"
              class="inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 hover:bg-sage-900"
            >
              <Plus class="w-4 h-4 mr-2" />
              Buat Shipping Order
            </Link>
          </div>
        </div>

        <!-- Filter Section -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md mb-6">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Filter Data</h3>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Cari Data</label>
                <input
                  v-model="form.search"
                  @input="debouncedSearch()"
                  type="text"
                  placeholder="Cari SO Number, Customer, Consignee..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  v-model="form.status"
                  @change="onStatusChange"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                >
                  <option value="">Semua Status</option>
                  <option value="draft">Draft</option>
                  <option value="sent">Terkirim</option>
                  <option value="confirmed">Dikonfirmasi</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
              </div>
              <div class="flex items-end">
                <button
                  @click="applyFilters"
                  class="w-full px-4 py-2 bg-sage-800 text-white rounded-md transition-colors hover:bg-sage-900"
                >
                  Cari
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Sales Orders Table -->
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 sm:p-6">
            <div class="sm:flex sm:items-center sm:justify-between mb-4">
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Daftar Shipping Order</h3>
                <p class="mt-1 text-sm text-gray-600">Total: {{ salesOrders?.total || 0 }} data</p>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order Number
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shipper
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Shipment Type
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commodity
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      QTY
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Container No
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="salesOrder in salesOrders.data"
                    :key="salesOrder.id"
                    class="hover:bg-gray-50 transition-colors"
                  >
                    <!-- Order Number -->
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                      {{ salesOrder.order_number || salesOrder.so_number }}
                    </td>

                    <!-- Customer -->
                    <td class="px-6 py-4 text-sm text-gray-900">
                      <div>
                        <div class="font-medium">{{ salesOrder.customer || salesOrder.customer_name }}</div>
                        <div class="text-gray-500" v-if="salesOrder.customer_code">
                          {{ salesOrder.customer_code }}
                        </div>
                      </div>
                    </td>

                    <!-- Shipper -->
                    <td class="px-6 py-4 text-sm text-gray-900">
                      {{ salesOrder.shipper || salesOrder.consignee_shipper || '-' }}
                    </td>

                    <!-- Shipment Type -->
                    <td class="px-6 py-4 text-sm text-gray-900">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {{ salesOrder.shipment_type || '-' }}
                      </span>
                    </td>

                    <!-- Commodity -->
                    <td class="px-6 py-4 text-sm text-gray-900">
                      <div class="max-w-32 truncate" :title="salesOrder.commodity">
                        {{ salesOrder.commodity || salesOrder.goods || '-' }}
                      </div>
                    </td>

                    <!-- QTY -->
                    <td class="px-6 py-4 text-sm text-gray-900">
                      {{ salesOrder.qty || '-' }}
                    </td>

                    <!-- Container No -->
                    <td class="px-6 py-4 text-sm text-gray-900">
                      <div v-if="salesOrder.container_no && Array.isArray(salesOrder.container_no)" class="space-y-1">
                        <span
                          v-for="(container, index) in salesOrder.container_no.slice(0, 2)"
                          :key="index"
                          class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1"
                        >
                          {{ container }}
                        </span>
                        <div v-if="salesOrder.container_no.length > 2" class="text-xs text-gray-500">
                          +{{ salesOrder.container_no.length - 2 }} lainnya
                        </div>
                      </div>
                      <span
                        v-else-if="salesOrder.container_no"
                        class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {{ salesOrder.container_no }}
                      </span>
                      <span v-else class="text-gray-500">-</span>
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
                          :disabled="isProcessedStatus(salesOrder.status)"
                          class="inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors"
                          :class="isProcessedStatus(salesOrder.status)
                            ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                            : 'text-sage-600 hover:text-sage-900 hover:bg-sage-100'"
                          :title="isProcessedStatus(salesOrder.status) ? 'Sudah Diproses' : 'Rilis Shipping Order'"
                        >
                          <Send class="w-4 h-4" />
                        </button>

                        <Link
                          :href="route('admin-cs.sales-orders.show', salesOrder.id)"
                          class="inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors"
                          title="Lihat Detail"
                        >
                          <Eye class="w-4 h-4" />
                        </Link>

                        <Link
                          v-if="salesOrder.status === 'draft'"
                          :href="route('admin-cs.sales-orders.edit', salesOrder.id)"
                          class="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full transition-colors"
                          title="Edit"
                        >
                          <Pencil class="w-4 h-4" />
                        </Link>
                        <span
                          v-else
                          class="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-100 rounded-full cursor-not-allowed"
                          title="Tidak dapat diedit (Shipping Order sudah diproses)"
                        >
                          <Pencil class="w-4 h-4" />
                        </span>

                        <button
                          v-if="salesOrder.status === 'draft'"
                          @click="deleteSalesOrder(salesOrder.id)"
                          class="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors"
                          title="Hapus"
                        >
                          <Trash2 class="w-4 h-4" />
                        </button>
                        <span
                          v-else
                          class="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-100 rounded-full cursor-not-allowed"
                          title="Tidak dapat dihapus (Shipping Order sudah diproses)"
                        >
                          <Trash2 class="w-4 h-4" />
                        </span>
                      </div>
                    </td>
                  </tr>

                  <!-- Empty State -->
                  <tr v-if="!salesOrders.data || salesOrders.data.length === 0">
                    <td colspan="9" class="px-6 py-8 text-center text-gray-500">
                      <div class="flex flex-col items-center">
                        <FileText class="w-12 h-12 text-gray-300 mb-4" />
                        <p class="text-lg font-medium mb-2">Tidak ada data</p>
                        <p class="text-sm text-gray-400">
                          Belum ada Shipping Order yang tersedia
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
              class="px-4 py-4 border-t border-gray-200"
            >
              <Pagination :data="salesOrders" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Release Confirmation Dialog -->
    <AlertDialog
      :show="showReleaseDialog"
      type="confirm"
      title="Konfirmasi Rilis Shipping Order"
      message="Apakah Anda yakin ingin merilis Shipping Order ini? Shipping Order yang sudah dirilis akan dikirim ke admin keuangan dan tidak dapat diubah lagi."
      confirm-text="Ya, Rilis"
      cancel-text="Batal"
      @confirm="confirmRelease"
      @cancel="cancelRelease"
      @close="cancelRelease"
    />

    <!-- Delete Confirmation Dialog -->
    <AlertDialog
      :show="showDeleteDialog"
      type="confirm"
      title="Konfirmasi Hapus Shipping Orderr"
      message="Apakah Anda yakin ingin menghapus Shipping Order ini? Tindakan ini tidak dapat dibatalkan."
      confirm-text="Ya, Hapus"
      cancel-text="Batal"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
      @close="cancelDelete"
    />
  </AdminCSLayout>
</template>

<script setup>
import { reactive, ref, onBeforeUnmount } from "vue";
import { router, Link } from "@inertiajs/vue3";
import { debounce } from "lodash";
import AdminCSLayout from "@/Layouts/AdminCSLayout.vue";
import Pagination from "@/Components/Pagination.vue";
import AlertDialog from "@/Components/AlertDialog.vue";
import { Plus, Send, Eye, Pencil, Trash2, FileText } from "lucide-vue-next";

const props = defineProps({
  salesOrders: Object,
  filters: Object,
});

const form = reactive({
  search: props.filters?.search || "",
  status: props.filters?.status || "",
});

const applyFilters = () => {
  const params = {};
  if (form.search) params.search = form.search;
  if (form.status) params.status = form.status;

  router.get(route("admin-cs.sales-orders.index"), params, {
    preserveState: true,
    replace: true,
  });
};

const debouncedSearch = debounce(applyFilters, 300);
const onStatusChange = () => applyFilters();

const showReleaseDialog = ref(false);
const showDeleteDialog = ref(false);
const currentSalesOrderId = ref(null);

const processedStatuses = ["released", "confirmed", "approved", "rejected"];
const isProcessedStatus = (status) => processedStatuses.includes(status);

const releaseSalesOrder = (salesOrderId) => {
  currentSalesOrderId.value = salesOrderId;
  showReleaseDialog.value = true;
};

const confirmRelease = () => {
  if (!currentSalesOrderId.value) return;

  router.post(route("admin-cs.sales-orders.release", currentSalesOrderId.value), {}, {
    onSuccess: () => applyFilters(),
    onError: (errors) => {
      alert("Terjadi kesalahan saat merilis Shipping Order: " + Object.values(errors).join(", "));
    },
    onFinish: () => {
      showReleaseDialog.value = false;
      currentSalesOrderId.value = null;
    },
  });
};

const cancelRelease = () => {
  showReleaseDialog.value = false;
  currentSalesOrderId.value = null;
};

const deleteSalesOrder = (salesOrderId) => {
  currentSalesOrderId.value = salesOrderId;
  showDeleteDialog.value = true;
};

const confirmDelete = () => {
  if (!currentSalesOrderId.value) return;

  router.delete(route("admin-cs.sales-orders.destroy", currentSalesOrderId.value), {
    onSuccess: () => applyFilters(),
    onError: (errors) => {
      alert("Terjadi kesalahan saat menghapus Shipping Order: " + Object.values(errors).join(", "));
    },
    onFinish: () => {
      showDeleteDialog.value = false;
      currentSalesOrderId.value = null;
    },
  });
};

const cancelDelete = () => {
  showDeleteDialog.value = false;
  currentSalesOrderId.value = null;
};

const getStatusLabel = (status) => {
  const labels = {
    draft: "Draft",
    sent: "Terkirim",
    confirmed: "Dikonfirmasi",
    cancelled: "Dibatalkan",
    released: "Dirilis",
    approved: "Disetujui",
    rejected: "Ditolak",
  };
  return labels[status] || status;
};

const getStatusColor = (status) => {
  const colors = {
    draft: "bg-gray-100 text-gray-800",
    sent: "bg-blue-100 text-blue-800",
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    released: "bg-purple-100 text-purple-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

onBeforeUnmount(() => {
  debouncedSearch.cancel();
});
</script>

<style scoped>
.text-sage-600 {
  color: #8db580;
}
.text-sage-700 {
  color: #7ba169;
}
.text-sage-800 {
  color: #6b8f5e;
}
.text-sage-900 {
  color: #5a7a4f;
}
.bg-sage-100 {
  background-color: #e8ece5;
}
.bg-sage-800 {
  background-color: #6b8f5e;
}
.bg-sage-900 {
  background-color: #5a7a4f;
}
.hover\:bg-sage-100:hover {
  background-color: #e8ece5;
}
.hover\:bg-sage-900:hover {
  background-color: #5a7a4f;
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
</style>
