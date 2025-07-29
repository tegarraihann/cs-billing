import { ref, computed, mergeProps, useSSRContext, onMounted, onUnmounted, reactive } from "vue";
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
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fixed w-full bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300" }, _attrs))} data-v-d7c87a44><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-d7c87a44><div class="flex justify-between items-center h-20" data-v-d7c87a44><div class="flex items-center cursor-pointer hover:scale-105 transition-transform duration-300" data-v-d7c87a44>`);
      _push(ssrRenderComponent(_sfc_main$8, {
        size: "medium",
        variant: "default",
        "show-tagline": false
      }, null, _parent));
      _push(`</div><div class="hidden md:block" data-v-d7c87a44><div class="ml-10 flex items-baseline space-x-8" data-v-d7c87a44><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(`<a${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([{ "text-sage-700 font-semibold": activeSection.value === item.href }, "text-gray-700 hover:text-sage-700 px-4 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer relative group"])}" data-v-d7c87a44>${ssrInterpolate(item.name)} <span class="${ssrRenderClass([{ "w-full": activeSection.value === item.href }, "absolute bottom-0 left-0 w-0 h-0.5 bg-sage-600 transition-all duration-300 group-hover:w-full"])}" data-v-d7c87a44></span></a>`);
      });
      _push(`<!--]--></div></div><div class="hidden md:block" data-v-d7c87a44><button class="bg-sage-600 hover:bg-sage-700 text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" data-v-d7c87a44> Hubungi Kami </button></div><div class="md:hidden" data-v-d7c87a44><button class="text-gray-700 hover:text-sage-700 focus:outline-none focus:text-sage-700 p-2" data-v-d7c87a44><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-d7c87a44>`);
      if (!mobileMenuOpen.value) {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-d7c87a44></path>`);
      } else {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-d7c87a44></path>`);
      }
      _push(`</svg></button></div></div></div><div style="${ssrRenderStyle(mobileMenuOpen.value ? null : { display: "none" })}" class="md:hidden bg-white border-t border-sage-100" data-v-d7c87a44><div class="px-2 pt-2 pb-3 space-y-1" data-v-d7c87a44><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(`<a${ssrRenderAttr("href", item.href)} class="text-gray-700 hover:text-sage-700 block px-4 py-3 text-base font-medium cursor-pointer rounded-lg hover:bg-sage-50 transition-colors duration-200" data-v-d7c87a44>${ssrInterpolate(item.name)}</a>`);
      });
      _push(`<!--]--><button class="w-full mt-4 bg-sage-600 hover:bg-sage-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300" data-v-d7c87a44> Konsultasi Gratis </button></div></div></nav>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/homePage/Navbar.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const NavBar = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-d7c87a44"]]);
const _sfc_main$6 = {
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "home",
        class: "relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      }, _attrs))} data-v-f86c70a7><div class="absolute inset-0" data-v-f86c70a7><img src="/images/background-hero.jpg" alt="Hero Background" class="w-full h-full object-cover" loading="lazy" data-v-f86c70a7><div class="absolute inset-0 bg-gradient-to-br from-black/80 via-gray-900/75 to-sage-900/80" data-v-f86c70a7></div></div><div class="absolute inset-0 opacity-20" data-v-f86c70a7><div class="absolute inset-0" style="${ssrRenderStyle({ "background-image": "radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)", "background-size": "40px 40px" })}" data-v-f86c70a7></div></div><div class="absolute inset-0 overflow-hidden" data-v-f86c70a7><div class="floating-element absolute top-20 left-10 w-64 h-64 bg-sage-400/20 rounded-full blur-3xl" data-v-f86c70a7></div><div class="floating-element absolute bottom-20 right-10 w-96 h-96 bg-sage-500/15 rounded-full blur-3xl" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-f86c70a7></div><div class="floating-element absolute top-1/2 left-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-f86c70a7></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-f86c70a7><div class="grid lg:grid-cols-2 gap-16 items-center" data-v-f86c70a7><div class="text-center lg:text-left" data-v-f86c70a7><div class="inline-flex items-center px-8 py-4 mb-10 bg-white backdrop-blur-md rounded-full shadow-2xl animate-fade-in-down border border-sage-200" data-v-f86c70a7><div class="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse shadow-lg shadow-green-500/50" data-v-f86c70a7></div><span class="text-base font-bold text-gray-800" data-v-f86c70a7>Terpercaya sejak 2015</span><svg class="w-5 h-5 ml-3 text-sage-600" fill="currentColor" viewBox="0 0 20 20" data-v-f86c70a7><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812z" clip-rule="evenodd" data-v-f86c70a7></path></svg></div><h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in-up leading-tight" data-v-f86c70a7><span class="text-white drop-shadow-lg" data-v-f86c70a7>Eshaka Wijaya</span><br data-v-f86c70a7><span class="text-transparent bg-clip-text bg-gradient-to-r from-sage-300 via-sage-400 to-sage-300 drop-shadow-lg animate-gradient" data-v-f86c70a7> Global Logistics </span></h1><p class="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up leading-relaxed drop-shadow" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}" data-v-f86c70a7> Solusi terpercaya untuk kebutuhan ekspor-impor dan logistik internasional Anda dengan layanan profesional dan berpengalaman. </p><div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-f86c70a7><button class="group relative bg-sage-500 hover:bg-sage-600 text-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" data-v-f86c70a7><span class="relative z-10" data-v-f86c70a7>Konsultasi Gratis</span></button><button class="group bg-white/90 backdrop-blur-sm text-gray-800 hover:bg-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" data-v-f86c70a7> Lihat Layanan </button></div></div></div></div><div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" data-v-f86c70a7><div class="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center backdrop-blur-sm" data-v-f86c70a7><div class="w-1.5 h-4 bg-white rounded-full mt-2 animate-pulse" data-v-f86c70a7></div></div></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/HeroSection.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const HeroSection = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-f86c70a7"]]);
const _sfc_main$5 = {
  __name: "ServicesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const exportImportFeatures = [
      "Customs Clearance & Documentation",
      "Door-to-Door Delivery Service",
      "Real-time Shipment Tracking",
      "Expert Consultation & Support",
      "Competitive Pricing"
    ];
    const otherServices = [
      {
        title: "Trucking Inland",
        description: "Pengiriman darat ke seluruh Indonesia dengan armada terawat dan tracking real-time.",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z"/></svg>',
        iconBg: "bg-gray-400",
        backgroundImage: "/images/trucking-bgg.jpg",
        fallbackBg: "bg-gray-50"
      },
      {
        title: "Transfer Uang",
        description: "Transfer internasional dengan kurs kompetitif dan proses cepat ke seluruh dunia.",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/></svg>',
        iconBg: "bg-sage-500",
        backgroundImage: "/images/exportt.jpg",
        fallbackBg: "bg-sage-50"
      },
      {
        title: "Asuransi Barang",
        description: "Proteksi lengkap untuk kiriman dengan coverage komprehensif dan klaim mudah.",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>',
        iconBg: "bg-amber-500",
        backgroundImage: "/images/insurancee.jpg",
        fallbackBg: "bg-amber-50"
      }
    ];
    const additionalServices = [
      {
        title: "Warehousing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        backgroundImage: "/images/warehouse.jpg",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/></svg>'
      },
      {
        title: "Packaging",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        backgroundImage: "/images/packaging.jpg",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"/></svg>'
      },
      {
        title: "Cargo Service",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        backgroundImage: "/images/cargo-service.jpg",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/></svg>'
      },
      {
        title: "Stuffing/Stripping",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        backgroundImage: "/images/stuffing.jpg",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 2a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 4a1 1 0 100 2h6a1 1 0 100-2H7zm0 3a1 1 0 100 2h3a1 1 0 100-2H7z"/></svg>'
      },
      {
        title: "Cold Chain",
        description: "Sistem rantai dingin untuk menjaga kualitas produk yang memerlukan suhu terkontrol",
        backgroundImage: "/images/coldchain.jpg",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-2.019 1 1 0 01-.285-1.05l1.715-5.349L11 7.618V9a1 1 0 11-2 0V7.618L6.237 6.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-2.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"/></svg>'
      },
      {
        title: "Freight Forwarding",
        description: "Koordinasi pengiriman multimoda dengan jaringan global untuk efisiensi maksimal",
        backgroundImage: "/images/freight.jpg",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>'
      }
    ];
    const currentSlide = ref(0);
    const slidesPerView = ref(3);
    const totalSlides = computed(() => {
      return Math.ceil(additionalServices.length / slidesPerView.value);
    });
    const nextSlide = () => {
      if (currentSlide.value < totalSlides.value - 1) {
        currentSlide.value++;
      }
    };
    const updateSlidesPerView = () => {
      if (window.innerWidth < 768) {
        slidesPerView.value = 1;
      } else if (window.innerWidth < 1024) {
        slidesPerView.value = 2;
      } else {
        slidesPerView.value = 3;
      }
      if (currentSlide.value >= totalSlides.value) {
        currentSlide.value = Math.max(0, totalSlides.value - 1);
      }
    };
    let autoSlideInterval = null;
    const startAutoSlide = () => {
      autoSlideInterval = setInterval(() => {
        if (currentSlide.value >= totalSlides.value - 1) {
          currentSlide.value = 0;
        } else {
          nextSlide();
        }
      }, 5e3);
    };
    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    };
    onMounted(() => {
      updateSlidesPerView();
      window.addEventListener("resize", updateSlidesPerView);
      startAutoSlide();
    });
    onUnmounted(() => {
      window.removeEventListener("resize", updateSlidesPerView);
      stopAutoSlide();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "services",
        class: "py-20 bg-white relative overflow-hidden"
      }, _attrs))} data-v-061791d0><div class="absolute top-0 right-0 w-96 h-96 bg-sage-100/30 rounded-full blur-3xl" data-v-061791d0></div><div class="absolute bottom-0 left-0 w-80 h-80 bg-sage-100/20 rounded-full blur-3xl" data-v-061791d0></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" data-v-061791d0><div class="text-center mb-16" data-v-061791d0><div class="inline-flex items-center px-4 py-2 bg-sage-50 text-sage-700 rounded-full text-sm font-medium mb-4" data-v-061791d0><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-061791d0><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-061791d0></path></svg> Layanan Profesional </div><h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-4" data-v-061791d0> Solusi Logistik Terlengkap </h2><p class="text-base text-gray-600 max-w-2xl mx-auto" data-v-061791d0> Dengan pengalaman lebih dari 15 tahun, kami menyediakan layanan logistik berkualitas tinggi dengan standar internasional. </p></div><div class="grid lg:grid-cols-2 gap-8 mb-20" data-v-061791d0><div class="lg:row-span-2 bg-sage-50/50 rounded-xl p-8 shadow-md transition-all duration-300" data-v-061791d0><div class="flex items-center mb-6" data-v-061791d0><div class="w-12 h-12 bg-sage-600 rounded-lg flex items-center justify-center mr-4 hover:scale-105 transition-transform duration-200" data-v-061791d0><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-061791d0><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" data-v-061791d0></path></svg></div><div class="bg-sage-600 text-white px-3 py-1 rounded-full text-xs font-medium" data-v-061791d0> Unggulan </div></div><h3 class="text-2xl font-semibold text-gray-800 mb-3" data-v-061791d0> Export &amp; Import </h3><p class="text-gray-600 mb-6 leading-relaxed" data-v-061791d0> Layanan ekspor impor lengkap dengan handling dokumen, customs clearance, dan koordinasi dengan berbagai pihak terkait. </p><div class="space-y-3 mb-8" data-v-061791d0><!--[-->`);
      ssrRenderList(exportImportFeatures, (feature) => {
        _push(`<div class="flex items-start" data-v-061791d0><div class="w-5 h-5 bg-sage-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0" data-v-061791d0><svg class="w-3 h-3 text-sage-600" fill="currentColor" viewBox="0 0 20 20" data-v-061791d0><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" data-v-061791d0></path></svg></div><span class="text-gray-700 text-sm" data-v-061791d0>${ssrInterpolate(feature)}</span></div>`);
      });
      _push(`<!--]--></div><button class="w-full bg-sage-600 hover:bg-sage-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:shadow-sm" data-v-061791d0> Konsultasi Export Import </button></div><div class="space-y-6" data-v-061791d0><!--[-->`);
      ssrRenderList(otherServices, (service) => {
        _push(`<div class="relative bg-white rounded-xl p-6 border border-gray-100 hover:border-sage-200 hover:shadow-sm transition-all duration-200 overflow-hidden group" data-v-061791d0><div style="${ssrRenderStyle(`background-image: url('${service.backgroundImage}'); background-size: cover; background-position: center;`)}" class="${ssrRenderClass([service.fallbackBg, "absolute inset-0"])}" data-v-061791d0><div class="absolute inset-0 bg-white/90 group-hover:bg-white/85 transition-all duration-300" data-v-061791d0></div></div><div class="relative flex items-start" data-v-061791d0><div class="${ssrRenderClass([service.iconBg, "w-10 h-10 rounded-lg flex items-center justify-center mr-4 hover:scale-105 transition-transform duration-200"])}" data-v-061791d0><div class="w-5 h-5 text-white" data-v-061791d0>${service.icon ?? ""}</div></div><div class="flex-1" data-v-061791d0><h4 class="text-lg font-semibold text-gray-800 mb-2" data-v-061791d0>${ssrInterpolate(service.title)}</h4><p class="text-sm text-gray-600 leading-relaxed" data-v-061791d0>${ssrInterpolate(service.description)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="text-center" data-v-061791d0><h3 class="text-xl font-semibold text-gray-800 mb-8" data-v-061791d0> Layanan Pendukung </h3><div class="relative" data-v-061791d0><div class="overflow-hidden rounded-xl" data-v-061791d0><div class="flex transition-transform duration-500 ease-in-out" style="${ssrRenderStyle(`transform: translateX(-${currentSlide.value * (100 / slidesPerView.value)}%)`)}" data-v-061791d0><!--[-->`);
      ssrRenderList(additionalServices, (addon, index) => {
        _push(`<div class="${ssrRenderClass([slidesPerView.value === 1 ? "w-full" : slidesPerView.value === 2 ? "w-1/2" : "w-1/3", "relative flex-shrink-0 h-64 group cursor-pointer overflow-hidden rounded-lg mx-2"])}" style="${ssrRenderStyle(`background-image: url('${addon.backgroundImage}'); background-size: cover; background-position: center;`)}" data-v-061791d0><div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" data-v-061791d0></div><div class="absolute inset-0 flex flex-col justify-end p-6 text-white" data-v-061791d0><div class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-4 group-hover:bg-sage-800 transition-all duration-300" data-v-061791d0><div class="w-6 h-6 text-white" data-v-061791d0>${addon.icon ?? ""}</div></div><h4 class="text-xl font-semibold mb-2 transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300" data-v-061791d0>${ssrInterpolate(addon.title)}</h4><p class="text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-gray-200" data-v-061791d0>${ssrInterpolate(addon.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="flex justify-between items-center mt-6" data-v-061791d0><button${ssrIncludeBooleanAttr(currentSlide.value === 0) ? " disabled" : ""} class="w-10 h-10 bg-sage-100 hover:bg-sage-200 disabled:bg-gray-100 disabled:text-gray-400 text-sage-600 rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed" data-v-061791d0><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" data-v-061791d0><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" data-v-061791d0></path></svg></button><div class="flex space-x-2" data-v-061791d0><!--[-->`);
      ssrRenderList(totalSlides.value, (slide, index) => {
        _push(`<button class="${ssrRenderClass([currentSlide.value === index ? "bg-sage-600 w-6" : "bg-gray-300 hover:bg-sage-300", "w-2 h-2 rounded-full transition-all duration-200"])}" data-v-061791d0></button>`);
      });
      _push(`<!--]--></div><button${ssrIncludeBooleanAttr(currentSlide.value >= totalSlides.value - 1) ? " disabled" : ""} class="w-10 h-10 bg-sage-100 hover:bg-sage-200 disabled:bg-gray-100 disabled:text-gray-400 text-sage-600 rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed" data-v-061791d0><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" data-v-061791d0><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" data-v-061791d0></path></svg></button></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ServicesSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ServicesSection = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-061791d0"]]);
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
          container: props.layout === "horizontal" ? "space-x-6" : "space-y-2",
          textContainer: "flex flex-col",
          title: "text-xl font-bold text-gray-800",
          description: "text-sm text-gray-600 mt-2"
        },
        medium: {
          photoContainer: "w-80 h-auto",
          photo: "w-full h-auto",
          container: props.layout === "horizontal" ? "space-x-8" : "space-y-3",
          textContainer: "flex flex-col max-w-md",
          title: "text-2xl font-bold text-gray-800",
          description: "text-base text-gray-600 mt-3"
        },
        large: {
          photoContainer: "w-96 h-auto",
          photo: "w-full h-auto",
          container: props.layout === "horizontal" ? "space-x-10" : "space-y-4",
          textContainer: "flex flex-col max-w-lg",
          title: "text-3xl font-bold text-gray-800",
          description: "text-lg text-gray-600 mt-4 leading-relaxed"
        },
        xl: {
          photoContainer: "w-auto h-auto max-w-2xl",
          photo: "w-full h-auto",
          container: props.layout === "horizontal" ? "space-x-12" : "space-y-4",
          textContainer: "flex flex-col max-w-xl",
          title: "text-4xl font-bold text-gray-800",
          description: "text-xl text-gray-600 mt-4 leading-relaxed"
        },
        full: {
          photoContainer: "w-full max-w-4xl h-auto",
          photo: "w-full h-auto",
          container: props.layout === "horizontal" ? "space-x-16" : "space-y-6",
          textContainer: "flex flex-col max-w-2xl",
          title: "text-5xl font-bold text-gray-800",
          description: "text-2xl text-gray-600 mt-6 leading-relaxed"
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
      _push(`<!--[--><div class="${ssrRenderClass([containerClass.value, "flex items-center justify-center"])}" data-v-0f85f0cf><div class="relative group" data-v-0f85f0cf><div class="${ssrRenderClass([photoContainerClass.value, "relative overflow-hidden"])}" data-v-0f85f0cf><img${ssrRenderAttr("src", photoSrc.value)}${ssrRenderAttr("alt", altText.value)} class="${ssrRenderClass([photoClass.value, "object-cover object-center transition-transform duration-700 group-hover:scale-105"])}" data-v-0f85f0cf><div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-v-0f85f0cf></div>`);
      if (__props.showOverlay) {
        _push(`<div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" data-v-0f85f0cf><h3 class="text-2xl font-bold mb-2" data-v-0f85f0cf>${ssrInterpolate(__props.teamTitle)}</h3><p class="text-sm opacity-90" data-v-0f85f0cf>${ssrInterpolate(__props.teamDescription)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.showDecorative) {
        _push(`<div class="absolute -top-4 -right-4 w-8 h-8 bg-sage-600 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" data-v-0f85f0cf></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.showDecorative) {
        _push(`<div class="absolute -bottom-4 -left-4 w-6 h-6 bg-sage-400 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300" data-v-0f85f0cf></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.showText && __props.layout === "horizontal") {
        _push(`<div class="${ssrRenderClass(textContainerClass.value)}" data-v-0f85f0cf><h3 class="${ssrRenderClass(titleClass.value)}" data-v-0f85f0cf>${ssrInterpolate(__props.teamTitle)}</h3><p class="${ssrRenderClass(descriptionClass.value)}" data-v-0f85f0cf>${ssrInterpolate(__props.teamDescription)}</p>`);
        if (__props.showStats) {
          _push(`<div class="grid grid-cols-2 gap-4 mt-6" data-v-0f85f0cf><!--[-->`);
          ssrRenderList(teamStats.value, (stat) => {
            _push(`<div class="text-center" data-v-0f85f0cf><div class="text-2xl font-bold text-sage-700" data-v-0f85f0cf>${ssrInterpolate(stat.value)}</div><div class="text-sm text-gray-600" data-v-0f85f0cf>${ssrInterpolate(stat.label)}</div></div>`);
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
        _push(`<div class="text-center mt-4" data-v-0f85f0cf><h3 class="${ssrRenderClass(titleClass.value)}" data-v-0f85f0cf>${ssrInterpolate(__props.teamTitle)}</h3><p class="${ssrRenderClass(descriptionClass.value)}" data-v-0f85f0cf>${ssrInterpolate(__props.teamDescription)}</p>`);
        if (__props.showStats) {
          _push(`<div class="grid grid-cols-4 gap-4 mt-6 max-w-2xl mx-auto" data-v-0f85f0cf><!--[-->`);
          ssrRenderList(teamStats.value, (stat) => {
            _push(`<div class="text-center" data-v-0f85f0cf><div class="text-xl font-bold text-sage-700" data-v-0f85f0cf>${ssrInterpolate(stat.value)}</div><div class="text-xs text-gray-600" data-v-0f85f0cf>${ssrInterpolate(stat.label)}</div></div>`);
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
const Team = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-0f85f0cf"]]);
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
      // {
      //     title: 'Pengalaman 15+ Tahun',
      //     description: 'Melayani ekspor-impor dan logistik dengan track record yang terpercaya dan profesional'
      // },
      // {
      //     title: 'Jaringan Global',
      //     description: 'Kemitraan dengan 50+ negara untuk memfasilitasi perdagangan internasional yang efisien'
      // },
      // {
      //     title: 'Teknologi Modern',
      //     description: 'Sistem tracking real-time dan digitalisasi proses untuk efisiensi maksimal dan transparansi'
      // },
      // {
      //     title: 'Tim Profesional',
      //     description: 'Didukung oleh experts bersertifikat internasional di bidang logistik dan perdagangan'
      // }
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
      }, _attrs))} data-v-d741d61d><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-d741d61d><div class="text-center mb-20" data-v-d741d61d><div class="inline-flex items-center px-4 py-2 bg-white border border-sage-200 text-sage-700 rounded-full text-sm font-semibold mb-6" data-v-d741d61d><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-d741d61d><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" data-v-d741d61d></path></svg> Sertifikat Resmi &amp; Terpercaya </div><h2 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6" data-v-d741d61d> Tentang Eshaka Wijaya Logistics </h2><p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-v-d741d61d> Berpengalaman lebih dari 15 tahun dalam industri logistik Indonesia, kami hadir sebagai mitra terpercaya untuk solusi perdagangan internasional yang efisien dan profesional. </p></div><div class="grid lg:grid-cols-2 gap-16 items-center mb-24" data-v-d741d61d><div data-v-d741d61d><h3 class="text-3xl font-bold text-gray-800 mb-6" data-v-d741d61d> Mitra Logistik Terpercaya <span class="text-sage-600" data-v-d741d61d>Sejak 2015</span></h3><p class="text-lg text-gray-600 mb-8 leading-relaxed" data-v-d741d61d> Eshaka Wijaya Logistics didirikan dengan visi menjadi perusahaan logistik terdepan di Indonesia. Kami menyediakan layanan ekspor-impor, trucking inland, transfer uang internasional, dan asuransi barang dengan standar kualitas internasional yang terpercaya. </p><div class="space-y-6 mb-10" data-v-d741d61d><!--[-->`);
      ssrRenderList(keyPoints, (point) => {
        _push(`<div class="flex items-start group" data-v-d741d61d><div class="w-12 h-12 bg-sage-600 rounded-xl flex items-center justify-center flex-shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300" data-v-d741d61d><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-d741d61d><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" data-v-d741d61d></path></svg></div><div data-v-d741d61d><h4 class="text-lg font-bold text-gray-800 mb-2" data-v-d741d61d>${ssrInterpolate(point.title)}</h4><p class="text-gray-600 leading-relaxed" data-v-d741d61d>${ssrInterpolate(point.description)}</p></div></div>`);
      });
      _push(`<!--]--></div><button class="bg-sage-600 hover:bg-sage-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" data-v-d741d61d> Konsultasi Sekarang </button></div><div class="relative" data-v-d741d61d><div class="bg-white rounded-3xl p-8 shadow-xl border border-sage-100" data-v-d741d61d><div class="grid grid-cols-2 gap-6 mb-8" data-v-d741d61d><!--[-->`);
      ssrRenderList(companyStats, (stat) => {
        _push(`<div class="text-center p-6 bg-sage-50 rounded-2xl hover:bg-sage-100 transition-colors duration-300" data-v-d741d61d><div class="text-3xl font-bold text-sage-700 mb-2" data-v-d741d61d>${ssrInterpolate(stat.value)}</div><div class="text-gray-600 font-medium text-sm" data-v-d741d61d>${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div><div class="space-y-4" data-v-d741d61d><!--[-->`);
      ssrRenderList(achievements, (achievement) => {
        _push(`<div class="flex items-center p-4 bg-sage-50 rounded-xl border border-sage-100 hover:bg-sage-100 transition-colors duration-300" data-v-d741d61d><div class="w-12 h-12 bg-sage-600 rounded-xl flex items-center justify-center mr-4" data-v-d741d61d><div class="w-6 h-6 text-white" data-v-d741d61d>${achievement.icon ?? ""}</div></div><div data-v-d741d61d><h4 class="font-bold text-gray-800" data-v-d741d61d>${ssrInterpolate(achievement.title)}</h4><p class="text-sm text-gray-600" data-v-d741d61d>${ssrInterpolate(achievement.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="absolute -top-6 -right-6 w-24 h-24 bg-sage-200 rounded-full opacity-30" data-v-d741d61d></div><div class="absolute -bottom-4 -left-4 w-16 h-16 bg-sage-300 rounded-full opacity-20" data-v-d741d61d></div></div></div><div class="grid md:grid-cols-2 gap-12 mb-24" data-v-d741d61d><div class="bg-white rounded-3xl p-8 shadow-lg border border-sage-100 hover:shadow-xl transition-all duration-300" data-v-d741d61d><div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mb-6" data-v-d741d61d><svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-d741d61d><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" data-v-d741d61d></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" data-v-d741d61d></path></svg></div><h3 class="text-2xl font-bold text-gray-800 mb-4" data-v-d741d61d>Visi Kami</h3><p class="text-gray-600 leading-relaxed" data-v-d741d61d> Menjadi perusahaan logistik terdepan di Indonesia yang menghubungkan bisnis lokal dengan pasar global, memberikan solusi terpadu yang efisien, inovatif, dan berkelanjutan untuk mendukung pertumbuhan ekonomi nasional. </p></div><div class="bg-white rounded-3xl p-8 shadow-lg border border-sage-100 hover:shadow-xl transition-all duration-300" data-v-d741d61d><div class="w-16 h-16 bg-gray-600 rounded-2xl flex items-center justify-center mb-6" data-v-d741d61d><svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" data-v-d741d61d><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" data-v-d741d61d></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" data-v-d741d61d></path></svg></div><h3 class="text-2xl font-bold text-gray-800 mb-4" data-v-d741d61d>Misi Kami</h3><div class="space-y-3 text-gray-600" data-v-d741d61d><div class="flex items-start" data-v-d741d61d><svg class="w-5 h-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" data-v-d741d61d><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" data-v-d741d61d></path></svg> Menyediakan layanan logistik berkualitas tinggi dengan teknologi terdepan </div><div class="flex items-start" data-v-d741d61d><svg class="w-5 h-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" data-v-d741d61d><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" data-v-d741d61d></path></svg> Membangun jaringan distribusi yang reliable dan efisien </div><div class="flex items-start" data-v-d741d61d><svg class="w-5 h-5 text-sage-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" data-v-d741d61d><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" data-v-d741d61d></path></svg> Mengembangkan SDM profesional dengan komitmen pelayanan prima </div></div></div></div><div class="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-sage-100" data-v-d741d61d><div class="text-center mb-8" data-v-d741d61d><h3 class="text-3xl font-bold text-gray-800 mb-4" data-v-d741d61d> Tim Profesional Kami </h3><p class="text-gray-600 max-w-3xl mx-auto leading-relaxed" data-v-d741d61d> Dipimpin oleh para profesional berpengalaman di industri logistik dan perdagangan internasional dengan komitmen tinggi terhadap kepuasan pelanggan. Tim kami yang solid dan berpengalaman siap memberikan pelayanan terbaik untuk kebutuhan logistik Anda. </p></div><div class="flex justify-center mb-12" data-v-d741d61d>`);
      _push(ssrRenderComponent(Team, {
        size: "xl",
        layout: "vertical",
        "show-text": false,
        "show-overlay": true,
        "show-stats": true,
        "team-title": "Tim Expert Logistics",
        "team-description": "Profesional berpengalaman dengan dedikasi tinggi dalam melayani kebutuhan logistik internasional Anda."
      }, null, _parent));
      _push(`</div><div class="grid md:grid-cols-3 gap-8" data-v-d741d61d><!--[-->`);
      ssrRenderList(teamHighlights, (highlight) => {
        _push(`<div class="text-center p-6 bg-sage-50 rounded-2xl hover:bg-sage-100 transition-colors duration-300" data-v-d741d61d><div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mx-auto mb-4" data-v-d741d61d><div class="w-8 h-8 text-white" data-v-d741d61d>${highlight.icon ?? ""}</div></div><h4 class="text-lg font-bold text-gray-800 mb-3" data-v-d741d61d>${ssrInterpolate(highlight.title)}</h4><p class="text-gray-600 text-sm leading-relaxed" data-v-d741d61d>${ssrInterpolate(highlight.description)}</p></div>`);
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
const AboutSection = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d741d61d"]]);
const _sfc_main$2 = {
  __name: "ContactSection",
  __ssrInlineRender: true,
  setup(__props) {
    const form = reactive({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    });
    const isSubmitting = ref(false);
    const offices = [
      {
        id: 1,
        name: "Kantor Pusat Jakarta",
        address: "Ruko Aerohub, Citra 8, C7-10, Jakarta, Indonesia 11830",
        phone: "+62 21 2555-5555",
        email: "ewilog@example.com"
      }
      //   {
      //     id: 2,
      //     name: 'Cabang Surabaya',
      //     address: 'Jl. Raya Darmo 68-70, Darmo, Surabaya 60264',
      //     phone: '+62 31 8765-4321',
      //     email: 'surabaya@eshakawijaya.com'
      //   },
      //   {
      //     id: 3,
      //     name: 'Cabang Medan',
      //     address: 'Jl. Asia Baru No. 88, Sei Agul, Medan 20214',
      //     phone: '+62 61 4567-8901',
      //     email: 'medan@eshakawijaya.com'
      //   }
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
        class: "py-24 bg-sage-900"
      }, _attrs))} data-v-f9697404><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-f9697404><div class="text-center mb-20" data-v-f9697404><div class="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-semibold mb-6" data-v-f9697404><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-f9697404><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" data-v-f9697404></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" data-v-f9697404></path></svg> Hubungi Tim Profesional Kami </div><h2 class="text-4xl md:text-5xl font-bold text-white mb-6" data-v-f9697404> Mari Diskusikan Kebutuhan Anda </h2><p class="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed" data-v-f9697404> Tim ahli kami siap membantu memberikan solusi logistik terbaik untuk bisnis Anda dengan layanan 24/7 </p></div><div class="grid lg:grid-cols-2 gap-8 lg:gap-16" data-v-f9697404><div class="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-2xl border border-white/20" data-v-f9697404><h3 class="text-2xl font-bold text-white mb-6 md:mb-8" data-v-f9697404>Kirim Pesan Anda</h3><form class="space-y-6" data-v-f9697404><div class="grid md:grid-cols-2 gap-4 md:gap-6" data-v-f9697404><div data-v-f9697404><label class="block text-sm font-semibold text-white/90 mb-3" data-v-f9697404>Nama Lengkap *</label><input${ssrRenderAttr("value", form.name)} type="text" required class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm" placeholder="Masukkan nama lengkap" data-v-f9697404></div><div data-v-f9697404><label class="block text-sm font-semibold text-white/90 mb-3" data-v-f9697404>Email *</label><input${ssrRenderAttr("value", form.email)} type="email" required class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm" placeholder="contoh@email.com" data-v-f9697404></div></div><div class="grid md:grid-cols-2 gap-4 md:gap-6" data-v-f9697404><div data-v-f9697404><label class="block text-sm font-semibold text-white/90 mb-3" data-v-f9697404>Nomor Telepon *</label><input${ssrRenderAttr("value", form.phone)} type="tel" required class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm" placeholder="+62 8xx xxxx xxxx" data-v-f9697404></div><div data-v-f9697404><label class="block text-sm font-semibold text-white/90 mb-3" data-v-f9697404>Layanan yang Diminati</label><select class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm" data-v-f9697404><option value="" class="text-gray-900" data-v-f9697404${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "") : ssrLooseEqual(form.service, "")) ? " selected" : ""}>Pilih layanan</option><option value="export-import" class="text-gray-900" data-v-f9697404${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "export-import") : ssrLooseEqual(form.service, "export-import")) ? " selected" : ""}>Export/Import</option><option value="trucking" class="text-gray-900" data-v-f9697404${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "trucking") : ssrLooseEqual(form.service, "trucking")) ? " selected" : ""}>Trucking Inland</option><option value="money-transfer" class="text-gray-900" data-v-f9697404${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "money-transfer") : ssrLooseEqual(form.service, "money-transfer")) ? " selected" : ""}>Transfer Uang</option><option value="insurance" class="text-gray-900" data-v-f9697404${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "insurance") : ssrLooseEqual(form.service, "insurance")) ? " selected" : ""}>Asuransi Barang</option><option value="warehousing" class="text-gray-900" data-v-f9697404${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "warehousing") : ssrLooseEqual(form.service, "warehousing")) ? " selected" : ""}>Warehousing</option><option value="consulting" class="text-gray-900" data-v-f9697404${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "consulting") : ssrLooseEqual(form.service, "consulting")) ? " selected" : ""}>Consulting</option></select></div></div><div data-v-f9697404><label class="block text-sm font-semibold text-white/90 mb-3" data-v-f9697404>Pesan Anda *</label><textarea required rows="5" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm resize-none" placeholder="Jelaskan kebutuhan spesifik Anda..." data-v-f9697404>${ssrInterpolate(form.message)}</textarea></div><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="w-full bg-white text-sage-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" data-v-f9697404>`);
      if (!isSubmitting.value) {
        _push(`<span data-v-f9697404>Kirim Pesan</span>`);
      } else {
        _push(`<span class="flex items-center justify-center" data-v-f9697404><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-sage-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-f9697404><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-f9697404></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-f9697404></path></svg> Mengirim... </span>`);
      }
      _push(`</button></form></div><div class="space-y-8" data-v-f9697404><div class="grid gap-6" data-v-f9697404><!--[-->`);
      ssrRenderList(offices, (office) => {
        _push(`<div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300" data-v-f9697404><h4 class="text-lg font-bold text-white mb-4" data-v-f9697404>${ssrInterpolate(office.name)}</h4><div class="space-y-3" data-v-f9697404><div class="flex items-start" data-v-f9697404><svg class="w-5 h-5 text-white/80 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20" data-v-f9697404><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" data-v-f9697404></path></svg><span class="text-white/90 text-sm leading-relaxed" data-v-f9697404>${ssrInterpolate(office.address)}</span></div><div class="flex items-center" data-v-f9697404><svg class="w-5 h-5 text-white/80 mr-3" fill="currentColor" viewBox="0 0 20 20" data-v-f9697404><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" data-v-f9697404></path></svg><span class="text-white font-medium text-sm" data-v-f9697404>${ssrInterpolate(office.phone)}</span></div><div class="flex items-center" data-v-f9697404><svg class="w-5 h-5 text-white/80 mr-3" fill="currentColor" viewBox="0 0 20 20" data-v-f9697404><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" data-v-f9697404></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" data-v-f9697404></path></svg><span class="text-white font-medium text-sm break-all" data-v-f9697404>${ssrInterpolate(office.email)}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20" data-v-f9697404><h4 class="text-xl font-bold text-white mb-6" data-v-f9697404>Mengapa Memilih Kami?</h4><div class="space-y-4" data-v-f9697404><!--[-->`);
      ssrRenderList(whyChooseUs, (reason) => {
        _push(`<div class="flex items-start group" data-v-f9697404><div class="w-2 h-2 bg-white rounded-full mt-2 mr-4 group-hover:scale-125 transition-transform duration-300" data-v-f9697404></div><div data-v-f9697404><h5 class="font-semibold text-white text-sm mb-1" data-v-f9697404>${ssrInterpolate(reason.title)}</h5><p class="text-white/80 text-xs leading-relaxed" data-v-f9697404>${ssrInterpolate(reason.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ContactSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ContactSection = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-f9697404"]]);
const _sfc_main$1 = {
  __name: "FooterSection",
  __ssrInlineRender: true,
  setup(__props) {
    ref("");
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
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gray-800 text-white" }, _attrs))} data-v-aee3f98d><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" data-v-aee3f98d><div class="grid lg:grid-cols-4 md:grid-cols-2 gap-12" data-v-aee3f98d><div class="lg:col-span-1" data-v-aee3f98d><div class="mb-6" data-v-aee3f98d>`);
      _push(ssrRenderComponent(_sfc_main$8, {
        size: "large",
        "show-text": false,
        "show-tagline": false
      }, null, _parent));
      _push(`</div><p class="text-gray-300 mb-8 leading-relaxed" data-v-aee3f98d> Solusi logistik terpercaya untuk ekspor-impor, trucking inland, transfer uang internasional, dan asuransi barang kiriman dengan standar profesional tinggi sejak 2015. </p><div class="flex items-center space-x-2 mb-6" data-v-aee3f98d><div class="flex items-center px-3 py-1 bg-sage-600/20 rounded-full" data-v-aee3f98d><div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" data-v-aee3f98d></div><span class="text-sm text-sage-200" data-v-aee3f98d>Online 24/7</span></div><div class="flex items-center px-3 py-1 bg-sage-600/20 rounded-full" data-v-aee3f98d><svg class="w-3 h-3 text-sage-300 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-aee3f98d><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" data-v-aee3f98d></path></svg><span class="text-sm text-sage-200" data-v-aee3f98d>ISO Certified</span></div></div><div class="flex space-x-4" data-v-aee3f98d><!--[-->`);
      ssrRenderList(socialMedia, (social) => {
        _push(`<a${ssrRenderAttr("href", social.url)} target="_blank" class="${ssrRenderClass([social.hoverColor, "w-12 h-12 bg-white/10 hover:bg-sage-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"])}" data-v-aee3f98d><div class="w-5 h-5 text-gray-300 group-hover:text-white" data-v-aee3f98d>${social.icon ?? ""}</div></a>`);
      });
      _push(`<!--]--></div></div><div data-v-aee3f98d><h3 class="text-xl font-bold mb-8 text-white" data-v-aee3f98d>Layanan Kami</h3><ul class="space-y-4" data-v-aee3f98d><!--[-->`);
      ssrRenderList(services, (service) => {
        _push(`<li data-v-aee3f98d><a${ssrRenderAttr("href", service.link)} class="text-gray-300 hover:text-sage-300 transition-colors duration-300 flex items-start group cursor-pointer" data-v-aee3f98d><svg class="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-sage-600 group-hover:text-sage-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20" data-v-aee3f98d><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" data-v-aee3f98d></path></svg><span class="group-hover:translate-x-1 transition-transform duration-300" data-v-aee3f98d>${ssrInterpolate(service.name)}</span></a></li>`);
      });
      _push(`<!--]--></ul></div><div data-v-aee3f98d><h3 class="text-xl font-bold mb-8 text-white" data-v-aee3f98d>Menu Cepat</h3><ul class="space-y-4" data-v-aee3f98d><!--[-->`);
      ssrRenderList(quickLinks, (link) => {
        _push(`<li data-v-aee3f98d><a${ssrRenderAttr("href", link.url)} class="text-gray-300 hover:text-sage-300 transition-colors duration-300 flex items-start group cursor-pointer" data-v-aee3f98d><svg class="w-4 h-4 mr-3 mt-0.5 flex-shrink-0 text-sage-600 group-hover:text-sage-400 transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20" data-v-aee3f98d><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" data-v-aee3f98d></path></svg><span class="group-hover:translate-x-1 transition-transform duration-300" data-v-aee3f98d>${ssrInterpolate(link.name)}</span></a></li>`);
      });
      _push(`<!--]--></ul></div><div data-v-aee3f98d><h3 class="text-xl font-bold mb-8 text-white" data-v-aee3f98d>Hubungi Kami</h3><div class="space-y-6" data-v-aee3f98d><!--[-->`);
      ssrRenderList(contactInfo, (contact) => {
        _push(`<div class="group" data-v-aee3f98d><div class="flex items-start" data-v-aee3f98d><div class="w-12 h-12 bg-sage-600/20 rounded-xl flex items-center justify-center mr-4 mt-1 group-hover:bg-sage-600 transition-colors duration-300" data-v-aee3f98d><div class="w-5 h-5 text-sage-300 group-hover:text-white" data-v-aee3f98d>${contact.icon ?? ""}</div></div><div data-v-aee3f98d><div class="text-sm text-sage-300 mb-1 font-medium" data-v-aee3f98d>${ssrInterpolate(contact.type)}</div><div class="text-white font-semibold mb-1" data-v-aee3f98d>${ssrInterpolate(contact.value)}</div>`);
        if (contact.secondary) {
          _push(`<div class="text-sm text-gray-400" data-v-aee3f98d>${ssrInterpolate(contact.secondary)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="border-t border-gray-700/50 bg-gray-900/50" data-v-aee3f98d><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-v-aee3f98d><div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0" data-v-aee3f98d><div class="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6" data-v-aee3f98d><p class="text-gray-400 text-sm" data-v-aee3f98d> © ${ssrInterpolate(currentYear.value)} Eshaka Wijaya Logistics. All rights reserved. </p><div class="flex space-x-6" data-v-aee3f98d><!--[-->`);
      ssrRenderList(legalLinks, (legal) => {
        _push(`<a${ssrRenderAttr("href", legal.url)} class="text-gray-400 hover:text-sage-300 text-sm transition-colors duration-300" data-v-aee3f98d>${ssrInterpolate(legal.name)}</a>`);
      });
      _push(`<!--]--></div></div><div class="flex items-center space-x-4" data-v-aee3f98d><div class="flex items-center space-x-2" data-v-aee3f98d><span class="text-sm text-gray-400" data-v-aee3f98d>Certified by:</span><!--[-->`);
      ssrRenderList(certifications, (cert) => {
        _push(`<div class="flex items-center px-3 py-1 bg-sage-600/20 rounded-full" data-v-aee3f98d><div class="w-4 h-4 text-sage-300 mr-2" data-v-aee3f98d>${cert.icon ?? ""}</div><span class="text-xs text-sage-200 font-medium" data-v-aee3f98d>${ssrInterpolate(cert.name)}</span></div>`);
      });
      _push(`<!--]--></div></div></div></div></div><button style="${ssrRenderStyle(showBackToTop.value ? null : { display: "none" })}" class="fixed bottom-8 right-8 w-14 h-14 bg-sage-600 hover:bg-sage-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50" aria-label="Back to top" data-v-aee3f98d><svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-aee3f98d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" data-v-aee3f98d></path></svg></button></footer>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FooterSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const FooterSection = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-aee3f98d"]]);
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
