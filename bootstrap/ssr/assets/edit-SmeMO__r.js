import { ref, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import SidebarNavigation from "./SidebarNavigation-CNU9bMyk.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "edit",
  __ssrInlineRender: true,
  props: {
    service: Object,
    errors: Object
  },
  setup(__props) {
    var _a, _b, _c, _d, _e, _f;
    const props = __props;
    const dashboardRoute = route("masteradmin.dashboard");
    route("masteradmin.users.index");
    route(
      "masteradmin.website-settings.pengaturan-umum.index"
    );
    const servicesRoute = route("masteradmin.website-settings.services.index");
    route(
      "masteradmin.website-settings.support-services.index"
    );
    route("masteradmin.website-settings.team.index");
    route("home");
    const isMobileSidebarOpen = ref(false);
    const imagePreview = ref(null);
    const iconPreview = ref(null);
    const errors = ref(props.errors || {});
    const form = useForm({
      title: ((_a = props.service) == null ? void 0 : _a.title) || "",
      description: ((_b = props.service) == null ? void 0 : _b.description) || "",
      features: ((_c = props.service) == null ? void 0 : _c.features) || [],
      category: ((_d = props.service) == null ? void 0 : _d.category) || "",
      image_path: null,
      icon_path: null,
      order_index: ((_e = props.service) == null ? void 0 : _e.order_index) || 0,
      is_active: ((_f = props.service) == null ? void 0 : _f.is_active) ?? true
    });
    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false;
    };
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
      console.log("Service data:", props.service);
      console.log("Form data:", form);
      console.log("Errors:", props.errors);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2, _d2, _e2, _f2, _g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-e2a46c0d><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-e2a46c0d><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-e2a46c0d><div class="flex justify-between items-center h-16" data-v-e2a46c0d><div class="lg:hidden" data-v-e2a46c0d><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors" data-v-e2a46c0d><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e2a46c0d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-e2a46c0d></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-e2a46c0d><h1 class="text-lg sm:text-xl font-semibold text-sage-800" data-v-e2a46c0d> Edit Service </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-e2a46c0d>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b3, _c3, _d3;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-e2a46c0d${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-e2a46c0d${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-e2a46c0d${_scopeId}>${ssrInterpolate(getInitials((_a3 = _ctx.$page.props.auth.user) == null ? void 0 : _a3.name))}</span></div><div class="hidden sm:block text-left" data-v-e2a46c0d${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-e2a46c0d${_scopeId}>${ssrInterpolate((_b3 = _ctx.$page.props.auth.user) == null ? void 0 : _b3.name)}</p><p class="text-xs text-sage-500" data-v-e2a46c0d${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e2a46c0d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-e2a46c0d${_scopeId}></path></svg></button>`);
          } else {
            return [
              createVNode("button", { class: "flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" }, [
                createVNode("div", { class: "w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" }, [
                  createVNode("span", { class: "text-white font-semibold text-xs sm:text-sm" }, toDisplayString(getInitials((_c3 = _ctx.$page.props.auth.user) == null ? void 0 : _c3.name)), 1)
                ]),
                createVNode("div", { class: "hidden sm:block text-left" }, [
                  createVNode("p", { class: "text-sm font-medium text-sage-700" }, toDisplayString((_d3 = _ctx.$page.props.auth.user) == null ? void 0 : _d3.name), 1),
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
            _push2(`<div class="py-1" data-v-e2a46c0d${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e2a46c0d${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-e2a46c0d${_scopeId2}></path></svg><span data-v-e2a46c0d${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-e2a46c0d${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e2a46c0d${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-e2a46c0d${_scopeId2}></path></svg><span data-v-e2a46c0d${_scopeId2}>Log Out</span>`);
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
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-e2a46c0d><div class="p-4 sm:p-6 lg:p-8" data-v-e2a46c0d>`);
      if ((_a2 = _ctx.$page.props.flash) == null ? void 0 : _a2.success) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-e2a46c0d><span class="block sm:inline" data-v-e2a46c0d>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_b2 = _ctx.$page.props.flash) == null ? void 0 : _b2.error) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-e2a46c0d><span class="block sm:inline" data-v-e2a46c0d>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-6" data-v-e2a46c0d><nav class="flex" aria-label="Breadcrumb" data-v-e2a46c0d><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-e2a46c0d><li class="inline-flex items-center" data-v-e2a46c0d>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(dashboardRoute),
        class: "text-sage-600 hover:text-sage-800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Dashboard`);
          } else {
            return [
              createTextVNode("Dashboard")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-e2a46c0d><div class="flex items-center" data-v-e2a46c0d><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-e2a46c0d><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-e2a46c0d></path></svg>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(servicesRoute),
        class: "ml-1 text-sage-600 hover:text-sage-800 md:ml-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Kelola Service`);
          } else {
            return [
              createTextVNode("Kelola Service")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li aria-current="page" data-v-e2a46c0d><div class="flex items-center" data-v-e2a46c0d><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-e2a46c0d><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-e2a46c0d></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-e2a46c0d>Edit Service</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-e2a46c0d><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-e2a46c0d><div data-v-e2a46c0d><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-e2a46c0d> Edit Service </h2><p class="text-sage-600" data-v-e2a46c0d> Perbarui informasi service &quot;${ssrInterpolate((_c2 = __props.service) == null ? void 0 : _c2.title)}&quot; </p></div><div class="mt-4 sm:mt-0" data-v-e2a46c0d>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(servicesRoute),
        class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e2a46c0d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-e2a46c0d${_scopeId}></path></svg> Kembali ke Daftar `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 mr-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                })
              ])),
              createTextVNode(" Kembali ke Daftar ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-e2a46c0d><div class="px-6 py-4 border-b border-sage-200" data-v-e2a46c0d><h3 class="text-lg font-semibold text-sage-800" data-v-e2a46c0d> Informasi Service </h3><p class="text-sm text-sage-600 mt-1" data-v-e2a46c0d>Perbarui detail service</p></div><form class="p-6" data-v-e2a46c0d><div class="space-y-6" data-v-e2a46c0d><div data-v-e2a46c0d><label for="title" class="block text-sm font-medium text-sage-700 mb-2" data-v-e2a46c0d> Judul Service <span class="text-red-500" data-v-e2a46c0d>*</span></label><input id="title"${ssrRenderAttr("value", unref(form).title)} type="text" required placeholder="Masukkan judul service" class="${ssrRenderClass([{ "border-red-300": errors.value.title }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-e2a46c0d>`);
      if (errors.value.title) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-e2a46c0d>${ssrInterpolate(errors.value.title[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-e2a46c0d><label for="description" class="block text-sm font-medium text-sage-700 mb-2" data-v-e2a46c0d> Deskripsi <span class="text-red-500" data-v-e2a46c0d>*</span></label><textarea id="description" rows="4" required placeholder="Masukkan deskripsi service" class="${ssrRenderClass([{ "border-red-300": errors.value.description }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-e2a46c0d>${ssrInterpolate(unref(form).description)}</textarea>`);
      if (errors.value.description) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-e2a46c0d>${ssrInterpolate(errors.value.description[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if ((_d2 = __props.service) == null ? void 0 : _d2.image_path) {
        _push(`<div data-v-e2a46c0d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-e2a46c0d>Gambar Saat Ini</label><div class="mb-4" data-v-e2a46c0d><img${ssrRenderAttr("src", `/storage/${__props.service.image_path}`)}${ssrRenderAttr("alt", __props.service.title)} class="w-32 h-32 object-cover rounded border" data-v-e2a46c0d></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-e2a46c0d><label for="image_path" class="block text-sm font-medium text-sage-700 mb-2" data-v-e2a46c0d>${ssrInterpolate(((_e2 = __props.service) == null ? void 0 : _e2.image_path) ? "Ganti Gambar Service" : "Gambar Service")}</label><div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md" data-v-e2a46c0d><div class="space-y-1 text-center" data-v-e2a46c0d><svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" data-v-e2a46c0d><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-e2a46c0d></path></svg><div class="flex text-sm text-gray-600" data-v-e2a46c0d><label for="image_path" class="relative cursor-pointer bg-white rounded-md font-medium text-sage-600 hover:text-sage-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sage-500" data-v-e2a46c0d><span data-v-e2a46c0d>Upload gambar baru</span><input id="image_path" type="file" class="sr-only" accept="image/*" data-v-e2a46c0d></label><p class="pl-1" data-v-e2a46c0d>atau drag and drop</p></div><p class="text-xs text-gray-500" data-v-e2a46c0d> PNG, JPG, GIF hingga 2MB </p></div></div>`);
      if (imagePreview.value) {
        _push(`<div class="mt-4" data-v-e2a46c0d><p class="text-sm text-gray-600 mb-2" data-v-e2a46c0d>Preview gambar baru:</p><img${ssrRenderAttr("src", imagePreview.value)} alt="Preview" class="w-32 h-32 object-cover rounded border" data-v-e2a46c0d></div>`);
      } else {
        _push(`<!---->`);
      }
      if (errors.value.image_path) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-e2a46c0d>${ssrInterpolate(errors.value.image_path[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if ((_f2 = __props.service) == null ? void 0 : _f2.icon_path) {
        _push(`<div data-v-e2a46c0d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-e2a46c0d>Icon Saat Ini</label><div class="mb-4" data-v-e2a46c0d><img${ssrRenderAttr("src", `/storage/${__props.service.icon_path}`)}${ssrRenderAttr("alt", __props.service.title)} class="w-16 h-16 object-cover rounded border" data-v-e2a46c0d></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div data-v-e2a46c0d><label for="icon_path" class="block text-sm font-medium text-sage-700 mb-2" data-v-e2a46c0d>${ssrInterpolate(((_g = __props.service) == null ? void 0 : _g.icon_path) ? "Ganti Icon Service" : "Icon Service")}</label><div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md" data-v-e2a46c0d><div class="space-y-1 text-center" data-v-e2a46c0d><svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-e2a46c0d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a4 4 0 014-4h2M7 21h10a4 4 0 004-4V5a4 4 0 00-4-4H9M7 21V8a3 3 0 013-3h4a3 3 0 013 3v13" data-v-e2a46c0d></path></svg><div class="flex text-sm text-gray-600" data-v-e2a46c0d><label for="icon_path" class="relative cursor-pointer bg-white rounded-md font-medium text-sage-600 hover:text-sage-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sage-500" data-v-e2a46c0d><span data-v-e2a46c0d>Upload icon baru</span><input id="icon_path" type="file" class="sr-only" accept="image/*" data-v-e2a46c0d></label><p class="pl-1" data-v-e2a46c0d>atau drag and drop</p></div><p class="text-xs text-gray-500" data-v-e2a46c0d> PNG, JPG, SVG hingga 2MB </p></div></div>`);
      if (iconPreview.value) {
        _push(`<div class="mt-4" data-v-e2a46c0d><p class="text-sm text-gray-600 mb-2" data-v-e2a46c0d>Preview icon baru:</p><img${ssrRenderAttr("src", iconPreview.value)} alt="Icon Preview" class="w-16 h-16 object-cover rounded border" data-v-e2a46c0d></div>`);
      } else {
        _push(`<!---->`);
      }
      if (errors.value.icon_path) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-e2a46c0d>${ssrInterpolate(errors.value.icon_path[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-e2a46c0d><div data-v-e2a46c0d><label for="order_index" class="block text-sm font-medium text-sage-700 mb-2" data-v-e2a46c0d> Urutan Tampil </label><input id="order_index"${ssrRenderAttr("value", unref(form).order_index)} type="number" min="0" placeholder="0" class="${ssrRenderClass([{ "border-red-300": errors.value.order_index }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-e2a46c0d><p class="text-xs text-gray-500 mt-1" data-v-e2a46c0d> Semakin kecil nomor, semakin awal ditampilkan </p>`);
      if (errors.value.order_index) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-e2a46c0d>${ssrInterpolate(errors.value.order_index[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-e2a46c0d><label for="is_active" class="block text-sm font-medium text-sage-700 mb-2" data-v-e2a46c0d> Status </label><select id="is_active" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-e2a46c0d><option${ssrRenderAttr("value", true)} data-v-e2a46c0d${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, true) : ssrLooseEqual(unref(form).is_active, true)) ? " selected" : ""}>Aktif</option><option${ssrRenderAttr("value", false)} data-v-e2a46c0d${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, false) : ssrLooseEqual(unref(form).is_active, false)) ? " selected" : ""}>Tidak Aktif</option></select></div></div></div><div class="mt-8 pt-6 border-t border-sage-200 flex justify-end space-x-3" data-v-e2a46c0d>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(servicesRoute),
        class: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Batal `);
          } else {
            return [
              createTextVNode(" Batal ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-e2a46c0d>`);
      if (unref(form).processing) {
        _push(`<span data-v-e2a46c0d>Menyimpan...</span>`);
      } else {
        _push(`<span data-v-e2a46c0d>Update Service</span>`);
      }
      _push(`</button></div></form></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/Service/edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e2a46c0d"]]);
export {
  edit as default
};
