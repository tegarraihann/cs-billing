import { ref, withCtx, unref, createVNode, toDisplayString, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-DcSfvd5K.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DPytNLut.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    account: Object
  },
  setup(__props) {
    const props = __props;
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.chart-of-accounts.index": "/admin-keuangan/chart-of-accounts",
        "admin-keuangan.chart-of-accounts.edit": "/admin-keuangan/chart-of-accounts",
        "admin-keuangan.chart-of-accounts.destroy": "/admin-keuangan/chart-of-accounts"
      };
      const baseRoute = routes[name] || "#";
      return params ? `${baseRoute}/${params}` : baseRoute;
    };
    const showDeactivateModal = ref(false);
    const confirmDeactivate = () => {
      showDeactivateModal.value = true;
    };
    const deactivateAccount = () => {
      router.delete(route("admin-keuangan.chart-of-accounts.destroy", props.account.id), {
        onSuccess: () => {
          showDeactivateModal.value = false;
        }
      });
    };
    const formatType = (value) => {
      if (!value) return "-";
      return value.charAt(0).toUpperCase() + value.slice(1);
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Chart of Accounts - Details" }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8" data-v-d3f8b2e4${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6" data-v-d3f8b2e4${_scopeId}><div class="flex items-center justify-between" data-v-d3f8b2e4${_scopeId}><div data-v-d3f8b2e4${_scopeId}><h1 class="text-2xl font-bold text-sage-800" data-v-d3f8b2e4${_scopeId}>Chart of Accounts</h1><p class="text-sage-600 mt-1" data-v-d3f8b2e4${_scopeId}>Account details and configuration</p></div><div class="flex items-center space-x-3" data-v-d3f8b2e4${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.chart-of-accounts.edit", __props.account.id),
              class: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-d3f8b2e4${_scopeId2}>Edit</span>`);
                } else {
                  return [
                    createVNode("span", null, "Edit")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.chart-of-accounts.index"),
              class: "bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-d3f8b2e4${_scopeId2}>Back</span>`);
                } else {
                  return [
                    createVNode("span", null, "Back")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-d3f8b2e4${_scopeId}><div class="lg:col-span-2" data-v-d3f8b2e4${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-d3f8b2e4${_scopeId}><div class="p-6 border-b border-sage-200" data-v-d3f8b2e4${_scopeId}><h2 class="text-lg font-semibold text-sage-800" data-v-d3f8b2e4${_scopeId}>Account Details</h2></div><div class="p-6 space-y-6" data-v-d3f8b2e4${_scopeId}><div data-v-d3f8b2e4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d3f8b2e4${_scopeId}>Account Code</label><div class="text-lg font-semibold text-sage-900" data-v-d3f8b2e4${_scopeId}>${ssrInterpolate(__props.account.account_code)}</div></div><div data-v-d3f8b2e4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d3f8b2e4${_scopeId}>Account Name</label><div class="text-sage-800" data-v-d3f8b2e4${_scopeId}>${ssrInterpolate(__props.account.account_name)}</div></div><div data-v-d3f8b2e4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d3f8b2e4${_scopeId}>Account Type</label><div class="text-sage-800" data-v-d3f8b2e4${_scopeId}>${ssrInterpolate(formatType(__props.account.account_type))}</div></div><div data-v-d3f8b2e4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d3f8b2e4${_scopeId}>Account Category</label><div class="text-sage-800" data-v-d3f8b2e4${_scopeId}>${ssrInterpolate(__props.account.account_category)}</div></div><div data-v-d3f8b2e4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d3f8b2e4${_scopeId}>Parent Account</label><div class="text-sage-800" data-v-d3f8b2e4${_scopeId}>`);
            if (__props.account.parent) {
              _push2(`<span data-v-d3f8b2e4${_scopeId}>${ssrInterpolate(__props.account.parent.account_code)} - ${ssrInterpolate(__props.account.parent.account_name)}</span>`);
            } else {
              _push2(`<span data-v-d3f8b2e4${_scopeId}>-</span>`);
            }
            _push2(`</div></div><div data-v-d3f8b2e4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d3f8b2e4${_scopeId}>Sort Order</label><div class="text-sage-800" data-v-d3f8b2e4${_scopeId}>${ssrInterpolate(__props.account.sort_order ?? "-")}</div></div><div data-v-d3f8b2e4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d3f8b2e4${_scopeId}>Description</label><div class="text-sage-800 whitespace-pre-wrap" data-v-d3f8b2e4${_scopeId}>${ssrInterpolate(__props.account.description || "No description provided")}</div></div><div data-v-d3f8b2e4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d3f8b2e4${_scopeId}>Status</label><span class="${ssrRenderClass([
              "inline-flex px-3 py-1 text-sm font-semibold rounded-full",
              __props.account.is_active ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
            ])}" data-v-d3f8b2e4${_scopeId}>${ssrInterpolate(__props.account.is_active ? "Active" : "Inactive")}</span></div></div></div></div><div class="space-y-6" data-v-d3f8b2e4${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-d3f8b2e4${_scopeId}><div class="p-6 border-b border-sage-200" data-v-d3f8b2e4${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-d3f8b2e4${_scopeId}>System Info</h3></div><div class="p-6 space-y-4" data-v-d3f8b2e4${_scopeId}><div data-v-d3f8b2e4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-d3f8b2e4${_scopeId}>Created At</label><div class="text-sm text-sage-800" data-v-d3f8b2e4${_scopeId}>${ssrInterpolate(formatDate(__props.account.created_at))}</div></div><div data-v-d3f8b2e4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-d3f8b2e4${_scopeId}>Updated At</label><div class="text-sm text-sage-800" data-v-d3f8b2e4${_scopeId}>${ssrInterpolate(formatDate(__props.account.updated_at))}</div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-d3f8b2e4${_scopeId}><div class="p-6 border-b border-sage-200" data-v-d3f8b2e4${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-d3f8b2e4${_scopeId}>Quick Actions</h3></div><div class="p-6 space-y-3" data-v-d3f8b2e4${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.chart-of-accounts.edit", __props.account.id),
              class: "w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span data-v-d3f8b2e4${_scopeId2}>Edit Account</span>`);
                } else {
                  return [
                    createVNode("span", null, "Edit Account")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.account.is_active) {
              _push2(`<button class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2" data-v-d3f8b2e4${_scopeId}><span data-v-d3f8b2e4${_scopeId}>Deactivate Account</span></button>`);
            } else {
              _push2(`<span class="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-400 border border-gray-200 rounded-lg" data-v-d3f8b2e4${_scopeId}> Account is inactive </span>`);
            }
            _push2(`</div></div></div></div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: showDeactivateModal.value,
              title: "Deactivate Account",
              message: `Are you sure you want to deactivate account '${__props.account.account_code}'?`,
              "confirm-text": "Deactivate",
              "cancel-text": "Cancel",
              onConfirm: deactivateAccount,
              onCancel: ($event) => showDeactivateModal.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Chart of Accounts - Details" }),
              createVNode("div", { class: "min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, "Chart of Accounts"),
                      createVNode("p", { class: "text-sage-600 mt-1" }, "Account details and configuration")
                    ]),
                    createVNode("div", { class: "flex items-center space-x-3" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.chart-of-accounts.edit", __props.account.id),
                        class: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Edit")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.chart-of-accounts.index"),
                        class: "bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", null, "Back")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200" }, [
                      createVNode("div", { class: "p-6 border-b border-sage-200" }, [
                        createVNode("h2", { class: "text-lg font-semibold text-sage-800" }, "Account Details")
                      ]),
                      createVNode("div", { class: "p-6 space-y-6" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Account Code"),
                          createVNode("div", { class: "text-lg font-semibold text-sage-900" }, toDisplayString(__props.account.account_code), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Account Name"),
                          createVNode("div", { class: "text-sage-800" }, toDisplayString(__props.account.account_name), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Account Type"),
                          createVNode("div", { class: "text-sage-800" }, toDisplayString(formatType(__props.account.account_type)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Account Category"),
                          createVNode("div", { class: "text-sage-800" }, toDisplayString(__props.account.account_category), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Parent Account"),
                          createVNode("div", { class: "text-sage-800" }, [
                            __props.account.parent ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(__props.account.parent.account_code) + " - " + toDisplayString(__props.account.parent.account_name), 1)) : (openBlock(), createBlock("span", { key: 1 }, "-"))
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Sort Order"),
                          createVNode("div", { class: "text-sage-800" }, toDisplayString(__props.account.sort_order ?? "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Description"),
                          createVNode("div", { class: "text-sage-800 whitespace-pre-wrap" }, toDisplayString(__props.account.description || "No description provided"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Status"),
                          createVNode("span", {
                            class: [
                              "inline-flex px-3 py-1 text-sm font-semibold rounded-full",
                              __props.account.is_active ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"
                            ]
                          }, toDisplayString(__props.account.is_active ? "Active" : "Inactive"), 3)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200" }, [
                      createVNode("div", { class: "p-6 border-b border-sage-200" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "System Info")
                      ]),
                      createVNode("div", { class: "p-6 space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, "Created At"),
                          createVNode("div", { class: "text-sm text-sage-800" }, toDisplayString(formatDate(__props.account.created_at)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, "Updated At"),
                          createVNode("div", { class: "text-sm text-sage-800" }, toDisplayString(formatDate(__props.account.updated_at)), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200" }, [
                      createVNode("div", { class: "p-6 border-b border-sage-200" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Quick Actions")
                      ]),
                      createVNode("div", { class: "p-6 space-y-3" }, [
                        createVNode(unref(Link), {
                          href: unref(route)("admin-keuangan.chart-of-accounts.edit", __props.account.id),
                          class: "w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
                        }, {
                          default: withCtx(() => [
                            createVNode("span", null, "Edit Account")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        __props.account.is_active ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: confirmDeactivate,
                          class: "w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
                        }, [
                          createVNode("span", null, "Deactivate Account")
                        ])) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-400 border border-gray-200 rounded-lg"
                        }, " Account is inactive "))
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(AlertDialog, {
                show: showDeactivateModal.value,
                title: "Deactivate Account",
                message: `Are you sure you want to deactivate account '${__props.account.account_code}'?`,
                "confirm-text": "Deactivate",
                "cancel-text": "Cancel",
                onConfirm: deactivateAccount,
                onCancel: ($event) => showDeactivateModal.value = false
              }, null, 8, ["show", "message", "onCancel"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ChartOfAccounts/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d3f8b2e4"]]);
export {
  Show as default
};
