import { reactive, computed, withCtx, unref, createVNode, createTextVNode, withDirectives, withKeys, vModelText, vModelSelect, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { Plus, Search, Edit, Trash2, PackageSearch } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    serviceTypes: Object,
    filters: Object
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const form = reactive({
      search: ((_a = props.filters) == null ? void 0 : _a.search) || "",
      status: ((_b = props.filters) == null ? void 0 : _b.status) || ""
    });
    const currentIndexQuery = computed(() => {
      var _a2;
      const query = {
        search: form.search || void 0,
        status: form.status || void 0
      };
      const currentPage = (_a2 = props.serviceTypes) == null ? void 0 : _a2.current_page;
      if (currentPage && Number(currentPage) > 1) {
        query.page = currentPage;
      }
      return query;
    });
    const deleteModal = reactive({
      show: false,
      serviceType: null
    });
    const search = () => {
      router.get(
        route("admin-keuangan.service-types.index"),
        {
          search: form.search,
          status: form.status
        },
        {
          preserveState: true,
          preserveScroll: true
        }
      );
    };
    const visitPage = (url) => {
      const targetUrl = new URL(url, window.location.origin);
      const page = targetUrl.searchParams.get("page");
      router.visit(targetUrl.pathname, {
        data: {
          search: form.search || void 0,
          status: form.status || void 0,
          page: page || void 0
        },
        preserveState: true,
        preserveScroll: true,
        replace: true
      });
    };
    const appendQuery = (url, query) => {
      const queryString = new URLSearchParams(
        Object.entries(query).filter(([, value]) => value !== void 0 && value !== null && value !== "")
      ).toString();
      return queryString ? `${url}${url.includes("?") ? "&" : "?"}${queryString}` : url;
    };
    const getEditUrl = (serviceTypeId) => {
      return appendQuery(route("admin-keuangan.service-types.edit", serviceTypeId), currentIndexQuery.value);
    };
    const confirmDelete = (serviceType) => {
      deleteModal.serviceType = serviceType;
      deleteModal.show = true;
    };
    const deleteServiceType = () => {
      router.delete(route("admin-keuangan.service-types.destroy", deleteModal.serviceType.id), {
        data: { ...currentIndexQuery.value },
        onSuccess: () => {
          deleteModal.show = false;
          deleteModal.serviceType = null;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Service Type Management" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Service Type Management</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Manage service/fee types for vendor items.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.service-types.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Add Service Type `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Add Service Type ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div class="md:col-span-2"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Search Data</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Search code, name, or description..." class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Status</label><select class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "") : ssrLooseEqual(form.status, "")) ? " selected" : ""}${_scopeId}>All Statuses</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "1") : ssrLooseEqual(form.status, "1")) ? " selected" : ""}${_scopeId}>Active</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "0") : ssrLooseEqual(form.status, "0")) ? " selected" : ""}${_scopeId}>Inactive</option><option value="deleted"${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "deleted") : ssrLooseEqual(form.status, "deleted")) ? " selected" : ""}${_scopeId}>Deleted</option></select></div></div><div class="mt-4"${_scopeId}><button class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Search), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Search </button></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> No </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Code </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Description </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th scope="col" class="relative px-6 py-3"${_scopeId}><span class="sr-only"${_scopeId}>Actions</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.serviceTypes.data, (serviceType, index) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate((__props.serviceTypes.from ?? 1) + index)}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(serviceType.code)}</div></td><td class="px-6 py-4 text-sm text-gray-500"${_scopeId}>${ssrInterpolate(serviceType.description || "-")}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}>`);
              if (serviceType.deleted_at) {
                _push2(`<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700"${_scopeId}> Deleted </span>`);
              } else {
                _push2(`<span class="${ssrRenderClass(
                  serviceType.is_active ? "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800" : "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"
                )}"${_scopeId}>${ssrInterpolate(serviceType.is_active ? "Active" : "Inactive")}</span>`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><div class="flex space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: getEditUrl(serviceType.id),
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
              if (!serviceType.deleted_at) {
                _push2(`<button class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" title="Delete"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<span class="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 border border-gray-200 rounded"${_scopeId}> Already deleted </span>`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.serviceTypes.data.length === 0) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(PackageSearch), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}>No service types yet</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}>Start by adding the first service type.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (((_a2 = __props.serviceTypes) == null ? void 0 : _a2.links) && __props.serviceTypes.links.length > 3) {
              _push2(`<div class="mt-6 bg-white px-4 py-3 border-t border-gray-200 sm:px-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(((_b2 = __props.serviceTypes) == null ? void 0 : _b2.from) ?? 0)} to ${ssrInterpolate(((_c = __props.serviceTypes) == null ? void 0 : _c.to) ?? 0)} of ${ssrInterpolate(((_d = __props.serviceTypes) == null ? void 0 : _d.total) ?? 0)} service types </div><div class="flex space-x-1"${_scopeId}><!--[-->`);
              ssrRenderList(((_e = __props.serviceTypes) == null ? void 0 : _e.links) || [], (link) => {
                _push2(`<!--[-->`);
                if (link.url) {
                  _push2(`<button class="${ssrRenderClass([
                    "px-3 py-2 text-sm rounded-md",
                    link.active ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-300"
                  ])}"${_scopeId}>${link.label ?? ""}</button>`);
                } else {
                  _push2(`<span class="px-3 py-2 text-sm text-gray-400"${_scopeId}>${link.label ?? ""}</span>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: deleteModal.show,
              title: "Confirm Deletion",
              message: `Are you sure you want to delete service type '${(_f = deleteModal.serviceType) == null ? void 0 : _f.code}'?`,
              "confirm-text": "Delete",
              "cancel-text": "Cancel",
              onConfirm: deleteServiceType,
              onCancel: ($event) => deleteModal.show = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Service Type Management" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Service Type Management"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Manage service/fee types for vendor items.")
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.service-types.create"),
                      class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Add Service Type ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                        createVNode("div", { class: "md:col-span-2" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Search Data"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => form.search = $event,
                            type: "text",
                            placeholder: "Search code, name, or description...",
                            class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm",
                            onKeyup: withKeys(search, ["enter"])
                          }, null, 40, ["onUpdate:modelValue"]), [
                            [vModelText, form.search]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Status"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => form.status = $event,
                            class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"
                          }, [
                            createVNode("option", { value: "" }, "All Statuses"),
                            createVNode("option", { value: "1" }, "Active"),
                            createVNode("option", { value: "0" }, "Inactive"),
                            createVNode("option", { value: "deleted" }, "Deleted")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, form.status]
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
                              }, " Description "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Status "),
                              createVNode("th", {
                                scope: "col",
                                class: "relative px-6 py-3"
                              }, [
                                createVNode("span", { class: "sr-only" }, "Actions")
                              ])
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.serviceTypes.data, (serviceType, index) => {
                              return openBlock(), createBlock("tr", {
                                key: serviceType.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString((__props.serviceTypes.from ?? 1) + index), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(serviceType.code), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 text-sm text-gray-500" }, toDisplayString(serviceType.description || "-"), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  serviceType.deleted_at ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-700"
                                  }, " Deleted ")) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: serviceType.is_active ? "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800" : "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"
                                  }, toDisplayString(serviceType.is_active ? "Active" : "Inactive"), 3))
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                  createVNode("div", { class: "flex space-x-2" }, [
                                    createVNode(unref(Link), {
                                      href: getEditUrl(serviceType.id),
                                      class: "text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50",
                                      title: "Edit"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Edit), { class: "w-4 h-4" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    !serviceType.deleted_at ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      onClick: ($event) => confirmDelete(serviceType),
                                      class: "text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50",
                                      title: "Delete"
                                    }, [
                                      createVNode(unref(Trash2), { class: "w-4 h-4" })
                                    ], 8, ["onClick"])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 border border-gray-200 rounded"
                                    }, " Already deleted "))
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      __props.serviceTypes.data.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-12"
                      }, [
                        createVNode(unref(PackageSearch), { class: "mx-auto h-12 w-12 text-gray-400" }),
                        createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No service types yet"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Start by adding the first service type.")
                      ])) : createCommentVNode("", true),
                      ((_g = __props.serviceTypes) == null ? void 0 : _g.links) && __props.serviceTypes.links.length > 3 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-6 bg-white px-4 py-3 border-t border-gray-200 sm:px-6"
                      }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(((_h = __props.serviceTypes) == null ? void 0 : _h.from) ?? 0) + " to " + toDisplayString(((_i = __props.serviceTypes) == null ? void 0 : _i.to) ?? 0) + " of " + toDisplayString(((_j = __props.serviceTypes) == null ? void 0 : _j.total) ?? 0) + " service types ", 1),
                          createVNode("div", { class: "flex space-x-1" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(((_k = __props.serviceTypes) == null ? void 0 : _k.links) || [], (link) => {
                              return openBlock(), createBlock(Fragment, {
                                key: link.label
                              }, [
                                link.url ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => visitPage(link.url),
                                  class: [
                                    "px-3 py-2 text-sm rounded-md",
                                    link.active ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-300"
                                  ],
                                  innerHTML: link.label
                                }, null, 10, ["onClick", "innerHTML"])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "px-3 py-2 text-sm text-gray-400",
                                  innerHTML: link.label
                                }, null, 8, ["innerHTML"]))
                              ], 64);
                            }), 128))
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ]),
              createVNode(AlertDialog, {
                show: deleteModal.show,
                title: "Confirm Deletion",
                message: `Are you sure you want to delete service type '${(_l = deleteModal.serviceType) == null ? void 0 : _l.code}'?`,
                "confirm-text": "Delete",
                "cancel-text": "Cancel",
                onConfirm: deleteServiceType,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ServiceTypes/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
