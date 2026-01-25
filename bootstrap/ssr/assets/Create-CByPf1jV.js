import { ref, computed, watch, withCtx, unref, createBlock, openBlock, createVNode, createTextVNode, withModifiers, withDirectives, createCommentVNode, vModelText, toDisplayString, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { Plus, Trash2, DollarSign } from "lucide-vue-next";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BXHi-kqO.js";
import { _ as _sfc_main$1 } from "./SearchableSelect-DfkOp0gQ.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    bankAccounts: {
      type: Array,
      default: () => []
    },
    expenseAccounts: {
      type: Array,
      default: () => []
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const getCurrentDate = () => {
      return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    };
    const form = useForm({
      expense_date: getCurrentDate(),
      category: "",
      status: "draft",
      notes: "",
      bank_account_id: "",
      pl_account_id: "",
      items: [
        {
          description: "",
          amount: "",
          notes: ""
        }
      ]
    });
    const processing = ref(false);
    const bankAccounts = computed(() => props.bankAccounts ?? []);
    const expenseAccounts = computed(() => props.expenseAccounts ?? []);
    const plAccountOptions = computed(
      () => expenseAccounts.value.map((account) => ({
        value: account.id,
        label: `${account.account_code} - ${account.account_name}`,
        code: account.account_code,
        name: account.account_name
      }))
    );
    watch(
      bankAccounts,
      (options) => {
        if (!form.bank_account_id && options.length > 0) {
          form.bank_account_id = options[0].id;
        }
      },
      { immediate: true }
    );
    const errors = ref(props.errors);
    watch(
      expenseAccounts,
      (options) => {
        if (!form.pl_account_id && options.length > 0) {
          form.pl_account_id = options[0].id;
        }
      },
      { immediate: true }
    );
    const categoryOptions = computed(() => props.categories ?? []);
    const categorySelectOptions = computed(
      () => categoryOptions.value.map((category) => ({
        label: category,
        value: category
      }))
    );
    const plAccountInputClass = computed(() => {
      var _a;
      const base = "w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm";
      const error = ((_a = errors.value) == null ? void 0 : _a.pl_account_id) ? " border-red-300" : " border-sage-300";
      return `${base}${error}`;
    });
    const categoryInputClass = computed(() => {
      var _a;
      const base = "w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm";
      const error = ((_a = errors.value) == null ? void 0 : _a.category) ? " border-red-300" : " border-sage-300";
      const disabled = categoryOptions.value.length === 0 ? " bg-gray-100 cursor-not-allowed pointer-events-none" : "";
      return `${base}${error}${disabled}`;
    });
    watch(
      categoryOptions,
      (options) => {
        if (!form.category && options.length > 0) {
          form.category = options[0];
        }
      },
      { immediate: true }
    );
    const calculatedTotal = computed(() => {
      return form.items.reduce((total, item) => {
        return total + (parseFloat(item.amount) || 0);
      }, 0);
    });
    const isDisabled = computed(() => {
      if (processing.value) return true;
      if (categoryOptions.value.length === 0) return true;
      if (!form.expense_date || !form.category || !form.status || !form.pl_account_id) return true;
      if (!form.items || form.items.length === 0) return true;
      const hasValidItems = form.items.every((item) => item.description && parseFloat(item.amount) > 0);
      if (!hasValidItems) return true;
      if (calculatedTotal.value <= 0) return true;
      if (form.status === "approved" && !form.bank_account_id) return true;
      return false;
    });
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const formatCurrentPeriod = () => {
      if (!form.expense_date) return "";
      const date = new Date(form.expense_date);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    };
    const addItem = () => {
      form.items.push({
        description: "",
        amount: "",
        notes: ""
      });
    };
    const removeItem = (index) => {
      if (form.items.length > 1) {
        form.items.splice(index, 1);
      }
    };
    const calculateTotal = () => {
    };
    const submitForm = () => {
      processing.value = true;
      form.total_amount = calculatedTotal.value;
      form.post(route("admin-keuangan.general-expenses.store"), {
        onSuccess: () => {
          processing.value = false;
        },
        onError: (formErrors) => {
          processing.value = false;
          errors.value = formErrors;
        }
      });
    };
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.general-expenses.index": "/admin-keuangan/general-expenses",
        "admin-keuangan.general-expenses.store": "/admin-keuangan/general-expenses"
      };
      return routes[name] || "#";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Add General Expense" }, null, _parent2, _scopeId));
            _push2(`<div class="p-6 max-w-6xl mx-auto"${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center space-x-4 mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.general-expenses.index"),
              class: "text-sage-600 hover:text-sage-800 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId2}></path></svg>`);
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
            _push2(`<h1 class="text-2xl font-bold text-sage-800"${_scopeId}>Add General Expense</h1></div><p class="text-sm text-sage-600"${_scopeId}>Create a new non-SO, non-petty cash expense</p></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Expense Date <span class="text-red-500"${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).expense_date)} type="date" class="${ssrRenderClass([{ "border-red-300": errors.value.expense_date }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}"${_scopeId}>`);
            if (errors.value.expense_date) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(errors.value.expense_date)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Category <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).category,
              "onUpdate:modelValue": ($event) => unref(form).category = $event,
              options: categorySelectOptions.value,
              placeholder: "Search categories...",
              "label-field": "label",
              "value-field": "value",
              "search-fields": ["label"],
              "input-class": categoryInputClass.value
            }, null, _parent2, _scopeId));
            if (categoryOptions.value.length === 0) {
              _push2(`<p class="mt-1 text-sm text-sage-500"${_scopeId}> No active categories. Please add categories in the Operational Cost Categories master first. </p>`);
            } else {
              _push2(`<!---->`);
            }
            if (errors.value.category) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(errors.value.category)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Status <span class="text-red-500"${_scopeId}>*</span></label><select class="${ssrRenderClass([{ "border-red-300": errors.value.status }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}"${_scopeId}><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "draft") : ssrLooseEqual(unref(form).status, "draft")) ? " selected" : ""}${_scopeId}>Draft</option><option value="approved"${ssrIncludeBooleanAttr(Array.isArray(unref(form).status) ? ssrLooseContain(unref(form).status, "approved") : ssrLooseEqual(unref(form).status, "approved")) ? " selected" : ""}${_scopeId}>Approved</option></select>`);
            if (errors.value.status) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(errors.value.status)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Notes (Optional) </label><textarea rows="3" placeholder="General notes for this expense" class="${ssrRenderClass([{ "border-red-300": errors.value.notes }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"])}"${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea>`);
            if (errors.value.notes) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(errors.value.notes)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Expense Account (P&amp;L) <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).pl_account_id,
              "onUpdate:modelValue": ($event) => unref(form).pl_account_id = $event,
              options: plAccountOptions.value,
              placeholder: "Search accounts...",
              "label-field": "label",
              "value-field": "value",
              "search-fields": ["label", "code", "name"],
              "input-class": plAccountInputClass.value
            }, null, _parent2, _scopeId));
            if (errors.value.pl_account_id) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(errors.value.pl_account_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-xs text-sage-500"${_scopeId}> This expense will be recorded to this account in the profit &amp; loss report. </p></div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Source Bank `);
            if (unref(form).status === "approved") {
              _push2(`<span class="text-red-500"${_scopeId}>*</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label><select class="${ssrRenderClass([{ "border-red-300": errors.value.bank_account_id }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).bank_account_id) ? ssrLooseContain(unref(form).bank_account_id, "") : ssrLooseEqual(unref(form).bank_account_id, "")) ? " selected" : ""}${_scopeId}>Select Bank</option><!--[-->`);
            ssrRenderList(bankAccounts.value, (bank) => {
              _push2(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).bank_account_id) ? ssrLooseContain(unref(form).bank_account_id, bank.id) : ssrLooseEqual(unref(form).bank_account_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} • ${ssrInterpolate(bank.account_number)} (${ssrInterpolate(bank.account_name)}) </option>`);
            });
            _push2(`<!--]--></select>`);
            if (errors.value.bank_account_id) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(errors.value.bank_account_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-xs text-sage-500"${_scopeId}> When status is Approved, the expense will automatically debit the selected bank balance. </p></div><div class="border-t border-sage-200 pt-6"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h3 class="text-lg font-medium text-sage-800"${_scopeId}>Expense Item Details</h3><button type="button" class="inline-flex items-center px-3 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Add Item </button></div><div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).items, (item, index) => {
              _push2(`<div class="p-4 border border-sage-200 rounded-lg bg-white"${_scopeId}><div class="flex justify-between items-start mb-4"${_scopeId}><h4 class="text-sm font-medium text-sage-700"${_scopeId}>Item #${ssrInterpolate(index + 1)}</h4>`);
              if (unref(form).items.length > 1) {
                _push2(`<button type="button" class="text-red-600 hover:text-red-800 transition-colors" title="Delete Item"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Description <span class="text-red-500"${_scopeId}>*</span></label><input${ssrRenderAttr("value", item.description)} type="text" placeholder="Example: Bank Admin Fee for January" class="${ssrRenderClass([{ "border-red-300": errors.value[`items.${index}.description`] }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}"${_scopeId}>`);
              if (errors.value[`items.${index}.description`]) {
                _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(errors.value[`items.${index}.description`])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Amount (Rp) <span class="text-red-500"${_scopeId}>*</span></label><input${ssrRenderAttr("value", item.amount)} type="number" step="0.01" min="0" placeholder="0" class="${ssrRenderClass([{ "border-red-300": errors.value[`items.${index}.amount`] }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}"${_scopeId}>`);
              if (errors.value[`items.${index}.amount`]) {
                _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(errors.value[`items.${index}.amount`])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="mt-4"${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Item Notes (Optional) </label><textarea rows="2" placeholder="Notes for this item" class="${ssrRenderClass([{ "border-red-300": errors.value[`items.${index}.notes`] }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"])}"${_scopeId}>${ssrInterpolate(item.notes)}</textarea>`);
              if (errors.value[`items.${index}.notes`]) {
                _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(errors.value[`items.${index}.notes`])}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            });
            _push2(`<!--]-->`);
            if (unref(form).items.length === 0) {
              _push2(`<div class="text-center py-8 text-gray-500"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(DollarSign), { class: "w-12 h-12 mx-auto mb-4 text-gray-300" }, null, _parent2, _scopeId));
              _push2(`<p class="text-sm"${_scopeId}>No expense items yet</p><p class="text-xs mt-1"${_scopeId}>Click &quot;Add Item&quot; to add an expense item</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(form).items.length > 0) {
              _push2(`<div class="mt-6 p-4 bg-white border border-sage-200 rounded-lg"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span class="text-sm font-medium text-sage-700"${_scopeId}>Total Amount:</span><span class="text-lg font-bold text-sage-800"${_scopeId}>${ssrInterpolate(formatCurrency(calculatedTotal.value))}</span></div><div class="flex justify-between items-center mt-1"${_scopeId}><span class="text-xs text-sage-600"${_scopeId}>${ssrInterpolate(unref(form).items.length)} item${ssrInterpolate(unref(form).items.length > 1 ? "s" : "")}</span><span class="text-xs text-sage-600"${_scopeId}>Period: ${ssrInterpolate(formatCurrentPeriod())}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end space-x-3 pt-4 border-t border-sage-200"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.general-expenses.index"),
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(isDisabled.value) ? " disabled" : ""} class="px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-lg hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"${_scopeId}>`);
            if (processing.value) {
              _push2(`<span${_scopeId}>Saving...</span>`);
            } else {
              _push2(`<span${_scopeId}>Save Expense</span>`);
            }
            _push2(`</button></div></form></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Add General Expense" }),
              createVNode("div", { class: "p-6 max-w-6xl mx-auto" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("div", { class: "flex items-center space-x-4 mb-2" }, [
                    createVNode(unref(Link), {
                      href: unref(route)("admin-keuangan.general-expenses.index"),
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
                    createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, "Add General Expense")
                  ]),
                  createVNode("p", { class: "text-sm text-sage-600" }, "Create a new non-SO, non-petty cash expense")
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Expense Date "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).expense_date = $event,
                          type: "date",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": errors.value.expense_date }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).expense_date]
                        ]),
                        errors.value.expense_date ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(errors.value.expense_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Category "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode(_sfc_main$1, {
                          modelValue: unref(form).category,
                          "onUpdate:modelValue": ($event) => unref(form).category = $event,
                          options: categorySelectOptions.value,
                          placeholder: "Search categories...",
                          "label-field": "label",
                          "value-field": "value",
                          "search-fields": ["label"],
                          "input-class": categoryInputClass.value
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class"]),
                        categoryOptions.value.length === 0 ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-sage-500"
                        }, " No active categories. Please add categories in the Operational Cost Categories master first. ")) : createCommentVNode("", true),
                        errors.value.category ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(errors.value.category), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Status "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).status = $event,
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": errors.value.status }]
                        }, [
                          createVNode("option", { value: "draft" }, "Draft"),
                          createVNode("option", { value: "approved" }, "Approved")
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).status]
                        ]),
                        errors.value.status ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(errors.value.status), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Notes (Optional) "),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                        rows: "3",
                        placeholder: "General notes for this expense",
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
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                        createTextVNode(" Expense Account (P&L) "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode(_sfc_main$1, {
                        modelValue: unref(form).pl_account_id,
                        "onUpdate:modelValue": ($event) => unref(form).pl_account_id = $event,
                        options: plAccountOptions.value,
                        placeholder: "Search accounts...",
                        "label-field": "label",
                        "value-field": "value",
                        "search-fields": ["label", "code", "name"],
                        "input-class": plAccountInputClass.value
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class"]),
                      errors.value.pl_account_id ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(errors.value.pl_account_id), 1)) : createCommentVNode("", true),
                      createVNode("p", { class: "mt-1 text-xs text-sage-500" }, " This expense will be recorded to this account in the profit & loss report. ")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                        createTextVNode(" Source Bank "),
                        unref(form).status === "approved" ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "text-red-500"
                        }, "*")) : createCommentVNode("", true)
                      ]),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).bank_account_id = $event,
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": errors.value.bank_account_id }]
                      }, [
                        createVNode("option", { value: "" }, "Select Bank"),
                        (openBlock(true), createBlock(Fragment, null, renderList(bankAccounts.value, (bank) => {
                          return openBlock(), createBlock("option", {
                            key: bank.id,
                            value: bank.id
                          }, toDisplayString(bank.bank_name) + " • " + toDisplayString(bank.account_number) + " (" + toDisplayString(bank.account_name) + ") ", 9, ["value"]);
                        }), 128))
                      ], 10, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).bank_account_id]
                      ]),
                      errors.value.bank_account_id ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(errors.value.bank_account_id), 1)) : createCommentVNode("", true),
                      createVNode("p", { class: "mt-1 text-xs text-sage-500" }, " When status is Approved, the expense will automatically debit the selected bank balance. ")
                    ]),
                    createVNode("div", { class: "border-t border-sage-200 pt-6" }, [
                      createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                        createVNode("h3", { class: "text-lg font-medium text-sage-800" }, "Expense Item Details"),
                        createVNode("button", {
                          type: "button",
                          onClick: addItem,
                          class: "inline-flex items-center px-3 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                        }, [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Add Item ")
                        ])
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(form).items, (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: index,
                            class: "p-4 border border-sage-200 rounded-lg bg-white"
                          }, [
                            createVNode("div", { class: "flex justify-between items-start mb-4" }, [
                              createVNode("h4", { class: "text-sm font-medium text-sage-700" }, "Item #" + toDisplayString(index + 1), 1),
                              unref(form).items.length > 1 ? (openBlock(), createBlock("button", {
                                key: 0,
                                type: "button",
                                onClick: ($event) => removeItem(index),
                                class: "text-red-600 hover:text-red-800 transition-colors",
                                title: "Delete Item"
                              }, [
                                createVNode(unref(Trash2), { class: "w-4 h-4" })
                              ], 8, ["onClick"])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                                  createTextVNode(" Description "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.description = $event,
                                  type: "text",
                                  placeholder: "Example: Bank Admin Fee for January",
                                  class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": errors.value[`items.${index}.description`] }]
                                }, null, 10, ["onUpdate:modelValue"]), [
                                  [vModelText, item.description]
                                ]),
                                errors.value[`items.${index}.description`] ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "mt-1 text-sm text-red-600"
                                }, toDisplayString(errors.value[`items.${index}.description`]), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                                  createTextVNode(" Amount (Rp) "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.amount = $event,
                                  type: "number",
                                  step: "0.01",
                                  min: "0",
                                  placeholder: "0",
                                  onInput: calculateTotal,
                                  class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": errors.value[`items.${index}.amount`] }]
                                }, null, 42, ["onUpdate:modelValue"]), [
                                  [vModelText, item.amount]
                                ]),
                                errors.value[`items.${index}.amount`] ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "mt-1 text-sm text-red-600"
                                }, toDisplayString(errors.value[`items.${index}.amount`]), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("div", { class: "mt-4" }, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Item Notes (Optional) "),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => item.notes = $event,
                                rows: "2",
                                placeholder: "Notes for this item",
                                class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none", { "border-red-300": errors.value[`items.${index}.notes`] }]
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [vModelText, item.notes]
                              ]),
                              errors.value[`items.${index}.notes`] ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "mt-1 text-sm text-red-600"
                              }, toDisplayString(errors.value[`items.${index}.notes`]), 1)) : createCommentVNode("", true)
                            ])
                          ]);
                        }), 128)),
                        unref(form).items.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center py-8 text-gray-500"
                        }, [
                          createVNode(unref(DollarSign), { class: "w-12 h-12 mx-auto mb-4 text-gray-300" }),
                          createVNode("p", { class: "text-sm" }, "No expense items yet"),
                          createVNode("p", { class: "text-xs mt-1" }, 'Click "Add Item" to add an expense item')
                        ])) : createCommentVNode("", true)
                      ]),
                      unref(form).items.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 p-4 bg-white border border-sage-200 rounded-lg"
                      }, [
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("span", { class: "text-sm font-medium text-sage-700" }, "Total Amount:"),
                          createVNode("span", { class: "text-lg font-bold text-sage-800" }, toDisplayString(formatCurrency(calculatedTotal.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between items-center mt-1" }, [
                          createVNode("span", { class: "text-xs text-sage-600" }, toDisplayString(unref(form).items.length) + " item" + toDisplayString(unref(form).items.length > 1 ? "s" : ""), 1),
                          createVNode("span", { class: "text-xs text-sage-600" }, "Period: " + toDisplayString(formatCurrentPeriod()), 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3 pt-4 border-t border-sage-200" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.general-expenses.index"),
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
                        class: "px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-lg hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      }, [
                        processing.value ? (openBlock(), createBlock("span", { key: 0 }, "Saving...")) : (openBlock(), createBlock("span", { key: 1 }, "Save Expense"))
                      ], 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/GeneralExpenses/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
