import { reactive, withCtx, unref, createVNode, createTextVNode, withDirectives, withKeys, vModelText, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-LJhNLIxn.js";
import { P as Pagination } from "./Pagination-JgWO_U2H.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { Plus, Search, Edit, Trash2, PackageSearch } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-B0UJB87s.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    packageUnits: Object,
    search: String
  },
  setup(__props) {
    const props = __props;
    const form = reactive({
      search: props.search || ""
    });
    const deleteModal = reactive({
      show: false,
      unit: null
    });
    const search = () => {
      router.get(
        route("admin-keuangan.master-package-units.index"),
        {
          search: form.search
        },
        {
          preserveState: true,
          preserveScroll: true
        }
      );
    };
    const toggleStatus = (unit) => {
      router.patch(route("admin-keuangan.master-package-units.toggle-status", unit.id), {}, {
        preserveScroll: true
      });
    };
    const confirmDelete = (unit) => {
      deleteModal.unit = unit;
      deleteModal.show = true;
    };
    const deleteUnit = () => {
      router.delete(route("admin-keuangan.master-package-units.destroy", deleteModal.unit.id), {
        onSuccess: () => {
          deleteModal.show = false;
          deleteModal.unit = null;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Master Package Units" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Master Package Units</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Manage package units for Sales Orders and Invoices</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.master-package-units.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Add Package Unit `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Add Package Unit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="grid grid-cols-1 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Search</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Search by code, name, or description..." class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"${_scopeId}></div></div><div class="mt-4"${_scopeId}><button class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Search </button></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> No </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Code </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Name </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Description </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Sort Order </th><th scope="col" class="relative px-6 py-3"${_scopeId}><span class="sr-only"${_scopeId}>Actions</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.packageUnits.data, (unit, index) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate((__props.packageUnits.from ?? 1) + index)}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(unit.code)}</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700"${_scopeId}>${ssrInterpolate(unit.name)}</td><td class="px-6 py-4 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unit.description || "-")}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><button class="${ssrRenderClass([unit.is_active ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200", "inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors"])}"${_scopeId}>${ssrInterpolate(unit.is_active ? "Active" : "Inactive")}</button></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unit.sort_order)}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><div class="flex space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.master-package-units.edit", unit.id),
                class: "text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50",
                title: "Edit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Edit), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Edit), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" title="Delete"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.packageUnits.data.length === 0) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(PackageSearch), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}>No package units found</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}>Start by adding your first package unit</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (((_a = __props.packageUnits) == null ? void 0 : _a.data) && __props.packageUnits.data.length > 0) {
              _push2(`<div class="mt-6"${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.packageUnits }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: deleteModal.show,
              title: "Delete Package Unit",
              message: `Are you sure you want to delete package unit '${(_b = deleteModal.unit) == null ? void 0 : _b.code}'?`,
              "confirm-text": "Delete",
              "cancel-text": "Cancel",
              onConfirm: deleteUnit,
              onCancel: ($event) => deleteModal.show = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Master Package Units" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Master Package Units"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Manage package units for Sales Orders and Invoices")
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.master-package-units.create"),
                      class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Add Package Unit ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "grid grid-cols-1 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Search"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => form.search = $event,
                            type: "text",
                            placeholder: "Search by code, name, or description...",
                            class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm",
                            onKeyup: withKeys(search, ["enter"])
                          }, null, 40, ["onUpdate:modelValue"]), [
                            [vModelText, form.search]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-4" }, [
                        createVNode("button", {
                          onClick: search,
                          class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, [
                          createVNode(unref(Search), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Search ")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " No "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Code "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Name "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Description "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Status "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Sort Order "),
                              createVNode("th", {
                                scope: "col",
                                class: "relative px-6 py-3"
                              }, [
                                createVNode("span", { class: "sr-only" }, "Actions")
                              ])
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.packageUnits.data, (unit, index) => {
                              return openBlock(), createBlock("tr", {
                                key: unit.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString((__props.packageUnits.from ?? 1) + index), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(unit.code), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-700" }, toDisplayString(unit.name), 1),
                                createVNode("td", { class: "px-6 py-4 text-sm text-gray-500" }, toDisplayString(unit.description || "-"), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("button", {
                                    onClick: ($event) => toggleStatus(unit),
                                    class: ["inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors", unit.is_active ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"]
                                  }, toDisplayString(unit.is_active ? "Active" : "Inactive"), 11, ["onClick"])
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(unit.sort_order), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                  createVNode("div", { class: "flex space-x-2" }, [
                                    createVNode(unref(Link), {
                                      href: _ctx.route("admin-keuangan.master-package-units.edit", unit.id),
                                      class: "text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50",
                                      title: "Edit"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Edit), { class: "w-4 h-4" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    createVNode("button", {
                                      onClick: ($event) => confirmDelete(unit),
                                      class: "text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50",
                                      title: "Delete"
                                    }, [
                                      createVNode(unref(Trash2), { class: "w-4 h-4" })
                                    ], 8, ["onClick"])
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      __props.packageUnits.data.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-12"
                      }, [
                        createVNode(unref(PackageSearch), { class: "mx-auto h-12 w-12 text-gray-400" }),
                        createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No package units found"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Start by adding your first package unit")
                      ])) : createCommentVNode("", true),
                      ((_c = __props.packageUnits) == null ? void 0 : _c.data) && __props.packageUnits.data.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-6"
                      }, [
                        createVNode(Pagination, { data: __props.packageUnits }, null, 8, ["data"])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ]),
              createVNode(AlertDialog, {
                show: deleteModal.show,
                title: "Delete Package Unit",
                message: `Are you sure you want to delete package unit '${(_d = deleteModal.unit) == null ? void 0 : _d.code}'?`,
                "confirm-text": "Delete",
                "cancel-text": "Cancel",
                onConfirm: deleteUnit,
                onCancel: ($event) => deleteModal.show = false
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/MasterPackageUnits/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
