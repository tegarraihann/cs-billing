import { computed, withCtx, unref, createVNode, createTextVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, vModelSelect, Fragment, renderList, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BXHi-kqO.js";
import { ArrowLeft, Loader2 } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    categories: Array,
    parentAccounts: Array
  },
  setup(__props) {
    const form = useForm({
      account_code: "",
      account_name: "",
      account_type: "",
      account_category: "",
      parent_code: "",
      sort_order: "",
      description: "",
      is_active: true
    });
    const processing = computed(() => form.processing);
    const submit = () => {
      form.post(route("admin-keuangan.chart-of-accounts.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Create Chart of Account" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.chart-of-accounts.index"),
              class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Back to Chart of Accounts `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Back to Chart of Accounts ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Create New Account</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Add a new account without altering existing integrations</p></div><div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl"${_scopeId}><div class="px-6 py-8"${_scopeId}><form class="space-y-6"${_scopeId}><div${_scopeId}><label for="account_code" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Account Code <span class="text-red-500"${_scopeId}>*</span></label><input id="account_code"${ssrRenderAttr("value", unref(form).account_code)} type="text" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": unref(form).errors.account_code }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="Example: 5200"${_scopeId}>`);
            if (unref(form).errors.account_code) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.account_code)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="account_name" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Account Name <span class="text-red-500"${_scopeId}>*</span></label><input id="account_name"${ssrRenderAttr("value", unref(form).account_name)} type="text" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": unref(form).errors.account_name }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="Example: Operational Expense"${_scopeId}>`);
            if (unref(form).errors.account_name) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.account_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label for="account_type" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Account Type <span class="text-red-500"${_scopeId}>*</span></label><select id="account_type" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": unref(form).errors.account_type }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).account_type) ? ssrLooseContain(unref(form).account_type, "") : ssrLooseEqual(unref(form).account_type, "")) ? " selected" : ""}${_scopeId}>Select type</option><option value="asset"${ssrIncludeBooleanAttr(Array.isArray(unref(form).account_type) ? ssrLooseContain(unref(form).account_type, "asset") : ssrLooseEqual(unref(form).account_type, "asset")) ? " selected" : ""}${_scopeId}>Asset</option><option value="liability"${ssrIncludeBooleanAttr(Array.isArray(unref(form).account_type) ? ssrLooseContain(unref(form).account_type, "liability") : ssrLooseEqual(unref(form).account_type, "liability")) ? " selected" : ""}${_scopeId}>Liability</option><option value="equity"${ssrIncludeBooleanAttr(Array.isArray(unref(form).account_type) ? ssrLooseContain(unref(form).account_type, "equity") : ssrLooseEqual(unref(form).account_type, "equity")) ? " selected" : ""}${_scopeId}>Equity</option><option value="revenue"${ssrIncludeBooleanAttr(Array.isArray(unref(form).account_type) ? ssrLooseContain(unref(form).account_type, "revenue") : ssrLooseEqual(unref(form).account_type, "revenue")) ? " selected" : ""}${_scopeId}>Revenue</option><option value="expense"${ssrIncludeBooleanAttr(Array.isArray(unref(form).account_type) ? ssrLooseContain(unref(form).account_type, "expense") : ssrLooseEqual(unref(form).account_type, "expense")) ? " selected" : ""}${_scopeId}>Expense</option></select>`);
            if (unref(form).errors.account_type) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.account_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="account_category" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Account Category <span class="text-red-500"${_scopeId}>*</span></label><select id="account_category" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": unref(form).errors.account_category }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).account_category) ? ssrLooseContain(unref(form).account_category, "") : ssrLooseEqual(unref(form).account_category, "")) ? " selected" : ""}${_scopeId}>Select category</option><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<option${ssrRenderAttr("value", category)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).account_category) ? ssrLooseContain(unref(form).account_category, category) : ssrLooseEqual(unref(form).account_category, category)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(form).errors.account_category) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.account_category)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label for="parent_code" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Parent Account (optional) </label><select id="parent_code" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_code) ? ssrLooseContain(unref(form).parent_code, "") : ssrLooseEqual(unref(form).parent_code, "")) ? " selected" : ""}${_scopeId}>No parent</option><!--[-->`);
            ssrRenderList(__props.parentAccounts, (parent) => {
              _push2(`<option${ssrRenderAttr("value", parent.account_code)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).parent_code) ? ssrLooseContain(unref(form).parent_code, parent.account_code) : ssrLooseEqual(unref(form).parent_code, parent.account_code)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(parent.account_code)} - ${ssrInterpolate(parent.account_name)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label for="sort_order" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Sort Order (optional) </label><input id="sort_order"${ssrRenderAttr("value", unref(form).sort_order)} type="number" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm" placeholder="Example: 10"${_scopeId}></div></div><div${_scopeId}><label for="description" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Description </label><textarea id="description" rows="4" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm" placeholder="Add notes or usage details..."${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea></div><div class="flex items-center"${_scopeId}><label class="flex items-center cursor-pointer"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded"${_scopeId}><span class="ml-2 block text-sm text-gray-900"${_scopeId}> Active </span></label></div><div class="mt-8 flex justify-end space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.chart-of-accounts.index"),
              class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"${_scopeId}>`);
            if (processing.value) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "animate-spin -ml-1 mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Saving..." : "Create Account")}</button></div></form></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Create Chart of Account" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.chart-of-accounts.index"),
                      class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Back to Chart of Accounts ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Create New Account"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Add a new account without altering existing integrations")
                  ]),
                  createVNode("div", { class: "bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl" }, [
                    createVNode("div", { class: "px-6 py-8" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "account_code",
                            class: "block text-sm font-medium text-gray-700 mb-2"
                          }, [
                            createTextVNode(" Account Code "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "account_code",
                            "onUpdate:modelValue": ($event) => unref(form).account_code = $event,
                            type: "text",
                            class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": unref(form).errors.account_code }],
                            placeholder: "Example: 5200"
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).account_code]
                          ]),
                          unref(form).errors.account_code ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-1 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.account_code), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "account_name",
                            class: "block text-sm font-medium text-gray-700 mb-2"
                          }, [
                            createTextVNode(" Account Name "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            id: "account_name",
                            "onUpdate:modelValue": ($event) => unref(form).account_name = $event,
                            type: "text",
                            class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": unref(form).errors.account_name }],
                            placeholder: "Example: Operational Expense"
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).account_name]
                          ]),
                          unref(form).errors.account_name ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-1 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.account_name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "account_type",
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, [
                              createTextVNode(" Account Type "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("select", {
                              id: "account_type",
                              "onUpdate:modelValue": ($event) => unref(form).account_type = $event,
                              class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": unref(form).errors.account_type }]
                            }, [
                              createVNode("option", { value: "" }, "Select type"),
                              createVNode("option", { value: "asset" }, "Asset"),
                              createVNode("option", { value: "liability" }, "Liability"),
                              createVNode("option", { value: "equity" }, "Equity"),
                              createVNode("option", { value: "revenue" }, "Revenue"),
                              createVNode("option", { value: "expense" }, "Expense")
                            ], 10, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).account_type]
                            ]),
                            unref(form).errors.account_type ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-1 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.account_type), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "account_category",
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, [
                              createTextVNode(" Account Category "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("select", {
                              id: "account_category",
                              "onUpdate:modelValue": ($event) => unref(form).account_category = $event,
                              class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": unref(form).errors.account_category }]
                            }, [
                              createVNode("option", { value: "" }, "Select category"),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                                return openBlock(), createBlock("option", {
                                  key: category,
                                  value: category
                                }, toDisplayString(category), 9, ["value"]);
                              }), 128))
                            ], 10, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).account_category]
                            ]),
                            unref(form).errors.account_category ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-1 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.account_category), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "parent_code",
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, " Parent Account (optional) "),
                            withDirectives(createVNode("select", {
                              id: "parent_code",
                              "onUpdate:modelValue": ($event) => unref(form).parent_code = $event,
                              class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                            }, [
                              createVNode("option", { value: "" }, "No parent"),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.parentAccounts, (parent) => {
                                return openBlock(), createBlock("option", {
                                  key: parent.account_code,
                                  value: parent.account_code
                                }, toDisplayString(parent.account_code) + " - " + toDisplayString(parent.account_name), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).parent_code]
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "sort_order",
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, " Sort Order (optional) "),
                            withDirectives(createVNode("input", {
                              id: "sort_order",
                              "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                              type: "number",
                              class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm",
                              placeholder: "Example: 10"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).sort_order]
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "description",
                            class: "block text-sm font-medium text-gray-700 mb-2"
                          }, " Description "),
                          withDirectives(createVNode("textarea", {
                            id: "description",
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "4",
                            class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm",
                            placeholder: "Add notes or usage details..."
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ])
                        ]),
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("label", { class: "flex items-center cursor-pointer" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                              type: "checkbox",
                              class: "h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).is_active]
                            ]),
                            createVNode("span", { class: "ml-2 block text-sm text-gray-900" }, " Active ")
                          ])
                        ]),
                        createVNode("div", { class: "mt-8 flex justify-end space-x-3" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-keuangan.chart-of-accounts.index"),
                            class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: processing.value,
                            class: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"
                          }, [
                            processing.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "animate-spin -ml-1 mr-2 h-4 w-4"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(processing.value ? "Saving..." : "Create Account"), 1)
                          ], 8, ["disabled"])
                        ])
                      ], 32)
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ChartOfAccounts/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
