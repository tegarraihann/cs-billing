import { ref, onMounted, onUnmounted, mergeProps, withCtx, unref, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import SidebarNavigation from "./SidebarNavigation-Bpp5XwQ-.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
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
    const isMobileSidebarOpen = ref(false);
    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false;
    };
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    const formatCurrency = (amount) => {
      if (!amount) return "Rp 0";
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
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
    const getStatusClass = (order) => {
      if (order.rejected_at) return "bg-red-100 text-red-800";
      if (order.approved_at) return "bg-green-100 text-green-800";
      return "bg-yellow-100 text-yellow-800";
    };
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
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        isMobileSidebarOpen.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-ad8d52b6><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-ad8d52b6><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-ad8d52b6><div class="flex justify-between items-center h-16" data-v-ad8d52b6><div class="lg:hidden" data-v-ad8d52b6><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors" data-v-ad8d52b6><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ad8d52b6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-ad8d52b6></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-ad8d52b6><h1 class="text-lg sm:text-xl font-semibold text-sage-800" data-v-ad8d52b6> Dashboard </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-ad8d52b6>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-ad8d52b6${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-ad8d52b6${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-ad8d52b6${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-ad8d52b6${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-ad8d52b6${_scopeId}>${ssrInterpolate((_b = _ctx.$page.props.auth.user) == null ? void 0 : _b.name)}</p><p class="text-xs text-sage-500" data-v-ad8d52b6${_scopeId}>Admin Customer Service</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ad8d52b6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-ad8d52b6${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c = _ctx.$page.props.auth.user) == null ? void 0 : _c.name)), 1)
                ]),
                createVNode("div", { class: "hidden sm:block text-left" }, [
                  createVNode("p", { class: "text-sm font-medium text-sage-700" }, toDisplayString((_d = _ctx.$page.props.auth.user) == null ? void 0 : _d.name), 1),
                  createVNode("p", { class: "text-xs text-sage-500" }, "Admin Customer Service")
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
            _push2(`<div class="py-1" data-v-ad8d52b6${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: unref(route)("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ad8d52b6${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-ad8d52b6${_scopeId2}></path></svg><span data-v-ad8d52b6${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-ad8d52b6${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: unref(route)("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ad8d52b6${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-ad8d52b6${_scopeId2}></path></svg><span data-v-ad8d52b6${_scopeId2}>Log Out</span>`);
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
                  href: unref(route)("profile.edit"),
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
                  href: unref(route)("logout"),
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-ad8d52b6></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-ad8d52b6><div class="p-4 sm:p-6 lg:p-8" data-v-ad8d52b6><div class="bg-gradient-to-r from-sage-600 to-sage-700 rounded-xl shadow-lg p-6 mb-8 text-white" data-v-ad8d52b6><h2 class="text-2xl font-bold mb-2" data-v-ad8d52b6> Welcome back, ${ssrInterpolate((_a = _ctx.$page.props.auth.user) == null ? void 0 : _a.name)}! </h2><p class="text-sage-100" data-v-ad8d52b6> Manage customer service operations and support tickets efficiently. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-v-ad8d52b6><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ad8d52b6><div class="flex items-center" data-v-ad8d52b6><div class="p-3 rounded-lg bg-blue-100" data-v-ad8d52b6><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ad8d52b6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-ad8d52b6></path></svg></div><div class="ml-4" data-v-ad8d52b6><p class="text-sm font-medium text-gray-600" data-v-ad8d52b6>Sales Orders This Month</p><p class="text-2xl font-semibold text-gray-900" data-v-ad8d52b6>${ssrInterpolate(__props.stats.totalSalesOrdersThisMonth)}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ad8d52b6><div class="flex items-center" data-v-ad8d52b6><div class="p-3 rounded-lg bg-green-100" data-v-ad8d52b6><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ad8d52b6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ad8d52b6></path></svg></div><div class="ml-4" data-v-ad8d52b6><p class="text-sm font-medium text-gray-600" data-v-ad8d52b6>Orders Today</p><p class="text-2xl font-semibold text-gray-900" data-v-ad8d52b6>${ssrInterpolate(__props.stats.salesOrdersToday)}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ad8d52b6><div class="flex items-center" data-v-ad8d52b6><div class="p-3 rounded-lg bg-yellow-100" data-v-ad8d52b6><svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ad8d52b6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-ad8d52b6></path></svg></div><div class="ml-4" data-v-ad8d52b6><p class="text-sm font-medium text-gray-600" data-v-ad8d52b6>Pending Approvals</p><p class="text-2xl font-semibold text-gray-900" data-v-ad8d52b6>${ssrInterpolate(__props.stats.pendingSalesOrders)}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ad8d52b6><div class="flex items-center" data-v-ad8d52b6><div class="p-3 rounded-lg bg-sage-100" data-v-ad8d52b6><svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ad8d52b6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ad8d52b6></path></svg></div><div class="ml-4" data-v-ad8d52b6><p class="text-sm font-medium text-gray-600" data-v-ad8d52b6>Revenue This Month</p><p class="text-2xl font-semibold text-gray-900" data-v-ad8d52b6>${ssrInterpolate(formatCurrency(__props.stats.revenueThisMonth))}</p></div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-sage-200" data-v-ad8d52b6><div class="flex items-center justify-between mb-4" data-v-ad8d52b6><h3 class="text-xl font-bold text-sage-800" data-v-ad8d52b6> Recent Sales Orders </h3><a${ssrRenderAttr("href", unref(route)("admin-cs.sales-orders.index"))} class="text-sm font-medium text-sage-600 hover:text-sage-800 transition-colors" data-v-ad8d52b6> View All → </a></div><div class="overflow-x-auto" data-v-ad8d52b6><table class="w-full" data-v-ad8d52b6><thead data-v-ad8d52b6><tr class="border-b border-sage-200" data-v-ad8d52b6><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-ad8d52b6> Order Number </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-ad8d52b6> Customer </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-ad8d52b6> Total Selling </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-ad8d52b6> Status </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-ad8d52b6> Created </th></tr></thead><tbody data-v-ad8d52b6><!--[-->`);
      ssrRenderList(__props.recentSalesOrders, (order) => {
        _push(`<tr class="border-b border-gray-100 hover:bg-sage-50 transition-colors" data-v-ad8d52b6><td class="py-3 px-4 text-sage-600 font-medium" data-v-ad8d52b6><a${ssrRenderAttr("href", unref(route)("admin-cs.sales-orders.show", order.id))} class="hover:text-sage-800 transition-colors" data-v-ad8d52b6>${ssrInterpolate(order.order_number || `SO-${order.id}`)}</a></td><td class="py-3 px-4" data-v-ad8d52b6>${ssrInterpolate(order.customer)}</td><td class="py-3 px-4 font-medium" data-v-ad8d52b6>${ssrInterpolate(order.total_selling ? formatCurrency(order.total_selling) : "-")}</td><td class="py-3 px-4" data-v-ad8d52b6><span class="${ssrRenderClass([getStatusClass(order), "px-2 py-1 text-xs font-medium rounded-full"])}" data-v-ad8d52b6>${ssrInterpolate(getStatusLabel(order))}</span></td><td class="py-3 px-4 text-sm text-gray-600" data-v-ad8d52b6>${ssrInterpolate(formatDate(order.created_at))}</td></tr>`);
      });
      _push(`<!--]-->`);
      if (__props.recentSalesOrders.length === 0) {
        _push(`<tr data-v-ad8d52b6><td colspan="5" class="py-8 px-4 text-center text-gray-500" data-v-ad8d52b6> No sales orders found </td></tr>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</tbody></table></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-ad8d52b6><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ad8d52b6><div class="flex items-center mb-4" data-v-ad8d52b6><div class="p-3 rounded-lg bg-blue-100" data-v-ad8d52b6><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ad8d52b6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-ad8d52b6></path></svg></div><h4 class="text-lg font-semibold text-sage-800 ml-3" data-v-ad8d52b6> Create New Sales Order </h4></div><p class="text-sm text-gray-600 mb-4" data-v-ad8d52b6> Create a new sales order for customers </p><a${ssrRenderAttr("href", unref(route)("admin-cs.sales-orders.create"))} class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" data-v-ad8d52b6> Create Order </a></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ad8d52b6><div class="flex items-center mb-4" data-v-ad8d52b6><div class="p-3 rounded-lg bg-sage-100" data-v-ad8d52b6><svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ad8d52b6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" data-v-ad8d52b6></path></svg></div><h4 class="text-lg font-semibold text-sage-800 ml-3" data-v-ad8d52b6> Manage Sales Orders </h4></div><p class="text-sm text-gray-600 mb-4" data-v-ad8d52b6> View and manage all sales orders </p><a${ssrRenderAttr("href", unref(route)("admin-cs.sales-orders.index"))} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2" data-v-ad8d52b6> View Orders </a></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ad8d52b6><div class="flex items-center mb-4" data-v-ad8d52b6><div class="p-3 rounded-lg bg-green-100" data-v-ad8d52b6><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ad8d52b6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-ad8d52b6></path></svg></div><h4 class="text-lg font-semibold text-sage-800 ml-3" data-v-ad8d52b6> Status Overview </h4></div><div class="space-y-3" data-v-ad8d52b6><div class="flex justify-between items-center" data-v-ad8d52b6><span class="text-sm text-gray-600" data-v-ad8d52b6>Pending:</span><span class="text-sm font-medium text-yellow-600" data-v-ad8d52b6>${ssrInterpolate(__props.statusStats.pending)}</span></div><div class="flex justify-between items-center" data-v-ad8d52b6><span class="text-sm text-gray-600" data-v-ad8d52b6>Approved:</span><span class="text-sm font-medium text-green-600" data-v-ad8d52b6>${ssrInterpolate(__props.statusStats.approved)}</span></div><div class="flex justify-between items-center" data-v-ad8d52b6><span class="text-sm text-gray-600" data-v-ad8d52b6>Rejected:</span><span class="text-sm font-medium text-red-600" data-v-ad8d52b6>${ssrInterpolate(__props.statusStats.rejected)}</span></div></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ad8d52b6"]]);
export {
  Dashboard as default
};
