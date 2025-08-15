<template>
  <AdminLayout>
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
              <p class="text-sage-600">Edit dokumen sales order</p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0">
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

      <!-- Form Section -->
      <form @submit.prevent="submit" class="space-y-6">
        <!-- Basic Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div 
            @click="toggleSection('basic')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Dasar</h3>
            <svg 
              :class="{'rotate-180': !sections.basic}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.basic" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">ORDER NUMB *</label>
              <input
                v-model="form.order_number"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                required
              />
              <div v-if="errors.order_number" class="text-red-600 text-sm mt-1">{{ errors.order_number }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">CUSTOMER *</label>
              <input
                v-model="form.customer"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                required
              />
              <div v-if="errors.customer" class="text-red-600 text-sm mt-1">{{ errors.customer }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">SHIPPER</label>
              <input
                v-model="form.shipper"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.shipper" class="text-red-600 text-sm mt-1">{{ errors.shipper }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">BL/AWB</label>
              <input
                v-model="form.bl_awb"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.bl_awb" class="text-red-600 text-sm mt-1">{{ errors.bl_awb }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">PREPARED BY</label>
              <input
                v-model="form.prepared_by"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.prepared_by" class="text-red-600 text-sm mt-1">{{ errors.prepared_by }}</div>
            </div>
          </div>
        </div>

        <!-- Shipping Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div 
            @click="toggleSection('shipping')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Pengiriman</h3>
            <svg 
              :class="{'rotate-180': !sections.shipping}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.shipping" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">LINER</label>
              <input
                v-model="form.liner"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.liner" class="text-red-600 text-sm mt-1">{{ errors.liner }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">VESSEL</label>
              <input
                v-model="form.vessel"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.vessel" class="text-red-600 text-sm mt-1">{{ errors.vessel }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">ETA</label>
              <input
                v-model="form.eta"
                type="date"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.eta" class="text-red-600 text-sm mt-1">{{ errors.eta }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">AJU</label>
              <input
                v-model="form.aju"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.aju" class="text-red-600 text-sm mt-1">{{ errors.aju }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">SPPB DATE</label>
              <input
                v-model="form.sppb_date"
                type="date"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.sppb_date" class="text-red-600 text-sm mt-1">{{ errors.sppb_date }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">SHIPMENT TYPE</label>
              <input
                v-model="form.shipment_type"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.shipment_type" class="text-red-600 text-sm mt-1">{{ errors.shipment_type }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">POL</label>
              <input
                v-model="form.pol"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.pol" class="text-red-600 text-sm mt-1">{{ errors.pol }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">POD</label>
              <input
                v-model="form.pod"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.pod" class="text-red-600 text-sm mt-1">{{ errors.pod }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">GUDANG/UTC</label>
              <input
                v-model="form.gudang_utc"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.gudang_utc" class="text-red-600 text-sm mt-1">{{ errors.gudang_utc }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">PARTY/LCL</label>
              <input
                v-model="form.party_lcl"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.party_lcl" class="text-red-600 text-sm mt-1">{{ errors.party_lcl }}</div>
            </div>
          </div>
        </div>

        <!-- Pricing Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div 
            @click="toggleSection('pricing')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Harga</h3>
            <svg 
              :class="{'rotate-180': !sections.pricing}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.pricing" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">EXCHANGE RATE</label>
              <input
                v-model="form.exchange_rate"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.exchange_rate" class="text-red-600 text-sm mt-1">{{ errors.exchange_rate }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">JENIS BIAYA</label>
              <select
                v-model="form.jenis_biaya"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              >
                <option value="">-- Pilih Jenis Biaya --</option>
                <option value="OF/AF">OF/AF</option>
                <option value="HANDLING">HANDLING</option>
                <option value="PIB EDI">PIB EDI</option>
                <option value="ADMIN DOC">ADMIN DOC</option>
                <option value="TRUCKING">TRUCKING</option>
                <option value="D/O CHARGES">D/O CHARGES</option>
                <option value="LOLO">LOLO</option>
                <option value="STORAGE">STORAGE</option>
                <option value="REFUND">REFUND</option>
                <option value="OTHER">OTHER</option>
              </select>
              <div v-if="errors.jenis_biaya" class="text-red-600 text-sm mt-1">{{ errors.jenis_biaya }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">BUYING</label>
              <input
                v-model="form.buying"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.buying" class="text-red-600 text-sm mt-1">{{ errors.buying }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">SELLING</label>
              <input
                v-model="form.selling"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.selling" class="text-red-600 text-sm mt-1">{{ errors.selling }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">REVENUE</label>
              <input
                v-model="form.revenue"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.revenue" class="text-red-600 text-sm mt-1">{{ errors.revenue }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">REMARKS</label>
              <textarea
                v-model="form.remarks"
                rows="3"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              ></textarea>
              <div v-if="errors.remarks" class="text-red-600 text-sm mt-1">{{ errors.remarks }}</div>
            </div>
          </div>
        </div>

        <!-- Goods Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div 
            @click="toggleSection('goods')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Barang</h3>
            <svg 
              :class="{'rotate-180': !sections.goods}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.goods" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">GOODS</label>
              <input
                v-model="form.goods"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.goods" class="text-red-600 text-sm mt-1">{{ errors.goods }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">CONTAINER NO</label>
              <input
                v-model="form.container_no"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.container_no" class="text-red-600 text-sm mt-1">{{ errors.container_no }}</div>
            </div>
          </div>
        </div>

        <!-- Invoice Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div 
            @click="toggleSection('invoice')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Invoice</h3>
            <svg 
              :class="{'rotate-180': !sections.invoice}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.invoice" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">INVOICE NUMB</label>
              <input
                v-model="form.invoice_number"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.invoice_number" class="text-red-600 text-sm mt-1">{{ errors.invoice_number }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">INVOICE DATE</label>
              <input
                v-model="form.invoice_date"
                type="date"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.invoice_date" class="text-red-600 text-sm mt-1">{{ errors.invoice_date }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">T.O.P</label>
              <input
                v-model="form.top"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.top" class="text-red-600 text-sm mt-1">{{ errors.top }}</div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
          <div class="flex justify-end space-x-4">
            <Link
              :href="route('admin-cs.sales-orders.index')"
              class="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              :disabled="processing"
              class="px-6 py-3 bg-sage-600 text-white font-medium rounded-lg hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-colors disabled:opacity-50"
            >
              <span v-if="processing">Menyimpan...</span>
              <span v-else>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const props = defineProps({
  salesOrder: Object,
  errors: Object
})

// Form state
const form = useForm({
  order_number: props.salesOrder.order_number || '',
  customer: props.salesOrder.customer || '',
  shipper: props.salesOrder.shipper || '',
  bl_awb: props.salesOrder.bl_awb || '',
  liner: props.salesOrder.liner || '',
  vessel: props.salesOrder.vessel || '',
  eta: props.salesOrder.eta || '',
  aju: props.salesOrder.aju || '',
  sppb_date: props.salesOrder.sppb_date || '',
  shipment_type: props.salesOrder.shipment_type || '',
  pol: props.salesOrder.pol || '',
  pod: props.salesOrder.pod || '',
  gudang_utc: props.salesOrder.gudang_utc || '',
  party_lcl: props.salesOrder.party_lcl || '',
  prepared_by: props.salesOrder.prepared_by || '',
  exchange_rate: props.salesOrder.exchange_rate || '',
  jenis_biaya: props.salesOrder.jenis_biaya || '',
  buying: props.salesOrder.buying || '',
  selling: props.salesOrder.selling || '',
  revenue: props.salesOrder.revenue || '',
  remarks: props.salesOrder.remarks || '',
  goods: props.salesOrder.goods || '',
  container_no: props.salesOrder.container_no || '',
  invoice_number: props.salesOrder.invoice_number || '',
  invoice_date: props.salesOrder.invoice_date || '',
  top: props.salesOrder.top || ''
})

// Collapsible sections state
const sections = reactive({
  basic: true,
  shipping: false,
  pricing: false,
  goods: false,
  invoice: false
})

// Processing state
const processing = ref(false)

// Toggle section visibility
const toggleSection = (section) => {
  sections[section] = !sections[section]
}

// Submit form
const submit = () => {
  processing.value = true
  form.put(route('admin-cs.sales-orders.update', props.salesOrder.id), {
    onFinish: () => {
      processing.value = false
    }
  })
}
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
  border-color: #c1cbb9;
}
.focus\:ring-sage-500:focus {
  --tw-ring-color: #9db892;
}
.focus\:border-sage-500:focus {
  border-color: #9db892;
}
.hover\:bg-sage-100:hover {
  background-color: #e8ede5;
}
.hover\:bg-sage-600:hover {
  background-color: #8db580;
}
.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}
</style>