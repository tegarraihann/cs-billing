<template>
  <AdminCSLayout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4">
                  <FileText class="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 class="text-2xl font-semibold text-gray-900">
                    Shipping Orderr: {{ salesOrder.order_number }}
                  </h1>
                  <p class="mt-1 text-sm text-gray-600">
                    Detail informasi Shipping Order
                  </p>
                </div>
              </div>
              <div class="mt-4 sm:mt-0 flex flex-wrap gap-3">
                <a
                  v-if="salesOrder.status === 'released' || salesOrder.status === 'confirmed' || salesOrder.status === 'approved'"
                  :href="route('admin-cs.sales-orders.print', salesOrder.id)"
                  target="_blank"
                  class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                >
                  <FileDown class="w-4 h-4 mr-2" />
                  Export PDF
                </a>
                <button
                  v-else
                  disabled
                  class="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
                  title="Shipping Order harus dirilis terlebih dahulu untuk dapat dicetak"
                >
                  <FileDown class="w-4 h-4 mr-2" />
                  Export PDF
                </button>
                <Link
                  v-if="salesOrder.status === 'draft'"
                  :href="route('admin-cs.sales-orders.edit', salesOrder.id)"
                  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                >
                  <Pencil class="w-4 h-4 mr-2" />
                  Edit
                </Link>
                <button
                  v-else
                  disabled
                  class="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"
                  title="Shipping Order tidak dapat diedit (sudah dirilis)"
                >
                  <Pencil class="w-4 h-4 mr-2" />
                  Edit
                </button>
                <Link
                  :href="route('admin-cs.sales-orders.index')"
                  class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
                >
                  <ArrowLeft class="w-4 h-4 mr-2" />
                  Kembali
                </Link>
              </div>
            </div>
          </div>
        </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- SO Information -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 class="text-lg font-semibold text-gray-900">Informasi Shipping Order</h3>
            </div>
            <div class="p-6">
              <!-- Primary Information - Two Columns -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <!-- Left Column -->
                <div class="space-y-3">
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">ORDER NUMB:</span>
                    <span class="font-semibold">{{ salesOrder.order_number }}</span>
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">REF NO:</span>
                    {{ salesOrder.ref_no || '-' }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">DATE:</span>
                    {{ salesOrder.so_date ? formatDate(salesOrder.so_date) : '-' }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">CUSTOMER:</span>
                    {{ salesOrder.customer }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">SHIPPER:</span>
                    {{ salesOrder.shipper || '-' }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">BL/AWB:</span>
                    {{ salesOrder.bl_awb || '-' }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">LINER:</span>
                    {{ salesOrder.liner || '-' }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">VESSEL:</span>
                    {{ salesOrder.vessel || '-' }}
                  </p>
                </div>

                <!-- Right Column -->
                <div class="space-y-3">
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">ETA:</span>
                    {{ salesOrder.eta ? formatDate(salesOrder.eta) : '-' }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">ETD:</span>
                    {{ salesOrder.etd ? formatDate(salesOrder.etd) : '-' }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">AJU:</span>
                    {{ salesOrder.aju || '-' }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">SPPB DATE:</span>
                    {{ salesOrder.sppb_date ? formatDate(salesOrder.sppb_date) : '-' }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">SHIPMENT TYPE:</span>
                    {{ salesOrder.shipment_type || '-' }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">POL/POD:</span>
                    {{ [salesOrder.pol, salesOrder.pod].filter(Boolean).join(' / ') || '-' }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">GUDANG/UTC:</span>
                    {{ salesOrder.gudang_utc || '-' }}
                  </p>
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">PARTY/LCL:</span>
                    {{ salesOrder.party_lcl || '-' }}
                  </p>
                </div>
              </div>

              <!-- Exchange Rate -->
              <div class="border-t border-gray-200 pt-6 mb-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">EXCHANGE RATE</label>
                    <p class="text-gray-900 font-mono">{{ salesOrder.exchange_rate ? formatNumber(salesOrder.exchange_rate) : '-' }}</p>
                  </div>
                </div>
              </div>

              <!-- Detail Informasi (Following PDF Format) -->
              <div class="border-t border-gray-200 pt-6">
                <h4 class="text-md font-semibold text-gray-800 mb-4">Detail Informasi</h4>

                <!-- Financial Summary Table (Print Draft Format) -->
                <div class="overflow-x-auto mb-6">
                  <table class="min-w-full">
                    <thead>
                      <tr class="bg-gray-50">
                        <th class="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">JENIS BIAYA</th>
                        <th class="px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wide">BUYING</th>
                        <th class="px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wide">SELLING</th>
                        <th class="px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wide">REVENUE</th>
                        <th class="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide">REMARKS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="salesOrder.vendor_breakdown && salesOrder.vendor_breakdown.length > 0"
                          v-for="(item, index) in salesOrder.vendor_breakdown"
                          :key="index"
                          class="hover:bg-gray-50 transition-colors">
                        <td class="px-6 py-4 text-sm text-gray-900">
                          {{ item.description || 'Service Type' }}
                        </td>
                        <td class="px-6 py-4 text-center text-sm font-mono text-gray-900">
                          {{ formatCurrency(item.buying_amount || 0) }}
                        </td>
                        <td class="px-6 py-4 text-center text-sm font-mono text-gray-900">
                          {{ formatCurrency(item.selling_amount || 0) }}
                        </td>
                        <td class="px-6 py-4 text-center text-sm font-mono" :class="getVendorProfit(item) >= 0 ? 'text-green-700' : 'text-red-600'">
                          {{ formatCurrency(getVendorProfit(item)) }}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">
                          {{ item.remarks || '-' }}
                        </td>
                      </tr>
                      <tr v-else>
                        <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                          <div class="flex flex-col items-center">
                            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                              <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak ada data breakdown</h3>
                            <p class="text-sm text-gray-500 max-w-sm">Belum ada informasi vendor breakdown. Data akan muncul setelah informasi pricing diisi.</p>
                          </div>
                        </td>
                      </tr>
                      <!-- Total Row -->
                      <tr v-if="salesOrder.vendor_breakdown && salesOrder.vendor_breakdown.length > 0" class="bg-gray-50 border-t border-gray-200">
                        <td class="px-6 py-4 text-sm font-semibold text-gray-900 uppercase">
                          TOTAL
                        </td>
                        <td class="px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900">
                          {{ formatCurrency(totalBuying) }}
                        </td>
                        <td class="px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900">
                          {{ formatCurrency(totalSelling) }}
                        </td>
                        <td class="px-6 py-4 text-center text-sm font-mono font-semibold" :class="totalRevenue >= 0 ? 'text-green-700' : 'text-red-600'">
                          {{ formatCurrency(totalRevenue) }}
                        </td>
                        <td class="px-6 py-4 text-center text-gray-400">
                          -
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Remarks Section -->
                <!-- <div v-if="salesOrder.remarks" class="mb-6">
                  <h5 class="text-sm font-semibold text-gray-800 mb-3">Catatan (Remarks)</h5>
                  <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p class="text-gray-900">{{ salesOrder.remarks }}</p>
                  </div>
                </div> -->

                <!-- Note Section -->
                <div v-if="salesOrder.note" class="mb-6">
                  <h5 class="text-sm font-semibold text-gray-800 mb-3">Catatan Tambahan (Note)</h5>
                  <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p class="text-gray-900 whitespace-pre-wrap">{{ salesOrder.note }}</p>
                  </div>
                </div>

                <!-- Biaya Beban Lain (Operational Costs) -->
                <div v-if="salesOrder.other_costs && salesOrder.other_costs.length > 0" class="mb-6">
                  <h5 class="text-sm font-semibold text-gray-800 mb-3">Biaya Beban Lain (Operational)</h5>
                  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div class="overflow-x-auto">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-red-50">
                          <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Description</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-red-700 uppercase tracking-wider">Amount</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Category</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider">Notes</th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <tr v-for="(cost, index) in salesOrder.other_costs" :key="index" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {{ cost.description || '-' }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-mono text-gray-900">
                              {{ formatCurrency(cost.amount || 0) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {{ cost.category || '-' }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-600">
                              {{ cost.notes || '-' }}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot class="bg-red-50">
                          <tr>
                            <td class="px-6 py-3 text-sm font-semibold text-red-800 uppercase">Total</td>
                            <td class="px-6 py-3 text-right text-sm font-mono font-semibold text-red-900">
                              {{ formatCurrency(salesOrder.other_costs.reduce((total, cost) => total + (parseFloat(cost.amount) || 0), 0)) }}
                            </td>
                            <td colspan="2" class="px-6 py-3"></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>

                <!-- Items Reimbursement -->
                <div v-if="salesOrder.reimbursement_items && salesOrder.reimbursement_items.length > 0" class="mb-6">
                  <h5 class="text-sm font-semibold text-gray-800 mb-3">Items Reimbursement</h5>
                  <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div class="overflow-x-auto">
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-orange-50">
                          <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Description</th>
                            <th class="px-6 py-3 text-right text-xs font-medium text-orange-700 uppercase tracking-wider">Amount</th>
                            <th class="px-6 py-3 text-center text-xs font-medium text-orange-700 uppercase tracking-wider">Status</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider">Notes</th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          <tr v-for="(item, index) in salesOrder.reimbursement_items" :key="index" class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {{ item.description || '-' }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-mono text-gray-900">
                              {{ formatCurrency(item.amount || 0) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-center">
                              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                                :class="getReimbursementStatusColor(item.status)">
                                {{ getReimbursementStatusText(item.status) }}
                              </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-600">
                              {{ item.notes || '-' }}
                            </td>
                          </tr>
                        </tbody>
                        <tfoot class="bg-orange-50">
                          <tr>
                            <td class="px-6 py-3 text-sm font-semibold text-orange-800 uppercase">Total</td>
                            <td class="px-6 py-3 text-right text-sm font-mono font-semibold text-orange-900">
                              {{ formatCurrency(salesOrder.reimbursement_items.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0)) }}
                            </td>
                            <td colspan="2" class="px-6 py-3"></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>


                <!-- Additional Information -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">COMMODITY/URAIAN BARANG</label>
                      <p class="text-gray-900">{{ salesOrder.commodity || '-' }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">QTY</label>
                      <p class="text-gray-900">{{ salesOrder.qty || '-' }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">NET WEIGHT (KG)</label>
                      <p class="text-gray-900">{{ salesOrder.net_weight ? formatWeight(salesOrder.net_weight) : '-' }}</p>
                    </div>
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">MEAS (M³)</label>
                      <p class="text-gray-900">{{ salesOrder.measurement ? formatMeasurement(salesOrder.measurement) : '-' }}</p>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">CONTAINER NO</label>
                      <div v-if="salesOrder.container_no && Array.isArray(salesOrder.container_no)" class="space-y-2">
                        <div class="flex flex-wrap gap-2">
                          <span v-for="(container, index) in salesOrder.container_no" :key="index" class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                            {{ container }}
                          </span>
                        </div>
                        <p class="text-xs text-gray-500">Total: {{ salesOrder.container_no.length }} container</p>
                      </div>
                      <div v-else-if="salesOrder.container_no" class="text-gray-900">
                        <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                          {{ salesOrder.container_no }}
                        </span>
                      </div>
                      <p v-else class="text-gray-900">-</p>
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
            </div>
          </div>
        </div>
        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Status -->
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 class="text-lg font-semibold text-gray-900">Status</h3>
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
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h3 class="text-lg font-semibold text-gray-900">System Information</h3>
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
        </div>
      </div>
    </div>
  </div>
</AdminCSLayout>
</template>

<script setup>
import { computed } from "vue";
import { Link } from "@inertiajs/vue3";
import AdminCSLayout from "@/Layouts/AdminCSLayout.vue";
import { FileText, FileDown, Pencil, ArrowLeft } from "lucide-vue-next";

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
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format number with thousand separators (dots)
const formatNumber = (amount) => {
  const numAmount = parseFloat(amount) || 0;
  return numAmount.toLocaleString('id-ID');
};

// Computed properties for breakdown totals
const totalBuying = computed(() => {
  if (!props.salesOrder.vendor_breakdown) return 0;
  return props.salesOrder.vendor_breakdown.reduce((sum, item) => sum + (parseFloat(item.buying_amount) || 0), 0);
});

const totalSelling = computed(() => {
  if (!props.salesOrder.vendor_breakdown) return 0;
  return props.salesOrder.vendor_breakdown.reduce((sum, item) => sum + (parseFloat(item.selling_amount) || 0), 0);
});

const totalRevenue = computed(() => {
  return totalSelling.value - totalBuying.value;
});

// Get profit for individual vendor
const getVendorProfit = (vendorItem) => {
  const buying = parseFloat(vendorItem.buying_amount) || 0;
  const selling = parseFloat(vendorItem.selling_amount) || 0;
  return selling - buying;
};

const formatWeight = (weight) => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(weight) + ' kg';
};

const formatMeasurement = (measurement) => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(measurement) + ' m³';
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

// Voucher status functions
// Reimbursement status functions
const getReimbursementStatusText = (status) => {
  const labels = {
    pending: 'Pending',
    linked: 'Linked to Invoice',
    invoiced: 'Invoiced',
    cancelled: 'Cancelled'
  };
  return labels[status] || status || 'Pending';
};

const getReimbursementStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    linked: 'bg-blue-100 text-blue-800',
    invoiced: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

// Vendor information is now integrated into buying_breakdown
</script>

<style scoped>
.bg-sage-800 {
  background-color: #6b8f5e;
}
</style>


