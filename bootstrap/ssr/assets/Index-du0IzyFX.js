import { reactive, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withDirectives, vModelText, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { router, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-_mw6ZYQZ.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { debounce } from "lodash";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-CwaJcSy0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    salesOrders: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const form = reactive({
      search: props.filters.search || ""
    });
    const search = debounce(() => {
      router.get(route("admin-keuangan.sales-orders.index"), {
        search: form.search
      }, {
        preserveState: true,
        replace: true
      });
    }, 300);
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
        released: "Dirilis",
        approved: "Disetujui",
        rejected: "Ditolak"
      };
      return labels[status] || status;
    };
    const getStatusColor = (status) => {
      const colors = {
        released: "bg-purple-100 text-purple-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-ea01ecf2${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200" data-v-ea01ecf2${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-ea01ecf2${_scopeId}><div class="flex items-center" data-v-ea01ecf2${_scopeId}><div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4" data-v-ea01ecf2${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ea01ecf2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-ea01ecf2${_scopeId}></path></svg></div><div data-v-ea01ecf2${_scopeId}><h2 class="text-2xl font-bold text-blue-800" data-v-ea01ecf2${_scopeId}>Sales Orders dari CS</h2><p class="text-blue-600" data-v-ea01ecf2${_scopeId}>Kelola sales order yang sudah dirilis oleh CS</p></div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200" data-v-ea01ecf2${_scopeId}><div class="flex flex-col sm:flex-row gap-4" data-v-ea01ecf2${_scopeId}><div class="flex-1" data-v-ea01ecf2${_scopeId}><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari berdasarkan nomor order, customer, atau invoice..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" data-v-ea01ecf2${_scopeId}></div></div></div><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-ea01ecf2${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-ea01ecf2${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-ea01ecf2${_scopeId}>Daftar Sales Orders</h3></div><div class="overflow-x-auto" data-v-ea01ecf2${_scopeId}><table class="w-full" data-v-ea01ecf2${_scopeId}><thead class="bg-gray-50" data-v-ea01ecf2${_scopeId}><tr data-v-ea01ecf2${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ea01ecf2${_scopeId}> Order Number </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ea01ecf2${_scopeId}> Customer </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ea01ecf2${_scopeId}> Dirilis Oleh </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ea01ecf2${_scopeId}> Tanggal Rilis </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ea01ecf2${_scopeId}> Revenue </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ea01ecf2${_scopeId}> Status </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ea01ecf2${_scopeId}> Aksi </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-ea01ecf2${_scopeId}><!--[-->`);
            ssrRenderList(__props.salesOrders.data, (salesOrder) => {
              var _a;
              _push2(`<tr class="hover:bg-gray-50" data-v-ea01ecf2${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-ea01ecf2${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-ea01ecf2${_scopeId}>${ssrInterpolate(salesOrder.order_number)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-ea01ecf2${_scopeId}><div class="text-sm text-gray-900" data-v-ea01ecf2${_scopeId}>${ssrInterpolate(salesOrder.customer)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-ea01ecf2${_scopeId}><div class="text-sm text-gray-900" data-v-ea01ecf2${_scopeId}>${ssrInterpolate(((_a = salesOrder.released_by) == null ? void 0 : _a.name) || "N/A")}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-ea01ecf2${_scopeId}><div class="text-sm text-gray-900" data-v-ea01ecf2${_scopeId}>${ssrInterpolate(formatDateTime(salesOrder.released_at))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-ea01ecf2${_scopeId}><div class="text-sm text-gray-900" data-v-ea01ecf2${_scopeId}>${ssrInterpolate(salesOrder.revenue ? formatCurrency(salesOrder.revenue) : "-")}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-ea01ecf2${_scopeId}><span class="${ssrRenderClass([getStatusColor(salesOrder.status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-ea01ecf2${_scopeId}>${ssrInterpolate(getStatusLabel(salesOrder.status))}</span></td><td class="px-6 py-4 whitespace-nowrap text-center space-x-2" data-v-ea01ecf2${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.sales-orders.show", salesOrder.id),
                class: "inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ea01ecf2${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-ea01ecf2${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-ea01ecf2${_scopeId2}></path></svg> Detail `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        class: "w-3 h-3 mr-1",
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
                      createTextVNode(" Detail ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.salesOrders.data.length === 0) {
              _push2(`<div class="text-center py-12" data-v-ea01ecf2${_scopeId}><svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ea01ecf2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-ea01ecf2${_scopeId}></path></svg><p class="text-gray-500" data-v-ea01ecf2${_scopeId}>Belum ada sales order yang dirilis dari CS</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrders.data.length > 0) {
              _push2(`<div class="px-6 py-4 border-t border-gray-200" data-v-ea01ecf2${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.salesOrders }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4" }, [
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
                        createVNode("h2", { class: "text-2xl font-bold text-blue-800" }, "Sales Orders dari CS"),
                        createVNode("p", { class: "text-blue-600" }, "Kelola sales order yang sudah dirilis oleh CS")
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                    createVNode("div", { class: "flex-1" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => form.search = $event,
                        onInput: unref(search),
                        type: "text",
                        placeholder: "Cari berdasarkan nomor order, customer, atau invoice...",
                        class: "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                        [vModelText, form.search]
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-blue-200 bg-blue-50" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-blue-800" }, "Daftar Sales Orders")
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Order Number "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Customer "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Dirilis Oleh "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Tanggal Rilis "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Revenue "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                          createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Aksi ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrders.data, (salesOrder) => {
                          var _a;
                          return openBlock(), createBlock("tr", {
                            key: salesOrder.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(salesOrder.order_number), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(salesOrder.customer), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(((_a = salesOrder.released_by) == null ? void 0 : _a.name) || "N/A"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatDateTime(salesOrder.released_at)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(salesOrder.revenue ? formatCurrency(salesOrder.revenue) : "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("span", {
                                class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusColor(salesOrder.status)]
                              }, toDisplayString(getStatusLabel(salesOrder.status)), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center space-x-2" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("admin-keuangan.sales-orders.show", salesOrder.id),
                                class: "inline-flex items-center px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-3 h-3 mr-1",
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
                                  createTextVNode(" Detail ")
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  __props.salesOrders.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-12"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-12 h-12 text-gray-400 mx-auto mb-4",
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
                    ])),
                    createVNode("p", { class: "text-gray-500" }, "Belum ada sales order yang dirilis dari CS")
                  ])) : createCommentVNode("", true),
                  __props.salesOrders.data.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "px-6 py-4 border-t border-gray-200"
                  }, [
                    createVNode(Pagination, { data: __props.salesOrders }, null, 8, ["data"])
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/SalesOrders/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ea01ecf2"]]);
export {
  Index as default
};
