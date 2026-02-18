import { computed, withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, toDisplayString, withModifiers, createCommentVNode, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { _ as _sfc_main$1 } from "./SearchableSelect-DfkOp0gQ.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    customers: Array
  },
  setup(__props) {
    const props = __props;
    const customerOptions = computed(() => {
      return (props.customers || []).map((customer) => ({
        value: customer.id,
        label: customer.company_name
      }));
    });
    const mainForm = useForm({
      customer_id: "",
      invoice_number: "",
      invoice_date: "",
      source_so_number: "",
      amount: "",
      due_date: "",
      opening_payment_date: "",
      payment_terms_days: "",
      payment_terms_text: "",
      notes: "",
      opening_type: "main"
    });
    const reimbursementForm = useForm({
      customer_id: "",
      invoice_number: "",
      invoice_date: "",
      source_so_number: "",
      amount: "",
      due_date: "",
      opening_payment_date: "",
      payment_terms_days: "",
      payment_terms_text: "",
      notes: "",
      opening_type: "reimbursement"
    });
    const formSections = computed(() => [
      {
        key: "main",
        title: "Main Invoice Opening",
        description: "Use this section for opening balances related to main invoices.",
        submitLabel: "Save Main Opening",
        form: mainForm
      },
      {
        key: "reimbursement",
        title: "Reimbursement Opening",
        description: "Use this section for opening balances related to reimbursements.",
        submitLabel: "Save Reimbursement Opening",
        form: reimbursementForm
      }
    ]);
    const submit = (form) => {
      form.post(route("admin-keuangan.opening-receivables.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Create Opening Receivable" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Create Opening Receivable</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Record opening receivables for main invoices and reimbursements.</p></div><div class="space-y-8"${_scopeId}><!--[-->`);
            ssrRenderList(formSections.value, (section) => {
              _push2(`<div class="bg-white shadow rounded-lg"${_scopeId}><div class="px-6 py-5 border-b border-gray-100"${_scopeId}><h2 class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(section.title)}</h2><p class="mt-1 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(section.description)}</p></div><form class="px-6 py-6 space-y-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Customer</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: section.form.customer_id,
                "onUpdate:modelValue": ($event) => section.form.customer_id = $event,
                options: customerOptions.value,
                placeholder: "Select customer",
                "search-fields": ["label"],
                "label-field": "label",
                "value-field": "value",
                "input-class": "w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
              }, null, _parent2, _scopeId));
              if (section.form.errors.customer_id) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(section.form.errors.customer_id)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Invoice Number</label><input${ssrRenderAttr("value", section.form.invoice_number)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" required${_scopeId}>`);
              if (section.form.errors.invoice_number) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(section.form.errors.invoice_number)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Invoice Date</label><input${ssrRenderAttr("value", section.form.invoice_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" required${_scopeId}>`);
              if (section.form.errors.invoice_date) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(section.form.errors.invoice_date)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>SO Number</label><input${ssrRenderAttr("value", section.form.source_so_number)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" required${_scopeId}>`);
              if (section.form.errors.source_so_number) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(section.form.errors.source_so_number)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Opening Amount</label><input${ssrRenderAttr("value", section.form.amount)} type="number" min="0" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" required${_scopeId}>`);
              if (section.form.errors.amount) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(section.form.errors.amount)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Due Date (Optional)</label><input${ssrRenderAttr("value", section.form.due_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
              if (section.form.errors.due_date) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(section.form.errors.due_date)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Payment Date (Optional)</label><input${ssrRenderAttr("value", section.form.opening_payment_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
              if (section.form.errors.opening_payment_date) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(section.form.errors.opening_payment_date)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Payment Terms Days (Optional)</label><input${ssrRenderAttr("value", section.form.payment_terms_days)} type="number" min="0" step="1" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
              if (section.form.errors.payment_terms_days) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(section.form.errors.payment_terms_days)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Payment Terms Text (Optional)</label><input${ssrRenderAttr("value", section.form.payment_terms_text)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
              if (section.form.errors.payment_terms_text) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(section.form.errors.payment_terms_text)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Notes (Optional)</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>${ssrInterpolate(section.form.notes)}</textarea>`);
              if (section.form.errors.notes) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(section.form.errors.notes)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex justify-end space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.opening-receivables.index"),
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
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button type="submit"${ssrIncludeBooleanAttr(section.form.processing) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 disabled:opacity-50"${_scopeId}>${ssrInterpolate(section.submitLabel)}</button></div>`);
              if (section.form.errors.error) {
                _push2(`<div class="text-xs text-red-600"${_scopeId}>${ssrInterpolate(section.form.errors.error)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</form></div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Create Opening Receivable" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Create Opening Receivable"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Record opening receivables for main invoices and reimbursements.")
                  ]),
                  createVNode("div", { class: "space-y-8" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(formSections.value, (section) => {
                      return openBlock(), createBlock("div", {
                        key: section.key,
                        class: "bg-white shadow rounded-lg"
                      }, [
                        createVNode("div", { class: "px-6 py-5 border-b border-gray-100" }, [
                          createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(section.title), 1),
                          createVNode("p", { class: "mt-1 text-sm text-gray-600" }, toDisplayString(section.description), 1)
                        ]),
                        createVNode("form", {
                          onSubmit: withModifiers(($event) => submit(section.form), ["prevent"]),
                          class: "px-6 py-6 space-y-6"
                        }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Customer"),
                            createVNode(_sfc_main$1, {
                              modelValue: section.form.customer_id,
                              "onUpdate:modelValue": ($event) => section.form.customer_id = $event,
                              options: customerOptions.value,
                              placeholder: "Select customer",
                              "search-fields": ["label"],
                              "label-field": "label",
                              "value-field": "value",
                              "input-class": "w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                            section.form.errors.customer_id ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-xs text-red-600 mt-2"
                            }, toDisplayString(section.form.errors.customer_id), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Invoice Number"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => section.form.invoice_number = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, section.form.invoice_number]
                              ]),
                              section.form.errors.invoice_number ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-red-600 mt-2"
                              }, toDisplayString(section.form.errors.invoice_number), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Invoice Date"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => section.form.invoice_date = $event,
                                type: "date",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, section.form.invoice_date]
                              ]),
                              section.form.errors.invoice_date ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-red-600 mt-2"
                              }, toDisplayString(section.form.errors.invoice_date), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "SO Number"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => section.form.source_so_number = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, section.form.source_so_number]
                              ]),
                              section.form.errors.source_so_number ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-red-600 mt-2"
                              }, toDisplayString(section.form.errors.source_so_number), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Opening Amount"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => section.form.amount = $event,
                                type: "number",
                                min: "0",
                                step: "0.01",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, section.form.amount]
                              ]),
                              section.form.errors.amount ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-red-600 mt-2"
                              }, toDisplayString(section.form.errors.amount), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Due Date (Optional)"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => section.form.due_date = $event,
                                type: "date",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, section.form.due_date]
                              ]),
                              section.form.errors.due_date ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-red-600 mt-2"
                              }, toDisplayString(section.form.errors.due_date), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Payment Date (Optional)"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => section.form.opening_payment_date = $event,
                                type: "date",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, section.form.opening_payment_date]
                              ]),
                              section.form.errors.opening_payment_date ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-red-600 mt-2"
                              }, toDisplayString(section.form.errors.opening_payment_date), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Payment Terms Days (Optional)"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => section.form.payment_terms_days = $event,
                                type: "number",
                                min: "0",
                                step: "1",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, section.form.payment_terms_days]
                              ]),
                              section.form.errors.payment_terms_days ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-red-600 mt-2"
                              }, toDisplayString(section.form.errors.payment_terms_days), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Payment Terms Text (Optional)"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => section.form.payment_terms_text = $event,
                                type: "text",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, section.form.payment_terms_text]
                              ]),
                              section.form.errors.payment_terms_text ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-red-600 mt-2"
                              }, toDisplayString(section.form.errors.payment_terms_text), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Notes (Optional)"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => section.form.notes = $event,
                              rows: "3",
                              class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, section.form.notes]
                            ]),
                            section.form.errors.notes ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-xs text-red-600 mt-2"
                            }, toDisplayString(section.form.errors.notes), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "flex justify-end space-x-2" }, [
                            createVNode(unref(Link), {
                              href: _ctx.route("admin-keuangan.opening-receivables.index"),
                              class: "inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cancel ")
                              ]),
                              _: 1
                            }, 8, ["href"]),
                            createVNode("button", {
                              type: "submit",
                              disabled: section.form.processing,
                              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 disabled:opacity-50"
                            }, toDisplayString(section.submitLabel), 9, ["disabled"])
                          ]),
                          section.form.errors.error ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600"
                          }, toDisplayString(section.form.errors.error), 1)) : createCommentVNode("", true)
                        ], 40, ["onSubmit"])
                      ]);
                    }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/OpeningReceivables/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
