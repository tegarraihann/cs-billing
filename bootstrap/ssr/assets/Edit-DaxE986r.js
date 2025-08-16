import { reactive, ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, withModifiers, withDirectives, createCommentVNode, vModelText, vShow, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-kuuTsfLS.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-BgFIBQ5C.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    salesOrder: Object,
    errors: Object
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
      container_no: props.salesOrder.container_no || "",
      invoice_number: props.salesOrder.invoice_number || "",
      invoice_date: props.salesOrder.invoice_date || "",
      top: props.salesOrder.top || ""
    });
    const sections = reactive({
      basic: true,
      shipping: false,
      pricing: false,
      goods: false,
      invoice: false
    });
    const processing = ref(false);
    const toggleSection = (section) => {
      sections[section] = !sections[section];
    };
    const submit = () => {
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
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-8772f65c${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-8772f65c${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-8772f65c${_scopeId}><div class="flex items-center" data-v-8772f65c${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-8772f65c${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8772f65c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-8772f65c${_scopeId}></path></svg></div><div data-v-8772f65c${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-8772f65c${_scopeId}>Edit Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h2><p class="text-sage-600" data-v-8772f65c${_scopeId}>Edit dokumen sales order</p></div></div><div class="mt-4 sm:mt-0" data-v-8772f65c${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8772f65c${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-8772f65c${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><form class="space-y-6" data-v-8772f65c${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-8772f65c${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-8772f65c${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-8772f65c${_scopeId}>Informasi Dasar</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8772f65c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-8772f65c${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.basic ? null : { display: "none" })}" class="p-6 space-y-4" data-v-8772f65c${_scopeId}><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>ORDER NUMB *</label><input${ssrRenderAttr("value", unref(form).order_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-8772f65c${_scopeId}>`);
            if (__props.errors.order_number) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.order_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>CUSTOMER *</label><input${ssrRenderAttr("value", unref(form).customer)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-8772f65c${_scopeId}>`);
            if (__props.errors.customer) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.customer)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>SHIPPER</label><input${ssrRenderAttr("value", unref(form).shipper)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.shipper) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.shipper)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>BL/AWB</label><input${ssrRenderAttr("value", unref(form).bl_awb)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.bl_awb) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.bl_awb)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>PREPARED BY</label><input${ssrRenderAttr("value", unref(form).prepared_by)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.prepared_by) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.prepared_by)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-8772f65c${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-8772f65c${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-8772f65c${_scopeId}>Informasi Pengiriman</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8772f65c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-8772f65c${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.shipping ? null : { display: "none" })}" class="p-6 space-y-4" data-v-8772f65c${_scopeId}><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>LINER</label><input${ssrRenderAttr("value", unref(form).liner)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.liner) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.liner)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>VESSEL</label><input${ssrRenderAttr("value", unref(form).vessel)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.vessel) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.vessel)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>ETA</label><input${ssrRenderAttr("value", unref(form).eta)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.eta) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.eta)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>AJU</label><input${ssrRenderAttr("value", unref(form).aju)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.aju) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.aju)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>SPPB DATE</label><input${ssrRenderAttr("value", unref(form).sppb_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.sppb_date) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.sppb_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>SHIPMENT TYPE</label><input${ssrRenderAttr("value", unref(form).shipment_type)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.shipment_type) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.shipment_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>POL</label><input${ssrRenderAttr("value", unref(form).pol)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.pol) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.pol)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>POD</label><input${ssrRenderAttr("value", unref(form).pod)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.pod) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.pod)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>GUDANG/UTC</label><input${ssrRenderAttr("value", unref(form).gudang_utc)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.gudang_utc) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.gudang_utc)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>PARTY/LCL</label><input${ssrRenderAttr("value", unref(form).party_lcl)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.party_lcl) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.party_lcl)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-8772f65c${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-8772f65c${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-8772f65c${_scopeId}>Informasi Harga</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8772f65c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-8772f65c${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.pricing ? null : { display: "none" })}" class="p-6 space-y-4" data-v-8772f65c${_scopeId}><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>EXCHANGE RATE</label><input${ssrRenderAttr("value", unref(form).exchange_rate)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.exchange_rate) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.exchange_rate)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>JENIS BIAYA</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}><option value="" data-v-8772f65c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "") : ssrLooseEqual(unref(form).jenis_biaya, "")) ? " selected" : ""}${_scopeId}>-- Pilih Jenis Biaya --</option><option value="OF/AF" data-v-8772f65c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "OF/AF") : ssrLooseEqual(unref(form).jenis_biaya, "OF/AF")) ? " selected" : ""}${_scopeId}>OF/AF</option><option value="HANDLING" data-v-8772f65c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "HANDLING") : ssrLooseEqual(unref(form).jenis_biaya, "HANDLING")) ? " selected" : ""}${_scopeId}>HANDLING</option><option value="PIB EDI" data-v-8772f65c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "PIB EDI") : ssrLooseEqual(unref(form).jenis_biaya, "PIB EDI")) ? " selected" : ""}${_scopeId}>PIB EDI</option><option value="ADMIN DOC" data-v-8772f65c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "ADMIN DOC") : ssrLooseEqual(unref(form).jenis_biaya, "ADMIN DOC")) ? " selected" : ""}${_scopeId}>ADMIN DOC</option><option value="TRUCKING" data-v-8772f65c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "TRUCKING") : ssrLooseEqual(unref(form).jenis_biaya, "TRUCKING")) ? " selected" : ""}${_scopeId}>TRUCKING</option><option value="D/O CHARGES" data-v-8772f65c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "D/O CHARGES") : ssrLooseEqual(unref(form).jenis_biaya, "D/O CHARGES")) ? " selected" : ""}${_scopeId}>D/O CHARGES</option><option value="LOLO" data-v-8772f65c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "LOLO") : ssrLooseEqual(unref(form).jenis_biaya, "LOLO")) ? " selected" : ""}${_scopeId}>LOLO</option><option value="STORAGE" data-v-8772f65c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "STORAGE") : ssrLooseEqual(unref(form).jenis_biaya, "STORAGE")) ? " selected" : ""}${_scopeId}>STORAGE</option><option value="REFUND" data-v-8772f65c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "REFUND") : ssrLooseEqual(unref(form).jenis_biaya, "REFUND")) ? " selected" : ""}${_scopeId}>REFUND</option><option value="OTHER" data-v-8772f65c${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "OTHER") : ssrLooseEqual(unref(form).jenis_biaya, "OTHER")) ? " selected" : ""}${_scopeId}>OTHER</option></select>`);
            if (__props.errors.jenis_biaya) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.jenis_biaya)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>BUYING</label><input${ssrRenderAttr("value", unref(form).buying)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.buying) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.buying)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>SELLING</label><input${ssrRenderAttr("value", unref(form).selling)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.selling) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.selling)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>REVENUE</label><input${ssrRenderAttr("value", unref(form).revenue)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.revenue) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.revenue)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>REMARKS</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea>`);
            if (__props.errors.remarks) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.remarks)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-8772f65c${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-8772f65c${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-8772f65c${_scopeId}>Informasi Barang</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8772f65c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-8772f65c${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.goods ? null : { display: "none" })}" class="p-6 space-y-4" data-v-8772f65c${_scopeId}><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>GOODS</label><input${ssrRenderAttr("value", unref(form).goods)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.goods) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.goods)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>CONTAINER NO</label><input${ssrRenderAttr("value", unref(form).container_no)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.container_no) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.container_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-8772f65c${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-8772f65c${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-8772f65c${_scopeId}>Informasi Invoice</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.invoice }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8772f65c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-8772f65c${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.invoice ? null : { display: "none" })}" class="p-6 space-y-4" data-v-8772f65c${_scopeId}><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>INVOICE NUMB</label><input${ssrRenderAttr("value", unref(form).invoice_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.invoice_number) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.invoice_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>INVOICE DATE</label><input${ssrRenderAttr("value", unref(form).invoice_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.invoice_date) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-8772f65c${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8772f65c${_scopeId}>T.O.P</label><input${ssrRenderAttr("value", unref(form).top)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8772f65c${_scopeId}>`);
            if (__props.errors.top) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-8772f65c${_scopeId}>${ssrInterpolate(__props.errors.top)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6" data-v-8772f65c${_scopeId}><div class="flex justify-end space-x-4" data-v-8772f65c${_scopeId}>`);
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-6 py-3 bg-sage-600 text-white font-medium rounded-lg hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-colors disabled:opacity-50" data-v-8772f65c${_scopeId}>`);
            if (processing.value) {
              _push2(`<span data-v-8772f65c${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-8772f65c${_scopeId}>Simpan Perubahan</span>`);
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
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).shipment_type = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).shipment_type]
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
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).goods = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).goods]
                        ]),
                        __props.errors.goods ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.goods), 1)) : createCommentVNode("", true)
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
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8772f65c"]]);
export {
  Edit as default
};
