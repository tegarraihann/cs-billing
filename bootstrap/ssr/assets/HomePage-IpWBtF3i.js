import { ref, onMounted, onUnmounted, mergeProps, useSSRContext, computed } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$6 = {
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const mobileMenuOpen = ref(false);
    const activeSection = ref("#home");
    const navigation = [
      { name: "Beranda", href: "#home" },
      { name: "Layanan", href: "#services" },
      { name: "Tentang", href: "#about" },
      { name: "Mitra", href: "#partners" },
      { name: "Kontak", href: "#contact" }
    ];
    const handleScroll = () => {
      const sections = ["#home", "#services", "#about", "#partners", "#contact"];
      const scrollPosition = window.scrollY + 100;
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
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fixed w-full bg-white/95 backdrop-blur-sm shadow-lg z-50 transition-all duration-300" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-16"><div class="flex items-center"><div class="flex-shrink-0"><img class="h-10 w-auto" src="/images/logo.png" alt="Logo"></div><div class="hidden md:block ml-4"><div class="text-xl font-bold text-blue-900"> Logistic </div></div></div><div class="hidden md:block"><div class="ml-10 flex items-baseline space-x-8"><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(`<a${ssrRenderAttr("href", item.href)} class="${ssrRenderClass([{ "text-blue-600 font-semibold": activeSection.value === item.href }, "text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer"])}">${ssrInterpolate(item.name)}</a>`);
      });
      _push(`<!--]--></div></div><div class="hidden md:block"><button class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"> Hubungi Kami </button></div><div class="md:hidden"><button class="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">`);
      if (!mobileMenuOpen.value) {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`);
      } else {
        _push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`);
      }
      _push(`</svg></button></div></div></div><div style="${ssrRenderStyle(mobileMenuOpen.value ? null : { display: "none" })}" class="md:hidden bg-white border-t"><div class="px-2 pt-2 pb-3 space-y-1"><!--[-->`);
      ssrRenderList(navigation, (item) => {
        _push(`<a${ssrRenderAttr("href", item.href)} class="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium cursor-pointer">${ssrInterpolate(item.name)}</a>`);
      });
      _push(`<!--]--><button class="w-full mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300"> Hubungi Kami </button></div></div></nav>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/homePage/Navbar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "home",
        class: "relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"
      }, _attrs))} data-v-bd4ef50e><div class="absolute inset-0 opacity-10" data-v-bd4ef50e><div class="absolute inset-0" style="${ssrRenderStyle({ "background-image": "url('#')" })}" data-v-bd4ef50e></div></div><div class="absolute inset-0" data-v-bd4ef50e><div class="floating-element absolute top-20 left-10 w-20 h-20 bg-blue-400 rounded-full opacity-20 animate-bounce" style="${ssrRenderStyle({ "animation-delay": "0s" })}" data-v-bd4ef50e></div><div class="floating-element absolute top-40 right-20 w-16 h-16 bg-indigo-400 rounded-full opacity-20 animate-bounce" style="${ssrRenderStyle({ "animation-delay": "1s" })}" data-v-bd4ef50e></div><div class="floating-element absolute bottom-40 left-20 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-bounce" style="${ssrRenderStyle({ "animation-delay": "2s" })}" data-v-bd4ef50e></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" data-v-bd4ef50e><div class="grid lg:grid-cols-2 gap-12 items-center" data-v-bd4ef50e><div class="text-center lg:text-left" data-v-bd4ef50e><div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6 animate-fade-in" data-v-bd4ef50e><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" data-v-bd4ef50e><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-bd4ef50e></path></svg> Terpercaya sejak 2015 </div><h1 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight animate-slide-up" data-v-bd4ef50e> Solusi Logistik <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300" data-v-bd4ef50e> Terpercaya </span></h1><p class="text-xl text-blue-100 mb-8 leading-relaxed animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}" data-v-bd4ef50e> Melayani ekspor-impor, trucking inland, transfer uang internasional, dan asuransi barang kiriman ke seluruh Indonesia dan mancanegara dengan layanan profesional. </p><div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style="${ssrRenderStyle({ "animation-delay": "0.4s" })}" data-v-bd4ef50e><button class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-1" data-v-bd4ef50e> Konsultasi Gratis </button><button class="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-900 transition-all duration-300" data-v-bd4ef50e> Lihat Layanan </button></div><div class="grid grid-cols-3 gap-8 mt-12 animate-fade-in" style="${ssrRenderStyle({ "animation-delay": "0.6s" })}" data-v-bd4ef50e><div class="text-center" data-v-bd4ef50e><div class="text-3xl font-bold text-white" data-v-bd4ef50e>500+</div><div class="text-blue-200 text-sm" data-v-bd4ef50e>Klien Aktif</div></div><div class="text-center" data-v-bd4ef50e><div class="text-3xl font-bold text-white" data-v-bd4ef50e>50+</div><div class="text-blue-200 text-sm" data-v-bd4ef50e>Negara Tujuan</div></div><div class="text-center" data-v-bd4ef50e><div class="text-3xl font-bold text-white" data-v-bd4ef50e>99%</div><div class="text-blue-200 text-sm" data-v-bd4ef50e>Kepuasan Klien</div></div></div></div><div class="relative lg:ml-8 animate-fade-in" style="${ssrRenderStyle({ "animation-delay": "0.8s" })}" data-v-bd4ef50e><div class="relative" data-v-bd4ef50e><div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl" data-v-bd4ef50e><div class="grid grid-cols-2 gap-6" data-v-bd4ef50e><div class="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-6 text-white" data-v-bd4ef50e><svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20" data-v-bd4ef50e><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" data-v-bd4ef50e></path></svg><h3 class="font-semibold mb-2" data-v-bd4ef50e>Export/Import</h3><p class="text-sm opacity-90" data-v-bd4ef50e>Layanan ekspor impor terpercaya</p></div><div class="bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl p-6 text-white" data-v-bd4ef50e><svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20" data-v-bd4ef50e><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" data-v-bd4ef50e></path><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z" data-v-bd4ef50e></path></svg><h3 class="font-semibold mb-2" data-v-bd4ef50e>Trucking</h3><p class="text-sm opacity-90" data-v-bd4ef50e>Pengiriman darat seluruh Indonesia</p></div><div class="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-6 text-white" data-v-bd4ef50e><svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20" data-v-bd4ef50e><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" data-v-bd4ef50e></path></svg><h3 class="font-semibold mb-2" data-v-bd4ef50e>Transfer Uang</h3><p class="text-sm opacity-90" data-v-bd4ef50e>Transfer ke seluruh dunia</p></div><div class="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-6 text-white" data-v-bd4ef50e><svg class="w-8 h-8 mb-4" fill="currentColor" viewBox="0 0 20 20" data-v-bd4ef50e><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" data-v-bd4ef50e></path></svg><h3 class="font-semibold mb-2" data-v-bd4ef50e>Asuransi</h3><p class="text-sm opacity-90" data-v-bd4ef50e>Proteksi barang kiriman</p></div></div></div><div class="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse" data-v-bd4ef50e> 24/7 Service </div><div class="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-pulse" data-v-bd4ef50e> Trusted </div></div></div></div></div><div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" data-v-bd4ef50e><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-bd4ef50e><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" data-v-bd4ef50e></path></svg></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/HeroSection.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const HeroSection = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-bd4ef50e"]]);
const _sfc_main$4 = {
  __name: "ServicesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const services = [
      {
        title: "Export & Import",
        description: "Layanan ekspor impor lengkap dengan handling dokumen, customs clearance, dan koordinasi dengan berbagai pihak terkait.",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>',
        iconBg: "bg-gradient-to-r from-blue-500 to-blue-600",
        features: [
          "Customs clearance",
          "Dokumentasi lengkap",
          "Koordinasi port authority",
          "Real-time tracking"
        ],
        featured: true
      },
      {
        title: "Trucking Inland",
        description: "Pengiriman darat ke seluruh wilayah Indonesia dengan armada yang terawat dan sistem tracking real-time.",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/><path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z"/></svg>',
        iconBg: "bg-gradient-to-r from-green-500 to-green-600",
        features: [
          "Armada terawat",
          "Tracking real-time",
          "Jangkauan nasional",
          "Asuransi tersedia"
        ]
      },
      {
        title: "Transfer Uang",
        description: "Layanan transfer uang internasional khususnya ke China dengan kurs kompetitif dan proses cepat aman.",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/></svg>',
        iconBg: "bg-gradient-to-r from-purple-500 to-purple-600",
        features: [
          "Transfer ke seluruh dunia",
          "Kurs kompetitif",
          "Proses cepat & aman",
          "Fokus China market"
        ]
      },
      {
        title: "Asuransi Barang",
        description: "Proteksi lengkap untuk barang kiriman Anda dengan coverage yang komprehensif dan claim process yang mudah.",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/></svg>',
        iconBg: "bg-gradient-to-r from-red-500 to-red-600",
        features: [
          "Coverage komprehensif",
          "Claim mudah & cepat",
          "Premi kompetitif",
          "Support 24/7"
        ]
      }
    ];
    const processSteps = [
      {
        title: "Konsultasi",
        description: "Diskusi kebutuhan dan solusi terbaik untuk Anda"
      },
      {
        title: "Quotation",
        description: "Penawaran harga transparan dan kompetitif"
      },
      {
        title: "Eksekusi",
        description: "Pelaksanaan layanan sesuai SOP dan timeline"
      },
      {
        title: "Monitoring",
        description: "Tracking dan update progress secara real-time"
      }
    ];
    const additionalServices = [
      {
        title: "Warehousing",
        description: "Fasilitas gudang modern dengan sistem inventory management",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/></svg>'
      },
      {
        title: "Packaging",
        description: "Layanan pengemasan profesional untuk berbagai jenis barang",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"/></svg>'
      },
      {
        title: "Consulting",
        description: "Konsultasi perdagangan internasional dan regulasi kepabeanan",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"/></svg>'
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "services",
        class: "py-20 bg-white"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-4xl font-bold text-gray-900 mb-4"> Layanan Kami </h2><p class="text-xl text-gray-600 max-w-3xl mx-auto"> Solusi logistik lengkap untuk kebutuhan bisnis Anda dengan standar internasional dan pelayanan terpercaya </p></div><div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"><!--[-->`);
      ssrRenderList(services, (service, index) => {
        _push(`<div class="${ssrRenderClass([service.featured ? "lg:col-span-2 lg:row-span-2" : "", "group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"])}"><div class="${ssrRenderClass([service.iconBg, "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"])}"><div class="w-8 h-8 text-white">${service.icon ?? ""}</div></div><h3 class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">${ssrInterpolate(service.title)}</h3><p class="text-gray-600 mb-6 leading-relaxed">${ssrInterpolate(service.description)}</p><ul class="space-y-2 mb-6"><!--[-->`);
        ssrRenderList(service.features, (feature) => {
          _push(`<li class="flex items-start"><svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg><span class="text-sm text-gray-700">${ssrInterpolate(feature)}</span></li>`);
        });
        _push(`<!--]--></ul><button class="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform group-hover:scale-105"> Pelajari Lebih Lanjut </button>`);
        if (service.featured) {
          _push(`<div class="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg"> Unggulan </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-12"><div class="text-center mb-12"><h3 class="text-3xl font-bold text-gray-900 mb-4"> Proses Kerja Kami </h3><p class="text-gray-600 max-w-2xl mx-auto"> Sistem kerja yang tersistem dan transparan untuk memastikan kepuasan pelanggan </p></div><div class="grid md:grid-cols-4 gap-8"><!--[-->`);
      ssrRenderList(processSteps, (step, index) => {
        _push(`<div class="text-center group"><div class="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">${ssrInterpolate(index + 1)}</div>`);
        if (index < processSteps.length - 1) {
          _push(`<div class="hidden md:block absolute top-8 left-1/2 transform translate-x-8 w-24 h-0.5 bg-gradient-to-r from-blue-300 to-blue-400"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h4 class="text-lg font-semibold text-gray-900 mb-2">${ssrInterpolate(step.title)}</h4><p class="text-gray-600 text-sm">${ssrInterpolate(step.description)}</p></div>`);
      });
      _push(`<!--]--></div></div><div class="mt-16"><h3 class="text-2xl font-bold text-center text-gray-900 mb-8"> Layanan Tambahan </h3><div class="grid md:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(additionalServices, (addon) => {
        _push(`<div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"><div class="flex items-center mb-4"><div class="w-8 h-8 text-blue-600 mr-3">${addon.icon ?? ""}</div><h4 class="text-lg font-semibold text-gray-900">${ssrInterpolate(addon.title)}</h4></div><p class="text-gray-600 text-sm">${ssrInterpolate(addon.description)}</p></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ServicesSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = {
  __name: "AboutSection",
  __ssrInlineRender: true,
  setup(__props) {
    const keyPoints = [
      {
        title: "Pengalaman 15+ Tahun",
        description: "Melayani ekspor-impor dan logistik dengan track record yang terpercaya"
      },
      {
        title: "Jaringan Global",
        description: "Kemitraan dengan 50+ negara untuk memfasilitasi perdagangan internasional"
      },
      {
        title: "Teknologi Modern",
        description: "Sistem tracking real-time dan digitalisasi proses untuk efisiensi maksimal"
      },
      {
        title: "Tim Profesional",
        description: "Didukung oleh experts bersertifikat internasional di bidang logistik"
      }
    ];
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
    const teamLeaders = [
      {
        name: "Budi Hartono",
        position: "CEO & Founder",
        initial: "BH",
        description: "Berpengalaman 20+ tahun di industri logistik internasional dengan spesialisasi ekspor-impor Asia Pasifik.",
        skills: ["Strategic Planning", "International Trade", "Business Development"]
      },
      {
        name: "Sarah Wijaya",
        position: "COO",
        initial: "SW",
        description: "Expert dalam operasional logistik dan supply chain management dengan sertifikasi internasional.",
        skills: ["Operations Management", "Supply Chain", "Process Optimization"]
      },
      {
        name: "Michael Chen",
        position: "Head of International",
        initial: "MC",
        description: "Specialist hubungan internasional dengan fokus pasar China dan Asia Tenggara.",
        skills: ["International Relations", "China Market", "Trade Finance"]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "about",
        class: "py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-4xl font-bold text-gray-900 mb-4"> Tentang LogisticPro </h2><p class="text-xl text-gray-600 max-w-3xl mx-auto"> Berpengalaman lebih dari 15 tahun dalam industri logistik Indonesia, kami hadir sebagai mitra terpercaya untuk solusi perdagangan internasional </p></div><div class="grid lg:grid-cols-2 gap-16 items-center mb-20"><div><div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6"><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path></svg> Sertifikat Resmi </div><h3 class="text-3xl font-bold text-gray-900 mb-6"> Mitra Logistik Terpercaya <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Sejak 2015 </span></h3><p class="text-lg text-gray-600 mb-8 leading-relaxed"> LogisticPro didirikan dengan visi menjadi perusahaan logistik terdepan di Indonesia. Kami menyediakan layanan ekspor-impor, trucking inland, transfer uang internasional, dan asuransi barang dengan standar kualitas internasional. </p><div class="space-y-4 mb-8"><!--[-->`);
      ssrRenderList(keyPoints, (point) => {
        _push(`<div class="flex items-start"><div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1"><svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg></div><div><h4 class="text-lg font-semibold text-gray-900 mb-1">${ssrInterpolate(point.title)}</h4><p class="text-gray-600">${ssrInterpolate(point.description)}</p></div></div>`);
      });
      _push(`<!--]--></div><button class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"> Konsultasi Sekarang </button></div><div class="relative"><div class="bg-white rounded-3xl p-8 shadow-2xl"><div class="grid grid-cols-2 gap-6 mb-8"><!--[-->`);
      ssrRenderList(companyStats, (stat) => {
        _push(`<div class="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl"><div class="text-3xl font-bold text-blue-600 mb-2">${ssrInterpolate(stat.value)}</div><div class="text-gray-600 font-medium text-sm">${ssrInterpolate(stat.label)}</div></div>`);
      });
      _push(`<!--]--></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(achievements, (achievement) => {
        _push(`<div class="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100"><div class="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl flex items-center justify-center mr-4"><div class="w-6 h-6 text-white">${achievement.icon ?? ""}</div></div><div><h4 class="font-semibold text-gray-900">${ssrInterpolate(achievement.title)}</h4><p class="text-sm text-gray-600">${ssrInterpolate(achievement.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></div><div class="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 animate-pulse"></div><div class="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20 animate-pulse" style="${ssrRenderStyle({ "animation-delay": "1s" })}"></div></div></div><div class="grid md:grid-cols-2 gap-12 mb-20"><div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"><div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6"><svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></div><h3 class="text-2xl font-bold text-gray-900 mb-4">Visi Kami</h3><p class="text-gray-600 leading-relaxed"> Menjadi perusahaan logistik terdepan di Indonesia yang menghubungkan bisnis lokal dengan pasar global, memberikan solusi terpadu yang efisien, inovatif, dan berkelanjutan untuk mendukung pertumbuhan ekonomi nasional. </p></div><div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"><div class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6"><svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"></path><path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path></svg></div><h3 class="text-2xl font-bold text-gray-900 mb-4">Misi Kami</h3><ul class="space-y-3 text-gray-600"><li class="flex items-start"><svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg> Menyediakan layanan logistik berkualitas tinggi dengan teknologi terdepan </li><li class="flex items-start"><svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg> Membangun jaringan distribusi yang reliable dan efisien </li><li class="flex items-start"><svg class="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg> Mengembangkan SDM profesional dengan komitmen pelayanan prima </li></ul></div></div><div class="bg-white rounded-3xl p-12 shadow-xl"><div class="text-center mb-12"><h3 class="text-3xl font-bold text-gray-900 mb-4"> Tim Leadership </h3><p class="text-gray-600 max-w-2xl mx-auto"> Dipimpin oleh para profesional berpengalaman di industri logistik dan perdagangan internasional </p></div><div class="grid md:grid-cols-3 gap-8"><!--[-->`);
      ssrRenderList(teamLeaders, (leader) => {
        _push(`<div class="text-center group hover:transform hover:-translate-y-2 transition-all duration-300"><div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300"><div class="text-4xl font-bold text-blue-600">${ssrInterpolate(leader.initial)}</div></div><h4 class="text-xl font-bold text-gray-900 mb-2">${ssrInterpolate(leader.name)}</h4><p class="text-blue-600 font-semibold mb-3">${ssrInterpolate(leader.position)}</p><p class="text-gray-600 text-sm leading-relaxed">${ssrInterpolate(leader.description)}</p><div class="flex flex-wrap justify-center gap-2 mt-4"><!--[-->`);
        ssrRenderList(leader.skills, (skill) => {
          _push(`<span class="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">${ssrInterpolate(skill)}</span>`);
        });
        _push(`<!--]--></div></div>`);
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
const _sfc_main$2 = {
  __name: "ContactSection",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      name: "",
      email: "",
      company: "",
      service: "",
      message: ""
    });
    const offices = [
      {
        id: 1,
        name: "Kantor Pusat Jakarta",
        address: "Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190",
        phone: "+62 21 2555-0123",
        email: "jakarta@logisticpro.co.id"
      },
      {
        id: 2,
        name: "Cabang Surabaya",
        address: "Jl. Raya Darmo 68-70, Surabaya 60264",
        phone: "+62 31 8765-4321",
        email: "surabaya@logisticpro.co.id"
      },
      {
        id: 3,
        name: "Cabang Medan",
        address: "Jl. Asia Baru No. 88, Medan 20214",
        phone: "+62 61 4567-8901",
        email: "medan@logisticpro.co.id"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "contact",
        class: "py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"
      }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-16"><h2 class="text-4xl font-bold text-white mb-4"> Hubungi Kami </h2><p class="text-xl text-blue-100 max-w-3xl mx-auto"> Tim profesional kami siap membantu kebutuhan logistik Anda 24/7 </p></div><div class="grid lg:grid-cols-2 gap-12"><div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"><h3 class="text-2xl font-bold text-white mb-6">Kirim Pesan</h3><form class="space-y-6"><div class="grid md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-blue-100 mb-2">Nama Lengkap</label><input${ssrRenderAttr("value", form.value.name)} type="text" required class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300" placeholder="Masukkan nama Anda"></div><div><label class="block text-sm font-medium text-blue-100 mb-2">Email</label><input${ssrRenderAttr("value", form.value.email)} type="email" required class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300" placeholder="email@example.com"></div></div><div class="grid md:grid-cols-2 gap-6"><div><label class="block text-sm font-medium text-blue-100 mb-2">Perusahaan</label><input${ssrRenderAttr("value", form.value.company)} type="text" class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300" placeholder="Nama perusahaan"></div><div><label class="block text-sm font-medium text-blue-100 mb-2">Layanan</label><select class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"><option value="" class="text-gray-900"${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "") : ssrLooseEqual(form.value.service, "")) ? " selected" : ""}>Pilih Layanan</option><option value="export-import" class="text-gray-900"${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "export-import") : ssrLooseEqual(form.value.service, "export-import")) ? " selected" : ""}>Export &amp; Import</option><option value="trucking" class="text-gray-900"${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "trucking") : ssrLooseEqual(form.value.service, "trucking")) ? " selected" : ""}>Trucking Inland</option><option value="money-transfer" class="text-gray-900"${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "money-transfer") : ssrLooseEqual(form.value.service, "money-transfer")) ? " selected" : ""}>Transfer Uang</option><option value="insurance" class="text-gray-900"${ssrIncludeBooleanAttr(Array.isArray(form.value.service) ? ssrLooseContain(form.value.service, "insurance") : ssrLooseEqual(form.value.service, "insurance")) ? " selected" : ""}>Asuransi Barang</option></select></div></div><div><label class="block text-sm font-medium text-blue-100 mb-2">Pesan</label><textarea rows="5" required class="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300" placeholder="Jelaskan kebutuhan Anda...">${ssrInterpolate(form.value.message)}</textarea></div><button type="submit" class="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"> Kirim Pesan </button></form></div><div class="space-y-8"><div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"><h3 class="text-2xl font-bold text-white mb-6">Kantor Kami</h3><div class="space-y-6"><!--[-->`);
      ssrRenderList(offices, (office) => {
        _push(`<div class="flex items-start space-x-4 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300"><div class="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0"><svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"></path></svg></div><div><h4 class="text-lg font-semibold text-white mb-1">${ssrInterpolate(office.name)}</h4><p class="text-blue-100 text-sm mb-2">${ssrInterpolate(office.address)}</p><div class="flex flex-wrap gap-4 text-sm"><span class="text-blue-200">${ssrInterpolate(office.phone)}</span><span class="text-blue-200">${ssrInterpolate(office.email)}</span></div></div></div>`);
      });
      _push(`<!--]--></div></div><div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"><h3 class="text-2xl font-bold text-white mb-6">Kontak Langsung</h3><div class="grid grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(_ctx.directContacts, (contact) => {
        _push(`<a${ssrRenderAttr("href", contact.link)} target="_blank" class="flex items-center space-x-3 p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all duration-300 group"><div class="${ssrRenderClass([contact.bgColor, "w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"])}"><div class="w-5 h-5 text-white">${contact.icon ?? ""}</div></div><div><div class="text-white font-medium text-sm">${ssrInterpolate(contact.name)}</div><div class="text-blue-200 text-xs">${ssrInterpolate(contact.role)}</div></div></a>`);
      });
      _push(`<!--]--></div></div><div class="bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"><h3 class="text-2xl font-bold text-white mb-6">Mengapa Pilih Kami?</h3><div class="space-y-4"><!--[-->`);
      ssrRenderList(_ctx.quickFeatures, (feature) => {
        _push(`<div class="flex items-center space-x-3"><div class="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0"><svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path></svg></div><div><div class="text-white font-medium">${ssrInterpolate(feature.title)}</div><div class="text-blue-200 text-sm">${ssrInterpolate(feature.description)}</div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="mt-16 bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl"><h3 class="text-2xl font-bold text-white mb-6 text-center">Lokasi Kantor Pusat</h3><div class="bg-gray-300 rounded-2xl h-64 flex items-center justify-center"><p class="text-gray-600 text-lg">Google Maps Integration</p><span class="text-sm text-gray-500 ml-2">(Implementasi dengan Google Maps API)</span></div></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ContactSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "FooterSection",
  __ssrInlineRender: true,
  setup(__props) {
    ref("");
    const showBackToTop = ref(false);
    computed(() => (/* @__PURE__ */ new Date()).getFullYear());
    const socialMedia = [
      {
        name: "Facebook",
        url: "https://facebook.com/logisticpro",
        hoverColor: "hover:bg-blue-600",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/></svg>'
      },
      {
        name: "Instagram",
        url: "https://instagram.com/logisticpro",
        hoverColor: "hover:bg-pink-600",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm-2 4h4a4 4 0 014 4v4a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4zm4 1.5H8A2.5 2.5 0 005.5 8v4A2.5 2.5 0 008 14.5h4a2.5 2.5 0 002.5-2.5V8A2.5 2.5 0 0012 5.5zM10 7a3 3 0 100 6 3 3 0 000-6zm0 1.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm3.5-2.5a.5.5 0 11-1 0 .5.5 0 011 0z"/></svg>'
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/company/logisticpro",
        hoverColor: "hover:bg-blue-700",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"/></svg>'
      },
      {
        name: "WhatsApp",
        url: "https://wa.me/6281234567890",
        hoverColor: "hover:bg-green-600",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0010.05 0C4.495 0 .16 4.335.157 9.892c0 1.743.456 3.448 1.328 4.956L0 20l5.304-1.39a9.934 9.934 0 004.737 1.215h.005c5.505 0 9.847-4.336 9.847-9.892A9.824 9.824 0 0020.05 3.488"/></svg>'
      }
    ];
    const services = [
      { name: "Export & Import", link: "#services" },
      { name: "Trucking Inland", link: "#services" },
      { name: "Transfer Uang Internasional", link: "#services" },
      { name: "Asuransi Barang Kiriman", link: "#services" },
      { name: "Warehousing & Storage", link: "#services" },
      { name: "Packaging Services", link: "#services" },
      { name: "Customs Clearance", link: "#services" },
      { name: "Trade Consulting", link: "#services" }
    ];
    const quickLinks = [
      { name: "Beranda", url: "#home" },
      { name: "Tentang Kami", url: "#about" },
      { name: "Layanan", url: "#services" },
      { name: "Mitra", url: "#partners" },
      { name: "Kontak", url: "#contact" },
      { name: "FAQ", url: "#faq" },
      { name: "Blog", url: "/blog" },
      { name: "Karir", url: "/career" }
    ];
    const contactInfo = [
      {
        type: "Kantor Pusat",
        value: "Jakarta Selatan",
        secondary: "Jl. Jend. Sudirman Kav. 52-53",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"/></svg>'
      },
      {
        type: "Telepon",
        value: "+62 21 2555-0123",
        secondary: "Senin - Jumat, 08:00 - 17:00",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>'
      },
      {
        type: "Email",
        value: "info@logisticpro.co.id",
        secondary: "Respon dalam 24 jam",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>'
      },
      {
        type: "WhatsApp",
        value: "+62 812-3456-7890",
        secondary: "Customer Service 24/7",
        icon: '<svg fill="currentColor" viewBox="0 0 20 20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0010.05 0C4.495 0 .16 4.335.157 9.892c0 1.743.456 3.448 1.328 4.956L0 20l5.304-1.39a9.934 9.934 0 004.737 1.215h.005c5.505 0 9.847-4.336 9.847-9.892A9.824 9.824 0 0020.05 3.488"/></svg>'
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
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div class="grid lg:grid-cols-4 md:grid-cols-2 gap-8"><div class="lg:col-span-1"><div class="flex items-center mb-6"><img class="h-10 w-auto mr-3" src="/images/logo.png" alt="LogisticPro"><div class="text-2xl font-bold">LogisticPro</div></div><p class="text-blue-100 mb-6 leading-relaxed"> Solusi logistik terpercaya untuk ekspor-impor, trucking inland, transfer uang internasional, dan asuransi barang kiriman ke seluruh dunia. </p><div class="flex space-x-4"><!--[-->`);
      ssrRenderList(socialMedia, (social) => {
        _push(`<a${ssrRenderAttr("href", social.url)} target="_blank" class="${ssrRenderClass([social.hoverColor, "w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"])}"><div class="w-5 h-5">${social.icon ?? ""}</div></a>`);
      });
      _push(`<!--]--></div></div><div><h3 class="text-xl font-bold mb-6">Layanan Kami</h3><ul class="space-y-3"><!--[-->`);
      ssrRenderList(services, (service) => {
        _push(`<li><a${ssrRenderAttr("href", service.link)} class="text-blue-100 hover:text-white transition-colors duration-300 flex items-center group"><svg class="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path></svg> ${ssrInterpolate(service.name)}</a></li>`);
      });
      _push(`<!--]--></ul></div><div><h3 class="text-xl font-bold mb-6">Menu Cepat</h3><ul class="space-y-3"><!--[-->`);
      ssrRenderList(quickLinks, (link) => {
        _push(`<li><a${ssrRenderAttr("href", link.url)} class="text-blue-100 hover:text-white transition-colors duration-300 flex items-center group cursor-pointer"><svg class="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"></path></svg> ${ssrInterpolate(link.name)}</a></li>`);
      });
      _push(`<!--]--></ul></div><div><h3 class="text-xl font-bold mb-6">Hubungi Kami</h3><div class="space-y-4"><!--[-->`);
      ssrRenderList(contactInfo, (contact) => {
        _push(`<div class="flex items-start group"><div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-3 mt-1 group-hover:scale-110 transition-transform duration-300"><div class="w-5 h-5">${contact.icon ?? ""}</div></div><div><div class="text-sm text-blue-200 mb-1">${ssrInterpolate(contact.type)}</div><div class="text-white font-medium">${ssrInterpolate(contact.value)}</div>`);
        if (contact.secondary) {
          _push(`<div class="text-sm text-blue-100">${ssrInterpolate(contact.secondary)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></div></div><button style="${ssrRenderStyle(showBackToTop.value ? null : { display: "none" })}" class="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50" aria-label="Back to top"><svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg></button></footer>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/FooterSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
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
      _push(ssrRenderComponent(_sfc_main$6, null, null, _parent));
      _push(ssrRenderComponent(HeroSection, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$4, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
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
