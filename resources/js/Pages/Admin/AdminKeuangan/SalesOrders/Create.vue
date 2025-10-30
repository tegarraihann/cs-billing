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
                                    <Plus class="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h1 class="text-2xl font-semibold text-gray-900">Buat Shipping Order Baru</h1>
                                    <p class="mt-1 text-sm text-gray-600">Buat dokumen Shipping order untuk pelanggan
                                    </p>
                                </div>
                            </div>
                            <div class="mt-4 sm:mt-0 flex space-x-3">
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
                        <h3 class="text-lg font-medium text-gray-900">Form Shipping Order Baru</h3>
                        <p class="mt-1 text-sm text-gray-600">Lengkapi informasi Shipping order dengan benar</p>
                    </div>

                    <div class="p-6">
                        <form @submit.prevent="submit" class="space-y-6">
                            <!-- Customer Selection -->
                            <div class="bg-white shadow overflow-visible sm:rounded-lg">
                                <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
                                    <h3 class="text-lg font-medium text-gray-900">Pilih Metode Input</h3>
                                </div>
                                <div class="p-6">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label class="flex items-center">
                                                <input type="radio" v-model="inputMethod" value="manual"
                                                    class="mr-3 text-sage-600 focus:ring-sage-500">
                                                <span class="text-sm font-medium text-sage-700">Input Manual</span>
                                            </label>
                                            <p class="text-xs text-sage-500 mt-1 ml-6">Isi semua data secara manual</p>
                                        </div>
                                        <div>
                                            <label class="flex items-center">
                                                <input type="radio" v-model="inputMethod" value="customer"
                                                    class="mr-3 text-sage-600 focus:ring-sage-500">
                                                <span class="text-sm font-medium text-sage-700">Berdasarkan Data
                                                    Pelanggan</span>
                                            </label>
                                            <p class="text-xs text-sage-500 mt-1 ml-6">Auto-fill dari data pelanggan</p>
                                        </div>
                                    </div>

                                    <div v-if="inputMethod === 'customer'" class="mt-4">
                                        <label class="block text-sm font-medium text-sage-700 mb-2">Pilih
                                            Pelanggan</label>
                                        <SearchableSelect v-model="selectedCustomerId" :options="customerOptions"
                                            placeholder="Cari pelanggan... (contoh: CI)" label-field="label"
                                            sub-label-field="subLabel" value-field="value"
                                            :search-fields="['label', 'subLabel', 'company_name', 'pic_name']"
                                            input-class="w-full px-3 py-2 pr-10 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                            @select="onCustomerSelect" />
                                    </div>
                                </div>
                            </div>

                            <!-- Basic Information -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('basic')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Informasi Dasar</h3>
                                    <svg :class="{ 'rotate-180': !sections.basic }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
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
                                    <!-- <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">PREPARED BY</label>
                                        <input v-model="form.prepared_by" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.prepared_by" class="mt-2 text-sm text-red-600">{{
                                            form.errors.prepared_by }}</div>
                                    </div> -->
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
                                                        <option v-for="serviceType in serviceTypes"
                                                            :key="serviceType.id" :value="serviceType.code">
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
                                                    <input v-model="item.buying_amount" type="number" step="0.01"
                                                        placeholder="0.00" @input="calculateTotals"
                                                        class="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                                </div>
                                                <div>
                                                    <label class="block text-xs font-medium text-green-700 mb-1">Selling
                                                        Amount (Revenue)</label>
                                                    <input v-model="item.selling_amount" type="number" step="0.01"
                                                        placeholder="0.00" @input="calculateTotals"
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
                                                    :class="totalRevenue >= 0 ? 'text-purple-700' : 'text-red-700'">Net
                                                    Profit</p>
                                                <p class="text-xs text-gray-500 mb-1">(Sudah dikurangi semua biaya)</p>
                                                <p class="text-lg font-bold"
                                                    :class="totalRevenue >= 0 ? 'text-purple-800' : 'text-red-800'">{{
                                                        formatCurrency(totalRevenue) }}</p>
                                            </div>
                                        </div>

                                        <!-- Bottom Add Button for Vendor Breakdown -->
                                        <div v-if="form.vendor_breakdown.length > 0"
                                            class="flex justify-center mt-6 pt-4 border-t border-gray-200">
                                            <button type="button" @click="addVendorItem"
                                                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors">
                                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Tambah Vendor Lagi
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Revenue Summary -->
                                    <div class="bg-blue-50 rounded-lg p-4">
                                        <h4 class="text-md font-semibold text-blue-800 mb-3">Ringkasan Revenue & Profit
                                        </h4>
                                        <div class="space-y-2">
                                            <div class="flex justify-between">
                                                <span>Total Pemasukan (Selling):</span>
                                                <span class="font-medium text-green-700">{{ formatCurrency(totalSelling)
                                                    }}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span>Total Pengeluaran (Buying):</span>
                                                <span class="font-medium text-red-700">{{ formatCurrency(totalBuying)
                                                    }}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span>Biaya Operasional:</span>
                                                <span class="font-medium text-orange-700">{{
                                                    formatCurrency(totalOtherCosts) }}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span>Total Reimbursement:</span>
                                                <span class="font-medium text-purple-700">{{
                                                    formatCurrency(totalReimbursement) }}</span>
                                            </div>
                                            <div class="flex justify-between border-t border-blue-200 pt-2 mt-1">
                                                <span class="text-sm font-medium text-gray-700">Total Pengeluaran
                                                    Keseluruhan:</span>
                                                <span class="text-sm font-bold text-red-800">{{
                                                    formatCurrency(totalBuying + totalOtherCosts + totalReimbursement)
                                                    }}</span>
                                            </div>
                                            <div
                                                class="flex justify-between items-center pt-2 border-t border-blue-300 font-bold text-lg">
                                                <span>Net Profit:</span>
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

                            <!-- Other Costs Section -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('other_costs')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Biaya Beban Lain (Operational)</h3>
                                    <svg :class="{ 'rotate-180': !sections.other_costs }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div v-show="sections.other_costs" class="p-6">
                                    <div class="bg-orange-50 rounded-lg p-4">
                                        <div class="flex justify-between items-center mb-4">
                                            <h4 class="text-md font-semibold text-orange-800">Biaya Beban Lain
                                                (Operational)</h4>
                                            <button type="button" @click="addOtherCost"
                                                class="text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition-colors">
                                                + Tambah Biaya
                                            </button>
                                        </div>

                                        <div v-if="form.other_costs && form.other_costs.length > 0" class="space-y-3">
                                            <div v-for="(cost, index) in form.other_costs" :key="index"
                                                class="border border-orange-200 rounded-lg p-3 bg-white">
                                                <div class="grid grid-cols-12 gap-3">
                                                    <div class="col-span-4">
                                                        <label
                                                            class="block text-xs font-medium text-orange-700 mb-1">Deskripsi
                                                            Biaya</label>
                                                        <input v-model="cost.description" type="text"
                                                            placeholder="Contoh: Biaya handling, dokumen, dll"
                                                            class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" />
                                                    </div>
                                                    <div class="col-span-2">
                                                        <label
                                                            class="block text-xs font-medium text-orange-700 mb-1">Jumlah
                                                            Biaya</label>
                                                        <input v-model="cost.amount" type="number" min="0" step="0.01"
                                                            placeholder="0"
                                                            class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" />
                                                    </div>
                                                    <div class="col-span-2">
                                                        <label
                                                            class="block text-xs font-medium text-orange-700 mb-1">Kategori</label>
                                                        <select v-model="cost.category"
                                                            class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
                                                            <option value="">Pilih kategori</option>
                                                            <option v-for="category in operationalCostCategories"
                                                                :key="category.id" :value="category.name"
                                                                :title="category.description">
                                                                {{ category.name }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                    <div class="col-span-3">
                                                        <label
                                                            class="block text-xs font-medium text-orange-700 mb-1">Vendor /
                                                            Penerima</label>
                                                        <select v-model="cost.vendor_id"
                                                            class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500">
                                                            <option value="">-- Belum Ditentukan --</option>
                                                            <option value="internal">-- Internal (Divisi Operational) --</option>
                                                            <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">
                                                                {{ vendor.nama_vendor }}
                                                            </option>
                                                        </select>
                                                        <p class="text-xs text-orange-600 mt-1">Pilih vendor jika sudah tahu akan
                                                            dibayar ke siapa</p>
                                                    </div>
                                                    <div class="col-span-1 flex items-center justify-center">
                                                        <button type="button" @click="removeOtherCost(index)"
                                                            class="w-full px-2 py-1 flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                                                            :disabled="form.other_costs.length <= 1">
                                                            <Trash2 class="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Total Other Costs -->
                                            <div class="pt-3 border-t border-orange-300">
                                                <div class="flex justify-between items-center">
                                                    <span class="text-sm font-medium text-orange-700">Total Biaya Beban
                                                        Lain:</span>
                                                    <span class="text-lg font-bold text-orange-800">{{
                                                        formatCurrency(totalOtherCosts) }}</span>
                                                </div>
                                            </div>

                                            <!-- Bottom Add Button for Other Costs -->
                                            <div class="flex justify-center mt-6 pt-4 border-t border-orange-200">
                                                <button type="button" @click="addOtherCost"
                                                    class="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Tambah Biaya Lagi
                                                </button>
                                            </div>
                                        </div>

                                        <div v-else class="text-center py-4 text-orange-600">
                                            <p class="text-sm">Belum ada biaya beban lain</p>
                                            <p class="text-xs text-orange-500">Klik tombol "Tambah Biaya" untuk
                                                menambahkan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Reimbursement Section -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('reimbursement')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Items Reimbursement</h3>
                                    <svg :class="{ 'rotate-180': !sections.reimbursement }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div v-show="sections.reimbursement" class="p-6">
                                    <div class="bg-purple-50 rounded-lg p-4">
                                        <div class="flex justify-between items-center mb-4">
                                            <h4 class="text-md font-semibold text-purple-800">Items Reimbursement</h4>
                                            <button type="button" @click="addReimbursementItem"
                                                class="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors">
                                                + Tambah Reimbursement
                                            </button>
                                        </div>

                                        <div v-if="reimbursementItems && reimbursementItems.length > 0"
                                            class="space-y-3">
                                            <div v-for="(item, index) in reimbursementItems" :key="index"
                                                class="border border-purple-200 rounded-lg p-3 bg-white">
                                                <div class="grid grid-cols-12 gap-3">
                                                    <div class="col-span-4">
                                                        <label
                                                            class="block text-xs font-medium text-purple-700 mb-1">Deskripsi</label>
                                                        <input v-model="item.description" type="text"
                                                            placeholder="Contoh: Transport, Akomodasi, dll"
                                                            class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" />
                                                    </div>
                                                    <div class="col-span-2">
                                                        <label
                                                            class="block text-xs font-medium text-purple-700 mb-1">Jumlah</label>
                                                        <input v-model="item.amount" type="number" min="0" step="0.01"
                                                            placeholder="0"
                                                            class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" />
                                                    </div>
                                                    <div class="col-span-2">
                                                        <label
                                                            class="block text-xs font-medium text-purple-700 mb-1">Kategori</label>
                                                        <select v-model="item.category"
                                                            class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
                                                            <option value="">Pilih Kategori</option>
                                                            <option value="transport">Transport</option>
                                                            <option value="accommodation">Akomodasi</option>
                                                            <option value="meal">Makan</option>
                                                            <option value="fuel">BBM</option>
                                                            <option value="parking">Parkir</option>
                                                            <option value="toll">Tol</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="communication">Komunikasi</option>
                                                            <option value="equipment">Peralatan</option>
                                                            <option value="general">Umum</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-span-3">
                                                        <label
                                                            class="block text-xs font-medium text-purple-700 mb-1">Vendor / Penerima</label>
                                                        <select v-model="item.vendor_id"
                                                            class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500">
                                                            <option value="">-- Belum Ditentukan --</option>
                                                            <option value="internal">-- Internal (Divisi Operational) --</option>
                                                            <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">
                                                                {{ vendor.nama_vendor }}
                                                            </option>
                                                        </select>
                                                        <p class="text-xs text-purple-600 mt-1">Pilih vendor jika sudah tahu akan dibayar ke siapa</p>
                                                    </div>
                                                    <div class="col-span-1 flex items-center justify-center">
                                                        <button type="button" @click="removeReimbursementItem(index)"
                                                            class="w-full px-2 py-1 flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors">
                                                            <Trash2 class="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <label
                                                        class="block text-xs font-medium text-purple-700 mb-1">Catatan
                                                        (opsional)</label>
                                                    <textarea v-model="item.notes" rows="2"
                                                        placeholder="Catatan tambahan untuk item reimbursement ini"
                                                        class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 resize-none"></textarea>
                                                </div>
                                            </div>

                                            <!-- Total Reimbursement -->
                                            <div class="pt-3 border-t border-purple-300">
                                                <div class="flex justify-between items-center">
                                                    <span class="text-sm font-medium text-purple-700">Total
                                                        Reimbursement:</span>
                                                    <span class="text-lg font-bold text-purple-800">{{
                                                        formatCurrency(totalReimbursement) }}</span>
                                                </div>
                                            </div>

                                            <!-- Bottom Add Button for Reimbursement -->
                                            <div class="flex justify-center mt-6 pt-4 border-t border-purple-200">
                                                <button type="button" @click="addReimbursementItem"
                                                    class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                    </svg>
                                                    Tambah Reimbursement Lagi
                                                </button>
                                            </div>
                                        </div>

                                        <div v-else class="text-center py-4 text-purple-600">
                                            <p class="text-sm">Belum ada item reimbursement</p>
                                            <p class="text-xs text-purple-500">Klik tombol "Tambah Reimbursement" untuk
                                                menambahkan</p>
                                        </div>
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
                                                <input v-model="form.qty" type="number" min="0" placeholder="0.00"
                                                    class="w-28 px-3 py-2 border border-sage-300 rounded-l-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 focus:z-10" />
                                                <div class="relative flex-1">
                                                    <select v-model="form.package_unit"
                                                        class="h-full w-full px-3 py-2 border-t border-r border-b border-sage-300 bg-white rounded-r-lg appearance-none cursor-pointer focus:ring-2 focus:ring-sage-500 focus:border-sage-500 focus:z-10 pr-8">
                                                        <option value="">Unit</option>
                                                        <option v-for="unit in packageUnits" :key="unit.code"
                                                            :value="unit.code">
                                                            {{ unit.code }}
                                                        </option>
                                                    </select>
                                                    <div
                                                        class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                                        <svg class="w-4 h-4 text-sage-500" fill="none"
                                                            stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2" d="M19 9l-7 7-7-7"></path>
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

                                        <!-- Bottom Add Button for Container Numbers -->
                                        <div v-if="form.container_no.length > 0"
                                            class="flex justify-center mt-4 pt-4 border-t border-sage-200">
                                            <button type="button" @click="addContainerNo"
                                                class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors">
                                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Tambah Container Lagi
                                            </button>
                                        </div>
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

                            <!-- Voucher Section -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('voucher')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Voucher Management</h3>
                                    <svg :class="{ 'rotate-180': !sections.voucher }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                <div v-show="sections.voucher" class="p-6 space-y-6">

                                    <!-- Payment Vouchers -->
                                    <div class="space-y-4">
                                        <div class="flex items-center justify-between">
                                            <h4 class="text-md font-semibold text-sage-700">Payment Vouchers</h4>
                                            <button type="button" @click="addPaymentVoucher"
                                                class="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Add Payment
                                            </button>
                                        </div>

                                        <div v-if="paymentVouchers.length === 0"
                                            class="text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                                            No payment vouchers added yet
                                        </div>

                                        <div v-for="(voucher, index) in paymentVouchers" :key="'payment-' + index"
                                            class="border border-gray-200 rounded-lg p-4 space-y-3">
                                            <div class="flex justify-between items-center">
                                                <h5 class="font-medium text-gray-700">Payment Voucher #{{ index + 1 }}
                                                </h5>
                                                <button type="button" @click="removePaymentVoucher(index)"
                                                    class="text-red-600 hover:text-red-800">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label class="block text-sm font-medium text-gray-700 mb-1">Voucher
                                                        No</label>
                                                    <input v-model="voucher.voucher_no" type="text"
                                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                                        placeholder="e.g., PAY-001" />
                                                </div>
                                                <div>
                                                    <label
                                                        class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                                    <input v-model="voucher.date" type="date"
                                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                                <textarea v-model="voucher.description" rows="2"
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                                                    placeholder="e.g., Biaya Driver"></textarea>
                                            </div>

                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label
                                                        class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                                    <input v-model="voucher.amount" type="number" step="0.01" min="0"
                                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                                        placeholder="500000" />
                                                </div>
                                                <div>
                                                    <label class="block text-sm font-medium text-gray-700 mb-1">Prepared
                                                        By</label>
                                                    <input v-model="voucher.prepared_by" type="text"
                                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                                        placeholder="Staff name" />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Bottom Add Button for Payment Vouchers -->
                                        <div v-if="paymentVouchers.length > 0"
                                            class="flex justify-center mt-6 pt-4 border-t border-blue-200">
                                            <button type="button" @click="addPaymentVoucher"
                                                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Add Payment Lagi
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Receipt Vouchers -->
                                    <div class="space-y-4">
                                        <div class="flex items-center justify-between">
                                            <h4 class="text-md font-semibold text-sage-700">Receipt Vouchers</h4>
                                            <button type="button" @click="addReceiptVoucher"
                                                class="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                                                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Add Receipt
                                            </button>
                                        </div>

                                        <div v-if="receiptVouchers.length === 0"
                                            class="text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                                            No receipt vouchers added yet
                                        </div>

                                        <div v-for="(voucher, index) in receiptVouchers" :key="'receipt-' + index"
                                            class="border border-gray-200 rounded-lg p-4 space-y-3">
                                            <div class="flex justify-between items-center">
                                                <h5 class="font-medium text-gray-700">Receipt Voucher #{{ index + 1 }}
                                                </h5>
                                                <button type="button" @click="removeReceiptVoucher(index)"
                                                    class="text-red-600 hover:text-red-800">
                                                    <svg class="w-4 h-4" fill="none" stroke="currentColor"
                                                        viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round"
                                                            stroke-width="2"
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>

                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label class="block text-sm font-medium text-gray-700 mb-1">Voucher
                                                        No</label>
                                                    <input v-model="voucher.voucher_no" type="text"
                                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                                        placeholder="e.g., REC-001" />
                                                </div>
                                                <div>
                                                    <label
                                                        class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                                    <input v-model="voucher.date" type="date"
                                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                                </div>
                                            </div>

                                            <div>
                                                <label
                                                    class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                                <textarea v-model="voucher.description" rows="2"
                                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                                                    placeholder="e.g., Payment received from client"></textarea>
                                            </div>

                                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label
                                                        class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                                    <input v-model="voucher.amount" type="number" step="0.01" min="0"
                                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                                        placeholder="1000000" />
                                                </div>
                                                <div>
                                                    <label class="block text-sm font-medium text-gray-700 mb-1">Prepared
                                                        By</label>
                                                    <input v-model="voucher.prepared_by" type="text"
                                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                                        placeholder="Staff name" />
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Bottom Add Button for Receipt Vouchers -->
                                        <div v-if="receiptVouchers.length > 0"
                                            class="flex justify-center mt-6 pt-4 border-t border-green-200">
                                            <button type="button" @click="addReceiptVoucher"
                                                class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                                Add Receipt Lagi
                                            </button>
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
                                    <span v-else>Simpan Shipping Order</span>
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
import { ref, computed } from "vue";
import { useForm, Link } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";
import AlertDialog from "@/Components/AlertDialog.vue";
import SearchableSelect from "@/Components/SearchableSelect.vue";
import { Plus, ArrowLeft, LoaderCircle, CheckCircle, Trash2 } from 'lucide-vue-next';

const props = defineProps({
    customers: Array,
    vendors: Array,
    shipmentTypes: Array,
    serviceTypes: Array,
    operationalCostCategories: Array,
    packageUnits: {
        type: Array,
        default: () => []
    },
    orderNumber: String,
});

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

// Input method and customer selection
const inputMethod = ref('manual');
const selectedCustomerId = ref('');

// Transform customers for SearchableSelect component
const customerOptions = computed(() => {
    return props.customers.map(customer => ({
        value: customer.id,
        label: customer.company_name,
        subLabel: customer.pic_name,
        company_name: customer.company_name,
        pic_name: customer.pic_name
    }));
});

// Voucher data
const paymentVouchers = ref([]);
const receiptVouchers = ref([]);
const reimbursementItems = ref([{ description: '', amount: 0, category: '', notes: '', vendor_id: '' }]);

// Collapseable sections state
const sections = ref({
    basic: true,
    shipping: false,
    pricing: false,
    other_costs: false,
    reimbursement: false,
    goods: false,
    invoice: false,
    voucher: false,
});

const form = useForm({
    // Required fields based on requirements only
    order_number: props.orderNumber || "",
    ref_no: "",
    so_date: "",
    customer: "",
    shipper: "",
    bl_awb: "",
    liner: "",
    vessel: "",
    eta: "",
    etd: "",
    aju: "",
    sppb_date: "",
    shipment_type: "",
    pol: "",
    pod: "",
    gudang_utc: "",
    party_lcl: "",
    prepared_by: "",
    exchange_rate: "",
    vendor_breakdown: [{ vendor_id: '', nama_vendor: '', no_rekening: '', nama_rekening: '', description: '', buying_amount: 0, selling_amount: 0, rcvd_inv: '', remarks: '' }],
    other_costs: [{ description: '', amount: 0, category: '', vendor_id: '' }],
    remarks: "",
    note: "",
    commodity: "",
    qty: "",
    package_unit: "",
    net_weight: "",
    gross_weight: "",
    measurement: "",
    container_no: [""],
    invoice_number: "",
    invoice_date: "",
    top: ""
});

const toggleSection = (section) => {
    sections.value[section] = !sections.value[section];
};

const onCustomerSelect = (selectedCustomer) => {
    if (selectedCustomer) {
        // Auto-fill fields that are available from customer data
        form.customer = selectedCustomer.company_name || "";
        // Clear shipping fields since they're no longer available
        form.bl_awb = "";
        form.pol = "";
        form.pod = "";
        form.eta = "";
    } else {
        // Clear auto-filled data
        if (inputMethod.value === 'customer') {
            form.customer = "";
            form.bl_awb = "";
            form.pol = "";
            form.pod = "";
            form.eta = "";
        }
    }
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

// Voucher management methods
const addPaymentVoucher = () => {
    paymentVouchers.value.push({
        voucher_no: '',
        date: '',
        description: '',
        amount: 0,
        prepared_by: ''
    });
};

const removePaymentVoucher = (index) => {
    paymentVouchers.value.splice(index, 1);
};

const addReceiptVoucher = () => {
    receiptVouchers.value.push({
        voucher_no: '',
        date: '',
        description: '',
        amount: 0,
        prepared_by: ''
    });
};

const removeReceiptVoucher = (index) => {
    receiptVouchers.value.splice(index, 1);
};

// Other costs management methods
const addOtherCost = () => {
    form.other_costs.push({
        description: '',
        amount: 0,
        category: '',
        vendor_id: ''
    });
};

const removeOtherCost = (index) => {
    if (form.other_costs.length > 1) {
        form.other_costs.splice(index, 1);
    }
};

// Reimbursement management methods
const addReimbursementItem = () => {
    reimbursementItems.value.push({
        description: '',
        amount: 0,
        category: '',
        notes: '',
        vendor_id: ''
    });
};

const removeReimbursementItem = (index) => {
    reimbursementItems.value.splice(index, 1);
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

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount || 0);
};

// Format number with thousand separators
const formatNumber = (amount) => {
    return new Intl.NumberFormat('id-ID').format(amount || 0);
};

// Computed properties for totals
const totalBuying = computed(() => {
    return form.vendor_breakdown.reduce((sum, item) => sum + (parseFloat(item.buying_amount) || 0), 0);
});

const totalSelling = computed(() => {
    return form.vendor_breakdown.reduce((sum, item) => sum + (parseFloat(item.selling_amount) || 0), 0);
});

const totalOtherCosts = computed(() => {
    return form.other_costs.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
});

const totalReimbursement = computed(() => {
    return reimbursementItems.value.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
});

const totalRevenue = computed(() => {
    return totalSelling.value - (totalBuying.value + totalOtherCosts.value + totalReimbursement.value);
});

// Get profit for individual vendor item
const getProfit = (vendorItem) => {
    const buying = parseFloat(vendorItem.buying_amount) || 0;
    const selling = parseFloat(vendorItem.selling_amount) || 0;
    return selling - buying;
};

const calculateTotals = () => {
    // This function is called to trigger reactivity if needed
    // The actual calculation is done by computed properties
    return {
        totalBuying: totalBuying.value,
        totalSelling: totalSelling.value,
        totalOtherCosts: totalOtherCosts.value,
        totalReimbursement: totalReimbursement.value,
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
    // Add voucher data and reimbursement items to form
    const sanitizedReimbursements = reimbursementItems.value
        .filter(r => r.description && r.amount && r.amount > 0)
        .map(r => ({
            description: r.description,
            amount: parseFloat(r.amount) || 0,
            category: r.category || '',
            notes: r.notes || '',
            vendor_id: r.vendor_id === '' ? null : r.vendor_id
        }));

    const sanitizedOtherCosts = form.other_costs
        .filter(c => c.description && c.amount && c.amount > 0)
        .map(c => ({
            description: c.description,
            amount: parseFloat(c.amount) || 0,
            category: c.category || '',
            vendor_id: c.vendor_id === '' ? null : c.vendor_id
        }));

    const formData = {
        ...form.data(),
        payment_vouchers: paymentVouchers.value.filter(v => v.voucher_no && v.description && v.amount),
        receipt_vouchers: receiptVouchers.value.filter(v => v.voucher_no && v.description && v.amount),
        reimbursement_items: sanitizedReimbursements,
        other_costs: sanitizedOtherCosts
    };

    form.transform(() => formData).post(route("admin-keuangan.sales-orders.store"), {
        onSuccess: (page) => {
            console.log('Success response received:', page);
            console.log('Page component:', page.component);
            console.log('Page props:', page.props);
            console.log('Flash messages:', page.props?.flash);

            // Check if this is actually the index page (successful redirect)
            if (page.component === 'Admin/AdminKeuangan/SalesOrders/Index') {
                console.log('Successfully redirected to index page');
                // We're already on the index page, no need for additional redirect
                showAlert("success", "Berhasil", "Sales Order berhasil dibuat.");
            } else {
                console.log('Not redirected to index, component:', page.component);
                showAlert("success", "Berhasil", "Sales Order berhasil dibuat.", "OK", "", () => {
                    // Redirect to index page after user acknowledges success
                    window.location.href = route('admin-keuangan.sales-orders.index');
                });
            }
        },
        onError: (errors) => {
            console.error('Sales Order Creation Error:', errors);

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
                showAlert("error", "Gagal Menyimpan", "Terjadi kesalahan saat menyimpan sales order. Silakan coba lagi.");
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
