import { computed, ref, reactive, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, withDirectives, vModelSelect, vModelText, withModifiers, createTextVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderClass } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { useForm, Head, router } from "@inertiajs/vue3";
import { _ as _sfc_main$1 } from "./SearchableSelect-DfkOp0gQ.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const baseAccountInputClass = "w-full px-3 py-2 pr-10 border rounded-md text-sm focus:border-sage-500 focus:ring focus:ring-sage-200";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    transactions: Object,
    summary: Object,
    bankAccounts: Array,
    categories: Array,
    pettyCashCategories: Array,
    filters: Object,
    expenseAccounts: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    var _a, _b, _c, _d, _e;
    const props = __props;
    const categories = computed(() => props.categories ?? []);
    const pettyCashCategories = computed(() => props.pettyCashCategories ?? []);
    const selectedTopupCategoryId = ref(((_a = pettyCashCategories.value[0]) == null ? void 0 : _a.id) || "");
    const topupCategoryOptions = computed(() => {
      const baseOptions = [{ value: "", label: "Select category" }];
      const options = pettyCashCategories.value.map((category) => ({
        value: category.id,
        label: category.name
      }));
      return [...baseOptions, ...options];
    });
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
      const error = ((_a2 = topupForm.errors) == null ? void 0 : _a2.pl_account_id) ? " border-red-300" : " border-gray-300";
      return `${baseAccountInputClass}${error}`;
    });
    const topupCategoryInputClass = computed(() => {
      var _a2, _b2;
      const error = ((_a2 = topupForm.errors) == null ? void 0 : _a2.petty_cash_category_id) || ((_b2 = topupForm.errors) == null ? void 0 : _b2.category) ? " border-red-300" : " border-gray-300";
      return `${baseAccountInputClass}${error}`;
    });
    const usagePlAccountInputClass = computed(() => {
      var _a2;
      const error = ((_a2 = usageForm.errors) == null ? void 0 : _a2.pl_account_id) ? " border-red-300" : " border-gray-300";
      return `${baseAccountInputClass}${error}`;
    });
    const defaultExpenseAccountId = computed(() => {
      var _a2;
      return ((_a2 = expenseAccounts.value[0]) == null ? void 0 : _a2.id) || "";
    });
    const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const topupForm = useForm({
      transaction_date: today,
      category: "",
      description: "",
      amount: "",
      quantity: "",
      pl_account_id: "",
      source_type: "",
      bank_account_id: "",
      petty_cash_category_id: "",
      reference_number: "",
      notes: ""
    });
    const usageForm = useForm({
      transaction_date: today,
      category: "",
      description: "",
      amount: "",
      quantity: "",
      transaction_type: "usage",
      pl_account_id: "",
      notes: ""
    });
    const filters = reactive({
      category: ((_b = props.filters) == null ? void 0 : _b.category) || "",
      transaction_type: ((_c = props.filters) == null ? void 0 : _c.transaction_type) || "",
      date_from: ((_d = props.filters) == null ? void 0 : _d.date_from) || "",
      date_to: ((_e = props.filters) == null ? void 0 : _e.date_to) || ""
    });
    const showTopupModal = ref(false);
    const showUsageModal = ref(false);
    const formatCurrency = (value) => {
      const amount = Number(value || 0);
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const calculateUnitPrice = (amount, qty) => {
      const total = parseFloat(amount);
      const quantity = parseFloat(qty);
      if (!total || !quantity) return null;
      return total / quantity;
    };
    const pricePerPcs = (entry) => calculateUnitPrice(entry.amount, entry.quantity);
    const topupUnitPrice = computed(() => calculateUnitPrice(topupForm.amount, topupForm.quantity));
    const usageUnitPrice = computed(() => calculateUnitPrice(usageForm.amount, usageForm.quantity));
    const isTopupDisabled = computed(() => {
      if (topupForm.processing) return true;
      if (!topupForm.transaction_date || !topupForm.category || !topupForm.amount || !topupForm.quantity || !topupForm.source_type) {
        return true;
      }
      if (topupForm.source_type !== "opening_balance" && !topupForm.pl_account_id) return true;
      if (topupForm.source_type === "bank" && !topupForm.bank_account_id) return true;
      if (topupForm.source_type === "petty_cash" && !topupForm.petty_cash_category_id) return true;
      return false;
    });
    const isUsageDisabled = computed(() => {
      if (usageForm.processing) return true;
      if (!usageForm.transaction_date || !usageForm.category || !usageForm.amount || !usageForm.pl_account_id) return true;
      return false;
    });
    const formatDate = (value) => {
      if (!value) return "-";
      return new Date(value).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const labelFor = (type) => {
      return {
        topup: "Top-up",
        usage: "Usage",
        depreciation: "Depreciation"
      }[type] || type;
    };
    const badgeClass = (type) => {
      switch (type) {
        case "topup":
          return "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800";
        case "usage":
          return "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800";
        default:
          return "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800";
      }
    };
    const submitTopup = () => {
      topupForm.post(route("admin-keuangan.supplies.topup"), {
        preserveScroll: true,
        onSuccess: () => {
          var _a2;
          topupForm.reset();
          topupForm.transaction_date = today;
          topupForm.source_type = "";
          topupForm.petty_cash_category_id = "";
          selectedTopupCategoryId.value = ((_a2 = pettyCashCategories.value[0]) == null ? void 0 : _a2.id) || "";
          closeTopupModal();
        }
      });
    };
    const submitUsage = () => {
      usageForm.post(route("admin-keuangan.supplies.usage"), {
        preserveScroll: true,
        onSuccess: () => {
          usageForm.reset();
          usageForm.transaction_date = today;
          usageForm.transaction_type = "usage";
          closeUsageModal();
        }
      });
    };
    const applyFilters = () => {
      router.get(route("admin-keuangan.supplies.index"), {
        ...filters,
        page: 1
      }, {
        preserveState: true,
        preserveScroll: true,
        replace: true
      });
    };
    const resetFilters = () => {
      filters.category = "";
      filters.transaction_type = "";
      filters.date_from = "";
      filters.date_to = "";
      router.get(route("admin-keuangan.supplies.index"), {}, {
        preserveState: true,
        preserveScroll: true,
        replace: true
      });
    };
    const visitPage = (url) => {
      if (!url) return;
      const target = new URL(url, window.location.origin);
      const page = target.searchParams.get("page");
      router.get(route("admin-keuangan.supplies.index"), {
        ...filters,
        page: page || 1
      }, {
        preserveState: true,
        preserveScroll: true,
        replace: true
      });
    };
    const openTopupModal = () => {
      topupForm.reset();
      topupForm.transaction_date = today;
      topupForm.source_type = "";
      topupForm.pl_account_id = defaultExpenseAccountId.value;
      topupForm.bank_account_id = "";
      topupForm.petty_cash_category_id = "";
      if (selectedTopupCategoryId.value) {
        const cat = pettyCashCategories.value.find((c) => c.id === selectedTopupCategoryId.value);
        if (cat) {
          topupForm.category = cat.name;
        }
      }
      showTopupModal.value = true;
    };
    const closeTopupModal = () => {
      showTopupModal.value = false;
    };
    const openUsageModal = () => {
      usageForm.reset();
      usageForm.transaction_date = today;
      usageForm.pl_account_id = defaultExpenseAccountId.value;
      showUsageModal.value = true;
    };
    const closeUsageModal = () => {
      showUsageModal.value = false;
    };
    watch(
      () => topupForm.source_type,
      (value) => {
        if (value !== "bank") {
          topupForm.bank_account_id = "";
        }
        if (value !== "petty_cash") {
          topupForm.petty_cash_category_id = "";
        }
        if (value === "petty_cash" && selectedTopupCategoryId.value) {
          topupForm.petty_cash_category_id = selectedTopupCategoryId.value;
        }
      }
    );
    watch(
      pettyCashCategories,
      (cats) => {
        if (!selectedTopupCategoryId.value && cats.length > 0) {
          selectedTopupCategoryId.value = cats[0].id;
        }
      },
      { immediate: true }
    );
    watch(
      selectedTopupCategoryId,
      (id) => {
        const cat = pettyCashCategories.value.find((c) => c.id === id);
        if (cat) {
          topupForm.category = cat.name;
          if (topupForm.source_type === "petty_cash") {
            topupForm.petty_cash_category_id = cat.id;
          }
        } else {
          topupForm.category = "";
          if (topupForm.source_type === "petty_cash") {
            topupForm.petty_cash_category_id = "";
          }
        }
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Supplies Ledger" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Supplies Ledger</h1><p class="text-sm text-gray-600"${_scopeId}>Record top-ups and usage to keep the balance sheet updated.</p></div><div class="flex flex-wrap gap-3"${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-md text-sm font-semibold hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}> Add Top-up </button><button type="button" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"${_scopeId}> Record Usage/Depreciation </button></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div class="bg-white border border-sage-200 rounded-lg shadow-sm p-5"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Total Top-up</p><p class="text-2xl font-bold text-gray-900 mt-1"${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_topup))}</p></div><div class="bg-white border border-sage-200 rounded-lg shadow-sm p-5"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Total Usage</p><p class="text-2xl font-bold text-gray-900 mt-1"${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_usage))}</p></div><div class="bg-white border border-sage-200 rounded-lg shadow-sm p-5"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Supplies Balance</p><p class="text-2xl font-bold text-gray-900 mt-1"${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.balance))}</p></div></div><datalist id="supply-category-list"${_scopeId}><!--[-->`);
            ssrRenderList(categories.value, (category) => {
              _push2(`<option${ssrRenderAttr("value", category)}${_scopeId}></option>`);
            });
            _push2(`<!--]--></datalist><div class="bg-white border border-sage-200 rounded-lg shadow-sm"${_scopeId}><div class="px-4 py-5 sm:px-6 border-b border-sage-100"${_scopeId}><div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4"${_scopeId}><div class="flex flex-wrap gap-3"${_scopeId}><div${_scopeId}><label class="block text-xs font-medium text-gray-500 mb-1"${_scopeId}>Category</label><select class="rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.category) ? ssrLooseContain(filters.category, "") : ssrLooseEqual(filters.category, "")) ? " selected" : ""}${_scopeId}>All</option><!--[-->`);
            ssrRenderList(categories.value, (category) => {
              _push2(`<option${ssrRenderAttr("value", category)}${ssrIncludeBooleanAttr(Array.isArray(filters.category) ? ssrLooseContain(filters.category, category) : ssrLooseEqual(filters.category, category)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-xs font-medium text-gray-500 mb-1"${_scopeId}>Type</label><select class="rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filters.transaction_type) ? ssrLooseContain(filters.transaction_type, "") : ssrLooseEqual(filters.transaction_type, "")) ? " selected" : ""}${_scopeId}>All</option><option value="topup"${ssrIncludeBooleanAttr(Array.isArray(filters.transaction_type) ? ssrLooseContain(filters.transaction_type, "topup") : ssrLooseEqual(filters.transaction_type, "topup")) ? " selected" : ""}${_scopeId}>Top-up</option><option value="usage"${ssrIncludeBooleanAttr(Array.isArray(filters.transaction_type) ? ssrLooseContain(filters.transaction_type, "usage") : ssrLooseEqual(filters.transaction_type, "usage")) ? " selected" : ""}${_scopeId}>Usage</option><option value="depreciation"${ssrIncludeBooleanAttr(Array.isArray(filters.transaction_type) ? ssrLooseContain(filters.transaction_type, "depreciation") : ssrLooseEqual(filters.transaction_type, "depreciation")) ? " selected" : ""}${_scopeId}>Depreciation</option></select></div><div${_scopeId}><label class="block text-xs font-medium text-gray-500 mb-1"${_scopeId}>From</label><input${ssrRenderAttr("value", filters.date_from)} type="date" class="rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"${_scopeId}></div><div${_scopeId}><label class="block text-xs font-medium text-gray-500 mb-1"${_scopeId}>To</label><input${ssrRenderAttr("value", filters.date_to)} type="date" class="rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"${_scopeId}></div></div><button type="button" class="inline-flex items-center px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"${_scopeId}> Reset </button></div></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Category</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Description</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Total Items</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Price / pcs</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Amount</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Type</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.transactions.data, (entry) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(entry.transaction_date))}</td><td class="px-6 py-4 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(entry.category)}</td><td class="px-6 py-4 text-sm text-gray-900"${_scopeId}><div${_scopeId}>${ssrInterpolate(entry.description || "-")}</div>`);
              if (entry.notes) {
                _push2(`<div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(entry.notes)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 text-sm text-gray-900 text-right"${_scopeId}>`);
              if (entry.quantity) {
                _push2(`<span${_scopeId}>${ssrInterpolate(entry.quantity)}</span>`);
              } else {
                _push2(`<span${_scopeId}>-</span>`);
              }
              _push2(`</td><td class="px-6 py-4 text-sm text-gray-900 text-right"${_scopeId}>`);
              if (pricePerPcs(entry)) {
                _push2(`<span${_scopeId}>${ssrInterpolate(formatCurrency(pricePerPcs(entry)))}</span>`);
              } else {
                _push2(`<span${_scopeId}>-</span>`);
              }
              _push2(`</td><td class="px-6 py-4 text-sm text-gray-900 text-right"${_scopeId}>${ssrInterpolate(formatCurrency(entry.amount))}</td><td class="px-6 py-4 text-sm"${_scopeId}><span class="${ssrRenderClass(badgeClass(entry.transaction_type))}"${_scopeId}>${ssrInterpolate(labelFor(entry.transaction_type))}</span></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.transactions.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="7" class="px-6 py-8 text-center text-sm text-gray-500"${_scopeId}> No supplies transactions yet. </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.transactions.links && __props.transactions.data.length > 0) {
              _push2(`<div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(__props.transactions.from || 0)} to ${ssrInterpolate(__props.transactions.to || 0)} of ${ssrInterpolate(__props.transactions.total || 0)} results </div><div class="flex space-x-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.transactions.links, (link) => {
                _push2(`<!--[-->`);
                if (link.url) {
                  _push2(`<button class="${ssrRenderClass([
                    "px-3 py-2 text-sm rounded-md",
                    link.active ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-300"
                  ])}"${_scopeId}>${link.label ?? ""}</button>`);
                } else {
                  _push2(`<span class="px-3 py-2 text-sm text-gray-400"${_scopeId}>${link.label ?? ""}</span>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            if (showTopupModal.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"${_scopeId}><div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4"${_scopeId}><div class="px-6 py-4 border-b border-sage-100 flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}>Add Supplies Top-up</h3><button type="button" class="text-gray-500 hover:text-gray-700"${_scopeId}>×</button></div><div class="px-6 py-5"${_scopeId}><form class="space-y-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Date</label><input${ssrRenderAttr("value", unref(topupForm).transaction_date)} type="date" class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200" required${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Category</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: selectedTopupCategoryId.value,
                "onUpdate:modelValue": ($event) => selectedTopupCategoryId.value = $event,
                options: topupCategoryOptions.value,
                placeholder: "Select category",
                "search-fields": ["label"],
                "input-class": topupCategoryInputClass.value
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Description</label><textarea rows="2" class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"${_scopeId}>${ssrInterpolate(unref(topupForm).description)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Amount (Rp)</label><input${ssrRenderAttr("value", unref(topupForm).amount)} type="number" step="0.01" min="0.01" class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200" required${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Total Items</label><input${ssrRenderAttr("value", unref(topupForm).quantity)} type="number" step="0.01" min="0.01" class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200" required${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}> Funding Source <span class="text-red-500"${_scopeId}>*</span></label><select class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).source_type) ? ssrLooseContain(unref(topupForm).source_type, "") : ssrLooseEqual(unref(topupForm).source_type, "")) ? " selected" : ""}${_scopeId}>Select funding source</option><option value="bank"${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).source_type) ? ssrLooseContain(unref(topupForm).source_type, "bank") : ssrLooseEqual(unref(topupForm).source_type, "bank")) ? " selected" : ""}${_scopeId}>Bank</option><option value="petty_cash"${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).source_type) ? ssrLooseContain(unref(topupForm).source_type, "petty_cash") : ssrLooseEqual(unref(topupForm).source_type, "petty_cash")) ? " selected" : ""}${_scopeId}>Petty Cash</option><option value="opening_balance"${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).source_type) ? ssrLooseContain(unref(topupForm).source_type, "opening_balance") : ssrLooseEqual(unref(topupForm).source_type, "opening_balance")) ? " selected" : ""}${_scopeId}>Opening Balance</option></select><p class="text-xs text-gray-500 mt-1"${_scopeId}>Unit price: <span class="font-semibold"${_scopeId}>${ssrInterpolate(topupUnitPrice.value ? formatCurrency(topupUnitPrice.value) : "-")}</span></p></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Expense Account (P&amp;L)</label>`);
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
              _push2(`</div>`);
              if (unref(topupForm).source_type === "bank") {
                _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Bank Account</label><select class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).bank_account_id) ? ssrLooseContain(unref(topupForm).bank_account_id, "") : ssrLooseEqual(unref(topupForm).bank_account_id, "")) ? " selected" : ""}${_scopeId}>Select bank account</option><!--[-->`);
                ssrRenderList(__props.bankAccounts, (bank) => {
                  _push2(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(topupForm).bank_account_id) ? ssrLooseContain(unref(topupForm).bank_account_id, bank.id) : ssrLooseEqual(unref(topupForm).bank_account_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} - ${ssrInterpolate(bank.account_number)}</option>`);
                });
                _push2(`<!--]--></select></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Notes</label><textarea rows="2" class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"${_scopeId}>${ssrInterpolate(unref(topupForm).notes)}</textarea></div></form></div><div class="px-6 py-4 border-t border-sage-100 flex justify-end gap-3"${_scopeId}><button type="button" class="px-4 py-2 text-sm text-gray-600"${_scopeId}>Cancel</button><button type="button" class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-md text-sm font-semibold hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed"${ssrIncludeBooleanAttr(isTopupDisabled.value) ? " disabled" : ""}${_scopeId}> Add Top-up </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showUsageModal.value) {
              _push2(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"${_scopeId}><div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4"${_scopeId}><div class="px-6 py-4 border-b border-sage-100 flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold text-gray-900"${_scopeId}>Record Usage / Depreciation</h3><button type="button" class="text-gray-500 hover:text-gray-700"${_scopeId}>×</button></div><div class="px-6 py-5"${_scopeId}><form class="space-y-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Date</label><input${ssrRenderAttr("value", unref(usageForm).transaction_date)} type="date" class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200" required${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Category</label><input${ssrRenderAttr("value", unref(usageForm).category)} list="supply-category-list" class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200" required${_scopeId}></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Type</label><select class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"${_scopeId}><option value="usage"${ssrIncludeBooleanAttr(Array.isArray(unref(usageForm).transaction_type) ? ssrLooseContain(unref(usageForm).transaction_type, "usage") : ssrLooseEqual(unref(usageForm).transaction_type, "usage")) ? " selected" : ""}${_scopeId}>Usage</option><option value="depreciation"${ssrIncludeBooleanAttr(Array.isArray(unref(usageForm).transaction_type) ? ssrLooseContain(unref(usageForm).transaction_type, "depreciation") : ssrLooseEqual(unref(usageForm).transaction_type, "depreciation")) ? " selected" : ""}${_scopeId}>Depreciation</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Amount (Rp)</label><input${ssrRenderAttr("value", unref(usageForm).amount)} type="number" step="0.01" min="0.01" class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200" required${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Total Items</label><input${ssrRenderAttr("value", unref(usageForm).quantity)} type="number" step="0.01" min="0.01" class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"${_scopeId}><p class="text-xs text-gray-500 mt-1"${_scopeId}>Unit price: <span class="font-semibold"${_scopeId}>${ssrInterpolate(usageUnitPrice.value ? formatCurrency(usageUnitPrice.value) : "-")}</span></p></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Description</label><textarea rows="2" class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"${_scopeId}>${ssrInterpolate(unref(usageForm).description)}</textarea></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Expense Account (P&amp;L)</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: unref(usageForm).pl_account_id,
                "onUpdate:modelValue": ($event) => unref(usageForm).pl_account_id = $event,
                options: expenseAccountOptions.value,
                placeholder: "Search accounts...",
                "label-field": "label",
                "value-field": "value",
                "search-fields": ["label", "code", "name"],
                "input-class": usagePlAccountInputClass.value
              }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Notes</label><textarea rows="2" class="w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"${_scopeId}>${ssrInterpolate(unref(usageForm).notes)}</textarea></div></form></div><div class="px-6 py-4 border-t border-sage-100 flex justify-end gap-3"${_scopeId}><button type="button" class="px-4 py-2 text-sm text-gray-600"${_scopeId}>Cancel</button><button type="button" class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-md text-sm font-semibold hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${ssrIncludeBooleanAttr(isUsageDisabled.value) ? " disabled" : ""}${_scopeId}> Save </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Supplies Ledger" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Supplies Ledger"),
                      createVNode("p", { class: "text-sm text-gray-600" }, "Record top-ups and usage to keep the balance sheet updated.")
                    ]),
                    createVNode("div", { class: "flex flex-wrap gap-3" }, [
                      createVNode("button", {
                        type: "button",
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-md text-sm font-semibold hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500",
                        onClick: openTopupModal
                      }, " Add Top-up "),
                      createVNode("button", {
                        type: "button",
                        class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                        onClick: openUsageModal
                      }, " Record Usage/Depreciation ")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                    createVNode("div", { class: "bg-white border border-sage-200 rounded-lg shadow-sm p-5" }, [
                      createVNode("p", { class: "text-sm text-gray-500" }, "Total Top-up"),
                      createVNode("p", { class: "text-2xl font-bold text-gray-900 mt-1" }, toDisplayString(formatCurrency(__props.summary.total_topup)), 1)
                    ]),
                    createVNode("div", { class: "bg-white border border-sage-200 rounded-lg shadow-sm p-5" }, [
                      createVNode("p", { class: "text-sm text-gray-500" }, "Total Usage"),
                      createVNode("p", { class: "text-2xl font-bold text-gray-900 mt-1" }, toDisplayString(formatCurrency(__props.summary.total_usage)), 1)
                    ]),
                    createVNode("div", { class: "bg-white border border-sage-200 rounded-lg shadow-sm p-5" }, [
                      createVNode("p", { class: "text-sm text-gray-500" }, "Supplies Balance"),
                      createVNode("p", { class: "text-2xl font-bold text-gray-900 mt-1" }, toDisplayString(formatCurrency(__props.summary.balance)), 1)
                    ])
                  ]),
                  createVNode("datalist", { id: "supply-category-list" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (category) => {
                      return openBlock(), createBlock("option", {
                        key: category,
                        value: category
                      }, null, 8, ["value"]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "bg-white border border-sage-200 rounded-lg shadow-sm" }, [
                    createVNode("div", { class: "px-4 py-5 sm:px-6 border-b border-sage-100" }, [
                      createVNode("div", { class: "flex flex-col md:flex-row md:items-end md:justify-between gap-4" }, [
                        createVNode("div", { class: "flex flex-wrap gap-3" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-xs font-medium text-gray-500 mb-1" }, "Category"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => filters.category = $event,
                              class: "rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200",
                              onChange: applyFilters
                            }, [
                              createVNode("option", { value: "" }, "All"),
                              (openBlock(true), createBlock(Fragment, null, renderList(categories.value, (category) => {
                                return openBlock(), createBlock("option", {
                                  key: category,
                                  value: category
                                }, toDisplayString(category), 9, ["value"]);
                              }), 128))
                            ], 40, ["onUpdate:modelValue"]), [
                              [vModelSelect, filters.category]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-xs font-medium text-gray-500 mb-1" }, "Type"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => filters.transaction_type = $event,
                              class: "rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200",
                              onChange: applyFilters
                            }, [
                              createVNode("option", { value: "" }, "All"),
                              createVNode("option", { value: "topup" }, "Top-up"),
                              createVNode("option", { value: "usage" }, "Usage"),
                              createVNode("option", { value: "depreciation" }, "Depreciation")
                            ], 40, ["onUpdate:modelValue"]), [
                              [vModelSelect, filters.transaction_type]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-xs font-medium text-gray-500 mb-1" }, "From"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => filters.date_from = $event,
                              type: "date",
                              class: "rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200",
                              onChange: applyFilters
                            }, null, 40, ["onUpdate:modelValue"]), [
                              [vModelText, filters.date_from]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-xs font-medium text-gray-500 mb-1" }, "To"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => filters.date_to = $event,
                              type: "date",
                              class: "rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200",
                              onChange: applyFilters
                            }, null, 40, ["onUpdate:modelValue"]), [
                              [vModelText, filters.date_to]
                            ])
                          ])
                        ]),
                        createVNode("button", {
                          type: "button",
                          class: "inline-flex items-center px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50",
                          onClick: resetFilters
                        }, " Reset ")
                      ])
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Date"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Category"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Description"),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Total Items"),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Price / pcs"),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Amount"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Type")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.transactions.data, (entry) => {
                            return openBlock(), createBlock("tr", {
                              key: entry.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(formatDate(entry.transaction_date)), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(entry.category), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                                createVNode("div", null, toDisplayString(entry.description || "-"), 1),
                                entry.notes ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-xs text-gray-500"
                                }, toDisplayString(entry.notes), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900 text-right" }, [
                                entry.quantity ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(entry.quantity), 1)) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                              ]),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900 text-right" }, [
                                pricePerPcs(entry) ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(formatCurrency(pricePerPcs(entry))), 1)) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                              ]),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900 text-right" }, toDisplayString(formatCurrency(entry.amount)), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm" }, [
                                createVNode("span", {
                                  class: badgeClass(entry.transaction_type)
                                }, toDisplayString(labelFor(entry.transaction_type)), 3)
                              ])
                            ]);
                          }), 128)),
                          __props.transactions.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "7",
                              class: "px-6 py-8 text-center text-sm text-gray-500"
                            }, " No supplies transactions yet. ")
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    __props.transactions.links && __props.transactions.data.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white px-4 py-3 border-t border-gray-200 sm:px-6"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.transactions.from || 0) + " to " + toDisplayString(__props.transactions.to || 0) + " of " + toDisplayString(__props.transactions.total || 0) + " results ", 1),
                        createVNode("div", { class: "flex space-x-1" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.transactions.links, (link) => {
                            return openBlock(), createBlock(Fragment, {
                              key: link.label
                            }, [
                              link.url ? (openBlock(), createBlock("button", {
                                key: 0,
                                onClick: ($event) => visitPage(link.url),
                                class: [
                                  "px-3 py-2 text-sm rounded-md",
                                  link.active ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-300"
                                ],
                                innerHTML: link.label
                              }, null, 10, ["onClick", "innerHTML"])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "px-3 py-2 text-sm text-gray-400",
                                innerHTML: link.label
                              }, null, 8, ["innerHTML"]))
                            ], 64);
                          }), 128))
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              showTopupModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40",
                onClick: withModifiers(closeTopupModal, ["self"])
              }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-100 flex items-center justify-between" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Add Supplies Top-up"),
                    createVNode("button", {
                      type: "button",
                      class: "text-gray-500 hover:text-gray-700",
                      onClick: closeTopupModal
                    }, "×")
                  ]),
                  createVNode("div", { class: "px-6 py-5" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submitTopup, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Date"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(topupForm).transaction_date = $event,
                            type: "date",
                            class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(topupForm).transaction_date]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Category"),
                          createVNode(_sfc_main$1, {
                            modelValue: selectedTopupCategoryId.value,
                            "onUpdate:modelValue": ($event) => selectedTopupCategoryId.value = $event,
                            options: topupCategoryOptions.value,
                            placeholder: "Select category",
                            "search-fields": ["label"],
                            "input-class": topupCategoryInputClass.value
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class"])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(topupForm).description = $event,
                          rows: "2",
                          class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(topupForm).description]
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount (Rp)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(topupForm).amount = $event,
                            type: "number",
                            step: "0.01",
                            min: "0.01",
                            class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(topupForm).amount]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Total Items"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(topupForm).quantity = $event,
                            type: "number",
                            step: "0.01",
                            min: "0.01",
                            class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(topupForm).quantity]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                            createTextVNode(" Funding Source "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(topupForm).source_type = $event,
                            class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200",
                            required: ""
                          }, [
                            createVNode("option", { value: "" }, "Select funding source"),
                            createVNode("option", { value: "bank" }, "Bank"),
                            createVNode("option", { value: "petty_cash" }, "Petty Cash"),
                            createVNode("option", { value: "opening_balance" }, "Opening Balance")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(topupForm).source_type]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 mt-1" }, [
                            createTextVNode("Unit price: "),
                            createVNode("span", { class: "font-semibold" }, toDisplayString(topupUnitPrice.value ? formatCurrency(topupUnitPrice.value) : "-"), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Expense Account (P&L)"),
                        createVNode(_sfc_main$1, {
                          modelValue: unref(topupForm).pl_account_id,
                          "onUpdate:modelValue": ($event) => unref(topupForm).pl_account_id = $event,
                          options: expenseAccountOptions.value,
                          placeholder: "Search accounts...",
                          "label-field": "label",
                          "value-field": "value",
                          "search-fields": ["label", "code", "name"],
                          "input-class": topupPlAccountInputClass.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class"])
                      ]),
                      unref(topupForm).source_type === "bank" ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bank Account"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(topupForm).bank_account_id = $event,
                          class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200",
                          required: ""
                        }, [
                          createVNode("option", { value: "" }, "Select bank account"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.bankAccounts, (bank) => {
                            return openBlock(), createBlock("option", {
                              key: bank.id,
                              value: bank.id
                            }, toDisplayString(bank.bank_name) + " - " + toDisplayString(bank.account_number), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(topupForm).bank_account_id]
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Notes"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(topupForm).notes = $event,
                          rows: "2",
                          class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(topupForm).notes]
                        ])
                      ])
                    ], 32)
                  ]),
                  createVNode("div", { class: "px-6 py-4 border-t border-sage-100 flex justify-end gap-3" }, [
                    createVNode("button", {
                      type: "button",
                      class: "px-4 py-2 text-sm text-gray-600",
                      onClick: closeTopupModal
                    }, "Cancel"),
                    createVNode("button", {
                      type: "button",
                      class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-md text-sm font-semibold hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed",
                      disabled: isTopupDisabled.value,
                      onClick: submitTopup
                    }, " Add Top-up ", 8, ["disabled"])
                  ])
                ])
              ])) : createCommentVNode("", true),
              showUsageModal.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40",
                onClick: withModifiers(closeUsageModal, ["self"])
              }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-100 flex items-center justify-between" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Record Usage / Depreciation"),
                    createVNode("button", {
                      type: "button",
                      class: "text-gray-500 hover:text-gray-700",
                      onClick: closeUsageModal
                    }, "×")
                  ]),
                  createVNode("div", { class: "px-6 py-5" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submitUsage, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Date"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(usageForm).transaction_date = $event,
                            type: "date",
                            class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(usageForm).transaction_date]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Category"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(usageForm).category = $event,
                            list: "supply-category-list",
                            class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(usageForm).category]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Type"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(usageForm).transaction_type = $event,
                            class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                          }, [
                            createVNode("option", { value: "usage" }, "Usage"),
                            createVNode("option", { value: "depreciation" }, "Depreciation")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(usageForm).transaction_type]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount (Rp)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(usageForm).amount = $event,
                            type: "number",
                            step: "0.01",
                            min: "0.01",
                            class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(usageForm).amount]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Total Items"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(usageForm).quantity = $event,
                            type: "number",
                            step: "0.01",
                            min: "0.01",
                            class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(usageForm).quantity]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 mt-1" }, [
                            createTextVNode("Unit price: "),
                            createVNode("span", { class: "font-semibold" }, toDisplayString(usageUnitPrice.value ? formatCurrency(usageUnitPrice.value) : "-"), 1)
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(usageForm).description = $event,
                          rows: "2",
                          class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(usageForm).description]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Expense Account (P&L)"),
                        createVNode(_sfc_main$1, {
                          modelValue: unref(usageForm).pl_account_id,
                          "onUpdate:modelValue": ($event) => unref(usageForm).pl_account_id = $event,
                          options: expenseAccountOptions.value,
                          placeholder: "Search accounts...",
                          "label-field": "label",
                          "value-field": "value",
                          "search-fields": ["label", "code", "name"],
                          "input-class": usagePlAccountInputClass.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Notes"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(usageForm).notes = $event,
                          rows: "2",
                          class: "w-full rounded-md border-gray-300 text-sm focus:border-sage-500 focus:ring focus:ring-sage-200"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(usageForm).notes]
                        ])
                      ])
                    ], 32)
                  ]),
                  createVNode("div", { class: "px-6 py-4 border-t border-sage-100 flex justify-end gap-3" }, [
                    createVNode("button", {
                      type: "button",
                      class: "px-4 py-2 text-sm text-gray-600",
                      onClick: closeUsageModal
                    }, "Cancel"),
                    createVNode("button", {
                      type: "button",
                      class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-md text-sm font-semibold hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500",
                      disabled: isUsageDisabled.value,
                      onClick: submitUsage
                    }, " Save ", 8, ["disabled"])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Supplies/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
