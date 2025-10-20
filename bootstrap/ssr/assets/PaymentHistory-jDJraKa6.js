import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-CnL2CSWj.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-BkEnLfKi.js";
const _sfc_main = {
  __name: "PaymentHistory",
  __ssrInlineRender: true,
  props: {
    payments: Object
  },
  setup(__props) {
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.invoices.index": "/admin-keuangan/invoices",
        "admin-keuangan.invoices.show": (id) => `/admin-keuangan/invoices/${id}`
      };
      return typeof routes[name] === "function" ? routes[name](params) : routes[name] || "#";
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID");
    };
    const formatDateTime = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleString("id-ID");
    };
    const formatCurrency = (amount, currency = "IDR") => {
      if (!amount) return "-";
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
        minimumFractionDigits: 0
      }).format(amount);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-533ad1ad${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-533ad1ad${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-533ad1ad${_scopeId}><div class="flex items-center" data-v-533ad1ad${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-533ad1ad${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-533ad1ad${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75" data-v-533ad1ad${_scopeId}></path></svg></div><div data-v-533ad1ad${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-533ad1ad${_scopeId}>Payment History</h2><p class="text-sage-600" data-v-533ad1ad${_scopeId}>Riwayat pembayaran invoice yang telah dikonfirmasi</p></div></div><div class="mt-4 sm:mt-0" data-v-533ad1ad${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.index"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-533ad1ad${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-533ad1ad${_scopeId2}></path></svg> Kembali ke Invoice `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 mr-2",
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
                    createTextVNode(" Kembali ke Invoice ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-533ad1ad${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-533ad1ad${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-533ad1ad${_scopeId}>Riwayat Pembayaran</h3></div><div class="overflow-x-auto" data-v-533ad1ad${_scopeId}><table class="w-full" data-v-533ad1ad${_scopeId}><thead class="bg-sage-50" data-v-533ad1ad${_scopeId}><tr data-v-533ad1ad${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-533ad1ad${_scopeId}> Invoice Number </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-533ad1ad${_scopeId}> Customer </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-533ad1ad${_scopeId}> Payment Date </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-533ad1ad${_scopeId}> Amount </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-533ad1ad${_scopeId}> Payment Method </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-533ad1ad${_scopeId}> Confirmed By </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-533ad1ad${_scopeId}> Confirmed At </th><th class="px-6 py-3 text-center text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-533ad1ad${_scopeId}> Aksi </th></tr></thead><tbody class="bg-white divide-y divide-sage-200" data-v-533ad1ad${_scopeId}><!--[-->`);
            ssrRenderList(__props.payments.data, (payment) => {
              var _a, _b, _c, _d;
              _push2(`<tr class="hover:bg-sage-50" data-v-533ad1ad${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-533ad1ad${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-533ad1ad${_scopeId}>${ssrInterpolate(payment.invoice_number)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-533ad1ad${_scopeId}><div class="text-sm text-gray-900" data-v-533ad1ad${_scopeId}>${ssrInterpolate(((_a = payment.customer) == null ? void 0 : _a.consignee_shipper) || ((_b = payment.customer) == null ? void 0 : _b.company_name) || ((_c = payment.sales_order) == null ? void 0 : _c.customer) || "-")}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-533ad1ad${_scopeId}><div class="text-sm text-gray-900" data-v-533ad1ad${_scopeId}>${ssrInterpolate(formatDate(payment.paid_date))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-533ad1ad${_scopeId}><div class="text-sm font-medium text-green-600" data-v-533ad1ad${_scopeId}>${ssrInterpolate(formatCurrency(payment.paid_amount || payment.total))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-533ad1ad${_scopeId}><div class="text-sm text-gray-900" data-v-533ad1ad${_scopeId}>${ssrInterpolate(payment.payment_method || "-")}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-533ad1ad${_scopeId}><div class="text-sm text-gray-900" data-v-533ad1ad${_scopeId}>${ssrInterpolate(((_d = payment.confirmed_by) == null ? void 0 : _d.name) || "-")}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-533ad1ad${_scopeId}><div class="text-sm text-gray-500" data-v-533ad1ad${_scopeId}>${ssrInterpolate(formatDateTime(payment.payment_confirmed_at))}</div></td><td class="px-6 py-4 whitespace-nowrap text-center" data-v-533ad1ad${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.invoices.show", payment.id),
                class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
                title: "Lihat Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-533ad1ad${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-533ad1ad${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-533ad1ad${_scopeId2}></path></svg>`);
                  } else {
                    return [
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
                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        }),
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        })
                      ]))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.payments.data.length === 0) {
              _push2(`<div class="text-center py-12" data-v-533ad1ad${_scopeId}><svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-533ad1ad${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75" data-v-533ad1ad${_scopeId}></path></svg><p class="text-gray-500" data-v-533ad1ad${_scopeId}>Belum ada pembayaran yang dikonfirmasi</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.payments.data.length > 0) {
              _push2(`<div class="px-6 py-4 border-t border-sage-200" data-v-533ad1ad${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.payments }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
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
                            d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75"
                          })
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Payment History"),
                        createVNode("p", { class: "text-sage-600" }, "Riwayat pembayaran invoice yang telah dikonfirmasi")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.invoices.index"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5 mr-2",
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
                          createTextVNode(" Kembali ke Invoice ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Riwayat Pembayaran")
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Invoice Number "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Customer "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Payment Date "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Amount "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Payment Method "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Confirmed By "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Confirmed At "),
                          createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Aksi ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.payments.data, (payment) => {
                          var _a, _b, _c, _d;
                          return openBlock(), createBlock("tr", {
                            key: payment.id,
                            class: "hover:bg-sage-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(payment.invoice_number), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(((_a = payment.customer) == null ? void 0 : _a.consignee_shipper) || ((_b = payment.customer) == null ? void 0 : _b.company_name) || ((_c = payment.sales_order) == null ? void 0 : _c.customer) || "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(payment.paid_date)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-green-600" }, toDisplayString(formatCurrency(payment.paid_amount || payment.total)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(payment.payment_method || "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(((_d = payment.confirmed_by) == null ? void 0 : _d.name) || "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(formatDateTime(payment.payment_confirmed_at)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center" }, [
                              createVNode(unref(Link), {
                                href: unref(route)("admin-keuangan.invoices.show", payment.id),
                                class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
                                title: "Lihat Detail"
                              }, {
                                default: withCtx(() => [
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
                                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    }),
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    })
                                  ]))
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  __props.payments.data.length === 0 ? (openBlock(), createBlock("div", {
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
                        d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75"
                      })
                    ])),
                    createVNode("p", { class: "text-gray-500" }, "Belum ada pembayaran yang dikonfirmasi")
                  ])) : createCommentVNode("", true),
                  __props.payments.data.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "px-6 py-4 border-t border-sage-200"
                  }, [
                    createVNode(Pagination, { data: __props.payments }, null, 8, ["data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Invoices/PaymentHistory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PaymentHistory = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-533ad1ad"]]);
export {
  PaymentHistory as default
};
