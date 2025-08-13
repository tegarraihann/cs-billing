import { ref, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const dashboardRoute = route("masteradmin.dashboard");
    const usersRoute = route("masteradmin.users.index");
    const pengaturanUmumRoute = route("masteradmin.website-settings.pengaturan-umum.index");
    const servicesRoute = route("masteradmin.website-settings.services.index");
    const supportServicesRoute = route("masteradmin.website-settings.support-services.index");
    const teamRoute = route("masteradmin.website-settings.team.index");
    const homeRoute = route("home");
    const isMobileSidebarOpen = ref(false);
    const loading = ref(false);
    const imagePreview = ref(null);
    const form = useForm({
      title: "",
      description: "",
      image_path: null,
      order_index: 0,
      is_active: true
    });
    const errors = ref({});
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
      var _a, _b, _c, _d, _e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-0f8a538e><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-0f8a538e><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-0f8a538e><div class="flex justify-between items-center h-16" data-v-0f8a538e><div class="lg:hidden" data-v-0f8a538e><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-0f8a538e><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-0f8a538e></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-0f8a538e><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-0f8a538e> Add Support Service </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-0f8a538e>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-0f8a538e${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-0f8a538e${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-0f8a538e${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-0f8a538e${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-0f8a538e${_scopeId}>${ssrInterpolate((_b2 = _ctx.$page.props.auth.user) == null ? void 0 : _b2.name)}</p><p class="text-xs text-sage-500" data-v-0f8a538e${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-0f8a538e${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c2 = _ctx.$page.props.auth.user) == null ? void 0 : _c2.name)), 1)
                ]),
                createVNode("div", { class: "hidden sm:block text-left" }, [
                  createVNode("p", { class: "text-sm font-medium text-sage-700" }, toDisplayString((_d2 = _ctx.$page.props.auth.user) == null ? void 0 : _d2.name), 1),
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
            _push2(`<div class="py-1" data-v-0f8a538e${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-0f8a538e${_scopeId2}></path></svg><span data-v-0f8a538e${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-0f8a538e${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-0f8a538e${_scopeId2}></path></svg><span data-v-0f8a538e${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-0f8a538e></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": isMobileSidebarOpen.value,
        "-translate-x-full": !isMobileSidebarOpen.value
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"])}" data-v-0f8a538e><div class="px-6 py-6 border-b border-sage-200" data-v-0f8a538e><div class="flex items-center space-x-3" data-v-0f8a538e><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-0f8a538e><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-0f8a538e></path></svg></div><div data-v-0f8a538e><h2 class="text-lg font-bold text-sage-700" data-v-0f8a538e>Master Admin</h2><p class="text-xs text-sage-500" data-v-0f8a538e>Full System Control</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto" data-v-0f8a538e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(dashboardRoute),
        class: "flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-0f8a538e${_scopeId}></path></svg><span class="font-medium" data-v-0f8a538e${_scopeId}>Dashboard</span>`);
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
        href: unref(usersRoute),
        class: "flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-0f8a538e${_scopeId}></path></svg><span class="font-medium" data-v-0f8a538e${_scopeId}>User Management</span>`);
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
                  d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                })
              ])),
              createVNode("span", { class: "font-medium" }, "User Management")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="space-y-1" data-v-0f8a538e><div class="w-full flex items-center justify-between space-x-3 p-3 rounded-lg bg-sage-100 text-sage-800" data-v-0f8a538e><div class="flex items-center space-x-3" data-v-0f8a538e><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-0f8a538e></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-0f8a538e></path></svg><span class="font-medium" data-v-0f8a538e>Website Settings</span></div></div><div class="ml-8 space-y-1 border-l-2 border-sage-200 pl-4" data-v-0f8a538e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(pengaturanUmumRoute),
        class: "flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" data-v-0f8a538e${_scopeId}></path></svg><span data-v-0f8a538e${_scopeId}>Pengaturan Umum</span>`);
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
                  d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                })
              ])),
              createVNode("span", null, "Pengaturan Umum")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: unref(servicesRoute),
        class: "flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-0f8a538e${_scopeId}></path></svg><span data-v-0f8a538e${_scopeId}>Services</span>`);
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
                  d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                })
              ])),
              createVNode("span", null, "Services")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: unref(supportServicesRoute),
        class: "flex items-center space-x-3 p-2 rounded-lg bg-sage-50 text-sage-700 font-medium text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-0f8a538e${_scopeId}></path></svg><span data-v-0f8a538e${_scopeId}>Support Services</span>`);
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
                  d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"
                })
              ])),
              createVNode("span", null, "Support Services")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: unref(teamRoute),
        class: "flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-0f8a538e${_scopeId}></path></svg><span data-v-0f8a538e${_scopeId}>Team</span>`);
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
                  d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                })
              ])),
              createVNode("span", null, "Team")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="my-4 border-t border-sage-200" data-v-0f8a538e></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(homeRoute),
        target: "_blank",
        class: "flex items-center space-x-3 p-3 rounded-lg text-blue-700 hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 group"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" data-v-0f8a538e${_scopeId}></path></svg><span class="font-medium" data-v-0f8a538e${_scopeId}>View Website</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-0f8a538e${_scopeId}></path></svg>`);
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
                  d: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                })
              ])),
              createVNode("span", { class: "font-medium" }, "View Website"),
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
                  d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="p-4 border-t border-sage-200 bg-sage-50" data-v-0f8a538e><div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-sage-100 transition-colors cursor-pointer" data-v-0f8a538e><div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center" data-v-0f8a538e><span class="text-white font-semibold text-sm" data-v-0f8a538e>${ssrInterpolate(getInitials((_a = _ctx.$page.props.auth.user) == null ? void 0 : _a.name))}</span></div><div class="flex-1 min-w-0" data-v-0f8a538e><p class="text-sm font-medium text-sage-700 truncate" data-v-0f8a538e>${ssrInterpolate((_b = _ctx.$page.props.auth.user) == null ? void 0 : _b.name)}</p><p class="text-xs text-sage-500 truncate" data-v-0f8a538e>${ssrInterpolate((_c = _ctx.$page.props.auth.user) == null ? void 0 : _c.email)}</p></div></div></div></aside><main class="lg:ml-64 pt-16 min-h-screen" data-v-0f8a538e><div class="p-4 sm:p-6 lg:p-8" data-v-0f8a538e><div class="mb-6" data-v-0f8a538e><nav class="flex" aria-label="Breadcrumb" data-v-0f8a538e><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-0f8a538e><li class="inline-flex items-center" data-v-0f8a538e>`);
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
      _push(`</li><li data-v-0f8a538e><div class="flex items-center" data-v-0f8a538e><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-0f8a538e><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-0f8a538e></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-0f8a538e>Website Settings</span></div></li><li data-v-0f8a538e><div class="flex items-center" data-v-0f8a538e><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-0f8a538e><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-0f8a538e></path></svg>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(supportServicesRoute),
        class: "ml-1 text-sage-500 hover:text-sage-700 md:ml-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Support Services `);
          } else {
            return [
              createTextVNode(" Support Services ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li data-v-0f8a538e><div class="flex items-center" data-v-0f8a538e><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-0f8a538e><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-0f8a538e></path></svg><span class="ml-1 text-sage-700 md:ml-2 font-medium" data-v-0f8a538e>Add</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-0f8a538e><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-0f8a538e><div data-v-0f8a538e><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-0f8a538e> Add New Support Service </h2><p class="text-sage-600" data-v-0f8a538e> Create a new support service to display on your website </p></div><div class="mt-4 sm:mt-0" data-v-0f8a538e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(supportServicesRoute),
        class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-0f8a538e${_scopeId}></path></svg> Back to List `);
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
                  d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                })
              ])),
              createTextVNode(" Back to List ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if ((_d = _ctx.$page.props.flash) == null ? void 0 : _d.success) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-0f8a538e><span class="block sm:inline" data-v-0f8a538e>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_e = _ctx.$page.props.flash) == null ? void 0 : _e.error) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-0f8a538e><span class="block sm:inline" data-v-0f8a538e>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white shadow-sm border border-sage-200 sm:rounded-lg overflow-hidden" data-v-0f8a538e><form enctype="multipart/form-data" data-v-0f8a538e><div class="px-6 py-4 border-b border-sage-200" data-v-0f8a538e><h3 class="text-lg font-semibold text-sage-800" data-v-0f8a538e>Support Service Information</h3><p class="text-sm text-sage-600 mt-1" data-v-0f8a538e> Fill in the details for the new support service </p></div><div class="p-6 space-y-6" data-v-0f8a538e><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-0f8a538e><div data-v-0f8a538e><label for="title" class="block text-sm font-medium text-sage-700 mb-2" data-v-0f8a538e> Title <span class="text-red-500" data-v-0f8a538e>*</span></label><input id="title"${ssrRenderAttr("value", unref(form).title)} type="text" required class="${ssrRenderClass([{ "border-red-300": errors.value.title }, "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"])}" placeholder="Enter service title" data-v-0f8a538e>`);
      if (errors.value.title) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-0f8a538e>${ssrInterpolate(errors.value.title)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-0f8a538e><label for="order_index" class="block text-sm font-medium text-sage-700 mb-2" data-v-0f8a538e> Display Order </label><input id="order_index"${ssrRenderAttr("value", unref(form).order_index)} type="number" min="0" class="${ssrRenderClass([{ "border-red-300": errors.value.order_index }, "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"])}" placeholder="0" data-v-0f8a538e><p class="mt-1 text-xs text-gray-500" data-v-0f8a538e> Order in which this service appears (0 = first) </p>`);
      if (errors.value.order_index) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-0f8a538e>${ssrInterpolate(errors.value.order_index)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div data-v-0f8a538e><label for="description" class="block text-sm font-medium text-sage-700 mb-2" data-v-0f8a538e> Description <span class="text-red-500" data-v-0f8a538e>*</span></label><textarea id="description" rows="4" required class="${ssrRenderClass([{ "border-red-300": errors.value.description }, "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"])}" placeholder="Describe the support service in detail" data-v-0f8a538e>${ssrInterpolate(unref(form).description)}</textarea>`);
      if (errors.value.description) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-0f8a538e>${ssrInterpolate(errors.value.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-0f8a538e><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f8a538e> Service Image </label><div class="flex items-start space-x-6" data-v-0f8a538e><div class="flex-shrink-0" data-v-0f8a538e>`);
      if (imagePreview.value) {
        _push(`<div class="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200" data-v-0f8a538e><img${ssrRenderAttr("src", imagePreview.value)} alt="Preview" class="w-full h-full object-cover" data-v-0f8a538e></div>`);
      } else {
        _push(`<div class="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50" data-v-0f8a538e><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-0f8a538e></path></svg></div>`);
      }
      _push(`</div><div class="flex-1" data-v-0f8a538e><input type="file" accept="image/*" class="hidden" data-v-0f8a538e><button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-0f8a538e><svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0f8a538e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-0f8a538e></path></svg> Upload Image </button><p class="mt-2 text-sm text-gray-500" data-v-0f8a538e> PNG, JPG, GIF up to 2MB. Recommended size: 400x300px </p>`);
      if (imagePreview.value) {
        _push(`<button type="button" class="mt-2 text-sm text-red-600 hover:text-red-800" data-v-0f8a538e> Remove Image </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (errors.value.image_path) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-0f8a538e>${ssrInterpolate(errors.value.image_path)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-0f8a538e><div class="flex items-center" data-v-0f8a538e><input id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded" data-v-0f8a538e><label for="is_active" class="ml-2 block text-sm font-medium text-sage-700" data-v-0f8a538e> Active </label></div><p class="mt-1 text-xs text-gray-500" data-v-0f8a538e> Only active services will be displayed on the website </p></div></div><div class="px-6 py-4 bg-gray-50 border-t border-sage-200 flex justify-end space-x-4" data-v-0f8a538e>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(supportServicesRoute),
        class: "inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cancel `);
          } else {
            return [
              createTextVNode(" Cancel ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-25 transition ease-in-out duration-150" data-v-0f8a538e>`);
      if (loading.value) {
        _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" data-v-0f8a538e><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-0f8a538e></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-0f8a538e></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(loading.value ? "Creating..." : "Create Support Service")}</button></div></form></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/SupportService/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0f8a538e"]]);
export {
  Create as default
};
