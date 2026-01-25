import { computed, withCtx, unref, createTextVNode, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, withModifiers, withDirectives, vModelText, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BXHi-kqO.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    entry: Object,
    typeConfig: Object,
    bankAccounts: Array,
    canSettle: Boolean
  },
  setup(__props) {
    const props = __props;
    const typeLabel = computed(() => {
      var _a;
      return ((_a = props.typeConfig) == null ? void 0 : _a.label) || props.entry.entry_type;
    });
    const settlementForm = useForm({
      bank_account_id: "",
      settlement_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      notes: ""
    });
    const submitSettlement = () => {
      settlementForm.post(route("admin-keuangan.equity.settle", props.entry.id));
    };
    const formatDate = (value) => {
      if (!value) return "-";
      return new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    };
    const formatCurrency = (value) => {
      const amount = Number(value || 0);
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Equity Entry Details" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Equity Entry Details</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(typeLabel.value)}</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.equity.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Back `);
                } else {
                  return [
                    createTextVNode(" Back ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-white shadow rounded-lg mb-6"${_scopeId}><div class="px-6 py-6 space-y-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><p class="text-xs text-gray-500 uppercase tracking-wide"${_scopeId}>Entry Date</p><p class="text-sm font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(__props.entry.entry_date))}</p></div><div${_scopeId}><p class="text-xs text-gray-500 uppercase tracking-wide"${_scopeId}>Amount</p><p class="${ssrRenderClass([__props.entry.direction === "decrease" ? "text-red-600" : "text-green-600", "text-sm font-semibold"])}"${_scopeId}>${ssrInterpolate(__props.entry.direction === "decrease" ? "-" : "+")}${ssrInterpolate(formatCurrency(__props.entry.amount))}</p></div><div${_scopeId}><p class="text-xs text-gray-500 uppercase tracking-wide"${_scopeId}>Opening Balance</p><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.entry.is_opening ? "Yes" : "No")}</p></div><div${_scopeId}><p class="text-xs text-gray-500 uppercase tracking-wide"${_scopeId}>Status</p><span class="${ssrRenderClass([__props.entry.status === "settled" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800", "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(__props.entry.status === "settled" ? "Settled" : "Recorded")}</span></div></div>`);
            if (__props.entry.reference) {
              _push2(`<div${_scopeId}><p class="text-xs text-gray-500 uppercase tracking-wide"${_scopeId}>Reference</p><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.entry.reference)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.entry.notes) {
              _push2(`<div${_scopeId}><p class="text-xs text-gray-500 uppercase tracking-wide"${_scopeId}>Notes</p><p class="text-sm text-gray-900 whitespace-pre-line"${_scopeId}>${ssrInterpolate(__props.entry.notes)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white shadow rounded-lg mb-6"${_scopeId}><div class="px-6 py-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Bank Impact</h2>`);
            if (__props.entry.affects_bank) {
              _push2(`<div class="space-y-2"${_scopeId}><div class="text-sm text-gray-700"${_scopeId}><span class="font-medium"${_scopeId}>Bank:</span> ${ssrInterpolate(((_a = __props.entry.bank_account) == null ? void 0 : _a.bank_name) || "-")} (${ssrInterpolate(((_b = __props.entry.bank_account) == null ? void 0 : _b.account_number) || "-")}) </div><div class="text-sm text-gray-700"${_scopeId}><span class="font-medium"${_scopeId}>Transaction Type:</span> ${ssrInterpolate(__props.entry.bank_transaction_type || "-")}</div>`);
              if (__props.entry.settled_at) {
                _push2(`<div class="text-sm text-gray-700"${_scopeId}><span class="font-medium"${_scopeId}>Settlement Date:</span> ${ssrInterpolate(formatDate(__props.entry.settled_at))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="text-sm text-gray-500"${_scopeId}> This entry does not create a bank transaction. </div>`);
            }
            _push2(`</div></div>`);
            if (__props.canSettle) {
              _push2(`<div class="bg-white shadow rounded-lg"${_scopeId}><form class="px-6 py-6 space-y-4"${_scopeId}><h2 class="text-lg font-semibold text-gray-900"${_scopeId}>Settle Through Bank</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Settlement Date</label><input${ssrRenderAttr("value", unref(settlementForm).settlement_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
              if (unref(settlementForm).errors.settlement_date) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(settlementForm).errors.settlement_date)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Bank Account</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(settlementForm).bank_account_id) ? ssrLooseContain(unref(settlementForm).bank_account_id, "") : ssrLooseEqual(unref(settlementForm).bank_account_id, "")) ? " selected" : ""}${_scopeId}>Select bank account</option><!--[-->`);
              ssrRenderList(__props.bankAccounts, (bank) => {
                _push2(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(settlementForm).bank_account_id) ? ssrLooseContain(unref(settlementForm).bank_account_id, bank.id) : ssrLooseEqual(unref(settlementForm).bank_account_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} - ${ssrInterpolate(bank.account_number)}</option>`);
              });
              _push2(`<!--]--></select>`);
              if (unref(settlementForm).errors.bank_account_id) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(settlementForm).errors.bank_account_id)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Notes (Optional)</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" placeholder="Settlement notes"${_scopeId}>${ssrInterpolate(unref(settlementForm).notes)}</textarea></div><div class="flex justify-end"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(settlementForm).processing) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50"${_scopeId}> Mark as Settled </button></div>`);
              if (unref(settlementForm).errors.error) {
                _push2(`<div class="text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(settlementForm).errors.error)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</form></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Equity Entry Details" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Equity Entry Details"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, toDisplayString(typeLabel.value), 1)
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.equity.index"),
                      class: "inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Back ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-6 py-6 space-y-4" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-gray-500 uppercase tracking-wide" }, "Entry Date"),
                          createVNode("p", { class: "text-sm font-semibold text-gray-900" }, toDisplayString(formatDate(__props.entry.entry_date)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-gray-500 uppercase tracking-wide" }, "Amount"),
                          createVNode("p", {
                            class: ["text-sm font-semibold", __props.entry.direction === "decrease" ? "text-red-600" : "text-green-600"]
                          }, toDisplayString(__props.entry.direction === "decrease" ? "-" : "+") + toDisplayString(formatCurrency(__props.entry.amount)), 3)
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-gray-500 uppercase tracking-wide" }, "Opening Balance"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.entry.is_opening ? "Yes" : "No"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-xs text-gray-500 uppercase tracking-wide" }, "Status"),
                          createVNode("span", {
                            class: [__props.entry.status === "settled" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800", "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                          }, toDisplayString(__props.entry.status === "settled" ? "Settled" : "Recorded"), 3)
                        ])
                      ]),
                      __props.entry.reference ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("p", { class: "text-xs text-gray-500 uppercase tracking-wide" }, "Reference"),
                        createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.entry.reference), 1)
                      ])) : createCommentVNode("", true),
                      __props.entry.notes ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("p", { class: "text-xs text-gray-500 uppercase tracking-wide" }, "Notes"),
                        createVNode("p", { class: "text-sm text-gray-900 whitespace-pre-line" }, toDisplayString(__props.entry.notes), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-6 py-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Bank Impact"),
                      __props.entry.affects_bank ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "space-y-2"
                      }, [
                        createVNode("div", { class: "text-sm text-gray-700" }, [
                          createVNode("span", { class: "font-medium" }, "Bank:"),
                          createTextVNode(" " + toDisplayString(((_c = __props.entry.bank_account) == null ? void 0 : _c.bank_name) || "-") + " (" + toDisplayString(((_d = __props.entry.bank_account) == null ? void 0 : _d.account_number) || "-") + ") ", 1)
                        ]),
                        createVNode("div", { class: "text-sm text-gray-700" }, [
                          createVNode("span", { class: "font-medium" }, "Transaction Type:"),
                          createTextVNode(" " + toDisplayString(__props.entry.bank_transaction_type || "-"), 1)
                        ]),
                        __props.entry.settled_at ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-sm text-gray-700"
                        }, [
                          createVNode("span", { class: "font-medium" }, "Settlement Date:"),
                          createTextVNode(" " + toDisplayString(formatDate(__props.entry.settled_at)), 1)
                        ])) : createCommentVNode("", true)
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-sm text-gray-500"
                      }, " This entry does not create a bank transaction. "))
                    ])
                  ]),
                  __props.canSettle ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-white shadow rounded-lg"
                  }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submitSettlement, ["prevent"]),
                      class: "px-6 py-6 space-y-4"
                    }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, "Settle Through Bank"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Settlement Date"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(settlementForm).settlement_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(settlementForm).settlement_date]
                          ]),
                          unref(settlementForm).errors.settlement_date ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(settlementForm).errors.settlement_date), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Bank Account"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(settlementForm).bank_account_id = $event,
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
                            [vModelSelect, unref(settlementForm).bank_account_id]
                          ]),
                          unref(settlementForm).errors.bank_account_id ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(settlementForm).errors.bank_account_id), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Notes (Optional)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(settlementForm).notes = $event,
                          rows: "3",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                          placeholder: "Settlement notes"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(settlementForm).notes]
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end" }, [
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(settlementForm).processing,
                          class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50"
                        }, " Mark as Settled ", 8, ["disabled"])
                      ]),
                      unref(settlementForm).errors.error ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-xs text-red-600"
                      }, toDisplayString(unref(settlementForm).errors.error), 1)) : createCommentVNode("", true)
                    ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Equity/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
