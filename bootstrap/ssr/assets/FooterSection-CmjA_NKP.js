import { ref, computed, mergeProps, useSSRContext, onMounted, onUnmounted, reactive } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$4 = {
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
        return "/images/logo/logo-hero.svg";
      } else if (props.variant === "white") {
        return "/images/logo/logo-hero.svgg";
      } else {
        return "/images/logo/logo-hero.svg";
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
    const textContainerClass = computed(() => sizeConfig.value.textContainer);
    const primaryTextClass = computed(() => {
      const baseClass = sizeConfig.value.primaryText;
      const colorClass = props.variant === "white" ? "text-white" : "text-gray-800";
      return `${baseClass} ${colorClass}`;
    });
    const taglineClass = computed(() => {
      const baseClass = sizeConfig.value.tagline;
      const colorClass = props.variant === "white" ? "text-gray-200" : "text-gray-600";
      return `${baseClass} ${colorClass}`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["flex items-center", containerClass.value]
      }, _attrs))}><img${ssrRenderAttr("src", logoSrc.value)}${ssrRenderAttr("alt", altText.value)} class="${ssrRenderClass([logoClass.value, "object-contain"])}">`);
      if (__props.showText) {
        _push(`<div class="${ssrRenderClass(textContainerClass.value)}"><div class="${ssrRenderClass(primaryTextClass.value)}">PT ESHAKA WIJAYA</div><div class="${ssrRenderClass(taglineClass.value)}">LOGISTICS</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/Logo.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenuOpen = ref(false);
    const activeSection = ref("#home");
    const navigation = [
      { name: "Home", href: "#home" },
      { name: "Service", href: "#services" },
      { name: "About", href: "#about" },
      { name: "Contact", href: "#contact" }
    ];
    const handleScroll = () => {
      const sections = ["#home", "#services", "#about", "#contact"];
      const scrollPosition = window.scrollY + 120;
      if (window.scrollY < 100) {
        activeSection.value = "#home";
        return;
      }
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
      handleScroll();
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fixed w-full bg-white/90 backdrop-blur-md shadow-lg border-b border-pale-sage/30 z-50 transition-all duration-300" }, _attrs))} data-v-c82c76c6><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-c82c76c6><div class="flex justify-between items-center h-20" data-v-c82c76c6><div class="flex items-center cursor-pointer hover:scale-105 transition-transform duration-300" data-v-c82c76c6>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        size: "medium",
        variant: "default",
        "show-text": false,
        "show-tagline": false
      }, null, _parent));
      _push(`</div><div class="hidden md:block" data-v-c82c76c6><div class="ml-10 flex items-baseline space-x-8" data-v-c82c76c6><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(`<a${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([{ "active-link": activeSection.value === item.href }, "navbar-link px-6 py-3 text-base font-medium transition-all duration-300 cursor-pointer relative group font-inter"])}" data-v-c82c76c6>${ssrInterpolate(item.name)} <span class="${ssrRenderClass([{ "w-full": activeSection.value === item.href }, "underline-effect transition-all duration-300"])}" data-v-c82c76c6></span></a>`);
      });
      _push(`<!--]--></div></div><div class="hidden md:block" data-v-c82c76c6><button class="cta-button text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" data-v-c82c76c6> Contact Us </button></div><div class="md:hidden" data-v-c82c76c6><button class="mobile-menu-btn focus:outline-none p-2" data-v-c82c76c6><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-c82c76c6>`);
      if (!mobileMenuOpen.value) {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-c82c76c6></path>`);
      } else {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-c82c76c6></path>`);
      }
      _push(`</svg></button></div></div></div><div style="${ssrRenderStyle(mobileMenuOpen.value ? null : { display: "none" })}" class="md:hidden bg-white border-t border-pale-sage" data-v-c82c76c6><div class="px-2 pt-2 pb-3 space-y-1" data-v-c82c76c6><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(`<a${ssrRenderAttr("href", item.href)} class="mobile-nav-link block px-4 py-3 text-base font-medium cursor-pointer rounded-lg transition-colors duration-200" data-v-c82c76c6>${ssrInterpolate(item.name)}</a>`);
      });
      _push(`<!--]--><button class="mobile-cta-button w-full mt-4 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300" data-v-c82c76c6> Contact Us </button></div></div></nav>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/homePage/Navbar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const NavBar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-c82c76c6"]]);
const _sfc_main$2 = {
  __name: "AboutSection",
  __ssrInlineRender: true,
  props: {
    teamMembers: {
      type: Array,
      default: () => []
    },
    settings: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const currentSlide = ref(0);
    const totalSlides = computed(() => {
      return dynamicTeamMembers.value.length;
    });
    const dynamicTeamMembers = computed(() => {
      if (props.teamMembers && props.teamMembers.length > 0) {
        return props.teamMembers.filter((member) => member.is_active).sort((a, b) => (a.order_index || 0) - (b.order_index || 0)).map((member) => ({
          name: member.position || member.name,
          designation: member.name,
          src: member.photo_path ? `/storage/${member.photo_path}` : "/images/team/placeholder.png",
          phone_number: member.phone_number
        }));
      }
      return [];
    });
    const companyStats = [
      { value: "15+", label: "Years of Experience" },
      { value: "500+", label: "Active Client" },
      { value: "50+", label: "Destination Country" },
      { value: "99.5%", label: "Success Rate" }
    ];
    const achievements = [
      {
        title: "ISO 9001:2015 Certified",
        description: "International quality management certificate",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
      },
      {
        title: "Forwarder License",
        description: "Official freight forwarder license from the Ministry of Transportation",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
      },
      {
        title: "Best Service Award",
        description: "Best service award 2023",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>'
      }
    ];
    const keyPoints = [
      {
        title: "15+ Years Experience",
        description: "Serving export-import and logistics with a trusted and professional track record"
      },
      {
        title: "Global Network",
        description: "Partnerships with 50+ countries to facilitate efficient international trade"
      },
      {
        title: "Modern Technology",
        description: "Real-time tracking system and process digitalization for maximum efficiency and transparency"
      },
      {
        title: "Professional Team",
        description: "Supported by internationally certified experts in logistics and trade"
      }
    ];
    const teamHighlights = [
      {
        title: "Expert Leadership",
        description: "Management team with 20+ years of experience in the international logistics industry",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>'
      },
      {
        title: "Certified Professionals",
        description: "All teams have international certifications and update knowledge regularly",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
      },
      {
        title: "24/7 Support",
        description: "Customer service team ready to help you anytime, anywhere with responsive and professional support",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "about",
        class: "py-24 bg-gradient-to-b from-gray-50 to-sage-50",
        "aria-labelledby": "about-heading"
      }, _attrs))} data-v-b4f002cc><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-b4f002cc><div class="text-center mb-12 lg:mb-20" data-v-b4f002cc><div class="inline-flex items-center px-4 py-2 bg-white border border-sage-200 text-sage-800 rounded-full text-sm font-semibold mb-6" data-v-b4f002cc><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b4f002cc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-b4f002cc></path></svg> Authorized &amp; Trusted Certificate </div><h2 id="about-heading" class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 md:mb-6 font-inter" data-v-b4f002cc> About Eshaka Wijaya Logistics </h2><p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-jost" data-v-b4f002cc> With more than 20 years of experience in the Indonesian logistics industry, we are here as a trusted partner for efficient and professional international trade solutions. </p></div><div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24" data-v-b4f002cc><div data-v-b4f002cc><h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 font-inter" data-v-b4f002cc> Trusted Logistics Partner <span class="text-sage-700 block md:inline" data-v-b4f002cc>Since 2015</span></h3><p class="text-base md:text-lg text-gray-600 mb-6 md:mb-8 leading-relaxed font-jost" data-v-b4f002cc><b data-v-b4f002cc>Eshaka Wijaya Logistics</b> was established with the vision of becoming the leading logistics company in Indonesia. We provide export-import, inland trucking, international money transfer, and freight insurance services with trusted international quality standards. </p><div class="space-y-4 md:space-y-6 mb-8 md:mb-10" data-v-b4f002cc><!--[-->`);
      ssrRenderList(keyPoints, (point) => {
        _push(`<div class="flex items-start group" data-v-b4f002cc><div class="w-12 h-12 bg-sage-700 rounded-xl flex items-center justify-center flex-shrink-0 mr-4 group-hover:scale-110 transition-transform duration-300" style="${ssrRenderStyle({ "will-change": "transform" })}" data-v-b4f002cc><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b4f002cc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M5 13l4 4L19 7" data-v-b4f002cc></path></svg></div><div data-v-b4f002cc><h4 class="text-base md:text-lg font-bold text-gray-800 mb-1 md:mb-2 font-montserrat" data-v-b4f002cc>${ssrInterpolate(point.title)}</h4><p class="text-sm md:text-base text-gray-600 leading-relaxed font-jost" data-v-b4f002cc>${ssrInterpolate(point.description)}</p></div></div>`);
      });
      _push(`<!--]--></div><button class="btn-primary-sage hover:bg-sage-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1" style="${ssrRenderStyle({ "will-change": "transform, box-shadow" })}" aria-label="Contact us for consultation" data-v-b4f002cc> Consultation Now </button></div><div class="relative" data-v-b4f002cc><div class="bg-white rounded-3xl p-8 shadow-xl border border-sage-100" role="complementary" aria-label="Company statistics and achievements" data-v-b4f002cc><div class="grid grid-cols-2 gap-3 md:gap-6 mb-6 md:mb-8" data-v-b4f002cc><!--[-->`);
      ssrRenderList(companyStats, (stat) => {
        _push(`<div class="text-center p-3 md:p-6 bg-sage-50 rounded-2xl hover:bg-sage-100 transition-colors duration-300" data-v-b4f002cc><div class="text-2xl md:text-3xl font-bold text-sage-700 mb-1 md:mb-2 font-montserrat" data-v-b4f002cc>${ssrInterpolate(stat.value)}</div><div class="text-gray-600 font-medium text-xs md:text-sm font-jost" data-v-b4f002cc>${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div><div class="space-y-3 md:space-y-4" data-v-b4f002cc><!--[-->`);
      ssrRenderList(achievements, (achievement) => {
        _push(`<div class="flex items-center p-3 md:p-4 bg-sage-50 rounded-xl border border-sage-100 hover:bg-sage-100 transition-colors duration-300" data-v-b4f002cc><div class="w-10 h-10 md:w-12 md:h-12 bg-sage-400 rounded-xl flex items-center justify-center mr-3 md:mr-4 flex-shrink-0" data-v-b4f002cc><div class="w-5 h-5 md:w-6 md:h-6 text-white" data-v-b4f002cc>${achievement.icon ?? ""}</div></div><div data-v-b4f002cc><h4 class="font-bold text-gray-800 text-sm md:text-base font-montserrat" data-v-b4f002cc>${ssrInterpolate(achievement.title)}</h4><p class="text-xs md:text-sm text-gray-600 font-jost leading-relaxed" data-v-b4f002cc>${ssrInterpolate(achievement.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="absolute -top-6 -right-6 w-24 h-24 bg-sage-200 rounded-full opacity-30" data-v-b4f002cc></div><div class="absolute -bottom-4 -left-4 w-16 h-16 bg-sage-300 rounded-full opacity-20" data-v-b4f002cc></div></div></div><div class="grid md:grid-cols-2 gap-6 md:gap-12 mb-16 lg:mb-24" data-v-b4f002cc><div class="bg-white rounded-3xl p-6 md:p-8 shadow-lg border border-sage-100 hover:shadow-xl transition-all duration-300" data-v-b4f002cc><div class="w-14 h-14 md:w-16 md:h-16 bg-sage-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6" data-v-b4f002cc><svg class="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b4f002cc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-b4f002cc></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-b4f002cc></path></svg></div><h3 class="text-2xl font-bold text-gray-800 mb-4 font-montserrat" data-v-b4f002cc> Our Vision </h3><p class="text-gray-600 leading-relaxed font-jost" data-v-b4f002cc> To become the leading logistics company in Indonesia, providing world-class export-import services and comprehensive logistics solutions that connect businesses across global markets with reliability, efficiency, and innovation. </p></div><div class="bg-white rounded-3xl p-8 shadow-lg border border-sage-100 hover:shadow-xl transition-all duration-300" data-v-b4f002cc><div class="w-16 h-16 bg-sage-600 rounded-2xl flex items-center justify-center mb-6" data-v-b4f002cc><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b4f002cc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5M8 6V4h8v2M8 6H6a2 2 0 00-2 2v6.5m16-1.245a23.931 23.931 0 01-9 1.745c-3.183 0-6.22-.62-9-1.745M21 13.255V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-5.745" data-v-b4f002cc></path></svg></div><h3 class="text-2xl font-bold text-gray-800 mb-4 font-montserrat" data-v-b4f002cc> Our Mission </h3><div class="space-y-3 text-gray-600 font-jost" data-v-b4f002cc><div class="flex items-start" data-v-b4f002cc><div class="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0" data-v-b4f002cc></div><p class="leading-relaxed" data-v-b4f002cc> Provide comprehensive and professional logistics services with international quality standards </p></div><div class="flex items-start" data-v-b4f002cc><div class="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0" data-v-b4f002cc></div><p class="leading-relaxed" data-v-b4f002cc> Build strategic partnerships with global networks to facilitate efficient international trade </p></div><div class="flex items-start" data-v-b4f002cc><div class="w-2 h-2 bg-sage-600 rounded-full mt-2 mr-3 flex-shrink-0" data-v-b4f002cc></div><p class="leading-relaxed" data-v-b4f002cc> Continuously innovate with modern technology and systems for customer satisfaction </p></div></div></div></div><div class="bg-white rounded-2xl p-6 md:p-8 lg:p-12 shadow-xl border border-sage-100" data-v-b4f002cc><div class="text-center mb-6 md:mb-8" data-v-b4f002cc><h3 class="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4 font-montserrat" data-v-b4f002cc> Our Professional Team </h3><p class="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-jost" data-v-b4f002cc> Led by experienced professionals in the logistics industry and international trade with a high commitment to customer satisfaction. Our solid and experienced team is ready to provide the best service for your logistics needs. </p></div><div class="mb-6 sm:mb-8 md:mb-12 max-w-5xl mx-auto px-2 sm:px-4" data-v-b4f002cc><div class="relative" data-v-b4f002cc><div class="overflow-hidden rounded-xl" data-v-b4f002cc><div class="flex transition-transform duration-500 ease-in-out" style="${ssrRenderStyle([`transform: translate3d(-${currentSlide.value * 100}%, 0, 0)`, { "will-change": "transform" }])}" data-v-b4f002cc><!--[-->`);
      ssrRenderList(dynamicTeamMembers.value, (member, index) => {
        _push(`<div class="flex-shrink-0 w-full" data-v-b4f002cc><div class="flex justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-6" data-v-b4f002cc><div class="relative rounded-xl shadow-lg overflow-hidden group cursor-pointer" style="${ssrRenderStyle({ "max-width": "400px" })}" data-v-b4f002cc><img${ssrRenderAttr("src", member.src)}${ssrRenderAttr("alt", member.name)} class="w-full h-auto transition-all duration-500 group-hover:scale-110 object-cover" style="${ssrRenderStyle({ "will-change": "transform" })}" loading="lazy" data-v-b4f002cc><div class="absolute inset-0" data-v-b4f002cc><div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/60 group-hover:to-black/30 transition-all duration-500" data-v-b4f002cc></div></div>`);
        if (member.phone_number) {
          _push(`<div class="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2" data-v-b4f002cc><div class="hidden sm:block bg-green-500/90 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold shadow-lg" data-v-b4f002cc> Hubungi CS </div><button class="w-8 h-8 sm:w-12 sm:h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300" data-v-b4f002cc><svg class="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24" data-v-b4f002cc><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" data-v-b4f002cc></path></svg></button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="absolute bottom-4 left-4 z-10" data-v-b4f002cc><div data-v-b4f002cc><h4 class="text-lg md:text-xl font-bold text-white mb-1 font-montserrat drop-shadow-lg" data-v-b4f002cc>${ssrInterpolate(member.name)}</h4><p class="text-sage-200 text-sm md:text-base font-jost drop-shadow-md" data-v-b4f002cc>${ssrInterpolate(member.designation)}</p></div></div></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="flex justify-between items-center absolute top-1/2 left-4 right-4 z-30 pointer-events-none" style="${ssrRenderStyle({ "transform": "translateY(-50%)" })}" data-v-b4f002cc><button${ssrIncludeBooleanAttr(currentSlide.value === 0) ? " disabled" : ""} class="w-10 h-10 bg-white/80 hover:bg-white disabled:bg-gray-200/50 disabled:text-gray-400 text-sage-600 rounded-full flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg pointer-events-auto backdrop-blur-sm" data-v-b4f002cc><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b4f002cc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-b4f002cc></path></svg></button><button${ssrIncludeBooleanAttr(currentSlide.value >= totalSlides.value - 1) ? " disabled" : ""} class="w-10 h-10 bg-white/80 hover:bg-white disabled:bg-gray-200/50 disabled:text-gray-400 text-sage-600 rounded-full flex items-center justify-center transition-all duration-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg pointer-events-auto backdrop-blur-sm" data-v-b4f002cc><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b4f002cc><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-b4f002cc></path></svg></button></div></div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8" data-v-b4f002cc><!--[-->`);
      ssrRenderList(teamHighlights, (highlight) => {
        _push(`<div class="text-center p-4 sm:p-5 md:p-6 bg-sage-50 rounded-xl sm:rounded-2xl hover:bg-sage-100 transition-colors duration-300" data-v-b4f002cc><div class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-sage-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4" data-v-b4f002cc><div class="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" data-v-b4f002cc>${highlight.icon ?? ""}</div></div><h4 class="text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-2 sm:mb-3 font-montserrat" data-v-b4f002cc>${ssrInterpolate(highlight.title)}</h4><p class="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-jost" data-v-b4f002cc>${ssrInterpolate(highlight.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/AboutSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AboutSection = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-b4f002cc"]]);
const _sfc_main$1 = {
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
    const submitStatus = ref("");
    const formErrors = reactive({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    const validatePhone = (phone) => {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
      return phoneRegex.test(phone.replace(/\s/g, ""));
    };
    const isFormValid = computed(() => {
      return form.name.trim() && form.email.trim() && validateEmail(form.email) && form.phone.trim() && validatePhone(form.phone) && form.message.trim() && form.message.trim().length >= 10;
    });
    const offices = [
      {
        id: 1,
        name: "Jakarta Head Office",
        address: "Ruko Aerohub Citra 8 No.C7-10, Pegadungan, Kec.Kalideres, Kota Jakarta Barat, DKI Jakarta 11830",
        phone: "(021) 23095467",
        email: "eshakawijayalogistics@ewilog.com"
      }
    ];
    const whyChooseUs = [
      {
        title: "Trusted Experience",
        description: "20+ years of export-import service with perfect track record and high client satisfaction"
      },
      {
        title: "Global Network",
        description: "Partnerships with 50+ countries and access to all major world ports"
      },
      {
        title: "Modern Technology",
        description: "Real-time tracking system and process digitization for maximum transparency"
      },
      {
        title: "Profesional Team",
        description: "Supported by certified experts with 24/7 responsiveness for your satisfaction"
      },
      {
        title: "Competitive Price",
        description: "Best deals with premium quality with no compromise on service excellence"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "contact",
        class: "py-24 bg-sage-900",
        "aria-labelledby": "contact-heading"
      }, _attrs))} data-v-2d9a3e06><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-2d9a3e06><div class="text-center mb-16 lg:mb-24" data-v-2d9a3e06><div class="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-full text-sm font-semibold mb-6" data-v-2d9a3e06><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9a3e06><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-2d9a3e06></path></svg> Contact Our Professional Team </div><h2 id="contact-heading" class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6 font-inter" data-v-2d9a3e06> Let&#39;s Discuss Your Needs </h2><p class="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed font-jost" data-v-2d9a3e06> Our team of experts is ready to help provide the best logistics solutions for your business with 24/7 service. </p></div><div class="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-start" data-v-2d9a3e06><div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl border border-white/20 hover:bg-white/15 transition-all duration-300" data-v-2d9a3e06><h3 class="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 lg:mb-8 font-inter" id="contact-form-heading" data-v-2d9a3e06> Send Your Message </h3><form class="space-y-4 md:space-y-6" aria-labelledby="contact-form-heading" novalidate data-v-2d9a3e06><div class="grid md:grid-cols-2 gap-4 md:gap-6" data-v-2d9a3e06><div data-v-2d9a3e06><label for="contact-name" class="block text-xs md:text-sm font-semibold text-white/90 mb-2 md:mb-3 font-jost" data-v-2d9a3e06>Full Name *</label><input id="contact-name"${ssrRenderAttr("value", form.name)} type="text" required class="${ssrRenderClass([
        "w-full px-3 md:px-4 py-3 md:py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm",
        formErrors.name ? "border-red-400 focus:ring-red-400/50" : "border-white/30 focus:ring-white/50"
      ])}" placeholder="Enter full name"${ssrRenderAttr("aria-invalid", !!formErrors.name)}${ssrRenderAttr("aria-describedby", formErrors.name ? "name-error" : void 0)} data-v-2d9a3e06>`);
      if (formErrors.name) {
        _push(`<p id="name-error" class="text-red-300 text-xs mt-1 font-jost" role="alert" data-v-2d9a3e06>${ssrInterpolate(formErrors.name)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-2d9a3e06><label for="contact-email" class="block text-xs md:text-sm font-semibold text-white/90 mb-2 md:mb-3 font-jost" data-v-2d9a3e06>Email *</label><input id="contact-email"${ssrRenderAttr("value", form.email)} type="email" required class="${ssrRenderClass([
        "w-full px-3 md:px-4 py-3 md:py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm",
        formErrors.email ? "border-red-400 focus:ring-red-400/50" : "border-white/30 focus:ring-white/50"
      ])}" placeholder="example@email.com"${ssrRenderAttr("aria-invalid", !!formErrors.email)}${ssrRenderAttr(
        "aria-describedby",
        formErrors.email ? "email-error" : void 0
      )} data-v-2d9a3e06>`);
      if (formErrors.email) {
        _push(`<p id="email-error" class="text-red-300 text-xs mt-1 font-jost" role="alert" data-v-2d9a3e06>${ssrInterpolate(formErrors.email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="grid md:grid-cols-2 gap-4 md:gap-6" data-v-2d9a3e06><div data-v-2d9a3e06><label for="contact-phone" class="block text-xs md:text-sm font-semibold text-white/90 mb-2 md:mb-3 font-jost" data-v-2d9a3e06>Mobile Phone *</label><input id="contact-phone"${ssrRenderAttr("value", form.phone)} type="tel" required class="${ssrRenderClass([
        "w-full px-3 md:px-4 py-3 md:py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm",
        formErrors.phone ? "border-red-400 focus:ring-red-400/50" : "border-white/30 focus:ring-white/50"
      ])}" placeholder="+62 8xx xxxx xxxx"${ssrRenderAttr("aria-invalid", !!formErrors.phone)}${ssrRenderAttr(
        "aria-describedby",
        formErrors.phone ? "phone-error" : void 0
      )} data-v-2d9a3e06>`);
      if (formErrors.phone) {
        _push(`<p id="phone-error" class="text-red-300 text-xs mt-1 font-jost" role="alert" data-v-2d9a3e06>${ssrInterpolate(formErrors.phone)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-2d9a3e06><label for="contact-service" class="block text-xs md:text-sm font-semibold text-white/90 mb-2 md:mb-3 font-jost" data-v-2d9a3e06>Services</label><select id="contact-service" class="w-full px-4 py-4 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm" aria-label="Select a service" data-v-2d9a3e06><option value="" class="text-gray-900" data-v-2d9a3e06${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "") : ssrLooseEqual(form.service, "")) ? " selected" : ""}>Choose Service</option><option value="export-import" class="text-gray-900" data-v-2d9a3e06${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "export-import") : ssrLooseEqual(form.service, "export-import")) ? " selected" : ""}> Export/Import </option><option value="trucking" class="text-gray-900" data-v-2d9a3e06${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "trucking") : ssrLooseEqual(form.service, "trucking")) ? " selected" : ""}> Trucking Inland </option><option value="money-transfer" class="text-gray-900" data-v-2d9a3e06${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "money-transfer") : ssrLooseEqual(form.service, "money-transfer")) ? " selected" : ""}> Transfer Uang </option><option value="insurance" class="text-gray-900" data-v-2d9a3e06${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "insurance") : ssrLooseEqual(form.service, "insurance")) ? " selected" : ""}> Asuransi Barang </option><option value="warehousing" class="text-gray-900" data-v-2d9a3e06${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "warehousing") : ssrLooseEqual(form.service, "warehousing")) ? " selected" : ""}> Warehousing </option><option value="consulting" class="text-gray-900" data-v-2d9a3e06${ssrIncludeBooleanAttr(Array.isArray(form.service) ? ssrLooseContain(form.service, "consulting") : ssrLooseEqual(form.service, "consulting")) ? " selected" : ""}> Consulting </option></select></div></div><div data-v-2d9a3e06><label for="contact-message" class="block text-xs md:text-sm font-semibold text-white/90 mb-2 md:mb-3 font-jost" data-v-2d9a3e06>Your Message *</label><textarea id="contact-message" required rows="5" class="${ssrRenderClass([
        "w-full px-3 md:px-4 py-3 md:py-4 bg-white/20 border rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 backdrop-blur-sm text-sm resize-none",
        formErrors.message ? "border-red-400 focus:ring-red-400/50" : "border-white/30 focus:ring-white/50"
      ])}" placeholder="Describe your specific needs..."${ssrRenderAttr("aria-invalid", !!formErrors.message)}${ssrRenderAttr(
        "aria-describedby",
        formErrors.message ? "message-error" : void 0
      )} data-v-2d9a3e06>${ssrInterpolate(form.message)}</textarea>`);
      if (formErrors.message) {
        _push(`<p id="message-error" class="text-red-300 text-xs mt-1 font-jost" role="alert" data-v-2d9a3e06>${ssrInterpolate(formErrors.message)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (submitStatus.value === "success") {
        _push(`<div class="mb-4 p-3 bg-green-500/20 border border-green-400/30 rounded-xl text-green-300 text-sm font-jost flex items-center" data-v-2d9a3e06><svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9a3e06><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-2d9a3e06></path></svg> Your message has been sent successfully! Our team will contact you soon. </div>`);
      } else {
        _push(`<!---->`);
      }
      if (submitStatus.value === "error") {
        _push(`<div class="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-xl text-red-300 text-sm font-jost flex items-center" data-v-2d9a3e06><svg class="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9a3e06><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-2d9a3e06></path></svg> An error occurred. Please try again. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value || !isFormValid.value) ? " disabled" : ""} class="${ssrRenderClass([
        "w-full px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300",
        isFormValid.value && !isSubmitting.value ? "bg-white text-sage-500 hover:bg-white/90 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5" : "bg-white/50 text-sage-400 cursor-not-allowed"
      ])}" data-v-2d9a3e06>`);
      if (!isSubmitting.value) {
        _push(`<span data-v-2d9a3e06>Send Message</span>`);
      } else {
        _push(`<span class="flex items-center justify-center" data-v-2d9a3e06><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-sage-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-2d9a3e06><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1" data-v-2d9a3e06></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-2d9a3e06></path></svg> Sending... </span>`);
      }
      _push(`</button></form></div><div class="space-y-6 md:space-y-8" role="complementary" aria-labelledby="contact-info-heading" data-v-2d9a3e06><div class="grid gap-6" data-v-2d9a3e06><h3 id="contact-info-heading" class="sr-only" data-v-2d9a3e06> Contact Information </h3><!--[-->`);
      ssrRenderList(offices, (office) => {
        _push(`<div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300" data-v-2d9a3e06><h4 class="text-base md:text-lg font-bold text-white mb-3 md:mb-4 font-inter" data-v-2d9a3e06>${ssrInterpolate(office.name)}</h4><div class="space-y-2 md:space-y-3" data-v-2d9a3e06><div class="flex items-start" data-v-2d9a3e06><svg class="w-4 h-4 md:w-5 md:h-5 text-white/80 mt-0.5 mr-2 md:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9a3e06><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-2d9a3e06></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-2d9a3e06></path></svg><span class="text-white/90 text-xs md:text-sm leading-relaxed font-jost" data-v-2d9a3e06>${ssrInterpolate(office.address)}</span></div><div class="flex items-center" data-v-2d9a3e06><svg class="w-4 h-4 md:w-5 md:h-5 text-white/80 mr-2 md:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9a3e06><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-2d9a3e06></path></svg><span class="text-white font-medium text-xs md:text-sm font-jost" data-v-2d9a3e06>${ssrInterpolate(office.phone)}</span></div><div class="flex items-center" data-v-2d9a3e06><svg class="w-4 h-4 md:w-5 md:h-5 text-white/80 mr-2 md:mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2d9a3e06><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-2d9a3e06></path></svg><span class="text-white font-medium text-xs md:text-sm break-all font-jost" data-v-2d9a3e06>${ssrInterpolate(office.email)}</span></div></div></div>`);
      });
      _push(`<!--]--></div><div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20" role="complementary" aria-labelledby="why-choose-us-heading" data-v-2d9a3e06><h4 id="why-choose-us-heading" class="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 font-inter" data-v-2d9a3e06> Why Choose Us? </h4><div class="space-y-3 md:space-y-4" data-v-2d9a3e06><!--[-->`);
      ssrRenderList(whyChooseUs, (reason) => {
        _push(`<div class="flex items-start group" data-v-2d9a3e06><div class="w-2 h-2 bg-white rounded-full mt-2 mr-3 md:mr-4 group-hover:scale-125 transition-transform duration-300 flex-shrink-0" data-v-2d9a3e06></div><div data-v-2d9a3e06><h5 class="font-semibold text-white text-xs md:text-sm mb-1 font-jost" data-v-2d9a3e06>${ssrInterpolate(reason.title)}</h5><p class="text-white/80 text-xs leading-relaxed font-jost" data-v-2d9a3e06>${ssrInterpolate(reason.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ContactSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ContactSection = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2d9a3e06"]]);
const _sfc_main = {
  __name: "FooterSection",
  __ssrInlineRender: true,
  setup(__props) {
    const showBackToTop = ref(false);
    const isExpanded = ref(false);
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
      { name: "Home", url: "#home" },
      { name: "About", url: "#about" },
      { name: "Services", url: "#services" },
      { name: "Contact", url: "#contact" },
      { name: "FAQ", url: "/faq" },
      { name: "Blog & News", url: "/blog" },
      { name: "Career", url: "/career" },
      { name: "Partnership", url: "/partnership" }
    ];
    const contactInfo = [
      {
        type: "Jakarta Head Office",
        value: "Ruko Aerohub Citra 8 No.C7-10",
        secondary: "Pegadungan, Kec.Kalideres, Jakarta Barat 11830",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'
      },
      {
        type: "Customer Service",
        value: "(021) 23095467",
        secondary: "Available 24/7",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>'
      },
      {
        type: "Email Support",
        value: "eshakawijayalogistics@ewilog.com",
        secondary: "Response within 24 hours",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>'
      }
    ];
    const socialMedia = [
      {
        name: "WhatsApp",
        url: "https://wa.me/62895334850224",
        hoverColor: "hover:bg-green-600",
        icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.53 3.488"/></svg>'
      },
      {
        name: "TikTok",
        url: "https://tiktok.com/@ewilog_eshakawijaya",
        hoverColor: "hover:bg-gray-900",
        icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12.525 3.9a4.8 4.8 0 0 1 4.8 4.8v3.54a4.8 4.8 0 0 1-2.4.654V9.9a2.4 2.4 0 0 0-2.4-2.4c-1.324 0-2.4 1.076-2.4 2.4v7.2c0 1.324-1.076 2.4-2.4 2.4S4.8 18.624 4.8 17.1s1.076-2.4 2.4-2.4a2.4 2.4 0 0 1 1.2.324V12.9a4.8 4.8 0 0 0-1.2-.156 4.8 4.8 0 0 0-4.8 4.8C2.4 19.868 4.332 21.8 6.756 21.8s4.8-1.932 4.8-4.244V9.9a4.8 4.8 0 0 0 2.4 2.4v-2.6a2.4 2.4 0 0 1-1.431-6.8z"/></svg>'
      },
      {
        name: "Instagram",
        url: "https://instagram.com/eshakawijayalogistic",
        hoverColor: "hover:bg-pink-600",
        icon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C8.396 0 7.989.016 6.756.072 5.526.127 4.683.269 3.953.504a5.906 5.906 0 00-2.126 1.384A5.909 5.909 0 00.503 3.953C.268 4.683.127 5.526.072 6.756.016 7.99 0 8.396 0 12.017c0 3.624.016 4.031.072 5.264.055 1.23.196 2.073.431 2.803a5.906 5.906 0 001.384 2.126 5.907 5.907 0 002.126 1.384c.73.235 1.573.376 2.803.431 1.233.056 1.639.072 5.264.072 3.624 0 4.031-.016 5.264-.072 1.23-.055 2.073-.196 2.803-.431a5.902 5.902 0 002.126-1.384 5.907 5.907 0 001.384-2.126c.235-.73.376-1.573.431-2.803.056-1.233.072-1.639.072-5.264 0-3.621-.016-4.027-.072-5.264-.055-1.23-.196-2.073-.431-2.803a5.908 5.908 0 00-1.384-2.126A5.907 5.907 0 0018.696.503C17.966.268 17.123.127 15.893.072 14.66.016 14.254 0 10.63 0h1.387zm0 2.165c3.549 0 3.959.014 5.36.069 1.294.059 1.996.274 2.462.456.619.24 1.061.526 1.527.992.466.466.752.908.992 1.527.182.466.397 1.168.456 2.462.055 1.401.069 1.811.069 5.36 0 3.549-.014 3.959-.069 5.36-.059 1.294-.274 1.996-.456 2.462-.24.619-.526 1.061-.992 1.527-.466.466-.908.752-1.527.992-.466.182-1.168.397-2.462.456-1.401.055-1.811.069-5.36.069-3.549 0-3.959-.014-5.36-.069-1.294-.059-1.996-.274-2.462-.456-.619-.24-1.061-.526-1.527-.992-.466-.466-.752-.908-.992-1.527-.182-.466-.397-1.168-.456-2.462-.055-1.401-.069-1.811-.069-5.36 0-3.549.014-3.959.069-5.36.059-1.294.274-1.996.456-2.462.24-.619.526-1.061.992-1.527.466-.466.908-.752 1.527-.992.466-.182 1.168-.397 2.462-.456 1.401-.055 1.811-.069 5.36-.069zm0 3.678c-3.405 0-6.162 2.757-6.162 6.162 0 3.405 2.757 6.162 6.162 6.162 3.405 0 6.162-2.757 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12.017 16c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.44 1.44-1.44.793-.001 1.44.645 1.44 1.44z"/></svg>'
      },
      {
        name: "Email",
        url: "mailto:eshakawijayalogistics@ewilog.com",
        hoverColor: "hover:bg-sage-600",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>'
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
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>'
      },
      {
        name: "Licensed",
        icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
      }
    ];
    const csContacts = [
      {
        id: 1,
        name: "CS 1",
        phone: "6285213866455"
      },
      {
        id: 2,
        name: "CS 2",
        phone: "62895334850224"
      }
    ];
    let scrollTimeout = null;
    const handleScroll = () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        showBackToTop.value = window.scrollY > 300;
        scrollTimeout = null;
      }, 100);
    };
    onMounted(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
    });
    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<footer${ssrRenderAttrs(mergeProps({
        class: "bg-gray-800 text-white",
        role: "contentinfo",
        "aria-labelledby": "footer-heading"
      }, _attrs))} data-v-999e3d10><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24" data-v-999e3d10><h2 id="footer-heading" class="sr-only" data-v-999e3d10>Footer</h2><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16" data-v-999e3d10><div class="md:col-span-2 lg:col-span-1" role="complementary" aria-labelledby="company-info-heading" data-v-999e3d10><div class="mb-6" data-v-999e3d10><h3 id="company-info-heading" class="sr-only" data-v-999e3d10> Company Information </h3><div class="text-center mb-4" data-v-999e3d10>`);
      _push(ssrRenderComponent(_sfc_main$4, {
        size: "large",
        "show-text": false,
        "show-tagline": false,
        class: "mx-auto mb-3"
      }, null, _parent));
      _push(`<h3 class="text-lg md:text-xl font-bold text-white font-inter whitespace-nowrap" data-v-999e3d10> ESHAKA WIJAYA LOGISTICS </h3></div></div><p class="text-gray-300 mb-6 md:mb-8 leading-relaxed font-jost text-sm md:text-base" data-v-999e3d10> Reliable logistics solutions for export-import, inland trucking, international money transfer, and shipment insurance with high professional standards since 2004. </p><div class="flex flex-wrap items-center gap-2 md:gap-3 mb-6 md:mb-8" data-v-999e3d10><div class="flex items-center px-3 py-1.5 bg-sage-600/20 rounded-full" data-v-999e3d10><div class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" data-v-999e3d10></div><span class="text-xs md:text-sm text-sage-200 font-jost font-medium" data-v-999e3d10>Online 24/7</span></div><div class="flex items-center px-3 py-1.5 bg-sage-600/20 rounded-full" data-v-999e3d10><svg class="w-3 h-3 text-sage-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-999e3d10><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" data-v-999e3d10></path></svg><span class="text-xs md:text-sm text-sage-200 font-jost font-medium" data-v-999e3d10>ISO Certified</span></div></div><div class="flex flex-wrap gap-3 md:gap-4" role="list" aria-label="Social media links" data-v-999e3d10><!--[-->`);
      ssrRenderList(socialMedia, (social) => {
        _push(`<a${ssrRenderAttr("href", social.url)} target="_blank" class="${ssrRenderClass([social.hoverColor, "w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-sage-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"])}"${ssrRenderAttr("aria-label", `Follow us on ${social.name}`)} role="listitem" rel="noopener noreferrer" data-v-999e3d10><div class="w-4 h-4 md:w-5 md:h-5 text-gray-300 group-hover:text-white" data-v-999e3d10>${social.icon ?? ""}</div></a>`);
      });
      _push(`<!--]--></div></div><div role="navigation" aria-labelledby="services-heading" data-v-999e3d10><h3 id="services-heading" class="text-lg md:text-xl font-bold mb-6 md:mb-8 text-white font-inter" data-v-999e3d10> Our Services </h3><ul class="space-y-3 md:space-y-4" role="list" data-v-999e3d10><!--[-->`);
      ssrRenderList(services, (service) => {
        _push(`<li data-v-999e3d10><a${ssrRenderAttr("href", service.link)} class="text-gray-300 hover:text-sage-300 transition-colors duration-300 flex items-start group cursor-pointer"${ssrRenderAttr("aria-label", `Navigate to ${service.name} section`)} data-v-999e3d10><svg class="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 mt-1 flex-shrink-0 text-sage-600 group-hover:text-sage-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-999e3d10><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" data-v-999e3d10></path></svg><span class="group-hover:translate-x-1 transition-transform duration-300 font-jost text-sm md:text-base" data-v-999e3d10>${ssrInterpolate(service.name)}</span></a></li>`);
      });
      _push(`<!--]--></ul></div><div role="navigation" aria-labelledby="quick-links-heading" data-v-999e3d10><h3 id="quick-links-heading" class="text-lg md:text-xl font-bold mb-6 md:mb-8 text-white font-inter" data-v-999e3d10> Quick Menu </h3><ul class="space-y-3 md:space-y-4" role="list" data-v-999e3d10><!--[-->`);
      ssrRenderList(quickLinks, (link) => {
        _push(`<li data-v-999e3d10><a${ssrRenderAttr("href", link.url)} class="text-gray-300 hover:text-sage-300 transition-colors duration-300 flex items-start group cursor-pointer"${ssrRenderAttr("aria-label", `Navigate to ${link.name} page`)} data-v-999e3d10><svg class="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 mt-1 flex-shrink-0 text-sage-600 group-hover:text-sage-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-999e3d10><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 5l7 7-7 7" data-v-999e3d10></path></svg><span class="group-hover:translate-x-1 transition-transform duration-300 font-jost text-sm md:text-base" data-v-999e3d10>${ssrInterpolate(link.name)}</span></a></li>`);
      });
      _push(`<!--]--></ul></div><div role="complementary" aria-labelledby="contact-info-heading" data-v-999e3d10><h3 id="contact-info-heading" class="text-lg md:text-xl font-bold mb-6 md:mb-8 text-white font-inter" data-v-999e3d10> Contact Us </h3><div class="space-y-4 md:space-y-6" role="list" data-v-999e3d10><!--[-->`);
      ssrRenderList(contactInfo, (contact) => {
        _push(`<div class="group hover:bg-white/5 p-3 rounded-xl transition-colors duration-300" role="listitem" data-v-999e3d10><div class="flex items-start" data-v-999e3d10><div class="w-10 h-10 md:w-12 md:h-12 bg-sage-600/20 rounded-xl flex items-center justify-center mr-3 md:mr-4 mt-1 group-hover:bg-sage-600 transition-colors duration-300 flex-shrink-0" data-v-999e3d10><div class="w-4 h-4 md:w-5 md:h-5 text-sage-300 group-hover:text-white" data-v-999e3d10>${contact.icon ?? ""}</div></div><div class="min-w-0 flex-1" data-v-999e3d10><div class="text-xs md:text-sm text-sage-300 mb-1 font-medium font-jost" data-v-999e3d10>${ssrInterpolate(contact.type)}</div><div class="text-sm md:text-base text-white font-semibold mb-1 font-jost break-words" data-v-999e3d10>${ssrInterpolate(contact.value)}</div>`);
        if (contact.secondary) {
          _push(`<div class="text-xs md:text-sm text-gray-400 font-jost" data-v-999e3d10>${ssrInterpolate(contact.secondary)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="border-t border-gray-700/50 bg-gray-900/50" data-v-999e3d10><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8" data-v-999e3d10><div class="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 gap-4" data-v-999e3d10><div class="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6 text-center md:text-left" data-v-999e3d10><p class="text-gray-400 text-xs md:text-sm font-jost" data-v-999e3d10> © ${ssrInterpolate(currentYear.value)} Eshaka Wijaya Logistics. All rights reserved. </p><div class="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6" data-v-999e3d10><!--[-->`);
      ssrRenderList(legalLinks, (legal) => {
        _push(`<a${ssrRenderAttr("href", legal.url)} class="text-gray-400 hover:text-sage-300 text-xs md:text-sm transition-colors duration-300 font-jost" data-v-999e3d10>${ssrInterpolate(legal.name)}</a>`);
      });
      _push(`<!--]--></div></div><div class="flex items-center justify-center lg:justify-end" data-v-999e3d10><div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4" data-v-999e3d10><span class="text-xs md:text-sm text-gray-400 font-jost" data-v-999e3d10>Certified by:</span><div class="flex flex-wrap justify-center gap-2" data-v-999e3d10><!--[-->`);
      ssrRenderList(certifications, (cert) => {
        _push(`<div class="flex items-center px-3 py-1.5 bg-sage-600/20 rounded-full" data-v-999e3d10><div class="w-3 h-3 md:w-4 md:h-4 text-sage-300 mr-1.5 md:mr-2" data-v-999e3d10>${cert.icon ?? ""}</div><span class="text-xs text-sage-200 font-medium font-jost" data-v-999e3d10>${ssrInterpolate(cert.name)}</span></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div><div class="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50" data-v-999e3d10><div style="${ssrRenderStyle(isExpanded.value ? null : { display: "none" })}" class="flex flex-col items-center space-y-3 mb-3 transition-all duration-300" data-v-999e3d10><!--[-->`);
      ssrRenderList(csContacts, (cs) => {
        _push(`<div class="relative flex items-center group" data-v-999e3d10><div class="absolute right-14 bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap" data-v-999e3d10>${ssrInterpolate(cs.name)}</div><button class="w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center" data-v-999e3d10><svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" data-v-999e3d10><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" data-v-999e3d10></path></svg></button></div>`);
      });
      _push(`<!--]--></div><div style="${ssrRenderStyle(!isExpanded.value ? null : { display: "none" })}" class="absolute -left-32 top-1/2 transform -translate-y-1/2" data-v-999e3d10><div class="flex items-center bg-green-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-full shadow-lg animate-pulse-slow" data-v-999e3d10><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-999e3d10><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" data-v-999e3d10></path></svg><span class="text-xs font-semibold whitespace-nowrap" data-v-999e3d10>Hubungi CS</span></div><div class="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2" data-v-999e3d10><div class="w-0 h-0 border-l-8 border-l-green-500/90 border-t-4 border-t-transparent border-b-4 border-b-transparent" data-v-999e3d10></div></div></div><button class="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center relative overflow-hidden animate-pulse-slow" data-v-999e3d10><svg style="${ssrRenderStyle(!isExpanded.value ? null : { display: "none" })}" class="w-8 h-8 transition-all duration-300" fill="currentColor" viewBox="0 0 24 24" data-v-999e3d10><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" data-v-999e3d10></path></svg><svg style="${ssrRenderStyle(isExpanded.value ? null : { display: "none" })}" class="w-6 h-6 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-999e3d10><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-999e3d10></path></svg></button></div></footer>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FooterSection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const FooterSection = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-999e3d10"]]);
export {
  AboutSection as A,
  ContactSection as C,
  FooterSection as F,
  NavBar as N
};
