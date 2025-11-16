import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-COylVoWG.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DIYzn6Nn.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ProfitShipmentDetail",
  __ssrInlineRender: true,
  props: {
    salesOrder: Object,
    profitAnalysis: Object,
    costBreakdown: Array,
    revenueBreakdown: Array
  },
  setup(__props) {
    const formatNumber = (number) => {
      return new Intl.NumberFormat("id-ID").format(number || 0);
    };
    const formatPercentage = (number) => {
      return (number || 0).toFixed(1);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getProfitStatusClass = (status) => {
      const classes = {
        excellent: "bg-green-100 text-green-800",
        good: "bg-blue-100 text-blue-800",
        low: "bg-yellow-100 text-yellow-800",
        breakeven: "bg-gray-100 text-gray-800",
        loss: "bg-red-100 text-red-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getProfitStatusText = (status) => {
      const texts = {
        excellent: "Excellent Profit",
        good: "Good Profit",
        low: "Low Profit",
        breakeven: "Breakeven",
        loss: "Loss"
      };
      return texts[status] || status;
    };
    const getInvoiceStatusClass = (status) => {
      const classes = {
        draft: "bg-gray-100 text-gray-800",
        sent: "bg-blue-100 text-blue-800",
        paid: "bg-green-100 text-green-800",
        overdue: "bg-red-100 text-red-800",
        cancelled: "bg-red-100 text-red-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getInvoiceStatusText = (status) => {
      const texts = {
        draft: "Draft",
        sent: "Terkirim",
        paid: "Dibayar",
        overdue: "Overdue",
        cancelled: "Dibatalkan"
      };
      return texts[status] || status;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Detail Profit Shipment" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Detail Profit Shipment</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Detail analisis profit untuk Sales Order ${ssrInterpolate(__props.salesOrder.order_number)}</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.profit-reports.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId2}></path></svg> Kembali `);
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
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-3"${_scopeId}>Informasi Sales Order</h3><dl class="space-y-2"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Order Number</dt><dd class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.salesOrder.order_number)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Customer</dt><dd class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_a = __props.salesOrder.customer) == null ? void 0 : _a.company_name) || __props.salesOrder.customer)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Tanggal Dibuat</dt><dd class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(__props.salesOrder.created_at))}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Status</dt><dd class="text-sm"${_scopeId}><span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800"${_scopeId}>${ssrInterpolate(__props.salesOrder.status)}</span></dd></div></dl></div><div${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-3"${_scopeId}>Total Selling</h3><div class="text-3xl font-bold text-green-600"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.salesOrder.total_selling))}</div></div><div${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-3"${_scopeId}>Status Profit</h3><span class="${ssrRenderClass([getProfitStatusClass(__props.profitAnalysis.profit_status), "inline-flex px-3 py-2 text-sm font-semibold rounded-lg"])}"${_scopeId}>${ssrInterpolate(getProfitStatusText(__props.profitAnalysis.profit_status))}</span></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"${_scopeId}><div class="bg-blue-50 p-6 rounded-lg border border-blue-200"${_scopeId}><div class="text-sm font-medium text-blue-600 mb-1"${_scopeId}>Revenue</div><div class="text-2xl font-bold text-blue-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.profitAnalysis.revenue))}</div></div><div class="bg-red-50 p-6 rounded-lg border border-red-200"${_scopeId}><div class="text-sm font-medium text-red-600 mb-1"${_scopeId}>Operational Costs</div><div class="text-2xl font-bold text-red-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.profitAnalysis.costs))}</div></div><div class="bg-green-50 p-6 rounded-lg border border-green-200"${_scopeId}><div class="text-sm font-medium text-green-600 mb-1"${_scopeId}>Net Profit</div><div class="${ssrRenderClass([__props.profitAnalysis.profit >= 0 ? "text-green-900" : "text-red-900", "text-2xl font-bold"])}"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.profitAnalysis.profit))}</div></div><div class="bg-purple-50 p-6 rounded-lg border border-purple-200"${_scopeId}><div class="text-sm font-medium text-purple-600 mb-1"${_scopeId}>Profit Margin</div><div class="text-2xl font-bold text-purple-900"${_scopeId}>${ssrInterpolate(formatPercentage(__props.profitAnalysis.profit_margin))}% </div></div></div><div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6"${_scopeId}><div class="px-6 py-4 border-b border-gray-200 bg-blue-50"${_scopeId}><h3 class="text-lg font-semibold text-blue-800"${_scopeId}>Revenue Breakdown</h3></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Invoice Number </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Total </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Paid Amount </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.revenueBreakdown, (revenue) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(revenue.invoice_number)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(revenue.total))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(revenue.paid_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-center"${_scopeId}><span class="${ssrRenderClass([getInvoiceStatusClass(revenue.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getInvoiceStatusText(revenue.status))}</span></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.revenueBreakdown.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="4" class="px-6 py-4 text-center text-gray-500"${_scopeId}> Tidak ada data invoice </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div><div class="bg-white rounded-lg shadow-sm overflow-hidden mb-6"${_scopeId}><div class="px-6 py-4 border-b border-gray-200 bg-red-50"${_scopeId}><h3 class="text-lg font-semibold text-red-800"${_scopeId}>Cost Breakdown by Vendor</h3></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Vendor </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Total Cost </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Paid Amount </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Outstanding </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Services </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.costBreakdown, (cost) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(cost.vendor_name)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(cost.total_cost))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(cost.paid_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(cost.outstanding_amount))}</td><td class="px-6 py-4 text-center"${_scopeId}><div class="space-y-1"${_scopeId}><!--[-->`);
              ssrRenderList(cost.services, (service) => {
                _push2(`<div class="text-xs text-gray-600"${_scopeId}>${ssrInterpolate(service.description)} - Rp ${ssrInterpolate(formatNumber(service.amount))}</div>`);
              });
              _push2(`<!--]--></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.costBreakdown.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="5" class="px-6 py-4 text-center text-gray-500"${_scopeId}> Tidak ada data vendor costs </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div>`);
            if (__props.revenueBreakdown.length > 0) {
              _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
              ssrRenderList(__props.revenueBreakdown, (revenue) => {
                _push2(`<div class="bg-white rounded-lg shadow-sm overflow-hidden"${_scopeId}><div class="px-6 py-4 border-b border-gray-200 bg-gray-50"${_scopeId}><h3 class="text-lg font-semibold text-gray-800"${_scopeId}>Items - ${ssrInterpolate(revenue.invoice_number)}</h3></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Description </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Quantity </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Rate </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Amount </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
                ssrRenderList(revenue.items, (item) => {
                  _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4"${_scopeId}><div class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(item.description)}</div></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatNumber(item.quantity))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(item.rate))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(item.amount))}</td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Detail Profit Shipment" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Detail Profit Shipment"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Detail analisis profit untuk Sales Order " + toDisplayString(__props.salesOrder.order_number), 1)
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.profit-reports.index"),
                      class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
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
                        createTextVNode(" Kembali ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-3" }, "Informasi Sales Order"),
                          createVNode("dl", { class: "space-y-2" }, [
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Order Number"),
                              createVNode("dd", { class: "text-sm text-gray-900" }, toDisplayString(__props.salesOrder.order_number), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Customer"),
                              createVNode("dd", { class: "text-sm text-gray-900" }, toDisplayString(((_b = __props.salesOrder.customer) == null ? void 0 : _b.company_name) || __props.salesOrder.customer), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Tanggal Dibuat"),
                              createVNode("dd", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(__props.salesOrder.created_at)), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Status"),
                              createVNode("dd", { class: "text-sm" }, [
                                createVNode("span", { class: "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800" }, toDisplayString(__props.salesOrder.status), 1)
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-3" }, "Total Selling"),
                          createVNode("div", { class: "text-3xl font-bold text-green-600" }, " Rp " + toDisplayString(formatNumber(__props.salesOrder.total_selling)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-3" }, "Status Profit"),
                          createVNode("span", {
                            class: [getProfitStatusClass(__props.profitAnalysis.profit_status), "inline-flex px-3 py-2 text-sm font-semibold rounded-lg"]
                          }, toDisplayString(getProfitStatusText(__props.profitAnalysis.profit_status)), 3)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" }, [
                    createVNode("div", { class: "bg-blue-50 p-6 rounded-lg border border-blue-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-blue-600 mb-1" }, "Revenue"),
                      createVNode("div", { class: "text-2xl font-bold text-blue-900" }, " Rp " + toDisplayString(formatNumber(__props.profitAnalysis.revenue)), 1)
                    ]),
                    createVNode("div", { class: "bg-red-50 p-6 rounded-lg border border-red-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-red-600 mb-1" }, "Operational Costs"),
                      createVNode("div", { class: "text-2xl font-bold text-red-900" }, " Rp " + toDisplayString(formatNumber(__props.profitAnalysis.costs)), 1)
                    ]),
                    createVNode("div", { class: "bg-green-50 p-6 rounded-lg border border-green-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-green-600 mb-1" }, "Net Profit"),
                      createVNode("div", {
                        class: ["text-2xl font-bold", __props.profitAnalysis.profit >= 0 ? "text-green-900" : "text-red-900"]
                      }, " Rp " + toDisplayString(formatNumber(__props.profitAnalysis.profit)), 3)
                    ]),
                    createVNode("div", { class: "bg-purple-50 p-6 rounded-lg border border-purple-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-purple-600 mb-1" }, "Profit Margin"),
                      createVNode("div", { class: "text-2xl font-bold text-purple-900" }, toDisplayString(formatPercentage(__props.profitAnalysis.profit_margin)) + "% ", 1)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm overflow-hidden mb-6" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200 bg-blue-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-blue-800" }, "Revenue Breakdown")
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Invoice Number "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Total "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Paid Amount "),
                            createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status ")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.revenueBreakdown, (revenue) => {
                            return openBlock(), createBlock("tr", {
                              key: revenue.invoice_number,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(revenue.invoice_number), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(revenue.total)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(revenue.paid_amount)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center" }, [
                                createVNode("span", {
                                  class: [getInvoiceStatusClass(revenue.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                }, toDisplayString(getInvoiceStatusText(revenue.status)), 3)
                              ])
                            ]);
                          }), 128)),
                          __props.revenueBreakdown.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "4",
                              class: "px-6 py-4 text-center text-gray-500"
                            }, " Tidak ada data invoice ")
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm overflow-hidden mb-6" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200 bg-red-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-red-800" }, "Cost Breakdown by Vendor")
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Vendor "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Total Cost "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Paid Amount "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Outstanding "),
                            createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Services ")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.costBreakdown, (cost) => {
                            return openBlock(), createBlock("tr", {
                              key: cost.vendor_name,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(cost.vendor_name), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(cost.total_cost)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(cost.paid_amount)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(cost.outstanding_amount)), 1),
                              createVNode("td", { class: "px-6 py-4 text-center" }, [
                                createVNode("div", { class: "space-y-1" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(cost.services, (service) => {
                                    return openBlock(), createBlock("div", {
                                      key: service.description,
                                      class: "text-xs text-gray-600"
                                    }, toDisplayString(service.description) + " - Rp " + toDisplayString(formatNumber(service.amount)), 1);
                                  }), 128))
                                ])
                              ])
                            ]);
                          }), 128)),
                          __props.costBreakdown.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "5",
                              class: "px-6 py-4 text-center text-gray-500"
                            }, " Tidak ada data vendor costs ")
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ]),
                  __props.revenueBreakdown.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-6"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.revenueBreakdown, (revenue) => {
                      return openBlock(), createBlock("div", {
                        key: revenue.invoice_number,
                        class: "bg-white rounded-lg shadow-sm overflow-hidden"
                      }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-gray-200 bg-gray-50" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-800" }, "Items - " + toDisplayString(revenue.invoice_number), 1)
                        ]),
                        createVNode("div", { class: "overflow-x-auto" }, [
                          createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                            createVNode("thead", { class: "bg-gray-50" }, [
                              createVNode("tr", null, [
                                createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Description "),
                                createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Quantity "),
                                createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Rate "),
                                createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Amount ")
                              ])
                            ]),
                            createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(revenue.items, (item) => {
                                return openBlock(), createBlock("tr", {
                                  key: item.id,
                                  class: "hover:bg-gray-50"
                                }, [
                                  createVNode("td", { class: "px-6 py-4" }, [
                                    createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(item.description), 1)
                                  ]),
                                  createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900" }, toDisplayString(formatNumber(item.quantity)), 1),
                                  createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(item.rate)), 1),
                                  createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900" }, " Rp " + toDisplayString(formatNumber(item.amount)), 1)
                                ]);
                              }), 128))
                            ])
                          ])
                        ])
                      ]);
                    }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Reports/ProfitShipmentDetail.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
