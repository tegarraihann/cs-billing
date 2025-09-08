<template>
  <AdminKeuanganLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">Edit Sales Order: {{ salesOrder.order_number }}</h2>
              <p class="text-sage-600">Edit dokumen sales order dari admin CS</p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0">
            <Link
              :href="route('admin-keuangan.sales-orders.index')"
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

      <!-- Form Section -->
      <form @submit.prevent="submit" class="space-y-6">

        <!-- Basic Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div
            @click="toggleSection('basic')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Dasar</h3>
            <svg
              :class="{'rotate-180': !sections.basic}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.basic" class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">ORDER NUMB <span class="text-red-500">*</span></label>
                <input
                  v-model="form.order_number"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.order_number" class="mt-2 text-sm text-red-600">{{ form.errors.order_number }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">REF NO</label>
                <input
                  v-model="form.ref_no"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.ref_no" class="mt-2 text-sm text-red-600">{{ form.errors.ref_no }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">DATE</label>
                <input
                  v-model="form.so_date"
                  type="date"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.so_date" class="mt-2 text-sm text-red-600">{{ form.errors.so_date }}</div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">CUSTOMER <span class="text-red-500">*</span></label>
              <input
                v-model="form.customer"
                type="text"
                required
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="form.errors.customer" class="mt-2 text-sm text-red-600">{{ form.errors.customer }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">SHIPPER</label>
              <input
                v-model="form.shipper"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="form.errors.shipper" class="mt-2 text-sm text-red-600">{{ form.errors.shipper }}</div>
            </div>
          </div>
        </div>

        <!-- Shipping Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div
            @click="toggleSection('shipping')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Pengiriman</h3>
            <svg
              :class="{'rotate-180': !sections.shipping}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.shipping" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">BL/AWB</label>
              <input
                v-model="form.bl_awb"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="form.errors.bl_awb" class="mt-2 text-sm text-red-600">{{ form.errors.bl_awb }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">LINER</label>
              <input
                v-model="form.liner"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="form.errors.liner" class="mt-2 text-sm text-red-600">{{ form.errors.liner }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">VESSEL</label>
              <input
                v-model="form.vessel"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="form.errors.vessel" class="mt-2 text-sm text-red-600">{{ form.errors.vessel }}</div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">ETA</label>
                <input
                  v-model="form.eta"
                  type="date"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.eta" class="mt-2 text-sm text-red-600">{{ form.errors.eta }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">ETD</label>
                <input
                  v-model="form.etd"
                  type="date"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.etd" class="mt-2 text-sm text-red-600">{{ form.errors.etd }}</div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">AJU</label>
              <input
                v-model="form.aju"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="form.errors.aju" class="mt-2 text-sm text-red-600">{{ form.errors.aju }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">SPPB DATE</label>
              <input
                v-model="form.sppb_date"
                type="date"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="form.errors.sppb_date" class="mt-2 text-sm text-red-600">{{ form.errors.sppb_date }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">SHIPMENT TYPE</label>
              <select
                v-model="form.shipment_type"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              >
                <option value="">Pilih Shipment Type</option>
                <option v-for="shipmentType in shipmentTypes" :key="shipmentType.id" :value="shipmentType.code">
                  {{ shipmentType.name }}
                </option>
              </select>
              <div v-if="form.errors.shipment_type" class="mt-2 text-sm text-red-600">{{ form.errors.shipment_type }}</div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">POL</label>
                <input
                  v-model="form.pol"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.pol" class="mt-2 text-sm text-red-600">{{ form.errors.pol }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">POD</label>
                <input
                  v-model="form.pod"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.pod" class="mt-2 text-sm text-red-600">{{ form.errors.pod }}</div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">GUDANG/UTC</label>
                <input
                  v-model="form.gudang_utc"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.gudang_utc" class="mt-2 text-sm text-red-600">{{ form.errors.gudang_utc }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">PARTY/LCL</label>
                <input
                  v-model="form.party_lcl"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.party_lcl" class="mt-2 text-sm text-red-600">{{ form.errors.party_lcl }}</div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">PREPARED BY</label>
              <input
                v-model="form.prepared_by"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="form.errors.prepared_by" class="mt-2 text-sm text-red-600">{{ form.errors.prepared_by }}</div>
            </div>
          </div>
        </div>

        <!-- Pricing Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div
            @click="toggleSection('pricing')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Vendor & Pricing</h3>
            <svg
              :class="{'rotate-180': !sections.pricing}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.pricing" class="p-6 space-y-6">
            
            <!-- Exchange Rate -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">EXCHANGE RATE</label>
              <input
                v-model="form.exchange_rate"
                @input="formatExchangeRate"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 font-mono"
                placeholder="14.000"
              />
              <div v-if="form.errors.exchange_rate" class="mt-2 text-sm text-red-600">{{ form.errors.exchange_rate }}</div>
            </div>
            
            <!-- Vendor Breakdown Section -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-lg font-semibold text-sage-800">Vendor Breakdown</h4>
                <button
                  type="button"
                  @click="addVendorItem"
                  class="inline-flex items-center px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Vendor Item
                </button>
              </div>
              
              <!-- Vendor Items -->
              <div v-if="form.vendor_breakdown.length === 0" class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <div class="text-gray-400 mb-2">
                  <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p class="text-gray-500">No vendor items added yet. Click "Add Vendor Item" to start.</p>
              </div>
              
              <div v-for="(item, index) in form.vendor_breakdown" :key="`vendor-${index}`" class="border border-gray-200 rounded-lg p-4 space-y-4">
                <div class="flex justify-between items-center">
                  <h5 class="font-medium text-sage-700">Vendor Item #{{ index + 1 }}</h5>
                  <button
                    type="button"
                    @click="removeVendorItem(index)"
                    class="text-red-600 hover:text-red-800 p-1"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <!-- Vendor Selection -->
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-2">
                      Vendor <span class="text-red-500">*</span>
                    </label>
                    <select
                      v-model="item.vendor_id"
                      @change="onVendorSelect(index)"
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    >
                      <option value="">Pilih vendor...</option>
                      <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">
                        {{ vendor.nama_vendor }}
                      </option>
                    </select>
                  </div>

                  <!-- Service Description -->
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-2">
                      Service Description
                    </label>
                    <input
                      v-model="item.description"
                      type="text"
                      placeholder="Deskripsi layanan vendor"
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                </div>

                <!-- Vendor Info Display -->
                <div v-if="item.vendor_id" class="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-sage-50 rounded-lg">
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-1">Nama Vendor</label>
                    <p class="text-sm text-gray-900">{{ item.nama_vendor || '-' }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-1">Nomor Rekening</label>
                    <p class="text-sm text-gray-900 font-mono">{{ item.no_rekening || '-' }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-1">Nama Rekening</label>
                    <p class="text-sm text-gray-900">{{ item.nama_rekening || '-' }}</p>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- Buying Amount -->
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-2">
                      Buying Amount <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="item.buying_amount"
                      @input="formatNumber(item, 'buying_amount')"
                      type="text"
                      placeholder="0"
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 font-mono"
                    />
                  </div>

                  <!-- Selling Amount -->
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-2">
                      Selling Amount <span class="text-red-500">*</span>
                    </label>
                    <input
                      v-model="item.selling_amount"
                      @input="formatNumber(item, 'selling_amount')"
                      type="text"
                      placeholder="0"
                      class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 font-mono"
                    />
                  </div>

                  <!-- Profit (Auto calculated) -->
                  <div>
                    <label class="block text-sm font-medium text-sage-700 mb-2">Profit (Auto)</label>
                    <input
                      :value="formatCurrency(getItemProfit(item))"
                      readonly
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono"
                      :class="getItemProfit(item) >= 0 ? 'text-sage-700' : 'text-red-600'"
                    />
                  </div>
                </div>

                <!-- Remarks -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">Remarks</label>
                  <textarea
                    v-model="item.remarks"
                    rows="2"
                    placeholder="Catatan untuk vendor ini..."
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                  ></textarea>
                </div>
              </div>

              <!-- Summary -->
              <div v-if="form.vendor_breakdown.length > 0" class="mt-6 p-4 bg-gradient-to-r from-sage-50 to-blue-50 border border-sage-200 rounded-lg">
                <h4 class="font-semibold text-sage-800 mb-3">Summary</h4>
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div class="text-sm text-gray-600">Total Items</div>
                    <div class="text-xl font-bold text-sage-700">{{ form.vendor_breakdown.length }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Total Buying</div>
                    <div class="text-xl font-bold text-blue-700">{{ formatCurrency(totalBuying) }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Total Selling</div>
                    <div class="text-xl font-bold text-green-700">{{ formatCurrency(totalSelling) }}</div>
                  </div>
                  <div>
                    <div class="text-sm text-gray-600">Total Profit</div>
                    <div class="text-xl font-bold" :class="totalProfit >= 0 ? 'text-sage-700' : 'text-red-600'">
                      {{ formatCurrency(totalProfit) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div
            @click="toggleSection('additional')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Tambahan</h3>
            <svg
              :class="{'rotate-180': !sections.additional}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.additional" class="p-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">COMMODITY/URAIAN BARANG</label>
                <input
                  v-model="form.commodity"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.commodity" class="mt-2 text-sm text-red-600">{{ form.errors.commodity }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">QTY</label>
                <input
                  v-model="form.qty"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.qty" class="mt-2 text-sm text-red-600">{{ form.errors.qty }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">NET WEIGHT (KG)</label>
                <input
                  v-model="form.net_weight"
                  type="number"
                  step="0.01"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.net_weight" class="mt-2 text-sm text-red-600">{{ form.errors.net_weight }}</div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">MEAS (M³)</label>
                <input
                  v-model="form.measurement"
                  type="number"
                  step="0.001"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.measurement" class="mt-2 text-sm text-red-600">{{ form.errors.measurement }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">CONTAINER NO</label>
                <input
                  v-model="form.container_no"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.container_no" class="mt-2 text-sm text-red-600">{{ form.errors.container_no }}</div>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">INVOICE NUMB</label>
                <input
                  v-model="form.invoice_number"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.invoice_number" class="mt-2 text-sm text-red-600">{{ form.errors.invoice_number }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">INVOICE DATE</label>
                <input
                  v-model="form.invoice_date"
                  type="date"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.invoice_date" class="mt-2 text-sm text-red-600">{{ form.errors.invoice_date }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">T.O.P</label>
                <input
                  v-model="form.top"
                  type="text"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.top" class="mt-2 text-sm text-red-600">{{ form.errors.top }}</div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">REMARKS</label>
              <textarea
                v-model="form.remarks"
                rows="3"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                placeholder="Catatan umum untuk sales order ini..."
              ></textarea>
              <div v-if="form.errors.remarks" class="mt-2 text-sm text-red-600">{{ form.errors.remarks }}</div>
            </div>
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">NOTE</label>
              <textarea
                v-model="form.note"
                rows="3"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                placeholder="Catatan tambahan..."
              ></textarea>
              <div v-if="form.errors.note" class="mt-2 text-sm text-red-600">{{ form.errors.note }}</div>
            </div>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6">
          <Link
            :href="route('admin-keuangan.sales-orders.index')"
            class="inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            :disabled="form.processing || form.vendor_breakdown.length === 0"
            class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              v-if="form.processing"
              class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span v-if="form.processing">Memperbarui...</span>
            <span v-else>Perbarui Sales Order</span>
          </button>
        </div>
      </form>
    </div>
  </AdminKeuanganLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useForm, Link } from "@inertiajs/vue3";
import AdminKeuanganLayout from "@/Layouts/AdminKeuanganLayout.vue";

const props = defineProps({
  salesOrder: Object,
  vendors: Array,
  shipmentTypes: Array,
});

// Section management
const sections = ref({
  basic: true,
  shipping: true,
  pricing: true,
  additional: true,
});

const toggleSection = (section) => {
  sections.value[section] = !sections.value[section];
};

// Form setup
const form = useForm({
  order_number: props.salesOrder.order_number || "",
  ref_no: props.salesOrder.ref_no || "",
  so_date: props.salesOrder.so_date ? props.salesOrder.so_date.split('T')[0] : "",
  customer: props.salesOrder.customer || "",
  shipper: props.salesOrder.shipper || "",
  bl_awb: props.salesOrder.bl_awb || "",
  liner: props.salesOrder.liner || "",
  vessel: props.salesOrder.vessel || "",
  eta: props.salesOrder.eta ? props.salesOrder.eta.split('T')[0] : "",
  etd: props.salesOrder.etd ? props.salesOrder.etd.split('T')[0] : "",
  aju: props.salesOrder.aju || "",
  sppb_date: props.salesOrder.sppb_date ? props.salesOrder.sppb_date.split('T')[0] : "",
  shipment_type: props.salesOrder.shipment_type || "",
  pol: props.salesOrder.pol || "",
  pod: props.salesOrder.pod || "",
  gudang_utc: props.salesOrder.gudang_utc || "",
  party_lcl: props.salesOrder.party_lcl || "",
  prepared_by: props.salesOrder.prepared_by || "",
  exchange_rate: props.salesOrder.exchange_rate || "",
  commodity: props.salesOrder.commodity || "",
  qty: props.salesOrder.qty || "",
  net_weight: props.salesOrder.net_weight || "",
  measurement: props.salesOrder.measurement || "",
  container_no: props.salesOrder.container_no || "",
  invoice_number: props.salesOrder.invoice_number || "",
  invoice_date: props.salesOrder.invoice_date ? props.salesOrder.invoice_date.split('T')[0] : "",
  top: props.salesOrder.top || "",
  remarks: props.salesOrder.remarks || "",
  note: props.salesOrder.note || "",
  vendor_breakdown: [],
});

// Initialize vendor breakdown from existing data
onMounted(() => {
  if (props.salesOrder.vendor_breakdown && props.salesOrder.vendor_breakdown.length > 0) {
    form.vendor_breakdown = props.salesOrder.vendor_breakdown.map(item => ({
      vendor_id: item.vendor_id || "",
      nama_vendor: item.nama_vendor || "",
      no_rekening: item.no_rekening || "",
      nama_rekening: item.nama_rekening || "",
      description: item.description || "",
      buying_amount: item.buying_amount || "",
      selling_amount: item.selling_amount || "",
      remarks: item.remarks || "",
    }));
  } else {
    // Add one empty item if none exists
    addVendorItem();
  }
  
  // Format exchange rate if exists
  if (form.exchange_rate) {
    formatExchangeRate();
  }
});

// Vendor management functions
const addVendorItem = () => {
  form.vendor_breakdown.push({
    vendor_id: "",
    nama_vendor: "",
    no_rekening: "",
    nama_rekening: "",
    description: "",
    buying_amount: "",
    selling_amount: "",
    remarks: "",
  });
};

const removeVendorItem = (index) => {
  if (form.vendor_breakdown.length > 1) {
    form.vendor_breakdown.splice(index, 1);
  }
};

const onVendorSelect = (index) => {
  const selectedVendor = props.vendors.find(v => v.id == form.vendor_breakdown[index].vendor_id);
  if (selectedVendor) {
    form.vendor_breakdown[index].nama_vendor = selectedVendor.nama_vendor;
    form.vendor_breakdown[index].no_rekening = selectedVendor.nomor_rekening;
    form.vendor_breakdown[index].nama_rekening = selectedVendor.nama_rekening;
  }
};

// Number formatting functions
const formatNumber = (item, field) => {
  const value = item[field];
  if (!value) return;
  
  // Remove non-numeric characters
  const numericValue = value.toString().replace(/[^\d]/g, '');
  
  // Add dot separators
  const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
  item[field] = formatted;
};

const formatExchangeRate = () => {
  const value = form.exchange_rate;
  if (!value) return;
  
  // Remove non-numeric characters and dots
  const numericValue = value.toString().replace(/[^\d.]/g, '');
  
  // Split by decimal point
  const parts = numericValue.split('.');
  
  // Format integer part with dot separators
  if (parts[0]) {
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  
  // Rejoin with decimal point
  form.exchange_rate = parts.join('.');
};

const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return 'Rp 0';
  
  const numericValue = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d]/g, '')) || 0 : amount;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue);
};

// Calculate totals and profit
const totalBuying = computed(() => {
  return form.vendor_breakdown.reduce((sum, item) => {
    const amount = parseFloat((item.buying_amount || '0').toString().replace(/[^\d]/g, '')) || 0;
    return sum + amount;
  }, 0);
});

const totalSelling = computed(() => {
  return form.vendor_breakdown.reduce((sum, item) => {
    const amount = parseFloat((item.selling_amount || '0').toString().replace(/[^\d]/g, '')) || 0;
    return sum + amount;
  }, 0);
});

const totalProfit = computed(() => {
  return totalSelling.value - totalBuying.value;
});

const getItemProfit = (item) => {
  const buying = parseFloat((item.buying_amount || '0').toString().replace(/[^\d]/g, '')) || 0;
  const selling = parseFloat((item.selling_amount || '0').toString().replace(/[^\d]/g, '')) || 0;
  return selling - buying;
};

// Submit form
const submit = () => {
  // Clean up data before submission
  const cleanedData = {
    ...form.data(),
    vendor_breakdown: form.vendor_breakdown.map(item => ({
      ...item,
      buying_amount: (item.buying_amount || '0').toString().replace(/[^\d]/g, ''),
      selling_amount: (item.selling_amount || '0').toString().replace(/[^\d]/g, ''),
    })),
    exchange_rate: form.exchange_rate.toString().replace(/\./g, '')
  };

  form.transform(() => cleanedData).put(route("admin-keuangan.sales-orders.update", props.salesOrder.id), {
    onError: (errors) => {
      console.error("Validation errors:", errors);
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
  background-color: #eef3eb;
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
  background-color: #eef3eb;
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