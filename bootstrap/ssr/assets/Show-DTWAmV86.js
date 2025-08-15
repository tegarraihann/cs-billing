import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-DYH406Kd.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    salesOrder: Object
  },
  setup(__props) {
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID");
    };
    const formatDateTime = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleString("id-ID");
    };
    const formatCurrency = (amount, currency = "IDR") => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
        minimumFractionDigits: 0
      }).format(amount);
    };
    const getStatusLabel = (status) => {
      const labels = {
        draft: "Draft",
        sent: "Terkirim",
        confirmed: "Dikonfirmasi",
        cancelled: "Dibatalkan"
      };
      return labels[status] || status;
    };
    const getStatusColor = (status) => {
      const colors = {
        draft: "bg-gray-100 text-gray-800",
        sent: "bg-blue-100 text-blue-800",
        confirmed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-eeebce70${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-eeebce70${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-eeebce70${_scopeId}><div class="flex items-center" data-v-eeebce70${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-eeebce70${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eeebce70${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-eeebce70${_scopeId}></path></svg></div><div data-v-eeebce70${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-eeebce70${_scopeId}> Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h2><p class="text-sage-600" data-v-eeebce70${_scopeId}> Detail informasi sales order </p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-eeebce70${_scopeId}><a${ssrRenderAttr("href", _ctx.route("admin-cs.sales-orders.print", __props.salesOrder.id))} target="_blank" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" data-v-eeebce70${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eeebce70${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" data-v-eeebce70${_scopeId}></path></svg> Print PDF </a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.edit", __props.salesOrder.id),
              class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eeebce70${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-eeebce70${_scopeId2}></path></svg> Edit `);
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
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eeebce70${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-eeebce70${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-eeebce70${_scopeId}><div class="lg:col-span-2 space-y-6" data-v-eeebce70${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-eeebce70${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-eeebce70${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-eeebce70${_scopeId}>Informasi Sales Order</h3></div><div class="p-6 space-y-4" data-v-eeebce70${_scopeId}><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>ORDER NUMB</label><p class="text-gray-900 font-semibold" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.order_number)}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>CUSTOMER</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.customer)}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>SHIPPER</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.shipper || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>BL/AWB</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.bl_awb || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>LINER</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.liner || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>VESSEL</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.vessel || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>ETA</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.eta ? formatDate(__props.salesOrder.eta) : "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>AJU</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.aju || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>SPPB DATE</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.sppb_date ? formatDate(__props.salesOrder.sppb_date) : "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>SHIPMENT TYPE</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.shipment_type || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>POL</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.pol || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>POD</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.pod || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>GUDANG/UTC</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.gudang_utc || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>PARTY/LCL</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.party_lcl || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>PREPARED BY</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.prepared_by || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>EXCHANGE RATE</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.exchange_rate || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>JENIS BIAYA</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.jenis_biaya || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>BUYING</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.buying ? formatCurrency(__props.salesOrder.buying) : "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>SELLING</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.selling ? formatCurrency(__props.salesOrder.selling) : "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>REVENUE</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.revenue ? formatCurrency(__props.salesOrder.revenue) : "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>REMARKS</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.remarks || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>GOODS</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.goods || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>CONTAINER NO</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.container_no || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>INVOICE NUMB</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_number || "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>INVOICE DATE</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_date ? formatDate(__props.salesOrder.invoice_date) : "-")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>T.O.P</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(__props.salesOrder.top || "-")}</p></div></div></div></div><div class="space-y-6" data-v-eeebce70${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-eeebce70${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-eeebce70${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-eeebce70${_scopeId}>Status</h3></div><div class="p-6" data-v-eeebce70${_scopeId}><span class="${ssrRenderClass([getStatusColor(__props.salesOrder.status), "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center"])}" data-v-eeebce70${_scopeId}>${ssrInterpolate(getStatusLabel(__props.salesOrder.status || "draft"))}</span></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-eeebce70${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-eeebce70${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-eeebce70${_scopeId}>System Information</h3></div><div class="p-6 space-y-4" data-v-eeebce70${_scopeId}><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>Created By</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(((_a = __props.salesOrder.creator) == null ? void 0 : _a.name) || "Unknown")}</p></div><div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>Created At</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.created_at))}</p></div>`);
            if (__props.salesOrder.last_modified_at) {
              _push2(`<div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>Last Modified</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.last_modified_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.sent_at) {
              _push2(`<div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>Sent At</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.sent_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.confirmed_at) {
              _push2(`<div data-v-eeebce70${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-eeebce70${_scopeId}>Confirmed At</label><p class="text-gray-900" data-v-eeebce70${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.confirmed_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.salesOrder.customer_id) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-eeebce70${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-eeebce70${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-eeebce70${_scopeId}>Related Customer</h3></div><div class="p-6" data-v-eeebce70${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-cs.customers.show", __props.salesOrder.customer_id),
                class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors w-full justify-center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eeebce70${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-eeebce70${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-eeebce70${_scopeId2}></path></svg> Lihat Data Customer `);
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
                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        }),
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        })
                      ])),
                      createTextVNode(" Lihat Data Customer ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
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
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, " Sales Order: " + toDisplayString(__props.salesOrder.order_number), 1),
                        createVNode("p", { class: "text-sage-600" }, " Detail informasi sales order ")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                      createVNode("a", {
                        href: _ctx.route("admin-cs.sales-orders.print", __props.salesOrder.id),
                        target: "_blank",
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
                            d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                          })
                        ])),
                        createTextVNode(" Print PDF ")
                      ], 8, ["href"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.sales-orders.edit", __props.salesOrder.id),
                        class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Sales Order")
                      ]),
                      createVNode("div", { class: "p-6 space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "ORDER NUMB"),
                          createVNode("p", { class: "text-gray-900 font-semibold" }, toDisplayString(__props.salesOrder.order_number), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "CUSTOMER"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.customer), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "SHIPPER"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.shipper || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "BL/AWB"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.bl_awb || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "LINER"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.liner || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "VESSEL"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.vessel || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "ETA"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.eta ? formatDate(__props.salesOrder.eta) : "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "AJU"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.aju || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "SPPB DATE"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.sppb_date ? formatDate(__props.salesOrder.sppb_date) : "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "SHIPMENT TYPE"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.shipment_type || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "POL"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.pol || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "POD"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.pod || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "GUDANG/UTC"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.gudang_utc || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "PARTY/LCL"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.party_lcl || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "PREPARED BY"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.prepared_by || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "EXCHANGE RATE"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.exchange_rate || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "JENIS BIAYA"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.jenis_biaya || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "BUYING"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.buying ? formatCurrency(__props.salesOrder.buying) : "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "SELLING"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.selling ? formatCurrency(__props.salesOrder.selling) : "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "REVENUE"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.revenue ? formatCurrency(__props.salesOrder.revenue) : "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "REMARKS"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.remarks || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "GOODS"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.goods || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "CONTAINER NO"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.container_no || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "INVOICE NUMB"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.invoice_number || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "INVOICE DATE"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.invoice_date ? formatDate(__props.salesOrder.invoice_date) : "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "T.O.P"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.top || "-"), 1)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Status")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("span", {
                          class: ["inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center", getStatusColor(__props.salesOrder.status)]
                        }, toDisplayString(getStatusLabel(__props.salesOrder.status || "draft")), 3)
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "System Information")
                      ]),
                      createVNode("div", { class: "p-6 space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Created By"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(((_b = __props.salesOrder.creator) == null ? void 0 : _b.name) || "Unknown"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Created At"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.salesOrder.created_at)), 1)
                        ]),
                        __props.salesOrder.last_modified_at ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Last Modified"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.salesOrder.last_modified_at)), 1)
                        ])) : createCommentVNode("", true),
                        __props.salesOrder.sent_at ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Sent At"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.salesOrder.sent_at)), 1)
                        ])) : createCommentVNode("", true),
                        __props.salesOrder.confirmed_at ? (openBlock(), createBlock("div", { key: 2 }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Confirmed At"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.salesOrder.confirmed_at)), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    __props.salesOrder.customer_id ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
                    }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Related Customer")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-cs.customers.show", __props.salesOrder.customer_id),
                          class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors w-full justify-center"
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
                                d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              }),
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              })
                            ])),
                            createTextVNode(" Lihat Data Customer ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/SalesOrders/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eeebce70"]]);
export {
  Show as default
};
