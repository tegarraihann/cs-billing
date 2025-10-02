import { computed, ref, reactive, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DlebuOGD.js";
import SidebarNavigation from "./SidebarNavigation-A0RXUIxC.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const createUserRoute = "/master-admin/users/create";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    users: Object,
    filters: Object
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const authUser = computed(() => {
      var _a2, _b2, _c2;
      return ((_c2 = (_b2 = (_a2 = window.$page) == null ? void 0 : _a2.props) == null ? void 0 : _b2.auth) == null ? void 0 : _c2.user) || null;
    });
    const flashSuccess = computed(() => {
      var _a2, _b2, _c2;
      const urlParams = new URLSearchParams(window.location.search);
      const successParam = urlParams.get("success");
      if (successParam) {
        return successParam;
      }
      return ((_c2 = (_b2 = (_a2 = window.$page) == null ? void 0 : _a2.props) == null ? void 0 : _b2.flash) == null ? void 0 : _c2.success) || null;
    });
    const flashError = computed(() => {
      var _a2, _b2, _c2;
      return ((_c2 = (_b2 = (_a2 = window.$page) == null ? void 0 : _a2.props) == null ? void 0 : _b2.flash) == null ? void 0 : _c2.error) || null;
    });
    const isMobileSidebarOpen = ref(false);
    const showDeleteModal = ref(false);
    const userToDelete = ref(null);
    const searchForm = reactive({
      search: ((_a = props.filters) == null ? void 0 : _a.search) || "",
      role: ((_b = props.filters) == null ? void 0 : _b.role) || "",
      status: ((_c = props.filters) == null ? void 0 : _c.status) || ""
    });
    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false;
    };
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    const getRoleClass = (role) => {
      const classes = {
        masteradmin: "bg-purple-100 text-purple-800",
        admin_cs: "bg-blue-100 text-blue-800",
        admin_keuangan: "bg-green-100 text-green-800"
      };
      return classes[role] || "bg-gray-100 text-gray-800";
    };
    const getRoleLabel = (role) => {
      const labels = {
        masteradmin: "Master Admin",
        admin_cs: "Admin CS",
        admin_keuangan: "Finance Dept"
      };
      return labels[role] || role;
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getEditRoute = (userId) => {
      return `/master-admin/users/${userId}/edit`;
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        isMobileSidebarOpen.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      console.log("Users data:", props.users);
      console.log("Filters:", props.filters);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-3fb08330><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-3fb08330><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-3fb08330><div class="flex justify-between items-center h-16" data-v-3fb08330><div class="lg:hidden" data-v-3fb08330><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-3fb08330><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3fb08330><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-3fb08330></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-3fb08330><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-3fb08330> User Management </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-3fb08330>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b3, _c3, _d2;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-3fb08330${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-3fb08330${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-3fb08330${_scopeId}>${ssrInterpolate(getInitials((_a3 = _ctx.$page.props.auth.user) == null ? void 0 : _a3.name))}</span></div><div class="hidden sm:block text-left" data-v-3fb08330${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-3fb08330${_scopeId}>${ssrInterpolate((_b3 = _ctx.$page.props.auth.user) == null ? void 0 : _b3.name)}</p><p class="text-xs text-sage-500" data-v-3fb08330${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3fb08330${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-3fb08330${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c3 = _ctx.$page.props.auth.user) == null ? void 0 : _c3.name)), 1)
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
            _push2(`<div class="py-1" data-v-3fb08330${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3fb08330${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-3fb08330${_scopeId2}></path></svg><span data-v-3fb08330${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-3fb08330${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3fb08330${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-3fb08330${_scopeId2}></path></svg><span data-v-3fb08330${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-3fb08330></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-3fb08330><div class="p-4 sm:p-6 lg:p-8" data-v-3fb08330>`);
      if (flashSuccess.value) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-3fb08330><span class="block sm:inline" data-v-3fb08330>${ssrInterpolate(flashSuccess.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (flashError.value) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-3fb08330><span class="block sm:inline" data-v-3fb08330>${ssrInterpolate(flashError.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-3fb08330><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-3fb08330><div data-v-3fb08330><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-3fb08330> User Management </h2><p class="text-sage-600" data-v-3fb08330> Manage all system users - view, add, edit, and delete user accounts </p></div><div class="mt-4 sm:mt-0" data-v-3fb08330><a${ssrRenderAttr("href", createUserRoute)} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-3fb08330><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3fb08330><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-3fb08330></path></svg> Add New User </a></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-3fb08330><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-3fb08330><div data-v-3fb08330><label class="block text-sm font-medium text-sage-700 mb-2" data-v-3fb08330>Search Users</label><input${ssrRenderAttr("value", searchForm.search)} type="text" placeholder="Search by name or email..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-3fb08330></div><div data-v-3fb08330><label class="block text-sm font-medium text-sage-700 mb-2" data-v-3fb08330>Filter by Role</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-3fb08330><option value="" data-v-3fb08330${ssrIncludeBooleanAttr(Array.isArray(searchForm.role) ? ssrLooseContain(searchForm.role, "") : ssrLooseEqual(searchForm.role, "")) ? " selected" : ""}>All Roles</option><option value="masteradmin" data-v-3fb08330${ssrIncludeBooleanAttr(Array.isArray(searchForm.role) ? ssrLooseContain(searchForm.role, "masteradmin") : ssrLooseEqual(searchForm.role, "masteradmin")) ? " selected" : ""}>Master Admin</option><option value="admin_cs" data-v-3fb08330${ssrIncludeBooleanAttr(Array.isArray(searchForm.role) ? ssrLooseContain(searchForm.role, "admin_cs") : ssrLooseEqual(searchForm.role, "admin_cs")) ? " selected" : ""}>Admin CS</option><option value="admin_keuangan" data-v-3fb08330${ssrIncludeBooleanAttr(Array.isArray(searchForm.role) ? ssrLooseContain(searchForm.role, "admin_keuangan") : ssrLooseEqual(searchForm.role, "admin_keuangan")) ? " selected" : ""}>Finance Dept</option></select></div><div data-v-3fb08330><label class="block text-sm font-medium text-sage-700 mb-2" data-v-3fb08330>Filter by Status</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-3fb08330><option value="" data-v-3fb08330${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "") : ssrLooseEqual(searchForm.status, "")) ? " selected" : ""}>All Status</option><option value="active" data-v-3fb08330${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "active") : ssrLooseEqual(searchForm.status, "active")) ? " selected" : ""}>Active</option><option value="inactive" data-v-3fb08330${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "inactive") : ssrLooseEqual(searchForm.status, "inactive")) ? " selected" : ""}>Inactive</option></select></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-3fb08330><div class="px-6 py-4 border-b border-sage-200" data-v-3fb08330><h3 class="text-lg font-semibold text-sage-800" data-v-3fb08330>Users List</h3><p class="text-sm text-sage-600 mt-1" data-v-3fb08330> Total: ${ssrInterpolate(((_a2 = __props.users) == null ? void 0 : _a2.total) || 0)} users </p></div><div class="overflow-x-auto" data-v-3fb08330><table class="w-full" data-v-3fb08330><thead class="bg-sage-50" data-v-3fb08330><tr data-v-3fb08330><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-3fb08330> User </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-3fb08330> Role </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-3fb08330> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-3fb08330> Created </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-3fb08330> Actions </th></tr></thead><tbody class="divide-y divide-sage-200" data-v-3fb08330><!--[-->`);
      ssrRenderList(((_b2 = __props.users) == null ? void 0 : _b2.data) || [], (user) => {
        var _a3;
        _push(`<tr class="hover:bg-sage-50 transition-colors" data-v-3fb08330><td class="px-6 py-4" data-v-3fb08330><div class="flex items-center" data-v-3fb08330><div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center mr-3" data-v-3fb08330><span class="text-white font-semibold text-sm" data-v-3fb08330>${ssrInterpolate(getInitials(user.name))}</span></div><div data-v-3fb08330><div class="text-sm font-medium text-gray-900" data-v-3fb08330>${ssrInterpolate(user.name)}</div><div class="text-sm text-gray-500" data-v-3fb08330>${ssrInterpolate(user.email)}</div>`);
        if (user.phone) {
          _push(`<div class="text-xs text-gray-400" data-v-3fb08330>${ssrInterpolate(user.phone)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></td><td class="px-6 py-4" data-v-3fb08330><span class="${ssrRenderClass([getRoleClass(user.role), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-3fb08330>${ssrInterpolate(getRoleLabel(user.role))}</span></td><td class="px-6 py-4" data-v-3fb08330><span class="${ssrRenderClass([
          user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
          "inline-flex px-2 py-1 text-xs font-semibold rounded-full"
        ])}" data-v-3fb08330>${ssrInterpolate(user.status === "active" ? "Active" : "Inactive")}</span></td><td class="px-6 py-4 text-sm text-gray-500" data-v-3fb08330>${ssrInterpolate(formatDate(user.created_at))}</td><td class="px-6 py-4" data-v-3fb08330><div class="flex items-center space-x-2" data-v-3fb08330><a${ssrRenderAttr("href", getEditRoute(user.id))} class="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors" title="Edit" data-v-3fb08330><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3fb08330><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-3fb08330></path></svg></a><button class="${ssrRenderClass([
          user.status === "active" ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800",
          "p-1 rounded transition-colors"
        ])}"${ssrRenderAttr(
          "title",
          user.status === "active" ? "Deactivate" : "Activate"
        )} data-v-3fb08330>`);
        if (user.status === "active") {
          _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3fb08330><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" data-v-3fb08330></path></svg>`);
        } else {
          _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3fb08330><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-3fb08330></path></svg>`);
        }
        _push(`</button><button class="text-red-600 hover:text-red-800 p-1 rounded transition-colors" title="Delete"${ssrIncludeBooleanAttr(user.id === ((_a3 = authUser.value) == null ? void 0 : _a3.id)) ? " disabled" : ""} data-v-3fb08330><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3fb08330><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-3fb08330></path></svg></button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (((_c2 = __props.users) == null ? void 0 : _c2.last_page) > 1) {
        _push(`<div class="px-6 py-4 border-t border-sage-200" data-v-3fb08330><div class="flex items-center justify-between" data-v-3fb08330><div class="text-sm text-sage-600" data-v-3fb08330> Showing ${ssrInterpolate(__props.users.from)} to ${ssrInterpolate(__props.users.to)} of ${ssrInterpolate(__props.users.total)} results </div><div class="flex space-x-1" data-v-3fb08330><!--[-->`);
        ssrRenderList(__props.users.links, (link, index) => {
          _push(`<a${ssrRenderAttr("href", link.url)} class="${ssrRenderClass([
            link.active ? "bg-sage-600 text-white" : "text-sage-600 hover:bg-sage-100",
            "px-3 py-2 text-sm rounded-md transition-colors"
          ])}" style="${ssrRenderStyle(
            !link.url ? "pointer-events: none; opacity: 0.5;" : ""
          )}" data-v-3fb08330>${link.label ?? ""}</a>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main>`);
      if (showDeleteModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-3fb08330><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" data-v-3fb08330><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-3fb08330>Confirm Delete</h3><p class="text-gray-600 mb-6" data-v-3fb08330> Are you sure you want to delete user &quot;${ssrInterpolate((_d = userToDelete.value) == null ? void 0 : _d.name)}&quot;? This action cannot be undone. </p><div class="flex justify-end space-x-3" data-v-3fb08330><button class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" data-v-3fb08330> Cancel </button><button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-3fb08330> Delete </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3fb08330"]]);
export {
  Index as default
};
