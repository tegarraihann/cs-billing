import { ref, computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, Fragment, renderList, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-B9DgXThx.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-DiVH08Np.js";
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
    const showApprovalModal = ref(false);
    const debugInfo = ref(false);
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
    const showApprovalDialog = () => {
      router.get(route("admin-keuangan.sales-orders.show", props.salesOrder.id), {}, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          if (props.salesOrder.status !== "released") {
            debugInfo.value = true;
            showApprovalModal.value = true;
            return;
          }
          debugInfo.value = false;
          showApprovalModal.value = true;
        },
        onError: () => {
          alert("Gagal memuat data terbaru. Silakan refresh halaman.");
        }
      });
    };
    const closeApprovalDialog = () => {
      showApprovalModal.value = false;
      debugInfo.value = false;
    };
    const approveSalesOrder = () => {
      router.post(route("admin-keuangan.sales-orders.approve", props.salesOrder.id), {}, {
        onSuccess: (response) => {
          showApprovalModal.value = false;
          debugInfo.value = false;
          router.get(route("admin-keuangan.sales-orders.show", props.salesOrder.id), {}, {
            preserveState: false,
            replace: true
          });
        },
        onError: (errors) => {
          var _a;
          let errorMessage = "Terjadi kesalahan saat menyetujui sales order:\n\n";
          if (errors.error) {
            errorMessage += `Error: ${errors.error}
`;
          }
          errorMessage += `
Informasi Debug:`;
          errorMessage += `
- Status saat ini: ${props.salesOrder.status}`;
          errorMessage += `
- Tanggal rilis: ${props.salesOrder.released_at || "Tidak ada"}`;
          errorMessage += `
- Dirilis oleh: ${((_a = props.salesOrder.released_by) == null ? void 0 : _a.name) || "Tidak ada"}`;
          if (props.salesOrder.status !== "released") {
            errorMessage += `

Saran: Pastikan CS sudah merilis sales order ini terlebih dahulu.`;
          }
          alert(errorMessage);
          debugInfo.value = true;
        }
      });
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
    const forceRefresh = () => {
      router.post(route("admin-keuangan.sales-orders.force-refresh", props.salesOrder.id), {}, {
        onSuccess: () => {
          router.get(route("admin-keuangan.sales-orders.show", props.salesOrder.id), {}, {
            preserveState: false,
            replace: true
          });
        },
        onError: (errors) => {
          console.error("Force refresh failed:", errors);
          alert("Gagal melakukan refresh. Silakan coba lagi.");
        }
      });
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
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-b9b766ea${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200" data-v-b9b766ea${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-b9b766ea${_scopeId}><div class="flex items-center" data-v-b9b766ea${_scopeId}><div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4" data-v-b9b766ea${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b9b766ea${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-b9b766ea${_scopeId}></path></svg></div><div data-v-b9b766ea${_scopeId}><h2 class="text-2xl font-bold text-blue-800" data-v-b9b766ea${_scopeId}> Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h2><p class="text-blue-600" data-v-b9b766ea${_scopeId}> Review dan kelola sales order dari CS </p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-b9b766ea${_scopeId}><button class="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors" title="Force refresh data (for debugging)" data-v-b9b766ea${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b9b766ea${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-b9b766ea${_scopeId}></path></svg> Refresh </button>`);
            if (__props.salesOrder.status === "released") {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" data-v-b9b766ea${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b9b766ea${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-b9b766ea${_scopeId}></path></svg> Setujui </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.status === "released") {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-b9b766ea${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b9b766ea${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-b9b766ea${_scopeId}></path></svg> Tolak </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b9b766ea${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-b9b766ea${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-b9b766ea${_scopeId}><div class="lg:col-span-2 space-y-6" data-v-b9b766ea${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-b9b766ea${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-b9b766ea${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-b9b766ea${_scopeId}>Informasi Sales Order</h3></div><div class="p-6 space-y-4" data-v-b9b766ea${_scopeId}><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>ORDER NUMB</label><p class="text-gray-900 font-semibold" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.order_number)}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>CUSTOMER</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.customer)}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>SHIPPER</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.shipper || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>BL/AWB</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.bl_awb || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>LINER</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.liner || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>VESSEL</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.vessel || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>ETA</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.eta ? formatDate(__props.salesOrder.eta) : "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>AJU</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.aju || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>SPPB DATE</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.sppb_date ? formatDate(__props.salesOrder.sppb_date) : "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>SHIPMENT TYPE</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.shipment_type || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>POL</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.pol || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>POD</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.pod || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>GUDANG/UTC</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.gudang_utc || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>PARTY/LCL</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.party_lcl || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>PREPARED BY</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.prepared_by || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>EXCHANGE RATE</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.exchange_rate || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>JENIS BIAYA</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.jenis_biaya || "-")}</p></div><div class="col-span-2" data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>BUYING BREAKDOWN</label>`);
            if (__props.salesOrder.buying_breakdown && __props.salesOrder.buying_breakdown.length) {
              _push2(`<div class="space-y-2 p-3 bg-gray-50 rounded-lg" data-v-b9b766ea${_scopeId}><!--[-->`);
              ssrRenderList(__props.salesOrder.buying_breakdown, (item, index) => {
                _push2(`<div class="flex justify-between items-center p-2 bg-white rounded border" data-v-b9b766ea${_scopeId}><span class="text-sm text-gray-700 font-medium" data-v-b9b766ea${_scopeId}>${ssrInterpolate(item.vendor || "Unknown Vendor")}</span><span class="text-sm font-semibold text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(formatCurrency(item.amount || 0))}</span></div>`);
              });
              _push2(`<!--]--><div class="border-t pt-2 mt-2" data-v-b9b766ea${_scopeId}><div class="flex justify-between items-center font-bold" data-v-b9b766ea${_scopeId}><span class="text-sm text-blue-700" data-v-b9b766ea${_scopeId}>Total Buying:</span><span class="text-lg text-blue-600" data-v-b9b766ea${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</span></div></div></div>`);
            } else {
              _push2(`<p class="text-gray-500" data-v-b9b766ea${_scopeId}>-</p>`);
            }
            _push2(`</div><div class="col-span-2" data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>SELLING BREAKDOWN</label>`);
            if (__props.salesOrder.selling_breakdown && __props.salesOrder.selling_breakdown.length) {
              _push2(`<div class="space-y-2 p-3 bg-gray-50 rounded-lg" data-v-b9b766ea${_scopeId}><!--[-->`);
              ssrRenderList(__props.salesOrder.selling_breakdown, (item, index) => {
                _push2(`<div class="flex justify-between items-center p-2 bg-white rounded border" data-v-b9b766ea${_scopeId}><span class="text-sm text-gray-700 font-medium" data-v-b9b766ea${_scopeId}>${ssrInterpolate(item.description || "Unknown Service")}</span><span class="text-sm font-semibold text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(formatCurrency(item.amount || 0))}</span></div>`);
              });
              _push2(`<!--]--><div class="border-t pt-2 mt-2" data-v-b9b766ea${_scopeId}><div class="flex justify-between items-center font-bold" data-v-b9b766ea${_scopeId}><span class="text-sm text-green-700" data-v-b9b766ea${_scopeId}>Total Selling:</span><span class="text-lg text-green-600" data-v-b9b766ea${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</span></div></div></div>`);
            } else {
              _push2(`<p class="text-gray-500" data-v-b9b766ea${_scopeId}>-</p>`);
            }
            _push2(`</div><div class="col-span-2" data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>REVENUE (PROFIT)</label><div class="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg" data-v-b9b766ea${_scopeId}><div class="flex items-center justify-between" data-v-b9b766ea${_scopeId}><div data-v-b9b766ea${_scopeId}><div class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-green-600" : "text-red-600", "text-2xl font-bold"])}" data-v-b9b766ea${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</div><div class="text-xs text-gray-600 mt-1" data-v-b9b766ea${_scopeId}>Auto Calculated</div></div><div class="text-right text-sm text-gray-600" data-v-b9b766ea${_scopeId}><div data-v-b9b766ea${_scopeId}>Selling: ${ssrInterpolate(formatCurrency(totalSelling.value))}</div><div data-v-b9b766ea${_scopeId}>Buying: ${ssrInterpolate(formatCurrency(totalBuying.value))}</div></div></div></div></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>REMARKS</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.remarks || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>CONTAINER NO</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.container_no || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>INVOICE NUMB</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_number || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>INVOICE DATE</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_date ? formatDate(__props.salesOrder.invoice_date) : "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>T.O.P</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.top || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>COMMODITY</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.commodity || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>QTY</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.qty || "-")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>NET WEIGHT</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.net_weight || "-")} KG</p></div></div></div>`);
            if (__props.salesOrder.vouchers && __props.salesOrder.vouchers.length > 0) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-b9b766ea${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-b9b766ea${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-b9b766ea${_scopeId}>Voucher Management</h3></div><div class="p-6" data-v-b9b766ea${_scopeId}><!--[-->`);
              ssrRenderList(__props.salesOrder.vouchers, (voucher) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0" data-v-b9b766ea${_scopeId}><div class="flex justify-between items-start mb-3" data-v-b9b766ea${_scopeId}><div data-v-b9b766ea${_scopeId}><h4 class="font-semibold text-gray-900 flex items-center" data-v-b9b766ea${_scopeId}><span class="${ssrRenderClass([getVoucherTypeColor(voucher.type), "inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2"])}" data-v-b9b766ea${_scopeId}>${ssrInterpolate(voucher.type === "payment" ? "Payment" : "Receipt")}</span> ${ssrInterpolate(voucher.voucher_no)}</h4><p class="text-sm text-gray-600" data-v-b9b766ea${_scopeId}>${ssrInterpolate(voucher.description)}</p></div><div class="text-right" data-v-b9b766ea${_scopeId}><p class="font-semibold text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(formatCurrency(voucher.amount))}</p><span class="${ssrRenderClass([getVoucherStatusColor(voucher.status), "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"])}" data-v-b9b766ea${_scopeId}>${ssrInterpolate(getVoucherStatusLabel(voucher.status))}</span></div></div><div class="grid grid-cols-2 gap-4 text-sm" data-v-b9b766ea${_scopeId}><div data-v-b9b766ea${_scopeId}><span class="text-gray-500" data-v-b9b766ea${_scopeId}>Date:</span><span class="ml-1 text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(formatDate(voucher.date))}</span></div><div data-v-b9b766ea${_scopeId}><span class="text-gray-500" data-v-b9b766ea${_scopeId}>Prepared by:</span><span class="ml-1 text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(voucher.prepared_by || "-")}</span></div></div>`);
                if (voucher.status === "released") {
                  _push2(`<div class="mt-3 flex space-x-2" data-v-b9b766ea${_scopeId}><button class="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors" data-v-b9b766ea${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b9b766ea${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-b9b766ea${_scopeId}></path></svg> Approve </button><button class="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors" data-v-b9b766ea${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b9b766ea${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-b9b766ea${_scopeId}></path></svg> Reject </button></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (voucher.status === "released" || voucher.status === "approved") {
                  _push2(`<div class="mt-3 flex space-x-2" data-v-b9b766ea${_scopeId}><a${ssrRenderAttr("href", _ctx.route("admin-keuangan.sales-orders.vouchers.print", [__props.salesOrder.id, voucher.id]))} target="_blank" class="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors" data-v-b9b766ea${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b9b766ea${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" data-v-b9b766ea${_scopeId}></path></svg> Download PDF </a></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-6" data-v-b9b766ea${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-b9b766ea${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-b9b766ea${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-b9b766ea${_scopeId}>Status</h3></div><div class="p-6" data-v-b9b766ea${_scopeId}><span class="${ssrRenderClass([getStatusColor(__props.salesOrder.status), "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center"])}" data-v-b9b766ea${_scopeId}>${ssrInterpolate(getStatusLabel(__props.salesOrder.status || "released"))}</span></div></div><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-b9b766ea${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-b9b766ea${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-b9b766ea${_scopeId}>Informasi Rilis</h3></div><div class="p-6 space-y-4" data-v-b9b766ea${_scopeId}><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>Dirilis Oleh</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(((_a = __props.salesOrder.released_by) == null ? void 0 : _a.name) || "Unknown")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>Tanggal Rilis</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.released_at))}</p></div></div></div><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-b9b766ea${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-b9b766ea${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-b9b766ea${_scopeId}>System Information</h3></div><div class="p-6 space-y-4" data-v-b9b766ea${_scopeId}><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>Created By</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(((_b = __props.salesOrder.creator) == null ? void 0 : _b.name) || "Unknown")}</p></div><div data-v-b9b766ea${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b9b766ea${_scopeId}>Created At</label><p class="text-gray-900" data-v-b9b766ea${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.created_at))}</p></div></div></div></div></div></div>`);
            if (showApprovalModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-b9b766ea${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-b9b766ea${_scopeId}><div class="flex items-center mb-4" data-v-b9b766ea${_scopeId}><div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3" data-v-b9b766ea${_scopeId}><svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b9b766ea${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-b9b766ea${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-gray-900" data-v-b9b766ea${_scopeId}>Konfirmasi Persetujuan</h3></div><div class="mb-6 space-y-3" data-v-b9b766ea${_scopeId}><p class="text-gray-600" data-v-b9b766ea${_scopeId}>Apakah Anda yakin ingin menyetujui sales order ini?</p><div class="bg-gray-50 p-3 rounded-lg space-y-2" data-v-b9b766ea${_scopeId}><div class="flex justify-between text-sm" data-v-b9b766ea${_scopeId}><span class="font-medium" data-v-b9b766ea${_scopeId}>Order Number:</span><span data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.order_number)}</span></div><div class="flex justify-between text-sm" data-v-b9b766ea${_scopeId}><span class="font-medium" data-v-b9b766ea${_scopeId}>Customer:</span><span data-v-b9b766ea${_scopeId}>${ssrInterpolate(__props.salesOrder.customer)}</span></div><div class="flex justify-between text-sm" data-v-b9b766ea${_scopeId}><span class="font-medium" data-v-b9b766ea${_scopeId}>Status Saat Ini:</span><span class="${ssrRenderClass([getStatusColor(__props.salesOrder.status), "inline-flex items-center px-2 py-1 rounded text-xs font-medium"])}" data-v-b9b766ea${_scopeId}>${ssrInterpolate(getStatusLabel(__props.salesOrder.status))}</span></div></div>`);
              if (debugInfo.value) {
                _push2(`<div class="bg-yellow-50 border border-yellow-200 p-3 rounded-lg" data-v-b9b766ea${_scopeId}><div class="text-sm font-medium text-yellow-800 mb-1" data-v-b9b766ea${_scopeId}>Debug Info:</div><div class="text-xs text-yellow-700" data-v-b9b766ea${_scopeId}><div data-v-b9b766ea${_scopeId}>Status: ${ssrInterpolate(__props.salesOrder.status)}</div><div data-v-b9b766ea${_scopeId}>Released At: ${ssrInterpolate(__props.salesOrder.released_at || "NULL")}</div><div data-v-b9b766ea${_scopeId}>Released By: ${ssrInterpolate(((_c = __props.salesOrder.released_by) == null ? void 0 : _c.name) || "NULL")}</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex justify-end space-x-3" data-v-b9b766ea${_scopeId}><button class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors" data-v-b9b766ea${_scopeId}> Batal </button><button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" data-v-b9b766ea${_scopeId}> Ya, Setujui </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showRejectModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-b9b766ea${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-b9b766ea${_scopeId}><h3 class="text-lg font-semibold mb-4" data-v-b9b766ea${_scopeId}>Tolak Sales Order</h3><p class="text-gray-600 mb-4" data-v-b9b766ea${_scopeId}>Berikan alasan penolakan:</p><textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" rows="4" placeholder="Masukkan alasan penolakan..." data-v-b9b766ea${_scopeId}>${ssrInterpolate(rejectionReason.value)}</textarea><div class="flex justify-end space-x-3 mt-4" data-v-b9b766ea${_scopeId}><button class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors" data-v-b9b766ea${_scopeId}> Batal </button><button${ssrIncludeBooleanAttr(!rejectionReason.value.trim()) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-b9b766ea${_scopeId}> Tolak </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showVoucherRejectModal.value && selectedVoucher.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-b9b766ea${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-b9b766ea${_scopeId}><h3 class="text-lg font-semibold mb-4" data-v-b9b766ea${_scopeId}>Tolak Voucher</h3><p class="text-gray-600 mb-2" data-v-b9b766ea${_scopeId}>Voucher: <strong data-v-b9b766ea${_scopeId}>${ssrInterpolate(selectedVoucher.value.voucher_no)}</strong></p><p class="text-gray-600 mb-4" data-v-b9b766ea${_scopeId}>Berikan alasan penolakan:</p><textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" rows="4" placeholder="Masukkan alasan penolakan voucher..." data-v-b9b766ea${_scopeId}>${ssrInterpolate(voucherRejectionReason.value)}</textarea><div class="flex justify-end space-x-3 mt-4" data-v-b9b766ea${_scopeId}><button class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors" data-v-b9b766ea${_scopeId}> Batal </button><button${ssrIncludeBooleanAttr(!voucherRejectionReason.value.trim()) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-b9b766ea${_scopeId}> Tolak Voucher </button></div></div></div>`);
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
                      createVNode("button", {
                        onClick: forceRefresh,
                        class: "inline-flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors",
                        title: "Force refresh data (for debugging)"
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
                            d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          })
                        ])),
                        createTextVNode(" Refresh ")
                      ]),
                      __props.salesOrder.status === "released" ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: showApprovalDialog,
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
                        createVNode("div", { class: "col-span-2" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "BUYING BREAKDOWN"),
                          __props.salesOrder.buying_breakdown && __props.salesOrder.buying_breakdown.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-2 p-3 bg-gray-50 rounded-lg"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrder.buying_breakdown, (item, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "flex justify-between items-center p-2 bg-white rounded border"
                              }, [
                                createVNode("span", { class: "text-sm text-gray-700 font-medium" }, toDisplayString(item.vendor || "Unknown Vendor"), 1),
                                createVNode("span", { class: "text-sm font-semibold text-gray-900" }, toDisplayString(formatCurrency(item.amount || 0)), 1)
                              ]);
                            }), 128)),
                            createVNode("div", { class: "border-t pt-2 mt-2" }, [
                              createVNode("div", { class: "flex justify-between items-center font-bold" }, [
                                createVNode("span", { class: "text-sm text-blue-700" }, "Total Buying:"),
                                createVNode("span", { class: "text-lg text-blue-600" }, toDisplayString(formatCurrency(totalBuying.value)), 1)
                              ])
                            ])
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-gray-500"
                          }, "-"))
                        ]),
                        createVNode("div", { class: "col-span-2" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "SELLING BREAKDOWN"),
                          __props.salesOrder.selling_breakdown && __props.salesOrder.selling_breakdown.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-2 p-3 bg-gray-50 rounded-lg"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrder.selling_breakdown, (item, index) => {
                              return openBlock(), createBlock("div", {
                                key: index,
                                class: "flex justify-between items-center p-2 bg-white rounded border"
                              }, [
                                createVNode("span", { class: "text-sm text-gray-700 font-medium" }, toDisplayString(item.description || "Unknown Service"), 1),
                                createVNode("span", { class: "text-sm font-semibold text-gray-900" }, toDisplayString(formatCurrency(item.amount || 0)), 1)
                              ]);
                            }), 128)),
                            createVNode("div", { class: "border-t pt-2 mt-2" }, [
                              createVNode("div", { class: "flex justify-between items-center font-bold" }, [
                                createVNode("span", { class: "text-sm text-green-700" }, "Total Selling:"),
                                createVNode("span", { class: "text-lg text-green-600" }, toDisplayString(formatCurrency(totalSelling.value)), 1)
                              ])
                            ])
                          ])) : (openBlock(), createBlock("p", {
                            key: 1,
                            class: "text-gray-500"
                          }, "-"))
                        ]),
                        createVNode("div", { class: "col-span-2" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "REVENUE (PROFIT)"),
                          createVNode("div", { class: "p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg" }, [
                            createVNode("div", { class: "flex items-center justify-between" }, [
                              createVNode("div", null, [
                                createVNode("div", {
                                  class: ["text-2xl font-bold", totalRevenue.value >= 0 ? "text-green-600" : "text-red-600"]
                                }, toDisplayString(formatCurrency(totalRevenue.value)), 3),
                                createVNode("div", { class: "text-xs text-gray-600 mt-1" }, "Auto Calculated")
                              ]),
                              createVNode("div", { class: "text-right text-sm text-gray-600" }, [
                                createVNode("div", null, "Selling: " + toDisplayString(formatCurrency(totalSelling.value)), 1),
                                createVNode("div", null, "Buying: " + toDisplayString(formatCurrency(totalBuying.value)), 1)
                              ])
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "REMARKS"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.remarks || "-"), 1)
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
                            ])) : createCommentVNode("", true),
                            voucher.status === "released" || voucher.status === "approved" ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "mt-3 flex space-x-2"
                            }, [
                              createVNode("a", {
                                href: _ctx.route("admin-keuangan.sales-orders.vouchers.print", [__props.salesOrder.id, voucher.id]),
                                target: "_blank",
                                class: "inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
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
                                    d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                  })
                                ])),
                                createTextVNode(" Download PDF ")
                              ], 8, ["href"])
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
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(((_d = __props.salesOrder.released_by) == null ? void 0 : _d.name) || "Unknown"), 1)
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
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(((_e = __props.salesOrder.creator) == null ? void 0 : _e.name) || "Unknown"), 1)
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
              showApprovalModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }, [
                  createVNode("div", { class: "flex items-center mb-4" }, [
                    createVNode("div", { class: "w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-5 h-5 text-green-600",
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
                      ]))
                    ]),
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Konfirmasi Persetujuan")
                  ]),
                  createVNode("div", { class: "mb-6 space-y-3" }, [
                    createVNode("p", { class: "text-gray-600" }, "Apakah Anda yakin ingin menyetujui sales order ini?"),
                    createVNode("div", { class: "bg-gray-50 p-3 rounded-lg space-y-2" }, [
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", { class: "font-medium" }, "Order Number:"),
                        createVNode("span", null, toDisplayString(__props.salesOrder.order_number), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", { class: "font-medium" }, "Customer:"),
                        createVNode("span", null, toDisplayString(__props.salesOrder.customer), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between text-sm" }, [
                        createVNode("span", { class: "font-medium" }, "Status Saat Ini:"),
                        createVNode("span", {
                          class: ["inline-flex items-center px-2 py-1 rounded text-xs font-medium", getStatusColor(__props.salesOrder.status)]
                        }, toDisplayString(getStatusLabel(__props.salesOrder.status)), 3)
                      ])
                    ]),
                    debugInfo.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-yellow-50 border border-yellow-200 p-3 rounded-lg"
                    }, [
                      createVNode("div", { class: "text-sm font-medium text-yellow-800 mb-1" }, "Debug Info:"),
                      createVNode("div", { class: "text-xs text-yellow-700" }, [
                        createVNode("div", null, "Status: " + toDisplayString(__props.salesOrder.status), 1),
                        createVNode("div", null, "Released At: " + toDisplayString(__props.salesOrder.released_at || "NULL"), 1),
                        createVNode("div", null, "Released By: " + toDisplayString(((_f = __props.salesOrder.released_by) == null ? void 0 : _f.name) || "NULL"), 1)
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: closeApprovalDialog,
                      class: "px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                    }, " Batal "),
                    createVNode("button", {
                      onClick: approveSalesOrder,
                      class: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    }, " Ya, Setujui ")
                  ])
                ])
              ])) : createCommentVNode("", true),
              showRejectModal.value ? (openBlock(), createBlock("div", {
                key: 1,
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
                key: 2,
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
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b9b766ea"]]);
export {
  Show as default
};
