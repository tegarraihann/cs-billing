<template>
  <AdminLayout>
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
              <p class="text-sage-600">Edit dokumen sales order</p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0">
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
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">ORDER NUMB *</label>
              <input
                v-model="form.order_number"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                required
              />
              <div v-if="errors.order_number" class="text-red-600 text-sm mt-1">{{ errors.order_number }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">CUSTOMER *</label>
              <input
                v-model="form.customer"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                required
              />
              <div v-if="errors.customer" class="text-red-600 text-sm mt-1">{{ errors.customer }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">SHIPPER</label>
              <input
                v-model="form.shipper"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.shipper" class="text-red-600 text-sm mt-1">{{ errors.shipper }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">BL/AWB</label>
              <input
                v-model="form.bl_awb"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.bl_awb" class="text-red-600 text-sm mt-1">{{ errors.bl_awb }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">PREPARED BY</label>
              <input
                v-model="form.prepared_by"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.prepared_by" class="text-red-600 text-sm mt-1">{{ errors.prepared_by }}</div>
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
              <label class="block text-sm font-medium text-sage-700 mb-2">LINER</label>
              <input
                v-model="form.liner"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.liner" class="text-red-600 text-sm mt-1">{{ errors.liner }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">VESSEL</label>
              <input
                v-model="form.vessel"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.vessel" class="text-red-600 text-sm mt-1">{{ errors.vessel }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">ETA</label>
              <input
                v-model="form.eta"
                type="date"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.eta" class="text-red-600 text-sm mt-1">{{ errors.eta }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">AJU</label>
              <input
                v-model="form.aju"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.aju" class="text-red-600 text-sm mt-1">{{ errors.aju }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">SPPB DATE</label>
              <input
                v-model="form.sppb_date"
                type="date"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.sppb_date" class="text-red-600 text-sm mt-1">{{ errors.sppb_date }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">SHIPMENT TYPE</label>
              <select
                v-model="form.shipment_type"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              >
                <option value="">Pilih Shipment Type</option>
                <option value="FCL">FCL</option>
                <option value="LCL">LCL</option>
                <option value="AIR">AIR</option>
                <option value="SEA">SEA</option>
                <option value="LAND">LAND</option>
                <option value="Trucking">Trucking</option>
                <option value="Import">Import</option>
                <option value="Domestik">Domestik</option>
                <option value="Door to Door Domestik">Door to Door Domestik</option>
                <option value="Warehouse">Warehouse</option>
                <option value="Door to Door Import">Door to Door Import</option>
                <option value="Export">Export</option>
              </select>
              <div v-if="errors.shipment_type" class="text-red-600 text-sm mt-1">{{ errors.shipment_type }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">POL</label>
              <input
                v-model="form.pol"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.pol" class="text-red-600 text-sm mt-1">{{ errors.pol }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">POD</label>
              <input
                v-model="form.pod"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.pod" class="text-red-600 text-sm mt-1">{{ errors.pod }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">GUDANG/UTC</label>
              <input
                v-model="form.gudang_utc"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.gudang_utc" class="text-red-600 text-sm mt-1">{{ errors.gudang_utc }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">PARTY/LCL</label>
              <input
                v-model="form.party_lcl"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.party_lcl" class="text-red-600 text-sm mt-1">{{ errors.party_lcl }}</div>
            </div>
          </div>
        </div>

        <!-- Pricing Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div 
            @click="toggleSection('pricing')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Harga</h3>
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
          <div v-show="sections.pricing" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">EXCHANGE RATE</label>
              <input
                v-model="form.exchange_rate"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.exchange_rate" class="text-red-600 text-sm mt-1">{{ errors.exchange_rate }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">JENIS BIAYA</label>
              <select
                v-model="form.jenis_biaya"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              >
                <option value="">-- Pilih Jenis Biaya --</option>
                <option value="OF/AF">OF/AF</option>
                <option value="HANDLING">HANDLING</option>
                <option value="PIB EDI">PIB EDI</option>
                <option value="ADMIN DOC">ADMIN DOC</option>
                <option value="TRUCKING">TRUCKING</option>
                <option value="D/O CHARGES">D/O CHARGES</option>
                <option value="LOLO">LOLO</option>
                <option value="STORAGE">STORAGE</option>
                <option value="REFUND">REFUND</option>
                <option value="OTHER">OTHER</option>
              </select>
              <div v-if="errors.jenis_biaya" class="text-red-600 text-sm mt-1">{{ errors.jenis_biaya }}</div>
            </div>

            <!-- Buying Breakdown -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <label class="block text-sm font-medium text-sage-700">BUYING BREAKDOWN</label>
                <button
                  type="button"
                  @click="addBuyingItem"
                  class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Item
                </button>
              </div>
              <div class="space-y-3">
                <div v-for="(item, index) in form.buying_breakdown" :key="'buying-' + index" class="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border border-gray-200 rounded-lg">
                  <div class="md:col-span-6">
                    <input
                      v-model="item.vendor"
                      type="text"
                      placeholder="Vendor name"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <div class="md:col-span-5">
                    <input
                      v-model="item.amount"
                      type="number"
                      step="0.01"
                      placeholder="Amount"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <div class="md:col-span-1">
                    <button
                      type="button"
                      @click="removeBuyingItem(index)"
                      class="w-full h-10 text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:border-red-400 transition-colors"
                    >
                      <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-2 p-2 bg-gray-50 rounded-md">
                <strong>Total Buying: {{ formatCurrency(totalBuying) }}</strong>
              </div>
            </div>

            <!-- Selling Breakdown -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <label class="block text-sm font-medium text-sage-700">SELLING BREAKDOWN</label>
                <button
                  type="button"
                  @click="addSellingItem"
                  class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Item
                </button>
              </div>
              <div class="space-y-3">
                <div v-for="(item, index) in form.selling_breakdown" :key="'selling-' + index" class="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border border-gray-200 rounded-lg">
                  <div class="md:col-span-6">
                    <input
                      v-model="item.description"
                      type="text"
                      placeholder="Service description"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <div class="md:col-span-5">
                    <input
                      v-model="item.amount"
                      type="number"
                      step="0.01"
                      placeholder="Amount"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                  <div class="md:col-span-1">
                    <button
                      type="button"
                      @click="removeSellingItem(index)"
                      class="w-full h-10 text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:border-red-400 transition-colors"
                    >
                      <svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div class="mt-2 p-2 bg-gray-50 rounded-md">
                <strong>Total Selling: {{ formatCurrency(totalSelling) }}</strong>
              </div>
            </div>

            <!-- Revenue Summary -->
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">REVENUE (AUTO CALCULATED)</label>
              <div class="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg">
                <div class="text-lg font-bold" :class="totalRevenue >= 0 ? 'text-green-600' : 'text-red-600'">
                  {{ formatCurrency(totalRevenue) }}
                </div>
                <div class="text-sm text-gray-600 mt-1">
                  Selling: {{ formatCurrency(totalSelling) }} - Buying: {{ formatCurrency(totalBuying) }}
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">REMARKS</label>
              <textarea
                v-model="form.remarks"
                rows="3"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              ></textarea>
              <div v-if="errors.remarks" class="text-red-600 text-sm mt-1">{{ errors.remarks }}</div>
            </div>
          </div>
        </div>

        <!-- Goods Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div 
            @click="toggleSection('goods')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Barang</h3>
            <svg 
              :class="{'rotate-180': !sections.goods}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.goods" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">COMMODITY/URAIAN BARANG</label>
              <textarea
                v-model="form.commodity"
                rows="3"
                placeholder="Masukkan uraian barang/commodity yang detail"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
              ></textarea>
              <div v-if="errors.commodity" class="text-red-600 text-sm mt-1">{{ errors.commodity }}</div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">QTY</label>
                <input
                  v-model="form.qty"
                  type="number"
                  min="0"
                  placeholder="Masukkan quantity"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="errors.qty" class="text-red-600 text-sm mt-1">{{ errors.qty }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">NET WEIGHT (KG)</label>
                <input
                  v-model="form.net_weight"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Masukkan berat netto dalam kg"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="errors.net_weight" class="text-red-600 text-sm mt-1">{{ errors.net_weight }}</div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">CONTAINER NO</label>
              <input
                v-model="form.container_no"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.container_no" class="text-red-600 text-sm mt-1">{{ errors.container_no }}</div>
            </div>
          </div>
        </div>

        <!-- Invoice Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div 
            @click="toggleSection('invoice')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Invoice</h3>
            <svg 
              :class="{'rotate-180': !sections.invoice}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.invoice" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">INVOICE NUMB</label>
              <input
                v-model="form.invoice_number"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.invoice_number" class="text-red-600 text-sm mt-1">{{ errors.invoice_number }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">INVOICE DATE</label>
              <input
                v-model="form.invoice_date"
                type="date"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.invoice_date" class="text-red-600 text-sm mt-1">{{ errors.invoice_date }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">T.O.P</label>
              <input
                v-model="form.top"
                type="text"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="errors.top" class="text-red-600 text-sm mt-1">{{ errors.top }}</div>
            </div>
          </div>
        </div>

        <!-- Multiple Vendors Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div 
            @click="toggleSection('vendor')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Vendor Information (Buying)</h3>
            <svg 
              :class="{'rotate-180': !sections.vendor}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.vendor" class="p-6 space-y-4">
            
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm text-gray-600">Tambahkan detail vendor untuk setiap item buying</p>
              <button
                type="button"
                @click="addVendorDetail"
                class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Vendor
              </button>
            </div>

            <div v-if="vendorDetails.length === 0" class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              No vendor details added yet. Click "Add Vendor" to start.
            </div>

            <div v-for="(vendorDetail, index) in vendorDetails" :key="'vendor-detail-' + index" class="border border-sage-200 rounded-lg p-4 space-y-4">
              <div class="flex justify-between items-center">
                <h5 class="font-medium text-sage-700">Vendor #{{ index + 1 }}</h5>
                <button
                  type="button"
                  @click="removeVendorDetail(index)"
                  class="text-red-600 hover:text-red-800 p-1"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Pilih Vendor -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Pilih Vendor <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="vendorDetail.vendor_id"
                    @change="onVendorSelect(index)"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  >
                    <option value="">Pilih vendor...</option>
                    <option v-for="vendorOption in vendors" :key="vendorOption.id" :value="vendorOption.id">
                      {{ vendorOption.nama_vendor }}
                    </option>
                  </select>
                </div>

                <!-- Deskripsi -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Deskripsi Service
                  </label>
                  <input
                    v-model="vendorDetail.deskripsi"
                    type="text"
                    placeholder="Deskripsi layanan vendor"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
              </div>

              <!-- Info Vendor (Auto-filled) -->
              <div v-if="vendorDetail.vendor_id" class="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-sage-50 rounded-lg">
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">Nama Vendor</label>
                  <p class="text-sm text-gray-900">{{ vendorDetail.nama_vendor || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">Nomor Rekening</label>
                  <p class="text-sm text-gray-900 font-mono">{{ vendorDetail.no_rekening || '-' }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-1">Nama Rekening</label>
                  <p class="text-sm text-gray-900">{{ vendorDetail.nama_rekening || '-' }}</p>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Nominal -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    Nominal <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="vendorDetail.nominal"
                    type="number"
                    step="0.01"
                    placeholder="0"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>

                <!-- RCVD INV -->
                <div>
                  <label class="block text-sm font-medium text-sage-700 mb-2">
                    RCVD INV
                  </label>
                  <input
                    v-model="vendorDetail.rcvd_inv"
                    type="text"
                    placeholder="Nomor invoice yang diterima"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>
              </div>
            </div>

            <!-- Total Vendor Costs -->
            <div v-if="vendorDetails.length > 0" class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div class="flex justify-between items-center">
                <span class="font-medium text-blue-700">Total Vendor Costs:</span>
                <span class="text-xl font-bold text-blue-800">{{ formatCurrency(totalVendorCosts) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6">
          <div class="flex justify-end space-x-4">
            <Link
              :href="route('admin-cs.sales-orders.index')"
              class="px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              :disabled="processing"
              class="px-6 py-3 bg-sage-600 text-white font-medium rounded-lg hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-colors disabled:opacity-50"
            >
              <span v-if="processing">Menyimpan...</span>
              <span v-else>Simpan Perubahan</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useForm } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'
import AdminLayout from '@/Layouts/AdminLayout.vue'

const props = defineProps({
  salesOrder: Object,
  errors: Object,
  vendors: Array
})

// Vendor details data - supports multiple vendors
const vendorDetails = ref([])

// Form state
const form = useForm({
  order_number: props.salesOrder.order_number || '',
  customer: props.salesOrder.customer || '',
  shipper: props.salesOrder.shipper || '',
  bl_awb: props.salesOrder.bl_awb || '',
  liner: props.salesOrder.liner || '',
  vessel: props.salesOrder.vessel || '',
  eta: props.salesOrder.eta ? new Date(props.salesOrder.eta).toISOString().split('T')[0] : '',
  aju: props.salesOrder.aju || '',
  sppb_date: props.salesOrder.sppb_date ? new Date(props.salesOrder.sppb_date).toISOString().split('T')[0] : '',
  shipment_type: props.salesOrder.shipment_type || '',
  pol: props.salesOrder.pol || '',
  pod: props.salesOrder.pod || '',
  gudang_utc: props.salesOrder.gudang_utc || '',
  party_lcl: props.salesOrder.party_lcl || '',
  prepared_by: props.salesOrder.prepared_by || '',
  exchange_rate: props.salesOrder.exchange_rate || '',
  jenis_biaya: props.salesOrder.jenis_biaya || '',
  buying_breakdown: props.salesOrder.buying_breakdown || [{ vendor: '', amount: 0 }],
  selling_breakdown: props.salesOrder.selling_breakdown || [{ description: '', amount: 0 }],
  remarks: props.salesOrder.remarks || '',
  commodity: props.salesOrder.commodity || '',
  qty: props.salesOrder.qty || '',
  net_weight: props.salesOrder.net_weight || '',
  container_no: props.salesOrder.container_no || '',
  invoice_number: props.salesOrder.invoice_number || '',
  invoice_date: props.salesOrder.invoice_date ? new Date(props.salesOrder.invoice_date).toISOString().split('T')[0] : '',
  top: props.salesOrder.top || ''
})

// Collapsible sections state
const sections = reactive({
  basic: true,
  shipping: false,
  pricing: false,
  goods: false,
  invoice: false,
  vendor: false
})

// Processing state
const processing = ref(false)

// Toggle section visibility
const toggleSection = (section) => {
  sections[section] = !sections[section]
}

// Initialize vendor details from existing data
(() => {
  if (props.salesOrder.vendors) {
    if (Array.isArray(props.salesOrder.vendors) && props.salesOrder.vendors.length > 0) {
      // If vendors is an array, add each vendor to vendorDetails
      props.salesOrder.vendors.forEach(vendorData => {
        vendorDetails.value.push({
          vendor_id: vendorData.vendor_id || "",
          nama_vendor: vendorData.company_name || vendorData.nama_vendor || "",
          no_rekening: vendorData.no_rekening || "",
          nama_rekening: vendorData.nama_rekening || "",
          deskripsi: vendorData.deskripsi || "",
          nominal: vendorData.nominal || 0,
          rcvd_inv: vendorData.rcvd_inv || ""
        });
      });
    } else if (typeof props.salesOrder.vendors === 'object' && !Array.isArray(props.salesOrder.vendors)) {
      // If vendors is an object (legacy single vendor)
      const vendorData = props.salesOrder.vendors;
      vendorDetails.value.push({
        vendor_id: vendorData.vendor_id || "",
        nama_vendor: vendorData.company_name || vendorData.nama_vendor || "",
        no_rekening: vendorData.no_rekening || "",
        nama_rekening: vendorData.nama_rekening || "",
        deskripsi: vendorData.deskripsi || "",
        nominal: vendorData.nominal || 0,
        rcvd_inv: vendorData.rcvd_inv || ""
      });
    }
  }
})();

// Vendor detail management functions
const addVendorDetail = () => {
  vendorDetails.value.push({
    vendor_id: "",
    nama_vendor: "",
    no_rekening: "",
    nama_rekening: "",
    deskripsi: "",
    nominal: 0,
    rcvd_inv: ""
  });
};

const removeVendorDetail = (index) => {
  if (vendorDetails.value.length > 0) {
    vendorDetails.value.splice(index, 1);
  }
};

const onVendorSelect = (index) => {
  const vendorDetail = vendorDetails.value[index];
  if (vendorDetail.vendor_id) {
    const selectedVendor = props.vendors.find(v => v.id == vendorDetail.vendor_id);
    if (selectedVendor) {
      vendorDetail.nama_vendor = selectedVendor.nama_vendor;
      vendorDetail.no_rekening = selectedVendor.nomor_rekening;
      vendorDetail.nama_rekening = selectedVendor.nama_rekening;
    }
  } else {
    // Clear vendor data if no vendor selected
    vendorDetail.nama_vendor = "";
    vendorDetail.no_rekening = "";
    vendorDetail.nama_rekening = "";
  }
};

// Breakdown management functions
const addBuyingItem = () => {
  form.buying_breakdown.push({ vendor: '', amount: 0 });
};

const removeBuyingItem = (index) => {
  if (form.buying_breakdown.length > 1) {
    form.buying_breakdown.splice(index, 1);
  }
};

const addSellingItem = () => {
  form.selling_breakdown.push({ description: '', amount: 0 });
};

const removeSellingItem = (index) => {
  if (form.selling_breakdown.length > 1) {
    form.selling_breakdown.splice(index, 1);
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

// Computed properties for totals
const totalBuying = computed(() => {
  return form.buying_breakdown.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
});

const totalSelling = computed(() => {
  return form.selling_breakdown.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
});

const totalRevenue = computed(() => {
  return totalSelling.value - totalBuying.value;
});

const calculateTotals = () => {
  // This function is called to trigger reactivity if needed
  // The actual calculation is done by computed properties
  return {
    totalBuying: totalBuying.value,
    totalSelling: totalSelling.value,
    totalRevenue: totalRevenue.value
  };
};

// Computed property for total vendor costs
const totalVendorCosts = computed(() => {
  return vendorDetails.value.reduce((sum, vendor) => sum + (parseFloat(vendor.nominal) || 0), 0);
});

// Submit form
const submit = () => {
  // Add vendor details to form data
  const formData = {
    ...form.data(),
    vendor_details: vendorDetails.value.filter(v => v.vendor_id && v.nominal > 0)
  };
  
  processing.value = true;
  form.transform(() => formData).put(route('admin-cs.sales-orders.update', props.salesOrder.id), {
    onFinish: () => {
      processing.value = false
    }
  })
}
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
  border-color: #c1cbb9;
}
.focus\:ring-sage-500:focus {
  --tw-ring-color: #9db892;
}
.focus\:border-sage-500:focus {
  border-color: #9db892;
}
.hover\:bg-sage-100:hover {
  background-color: #e8ede5;
}
.hover\:bg-sage-600:hover {
  background-color: #8db580;
}
.hover\:bg-sage-700:hover {
  background-color: #7ba169;
}
</style>