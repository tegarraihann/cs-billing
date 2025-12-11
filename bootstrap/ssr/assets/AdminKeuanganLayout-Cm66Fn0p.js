import { ref, onMounted, onUnmounted, mergeProps, withCtx, unref, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DlebuOGD.js";
import SidebarNavigation from "./SidebarNavigation-C7BgyxQX.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const IDLE_LIMIT = 10 * 60 * 1e3;
const COUNTDOWN_LIMIT = 30;
const _sfc_main = {
  __name: "AdminKeuanganLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.dashboard": "/admin-keuangan/dashboard",
        "admin-keuangan.customers.index": "/admin-keuangan/customers",
        "admin-keuangan.customers.create": "/admin-keuangan/customers/create",
        "admin-keuangan.customers.show": "/admin-keuangan/customers",
        "admin-keuangan.customers.edit": "/admin-keuangan/customers",
        "admin-keuangan.vendors.index": "/admin-keuangan/vendors",
        "admin-keuangan.vendors.create": "/admin-keuangan/vendors/create",
        "admin-keuangan.vendors.show": "/admin-keuangan/vendors",
        "admin-keuangan.vendors.edit": "/admin-keuangan/vendors",
        "admin-keuangan.sales-orders.index": "/admin-keuangan/sales-orders",
        "admin-keuangan.sales-orders.create": "/admin-keuangan/sales-orders/create",
        "admin-keuangan.sales-orders.show": "/admin-keuangan/sales-orders",
        "admin-keuangan.sales-orders.edit": "/admin-keuangan/sales-orders",
        "profile.edit": "/profile",
        "logout": "/logout"
      };
      return routes[name] || "#";
    };
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
    const showIdleModal = ref(false);
    const idleCountdown = ref(0);
    const idleProcessing = ref(false);
    let idleTimer = null;
    let countdownTimer = null;
    const activityEvents = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    const clearIdleTimers = () => {
      if (idleTimer) clearTimeout(idleTimer);
      if (countdownTimer) clearInterval(countdownTimer);
      idleTimer = null;
      countdownTimer = null;
    };
    const resetIdleTimer = () => {
      clearIdleTimers();
      showIdleModal.value = false;
      idleCountdown.value = 0;
      idleTimer = setTimeout(startIdleWarning, IDLE_LIMIT);
    };
    const startIdleWarning = () => {
      showIdleModal.value = true;
      idleCountdown.value = COUNTDOWN_LIMIT;
      countdownTimer = setInterval(() => {
        idleCountdown.value -= 1;
        if (idleCountdown.value <= 0) {
          clearInterval(countdownTimer);
          countdownTimer = null;
          forceLogout();
        }
      }, 1e3);
    };
    const forceLogout = () => {
      if (idleProcessing.value) return;
      idleProcessing.value = true;
      router.post(route("logout"), {}, {
        onFinish: () => {
          idleProcessing.value = false;
          window.location.href = route("login");
        }
      });
    };
    onMounted(() => {
      resetIdleTimer();
      activityEvents.forEach((ev) => window.addEventListener(ev, resetIdleTimer, { passive: true }));
    });
    onUnmounted(() => {
      clearIdleTimers();
      activityEvents.forEach((ev) => window.removeEventListener(ev, resetIdleTimer));
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-4001322d><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-4001322d><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-4001322d><div class="flex justify-between items-center h-16" data-v-4001322d><div class="lg:hidden" data-v-4001322d><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-4001322d><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4001322d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-4001322d></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-4001322d><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-4001322d> Finance Dept Dashboard </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-4001322d>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-4001322d${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-4001322d${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-4001322d${_scopeId}>${ssrInterpolate(getInitials((_a = _ctx.$page.props.auth.user) == null ? void 0 : _a.name))}</span></div><div class="hidden sm:block text-left" data-v-4001322d${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-4001322d${_scopeId}>${ssrInterpolate((_b = _ctx.$page.props.auth.user) == null ? void 0 : _b.name)}</p><p class="text-xs text-sage-500" data-v-4001322d${_scopeId}>Finance Dept</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4001322d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-4001322d${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c = _ctx.$page.props.auth.user) == null ? void 0 : _c.name)), 1)
                ]),
                createVNode("div", { class: "hidden sm:block text-left" }, [
                  createVNode("p", { class: "text-sm font-medium text-sage-700" }, toDisplayString((_d = _ctx.$page.props.auth.user) == null ? void 0 : _d.name), 1),
                  createVNode("p", { class: "text-xs text-sage-500" }, "Finance Dept")
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
            _push2(`<div class="py-1" data-v-4001322d${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: unref(route)("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4001322d${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-4001322d${_scopeId2}></path></svg><span data-v-4001322d${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-4001322d${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: unref(route)("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4001322d${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-4001322d${_scopeId2}></path></svg><span data-v-4001322d${_scopeId2}>Log Out</span>`);
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
                  href: unref(route)("profile.edit"),
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
                  href: unref(route)("logout"),
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
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-4001322d>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
      if (showIdleModal.value) {
        _push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4" data-v-4001322d><div class="bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4" data-v-4001322d><div class="text-lg font-semibold text-gray-900" data-v-4001322d>Sesi hampir berakhir</div><p class="text-sm text-gray-600" data-v-4001322d> Tidak ada aktivitas selama 10 menit. Anda akan keluar otomatis dalam <span class="font-semibold text-red-600" data-v-4001322d>${ssrInterpolate(idleCountdown.value)}</span> detik. </p><div class="flex justify-end space-x-3" data-v-4001322d><button type="button" class="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"${ssrIncludeBooleanAttr(idleProcessing.value) ? " disabled" : ""} data-v-4001322d> Lanjutkan </button><button type="button" class="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"${ssrIncludeBooleanAttr(idleProcessing.value) ? " disabled" : ""} data-v-4001322d> Keluar </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminKeuanganLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminKeuanganLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4001322d"]]);
export {
  AdminKeuanganLayout as A
};
