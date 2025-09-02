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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-a9550e2b></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": __props.isMobileSidebarOpen,
        "-translate-x-full": !__props.isMobileSidebarOpen
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col"])}" data-v-a9550e2b><div class="px-6 py-6 border-b border-sage-200 flex-shrink-0" data-v-a9550e2b><div class="flex items-center space-x-3" data-v-a9550e2b><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-a9550e2b><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a9550e2b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-a9550e2b></path></svg></div><div data-v-a9550e2b><h2 class="text-lg font-bold text-sage-700" data-v-a9550e2b>Admin CS</h2><p class="text-xs text-sage-500" data-v-a9550e2b>Customer Service</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto min-h-0" data-v-a9550e2b><a${ssrRenderAttr("href", _ctx.route("admin-cs.dashboard"))} class="${ssrRenderClass([
        isActive("admin-cs.dashboard") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-a9550e2b><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a9550e2b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-a9550e2b></path></svg><span class="font-medium" data-v-a9550e2b>Dashboard</span></a><a${ssrRenderAttr("href", _ctx.route("admin-cs.sales-orders.index"))} class="${ssrRenderClass([
        isActive("admin-cs.sales-orders.*") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-a9550e2b><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a9550e2b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-a9550e2b></path></svg><span class="font-medium" data-v-a9550e2b>Sales Orders</span></a><div class="pt-4 mt-6 border-t border-sage-200" data-v-a9550e2b><div class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2" data-v-a9550e2b> Master Data </div><a${ssrRenderAttr("href", _ctx.route("admin-cs.shipment-types.index"))} class="${ssrRenderClass([
        isActive("admin-cs.shipment-types.*") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-a9550e2b><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a9550e2b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-5H8z" data-v-a9550e2b></path></svg><span class="font-medium" data-v-a9550e2b>Shipment Type</span></a></div><div class="pt-4 mt-6 border-t border-sage-200" data-v-a9550e2b><div class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2" data-v-a9550e2b> Quick Actions </div><a${ssrRenderAttr("href", _ctx.route("admin-cs.sales-orders.create"))} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200" data-v-a9550e2b><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a9550e2b><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-a9550e2b></path></svg><span class="font-medium" data-v-a9550e2b>New Sales Order</span></a></div></nav></aside><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Components/SidebarNavigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarNavigation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a9550e2b"]]);
export {
  SidebarNavigation as default
};
