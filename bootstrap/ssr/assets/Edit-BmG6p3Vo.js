import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, withModifiers, withDirectives, createCommentVNode, vModelText, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-B9DgXThx.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-DiVH08Np.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    salesOrder: Object,
    vendors: Array
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    const props = __props;
    const form = useForm({
      order_number: props.salesOrder.order_number || "",
      customer: props.salesOrder.customer || "",
      shipper: props.salesOrder.shipper || "",
      bl_awb: props.salesOrder.bl_awb || "",
      pol: props.salesOrder.pol || "",
      pod: props.salesOrder.pod || "",
      eta: props.salesOrder.eta || "",
      vessel: props.salesOrder.vessel || "",
      buying: props.salesOrder.buying || 0,
      selling: props.salesOrder.selling || 0,
      revenue: props.salesOrder.revenue || 0,
      vendor: {
        vendor_id: ((_a = props.salesOrder.vendors) == null ? void 0 : _a.vendor_id) || "",
        company_name: ((_b = props.salesOrder.vendors) == null ? void 0 : _b.company_name) || "",
        no_rekening: ((_c = props.salesOrder.vendors) == null ? void 0 : _c.no_rekening) || "",
        nama_rekening: ((_d = props.salesOrder.vendors) == null ? void 0 : _d.nama_rekening) || "",
        nominal: ((_e = props.salesOrder.vendors) == null ? void 0 : _e.nominal) || 0,
        deskripsi: ((_f = props.salesOrder.vendors) == null ? void 0 : _f.deskripsi) || ""
      }
    });
    const onVendorSelect = () => {
      const selectedVendor = props.vendors.find((v) => v.id == form.vendor.vendor_id);
      if (selectedVendor) {
        form.vendor.company_name = selectedVendor.nama_vendor;
        form.vendor.no_rekening = selectedVendor.nomor_rekening;
        form.vendor.nama_rekening = selectedVendor.nama_rekening;
      }
    };
    const submit = () => {
      form.put(route("admin-keuangan.sales-orders.update", props.salesOrder.id), {
        onSuccess: () => {
        },
        onError: (errors) => {
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-c1582b1e${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-c1582b1e${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-c1582b1e${_scopeId}><div class="flex items-center" data-v-c1582b1e${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-c1582b1e${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c1582b1e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-c1582b1e${_scopeId}></path></svg></div><div data-v-c1582b1e${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-c1582b1e${_scopeId}>Edit Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h2><p class="text-sage-600" data-v-c1582b1e${_scopeId}>Perbarui informasi sales order</p></div></div><div class="mt-4 sm:mt-0" data-v-c1582b1e${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c1582b1e${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-c1582b1e${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><form class="space-y-6" data-v-c1582b1e${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-c1582b1e${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-c1582b1e${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-c1582b1e${_scopeId}>Informasi Dasar</h3></div><div class="p-6 space-y-4" data-v-c1582b1e${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-c1582b1e${_scopeId}><div data-v-c1582b1e${_scopeId}><label for="order_number" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}> Order Number <span class="text-red-500" data-v-c1582b1e${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).order_number)} type="text" id="order_number" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan order number" data-v-c1582b1e${_scopeId}>`);
            if (unref(form).errors.order_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-c1582b1e${_scopeId}>${ssrInterpolate(unref(form).errors.order_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-c1582b1e${_scopeId}><label for="customer" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}> Customer <span class="text-red-500" data-v-c1582b1e${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).customer)} type="text" id="customer" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan nama customer" data-v-c1582b1e${_scopeId}>`);
            if (unref(form).errors.customer) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-c1582b1e${_scopeId}>${ssrInterpolate(unref(form).errors.customer)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-c1582b1e${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-c1582b1e${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-c1582b1e${_scopeId}>Informasi Pengiriman</h3></div><div class="p-6 space-y-4" data-v-c1582b1e${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-c1582b1e${_scopeId}><div data-v-c1582b1e${_scopeId}><label for="shipper" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}>Shipper</label><input${ssrRenderAttr("value", unref(form).shipper)} type="text" id="shipper" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan shipper" data-v-c1582b1e${_scopeId}></div><div data-v-c1582b1e${_scopeId}><label for="bl_awb" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}>BL/AWB</label><input${ssrRenderAttr("value", unref(form).bl_awb)} type="text" id="bl_awb" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan BL/AWB" data-v-c1582b1e${_scopeId}></div><div data-v-c1582b1e${_scopeId}><label for="pol" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}>POL</label><input${ssrRenderAttr("value", unref(form).pol)} type="text" id="pol" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Port of Loading" data-v-c1582b1e${_scopeId}></div><div data-v-c1582b1e${_scopeId}><label for="pod" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}>POD</label><input${ssrRenderAttr("value", unref(form).pod)} type="text" id="pod" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Port of Discharge" data-v-c1582b1e${_scopeId}></div><div data-v-c1582b1e${_scopeId}><label for="eta" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}>ETA</label><input${ssrRenderAttr("value", unref(form).eta)} type="date" id="eta" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-c1582b1e${_scopeId}></div><div data-v-c1582b1e${_scopeId}><label for="vessel" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}>Vessel</label><input${ssrRenderAttr("value", unref(form).vessel)} type="text" id="vessel" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan vessel" data-v-c1582b1e${_scopeId}></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-c1582b1e${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-c1582b1e${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-c1582b1e${_scopeId}>Informasi Keuangan</h3></div><div class="p-6 space-y-4" data-v-c1582b1e${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-c1582b1e${_scopeId}><div data-v-c1582b1e${_scopeId}><label for="buying" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}>Buying</label><input${ssrRenderAttr("value", unref(form).buying)} type="number" id="buying" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="0.00" data-v-c1582b1e${_scopeId}></div><div data-v-c1582b1e${_scopeId}><label for="selling" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}>Selling</label><input${ssrRenderAttr("value", unref(form).selling)} type="number" id="selling" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="0.00" data-v-c1582b1e${_scopeId}></div><div data-v-c1582b1e${_scopeId}><label for="revenue" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}>Revenue</label><input${ssrRenderAttr("value", unref(form).revenue)} type="number" id="revenue" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="0.00" data-v-c1582b1e${_scopeId}></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-c1582b1e${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-c1582b1e${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-c1582b1e${_scopeId}>Informasi Vendor</h3></div><div class="p-6 space-y-4" data-v-c1582b1e${_scopeId}><div data-v-c1582b1e${_scopeId}><label for="vendor_id" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}> Vendor <span class="text-red-500" data-v-c1582b1e${_scopeId}>*</span></label><select id="vendor_id" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-c1582b1e${_scopeId}><option value="" data-v-c1582b1e${ssrIncludeBooleanAttr(Array.isArray(unref(form).vendor.vendor_id) ? ssrLooseContain(unref(form).vendor.vendor_id, "") : ssrLooseEqual(unref(form).vendor.vendor_id, "")) ? " selected" : ""}${_scopeId}>-- Pilih Vendor --</option><!--[-->`);
            ssrRenderList(__props.vendors, (vendor) => {
              _push2(`<option${ssrRenderAttr("value", vendor.id)} data-v-c1582b1e${ssrIncludeBooleanAttr(Array.isArray(unref(form).vendor.vendor_id) ? ssrLooseContain(unref(form).vendor.vendor_id, vendor.id) : ssrLooseEqual(unref(form).vendor.vendor_id, vendor.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendor.nama_vendor)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-c1582b1e${_scopeId}><div data-v-c1582b1e${_scopeId}><label for="vendor_company_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}> Company Name <span class="text-red-500" data-v-c1582b1e${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).vendor.company_name)} type="text" id="vendor_company_name" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Nama perusahaan vendor" data-v-c1582b1e${_scopeId}></div><div data-v-c1582b1e${_scopeId}><label for="vendor_no_rekening" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}> No Rekening <span class="text-red-500" data-v-c1582b1e${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).vendor.no_rekening)} type="text" id="vendor_no_rekening" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Nomor rekening" data-v-c1582b1e${_scopeId}></div><div data-v-c1582b1e${_scopeId}><label for="vendor_nama_rekening" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}> Nama Rekening <span class="text-red-500" data-v-c1582b1e${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).vendor.nama_rekening)} type="text" id="vendor_nama_rekening" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Nama pemilik rekening" data-v-c1582b1e${_scopeId}></div><div data-v-c1582b1e${_scopeId}><label for="vendor_nominal" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}>Nominal</label><input${ssrRenderAttr("value", unref(form).vendor.nominal)} type="number" id="vendor_nominal" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="0.00" data-v-c1582b1e${_scopeId}></div></div><div data-v-c1582b1e${_scopeId}><label for="vendor_deskripsi" class="block text-sm font-medium text-sage-700 mb-2" data-v-c1582b1e${_scopeId}> Deskripsi <span class="text-red-500" data-v-c1582b1e${_scopeId}>*</span></label><textarea id="vendor_deskripsi" rows="3" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" placeholder="Deskripsi layanan vendor" data-v-c1582b1e${_scopeId}>${ssrInterpolate(unref(form).vendor.deskripsi)}</textarea></div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" data-v-c1582b1e${_scopeId}>`);
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-c1582b1e${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-c1582b1e${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-c1582b1e${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-c1582b1e${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-c1582b1e${_scopeId}>Memperbarui...</span>`);
            } else {
              _push2(`<span data-v-c1582b1e${_scopeId}>Perbarui Sales Order</span>`);
            }
            _push2(`</button></div></form></div>`);
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
                        createVNode("p", { class: "text-sage-600" }, "Perbarui informasi sales order")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.sales-orders.index"),
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
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Dasar")
                    ]),
                    createVNode("div", { class: "p-6 space-y-4" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "order_number",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" Order Number "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).order_number = $event,
                            type: "text",
                            id: "order_number",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Masukkan order number"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).order_number]
                          ]),
                          unref(form).errors.order_number ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.order_number), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "customer",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" Customer "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).customer = $event,
                            type: "text",
                            id: "customer",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Masukkan nama customer"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).customer]
                          ]),
                          unref(form).errors.customer ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.customer), 1)) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Pengiriman")
                    ]),
                    createVNode("div", { class: "p-6 space-y-4" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "shipper",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "Shipper"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).shipper = $event,
                            type: "text",
                            id: "shipper",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Masukkan shipper"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).shipper]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "bl_awb",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "BL/AWB"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).bl_awb = $event,
                            type: "text",
                            id: "bl_awb",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Masukkan BL/AWB"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).bl_awb]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "pol",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "POL"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pol = $event,
                            type: "text",
                            id: "pol",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Port of Loading"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pol]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "pod",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "POD"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pod = $event,
                            type: "text",
                            id: "pod",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Port of Discharge"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pod]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "eta",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "ETA"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).eta = $event,
                            type: "date",
                            id: "eta",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).eta]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "vessel",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "Vessel"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).vessel = $event,
                            type: "text",
                            id: "vessel",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Masukkan vessel"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).vessel]
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Keuangan")
                    ]),
                    createVNode("div", { class: "p-6 space-y-4" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "buying",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "Buying"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).buying = $event,
                            type: "number",
                            id: "buying",
                            step: "0.01",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "0.00"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).buying]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "selling",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "Selling"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).selling = $event,
                            type: "number",
                            id: "selling",
                            step: "0.01",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "0.00"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).selling]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "revenue",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "Revenue"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).revenue = $event,
                            type: "number",
                            id: "revenue",
                            step: "0.01",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "0.00"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).revenue]
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Vendor")
                    ]),
                    createVNode("div", { class: "p-6 space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "vendor_id",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, [
                          createTextVNode(" Vendor "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).vendor.vendor_id = $event,
                          onChange: onVendorSelect,
                          id: "vendor_id",
                          required: "",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, [
                          createVNode("option", { value: "" }, "-- Pilih Vendor --"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors, (vendor) => {
                            return openBlock(), createBlock("option", {
                              key: vendor.id,
                              value: vendor.id
                            }, toDisplayString(vendor.nama_vendor), 9, ["value"]);
                          }), 128))
                        ], 40, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).vendor.vendor_id]
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "vendor_company_name",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" Company Name "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).vendor.company_name = $event,
                            type: "text",
                            id: "vendor_company_name",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Nama perusahaan vendor"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).vendor.company_name]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "vendor_no_rekening",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" No Rekening "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).vendor.no_rekening = $event,
                            type: "text",
                            id: "vendor_no_rekening",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Nomor rekening"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).vendor.no_rekening]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "vendor_nama_rekening",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" Nama Rekening "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).vendor.nama_rekening = $event,
                            type: "text",
                            id: "vendor_nama_rekening",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Nama pemilik rekening"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).vendor.nama_rekening]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "vendor_nominal",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "Nominal"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).vendor.nominal = $event,
                            type: "number",
                            id: "vendor_nominal",
                            step: "0.01",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "0.00"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).vendor.nominal]
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "vendor_deskripsi",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, [
                          createTextVNode(" Deskripsi "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).vendor.deskripsi = $event,
                          id: "vendor_deskripsi",
                          rows: "3",
                          required: "",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none",
                          placeholder: "Deskripsi layanan vendor"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).vendor.deskripsi]
                        ])
                      ])
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
                      unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Memperbarui...")) : (openBlock(), createBlock("span", { key: 2 }, "Perbarui Sales Order"))
                    ], 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/SalesOrders/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c1582b1e"]]);
export {
  Edit as default
};
