import { ref, withCtx, unref, createBlock, createVNode, openBlock, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-LJhNLIxn.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-B0UJB87s.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    operationalCostCategory: Object
  },
  setup(__props) {
    const props = __props;
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.operational-cost-categories.index": "/admin-keuangan/operational-cost-categories",
        "admin-keuangan.operational-cost-categories.edit": "/admin-keuangan/operational-cost-categories",
        "admin-keuangan.operational-cost-categories.destroy": "/admin-keuangan/operational-cost-categories"
      };
      const baseRoute = routes[name] || "#";
      return params ? `${baseRoute}/${params}` : baseRoute;
    };
    const showDeleteModal = ref(false);
    const confirmDelete = () => {
      showDeleteModal.value = true;
    };
    const deleteCategory = () => {
      router.delete(route("admin-keuangan.operational-cost-categories.destroy", props.operationalCostCategory.id), {
        onSuccess: () => {
        }
      });
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
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
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Operational Cost Category Details" }, null, _parent2, _scopeId));
            _push2(`<div class="min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8" data-v-16171fb7${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6" data-v-16171fb7${_scopeId}><div class="flex items-center justify-between" data-v-16171fb7${_scopeId}><div data-v-16171fb7${_scopeId}><h1 class="text-2xl font-bold text-sage-800" data-v-16171fb7${_scopeId}> Operational Cost Category Details </h1><p class="text-sage-600 mt-1" data-v-16171fb7${_scopeId}> Detailed information about this category </p></div><div class="flex items-center space-x-3" data-v-16171fb7${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.operational-cost-categories.edit", __props.operationalCostCategory.id),
              class: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-16171fb7${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-16171fb7${_scopeId2}></path></svg><span data-v-16171fb7${_scopeId2}>Edit</span>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      })
                    ])),
                    createVNode("span", null, "Edit")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.operational-cost-categories.index"),
              class: "bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-16171fb7${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-16171fb7${_scopeId2}></path></svg><span data-v-16171fb7${_scopeId2}>Back</span>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
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
                    ])),
                    createVNode("span", null, "Back")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-16171fb7${_scopeId}><div class="lg:col-span-2" data-v-16171fb7${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-16171fb7${_scopeId}><div class="p-6 border-b border-sage-200" data-v-16171fb7${_scopeId}><h2 class="text-lg font-semibold text-sage-800" data-v-16171fb7${_scopeId}> Category Information </h2></div><div class="p-6 space-y-6" data-v-16171fb7${_scopeId}><div data-v-16171fb7${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-16171fb7${_scopeId}> Category Name </label><div class="text-lg font-semibold text-sage-900" data-v-16171fb7${_scopeId}>${ssrInterpolate(__props.operationalCostCategory.name)}</div></div><div data-v-16171fb7${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-16171fb7${_scopeId}> Description </label><div class="text-sage-800 whitespace-pre-wrap" data-v-16171fb7${_scopeId}>${ssrInterpolate(__props.operationalCostCategory.description || "No description provided")}</div></div><div data-v-16171fb7${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-16171fb7${_scopeId}> Status </label><span class="${ssrRenderClass([
              "inline-flex px-3 py-1 text-sm font-semibold rounded-full",
              __props.operationalCostCategory.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            ])}" data-v-16171fb7${_scopeId}>${ssrInterpolate(__props.operationalCostCategory.is_active ? "Active" : "Inactive")}</span></div></div></div></div><div class="space-y-6" data-v-16171fb7${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-16171fb7${_scopeId}><div class="p-6 border-b border-sage-200" data-v-16171fb7${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-16171fb7${_scopeId}> Audit Information </h3></div><div class="p-6 space-y-4" data-v-16171fb7${_scopeId}><div data-v-16171fb7${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-16171fb7${_scopeId}> Created By </label><div class="text-sm text-sage-800" data-v-16171fb7${_scopeId}>${ssrInterpolate(((_a = __props.operationalCostCategory.creator) == null ? void 0 : _a.name) || "-")}</div></div><div data-v-16171fb7${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-16171fb7${_scopeId}> Created At </label><div class="text-sm text-sage-800" data-v-16171fb7${_scopeId}>${ssrInterpolate(formatDate(__props.operationalCostCategory.created_at))}</div></div>`);
            if (__props.operationalCostCategory.updater) {
              _push2(`<div data-v-16171fb7${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-16171fb7${_scopeId}> Updated By </label><div class="text-sm text-sage-800" data-v-16171fb7${_scopeId}>${ssrInterpolate(__props.operationalCostCategory.updater.name)}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.operationalCostCategory.updated_at !== __props.operationalCostCategory.created_at) {
              _push2(`<div data-v-16171fb7${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-16171fb7${_scopeId}> Updated At </label><div class="text-sm text-sage-800" data-v-16171fb7${_scopeId}>${ssrInterpolate(formatDate(__props.operationalCostCategory.updated_at))}</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-16171fb7${_scopeId}><div class="p-6 border-b border-sage-200" data-v-16171fb7${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-16171fb7${_scopeId}> Quick Actions </h3></div><div class="p-6 space-y-3" data-v-16171fb7${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.operational-cost-categories.edit", __props.operationalCostCategory.id),
              class: "w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-16171fb7${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-16171fb7${_scopeId2}></path></svg><span data-v-16171fb7${_scopeId2}>Edit Category</span>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      })
                    ])),
                    createVNode("span", null, "Edit Category")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2" data-v-16171fb7${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-16171fb7${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-16171fb7${_scopeId}></path></svg><span data-v-16171fb7${_scopeId}>Delete Category</span></button></div></div></div></div></div>`);
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-16171fb7${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-16171fb7${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4" data-v-16171fb7${_scopeId}>Confirm Delete</h3><p class="text-sm text-gray-600 mb-6" data-v-16171fb7${_scopeId}> Are you sure you want to delete category &quot;${ssrInterpolate(__props.operationalCostCategory.name)}&quot;? This action cannot be undone. </p><div class="flex justify-end space-x-3" data-v-16171fb7${_scopeId}><button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors" data-v-16171fb7${_scopeId}> Cancel </button><button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors" data-v-16171fb7${_scopeId}> Delete </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Operational Cost Category Details" }),
              createVNode("div", { class: "min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, " Operational Cost Category Details "),
                      createVNode("p", { class: "text-sage-600 mt-1" }, " Detailed information about this category ")
                    ]),
                    createVNode("div", { class: "flex items-center space-x-3" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.operational-cost-categories.edit", __props.operationalCostCategory.id),
                        class: "bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            })
                          ])),
                          createVNode("span", null, "Edit")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.operational-cost-categories.index"),
                        class: "bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4",
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
                          ])),
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
                        createVNode("h2", { class: "text-lg font-semibold text-sage-800" }, " Category Information ")
                      ]),
                      createVNode("div", { class: "p-6 space-y-6" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Category Name "),
                          createVNode("div", { class: "text-lg font-semibold text-sage-900" }, toDisplayString(__props.operationalCostCategory.name), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Description "),
                          createVNode("div", { class: "text-sage-800 whitespace-pre-wrap" }, toDisplayString(__props.operationalCostCategory.description || "No description provided"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Status "),
                          createVNode("span", {
                            class: [
                              "inline-flex px-3 py-1 text-sm font-semibold rounded-full",
                              __props.operationalCostCategory.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            ]
                          }, toDisplayString(__props.operationalCostCategory.is_active ? "Active" : "Inactive"), 3)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200" }, [
                      createVNode("div", { class: "p-6 border-b border-sage-200" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Audit Information ")
                      ]),
                      createVNode("div", { class: "p-6 space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Created By "),
                          createVNode("div", { class: "text-sm text-sage-800" }, toDisplayString(((_b = __props.operationalCostCategory.creator) == null ? void 0 : _b.name) || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Created At "),
                          createVNode("div", { class: "text-sm text-sage-800" }, toDisplayString(formatDate(__props.operationalCostCategory.created_at)), 1)
                        ]),
                        __props.operationalCostCategory.updater ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Updated By "),
                          createVNode("div", { class: "text-sm text-sage-800" }, toDisplayString(__props.operationalCostCategory.updater.name), 1)
                        ])) : createCommentVNode("", true),
                        __props.operationalCostCategory.updated_at !== __props.operationalCostCategory.created_at ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Updated At "),
                          createVNode("div", { class: "text-sm text-sage-800" }, toDisplayString(formatDate(__props.operationalCostCategory.updated_at)), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200" }, [
                      createVNode("div", { class: "p-6 border-b border-sage-200" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Quick Actions ")
                      ]),
                      createVNode("div", { class: "p-6 space-y-3" }, [
                        createVNode(unref(Link), {
                          href: unref(route)("admin-keuangan.operational-cost-categories.edit", __props.operationalCostCategory.id),
                          class: "w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              })
                            ])),
                            createVNode("span", null, "Edit Category")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          onClick: confirmDelete,
                          class: "w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center justify-center space-x-2"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            })
                          ])),
                          createVNode("span", null, "Delete Category")
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              showDeleteModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }, [
                  createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Confirm Delete"),
                  createVNode("p", { class: "text-sm text-gray-600 mb-6" }, ' Are you sure you want to delete category "' + toDisplayString(__props.operationalCostCategory.name) + '"? This action cannot be undone. ', 1),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: ($event) => showDeleteModal.value = false,
                      class: "bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                    }, " Cancel ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: deleteCategory,
                      class: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    }, " Delete ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/OperationalCostCategories/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-16171fb7"]]);
export {
  Show as default
};
