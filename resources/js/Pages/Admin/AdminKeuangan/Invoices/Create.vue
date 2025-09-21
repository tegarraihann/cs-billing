<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-sage-800">Buat Invoice Baru</h2>
            <p class="text-sage-600">Buat invoice dari sales order yang telah disetujui</p>
          </div>
          <Link
            :href="route('admin-keuangan.invoices.index')"
            class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali
          </Link>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="space-y-6">
        <!-- Sales Order Selection -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
          <h3 class="text-lg font-semibold text-sage-800 mb-4">Pilih Sales Order & Type Invoice</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sales Order</label>
              <select
                v-model="form.sales_order_id"
                @change="loadSalesOrderData"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                required
              >
                <option value="">Pilih Sales Order</option>
                <option v-for="order in salesOrders" :key="order.id" :value="order.id">
                  {{ order.order_number }} - {{ order.customer || order.customer_name || 'No Customer' }} ({{ order.status?.toUpperCase() || 'APPROVED' }})
                </option>
              </select>
              <div v-if="errors.sales_order_id" class="text-red-500 text-sm mt-1">
                {{ errors.sales_order_id }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipe Invoice</label>
              <div class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600">
                Combined Invoice (Main + Reimbursement)
              </div>
              <input type="hidden" v-model="form.invoice_type" />
            </div>
          </div>
        </div>

        <!-- Invoice Details -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
          <h3 class="text-lg font-semibold text-sage-800 mb-4">Detail Invoice</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Invoice</label>
              <input
                type="date"
                v-model="form.invoice_date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                required
              />
              <div v-if="errors.invoice_date" class="text-red-500 text-sm mt-1">
                {{ errors.invoice_date }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Term (Hari)</label>
              <input
                type="number"
                v-model="form.term_days"
                min="1"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                required
              />
              <div v-if="errors.term_days" class="text-red-500 text-sm mt-1">
                {{ errors.term_days }}
              </div>
            </div>
          </div>
        </div>

        <!-- Shipment Details -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
          <h3 class="text-lg font-semibold text-sage-800 mb-4">Detail Pengiriman</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Shipper</label>
              <input
                type="text"
                v-model="form.shipper"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Consignee</label>
              <input
                type="text"
                v-model="form.consignee"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">AWB/BL No.</label>
              <input
                type="text"
                v-model="form.awb_bl_no"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">MAWB/OBL No.</label>
              <input
                type="text"
                v-model="form.mawb_obl_no"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Vessel</label>
              <input
                type="text"
                v-model="form.vessel"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Flight/VOY</label>
              <input
                type="text"
                v-model="form.flight_voy"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">POL/POD</label>
              <input
                type="text"
                v-model="form.pol_pod"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Origin</label>
              <input
                type="text"
                v-model="form.origin"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <input
                type="text"
                v-model="form.destination"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">ETD</label>
              <input
                type="date"
                v-model="form.etd"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">ETA</label>
              <input
                type="date"
                v-model="form.eta"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Gross Weight (KG)</label>
              <input
                type="number"
                v-model="form.gross_weight"
                step="0.0001"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Volume</label>
              <input
                type="text"
                v-model="form.volume"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
                placeholder="e.g., 10.5 M³"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">No of Packages</label>
              <input
                type="number"
                v-model="form.no_of_packages"
                min="0"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">20'/40'/45'</label>
              <input
                type="text"
                v-model="form.container_size"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
                placeholder="e.g., 20GP, 40GP, 45GP"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Container No.</label>
              <input
                type="text"
                v-model="form.container_no"
                :readonly="form.sales_order_id"
                :class="[
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                  form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                ]"
                placeholder="e.g., MSKU2934199"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
              <textarea
                v-model="form.remarks"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Invoice Items -->
        <div class="space-y-6">
          <!-- Main Invoice Items (Table Style) -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-sage-800">Item Invoice Utama</h3>
              <button
                type="button"
                @click="addItem"
                class="inline-flex items-center px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Item
              </button>
            </div>

            <div v-if="mainItems.length === 0" class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <div class="flex flex-col items-center">
                <svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>Belum ada item invoice utama</p>
                <p class="text-sm">Klik tombol "Tambah Item" untuk menambah item</p>
              </div>
            </div>

            <div class="space-y-4">
              <div v-for="(item, index) in mainItems" :key="'main-' + index" class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                  <h4 class="font-medium text-gray-900">Item {{ index + 1 }}</h4>
                  <button
                    type="button"
                    @click="removeMainItem(index)"
                    class="text-red-600 hover:text-red-800"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                    <input
                      type="text"
                      v-model="item.description"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Qty</label>
                    <input
                      type="number"
                      v-model="item.quantity"
                      @input="calculateMainAmount(index)"
                      step="0.01"
                      min="0.01"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <input
                      type="text"
                      v-model="item.unit"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Rate</label>
                    <input
                      type="number"
                      v-model="item.rate"
                      @input="calculateMainAmount(index)"
                      step="0.01"
                      min="0"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                      type="text"
                      :value="formatCurrency(item.amount || 0)"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Reimbursement Invoice Items (Voucher Style) -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-sage-800">Item Reimbursement</h3>
              <button
                type="button"
                @click="addReimbursementItem"
                class="inline-flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Item Reimbursement
              </button>
            </div>

            <div v-if="reimbursementItems.length === 0" class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <div class="flex flex-col items-center">
                <svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>Belum ada item reimbursement</p>
                <p class="text-sm">Klik tombol "Tambah Item Reimbursement" untuk menambah item</p>
              </div>
            </div>

            <div class="space-y-4">
              <div v-for="(item, index) in reimbursementItems" :key="'reimb-' + index" class="border border-gray-200 rounded-lg p-4">
                <div class="flex justify-between items-center mb-3">
                  <h4 class="font-medium text-gray-700">Reimbursement Item #{{ index + 1 }}</h4>
                  <button
                    type="button"
                    @click="removeReimbursementItem(index)"
                    class="text-red-600 hover:text-red-800"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Item Number/Ref</label>
                    <input
                      v-model="item.item_ref"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      placeholder="e.g., REIMB-001"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      v-model="item.currency"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    >
                      <option value="IDR">IDR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="SGD">SGD</option>
                    </select>
                  </div>
                </div>

                <div class="mt-3">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    v-model="item.description"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                    placeholder="e.g., Biaya trucking dari gudang ke pelabuhan"
                    required
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      v-model="item.quantity"
                      @input="calculateReimbursementAmount(index)"
                      type="number"
                      step="0.01"
                      min="0.01"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      placeholder="1"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Unit Rate</label>
                    <input
                      v-model="item.rate"
                      @input="calculateReimbursementAmount(index)"
                      type="number"
                      step="0.01"
                      min="0"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      placeholder="500000"
                      required
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                    <input
                      type="text"
                      :value="formatCurrency(item.amount || 0, item.currency || 'IDR')"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                      readonly
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
          <div class="flex items-center justify-between">
            <div class="text-lg font-semibold text-sage-800">
              Total: {{ formatCurrency(calculateTotal()) }}
            </div>
            <div class="flex space-x-4">
              <Link
                :href="route('admin-keuangan.invoices.index')"
                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </Link>
              <button
                type="submit"
                :disabled="form.processing"
                class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50"
              >
                {{ form.processing ? 'Menyimpan...' : 'Simpan Invoice' }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useForm, Link } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';

const props = defineProps({
  salesOrders: Array,
  errors: Object,
  preselectedSalesOrder: [String, Number],
  preselectedInvoiceType: String,
});

const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.invoices.index': '/admin-keuangan/invoices',
    'admin-keuangan.invoices.store': '/admin-keuangan/invoices',
  };
  return routes[name] || '#';
};

// Separate reactive arrays for main and reimbursement items
const mainItems = ref([]);
const reimbursementItems = ref([]);

const form = useForm({
  sales_order_id: props.preselectedSalesOrder || '',
  invoice_type: 'combined', // Always combined since we show both sections
  invoice_date: new Date().toISOString().split('T')[0],
  term_days: 30,
  shipper: '',
  consignee: '',
  awb_bl_no: '',
  mawb_obl_no: '',
  gross_weight: '',
  volume: '',
  no_of_packages: '',
  vessel: '',
  flight_voy: '',
  pol_pod: '',
  origin: '',
  destination: '',
  etd: '',
  eta: '',
  container_no: '',
  container_size: '',
  remarks: '',
  items: []
});

const loadSalesOrderData = () => {
  const selectedOrder = props.salesOrders.find(order => order.id == form.sales_order_id);
  if (selectedOrder) {
    // Basic shipping info
    form.consignee = selectedOrder.customer || selectedOrder.customer_name || '';
    form.shipper = selectedOrder.shipper || '';
    form.vessel = selectedOrder.vessel || '';
    form.awb_bl_no = selectedOrder.bl_awb || selectedOrder.awb_bl_number || '';

    // POL/POD info
    form.pol_pod = (selectedOrder.pol && selectedOrder.pod) ?
      `${selectedOrder.pol}/${selectedOrder.pod}` :
      (selectedOrder.pol_pod || '');
    form.origin = selectedOrder.pol || '';
    form.destination = selectedOrder.pod || '';

    // Dates
    if (selectedOrder.eta) {
      form.eta = selectedOrder.eta;
    }
    if (selectedOrder.etd) {
      form.etd = selectedOrder.etd;
    }

    // Cargo details - auto-populate from Sales Order
    form.gross_weight = selectedOrder.net_weight || '';
    form.volume = selectedOrder.measurement || '';
    form.no_of_packages = selectedOrder.qty || '';
    form.container_size = selectedOrder.shipment_type || '';

    // Container info
    if (selectedOrder.container_no) {
      form.container_no = Array.isArray(selectedOrder.container_no) ?
        selectedOrder.container_no.join(', ') :
        selectedOrder.container_no;
    }

    // Remarks
    form.remarks = selectedOrder.remarks || selectedOrder.note || '';
  }
};

// Main item functions
const addItem = () => {
  mainItems.value.push({
    description: '',
    quantity: 1,
    unit: 'SET',
    rate: 0,
    currency: 'IDR',
    amount: 0,
    item_ref: 'main',
    type: 'main'
  });
};

const removeMainItem = (index) => {
  mainItems.value.splice(index, 1);
};

const calculateMainAmount = (index) => {
  const item = mainItems.value[index];
  item.amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
};

// Reimbursement item functions
const addReimbursementItem = () => {
  reimbursementItems.value.push({
    description: '',
    quantity: 1,
    unit: 'SET',
    rate: 0,
    currency: 'IDR',
    amount: 0,
    item_ref: 'reimbursement',
    type: 'reimbursement'
  });
};

const removeReimbursementItem = (index) => {
  reimbursementItems.value.splice(index, 1);
};

const calculateReimbursementAmount = (index) => {
  const item = reimbursementItems.value[index];
  item.amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
};

const calculateTotal = () => {
  const mainTotal = mainItems.value.reduce((total, item) => {
    return total + (parseFloat(item.amount || 0));
  }, 0);

  const reimbursementTotal = reimbursementItems.value.reduce((total, item) => {
    return total + (parseFloat(item.amount || 0));
  }, 0);

  return mainTotal + reimbursementTotal;
};

const formatCurrency = (amount, currency = 'IDR') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

const submit = () => {
  // Combine all items from both arrays with proper item_ref
  const allItems = [
    ...mainItems.value.map(item => ({
      ...item,
      type: 'main',
      item_ref: item.item_ref || 'main'
    })),
    ...reimbursementItems.value.map(item => ({
      ...item,
      type: 'reimbursement',
      item_ref: item.item_ref || 'reimbursement'
    }))
  ];

  // Set the combined items to form
  form.items = allItems;

  // Determine the invoice type based on what items exist
  if (mainItems.value.length > 0 && reimbursementItems.value.length > 0) {
    form.invoice_type = 'combined';
  } else if (reimbursementItems.value.length > 0) {
    form.invoice_type = 'reimbursement';
  } else {
    form.invoice_type = 'main';
  }

  form.post(route('admin-keuangan.invoices.store'));
};

// Auto-load data if coming from Sales Order detail page
if (props.preselectedSalesOrder) {
  loadSalesOrderData();

  // If it's reimbursement type, add one reimbursement item
  if (props.preselectedInvoiceType === 'reimbursement') {
    addReimbursementItem();
  } else {
    // Default: add one main item
    addItem();
  }
} else {
  // Default: add one main item for regular access
  addItem();
}
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-600 {
  color: #8db580;
}
.text-sage-800 {
  color: #6b8f5e;
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
.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}
.focus\:border-sage-500:focus {
  border-color: #8db580;
}
</style>