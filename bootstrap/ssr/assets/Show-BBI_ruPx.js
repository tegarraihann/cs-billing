import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-5dkykGfh.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B-2d_OMK.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    salesOrder: Object,
    paymentVouchers: Array,
    receiptVouchers: Array
  },
  setup(__props) {
    const props = __props;
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID");
    };
    const formatDateTime = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleString("id-ID");
    };
    const formatCurrency = (amount, currency = "IDR") => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
        minimumFractionDigits: 0
      }).format(amount);
    };
    const totalBuying = computed(() => {
      if (!props.salesOrder.buying_breakdown) return 0;
      return props.salesOrder.buying_breakdown.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    });
    const totalSelling = computed(() => {
      if (!props.salesOrder.selling_breakdown) return 0;
      return props.salesOrder.selling_breakdown.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    });
    const totalRevenue = computed(() => {
      return totalSelling.value - totalBuying.value;
    });
    const formatWeight = (weight) => {
      return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(weight) + " kg";
    };
    const getStatusLabel = (status) => {
      const labels = {
        draft: "Draft",
        sent: "Terkirim",
        confirmed: "Dikonfirmasi",
        cancelled: "Dibatalkan",
        released: "Dirilis",
        approved: "Disetujui",
        rejected: "Ditolak"
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
    const getVoucherStatusLabel = (status) => {
      const labels = {
        draft: "Draft",
        released: "Released",
        approved: "Approved"
      };
      return labels[status] || status;
    };
    const getVoucherStatusColor = (status) => {
      const colors = {
        draft: "bg-yellow-100 text-yellow-800",
        released: "bg-blue-100 text-blue-800",
        approved: "bg-green-100 text-green-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    const vendorsList = computed(() => {
      if (!props.salesOrder.vendors) return [];
      if (Array.isArray(props.salesOrder.vendors)) {
        return props.salesOrder.vendors;
      }
      if (typeof props.salesOrder.vendors === "object" && !Array.isArray(props.salesOrder.vendors)) {
        return [props.salesOrder.vendors];
      }
      return [];
    });
    const totalVendorCostsList = computed(() => {
      return vendorsList.value.reduce((sum, vendor) => sum + (parseFloat(vendor.nominal) || 0), 0);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-4b9d8bf4${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-4b9d8bf4${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-4b9d8bf4${_scopeId}><div class="flex items-center" data-v-4b9d8bf4${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-4b9d8bf4${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d8bf4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-4b9d8bf4${_scopeId}></path></svg></div><div data-v-4b9d8bf4${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-4b9d8bf4${_scopeId}> Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h2><p class="text-sage-600" data-v-4b9d8bf4${_scopeId}> Detail informasi sales order </p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-4b9d8bf4${_scopeId}>`);
            if (__props.salesOrder.status === "released" || __props.salesOrder.status === "confirmed" || __props.salesOrder.status === "approved") {
              _push2(`<a${ssrRenderAttr("href", _ctx.route("admin-cs.sales-orders.print", __props.salesOrder.id))} target="_blank" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" data-v-4b9d8bf4${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d8bf4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" data-v-4b9d8bf4${_scopeId}></path></svg> Print PDF </a>`);
            } else {
              _push2(`<button disabled class="inline-flex items-center px-4 py-2 bg-gray-400 text-gray-700 rounded-lg cursor-not-allowed" title="Sales order harus dirilis terlebih dahulu untuk dapat dicetak" data-v-4b9d8bf4${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d8bf4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" data-v-4b9d8bf4${_scopeId}></path></svg> Print PDF (Belum Dirilis) </button>`);
            }
            if (__props.salesOrder.status === "draft") {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-cs.sales-orders.edit", __props.salesOrder.id),
                class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d8bf4${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-4b9d8bf4${_scopeId2}></path></svg> Edit `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        })
                      ])),
                      createTextVNode(" Edit ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<button disabled class="inline-flex items-center px-4 py-2 bg-gray-400 text-gray-700 rounded-lg cursor-not-allowed" title="Sales order tidak dapat diedit (sudah dirilis)" data-v-4b9d8bf4${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d8bf4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-4b9d8bf4${_scopeId}></path></svg> Edit (Tidak Tersedia) </button>`);
            }
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d8bf4${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-4b9d8bf4${_scopeId2}></path></svg> Kembali `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 mr-2",
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
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-4b9d8bf4${_scopeId}><div class="lg:col-span-2 space-y-6" data-v-4b9d8bf4${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-4b9d8bf4${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-4b9d8bf4${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-4b9d8bf4${_scopeId}>Informasi Sales Order</h3></div><div class="p-6" data-v-4b9d8bf4${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-v-4b9d8bf4${_scopeId}><div class="space-y-3" data-v-4b9d8bf4${_scopeId}><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>ORDER NUMB:</span><span class="font-semibold" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(__props.salesOrder.order_number)}</span></p><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>CUSTOMER:</span> ${ssrInterpolate(__props.salesOrder.customer)}</p><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>SHIPPER:</span> ${ssrInterpolate(__props.salesOrder.shipper || "-")}</p><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>BL/AWB:</span> ${ssrInterpolate(__props.salesOrder.bl_awb || "-")}</p><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>LINER:</span> ${ssrInterpolate(__props.salesOrder.liner || "-")}</p><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>VESSEL:</span> ${ssrInterpolate(__props.salesOrder.vessel || "-")}</p><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>ETA:</span> ${ssrInterpolate(__props.salesOrder.eta ? formatDate(__props.salesOrder.eta) : "-")}</p></div><div class="space-y-3" data-v-4b9d8bf4${_scopeId}><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>AJU:</span> ${ssrInterpolate(__props.salesOrder.aju || "-")}</p><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>SPPB DATE:</span> ${ssrInterpolate(__props.salesOrder.sppb_date ? formatDate(__props.salesOrder.sppb_date) : "-")}</p><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>SHIPMENT TYPE:</span> ${ssrInterpolate(__props.salesOrder.shipment_type || "-")}</p><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>POL/POD:</span> ${ssrInterpolate([__props.salesOrder.pol, __props.salesOrder.pod].filter(Boolean).join(" / ") || "-")}</p><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>GUDANG/UTC:</span> ${ssrInterpolate(__props.salesOrder.gudang_utc || "-")}</p><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>PARTY/LCL:</span> ${ssrInterpolate(__props.salesOrder.party_lcl || "-")}</p><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}><span class="font-semibold text-gray-700" data-v-4b9d8bf4${_scopeId}>PREPARED BY:</span> ${ssrInterpolate(__props.salesOrder.prepared_by || "-")}</p></div></div><div class="border-t border-gray-200 pt-6" data-v-4b9d8bf4${_scopeId}><h4 class="text-md font-semibold text-gray-800 mb-4" data-v-4b9d8bf4${_scopeId}>Detail Informasi</h4><div class="overflow-x-auto" data-v-4b9d8bf4${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-4b9d8bf4${_scopeId}><tbody class="bg-white divide-y divide-gray-200" data-v-4b9d8bf4${_scopeId}><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 w-1/4" data-v-4b9d8bf4${_scopeId}>EXCHANGE RATE</td><td class="px-4 py-3 text-sm text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(__props.salesOrder.exchange_rate || "-")}</td></tr><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" data-v-4b9d8bf4${_scopeId}>JENIS BIAYA</td><td class="px-4 py-3 text-sm text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(__props.salesOrder.jenis_biaya || "-")}</td></tr><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" data-v-4b9d8bf4${_scopeId}>BUYING BREAKDOWN</td><td class="px-4 py-3" data-v-4b9d8bf4${_scopeId}>`);
            if (__props.salesOrder.buying_breakdown && __props.salesOrder.buying_breakdown.length) {
              _push2(`<div class="space-y-2" data-v-4b9d8bf4${_scopeId}><!--[-->`);
              ssrRenderList(__props.salesOrder.buying_breakdown, (item, index) => {
                _push2(`<div class="flex justify-between items-center p-2 bg-gray-50 rounded" data-v-4b9d8bf4${_scopeId}><span class="text-sm text-gray-700" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(item.vendor || "Unknown Vendor")}</span><span class="text-sm font-medium text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatCurrency(item.amount || 0))}</span></div>`);
              });
              _push2(`<!--]--><div class="border-t pt-2 mt-2" data-v-4b9d8bf4${_scopeId}><div class="flex justify-between items-center font-semibold" data-v-4b9d8bf4${_scopeId}><span class="text-sm text-gray-700" data-v-4b9d8bf4${_scopeId}>Total Buying:</span><span class="text-sm text-blue-600" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</span></div></div></div>`);
            } else {
              _push2(`<div class="text-sm text-gray-500" data-v-4b9d8bf4${_scopeId}>-</div>`);
            }
            _push2(`</td></tr><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" data-v-4b9d8bf4${_scopeId}>SELLING BREAKDOWN</td><td class="px-4 py-3" data-v-4b9d8bf4${_scopeId}>`);
            if (__props.salesOrder.selling_breakdown && __props.salesOrder.selling_breakdown.length) {
              _push2(`<div class="space-y-2" data-v-4b9d8bf4${_scopeId}><!--[-->`);
              ssrRenderList(__props.salesOrder.selling_breakdown, (item, index) => {
                _push2(`<div class="flex justify-between items-center p-2 bg-gray-50 rounded" data-v-4b9d8bf4${_scopeId}><span class="text-sm text-gray-700" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(item.description || "Unknown Service")}</span><span class="text-sm font-medium text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatCurrency(item.amount || 0))}</span></div>`);
              });
              _push2(`<!--]--><div class="border-t pt-2 mt-2" data-v-4b9d8bf4${_scopeId}><div class="flex justify-between items-center font-semibold" data-v-4b9d8bf4${_scopeId}><span class="text-sm text-gray-700" data-v-4b9d8bf4${_scopeId}>Total Selling:</span><span class="text-sm text-green-600" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</span></div></div></div>`);
            } else {
              _push2(`<div class="text-sm text-gray-500" data-v-4b9d8bf4${_scopeId}>-</div>`);
            }
            _push2(`</td></tr><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" data-v-4b9d8bf4${_scopeId}>REVENUE (PROFIT)</td><td class="px-4 py-3" data-v-4b9d8bf4${_scopeId}><div class="flex items-center space-x-2" data-v-4b9d8bf4${_scopeId}><span class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-green-600" : "text-red-600", "text-lg font-bold"])}" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</span><span class="text-xs text-gray-500" data-v-4b9d8bf4${_scopeId}>(Auto Calculated)</span></div></td></tr><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" data-v-4b9d8bf4${_scopeId}>REMARKS</td><td class="px-4 py-3 text-sm text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(__props.salesOrder.remarks || "-")}</td></tr><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" data-v-4b9d8bf4${_scopeId}>COMMODITY/URAIAN BARANG</td><td class="px-4 py-3 text-sm text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(__props.salesOrder.commodity || "-")}</td></tr><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" data-v-4b9d8bf4${_scopeId}>QTY</td><td class="px-4 py-3 text-sm text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(__props.salesOrder.qty || "-")}</td></tr><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" data-v-4b9d8bf4${_scopeId}>NET WEIGHT (KG)</td><td class="px-4 py-3 text-sm text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(__props.salesOrder.net_weight ? formatWeight(__props.salesOrder.net_weight) : "-")}</td></tr><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" data-v-4b9d8bf4${_scopeId}>CONTAINER NO</td><td class="px-4 py-3 text-sm text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(__props.salesOrder.container_no || "-")}</td></tr><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" data-v-4b9d8bf4${_scopeId}>INVOICE NUMB</td><td class="px-4 py-3 text-sm text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_number || "-")}</td></tr><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" data-v-4b9d8bf4${_scopeId}>INVOICE DATE</td><td class="px-4 py-3 text-sm text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_date ? formatDate(__props.salesOrder.invoice_date) : "-")}</td></tr><tr data-v-4b9d8bf4${_scopeId}><td class="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" data-v-4b9d8bf4${_scopeId}>T.O.P</td><td class="px-4 py-3 text-sm text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(__props.salesOrder.top || "-")}</td></tr></tbody></table></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-4b9d8bf4${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-4b9d8bf4${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-4b9d8bf4${_scopeId}>Voucher Information</h3></div><div class="p-6 space-y-6" data-v-4b9d8bf4${_scopeId}>`);
            if (__props.paymentVouchers && __props.paymentVouchers.length > 0) {
              _push2(`<div class="space-y-4" data-v-4b9d8bf4${_scopeId}><h4 class="text-md font-semibold text-sage-700 border-b border-gray-200 pb-2" data-v-4b9d8bf4${_scopeId}>Payment Vouchers</h4><div class="grid grid-cols-1 gap-4" data-v-4b9d8bf4${_scopeId}><!--[-->`);
              ssrRenderList(__props.paymentVouchers, (voucher) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-4 space-y-3" data-v-4b9d8bf4${_scopeId}><div class="flex justify-between items-start" data-v-4b9d8bf4${_scopeId}><div data-v-4b9d8bf4${_scopeId}><h5 class="font-medium text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(voucher.voucher_no)}</h5><span class="${ssrRenderClass([getVoucherStatusColor(voucher.status), "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"])}" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(getVoucherStatusLabel(voucher.status))}</span></div><div class="text-right" data-v-4b9d8bf4${_scopeId}><p class="text-lg font-semibold text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatCurrency(voucher.amount))}</p><p class="text-sm text-gray-500" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatDate(voucher.date))}</p></div></div><div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-4b9d8bf4${_scopeId}>Description</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(voucher.description)}</p></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" data-v-4b9d8bf4${_scopeId}>`);
                if (voucher.prepared_by) {
                  _push2(`<div data-v-4b9d8bf4${_scopeId}><label class="block font-medium text-gray-700" data-v-4b9d8bf4${_scopeId}>Prepared By</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(voucher.prepared_by)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (voucher.authorized_by) {
                  _push2(`<div data-v-4b9d8bf4${_scopeId}><label class="block font-medium text-gray-700" data-v-4b9d8bf4${_scopeId}>Authorized By</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(voucher.authorized_by)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (voucher.finance_by) {
                  _push2(`<div data-v-4b9d8bf4${_scopeId}><label class="block font-medium text-gray-700" data-v-4b9d8bf4${_scopeId}>Finance By</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(voucher.finance_by)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (voucher.receipt_by) {
                  _push2(`<div data-v-4b9d8bf4${_scopeId}><label class="block font-medium text-gray-700" data-v-4b9d8bf4${_scopeId}>Receipt By</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(voucher.receipt_by)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.receiptVouchers && __props.receiptVouchers.length > 0) {
              _push2(`<div class="space-y-4" data-v-4b9d8bf4${_scopeId}><h4 class="text-md font-semibold text-sage-700 border-b border-gray-200 pb-2" data-v-4b9d8bf4${_scopeId}>Receipt Vouchers</h4><div class="grid grid-cols-1 gap-4" data-v-4b9d8bf4${_scopeId}><!--[-->`);
              ssrRenderList(__props.receiptVouchers, (voucher) => {
                _push2(`<div class="border border-green-200 rounded-lg p-4 space-y-3 bg-green-50" data-v-4b9d8bf4${_scopeId}><div class="flex justify-between items-start" data-v-4b9d8bf4${_scopeId}><div data-v-4b9d8bf4${_scopeId}><h5 class="font-medium text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(voucher.voucher_no)}</h5><span class="${ssrRenderClass([getVoucherStatusColor(voucher.status), "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1"])}" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(getVoucherStatusLabel(voucher.status))}</span></div><div class="text-right" data-v-4b9d8bf4${_scopeId}><p class="text-lg font-semibold text-green-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatCurrency(voucher.amount))}</p><p class="text-sm text-gray-500" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatDate(voucher.date))}</p></div></div><div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-4b9d8bf4${_scopeId}>Description</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(voucher.description)}</p></div><div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" data-v-4b9d8bf4${_scopeId}>`);
                if (voucher.prepared_by) {
                  _push2(`<div data-v-4b9d8bf4${_scopeId}><label class="block font-medium text-gray-700" data-v-4b9d8bf4${_scopeId}>Prepared By</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(voucher.prepared_by)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (voucher.authorized_by) {
                  _push2(`<div data-v-4b9d8bf4${_scopeId}><label class="block font-medium text-gray-700" data-v-4b9d8bf4${_scopeId}>Authorized By</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(voucher.authorized_by)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (voucher.finance_by) {
                  _push2(`<div data-v-4b9d8bf4${_scopeId}><label class="block font-medium text-gray-700" data-v-4b9d8bf4${_scopeId}>Finance By</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(voucher.finance_by)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (voucher.receipt_by) {
                  _push2(`<div data-v-4b9d8bf4${_scopeId}><label class="block font-medium text-gray-700" data-v-4b9d8bf4${_scopeId}>Receipt By</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(voucher.receipt_by)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((!__props.paymentVouchers || __props.paymentVouchers.length === 0) && (!__props.receiptVouchers || __props.receiptVouchers.length === 0)) {
              _push2(`<div class="text-center py-8" data-v-4b9d8bf4${_scopeId}><div class="text-gray-400 mb-2" data-v-4b9d8bf4${_scopeId}><svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d8bf4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-4b9d8bf4${_scopeId}></path></svg></div><p class="text-gray-500" data-v-4b9d8bf4${_scopeId}>No vouchers created for this sales order</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-4b9d8bf4${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-4b9d8bf4${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-4b9d8bf4${_scopeId}>Vendor Information (Buying)</h3></div><div class="p-6" data-v-4b9d8bf4${_scopeId}>`);
            if (vendorsList.value && vendorsList.value.length > 0) {
              _push2(`<div class="space-y-4" data-v-4b9d8bf4${_scopeId}><!--[-->`);
              ssrRenderList(vendorsList.value, (vendor, index) => {
                _push2(`<div class="border border-sage-200 rounded-lg p-4 bg-sage-50" data-v-4b9d8bf4${_scopeId}><div class="flex items-center justify-between mb-4" data-v-4b9d8bf4${_scopeId}><h4 class="font-medium text-sage-800" data-v-4b9d8bf4${_scopeId}>Vendor #${ssrInterpolate(index + 1)}</h4>`);
                if (vendor.nominal) {
                  _push2(`<span class="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatCurrency(vendor.nominal))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-4b9d8bf4${_scopeId}><div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-4b9d8bf4${_scopeId}> Vendor Name </label><p class="text-gray-900 bg-white p-2 rounded border border-sage-200" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(vendor.company_name || vendor.nama_vendor || "-")}</p></div><div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-4b9d8bf4${_scopeId}> Deskripsi Service </label><p class="text-gray-900 bg-white p-2 rounded border border-sage-200" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(vendor.deskripsi || "-")}</p></div><div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-4b9d8bf4${_scopeId}> No Rekening </label><p class="text-gray-900 font-mono bg-white p-2 rounded border border-sage-200" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(vendor.no_rekening || "-")}</p></div><div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-4b9d8bf4${_scopeId}> Nama Rekening </label><p class="text-gray-900 bg-white p-2 rounded border border-sage-200" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(vendor.nama_rekening || "-")}</p></div><div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-4b9d8bf4${_scopeId}> Nominal </label><p class="text-gray-900 font-semibold bg-white p-2 rounded border border-sage-200" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(vendor.nominal ? formatCurrency(vendor.nominal) : "-")}</p></div><div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-4b9d8bf4${_scopeId}> RCVD INV </label><p class="text-gray-900 bg-white p-2 rounded border border-sage-200" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(vendor.rcvd_inv || "-")}</p></div></div></div>`);
              });
              _push2(`<!--]--><div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg" data-v-4b9d8bf4${_scopeId}><div class="flex justify-between items-center" data-v-4b9d8bf4${_scopeId}><span class="font-medium text-blue-700" data-v-4b9d8bf4${_scopeId}>Total Vendor Costs:</span><span class="text-xl font-bold text-blue-800" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatCurrency(totalVendorCostsList.value))}</span></div></div></div>`);
            } else {
              _push2(`<div class="text-center py-8" data-v-4b9d8bf4${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d8bf4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-4b9d8bf4${_scopeId}></path></svg><p class="text-lg font-medium text-gray-900 mb-2" data-v-4b9d8bf4${_scopeId}>Tidak ada data vendor</p><p class="text-sm text-gray-400" data-v-4b9d8bf4${_scopeId}> Belum ada vendor yang terdaftar untuk sales order ini </p></div>`);
            }
            _push2(`</div></div></div><div class="space-y-6" data-v-4b9d8bf4${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-4b9d8bf4${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-4b9d8bf4${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-4b9d8bf4${_scopeId}>Status</h3></div><div class="p-6" data-v-4b9d8bf4${_scopeId}><span class="${ssrRenderClass([getStatusColor(__props.salesOrder.status), "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center"])}" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(getStatusLabel(__props.salesOrder.status || "draft"))}</span></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-4b9d8bf4${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-4b9d8bf4${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-4b9d8bf4${_scopeId}>System Information</h3></div><div class="p-6 space-y-4" data-v-4b9d8bf4${_scopeId}><div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-4b9d8bf4${_scopeId}>Created By</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(((_a = __props.salesOrder.creator) == null ? void 0 : _a.name) || "Unknown")}</p></div><div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-4b9d8bf4${_scopeId}>Created At</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.created_at))}</p></div>`);
            if (__props.salesOrder.last_modified_at) {
              _push2(`<div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-4b9d8bf4${_scopeId}>Last Modified</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.last_modified_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.sent_at) {
              _push2(`<div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-4b9d8bf4${_scopeId}>Sent At</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.sent_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.confirmed_at) {
              _push2(`<div data-v-4b9d8bf4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-4b9d8bf4${_scopeId}>Confirmed At</label><p class="text-gray-900" data-v-4b9d8bf4${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.confirmed_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.salesOrder.customer_id) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-4b9d8bf4${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-4b9d8bf4${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-4b9d8bf4${_scopeId}>Related Customer</h3></div><div class="p-6" data-v-4b9d8bf4${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-cs.customers.show", __props.salesOrder.customer_id),
                class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors w-full justify-center"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4b9d8bf4${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-4b9d8bf4${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-4b9d8bf4${_scopeId2}></path></svg> Lihat Data Customer `);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4 mr-2",
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
                      ])),
                      createTextVNode(" Lihat Data Customer ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-white",
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
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, " Sales Order: " + toDisplayString(__props.salesOrder.order_number), 1),
                        createVNode("p", { class: "text-sage-600" }, " Detail informasi sales order ")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                      __props.salesOrder.status === "released" || __props.salesOrder.status === "confirmed" || __props.salesOrder.status === "approved" ? (openBlock(), createBlock("a", {
                        key: 0,
                        href: _ctx.route("admin-cs.sales-orders.print", __props.salesOrder.id),
                        target: "_blank",
                        class: "inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 mr-2",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                          })
                        ])),
                        createTextVNode(" Print PDF ")
                      ], 8, ["href"])) : (openBlock(), createBlock("button", {
                        key: 1,
                        disabled: "",
                        class: "inline-flex items-center px-4 py-2 bg-gray-400 text-gray-700 rounded-lg cursor-not-allowed",
                        title: "Sales order harus dirilis terlebih dahulu untuk dapat dicetak"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 mr-2",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                          })
                        ])),
                        createTextVNode(" Print PDF (Belum Dirilis) ")
                      ])),
                      __props.salesOrder.status === "draft" ? (openBlock(), createBlock(unref(Link), {
                        key: 2,
                        href: _ctx.route("admin-cs.sales-orders.edit", __props.salesOrder.id),
                        class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 mr-2",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            })
                          ])),
                          createTextVNode(" Edit ")
                        ]),
                        _: 1
                      }, 8, ["href"])) : (openBlock(), createBlock("button", {
                        key: 3,
                        disabled: "",
                        class: "inline-flex items-center px-4 py-2 bg-gray-400 text-gray-700 rounded-lg cursor-not-allowed",
                        title: "Sales order tidak dapat diedit (sudah dirilis)"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 mr-2",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          })
                        ])),
                        createTextVNode(" Edit (Tidak Tersedia) ")
                      ])),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.sales-orders.index"),
                        class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 mr-2",
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
                          createTextVNode(" Kembali ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Sales Order")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" }, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("p", { class: "text-gray-900" }, [
                              createVNode("span", { class: "font-semibold text-gray-700" }, "ORDER NUMB:"),
                              createVNode("span", { class: "font-semibold" }, toDisplayString(__props.salesOrder.order_number), 1)
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
                            ]),
                            createVNode("p", { class: "text-gray-900" }, [
                              createVNode("span", { class: "font-semibold text-gray-700" }, "ETA:"),
                              createTextVNode(" " + toDisplayString(__props.salesOrder.eta ? formatDate(__props.salesOrder.eta) : "-"), 1)
                            ])
                          ]),
                          createVNode("div", { class: "space-y-3" }, [
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
                            ]),
                            createVNode("p", { class: "text-gray-900" }, [
                              createVNode("span", { class: "font-semibold text-gray-700" }, "PREPARED BY:"),
                              createTextVNode(" " + toDisplayString(__props.salesOrder.prepared_by || "-"), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "border-t border-gray-200 pt-6" }, [
                          createVNode("h4", { class: "text-md font-semibold text-gray-800 mb-4" }, "Detail Informasi"),
                          createVNode("div", { class: "overflow-x-auto" }, [
                            createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                              createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 w-1/4" }, "EXCHANGE RATE"),
                                  createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(__props.salesOrder.exchange_rate || "-"), 1)
                                ]),
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" }, "JENIS BIAYA"),
                                  createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(__props.salesOrder.jenis_biaya || "-"), 1)
                                ]),
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" }, "BUYING BREAKDOWN"),
                                  createVNode("td", { class: "px-4 py-3" }, [
                                    __props.salesOrder.buying_breakdown && __props.salesOrder.buying_breakdown.length ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "space-y-2"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrder.buying_breakdown, (item, index) => {
                                        return openBlock(), createBlock("div", {
                                          key: index,
                                          class: "flex justify-between items-center p-2 bg-gray-50 rounded"
                                        }, [
                                          createVNode("span", { class: "text-sm text-gray-700" }, toDisplayString(item.vendor || "Unknown Vendor"), 1),
                                          createVNode("span", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(item.amount || 0)), 1)
                                        ]);
                                      }), 128)),
                                      createVNode("div", { class: "border-t pt-2 mt-2" }, [
                                        createVNode("div", { class: "flex justify-between items-center font-semibold" }, [
                                          createVNode("span", { class: "text-sm text-gray-700" }, "Total Buying:"),
                                          createVNode("span", { class: "text-sm text-blue-600" }, toDisplayString(formatCurrency(totalBuying.value)), 1)
                                        ])
                                      ])
                                    ])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "text-sm text-gray-500"
                                    }, "-"))
                                  ])
                                ]),
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" }, "SELLING BREAKDOWN"),
                                  createVNode("td", { class: "px-4 py-3" }, [
                                    __props.salesOrder.selling_breakdown && __props.salesOrder.selling_breakdown.length ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "space-y-2"
                                    }, [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrder.selling_breakdown, (item, index) => {
                                        return openBlock(), createBlock("div", {
                                          key: index,
                                          class: "flex justify-between items-center p-2 bg-gray-50 rounded"
                                        }, [
                                          createVNode("span", { class: "text-sm text-gray-700" }, toDisplayString(item.description || "Unknown Service"), 1),
                                          createVNode("span", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(item.amount || 0)), 1)
                                        ]);
                                      }), 128)),
                                      createVNode("div", { class: "border-t pt-2 mt-2" }, [
                                        createVNode("div", { class: "flex justify-between items-center font-semibold" }, [
                                          createVNode("span", { class: "text-sm text-gray-700" }, "Total Selling:"),
                                          createVNode("span", { class: "text-sm text-green-600" }, toDisplayString(formatCurrency(totalSelling.value)), 1)
                                        ])
                                      ])
                                    ])) : (openBlock(), createBlock("div", {
                                      key: 1,
                                      class: "text-sm text-gray-500"
                                    }, "-"))
                                  ])
                                ]),
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" }, "REVENUE (PROFIT)"),
                                  createVNode("td", { class: "px-4 py-3" }, [
                                    createVNode("div", { class: "flex items-center space-x-2" }, [
                                      createVNode("span", {
                                        class: ["text-lg font-bold", totalRevenue.value >= 0 ? "text-green-600" : "text-red-600"]
                                      }, toDisplayString(formatCurrency(totalRevenue.value)), 3),
                                      createVNode("span", { class: "text-xs text-gray-500" }, "(Auto Calculated)")
                                    ])
                                  ])
                                ]),
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" }, "REMARKS"),
                                  createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(__props.salesOrder.remarks || "-"), 1)
                                ]),
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" }, "COMMODITY/URAIAN BARANG"),
                                  createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(__props.salesOrder.commodity || "-"), 1)
                                ]),
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" }, "QTY"),
                                  createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(__props.salesOrder.qty || "-"), 1)
                                ]),
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" }, "NET WEIGHT (KG)"),
                                  createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(__props.salesOrder.net_weight ? formatWeight(__props.salesOrder.net_weight) : "-"), 1)
                                ]),
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" }, "CONTAINER NO"),
                                  createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(__props.salesOrder.container_no || "-"), 1)
                                ]),
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" }, "INVOICE NUMB"),
                                  createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(__props.salesOrder.invoice_number || "-"), 1)
                                ]),
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" }, "INVOICE DATE"),
                                  createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(__props.salesOrder.invoice_date ? formatDate(__props.salesOrder.invoice_date) : "-"), 1)
                                ]),
                                createVNode("tr", null, [
                                  createVNode("td", { class: "px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50" }, "T.O.P"),
                                  createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(__props.salesOrder.top || "-"), 1)
                                ])
                              ])
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Voucher Information")
                      ]),
                      createVNode("div", { class: "p-6 space-y-6" }, [
                        __props.paymentVouchers && __props.paymentVouchers.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-4"
                        }, [
                          createVNode("h4", { class: "text-md font-semibold text-sage-700 border-b border-gray-200 pb-2" }, "Payment Vouchers"),
                          createVNode("div", { class: "grid grid-cols-1 gap-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.paymentVouchers, (voucher) => {
                              return openBlock(), createBlock("div", {
                                key: voucher.id,
                                class: "border border-gray-200 rounded-lg p-4 space-y-3"
                              }, [
                                createVNode("div", { class: "flex justify-between items-start" }, [
                                  createVNode("div", null, [
                                    createVNode("h5", { class: "font-medium text-gray-900" }, toDisplayString(voucher.voucher_no), 1),
                                    createVNode("span", {
                                      class: ["inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1", getVoucherStatusColor(voucher.status)]
                                    }, toDisplayString(getVoucherStatusLabel(voucher.status)), 3)
                                  ]),
                                  createVNode("div", { class: "text-right" }, [
                                    createVNode("p", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(formatCurrency(voucher.amount)), 1),
                                    createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(voucher.date)), 1)
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                                  createVNode("p", { class: "text-gray-900" }, toDisplayString(voucher.description), 1)
                                ]),
                                createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" }, [
                                  voucher.prepared_by ? (openBlock(), createBlock("div", { key: 0 }, [
                                    createVNode("label", { class: "block font-medium text-gray-700" }, "Prepared By"),
                                    createVNode("p", { class: "text-gray-900" }, toDisplayString(voucher.prepared_by), 1)
                                  ])) : createCommentVNode("", true),
                                  voucher.authorized_by ? (openBlock(), createBlock("div", { key: 1 }, [
                                    createVNode("label", { class: "block font-medium text-gray-700" }, "Authorized By"),
                                    createVNode("p", { class: "text-gray-900" }, toDisplayString(voucher.authorized_by), 1)
                                  ])) : createCommentVNode("", true),
                                  voucher.finance_by ? (openBlock(), createBlock("div", { key: 2 }, [
                                    createVNode("label", { class: "block font-medium text-gray-700" }, "Finance By"),
                                    createVNode("p", { class: "text-gray-900" }, toDisplayString(voucher.finance_by), 1)
                                  ])) : createCommentVNode("", true),
                                  voucher.receipt_by ? (openBlock(), createBlock("div", { key: 3 }, [
                                    createVNode("label", { class: "block font-medium text-gray-700" }, "Receipt By"),
                                    createVNode("p", { class: "text-gray-900" }, toDisplayString(voucher.receipt_by), 1)
                                  ])) : createCommentVNode("", true)
                                ])
                              ]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        __props.receiptVouchers && __props.receiptVouchers.length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "space-y-4"
                        }, [
                          createVNode("h4", { class: "text-md font-semibold text-sage-700 border-b border-gray-200 pb-2" }, "Receipt Vouchers"),
                          createVNode("div", { class: "grid grid-cols-1 gap-4" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.receiptVouchers, (voucher) => {
                              return openBlock(), createBlock("div", {
                                key: voucher.id,
                                class: "border border-green-200 rounded-lg p-4 space-y-3 bg-green-50"
                              }, [
                                createVNode("div", { class: "flex justify-between items-start" }, [
                                  createVNode("div", null, [
                                    createVNode("h5", { class: "font-medium text-gray-900" }, toDisplayString(voucher.voucher_no), 1),
                                    createVNode("span", {
                                      class: ["inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1", getVoucherStatusColor(voucher.status)]
                                    }, toDisplayString(getVoucherStatusLabel(voucher.status)), 3)
                                  ]),
                                  createVNode("div", { class: "text-right" }, [
                                    createVNode("p", { class: "text-lg font-semibold text-green-900" }, toDisplayString(formatCurrency(voucher.amount)), 1),
                                    createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(voucher.date)), 1)
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                                  createVNode("p", { class: "text-gray-900" }, toDisplayString(voucher.description), 1)
                                ]),
                                createVNode("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm" }, [
                                  voucher.prepared_by ? (openBlock(), createBlock("div", { key: 0 }, [
                                    createVNode("label", { class: "block font-medium text-gray-700" }, "Prepared By"),
                                    createVNode("p", { class: "text-gray-900" }, toDisplayString(voucher.prepared_by), 1)
                                  ])) : createCommentVNode("", true),
                                  voucher.authorized_by ? (openBlock(), createBlock("div", { key: 1 }, [
                                    createVNode("label", { class: "block font-medium text-gray-700" }, "Authorized By"),
                                    createVNode("p", { class: "text-gray-900" }, toDisplayString(voucher.authorized_by), 1)
                                  ])) : createCommentVNode("", true),
                                  voucher.finance_by ? (openBlock(), createBlock("div", { key: 2 }, [
                                    createVNode("label", { class: "block font-medium text-gray-700" }, "Finance By"),
                                    createVNode("p", { class: "text-gray-900" }, toDisplayString(voucher.finance_by), 1)
                                  ])) : createCommentVNode("", true),
                                  voucher.receipt_by ? (openBlock(), createBlock("div", { key: 3 }, [
                                    createVNode("label", { class: "block font-medium text-gray-700" }, "Receipt By"),
                                    createVNode("p", { class: "text-gray-900" }, toDisplayString(voucher.receipt_by), 1)
                                  ])) : createCommentVNode("", true)
                                ])
                              ]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        (!__props.paymentVouchers || __props.paymentVouchers.length === 0) && (!__props.receiptVouchers || __props.receiptVouchers.length === 0) ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "text-center py-8"
                        }, [
                          createVNode("div", { class: "text-gray-400 mb-2" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-12 h-12 mx-auto",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "1",
                                d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              })
                            ]))
                          ]),
                          createVNode("p", { class: "text-gray-500" }, "No vouchers created for this sales order")
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Vendor Information (Buying)")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        vendorsList.value && vendorsList.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "space-y-4"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(vendorsList.value, (vendor, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "border border-sage-200 rounded-lg p-4 bg-sage-50"
                            }, [
                              createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                                createVNode("h4", { class: "font-medium text-sage-800" }, "Vendor #" + toDisplayString(index + 1), 1),
                                vendor.nominal ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium"
                                }, toDisplayString(formatCurrency(vendor.nominal)), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Vendor Name "),
                                  createVNode("p", { class: "text-gray-900 bg-white p-2 rounded border border-sage-200" }, toDisplayString(vendor.company_name || vendor.nama_vendor || "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Deskripsi Service "),
                                  createVNode("p", { class: "text-gray-900 bg-white p-2 rounded border border-sage-200" }, toDisplayString(vendor.deskripsi || "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " No Rekening "),
                                  createVNode("p", { class: "text-gray-900 font-mono bg-white p-2 rounded border border-sage-200" }, toDisplayString(vendor.no_rekening || "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nama Rekening "),
                                  createVNode("p", { class: "text-gray-900 bg-white p-2 rounded border border-sage-200" }, toDisplayString(vendor.nama_rekening || "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nominal "),
                                  createVNode("p", { class: "text-gray-900 font-semibold bg-white p-2 rounded border border-sage-200" }, toDisplayString(vendor.nominal ? formatCurrency(vendor.nominal) : "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " RCVD INV "),
                                  createVNode("p", { class: "text-gray-900 bg-white p-2 rounded border border-sage-200" }, toDisplayString(vendor.rcvd_inv || "-"), 1)
                                ])
                              ])
                            ]);
                          }), 128)),
                          createVNode("div", { class: "mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg" }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("span", { class: "font-medium text-blue-700" }, "Total Vendor Costs:"),
                              createVNode("span", { class: "text-xl font-bold text-blue-800" }, toDisplayString(formatCurrency(totalVendorCostsList.value)), 1)
                            ])
                          ])
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "text-center py-8"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-12 h-12 text-gray-300 mb-4 mx-auto",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            })
                          ])),
                          createVNode("p", { class: "text-lg font-medium text-gray-900 mb-2" }, "Tidak ada data vendor"),
                          createVNode("p", { class: "text-sm text-gray-400" }, " Belum ada vendor yang terdaftar untuk sales order ini ")
                        ]))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Status")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("span", {
                          class: ["inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center", getStatusColor(__props.salesOrder.status)]
                        }, toDisplayString(getStatusLabel(__props.salesOrder.status || "draft")), 3)
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "System Information")
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
                    ]),
                    __props.salesOrder.customer_id ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
                    }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Related Customer")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-cs.customers.show", __props.salesOrder.customer_id),
                          class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors w-full justify-center"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4 mr-2",
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
                            ])),
                            createTextVNode(" Lihat Data Customer ")
                          ]),
                          _: 1
                        }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/SalesOrders/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4b9d8bf4"]]);
export {
  Show as default
};
