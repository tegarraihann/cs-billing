import { ref, computed, reactive, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, withModifiers, withDirectives, vModelSelect, vModelText, openBlock, Fragment, renderList, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { P as Pagination } from "./Pagination-JgWO_U2H.js";
import { useForm, Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./SearchableSelect-DfkOp0gQ.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    transactions: Object,
    summary: {
      type: Object,
      default: () => ({})
    },
    bankAccounts: {
      type: Array,
      default: () => []
    },
    pettyCashCategories: {
      type: Array,
      default: () => []
    },
    expenseAccounts: {
      type: Array,
      default: () => []
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const showTopupModal = ref(false);
    const showAmortizationModal = ref(false);
    const bankAccounts = computed(() => props.bankAccounts ?? []);
    const pettyCashCategories = computed(() => props.pettyCashCategories ?? []);
    const expenseAccounts = computed(() => props.expenseAccounts ?? []);
    const expenseAccountOptions = computed(
      () => expenseAccounts.value.map((account) => ({
        label: `${account.account_code} - ${account.account_name}`,
        value: account.id,
        code: account.account_code,
        name: account.account_name
      }))
    );
    const topupPlAccountInputClass = computed(() => {
      var _a2;
      const base = "w-full px-3 py-2 pr-10 border rounded-md shadow-sm focus:border-sage-500 focus:ring-sage-500";
      const error = ((_a2 = topupForm.errors) == null ? void 0 : _a2.pl_account_id) ? " border-red-300" : " border-gray-300";
      return `${base}${error}`;
    });
    const filterForm = reactive({
      transaction_type: ((_a = props.filters) == null ? void 0 : _a.transaction_type) ?? "",
      date_from: ((_b = props.filters) == null ? void 0 : _b.date_from) ?? "",
      date_to: ((_c = props.filters) == null ? void 0 : _c.date_to) ?? ""
    });
    const topupForm = useForm({
      transaction_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      amount: "",
      description: "",
      reference_number: "",
      source_type: "bank",
      bank_account_id: "",
      petty_cash_category_id: "",
      pl_account_id: "",
      rental_start_date: "",
      rental_end_date: "",
      amortization_months: "",
      notes: ""
    });
    const amortizationForm = useForm({
      transaction_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      amount: "",
      description: "",
      pl_account_id: "",
      notes: ""
    });
    watch(
      () => topupForm.source_type,
      (value) => {
        if (value !== "bank") {
          topupForm.bank_account_id = "";
        }
        if (value !== "petty_cash") {
          topupForm.petty_cash_category_id = "";
        }
      }
    );
    const openTopupModal = () => {
      topupForm.reset();
      topupForm.transaction_date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      topupForm.source_type = "bank";
      showTopupModal.value = true;
    };
    const closeTopupModal = () => {
      showTopupModal.value = false;
    };
    const openAmortizationModal = () => {
      amortizationForm.reset();
      amortizationForm.transaction_date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      showAmortizationModal.value = true;
    };
    const closeAmortizationModal = () => {
      showAmortizationModal.value = false;
    };
    const applyFilters = () => {
      router.get(route("admin-keuangan.prepaid-rent.index"), filterForm, {
        preserveState: true,
        replace: true
      });
    };
    const resetFilters = () => {
      filterForm.transaction_type = "";
      filterForm.date_from = "";
      filterForm.date_to = "";
      applyFilters();
    };
    const submitTopup = () => {
      topupForm.post(route("admin-keuangan.prepaid-rent.topup"), {
        onSuccess: () => {
          closeTopupModal();
          topupForm.reset();
          applyFilters();
        }
      });
    };
    const submitAmortization = () => {
      amortizationForm.post(route("admin-keuangan.prepaid-rent.amortization"), {
        onSuccess: () => {
          closeAmortizationModal();
          amortizationForm.reset();
          applyFilters();
        }
      });
    };
    const isTopupDisabled = computed(() => {
      if (topupForm.processing) return true;
      if (!topupForm.transaction_date || !topupForm.amount) return true;
      if (topupForm.source_type !== "opening_balance" && !topupForm.pl_account_id) return true;
      if (topupForm.source_type === "bank" && !topupForm.bank_account_id) return true;
      if (topupForm.source_type === "petty_cash" && !topupForm.petty_cash_category_id) return true;
      return false;
    });
    const isAmortizationDisabled = computed(() => {
      if (amortizationForm.processing) return true;
      if (!amortizationForm.transaction_date || !amortizationForm.amount) return true;
      if (!amortizationForm.pl_account_id) return true;
      return false;
    });
    const formatNumber = (value) => {
      return new Intl.NumberFormat("id-ID").format(Number(value) || 0);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Prepaid Rent" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Prepaid Rent Ledger</h1><p class="text-sm text-gray-500"${_scopeId}>Track prepaid rent payments and amortization for building leases.</p></div><div class="flex space-x-3"${_scopeId}><button class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}> Add Payment </button><button class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}> Record Amortization </button></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div class="bg-white shadow rounded-lg p-4"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Total Top-up</p><p class="text-2xl font-semibold text-gray-900 mt-1"${_scopeId}>Rp ${ssrInterpolate(formatNumber(__props.summary.total_topup || 0))}</p></div><div class="bg-white shadow rounded-lg p-4"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Total Amortization</p><p class="text-2xl font-semibold text-gray-900 mt-1"${_scopeId}>Rp ${ssrInterpolate(formatNumber(__props.summary.total_amortization || 0))}</p></div><div class="bg-white shadow rounded-lg p-4"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Prepaid Rent Balance</p><p class="text-2xl font-semibold text-green-600 mt-1"${_scopeId}>Rp ${ssrInterpolate(formatNumber(__props.summary.balance || 0))}</p></div></div><div class="bg-white shadow rounded-lg"${_scopeId}><form class="px-4 py-5 sm:px-6 border-b border-gray-200"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-4 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Transaction Type</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterForm.transaction_type) ? ssrLooseContain(filterForm.transaction_type, "") : ssrLooseEqual(filterForm.transaction_type, "")) ? " selected" : ""}${_scopeId}>All</option><option value="topup"${ssrIncludeBooleanAttr(Array.isArray(filterForm.transaction_type) ? ssrLooseContain(filterForm.transaction_type, "topup") : ssrLooseEqual(filterForm.transaction_type, "topup")) ? " selected" : ""}${_scopeId}>Top-up / Payment</option><option value="amortization"${ssrIncludeBooleanAttr(Array.isArray(filterForm.transaction_type) ? ssrLooseContain(filterForm.transaction_type, "amortization") : ssrLooseEqual(filterForm.transaction_type, "amortization")) ? " selected" : ""}${_scopeId}>Amortization</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>From Date</label><input type="date"${ssrRenderAttr("value", filterForm.date_from)} class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>To Date</label><input type="date"${ssrRenderAttr("value", filterForm.date_to)} class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div class="flex items-end space-x-2"${_scopeId}><button type="submit" class="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}> Apply </button><button type="button" class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"${_scopeId}> Reset </button></div></div></form><div class="px-4 py-5 sm:px-6"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Date</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Type</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Description</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Amount</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Source</th><th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>User</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.transactions.data, (transaction) => {
              var _a2;
              _push2(`<tr${_scopeId}><td class="px-3 py-3 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(transaction.transaction_date))}</td><td class="px-3 py-3"${_scopeId}><span class="${ssrRenderClass([transaction.transaction_type === "topup" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(transaction.transaction_type === "topup" ? "Top-up" : "Amortization")}</span></td><td class="px-3 py-3 text-sm text-gray-900"${_scopeId}><div class="font-medium"${_scopeId}>${ssrInterpolate(transaction.description || "-")}</div>`);
              if (transaction.notes) {
                _push2(`<div class="text-xs text-gray-500 mt-1 line-clamp-2"${_scopeId}>${ssrInterpolate(transaction.notes)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-3 py-3 text-sm font-semibold text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(transaction.amount))}</td><td class="px-3 py-3 text-sm text-gray-900"${_scopeId}><div class="capitalize"${_scopeId}>${ssrInterpolate(transaction.source_type || "-")}</div>`);
              if (transaction.bank_account) {
                _push2(`<div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(transaction.bank_account.bank_name)} - ${ssrInterpolate(transaction.bank_account.account_number)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-3 py-3 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_a2 = transaction.creator) == null ? void 0 : _a2.name) || "System/Auto")}</td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.transactions.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-3 py-6 text-center text-sm text-gray-500"${_scopeId}>No transactions yet.</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div><div class="mt-4"${_scopeId}>`);
            _push2(ssrRenderComponent(Pagination, { data: __props.transactions }, null, _parent2, _scopeId));
            _push2(`</div></div></div></div></div>`);
            if (showTopupModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center"${_scopeId}><div class="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto mx-4"${_scopeId}><div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}>Add Rent Payment</h3><button class="text-gray-400 hover:text-gray-600"${_scopeId}>×</button></div><form class="px-6 py-4 space-y-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Date *</label><input${ssrRenderAttr("value", unref(topupForm).transaction_date)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}>`);
              if (unref(topupForm).errors.transaction_date) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(topupForm).errors.transaction_date)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Amount *</label><input${ssrRenderAttr("value", unref(topupForm).amount)} type="number" min="0" step="0.01" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="0"${_scopeId}>`);
              if (unref(topupForm).errors.amount) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(topupForm).errors.amount)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Description</label><input${ssrRenderAttr("value", unref(topupForm).description)} type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Example: Office rent Q1"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}> Expense Account (P&amp;L) <span class="text-red-500"${_scopeId}>*</span></label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: unref(topupForm).pl_account_id,
                "onUpdate:modelValue": ($event) => unref(topupForm).pl_account_id = $event,
                options: expenseAccountOptions.value,
                placeholder: "Search accounts...",
                "label-field": "label",
                "value-field": "value",
                "search-fields": ["label", "code", "name"],
                "input-class": topupPlAccountInputClass.value
              }, null, _parent2, _scopeId));
              if (unref(topupForm).errors.pl_account_id) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(topupForm).errors.pl_account_id)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Funding Source *</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value="bank"${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).source_type) ? ssrLooseContain(unref(topupForm).source_type, "bank") : ssrLooseEqual(unref(topupForm).source_type, "bank")) ? " selected" : ""}${_scopeId}>Bank Transfer</option><option value="petty_cash"${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).source_type) ? ssrLooseContain(unref(topupForm).source_type, "petty_cash") : ssrLooseEqual(unref(topupForm).source_type, "petty_cash")) ? " selected" : ""}${_scopeId}>Petty Cash</option><option value="other"${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).source_type) ? ssrLooseContain(unref(topupForm).source_type, "other") : ssrLooseEqual(unref(topupForm).source_type, "other")) ? " selected" : ""}${_scopeId}>Other</option><option value="opening_balance"${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).source_type) ? ssrLooseContain(unref(topupForm).source_type, "opening_balance") : ssrLooseEqual(unref(topupForm).source_type, "opening_balance")) ? " selected" : ""}${_scopeId}>Opening Balance</option></select>`);
              if (unref(topupForm).errors.source_type) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(topupForm).errors.source_type)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(topupForm).source_type === "bank") {
                _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Bank Account *</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).bank_account_id) ? ssrLooseContain(unref(topupForm).bank_account_id, "") : ssrLooseEqual(unref(topupForm).bank_account_id, "")) ? " selected" : ""}${_scopeId}>Select account</option><!--[-->`);
                ssrRenderList(bankAccounts.value, (bank) => {
                  _push2(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).bank_account_id) ? ssrLooseContain(unref(topupForm).bank_account_id, bank.id) : ssrLooseEqual(unref(topupForm).bank_account_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} - ${ssrInterpolate(bank.account_number)}</option>`);
                });
                _push2(`<!--]--></select>`);
                if (unref(topupForm).errors.bank_account_id) {
                  _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(topupForm).errors.bank_account_id)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(topupForm).source_type === "petty_cash") {
                _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Petty Cash Category *</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).petty_cash_category_id) ? ssrLooseContain(unref(topupForm).petty_cash_category_id, "") : ssrLooseEqual(unref(topupForm).petty_cash_category_id, "")) ? " selected" : ""}${_scopeId}>Select category</option><!--[-->`);
                ssrRenderList(pettyCashCategories.value, (category) => {
                  _push2(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).petty_cash_category_id) ? ssrLooseContain(unref(topupForm).petty_cash_category_id, category.id) : ssrLooseEqual(unref(topupForm).petty_cash_category_id, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
                });
                _push2(`<!--]--></select>`);
                if (unref(topupForm).errors.petty_cash_category_id) {
                  _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(topupForm).errors.petty_cash_category_id)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Rental Start</label><input${ssrRenderAttr("value", unref(topupForm).rental_start_date)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Rental End</label><input${ssrRenderAttr("value", unref(topupForm).rental_end_date)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}>`);
              if (unref(topupForm).errors.rental_end_date) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(topupForm).errors.rental_end_date)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Amortization Months</label><input${ssrRenderAttr("value", unref(topupForm).amortization_months)} type="number" min="1" max="60" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Example: 12"${_scopeId}>`);
              if (unref(topupForm).errors.amortization_months) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(topupForm).errors.amortization_months)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Notes</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}>${ssrInterpolate(unref(topupForm).notes)}</textarea></div><div class="flex justify-end space-x-3 pt-2"${_scopeId}><button type="button" class="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700"${_scopeId}>Cancel</button><button type="submit"${ssrIncludeBooleanAttr(isTopupDisabled.value) ? " disabled" : ""} class="px-4 py-2 rounded-md bg-sage-600 text-white text-sm font-semibold hover:bg-sage-700 disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(topupForm).processing ? "Saving..." : "Save")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showAmortizationModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center"${_scopeId}><div class="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto mx-4"${_scopeId}><div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}>Record Amortization</h3><button class="text-gray-400 hover:text-gray-600"${_scopeId}>×</button></div><form class="px-6 py-4 space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Date *</label><input${ssrRenderAttr("value", unref(amortizationForm).transaction_date)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}>`);
              if (unref(amortizationForm).errors.transaction_date) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(amortizationForm).errors.transaction_date)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Amount *</label><input${ssrRenderAttr("value", unref(amortizationForm).amount)} type="number" min="0" step="0.01" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="0"${_scopeId}>`);
              if (unref(amortizationForm).errors.amount) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(amortizationForm).errors.amount)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Description</label><input${ssrRenderAttr("value", unref(amortizationForm).description)} type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" placeholder="Example: January amortization"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Expense Account (P&amp;L) *</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(amortizationForm).pl_account_id) ? ssrLooseContain(unref(amortizationForm).pl_account_id, "") : ssrLooseEqual(unref(amortizationForm).pl_account_id, "")) ? " selected" : ""}${_scopeId}>Select account</option><!--[-->`);
              ssrRenderList(expenseAccounts.value, (account) => {
                _push2(`<option${ssrRenderAttr("value", account.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(amortizationForm).pl_account_id) ? ssrLooseContain(unref(amortizationForm).pl_account_id, account.id) : ssrLooseEqual(unref(amortizationForm).pl_account_id, account.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(account.account_code)} - ${ssrInterpolate(account.account_name)}</option>`);
              });
              _push2(`<!--]--></select>`);
              if (unref(amortizationForm).errors.pl_account_id) {
                _push2(`<p class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(amortizationForm).errors.pl_account_id)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Notes</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}>${ssrInterpolate(unref(amortizationForm).notes)}</textarea></div><div class="flex justify-end space-x-3 pt-2"${_scopeId}><button type="button" class="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700"${_scopeId}>Cancel</button><button type="submit"${ssrIncludeBooleanAttr(isAmortizationDisabled.value) ? " disabled" : ""} class="px-4 py-2 rounded-md bg-sage-600 text-white text-sm font-semibold hover:bg-sage-700 disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(amortizationForm).processing ? "Saving..." : "Save")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Prepaid Rent" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Prepaid Rent Ledger"),
                      createVNode("p", { class: "text-sm text-gray-500" }, "Track prepaid rent payments and amortization for building leases.")
                    ]),
                    createVNode("div", { class: "flex space-x-3" }, [
                      createVNode("button", {
                        onClick: openTopupModal,
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                      }, " Add Payment "),
                      createVNode("button", {
                        onClick: openAmortizationModal,
                        class: "inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                      }, " Record Amortization ")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                    createVNode("div", { class: "bg-white shadow rounded-lg p-4" }, [
                      createVNode("p", { class: "text-sm text-gray-500" }, "Total Top-up"),
                      createVNode("p", { class: "text-2xl font-semibold text-gray-900 mt-1" }, "Rp " + toDisplayString(formatNumber(__props.summary.total_topup || 0)), 1)
                    ]),
                    createVNode("div", { class: "bg-white shadow rounded-lg p-4" }, [
                      createVNode("p", { class: "text-sm text-gray-500" }, "Total Amortization"),
                      createVNode("p", { class: "text-2xl font-semibold text-gray-900 mt-1" }, "Rp " + toDisplayString(formatNumber(__props.summary.total_amortization || 0)), 1)
                    ]),
                    createVNode("div", { class: "bg-white shadow rounded-lg p-4" }, [
                      createVNode("p", { class: "text-sm text-gray-500" }, "Prepaid Rent Balance"),
                      createVNode("p", { class: "text-2xl font-semibold text-green-600 mt-1" }, "Rp " + toDisplayString(formatNumber(__props.summary.balance || 0)), 1)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(applyFilters, ["prevent"]),
                      class: "px-4 py-5 sm:px-6 border-b border-gray-200"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Transaction Type"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => filterForm.transaction_type = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "All"),
                            createVNode("option", { value: "topup" }, "Top-up / Payment"),
                            createVNode("option", { value: "amortization" }, "Amortization")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, filterForm.transaction_type]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "From Date"),
                          withDirectives(createVNode("input", {
                            type: "date",
                            "onUpdate:modelValue": ($event) => filterForm.date_from = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, filterForm.date_from]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "To Date"),
                          withDirectives(createVNode("input", {
                            type: "date",
                            "onUpdate:modelValue": ($event) => filterForm.date_to = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, filterForm.date_to]
                          ])
                        ]),
                        createVNode("div", { class: "flex items-end space-x-2" }, [
                          createVNode("button", {
                            type: "submit",
                            class: "flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, " Apply "),
                          createVNode("button", {
                            type: "button",
                            onClick: resetFilters,
                            class: "inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                          }, " Reset ")
                        ])
                      ])
                    ], 32),
                    createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Date"),
                              createVNode("th", { class: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Type"),
                              createVNode("th", { class: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Description"),
                              createVNode("th", { class: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Amount"),
                              createVNode("th", { class: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Source"),
                              createVNode("th", { class: "px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "User")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.transactions.data, (transaction) => {
                              var _a2;
                              return openBlock(), createBlock("tr", {
                                key: transaction.id
                              }, [
                                createVNode("td", { class: "px-3 py-3 text-sm text-gray-900" }, toDisplayString(formatDate(transaction.transaction_date)), 1),
                                createVNode("td", { class: "px-3 py-3" }, [
                                  createVNode("span", {
                                    class: [transaction.transaction_type === "topup" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"]
                                  }, toDisplayString(transaction.transaction_type === "topup" ? "Top-up" : "Amortization"), 3)
                                ]),
                                createVNode("td", { class: "px-3 py-3 text-sm text-gray-900" }, [
                                  createVNode("div", { class: "font-medium" }, toDisplayString(transaction.description || "-"), 1),
                                  transaction.notes ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-xs text-gray-500 mt-1 line-clamp-2"
                                  }, toDisplayString(transaction.notes), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-3 py-3 text-sm font-semibold text-gray-900" }, " Rp " + toDisplayString(formatNumber(transaction.amount)), 1),
                                createVNode("td", { class: "px-3 py-3 text-sm text-gray-900" }, [
                                  createVNode("div", { class: "capitalize" }, toDisplayString(transaction.source_type || "-"), 1),
                                  transaction.bank_account ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-xs text-gray-500"
                                  }, toDisplayString(transaction.bank_account.bank_name) + " - " + toDisplayString(transaction.bank_account.account_number), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-3 py-3 text-sm text-gray-900" }, toDisplayString(((_a2 = transaction.creator) == null ? void 0 : _a2.name) || "System/Auto"), 1)
                              ]);
                            }), 128)),
                            __props.transactions.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "6",
                                class: "px-3 py-6 text-center text-sm text-gray-500"
                              }, "No transactions yet.")
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-4" }, [
                        createVNode(Pagination, { data: __props.transactions }, null, 8, ["data"])
                      ])
                    ])
                  ])
                ])
              ]),
              showTopupModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center"
              }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto mx-4" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Add Rent Payment"),
                    createVNode("button", {
                      onClick: closeTopupModal,
                      class: "text-gray-400 hover:text-gray-600"
                    }, "×")
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submitTopup, ["prevent"]),
                    class: "px-6 py-4 space-y-4"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Date *"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(topupForm).transaction_date = $event,
                          type: "date",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(topupForm).transaction_date]
                        ]),
                        unref(topupForm).errors.transaction_date ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(topupForm).errors.transaction_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount *"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(topupForm).amount = $event,
                          type: "number",
                          min: "0",
                          step: "0.01",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                          placeholder: "0"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(topupForm).amount]
                        ]),
                        unref(topupForm).errors.amount ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(topupForm).errors.amount), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(topupForm).description = $event,
                        type: "text",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                        placeholder: "Example: Office rent Q1"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(topupForm).description]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                        createTextVNode(" Expense Account (P&L) "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode(_sfc_main$1, {
                        modelValue: unref(topupForm).pl_account_id,
                        "onUpdate:modelValue": ($event) => unref(topupForm).pl_account_id = $event,
                        options: expenseAccountOptions.value,
                        placeholder: "Search accounts...",
                        "label-field": "label",
                        "value-field": "value",
                        "search-fields": ["label", "code", "name"],
                        "input-class": topupPlAccountInputClass.value
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class"]),
                      unref(topupForm).errors.pl_account_id ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-red-600 mt-1"
                      }, toDisplayString(unref(topupForm).errors.pl_account_id), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Funding Source *"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(topupForm).source_type = $event,
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, [
                          createVNode("option", { value: "bank" }, "Bank Transfer"),
                          createVNode("option", { value: "petty_cash" }, "Petty Cash"),
                          createVNode("option", { value: "other" }, "Other"),
                          createVNode("option", { value: "opening_balance" }, "Opening Balance")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(topupForm).source_type]
                        ]),
                        unref(topupForm).errors.source_type ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(topupForm).errors.source_type), 1)) : createCommentVNode("", true)
                      ]),
                      unref(topupForm).source_type === "bank" ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bank Account *"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(topupForm).bank_account_id = $event,
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, [
                          createVNode("option", { value: "" }, "Select account"),
                          (openBlock(true), createBlock(Fragment, null, renderList(bankAccounts.value, (bank) => {
                            return openBlock(), createBlock("option", {
                              key: bank.id,
                              value: bank.id
                            }, toDisplayString(bank.bank_name) + " - " + toDisplayString(bank.account_number), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(topupForm).bank_account_id]
                        ]),
                        unref(topupForm).errors.bank_account_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(topupForm).errors.bank_account_id), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      unref(topupForm).source_type === "petty_cash" ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Petty Cash Category *"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(topupForm).petty_cash_category_id = $event,
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, [
                          createVNode("option", { value: "" }, "Select category"),
                          (openBlock(true), createBlock(Fragment, null, renderList(pettyCashCategories.value, (category) => {
                            return openBlock(), createBlock("option", {
                              key: category.id,
                              value: category.id
                            }, toDisplayString(category.name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(topupForm).petty_cash_category_id]
                        ]),
                        unref(topupForm).errors.petty_cash_category_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(topupForm).errors.petty_cash_category_id), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Rental Start"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(topupForm).rental_start_date = $event,
                          type: "date",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(topupForm).rental_start_date]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Rental End"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(topupForm).rental_end_date = $event,
                          type: "date",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(topupForm).rental_end_date]
                        ]),
                        unref(topupForm).errors.rental_end_date ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-red-600 mt-1"
                        }, toDisplayString(unref(topupForm).errors.rental_end_date), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amortization Months"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(topupForm).amortization_months = $event,
                        type: "number",
                        min: "1",
                        max: "60",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                        placeholder: "Example: 12"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(topupForm).amortization_months]
                      ]),
                      unref(topupForm).errors.amortization_months ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-red-600 mt-1"
                      }, toDisplayString(unref(topupForm).errors.amortization_months), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Notes"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(topupForm).notes = $event,
                        rows: "3",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(topupForm).notes]
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3 pt-2" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: closeTopupModal,
                        class: "px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700"
                      }, "Cancel"),
                      createVNode("button", {
                        type: "submit",
                        disabled: isTopupDisabled.value,
                        class: "px-4 py-2 rounded-md bg-sage-600 text-white text-sm font-semibold hover:bg-sage-700 disabled:opacity-50"
                      }, toDisplayString(unref(topupForm).processing ? "Saving..." : "Save"), 9, ["disabled"])
                    ])
                  ], 32)
                ])
              ])) : createCommentVNode("", true),
              showAmortizationModal.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center"
              }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto mx-4" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200 flex justify-between items-center" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Record Amortization"),
                    createVNode("button", {
                      onClick: closeAmortizationModal,
                      class: "text-gray-400 hover:text-gray-600"
                    }, "×")
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submitAmortization, ["prevent"]),
                    class: "px-6 py-4 space-y-4"
                  }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Date *"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(amortizationForm).transaction_date = $event,
                        type: "date",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(amortizationForm).transaction_date]
                      ]),
                      unref(amortizationForm).errors.transaction_date ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-red-600 mt-1"
                      }, toDisplayString(unref(amortizationForm).errors.transaction_date), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount *"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(amortizationForm).amount = $event,
                        type: "number",
                        min: "0",
                        step: "0.01",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                        placeholder: "0"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(amortizationForm).amount]
                      ]),
                      unref(amortizationForm).errors.amount ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-red-600 mt-1"
                      }, toDisplayString(unref(amortizationForm).errors.amount), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(amortizationForm).description = $event,
                        type: "text",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                        placeholder: "Example: January amortization"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(amortizationForm).description]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Expense Account (P&L) *"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(amortizationForm).pl_account_id = $event,
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, [
                        createVNode("option", { value: "" }, "Select account"),
                        (openBlock(true), createBlock(Fragment, null, renderList(expenseAccounts.value, (account) => {
                          return openBlock(), createBlock("option", {
                            key: account.id,
                            value: account.id
                          }, toDisplayString(account.account_code) + " - " + toDisplayString(account.account_name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(amortizationForm).pl_account_id]
                      ]),
                      unref(amortizationForm).errors.pl_account_id ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "text-xs text-red-600 mt-1"
                      }, toDisplayString(unref(amortizationForm).errors.pl_account_id), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Notes"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(amortizationForm).notes = $event,
                        rows: "3",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(amortizationForm).notes]
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3 pt-2" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: closeAmortizationModal,
                        class: "px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700"
                      }, "Cancel"),
                      createVNode("button", {
                        type: "submit",
                        disabled: isAmortizationDisabled.value,
                        class: "px-4 py-2 rounded-md bg-sage-600 text-white text-sm font-semibold hover:bg-sage-700 disabled:opacity-50"
                      }, toDisplayString(unref(amortizationForm).processing ? "Saving..." : "Save"), 9, ["disabled"])
                    ])
                  ], 32)
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/PrepaidRent/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
