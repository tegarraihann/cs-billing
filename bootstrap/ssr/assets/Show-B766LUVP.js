import { ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, Fragment, renderList, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BZZyudmx.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B73_Se2C.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    salesOrder: Object
  },
  setup(__props) {
    const props = __props;
    const showRejectModal = ref(false);
    const rejectionReason = ref("");
    const showVoucherRejectModal = ref(false);
    const voucherRejectionReason = ref("");
    const selectedVoucher = ref(null);
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
    const getStatusLabel = (status) => {
      const labels = {
        released: "Dirilis",
        approved: "Disetujui",
        rejected: "Ditolak"
      };
      return labels[status] || status;
    };
    const getStatusColor = (status) => {
      const colors = {
        released: "bg-purple-100 text-purple-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    const approveSalesOrder = () => {
      if (confirm("Apakah Anda yakin ingin menyetujui sales order ini?")) {
        router.post(route("admin-keuangan.sales-orders.approve", props.salesOrder.id), {}, {
          onSuccess: () => {
            router.get(route("admin-keuangan.sales-orders.show", props.salesOrder.id), {}, {
              preserveState: false,
              replace: true
            });
          },
          onError: (errors) => {
            alert("Terjadi kesalahan: " + Object.values(errors).join(", "));
          }
        });
      }
    };
    const rejectSalesOrder = () => {
      if (!rejectionReason.value.trim()) {
        alert("Alasan penolakan harus diisi");
        return;
      }
      router.post(route("admin-keuangan.sales-orders.reject", props.salesOrder.id), {
        rejection_reason: rejectionReason.value
      }, {
        onSuccess: () => {
          showRejectModal.value = false;
          rejectionReason.value = "";
          router.get(route("admin-keuangan.sales-orders.show", props.salesOrder.id), {}, {
            preserveState: false,
            replace: true
          });
        },
        onError: (errors) => {
          alert("Terjadi kesalahan: " + Object.values(errors).join(", "));
        }
      });
    };
    const getVoucherTypeColor = (type) => {
      const colors = {
        payment: "bg-blue-100 text-blue-800",
        receipt: "bg-green-100 text-green-800"
      };
      return colors[type] || "bg-gray-100 text-gray-800";
    };
    const getVoucherStatusLabel = (status) => {
      const labels = {
        draft: "Draft",
        released: "Released",
        approved: "Approved",
        rejected: "Rejected"
      };
      return labels[status] || status;
    };
    const getVoucherStatusColor = (status) => {
      const colors = {
        draft: "bg-gray-100 text-gray-800",
        released: "bg-purple-100 text-purple-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    const approveVoucher = (voucher) => {
      if (confirm(`Apakah Anda yakin ingin menyetujui voucher ${voucher.voucher_no}?`)) {
        router.post(route("admin-keuangan.sales-orders.vouchers.approve", [props.salesOrder.id, voucher.id]), {}, {
          onSuccess: () => {
            router.get(route("admin-keuangan.sales-orders.show", props.salesOrder.id), {}, {
              preserveState: false,
              replace: true
            });
          },
          onError: (errors) => {
            alert("Terjadi kesalahan: " + Object.values(errors).join(", "));
          }
        });
      }
    };
    const showVoucherRejectModalFn = (voucher) => {
      selectedVoucher.value = voucher;
      showVoucherRejectModal.value = true;
      voucherRejectionReason.value = "";
    };
    const closeVoucherRejectModal = () => {
      showVoucherRejectModal.value = false;
      selectedVoucher.value = null;
      voucherRejectionReason.value = "";
    };
    const rejectVoucher = () => {
      if (!voucherRejectionReason.value.trim()) {
        alert("Alasan penolakan harus diisi");
        return;
      }
      router.post(route("admin-keuangan.sales-orders.vouchers.reject", [props.salesOrder.id, selectedVoucher.value.id]), {
        rejection_reason: voucherRejectionReason.value
      }, {
        onSuccess: () => {
          closeVoucherRejectModal();
          router.get(route("admin-keuangan.sales-orders.show", props.salesOrder.id), {}, {
            preserveState: false,
            replace: true
          });
        },
        onError: (errors) => {
          alert("Terjadi kesalahan: " + Object.values(errors).join(", "));
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-771c291d${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200" data-v-771c291d${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-771c291d${_scopeId}><div class="flex items-center" data-v-771c291d${_scopeId}><div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4" data-v-771c291d${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-771c291d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-771c291d${_scopeId}></path></svg></div><div data-v-771c291d${_scopeId}><h2 class="text-2xl font-bold text-blue-800" data-v-771c291d${_scopeId}> Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h2><p class="text-blue-600" data-v-771c291d${_scopeId}> Review dan kelola sales order dari CS </p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-771c291d${_scopeId}>`);
            if (__props.salesOrder.status === "released") {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" data-v-771c291d${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-771c291d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-771c291d${_scopeId}></path></svg> Setujui </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.status === "released") {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-771c291d${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-771c291d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-771c291d${_scopeId}></path></svg> Tolak </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-771c291d${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-771c291d${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-771c291d${_scopeId}><div class="lg:col-span-2 space-y-6" data-v-771c291d${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-771c291d${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-771c291d${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-771c291d${_scopeId}>Informasi Sales Order</h3></div><div class="p-6 space-y-4" data-v-771c291d${_scopeId}><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>ORDER NUMB</label><p class="text-gray-900 font-semibold" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.order_number)}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>CUSTOMER</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.customer)}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>SHIPPER</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.shipper || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>BL/AWB</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.bl_awb || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>LINER</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.liner || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>VESSEL</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.vessel || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>ETA</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.eta ? formatDate(__props.salesOrder.eta) : "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>AJU</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.aju || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>SPPB DATE</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.sppb_date ? formatDate(__props.salesOrder.sppb_date) : "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>SHIPMENT TYPE</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.shipment_type || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>POL</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.pol || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>POD</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.pod || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>GUDANG/UTC</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.gudang_utc || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>PARTY/LCL</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.party_lcl || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>PREPARED BY</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.prepared_by || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>EXCHANGE RATE</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.exchange_rate || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>JENIS BIAYA</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.jenis_biaya || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>BUYING</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.buying ? formatCurrency(__props.salesOrder.buying) : "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>SELLING</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.selling ? formatCurrency(__props.salesOrder.selling) : "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>REVENUE</label><p class="text-gray-900 font-semibold text-lg" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.revenue ? formatCurrency(__props.salesOrder.revenue) : "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>REMARKS</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.remarks || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>GOODS</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.goods || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>CONTAINER NO</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.container_no || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>INVOICE NUMB</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_number || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>INVOICE DATE</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_date ? formatDate(__props.salesOrder.invoice_date) : "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>T.O.P</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.top || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>COMMODITY</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.commodity || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>QTY</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.qty || "-")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>NET WEIGHT</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(__props.salesOrder.net_weight || "-")} KG</p></div></div></div>`);
            if (__props.salesOrder.vouchers && __props.salesOrder.vouchers.length > 0) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-771c291d${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-771c291d${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-771c291d${_scopeId}>Voucher Management</h3></div><div class="p-6" data-v-771c291d${_scopeId}><!--[-->`);
              ssrRenderList(__props.salesOrder.vouchers, (voucher) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0" data-v-771c291d${_scopeId}><div class="flex justify-between items-start mb-3" data-v-771c291d${_scopeId}><div data-v-771c291d${_scopeId}><h4 class="font-semibold text-gray-900 flex items-center" data-v-771c291d${_scopeId}><span class="${ssrRenderClass([getVoucherTypeColor(voucher.type), "inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2"])}" data-v-771c291d${_scopeId}>${ssrInterpolate(voucher.type === "payment" ? "Payment" : "Receipt")}</span> ${ssrInterpolate(voucher.voucher_no)}</h4><p class="text-sm text-gray-600" data-v-771c291d${_scopeId}>${ssrInterpolate(voucher.description)}</p></div><div class="text-right" data-v-771c291d${_scopeId}><p class="font-semibold text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(formatCurrency(voucher.amount))}</p><span class="${ssrRenderClass([getVoucherStatusColor(voucher.status), "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"])}" data-v-771c291d${_scopeId}>${ssrInterpolate(getVoucherStatusLabel(voucher.status))}</span></div></div><div class="grid grid-cols-2 gap-4 text-sm" data-v-771c291d${_scopeId}><div data-v-771c291d${_scopeId}><span class="text-gray-500" data-v-771c291d${_scopeId}>Date:</span><span class="ml-1 text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(formatDate(voucher.date))}</span></div><div data-v-771c291d${_scopeId}><span class="text-gray-500" data-v-771c291d${_scopeId}>Prepared by:</span><span class="ml-1 text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(voucher.prepared_by || "-")}</span></div></div>`);
                if (voucher.status === "released") {
                  _push2(`<div class="mt-3 flex space-x-2" data-v-771c291d${_scopeId}><button class="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors" data-v-771c291d${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-771c291d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-771c291d${_scopeId}></path></svg> Approve </button><button class="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors" data-v-771c291d${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-771c291d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-771c291d${_scopeId}></path></svg> Reject </button></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-6" data-v-771c291d${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-771c291d${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-771c291d${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-771c291d${_scopeId}>Status</h3></div><div class="p-6" data-v-771c291d${_scopeId}><span class="${ssrRenderClass([getStatusColor(__props.salesOrder.status), "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center"])}" data-v-771c291d${_scopeId}>${ssrInterpolate(getStatusLabel(__props.salesOrder.status || "released"))}</span></div></div><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-771c291d${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-771c291d${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-771c291d${_scopeId}>Informasi Rilis</h3></div><div class="p-6 space-y-4" data-v-771c291d${_scopeId}><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>Dirilis Oleh</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(((_a = __props.salesOrder.released_by) == null ? void 0 : _a.name) || "Unknown")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>Tanggal Rilis</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.released_at))}</p></div></div></div><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-771c291d${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-771c291d${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-771c291d${_scopeId}>System Information</h3></div><div class="p-6 space-y-4" data-v-771c291d${_scopeId}><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>Created By</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(((_b = __props.salesOrder.creator) == null ? void 0 : _b.name) || "Unknown")}</p></div><div data-v-771c291d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-771c291d${_scopeId}>Created At</label><p class="text-gray-900" data-v-771c291d${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.created_at))}</p></div></div></div></div></div></div>`);
            if (showRejectModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-771c291d${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-771c291d${_scopeId}><h3 class="text-lg font-semibold mb-4" data-v-771c291d${_scopeId}>Tolak Sales Order</h3><p class="text-gray-600 mb-4" data-v-771c291d${_scopeId}>Berikan alasan penolakan:</p><textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" rows="4" placeholder="Masukkan alasan penolakan..." data-v-771c291d${_scopeId}>${ssrInterpolate(rejectionReason.value)}</textarea><div class="flex justify-end space-x-3 mt-4" data-v-771c291d${_scopeId}><button class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors" data-v-771c291d${_scopeId}> Batal </button><button${ssrIncludeBooleanAttr(!rejectionReason.value.trim()) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-771c291d${_scopeId}> Tolak </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showVoucherRejectModal.value && selectedVoucher.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-771c291d${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-771c291d${_scopeId}><h3 class="text-lg font-semibold mb-4" data-v-771c291d${_scopeId}>Tolak Voucher</h3><p class="text-gray-600 mb-2" data-v-771c291d${_scopeId}>Voucher: <strong data-v-771c291d${_scopeId}>${ssrInterpolate(selectedVoucher.value.voucher_no)}</strong></p><p class="text-gray-600 mb-4" data-v-771c291d${_scopeId}>Berikan alasan penolakan:</p><textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" rows="4" placeholder="Masukkan alasan penolakan voucher..." data-v-771c291d${_scopeId}>${ssrInterpolate(voucherRejectionReason.value)}</textarea><div class="flex justify-end space-x-3 mt-4" data-v-771c291d${_scopeId}><button class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors" data-v-771c291d${_scopeId}> Batal </button><button${ssrIncludeBooleanAttr(!voucherRejectionReason.value.trim()) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-771c291d${_scopeId}> Tolak Voucher </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4" }, [
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
                        createVNode("h2", { class: "text-2xl font-bold text-blue-800" }, " Sales Order: " + toDisplayString(__props.salesOrder.order_number), 1),
                        createVNode("p", { class: "text-blue-600" }, " Review dan kelola sales order dari CS ")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                      __props.salesOrder.status === "released" ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: approveSalesOrder,
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
                            d: "M5 13l4 4L19 7"
                          })
                        ])),
                        createTextVNode(" Setujui ")
                      ])) : createCommentVNode("", true),
                      __props.salesOrder.status === "released" ? (openBlock(), createBlock("button", {
                        key: 1,
                        onClick: ($event) => showRejectModal.value = true,
                        class: "inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
                            d: "M6 18L18 6M6 6l12 12"
                          })
                        ])),
                        createTextVNode(" Tolak ")
                      ], 8, ["onClick"])) : createCommentVNode("", true),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.sales-orders.index"),
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
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-blue-200 bg-blue-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-blue-800" }, "Informasi Sales Order")
                      ]),
                      createVNode("div", { class: "p-6 space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "ORDER NUMB"),
                          createVNode("p", { class: "text-gray-900 font-semibold" }, toDisplayString(__props.salesOrder.order_number), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "CUSTOMER"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.customer), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "SHIPPER"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.shipper || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "BL/AWB"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.bl_awb || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "LINER"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.liner || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "VESSEL"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.vessel || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "ETA"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.eta ? formatDate(__props.salesOrder.eta) : "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "AJU"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.aju || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "SPPB DATE"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.sppb_date ? formatDate(__props.salesOrder.sppb_date) : "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "SHIPMENT TYPE"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.shipment_type || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "POL"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.pol || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "POD"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.pod || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "GUDANG/UTC"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.gudang_utc || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "PARTY/LCL"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.party_lcl || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "PREPARED BY"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.prepared_by || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "EXCHANGE RATE"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.exchange_rate || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "JENIS BIAYA"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.jenis_biaya || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "BUYING"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.buying ? formatCurrency(__props.salesOrder.buying) : "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "SELLING"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.selling ? formatCurrency(__props.salesOrder.selling) : "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "REVENUE"),
                          createVNode("p", { class: "text-gray-900 font-semibold text-lg" }, toDisplayString(__props.salesOrder.revenue ? formatCurrency(__props.salesOrder.revenue) : "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "REMARKS"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.remarks || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "GOODS"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.goods || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "CONTAINER NO"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.container_no || "-"), 1)
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
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "COMMODITY"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.commodity || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "QTY"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.qty || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "NET WEIGHT"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.net_weight || "-") + " KG", 1)
                        ])
                      ])
                    ]),
                    __props.salesOrder.vouchers && __props.salesOrder.vouchers.length > 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden"
                    }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-blue-200 bg-blue-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-blue-800" }, "Voucher Management")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrder.vouchers, (voucher) => {
                          return openBlock(), createBlock("div", {
                            key: voucher.id,
                            class: "border border-gray-200 rounded-lg p-4 mb-4 last:mb-0"
                          }, [
                            createVNode("div", { class: "flex justify-between items-start mb-3" }, [
                              createVNode("div", null, [
                                createVNode("h4", { class: "font-semibold text-gray-900 flex items-center" }, [
                                  createVNode("span", {
                                    class: ["inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2", getVoucherTypeColor(voucher.type)]
                                  }, toDisplayString(voucher.type === "payment" ? "Payment" : "Receipt"), 3),
                                  createTextVNode(" " + toDisplayString(voucher.voucher_no), 1)
                                ]),
                                createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(voucher.description), 1)
                              ]),
                              createVNode("div", { class: "text-right" }, [
                                createVNode("p", { class: "font-semibold text-gray-900" }, toDisplayString(formatCurrency(voucher.amount)), 1),
                                createVNode("span", {
                                  class: ["inline-flex items-center px-2 py-1 rounded-full text-xs font-medium", getVoucherStatusColor(voucher.status)]
                                }, toDisplayString(getVoucherStatusLabel(voucher.status)), 3)
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm" }, [
                              createVNode("div", null, [
                                createVNode("span", { class: "text-gray-500" }, "Date:"),
                                createVNode("span", { class: "ml-1 text-gray-900" }, toDisplayString(formatDate(voucher.date)), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("span", { class: "text-gray-500" }, "Prepared by:"),
                                createVNode("span", { class: "ml-1 text-gray-900" }, toDisplayString(voucher.prepared_by || "-"), 1)
                              ])
                            ]),
                            voucher.status === "released" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-3 flex space-x-2"
                            }, [
                              createVNode("button", {
                                onClick: ($event) => approveVoucher(voucher),
                                class: "inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "w-3 h-3 mr-1",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M5 13l4 4L19 7"
                                  })
                                ])),
                                createTextVNode(" Approve ")
                              ], 8, ["onClick"]),
                              createVNode("button", {
                                onClick: ($event) => showVoucherRejectModalFn(voucher),
                                class: "inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "w-3 h-3 mr-1",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M6 18L18 6M6 6l12 12"
                                  })
                                ])),
                                createTextVNode(" Reject ")
                              ], 8, ["onClick"])
                            ])) : createCommentVNode("", true)
                          ]);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-blue-200 bg-blue-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-blue-800" }, "Status")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("span", {
                          class: ["inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center", getStatusColor(__props.salesOrder.status)]
                        }, toDisplayString(getStatusLabel(__props.salesOrder.status || "released")), 3)
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-blue-200 bg-blue-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-blue-800" }, "Informasi Rilis")
                      ]),
                      createVNode("div", { class: "p-6 space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Dirilis Oleh"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(((_c = __props.salesOrder.released_by) == null ? void 0 : _c.name) || "Unknown"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Tanggal Rilis"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.salesOrder.released_at)), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-blue-200 bg-blue-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-blue-800" }, "System Information")
                      ]),
                      createVNode("div", { class: "p-6 space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Created By"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(((_d = __props.salesOrder.creator) == null ? void 0 : _d.name) || "Unknown"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Created At"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.salesOrder.created_at)), 1)
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              showRejectModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold mb-4" }, "Tolak Sales Order"),
                  createVNode("p", { class: "text-gray-600 mb-4" }, "Berikan alasan penolakan:"),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => rejectionReason.value = $event,
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent",
                    rows: "4",
                    placeholder: "Masukkan alasan penolakan..."
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, rejectionReason.value]
                  ]),
                  createVNode("div", { class: "flex justify-end space-x-3 mt-4" }, [
                    createVNode("button", {
                      onClick: ($event) => showRejectModal.value = false,
                      class: "px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                    }, " Batal ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: rejectSalesOrder,
                      disabled: !rejectionReason.value.trim(),
                      class: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    }, " Tolak ", 8, ["disabled"])
                  ])
                ])
              ])) : createCommentVNode("", true),
              showVoucherRejectModal.value && selectedVoucher.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold mb-4" }, "Tolak Voucher"),
                  createVNode("p", { class: "text-gray-600 mb-2" }, [
                    createTextVNode("Voucher: "),
                    createVNode("strong", null, toDisplayString(selectedVoucher.value.voucher_no), 1)
                  ]),
                  createVNode("p", { class: "text-gray-600 mb-4" }, "Berikan alasan penolakan:"),
                  withDirectives(createVNode("textarea", {
                    "onUpdate:modelValue": ($event) => voucherRejectionReason.value = $event,
                    class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent",
                    rows: "4",
                    placeholder: "Masukkan alasan penolakan voucher..."
                  }, null, 8, ["onUpdate:modelValue"]), [
                    [vModelText, voucherRejectionReason.value]
                  ]),
                  createVNode("div", { class: "flex justify-end space-x-3 mt-4" }, [
                    createVNode("button", {
                      onClick: closeVoucherRejectModal,
                      class: "px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
                    }, " Batal "),
                    createVNode("button", {
                      onClick: rejectVoucher,
                      disabled: !voucherRejectionReason.value.trim(),
                      class: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    }, " Tolak Voucher ", 8, ["disabled"])
                  ])
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/SalesOrders/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-771c291d"]]);
export {
  Show as default
};
