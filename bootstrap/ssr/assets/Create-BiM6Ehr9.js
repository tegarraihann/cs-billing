import { ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, createCommentVNode, withDirectives, vModelRadio, Fragment, renderList, toDisplayString, vModelSelect, vModelText, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseEqual, ssrLooseContain, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-5dkykGfh.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B-2d_OMK.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    customers: Array
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
    const paymentVouchers = ref([]);
    const receiptVouchers = ref([]);
    const sections = ref({
      basic: true,
      shipping: false,
      pricing: false,
      goods: false,
      invoice: false,
      voucher: false
    });
    const form = useForm({
      // Required fields based on requirements only
      order_number: "",
      customer: "",
      shipper: "",
      bl_awb: "",
      liner: "",
      vessel: "",
      eta: "",
      aju: "",
      sppb_date: "",
      shipment_type: "",
      pol: "",
      pod: "",
      gudang_utc: "",
      party_lcl: "",
      prepared_by: "",
      exchange_rate: "",
      jenis_biaya: "",
      buying: "",
      selling: "",
      revenue: "",
      remarks: "",
      goods: "",
      commodity: "",
      qty: "",
      net_weight: "",
      container_no: "",
      invoice_number: "",
      invoice_date: "",
      top: ""
    });
    const toggleSection = (section) => {
      sections.value[section] = !sections.value[section];
    };
    const onCustomerSelect = () => {
      var _a, _b;
      if (selectedCustomerId.value) {
        const customer = props.customers.find((c) => c.id == selectedCustomerId.value);
        if (customer) {
          form.customer = customer.consignee_shipper || "";
          form.bl_awb = customer.awb_bl_number || "";
          form.pol = customer.pol_pod ? ((_a = customer.pol_pod.split("/")[0]) == null ? void 0 : _a.trim()) || "" : "";
          form.pod = customer.pol_pod ? ((_b = customer.pol_pod.split("/")[1]) == null ? void 0 : _b.trim()) || "" : "";
          form.eta = customer.eta || "";
        }
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
    const showAlert = (type, title, message, confirmText = "", cancelText = "") => {
      alertDialog.value = {
        show: true,
        type,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: null
      };
    };
    const handleAlertConfirm = () => {
      if (alertDialog.value.onConfirm) {
        alertDialog.value.onConfirm();
      }
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
        receipt_vouchers: receiptVouchers.value.filter((v) => v.voucher_no && v.description && v.amount)
      };
      form.transform(() => formData).post(route("admin-cs.sales-orders.store"), {
        onSuccess: () => {
          showAlert("success", "Berhasil", "Sales Order berhasil dibuat.");
        },
        onError: (errors) => {
          const errorMessage = Object.keys(errors).length > 0 ? "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan." : "Terjadi kesalahan saat menyimpan sales order.";
          showAlert("error", "Gagal Menyimpan", errorMessage);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-2bff8257${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-2bff8257${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-2bff8257${_scopeId}><div class="flex items-center" data-v-2bff8257${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-2bff8257${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bff8257${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-2bff8257${_scopeId}></path></svg></div><div data-v-2bff8257${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-2bff8257${_scopeId}>Buat Sales Order Baru</h2><p class="text-sage-600" data-v-2bff8257${_scopeId}>Buat dokumen sales order untuk pelanggan</p></div></div><div class="mt-4 sm:mt-0" data-v-2bff8257${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bff8257${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-2bff8257${_scopeId2}></path></svg> Kembali `);
                } else {
                  return [
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
                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                      })
                    ])),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><form class="space-y-6" data-v-2bff8257${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-2bff8257${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-2bff8257${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-2bff8257${_scopeId}>Pilih Metode Input</h3></div><div class="p-6" data-v-2bff8257${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" data-v-2bff8257${_scopeId}><div data-v-2bff8257${_scopeId}><label class="flex items-center" data-v-2bff8257${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(inputMethod.value, "manual")) ? " checked" : ""} value="manual" class="mr-3 text-sage-600 focus:ring-sage-500" data-v-2bff8257${_scopeId}><span class="text-sm font-medium text-sage-700" data-v-2bff8257${_scopeId}>Input Manual</span></label><p class="text-xs text-sage-500 mt-1 ml-6" data-v-2bff8257${_scopeId}>Isi semua data secara manual</p></div><div data-v-2bff8257${_scopeId}><label class="flex items-center" data-v-2bff8257${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(inputMethod.value, "customer")) ? " checked" : ""} value="customer" class="mr-3 text-sage-600 focus:ring-sage-500" data-v-2bff8257${_scopeId}><span class="text-sm font-medium text-sage-700" data-v-2bff8257${_scopeId}>Berdasarkan Data Pelanggan</span></label><p class="text-xs text-sage-500 mt-1 ml-6" data-v-2bff8257${_scopeId}>Auto-fill dari data pelanggan</p></div></div>`);
            if (inputMethod.value === "customer") {
              _push2(`<div class="mt-4" data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>Pilih Pelanggan</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}><option value="" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(selectedCustomerId.value) ? ssrLooseContain(selectedCustomerId.value, "") : ssrLooseEqual(selectedCustomerId.value, "")) ? " selected" : ""}${_scopeId}>-- Pilih Pelanggan --</option><!--[-->`);
              ssrRenderList(__props.customers, (customer) => {
                _push2(`<option${ssrRenderAttr("value", customer.id)} data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(selectedCustomerId.value) ? ssrLooseContain(selectedCustomerId.value, customer.id) : ssrLooseEqual(selectedCustomerId.value, customer.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(customer.customer_code)} - ${ssrInterpolate(customer.consignee_shipper)}</option>`);
              });
              _push2(`<!--]--></select></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-2bff8257${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-2bff8257${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-2bff8257${_scopeId}>Informasi Dasar</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bff8257${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-2bff8257${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.basic ? null : { display: "none" })}" class="p-6 space-y-4" data-v-2bff8257${_scopeId}><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>ORDER NUMB <span class="text-red-500" data-v-2bff8257${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).order_number)} type="text" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.order_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.order_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>CUSTOMER <span class="text-red-500" data-v-2bff8257${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).customer)} type="text" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.customer) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.customer)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>SHIPPER</label><input${ssrRenderAttr("value", unref(form).shipper)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.shipper) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.shipper)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-2bff8257${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-2bff8257${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-2bff8257${_scopeId}>Informasi Pengiriman</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bff8257${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-2bff8257${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.shipping ? null : { display: "none" })}" class="p-6 space-y-4" data-v-2bff8257${_scopeId}><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>BL/AWB</label><input${ssrRenderAttr("value", unref(form).bl_awb)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.bl_awb) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.bl_awb)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>LINER</label><input${ssrRenderAttr("value", unref(form).liner)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.liner) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.liner)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>VESSEL</label><input${ssrRenderAttr("value", unref(form).vessel)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.vessel) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.vessel)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>ETA</label><input${ssrRenderAttr("value", unref(form).eta)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.eta) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.eta)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>AJU</label><input${ssrRenderAttr("value", unref(form).aju)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.aju) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.aju)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>SPPB DATE</label><input${ssrRenderAttr("value", unref(form).sppb_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.sppb_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.sppb_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>SHIPMENT TYPE</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}><option value="" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "") : ssrLooseEqual(unref(form).shipment_type, "")) ? " selected" : ""}${_scopeId}>Pilih Shipment Type</option><option value="FCL" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "FCL") : ssrLooseEqual(unref(form).shipment_type, "FCL")) ? " selected" : ""}${_scopeId}>FCL</option><option value="LCL" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "LCL") : ssrLooseEqual(unref(form).shipment_type, "LCL")) ? " selected" : ""}${_scopeId}>LCL</option><option value="AIR" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "AIR") : ssrLooseEqual(unref(form).shipment_type, "AIR")) ? " selected" : ""}${_scopeId}>AIR</option><option value="SEA" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "SEA") : ssrLooseEqual(unref(form).shipment_type, "SEA")) ? " selected" : ""}${_scopeId}>SEA</option><option value="LAND" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "LAND") : ssrLooseEqual(unref(form).shipment_type, "LAND")) ? " selected" : ""}${_scopeId}>LAND</option><option value="Trucking" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Trucking") : ssrLooseEqual(unref(form).shipment_type, "Trucking")) ? " selected" : ""}${_scopeId}>Trucking</option><option value="Import" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Import") : ssrLooseEqual(unref(form).shipment_type, "Import")) ? " selected" : ""}${_scopeId}>Import</option><option value="Domestik" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Domestik") : ssrLooseEqual(unref(form).shipment_type, "Domestik")) ? " selected" : ""}${_scopeId}>Domestik</option><option value="Door to Door Domestik" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Door to Door Domestik") : ssrLooseEqual(unref(form).shipment_type, "Door to Door Domestik")) ? " selected" : ""}${_scopeId}>Door to Door Domestik</option><option value="Warehouse" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Warehouse") : ssrLooseEqual(unref(form).shipment_type, "Warehouse")) ? " selected" : ""}${_scopeId}>Warehouse</option><option value="Door to Door Import" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Door to Door Import") : ssrLooseEqual(unref(form).shipment_type, "Door to Door Import")) ? " selected" : ""}${_scopeId}>Door to Door Import</option><option value="Export" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Export") : ssrLooseEqual(unref(form).shipment_type, "Export")) ? " selected" : ""}${_scopeId}>Export</option></select>`);
            if (unref(form).errors.shipment_type) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.shipment_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>POL</label><input${ssrRenderAttr("value", unref(form).pol)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.pol) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.pol)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>POD</label><input${ssrRenderAttr("value", unref(form).pod)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.pod) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.pod)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>GUDANG/UTC</label><input${ssrRenderAttr("value", unref(form).gudang_utc)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.gudang_utc) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.gudang_utc)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>PARTY/LCL</label><input${ssrRenderAttr("value", unref(form).party_lcl)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.party_lcl) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.party_lcl)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>PREPARED BY</label><input${ssrRenderAttr("value", unref(form).prepared_by)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.prepared_by) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.prepared_by)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>EXCHANGE RATE</label><input${ssrRenderAttr("value", unref(form).exchange_rate)} type="number" step="0.0001" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.exchange_rate) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.exchange_rate)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-2bff8257${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-2bff8257${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-2bff8257${_scopeId}>Informasi Pricing</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bff8257${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-2bff8257${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.pricing ? null : { display: "none" })}" class="p-6 space-y-4" data-v-2bff8257${_scopeId}><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>JENIS BIAYA</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}><option value="" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "") : ssrLooseEqual(unref(form).jenis_biaya, "")) ? " selected" : ""}${_scopeId}>Pilih Jenis Biaya</option><option value="OF/AF" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "OF/AF") : ssrLooseEqual(unref(form).jenis_biaya, "OF/AF")) ? " selected" : ""}${_scopeId}>OF/AF</option><option value="HANDLING" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "HANDLING") : ssrLooseEqual(unref(form).jenis_biaya, "HANDLING")) ? " selected" : ""}${_scopeId}>HANDLING</option><option value="PIB EDI" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "PIB EDI") : ssrLooseEqual(unref(form).jenis_biaya, "PIB EDI")) ? " selected" : ""}${_scopeId}>PIB EDI</option><option value="ADMIN DOC" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "ADMIN DOC") : ssrLooseEqual(unref(form).jenis_biaya, "ADMIN DOC")) ? " selected" : ""}${_scopeId}>ADMIN DOC</option><option value="TRUCKING" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "TRUCKING") : ssrLooseEqual(unref(form).jenis_biaya, "TRUCKING")) ? " selected" : ""}${_scopeId}>TRUCKING</option><option value="D/O CHARGES" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "D/O CHARGES") : ssrLooseEqual(unref(form).jenis_biaya, "D/O CHARGES")) ? " selected" : ""}${_scopeId}>D/O CHARGES</option><option value="LOLO" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "LOLO") : ssrLooseEqual(unref(form).jenis_biaya, "LOLO")) ? " selected" : ""}${_scopeId}>LOLO</option><option value="STORAGE" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "STORAGE") : ssrLooseEqual(unref(form).jenis_biaya, "STORAGE")) ? " selected" : ""}${_scopeId}>STORAGE</option><option value="REFUND" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "REFUND") : ssrLooseEqual(unref(form).jenis_biaya, "REFUND")) ? " selected" : ""}${_scopeId}>REFUND</option><option value="OTHER" data-v-2bff8257${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "OTHER") : ssrLooseEqual(unref(form).jenis_biaya, "OTHER")) ? " selected" : ""}${_scopeId}>OTHER</option></select>`);
            if (unref(form).errors.jenis_biaya) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.jenis_biaya)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>BUYING</label><input${ssrRenderAttr("value", unref(form).buying)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.buying) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.buying)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>SELLING</label><input${ssrRenderAttr("value", unref(form).selling)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.selling) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.selling)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>REVENUE</label><input${ssrRenderAttr("value", unref(form).revenue)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.revenue) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.revenue)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>REMARKS</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea>`);
            if (unref(form).errors.remarks) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.remarks)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-2bff8257${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-2bff8257${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-2bff8257${_scopeId}>Informasi Barang</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bff8257${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-2bff8257${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.goods ? null : { display: "none" })}" class="p-6 space-y-4" data-v-2bff8257${_scopeId}><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>GOODS</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).goods)}</textarea>`);
            if (unref(form).errors.goods) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.goods)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>COMMODITY/URAIAN BARANG</label><textarea rows="3" placeholder="Masukkan uraian barang/commodity yang detail" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).commodity)}</textarea>`);
            if (unref(form).errors.commodity) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.commodity)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-2bff8257${_scopeId}><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>QTY</label><input${ssrRenderAttr("value", unref(form).qty)} type="number" min="0" placeholder="Masukkan quantity" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.qty) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.qty)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>NET WEIGHT (KG)</label><input${ssrRenderAttr("value", unref(form).net_weight)} type="number" step="0.01" min="0" placeholder="Masukkan berat netto dalam kg" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.net_weight) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.net_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>CONTAINER NO</label><input${ssrRenderAttr("value", unref(form).container_no)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.container_no) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.container_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-2bff8257${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-2bff8257${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-2bff8257${_scopeId}>Informasi Invoice</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.invoice }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bff8257${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-2bff8257${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.invoice ? null : { display: "none" })}" class="p-6 space-y-4" data-v-2bff8257${_scopeId}><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>INVOICE NUMB</label><input${ssrRenderAttr("value", unref(form).invoice_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.invoice_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>INVOICE DATE</label><input${ssrRenderAttr("value", unref(form).invoice_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.invoice_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2bff8257${_scopeId}>T.O.P</label><input${ssrRenderAttr("value", unref(form).top)} type="text" placeholder="e.g., NET 30" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}>`);
            if (unref(form).errors.top) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-2bff8257${_scopeId}>${ssrInterpolate(unref(form).errors.top)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-2bff8257${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-2bff8257${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-2bff8257${_scopeId}>Voucher Management</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.voucher }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bff8257${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-2bff8257${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.voucher ? null : { display: "none" })}" class="p-6 space-y-6" data-v-2bff8257${_scopeId}><div class="space-y-4" data-v-2bff8257${_scopeId}><div class="flex items-center justify-between" data-v-2bff8257${_scopeId}><h4 class="text-md font-semibold text-sage-700" data-v-2bff8257${_scopeId}>Payment Vouchers</h4><button type="button" class="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors" data-v-2bff8257${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bff8257${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-2bff8257${_scopeId}></path></svg> Add Payment </button></div>`);
            if (paymentVouchers.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg" data-v-2bff8257${_scopeId}> No payment vouchers added yet </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(paymentVouchers.value, (voucher, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4 space-y-3" data-v-2bff8257${_scopeId}><div class="flex justify-between items-center" data-v-2bff8257${_scopeId}><h5 class="font-medium text-gray-700" data-v-2bff8257${_scopeId}>Payment Voucher #${ssrInterpolate(index + 1)}</h5><button type="button" class="text-red-600 hover:text-red-800" data-v-2bff8257${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bff8257${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-2bff8257${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-2bff8257${_scopeId}><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2bff8257${_scopeId}>Voucher No</label><input${ssrRenderAttr("value", voucher.voucher_no)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., PAY-001" data-v-2bff8257${_scopeId}></div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2bff8257${_scopeId}>Date</label><input${ssrRenderAttr("value", voucher.date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}></div></div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2bff8257${_scopeId}>Description</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" placeholder="e.g., Biaya Driver" data-v-2bff8257${_scopeId}>${ssrInterpolate(voucher.description)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-2bff8257${_scopeId}><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2bff8257${_scopeId}>Amount</label><input${ssrRenderAttr("value", voucher.amount)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="500000" data-v-2bff8257${_scopeId}></div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2bff8257${_scopeId}>Prepared By</label><input${ssrRenderAttr("value", voucher.prepared_by)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Staff name" data-v-2bff8257${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div><div class="space-y-4" data-v-2bff8257${_scopeId}><div class="flex items-center justify-between" data-v-2bff8257${_scopeId}><h4 class="text-md font-semibold text-sage-700" data-v-2bff8257${_scopeId}>Receipt Vouchers</h4><button type="button" class="inline-flex items-center px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors" data-v-2bff8257${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bff8257${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-2bff8257${_scopeId}></path></svg> Add Receipt </button></div>`);
            if (receiptVouchers.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-4 border-2 border-dashed border-gray-300 rounded-lg" data-v-2bff8257${_scopeId}> No receipt vouchers added yet </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(receiptVouchers.value, (voucher, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4 space-y-3" data-v-2bff8257${_scopeId}><div class="flex justify-between items-center" data-v-2bff8257${_scopeId}><h5 class="font-medium text-gray-700" data-v-2bff8257${_scopeId}>Receipt Voucher #${ssrInterpolate(index + 1)}</h5><button type="button" class="text-red-600 hover:text-red-800" data-v-2bff8257${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2bff8257${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-2bff8257${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-2bff8257${_scopeId}><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2bff8257${_scopeId}>Voucher No</label><input${ssrRenderAttr("value", voucher.voucher_no)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., REC-001" data-v-2bff8257${_scopeId}></div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2bff8257${_scopeId}>Date</label><input${ssrRenderAttr("value", voucher.date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2bff8257${_scopeId}></div></div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2bff8257${_scopeId}>Description</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" placeholder="e.g., Payment received from client" data-v-2bff8257${_scopeId}>${ssrInterpolate(voucher.description)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-2bff8257${_scopeId}><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2bff8257${_scopeId}>Amount</label><input${ssrRenderAttr("value", voucher.amount)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="1000000" data-v-2bff8257${_scopeId}></div><div data-v-2bff8257${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-2bff8257${_scopeId}>Prepared By</label><input${ssrRenderAttr("value", voucher.prepared_by)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Staff name" data-v-2bff8257${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" data-v-2bff8257${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-2bff8257${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-2bff8257${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-2bff8257${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-2bff8257${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-2bff8257${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-2bff8257${_scopeId}>Simpan Sales Order</span>`);
            }
            _push2(`</button></div></form></div>`);
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
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-white",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          })
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Buat Sales Order Baru"),
                        createVNode("p", { class: "text-sage-600" }, "Buat dokumen sales order untuk pelanggan")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.sales-orders.index"),
                        class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      }, {
                        default: withCtx(() => [
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
                              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                            })
                          ])),
                          createTextVNode(" Kembali ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Pilih Metode Input")
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
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => selectedCustomerId.value = $event,
                          onChange: onCustomerSelect,
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, [
                          createVNode("option", { value: "" }, "-- Pilih Pelanggan --"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.customers, (customer) => {
                            return openBlock(), createBlock("option", {
                              key: customer.id,
                              value: customer.id
                            }, toDisplayString(customer.customer_code) + " - " + toDisplayString(customer.consignee_shipper), 9, ["value"]);
                          }), 128))
                        ], 40, ["onUpdate:modelValue"]), [
                          [vModelSelect, selectedCustomerId.value]
                        ])
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
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode("ORDER NUMB "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).order_number = $event,
                          type: "text",
                          required: "",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).order_number]
                        ]),
                        unref(form).errors.order_number ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.order_number), 1)) : createCommentVNode("", true)
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
                          createVNode("option", { value: "FCL" }, "FCL"),
                          createVNode("option", { value: "LCL" }, "LCL"),
                          createVNode("option", { value: "AIR" }, "AIR"),
                          createVNode("option", { value: "SEA" }, "SEA"),
                          createVNode("option", { value: "LAND" }, "LAND"),
                          createVNode("option", { value: "Trucking" }, "Trucking"),
                          createVNode("option", { value: "Import" }, "Import"),
                          createVNode("option", { value: "Domestik" }, "Domestik"),
                          createVNode("option", { value: "Door to Door Domestik" }, "Door to Door Domestik"),
                          createVNode("option", { value: "Warehouse" }, "Warehouse"),
                          createVNode("option", { value: "Door to Door Import" }, "Door to Door Import"),
                          createVNode("option", { value: "Export" }, "Export")
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
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "PREPARED BY"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).prepared_by = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).prepared_by]
                        ]),
                        unref(form).errors.prepared_by ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.prepared_by), 1)) : createCommentVNode("", true)
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
                    withDirectives(createVNode("div", { class: "p-6 space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "JENIS BIAYA"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).jenis_biaya = $event,
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, [
                          createVNode("option", { value: "" }, "Pilih Jenis Biaya"),
                          createVNode("option", { value: "OF/AF" }, "OF/AF"),
                          createVNode("option", { value: "HANDLING" }, "HANDLING"),
                          createVNode("option", { value: "PIB EDI" }, "PIB EDI"),
                          createVNode("option", { value: "ADMIN DOC" }, "ADMIN DOC"),
                          createVNode("option", { value: "TRUCKING" }, "TRUCKING"),
                          createVNode("option", { value: "D/O CHARGES" }, "D/O CHARGES"),
                          createVNode("option", { value: "LOLO" }, "LOLO"),
                          createVNode("option", { value: "STORAGE" }, "STORAGE"),
                          createVNode("option", { value: "REFUND" }, "REFUND"),
                          createVNode("option", { value: "OTHER" }, "OTHER")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).jenis_biaya]
                        ]),
                        unref(form).errors.jenis_biaya ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.jenis_biaya), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "BUYING"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).buying = $event,
                          type: "number",
                          step: "0.01",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).buying]
                        ]),
                        unref(form).errors.buying ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.buying), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "SELLING"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).selling = $event,
                          type: "number",
                          step: "0.01",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).selling]
                        ]),
                        unref(form).errors.selling ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.selling), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "REVENUE"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).revenue = $event,
                          type: "number",
                          step: "0.01",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).revenue]
                        ]),
                        unref(form).errors.revenue ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.revenue), 1)) : createCommentVNode("", true)
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
                      ])
                    ], 512), [
                      [vShow, sections.value.pricing]
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
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "GOODS"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).goods = $event,
                          rows: "3",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).goods]
                        ]),
                        unref(form).errors.goods ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.goods), 1)) : createCommentVNode("", true)
                      ]),
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
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "QTY"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).qty = $event,
                            type: "number",
                            min: "0",
                            placeholder: "Masukkan quantity",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).qty]
                          ]),
                          unref(form).errors.qty ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.qty), 1)) : createCommentVNode("", true)
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
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "CONTAINER NO"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).container_no = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).container_no]
                        ]),
                        unref(form).errors.container_no ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.container_no), 1)) : createCommentVNode("", true)
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
                        }), 128))
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
                        }), 128))
                      ])
                    ], 512), [
                      [vShow, sections.value.voucher]
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-cs.sales-orders.index"),
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
                      unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Menyimpan...")) : (openBlock(), createBlock("span", { key: 2 }, "Simpan Sales Order"))
                    ], 8, ["disabled"])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/SalesOrders/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2bff8257"]]);
export {
  Create as default
};
