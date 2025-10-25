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
                    <Link :href="route('admin-keuangan.invoices.index')"
                        class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
                            <select v-model="form.sales_order_id" @change="loadSalesOrderData"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                required>
                                <option value="">Pilih Sales Order</option>
                                <option v-for="order in salesOrders" :key="order.id" :value="order.id">
                                    {{ order.order_number }} - {{ order.customer || order.customer_name || 'No Customer'
                                    }} ({{ order.status?.toUpperCase() || 'APPROVED' }})
                                </option>
                            </select>
                            <div v-if="errors.sales_order_id" class="text-red-500 text-sm mt-1">
                                {{ errors.sales_order_id }}
                            </div>
                            <!-- Auto-load notification -->
                            <div v-if="form.sales_order_id"
                                class="mt-2 p-2 bg-green-50 border border-green-200 rounded-md">
                                <p class="text-xs text-green-700">
                                    ✓ Data otomatis di-load dari Sales Order:
                                    {{ mainItems.length }} item utama,
                                    {{ reimbursementItems.length }} reimbursement,
                                    {{ operationalCosts.length }} biaya operational
                                </p>
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
                            <input type="date" v-model="form.invoice_date"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                required />
                            <div v-if="errors.invoice_date" class="text-red-500 text-sm mt-1">
                                {{ errors.invoice_date }}
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Term (Hari)</label>
                            <input type="number" v-model="form.term_days" min="1"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                required />
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
                            <input type="text" v-model="form.shipper" :readonly="form.sales_order_id" :class="[
                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                            ]" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Consignee</label>
                            <input type="text" v-model="form.consignee" :readonly="form.sales_order_id" :class="[
                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                            ]" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">AWB/BL No.</label>
                            <input type="text" v-model="form.awb_bl_no" :readonly="form.sales_order_id" :class="[
                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                            ]" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">MAWB/OBL No.</label>
                            <input type="text" v-model="form.mawb_obl_no"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Vessel</label>
                            <input type="text" v-model="form.vessel" :readonly="form.sales_order_id" :class="[
                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                            ]" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Flight/VOY</label>
                            <input type="text" v-model="form.flight_voy"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">POL/POD</label>
                            <input type="text" v-model="form.pol_pod" :readonly="form.sales_order_id" :class="[
                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                            ]" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Origin</label>
                            <input type="text" v-model="form.origin" :readonly="form.sales_order_id" :class="[
                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                            ]" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                            <input type="text" v-model="form.destination" :readonly="form.sales_order_id" :class="[
                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                            ]" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">ETD</label>
                            <input type="date" v-model="form.etd" :readonly="form.sales_order_id" :class="[
                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                            ]" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">ETA</label>
                            <input type="date" v-model="form.eta" :readonly="form.sales_order_id" :class="[
                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                            ]" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Gross Weight (KG)</label>
                            <input type="number" v-model="form.gross_weight" step="0.0001"
                                :readonly="form.sales_order_id" :class="[
                                    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                    form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                                ]" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Net Weight (KG)</label>
                            <input type="number" v-model="form.net_weight" step="0.0001" :readonly="form.sales_order_id"
                                :class="[
                                    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                    form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                                ]" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Volume</label>
                            <input type="text" v-model="form.volume" :readonly="form.sales_order_id" :class="[
                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                            ]" placeholder="e.g., 10.5 M³" />
                        </div>
                        <div class="grid grid-cols-2 gap-3">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">No of Packages</label>
                                <input type="number" v-model="form.no_of_packages" min="0"
                                    :readonly="form.sales_order_id" :class="[
                                        'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                        form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                                    ]" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Package Unit</label>
                                <select v-model="form.package_unit" :disabled="form.sales_order_id" :class="[
                                    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                    form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                                ]">
                                    <option value="">Select Unit</option>
                                    <option v-for="unit in packageUnits" :key="unit.code" :value="unit.code">
                                        {{ unit.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">20'/40'/45'</label>
                            <input type="text" v-model="form.container_size" :readonly="form.sales_order_id" :class="[
                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                            ]" placeholder="e.g., 20GP, 40GP, 45GP" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Container No.</label>
                            <input type="text" v-model="form.container_no" :readonly="form.sales_order_id" :class="[
                                'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500',
                                form.sales_order_id ? 'bg-gray-100 text-gray-600' : ''
                            ]" placeholder="e.g., MSKU2934199" />
                        </div>
                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                            <textarea v-model="form.remarks" rows="3"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"></textarea>
                        </div>
                    </div>
                </div>

                <!-- Down Payment Section -->
                <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
                    <h3 class="text-lg font-semibold text-sage-800 mb-4">Down Payment (DP)</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Jumlah DP</label>
                            <input type="number" v-model="form.down_payment_amount" step="0.01" min="0"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                placeholder="0.00" />
                            <div v-if="errors.down_payment_amount" class="text-red-500 text-sm mt-1">
                                {{ errors.down_payment_amount }}
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Tanggal DP</label>
                            <input type="date" v-model="form.down_payment_date"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                            <div v-if="errors.down_payment_date" class="text-red-500 text-sm mt-1">
                                {{ errors.down_payment_date }}
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Catatan DP</label>
                            <textarea v-model="form.down_payment_notes" rows="2"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                placeholder="Catatan terkait down payment..."></textarea>
                            <div v-if="errors.down_payment_notes" class="text-red-500 text-sm mt-1">
                                {{ errors.down_payment_notes }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Invoice Items -->
                <div class="space-y-6">
                    <!-- Main Invoice Items (Table Style) -->
                    <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-sage-800">Item Invoice Utama</h3>
                            <div class="flex space-x-2">
                                <!-- Button Load dari SO -->
                                <button v-if="form.sales_order_id" type="button" @click="reloadFromSalesOrder"
                                    class="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Load dari SO
                                </button>
                                <button type="button" @click="addItem"
                                    class="inline-flex items-center px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Tambah Item
                                </button>
                            </div>
                        </div>

                        <div v-if="mainItems.length === 0"
                            class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                            <div class="flex flex-col items-center">
                                <svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p>Belum ada item invoice utama</p>
                                <p class="text-sm">Klik tombol "Tambah Item" untuk menambah item</p>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div v-for="(item, index) in mainItems" :key="'main-' + index"
                                class="border border-gray-200 rounded-lg p-4">
                                <div class="flex items-center justify-between mb-4">
                                    <h4 class="font-medium text-gray-900">Item {{ index + 1 }}</h4>
                                    <button type="button" @click="removeMainItem(index)"
                                        class="text-red-600 hover:text-red-800">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
                                        <input type="text" v-model="item.description"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                            required />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Qty</label>
                                        <input type="number" v-model="item.quantity" @input="calculateMainAmount(index)"
                                            step="0.01" min="0.01"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                            required />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                                        <input type="text" v-model="item.unit"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                            required />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Rate</label>
                                        <input type="text" v-model="item.rate"
                                            @input="formatMainItemRate(item, index, $event)"
                                            placeholder="0 (contoh: 2.500 atau 2500)"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                            required />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                                        <input type="text" :value="formatCurrency(item.amount || 0)"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
                                            readonly />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Bottom Add Button for Main Items -->
                        <div v-if="mainItems.length > 0" class="flex justify-center mt-6 pt-4 border-t border-gray-200">
                            <div class="flex space-x-2">
                                <button v-if="form.sales_order_id" type="button" @click="reloadFromSalesOrder"
                                    class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Load dari SO
                                </button>
                                <button type="button" @click="addItem"
                                    class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Tambah Item Lagi
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Reimbursement Invoice Items (Voucher Style) -->
                    <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-sage-800">Item Reimbursement</h3>
                            <button type="button" @click="addReimbursementItem"
                                class="inline-flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Tambah Item Reimbursement
                            </button>
                        </div>

                        <div v-if="reimbursementItems.length === 0"
                            class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                            <div class="flex flex-col items-center">
                                <svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p>Belum ada item reimbursement</p>
                                <p class="text-sm">Klik tombol "Tambah Item Reimbursement" untuk menambah item</p>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div v-for="(item, index) in reimbursementItems" :key="'reimb-' + index"
                                class="border border-gray-200 rounded-lg p-4">
                                <div class="flex justify-between items-center mb-3">
                                    <h4 class="font-medium text-gray-700">Reimbursement Item #{{ index + 1 }}</h4>
                                    <button type="button" @click="removeReimbursementItem(index)"
                                        class="text-red-600 hover:text-red-800">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Item
                                            Number/Ref</label>
                                        <input v-model="item.item_ref" type="text"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                            placeholder="e.g., REIMB-001" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                                        <select v-model="item.currency"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500">
                                            <option value="IDR">IDR</option>
                                            <option value="USD">USD</option>
                                            <option value="EUR">EUR</option>
                                            <option value="SGD">SGD</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="mt-3">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                    <textarea v-model="item.description" rows="2"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                                        placeholder="e.g., Biaya trucking dari gudang ke pelabuhan" required></textarea>
                                </div>

                                <!-- Vendor Selection -->
                                <div class="mt-3">
                                    <label class="block text-sm font-medium text-gray-700 mb-1">
                                        Vendor / Penerima *
                                    </label>
                                    <select v-model="item.vendor_id"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                        <option value="">-- Internal (Divisi Operational) --</option>
                                        <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">
                                            {{ vendor.nama_vendor }}
                                        </option>
                                    </select>
                                    <p class="text-xs text-gray-600 mt-1">
                                        Pilih vendor jika biaya ini akan dibayar ke vendor eksternal, kosongkan jika internal
                                    </p>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                                        <input v-model="item.quantity" @input="calculateReimbursementAmount(index)"
                                            type="number" step="0.01" min="0.01"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                            placeholder="1" required />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Unit Rate</label>
                                        <input v-model="item.rate" @input="formatReimbursementRate(item, index, $event)"
                                            type="text" placeholder="0 (contoh: 500.000 atau 500000)"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                            required />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                                        <input type="text"
                                            :value="formatCurrency(item.amount || 0, item.currency || 'IDR')"
                                            class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600"
                                            readonly />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Bottom Add Button for Reimbursement Items -->
                        <div v-if="reimbursementItems.length > 0"
                            class="flex justify-center mt-6 pt-4 border-t border-orange-200">
                            <button type="button" @click="addReimbursementItem"
                                class="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Tambah Item Reimbursement Lagi
                            </button>
                        </div>
                    </div>

                    <!-- Operational Costs (Internal Only) -->
                    <div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 border-l-4 border-l-red-500">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <h3 class="text-lg font-semibold text-red-800">Biaya Operasional (Internal)</h3>
                                <p class="text-sm text-red-600">Biaya ini tidak akan ditampilkan di invoice customer dan
                                    akan mengurangi profit</p>
                                <!-- Auto-populated info -->
                                <div v-if="operationalCosts.some(cost => cost.auto_generated)"
                                    class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div class="flex items-start space-x-2">
                                        <svg class="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none"
                                            stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div class="text-xs text-blue-800">
                                            <strong>Info:</strong> Biaya dengan label <span
                                                class="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Auto
                                                dari SO</span>
                                            telah dimuat otomatis dari Sales Order. Anda bisa mengedit nilai atau
                                            deskripsi sesuai kebutuhan.
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" @click="addOperationalCost"
                                class="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Tambah Biaya Operasional
                            </button>
                        </div>

                        <div v-if="operationalCosts.length === 0"
                            class="text-gray-500 text-center py-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50">
                            <div class="flex flex-col items-center">
                                <svg class="w-12 h-12 text-red-300 mb-2" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p class="text-red-600">Belum ada biaya operasional</p>
                                <p class="text-sm text-red-500">Contoh: Kirim dokumen, biaya kawalan, parkir, dll</p>
                            </div>
                        </div>

                        <div class="space-y-4">
                            <div v-for="(cost, index) in operationalCosts" :key="'opex-' + index" :class="[
                                'border rounded-lg p-4',
                                cost.auto_generated
                                    ? 'border-blue-200 bg-blue-50'
                                    : 'border-red-200 bg-red-50'
                            ]">
                                <div class="flex items-center justify-between mb-4">
                                    <div class="flex items-center space-x-2">
                                        <h4 :class="[
                                            'font-medium',
                                            cost.auto_generated ? 'text-blue-800' : 'text-red-800'
                                        ]">
                                            Biaya Operasional {{ index + 1 }}
                                        </h4>
                                        <!-- Auto-generated indicator -->
                                        <span v-if="cost.auto_generated"
                                            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Auto dari SO
                                        </span>
                                        <!-- Manual input indicator -->
                                        <span v-else
                                            class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor"
                                                viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Manual
                                        </span>
                                    </div>
                                    <button type="button" @click="removeOperationalCost(index)" :class="[
                                        'hover:text-red-800',
                                        cost.auto_generated ? 'text-blue-600' : 'text-red-600'
                                    ]">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>

                                <!-- Category Selection -->
                                <div class="mb-4">
                                    <label :class="[
                                        'block text-sm font-medium mb-2',
                                        cost.auto_generated ? 'text-blue-700' : 'text-red-700'
                                    ]">
                                        Kategori Biaya *
                                    </label>
                                    <select v-model="cost.category_id" @change="onCategoryChange(index)" :class="[
                                        'w-full px-3 py-2 border rounded-lg focus:ring-2',
                                        cost.auto_generated
                                            ? 'border-blue-300 focus:ring-blue-500 focus:border-blue-500'
                                            : 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                    ]" required>
                                        <option value="">-- Pilih Kategori Biaya --</option>
                                        <option v-for="category in operationalCostCategories" :key="category.id"
                                            :value="category.id">
                                            {{ category.name }}
                                        </option>
                                    </select>
                                </div>

                                <!-- Vendor Selection -->
                                <div class="mb-4">
                                    <label :class="[
                                        'block text-sm font-medium mb-2',
                                        cost.auto_generated ? 'text-blue-700' : 'text-red-700'
                                    ]">
                                        Vendor / Penerima *
                                    </label>
                                    <select v-model="cost.vendor_id" :class="[
                                        'w-full px-3 py-2 border rounded-lg focus:ring-2',
                                        cost.auto_generated
                                            ? 'border-blue-300 focus:ring-blue-500 focus:border-blue-500'
                                            : 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                    ]" required>
                                        <option value="">-- Internal (Divisi Operational) --</option>
                                        <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">
                                            {{ vendor.nama_vendor }}
                                        </option>
                                    </select>
                                    <p :class="[
                                        'text-xs mt-1',
                                        cost.auto_generated ? 'text-blue-600' : 'text-red-600'
                                    ]">
                                        Pilih vendor jika biaya ini akan dibayar ke vendor eksternal, kosongkan jika internal
                                    </p>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-medium text-red-700 mb-2">Deskripsi</label>
                                        <input type="text" v-model="cost.description"
                                            class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            placeholder="e.g., Kirim dokumen, biaya kawalan, konsumsi" required />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-red-700 mb-2">Biaya</label>
                                        <input type="text" v-model="cost.rate"
                                            @input="formatOperationalRate(cost, index, $event)"
                                            placeholder="0 (contoh: 50.000 atau 50000)"
                                            class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                                            required />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-red-700 mb-2">Total</label>
                                        <input type="text" :value="formatCurrency(cost.amount || 0)"
                                            class="w-full px-3 py-2 border border-red-300 rounded-lg bg-red-100"
                                            readonly />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Operational Costs Summary -->
                        <div v-if="operationalCosts.length > 0" class="mt-4 pt-4 border-t border-red-200">
                            <div class="flex justify-between items-center text-sm">
                                <span class="font-medium text-red-700">Total Biaya Operasional:</span>
                                <span class="font-bold text-red-800">{{ formatCurrency(calculateOperationalTotal())
                                    }}</span>
                            </div>
                        </div>

                        <!-- Bottom Add Button for Operational Costs -->
                        <div v-if="operationalCosts.length > 0"
                            class="flex justify-center mt-6 pt-4 border-t border-red-200">
                            <button type="button" @click="addOperationalCost"
                                class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Tambah Biaya Operasional Lagi
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Profit Summary (if operational costs exist) -->
                <div v-if="operationalCosts.length > 0"
                    class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-blue-200">
                    <h3 class="text-lg font-semibold text-blue-800 mb-4">Ringkasan Profit</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
                        <div class="bg-white rounded-lg p-4 border border-blue-200">
                            <div class="text-blue-600 font-medium">Gross Revenue</div>
                            <div class="text-xl font-bold text-blue-800">{{ formatCurrency(calculateGrossRevenue()) }}
                            </div>
                            <div class="text-xs text-blue-500">Billable items only</div>
                        </div>
                        <div class="bg-white rounded-lg p-4 border border-orange-200">
                            <div class="text-orange-600 font-medium">Reimbursement</div>
                            <div class="text-xl font-bold text-orange-800">{{
                                formatCurrency(calculateReimbursementTotal()) }}</div>
                            <div class="text-xs text-orange-500">Cost-neutral</div>
                        </div>
                        <div class="bg-white rounded-lg p-4 border border-red-200">
                            <div class="text-red-600 font-medium">Operational Costs</div>
                            <div class="text-xl font-bold text-red-800">{{ formatCurrency(calculateOperationalTotal())
                                }}</div>
                            <div class="text-xs text-red-500">Internal costs only</div>
                        </div>
                        <div class="bg-white rounded-lg p-4 border border-green-200">
                            <div class="text-green-600 font-medium">Net Profit</div>
                            <div class="text-xl font-bold text-green-800">{{ formatCurrency(calculateNetProfit()) }}
                            </div>
                            <div class="text-xs text-green-500">Gross - Operational</div>
                        </div>
                        <div class="bg-white rounded-lg p-4 border border-purple-200">
                            <div class="text-purple-600 font-medium">Profit Margin</div>
                            <div class="text-xl font-bold text-purple-800">{{ calculateProfitMargin() }}%</div>
                            <div class="text-xs text-purple-500">Net profit percentage</div>
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
                            <Link :href="route('admin-keuangan.invoices.index')"
                                class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Batal
                            </Link>
                            <button type="submit" :disabled="form.processing"
                                class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50">
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
import { ref, reactive, watch } from 'vue';
import { useForm, Link } from '@inertiajs/vue3';
import AdminKeuanganLayout from '@/Layouts/AdminKeuanganLayout.vue';
import OperationalCostsSection from '@/Components/OperationalCostsSection.vue';

const props = defineProps({
    salesOrders: Array,
    errors: Object,
    preselectedSalesOrder: [String, Number],
    preselectedInvoiceType: String,
    preselectedVendorBreakdown: Array,
    operationalCostCategories: {
        type: Array,
        default: () => []
    },
    packageUnits: {
        type: Array,
        default: () => []
    },
});

const route = window.route || function (name, params) {
    const routes = {
        'admin-keuangan.invoices.index': '/admin-keuangan/invoices',
        'admin-keuangan.invoices.store': '/admin-keuangan/invoices',
    };
    return routes[name] || '#';
};

// Separate reactive arrays for main, reimbursement items, and operational costs
const mainItems = ref([]);
const reimbursementItems = ref([]);
const operationalCosts = ref([]);

const resolveOperationalCategory = (value) => {
    if (value === undefined || value === null) {
        return null;
    }

    const valueStr = String(value).trim();
    if (valueStr === '') {
        return null;
    }

    const lowerValue = valueStr.toLowerCase();
    const normalizedValue = lowerValue.replace(/[^a-z0-9]/g, '');

    return props.operationalCostCategories.find((category) => {
        if (!category) {
            return false;
        }

        const categoryId = String(category.id ?? '').trim().toLowerCase();
        const categoryIdNormalized = categoryId.replace(/[^a-z0-9]/g, '');
        if (categoryId !== '' && (categoryId === lowerValue || categoryIdNormalized === normalizedValue)) {
            return true;
        }

        const categoryName = (category.name || '').trim().toLowerCase();
        const categoryNameNormalized = categoryName.replace(/[^a-z0-9]/g, '');
        return categoryName === lowerValue || categoryNameNormalized === normalizedValue;
    }) || null;
};

const deriveOperationalCategoryInfo = (cost) => {
    const candidates = [
        cost?.category_id,
        cost?.category,
        cost?.category_name,
        cost?.category_label,
        cost?.category_source,
    ].filter((value) => value !== undefined && value !== null && value !== '');

    for (const candidate of candidates) {
        const resolved = resolveOperationalCategory(candidate);
        if (resolved) {
            return { id: String(resolved.id), name: resolved.name, source: candidate };
        }
    }

    const fallback = candidates.find((value) => typeof value === 'string');
    const fallbackValue = fallback || '';
    return { id: '', name: fallbackValue, source: fallbackValue };
};

const syncOperationalCostCategories = () => {
    if (!props.operationalCostCategories || props.operationalCostCategories.length === 0) {
        return;
    }

    operationalCosts.value.forEach((cost) => {
        const sourceValue = cost.category_id ?? cost.category_source ?? cost.category_name ?? cost.category;
        const resolved = resolveOperationalCategory(sourceValue);

        if (resolved) {
            cost.category_id = String(resolved.id);
            cost.category_name = resolved.name;
            cost.category_source = resolved.name;
            cost.category = resolved.name;
        }
    });
};

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
    net_weight: '',
    volume: '',
    no_of_packages: '',
    package_unit: 'BAG',
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
    down_payment_amount: '',
    down_payment_date: '',
    down_payment_notes: '',
    items: []
});

const loadSalesOrderData = () => {
    const selectedOrder = props.salesOrders.find(order => order.id == form.sales_order_id);
    if (selectedOrder) {
        console.log('Loading Sales Order data:', {
            id: selectedOrder.id,
            hasVendorBreakdown: selectedOrder.vendor_breakdown ? selectedOrder.vendor_breakdown.length : 0,
            hasReimbursementItems: selectedOrder.reimbursement_items ? selectedOrder.reimbursement_items.length : 0,
            hasOtherCosts: selectedOrder.other_costs ? selectedOrder.other_costs.length : 0,
            reimbursementData: selectedOrder.reimbursement_items,
            otherCostsData: selectedOrder.other_costs,
            fullOrderData: selectedOrder
        });
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

        // Dates - format to YYYY-MM-DD for HTML date input
        if (selectedOrder.eta) {
            form.eta = formatDateForInput(selectedOrder.eta);
        }
        if (selectedOrder.etd) {
            form.etd = formatDateForInput(selectedOrder.etd);
        }

        // Cargo details - auto-populate from Sales Order
        form.gross_weight = selectedOrder.gross_weight || selectedOrder.net_weight || '';
        form.net_weight = selectedOrder.net_weight || '';
        form.volume = selectedOrder.measurement || '';
        form.no_of_packages = selectedOrder.qty || '';
        form.package_unit = selectedOrder.package_unit || 'BAG';
        form.container_size = selectedOrder.shipment_type || '';

        // Container info
        if (selectedOrder.container_no) {
            form.container_no = Array.isArray(selectedOrder.container_no) ?
                selectedOrder.container_no.join(', ') :
                selectedOrder.container_no;
        }

        // Remarks - keep empty, don't auto-populate from sales order
        // form.remarks remains empty for manual input

        // Auto-populate items from sales order data
        populateItemsFromSalesOrder(selectedOrder);
    }
};

// Function to auto-populate items from sales order
const populateItemsFromSalesOrder = (salesOrder) => {
    if (!salesOrder) return;

    // Clear existing items
    mainItems.value = [];
    reimbursementItems.value = [];
    operationalCosts.value = [];

    // 1. Populate main items from vendor_breakdown
    if (salesOrder.vendor_breakdown && Array.isArray(salesOrder.vendor_breakdown)) {
        salesOrder.vendor_breakdown.forEach((vendor, index) => {
            if (vendor.selling_amount && vendor.selling_amount > 0) {
                // Add to main items with selling amount as rate
                mainItems.value.push({
                    description: vendor.description || `Service ${index + 1}`,
                    quantity: 1,
                    unit: 'SET',
                    rate: normalizeNumber(vendor.selling_amount),
                    currency: 'IDR',
                    amount: normalizeNumber(vendor.selling_amount),
                    item_ref: `vendor_${vendor.vendor_id || index}`,
                    type: 'main',
                    item_type: 'billable'
                });
            }
        });
    }

    // 2. Populate reimbursement items from reimbursementItems relationship
    if (salesOrder.reimbursement_items && Array.isArray(salesOrder.reimbursement_items)) {
        console.log('Populating reimbursement items from relationship:', salesOrder.reimbursement_items);
        salesOrder.reimbursement_items.forEach((item, index) => {
            if (item.amount && item.amount > 0) {
                reimbursementItems.value.push({
                    description: item.description || `Reimbursement ${index + 1}`,
                    quantity: 1,
                    unit: 'SET',
                    rate: normalizeNumber(item.amount),
                    currency: 'IDR',
                    amount: normalizeNumber(item.amount),
                    item_ref: `reimb_${item.id || index}`,
                    type: 'reimbursement',
                    item_type: 'reimbursement'
                });
            }
        });
    }

    // 3. Populate operational costs from other_costs (input CS)
    if (salesOrder.other_costs && Array.isArray(salesOrder.other_costs)) {
        console.log('Populating operational costs from other_costs:', salesOrder.other_costs);
        salesOrder.other_costs.forEach((cost, index) => {
            const amount = normalizeNumber(cost.amount);
            if (amount > 0) {
                const categoryInfo = deriveOperationalCategoryInfo(cost);
                operationalCosts.value.push({
                    description: cost.description || `Operational Cost ${index + 1}`,
                    quantity: 1,
                    unit: 'pcs',
                    rate: amount,
                    currency: cost.currency || 'IDR',
                    amount: amount,
                    category_id: categoryInfo.id,
                    category_name: categoryInfo.name,
                    category: categoryInfo.name,
                    category_source: categoryInfo.source,
                    item_type: 'operational_cost',
                    include_in_customer_invoice: false,
                    is_hidden_from_customer: true,
                    auto_generated: true,
                    source: 'sales_order_other_costs',
                    item_ref: `other_cost_${cost.id || index}`
                });
            }
        });
    }

    syncOperationalCostCategories();

    // If no main items populated, add one empty item
    if (mainItems.value.length === 0) {
        addItem();
    }

    // Log the final populated data
    console.log('Data populated successfully:', {
        mainItemsCount: mainItems.value.length,
        reimbursementItemsCount: reimbursementItems.value.length,
        operationalCostsCount: operationalCosts.value.length,
        mainItems: mainItems.value,
        reimbursementItems: reimbursementItems.value,
        operationalCosts: operationalCosts.value
    });
};

// Function to reload data from Sales Order
const reloadFromSalesOrder = () => {
    const selectedOrder = props.salesOrders.find(order => order.id == form.sales_order_id);
    if (selectedOrder) {
        const hasData = (selectedOrder.vendor_breakdown && selectedOrder.vendor_breakdown.length > 0) ||
            (selectedOrder.reimbursement_items && selectedOrder.reimbursement_items.length > 0) ||
            (selectedOrder.other_costs && selectedOrder.other_costs.length > 0);

        if (hasData) {
            if (confirm('Ini akan mengganti semua item yang sudah ada dengan data dari Sales Order. Lanjutkan?')) {
                populateItemsFromSalesOrder(selectedOrder);
            }
        } else {
            alert('Sales Order ini tidak memiliki data vendor breakdown, reimbursement, atau biaya operational untuk di-load.');
        }
    }
};

watch(
    () => props.operationalCostCategories,
    () => {
        syncOperationalCostCategories();
    },
    { immediate: true, deep: false }
);

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
        type: 'main',
        item_type: 'billable'
    });
};

const removeMainItem = (index) => {
    mainItems.value.splice(index, 1);
};

const calculateMainAmount = (index) => {
    const item = mainItems.value[index];
    item.amount = normalizeNumber(item.quantity || 0) * normalizeNumber(item.rate || 0);
};

// Helper function to normalize Indonesian number format for calculation
const normalizeNumber = (value) => {
    if (!value) return 0;

    let normalized = value.toString().trim();

    // Handle Indonesian format
    if (normalized.includes('.') && normalized.includes(',')) {
        // Format: 2.500,50 (dot = thousand separator, comma = decimal)
        normalized = normalized.replace(/\./g, '').replace(',', '.');
    } else if (normalized.includes('.') && !normalized.includes(',')) {
        // Could be: 2.500 (thousand) or 2500.50 (decimal)
        const parts = normalized.split('.');
        if (parts.length === 2) {
            const decimalPart = parts[1];
            const isLikelyDecimal = decimalPart.length <= 2 && parseInt(decimalPart, 10) < 100;

            if (!isLikelyDecimal) {
                // Thousand separator (e.g. 2.500 -> 2500)
                normalized = normalized.replace(/\./g, '');
            }
            // Otherwise keep as decimal: 25.50 or 2500.50
        } else {
            // Multiple dots, treat as thousand separators: 1.000.500
            normalized = normalized.replace(/\./g, '');
        }
    } else if (normalized.includes(',')) {
        // Format: 2500,50 (comma as decimal)
        normalized = normalized.replace(',', '.');
    }

    return parseFloat(normalized) || 0;
};

// Format main item rate input to handle Indonesian number format
const formatMainItemRate = (item, index, event) => {
    let value = event.target.value;

    // Remove any non-numeric characters except dots and commas
    value = value.replace(/[^\d.,]/g, '');

    // Store the raw input for backend processing
    item.rate = value;

    // Recalculate amount
    calculateMainAmount(index);
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
        item_ref: `reimb_${Date.now()}`,
        type: 'reimbursement',
        item_type: 'reimbursement',
        vendor_id: ''
    });
};

const removeReimbursementItem = (index) => {
    reimbursementItems.value.splice(index, 1);
};

const calculateReimbursementAmount = (index) => {
    const item = reimbursementItems.value[index];
    item.amount = normalizeNumber(item.quantity || 0) * normalizeNumber(item.rate || 0);
};

// Format reimbursement rate input to handle Indonesian number format
const formatReimbursementRate = (item, index, event) => {
    let value = event.target.value;

    // Remove any non-numeric characters except dots and commas
    value = value.replace(/[^\d.,]/g, '');

    // Store the raw input for backend processing
    item.rate = value;

    // Recalculate amount
    calculateReimbursementAmount(index);
};

// Operational costs functions
const addOperationalCost = () => {
    operationalCosts.value.push({
        description: '',
        quantity: 1.0, // Use decimal 1.0 to match validation
        unit: 'pcs',
        rate: 0,
        currency: 'IDR',
        amount: 0,
    item_type: 'operational_cost',
    include_in_customer_invoice: false,
    is_hidden_from_customer: true,
    category_id: '',
    category_name: '',
    category_source: '',
    category: '',
    auto_generated: false,
    source: 'manual_input',
    item_ref: `manual_${Date.now()}`,
    vendor_id: ''
  });
};

const removeOperationalCost = (index) => {
    operationalCosts.value.splice(index, 1);
};

// NEW: Template application method
// Format currency helper (removed duplicate - using the one below)

// Category change handler
const onCategoryChange = (index) => {
    const cost = operationalCosts.value[index];

    const selectedCategory = resolveOperationalCategory(cost.category_id);

    if (selectedCategory) {
        cost.category_id = String(selectedCategory.id);
        cost.category_name = selectedCategory.name;
        cost.category_source = selectedCategory.name;
        cost.category = selectedCategory.name;

        if (!cost.description) {
            cost.description = `Biaya ${selectedCategory.name.toLowerCase()}`;
        }
    } else {
        cost.category_name = typeof cost.category_id === 'string' ? cost.category_id : '';
        cost.category_source = cost.category_name;
        cost.category = cost.category_name;
    }
};

const calculateOperationalAmount = (index) => {
    const cost = operationalCosts.value[index];
    cost.quantity = 1.0; // Always 1.0 for operational costs (decimal to match validation)
    cost.amount = normalizeNumber(cost.rate || 0);
};

// Format operational rate input to handle Indonesian number format
const formatOperationalRate = (cost, index, event) => {
    let value = event.target.value;

    // Remove any non-numeric characters except dots and commas
    value = value.replace(/[^\d.,]/g, '');

    // Store the raw input for backend processing
    cost.rate = value;

    // Recalculate amount
    calculateOperationalAmount(index);
};

const calculateOperationalTotal = () => {
    return operationalCosts.value.reduce((total, cost) => {
        return total + normalizeNumber(cost.amount || 0);
    }, 0);
};

// Profit calculation methods
const calculateGrossRevenue = () => {
    // Only calculate revenue from main billable items (exclude reimbursement)
    const mainTotal = mainItems.value.reduce((total, item) => {
        return total + normalizeNumber(item.amount || 0);
    }, 0);

    // Reimbursement is cost-neutral, tidak dihitung sebagai revenue
    return mainTotal;
};

const calculateReimbursementTotal = () => {
    // Reimbursement items untuk informasi saja (cost-neutral)
    return reimbursementItems.value.reduce((total, item) => {
        return total + normalizeNumber(item.amount || 0);
    }, 0);
};

const calculateNetProfit = () => {
    return calculateGrossRevenue() - calculateOperationalTotal();
};

const calculateProfitMargin = () => {
    const grossRevenue = calculateGrossRevenue();
    if (grossRevenue <= 0) return '0.00';
    return ((calculateNetProfit() / grossRevenue) * 100).toFixed(2);
};

const calculateTotal = () => {
    const mainTotal = mainItems.value.reduce((total, item) => {
        return total + normalizeNumber(item.amount || 0);
    }, 0);

    const reimbursementTotal = reimbursementItems.value.reduce((total, item) => {
        return total + normalizeNumber(item.amount || 0);
    }, 0);

    return mainTotal + reimbursementTotal;
};

const formatCurrency = (amount, options = {}) => {
    const {
        style = 'decimal',
        currency = 'IDR',
        withCurrency = false
    } = options;

    if (withCurrency) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 0,
        }).format(amount || 0);
    } else {
        return new Intl.NumberFormat('id-ID').format(amount || 0);
    }
};

// Helper function to format date for HTML date input (YYYY-MM-DD)
const formatDateForInput = (dateString) => {
    if (!dateString) return '';

    try {
        // Handle different date formats
        const date = new Date(dateString);

        // Check if date is valid
        if (isNaN(date.getTime())) {
            return '';
        }

        // Format to YYYY-MM-DD
        return date.toISOString().split('T')[0];
    } catch (error) {
        console.warn('Error formatting date:', dateString, error);
        return '';
    }
};

const submit = () => {
    // Combine all items from arrays with proper item_ref and item_type
    const allItems = [
        ...mainItems.value.map(item => ({
            ...item,
            type: 'main',
            item_ref: item.item_ref || 'main',
            item_type: 'billable',
            include_in_customer_invoice: true,
            is_hidden_from_customer: false
        })),
        ...reimbursementItems.value.map(item => ({
            ...item,
            type: 'reimbursement',
            item_ref: item.item_ref || 'reimbursement',
            item_type: 'reimbursement',
            include_in_customer_invoice: true,
            is_hidden_from_customer: false
        })),
        ...operationalCosts.value.map(cost => ({
            ...cost,
            type: 'operational',
            item_ref: 'operational_cost',
            item_type: 'operational_cost',
            include_in_customer_invoice: false,
            is_hidden_from_customer: true
        }))
    ];

    // Set the combined items to form
    form.items = allItems;

    console.log('DEBUG: Submitting invoice with items:', allItems);
    console.log('DEBUG: Form data:', form.data());

    // Determine the invoice type based on what items exist
    if (mainItems.value.length > 0 && reimbursementItems.value.length > 0) {
        form.invoice_type = 'combined';
    } else if (reimbursementItems.value.length > 0) {
        form.invoice_type = 'reimbursement';
    } else {
        form.invoice_type = 'main';
    }

    form.post(route('admin-keuangan.invoices.store'), {
        onSuccess: (page) => {
            console.log('Invoice created successfully:', page);
            // Let the backend handle redirect (it redirects to show page)
            // Don't override the backend redirect
        },
        onError: (errors) => {
            console.error('Invoice creation failed:', errors);
            console.error('Form data:', form.data());
            alert('Error creating invoice: ' + JSON.stringify(errors));
        },
        onFinish: () => {
            console.log('Invoice creation finished');
        }
    });
};

// Auto-load data if coming from Sales Order detail page
if (props.preselectedSalesOrder) {
    loadSalesOrderData();

    // Auto-populate will handle main items, only add reimbursement if needed
    if (props.preselectedInvoiceType === 'reimbursement' && reimbursementItems.value.length === 0) {
        addReimbursementItem();
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
