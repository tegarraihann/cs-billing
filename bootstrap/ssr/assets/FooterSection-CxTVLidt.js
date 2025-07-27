import { computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
const _sfc_main = {
  __name: "FooterSection",
  __ssrInlineRender: true,
  setup(__props) {
    const currentYear = computed(() => (/* @__PURE__ */ new Date()).getFullYear());
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "lg:ml-64 bg-sage-800 text-white relative overflow-hidden" }, _attrs))}><div class="absolute inset-0 opacity-5"><svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="footerGrid" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1.5" fill="currentColor"></circle></pattern></defs><rect width="100%" height="100%" fill="url(#footerGrid)"></rect></svg></div><div class="relative z-10 container mx-auto px-6 py-16"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"><div class="space-y-6"><div class="flex items-center space-x-3"><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center"><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div><span class="text-xl font-bold">Master Admin</span></div><p class="text-sage-300 leading-relaxed"> Empowering businesses with intelligent admin solutions. Streamline your operations and focus on what matters most. </p></div><div class="space-y-6"><h3 class="text-lg font-semibold text-white">Quick Links</h3><ul class="space-y-3"><li><a href="/dashboard" class="text-sage-300 hover:text-white transition-colors duration-300">Dashboard</a></li><li><a href="/users" class="text-sage-300 hover:text-white transition-colors duration-300">User Management</a></li><li><a href="/analytics" class="text-sage-300 hover:text-white transition-colors duration-300">Analytics</a></li></ul></div><div class="space-y-6"><h3 class="text-lg font-semibold text-white">Support</h3><ul class="space-y-3"><li><a href="/help" class="text-sage-300 hover:text-white transition-colors duration-300">Help Center</a></li><li><a href="/contact" class="text-sage-300 hover:text-white transition-colors duration-300">Contact Us</a></li></ul></div><div class="space-y-6"><h3 class="text-lg font-semibold text-white">Contact Info</h3><div class="space-y-4"><p class="text-sage-300 text-sm"> Jakarta, Indonesia </p><p class="text-sage-300 text-sm">support@masteradmin.com</p></div></div></div><div class="border-t border-sage-700 pt-8"><div class="text-center"><span class="text-sage-300">© ${ssrInterpolate(currentYear.value)} Master Admin. All rights reserved.</span></div></div></div></footer>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/masteradmin/FooterSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
