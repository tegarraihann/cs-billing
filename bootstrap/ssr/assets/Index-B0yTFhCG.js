import { ref, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const dashboardRoute = "/master-admin/dashboard";
const usersRoute = "/master-admin/users";
const pengaturanUmumRoute = "/master-admin/website-settings/pengaturan-umum";
const serviceRoute = "/master-admin/website-settings/services";
const supportServiceRoute = "/master-admin/website-settings/support-services";
const teamRoute = "/master-admin/website-settings/team";
const createTeamRoute = "/master-admin/website-settings/team/create";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    teamMembers: Array
  },
  setup(__props) {
    const props = __props;
    const isMobileSidebarOpen = ref(false);
    const showDeleteModal = ref(false);
    const memberToDelete = ref(null);
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    const getEditRoute = (memberId) => {
      return `/master-admin/website-settings/team/${memberId}/edit`;
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        isMobileSidebarOpen.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      console.log("Team members data:", props.teamMembers);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-34fde1db><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-34fde1db><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-34fde1db><div class="flex justify-between items-center h-16" data-v-34fde1db><div class="lg:hidden" data-v-34fde1db><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors" data-v-34fde1db><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-34fde1db></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-34fde1db><h1 class="text-lg sm:text-xl font-semibold text-sage-800" data-v-34fde1db> Kelola Tim </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-34fde1db>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-34fde1db${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-34fde1db${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-34fde1db${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-34fde1db${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-34fde1db${_scopeId}>${ssrInterpolate((_b2 = _ctx.$page.props.auth.user) == null ? void 0 : _b2.name)}</p><p class="text-xs text-sage-500" data-v-34fde1db${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-34fde1db${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c2 = _ctx.$page.props.auth.user) == null ? void 0 : _c2.name)), 1)
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
            _push2(`<div class="py-1" data-v-34fde1db${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-34fde1db${_scopeId2}></path></svg><span data-v-34fde1db${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-34fde1db${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-34fde1db${_scopeId2}></path></svg><span data-v-34fde1db${_scopeId2}>Log Out</span>`);
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
      _push(`</div></div></div></nav><aside class="${ssrRenderClass([{
        "translate-x-0": isMobileSidebarOpen.value,
        "-translate-x-full": !isMobileSidebarOpen.value
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"])}" data-v-34fde1db><div class="px-6 py-6 border-b border-sage-200" data-v-34fde1db><div class="flex items-center space-x-3" data-v-34fde1db><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-34fde1db><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-34fde1db></path></svg></div><div data-v-34fde1db><h2 class="text-lg font-bold text-sage-700" data-v-34fde1db>Master Admin</h2><p class="text-xs text-sage-500" data-v-34fde1db>Full System Control</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto" data-v-34fde1db><a${ssrRenderAttr("href", dashboardRoute)} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200" data-v-34fde1db><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-34fde1db></path></svg><span class="font-medium" data-v-34fde1db>Dashboard</span></a><a${ssrRenderAttr("href", usersRoute)} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200" data-v-34fde1db><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" data-v-34fde1db></path></svg><span class="font-medium" data-v-34fde1db>User Management</span></a><div class="space-y-1" data-v-34fde1db><div class="w-full flex items-center justify-between space-x-3 p-3 rounded-lg bg-sage-100 text-sage-800" data-v-34fde1db><div class="flex items-center space-x-3" data-v-34fde1db><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-34fde1db></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-34fde1db></path></svg><span class="font-medium" data-v-34fde1db>Website Settings</span></div></div><div class="ml-8 space-y-1 border-l-2 border-sage-200 pl-4" data-v-34fde1db><a${ssrRenderAttr("href", pengaturanUmumRoute)} class="flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm" data-v-34fde1db><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" data-v-34fde1db></path></svg><span data-v-34fde1db>Pengaturan Umum</span></a><a${ssrRenderAttr("href", serviceRoute)} class="flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm" data-v-34fde1db><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-34fde1db></path></svg><span data-v-34fde1db>Services</span></a><a${ssrRenderAttr("href", supportServiceRoute)} class="flex items-center space-x-3 p-2 rounded-lg text-sage-600 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm" data-v-34fde1db><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-34fde1db></path></svg><span data-v-34fde1db>Support Services</span></a><a${ssrRenderAttr("href", teamRoute)} class="flex items-center space-x-3 p-2 rounded-lg bg-sage-50 text-sage-700 font-medium text-sm" data-v-34fde1db><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-34fde1db></path></svg><span data-v-34fde1db>Team</span></a></div></div></nav></aside><main class="lg:ml-64 pt-16 min-h-screen" data-v-34fde1db><div class="p-4 sm:p-6 lg:p-8" data-v-34fde1db>`);
      if ((_a = _ctx.$page.props.flash) == null ? void 0 : _a.success) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-34fde1db><span class="block sm:inline" data-v-34fde1db>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_b = _ctx.$page.props.flash) == null ? void 0 : _b.error) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-34fde1db><span class="block sm:inline" data-v-34fde1db>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-6" data-v-34fde1db><nav class="flex" aria-label="Breadcrumb" data-v-34fde1db><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-34fde1db><li class="inline-flex items-center" data-v-34fde1db><a${ssrRenderAttr("href", dashboardRoute)} class="text-sage-600 hover:text-sage-800" data-v-34fde1db>Dashboard</a></li><li data-v-34fde1db><div class="flex items-center" data-v-34fde1db><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-34fde1db><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-34fde1db></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-34fde1db>Kelola Tim</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-34fde1db><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-34fde1db><div data-v-34fde1db><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-34fde1db>Kelola Tim</h2><p class="text-sage-600" data-v-34fde1db> Tambah, edit, dan kelola anggota tim yang ditampilkan di website </p></div><div class="mt-4 sm:mt-0" data-v-34fde1db><a${ssrRenderAttr("href", createTeamRoute)} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-34fde1db><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-34fde1db></path></svg> Tambah Anggota Tim </a></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-34fde1db><div class="px-6 py-4 border-b border-sage-200" data-v-34fde1db><h3 class="text-lg font-semibold text-sage-800" data-v-34fde1db> Daftar Anggota Tim </h3><p class="text-sm text-sage-600 mt-1" data-v-34fde1db> Total: ${ssrInterpolate(((_c = __props.teamMembers) == null ? void 0 : _c.length) || 0)} anggota tim </p></div>`);
      if (!__props.teamMembers || __props.teamMembers.length === 0) {
        _push(`<div class="p-8 text-center" data-v-34fde1db><svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-34fde1db></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2" data-v-34fde1db> Belum ada anggota tim </h3><p class="text-gray-500 mb-4" data-v-34fde1db> Mulai dengan menambahkan anggota tim pertama Anda. </p><a${ssrRenderAttr("href", createTeamRoute)} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-34fde1db><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-34fde1db></path></svg> Tambah Anggota Tim </a></div>`);
      } else {
        _push(`<div class="p-6" data-v-34fde1db><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-v-34fde1db><!--[-->`);
        ssrRenderList(__props.teamMembers, (member) => {
          _push(`<div class="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors border border-gray-200" data-v-34fde1db><div class="mx-auto w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4" data-v-34fde1db>`);
          if (member.photo_path) {
            _push(`<img${ssrRenderAttr("src", `/storage/${member.photo_path}`)}${ssrRenderAttr("alt", member.name)} class="w-full h-full object-cover" data-v-34fde1db>`);
          } else {
            _push(`<div class="w-full h-full flex items-center justify-center text-gray-400" data-v-34fde1db><svg class="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" data-v-34fde1db></path></svg></div>`);
          }
          _push(`</div><h3 class="font-semibold text-gray-900 mb-1" data-v-34fde1db>${ssrInterpolate(member.name)}</h3><p class="text-sm text-gray-600 mb-2" data-v-34fde1db>${ssrInterpolate(member.position)}</p>`);
          if (member.phone_number) {
            _push(`<div class="text-xs text-blue-600 mb-3 flex items-center justify-center space-x-1" data-v-34fde1db><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" data-v-34fde1db></path></svg><span data-v-34fde1db>${ssrInterpolate(member.phone_number)}</span></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center justify-center space-x-2 mb-4" data-v-34fde1db><span class="${ssrRenderClass([
            "px-2 py-1 text-xs rounded-full",
            member.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          ])}" data-v-34fde1db>${ssrInterpolate(member.is_active ? "Aktif" : "Tidak Aktif")}</span><span class="text-xs text-gray-500" data-v-34fde1db>Urutan: ${ssrInterpolate(member.order_index)}</span></div><div class="flex justify-center space-x-2" data-v-34fde1db><a${ssrRenderAttr("href", getEditRoute(member.id))} class="text-blue-600 hover:text-blue-800 p-2 rounded transition-colors" title="Edit" data-v-34fde1db><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-34fde1db></path></svg></a><button class="${ssrRenderClass([
            member.is_active ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800",
            "p-2 rounded transition-colors"
          ])}"${ssrRenderAttr("title", member.is_active ? "Nonaktifkan" : "Aktifkan")} data-v-34fde1db>`);
          if (member.is_active) {
            _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" data-v-34fde1db></path></svg>`);
          } else {
            _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-34fde1db></path></svg>`);
          }
          _push(`</button><button class="text-red-600 hover:text-red-800 p-2 rounded transition-colors" title="Hapus" data-v-34fde1db><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-34fde1db><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-34fde1db></path></svg></button></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`</div></div></main>`);
      if (showDeleteModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-34fde1db><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" data-v-34fde1db><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-34fde1db> Konfirmasi Hapus </h3><p class="text-gray-600 mb-6" data-v-34fde1db> Apakah Anda yakin ingin menghapus anggota tim &quot;${ssrInterpolate((_d = memberToDelete.value) == null ? void 0 : _d.name)}&quot;? Tindakan ini tidak dapat dibatalkan. </p><div class="flex justify-end space-x-3" data-v-34fde1db><button class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" data-v-34fde1db> Batal </button><button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-34fde1db> Hapus </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/Team/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-34fde1db"]]);
export {
  Index as default
};
