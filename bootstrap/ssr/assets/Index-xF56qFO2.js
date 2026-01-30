import { computed, ref, reactive, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, withDirectives, vModelText, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { M as MasterAdminLayout } from "./MasterAdminLayout-DdhkBJT4.js";
import { P as Pagination } from "./Pagination-JgWO_U2H.js";
import { Plus } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-Docsn73D.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    users: Object,
    filters: Object,
    authUser: Object
  },
  setup(__props) {
    var _a, _b, _c;
    const props = __props;
    const currentAuthUser = computed(() => props.authUser || null);
    const flashSuccess = computed(() => {
      var _a2, _b2, _c2;
      const urlParams = new URLSearchParams(window.location.search);
      const successParam = urlParams.get("success");
      if (successParam) return successParam;
      return ((_c2 = (_b2 = (_a2 = window.$page) == null ? void 0 : _a2.props) == null ? void 0 : _b2.flash) == null ? void 0 : _c2.success) || null;
    });
    const flashError = computed(() => {
      var _a2, _b2, _c2;
      return ((_c2 = (_b2 = (_a2 = window.$page) == null ? void 0 : _a2.props) == null ? void 0 : _b2.flash) == null ? void 0 : _c2.error) || null;
    });
    const showDeleteModal = ref(false);
    const userToDelete = ref(null);
    const searchForm = reactive({
      search: ((_a = props.filters) == null ? void 0 : _a.search) || "",
      role: ((_b = props.filters) == null ? void 0 : _b.role) || "",
      status: ((_c = props.filters) == null ? void 0 : _c.status) || ""
    });
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
    const performSearch = () => {
      router.get(route("masteradmin.users.index"), { ...searchForm }, { preserveState: true });
    };
    let searchTimeout;
    const debounceSearch = () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch();
      }, 500);
    };
    const confirmDelete = (user) => {
      var _a2;
      if (user.role === "masteradmin" && user.id === ((_a2 = currentAuthUser.value) == null ? void 0 : _a2.id)) {
        alert("Master Admin tidak dapat menghapus akun sendiri.");
        return;
      }
      userToDelete.value = user;
      showDeleteModal.value = true;
    };
    const cancelDelete = () => {
      userToDelete.value = null;
      showDeleteModal.value = false;
    };
    const deleteUser = () => {
      if (userToDelete.value) {
        router.delete(route("masteradmin.users.destroy", userToDelete.value.id), {
          onSuccess: () => {
            showDeleteModal.value = false;
            userToDelete.value = null;
          }
        });
      }
    };
    const toggleUserStatus = (user) => {
      var _a2;
      if (user.role === "masteradmin" && user.id === ((_a2 = currentAuthUser.value) == null ? void 0 : _a2.id) && user.status === "active") {
        alert("Master Admin tidak dapat menonaktifkan akun sendiri.");
        return;
      }
      router.post(route("masteradmin.users.toggle-status", user.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(MasterAdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d, _e, _f;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "User Management" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6" data-v-9c8aeb28${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-9c8aeb28${_scopeId}>`);
            if (flashSuccess.value) {
              _push2(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-9c8aeb28${_scopeId}><span class="block sm:inline" data-v-9c8aeb28${_scopeId}>${ssrInterpolate(flashSuccess.value)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (flashError.value) {
              _push2(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-9c8aeb28${_scopeId}><span class="block sm:inline" data-v-9c8aeb28${_scopeId}>${ssrInterpolate(flashError.value)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-between items-center mb-6" data-v-9c8aeb28${_scopeId}><div data-v-9c8aeb28${_scopeId}><h1 class="text-2xl font-bold text-gray-900" data-v-9c8aeb28${_scopeId}>User Management</h1><p class="mt-1 text-sm text-gray-600" data-v-9c8aeb28${_scopeId}>Manage all system users - view, add, edit, and delete user accounts </p></div><div data-v-9c8aeb28${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("masteradmin.users.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Add New User `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Add New User ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-white shadow rounded-lg mb-6" data-v-9c8aeb28${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-9c8aeb28${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-9c8aeb28${_scopeId}><div data-v-9c8aeb28${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-9c8aeb28${_scopeId}>Search Users</label><input${ssrRenderAttr("value", searchForm.search)} type="text" placeholder="Search by name or email..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" data-v-9c8aeb28${_scopeId}></div><div data-v-9c8aeb28${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-9c8aeb28${_scopeId}>Filter by Role</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" data-v-9c8aeb28${_scopeId}><option value="" data-v-9c8aeb28${ssrIncludeBooleanAttr(Array.isArray(searchForm.role) ? ssrLooseContain(searchForm.role, "") : ssrLooseEqual(searchForm.role, "")) ? " selected" : ""}${_scopeId}>All Roles</option><option value="masteradmin" data-v-9c8aeb28${ssrIncludeBooleanAttr(Array.isArray(searchForm.role) ? ssrLooseContain(searchForm.role, "masteradmin") : ssrLooseEqual(searchForm.role, "masteradmin")) ? " selected" : ""}${_scopeId}>Master Admin</option><option value="admin_cs" data-v-9c8aeb28${ssrIncludeBooleanAttr(Array.isArray(searchForm.role) ? ssrLooseContain(searchForm.role, "admin_cs") : ssrLooseEqual(searchForm.role, "admin_cs")) ? " selected" : ""}${_scopeId}>Admin CS</option><option value="admin_keuangan" data-v-9c8aeb28${ssrIncludeBooleanAttr(Array.isArray(searchForm.role) ? ssrLooseContain(searchForm.role, "admin_keuangan") : ssrLooseEqual(searchForm.role, "admin_keuangan")) ? " selected" : ""}${_scopeId}>Finance Dept</option></select></div><div data-v-9c8aeb28${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-9c8aeb28${_scopeId}>Filter by Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" data-v-9c8aeb28${_scopeId}><option value="" data-v-9c8aeb28${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "") : ssrLooseEqual(searchForm.status, "")) ? " selected" : ""}${_scopeId}>All Status</option><option value="active" data-v-9c8aeb28${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "active") : ssrLooseEqual(searchForm.status, "active")) ? " selected" : ""}${_scopeId}>Active</option><option value="inactive" data-v-9c8aeb28${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "inactive") : ssrLooseEqual(searchForm.status, "inactive")) ? " selected" : ""}${_scopeId}>Inactive</option></select></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md" data-v-9c8aeb28${_scopeId}>`);
            if ((_b2 = (_a2 = __props.users) == null ? void 0 : _a2.data) == null ? void 0 : _b2.length) {
              _push2(`<div class="overflow-x-auto" data-v-9c8aeb28${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-9c8aeb28${_scopeId}><thead class="bg-gray-50" data-v-9c8aeb28${_scopeId}><tr data-v-9c8aeb28${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-9c8aeb28${_scopeId}>User</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-9c8aeb28${_scopeId}>Role</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-9c8aeb28${_scopeId}>Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-9c8aeb28${_scopeId}>Created </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-9c8aeb28${_scopeId}>Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-9c8aeb28${_scopeId}><!--[-->`);
              ssrRenderList(__props.users.data, (user) => {
                var _a3, _b3;
                _push2(`<tr class="hover:bg-gray-50" data-v-9c8aeb28${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-9c8aeb28${_scopeId}><div class="flex items-center" data-v-9c8aeb28${_scopeId}><div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center mr-3" data-v-9c8aeb28${_scopeId}><span class="text-white font-semibold text-sm" data-v-9c8aeb28${_scopeId}>${ssrInterpolate(getInitials(user.name))}</span></div><div data-v-9c8aeb28${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-9c8aeb28${_scopeId}>${ssrInterpolate(user.name)}</div><div class="text-sm text-gray-500" data-v-9c8aeb28${_scopeId}>${ssrInterpolate(user.email)}</div></div></div></td><td class="px-6 py-4 whitespace-nowrap" data-v-9c8aeb28${_scopeId}><span class="${ssrRenderClass([getRoleClass(user.role), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-9c8aeb28${_scopeId}>${ssrInterpolate(getRoleLabel(user.role))}</span></td><td class="px-6 py-4 whitespace-nowrap" data-v-9c8aeb28${_scopeId}><span class="${ssrRenderClass([user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-9c8aeb28${_scopeId}>${ssrInterpolate(user.status === "active" ? "Active" : "Inactive")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-v-9c8aeb28${_scopeId}>${ssrInterpolate(formatDate(user.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" data-v-9c8aeb28${_scopeId}><div class="flex items-center justify-end space-x-2" data-v-9c8aeb28${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("masteradmin.users.edit", user.id),
                  class: "text-sage-600 hover:text-sage-900"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Edit `);
                    } else {
                      return [
                        createTextVNode(" Edit ")
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`<button${ssrIncludeBooleanAttr(user.role === "masteradmin" && user.id === ((_a3 = currentAuthUser.value) == null ? void 0 : _a3.id) && user.status === "active") ? " disabled" : ""} class="text-orange-600 hover:text-orange-900 disabled:opacity-30 disabled:cursor-not-allowed" data-v-9c8aeb28${_scopeId}>${ssrInterpolate(user.status === "active" ? "Deactivate" : "Activate")}</button><button${ssrIncludeBooleanAttr(user.role === "masteradmin" && user.id === ((_b3 = currentAuthUser.value) == null ? void 0 : _b3.id)) ? " disabled" : ""} class="text-red-600 hover:text-red-900 disabled:opacity-30 disabled:cursor-not-allowed" data-v-9c8aeb28${_scopeId}> Delete </button></div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            } else {
              _push2(`<div class="px-6 py-8 text-center text-sm text-gray-500" data-v-9c8aeb28${_scopeId}> No users found. </div>`);
            }
            if (__props.users) {
              _push2(`<div class="mt-6 px-6 pb-6" data-v-9c8aeb28${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.users }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-9c8aeb28${_scopeId}><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" data-v-9c8aeb28${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-9c8aeb28${_scopeId}>Confirm Delete</h3><p class="text-gray-600 mb-6" data-v-9c8aeb28${_scopeId}> Are you sure you want to delete user &quot;${ssrInterpolate((_c2 = userToDelete.value) == null ? void 0 : _c2.name)}&quot;? This action cannot be undone. </p><div class="flex justify-end space-x-3" data-v-9c8aeb28${_scopeId}><button class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" data-v-9c8aeb28${_scopeId}> Cancel </button><button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-9c8aeb28${_scopeId}> Delete </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "User Management" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
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
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "User Management"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Manage all system users - view, add, edit, and delete user accounts ")
                    ]),
                    createVNode("div", null, [
                      createVNode(unref(Link), {
                        href: _ctx.route("masteradmin.users.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Add New User ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Search Users"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => searchForm.search = $event,
                            onInput: debounceSearch,
                            type: "text",
                            placeholder: "Search by name or email...",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 40, ["onUpdate:modelValue"]), [
                            [vModelText, searchForm.search]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Filter by Role"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => searchForm.role = $event,
                            onChange: performSearch,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "All Roles"),
                            createVNode("option", { value: "masteradmin" }, "Master Admin"),
                            createVNode("option", { value: "admin_cs" }, "Admin CS"),
                            createVNode("option", { value: "admin_keuangan" }, "Finance Dept")
                          ], 40, ["onUpdate:modelValue"]), [
                            [vModelSelect, searchForm.role]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Filter by Status"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => searchForm.status = $event,
                            onChange: performSearch,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "All Status"),
                            createVNode("option", { value: "active" }, "Active"),
                            createVNode("option", { value: "inactive" }, "Inactive")
                          ], 40, ["onUpdate:modelValue"]), [
                            [vModelSelect, searchForm.status]
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    ((_e = (_d = __props.users) == null ? void 0 : _d.data) == null ? void 0 : _e.length) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "overflow-x-auto"
                    }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "User"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Role"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Created "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions ")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.users.data, (user) => {
                            var _a3, _b3;
                            return openBlock(), createBlock("tr", {
                              key: user.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("div", { class: "w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center mr-3" }, [
                                    createVNode("span", { class: "text-white font-semibold text-sm" }, toDisplayString(getInitials(user.name)), 1)
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(user.name), 1),
                                    createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(user.email), 1)
                                  ])
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("span", {
                                  class: ["inline-flex px-2 py-1 text-xs font-semibold rounded-full", getRoleClass(user.role)]
                                }, toDisplayString(getRoleLabel(user.role)), 3)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("span", {
                                  class: ["inline-flex px-2 py-1 text-xs font-semibold rounded-full", user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"]
                                }, toDisplayString(user.status === "active" ? "Active" : "Inactive"), 3)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(formatDate(user.created_at)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                createVNode("div", { class: "flex items-center justify-end space-x-2" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("masteradmin.users.edit", user.id),
                                    class: "text-sage-600 hover:text-sage-900"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Edit ")
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode("button", {
                                    onClick: ($event) => toggleUserStatus(user),
                                    disabled: user.role === "masteradmin" && user.id === ((_a3 = currentAuthUser.value) == null ? void 0 : _a3.id) && user.status === "active",
                                    class: "text-orange-600 hover:text-orange-900 disabled:opacity-30 disabled:cursor-not-allowed"
                                  }, toDisplayString(user.status === "active" ? "Deactivate" : "Activate"), 9, ["onClick", "disabled"]),
                                  createVNode("button", {
                                    onClick: ($event) => confirmDelete(user),
                                    disabled: user.role === "masteradmin" && user.id === ((_b3 = currentAuthUser.value) == null ? void 0 : _b3.id),
                                    class: "text-red-600 hover:text-red-900 disabled:opacity-30 disabled:cursor-not-allowed"
                                  }, " Delete ", 8, ["onClick", "disabled"])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "px-6 py-8 text-center text-sm text-gray-500"
                    }, " No users found. ")),
                    __props.users ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "mt-6 px-6 pb-6"
                    }, [
                      createVNode(Pagination, { data: __props.users }, null, 8, ["data"])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              showDeleteModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 max-w-md w-full mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Confirm Delete"),
                  createVNode("p", { class: "text-gray-600 mb-6" }, ' Are you sure you want to delete user "' + toDisplayString((_f = userToDelete.value) == null ? void 0 : _f.name) + '"? This action cannot be undone. ', 1),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: cancelDelete,
                      class: "px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    }, " Cancel "),
                    createVNode("button", {
                      onClick: deleteUser,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Users/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9c8aeb28"]]);
export {
  Index as default
};
