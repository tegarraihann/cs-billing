<template>
    <AdminKeuanganLayout>
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
                                    <h1 class="text-2xl font-semibold text-gray-900">Shipping Order: {{
                                        salesOrder.order_number }}</h1>
                                    <p class="mt-1 text-sm text-gray-600">Review dan kelola shipping order dari CS</p>
                                </div>
                            </div>
                            <div class="mt-4 sm:mt-0 flex space-x-3">
                                <button v-if="salesOrder.status === 'released'" @click="showApprovalDialog"
                                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                    <Check class="mr-2 h-4 w-4" />
                                    Setujui
                                </button>
                                <button v-if="salesOrder.status === 'released'" @click="showRejectModal = true"
                                    class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                                    <X class="mr-2 h-4 w-4" />
                                    Tolak
                                </button>
                                <Link :href="route('admin-keuangan.sales-orders.index')"
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <ArrowLeft class="mr-2 h-4 w-4" />
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
                        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                            <div class="px-6 py-4 border-b border-gray-200">
                                <h3 class="text-lg font-medium text-gray-900">Informasi shiping Order</h3>
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
                                            <label class="block text-sm font-medium text-gray-700 mb-2">EXCHANGE
                                                RATE</label>
                                            <p class="text-gray-900 font-mono">{{ salesOrder.exchange_rate ?
                                                formatNumber(salesOrder.exchange_rate) : '-' }}</p>
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
                                                    <th
                                                        class="px-6 py-4 text-left text-sm font-bold text-sage-800 uppercase tracking-wide">
                                                        JENIS BIAYA</th>
                                                    <th
                                                        class="px-6 py-4 text-center text-sm font-bold text-sage-800 uppercase tracking-wide">
                                                        BUYING</th>
                                                    <th
                                                        class="px-6 py-4 text-center text-sm font-bold text-sage-800 uppercase tracking-wide">
                                                        SELLING</th>
                                                    <th
                                                        class="px-6 py-4 text-center text-sm font-bold text-sage-800 uppercase tracking-wide">
                                                        REVENUE</th>
                                                    <th
                                                        class="px-6 py-4 text-left text-sm font-bold text-sage-800 uppercase tracking-wide">
                                                        REMARKS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-if="salesOrder.vendor_breakdown && salesOrder.vendor_breakdown.length > 0"
                                                    v-for="(item, index) in salesOrder.vendor_breakdown" :key="index"
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
                                                    <td class="px-6 py-4 text-center text-sm font-mono"
                                                        :class="getVendorProfit(item) >= 0 ? 'text-sage-700' : 'text-red-600'">
                                                        {{ formatCurrency(getVendorProfit(item)) }}
                                                    </td>
                                                    <td class="px-6 py-4 text-sm text-gray-600">
                                                        {{ item.remarks || '-' }}
                                                    </td>
                                                </tr>
                                                <tr v-else>
                                                    <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                                                        <div class="flex flex-col items-center">
                                                            <div
                                                                class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                                                <svg class="w-8 h-8 text-gray-300" fill="none"
                                                                    stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                                        stroke-width="2"
                                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                </svg>
                                                            </div>
                                                            <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak ada
                                                                data breakdown</h3>
                                                            <p class="text-sm text-gray-500 max-w-sm">Belum ada
                                                                informasi vendor breakdown. Data akan muncul setelah
                                                                informasi pricing diisi.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <!-- Total Row -->
                                                <tr v-if="salesOrder.vendor_breakdown && salesOrder.vendor_breakdown.length > 0"
                                                    class="bg-sage-50 border-t border-gray-200">
                                                    <td class="px-6 py-4 text-sm font-semibold text-sage-800 uppercase">
                                                        TOTAL
                                                    </td>
                                                    <td
                                                        class="px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900">
                                                        {{ formatCurrency(totalBuying) }}
                                                    </td>
                                                    <td
                                                        class="px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900">
                                                        {{ formatCurrency(totalSelling) }}
                                                    </td>
                                                    <td class="px-6 py-4 text-center text-sm font-mono font-semibold"
                                                        :class="totalRevenue >= 0 ? 'text-sage-700' : 'text-red-600'">
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
                                    <div v-if="salesOrder.remarks" class="mb-6">
                                        <h5 class="text-sm font-semibold text-gray-800 mb-3">Catatan (Remarks)</h5>
                                        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                            <p class="text-gray-900">{{ salesOrder.remarks }}</p>
                                        </div>
                                    </div>

                                    <!-- Note Section -->
                                    <div v-if="salesOrder.note" class="mb-6">
                                        <h5 class="text-sm font-semibold text-gray-800 mb-3">Catatan Tambahan (Note)
                                        </h5>
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
                                    <div
                                        class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
                                        <div class="space-y-3">
                                            <div>
                                                <label
                                                    class="block text-sm font-medium text-gray-700 mb-1">COMMODITY/URAIAN
                                                    BARANG</label>
                                                <p class="text-gray-900">{{ salesOrder.commodity || '-' }}</p>
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">QTY</label>
                                                <p class="text-gray-900">{{ salesOrder.qty || '-' }}</p>
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">NET WEIGHT
                                                    (KG)</label>
                                                <p class="text-gray-900">{{ salesOrder.net_weight ?
                                                    formatWeight(salesOrder.net_weight) : '-' }}</p>
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">GROSS WEIGHT
                                                    (KG)</label>
                                                <p class="text-gray-900">{{ salesOrder.gross_weight ?
                                                    formatWeight(salesOrder.gross_weight) : '-' }}</p>
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">MEAS
                                                    (M³)</label>
                                                <p class="text-gray-900">{{ salesOrder.measurement ?
                                                    formatMeasurement(salesOrder.measurement) : '-' }}</p>
                                            </div>
                                        </div>
                                        <div class="space-y-3">
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">CONTAINER
                                                    NO</label>
                                                <p class="text-gray-900">{{ salesOrder.container_no || '-' }}</p>
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">INVOICE
                                                    NUMB</label>
                                                <p class="text-gray-900">{{ salesOrder.invoice_number || '-' }}</p>
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-gray-700 mb-1">INVOICE
                                                    DATE</label>
                                                <p class="text-gray-900">{{ salesOrder.invoice_date ?
                                                    formatDate(salesOrder.invoice_date) : '-' }}</p>
                                            </div>
                                            <div>
                                                <label
                                                    class="block text-sm font-medium text-gray-700 mb-1">T.O.P</label>
                                                <p class="text-gray-900">{{ salesOrder.top || '-' }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Invoice Management Section -->
                        <div v-if="(salesOrder.status === 'released' || salesOrder.status === 'approved') && salesOrder.released_at"
                            class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
                                <div class="flex justify-between items-center">
                                    <h3 class="text-lg font-semibold text-sage-800">Invoice Management</h3>
                                    <button @click="showInvoiceCreateModal = true"
                                        class="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Buat Invoice
                                    </button>
                                </div>
                            </div>
                            <div class="p-6">
                                <!-- Main Invoices -->
                                <div
                                    v-if="salesOrder.invoices && salesOrder.invoices.filter(inv => inv.invoice_type === 'main').length > 0">
                                    <h4 class="text-md font-semibold text-gray-800 mb-4">Main Invoices</h4>
                                    <div v-for="invoice in salesOrder.invoices.filter(inv => inv.invoice_type === 'main')"
                                        :key="'main-' + invoice.id"
                                        class="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
                                        <div class="flex justify-between items-start mb-3">
                                            <div>
                                                <h5 class="font-semibold text-gray-900 flex items-center">
                                                    <span
                                                        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2 bg-blue-100 text-blue-800">
                                                        Main
                                                    </span>
                                                    {{ invoice.invoice_number }}
                                                </h5>
                                                <p class="text-sm text-gray-600">{{ invoice.description || 'MainInvoice' }}</p>
                                            </div>
                                            <div class="text-right">
                                                <p class="font-semibold text-gray-900">{{
                                                    formatCurrency(invoice.total_amount || 0) }}</p>
                                                <span
                                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                                    :class="getInvoiceStatusColor(invoice.status)">
                                                    {{ getInvoiceStatusLabel(invoice.status) }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span class="text-gray-500">Date:</span>
                                                <span class="ml-1 text-gray-900">{{ formatDate(invoice.invoice_date)
                                                    }}</span>
                                            </div>
                                            <div>
                                                <span class="text-gray-500">Customer:</span>
                                                <span class="ml-1 text-gray-900">{{ invoice.customer_name ||
                                                    salesOrder.customer }}</span>
                                            </div>
                                        </div>

                                        <!-- Print button for invoices -->
                                        <div class="mt-3 flex space-x-2">
                                            <a :href="route('admin-keuangan.invoices.print', invoice.id)"
                                                target="_blank"
                                                class="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                                                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                </svg>
                                                Download PDF
                                            </a>
                                            <Link :href="route('admin-keuangan.invoices.show', invoice.id)"
                                                class="inline-flex items-center px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <!-- Reimbursement Invoices -->
                                <div v-if="salesOrder.invoices && salesOrder.invoices.filter(inv => inv.invoice_type === 'reimbursement').length > 0"
                                    class="mt-6">
                                    <h4 class="text-md font-semibold text-gray-800 mb-4">Reimbursement Invoices</h4>
                                    <div v-for="invoice in salesOrder.invoices.filter(inv => inv.invoice_type === 'reimbursement')"
                                        :key="'reimb-' + invoice.id"
                                        class="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0">
                                        <div class="flex justify-between items-start mb-3">
                                            <div>
                                                <h5 class="font-semibold text-gray-900 flex items-center">
                                                    <span
                                                        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2 bg-orange-100 text-orange-800">
                                                        Reimbursement
                                                    </span>
                                                    {{ invoice.invoice_number }}
                                                </h5>
                                                <p class="text-sm text-gray-600">{{ invoice.description ||
                                                    'Reimbursement Invoice' }}</p>
                                            </div>
                                            <div class="text-right">
                                                <p class="font-semibold text-gray-900">{{
                                                    formatCurrency(invoice.total_amount || 0) }}</p>
                                                <span
                                                    class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                                                    :class="getInvoiceStatusColor(invoice.status)">
                                                    {{ getInvoiceStatusLabel(invoice.status) }}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span class="text-gray-500">Date:</span>
                                                <span class="ml-1 text-gray-900">{{ formatDate(invoice.invoice_date)
                                                    }}</span>
                                            </div>
                                            <div>
                                                <span class="text-gray-500">Customer:</span>
                                                <span class="ml-1 text-gray-900">{{ invoice.customer_name ||
                                                    salesOrder.customer }}</span>
                                            </div>
                                        </div>

                                        <!-- Print button for reimbursement invoices -->
                                        <div class="mt-3 flex space-x-2">
                                            <a :href="route('admin-keuangan.invoices.print', invoice.id)"
                                                target="_blank"
                                                class="inline-flex items-center px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition-colors">
                                                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                                </svg>
                                                Download PDF -R
                                            </a>
                                            <Link :href="route('admin-keuangan.invoices.show', invoice.id)"
                                                class="inline-flex items-center px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <!-- No invoices message -->
                                <div v-if="!salesOrder.invoices || salesOrder.invoices.length === 0"
                                    class="text-center py-8">
                                    <div class="flex flex-col items-center">
                                        <div
                                            class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                            <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <h3 class="text-lg font-medium text-gray-900 mb-2">Belum ada invoice</h3>
                                        <p class="text-sm text-gray-500 max-w-sm">Belum ada invoice yang dibuat untuk
                                            shipping order ini. Klik tombol "Buat Invoice" untuk memulai.</p>
                                    </div>
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
                                    :class="getStatusColor(salesOrder.status)">
                                    {{ getStatusLabel(salesOrder.status || 'released') }}
                                </span>
                            </div>
                        </div>

                        <!-- Release Information -->
                        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                            <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
                                <h3 class="text-lg font-semibold text-sage-800">Informasi Rilis</h3>
                            </div>
                            <div class="p-6 space-y-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Dirilis Oleh</label>
                                    <p class="text-gray-900">{{ salesOrder.released_by?.name || 'Unknown' }}</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Rilis</label>
                                    <p class="text-gray-900">{{ formatDateTime(salesOrder.released_at) }}</p>
                                </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Approval Dialog -->
            <div v-if="showApprovalModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <div class="flex items-center mb-4">
                        <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900">Konfirmasi Persetujuan</h3>
                    </div>

                    <div class="mb-6 space-y-3">
                        <p class="text-gray-600">Apakah Anda yakin ingin menyetujui shipping order ini?</p>

                        <div class="bg-gray-50 p-3 rounded-lg space-y-2">
                            <div class="flex justify-between text-sm">
                                <span class="font-medium">Order Number:</span>
                                <span>{{ salesOrder.order_number }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="font-medium">Customer:</span>
                                <span>{{ salesOrder.customer }}</span>
                            </div>
                            <div class="flex justify-between text-sm">
                                <span class="font-medium">Status Saat Ini:</span>
                                <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                                    :class="getStatusColor(salesOrder.status)">
                                    {{ getStatusLabel(salesOrder.status) }}
                                </span>
                            </div>
                        </div>

                        <!-- Debug Info (hanya tampil jika ada masalah) -->
                        <div v-if="debugInfo" class="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                            <div class="text-sm font-medium text-yellow-800 mb-1">Debug Info:</div>
                            <div class="text-xs text-yellow-700">
                                <div>Status: {{ salesOrder.status }}</div>
                                <div>Released At: {{ salesOrder.released_at || 'NULL' }}</div>
                                <div>Released By: {{ salesOrder.released_by?.name || 'NULL' }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button @click="closeApprovalDialog"
                            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                            Batal
                        </button>
                        <button @click="approveSalesOrder"
                            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Ya, Setujui
                        </button>
                    </div>
                </div>
            </div>

            <!-- Reject Modal -->
            <div v-if="showRejectModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <h3 class="text-lg font-semibold mb-4">Tolak Shipping Order</h3>
                    <p class="text-gray-600 mb-4">Berikan alasan penolakan:</p>
                    <textarea v-model="rejectionReason"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows="4" placeholder="Masukkan alasan penolakan..."></textarea>
                    <div class="flex justify-end space-x-3 mt-4">
                        <button @click="showRejectModal = false"
                            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors">
                            Batal
                        </button>
                        <button @click="rejectSalesOrder" :disabled="!rejectionReason.trim()"
                            class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            Tolak
                        </button>
                    </div>
                </div>
            </div>

            <!-- Invoice Create Modal -->
            <div v-if="showInvoiceCreateModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                    <div class="flex items-center mb-4">
                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900">Pilih Tipe Invoice</h3>
                    </div>

                    <div class="mb-6">
                        <p class="text-gray-600 mb-4">Pilih tipe invoice yang ingin dibuat untuk shipping order ini:</p>

                        <div class="space-y-3">
                            <label
                                class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="invoice_type" value="main" v-model="selectedInvoiceType"
                                    class="mr-3" />
                                <div>
                                    <div class="font-medium text-gray-900">Main Invoice</div>
                                    <div class="text-sm text-gray-600">Invoice utama untuk tagihan customer</div>
                                </div>
                            </label>

                            <label
                                class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input type="radio" name="invoice_type" value="reimbursement"
                                    v-model="selectedInvoiceType" class="mr-3" />
                                <div>
                                    <div class="font-medium text-gray-900">Reimbursement Invoice</div>
                                    <div class="text-sm text-gray-600">Invoice untuk penggantian biaya pihak ketiga
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button @click="closeInvoiceCreateModal"
                            class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
                            Batal
                        </button>
                        <button @click="createInvoice" :disabled="!selectedInvoiceType"
                            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            Lanjutkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { router, Link } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';
import { FileText, Check, X, ArrowLeft } from 'lucide-vue-next';

const props = defineProps({
    salesOrder: Object,
});

const showRejectModal = ref(false);
const rejectionReason = ref('');
const showApprovalModal = ref(false);
const debugInfo = ref(false);
const showInvoiceCreateModal = ref(false);
const selectedInvoiceType = ref('');

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
        released: 'Dirilis',
        approved: 'Disetujui',
        rejected: 'Ditolak'
    };
    return labels[status] || status;
};

const getStatusColor = (status) => {
    const colors = {
        released: 'bg-purple-100 text-purple-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

const showApprovalDialog = () => {
    router.get(route('admin-keuangan.sales-orders.show', props.salesOrder.id), {}, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
            if (props.salesOrder.status !== 'released') {
                debugInfo.value = true;
                showApprovalModal.value = true;
                return;
            }

            debugInfo.value = false;
            showApprovalModal.value = true;
        },
        onError: () => {
            alert('Gagal memuat data terbaru. Silakan refresh halaman.');
        }
    });
};

const closeApprovalDialog = () => {
    showApprovalModal.value = false;
    debugInfo.value = false;
};

const approveSalesOrder = () => {
    router.post(route('admin-keuangan.sales-orders.approve', props.salesOrder.id), {}, {
        onSuccess: (response) => {
            showApprovalModal.value = false;
            debugInfo.value = false;
            router.get(route('admin-keuangan.sales-orders.show', props.salesOrder.id), {}, {
                preserveState: false,
                replace: true,
            });
        },
        onError: (errors) => {
            let errorMessage = 'Terjadi kesalahan saat menyetujui shipping order:\n\n';

            if (errors.error) {
                errorMessage += `Error: ${errors.error}\n`;
            }

            errorMessage += `\nInformasi Debug:`;
            errorMessage += `\n- Status saat ini: ${props.salesOrder.status}`;
            errorMessage += `\n- Tanggal rilis: ${props.salesOrder.released_at || 'Tidak ada'}`;
            errorMessage += `\n- Dirilis oleh: ${props.salesOrder.released_by?.name || 'Tidak ada'}`;

            if (props.salesOrder.status !== 'released') {
                errorMessage += `\n\nSaran: Pastikan CS sudah merilis shipping order ini terlebih dahulu.`;
            }

            alert(errorMessage);
            debugInfo.value = true;
        }
    });
};

const rejectSalesOrder = () => {
    if (!rejectionReason.value.trim()) {
        alert('Alasan penolakan harus diisi');
        return;
    }

    router.post(route('admin-keuangan.sales-orders.reject', props.salesOrder.id), {
        rejection_reason: rejectionReason.value
    }, {
        onSuccess: () => {
            showRejectModal.value = false;
            rejectionReason.value = '';
            router.get(route('admin-keuangan.sales-orders.show', props.salesOrder.id), {}, {
                preserveState: false,
                replace: true,
            });
        },
        onError: (errors) => {
            alert('Terjadi kesalahan: ' + Object.values(errors).join(', '));
        }
    });
};

const forceRefresh = () => {
    router.post(route('admin-keuangan.sales-orders.force-refresh', props.salesOrder.id), {}, {
        onSuccess: () => {
            router.get(route('admin-keuangan.sales-orders.show', props.salesOrder.id), {}, {
                preserveState: false,
                replace: true,
            });
        },
        onError: (errors) => {
            console.error('Force refresh failed:', errors);
            alert('Gagal melakukan refresh. Silakan coba lagi.');
        }
    });
};

// Invoice related functions
const getInvoiceStatusLabel = (status) => {
    const labels = {
        draft: 'Draft',
        sent: 'Terkirim',
        paid: 'Lunas',
        overdue: 'Jatuh Tempo'
    };
    return labels[status] || status;
};

const getInvoiceStatusColor = (status) => {
    const colors = {
        draft: 'bg-gray-100 text-gray-800',
        sent: 'bg-blue-100 text-blue-800',
        paid: 'bg-green-100 text-green-800',
        overdue: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
};

const closeInvoiceCreateModal = () => {
    showInvoiceCreateModal.value = false;
    selectedInvoiceType.value = '';
};

const createInvoice = () => {
    if (!selectedInvoiceType.value) {
        alert('Pilih tipe invoice terlebih dahulu');
        return;
    }

    router.get(route('admin-keuangan.invoices.create'), {
        sales_order_id: props.salesOrder.id,
        invoice_type: selectedInvoiceType.value
    });
};

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

.divide-sage-200> :not([hidden])~ :not([hidden]) {
    border-color: #d4ddd0;
}

.hover\:bg-sage-25:hover {
    background-color: #f8faf7;
}

.hover\:bg-sage-700:hover {
    background-color: #7ba169;
}
</style>

