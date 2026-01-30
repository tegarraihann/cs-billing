import { computed, ref, reactive, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, withDirectives, vModelText, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { Head } from "@inertiajs/vue3";
import { M as MasterAdminLayout } from "./MasterAdminLayout-DdhkBJT4.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-Docsn73D.js";
import "./useIdleTimeout-BVnZv5Lp.js";
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
    const showDeleteModal = ref(false);
    const employeeToDelete = ref(null);
    const searchForm = reactive({
      search: ((_a = props.filters) == null ? void 0 : _a.search) || "",
      status: ((_b = props.filters) == null ? void 0 : _b.status) || ""
    });
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    const getShowRoute = (employeeId) => {
      return `/master-admin/employees/${employeeId}`;
    };
    const getEditRoute = (employeeId) => {
      return `/master-admin/employees/${employeeId}/edit`;
    };
    const performSearch = () => {
      const params = new URLSearchParams();
      if (searchForm.search) params.append("search", searchForm.search);
      if (searchForm.status) params.append("status", searchForm.status);
      const queryString = params.toString();
      const url = `/master-admin/employees/search${queryString ? "?" + queryString : ""}`;
      window.location.href = url;
    };
    let searchTimeout;
    const debounceSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch();
      }, 300);
    };
    const confirmDelete = (employee) => {
      employeeToDelete.value = employee;
      showDeleteModal.value = true;
    };
    const cancelDelete = () => {
      employeeToDelete.value = null;
      showDeleteModal.value = false;
    };
    const deleteEmployee = () => {
      var _a2;
      if (employeeToDelete.value) {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = `/master-admin/employees/${employeeToDelete.value.id}`;
        const methodInput = document.createElement("input");
        methodInput.type = "hidden";
        methodInput.name = "_method";
        methodInput.value = "DELETE";
        const tokenInput = document.createElement("input");
        tokenInput.type = "hidden";
        tokenInput.name = "_token";
        tokenInput.value = (_a2 = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a2.getAttribute("content");
        form.appendChild(methodInput);
        form.appendChild(tokenInput);
        document.body.appendChild(form);
        form.submit();
      }
    };
    const toggleEmployeeStatus = (employee) => {
      var _a2;
      const form = document.createElement("form");
      form.method = "POST";
      form.action = `/master-admin/employees/${employee.id}/toggle-status`;
      const tokenInput = document.createElement("input");
      tokenInput.type = "hidden";
      tokenInput.name = "_token";
      tokenInput.value = (_a2 = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a2.getAttribute("content");
      form.appendChild(tokenInput);
      document.body.appendChild(form);
      form.submit();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(MasterAdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Employee Management" }, null, _parent2, _scopeId));
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-8920dcb2${_scopeId}>`);
            if (flashSuccess.value) {
              _push2(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-8920dcb2${_scopeId}><span class="block sm:inline" data-v-8920dcb2${_scopeId}>${ssrInterpolate(flashSuccess.value)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (flashError.value) {
              _push2(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-8920dcb2${_scopeId}><span class="block sm:inline" data-v-8920dcb2${_scopeId}>${ssrInterpolate(flashError.value)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-8920dcb2${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-8920dcb2${_scopeId}><div data-v-8920dcb2${_scopeId}><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-8920dcb2${_scopeId}> Employee Management </h2><p class="text-sage-600" data-v-8920dcb2${_scopeId}> Manage all employees data - view, add, edit, and delete employee records </p></div><div class="mt-4 sm:mt-0" data-v-8920dcb2${_scopeId}><a${ssrRenderAttr("href", createEmployeeRoute)} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-8920dcb2${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8920dcb2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-8920dcb2${_scopeId}></path></svg> Add New Employee </a></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-8920dcb2${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-8920dcb2${_scopeId}><div data-v-8920dcb2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8920dcb2${_scopeId}>Search Employees</label><input${ssrRenderAttr("value", searchForm.search)} type="text" placeholder="Search by name, email, or employee ID..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8920dcb2${_scopeId}></div><div data-v-8920dcb2${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-8920dcb2${_scopeId}>Filter by Status</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-8920dcb2${_scopeId}><option value="" data-v-8920dcb2${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "") : ssrLooseEqual(searchForm.status, "")) ? " selected" : ""}${_scopeId}>All Status</option><option value="active" data-v-8920dcb2${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "active") : ssrLooseEqual(searchForm.status, "active")) ? " selected" : ""}${_scopeId}>Active</option><option value="inactive" data-v-8920dcb2${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "inactive") : ssrLooseEqual(searchForm.status, "inactive")) ? " selected" : ""}${_scopeId}>Inactive</option></select></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-8920dcb2${_scopeId}><div class="px-6 py-4 border-b border-sage-200" data-v-8920dcb2${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-8920dcb2${_scopeId}>Employees List</h3><p class="text-sm text-sage-600 mt-1" data-v-8920dcb2${_scopeId}> Total: ${ssrInterpolate(((_a2 = __props.employees) == null ? void 0 : _a2.total) || 0)} employees </p></div><div class="overflow-x-auto" data-v-8920dcb2${_scopeId}><table class="w-full" data-v-8920dcb2${_scopeId}><thead class="bg-sage-50" data-v-8920dcb2${_scopeId}><tr data-v-8920dcb2${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-8920dcb2${_scopeId}> Employee </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-8920dcb2${_scopeId}> Position </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-8920dcb2${_scopeId}> Contact </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-8920dcb2${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-8920dcb2${_scopeId}> Join Date </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-8920dcb2${_scopeId}> Actions </th></tr></thead><tbody class="divide-y divide-sage-200" data-v-8920dcb2${_scopeId}><!--[-->`);
            ssrRenderList(((_b2 = __props.employees) == null ? void 0 : _b2.data) || [], (employee) => {
              _push2(`<tr class="hover:bg-sage-50 transition-colors" data-v-8920dcb2${_scopeId}><td class="px-6 py-4" data-v-8920dcb2${_scopeId}><div class="flex items-center" data-v-8920dcb2${_scopeId}><div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center mr-3" data-v-8920dcb2${_scopeId}><span class="text-white font-semibold text-sm" data-v-8920dcb2${_scopeId}>${ssrInterpolate(getInitials(employee.nama))}</span></div><div data-v-8920dcb2${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-8920dcb2${_scopeId}>${ssrInterpolate(employee.nama)}</div><div class="text-sm text-gray-500" data-v-8920dcb2${_scopeId}> ID: ${ssrInterpolate(employee.employee_id)}</div></div></div></td><td class="px-6 py-4" data-v-8920dcb2${_scopeId}><div class="text-sm text-gray-900" data-v-8920dcb2${_scopeId}>${ssrInterpolate(employee.posisi || "-")}</div></td><td class="px-6 py-4" data-v-8920dcb2${_scopeId}><div class="text-sm text-gray-900" data-v-8920dcb2${_scopeId}>${ssrInterpolate(employee.email)}</div><div class="text-sm text-gray-500" data-v-8920dcb2${_scopeId}>${ssrInterpolate(employee.nomor_hp)}</div></td><td class="px-6 py-4" data-v-8920dcb2${_scopeId}><span class="${ssrRenderClass([
                employee.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
                "inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              ])}" data-v-8920dcb2${_scopeId}>${ssrInterpolate(employee.status === "active" ? "Active" : "Inactive")}</span></td><td class="px-6 py-4 text-sm text-gray-500" data-v-8920dcb2${_scopeId}>${ssrInterpolate(formatDate(employee.tanggal_masuk))}</td><td class="px-6 py-4" data-v-8920dcb2${_scopeId}><div class="flex items-center space-x-2" data-v-8920dcb2${_scopeId}><a${ssrRenderAttr("href", getShowRoute(employee.id))} class="text-blue-600 hover:text-blue-800 p-1 rounded transition-colors" title="View" data-v-8920dcb2${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8920dcb2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-8920dcb2${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-8920dcb2${_scopeId}></path></svg></a><a${ssrRenderAttr("href", getEditRoute(employee.id))} class="text-green-600 hover:text-green-800 p-1 rounded transition-colors" title="Edit" data-v-8920dcb2${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8920dcb2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-8920dcb2${_scopeId}></path></svg></a><button class="${ssrRenderClass([
                employee.status === "active" ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800",
                "p-1 rounded transition-colors"
              ])}"${ssrRenderAttr(
                "title",
                employee.status === "active" ? "Deactivate" : "Activate"
              )} data-v-8920dcb2${_scopeId}>`);
              if (employee.status === "active") {
                _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8920dcb2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" data-v-8920dcb2${_scopeId}></path></svg>`);
              } else {
                _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8920dcb2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-8920dcb2${_scopeId}></path></svg>`);
              }
              _push2(`</button><button class="text-red-600 hover:text-red-800 p-1 rounded transition-colors" title="Delete" data-v-8920dcb2${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8920dcb2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-8920dcb2${_scopeId}></path></svg></button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (((_c = __props.employees) == null ? void 0 : _c.last_page) > 1) {
              _push2(`<div class="px-6 py-4 border-t border-sage-200" data-v-8920dcb2${_scopeId}><div class="flex items-center justify-between" data-v-8920dcb2${_scopeId}><div class="text-sm text-sage-600" data-v-8920dcb2${_scopeId}> Showing ${ssrInterpolate(__props.employees.from)} to ${ssrInterpolate(__props.employees.to)} of ${ssrInterpolate(__props.employees.total)} results </div><div class="flex space-x-1" data-v-8920dcb2${_scopeId}><!--[-->`);
              ssrRenderList(__props.employees.links, (link, index) => {
                _push2(`<a${ssrRenderAttr("href", link.url)} class="${ssrRenderClass([
                  link.active ? "bg-sage-600 text-white" : "text-sage-600 hover:bg-sage-100",
                  "px-3 py-2 text-sm rounded-md transition-colors"
                ])}" style="${ssrRenderStyle(
                  !link.url ? "pointer-events: none; opacity: 0.5;" : ""
                )}" data-v-8920dcb2${_scopeId}>${link.label ?? ""}</a>`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-8920dcb2${_scopeId}><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" data-v-8920dcb2${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-8920dcb2${_scopeId}>Confirm Delete</h3><p class="text-gray-600 mb-6" data-v-8920dcb2${_scopeId}> Are you sure you want to delete employee &quot;${ssrInterpolate((_d = employeeToDelete.value) == null ? void 0 : _d.nama)}&quot;? This action cannot be undone. </p><div class="flex justify-end space-x-3" data-v-8920dcb2${_scopeId}><button class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" data-v-8920dcb2${_scopeId}> Cancel </button><button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-8920dcb2${_scopeId}> Delete </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Employee Management" }),
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                flashSuccess.value ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                }, [
                  createVNode("span", { class: "block sm:inline" }, toDisplayString(flashSuccess.value), 1)
                ])) : createCommentVNode("", true),
                flashError.value ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                }, [
                  createVNode("span", { class: "block sm:inline" }, toDisplayString(flashError.value), 1)
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800 mb-2" }, " Employee Management "),
                      createVNode("p", { class: "text-sage-600" }, " Manage all employees data - view, add, edit, and delete employee records ")
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode("a", {
                        href: createEmployeeRoute,
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                      }, [
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
                            d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                          })
                        ])),
                        createTextVNode(" Add New Employee ")
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Search Employees"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchForm.search = $event,
                        onInput: debounceSearch,
                        type: "text",
                        placeholder: "Search by name, email, or employee ID...",
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchForm.search]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Filter by Status"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => searchForm.status = $event,
                        onChange: performSearch,
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, [
                        createVNode("option", { value: "" }, "All Status"),
                        createVNode("option", { value: "active" }, "Active"),
                        createVNode("option", { value: "inactive" }, "Inactive")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, searchForm.status]
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Employees List"),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Total: " + toDisplayString(((_e = __props.employees) == null ? void 0 : _e.total) || 0) + " employees ", 1)
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Employee "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Position "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Contact "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Status "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Join Date "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Actions ")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(((_f = __props.employees) == null ? void 0 : _f.data) || [], (employee) => {
                          return openBlock(), createBlock("tr", {
                            key: employee.id,
                            class: "hover:bg-sage-50 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode("div", { class: "w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center mr-3" }, [
                                  createVNode("span", { class: "text-white font-semibold text-sm" }, toDisplayString(getInitials(employee.nama)), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(employee.nama), 1),
                                  createVNode("div", { class: "text-sm text-gray-500" }, " ID: " + toDisplayString(employee.employee_id), 1)
                                ])
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(employee.posisi || "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(employee.email), 1),
                              createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(employee.nomor_hp), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("span", {
                                class: [
                                  "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                                  employee.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                ]
                              }, toDisplayString(employee.status === "active" ? "Active" : "Inactive"), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-500" }, toDisplayString(formatDate(employee.tanggal_masuk)), 1),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                createVNode("a", {
                                  href: getShowRoute(employee.id),
                                  class: "text-blue-600 hover:text-blue-800 p-1 rounded transition-colors",
                                  title: "View"
                                }, [
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
                                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    }),
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    })
                                  ]))
                                ], 8, ["href"]),
                                createVNode("a", {
                                  href: getEditRoute(employee.id),
                                  class: "text-green-600 hover:text-green-800 p-1 rounded transition-colors",
                                  title: "Edit"
                                }, [
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
                                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    })
                                  ]))
                                ], 8, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => toggleEmployeeStatus(employee),
                                  class: [
                                    "p-1 rounded transition-colors",
                                    employee.status === "active" ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800"
                                  ],
                                  title: employee.status === "active" ? "Deactivate" : "Activate"
                                }, [
                                  employee.status === "active" ? (openBlock(), createBlock("svg", {
                                    key: 0,
                                    class: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                                    })
                                  ])) : (openBlock(), createBlock("svg", {
                                    key: 1,
                                    class: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    })
                                  ]))
                                ], 10, ["onClick", "title"]),
                                createVNode("button", {
                                  onClick: ($event) => confirmDelete(employee),
                                  class: "text-red-600 hover:text-red-800 p-1 rounded transition-colors",
                                  title: "Delete"
                                }, [
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
                                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    })
                                  ]))
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  ((_g = __props.employees) == null ? void 0 : _g.last_page) > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "px-6 py-4 border-t border-sage-200"
                  }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-sm text-sage-600" }, " Showing " + toDisplayString(__props.employees.from) + " to " + toDisplayString(__props.employees.to) + " of " + toDisplayString(__props.employees.total) + " results ", 1),
                      createVNode("div", { class: "flex space-x-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.employees.links, (link, index) => {
                          return openBlock(), createBlock("a", {
                            key: index,
                            href: link.url,
                            innerHTML: link.label,
                            class: [
                              "px-3 py-2 text-sm rounded-md transition-colors",
                              link.active ? "bg-sage-600 text-white" : "text-sage-600 hover:bg-sage-100"
                            ],
                            style: !link.url ? "pointer-events: none; opacity: 0.5;" : ""
                          }, null, 14, ["href", "innerHTML"]);
                        }), 128))
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              showDeleteModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 max-w-md w-full mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Confirm Delete"),
                  createVNode("p", { class: "text-gray-600 mb-6" }, ' Are you sure you want to delete employee "' + toDisplayString((_h = employeeToDelete.value) == null ? void 0 : _h.nama) + '"? This action cannot be undone. ', 1),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: cancelDelete,
                      class: "px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    }, " Cancel "),
                    createVNode("button", {
                      onClick: deleteEmployee,
                      class: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    }, " Delete ")
                  ])
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Employees/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8920dcb2"]]);
export {
  Index as default
};
