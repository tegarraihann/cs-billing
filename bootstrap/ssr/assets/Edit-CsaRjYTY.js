import { computed, ref, reactive, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DlebuOGD.js";
import SidebarNavigation from "./SidebarNavigation-A0RXUIxC.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const dashboardRoute = "/master-admin/dashboard";
const usersIndexRoute = "/master-admin/users";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    user: Object,
    errors: Object
  },
  setup(__props) {
    var _a, _b, _c, _d, _e;
    const props = __props;
    computed(() => {
      var _a2, _b2, _c2;
      return ((_c2 = (_b2 = (_a2 = window.$page) == null ? void 0 : _a2.props) == null ? void 0 : _b2.auth) == null ? void 0 : _c2.user) || null;
    });
    const flashSuccess = computed(() => {
      var _a2, _b2, _c2;
      return ((_c2 = (_b2 = (_a2 = window.$page) == null ? void 0 : _a2.props) == null ? void 0 : _b2.flash) == null ? void 0 : _c2.success) || null;
    });
    const flashError = computed(() => {
      var _a2, _b2, _c2;
      return ((_c2 = (_b2 = (_a2 = window.$page) == null ? void 0 : _a2.props) == null ? void 0 : _b2.flash) == null ? void 0 : _c2.error) || null;
    });
    const isMobileSidebarOpen = ref(false);
    const showUserDropdown = ref(false);
    const isSubmitting = ref(false);
    const errors = ref(props.errors || {});
    const form = reactive({
      name: ((_a = props.user) == null ? void 0 : _a.name) || "",
      email: ((_b = props.user) == null ? void 0 : _b.email) || "",
      phone: ((_c = props.user) == null ? void 0 : _c.phone) || "",
      role: ((_d = props.user) == null ? void 0 : _d.role) || "",
      status: ((_e = props.user) == null ? void 0 : _e.status) || "",
      password: "",
      password_confirmation: ""
    });
    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false;
    };
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
      console.log("User data:", props.user);
      console.log("Errors:", props.errors);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClickOutside);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-ecff72ca><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-ecff72ca><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-ecff72ca><div class="flex justify-between items-center h-16" data-v-ecff72ca><div class="lg:hidden" data-v-ecff72ca><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors" data-v-ecff72ca><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ecff72ca><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-ecff72ca></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-ecff72ca><h1 class="text-lg sm:text-xl font-semibold text-sage-800" data-v-ecff72ca> Edit User </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-ecff72ca>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-ecff72ca${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-ecff72ca${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-ecff72ca${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-ecff72ca${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-ecff72ca${_scopeId}>${ssrInterpolate((_b2 = _ctx.$page.props.auth.user) == null ? void 0 : _b2.name)}</p><p class="text-xs text-sage-500" data-v-ecff72ca${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ecff72ca${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-ecff72ca${_scopeId}></path></svg></button>`);
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
            _push2(`<div class="py-1" data-v-ecff72ca${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ecff72ca${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-ecff72ca${_scopeId2}></path></svg><span data-v-ecff72ca${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-ecff72ca${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ecff72ca${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-ecff72ca${_scopeId2}></path></svg><span data-v-ecff72ca${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-ecff72ca></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-ecff72ca><div class="p-4 sm:p-6 lg:p-8" data-v-ecff72ca>`);
      if (flashSuccess.value) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-ecff72ca><span class="block sm:inline" data-v-ecff72ca>${ssrInterpolate(flashSuccess.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (flashError.value) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-ecff72ca><span class="block sm:inline" data-v-ecff72ca>${ssrInterpolate(flashError.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-6" data-v-ecff72ca><nav class="flex" aria-label="Breadcrumb" data-v-ecff72ca><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-ecff72ca><li class="inline-flex items-center" data-v-ecff72ca><a${ssrRenderAttr("href", dashboardRoute)} class="text-sage-600 hover:text-sage-800" data-v-ecff72ca> Dashboard </a></li><li data-v-ecff72ca><div class="flex items-center" data-v-ecff72ca><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-ecff72ca><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-ecff72ca></path></svg><a${ssrRenderAttr("href", usersIndexRoute)} class="ml-1 text-sage-600 hover:text-sage-800 md:ml-2" data-v-ecff72ca> User Management </a></div></li><li aria-current="page" data-v-ecff72ca><div class="flex items-center" data-v-ecff72ca><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-ecff72ca><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-ecff72ca></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-ecff72ca>Edit User</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-ecff72ca><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-ecff72ca><div data-v-ecff72ca><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-ecff72ca>Edit User</h2><p class="text-sage-600" data-v-ecff72ca> Update user information and permissions </p></div><div class="mt-4 sm:mt-0" data-v-ecff72ca><a${ssrRenderAttr("href", usersIndexRoute)} class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors" data-v-ecff72ca><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ecff72ca><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-ecff72ca></path></svg> Back to Users </a></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-ecff72ca><div class="px-6 py-4 border-b border-sage-200" data-v-ecff72ca><h3 class="text-lg font-semibold text-sage-800" data-v-ecff72ca> User Information </h3><p class="text-sm text-sage-600 mt-1" data-v-ecff72ca> Edit the user details below </p></div><form class="p-6" data-v-ecff72ca><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-ecff72ca><div data-v-ecff72ca><label for="name" class="block text-sm font-medium text-sage-700 mb-2" data-v-ecff72ca> Full Name <span class="text-red-500" data-v-ecff72ca>*</span></label><input id="name"${ssrRenderAttr("value", form.name)} type="text" required class="${ssrRenderClass([{ "border-red-300": errors.value.name }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" placeholder="Enter full name" data-v-ecff72ca>`);
      if (errors.value.name) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-ecff72ca>${ssrInterpolate(errors.value.name[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-ecff72ca><label for="email" class="block text-sm font-medium text-sage-700 mb-2" data-v-ecff72ca> Email Address <span class="text-red-500" data-v-ecff72ca>*</span></label><input id="email"${ssrRenderAttr("value", form.email)} type="email" required class="${ssrRenderClass([{ "border-red-300": errors.value.email }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" placeholder="Enter email address" data-v-ecff72ca>`);
      if (errors.value.email) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-ecff72ca>${ssrInterpolate(errors.value.email[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-ecff72ca><label for="phone" class="block text-sm font-medium text-sage-700 mb-2" data-v-ecff72ca> Phone Number </label><input id="phone"${ssrRenderAttr("value", form.phone)} type="tel" class="${ssrRenderClass([{ "border-red-300": errors.value.phone }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" placeholder="Enter phone number" data-v-ecff72ca>`);
      if (errors.value.phone) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-ecff72ca>${ssrInterpolate(errors.value.phone[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-ecff72ca><label for="role" class="block text-sm font-medium text-sage-700 mb-2" data-v-ecff72ca> Role <span class="text-red-500" data-v-ecff72ca>*</span></label><select id="role" required class="${ssrRenderClass([{ "border-red-300": errors.value.role }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-ecff72ca><option value="" data-v-ecff72ca${ssrIncludeBooleanAttr(Array.isArray(form.role) ? ssrLooseContain(form.role, "") : ssrLooseEqual(form.role, "")) ? " selected" : ""}>Select Role</option><option value="masteradmin" data-v-ecff72ca${ssrIncludeBooleanAttr(Array.isArray(form.role) ? ssrLooseContain(form.role, "masteradmin") : ssrLooseEqual(form.role, "masteradmin")) ? " selected" : ""}>Master Admin</option><option value="admin_cs" data-v-ecff72ca${ssrIncludeBooleanAttr(Array.isArray(form.role) ? ssrLooseContain(form.role, "admin_cs") : ssrLooseEqual(form.role, "admin_cs")) ? " selected" : ""}>Admin CS</option><option value="admin_keuangan" data-v-ecff72ca${ssrIncludeBooleanAttr(Array.isArray(form.role) ? ssrLooseContain(form.role, "admin_keuangan") : ssrLooseEqual(form.role, "admin_keuangan")) ? " selected" : ""}>Finance Dept</option></select>`);
      if (errors.value.role) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-ecff72ca>${ssrInterpolate(errors.value.role[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-ecff72ca><label for="status" class="block text-sm font-medium text-sage-700 mb-2" data-v-ecff72ca> Status <span class="text-red-500" data-v-ecff72ca>*</span></label><select id="status" required class="${ssrRenderClass([{ "border-red-300": errors.value.status }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-ecff72ca><option value="" data-v-ecff72ca${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "") : ssrLooseEqual(form.status, "")) ? " selected" : ""}>Select Status</option><option value="active" data-v-ecff72ca${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "active") : ssrLooseEqual(form.status, "active")) ? " selected" : ""}>Active</option><option value="inactive" data-v-ecff72ca${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "inactive") : ssrLooseEqual(form.status, "inactive")) ? " selected" : ""}>Inactive</option></select>`);
      if (errors.value.status) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-ecff72ca>${ssrInterpolate(errors.value.status[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-8 pt-6 border-t border-sage-200" data-v-ecff72ca><h4 class="text-lg font-medium text-sage-800 mb-4" data-v-ecff72ca> Change Password </h4><p class="text-sm text-sage-600 mb-4" data-v-ecff72ca> Leave password fields empty if you don&#39;t want to change the password </p><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-ecff72ca><div data-v-ecff72ca><label for="password" class="block text-sm font-medium text-sage-700 mb-2" data-v-ecff72ca> New Password </label><input id="password"${ssrRenderAttr("value", form.password)} type="password" class="${ssrRenderClass([{ "border-red-300": errors.value.password }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" placeholder="Enter new password" data-v-ecff72ca>`);
      if (errors.value.password) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-ecff72ca>${ssrInterpolate(errors.value.password[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-ecff72ca><label for="password_confirmation" class="block text-sm font-medium text-sage-700 mb-2" data-v-ecff72ca> Confirm New Password </label><input id="password_confirmation"${ssrRenderAttr("value", form.password_confirmation)} type="password" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Confirm new password" data-v-ecff72ca></div></div></div><div class="mt-8 pt-6 border-t border-sage-200 flex justify-end space-x-3" data-v-ecff72ca><a${ssrRenderAttr("href", usersIndexRoute)} class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-ecff72ca> Cancel </a><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-ecff72ca>`);
      if (isSubmitting.value) {
        _push(`<span data-v-ecff72ca>Updating...</span>`);
      } else {
        _push(`<span data-v-ecff72ca>Update User</span>`);
      }
      _push(`</button></div></form></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Users/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ecff72ca"]]);
export {
  Edit as default
};
