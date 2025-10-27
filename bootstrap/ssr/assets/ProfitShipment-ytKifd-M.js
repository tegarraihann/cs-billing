import { reactive, ref, withCtx, unref, createVNode, toDisplayString, withDirectives, vModelText, createBlock, openBlock, Fragment, renderList, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { Download } from "lucide-vue-next";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-COfqywW7.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-BQ7a3c_z.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "ProfitShipment",
  __ssrInlineRender: true,
  props: {
    profitData: Array,
    summary: Object,
    filters: Object,
    customers: Array
  },
  setup(__props) {
    const props = __props;
    const searchForm = reactive({
      date_from: props.filters.dateFrom || "",
      date_to: props.filters.dateTo || "",
      customer_id: props.filters.customerId || ""
    });
    const isExporting = ref(false);
    const formatNumber = (number) => {
      return new Intl.NumberFormat("id-ID").format(number || 0);
    };
    const formatPercentage = (number) => {
      return (number || 0).toFixed(1);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getProfitStatusClass = (status) => {
      const classes = {
        excellent: "bg-green-100 text-green-800",
        good: "bg-blue-100 text-blue-800",
        low: "bg-yellow-100 text-yellow-800",
        breakeven: "bg-gray-100 text-gray-800",
        loss: "bg-red-100 text-red-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getProfitStatusText = (status) => {
      const texts = {
        excellent: "Excellent",
        good: "Good",
        low: "Low Profit",
        breakeven: "Breakeven",
        loss: "Loss"
      };
      return texts[status] || status;
    };
    const applyFilters = () => {
      router.get(route("admin-keuangan.profit-reports.index"), searchForm, {
        preserveState: true,
        replace: true
      });
    };
    const resetFilters = () => {
      searchForm.date_from = "";
      searchForm.date_to = "";
      searchForm.customer_id = "";
      applyFilters();
    };
    const exportPdf = async () => {
      if (isExporting.value) return;
      try {
        isExporting.value = true;
        const params = new URLSearchParams(searchForm).toString();
        const url = route("admin-keuangan.profit-reports.export-pdf") + "?" + params;
        const newWindow = window.open(url, "_blank");
        if (!newWindow || newWindow.closed || typeof newWindow.closed == "undefined") {
          window.location.href = url;
        }
        await new Promise((resolve) => setTimeout(resolve, 1e3));
      } catch (error) {
        console.error("Error exporting PDF:", error);
        alert("Error exporting PDF. Please try again.");
      } finally {
        isExporting.value = false;
      }
    };
    const viewDetail = (salesOrder) => {
      router.visit(route("admin-keuangan.profit-reports.sales-order-detail", salesOrder.id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Total Profit Shipment Report" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Total Profit Shipment Report</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Laporan profit per shipment dengan detail breakdown</p></div><button${ssrIncludeBooleanAttr(isExporting.value) ? " disabled" : ""} class="${ssrRenderClass([
              "inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150",
              isExporting.value ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            ])}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Download), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>${ssrInterpolate(isExporting.value ? "Exporting..." : "Export PDF")}</span></button></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}>Filter Laporan</h3><div class="grid grid-cols-1 md:grid-cols-4 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Dari Tanggal</label><input${ssrRenderAttr("value", searchForm.date_from)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Sampai Tanggal</label><input${ssrRenderAttr("value", searchForm.date_to)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Customer</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(searchForm.customer_id) ? ssrLooseContain(searchForm.customer_id, "") : ssrLooseEqual(searchForm.customer_id, "")) ? " selected" : ""}${_scopeId}>Semua Customer</option><!--[-->`);
            ssrRenderList(__props.customers, (customer) => {
              _push2(`<option${ssrRenderAttr("value", customer.id)}${ssrIncludeBooleanAttr(Array.isArray(searchForm.customer_id) ? ssrLooseContain(searchForm.customer_id, customer.id) : ssrLooseEqual(searchForm.customer_id, customer.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(customer.company_name)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="flex items-end"${_scopeId}><button class="w-full bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"${_scopeId}> Reset Filters </button></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"${_scopeId}><div class="bg-blue-50 p-6 rounded-lg border border-blue-200"${_scopeId}><div class="text-sm font-medium text-blue-600 mb-1"${_scopeId}>Total Revenue</div><div class="text-2xl font-bold text-blue-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.summary.total_revenue))}</div></div><div class="bg-red-50 p-6 rounded-lg border border-red-200"${_scopeId}><div class="text-sm font-medium text-red-600 mb-1"${_scopeId}>Total Costs</div><div class="text-2xl font-bold text-red-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.summary.total_costs))}</div></div><div class="bg-green-50 p-6 rounded-lg border border-green-200"${_scopeId}><div class="text-sm font-medium text-green-600 mb-1"${_scopeId}>Total Profit</div><div class="${ssrRenderClass([__props.summary.total_profit >= 0 ? "text-green-900" : "text-red-900", "text-2xl font-bold"])}"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.summary.total_profit))}</div></div><div class="bg-purple-50 p-6 rounded-lg border border-purple-200"${_scopeId}><div class="text-sm font-medium text-purple-600 mb-1"${_scopeId}>Avg Profit Margin</div><div class="text-2xl font-bold text-purple-900"${_scopeId}>${ssrInterpolate(formatPercentage(__props.summary.average_profit_margin))}% </div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"${_scopeId}><div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="text-sm font-medium text-gray-500 mb-1"${_scopeId}>Profitable Shipments</div><div class="text-lg font-bold text-green-600"${_scopeId}>${ssrInterpolate(__props.summary.profitable_shipments)} shipments </div></div><div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="text-sm font-medium text-gray-500 mb-1"${_scopeId}>Loss Shipments</div><div class="text-lg font-bold text-red-600"${_scopeId}>${ssrInterpolate(__props.summary.loss_shipments)} shipments </div></div><div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200"${_scopeId}><div class="text-sm font-medium text-gray-500 mb-1"${_scopeId}>Breakeven Shipments</div><div class="text-lg font-bold text-gray-600"${_scopeId}>${ssrInterpolate(__props.summary.breakeven_shipments)} shipments </div></div></div><div class="bg-white rounded-lg shadow-sm overflow-hidden"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> SO Number </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Customer </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Revenue </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Costs </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Profit </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Margin </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.profitData, (item) => {
              var _a;
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(item.sales_order.order_number)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(item.sales_order.created_at))}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_a = item.sales_order.customer) == null ? void 0 : _a.company_name) || item.sales_order.customer)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(item.revenue))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(item.costs))}</td><td class="${ssrRenderClass([item.profit >= 0 ? "text-green-600" : "text-red-600", "px-6 py-4 whitespace-nowrap text-right text-sm font-medium"])}"${_scopeId}> Rp ${ssrInterpolate(formatNumber(item.profit))}</td><td class="${ssrRenderClass([item.profit_margin >= 0 ? "text-green-600" : "text-red-600", "px-6 py-4 whitespace-nowrap text-center text-sm"])}"${_scopeId}>${ssrInterpolate(formatPercentage(item.profit_margin))}% </td><td class="px-6 py-4 whitespace-nowrap text-center"${_scopeId}><span class="${ssrRenderClass([getProfitStatusClass(item.profit_status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getProfitStatusText(item.profit_status))}</span></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"${_scopeId}><button class="text-blue-600 hover:text-blue-900" title="View Detail"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg></button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.profitData.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="8" class="px-6 py-4 text-center text-gray-500"${_scopeId}> Tidak ada data untuk periode yang dipilih </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Total Profit Shipment Report" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Total Profit Shipment Report"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Laporan profit per shipment dengan detail breakdown")
                    ]),
                    createVNode("button", {
                      onClick: exportPdf,
                      disabled: isExporting.value,
                      class: [
                        "inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest transition ease-in-out duration-150",
                        isExporting.value ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      ]
                    }, [
                      createVNode(unref(Download), { class: "w-4 h-4 mr-2" }),
                      createVNode("span", null, toDisplayString(isExporting.value ? "Exporting..." : "Export PDF"), 1)
                    ], 10, ["disabled"])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Filter Laporan"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Dari Tanggal"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => searchForm.date_from = $event,
                            type: "date",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                            onChange: applyFilters
                          }, null, 40, ["onUpdate:modelValue"]), [
                            [vModelText, searchForm.date_from]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Sampai Tanggal"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => searchForm.date_to = $event,
                            type: "date",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                            onChange: applyFilters
                          }, null, 40, ["onUpdate:modelValue"]), [
                            [vModelText, searchForm.date_to]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Customer"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => searchForm.customer_id = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                            onChange: applyFilters
                          }, [
                            createVNode("option", { value: "" }, "Semua Customer"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.customers, (customer) => {
                              return openBlock(), createBlock("option", {
                                key: customer.id,
                                value: customer.id
                              }, toDisplayString(customer.company_name), 9, ["value"]);
                            }), 128))
                          ], 40, ["onUpdate:modelValue"]), [
                            [vModelSelect, searchForm.customer_id]
                          ])
                        ]),
                        createVNode("div", { class: "flex items-end" }, [
                          createVNode("button", {
                            onClick: resetFilters,
                            class: "w-full bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                          }, " Reset Filters ")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" }, [
                    createVNode("div", { class: "bg-blue-50 p-6 rounded-lg border border-blue-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-blue-600 mb-1" }, "Total Revenue"),
                      createVNode("div", { class: "text-2xl font-bold text-blue-900" }, " Rp " + toDisplayString(formatNumber(__props.summary.total_revenue)), 1)
                    ]),
                    createVNode("div", { class: "bg-red-50 p-6 rounded-lg border border-red-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-red-600 mb-1" }, "Total Costs"),
                      createVNode("div", { class: "text-2xl font-bold text-red-900" }, " Rp " + toDisplayString(formatNumber(__props.summary.total_costs)), 1)
                    ]),
                    createVNode("div", { class: "bg-green-50 p-6 rounded-lg border border-green-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-green-600 mb-1" }, "Total Profit"),
                      createVNode("div", {
                        class: ["text-2xl font-bold", __props.summary.total_profit >= 0 ? "text-green-900" : "text-red-900"]
                      }, " Rp " + toDisplayString(formatNumber(__props.summary.total_profit)), 3)
                    ]),
                    createVNode("div", { class: "bg-purple-50 p-6 rounded-lg border border-purple-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-purple-600 mb-1" }, "Avg Profit Margin"),
                      createVNode("div", { class: "text-2xl font-bold text-purple-900" }, toDisplayString(formatPercentage(__props.summary.average_profit_margin)) + "% ", 1)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6" }, [
                    createVNode("div", { class: "bg-white p-4 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-gray-500 mb-1" }, "Profitable Shipments"),
                      createVNode("div", { class: "text-lg font-bold text-green-600" }, toDisplayString(__props.summary.profitable_shipments) + " shipments ", 1)
                    ]),
                    createVNode("div", { class: "bg-white p-4 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-gray-500 mb-1" }, "Loss Shipments"),
                      createVNode("div", { class: "text-lg font-bold text-red-600" }, toDisplayString(__props.summary.loss_shipments) + " shipments ", 1)
                    ]),
                    createVNode("div", { class: "bg-white p-4 rounded-lg shadow-sm border border-gray-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-gray-500 mb-1" }, "Breakeven Shipments"),
                      createVNode("div", { class: "text-lg font-bold text-gray-600" }, toDisplayString(__props.summary.breakeven_shipments) + " shipments ", 1)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm overflow-hidden" }, [
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " SO Number "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Customer "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Revenue "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Costs "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Profit "),
                            createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Margin "),
                            createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                            createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.profitData, (item) => {
                            var _a;
                            return openBlock(), createBlock("tr", {
                              key: item.sales_order.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(item.sales_order.order_number), 1),
                                createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(item.sales_order.created_at)), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_a = item.sales_order.customer) == null ? void 0 : _a.company_name) || item.sales_order.customer), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(item.revenue)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(item.costs)), 1),
                              createVNode("td", {
                                class: ["px-6 py-4 whitespace-nowrap text-right text-sm font-medium", item.profit >= 0 ? "text-green-600" : "text-red-600"]
                              }, " Rp " + toDisplayString(formatNumber(item.profit)), 3),
                              createVNode("td", {
                                class: ["px-6 py-4 whitespace-nowrap text-center text-sm", item.profit_margin >= 0 ? "text-green-600" : "text-red-600"]
                              }, toDisplayString(formatPercentage(item.profit_margin)) + "% ", 3),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center" }, [
                                createVNode("span", {
                                  class: [getProfitStatusClass(item.profit_status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                }, toDisplayString(getProfitStatusText(item.profit_status)), 3)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm font-medium" }, [
                                createVNode("button", {
                                  onClick: ($event) => viewDetail(item.sales_order),
                                  class: "text-blue-600 hover:text-blue-900",
                                  title: "View Detail"
                                }, [
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
                                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    }),
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    })
                                  ]))
                                ], 8, ["onClick"])
                              ])
                            ]);
                          }), 128)),
                          __props.profitData.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "8",
                              class: "px-6 py-4 text-center text-gray-500"
                            }, " Tidak ada data untuk periode yang dipilih ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Reports/ProfitShipment.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
