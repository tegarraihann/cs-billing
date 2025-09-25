<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-sage-800">Detail Invoice</h2>
            <p class="text-sage-600">{{ invoice.invoice_number }}</p>
          </div>
          <div class="flex space-x-3">
            <Link
              :href="route('admin-keuangan.invoices.index')"
              class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </Link>
            <Link
              :href="route('admin-keuangan.invoices.edit', invoice.id)"
              class="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              v-if="invoice.status === 'draft'"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
            <button
              @click="showMarkSentModal = true"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              v-if="invoice.status === 'draft'"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Tandai Terkirim
            </button>
            <button
              @click="showPaymentModal = true"
              class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              v-if="invoice.status !== 'paid'"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Konfirmasi Pembayaran
            </button>
          </div>
        </div>
      </div>

      <!-- Invoice Info -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <!-- Basic Info -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
          <h3 class="text-lg font-semibold text-sage-800 mb-4">Informasi Invoice</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Nomor Invoice:</span>
              <span class="font-medium">{{ invoice.invoice_number }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Sales Order:</span>
              <span class="font-medium">{{ invoice.sales_order?.order_number }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Customer:</span>
              <span class="font-medium">{{ invoice.customer?.consignee_shipper || invoice.customer?.company_name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Tanggal Invoice:</span>
              <span class="font-medium">{{ formatDate(invoice.invoice_date) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Jatuh Tempo:</span>
              <span class="font-medium">{{ formatDate(invoice.due_date) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Term:</span>
              <span class="font-medium">{{ invoice.term_days }} Hari</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Status:</span>
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getStatusColor(invoice.status)"
              >
                {{ getStatusLabel(invoice.status) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Payment Status:</span>
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getPaymentStatusColor(invoice)"
              >
                {{ getPaymentStatusLabel(invoice) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Shipment Details -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
          <h3 class="text-lg font-semibold text-sage-800 mb-4">Detail Pengiriman</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Shipper:</span>
              <span class="font-medium">{{ invoice.shipper || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Consignee:</span>
              <span class="font-medium">{{ invoice.consignee || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Vessel:</span>
              <span class="font-medium">{{ invoice.vessel || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Flight/VOY:</span>
              <span class="font-medium">{{ invoice.flight_voy || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">AWB/BL No:</span>
              <span class="font-medium">{{ invoice.awb_bl_no || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">POL/POD:</span>
              <span class="font-medium">{{ invoice.pol_pod || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Origin:</span>
              <span class="font-medium">{{ invoice.origin || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Destination:</span>
              <span class="font-medium">{{ invoice.destination || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- Payment Information (if paid) -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" v-if="invoice.status === 'paid'">
          <h3 class="text-lg font-semibold text-sage-800 mb-4">Informasi Pembayaran</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Tanggal Dibayar:</span>
              <span class="font-medium">{{ formatDate(invoice.paid_date) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Jumlah Dibayar:</span>
              <span class="font-medium">{{ formatCurrency(invoice.paid_amount) }}</span>
            </div>
            <div class="flex justify-between" v-if="invoice.payment_method">
              <span class="text-gray-600">Metode Pembayaran:</span>
              <span class="font-medium">{{ invoice.payment_method }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Dikonfirmasi oleh:</span>
              <span class="font-medium">{{ invoice.confirmed_by?.name || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Waktu Konfirmasi:</span>
              <span class="font-medium">{{ formatDateTime(invoice.payment_confirmed_at) }}</span>
            </div>
            <div v-if="invoice.payment_notes" class="pt-2">
              <span class="text-gray-600">Catatan:</span>
              <p class="text-gray-900 mt-1">{{ invoice.payment_notes }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Invoice Items -->
      <div v-if="mainInvoice || invoice.invoice_type === 'main' || invoice.invoice_type === 'combined'" class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6">
        <div class="px-6 py-4 border-b border-sage-200 bg-blue-50">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <h3 class="text-lg font-semibold text-blue-800">Items Invoice Main</h3>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                {{ (mainInvoice || invoice).invoice_number }}
              </span>
            </div>
            <div class="flex space-x-2">
              <a
                :href="route('admin-keuangan.invoices.preview-pdf', (mainInvoice || invoice).id)"
                class="inline-flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                target="_blank"
              >
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview PDF
              </a>
              <a
                :href="route('admin-keuangan.invoices.export-pdf', (mainInvoice || invoice).id)"
                class="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                target="_blank"
              >
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-sage-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Qty
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Unit
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Rate
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Currency
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-sage-200">
              <tr v-for="item in getMainItems" :key="item.id" class="hover:bg-sage-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ item.description }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatNumber(item.quantity) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.unit }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatCurrency(item.rate, item.currency) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.currency }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <div class="text-sm font-medium text-gray-900">{{ formatCurrency(item.amount, item.currency) }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Main Total -->
        <div class="px-6 py-4 bg-blue-50 border-t border-sage-200">
          <div class="flex justify-end">
            <div class="w-64 space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Subtotal Main:</span>
                <span class="text-sm font-medium">{{ formatCurrency(getMainTotal) }}</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-blue-200">
                <span class="text-lg font-semibold text-blue-800">Total Main:</span>
                <span class="text-lg font-bold text-blue-800">{{ formatCurrency(getMainTotal) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Reimbursement Invoice Items -->
      <div v-if="reimbursementInvoice || invoice.invoice_type === 'reimbursement' || invoice.invoice_type === 'combined'" class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6">
        <div class="px-6 py-4 border-b border-sage-200 bg-orange-50">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <h3 class="text-lg font-semibold text-orange-800">Items Invoice Reimbursement</h3>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                {{ (reimbursementInvoice || invoice).invoice_number }}
              </span>
            </div>
            <div class="flex space-x-2">
              <a
                :href="route('admin-keuangan.invoices.preview-pdf-reimbursement', (reimbursementInvoice || invoice).id)"
                class="inline-flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                target="_blank"
              >
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview PDF
              </a>
              <a
                :href="route('admin-keuangan.invoices.export-pdf-reimbursement', (reimbursementInvoice || invoice).id)"
                class="inline-flex items-center px-3 py-1.5 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors"
                target="_blank"
              >
                <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
                Download PDF
              </a>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-sage-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Qty
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Unit
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Rate
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Currency
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-sage-200">
              <tr v-for="item in getReimbursementItems" :key="item.id" class="hover:bg-sage-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ item.description }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatNumber(item.quantity) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.unit }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatCurrency(item.rate, item.currency) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.currency }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <div class="text-sm font-medium text-gray-900">{{ formatCurrency(item.amount, item.currency) }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Reimbursement Total -->
        <div class="px-6 py-4 bg-orange-50 border-t border-sage-200">
          <div class="flex justify-end">
            <div class="w-64 space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Subtotal Reimbursement:</span>
                <span class="text-sm font-medium">{{ formatCurrency(getReimbursementTotal) }}</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-orange-200">
                <span class="text-lg font-semibold text-orange-800">Total Reimbursement:</span>
                <span class="text-lg font-bold text-orange-800">{{ formatCurrency(getReimbursementTotal) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Combined Total -->
      <div v-if="invoice.invoice_type === 'combined' && getMainItems.length > 0 && getReimbursementItems.length > 0" class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
        <div class="px-6 py-4 bg-sage-50">
          <div class="flex justify-end">
            <div class="w-80 space-y-3">
              <div class="text-center text-lg font-semibold text-sage-800 pb-2 border-b border-sage-300">
                Combined Invoice Summary
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-blue-700">Total Main Items:</span>
                <span class="text-sm font-medium text-blue-700">{{ formatCurrency(getMainTotal) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-orange-700">Total Reimbursement Items:</span>
                <span class="text-sm font-medium text-orange-700">{{ formatCurrency(getReimbursementTotal) }}</span>
              </div>
              <div class="flex justify-between pt-3 border-t border-sage-400">
                <span class="text-xl font-bold text-sage-800">Grand Total:</span>
                <span class="text-xl font-bold text-sage-800">{{ formatCurrency(getMainTotal + getReimbursementTotal) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Confirmation Modal -->
    <div v-if="showPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Konfirmasi Pembayaran</h3>
        
        <form @submit.prevent="confirmPayment">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Jumlah Dibayar</label>
              <input
                type="number"
                v-model="paymentForm.paid_amount"
                :placeholder="formatCurrency(invoice.total)"
                step="0.01"
                min="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Pembayaran</label>
              <input
                type="date"
                v-model="paymentForm.paid_date"
                :max="new Date().toISOString().split('T')[0]"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                required
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Metode Pembayaran</label>
              <input
                type="text"
                v-model="paymentForm.payment_method"
                placeholder="Transfer Bank, Cash, dll."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Catatan (Opsional)</label>
              <textarea
                v-model="paymentForm.payment_notes"
                rows="3"
                placeholder="Catatan tambahan tentang pembayaran..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              ></textarea>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="showPaymentModal = false"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="processing"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {{ processing ? 'Memproses...' : 'Konfirmasi Pembayaran' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Mark Sent Modal -->
    <div v-if="showMarkSentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Tandai Invoice Sebagai Terkirim</h3>
        <p class="text-gray-600 mb-6">Apakah Anda yakin ingin menandai invoice ini sebagai terkirim ke customer?</p>
        
        <div class="flex justify-end space-x-3">
          <button
            @click="showMarkSentModal = false"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            @click="markAsSent"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ya, Tandai Terkirim
          </button>
        </div>
      </div>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useForm, Link, router } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';

const props = defineProps({
  invoice: Object,
  mainInvoice: Object,
  reimbursementInvoice: Object,
  relatedInvoices: Array,
});

const showPaymentModal = ref(false);
const showMarkSentModal = ref(false);
const processing = ref(false);

const paymentForm = reactive({
  paid_amount: props.invoice.total,
  paid_date: new Date().toISOString().split('T')[0],
  payment_method: '',
  payment_notes: ''
});

const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.invoices.index': '/admin-keuangan/invoices',
    'admin-keuangan.invoices.edit': (id) => `/admin-keuangan/invoices/${id}/edit`,
    'admin-keuangan.invoices.pdf': (id) => `/admin-keuangan/invoices/${id}/pdf`,
    'admin-keuangan.invoices.confirm-payment': (id) => `/admin-keuangan/invoices/${id}/confirm-payment`,
    'admin-keuangan.invoices.mark-sent': (id) => `/admin-keuangan/invoices/${id}/mark-sent`,
  };
  return typeof routes[name] === 'function' ? routes[name](params) : routes[name] || '#';
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('id-ID');
};

const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
};

const formatCurrency = (amount, currency = 'IDR') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatDateTime = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleString('id-ID');
};

const getStatusLabel = (status) => {
  const labels = {
    draft: 'Draft',
    sent: 'Terkirim',
    paid: 'Dibayar',
    overdue: 'Overdue',
    cancelled: 'Dibatalkan'
  };
  return labels[status] || status;
};

const getStatusColor = (status) => {
  const colors = {
    draft: 'bg-gray-100 text-gray-800',
    sent: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const getPaymentStatusLabel = (invoice) => {
  if (invoice.status === 'paid') {
    return 'Lunas';
  }
  
  const dueDate = new Date(invoice.due_date);
  const today = new Date();
  
  if (invoice.status !== 'paid' && dueDate < today) {
    return 'Overdue';
  }
  
  return 'Belum Dibayar';
};

const getPaymentStatusColor = (invoice) => {
  const status = getPaymentStatusLabel(invoice);
  const colors = {
    'Lunas': 'bg-green-100 text-green-800',
    'Overdue': 'bg-red-100 text-red-800',
    'Belum Dibayar': 'bg-yellow-100 text-yellow-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const confirmPayment = () => {
  processing.value = true;
  
  router.post(route('admin-keuangan.invoices.confirm-payment', props.invoice.id), paymentForm, {
    onSuccess: () => {
      showPaymentModal.value = false;
      processing.value = false;
    },
    onError: () => {
      processing.value = false;
    }
  });
};

const markAsSent = () => {
  processing.value = true;
  
  router.post(route('admin-keuangan.invoices.mark-sent', props.invoice.id), {}, {
    onSuccess: () => {
      showMarkSentModal.value = false;
      processing.value = false;
    },
    onError: () => {
      processing.value = false;
    }
  });
};

// Computed properties untuk memisahkan items berdasarkan item_ref
const getMainItems = computed(() => {
  if (props.invoice.invoice_type === 'combined') {
    // Untuk invoice combined, pisahkan items berdasarkan item_ref
    return (props.invoice.items || []).filter(item => {
      const ref = (item.item_ref || '').toLowerCase().trim();
      // Items masuk ke Main jika: kosong, 'main', 'm', '1', atau mengandung 'main'
      return !ref ||
             ref === 'main' ||
             ref === 'm' ||
             ref === '1' ||
             ref.includes('main');
    });
  }

  // Untuk invoice type main atau jika ada mainInvoice
  if (props.mainInvoice) {
    return props.mainInvoice.items || [];
  }

  // Fallback untuk invoice type main
  if (props.invoice.invoice_type === 'main') {
    return props.invoice.items || [];
  }

  return [];
});

const getReimbursementItems = computed(() => {
  if (props.invoice.invoice_type === 'combined') {
    // Untuk invoice combined, pisahkan items berdasarkan item_ref
    return (props.invoice.items || []).filter(item => {
      const ref = (item.item_ref || '').toLowerCase().trim();
      // Items masuk ke Reimbursement jika: 'reimbursement', 'r', '2', atau mengandung 'reimbur'
      return ref === 'reimbursement' ||
             ref === 'r' ||
             ref === '2' ||
             ref.includes('reimbur');
    });
  }

  // Untuk invoice type reimbursement atau jika ada reimbursementInvoice
  if (props.reimbursementInvoice) {
    return props.reimbursementInvoice.items || [];
  }

  // Fallback untuk invoice type reimbursement
  if (props.invoice.invoice_type === 'reimbursement') {
    return props.invoice.items || [];
  }

  return [];
});

// Computed untuk total amount per section
const getMainTotal = computed(() => {
  return getMainItems.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
});

const getReimbursementTotal = computed(() => {
  return getReimbursementItems.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
});
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
.border-sage-200 {
  border-color: #d4ddd0;
}
.divide-sage-200 > :not([hidden]) ~ :not([hidden]) {
  border-color: #d4ddd0;
}
.hover\:bg-sage-50:hover {
  background-color: #f4f6f3;
}
</style>