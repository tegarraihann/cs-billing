import { computed, watch, withCtx, unref, createTextVNode, createVNode, withModifiers, createBlock, createCommentVNode, withDirectives, openBlock, Fragment, renderList, toDisplayString, vModelSelect, vModelText, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BXHi-kqO.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    typeOptions: Array,
    bankAccounts: Array
  },
  setup(__props) {
    const typeConfigMap = {
      paid_in_capital: {
        bankAllowed: true,
        bankHint: "Paid-in capital usually increases bank balance (credit).",
        helper: "Use this for shareholder capital injections."
      },
      retained_earnings: {
        bankAllowed: false,
        bankHint: "Retained earnings are recorded without bank movement.",
        helper: "Record retained earnings adjustments here."
      },
      current_year_profit: {
        bankAllowed: false,
        bankHint: "Current year profit is recorded without bank movement.",
        helper: "Manual adjustments for current year profit."
      },
      dividend_prive: {
        bankAllowed: true,
        bankHint: "Dividends and prive reduce equity and usually decrease bank balance (debit).",
        helper: "Owner withdrawals or dividend distributions."
      },
      management_loan: {
        bankAllowed: true,
        bankHint: "Kasbon disbursement reduces bank balance (debit).",
        helper: "Use when the company gives a cash advance to staff or management."
      },
      management_loan_repayment: {
        bankAllowed: true,
        bankHint: "Kasbon repayment increases bank balance (credit).",
        helper: "Use when staff or management pays back the receivable (can be partial)."
      },
      deferred_liability: {
        bankAllowed: true,
        bankHint: "Deferred liabilities can be settled into bank balance (credit).",
        helper: "Record deferred liabilities and settle later."
      },
      annual_closing: {
        bankAllowed: false,
        bankHint: "Annual closing transfers current year profit to retained earnings.",
        helper: "Creates retained earnings increase and current year profit reduction."
      }
    };
    const form = useForm({
      entry_type: "",
      entry_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      payment_date: "",
      amount: "",
      reference: "",
      employee_name: "",
      notes: "",
      is_opening: false,
      affects_bank: false,
      bank_account_id: ""
    });
    const selectedConfig = computed(() => typeConfigMap[form.entry_type] || { bankAllowed: false, bankHint: "" });
    const needsEmployeeName = computed(() => ["management_loan", "management_loan_repayment"].includes(form.entry_type));
    const needsPaymentDate = computed(() => form.entry_type === "management_loan_repayment");
    watch(
      () => form.entry_type,
      () => {
        if (!selectedConfig.value.bankAllowed) {
          form.affects_bank = false;
          form.bank_account_id = "";
        }
        if (!needsEmployeeName.value) {
          form.employee_name = "";
        }
        if (!needsPaymentDate.value) {
          form.payment_date = "";
        } else if (!form.payment_date) {
          form.payment_date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
        }
      }
    );
    const submitForm = () => {
      form.post(route("admin-keuangan.equity.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Create Equity Entry" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Create Equity Entry</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Record equity movements and owner-related balances</p></div><div class="bg-white shadow rounded-lg"${_scopeId}><form class="px-6 py-6 space-y-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Equity Type</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" required${_scopeId}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(form).entry_type) ? ssrLooseContain(unref(form).entry_type, "") : ssrLooseEqual(unref(form).entry_type, "")) ? " selected" : ""}${_scopeId}>Select type</option><!--[-->`);
            ssrRenderList(__props.typeOptions, (option) => {
              _push2(`<option${ssrRenderAttr("value", option.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).entry_type) ? ssrLooseContain(unref(form).entry_type, option.value) : ssrLooseEqual(unref(form).entry_type, option.value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(option.label)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (selectedConfig.value.helper) {
              _push2(`<p class="text-xs text-gray-500 mt-2"${_scopeId}>${ssrInterpolate(selectedConfig.value.helper)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).errors.entry_type) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.entry_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Entry Date</label><input${ssrRenderAttr("value", unref(form).entry_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" required${_scopeId}>`);
            if (unref(form).errors.entry_date) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.entry_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Amount (IDR)</label><input${ssrRenderAttr("value", unref(form).amount)} type="number" min="0" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" required${_scopeId}>`);
            if (unref(form).errors.amount) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.amount)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (needsEmployeeName.value) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Employee Name</label><input${ssrRenderAttr("value", unref(form).employee_name)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" placeholder="Employee name"${_scopeId}>`);
              if (unref(form).errors.employee_name) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.employee_name)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (needsPaymentDate.value) {
                _push2(`<div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Payment Date</label><input${ssrRenderAttr("value", unref(form).payment_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
                if (unref(form).errors.payment_date) {
                  _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.payment_date)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Reference (Optional)</label><input${ssrRenderAttr("value", unref(form).reference)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" placeholder="Example: EO-2026-001"${_scopeId}>`);
            if (unref(form).errors.reference) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.reference)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex items-center space-x-3 mt-6"${_scopeId}><input id="opening_balance"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_opening) ? ssrLooseContain(unref(form).is_opening, null) : unref(form).is_opening) ? " checked" : ""} type="checkbox" class="rounded border-gray-300 text-sage-600 focus:ring-sage-500"${_scopeId}><label for="opening_balance" class="text-sm text-gray-700"${_scopeId}>Opening Balance</label></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Notes (Optional)</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" placeholder="Additional notes"${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea>`);
            if (unref(form).errors.notes) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.notes)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-sage-50 border border-sage-100 rounded-lg p-4"${_scopeId}><div class="flex items-center space-x-3"${_scopeId}><input id="affects_bank"${ssrIncludeBooleanAttr(Array.isArray(unref(form).affects_bank) ? ssrLooseContain(unref(form).affects_bank, null) : unref(form).affects_bank) ? " checked" : ""} type="checkbox" class="rounded border-gray-300 text-sage-600 focus:ring-sage-500"${ssrIncludeBooleanAttr(!selectedConfig.value.bankAllowed) ? " disabled" : ""}${_scopeId}><label for="affects_bank" class="text-sm text-gray-700"${_scopeId}> Create Bank Transaction </label></div><p class="text-xs text-gray-500 mt-2"${_scopeId}>${ssrInterpolate(selectedConfig.value.bankHint)}</p>`);
            if (unref(form).affects_bank) {
              _push2(`<div class="mt-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Bank Account</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).bank_account_id) ? ssrLooseContain(unref(form).bank_account_id, "") : ssrLooseEqual(unref(form).bank_account_id, "")) ? " selected" : ""}${_scopeId}>Select bank account</option><!--[-->`);
              ssrRenderList(__props.bankAccounts, (bank) => {
                _push2(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).bank_account_id) ? ssrLooseContain(unref(form).bank_account_id, bank.id) : ssrLooseEqual(unref(form).bank_account_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} - ${ssrInterpolate(bank.account_number)}</option>`);
              });
              _push2(`<!--]--></select>`);
              if (unref(form).errors.bank_account_id) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.bank_account_id)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.equity.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50"${_scopeId}> Save Entry </button></div>`);
            if (unref(form).errors.error) {
              _push2(`<div class="text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.error)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Create Equity Entry" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Create Equity Entry"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Record equity movements and owner-related balances")
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submitForm, ["prevent"]),
                      class: "px-6 py-6 space-y-6"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Equity Type"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).entry_type = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, [
                          createVNode("option", {
                            value: "",
                            disabled: ""
                          }, "Select type"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.typeOptions, (option) => {
                            return openBlock(), createBlock("option", {
                              key: option.value,
                              value: option.value
                            }, toDisplayString(option.label), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).entry_type]
                        ]),
                        selectedConfig.value.helper ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-xs text-gray-500 mt-2"
                        }, toDisplayString(selectedConfig.value.helper), 1)) : createCommentVNode("", true),
                        unref(form).errors.entry_type ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-xs text-red-600 mt-2"
                        }, toDisplayString(unref(form).errors.entry_type), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Entry Date"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).entry_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).entry_date]
                          ]),
                          unref(form).errors.entry_date ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.entry_date), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Amount (IDR)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                            type: "number",
                            min: "0",
                            step: "0.01",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).amount]
                          ]),
                          unref(form).errors.amount ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.amount), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      needsEmployeeName.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-1 md:grid-cols-2 gap-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Employee Name"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).employee_name = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Employee name"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).employee_name]
                          ]),
                          unref(form).errors.employee_name ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.employee_name), 1)) : createCommentVNode("", true)
                        ]),
                        needsPaymentDate.value ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Payment Date"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).payment_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).payment_date]
                          ]),
                          unref(form).errors.payment_date ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.payment_date), 1)) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Reference (Optional)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).reference = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Example: EO-2026-001"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).reference]
                          ]),
                          unref(form).errors.reference ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.reference), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex items-center space-x-3 mt-6" }, [
                          withDirectives(createVNode("input", {
                            id: "opening_balance",
                            "onUpdate:modelValue": ($event) => unref(form).is_opening = $event,
                            type: "checkbox",
                            class: "rounded border-gray-300 text-sage-600 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form).is_opening]
                          ]),
                          createVNode("label", {
                            for: "opening_balance",
                            class: "text-sm text-gray-700"
                          }, "Opening Balance")
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Notes (Optional)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                          rows: "3",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                          placeholder: "Additional notes"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).notes]
                        ]),
                        unref(form).errors.notes ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-xs text-red-600 mt-2"
                        }, toDisplayString(unref(form).errors.notes), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "bg-sage-50 border border-sage-100 rounded-lg p-4" }, [
                        createVNode("div", { class: "flex items-center space-x-3" }, [
                          withDirectives(createVNode("input", {
                            id: "affects_bank",
                            "onUpdate:modelValue": ($event) => unref(form).affects_bank = $event,
                            type: "checkbox",
                            class: "rounded border-gray-300 text-sage-600 focus:ring-sage-500",
                            disabled: !selectedConfig.value.bankAllowed
                          }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                            [vModelCheckbox, unref(form).affects_bank]
                          ]),
                          createVNode("label", {
                            for: "affects_bank",
                            class: "text-sm text-gray-700"
                          }, " Create Bank Transaction ")
                        ]),
                        createVNode("p", { class: "text-xs text-gray-500 mt-2" }, toDisplayString(selectedConfig.value.bankHint), 1),
                        unref(form).affects_bank ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-4"
                        }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Bank Account"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).bank_account_id = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Select bank account"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.bankAccounts, (bank) => {
                              return openBlock(), createBlock("option", {
                                key: bank.id,
                                value: bank.id
                              }, toDisplayString(bank.bank_name) + " - " + toDisplayString(bank.account_number), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).bank_account_id]
                          ]),
                          unref(form).errors.bank_account_id ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.bank_account_id), 1)) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-2" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.equity.index"),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Cancel ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50"
                        }, " Save Entry ", 8, ["disabled"])
                      ]),
                      unref(form).errors.error ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-xs text-red-600"
                      }, toDisplayString(unref(form).errors.error), 1)) : createCommentVNode("", true)
                    ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Equity/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
