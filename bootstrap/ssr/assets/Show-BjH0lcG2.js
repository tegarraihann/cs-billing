import { computed, ref, defineComponent, h, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, withDirectives, vModelText, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import "./Pagination-JgWO_U2H.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { ChevronDown, ArrowLeft, PlusCircle, Download, RefreshCw, Edit, CheckCircle } from "lucide-vue-next";
import { _ as _sfc_main$1 } from "./SearchableSelect-DfkOp0gQ.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    period: Object,
    reportData: Object,
    accounts: Object,
    bankAccounts: Array,
    returnQuery: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const formatCurrency = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(value) || 0);
    const formatDate = (date) => new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    const getStatusText = (status) => status === "closed" ? "Final" : "Draft";
    const getStatusBadge = (status) => status === "closed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
    const summaryCards = computed(() => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p;
      return [
        { title: "Total Revenue", value: ((_b = (_a2 = props.reportData) == null ? void 0 : _a2.revenues) == null ? void 0 : _b.total) || 0, tone: "text-green-700" },
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
      var _a2, _b;
      return ((_b = (_a2 = props.reportData) == null ? void 0 : _a2.revenues) == null ? void 0 : _b.main) || [];
    });
    const totalRevenuesMain = computed(() => revenuesMain.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const otherIncome = computed(() => {
      var _a2, _b;
      const oi = ((_b = (_a2 = props.reportData) == null ? void 0 : _a2.revenues) == null ? void 0 : _b.other_income_breakdown) || {};
      return {
        bunga_mandiri: oi.bunga_mandiri || { total: 0, entries: [] },
        bunga_bca: oi.bunga_bca || { total: 0, entries: [] },
        lainnya: oi.lainnya || { total: 0, entries: [] }
      };
    });
    const expensesTotal = computed(() => {
      var _a2, _b;
      return ((_b = (_a2 = props.reportData) == null ? void 0 : _a2.expenses) == null ? void 0 : _b.total) || 0;
    });
    const operationalGrouped = computed(() => {
      var _a2, _b, _c;
      return ((_c = (_b = (_a2 = props.reportData) == null ? void 0 : _a2.expenses) == null ? void 0 : _b.operational) == null ? void 0 : _c.grouped) || [];
    });
    const expensesSalary = computed(() => {
      var _a2, _b;
      return ((_b = (_a2 = props.reportData) == null ? void 0 : _a2.expenses) == null ? void 0 : _b.salary) || [];
    });
    const expensesAdmin = computed(() => {
      var _a2, _b;
      return ((_b = (_a2 = props.reportData) == null ? void 0 : _a2.expenses) == null ? void 0 : _b.admin) || [];
    });
    const expensesConsumption = computed(() => {
      var _a2, _b;
      return ((_b = (_a2 = props.reportData) == null ? void 0 : _a2.expenses) == null ? void 0 : _b.consumption) || [];
    });
    const expensesOutside = computed(() => {
      var _a2, _b;
      return ((_b = (_a2 = props.reportData) == null ? void 0 : _a2.expenses) == null ? void 0 : _b.outside) || [];
    });
    const expensesTax = computed(() => {
      var _a2, _b;
      return ((_b = (_a2 = props.reportData) == null ? void 0 : _a2.expenses) == null ? void 0 : _b.tax) || [];
    });
    const expensesOther = computed(() => {
      var _a2, _b;
      return ((_b = (_a2 = props.reportData) == null ? void 0 : _a2.expenses) == null ? void 0 : _b.other) || [];
    });
    const expensesPrepaid = computed(() => {
      var _a2, _b;
      return ((_b = (_a2 = props.reportData) == null ? void 0 : _a2.expenses) == null ? void 0 : _b.prepaid) || [];
    });
    const totalExpensesSalary = computed(() => expensesSalary.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const totalExpensesAdmin = computed(() => expensesAdmin.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const totalExpensesConsumption = computed(() => expensesConsumption.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const totalExpensesOutside = computed(() => expensesOutside.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const totalExpensesTax = computed(() => expensesTax.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const totalExpensesOther = computed(() => expensesOther.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const totalExpensesPrepaid = computed(() => expensesPrepaid.value.reduce((sum, item) => sum + Number(item.amount || 0), 0));
    const revenueAccounts = computed(() => {
      var _a2;
      return ((_a2 = props.accounts) == null ? void 0 : _a2.revenue) || [];
    });
    const expenseAccounts = computed(() => {
      var _a2;
      return ((_a2 = props.accounts) == null ? void 0 : _a2.expense) || [];
    });
    const bankAccounts = computed(() => props.bankAccounts || []);
    const accountOptions = computed(() => {
      const revenue = (revenueAccounts.value || []).map((acc) => ({
        value: acc.id,
        label: `${acc.account_code} - ${acc.account_name}`,
        subLabel: "Revenue"
      }));
      const expense = (expenseAccounts.value || []).map((acc) => ({
        value: acc.id,
        label: `${acc.account_code} - ${acc.account_name}`,
        subLabel: "Expense"
      }));
      return [...revenue, ...expense];
    });
    const bankOptions = computed(() => {
      return (bankAccounts.value || []).map((bank) => ({
        value: bank.id,
        label: `${bank.bank_name} - ${bank.account_number}`,
        subLabel: bank.account_name || ""
      }));
    });
    const isExporting = ref(false);
    const loading = ref(false);
    const showAdjustmentModal = ref(false);
    const alertDialog = ref({
      show: false,
      type: "info",
      message: ""
    });
    const adjustmentForm = ref({
      account_id: "",
      amount: "",
      description: "",
      transaction_date: ((_a = props.period) == null ? void 0 : _a.start_date) ?? (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      notes: "",
      bank_account_id: "",
      bank_transaction_type: ""
    });
    const openAdjustmentModal = () => {
      var _a2;
      adjustmentForm.value = {
        account_id: "",
        amount: "",
        description: "",
        transaction_date: ((_a2 = props.period) == null ? void 0 : _a2.start_date) ?? (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        notes: "",
        bank_account_id: "",
        bank_transaction_type: ""
      };
      showAdjustmentModal.value = true;
    };
    const closeAdjustmentModal = () => {
      showAdjustmentModal.value = false;
    };
    const submitAdjustment = () => {
      router.post(route("admin-keuangan.profit-loss.entries.store", props.period.id), adjustmentForm.value, {
        preserveScroll: true,
        onSuccess: () => {
          showAdjustmentModal.value = false;
          alertDialog.value = {
            show: true,
            type: "success",
            message: "Penyesuaian berhasil disimpan."
          };
          router.reload({ preserveScroll: true });
        },
        onError: (errors) => {
          const message = (errors == null ? void 0 : errors.error) || "Gagal menyimpan penyesuaian.";
          alertDialog.value = {
            show: true,
            type: "error",
            message
          };
        }
      });
    };
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
    const formatEntryDate = (value) => {
      if (!value) return "-";
      return new Date(value).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
    };
    const resolveEntryLabel = (entry) => {
      var _a2;
      return (entry == null ? void 0 : entry.description) || (entry == null ? void 0 : entry.reference_number) || ((_a2 = entry == null ? void 0 : entry.account) == null ? void 0 : _a2.account_name) || `Entry #${(entry == null ? void 0 : entry.id) ?? "-"}`;
    };
    const resolveEntryMeta = (entry) => {
      var _a2, _b, _c, _d;
      const segments = [];
      if (((_a2 = entry == null ? void 0 : entry.account) == null ? void 0 : _a2.account_code) || ((_b = entry == null ? void 0 : entry.account) == null ? void 0 : _b.account_name)) {
        segments.push([(_c = entry == null ? void 0 : entry.account) == null ? void 0 : _c.account_code, (_d = entry == null ? void 0 : entry.account) == null ? void 0 : _d.account_name].filter(Boolean).join(" - "));
      }
      if (entry == null ? void 0 : entry.transaction_date) {
        segments.push(formatEntryDate(entry.transaction_date));
      }
      if ((entry == null ? void 0 : entry.entry_type) === "manual") {
        segments.push("Manual");
      }
      return segments.join(" | ");
    };
    const CollapsibleSummaryRow = defineComponent({
      name: "CollapsibleSummaryRow",
      props: {
        title: String,
        amount: {
          type: [Number, String],
          default: 0
        },
        entries: {
          type: Array,
          default: () => []
        }
      },
      setup(props2) {
        const isOpen = ref(false);
        return () => {
          const details = (props2.entries || []).map(
            (entry) => h("div", {
              class: "flex items-start justify-between gap-3 px-3 py-2 border-t border-gray-100 first:border-t-0"
            }, [
              h("div", { class: "min-w-0" }, [
                h("div", { class: "text-sm text-gray-800 break-words" }, resolveEntryLabel(entry)),
                h("div", { class: "mt-0.5 text-xs text-gray-500" }, resolveEntryMeta(entry))
              ]),
              h("div", { class: "text-sm font-semibold text-gray-700 whitespace-nowrap" }, formatCurrency((entry == null ? void 0 : entry.amount) || 0))
            ])
          );
          return h("div", { class: "border border-gray-100 rounded overflow-hidden bg-white" }, [
            h("button", {
              type: "button",
              class: "w-full flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors",
              onClick: () => {
                isOpen.value = !isOpen.value;
              }
            }, [
              h("div", { class: "flex items-center gap-2 min-w-0" }, [
                h(ChevronDown, {
                  class: ["w-4 h-4 text-gray-500 transition-transform shrink-0", isOpen.value ? "rotate-180" : ""]
                }),
                h("div", { class: "text-sm font-semibold text-gray-800 text-left" }, props2.title || "Category")
              ]),
              h("div", { class: "text-sm font-bold text-gray-900 whitespace-nowrap" }, formatCurrency(props2.amount))
            ]),
            isOpen.value ? h("div", { class: "bg-white" }, details.length ? details : [h("div", { class: "px-3 py-2 text-sm text-gray-500 border-t border-gray-100" }, "No breakdown available")]) : null
          ]);
        };
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
              href: _ctx.route("admin-keuangan.profit-loss.index", __props.returnQuery),
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
            _push2(`<h1 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(__props.period.period_name)}</h1><p class="mt-1 text-sm text-gray-600 flex items-center gap-2 flex-wrap"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(__props.period.start_date))} - ${ssrInterpolate(formatDate(__props.period.end_date))}</span><span class="${ssrRenderClass([getStatusBadge(__props.period.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(__props.period.status))}</span></p></div><div class="flex flex-wrap gap-2"${_scopeId}>`);
            if (__props.period.status !== "closed") {
              _push2(`<button class="inline-flex items-center px-3 py-2 border border-sage-600 text-sm leading-4 font-medium rounded-md text-white bg-sage-700 hover:bg-sage-900"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(PlusCircle), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Add Adjustment </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button${ssrIncludeBooleanAttr(isExporting.value) ? " disabled" : ""} class="${ssrRenderClass([
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
                href: _ctx.route("admin-keuangan.profit-loss.edit", {
                  profitLoss: __props.period.id,
                  ...__props.returnQuery
                }),
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
                    _push3(ssrRenderComponent(unref(CollapsibleSummaryRow), {
                      title: "Main Revenue",
                      amount: totalRevenuesMain.value,
                      entries: revenuesMain.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (otherIncome.value.bunga_mandiri.total > 0) {
                    _push3(ssrRenderComponent(unref(CollapsibleSummaryRow), {
                      title: "Other Income - Mandiri Bank Interest",
                      amount: otherIncome.value.bunga_mandiri.total,
                      entries: otherIncome.value.bunga_mandiri.entries
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (otherIncome.value.bunga_bca.total > 0) {
                    _push3(ssrRenderComponent(unref(CollapsibleSummaryRow), {
                      title: "Other Income - BCA Bank Interest",
                      amount: otherIncome.value.bunga_bca.total,
                      entries: otherIncome.value.bunga_bca.entries
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (otherIncome.value.lainnya.total > 0) {
                    _push3(ssrRenderComponent(unref(CollapsibleSummaryRow), {
                      title: "Other Income - Other",
                      amount: otherIncome.value.lainnya.total,
                      entries: otherIncome.value.lainnya.entries
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    totalRevenuesMain.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                      key: 0,
                      title: "Main Revenue",
                      amount: totalRevenuesMain.value,
                      entries: revenuesMain.value
                    }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                    otherIncome.value.bunga_mandiri.total > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                      key: 1,
                      title: "Other Income - Mandiri Bank Interest",
                      amount: otherIncome.value.bunga_mandiri.total,
                      entries: otherIncome.value.bunga_mandiri.entries
                    }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                    otherIncome.value.bunga_bca.total > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                      key: 2,
                      title: "Other Income - BCA Bank Interest",
                      amount: otherIncome.value.bunga_bca.total,
                      entries: otherIncome.value.bunga_bca.entries
                    }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                    otherIncome.value.lainnya.total > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                      key: 3,
                      title: "Other Income - Other",
                      amount: otherIncome.value.lainnya.total,
                      entries: otherIncome.value.lainnya.entries
                    }, null, 8, ["amount", "entries"])) : createCommentVNode("", true)
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
                    _push3(ssrRenderComponent(unref(CollapsibleSummaryRow), {
                      title: "Salary Expense",
                      amount: totalExpensesSalary.value,
                      entries: expensesSalary.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (operationalGrouped.value.length) {
                    _push3(`<div class="space-y-2"${_scopeId2}><div class="text-xs font-semibold text-gray-600 uppercase tracking-wide"${_scopeId2}>Operational Expenses</div><div class="space-y-1"${_scopeId2}><!--[-->`);
                    ssrRenderList(operationalGrouped.value, (cat) => {
                      _push3(ssrRenderComponent(unref(CollapsibleSummaryRow), {
                        key: cat.category_name,
                        title: cat.category_name,
                        amount: cat.total,
                        entries: cat.entries
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (totalExpensesAdmin.value > 0) {
                    _push3(ssrRenderComponent(unref(CollapsibleSummaryRow), {
                      title: "Administrative Expenses",
                      amount: totalExpensesAdmin.value,
                      entries: expensesAdmin.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (totalExpensesConsumption.value > 0) {
                    _push3(ssrRenderComponent(unref(CollapsibleSummaryRow), {
                      title: "Consumption Expense",
                      amount: totalExpensesConsumption.value,
                      entries: expensesConsumption.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (totalExpensesOutside.value > 0) {
                    _push3(ssrRenderComponent(unref(CollapsibleSummaryRow), {
                      title: "Outside Assignments Expense",
                      amount: totalExpensesOutside.value,
                      entries: expensesOutside.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (totalExpensesPrepaid.value > 0) {
                    _push3(ssrRenderComponent(unref(CollapsibleSummaryRow), {
                      title: "Prepaid Rent Expense",
                      amount: totalExpensesPrepaid.value,
                      entries: expensesPrepaid.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (totalExpensesTax.value > 0) {
                    _push3(ssrRenderComponent(unref(CollapsibleSummaryRow), {
                      title: "Tax Expenses",
                      amount: totalExpensesTax.value,
                      entries: expensesTax.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (totalExpensesOther.value > 0) {
                    _push3(ssrRenderComponent(unref(CollapsibleSummaryRow), {
                      title: "Other Expenses",
                      amount: totalExpensesOther.value,
                      entries: expensesOther.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    totalExpensesSalary.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                      key: 0,
                      title: "Salary Expense",
                      amount: totalExpensesSalary.value,
                      entries: expensesSalary.value
                    }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                    operationalGrouped.value.length ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-2"
                    }, [
                      createVNode("div", { class: "text-xs font-semibold text-gray-600 uppercase tracking-wide" }, "Operational Expenses"),
                      createVNode("div", { class: "space-y-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(operationalGrouped.value, (cat) => {
                          return openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                            key: cat.category_name,
                            title: cat.category_name,
                            amount: cat.total,
                            entries: cat.entries
                          }, null, 8, ["title", "amount", "entries"]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true),
                    totalExpensesAdmin.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                      key: 2,
                      title: "Administrative Expenses",
                      amount: totalExpensesAdmin.value,
                      entries: expensesAdmin.value
                    }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                    totalExpensesConsumption.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                      key: 3,
                      title: "Consumption Expense",
                      amount: totalExpensesConsumption.value,
                      entries: expensesConsumption.value
                    }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                    totalExpensesOutside.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                      key: 4,
                      title: "Outside Assignments Expense",
                      amount: totalExpensesOutside.value,
                      entries: expensesOutside.value
                    }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                    totalExpensesPrepaid.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                      key: 5,
                      title: "Prepaid Rent Expense",
                      amount: totalExpensesPrepaid.value,
                      entries: expensesPrepaid.value
                    }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                    totalExpensesTax.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                      key: 6,
                      title: "Tax Expenses",
                      amount: totalExpensesTax.value,
                      entries: expensesTax.value
                    }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                    totalExpensesOther.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                      key: 7,
                      title: "Other Expenses",
                      amount: totalExpensesOther.value,
                      entries: expensesOther.value
                    }, null, 8, ["amount", "entries"])) : createCommentVNode("", true)
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
            if (showAdjustmentModal.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4"${_scopeId}><div class="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-xl max-h-[90vh] flex flex-col"${_scopeId}><div class="px-6 pt-6 text-lg font-semibold text-gray-900"${_scopeId}>Add Income Statement Adjustment</div><div class="px-6 py-4 grid grid-cols-1 gap-4 overflow-y-auto flex-1"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Account</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: adjustmentForm.value.account_id,
                "onUpdate:modelValue": ($event) => adjustmentForm.value.account_id = $event,
                options: accountOptions.value,
                "label-field": "label",
                "sub-label-field": "subLabel",
                "value-field": "value",
                "search-fields": ["label", "subLabel"],
                placeholder: "Select Account",
                "input-class": "w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:border-sage-500 focus:ring-sage-500"
              }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Amount</label><input${ssrRenderAttr("value", adjustmentForm.value.amount)} type="number" min="0" step="0.01" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Description</label><input${ssrRenderAttr("value", adjustmentForm.value.description)} type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Transaction Date</label><input${ssrRenderAttr("value", adjustmentForm.value.transaction_date)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Bank (Optional)</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: adjustmentForm.value.bank_account_id,
                "onUpdate:modelValue": ($event) => adjustmentForm.value.bank_account_id = $event,
                options: bankOptions.value,
                "label-field": "label",
                "sub-label-field": "subLabel",
                "value-field": "value",
                "search-fields": ["label", "subLabel"],
                placeholder: "Select Bank",
                "input-class": "w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:border-sage-500 focus:ring-sage-500"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (adjustmentForm.value.bank_account_id) {
                _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Bank Transaction Type</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(adjustmentForm.value.bank_transaction_type) ? ssrLooseContain(adjustmentForm.value.bank_transaction_type, "") : ssrLooseEqual(adjustmentForm.value.bank_transaction_type, "")) ? " selected" : ""}${_scopeId}>Select Type</option><option value="credit"${ssrIncludeBooleanAttr(Array.isArray(adjustmentForm.value.bank_transaction_type) ? ssrLooseContain(adjustmentForm.value.bank_transaction_type, "credit") : ssrLooseEqual(adjustmentForm.value.bank_transaction_type, "credit")) ? " selected" : ""}${_scopeId}>Credit (In)</option><option value="debit"${ssrIncludeBooleanAttr(Array.isArray(adjustmentForm.value.bank_transaction_type) ? ssrLooseContain(adjustmentForm.value.bank_transaction_type, "debit") : ssrLooseEqual(adjustmentForm.value.bank_transaction_type, "debit")) ? " selected" : ""}${_scopeId}>Debit (Out)</option></select></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Notes</label><textarea rows="2" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}>${ssrInterpolate(adjustmentForm.value.notes)}</textarea></div></div><div class="px-6 pb-6 pt-3 border-t border-gray-100 flex justify-end gap-2"${_scopeId}><button class="px-4 py-2 text-sm border rounded-md"${_scopeId}>Cancel</button><button class="px-4 py-2 text-sm bg-sage-600 text-white rounded-md"${_scopeId}>Save</button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(AlertDialog, {
              show: alertDialog.value.show,
              type: alertDialog.value.type,
              message: alertDialog.value.message,
              onClose: ($event) => alertDialog.value.show = false
            }, null, _parent2, _scopeId));
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
                        href: _ctx.route("admin-keuangan.profit-loss.index", __props.returnQuery),
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
                      __props.period.status !== "closed" ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: openAdjustmentModal,
                        class: "inline-flex items-center px-3 py-2 border border-sage-600 text-sm leading-4 font-medium rounded-md text-white bg-sage-700 hover:bg-sage-900"
                      }, [
                        createVNode(unref(PlusCircle), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Add Adjustment ")
                      ])) : createCommentVNode("", true),
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
                        key: 1,
                        onClick: regenerateEntries,
                        disabled: loading.value,
                        class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                      }, [
                        createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Sync Latest Data ")
                      ], 8, ["disabled"])) : createCommentVNode("", true),
                      __props.period.status !== "closed" ? (openBlock(), createBlock(unref(Link), {
                        key: 2,
                        href: _ctx.route("admin-keuangan.profit-loss.edit", {
                          profitLoss: __props.period.id,
                          ...__props.returnQuery
                        }),
                        class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Edit Period ")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true),
                      __props.period.status !== "closed" ? (openBlock(), createBlock("button", {
                        key: 3,
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
                        totalRevenuesMain.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                          key: 0,
                          title: "Main Revenue",
                          amount: totalRevenuesMain.value,
                          entries: revenuesMain.value
                        }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                        otherIncome.value.bunga_mandiri.total > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                          key: 1,
                          title: "Other Income - Mandiri Bank Interest",
                          amount: otherIncome.value.bunga_mandiri.total,
                          entries: otherIncome.value.bunga_mandiri.entries
                        }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                        otherIncome.value.bunga_bca.total > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                          key: 2,
                          title: "Other Income - BCA Bank Interest",
                          amount: otherIncome.value.bunga_bca.total,
                          entries: otherIncome.value.bunga_bca.entries
                        }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                        otherIncome.value.lainnya.total > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                          key: 3,
                          title: "Other Income - Other",
                          amount: otherIncome.value.lainnya.total,
                          entries: otherIncome.value.lainnya.entries
                        }, null, 8, ["amount", "entries"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["total"]),
                    createVNode(unref(SectionCard), {
                      title: "EXPENSES",
                      total: expensesTotal.value,
                      tone: "text-red-700"
                    }, {
                      default: withCtx(() => [
                        totalExpensesSalary.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                          key: 0,
                          title: "Salary Expense",
                          amount: totalExpensesSalary.value,
                          entries: expensesSalary.value
                        }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                        operationalGrouped.value.length ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-2"
                        }, [
                          createVNode("div", { class: "text-xs font-semibold text-gray-600 uppercase tracking-wide" }, "Operational Expenses"),
                          createVNode("div", { class: "space-y-1" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(operationalGrouped.value, (cat) => {
                              return openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                                key: cat.category_name,
                                title: cat.category_name,
                                amount: cat.total,
                                entries: cat.entries
                              }, null, 8, ["title", "amount", "entries"]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        totalExpensesAdmin.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                          key: 2,
                          title: "Administrative Expenses",
                          amount: totalExpensesAdmin.value,
                          entries: expensesAdmin.value
                        }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                        totalExpensesConsumption.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                          key: 3,
                          title: "Consumption Expense",
                          amount: totalExpensesConsumption.value,
                          entries: expensesConsumption.value
                        }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                        totalExpensesOutside.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                          key: 4,
                          title: "Outside Assignments Expense",
                          amount: totalExpensesOutside.value,
                          entries: expensesOutside.value
                        }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                        totalExpensesPrepaid.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                          key: 5,
                          title: "Prepaid Rent Expense",
                          amount: totalExpensesPrepaid.value,
                          entries: expensesPrepaid.value
                        }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                        totalExpensesTax.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                          key: 6,
                          title: "Tax Expenses",
                          amount: totalExpensesTax.value,
                          entries: expensesTax.value
                        }, null, 8, ["amount", "entries"])) : createCommentVNode("", true),
                        totalExpensesOther.value > 0 ? (openBlock(), createBlock(unref(CollapsibleSummaryRow), {
                          key: 7,
                          title: "Other Expenses",
                          amount: totalExpensesOther.value,
                          entries: expensesOther.value
                        }, null, 8, ["amount", "entries"])) : createCommentVNode("", true)
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
              ]),
              showAdjustmentModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4"
              }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-xl max-h-[90vh] flex flex-col" }, [
                  createVNode("div", { class: "px-6 pt-6 text-lg font-semibold text-gray-900" }, "Add Income Statement Adjustment"),
                  createVNode("div", { class: "px-6 py-4 grid grid-cols-1 gap-4 overflow-y-auto flex-1" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Account"),
                      createVNode(_sfc_main$1, {
                        modelValue: adjustmentForm.value.account_id,
                        "onUpdate:modelValue": ($event) => adjustmentForm.value.account_id = $event,
                        options: accountOptions.value,
                        "label-field": "label",
                        "sub-label-field": "subLabel",
                        "value-field": "value",
                        "search-fields": ["label", "subLabel"],
                        placeholder: "Select Account",
                        "input-class": "w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => adjustmentForm.value.amount = $event,
                        type: "number",
                        min: "0",
                        step: "0.01",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, adjustmentForm.value.amount]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => adjustmentForm.value.description = $event,
                        type: "text",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, adjustmentForm.value.description]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Transaction Date"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => adjustmentForm.value.transaction_date = $event,
                        type: "date",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, adjustmentForm.value.transaction_date]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bank (Optional)"),
                      createVNode(_sfc_main$1, {
                        modelValue: adjustmentForm.value.bank_account_id,
                        "onUpdate:modelValue": ($event) => adjustmentForm.value.bank_account_id = $event,
                        options: bankOptions.value,
                        "label-field": "label",
                        "sub-label-field": "subLabel",
                        "value-field": "value",
                        "search-fields": ["label", "subLabel"],
                        placeholder: "Select Bank",
                        "input-class": "w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                    ]),
                    adjustmentForm.value.bank_account_id ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bank Transaction Type"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => adjustmentForm.value.bank_transaction_type = $event,
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, [
                        createVNode("option", { value: "" }, "Select Type"),
                        createVNode("option", { value: "credit" }, "Credit (In)"),
                        createVNode("option", { value: "debit" }, "Debit (Out)")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, adjustmentForm.value.bank_transaction_type]
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Notes"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => adjustmentForm.value.notes = $event,
                        rows: "2",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, adjustmentForm.value.notes]
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "px-6 pb-6 pt-3 border-t border-gray-100 flex justify-end gap-2" }, [
                    createVNode("button", {
                      onClick: closeAdjustmentModal,
                      class: "px-4 py-2 text-sm border rounded-md"
                    }, "Cancel"),
                    createVNode("button", {
                      onClick: submitAdjustment,
                      class: "px-4 py-2 text-sm bg-sage-600 text-white rounded-md"
                    }, "Save")
                  ])
                ])
              ])) : createCommentVNode("", true),
              createVNode(AlertDialog, {
                show: alertDialog.value.show,
                type: alertDialog.value.type,
                message: alertDialog.value.message,
                onClose: ($event) => alertDialog.value.show = false
              }, null, 8, ["show", "type", "message", "onClose"])
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
