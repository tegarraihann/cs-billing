import { ref, withCtx, unref, createTextVNode, createBlock, openBlock, createVNode, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { M as MasterAdminLayout } from "./MasterAdminLayout-DdhkBJT4.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-Docsn73D.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    supportServices: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const dashboardRoute = route("masteradmin.dashboard");
    route("masteradmin.users.index");
    route(
      "masteradmin.website-settings.pengaturan-umum.index"
    );
    route("masteradmin.website-settings.services.index");
    route(
      "masteradmin.website-settings.support-services.index"
    );
    route("masteradmin.website-settings.team.index");
    const createRoute = route(
      "masteradmin.website-settings.support-services.create"
    );
    route("home");
    const showDeleteModal = ref(false);
    const supportServiceToDelete = ref(null);
    const getEditRoute = (id) => {
      return route("masteradmin.website-settings.support-services.edit", id);
    };
    const toggleSupportServiceStatus = (supportService) => {
      var _a;
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append(
        "_token",
        (_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")
      );
      router.post(
        `/master-admin/website-settings/support-services/${supportService.id}/toggle-status`,
        formData,
        {
          preserveState: false
        }
      );
    };
    const confirmDelete = (supportService) => {
      supportServiceToDelete.value = supportService;
      showDeleteModal.value = true;
    };
    const cancelDelete = () => {
      showDeleteModal.value = false;
      supportServiceToDelete.value = null;
    };
    const deleteSupportService = () => {
      if (supportServiceToDelete.value) {
        router.delete(
          route(
            "masteradmin.website-settings.support-services.destroy",
            supportServiceToDelete.value.id
          ),
          {
            onSuccess: () => {
              showDeleteModal.value = false;
              supportServiceToDelete.value = null;
            }
          }
        );
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(MasterAdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Support Services" }, null, _parent2, _scopeId));
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-ea1582c0${_scopeId}><div class="mb-6" data-v-ea1582c0${_scopeId}><nav class="flex" aria-label="Breadcrumb" data-v-ea1582c0${_scopeId}><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-ea1582c0${_scopeId}><li class="inline-flex items-center" data-v-ea1582c0${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(dashboardRoute),
              class: "text-sage-600 hover:text-sage-800 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Dashboard `);
                } else {
                  return [
                    createTextVNode(" Dashboard ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</li><li data-v-ea1582c0${_scopeId}><div class="flex items-center" data-v-ea1582c0${_scopeId}><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-ea1582c0${_scopeId}><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-ea1582c0${_scopeId}></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-ea1582c0${_scopeId}>Website Settings</span></div></li><li data-v-ea1582c0${_scopeId}><div class="flex items-center" data-v-ea1582c0${_scopeId}><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-ea1582c0${_scopeId}><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-ea1582c0${_scopeId}></path></svg><span class="ml-1 text-sage-700 md:ml-2 font-medium" data-v-ea1582c0${_scopeId}>Support Services</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-ea1582c0${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-ea1582c0${_scopeId}><div data-v-ea1582c0${_scopeId}><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-ea1582c0${_scopeId}> Support Services Management </h2><p class="text-sage-600" data-v-ea1582c0${_scopeId}> Manage support services displayed on your website </p></div><div class="mt-4 sm:mt-0" data-v-ea1582c0${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(createRoute),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ea1582c0${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-ea1582c0${_scopeId2}></path></svg> Add Support Service `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 mr-2",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                      })
                    ])),
                    createTextVNode(" Add Support Service ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
            if ((_a = _ctx.$page.props.flash) == null ? void 0 : _a.success) {
              _push2(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-ea1582c0${_scopeId}><span class="block sm:inline" data-v-ea1582c0${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_b = _ctx.$page.props.flash) == null ? void 0 : _b.error) {
              _push2(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-ea1582c0${_scopeId}><span class="block sm:inline" data-v-ea1582c0${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white shadow-sm border border-sage-200 sm:rounded-lg overflow-hidden" data-v-ea1582c0${_scopeId}><div class="overflow-x-auto" data-v-ea1582c0${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-ea1582c0${_scopeId}><thead class="bg-gray-50" data-v-ea1582c0${_scopeId}><tr data-v-ea1582c0${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ea1582c0${_scopeId}> Support Service </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ea1582c0${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ea1582c0${_scopeId}> Order </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-ea1582c0${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-ea1582c0${_scopeId}><!--[-->`);
            ssrRenderList(__props.supportServices, (supportService) => {
              _push2(`<tr class="hover:bg-gray-50 transition-colors" data-v-ea1582c0${_scopeId}><td class="px-6 py-4" data-v-ea1582c0${_scopeId}><div class="flex items-center" data-v-ea1582c0${_scopeId}><div class="flex-shrink-0 h-16 w-16" data-v-ea1582c0${_scopeId}>`);
              if (supportService.image_path) {
                _push2(`<img${ssrRenderAttr("src", `/storage/${supportService.image_path}`)}${ssrRenderAttr("alt", supportService.title)} class="h-16 w-16 rounded-lg object-cover border border-gray-200" data-v-ea1582c0${_scopeId}>`);
              } else {
                _push2(`<div class="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200" data-v-ea1582c0${_scopeId}><svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ea1582c0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-ea1582c0${_scopeId}></path></svg></div>`);
              }
              _push2(`</div><div class="ml-4" data-v-ea1582c0${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-ea1582c0${_scopeId}>${ssrInterpolate(supportService.title)}</div><div class="text-sm text-gray-500 max-w-xs truncate" data-v-ea1582c0${_scopeId}>${ssrInterpolate(supportService.description)}</div></div></div></td><td class="px-6 py-4" data-v-ea1582c0${_scopeId}><span class="${ssrRenderClass([
                supportService.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                "inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              ])}" data-v-ea1582c0${_scopeId}>${ssrInterpolate(supportService.is_active ? "Active" : "Inactive")}</span></td><td class="px-6 py-4 text-sm text-gray-500" data-v-ea1582c0${_scopeId}>${ssrInterpolate(supportService.order_index)}</td><td class="px-6 py-4 text-right" data-v-ea1582c0${_scopeId}><div class="flex items-center justify-end space-x-2" data-v-ea1582c0${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: getEditRoute(supportService.id),
                class: "text-blue-600 hover:text-blue-800 p-1 rounded transition-colors",
                title: "Edit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ea1582c0${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-ea1582c0${_scopeId2}></path></svg>`);
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
                      ]))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="${ssrRenderClass([
                supportService.is_active ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800",
                "p-1 rounded transition-colors"
              ])}"${ssrRenderAttr(
                "title",
                supportService.is_active ? "Nonaktifkan" : "Aktifkan"
              )} data-v-ea1582c0${_scopeId}>`);
              if (supportService.is_active) {
                _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ea1582c0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" data-v-ea1582c0${_scopeId}></path></svg>`);
              } else {
                _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ea1582c0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ea1582c0${_scopeId}></path></svg>`);
              }
              _push2(`</button><button class="text-red-600 hover:text-red-800 p-1 rounded transition-colors" title="Delete" data-v-ea1582c0${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ea1582c0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-ea1582c0${_scopeId}></path></svg></button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.supportServices.length === 0) {
              _push2(`<div class="text-center py-12" data-v-ea1582c0${_scopeId}><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-ea1582c0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-ea1582c0${_scopeId}></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900" data-v-ea1582c0${_scopeId}> No support services </h3><p class="mt-1 text-sm text-gray-500" data-v-ea1582c0${_scopeId}> Get started by creating a new support service. </p><div class="mt-6" data-v-ea1582c0${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(createRoute),
                class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" data-v-ea1582c0${_scopeId2}><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" data-v-ea1582c0${_scopeId2}></path></svg> New Support Service `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        class: "-ml-1 mr-2 h-5 w-5",
                        fill: "currentColor",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", {
                          "fill-rule": "evenodd",
                          d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                          "clip-rule": "evenodd"
                        })
                      ])),
                      createTextVNode(" New Support Service ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" data-v-ea1582c0${_scopeId}><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" data-v-ea1582c0${_scopeId}><div class="mt-3 text-center" data-v-ea1582c0${_scopeId}><div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100" data-v-ea1582c0${_scopeId}><svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ea1582c0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-ea1582c0${_scopeId}></path></svg></div><h3 class="text-lg font-medium text-gray-900 mt-5" data-v-ea1582c0${_scopeId}> Delete Support Service </h3><div class="mt-2 px-7 py-3" data-v-ea1582c0${_scopeId}><p class="text-sm text-gray-500" data-v-ea1582c0${_scopeId}> Are you sure you want to delete &quot;<strong data-v-ea1582c0${_scopeId}>${ssrInterpolate((_c = supportServiceToDelete.value) == null ? void 0 : _c.title)}</strong>&quot;? This action cannot be undone. </p></div><div class="flex justify-center space-x-4 py-3" data-v-ea1582c0${_scopeId}><button class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300" data-v-ea1582c0${_scopeId}> Cancel </button><button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" data-v-ea1582c0${_scopeId}> Delete </button></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Support Services" }),
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("nav", {
                    class: "flex",
                    "aria-label": "Breadcrumb"
                  }, [
                    createVNode("ol", { class: "inline-flex items-center space-x-1 md:space-x-3" }, [
                      createVNode("li", { class: "inline-flex items-center" }, [
                        createVNode(unref(Link), {
                          href: unref(dashboardRoute),
                          class: "text-sage-600 hover:text-sage-800 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Dashboard ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ]),
                      createVNode("li", null, [
                        createVNode("div", { class: "flex items-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 text-sage-400",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                              "clip-rule": "evenodd"
                            })
                          ])),
                          createVNode("span", { class: "ml-1 text-sage-500 md:ml-2" }, "Website Settings")
                        ])
                      ]),
                      createVNode("li", null, [
                        createVNode("div", { class: "flex items-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 text-sage-400",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                              "clip-rule": "evenodd"
                            })
                          ])),
                          createVNode("span", { class: "ml-1 text-sage-700 md:ml-2 font-medium" }, "Support Services")
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800 mb-2" }, " Support Services Management "),
                      createVNode("p", { class: "text-sage-600" }, " Manage support services displayed on your website ")
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: unref(createRoute),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 transition-colors"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5 mr-2",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                            })
                          ])),
                          createTextVNode(" Add Support Service ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                ((_d = _ctx.$page.props.flash) == null ? void 0 : _d.success) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                }, [
                  createVNode("span", { class: "block sm:inline" }, toDisplayString(_ctx.$page.props.flash.success), 1)
                ])) : createCommentVNode("", true),
                ((_e = _ctx.$page.props.flash) == null ? void 0 : _e.error) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                }, [
                  createVNode("span", { class: "block sm:inline" }, toDisplayString(_ctx.$page.props.flash.error), 1)
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "bg-white shadow-sm border border-sage-200 sm:rounded-lg overflow-hidden" }, [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Support Service "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Order "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.supportServices, (supportService) => {
                          return openBlock(), createBlock("tr", {
                            key: supportService.id,
                            class: "hover:bg-gray-50 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode("div", { class: "flex-shrink-0 h-16 w-16" }, [
                                  supportService.image_path ? (openBlock(), createBlock("img", {
                                    key: 0,
                                    src: `/storage/${supportService.image_path}`,
                                    alt: supportService.title,
                                    class: "h-16 w-16 rounded-lg object-cover border border-gray-200"
                                  }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200"
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "h-8 w-8 text-gray-400",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"
                                      })
                                    ]))
                                  ]))
                                ]),
                                createVNode("div", { class: "ml-4" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(supportService.title), 1),
                                  createVNode("div", { class: "text-sm text-gray-500 max-w-xs truncate" }, toDisplayString(supportService.description), 1)
                                ])
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("span", {
                                class: [
                                  "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                                  supportService.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                ]
                              }, toDisplayString(supportService.is_active ? "Active" : "Inactive"), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-500" }, toDisplayString(supportService.order_index), 1),
                            createVNode("td", { class: "px-6 py-4 text-right" }, [
                              createVNode("div", { class: "flex items-center justify-end space-x-2" }, [
                                createVNode(unref(Link), {
                                  href: getEditRoute(supportService.id),
                                  class: "text-blue-600 hover:text-blue-800 p-1 rounded transition-colors",
                                  title: "Edit"
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
                                    ]))
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => toggleSupportServiceStatus(supportService),
                                  class: [
                                    "p-1 rounded transition-colors",
                                    supportService.is_active ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800"
                                  ],
                                  title: supportService.is_active ? "Nonaktifkan" : "Aktifkan"
                                }, [
                                  supportService.is_active ? (openBlock(), createBlock("svg", {
                                    key: 0,
                                    class: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                                    })
                                  ])) : (openBlock(), createBlock("svg", {
                                    key: 1,
                                    class: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    })
                                  ]))
                                ], 10, ["onClick", "title"]),
                                createVNode("button", {
                                  onClick: ($event) => confirmDelete(supportService),
                                  class: "text-red-600 hover:text-red-800 p-1 rounded transition-colors",
                                  title: "Delete"
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
                                  ]))
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  __props.supportServices.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-12"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "mx-auto h-12 w-12 text-gray-400",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"
                      })
                    ])),
                    createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, " No support services "),
                    createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " Get started by creating a new support service. "),
                    createVNode("div", { class: "mt-6" }, [
                      createVNode(unref(Link), {
                        href: unref(createRoute),
                        class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "-ml-1 mr-2 h-5 w-5",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z",
                              "clip-rule": "evenodd"
                            })
                          ])),
                          createTextVNode(" New Support Service ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              showDeleteModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50",
                onClick: cancelDelete
              }, [
                createVNode("div", { class: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" }, [
                  createVNode("div", { class: "mt-3 text-center" }, [
                    createVNode("div", { class: "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-6 w-6 text-red-600",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                        })
                      ]))
                    ]),
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 mt-5" }, " Delete Support Service "),
                    createVNode("div", { class: "mt-2 px-7 py-3" }, [
                      createVNode("p", { class: "text-sm text-gray-500" }, [
                        createTextVNode(' Are you sure you want to delete "'),
                        createVNode("strong", null, toDisplayString((_f = supportServiceToDelete.value) == null ? void 0 : _f.title), 1),
                        createTextVNode('"? This action cannot be undone. ')
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-center space-x-4 py-3" }, [
                      createVNode("button", {
                        onClick: cancelDelete,
                        class: "px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                      }, " Cancel "),
                      createVNode("button", {
                        onClick: deleteSupportService,
                        class: "px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      }, " Delete ")
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/SupportService/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ea1582c0"]]);
export {
  Index as default
};
