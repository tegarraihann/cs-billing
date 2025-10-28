import { ref, onMounted, onUnmounted, mergeProps, unref, withCtx, createVNode, toDisplayString, useSSRContext, createBlock, createCommentVNode, openBlock, Fragment, renderList } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$2, a as _sfc_main$3 } from "./DropdownLink-DlebuOGD.js";
import SidebarNavigation from "./SidebarNavigation-v1m7YKEO.js";
import { Menu, UserRound, LogOut, ChevronDown, FileText, Clock, AlertTriangle, DollarSign, Plus } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import { Head } from "@inertiajs/vue3";
const _sfc_main$1 = {
  __name: "AdminCSLayout",
  __ssrInlineRender: true,
  setup(__props) {
    const route = window.route || function(name, params) {
      const routes = {
        "admin-cs.dashboard": "/admin-cs/dashboard",
        "admin-cs.sales-orders.index": "/admin-cs/sales-orders",
        "admin-cs.sales-orders.create": "/admin-cs/sales-orders/create",
        "admin-cs.sales-orders.show": "/admin-cs/sales-orders",
        "admin-cs.sales-orders.edit": "/admin-cs/sales-orders",
        "profile.edit": "/profile",
        "logout": "/logout"
      };
      return routes[name] || "#";
    };
    const isMobileSidebarOpen = ref(false);
    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false;
    };
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-891dd7a8><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-891dd7a8><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-891dd7a8><div class="flex justify-between items-center h-16" data-v-891dd7a8><div class="lg:hidden" data-v-891dd7a8><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-891dd7a8>`);
      _push(ssrRenderComponent(unref(Menu), { class: "w-6 h-6" }, null, _parent));
      _push(`</button></div><div class="flex-1 lg:flex-none" data-v-891dd7a8><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-891dd7a8> Customer Service Dashboard </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-891dd7a8>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-891dd7a8${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-891dd7a8${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-891dd7a8${_scopeId}>${ssrInterpolate(getInitials((_a = _ctx.$page.props.auth.user) == null ? void 0 : _a.name))}</span></div><div class="hidden sm:block text-left text-sage-700" data-v-891dd7a8${_scopeId}><p class="text-sm font-medium" data-v-891dd7a8${_scopeId}>${ssrInterpolate((_b = _ctx.$page.props.auth.user) == null ? void 0 : _b.name)}</p><p class="text-xs text-sage-500" data-v-891dd7a8${_scopeId}>Customer Service</p></div>`);
            _push2(ssrRenderComponent(unref(ChevronDown), { class: "w-4 h-4 text-sage-600 hidden sm:block" }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c = _ctx.$page.props.auth.user) == null ? void 0 : _c.name)), 1)
                ]),
                createVNode("div", { class: "hidden sm:block text-left text-sage-700" }, [
                  createVNode("p", { class: "text-sm font-medium" }, toDisplayString((_d = _ctx.$page.props.auth.user) == null ? void 0 : _d.name), 1),
                  createVNode("p", { class: "text-xs text-sage-500" }, "Customer Service")
                ]),
                createVNode(unref(ChevronDown), { class: "w-4 h-4 text-sage-600 hidden sm:block" })
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-1" data-v-891dd7a8${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              href: unref(route)("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(UserRound), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  _push3(`<span data-v-891dd7a8${_scopeId2}>Profile</span>`);
                } else {
                  return [
                    createVNode(unref(UserRound), { class: "w-4 h-4" }),
                    createVNode("span", null, "Profile")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="border-t border-gray-100 my-1" data-v-891dd7a8${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$3, {
              href: unref(route)("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(LogOut), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  _push3(`<span data-v-891dd7a8${_scopeId2}>Log Out</span>`);
                } else {
                  return [
                    createVNode(unref(LogOut), { class: "w-4 h-4" }),
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
                createVNode(_sfc_main$3, {
                  href: unref(route)("profile.edit"),
                  class: "flex items-center space-x-2 px-4 py-2"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(UserRound), { class: "w-4 h-4" }),
                    createVNode("span", null, "Profile")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("div", { class: "border-t border-gray-100 my-1" }),
                createVNode(_sfc_main$3, {
                  href: unref(route)("logout"),
                  method: "post",
                  as: "button",
                  class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(LogOut), { class: "w-4 h-4" }),
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
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-891dd7a8>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Layouts/AdminCSLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const AdminCSLayout = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-891dd7a8"]]);
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
            _push2(ssrRenderComponent(unref(Head), { title: "Dashboard CS" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6" data-v-52579fd3${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-52579fd3${_scopeId}><div class="flex justify-between items-center mb-6" data-v-52579fd3${_scopeId}><div data-v-52579fd3${_scopeId}><h1 class="text-2xl font-bold text-gray-900" data-v-52579fd3${_scopeId}>Dashboard Customer Service</h1><p class="mt-1 text-sm text-gray-600" data-v-52579fd3${_scopeId}>Kelola operasi customer service dan shipping orders secara efisien</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" data-v-52579fd3${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg" data-v-52579fd3${_scopeId}><div class="p-5" data-v-52579fd3${_scopeId}><div class="flex items-center" data-v-52579fd3${_scopeId}><div class="flex-shrink-0" data-v-52579fd3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-52579fd3${_scopeId}><dl data-v-52579fd3${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-52579fd3${_scopeId}>Sales Orders This Month</dt><dd class="text-lg font-medium text-gray-900" data-v-52579fd3${_scopeId}>${ssrInterpolate(__props.stats.totalSalesOrdersThisMonth)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-52579fd3${_scopeId}><div class="p-5" data-v-52579fd3${_scopeId}><div class="flex items-center" data-v-52579fd3${_scopeId}><div class="flex-shrink-0" data-v-52579fd3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Clock), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-52579fd3${_scopeId}><dl data-v-52579fd3${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-52579fd3${_scopeId}>Orders Today</dt><dd class="text-lg font-medium text-gray-900" data-v-52579fd3${_scopeId}>${ssrInterpolate(__props.stats.salesOrdersToday)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-52579fd3${_scopeId}><div class="p-5" data-v-52579fd3${_scopeId}><div class="flex items-center" data-v-52579fd3${_scopeId}><div class="flex-shrink-0" data-v-52579fd3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-6 w-6 text-yellow-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-52579fd3${_scopeId}><dl data-v-52579fd3${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-52579fd3${_scopeId}>Pending Approvals</dt><dd class="text-lg font-medium text-gray-900" data-v-52579fd3${_scopeId}>${ssrInterpolate(__props.stats.pendingSalesOrders)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-52579fd3${_scopeId}><div class="p-5" data-v-52579fd3${_scopeId}><div class="flex items-center" data-v-52579fd3${_scopeId}><div class="flex-shrink-0" data-v-52579fd3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), { class: "h-6 w-6 text-purple-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-52579fd3${_scopeId}><dl data-v-52579fd3${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-52579fd3${_scopeId}>Revenue This Month</dt><dd class="text-lg font-medium text-gray-900" data-v-52579fd3${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.revenueThisMonth))}</dd></dl></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-52579fd3${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-52579fd3${_scopeId}><div class="flex items-center justify-between mb-4" data-v-52579fd3${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900" data-v-52579fd3${_scopeId}>Recent Sales Orders</h3><a${ssrRenderAttr("href", unref(route)("admin-cs.sales-orders.index"))} class="text-sm font-medium text-blue-600 hover:text-blue-500" data-v-52579fd3${_scopeId}> View All → </a></div><div class="overflow-x-auto" data-v-52579fd3${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-52579fd3${_scopeId}><thead class="bg-gray-50" data-v-52579fd3${_scopeId}><tr data-v-52579fd3${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-52579fd3${_scopeId}> Order Number </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-52579fd3${_scopeId}> Customer </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-52579fd3${_scopeId}> Total Selling </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-52579fd3${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-52579fd3${_scopeId}> Created </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-52579fd3${_scopeId}><!--[-->`);
            ssrRenderList(__props.recentSalesOrders, (order) => {
              _push2(`<tr class="hover:bg-gray-50" data-v-52579fd3${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-v-52579fd3${_scopeId}><a${ssrRenderAttr("href", unref(route)("admin-cs.sales-orders.show", order.id))} class="text-blue-600 hover:text-blue-800" data-v-52579fd3${_scopeId}>${ssrInterpolate(order.order_number || `SO-${order.id}`)}</a></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-52579fd3${_scopeId}>${ssrInterpolate(order.customer)}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-v-52579fd3${_scopeId}>${ssrInterpolate(order.total_selling ? formatCurrency(order.total_selling) : "-")}</td><td class="px-6 py-4 whitespace-nowrap" data-v-52579fd3${_scopeId}><span class="${ssrRenderClass([getStatusBadge(order), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-52579fd3${_scopeId}>${ssrInterpolate(getStatusLabel(order))}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-v-52579fd3${_scopeId}>${ssrInterpolate(formatDate(order.created_at))}</td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.recentSalesOrders.length === 0) {
              _push2(`<tr data-v-52579fd3${_scopeId}><td colspan="5" class="px-6 py-12 text-center" data-v-52579fd3${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900" data-v-52579fd3${_scopeId}>No sales orders</h3><p class="mt-1 text-sm text-gray-500" data-v-52579fd3${_scopeId}>Belum ada sales orders terbaru</p></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-52579fd3${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-md" data-v-52579fd3${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-52579fd3${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-52579fd3${_scopeId}>Quick Actions</h3><div class="space-y-3" data-v-52579fd3${_scopeId}><a${ssrRenderAttr("href", unref(route)("admin-cs.sales-orders.create"))} class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-52579fd3${_scopeId}><div class="flex-shrink-0" data-v-52579fd3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "h-6 w-6 text-sage-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1 min-w-0" data-v-52579fd3${_scopeId}><span class="absolute inset-0" aria-hidden="true" data-v-52579fd3${_scopeId}></span><p class="text-sm font-medium text-gray-900" data-v-52579fd3${_scopeId}>Create New Sales Order</p><p class="text-sm text-gray-500 truncate" data-v-52579fd3${_scopeId}>Create a new sales order for customers</p></div></a><a${ssrRenderAttr("href", unref(route)("admin-cs.sales-orders.index"))} class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-52579fd3${_scopeId}><div class="flex-shrink-0" data-v-52579fd3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "h-6 w-6 text-blue-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1 min-w-0" data-v-52579fd3${_scopeId}><span class="absolute inset-0" aria-hidden="true" data-v-52579fd3${_scopeId}></span><p class="text-sm font-medium text-gray-900" data-v-52579fd3${_scopeId}>Manage Sales Orders</p><p class="text-sm text-gray-500 truncate" data-v-52579fd3${_scopeId}>View and manage all sales orders</p></div></a></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md" data-v-52579fd3${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-52579fd3${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-52579fd3${_scopeId}>Status Overview</h3><div class="space-y-4" data-v-52579fd3${_scopeId}><div class="flex items-center justify-between" data-v-52579fd3${_scopeId}><div class="flex items-center" data-v-52579fd3${_scopeId}><div class="flex-shrink-0" data-v-52579fd3${_scopeId}><div class="w-2 h-2 bg-yellow-400 rounded-full" data-v-52579fd3${_scopeId}></div></div><span class="ml-3 text-sm font-medium text-gray-900" data-v-52579fd3${_scopeId}>Pending:</span></div><span class="text-sm font-semibold text-yellow-600" data-v-52579fd3${_scopeId}>${ssrInterpolate(__props.statusStats.pending)}</span></div><div class="flex items-center justify-between" data-v-52579fd3${_scopeId}><div class="flex items-center" data-v-52579fd3${_scopeId}><div class="flex-shrink-0" data-v-52579fd3${_scopeId}><div class="w-2 h-2 bg-green-400 rounded-full" data-v-52579fd3${_scopeId}></div></div><span class="ml-3 text-sm font-medium text-gray-900" data-v-52579fd3${_scopeId}>Approved:</span></div><span class="text-sm font-semibold text-green-600" data-v-52579fd3${_scopeId}>${ssrInterpolate(__props.statusStats.approved)}</span></div><div class="flex items-center justify-between" data-v-52579fd3${_scopeId}><div class="flex items-center" data-v-52579fd3${_scopeId}><div class="flex-shrink-0" data-v-52579fd3${_scopeId}><div class="w-2 h-2 bg-red-400 rounded-full" data-v-52579fd3${_scopeId}></div></div><span class="ml-3 text-sm font-medium text-gray-900" data-v-52579fd3${_scopeId}>Rejected:</span></div><span class="text-sm font-semibold text-red-600" data-v-52579fd3${_scopeId}>${ssrInterpolate(__props.statusStats.rejected)}</span></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Dashboard CS" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Dashboard Customer Service"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Kelola operasi customer service dan shipping orders secara efisien")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
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
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(DollarSign), { class: "h-6 w-6 text-purple-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Revenue This Month"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.stats.revenueThisMonth)), 1)
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
                              }, " Total Selling "),
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
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, toDisplayString(order.total_selling ? formatCurrency(order.total_selling) : "-"), 1),
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
                                colspan: "5",
                                class: "px-6 py-12 text-center"
                              }, [
                                createVNode(unref(FileText), { class: "mx-auto h-12 w-12 text-gray-400" }),
                                createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No sales orders"),
                                createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Belum ada sales orders terbaru")
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
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-52579fd3"]]);
export {
  Dashboard as default
};
