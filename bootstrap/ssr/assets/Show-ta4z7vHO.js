import { computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { A as AdminCSLayout } from "./AdminCSLayout-B0zM3kLa.js";
import { FileText, FileDown, Pencil, ArrowLeft } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DplzU1dX.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    salesOrder: Object
  },
  setup(__props) {
    const props = __props;
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("en-US");
    };
    const formatDateTime = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleString("en-US");
    };
    const formatCurrency = (amount, currency = "IDR") => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };
    const formatNumber = (amount) => {
      const numAmount = parseFloat(amount) || 0;
      return numAmount.toLocaleString("en-US");
    };
    const normalizeNumber = (value) => {
      if (value === null || value === void 0 || value === "") return 0;
      if (typeof value === "number") {
        return Number.isFinite(value) ? value : 0;
      }
      const normalized = value.toString().trim().replace(/[^\d.,-]/g, "");
      const commaCount = (normalized.match(/,/g) || []).length;
      const dotCount = (normalized.match(/\./g) || []).length;
      let parsedValue = normalized;
      if (commaCount > 1 && dotCount === 0) {
        parsedValue = parsedValue.replace(/,/g, "");
      } else if (dotCount > 1 && commaCount === 0) {
        parsedValue = parsedValue.replace(/\./g, "");
      } else if (commaCount > 0 && dotCount > 0) {
        parsedValue = parsedValue.replace(/\./g, "").replace(",", ".");
      } else if (commaCount === 1 && dotCount === 0) {
        parsedValue = parsedValue.replace(",", ".");
      }
      if ((parsedValue.match(/\./g) || []).length > 1) {
        const parts = parsedValue.split(".");
        const decimal = parts.pop();
        parsedValue = parts.join("") + (decimal ? `.${decimal}` : "");
      }
      const parsed = parseFloat(parsedValue);
      return Number.isNaN(parsed) ? 0 : parsed;
    };
    const resolveQuantityValue = (rawValue) => {
      if (rawValue === "" || rawValue === null || rawValue === void 0) {
        return 1;
      }
      const parsed = normalizeNumber(rawValue);
      return parsed > 0 ? parsed : 0;
    };
    const getVendorLineTotal = (vendorItem, field) => {
      const quantity = resolveQuantityValue(vendorItem == null ? void 0 : vendorItem.quantity);
      return quantity * normalizeNumber(vendorItem == null ? void 0 : vendorItem[field]);
    };
    const getOtherCostLineTotal = (cost) => {
      const quantity = resolveQuantityValue(cost == null ? void 0 : cost.quantity);
      return quantity * normalizeNumber(cost == null ? void 0 : cost.amount);
    };
    const getReimbursementLineTotal = (item) => {
      const quantity = resolveQuantityValue(item == null ? void 0 : item.quantity);
      return quantity * normalizeNumber(item == null ? void 0 : item.amount);
    };
    const totalBuying = computed(() => {
      if (!props.salesOrder.vendor_breakdown) return 0;
      return props.salesOrder.vendor_breakdown.reduce((sum, item) => sum + getVendorLineTotal(item, "buying_amount"), 0);
    });
    const totalSelling = computed(() => {
      if (!props.salesOrder.vendor_breakdown) return 0;
      return props.salesOrder.vendor_breakdown.reduce((sum, item) => sum + getVendorLineTotal(item, "selling_amount"), 0);
    });
    const totalRevenue = computed(() => {
      return totalSelling.value - totalBuying.value;
    });
    const getVendorProfit = (vendorItem) => {
      const buyingTotal = getVendorLineTotal(vendorItem, "buying_amount");
      const sellingTotal = getVendorLineTotal(vendorItem, "selling_amount");
      return sellingTotal - buyingTotal;
    };
    const formatWeight = (weight) => {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(weight) + " kg";
    };
    const formatMeasurement = (measurement) => {
      return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
      }).format(measurement) + " m3";
    };
    const getStatusLabel = (status) => {
      const labels = {
        draft: "Draft",
        sent: "Sent",
        confirmed: "Confirmed",
        cancelled: "Cancelled",
        released: "Released",
        approved: "Approved",
        rejected: "Rejected"
      };
      return labels[status] || status;
    };
    const getStatusColor = (status) => {
      const colors = {
        draft: "bg-gray-100 text-gray-800",
        sent: "bg-blue-100 text-blue-800",
        confirmed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
        released: "bg-purple-100 text-purple-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    const getReimbursementStatusText = (status) => {
      const labels = {
        pending: "Pending",
        linked: "Linked to Invoice",
        invoiced: "Invoiced",
        cancelled: "Cancelled"
      };
      return labels[status] || status || "Pending";
    };
    const getReimbursementStatusColor = (status) => {
      const colors = {
        pending: "bg-yellow-100 text-yellow-800",
        linked: "bg-blue-100 text-blue-800",
        invoiced: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminCSLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="py-6" data-v-220463ff${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-220463ff${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-220463ff${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-220463ff${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-220463ff${_scopeId}><div class="flex items-center" data-v-220463ff${_scopeId}><div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" data-v-220463ff${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-220463ff${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-220463ff${_scopeId}> Shipping Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h1><p class="mt-1 text-sm text-gray-600" data-v-220463ff${_scopeId}> Shipping Order details </p></div></div><div class="mt-4 sm:mt-0 flex flex-wrap gap-3" data-v-220463ff${_scopeId}>`);
            if (__props.salesOrder.status === "released" || __props.salesOrder.status === "confirmed" || __props.salesOrder.status === "approved") {
              _push2(`<a${ssrRenderAttr("href", _ctx.route("admin-cs.sales-orders.print", __props.salesOrder.id))} target="_blank" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition" data-v-220463ff${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileDown), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Export PDF </a>`);
            } else {
              _push2(`<button disabled class="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed" title="Shipping Order must be released before it can be printed" data-v-220463ff${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileDown), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Export PDF </button>`);
            }
            if (__props.salesOrder.cs_can_edit) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-cs.sales-orders.edit", __props.salesOrder.id),
                class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Pencil), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` Edit `);
                  } else {
                    return [
                      createVNode(unref(Pencil), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" Edit ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<button disabled class="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed"${ssrRenderAttr("title", __props.salesOrder.is_finance_created ? "Created by finance" : "Shipping Order cannot be edited (already released)")} data-v-220463ff${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Pencil), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Edit </button>`);
            }
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Back `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Back ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-220463ff${_scopeId}><div class="lg:col-span-2 space-y-6" data-v-220463ff${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" data-v-220463ff${_scopeId}><div class="px-6 py-4 border-b border-gray-200 bg-gray-50" data-v-220463ff${_scopeId}><h3 class="text-lg font-semibold text-gray-900" data-v-220463ff${_scopeId}>Shipping Order Information</h3></div><div class="p-6" data-v-220463ff${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-v-220463ff${_scopeId}><div class="space-y-3" data-v-220463ff${_scopeId}><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>ORDER NUMB:</span><span class="font-semibold" data-v-220463ff${_scopeId}>${ssrInterpolate(__props.salesOrder.order_number)}</span></p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>REF NO:</span> ${ssrInterpolate(__props.salesOrder.ref_no || "-")}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>DATE:</span> ${ssrInterpolate(__props.salesOrder.so_date ? formatDate(__props.salesOrder.so_date) : "-")}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>CUSTOMER:</span> ${ssrInterpolate(__props.salesOrder.customer)}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>SHIPPER:</span> ${ssrInterpolate(__props.salesOrder.shipper || "-")}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>BL/AWB:</span> ${ssrInterpolate(__props.salesOrder.bl_awb || "-")}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>LINER:</span> ${ssrInterpolate(__props.salesOrder.liner || "-")}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>VESSEL:</span> ${ssrInterpolate(__props.salesOrder.vessel || "-")}</p></div><div class="space-y-3" data-v-220463ff${_scopeId}><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>ETA:</span> ${ssrInterpolate(__props.salesOrder.eta ? formatDate(__props.salesOrder.eta) : "-")}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>ETD:</span> ${ssrInterpolate(__props.salesOrder.etd ? formatDate(__props.salesOrder.etd) : "-")}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>AJU:</span> ${ssrInterpolate(__props.salesOrder.aju || "-")}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>SPPB DATE:</span> ${ssrInterpolate(__props.salesOrder.sppb_date ? formatDate(__props.salesOrder.sppb_date) : "-")}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>SHIPMENT TYPE:</span> ${ssrInterpolate(__props.salesOrder.shipment_type || "-")}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>POL/POD:</span> ${ssrInterpolate([__props.salesOrder.pol, __props.salesOrder.pod].filter(Boolean).join(" / ") || "-")}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>GUDANG/UTC:</span> ${ssrInterpolate(__props.salesOrder.gudang_utc || "-")}</p><p class="text-gray-900" data-v-220463ff${_scopeId}><span class="font-semibold text-gray-700" data-v-220463ff${_scopeId}>PARTY/LCL:</span> ${ssrInterpolate(__props.salesOrder.party_lcl || "-")}</p></div></div><div class="border-t border-gray-200 pt-6 mb-6" data-v-220463ff${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-220463ff${_scopeId}><div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-220463ff${_scopeId}>EXCHANGE RATE</label><p class="text-gray-900 font-mono" data-v-220463ff${_scopeId}>${ssrInterpolate(__props.salesOrder.exchange_rate ? formatNumber(__props.salesOrder.exchange_rate) : "-")}</p></div></div></div><div class="border-t border-gray-200 pt-6" data-v-220463ff${_scopeId}><h4 class="text-md font-semibold text-gray-800 mb-4" data-v-220463ff${_scopeId}>Details</h4><div class="overflow-x-auto mb-6" data-v-220463ff${_scopeId}><table class="min-w-full" data-v-220463ff${_scopeId}><thead data-v-220463ff${_scopeId}><tr class="bg-gray-50" data-v-220463ff${_scopeId}><th class="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide" data-v-220463ff${_scopeId}>COST TYPE</th><th class="px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wide" data-v-220463ff${_scopeId}>BUYING</th><th class="px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wide" data-v-220463ff${_scopeId}>SELLING</th><th class="px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wide" data-v-220463ff${_scopeId}>REVENUE</th><th class="px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide" data-v-220463ff${_scopeId}>REMARKS</th></tr></thead><tbody data-v-220463ff${_scopeId}>`);
            if (__props.salesOrder.vendor_breakdown && __props.salesOrder.vendor_breakdown.length > 0) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.salesOrder.vendor_breakdown, (item, index) => {
                _push2(`<tr class="hover:bg-gray-50 transition-colors" data-v-220463ff${_scopeId}><td class="px-6 py-4 text-sm text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(item.description || "Service Type")}</td><td class="px-6 py-4 text-center text-sm font-mono text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(formatCurrency(getVendorLineTotal(item, "buying_amount")))}</td><td class="px-6 py-4 text-center text-sm font-mono text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(formatCurrency(getVendorLineTotal(item, "selling_amount")))}</td><td class="${ssrRenderClass([getVendorProfit(item) >= 0 ? "text-green-700" : "text-red-600", "px-6 py-4 text-center text-sm font-mono"])}" data-v-220463ff${_scopeId}>${ssrInterpolate(formatCurrency(getVendorProfit(item)))}</td><td class="px-6 py-4 text-sm text-gray-600" data-v-220463ff${_scopeId}>${ssrInterpolate(item.remarks || "-")}</td></tr>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<tr data-v-220463ff${_scopeId}><td colspan="5" class="px-6 py-12 text-center text-gray-500" data-v-220463ff${_scopeId}><div class="flex flex-col items-center" data-v-220463ff${_scopeId}><div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4" data-v-220463ff${_scopeId}><svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-220463ff${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-220463ff${_scopeId}></path></svg></div><h3 class="text-lg font-medium text-gray-900 mb-2" data-v-220463ff${_scopeId}>No breakdown data</h3><p class="text-sm text-gray-500 max-w-sm" data-v-220463ff${_scopeId}>No vendor breakdown information yet. Data will appear after pricing information is filled.</p></div></td></tr>`);
            }
            if (__props.salesOrder.vendor_breakdown && __props.salesOrder.vendor_breakdown.length > 0) {
              _push2(`<tr class="bg-gray-50 border-t border-gray-200" data-v-220463ff${_scopeId}><td class="px-6 py-4 text-sm font-semibold text-gray-900 uppercase" data-v-220463ff${_scopeId}> TOTAL </td><td class="px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</td><td class="px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</td><td class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-green-700" : "text-red-600", "px-6 py-4 text-center text-sm font-mono font-semibold"])}" data-v-220463ff${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</td><td class="px-6 py-4 text-center text-gray-400" data-v-220463ff${_scopeId}> - </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.salesOrder.note) {
              _push2(`<div class="mb-6" data-v-220463ff${_scopeId}><h5 class="text-sm font-semibold text-gray-800 mb-3" data-v-220463ff${_scopeId}>Additional Notes</h5><div class="bg-blue-50 border border-blue-200 rounded-lg p-4" data-v-220463ff${_scopeId}><p class="text-gray-900 whitespace-pre-wrap" data-v-220463ff${_scopeId}>${ssrInterpolate(__props.salesOrder.note)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.other_costs && __props.salesOrder.other_costs.length > 0) {
              _push2(`<div class="mb-6" data-v-220463ff${_scopeId}><h5 class="text-sm font-semibold text-gray-800 mb-3" data-v-220463ff${_scopeId}>Other Operating Costs</h5><div class="bg-white border border-gray-200 rounded-lg overflow-hidden" data-v-220463ff${_scopeId}><div class="overflow-x-auto" data-v-220463ff${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-220463ff${_scopeId}><thead class="bg-red-50" data-v-220463ff${_scopeId}><tr data-v-220463ff${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider" data-v-220463ff${_scopeId}>Description</th><th class="px-6 py-3 text-right text-xs font-medium text-red-700 uppercase tracking-wider" data-v-220463ff${_scopeId}>Amount</th><th class="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider" data-v-220463ff${_scopeId}>Category</th><th class="px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider" data-v-220463ff${_scopeId}>Notes</th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-220463ff${_scopeId}><!--[-->`);
              ssrRenderList(__props.salesOrder.other_costs, (cost, index) => {
                _push2(`<tr class="hover:bg-gray-50" data-v-220463ff${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(cost.description || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-mono text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(formatCurrency(getOtherCostLineTotal(cost)))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-v-220463ff${_scopeId}>${ssrInterpolate(cost.category || "-")}</td><td class="px-6 py-4 text-sm text-gray-600" data-v-220463ff${_scopeId}>${ssrInterpolate(cost.notes || "-")}</td></tr>`);
              });
              _push2(`<!--]--></tbody><tfoot class="bg-red-50" data-v-220463ff${_scopeId}><tr data-v-220463ff${_scopeId}><td class="px-6 py-3 text-sm font-semibold text-red-800 uppercase" data-v-220463ff${_scopeId}>Total</td><td class="px-6 py-3 text-right text-sm font-mono font-semibold text-red-900" data-v-220463ff${_scopeId}>${ssrInterpolate(formatCurrency(__props.salesOrder.other_costs.reduce((total, cost) => total + getOtherCostLineTotal(cost), 0)))}</td><td colspan="2" class="px-6 py-3" data-v-220463ff${_scopeId}></td></tr></tfoot></table></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.reimbursement_items && __props.salesOrder.reimbursement_items.length > 0) {
              _push2(`<div class="mb-6" data-v-220463ff${_scopeId}><h5 class="text-sm font-semibold text-gray-800 mb-3" data-v-220463ff${_scopeId}>Items Reimbursement</h5><div class="bg-white border border-gray-200 rounded-lg overflow-hidden" data-v-220463ff${_scopeId}><div class="overflow-x-auto" data-v-220463ff${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-220463ff${_scopeId}><thead class="bg-orange-50" data-v-220463ff${_scopeId}><tr data-v-220463ff${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider" data-v-220463ff${_scopeId}>Description</th><th class="px-6 py-3 text-right text-xs font-medium text-orange-700 uppercase tracking-wider" data-v-220463ff${_scopeId}>Qty</th><th class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider" data-v-220463ff${_scopeId}>Unit</th><th class="px-6 py-3 text-right text-xs font-medium text-orange-700 uppercase tracking-wider" data-v-220463ff${_scopeId}>Amount</th><th class="px-6 py-3 text-center text-xs font-medium text-orange-700 uppercase tracking-wider" data-v-220463ff${_scopeId}>Status</th><th class="px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider" data-v-220463ff${_scopeId}>Notes</th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-220463ff${_scopeId}><!--[-->`);
              ssrRenderList(__props.salesOrder.reimbursement_items, (item, index) => {
                _push2(`<tr class="hover:bg-gray-50" data-v-220463ff${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(item.description || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-mono text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(item.quantity !== "" && item.quantity !== null && item.quantity !== void 0 ? formatNumber(item.quantity) : "-")}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600" data-v-220463ff${_scopeId}>${ssrInterpolate(item.unit || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-mono text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(formatCurrency(getReimbursementLineTotal(item)))}</td><td class="px-6 py-4 whitespace-nowrap text-center" data-v-220463ff${_scopeId}><span class="${ssrRenderClass([getReimbursementStatusColor(item.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-220463ff${_scopeId}>${ssrInterpolate(getReimbursementStatusText(item.status))}</span></td><td class="px-6 py-4 text-sm text-gray-600" data-v-220463ff${_scopeId}>${ssrInterpolate(item.notes || "-")}</td></tr>`);
              });
              _push2(`<!--]--></tbody><tfoot class="bg-orange-50" data-v-220463ff${_scopeId}><tr data-v-220463ff${_scopeId}><td class="px-6 py-3 text-sm font-semibold text-orange-800 uppercase" data-v-220463ff${_scopeId}>Total</td><td data-v-220463ff${_scopeId}></td><td data-v-220463ff${_scopeId}></td><td class="px-6 py-3 text-right text-sm font-mono font-semibold text-orange-900" data-v-220463ff${_scopeId}>${ssrInterpolate(formatCurrency(__props.salesOrder.reimbursement_items.reduce((total, item) => total + getReimbursementLineTotal(item), 0)))}</td><td colspan="2" class="px-6 py-3" data-v-220463ff${_scopeId}></td></tr></tfoot></table></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200" data-v-220463ff${_scopeId}><div class="space-y-3" data-v-220463ff${_scopeId}><div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>COMMODITY / GOODS DESCRIPTION</label><p class="text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(__props.salesOrder.commodity || "-")}</p></div><div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>QTY</label><p class="text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(__props.salesOrder.qty ? formatNumber(__props.salesOrder.qty) : "-")} `);
            if (__props.salesOrder.package_unit || __props.salesOrder.package_unit_label) {
              _push2(`<span class="text-sm text-gray-500 ml-2" data-v-220463ff${_scopeId}> (${ssrInterpolate(__props.salesOrder.package_unit_label || __props.salesOrder.package_unit)}) </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</p></div><div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>NET WEIGHT (KG)</label><p class="text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(__props.salesOrder.net_weight ? formatWeight(__props.salesOrder.net_weight) : "-")}</p></div><div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>MEAS (M3)</label><p class="text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(__props.salesOrder.measurement ? formatMeasurement(__props.salesOrder.measurement) : "-")}</p></div></div><div class="space-y-3" data-v-220463ff${_scopeId}><div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>CONTAINER NO</label>`);
            if (__props.salesOrder.container_no && Array.isArray(__props.salesOrder.container_no)) {
              _push2(`<div class="space-y-2" data-v-220463ff${_scopeId}><div class="flex flex-wrap gap-2" data-v-220463ff${_scopeId}><!--[-->`);
              ssrRenderList(__props.salesOrder.container_no, (container, index) => {
                _push2(`<span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full" data-v-220463ff${_scopeId}>${ssrInterpolate(container)}</span>`);
              });
              _push2(`<!--]--></div><p class="text-xs text-gray-500" data-v-220463ff${_scopeId}>Total: ${ssrInterpolate(__props.salesOrder.container_no.length)} container</p></div>`);
            } else if (__props.salesOrder.container_no) {
              _push2(`<div class="text-gray-900" data-v-220463ff${_scopeId}><span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full" data-v-220463ff${_scopeId}>${ssrInterpolate(__props.salesOrder.container_no)}</span></div>`);
            } else {
              _push2(`<p class="text-gray-900" data-v-220463ff${_scopeId}>-</p>`);
            }
            _push2(`</div><div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>INVOICE NUMB</label><p class="text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_number || "-")}</p></div><div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>INVOICE DATE</label><p class="text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_date ? formatDate(__props.salesOrder.invoice_date) : "-")}</p></div><div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>T.O.P</label><p class="text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(__props.salesOrder.top || "-")}</p></div></div></div></div></div></div></div><div class="space-y-6" data-v-220463ff${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" data-v-220463ff${_scopeId}><div class="px-6 py-4 border-b border-gray-200 bg-gray-50" data-v-220463ff${_scopeId}><h3 class="text-lg font-semibold text-gray-900" data-v-220463ff${_scopeId}>Status</h3></div><div class="p-6" data-v-220463ff${_scopeId}><span class="${ssrRenderClass([getStatusColor(__props.salesOrder.status), "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center"])}" data-v-220463ff${_scopeId}>${ssrInterpolate(getStatusLabel(__props.salesOrder.status || "draft"))}</span></div></div><div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" data-v-220463ff${_scopeId}><div class="px-6 py-4 border-b border-gray-200 bg-gray-50" data-v-220463ff${_scopeId}><h3 class="text-lg font-semibold text-gray-900" data-v-220463ff${_scopeId}>System Information</h3></div><div class="p-6 space-y-4" data-v-220463ff${_scopeId}><div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>Created By</label><p class="text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(((_a = __props.salesOrder.creator) == null ? void 0 : _a.name) || "Unknown")}</p></div><div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>Created At</label><p class="text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.created_at))}</p></div>`);
            if (__props.salesOrder.last_modified_at) {
              _push2(`<div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>Last Modified</label><p class="text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.last_modified_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.sent_at) {
              _push2(`<div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>Sent At</label><p class="text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.sent_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.confirmed_at) {
              _push2(`<div data-v-220463ff${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-220463ff${_scopeId}>Confirmed At</label><p class="text-gray-900" data-v-220463ff${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.confirmed_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" }, [
                            createVNode(unref(FileText), { class: "w-6 h-6 text-white" })
                          ]),
                          createVNode("div", null, [
                            createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, " Shipping Order: " + toDisplayString(__props.salesOrder.order_number), 1),
                            createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " Shipping Order details ")
                          ])
                        ]),
                        createVNode("div", { class: "mt-4 sm:mt-0 flex flex-wrap gap-3" }, [
                          __props.salesOrder.status === "released" || __props.salesOrder.status === "confirmed" || __props.salesOrder.status === "approved" ? (openBlock(), createBlock("a", {
                            key: 0,
                            href: _ctx.route("admin-cs.sales-orders.print", __props.salesOrder.id),
                            target: "_blank",
                            class: "inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition"
                          }, [
                            createVNode(unref(FileDown), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Export PDF ")
                          ], 8, ["href"])) : (openBlock(), createBlock("button", {
                            key: 1,
                            disabled: "",
                            class: "inline-flex items-center px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed",
                            title: "Shipping Order must be released before it can be printed"
                          }, [
                            createVNode(unref(FileDown), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Export PDF ")
                          ])),
                          __props.salesOrder.cs_can_edit ? (openBlock(), createBlock(unref(Link), {
                            key: 2,
                            href: _ctx.route("admin-cs.sales-orders.edit", __props.salesOrder.id),
                            class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Pencil), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Edit ")
                            ]),
                            _: 1
                          }, 8, ["href"])) : (openBlock(), createBlock("button", {
                            key: 3,
                            disabled: "",
                            class: "inline-flex items-center px-4 py-2 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed",
                            title: __props.salesOrder.is_finance_created ? "Created by finance" : "Shipping Order cannot be edited (already released)"
                          }, [
                            createVNode(unref(Pencil), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Edit ")
                          ], 8, ["title"])),
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-cs.sales-orders.index"),
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Back ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                    createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                      createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-gray-200 bg-gray-50" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Shipping Order Information")
                        ]),
                        createVNode("div", { class: "p-6" }, [
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" }, [
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "ORDER NUMB:"),
                                createVNode("span", { class: "font-semibold" }, toDisplayString(__props.salesOrder.order_number), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "REF NO:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.ref_no || "-"), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "DATE:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.so_date ? formatDate(__props.salesOrder.so_date) : "-"), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "CUSTOMER:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.customer), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "SHIPPER:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.shipper || "-"), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "BL/AWB:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.bl_awb || "-"), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "LINER:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.liner || "-"), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "VESSEL:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.vessel || "-"), 1)
                              ])
                            ]),
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "ETA:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.eta ? formatDate(__props.salesOrder.eta) : "-"), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "ETD:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.etd ? formatDate(__props.salesOrder.etd) : "-"), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "AJU:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.aju || "-"), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "SPPB DATE:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.sppb_date ? formatDate(__props.salesOrder.sppb_date) : "-"), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "SHIPMENT TYPE:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.shipment_type || "-"), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "POL/POD:"),
                                createTextVNode(" " + toDisplayString([__props.salesOrder.pol, __props.salesOrder.pod].filter(Boolean).join(" / ") || "-"), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "GUDANG/UTC:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.gudang_utc || "-"), 1)
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "PARTY/LCL:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.party_lcl || "-"), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "border-t border-gray-200 pt-6 mb-6" }, [
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "EXCHANGE RATE"),
                                createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(__props.salesOrder.exchange_rate ? formatNumber(__props.salesOrder.exchange_rate) : "-"), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "border-t border-gray-200 pt-6" }, [
                            createVNode("h4", { class: "text-md font-semibold text-gray-800 mb-4" }, "Details"),
                            createVNode("div", { class: "overflow-x-auto mb-6" }, [
                              createVNode("table", { class: "min-w-full" }, [
                                createVNode("thead", null, [
                                  createVNode("tr", { class: "bg-gray-50" }, [
                                    createVNode("th", { class: "px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide" }, "COST TYPE"),
                                    createVNode("th", { class: "px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wide" }, "BUYING"),
                                    createVNode("th", { class: "px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wide" }, "SELLING"),
                                    createVNode("th", { class: "px-6 py-4 text-center text-sm font-bold text-gray-900 uppercase tracking-wide" }, "REVENUE"),
                                    createVNode("th", { class: "px-6 py-4 text-left text-sm font-bold text-gray-900 uppercase tracking-wide" }, "REMARKS")
                                  ])
                                ]),
                                createVNode("tbody", null, [
                                  __props.salesOrder.vendor_breakdown && __props.salesOrder.vendor_breakdown.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.salesOrder.vendor_breakdown, (item, index) => {
                                    return openBlock(), createBlock("tr", {
                                      key: index,
                                      class: "hover:bg-gray-50 transition-colors"
                                    }, [
                                      createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(item.description || "Service Type"), 1),
                                      createVNode("td", { class: "px-6 py-4 text-center text-sm font-mono text-gray-900" }, toDisplayString(formatCurrency(getVendorLineTotal(item, "buying_amount"))), 1),
                                      createVNode("td", { class: "px-6 py-4 text-center text-sm font-mono text-gray-900" }, toDisplayString(formatCurrency(getVendorLineTotal(item, "selling_amount"))), 1),
                                      createVNode("td", {
                                        class: ["px-6 py-4 text-center text-sm font-mono", getVendorProfit(item) >= 0 ? "text-green-700" : "text-red-600"]
                                      }, toDisplayString(formatCurrency(getVendorProfit(item))), 3),
                                      createVNode("td", { class: "px-6 py-4 text-sm text-gray-600" }, toDisplayString(item.remarks || "-"), 1)
                                    ]);
                                  }), 128)) : (openBlock(), createBlock("tr", { key: 1 }, [
                                    createVNode("td", {
                                      colspan: "5",
                                      class: "px-6 py-12 text-center text-gray-500"
                                    }, [
                                      createVNode("div", { class: "flex flex-col items-center" }, [
                                        createVNode("div", { class: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4" }, [
                                          (openBlock(), createBlock("svg", {
                                            class: "w-8 h-8 text-gray-300",
                                            fill: "none",
                                            stroke: "currentColor",
                                            viewBox: "0 0 24 24"
                                          }, [
                                            createVNode("path", {
                                              "stroke-linecap": "round",
                                              "stroke-linejoin": "round",
                                              "stroke-width": "2",
                                              d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            })
                                          ]))
                                        ]),
                                        createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-2" }, "No breakdown data"),
                                        createVNode("p", { class: "text-sm text-gray-500 max-w-sm" }, "No vendor breakdown information yet. Data will appear after pricing information is filled.")
                                      ])
                                    ])
                                  ])),
                                  __props.salesOrder.vendor_breakdown && __props.salesOrder.vendor_breakdown.length > 0 ? (openBlock(), createBlock("tr", {
                                    key: 2,
                                    class: "bg-gray-50 border-t border-gray-200"
                                  }, [
                                    createVNode("td", { class: "px-6 py-4 text-sm font-semibold text-gray-900 uppercase" }, " TOTAL "),
                                    createVNode("td", { class: "px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900" }, toDisplayString(formatCurrency(totalBuying.value)), 1),
                                    createVNode("td", { class: "px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900" }, toDisplayString(formatCurrency(totalSelling.value)), 1),
                                    createVNode("td", {
                                      class: ["px-6 py-4 text-center text-sm font-mono font-semibold", totalRevenue.value >= 0 ? "text-green-700" : "text-red-600"]
                                    }, toDisplayString(formatCurrency(totalRevenue.value)), 3),
                                    createVNode("td", { class: "px-6 py-4 text-center text-gray-400" }, " - ")
                                  ])) : createCommentVNode("", true)
                                ])
                              ])
                            ]),
                            __props.salesOrder.note ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mb-6"
                            }, [
                              createVNode("h5", { class: "text-sm font-semibold text-gray-800 mb-3" }, "Additional Notes"),
                              createVNode("div", { class: "bg-blue-50 border border-blue-200 rounded-lg p-4" }, [
                                createVNode("p", { class: "text-gray-900 whitespace-pre-wrap" }, toDisplayString(__props.salesOrder.note), 1)
                              ])
                            ])) : createCommentVNode("", true),
                            __props.salesOrder.other_costs && __props.salesOrder.other_costs.length > 0 ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "mb-6"
                            }, [
                              createVNode("h5", { class: "text-sm font-semibold text-gray-800 mb-3" }, "Other Operating Costs"),
                              createVNode("div", { class: "bg-white border border-gray-200 rounded-lg overflow-hidden" }, [
                                createVNode("div", { class: "overflow-x-auto" }, [
                                  createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                                    createVNode("thead", { class: "bg-red-50" }, [
                                      createVNode("tr", null, [
                                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider" }, "Description"),
                                        createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-red-700 uppercase tracking-wider" }, "Amount"),
                                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider" }, "Category"),
                                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider" }, "Notes")
                                      ])
                                    ]),
                                    createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrder.other_costs, (cost, index) => {
                                        return openBlock(), createBlock("tr", {
                                          key: index,
                                          class: "hover:bg-gray-50"
                                        }, [
                                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(cost.description || "-"), 1),
                                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-mono text-gray-900" }, toDisplayString(formatCurrency(getOtherCostLineTotal(cost))), 1),
                                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-600" }, toDisplayString(cost.category || "-"), 1),
                                          createVNode("td", { class: "px-6 py-4 text-sm text-gray-600" }, toDisplayString(cost.notes || "-"), 1)
                                        ]);
                                      }), 128))
                                    ]),
                                    createVNode("tfoot", { class: "bg-red-50" }, [
                                      createVNode("tr", null, [
                                        createVNode("td", { class: "px-6 py-3 text-sm font-semibold text-red-800 uppercase" }, "Total"),
                                        createVNode("td", { class: "px-6 py-3 text-right text-sm font-mono font-semibold text-red-900" }, toDisplayString(formatCurrency(__props.salesOrder.other_costs.reduce((total, cost) => total + getOtherCostLineTotal(cost), 0))), 1),
                                        createVNode("td", {
                                          colspan: "2",
                                          class: "px-6 py-3"
                                        })
                                      ])
                                    ])
                                  ])
                                ])
                              ])
                            ])) : createCommentVNode("", true),
                            __props.salesOrder.reimbursement_items && __props.salesOrder.reimbursement_items.length > 0 ? (openBlock(), createBlock("div", {
                              key: 2,
                              class: "mb-6"
                            }, [
                              createVNode("h5", { class: "text-sm font-semibold text-gray-800 mb-3" }, "Items Reimbursement"),
                              createVNode("div", { class: "bg-white border border-gray-200 rounded-lg overflow-hidden" }, [
                                createVNode("div", { class: "overflow-x-auto" }, [
                                  createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                                    createVNode("thead", { class: "bg-orange-50" }, [
                                      createVNode("tr", null, [
                                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider" }, "Description"),
                                        createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-orange-700 uppercase tracking-wider" }, "Qty"),
                                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider" }, "Unit"),
                                        createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-orange-700 uppercase tracking-wider" }, "Amount"),
                                        createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-orange-700 uppercase tracking-wider" }, "Status"),
                                        createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-orange-700 uppercase tracking-wider" }, "Notes")
                                      ])
                                    ]),
                                    createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrder.reimbursement_items, (item, index) => {
                                        return openBlock(), createBlock("tr", {
                                          key: index,
                                          class: "hover:bg-gray-50"
                                        }, [
                                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(item.description || "-"), 1),
                                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-mono text-gray-900" }, toDisplayString(item.quantity !== "" && item.quantity !== null && item.quantity !== void 0 ? formatNumber(item.quantity) : "-"), 1),
                                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-600" }, toDisplayString(item.unit || "-"), 1),
                                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-mono text-gray-900" }, toDisplayString(formatCurrency(getReimbursementLineTotal(item))), 1),
                                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center" }, [
                                            createVNode("span", {
                                              class: ["inline-flex px-2 py-1 text-xs font-semibold rounded-full", getReimbursementStatusColor(item.status)]
                                            }, toDisplayString(getReimbursementStatusText(item.status)), 3)
                                          ]),
                                          createVNode("td", { class: "px-6 py-4 text-sm text-gray-600" }, toDisplayString(item.notes || "-"), 1)
                                        ]);
                                      }), 128))
                                    ]),
                                    createVNode("tfoot", { class: "bg-orange-50" }, [
                                      createVNode("tr", null, [
                                        createVNode("td", { class: "px-6 py-3 text-sm font-semibold text-orange-800 uppercase" }, "Total"),
                                        createVNode("td"),
                                        createVNode("td"),
                                        createVNode("td", { class: "px-6 py-3 text-right text-sm font-mono font-semibold text-orange-900" }, toDisplayString(formatCurrency(__props.salesOrder.reimbursement_items.reduce((total, item) => total + getReimbursementLineTotal(item), 0))), 1),
                                        createVNode("td", {
                                          colspan: "2",
                                          class: "px-6 py-3"
                                        })
                                      ])
                                    ])
                                  ])
                                ])
                              ])
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200" }, [
                              createVNode("div", { class: "space-y-3" }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "COMMODITY / GOODS DESCRIPTION"),
                                  createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.commodity || "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "QTY"),
                                  createVNode("p", { class: "text-gray-900" }, [
                                    createTextVNode(toDisplayString(__props.salesOrder.qty ? formatNumber(__props.salesOrder.qty) : "-") + " ", 1),
                                    __props.salesOrder.package_unit || __props.salesOrder.package_unit_label ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "text-sm text-gray-500 ml-2"
                                    }, " (" + toDisplayString(__props.salesOrder.package_unit_label || __props.salesOrder.package_unit) + ") ", 1)) : createCommentVNode("", true)
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "NET WEIGHT (KG)"),
                                  createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.net_weight ? formatWeight(__props.salesOrder.net_weight) : "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "MEAS (M3)"),
                                  createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.measurement ? formatMeasurement(__props.salesOrder.measurement) : "-"), 1)
                                ])
                              ]),
                              createVNode("div", { class: "space-y-3" }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "CONTAINER NO"),
                                  __props.salesOrder.container_no && Array.isArray(__props.salesOrder.container_no) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "space-y-2"
                                  }, [
                                    createVNode("div", { class: "flex flex-wrap gap-2" }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrder.container_no, (container, index) => {
                                        return openBlock(), createBlock("span", {
                                          key: index,
                                          class: "inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                                        }, toDisplayString(container), 1);
                                      }), 128))
                                    ]),
                                    createVNode("p", { class: "text-xs text-gray-500" }, "Total: " + toDisplayString(__props.salesOrder.container_no.length) + " container", 1)
                                  ])) : __props.salesOrder.container_no ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "text-gray-900"
                                  }, [
                                    createVNode("span", { class: "inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full" }, toDisplayString(__props.salesOrder.container_no), 1)
                                  ])) : (openBlock(), createBlock("p", {
                                    key: 2,
                                    class: "text-gray-900"
                                  }, "-"))
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "INVOICE NUMB"),
                                  createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.invoice_number || "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "INVOICE DATE"),
                                  createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.invoice_date ? formatDate(__props.salesOrder.invoice_date) : "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "T.O.P"),
                                  createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.top || "-"), 1)
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-gray-200 bg-gray-50" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Status")
                        ]),
                        createVNode("div", { class: "p-6" }, [
                          createVNode("span", {
                            class: ["inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center", getStatusColor(__props.salesOrder.status)]
                          }, toDisplayString(getStatusLabel(__props.salesOrder.status || "draft")), 3)
                        ])
                      ]),
                      createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-gray-200 bg-gray-50" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "System Information")
                        ]),
                        createVNode("div", { class: "p-6 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Created By"),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(((_b = __props.salesOrder.creator) == null ? void 0 : _b.name) || "Unknown"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Created At"),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.salesOrder.created_at)), 1)
                          ]),
                          __props.salesOrder.last_modified_at ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Last Modified"),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.salesOrder.last_modified_at)), 1)
                          ])) : createCommentVNode("", true),
                          __props.salesOrder.sent_at ? (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Sent At"),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.salesOrder.sent_at)), 1)
                          ])) : createCommentVNode("", true),
                          __props.salesOrder.confirmed_at ? (openBlock(), createBlock("div", { key: 2 }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Confirmed At"),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.salesOrder.confirmed_at)), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/SalesOrders/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-220463ff"]]);
export {
  Show as default
};
