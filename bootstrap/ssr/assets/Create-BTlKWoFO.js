import { computed, withCtx, unref, createTextVNode, createVNode, withModifiers, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
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
    vendors: Array
  },
  setup(__props) {
    const props = __props;
    const vendorOptions = computed(() => {
      return (props.vendors || []).map((vendor) => ({
        value: vendor.id,
        label: vendor.nama_vendor
      }));
    });
    const form = useForm({
      vendor_id: "",
      vendor_invoice_number: "",
      vendor_invoice_date: "",
      source_so_number: "",
      amount: "",
      payment_due_date: "",
      opening_payment_date: "",
      service_description: "Opening Balance",
      service_remarks: "",
      vendor_bank_account: "",
      vendor_account_name: "",
      notes: ""
    });
    const submit = () => {
      form.post(route("admin-keuangan.opening-payables.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Create Opening Payable" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Create Opening Payable</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Record opening balance for vendor payables.</p></div><div class="bg-white shadow rounded-lg"${_scopeId}><form class="px-6 py-6 space-y-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Vendor</label>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).vendor_id,
              "onUpdate:modelValue": ($event) => unref(form).vendor_id = $event,
              options: vendorOptions.value,
              placeholder: "Select vendor",
              "search-fields": ["label"],
              "label-field": "label",
              "value-field": "value",
              "input-class": "w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
            }, null, _parent2, _scopeId));
            if (unref(form).errors.vendor_id) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.vendor_id)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Vendor Invoice Number</label><input${ssrRenderAttr("value", unref(form).vendor_invoice_number)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" required${_scopeId}>`);
            if (unref(form).errors.vendor_invoice_number) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.vendor_invoice_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Vendor Invoice Date</label><input${ssrRenderAttr("value", unref(form).vendor_invoice_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" required${_scopeId}>`);
            if (unref(form).errors.vendor_invoice_date) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.vendor_invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>SO Number</label><input${ssrRenderAttr("value", unref(form).source_so_number)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" required${_scopeId}>`);
            if (unref(form).errors.source_so_number) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.source_so_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Opening Amount</label><input${ssrRenderAttr("value", unref(form).amount)} type="number" min="0" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" required${_scopeId}>`);
            if (unref(form).errors.amount) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.amount)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Payment Due Date (Optional)</label><input${ssrRenderAttr("value", unref(form).payment_due_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
            if (unref(form).errors.payment_due_date) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.payment_due_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Payment Date (Optional)</label><input${ssrRenderAttr("value", unref(form).opening_payment_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
            if (unref(form).errors.opening_payment_date) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.opening_payment_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Service Description</label><input${ssrRenderAttr("value", unref(form).service_description)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
            if (unref(form).errors.service_description) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.service_description)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Service Remarks (Optional)</label><input${ssrRenderAttr("value", unref(form).service_remarks)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
            if (unref(form).errors.service_remarks) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.service_remarks)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Vendor Bank Account (Optional)</label><input${ssrRenderAttr("value", unref(form).vendor_bank_account)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
            if (unref(form).errors.vendor_bank_account) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.vendor_bank_account)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Vendor Account Name (Optional)</label><input${ssrRenderAttr("value", unref(form).vendor_account_name)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
            if (unref(form).errors.vendor_account_name) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.vendor_account_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Notes (Optional)</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea>`);
            if (unref(form).errors.notes) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(form).errors.notes)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end space-x-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.opening-payables.index"),
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 disabled:opacity-50"${_scopeId}> Save Opening Payable </button></div>`);
            if (unref(form).errors.error) {
              _push2(`<div class="text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.error)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Create Opening Payable" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Create Opening Payable"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Record opening balance for vendor payables.")
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "px-6 py-6 space-y-6"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Vendor"),
                        createVNode(_sfc_main$1, {
                          modelValue: unref(form).vendor_id,
                          "onUpdate:modelValue": ($event) => unref(form).vendor_id = $event,
                          options: vendorOptions.value,
                          placeholder: "Select vendor",
                          "search-fields": ["label"],
                          "label-field": "label",
                          "value-field": "value",
                          "input-class": "w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                        unref(form).errors.vendor_id ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-xs text-red-600 mt-2"
                        }, toDisplayString(unref(form).errors.vendor_id), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Vendor Invoice Number"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).vendor_invoice_number = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).vendor_invoice_number]
                          ]),
                          unref(form).errors.vendor_invoice_number ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.vendor_invoice_number), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Vendor Invoice Date"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).vendor_invoice_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).vendor_invoice_date]
                          ]),
                          unref(form).errors.vendor_invoice_date ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.vendor_invoice_date), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "SO Number"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).source_so_number = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).source_so_number]
                          ]),
                          unref(form).errors.source_so_number ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.source_so_number), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Opening Amount"),
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
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Payment Due Date (Optional)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).payment_due_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).payment_due_date]
                          ]),
                          unref(form).errors.payment_due_date ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.payment_due_date), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Payment Date (Optional)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).opening_payment_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).opening_payment_date]
                          ]),
                          unref(form).errors.opening_payment_date ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.opening_payment_date), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Service Description"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).service_description = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).service_description]
                          ]),
                          unref(form).errors.service_description ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.service_description), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Service Remarks (Optional)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).service_remarks = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).service_remarks]
                          ]),
                          unref(form).errors.service_remarks ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.service_remarks), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Vendor Bank Account (Optional)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).vendor_bank_account = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).vendor_bank_account]
                          ]),
                          unref(form).errors.vendor_bank_account ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.vendor_bank_account), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Vendor Account Name (Optional)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).vendor_account_name = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).vendor_account_name]
                          ]),
                          unref(form).errors.vendor_account_name ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(form).errors.vendor_account_name), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Notes (Optional)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                          rows: "3",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).notes]
                        ]),
                        unref(form).errors.notes ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-xs text-red-600 mt-2"
                        }, toDisplayString(unref(form).errors.notes), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-2" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.opening-payables.index"),
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
                          class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 disabled:opacity-50"
                        }, " Save Opening Payable ", 8, ["disabled"])
                      ]),
                      unref(form).errors.error ? (openBlock(), createBlock("div", {
                        key: 0,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/OpeningPayables/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
