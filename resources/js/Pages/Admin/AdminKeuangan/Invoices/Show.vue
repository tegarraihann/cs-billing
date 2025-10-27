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
            <button
              @click="fixOperationalCosts"
              class="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              v-if="shouldShowFixOperationalCostsButton"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Fix Operational Costs
            </button>
            <button
              @click="openProfitLossModal"
              class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              v-if="shouldShowProfitLossButton"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Post ke Laba Rugi
            </button>
            <button
              @click="unpostFromProfitLoss"
              class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              v-if="invoice.posted_to_profit_loss"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
              Batal Post Laba Rugi
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
            <div class="flex justify-between">
              <span class="text-gray-600">Status Laba Rugi:</span>
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="invoice.posted_to_profit_loss ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'"
              >
                {{ invoice.posted_to_profit_loss ? 'Sudah Di-post' : 'Belum Di-post' }}
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
            <div class="flex justify-between">
              <span class="text-gray-600">Gross Weight:</span>
              <span class="font-medium">{{ invoice.gross_weight || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Volume:</span>
              <span class="font-medium">{{ invoice.volume || '-' }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">No. of Packages:</span>
              <span class="font-medium">
                {{ invoice.no_of_packages || '-' }}
                {{ invoice.package_unit || 'BAG' }}
              </span>
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

        <!-- Profit Loss Posting Information (if posted) -->
        <div class="bg-white rounded-lg shadow-sm p-6 border border-purple-200" v-if="invoice.posted_to_profit_loss">
          <h3 class="text-lg font-semibold text-purple-800 mb-4">Informasi Posting Laba Rugi</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Status:</span>
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Sudah Di-post
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Tanggal Posting:</span>
              <span class="font-medium">{{ formatDateTime(invoice.posted_to_profit_loss_at) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Di-post oleh:</span>
              <span class="font-medium">{{ invoice.posted_by_user?.name || '-' }}</span>
            </div>
            <div v-if="invoice.profit_loss_entries && invoice.profit_loss_entries.length > 0" class="pt-2">
              <span class="text-gray-600">Entry IDs:</span>
              <p class="text-gray-900 mt-1 text-sm">{{ invoice.profit_loss_entries.join(', ') }}</p>
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
                  <div v-if="getReimbursementLatestHistory(item)" class="text-xs text-gray-500 mt-1 space-y-0.5">
                    <div class="flex flex-wrap items-center gap-2">
                      <span>Terakhir:</span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                        {{ getReimbursementStatusLabel(getReimbursementLatestHistory(item).status) }}
                      </span>
                      <span v-if="getReimbursementLatestHistory(item).vendor_name">
                        oleh {{ getReimbursementLatestHistory(item).vendor_name }}
                      </span>
                      <span v-if="getReimbursementLatestHistory(item).timestamp">
                        ({{ formatDate(getReimbursementLatestHistory(item).timestamp) }})
                      </span>
                    </div>
                    <div v-if="getReimbursementLatestHistory(item).notes">
                      Catatan: {{ getReimbursementLatestHistory(item).notes }}
                    </div>
                    <div v-if="getReimbursementLatestHistory(item).user">
                      Diproses oleh: {{ getReimbursementLatestHistory(item).user }}
                    </div>
                  </div>
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

        <div
          v-if="hasReimbursementEntries"
          class="px-6 py-3 bg-white border-b border-sage-200 flex flex-wrap items-center gap-2"
        >
          <span class="text-sm text-sage-600 mr-2">Filter Status:</span>
          <button
            type="button"
            @click="reimbursementFilter = 'all'"
            :class="reimbursementFilter === 'all'
              ? 'bg-orange-600 text-white border border-orange-600 shadow-sm'
              : 'bg-white text-sage-700 border border-sage-200 hover:border-orange-300'"
            class="px-3 py-1.5 text-sm rounded-md transition-colors"
          >
            Semua
          </button>
          <button
            type="button"
            @click="reimbursementFilter = 'unpaid'"
            :class="reimbursementFilter === 'unpaid'
              ? 'bg-orange-600 text-white border border-orange-600 shadow-sm'
              : 'bg-white text-sage-700 border border-sage-200 hover:border-orange-300'"
            class="px-3 py-1.5 text-sm rounded-md transition-colors"
          >
            Belum Dibayar
          </button>
          <button
            type="button"
            @click="reimbursementFilter = 'paid'"
            :class="reimbursementFilter === 'paid'
              ? 'bg-orange-600 text-white border border-orange-600 shadow-sm'
              : 'bg-white text-sage-700 border border-sage-200 hover:border-orange-300'"
            class="px-3 py-1.5 text-sm rounded-md transition-colors"
          >
            Sudah Dibayar
          </button>
        </div>

        <div class="overflow-x-auto" v-if="hasReimbursementEntries">
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
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider">
                  Tanggal Bayar
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-sage-200">
              <tr v-if="filteredReimbursementEntries.length === 0">
                <td colspan="10" class="px-6 py-6 text-center text-sm text-gray-500">
                  Tidak ada data reimbursement untuk filter ini.
                </td>
              </tr>
              <tr v-for="item in filteredReimbursementEntries" :key="item.id" class="hover:bg-sage-50">
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
                  <div class="text-sm text-gray-900">
                    {{ formatCurrency(item.rate, item.currency || reimbursementCurrency) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.currency || reimbursementCurrency }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <div class="text-sm font-medium text-gray-900">
                    {{ formatCurrency(item.amount, item.currency || reimbursementCurrency) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.vendor_name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    :class="getReimbursementStatusColor(item.status)"
                  >
                    {{ getReimbursementStatusLabel(item.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ item.paid_at ? formatDate(item.paid_at) : '-' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    v-if="item.can_update"
                    @click="openReimbursementPaymentModal(item)"
                    class="px-3 py-1.5 text-sm rounded-md border border-orange-500 text-orange-600 hover:bg-orange-50 transition-colors"
                  >
                    {{ item.status === 'paid' ? 'Ubah Status' : 'Tandai Dibayar' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="overflow-x-auto" v-else>
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
                <span class="text-sm text-gray-600">{{ reimbursementSubtotalLabel }}</span>
                <span class="text-sm font-medium">
                  {{ formatCurrency(reimbursementFilteredSubtotal, reimbursementCurrency) }}
                </span>
              </div>
              <div
                v-if="hasReimbursementEntries && reimbursementFilter !== 'all'"
                class="text-xs text-gray-500 text-right"
              >
                Menampilkan {{ filteredReimbursementEntries.length }} dari {{ normalizedReimbursementEntries.length }} item
              </div>
              <div class="flex justify-between pt-2 border-t border-orange-200">
                <span class="text-lg font-semibold text-orange-800">Total Reimbursement:</span>
                <span class="text-lg font-bold text-orange-800">
                  {{ formatCurrency(reimbursementOverallSubtotal, reimbursementCurrency) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Operational Costs Section -->
      <div v-if="getOperationalCosts.length > 0" class="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden mb-6">
        <div class="px-6 py-4 border-b border-red-200 bg-red-50">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <h3 class="text-lg font-semibold text-red-800">Biaya Lain / Operational Costs</h3>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                Internal Only
              </span>
            </div>
            <div class="text-sm text-red-600">
              Tidak terlihat oleh customer
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-red-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                  Qty
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                  Unit
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                  Rate
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider">
                  Currency
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-red-500 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-red-200">
              <tr v-for="item in getOperationalCosts" :key="item.id" class="hover:bg-red-50">
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

        <!-- Operational Costs Total -->
        <div class="px-6 py-4 bg-red-50 border-t border-red-200">
          <div class="flex justify-end">
            <div class="w-64 space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Subtotal Biaya Lain:</span>
                <span class="text-sm font-medium">{{ formatCurrency(getOperationalCostsTotal) }}</span>
              </div>
              <div class="flex justify-between pt-2 border-t border-red-200">
                <span class="text-lg font-semibold text-red-800">Total Biaya Lain:</span>
                <span class="text-lg font-bold text-red-800">{{ formatCurrency(getOperationalCostsTotal) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Profit Breakdown Section -->
      <div class="bg-white rounded-lg shadow-sm border border-purple-200 overflow-hidden mb-6">
        <div class="px-6 py-4 border-b border-purple-200 bg-purple-50">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <h3 class="text-lg font-semibold text-purple-800">Analisis Profit</h3>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                Internal Analysis
              </span>
            </div>
          </div>
        </div>

        <div class="px-6 py-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <!-- Gross Revenue -->
            <div class="bg-green-50 rounded-lg p-4 border border-green-200">
              <div class="text-center">
                <div class="text-2xl font-bold text-green-800">{{ formatCurrency(getGrossRevenue) }}</div>
                <div class="text-sm text-green-600 mt-1">Gross Revenue</div>
                <div class="text-xs text-gray-500 mt-1">Total yang dapat ditagih</div>
              </div>
            </div>

            <!-- Operational Costs -->
            <div class="bg-red-50 rounded-lg p-4 border border-red-200">
              <div class="text-center">
                <div class="text-2xl font-bold text-red-800">{{ formatCurrency(getOperationalCostsTotal) }}</div>
                <div class="text-sm text-red-600 mt-1">Operational Costs</div>
                <div class="text-xs text-gray-500 mt-1">Biaya operasional</div>
              </div>
            </div>

            <!-- Reimbursement -->
            <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
              <div class="text-center">
                <div class="text-2xl font-bold text-orange-800">{{ formatCurrency(getReimbursementTotal) }}</div>
                <div class="text-sm text-orange-600 mt-1">Reimbursement</div>
                <div class="text-xs text-gray-500 mt-1">Cost Neutral</div>
              </div>
            </div>

            <!-- Net Profit -->
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div class="text-center">
                <div class="text-2xl font-bold text-blue-800">{{ formatCurrency(getNetProfit) }}</div>
                <div class="text-sm text-blue-600 mt-1">Net Profit</div>
                <div class="text-xs text-gray-500 mt-1">Keuntungan bersih</div>
              </div>
            </div>

            <!-- Profit Margin -->
            <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <div class="text-center">
                <div class="text-2xl font-bold text-purple-800">{{ getProfitMargin }}%</div>
                <div class="text-sm text-purple-600 mt-1">Profit Margin</div>
                <div class="text-xs text-gray-500 mt-1">Persentase keuntungan</div>
              </div>
            </div>
          </div>

          <!-- Profit Calculation Details -->
          <div class="mt-6 bg-gray-50 rounded-lg p-4">
            <h4 class="text-sm font-semibold text-gray-800 mb-3">Detail Perhitungan:</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Gross Revenue (Items yang dapat ditagih):</span>
                <span class="font-medium text-green-700">{{ formatCurrency(getGrossRevenue) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Operational Costs (Biaya internal):</span>
                <span class="font-medium text-red-700">- {{ formatCurrency(getOperationalCostsTotal) }}</span>
              </div>
              <hr class="border-gray-300">
              <div class="flex justify-between">
                <span class="text-gray-600">Reimbursement (Cost Neutral - Tidak mengurangi profit):</span>
                <span class="font-medium text-orange-700">{{ formatCurrency(getReimbursementTotal) }}</span>
              </div>
              <hr class="border-gray-300">
              <div class="flex justify-between font-semibold">
                <span class="text-gray-800">Net Profit:</span>
                <span class="text-blue-700">{{ formatCurrency(getNetProfit) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Profit Margin:</span>
                <span class="text-purple-700 font-medium">{{ getProfitMargin }}%</span>
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

    <!-- Reimbursement Payment Modal -->
    <div v-if="showReimbursementPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 class="text-lg font-semibold text-orange-800 mb-4">Perbarui Status Reimbursement</h3>

        <div v-if="selectedReimbursementEntry" class="mb-4 text-sm text-gray-600">
          <div class="font-medium text-gray-800">{{ selectedReimbursementEntry.description }}</div>
          <div>Nominal: {{ formatCurrency(selectedReimbursementEntry.amount, selectedReimbursementEntry.currency || 'IDR') }}</div>
        </div>

        <form @submit.prevent="submitReimbursementPayment">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                v-model="reimbursementPaymentForm.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="paid">Sudah Dibayar</option>
                <option value="invoiced">Belum Dibayar</option>
              </select>
            </div>

            <div v-if="reimbursementPaymentForm.status === 'paid'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Vendor / Pembayar</label>
                <input
                  type="text"
                  v-model="reimbursementPaymentForm.vendor_name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Eshaka Wijaya Logistics"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal Bayar</label>
                <input
                  type="date"
                  v-model="reimbursementPaymentForm.paid_at"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Catatan (Opsional)</label>
              <textarea
                v-model="reimbursementPaymentForm.notes"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Contoh: Dibayar melalui rekening BCA perusahaan"
              ></textarea>
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="closeReimbursementPaymentModal"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="reimbursementPaymentForm.processing"
              class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {{ reimbursementPaymentForm.processing ? 'Menyimpan...' : 'Simpan Perubahan' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Profit Loss Posting Modal -->
    <div v-if="showProfitLossModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
        <h3 class="text-lg font-semibold text-purple-800 mb-4">Post Invoice ke Laba Rugi</h3>

        <!-- Invoice Summary -->
        <div class="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-200">
          <h4 class="text-sm font-semibold text-purple-800 mb-3">Ringkasan Invoice:</h4>
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-600">Invoice Number:</span>
              <span class="font-medium text-purple-800 ml-2">{{ invoice.invoice_number }}</span>
            </div>
            <div>
              <span class="text-gray-600">Customer:</span>
              <span class="font-medium text-purple-800 ml-2">{{ invoice.customer?.company_name }}</span>
            </div>
            <div>
              <span class="text-gray-600">Gross Revenue:</span>
              <span class="font-medium text-green-700 ml-2">{{ formatCurrency(getGrossRevenue) }}</span>
            </div>
            <div>
              <span class="text-gray-600">Operational Costs:</span>
              <span class="font-medium text-red-700 ml-2">{{ formatCurrency(getOperationalCostsTotal) }}</span>
            </div>
            <div class="col-span-2 pt-2 border-t border-purple-200">
              <span class="text-gray-600">Net Profit:</span>
              <span class="font-bold text-blue-700 ml-2">{{ formatCurrency(getNetProfit) }}</span>
            </div>
          </div>
        </div>

        <form @submit.prevent="submitProfitLossPosting">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Periode Laba Rugi <span class="text-red-500">*</span>
              </label>
              <select
                v-model="profitLossForm.period_id"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                required
              >
                <option value="">Pilih Periode...</option>
                <option v-for="period in profitLossPeriods" :key="period.id" :value="period.id">
                  {{ period.name }} ({{ period.start_date }} - {{ period.end_date }})
                </option>
              </select>
              <p class="text-xs text-gray-500 mt-1">
                Pilih periode laba rugi dimana transaksi ini akan dicatat
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Catatan (Opsional)</label>
              <textarea
                v-model="profitLossForm.notes"
                rows="3"
                placeholder="Catatan tambahan untuk posting laba rugi..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              ></textarea>
            </div>

            <!-- Info Box -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div class="flex items-start">
                <svg class="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div class="text-sm">
                  <p class="text-blue-800 font-medium mb-1">Yang akan di-posting:</p>
                  <ul class="text-blue-700 space-y-1">
                    <li v-if="getGrossRevenue > 0">• Pendapatan: {{ formatCurrency(getGrossRevenue) }}</li>
                    <li v-if="getOperationalCostsTotal > 0">• Biaya Operasional: {{ formatCurrency(getOperationalCostsTotal) }}</li>
                    <li>• Net Profit Impact: {{ formatCurrency(getNetProfit) }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              @click="showProfitLossModal = false"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="processing || !profitLossForm.period_id"
              class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {{ processing ? 'Memproses...' : 'Post ke Laba Rugi' }}
            </button>
          </div>
        </form>
      </div>
    </div>
</AdminKeuanganLayout>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue';
import { useForm, Link, router } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';

const props = defineProps({
  invoice: Object,
  mainInvoice: Object,
  reimbursementInvoice: Object,
  relatedInvoices: Array,
  reimbursementEntries: {
    type: Array,
    default: () => [],
  },
});

const showPaymentModal = ref(false);
const showMarkSentModal = ref(false);
const showProfitLossModal = ref(false);
const showReimbursementPaymentModal = ref(false);
const processing = ref(false);

const paymentForm = reactive({
  paid_amount: props.invoice.total,
  paid_date: new Date().toISOString().split('T')[0],
  payment_method: '',
  payment_notes: ''
});

const profitLossForm = reactive({
  period_id: '',
  notes: ''
});

const profitLossPeriods = ref([]);
const profitLossAccounts = ref([]);
const selectedReimbursementEntry = ref(null);

const reimbursementPaymentForm = useForm({
  status: 'paid',
  vendor_name: '',
  paid_at: '',
  notes: ''
});

const route = window.route || function(name, params) {
  const routes = {
    'admin-keuangan.invoices.index': '/admin-keuangan/invoices',
    'admin-keuangan.invoices.edit': (id) => `/admin-keuangan/invoices/${id}/edit`,
    'admin-keuangan.invoices.pdf': (id) => `/admin-keuangan/invoices/${id}/pdf`,
    'admin-keuangan.invoices.confirm-payment': (id) => `/admin-keuangan/invoices/${id}/confirm-payment`,
    'admin-keuangan.invoices.mark-sent': (id) => `/admin-keuangan/invoices/${id}/mark-sent`,
    'admin-keuangan.invoices.post-to-profit-loss': (id) => `/admin-keuangan/invoices/${id}/post-to-profit-loss`,
    'admin-keuangan.invoices.unpost-from-profit-loss': (id) => `/admin-keuangan/invoices/${id}/unpost-from-profit-loss`,
    'admin-keuangan.invoices.profit-loss-periods': '/admin-keuangan/invoices/profit-loss-periods',
    'admin-keuangan.invoices.reimbursement-items.update-payment': (value) => {
      if (Array.isArray(value)) {
        const [invoiceId, itemId] = value;
        return `/admin-keuangan/invoices/${invoiceId}/reimbursement-items/${itemId}/update-payment`;
      }
      if (typeof value === 'object' && value !== null) {
        const invoiceId = value.invoice || value.id;
        const itemId = value.reimbursementItem || value.item;
        return `/admin-keuangan/invoices/${invoiceId}/reimbursement-items/${itemId}/update-payment`;
      }
      return '#';
    },
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

const reimbursementFilter = ref('all');

const hasReimbursementEntries = computed(() => Array.isArray(props.reimbursementEntries) && props.reimbursementEntries.length > 0);

const normalizedReimbursementEntries = computed(() => {
  if (!hasReimbursementEntries.value) {
    return [];
  }

  return props.reimbursementEntries.map((entry, index) => {
    const amount = parseFloat(entry.amount ?? entry.total ?? 0) || 0;
    const rate = parseFloat(entry.rate ?? entry.unit_price ?? amount) || amount;
    const quantity = parseFloat(entry.quantity ?? 1) || 1;

    return {
      id: entry.id ?? `reimbursement-entry-${index}`,
      description: entry.description ?? 'Reimbursement',
      quantity,
      unit: entry.unit ?? 'UNIT',
      rate,
      currency: entry.currency ?? 'IDR',
      amount,
      status: entry.status ?? null,
      vendor_name: entry.vendor_name ?? 'Eshaka Wijaya Logistics',
      paid_at: entry.paid_at ?? entry.paid_at_date ?? null,
      category: entry.category ?? null,
      notes: entry.notes ?? null,
      can_update: entry.can_update !== false,
    };
  });
});

const filteredReimbursementEntries = computed(() => {
  if (!hasReimbursementEntries.value) {
    return [];
  }

  return normalizedReimbursementEntries.value.filter((item) => {
    const status = (item.status || '').toLowerCase();
    if (reimbursementFilter.value === 'paid') {
      return status === 'paid';
    }
    if (reimbursementFilter.value === 'unpaid') {
      return status !== 'paid';
    }
    return true;
  });
});

watch(
  () => reimbursementPaymentForm.status,
  (status) => {
    if (status === 'paid') {
      if (!reimbursementPaymentForm.vendor_name) {
        reimbursementPaymentForm.vendor_name = 'Eshaka Wijaya Logistics';
      }
      if (!reimbursementPaymentForm.paid_at) {
        reimbursementPaymentForm.paid_at = new Date().toISOString().split('T')[0];
      }
    } else {
      reimbursementPaymentForm.vendor_name = '';
      reimbursementPaymentForm.paid_at = '';
    }
  }
);

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

const openReimbursementPaymentModal = (entry) => {
  if (!entry?.id) {
    return;
  }

  selectedReimbursementEntry.value = entry;
  reimbursementPaymentForm.reset();
  reimbursementPaymentForm.status = 'paid';
  reimbursementPaymentForm.vendor_name = entry.vendor_name || 'Eshaka Wijaya Logistics';
  reimbursementPaymentForm.paid_at = entry.paid_at ? entry.paid_at.split(' ')[0] : new Date().toISOString().split('T')[0];
  reimbursementPaymentForm.notes = entry.notes || '';

  showReimbursementPaymentModal.value = true;
};

const closeReimbursementPaymentModal = () => {
  showReimbursementPaymentModal.value = false;
  selectedReimbursementEntry.value = null;
  reimbursementPaymentForm.reset();
};

const submitReimbursementPayment = () => {
  if (!selectedReimbursementEntry.value) {
    return;
  }

  if (reimbursementPaymentForm.status !== 'paid') {
    reimbursementPaymentForm.vendor_name = '';
    reimbursementPaymentForm.paid_at = '';
  }

  reimbursementPaymentForm.post(
    route('admin-keuangan.invoices.reimbursement-items.update-payment', [props.invoice.id, selectedReimbursementEntry.value.id]),
    {
      preserveScroll: true,
      onSuccess: () => {
        closeReimbursementPaymentModal();
      }
    }
  );
};

const isMainInvoiceItem = (item) => {
  if (!item) {
    return false;
  }

  const itemType = (item.item_type || '').toLowerCase();
  const includeInInvoice = item.include_in_customer_invoice ?? true;
  const hiddenFromCustomer = item.is_hidden_from_customer ?? false;

  if (!includeInInvoice || hiddenFromCustomer) {
    return false;
  }

  if (itemType === 'operational_cost' || itemType === 'reimbursement') {
    return false;
  }

  if (itemType === 'billable' || itemType === '') {
    return true;
  }

  const ref = (item.item_ref || '').toLowerCase().trim();
  return !ref ||
         ref === 'main' ||
         ref === 'm' ||
         ref === '1' ||
         ref.includes('main');
};

const filterMainInvoiceItems = (items = []) => {
  return (items || []).filter(isMainInvoiceItem);
};

// Computed properties untuk memisahkan items berdasarkan item_ref
const getMainItems = computed(() => {
  if (props.invoice.invoice_type === 'combined') {
    // Untuk invoice combined, pisahkan items berdasarkan item_type dan item_ref
    if (props.mainInvoice?.items) {
      return filterMainInvoiceItems(props.mainInvoice.items);
    }
    return filterMainInvoiceItems(props.invoice.items);
  }

  // Untuk invoice type main atau jika ada mainInvoice
  if (props.mainInvoice) {
    return filterMainInvoiceItems(props.mainInvoice.items);
  }

  // Fallback untuk invoice type main
  if (props.invoice.invoice_type === 'main') {
    return filterMainInvoiceItems(props.invoice.items);
  }

  return [];
});

const getReimbursementItems = computed(() => {
  if (props.invoice.invoice_type === 'combined') {
    // Untuk invoice combined, pisahkan items berdasarkan item_type dan item_ref
    return (props.invoice.items || []).filter(item => {
      // Primary filter: item_type harus reimbursement
      if (item.item_type === 'reimbursement') {
        return true;
      }

      // Fallback filter untuk legacy data tanpa item_type
      if (!item.item_type || item.item_type === null) {
        const ref = (item.item_ref || '').toLowerCase().trim();
        // Items masuk ke Reimbursement jika: 'reimbursement', 'r', '2', atau mengandung 'reimbur'
        return ref === 'reimbursement' ||
               ref === 'r' ||
               ref === '2' ||
               ref.includes('reimbur');
      }

      return false;
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

const reimbursementCurrency = computed(() => {
  if (hasReimbursementEntries.value && normalizedReimbursementEntries.value.length > 0) {
    return normalizedReimbursementEntries.value[0].currency || 'IDR';
  }

  const fallbackItem = getReimbursementItems.value[0];
  return fallbackItem?.currency || 'IDR';
});

const reimbursementFilteredSubtotal = computed(() => {
  if (!hasReimbursementEntries.value) {
    return getReimbursementTotal.value;
  }

  return filteredReimbursementEntries.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
});

const reimbursementOverallSubtotal = computed(() => {
  if (!hasReimbursementEntries.value) {
    return getReimbursementTotal.value;
  }

  return normalizedReimbursementEntries.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
});

const reimbursementSubtotalLabel = computed(() => {
  if (!hasReimbursementEntries.value || reimbursementFilter.value === 'all') {
    return 'Subtotal Reimbursement';
  }

  return 'Subtotal (Sesuai Filter)';
});

const getReimbursementStatusLabel = (status) => {
  const labels = {
    pending: 'Belum Diproses',
    linked: 'Tertaut',
    invoiced: 'Ditagihkan',
    paid: 'Sudah Dibayar',
  };

  if (!status) {
    return 'Tidak Diketahui';
  }

  return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
};

const getReimbursementStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    linked: 'bg-blue-100 text-blue-800',
    invoiced: 'bg-orange-100 text-orange-800',
    paid: 'bg-green-100 text-green-800',
  };

  return colors[status] || 'bg-gray-100 text-gray-800';
};

const getReimbursementLatestHistory = (entry) => {
  if (!entry?.payment_history || entry.payment_history.length === 0) {
    return null;
  }

  const latest = [...entry.payment_history].pop();
  if (!latest) {
    return null;
  }

  return {
    status: latest.status,
    vendor_name: latest.vendor_name,
    notes: latest.notes,
    user: latest.user?.name,
    timestamp: latest.timestamp,
  };
};

// Computed untuk operational costs (EXCLUDE buying costs/COGS)
const getOperationalCosts = computed(() => {
  return (props.invoice.items || []).filter(item => {
    // Only show operational_cost items
    if (item.item_type !== 'operational_cost') return false;

    // Exclude buying costs (COGS) - they are auto-generated and should be hidden from view
    const description = (item.description || '').toLowerCase();
    const itemRef = (item.item_ref || '').toLowerCase();

    // Check if this is a buying cost item
    const isBuyingCost = description.includes('buying cost') ||
                         description.includes('cogs') ||
                         itemRef.startsWith('cogs_vendor_');

    // Return true only if it's NOT a buying cost
    return !isBuyingCost;
  });
});

const getOperationalCostsTotal = computed(() => {
  return getOperationalCosts.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
});

// Computed for ALL operational costs (including COGS) for profit calculation
const getAllOperationalCostsForCalculation = computed(() => {
  return (props.invoice.items || []).filter(item => item.item_type === 'operational_cost');
});

const getAllOperationalCostsTotal = computed(() => {
  return getAllOperationalCostsForCalculation.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
});

// Computed untuk profit calculation - hanya main items (billable) yang dihitung sebagai revenue
const getBillableItems = computed(() => {
  return filterMainInvoiceItems(props.invoice.items);
});

const getGrossRevenue = computed(() => {
  return getBillableItems.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
});

const getNetProfit = computed(() => {
  // Reimbursement is cost neutral (tidak mengurangi profit karena akan di-reimburse)
  // Only operational costs reduce the profit
  return getGrossRevenue.value - getAllOperationalCostsTotal.value;
});

const getProfitMargin = computed(() => {
  if (getGrossRevenue.value <= 0) {
    return 0;
  }
  return ((getNetProfit.value / getGrossRevenue.value) * 100).toFixed(2);
});

// Computed property untuk menampilkan tombol Fix Operational Costs
const shouldShowFixOperationalCostsButton = computed(() => {
  // Show if invoice has sales order with vendor breakdown but no operational costs
  return props.invoice.sales_order_id &&
         getOperationalCostsTotal.value === 0 &&
         props.invoice.status !== 'paid' &&
         !props.invoice.posted_to_profit_loss;
});

// Computed property untuk menampilkan tombol Post ke Laba Rugi
const shouldShowProfitLossButton = computed(() => {
  return props.invoice.status === 'sent' &&
         !props.invoice.posted_to_profit_loss &&
         (getGrossRevenue.value > 0 || getOperationalCostsTotal.value > 0);
});

// Method untuk load profit loss periods
const loadProfitLossPeriods = async () => {
  try {
    const response = await fetch(route('admin-keuangan.invoices.profit-loss-periods'));
    const data = await response.json();
    profitLossPeriods.value = data.periods || [];
    profitLossAccounts.value = data.accounts || [];
  } catch (error) {
    console.error('Error loading profit loss periods:', error);
  }
};

// Method untuk submit profit loss posting
const submitProfitLossPosting = () => {
  processing.value = true;

  router.post(route('admin-keuangan.invoices.post-to-profit-loss', props.invoice.id), profitLossForm, {
    onSuccess: () => {
      showProfitLossModal.value = false;
      processing.value = false;
    },
    onError: () => {
      processing.value = false;
    }
  });
};

// Method untuk unpost dari profit loss
const unpostFromProfitLoss = () => {
  if (confirm('Apakah Anda yakin ingin membatalkan posting ke laba rugi?')) {
    processing.value = true;

    router.post(route('admin-keuangan.invoices.unpost-from-profit-loss', props.invoice.id), {}, {
      onSuccess: () => {
        processing.value = false;
      },
      onError: () => {
        processing.value = false;
      }
    });
  }
};

// Method untuk fix operational costs
const fixOperationalCosts = () => {
  if (confirm('Menambahkan operational cost dari Sales Order vendor breakdown. Lanjutkan?')) {
    processing.value = true;

    router.post(route('admin-keuangan.invoices.fix-operational-costs', props.invoice.id), {}, {
      onSuccess: (page) => {
        processing.value = false;
        // Refresh the page to show updated data
        window.location.reload();
      },
      onError: (errors) => {
        processing.value = false;
        console.error('Error fixing operational costs:', errors);
      }
    });
  }
};

// Method untuk open profit loss modal
const openProfitLossModal = async () => {
  await loadProfitLossPeriods();
  showProfitLossModal.value = true;
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
