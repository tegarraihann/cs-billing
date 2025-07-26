import { ref, computed, mergeProps, useSSRContext, onMounted, onUnmounted } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$8 = {
  __name: "Logo",
  __ssrInlineRender: true,
  props: {
    size: {
      type: String,
      default: "medium",
      // small, medium, large, xl
      validator: (value) => ["small", "medium", "large", "xl"].includes(value)
    },
    variant: {
      type: String,
      default: "default",
      // default, white, icon-only
      validator: (value) => ["default", "white", "icon-only"].includes(value)
    },
    showText: {
      type: Boolean,
      default: true
    },
    showTagline: {
      type: Boolean,
      default: true
    },
    companyName: {
      type: String,
      default: "Eshaka Wijaya Logistics"
    },
    tagline: {
      type: String,
      default: "International Freight Forwarder"
    }
  },
  setup(__props) {
    const props = __props;
    const imageError = ref(false);
    const logoSrc = computed(() => {
      if (imageError.value) {
        return null;
      }
      if (props.variant === "icon-only") {
        return "/images/logo/eshaka-wijaya-icon.png";
      } else if (props.variant === "white") {
        return "/images/logo/eshaka-wijaya-logo-white.png";
      } else {
        return "/images/logo/eshaka-wijaya-logo.png";
      }
    });
    const altText = computed(() => {
      return `${props.companyName} Logo`;
    });
    const sizeConfig = computed(() => {
      switch (props.size) {
        case "small":
          return {
            logo: "h-8 w-auto",
            container: "space-x-2",
            textContainer: "flex flex-col",
            primaryText: "text-sm font-bold",
            tagline: "text-xs font-medium"
          };
        case "large":
          return {
            logo: "h-16 w-auto",
            container: "space-x-4",
            textContainer: "flex flex-col",
            primaryText: "text-2xl font-bold",
            tagline: "text-sm font-medium"
          };
        case "xl":
          return {
            logo: "h-20 w-auto",
            container: "space-x-4",
            textContainer: "flex flex-col",
            primaryText: "text-3xl font-bold",
            tagline: "text-base font-medium"
          };
        default:
          return {
            logo: "h-12 w-auto",
            container: "space-x-3",
            textContainer: "flex flex-col",
            primaryText: "text-xl font-bold",
            tagline: "text-sm font-medium"
          };
      }
    });
    const containerClass = computed(() => sizeConfig.value.container);
    const logoClass = computed(() => sizeConfig.value.logo);
    computed(() => sizeConfig.value.textContainer);
    computed(() => {
      const baseClass = sizeConfig.value.primaryText;
      const colorClass = props.variant === "white" ? "text-white" : "text-gray-800";
      return `${baseClass} ${colorClass}`;
    });
    computed(() => {
      const baseClass = sizeConfig.value.tagline;
      const colorClass = props.variant === "white" ? "text-gray-200" : "text-gray-600";
      return `${baseClass} ${colorClass}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex items-center", containerClass.value]
      }, _attrs))}><img${ssrRenderAttr("src", logoSrc.value)}${ssrRenderAttr("alt", altText.value)} class="${ssrRenderClass([logoClass.value, "object-contain"])}"></div>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Logo.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = {
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenuOpen = ref(false);
    const activeSection = ref("#home");
    const navigation = [
      { name: "Beranda", href: "#home" },
      { name: "Layanan", href: "#services" },
      { name: "Tentang", href: "#about" },
      { name: "Kontak", href: "#contact" }
    ];
    const handleScroll = () => {
      const sections = ["#home", "#services", "#about", "#contact"];
      const scrollPosition = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.querySelector(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          activeSection.value = sections[i];
          break;
        }
      }
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300" }, _attrs))} data-v-82fee1df><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-82fee1df><div class="flex justify-between items-center h-20" data-v-82fee1df><div class="flex items-center cursor-pointer hover:scale-105 transition-transform duration-300" data-v-82fee1df>`);
      _push(ssrRenderComponent(_sfc_main$8, {
        size: "medium",
        variant: "default",
        "show-tagline": false
      }, null, _parent));
      _push(`</div><div class="hidden md:block" data-v-82fee1df><div class="ml-10 flex items-baseline space-x-8" data-v-82fee1df><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(`<a${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([{ "text-sage-700 font-semibold": activeSection.value === item.href }, "text-gray-700 hover:text-sage-700 px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer relative group"])}" data-v-82fee1df>${ssrInterpolate(item.name)} <span class="${ssrRenderClass([{ "w-full": activeSection.value === item.href }, "absolute bottom-0 left-0 w-0 h-0.5 bg-sage-600 transition-all duration-300 group-hover:w-full"])}" data-v-82fee1df></span></a>`);
      });
      _push(`<!--]--></div></div><div class="hidden md:block" data-v-82fee1df><button class="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" data-v-82fee1df> Konsultasi Gratis </button></div><div class="md:hidden" data-v-82fee1df><button class="text-gray-700 hover:text-sage-700 focus:outline-none focus:text-sage-700 p-2" data-v-82fee1df><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-82fee1df>`);
      if (!mobileMenuOpen.value) {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-82fee1df></path>`);
      } else {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-82fee1df></path>`);
      }
      _push(`</svg></button></div></div></div><div style="${ssrRenderStyle(mobileMenuOpen.value ? null : { display: "none" })}" class="md:hidden bg-white border-t border-sage-100" data-v-82fee1df><div class="px-2 pt-2 pb-3 space-y-1" data-v-82fee1df><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(`<a${ssrRenderAttr("href", item.href)} class="text-gray-700 hover:text-sage-700 block px-4 py-3 text-base font-medium cursor-pointer rounded-lg hover:bg-sage-50 transition-colors duration-200" data-v-82fee1df>${ssrInterpolate(item.name)}</a>`);
      });
      _push(`<!--]--><button class="w-full mt-4 bg-sage-600 hover:bg-sage-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300" data-v-82fee1df> Konsultasi Gratis </button></div></div></nav>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/homePage/Navbar.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const NavBar = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-82fee1df"]]);
const _sfc_main$6 = {
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "home",
        class: "relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-sage-50 to-sage-100"
      }, _attrs))} data-v-3eceddb6><div class="absolute inset-0 opacity-5" data-v-3eceddb6><div class="absolute inset-0" style="${ssrRenderStyle({ "background-image": "radial-gradient(circle at 2px 2px, #8DB580 1px, transparent 0)", "background-size": "40px 40px" })}" data-v-3eceddb6></div></div><div class="absolute inset-0 overflow-hidden" data-v-3eceddb6><div class="absolute top-20 left-20 w-32 h-32 bg-sage-200 rounded-full opacity-20 animate-pulse" data-v-3eceddb6></div><div class="absolute top-1/3 right-16 w-24 h-24 bg-sage-300 rounded-full opacity-15 animate-pulse" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-3eceddb6></div><div class="absolute bottom-1/4 left-16 w-20 h-20 bg-sage-400 rounded-full opacity-10 animate-pulse" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-3eceddb6></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-3eceddb6><div class="grid lg:grid-cols-2 gap-16 items-center" data-v-3eceddb6><div class="text-center lg:text-left" data-v-3eceddb6><div class="inline-flex items-center px-6 py-3 mb-8 bg-white/80 backdrop-blur-sm rounded-full shadow-md animate-fade-in" data-v-3eceddb6><div class="w-3 h-3 bg-sage-500 rounded-full mr-3 animate-pulse" data-v-3eceddb6></div><span class="text-sm font-semibold text-gray-700" data-v-3eceddb6>Terpercaya sejak 2015</span><svg class="w-4 h-4 ml-2 text-sage-600" fill="currentColor" viewBox="0 0 20 20" data-v-3eceddb6><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" data-v-3eceddb6></path></svg></div><h1 class="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 animate-slide-up" data-v-3eceddb6><span class="text-gray-800" data-v-3eceddb6>Solusi Logistik</span><br data-v-3eceddb6><span class="text-sage-600" data-v-3eceddb6>Terpercaya</span></h1><p class="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}" data-v-3eceddb6> Melayani ekspor-impor, trucking inland, transfer uang internasional, dan asuransi barang kiriman dengan standar profesional internasional. </p><div class="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start mb-16 animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-3eceddb6><button class="bg-sage-600 hover:bg-sage-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1" data-v-3eceddb6> Konsultasi Gratis </button><button class="border-2 border-sage-600 text-sage-700 hover:bg-sage-600 hover:text-white px-10 py-4 rounded-full font-semibold text-lg transition-all duration-300" data-v-3eceddb6> Lihat Layanan </button></div><div class="grid grid-cols-3 gap-8 animate-fade-in" style="${ssrRenderStyle({ "animation-delay": "0.6s" })}" data-v-3eceddb6><div class="text-center" data-v-3eceddb6><div class="text-3xl md:text-4xl font-bold text-sage-700 mb-2" data-v-3eceddb6>500+</div><div class="text-gray-600 text-sm font-medium" data-v-3eceddb6>Klien Aktif</div></div><div class="text-center" data-v-3eceddb6><div class="text-3xl md:text-4xl font-bold text-sage-700 mb-2" data-v-3eceddb6>50+</div><div class="text-gray-600 text-sm font-medium" data-v-3eceddb6>Negara Tujuan</div></div><div class="text-center" data-v-3eceddb6><div class="text-3xl md:text-4xl font-bold text-sage-700 mb-2" data-v-3eceddb6>99%</div><div class="text-gray-600 text-sm font-medium" data-v-3eceddb6>Kepuasan Klien</div></div></div></div><div class="relative lg:ml-8 animate-fade-in" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-3eceddb6><div class="relative" data-v-3eceddb6><div class="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-sage-100" data-v-3eceddb6><div class="grid grid-cols-2 gap-6" data-v-3eceddb6><div class="bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300" data-v-3eceddb6><svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20" data-v-3eceddb6><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" data-v-3eceddb6></path></svg><h3 class="font-semibold mb-2" data-v-3eceddb6>Export/Import</h3><p class="text-sm opacity-90" data-v-3eceddb6>Layanan ekspor impor terpercaya</p></div><div class="bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300" data-v-3eceddb6><svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20" data-v-3eceddb6><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" data-v-3eceddb6></path><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z" data-v-3eceddb6></path></svg><h3 class="font-semibold mb-2" data-v-3eceddb6>Trucking</h3><p class="text-sm opacity-90" data-v-3eceddb6>Pengiriman darat seluruh Indonesia</p></div><div class="bg-gradient-to-br from-sage-400 to-sage-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300" data-v-3eceddb6><svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20" data-v-3eceddb6><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" data-v-3eceddb6></path></svg><h3 class="font-semibold mb-2" data-v-3eceddb6>Transfer Uang</h3><p class="text-sm opacity-90" data-v-3eceddb6>Transfer ke seluruh dunia</p></div><div class="bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-all duration-300" data-v-3eceddb6><svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20" data-v-3eceddb6><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" data-v-3eceddb6></path></svg><h3 class="font-semibold mb-2" data-v-3eceddb6>Asuransi</h3><p class="text-sm opacity-90" data-v-3eceddb6>Proteksi barang kiriman</p></div></div><div class="mt-8 pt-6 border-t border-sage-100" data-v-3eceddb6><div class="flex items-center justify-between text-sm text-gray-600" data-v-3eceddb6><div class="flex items-center" data-v-3eceddb6><svg class="w-4 h-4 text-sage-600 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-3eceddb6><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" data-v-3eceddb6></path></svg><span data-v-3eceddb6>24/7 Service</span></div><div class="flex items-center" data-v-3eceddb6><svg class="w-4 h-4 text-sage-600 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-3eceddb6><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" data-v-3eceddb6></path></svg><span data-v-3eceddb6>ISO Certified</span></div></div></div></div><div class="absolute -top-4 -right-4 bg-sage-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse" data-v-3eceddb6> Trusted Partner </div></div></div></div></div><div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" data-v-3eceddb6><div class="w-6 h-10 border-2 border-sage-400 rounded-full flex justify-center" data-v-3eceddb6><div class="w-1 h-3 bg-sage-400 rounded-full mt-2 animate-pulse" data-v-3eceddb6></div></div></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/HeroSection.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const HeroSection = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-3eceddb6"]]);
const _sfc_main$5 = {
  __name: "ServicesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const exportImportFeatures = [
      "Customs Clearance & Documentation",
      "Door-to-Door Delivery Service",
      "Real-time Shipment Tracking",
      "Expert Consultation & Support",
      "Competitive Pricing & Fast Processing"
    ];
    const otherServices = [
      {
        title: "Trucking Inland",
        description: "Pengiriman darat ke seluruh wilayah Indonesia dengan armada terawat dan sistem tracking real-time.",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z"/></svg>',
        iconBg: "bg-gray-500",
        tags: ["Nasional", "Tracking", "Asuransi"]
      },
      {
        title: "Transfer Uang Internasional",
        description: "Layanan transfer uang ke seluruh dunia dengan kurs kompetitif dan proses cepat, khususnya ke China.",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/></svg>',
        iconBg: "bg-sage-500",
        tags: ["Global", "Cepat", "Aman"]
      },
      {
        title: "Asuransi Barang",
        description: "Proteksi lengkap untuk barang kiriman dengan coverage komprehensif dan claim process yang mudah.",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>',
        iconBg: "bg-gray-400",
        tags: ["Proteksi", "Claim Mudah", "24/7"]
      }
    ];
    const processSteps = [
      {
        title: "Konsultasi",
        description: "Diskusi mendalam tentang kebutuhan spesifik dan solusi terbaik untuk bisnis Anda"
      },
      {
        title: "Penawaran",
        description: "Quotation transparan dengan breakdown biaya yang jelas dan kompetitif"
      },
      {
        title: "Eksekusi",
        description: "Pelaksanaan layanan sesuai SOP dengan monitoring ketat dan timeline yang tepat"
      },
      {
        title: "Pelaporan",
        description: "Update progress real-time dan dokumentasi lengkap untuk setiap tahapan proses"
      }
    ];
    const additionalServices = [
      {
        title: "Warehousing",
        description: "Fasilitas gudang modern dengan sistem inventory management yang terintegrasi",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/></svg>'
      },
      {
        title: "Packaging",
        description: "Layanan pengemasan profesional sesuai standar internasional untuk berbagai jenis barang",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"/></svg>'
      },
      {
        title: "Consulting",
        description: "Konsultasi perdagangan internasional, regulasi kepabeanan, dan strategi supply chain",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/></svg>'
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "services",
        class: "py-24 bg-white"
      }, _attrs))} data-v-7696a1e3><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-7696a1e3><div class="text-center mb-20" data-v-7696a1e3><div class="inline-flex items-center px-4 py-2 bg-sage-50 text-sage-700 rounded-full text-sm font-semibold mb-6" data-v-7696a1e3><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-7696a1e3><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-7696a1e3></path></svg> Layanan Profesional </div><h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6" data-v-7696a1e3> Solusi Logistik Terlengkap </h2><p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-v-7696a1e3> Dengan pengalaman lebih dari 15 tahun, kami menyediakan layanan logistik berkualitas tinggi dengan standar internasional dan teknologi terdepan. </p></div><div class="grid lg:grid-cols-2 gap-12 mb-20" data-v-7696a1e3><div class="lg:row-span-2 bg-gradient-to-br from-sage-50 to-sage-100 rounded-3xl p-8 border border-sage-200 hover:shadow-xl transition-all duration-500 group" data-v-7696a1e3><div class="flex items-center mb-6" data-v-7696a1e3><div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300" data-v-7696a1e3><svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-7696a1e3><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" data-v-7696a1e3></path></svg></div><div class="bg-sage-600 text-white px-3 py-1 rounded-full text-sm font-semibold" data-v-7696a1e3> Unggulan </div></div><h3 class="text-3xl font-bold text-gray-800 mb-4 group-hover:text-sage-700 transition-colors" data-v-7696a1e3> Export &amp; Import </h3><p class="text-gray-600 mb-8 leading-relaxed text-lg" data-v-7696a1e3> Layanan ekspor impor lengkap dengan handling dokumen, customs clearance, dan koordinasi dengan berbagai pihak terkait. Didukung dengan jaringan global dan pengalaman lebih dari 15 tahun. </p><div class="space-y-4 mb-8" data-v-7696a1e3><!--[-->`);
      ssrRenderList(exportImportFeatures, (feature) => {
        _push(`<div class="flex items-start" data-v-7696a1e3><div class="w-6 h-6 bg-sage-600 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" data-v-7696a1e3><svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-7696a1e3><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" data-v-7696a1e3></path></svg></div><span class="text-gray-700 font-medium" data-v-7696a1e3>${ssrInterpolate(feature)}</span></div>`);
      });
      _push(`<!--]--></div><button class="w-full bg-sage-600 hover:bg-sage-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform group-hover:scale-105" data-v-7696a1e3> Konsultasi Export Import </button></div><div class="space-y-6" data-v-7696a1e3><!--[-->`);
      ssrRenderList(otherServices, (service) => {
        _push(`<div class="bg-white rounded-2xl p-6 border border-gray-100 hover:border-sage-200 hover:shadow-lg transition-all duration-300 group" data-v-7696a1e3><div class="flex items-start" data-v-7696a1e3><div class="${ssrRenderClass([service.iconBg, "w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"])}" data-v-7696a1e3><div class="w-6 h-6 text-white" data-v-7696a1e3>${service.icon ?? ""}</div></div><div class="flex-1" data-v-7696a1e3><h4 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-sage-700 transition-colors" data-v-7696a1e3>${ssrInterpolate(service.title)}</h4><p class="text-gray-600 mb-4 leading-relaxed" data-v-7696a1e3>${ssrInterpolate(service.description)}</p><div class="flex flex-wrap gap-2" data-v-7696a1e3><!--[-->`);
        ssrRenderList(service.tags, (tag) => {
          _push(`<span class="px-3 py-1 bg-sage-50 text-sage-700 rounded-full text-sm font-medium" data-v-7696a1e3>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-gradient-to-r from-sage-50 to-gray-50 rounded-3xl p-12 mb-20" data-v-7696a1e3><div class="text-center mb-12" data-v-7696a1e3><h3 class="text-3xl font-bold text-gray-800 mb-4" data-v-7696a1e3> Proses Kerja Kami </h3><p class="text-gray-600 max-w-2xl mx-auto" data-v-7696a1e3> Sistem kerja yang tersistem dan transparan untuk memastikan kepuasan dan kepercayaan pelanggan </p></div><div class="grid md:grid-cols-4 gap-8" data-v-7696a1e3><!--[-->`);
      ssrRenderList(processSteps, (step, index) => {
        _push(`<div class="text-center group" data-v-7696a1e3><div class="relative mb-6" data-v-7696a1e3><div class="w-16 h-16 bg-sage-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300" data-v-7696a1e3>${ssrInterpolate(index + 1)}</div>`);
        if (index < processSteps.length - 1) {
          _push(`<div class="hidden md:block absolute top-8 left-full w-full h-0.5 bg-sage-200 transform -translate-y-0.5" data-v-7696a1e3></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><h4 class="text-lg font-bold text-gray-800 mb-3" data-v-7696a1e3>${ssrInterpolate(step.title)}</h4><p class="text-gray-600 text-sm leading-relaxed" data-v-7696a1e3>${ssrInterpolate(step.description)}</p></div>`);
      });
      _push(`<!--]--></div></div><div class="text-center" data-v-7696a1e3><h3 class="text-2xl font-bold text-gray-800 mb-12" data-v-7696a1e3> Layanan Pendukung </h3><div class="grid md:grid-cols-3 gap-8" data-v-7696a1e3><!--[-->`);
      ssrRenderList(additionalServices, (addon) => {
        _push(`<div class="bg-white rounded-xl p-6 border border-gray-100 hover:border-sage-200 hover:shadow-md transition-all duration-300 group" data-v-7696a1e3><div class="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-sage-200 transition-colors duration-300" data-v-7696a1e3><div class="w-6 h-6 text-sage-600" data-v-7696a1e3>${addon.icon ?? ""}</div></div><h4 class="text-lg font-bold text-gray-800 mb-3" data-v-7696a1e3>${ssrInterpolate(addon.title)}</h4><p class="text-gray-600 text-sm leading-relaxed" data-v-7696a1e3>${ssrInterpolate(addon.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ServicesSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ServicesSection = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-7696a1e3"]]);
const _sfc_main$4 = {
  __name: "Team",
  __ssrInlineRender: true,
  props: {
    size: {
      type: String,
      default: "large",
      // small, medium, large, xl, full
      validator: (value) => ["small", "medium", "large", "xl", "full"].includes(value)
    },
    layout: {
      type: String,
      default: "vertical",
      // vertical, horizontal
      validator: (value) => ["vertical", "horizontal"].includes(value)
    },
    showText: {
      type: Boolean,
      default: true
    },
    showOverlay: {
      type: Boolean,
      default: true
    },
    showStats: {
      type: Boolean,
      default: true
    },
    showDecorative: {
      type: Boolean,
      default: false
      // Disabled by default for cleaner look
    },
    teamTitle: {
      type: String,
      default: "Tim Profesional Kami"
    },
    teamDescription: {
      type: String,
      default: "Tim yang berpengalaman dan berdedikasi dalam memberikan pelayanan logistik terbaik untuk kepuasan pelanggan."
    },
    aspectRatio: {
      type: String,
      default: "auto",
      // auto, square, wide, ultrawide
      validator: (value) => ["auto", "square", "wide", "ultrawide"].includes(value)
    }
  },
  setup(__props) {
    const props = __props;
    const imageError = ref(false);
    const photoSrc = computed(() => {
      if (imageError.value) {
        return null;
      }
      return "/images/team/tim.png";
    });
    const altText = computed(() => {
      return `${props.teamTitle} - Eshaka Wijaya Logistics Team`;
    });
    const sizeConfig = computed(() => {
      const base = {
        small: {
          photoContainer: "w-64 h-auto",
          photo: "w-full h-auto",
          container: props.layout === "horizontal" ? "space-x-6" : "space-y-4",
          textContainer: "flex flex-col",
          title: "text-xl font-bold text-gray-800",
          description: "text-sm text-gray-600 mt-2"
        },
        medium: {
          photoContainer: "w-80 h-auto",
          photo: "w-full h-auto",
          container: props.layout === "horizontal" ? "space-x-8" : "space-y-6",
          textContainer: "flex flex-col max-w-md",
          title: "text-2xl font-bold text-gray-800",
          description: "text-base text-gray-600 mt-3"
        },
        large: {
          photoContainer: "w-96 h-auto",
          photo: "w-full h-auto",
          container: props.layout === "horizontal" ? "space-x-10" : "space-y-8",
          textContainer: "flex flex-col max-w-lg",
          title: "text-3xl font-bold text-gray-800",
          description: "text-lg text-gray-600 mt-4 leading-relaxed"
        },
        xl: {
          photoContainer: "w-[500px] h-auto",
          photo: "w-full h-auto",
          container: props.layout === "horizontal" ? "space-x-12" : "space-y-8",
          textContainer: "flex flex-col max-w-xl",
          title: "text-4xl font-bold text-gray-800",
          description: "text-xl text-gray-600 mt-6 leading-relaxed"
        },
        full: {
          photoContainer: "w-full max-w-4xl h-auto",
          photo: "w-full h-auto",
          container: props.layout === "horizontal" ? "space-x-16" : "space-y-12",
          textContainer: "flex flex-col max-w-2xl",
          title: "text-5xl font-bold text-gray-800",
          description: "text-2xl text-gray-600 mt-8 leading-relaxed"
        }
      };
      if (props.aspectRatio !== "auto") {
        const aspectRatios = {
          square: "aspect-square",
          wide: "aspect-video",
          ultrawide: "aspect-[21/9]"
        };
        base[props.size].photo = `w-full h-full object-cover ${aspectRatios[props.aspectRatio]}`;
        base[props.size].photoContainer = base[props.size].photoContainer.replace("h-auto", aspectRatios[props.aspectRatio]);
      }
      return base[props.size];
    });
    const teamStats = computed(() => [
      { value: "25+", label: "Expert Staff" },
      { value: "15+", label: "Years Exp" },
      { value: "500+", label: "Projects" },
      { value: "99%", label: "Success Rate" }
    ]);
    const containerClass = computed(() => {
      const layoutClass = props.layout === "horizontal" ? "flex-row items-center" : "flex-col";
      return `${sizeConfig.value.container} ${layoutClass}`;
    });
    const photoContainerClass = computed(() => sizeConfig.value.photoContainer);
    const photoClass = computed(() => sizeConfig.value.photo);
    const textContainerClass = computed(() => sizeConfig.value.textContainer);
    const titleClass = computed(() => sizeConfig.value.title);
    const descriptionClass = computed(() => sizeConfig.value.description);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="${ssrRenderClass([containerClass.value, "flex items-center justify-center"])}" data-v-5fd477d5><div class="relative group" data-v-5fd477d5><div class="${ssrRenderClass([photoContainerClass.value, "relative overflow-hidden"])}" data-v-5fd477d5><img${ssrRenderAttr("src", photoSrc.value)}${ssrRenderAttr("alt", altText.value)} class="${ssrRenderClass([photoClass.value, "object-cover object-center transition-transform duration-700 group-hover:scale-105"])}" data-v-5fd477d5><div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-v-5fd477d5></div>`);
      if (__props.showOverlay) {
        _push(`<div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" data-v-5fd477d5><h3 class="text-2xl font-bold mb-2" data-v-5fd477d5>${ssrInterpolate(__props.teamTitle)}</h3><p class="text-sm opacity-90" data-v-5fd477d5>${ssrInterpolate(__props.teamDescription)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.showDecorative) {
        _push(`<div class="absolute -top-4 -right-4 w-8 h-8 bg-sage-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" data-v-5fd477d5></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showDecorative) {
        _push(`<div class="absolute -bottom-4 -left-4 w-6 h-6 bg-sage-400 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300" data-v-5fd477d5></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.showText && __props.layout === "horizontal") {
        _push(`<div class="${ssrRenderClass(textContainerClass.value)}" data-v-5fd477d5><h3 class="${ssrRenderClass(titleClass.value)}" data-v-5fd477d5>${ssrInterpolate(__props.teamTitle)}</h3><p class="${ssrRenderClass(descriptionClass.value)}" data-v-5fd477d5>${ssrInterpolate(__props.teamDescription)}</p>`);
        if (__props.showStats) {
          _push(`<div class="grid grid-cols-2 gap-4 mt-6" data-v-5fd477d5><!--[-->`);
          ssrRenderList(teamStats.value, (stat) => {
            _push(`<div class="text-center" data-v-5fd477d5><div class="text-2xl font-bold text-sage-700" data-v-5fd477d5>${ssrInterpolate(stat.value)}</div><div class="text-sm text-gray-600" data-v-5fd477d5>${ssrInterpolate(stat.label)}</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.showText && __props.layout === "vertical") {
        _push(`<div class="text-center mt-8" data-v-5fd477d5><h3 class="${ssrRenderClass(titleClass.value)}" data-v-5fd477d5>${ssrInterpolate(__props.teamTitle)}</h3><p class="${ssrRenderClass(descriptionClass.value)}" data-v-5fd477d5>${ssrInterpolate(__props.teamDescription)}</p>`);
        if (__props.showStats) {
          _push(`<div class="grid grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto" data-v-5fd477d5><!--[-->`);
          ssrRenderList(teamStats.value, (stat) => {
            _push(`<div class="text-center" data-v-5fd477d5><div class="text-xl font-bold text-sage-700" data-v-5fd477d5>${ssrInterpolate(stat.value)}</div><div class="text-xs text-gray-600" data-v-5fd477d5>${ssrInterpolate(stat.label)}</div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Team.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Team = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-5fd477d5"]]);
const _sfc_main$3 = {
  __name: "AboutSection",
  __ssrInlineRender: true,
  setup(__props) {
    const companyStats = [
      { value: "15+", label: "Tahun Pengalaman" },
      { value: "500+", label: "Klien Aktif" },
      { value: "50+", label: "Negara Tujuan" },
      { value: "99.5%", label: "Success Rate" }
    ];
    const achievements = [
      {
        title: "ISO 9001:2015 Certified",
        description: "Sertifikat manajemen kualitas internasional",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>'
      },
      {
        title: "Forwarder License",
        description: "Lisensi resmi freight forwarder dari Kemenhub",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>'
      },
      {
        title: "Best Service Award",
        description: "Penghargaan pelayanan terbaik 2023",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'
      }
    ];
    const keyPoints = [
      {
        title: "Pengalaman 15+ Tahun",
        description: "Melayani ekspor-impor dan logistik dengan track record yang terpercaya dan profesional"
      },
      {
        title: "Jaringan Global",
        description: "Kemitraan dengan 50+ negara untuk memfasilitasi perdagangan internasional yang efisien"
      },
      {
        title: "Teknologi Modern",
        description: "Sistem tracking real-time dan digitalisasi proses untuk efisiensi maksimal dan transparansi"
      },
      {
        title: "Tim Profesional",
        description: "Didukung oleh experts bersertifikat internasional di bidang logistik dan perdagangan"
      }
    ];
    const teamHighlights = [
      {
        title: "Expert Leadership",
        description: "Tim manajemen dengan pengalaman 20+ tahun di industri logistik internasional",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>'
      },
      {
        title: "Certified Professionals",
        description: "Seluruh tim memiliki sertifikasi internasional dan update knowledge secara berkala",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>'
      },
      {
        title: "24/7 Support",
        description: "Tim customer service yang siap membantu Anda kapan saja dengan respon time terbaik",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"/></svg>'
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "about",
        class: "py-24 bg-gradient-to-br from-gray-50 to-sage-50"
      }, _attrs))} data-v-78cf45c0><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-78cf45c0><div class="text-center mb-20" data-v-78cf45c0><div class="inline-flex items-center px-4 py-2 bg-white border border-sage-200 text-sage-700 rounded-full text-sm font-semibold mb-6" data-v-78cf45c0><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-78cf45c0><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" data-v-78cf45c0></path></svg> Sertifikat Resmi &amp; Terpercaya </div><h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6" data-v-78cf45c0> Tentang Eshaka Wijaya Logistics </h2><p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-v-78cf45c0> Berpengalaman lebih dari 15 tahun dalam industri logistik Indonesia, kami hadir sebagai mitra terpercaya untuk solusi perdagangan internasional yang efisien dan profesional. </p></div><div class="grid lg:grid-cols-2 gap-16 items-center mb-24" data-v-78cf45c0><div data-v-78cf45c0><h3 class="text-3xl font-bold text-gray-800 mb-6" data-v-78cf45c0> Mitra Logistik Terpercaya <span class="text-sage-600" data-v-78cf45c0>Sejak 2015</span></h3><p class="text-lg text-gray-600 mb-8 leading-relaxed" data-v-78cf45c0> Eshaka Wijaya Logistics didirikan dengan visi menjadi perusahaan logistik terdepan di Indonesia. Kami menyediakan layanan ekspor-impor, trucking inland, transfer uang internasional, dan asuransi barang dengan standar kualitas internasional yang terpercaya. </p><div class="space-y-6 mb-10" data-v-78cf45c0><!--[-->`);
      ssrRenderList(keyPoints, (point) => {
        _push(`<div class="flex items-start group" data-v-78cf45c0><div class="w-12 h-12 bg-sage-600 rounded-xl flex items-center justify-center flex-shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300" data-v-78cf45c0><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-78cf45c0><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" data-v-78cf45c0></path></svg></div><div data-v-78cf45c0><h4 class="text-lg font-bold text-gray-800 mb-2" data-v-78cf45c0>${ssrInterpolate(point.title)}</h4><p class="text-gray-600 leading-relaxed" data-v-78cf45c0>${ssrInterpolate(point.description)}</p></div></div>`);
      });
      _push(`<!--]--></div><button class="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" data-v-78cf45c0> Konsultasi Sekarang </button></div><div class="relative" data-v-78cf45c0><div class="bg-white rounded-3xl p-8 shadow-xl border border-sage-100" data-v-78cf45c0><div class="grid grid-cols-2 gap-6 mb-8" data-v-78cf45c0><!--[-->`);
      ssrRenderList(companyStats, (stat) => {
        _push(`<div class="text-center p-6 bg-sage-50 rounded-2xl hover:bg-sage-100 transition-colors duration-300" data-v-78cf45c0><div class="text-3xl font-bold text-sage-700 mb-2" data-v-78cf45c0>${ssrInterpolate(stat.value)}</div><div class="text-gray-600 font-medium text-sm" data-v-78cf45c0>${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div><div class="space-y-4" data-v-78cf45c0><!--[-->`);
      ssrRenderList(achievements, (achievement) => {
        _push(`<div class="flex items-center p-4 bg-sage-50 rounded-xl border border-sage-100 hover:bg-sage-100 transition-colors duration-300" data-v-78cf45c0><div class="w-12 h-12 bg-sage-600 rounded-xl flex items-center justify-center mr-4" data-v-78cf45c0><div class="w-6 h-6 text-white" data-v-78cf45c0>${achievement.icon ?? ""}</div></div><div data-v-78cf45c0><h4 class="font-bold text-gray-800" data-v-78cf45c0>${ssrInterpolate(achievement.title)}</h4><p class="text-sm text-gray-600" data-v-78cf45c0>${ssrInterpolate(achievement.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="absolute -top-6 -right-6 w-24 h-24 bg-sage-200 rounded-full opacity-30" data-v-78cf45c0></div><div class="absolute -bottom-4 -left-4 w-16 h-16 bg-sage-300 rounded-full opacity-20" data-v-78cf45c0></div></div></div><div class="grid md:grid-cols-2 gap-12 mb-24" data-v-78cf45c0><div class="bg-white rounded-3xl p-8 shadow-lg border border-sage-100 hover:shadow-xl transition-all duration-300" data-v-78cf45c0><div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mb-6" data-v-78cf45c0><svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-78cf45c0><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" data-v-78cf45c0></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" data-v-78cf45c0></path></svg></div><h3 class="text-2xl font-bold text-gray-800 mb-4" data-v-78cf45c0>Visi Kami</h3><p class="text-gray-600 leading-relaxed" data-v-78cf45c0> Menjadi perusahaan logistik terdepan di Indonesia yang menghubungkan bisnis lokal dengan pasar global, memberikan solusi terpadu yang efisien, inovatif, dan berkelanjutan untuk mendukung pertumbuhan ekonomi nasional. </p></div><div class="bg-white rounded-3xl p-8 shadow-lg border border-sage-100 hover:shadow-xl transition-all duration-300" data-v-78cf45c0><div class="w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center mb-6" data-v-78cf45c0><svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-78cf45c0><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" data-v-78cf45c0></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" data-v-78cf45c0></path></svg></div><h3 class="text-2xl font-bold text-gray-800 mb-4" data-v-78cf45c0>Misi Kami</h3><div class="space-y-3 text-gray-600" data-v-78cf45c0><div class="flex items-start" data-v-78cf45c0><svg class="w-5 h-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" data-v-78cf45c0><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" data-v-78cf45c0></path></svg> Menyediakan layanan logistik berkualitas tinggi dengan teknologi terdepan </div><div class="flex items-start" data-v-78cf45c0><svg class="w-5 h-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" data-v-78cf45c0><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" data-v-78cf45c0></path></svg> Membangun jaringan distribusi yang reliable dan efisien </div><div class="flex items-start" data-v-78cf45c0><svg class="w-5 h-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" data-v-78cf45c0><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" data-v-78cf45c0></path></svg> Mengembangkan SDM profesional dengan komitmen pelayanan prima </div></div></div></div><div class="bg-white rounded-3xl p-12 shadow-xl border border-sage-100" data-v-78cf45c0><div class="text-center mb-12" data-v-78cf45c0><h3 class="text-3xl font-bold text-gray-800 mb-4" data-v-78cf45c0> Tim Profesional Kami </h3><p class="text-gray-600 max-w-3xl mx-auto leading-relaxed" data-v-78cf45c0> Dipimpin oleh para profesional berpengalaman di industri logistik dan perdagangan internasional dengan komitmen tinggi terhadap kepuasan pelanggan. Tim kami yang solid dan berpengalaman siap memberikan pelayanan terbaik untuk kebutuhan logistik Anda. </p></div><div class="flex justify-center" data-v-78cf45c0>`);
      _push(ssrRenderComponent(Team, {
        size: "xl",
        layout: "vertical",
        "show-text": false,
        "show-overlay": true,
        "show-stats": true,
        "team-title": "Tim Expert Logistics",
        "team-description": "Profesional berpengalaman dengan dedikasi tinggi dalam melayani kebutuhan logistik internasional Anda."
      }, null, _parent));
      _push(`</div><div class="grid md:grid-cols-3 gap-8 mt-16" data-v-78cf45c0><!--[-->`);
      ssrRenderList(teamHighlights, (highlight) => {
        _push(`<div class="text-center p-6 bg-sage-50 rounded-2xl hover:bg-sage-100 transition-colors duration-300" data-v-78cf45c0><div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-4" data-v-78cf45c0><div class="w-8 h-8 text-white" data-v-78cf45c0>${highlight.icon ?? ""}</div></div><h4 class="text-lg font-bold text-gray-800 mb-3" data-v-78cf45c0>${ssrInterpolate(highlight.title)}</h4><p class="text-gray-600 text-sm leading-relaxed" data-v-78cf45c0>${ssrInterpolate(highlight.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AboutSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const AboutSection = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-78cf45c0"]]);
const _sfc_main$2 = {
  __name: "ContactSection",
  __ssrInlineRender: true,
  setup(__props) {
    const whatsAppLoading = ref(false);
    const form = ref({
      name: "",
      email: "",
      company: "",
      service: "",
      message: ""
    });
    const isFormValid = computed(() => {
      return form.value.name && form.value.email && form.value.message;
    });
    const quickContacts = [
      {
        id: 1,
        name: "Customer Service",
        role: "Bantuan Umum",
        description: "Konsultasi & informasi layanan",
        type: "cs",
        bgColor: "bg-white/20",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"/></svg>'
      },
      {
        id: 2,
        name: "Sales Team",
        role: "Penawaran & Quotation",
        description: "Diskusi harga & paket layanan",
        type: "sales",
        bgColor: "bg-white/20",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>'
      },
      {
        id: 3,
        name: "Technical Support",
        role: "Dukungan Teknis",
        description: "Bantuan tracking & dokumentasi",
        type: "cs",
        bgColor: "bg-white/20",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/></svg>'
      },
      {
        id: 4,
        name: "Emergency Line",
        role: "Layanan Darurat",
        description: "Support 24/7 untuk urgent case",
        type: "main",
        bgColor: "bg-red-500/80",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>'
      }
    ];
    const offices = [
      {
        id: 1,
        name: "Kantor Pusat Jakarta",
        address: "Jl. Jend. Sudirman Kav. 52-53, Senayan, Jakarta Selatan 12190",
        phone: "+62 21 2555-0123",
        email: "jakarta@eshakawijaya.com"
      },
      {
        id: 2,
        name: "Cabang Surabaya",
        address: "Jl. Raya Darmo 68-70, Darmo, Surabaya 60264",
        phone: "+62 31 8765-4321",
        email: "surabaya@eshakawijaya.com"
      },
      {
        id: 3,
        name: "Cabang Medan",
        address: "Jl. Asia Baru No. 88, Sei Agul, Medan 20214",
        phone: "+62 61 4567-8901",
        email: "medan@eshakawijaya.com"
      }
    ];
    const whyChooseUs = [
      {
        title: "Pengalaman Terpercaya",
        description: "15+ tahun melayani ekspor-impor dengan track record sempurna dan kepuasan klien tinggi"
      },
      {
        title: "Jaringan Global",
        description: "Kemitraan dengan 50+ negara dan akses ke semua pelabuhan utama dunia"
      },
      {
        title: "Teknologi Modern",
        description: "Sistem tracking real-time dan digitalisasi proses untuk transparansi maksimal"
      },
      {
        title: "Tim Profesional",
        description: "Didukung experts bersertifikat dengan responsiveness 24/7 untuk kepuasan Anda"
      },
      {
        title: "Harga Kompetitif",
        description: "Penawaran terbaik dengan kualitas premium tanpa kompromi pada service excellence"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "contact",
        class: "py-24 bg-gradient-to-br from-sage-600 via-sage-700 to-gray-700"
      }, _attrs))} data-v-32bffd0f><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-32bffd0f><div class="text-center mb-20" data-v-32bffd0f><div class="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-semibold mb-6" data-v-32bffd0f><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-32bffd0f><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" data-v-32bffd0f></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" data-v-32bffd0f></path></svg> Hubungi Tim Profesional Kami </div><h2 class="text-4xl md:text-5xl font-bold text-white mb-6" data-v-32bffd0f> Mari Diskusikan Kebutuhan Anda </h2><p class="text-xl text-sage-100 max-w-3xl mx-auto leading-relaxed" data-v-32bffd0f> Tim ahli kami siap membantu memberikan solusi logistik terbaik untuk bisnis Anda dengan layanan 24/7 </p></div><div class="grid lg:grid-cols-2 gap-16" data-v-32bffd0f><div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20" data-v-32bffd0f><h3 class="text-2xl font-bold text-white mb-8" data-v-32bffd0f>Kirim Pesan Anda</h3><form class="space-y-6" data-v-32bffd0f><div class="grid md:grid-cols-2 gap-6" data-v-32bffd0f><div data-v-32bffd0f><label class="block text-sm font-semibold text-sage-100 mb-3" data-v-32bffd0f>Nama Lengkap *</label><input${ssrRenderAttr("value", form.value.name)} type="text" required class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-sage-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm" placeholder="Masukkan nama lengkap" data-v-32bffd0f></div><div data-v-32bffd0f><label class="block text-sm font-semibold text-sage-100 mb-3" data-v-32bffd0f>Email Address *</label><input${ssrRenderAttr("value", form.value.email)} type="email" required class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-sage-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm" placeholder="email@perusahaan.com" data-v-32bffd0f></div></div><div class="grid md:grid-cols-2 gap-6" data-v-32bffd0f><div data-v-32bffd0f><label class="block text-sm font-semibold text-sage-100 mb-3" data-v-32bffd0f>Nama Perusahaan</label><input${ssrRenderAttr("value", form.value.company)} type="text" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-sage-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm" placeholder="PT. Nama Perusahaan" data-v-32bffd0f></div><div data-v-32bffd0f><label class="block text-sm font-semibold text-sage-100 mb-3" data-v-32bffd0f>Layanan yang Diminati</label><select class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm" data-v-32bffd0f><option value="" class="text-gray-900" data-v-32bffd0f${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "") : ssrLooseEqual(form.value.service, "")) ? " selected" : ""}>Pilih Layanan</option><option value="export-import" class="text-gray-900" data-v-32bffd0f${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "export-import") : ssrLooseEqual(form.value.service, "export-import")) ? " selected" : ""}>Export &amp; Import</option><option value="trucking" class="text-gray-900" data-v-32bffd0f${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "trucking") : ssrLooseEqual(form.value.service, "trucking")) ? " selected" : ""}>Trucking Inland</option><option value="money-transfer" class="text-gray-900" data-v-32bffd0f${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "money-transfer") : ssrLooseEqual(form.value.service, "money-transfer")) ? " selected" : ""}>Transfer Uang Internasional</option><option value="insurance" class="text-gray-900" data-v-32bffd0f${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "insurance") : ssrLooseEqual(form.value.service, "insurance")) ? " selected" : ""}>Asuransi Barang Kiriman</option><option value="consultation" class="text-gray-900" data-v-32bffd0f${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "consultation") : ssrLooseEqual(form.value.service, "consultation")) ? " selected" : ""}>Konsultasi Umum</option></select></div></div><div data-v-32bffd0f><label class="block text-sm font-semibold text-sage-100 mb-3" data-v-32bffd0f>Pesan &amp; Kebutuhan *</label><textarea rows="5" required class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-sage-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none" placeholder="Jelaskan kebutuhan logistik Anda secara detail..." data-v-32bffd0f>${ssrInterpolate(form.value.message)}</textarea></div><div class="flex flex-col sm:flex-row gap-4" data-v-32bffd0f><button type="submit"${ssrIncludeBooleanAttr(!isFormValid.value) ? " disabled" : ""} class="flex-1 bg-white text-sage-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-sage-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" data-v-32bffd0f><svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-32bffd0f><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" data-v-32bffd0f></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" data-v-32bffd0f></path></svg> Kirim via Email </button><button type="button"${ssrIncludeBooleanAttr(!isFormValid.value || whatsAppLoading.value) ? " disabled" : ""} class="flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center" data-v-32bffd0f>`);
      if (whatsAppLoading.value) {
        _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-32bffd0f><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-32bffd0f></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-32bffd0f></path></svg>`);
      } else {
        _push(`<svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-32bffd0f><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" data-v-32bffd0f></path></svg>`);
      }
      _push(` Kirim via WhatsApp </button></div></form></div><div class="space-y-8" data-v-32bffd0f><div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20" data-v-32bffd0f><h3 class="text-2xl font-bold text-white mb-8" data-v-32bffd0f>Kontak Langsung</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-6" data-v-32bffd0f><!--[-->`);
      ssrRenderList(quickContacts, (contact) => {
        _push(`<button class="flex items-center space-x-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 group text-left w-full" data-v-32bffd0f><div class="${ssrRenderClass([contact.bgColor, "w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"])}" data-v-32bffd0f><div class="w-7 h-7 text-white" data-v-32bffd0f>${contact.icon ?? ""}</div></div><div data-v-32bffd0f><div class="text-white font-bold text-lg" data-v-32bffd0f>${ssrInterpolate(contact.name)}</div><div class="text-sage-100 text-sm" data-v-32bffd0f>${ssrInterpolate(contact.role)}</div><div class="text-sage-200 text-xs" data-v-32bffd0f>${ssrInterpolate(contact.description)}</div></div></button>`);
      });
      _push(`<!--]--></div></div><div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20" data-v-32bffd0f><h3 class="text-2xl font-bold text-white mb-8" data-v-32bffd0f>Kantor Kami</h3><div class="space-y-6" data-v-32bffd0f><!--[-->`);
      ssrRenderList(offices, (office) => {
        _push(`<div class="flex items-start space-x-4 p-6 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300" data-v-32bffd0f><div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0" data-v-32bffd0f><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-32bffd0f><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" data-v-32bffd0f></path></svg></div><div class="flex-1" data-v-32bffd0f><h4 class="text-lg font-bold text-white mb-2" data-v-32bffd0f>${ssrInterpolate(office.name)}</h4><p class="text-sage-100 text-sm mb-3 leading-relaxed" data-v-32bffd0f>${ssrInterpolate(office.address)}</p><div class="flex flex-col sm:flex-row gap-4 text-sm" data-v-32bffd0f><a${ssrRenderAttr("href", `tel:${office.phone}`)} class="text-sage-200 hover:text-white transition-colors flex items-center" data-v-32bffd0f><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-32bffd0f><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" data-v-32bffd0f></path></svg> ${ssrInterpolate(office.phone)}</a><a${ssrRenderAttr("href", `mailto:${office.email}`)} class="text-sage-200 hover:text-white transition-colors flex items-center" data-v-32bffd0f><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-32bffd0f><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" data-v-32bffd0f></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" data-v-32bffd0f></path></svg> ${ssrInterpolate(office.email)}</a></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20" data-v-32bffd0f><h3 class="text-2xl font-bold text-white mb-8" data-v-32bffd0f>Mengapa Pilih Eshaka Wijaya Logistics?</h3><div class="space-y-6" data-v-32bffd0f><!--[-->`);
      ssrRenderList(whyChooseUs, (feature) => {
        _push(`<div class="flex items-start space-x-4" data-v-32bffd0f><div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0" data-v-32bffd0f><svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-32bffd0f><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" data-v-32bffd0f></path></svg></div><div data-v-32bffd0f><h4 class="text-white font-bold text-lg mb-1" data-v-32bffd0f>${ssrInterpolate(feature.title)}</h4><p class="text-sage-100 text-sm leading-relaxed" data-v-32bffd0f>${ssrInterpolate(feature.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="mt-20 bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20" data-v-32bffd0f><h3 class="text-2xl font-bold text-white mb-8 text-center" data-v-32bffd0f>Lokasi Kantor Pusat</h3><div class="bg-white/20 rounded-2xl h-64 flex items-center justify-center backdrop-blur-sm" data-v-32bffd0f><div class="text-center" data-v-32bffd0f><svg class="w-16 h-16 text-white/60 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20" data-v-32bffd0f><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" data-v-32bffd0f></path></svg><p class="text-white/80 text-lg mb-4" data-v-32bffd0f>Peta Interaktif Kantor Pusat</p><button class="bg-white text-sage-700 px-6 py-3 rounded-xl font-semibold hover:bg-sage-50 transition-colors duration-300" data-v-32bffd0f> Lihat di Google Maps </button></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ContactSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ContactSection = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-32bffd0f"]]);
const _sfc_main$1 = {
  __name: "FooterSection",
  __ssrInlineRender: true,
  setup(__props) {
    const newsletterEmail = ref("");
    const showBackToTop = ref(false);
    const currentYear = computed(() => (/* @__PURE__ */ new Date()).getFullYear());
    const services = [
      { name: "Export & Import Services", link: "#services" },
      { name: "Trucking Inland Transportation", link: "#services" },
      { name: "International Money Transfer", link: "#services" },
      { name: "Cargo Insurance Coverage", link: "#services" },
      { name: "Warehousing & Storage", link: "#services" },
      { name: "Custom Clearance", link: "#services" },
      { name: "Supply Chain Consulting", link: "#services" },
      { name: "Documentation Services", link: "#services" }
    ];
    const quickLinks = [
      { name: "Beranda", url: "#home" },
      { name: "Tentang Kami", url: "#about" },
      { name: "Layanan", url: "#services" },
      { name: "Kontak", url: "#contact" },
      { name: "FAQ", url: "/faq" },
      { name: "Blog & News", url: "/blog" },
      { name: "Karir", url: "/career" },
      { name: "Partnership", url: "/partnership" }
    ];
    const contactInfo = [
      {
        type: "Kantor Pusat",
        value: "Jakarta Selatan",
        secondary: "Jl. Jend. Sudirman Kav. 52-53",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/></svg>'
      },
      {
        type: "Customer Service",
        value: "+62 21 2555-0123",
        secondary: "Available 24/7",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>'
      },
      {
        type: "Email Support",
        value: "info@eshaka-wijaya.com",
        secondary: "Response dalam 24 jam",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>'
      }
    ];
    const socialMedia = [
      {
        name: "WhatsApp",
        url: "#",
        hoverColor: "hover:bg-green-600",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347"/></svg>'
      },
      {
        name: "LinkedIn",
        url: "#",
        hoverColor: "hover:bg-blue-700",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/></svg>'
      },
      {
        name: "Instagram",
        url: "#",
        hoverColor: "hover:bg-pink-600",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm-2 4h4a4 4 0 014 4v4a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4zm4 1.5H8A2.5 2.5 0 005.5 8v4A2.5 2.5 0 008 14.5h4a2.5 2.5 0 002.5-2.5V8A2.5 2.5 0 0012 5.5zM10 7a3 3 0 100 6 3 3 0 000-6zm0 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm3.5-2.5a.5.5 0 11-1 0 .5.5 0 011 0z"/></svg>'
      },
      {
        name: "Email",
        url: "mailto:info@eshaka-wijaya.com",
        hoverColor: "hover:bg-sage-600",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>'
      }
    ];
    const legalLinks = [
      { name: "Privacy Policy", url: "/privacy" },
      { name: "Terms of Service", url: "/terms" },
      { name: "Cookie Policy", url: "/cookies" }
    ];
    const certifications = [
      {
        name: "ISO 9001",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>'
      },
      {
        name: "Licensed",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>'
      }
    ];
    const handleScroll = () => {
      showBackToTop.value = window.scrollY > 400;
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gradient-to-br from-gray-800 via-gray-900 to-sage-800 text-white" }, _attrs))} data-v-3007f915><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-v-3007f915><div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12" data-v-3007f915><div class="lg:col-span-1" data-v-3007f915><div class="mb-6" data-v-3007f915>`);
      _push(ssrRenderComponent(_sfc_main$8, {
        size: "large",
        "show-text": false,
        "show-tagline": false
      }, null, _parent));
      _push(`</div><p class="text-gray-300 mb-8 leading-relaxed" data-v-3007f915> Solusi logistik terpercaya untuk ekspor-impor, trucking inland, transfer uang internasional, dan asuransi barang kiriman dengan standar profesional tinggi sejak 2015. </p><div class="flex items-center space-x-2 mb-6" data-v-3007f915><div class="flex items-center px-3 py-1 bg-sage-600/20 rounded-full" data-v-3007f915><div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" data-v-3007f915></div><span class="text-sm text-sage-200" data-v-3007f915>Online 24/7</span></div><div class="flex items-center px-3 py-1 bg-sage-600/20 rounded-full" data-v-3007f915><svg class="w-3 h-3 text-sage-300 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-3007f915><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" data-v-3007f915></path></svg><span class="text-sm text-sage-200" data-v-3007f915>ISO Certified</span></div></div><div class="flex space-x-4" data-v-3007f915><!--[-->`);
      ssrRenderList(socialMedia, (social) => {
        _push(`<a${ssrRenderAttr("href", social.url)} target="_blank" class="${ssrRenderClass([social.hoverColor, "w-12 h-12 bg-white/10 hover:bg-sage-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"])}" data-v-3007f915><div class="w-5 h-5 text-gray-300 group-hover:text-white" data-v-3007f915>${social.icon ?? ""}</div></a>`);
      });
      _push(`<!--]--></div></div><div data-v-3007f915><h3 class="text-xl font-bold mb-8 text-white" data-v-3007f915>Layanan Kami</h3><ul class="space-y-4" data-v-3007f915><!--[-->`);
      ssrRenderList(services, (service) => {
        _push(`<li data-v-3007f915><a${ssrRenderAttr("href", service.link)} class="text-gray-300 hover:text-sage-300 transition-colors duration-300 flex items-start group cursor-pointer" data-v-3007f915><svg class="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-sage-600 group-hover:text-sage-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20" data-v-3007f915><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" data-v-3007f915></path></svg><span class="group-hover:translate-x-1 transition-transform duration-300" data-v-3007f915>${ssrInterpolate(service.name)}</span></a></li>`);
      });
      _push(`<!--]--></ul></div><div data-v-3007f915><h3 class="text-xl font-bold mb-8 text-white" data-v-3007f915>Menu Cepat</h3><ul class="space-y-4" data-v-3007f915><!--[-->`);
      ssrRenderList(quickLinks, (link) => {
        _push(`<li data-v-3007f915><a${ssrRenderAttr("href", link.url)} class="text-gray-300 hover:text-sage-300 transition-colors duration-300 flex items-start group cursor-pointer" data-v-3007f915><svg class="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-sage-600 group-hover:text-sage-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20" data-v-3007f915><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" data-v-3007f915></path></svg><span class="group-hover:translate-x-1 transition-transform duration-300" data-v-3007f915>${ssrInterpolate(link.name)}</span></a></li>`);
      });
      _push(`<!--]--></ul></div><div data-v-3007f915><h3 class="text-xl font-bold mb-8 text-white" data-v-3007f915>Hubungi Kami</h3><div class="space-y-6" data-v-3007f915><!--[-->`);
      ssrRenderList(contactInfo, (contact) => {
        _push(`<div class="group" data-v-3007f915><div class="flex items-start" data-v-3007f915><div class="w-12 h-12 bg-sage-600/20 rounded-xl flex items-center justify-center mr-4 mt-1 group-hover:bg-sage-600 transition-colors duration-300" data-v-3007f915><div class="w-5 h-5 text-sage-300 group-hover:text-white" data-v-3007f915>${contact.icon ?? ""}</div></div><div data-v-3007f915><div class="text-sm text-sage-300 mb-1 font-medium" data-v-3007f915>${ssrInterpolate(contact.type)}</div><div class="text-white font-semibold mb-1" data-v-3007f915>${ssrInterpolate(contact.value)}</div>`);
        if (contact.secondary) {
          _push(`<div class="text-sm text-gray-400" data-v-3007f915>${ssrInterpolate(contact.secondary)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="border-t border-gray-700/50 bg-gradient-to-r from-gray-800 to-sage-800/20" data-v-3007f915><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-v-3007f915><div class="grid md:grid-cols-2 gap-8 items-center" data-v-3007f915><div data-v-3007f915><h3 class="text-2xl font-bold text-white mb-4" data-v-3007f915> Dapatkan Update Terbaru </h3><p class="text-gray-300 leading-relaxed" data-v-3007f915> Berlangganan newsletter kami untuk mendapatkan informasi terbaru tentang layanan, tips logistik, dan penawaran khusus. </p></div><div data-v-3007f915><form class="flex gap-4" data-v-3007f915><input${ssrRenderAttr("value", newsletterEmail.value)} type="email" placeholder="Masukkan email Anda" class="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent backdrop-blur-sm" required data-v-3007f915><button type="submit" class="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" data-v-3007f915> Subscribe </button></form></div></div></div></div><div class="border-t border-gray-700/50 bg-gray-900/50" data-v-3007f915><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-v-3007f915><div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" data-v-3007f915><div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6" data-v-3007f915><p class="text-gray-400 text-sm" data-v-3007f915> © ${ssrInterpolate(currentYear.value)} Eshaka Wijaya Logistics. All rights reserved. </p><div class="flex space-x-6" data-v-3007f915><!--[-->`);
      ssrRenderList(legalLinks, (legal) => {
        _push(`<a${ssrRenderAttr("href", legal.url)} class="text-gray-400 hover:text-sage-300 text-sm transition-colors duration-300" data-v-3007f915>${ssrInterpolate(legal.name)}</a>`);
      });
      _push(`<!--]--></div></div><div class="flex items-center space-x-4" data-v-3007f915><div class="flex items-center space-x-2" data-v-3007f915><span class="text-sm text-gray-400" data-v-3007f915>Certified by:</span><!--[-->`);
      ssrRenderList(certifications, (cert) => {
        _push(`<div class="flex items-center px-3 py-1 bg-sage-600/20 rounded-full" data-v-3007f915><div class="w-4 h-4 text-sage-300 mr-2" data-v-3007f915>${cert.icon ?? ""}</div><span class="text-xs text-sage-200 font-medium" data-v-3007f915>${ssrInterpolate(cert.name)}</span></div>`);
      });
      _push(`<!--]--></div></div></div></div></div><button style="${ssrRenderStyle(showBackToTop.value ? null : { display: "none" })}" class="fixed bottom-8 right-8 w-14 h-14 bg-sage-600 hover:bg-sage-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50" aria-label="Back to top" data-v-3007f915><svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3007f915><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" data-v-3007f915></path></svg></button></footer>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FooterSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const FooterSection = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3007f915"]]);
const _sfc_main = {
  __name: "HomePage",
  __ssrInlineRender: true,
  props: {
    canLogin: Boolean,
    canRegister: Boolean
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}>`);
      _push(ssrRenderComponent(NavBar, null, null, _parent));
      _push(ssrRenderComponent(HeroSection, null, null, _parent));
      _push(ssrRenderComponent(ServicesSection, null, null, _parent));
      _push(ssrRenderComponent(AboutSection, null, null, _parent));
      _push(ssrRenderComponent(ContactSection, null, null, _parent));
      _push(ssrRenderComponent(FooterSection, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/HomePage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
