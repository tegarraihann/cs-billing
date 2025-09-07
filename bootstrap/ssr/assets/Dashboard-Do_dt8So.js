import { computed, ref, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import SidebarNavigation from "./SidebarNavigation-A0RXUIxC.js";
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
    const currentRoute = computed(() => route().current() || "");
    route("masteradmin.dashboard");
    const usersRoute = route("masteradmin.users.index");
    const createUserRoute = route("masteradmin.users.create");
    const pengaturanUmumRoute = route(
      "masteradmin.website-settings.pengaturan-umum.index"
    );
    route("masteradmin.website-settings.services.index");
    route(
      "masteradmin.website-settings.support-services.index"
    );
    route("masteradmin.website-settings.team.index");
    route("home");
    const isMobileSidebarOpen = ref(false);
    const isWebsiteSettingsOpen = ref(false);
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
      if (currentRoute.value.startsWith("masteradmin.website-settings")) {
        isWebsiteSettingsOpen.value = true;
      }
      console.log("Dashboard props:", props);
      console.log("User stats:", userStats.value);
      console.log("Current route:", currentRoute.value);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-d0a4b3dd><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-d0a4b3dd><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-d0a4b3dd><div class="flex justify-between items-center h-16" data-v-d0a4b3dd><div class="lg:hidden" data-v-d0a4b3dd><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors" data-v-d0a4b3dd><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0a4b3dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-d0a4b3dd></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-d0a4b3dd><h1 class="text-lg sm:text-xl font-semibold text-sage-800" data-v-d0a4b3dd> Dashboard </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-d0a4b3dd>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-d0a4b3dd${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-d0a4b3dd${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-d0a4b3dd${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-d0a4b3dd${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-d0a4b3dd${_scopeId}>${ssrInterpolate((_b = _ctx.$page.props.auth.user) == null ? void 0 : _b.name)}</p><p class="text-xs text-sage-500" data-v-d0a4b3dd${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0a4b3dd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-d0a4b3dd${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c = _ctx.$page.props.auth.user) == null ? void 0 : _c.name)), 1)
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
            _push2(`<div class="py-1" data-v-d0a4b3dd${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0a4b3dd${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-d0a4b3dd${_scopeId2}></path></svg><span data-v-d0a4b3dd${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-d0a4b3dd${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0a4b3dd${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-d0a4b3dd${_scopeId2}></path></svg><span data-v-d0a4b3dd${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-d0a4b3dd></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-d0a4b3dd><div class="p-4 sm:p-6 lg:p-8" data-v-d0a4b3dd><div class="bg-gradient-to-r from-sage-600 to-sage-700 rounded-xl shadow-lg p-6 mb-8 text-white" data-v-d0a4b3dd><h2 class="text-2xl font-bold mb-2" data-v-d0a4b3dd> Welcome back, ${ssrInterpolate((_a = authUser.value) == null ? void 0 : _a.name)}! </h2><p class="text-sage-100" data-v-d0a4b3dd> You have full system administrative privileges. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-v-d0a4b3dd><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-d0a4b3dd><div class="flex items-center" data-v-d0a4b3dd><div class="p-3 rounded-lg bg-blue-100" data-v-d0a4b3dd><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0a4b3dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-d0a4b3dd></path></svg></div><div class="ml-4" data-v-d0a4b3dd><p class="text-sm font-medium text-gray-600" data-v-d0a4b3dd>Total Users</p><p class="text-2xl font-semibold text-gray-900" data-v-d0a4b3dd>${ssrInterpolate(userStats.value.totalUsers || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-d0a4b3dd><div class="flex items-center" data-v-d0a4b3dd><div class="p-3 rounded-lg bg-green-100" data-v-d0a4b3dd><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0a4b3dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-d0a4b3dd></path></svg></div><div class="ml-4" data-v-d0a4b3dd><p class="text-sm font-medium text-gray-600" data-v-d0a4b3dd>Total Services</p><p class="text-2xl font-semibold text-green-600" data-v-d0a4b3dd>${ssrInterpolate(userStats.value.totalServices || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-d0a4b3dd><div class="flex items-center" data-v-d0a4b3dd><div class="p-3 rounded-lg bg-purple-100" data-v-d0a4b3dd><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0a4b3dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-d0a4b3dd></path></svg></div><div class="ml-4" data-v-d0a4b3dd><p class="text-sm font-medium text-gray-600" data-v-d0a4b3dd>Team Members</p><p class="text-2xl font-semibold text-purple-600" data-v-d0a4b3dd>${ssrInterpolate(userStats.value.totalTeamMembers || 0)}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-d0a4b3dd><div class="flex items-center" data-v-d0a4b3dd><div class="p-3 rounded-lg bg-orange-100" data-v-d0a4b3dd><svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0a4b3dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d0a4b3dd></path></svg></div><div class="ml-4" data-v-d0a4b3dd><p class="text-sm font-medium text-gray-600" data-v-d0a4b3dd>Active Services</p><p class="text-2xl font-semibold text-orange-600" data-v-d0a4b3dd>${ssrInterpolate(userStats.value.activeServices || 0)}</p></div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-d0a4b3dd><h3 class="text-xl font-bold text-sage-800 mb-4" data-v-d0a4b3dd>Quick Actions</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-d0a4b3dd><a${ssrRenderAttr("href", unref(usersRoute))} class="p-6 border border-sage-200 rounded-lg hover:bg-sage-50 transition-colors group" data-v-d0a4b3dd><div class="flex items-center space-x-4" data-v-d0a4b3dd><div class="p-3 bg-sage-100 rounded-lg group-hover:bg-blue-200 transition-colors" data-v-d0a4b3dd><svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0a4b3dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-d0a4b3dd></path></svg></div><div data-v-d0a4b3dd><h4 class="font-semibold text-sage-800 mb-1" data-v-d0a4b3dd>Manage Users</h4><p class="text-sm text-sage-600" data-v-d0a4b3dd> View and manage all user accounts </p></div></div></a><a${ssrRenderAttr("href", unref(pengaturanUmumRoute))} class="p-6 border border-sage-200 rounded-lg hover:bg-sage-50 transition-colors group" data-v-d0a4b3dd><div class="flex items-center space-x-4" data-v-d0a4b3dd><div class="p-3 bg-sage-100 rounded-lg group-hover:bg-green-200 transition-colors" data-v-d0a4b3dd><svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0a4b3dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-d0a4b3dd></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-d0a4b3dd></path></svg></div><div data-v-d0a4b3dd><h4 class="font-semibold text-sage-800 mb-1" data-v-d0a4b3dd> Website Settings </h4><p class="text-sm text-sage-600" data-v-d0a4b3dd> Manage homepage, services &amp; team content </p></div></div></a><a${ssrRenderAttr("href", unref(createUserRoute))} class="p-6 border border-sage-200 rounded-lg hover:bg-sage-50 transition-colors group" data-v-d0a4b3dd><div class="flex items-center space-x-4" data-v-d0a4b3dd><div class="p-3 bg-sage-100 rounded-lg group-hover:bg-purple-200 transition-colors" data-v-d0a4b3dd><svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d0a4b3dd><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-d0a4b3dd></path></svg></div><div data-v-d0a4b3dd><h4 class="font-semibold text-sage-800 mb-1" data-v-d0a4b3dd>Add New User</h4><p class="text-sm text-sage-600" data-v-d0a4b3dd> Create new user accounts for the system </p></div></div></a></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d0a4b3dd"]]);
export {
  Dashboard as default
};
