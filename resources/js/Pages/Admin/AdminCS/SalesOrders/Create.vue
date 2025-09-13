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
              <h2 class="text-2xl font-bold text-sage-800">Buat Sales Order Baru</h2>
              <p class="text-sage-600">Buat dokumen sales order untuk pelanggan</p>
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
        <!-- Customer Selection -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
            <h3 class="text-lg font-semibold text-sage-800">Pilih Metode Input</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="inputMethod"
                    value="manual"
                    class="mr-3 text-sage-600 focus:ring-sage-500"
                  >
                  <span class="text-sm font-medium text-sage-700">Input Manual</span>
                </label>
                <p class="text-xs text-sage-500 mt-1 ml-6">Isi semua data secara manual</p>
              </div>
              <div>
                <label class="flex items-center">
                  <input
                    type="radio"
                    v-model="inputMethod"
                    value="customer"
                    class="mr-3 text-sage-600 focus:ring-sage-500"
                  >
                  <span class="text-sm font-medium text-sage-700">Berdasarkan Data Pelanggan</span>
                </label>
                <p class="text-xs text-sage-500 mt-1 ml-6">Auto-fill dari data pelanggan</p>
              </div>
            </div>

            <div v-if="inputMethod === 'customer'" class="mt-4">
              <label class="block text-sm font-medium text-sage-700 mb-2">Pilih Pelanggan</label>
              <select
                v-model="selectedCustomerId"
                @change="onCustomerSelect"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              >
                <option value="">-- Pilih Pelanggan --</option>
                <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                  {{ customer.company_name }} - {{ customer.pic_name }}
                </option>
              </select>
            </div>
          </div>
        </div>

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
                  readonly
                  placeholder="EWILOG2509001001"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
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
            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">EXCHANGE RATE</label>
              <input
                v-model="form.exchange_rate"
                type="number"
                step="0.0001"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="form.errors.exchange_rate" class="mt-2 text-sm text-red-600">{{ form.errors.exchange_rate }}</div>
            </div>
          </div>
        </div>

        <!-- Pricing Information -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div
            @click="toggleSection('pricing')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Informasi Pricing</h3>
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

            <!-- Vendor Breakdown (Buying + Selling) -->
            <div class="bg-gray-50 rounded-lg p-4">
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-md font-semibold text-sage-800">Rincian Vendor (Buying & Selling)</h4>
                <button
                  type="button"
                  @click="addVendorItem"
                  class="text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors"
                >
                  + Tambah Vendor
                </button>
              </div>
              <div v-for="(item, index) in form.vendor_breakdown" :key="index" class="border border-sage-200 rounded-lg p-4 mb-4 space-y-4">
                <!-- Row 1: Vendor Selection -->
                <div class="grid grid-cols-12 gap-3">
                  <div class="col-span-11">
                    <label class="block text-xs font-medium text-sage-700 mb-1">Nama Vendor</label>
                    <select
                      v-model="item.vendor_id"
                      @change="onVendorSelect(index)"
                      class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    >
                      <option value="">Pilih vendor...</option>
                      <option v-for="vendorOption in vendors" :key="vendorOption.id" :value="vendorOption.id">
                        {{ vendorOption.nama_vendor }}
                      </option>
                    </select>
                  </div>
                  <div class="col-span-1">
                    <label class="block text-xs font-medium text-transparent mb-1">Del</label>
                    <button
                      type="button"
                      @click="removeVendorItem(index)"
                      class="w-full h-10 text-red-600 hover:text-red-900 hover:bg-red-100 rounded transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>

                <!-- Row 2: Service Description & RCVD INV -->
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-sage-700 mb-1">Deskripsi Service / Jenis Biaya</label>
                    <select
                      v-model="item.description"
                      class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    >
                      <option value="">Pilih Jenis Biaya</option>
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
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-sage-700 mb-1">RCVD INV</label>
                    <input
                      v-model="item.rcvd_inv"
                      type="text"
                      placeholder="Nomor invoice yang diterima"
                      class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                </div>

                <!-- Row 2.5: Individual Remarks -->
                <div>
                  <label class="block text-xs font-medium text-sage-700 mb-1">Remarks (Individual)</label>
                  <input
                    v-model="item.remarks"
                    type="text"
                    placeholder="Catatan khusus untuk item ini"
                    class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                  />
                </div>

                <!-- Row 3: Buying & Selling Amounts -->
                <div class="grid grid-cols-3 gap-3 p-3 bg-blue-50 rounded-lg">
                  <div>
                    <label class="block text-xs font-medium text-blue-700 mb-1">Buying Amount (Cost)</label>
                    <input
                      v-model="item.buying_amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      @input="calculateTotals"
                      class="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-green-700 mb-1">Selling Amount (Revenue)</label>
                    <input
                      v-model="item.selling_amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      @input="calculateTotals"
                      class="w-full px-3 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-purple-700 mb-1">Revenue</label>
                    <p class="px-3 py-2 bg-white border border-purple-300 rounded text-sm font-semibold" :class="getProfit(item) >= 0 ? 'text-green-600' : 'text-red-600'">
                      {{ formatCurrency(getProfit(item)) }}
                    </p>
                  </div>
                </div>

                <!-- Row 4: Vendor Details (Auto-filled) -->
                <div v-if="item.vendor_id" class="grid grid-cols-3 gap-3 p-3 bg-sage-50 rounded-lg">
                  <div>
                    <label class="block text-xs font-medium text-sage-700 mb-1">Nama Vendor</label>
                    <p class="text-sm text-gray-900">{{ item.nama_vendor || '-' }}</p>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-sage-700 mb-1">Nomor Rekening</label>
                    <p class="text-sm text-gray-900 font-mono">{{ item.no_rekening || '-' }}</p>
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-sage-700 mb-1">Nama Rekening</label>
                    <p class="text-sm text-gray-900">{{ item.nama_rekening || '-' }}</p>
                  </div>
                </div>
              </div>
              <!-- Total Summary -->
              <div class="mt-4 pt-4 border-t border-gray-300 grid grid-cols-3 gap-4 text-center">
                <div class="p-3 bg-blue-100 rounded-lg">
                  <p class="text-xs font-medium text-blue-700">Total Buying</p>
                  <p class="text-lg font-bold text-blue-800">{{ formatCurrency(totalBuying) }}</p>
                </div>
                <div class="p-3 bg-green-100 rounded-lg">
                  <p class="text-xs font-medium text-green-700">Total Selling</p>
                  <p class="text-lg font-bold text-green-800">{{ formatCurrency(totalSelling) }}</p>
                </div>
                <div class="p-3 rounded-lg" :class="totalRevenue >= 0 ? 'bg-purple-100' : 'bg-red-100'">
                  <p class="text-xs font-medium" :class="totalRevenue >= 0 ? 'text-purple-700' : 'text-red-700'">Total Profit</p>
                  <p class="text-lg font-bold" :class="totalRevenue >= 0 ? 'text-purple-800' : 'text-red-800'">{{ formatCurrency(totalRevenue) }}</p>
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
                <div class="flex justify-between items-center pt-2 border-t border-blue-300 font-bold text-lg">
                  <span>Revenue:</span>
                  <span :class="totalRevenue >= 0 ? 'text-green-600' : 'text-red-600'">
                    {{ formatCurrency(totalRevenue) }}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">REMARKS</label>
              <textarea
                v-model="form.remarks"
                rows="3"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
              ></textarea>
              <div v-if="form.errors.remarks" class="mt-2 text-sm text-red-600">{{ form.errors.remarks }}</div>
            </div>

            <div>
              <label class="block text-sm font-medium text-sage-700 mb-2">NOTE</label>
              <textarea
                v-model="form.note"
                rows="3"
                placeholder="Catatan tambahan untuk sales order ini"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
              ></textarea>
              <div v-if="form.errors.note" class="mt-2 text-sm text-red-600">{{ form.errors.note }}</div>
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
              <div v-if="form.errors.commodity" class="mt-2 text-sm text-red-600">{{ form.errors.commodity }}</div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">QTY</label>
                <input
                  v-model="form.qty"
                  type="number"
                  min="0"
                  placeholder="Masukkan quantity"
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
                  min="0"
                  placeholder="Masukkan berat netto dalam kg"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.net_weight" class="mt-2 text-sm text-red-600">{{ form.errors.net_weight }}</div>
              </div>
              <div>
                <label class="block text-sm font-medium text-sage-700 mb-2">MEAS (M³)</label>
                <input
                  v-model="form.measurement"
                  type="number"
                  step="0.001"
                  min="0"
                  placeholder="Masukkan volume dalam m³"
                  class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <div v-if="form.errors.measurement" class="mt-2 text-sm text-red-600">{{ form.errors.measurement }}</div>
              </div>
            </div>
            <!-- Multiple Container Numbers -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="block text-sm font-medium text-sage-700">CONTAINER NO</label>
                <button
                  type="button"
                  @click="addContainerNo"
                  class="text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors"
                >
                  + Tambah Container
                </button>
              </div>
              <div v-for="(container, index) in form.container_no" :key="'container-' + index" class="flex gap-2 mb-2">
                <input
                  v-model="form.container_no[index]"
                  type="text"
                  placeholder="Masukkan nomor container (misal: TCLU1234567)"
                  class="flex-1 px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                />
                <button
                  type="button"
                  @click="removeContainerNo(index)"
                  v-if="form.container_no.length > 1"
                  class="px-3 py-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors"
                >
                  ×
                </button>
              </div>
              <div v-if="form.errors.container_no" class="mt-2 text-sm text-red-600">{{ form.errors.container_no }}</div>
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
                placeholder="e.g., NET 30"
                class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
              />
              <div v-if="form.errors.top" class="mt-2 text-sm text-red-600">{{ form.errors.top }}</div>
            </div>
          </div>
        </div>


        <!-- Voucher Section -->
        <div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden">
          <div
            @click="toggleSection('voucher')"
            class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
          >
            <h3 class="text-lg font-semibold text-sage-800">Voucher Management</h3>
            <svg
              :class="{'rotate-180': !sections.voucher}"
              class="w-5 h-5 text-sage-600 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div v-show="sections.voucher" class="p-6 space-y-6">

            <!-- Payment Vouchers -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-md font-semibold text-sage-700">Payment Vouchers</h4>
                <button
                  type="button"
                  @click="addPaymentVoucher"
                  class="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Payment
                </button>
              </div>

              <div v-if="paymentVouchers.length === 0" class="text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                No payment vouchers added yet
              </div>

              <div v-for="(voucher, index) in paymentVouchers" :key="'payment-' + index" class="border border-gray-200 rounded-lg p-4 space-y-3">
                <div class="flex justify-between items-center">
                  <h5 class="font-medium text-gray-700">Payment Voucher #{{ index + 1 }}</h5>
                  <button
                    type="button"
                    @click="removePaymentVoucher(index)"
                    class="text-red-600 hover:text-red-800"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Voucher No</label>
                    <input
                      v-model="voucher.voucher_no"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      placeholder="e.g., PAY-001"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      v-model="voucher.date"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    v-model="voucher.description"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                    placeholder="e.g., Biaya Driver"
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                      v-model="voucher.amount"
                      type="number"
                      step="0.01"
                      min="0"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      placeholder="500000"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Prepared By</label>
                    <input
                      v-model="voucher.prepared_by"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      placeholder="Staff name"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Receipt Vouchers -->
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-md font-semibold text-sage-700">Receipt Vouchers</h4>
                <button
                  type="button"
                  @click="addReceiptVoucher"
                  class="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Receipt
                </button>
              </div>

              <div v-if="receiptVouchers.length === 0" class="text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg">
                No receipt vouchers added yet
              </div>

              <div v-for="(voucher, index) in receiptVouchers" :key="'receipt-' + index" class="border border-gray-200 rounded-lg p-4 space-y-3">
                <div class="flex justify-between items-center">
                  <h5 class="font-medium text-gray-700">Receipt Voucher #{{ index + 1 }}</h5>
                  <button
                    type="button"
                    @click="removeReceiptVoucher(index)"
                    class="text-red-600 hover:text-red-800"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Voucher No</label>
                    <input
                      v-model="voucher.voucher_no"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      placeholder="e.g., REC-001"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      v-model="voucher.date"
                      type="date"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    v-model="voucher.description"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                    placeholder="e.g., Payment received from client"
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <input
                      v-model="voucher.amount"
                      type="number"
                      step="0.01"
                      min="0"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      placeholder="1000000"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Prepared By</label>
                    <input
                      v-model="voucher.prepared_by"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      placeholder="Staff name"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6">
          <Link
            :href="route('admin-cs.sales-orders.index')"
            class="inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Batal
          </Link>
          <button
            type="submit"
            :disabled="form.processing"
            class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              v-if="form.processing"
              class="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-if="form.processing">Menyimpan...</span>
            <span v-else>Simpan Sales Order</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Alert Dialog -->
    <AlertDialog
      :show="alertDialog.show"
      :type="alertDialog.type"
      :title="alertDialog.title"
      :message="alertDialog.message"
      :confirm-text="alertDialog.confirmText"
      :cancel-text="alertDialog.cancelText"
      @confirm="handleAlertConfirm"
      @cancel="handleAlertCancel"
      @close="closeAlert"
    />
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useForm, Link } from "@inertiajs/vue3";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import AlertDialog from "@/Components/AlertDialog.vue";

const props = defineProps({
  customers: Array,
  vendors: Array,
  shipmentTypes: Array,
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

// Voucher data
const paymentVouchers = ref([]);
const receiptVouchers = ref([]);

// Vendor details data - supports multiple vendors
// Removed vendorDetails as vendor selection is now integrated into buying_breakdown

// Collapseable sections state
const sections = ref({
  basic: true,
  shipping: false,
  pricing: false,
  goods: false,
  invoice: false,
  vendor: false,
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
  exchange_rate: "",
  vendor_breakdown: [{ vendor_id: '', nama_vendor: '', no_rekening: '', nama_rekening: '', description: '', buying_amount: 0, selling_amount: 0, rcvd_inv: '', remarks: '' }],
  remarks: "",
  note: "",
  commodity: "",
  qty: "",
  net_weight: "",
  measurement: "",
  container_no: [""],
  invoice_number: "",
  invoice_date: "",
  top: ""
});

const toggleSection = (section) => {
  sections.value[section] = !sections.value[section];
};

const onCustomerSelect = () => {
  if (selectedCustomerId.value) {
    const customer = props.customers.find(c => c.id == selectedCustomerId.value);
    if (customer) {
      // Auto-fill fields that are available from customer data
      form.customer = customer.company_name || "";
      // Clear shipping fields since they're no longer available
      form.bl_awb = "";
      form.pol = "";
      form.pod = "";
      form.eta = "";
    }
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

const totalRevenue = computed(() => {
  return totalSelling.value - totalBuying.value;
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
  // Add voucher data to form (vendor details are now integrated into buying_breakdown)
  const formData = {
    ...form.data(),
    payment_vouchers: paymentVouchers.value.filter(v => v.voucher_no && v.description && v.amount),
    receipt_vouchers: receiptVouchers.value.filter(v => v.voucher_no && v.description && v.amount)
  };

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
        showAlert("success", "Berhasil", "Sales Order berhasil dibuat.");
      } else {
        console.log('Not redirected to index, component:', page.component);
        showAlert("success", "Berhasil", "Sales Order berhasil dibuat.", "OK", "", () => {
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
