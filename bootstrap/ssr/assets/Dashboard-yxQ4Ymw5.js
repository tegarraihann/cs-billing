import { computed, withCtx, unref, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { M as MasterAdminLayout } from "./MasterAdminLayout-DgFPKcH7.js";
import { Users, Briefcase, UsersRound, CheckCircle, Settings, Plus } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-Docsn73D.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
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
    computed(() => props.user);
    const userStats = computed(() => props.stats || {});
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(MasterAdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Master Admin Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6" data-v-21e187eb${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-21e187eb${_scopeId}><div class="flex justify-between items-center mb-6" data-v-21e187eb${_scopeId}><div data-v-21e187eb${_scopeId}><h1 class="text-2xl font-bold text-gray-900" data-v-21e187eb${_scopeId}>Master Admin Dashboard</h1><p class="mt-1 text-sm text-gray-600" data-v-21e187eb${_scopeId}>Manage system users, services, and core configurations.</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" data-v-21e187eb${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg" data-v-21e187eb${_scopeId}><div class="p-5" data-v-21e187eb${_scopeId}><div class="flex items-center" data-v-21e187eb${_scopeId}><div class="flex-shrink-0" data-v-21e187eb${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-21e187eb${_scopeId}><dl data-v-21e187eb${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-21e187eb${_scopeId}>Total Users</dt><dd class="text-lg font-medium text-gray-900" data-v-21e187eb${_scopeId}>${ssrInterpolate(userStats.value.totalUsers || 0)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-21e187eb${_scopeId}><div class="p-5" data-v-21e187eb${_scopeId}><div class="flex items-center" data-v-21e187eb${_scopeId}><div class="flex-shrink-0" data-v-21e187eb${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Briefcase), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-21e187eb${_scopeId}><dl data-v-21e187eb${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-21e187eb${_scopeId}>Total Services</dt><dd class="text-lg font-medium text-gray-900" data-v-21e187eb${_scopeId}>${ssrInterpolate(userStats.value.totalServices || 0)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-21e187eb${_scopeId}><div class="p-5" data-v-21e187eb${_scopeId}><div class="flex items-center" data-v-21e187eb${_scopeId}><div class="flex-shrink-0" data-v-21e187eb${_scopeId}>`);
            _push2(ssrRenderComponent(unref(UsersRound), { class: "h-6 w-6 text-purple-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-21e187eb${_scopeId}><dl data-v-21e187eb${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-21e187eb${_scopeId}>Team Members</dt><dd class="text-lg font-medium text-gray-900" data-v-21e187eb${_scopeId}>${ssrInterpolate(userStats.value.totalTeamMembers || 0)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-21e187eb${_scopeId}><div class="p-5" data-v-21e187eb${_scopeId}><div class="flex items-center" data-v-21e187eb${_scopeId}><div class="flex-shrink-0" data-v-21e187eb${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-6 w-6 text-orange-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-21e187eb${_scopeId}><dl data-v-21e187eb${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-21e187eb${_scopeId}>Active Services</dt><dd class="text-lg font-medium text-gray-900" data-v-21e187eb${_scopeId}>${ssrInterpolate(userStats.value.activeServices || 0)}</dd></dl></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md" data-v-21e187eb${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-21e187eb${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-21e187eb${_scopeId}>Quick Actions</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-v-21e187eb${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("masteradmin.users.index"),
              class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex-shrink-0" data-v-21e187eb${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Users), { class: "h-6 w-6 text-sage-600" }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex-1 min-w-0" data-v-21e187eb${_scopeId2}><span class="absolute inset-0" aria-hidden="true" data-v-21e187eb${_scopeId2}></span><p class="text-sm font-medium text-gray-900" data-v-21e187eb${_scopeId2}>Manage Users</p><p class="text-sm text-gray-500 truncate" data-v-21e187eb${_scopeId2}>View and manage all user accounts</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode(unref(Users), { class: "h-6 w-6 text-sage-600" })
                    ]),
                    createVNode("div", { class: "flex-1 min-w-0" }, [
                      createVNode("span", {
                        class: "absolute inset-0",
                        "aria-hidden": "true"
                      }),
                      createVNode("p", { class: "text-sm font-medium text-gray-900" }, "Manage Users"),
                      createVNode("p", { class: "text-sm text-gray-500 truncate" }, "View and manage all user accounts")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("masteradmin.website-settings.pengaturan-umum.index"),
              class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex-shrink-0" data-v-21e187eb${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Settings), { class: "h-6 w-6 text-sage-600" }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex-1 min-w-0" data-v-21e187eb${_scopeId2}><span class="absolute inset-0" aria-hidden="true" data-v-21e187eb${_scopeId2}></span><p class="text-sm font-medium text-gray-900" data-v-21e187eb${_scopeId2}>Website Settings</p><p class="text-sm text-gray-500 truncate" data-v-21e187eb${_scopeId2}>Manage homepage, services &amp; team content</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode(unref(Settings), { class: "h-6 w-6 text-sage-600" })
                    ]),
                    createVNode("div", { class: "flex-1 min-w-0" }, [
                      createVNode("span", {
                        class: "absolute inset-0",
                        "aria-hidden": "true"
                      }),
                      createVNode("p", { class: "text-sm font-medium text-gray-900" }, "Website Settings"),
                      createVNode("p", { class: "text-sm text-gray-500 truncate" }, "Manage homepage, services & team content")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("masteradmin.users.create"),
              class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex-shrink-0" data-v-21e187eb${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Plus), { class: "h-6 w-6 text-sage-600" }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="flex-1 min-w-0" data-v-21e187eb${_scopeId2}><span class="absolute inset-0" aria-hidden="true" data-v-21e187eb${_scopeId2}></span><p class="text-sm font-medium text-gray-900" data-v-21e187eb${_scopeId2}>Add New User</p><p class="text-sm text-gray-500 truncate" data-v-21e187eb${_scopeId2}>Create new user accounts for the system</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex-shrink-0" }, [
                      createVNode(unref(Plus), { class: "h-6 w-6 text-sage-600" })
                    ]),
                    createVNode("div", { class: "flex-1 min-w-0" }, [
                      createVNode("span", {
                        class: "absolute inset-0",
                        "aria-hidden": "true"
                      }),
                      createVNode("p", { class: "text-sm font-medium text-gray-900" }, "Add New User"),
                      createVNode("p", { class: "text-sm text-gray-500 truncate" }, "Create new user accounts for the system")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Master Admin Dashboard" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Master Admin Dashboard"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Manage system users, services, and core configurations.")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Users), { class: "h-6 w-6 text-blue-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Users"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(userStats.value.totalUsers || 0), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Briefcase), { class: "h-6 w-6 text-green-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Services"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(userStats.value.totalServices || 0), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(UsersRound), { class: "h-6 w-6 text-purple-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Team Members"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(userStats.value.totalTeamMembers || 0), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(CheckCircle), { class: "h-6 w-6 text-orange-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Active Services"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(userStats.value.activeServices || 0), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Quick Actions"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("masteradmin.users.index"),
                          class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex-shrink-0" }, [
                              createVNode(unref(Users), { class: "h-6 w-6 text-sage-600" })
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("span", {
                                class: "absolute inset-0",
                                "aria-hidden": "true"
                              }),
                              createVNode("p", { class: "text-sm font-medium text-gray-900" }, "Manage Users"),
                              createVNode("p", { class: "text-sm text-gray-500 truncate" }, "View and manage all user accounts")
                            ])
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("masteradmin.website-settings.pengaturan-umum.index"),
                          class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex-shrink-0" }, [
                              createVNode(unref(Settings), { class: "h-6 w-6 text-sage-600" })
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("span", {
                                class: "absolute inset-0",
                                "aria-hidden": "true"
                              }),
                              createVNode("p", { class: "text-sm font-medium text-gray-900" }, "Website Settings"),
                              createVNode("p", { class: "text-sm text-gray-500 truncate" }, "Manage homepage, services & team content")
                            ])
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("masteradmin.users.create"),
                          class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex-shrink-0" }, [
                              createVNode(unref(Plus), { class: "h-6 w-6 text-sage-600" })
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("span", {
                                class: "absolute inset-0",
                                "aria-hidden": "true"
                              }),
                              createVNode("p", { class: "text-sm font-medium text-gray-900" }, "Add New User"),
                              createVNode("p", { class: "text-sm text-gray-500 truncate" }, "Create new user accounts for the system")
                            ])
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ])
                ])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-21e187eb"]]);
export {
  Dashboard as default
};
