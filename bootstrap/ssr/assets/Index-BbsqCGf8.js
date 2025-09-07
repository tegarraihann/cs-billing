import { computed, ref, reactive, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import SidebarNavigation from "./SidebarNavigation-A0RXUIxC.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const createEmployeeRoute = "/master-admin/employees/create";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    employees: Object,
    filters: Object
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const flashSuccess = computed(() => {
      var _a2, _b2, _c;
      const urlParams = new URLSearchParams(window.location.search);
      const successParam = urlParams.get("success");
      if (successParam) {
        return successParam;
      }
      return ((_c = (_b2 = (_a2 = window.$page) == null ? void 0 : _a2.props) == null ? void 0 : _b2.flash) == null ? void 0 : _c.success) || null;
    });
    const flashError = computed(() => {
      var _a2, _b2, _c;
      return ((_c = (_b2 = (_a2 = window.$page) == null ? void 0 : _a2.props) == null ? void 0 : _b2.flash) == null ? void 0 : _c.error) || null;
    });
    const isMobileSidebarOpen = ref(false);
    const showDeleteModal = ref(false);
    const employeeToDelete = ref(null);
    const searchForm = reactive({
      search: ((_a = props.filters) == null ? void 0 : _a.search) || "",
      status: ((_b = props.filters) == null ? void 0 : _b.status) || ""
    });
    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false;
    };
    const getInitials = (name) => {
      if (!name) return "E";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getShowRoute = (employeeId) => {
      return `/master-admin/employees/${employeeId}`;
    };
    const getEditRoute = (employeeId) => {
      return `/master-admin/employees/${employeeId}/edit`;
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        isMobileSidebarOpen.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      console.log("Employees data:", props.employees);
      console.log("Filters:", props.filters);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-3bc885da><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-3bc885da><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-3bc885da><div class="flex justify-between items-center h-16" data-v-3bc885da><div class="lg:hidden" data-v-3bc885da><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-3bc885da><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3bc885da><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-3bc885da></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-3bc885da><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-3bc885da> Employee Management </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-3bc885da>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b3, _c2, _d2;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-3bc885da${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-3bc885da${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-3bc885da${_scopeId}>${ssrInterpolate(getInitials((_a3 = _ctx.$page.props.auth.user) == null ? void 0 : _a3.name))}</span></div><div class="hidden sm:block text-left" data-v-3bc885da${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-3bc885da${_scopeId}>${ssrInterpolate((_b3 = _ctx.$page.props.auth.user) == null ? void 0 : _b3.name)}</p><p class="text-xs text-sage-500" data-v-3bc885da${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3bc885da${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-3bc885da${_scopeId}></path></svg></button>`);
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
            _push2(`<div class="py-1" data-v-3bc885da${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3bc885da${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-3bc885da${_scopeId2}></path></svg><span data-v-3bc885da${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-3bc885da${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3bc885da${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-3bc885da${_scopeId2}></path></svg><span data-v-3bc885da${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-3bc885da></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-3bc885da><div class="p-4 sm:p-6 lg:p-8" data-v-3bc885da>`);
      if (flashSuccess.value) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-3bc885da><span class="block sm:inline" data-v-3bc885da>${ssrInterpolate(flashSuccess.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (flashError.value) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-3bc885da><span class="block sm:inline" data-v-3bc885da>${ssrInterpolate(flashError.value)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-3bc885da><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-3bc885da><div data-v-3bc885da><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-3bc885da> Employee Management </h2><p class="text-sage-600" data-v-3bc885da> Manage all employees data - view, add, edit, and delete employee records </p></div><div class="mt-4 sm:mt-0" data-v-3bc885da><a${ssrRenderAttr("href", createEmployeeRoute)} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-3bc885da><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3bc885da><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-3bc885da></path></svg> Add New Employee </a></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-3bc885da><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-3bc885da><div data-v-3bc885da><label class="block text-sm font-medium text-sage-700 mb-2" data-v-3bc885da>Search Employees</label><input${ssrRenderAttr("value", searchForm.search)} type="text" placeholder="Search by name, email, or employee ID..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-3bc885da></div><div data-v-3bc885da><label class="block text-sm font-medium text-sage-700 mb-2" data-v-3bc885da>Filter by Status</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-3bc885da><option value="" data-v-3bc885da${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "") : ssrLooseEqual(searchForm.status, "")) ? " selected" : ""}>All Status</option><option value="active" data-v-3bc885da${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "active") : ssrLooseEqual(searchForm.status, "active")) ? " selected" : ""}>Active</option><option value="inactive" data-v-3bc885da${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "inactive") : ssrLooseEqual(searchForm.status, "inactive")) ? " selected" : ""}>Inactive</option></select></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-3bc885da><div class="px-6 py-4 border-b border-sage-200" data-v-3bc885da><h3 class="text-lg font-semibold text-sage-800" data-v-3bc885da>Employees List</h3><p class="text-sm text-sage-600 mt-1" data-v-3bc885da> Total: ${ssrInterpolate(((_a2 = __props.employees) == null ? void 0 : _a2.total) || 0)} employees </p></div><div class="overflow-x-auto" data-v-3bc885da><table class="w-full" data-v-3bc885da><thead class="bg-sage-50" data-v-3bc885da><tr data-v-3bc885da><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-3bc885da> Employee </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-3bc885da> Position </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-3bc885da> Contact </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-3bc885da> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-3bc885da> Join Date </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-3bc885da> Actions </th></tr></thead><tbody class="divide-y divide-sage-200" data-v-3bc885da><!--[-->`);
      ssrRenderList(((_b2 = __props.employees) == null ? void 0 : _b2.data) || [], (employee) => {
        _push(`<tr class="hover:bg-sage-50 transition-colors" data-v-3bc885da><td class="px-6 py-4" data-v-3bc885da><div class="flex items-center" data-v-3bc885da><div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center mr-3" data-v-3bc885da><span class="text-white font-semibold text-sm" data-v-3bc885da>${ssrInterpolate(getInitials(employee.nama))}</span></div><div data-v-3bc885da><div class="text-sm font-medium text-gray-900" data-v-3bc885da>${ssrInterpolate(employee.nama)}</div><div class="text-sm text-gray-500" data-v-3bc885da> ID: ${ssrInterpolate(employee.employee_id)}</div></div></div></td><td class="px-6 py-4" data-v-3bc885da><div class="text-sm text-gray-900" data-v-3bc885da>${ssrInterpolate(employee.posisi || "-")}</div></td><td class="px-6 py-4" data-v-3bc885da><div class="text-sm text-gray-900" data-v-3bc885da>${ssrInterpolate(employee.email)}</div><div class="text-sm text-gray-500" data-v-3bc885da>${ssrInterpolate(employee.nomor_hp)}</div></td><td class="px-6 py-4" data-v-3bc885da><span class="${ssrRenderClass([
          employee.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
          "inline-flex px-2 py-1 text-xs font-semibold rounded-full"
        ])}" data-v-3bc885da>${ssrInterpolate(employee.status === "active" ? "Active" : "Inactive")}</span></td><td class="px-6 py-4 text-sm text-gray-500" data-v-3bc885da>${ssrInterpolate(formatDate(employee.tanggal_masuk))}</td><td class="px-6 py-4" data-v-3bc885da><div class="flex items-center space-x-2" data-v-3bc885da><a${ssrRenderAttr("href", getShowRoute(employee.id))} class="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors" title="View" data-v-3bc885da><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3bc885da><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-3bc885da></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-3bc885da></path></svg></a><a${ssrRenderAttr("href", getEditRoute(employee.id))} class="text-green-600 hover:text-green-800 p-1 rounded transition-colors" title="Edit" data-v-3bc885da><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3bc885da><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-3bc885da></path></svg></a><button class="${ssrRenderClass([
          employee.status === "active" ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800",
          "p-1 rounded transition-colors"
        ])}"${ssrRenderAttr(
          "title",
          employee.status === "active" ? "Deactivate" : "Activate"
        )} data-v-3bc885da>`);
        if (employee.status === "active") {
          _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3bc885da><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" data-v-3bc885da></path></svg>`);
        } else {
          _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3bc885da><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-3bc885da></path></svg>`);
        }
        _push(`</button><button class="text-red-600 hover:text-red-800 p-1 rounded transition-colors" title="Delete" data-v-3bc885da><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3bc885da><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-3bc885da></path></svg></button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (((_c = __props.employees) == null ? void 0 : _c.last_page) > 1) {
        _push(`<div class="px-6 py-4 border-t border-sage-200" data-v-3bc885da><div class="flex items-center justify-between" data-v-3bc885da><div class="text-sm text-sage-600" data-v-3bc885da> Showing ${ssrInterpolate(__props.employees.from)} to ${ssrInterpolate(__props.employees.to)} of ${ssrInterpolate(__props.employees.total)} results </div><div class="flex space-x-1" data-v-3bc885da><!--[-->`);
        ssrRenderList(__props.employees.links, (link, index) => {
          _push(`<a${ssrRenderAttr("href", link.url)} class="${ssrRenderClass([
            link.active ? "bg-sage-600 text-white" : "text-sage-600 hover:bg-sage-100",
            "px-3 py-2 text-sm rounded-md transition-colors"
          ])}" style="${ssrRenderStyle(
            !link.url ? "pointer-events: none; opacity: 0.5;" : ""
          )}" data-v-3bc885da>${link.label ?? ""}</a>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></main>`);
      if (showDeleteModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-3bc885da><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" data-v-3bc885da><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-3bc885da>Confirm Delete</h3><p class="text-gray-600 mb-6" data-v-3bc885da> Are you sure you want to delete employee &quot;${ssrInterpolate((_d = employeeToDelete.value) == null ? void 0 : _d.nama)}&quot;? This action cannot be undone. </p><div class="flex justify-end space-x-3" data-v-3bc885da><button class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" data-v-3bc885da> Cancel </button><button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-3bc885da> Delete </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Employees/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3bc885da"]]);
export {
  Index as default
};
