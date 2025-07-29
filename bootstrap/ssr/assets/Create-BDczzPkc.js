import { computed, ref, reactive, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const dashboardRoute = "/master-admin/dashboard";
const usersIndexRoute = "/master-admin/users";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  setup(__props) {
    const props = __props;
    computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = window.$page) == null ? void 0 : _a.props) == null ? void 0 : _b.auth) == null ? void 0 : _c.user) || null;
    });
    const flashSuccess = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = window.$page) == null ? void 0 : _a.props) == null ? void 0 : _b.flash) == null ? void 0 : _c.success) || null;
    });
    const flashError = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = window.$page) == null ? void 0 : _a.props) == null ? void 0 : _b.flash) == null ? void 0 : _c.error) || null;
    });
    const isMobileSidebarOpen = ref(false);
    const showUserDropdown = ref(false);
    const isSubmitting = ref(false);
    const errors = ref(props.errors || {});
    const form = reactive({
      name: "",
      email: "",
      phone: "",
      role: "",
      status: "active",
      // Default to active
      password: "",
      password_confirmation: ""
    });
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        showUserDropdown.value = false;
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
      console.log("Errors:", props.errors);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClickOutside);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-015cf384><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-015cf384><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-015cf384><div class="flex justify-between items-center h-16" data-v-015cf384><div class="lg:hidden" data-v-015cf384><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors" data-v-015cf384><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-015cf384><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-015cf384></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-015cf384><h1 class="text-lg sm:text-xl font-semibold text-sage-800" data-v-015cf384> Add New User </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-015cf384>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-015cf384${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-015cf384${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-015cf384${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-015cf384${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-015cf384${_scopeId}>${ssrInterpolate((_b2 = _ctx.$page.props.auth.user) == null ? void 0 : _b2.name)}</p><p class="text-xs text-sage-500" data-v-015cf384${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-015cf384${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-015cf384${_scopeId}></path></svg></button>`);
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
            _push2(`<div class="py-1" data-v-015cf384${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-015cf384${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-015cf384${_scopeId2}></path></svg><span data-v-015cf384${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-015cf384${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-015cf384${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-015cf384${_scopeId2}></path></svg><span data-v-015cf384${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-015cf384></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": isMobileSidebarOpen.value,
        "-translate-x-full": !isMobileSidebarOpen.value
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"])}" data-v-015cf384><div class="px-6 py-6 border-b border-sage-200" data-v-015cf384><div class="flex items-center space-x-3" data-v-015cf384><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-015cf384><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-015cf384><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-015cf384></path></svg></div><div data-v-015cf384><h2 class="text-lg font-bold text-sage-700" data-v-015cf384>Master Admin</h2><p class="text-xs text-sage-500" data-v-015cf384>Full System Control</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto" data-v-015cf384><a${ssrRenderAttr("href", dashboardRoute)} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200" data-v-015cf384><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-015cf384><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-015cf384></path></svg><span class="font-medium" data-v-015cf384>Dashboard</span></a><a${ssrRenderAttr("href", usersIndexRoute)} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 bg-sage-100 text-sage-800" data-v-015cf384><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-015cf384><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-015cf384></path></svg><span class="font-medium" data-v-015cf384>User Management</span></a></nav><div class="p-4 border-t border-sage-200 bg-sage-50" data-v-015cf384><div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-sage-100 transition-colors cursor-pointer" data-v-015cf384><div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center" data-v-015cf384><span class="text-white font-semibold text-sm" data-v-015cf384>${ssrInterpolate(getInitials((_a = _ctx.$page.props.auth.user) == null ? void 0 : _a.name))}</span></div><div class="flex-1 min-w-0" data-v-015cf384><p class="text-sm font-medium text-sage-700 truncate" data-v-015cf384>${ssrInterpolate((_b = _ctx.$page.props.auth.user) == null ? void 0 : _b.name)}</p><p class="text-xs text-sage-500 truncate" data-v-015cf384>${ssrInterpolate((_c = _ctx.$page.props.auth.user) == null ? void 0 : _c.email)}</p></div></div></div></aside><main class="lg:ml-64 pt-16 min-h-screen" data-v-015cf384><div class="p-4 sm:p-6 lg:p-8" data-v-015cf384>`);
      if (flashSuccess.value) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-015cf384><span class="block sm:inline" data-v-015cf384>${ssrInterpolate(flashSuccess.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (flashError.value) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-015cf384><span class="block sm:inline" data-v-015cf384>${ssrInterpolate(flashError.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-6" data-v-015cf384><nav class="flex" aria-label="Breadcrumb" data-v-015cf384><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-015cf384><li class="inline-flex items-center" data-v-015cf384><a${ssrRenderAttr("href", dashboardRoute)} class="text-sage-600 hover:text-sage-800" data-v-015cf384> Dashboard </a></li><li data-v-015cf384><div class="flex items-center" data-v-015cf384><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-015cf384><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-015cf384></path></svg><a${ssrRenderAttr("href", usersIndexRoute)} class="ml-1 text-sage-600 hover:text-sage-800 md:ml-2" data-v-015cf384> User Management </a></div></li><li aria-current="page" data-v-015cf384><div class="flex items-center" data-v-015cf384><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-015cf384><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-015cf384></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-015cf384>Add New User</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-015cf384><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-015cf384><div data-v-015cf384><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-015cf384> Add New User </h2><p class="text-sage-600" data-v-015cf384> Create a new user account with appropriate permissions </p></div><div class="mt-4 sm:mt-0" data-v-015cf384><a${ssrRenderAttr("href", usersIndexRoute)} class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors" data-v-015cf384><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-015cf384><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-015cf384></path></svg> Back to Users </a></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-015cf384><div class="px-6 py-4 border-b border-sage-200" data-v-015cf384><h3 class="text-lg font-semibold text-sage-800" data-v-015cf384> User Information </h3><p class="text-sm text-sage-600 mt-1" data-v-015cf384> Fill in the user details below </p></div><form class="p-6" data-v-015cf384><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-015cf384><div data-v-015cf384><label for="name" class="block text-sm font-medium text-sage-700 mb-2" data-v-015cf384> Full Name <span class="text-red-500" data-v-015cf384>*</span></label><input id="name"${ssrRenderAttr("value", form.name)} type="text" required class="${ssrRenderClass([{ "border-red-300": errors.value.name }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" placeholder="Enter full name" data-v-015cf384>`);
      if (errors.value.name) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-015cf384>${ssrInterpolate(errors.value.name[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-015cf384><label for="email" class="block text-sm font-medium text-sage-700 mb-2" data-v-015cf384> Email Address <span class="text-red-500" data-v-015cf384>*</span></label><input id="email"${ssrRenderAttr("value", form.email)} type="email" required class="${ssrRenderClass([{ "border-red-300": errors.value.email }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" placeholder="Enter email address" data-v-015cf384>`);
      if (errors.value.email) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-015cf384>${ssrInterpolate(errors.value.email[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-015cf384><label for="phone" class="block text-sm font-medium text-sage-700 mb-2" data-v-015cf384> Phone Number </label><input id="phone"${ssrRenderAttr("value", form.phone)} type="tel" class="${ssrRenderClass([{ "border-red-300": errors.value.phone }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" placeholder="Enter phone number" data-v-015cf384>`);
      if (errors.value.phone) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-015cf384>${ssrInterpolate(errors.value.phone[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-015cf384><label for="role" class="block text-sm font-medium text-sage-700 mb-2" data-v-015cf384> Role <span class="text-red-500" data-v-015cf384>*</span></label><select id="role" required class="${ssrRenderClass([{ "border-red-300": errors.value.role }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-015cf384><option value="" data-v-015cf384${ssrIncludeBooleanAttr(Array.isArray(form.role) ? ssrLooseContain(form.role, "") : ssrLooseEqual(form.role, "")) ? " selected" : ""}>Select Role</option><option value="masteradmin" data-v-015cf384${ssrIncludeBooleanAttr(Array.isArray(form.role) ? ssrLooseContain(form.role, "masteradmin") : ssrLooseEqual(form.role, "masteradmin")) ? " selected" : ""}>Master Admin</option><option value="admin_cs" data-v-015cf384${ssrIncludeBooleanAttr(Array.isArray(form.role) ? ssrLooseContain(form.role, "admin_cs") : ssrLooseEqual(form.role, "admin_cs")) ? " selected" : ""}>Admin CS</option><option value="admin_keuangan" data-v-015cf384${ssrIncludeBooleanAttr(Array.isArray(form.role) ? ssrLooseContain(form.role, "admin_keuangan") : ssrLooseEqual(form.role, "admin_keuangan")) ? " selected" : ""}>Admin Keuangan</option></select>`);
      if (errors.value.role) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-015cf384>${ssrInterpolate(errors.value.role[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-015cf384><label for="status" class="block text-sm font-medium text-sage-700 mb-2" data-v-015cf384> Status <span class="text-red-500" data-v-015cf384>*</span></label><select id="status" required class="${ssrRenderClass([{ "border-red-300": errors.value.status }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-015cf384><option value="" data-v-015cf384${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "") : ssrLooseEqual(form.status, "")) ? " selected" : ""}>Select Status</option><option value="active" data-v-015cf384${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "active") : ssrLooseEqual(form.status, "active")) ? " selected" : ""}>Active</option><option value="inactive" data-v-015cf384${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "inactive") : ssrLooseEqual(form.status, "inactive")) ? " selected" : ""}>Inactive</option></select>`);
      if (errors.value.status) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-015cf384>${ssrInterpolate(errors.value.status[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-8 pt-6 border-t border-sage-200" data-v-015cf384><h4 class="text-lg font-medium text-sage-800 mb-4" data-v-015cf384> Account Security </h4><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-015cf384><div data-v-015cf384><label for="password" class="block text-sm font-medium text-sage-700 mb-2" data-v-015cf384> Password <span class="text-red-500" data-v-015cf384>*</span></label><input id="password"${ssrRenderAttr("value", form.password)} type="password" required class="${ssrRenderClass([{ "border-red-300": errors.value.password }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" placeholder="Enter password (min. 8 characters)" data-v-015cf384>`);
      if (errors.value.password) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-015cf384>${ssrInterpolate(errors.value.password[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-015cf384><label for="password_confirmation" class="block text-sm font-medium text-sage-700 mb-2" data-v-015cf384> Confirm Password <span class="text-red-500" data-v-015cf384>*</span></label><input id="password_confirmation"${ssrRenderAttr("value", form.password_confirmation)} type="password" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Confirm password" data-v-015cf384></div></div></div><div class="mt-8 pt-6 border-t border-sage-200 flex justify-end space-x-3" data-v-015cf384><a${ssrRenderAttr("href", usersIndexRoute)} class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-015cf384> Cancel </a><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-015cf384>`);
      if (isSubmitting.value) {
        _push(`<span data-v-015cf384>Creating...</span>`);
      } else {
        _push(`<span data-v-015cf384>Create User</span>`);
      }
      _push(`</button></div></form></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Users/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-015cf384"]]);
export {
  Create as default
};
