import { ref, reactive, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import SidebarNavigation from "./SidebarNavigation-A0RXUIxC.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const isMobileSidebarOpen = ref(false);
    const processing = ref(false);
    const errors = ref({});
    const form = reactive({
      nama: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      jenis_kelamin: "",
      agama: "",
      suku_bangsa: "",
      kewarganegaraan: "Indonesia",
      alamat_ktp: "",
      rt_ktp: "",
      rw_ktp: "",
      kelurahan_ktp: "",
      kecamatan_ktp: "",
      kota_ktp: "",
      provinsi_ktp: "",
      nomor_telp_rumah: "",
      nomor_hp: "",
      email: "",
      instagram: "",
      linkedin: "",
      nama_emergency: "",
      hubungan_emergency: "",
      alamat_emergency: "",
      nomor_telepon_emergency: "",
      alamat_orang_tua: "",
      rt_orang_tua: "",
      rw_orang_tua: "",
      kelurahan_orang_tua: "",
      kecamatan_orang_tua: "",
      kota_orang_tua: "",
      provinsi_orang_tua: "",
      nomor_telp_orang_tua: "",
      nomor_hp_orang_tua: "",
      status: "active",
      tanggal_masuk: "",
      posisi: "",
      keterangan: "",
      // Relational data
      family_members: {
        ayah: {
          nama_keluarga: "",
          tempat_lahir_keluarga: "",
          tanggal_lahir_keluarga: "",
          pendidikan_terakhir: "",
          pekerjaan: ""
        },
        ibu: {
          nama_keluarga: "",
          tempat_lahir_keluarga: "",
          tanggal_lahir_keluarga: "",
          pendidikan_terakhir: "",
          pekerjaan: ""
        }
      },
      work_experiences: [],
      document_status: {
        surat_lamaran: false,
        cv: false,
        akte_kelahiran: false,
        kartu_keluarga: false,
        surat_pengalaman_kerja: false,
        ktp_sim: false,
        skck: false,
        pas_foto: false,
        ijazah: false,
        surat_sehat: false,
        npwp: false
      }
    });
    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false;
    };
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-93000e3d><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-93000e3d><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-93000e3d><div class="flex justify-between items-center h-16" data-v-93000e3d><div class="lg:hidden" data-v-93000e3d><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-93000e3d><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-93000e3d><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-93000e3d></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-93000e3d><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-93000e3d> Add New Employee </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-93000e3d>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-93000e3d${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-93000e3d${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-93000e3d${_scopeId}>${ssrInterpolate(getInitials((_a = _ctx.$page.props.auth.user) == null ? void 0 : _a.name))}</span></div><div class="hidden sm:block text-left" data-v-93000e3d${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-93000e3d${_scopeId}>${ssrInterpolate((_b = _ctx.$page.props.auth.user) == null ? void 0 : _b.name)}</p><p class="text-xs text-sage-500" data-v-93000e3d${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-93000e3d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-93000e3d${_scopeId}></path></svg></button>`);
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
            _push2(`<div class="py-1" data-v-93000e3d${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-93000e3d${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-93000e3d${_scopeId2}></path></svg><span data-v-93000e3d${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-93000e3d${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-93000e3d${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-93000e3d${_scopeId2}></path></svg><span data-v-93000e3d${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-93000e3d></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-93000e3d><div class="p-4 sm:p-6 lg:p-8" data-v-93000e3d><div class="mb-6" data-v-93000e3d><nav class="flex" aria-label="Breadcrumb" data-v-93000e3d><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-93000e3d><li class="inline-flex items-center" data-v-93000e3d><a href="/master-admin/employees" class="inline-flex items-center text-sm font-medium text-sage-700 hover:text-sage-900" data-v-93000e3d> Employee Management </a></li><li data-v-93000e3d><div class="flex items-center" data-v-93000e3d><svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" data-v-93000e3d><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-93000e3d></path></svg><span class="ml-1 text-sm font-medium text-gray-500 md:ml-2" data-v-93000e3d> Add Employee </span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-93000e3d><div class="px-6 py-4 border-b border-sage-200" data-v-93000e3d><h2 class="text-xl font-semibold text-sage-800" data-v-93000e3d>Add New Employee</h2><p class="text-sm text-sage-600 mt-1" data-v-93000e3d> Fill in the employee information below </p></div><form class="p-6" data-v-93000e3d><div class="mb-8" data-v-93000e3d><h3 class="text-lg font-semibold text-sage-800 mb-4 pb-2 border-b border-sage-200" data-v-93000e3d> Section 1: Data Pribadi </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-93000e3d><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d> Nama Lengkap <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.nama)} type="text" class="${ssrRenderClass([{ "border-red-500": errors.value.nama }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.nama) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.nama[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d> Tempat Lahir <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.tempat_lahir)} type="text" class="${ssrRenderClass([{ "border-red-500": errors.value.tempat_lahir }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.tempat_lahir) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.tempat_lahir[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d> Tanggal Lahir <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.tanggal_lahir)} type="date" class="${ssrRenderClass([{ "border-red-500": errors.value.tanggal_lahir }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.tanggal_lahir) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.tanggal_lahir[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d> Jenis Kelamin <span class="text-red-500" data-v-93000e3d>*</span></label><select class="${ssrRenderClass([{ "border-red-500": errors.value.jenis_kelamin }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d><option value="" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.jenis_kelamin) ? ssrLooseContain(form.jenis_kelamin, "") : ssrLooseEqual(form.jenis_kelamin, "")) ? " selected" : ""}>Pilih Jenis Kelamin</option><option value="Laki-laki" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.jenis_kelamin) ? ssrLooseContain(form.jenis_kelamin, "Laki-laki") : ssrLooseEqual(form.jenis_kelamin, "Laki-laki")) ? " selected" : ""}>Laki-laki</option><option value="Perempuan" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.jenis_kelamin) ? ssrLooseContain(form.jenis_kelamin, "Perempuan") : ssrLooseEqual(form.jenis_kelamin, "Perempuan")) ? " selected" : ""}>Perempuan</option></select>`);
      if (errors.value.jenis_kelamin) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.jenis_kelamin[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d> Agama <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.agama)} type="text" class="${ssrRenderClass([{ "border-red-500": errors.value.agama }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.agama) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.agama[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d> Suku Bangsa <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.suku_bangsa)} type="text" class="${ssrRenderClass([{ "border-red-500": errors.value.suku_bangsa }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.suku_bangsa) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.suku_bangsa[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d> Kewarganegaraan <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.kewarganegaraan)} type="text" class="${ssrRenderClass([{ "border-red-500": errors.value.kewarganegaraan }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.kewarganegaraan) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.kewarganegaraan[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d> Email <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.email)} type="email" class="${ssrRenderClass([{ "border-red-500": errors.value.email }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.email) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.email[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-6" data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d> Alamat Sesuai KTP <span class="text-red-500" data-v-93000e3d>*</span></label><textarea rows="3" class="${ssrRenderClass([{ "border-red-500": errors.value.alamat_ktp }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>${ssrInterpolate(form.alamat_ktp)}</textarea>`);
      if (errors.value.alamat_ktp) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.alamat_ktp[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4" data-v-93000e3d><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>RT <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.rt_ktp)} type="text" class="${ssrRenderClass([{ "border-red-500": errors.value.rt_ktp }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.rt_ktp) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.rt_ktp[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>RW <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.rw_ktp)} type="text" class="${ssrRenderClass([{ "border-red-500": errors.value.rw_ktp }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.rw_ktp) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.rw_ktp[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Kelurahan <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.kelurahan_ktp)} type="text" class="${ssrRenderClass([{ "border-red-500": errors.value.kelurahan_ktp }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.kelurahan_ktp) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.kelurahan_ktp[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Kecamatan <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.kecamatan_ktp)} type="text" class="${ssrRenderClass([{ "border-red-500": errors.value.kecamatan_ktp }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.kecamatan_ktp) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.kecamatan_ktp[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4" data-v-93000e3d><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Kota <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.kota_ktp)} type="text" class="${ssrRenderClass([{ "border-red-500": errors.value.kota_ktp }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.kota_ktp) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.kota_ktp[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Provinsi <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.provinsi_ktp)} type="text" class="${ssrRenderClass([{ "border-red-500": errors.value.provinsi_ktp }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.provinsi_ktp) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.provinsi_ktp[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6" data-v-93000e3d><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Nomor Telp Rumah</label><input${ssrRenderAttr("value", form.nomor_telp_rumah)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d> Nomor HP <span class="text-red-500" data-v-93000e3d>*</span></label><input${ssrRenderAttr("value", form.nomor_hp)} type="text" class="${ssrRenderClass([{ "border-red-500": errors.value.nomor_hp }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d>`);
      if (errors.value.nomor_hp) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.nomor_hp[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Instagram</label><input${ssrRenderAttr("value", form.instagram)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div></div><div class="mt-4" data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>LinkedIn</label><input${ssrRenderAttr("value", form.linkedin)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div class="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200" data-v-93000e3d><h4 class="text-md font-semibold text-yellow-800 mb-3" data-v-93000e3d>Emergency Contact (Kontak Darurat)</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-93000e3d><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Nama Kontak Darurat</label><input${ssrRenderAttr("value", form.nama_emergency)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Nama lengkap kontak darurat" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Hubungan</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d><option value="" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.hubungan_emergency) ? ssrLooseContain(form.hubungan_emergency, "") : ssrLooseEqual(form.hubungan_emergency, "")) ? " selected" : ""}>Pilih Hubungan</option><option value="Ayah" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.hubungan_emergency) ? ssrLooseContain(form.hubungan_emergency, "Ayah") : ssrLooseEqual(form.hubungan_emergency, "Ayah")) ? " selected" : ""}>Ayah</option><option value="Ibu" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.hubungan_emergency) ? ssrLooseContain(form.hubungan_emergency, "Ibu") : ssrLooseEqual(form.hubungan_emergency, "Ibu")) ? " selected" : ""}>Ibu</option><option value="Suami" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.hubungan_emergency) ? ssrLooseContain(form.hubungan_emergency, "Suami") : ssrLooseEqual(form.hubungan_emergency, "Suami")) ? " selected" : ""}>Suami</option><option value="Istri" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.hubungan_emergency) ? ssrLooseContain(form.hubungan_emergency, "Istri") : ssrLooseEqual(form.hubungan_emergency, "Istri")) ? " selected" : ""}>Istri</option><option value="Anak" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.hubungan_emergency) ? ssrLooseContain(form.hubungan_emergency, "Anak") : ssrLooseEqual(form.hubungan_emergency, "Anak")) ? " selected" : ""}>Anak</option><option value="Saudara" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.hubungan_emergency) ? ssrLooseContain(form.hubungan_emergency, "Saudara") : ssrLooseEqual(form.hubungan_emergency, "Saudara")) ? " selected" : ""}>Saudara</option><option value="Kerabat" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.hubungan_emergency) ? ssrLooseContain(form.hubungan_emergency, "Kerabat") : ssrLooseEqual(form.hubungan_emergency, "Kerabat")) ? " selected" : ""}>Kerabat</option><option value="Teman" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.hubungan_emergency) ? ssrLooseContain(form.hubungan_emergency, "Teman") : ssrLooseEqual(form.hubungan_emergency, "Teman")) ? " selected" : ""}>Teman</option><option value="Lainnya" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.hubungan_emergency) ? ssrLooseContain(form.hubungan_emergency, "Lainnya") : ssrLooseEqual(form.hubungan_emergency, "Lainnya")) ? " selected" : ""}>Lainnya</option></select></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Nomor Telepon</label><input${ssrRenderAttr("value", form.nomor_telepon_emergency)} type="tel" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Nomor HP/telepon yang bisa dihubungi" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Alamat</label><textarea rows="2" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Alamat lengkap kontak darurat" data-v-93000e3d>${ssrInterpolate(form.alamat_emergency)}</textarea></div></div></div></div><div class="mb-8" data-v-93000e3d><h3 class="text-lg font-semibold text-sage-800 mb-4 pb-2 border-b border-sage-200" data-v-93000e3d> Section 2: Data Orang Tua </h3><div class="mb-4" data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Alamat Rumah Orang Tua</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d>${ssrInterpolate(form.alamat_orang_tua)}</textarea></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4" data-v-93000e3d><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>RT</label><input${ssrRenderAttr("value", form.rt_orang_tua)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>RW</label><input${ssrRenderAttr("value", form.rw_orang_tua)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Kelurahan</label><input${ssrRenderAttr("value", form.kelurahan_orang_tua)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Kecamatan</label><input${ssrRenderAttr("value", form.kecamatan_orang_tua)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" data-v-93000e3d><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Kota</label><input${ssrRenderAttr("value", form.kota_orang_tua)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Provinsi</label><input${ssrRenderAttr("value", form.provinsi_orang_tua)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-93000e3d><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Nomor Telp</label><input${ssrRenderAttr("value", form.nomor_telp_orang_tua)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Nomor HP</label><input${ssrRenderAttr("value", form.nomor_hp_orang_tua)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div></div></div><div class="mb-8" data-v-93000e3d><h3 class="text-lg font-semibold text-sage-800 mb-4 pb-2 border-b border-sage-200" data-v-93000e3d> Additional Information </h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-93000e3d><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Tanggal Masuk</label><input${ssrRenderAttr("value", form.tanggal_masuk)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Posisi</label><input${ssrRenderAttr("value", form.posisi)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d> Status <span class="text-red-500" data-v-93000e3d>*</span></label><select class="${ssrRenderClass([{ "border-red-500": errors.value.status }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-93000e3d><option value="" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "") : ssrLooseEqual(form.status, "")) ? " selected" : ""}>Pilih Status</option><option value="active" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "active") : ssrLooseEqual(form.status, "active")) ? " selected" : ""}>Active</option><option value="inactive" data-v-93000e3d${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "inactive") : ssrLooseEqual(form.status, "inactive")) ? " selected" : ""}>Inactive</option></select>`);
      if (errors.value.status) {
        _push(`<span class="text-red-500 text-xs mt-1" data-v-93000e3d>${ssrInterpolate(errors.value.status[0])}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mt-4" data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Keterangan</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d>${ssrInterpolate(form.keterangan)}</textarea></div></div><div class="mb-8" data-v-93000e3d><h3 class="text-lg font-semibold text-sage-800 mb-4 pb-2 border-b border-sage-200" data-v-93000e3d> Section 4: Data Keluarga (Opsional) </h3><div class="space-y-6" data-v-93000e3d><div class="bg-gray-50 p-4 rounded-lg" data-v-93000e3d><h4 class="font-semibold text-gray-700 mb-3" data-v-93000e3d>Data Ayah</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-93000e3d><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Nama Ayah</label><input${ssrRenderAttr("value", form.family_members.ayah.nama_keluarga)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Tempat Lahir</label><input${ssrRenderAttr("value", form.family_members.ayah.tempat_lahir_keluarga)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Tanggal Lahir</label><input${ssrRenderAttr("value", form.family_members.ayah.tanggal_lahir_keluarga)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Pendidikan Terakhir</label><input${ssrRenderAttr("value", form.family_members.ayah.pendidikan_terakhir)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div class="md:col-span-2" data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Pekerjaan</label><input${ssrRenderAttr("value", form.family_members.ayah.pekerjaan)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div></div></div><div class="bg-gray-50 p-4 rounded-lg" data-v-93000e3d><h4 class="font-semibold text-gray-700 mb-3" data-v-93000e3d>Data Ibu</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-93000e3d><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Nama Ibu</label><input${ssrRenderAttr("value", form.family_members.ibu.nama_keluarga)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Tempat Lahir</label><input${ssrRenderAttr("value", form.family_members.ibu.tempat_lahir_keluarga)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Tanggal Lahir</label><input${ssrRenderAttr("value", form.family_members.ibu.tanggal_lahir_keluarga)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Pendidikan Terakhir</label><input${ssrRenderAttr("value", form.family_members.ibu.pendidikan_terakhir)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div class="md:col-span-2" data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Pekerjaan</label><input${ssrRenderAttr("value", form.family_members.ibu.pekerjaan)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div></div></div></div></div><div class="mb-8" data-v-93000e3d><div class="flex justify-between items-center mb-4" data-v-93000e3d><h3 class="text-lg font-semibold text-sage-800 pb-2 border-b border-sage-200 flex-1" data-v-93000e3d> Section 5: Pengalaman Kerja (Opsional) </h3><button type="button" class="ml-4 px-3 py-1 bg-sage-600 text-white text-sm rounded hover:bg-sage-700 transition-colors" data-v-93000e3d> + Tambah </button></div><div class="space-y-4" data-v-93000e3d><!--[-->`);
      ssrRenderList(form.work_experiences, (work, index) => {
        _push(`<div class="bg-gray-50 p-4 rounded-lg relative" data-v-93000e3d>`);
        if (form.work_experiences.length > 1) {
          _push(`<button type="button" class="absolute top-2 right-2 text-red-500 hover:text-red-700" data-v-93000e3d><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" data-v-93000e3d><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" data-v-93000e3d></path></svg></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<h4 class="font-semibold text-gray-700 mb-3" data-v-93000e3d>Pengalaman Kerja ${ssrInterpolate(index + 1)}</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-93000e3d><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Nama Perusahaan</label><input${ssrRenderAttr("value", work.nama_perusahaan)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Jabatan</label><input${ssrRenderAttr("value", work.jabatan)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Tanggal Mulai</label><input${ssrRenderAttr("value", work.tanggal_mulai)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Tanggal Berakhir</label><input${ssrRenderAttr("value", work.tanggal_berakhir)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Gaji Terakhir</label><input${ssrRenderAttr("value", work.gaji_terakhir)} type="number" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div><div data-v-93000e3d><label class="block text-sm font-medium text-sage-700 mb-2" data-v-93000e3d>Alasan Berhenti</label><input${ssrRenderAttr("value", work.alasan_berhenti)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-93000e3d></div></div></div>`);
      });
      _push(`<!--]-->`);
      if (form.work_experiences.length === 0) {
        _push(`<div class="text-center text-gray-500 py-4" data-v-93000e3d> Belum ada pengalaman kerja. Klik &quot;Tambah&quot; untuk menambahkan. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mb-8" data-v-93000e3d><h3 class="text-lg font-semibold text-sage-800 mb-4 pb-2 border-b border-sage-200" data-v-93000e3d> Section 6: Status Dokumen </h3><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" data-v-93000e3d><div class="flex items-center" data-v-93000e3d><input${ssrIncludeBooleanAttr(Array.isArray(form.document_status.surat_lamaran) ? ssrLooseContain(form.document_status.surat_lamaran, null) : form.document_status.surat_lamaran) ? " checked" : ""} type="checkbox" class="mr-2 w-4 h-4 text-sage-600 border-gray-300 rounded focus:ring-sage-500" data-v-93000e3d><label class="text-sm" data-v-93000e3d>Surat Lamaran</label></div><div class="flex items-center" data-v-93000e3d><input${ssrIncludeBooleanAttr(Array.isArray(form.document_status.cv) ? ssrLooseContain(form.document_status.cv, null) : form.document_status.cv) ? " checked" : ""} type="checkbox" class="mr-2 w-4 h-4 text-sage-600 border-gray-300 rounded focus:ring-sage-500" data-v-93000e3d><label class="text-sm" data-v-93000e3d>CV</label></div><div class="flex items-center" data-v-93000e3d><input${ssrIncludeBooleanAttr(Array.isArray(form.document_status.akte_kelahiran) ? ssrLooseContain(form.document_status.akte_kelahiran, null) : form.document_status.akte_kelahiran) ? " checked" : ""} type="checkbox" class="mr-2 w-4 h-4 text-sage-600 border-gray-300 rounded focus:ring-sage-500" data-v-93000e3d><label class="text-sm" data-v-93000e3d>Akte Kelahiran</label></div><div class="flex items-center" data-v-93000e3d><input${ssrIncludeBooleanAttr(Array.isArray(form.document_status.kartu_keluarga) ? ssrLooseContain(form.document_status.kartu_keluarga, null) : form.document_status.kartu_keluarga) ? " checked" : ""} type="checkbox" class="mr-2 w-4 h-4 text-sage-600 border-gray-300 rounded focus:ring-sage-500" data-v-93000e3d><label class="text-sm" data-v-93000e3d>Kartu Keluarga</label></div><div class="flex items-center" data-v-93000e3d><input${ssrIncludeBooleanAttr(Array.isArray(form.document_status.surat_pengalaman_kerja) ? ssrLooseContain(form.document_status.surat_pengalaman_kerja, null) : form.document_status.surat_pengalaman_kerja) ? " checked" : ""} type="checkbox" class="mr-2 w-4 h-4 text-sage-600 border-gray-300 rounded focus:ring-sage-500" data-v-93000e3d><label class="text-sm" data-v-93000e3d>Surat Pengalaman Kerja</label></div><div class="flex items-center" data-v-93000e3d><input${ssrIncludeBooleanAttr(Array.isArray(form.document_status.ktp_sim) ? ssrLooseContain(form.document_status.ktp_sim, null) : form.document_status.ktp_sim) ? " checked" : ""} type="checkbox" class="mr-2 w-4 h-4 text-sage-600 border-gray-300 rounded focus:ring-sage-500" data-v-93000e3d><label class="text-sm" data-v-93000e3d>KTP/SIM</label></div><div class="flex items-center" data-v-93000e3d><input${ssrIncludeBooleanAttr(Array.isArray(form.document_status.skck) ? ssrLooseContain(form.document_status.skck, null) : form.document_status.skck) ? " checked" : ""} type="checkbox" class="mr-2 w-4 h-4 text-sage-600 border-gray-300 rounded focus:ring-sage-500" data-v-93000e3d><label class="text-sm" data-v-93000e3d>SKCK</label></div><div class="flex items-center" data-v-93000e3d><input${ssrIncludeBooleanAttr(Array.isArray(form.document_status.pas_foto) ? ssrLooseContain(form.document_status.pas_foto, null) : form.document_status.pas_foto) ? " checked" : ""} type="checkbox" class="mr-2 w-4 h-4 text-sage-600 border-gray-300 rounded focus:ring-sage-500" data-v-93000e3d><label class="text-sm" data-v-93000e3d>Pas Foto</label></div><div class="flex items-center" data-v-93000e3d><input${ssrIncludeBooleanAttr(Array.isArray(form.document_status.ijazah) ? ssrLooseContain(form.document_status.ijazah, null) : form.document_status.ijazah) ? " checked" : ""} type="checkbox" class="mr-2 w-4 h-4 text-sage-600 border-gray-300 rounded focus:ring-sage-500" data-v-93000e3d><label class="text-sm" data-v-93000e3d>Ijazah</label></div><div class="flex items-center" data-v-93000e3d><input${ssrIncludeBooleanAttr(Array.isArray(form.document_status.surat_sehat) ? ssrLooseContain(form.document_status.surat_sehat, null) : form.document_status.surat_sehat) ? " checked" : ""} type="checkbox" class="mr-2 w-4 h-4 text-sage-600 border-gray-300 rounded focus:ring-sage-500" data-v-93000e3d><label class="text-sm" data-v-93000e3d>Surat Sehat</label></div><div class="flex items-center" data-v-93000e3d><input${ssrIncludeBooleanAttr(Array.isArray(form.document_status.npwp) ? ssrLooseContain(form.document_status.npwp, null) : form.document_status.npwp) ? " checked" : ""} type="checkbox" class="mr-2 w-4 h-4 text-sage-600 border-gray-300 rounded focus:ring-sage-500" data-v-93000e3d><label class="text-sm" data-v-93000e3d>NPWP</label></div></div></div><div class="flex justify-end space-x-3 pt-6 border-t border-sage-200" data-v-93000e3d><a href="/master-admin/employees" class="px-4 py-2 text-sage-600 bg-sage-100 rounded-lg hover:bg-sage-200 transition-colors" data-v-93000e3d> Cancel </a><button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50" data-v-93000e3d>${ssrInterpolate(processing.value ? "Saving..." : "Save Employee")}</button></div></form></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Employees/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-93000e3d"]]);
export {
  Create as default
};
