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
              Export PDF
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
              v-if="salesOrder.status === 'draft'"
              :href="route('admin-cs.sales-orders.edit', salesOrder.id)"
              class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </Link>
            <button
              v-else
              disabled
              class="inline-flex items-center px-4 py-2 bg-gray-400 text-gray-700 rounded-lg cursor-not-allowed"
              title="Sales order tidak dapat diedit (sudah dirilis)"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit (Tidak Tersedia)
            </button>
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
                  <p class="text-gray-900">
                    <span class="font-semibold text-gray-700">PREPARED BY:</span>
                    {{ salesOrder.prepared_by || '-' }}
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
                      <tr class="bg-sage-50">
                        <th class="px-6 py-4 text-left text-sm font-bold text-sage-800 uppercase tracking-wide">JENIS BIAYA</th>
                        <th class="px-6 py-4 text-center text-sm font-bold text-sage-800 uppercase tracking-wide">BUYING</th>
                        <th class="px-6 py-4 text-center text-sm font-bold text-sage-800 uppercase tracking-wide">SELLING</th>
                        <th class="px-6 py-4 text-center text-sm font-bold text-sage-800 uppercase tracking-wide">REVENUE</th>
                        <th class="px-6 py-4 text-left text-sm font-bold text-sage-800 uppercase tracking-wide">REMARKS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="salesOrder.vendor_breakdown && salesOrder.vendor_breakdown.length > 0"
                          v-for="(item, index) in salesOrder.vendor_breakdown"
                          :key="index"
                          class="hover:bg-sage-50 transition-colors">
                        <td class="px-6 py-4 text-sm text-gray-900">
                          {{ item.description || 'Service Type' }}
                        </td>
                        <td class="px-6 py-4 text-center text-sm font-mono text-gray-900">
                          {{ formatCurrency(item.buying_amount || 0) }}
                        </td>
                        <td class="px-6 py-4 text-center text-sm font-mono text-gray-900">
                          {{ formatCurrency(item.selling_amount || 0) }}
                        </td>
                        <td class="px-6 py-4 text-center text-sm font-mono" :class="getVendorProfit(item) >= 0 ? 'text-sage-700' : 'text-red-600'">
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
                      <tr v-if="salesOrder.vendor_breakdown && salesOrder.vendor_breakdown.length > 0" class="bg-sage-50 border-t border-gray-200">
                        <td class="px-6 py-4 text-sm font-semibold text-sage-800 uppercase">
                          TOTAL
                        </td>
                        <td class="px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900">
                          {{ formatCurrency(totalBuying) }}
                        </td>
                        <td class="px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900">
                          {{ formatCurrency(totalSelling) }}
                        </td>
                        <td class="px-6 py-4 text-center text-sm font-mono font-semibold" :class="totalRevenue >= 0 ? 'text-sage-700' : 'text-red-600'">
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
                    <p class="text-gray-900">{{ salesOrder.note }}</p>
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
import { computed } from "vue";
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

// Vendor information is now integrated into buying_breakdown
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
  border-color: #c0cdb8;
}
.border-sage-400 {
  border-color: #a8b89c;
}
.bg-sage-25 {
  background-color: #f8faf7;
}
.bg-sage-100 {
  background-color: #eef3eb;
}
.text-sage-800 {
  color: #6b8f5e;
}
.divide-sage-200 > :not([hidden]) ~ :not([hidden]) {
  border-color: #d4ddd0;
}
.hover\:bg-sage-25:hover {
  background-color: #f8faf7;
}
.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}
</style>
