import { ref, computed, withCtx, unref, createVNode, createTextVNode, withModifiers, createBlock, createCommentVNode, withDirectives, vModelRadio, openBlock, vModelText, toDisplayString, vShow, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrLooseContain, ssrRenderList } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-1gZAo0_N.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { _ as _sfc_main$1 } from "./SearchableSelect-BTti48xr.js";
import { Plus, ArrowLeft } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DLLX4jgl.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    customers: Array,
    vendors: Array,
    shipmentTypes: Array,
    serviceTypes: Array,
    operationalCostCategories: Array,
    packageUnits: {
      type: Array,
      default: () => []
    },
    orderNumber: String
  },
  setup(__props) {
    const props = __props;
    const alertDialog = ref({
      show: false,
      type: "info",
      title: "",
      message: "",
      confirmText: "",
      cancelText: "",
      onConfirm: null
    });
    const inputMethod = ref("manual");
    const selectedCustomerId = ref("");
    const customerOptions = computed(() => {
      return props.customers.map((customer) => ({
        value: customer.id,
        label: customer.company_name,
        subLabel: customer.pic_name,
        company_name: customer.company_name,
        pic_name: customer.pic_name
      }));
    });
    const paymentVouchers = ref([]);
    const receiptVouchers = ref([]);
    const reimbursementItems = ref([]);
    const sections = ref({
      basic: true,
      shipping: false,
      pricing: false,
      other_costs: false,
      reimbursement: false,
      goods: false,
      invoice: false,
      voucher: false
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
      vendor_breakdown: [{ vendor_id: "", nama_vendor: "", no_rekening: "", nama_rekening: "", description: "", buying_amount: 0, selling_amount: 0, rcvd_inv: "", remarks: "" }],
      other_costs: [],
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
        form.customer = selectedCustomer.company_name || "";
        form.bl_awb = "";
        form.pol = "";
        form.pod = "";
        form.eta = "";
      } else {
        if (inputMethod.value === "customer") {
          form.customer = "";
          form.bl_awb = "";
          form.pol = "";
          form.pod = "";
          form.eta = "";
        }
      }
    };
    const onVendorSelect = (index) => {
      const vendorItem = form.vendor_breakdown[index];
      if (vendorItem.vendor_id) {
        const selectedVendor = props.vendors.find((v) => v.id == vendorItem.vendor_id);
        if (selectedVendor) {
          vendorItem.nama_vendor = selectedVendor.nama_vendor;
          vendorItem.no_rekening = selectedVendor.nomor_rekening;
          vendorItem.nama_rekening = selectedVendor.nama_rekening;
        }
      } else {
        vendorItem.nama_vendor = "";
        vendorItem.no_rekening = "";
        vendorItem.nama_rekening = "";
      }
    };
    const addPaymentVoucher = () => {
      paymentVouchers.value.push({
        voucher_no: "",
        date: "",
        description: "",
        amount: 0,
        prepared_by: ""
      });
    };
    const removePaymentVoucher = (index) => {
      paymentVouchers.value.splice(index, 1);
    };
    const addReceiptVoucher = () => {
      receiptVouchers.value.push({
        voucher_no: "",
        date: "",
        description: "",
        amount: 0,
        prepared_by: ""
      });
    };
    const removeReceiptVoucher = (index) => {
      receiptVouchers.value.splice(index, 1);
    };
    const addOtherCost = () => {
      form.other_costs.push({
        description: "",
        amount: 0,
        category: ""
      });
    };
    const removeOtherCost = (index) => {
      if (form.other_costs.length > 1) {
        form.other_costs.splice(index, 1);
      }
    };
    const addReimbursementItem = () => {
      reimbursementItems.value.push({
        description: "",
        amount: 0,
        category: "",
        notes: ""
      });
    };
    const removeReimbursementItem = (index) => {
      reimbursementItems.value.splice(index, 1);
    };
    const addContainerNo = () => {
      form.container_no.push("");
    };
    const removeContainerNo = (index) => {
      if (form.container_no.length > 1) {
        form.container_no.splice(index, 1);
      }
    };
    const addVendorItem = () => {
      form.vendor_breakdown.push({
        vendor_id: "",
        nama_vendor: "",
        no_rekening: "",
        nama_rekening: "",
        description: "",
        buying_amount: 0,
        selling_amount: 0,
        rcvd_inv: "",
        remarks: ""
      });
    };
    const removeVendorItem = (index) => {
      if (form.vendor_breakdown.length > 1) {
        form.vendor_breakdown.splice(index, 1);
      }
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount || 0);
    };
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
    const getProfit = (vendorItem) => {
      const buying = parseFloat(vendorItem.buying_amount) || 0;
      const selling = parseFloat(vendorItem.selling_amount) || 0;
      return selling - buying;
    };
    const calculateTotals = () => {
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
        onConfirm: onConfirmCallback
      };
    };
    const handleAlertConfirm = () => {
      if (alertDialog.value.onConfirm) {
        alertDialog.value.onConfirm();
      }
      closeAlert();
    };
    const handleAlertCancel = () => {
    };
    const closeAlert = () => {
      alertDialog.value.show = false;
    };
    const submit = () => {
      const formData = {
        ...form.data(),
        payment_vouchers: paymentVouchers.value.filter((v) => v.voucher_no && v.description && v.amount),
        receipt_vouchers: receiptVouchers.value.filter((v) => v.voucher_no && v.description && v.amount),
        reimbursement_items: reimbursementItems.value.filter((r) => r.description && r.amount && r.amount > 0),
        other_costs: form.other_costs.filter((c) => c.description && c.amount && c.amount > 0)
      };
      form.transform(() => formData).post(route("admin-keuangan.sales-orders.store"), {
        onSuccess: (page) => {
          var _a;
          console.log("Success response received:", page);
          console.log("Page component:", page.component);
          console.log("Page props:", page.props);
          console.log("Flash messages:", (_a = page.props) == null ? void 0 : _a.flash);
          if (page.component === "Admin/AdminKeuangan/SalesOrders/Index") {
            console.log("Successfully redirected to index page");
            showAlert("success", "Berhasil", "Sales Order berhasil dibuat.");
          } else {
            console.log("Not redirected to index, component:", page.component);
            showAlert("success", "Berhasil", "Sales Order berhasil dibuat.", "OK", "", () => {
              window.location.href = route("admin-keuangan.sales-orders.index");
            });
          }
        },
        onError: (errors) => {
          console.error("Sales Order Creation Error:", errors);
          if (errors && Object.keys(errors).length > 0) {
            let errorMessages = [];
            Object.keys(errors).forEach((field) => {
              if (Array.isArray(errors[field])) {
                errorMessages.push(...errors[field]);
              } else {
                errorMessages.push(errors[field]);
              }
            });
            const errorMessage = errorMessages.length > 0 ? errorMessages.join(". ") : "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan.";
            showAlert("error", "Gagal Menyimpan", errorMessage);
          } else {
            showAlert("error", "Gagal Menyimpan", "Terjadi kesalahan saat menyimpan sales order. Silakan coba lagi.");
          }
        },
        onFinish: () => {
          console.log("Request finished");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-6" data-v-d75d5990${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-d75d5990${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-d75d5990${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-d75d5990${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-d75d5990${_scopeId}><div class="flex items-center" data-v-d75d5990${_scopeId}><div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" data-v-d75d5990${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-d75d5990${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-d75d5990${_scopeId}>Buat Shipping Order Baru</h1><p class="mt-1 text-sm text-gray-600" data-v-d75d5990${_scopeId}>Buat dokumen Shipping order untuk pelanggan</p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-d75d5990${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Kembali `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-d75d5990${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-d75d5990${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-d75d5990${_scopeId}>Form Shipping Order Baru</h3><p class="mt-1 text-sm text-gray-600" data-v-d75d5990${_scopeId}>Lengkapi informasi Shipping order dengan benar</p></div><div class="p-6" data-v-d75d5990${_scopeId}><form class="space-y-6" data-v-d75d5990${_scopeId}><div class="bg-white shadow overflow-visible sm:rounded-lg" data-v-d75d5990${_scopeId}><div class="px-6 py-4 border-b border-gray-200 bg-gray-50" data-v-d75d5990${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-d75d5990${_scopeId}>Pilih Metode Input</h3></div><div class="p-6" data-v-d75d5990${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="flex items-center" data-v-d75d5990${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(inputMethod.value, "manual")) ? " checked" : ""} value="manual" class="mr-3 text-sage-600 focus:ring-sage-500" data-v-d75d5990${_scopeId}><span class="text-sm font-medium text-sage-700" data-v-d75d5990${_scopeId}>Input Manual</span></label><p class="text-xs text-sage-500 mt-1 ml-6" data-v-d75d5990${_scopeId}>Isi semua data secara manual</p></div><div data-v-d75d5990${_scopeId}><label class="flex items-center" data-v-d75d5990${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(inputMethod.value, "customer")) ? " checked" : ""} value="customer" class="mr-3 text-sage-600 focus:ring-sage-500" data-v-d75d5990${_scopeId}><span class="text-sm font-medium text-sage-700" data-v-d75d5990${_scopeId}>Berdasarkan Data Pelanggan</span></label><p class="text-xs text-sage-500 mt-1 ml-6" data-v-d75d5990${_scopeId}>Auto-fill dari data pelanggan</p></div></div>`);
            if (inputMethod.value === "customer") {
              _push2(`<div class="mt-4" data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>Pilih Pelanggan</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: selectedCustomerId.value,
                "onUpdate:modelValue": ($event) => selectedCustomerId.value = $event,
                options: customerOptions.value,
                placeholder: "Cari pelanggan... (contoh: CI)",
                "label-field": "label",
                "sub-label-field": "subLabel",
                "value-field": "value",
                "search-fields": ["label", "subLabel", "company_name", "pic_name"],
                "input-class": "w-full px-3 py-2 pr-10 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                onSelect: onCustomerSelect
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-d75d5990${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-d75d5990${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-d75d5990${_scopeId}>Informasi Dasar</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-d75d5990${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.basic ? null : { display: "none" })}" class="p-6 space-y-4" data-v-d75d5990${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>ORDER NUMB <span class="text-red-500" data-v-d75d5990${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).order_number)} type="text" required readonly placeholder="EWILOG2509001001" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.order_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.order_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>REF NO</label><input${ssrRenderAttr("value", unref(form).ref_no)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.ref_no) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.ref_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>DATE</label><input${ssrRenderAttr("value", unref(form).so_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.so_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.so_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>CUSTOMER <span class="text-red-500" data-v-d75d5990${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).customer)} type="text" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.customer) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.customer)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>SHIPPER</label><input${ssrRenderAttr("value", unref(form).shipper)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.shipper) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.shipper)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-d75d5990${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-d75d5990${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-d75d5990${_scopeId}>Informasi Pengiriman</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-d75d5990${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.shipping ? null : { display: "none" })}" class="p-6 space-y-4" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>BL/AWB</label><input${ssrRenderAttr("value", unref(form).bl_awb)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.bl_awb) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.bl_awb)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>LINER</label><input${ssrRenderAttr("value", unref(form).liner)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.liner) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.liner)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>VESSEL</label><input${ssrRenderAttr("value", unref(form).vessel)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.vessel) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.vessel)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>ETA</label><input${ssrRenderAttr("value", unref(form).eta)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.eta) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.eta)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>ETD</label><input${ssrRenderAttr("value", unref(form).etd)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.etd) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.etd)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>AJU</label><input${ssrRenderAttr("value", unref(form).aju)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.aju) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.aju)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>SPPB DATE</label><input${ssrRenderAttr("value", unref(form).sppb_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.sppb_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.sppb_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>SHIPMENT TYPE</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}><option value="" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "") : ssrLooseEqual(unref(form).shipment_type, "")) ? " selected" : ""}${_scopeId}>Pilih Shipment Type</option><!--[-->`);
            ssrRenderList(__props.shipmentTypes, (shipmentType) => {
              _push2(`<option${ssrRenderAttr("value", shipmentType.code)} data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, shipmentType.code) : ssrLooseEqual(unref(form).shipment_type, shipmentType.code)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(shipmentType.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(form).errors.shipment_type) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.shipment_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>POL</label><input${ssrRenderAttr("value", unref(form).pol)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.pol) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.pol)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>POD</label><input${ssrRenderAttr("value", unref(form).pod)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.pod) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.pod)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>GUDANG/UTC</label><input${ssrRenderAttr("value", unref(form).gudang_utc)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.gudang_utc) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.gudang_utc)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>PARTY/LCL</label><input${ssrRenderAttr("value", unref(form).party_lcl)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.party_lcl) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.party_lcl)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>EXCHANGE RATE</label><input${ssrRenderAttr("value", unref(form).exchange_rate)} type="number" step="0.0001" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.exchange_rate) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.exchange_rate)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-d75d5990${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-d75d5990${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-d75d5990${_scopeId}>Informasi Pricing</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-d75d5990${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.pricing ? null : { display: "none" })}" class="p-6 space-y-6" data-v-d75d5990${_scopeId}><div class="bg-gray-50 rounded-lg p-4" data-v-d75d5990${_scopeId}><div class="flex justify-between items-center mb-4" data-v-d75d5990${_scopeId}><h4 class="text-md font-semibold text-sage-800" data-v-d75d5990${_scopeId}>Rincian Vendor (Buying &amp; Selling)</h4><button type="button" class="text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors" data-v-d75d5990${_scopeId}> + Tambah Vendor </button></div><!--[-->`);
            ssrRenderList(unref(form).vendor_breakdown, (item, index) => {
              _push2(`<div class="border border-sage-200 rounded-lg p-4 mb-4 space-y-4" data-v-d75d5990${_scopeId}><div class="grid grid-cols-12 gap-3" data-v-d75d5990${_scopeId}><div class="col-span-11" data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-d75d5990${_scopeId}>Nama Vendor</label><select class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}><option value="" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.vendor_id) ? ssrLooseContain(item.vendor_id, "") : ssrLooseEqual(item.vendor_id, "")) ? " selected" : ""}${_scopeId}>Pilih vendor...</option><!--[-->`);
              ssrRenderList(__props.vendors, (vendorOption) => {
                _push2(`<option${ssrRenderAttr("value", vendorOption.id)} data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.vendor_id) ? ssrLooseContain(item.vendor_id, vendorOption.id) : ssrLooseEqual(item.vendor_id, vendorOption.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendorOption.nama_vendor)}</option>`);
              });
              _push2(`<!--]--></select></div><div class="col-span-1" data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-transparent mb-1" data-v-d75d5990${_scopeId}>Del</label><button type="button" class="w-full h-10 text-red-600 hover:text-red-900 hover:bg-red-100 rounded transition-colors" data-v-d75d5990${_scopeId}> × </button></div></div><div class="grid grid-cols-2 gap-3" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-d75d5990${_scopeId}>Deskripsi Service / Jenis Biaya</label><select class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}><option value="" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, "") : ssrLooseEqual(item.description, "")) ? " selected" : ""}${_scopeId}>Pilih Jenis Biaya</option><!--[-->`);
              ssrRenderList(__props.serviceTypes, (serviceType) => {
                _push2(`<option${ssrRenderAttr("value", serviceType.code)} data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, serviceType.code) : ssrLooseEqual(item.description, serviceType.code)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(serviceType.code)}</option>`);
              });
              _push2(`<!--]--><option value="D/O CHARGES" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, "D/O CHARGES") : ssrLooseEqual(item.description, "D/O CHARGES")) ? " selected" : ""}${_scopeId}>D/O CHARGES</option><option value="LOLO" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, "LOLO") : ssrLooseEqual(item.description, "LOLO")) ? " selected" : ""}${_scopeId}>LOLO</option><option value="STORAGE" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, "STORAGE") : ssrLooseEqual(item.description, "STORAGE")) ? " selected" : ""}${_scopeId}>STORAGE</option><option value="REFUND" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, "REFUND") : ssrLooseEqual(item.description, "REFUND")) ? " selected" : ""}${_scopeId}>REFUND</option><option value="OTHER" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, "OTHER") : ssrLooseEqual(item.description, "OTHER")) ? " selected" : ""}${_scopeId}>OTHER</option></select></div><div data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-d75d5990${_scopeId}>RCVD INV</label><input${ssrRenderAttr("value", item.rcvd_inv)} type="text" placeholder="Nomor invoice yang diterima" class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}></div></div><div data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-d75d5990${_scopeId}>Remarks (Individual)</label><input${ssrRenderAttr("value", item.remarks)} type="text" placeholder="Catatan khusus untuk item ini" class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}></div><div class="grid grid-cols-3 gap-3 p-3 bg-blue-50 rounded-lg" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-blue-700 mb-1" data-v-d75d5990${_scopeId}>Buying Amount (Cost)</label><input${ssrRenderAttr("value", item.buying_amount)} type="number" step="0.01" placeholder="0.00" class="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" data-v-d75d5990${_scopeId}></div><div data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-green-700 mb-1" data-v-d75d5990${_scopeId}>Selling Amount (Revenue)</label><input${ssrRenderAttr("value", item.selling_amount)} type="number" step="0.01" placeholder="0.00" class="w-full px-3 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500" data-v-d75d5990${_scopeId}></div><div data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-d75d5990${_scopeId}>Revenue</label><p class="${ssrRenderClass([getProfit(item) >= 0 ? "text-green-600" : "text-red-600", "px-3 py-2 bg-white border border-purple-300 rounded text-sm font-semibold"])}" data-v-d75d5990${_scopeId}>${ssrInterpolate(formatCurrency(getProfit(item)))}</p></div></div>`);
              if (item.vendor_id) {
                _push2(`<div class="grid grid-cols-3 gap-3 p-3 bg-sage-50 rounded-lg" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-d75d5990${_scopeId}>Nama Vendor</label><p class="text-sm text-gray-900" data-v-d75d5990${_scopeId}>${ssrInterpolate(item.nama_vendor || "-")}</p></div><div data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-d75d5990${_scopeId}>Nomor Rekening</label><p class="text-sm text-gray-900 font-mono" data-v-d75d5990${_scopeId}>${ssrInterpolate(item.no_rekening || "-")}</p></div><div data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-d75d5990${_scopeId}>Nama Rekening</label><p class="text-sm text-gray-900" data-v-d75d5990${_scopeId}>${ssrInterpolate(item.nama_rekening || "-")}</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--><div class="mt-4 pt-4 border-t border-gray-300 grid grid-cols-3 gap-4 text-center" data-v-d75d5990${_scopeId}><div class="p-3 bg-blue-100 rounded-lg" data-v-d75d5990${_scopeId}><p class="text-xs font-medium text-blue-700" data-v-d75d5990${_scopeId}>Total Buying</p><p class="text-lg font-bold text-blue-800" data-v-d75d5990${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</p></div><div class="p-3 bg-green-100 rounded-lg" data-v-d75d5990${_scopeId}><p class="text-xs font-medium text-green-700" data-v-d75d5990${_scopeId}>Total Selling</p><p class="text-lg font-bold text-green-800" data-v-d75d5990${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</p></div><div class="${ssrRenderClass([totalRevenue.value >= 0 ? "bg-purple-100" : "bg-red-100", "p-3 rounded-lg"])}" data-v-d75d5990${_scopeId}><p class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-purple-700" : "text-red-700", "text-xs font-medium"])}" data-v-d75d5990${_scopeId}>Net Profit</p><p class="text-xs text-gray-500 mb-1" data-v-d75d5990${_scopeId}>(Sudah dikurangi semua biaya)</p><p class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-purple-800" : "text-red-800", "text-lg font-bold"])}" data-v-d75d5990${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</p></div></div>`);
            if (unref(form).vendor_breakdown.length > 0) {
              _push2(`<div class="flex justify-center mt-6 pt-4 border-t border-gray-200" data-v-d75d5990${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-d75d5990${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-d75d5990${_scopeId}></path></svg> Tambah Vendor Lagi </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-blue-50 rounded-lg p-4" data-v-d75d5990${_scopeId}><h4 class="text-md font-semibold text-blue-800 mb-3" data-v-d75d5990${_scopeId}>Ringkasan Revenue &amp; Profit </h4><div class="space-y-2" data-v-d75d5990${_scopeId}><div class="flex justify-between" data-v-d75d5990${_scopeId}><span data-v-d75d5990${_scopeId}>Total Pemasukan (Selling):</span><span class="font-medium text-green-700" data-v-d75d5990${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</span></div><div class="flex justify-between" data-v-d75d5990${_scopeId}><span data-v-d75d5990${_scopeId}>Total Pengeluaran (Buying):</span><span class="font-medium text-red-700" data-v-d75d5990${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</span></div><div class="flex justify-between" data-v-d75d5990${_scopeId}><span data-v-d75d5990${_scopeId}>Biaya Operasional:</span><span class="font-medium text-orange-700" data-v-d75d5990${_scopeId}>${ssrInterpolate(formatCurrency(totalOtherCosts.value))}</span></div><div class="flex justify-between" data-v-d75d5990${_scopeId}><span data-v-d75d5990${_scopeId}>Total Reimbursement:</span><span class="font-medium text-purple-700" data-v-d75d5990${_scopeId}>${ssrInterpolate(formatCurrency(totalReimbursement.value))}</span></div><div class="flex justify-between border-t border-blue-200 pt-2 mt-1" data-v-d75d5990${_scopeId}><span class="text-sm font-medium text-gray-700" data-v-d75d5990${_scopeId}>Total Pengeluaran Keseluruhan:</span><span class="text-sm font-bold text-red-800" data-v-d75d5990${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value + totalOtherCosts.value + totalReimbursement.value))}</span></div><div class="flex justify-between items-center pt-2 border-t border-blue-300 font-bold text-lg" data-v-d75d5990${_scopeId}><span data-v-d75d5990${_scopeId}>Net Profit:</span><span class="${ssrRenderClass(totalRevenue.value >= 0 ? "text-green-600" : "text-red-600")}" data-v-d75d5990${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</span></div></div></div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>REMARKS</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea>`);
            if (unref(form).errors.remarks) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.remarks)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>NOTE</label><textarea rows="3" placeholder="Catatan tambahan untuk sales order ini" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).note)}</textarea>`);
            if (unref(form).errors.note) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.note)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-d75d5990${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-d75d5990${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-d75d5990${_scopeId}>Biaya Beban Lain (Operational)</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.other_costs }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-d75d5990${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.other_costs ? null : { display: "none" })}" class="p-6" data-v-d75d5990${_scopeId}><div class="bg-orange-50 rounded-lg p-4" data-v-d75d5990${_scopeId}><div class="flex justify-between items-center mb-4" data-v-d75d5990${_scopeId}><h4 class="text-md font-semibold text-orange-800" data-v-d75d5990${_scopeId}>Biaya Beban Lain (Operational)</h4><button type="button" class="text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition-colors" data-v-d75d5990${_scopeId}> + Tambah Biaya </button></div>`);
            if (unref(form).other_costs && unref(form).other_costs.length > 0) {
              _push2(`<div class="space-y-3" data-v-d75d5990${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).other_costs, (cost, index) => {
                _push2(`<div class="border border-orange-200 rounded-lg p-3 bg-white" data-v-d75d5990${_scopeId}><div class="grid grid-cols-12 gap-3" data-v-d75d5990${_scopeId}><div class="col-span-5" data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-d75d5990${_scopeId}>Deskripsi Biaya</label><input${ssrRenderAttr("value", cost.description)} type="text" placeholder="Contoh: Biaya handling, dokumen, dll" class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" data-v-d75d5990${_scopeId}></div><div class="col-span-3" data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-d75d5990${_scopeId}>Jumlah Biaya</label><input${ssrRenderAttr("value", cost.amount)} type="number" min="0" step="0.01" placeholder="0" class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" data-v-d75d5990${_scopeId}></div><div class="col-span-3" data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-d75d5990${_scopeId}>Kategori</label><select class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" data-v-d75d5990${_scopeId}><option value="" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(cost.category) ? ssrLooseContain(cost.category, "") : ssrLooseEqual(cost.category, "")) ? " selected" : ""}${_scopeId}>Pilih kategori</option><!--[-->`);
                ssrRenderList(__props.operationalCostCategories, (category) => {
                  _push2(`<option${ssrRenderAttr("value", category.name)}${ssrRenderAttr("title", category.description)} data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(cost.category) ? ssrLooseContain(cost.category, category.name) : ssrLooseEqual(cost.category, category.name)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
                });
                _push2(`<!--]--></select></div><div class="col-span-1 flex items-end" data-v-d75d5990${_scopeId}><button type="button" class="w-full px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"${ssrIncludeBooleanAttr(unref(form).other_costs.length <= 1) ? " disabled" : ""} data-v-d75d5990${_scopeId}><svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d75d5990${_scopeId}></path></svg></button></div></div></div>`);
              });
              _push2(`<!--]--><div class="pt-3 border-t border-orange-300" data-v-d75d5990${_scopeId}><div class="flex justify-between items-center" data-v-d75d5990${_scopeId}><span class="text-sm font-medium text-orange-700" data-v-d75d5990${_scopeId}>Total Biaya Beban Lain:</span><span class="text-lg font-bold text-orange-800" data-v-d75d5990${_scopeId}>${ssrInterpolate(formatCurrency(totalOtherCosts.value))}</span></div></div><div class="flex justify-center mt-6 pt-4 border-t border-orange-200" data-v-d75d5990${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors" data-v-d75d5990${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-d75d5990${_scopeId}></path></svg> Tambah Biaya Lagi </button></div></div>`);
            } else {
              _push2(`<div class="text-center py-4 text-orange-600" data-v-d75d5990${_scopeId}><p class="text-sm" data-v-d75d5990${_scopeId}>Belum ada biaya beban lain</p><p class="text-xs text-orange-500" data-v-d75d5990${_scopeId}>Klik tombol &quot;Tambah Biaya&quot; untuk menambahkan</p></div>`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-d75d5990${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-d75d5990${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-d75d5990${_scopeId}>Items Reimbursement</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.reimbursement }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-d75d5990${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.reimbursement ? null : { display: "none" })}" class="p-6" data-v-d75d5990${_scopeId}><div class="bg-purple-50 rounded-lg p-4" data-v-d75d5990${_scopeId}><div class="flex justify-between items-center mb-4" data-v-d75d5990${_scopeId}><h4 class="text-md font-semibold text-purple-800" data-v-d75d5990${_scopeId}>Items Reimbursement</h4><button type="button" class="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors" data-v-d75d5990${_scopeId}> + Tambah Reimbursement </button></div>`);
            if (reimbursementItems.value && reimbursementItems.value.length > 0) {
              _push2(`<div class="space-y-3" data-v-d75d5990${_scopeId}><!--[-->`);
              ssrRenderList(reimbursementItems.value, (item, index) => {
                _push2(`<div class="border border-purple-200 rounded-lg p-3 bg-white" data-v-d75d5990${_scopeId}><div class="grid grid-cols-12 gap-3" data-v-d75d5990${_scopeId}><div class="col-span-4" data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-d75d5990${_scopeId}>Deskripsi</label><input${ssrRenderAttr("value", item.description)} type="text" placeholder="Contoh: Transport, Akomodasi, dll" class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" data-v-d75d5990${_scopeId}></div><div class="col-span-3" data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-d75d5990${_scopeId}>Jumlah</label><input${ssrRenderAttr("value", item.amount)} type="number" min="0" step="0.01" placeholder="0" class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" data-v-d75d5990${_scopeId}></div><div class="col-span-3" data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-d75d5990${_scopeId}>Kategori</label><select class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" data-v-d75d5990${_scopeId}><option value="" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "") : ssrLooseEqual(item.category, "")) ? " selected" : ""}${_scopeId}>Pilih kategori</option><option value="transport" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "transport") : ssrLooseEqual(item.category, "transport")) ? " selected" : ""}${_scopeId}>Transport</option><option value="accommodation" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "accommodation") : ssrLooseEqual(item.category, "accommodation")) ? " selected" : ""}${_scopeId}>Akomodasi</option><option value="meal" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "meal") : ssrLooseEqual(item.category, "meal")) ? " selected" : ""}${_scopeId}>Makan</option><option value="fuel" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "fuel") : ssrLooseEqual(item.category, "fuel")) ? " selected" : ""}${_scopeId}>BBM</option><option value="parking" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "parking") : ssrLooseEqual(item.category, "parking")) ? " selected" : ""}${_scopeId}>Parkir</option><option value="toll" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "toll") : ssrLooseEqual(item.category, "toll")) ? " selected" : ""}${_scopeId}>Tol</option><option value="admin" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "admin") : ssrLooseEqual(item.category, "admin")) ? " selected" : ""}${_scopeId}>Admin</option><option value="communication" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "communication") : ssrLooseEqual(item.category, "communication")) ? " selected" : ""}${_scopeId}>Komunikasi</option><option value="equipment" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "equipment") : ssrLooseEqual(item.category, "equipment")) ? " selected" : ""}${_scopeId}>Peralatan</option><option value="general" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "general") : ssrLooseEqual(item.category, "general")) ? " selected" : ""}${_scopeId}>Umum</option></select></div><div class="col-span-1 flex items-end" data-v-d75d5990${_scopeId}><button type="button" class="w-full px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors" data-v-d75d5990${_scopeId}><svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d75d5990${_scopeId}></path></svg></button></div></div><div class="mt-2" data-v-d75d5990${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-d75d5990${_scopeId}>Catatan (opsional)</label><textarea rows="2" placeholder="Catatan tambahan untuk item reimbursement ini" class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 resize-none" data-v-d75d5990${_scopeId}>${ssrInterpolate(item.notes)}</textarea></div></div>`);
              });
              _push2(`<!--]--><div class="pt-3 border-t border-purple-300" data-v-d75d5990${_scopeId}><div class="flex justify-between items-center" data-v-d75d5990${_scopeId}><span class="text-sm font-medium text-purple-700" data-v-d75d5990${_scopeId}>Total Reimbursement:</span><span class="text-lg font-bold text-purple-800" data-v-d75d5990${_scopeId}>${ssrInterpolate(formatCurrency(totalReimbursement.value))}</span></div></div><div class="flex justify-center mt-6 pt-4 border-t border-purple-200" data-v-d75d5990${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors" data-v-d75d5990${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-d75d5990${_scopeId}></path></svg> Tambah Reimbursement Lagi </button></div></div>`);
            } else {
              _push2(`<div class="text-center py-4 text-purple-600" data-v-d75d5990${_scopeId}><p class="text-sm" data-v-d75d5990${_scopeId}>Belum ada item reimbursement</p><p class="text-xs text-purple-500" data-v-d75d5990${_scopeId}>Klik tombol &quot;Tambah Reimbursement&quot; untuk menambahkan</p></div>`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-d75d5990${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-d75d5990${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-d75d5990${_scopeId}>Informasi Barang</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-d75d5990${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.goods ? null : { display: "none" })}" class="p-6 space-y-4" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>COMMODITY/URAIAN BARANG</label><textarea rows="3" placeholder="Masukkan uraian barang/commodity yang detail" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).commodity)}</textarea>`);
            if (unref(form).errors.commodity) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.commodity)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-d75d5990${_scopeId}><div class="max-w-xs" data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>QTY</label><div class="relative flex w-full" data-v-d75d5990${_scopeId}><input${ssrRenderAttr("value", unref(form).qty)} type="number" min="0" placeholder="0.00" class="w-28 px-3 py-2 border border-sage-300 rounded-l-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 focus:z-10" data-v-d75d5990${_scopeId}><div class="relative flex-1" data-v-d75d5990${_scopeId}><select class="h-full w-full px-3 py-2 border-t border-r border-b border-sage-300 bg-white rounded-r-lg appearance-none cursor-pointer focus:ring-2 focus:ring-sage-500 focus:border-sage-500 focus:z-10 pr-8" data-v-d75d5990${_scopeId}><option value="" data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(unref(form).package_unit) ? ssrLooseContain(unref(form).package_unit, "") : ssrLooseEqual(unref(form).package_unit, "")) ? " selected" : ""}${_scopeId}>Unit</option><!--[-->`);
            ssrRenderList(__props.packageUnits, (unit) => {
              _push2(`<option${ssrRenderAttr("value", unit.code)} data-v-d75d5990${ssrIncludeBooleanAttr(Array.isArray(unref(form).package_unit) ? ssrLooseContain(unref(form).package_unit, unit.code) : ssrLooseEqual(unref(form).package_unit, unit.code)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unit.code)}</option>`);
            });
            _push2(`<!--]--></select><div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none" data-v-d75d5990${_scopeId}><svg class="w-4 h-4 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-d75d5990${_scopeId}></path></svg></div></div></div>`);
            if (unref(form).errors.qty) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.qty)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).errors.package_unit) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.package_unit)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>NET WEIGHT (KG)</label><input${ssrRenderAttr("value", unref(form).net_weight)} type="number" step="0.01" min="0" placeholder="Masukkan berat netto dalam kg" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.net_weight) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.net_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>GROSS WEIGHT (KG)</label><input${ssrRenderAttr("value", unref(form).gross_weight)} type="number" step="0.01" min="0" placeholder="Masukkan berat kotor dalam kg" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.gross_weight) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.gross_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>MEAS (M³)</label><input${ssrRenderAttr("value", unref(form).measurement)} type="number" step="0.001" min="0" placeholder="Masukkan volume dalam m³" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.measurement) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.measurement)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-d75d5990${_scopeId}><div class="flex justify-between items-center mb-2" data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-d75d5990${_scopeId}>CONTAINER NO</label><button type="button" class="text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors" data-v-d75d5990${_scopeId}> + Tambah Container </button></div><!--[-->`);
            ssrRenderList(unref(form).container_no, (container, index) => {
              _push2(`<div class="flex gap-2 mb-2" data-v-d75d5990${_scopeId}><input${ssrRenderAttr("value", unref(form).container_no[index])} type="text" placeholder="Masukkan nomor container (misal: TCLU1234567)" class="flex-1 px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
              if (unref(form).container_no.length > 1) {
                _push2(`<button type="button" class="px-3 py-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors" data-v-d75d5990${_scopeId}> × </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (unref(form).errors.container_no) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.container_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).container_no.length > 0) {
              _push2(`<div class="flex justify-center mt-4 pt-4 border-t border-sage-200" data-v-d75d5990${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-d75d5990${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-d75d5990${_scopeId}></path></svg> Tambah Container Lagi </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-d75d5990${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-d75d5990${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-d75d5990${_scopeId}>Informasi Invoice</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.invoice }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-d75d5990${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.invoice ? null : { display: "none" })}" class="p-6 space-y-4" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>INVOICE NUMB</label><input${ssrRenderAttr("value", unref(form).invoice_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.invoice_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>INVOICE DATE</label><input${ssrRenderAttr("value", unref(form).invoice_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.invoice_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d75d5990${_scopeId}>T.O.P</label><input${ssrRenderAttr("value", unref(form).top)} type="text" placeholder="e.g., NET 30" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}>`);
            if (unref(form).errors.top) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-d75d5990${_scopeId}>${ssrInterpolate(unref(form).errors.top)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-d75d5990${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-d75d5990${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-d75d5990${_scopeId}>Voucher Management</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.voucher }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-d75d5990${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.voucher ? null : { display: "none" })}" class="p-6 space-y-6" data-v-d75d5990${_scopeId}><div class="space-y-4" data-v-d75d5990${_scopeId}><div class="flex items-center justify-between" data-v-d75d5990${_scopeId}><h4 class="text-md font-semibold text-sage-700" data-v-d75d5990${_scopeId}>Payment Vouchers</h4><button type="button" class="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" data-v-d75d5990${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-d75d5990${_scopeId}></path></svg> Add Payment </button></div>`);
            if (paymentVouchers.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg" data-v-d75d5990${_scopeId}> No payment vouchers added yet </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(paymentVouchers.value, (voucher, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4 space-y-3" data-v-d75d5990${_scopeId}><div class="flex justify-between items-center" data-v-d75d5990${_scopeId}><h5 class="font-medium text-gray-700" data-v-d75d5990${_scopeId}>Payment Voucher #${ssrInterpolate(index + 1)}</h5><button type="button" class="text-red-600 hover:text-red-800" data-v-d75d5990${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d75d5990${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d75d5990${_scopeId}>Voucher No</label><input${ssrRenderAttr("value", voucher.voucher_no)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., PAY-001" data-v-d75d5990${_scopeId}></div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d75d5990${_scopeId}>Date</label><input${ssrRenderAttr("value", voucher.date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}></div></div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d75d5990${_scopeId}>Description</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" placeholder="e.g., Biaya Driver" data-v-d75d5990${_scopeId}>${ssrInterpolate(voucher.description)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d75d5990${_scopeId}>Amount</label><input${ssrRenderAttr("value", voucher.amount)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="500000" data-v-d75d5990${_scopeId}></div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d75d5990${_scopeId}>Prepared By</label><input${ssrRenderAttr("value", voucher.prepared_by)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Staff name" data-v-d75d5990${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]-->`);
            if (paymentVouchers.value.length > 0) {
              _push2(`<div class="flex justify-center mt-6 pt-4 border-t border-blue-200" data-v-d75d5990${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-d75d5990${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-d75d5990${_scopeId}></path></svg> Add Payment Lagi </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-4" data-v-d75d5990${_scopeId}><div class="flex items-center justify-between" data-v-d75d5990${_scopeId}><h4 class="text-md font-semibold text-sage-700" data-v-d75d5990${_scopeId}>Receipt Vouchers</h4><button type="button" class="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors" data-v-d75d5990${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-d75d5990${_scopeId}></path></svg> Add Receipt </button></div>`);
            if (receiptVouchers.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg" data-v-d75d5990${_scopeId}> No receipt vouchers added yet </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(receiptVouchers.value, (voucher, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4 space-y-3" data-v-d75d5990${_scopeId}><div class="flex justify-between items-center" data-v-d75d5990${_scopeId}><h5 class="font-medium text-gray-700" data-v-d75d5990${_scopeId}>Receipt Voucher #${ssrInterpolate(index + 1)}</h5><button type="button" class="text-red-600 hover:text-red-800" data-v-d75d5990${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d75d5990${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d75d5990${_scopeId}>Voucher No</label><input${ssrRenderAttr("value", voucher.voucher_no)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., REC-001" data-v-d75d5990${_scopeId}></div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d75d5990${_scopeId}>Date</label><input${ssrRenderAttr("value", voucher.date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d75d5990${_scopeId}></div></div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d75d5990${_scopeId}>Description</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" placeholder="e.g., Payment received from client" data-v-d75d5990${_scopeId}>${ssrInterpolate(voucher.description)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-d75d5990${_scopeId}><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d75d5990${_scopeId}>Amount</label><input${ssrRenderAttr("value", voucher.amount)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="1000000" data-v-d75d5990${_scopeId}></div><div data-v-d75d5990${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-d75d5990${_scopeId}>Prepared By</label><input${ssrRenderAttr("value", voucher.prepared_by)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Staff name" data-v-d75d5990${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]-->`);
            if (receiptVouchers.value.length > 0) {
              _push2(`<div class="flex justify-center mt-6 pt-4 border-t border-green-200" data-v-d75d5990${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" data-v-d75d5990${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-d75d5990${_scopeId}></path></svg> Add Receipt Lagi </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" data-v-d75d5990${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.sales-orders.index"),
              class: "inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-d75d5990${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-d75d5990${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-d75d5990${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-d75d5990${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-d75d5990${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-d75d5990${_scopeId}>Simpan Shipping Order</span>`);
            }
            _push2(`</button></div></form></div></div></div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: alertDialog.value.show,
              type: alertDialog.value.type,
              title: alertDialog.value.title,
              message: alertDialog.value.message,
              "confirm-text": alertDialog.value.confirmText,
              "cancel-text": alertDialog.value.cancelText,
              onConfirm: handleAlertConfirm,
              onCancel: handleAlertCancel,
              onClose: closeAlert
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" }, [
                            createVNode(unref(Plus), { class: "w-6 h-6 text-white" })
                          ]),
                          createVNode("div", null, [
                            createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, "Buat Shipping Order Baru"),
                            createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Buat dokumen Shipping order untuk pelanggan")
                          ])
                        ]),
                        createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-keuangan.sales-orders.index"),
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Kembali ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Form Shipping Order Baru"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Lengkapi informasi Shipping order dengan benar")
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "bg-white shadow overflow-visible sm:rounded-lg" }, [
                          createVNode("div", { class: "px-6 py-4 border-b border-gray-200 bg-gray-50" }, [
                            createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Pilih Metode Input")
                          ]),
                          createVNode("div", { class: "p-6" }, [
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "flex items-center" }, [
                                  withDirectives(createVNode("input", {
                                    type: "radio",
                                    "onUpdate:modelValue": ($event) => inputMethod.value = $event,
                                    value: "manual",
                                    class: "mr-3 text-sage-600 focus:ring-sage-500"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelRadio, inputMethod.value]
                                  ]),
                                  createVNode("span", { class: "text-sm font-medium text-sage-700" }, "Input Manual")
                                ]),
                                createVNode("p", { class: "text-xs text-sage-500 mt-1 ml-6" }, "Isi semua data secara manual")
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "flex items-center" }, [
                                  withDirectives(createVNode("input", {
                                    type: "radio",
                                    "onUpdate:modelValue": ($event) => inputMethod.value = $event,
                                    value: "customer",
                                    class: "mr-3 text-sage-600 focus:ring-sage-500"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelRadio, inputMethod.value]
                                  ]),
                                  createVNode("span", { class: "text-sm font-medium text-sage-700" }, "Berdasarkan Data Pelanggan")
                                ]),
                                createVNode("p", { class: "text-xs text-sage-500 mt-1 ml-6" }, "Auto-fill dari data pelanggan")
                              ])
                            ]),
                            inputMethod.value === "customer" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-4"
                            }, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Pilih Pelanggan"),
                              createVNode(_sfc_main$1, {
                                modelValue: selectedCustomerId.value,
                                "onUpdate:modelValue": ($event) => selectedCustomerId.value = $event,
                                options: customerOptions.value,
                                placeholder: "Cari pelanggan... (contoh: CI)",
                                "label-field": "label",
                                "sub-label-field": "subLabel",
                                "value-field": "value",
                                "search-fields": ["label", "subLabel", "company_name", "pic_name"],
                                "input-class": "w-full px-3 py-2 pr-10 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                onSelect: onCustomerSelect
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                          createVNode("div", {
                            onClick: ($event) => toggleSection("basic"),
                            class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                          }, [
                            createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Dasar"),
                            (openBlock(), createBlock("svg", {
                              class: [{ "rotate-180": !sections.value.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M19 9l-7 7-7-7"
                              })
                            ], 2))
                          ], 8, ["onClick"]),
                          withDirectives(createVNode("div", { class: "p-6 space-y-4" }, [
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                                  createTextVNode("ORDER NUMB "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).order_number = $event,
                                  type: "text",
                                  required: "",
                                  readonly: "",
                                  placeholder: "EWILOG2509001001",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).order_number]
                                ]),
                                unref(form).errors.order_number ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-2 text-sm text-red-600"
                                }, toDisplayString(unref(form).errors.order_number), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "REF NO"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).ref_no = $event,
                                  type: "text",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).ref_no]
                                ]),
                                unref(form).errors.ref_no ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-2 text-sm text-red-600"
                                }, toDisplayString(unref(form).errors.ref_no), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "DATE"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).so_date = $event,
                                  type: "date",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).so_date]
                                ]),
                                unref(form).errors.so_date ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-2 text-sm text-red-600"
                                }, toDisplayString(unref(form).errors.so_date), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                                createTextVNode("CUSTOMER "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).customer = $event,
                                type: "text",
                                required: "",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).customer]
                              ]),
                              unref(form).errors.customer ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.customer), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "SHIPPER"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).shipper = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).shipper]
                              ]),
                              unref(form).errors.shipper ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.shipper), 1)) : createCommentVNode("", true)
                            ])
                          ], 512), [
                            [vShow, sections.value.basic]
                          ])
                        ]),
                        createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                          createVNode("div", {
                            onClick: ($event) => toggleSection("shipping"),
                            class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                          }, [
                            createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Pengiriman"),
                            (openBlock(), createBlock("svg", {
                              class: [{ "rotate-180": !sections.value.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M19 9l-7 7-7-7"
                              })
                            ], 2))
                          ], 8, ["onClick"]),
                          withDirectives(createVNode("div", { class: "p-6 space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "BL/AWB"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).bl_awb = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).bl_awb]
                              ]),
                              unref(form).errors.bl_awb ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.bl_awb), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "LINER"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).liner = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).liner]
                              ]),
                              unref(form).errors.liner ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.liner), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "VESSEL"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).vessel = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).vessel]
                              ]),
                              unref(form).errors.vessel ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.vessel), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "ETA"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).eta = $event,
                                  type: "date",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).eta]
                                ]),
                                unref(form).errors.eta ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-2 text-sm text-red-600"
                                }, toDisplayString(unref(form).errors.eta), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "ETD"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).etd = $event,
                                  type: "date",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).etd]
                                ]),
                                unref(form).errors.etd ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-2 text-sm text-red-600"
                                }, toDisplayString(unref(form).errors.etd), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "AJU"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).aju = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).aju]
                              ]),
                              unref(form).errors.aju ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.aju), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "SPPB DATE"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).sppb_date = $event,
                                type: "date",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).sppb_date]
                              ]),
                              unref(form).errors.sppb_date ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.sppb_date), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "SHIPMENT TYPE"),
                              withDirectives(createVNode("select", {
                                "onUpdate:modelValue": ($event) => unref(form).shipment_type = $event,
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, [
                                createVNode("option", { value: "" }, "Pilih Shipment Type"),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.shipmentTypes, (shipmentType) => {
                                  return openBlock(), createBlock("option", {
                                    key: shipmentType.id,
                                    value: shipmentType.code
                                  }, toDisplayString(shipmentType.name), 9, ["value"]);
                                }), 128))
                              ], 8, ["onUpdate:modelValue"]), [
                                [vModelSelect, unref(form).shipment_type]
                              ]),
                              unref(form).errors.shipment_type ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.shipment_type), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "POL"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).pol = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).pol]
                              ]),
                              unref(form).errors.pol ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.pol), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "POD"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).pod = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).pod]
                              ]),
                              unref(form).errors.pod ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.pod), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "GUDANG/UTC"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).gudang_utc = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).gudang_utc]
                              ]),
                              unref(form).errors.gudang_utc ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.gudang_utc), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "PARTY/LCL"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).party_lcl = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).party_lcl]
                              ]),
                              unref(form).errors.party_lcl ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.party_lcl), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "EXCHANGE RATE"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).exchange_rate = $event,
                                type: "number",
                                step: "0.0001",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).exchange_rate]
                              ]),
                              unref(form).errors.exchange_rate ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.exchange_rate), 1)) : createCommentVNode("", true)
                            ])
                          ], 512), [
                            [vShow, sections.value.shipping]
                          ])
                        ]),
                        createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                          createVNode("div", {
                            onClick: ($event) => toggleSection("pricing"),
                            class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                          }, [
                            createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Pricing"),
                            (openBlock(), createBlock("svg", {
                              class: [{ "rotate-180": !sections.value.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M19 9l-7 7-7-7"
                              })
                            ], 2))
                          ], 8, ["onClick"]),
                          withDirectives(createVNode("div", { class: "p-6 space-y-6" }, [
                            createVNode("div", { class: "bg-gray-50 rounded-lg p-4" }, [
                              createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                                createVNode("h4", { class: "text-md font-semibold text-sage-800" }, "Rincian Vendor (Buying & Selling)"),
                                createVNode("button", {
                                  type: "button",
                                  onClick: addVendorItem,
                                  class: "text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors"
                                }, " + Tambah Vendor ")
                              ]),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(form).vendor_breakdown, (item, index) => {
                                return openBlock(), createBlock("div", {
                                  key: index,
                                  class: "border border-sage-200 rounded-lg p-4 mb-4 space-y-4"
                                }, [
                                  createVNode("div", { class: "grid grid-cols-12 gap-3" }, [
                                    createVNode("div", { class: "col-span-11" }, [
                                      createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Nama Vendor"),
                                      withDirectives(createVNode("select", {
                                        "onUpdate:modelValue": ($event) => item.vendor_id = $event,
                                        onChange: ($event) => onVendorSelect(index),
                                        class: "w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                      }, [
                                        createVNode("option", { value: "" }, "Pilih vendor..."),
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors, (vendorOption) => {
                                          return openBlock(), createBlock("option", {
                                            key: vendorOption.id,
                                            value: vendorOption.id
                                          }, toDisplayString(vendorOption.nama_vendor), 9, ["value"]);
                                        }), 128))
                                      ], 40, ["onUpdate:modelValue", "onChange"]), [
                                        [vModelSelect, item.vendor_id]
                                      ])
                                    ]),
                                    createVNode("div", { class: "col-span-1" }, [
                                      createVNode("label", { class: "block text-xs font-medium text-transparent mb-1" }, "Del"),
                                      createVNode("button", {
                                        type: "button",
                                        onClick: ($event) => removeVendorItem(index),
                                        class: "w-full h-10 text-red-600 hover:text-red-900 hover:bg-red-100 rounded transition-colors"
                                      }, " × ", 8, ["onClick"])
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Deskripsi Service / Jenis Biaya"),
                                      withDirectives(createVNode("select", {
                                        "onUpdate:modelValue": ($event) => item.description = $event,
                                        class: "w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                      }, [
                                        createVNode("option", { value: "" }, "Pilih Jenis Biaya"),
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.serviceTypes, (serviceType) => {
                                          return openBlock(), createBlock("option", {
                                            key: serviceType.id,
                                            value: serviceType.code
                                          }, toDisplayString(serviceType.code), 9, ["value"]);
                                        }), 128)),
                                        createVNode("option", { value: "D/O CHARGES" }, "D/O CHARGES"),
                                        createVNode("option", { value: "LOLO" }, "LOLO"),
                                        createVNode("option", { value: "STORAGE" }, "STORAGE"),
                                        createVNode("option", { value: "REFUND" }, "REFUND"),
                                        createVNode("option", { value: "OTHER" }, "OTHER")
                                      ], 8, ["onUpdate:modelValue"]), [
                                        [vModelSelect, item.description]
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "RCVD INV"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => item.rcvd_inv = $event,
                                        type: "text",
                                        placeholder: "Nomor invoice yang diterima",
                                        class: "w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, item.rcvd_inv]
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Remarks (Individual)"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => item.remarks = $event,
                                      type: "text",
                                      placeholder: "Catatan khusus untuk item ini",
                                      class: "w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, item.remarks]
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-3 gap-3 p-3 bg-blue-50 rounded-lg" }, [
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-xs font-medium text-blue-700 mb-1" }, "Buying Amount (Cost)"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => item.buying_amount = $event,
                                        type: "number",
                                        step: "0.01",
                                        placeholder: "0.00",
                                        onInput: calculateTotals,
                                        class: "w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      }, null, 40, ["onUpdate:modelValue"]), [
                                        [vModelText, item.buying_amount]
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-xs font-medium text-green-700 mb-1" }, "Selling Amount (Revenue)"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => item.selling_amount = $event,
                                        type: "number",
                                        step: "0.01",
                                        placeholder: "0.00",
                                        onInput: calculateTotals,
                                        class: "w-full px-3 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                      }, null, 40, ["onUpdate:modelValue"]), [
                                        [vModelText, item.selling_amount]
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Revenue"),
                                      createVNode("p", {
                                        class: ["px-3 py-2 bg-white border border-purple-300 rounded text-sm font-semibold", getProfit(item) >= 0 ? "text-green-600" : "text-red-600"]
                                      }, toDisplayString(formatCurrency(getProfit(item))), 3)
                                    ])
                                  ]),
                                  item.vendor_id ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "grid grid-cols-3 gap-3 p-3 bg-sage-50 rounded-lg"
                                  }, [
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Nama Vendor"),
                                      createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(item.nama_vendor || "-"), 1)
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Nomor Rekening"),
                                      createVNode("p", { class: "text-sm text-gray-900 font-mono" }, toDisplayString(item.no_rekening || "-"), 1)
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Nama Rekening"),
                                      createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(item.nama_rekening || "-"), 1)
                                    ])
                                  ])) : createCommentVNode("", true)
                                ]);
                              }), 128)),
                              createVNode("div", { class: "mt-4 pt-4 border-t border-gray-300 grid grid-cols-3 gap-4 text-center" }, [
                                createVNode("div", { class: "p-3 bg-blue-100 rounded-lg" }, [
                                  createVNode("p", { class: "text-xs font-medium text-blue-700" }, "Total Buying"),
                                  createVNode("p", { class: "text-lg font-bold text-blue-800" }, toDisplayString(formatCurrency(totalBuying.value)), 1)
                                ]),
                                createVNode("div", { class: "p-3 bg-green-100 rounded-lg" }, [
                                  createVNode("p", { class: "text-xs font-medium text-green-700" }, "Total Selling"),
                                  createVNode("p", { class: "text-lg font-bold text-green-800" }, toDisplayString(formatCurrency(totalSelling.value)), 1)
                                ]),
                                createVNode("div", {
                                  class: ["p-3 rounded-lg", totalRevenue.value >= 0 ? "bg-purple-100" : "bg-red-100"]
                                }, [
                                  createVNode("p", {
                                    class: ["text-xs font-medium", totalRevenue.value >= 0 ? "text-purple-700" : "text-red-700"]
                                  }, "Net Profit", 2),
                                  createVNode("p", { class: "text-xs text-gray-500 mb-1" }, "(Sudah dikurangi semua biaya)"),
                                  createVNode("p", {
                                    class: ["text-lg font-bold", totalRevenue.value >= 0 ? "text-purple-800" : "text-red-800"]
                                  }, toDisplayString(formatCurrency(totalRevenue.value)), 3)
                                ], 2)
                              ]),
                              unref(form).vendor_breakdown.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex justify-center mt-6 pt-4 border-t border-gray-200"
                              }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: addVendorItem,
                                  class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4 mr-2",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    })
                                  ])),
                                  createTextVNode(" Tambah Vendor Lagi ")
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "bg-blue-50 rounded-lg p-4" }, [
                              createVNode("h4", { class: "text-md font-semibold text-blue-800 mb-3" }, "Ringkasan Revenue & Profit "),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("div", { class: "flex justify-between" }, [
                                  createVNode("span", null, "Total Pemasukan (Selling):"),
                                  createVNode("span", { class: "font-medium text-green-700" }, toDisplayString(formatCurrency(totalSelling.value)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between" }, [
                                  createVNode("span", null, "Total Pengeluaran (Buying):"),
                                  createVNode("span", { class: "font-medium text-red-700" }, toDisplayString(formatCurrency(totalBuying.value)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between" }, [
                                  createVNode("span", null, "Biaya Operasional:"),
                                  createVNode("span", { class: "font-medium text-orange-700" }, toDisplayString(formatCurrency(totalOtherCosts.value)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between" }, [
                                  createVNode("span", null, "Total Reimbursement:"),
                                  createVNode("span", { class: "font-medium text-purple-700" }, toDisplayString(formatCurrency(totalReimbursement.value)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between border-t border-blue-200 pt-2 mt-1" }, [
                                  createVNode("span", { class: "text-sm font-medium text-gray-700" }, "Total Pengeluaran Keseluruhan:"),
                                  createVNode("span", { class: "text-sm font-bold text-red-800" }, toDisplayString(formatCurrency(totalBuying.value + totalOtherCosts.value + totalReimbursement.value)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between items-center pt-2 border-t border-blue-300 font-bold text-lg" }, [
                                  createVNode("span", null, "Net Profit:"),
                                  createVNode("span", {
                                    class: totalRevenue.value >= 0 ? "text-green-600" : "text-red-600"
                                  }, toDisplayString(formatCurrency(totalRevenue.value)), 3)
                                ])
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "REMARKS"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(form).remarks = $event,
                                rows: "3",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).remarks]
                              ]),
                              unref(form).errors.remarks ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.remarks), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "NOTE"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(form).note = $event,
                                rows: "3",
                                placeholder: "Catatan tambahan untuk sales order ini",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).note]
                              ]),
                              unref(form).errors.note ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.note), 1)) : createCommentVNode("", true)
                            ])
                          ], 512), [
                            [vShow, sections.value.pricing]
                          ])
                        ]),
                        createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                          createVNode("div", {
                            onClick: ($event) => toggleSection("other_costs"),
                            class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                          }, [
                            createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Biaya Beban Lain (Operational)"),
                            (openBlock(), createBlock("svg", {
                              class: [{ "rotate-180": !sections.value.other_costs }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M19 9l-7 7-7-7"
                              })
                            ], 2))
                          ], 8, ["onClick"]),
                          withDirectives(createVNode("div", { class: "p-6" }, [
                            createVNode("div", { class: "bg-orange-50 rounded-lg p-4" }, [
                              createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                                createVNode("h4", { class: "text-md font-semibold text-orange-800" }, "Biaya Beban Lain (Operational)"),
                                createVNode("button", {
                                  type: "button",
                                  onClick: addOtherCost,
                                  class: "text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition-colors"
                                }, " + Tambah Biaya ")
                              ]),
                              unref(form).other_costs && unref(form).other_costs.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "space-y-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(form).other_costs, (cost, index) => {
                                  return openBlock(), createBlock("div", {
                                    key: index,
                                    class: "border border-orange-200 rounded-lg p-3 bg-white"
                                  }, [
                                    createVNode("div", { class: "grid grid-cols-12 gap-3" }, [
                                      createVNode("div", { class: "col-span-5" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Deskripsi Biaya"),
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => cost.description = $event,
                                          type: "text",
                                          placeholder: "Contoh: Biaya handling, dokumen, dll",
                                          class: "w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, cost.description]
                                        ])
                                      ]),
                                      createVNode("div", { class: "col-span-3" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Jumlah Biaya"),
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => cost.amount = $event,
                                          type: "number",
                                          min: "0",
                                          step: "0.01",
                                          placeholder: "0",
                                          class: "w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, cost.amount]
                                        ])
                                      ]),
                                      createVNode("div", { class: "col-span-3" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Kategori"),
                                        withDirectives(createVNode("select", {
                                          "onUpdate:modelValue": ($event) => cost.category = $event,
                                          class: "w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                        }, [
                                          createVNode("option", { value: "" }, "Pilih kategori"),
                                          (openBlock(true), createBlock(Fragment, null, renderList(__props.operationalCostCategories, (category) => {
                                            return openBlock(), createBlock("option", {
                                              key: category.id,
                                              value: category.name,
                                              title: category.description
                                            }, toDisplayString(category.name), 9, ["value", "title"]);
                                          }), 128))
                                        ], 8, ["onUpdate:modelValue"]), [
                                          [vModelSelect, cost.category]
                                        ])
                                      ]),
                                      createVNode("div", { class: "col-span-1 flex items-end" }, [
                                        createVNode("button", {
                                          type: "button",
                                          onClick: ($event) => removeOtherCost(index),
                                          class: "w-full px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors",
                                          disabled: unref(form).other_costs.length <= 1
                                        }, [
                                          (openBlock(), createBlock("svg", {
                                            class: "w-4 h-4 mx-auto",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24"
                                          }, [
                                            createVNode("path", {
                                              "stroke-linecap": "round",
                                              "stroke-linejoin": "round",
                                              "stroke-width": "2",
                                              d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            })
                                          ]))
                                        ], 8, ["onClick", "disabled"])
                                      ])
                                    ])
                                  ]);
                                }), 128)),
                                createVNode("div", { class: "pt-3 border-t border-orange-300" }, [
                                  createVNode("div", { class: "flex justify-between items-center" }, [
                                    createVNode("span", { class: "text-sm font-medium text-orange-700" }, "Total Biaya Beban Lain:"),
                                    createVNode("span", { class: "text-lg font-bold text-orange-800" }, toDisplayString(formatCurrency(totalOtherCosts.value)), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "flex justify-center mt-6 pt-4 border-t border-orange-200" }, [
                                  createVNode("button", {
                                    type: "button",
                                    onClick: addOtherCost,
                                    class: "inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "w-4 h-4 mr-2",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                      })
                                    ])),
                                    createTextVNode(" Tambah Biaya Lagi ")
                                  ])
                                ])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-center py-4 text-orange-600"
                              }, [
                                createVNode("p", { class: "text-sm" }, "Belum ada biaya beban lain"),
                                createVNode("p", { class: "text-xs text-orange-500" }, 'Klik tombol "Tambah Biaya" untuk menambahkan')
                              ]))
                            ])
                          ], 512), [
                            [vShow, sections.value.other_costs]
                          ])
                        ]),
                        createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                          createVNode("div", {
                            onClick: ($event) => toggleSection("reimbursement"),
                            class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                          }, [
                            createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Items Reimbursement"),
                            (openBlock(), createBlock("svg", {
                              class: [{ "rotate-180": !sections.value.reimbursement }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M19 9l-7 7-7-7"
                              })
                            ], 2))
                          ], 8, ["onClick"]),
                          withDirectives(createVNode("div", { class: "p-6" }, [
                            createVNode("div", { class: "bg-purple-50 rounded-lg p-4" }, [
                              createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                                createVNode("h4", { class: "text-md font-semibold text-purple-800" }, "Items Reimbursement"),
                                createVNode("button", {
                                  type: "button",
                                  onClick: addReimbursementItem,
                                  class: "text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors"
                                }, " + Tambah Reimbursement ")
                              ]),
                              reimbursementItems.value && reimbursementItems.value.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "space-y-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(reimbursementItems.value, (item, index) => {
                                  return openBlock(), createBlock("div", {
                                    key: index,
                                    class: "border border-purple-200 rounded-lg p-3 bg-white"
                                  }, [
                                    createVNode("div", { class: "grid grid-cols-12 gap-3" }, [
                                      createVNode("div", { class: "col-span-4" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Deskripsi"),
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => item.description = $event,
                                          type: "text",
                                          placeholder: "Contoh: Transport, Akomodasi, dll",
                                          class: "w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, item.description]
                                        ])
                                      ]),
                                      createVNode("div", { class: "col-span-3" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Jumlah"),
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => item.amount = $event,
                                          type: "number",
                                          min: "0",
                                          step: "0.01",
                                          placeholder: "0",
                                          class: "w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, item.amount]
                                        ])
                                      ]),
                                      createVNode("div", { class: "col-span-3" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Kategori"),
                                        withDirectives(createVNode("select", {
                                          "onUpdate:modelValue": ($event) => item.category = $event,
                                          class: "w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                        }, [
                                          createVNode("option", { value: "" }, "Pilih kategori"),
                                          createVNode("option", { value: "transport" }, "Transport"),
                                          createVNode("option", { value: "accommodation" }, "Akomodasi"),
                                          createVNode("option", { value: "meal" }, "Makan"),
                                          createVNode("option", { value: "fuel" }, "BBM"),
                                          createVNode("option", { value: "parking" }, "Parkir"),
                                          createVNode("option", { value: "toll" }, "Tol"),
                                          createVNode("option", { value: "admin" }, "Admin"),
                                          createVNode("option", { value: "communication" }, "Komunikasi"),
                                          createVNode("option", { value: "equipment" }, "Peralatan"),
                                          createVNode("option", { value: "general" }, "Umum")
                                        ], 8, ["onUpdate:modelValue"]), [
                                          [vModelSelect, item.category]
                                        ])
                                      ]),
                                      createVNode("div", { class: "col-span-1 flex items-end" }, [
                                        createVNode("button", {
                                          type: "button",
                                          onClick: ($event) => removeReimbursementItem(index),
                                          class: "w-full px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                                        }, [
                                          (openBlock(), createBlock("svg", {
                                            class: "w-4 h-4 mx-auto",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24"
                                          }, [
                                            createVNode("path", {
                                              "stroke-linecap": "round",
                                              "stroke-linejoin": "round",
                                              "stroke-width": "2",
                                              d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            })
                                          ]))
                                        ], 8, ["onClick"])
                                      ])
                                    ]),
                                    createVNode("div", { class: "mt-2" }, [
                                      createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Catatan (opsional)"),
                                      withDirectives(createVNode("textarea", {
                                        "onUpdate:modelValue": ($event) => item.notes = $event,
                                        rows: "2",
                                        placeholder: "Catatan tambahan untuk item reimbursement ini",
                                        class: "w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 resize-none"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, item.notes]
                                      ])
                                    ])
                                  ]);
                                }), 128)),
                                createVNode("div", { class: "pt-3 border-t border-purple-300" }, [
                                  createVNode("div", { class: "flex justify-between items-center" }, [
                                    createVNode("span", { class: "text-sm font-medium text-purple-700" }, "Total Reimbursement:"),
                                    createVNode("span", { class: "text-lg font-bold text-purple-800" }, toDisplayString(formatCurrency(totalReimbursement.value)), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "flex justify-center mt-6 pt-4 border-t border-purple-200" }, [
                                  createVNode("button", {
                                    type: "button",
                                    onClick: addReimbursementItem,
                                    class: "inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "w-4 h-4 mr-2",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                      })
                                    ])),
                                    createTextVNode(" Tambah Reimbursement Lagi ")
                                  ])
                                ])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-center py-4 text-purple-600"
                              }, [
                                createVNode("p", { class: "text-sm" }, "Belum ada item reimbursement"),
                                createVNode("p", { class: "text-xs text-purple-500" }, 'Klik tombol "Tambah Reimbursement" untuk menambahkan')
                              ]))
                            ])
                          ], 512), [
                            [vShow, sections.value.reimbursement]
                          ])
                        ]),
                        createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                          createVNode("div", {
                            onClick: ($event) => toggleSection("goods"),
                            class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                          }, [
                            createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Barang"),
                            (openBlock(), createBlock("svg", {
                              class: [{ "rotate-180": !sections.value.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M19 9l-7 7-7-7"
                              })
                            ], 2))
                          ], 8, ["onClick"]),
                          withDirectives(createVNode("div", { class: "p-6 space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "COMMODITY/URAIAN BARANG"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => unref(form).commodity = $event,
                                rows: "3",
                                placeholder: "Masukkan uraian barang/commodity yang detail",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).commodity]
                              ]),
                              unref(form).errors.commodity ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.commodity), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                              createVNode("div", { class: "max-w-xs" }, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "QTY"),
                                createVNode("div", { class: "relative flex w-full" }, [
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(form).qty = $event,
                                    type: "number",
                                    min: "0",
                                    placeholder: "0.00",
                                    class: "w-28 px-3 py-2 border border-sage-300 rounded-l-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 focus:z-10"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(form).qty]
                                  ]),
                                  createVNode("div", { class: "relative flex-1" }, [
                                    withDirectives(createVNode("select", {
                                      "onUpdate:modelValue": ($event) => unref(form).package_unit = $event,
                                      class: "h-full w-full px-3 py-2 border-t border-r border-b border-sage-300 bg-white rounded-r-lg appearance-none cursor-pointer focus:ring-2 focus:ring-sage-500 focus:border-sage-500 focus:z-10 pr-8"
                                    }, [
                                      createVNode("option", { value: "" }, "Unit"),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.packageUnits, (unit) => {
                                        return openBlock(), createBlock("option", {
                                          key: unit.code,
                                          value: unit.code
                                        }, toDisplayString(unit.code), 9, ["value"]);
                                      }), 128))
                                    ], 8, ["onUpdate:modelValue"]), [
                                      [vModelSelect, unref(form).package_unit]
                                    ]),
                                    createVNode("div", { class: "absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none" }, [
                                      (openBlock(), createBlock("svg", {
                                        class: "w-4 h-4 text-sage-500",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M19 9l-7 7-7-7"
                                        })
                                      ]))
                                    ])
                                  ])
                                ]),
                                unref(form).errors.qty ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-2 text-sm text-red-600"
                                }, toDisplayString(unref(form).errors.qty), 1)) : createCommentVNode("", true),
                                unref(form).errors.package_unit ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "mt-2 text-sm text-red-600"
                                }, toDisplayString(unref(form).errors.package_unit), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "NET WEIGHT (KG)"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).net_weight = $event,
                                  type: "number",
                                  step: "0.01",
                                  min: "0",
                                  placeholder: "Masukkan berat netto dalam kg",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).net_weight]
                                ]),
                                unref(form).errors.net_weight ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-2 text-sm text-red-600"
                                }, toDisplayString(unref(form).errors.net_weight), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "GROSS WEIGHT (KG)"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).gross_weight = $event,
                                  type: "number",
                                  step: "0.01",
                                  min: "0",
                                  placeholder: "Masukkan berat kotor dalam kg",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).gross_weight]
                                ]),
                                unref(form).errors.gross_weight ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-2 text-sm text-red-600"
                                }, toDisplayString(unref(form).errors.gross_weight), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "MEAS (M³)"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).measurement = $event,
                                  type: "number",
                                  step: "0.001",
                                  min: "0",
                                  placeholder: "Masukkan volume dalam m³",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, unref(form).measurement]
                                ]),
                                unref(form).errors.measurement ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mt-2 text-sm text-red-600"
                                }, toDisplayString(unref(form).errors.measurement), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("div", { class: "flex justify-between items-center mb-2" }, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "CONTAINER NO"),
                                createVNode("button", {
                                  type: "button",
                                  onClick: addContainerNo,
                                  class: "text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors"
                                }, " + Tambah Container ")
                              ]),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(form).container_no, (container, index) => {
                                return openBlock(), createBlock("div", {
                                  key: "container-" + index,
                                  class: "flex gap-2 mb-2"
                                }, [
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(form).container_no[index] = $event,
                                    type: "text",
                                    placeholder: "Masukkan nomor container (misal: TCLU1234567)",
                                    class: "flex-1 px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(form).container_no[index]]
                                  ]),
                                  unref(form).container_no.length > 1 ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    type: "button",
                                    onClick: ($event) => removeContainerNo(index),
                                    class: "px-3 py-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors"
                                  }, " × ", 8, ["onClick"])) : createCommentVNode("", true)
                                ]);
                              }), 128)),
                              unref(form).errors.container_no ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.container_no), 1)) : createCommentVNode("", true),
                              unref(form).container_no.length > 0 ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex justify-center mt-4 pt-4 border-t border-sage-200"
                              }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: addContainerNo,
                                  class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4 mr-2",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    })
                                  ])),
                                  createTextVNode(" Tambah Container Lagi ")
                                ])
                              ])) : createCommentVNode("", true)
                            ])
                          ], 512), [
                            [vShow, sections.value.goods]
                          ])
                        ]),
                        createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                          createVNode("div", {
                            onClick: ($event) => toggleSection("invoice"),
                            class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                          }, [
                            createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Invoice"),
                            (openBlock(), createBlock("svg", {
                              class: [{ "rotate-180": !sections.value.invoice }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M19 9l-7 7-7-7"
                              })
                            ], 2))
                          ], 8, ["onClick"]),
                          withDirectives(createVNode("div", { class: "p-6 space-y-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "INVOICE NUMB"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).invoice_number = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).invoice_number]
                              ]),
                              unref(form).errors.invoice_number ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.invoice_number), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "INVOICE DATE"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).invoice_date = $event,
                                type: "date",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).invoice_date]
                              ]),
                              unref(form).errors.invoice_date ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.invoice_date), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "T.O.P"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).top = $event,
                                type: "text",
                                placeholder: "e.g., NET 30",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).top]
                              ]),
                              unref(form).errors.top ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.top), 1)) : createCommentVNode("", true)
                            ])
                          ], 512), [
                            [vShow, sections.value.invoice]
                          ])
                        ]),
                        createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                          createVNode("div", {
                            onClick: ($event) => toggleSection("voucher"),
                            class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                          }, [
                            createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Voucher Management"),
                            (openBlock(), createBlock("svg", {
                              class: [{ "rotate-180": !sections.value.voucher }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M19 9l-7 7-7-7"
                              })
                            ], 2))
                          ], 8, ["onClick"]),
                          withDirectives(createVNode("div", { class: "p-6 space-y-6" }, [
                            createVNode("div", { class: "space-y-4" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("h4", { class: "text-md font-semibold text-sage-700" }, "Payment Vouchers"),
                                createVNode("button", {
                                  type: "button",
                                  onClick: addPaymentVoucher,
                                  class: "inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4 mr-1",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    })
                                  ])),
                                  createTextVNode(" Add Payment ")
                                ])
                              ]),
                              paymentVouchers.value.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg"
                              }, " No payment vouchers added yet ")) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(paymentVouchers.value, (voucher, index) => {
                                return openBlock(), createBlock("div", {
                                  key: "payment-" + index,
                                  class: "border border-gray-200 rounded-lg p-4 space-y-3"
                                }, [
                                  createVNode("div", { class: "flex justify-between items-center" }, [
                                    createVNode("h5", { class: "font-medium text-gray-700" }, "Payment Voucher #" + toDisplayString(index + 1), 1),
                                    createVNode("button", {
                                      type: "button",
                                      onClick: ($event) => removePaymentVoucher(index),
                                      class: "text-red-600 hover:text-red-800"
                                    }, [
                                      (openBlock(), createBlock("svg", {
                                        class: "w-4 h-4",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        })
                                      ]))
                                    ], 8, ["onClick"])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Voucher No"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => voucher.voucher_no = $event,
                                        type: "text",
                                        class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                        placeholder: "e.g., PAY-001"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, voucher.voucher_no]
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Date"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => voucher.date = $event,
                                        type: "date",
                                        class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, voucher.date]
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                                    withDirectives(createVNode("textarea", {
                                      "onUpdate:modelValue": ($event) => voucher.description = $event,
                                      rows: "2",
                                      class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none",
                                      placeholder: "e.g., Biaya Driver"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, voucher.description]
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => voucher.amount = $event,
                                        type: "number",
                                        step: "0.01",
                                        min: "0",
                                        class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                        placeholder: "500000"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, voucher.amount]
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Prepared By"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => voucher.prepared_by = $event,
                                        type: "text",
                                        class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                        placeholder: "Staff name"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, voucher.prepared_by]
                                      ])
                                    ])
                                  ])
                                ]);
                              }), 128)),
                              paymentVouchers.value.length > 0 ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex justify-center mt-6 pt-4 border-t border-blue-200"
                              }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: addPaymentVoucher,
                                  class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4 mr-2",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    })
                                  ])),
                                  createTextVNode(" Add Payment Lagi ")
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "space-y-4" }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("h4", { class: "text-md font-semibold text-sage-700" }, "Receipt Vouchers"),
                                createVNode("button", {
                                  type: "button",
                                  onClick: addReceiptVoucher,
                                  class: "inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4 mr-1",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    })
                                  ])),
                                  createTextVNode(" Add Receipt ")
                                ])
                              ]),
                              receiptVouchers.value.length === 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg"
                              }, " No receipt vouchers added yet ")) : createCommentVNode("", true),
                              (openBlock(true), createBlock(Fragment, null, renderList(receiptVouchers.value, (voucher, index) => {
                                return openBlock(), createBlock("div", {
                                  key: "receipt-" + index,
                                  class: "border border-gray-200 rounded-lg p-4 space-y-3"
                                }, [
                                  createVNode("div", { class: "flex justify-between items-center" }, [
                                    createVNode("h5", { class: "font-medium text-gray-700" }, "Receipt Voucher #" + toDisplayString(index + 1), 1),
                                    createVNode("button", {
                                      type: "button",
                                      onClick: ($event) => removeReceiptVoucher(index),
                                      class: "text-red-600 hover:text-red-800"
                                    }, [
                                      (openBlock(), createBlock("svg", {
                                        class: "w-4 h-4",
                                        fill: "none",
                                        stroke: "currentColor",
                                        viewBox: "0 0 24 24"
                                      }, [
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        })
                                      ]))
                                    ], 8, ["onClick"])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Voucher No"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => voucher.voucher_no = $event,
                                        type: "text",
                                        class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                        placeholder: "e.g., REC-001"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, voucher.voucher_no]
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Date"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => voucher.date = $event,
                                        type: "date",
                                        class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, voucher.date]
                                      ])
                                    ])
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                                    withDirectives(createVNode("textarea", {
                                      "onUpdate:modelValue": ($event) => voucher.description = $event,
                                      rows: "2",
                                      class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none",
                                      placeholder: "e.g., Payment received from client"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, voucher.description]
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => voucher.amount = $event,
                                        type: "number",
                                        step: "0.01",
                                        min: "0",
                                        class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                        placeholder: "1000000"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, voucher.amount]
                                      ])
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Prepared By"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => voucher.prepared_by = $event,
                                        type: "text",
                                        class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                        placeholder: "Staff name"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, voucher.prepared_by]
                                      ])
                                    ])
                                  ])
                                ]);
                              }), 128)),
                              receiptVouchers.value.length > 0 ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex justify-center mt-6 pt-4 border-t border-green-200"
                              }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: addReceiptVoucher,
                                  class: "inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4 mr-2",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    })
                                  ])),
                                  createTextVNode(" Add Receipt Lagi ")
                                ])
                              ])) : createCommentVNode("", true)
                            ])
                          ], 512), [
                            [vShow, sections.value.voucher]
                          ])
                        ]),
                        createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-keuangan.sales-orders.index"),
                            class: "inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(form).processing,
                            class: "inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          }, [
                            unref(form).processing ? (openBlock(), createBlock("svg", {
                              key: 0,
                              class: "animate-spin -ml-1 mr-3 h-4 w-4 text-white",
                              fill: "none",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("circle", {
                                class: "opacity-25",
                                cx: "12",
                                cy: "12",
                                r: "10",
                                stroke: "currentColor",
                                "stroke-width": "4"
                              }),
                              createVNode("path", {
                                class: "opacity-75",
                                fill: "currentColor",
                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              })
                            ])) : createCommentVNode("", true),
                            unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Menyimpan...")) : (openBlock(), createBlock("span", { key: 2 }, "Simpan Shipping Order"))
                          ], 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ])
                ])
              ]),
              createVNode(AlertDialog, {
                show: alertDialog.value.show,
                type: alertDialog.value.type,
                title: alertDialog.value.title,
                message: alertDialog.value.message,
                "confirm-text": alertDialog.value.confirmText,
                "cancel-text": alertDialog.value.cancelText,
                onConfirm: handleAlertConfirm,
                onCancel: handleAlertCancel,
                onClose: closeAlert
              }, null, 8, ["show", "type", "title", "message", "confirm-text", "cancel-text"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/SalesOrders/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d75d5990"]]);
export {
  Create as default
};
