import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-DYH406Kd.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    customer: Object
  },
  setup(__props) {
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateTime = (dateString) => {
      return new Date(dateString).toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-cf5fa8c2${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-cf5fa8c2${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-cf5fa8c2${_scopeId}><div class="flex items-center" data-v-cf5fa8c2${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-cf5fa8c2${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cf5fa8c2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-cf5fa8c2${_scopeId}></path></svg></div><div data-v-cf5fa8c2${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(__props.customer.customer_code || __props.customer.no)}</h2><p class="text-sage-600" data-v-cf5fa8c2${_scopeId}> Detail informasi pelanggan dan data pengiriman </p></div></div><div class="flex space-x-2 mt-4 sm:mt-0" data-v-cf5fa8c2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.customers.edit", __props.customer.id),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cf5fa8c2${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-cf5fa8c2${_scopeId2}></path></svg> Edit `);
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
                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      })
                    ])),
                    createTextVNode(" Edit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.customers.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cf5fa8c2${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-cf5fa8c2${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-cf5fa8c2${_scopeId}><div class="lg:col-span-2" data-v-cf5fa8c2${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-cf5fa8c2${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-cf5fa8c2${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-cf5fa8c2${_scopeId}> Informasi Pengiriman </h3></div><div class="p-6" data-v-cf5fa8c2${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-cf5fa8c2${_scopeId}><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> No </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(__props.customer.no || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> SO Number </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(__props.customer.so_number || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> Customer Code </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(__props.customer.customer_code || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> Consignee/Shipper </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(__props.customer.consignee_shipper || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> AWB/BL Number </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(__props.customer.awb_bl_number || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> Cust Doc Name </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(__props.customer.cust_doc_name || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> Type Qty </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(__props.customer.type_qty || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> No Kont/Pallet </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(__props.customer.no_kont_pallet || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> POL/POD </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(__props.customer.pol_pod || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> ETA </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(__props.customer.eta ? formatDate(__props.customer.eta) : "-")}</p></div></div></div></div></div><div data-v-cf5fa8c2${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-cf5fa8c2${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-cf5fa8c2${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-cf5fa8c2${_scopeId}> Informasi Sistem </h3></div><div class="p-6" data-v-cf5fa8c2${_scopeId}><div class="space-y-4" data-v-cf5fa8c2${_scopeId}><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> Ditangani Oleh </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(((_a = __props.customer.handler) == null ? void 0 : _a.name) || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> Dibuat </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(formatDateTime(__props.customer.created_at))}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> Terakhir Diperbarui </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(formatDateTime(__props.customer.updated_at))}</p></div>`);
            if (__props.customer.last_contact_at) {
              _push2(`<div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> Kontak Terakhir </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(formatDateTime(__props.customer.last_contact_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div><div class="mt-6" data-v-cf5fa8c2${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-cf5fa8c2${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-cf5fa8c2${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-cf5fa8c2${_scopeId}> Buying to Vendor </h3><p class="text-sm text-sage-600 mt-1" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(((_b = __props.customer.vendors) == null ? void 0 : _b.length) || 0)} vendor terdaftar </p></div><div class="p-6" data-v-cf5fa8c2${_scopeId}>`);
            if (__props.customer.vendors && __props.customer.vendors.length > 0) {
              _push2(`<div class="space-y-6" data-v-cf5fa8c2${_scopeId}><!--[-->`);
              ssrRenderList(__props.customer.vendors, (vendor, index) => {
                _push2(`<div class="border border-sage-200 rounded-lg p-4 bg-sage-50" data-v-cf5fa8c2${_scopeId}><div class="flex items-center justify-between mb-4" data-v-cf5fa8c2${_scopeId}><h4 class="font-medium text-sage-800" data-v-cf5fa8c2${_scopeId}>Vendor ${ssrInterpolate(index + 1)}</h4>`);
                if (vendor.nominal) {
                  _push2(`<span class="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(formatCurrency(vendor.nominal))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-cf5fa8c2${_scopeId}><div class="md:col-span-2 lg:col-span-3" data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> Deskripsi </label><p class="text-gray-900 bg-white p-3 rounded border border-sage-200" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(vendor.deskripsi || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> Nominal </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(vendor.nominal ? formatCurrency(vendor.nominal) : "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> No Rekening </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(vendor.no_rekening || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> Company Name </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(vendor.company_name || "-")}</p></div><div data-v-cf5fa8c2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-cf5fa8c2${_scopeId}> RCVD INV </label><p class="text-gray-900" data-v-cf5fa8c2${_scopeId}>${ssrInterpolate(vendor.rcvd_inv || "-")}</p></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-8" data-v-cf5fa8c2${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-cf5fa8c2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-cf5fa8c2${_scopeId}></path></svg><p class="text-lg font-medium text-gray-900 mb-2" data-v-cf5fa8c2${_scopeId}>Tidak ada data vendor</p><p class="text-sm text-gray-400" data-v-cf5fa8c2${_scopeId}> Belum ada vendor yang terdaftar untuk data ini </p></div>`);
            }
            _push2(`</div></div></div></div>`);
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
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, toDisplayString(__props.customer.customer_code || __props.customer.no), 1),
                        createVNode("p", { class: "text-sage-600" }, " Detail informasi pelanggan dan data pengiriman ")
                      ])
                    ]),
                    createVNode("div", { class: "flex space-x-2 mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.customers.edit", __props.customer.id),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
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
                              d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            })
                          ])),
                          createTextVNode(" Edit ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.customers.index"),
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
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Informasi Pengiriman ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " No "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.no || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " SO Number "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.so_number || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Customer Code "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.customer_code || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Consignee/Shipper "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.consignee_shipper || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " AWB/BL Number "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.awb_bl_number || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Cust Doc Name "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.cust_doc_name || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Type Qty "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.type_qty || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " No Kont/Pallet "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.no_kont_pallet || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " POL/POD "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.pol_pod || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " ETA "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.eta ? formatDate(__props.customer.eta) : "-"), 1)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", null, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Informasi Sistem ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Ditangani Oleh "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(((_c = __props.customer.handler) == null ? void 0 : _c.name) || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Dibuat "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.customer.created_at)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Terakhir Diperbarui "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.customer.updated_at)), 1)
                          ]),
                          __props.customer.last_contact_at ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Kontak Terakhir "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.customer.last_contact_at)), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "mt-6" }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Buying to Vendor "),
                      createVNode("p", { class: "text-sm text-sage-600 mt-1" }, toDisplayString(((_d = __props.customer.vendors) == null ? void 0 : _d.length) || 0) + " vendor terdaftar ", 1)
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      __props.customer.vendors && __props.customer.vendors.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-6"
                      }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.customer.vendors, (vendor, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "border border-sage-200 rounded-lg p-4 bg-sage-50"
                          }, [
                            createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                              createVNode("h4", { class: "font-medium text-sage-800" }, "Vendor " + toDisplayString(index + 1), 1),
                              vendor.nominal ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full"
                              }, toDisplayString(formatCurrency(vendor.nominal)), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }, [
                              createVNode("div", { class: "md:col-span-2 lg:col-span-3" }, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Deskripsi "),
                                createVNode("p", { class: "text-gray-900 bg-white p-3 rounded border border-sage-200" }, toDisplayString(vendor.deskripsi || "-"), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nominal "),
                                createVNode("p", { class: "text-gray-900" }, toDisplayString(vendor.nominal ? formatCurrency(vendor.nominal) : "-"), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " No Rekening "),
                                createVNode("p", { class: "text-gray-900" }, toDisplayString(vendor.no_rekening || "-"), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Company Name "),
                                createVNode("p", { class: "text-gray-900" }, toDisplayString(vendor.company_name || "-"), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " RCVD INV "),
                                createVNode("p", { class: "text-gray-900" }, toDisplayString(vendor.rcvd_inv || "-"), 1)
                              ])
                            ])
                          ]);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-center py-8"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-12 h-12 text-gray-300 mb-4 mx-auto",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          })
                        ])),
                        createVNode("p", { class: "text-lg font-medium text-gray-900 mb-2" }, "Tidak ada data vendor"),
                        createVNode("p", { class: "text-sm text-gray-400" }, " Belum ada vendor yang terdaftar untuk data ini ")
                      ]))
                    ])
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Customers/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cf5fa8c2"]]);
export {
  Show as default
};
