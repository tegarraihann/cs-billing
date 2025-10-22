<template>
  <div v-if="visible" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <h3 class="text-lg font-medium text-gray-900 mb-4">{{ title }}</h3>

        <slot name="summary"></slot>

        <form @submit.prevent="onSubmit">
          <slot name="before-fields"></slot>

          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
            <input
              v-model="form.amount"
              type="number"
              step="0.01"
              :max="maxAmount"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter payment amount"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
            <input
              v-model="form.payment_date"
              type="date"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Bank Account *</label>
            <select
              v-model="form.bank_account_id"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Bank Account</option>
              <option v-for="bank in bankAccounts" :key="bank.id" :value="bank.id">
                {{ bank.bank_name }} - {{ bank.account_number }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
            <select
              v-model="form.payment_method"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Payment Method</option>
              <option value="Transfer Bank">Transfer Bank</option>
              <option value="Cash">Cash</option>
              <option value="Check">Check</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              v-model="form.notes"
              rows="3"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Payment notes (optional)"
            ></textarea>
          </div>

          <div v-if="reimbursementItems.length > 0" class="mb-6 border-t border-gray-200 pt-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-semibold text-orange-700">Reimbursement Items</h4>
              <span class="text-xs text-gray-500">Pilih reimbursement yang ikut dilunasi</span>
            </div>
            <div class="space-y-3 max-h-48 overflow-y-auto pr-1">
              <label
                v-for="item in reimbursementItems"
                :key="item.id"
                class="flex items-start space-x-3 p-2 rounded-md border"
                :class="item.status === 'paid' ? 'bg-green-50 border-green-200' : 'border-gray-200'"
              >
                <input
                  type="checkbox"
                  :value="item.id"
                  v-model="form.reimbursement_items"
                  :disabled="item.status === 'paid'"
                  class="mt-1 h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                />
                <div class="flex-1">
                  <div class="flex items-center justify-between text-sm font-medium text-gray-900">
                    <span>{{ item.description }}</span>
                    <span>Rp {{ formatNumber(item.amount) }}</span>
                  </div>
                  <div class="flex items-center text-xs text-gray-500 flex-wrap gap-x-2">
                    <span
                      class="inline-flex items-center px-2 py-0.5 rounded-full"
                      :class="getStatusClass(item.status)"
                    >
                      {{ getStatusLabel(item.status) }}
                    </span>
                    <span v-if="item.invoice_number">Invoice: {{ item.invoice_number }}</span>
                    <span v-if="item.paid_at">Dibayar: {{ formatDate(item.paid_at) }}</span>
                  </div>
                </div>
              </label>
            </div>

            <div v-if="form.reimbursement_items.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Vendor / Pembayar</label>
                <input
                  type="text"
                  v-model="form.reimbursement_vendor_name"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  placeholder="Eshaka Wijaya Logistics"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Bayar</label>
                <input
                  type="date"
                  v-model="form.reimbursement_paid_at"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            <div v-if="form.reimbursement_items.length > 0" class="mt-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Catatan Reimbursement</label>
              <textarea
                v-model="form.reimbursement_notes"
                rows="2"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                placeholder="Contoh: Talangan oleh Eshaka"
              ></textarea>
            </div>
          </div>

          <slot name="after-fields"></slot>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="processing"
              class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50"
            >
              {{ processing ? 'Processing...' : submitLabel }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';

const props = defineProps({
  visible: Boolean,
  processing: Boolean,
  title: {
    type: String,
    default: 'Mark Payment',
  },
  submitLabel: {
    type: String,
    default: 'Mark Payment',
  },
  maxAmount: {
    type: Number,
    default: 0,
  },
  bankAccounts: {
    type: Array,
    default: () => [],
  },
  reimbursementItems: {
    type: Array,
    default: () => [],
  },
  form: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['submit', 'close']);

const close = () => emit('close');
const onSubmit = () => emit('submit');

const formatNumber = (number) => new Intl.NumberFormat('id-ID').format(number || 0);
const formatDate = (date) => (date ? new Date(date).toLocaleDateString('id-ID') : '');

const statusLabels = {
  pending: 'Pending',
  linked: 'Linked',
  invoiced: 'Ditagihkan',
  paid: 'Sudah Dibayar',
};

const statusClasses = {
  pending: 'bg-gray-100 text-gray-700',
  linked: 'bg-blue-100 text-blue-700',
  invoiced: 'bg-orange-100 text-orange-700',
  paid: 'bg-green-100 text-green-700',
};

const getStatusLabel = (status) => statusLabels[status] || status;
const getStatusClass = (status) => statusClasses[status] || 'bg-gray-100 text-gray-700';

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      if (!props.form.payment_date) {
        props.form.payment_date = new Date().toISOString().split('T')[0];
      }
      if (!props.form.reimbursement_paid_at) {
        props.form.reimbursement_paid_at = new Date().toISOString().split('T')[0];
      }
    }
  }
);

</script>
