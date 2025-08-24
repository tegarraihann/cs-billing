<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-sage-800">Edit Invoice</h2>
            <p class="text-sage-600">{{ form.invoice_number || 'New Invoice' }}</p>
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
      <form @submit.prevent="updateInvoice">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <!-- Basic Info -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800 mb-4">Informasi Dasar</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sales Order</label>
                <select
                  v-model="form.sales_order_id"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  disabled
                >
                  <option v-for="salesOrder in salesOrders" :key="salesOrder.id" :value="salesOrder.id">
                    {{ salesOrder.order_number }} - {{ salesOrder.customer || salesOrder.customer_name }}
                  </option>
                </select>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Invoice</label>
                  <input
                    type="date"
                    v-model="form.invoice_date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': form.errors.invoice_date }"
                    required
                  />
                  <div v-if="form.errors.invoice_date" class="text-red-500 text-sm mt-1">{{ form.errors.invoice_date }}</div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Term (Hari)</label>
                  <input
                    type="number"
                    v-model="form.term_days"
                    min="1"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    :class="{ 'border-red-500': form.errors.term_days }"
                    required
                  />
                  <div v-if="form.errors.term_days" class="text-red-500 text-sm mt-1">{{ form.errors.term_days }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Shipment Details -->
          <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
            <h3 class="text-lg font-semibold text-sage-800 mb-4">Detail Pengiriman</h3>
            
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">AWB/BL No</label>
                  <input
                    type="text"
                    v-model="form.awb_bl_no"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">MAWB/OBL No</label>
                  <input
                    type="text"
                    v-model="form.mawb_obl_no"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              </div>
            </div>
          </div>
        </div>

        <!-- Invoice Items -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6">
          <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-sage-800">Item Invoice</h3>
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
          </div>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-sage-50">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase">Deskripsi</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase">Qty</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase">Unit</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase">Rate</th>
                  <th class="px-4 py-3 text-left text-xs font-medium text-sage-500 uppercase">Currency</th>
                  <th class="px-4 py-3 text-right text-xs font-medium text-sage-500 uppercase">Amount</th>
                  <th class="px-4 py-3 text-center text-xs font-medium text-sage-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-sage-200">
                <tr v-for="(item, index) in form.items" :key="index">
                  <td class="px-4 py-4">
                    <input
                      type="text"
                      v-model="item.description"
                      class="w-full px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      :class="{ 'border-red-500': form.errors[`items.${index}.description`] }"
                      required
                    />
                  </td>
                  <td class="px-4 py-4">
                    <input
                      type="number"
                      v-model="item.quantity"
                      @input="calculateAmount(index)"
                      step="0.01"
                      min="0.01"
                      class="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      required
                    />
                  </td>
                  <td class="px-4 py-4">
                    <input
                      type="text"
                      v-model="item.unit"
                      class="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      required
                    />
                  </td>
                  <td class="px-4 py-4">
                    <input
                      type="number"
                      v-model="item.rate"
                      @input="calculateAmount(index)"
                      step="0.01"
                      min="0"
                      class="w-24 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      required
                    />
                  </td>
                  <td class="px-4 py-4">
                    <select
                      v-model="item.currency"
                      class="w-20 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      required
                    >
                      <option value="IDR">IDR</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <span class="font-medium">{{ formatCurrency(item.amount || 0, item.currency) }}</span>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <button
                      type="button"
                      @click="removeItem(index)"
                      class="text-red-600 hover:text-red-900"
                      v-if="form.items.length > 1"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Total -->
          <div class="px-6 py-4 bg-gray-50 border-t border-sage-200">
            <div class="flex justify-end">
              <div class="w-64 space-y-2">
                <div class="flex justify-between">
                  <span class="text-sm text-gray-600">Subtotal:</span>
                  <span class="text-sm font-medium">{{ formatCurrency(subtotal) }}</span>
                </div>
                <div class="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>{{ formatCurrency(subtotal) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Remarks -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 mb-6">
          <h3 class="text-lg font-semibold text-sage-800 mb-4">Catatan</h3>
          <textarea
            v-model="form.remarks"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            placeholder="Catatan tambahan untuk invoice..."
          ></textarea>
        </div>

        <!-- Actions -->
        <div class="flex justify-end space-x-4">
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
            {{ form.processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
          </button>
        </div>
      </form>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { computed } from 'vue';
import { useForm, Link } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';

const props = defineProps({
  invoice: Object,
  salesOrders: Array,
});

const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.invoices.index': '/admin-keuangan/invoices',
    'admin-keuangan.invoices.update': (id) => `/admin-keuangan/invoices/${id}`,
  };
  return typeof routes[name] === 'function' ? routes[name](params) : routes[name] || '#';
};

const form = useForm({
  invoice_number: props.invoice.invoice_number,
  sales_order_id: props.invoice.sales_order_id,
  invoice_date: props.invoice.invoice_date,
  term_days: props.invoice.term_days,
  shipper: props.invoice.shipper || '',
  consignee: props.invoice.consignee || '',
  awb_bl_no: props.invoice.awb_bl_no || '',
  mawb_obl_no: props.invoice.mawb_obl_no || '',
  gross_weight: props.invoice.gross_weight || '',
  volume: props.invoice.volume || '',
  no_of_packages: props.invoice.no_of_packages || '',
  vessel: props.invoice.vessel || '',
  flight_voy: props.invoice.flight_voy || '',
  pol_pod: props.invoice.pol_pod || '',
  origin: props.invoice.origin || '',
  destination: props.invoice.destination || '',
  etd: props.invoice.etd || '',
  eta: props.invoice.eta || '',
  container_no: props.invoice.container_no || '',
  container_size: props.invoice.container_size || '',
  remarks: props.invoice.remarks || '',
  items: props.invoice.items || [{
    description: '',
    quantity: 1,
    unit: 'pcs',
    rate: 0,
    currency: 'IDR',
    amount: 0
  }]
});

const subtotal = computed(() => {
  return form.items.reduce((sum, item) => sum + (item.amount || 0), 0);
});

const formatCurrency = (amount, currency = 'IDR') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

const calculateAmount = (index) => {
  const item = form.items[index];
  item.amount = (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0);
};

const addItem = () => {
  form.items.push({
    description: '',
    quantity: 1,
    unit: 'pcs',
    rate: 0,
    currency: 'IDR',
    amount: 0
  });
};

const removeItem = (index) => {
  form.items.splice(index, 1);
};

const updateInvoice = () => {
  form.put(route('admin-keuangan.invoices.update', props.invoice.id), {
    onSuccess: () => {
      // Handle success
    }
  });
};
</script>

<style scoped>
/* Custom Sage Colors */
.text-sage-500 {
  color: #9fb894;
}
.text-sage-600 {
  color: #8db580;
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
.divide-sage-200 > :not([hidden]) ~ :not([hidden]) {
  border-color: #d4ddd0;
}
.focus\:ring-sage-500:focus {
  --tw-ring-color: #8db580;
}
.focus\:border-sage-500:focus {
  border-color: #8db580;
}
</style>