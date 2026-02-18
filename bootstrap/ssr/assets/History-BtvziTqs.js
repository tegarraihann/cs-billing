import { withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { Eye, ArrowLeft, CreditCard, Calendar, Activity, TrendingUp, TrendingDown } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const _sfc_main = {
  __name: "History",
  __ssrInlineRender: true,
  props: {
    bank: {
      type: Object,
      required: true
    },
    balances: {
      type: Object,
      default: () => ({ data: [] })
    },
    transactions: {
      type: Object,
      default: () => ({ data: [] })
    },
    currentBalance: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount || 0);
    };
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const formatDateTime = (datetime) => {
      if (!datetime) return "-";
      return new Date(datetime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: `Bank ${__props.bank.bank_name} History`
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Bank ${ssrInterpolate(__props.bank.bank_name)} History</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}> Opening balance and transaction history for ${ssrInterpolate(__props.bank.bank_name)}</p></div><div class="flex space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.bank-balance.show", __props.bank.id),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Eye), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` View Details `);
                } else {
                  return [
                    createVNode(unref(Eye), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" View Details ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.bank-balance.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Back to Overview `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Back to Overview ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg mb-6"${_scopeId}><div class="px-6 py-8 text-white"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h2 class="text-lg font-medium"${_scopeId}>Current Balance</h2><p class="text-3xl font-bold mt-2"${_scopeId}>${ssrInterpolate(formatCurrency(__props.currentBalance))}</p><p class="text-blue-100 mt-1"${_scopeId}>${ssrInterpolate(__props.bank.account_number)} • ${ssrInterpolate(__props.bank.account_name)}</p></div><div class="text-right"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CreditCard), { class: "w-16 h-16 text-blue-200" }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), { class: "w-5 h-5 mr-2 text-gray-400" }, null, _parent2, _scopeId));
            _push2(` Opening Balances History </h3>`);
            if (__props.balances && __props.balances.data && __props.balances.data.length > 0) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.balances.data, (balance) => {
                var _a;
                _push2(`<div class="border border-gray-200 rounded-lg p-4"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div${_scopeId}><h4 class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(balance.period_month)}</h4><p class="text-lg font-semibold text-sage-600 mt-1"${_scopeId}>${ssrInterpolate(formatCurrency(balance.opening_balance))}</p>`);
                if (balance.notes) {
                  _push2(`<p class="text-sm text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(balance.notes)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="text-right"${_scopeId}><p class="text-xs text-gray-400"${_scopeId}>Created by</p><p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(((_a = balance.creator) == null ? void 0 : _a.name) || "-")}</p><p class="text-xs text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(formatDateTime(balance.created_at))}</p></div></div></div>`);
              });
              _push2(`<!--]-->`);
              if (__props.balances.links) {
                _push2(`<div class="mt-4"${_scopeId}><nav class="flex justify-center"${_scopeId}><div class="flex space-x-1"${_scopeId}><!--[-->`);
                ssrRenderList(__props.balances.links, (link) => {
                  _push2(`<!--[-->`);
                  if (link.url) {
                    _push2(ssrRenderComponent(unref(Link), {
                      href: link.url,
                      class: ["px-3 py-2 text-sm rounded-md", link.active ? "bg-sage-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"]
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<span class="px-3 py-2 text-sm text-gray-400"${_scopeId}>${link.label ?? ""}</span>`);
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]--></div></nav></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="text-center py-8"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Calendar), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}>No opening balances found</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}> Opening balances will appear after they are entered. </p></div>`);
            }
            _push2(`</div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Activity), { class: "w-5 h-5 mr-2 text-gray-400" }, null, _parent2, _scopeId));
            _push2(` Recent Transactions </h3>`);
            if (__props.transactions && __props.transactions.data && __props.transactions.data.length > 0) {
              _push2(`<div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.transactions.data, (transaction) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-4"${_scopeId}><div class="flex justify-between items-start"${_scopeId}><div class="flex-1"${_scopeId}><div class="flex items-center space-x-2"${_scopeId}><span class="${ssrRenderClass(transaction.transaction_type === "credit" ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800")}"${_scopeId}>`);
                if (transaction.transaction_type === "credit") {
                  _push2(ssrRenderComponent(unref(TrendingUp), { class: "w-3 h-3 mr-1" }, null, _parent2, _scopeId));
                } else {
                  _push2(ssrRenderComponent(unref(TrendingDown), { class: "w-3 h-3 mr-1" }, null, _parent2, _scopeId));
                }
                _push2(` ${ssrInterpolate(transaction.transaction_type === "credit" ? "Credit" : "Debit")}</span><span class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(transaction.transaction_date))}</span></div><p class="text-sm text-gray-900 mt-1 font-medium"${_scopeId}>${ssrInterpolate(transaction.description)}</p><p class="text-xs text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(transaction.reference_type || "Manual")}</p></div><div class="text-right ml-4"${_scopeId}><p class="${ssrRenderClass(transaction.transaction_type === "credit" ? "text-lg font-semibold text-green-600" : "text-lg font-semibold text-red-600")}"${_scopeId}>${ssrInterpolate(transaction.transaction_type === "credit" ? "+" : "-")}${ssrInterpolate(formatCurrency(transaction.amount))}</p></div></div></div>`);
              });
              _push2(`<!--]-->`);
              if (__props.transactions.links) {
                _push2(`<div class="mt-4"${_scopeId}><nav class="flex justify-center"${_scopeId}><div class="flex space-x-1"${_scopeId}><!--[-->`);
                ssrRenderList(__props.transactions.links, (link) => {
                  _push2(`<!--[-->`);
                  if (link.url) {
                    _push2(ssrRenderComponent(unref(Link), {
                      href: link.url,
                      class: ["px-3 py-2 text-sm rounded-md", link.active ? "bg-sage-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"]
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<span class="px-3 py-2 text-sm text-gray-400"${_scopeId}>${link.label ?? ""}</span>`);
                  }
                  _push2(`<!--]-->`);
                });
                _push2(`<!--]--></div></nav></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="text-center py-8"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Activity), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}>No transactions found</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}> Transactions will appear after customer or vendor payments are posted. </p></div>`);
            }
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: `Bank ${__props.bank.bank_name} History`
              }, null, 8, ["title"]),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Bank " + toDisplayString(__props.bank.bank_name) + " History", 1),
                        createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " Opening balance and transaction history for " + toDisplayString(__props.bank.bank_name), 1)
                      ]),
                      createVNode("div", { class: "flex space-x-3" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.bank-balance.show", __props.bank.id),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Eye), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" View Details ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.bank-balance.index"),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Back to Overview ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg mb-6" }, [
                    createVNode("div", { class: "px-6 py-8 text-white" }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-lg font-medium" }, "Current Balance"),
                          createVNode("p", { class: "text-3xl font-bold mt-2" }, toDisplayString(formatCurrency(__props.currentBalance)), 1),
                          createVNode("p", { class: "text-blue-100 mt-1" }, toDisplayString(__props.bank.account_number) + " • " + toDisplayString(__props.bank.account_name), 1)
                        ]),
                        createVNode("div", { class: "text-right" }, [
                          createVNode(unref(CreditCard), { class: "w-16 h-16 text-blue-200" })
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                      createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4 flex items-center" }, [
                          createVNode(unref(Calendar), { class: "w-5 h-5 mr-2 text-gray-400" }),
                          createTextVNode(" Opening Balances History ")
                        ]),
                        __props.balances && __props.balances.data && __props.balances.data.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.balances.data, (balance) => {
                            var _a;
                            return openBlock(), createBlock("div", {
                              key: balance.id,
                              class: "border border-gray-200 rounded-lg p-4"
                            }, [
                              createVNode("div", { class: "flex justify-between items-start" }, [
                                createVNode("div", null, [
                                  createVNode("h4", { class: "text-sm font-medium text-gray-900" }, toDisplayString(balance.period_month), 1),
                                  createVNode("p", { class: "text-lg font-semibold text-sage-600 mt-1" }, toDisplayString(formatCurrency(balance.opening_balance)), 1),
                                  balance.notes ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-sm text-gray-500 mt-1"
                                  }, toDisplayString(balance.notes), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", { class: "text-right" }, [
                                  createVNode("p", { class: "text-xs text-gray-400" }, "Created by"),
                                  createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(((_a = balance.creator) == null ? void 0 : _a.name) || "-"), 1),
                                  createVNode("p", { class: "text-xs text-gray-400 mt-1" }, toDisplayString(formatDateTime(balance.created_at)), 1)
                                ])
                              ])
                            ]);
                          }), 128)),
                          __props.balances.links ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-4"
                          }, [
                            createVNode("nav", { class: "flex justify-center" }, [
                              createVNode("div", { class: "flex space-x-1" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.balances.links, (link) => {
                                  return openBlock(), createBlock(Fragment, {
                                    key: link.label
                                  }, [
                                    link.url ? (openBlock(), createBlock(unref(Link), {
                                      key: 0,
                                      href: link.url,
                                      class: ["px-3 py-2 text-sm rounded-md", link.active ? "bg-sage-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"],
                                      innerHTML: link.label
                                    }, null, 8, ["href", "class", "innerHTML"])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "px-3 py-2 text-sm text-gray-400",
                                      innerHTML: link.label
                                    }, null, 8, ["innerHTML"]))
                                  ], 64);
                                }), 128))
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-center py-8"
                        }, [
                          createVNode(unref(Calendar), { class: "mx-auto h-12 w-12 text-gray-400" }),
                          createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No opening balances found"),
                          createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " Opening balances will appear after they are entered. ")
                        ]))
                      ])
                    ]),
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                      createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4 flex items-center" }, [
                          createVNode(unref(Activity), { class: "w-5 h-5 mr-2 text-gray-400" }),
                          createTextVNode(" Recent Transactions ")
                        ]),
                        __props.transactions && __props.transactions.data && __props.transactions.data.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-3"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.transactions.data, (transaction) => {
                            return openBlock(), createBlock("div", {
                              key: transaction.id,
                              class: "border border-gray-200 rounded-lg p-4"
                            }, [
                              createVNode("div", { class: "flex justify-between items-start" }, [
                                createVNode("div", { class: "flex-1" }, [
                                  createVNode("div", { class: "flex items-center space-x-2" }, [
                                    createVNode("span", {
                                      class: transaction.transaction_type === "credit" ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                                    }, [
                                      transaction.transaction_type === "credit" ? (openBlock(), createBlock(unref(TrendingUp), {
                                        key: 0,
                                        class: "w-3 h-3 mr-1"
                                      })) : (openBlock(), createBlock(unref(TrendingDown), {
                                        key: 1,
                                        class: "w-3 h-3 mr-1"
                                      })),
                                      createTextVNode(" " + toDisplayString(transaction.transaction_type === "credit" ? "Credit" : "Debit"), 1)
                                    ], 2),
                                    createVNode("span", { class: "text-xs text-gray-500" }, toDisplayString(formatDate(transaction.transaction_date)), 1)
                                  ]),
                                  createVNode("p", { class: "text-sm text-gray-900 mt-1 font-medium" }, toDisplayString(transaction.description), 1),
                                  createVNode("p", { class: "text-xs text-gray-500 mt-1" }, toDisplayString(transaction.reference_type || "Manual"), 1)
                                ]),
                                createVNode("div", { class: "text-right ml-4" }, [
                                  createVNode("p", {
                                    class: transaction.transaction_type === "credit" ? "text-lg font-semibold text-green-600" : "text-lg font-semibold text-red-600"
                                  }, toDisplayString(transaction.transaction_type === "credit" ? "+" : "-") + toDisplayString(formatCurrency(transaction.amount)), 3)
                                ])
                              ])
                            ]);
                          }), 128)),
                          __props.transactions.links ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-4"
                          }, [
                            createVNode("nav", { class: "flex justify-center" }, [
                              createVNode("div", { class: "flex space-x-1" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.transactions.links, (link) => {
                                  return openBlock(), createBlock(Fragment, {
                                    key: link.label
                                  }, [
                                    link.url ? (openBlock(), createBlock(unref(Link), {
                                      key: 0,
                                      href: link.url,
                                      class: ["px-3 py-2 text-sm rounded-md", link.active ? "bg-sage-600 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"],
                                      innerHTML: link.label
                                    }, null, 8, ["href", "class", "innerHTML"])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "px-3 py-2 text-sm text-gray-400",
                                      innerHTML: link.label
                                    }, null, 8, ["innerHTML"]))
                                  ], 64);
                                }), 128))
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-center py-8"
                        }, [
                          createVNode(unref(Activity), { class: "mx-auto h-12 w-12 text-gray-400" }),
                          createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No transactions found"),
                          createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " Transactions will appear after customer or vendor payments are posted. ")
                        ]))
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/BankBalance/History.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
