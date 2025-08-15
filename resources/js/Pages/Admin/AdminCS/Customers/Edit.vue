<template>
  <AdminLayout>
    <div class="p-4 sm:p-6 lg:p-8">
      <!-- Header Section -->
      <div
        class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"
      >
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-sage-800">
                Edit Pelanggan: {{ customer.customer_code || customer.no }}
              </h2>
              <p class="text-sage-600">
                Perbarui informasi pelanggan dan status komunikasi
              </p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0">
            <Link
              :href="route('admin-cs.customers.index')"
              class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <svg
                class="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Kembali
            </Link>
          </div>
        </div>
      </div>

      <!-- Form Section -->
      <div
        class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
      >
        <div class="px-6 py-4 border-b border-sage-200 bg-sage-50">
          <h3 class="text-lg font-semibold text-sage-800">
            Form Edit Pelanggan
          </h3>
          <p class="text-sm text-sage-600 mt-1">
            Lengkapi informasi pelanggan dengan benar
          </p>
        </div>

        <div class="p-6">
          <form @submit.prevent="submit" class="space-y-8">
            <!-- Shipping Information Section -->
            <div class="border border-sage-200 rounded-lg">
              <button
                type="button"
                @click="toggleShippingInfo"
                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
              >
                <h4 class="text-lg font-semibold text-sage-800">
                  Informasi Pengiriman
                </h4>
                <svg
                  :class="{'rotate-180': isShippingInfoOpen}"
                  class="w-5 h-5 text-sage-600 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="isShippingInfoOpen" class="p-4 space-y-4">
                <!-- SO NUMBER -->
                <div>
                  <label
                    for="so_number"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    SO Number <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.so_number"
                    type="text"
                    id="so_number"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.so_number" class="mt-2 text-sm text-red-600">
                    {{ form.errors.so_number }}
                  </div>
                </div>

                <!-- CUSTOMER CODE -->
                <div>
                  <label
                    for="customer_code"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Customer Code <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.customer_code"
                    type="text"
                    id="customer_code"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.customer_code" class="mt-2 text-sm text-red-600">
                    {{ form.errors.customer_code }}
                  </div>
                </div>

                <!-- CONSIGNEE/SHIPPER -->
                <div>
                  <label
                    for="consignee_shipper"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Consignee/Shipper <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.consignee_shipper"
                    type="text"
                    id="consignee_shipper"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.consignee_shipper" class="mt-2 text-sm text-red-600">
                    {{ form.errors.consignee_shipper }}
                  </div>
                </div>

                <!-- AWB/BL NUMBER -->
                <div>
                  <label
                    for="awb_bl_number"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    AWB/BL Number <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.awb_bl_number"
                    type="text"
                    id="awb_bl_number"
                    required
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.awb_bl_number" class="mt-2 text-sm text-red-600">
                    {{ form.errors.awb_bl_number }}
                  </div>
                </div>

                <!-- CUST DOC NAME -->
                <div>
                  <label
                    for="cust_doc_name"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Cust Doc Name
                  </label>
                  <input
                    v-model="form.cust_doc_name"
                    type="text"
                    id="cust_doc_name"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.cust_doc_name" class="mt-2 text-sm text-red-600">
                    {{ form.errors.cust_doc_name }}
                  </div>
                </div>

                <!-- TYPE QTY -->
                <div>
                  <label
                    for="type_qty"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    Type Qty
                  </label>
                  <input
                    v-model="form.type_qty"
                    type="text"
                    id="type_qty"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.type_qty" class="mt-2 text-sm text-red-600">
                    {{ form.errors.type_qty }}
                  </div>
                </div>

                <!-- NO KONT/PALLET -->
                <div>
                  <label
                    for="no_kont_pallet"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    No Kont/Pallet
                  </label>
                  <input
                    v-model="form.no_kont_pallet"
                    type="text"
                    id="no_kont_pallet"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.no_kont_pallet" class="mt-2 text-sm text-red-600">
                    {{ form.errors.no_kont_pallet }}
                  </div>
                </div>

                <!-- POL/POD -->
                <div>
                  <label
                    for="pol_pod"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    POL/POD
                  </label>
                  <input
                    v-model="form.pol_pod"
                    type="text"
                    id="pol_pod"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.pol_pod" class="mt-2 text-sm text-red-600">
                    {{ form.errors.pol_pod }}
                  </div>
                </div>

                <!-- ETA -->
                <div>
                  <label
                    for="eta"
                    class="block text-sm font-medium text-sage-700 mb-2"
                  >
                    ETA
                  </label>
                  <input
                    v-model="form.eta"
                    type="date"
                    id="eta"
                    class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                  />
                  <div v-if="form.errors.eta" class="mt-2 text-sm text-red-600">
                    {{ form.errors.eta }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Buying to Vendor Section -->
            <div class="border border-sage-200 rounded-lg">
              <button
                type="button"
                @click="toggleVendorInfo"
                class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
              >
                <h4 class="text-lg font-semibold text-sage-800">
                  Buying to Vendor
                </h4>
                <svg
                  :class="{'rotate-180': isVendorInfoOpen}"
                  class="w-5 h-5 text-sage-600 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div v-show="isVendorInfoOpen" class="p-4 space-y-4">
                <div v-for="(vendor, index) in form.vendors" :key="index" class="border border-sage-200 rounded-lg bg-sage-50">
                  <button
                    type="button"
                    @click="toggleVendorCollapse(index)"
                    class="w-full flex items-center justify-between p-4 bg-sage-100 hover:bg-sage-200 transition-colors rounded-t-lg"
                  >
                    <h5 class="font-medium text-sage-800">Vendor {{ index + 1 }}</h5>
                    <div class="flex items-center space-x-2">
                      <button
                        v-if="form.vendors.length > 1"
                        type="button"
                        @click.stop="removeVendor(index)"
                        class="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
                      >
                        Hapus
                      </button>
                      <svg
                        :class="{'rotate-180': !isVendorOpen(index)}"
                        class="w-5 h-5 text-sage-600 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  <div v-show="isVendorOpen(index)" class="p-4 space-y-4">
                    <!-- DESKRIPSI -->
                    <div>
                      <label
                        :for="'deskripsi_' + index"
                        class="block text-sm font-medium text-sage-700 mb-2"
                      >
                        Deskripsi <span class="text-red-500">*</span>
                      </label>
                      <textarea
                        v-model="vendor.deskripsi"
                        :id="'deskripsi_' + index"
                        rows="2"
                        required
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                      ></textarea>
                      <div v-if="form.errors[`vendors.${index}.deskripsi`]" class="mt-2 text-sm text-red-600">
                        {{ form.errors[`vendors.${index}.deskripsi`] }}
                      </div>
                    </div>

                    <!-- NOMINAL -->
                    <div>
                      <label
                        :for="'nominal_' + index"
                        class="block text-sm font-medium text-sage-700 mb-2"
                      >
                        Nominal <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="vendor.nominalFormatted"
                        type="text"
                        :id="'nominal_' + index"
                        required
                        @input="formatNominal(vendor, $event)"
                        @blur="updateNominalValue(vendor)"
                        placeholder="0"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                      />
                      <div v-if="form.errors[`vendors.${index}.nominal`]" class="mt-2 text-sm text-red-600">
                        {{ form.errors[`vendors.${index}.nominal`] }}
                      </div>
                    </div>

                    <!-- NO REKENING -->
                    <div>
                      <label
                        :for="'no_rekening_' + index"
                        class="block text-sm font-medium text-sage-700 mb-2"
                      >
                        No Rekening <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="vendor.no_rekening"
                        type="text"
                        :id="'no_rekening_' + index"
                        required
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                      />
                      <div v-if="form.errors[`vendors.${index}.no_rekening`]" class="mt-2 text-sm text-red-600">
                        {{ form.errors[`vendors.${index}.no_rekening`] }}
                      </div>
                    </div>

                    <!-- COMPANY NAME -->
                    <div>
                      <label
                        :for="'company_name_' + index"
                        class="block text-sm font-medium text-sage-700 mb-2"
                      >
                        Company Name <span class="text-red-500">*</span>
                      </label>
                      <input
                        v-model="vendor.company_name"
                        type="text"
                        :id="'company_name_' + index"
                        required
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                      />
                      <div v-if="form.errors[`vendors.${index}.company_name`]" class="mt-2 text-sm text-red-600">
                        {{ form.errors[`vendors.${index}.company_name`] }}
                      </div>
                    </div>

                    <!-- RCVD INV -->
                    <div>
                      <label
                        :for="'rcvd_inv_' + index"
                        class="block text-sm font-medium text-sage-700 mb-2"
                      >
                        RCVD INV
                      </label>
                      <input
                        v-model="vendor.rcvd_inv"
                        type="text"
                        :id="'rcvd_inv_' + index"
                        class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                      />
                      <div v-if="form.errors[`vendors.${index}.rcvd_inv`]" class="mt-2 text-sm text-red-600">
                        {{ form.errors[`vendors.${index}.rcvd_inv`] }}
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  type="button"
                  @click="addVendor"
                  class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Tambah Vendor
                </button>
              </div>
            </div>

            <!-- Submit Buttons -->
            <div
              class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200"
            >
              <Link
                :href="route('admin-cs.customers.index')"
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
                <span v-if="form.processing">Menyimpan...</span>
                <span v-else>Update Pelanggan</span>
              </button>
            </div>
          </form>
        </div>
      </div>
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
import { ref } from "vue";
import { useForm, Link } from "@inertiajs/vue3";
import AdminLayout from "@/Layouts/AdminLayout.vue";
import AlertDialog from "@/Components/AlertDialog.vue";

const props = defineProps({
  customer: Object,
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

// Collapsible states
const isShippingInfoOpen = ref(true);
const isVendorInfoOpen = ref(true);
const vendorCollapseStates = ref([]);

const toggleShippingInfo = () => {
  isShippingInfoOpen.value = !isShippingInfoOpen.value;
};

const toggleVendorInfo = () => {
  isVendorInfoOpen.value = !isVendorInfoOpen.value;
};

const toggleVendorCollapse = (index) => {
  if (vendorCollapseStates.value[index] === undefined) {
    vendorCollapseStates.value[index] = false;
  } else {
    vendorCollapseStates.value[index] = !vendorCollapseStates.value[index];
  }
};

const isVendorOpen = (index) => {
  return vendorCollapseStates.value[index] !== false;
};

const form = useForm({
  so_number: props.customer.so_number || "",
  customer_code: props.customer.customer_code || "",
  consignee_shipper: props.customer.consignee_shipper || "",
  awb_bl_number: props.customer.awb_bl_number || "",
  cust_doc_name: props.customer.cust_doc_name || "",
  type_qty: props.customer.type_qty || "",
  no_kont_pallet: props.customer.no_kont_pallet || "",
  pol_pod: props.customer.pol_pod || "",
  eta: props.customer.eta || "",
  vendors: (props.customer.vendors || [
    {
      deskripsi: "",
      nominal: "",
      no_rekening: "",
      company_name: "",
      rcvd_inv: ""
    }
  ]).map(vendor => ({
    ...vendor,
    nominalFormatted: vendor.nominal ? vendor.nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : ''
  }))
});

const addVendor = () => {
  form.vendors.push({
    deskripsi: "",
    nominal: "",
    nominalFormatted: "",
    no_rekening: "",
    company_name: "",
    rcvd_inv: ""
  });
  // Set new vendor as open by default
  vendorCollapseStates.value[form.vendors.length - 1] = true;
};

const removeVendor = (index) => {
  if (form.vendors.length > 1) {
    form.vendors.splice(index, 1);
    // Remove the corresponding collapse state
    vendorCollapseStates.value.splice(index, 1);
  }
};

const showAlert = (type, title, message, confirmText = "", cancelText = "") => {
  alertDialog.value = {
    show: true,
    type,
    title,
    message,
    confirmText,
    cancelText,
    onConfirm: null,
  };
};

const handleAlertConfirm = () => {
  if (alertDialog.value.onConfirm) {
    alertDialog.value.onConfirm();
  }
};

const handleAlertCancel = () => {
  // Cancel logic if needed
};

const closeAlert = () => {
  alertDialog.value.show = false;
};

const formatNominal = (vendor, event) => {
  let value = event.target.value;
  // Remove all non-digit characters
  value = value.replace(/\D/g, '');
  
  // Add thousand separators (dots)
  if (value) {
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  
  vendor.nominalFormatted = value;
};

const updateNominalValue = (vendor) => {
  // Convert formatted value back to number for form submission
  vendor.nominal = vendor.nominalFormatted ? parseInt(vendor.nominalFormatted.replace(/\./g, '')) : '';
};

const submit = () => {
  form.put(route("admin-cs.customers.update", props.customer.id), {
    onSuccess: () => {
      showAlert("success", "Berhasil", "Data pelanggan berhasil diperbarui.");
    },
    onError: (errors) => {
      const errorMessage =
        Object.keys(errors).length > 0
          ? "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan."
          : "Terjadi kesalahan saat memperbarui data pelanggan.";
      showAlert("error", "Gagal Memperbarui", errorMessage);
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