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
                                    <Edit class="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 class="text-2xl font-semibold text-gray-900">Edit Shipping Order: {{
                                        salesOrder.order_number }}</h1>
                                    <p class="mt-1 text-sm text-gray-600">Edit dokumen Shipping order untuk pelanggan
                                    </p>
                                </div>
                            </div>
                            <div class="mt-4 sm:mt-0 flex space-x-3">
                                <Link :href="route('admin-keuangan.sales-orders.show', salesOrder.id)"
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <Eye class="mr-2 h-4 w-4" />
                                Lihat Detail
                                </Link>
                                <Link :href="route('admin-keuangan.sales-orders.index')"
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                <ArrowLeft class="mr-2 h-4 w-4" />
                                Kembali
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form Section -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-medium text-gray-900">Form Edit Shipping Order</h3>
                        <p class="mt-1 text-sm text-gray-600">Perbarui informasi Shipping order dengan benar</p>
                    </div>

                    <div class="p-6">
                        <form @submit.prevent="submit" class="space-y-6">

                            <!-- Basic Information -->
                            <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                                <div @click="toggleSection('basic')"
                                    class="px-6 py-4 border-b border-gray-200 bg-gray-50 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-colors">
                                    <h3 class="text-lg font-medium text-gray-900">Informasi Dasar</h3>
                                    <ChevronDown :class="{ 'rotate-180': !sections.basic }"
                                        class="w-5 h-5 text-gray-600 transition-transform duration-200" />
                                </div>
                                <div v-show="sections.basic" class="p-6 space-y-4">
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">ORDER NUMB <span
                                                    class="text-red-500">*</span></label>
                                            <input v-model="form.order_number" type="text" required readonly
                                                placeholder="EWILOG2509001001"
                                                class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed" />
                                            <div v-if="form.errors.order_number" class="mt-2 text-sm text-red-600">{{
                                                form.errors.order_number }}</div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">REF NO</label>
                                            <input v-model="form.ref_no" type="text"
                                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <div v-if="form.errors.ref_no" class="mt-2 text-sm text-red-600">{{
                                                form.errors.ref_no }}</div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">DATE</label>
                                            <input v-model="form.so_date" type="date"
                                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <div v-if="form.errors.so_date" class="mt-2 text-sm text-red-600">{{
                                                form.errors.so_date }}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">CUSTOMER <span
                                                class="text-red-500">*</span></label>
                                        <input v-model="form.customer" type="text" required
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.customer" class="mt-2 text-sm text-red-600">{{
                                            form.errors.customer }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">SHIPPER</label>
                                        <input v-model="form.shipper" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.shipper" class="mt-2 text-sm text-red-600">{{
                                            form.errors.shipper }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Shipping Information -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('shipping')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Informasi Pengiriman</h3>
                                    <svg :class="{ 'rotate-180': !sections.shipping }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div v-show="sections.shipping" class="p-6 space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">BL/AWB</label>
                                        <input v-model="form.bl_awb" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.bl_awb" class="mt-2 text-sm text-red-600">{{
                                            form.errors.bl_awb }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">LINER</label>
                                        <input v-model="form.liner" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.liner" class="mt-2 text-sm text-red-600">{{
                                            form.errors.liner }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">VESSEL</label>
                                        <input v-model="form.vessel" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.vessel" class="mt-2 text-sm text-red-600">{{
                                            form.errors.vessel }}</div>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">ETA</label>
                                            <input v-model="form.eta" type="date"
                                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <div v-if="form.errors.eta" class="mt-2 text-sm text-red-600">{{
                                                form.errors.eta }}</div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">ETD</label>
                                            <input v-model="form.etd" type="date"
                                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <div v-if="form.errors.etd" class="mt-2 text-sm text-red-600">{{
                                                form.errors.etd }}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">AJU</label>
                                        <input v-model="form.aju" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.aju" class="mt-2 text-sm text-red-600">{{ form.errors.aju
                                            }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">SPPB DATE</label>
                                        <input v-model="form.sppb_date" type="date"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.sppb_date" class="mt-2 text-sm text-red-600">{{
                                            form.errors.sppb_date }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">SHIPMENT
                                            TYPE</label>
                                        <select v-model="form.shipment_type"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500">
                                            <option value="">Pilih Shipment Type</option>
                                            <option v-for="shipmentType in shipmentTypes" :key="shipmentType.id"
                                                :value="shipmentType.code">
                                                {{ shipmentType.name }}
                                            </option>
                                        </select>
                                        <div v-if="form.errors.shipment_type" class="mt-2 text-sm text-red-600">{{
                                            form.errors.shipment_type }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">POL</label>
                                        <input v-model="form.pol" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.pol" class="mt-2 text-sm text-red-600">{{ form.errors.pol
                                            }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">POD</label>
                                        <input v-model="form.pod" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.pod" class="mt-2 text-sm text-red-600">{{ form.errors.pod
                                            }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">GUDANG/UTC</label>
                                        <input v-model="form.gudang_utc" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.gudang_utc" class="mt-2 text-sm text-red-600">{{
                                            form.errors.gudang_utc }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">PARTY/LCL</label>
                                        <input v-model="form.party_lcl" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.party_lcl" class="mt-2 text-sm text-red-600">{{
                                            form.errors.party_lcl }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">PREPARED BY</label>
                                        <input v-model="form.prepared_by" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.prepared_by" class="mt-2 text-sm text-red-600">{{
                                            form.errors.prepared_by }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">EXCHANGE
                                            RATE</label>
                                        <input v-model="form.exchange_rate" type="number" step="0.0001"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.exchange_rate" class="mt-2 text-sm text-red-600">{{
                                            form.errors.exchange_rate }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Pricing Information -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('pricing')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Informasi Pricing</h3>
                                    <svg :class="{ 'rotate-180': !sections.pricing }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div v-show="sections.pricing" class="p-6 space-y-6">

                                    <!-- Vendor Breakdown (Buying + Selling) -->
                                    <div class="bg-gray-50 rounded-lg p-4">
                                        <div class="flex justify-between items-center mb-4">
                                            <h4 class="text-md font-semibold text-sage-800">Rincian Vendor (Buying &
                                                Selling)</h4>
                                            <button type="button" @click="addVendorItem"
                                                class="text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors">
                                                + Tambah Vendor
                                            </button>
                                        </div>
                                        <div v-for="(item, index) in form.vendor_breakdown" :key="index"
                                            class="border border-sage-200 rounded-lg p-4 mb-4 space-y-4">
                                            <!-- Row 1: Vendor Selection -->
                                            <div class="grid grid-cols-12 gap-3">
                                                <div class="col-span-11">
                                                    <label class="block text-xs font-medium text-sage-700 mb-1">Nama
                                                        Vendor</label>
                                                    <select v-model="item.vendor_id" @change="onVendorSelect(index)"
                                                        class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500">
                                                        <option value="">Pilih vendor...</option>
                                                        <option v-for="vendorOption in vendors" :key="vendorOption.id"
                                                            :value="vendorOption.id">
                                                            {{ vendorOption.nama_vendor }}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="col-span-1">
                                                    <label
                                                        class="block text-xs font-medium text-transparent mb-1">Del</label>
                                                    <button type="button" @click="removeVendorItem(index)"
                                                        class="w-full h-10 text-red-600 hover:text-red-900 hover:bg-red-100 rounded transition-colors">
                                                        ×
                                                    </button>
                                                </div>
                                            </div>

                                            <!-- Row 2: Service Description & RCVD INV -->
                                            <div class="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label
                                                        class="block text-xs font-medium text-sage-700 mb-1">Deskripsi
                                                        Service / Jenis Biaya</label>
                                                    <select v-model="item.description"
                                                        class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500">
                                                        <option value="">Pilih Jenis Biaya</option>
                                                        <option v-for="serviceType in serviceTypes" :key="serviceType.id" :value="serviceType.code">
                                                            {{ serviceType.code }}
                                                        </option>
                                                        <option value="D/O CHARGES">D/O CHARGES</option>
                                                        <option value="LOLO">LOLO</option>
                                                        <option value="STORAGE">STORAGE</option>
                                                        <option value="REFUND">REFUND</option>
                                                        <option value="OTHER">OTHER</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label class="block text-xs font-medium text-sage-700 mb-1">RCVD
                                                        INV</label>
                                                    <input v-model="item.rcvd_inv" type="text"
                                                        placeholder="Nomor invoice yang diterima"
                                                        class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                                </div>
                                            </div>

                                            <!-- Row 2.5: Individual Remarks -->
                                            <div>
                                                <label class="block text-xs font-medium text-sage-700 mb-1">Remarks
                                                    (Individual)</label>
                                                <input v-model="item.remarks" type="text"
                                                    placeholder="Catatan khusus untuk item ini"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            </div>

                                            <!-- Row 3: Buying & Selling Amounts -->
                                            <div class="grid grid-cols-3 gap-3 p-3 bg-blue-50 rounded-lg">
                                                <div>
                                                    <label class="block text-xs font-medium text-blue-700 mb-1">Buying
                                                        Amount (Cost)</label>
                                                    <input v-model="item.buying_amount" type="text" placeholder="0"
                                                        @input="formatNumber(item, 'buying_amount')"
                                                        @blur="calculateTotals"
                                                        class="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label class="block text-xs font-medium text-green-700 mb-1">Selling
                                                        Amount (Revenue)</label>
                                                    <input v-model="item.selling_amount" type="text" placeholder="0"
                                                        @input="formatNumber(item, 'selling_amount')"
                                                        @blur="calculateTotals"
                                                        class="w-full px-3 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                                                </div>
                                                <div>
                                                    <label
                                                        class="block text-xs font-medium text-purple-700 mb-1">Revenue</label>
                                                    <p class="px-3 py-2 bg-white border border-purple-300 rounded text-sm font-semibold"
                                                        :class="getProfit(item) >= 0 ? 'text-green-600' : 'text-red-600'">
                                                        {{ formatCurrency(getProfit(item)) }}
                                                    </p>
                                                </div>
                                            </div>

                                            <!-- Row 4: Vendor Details (Auto-filled) -->
                                            <div v-if="item.vendor_id"
                                                class="grid grid-cols-3 gap-3 p-3 bg-sage-50 rounded-lg">
                                                <div>
                                                    <label class="block text-xs font-medium text-sage-700 mb-1">Nama
                                                        Vendor</label>
                                                    <p class="text-sm text-gray-900">{{ item.nama_vendor || '-' }}</p>
                                                </div>
                                                <div>
                                                    <label class="block text-xs font-medium text-sage-700 mb-1">Nomor
                                                        Rekening</label>
                                                    <p class="text-sm text-gray-900 font-mono">{{ item.no_rekening ||
                                                        '-' }}</p>
                                                </div>
                                                <div>
                                                    <label class="block text-xs font-medium text-sage-700 mb-1">Nama
                                                        Rekening</label>
                                                    <p class="text-sm text-gray-900">{{ item.nama_rekening || '-' }}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Total Summary -->
                                        <div
                                            class="mt-4 pt-4 border-t border-gray-300 grid grid-cols-3 gap-4 text-center">
                                            <div class="p-3 bg-blue-100 rounded-lg">
                                                <p class="text-xs font-medium text-blue-700">Total Buying</p>
                                                <p class="text-lg font-bold text-blue-800">{{
                                                    formatCurrency(totalBuying) }}</p>
                                            </div>
                                            <div class="p-3 bg-green-100 rounded-lg">
                                                <p class="text-xs font-medium text-green-700">Total Selling</p>
                                                <p class="text-lg font-bold text-green-800">{{
                                                    formatCurrency(totalSelling) }}</p>
                                            </div>
                                            <div class="p-3 rounded-lg"
                                                :class="totalRevenue >= 0 ? 'bg-purple-100' : 'bg-red-100'">
                                                <p class="text-xs font-medium"
                                                    :class="totalRevenue >= 0 ? 'text-purple-700' : 'text-red-700'">
                                                    Total Revenue</p>
                                                <p class="text-lg font-bold"
                                                    :class="totalRevenue >= 0 ? 'text-purple-800' : 'text-red-800'">{{
                                                    formatCurrency(totalRevenue) }}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Revenue Summary -->
                                    <div class="bg-blue-50 rounded-lg p-4">
                                        <h4 class="text-md font-semibold text-blue-800 mb-3">Ringkasan Revenue</h4>
                                        <div class="space-y-2">
                                            <div class="flex justify-between">
                                                <span>Total Pemasukan (Selling):</span>
                                                <span class="font-medium">{{ formatCurrency(totalSelling) }}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span>Total Pengeluaran (Buying):</span>
                                                <span class="font-medium">{{ formatCurrency(totalBuying) }}</span>
                                            </div>
                                            <div
                                                class="flex justify-between items-center pt-2 border-t border-blue-300 font-bold text-lg">
                                                <span>Revenue:</span>
                                                <span :class="totalRevenue >= 0 ? 'text-green-600' : 'text-red-600'">
                                                    {{ formatCurrency(totalRevenue) }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">REMARKS</label>
                                        <textarea v-model="form.remarks" rows="3"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"></textarea>
                                        <div v-if="form.errors.remarks" class="mt-2 text-sm text-red-600">{{
                                            form.errors.remarks }}</div>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">NOTE</label>
                                        <textarea v-model="form.note" rows="3"
                                            placeholder="Catatan tambahan untuk sales order ini"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"></textarea>
                                        <div v-if="form.errors.note" class="mt-2 text-sm text-red-600">{{
                                            form.errors.note }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Goods Information -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('goods')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Informasi Barang</h3>
                                    <svg :class="{ 'rotate-180': !sections.goods }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div v-show="sections.goods" class="p-6 space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">COMMODITY/URAIAN
                                            BARANG</label>
                                        <textarea v-model="form.commodity" rows="3"
                                            placeholder="Masukkan uraian barang/commodity yang detail"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"></textarea>
                                        <div v-if="form.errors.commodity" class="mt-2 text-sm text-red-600">{{
                                            form.errors.commodity }}</div>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div class="max-w-xs">
                                            <label class="block text-sm font-medium text-sage-700 mb-2">QTY</label>
                                            <div class="relative flex w-full">
                                                <input v-model="form.qty" type="number" min="0"
                                                    placeholder="0.00"
                                                    class="w-28 px-3 py-2 border border-sage-300 rounded-l-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 focus:z-10" />
                                                <div class="relative flex-1">
                                                    <select v-model="form.package_unit"
                                                        class="h-full w-full px-3 py-2 border-t border-r border-b border-sage-300 bg-white rounded-r-lg appearance-none cursor-pointer focus:ring-2 focus:ring-sage-500 focus:border-sage-500 focus:z-10 pr-8">
                                                        <option value="">Unit</option>
                                                        <option v-for="unit in packageUnits" :key="unit.code" :value="unit.code">
                                                            {{ unit.code }}
                                                        </option>
                                                    </select>
                                                    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                        <svg class="w-4 h-4 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="form.errors.qty" class="mt-2 text-sm text-red-600">{{
                                                form.errors.qty }}</div>
                                            <div v-if="form.errors.package_unit" class="mt-2 text-sm text-red-600">{{
                                                form.errors.package_unit }}</div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">NET WEIGHT
                                                (KG)</label>
                                            <input v-model="form.net_weight" type="number" step="0.01" min="0"
                                                placeholder="Masukkan berat netto dalam kg"
                                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <div v-if="form.errors.net_weight" class="mt-2 text-sm text-red-600">{{
                                                form.errors.net_weight }}</div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">GROSS WEIGHT
                                                (KG)</label>
                                            <input v-model="form.gross_weight" type="number" step="0.01" min="0"
                                                placeholder="Masukkan berat kotor dalam kg"
                                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <div v-if="form.errors.gross_weight" class="mt-2 text-sm text-red-600">{{
                                                form.errors.gross_weight }}</div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">MEAS
                                                (M³)</label>
                                            <input v-model="form.measurement" type="number" step="0.001" min="0"
                                                placeholder="Masukkan volume dalam m³"
                                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <div v-if="form.errors.measurement" class="mt-2 text-sm text-red-600">{{
                                                form.errors.measurement }}</div>
                                        </div>
                                    </div>
                                    <!-- Multiple Container Numbers -->
                                    <div>
                                        <div class="flex justify-between items-center mb-2">
                                            <label class="block text-sm font-medium text-sage-700">CONTAINER NO</label>
                                            <button type="button" @click="addContainerNo"
                                                class="text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors">
                                                + Tambah Container
                                            </button>
                                        </div>
                                        <div v-for="(container, index) in form.container_no" :key="'container-' + index"
                                            class="flex gap-2 mb-2">
                                            <input v-model="form.container_no[index]" type="text"
                                                placeholder="Masukkan nomor container (misal: TCLU1234567)"
                                                class="flex-1 px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <button type="button" @click="removeContainerNo(index)"
                                                v-if="form.container_no.length > 1"
                                                class="px-3 py-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors">
                                                ×
                                            </button>
                                        </div>
                                        <div v-if="form.errors.container_no" class="mt-2 text-sm text-red-600">{{
                                            form.errors.container_no }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Invoice Information -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('invoice')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Informasi Invoice</h3>
                                    <svg :class="{ 'rotate-180': !sections.invoice }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div v-show="sections.invoice" class="p-6 space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">INVOICE NUMB</label>
                                        <input v-model="form.invoice_number" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.invoice_number" class="mt-2 text-sm text-red-600">{{
                                            form.errors.invoice_number }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">INVOICE DATE</label>
                                        <input v-model="form.invoice_date" type="date"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.invoice_date" class="mt-2 text-sm text-red-600">{{
                                            form.errors.invoice_date }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">T.O.P</label>
                                        <input v-model="form.top" type="text" placeholder="e.g., NET 30"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.top" class="mt-2 text-sm text-red-600">{{ form.errors.top
                                            }}</div>
                                    </div>
                                </div>
                            </div>

                            <!-- Other Costs Section -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('other_costs')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Biaya Operasional</h3>
                                    <svg :class="{ 'rotate-180': !sections.other_costs }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div v-show="sections.other_costs" class="p-6 space-y-4">
                                    <div class="flex justify-between items-center mb-4">
                                        <h4 class="text-md font-semibold text-sage-800">Daftar Biaya Operasional</h4>
                                        <button type="button" @click="addOtherCost"
                                            class="text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors">
                                            + Tambah Biaya
                                        </button>
                                    </div>

                                    <div v-for="(cost, index) in form.other_costs" :key="'cost-' + index"
                                        class="border border-sage-200 rounded-lg p-4 mb-4 space-y-4">
                                        <div class="grid grid-cols-12 gap-3">
                                            <div class="col-span-3">
                                                <label
                                                    class="block text-xs font-medium text-sage-700 mb-1">Deskripsi</label>
                                                <input v-model="cost.description" type="text"
                                                    placeholder="Deskripsi biaya"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            </div>
                                            <div class="col-span-2">
                                                <label
                                                    class="block text-xs font-medium text-sage-700 mb-1">Jumlah</label>
                                                <input v-model="cost.amount" type="number" placeholder="0" min="0"
                                                    step="0.01"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            </div>
                                            <div class="col-span-2">
                                                <label
                                                    class="block text-xs font-medium text-sage-700 mb-1">Kategori</label>
                                                <select v-model="cost.category"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500">
                                                    <option value="">Pilih Kategori</option>
                                                    <option v-for="category in operationalCostCategories"
                                                        :key="category.id" :value="category.name">
                                                        {{ category.name }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="col-span-2">
                                                <label
                                                    class="block text-xs font-medium text-sage-700 mb-1">Catatan</label>
                                                <input v-model="cost.notes" type="text" placeholder="Catatan tambahan"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            </div>

                                            <div class="col-span-2">
                                                <label class="block text-xs font-medium text-purple-700 mb-1">Vendor /
                                                    Penerima</label>
                                                <select v-model="cost.vendor_id"
                                                    class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
                                                    <option value="">-- Belum Ditentukan --</option>
                                                    <option value="internal">-- Internal (Divisi Operational) --
                                                    </option>
                                                    <option v-for="vendor in vendors" :key="vendor.id"
                                                        :value="vendor.id">
                                                        {{ vendor.nama_vendor }}
                                                    </option>
                                                </select>
                                                <p class="text-xs text-purple-600 mt-1">Pilih vendor jika sudah tahu
                                                    akan
                                                    dibayar ke siapa</p>
                                            </div>

                                            <div class="col-span-1">
                                                <label
                                                    class="block text-xs font-medium text-transparent mb-1">Del</label>
                                                <button type="button" @click="removeOtherCost(index)"
                                                    v-if="form.other_costs.length > 1"
                                                    class="w-full h-10 text-red-600 hover:text-red-900 hover:bg-red-100 rounded transition-colors">
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Total Other Costs -->
                                    <div class="mt-4 pt-4 border-t border-gray-300 text-right">
                                        <div class="p-3 bg-orange-100 rounded-lg inline-block">
                                            <p class="text-xs font-medium text-orange-700">Total Biaya Operasional</p>
                                            <p class="text-lg font-bold text-orange-800">{{
                                                formatCurrency(totalOtherCosts) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Reimbursement Section -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('reimbursement')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Reimbursement</h3>
                                    <svg :class="{ 'rotate-180': !sections.reimbursement }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div v-show="sections.reimbursement" class="p-6 space-y-4">
                                    <div class="flex justify-between items-center mb-4">
                                        <h4 class="text-md font-semibold text-sage-800">Daftar Reimbursement</h4>
                                        <button type="button" @click="addReimbursementItem"
                                            class="text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors">
                                            + Tambah Reimbursement
                                        </button>
                                    </div>

                                    <div v-for="(item, index) in reimbursementItems" :key="'reimburse-' + index"
                                        class="border border-sage-200 rounded-lg p-4 mb-4 space-y-4">
                                        <div class="grid grid-cols-12 gap-3">
                                            <div class="col-span-3">
                                                <label
                                                    class="block text-xs font-medium text-sage-700 mb-1">Deskripsi</label>
                                                <input v-model="item.description" type="text"
                                                    placeholder="Deskripsi reimbursement"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            </div>
                                            <div class="col-span-2">
                                                <label
                                                    class="block text-xs font-medium text-sage-700 mb-1">Jumlah</label>
                                                <input v-model="item.amount" type="number" placeholder="0" min="0"
                                                    step="0.01"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            </div>
                                            <div class="col-span-2">
                                                <label
                                                    class="block text-xs font-medium text-sage-700 mb-1">Kategori</label>
                                                <input v-model="item.category" type="text"
                                                    placeholder="Kategori reimbursement"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            </div>
                                            <div class="col-span-2">
                                                <label
                                                    class="block text-xs font-medium text-sage-700 mb-1">Catatan</label>
                                                <input v-model="item.notes" type="text" placeholder="Catatan tambahan"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            </div>

                                            <div class="col-span-2">
                                                <label class="block text-xs font-medium text-purple-700 mb-1">Vendor /
                                                    Penerima</label>
                                                <select v-model="item.vendor_id"
                                                    class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
                                                    <option value="">-- Belum Ditentukan --</option>
                                                    <option value="internal">-- Internal (Divisi Operational) --
                                                    </option>
                                                    <option v-for="vendor in vendors" :key="vendor.id"
                                                        :value="vendor.id">
                                                        {{ vendor.nama_vendor }}
                                                    </option>
                                                </select>
                                                <p class="text-xs text-purple-600 mt-1">Pilih vendor jika sudah tahu
                                                    akan
                                                    dibayar ke siapa</p>
                                            </div>

                                            <div class="col-span-1">
                                                <label
                                                    class="block text-xs font-medium text-transparent mb-1">Del</label>
                                                <button type="button" @click="removeReimbursementItem(index)"
                                                    v-if="reimbursementItems.length > 1"
                                                    class="w-full h-10 text-red-600 hover:text-red-900 hover:bg-red-100 rounded transition-colors">
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Total Reimbursement -->
                                    <div class="mt-4 pt-4 border-t border-gray-300 text-right">
                                        <div class="p-3 bg-purple-100 rounded-lg inline-block">
                                            <p class="text-xs font-medium text-purple-700">Total Reimbursement</p>
                                            <p class="text-lg font-bold text-purple-800">{{
                                                formatCurrency(totalReimbursement) }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Submit Buttons -->
                            <div
                                class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6">
                                <Link :href="route('admin-keuangan.sales-orders.index')"
                                    class="inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                                Batal
                                </Link>
                                <button type="submit" :disabled="form.processing"
                                    class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                    <svg v-if="form.processing" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                        fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    <span v-if="form.processing">Menyimpan...</span>
                                    <span v-else>Update Shipping Order</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Alert Dialog -->
        <AlertDialog :show="alertDialog.show" :type="alertDialog.type" :title="alertDialog.title"
            :message="alertDialog.message" :confirm-text="alertDialog.confirmText" :cancel-text="alertDialog.cancelText"
            @confirm="handleAlertConfirm" @cancel="handleAlertCancel" @close="closeAlert" />
    </AdminKeuanganLayout>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useForm, Link } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";
import AlertDialog from "@/Components/AlertDialog.vue";
import { Edit, Eye, ArrowLeft, ChevronDown, LoaderCircle, CheckCircle } from 'lucide-vue-next';

const props = defineProps({
    salesOrder: Object,
    vendors: Array,
    shipmentTypes: Array,
    serviceTypes: Array,
    operationalCostCategories: Array,
    packageUnits: {
        type: Array,
        default: () => []
    },
});

// Initialize other_costs from salesOrder data
const initializeOtherCosts = () => {
    if (props.salesOrder.other_costs && Array.isArray(props.salesOrder.other_costs)) {
        return props.salesOrder.other_costs.length > 0
            ? props.salesOrder.other_costs.map(cost => ({
                description: cost.description || "",
                amount: cost.amount || 0,
                category: cost.category || "",
                notes: cost.notes || "",
                vendor_id: cost.vendor_id || ""
            }))
            : [{ description: "", amount: 0, category: "", notes: "", vendor_id: "" }];
    }
    return [{ description: "", amount: 0, category: "", notes: "", vendor_id: "" }];
};

// Initialize reimbursement items from salesOrder data
const reimbursementItems = ref(
    props.salesOrder.reimbursement_items && props.salesOrder.reimbursement_items.length > 0
        ? props.salesOrder.reimbursement_items.map(item => ({
            description: item.description || "",
            amount: item.amount || 0,
            category: item.category || "",
            notes: item.notes || "",
            vendor_id: item.vendor_id || ""
        }))
        : [{ description: "", amount: 0, category: "", notes: "", vendor_id: "" }]
);

// Alert Dialog State
const alertDialog = ref({
    show: false,
    type: "info",
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    onConfirm: null,
});

// Collapseable sections state
const sections = ref({
    basic: true,
    shipping: false,
    pricing: false,
    goods: false,
    invoice: false,
    other_costs: false,
    reimbursement: false,
});

// Initialize form with existing data
const initializeVendorBreakdown = () => {
    if (props.salesOrder.vendor_breakdown && Array.isArray(props.salesOrder.vendor_breakdown)) {
        return props.salesOrder.vendor_breakdown.map(item => ({
            vendor_id: item.vendor_id || '',
            nama_vendor: item.nama_vendor || '',
            no_rekening: item.no_rekening || '',
            nama_rekening: item.nama_rekening || '',
            description: item.description || '',
            buying_amount: item.buying_amount || 0,
            selling_amount: item.selling_amount || 0,
            rcvd_inv: item.rcvd_inv || '',
            remarks: item.remarks || ''
        }));
    }
    return [{
        vendor_id: '',
        nama_vendor: '',
        no_rekening: '',
        nama_rekening: '',
        description: '',
        buying_amount: 0,
        selling_amount: 0,
        rcvd_inv: '',
        remarks: ''
    }];
};

const form = useForm({
    // Required fields based on requirements only
    order_number: props.salesOrder.order_number || "",
    ref_no: props.salesOrder.ref_no || "",
    so_date: props.salesOrder.so_date ? new Date(props.salesOrder.so_date).toISOString().split('T')[0] : "",
    customer: props.salesOrder.customer || "",
    shipper: props.salesOrder.shipper || "",
    bl_awb: props.salesOrder.bl_awb || "",
    liner: props.salesOrder.liner || "",
    vessel: props.salesOrder.vessel || "",
    eta: props.salesOrder.eta ? new Date(props.salesOrder.eta).toISOString().split('T')[0] : "",
    etd: props.salesOrder.etd ? new Date(props.salesOrder.etd).toISOString().split('T')[0] : "",
    aju: props.salesOrder.aju || "",
    sppb_date: props.salesOrder.sppb_date ? new Date(props.salesOrder.sppb_date).toISOString().split('T')[0] : "",
    shipment_type: props.salesOrder.shipment_type || "",
    pol: props.salesOrder.pol || "",
    pod: props.salesOrder.pod || "",
    gudang_utc: props.salesOrder.gudang_utc || "",
    party_lcl: props.salesOrder.party_lcl || "",
    prepared_by: props.salesOrder.prepared_by || "",
    exchange_rate: props.salesOrder.exchange_rate || "",
    vendor_breakdown: initializeVendorBreakdown(),
    remarks: props.salesOrder.remarks || "",
    note: props.salesOrder.note || "",
    commodity: props.salesOrder.commodity || "",
    qty: props.salesOrder.qty || "",
    package_unit: props.salesOrder.package_unit || "",
    net_weight: props.salesOrder.net_weight || "",
    gross_weight: props.salesOrder.gross_weight || "",
    measurement: props.salesOrder.measurement || "",
    container_no: Array.isArray(props.salesOrder.container_no) ? props.salesOrder.container_no : (props.salesOrder.container_no ? [props.salesOrder.container_no] : [""]),
    invoice_number: props.salesOrder.invoice_number || "",
    invoice_date: props.salesOrder.invoice_date ? new Date(props.salesOrder.invoice_date).toISOString().split('T')[0] : "",
    top: props.salesOrder.top || "",
    other_costs: initializeOtherCosts()
});

const toggleSection = (section) => {
    sections.value[section] = !sections.value[section];
};

// Vendor selection for buying breakdown
const onVendorSelect = (index) => {
    const vendorItem = form.vendor_breakdown[index];
    if (vendorItem.vendor_id) {
        const selectedVendor = props.vendors.find(v => v.id == vendorItem.vendor_id);
        if (selectedVendor) {
            vendorItem.nama_vendor = selectedVendor.nama_vendor;
            vendorItem.no_rekening = selectedVendor.nomor_rekening;
            vendorItem.nama_rekening = selectedVendor.nama_rekening;
        }
    } else {
        // Clear vendor data if no vendor selected
        vendorItem.nama_vendor = "";
        vendorItem.no_rekening = "";
        vendorItem.nama_rekening = "";
    }
};

// Vendor breakdown management methods
const addVendorItem = () => {
    form.vendor_breakdown.push({
        vendor_id: '',
        nama_vendor: '',
        no_rekening: '',
        nama_rekening: '',
        description: '',
        buying_amount: 0,
        selling_amount: 0,
        rcvd_inv: '',
        remarks: ''
    });
};

const removeVendorItem = (index) => {
    if (form.vendor_breakdown.length > 1) {
        form.vendor_breakdown.splice(index, 1);
    }
};

// Container management methods
const addContainerNo = () => {
    form.container_no.push("");
};

const removeContainerNo = (index) => {
    if (form.container_no.length > 1) {
        form.container_no.splice(index, 1);
    }
};

// Other costs management methods
const addOtherCost = () => {
    form.other_costs.push({ description: "", amount: 0, category: "", notes: "", vendor_id: "" });
};

const removeOtherCost = (index) => {
    if (form.other_costs.length > 1) {
        form.other_costs.splice(index, 1);
    }
};

// Reimbursement management methods
const addReimbursementItem = () => {
    reimbursementItems.value.push({ description: "", amount: 0, category: "", notes: "", vendor_id: "" });
};

const removeReimbursementItem = (index) => {
    if (reimbursementItems.value.length > 1) {
        reimbursementItems.value.splice(index, 1);
    }
};

// Format number with dots as thousand separators
const formatNumber = (item, field) => {
    const value = item[field];
    if (!value) return;

    // Remove all non-numeric characters except decimal point
    const numericValue = value.toString().replace(/[^\d]/g, '');

    // Format with dots as thousand separators
    const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    item[field] = formatted;
};

const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount) || 0;
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(numAmount);
};

// Calculate total other costs
const totalOtherCosts = computed(() => {
    return form.other_costs.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
});

// Calculate total reimbursement
const totalReimbursement = computed(() => {
    return reimbursementItems.value.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
});

// Computed properties for totals
const totalBuying = computed(() => {
    return form.vendor_breakdown.reduce((sum, item) => {
        const amount = parseFloat(item.buying_amount.toString().replace(/\./g, '')) || 0;
        return sum + amount;
    }, 0);
});

const totalSelling = computed(() => {
    return form.vendor_breakdown.reduce((sum, item) => {
        const amount = parseFloat(item.selling_amount.toString().replace(/\./g, '')) || 0;
        return sum + amount;
    }, 0);
});

const totalRevenue = computed(() => {
    return totalSelling.value - totalBuying.value;
});

// Get profit for individual vendor item
const getProfit = (vendorItem) => {
    const buying = parseFloat(vendorItem.buying_amount.toString().replace(/\./g, '')) || 0;
    const selling = parseFloat(vendorItem.selling_amount.toString().replace(/\./g, '')) || 0;
    return selling - buying;
};

const calculateTotals = () => {
    // This function is called to trigger reactivity if needed
    // The actual calculation is done by computed properties
    return {
        totalBuying: totalBuying.value,
        totalSelling: totalSelling.value,
        totalRevenue: totalRevenue.value
    };
};

const showAlert = (type, title, message, confirmText = "", cancelText = "", onConfirmCallback = null) => {
    alertDialog.value = {
        show: true,
        type,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: onConfirmCallback,
    };
};

const handleAlertConfirm = () => {
    if (alertDialog.value.onConfirm) {
        alertDialog.value.onConfirm();
    }
    closeAlert();
};

const handleAlertCancel = () => {
    // Cancel logic if needed
};

const closeAlert = () => {
    alertDialog.value.show = false;
};

const submit = () => {
    // Clean up formatted numbers before sending
    const cleanedData = {
        ...form.data(),
        vendor_breakdown: form.vendor_breakdown.map(item => ({
            ...item,
            buying_amount: parseFloat(item.buying_amount.toString().replace(/\./g, '')) || 0,
            selling_amount: parseFloat(item.selling_amount.toString().replace(/\./g, '')) || 0
        })),
        reimbursement_items: reimbursementItems.value.filter(r => r.description && r.amount && r.amount > 0),
        other_costs: form.other_costs.filter(c => c.description && c.amount && c.amount > 0)
    };

    form.transform(() => cleanedData).put(route("admin-keuangan.sales-orders.update", props.salesOrder.id), {
        onSuccess: (page) => {
            console.log('Success response received:', page);

            // Check if this is actually the index page (successful redirect)
            if (page.component === 'Admin/AdminKeuangan/SalesOrders/Index') {
                console.log('Successfully redirected to index page');
                showAlert("success", "Berhasil", "Sales Order berhasil diperbarui.");
            } else {
                console.log('Not redirected to index, component:', page.component);
                showAlert("success", "Berhasil", "Sales Order berhasil diperbarui.", "OK", "", () => {
                    window.location.href = route('admin-keuangan.sales-orders.index');
                });
            }
        },
        onError: (errors) => {
            console.error('Sales Order Update Error:', errors);

            // Handle specific validation errors
            if (errors && Object.keys(errors).length > 0) {
                let errorMessages = [];

                // Collect all error messages
                Object.keys(errors).forEach(field => {
                    if (Array.isArray(errors[field])) {
                        errorMessages.push(...errors[field]);
                    } else {
                        errorMessages.push(errors[field]);
                    }
                });

                const errorMessage = errorMessages.length > 0
                    ? errorMessages.join('. ')
                    : "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan.";

                showAlert("error", "Gagal Menyimpan", errorMessage);
            } else {
                showAlert("error", "Gagal Menyimpan", "Terjadi kesalahan saat memperbarui sales order. Silakan coba lagi.");
            }
        },
        onFinish: () => {
            // Reset processing state
            console.log('Request finished');
        },
    });
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

.bg-sage-100 {
    background-color: #e8ede4;
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

.hover\:bg-sage-100:hover {
    background-color: #e8ede4;
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
