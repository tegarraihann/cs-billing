<template>
    <AdminCSLayout>
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
                                    <h1 class="text-2xl font-semibold text-gray-900">Create New Shipping Order</h1>
                                    <p class="mt-1 text-sm text-gray-600">Create a shipping order document for the
                                        customer.</p>
                                </div>
                            </div>
                            <div class="mt-4 sm:mt-0 flex space-x-3">
                                <Link :href="route('admin-cs.sales-orders.index')"
                                    class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    <ArrowLeft class="mr-2 h-4 w-4" />
                                    Back
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form Container -->
                <div class="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div class="px-6 py-4 border-b border-gray-200">
                        <h3 class="text-lg font-medium text-gray-900">New Shipping Order Form</h3>
                        <p class="mt-1 text-sm text-gray-600">Complete the shipping order information accurately.</p>
                    </div>

                    <div class="p-6">
                        <form @submit.prevent="submit" class="space-y-6">
                            <!-- Customer Selection -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-visible">
                                <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
                                    <h3 class="text-lg font-semibold text-sage-800">Select Input Method</h3>
                                </div>
                                <div class="p-6">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label class="flex items-center">
                                                <input type="radio" v-model="inputMethod" value="manual"
                                                    class="mr-3 text-sage-600 focus:ring-sage-500">
                                                <span class="text-sm font-medium text-sage-700">Manual Input</span>
                                            </label>
                                            <p class="text-xs text-sage-500 mt-1 ml-6">Fill in all data manually.</p>
                                        </div>
                                        <div>
                                            <label class="flex items-center">
                                                <input type="radio" v-model="inputMethod" value="customer"
                                                    class="mr-3 text-sage-600 focus:ring-sage-500">
                                                <span class="text-sm font-medium text-sage-700">Use Customer Data</span>
                                            </label>
                                            <p class="text-xs text-sage-500 mt-1 ml-6">Auto-fill from customer data.</p>
                                        </div>
                                    </div>

                                    <div v-if="inputMethod === 'customer'" class="mt-4">
                                        <label class="block text-sm font-medium text-sage-700 mb-2">Select
                                            Customer</label>
                                        <SearchableSelect v-model="selectedCustomerId" :options="customerOptions"
                                            placeholder="Search customers... (example: CI)" label-field="label"
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
                                    <h3 class="text-lg font-semibold text-sage-800">Basic Information</h3>
                                    <ChevronDown :class="{ 'rotate-180': !sections.basic }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" />
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
                                                form.errors.ref_no
                                                }}</div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">DATE</label>
                                            <input v-model="form.so_date" type="date"
                                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <div v-if="form.errors.so_date" class="mt-2 text-sm text-red-600">{{
                                                form.errors.so_date
                                                }}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">CUSTOMER <span
                                                class="text-red-500">*</span></label>
                                        <input v-model="form.customer" type="text" required
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.customer" class="mt-2 text-sm text-red-600">{{
                                            form.errors.customer
                                            }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">SHIPPER</label>
                                        <input v-model="form.shipper" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.shipper" class="mt-2 text-sm text-red-600">{{
                                            form.errors.shipper }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Shipping Information -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('shipping')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Shipping Information</h3>
                                    <ChevronDown :class="{ 'rotate-180': !sections.shipping }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" />
                                </div>
                                <div v-show="sections.shipping" class="p-6 space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">BL/AWB</label>
                                        <input v-model="form.bl_awb" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.bl_awb" class="mt-2 text-sm text-red-600">{{
                                            form.errors.bl_awb }}
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">LINER</label>
                                        <input v-model="form.liner" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.liner" class="mt-2 text-sm text-red-600">{{
                                            form.errors.liner }}
                                        </div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">VESSEL</label>
                                        <input v-model="form.vessel" type="text"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                        <div v-if="form.errors.vessel" class="mt-2 text-sm text-red-600">{{
                                            form.errors.vessel }}
                                        </div>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">ETA</label>
                                            <input v-model="form.eta" type="date"
                                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <div v-if="form.errors.eta" class="mt-2 text-sm text-red-600">{{
                                                form.errors.eta }}
                                            </div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">ETD</label>
                                            <input v-model="form.etd" type="date"
                                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <div v-if="form.errors.etd" class="mt-2 text-sm text-red-600">{{
                                                form.errors.etd }}
                                            </div>
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
                                            form.errors.sppb_date
                                            }}</div>
                                    </div>
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">SHIPMENT
                                            TYPE</label>
                                        <SearchableSelect v-model="form.shipment_type" :options="shipmentTypeOptions"
                                            placeholder="Select Shipment Type" label-field="label" value-field="value"
                                            sub-label-field="description" :search-fields="['label', 'description']"
                                            input-class="w-full px-3 py-2 pr-10 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
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
                                        <label
                                            class="block text-sm font-medium text-sage-700 mb-2">WAREHOUSE/UTC</label>
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
                                            form.errors.party_lcl
                                            }}</div>
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
                                    <h3 class="text-lg font-semibold text-sage-800">Pricing Information</h3>
                                    <ChevronDown :class="{ 'rotate-180': !sections.pricing }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" />
                                </div>
                                <div v-show="sections.pricing" class="p-6 space-y-6">

                                    <!-- Vendor Breakdown (Buying + Selling) -->
                                    <div class="bg-gray-50 rounded-lg p-4">
                                        <div class="flex justify-between items-center mb-4">
                                            <h4 class="text-md font-semibold text-sage-800">Vendor Breakdown (Buying &
                                                Selling)</h4>
                                            <button type="button" @click="addVendorItem"
                                                class="text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors">
                                                + Add Vendor
                                            </button>
                                        </div>
                                        <div v-for="(item, index) in form.vendor_breakdown" :key="index"
                                            class="border border-sage-200 rounded-lg p-4 mb-4 space-y-4">
                                            <!-- Row 1: Vendor Selection -->
                                            <div>
                                                <label class="block text-xs font-medium text-sage-700 mb-1">Vendor
                                                    Name</label>
                                                <SearchableSelect v-model="item.vendor_id"
                                                    :options="vendorSelectOptions" placeholder="Select vendor..."
                                                    :search-fields="['label']"
                                                    :input-class="'w-full px-3 py-2 pr-8 border border-sage-300 rounded text-sm focus:ring-1 focus:ring-sage-500 focus:border-sage-500'"
                                                    @update:modelValue="() => onVendorSelect(index)" />
                                            </div>

                                            <!-- Row 2: Service Description -->
                                            <div>
                                                <label class="block text-xs font-medium text-sage-700 mb-1">Service
                                                    Description / Cost Type</label>
                                                <SearchableSelect v-model="item.description"
                                                    :options="getServiceTypeOptions(item.description)"
                                                    placeholder="Select Cost Type" label-field="label"
                                                    value-field="value" sub-label-field="subLabel"
                                                    :search-fields="['label', 'subLabel']"
                                                    :input-class="'w-full px-3 py-2 pr-8 border border-sage-300 rounded text-sm focus:ring-1 focus:ring-sage-500 focus:border-sage-500'" />
                                            </div>

                                            <!-- Row 2.1: Quantity -->
                                            <div>
                                                <label class="block text-xs font-medium text-sage-700 mb-1">Qty
                                                    (Optional)</label>
                                                <input v-model="item.quantity" type="number" step="0.01" min="0"
                                                    placeholder="Quantity"
                                                    @input="() => recalculateVendorAmounts(item)"
                                                    @blur="calculateTotals"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            </div>

                                            <!-- Row 2.2: Unit -->
                                            <div>
                                                <label class="block text-xs font-medium text-sage-700 mb-1">Unit
                                                    (Optional)</label>
                                                <input v-model="item.unit" type="text" placeholder="Unit"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            </div>

                                            <!-- Row 3: RCVD INV -->
                                            <div>
                                                <label class="block text-xs font-medium text-sage-700 mb-1">RCVD
                                                    INV</label>
                                                <input v-model="item.rcvd_inv" type="text"
                                                    placeholder="Received invoice number"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            </div>

                                            <!-- Row 2.5: Individual Remarks -->
                                            <div>
                                                <label class="block text-xs font-medium text-sage-700 mb-1">Remarks
                                                    (Individual)</label>
                                                <input v-model="item.remarks" type="text"
                                                    placeholder="Notes for this item"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            </div>

                                            <!-- Row 3: Buying & Selling Amounts -->
                                            <div class="grid grid-cols-1 gap-3 p-3 bg-blue-50 rounded-lg">
                                                <div>
                                                    <label class="block text-xs font-medium text-blue-700 mb-1">Buying Amount (Unit Price)</label>
                                                    <input v-model="item.buying_amount" type="text"
                                                        placeholder="0 (example: 25,000 or 25000)"
                                                        @input="onBuyingAmountInput(item)"
                                                        @blur="() => { recalculateVendorAmounts(item); calculateTotals(); }"
                                                        class="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                                                    <p class="text-xs text-blue-600 mt-1" v-if="item.quantity && parseFloat(item.quantity) > 0">
                                                        Total: {{ formatCurrency(getTotalBuyingAmount(item)) }} ({{ item.quantity }} × {{ formatCurrency(normalizeNumber(item.buying_amount)) }})
                                                    </p>
                                                </div>
                                                <div>
                                                    <label class="block text-xs font-medium text-green-700 mb-1">Selling Amount (Unit Price)</label>
                                                    <input v-model="item.selling_amount" type="text"
                                                        placeholder="0 (example: 30,000 or 30000)"
                                                        @input="onSellingAmountInput(item)"
                                                        @blur="() => { recalculateVendorAmounts(item); calculateTotals(); }"
                                                        class="w-full px-3 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                                                    <p class="text-xs text-green-600 mt-1" v-if="item.quantity && parseFloat(item.quantity) > 0">
                                                        Total: {{ formatCurrency(getTotalSellingAmount(item)) }} ({{ item.quantity }} × {{ formatCurrency(normalizeNumber(item.selling_amount)) }})
                                                    </p>
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
                                                class="grid grid-cols-1 gap-3 p-3 bg-sage-50 rounded-lg">
                                                <div>
                                                    <label class="block text-xs font-medium text-sage-700 mb-1">Vendor
                                                        Name</label>
                                                    <p class="text-sm text-gray-900">{{ item.nama_vendor || '-' }}</p>
                                                </div>
                                                <div>
                                                    <label class="block text-xs font-medium text-sage-700 mb-1">Account
                                                        Number</label>
                                                    <p class="text-sm text-gray-900 font-mono">{{ item.no_rekening ||
                                                        '-' }}</p>
                                                </div>
                                                <div>
                                                    <label class="block text-xs font-medium text-sage-700 mb-1">Account
                                                        Name</label>
                                                    <p class="text-sm text-gray-900">{{ item.nama_rekening || '-' }}</p>
                                                </div>
                                            </div>

                                            <div class="flex justify-end">
                                                <button type="button" @click="removeVendorItem(index)"
                                                    :disabled="form.vendor_breakdown.length <= 1"
                                                    class="inline-flex items-center px-3 py-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                                    <Trash2 class="w-4 h-4 mr-1" />
                                                    Remove Vendor
                                                </button>
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
                                                <p class="text-xs text-gray-500 mb-1">(All costs already deducted)</p>
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
                                                <Plus class="w-4 h-4 mr-2" />
                                                Add Another Vendor
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Revenue Summary -->
                                    <div class="bg-blue-50 rounded-lg p-4">
                                        <h4 class="text-md font-semibold text-blue-800 mb-3">Revenue & Profit Summary
                                        </h4>
                                        <div class="space-y-2">
                                            <div class="flex justify-between">
                                                <span>Total Revenue (Selling):</span>
                                                <span class="font-medium text-green-700">{{ formatCurrency(totalSelling)
                                                    }}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span>Total Cost (Buying):</span>
                                                <span class="font-medium text-red-700">{{ formatCurrency(totalBuying)
                                                    }}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span>Operational Costs:</span>
                                                <span class="font-medium text-orange-700">{{
                                                    formatCurrency(totalOtherCosts)
                                                    }}</span>
                                            </div>
                                            <div class="flex justify-between">
                                                <span>Total Reimbursement:</span>
                                                <span class="font-medium text-purple-700">{{
                                                    formatCurrency(totalReimbursement)
                                                    }}</span>
                                            </div>
                                            <div class="flex justify-between border-t border-blue-200 pt-2 mt-1">
                                                <span class="text-sm font-medium text-gray-700">Total Overall
                                                    Costs:</span>
                                                <span class="text-sm font-bold text-red-800">{{
                                                    formatCurrency(totalBuying +
                                                        totalOtherCosts + totalReimbursement) }}</span>
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
                                            form.errors.remarks }}
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">NOTE</label>
                                        <textarea v-model="form.note" rows="3"
                                            placeholder="Additional notes for this shipping order"
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
                                    <h3 class="text-lg font-semibold text-sage-800">Other Costs (Operational)</h3>
                                    <ChevronDown :class="{ 'rotate-180': !sections.other_costs }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" />
                                </div>
                                <div v-show="sections.other_costs" class="p-6">
                                    <div class="bg-orange-50 rounded-lg p-4">
                                        <div class="flex justify-between items-center mb-4">
                                            <h4 class="text-md font-semibold text-orange-800">Other Costs
                                                (Operational)</h4>
                                            <button type="button" @click="addOtherCost"
                                                class="text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition-colors">
                                                + Add Cost
                                            </button>
                                        </div>

                                        <div v-if="form.other_costs && form.other_costs.length > 0" class="space-y-3">
                                            <div v-for="(cost, index) in form.other_costs" :key="'cost-' + index"
                                                class="relative border border-orange-200 rounded-lg p-3 bg-white">
                                                <button type="button" @click="removeOtherCost(index)"
                                                    class="absolute bottom-1 right-4 px-2 py-1 flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                                                    :disabled="form.other_costs.length <= 1">
                                                    <Trash2 class="w-4 h-4" />
                                                </button>
                                                <div class="grid grid-cols-12 gap-3">
                                                    <div class="col-span-12">
                                                        <label
                                                            class="block text-xs font-medium text-orange-700 mb-1">Cost Description</label>
                                                        <input v-model="cost.description" type="text"
                                                            placeholder="Example: handling fees, documents, etc."
                                                            class="w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" />
                                                    </div>
                                                    <div class="col-span-12">
                                                        <label
                                                            class="block text-xs font-medium text-orange-700 mb-1">Cost Amount (Unit Price)</label>
                                                        <input v-model="cost.amount" type="text"
                                                            placeholder="0 (example: 2,500 or 2500)"
                                                            @input="(e) => { formatCostAmount(cost, e); onCostAmountInput(cost); }"
                                                            @blur="() => recalculateCostAmount(cost)"
                                                            class="w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" />
                                                        <p class="text-xs text-orange-600 mt-1"
                                                            v-if="cost.quantity && parseFloat(cost.quantity) > 0">
                                                            Total: {{ formatCurrency(getTotalCostAmount(cost)) }}
                                                        </p>
                                                    </div>
                                                    <div class="col-span-12">
                                                        <label
                                                            class="block text-xs font-medium text-orange-700 mb-1">Qty
                                                            (Optional)</label>
                                                        <input v-model="cost.quantity" type="number" min="0" step="0.01"
                                                            placeholder="Quantity"
                                                            @input="() => recalculateCostAmount(cost)"
                                                            class="w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" />
                                                    </div>
                                                    <div class="col-span-12">
                                                        <label
                                                            class="block text-xs font-medium text-orange-700 mb-1">Unit
                                                            (Optional)</label>
                                                        <input v-model="cost.unit" type="text" placeholder="Unit"
                                                            class="w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" />
                                                    </div>
                                                    <div class="col-span-12">
                                                        <label
                                                            class="block text-xs font-medium text-orange-700 mb-1">Category</label>
                                                        <SearchableSelect v-model="cost.category_id"
                                                            :options="operationalCostCategorySelectOptions"
                                                            placeholder="Select category" label-field="label"
                                                            value-field="value" sub-label-field="description"
                                                            :search-fields="['label', 'description']"
                                                            :input-class="`w-full px-3 py-2 pr-8 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${operationalCostCategorySelectOptions.length === 0 ? 'bg-gray-100 pointer-events-none' : ''}`"
                                                            @select="() => onOtherCostCategoryChange(cost)" />
                                                    </div>
                                                    <div class="col-span-12">
                                                        <label
                                                            class="block text-xs font-medium text-orange-700 mb-1">Vendor / Recipient</label>
                                                        <SearchableSelect v-model="cost.vendor_id"
                                                            :options="vendorSelectOptions" placeholder="Select vendor"
                                                            :search-fields="['label']"
                                                            :input-class="'w-full px-3 py-2 pr-8 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500'" />
                                                        <p class="text-xs text-orange-600 mt-1">Select a vendor if you
                                                            already know who will be paid</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="pt-3 border-t border-orange-300">
                                                <div class="flex justify-between items-center">
                                                    <span class="text-sm font-medium text-orange-700">Total Other Costs:</span>
                                                    <span class="text-lg font-bold text-orange-800">{{
                                                        formatCurrency(totalOtherCosts) }}</span>
                                                </div>
                                            </div>

                                            <div class="mt-6 pt-4 border-t border-orange-200">
                                                <button type="button" @click="addOtherCost"
                                                    class="w-full flex flex-col items-center justify-center px-4 py-3 border-2 border-dashed border-orange-200 rounded-lg text-orange-700 hover:border-orange-300 hover:bg-orange-50 transition-colors">
                                                    <Plus class="w-5 h-5 mb-1" />
                                                    <span class="text-sm font-medium">Add Another Cost</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div v-else class="text-center py-4 text-orange-600">
                                            <p class="text-sm">No other costs yet</p>
                                            <p class="text-xs text-orange-500">Click "Add Cost" to add one</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Reimbursement Section -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('reimbursement')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Reimbursement Items</h3>
                                    <ChevronDown :class="{ 'rotate-180': !sections.reimbursement }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" />
                                </div>
                                <div v-show="sections.reimbursement" class="p-6">
                                    <div class="bg-purple-50 rounded-lg p-4">
                                        <div class="flex justify-between items-center mb-4">
                                            <h4 class="text-md font-semibold text-purple-800">Reimbursement Items</h4>
                                            <button type="button" @click="addReimbursementItem"
                                                class="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors">
                                                + Add Reimbursement
                                            </button>
                                        </div>

                                        <div v-if="reimbursementItems && reimbursementItems.length > 0"
                                            class="space-y-3">
                                            <div v-for="(item, index) in reimbursementItems" :key="'reimburse-' + index"
                                                class="relative border border-purple-200 rounded-lg p-3 pb-8 bg-white">
                                                <button type="button" @click="removeReimbursementItem(index)"
                                                    class="absolute bottom-2 right-4 px-2 py-1 flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors">
                                                    <Trash2 class="w-4 h-4" />
                                                </button>
                                                <div class="grid grid-cols-12 gap-3">
                                                    <div class="col-span-12">
                                                        <label
                                                            class="block text-xs font-medium text-purple-700 mb-1">Description</label>
                                                        <input v-model="item.description" type="text"
                                                            placeholder="Example: transport, accommodation, etc."
                                                            class="w-full px-3 py-2 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" />
                                                    </div>
                                                    <div class="col-span-6">
                                                        <label
                                                            class="block text-xs font-medium text-purple-700 mb-1">Qty</label>
                                                        <input v-model="item.quantity" type="number" min="0" step="0.01"
                                                            placeholder="1"
                                                            class="w-full px-3 py-2 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" />
                                                    </div>
                                                    <div class="col-span-6">
                                                        <label
                                                            class="block text-xs font-medium text-purple-700 mb-1">Unit</label>
                                                        <input v-model="item.unit" type="text" placeholder="Unit"
                                                            class="w-full px-3 py-2 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" />
                                                    </div>
                                                    <div class="col-span-12">
                                                        <label
                                                            class="block text-xs font-medium text-purple-700 mb-1">Amount</label>
                                                        <input v-model="item.amount" type="number" min="0" step="0.01"
                                                            placeholder="0"
                                                            class="w-full px-3 py-2 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" />
                                                    </div>
                                                    <div class="col-span-12">
                                                        <label
                                                            class="block text-xs font-medium text-purple-700 mb-1">Category</label>
                                                        <SearchableSelect v-model="item.category"
                                                            :options="reimbursementCategoryOptions"
                                                            placeholder="Select category" label-field="label"
                                                            value-field="value" sub-label-field="description"
                                                            :search-fields="['label', 'description']"
                                                            :input-class="`w-full px-3 py-2 pr-8 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${reimbursementCategoryOptions.length === 0 ? 'bg-gray-100 pointer-events-none' : ''}`" />
                                                        <p v-if="reimbursementCategoryOptions.length === 0"
                                                            class="text-xs text-purple-600 mt-1">
                                                            No categories available. Please add Operational Cost
                                                            Categories first.
                                                        </p>
                                                    </div>
                                                    <div class="col-span-12">
                                                        <label
                                                            class="block text-xs font-medium text-purple-700 mb-1">Vendor / Recipient</label>
                                                        <SearchableSelect v-model="item.vendor_id"
                                                            :options="vendorSelectOptions" placeholder="Select vendor"
                                                            :search-fields="['label']"
                                                            :input-class="'w-full px-3 py-2 pr-8 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500'" />
                                                        <p class="text-xs text-purple-600 mt-1">Select a vendor if you
                                                            already know who will be paid</p>
                                                    </div>
                                                </div>
                                                <div class="mt-2">
                                                    <label
                                                        class="block text-xs font-medium text-purple-700 mb-1">Notes
                                                        (optional)</label>
                                                    <textarea v-model="item.notes" rows="2"
                                                        placeholder="Additional notes for this reimbursement item"
                                                        class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 resize-none"></textarea>
                                                </div>
                                            </div>

                                            <div class="pt-3 border-t border-purple-300">
                                                <div class="flex justify-between items-center">
                                                    <span class="text-sm font-medium text-purple-700">Total
                                                        Reimbursement:</span>
                                                    <span class="text-lg font-bold text-purple-800">{{
                                                        formatCurrency(totalReimbursement) }}</span>
                                                </div>
                                            </div>

                                            <div class="mt-6 pt-4 border-t border-purple-200">
                                                <button type="button" @click="addReimbursementItem"
                                                    class="w-full flex flex-col items-center justify-center px-4 py-3 border-2 border-dashed border-purple-200 rounded-lg text-purple-700 hover:border-purple-300 hover:bg-purple-50 transition-colors">
                                                    <Plus class="w-5 h-5 mb-1" />
                                                    <span class="text-sm font-medium">Add Another Reimbursement</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div v-else class="text-center py-4 text-purple-600">
                                            <p class="text-sm">No reimbursement items yet</p>
                                            <p class="text-xs text-purple-500">Click "Add Reimbursement" to add one</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Goods Information -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('goods')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Goods Information</h3>
                                    <ChevronDown :class="{ 'rotate-180': !sections.goods }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" />
                                </div>
                                <div v-show="sections.goods" class="p-6 space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-sage-700 mb-2">COMMODITY / GOODS
                                            DESCRIPTION</label>
                                        <textarea v-model="form.commodity" rows="3"
                                            placeholder="Enter detailed goods/commodity description"
                                            class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"></textarea>
                                        <div v-if="form.errors.commodity" class="mt-2 text-sm text-red-600">{{
                                            form.errors.commodity
                                            }}</div>
                                    </div>
                                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div class="grid grid-cols-2 gap-3">
                                            <div>
                                                <label class="block text-sm font-medium text-sage-700 mb-2">QTY</label>
                                                <input v-model="form.qty" type="number" min="0"
                                                    placeholder="Enter quantity"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                                <div v-if="form.errors.qty" class="mt-2 text-sm text-red-600">{{
                                                    form.errors.qty }}
                                                </div>
                                            </div>
                                            <div>
                                                <label class="block text-sm font-medium text-sage-700 mb-2">Package
                                                    Unit</label>
                                                <select v-model="form.package_unit"
                                                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500">
                                                    <option value="">Select Unit</option>
                                                    <option v-for="unit in packageUnits" :key="unit.code"
                                                        :value="unit.code">
                                                        {{ unit.name }}
                                                    </option>
                                                </select>
                                                <div v-if="form.errors.package_unit" class="mt-2 text-sm text-red-600">
                                                    {{
                                                        form.errors.package_unit }}</div>
                                            </div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">NET WEIGHT
                                                (KG)</label>
                                            <input v-model="form.net_weight" type="number" step="0.01" min="0"
                                                placeholder="Enter net weight in kg"
                                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <div v-if="form.errors.net_weight" class="mt-2 text-sm text-red-600">{{
                                                form.errors.net_weight }}</div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">GROSS WEIGHT
                                                (KG)</label>
                                            <input v-model="form.gross_weight" type="number" step="0.01" min="0"
                                                placeholder="Enter gross weight in kg"
                                                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" />
                                            <div v-if="form.errors.gross_weight" class="mt-2 text-sm text-red-600">{{
                                                form.errors.gross_weight }}</div>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-sage-700 mb-2">MEAS
                                                (M3)</label>
                                            <input v-model="form.measurement" type="number" step="0.001" min="0" placeholder="Enter volume in m3"
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
                                                + Add Container
                                            </button>
                                        </div>
                                        <div v-for="(container, index) in form.container_no" :key="'container-' + index"
                                            class="flex gap-2 mb-2">
                                            <input v-model="form.container_no[index]" type="text"
                                                placeholder="Enter container number (example: TCLU1234567)"
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
                                                <Plus class="w-4 h-4 mr-2" />
                                                Add Another Container
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Invoice Information -->
                            <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
                                <div @click="toggleSection('invoice')"
                                    class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors">
                                    <h3 class="text-lg font-semibold text-sage-800">Invoice Information</h3>
                                    <ChevronDown :class="{ 'rotate-180': !sections.invoice }"
                                        class="w-5 h-5 text-sage-600 transition-transform duration-200" />
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


                            <!-- Submit Buttons -->
                            <div
                                class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6">
                                <Link :href="route('admin-cs.sales-orders.index')"
                                    class="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                    Cancel
                                </Link>
                                <button type="submit" :disabled="form.processing"
                                    class="inline-flex items-center justify-center px-6 py-2 bg-sage-800 text-white rounded-lg hover:bg-sage-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500">
                                    <svg v-if="form.processing" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                        fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4">
                                        </circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
                                    </svg>
                                    <span v-if="form.processing">Saving...</span>
                                    <span v-else>Save Shipping Order</span>
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
    </AdminCSLayout>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useForm, Link } from "@inertiajs/vue3";
import AdminCSLayout from "@/Layouts/AdminCSLayout.vue";
import AlertDialog from "@/Components/AlertDialog.vue";
import SearchableSelect from "@/Components/SearchableSelect.vue";
import { Plus, ArrowLeft, ChevronDown, Trash2 } from "lucide-vue-next";

const props = defineProps({
    customers: Array,
    vendors: Array,
    shipmentTypes: Array,
    serviceTypes: {
        type: Array,
        default: () => [],
    },
    operationalCostCategories: Array,
    packageUnits: {
        type: Array,
        default: () => [],
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

const shipmentTypeOptions = computed(() => {
    return (props.shipmentTypes ?? []).map(type => ({
        value: type.code,
        label: type.name || type.code,
        description: type.description || '',
    }));
});

const vendorSelectOptions = computed(() => {
    const baseOptions = [
        { value: 'internal', label: '-- Internal (Operations Division) --' },
    ];

    const vendorOptions = (props.vendors ?? []).map(vendor => ({
        value: vendor.id,
        label: vendor.nama_vendor,
    }));

    return [...baseOptions, ...vendorOptions];
});

const serviceTypeOptions = computed(() => {
    return (props.serviceTypes ?? []).map(type => ({
        value: type.code,
        label: type.code,
        subLabel: type.description || '',
    }));
});

const operationalCostCategories = computed(() => props.operationalCostCategories ?? []);
const operationalCostCategorySelectOptions = computed(() => {
    return (operationalCostCategories.value ?? []).map(category => ({
        value: category.id,
        label: category.name,
        description: category.description || "",
    }));
});

const serviceTypeMap = computed(() => {
    return (props.serviceTypes ?? []).reduce((acc, type) => {
        acc[type.code] = type.description || type.code;
        return acc;
    }, {});
});

const isKnownServiceType = (code) => {
    if (!code) {
        return false;
    }
    return Object.prototype.hasOwnProperty.call(serviceTypeMap.value, code);
};

const getServiceTypeOptions = (currentValue) => {
    if (!currentValue || isKnownServiceType(currentValue)) {
        return serviceTypeOptions.value;
    }
    return [
        ...serviceTypeOptions.value,
        { value: currentValue, label: currentValue, subLabel: '' },
    ];
};


// Vendor details data - supports multiple vendors
// Removed vendorDetails as vendor selection is now integrated into buying_breakdown

// Collapseable sections state
const sections = ref({
    basic: true,
    shipping: false,
    pricing: false,
    other_costs: false,
    reimbursement: false,
    goods: false,
    invoice: false,
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
    exchange_rate: "",
    vendor_breakdown: [{ id: null, vendor_id: '', nama_vendor: '', no_rekening: '', nama_rekening: '', description: '', quantity: '', unit: '', buying_amount: 0, selling_amount: 0, rcvd_inv: '', remarks: '' }],
    other_costs: [],
    remarks: "",
    note: "",
    commodity: "",
    qty: "",
    package_unit: "BAG",
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
        id: null,
        vendor_id: '',
        nama_vendor: '',
        no_rekening: '',
        nama_rekening: '',
        description: '',
        quantity: '',
        unit: '',
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

// Other costs management methods
const addOtherCost = () => {
    form.other_costs.push({
        description: '',
        amount: 0,
        category: '',
        category_id: '',
        category_name: '',
        quantity: '',
        unit: '',
        vendor_id: '' // Vendor/penerima pembayaran
    });
};

const removeOtherCost = (index) => {
    if (form.other_costs.length > 0) {
        form.other_costs.splice(index, 1);
    }
};

const onOtherCostCategoryChange = (cost) => {
    if (!cost) {
        return;
    }

    const categories = operationalCostCategories.value ?? [];
    const selected = categories.find(
        (category) => String(category.id) === String(cost.category_id)
    );

    cost.category_name = selected?.name || cost.category_name || '';
    cost.category = cost.category_name || cost.category || '';
};

const syncOtherCostCategorySelections = () => {
    if (!Array.isArray(form.other_costs)) {
        return;
    }

    const categories = operationalCostCategories.value ?? [];

    form.other_costs.forEach((cost) => {
        if (!cost) {
            return;
        }

        const currentLabel = (cost.category_name || cost.category || '').toString().trim();

        if (cost.category_id) {
            const match = categories.find(
                (category) => String(category.id) === String(cost.category_id)
            );
            if (match) {
                cost.category_name = match.name;
                cost.category = match.name;
            }
        } else if (currentLabel !== '') {
            const labelLower = currentLabel.toLowerCase();
            const match = categories.find(
                (category) => (category.name || '').toLowerCase() === labelLower
            );
            if (match) {
                cost.category_id = String(match.id);
                cost.category_name = match.name;
                cost.category = match.name;
            }
        }
    });
};

watch(
    () => props.operationalCostCategories,
    () => {
        syncOtherCostCategorySelections();
    },
    { immediate: true }
);

// Format cost amount input to handle Indonesian number format
const formatCostAmount = (cost, event) => {
    let value = event.target.value;

    // Remove any non-numeric characters except dots and commas
    value = value.replace(/[^\d.,]/g, '');

    // Store the raw input for backend processing
    cost.amount = value;
};

// Format vendor amount input to handle Indonesian number format
const formatVendorAmount = (item, field, event) => {
    let value = event.target.value;

    // Remove any non-numeric characters except dots and commas
    value = value.replace(/[^\d.,]/g, '');

    // Store the raw input for backend processing
    item[field] = value;
};

// Helper function to normalize Indonesian number format for calculation
const normalizeNumber = (value) => {
    if (!value) return 0;

    let normalized = value.toString().trim();

    // Hilangkan karakter selain digit, titik, dan koma
    normalized = normalized.replace(/[^\d.,]/g, '');

    const commaCount = (normalized.match(/,/g) || []).length;
    const dotCount = (normalized.match(/\./g) || []).length;

    if (commaCount > 1 && dotCount === 0) {
        // Format internasional: 1,000,000
        normalized = normalized.replace(/,/g, '');
    } else if (dotCount > 1 && commaCount === 0) {
        // Format Indonesia: 1.000.000
        normalized = normalized.replace(/\./g, '');
    } else if (commaCount > 0 && dotCount > 0) {
        // Mixed -> anggap Indonesia (titik ribuan, koma desimal)
        normalized = normalized.replace(/\./g, '').replace(',', '.');
    } else if (commaCount === 1 && dotCount === 0) {
        normalized = normalized.replace(',', '.');
    }

    // Pastikan hanya satu titik desimal
    if ((normalized.match(/\./g) || []).length > 1) {
        const parts = normalized.split('.');
        const decimal = parts.pop();
        normalized = parts.join('') + (decimal ? '.' + decimal : '');
    }

    const parsed = parseFloat(normalized);
    return Number.isNaN(parsed) ? 0 : parsed;
};

const resolveQuantityValue = (rawValue) => {
    if (rawValue === '' || rawValue === null || rawValue === undefined) {
        return 1;
    }

    const parsed = normalizeNumber(rawValue);
    return parsed > 0 ? parsed : 0;
};

const getVendorLineTotal = (item, field) => {
    const quantity = resolveQuantityValue(item.quantity);
    return quantity * normalizeNumber(item[field]);
};

const getOtherCostLineTotal = (cost) => {
    const quantity = resolveQuantityValue(cost.quantity);
    return quantity * normalizeNumber(cost.amount);
};

// Reimbursement items management
const reimbursementItems = ref([]);

const baseOperationalCostCategoryOptions = computed(() => {
    return (props.operationalCostCategories ?? []).map(category => ({
        value: category.name,
        label: category.name,
        description: category.description || "",
    }));
});

const reimbursementCategoryOptions = computed(() => {
    const optionMap = new Map(baseOperationalCostCategoryOptions.value.map(option => [option.value, option]));

    reimbursementItems.value.forEach(item => {
        if (item.category && !optionMap.has(item.category)) {
            optionMap.set(item.category, {
                value: item.category,
                label: item.category,
                description: "",
            });
        }
    });

    return Array.from(optionMap.values());
});

const addReimbursementItem = () => {
    reimbursementItems.value.push({
        description: '',
        amount: 0,
        quantity: '',
        unit: '',
        category: '',
        notes: '',
        vendor_id: '' // Vendor/penerima pembayaran
    });
};

const removeReimbursementItem = (index) => {
    if (reimbursementItems.value.length > 0) {
        reimbursementItems.value.splice(index, 1);
    }
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount || 0);
};

// Format number with thousand separators
const formatNumber = (amount) => {
    return new Intl.NumberFormat('en-US').format(amount || 0);
};


// Helper functions for qty-based calculation
const getTotalBuyingAmount = (item) => {
    const unitPrice = normalizeNumber(item.buying_amount);
    const qty = parseFloat(item.quantity) || 1;
    return unitPrice * qty;
};

const getTotalSellingAmount = (item) => {
    const unitPrice = normalizeNumber(item.selling_amount);
    const qty = parseFloat(item.quantity) || 1;
    return unitPrice * qty;
};

const getTotalCostAmount = (cost) => {
    const unitPrice = normalizeNumber(cost.amount);
    const qty = parseFloat(cost.quantity) || 1;
    return unitPrice * qty;
};

const onBuyingAmountInput = (item) => {
    // Placeholder for future logic if needed
};

const onSellingAmountInput = (item) => {
    // Placeholder for future logic if needed
};

const onCostAmountInput = (cost) => {
    // Placeholder for future logic if needed
};

const recalculateVendorAmounts = (item) => {
    // Trigger recalculation
    calculateTotals();
};

const recalculateCostAmount = (cost) => {
    // Trigger recalculation happens automatically via computed
};

// Computed properties for totals
const totalBuying = computed(() => {
    return form.vendor_breakdown.reduce((sum, item) => sum + getTotalBuyingAmount(item), 0);
});

const totalSelling = computed(() => {
    return form.vendor_breakdown.reduce((sum, item) => sum + getTotalSellingAmount(item), 0);
});

const totalRevenue = computed(() => {
    return totalSelling.value - (totalBuying.value + totalOtherCosts.value + totalReimbursement.value);
});

const totalOtherCosts = computed(() => {
    return form.other_costs.reduce((sum, item) => sum + getTotalCostAmount(item), 0);
});

const getReimbursementLineTotal = (item) => {
    const quantity = resolveQuantityValue(item.quantity);
    return quantity * normalizeNumber(item.amount);
};

const totalReimbursement = computed(() => {
    return reimbursementItems.value.reduce((sum, item) => sum + getReimbursementLineTotal(item), 0);
});

// Get profit for individual vendor item
const getProfit = (vendorItem) => {
    const buyingTotal = getTotalBuyingAmount(vendorItem);
    const sellingTotal = getTotalSellingAmount(vendorItem);
    return sellingTotal - buyingTotal;
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

// Computed property removed - vendor costs are now part of buying breakdown total

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
    // Debug order number value
    console.log('Order number from props:', props.orderNumber);
    console.log('Order number in form:', form.order_number);
    console.log('Form data before submit:', form.data());

    const sanitizedOtherCosts = (form.other_costs || [])
        .filter(cost => {
            const description = (cost.description || '').toString().trim();
            const amount = normalizeNumber(cost.amount);
            const category = (cost.category || cost.category_name || '').toString().trim();
            const vendor = cost.vendor_id !== undefined && cost.vendor_id !== null
                ? cost.vendor_id.toString().trim()
                : '';

            return description !== '' || amount > 0 || category !== '' || vendor !== '';
        })
        .map(cost => ({
            description: cost.description || '',
            amount: normalizeNumber(cost.amount),
            category_id: cost.category_id || '',
            category_name: cost.category_name || cost.category || '',
            category: cost.category_name || cost.category || '',
            quantity: cost.quantity !== '' ? parseFloat(cost.quantity) || cost.quantity : '',
            unit: cost.unit || '',
            vendor_id: cost.vendor_id === '' ? null : cost.vendor_id,
        }));

    const sanitizedReimbursements = (reimbursementItems.value || [])
        .filter(item => {
            const description = (item.description || '').toString().trim();
            const amount = normalizeNumber(item.amount);
            const category = (item.category || '').toString().trim();
            const vendor = item.vendor_id !== undefined && item.vendor_id !== null
                ? item.vendor_id.toString().trim()
                : '';

            return description !== '' || amount > 0 || category !== '' || vendor !== '';
        })
        .map(item => ({
            description: item.description || '',
            amount: normalizeNumber(item.amount),
            quantity: item.quantity !== '' ? parseFloat(item.quantity) || item.quantity : '',
            unit: item.unit || '',
            category: item.category || '',
            notes: item.notes || '',
            vendor_id: item.vendor_id === '' ? null : item.vendor_id,
        }));

    const cleanedVendorBreakdown = form.vendor_breakdown.map(item => ({
        ...item,
        quantity: item.quantity !== '' ? parseFloat(item.quantity) || item.quantity : '',
        unit: item.unit || '',
        buying_amount: normalizeNumber(item.buying_amount),
        selling_amount: normalizeNumber(item.selling_amount),
    }));

    const formData = {
        ...form.data(),
        vendor_breakdown: cleanedVendorBreakdown,
        other_costs: sanitizedOtherCosts,
        reimbursement_items: sanitizedReimbursements,
    };

    console.log('Final form data to submit:', formData);

    form.transform(() => formData).post(route("admin-cs.sales-orders.store"), {
        onSuccess: (page) => {
            console.log('Success response received:', page);
            console.log('Page component:', page.component);
            console.log('Page props:', page.props);
            console.log('Flash messages:', page.props?.flash);

            // Check if this is actually the index page (successful redirect)
            if (page.component === 'Admin/AdminCS/SalesOrders/Index') {
                console.log('Successfully redirected to index page');
                // We're already on the index page, no need for additional redirect
                showAlert("success", "Success", "Shipping Order created successfully.");
            } else {
                console.log('Not redirected to index, component:', page.component);
                showAlert("success", "Success", "Shipping Order created successfully.", "OK", "", () => {
                    // Redirect to index page after user acknowledges success
                    window.location.href = route('admin-cs.sales-orders.index');
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
                    : "There are errors in the form. Please review the entered data.";

                showAlert("error", "Save Failed", errorMessage);
            } else {
                showAlert("error", "Save Failed", "An error occurred while saving the shipping order. Please try again.");
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
    color: #4b5563;
}

.text-sage-700 {
    color: #374151;
}

.text-sage-800 {
    color: #1f2937;
}

.text-sage-500 {
    color: #6b7280;
}

.bg-sage-50 {
    background-color: #f9fafb;
}

.bg-sage-100 {
    background-color: #f3f4f6;
}

.bg-sage-600 {
    background-color: #8db580;
}

.bg-sage-700 {
    background-color: #7ba169;
}

.bg-sage-800 {
    background-color: #6b8f5e;
}

.bg-sage-900 {
    background-color: #5a7a4f;
}

.border-sage-200 {
    border-color: #e5e7eb;
}

.border-sage-300 {
    border-color: #d1d5db;
}

.hover\:bg-sage-100:hover {
    background-color: #f3f4f6;
}

.hover\:bg-sage-700:hover {
    background-color: #7ba169;
}

.hover\:bg-sage-900:hover {
    background-color: #5a7a4f;
}

.focus\:ring-sage-500:focus {
    --tw-ring-color: #8db580;
}

.focus\:border-sage-500:focus {
    border-color: #8db580;
}
</style>
