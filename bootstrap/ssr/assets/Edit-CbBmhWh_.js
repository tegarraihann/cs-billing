import { ref, reactive, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import { Link } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    user: {
      type: Object,
      required: true
    },
    mustVerifyEmail: {
      type: Boolean,
      default: false
    },
    status: {
      type: String
    },
    flash: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const isMobileSidebarOpen = ref(false);
    const activeTab = ref("profile");
    const confirmingUserDeletion = ref(false);
    const refreshing = ref(false);
    const lastRefreshed = ref(null);
    const profileProcessing = ref(false);
    const profileRecentlySuccessful = ref(false);
    const passwordProcessing = ref(false);
    const passwordRecentlySuccessful = ref(false);
    const deleteProcessing = ref(false);
    const profileErrors = ref({});
    const passwordErrors = ref({});
    const deleteErrors = ref({});
    const profileForm = reactive({
      name: ((_a = props.user) == null ? void 0 : _a.name) || "",
      email: ((_b = props.user) == null ? void 0 : _b.email) || "",
      phone: ((_c = props.user) == null ? void 0 : _c.phone) || ""
    });
    const passwordForm = reactive({
      current_password: "",
      password: "",
      password_confirmation: ""
    });
    const deleteForm = reactive({
      password: ""
    });
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    const getRoleLabel = (role) => {
      const labels = {
        masteradmin: "Master Administrator",
        admin_cs: "Admin CS",
        admin_keuangan: "Finance Dept"
      };
      return labels[role] || role;
    };
    const getSidebarTitle = () => {
      var _a2;
      const titles = {
        masteradmin: "Master Admin",
        admin_cs: "Admin CS",
        admin_keuangan: "Finance Dept"
      };
      return titles[(_a2 = props.user) == null ? void 0 : _a2.role] || "Admin Panel";
    };
    const getSidebarSubtitle = () => {
      var _a2;
      const subtitles = {
        masteradmin: "Full System Control",
        admin_cs: "Customer Service",
        admin_keuangan: "Financial Management"
      };
      return subtitles[(_a2 = props.user) == null ? void 0 : _a2.role] || "System Access";
    };
    const getDashboardRoute = () => {
      var _a2;
      const routes = {
        masteradmin: "/master-admin/dashboard",
        admin_cs: "/admin-cs/dashboard",
        admin_keuangan: "/admin-keuangan/dashboard"
      };
      return routes[(_a2 = props.user) == null ? void 0 : _a2.role] || "/dashboard";
    };
    const getUsersRoute = () => {
      return "/master-admin/users";
    };
    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getAccountAge = () => {
      var _a2;
      if (!((_a2 = props.user) == null ? void 0 : _a2.created_at)) return "N/A";
      const createdDate = new Date(props.user.created_at);
      const now = /* @__PURE__ */ new Date();
      const diffTime = Math.abs(now - createdDate);
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      if (diffDays < 30) {
        return `${diffDays} days`;
      } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `${months} month${months > 1 ? "s" : ""}`;
      } else {
        const years = Math.floor(diffDays / 365);
        return `${years} year${years > 1 ? "s" : ""}`;
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        isMobileSidebarOpen.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      if (props.user) {
        profileForm.name = props.user.name || "";
        profileForm.email = props.user.email || "";
        profileForm.phone = props.user.phone || "";
      }
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-82f6fbb2><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-82f6fbb2><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-82f6fbb2><div class="flex justify-between items-center h-16" data-v-82f6fbb2><div class="lg:hidden" data-v-82f6fbb2><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-82f6fbb2><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-82f6fbb2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-82f6fbb2></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-82f6fbb2><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-82f6fbb2> Profile Settings </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-82f6fbb2>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b3, _c3, _d2, _e2, _f2;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-82f6fbb2${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-82f6fbb2${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-82f6fbb2${_scopeId}>${ssrInterpolate(getInitials((_a3 = __props.user) == null ? void 0 : _a3.name))}</span></div><div class="hidden sm:block text-left" data-v-82f6fbb2${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-82f6fbb2${_scopeId}>${ssrInterpolate((_b3 = __props.user) == null ? void 0 : _b3.name)}</p><p class="text-xs text-sage-500" data-v-82f6fbb2${_scopeId}>${ssrInterpolate(getRoleLabel((_c3 = __props.user) == null ? void 0 : _c3.role))}</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-82f6fbb2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-82f6fbb2${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_d2 = __props.user) == null ? void 0 : _d2.name)), 1)
                ]),
                createVNode("div", { class: "hidden sm:block text-left" }, [
                  createVNode("p", { class: "text-sm font-medium text-sage-700" }, toDisplayString((_e2 = __props.user) == null ? void 0 : _e2.name), 1),
                  createVNode("p", { class: "text-xs text-sage-500" }, toDisplayString(getRoleLabel((_f2 = __props.user) == null ? void 0 : _f2.role)), 1)
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
            _push2(`<div class="py-1" data-v-82f6fbb2${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: getDashboardRoute(),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-82f6fbb2${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-82f6fbb2${_scopeId2}></path></svg><span data-v-82f6fbb2${_scopeId2}>Dashboard</span>`);
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
                        d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      })
                    ])),
                    createVNode("span", null, "Dashboard")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="border-t border-gray-100 my-1" data-v-82f6fbb2${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-82f6fbb2${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-82f6fbb2${_scopeId2}></path></svg><span data-v-82f6fbb2${_scopeId2}>Log Out</span>`);
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
                  href: getDashboardRoute(),
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
                        d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      })
                    ])),
                    createVNode("span", null, "Dashboard")
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-82f6fbb2></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": isMobileSidebarOpen.value,
        "-translate-x-full": !isMobileSidebarOpen.value
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"])}" data-v-82f6fbb2><div class="px-6 py-6 border-b border-sage-200" data-v-82f6fbb2><div class="flex items-center space-x-3" data-v-82f6fbb2><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-82f6fbb2><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-82f6fbb2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-82f6fbb2></path></svg></div><div data-v-82f6fbb2><h2 class="text-lg font-bold text-sage-700" data-v-82f6fbb2>${ssrInterpolate(getSidebarTitle())}</h2><p class="text-xs text-sage-500" data-v-82f6fbb2>${ssrInterpolate(getSidebarSubtitle())}</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto" data-v-82f6fbb2><a${ssrRenderAttr("href", getDashboardRoute())} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200" data-v-82f6fbb2><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-82f6fbb2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-82f6fbb2></path></svg><span class="font-medium" data-v-82f6fbb2>Dashboard</span></a>`);
      if (((_a2 = __props.user) == null ? void 0 : _a2.role) === "masteradmin") {
        _push(`<a${ssrRenderAttr("href", getUsersRoute())} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200" data-v-82f6fbb2><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-82f6fbb2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-82f6fbb2></path></svg><span class="font-medium" data-v-82f6fbb2>User Management</span></a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</nav><div class="p-4 border-t border-sage-200 bg-sage-50" data-v-82f6fbb2><div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-sage-100 transition-colors cursor-pointer" data-v-82f6fbb2><div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center" data-v-82f6fbb2><span class="text-white font-semibold text-sm" data-v-82f6fbb2>${ssrInterpolate(getInitials((_b2 = __props.user) == null ? void 0 : _b2.name))}</span></div><div class="flex-1 min-w-0" data-v-82f6fbb2><p class="text-sm font-medium text-sage-700 truncate" data-v-82f6fbb2>${ssrInterpolate((_c2 = __props.user) == null ? void 0 : _c2.name)}</p><p class="text-xs text-sage-500 truncate" data-v-82f6fbb2>${ssrInterpolate((_d = __props.user) == null ? void 0 : _d.email)}</p></div></div></div></aside><main class="lg:ml-64 pt-16 min-h-screen" data-v-82f6fbb2><div class="p-4 sm:p-6 lg:p-8" data-v-82f6fbb2>`);
      if ((_e = __props.flash) == null ? void 0 : _e.success) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-82f6fbb2><span class="block sm:inline" data-v-82f6fbb2>${ssrInterpolate(__props.flash.success)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_f = __props.flash) == null ? void 0 : _f.error) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-82f6fbb2><span class="block sm:inline" data-v-82f6fbb2>${ssrInterpolate(__props.flash.error)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-gradient-to-r from-sage-600 to-sage-700 rounded-xl shadow-lg p-6 mb-8 text-white" data-v-82f6fbb2><div class="flex items-center space-x-6" data-v-82f6fbb2><div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center" data-v-82f6fbb2><span class="text-3xl font-bold text-white" data-v-82f6fbb2>${ssrInterpolate(getInitials((_g = __props.user) == null ? void 0 : _g.name))}</span></div><div data-v-82f6fbb2><h2 class="text-2xl font-bold mb-1" data-v-82f6fbb2>${ssrInterpolate((_h = __props.user) == null ? void 0 : _h.name)}</h2><p class="text-sage-100 text-lg" data-v-82f6fbb2>${ssrInterpolate(getRoleLabel((_i = __props.user) == null ? void 0 : _i.role))}</p><p class="text-sage-200 text-sm" data-v-82f6fbb2>${ssrInterpolate((_j = __props.user) == null ? void 0 : _j.email)}</p><div class="flex items-center mt-2 space-x-4" data-v-82f6fbb2><span class="text-xs bg-white bg-opacity-20 px-2 py-1 rounded" data-v-82f6fbb2> ID: ${ssrInterpolate((_k = __props.user) == null ? void 0 : _k.id)}</span><span class="${ssrRenderClass([
        ((_l = __props.user) == null ? void 0 : _l.status) === "active" ? "bg-green-500 bg-opacity-30 text-white" : "bg-red-500 bg-opacity-30 text-white",
        "text-xs px-2 py-1 rounded"
      ])}" data-v-82f6fbb2>${ssrInterpolate((_n = (_m = __props.user) == null ? void 0 : _m.status) == null ? void 0 : _n.toUpperCase())}</span></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-82f6fbb2><div class="border-b border-sage-200" data-v-82f6fbb2><nav class="flex space-x-8 px-6" data-v-82f6fbb2><button class="${ssrRenderClass([
        activeTab.value === "profile" ? "border-sage-600 text-sage-700" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
        "py-4 px-1 border-b-2 font-medium text-sm transition-colors"
      ])}" data-v-82f6fbb2><div class="flex items-center space-x-2" data-v-82f6fbb2><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-82f6fbb2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-82f6fbb2></path></svg><span data-v-82f6fbb2>Profile Information</span></div></button><button class="${ssrRenderClass([
        activeTab.value === "password" ? "border-sage-600 text-sage-700" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
        "py-4 px-1 border-b-2 font-medium text-sm transition-colors"
      ])}" data-v-82f6fbb2><div class="flex items-center space-x-2" data-v-82f6fbb2><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-82f6fbb2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" data-v-82f6fbb2></path></svg><span data-v-82f6fbb2>Change Password</span></div></button><button class="${ssrRenderClass([
        activeTab.value === "security" ? "border-sage-600 text-sage-700" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
        "py-4 px-1 border-b-2 font-medium text-sm transition-colors"
      ])}" data-v-82f6fbb2><div class="flex items-center space-x-2" data-v-82f6fbb2><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-82f6fbb2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-82f6fbb2></path></svg><span data-v-82f6fbb2>Account Security</span></div></button></nav></div><div class="p-6" data-v-82f6fbb2>`);
      if (activeTab.value === "profile") {
        _push(`<div data-v-82f6fbb2><div class="max-w-xl" data-v-82f6fbb2><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-82f6fbb2> Profile Information </h3><p class="text-sm text-sage-600 mb-6" data-v-82f6fbb2> Update your account&#39;s profile information and email address. </p><form class="space-y-6" data-v-82f6fbb2><div data-v-82f6fbb2><label for="name" class="block text-sm font-medium text-sage-700 mb-2" data-v-82f6fbb2> Full Name </label><input id="name"${ssrRenderAttr("value", profileForm.name)} type="text" required class="${ssrRenderClass([{ "border-red-300": profileErrors.value.name }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-82f6fbb2>`);
        if (profileErrors.value.name) {
          _push(`<div class="mt-1 text-sm text-red-600" data-v-82f6fbb2>${ssrInterpolate(profileErrors.value.name[0])}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-82f6fbb2><label for="email" class="block text-sm font-medium text-sage-700 mb-2" data-v-82f6fbb2> Email Address </label><input id="email"${ssrRenderAttr("value", profileForm.email)} type="email" required class="${ssrRenderClass([{ "border-red-300": profileErrors.value.email }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-82f6fbb2>`);
        if (profileErrors.value.email) {
          _push(`<div class="mt-1 text-sm text-red-600" data-v-82f6fbb2>${ssrInterpolate(profileErrors.value.email[0])}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-82f6fbb2><label for="phone" class="block text-sm font-medium text-sage-700 mb-2" data-v-82f6fbb2> Phone Number </label><input id="phone"${ssrRenderAttr("value", profileForm.phone)} type="tel" class="${ssrRenderClass([{ "border-red-300": profileErrors.value.phone }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-82f6fbb2>`);
        if (profileErrors.value.phone) {
          _push(`<div class="mt-1 text-sm text-red-600" data-v-82f6fbb2>${ssrInterpolate(profileErrors.value.phone[0])}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (__props.mustVerifyEmail && !((_o = __props.user) == null ? void 0 : _o.email_verified_at)) {
          _push(`<div data-v-82f6fbb2><div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg" data-v-82f6fbb2><div class="flex" data-v-82f6fbb2><svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" data-v-82f6fbb2><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" data-v-82f6fbb2></path></svg><div class="ml-3" data-v-82f6fbb2><p class="text-sm text-yellow-800" data-v-82f6fbb2> Your email address is unverified. `);
          _push(ssrRenderComponent(unref(Link), {
            href: _ctx.route("verification.send"),
            method: "post",
            as: "button",
            class: "text-yellow-800 underline hover:text-yellow-900 font-medium"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Click here to re-send the verification email. `);
              } else {
                return [
                  createTextVNode(" Click here to re-send the verification email. ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</p><div style="${ssrRenderStyle(__props.status === "verification-link-sent" ? null : { display: "none" })}" class="mt-2 text-sm font-medium text-green-600" data-v-82f6fbb2> A new verification link has been sent to your email address. </div></div></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center gap-4" data-v-82f6fbb2><button type="submit"${ssrIncludeBooleanAttr(profileProcessing.value) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-82f6fbb2>`);
        if (profileProcessing.value) {
          _push(`<span data-v-82f6fbb2>Saving...</span>`);
        } else {
          _push(`<span data-v-82f6fbb2>Save Changes</span>`);
        }
        _push(`</button>`);
        if (profileRecentlySuccessful.value) {
          _push(`<div class="text-sm text-green-600 font-medium" data-v-82f6fbb2> Saved successfully! </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "password") {
        _push(`<div data-v-82f6fbb2><div class="max-w-xl" data-v-82f6fbb2><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-82f6fbb2> Change Password </h3><p class="text-sm text-sage-600 mb-6" data-v-82f6fbb2> Ensure your account is using a long, random password to stay secure. </p><form class="space-y-6" data-v-82f6fbb2><div data-v-82f6fbb2><label for="current_password" class="block text-sm font-medium text-sage-700 mb-2" data-v-82f6fbb2> Current Password </label><input id="current_password"${ssrRenderAttr("value", passwordForm.current_password)} type="password" required class="${ssrRenderClass([{
          "border-red-300": passwordErrors.value.current_password
        }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-82f6fbb2>`);
        if (passwordErrors.value.current_password) {
          _push(`<div class="mt-1 text-sm text-red-600" data-v-82f6fbb2>${ssrInterpolate(passwordErrors.value.current_password[0])}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-82f6fbb2><label for="password" class="block text-sm font-medium text-sage-700 mb-2" data-v-82f6fbb2> New Password </label><input id="password"${ssrRenderAttr("value", passwordForm.password)} type="password" required class="${ssrRenderClass([{ "border-red-300": passwordErrors.value.password }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-82f6fbb2>`);
        if (passwordErrors.value.password) {
          _push(`<div class="mt-1 text-sm text-red-600" data-v-82f6fbb2>${ssrInterpolate(passwordErrors.value.password[0])}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div data-v-82f6fbb2><label for="password_confirmation" class="block text-sm font-medium text-sage-700 mb-2" data-v-82f6fbb2> Confirm New Password </label><input id="password_confirmation"${ssrRenderAttr("value", passwordForm.password_confirmation)} type="password" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-82f6fbb2></div><div class="flex items-center gap-4" data-v-82f6fbb2><button type="submit"${ssrIncludeBooleanAttr(passwordProcessing.value) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-82f6fbb2>`);
        if (passwordProcessing.value) {
          _push(`<span data-v-82f6fbb2>Updating...</span>`);
        } else {
          _push(`<span data-v-82f6fbb2>Update Password</span>`);
        }
        _push(`</button>`);
        if (passwordRecentlySuccessful.value) {
          _push(`<div class="text-sm text-green-600 font-medium" data-v-82f6fbb2> Password updated successfully! </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></form></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (activeTab.value === "security") {
        _push(`<div data-v-82f6fbb2><div class="max-w-2xl" data-v-82f6fbb2><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-82f6fbb2> Account Security </h3><p class="text-sm text-sage-600 mb-6" data-v-82f6fbb2> Manage your account security settings and view account information. </p><div class="space-y-6" data-v-82f6fbb2><div class="bg-sage-50 border border-sage-200 rounded-lg p-4" data-v-82f6fbb2><h4 class="font-medium text-sage-800 mb-3" data-v-82f6fbb2> Account Information </h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" data-v-82f6fbb2><div data-v-82f6fbb2><span class="text-sage-600" data-v-82f6fbb2>User ID:</span><span class="ml-2 font-medium font-mono" data-v-82f6fbb2>#${ssrInterpolate((_p = __props.user) == null ? void 0 : _p.id)}</span></div><div data-v-82f6fbb2><span class="text-sage-600" data-v-82f6fbb2>Account Created:</span><span class="ml-2 font-medium" data-v-82f6fbb2>${ssrInterpolate(formatDate((_q = __props.user) == null ? void 0 : _q.created_at))}</span></div><div data-v-82f6fbb2><span class="text-sage-600" data-v-82f6fbb2>Last Updated:</span><span class="ml-2 font-medium" data-v-82f6fbb2>${ssrInterpolate(formatDate((_r = __props.user) == null ? void 0 : _r.updated_at))}</span></div><div data-v-82f6fbb2><span class="text-sage-600" data-v-82f6fbb2>Email Verified:</span><span class="${ssrRenderClass([
          ((_s = __props.user) == null ? void 0 : _s.email_verified_at) ? "text-green-600" : "text-red-600",
          "ml-2 font-medium"
        ])}" data-v-82f6fbb2>${ssrInterpolate(((_t = __props.user) == null ? void 0 : _t.email_verified_at) ? formatDate(__props.user.email_verified_at) : "Not Verified")}</span></div><div data-v-82f6fbb2><span class="text-sage-600" data-v-82f6fbb2>Account Status:</span><span class="${ssrRenderClass([
          ((_u = __props.user) == null ? void 0 : _u.status) === "active" ? "text-green-600" : "text-red-600",
          "ml-2 font-medium"
        ])}" data-v-82f6fbb2>${ssrInterpolate(((_v = __props.user) == null ? void 0 : _v.status) === "active" ? "Active" : "Inactive")}</span></div><div data-v-82f6fbb2><span class="text-sage-600" data-v-82f6fbb2>Role:</span><span class="ml-2 font-medium" data-v-82f6fbb2>${ssrInterpolate(getRoleLabel((_w = __props.user) == null ? void 0 : _w.role))}</span></div><div data-v-82f6fbb2><span class="text-sage-600" data-v-82f6fbb2>Account Age:</span><span class="ml-2 font-medium" data-v-82f6fbb2>${ssrInterpolate(getAccountAge())}</span></div></div></div><div class="bg-blue-50 border border-blue-200 rounded-lg p-4" data-v-82f6fbb2><h4 class="font-medium text-blue-800 mb-3" data-v-82f6fbb2> Security Actions </h4><div class="space-y-3" data-v-82f6fbb2><button${ssrIncludeBooleanAttr(refreshing.value) ? " disabled" : ""} class="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50" data-v-82f6fbb2>`);
        if (refreshing.value) {
          _push(`<span data-v-82f6fbb2>Refreshing...</span>`);
        } else {
          _push(`<span data-v-82f6fbb2>Refresh Account Data</span>`);
        }
        _push(`</button>`);
        if (lastRefreshed.value) {
          _push(`<div class="text-xs text-blue-600" data-v-82f6fbb2> Last refreshed: ${ssrInterpolate(lastRefreshed.value)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-red-50 border border-red-200 rounded-lg p-6" data-v-82f6fbb2><h4 class="font-medium text-red-800 mb-2" data-v-82f6fbb2> Delete Account </h4><p class="text-sm text-red-600 mb-4" data-v-82f6fbb2> Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain. </p><button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-82f6fbb2> Delete Account </button></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></main>`);
      if (confirmingUserDeletion.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-82f6fbb2><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" data-v-82f6fbb2><h3 class="text-lg font-medium text-gray-900 mb-4" data-v-82f6fbb2> Are you sure you want to delete your account? </h3><p class="text-gray-600 mb-6" data-v-82f6fbb2> Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account. </p><form class="space-y-4" data-v-82f6fbb2><div data-v-82f6fbb2><label for="delete_password" class="sr-only" data-v-82f6fbb2>Password</label><input id="delete_password"${ssrRenderAttr("value", deleteForm.password)} type="password" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="Enter your password" data-v-82f6fbb2>`);
        if (deleteErrors.value.password) {
          _push(`<div class="mt-1 text-sm text-red-600" data-v-82f6fbb2>${ssrInterpolate(deleteErrors.value.password[0])}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex justify-end space-x-3" data-v-82f6fbb2><button type="button" class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" data-v-82f6fbb2> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(deleteProcessing.value) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-82f6fbb2>`);
        if (deleteProcessing.value) {
          _push(`<span data-v-82f6fbb2>Deleting...</span>`);
        } else {
          _push(`<span data-v-82f6fbb2>Delete Account</span>`);
        }
        _push(`</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Profile/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-82f6fbb2"]]);
export {
  Edit as default
};
