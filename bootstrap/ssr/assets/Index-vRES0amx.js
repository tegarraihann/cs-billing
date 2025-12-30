import { withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-KnprtzM7.js";
import { P as Pagination } from "./Pagination-JgWO_U2H.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { Plus, Calendar, CheckCircle, TrendingUp, DollarSign, Eye, Edit, Trash2 } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DOEtrGyc.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    periods: Object,
    stats: Object
  },
  setup(__props) {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR"
      }).format(amount || 0);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getStatusBadge = (status) => {
      const badges = {
        "draft": "bg-yellow-100 text-yellow-800",
        "published": "bg-blue-100 text-blue-800",
        "closed": "bg-green-100 text-green-800"
      };
      return badges[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusText = (status) => {
      const texts = {
        "draft": "Draft",
        "published": "Published",
        "closed": "Closed"
      };
      return texts[status] || status;
    };
    const deletePeriod = (period) => {
      if (confirm("Are you sure you want to delete this period? All related data will also be removed.")) {
        router.delete(route("admin-keuangan.profit-loss.destroy", period.id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Income Statement" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Income Statement</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Manage the company’s income statement periods</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.profit-loss.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Add Period `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Add Period ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), { class: "h-6 w-6 text-gray-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Periods</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.total_periods)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Closed Periods</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.closed_periods)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(TrendingUp), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Revenue This Month</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.current_revenue))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), {
              class: __props.stats.current_profit >= 0 ? "h-6 w-6 text-green-400" : "h-6 w-6 text-red-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Net Profit This Month</dt><dd class="${ssrRenderClass(__props.stats.current_profit >= 0 ? "text-lg font-medium text-green-600" : "text-lg font-medium text-red-600")}"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.current_profit))}</dd></dl></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Period </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Dates </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Total Revenue </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Net Profit </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Created By </th><th scope="col" class="relative px-6 py-3"${_scopeId}><span class="sr-only"${_scopeId}>Actions</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.periods.data, (period) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(period.period_name)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(period.period_code)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(period.start_date))} - ${ssrInterpolate(formatDate(period.end_date))}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(period.period_type)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(period.total_revenue))}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="${ssrRenderClass(period.net_profit >= 0 ? "text-sm font-medium text-green-600" : "text-sm font-medium text-red-600")}"${_scopeId}>${ssrInterpolate(formatCurrency(period.net_profit))}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([getStatusBadge(period.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(period.status))}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(period.creator.name)}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><div class="flex space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.profit-loss.show", period.id),
                class: "text-sage-600 hover:text-sage-900 p-2 rounded-md hover:bg-sage-50",
                title: "View Details"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Eye), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (period.status !== "closed") {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("admin-keuangan.profit-loss.edit", period.id),
                  class: "text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50",
                  title: "Edit"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(Edit), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(Edit), { class: "w-4 h-4" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (period.status !== "closed") {
                _push2(`<button class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" title="Delete"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.periods.data.length === 0) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Calendar), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}>No periods available</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}>Start by creating the first income statement period</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.periods.links) {
              _push2(`<div class="mt-6"${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.periods }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Income Statement" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Income Statement"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Manage the company’s income statement periods")
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.profit-loss.create"),
                      class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Add Period ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Calendar), { class: "h-6 w-6 text-gray-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Periods"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.total_periods), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(CheckCircle), { class: "h-6 w-6 text-green-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Closed Periods"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.closed_periods), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(TrendingUp), { class: "h-6 w-6 text-blue-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Revenue This Month"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.stats.current_revenue)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(DollarSign), {
                              class: __props.stats.current_profit >= 0 ? "h-6 w-6 text-green-400" : "h-6 w-6 text-red-400"
                            }, null, 8, ["class"])
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Net Profit This Month"),
                              createVNode("dd", {
                                class: __props.stats.current_profit >= 0 ? "text-lg font-medium text-green-600" : "text-lg font-medium text-red-600"
                              }, toDisplayString(formatCurrency(__props.stats.current_profit)), 3)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Period "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Dates "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Total Revenue "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Net Profit "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Status "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Created By "),
                              createVNode("th", {
                                scope: "col",
                                class: "relative px-6 py-3"
                              }, [
                                createVNode("span", { class: "sr-only" }, "Actions")
                              ])
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.periods.data, (period) => {
                              return openBlock(), createBlock("tr", {
                                key: period.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(period.period_name), 1),
                                  createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(period.period_code), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(period.start_date)) + " - " + toDisplayString(formatDate(period.end_date)), 1),
                                  createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(period.period_type), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(period.total_revenue)), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", {
                                    class: period.net_profit >= 0 ? "text-sm font-medium text-green-600" : "text-sm font-medium text-red-600"
                                  }, toDisplayString(formatCurrency(period.net_profit)), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: [getStatusBadge(period.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                  }, toDisplayString(getStatusText(period.status)), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(period.creator.name), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                  createVNode("div", { class: "flex space-x-2" }, [
                                    createVNode(unref(Link), {
                                      href: _ctx.route("admin-keuangan.profit-loss.show", period.id),
                                      class: "text-sage-600 hover:text-sage-900 p-2 rounded-md hover:bg-sage-50",
                                      title: "View Details"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Eye), { class: "w-4 h-4" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    period.status !== "closed" ? (openBlock(), createBlock(unref(Link), {
                                      key: 0,
                                      href: _ctx.route("admin-keuangan.profit-loss.edit", period.id),
                                      class: "text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50",
                                      title: "Edit"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Edit), { class: "w-4 h-4" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])) : createCommentVNode("", true),
                                    period.status !== "closed" ? (openBlock(), createBlock("button", {
                                      key: 1,
                                      onClick: ($event) => deletePeriod(period),
                                      class: "text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50",
                                      title: "Delete"
                                    }, [
                                      createVNode(unref(Trash2), { class: "w-4 h-4" })
                                    ], 8, ["onClick"])) : createCommentVNode("", true)
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      __props.periods.data.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-12"
                      }, [
                        createVNode(unref(Calendar), { class: "mx-auto h-12 w-12 text-gray-400" }),
                        createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No periods available"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Start by creating the first income statement period")
                      ])) : createCommentVNode("", true),
                      __props.periods.links ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-6"
                      }, [
                        createVNode(Pagination, { data: __props.periods }, null, 8, ["data"])
                      ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ProfitLoss/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
