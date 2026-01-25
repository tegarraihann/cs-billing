import { reactive, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, withDirectives, vModelText, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { Plus } from "lucide-vue-next";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BXHi-kqO.js";
import { P as Pagination } from "./Pagination-JgWO_U2H.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    entries: Object,
    filters: Object,
    typeOptions: Array,
    summary: Array,
    openingReceivables: {
      type: Array,
      default: () => []
    },
    openingPayables: {
      type: Array,
      default: () => []
    },
    openingSummary: {
      type: Object,
      default: null
    }
  },
  setup(__props) {
    var _a, _b, _c, _d, _e;
    const props = __props;
    const filterForm = reactive({
      start_date: ((_a = props.filters) == null ? void 0 : _a.start_date) || "",
      end_date: ((_b = props.filters) == null ? void 0 : _b.end_date) || "",
      type: ((_c = props.filters) == null ? void 0 : _c.type) || "",
      status: ((_d = props.filters) == null ? void 0 : _d.status) || "",
      opening: ((_e = props.filters) == null ? void 0 : _e.opening) ?? ""
    });
    const applyFilters = () => {
      router.get(route("admin-keuangan.equity.index"), { ...filterForm }, { preserveState: true });
    };
    const resetFilters = () => {
      filterForm.start_date = "";
      filterForm.end_date = "";
      filterForm.type = "";
      filterForm.status = "";
      filterForm.opening = "";
      applyFilters();
    };
    const formatDate = (value) => {
      if (!value) return "-";
      return new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    };
    const formatCurrency = (value) => {
      const amount = Number(value || 0);
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
    };
    const resolveTypeLabel = (type) => {
      var _a2;
      const match = (_a2 = props.typeOptions) == null ? void 0 : _a2.find((option) => option.value === type);
      return (match == null ? void 0 : match.label) || type;
    };
    const openingTypeLabel = (type) => {
      if (type === "reimbursement") {
        return "Reimbursement";
      }
      return "Main Invoice";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Equity" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Equity</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Track equity movements and owner-related balances</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.equity.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Add Entry `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Add Entry ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.summary && __props.summary.length) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"${_scopeId}><!--[-->`);
              ssrRenderList(__props.summary, (row) => {
                _push2(`<div class="bg-white shadow-sm rounded-lg p-4 border border-gray-100"${_scopeId}><div class="text-xs text-gray-500 uppercase tracking-wide"${_scopeId}>${ssrInterpolate(resolveTypeLabel(row.entry_type))}</div><div class="mt-2 text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(row.total_amount))}</div><div class="text-xs text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(row.entries_count)} entries</div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.openingSummary) {
              _push2(`<div class="bg-white shadow rounded-lg mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4"${_scopeId}><div${_scopeId}><h2 class="text-lg font-semibold text-gray-900"${_scopeId}>Opening Balance Notes</h2><p class="text-sm text-gray-500"${_scopeId}>Latest opening receivables and payables recorded in the system.</p></div><div class="text-sm text-gray-600"${_scopeId}> Receivables: ${ssrInterpolate(__props.openingSummary.receivables_count)} - ${ssrInterpolate(formatCurrency(__props.openingSummary.receivables_total))} | Payables: ${ssrInterpolate(__props.openingSummary.payables_count)} - ${ssrInterpolate(formatCurrency(__props.openingSummary.payables_total))}</div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><h3 class="text-sm font-semibold text-gray-900 mb-2"${_scopeId}>Opening Receivables</h3>`);
              if (__props.openingReceivables.length) {
                _push2(`<div class="overflow-x-auto border border-gray-200 rounded-lg"${_scopeId}><table class="min-w-full divide-y divide-gray-200 text-sm"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Customer</th><th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Type</th><th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Invoice</th><th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Source SO</th><th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Invoice Date</th><th class="px-4 py-2 text-right font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Outstanding</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
                ssrRenderList(__props.openingReceivables, (row) => {
                  var _a2;
                  _push2(`<tr${_scopeId}><td class="px-4 py-2 text-gray-900"${_scopeId}>${ssrInterpolate(((_a2 = row.customer) == null ? void 0 : _a2.company_name) || row.customer_name || "-")}</td><td class="px-4 py-2 text-gray-700"${_scopeId}>${ssrInterpolate(openingTypeLabel(row.opening_type))}</td><td class="px-4 py-2 text-gray-700"${_scopeId}>${ssrInterpolate(row.invoice_number)}</td><td class="px-4 py-2 text-gray-700"${_scopeId}>${ssrInterpolate(row.source_so_number || "-")}</td><td class="px-4 py-2 text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(row.invoice_date))}</td><td class="px-4 py-2 text-right text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(row.outstanding_amount))}</td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div>`);
              } else {
                _push2(`<div class="text-sm text-gray-500"${_scopeId}>No opening receivables recorded.</div>`);
              }
              _push2(`</div><div${_scopeId}><h3 class="text-sm font-semibold text-gray-900 mb-2"${_scopeId}>Opening Payables</h3>`);
              if (__props.openingPayables.length) {
                _push2(`<div class="overflow-x-auto border border-gray-200 rounded-lg"${_scopeId}><table class="min-w-full divide-y divide-gray-200 text-sm"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Vendor</th><th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Type</th><th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Invoice</th><th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Source SO</th><th class="px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Invoice Date</th><th class="px-4 py-2 text-right font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Outstanding</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
                ssrRenderList(__props.openingPayables, (row) => {
                  var _a2;
                  _push2(`<tr${_scopeId}><td class="px-4 py-2 text-gray-900"${_scopeId}>${ssrInterpolate(((_a2 = row.vendor) == null ? void 0 : _a2.nama_vendor) || row.vendor_name || "-")}</td><td class="px-4 py-2 text-gray-700"${_scopeId}>${ssrInterpolate(openingTypeLabel(row.opening_type))}</td><td class="px-4 py-2 text-gray-700"${_scopeId}>${ssrInterpolate(row.vendor_invoice_number || "-")}</td><td class="px-4 py-2 text-gray-700"${_scopeId}>${ssrInterpolate(row.source_so_number || "-")}</td><td class="px-4 py-2 text-gray-700"${_scopeId}>${ssrInterpolate(formatDate(row.vendor_invoice_date))}</td><td class="px-4 py-2 text-right text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(row.outstanding_amount))}</td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div>`);
              } else {
                _push2(`<div class="text-sm text-gray-500"${_scopeId}>No opening payables recorded.</div>`);
              }
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white shadow rounded-lg mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-5 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Start Date</label><input${ssrRenderAttr("value", filterForm.start_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>End Date</label><input${ssrRenderAttr("value", filterForm.end_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Type</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterForm.type) ? ssrLooseContain(filterForm.type, "") : ssrLooseEqual(filterForm.type, "")) ? " selected" : ""}${_scopeId}>All Types</option><!--[-->`);
            ssrRenderList(__props.typeOptions, (option) => {
              _push2(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(filterForm.type) ? ssrLooseContain(filterForm.type, option.value) : ssrLooseEqual(filterForm.type, option.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(option.label)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterForm.status) ? ssrLooseContain(filterForm.status, "") : ssrLooseEqual(filterForm.status, "")) ? " selected" : ""}${_scopeId}>All</option><option value="recorded"${ssrIncludeBooleanAttr(Array.isArray(filterForm.status) ? ssrLooseContain(filterForm.status, "recorded") : ssrLooseEqual(filterForm.status, "recorded")) ? " selected" : ""}${_scopeId}>Recorded</option><option value="settled"${ssrIncludeBooleanAttr(Array.isArray(filterForm.status) ? ssrLooseContain(filterForm.status, "settled") : ssrLooseEqual(filterForm.status, "settled")) ? " selected" : ""}${_scopeId}>Settled</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Opening</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterForm.opening) ? ssrLooseContain(filterForm.opening, "") : ssrLooseEqual(filterForm.opening, "")) ? " selected" : ""}${_scopeId}>All</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(filterForm.opening) ? ssrLooseContain(filterForm.opening, "1") : ssrLooseEqual(filterForm.opening, "1")) ? " selected" : ""}${_scopeId}>Opening Only</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(filterForm.opening) ? ssrLooseContain(filterForm.opening, "0") : ssrLooseEqual(filterForm.opening, "0")) ? " selected" : ""}${_scopeId}>Non-opening</option></select></div></div><div class="mt-4 flex items-center space-x-2"${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"${_scopeId}> Apply Filters </button><button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"${_scopeId}> Reset </button></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md"${_scopeId}>`);
            if (__props.entries.data.length) {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Type</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Amount</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Opening</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Bank Impact</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Status</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(__props.entries.data, (entry) => {
                var _a2;
                _push2(`<tr${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(entry.entry_date))}</td><td class="px-6 py-4 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(resolveTypeLabel(entry.entry_type))} `);
                if (entry.employee_name) {
                  _push2(`<div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(entry.employee_name)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (entry.reference) {
                  _push2(`<div class="text-xs text-gray-500"${_scopeId}>Ref: ${ssrInterpolate(entry.reference)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td><td class="${ssrRenderClass([entry.direction === "decrease" ? "text-red-600" : "text-green-600", "px-6 py-4 text-sm font-semibold"])}"${_scopeId}>${ssrInterpolate(entry.direction === "decrease" ? "-" : "+")}${ssrInterpolate(formatCurrency(entry.amount))}</td><td class="px-6 py-4 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(entry.is_opening ? "Yes" : "No")}</td><td class="px-6 py-4 text-sm text-gray-900"${_scopeId}>`);
                if (entry.affects_bank) {
                  _push2(`<span${_scopeId}>${ssrInterpolate(((_a2 = entry.bank_account) == null ? void 0 : _a2.bank_name) || "Bank")}</span>`);
                } else {
                  _push2(`<span${_scopeId}>-</span>`);
                }
                _push2(`</td><td class="px-6 py-4 text-sm text-gray-900"${_scopeId}><span class="${ssrRenderClass([entry.status === "settled" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800", "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(entry.status === "settled" ? "Settled" : "Recorded")}</span></td><td class="px-6 py-4 text-right text-sm font-medium"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("admin-keuangan.equity.show", entry.id),
                  class: "text-sage-600 hover:text-sage-900"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` View `);
                    } else {
                      return [
                        createTextVNode(" View ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            } else {
              _push2(`<div class="px-6 py-8 text-center text-sm text-gray-500"${_scopeId}> No equity entries found. </div>`);
            }
            _push2(`</div>`);
            if (__props.entries) {
              _push2(`<div class="mt-6"${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.entries }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Equity" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Equity"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Track equity movements and owner-related balances")
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.equity.create"),
                      class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Add Entry ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  __props.summary && __props.summary.length ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.summary, (row) => {
                      return openBlock(), createBlock("div", {
                        key: row.entry_type,
                        class: "bg-white shadow-sm rounded-lg p-4 border border-gray-100"
                      }, [
                        createVNode("div", { class: "text-xs text-gray-500 uppercase tracking-wide" }, toDisplayString(resolveTypeLabel(row.entry_type)), 1),
                        createVNode("div", { class: "mt-2 text-lg font-semibold text-gray-900" }, toDisplayString(formatCurrency(row.total_amount)), 1),
                        createVNode("div", { class: "text-xs text-gray-500 mt-1" }, toDisplayString(row.entries_count) + " entries", 1)
                      ]);
                    }), 128))
                  ])) : createCommentVNode("", true),
                  __props.openingSummary ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "bg-white shadow rounded-lg mb-6"
                  }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, "Opening Balance Notes"),
                          createVNode("p", { class: "text-sm text-gray-500" }, "Latest opening receivables and payables recorded in the system.")
                        ]),
                        createVNode("div", { class: "text-sm text-gray-600" }, " Receivables: " + toDisplayString(__props.openingSummary.receivables_count) + " - " + toDisplayString(formatCurrency(__props.openingSummary.receivables_total)) + " | Payables: " + toDisplayString(__props.openingSummary.payables_count) + " - " + toDisplayString(formatCurrency(__props.openingSummary.payables_total)), 1)
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-sm font-semibold text-gray-900 mb-2" }, "Opening Receivables"),
                          __props.openingReceivables.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "overflow-x-auto border border-gray-200 rounded-lg"
                          }, [
                            createVNode("table", { class: "min-w-full divide-y divide-gray-200 text-sm" }, [
                              createVNode("thead", { class: "bg-gray-50" }, [
                                createVNode("tr", null, [
                                  createVNode("th", { class: "px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider" }, "Customer"),
                                  createVNode("th", { class: "px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider" }, "Type"),
                                  createVNode("th", { class: "px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider" }, "Invoice"),
                                  createVNode("th", { class: "px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider" }, "Source SO"),
                                  createVNode("th", { class: "px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider" }, "Invoice Date"),
                                  createVNode("th", { class: "px-4 py-2 text-right font-medium text-gray-500 uppercase tracking-wider" }, "Outstanding")
                                ])
                              ]),
                              createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.openingReceivables, (row) => {
                                  var _a2;
                                  return openBlock(), createBlock("tr", {
                                    key: row.id
                                  }, [
                                    createVNode("td", { class: "px-4 py-2 text-gray-900" }, toDisplayString(((_a2 = row.customer) == null ? void 0 : _a2.company_name) || row.customer_name || "-"), 1),
                                    createVNode("td", { class: "px-4 py-2 text-gray-700" }, toDisplayString(openingTypeLabel(row.opening_type)), 1),
                                    createVNode("td", { class: "px-4 py-2 text-gray-700" }, toDisplayString(row.invoice_number), 1),
                                    createVNode("td", { class: "px-4 py-2 text-gray-700" }, toDisplayString(row.source_so_number || "-"), 1),
                                    createVNode("td", { class: "px-4 py-2 text-gray-700" }, toDisplayString(formatDate(row.invoice_date)), 1),
                                    createVNode("td", { class: "px-4 py-2 text-right text-gray-900" }, toDisplayString(formatCurrency(row.outstanding_amount)), 1)
                                  ]);
                                }), 128))
                              ])
                            ])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-sm text-gray-500"
                          }, "No opening receivables recorded."))
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-sm font-semibold text-gray-900 mb-2" }, "Opening Payables"),
                          __props.openingPayables.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "overflow-x-auto border border-gray-200 rounded-lg"
                          }, [
                            createVNode("table", { class: "min-w-full divide-y divide-gray-200 text-sm" }, [
                              createVNode("thead", { class: "bg-gray-50" }, [
                                createVNode("tr", null, [
                                  createVNode("th", { class: "px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider" }, "Vendor"),
                                  createVNode("th", { class: "px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider" }, "Type"),
                                  createVNode("th", { class: "px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider" }, "Invoice"),
                                  createVNode("th", { class: "px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider" }, "Source SO"),
                                  createVNode("th", { class: "px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider" }, "Invoice Date"),
                                  createVNode("th", { class: "px-4 py-2 text-right font-medium text-gray-500 uppercase tracking-wider" }, "Outstanding")
                                ])
                              ]),
                              createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.openingPayables, (row) => {
                                  var _a2;
                                  return openBlock(), createBlock("tr", {
                                    key: row.id
                                  }, [
                                    createVNode("td", { class: "px-4 py-2 text-gray-900" }, toDisplayString(((_a2 = row.vendor) == null ? void 0 : _a2.nama_vendor) || row.vendor_name || "-"), 1),
                                    createVNode("td", { class: "px-4 py-2 text-gray-700" }, toDisplayString(openingTypeLabel(row.opening_type)), 1),
                                    createVNode("td", { class: "px-4 py-2 text-gray-700" }, toDisplayString(row.vendor_invoice_number || "-"), 1),
                                    createVNode("td", { class: "px-4 py-2 text-gray-700" }, toDisplayString(row.source_so_number || "-"), 1),
                                    createVNode("td", { class: "px-4 py-2 text-gray-700" }, toDisplayString(formatDate(row.vendor_invoice_date)), 1),
                                    createVNode("td", { class: "px-4 py-2 text-right text-gray-900" }, toDisplayString(formatCurrency(row.outstanding_amount)), 1)
                                  ]);
                                }), 128))
                              ])
                            ])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-sm text-gray-500"
                          }, "No opening payables recorded."))
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-5 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Start Date"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => filterForm.start_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, filterForm.start_date]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "End Date"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => filterForm.end_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, filterForm.end_date]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Type"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => filterForm.type = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "All Types"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.typeOptions, (option) => {
                              return openBlock(), createBlock("option", {
                                key: option.value,
                                value: option.value
                              }, toDisplayString(option.label), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, filterForm.type]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Status"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => filterForm.status = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "All"),
                            createVNode("option", { value: "recorded" }, "Recorded"),
                            createVNode("option", { value: "settled" }, "Settled")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, filterForm.status]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Opening"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => filterForm.opening = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "All"),
                            createVNode("option", { value: "1" }, "Opening Only"),
                            createVNode("option", { value: "0" }, "Non-opening")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, filterForm.opening]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-4 flex items-center space-x-2" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: applyFilters,
                          class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                        }, " Apply Filters "),
                        createVNode("button", {
                          type: "button",
                          onClick: resetFilters,
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
                        }, " Reset ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    __props.entries.data.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "overflow-x-auto"
                    }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Date"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Type"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Amount"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Opening"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Bank Impact"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.entries.data, (entry) => {
                            var _a2;
                            return openBlock(), createBlock("tr", {
                              key: entry.id
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatDate(entry.entry_date)), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                                createTextVNode(toDisplayString(resolveTypeLabel(entry.entry_type)) + " ", 1),
                                entry.employee_name ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-xs text-gray-500"
                                }, toDisplayString(entry.employee_name), 1)) : createCommentVNode("", true),
                                entry.reference ? (openBlock(), createBlock("div", {
                                  key: 1,
                                  class: "text-xs text-gray-500"
                                }, "Ref: " + toDisplayString(entry.reference), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("td", {
                                class: ["px-6 py-4 text-sm font-semibold", entry.direction === "decrease" ? "text-red-600" : "text-green-600"]
                              }, toDisplayString(entry.direction === "decrease" ? "-" : "+") + toDisplayString(formatCurrency(entry.amount)), 3),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(entry.is_opening ? "Yes" : "No"), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                                entry.affects_bank ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(((_a2 = entry.bank_account) == null ? void 0 : _a2.bank_name) || "Bank"), 1)) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                              ]),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                                createVNode("span", {
                                  class: [entry.status === "settled" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800", "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                }, toDisplayString(entry.status === "settled" ? "Settled" : "Recorded"), 3)
                              ]),
                              createVNode("td", { class: "px-6 py-4 text-right text-sm font-medium" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin-keuangan.equity.show", entry.id),
                                  class: "text-sage-600 hover:text-sage-900"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" View ")
                                  ]),
                                  _: 2
                                }, 1032, ["href"])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "px-6 py-8 text-center text-sm text-gray-500"
                    }, " No equity entries found. "))
                  ]),
                  __props.entries ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "mt-6"
                  }, [
                    createVNode(Pagination, { data: __props.entries }, null, 8, ["data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Equity/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
