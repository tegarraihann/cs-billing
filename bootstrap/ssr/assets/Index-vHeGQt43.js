import { ref, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import SidebarNavigation from "./SidebarNavigation-A0RXUIxC.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
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
    const isMobileSidebarOpen = ref(false);
    const showDeleteModal = ref(false);
    const supportServiceToDelete = ref(null);
    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false;
    };
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    const getEditRoute = (id) => {
      return route("masteradmin.website-settings.support-services.edit", id);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        isMobileSidebarOpen.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-0efa74f8><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-0efa74f8><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-0efa74f8><div class="flex justify-between items-center h-16" data-v-0efa74f8><div class="lg:hidden" data-v-0efa74f8><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-0efa74f8><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efa74f8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-0efa74f8></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-0efa74f8><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-0efa74f8> Support Services </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-0efa74f8>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-0efa74f8${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-0efa74f8${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-0efa74f8${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-0efa74f8${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-0efa74f8${_scopeId}>${ssrInterpolate((_b2 = _ctx.$page.props.auth.user) == null ? void 0 : _b2.name)}</p><p class="text-xs text-sage-500" data-v-0efa74f8${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efa74f8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-0efa74f8${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c2 = _ctx.$page.props.auth.user) == null ? void 0 : _c2.name)), 1)
                ]),
                createVNode("div", { class: "hidden sm:block text-left" }, [
                  createVNode("p", { class: "text-sm font-medium text-sage-700" }, toDisplayString((_d = _ctx.$page.props.auth.user) == null ? void 0 : _d.name), 1),
                  createVNode("p", { class: "text-xs text-sage-500" }, "Master Administrator")
                ]),
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 text-sage-600 hidden sm:block",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M19 9l-7 7-7-7"
                  })
                ]))
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-1" data-v-0efa74f8${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efa74f8${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-0efa74f8${_scopeId2}></path></svg><span data-v-0efa74f8${_scopeId2}>Profile</span>`);
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
                        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      })
                    ])),
                    createVNode("span", null, "Profile")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="border-t border-gray-100 my-1" data-v-0efa74f8${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efa74f8${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-0efa74f8${_scopeId2}></path></svg><span data-v-0efa74f8${_scopeId2}>Log Out</span>`);
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
                        d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      })
                    ])),
                    createVNode("span", null, "Log Out")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "py-1" }, [
                createVNode(_sfc_main$2, {
                  href: _ctx.route("profile.edit"),
                  class: "flex items-center space-x-2 px-4 py-2"
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
                        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      })
                    ])),
                    createVNode("span", null, "Profile")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("div", { class: "border-t border-gray-100 my-1" }),
                createVNode(_sfc_main$2, {
                  href: _ctx.route("logout"),
                  method: "post",
                  as: "button",
                  class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
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
                        d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      })
                    ])),
                    createVNode("span", null, "Log Out")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav>`);
      if (isMobileSidebarOpen.value) {
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-0efa74f8></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-0efa74f8><div class="p-4 sm:p-6 lg:p-8" data-v-0efa74f8><div class="mb-6" data-v-0efa74f8><nav class="flex" aria-label="Breadcrumb" data-v-0efa74f8><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-0efa74f8><li class="inline-flex items-center" data-v-0efa74f8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(dashboardRoute),
        class: "text-sage-600 hover:text-sage-800 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-0efa74f8><div class="flex items-center" data-v-0efa74f8><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-0efa74f8><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-0efa74f8></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-0efa74f8>Website Settings</span></div></li><li data-v-0efa74f8><div class="flex items-center" data-v-0efa74f8><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-0efa74f8><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-0efa74f8></path></svg><span class="ml-1 text-sage-700 md:ml-2 font-medium" data-v-0efa74f8>Support Services</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-0efa74f8><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-0efa74f8><div data-v-0efa74f8><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-0efa74f8> Support Services Management </h2><p class="text-sage-600" data-v-0efa74f8> Manage support services displayed on your website </p></div><div class="mt-4 sm:mt-0" data-v-0efa74f8>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(createRoute),
        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efa74f8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-0efa74f8${_scopeId}></path></svg> Add Support Service `);
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
      }, _parent));
      _push(`</div></div></div>`);
      if ((_a = _ctx.$page.props.flash) == null ? void 0 : _a.success) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-0efa74f8><span class="block sm:inline" data-v-0efa74f8>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_b = _ctx.$page.props.flash) == null ? void 0 : _b.error) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-0efa74f8><span class="block sm:inline" data-v-0efa74f8>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white shadow-sm border border-sage-200 sm:rounded-lg overflow-hidden" data-v-0efa74f8><div class="overflow-x-auto" data-v-0efa74f8><table class="min-w-full divide-y divide-gray-200" data-v-0efa74f8><thead class="bg-gray-50" data-v-0efa74f8><tr data-v-0efa74f8><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-0efa74f8> Support Service </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-0efa74f8> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-0efa74f8> Order </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-0efa74f8> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-0efa74f8><!--[-->`);
      ssrRenderList(__props.supportServices, (supportService) => {
        _push(`<tr class="hover:bg-gray-50 transition-colors" data-v-0efa74f8><td class="px-6 py-4" data-v-0efa74f8><div class="flex items-center" data-v-0efa74f8><div class="flex-shrink-0 h-16 w-16" data-v-0efa74f8>`);
        if (supportService.image_path) {
          _push(`<img${ssrRenderAttr("src", `/storage/${supportService.image_path}`)}${ssrRenderAttr("alt", supportService.title)} class="h-16 w-16 rounded-lg object-cover border border-gray-200" data-v-0efa74f8>`);
        } else {
          _push(`<div class="h-16 w-16 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200" data-v-0efa74f8><svg class="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efa74f8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-0efa74f8></path></svg></div>`);
        }
        _push(`</div><div class="ml-4" data-v-0efa74f8><div class="text-sm font-medium text-gray-900" data-v-0efa74f8>${ssrInterpolate(supportService.title)}</div><div class="text-sm text-gray-500 max-w-xs truncate" data-v-0efa74f8>${ssrInterpolate(supportService.description)}</div></div></div></td><td class="px-6 py-4" data-v-0efa74f8><span class="${ssrRenderClass([
          supportService.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
          "inline-flex px-2 py-1 text-xs font-semibold rounded-full"
        ])}" data-v-0efa74f8>${ssrInterpolate(supportService.is_active ? "Active" : "Inactive")}</span></td><td class="px-6 py-4 text-sm text-gray-500" data-v-0efa74f8>${ssrInterpolate(supportService.order_index)}</td><td class="px-6 py-4 text-right" data-v-0efa74f8><div class="flex items-center justify-end space-x-2" data-v-0efa74f8>`);
        _push(ssrRenderComponent(unref(Link), {
          href: getEditRoute(supportService.id),
          class: "text-blue-600 hover:text-blue-800 p-1 rounded transition-colors",
          title: "Edit"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efa74f8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-0efa74f8${_scopeId}></path></svg>`);
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
        }, _parent));
        _push(`<button class="${ssrRenderClass([
          supportService.is_active ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800",
          "p-1 rounded transition-colors"
        ])}"${ssrRenderAttr(
          "title",
          supportService.is_active ? "Nonaktifkan" : "Aktifkan"
        )} data-v-0efa74f8>`);
        if (supportService.is_active) {
          _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efa74f8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" data-v-0efa74f8></path></svg>`);
        } else {
          _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efa74f8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-0efa74f8></path></svg>`);
        }
        _push(`</button><button class="text-red-600 hover:text-red-800 p-1 rounded transition-colors" title="Delete" data-v-0efa74f8><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efa74f8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-0efa74f8></path></svg></button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (__props.supportServices.length === 0) {
        _push(`<div class="text-center py-12" data-v-0efa74f8><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0efa74f8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-0efa74f8></path></svg><h3 class="mt-2 text-sm font-medium text-gray-900" data-v-0efa74f8> No support services </h3><p class="mt-1 text-sm text-gray-500" data-v-0efa74f8> Get started by creating a new support service. </p><div class="mt-6" data-v-0efa74f8>`);
        _push(ssrRenderComponent(unref(Link), {
          href: unref(createRoute),
          class: "inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<svg class="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20" data-v-0efa74f8${_scopeId}><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" data-v-0efa74f8${_scopeId}></path></svg> New Support Service `);
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
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main>`);
      if (showDeleteModal.value) {
        _push(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" data-v-0efa74f8><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" data-v-0efa74f8><div class="mt-3 text-center" data-v-0efa74f8><div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100" data-v-0efa74f8><svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efa74f8><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-0efa74f8></path></svg></div><h3 class="text-lg font-medium text-gray-900 mt-5" data-v-0efa74f8> Delete Support Service </h3><div class="mt-2 px-7 py-3" data-v-0efa74f8><p class="text-sm text-gray-500" data-v-0efa74f8> Are you sure you want to delete &quot;<strong data-v-0efa74f8>${ssrInterpolate((_c = supportServiceToDelete.value) == null ? void 0 : _c.title)}</strong>&quot;? This action cannot be undone. </p></div><div class="flex justify-center space-x-4 py-3" data-v-0efa74f8><button class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300" data-v-0efa74f8> Cancel </button><button class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500" data-v-0efa74f8> Delete </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/SupportService/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0efa74f8"]]);
export {
  Index as default
};
