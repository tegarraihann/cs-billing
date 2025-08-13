import { ref, reactive, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const dashboardRoute = "/master-admin/dashboard";
const usersRoute = "/master-admin/users";
const pengaturanUmumRoute = "/master-admin/website-settings/pengaturan-umum";
const serviceRoute = "/master-admin/website-settings/services";
const supportServiceRoute = "/master-admin/website-settings/support-services";
const teamRoute = "/master-admin/website-settings/team";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    settings: Object
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const props = __props;
    const isMobileSidebarOpen = ref(false);
    const loading = ref(false);
    const form = reactive({
      company_name: ((_a = props.settings) == null ? void 0 : _a.company_name) || "",
      company_description: ((_b = props.settings) == null ? void 0 : _b.company_description) || "",
      trust_badge_text: ((_c = props.settings) == null ? void 0 : _c.trust_badge_text) || "Trusted for over 20 Years",
      contact_phone: ((_d = props.settings) == null ? void 0 : _d.contact_phone) || "",
      contact_email: ((_e = props.settings) == null ? void 0 : _e.contact_email) || "",
      whatsapp_number: ((_f = props.settings) == null ? void 0 : _f.whatsapp_number) || "",
      meta_description: ((_g = props.settings) == null ? void 0 : _g.meta_description) || "",
      meta_keywords: ((_h = props.settings) == null ? void 0 : _h.meta_keywords) || "",
      hero_background_image: null,
      company_logo: null
    });
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        isMobileSidebarOpen.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      console.log("Settings data:", props.settings);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-375d23c6><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-375d23c6><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-375d23c6><div class="flex justify-between items-center h-16" data-v-375d23c6><div class="lg:hidden" data-v-375d23c6><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors" data-v-375d23c6><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-375d23c6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-375d23c6></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-375d23c6><h1 class="text-lg sm:text-xl font-semibold text-sage-800" data-v-375d23c6> Pengaturan Umum </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-375d23c6>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b3, _c3, _d2;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-375d23c6${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-375d23c6${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-375d23c6${_scopeId}>${ssrInterpolate(getInitials((_a3 = _ctx.$page.props.auth.user) == null ? void 0 : _a3.name))}</span></div><div class="hidden sm:block text-left" data-v-375d23c6${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-375d23c6${_scopeId}>${ssrInterpolate((_b3 = _ctx.$page.props.auth.user) == null ? void 0 : _b3.name)}</p><p class="text-xs text-sage-500" data-v-375d23c6${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-375d23c6${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-375d23c6${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c3 = _ctx.$page.props.auth.user) == null ? void 0 : _c3.name)), 1)
                ]),
                createVNode("div", { class: "hidden sm:block text-left" }, [
                  createVNode("p", { class: "text-sm font-medium text-sage-700" }, toDisplayString((_d2 = _ctx.$page.props.auth.user) == null ? void 0 : _d2.name), 1),
                  createVNode("p", { class: "text-xs text-sage-500" }, "Master Administrator")
                ]),
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 text-sage-600 hidden sm:block",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M19 9l-7 7-7-7"
                  })
                ]))
              ])
            ];
          }
        }),
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-1" data-v-375d23c6${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-375d23c6${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-375d23c6${_scopeId2}></path></svg><span data-v-375d23c6${_scopeId2}>Profile</span>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      })
                    ])),
                    createVNode("span", null, "Profile")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="border-t border-gray-100 my-1" data-v-375d23c6${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-375d23c6${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-375d23c6${_scopeId2}></path></svg><span data-v-375d23c6${_scopeId2}>Log Out</span>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      })
                    ])),
                    createVNode("span", null, "Log Out")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "py-1" }, [
                createVNode(_sfc_main$2, {
                  href: _ctx.route("profile.edit"),
                  class: "flex items-center space-x-2 px-4 py-2"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      })
                    ])),
                    createVNode("span", null, "Profile")
                  ]),
                  _: 1
                }, 8, ["href"]),
                createVNode("div", { class: "border-t border-gray-100 my-1" }),
                createVNode(_sfc_main$2, {
                  href: _ctx.route("logout"),
                  method: "post",
                  as: "button",
                  class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      })
                    ])),
                    createVNode("span", null, "Log Out")
                  ]),
                  _: 1
                }, 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></nav>`);
      if (isMobileSidebarOpen.value) {
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-375d23c6></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": isMobileSidebarOpen.value,
        "-translate-x-full": !isMobileSidebarOpen.value
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"])}" data-v-375d23c6><div class="px-6 py-6 border-b border-sage-200" data-v-375d23c6><div class="flex items-center space-x-3" data-v-375d23c6><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-375d23c6><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-375d23c6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-375d23c6></path></svg></div><div data-v-375d23c6><h2 class="text-lg font-bold text-sage-700" data-v-375d23c6>Master Admin</h2><p class="text-xs text-sage-500" data-v-375d23c6>Full System Control</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto" data-v-375d23c6><a${ssrRenderAttr("href", dashboardRoute)} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200" data-v-375d23c6><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-375d23c6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-375d23c6></path></svg><span class="font-medium" data-v-375d23c6>Dashboard</span></a><a${ssrRenderAttr("href", usersRoute)} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200" data-v-375d23c6><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-375d23c6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-375d23c6></path></svg><span class="font-medium" data-v-375d23c6>User Management</span></a><div class="space-y-1" data-v-375d23c6><div class="w-full flex items-center justify-between space-x-3 p-3 rounded-lg bg-sage-100 text-sage-800" data-v-375d23c6><div class="flex items-center space-x-3" data-v-375d23c6><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-375d23c6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-375d23c6></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-375d23c6></path></svg><span class="font-medium" data-v-375d23c6>Website Settings</span></div></div><div class="ml-8 space-y-1 border-l-2 border-sage-200 pl-4" data-v-375d23c6><a${ssrRenderAttr("href", pengaturanUmumRoute)} class="flex items-center space-x-3 p-2 rounded-lg bg-sage-50 text-sage-700 font-medium text-sm" data-v-375d23c6><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-375d23c6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" data-v-375d23c6></path></svg><span data-v-375d23c6>Pengaturan Umum</span></a><a${ssrRenderAttr("href", serviceRoute)} class="flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm" data-v-375d23c6><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-375d23c6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-375d23c6></path></svg><span data-v-375d23c6>Services</span></a><a${ssrRenderAttr("href", supportServiceRoute)} class="flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm" data-v-375d23c6><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-375d23c6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-375d23c6></path></svg><span data-v-375d23c6>Support Services</span></a><a${ssrRenderAttr("href", teamRoute)} class="flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm" data-v-375d23c6><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-375d23c6><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-375d23c6></path></svg><span data-v-375d23c6>Team</span></a></div></div></nav></aside><main class="lg:ml-64 pt-16 min-h-screen" data-v-375d23c6><div class="p-4 sm:p-6 lg:p-8" data-v-375d23c6>`);
      if ((_a2 = _ctx.$page.props.flash) == null ? void 0 : _a2.success) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-375d23c6><span class="block sm:inline" data-v-375d23c6>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_b2 = _ctx.$page.props.flash) == null ? void 0 : _b2.error) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-375d23c6><span class="block sm:inline" data-v-375d23c6>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-6" data-v-375d23c6><nav class="flex" aria-label="Breadcrumb" data-v-375d23c6><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-375d23c6><li class="inline-flex items-center" data-v-375d23c6><a${ssrRenderAttr("href", dashboardRoute)} class="text-sage-600 hover:text-sage-800" data-v-375d23c6>Dashboard</a></li><li data-v-375d23c6><div class="flex items-center" data-v-375d23c6><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-375d23c6><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-375d23c6></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-375d23c6>Pengaturan Umum</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-375d23c6><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-375d23c6><div data-v-375d23c6><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-375d23c6> Pengaturan Umum Website </h2><p class="text-sage-600" data-v-375d23c6> Kelola pengaturan dasar dan konten utama website </p></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-375d23c6><div class="px-6 py-4 border-b border-sage-200" data-v-375d23c6><h3 class="text-lg font-semibold text-sage-800" data-v-375d23c6>Pengaturan Umum</h3><p class="text-sm text-sage-600 mt-1" data-v-375d23c6> Ubah pengaturan dasar website Anda </p></div><form class="p-6 space-y-6" data-v-375d23c6><div data-v-375d23c6><label class="block text-sm font-medium text-sage-700 mb-2" data-v-375d23c6>Background Hero</label><div class="flex items-center space-x-4" data-v-375d23c6>`);
      if ((_c2 = __props.settings) == null ? void 0 : _c2.hero_background_image) {
        _push(`<div class="relative" data-v-375d23c6><img${ssrRenderAttr("src", `/storage/${__props.settings.hero_background_image}`)} alt="Hero Background" class="w-32 h-20 object-cover rounded border" data-v-375d23c6></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-375d23c6><input type="file" accept="image/*" class="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-sage-50 file:text-sage-700 hover:file:bg-sage-100" data-v-375d23c6><p class="text-xs text-gray-500 mt-1" data-v-375d23c6> Maksimal 5MB (JPEG, PNG, JPG, GIF) </p></div></div></div><div data-v-375d23c6><label class="block text-sm font-medium text-sage-700 mb-2" data-v-375d23c6>Nama Perusahaan <span class="text-red-500" data-v-375d23c6>*</span></label><input${ssrRenderAttr("value", form.company_name)} type="text" required placeholder="PT ESHAKA WIJAYA LOGISTICS" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-375d23c6><p class="text-xs text-gray-500 mt-1" data-v-375d23c6> Nama perusahaan yang akan ditampilkan di hero section </p></div><div data-v-375d23c6><label class="block text-sm font-medium text-sage-700 mb-2" data-v-375d23c6>Deskripsi Perusahaan</label><textarea rows="4" placeholder="Trusted solutions for your international export-import and logistics needs with professional and experienced services." class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-375d23c6>${ssrInterpolate(form.company_description)}</textarea><p class="text-xs text-gray-500 mt-1" data-v-375d23c6> Deskripsi singkat perusahaan yang akan ditampilkan di bawah nama perusahaan </p></div><div data-v-375d23c6><label class="block text-sm font-medium text-sage-700 mb-2" data-v-375d23c6>Badge Kepercayaan</label><input${ssrRenderAttr("value", form.trust_badge_text)} type="text" placeholder="Trusted for over 20 Years" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-375d23c6><p class="text-xs text-gray-500 mt-1" data-v-375d23c6> Teks badge kepercayaan yang akan ditampilkan di hero section </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-375d23c6><div data-v-375d23c6><label class="block text-sm font-medium text-sage-700 mb-2" data-v-375d23c6>Nomor Telepon</label><input${ssrRenderAttr("value", form.contact_phone)} type="text" placeholder="+62 21 1234567" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-375d23c6></div><div data-v-375d23c6><label class="block text-sm font-medium text-sage-700 mb-2" data-v-375d23c6>Email</label><input${ssrRenderAttr("value", form.contact_email)} type="email" placeholder="info@example.com" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-375d23c6></div><div data-v-375d23c6><label class="block text-sm font-medium text-sage-700 mb-2" data-v-375d23c6>WhatsApp (format: 628xxxxxxxxx)</label><input${ssrRenderAttr("value", form.whatsapp_number)} type="text" placeholder="628123456789" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-375d23c6></div></div><div class="pt-6 border-t border-sage-200" data-v-375d23c6><h4 class="text-lg font-medium text-sage-800 mb-4" data-v-375d23c6> SEO Settings </h4><div class="space-y-4" data-v-375d23c6><div data-v-375d23c6><label class="block text-sm font-medium text-sage-700 mb-2" data-v-375d23c6>Meta Description</label><textarea rows="3" placeholder="Deskripsi website untuk SEO" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-375d23c6>${ssrInterpolate(form.meta_description)}</textarea><p class="text-xs text-gray-500 mt-1" data-v-375d23c6> Maksimal 160 karakter untuk hasil pencarian yang optimal </p></div><div data-v-375d23c6><label class="block text-sm font-medium text-sage-700 mb-2" data-v-375d23c6>Meta Keywords</label><input${ssrRenderAttr("value", form.meta_keywords)} type="text" placeholder="logistics, export, import, shipping" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-375d23c6><p class="text-xs text-gray-500 mt-1" data-v-375d23c6> Pisahkan dengan koma untuk kata kunci yang berbeda </p></div></div></div><div class="flex justify-end pt-6 border-t border-sage-200" data-v-375d23c6><button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="bg-sage-600 text-white px-6 py-2 rounded-md hover:bg-sage-700 disabled:opacity-50 transition-colors" data-v-375d23c6>`);
      if (loading.value) {
        _push(`<span data-v-375d23c6>Menyimpan...</span>`);
      } else {
        _push(`<span data-v-375d23c6>Simpan Pengaturan</span>`);
      }
      _push(`</button></div></form></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/PengaturanUmum/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-375d23c6"]]);
export {
  Index as default
};
