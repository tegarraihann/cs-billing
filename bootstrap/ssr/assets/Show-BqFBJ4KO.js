import { computed, ref, defineComponent, h, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-Cm66Fn0p.js";
import "./Pagination-gQsm_ev8.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { ArrowLeft, Download, RefreshCw, Edit, CheckCircle } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-C7BgyxQX.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    period: Object,
    reportData: Object
  },
  setup(__props) {
    const props = __props;
    const formatCurrency = (value) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(value) || 0);
    const formatDate = (date) => new Date(date).toLocaleDateString("id-ID", { year: "numeric", month: "short", day: "numeric" });
    const getStatusText = (status) => status === "closed" ? "Final" : "Draft";
    const getStatusBadge = (status) => status === "closed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
    const summaryCards = computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return [
        { title: "Total Pendapatan", value: ((_b = (_a = props.reportData) == null ? void 0 : _a.revenues) == null ? void 0 : _b.total) || 0, tone: "text-green-700" },
        { title: "Total Beban", value: ((_d = (_c = props.reportData) == null ? void 0 : _c.expenses) == null ? void 0 : _d.total) || 0, tone: "text-red-700" },
        { title: "Laba/Rugi Bersih", value: ((_e = props.reportData) == null ? void 0 : _e.net_profit) || 0, tone: ((_f = props.reportData) == null ? void 0 : _f.net_profit) >= 0 ? "text-green-700" : "text-red-700" },
        { title: "Status", value: "", tone: "text-gray-500", subtitle: getStatusText(props.period.status) }
      ];
    });
    const revenuesMain = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.revenues) == null ? void 0 : _b.main) || [];
    });
    const otherIncome = computed(() => {
      var _a, _b;
      const oi = ((_b = (_a = props.reportData) == null ? void 0 : _a.revenues) == null ? void 0 : _b.other_income_breakdown) || {};
      return {
        bunga_mandiri: oi.bunga_mandiri || { total: 0, entries: [] },
        bunga_bca: oi.bunga_bca || { total: 0, entries: [] },
        lainnya: oi.lainnya || { total: 0, entries: [] }
      };
    });
    const expensesTotal = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.total) || 0;
    });
    const operationalGrouped = computed(() => {
      var _a, _b, _c;
      return ((_c = (_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.operational) == null ? void 0 : _c.grouped) || [];
    });
    const expensesSalary = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.salary) || [];
    });
    const expensesAdmin = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.admin) || [];
    });
    const expensesOther = computed(() => {
      var _a, _b;
      return ((_b = (_a = props.reportData) == null ? void 0 : _a.expenses) == null ? void 0 : _b.other) || [];
    });
    const isExporting = ref(false);
    const loading = ref(false);
    const exportPdf = () => {
      if (isExporting.value) return;
      isExporting.value = true;
      window.location.href = route("admin-keuangan.profit-loss.export", { profitLoss: props.period.id });
      setTimeout(() => isExporting.value = false, 1e3);
    };
    const regenerateEntries = () => {
      if (loading.value) return;
      loading.value = true;
      router.post(route("admin-keuangan.profit-loss.recalculate", props.period.id), {}, {
        preserveScroll: true,
        onFinish: () => loading.value = false
      });
    };
    const finalizePeriod = () => {
      if (loading.value) return;
      loading.value = true;
      router.post(route("admin-keuangan.profit-loss.finalize", props.period.id), {}, {
        onFinish: () => loading.value = false
      });
    };
    const SectionCard = defineComponent({
      name: "SectionCard",
      props: {
        title: String,
        total: {
          type: [Number, String],
          default: 0
        },
        tone: {
          type: String,
          default: "text-gray-900"
        }
      },
      setup(props2, { slots }) {
        return () => h("div", { class: "bg-white shadow rounded-lg overflow-hidden" }, [
          h("div", { class: "px-4 py-3 border-b border-gray-200 flex justify-between items-center" }, [
            h("h3", { class: "text-sm font-semibold text-gray-900" }, props2.title),
            h("div", { class: `text-sm font-bold ${props2.tone}` }, formatCurrency(props2.total))
          ]),
          h("div", { class: "p-4 space-y-4" }, slots.default ? slots.default() : null)
        ]);
      }
    });
    const CategoryBlock = defineComponent({
      name: "CategoryBlock",
      props: {
        title: String,
        items: {
          type: Array,
          default: () => []
        }
      },
      setup(props2) {
        const pickLabel = (item) => {
          var _a, _b;
          const normalize = (text) => {
            if (!text) return "";
            const parts = text.split(" - ");
            return parts.length > 1 ? parts.slice(1).join(" - ").trim() : text.trim();
          };
          return normalize(item.description) || normalize((_a = item.additional_data) == null ? void 0 : _a.description) || normalize(item.notes) || normalize((_b = item.additional_data) == null ? void 0 : _b.category_name) || "Item";
        };
        return () => h("div", { class: "space-y-2" }, [
          h("div", { class: "text-xs font-semibold text-gray-600 uppercase tracking-wide" }, props2.title),
          h("div", { class: "border border-gray-100 rounded overflow-hidden" }, [
            h("table", { class: "min-w-full text-sm" }, [
              h("thead", { class: "bg-gray-50" }, [
                h("tr", [
                  h("th", { class: "px-3 py-2 text-left font-semibold text-gray-700" }, "Keterangan"),
                  h("th", { class: "px-3 py-2 text-right font-semibold text-gray-700" }, "Nominal")
                ])
              ]),
              h(
                "tbody",
                { class: "divide-y divide-gray-100" },
                (props2.items || []).map(
                  (item, idx) => h("tr", { key: item.id ?? `${props2.title}-${idx}` }, [
                    h("td", { class: "px-3 py-2 text-gray-900" }, h("div", { class: "font-medium" }, pickLabel(item))),
                    h("td", { class: "px-3 py-2 text-right font-semibold text-gray-900" }, formatCurrency(item.amount))
                  ])
                )
              )
            ])
          ])
        ]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: __props.period.period_name
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4"${_scopeId}><div${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.profit-loss.index"),
              class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
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
            _push2(`<h1 class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(__props.period.period_name)}</h1><p class="mt-1 text-sm text-gray-600 flex items-center gap-2 flex-wrap"${_scopeId}><span${_scopeId}>${ssrInterpolate(formatDate(__props.period.start_date))} f6 ${ssrInterpolate(formatDate(__props.period.end_date))}</span><span class="${ssrRenderClass([getStatusBadge(__props.period.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(__props.period.status))}</span></p></div><div class="flex flex-wrap gap-2"${_scopeId}><button${ssrIncludeBooleanAttr(isExporting.value) ? " disabled" : ""} class="${ssrRenderClass([
              "inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md transition-colors",
              isExporting.value ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed" : "text-white bg-red-600 hover:bg-red-700 border-red-600"
            ])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Download), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(isExporting.value ? "Exporting..." : "Export PDF")}</button>`);
            if (__props.period.status !== "closed") {
              _push2(`<button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(RefreshCw), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Sinkron Data Terbaru </button>`);
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
            _push2(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(summaryCards.value, (card) => {
              _push2(`<div class="rounded-lg border border-gray-200 bg-white shadow-sm p-4"${_scopeId}><div class="text-xs font-semibold text-gray-500 uppercase tracking-wide"${_scopeId}>${ssrInterpolate(card.title)}</div><div class="${ssrRenderClass([card.tone, "mt-2 text-lg font-bold"])}"${_scopeId}>${ssrInterpolate(formatCurrency(card.value))}</div>`);
              if (card.subtitle) {
                _push2(`<div class="text-xs text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(card.subtitle)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div><div class="space-y-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(SectionCard), {
              title: "PENDAPATAN",
              total: __props.reportData.revenues.total,
              tone: "text-green-700"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (revenuesMain.value.length) {
                    _push3(ssrRenderComponent(unref(CategoryBlock), {
                      title: "Pendapatan Utama",
                      items: revenuesMain.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (otherIncome.value.bunga_mandiri.total > 0) {
                    _push3(ssrRenderComponent(unref(CategoryBlock), {
                      title: "Pendapatan Lain-lain - Bunga Bank Mandiri",
                      items: otherIncome.value.bunga_mandiri.entries
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (otherIncome.value.bunga_bca.total > 0) {
                    _push3(ssrRenderComponent(unref(CategoryBlock), {
                      title: "Pendapatan Lain-lain - Bunga Bank BCA",
                      items: otherIncome.value.bunga_bca.entries
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (otherIncome.value.lainnya.total > 0) {
                    _push3(ssrRenderComponent(unref(CategoryBlock), {
                      title: "Pendapatan Lain-lain - Lainnya",
                      items: otherIncome.value.lainnya.entries
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    revenuesMain.value.length ? (openBlock(), createBlock(unref(CategoryBlock), {
                      key: 0,
                      title: "Pendapatan Utama",
                      items: revenuesMain.value
                    }, null, 8, ["items"])) : createCommentVNode("", true),
                    otherIncome.value.bunga_mandiri.total > 0 ? (openBlock(), createBlock(unref(CategoryBlock), {
                      key: 1,
                      title: "Pendapatan Lain-lain - Bunga Bank Mandiri",
                      items: otherIncome.value.bunga_mandiri.entries
                    }, null, 8, ["items"])) : createCommentVNode("", true),
                    otherIncome.value.bunga_bca.total > 0 ? (openBlock(), createBlock(unref(CategoryBlock), {
                      key: 2,
                      title: "Pendapatan Lain-lain - Bunga Bank BCA",
                      items: otherIncome.value.bunga_bca.entries
                    }, null, 8, ["items"])) : createCommentVNode("", true),
                    otherIncome.value.lainnya.total > 0 ? (openBlock(), createBlock(unref(CategoryBlock), {
                      key: 3,
                      title: "Pendapatan Lain-lain - Lainnya",
                      items: otherIncome.value.lainnya.entries
                    }, null, 8, ["items"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(SectionCard), {
              title: "BEBAN",
              total: expensesTotal.value,
              tone: "text-red-700"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (expensesSalary.value.length) {
                    _push3(ssrRenderComponent(unref(CategoryBlock), {
                      title: "Beban Gaji",
                      items: expensesSalary.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (operationalGrouped.value.length) {
                    _push3(`<div class="space-y-4"${_scopeId2}><div class="text-xs font-semibold text-gray-600 uppercase tracking-wide"${_scopeId2}>Beban Operasional</div><!--[-->`);
                    ssrRenderList(operationalGrouped.value, (cat) => {
                      _push3(ssrRenderComponent(unref(CategoryBlock), {
                        key: cat.category_name,
                        title: cat.category_name,
                        items: cat.entries
                      }, null, _parent3, _scopeId2));
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (expensesAdmin.value.length) {
                    _push3(ssrRenderComponent(unref(CategoryBlock), {
                      title: "Beban Administrasi",
                      items: expensesAdmin.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (expensesOther.value.length) {
                    _push3(ssrRenderComponent(unref(CategoryBlock), {
                      title: "Beban Lain-lain",
                      items: expensesOther.value
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    expensesSalary.value.length ? (openBlock(), createBlock(unref(CategoryBlock), {
                      key: 0,
                      title: "Beban Gaji",
                      items: expensesSalary.value
                    }, null, 8, ["items"])) : createCommentVNode("", true),
                    operationalGrouped.value.length ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "text-xs font-semibold text-gray-600 uppercase tracking-wide" }, "Beban Operasional"),
                      (openBlock(true), createBlock(Fragment, null, renderList(operationalGrouped.value, (cat) => {
                        return openBlock(), createBlock(unref(CategoryBlock), {
                          key: cat.category_name,
                          title: cat.category_name,
                          items: cat.entries
                        }, null, 8, ["title", "items"]);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    expensesAdmin.value.length ? (openBlock(), createBlock(unref(CategoryBlock), {
                      key: 2,
                      title: "Beban Administrasi",
                      items: expensesAdmin.value
                    }, null, 8, ["items"])) : createCommentVNode("", true),
                    expensesOther.value.length ? (openBlock(), createBlock(unref(CategoryBlock), {
                      key: 3,
                      title: "Beban Lain-lain",
                      items: expensesOther.value
                    }, null, 8, ["items"])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.reportData.net_profit !== void 0) {
              _push2(ssrRenderComponent(unref(SectionCard), {
                title: "LABA / RUGI BERSIH",
                total: __props.reportData.net_profit,
                tone: __props.reportData.net_profit >= 0 ? "text-green-700" : "text-red-700"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: __props.period.period_name
              }, null, 8, ["title"]),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4" }, [
                    createVNode("div", null, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.profit-loss.index"),
                        class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Kembali ke Laporan Laba Rugi ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(__props.period.period_name), 1),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600 flex items-center gap-2 flex-wrap" }, [
                        createVNode("span", null, toDisplayString(formatDate(__props.period.start_date)) + " f6 " + toDisplayString(formatDate(__props.period.end_date)), 1),
                        createVNode("span", {
                          class: [getStatusBadge(__props.period.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                        }, toDisplayString(getStatusText(__props.period.status)), 3)
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                      createVNode("button", {
                        onClick: exportPdf,
                        disabled: isExporting.value,
                        class: [
                          "inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md transition-colors",
                          isExporting.value ? "text-gray-400 bg-gray-100 border-gray-200 cursor-not-allowed" : "text-white bg-red-600 hover:bg-red-700 border-red-600"
                        ]
                      }, [
                        createVNode(unref(Download), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" " + toDisplayString(isExporting.value ? "Exporting..." : "Export PDF"), 1)
                      ], 10, ["disabled"]),
                      __props.period.status !== "closed" ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: regenerateEntries,
                        disabled: loading.value,
                        class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                      }, [
                        createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Sinkron Data Terbaru ")
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
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(summaryCards.value, (card) => {
                      return openBlock(), createBlock("div", {
                        key: card.title,
                        class: "rounded-lg border border-gray-200 bg-white shadow-sm p-4"
                      }, [
                        createVNode("div", { class: "text-xs font-semibold text-gray-500 uppercase tracking-wide" }, toDisplayString(card.title), 1),
                        createVNode("div", {
                          class: [card.tone, "mt-2 text-lg font-bold"]
                        }, toDisplayString(formatCurrency(card.value)), 3),
                        card.subtitle ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-xs text-gray-500 mt-1"
                        }, toDisplayString(card.subtitle), 1)) : createCommentVNode("", true)
                      ]);
                    }), 128))
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode(unref(SectionCard), {
                      title: "PENDAPATAN",
                      total: __props.reportData.revenues.total,
                      tone: "text-green-700"
                    }, {
                      default: withCtx(() => [
                        revenuesMain.value.length ? (openBlock(), createBlock(unref(CategoryBlock), {
                          key: 0,
                          title: "Pendapatan Utama",
                          items: revenuesMain.value
                        }, null, 8, ["items"])) : createCommentVNode("", true),
                        otherIncome.value.bunga_mandiri.total > 0 ? (openBlock(), createBlock(unref(CategoryBlock), {
                          key: 1,
                          title: "Pendapatan Lain-lain - Bunga Bank Mandiri",
                          items: otherIncome.value.bunga_mandiri.entries
                        }, null, 8, ["items"])) : createCommentVNode("", true),
                        otherIncome.value.bunga_bca.total > 0 ? (openBlock(), createBlock(unref(CategoryBlock), {
                          key: 2,
                          title: "Pendapatan Lain-lain - Bunga Bank BCA",
                          items: otherIncome.value.bunga_bca.entries
                        }, null, 8, ["items"])) : createCommentVNode("", true),
                        otherIncome.value.lainnya.total > 0 ? (openBlock(), createBlock(unref(CategoryBlock), {
                          key: 3,
                          title: "Pendapatan Lain-lain - Lainnya",
                          items: otherIncome.value.lainnya.entries
                        }, null, 8, ["items"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["total"]),
                    createVNode(unref(SectionCard), {
                      title: "BEBAN",
                      total: expensesTotal.value,
                      tone: "text-red-700"
                    }, {
                      default: withCtx(() => [
                        expensesSalary.value.length ? (openBlock(), createBlock(unref(CategoryBlock), {
                          key: 0,
                          title: "Beban Gaji",
                          items: expensesSalary.value
                        }, null, 8, ["items"])) : createCommentVNode("", true),
                        operationalGrouped.value.length ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-4"
                        }, [
                          createVNode("div", { class: "text-xs font-semibold text-gray-600 uppercase tracking-wide" }, "Beban Operasional"),
                          (openBlock(true), createBlock(Fragment, null, renderList(operationalGrouped.value, (cat) => {
                            return openBlock(), createBlock(unref(CategoryBlock), {
                              key: cat.category_name,
                              title: cat.category_name,
                              items: cat.entries
                            }, null, 8, ["title", "items"]);
                          }), 128))
                        ])) : createCommentVNode("", true),
                        expensesAdmin.value.length ? (openBlock(), createBlock(unref(CategoryBlock), {
                          key: 2,
                          title: "Beban Administrasi",
                          items: expensesAdmin.value
                        }, null, 8, ["items"])) : createCommentVNode("", true),
                        expensesOther.value.length ? (openBlock(), createBlock(unref(CategoryBlock), {
                          key: 3,
                          title: "Beban Lain-lain",
                          items: expensesOther.value
                        }, null, 8, ["items"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }, 8, ["total"]),
                    __props.reportData.net_profit !== void 0 ? (openBlock(), createBlock(unref(SectionCard), {
                      key: 0,
                      title: "LABA / RUGI BERSIH",
                      total: __props.reportData.net_profit,
                      tone: __props.reportData.net_profit >= 0 ? "text-green-700" : "text-red-700"
                    }, null, 8, ["total", "tone"])) : createCommentVNode("", true)
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
