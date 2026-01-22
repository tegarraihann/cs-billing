import { onMounted, withCtx, unref, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { A as AdminCSLayout } from "./AdminCSLayout-B0zM3kLa.js";
import { Head } from "@inertiajs/vue3";
import { FileText, Clock, AlertTriangle, Plus } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DplzU1dX.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    user: Object,
    userRole: String,
    stats: {
      type: Object,
      required: true
    },
    recentSalesOrders: {
      type: Array,
      required: true
    },
    statusStats: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const route = window.route || function(name, params) {
      const routes = {
        "admin-cs.sales-orders.index": "/admin-cs/sales-orders",
        "admin-cs.sales-orders.create": "/admin-cs/sales-orders/create",
        "admin-cs.sales-orders.show": "/admin-cs/sales-orders"
      };
      let url = routes[name] || "#";
      if (params) {
        url += `/${params}`;
      }
      return url;
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getStatusLabel = (order) => {
      if (order.rejected_at) return "Rejected";
      if (order.approved_at) return "Approved";
      return "Pending";
    };
    const getStatusBadge = (order) => {
      if (order.rejected_at) return "bg-red-100 text-red-800";
      if (order.approved_at) return "bg-green-100 text-green-800";
      return "bg-yellow-100 text-yellow-800";
    };
    onMounted(() => {
      console.log("AdminCS Dashboard props:", props);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminCSLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Customer Service Dashboard" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6" data-v-350d04f2${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-350d04f2${_scopeId}><div class="flex justify-between items-center mb-6" data-v-350d04f2${_scopeId}><div data-v-350d04f2${_scopeId}><h1 class="text-2xl font-bold text-gray-900" data-v-350d04f2${_scopeId}>Customer Service Dashboard</h1><p class="mt-1 text-sm text-gray-600" data-v-350d04f2${_scopeId}>Manage customer service operations and shipping orders efficiently.</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6" data-v-350d04f2${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg" data-v-350d04f2${_scopeId}><div class="p-5" data-v-350d04f2${_scopeId}><div class="flex items-center" data-v-350d04f2${_scopeId}><div class="flex-shrink-0" data-v-350d04f2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-350d04f2${_scopeId}><dl data-v-350d04f2${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-350d04f2${_scopeId}>Sales Orders This Month</dt><dd class="text-lg font-medium text-gray-900" data-v-350d04f2${_scopeId}>${ssrInterpolate(__props.stats.totalSalesOrdersThisMonth)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-350d04f2${_scopeId}><div class="p-5" data-v-350d04f2${_scopeId}><div class="flex items-center" data-v-350d04f2${_scopeId}><div class="flex-shrink-0" data-v-350d04f2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Clock), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-350d04f2${_scopeId}><dl data-v-350d04f2${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-350d04f2${_scopeId}>Orders Today</dt><dd class="text-lg font-medium text-gray-900" data-v-350d04f2${_scopeId}>${ssrInterpolate(__props.stats.salesOrdersToday)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-350d04f2${_scopeId}><div class="p-5" data-v-350d04f2${_scopeId}><div class="flex items-center" data-v-350d04f2${_scopeId}><div class="flex-shrink-0" data-v-350d04f2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-6 w-6 text-yellow-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-350d04f2${_scopeId}><dl data-v-350d04f2${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-350d04f2${_scopeId}>Pending Approvals</dt><dd class="text-lg font-medium text-gray-900" data-v-350d04f2${_scopeId}>${ssrInterpolate(__props.stats.pendingSalesOrders)}</dd></dl></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-350d04f2${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-350d04f2${_scopeId}><div class="flex items-center justify-between mb-4" data-v-350d04f2${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900" data-v-350d04f2${_scopeId}>Recent Sales Orders</h3><a${ssrRenderAttr("href", unref(route)("admin-cs.sales-orders.index"))} class="text-sm font-medium text-blue-600 hover:text-blue-500" data-v-350d04f2${_scopeId}> View All → </a></div><div class="overflow-x-auto" data-v-350d04f2${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-350d04f2${_scopeId}><thead class="bg-gray-50" data-v-350d04f2${_scopeId}><tr data-v-350d04f2${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-350d04f2${_scopeId}> Order Number </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-350d04f2${_scopeId}> Customer </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-350d04f2${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-350d04f2${_scopeId}> Created </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-350d04f2${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentSalesOrders, (order) => {
              _push2(`<tr class="hover:bg-gray-50" data-v-350d04f2${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-v-350d04f2${_scopeId}><a${ssrRenderAttr("href", unref(route)("admin-cs.sales-orders.show", order.id))} class="text-blue-600 hover:text-blue-800" data-v-350d04f2${_scopeId}>${ssrInterpolate(order.order_number || `SO-${order.id}`)}</a></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-350d04f2${_scopeId}>${ssrInterpolate(order.customer)}</td><td class="px-6 py-4 whitespace-nowrap" data-v-350d04f2${_scopeId}><span class="${ssrRenderClass([getStatusBadge(order), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-350d04f2${_scopeId}>${ssrInterpolate(getStatusLabel(order))}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-v-350d04f2${_scopeId}>${ssrInterpolate(formatDate(order.created_at))}</td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.recentSalesOrders.length === 0) {
              _push2(`<tr data-v-350d04f2${_scopeId}><td colspan="4" class="px-6 py-12 text-center" data-v-350d04f2${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900" data-v-350d04f2${_scopeId}>No sales orders</h3><p class="mt-1 text-sm text-gray-500" data-v-350d04f2${_scopeId}>No recent sales orders yet.</p></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-350d04f2${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-md" data-v-350d04f2${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-350d04f2${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-350d04f2${_scopeId}>Quick Actions</h3><div class="space-y-3" data-v-350d04f2${_scopeId}><a${ssrRenderAttr("href", unref(route)("admin-cs.sales-orders.create"))} class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-350d04f2${_scopeId}><div class="flex-shrink-0" data-v-350d04f2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "h-6 w-6 text-sage-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1 min-w-0" data-v-350d04f2${_scopeId}><span class="absolute inset-0" aria-hidden="true" data-v-350d04f2${_scopeId}></span><p class="text-sm font-medium text-gray-900" data-v-350d04f2${_scopeId}>Create New Sales Order</p><p class="text-sm text-gray-500 truncate" data-v-350d04f2${_scopeId}>Create a new sales order for customers</p></div></a><a${ssrRenderAttr("href", unref(route)("admin-cs.sales-orders.index"))} class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-350d04f2${_scopeId}><div class="flex-shrink-0" data-v-350d04f2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "h-6 w-6 text-blue-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1 min-w-0" data-v-350d04f2${_scopeId}><span class="absolute inset-0" aria-hidden="true" data-v-350d04f2${_scopeId}></span><p class="text-sm font-medium text-gray-900" data-v-350d04f2${_scopeId}>Manage Sales Orders</p><p class="text-sm text-gray-500 truncate" data-v-350d04f2${_scopeId}>View and manage all sales orders</p></div></a></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md" data-v-350d04f2${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-350d04f2${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-350d04f2${_scopeId}>Status Overview</h3><div class="space-y-4" data-v-350d04f2${_scopeId}><div class="flex items-center justify-between" data-v-350d04f2${_scopeId}><div class="flex items-center" data-v-350d04f2${_scopeId}><div class="flex-shrink-0" data-v-350d04f2${_scopeId}><div class="w-2 h-2 bg-yellow-400 rounded-full" data-v-350d04f2${_scopeId}></div></div><span class="ml-3 text-sm font-medium text-gray-900" data-v-350d04f2${_scopeId}>Pending:</span></div><span class="text-sm font-semibold text-yellow-600" data-v-350d04f2${_scopeId}>${ssrInterpolate(__props.statusStats.pending)}</span></div><div class="flex items-center justify-between" data-v-350d04f2${_scopeId}><div class="flex items-center" data-v-350d04f2${_scopeId}><div class="flex-shrink-0" data-v-350d04f2${_scopeId}><div class="w-2 h-2 bg-green-400 rounded-full" data-v-350d04f2${_scopeId}></div></div><span class="ml-3 text-sm font-medium text-gray-900" data-v-350d04f2${_scopeId}>Approved:</span></div><span class="text-sm font-semibold text-green-600" data-v-350d04f2${_scopeId}>${ssrInterpolate(__props.statusStats.approved)}</span></div><div class="flex items-center justify-between" data-v-350d04f2${_scopeId}><div class="flex items-center" data-v-350d04f2${_scopeId}><div class="flex-shrink-0" data-v-350d04f2${_scopeId}><div class="w-2 h-2 bg-red-400 rounded-full" data-v-350d04f2${_scopeId}></div></div><span class="ml-3 text-sm font-medium text-gray-900" data-v-350d04f2${_scopeId}>Rejected:</span></div><span class="text-sm font-semibold text-red-600" data-v-350d04f2${_scopeId}>${ssrInterpolate(__props.statusStats.rejected)}</span></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Customer Service Dashboard" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Customer Service Dashboard"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Manage customer service operations and shipping orders efficiently.")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(FileText), { class: "h-6 w-6 text-blue-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Sales Orders This Month"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.totalSalesOrdersThisMonth), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Clock), { class: "h-6 w-6 text-green-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Orders Today"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.salesOrdersToday), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(AlertTriangle), { class: "h-6 w-6 text-yellow-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Pending Approvals"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.pendingSalesOrders), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Recent Sales Orders"),
                        createVNode("a", {
                          href: unref(route)("admin-cs.sales-orders.index"),
                          class: "text-sm font-medium text-blue-600 hover:text-blue-500"
                        }, " View All → ", 8, ["href"])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Order Number "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Customer "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Status "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Created ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.recentSalesOrders, (order) => {
                              return openBlock(), createBlock("tr", {
                                key: order.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, [
                                  createVNode("a", {
                                    href: unref(route)("admin-cs.sales-orders.show", order.id),
                                    class: "text-blue-600 hover:text-blue-800"
                                  }, toDisplayString(order.order_number || `SO-${order.id}`), 9, ["href"])
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(order.customer), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: [getStatusBadge(order), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                  }, toDisplayString(getStatusLabel(order)), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(formatDate(order.created_at)), 1)
                              ]);
                            }), 128)),
                            __props.recentSalesOrders.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "4",
                                class: "px-6 py-12 text-center"
                              }, [
                                createVNode(unref(FileText), { class: "mx-auto h-12 w-12 text-gray-400" }),
                                createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No sales orders"),
                                createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "No recent sales orders yet.")
                              ])
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                      createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                        createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Quick Actions"),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode("a", {
                            href: unref(route)("admin-cs.sales-orders.create"),
                            class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, [
                            createVNode("div", { class: "flex-shrink-0" }, [
                              createVNode(unref(Plus), { class: "h-6 w-6 text-sage-600" })
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("span", {
                                class: "absolute inset-0",
                                "aria-hidden": "true"
                              }),
                              createVNode("p", { class: "text-sm font-medium text-gray-900" }, "Create New Sales Order"),
                              createVNode("p", { class: "text-sm text-gray-500 truncate" }, "Create a new sales order for customers")
                            ])
                          ], 8, ["href"]),
                          createVNode("a", {
                            href: unref(route)("admin-cs.sales-orders.index"),
                            class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, [
                            createVNode("div", { class: "flex-shrink-0" }, [
                              createVNode(unref(FileText), { class: "h-6 w-6 text-blue-600" })
                            ]),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("span", {
                                class: "absolute inset-0",
                                "aria-hidden": "true"
                              }),
                              createVNode("p", { class: "text-sm font-medium text-gray-900" }, "Manage Sales Orders"),
                              createVNode("p", { class: "text-sm text-gray-500 truncate" }, "View and manage all sales orders")
                            ])
                          ], 8, ["href"])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                      createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                        createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Status Overview"),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("div", { class: "flex-shrink-0" }, [
                                createVNode("div", { class: "w-2 h-2 bg-yellow-400 rounded-full" })
                              ]),
                              createVNode("span", { class: "ml-3 text-sm font-medium text-gray-900" }, "Pending:")
                            ]),
                            createVNode("span", { class: "text-sm font-semibold text-yellow-600" }, toDisplayString(__props.statusStats.pending), 1)
                          ]),
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("div", { class: "flex-shrink-0" }, [
                                createVNode("div", { class: "w-2 h-2 bg-green-400 rounded-full" })
                              ]),
                              createVNode("span", { class: "ml-3 text-sm font-medium text-gray-900" }, "Approved:")
                            ]),
                            createVNode("span", { class: "text-sm font-semibold text-green-600" }, toDisplayString(__props.statusStats.approved), 1)
                          ]),
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("div", { class: "flex-shrink-0" }, [
                                createVNode("div", { class: "w-2 h-2 bg-red-400 rounded-full" })
                              ]),
                              createVNode("span", { class: "ml-3 text-sm font-medium text-gray-900" }, "Rejected:")
                            ]),
                            createVNode("span", { class: "text-sm font-semibold text-red-600" }, toDisplayString(__props.statusStats.rejected), 1)
                          ])
                        ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-350d04f2"]]);
export {
  Dashboard as default
};
