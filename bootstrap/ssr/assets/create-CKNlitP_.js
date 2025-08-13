import { ref, reactive, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const dashboardRoute = "/master-admin/dashboard";
const usersRoute = "/master-admin/users";
const pengaturanUmumRoute = "/master-admin/website-settings/pengaturan-umum";
const serviceRoute = "/master-admin/website-settings/service";
const teamRoute = "/master-admin/website-settings/team";
const _sfc_main = {
  __name: "create",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const isMobileSidebarOpen = ref(false);
    const isSubmitting = ref(false);
    const imagePreview = ref(null);
    const iconPreview = ref(null);
    const errors = ref(props.errors || {});
    const form = reactive({
      title: "",
      description: "",
      image_path: null,
      icon_path: null,
      order_index: 0,
      is_active: true
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
      console.log("Errors:", props.errors);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-58bd0e3a><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-58bd0e3a><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-58bd0e3a><div class="flex justify-between items-center h-16" data-v-58bd0e3a><div class="lg:hidden" data-v-58bd0e3a><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors" data-v-58bd0e3a><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-58bd0e3a></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-58bd0e3a><h1 class="text-lg sm:text-xl font-semibold text-sage-800" data-v-58bd0e3a> Tambah Service </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-58bd0e3a>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-58bd0e3a${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-58bd0e3a${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-58bd0e3a${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-58bd0e3a${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-58bd0e3a${_scopeId}>${ssrInterpolate((_b2 = _ctx.$page.props.auth.user) == null ? void 0 : _b2.name)}</p><p class="text-xs text-sage-500" data-v-58bd0e3a${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-58bd0e3a${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c = _ctx.$page.props.auth.user) == null ? void 0 : _c.name)), 1)
                ]),
                createVNode("div", { class: "hidden sm:block text-left" }, [
                  createVNode("p", { class: "text-sm font-medium text-sage-700" }, toDisplayString((_d = _ctx.$page.props.auth.user) == null ? void 0 : _d.name), 1),
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
            _push2(`<div class="py-1" data-v-58bd0e3a${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-58bd0e3a${_scopeId2}></path></svg><span data-v-58bd0e3a${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-58bd0e3a${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-58bd0e3a${_scopeId2}></path></svg><span data-v-58bd0e3a${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-58bd0e3a></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": isMobileSidebarOpen.value,
        "-translate-x-full": !isMobileSidebarOpen.value
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"])}" data-v-58bd0e3a><div class="px-6 py-6 border-b border-sage-200" data-v-58bd0e3a><div class="flex items-center space-x-3" data-v-58bd0e3a><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-58bd0e3a><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-58bd0e3a></path></svg></div><div data-v-58bd0e3a><h2 class="text-lg font-bold text-sage-700" data-v-58bd0e3a>Master Admin</h2><p class="text-xs text-sage-500" data-v-58bd0e3a>Full System Control</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto" data-v-58bd0e3a><a${ssrRenderAttr("href", dashboardRoute)} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200" data-v-58bd0e3a><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-58bd0e3a></path></svg><span class="font-medium" data-v-58bd0e3a>Dashboard</span></a><a${ssrRenderAttr("href", usersRoute)} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200" data-v-58bd0e3a><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-58bd0e3a></path></svg><span class="font-medium" data-v-58bd0e3a>User Management</span></a><div class="space-y-1" data-v-58bd0e3a><div class="w-full flex items-center justify-between space-x-3 p-3 rounded-lg bg-sage-100 text-sage-800" data-v-58bd0e3a><div class="flex items-center space-x-3" data-v-58bd0e3a><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-58bd0e3a></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-58bd0e3a></path></svg><span class="font-medium" data-v-58bd0e3a>Website Settings</span></div></div><div class="ml-8 space-y-1 border-l-2 border-sage-200 pl-4" data-v-58bd0e3a><a${ssrRenderAttr("href", pengaturanUmumRoute)} class="flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm" data-v-58bd0e3a><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" data-v-58bd0e3a></path></svg><span data-v-58bd0e3a>Pengaturan Umum</span></a><a${ssrRenderAttr("href", serviceRoute)} class="flex items-center space-x-3 p-2 rounded-lg bg-sage-50 text-sage-700 font-medium text-sm" data-v-58bd0e3a><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-58bd0e3a></path></svg><span data-v-58bd0e3a>Service</span></a><a${ssrRenderAttr("href", teamRoute)} class="flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm" data-v-58bd0e3a><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-58bd0e3a></path></svg><span data-v-58bd0e3a>Team</span></a></div></div></nav></aside><main class="lg:ml-64 pt-16 min-h-screen" data-v-58bd0e3a><div class="p-4 sm:p-6 lg:p-8" data-v-58bd0e3a>`);
      if ((_a = _ctx.$page.props.flash) == null ? void 0 : _a.success) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-58bd0e3a><span class="block sm:inline" data-v-58bd0e3a>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_b = _ctx.$page.props.flash) == null ? void 0 : _b.error) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-58bd0e3a><span class="block sm:inline" data-v-58bd0e3a>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-6" data-v-58bd0e3a><nav class="flex" aria-label="Breadcrumb" data-v-58bd0e3a><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-58bd0e3a><li class="inline-flex items-center" data-v-58bd0e3a><a${ssrRenderAttr("href", dashboardRoute)} class="text-sage-600 hover:text-sage-800" data-v-58bd0e3a>Dashboard</a></li><li data-v-58bd0e3a><div class="flex items-center" data-v-58bd0e3a><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-58bd0e3a><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-58bd0e3a></path></svg><a${ssrRenderAttr("href", serviceRoute)} class="ml-1 text-sage-600 hover:text-sage-800 md:ml-2" data-v-58bd0e3a>Kelola Service</a></div></li><li aria-current="page" data-v-58bd0e3a><div class="flex items-center" data-v-58bd0e3a><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-58bd0e3a><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-58bd0e3a></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-58bd0e3a>Tambah Service</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-58bd0e3a><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-58bd0e3a><div data-v-58bd0e3a><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-58bd0e3a> Tambah Service Baru </h2><p class="text-sage-600" data-v-58bd0e3a> Buat layanan baru untuk ditampilkan di website </p></div><div class="mt-4 sm:mt-0" data-v-58bd0e3a><a${ssrRenderAttr("href", serviceRoute)} class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors" data-v-58bd0e3a><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-58bd0e3a></path></svg> Kembali ke Daftar </a></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-58bd0e3a><div class="px-6 py-4 border-b border-sage-200" data-v-58bd0e3a><h3 class="text-lg font-semibold text-sage-800" data-v-58bd0e3a> Informasi Service </h3><p class="text-sm text-sage-600 mt-1" data-v-58bd0e3a> Lengkapi detail service baru </p></div><form class="p-6" data-v-58bd0e3a><div class="space-y-6" data-v-58bd0e3a><div data-v-58bd0e3a><label for="title" class="block text-sm font-medium text-sage-700 mb-2" data-v-58bd0e3a> Judul Service <span class="text-red-500" data-v-58bd0e3a>*</span></label><input id="title"${ssrRenderAttr("value", form.title)} type="text" required placeholder="Masukkan judul service" class="${ssrRenderClass([{ "border-red-300": errors.value.title }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-58bd0e3a>`);
      if (errors.value.title) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-58bd0e3a>${ssrInterpolate(errors.value.title[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-58bd0e3a><label for="description" class="block text-sm font-medium text-sage-700 mb-2" data-v-58bd0e3a> Deskripsi <span class="text-red-500" data-v-58bd0e3a>*</span></label><textarea id="description" rows="4" required placeholder="Masukkan deskripsi service" class="${ssrRenderClass([{ "border-red-300": errors.value.description }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-58bd0e3a>${ssrInterpolate(form.description)}</textarea>`);
      if (errors.value.description) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-58bd0e3a>${ssrInterpolate(errors.value.description[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-58bd0e3a><label for="image_path" class="block text-sm font-medium text-sage-700 mb-2" data-v-58bd0e3a> Gambar Service </label><div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md" data-v-58bd0e3a><div class="space-y-1 text-center" data-v-58bd0e3a><svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" data-v-58bd0e3a><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-58bd0e3a></path></svg><div class="flex text-sm text-gray-600" data-v-58bd0e3a><label for="image_path" class="relative cursor-pointer bg-white rounded-md font-medium text-sage-600 hover:text-sage-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sage-500" data-v-58bd0e3a><span data-v-58bd0e3a>Upload gambar</span><input id="image_path" type="file" class="sr-only" accept="image/*" data-v-58bd0e3a></label><p class="pl-1" data-v-58bd0e3a>atau drag and drop</p></div><p class="text-xs text-gray-500" data-v-58bd0e3a> PNG, JPG, GIF hingga 2MB </p></div></div>`);
      if (imagePreview.value) {
        _push(`<div class="mt-4" data-v-58bd0e3a><img${ssrRenderAttr("src", imagePreview.value)} alt="Preview" class="w-32 h-32 object-cover rounded border" data-v-58bd0e3a></div>`);
      } else {
        _push(`<!---->`);
      }
      if (errors.value.image_path) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-58bd0e3a>${ssrInterpolate(errors.value.image_path[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-58bd0e3a><label for="icon_path" class="block text-sm font-medium text-sage-700 mb-2" data-v-58bd0e3a> Icon Service </label><div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md" data-v-58bd0e3a><div class="space-y-1 text-center" data-v-58bd0e3a><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-58bd0e3a><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a4 4 0 014-4h2M7 21h10a4 4 0 004-4V5a4 4 0 00-4-4H9M7 21V8a3 3 0 013-3h4a3 3 0 013 3v13" data-v-58bd0e3a></path></svg><div class="flex text-sm text-gray-600" data-v-58bd0e3a><label for="icon_path" class="relative cursor-pointer bg-white rounded-md font-medium text-sage-600 hover:text-sage-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sage-500" data-v-58bd0e3a><span data-v-58bd0e3a>Upload icon</span><input id="icon_path" type="file" class="sr-only" accept="image/*" data-v-58bd0e3a></label><p class="pl-1" data-v-58bd0e3a>atau drag and drop</p></div><p class="text-xs text-gray-500" data-v-58bd0e3a> PNG, JPG, SVG hingga 2MB </p></div></div>`);
      if (iconPreview.value) {
        _push(`<div class="mt-4" data-v-58bd0e3a><img${ssrRenderAttr("src", iconPreview.value)} alt="Icon Preview" class="w-16 h-16 object-cover rounded border" data-v-58bd0e3a></div>`);
      } else {
        _push(`<!---->`);
      }
      if (errors.value.icon_path) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-58bd0e3a>${ssrInterpolate(errors.value.icon_path[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-58bd0e3a><div data-v-58bd0e3a><label for="order_index" class="block text-sm font-medium text-sage-700 mb-2" data-v-58bd0e3a> Urutan Tampil </label><input id="order_index"${ssrRenderAttr("value", form.order_index)} type="number" min="0" placeholder="0" class="${ssrRenderClass([{ "border-red-300": errors.value.order_index }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-58bd0e3a><p class="text-xs text-gray-500 mt-1" data-v-58bd0e3a> Semakin kecil nomor, semakin awal ditampilkan </p>`);
      if (errors.value.order_index) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-58bd0e3a>${ssrInterpolate(errors.value.order_index[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-58bd0e3a><label for="is_active" class="block text-sm font-medium text-sage-700 mb-2" data-v-58bd0e3a> Status </label><select id="is_active" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-58bd0e3a><option${ssrRenderAttr("value", true)} data-v-58bd0e3a${ssrIncludeBooleanAttr(Array.isArray(form.is_active) ? ssrLooseContain(form.is_active, true) : ssrLooseEqual(form.is_active, true)) ? " selected" : ""}>Aktif</option><option${ssrRenderAttr("value", false)} data-v-58bd0e3a${ssrIncludeBooleanAttr(Array.isArray(form.is_active) ? ssrLooseContain(form.is_active, false) : ssrLooseEqual(form.is_active, false)) ? " selected" : ""}>Tidak Aktif</option></select></div></div></div><div class="mt-8 pt-6 border-t border-sage-200 flex justify-end space-x-3" data-v-58bd0e3a><a${ssrRenderAttr("href", serviceRoute)} class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-58bd0e3a> Batal </a><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-58bd0e3a>`);
      if (isSubmitting.value) {
        _push(`<span data-v-58bd0e3a>Menyimpan...</span>`);
      } else {
        _push(`<span data-v-58bd0e3a>Simpan Service</span>`);
      }
      _push(`</button></div></form></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/Service/create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-58bd0e3a"]]);
export {
  create as default
};
