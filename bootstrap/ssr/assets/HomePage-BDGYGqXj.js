import { useSSRContext, ref, computed, onMounted, onUnmounted, mergeProps } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from "vue/server-renderer";
import "@inertiajs/vue3";
import { N as NavBar, A as AboutSection, C as ContactSection, F as FooterSection } from "./FooterSection-CmjA_NKP.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$4 = {
  setup(__props) {
    const props = __props;
    const imageError = ref(false);
    const logoSrc = computed(() => {
      if (imageError.value) {
        return null;
      }
      return "/images/logo/logo-hero.svg";
    });
    const sizeConfig = computed(() => {
      switch (props.size) {
        case "small":
          return "w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40";
        case "medium":
          return "w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56";
        case "large":
          return "w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72";
        case "xl":
          return "w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80";
        default:
          return "w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72";
      }
    });
    const logoClass = computed(() => sizeConfig.value);
    let ticking = false;
    const handleParallax = () => {
      if (!props.enableParallax || ticking) return;
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const logoElement = document.querySelector(".logo-parallax");
        if (logoElement) {
          const rate = scrolled * -0.2;
          logoElement.style.transform = `translateY(${rate}px)`;
        }
        ticking = false;
      });
      ticking = true;
    };
    onMounted(() => {
      if (props.enableParallax) {
        window.addEventListener("scroll", handleParallax, { passive: true });
      }
    });
    onUnmounted(() => {
      if (props.enableParallax) {
        window.removeEventListener("scroll", handleParallax);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "logo-parallax relative group" }, _attrs))} data-v-fbd73b38><div class="relative z-10 logo-float" data-v-fbd73b38><img${ssrRenderAttr("src", logoSrc.value)}${ssrRenderAttr("alt", __props.altText)} class="${ssrRenderClass([logoClass.value, "object-contain drop-shadow-xl transition-transform duration-300 hover:scale-105"])}" loading="eager" data-v-fbd73b38>`);
      if (imageError.value) {
        _push(`<div class="flex items-center justify-center text-white/70 text-lg font-medium" data-v-fbd73b38><svg class="w-16 h-16" fill="currentColor" viewBox="0 0 20 20" data-v-fbd73b38><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd" data-v-fbd73b38></path></svg></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/HeroLogo.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "home",
        class: "relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      }, _attrs))} data-v-1e2981da><div class="absolute inset-0" data-v-1e2981da><img src="/images/bg.jpg" alt="Hero Background" class="w-full h-full object-cover" loading="eager" decoding="async" fetchpriority="high" data-v-1e2981da><div class="absolute inset-0 bg-gradient-to-br from-black/85 via-primary-sage/60 via-secondary-sage/70 to-accent-sage/75" data-v-1e2981da></div><div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 via-black/20 to-transparent" data-v-1e2981da></div></div><div class="absolute inset-0 opacity-15" data-v-1e2981da><div class="absolute inset-0" style="${ssrRenderStyle({ "background-image": "radial-gradient(\n            circle at 2px 2px,\n            var(--pale-sage) 1px,\n            transparent 0\n          )", "background-size": "40px 40px" })}" data-v-1e2981da></div></div><div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-1e2981da><div class="absolute top-40 right-20 w-3 h-3 bg-secondary-sage/30 rotate-45 animate-pulse" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-1e2981da></div><div class="absolute top-60 right-32 w-2 h-2 bg-accent-sage/40 rounded-full animate-pulse" style="${ssrRenderStyle({ "animation-delay": "3s" })}" data-v-1e2981da></div><div class="absolute bottom-40 left-20 w-4 h-4 border border-light-sage/25 rotate-45 animate-pulse" style="${ssrRenderStyle({ "animation-delay": "5s" })}" data-v-1e2981da></div><div class="absolute bottom-60 left-32 w-2 h-8 bg-pale-sage/20 rounded-full animate-pulse" style="${ssrRenderStyle({ "animation-delay": "7s" })}" data-v-1e2981da></div></div><div class="absolute inset-0 overflow-hidden pointer-events-none" data-v-1e2981da><div class="floating-element absolute top-20 left-10 w-64 h-64 bg-light-sage/20 rounded-full blur-3xl" data-v-1e2981da></div><div class="floating-element absolute bottom-20 right-10 w-80 h-80 bg-accent-sage/15 rounded-full blur-3xl" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-1e2981da></div><div class="floating-element absolute top-1/3 right-1/4 w-48 h-48 bg-secondary-sage/12 rounded-full blur-2xl" style="${ssrRenderStyle({ "animation-delay": "4s" })}" data-v-1e2981da></div><div class="floating-element absolute bottom-1/3 left-1/3 w-56 h-56 bg-pale-sage/18 rounded-full blur-3xl" style="${ssrRenderStyle({ "animation-delay": "6s" })}" data-v-1e2981da></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-1e2981da><div class="grid lg:grid-cols-2 gap-16 items-center" data-v-1e2981da><div class="text-center lg:text-left" data-v-1e2981da><div class="inline-flex items-center px-8 py-4 mb-10 bg-white/95 backdrop-blur-md rounded-full shadow-2xl animate-fade-in-down border border-primary-sage/20" data-v-1e2981da><div class="w-3 h-3 rounded-full mr-3 animate-pulse shadow-lg" style="${ssrRenderStyle({ "background-color": "#556b2f", "box-shadow": "0 0 10px rgba(85, 107, 47, 0.6)" })}" data-v-1e2981da></div><span class="text-base font-semibold text-primary-sage font-jost" data-v-1e2981da>Trusted for over 20 Years</span></div><div class="mb-6 animate-fade-in-up" data-v-1e2981da><h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-none font-inter mb-2" data-v-1e2981da><span class="text-white drop-shadow-2xl tracking-tight whitespace-nowrap" data-v-1e2981da>PT ESHAKA WIJAYA</span></h1><h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-inter" data-v-1e2981da><span class="text-transparent bg-clip-text gradient-logistics drop-shadow-lg animate-gradient" data-v-1e2981da> LOGISTICS </span></h2></div><p class="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up leading-relaxed drop-shadow font-jost" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}" data-v-1e2981da> Trusted solutions for your international export-import and logistics needs with professional and experienced services. </p><div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12 animate-fade-in-up" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-1e2981da><button class="group relative btn-primary text-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" data-v-1e2981da><span class="relative z-10" data-v-1e2981da>Free Consultation</span></button><button class="group bg-white/90 backdrop-blur-sm text-dark-gray hover:bg-white px-8 py-3 rounded-full font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" data-v-1e2981da> Services </button></div></div></div></div><div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" data-v-1e2981da><div class="w-8 h-12 border-2 border-pale-sage/60 rounded-full flex justify-center backdrop-blur-sm bg-white/10" data-v-1e2981da><div class="w-1.5 h-4 bg-secondary-sage rounded-full mt-2 animate-pulse" data-v-1e2981da></div></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/HeroSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const HeroSection = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-1e2981da"]]);
const _sfc_main$2 = {
  __name: "DottedMapCSS",
  __ssrInlineRender: true,
  props: {
    // Dot configuration
    dotSize: {
      type: Number,
      default: 2
    },
    dotColor: {
      type: String,
      default: "rgba(255, 255, 255, 0.4)"
    },
    dotSpacing: {
      type: Number,
      default: 20
    },
    // Pattern variations
    pattern: {
      type: String,
      default: "regular",
      // regular, diagonal, hexagon, random, worldmap
      validator: (value) => ["regular", "diagonal", "hexagon", "random", "worldmap"].includes(value)
    },
    // Animation
    animated: {
      type: Boolean,
      default: false
    },
    animationDuration: {
      type: String,
      default: "20s"
    },
    // Country highlights
    showCountryHighlights: {
      type: Boolean,
      default: false
    },
    highlightColor: {
      type: String,
      default: "rgba(255, 255, 255, 0.8)"
    },
    // Container styling
    opacity: {
      type: Number,
      default: 1
    },
    height: {
      type: String,
      default: "100%"
    },
    width: {
      type: String,
      default: "100%"
    }
  },
  setup(__props) {
    const props = __props;
    const containerClass = computed(() => {
      return ["relative", "overflow-hidden", props.animated ? "animated" : ""];
    });
    const containerStyle = computed(() => ({
      width: props.width,
      height: props.height,
      opacity: props.opacity
    }));
    const basePatternStyle = computed(() => {
      const size = props.dotSpacing;
      let backgroundImage = "";
      switch (props.pattern) {
        case "worldmap":
          backgroundImage = [
            // Asia-Pacific region (top-right)
            `radial-gradient(ellipse 120px 80px at 75% 25%, ${props.dotColor} 1px, transparent 1px),
         radial-gradient(ellipse 60px 40px at 85% 35%, ${props.dotColor} 1px, transparent 1px),
         radial-gradient(ellipse 40px 60px at 90% 45%, ${props.dotColor} 1px, transparent 1px)`,
            // Europe-Africa region (center)
            `radial-gradient(ellipse 80px 100px at 55% 30%, ${props.dotColor} 1px, transparent 1px),
         radial-gradient(ellipse 70px 120px at 52% 55%, ${props.dotColor} 1px, transparent 1px)`,
            // Americas region (left)
            `radial-gradient(ellipse 60px 150px at 25% 35%, ${props.dotColor} 1px, transparent 1px),
         radial-gradient(ellipse 80px 100px at 20% 65%, ${props.dotColor} 1px, transparent 1px)`,
            // Australia region (bottom-right)
            `radial-gradient(ellipse 50px 30px at 80% 75%, ${props.dotColor} 1px, transparent 1px)`,
            // Island chains and connections
            `radial-gradient(circle at 70% 50%, ${props.dotColor} 0.5px, transparent 0.5px),
         radial-gradient(circle at 45% 40%, ${props.dotColor} 0.5px, transparent 0.5px),
         radial-gradient(circle at 35% 60%, ${props.dotColor} 0.5px, transparent 0.5px)`
          ].join(", ");
          return {
            backgroundImage,
            backgroundSize: `800px 400px, 600px 350px, 500px 450px, 300px 200px, ${size}px ${size}px`,
            backgroundPosition: "0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%",
            backgroundRepeat: "no-repeat, no-repeat, no-repeat, no-repeat, repeat"
          };
        case "diagonal":
          backgroundImage = `radial-gradient(circle at ${props.dotSize}px ${props.dotSize}px, ${props.dotColor} 1px, transparent 0)`;
          return {
            backgroundImage,
            backgroundSize: `${size}px ${size}px`,
            transform: "rotate(45deg) scale(1.4)",
            transformOrigin: "center"
          };
        case "hexagon":
          backgroundImage = `radial-gradient(circle at ${props.dotSize}px ${props.dotSize}px, ${props.dotColor} 1px, transparent 0)`;
          return {
            backgroundImage,
            backgroundSize: `${size}px ${size * 0.866}px`,
            backgroundPosition: `0 0, ${size / 2}px ${size * 0.433}px`
          };
        case "random":
          backgroundImage = [
            `radial-gradient(circle at 25% 25%, ${props.dotColor} 1px, transparent 0)`,
            `radial-gradient(circle at 75% 50%, ${props.dotColor} 1px, transparent 0)`,
            `radial-gradient(circle at 50% 75%, ${props.dotColor} 1px, transparent 0)`,
            `radial-gradient(circle at 20% 80%, ${props.dotColor} 1px, transparent 0)`,
            `radial-gradient(circle at 80% 20%, ${props.dotColor} 1px, transparent 0)`
          ].join(", ");
          return {
            backgroundImage,
            backgroundSize: `${size * 2}px ${size * 2}px, ${size * 1.5}px ${size * 1.5}px, ${size * 1.8}px ${size * 1.8}px, ${size * 2.2}px ${size * 2.2}px, ${size * 1.3}px ${size * 1.3}px`,
            backgroundPosition: "0 0, 10px 5px, -5px 15px, 8px -8px, -12px -3px"
          };
        default:
          backgroundImage = `radial-gradient(circle at ${props.dotSize}px ${props.dotSize}px, ${props.dotColor} 1px, transparent 0)`;
          return {
            backgroundImage,
            backgroundSize: `${size}px ${size}px`
          };
      }
    });
    const highlightPatternStyle = computed(() => {
      if (!props.showCountryHighlights) return {};
      const size = props.dotSpacing * 1.5;
      return {
        backgroundImage: `radial-gradient(circle at ${props.dotSize * 1.5}px ${props.dotSize * 1.5}px, ${props.highlightColor} 2px, transparent 0)`,
        backgroundSize: `${size}px ${size}px`,
        backgroundPosition: `${size * 0.3}px ${size * 0.5}px`,
        animationDelay: "2s"
      };
    });
    const animatedPatternStyle = computed(() => {
      if (!props.animated) return {};
      const size = props.dotSpacing * 0.8;
      return {
        backgroundImage: `radial-gradient(circle at ${props.dotSize * 0.8}px ${props.dotSize * 0.8}px, ${props.dotColor} 0.8px, transparent 0)`,
        backgroundSize: `${size}px ${size}px`,
        animationDuration: props.animationDuration,
        animationDelay: "1s"
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["dotted-map-container", containerClass.value],
        style: containerStyle.value
      }, _attrs))} data-v-c05244a2><div class="dotted-pattern base-pattern" style="${ssrRenderStyle(basePatternStyle.value)}" data-v-c05244a2></div>`);
      if (__props.showCountryHighlights) {
        _push(`<div class="dotted-pattern country-highlights" style="${ssrRenderStyle(highlightPatternStyle.value)}" data-v-c05244a2></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.animated) {
        _push(`<div class="dotted-pattern animated-pattern" style="${ssrRenderStyle(animatedPatternStyle.value)}" data-v-c05244a2></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/DottedMapCSS.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const DottedMapCSS = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-c05244a2"]]);
const _sfc_main$1 = {
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
        description: "Ground shipping throughout Indonesia with a well-maintained fleet and real-time tracking.",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1-1V9a1 1 0 011-1h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V15a1 1 0 01-1 1h-1m-6 0a1 1 0 001 1h4a1 1 0 001-1m-6 0H9m0 0H5m0 0v-4a1 1 0 011-1h4a1 1 0 011 1v4"/></svg>',
        iconBg: "bg-primary-sage",
        backgroundImage: "/images/trucking-bg.jpg",
        fallbackBg: "bg-light-sage"
      },
      {
        title: "Money Transfer",
        description: "International transfers at competitive rates and fast processing worldwide.",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
        iconBg: "bg-primary-sage",
        backgroundImage: "/images/export.jpg",
        fallbackBg: "bg-light-sage"
      },
      {
        title: "Freight Insurance",
        description: "Complete protection for shipments with comprehensive coverage and easy claims.",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
        iconBg: "bg-primary-sage",
        backgroundImage: "/images/insurance.jpg",
        fallbackBg: "bg-light-sage"
      }
    ];
    const additionalServices = [
      {
        title: "Warehousing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        backgroundImage: "/images/warehouse.jpg",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>'
      },
      {
        title: "Packaging",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        backgroundImage: "/images/packaging.jpg",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>'
      },
      {
        title: "Cargo Service",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        backgroundImage: "/images/cargo-service.jpg",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
      },
      {
        title: "Stuffing/Stripping",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        backgroundImage: "/images/stuffing.jpg",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>'
      },
      {
        title: "Cold Chain",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        backgroundImage: "/images/coldchain.jpg",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>'
      },
      {
        title: "Freight Forwarding",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
        backgroundImage: "/images/freight.jpg",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>'
      }
    ];
    const globalStats = [
      { value: "50+", label: "Countries" },
      { value: "15+", label: "Years Experience" },
      { value: "500+", label: "Active Clients" },
      { value: "99.5%", label: "Success Rate" }
    ];
    const currentSlide = ref(0);
    const totalSlides = computed(() => {
      return additionalServices.length;
    });
    const nextSlide = () => {
      if (currentSlide.value < totalSlides.value - 1) {
        currentSlide.value++;
      }
    };
    const resetSlideIfNeeded = () => {
      if (currentSlide.value >= totalSlides.value) {
        currentSlide.value = Math.max(0, totalSlides.value - 1);
      }
    };
    let autoSlideInterval = null;
    let isPageVisible = true;
    const startAutoSlide = () => {
      if (!isPageVisible) return;
      autoSlideInterval = setInterval(() => {
        if (!isPageVisible) return;
        if (currentSlide.value >= totalSlides.value - 1) {
          currentSlide.value = 0;
        } else {
          nextSlide();
        }
      }, 6e3);
    };
    const stopAutoSlide = () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    };
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        startAutoSlide();
      } else {
        stopAutoSlide();
      }
    };
    onMounted(() => {
      resetSlideIfNeeded();
      startAutoSlide();
      document.addEventListener("visibilitychange", handleVisibilityChange, {
        passive: true
      });
    });
    onUnmounted(() => {
      stopAutoSlide();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "services",
        class: "py-20 relative overflow-hidden"
      }, _attrs))} data-v-d08bf12e><div class="absolute top-0 right-0 w-96 h-96" style="${ssrRenderStyle({ "background-color": "rgba(168, 185, 151, 0.3)", "border-radius": "50%", "filter": "blur(3rem)" })}" data-v-d08bf12e></div><div class="absolute bottom-0 left-0 w-80 h-80" style="${ssrRenderStyle({ "background-color": "rgba(138, 155, 122, 0.2)", "border-radius": "50%", "filter": "blur(3rem)" })}" data-v-d08bf12e></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-d08bf12e><div class="text-center mb-16" data-v-d08bf12e><div class="inline-flex items-center px-4 py-2 bg-secondary-sage text-white rounded-full text-sm font-medium mb-4" data-v-d08bf12e><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d08bf12e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d08bf12e></path></svg> Professional Services </div><h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4 font-inter" data-v-d08bf12e> Complete Logistics Solution </h2><p class="text-base text-gray-600 max-w-2xl mx-auto font-jost" data-v-d08bf12e> With over 20 years of experience, we provide high-quality logistics services with international standards. </p></div><div class="grid lg:grid-cols-2 gap-8 mb-20" data-v-d08bf12e><div class="lg:row-span-2 relative rounded-xl p-8 shadow-md transition-all duration-300 overflow-hidden group" data-v-d08bf12e><div style="${ssrRenderStyle({ "background-image": "url('/images/export.jpg')" })}" class="${ssrRenderClass(["bg-light-sage/50", "absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"])}" data-v-d08bf12e><div class="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" data-v-d08bf12e></div></div><div class="relative z-10" data-v-d08bf12e><div class="flex items-center mb-6" data-v-d08bf12e><div class="w-12 h-12 bg-primary-sage rounded-lg flex items-center justify-center mr-4 hover:scale-105 transition-transform duration-200" data-v-d08bf12e><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d08bf12e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-d08bf12e></path></svg></div><div class="bg-primary-sage text-white px-3 py-1 rounded-full text-xs font-medium" data-v-d08bf12e> Featured </div></div><div class="space-y-2 mb-8 bg-black/20 rounded-lg p-4 backdrop-blur-none rounded-xl" data-v-d08bf12e><h3 class="text-2xl font-bold text-white mb-3 font-inter drop-shadow-lg rounded-lg py-2" data-v-d08bf12e> Export &amp; Import </h3><p class="text-white mb-6 leading-relaxed font-jost drop-shadow-md" data-v-d08bf12e> We specialize in export and import services with comprehensive customs clearance, door-to-door delivery, and real-time tracking. </p><!--[-->`);
      ssrRenderList(exportImportFeatures, (feature) => {
        _push(`<div class="flex items-start" data-v-d08bf12e><div class="w-5 h-5 bg-white/40 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 shadow-sm" data-v-d08bf12e><svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d08bf12e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-d08bf12e></path></svg></div><span class="text-white text-sm font-jost font-medium drop-shadow-sm" data-v-d08bf12e>${ssrInterpolate(feature)}</span></div>`);
      });
      _push(`<!--]--></div><button class="w-full bg-primary-sage hover:bg-accent-sage text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:shadow-lg shadow-md" data-v-d08bf12e> Konsultasi Export Import </button></div></div><div class="space-y-6" data-v-d08bf12e><!--[-->`);
      ssrRenderList(otherServices, (service) => {
        _push(`<div class="relative bg-white rounded-xl p-6 border border-gray-100 hover:border-accent-sage hover:shadow-sm transition-all duration-200 overflow-hidden group" data-v-d08bf12e><div style="${ssrRenderStyle([`background-image: url('${service.backgroundImage}');`, { "will-change": "transform" }])}" class="${ssrRenderClass([service.fallbackBg, "absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"])}" loading="lazy" data-v-d08bf12e><div class="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-opacity duration-300" data-v-d08bf12e></div></div><div class="relative flex items-start bg-black/25 rounded-lg p-4 backdrop-blur-none" data-v-d08bf12e><div class="${ssrRenderClass([service.iconBg, "w-10 h-10 rounded-lg flex items-center justify-center mr-4 hover:scale-105 transition-transform duration-200"])}" data-v-d08bf12e><div class="w-5 h-5 text-white" data-v-d08bf12e>${service.icon ?? ""}</div></div><div class="flex-1" data-v-d08bf12e><h4 class="text-lg font-bold text-white mb-2 font-inter transition-colors duration-200 drop-shadow-md" data-v-d08bf12e>${ssrInterpolate(service.title)}</h4><p class="text-sm text-white/95 leading-relaxed font-jost drop-shadow-sm" data-v-d08bf12e>${ssrInterpolate(service.description)}</p></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="text-center" data-v-d08bf12e><h3 class="text-xl font-bold text-gray-800 mb-8 font-inter" data-v-d08bf12e> Support Services </h3><div class="relative" data-v-d08bf12e><div class="overflow-hidden rounded-xl" data-v-d08bf12e><div class="flex transition-transform duration-500 ease-in-out" style="${ssrRenderStyle([`transform: translate3d(-${currentSlide.value * 100}%, 0, 0)`, { "will-change": "transform" }])}" data-v-d08bf12e><!--[-->`);
      ssrRenderList(additionalServices, (addon, index) => {
        _push(`<div class="flex-shrink-0 w-full" data-v-d08bf12e><div class="relative rounded-xl shadow-lg overflow-hidden h-80 md:h-80 group cursor-pointer" data-v-d08bf12e><div class="absolute inset-0 bg-cover bg-center transition-all duration-500 group-hover:scale-110" style="${ssrRenderStyle([`background-image: url('${addon.backgroundImage}');`, { "will-change": "transform" }])}" loading="lazy" data-v-d08bf12e><div class="absolute inset-0 backdrop-blur-0 group-hover:backdrop-blur-sm transition-all duration-500" data-v-d08bf12e></div><div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/30 transition-all duration-500" data-v-d08bf12e></div></div><div class="absolute top-6 left-6 z-10" data-v-d08bf12e><div class="w-16 h-16 bg-primary-sage/90 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-accent-sage/90 group-hover:scale-110 transition-all duration-300 relative shadow-lg" data-v-d08bf12e><div class="w-8 h-8 text-white group-hover:text-pale-sage transition-colors duration-300 icon-hover relative z-20" data-v-d08bf12e>${addon.icon ?? ""}</div></div></div><div class="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10" data-v-d08bf12e><div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out" data-v-d08bf12e><h4 class="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-inter drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300" data-v-d08bf12e>${ssrInterpolate(addon.title)}</h4><p class="text-white/90 leading-relaxed font-jost drop-shadow-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-150" data-v-d08bf12e>${ssrInterpolate(addon.description)}</p></div></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="flex justify-between items-center mt-6" data-v-d08bf12e><button${ssrIncludeBooleanAttr(currentSlide.value === 0) ? " disabled" : ""} class="w-10 h-10 bg-secondary-sage hover:bg-accent-sage disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed" data-v-d08bf12e><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d08bf12e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 19l-7-7 7-7" data-v-d08bf12e></path></svg></button><div class="flex space-x-2" data-v-d08bf12e><!--[-->`);
      ssrRenderList(totalSlides.value, (slide, index) => {
        _push(`<button class="${ssrRenderClass([currentSlide.value === index ? "bg-primary-sage w-6" : "bg-gray-300 hover:bg-accent-sage", "w-2 h-2 rounded-full transition-all duration-200"])}" data-v-d08bf12e></button>`);
      });
      _push(`<!--]--></div><button${ssrIncludeBooleanAttr(currentSlide.value >= totalSlides.value - 1) ? " disabled" : ""} class="w-10 h-10 bg-secondary-sage hover:bg-accent-sage disabled:bg-gray-100 disabled:text-gray-400 text-white rounded-full flex items-center justify-center transition-all duration-200 disabled:cursor-not-allowed" data-v-d08bf12e><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d08bf12e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" data-v-d08bf12e></path></svg></button></div></div></div><div class="mt-20 lg:mt-24 relative" data-v-d08bf12e><div class="absolute inset-0 opacity-40 z-0 min-h-full" data-v-d08bf12e>`);
      _push(ssrRenderComponent(DottedMapCSS, {
        pattern: "worldmap",
        "dot-size": 2,
        "dot-spacing": 20,
        "dot-color": "rgba(255, 255, 255, 0.8)",
        animated: true,
        opacity: 0.4
      }, null, _parent));
      _push(`</div><div class="relative bg-gradient-to-r from-sage-600 via-sage-700 to-sage-600 rounded-2xl p-6 md:p-8 lg:p-12 text-white overflow-hidden z-10" data-v-d08bf12e><div class="absolute inset-0 opacity-15 z-0" data-v-d08bf12e>`);
      _push(ssrRenderComponent(DottedMapCSS, {
        pattern: "worldmap",
        "dot-size": 1,
        "dot-spacing": 30,
        "dot-color": "rgba(255, 255, 255, 0.4)",
        animated: true,
        opacity: 0.15
      }, null, _parent));
      _push(`</div><div class="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl z-5" data-v-d08bf12e></div><div class="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-lg z-5" data-v-d08bf12e></div><div class="relative z-20 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8" data-v-d08bf12e><div class="flex-1 text-center lg:text-left" data-v-d08bf12e><h3 class="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 font-montserrat leading-tight" data-v-d08bf12e> Siap Melayani Kebutuhan <span class="text-sage-200 block lg:inline" data-v-d08bf12e> Logistik Anda</span></h3><p class="text-base md:text-lg text-sage-100 mb-4 md:mb-0 leading-relaxed font-jost max-w-2xl lg:max-w-none" data-v-d08bf12e> Konsultasi gratis dengan tim ahli kami. Dapatkan solusi terbaik untuk ekspor-impor, trucking, dan layanan logistik lainnya. </p></div><div class="flex-shrink-0" data-v-d08bf12e><button class="bg-white text-sage-700 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg hover:bg-sage-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group flex items-center" data-v-d08bf12e><svg class="w-5 h-5 mr-2 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d08bf12e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-d08bf12e></path></svg><span data-v-d08bf12e>Hubungi Kami</span><svg class="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d08bf12e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-v-d08bf12e></path></svg></button></div></div><div class="relative z-20 mt-6 lg:mt-8 pt-6 border-t border-white/20" data-v-d08bf12e><div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center" data-v-d08bf12e><!--[-->`);
      ssrRenderList(globalStats, (stat) => {
        _push(`<div data-v-d08bf12e><div class="text-lg md:text-xl font-bold text-white mb-1 font-montserrat" data-v-d08bf12e>${ssrInterpolate(stat.value)}</div><div class="text-sage-200 text-xs md:text-sm font-medium font-jost" data-v-d08bf12e>${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ServicesSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ServicesSection = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d08bf12e"]]);
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
