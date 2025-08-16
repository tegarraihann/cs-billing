import { ref, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, unref, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import SidebarNavigation from "./SidebarNavigation-CHk8VOz7.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    supportService: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const dashboardRoute = route("masteradmin.dashboard");
    route("masteradmin.users.index");
    route(
      "masteradmin.website-settings.pengaturan-umum.index"
    );
    route("masteradmin.website-settings.services.index");
    const supportServicesRoute = route(
      "masteradmin.website-settings.support-services.index"
    );
    route("masteradmin.website-settings.team.index");
    route("home");
    const isMobileSidebarOpen = ref(false);
    const loading = ref(false);
    const imagePreview = ref(null);
    const imageRemoved = ref(false);
    const form = useForm({
      title: props.supportService.title || "",
      description: props.supportService.description || "",
      image_path: null,
      order_index: props.supportService.order_index || 0,
      is_active: props.supportService.is_active || false
    });
    const errors = ref({});
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
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-b3ed1f0f><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-b3ed1f0f><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-b3ed1f0f><div class="flex justify-between items-center h-16" data-v-b3ed1f0f><div class="lg:hidden" data-v-b3ed1f0f><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-b3ed1f0f><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3ed1f0f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-b3ed1f0f></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-b3ed1f0f><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-b3ed1f0f> Edit Support Service </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-b3ed1f0f>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-b3ed1f0f${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-b3ed1f0f${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-b3ed1f0f${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-b3ed1f0f${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-b3ed1f0f${_scopeId}>${ssrInterpolate((_b2 = _ctx.$page.props.auth.user) == null ? void 0 : _b2.name)}</p><p class="text-xs text-sage-500" data-v-b3ed1f0f${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3ed1f0f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-b3ed1f0f${_scopeId}></path></svg></button>`);
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
            _push2(`<div class="py-1" data-v-b3ed1f0f${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3ed1f0f${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-b3ed1f0f${_scopeId2}></path></svg><span data-v-b3ed1f0f${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-b3ed1f0f${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3ed1f0f${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-b3ed1f0f${_scopeId2}></path></svg><span data-v-b3ed1f0f${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-b3ed1f0f></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-b3ed1f0f><div class="p-4 sm:p-6 lg:p-8" data-v-b3ed1f0f><div class="mb-6" data-v-b3ed1f0f><nav class="flex" aria-label="Breadcrumb" data-v-b3ed1f0f><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-b3ed1f0f><li class="inline-flex items-center" data-v-b3ed1f0f>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(dashboardRoute),
        class: "text-sage-600 hover:text-sage-800 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Dashboard `);
          } else {
            return [
              createTextVNode(" Dashboard ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li data-v-b3ed1f0f><div class="flex items-center" data-v-b3ed1f0f><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-b3ed1f0f><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-b3ed1f0f></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-b3ed1f0f>Website Settings</span></div></li><li data-v-b3ed1f0f><div class="flex items-center" data-v-b3ed1f0f><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-b3ed1f0f><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-b3ed1f0f></path></svg>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(supportServicesRoute),
        class: "ml-1 text-sage-500 hover:text-sage-700 md:ml-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Support Services `);
          } else {
            return [
              createTextVNode(" Support Services ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></li><li data-v-b3ed1f0f><div class="flex items-center" data-v-b3ed1f0f><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-b3ed1f0f><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-b3ed1f0f></path></svg><span class="ml-1 text-sage-700 md:ml-2 font-medium" data-v-b3ed1f0f>Edit</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-b3ed1f0f><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-b3ed1f0f><div data-v-b3ed1f0f><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-b3ed1f0f> Edit Support Service </h2><p class="text-sage-600" data-v-b3ed1f0f>Update support service information</p></div><div class="mt-4 sm:mt-0" data-v-b3ed1f0f>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(supportServicesRoute),
        class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3ed1f0f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-b3ed1f0f${_scopeId}></path></svg> Back to List `);
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
              createTextVNode(" Back to List ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
      if ((_a = _ctx.$page.props.flash) == null ? void 0 : _a.success) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-b3ed1f0f><span class="block sm:inline" data-v-b3ed1f0f>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_b = _ctx.$page.props.flash) == null ? void 0 : _b.error) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-b3ed1f0f><span class="block sm:inline" data-v-b3ed1f0f>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="bg-white shadow-sm border border-sage-200 sm:rounded-lg overflow-hidden" data-v-b3ed1f0f><form enctype="multipart/form-data" data-v-b3ed1f0f><div class="px-6 py-4 border-b border-sage-200" data-v-b3ed1f0f><h3 class="text-lg font-semibold text-sage-800" data-v-b3ed1f0f> Support Service Information </h3><p class="text-sm text-sage-600 mt-1" data-v-b3ed1f0f> Update the details for this support service </p></div><div class="p-6 space-y-6" data-v-b3ed1f0f><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-b3ed1f0f><div data-v-b3ed1f0f><label for="title" class="block text-sm font-medium text-sage-700 mb-2" data-v-b3ed1f0f> Title <span class="text-red-500" data-v-b3ed1f0f>*</span></label><input id="title"${ssrRenderAttr("value", unref(form).title)} type="text" required class="${ssrRenderClass([{ "border-red-300": errors.value.title }, "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"])}" placeholder="Enter service title" data-v-b3ed1f0f>`);
      if (errors.value.title) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-b3ed1f0f>${ssrInterpolate(errors.value.title)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-b3ed1f0f><label for="order_index" class="block text-sm font-medium text-sage-700 mb-2" data-v-b3ed1f0f> Display Order </label><input id="order_index"${ssrRenderAttr("value", unref(form).order_index)} type="number" min="0" class="${ssrRenderClass([{ "border-red-300": errors.value.order_index }, "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"])}" placeholder="0" data-v-b3ed1f0f><p class="mt-1 text-xs text-gray-500" data-v-b3ed1f0f> Order in which this service appears (0 = first) </p>`);
      if (errors.value.order_index) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-b3ed1f0f>${ssrInterpolate(errors.value.order_index)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div data-v-b3ed1f0f><label for="description" class="block text-sm font-medium text-sage-700 mb-2" data-v-b3ed1f0f> Description <span class="text-red-500" data-v-b3ed1f0f>*</span></label><textarea id="description" rows="4" required class="${ssrRenderClass([{ "border-red-300": errors.value.description }, "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"])}" placeholder="Describe the support service in detail" data-v-b3ed1f0f>${ssrInterpolate(unref(form).description)}</textarea>`);
      if (errors.value.description) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-b3ed1f0f>${ssrInterpolate(errors.value.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-b3ed1f0f><label class="block text-sm font-medium text-sage-700 mb-2" data-v-b3ed1f0f> Service Image </label><div class="flex items-start space-x-6" data-v-b3ed1f0f><div class="flex-shrink-0" data-v-b3ed1f0f>`);
      if (imagePreview.value || __props.supportService.image_path && !imageRemoved.value) {
        _push(`<div class="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200" data-v-b3ed1f0f><img${ssrRenderAttr(
          "src",
          imagePreview.value || `/storage/${__props.supportService.image_path}`
        )} alt="Preview" class="w-full h-full object-cover" data-v-b3ed1f0f></div>`);
      } else {
        _push(`<div class="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50" data-v-b3ed1f0f><svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3ed1f0f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-b3ed1f0f></path></svg></div>`);
      }
      _push(`</div><div class="flex-1" data-v-b3ed1f0f><input type="file" accept="image/*" class="hidden" data-v-b3ed1f0f><button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-b3ed1f0f><svg class="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b3ed1f0f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-b3ed1f0f></path></svg> ${ssrInterpolate(imagePreview.value || __props.supportService.image_path && !imageRemoved.value ? "Change Image" : "Upload Image")}</button><p class="mt-2 text-sm text-gray-500" data-v-b3ed1f0f> PNG, JPG, GIF up to 2MB. Recommended size: 400x300px </p>`);
      if (imagePreview.value || __props.supportService.image_path && !imageRemoved.value) {
        _push(`<button type="button" class="mt-2 text-sm text-red-600 hover:text-red-800" data-v-b3ed1f0f> Remove Image </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (errors.value.image_path) {
        _push(`<p class="mt-1 text-sm text-red-600" data-v-b3ed1f0f>${ssrInterpolate(errors.value.image_path)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-b3ed1f0f><div class="flex items-center" data-v-b3ed1f0f><input id="is_active"${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded" data-v-b3ed1f0f><label for="is_active" class="ml-2 block text-sm font-medium text-sage-700" data-v-b3ed1f0f> Active </label></div><p class="mt-1 text-xs text-gray-500" data-v-b3ed1f0f> Only active services will be displayed on the website </p></div></div><div class="px-6 py-4 bg-gray-50 border-t border-sage-200 flex justify-end space-x-4" data-v-b3ed1f0f>`);
      _push(ssrRenderComponent(unref(Link), {
        href: unref(supportServicesRoute),
        class: "inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cancel `);
          } else {
            return [
              createTextVNode(" Cancel ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="submit"${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-25 transition ease-in-out duration-150" data-v-b3ed1f0f>`);
      if (loading.value) {
        _push(`<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" data-v-b3ed1f0f><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-b3ed1f0f></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-b3ed1f0f></path></svg>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(loading.value ? "Updating..." : "Update Support Service")}</button></div></form></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/SupportService/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b3ed1f0f"]]);
export {
  Edit as default
};
