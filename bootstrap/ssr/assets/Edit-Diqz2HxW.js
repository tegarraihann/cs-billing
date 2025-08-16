import { ref, reactive, onMounted, onUnmounted, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import "@inertiajs/vue3";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import SidebarNavigation from "./SidebarNavigation-CHk8VOz7.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const dashboardRoute = "/master-admin/dashboard";
const teamRoute = "/master-admin/website-settings/team";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    member: Object,
    errors: Object
  },
  setup(__props) {
    var _a, _b, _c, _d, _e;
    const props = __props;
    const isMobileSidebarOpen = ref(false);
    const isSubmitting = ref(false);
    const photoPreview = ref(null);
    const errors = ref(props.errors || {});
    const form = reactive({
      name: ((_a = props.member) == null ? void 0 : _a.name) || "",
      position: ((_b = props.member) == null ? void 0 : _b.position) || "",
      phone_number: ((_c = props.member) == null ? void 0 : _c.phone_number) || "",
      photo_path: null,
      // For new photo upload
      order_index: ((_d = props.member) == null ? void 0 : _d.order_index) || 0,
      is_active: ((_e = props.member) == null ? void 0 : _e.is_active) ?? true
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
      console.log("Errors:", props.errors);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-91fe1bd0><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-91fe1bd0><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-91fe1bd0><div class="flex justify-between items-center h-16" data-v-91fe1bd0><div class="lg:hidden" data-v-91fe1bd0><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors" data-v-91fe1bd0><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-91fe1bd0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-91fe1bd0></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-91fe1bd0><h1 class="text-lg sm:text-xl font-semibold text-sage-800" data-v-91fe1bd0> Edit Anggota Tim </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-91fe1bd0>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a3, _b3, _c3, _d2;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-91fe1bd0${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-91fe1bd0${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-91fe1bd0${_scopeId}>${ssrInterpolate(getInitials((_a3 = _ctx.$page.props.auth.user) == null ? void 0 : _a3.name))}</span></div><div class="hidden sm:block text-left" data-v-91fe1bd0${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-91fe1bd0${_scopeId}>${ssrInterpolate((_b3 = _ctx.$page.props.auth.user) == null ? void 0 : _b3.name)}</p><p class="text-xs text-sage-500" data-v-91fe1bd0${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-91fe1bd0${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-91fe1bd0${_scopeId}></path></svg></button>`);
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
            _push2(`<div class="py-1" data-v-91fe1bd0${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-91fe1bd0${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-91fe1bd0${_scopeId2}></path></svg><span data-v-91fe1bd0${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-91fe1bd0${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-91fe1bd0${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-91fe1bd0${_scopeId2}></path></svg><span data-v-91fe1bd0${_scopeId2}>Log Out</span>`);
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
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-91fe1bd0><div class="p-4 sm:p-6 lg:p-8" data-v-91fe1bd0>`);
      if ((_a2 = _ctx.$page.props.flash) == null ? void 0 : _a2.success) {
        _push(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-91fe1bd0><span class="block sm:inline" data-v-91fe1bd0>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if ((_b2 = _ctx.$page.props.flash) == null ? void 0 : _b2.error) {
        _push(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-91fe1bd0><span class="block sm:inline" data-v-91fe1bd0>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-6" data-v-91fe1bd0><nav class="flex" aria-label="Breadcrumb" data-v-91fe1bd0><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-91fe1bd0><li class="inline-flex items-center" data-v-91fe1bd0><a${ssrRenderAttr("href", dashboardRoute)} class="text-sage-600 hover:text-sage-800" data-v-91fe1bd0>Dashboard</a></li><li data-v-91fe1bd0><div class="flex items-center" data-v-91fe1bd0><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-91fe1bd0><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-91fe1bd0></path></svg><a${ssrRenderAttr("href", teamRoute)} class="ml-1 text-sage-600 hover:text-sage-800 md:ml-2" data-v-91fe1bd0>Kelola Tim</a></div></li><li aria-current="page" data-v-91fe1bd0><div class="flex items-center" data-v-91fe1bd0><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-91fe1bd0><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-91fe1bd0></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-91fe1bd0>Edit Anggota Tim</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-91fe1bd0><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-91fe1bd0><div data-v-91fe1bd0><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-91fe1bd0> Edit Anggota Tim </h2><p class="text-sage-600" data-v-91fe1bd0> Perbarui informasi anggota tim yang akan ditampilkan di website </p></div><div class="mt-4 sm:mt-0" data-v-91fe1bd0><a${ssrRenderAttr("href", teamRoute)} class="inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors" data-v-91fe1bd0><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-91fe1bd0><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-91fe1bd0></path></svg> Kembali ke Daftar </a></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-91fe1bd0><div class="px-6 py-4 border-b border-sage-200" data-v-91fe1bd0><h3 class="text-lg font-semibold text-sage-800" data-v-91fe1bd0> Informasi Anggota Tim </h3><p class="text-sm text-sage-600 mt-1" data-v-91fe1bd0> Lengkapi detail anggota tim baru </p></div><form class="p-6" data-v-91fe1bd0><div class="space-y-6" data-v-91fe1bd0><div data-v-91fe1bd0><label for="name" class="block text-sm font-medium text-sage-700 mb-2" data-v-91fe1bd0> Nama Lengkap <span class="text-red-500" data-v-91fe1bd0>*</span></label><input id="name"${ssrRenderAttr("value", form.name)} type="text" required placeholder="Masukkan nama lengkap" class="${ssrRenderClass([{ "border-red-300": errors.value.name }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-91fe1bd0>`);
      if (errors.value.name) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-91fe1bd0>${ssrInterpolate(errors.value.name[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-91fe1bd0><label for="position" class="block text-sm font-medium text-sage-700 mb-2" data-v-91fe1bd0> Jabatan <span class="text-red-500" data-v-91fe1bd0>*</span></label><input id="position"${ssrRenderAttr("value", form.position)} type="text" required placeholder="Contoh: CEO, Manager, Supervisor" class="${ssrRenderClass([{ "border-red-300": errors.value.position }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-91fe1bd0>`);
      if (errors.value.position) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-91fe1bd0>${ssrInterpolate(errors.value.position[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-91fe1bd0><label for="phone_number" class="block text-sm font-medium text-sage-700 mb-2" data-v-91fe1bd0> Nomor Telepon </label><input id="phone_number"${ssrRenderAttr("value", form.phone_number)} type="text" placeholder="08123456789 atau +6281234567890" class="${ssrRenderClass([{ "border-red-300": errors.value.phone_number }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-91fe1bd0><p class="text-xs text-gray-500 mt-1" data-v-91fe1bd0> Format: 08xxxxxxxxx atau +628xxxxxxxxx </p>`);
      if (errors.value.phone_number) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-91fe1bd0>${ssrInterpolate(errors.value.phone_number[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-91fe1bd0><label for="photo_path" class="block text-sm font-medium text-sage-700 mb-2" data-v-91fe1bd0> Foto Profil </label>`);
      if (((_c2 = props.member) == null ? void 0 : _c2.photo_path) && !photoPreview.value) {
        _push(`<div class="mb-4" data-v-91fe1bd0><p class="text-sm text-gray-600 mb-2" data-v-91fe1bd0>Foto saat ini:</p><img${ssrRenderAttr("src", `/storage/${props.member.photo_path}`)}${ssrRenderAttr("alt", props.member.name)} class="w-32 h-32 object-cover rounded-lg border border-gray-200" data-v-91fe1bd0></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md" data-v-91fe1bd0><div class="space-y-1 text-center" data-v-91fe1bd0><svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" data-v-91fe1bd0><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-91fe1bd0></path></svg><div class="flex text-sm text-gray-600" data-v-91fe1bd0><label for="photo_path" class="relative cursor-pointer bg-white rounded-md font-medium text-sage-600 hover:text-sage-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sage-500" data-v-91fe1bd0><span data-v-91fe1bd0>Upload foto</span><input id="photo_path" type="file" class="sr-only" accept="image/*" data-v-91fe1bd0></label><p class="pl-1" data-v-91fe1bd0>atau drag and drop</p></div><p class="text-xs text-gray-500" data-v-91fe1bd0> PNG, JPG, GIF hingga 2MB </p></div></div>`);
      if (photoPreview.value) {
        _push(`<div class="mt-4 text-center" data-v-91fe1bd0><img${ssrRenderAttr("src", photoPreview.value)} alt="Preview" class="w-32 h-32 object-cover rounded-full border mx-auto" data-v-91fe1bd0></div>`);
      } else {
        _push(`<!---->`);
      }
      if (errors.value.photo_path) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-91fe1bd0>${ssrInterpolate(errors.value.photo_path[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-91fe1bd0><div data-v-91fe1bd0><label for="order_index" class="block text-sm font-medium text-sage-700 mb-2" data-v-91fe1bd0> Urutan Tampil </label><input id="order_index"${ssrRenderAttr("value", form.order_index)} type="number" min="0" placeholder="0" class="${ssrRenderClass([{ "border-red-300": errors.value.order_index }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-91fe1bd0><p class="text-xs text-gray-500 mt-1" data-v-91fe1bd0> Semakin kecil nomor, semakin awal ditampilkan </p>`);
      if (errors.value.order_index) {
        _push(`<div class="mt-1 text-sm text-red-600" data-v-91fe1bd0>${ssrInterpolate(errors.value.order_index[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-91fe1bd0><label for="is_active" class="block text-sm font-medium text-sage-700 mb-2" data-v-91fe1bd0> Status </label><select id="is_active" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-91fe1bd0><option${ssrRenderAttr("value", true)} data-v-91fe1bd0${ssrIncludeBooleanAttr(Array.isArray(form.is_active) ? ssrLooseContain(form.is_active, true) : ssrLooseEqual(form.is_active, true)) ? " selected" : ""}>Aktif</option><option${ssrRenderAttr("value", false)} data-v-91fe1bd0${ssrIncludeBooleanAttr(Array.isArray(form.is_active) ? ssrLooseContain(form.is_active, false) : ssrLooseEqual(form.is_active, false)) ? " selected" : ""}>Tidak Aktif</option></select></div></div></div><div class="mt-8 pt-6 border-t border-sage-200 flex justify-end space-x-3" data-v-91fe1bd0><a${ssrRenderAttr("href", teamRoute)} class="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-91fe1bd0> Batal </a><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-91fe1bd0>`);
      if (isSubmitting.value) {
        _push(`<span data-v-91fe1bd0>Memperbarui...</span>`);
      } else {
        _push(`<span data-v-91fe1bd0>Update Anggota Tim</span>`);
      }
      _push(`</button></div></form></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/Team/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-91fe1bd0"]]);
export {
  Edit as default
};
