<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-sage-800">Edit Invoice</h2>
            <p class="text-sage-600">{{ invoice.invoice_number }}</p>
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
          <h3 class="text-lg font-semibold text-sage-800 mb-4">Sales Order & Type Invoice</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sales Order</label>
              <select
                v-model="form.sales_order_id"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                disabled
              >
                <option v-for="salesOrder in salesOrders" :key="salesOrder.id" :value="salesOrder.id">
                  {{ salesOrder.order_number }} - {{ salesOrder.customer || salesOrder.customer_name }}
                </option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tipe Invoice</label>
              <div class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600">
                {{ getInvoiceTypeLabel(invoice.invoice_type) }}
              </div>
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
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Consignee</label>
              <input
                type="text"
                v-model="form.consignee"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">AWB/BL No.</label>
              <input
                type="text"
                v-model="form.awb_bl_no"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
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
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Origin</label>
              <input
                type="text"
                v-model="form.origin"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <input
                type="text"
                v-model="form.destination"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">POL/POD</label>
              <input
                type="text"
                v-model="form.pol_pod"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">ETD</label>
              <input
                type="date"
                v-model="form.etd"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">ETA</label>
              <input
                type="date"
                v-model="form.eta"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Gross Weight</label>
              <input
                type="number"
                step="0.01"
                v-model="form.gross_weight"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Volume</label>
              <input
                type="text"
                v-model="form.volume"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">No. of Packages</label>
              <input
                type="number"
                v-model="form.no_of_packages"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Container No.</label>
              <input
                type="text"
                v-model="form.container_no"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">20'/40'/45'</label>
              <input
                type="text"
                v-model="form.container_size"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                placeholder="e.g., 20GP, 40GP, 45GP"
              />
            </div>
          </div>
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
            <textarea
              v-model="form.remarks"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            ></textarea>
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
                {{ form.processing ? 'Memperbarui...' : 'Perbarui Invoice' }}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useForm, Link } from '@inertiajs/vue3'
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue'

const props = defineProps({
  invoice: Object,
  salesOrders: Array,
  errors: Object,
})

const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.invoices.index': '/admin-keuangan/invoices',
    'admin-keuangan.invoices.update': '/admin-keuangan/invoices/' + (params || ''),
  };
  return routes[name] || '#';
};

// Separate reactive arrays for main and reimbursement items
const mainItems = ref([])
const reimbursementItems = ref([])

// Helper function to convert ISO date to YYYY-MM-DD format
const formatDateForInput = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]
}

// Initialize form with invoice data
const form = useForm({
  sales_order_id: props.invoice.sales_order_id,
  invoice_type: props.invoice.invoice_type || 'combined',
  invoice_date: formatDateForInput(props.invoice.invoice_date),
  term_days: props.invoice.term_days,
  shipper: props.invoice.shipper || '',
  consignee: props.invoice.consignee || '',
  awb_bl_no: props.invoice.awb_bl_no || '',
  mawb_obl_no: props.invoice.mawb_obl_no || '',
  vessel: props.invoice.vessel || '',
  flight_voy: props.invoice.flight_voy || '',
  origin: props.invoice.origin || '',
  destination: props.invoice.destination || '',
  pol_pod: props.invoice.pol_pod || '',
  etd: formatDateForInput(props.invoice.etd),
  eta: formatDateForInput(props.invoice.eta),
  gross_weight: props.invoice.gross_weight || '',
  volume: props.invoice.volume || '',
  no_of_packages: props.invoice.no_of_packages || '',
  container_no: props.invoice.container_no || '',
  container_size: props.invoice.container_size || '',
  remarks: props.invoice.remarks || '',
  items: []
})

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
  })
}

const removeMainItem = (index) => {
  mainItems.value.splice(index, 1)
}

const calculateMainAmount = (index) => {
  const item = mainItems.value[index]
  item.amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0)
}

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
  })
}

const removeReimbursementItem = (index) => {
  reimbursementItems.value.splice(index, 1)
}

const calculateReimbursementAmount = (index) => {
  const item = reimbursementItems.value[index]
  item.amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0)
}

const calculateTotal = () => {
  const mainTotal = mainItems.value.reduce((total, item) => {
    return total + (parseFloat(item.amount || 0))
  }, 0)

  const reimbursementTotal = reimbursementItems.value.reduce((total, item) => {
    return total + (parseFloat(item.amount || 0))
  }, 0)

  return mainTotal + reimbursementTotal
}

const formatCurrency = (amount, currency = 'IDR') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount || 0)
}

const getInvoiceTypeLabel = (type) => {
  const labels = {
    'main': 'Main Invoice',
    'reimbursement': 'Reimbursement',
    'combined': 'Combined Invoice (Main + Reimbursement)'
  }
  return labels[type] || type
}

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
  ]

  // Set the combined items to form
  form.items = allItems

  // Determine the invoice type based on what items exist
  if (mainItems.value.length > 0 && reimbursementItems.value.length > 0) {
    form.invoice_type = 'combined'
  } else if (reimbursementItems.value.length > 0) {
    form.invoice_type = 'reimbursement'
  } else {
    form.invoice_type = 'main'
  }

  form.put(route('admin-keuangan.invoices.update', props.invoice.id))
}

// Initialize items separation and amounts
onMounted(() => {
  if (props.invoice.items && props.invoice.items.length > 0) {
    // Separate existing items based on item_ref or type
    props.invoice.items.forEach(item => {
      const ref = (item.item_ref || '').toLowerCase().trim()
      const isReimbursement = ref === 'reimbursement' ||
                             ref === 'r' ||
                             ref === '2' ||
                             ref.includes('reimbur') ||
                             item.type === 'reimbursement'

      if (isReimbursement) {
        reimbursementItems.value.push({ ...item })
      } else {
        mainItems.value.push({ ...item })
      }
    })
  }

  // Ensure at least one item in main if nothing exists
  if (mainItems.value.length === 0 && reimbursementItems.value.length === 0) {
    addItem()
  }

  // Calculate amounts for existing items
  mainItems.value.forEach((item, index) => {
    calculateMainAmount(index)
  })
  reimbursementItems.value.forEach((item, index) => {
    calculateReimbursementAmount(index)
  })
})
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-500 {
  color: #9fb894;
}
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
.bg-sage-50 {
  background-color: #f4f6f3;
}
.bg-sage-100 {
  background-color: #e8ece5;
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
.divide-sage-200 > :not([hidden]) ~ :not([hidden]) {
  border-color: #d4ddd0;
}
.hover\:bg-sage-50:hover {
  background-color: #f4f6f3;
}
.hover\:bg-sage-100:hover {
  background-color: #e8ece5;
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
</style>