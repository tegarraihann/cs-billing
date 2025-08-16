import { ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { useSSRContext } from "vue";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "SidebarNavigation",
  __ssrInlineRender: true,
  props: {
    isMobileSidebarOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["closeMobileSidebar"],
  setup(__props, { emit: __emit }) {
    const page = usePage();
    const isActive = (routePattern) => {
      var _a;
      const currentRoute = (_a = page.props.ziggy) == null ? void 0 : _a.route;
      if (!currentRoute) return false;
      if (routePattern.includes("*")) {
        const basePattern = routePattern.replace("*", "");
        return currentRoute.startsWith(basePattern);
      }
      return currentRoute === routePattern;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (__props.isMobileSidebarOpen) {
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-de33de9d></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": __props.isMobileSidebarOpen,
        "-translate-x-full": !__props.isMobileSidebarOpen
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"])}" data-v-de33de9d><div class="px-6 py-6 border-b border-sage-200" data-v-de33de9d><div class="flex items-center space-x-3" data-v-de33de9d><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-de33de9d><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-de33de9d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-de33de9d></path></svg></div><div data-v-de33de9d><h2 class="text-lg font-bold text-sage-700" data-v-de33de9d>Admin Keuangan</h2><p class="text-xs text-sage-500" data-v-de33de9d>Finance Admin</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto" data-v-de33de9d><a${ssrRenderAttr("href", _ctx.route("admin-keuangan.dashboard"))} class="${ssrRenderClass([
        isActive("admin-keuangan.dashboard") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-de33de9d><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-de33de9d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-de33de9d></path></svg><span class="font-medium" data-v-de33de9d>Dashboard</span></a><a${ssrRenderAttr("href", _ctx.route("admin-keuangan.sales-orders.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.sales-orders.*") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-de33de9d><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-de33de9d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-de33de9d></path></svg><span class="font-medium" data-v-de33de9d>Sales Orders</span></a><a href="#" class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-sage-700 hover:bg-sage-50 hover:text-sage-800" data-v-de33de9d><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-de33de9d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-de33de9d></path></svg><span class="font-medium" data-v-de33de9d>Financial Reports</span></a><a href="#" class="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 text-sage-700 hover:bg-sage-50 hover:text-sage-800" data-v-de33de9d><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-de33de9d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-de33de9d></path></svg><span class="font-medium" data-v-de33de9d>Budget Management</span></a><div class="pt-4 mt-6 border-t border-sage-200" data-v-de33de9d><div class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2" data-v-de33de9d> Quick Actions </div><a${ssrRenderAttr("href", _ctx.route("admin-keuangan.sales-orders.index"))} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200" data-v-de33de9d><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-de33de9d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2z" data-v-de33de9d></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM9 17a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" data-v-de33de9d></path></svg><span class="font-medium" data-v-de33de9d>Pending Reviews</span></a><a href="#" class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200" data-v-de33de9d><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-de33de9d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-de33de9d></path></svg><span class="font-medium" data-v-de33de9d>Generate Report</span></a></div></nav></aside><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Components/SidebarNavigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarNavigation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-de33de9d"]]);
export {
  SidebarNavigation as default
};
