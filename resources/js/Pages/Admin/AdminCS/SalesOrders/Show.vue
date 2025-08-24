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
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">ETA:</span> 
                    {{ salesOrder.eta ? formatDate(salesOrder.eta) : '-' }}
                  </p>
                </div>

                <!-- Right Column -->
                <div class="space-y-3">
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
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">PREPARED BY:</span> 
                    {{ salesOrder.prepared_by || '-' }}
                  </p>
                </div>
              </div>

              <!-- Detailed Information - Table Format -->
              <div class="border-t border-gray-200 pt-6">
                <h4 class="text-md font-semibold text-gray-800 mb-4">Detail Informasi</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 w-1/4">EXCHANGE RATE</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.exchange_rate || '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">JENIS BIAYA</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.jenis_biaya || '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">BUYING</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.buying ? formatCurrency(salesOrder.buying) : '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">SELLING</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.selling ? formatCurrency(salesOrder.selling) : '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">REVENUE</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.revenue ? formatCurrency(salesOrder.revenue) : '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">REMARKS</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.remarks || '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">GOODS</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.goods || '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">COMMODITY/URAIAN BARANG</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.commodity || '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">QTY</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.qty || '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">NET WEIGHT (KG)</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.net_weight ? formatWeight(salesOrder.net_weight) : '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">CONTAINER NO</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.container_no || '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">INVOICE NUMB</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.invoice_number || '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">INVOICE DATE</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.invoice_date ? formatDate(salesOrder.invoice_date) : '-' }}</td>
                      </tr>
                      <tr>
                        <td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50">T.O.P</td>
                        <td class="px-4 py-3 text-sm text-gray-900">{{ salesOrder.top || '-' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- Voucher Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">Voucher Information</h3>
            </div>
            <div class="p-6 space-y-6">
              
              <!-- Payment Vouchers -->
              <div v-if="paymentVouchers && paymentVouchers.length > 0" class="space-y-4">
                <h4 class="text-md font-semibold text-sage-700 border-b border-gray-200 pb-2">Payment Vouchers</h4>
                <div class="grid grid-cols-1 gap-4">
                  <div
                    v-for="voucher in paymentVouchers"
                    :key="voucher.id"
                    class="border border-gray-200 rounded-lg p-4 space-y-3"
                  >
                    <div class="flex justify-between items-start">
                      <div>
                        <h5 class="font-medium text-gray-900">{{ voucher.voucher_no }}</h5>
                        <span 
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"
                          :class="getVoucherStatusColor(voucher.status)"
                        >
                          {{ getVoucherStatusLabel(voucher.status) }}
                        </span>
                      </div>
                      <div class="text-right">
                        <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(voucher.amount) }}</p>
                        <p class="text-sm text-gray-500">{{ formatDate(voucher.date) }}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <p class="text-gray-900">{{ voucher.description }}</p>
                    </div>
                    
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div v-if="voucher.prepared_by">
                        <label class="block font-medium text-gray-700">Prepared By</label>
                        <p class="text-gray-900">{{ voucher.prepared_by }}</p>
                      </div>
                      <div v-if="voucher.authorized_by">
                        <label class="block font-medium text-gray-700">Authorized By</label>
                        <p class="text-gray-900">{{ voucher.authorized_by }}</p>
                      </div>
                      <div v-if="voucher.finance_by">
                        <label class="block font-medium text-gray-700">Finance By</label>
                        <p class="text-gray-900">{{ voucher.finance_by }}</p>
                      </div>
                      <div v-if="voucher.receipt_by">
                        <label class="block font-medium text-gray-700">Receipt By</label>
                        <p class="text-gray-900">{{ voucher.receipt_by }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Receipt Vouchers -->
              <div v-if="receiptVouchers && receiptVouchers.length > 0" class="space-y-4">
                <h4 class="text-md font-semibold text-sage-700 border-b border-gray-200 pb-2">Receipt Vouchers</h4>
                <div class="grid grid-cols-1 gap-4">
                  <div
                    v-for="voucher in receiptVouchers"
                    :key="voucher.id"
                    class="border border-green-200 rounded-lg p-4 space-y-3 bg-green-50"
                  >
                    <div class="flex justify-between items-start">
                      <div>
                        <h5 class="font-medium text-gray-900">{{ voucher.voucher_no }}</h5>
                        <span 
                          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"
                          :class="getVoucherStatusColor(voucher.status)"
                        >
                          {{ getVoucherStatusLabel(voucher.status) }}
                        </span>
                      </div>
                      <div class="text-right">
                        <p class="text-lg font-semibold text-green-900">{{ formatCurrency(voucher.amount) }}</p>
                        <p class="text-sm text-gray-500">{{ formatDate(voucher.date) }}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <p class="text-gray-900">{{ voucher.description }}</p>
                    </div>
                    
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div v-if="voucher.prepared_by">
                        <label class="block font-medium text-gray-700">Prepared By</label>
                        <p class="text-gray-900">{{ voucher.prepared_by }}</p>
                      </div>
                      <div v-if="voucher.authorized_by">
                        <label class="block font-medium text-gray-700">Authorized By</label>
                        <p class="text-gray-900">{{ voucher.authorized_by }}</p>
                      </div>
                      <div v-if="voucher.finance_by">
                        <label class="block font-medium text-gray-700">Finance By</label>
                        <p class="text-gray-900">{{ voucher.finance_by }}</p>
                      </div>
                      <div v-if="voucher.receipt_by">
                        <label class="block font-medium text-gray-700">Receipt By</label>
                        <p class="text-gray-900">{{ voucher.receipt_by }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- No Vouchers Message -->
              <div v-if="(!paymentVouchers || paymentVouchers.length === 0) && (!receiptVouchers || receiptVouchers.length === 0)" 
                   class="text-center py-8">
                <div class="text-gray-400 mb-2">
                  <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p class="text-gray-500">No vouchers created for this sales order</p>
              </div>
              
            </div>
          </div>

          <!-- Vendor Information -->
          <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
              <h3 class="text-lg font-semibold text-sage-800">Buying to Vendor</h3>
            </div>
            <div class="p-6">
              <div v-if="getVendorInfo(salesOrder.vendors)" class="space-y-6">
                <div class="border border-sage-200 rounded-lg p-4 bg-sage-50">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="font-medium text-sage-800">Informasi Vendor</h4>
                    <span
                      v-if="getVendorInfo(salesOrder.vendors).nominal"
                      class="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full"
                    >
                      {{ formatCurrency(getVendorInfo(salesOrder.vendors).nominal) }}
                    </span>
                  </div>

                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <!-- Deskripsi -->
                    <div class="md:col-span-2 lg:col-span-3">
                      <label class="block text-sm font-medium text-sage-700 mb-1">
                        Deskripsi
                      </label>
                      <p class="text-gray-900 bg-white p-3 rounded border border-sage-200">
                        {{ getVendorInfo(salesOrder.vendors).deskripsi || '-' }}
                      </p>
                    </div>

                    <!-- Nominal -->
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-1">
                        Nominal
                      </label>
                      <p class="text-gray-900">{{ getVendorInfo(salesOrder.vendors).nominal ? formatCurrency(getVendorInfo(salesOrder.vendors).nominal) : '-' }}</p>
                    </div>

                    <!-- No Rekening -->
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-1">
                        No Rekening
                      </label>
                      <p class="text-gray-900 font-mono">{{ getVendorInfo(salesOrder.vendors).no_rekening || '-' }}</p>
                    </div>

                    <!-- Company Name -->
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-1">
                        Company Name
                      </label>
                      <p class="text-gray-900">{{ getVendorInfo(salesOrder.vendors).company_name || '-' }}</p>
                    </div>

                    <!-- Nama Rekening -->
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-1">
                        Nama Rekening
                      </label>
                      <p class="text-gray-900">{{ getVendorInfo(salesOrder.vendors).nama_rekening || '-' }}</p>
                    </div>

                    <!-- RCVD INV -->
                    <div>
                      <label class="block text-sm font-medium text-sage-700 mb-1">
                        RCVD INV
                      </label>
                      <p class="text-gray-900">{{ getVendorInfo(salesOrder.vendors).rcvd_inv || '-' }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="text-center py-8">
                <svg
                  class="w-12 h-12 text-gray-300 mb-4 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <p class="text-lg font-medium text-gray-900 mb-2">Tidak ada data vendor</p>
                <p class="text-sm text-gray-400">
                  Belum ada vendor yang terdaftar untuk sales order ini
                </p>
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
  paymentVouchers: Array,
  receiptVouchers: Array,
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

const formatWeight = (weight) => {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(weight) + ' kg';
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
const getVoucherStatusLabel = (status) => {
  const labels = {
    draft: 'Draft',
    released: 'Released',
    approved: 'Approved'
  };
  return labels[status] || status;
};

const getVoucherStatusColor = (status) => {
  const colors = {
    draft: 'bg-yellow-100 text-yellow-800',
    released: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const getVendorInfo = (vendors) => {
  if (!vendors) return null;

  // Handle if vendors is an array
  if (Array.isArray(vendors) && vendors.length > 0) {
    return vendors[0];
  }

  // Handle if vendors is an object
  if (typeof vendors === 'object' && !Array.isArray(vendors)) {
    return vendors;
  }

  return null;
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