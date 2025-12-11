import { withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-Cm66Fn0p.js";
import { Plus, CreditCard, DollarSign, Activity, Calendar, History, Eye } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-C7BgyxQX.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    bankData: {
      type: Array,
      default: () => []
    },
    currentMonth: {
      type: String,
      required: true
    },
    stats: {
      type: Object,
      default: () => ({
        mandiri_balance: 0,
        bca_balance: 0,
        total_balance: 0,
        transactions_this_month: 0
      })
    }
  },
  setup(__props) {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount || 0);
    };
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", {
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
            _push2(ssrRenderComponent(unref(Head), { title: "Bank Balance Management" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Bank Balance Management</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Kelola saldo bank dan input opening balance bulanan</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.bank-balance.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Input Opening Balance `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Input Opening Balance ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CreditCard), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Saldo Bank Mandiri</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.mandiri_balance))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CreditCard), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Saldo Bank BCA</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.bca_balance))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), { class: "h-6 w-6 text-sage-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Saldo Bank</dt><dd class="text-lg font-medium text-sage-600 font-bold"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.total_balance))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Activity), { class: "h-6 w-6 text-purple-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Transaksi Bulan Ini</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.transactions_this_month)}</dd></dl></div></div></div></div></div><div class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), { class: "h-5 w-5 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-blue-800"${_scopeId}> Periode Aktif: ${ssrInterpolate(__props.currentMonth)}</h3><div class="mt-2 text-sm text-blue-700"${_scopeId}><p${_scopeId}>Pastikan opening balance sudah diinput untuk periode ini agar tracking saldo bank akurat.</p></div></div></div></div><div class="space-y-6"${_scopeId}><!--[-->`);
            ssrRenderList(__props.bankData, (bank) => {
              _push2(`<div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CreditCard), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="ml-4"${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}> Bank ${ssrInterpolate(bank.bank_name)}</h3><p class="text-sm text-gray-500"${_scopeId}> Account: ${ssrInterpolate(bank.account_number)} • ${ssrInterpolate(bank.account_name)}</p></div></div><div class="text-right"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Current Balance</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(bank.current_balance))}</p>`);
              if (bank.last_updated) {
                _push2(`<p class="text-xs text-gray-400"${_scopeId}> Last updated: ${ssrInterpolate(formatDate(bank.last_updated))}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="mt-6 flex justify-between items-center"${_scopeId}><div class="flex space-x-4"${_scopeId}>`);
              if (bank.recent_balances && bank.recent_balances.length > 0) {
                _push2(`<div class="text-sm text-gray-600"${_scopeId}><span class="font-medium"${_scopeId}>Recent Opening Balances:</span><div class="mt-1 space-y-1"${_scopeId}><!--[-->`);
                ssrRenderList(bank.recent_balances.slice(0, 3), (balance) => {
                  _push2(`<div class="flex justify-between"${_scopeId}><span${_scopeId}>${ssrInterpolate(balance.period_month)}</span><span class="font-medium"${_scopeId}>${ssrInterpolate(formatCurrency(balance.opening_balance))}</span></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex space-x-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.bank-balance.history", bank.id),
                class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(History), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` View History `);
                  } else {
                    return [
                      createVNode(unref(History), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" View History ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.bank-balance.show", bank.id),
                class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (!__props.bankData || __props.bankData.length === 0) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CreditCard), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}>No bank accounts found</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}> Bank accounts akan muncul setelah opening balance diinput. </p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Bank Balance Management" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Bank Balance Management"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Kelola saldo bank dan input opening balance bulanan")
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.bank-balance.create"),
                      class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Input Opening Balance ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(CreditCard), { class: "h-6 w-6 text-blue-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Saldo Bank Mandiri"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.stats.mandiri_balance)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(CreditCard), { class: "h-6 w-6 text-green-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Saldo Bank BCA"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.stats.bca_balance)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(DollarSign), { class: "h-6 w-6 text-sage-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Saldo Bank"),
                              createVNode("dd", { class: "text-lg font-medium text-sage-600 font-bold" }, toDisplayString(formatCurrency(__props.stats.total_balance)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Activity), { class: "h-6 w-6 text-purple-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Transaksi Bulan Ini"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.transactions_this_month), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-blue-50 border border-blue-200 rounded-md p-4 mb-6" }, [
                    createVNode("div", { class: "flex" }, [
                      createVNode("div", { class: "flex-shrink-0" }, [
                        createVNode(unref(Calendar), { class: "h-5 w-5 text-blue-400" })
                      ]),
                      createVNode("div", { class: "ml-3" }, [
                        createVNode("h3", { class: "text-sm font-medium text-blue-800" }, " Periode Aktif: " + toDisplayString(__props.currentMonth), 1),
                        createVNode("div", { class: "mt-2 text-sm text-blue-700" }, [
                          createVNode("p", null, "Pastikan opening balance sudah diinput untuk periode ini agar tracking saldo bank akurat.")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.bankData, (bank) => {
                      return openBlock(), createBlock("div", {
                        key: bank.id,
                        class: "bg-white shadow overflow-hidden sm:rounded-lg"
                      }, [
                        createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("div", { class: "flex-shrink-0" }, [
                                createVNode("div", { class: "w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center" }, [
                                  createVNode(unref(CreditCard), { class: "w-6 h-6 text-white" })
                                ])
                              ]),
                              createVNode("div", { class: "ml-4" }, [
                                createVNode("h3", { class: "text-lg font-medium text-gray-900" }, " Bank " + toDisplayString(bank.bank_name), 1),
                                createVNode("p", { class: "text-sm text-gray-500" }, " Account: " + toDisplayString(bank.account_number) + " • " + toDisplayString(bank.account_name), 1)
                              ])
                            ]),
                            createVNode("div", { class: "text-right" }, [
                              createVNode("p", { class: "text-sm text-gray-500" }, "Current Balance"),
                              createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(formatCurrency(bank.current_balance)), 1),
                              bank.last_updated ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-gray-400"
                              }, " Last updated: " + toDisplayString(formatDate(bank.last_updated)), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "mt-6 flex justify-between items-center" }, [
                            createVNode("div", { class: "flex space-x-4" }, [
                              bank.recent_balances && bank.recent_balances.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-sm text-gray-600"
                              }, [
                                createVNode("span", { class: "font-medium" }, "Recent Opening Balances:"),
                                createVNode("div", { class: "mt-1 space-y-1" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(bank.recent_balances.slice(0, 3), (balance) => {
                                    return openBlock(), createBlock("div", {
                                      key: balance.id,
                                      class: "flex justify-between"
                                    }, [
                                      createVNode("span", null, toDisplayString(balance.period_month), 1),
                                      createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(balance.opening_balance)), 1)
                                    ]);
                                  }), 128))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "flex space-x-3" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("admin-keuangan.bank-balance.history", bank.id),
                                class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(History), { class: "w-4 h-4 mr-2" }),
                                  createTextVNode(" View History ")
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode(unref(Link), {
                                href: _ctx.route("admin-keuangan.bank-balance.show", bank.id),
                                class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Eye), { class: "w-4 h-4 mr-2" }),
                                  createTextVNode(" View Details ")
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ])
                          ])
                        ])
                      ]);
                    }), 128))
                  ]),
                  !__props.bankData || __props.bankData.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-12"
                  }, [
                    createVNode(unref(CreditCard), { class: "mx-auto h-12 w-12 text-gray-400" }),
                    createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No bank accounts found"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " Bank accounts akan muncul setelah opening balance diinput. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/BankBalance/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
