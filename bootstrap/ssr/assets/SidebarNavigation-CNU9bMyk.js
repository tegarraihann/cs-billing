import { ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { ref, computed, useSSRContext } from "vue";
import { usePage } from "@inertiajs/vue3";
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
    const isWebsiteSettingsOpen = ref(false);
    const page = usePage();
    const isWebsiteSettingsActive = computed(() => {
      var _a;
      const currentRoute = (_a = page.props.ziggy) == null ? void 0 : _a.route;
      if (!currentRoute) return false;
      return currentRoute.includes("website-settings");
    });
    const checkAndOpenDropdown = () => {
      if (isWebsiteSettingsActive.value) {
        isWebsiteSettingsOpen.value = true;
      }
    };
    checkAndOpenDropdown();
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-17b85df2></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": __props.isMobileSidebarOpen,
        "-translate-x-full": !__props.isMobileSidebarOpen
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col"])}" data-v-17b85df2><div class="px-6 py-6 border-b border-sage-200 flex-shrink-0" data-v-17b85df2><div class="flex items-center space-x-3" data-v-17b85df2><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-17b85df2><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17b85df2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-17b85df2></path></svg></div><div data-v-17b85df2><h2 class="text-lg font-bold text-sage-700" data-v-17b85df2>Master Admin</h2><p class="text-xs text-sage-500" data-v-17b85df2>Full System Control</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto min-h-0" data-v-17b85df2><a${ssrRenderAttr("href", _ctx.route("masteradmin.dashboard"))} class="${ssrRenderClass([
        isActive("masteradmin.dashboard") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-17b85df2><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17b85df2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-17b85df2></path></svg><span class="font-medium" data-v-17b85df2>Dashboard</span></a><a${ssrRenderAttr("href", _ctx.route("masteradmin.users.index"))} class="${ssrRenderClass([
        isActive("masteradmin.users.*") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-17b85df2><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17b85df2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-17b85df2></path></svg><span class="font-medium" data-v-17b85df2>User Management</span></a><div class="space-y-1" data-v-17b85df2><button class="${ssrRenderClass([
        isWebsiteSettingsActive.value ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200"
      ])}" data-v-17b85df2><div class="flex items-center space-x-3" data-v-17b85df2><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17b85df2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-17b85df2></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-17b85df2></path></svg><span class="font-medium" data-v-17b85df2>Website Settings</span></div><svg class="${ssrRenderClass([{ "rotate-180": isWebsiteSettingsOpen.value }, "w-4 h-4 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17b85df2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-17b85df2></path></svg></button><div class="${ssrRenderClass([
        isWebsiteSettingsOpen.value ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        "ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out"
      ])}" data-v-17b85df2><a${ssrRenderAttr("href", _ctx.route("masteradmin.website-settings.pengaturan-umum.index"))} class="${ssrRenderClass([
        isActive("masteradmin.website-settings.pengaturan-umum.*") ? "bg-sage-100 text-sage-800 shadow-sm border-l-4 border-sage-600" : "text-sage-600 hover:bg-sage-50 hover:text-sage-800 pl-4",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-17b85df2><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17b85df2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" data-v-17b85df2></path></svg><span class="font-medium text-sm" data-v-17b85df2>Pengaturan Umum</span></a><a${ssrRenderAttr("href", _ctx.route("masteradmin.website-settings.services.index"))} class="${ssrRenderClass([
        isActive("masteradmin.website-settings.services.*") ? "bg-sage-100 text-sage-800 shadow-sm border-l-4 border-sage-600" : "text-sage-600 hover:bg-sage-50 hover:text-sage-800 pl-4",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-17b85df2><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17b85df2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-17b85df2></path></svg><span class="font-medium text-sm" data-v-17b85df2>Services</span></a><a${ssrRenderAttr("href", _ctx.route("masteradmin.website-settings.support-services.index"))} class="${ssrRenderClass([
        isActive("masteradmin.website-settings.support-services.*") ? "bg-sage-100 text-sage-800 shadow-sm border-l-4 border-sage-600" : "text-sage-600 hover:bg-sage-50 hover:text-sage-800 pl-4",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-17b85df2><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17b85df2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" data-v-17b85df2></path></svg><span class="font-medium text-sm" data-v-17b85df2>Support Services</span></a><a${ssrRenderAttr("href", _ctx.route("masteradmin.website-settings.team.index"))} class="${ssrRenderClass([
        isActive("masteradmin.website-settings.team.*") ? "bg-sage-100 text-sage-800 shadow-sm border-l-4 border-sage-600" : "text-sage-600 hover:bg-sage-50 hover:text-sage-800 pl-4",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-17b85df2><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17b85df2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-17b85df2></path></svg><span class="font-medium text-sm" data-v-17b85df2>Team</span></a></div></div><div class="pt-4 mt-6 border-t border-sage-200" data-v-17b85df2><div class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2" data-v-17b85df2> Quick Actions </div><a${ssrRenderAttr("href", _ctx.route("home"))} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200" target="_blank" data-v-17b85df2><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-17b85df2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-17b85df2></path></svg><span class="font-medium" data-v-17b85df2>View Website</span></a></div></nav></aside><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Components/SidebarNavigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarNavigation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-17b85df2"]]);
export {
  SidebarNavigation as default
};
