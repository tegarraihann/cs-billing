import { computed, ref, defineComponent, h, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-d08FDE25.js";
import "./Pagination-JgWO_U2H.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { ArrowLeft, Download, RefreshCw, Edit, CheckCircle } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-BHWh3obl.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    period: Object,
    reportData: Object
  },
  setup(__props) {
    const props = __props;
    const formatCurrency = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(value) || 0);
    const formatDate = (date) => new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    const getStatusText = (status) => status === "closed" ? "Final" : "Draft";
    const getStatusBadge = (status) => status === "closed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
    const summaryCards = computed(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      return [
        { title: "Total Revenue", value: ((_b = (_a = props.reportData) == null ? void 0 : _a.revenues) == null ? void 0 : _b.total) || 0, tone: "text-green-700" },
        { title: "Total Expenses", value: ((_d = (_c = props.reportData) == null ? void 0 : _c.expenses) == null ? void 0 : _d.total) || 0, tone: "text-red-700" },
        {
          title: "Total Shipment Profit",
          value: ((_f = (_e = props.reportData) == null ? void 0 : _e.shipment_profit) == null ? void 0 : _f.total_profit) || 0,
          tone: ((_h = (_g = props.reportData) == null ? void 0 : _g.shipment_profit) == null ? void 0 : _h.total_profit) >= 0 ? "text-green-700" : "text-red-700",
          subtitle: ((_j = (_i = props.reportData) == null ? void 0 : _i.shipment_profit) == null ? void 0 : _j.shipment_count) ? `Shipments: ${(_l = (_k = props.reportData) == null ? void 0 : _k.shipment_profit) == null ? void 0 : _l.shipment_count} | Margin ${Number(((_n = (_m = props.reportData) == null ? void 0 : _m.shipment_profit) == null ? void 0 : _n.average_margin) || 0).toFixed(2)}%` : "Shipments: 0"
        },
        { title: "Net Profit / Loss", value: ((_o = props.reportData) == null ? void 0 : _o.net_profit) || 0, tone: ((_p = props.reportData) == null ? void 0 : _p.net_profit) >= 0 ? "text-green-700" : "text-red-700" },
        { title: "Status", value: "", tone: "text-gray-500", subtitle: getStatusText(props.period.status) }
      ];
    });
    const revenuesMain = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.revenues) == null ? void 0 : _b.main) || [];
    });
    const totalRevenuesMain = computed(() => revenuesMain.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const otherIncome = computed(() => {
      var _a, _b;
      const oi = ((_b = (_a = props.reportData) == null ? void 0 : _a.revenues) == null ? void 0 : _b.other_income_breakdown) || {};
      return {
        bunga_mandiri: oi.bunga_mandiri || { total: 0, entries: [] },
        bunga_bca: oi.bunga_bca || { total: 0, entries: [] },
        lainnya: oi.lainnya || { total: 0, entries: [] }
      };
    });
    const expensesTotal = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.total) || 0;
    });
    const operationalGrouped = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.operational) == null ? void 0 : _c.grouped) || [];
    });
    const expensesSalary = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.salary) || [];
    });
    const expensesAdmin = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.admin) || [];
    });
    const expensesConsumption = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.consumption) || [];
    });
    const expensesOutside = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.outside) || [];
    });
    const expensesTax = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.tax) || [];
    });
    const expensesOther = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.other) || [];
    });
    const expensesPrepaid = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.prepaid) || [];
    });
    const totalExpensesSalary = computed(() => expensesSalary.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const totalExpensesAdmin = computed(() => expensesAdmin.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const totalExpensesConsumption = computed(() => expensesConsumption.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const totalExpensesOutside = computed(() => expensesOutside.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const totalExpensesTax = computed(() => expensesTax.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const totalExpensesOther = computed(() => expensesOther.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const totalExpensesPrepaid = computed(() => expensesPrepaid.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const isExporting = ref(false);
    const loading = ref(false);
    const exportPdf = () => {
      if (isExporting.value) return;
      isExporting.value = true;
      window.location.href = route("admin-keuangan.profit-loss.export-pdf", { profitLoss: props.period.id });
      setTimeout(() => isExporting.value = false, 1e3);
    };
    const regenerateEntries = () => {
      if (loading.value) return;
      loading.value = true;
      router.post(route("admin-keuangan.profit-loss.regenerate", props.period.id), {}, {
        preserveScroll: true,
        onFinish: () => loading.value = false
      });
    };
    const finalizePeriod = () => {
      if (loading.value) return;
      loading.value = true;
      router.post(route("admin-keuangan.profit-loss.finalize", props.period.id), {}, {
        onFinish: () => loading.value = false
      });
    };
    const SectionCard = defineComponent({
      name: "SectionCard",
      props: {
        title: String,
        total: {
          type: [Number, String],
          default: 0
        },
        tone: {
          type: String,
          default: "text-gray-900"
        }
      },
      setup(props2, { slots }) {
        return () => h("div", { class: "bg-white shadow rounded-lg overflow-hidden" }, [
          h("div", { class: "px-4 py-3 border-b border-gray-200 flex justify-between items-center" }, [
            h("h3", { class: "text-sm font-semibold text-gray-900" }, props2.title),
            h("div", { class: `text-sm font-bold ${props2.tone}` }, formatCurrency(props2.total))
          ]),
          h("div", { class: "p-4 space-y-4" }, slots.default ? slots.default() : null)
        ]);
      }
    });
    const SummaryRow = defineComponent({
      name: "SummaryRow",
      props: {
        title: String,
        amount: {
          type: [Number, String],
          default: 0
        }
      },
      setup(props2) {
        return () => h("div", { class: "flex items-center justify-between border border-gray-100 rounded px-3 py-2 bg-gray-50" }, [
          h("div", { class: "text-sm font-semibold text-gray-800" }, props2.title || "Category"),
          h("div", { class: "text-sm font-bold text-gray-900" }, formatCurrency(props2.amount))
        ]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: __props.period.period_name
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.profit-loss.index"),
              class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Back to Income Statements `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Back to Income Statements ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(__props.period.period_name)}</h1><p class="mt-1 text-sm text-gray-600 flex items-center gap-2 flex-wrap"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(__props.period.start_date))} - ${ssrInterpolate(formatDate(__props.period.end_date))}</span><span class="${ssrRenderClass([getStatusBadge(__props.period.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(__props.period.status))}</span></p></div><div class="flex flex-wrap gap-2"${_scopeId}><button${ssrIncludeBooleanAttr(isExporting.value) ? " disabled" : ""} class="${ssrRenderClass([
              "inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md transition-colors",
              isExporting.value ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed" : "text-white bg-red-600 hover:bg-red-700 border-red-600"
            ])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Download), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(isExporting.value ? "Exporting..." : "Export PDF")}</button>`);
            if (__props.period.status !== "closed") {
              _push2(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(RefreshCw), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Sync Latest Data </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.period.status !== "closed") {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.profit-loss.edit", __props.period.id),
                class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Edit), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` Edit Period `);
                  } else {
                    return [
                      createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" Edit Period ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.period.status !== "closed") {
              _push2(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Close Period </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(summaryCards.value, (card) => {
              _push2(`<div class="rounded-lg border border-gray-200 bg-white shadow-sm p-4"${_scopeId}><div class="text-xs font-semibold text-gray-500 uppercase tracking-wide"${_scopeId}>${ssrInterpolate(card.title)}</div><div class="${ssrRenderClass([card.tone, "mt-2 text-lg font-bold"])}"${_scopeId}>${ssrInterpolate(formatCurrency(card.value))}</div>`);
              if (card.subtitle) {
                _push2(`<div class="text-xs text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(card.subtitle)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div><div class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(SectionCard), {
              title: "REVENUE",
              total: __props.reportData.revenues.total,
              tone: "text-green-700"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (totalRevenuesMain.value > 0) {
                    _push3(ssrRenderComponent(unref(SummaryRow), {
                      title: "Main Revenue",
                      amount: totalRevenuesMain.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (otherIncome.value.bunga_mandiri.total > 0) {
                    _push3(ssrRenderComponent(unref(SummaryRow), {
                      title: "Other Income - Mandiri Bank Interest",
                      amount: otherIncome.value.bunga_mandiri.total
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (otherIncome.value.bunga_bca.total > 0) {
                    _push3(ssrRenderComponent(unref(SummaryRow), {
                      title: "Other Income - BCA Bank Interest",
                      amount: otherIncome.value.bunga_bca.total
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (otherIncome.value.lainnya.total > 0) {
                    _push3(ssrRenderComponent(unref(SummaryRow), {
                      title: "Other Income - Other",
                      amount: otherIncome.value.lainnya.total
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    totalRevenuesMain.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                      key: 0,
                      title: "Main Revenue",
                      amount: totalRevenuesMain.value
                    }, null, 8, ["amount"])) : createCommentVNode("", true),
                    otherIncome.value.bunga_mandiri.total > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                      key: 1,
                      title: "Other Income - Mandiri Bank Interest",
                      amount: otherIncome.value.bunga_mandiri.total
                    }, null, 8, ["amount"])) : createCommentVNode("", true),
                    otherIncome.value.bunga_bca.total > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                      key: 2,
                      title: "Other Income - BCA Bank Interest",
                      amount: otherIncome.value.bunga_bca.total
                    }, null, 8, ["amount"])) : createCommentVNode("", true),
                    otherIncome.value.lainnya.total > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                      key: 3,
                      title: "Other Income - Other",
                      amount: otherIncome.value.lainnya.total
                    }, null, 8, ["amount"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SectionCard), {
              title: "EXPENSES",
              total: expensesTotal.value,
              tone: "text-red-700"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (totalExpensesSalary.value > 0) {
                    _push3(ssrRenderComponent(unref(SummaryRow), {
                      title: "Salary Expense",
                      amount: totalExpensesSalary.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (operationalGrouped.value.length) {
                    _push3(`<div class="space-y-2"${_scopeId2}><div class="text-xs font-semibold text-gray-600 uppercase tracking-wide"${_scopeId2}>Operational Expenses</div><div class="space-y-1"${_scopeId2}><!--[-->`);
                    ssrRenderList(operationalGrouped.value, (cat) => {
                      _push3(ssrRenderComponent(unref(SummaryRow), {
                        key: cat.category_name,
                        title: cat.category_name,
                        amount: cat.total
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (totalExpensesAdmin.value > 0) {
                    _push3(ssrRenderComponent(unref(SummaryRow), {
                      title: "Administrative Expenses",
                      amount: totalExpensesAdmin.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (totalExpensesConsumption.value > 0) {
                    _push3(ssrRenderComponent(unref(SummaryRow), {
                      title: "Consumption Expense",
                      amount: totalExpensesConsumption.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (totalExpensesOutside.value > 0) {
                    _push3(ssrRenderComponent(unref(SummaryRow), {
                      title: "Outside Assignments Expense",
                      amount: totalExpensesOutside.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (totalExpensesPrepaid.value > 0) {
                    _push3(ssrRenderComponent(unref(SummaryRow), {
                      title: "Prepaid Rent Expense",
                      amount: totalExpensesPrepaid.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (totalExpensesTax.value > 0) {
                    _push3(ssrRenderComponent(unref(SummaryRow), {
                      title: "Tax Expenses",
                      amount: totalExpensesTax.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (totalExpensesOther.value > 0) {
                    _push3(ssrRenderComponent(unref(SummaryRow), {
                      title: "Other Expenses",
                      amount: totalExpensesOther.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    totalExpensesSalary.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                      key: 0,
                      title: "Salary Expense",
                      amount: totalExpensesSalary.value
                    }, null, 8, ["amount"])) : createCommentVNode("", true),
                    operationalGrouped.value.length ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-2"
                    }, [
                      createVNode("div", { class: "text-xs font-semibold text-gray-600 uppercase tracking-wide" }, "Operational Expenses"),
                      createVNode("div", { class: "space-y-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(operationalGrouped.value, (cat) => {
                          return openBlock(), createBlock(unref(SummaryRow), {
                            key: cat.category_name,
                            title: cat.category_name,
                            amount: cat.total
                          }, null, 8, ["title", "amount"]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    totalExpensesAdmin.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                      key: 2,
                      title: "Administrative Expenses",
                      amount: totalExpensesAdmin.value
                    }, null, 8, ["amount"])) : createCommentVNode("", true),
                    totalExpensesConsumption.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                      key: 3,
                      title: "Consumption Expense",
                      amount: totalExpensesConsumption.value
                    }, null, 8, ["amount"])) : createCommentVNode("", true),
                    totalExpensesOutside.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                      key: 4,
                      title: "Outside Assignments Expense",
                      amount: totalExpensesOutside.value
                    }, null, 8, ["amount"])) : createCommentVNode("", true),
                    totalExpensesPrepaid.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                      key: 5,
                      title: "Prepaid Rent Expense",
                      amount: totalExpensesPrepaid.value
                    }, null, 8, ["amount"])) : createCommentVNode("", true),
                    totalExpensesTax.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                      key: 6,
                      title: "Tax Expenses",
                      amount: totalExpensesTax.value
                    }, null, 8, ["amount"])) : createCommentVNode("", true),
                    totalExpensesOther.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                      key: 7,
                      title: "Other Expenses",
                      amount: totalExpensesOther.value
                    }, null, 8, ["amount"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.reportData.net_profit !== void 0) {
              _push2(ssrRenderComponent(unref(SectionCard), {
                title: "NET PROFIT / LOSS",
                total: __props.reportData.net_profit,
                tone: __props.reportData.net_profit >= 0 ? "text-green-700" : "text-red-700"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: __props.period.period_name
              }, null, 8, ["title"]),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4" }, [
                    createVNode("div", null, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.profit-loss.index"),
                        class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Back to Income Statements ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(__props.period.period_name), 1),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600 flex items-center gap-2 flex-wrap" }, [
                        createVNode("span", null, toDisplayString(formatDate(__props.period.start_date)) + " - " + toDisplayString(formatDate(__props.period.end_date)), 1),
                        createVNode("span", {
                          class: [getStatusBadge(__props.period.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                        }, toDisplayString(getStatusText(__props.period.status)), 3)
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      createVNode("button", {
                        onClick: exportPdf,
                        disabled: isExporting.value,
                        class: [
                          "inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md transition-colors",
                          isExporting.value ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed" : "text-white bg-red-600 hover:bg-red-700 border-red-600"
                        ]
                      }, [
                        createVNode(unref(Download), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" " + toDisplayString(isExporting.value ? "Exporting..." : "Export PDF"), 1)
                      ], 10, ["disabled"]),
                      __props.period.status !== "closed" ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: regenerateEntries,
                        disabled: loading.value,
                        class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                      }, [
                        createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Sync Latest Data ")
                      ], 8, ["disabled"])) : createCommentVNode("", true),
                      __props.period.status !== "closed" ? (openBlock(), createBlock(unref(Link), {
                        key: 1,
                        href: _ctx.route("admin-keuangan.profit-loss.edit", __props.period.id),
                        class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Edit Period ")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true),
                      __props.period.status !== "closed" ? (openBlock(), createBlock("button", {
                        key: 2,
                        onClick: finalizePeriod,
                        disabled: loading.value,
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, [
                        createVNode(unref(CheckCircle), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Close Period ")
                      ], 8, ["disabled"])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(summaryCards.value, (card) => {
                      return openBlock(), createBlock("div", {
                        key: card.title,
                        class: "rounded-lg border border-gray-200 bg-white shadow-sm p-4"
                      }, [
                        createVNode("div", { class: "text-xs font-semibold text-gray-500 uppercase tracking-wide" }, toDisplayString(card.title), 1),
                        createVNode("div", {
                          class: [card.tone, "mt-2 text-lg font-bold"]
                        }, toDisplayString(formatCurrency(card.value)), 3),
                        card.subtitle ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-xs text-gray-500 mt-1"
                        }, toDisplayString(card.subtitle), 1)) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode(unref(SectionCard), {
                      title: "REVENUE",
                      total: __props.reportData.revenues.total,
                      tone: "text-green-700"
                    }, {
                      default: withCtx(() => [
                        totalRevenuesMain.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                          key: 0,
                          title: "Main Revenue",
                          amount: totalRevenuesMain.value
                        }, null, 8, ["amount"])) : createCommentVNode("", true),
                        otherIncome.value.bunga_mandiri.total > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                          key: 1,
                          title: "Other Income - Mandiri Bank Interest",
                          amount: otherIncome.value.bunga_mandiri.total
                        }, null, 8, ["amount"])) : createCommentVNode("", true),
                        otherIncome.value.bunga_bca.total > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                          key: 2,
                          title: "Other Income - BCA Bank Interest",
                          amount: otherIncome.value.bunga_bca.total
                        }, null, 8, ["amount"])) : createCommentVNode("", true),
                        otherIncome.value.lainnya.total > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                          key: 3,
                          title: "Other Income - Other",
                          amount: otherIncome.value.lainnya.total
                        }, null, 8, ["amount"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["total"]),
                    createVNode(unref(SectionCard), {
                      title: "EXPENSES",
                      total: expensesTotal.value,
                      tone: "text-red-700"
                    }, {
                      default: withCtx(() => [
                        totalExpensesSalary.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                          key: 0,
                          title: "Salary Expense",
                          amount: totalExpensesSalary.value
                        }, null, 8, ["amount"])) : createCommentVNode("", true),
                        operationalGrouped.value.length ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-2"
                        }, [
                          createVNode("div", { class: "text-xs font-semibold text-gray-600 uppercase tracking-wide" }, "Operational Expenses"),
                          createVNode("div", { class: "space-y-1" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(operationalGrouped.value, (cat) => {
                              return openBlock(), createBlock(unref(SummaryRow), {
                                key: cat.category_name,
                                title: cat.category_name,
                                amount: cat.total
                              }, null, 8, ["title", "amount"]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        totalExpensesAdmin.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                          key: 2,
                          title: "Administrative Expenses",
                          amount: totalExpensesAdmin.value
                        }, null, 8, ["amount"])) : createCommentVNode("", true),
                        totalExpensesConsumption.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                          key: 3,
                          title: "Consumption Expense",
                          amount: totalExpensesConsumption.value
                        }, null, 8, ["amount"])) : createCommentVNode("", true),
                        totalExpensesOutside.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                          key: 4,
                          title: "Outside Assignments Expense",
                          amount: totalExpensesOutside.value
                        }, null, 8, ["amount"])) : createCommentVNode("", true),
                        totalExpensesPrepaid.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                          key: 5,
                          title: "Prepaid Rent Expense",
                          amount: totalExpensesPrepaid.value
                        }, null, 8, ["amount"])) : createCommentVNode("", true),
                        totalExpensesTax.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                          key: 6,
                          title: "Tax Expenses",
                          amount: totalExpensesTax.value
                        }, null, 8, ["amount"])) : createCommentVNode("", true),
                        totalExpensesOther.value > 0 ? (openBlock(), createBlock(unref(SummaryRow), {
                          key: 7,
                          title: "Other Expenses",
                          amount: totalExpensesOther.value
                        }, null, 8, ["amount"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["total"]),
                    __props.reportData.net_profit !== void 0 ? (openBlock(), createBlock(unref(SectionCard), {
                      key: 0,
                      title: "NET PROFIT / LOSS",
                      total: __props.reportData.net_profit,
                      tone: __props.reportData.net_profit >= 0 ? "text-green-700" : "text-red-700"
                    }, null, 8, ["total", "tone"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ProfitLoss/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
