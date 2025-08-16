<template>
  <AdminLayout>
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
              <h2 class="text-2xl font-bold text-sage-800">
                Sales Order: {{ salesOrder.order_number }}
              </h2>
              <p class="text-sage-600">
                Detail informasi sales order
              </p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0 flex space-x-3">
            <a
              v-if="salesOrder.status === 'released' || salesOrder.status === 'confirmed' || salesOrder.status === 'approved'"
              :href="route('admin-cs.sales-orders.print', salesOrder.id)"
              target="_blank"
              class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print PDF
            </a>
            <button
              v-else
              disabled
              class="inline-flex items-center px-4 py-2 bg-gray-400 text-gray-700 rounded-lg cursor-not-allowed"
              title="Sales order harus dirilis terlebih dahulu untuk dapat dicetak"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print PDF (Belum Dirilis)
            </button>
            <Link
              :href="route('admin-cs.sales-orders.edit', salesOrder.id)"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
            <Link
              :href="route('admin-cs.sales-orders.index')"
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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- SO Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">Informasi Sales Order</h3>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">ORDER NUMB</label>
                <p class="text-gray-900 font-semibold">{{ salesOrder.order_number }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CUSTOMER</label>
                <p class="text-gray-900">{{ salesOrder.customer }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SHIPPER</label>
                <p class="text-gray-900">{{ salesOrder.shipper || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">BL/AWB</label>
                <p class="text-gray-900">{{ salesOrder.bl_awb || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">LINER</label>
                <p class="text-gray-900">{{ salesOrder.liner || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">VESSEL</label>
                <p class="text-gray-900">{{ salesOrder.vessel || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">ETA</label>
                <p class="text-gray-900">{{ salesOrder.eta ? formatDate(salesOrder.eta) : '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">AJU</label>
                <p class="text-gray-900">{{ salesOrder.aju || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SPPB DATE</label>
                <p class="text-gray-900">{{ salesOrder.sppb_date ? formatDate(salesOrder.sppb_date) : '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SHIPMENT TYPE</label>
                <p class="text-gray-900">{{ salesOrder.shipment_type || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">POL</label>
                <p class="text-gray-900">{{ salesOrder.pol || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">POD</label>
                <p class="text-gray-900">{{ salesOrder.pod || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">GUDANG/UTC</label>
                <p class="text-gray-900">{{ salesOrder.gudang_utc || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">PARTY/LCL</label>
                <p class="text-gray-900">{{ salesOrder.party_lcl || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">PREPARED BY</label>
                <p class="text-gray-900">{{ salesOrder.prepared_by || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">EXCHANGE RATE</label>
                <p class="text-gray-900">{{ salesOrder.exchange_rate || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">JENIS BIAYA</label>
                <p class="text-gray-900">{{ salesOrder.jenis_biaya || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">BUYING</label>
                <p class="text-gray-900">{{ salesOrder.buying ? formatCurrency(salesOrder.buying) : '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">SELLING</label>
                <p class="text-gray-900">{{ salesOrder.selling ? formatCurrency(salesOrder.selling) : '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">REVENUE</label>
                <p class="text-gray-900">{{ salesOrder.revenue ? formatCurrency(salesOrder.revenue) : '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">REMARKS</label>
                <p class="text-gray-900">{{ salesOrder.remarks || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">GOODS</label>
                <p class="text-gray-900">{{ salesOrder.goods || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CONTAINER NO</label>
                <p class="text-gray-900">{{ salesOrder.container_no || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">INVOICE NUMB</label>
                <p class="text-gray-900">{{ salesOrder.invoice_number || '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">INVOICE DATE</label>
                <p class="text-gray-900">{{ salesOrder.invoice_date ? formatDate(salesOrder.invoice_date) : '-' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">T.O.P</label>
                <p class="text-gray-900">{{ salesOrder.top || '-' }}</p>
              </div>
            </div>
          </div>

        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Status -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">Status</h3>
            </div>
            <div class="p-6">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center"
                :class="getStatusColor(salesOrder.status)"
              >
                {{ getStatusLabel(salesOrder.status || 'draft') }}
              </span>
            </div>
          </div>

          <!-- System Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">System Information</h3>
            </div>
            <div class="p-6 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Created By</label>
                <p class="text-gray-900">{{ salesOrder.creator?.name || 'Unknown' }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Created At</label>
                <p class="text-gray-900">{{ formatDateTime(salesOrder.created_at) }}</p>
              </div>
              <div v-if="salesOrder.last_modified_at">
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Modified</label>
                <p class="text-gray-900">{{ formatDateTime(salesOrder.last_modified_at) }}</p>
              </div>
              <div v-if="salesOrder.sent_at">
                <label class="block text-sm font-medium text-gray-700 mb-1">Sent At</label>
                <p class="text-gray-900">{{ formatDateTime(salesOrder.sent_at) }}</p>
              </div>
              <div v-if="salesOrder.confirmed_at">
                <label class="block text-sm font-medium text-gray-700 mb-1">Confirmed At</label>
                <p class="text-gray-900">{{ formatDateTime(salesOrder.confirmed_at) }}</p>
              </div>
            </div>
          </div>

          <!-- Related Customer -->
          <div v-if="salesOrder.customer_id" class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">Related Customer</h3>
            </div>
            <div class="p-6">
              <Link
                :href="route('admin-cs.customers.show', salesOrder.customer_id)"
                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors w-full justify-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Lihat Data Customer
              </Link>
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
  salesOrder: Object,
});

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString("id-ID");
};

const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString("id-ID");
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