import { ref, watch, computed, withCtx, unref, createVNode, resolveDynamicComponent, createBlock, createCommentVNode, openBlock, toDisplayString, withModifiers, withDirectives, vModelText, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderVNode, ssrRenderList } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-RVI0Lmfy.js";
import { Head, router } from "@inertiajs/vue3";
import { Calendar, Loader2, RefreshCw, Download, Layers, Scale, Wallet, CheckCircle2, AlertTriangle, Info } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-C7BgyxQX.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    statement: {
      type: Object,
      default: () => ({})
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const selectedDate = ref(((_a = props.filters) == null ? void 0 : _a.date) || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    const isRefreshing = ref(false);
    watch(
      () => {
        var _a2;
        return (_a2 = props.filters) == null ? void 0 : _a2.date;
      },
      (value) => {
        if (value && value !== selectedDate.value) {
          selectedDate.value = value;
        }
      }
    );
    const sections = computed(() => {
      var _a2;
      return ((_a2 = props.statement) == null ? void 0 : _a2.sections) || {};
    });
    const balanceCheck = computed(() => {
      var _a2, _b, _c, _d, _e, _f;
      return {
        assets_total: Number(((_b = (_a2 = props.statement) == null ? void 0 : _a2.balance_check) == null ? void 0 : _b.assets_total) || 0),
        liabilities_equity_total: Number(((_d = (_c = props.statement) == null ? void 0 : _c.balance_check) == null ? void 0 : _d.liabilities_equity_total) || 0),
        difference: Number(((_f = (_e = props.statement) == null ? void 0 : _e.balance_check) == null ? void 0 : _f.difference) || 0)
      };
    });
    const liabilitiesTotal = computed(() => {
      var _a2, _b, _c;
      return Number(((_c = (_b = (_a2 = props.statement) == null ? void 0 : _a2.sections) == null ? void 0 : _b.liabilities) == null ? void 0 : _c.total) || 0);
    });
    const equityTotal = computed(() => {
      var _a2, _b, _c;
      return Number(((_c = (_b = (_a2 = props.statement) == null ? void 0 : _a2.sections) == null ? void 0 : _b.equity) == null ? void 0 : _c.total) || 0);
    });
    const isBalanced = computed(() => Math.abs(balanceCheck.value.difference) < 0.01);
    const refreshData = () => {
      if (!selectedDate.value || isRefreshing.value) {
        return;
      }
      isRefreshing.value = true;
      router.get(
        route("admin-keuangan.financial-position.index"),
        { date: selectedDate.value },
        {
          preserveState: true,
          replace: true,
          onFinish: () => {
            isRefreshing.value = false;
          }
        }
      );
    };
    const exportPdf = () => {
      if (!selectedDate.value) {
        return;
      }
      const url = route("admin-keuangan.financial-position.pdf", { date: selectedDate.value });
      window.open(url, "_blank");
    };
    const formatCurrency = (value) => {
      const amount = Number(value || 0);
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2
      }).format(amount);
    };
    const formatDate = (value) => {
      if (!value) return "-";
      return new Date(value).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateTime = (value) => {
      if (!value) return "-";
      return new Date(value).toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const hasManualOverride = (row) => {
      var _a2;
      return !!((_a2 = row.details) == null ? void 0 : _a2.manual_override);
    };
    const sourceBadgeClass = (row) => {
      if (row.source === "manual") {
        return hasManualOverride(row) ? "bg-amber-100 text-amber-800" : "bg-amber-50 text-amber-700 border border-amber-200";
      }
      if (row.source === "auto") {
        return "bg-blue-100 text-blue-800";
      }
      return "bg-gray-100 text-gray-800";
    };
    const sourceLabel = (row) => {
      if (row.source === "manual") {
        return hasManualOverride(row) ? "Manual" : "Manual (Pending)";
      }
      if (row.source === "auto") {
        return "Auto";
      }
      return "Unknown";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Statement of Financial Position" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6"${_scopeId}><div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Statement of Financial Position</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}> Ringkasan aset, kewajiban, dan ekuitas per tanggal cut-off yang dipilih. </p>`);
            if (__props.statement.generated_at) {
              _push2(`<p class="mt-1 text-xs text-gray-400"${_scopeId}> Terakhir diperbarui ${ssrInterpolate(formatDateTime(__props.statement.generated_at))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><form class="bg-white border border-sage-200 rounded-lg p-4 shadow-sm w-full sm:w-auto"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-end gap-4"${_scopeId}><div${_scopeId}><label for="cutoff-date" class="block text-sm font-medium text-gray-700"${_scopeId}> Tanggal Cut-off </label><div class="mt-1 relative"${_scopeId}><input id="cutoff-date" type="date"${ssrRenderAttr("value", selectedDate.value)} class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring focus:ring-sage-200 focus:ring-opacity-50 text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), { class: "w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="flex gap-3"${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(isRefreshing.value || !selectedDate.value) ? " disabled" : ""} class="inline-flex items-center justify-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150"${_scopeId}>`);
            if (isRefreshing.value) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(RefreshCw), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            }
            _push2(` Reload </button><button type="button"${ssrIncludeBooleanAttr(!selectedDate.value) ? " disabled" : ""} class="inline-flex items-center justify-center px-4 py-2 bg-white border border-sage-300 rounded-md font-semibold text-xs text-sage-700 uppercase tracking-widest hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Download), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Download PDF </button></div></div><p class="mt-2 text-xs text-gray-400"${_scopeId}> Perubahan akan otomatis memuat ulang laporan. </p></form></div><div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"${_scopeId}><div class="bg-white border border-sage-200 rounded-lg shadow-sm p-5 flex items-center"${_scopeId}><div class="p-3 bg-sage-100 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Layers), { class: "w-6 h-6 text-sage-700" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-4"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Total Assets</p><p class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(balanceCheck.value.assets_total))}</p></div></div><div class="bg-white border border-sage-200 rounded-lg shadow-sm p-5 flex items-center"${_scopeId}><div class="p-3 bg-blue-100 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Scale), { class: "w-6 h-6 text-blue-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-4"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Total Liabilities</p><p class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(liabilitiesTotal.value))}</p></div></div><div class="bg-white border border-sage-200 rounded-lg shadow-sm p-5 flex items-center"${_scopeId}><div class="p-3 bg-emerald-100 rounded-lg"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Wallet), { class: "w-6 h-6 text-emerald-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-4"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Total Equity</p><p class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(equityTotal.value))}</p></div></div><div class="${ssrRenderClass([isBalanced.value ? "border-emerald-200" : "border-amber-200", "bg-white border rounded-lg shadow-sm p-5 flex items-center"])}"${_scopeId}><div class="${ssrRenderClass([isBalanced.value ? "bg-emerald-100" : "bg-amber-100", "p-3 rounded-lg"])}"${_scopeId}>`);
            ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(isBalanced.value ? unref(CheckCircle2) : unref(AlertTriangle)), {
              class: ["w-6 h-6", isBalanced.value ? "text-emerald-600" : "text-amber-600"]
            }, null), _parent2, _scopeId);
            _push2(`</div><div class="ml-4"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(isBalanced.value ? "Balanced" : "Difference")}</p><p class="${ssrRenderClass([isBalanced.value ? "text-emerald-600" : "text-amber-600", "text-lg font-semibold"])}"${_scopeId}>${ssrInterpolate(formatCurrency(balanceCheck.value.difference))}</p></div></div></div>`);
            if (!isBalanced.value) {
              _push2(`<div class="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 flex items-start gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(AlertTriangle), { class: "w-5 h-5 mt-0.5 shrink-0" }, null, _parent2, _scopeId));
              _push2(`<div${_scopeId}> Terdapat selisih antara total aset dan total kewajiban + ekuitas. Periksa kembali penyesuaian manual atau pastikan semua modul sudah terposting dengan benar. </div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="rounded-lg border border-sage-200 bg-white px-4 py-3 text-sm text-gray-600 flex items-start gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Info), { class: "w-5 h-5 mt-0.5 shrink-0 text-sage-600" }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}> Label <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium"${_scopeId}>Auto</span> menandakan saldo dihitung otomatis dari modul terkait. Jika diperlukan penyesuaian manual, buat entri di <span class="font-medium"${_scopeId}>Financial Position Adjustments</span>. Entri manual ditandai dengan label <span class="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium"${_scopeId}>Manual</span>. </div></div><div class="space-y-6"${_scopeId}><!--[-->`);
            ssrRenderList(sections.value, (section, sectionKey) => {
              _push2(`<div class="bg-white border border-sage-200 rounded-xl shadow-sm overflow-hidden"${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50"${_scopeId}><h2 class="text-lg font-semibold text-sage-800"${_scopeId}>${ssrInterpolate(section.title)}</h2></div><div class="p-6 space-y-8"${_scopeId}><!--[-->`);
              ssrRenderList(section.groups, (group) => {
                _push2(`<div class="space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><h3 class="text-sm font-semibold text-gray-700 uppercase tracking-wide"${_scopeId}>${ssrInterpolate(group.title)}</h3><span class="text-sm font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(group.total))}</span></div><div class="bg-white border border-gray-100 rounded-lg overflow-hidden"${_scopeId}><table class="min-w-full divide-y divide-gray-100"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"${_scopeId}> Akun </th><th scope="col" class="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"${_scopeId}> Saldo </th><th scope="col" class="px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"${_scopeId}> Sumber </th></tr></thead><tbody class="bg-white divide-y divide-gray-100"${_scopeId}><!--[-->`);
                ssrRenderList(group.rows, (row) => {
                  var _a2;
                  _push2(`<tr${_scopeId}><td class="px-4 py-3"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(row.account_name)}</div><div class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(row.account_code)}</div></td><td class="px-4 py-3 text-right"${_scopeId}><span class="${ssrRenderClass([row.amount < 0 ? "text-red-600" : "text-gray-900", "text-sm font-semibold"])}"${_scopeId}>${ssrInterpolate(formatCurrency(row.amount))}</span></td><td class="px-4 py-3"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}><span class="${ssrRenderClass([sourceBadgeClass(row), "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(sourceLabel(row))}</span>`);
                  if ((_a2 = row.details.manual_override) == null ? void 0 : _a2.effective_date) {
                    _push2(`<span class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(formatDate(row.details.manual_override.effective_date))}</span>`);
                  } else if (row.source === "manual") {
                    _push2(`<span class="text-[11px] text-amber-700 text-right"${_scopeId}> Input via Financial Position Adjustments </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></td></tr>`);
                });
                _push2(`<!--]--></tbody><tfoot${_scopeId}><tr class="bg-gray-50"${_scopeId}><td class="px-4 py-3 text-sm font-semibold text-gray-700"${_scopeId}> Total ${ssrInterpolate(group.title)}</td><td class="px-4 py-3 text-right text-sm font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(group.total))}</td><td${_scopeId}></td></tr></tfoot></table></div></div>`);
              });
              _push2(`<!--]--></div><div class="px-6 py-4 border-t border-sage-200 bg-sage-50 flex items-center justify-between"${_scopeId}><span class="text-sm font-semibold text-sage-800"${_scopeId}> Total ${ssrInterpolate(section.title)}</span><span class="text-base font-bold text-sage-900"${_scopeId}>${ssrInterpolate(formatCurrency(section.total))}</span></div></div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Statement of Financial Position" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6" }, [
                  createVNode("div", { class: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Statement of Financial Position"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " Ringkasan aset, kewajiban, dan ekuitas per tanggal cut-off yang dipilih. "),
                      __props.statement.generated_at ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-xs text-gray-400"
                      }, " Terakhir diperbarui " + toDisplayString(formatDateTime(__props.statement.generated_at)), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("form", {
                      class: "bg-white border border-sage-200 rounded-lg p-4 shadow-sm w-full sm:w-auto",
                      onSubmit: withModifiers(refreshData, ["prevent"])
                    }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:items-end gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "cutoff-date",
                            class: "block text-sm font-medium text-gray-700"
                          }, " Tanggal Cut-off "),
                          createVNode("div", { class: "mt-1 relative" }, [
                            withDirectives(createVNode("input", {
                              id: "cutoff-date",
                              type: "date",
                              "onUpdate:modelValue": ($event) => selectedDate.value = $event,
                              onChange: refreshData,
                              class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring focus:ring-sage-200 focus:ring-opacity-50 text-sm"
                            }, null, 40, ["onUpdate:modelValue"]), [
                              [vModelText, selectedDate.value]
                            ]),
                            createVNode(unref(Calendar), { class: "w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2" })
                          ])
                        ]),
                        createVNode("div", { class: "flex gap-3" }, [
                          createVNode("button", {
                            type: "submit",
                            disabled: isRefreshing.value || !selectedDate.value,
                            class: "inline-flex items-center justify-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150"
                          }, [
                            isRefreshing.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "w-4 h-4 mr-2 animate-spin"
                            })) : (openBlock(), createBlock(unref(RefreshCw), {
                              key: 1,
                              class: "w-4 h-4 mr-2"
                            })),
                            createTextVNode(" Reload ")
                          ], 8, ["disabled"]),
                          createVNode("button", {
                            type: "button",
                            onClick: exportPdf,
                            disabled: !selectedDate.value,
                            class: "inline-flex items-center justify-center px-4 py-2 bg-white border border-sage-300 rounded-md font-semibold text-xs text-sage-700 uppercase tracking-widest hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150"
                          }, [
                            createVNode(unref(Download), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Download PDF ")
                          ], 8, ["disabled"])
                        ])
                      ]),
                      createVNode("p", { class: "mt-2 text-xs text-gray-400" }, " Perubahan akan otomatis memuat ulang laporan. ")
                    ], 32)
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4" }, [
                    createVNode("div", { class: "bg-white border border-sage-200 rounded-lg shadow-sm p-5 flex items-center" }, [
                      createVNode("div", { class: "p-3 bg-sage-100 rounded-lg" }, [
                        createVNode(unref(Layers), { class: "w-6 h-6 text-sage-700" })
                      ]),
                      createVNode("div", { class: "ml-4" }, [
                        createVNode("p", { class: "text-sm text-gray-500" }, "Total Assets"),
                        createVNode("p", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(formatCurrency(balanceCheck.value.assets_total)), 1)
                      ])
                    ]),
                    createVNode("div", { class: "bg-white border border-sage-200 rounded-lg shadow-sm p-5 flex items-center" }, [
                      createVNode("div", { class: "p-3 bg-blue-100 rounded-lg" }, [
                        createVNode(unref(Scale), { class: "w-6 h-6 text-blue-600" })
                      ]),
                      createVNode("div", { class: "ml-4" }, [
                        createVNode("p", { class: "text-sm text-gray-500" }, "Total Liabilities"),
                        createVNode("p", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(formatCurrency(liabilitiesTotal.value)), 1)
                      ])
                    ]),
                    createVNode("div", { class: "bg-white border border-sage-200 rounded-lg shadow-sm p-5 flex items-center" }, [
                      createVNode("div", { class: "p-3 bg-emerald-100 rounded-lg" }, [
                        createVNode(unref(Wallet), { class: "w-6 h-6 text-emerald-600" })
                      ]),
                      createVNode("div", { class: "ml-4" }, [
                        createVNode("p", { class: "text-sm text-gray-500" }, "Total Equity"),
                        createVNode("p", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(formatCurrency(equityTotal.value)), 1)
                      ])
                    ]),
                    createVNode("div", {
                      class: ["bg-white border rounded-lg shadow-sm p-5 flex items-center", isBalanced.value ? "border-emerald-200" : "border-amber-200"]
                    }, [
                      createVNode("div", {
                        class: ["p-3 rounded-lg", isBalanced.value ? "bg-emerald-100" : "bg-amber-100"]
                      }, [
                        (openBlock(), createBlock(resolveDynamicComponent(isBalanced.value ? unref(CheckCircle2) : unref(AlertTriangle)), {
                          class: ["w-6 h-6", isBalanced.value ? "text-emerald-600" : "text-amber-600"]
                        }, null, 8, ["class"]))
                      ], 2),
                      createVNode("div", { class: "ml-4" }, [
                        createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(isBalanced.value ? "Balanced" : "Difference"), 1),
                        createVNode("p", {
                          class: ["text-lg font-semibold", isBalanced.value ? "text-emerald-600" : "text-amber-600"]
                        }, toDisplayString(formatCurrency(balanceCheck.value.difference)), 3)
                      ])
                    ], 2)
                  ]),
                  !isBalanced.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 flex items-start gap-3"
                  }, [
                    createVNode(unref(AlertTriangle), { class: "w-5 h-5 mt-0.5 shrink-0" }),
                    createVNode("div", null, " Terdapat selisih antara total aset dan total kewajiban + ekuitas. Periksa kembali penyesuaian manual atau pastikan semua modul sudah terposting dengan benar. ")
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "rounded-lg border border-sage-200 bg-white px-4 py-3 text-sm text-gray-600 flex items-start gap-3" }, [
                    createVNode(unref(Info), { class: "w-5 h-5 mt-0.5 shrink-0 text-sage-600" }),
                    createVNode("div", null, [
                      createTextVNode(" Label "),
                      createVNode("span", { class: "inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium" }, "Auto"),
                      createTextVNode(" menandakan saldo dihitung otomatis dari modul terkait. Jika diperlukan penyesuaian manual, buat entri di "),
                      createVNode("span", { class: "font-medium" }, "Financial Position Adjustments"),
                      createTextVNode(". Entri manual ditandai dengan label "),
                      createVNode("span", { class: "inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-medium" }, "Manual"),
                      createTextVNode(". ")
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(sections.value, (section, sectionKey) => {
                      return openBlock(), createBlock("div", {
                        key: sectionKey,
                        class: "bg-white border border-sage-200 rounded-xl shadow-sm overflow-hidden"
                      }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                          createVNode("h2", { class: "text-lg font-semibold text-sage-800" }, toDisplayString(section.title), 1)
                        ]),
                        createVNode("div", { class: "p-6 space-y-8" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(section.groups, (group) => {
                            return openBlock(), createBlock("div", {
                              key: group.title,
                              class: "space-y-3"
                            }, [
                              createVNode("div", { class: "flex items-center justify-between" }, [
                                createVNode("h3", { class: "text-sm font-semibold text-gray-700 uppercase tracking-wide" }, toDisplayString(group.title), 1),
                                createVNode("span", { class: "text-sm font-semibold text-gray-900" }, toDisplayString(formatCurrency(group.total)), 1)
                              ]),
                              createVNode("div", { class: "bg-white border border-gray-100 rounded-lg overflow-hidden" }, [
                                createVNode("table", { class: "min-w-full divide-y divide-gray-100" }, [
                                  createVNode("thead", { class: "bg-gray-50" }, [
                                    createVNode("tr", null, [
                                      createVNode("th", {
                                        scope: "col",
                                        class: "px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                      }, " Akun "),
                                      createVNode("th", {
                                        scope: "col",
                                        class: "px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                      }, " Saldo "),
                                      createVNode("th", {
                                        scope: "col",
                                        class: "px-4 py-2 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider"
                                      }, " Sumber ")
                                    ])
                                  ]),
                                  createVNode("tbody", { class: "bg-white divide-y divide-gray-100" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(group.rows, (row) => {
                                      var _a2;
                                      return openBlock(), createBlock("tr", {
                                        key: row.account_code
                                      }, [
                                        createVNode("td", { class: "px-4 py-3" }, [
                                          createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(row.account_name), 1),
                                          createVNode("div", { class: "text-xs text-gray-400" }, toDisplayString(row.account_code), 1)
                                        ]),
                                        createVNode("td", { class: "px-4 py-3 text-right" }, [
                                          createVNode("span", {
                                            class: ["text-sm font-semibold", row.amount < 0 ? "text-red-600" : "text-gray-900"]
                                          }, toDisplayString(formatCurrency(row.amount)), 3)
                                        ]),
                                        createVNode("td", { class: "px-4 py-3" }, [
                                          createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                                            createVNode("span", {
                                              class: ["inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium", sourceBadgeClass(row)]
                                            }, toDisplayString(sourceLabel(row)), 3),
                                            ((_a2 = row.details.manual_override) == null ? void 0 : _a2.effective_date) ? (openBlock(), createBlock("span", {
                                              key: 0,
                                              class: "text-xs text-gray-400"
                                            }, toDisplayString(formatDate(row.details.manual_override.effective_date)), 1)) : row.source === "manual" ? (openBlock(), createBlock("span", {
                                              key: 1,
                                              class: "text-[11px] text-amber-700 text-right"
                                            }, " Input via Financial Position Adjustments ")) : createCommentVNode("", true)
                                          ])
                                        ])
                                      ]);
                                    }), 128))
                                  ]),
                                  createVNode("tfoot", null, [
                                    createVNode("tr", { class: "bg-gray-50" }, [
                                      createVNode("td", { class: "px-4 py-3 text-sm font-semibold text-gray-700" }, " Total " + toDisplayString(group.title), 1),
                                      createVNode("td", { class: "px-4 py-3 text-right text-sm font-semibold text-gray-900" }, toDisplayString(formatCurrency(group.total)), 1),
                                      createVNode("td")
                                    ])
                                  ])
                                ])
                              ])
                            ]);
                          }), 128))
                        ]),
                        createVNode("div", { class: "px-6 py-4 border-t border-sage-200 bg-sage-50 flex items-center justify-between" }, [
                          createVNode("span", { class: "text-sm font-semibold text-sage-800" }, " Total " + toDisplayString(section.title), 1),
                          createVNode("span", { class: "text-base font-bold text-sage-900" }, toDisplayString(formatCurrency(section.total)), 1)
                        ])
                      ]);
                    }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/FinancialPosition/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
