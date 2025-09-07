import { ref, mergeProps, withCtx, createBlock, createVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _sfc_main$1, a as _sfc_main$2 } from "./DropdownLink-DStkidMI.js";
import SidebarNavigation from "./SidebarNavigation-A0RXUIxC.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    employee: Object
  },
  setup(__props) {
    const isMobileSidebarOpen = ref(false);
    const closeMobileSidebar = () => {
      isMobileSidebarOpen.value = false;
    };
    const getInitials = (name) => {
      if (!name) return "E";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateTime = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const formatCurrency = (amount) => {
      if (!amount) return "-";
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-eeb3ea3f><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-eeb3ea3f><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-eeb3ea3f><div class="flex justify-between items-center h-16" data-v-eeb3ea3f><div class="lg:hidden" data-v-eeb3ea3f><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-eeb3ea3f><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eeb3ea3f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-eeb3ea3f></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-eeb3ea3f><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-eeb3ea3f> Employee Details </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-eeb3ea3f>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        align: "right",
        width: "48"
      }, {
        trigger: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2;
          if (_push2) {
            _push2(`<button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-eeb3ea3f${_scopeId}><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-eeb3ea3f${_scopeId}><span class="text-white font-semibold text-xs sm:text-sm" data-v-eeb3ea3f${_scopeId}>${ssrInterpolate(getInitials((_a2 = _ctx.$page.props.auth.user) == null ? void 0 : _a2.name))}</span></div><div class="hidden sm:block text-left" data-v-eeb3ea3f${_scopeId}><p class="text-sm font-medium text-sage-700" data-v-eeb3ea3f${_scopeId}>${ssrInterpolate((_b2 = _ctx.$page.props.auth.user) == null ? void 0 : _b2.name)}</p><p class="text-xs text-sage-500" data-v-eeb3ea3f${_scopeId}>Master Administrator</p></div><svg class="w-4 h-4 text-sage-600 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eeb3ea3f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-eeb3ea3f${_scopeId}></path></svg></button>`);
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
            _push2(`<div class="py-1" data-v-eeb3ea3f${_scopeId}>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("profile.edit"),
              class: "flex items-center space-x-2 px-4 py-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eeb3ea3f${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-eeb3ea3f${_scopeId2}></path></svg><span data-v-eeb3ea3f${_scopeId2}>Profile</span>`);
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
            _push2(`<div class="border-t border-gray-100 my-1" data-v-eeb3ea3f${_scopeId}></div>`);
            _push2(ssrRenderComponent(_sfc_main$2, {
              href: _ctx.route("logout"),
              method: "post",
              as: "button",
              class: "flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full text-left"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eeb3ea3f${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-eeb3ea3f${_scopeId2}></path></svg><span data-v-eeb3ea3f${_scopeId2}>Log Out</span>`);
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
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-eeb3ea3f></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(SidebarNavigation, {
        "is-mobile-sidebar-open": isMobileSidebarOpen.value,
        onCloseMobileSidebar: closeMobileSidebar
      }, null, _parent));
      _push(`<main class="lg:ml-64 pt-16 min-h-screen" data-v-eeb3ea3f><div class="p-4 sm:p-6 lg:p-8" data-v-eeb3ea3f><div class="mb-6" data-v-eeb3ea3f><nav class="flex" aria-label="Breadcrumb" data-v-eeb3ea3f><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-eeb3ea3f><li class="inline-flex items-center" data-v-eeb3ea3f><a href="/master-admin/employees" class="inline-flex items-center text-sm font-medium text-sage-700 hover:text-sage-900" data-v-eeb3ea3f> Employee Management </a></li><li data-v-eeb3ea3f><div class="flex items-center" data-v-eeb3ea3f><svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" data-v-eeb3ea3f><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-eeb3ea3f></path></svg><span class="ml-1 text-sm font-medium text-gray-500 md:ml-2" data-v-eeb3ea3f>${ssrInterpolate((_a = __props.employee) == null ? void 0 : _a.nama)}</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-eeb3ea3f><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-eeb3ea3f><div class="flex items-center" data-v-eeb3ea3f><div class="w-16 h-16 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-eeb3ea3f><span class="text-white font-semibold text-lg" data-v-eeb3ea3f>${ssrInterpolate(getInitials((_b = __props.employee) == null ? void 0 : _b.nama))}</span></div><div data-v-eeb3ea3f><h2 class="text-2xl font-bold text-sage-800" data-v-eeb3ea3f>${ssrInterpolate((_c = __props.employee) == null ? void 0 : _c.nama)}</h2><p class="text-sage-600" data-v-eeb3ea3f>ID: ${ssrInterpolate((_d = __props.employee) == null ? void 0 : _d.employee_id)}</p><div class="flex items-center mt-1" data-v-eeb3ea3f><span class="${ssrRenderClass([
        ((_e = __props.employee) == null ? void 0 : _e.status) === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
        "inline-flex px-2 py-1 text-xs font-semibold rounded-full"
      ])}" data-v-eeb3ea3f>${ssrInterpolate(((_f = __props.employee) == null ? void 0 : _f.status) === "active" ? "Active" : "Inactive")}</span></div></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-eeb3ea3f><a${ssrRenderAttr("href", `/master-admin/employees/${(_g = __props.employee) == null ? void 0 : _g.id}/edit`)} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-eeb3ea3f><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eeb3ea3f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-eeb3ea3f></path></svg> Edit Employee </a></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-eeb3ea3f><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Data Pribadi</h3></div><div class="p-6 space-y-4" data-v-eeb3ea3f><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-eeb3ea3f><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Tempat Lahir</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_h = __props.employee) == null ? void 0 : _h.tempat_lahir) || "-")}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Tanggal Lahir</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(formatDate((_i = __props.employee) == null ? void 0 : _i.tanggal_lahir))}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Jenis Kelamin</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_j = __props.employee) == null ? void 0 : _j.jenis_kelamin) || "-")}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Agama</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_k = __props.employee) == null ? void 0 : _k.agama) || "-")}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Suku Bangsa</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_l = __props.employee) == null ? void 0 : _l.suku_bangsa) || "-")}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Kewarganegaraan</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_m = __props.employee) == null ? void 0 : _m.kewarganegaraan) || "-")}</p></div></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Alamat Sesuai KTP</label><p class="text-gray-900 mt-1" data-v-eeb3ea3f>${ssrInterpolate(((_n = __props.employee) == null ? void 0 : _n.alamat_ktp) || "-")}</p>`);
      if (((_o = __props.employee) == null ? void 0 : _o.rt_ktp) || ((_p = __props.employee) == null ? void 0 : _p.rw_ktp) || ((_q = __props.employee) == null ? void 0 : _q.kelurahan_ktp) || ((_r = __props.employee) == null ? void 0 : _r.kecamatan_ktp) || ((_s = __props.employee) == null ? void 0 : _s.kota_ktp) || ((_t = __props.employee) == null ? void 0 : _t.provinsi_ktp)) {
        _push(`<p class="text-gray-600 text-sm mt-1" data-v-eeb3ea3f>`);
        if (((_u = __props.employee) == null ? void 0 : _u.rt_ktp) || ((_v = __props.employee) == null ? void 0 : _v.rw_ktp)) {
          _push(`<span data-v-eeb3ea3f>RT ${ssrInterpolate(((_w = __props.employee) == null ? void 0 : _w.rt_ktp) || "-")}/RW ${ssrInterpolate(((_x = __props.employee) == null ? void 0 : _x.rw_ktp) || "-")}</span>`);
        } else {
          _push(`<!---->`);
        }
        if ((((_y = __props.employee) == null ? void 0 : _y.rt_ktp) || ((_z = __props.employee) == null ? void 0 : _z.rw_ktp)) && (((_A = __props.employee) == null ? void 0 : _A.kelurahan_ktp) || ((_B = __props.employee) == null ? void 0 : _B.kecamatan_ktp) || ((_C = __props.employee) == null ? void 0 : _C.kota_ktp) || ((_D = __props.employee) == null ? void 0 : _D.provinsi_ktp))) {
          _push(`<span data-v-eeb3ea3f>, </span>`);
        } else {
          _push(`<!---->`);
        }
        if ((_E = __props.employee) == null ? void 0 : _E.kelurahan_ktp) {
          _push(`<span data-v-eeb3ea3f>${ssrInterpolate(__props.employee.kelurahan_ktp)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (((_F = __props.employee) == null ? void 0 : _F.kelurahan_ktp) && (((_G = __props.employee) == null ? void 0 : _G.kecamatan_ktp) || ((_H = __props.employee) == null ? void 0 : _H.kota_ktp) || ((_I = __props.employee) == null ? void 0 : _I.provinsi_ktp))) {
          _push(`<span data-v-eeb3ea3f>, </span>`);
        } else {
          _push(`<!---->`);
        }
        if ((_J = __props.employee) == null ? void 0 : _J.kecamatan_ktp) {
          _push(`<span data-v-eeb3ea3f>${ssrInterpolate(__props.employee.kecamatan_ktp)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (((_K = __props.employee) == null ? void 0 : _K.kecamatan_ktp) && (((_L = __props.employee) == null ? void 0 : _L.kota_ktp) || ((_M = __props.employee) == null ? void 0 : _M.provinsi_ktp))) {
          _push(`<span data-v-eeb3ea3f>, </span>`);
        } else {
          _push(`<!---->`);
        }
        if ((_N = __props.employee) == null ? void 0 : _N.kota_ktp) {
          _push(`<span data-v-eeb3ea3f>${ssrInterpolate(__props.employee.kota_ktp)}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (((_O = __props.employee) == null ? void 0 : _O.kota_ktp) && ((_P = __props.employee) == null ? void 0 : _P.provinsi_ktp)) {
          _push(`<span data-v-eeb3ea3f>, </span>`);
        } else {
          _push(`<!---->`);
        }
        if ((_Q = __props.employee) == null ? void 0 : _Q.provinsi_ktp) {
          _push(`<span data-v-eeb3ea3f>${ssrInterpolate(__props.employee.provinsi_ktp)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-eeb3ea3f><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Email</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_R = __props.employee) == null ? void 0 : _R.email) || "-")}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Nomor HP</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_S = __props.employee) == null ? void 0 : _S.nomor_hp) || "-")}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Nomor Telp Rumah</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_T = __props.employee) == null ? void 0 : _T.nomor_telp_rumah) || "-")}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Instagram</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_U = __props.employee) == null ? void 0 : _U.instagram) || "-")}</p></div></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>LinkedIn</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_V = __props.employee) == null ? void 0 : _V.linkedin) || "-")}</p></div></div>`);
      if (((_W = __props.employee) == null ? void 0 : _W.nama_emergency) || ((_X = __props.employee) == null ? void 0 : _X.hubungan_emergency) || ((_Y = __props.employee) == null ? void 0 : _Y.nomor_telepon_emergency) || ((_Z = __props.employee) == null ? void 0 : _Z.alamat_emergency)) {
        _push(`<div class="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200" data-v-eeb3ea3f><h4 class="text-md font-semibold text-yellow-800 mb-3" data-v-eeb3ea3f>Emergency Contact (Kontak Darurat)</h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-eeb3ea3f>`);
        if ((__ = __props.employee) == null ? void 0 : __.nama_emergency) {
          _push(`<div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Nama Kontak Darurat</label><p class="text-gray-900 font-semibold" data-v-eeb3ea3f>${ssrInterpolate(__props.employee.nama_emergency)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_$ = __props.employee) == null ? void 0 : _$.hubungan_emergency) {
          _push(`<div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Hubungan</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(__props.employee.hubungan_emergency)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_aa = __props.employee) == null ? void 0 : _aa.nomor_telepon_emergency) {
          _push(`<div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Nomor Telepon</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(__props.employee.nomor_telepon_emergency)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        if ((_ba = __props.employee) == null ? void 0 : _ba.alamat_emergency) {
          _push(`<div class="sm:col-span-2" data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Alamat</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(__props.employee.alamat_emergency)}</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Data Orang Tua</h3></div><div class="p-6 space-y-4" data-v-eeb3ea3f><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Alamat Rumah Orang Tua</label><p class="text-gray-900 mt-1" data-v-eeb3ea3f>${ssrInterpolate(((_ca = __props.employee) == null ? void 0 : _ca.alamat_orang_tua) || "-")}</p>`);
      if (((_da = __props.employee) == null ? void 0 : _da.rt_orang_tua) || ((_ea = __props.employee) == null ? void 0 : _ea.rw_orang_tua)) {
        _push(`<p class="text-gray-600 text-sm mt-1" data-v-eeb3ea3f> RT ${ssrInterpolate(((_fa = __props.employee) == null ? void 0 : _fa.rt_orang_tua) || "-")}/RW ${ssrInterpolate(((_ga = __props.employee) == null ? void 0 : _ga.rw_orang_tua) || "-")}, ${ssrInterpolate(((_ha = __props.employee) == null ? void 0 : _ha.kelurahan_orang_tua) || "-")}, ${ssrInterpolate(((_ia = __props.employee) == null ? void 0 : _ia.kecamatan_orang_tua) || "-")}, ${ssrInterpolate(((_ja = __props.employee) == null ? void 0 : _ja.kota_orang_tua) || "-")}, ${ssrInterpolate(((_ka = __props.employee) == null ? void 0 : _ka.provinsi_orang_tua) || "-")}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-eeb3ea3f><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Nomor Telp</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_la = __props.employee) == null ? void 0 : _la.nomor_telp_orang_tua) || "-")}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Nomor HP</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_ma = __props.employee) == null ? void 0 : _ma.nomor_hp_orang_tua) || "-")}</p></div></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Additional Information</h3></div><div class="p-6" data-v-eeb3ea3f><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4" data-v-eeb3ea3f><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Tanggal Masuk</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(formatDate((_na = __props.employee) == null ? void 0 : _na.tanggal_masuk))}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Posisi</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(((_oa = __props.employee) == null ? void 0 : _oa.posisi) || "-")}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Status</label><span class="${ssrRenderClass([
        ((_pa = __props.employee) == null ? void 0 : _pa.status) === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
        "inline-flex px-2 py-1 text-xs font-semibold rounded-full"
      ])}" data-v-eeb3ea3f>${ssrInterpolate(((_qa = __props.employee) == null ? void 0 : _qa.status) === "active" ? "Active" : "Inactive")}</span></div></div>`);
      if ((_ra = __props.employee) == null ? void 0 : _ra.keterangan) {
        _push(`<div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Keterangan</label><p class="text-gray-900 mt-1" data-v-eeb3ea3f>${ssrInterpolate((_sa = __props.employee) == null ? void 0 : _sa.keterangan)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      if (((_ua = (_ta = __props.employee) == null ? void 0 : _ta.family_members) == null ? void 0 : _ua.length) > 0) {
        _push(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Data Keluarga</h3></div><div class="p-6" data-v-eeb3ea3f><div class="space-y-4" data-v-eeb3ea3f><!--[-->`);
        ssrRenderList(__props.employee.family_members, (family) => {
          _push(`<div class="border border-gray-200 rounded-lg p-4" data-v-eeb3ea3f><div class="grid grid-cols-1 sm:grid-cols-3 gap-4" data-v-eeb3ea3f><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Hubungan</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(family.hubungan_keluarga)}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Nama</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(family.nama_keluarga)}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Jenis Kelamin</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(family.jenis_kelamin_keluarga === "L" ? "Laki-laki" : "Perempuan")}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Tempat, Tanggal Lahir</label><p class="text-gray-900" data-v-eeb3ea3f>`);
          if (family.tempat_lahir_keluarga) {
            _push(`<span data-v-eeb3ea3f>${ssrInterpolate(family.tempat_lahir_keluarga)}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (family.tempat_lahir_keluarga && family.tanggal_lahir_keluarga) {
            _push(`<span data-v-eeb3ea3f>, </span>`);
          } else {
            _push(`<!---->`);
          }
          if (family.tanggal_lahir_keluarga) {
            _push(`<span data-v-eeb3ea3f>${ssrInterpolate(formatDate(family.tanggal_lahir_keluarga))}</span>`);
          } else {
            _push(`<!---->`);
          }
          if (!family.tempat_lahir_keluarga && !family.tanggal_lahir_keluarga) {
            _push(`<span data-v-eeb3ea3f>-</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Pendidikan Terakhir</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(family.pendidikan_terakhir || "-")}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Pekerjaan</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(family.pekerjaan || "-")}</p></div></div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Data Keluarga</h3></div><div class="p-6" data-v-eeb3ea3f><p class="text-gray-500 text-center py-4" data-v-eeb3ea3f>Tidak ada data keluarga yang tercatat.</p></div></div>`);
      }
      if (((_wa = (_va = __props.employee) == null ? void 0 : _va.work_experiences) == null ? void 0 : _wa.length) > 0) {
        _push(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Pengalaman Kerja</h3></div><div class="p-6" data-v-eeb3ea3f><div class="space-y-4" data-v-eeb3ea3f><!--[-->`);
        ssrRenderList(__props.employee.work_experiences, (work) => {
          _push(`<div class="border border-gray-200 rounded-lg p-4" data-v-eeb3ea3f><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-eeb3ea3f><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Nama Perusahaan</label><p class="text-gray-900 font-semibold" data-v-eeb3ea3f>${ssrInterpolate(work.nama_perusahaan)}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Jabatan</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(work.jabatan)}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Periode</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(formatDate(work.tanggal_mulai))} - ${ssrInterpolate(work.tanggal_berakhir ? formatDate(work.tanggal_berakhir) : "Sekarang")}</p></div>`);
          if (work.gaji_terakhir) {
            _push(`<div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Gaji Terakhir</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(formatCurrency(work.gaji_terakhir))}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          if (work.alasan_berhenti) {
            _push(`<div class="sm:col-span-2" data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Alasan Berhenti</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(work.alasan_berhenti)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Pengalaman Kerja</h3></div><div class="p-6" data-v-eeb3ea3f><p class="text-gray-500 text-center py-4" data-v-eeb3ea3f>Tidak ada pengalaman kerja yang tercatat.</p></div></div>`);
      }
      if (((_ya = (_xa = __props.employee) == null ? void 0 : _xa.health_records) == null ? void 0 : _ya.length) > 0) {
        _push(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Riwayat Kesehatan</h3></div><div class="p-6" data-v-eeb3ea3f><div class="space-y-4" data-v-eeb3ea3f><!--[-->`);
        ssrRenderList(__props.employee.health_records, (health) => {
          _push(`<div class="border border-gray-200 rounded-lg p-4" data-v-eeb3ea3f><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-eeb3ea3f><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Jenis Penyakit</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(health.jenis_penyakit)}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Periode Sakit</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(formatDate(health.periode_sakit))}</p></div>`);
          if (health.tindakan_medis) {
            _push(`<div class="sm:col-span-2" data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Tindakan Medis</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(health.tindakan_medis)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          if (health.keterangan) {
            _push(`<div class="sm:col-span-2" data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Keterangan</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(health.keterangan)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Riwayat Kesehatan</h3></div><div class="p-6" data-v-eeb3ea3f><p class="text-gray-500 text-center py-4" data-v-eeb3ea3f>Tidak ada riwayat kesehatan yang tercatat.</p></div></div>`);
      }
      if (((_Aa = (_za = __props.employee) == null ? void 0 : _za.company_references) == null ? void 0 : _Aa.length) > 0) {
        _push(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Referensi Perusahaan</h3></div><div class="p-6" data-v-eeb3ea3f><div class="space-y-4" data-v-eeb3ea3f><!--[-->`);
        ssrRenderList(__props.employee.company_references, (reference) => {
          _push(`<div class="border border-gray-200 rounded-lg p-4" data-v-eeb3ea3f><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-eeb3ea3f><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Nama Referensi</label><p class="text-gray-900 font-semibold" data-v-eeb3ea3f>${ssrInterpolate(reference.nama_referensi)}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Jabatan</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(reference.jabatan_referensi)}</p></div>`);
          if (reference.nomor_telepon_referensi) {
            _push(`<div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Nomor Telepon</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(reference.nomor_telepon_referensi)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          if (reference.email_referensi) {
            _push(`<div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Email</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(reference.email_referensi)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          if (reference.hubungan) {
            _push(`<div class="sm:col-span-2" data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Hubungan</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(reference.hubungan)}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div></div></div>`);
      } else {
        _push(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Referensi Perusahaan</h3></div><div class="p-6" data-v-eeb3ea3f><p class="text-gray-500 text-center py-4" data-v-eeb3ea3f>Tidak ada referensi perusahaan yang tercatat.</p></div></div>`);
      }
      if (((_Ca = (_Ba = __props.employee) == null ? void 0 : _Ba.document_statuses) == null ? void 0 : _Ca.length) > 0) {
        _push(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Status Dokumen</h3></div><div class="p-6" data-v-eeb3ea3f><!--[-->`);
        ssrRenderList(__props.employee.document_statuses, (docStatus) => {
          _push(`<div data-v-eeb3ea3f><div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3" data-v-eeb3ea3f><div class="flex items-center" data-v-eeb3ea3f><span class="${ssrRenderClass([docStatus.surat_lamaran ? "text-green-600" : "text-red-600", "mr-2"])}" data-v-eeb3ea3f>${ssrInterpolate(docStatus.surat_lamaran ? "✓" : "✗")}</span><span class="text-sm" data-v-eeb3ea3f>Surat Lamaran</span></div><div class="flex items-center" data-v-eeb3ea3f><span class="${ssrRenderClass([docStatus.cv ? "text-green-600" : "text-red-600", "mr-2"])}" data-v-eeb3ea3f>${ssrInterpolate(docStatus.cv ? "✓" : "✗")}</span><span class="text-sm" data-v-eeb3ea3f>CV</span></div><div class="flex items-center" data-v-eeb3ea3f><span class="${ssrRenderClass([docStatus.akte_kelahiran ? "text-green-600" : "text-red-600", "mr-2"])}" data-v-eeb3ea3f>${ssrInterpolate(docStatus.akte_kelahiran ? "✓" : "✗")}</span><span class="text-sm" data-v-eeb3ea3f>Akte Kelahiran</span></div><div class="flex items-center" data-v-eeb3ea3f><span class="${ssrRenderClass([docStatus.kartu_keluarga ? "text-green-600" : "text-red-600", "mr-2"])}" data-v-eeb3ea3f>${ssrInterpolate(docStatus.kartu_keluarga ? "✓" : "✗")}</span><span class="text-sm" data-v-eeb3ea3f>Kartu Keluarga</span></div><div class="flex items-center" data-v-eeb3ea3f><span class="${ssrRenderClass([docStatus.surat_pengalaman_kerja ? "text-green-600" : "text-red-600", "mr-2"])}" data-v-eeb3ea3f>${ssrInterpolate(docStatus.surat_pengalaman_kerja ? "✓" : "✗")}</span><span class="text-sm" data-v-eeb3ea3f>Surat Pengalaman Kerja</span></div><div class="flex items-center" data-v-eeb3ea3f><span class="${ssrRenderClass([docStatus.ktp_sim ? "text-green-600" : "text-red-600", "mr-2"])}" data-v-eeb3ea3f>${ssrInterpolate(docStatus.ktp_sim ? "✓" : "✗")}</span><span class="text-sm" data-v-eeb3ea3f>KTP/SIM</span></div><div class="flex items-center" data-v-eeb3ea3f><span class="${ssrRenderClass([docStatus.skck ? "text-green-600" : "text-red-600", "mr-2"])}" data-v-eeb3ea3f>${ssrInterpolate(docStatus.skck ? "✓" : "✗")}</span><span class="text-sm" data-v-eeb3ea3f>SKCK</span></div><div class="flex items-center" data-v-eeb3ea3f><span class="${ssrRenderClass([docStatus.pas_foto ? "text-green-600" : "text-red-600", "mr-2"])}" data-v-eeb3ea3f>${ssrInterpolate(docStatus.pas_foto ? "✓" : "✗")}</span><span class="text-sm" data-v-eeb3ea3f>Pas Foto</span></div><div class="flex items-center" data-v-eeb3ea3f><span class="${ssrRenderClass([docStatus.ijazah ? "text-green-600" : "text-red-600", "mr-2"])}" data-v-eeb3ea3f>${ssrInterpolate(docStatus.ijazah ? "✓" : "✗")}</span><span class="text-sm" data-v-eeb3ea3f>Ijazah</span></div><div class="flex items-center" data-v-eeb3ea3f><span class="${ssrRenderClass([docStatus.surat_sehat ? "text-green-600" : "text-red-600", "mr-2"])}" data-v-eeb3ea3f>${ssrInterpolate(docStatus.surat_sehat ? "✓" : "✗")}</span><span class="text-sm" data-v-eeb3ea3f>Surat Sehat</span></div><div class="flex items-center" data-v-eeb3ea3f><span class="${ssrRenderClass([docStatus.npwp ? "text-green-600" : "text-red-600", "mr-2"])}" data-v-eeb3ea3f>${ssrInterpolate(docStatus.npwp ? "✓" : "✗")}</span><span class="text-sm" data-v-eeb3ea3f>NPWP</span></div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Status Dokumen</h3></div><div class="p-6" data-v-eeb3ea3f><p class="text-gray-500 text-center py-4" data-v-eeb3ea3f>Tidak ada status dokumen yang tercatat.</p></div></div>`);
      }
      _push(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-eeb3ea3f><div class="px-6 py-4 border-b border-sage-200" data-v-eeb3ea3f><h3 class="text-lg font-semibold text-sage-800" data-v-eeb3ea3f>Record Information</h3></div><div class="p-6" data-v-eeb3ea3f><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-eeb3ea3f><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Created At</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(formatDateTime((_Da = __props.employee) == null ? void 0 : _Da.created_at))}</p></div><div data-v-eeb3ea3f><label class="text-sm font-medium text-gray-500" data-v-eeb3ea3f>Last Updated</label><p class="text-gray-900" data-v-eeb3ea3f>${ssrInterpolate(formatDateTime((_Ea = __props.employee) == null ? void 0 : _Ea.updated_at))}</p></div></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/Employees/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eeb3ea3f"]]);
export {
  Show as default
};
