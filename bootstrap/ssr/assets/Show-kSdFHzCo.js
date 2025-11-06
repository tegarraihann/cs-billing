import { ref, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-Ce1gujPB.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { ArrowLeft, Edit, CheckCircle } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DXLFoR_k.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    salary: Object
  },
  setup(__props) {
    const props = __props;
    const loading = ref(false);
    const approveSalary = () => {
      if (confirm("Apakah Anda yakin ingin menyetujui dan membayar gaji ini? Tindakan ini tidak dapat dibatalkan.")) {
        loading.value = true;
        router.post(route("admin-keuangan.employee-salary.approve", props.salary.id), {}, {
          onFinish: () => {
            loading.value = false;
          }
        });
      }
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount || 0);
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: "Detail Gaji - " + __props.salary.employee_name
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.employee-salary.index"),
              class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Kembali ke Daftar Gaji Karyawan `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Kembali ke Daftar Gaji Karyawan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex justify-between items-start"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(((_a = __props.salary) == null ? void 0 : _a.employee_name) || "Nama tidak tersedia")}</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(((_b = __props.salary) == null ? void 0 : _b.position) || "Posisi tidak tersedia")} - ${ssrInterpolate(((_c = __props.salary) == null ? void 0 : _c.division_label) || "Divisi tidak tersedia")}</p></div>`);
            if (__props.salary) {
              _push2(`<div class="flex space-x-3"${_scopeId}>`);
              if (__props.salary.status === "draft") {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("admin-keuangan.employee-salary.edit", __props.salary.id),
                  class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(Edit), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                      _push3(` Edit `);
                    } else {
                      return [
                        createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Edit ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (__props.salary.status === "draft") {
                _push2(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(loading.value ? "Processing..." : "Approve & Bayar")}</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="space-y-6"${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Informasi Karyawan</h3></div><div class="border-t border-gray-200"${_scopeId}><dl${_scopeId}><div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Nama Lengkap</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(((_d = __props.salary) == null ? void 0 : _d.employee_name) || "-")}</dd></div><div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>ID Karyawan</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(((_e = __props.salary) == null ? void 0 : _e.employee_id) || "-")}</dd></div><div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Divisi</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(((_f = __props.salary) == null ? void 0 : _f.division_label) || "-")}</dd></div><div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Jabatan</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(((_g = __props.salary) == null ? void 0 : _g.position) || "-")}</dd></div></dl></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Informasi Gaji</h3><p class="mt-1 max-w-2xl text-sm text-gray-500"${_scopeId}>Periode ${ssrInterpolate(((_h = __props.salary) == null ? void 0 : _h.formatted_period) || "-")}</p></div><div class="border-t border-gray-200"${_scopeId}><dl${_scopeId}><div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Gaji Pokok</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(formatCurrency((_i = __props.salary) == null ? void 0 : _i.basic_salary))}</dd></div><div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Tunjangan</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(formatCurrency((_j = __props.salary) == null ? void 0 : _j.allowances))}</dd></div><div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Potongan</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(formatCurrency((_k = __props.salary) == null ? void 0 : _k.deductions))}</dd></div><div class="bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t-2 border-green-200"${_scopeId}><dt class="text-sm font-bold text-green-900"${_scopeId}>TOTAL GAJI</dt><dd class="mt-1 text-lg font-bold text-green-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(formatCurrency((_l = __props.salary) == null ? void 0 : _l.total_salary))}</dd></div></dl></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Status &amp; Timeline</h3></div><div class="border-t border-gray-200"${_scopeId}><dl${_scopeId}><div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Status</dt><dd class="mt-1 sm:mt-0 sm:col-span-2"${_scopeId}><span class="${ssrRenderClass([(_n = (_m = __props.salary) == null ? void 0 : _m.status_badge) == null ? void 0 : _n.class, "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(((_p = (_o = __props.salary) == null ? void 0 : _o.status_badge) == null ? void 0 : _p.text) || "-")}</span></dd></div><div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Tanggal Gaji</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(formatDate((_q = __props.salary) == null ? void 0 : _q.salary_date))}</dd></div><div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Dibuat oleh</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(((_s = (_r = __props.salary) == null ? void 0 : _r.creator) == null ? void 0 : _s.name) || "-")}</dd></div>`);
            if ((_t = __props.salary) == null ? void 0 : _t.approved_at) {
              _push2(`<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Disetujui oleh</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(((_v = (_u = __props.salary) == null ? void 0 : _u.approver) == null ? void 0 : _v.name) || "-")} <span class="text-gray-500"${_scopeId}>pada ${ssrInterpolate(formatDate((_w = __props.salary) == null ? void 0 : _w.approved_at))}</span></dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_x = __props.salary) == null ? void 0 : _x.notes) {
              _push2(`<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Catatan</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-line"${_scopeId}>${ssrInterpolate((_y = __props.salary) == null ? void 0 : _y.notes)}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</dl></div></div>`);
            if (((_z = __props.salary) == null ? void 0 : _z.profit_loss_entries) && __props.salary.profit_loss_entries.length > 0) {
              _push2(`<div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Integrasi Laporan Laba Rugi</h3><p class="mt-1 max-w-2xl text-sm text-gray-500"${_scopeId}>Data gaji ini telah terintegrasi dengan laporan laba rugi</p></div><div class="border-t border-gray-200"${_scopeId}><div class="px-4 py-5"${_scopeId}><div class="space-y-3"${_scopeId}><!--[-->`);
              ssrRenderList((_A = __props.salary) == null ? void 0 : _A.profit_loss_entries, (entry) => {
                var _a2;
                _push2(`<div class="flex items-center justify-between p-3 bg-green-50 rounded-md"${_scopeId}><div${_scopeId}><p class="text-sm font-medium text-green-900"${_scopeId}>${ssrInterpolate(entry.description)}</p><p class="text-xs text-green-700"${_scopeId}>Periode: ${ssrInterpolate((_a2 = entry.period) == null ? void 0 : _a2.period_name)}</p></div><div class="text-sm font-semibold text-green-900"${_scopeId}>${ssrInterpolate(formatCurrency(entry.amount))}</div></div>`);
              });
              _push2(`<!--]--></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: "Detail Gaji - " + __props.salary.employee_name
              }, null, 8, ["title"]),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.employee-salary.index"),
                      class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Kembali ke Daftar Gaji Karyawan ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("div", { class: "flex justify-between items-start" }, [
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(((_B = __props.salary) == null ? void 0 : _B.employee_name) || "Nama tidak tersedia"), 1),
                        createVNode("p", { class: "mt-1 text-sm text-gray-600" }, toDisplayString(((_C = __props.salary) == null ? void 0 : _C.position) || "Posisi tidak tersedia") + " - " + toDisplayString(((_D = __props.salary) == null ? void 0 : _D.division_label) || "Divisi tidak tersedia"), 1)
                      ]),
                      __props.salary ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex space-x-3"
                      }, [
                        __props.salary.status === "draft" ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: _ctx.route("admin-keuangan.employee-salary.edit", __props.salary.id),
                          class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Edit ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        __props.salary.status === "draft" ? (openBlock(), createBlock("button", {
                          key: 1,
                          onClick: approveSalary,
                          disabled: loading.value,
                          class: "inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        }, [
                          createVNode(unref(CheckCircle), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" " + toDisplayString(loading.value ? "Processing..." : "Approve & Bayar"), 1)
                        ], 8, ["disabled"])) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                      createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                        createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Informasi Karyawan")
                      ]),
                      createVNode("div", { class: "border-t border-gray-200" }, [
                        createVNode("dl", null, [
                          createVNode("div", { class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Nama Lengkap"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(((_E = __props.salary) == null ? void 0 : _E.employee_name) || "-"), 1)
                          ]),
                          createVNode("div", { class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "ID Karyawan"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(((_F = __props.salary) == null ? void 0 : _F.employee_id) || "-"), 1)
                          ]),
                          createVNode("div", { class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Divisi"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(((_G = __props.salary) == null ? void 0 : _G.division_label) || "-"), 1)
                          ]),
                          createVNode("div", { class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Jabatan"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(((_H = __props.salary) == null ? void 0 : _H.position) || "-"), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                      createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                        createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Informasi Gaji"),
                        createVNode("p", { class: "mt-1 max-w-2xl text-sm text-gray-500" }, "Periode " + toDisplayString(((_I = __props.salary) == null ? void 0 : _I.formatted_period) || "-"), 1)
                      ]),
                      createVNode("div", { class: "border-t border-gray-200" }, [
                        createVNode("dl", null, [
                          createVNode("div", { class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Gaji Pokok"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(formatCurrency((_J = __props.salary) == null ? void 0 : _J.basic_salary)), 1)
                          ]),
                          createVNode("div", { class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Tunjangan"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(formatCurrency((_K = __props.salary) == null ? void 0 : _K.allowances)), 1)
                          ]),
                          createVNode("div", { class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Potongan"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(formatCurrency((_L = __props.salary) == null ? void 0 : _L.deductions)), 1)
                          ]),
                          createVNode("div", { class: "bg-green-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 border-t-2 border-green-200" }, [
                            createVNode("dt", { class: "text-sm font-bold text-green-900" }, "TOTAL GAJI"),
                            createVNode("dd", { class: "mt-1 text-lg font-bold text-green-900 sm:mt-0 sm:col-span-2" }, toDisplayString(formatCurrency((_M = __props.salary) == null ? void 0 : _M.total_salary)), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                      createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                        createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Status & Timeline")
                      ]),
                      createVNode("div", { class: "border-t border-gray-200" }, [
                        createVNode("dl", null, [
                          createVNode("div", { class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Status"),
                            createVNode("dd", { class: "mt-1 sm:mt-0 sm:col-span-2" }, [
                              createVNode("span", {
                                class: [(_O = (_N = __props.salary) == null ? void 0 : _N.status_badge) == null ? void 0 : _O.class, "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                              }, toDisplayString(((_Q = (_P = __props.salary) == null ? void 0 : _P.status_badge) == null ? void 0 : _Q.text) || "-"), 3)
                            ])
                          ]),
                          createVNode("div", { class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Tanggal Gaji"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(formatDate((_R = __props.salary) == null ? void 0 : _R.salary_date)), 1)
                          ]),
                          createVNode("div", { class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Dibuat oleh"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(((_T = (_S = __props.salary) == null ? void 0 : _S.creator) == null ? void 0 : _T.name) || "-"), 1)
                          ]),
                          ((_U = __props.salary) == null ? void 0 : _U.approved_at) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Disetujui oleh"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, [
                              createTextVNode(toDisplayString(((_W = (_V = __props.salary) == null ? void 0 : _V.approver) == null ? void 0 : _W.name) || "-") + " ", 1),
                              createVNode("span", { class: "text-gray-500" }, "pada " + toDisplayString(formatDate((_X = __props.salary) == null ? void 0 : _X.approved_at)), 1)
                            ])
                          ])) : createCommentVNode("", true),
                          ((_Y = __props.salary) == null ? void 0 : _Y.notes) ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                          }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Catatan"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 whitespace-pre-line" }, toDisplayString((_Z = __props.salary) == null ? void 0 : _Z.notes), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    ((__ = __props.salary) == null ? void 0 : __.profit_loss_entries) && __props.salary.profit_loss_entries.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white shadow overflow-hidden sm:rounded-lg"
                    }, [
                      createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                        createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Integrasi Laporan Laba Rugi"),
                        createVNode("p", { class: "mt-1 max-w-2xl text-sm text-gray-500" }, "Data gaji ini telah terintegrasi dengan laporan laba rugi")
                      ]),
                      createVNode("div", { class: "border-t border-gray-200" }, [
                        createVNode("div", { class: "px-4 py-5" }, [
                          createVNode("div", { class: "space-y-3" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList((_$ = __props.salary) == null ? void 0 : _$.profit_loss_entries, (entry) => {
                              var _a2;
                              return openBlock(), createBlock("div", {
                                key: entry.id,
                                class: "flex items-center justify-between p-3 bg-green-50 rounded-md"
                              }, [
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-sm font-medium text-green-900" }, toDisplayString(entry.description), 1),
                                  createVNode("p", { class: "text-xs text-green-700" }, "Periode: " + toDisplayString((_a2 = entry.period) == null ? void 0 : _a2.period_name), 1)
                                ]),
                                createVNode("div", { class: "text-sm font-semibold text-green-900" }, toDisplayString(formatCurrency(entry.amount)), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/EmployeeSalary/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
