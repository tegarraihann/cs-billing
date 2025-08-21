import { ref, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import SidebarNavigation from "./SidebarNavigation-B-2d_OMK.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    user: Object,
    userRole: String
  },
  setup(__props) {
    const isMobileSidebarOpen = ref(false);
    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false;
    };
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
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
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-adba9f23><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-adba9f23><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-adba9f23><div class="flex justify-between items-center h-16" data-v-adba9f23><div class="lg:hidden" data-v-adba9f23><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors" data-v-adba9f23><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-adba9f23><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-adba9f23></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-adba9f23><h1 class="text-lg sm:text-xl font-semibold text-sage-800" data-v-adba9f23> Dashboard </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-adba9f23>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-adba9f23${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-adba9f23${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-adba9f23${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-adba9f23${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-adba9f23${_scopeId}>${ssrInterpolate((_b = _ctx.$page.props.auth.user) == null ? void 0 : _b.name)}</p><p class="text-xs text-sage-500" data-v-adba9f23${_scopeId}>Admin Customer Service</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-adba9f23${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-adba9f23${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c = _ctx.$page.props.auth.user) == null ? void 0 : _c.name)), 1)
                ]),
                createVNode("div", { class: "hidden sm:block text-left" }, [
                  createVNode("p", { class: "text-sm font-medium text-sage-700" }, toDisplayString((_d = _ctx.$page.props.auth.user) == null ? void 0 : _d.name), 1),
                  createVNode("p", { class: "text-xs text-sage-500" }, "Admin Customer Service")
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
            _push2(`<div class="py-1" data-v-adba9f23${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-adba9f23${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-adba9f23${_scopeId2}></path></svg><span data-v-adba9f23${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-adba9f23${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-adba9f23${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-adba9f23${_scopeId2}></path></svg><span data-v-adba9f23${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-adba9f23></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-adba9f23><div class="p-4 sm:p-6 lg:p-8" data-v-adba9f23><div class="bg-gradient-to-r from-sage-600 to-sage-700 rounded-xl shadow-lg p-6 mb-8 text-white" data-v-adba9f23><h2 class="text-2xl font-bold mb-2" data-v-adba9f23> Welcome back, ${ssrInterpolate((_a = _ctx.$page.props.auth.user) == null ? void 0 : _a.name)}! </h2><p class="text-sage-100" data-v-adba9f23> Manage customer service operations and support tickets efficiently. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-v-adba9f23><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-adba9f23><div class="flex items-center" data-v-adba9f23><div class="p-3 rounded-lg bg-red-100" data-v-adba9f23><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-adba9f23><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-adba9f23></path></svg></div><div class="ml-4" data-v-adba9f23><p class="text-sm font-medium text-gray-600" data-v-adba9f23>Open Tickets</p><p class="text-2xl font-semibold text-gray-900" data-v-adba9f23>18</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-adba9f23><div class="flex items-center" data-v-adba9f23><div class="p-3 rounded-lg bg-green-100" data-v-adba9f23><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-adba9f23><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-adba9f23></path></svg></div><div class="ml-4" data-v-adba9f23><p class="text-sm font-medium text-gray-600" data-v-adba9f23>Resolved Today</p><p class="text-2xl font-semibold text-gray-900" data-v-adba9f23>7</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-adba9f23><div class="flex items-center" data-v-adba9f23><div class="p-3 rounded-lg bg-sage-100" data-v-adba9f23><svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-adba9f23><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-adba9f23></path></svg></div><div class="ml-4" data-v-adba9f23><p class="text-sm font-medium text-gray-600" data-v-adba9f23>Avg Response</p><p class="text-2xl font-semibold text-gray-900" data-v-adba9f23>2.5h</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-adba9f23><div class="flex items-center" data-v-adba9f23><div class="p-3 rounded-lg bg-yellow-100" data-v-adba9f23><svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-adba9f23><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" data-v-adba9f23></path></svg></div><div class="ml-4" data-v-adba9f23><p class="text-sm font-medium text-gray-600" data-v-adba9f23>Satisfaction</p><p class="text-2xl font-semibold text-gray-900" data-v-adba9f23>4.8/5</p></div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-sage-200" data-v-adba9f23><h3 class="text-xl font-bold text-sage-800 mb-4" data-v-adba9f23> Recent Support Tickets </h3><div class="overflow-x-auto" data-v-adba9f23><table class="w-full" data-v-adba9f23><thead data-v-adba9f23><tr class="border-b border-sage-200" data-v-adba9f23><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-adba9f23> Ticket ID </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-adba9f23> Customer </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-adba9f23> Subject </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-adba9f23> Priority </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-adba9f23> Status </th></tr></thead><tbody data-v-adba9f23><tr class="border-b border-gray-100" data-v-adba9f23><td class="py-3 px-4 text-sage-600 font-medium" data-v-adba9f23>#CS-001</td><td class="py-3 px-4" data-v-adba9f23>John Customer</td><td class="py-3 px-4" data-v-adba9f23>Billing inquiry</td><td class="py-3 px-4" data-v-adba9f23><span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full" data-v-adba9f23>Medium</span></td><td class="py-3 px-4" data-v-adba9f23><span class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full" data-v-adba9f23>Open</span></td></tr><tr class="border-b border-gray-100" data-v-adba9f23><td class="py-3 px-4 text-sage-600 font-medium" data-v-adba9f23>#CS-002</td><td class="py-3 px-4" data-v-adba9f23>Jane Doe</td><td class="py-3 px-4" data-v-adba9f23>Technical support</td><td class="py-3 px-4" data-v-adba9f23><span class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full" data-v-adba9f23>High</span></td><td class="py-3 px-4" data-v-adba9f23><span class="px-2 py-1 text-xs font-medium bg-sage-100 text-sage-800 rounded-full" data-v-adba9f23>In Progress</span></td></tr><tr data-v-adba9f23><td class="py-3 px-4 text-sage-600 font-medium" data-v-adba9f23>#CS-003</td><td class="py-3 px-4" data-v-adba9f23>Mike Johnson</td><td class="py-3 px-4" data-v-adba9f23>Account access</td><td class="py-3 px-4" data-v-adba9f23><span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full" data-v-adba9f23>Low</span></td><td class="py-3 px-4" data-v-adba9f23><span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full" data-v-adba9f23>Resolved</span></td></tr></tbody></table></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-adba9f23></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-adba9f23"]]);
export {
  Dashboard as default
};
