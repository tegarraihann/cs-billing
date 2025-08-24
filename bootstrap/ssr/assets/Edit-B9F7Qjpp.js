import { reactive, ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, withModifiers, withDirectives, createCommentVNode, vModelText, vShow, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-5dkykGfh.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B-2d_OMK.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    salesOrder: Object,
    errors: Object,
    vendors: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      order_number: props.salesOrder.order_number || "",
      customer: props.salesOrder.customer || "",
      shipper: props.salesOrder.shipper || "",
      bl_awb: props.salesOrder.bl_awb || "",
      liner: props.salesOrder.liner || "",
      vessel: props.salesOrder.vessel || "",
      eta: props.salesOrder.eta || "",
      aju: props.salesOrder.aju || "",
      sppb_date: props.salesOrder.sppb_date || "",
      shipment_type: props.salesOrder.shipment_type || "",
      pol: props.salesOrder.pol || "",
      pod: props.salesOrder.pod || "",
      gudang_utc: props.salesOrder.gudang_utc || "",
      party_lcl: props.salesOrder.party_lcl || "",
      prepared_by: props.salesOrder.prepared_by || "",
      exchange_rate: props.salesOrder.exchange_rate || "",
      jenis_biaya: props.salesOrder.jenis_biaya || "",
      buying: props.salesOrder.buying || "",
      selling: props.salesOrder.selling || "",
      revenue: props.salesOrder.revenue || "",
      remarks: props.salesOrder.remarks || "",
      goods: props.salesOrder.goods || "",
      commodity: props.salesOrder.commodity || "",
      qty: props.salesOrder.qty || "",
      net_weight: props.salesOrder.net_weight || "",
      container_no: props.salesOrder.container_no || "",
      invoice_number: props.salesOrder.invoice_number || "",
      invoice_date: props.salesOrder.invoice_date || "",
      top: props.salesOrder.top || "",
      vendor: (() => {
        let vendorData = {
          vendor_id: "",
          deskripsi: "",
          nominal: "",
          nominalFormatted: "",
          no_rekening: "",
          company_name: "",
          nama_rekening: "",
          rcvd_inv: ""
        };
        if (props.salesOrder.vendors) {
          if (Array.isArray(props.salesOrder.vendors) && props.salesOrder.vendors.length > 0) {
            vendorData = { ...vendorData, ...props.salesOrder.vendors[0] };
          } else if (typeof props.salesOrder.vendors === "object" && !Array.isArray(props.salesOrder.vendors)) {
            vendorData = { ...vendorData, ...props.salesOrder.vendors };
          }
        }
        let vendorId = vendorData.vendor_id || "";
        if (!vendorId && vendorData.company_name && props.vendors) {
          const foundVendor = props.vendors.find((v) => v.nama_vendor === vendorData.company_name);
          if (foundVendor) {
            vendorId = foundVendor.id;
          }
        }
        return {
          ...vendorData,
          vendor_id: vendorId,
          nominalFormatted: vendorData.nominal ? vendorData.nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
        };
      })()
    });
    const sections = reactive({
      basic: true,
      shipping: false,
      pricing: false,
      goods: false,
      invoice: false,
      vendor: false
    });
    const processing = ref(false);
    const toggleSection = (section) => {
      sections[section] = !sections[section];
    };
    const onVendorChange = () => {
      const selectedVendorId = form.vendor.vendor_id;
      if (selectedVendorId) {
        const selectedVendor = props.vendors.find((v) => v.id == selectedVendorId);
        if (selectedVendor) {
          form.vendor.no_rekening = selectedVendor.nomor_rekening;
          form.vendor.company_name = selectedVendor.nama_vendor;
          form.vendor.nama_rekening = selectedVendor.nama_rekening;
        }
      } else {
        form.vendor.no_rekening = "";
        form.vendor.company_name = "";
        form.vendor.nama_rekening = "";
      }
    };
    const formatNominal = (event) => {
      let value = event.target.value;
      value = value.replace(/\D/g, "");
      if (value) {
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      form.vendor.nominalFormatted = value;
    };
    const updateNominalValue = () => {
      if (form.vendor.nominalFormatted && form.vendor.nominalFormatted.trim() !== "") {
        form.vendor.nominal = parseInt(form.vendor.nominalFormatted.replace(/\./g, ""));
      } else {
        form.vendor.nominal = null;
      }
    };
    const submit = () => {
      updateNominalValue();
      processing.value = true;
      form.put(route("admin-cs.sales-orders.update", props.salesOrder.id), {
        onFinish: () => {
          processing.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-add3433e${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-add3433e${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-add3433e${_scopeId}><div class="flex items-center" data-v-add3433e${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-add3433e${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-add3433e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-add3433e${_scopeId}></path></svg></div><div data-v-add3433e${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-add3433e${_scopeId}>Edit Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h2><p class="text-sage-600" data-v-add3433e${_scopeId}>Edit dokumen sales order</p></div></div><div class="mt-4 sm:mt-0" data-v-add3433e${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-add3433e${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-add3433e${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><form class="space-y-6" data-v-add3433e${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-add3433e${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-add3433e${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-add3433e${_scopeId}>Informasi Dasar</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-add3433e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-add3433e${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.basic ? null : { display: "none" })}" class="p-6 space-y-4" data-v-add3433e${_scopeId}><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>ORDER NUMB *</label><input${ssrRenderAttr("value", unref(form).order_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-add3433e${_scopeId}>`);
            if (__props.errors.order_number) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.order_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>CUSTOMER *</label><input${ssrRenderAttr("value", unref(form).customer)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-add3433e${_scopeId}>`);
            if (__props.errors.customer) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.customer)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>SHIPPER</label><input${ssrRenderAttr("value", unref(form).shipper)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.shipper) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.shipper)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>BL/AWB</label><input${ssrRenderAttr("value", unref(form).bl_awb)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.bl_awb) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.bl_awb)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>PREPARED BY</label><input${ssrRenderAttr("value", unref(form).prepared_by)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.prepared_by) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.prepared_by)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-add3433e${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-add3433e${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-add3433e${_scopeId}>Informasi Pengiriman</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-add3433e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-add3433e${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.shipping ? null : { display: "none" })}" class="p-6 space-y-4" data-v-add3433e${_scopeId}><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>LINER</label><input${ssrRenderAttr("value", unref(form).liner)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.liner) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.liner)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>VESSEL</label><input${ssrRenderAttr("value", unref(form).vessel)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.vessel) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.vessel)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>ETA</label><input${ssrRenderAttr("value", unref(form).eta)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.eta) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.eta)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>AJU</label><input${ssrRenderAttr("value", unref(form).aju)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.aju) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.aju)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>SPPB DATE</label><input${ssrRenderAttr("value", unref(form).sppb_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.sppb_date) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.sppb_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>SHIPMENT TYPE</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}><option value="" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "") : ssrLooseEqual(unref(form).shipment_type, "")) ? " selected" : ""}${_scopeId}>Pilih Shipment Type</option><option value="FCL" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "FCL") : ssrLooseEqual(unref(form).shipment_type, "FCL")) ? " selected" : ""}${_scopeId}>FCL</option><option value="LCL" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "LCL") : ssrLooseEqual(unref(form).shipment_type, "LCL")) ? " selected" : ""}${_scopeId}>LCL</option><option value="AIR" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "AIR") : ssrLooseEqual(unref(form).shipment_type, "AIR")) ? " selected" : ""}${_scopeId}>AIR</option><option value="SEA" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "SEA") : ssrLooseEqual(unref(form).shipment_type, "SEA")) ? " selected" : ""}${_scopeId}>SEA</option><option value="LAND" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "LAND") : ssrLooseEqual(unref(form).shipment_type, "LAND")) ? " selected" : ""}${_scopeId}>LAND</option><option value="Trucking" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Trucking") : ssrLooseEqual(unref(form).shipment_type, "Trucking")) ? " selected" : ""}${_scopeId}>Trucking</option><option value="Import" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Import") : ssrLooseEqual(unref(form).shipment_type, "Import")) ? " selected" : ""}${_scopeId}>Import</option><option value="Domestik" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Domestik") : ssrLooseEqual(unref(form).shipment_type, "Domestik")) ? " selected" : ""}${_scopeId}>Domestik</option><option value="Door to Door Domestik" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Door to Door Domestik") : ssrLooseEqual(unref(form).shipment_type, "Door to Door Domestik")) ? " selected" : ""}${_scopeId}>Door to Door Domestik</option><option value="Warehouse" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Warehouse") : ssrLooseEqual(unref(form).shipment_type, "Warehouse")) ? " selected" : ""}${_scopeId}>Warehouse</option><option value="Door to Door Import" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Door to Door Import") : ssrLooseEqual(unref(form).shipment_type, "Door to Door Import")) ? " selected" : ""}${_scopeId}>Door to Door Import</option><option value="Export" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "Export") : ssrLooseEqual(unref(form).shipment_type, "Export")) ? " selected" : ""}${_scopeId}>Export</option></select>`);
            if (__props.errors.shipment_type) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.shipment_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>POL</label><input${ssrRenderAttr("value", unref(form).pol)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.pol) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.pol)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>POD</label><input${ssrRenderAttr("value", unref(form).pod)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.pod) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.pod)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>GUDANG/UTC</label><input${ssrRenderAttr("value", unref(form).gudang_utc)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.gudang_utc) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.gudang_utc)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>PARTY/LCL</label><input${ssrRenderAttr("value", unref(form).party_lcl)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.party_lcl) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.party_lcl)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-add3433e${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-add3433e${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-add3433e${_scopeId}>Informasi Harga</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-add3433e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-add3433e${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.pricing ? null : { display: "none" })}" class="p-6 space-y-4" data-v-add3433e${_scopeId}><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>EXCHANGE RATE</label><input${ssrRenderAttr("value", unref(form).exchange_rate)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.exchange_rate) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.exchange_rate)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>JENIS BIAYA</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}><option value="" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "") : ssrLooseEqual(unref(form).jenis_biaya, "")) ? " selected" : ""}${_scopeId}>-- Pilih Jenis Biaya --</option><option value="OF/AF" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "OF/AF") : ssrLooseEqual(unref(form).jenis_biaya, "OF/AF")) ? " selected" : ""}${_scopeId}>OF/AF</option><option value="HANDLING" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "HANDLING") : ssrLooseEqual(unref(form).jenis_biaya, "HANDLING")) ? " selected" : ""}${_scopeId}>HANDLING</option><option value="PIB EDI" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "PIB EDI") : ssrLooseEqual(unref(form).jenis_biaya, "PIB EDI")) ? " selected" : ""}${_scopeId}>PIB EDI</option><option value="ADMIN DOC" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "ADMIN DOC") : ssrLooseEqual(unref(form).jenis_biaya, "ADMIN DOC")) ? " selected" : ""}${_scopeId}>ADMIN DOC</option><option value="TRUCKING" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "TRUCKING") : ssrLooseEqual(unref(form).jenis_biaya, "TRUCKING")) ? " selected" : ""}${_scopeId}>TRUCKING</option><option value="D/O CHARGES" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "D/O CHARGES") : ssrLooseEqual(unref(form).jenis_biaya, "D/O CHARGES")) ? " selected" : ""}${_scopeId}>D/O CHARGES</option><option value="LOLO" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "LOLO") : ssrLooseEqual(unref(form).jenis_biaya, "LOLO")) ? " selected" : ""}${_scopeId}>LOLO</option><option value="STORAGE" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "STORAGE") : ssrLooseEqual(unref(form).jenis_biaya, "STORAGE")) ? " selected" : ""}${_scopeId}>STORAGE</option><option value="REFUND" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "REFUND") : ssrLooseEqual(unref(form).jenis_biaya, "REFUND")) ? " selected" : ""}${_scopeId}>REFUND</option><option value="OTHER" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "OTHER") : ssrLooseEqual(unref(form).jenis_biaya, "OTHER")) ? " selected" : ""}${_scopeId}>OTHER</option></select>`);
            if (__props.errors.jenis_biaya) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.jenis_biaya)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>BUYING</label><input${ssrRenderAttr("value", unref(form).buying)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.buying) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.buying)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>SELLING</label><input${ssrRenderAttr("value", unref(form).selling)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.selling) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.selling)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>REVENUE</label><input${ssrRenderAttr("value", unref(form).revenue)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.revenue) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.revenue)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>REMARKS</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea>`);
            if (__props.errors.remarks) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.remarks)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-add3433e${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-add3433e${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-add3433e${_scopeId}>Informasi Barang</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-add3433e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-add3433e${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.goods ? null : { display: "none" })}" class="p-6 space-y-4" data-v-add3433e${_scopeId}><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>GOODS</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-add3433e${_scopeId}>${ssrInterpolate(unref(form).goods)}</textarea>`);
            if (__props.errors.goods) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.goods)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>COMMODITY/URAIAN BARANG</label><textarea rows="3" placeholder="Masukkan uraian barang/commodity yang detail" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-add3433e${_scopeId}>${ssrInterpolate(unref(form).commodity)}</textarea>`);
            if (__props.errors.commodity) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.commodity)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-add3433e${_scopeId}><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>QTY</label><input${ssrRenderAttr("value", unref(form).qty)} type="number" min="0" placeholder="Masukkan quantity" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.qty) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.qty)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>NET WEIGHT (KG)</label><input${ssrRenderAttr("value", unref(form).net_weight)} type="number" step="0.01" min="0" placeholder="Masukkan berat netto dalam kg" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.net_weight) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.net_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>CONTAINER NO</label><input${ssrRenderAttr("value", unref(form).container_no)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.container_no) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.container_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-add3433e${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-add3433e${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-add3433e${_scopeId}>Informasi Invoice</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.invoice }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-add3433e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-add3433e${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.invoice ? null : { display: "none" })}" class="p-6 space-y-4" data-v-add3433e${_scopeId}><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>INVOICE NUMB</label><input${ssrRenderAttr("value", unref(form).invoice_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.invoice_number) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.invoice_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>INVOICE DATE</label><input${ssrRenderAttr("value", unref(form).invoice_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.invoice_date) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}>T.O.P</label><input${ssrRenderAttr("value", unref(form).top)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-add3433e${_scopeId}>`);
            if (__props.errors.top) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.top)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-add3433e${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-add3433e${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-add3433e${_scopeId}>Buying to Vendor</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.vendor }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-add3433e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-add3433e${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.vendor ? null : { display: "none" })}" class="p-6 space-y-4" data-v-add3433e${_scopeId}><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}> Deskripsi <span class="text-red-500" data-v-add3433e${_scopeId}>*</span></label><textarea rows="2" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" placeholder="Masukkan deskripsi layanan vendor" data-v-add3433e${_scopeId}>${ssrInterpolate(unref(form).vendor.deskripsi)}</textarea>`);
            if ((_a = __props.errors.vendor) == null ? void 0 : _a.deskripsi) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.vendor.deskripsi)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}> Nominal <span class="text-red-500" data-v-add3433e${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).vendor.nominalFormatted)} type="text" required placeholder="0" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-add3433e${_scopeId}>`);
            if ((_b = __props.errors.vendor) == null ? void 0 : _b.nominal) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.vendor.nominal)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}> Pilih Vendor <span class="text-red-500" data-v-add3433e${_scopeId}>*</span></label><select required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-add3433e${_scopeId}><option value="" data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).vendor.vendor_id) ? ssrLooseContain(unref(form).vendor.vendor_id, "") : ssrLooseEqual(unref(form).vendor.vendor_id, "")) ? " selected" : ""}${_scopeId}>Pilih vendor...</option><!--[-->`);
            ssrRenderList(__props.vendors, (vendorOption) => {
              _push2(`<option${ssrRenderAttr("value", vendorOption.id)} data-v-add3433e${ssrIncludeBooleanAttr(Array.isArray(unref(form).vendor.vendor_id) ? ssrLooseContain(unref(form).vendor.vendor_id, vendorOption.id) : ssrLooseEqual(unref(form).vendor.vendor_id, vendorOption.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendorOption.nama_vendor)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if ((_c = __props.errors.vendor) == null ? void 0 : _c.vendor_id) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.vendor.vendor_id)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(form).vendor.vendor_id) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-sage-100 rounded-lg" data-v-add3433e${_scopeId}><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-add3433e${_scopeId}> Nomor Rekening </label><p class="text-sm text-gray-900 font-mono" data-v-add3433e${_scopeId}>${ssrInterpolate(unref(form).vendor.no_rekening || "-")}</p></div><div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-add3433e${_scopeId}> Nama Rekening </label><p class="text-sm text-gray-900" data-v-add3433e${_scopeId}>${ssrInterpolate(unref(form).vendor.nama_rekening || "-")}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div data-v-add3433e${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-add3433e${_scopeId}> RCVD INV </label><input${ssrRenderAttr("value", unref(form).vendor.rcvd_inv)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nomor invoice yang diterima" data-v-add3433e${_scopeId}>`);
            if ((_d = __props.errors.vendor) == null ? void 0 : _d.rcvd_inv) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-add3433e${_scopeId}>${ssrInterpolate(__props.errors.vendor.rcvd_inv)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6" data-v-add3433e${_scopeId}><div class="flex justify-end space-x-4" data-v-add3433e${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-6 py-3 bg-sage-600 text-white font-medium rounded-lg hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-colors disabled:opacity-50" data-v-add3433e${_scopeId}>`);
            if (processing.value) {
              _push2(`<span data-v-add3433e${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-add3433e${_scopeId}>Simpan Perubahan</span>`);
            }
            _push2(`</button></div></div></form></div>`);
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
                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          })
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Edit Sales Order: " + toDisplayString(__props.salesOrder.order_number), 1),
                        createVNode("p", { class: "text-sage-600" }, "Edit dokumen sales order")
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
                    createVNode("div", {
                      onClick: ($event) => toggleSection("basic"),
                      class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Dasar"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "ORDER NUMB *"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).order_number = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).order_number]
                        ]),
                        __props.errors.order_number ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.order_number), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "CUSTOMER *"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).customer = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).customer]
                        ]),
                        __props.errors.customer ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.customer), 1)) : createCommentVNode("", true)
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
                        __props.errors.shipper ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.shipper), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "BL/AWB"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).bl_awb = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).bl_awb]
                        ]),
                        __props.errors.bl_awb ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.bl_awb), 1)) : createCommentVNode("", true)
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
                        __props.errors.prepared_by ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.prepared_by), 1)) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.basic]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", {
                      onClick: ($event) => toggleSection("shipping"),
                      class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Pengiriman"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "LINER"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).liner = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).liner]
                        ]),
                        __props.errors.liner ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.liner), 1)) : createCommentVNode("", true)
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
                        __props.errors.vessel ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.vessel), 1)) : createCommentVNode("", true)
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
                        __props.errors.eta ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.eta), 1)) : createCommentVNode("", true)
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
                        __props.errors.aju ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.aju), 1)) : createCommentVNode("", true)
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
                        __props.errors.sppb_date ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.sppb_date), 1)) : createCommentVNode("", true)
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
                        __props.errors.shipment_type ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.shipment_type), 1)) : createCommentVNode("", true)
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
                        __props.errors.pol ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.pol), 1)) : createCommentVNode("", true)
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
                        __props.errors.pod ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.pod), 1)) : createCommentVNode("", true)
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
                        __props.errors.gudang_utc ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.gudang_utc), 1)) : createCommentVNode("", true)
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
                        __props.errors.party_lcl ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.party_lcl), 1)) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.shipping]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", {
                      onClick: ($event) => toggleSection("pricing"),
                      class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Harga"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "EXCHANGE RATE"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).exchange_rate = $event,
                          type: "number",
                          step: "0.01",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).exchange_rate]
                        ]),
                        __props.errors.exchange_rate ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.exchange_rate), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "JENIS BIAYA"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).jenis_biaya = $event,
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, [
                          createVNode("option", { value: "" }, "-- Pilih Jenis Biaya --"),
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
                        __props.errors.jenis_biaya ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.jenis_biaya), 1)) : createCommentVNode("", true)
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
                        __props.errors.buying ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.buying), 1)) : createCommentVNode("", true)
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
                        __props.errors.selling ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.selling), 1)) : createCommentVNode("", true)
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
                        __props.errors.revenue ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.revenue), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "REMARKS"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).remarks = $event,
                          rows: "3",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).remarks]
                        ]),
                        __props.errors.remarks ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.remarks), 1)) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.pricing]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", {
                      onClick: ($event) => toggleSection("goods"),
                      class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Barang"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                        __props.errors.goods ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.goods), 1)) : createCommentVNode("", true)
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
                        __props.errors.commodity ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.commodity), 1)) : createCommentVNode("", true)
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
                          __props.errors.qty ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-red-600 text-sm mt-1"
                          }, toDisplayString(__props.errors.qty), 1)) : createCommentVNode("", true)
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
                          __props.errors.net_weight ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-red-600 text-sm mt-1"
                          }, toDisplayString(__props.errors.net_weight), 1)) : createCommentVNode("", true)
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
                        __props.errors.container_no ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.container_no), 1)) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.goods]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", {
                      onClick: ($event) => toggleSection("invoice"),
                      class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Invoice"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.invoice }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                        __props.errors.invoice_number ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.invoice_number), 1)) : createCommentVNode("", true)
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
                        __props.errors.invoice_date ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.invoice_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "T.O.P"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).top = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).top]
                        ]),
                        __props.errors.top ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.top), 1)) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.invoice]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", {
                      onClick: ($event) => toggleSection("vendor"),
                      class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Buying to Vendor"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.vendor }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                          createTextVNode(" Deskripsi "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).vendor.deskripsi = $event,
                          rows: "2",
                          required: "",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none",
                          placeholder: "Masukkan deskripsi layanan vendor"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).vendor.deskripsi]
                        ]),
                        ((_e = __props.errors.vendor) == null ? void 0 : _e.deskripsi) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(__props.errors.vendor.deskripsi), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Nominal "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).vendor.nominalFormatted = $event,
                          type: "text",
                          required: "",
                          onInput: ($event) => formatNominal($event),
                          onBlur: ($event) => updateNominalValue(),
                          placeholder: "0",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                        }, null, 40, ["onUpdate:modelValue", "onInput", "onBlur"]), [
                          [vModelText, unref(form).vendor.nominalFormatted]
                        ]),
                        ((_f = __props.errors.vendor) == null ? void 0 : _f.nominal) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(__props.errors.vendor.nominal), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Pilih Vendor "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).vendor.vendor_id = $event,
                          required: "",
                          onChange: ($event) => onVendorChange(),
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                        }, [
                          createVNode("option", { value: "" }, "Pilih vendor..."),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors, (vendorOption) => {
                            return openBlock(), createBlock("option", {
                              key: vendorOption.id,
                              value: vendorOption.id
                            }, toDisplayString(vendorOption.nama_vendor), 9, ["value"]);
                          }), 128))
                        ], 40, ["onUpdate:modelValue", "onChange"]), [
                          [vModelSelect, unref(form).vendor.vendor_id]
                        ]),
                        ((_g = __props.errors.vendor) == null ? void 0 : _g.vendor_id) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(__props.errors.vendor.vendor_id), 1)) : createCommentVNode("", true)
                      ]),
                      unref(form).vendor.vendor_id ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-sage-100 rounded-lg"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nomor Rekening "),
                          createVNode("p", { class: "text-sm text-gray-900 font-mono" }, toDisplayString(unref(form).vendor.no_rekening || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nama Rekening "),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(unref(form).vendor.nama_rekening || "-"), 1)
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " RCVD INV "),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).vendor.rcvd_inv = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                          placeholder: "Masukkan nomor invoice yang diterima"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).vendor.rcvd_inv]
                        ]),
                        ((_h = __props.errors.vendor) == null ? void 0 : _h.rcvd_inv) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(__props.errors.vendor.rcvd_inv), 1)) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.vendor]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                    createVNode("div", { class: "flex justify-end space-x-4" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.sales-orders.index"),
                        class: "px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: processing.value,
                        class: "px-6 py-3 bg-sage-600 text-white font-medium rounded-lg hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-colors disabled:opacity-50"
                      }, [
                        processing.value ? (openBlock(), createBlock("span", { key: 0 }, "Menyimpan...")) : (openBlock(), createBlock("span", { key: 1 }, "Simpan Perubahan"))
                      ], 8, ["disabled"])
                    ])
                  ])
                ], 32)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/SalesOrders/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-add3433e"]]);
export {
  Edit as default
};
