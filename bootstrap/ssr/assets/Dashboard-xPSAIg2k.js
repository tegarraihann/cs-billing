import { computed, ref, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    user: Object,
    userRole: String,
    stats: Object,
    recentUsers: Array
  },
  setup(__props) {
    const props = __props;
    const authUser = computed(() => props.user);
    const userStats = computed(() => props.stats || {});
    const adminCount = computed(() => {
      const roleStats = userStats.value.roleStats || {};
      return (roleStats.admin_cs || 0) + (roleStats.admin_keuangan || 0) + (roleStats.masteradmin || 0);
    });
    const dashboardRoute = route("masteradmin.dashboard");
    const usersRoute = route("masteradmin.users.index");
    const createUserRoute = route("masteradmin.users.create");
    const isMobileSidebarOpen = ref(false);
    const showDropdown = ref(false);
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        showDropdown.value = false;
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        isMobileSidebarOpen.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      window.addEventListener("click", handleClickOutside);
      console.log("Dashboard props:", props);
      console.log("User stats:", userStats.value);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClickOutside);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-94f62ca0><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-94f62ca0><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-94f62ca0><div class="flex justify-between items-center h-16" data-v-94f62ca0><div class="lg:hidden" data-v-94f62ca0><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors" data-v-94f62ca0><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-94f62ca0></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-94f62ca0><h1 class="text-lg sm:text-xl font-semibold text-sage-800" data-v-94f62ca0> Add New User </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-94f62ca0>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-94f62ca0${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-94f62ca0${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-94f62ca0${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-94f62ca0${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-94f62ca0${_scopeId}>${ssrInterpolate((_b2 = _ctx.$page.props.auth.user) == null ? void 0 : _b2.name)}</p><p class="text-xs text-sage-500" data-v-94f62ca0${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-94f62ca0${_scopeId}></path></svg></button>`);
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
            _push2(`<div class="py-1" data-v-94f62ca0${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-94f62ca0${_scopeId2}></path></svg><span data-v-94f62ca0${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-94f62ca0${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-94f62ca0${_scopeId2}></path></svg><span data-v-94f62ca0${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-94f62ca0></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": isMobileSidebarOpen.value,
        "-translate-x-full": !isMobileSidebarOpen.value
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"])}" data-v-94f62ca0><div class="px-6 py-6 border-b border-sage-200" data-v-94f62ca0><div class="flex items-center space-x-3" data-v-94f62ca0><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-94f62ca0><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-94f62ca0></path></svg></div><div data-v-94f62ca0><h2 class="text-lg font-bold text-sage-700" data-v-94f62ca0>Master Admin</h2><p class="text-xs text-sage-500" data-v-94f62ca0>Full System Control</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto" data-v-94f62ca0><a${ssrRenderAttr("href", unref(dashboardRoute))} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 group bg-sage-100 text-sage-800" data-v-94f62ca0><svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-94f62ca0></path></svg><span class="font-medium" data-v-94f62ca0>Dashboard</span></a><a${ssrRenderAttr("href", unref(usersRoute))} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 group" data-v-94f62ca0><svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-94f62ca0></path></svg><span class="font-medium" data-v-94f62ca0>User Management</span></a></nav><div class="p-4 border-t border-sage-200 bg-sage-50" data-v-94f62ca0><div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-sage-100 transition-colors cursor-pointer" data-v-94f62ca0><div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center" data-v-94f62ca0><span class="text-white font-semibold text-sm" data-v-94f62ca0>${ssrInterpolate(getInitials((_a = authUser.value) == null ? void 0 : _a.name))}</span></div><div class="flex-1 min-w-0" data-v-94f62ca0><p class="text-sm font-medium text-sage-700 truncate" data-v-94f62ca0>${ssrInterpolate((_b = authUser.value) == null ? void 0 : _b.name)}</p><p class="text-xs text-sage-500 truncate" data-v-94f62ca0>${ssrInterpolate((_c = authUser.value) == null ? void 0 : _c.email)}</p></div></div></div></aside><main class="lg:ml-64 pt-16 min-h-screen" data-v-94f62ca0><div class="p-4 sm:p-6 lg:p-8" data-v-94f62ca0><div class="bg-gradient-to-r from-sage-600 to-sage-700 rounded-xl shadow-lg p-6 mb-8 text-white" data-v-94f62ca0><h2 class="text-2xl font-bold mb-2" data-v-94f62ca0> Welcome back, ${ssrInterpolate((_d = authUser.value) == null ? void 0 : _d.name)}! </h2><p class="text-sage-100" data-v-94f62ca0> You have full system administrative privileges. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-v-94f62ca0><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-94f62ca0><div class="flex items-center" data-v-94f62ca0><div class="p-3 rounded-lg bg-blue-100" data-v-94f62ca0><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-94f62ca0></path></svg></div><div class="ml-4" data-v-94f62ca0><p class="text-sm font-medium text-gray-600" data-v-94f62ca0>Total Users</p><p class="text-2xl font-semibold text-gray-900" data-v-94f62ca0>${ssrInterpolate(userStats.value.totalUsers || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-94f62ca0><div class="flex items-center" data-v-94f62ca0><div class="p-3 rounded-lg bg-green-100" data-v-94f62ca0><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-94f62ca0></path></svg></div><div class="ml-4" data-v-94f62ca0><p class="text-sm font-medium text-gray-600" data-v-94f62ca0>Active Users</p><p class="text-2xl font-semibold text-green-600" data-v-94f62ca0>${ssrInterpolate(userStats.value.activeUsers || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-94f62ca0><div class="flex items-center" data-v-94f62ca0><div class="p-3 rounded-lg bg-red-100" data-v-94f62ca0><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" data-v-94f62ca0></path></svg></div><div class="ml-4" data-v-94f62ca0><p class="text-sm font-medium text-gray-600" data-v-94f62ca0>Inactive Users</p><p class="text-2xl font-semibold text-red-600" data-v-94f62ca0>${ssrInterpolate(userStats.value.inactiveUsers || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-94f62ca0><div class="flex items-center" data-v-94f62ca0><div class="p-3 rounded-lg bg-purple-100" data-v-94f62ca0><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-v-94f62ca0></path></svg></div><div class="ml-4" data-v-94f62ca0><p class="text-sm font-medium text-gray-600" data-v-94f62ca0>Admins</p><p class="text-2xl font-semibold text-purple-600" data-v-94f62ca0>${ssrInterpolate(adminCount.value)}</p></div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-94f62ca0><h3 class="text-xl font-bold text-sage-800 mb-4" data-v-94f62ca0>Quick Actions</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-94f62ca0><a${ssrRenderAttr("href", unref(usersRoute))} class="p-6 border border-sage-200 rounded-lg hover:bg-sage-50 transition-colors group" data-v-94f62ca0><div class="flex items-center space-x-4" data-v-94f62ca0><div class="p-3 bg-sage-100 rounded-lg group-hover:bg-blue-200 transition-colors" data-v-94f62ca0><svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-94f62ca0></path></svg></div><div data-v-94f62ca0><h4 class="font-semibold text-sage-800 mb-1" data-v-94f62ca0>Manage Users</h4><p class="text-sm text-sage-600" data-v-94f62ca0> View and manage all user accounts </p></div></div></a><a${ssrRenderAttr("href", unref(createUserRoute))} class="p-6 border border-sage-200 rounded-lg hover:bg-sage-50 transition-colors group" data-v-94f62ca0><div class="flex items-center space-x-4" data-v-94f62ca0><div class="p-3 bg-sage-100 rounded-lg group-hover:bg-green-200 transition-colors" data-v-94f62ca0><svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-94f62ca0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-94f62ca0></path></svg></div><div data-v-94f62ca0><h4 class="font-semibold text-sage-800 mb-1" data-v-94f62ca0>Add New User</h4><p class="text-sm text-sage-600" data-v-94f62ca0> Create new user accounts for the system </p></div></div></a></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-94f62ca0"]]);
export {
  Dashboard as default
};
