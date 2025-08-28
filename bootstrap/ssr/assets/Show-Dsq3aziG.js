import { ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BEyxLQNh.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { ArrowLeft, RefreshCw, Edit, CheckCircle } from "lucide-vue-next";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B8fnJf_r.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    period: Object,
    reportData: Object,
    accounts: Object
  },
  setup(__props) {
    const props = __props;
    const loading = ref(false);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(amount || 0);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const formatDateTime = (datetime) => {
      return new Date(datetime).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getStatusBadge = (status) => {
      const badges = {
        "draft": "bg-yellow-100 text-yellow-800",
        "published": "bg-blue-100 text-blue-800",
        "closed": "bg-green-100 text-green-800"
      };
      return badges[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusText = (status) => {
      const texts = {
        "draft": "Draft",
        "published": "Published",
        "closed": "Closed"
      };
      return texts[status] || status;
    };
    const regenerateEntries = () => {
      if (confirm("Regenerate akan menghapus semua entry otomatis dan membuat ulang berdasarkan data terbaru. Lanjutkan?")) {
        loading.value = true;
        router.post(route("admin-keuangan.profit-loss.regenerate", props.period.id), {}, {
          onFinish: () => loading.value = false
        });
      }
    };
    const finalizePeriod = () => {
      if (confirm("Setelah ditutup, periode tidak dapat diubah lagi. Lanjutkan?")) {
        loading.value = true;
        router.post(route("admin-keuangan.profit-loss.finalize", props.period.id), {}, {
          onFinish: () => loading.value = false
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: __props.period.period_name
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.profit-loss.index"),
              class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Kembali ke Laporan Laba Rugi `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Kembali ke Laporan Laba Rugi ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div class="flex justify-between items-start"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(__props.period.period_name)}</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(formatDate(__props.period.start_date))} - ${ssrInterpolate(formatDate(__props.period.end_date))} <span class="mx-2"${_scopeId}>•</span><span class="${ssrRenderClass([getStatusBadge(__props.period.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(__props.period.status))}</span></p></div><div class="flex space-x-3"${_scopeId}>`);
            if (__props.period.status !== "closed") {
              _push2(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(RefreshCw), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Regenerate Data </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.period.status !== "closed") {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.profit-loss.edit", __props.period.id),
                class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Edit), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` Edit Periode `);
                  } else {
                    return [
                      createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" Edit Periode ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.period.status !== "closed") {
              _push2(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Tutup Periode </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"${_scopeId}><div class="lg:col-span-2 space-y-8"${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6 border-b border-gray-200"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>PENDAPATAN</h3></div><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="space-y-4"${_scopeId}>`);
            if (__props.reportData.revenues.main.length > 0) {
              _push2(`<div${_scopeId}><h4 class="text-sm font-medium text-gray-700 mb-2"${_scopeId}>Pendapatan Utama</h4><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.reportData.revenues.main, (entry) => {
                _push2(`<div class="flex justify-between items-center py-2 border-b border-gray-100"${_scopeId}><div${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(entry.account.account_name)}</div><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(entry.description)}</div></div><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(entry.amount))}</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.reportData.revenues.other.length > 0) {
              _push2(`<div${_scopeId}><h4 class="text-sm font-medium text-gray-700 mb-2"${_scopeId}>Pendapatan Lainnya</h4><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.reportData.revenues.other, (entry) => {
                _push2(`<div class="flex justify-between items-center py-2 border-b border-gray-100"${_scopeId}><div${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(entry.account.account_name)}</div><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(entry.description)}</div></div><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(entry.amount))}</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="pt-4 border-t border-gray-200"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><div class="text-base font-semibold text-gray-900"${_scopeId}>TOTAL PENDAPATAN</div><div class="text-base font-semibold text-green-600"${_scopeId}>${ssrInterpolate(formatCurrency(__props.reportData.revenues.total))}</div></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6 border-b border-gray-200"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>BEBAN</h3></div><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="space-y-6"${_scopeId}>`);
            if (__props.reportData.expenses.salary.length > 0) {
              _push2(`<div${_scopeId}><h4 class="text-sm font-medium text-gray-700 mb-2"${_scopeId}>Beban Gaji Karyawan</h4><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.reportData.expenses.salary, (entry) => {
                _push2(`<div class="flex justify-between items-center py-2 border-b border-gray-100"${_scopeId}><div${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(entry.description)}</div><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(entry.transaction_date))}</div></div><div class="text-sm font-medium text-red-600"${_scopeId}>${ssrInterpolate(formatCurrency(entry.amount))}</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.reportData.expenses.operational.length > 0) {
              _push2(`<div${_scopeId}><h4 class="text-sm font-medium text-gray-700 mb-2"${_scopeId}>Beban Operasional</h4><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.reportData.expenses.operational, (entry) => {
                _push2(`<div class="flex justify-between items-center py-2 border-b border-gray-100"${_scopeId}><div${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(entry.account.account_name)}</div><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(entry.description)}</div></div><div class="text-sm font-medium text-red-600"${_scopeId}>${ssrInterpolate(formatCurrency(entry.amount))}</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.reportData.expenses.admin.length > 0) {
              _push2(`<div${_scopeId}><h4 class="text-sm font-medium text-gray-700 mb-2"${_scopeId}>Beban Administrasi</h4><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.reportData.expenses.admin, (entry) => {
                _push2(`<div class="flex justify-between items-center py-2 border-b border-gray-100"${_scopeId}><div${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(entry.account.account_name)}</div><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(entry.description)}</div></div><div class="text-sm font-medium text-red-600"${_scopeId}>${ssrInterpolate(formatCurrency(entry.amount))}</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.reportData.expenses.other.length > 0) {
              _push2(`<div${_scopeId}><h4 class="text-sm font-medium text-gray-700 mb-2"${_scopeId}>Beban Lainnya</h4><div class="space-y-2"${_scopeId}><!--[-->`);
              ssrRenderList(__props.reportData.expenses.other, (entry) => {
                _push2(`<div class="flex justify-between items-center py-2 border-b border-gray-100"${_scopeId}><div${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(entry.account.account_name)}</div><div class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(entry.description)}</div></div><div class="text-sm font-medium text-red-600"${_scopeId}>${ssrInterpolate(formatCurrency(entry.amount))}</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="pt-4 border-t border-gray-200"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><div class="text-base font-semibold text-gray-900"${_scopeId}>TOTAL BEBAN</div><div class="text-base font-semibold text-red-600"${_scopeId}>${ssrInterpolate(formatCurrency(__props.reportData.expenses.total))}</div></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="flex justify-between items-center py-4 border-t-2 border-gray-300"${_scopeId}><div class="text-xl font-bold text-gray-900"${_scopeId}>LABA (RUGI) BERSIH</div><div class="${ssrRenderClass(__props.reportData.net_profit >= 0 ? "text-xl font-bold text-green-600" : "text-xl font-bold text-red-600")}"${_scopeId}>${ssrInterpolate(formatCurrency(__props.reportData.net_profit))}</div></div></div></div></div><div class="space-y-6"${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6 border-b border-gray-200"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Ringkasan</h3></div><div class="px-4 py-5 sm:p-6 space-y-4"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span class="text-sm text-gray-500"${_scopeId}>Periode</span><span class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.period.period_type)}</span></div><div class="flex justify-between items-center"${_scopeId}><span class="text-sm text-gray-500"${_scopeId}>Total Pendapatan</span><span class="text-sm font-medium text-green-600"${_scopeId}>${ssrInterpolate(formatCurrency(__props.period.total_revenue))}</span></div><div class="flex justify-between items-center"${_scopeId}><span class="text-sm text-gray-500"${_scopeId}>Beban Gaji</span><span class="text-sm font-medium text-red-600"${_scopeId}>${ssrInterpolate(formatCurrency(((_a = __props.reportData.summary) == null ? void 0 : _a.total_salary_expense) || 0))}</span></div><div class="flex justify-between items-center"${_scopeId}><span class="text-sm text-gray-500"${_scopeId}>Beban Operasional</span><span class="text-sm font-medium text-red-600"${_scopeId}>${ssrInterpolate(formatCurrency(((_b = __props.reportData.summary) == null ? void 0 : _b.total_operational_expense) || 0))}</span></div><div class="flex justify-between items-center"${_scopeId}><span class="text-sm text-gray-500"${_scopeId}>Beban Admin</span><span class="text-sm font-medium text-red-600"${_scopeId}>${ssrInterpolate(formatCurrency(((_c = __props.reportData.summary) == null ? void 0 : _c.total_admin_expense) || 0))}</span></div><div class="flex justify-between items-center"${_scopeId}><span class="text-sm text-gray-500"${_scopeId}>Beban Lainnya</span><span class="text-sm font-medium text-red-600"${_scopeId}>${ssrInterpolate(formatCurrency(((_d = __props.reportData.summary) == null ? void 0 : _d.total_other_expense) || 0))}</span></div><div class="border-t border-gray-200 pt-4"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span class="text-base font-semibold text-gray-900"${_scopeId}>Laba Bersih</span><span class="${ssrRenderClass(__props.period.net_profit >= 0 ? "text-base font-semibold text-green-600" : "text-base font-semibold text-red-600")}"${_scopeId}>${ssrInterpolate(formatCurrency(__props.period.net_profit))}</span></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6 border-b border-gray-200"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Informasi</h3></div><div class="px-4 py-5 sm:p-6 space-y-3"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Dibuat oleh</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.period.creator.name)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Tanggal dibuat</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(__props.period.created_at))}</dd></div>`);
            if (__props.period.approved_by) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Disetujui oleh</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.period.approver.name)}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.period.approved_at) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Tanggal disetujui</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(__props.period.approved_at))}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.period.notes) {
              _push2(`<div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Catatan</dt><dd class="mt-1 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.period.notes)}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: __props.period.period_name
              }, null, 8, ["title"]),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.profit-loss.index"),
                      class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Kembali ke Laporan Laba Rugi ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("div", { class: "flex justify-between items-start" }, [
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(__props.period.period_name), 1),
                        createVNode("p", { class: "mt-1 text-sm text-gray-600" }, [
                          createTextVNode(toDisplayString(formatDate(__props.period.start_date)) + " - " + toDisplayString(formatDate(__props.period.end_date)) + " ", 1),
                          createVNode("span", { class: "mx-2" }, "•"),
                          createVNode("span", {
                            class: [getStatusBadge(__props.period.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                          }, toDisplayString(getStatusText(__props.period.status)), 3)
                        ])
                      ]),
                      createVNode("div", { class: "flex space-x-3" }, [
                        __props.period.status !== "closed" ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: regenerateEntries,
                          disabled: loading.value,
                          class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, [
                          createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Regenerate Data ")
                        ], 8, ["disabled"])) : createCommentVNode("", true),
                        __props.period.status !== "closed" ? (openBlock(), createBlock(unref(Link), {
                          key: 1,
                          href: _ctx.route("admin-keuangan.profit-loss.edit", __props.period.id),
                          class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Edit Periode ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        __props.period.status !== "closed" ? (openBlock(), createBlock("button", {
                          key: 2,
                          onClick: finalizePeriod,
                          disabled: loading.value,
                          class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        }, [
                          createVNode(unref(CheckCircle), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Tutup Periode ")
                        ], 8, ["disabled"])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, [
                    createVNode("div", { class: "lg:col-span-2 space-y-8" }, [
                      createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                        createVNode("div", { class: "px-4 py-5 sm:px-6 border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "PENDAPATAN")
                        ]),
                        createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                          createVNode("div", { class: "space-y-4" }, [
                            __props.reportData.revenues.main.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-700 mb-2" }, "Pendapatan Utama"),
                              createVNode("div", { class: "space-y-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.reportData.revenues.main, (entry) => {
                                  return openBlock(), createBlock("div", {
                                    key: entry.id,
                                    class: "flex justify-between items-center py-2 border-b border-gray-100"
                                  }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(entry.account.account_name), 1),
                                      createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(entry.description), 1)
                                    ]),
                                    createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(entry.amount)), 1)
                                  ]);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true),
                            __props.reportData.revenues.other.length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-700 mb-2" }, "Pendapatan Lainnya"),
                              createVNode("div", { class: "space-y-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.reportData.revenues.other, (entry) => {
                                  return openBlock(), createBlock("div", {
                                    key: entry.id,
                                    class: "flex justify-between items-center py-2 border-b border-gray-100"
                                  }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(entry.account.account_name), 1),
                                      createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(entry.description), 1)
                                    ]),
                                    createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(entry.amount)), 1)
                                  ]);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "pt-4 border-t border-gray-200" }, [
                              createVNode("div", { class: "flex justify-between items-center" }, [
                                createVNode("div", { class: "text-base font-semibold text-gray-900" }, "TOTAL PENDAPATAN"),
                                createVNode("div", { class: "text-base font-semibold text-green-600" }, toDisplayString(formatCurrency(__props.reportData.revenues.total)), 1)
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                        createVNode("div", { class: "px-4 py-5 sm:px-6 border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "BEBAN")
                        ]),
                        createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                          createVNode("div", { class: "space-y-6" }, [
                            __props.reportData.expenses.salary.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-700 mb-2" }, "Beban Gaji Karyawan"),
                              createVNode("div", { class: "space-y-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.reportData.expenses.salary, (entry) => {
                                  return openBlock(), createBlock("div", {
                                    key: entry.id,
                                    class: "flex justify-between items-center py-2 border-b border-gray-100"
                                  }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(entry.description), 1),
                                      createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(formatDate(entry.transaction_date)), 1)
                                    ]),
                                    createVNode("div", { class: "text-sm font-medium text-red-600" }, toDisplayString(formatCurrency(entry.amount)), 1)
                                  ]);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true),
                            __props.reportData.expenses.operational.length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-700 mb-2" }, "Beban Operasional"),
                              createVNode("div", { class: "space-y-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.reportData.expenses.operational, (entry) => {
                                  return openBlock(), createBlock("div", {
                                    key: entry.id,
                                    class: "flex justify-between items-center py-2 border-b border-gray-100"
                                  }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(entry.account.account_name), 1),
                                      createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(entry.description), 1)
                                    ]),
                                    createVNode("div", { class: "text-sm font-medium text-red-600" }, toDisplayString(formatCurrency(entry.amount)), 1)
                                  ]);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true),
                            __props.reportData.expenses.admin.length > 0 ? (openBlock(), createBlock("div", { key: 2 }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-700 mb-2" }, "Beban Administrasi"),
                              createVNode("div", { class: "space-y-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.reportData.expenses.admin, (entry) => {
                                  return openBlock(), createBlock("div", {
                                    key: entry.id,
                                    class: "flex justify-between items-center py-2 border-b border-gray-100"
                                  }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(entry.account.account_name), 1),
                                      createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(entry.description), 1)
                                    ]),
                                    createVNode("div", { class: "text-sm font-medium text-red-600" }, toDisplayString(formatCurrency(entry.amount)), 1)
                                  ]);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true),
                            __props.reportData.expenses.other.length > 0 ? (openBlock(), createBlock("div", { key: 3 }, [
                              createVNode("h4", { class: "text-sm font-medium text-gray-700 mb-2" }, "Beban Lainnya"),
                              createVNode("div", { class: "space-y-2" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.reportData.expenses.other, (entry) => {
                                  return openBlock(), createBlock("div", {
                                    key: entry.id,
                                    class: "flex justify-between items-center py-2 border-b border-gray-100"
                                  }, [
                                    createVNode("div", null, [
                                      createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(entry.account.account_name), 1),
                                      createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(entry.description), 1)
                                    ]),
                                    createVNode("div", { class: "text-sm font-medium text-red-600" }, toDisplayString(formatCurrency(entry.amount)), 1)
                                  ]);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "pt-4 border-t border-gray-200" }, [
                              createVNode("div", { class: "flex justify-between items-center" }, [
                                createVNode("div", { class: "text-base font-semibold text-gray-900" }, "TOTAL BEBAN"),
                                createVNode("div", { class: "text-base font-semibold text-red-600" }, toDisplayString(formatCurrency(__props.reportData.expenses.total)), 1)
                              ])
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                        createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                          createVNode("div", { class: "flex justify-between items-center py-4 border-t-2 border-gray-300" }, [
                            createVNode("div", { class: "text-xl font-bold text-gray-900" }, "LABA (RUGI) BERSIH"),
                            createVNode("div", {
                              class: __props.reportData.net_profit >= 0 ? "text-xl font-bold text-green-600" : "text-xl font-bold text-red-600"
                            }, toDisplayString(formatCurrency(__props.reportData.net_profit)), 3)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                        createVNode("div", { class: "px-4 py-5 sm:px-6 border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Ringkasan")
                        ]),
                        createVNode("div", { class: "px-4 py-5 sm:p-6 space-y-4" }, [
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("span", { class: "text-sm text-gray-500" }, "Periode"),
                            createVNode("span", { class: "text-sm font-medium text-gray-900" }, toDisplayString(__props.period.period_type), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("span", { class: "text-sm text-gray-500" }, "Total Pendapatan"),
                            createVNode("span", { class: "text-sm font-medium text-green-600" }, toDisplayString(formatCurrency(__props.period.total_revenue)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("span", { class: "text-sm text-gray-500" }, "Beban Gaji"),
                            createVNode("span", { class: "text-sm font-medium text-red-600" }, toDisplayString(formatCurrency(((_e = __props.reportData.summary) == null ? void 0 : _e.total_salary_expense) || 0)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("span", { class: "text-sm text-gray-500" }, "Beban Operasional"),
                            createVNode("span", { class: "text-sm font-medium text-red-600" }, toDisplayString(formatCurrency(((_f = __props.reportData.summary) == null ? void 0 : _f.total_operational_expense) || 0)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("span", { class: "text-sm text-gray-500" }, "Beban Admin"),
                            createVNode("span", { class: "text-sm font-medium text-red-600" }, toDisplayString(formatCurrency(((_g = __props.reportData.summary) == null ? void 0 : _g.total_admin_expense) || 0)), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("span", { class: "text-sm text-gray-500" }, "Beban Lainnya"),
                            createVNode("span", { class: "text-sm font-medium text-red-600" }, toDisplayString(formatCurrency(((_h = __props.reportData.summary) == null ? void 0 : _h.total_other_expense) || 0)), 1)
                          ]),
                          createVNode("div", { class: "border-t border-gray-200 pt-4" }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", { class: "text-base font-semibold text-gray-900" }, "Laba Bersih"),
                              createVNode("span", {
                                class: __props.period.net_profit >= 0 ? "text-base font-semibold text-green-600" : "text-base font-semibold text-red-600"
                              }, toDisplayString(formatCurrency(__props.period.net_profit)), 3)
                            ])
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                        createVNode("div", { class: "px-4 py-5 sm:px-6 border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Informasi")
                        ]),
                        createVNode("div", { class: "px-4 py-5 sm:p-6 space-y-3" }, [
                          createVNode("div", null, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Dibuat oleh"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.period.creator.name), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Tanggal dibuat"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDateTime(__props.period.created_at)), 1)
                          ]),
                          __props.period.approved_by ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Disetujui oleh"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.period.approver.name), 1)
                          ])) : createCommentVNode("", true),
                          __props.period.approved_at ? (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Tanggal disetujui"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDateTime(__props.period.approved_at)), 1)
                          ])) : createCommentVNode("", true),
                          __props.period.notes ? (openBlock(), createBlock("div", { key: 2 }, [
                            createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Catatan"),
                            createVNode("dd", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.period.notes), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ProfitLoss/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
