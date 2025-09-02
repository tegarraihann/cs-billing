import { ref, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import SidebarNavigation from "./SidebarNavigation-CNU9bMyk.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const dashboardRoute = "/master-admin/dashboard";
const createServiceRoute = "/master-admin/website-settings/services/create";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    services: Array
  },
  setup(__props) {
    const props = __props;
    const isMobileSidebarOpen = ref(false);
    const showDeleteModal = ref(false);
    const serviceToDelete = ref(null);
    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false;
    };
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getEditRoute = (serviceId) => {
      return `/master-admin/website-settings/services/${serviceId}/edit`;
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        isMobileSidebarOpen.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      console.log("Services data:", props.services);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-25072111><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-25072111><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-25072111><div class="flex justify-between items-center h-16" data-v-25072111><div class="lg:hidden" data-v-25072111><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors" data-v-25072111><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25072111><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-25072111></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-25072111><h1 class="text-lg sm:text-xl font-semibold text-sage-800" data-v-25072111> Kelola Service </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-25072111>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-25072111${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-25072111${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-25072111${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-25072111${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-25072111${_scopeId}>${ssrInterpolate((_b2 = _ctx.$page.props.auth.user) == null ? void 0 : _b2.name)}</p><p class="text-xs text-sage-500" data-v-25072111${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25072111${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-25072111${_scopeId}></path></svg></button>`);
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
            _push2(`<div class="py-1" data-v-25072111${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25072111${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-25072111${_scopeId2}></path></svg><span data-v-25072111${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-25072111${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25072111${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-25072111${_scopeId2}></path></svg><span data-v-25072111${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-25072111></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-25072111><div class="p-4 sm:p-6 lg:p-8" data-v-25072111>`);
      if ((_a = _ctx.$page.props.flash) == null ? void 0 : _a.success) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-25072111><span class="block sm:inline" data-v-25072111>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_b = _ctx.$page.props.flash) == null ? void 0 : _b.error) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-25072111><span class="block sm:inline" data-v-25072111>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-6" data-v-25072111><nav class="flex" aria-label="Breadcrumb" data-v-25072111><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-25072111><li class="inline-flex items-center" data-v-25072111><a${ssrRenderAttr("href", dashboardRoute)} class="text-sage-600 hover:text-sage-800" data-v-25072111>Dashboard</a></li><li data-v-25072111><div class="flex items-center" data-v-25072111><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-25072111><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-25072111></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-25072111>Kelola Service</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-25072111><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-25072111><div data-v-25072111><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-25072111> Kelola Service </h2><p class="text-sage-600" data-v-25072111> Tambah, edit, dan kelola layanan yang ditampilkan di website </p></div><div class="mt-4 sm:mt-0" data-v-25072111><a${ssrRenderAttr("href", createServiceRoute)} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-25072111><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25072111><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-25072111></path></svg> Tambah Service </a></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-25072111><div class="px-6 py-4 border-b border-sage-200" data-v-25072111><h3 class="text-lg font-semibold text-sage-800" data-v-25072111>Daftar Service</h3><p class="text-sm text-sage-600 mt-1" data-v-25072111> Total: ${ssrInterpolate(((_c = __props.services) == null ? void 0 : _c.length) || 0)} service </p></div>`);
      if (!__props.services || __props.services.length === 0) {
        _push(`<div class="p-8 text-center" data-v-25072111><svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25072111><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-25072111></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2" data-v-25072111> Belum ada service </h3><p class="text-gray-500 mb-4" data-v-25072111> Mulai dengan menambahkan service pertama Anda. </p><a${ssrRenderAttr("href", createServiceRoute)} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-25072111><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25072111><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-25072111></path></svg> Tambah Service </a></div>`);
      } else {
        _push(`<div class="divide-y divide-sage-200" data-v-25072111><!--[-->`);
        ssrRenderList(__props.services, (service) => {
          _push(`<div class="p-6 hover:bg-sage-50 transition-colors" data-v-25072111><div class="flex justify-between items-start" data-v-25072111><div class="flex space-x-4 flex-1" data-v-25072111>`);
          if (service.image_path) {
            _push(`<div class="flex-shrink-0" data-v-25072111><img${ssrRenderAttr("src", `/storage/${service.image_path}`)}${ssrRenderAttr("alt", service.title)} class="w-20 h-20 object-cover rounded border" data-v-25072111></div>`);
          } else {
            _push(`<div class="flex-shrink-0 w-20 h-20 bg-gray-200 rounded border flex items-center justify-center" data-v-25072111><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25072111><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-25072111></path></svg></div>`);
          }
          _push(`<div class="flex-1 min-w-0" data-v-25072111><div class="flex items-center space-x-3 mb-2" data-v-25072111><h3 class="text-lg font-medium text-gray-900 truncate" data-v-25072111>${ssrInterpolate(service.title)}</h3><span class="${ssrRenderClass([
            "px-2 py-1 text-xs rounded-full",
            service.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          ])}" data-v-25072111>${ssrInterpolate(service.is_active ? "Aktif" : "Tidak Aktif")}</span></div><p class="text-sm text-gray-600 mb-3 line-clamp-2" data-v-25072111>${ssrInterpolate(service.description)}</p><div class="flex items-center text-xs text-gray-500 space-x-4" data-v-25072111><span data-v-25072111>Urutan: ${ssrInterpolate(service.order_index)}</span><span data-v-25072111>Dibuat: ${ssrInterpolate(formatDate(service.created_at))}</span>`);
          if (service.updated_at !== service.created_at) {
            _push(`<span data-v-25072111>Diperbarui: ${ssrInterpolate(formatDate(service.updated_at))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div><div class="flex items-center space-x-2 ml-4" data-v-25072111><a${ssrRenderAttr("href", getEditRoute(service.id))} class="text-blue-600 hover:text-blue-800 p-2 rounded transition-colors" title="Edit" data-v-25072111><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25072111><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-25072111></path></svg></a><button class="${ssrRenderClass([
            service.is_active ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800",
            "p-2 rounded transition-colors"
          ])}"${ssrRenderAttr("title", service.is_active ? "Nonaktifkan" : "Aktifkan")} data-v-25072111>`);
          if (service.is_active) {
            _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25072111><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" data-v-25072111></path></svg>`);
          } else {
            _push(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25072111><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-25072111></path></svg>`);
          }
          _push(`</button><button class="text-red-600 hover:text-red-800 p-2 rounded transition-colors" title="Hapus" data-v-25072111><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-25072111><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-25072111></path></svg></button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div></div></main>`);
      if (showDeleteModal.value) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-25072111><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" data-v-25072111><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-25072111> Konfirmasi Hapus </h3><p class="text-gray-600 mb-6" data-v-25072111> Apakah Anda yakin ingin menghapus service &quot;${ssrInterpolate((_d = serviceToDelete.value) == null ? void 0 : _d.title)}&quot;? Tindakan ini tidak dapat dibatalkan. </p><div class="flex justify-end space-x-3" data-v-25072111><button class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" data-v-25072111> Batal </button><button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-25072111> Hapus </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/Service/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-25072111"]]);
export {
  Index as default
};
