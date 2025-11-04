import { ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DlebuOGD.js";
import SidebarNavigation from "./SidebarNavigation-DsyuYSGu.js";
import { Menu, UserRound, LogOut, ChevronDown } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "AdminCSLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const route = window.route || function(name, params) {
      const routes = {
        "admin-cs.dashboard": "/admin-cs/dashboard",
        "admin-cs.sales-orders.index": "/admin-cs/sales-orders",
        "admin-cs.sales-orders.create": "/admin-cs/sales-orders/create",
        "admin-cs.sales-orders.show": "/admin-cs/sales-orders",
        "admin-cs.sales-orders.edit": "/admin-cs/sales-orders",
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-891dd7a8><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-891dd7a8><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-891dd7a8><div class="flex justify-between items-center h-16" data-v-891dd7a8><div class="lg:hidden" data-v-891dd7a8><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-891dd7a8>`);
      _push(ssrRenderComponent(unref(Menu), { class: "w-6 h-6" }, null, _parent));
      _push(`</button></div><div class="flex-1 lg:flex-none" data-v-891dd7a8><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-891dd7a8> Customer Service Dashboard </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-891dd7a8>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-891dd7a8${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-891dd7a8${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-891dd7a8${_scopeId}>${ssrInterpolate(getInitials((_a = _ctx.$page.props.auth.user) == null ? void 0 : _a.name))}</span></div><div class="hidden sm:block text-left text-sage-700" data-v-891dd7a8${_scopeId}><p class="text-sm font-medium" data-v-891dd7a8${_scopeId}>${ssrInterpolate((_b = _ctx.$page.props.auth.user) == null ? void 0 : _b.name)}</p><p class="text-xs text-sage-500" data-v-891dd7a8${_scopeId}>Customer Service</p></div>`);
            _push2(ssrRenderComponent(unref(ChevronDown), { class: "w-4 h-4 text-sage-600 hidden sm:block" }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c = _ctx.$page.props.auth.user) == null ? void 0 : _c.name)), 1)
                ]),
                createVNode("div", { class: "hidden sm:block text-left text-sage-700" }, [
                  createVNode("p", { class: "text-sm font-medium" }, toDisplayString((_d = _ctx.$page.props.auth.user) == null ? void 0 : _d.name), 1),
                  createVNode("p", { class: "text-xs text-sage-500" }, "Customer Service")
                ]),
                createVNode(unref(ChevronDown), { class: "w-4 h-4 text-sage-600 hidden sm:block" })
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-1" data-v-891dd7a8${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: unref(route)("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(UserRound), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  _push3(`<span data-v-891dd7a8${_scopeId2}>Profile</span>`);
                } else {
                  return [
                    createVNode(unref(UserRound), { class: "w-4 h-4" }),
                    createVNode("span", null, "Profile")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="border-t border-gray-100 my-1" data-v-891dd7a8${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: unref(route)("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(LogOut), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  _push3(`<span data-v-891dd7a8${_scopeId2}>Log Out</span>`);
                } else {
                  return [
                    createVNode(unref(LogOut), { class: "w-4 h-4" }),
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
                    createVNode(unref(UserRound), { class: "w-4 h-4" }),
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
                    createVNode(unref(LogOut), { class: "w-4 h-4" }),
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
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-891dd7a8>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminCSLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminCSLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-891dd7a8"]]);
export {
  AdminCSLayout as A
};
