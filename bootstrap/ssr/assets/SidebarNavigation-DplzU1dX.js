import { unref, useSSRContext } from "vue";
import { ssrRenderClass, ssrRenderComponent, ssrRenderAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { Users, LayoutDashboard, FileText, CirclePlus } from "lucide-vue-next";
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-90324b55></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": __props.isMobileSidebarOpen,
        "-translate-x-full": !__props.isMobileSidebarOpen
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col"])}" data-v-90324b55><div class="px-6 py-6 border-b border-sage-200 flex-shrink-0" data-v-90324b55><div class="flex items-center space-x-3" data-v-90324b55><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-90324b55>`);
      _push(ssrRenderComponent(unref(Users), { class: "w-6 h-6 text-white" }, null, _parent));
      _push(`</div><div data-v-90324b55><h2 class="text-lg font-bold text-sage-700" data-v-90324b55>Admin CS</h2><p class="text-xs text-sage-500" data-v-90324b55>Customer Service</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto min-h-0" data-v-90324b55><a${ssrRenderAttr("href", _ctx.route("admin-cs.dashboard"))} class="${ssrRenderClass([
        isActive("admin-cs.dashboard") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-90324b55>`);
      _push(ssrRenderComponent(unref(LayoutDashboard), { class: "w-5 h-5" }, null, _parent));
      _push(`<span class="font-medium" data-v-90324b55>DASHBOARD</span></a><a${ssrRenderAttr("href", _ctx.route("admin-cs.sales-orders.index"))} class="${ssrRenderClass([
        isActive("admin-cs.sales-orders.*") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-90324b55>`);
      _push(ssrRenderComponent(unref(FileText), { class: "w-5 h-5" }, null, _parent));
      _push(`<span class="font-medium" data-v-90324b55>SHIPPING ORDER</span></a><div class="pt-4 mt-6 border-t border-sage-200" data-v-90324b55><div class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2" data-v-90324b55> QUICK ACTIONS </div><a${ssrRenderAttr("href", _ctx.route("admin-cs.sales-orders.create"))} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200" data-v-90324b55>`);
      _push(ssrRenderComponent(unref(CirclePlus), { class: "w-5 h-5" }, null, _parent));
      _push(`<span class="font-medium" data-v-90324b55>NEW SHIPPING ORDER</span></a></div></nav></aside><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Components/SidebarNavigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarNavigation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-90324b55"]]);
export {
  SidebarNavigation as default
};
