import { ref, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    user: Object,
    userRole: String
  },
  setup(__props) {
    const isMobileSidebarOpen = ref(false);
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
      var _a, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-0f7cc0bb><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-0f7cc0bb><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-0f7cc0bb><div class="flex justify-between items-center h-16" data-v-0f7cc0bb><div class="lg:hidden" data-v-0f7cc0bb><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-0f7cc0bb><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f7cc0bb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-0f7cc0bb></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-0f7cc0bb><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-0f7cc0bb> Admin CS Dashboard </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-0f7cc0bb>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-0f7cc0bb${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-0f7cc0bb${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-0f7cc0bb${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-0f7cc0bb${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-0f7cc0bb${_scopeId}>${ssrInterpolate((_b2 = _ctx.$page.props.auth.user) == null ? void 0 : _b2.name)}</p><p class="text-xs text-sage-500" data-v-0f7cc0bb${_scopeId}>Admin Customer Service</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f7cc0bb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-0f7cc0bb${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c2 = _ctx.$page.props.auth.user) == null ? void 0 : _c2.name)), 1)
                ]),
                createVNode("div", { class: "hidden sm:block text-left" }, [
                  createVNode("p", { class: "text-sm font-medium text-sage-700" }, toDisplayString((_d2 = _ctx.$page.props.auth.user) == null ? void 0 : _d2.name), 1),
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
            _push2(`<div class="py-1" data-v-0f7cc0bb${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f7cc0bb${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-0f7cc0bb${_scopeId2}></path></svg><span data-v-0f7cc0bb${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-0f7cc0bb${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f7cc0bb${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-0f7cc0bb${_scopeId2}></path></svg><span data-v-0f7cc0bb${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-0f7cc0bb></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": isMobileSidebarOpen.value,
        "-translate-x-full": !isMobileSidebarOpen.value
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"])}" data-v-0f7cc0bb><div class="px-6 py-6 border-b border-sage-200" data-v-0f7cc0bb><div class="flex items-center space-x-3" data-v-0f7cc0bb><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-0f7cc0bb><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f7cc0bb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" data-v-0f7cc0bb></path></svg></div><div data-v-0f7cc0bb><h2 class="text-lg font-bold text-sage-700" data-v-0f7cc0bb>Admin CS</h2><p class="text-xs text-sage-500" data-v-0f7cc0bb>Customer Service</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto" data-v-0f7cc0bb>`);
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin-cs.dashboard"),
        class: ["flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 group", {
          "bg-sage-100 text-sage-800": _ctx.route().current("admin-cs.dashboard")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f7cc0bb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-0f7cc0bb${_scopeId}></path></svg><span class="font-medium" data-v-0f7cc0bb${_scopeId}>Dashboard</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 group-hover:scale-110 transition-transform",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                })
              ])),
              createVNode("span", { class: "font-medium" }, "Dashboard")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: _ctx.route("admin-cs.customers.index"),
        class: ["flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 group", {
          "bg-sage-100 text-sage-800": _ctx.route().current("admin-cs.customers.*")
        }]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f7cc0bb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" data-v-0f7cc0bb${_scopeId}></path></svg><span class="font-medium" data-v-0f7cc0bb${_scopeId}>Pelanggan</span>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 group-hover:scale-110 transition-transform",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                })
              ])),
              createVNode("span", { class: "font-medium" }, "Pelanggan")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="p-4 border-t border-sage-200 bg-sage-50" data-v-0f7cc0bb><div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-sage-100 transition-colors cursor-pointer" data-v-0f7cc0bb><div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center" data-v-0f7cc0bb><span class="text-white font-semibold text-sm" data-v-0f7cc0bb>${ssrInterpolate(getInitials((_a = _ctx.$page.props.auth.user) == null ? void 0 : _a.name))}</span></div><div class="flex-1 min-w-0" data-v-0f7cc0bb><p class="text-sm font-medium text-sage-700 truncate" data-v-0f7cc0bb>${ssrInterpolate((_b = _ctx.$page.props.auth.user) == null ? void 0 : _b.name)}</p><p class="text-xs text-sage-500 truncate" data-v-0f7cc0bb>${ssrInterpolate((_c = _ctx.$page.props.auth.user) == null ? void 0 : _c.email)}</p></div></div></div></aside><main class="lg:ml-64 pt-16 min-h-screen" data-v-0f7cc0bb><div class="p-4 sm:p-6 lg:p-8" data-v-0f7cc0bb><div class="bg-gradient-to-r from-sage-600 to-sage-700 rounded-xl shadow-lg p-6 mb-8 text-white" data-v-0f7cc0bb><h2 class="text-2xl font-bold mb-2" data-v-0f7cc0bb> Welcome back, ${ssrInterpolate((_d = _ctx.$page.props.auth.user) == null ? void 0 : _d.name)}! </h2><p class="text-sage-100" data-v-0f7cc0bb> Manage customer service operations and support tickets efficiently. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-v-0f7cc0bb><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-0f7cc0bb><div class="flex items-center" data-v-0f7cc0bb><div class="p-3 rounded-lg bg-red-100" data-v-0f7cc0bb><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f7cc0bb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-0f7cc0bb></path></svg></div><div class="ml-4" data-v-0f7cc0bb><p class="text-sm font-medium text-gray-600" data-v-0f7cc0bb>Open Tickets</p><p class="text-2xl font-semibold text-gray-900" data-v-0f7cc0bb>18</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-0f7cc0bb><div class="flex items-center" data-v-0f7cc0bb><div class="p-3 rounded-lg bg-green-100" data-v-0f7cc0bb><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f7cc0bb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-0f7cc0bb></path></svg></div><div class="ml-4" data-v-0f7cc0bb><p class="text-sm font-medium text-gray-600" data-v-0f7cc0bb>Resolved Today</p><p class="text-2xl font-semibold text-gray-900" data-v-0f7cc0bb>7</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-0f7cc0bb><div class="flex items-center" data-v-0f7cc0bb><div class="p-3 rounded-lg bg-sage-100" data-v-0f7cc0bb><svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f7cc0bb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-0f7cc0bb></path></svg></div><div class="ml-4" data-v-0f7cc0bb><p class="text-sm font-medium text-gray-600" data-v-0f7cc0bb>Avg Response</p><p class="text-2xl font-semibold text-gray-900" data-v-0f7cc0bb>2.5h</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-0f7cc0bb><div class="flex items-center" data-v-0f7cc0bb><div class="p-3 rounded-lg bg-yellow-100" data-v-0f7cc0bb><svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f7cc0bb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" data-v-0f7cc0bb></path></svg></div><div class="ml-4" data-v-0f7cc0bb><p class="text-sm font-medium text-gray-600" data-v-0f7cc0bb>Satisfaction</p><p class="text-2xl font-semibold text-gray-900" data-v-0f7cc0bb>4.8/5</p></div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-sage-200" data-v-0f7cc0bb><h3 class="text-xl font-bold text-sage-800 mb-4" data-v-0f7cc0bb> Recent Support Tickets </h3><div class="overflow-x-auto" data-v-0f7cc0bb><table class="w-full" data-v-0f7cc0bb><thead data-v-0f7cc0bb><tr class="border-b border-sage-200" data-v-0f7cc0bb><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-0f7cc0bb> Ticket ID </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-0f7cc0bb> Customer </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-0f7cc0bb> Subject </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-0f7cc0bb> Priority </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-0f7cc0bb> Status </th></tr></thead><tbody data-v-0f7cc0bb><tr class="border-b border-gray-100" data-v-0f7cc0bb><td class="py-3 px-4 text-sage-600 font-medium" data-v-0f7cc0bb>#CS-001</td><td class="py-3 px-4" data-v-0f7cc0bb>John Customer</td><td class="py-3 px-4" data-v-0f7cc0bb>Billing inquiry</td><td class="py-3 px-4" data-v-0f7cc0bb><span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full" data-v-0f7cc0bb>Medium</span></td><td class="py-3 px-4" data-v-0f7cc0bb><span class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full" data-v-0f7cc0bb>Open</span></td></tr><tr class="border-b border-gray-100" data-v-0f7cc0bb><td class="py-3 px-4 text-sage-600 font-medium" data-v-0f7cc0bb>#CS-002</td><td class="py-3 px-4" data-v-0f7cc0bb>Jane Doe</td><td class="py-3 px-4" data-v-0f7cc0bb>Technical support</td><td class="py-3 px-4" data-v-0f7cc0bb><span class="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full" data-v-0f7cc0bb>High</span></td><td class="py-3 px-4" data-v-0f7cc0bb><span class="px-2 py-1 text-xs font-medium bg-sage-100 text-sage-800 rounded-full" data-v-0f7cc0bb>In Progress</span></td></tr><tr data-v-0f7cc0bb><td class="py-3 px-4 text-sage-600 font-medium" data-v-0f7cc0bb>#CS-003</td><td class="py-3 px-4" data-v-0f7cc0bb>Mike Johnson</td><td class="py-3 px-4" data-v-0f7cc0bb>Account access</td><td class="py-3 px-4" data-v-0f7cc0bb><span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full" data-v-0f7cc0bb>Low</span></td><td class="py-3 px-4" data-v-0f7cc0bb><span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full" data-v-0f7cc0bb>Resolved</span></td></tr></tbody></table></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-0f7cc0bb></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0f7cc0bb"]]);
export {
  Dashboard as default
};
