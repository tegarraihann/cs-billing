import { ref, computed, watch, withCtx, unref, createBlock, openBlock, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, createCommentVNode, vModelText, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { _ as _sfc_main$1 } from "./SearchableSelect-DfkOp0gQ.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    categories: {
      type: Array,
      required: true
    },
    expenseAccounts: {
      type: Array,
      default: () => []
    },
    bankAccounts: {
      type: Array,
      required: true
    },
    currentBalance: {
      type: [Number, String],
      required: true
    },
    errors: {
      type: Object,
      default: () => ({})
    },
    initialType: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    const props = __props;
    const fileInput = ref(null);
    const processing = ref(false);
    const currentBalanceLocal = ref(parseFloat(props.currentBalance) || 0);
    const form = useForm({
      transaction_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      description: "",
      category_id: "",
      pl_account_id: "",
      amount: "",
      type: props.initialType || "",
      bank_account_id: "",
      so_number: "",
      notes: "",
      receipt_file: null
    });
    const errors = computed(() => props.errors ?? {});
    const expenseAccounts = computed(() => props.expenseAccounts ?? []);
    const plAccountOptions = computed(() => {
      return expenseAccounts.value.map((account) => ({
        value: account.id,
        label: `${account.account_code} - ${account.account_name}`,
        code: account.account_code,
        name: account.account_name
      }));
    });
    const today = computed(() => {
      return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    });
    const projectedBalance = computed(() => {
      if (!form.amount || isNaN(form.amount)) return currentBalanceLocal.value;
      const amount = parseFloat(form.amount);
      if (form.type === "expense") {
        return currentBalanceLocal.value - amount;
      } else if (form.type === "topup" || form.type === "refund" || form.type === "opening") {
        return currentBalanceLocal.value + amount;
      }
      return currentBalanceLocal.value;
    });
    const willBeNegative = computed(() => {
      return form.type === "expense" && projectedBalance.value < 0;
    });
    const isDisabled = computed(() => {
      if (processing.value) return true;
      if (!form.transaction_date || !form.type || !form.amount || !form.description) return true;
      if (form.type === "expense" && !form.category_id) return true;
      if (form.type === "expense" && !form.pl_account_id) return true;
      if (["topup", "refund"].includes(form.type) && !form.bank_account_id) return true;
      if (parseFloat(form.amount) <= 0) return true;
      return false;
    });
    const categorySelectOptions = computed(() => {
      const baseOptions = [{ value: "", label: "Select Category" }];
      const options = (props.categories ?? []).map((category) => ({
        value: category.id,
        label: category.name
      }));
      return [...baseOptions, ...options];
    });
    const categoryInputClass = computed(() => {
      var _a;
      const base = "w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm";
      const border = ((_a = errors.value) == null ? void 0 : _a.category_id) ? "border-red-300" : "border-sage-300";
      return `${base} ${border}`;
    });
    const plAccountInputClass = computed(() => {
      var _a;
      const base = "w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm";
      const border = ((_a = errors.value) == null ? void 0 : _a.pl_account_id) ? "border-red-300" : "border-sage-300";
      return `${base} ${border}`;
    });
    watch(() => form.type, (newType) => {
      if (newType !== "expense") {
        form.category_id = "";
        form.pl_account_id = "";
      } else if (!form.pl_account_id && expenseAccounts.value.length > 0) {
        form.pl_account_id = expenseAccounts.value[0].id;
      }
      if (!["topup", "refund"].includes(newType)) {
        form.bank_account_id = "";
      }
    });
    watch(
      expenseAccounts,
      (options) => {
        if (form.type === "expense" && !form.pl_account_id && options.length > 0) {
          form.pl_account_id = options[0].id;
        }
      },
      { immediate: true }
    );
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount || 0);
    };
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      form.receipt_file = file;
    };
    const submitForm = () => {
      if (willBeNegative.value) {
        if (!confirm("This transaction will make the petty cash balance negative. Are you sure you want to continue?")) {
          return;
        }
      }
      form.post(route("admin-keuangan.petty-cash.store"), {
        onStart: () => processing.value = true,
        onFinish: () => processing.value = false
      });
    };
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.petty-cash.index": "/admin-keuangan/petty-cash",
        "admin-keuangan.petty-cash.store": "/admin-keuangan/petty-cash",
        "admin-keuangan.petty-cash.balance": "/admin-keuangan/petty-cash/balance"
      };
      return routes[name] || "#";
    };
    const fetchBalanceForDate = async (dateValue) => {
      if (!dateValue) return;
      try {
        const url = route("admin-keuangan.petty-cash.balance") + `?date=${encodeURIComponent(dateValue)}`;
        const response = await fetch(url, { headers: { "Accept": "application/json" } });
        if (!response.ok) return;
        const data = await response.json();
        if (data && typeof data.balance === "number") {
          currentBalanceLocal.value = data.balance;
        }
      } catch (error) {
      }
    };
    watch(
      () => form.transaction_date,
      (newDate) => {
        fetchBalanceForDate(newDate);
      },
      { immediate: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-w-4xl mx-auto" data-v-b15e36ac${_scopeId}><div class="mb-6" data-v-b15e36ac${_scopeId}><div class="flex items-center space-x-4 mb-2" data-v-b15e36ac${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.petty-cash.index"),
              class: "text-sage-600 hover:text-sage-800 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b15e36ac${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-b15e36ac${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5",
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
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-sage-800" data-v-b15e36ac${_scopeId}>Add Petty Cash Transaction</h1></div><div class="flex items-center justify-between" data-v-b15e36ac${_scopeId}><p class="text-sm text-sage-600" data-v-b15e36ac${_scopeId}>Create a new petty cash transaction</p><div class="text-right" data-v-b15e36ac${_scopeId}><div class="text-xs text-sage-500" data-v-b15e36ac${_scopeId}>Current Balance</div><div class="text-lg font-bold text-sage-800" data-v-b15e36ac${_scopeId}>${ssrInterpolate(formatCurrency(currentBalanceLocal.value))}</div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6" data-v-b15e36ac${_scopeId}><form class="space-y-6" data-v-b15e36ac${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-b15e36ac${_scopeId}><div data-v-b15e36ac${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-b15e36ac${_scopeId}> Transaction Date <span class="text-red-500" data-v-b15e36ac${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).transaction_date)} type="date"${ssrRenderAttr("max", today.value)} class="${ssrRenderClass([{ "border-red-300": errors.value.transaction_date }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-b15e36ac${_scopeId}>`);
            if (errors.value.transaction_date) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-b15e36ac${_scopeId}>${ssrInterpolate(errors.value.transaction_date)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b15e36ac${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-b15e36ac${_scopeId}> Transaction Type <span class="text-red-500" data-v-b15e36ac${_scopeId}>*</span></label><select class="${ssrRenderClass([{ "border-red-300": errors.value.type }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-b15e36ac${_scopeId}><option value="" data-v-b15e36ac${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "") : ssrLooseEqual(unref(form).type, "")) ? " selected" : ""}${_scopeId}>Select Transaction Type</option><option value="expense" data-v-b15e36ac${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "expense") : ssrLooseEqual(unref(form).type, "expense")) ? " selected" : ""}${_scopeId}>Expense</option><option value="topup" data-v-b15e36ac${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "topup") : ssrLooseEqual(unref(form).type, "topup")) ? " selected" : ""}${_scopeId}>Top Up</option><option value="refund" data-v-b15e36ac${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "refund") : ssrLooseEqual(unref(form).type, "refund")) ? " selected" : ""}${_scopeId}>Refund</option><option value="opening" data-v-b15e36ac${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "opening") : ssrLooseEqual(unref(form).type, "opening")) ? " selected" : ""}${_scopeId}>Opening Balance</option></select>`);
            if (errors.value.type) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-b15e36ac${_scopeId}>${ssrInterpolate(errors.value.type)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-b15e36ac${_scopeId}><div data-v-b15e36ac${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-b15e36ac${_scopeId}> Category `);
            if (unref(form).type === "expense") {
              _push2(`<span class="text-red-500" data-v-b15e36ac${_scopeId}>*</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).category_id,
              "onUpdate:modelValue": ($event) => unref(form).category_id = $event,
              options: categorySelectOptions.value,
              placeholder: "Select category",
              "search-fields": ["label"],
              "input-class": categoryInputClass.value,
              disabled: unref(form).type !== "expense"
            }, null, _parent2, _scopeId));
            if (errors.value.category_id) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-b15e36ac${_scopeId}>${ssrInterpolate(errors.value.category_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).type !== "expense") {
              _push2(`<p class="mt-1 text-xs text-sage-500" data-v-b15e36ac${_scopeId}> Category is only for expense transactions </p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).type === "opening") {
              _push2(`<p class="mt-1 text-xs text-sage-500" data-v-b15e36ac${_scopeId}> Opening balance does not require category. </p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b15e36ac${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-b15e36ac${_scopeId}> Expense Account (P&amp;L) `);
            if (unref(form).type === "expense") {
              _push2(`<span class="text-red-500" data-v-b15e36ac${_scopeId}>*</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).pl_account_id,
              "onUpdate:modelValue": ($event) => unref(form).pl_account_id = $event,
              options: plAccountOptions.value,
              placeholder: "Select Account",
              "input-class": plAccountInputClass.value,
              disabled: unref(form).type !== "expense",
              "search-fields": ["label", "code", "name"]
            }, null, _parent2, _scopeId));
            if (errors.value.pl_account_id) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-b15e36ac${_scopeId}>${ssrInterpolate(errors.value.pl_account_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).type !== "expense") {
              _push2(`<p class="mt-1 text-xs text-sage-500" data-v-b15e36ac${_scopeId}> P&amp;L account is only for expense transactions </p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).type === "opening") {
              _push2(`<p class="mt-1 text-xs text-sage-500" data-v-b15e36ac${_scopeId}> Opening balance does not affect P&amp;L. </p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b15e36ac${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-b15e36ac${_scopeId}> Bank Source `);
            if (["topup", "refund"].includes(unref(form).type)) {
              _push2(`<span class="text-red-500" data-v-b15e36ac${_scopeId}>*</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label><select${ssrIncludeBooleanAttr(!["topup", "refund"].includes(unref(form).type)) ? " disabled" : ""} class="${ssrRenderClass([{ "border-red-300": errors.value.bank_account_id }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-b15e36ac${_scopeId}><option value="" data-v-b15e36ac${ssrIncludeBooleanAttr(Array.isArray(unref(form).bank_account_id) ? ssrLooseContain(unref(form).bank_account_id, "") : ssrLooseEqual(unref(form).bank_account_id, "")) ? " selected" : ""}${_scopeId}>Select Bank</option><!--[-->`);
            ssrRenderList(__props.bankAccounts, (bank) => {
              _push2(`<option${ssrRenderAttr("value", bank.id)} data-v-b15e36ac${ssrIncludeBooleanAttr(Array.isArray(unref(form).bank_account_id) ? ssrLooseContain(unref(form).bank_account_id, bank.id) : ssrLooseEqual(unref(form).bank_account_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} • ${ssrInterpolate(bank.account_number)} (${ssrInterpolate(bank.account_name)}) </option>`);
            });
            _push2(`<!--]--></select>`);
            if (errors.value.bank_account_id) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-b15e36ac${_scopeId}>${ssrInterpolate(errors.value.bank_account_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (["topup", "refund"].includes(unref(form).type)) {
              _push2(`<p class="mt-1 text-xs text-sage-500" data-v-b15e36ac${_scopeId}> Bank balance will decrease by the top up/refund amount. </p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).type === "opening") {
              _push2(`<p class="mt-1 text-xs text-sage-500" data-v-b15e36ac${_scopeId}> Opening balance is recorded without bank transaction. </p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b15e36ac${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-b15e36ac${_scopeId}> Amount (Rp) <span class="text-red-500" data-v-b15e36ac${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).amount)} type="number" step="0.01" min="0" placeholder="0" class="${ssrRenderClass([{ "border-red-300": errors.value.amount }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-b15e36ac${_scopeId}>`);
            if (errors.value.amount) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-b15e36ac${_scopeId}>${ssrInterpolate(errors.value.amount)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).amount && unref(form).type === "expense") {
              _push2(`<div class="${ssrRenderClass([willBeNegative.value ? "text-red-500" : "text-sage-500", "mt-1 text-xs"])}" data-v-b15e36ac${_scopeId}> Balance after transaction: ${ssrInterpolate(formatCurrency(projectedBalance.value))} `);
              if (willBeNegative.value) {
                _push2(`<span class="font-medium" data-v-b15e36ac${_scopeId}>(Balance will be negative!)</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(form).amount && unref(form).type !== "expense") {
              _push2(`<div class="mt-1 text-xs text-sage-500" data-v-b15e36ac${_scopeId}> Balance after transaction: ${ssrInterpolate(formatCurrency(projectedBalance.value))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-b15e36ac${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-b15e36ac${_scopeId}> Description <span class="text-red-500" data-v-b15e36ac${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).description)} type="text" placeholder="Enter transaction description" class="${ssrRenderClass([{ "border-red-300": errors.value.description }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-b15e36ac${_scopeId}>`);
            if (errors.value.description) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-b15e36ac${_scopeId}>${ssrInterpolate(errors.value.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b15e36ac${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-b15e36ac${_scopeId}> Sales Order Number (Optional) </label><input${ssrRenderAttr("value", unref(form).so_number)} type="text" placeholder="Example: SO-2024-001" class="${ssrRenderClass([{ "border-red-300": errors.value.so_number }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-b15e36ac${_scopeId}>`);
            if (errors.value.so_number) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-b15e36ac${_scopeId}>${ssrInterpolate(errors.value.so_number)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b15e36ac${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-b15e36ac${_scopeId}> Notes (Optional) </label><textarea rows="3" placeholder="Additional notes for this transaction" class="${ssrRenderClass([{ "border-red-300": errors.value.notes }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"])}" data-v-b15e36ac${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea>`);
            if (errors.value.notes) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-b15e36ac${_scopeId}>${ssrInterpolate(errors.value.notes)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b15e36ac${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-b15e36ac${_scopeId}> Receipt File (Optional) </label><input type="file" accept=".jpg,.jpeg,.png,.pdf" class="${ssrRenderClass([{ "border-red-300": errors.value.receipt_file }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-b15e36ac${_scopeId}><p class="mt-1 text-xs text-sage-500" data-v-b15e36ac${_scopeId}> Max 2MB. Supported formats: JPG, PNG, PDF </p>`);
            if (errors.value.receipt_file) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-b15e36ac${_scopeId}>${ssrInterpolate(errors.value.receipt_file)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end space-x-3 pt-4 border-t border-sage-200" data-v-b15e36ac${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.petty-cash.index"),
              class: "px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(isDisabled.value) ? " disabled" : ""} class="${ssrRenderClass([willBeNegative.value ? "bg-red-600 hover:bg-red-700" : "bg-sage-600 hover:bg-sage-700", "px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"])}" data-v-b15e36ac${_scopeId}>`);
            if (processing.value) {
              _push2(`<span class="flex items-center" data-v-b15e36ac${_scopeId}><svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" data-v-b15e36ac${_scopeId}><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" data-v-b15e36ac${_scopeId}></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" class="opacity-75" data-v-b15e36ac${_scopeId}></path></svg> Saving... </span>`);
            } else {
              _push2(`<span data-v-b15e36ac${_scopeId}>${ssrInterpolate(willBeNegative.value ? "Save (Negative Balance!)" : "Save Transaction")}</span>`);
            }
            _push2(`</button></div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 max-w-4xl mx-auto" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("div", { class: "flex items-center space-x-4 mb-2" }, [
                    createVNode(unref(Link), {
                      href: unref(route)("admin-keuangan.petty-cash.index"),
                      class: "text-sage-600 hover:text-sage-800 transition-colors"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5",
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
                        ]))
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, "Add Petty Cash Transaction")
                  ]),
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("p", { class: "text-sm text-sage-600" }, "Create a new petty cash transaction"),
                    createVNode("div", { class: "text-right" }, [
                      createVNode("div", { class: "text-xs text-sage-500" }, "Current Balance"),
                      createVNode("div", { class: "text-lg font-bold text-sage-800" }, toDisplayString(formatCurrency(currentBalanceLocal.value)), 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Transaction Date "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).transaction_date = $event,
                          type: "date",
                          max: today.value,
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": errors.value.transaction_date }]
                        }, null, 10, ["onUpdate:modelValue", "max"]), [
                          [vModelText, unref(form).transaction_date]
                        ]),
                        errors.value.transaction_date ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(errors.value.transaction_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Transaction Type "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).type = $event,
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": errors.value.type }]
                        }, [
                          createVNode("option", { value: "" }, "Select Transaction Type"),
                          createVNode("option", { value: "expense" }, "Expense"),
                          createVNode("option", { value: "topup" }, "Top Up"),
                          createVNode("option", { value: "refund" }, "Refund"),
                          createVNode("option", { value: "opening" }, "Opening Balance")
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).type]
                        ]),
                        errors.value.type ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(errors.value.type), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Category "),
                          unref(form).type === "expense" ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-red-500"
                          }, "*")) : createCommentVNode("", true)
                        ]),
                        createVNode(_sfc_main$1, {
                          modelValue: unref(form).category_id,
                          "onUpdate:modelValue": ($event) => unref(form).category_id = $event,
                          options: categorySelectOptions.value,
                          placeholder: "Select category",
                          "search-fields": ["label"],
                          "input-class": categoryInputClass.value,
                          disabled: unref(form).type !== "expense"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class", "disabled"]),
                        errors.value.category_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(errors.value.category_id), 1)) : createCommentVNode("", true),
                        unref(form).type !== "expense" ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "mt-1 text-xs text-sage-500"
                        }, " Category is only for expense transactions ")) : createCommentVNode("", true),
                        unref(form).type === "opening" ? (openBlock(), createBlock("p", {
                          key: 2,
                          class: "mt-1 text-xs text-sage-500"
                        }, " Opening balance does not require category. ")) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Expense Account (P&L) "),
                          unref(form).type === "expense" ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-red-500"
                          }, "*")) : createCommentVNode("", true)
                        ]),
                        createVNode(_sfc_main$1, {
                          modelValue: unref(form).pl_account_id,
                          "onUpdate:modelValue": ($event) => unref(form).pl_account_id = $event,
                          options: plAccountOptions.value,
                          placeholder: "Select Account",
                          "input-class": plAccountInputClass.value,
                          disabled: unref(form).type !== "expense",
                          "search-fields": ["label", "code", "name"]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class", "disabled"]),
                        errors.value.pl_account_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(errors.value.pl_account_id), 1)) : createCommentVNode("", true),
                        unref(form).type !== "expense" ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "mt-1 text-xs text-sage-500"
                        }, " P&L account is only for expense transactions ")) : createCommentVNode("", true),
                        unref(form).type === "opening" ? (openBlock(), createBlock("p", {
                          key: 2,
                          class: "mt-1 text-xs text-sage-500"
                        }, " Opening balance does not affect P&L. ")) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Bank Source "),
                          ["topup", "refund"].includes(unref(form).type) ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-red-500"
                          }, "*")) : createCommentVNode("", true)
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).bank_account_id = $event,
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": errors.value.bank_account_id }],
                          disabled: !["topup", "refund"].includes(unref(form).type)
                        }, [
                          createVNode("option", { value: "" }, "Select Bank"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.bankAccounts, (bank) => {
                            return openBlock(), createBlock("option", {
                              key: bank.id,
                              value: bank.id
                            }, toDisplayString(bank.bank_name) + " • " + toDisplayString(bank.account_number) + " (" + toDisplayString(bank.account_name) + ") ", 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue", "disabled"]), [
                          [vModelSelect, unref(form).bank_account_id]
                        ]),
                        errors.value.bank_account_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(errors.value.bank_account_id), 1)) : createCommentVNode("", true),
                        ["topup", "refund"].includes(unref(form).type) ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "mt-1 text-xs text-sage-500"
                        }, " Bank balance will decrease by the top up/refund amount. ")) : createCommentVNode("", true),
                        unref(form).type === "opening" ? (openBlock(), createBlock("p", {
                          key: 2,
                          class: "mt-1 text-xs text-sage-500"
                        }, " Opening balance is recorded without bank transaction. ")) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Amount (Rp) "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                          type: "number",
                          step: "0.01",
                          min: "0",
                          placeholder: "0",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": errors.value.amount }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).amount]
                        ]),
                        errors.value.amount ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(errors.value.amount), 1)) : createCommentVNode("", true),
                        unref(form).amount && unref(form).type === "expense" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: ["mt-1 text-xs", willBeNegative.value ? "text-red-500" : "text-sage-500"]
                        }, [
                          createTextVNode(" Balance after transaction: " + toDisplayString(formatCurrency(projectedBalance.value)) + " ", 1),
                          willBeNegative.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "font-medium"
                          }, "(Balance will be negative!)")) : createCommentVNode("", true)
                        ], 2)) : unref(form).amount && unref(form).type !== "expense" ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "mt-1 text-xs text-sage-500"
                        }, " Balance after transaction: " + toDisplayString(formatCurrency(projectedBalance.value)), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                        createTextVNode(" Description "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        type: "text",
                        placeholder: "Enter transaction description",
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": errors.value.description }]
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ]),
                      errors.value.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(errors.value.description), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Sales Order Number (Optional) "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).so_number = $event,
                        type: "text",
                        placeholder: "Example: SO-2024-001",
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": errors.value.so_number }]
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).so_number]
                      ]),
                      errors.value.so_number ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(errors.value.so_number), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Notes (Optional) "),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                        rows: "3",
                        placeholder: "Additional notes for this transaction",
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none", { "border-red-300": errors.value.notes }]
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).notes]
                      ]),
                      errors.value.notes ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(errors.value.notes), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Receipt File (Optional) "),
                      createVNode("input", {
                        ref_key: "fileInput",
                        ref: fileInput,
                        type: "file",
                        accept: ".jpg,.jpeg,.png,.pdf",
                        onChange: handleFileChange,
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": errors.value.receipt_file }]
                      }, null, 34),
                      createVNode("p", { class: "mt-1 text-xs text-sage-500" }, " Max 2MB. Supported formats: JPG, PNG, PDF "),
                      errors.value.receipt_file ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(errors.value.receipt_file), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3 pt-4 border-t border-sage-200" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.petty-cash.index"),
                        class: "px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Cancel ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: isDisabled.value,
                        class: ["px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed", willBeNegative.value ? "bg-red-600 hover:bg-red-700" : "bg-sage-600 hover:bg-sage-700"]
                      }, [
                        processing.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "flex items-center"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "animate-spin -ml-1 mr-2 h-4 w-4",
                            fill: "none",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("circle", {
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              "stroke-width": "4",
                              class: "opacity-25"
                            }),
                            createVNode("path", {
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                              class: "opacity-75"
                            })
                          ])),
                          createTextVNode(" Saving... ")
                        ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(willBeNegative.value ? "Save (Negative Balance!)" : "Save Transaction"), 1))
                      ], 10, ["disabled"])
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/PettyCash/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b15e36ac"]]);
export {
  Create as default
};
