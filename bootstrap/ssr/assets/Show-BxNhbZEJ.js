import { ref, computed, withCtx, unref, createVNode, createTextVNode, createBlock, openBlock, createCommentVNode, toDisplayString, Fragment, renderList, withDirectives, vModelText, vModelRadio, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1Q9-d_q.js";
import { FileText, Check, X, ArrowLeft } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-D8P-wM_6.js";
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
    const showInvoiceCreateModal = ref(false);
    const selectedInvoiceType = ref("");
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
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    };
    const formatNumber = (amount) => {
      const numAmount = parseFloat(amount) || 0;
      return numAmount.toLocaleString("id-ID");
    };
    const totalBuying = computed(() => {
      if (!props.salesOrder.vendor_breakdown) return 0;
      return props.salesOrder.vendor_breakdown.reduce((sum, item) => sum + (parseFloat(item.buying_amount) || 0), 0);
    });
    const totalSelling = computed(() => {
      if (!props.salesOrder.vendor_breakdown) return 0;
      return props.salesOrder.vendor_breakdown.reduce((sum, item) => sum + (parseFloat(item.selling_amount) || 0), 0);
    });
    const totalRevenue = computed(() => {
      return totalSelling.value - totalBuying.value;
    });
    const getVendorProfit = (vendorItem) => {
      const buying = parseFloat(vendorItem.buying_amount) || 0;
      const selling = parseFloat(vendorItem.selling_amount) || 0;
      return selling - buying;
    };
    const formatWeight = (weight) => {
      return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(weight) + " kg";
    };
    const formatMeasurement = (measurement) => {
      return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3
      }).format(measurement) + " m³";
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
    const getInvoiceStatusLabel = (status) => {
      const labels = {
        draft: "Draft",
        sent: "Terkirim",
        paid: "Lunas",
        overdue: "Jatuh Tempo"
      };
      return labels[status] || status;
    };
    const getInvoiceStatusColor = (status) => {
      const colors = {
        draft: "bg-gray-100 text-gray-800",
        sent: "bg-blue-100 text-blue-800",
        paid: "bg-green-100 text-green-800",
        overdue: "bg-red-100 text-red-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    const closeInvoiceCreateModal = () => {
      showInvoiceCreateModal.value = false;
      selectedInvoiceType.value = "";
    };
    const createInvoice = () => {
      if (!selectedInvoiceType.value) {
        alert("Pilih tipe invoice terlebih dahulu");
        return;
      }
      router.get(route("admin-keuangan.invoices.create"), {
        sales_order_id: props.salesOrder.id,
        invoice_type: selectedInvoiceType.value
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="py-6" data-v-abd77106${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-abd77106${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-abd77106${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-abd77106${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-abd77106${_scopeId}><div class="flex items-center" data-v-abd77106${_scopeId}><div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" data-v-abd77106${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-abd77106${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-abd77106${_scopeId}>Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h1><p class="mt-1 text-sm text-gray-600" data-v-abd77106${_scopeId}>Review dan kelola sales order dari CS</p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-abd77106${_scopeId}>`);
            if (__props.salesOrder.status === "released") {
              _push2(`<button class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" data-v-abd77106${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Check), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` Setujui </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.status === "released") {
              _push2(`<button class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" data-v-abd77106${_scopeId}>`);
              _push2(ssrRenderComponent(unref(X), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
              _push2(` Tolak </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Kembali `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-abd77106${_scopeId}><div class="lg:col-span-2 space-y-6" data-v-abd77106${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-abd77106${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-abd77106${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-abd77106${_scopeId}>Informasi Sales Order</h3></div><div class="p-6" data-v-abd77106${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" data-v-abd77106${_scopeId}><div class="space-y-3" data-v-abd77106${_scopeId}><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>ORDER NUMB:</span><span class="font-semibold" data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.order_number)}</span></p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>REF NO:</span> ${ssrInterpolate(__props.salesOrder.ref_no || "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>DATE:</span> ${ssrInterpolate(__props.salesOrder.so_date ? formatDate(__props.salesOrder.so_date) : "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>CUSTOMER:</span> ${ssrInterpolate(__props.salesOrder.customer)}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>SHIPPER:</span> ${ssrInterpolate(__props.salesOrder.shipper || "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>BL/AWB:</span> ${ssrInterpolate(__props.salesOrder.bl_awb || "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>LINER:</span> ${ssrInterpolate(__props.salesOrder.liner || "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>VESSEL:</span> ${ssrInterpolate(__props.salesOrder.vessel || "-")}</p></div><div class="space-y-3" data-v-abd77106${_scopeId}><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>ETA:</span> ${ssrInterpolate(__props.salesOrder.eta ? formatDate(__props.salesOrder.eta) : "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>ETD:</span> ${ssrInterpolate(__props.salesOrder.etd ? formatDate(__props.salesOrder.etd) : "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>AJU:</span> ${ssrInterpolate(__props.salesOrder.aju || "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>SPPB DATE:</span> ${ssrInterpolate(__props.salesOrder.sppb_date ? formatDate(__props.salesOrder.sppb_date) : "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>SHIPMENT TYPE:</span> ${ssrInterpolate(__props.salesOrder.shipment_type || "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>POL/POD:</span> ${ssrInterpolate([__props.salesOrder.pol, __props.salesOrder.pod].filter(Boolean).join(" / ") || "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>GUDANG/UTC:</span> ${ssrInterpolate(__props.salesOrder.gudang_utc || "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>PARTY/LCL:</span> ${ssrInterpolate(__props.salesOrder.party_lcl || "-")}</p><p class="text-gray-900" data-v-abd77106${_scopeId}><span class="font-semibold text-gray-700" data-v-abd77106${_scopeId}>PREPARED BY:</span> ${ssrInterpolate(__props.salesOrder.prepared_by || "-")}</p></div></div><div class="border-t border-gray-200 pt-6 mb-6" data-v-abd77106${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-abd77106${_scopeId}>EXCHANGE RATE</label><p class="text-gray-900 font-mono" data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.exchange_rate ? formatNumber(__props.salesOrder.exchange_rate) : "-")}</p></div></div></div><div class="border-t border-gray-200 pt-6" data-v-abd77106${_scopeId}><h4 class="text-md font-semibold text-gray-800 mb-4" data-v-abd77106${_scopeId}>Detail Informasi</h4><div class="overflow-x-auto mb-6" data-v-abd77106${_scopeId}><table class="min-w-full" data-v-abd77106${_scopeId}><thead data-v-abd77106${_scopeId}><tr class="bg-sage-50" data-v-abd77106${_scopeId}><th class="px-6 py-4 text-left text-sm font-bold text-sage-800 uppercase tracking-wide" data-v-abd77106${_scopeId}> JENIS BIAYA</th><th class="px-6 py-4 text-center text-sm font-bold text-sage-800 uppercase tracking-wide" data-v-abd77106${_scopeId}> BUYING</th><th class="px-6 py-4 text-center text-sm font-bold text-sage-800 uppercase tracking-wide" data-v-abd77106${_scopeId}> SELLING</th><th class="px-6 py-4 text-center text-sm font-bold text-sage-800 uppercase tracking-wide" data-v-abd77106${_scopeId}> REVENUE</th><th class="px-6 py-4 text-left text-sm font-bold text-sage-800 uppercase tracking-wide" data-v-abd77106${_scopeId}> REMARKS</th></tr></thead><tbody data-v-abd77106${_scopeId}>`);
            if (__props.salesOrder.vendor_breakdown && __props.salesOrder.vendor_breakdown.length > 0) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.salesOrder.vendor_breakdown, (item, index) => {
                _push2(`<tr class="hover:bg-sage-50 transition-colors" data-v-abd77106${_scopeId}><td class="px-6 py-4 text-sm text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(item.description || "Service Type")}</td><td class="px-6 py-4 text-center text-sm font-mono text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(formatCurrency(item.buying_amount || 0))}</td><td class="px-6 py-4 text-center text-sm font-mono text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(formatCurrency(item.selling_amount || 0))}</td><td class="${ssrRenderClass([getVendorProfit(item) >= 0 ? "text-sage-700" : "text-red-600", "px-6 py-4 text-center text-sm font-mono"])}" data-v-abd77106${_scopeId}>${ssrInterpolate(formatCurrency(getVendorProfit(item)))}</td><td class="px-6 py-4 text-sm text-gray-600" data-v-abd77106${_scopeId}>${ssrInterpolate(item.remarks || "-")}</td></tr>`);
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<tr data-v-abd77106${_scopeId}><td colspan="5" class="px-6 py-12 text-center text-gray-500" data-v-abd77106${_scopeId}><div class="flex flex-col items-center" data-v-abd77106${_scopeId}><div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4" data-v-abd77106${_scopeId}><svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-abd77106${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-abd77106${_scopeId}></path></svg></div><h3 class="text-lg font-medium text-gray-900 mb-2" data-v-abd77106${_scopeId}>Tidak ada data breakdown</h3><p class="text-sm text-gray-500 max-w-sm" data-v-abd77106${_scopeId}>Belum ada informasi vendor breakdown. Data akan muncul setelah informasi pricing diisi.</p></div></td></tr>`);
            }
            if (__props.salesOrder.vendor_breakdown && __props.salesOrder.vendor_breakdown.length > 0) {
              _push2(`<tr class="bg-sage-50 border-t border-gray-200" data-v-abd77106${_scopeId}><td class="px-6 py-4 text-sm font-semibold text-sage-800 uppercase" data-v-abd77106${_scopeId}> TOTAL </td><td class="px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</td><td class="px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</td><td class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-sage-700" : "text-red-600", "px-6 py-4 text-center text-sm font-mono font-semibold"])}" data-v-abd77106${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</td><td class="px-6 py-4 text-center text-gray-400" data-v-abd77106${_scopeId}> - </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.salesOrder.remarks) {
              _push2(`<div class="mb-6" data-v-abd77106${_scopeId}><h5 class="text-sm font-semibold text-gray-800 mb-3" data-v-abd77106${_scopeId}>Catatan (Remarks)</h5><div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4" data-v-abd77106${_scopeId}><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.remarks)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.note) {
              _push2(`<div class="mb-6" data-v-abd77106${_scopeId}><h5 class="text-sm font-semibold text-gray-800 mb-3" data-v-abd77106${_scopeId}>Catatan Tambahan (Note) </h5><div class="bg-blue-50 border border-blue-200 rounded-lg p-4" data-v-abd77106${_scopeId}><p class="text-gray-900 whitespace-pre-wrap" data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.note)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200" data-v-abd77106${_scopeId}><div class="space-y-3" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-abd77106${_scopeId}>COMMODITY/URAIAN BARANG</label><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.commodity || "-")}</p></div><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-abd77106${_scopeId}>QTY</label><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.qty || "-")}</p></div><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-abd77106${_scopeId}>NET WEIGHT (KG)</label><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.net_weight ? formatWeight(__props.salesOrder.net_weight) : "-")}</p></div><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-abd77106${_scopeId}>MEAS (M³)</label><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.measurement ? formatMeasurement(__props.salesOrder.measurement) : "-")}</p></div></div><div class="space-y-3" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-abd77106${_scopeId}>CONTAINER NO</label><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.container_no || "-")}</p></div><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-abd77106${_scopeId}>INVOICE NUMB</label><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_number || "-")}</p></div><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-abd77106${_scopeId}>INVOICE DATE</label><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_date ? formatDate(__props.salesOrder.invoice_date) : "-")}</p></div><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-abd77106${_scopeId}>T.O.P</label><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.top || "-")}</p></div></div></div></div></div></div>`);
            if (__props.salesOrder.vouchers && __props.salesOrder.vouchers.length > 0) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-abd77106${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-abd77106${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-abd77106${_scopeId}>Voucher Management</h3></div><div class="p-6" data-v-abd77106${_scopeId}><!--[-->`);
              ssrRenderList(__props.salesOrder.vouchers, (voucher) => {
                _push2(`<div class="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0" data-v-abd77106${_scopeId}><div class="flex justify-between items-start mb-3" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><h4 class="font-semibold text-gray-900 flex items-center" data-v-abd77106${_scopeId}><span class="${ssrRenderClass([getVoucherTypeColor(voucher.type), "inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2"])}" data-v-abd77106${_scopeId}>${ssrInterpolate(voucher.type === "payment" ? "Payment" : "Receipt")}</span> ${ssrInterpolate(voucher.voucher_no)}</h4><p class="text-sm text-gray-600" data-v-abd77106${_scopeId}>${ssrInterpolate(voucher.description)}</p></div><div class="text-right" data-v-abd77106${_scopeId}><p class="font-semibold text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(formatCurrency(voucher.amount))}</p><span class="${ssrRenderClass([getVoucherStatusColor(voucher.status), "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"])}" data-v-abd77106${_scopeId}>${ssrInterpolate(getVoucherStatusLabel(voucher.status))}</span></div></div><div class="grid grid-cols-2 gap-4 text-sm" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><span class="text-gray-500" data-v-abd77106${_scopeId}>Date:</span><span class="ml-1 text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(formatDate(voucher.date))}</span></div><div data-v-abd77106${_scopeId}><span class="text-gray-500" data-v-abd77106${_scopeId}>Prepared by:</span><span class="ml-1 text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(voucher.prepared_by || "-")}</span></div></div>`);
                if (voucher.status === "released") {
                  _push2(`<div class="mt-3 flex space-x-2" data-v-abd77106${_scopeId}><button class="inline-flex items-center px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors" data-v-abd77106${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-abd77106${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-abd77106${_scopeId}></path></svg> Approve </button><button class="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors" data-v-abd77106${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-abd77106${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-abd77106${_scopeId}></path></svg> Reject </button></div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (voucher.status === "released" || voucher.status === "approved") {
                  _push2(`<div class="mt-3 flex space-x-2" data-v-abd77106${_scopeId}><a${ssrRenderAttr("href", _ctx.route("admin-keuangan.sales-orders.vouchers.print", [__props.salesOrder.id, voucher.id]))} target="_blank" class="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors" data-v-abd77106${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-abd77106${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" data-v-abd77106${_scopeId}></path></svg> Download PDF </a></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((__props.salesOrder.status === "released" || __props.salesOrder.status === "approved") && __props.salesOrder.released_at) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-abd77106${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-abd77106${_scopeId}><div class="flex justify-between items-center" data-v-abd77106${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-abd77106${_scopeId}>Invoice Management</h3><button class="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors" data-v-abd77106${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-abd77106${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-abd77106${_scopeId}></path></svg> Buat Invoice </button></div></div><div class="p-6" data-v-abd77106${_scopeId}>`);
              if (__props.salesOrder.invoices && __props.salesOrder.invoices.filter((inv) => inv.invoice_type === "main").length > 0) {
                _push2(`<div data-v-abd77106${_scopeId}><h4 class="text-md font-semibold text-gray-800 mb-4" data-v-abd77106${_scopeId}>Main Invoices</h4><!--[-->`);
                ssrRenderList(__props.salesOrder.invoices.filter((inv) => inv.invoice_type === "main"), (invoice) => {
                  _push2(`<div class="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0" data-v-abd77106${_scopeId}><div class="flex justify-between items-start mb-3" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><h5 class="font-semibold text-gray-900 flex items-center" data-v-abd77106${_scopeId}><span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2 bg-blue-100 text-blue-800" data-v-abd77106${_scopeId}> Main </span> ${ssrInterpolate(invoice.invoice_number)}</h5><p class="text-sm text-gray-600" data-v-abd77106${_scopeId}>${ssrInterpolate(invoice.description || "MainInvoice")}</p></div><div class="text-right" data-v-abd77106${_scopeId}><p class="font-semibold text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(formatCurrency(invoice.total_amount || 0))}</p><span class="${ssrRenderClass([getInvoiceStatusColor(invoice.status), "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"])}" data-v-abd77106${_scopeId}>${ssrInterpolate(getInvoiceStatusLabel(invoice.status))}</span></div></div><div class="grid grid-cols-2 gap-4 text-sm" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><span class="text-gray-500" data-v-abd77106${_scopeId}>Date:</span><span class="ml-1 text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(formatDate(invoice.invoice_date))}</span></div><div data-v-abd77106${_scopeId}><span class="text-gray-500" data-v-abd77106${_scopeId}>Customer:</span><span class="ml-1 text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(invoice.customer_name || __props.salesOrder.customer)}</span></div></div><div class="mt-3 flex space-x-2" data-v-abd77106${_scopeId}><a${ssrRenderAttr("href", _ctx.route("admin-keuangan.invoices.print", invoice.id))} target="_blank" class="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors" data-v-abd77106${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-abd77106${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" data-v-abd77106${_scopeId}></path></svg> Download PDF </a>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("admin-keuangan.invoices.show", invoice.id),
                    class: "inline-flex items-center px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-abd77106${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-abd77106${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-abd77106${_scopeId2}></path></svg> View `);
                      } else {
                        return [
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
                              d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            }),
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            })
                          ])),
                          createTextVNode(" View ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.salesOrder.invoices && __props.salesOrder.invoices.filter((inv) => inv.invoice_type === "reimbursement").length > 0) {
                _push2(`<div class="mt-6" data-v-abd77106${_scopeId}><h4 class="text-md font-semibold text-gray-800 mb-4" data-v-abd77106${_scopeId}>Reimbursement Invoices</h4><!--[-->`);
                ssrRenderList(__props.salesOrder.invoices.filter((inv) => inv.invoice_type === "reimbursement"), (invoice) => {
                  _push2(`<div class="border border-gray-200 rounded-lg p-4 mb-4 last:mb-0" data-v-abd77106${_scopeId}><div class="flex justify-between items-start mb-3" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><h5 class="font-semibold text-gray-900 flex items-center" data-v-abd77106${_scopeId}><span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2 bg-orange-100 text-orange-800" data-v-abd77106${_scopeId}> Reimbursement </span> ${ssrInterpolate(invoice.invoice_number)}</h5><p class="text-sm text-gray-600" data-v-abd77106${_scopeId}>${ssrInterpolate(invoice.description || "Reimbursement Invoice")}</p></div><div class="text-right" data-v-abd77106${_scopeId}><p class="font-semibold text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(formatCurrency(invoice.total_amount || 0))}</p><span class="${ssrRenderClass([getInvoiceStatusColor(invoice.status), "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"])}" data-v-abd77106${_scopeId}>${ssrInterpolate(getInvoiceStatusLabel(invoice.status))}</span></div></div><div class="grid grid-cols-2 gap-4 text-sm" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><span class="text-gray-500" data-v-abd77106${_scopeId}>Date:</span><span class="ml-1 text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(formatDate(invoice.invoice_date))}</span></div><div data-v-abd77106${_scopeId}><span class="text-gray-500" data-v-abd77106${_scopeId}>Customer:</span><span class="ml-1 text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(invoice.customer_name || __props.salesOrder.customer)}</span></div></div><div class="mt-3 flex space-x-2" data-v-abd77106${_scopeId}><a${ssrRenderAttr("href", _ctx.route("admin-keuangan.invoices.print", invoice.id))} target="_blank" class="inline-flex items-center px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition-colors" data-v-abd77106${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-abd77106${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" data-v-abd77106${_scopeId}></path></svg> Download PDF -R </a>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("admin-keuangan.invoices.show", invoice.id),
                    class: "inline-flex items-center px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-abd77106${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-abd77106${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-abd77106${_scopeId2}></path></svg> View `);
                      } else {
                        return [
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
                              d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            }),
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            })
                          ])),
                          createTextVNode(" View ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (!__props.salesOrder.invoices || __props.salesOrder.invoices.length === 0) {
                _push2(`<div class="text-center py-8" data-v-abd77106${_scopeId}><div class="flex flex-col items-center" data-v-abd77106${_scopeId}><div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4" data-v-abd77106${_scopeId}><svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-abd77106${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-abd77106${_scopeId}></path></svg></div><h3 class="text-lg font-medium text-gray-900 mb-2" data-v-abd77106${_scopeId}>Belum ada invoice</h3><p class="text-sm text-gray-500 max-w-sm" data-v-abd77106${_scopeId}>Belum ada invoice yang dibuat untuk sales order ini. Klik tombol &quot;Buat Invoice&quot; untuk memulai.</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-6" data-v-abd77106${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-abd77106${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-abd77106${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-abd77106${_scopeId}>Status</h3></div><div class="p-6" data-v-abd77106${_scopeId}><span class="${ssrRenderClass([getStatusColor(__props.salesOrder.status), "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center"])}" data-v-abd77106${_scopeId}>${ssrInterpolate(getStatusLabel(__props.salesOrder.status || "released"))}</span></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-abd77106${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-abd77106${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-abd77106${_scopeId}>Informasi Rilis</h3></div><div class="p-6 space-y-4" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-abd77106${_scopeId}>Dirilis Oleh</label><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(((_a = __props.salesOrder.released_by) == null ? void 0 : _a.name) || "Unknown")}</p></div><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-abd77106${_scopeId}>Tanggal Rilis</label><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.released_at))}</p></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-abd77106${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-abd77106${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-abd77106${_scopeId}>System Information</h3></div><div class="p-6 space-y-4" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-abd77106${_scopeId}>Created By</label><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(((_b = __props.salesOrder.creator) == null ? void 0 : _b.name) || "Unknown")}</p></div><div data-v-abd77106${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-abd77106${_scopeId}>Created At</label><p class="text-gray-900" data-v-abd77106${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.created_at))}</p></div></div></div></div></div></div>`);
            if (showApprovalModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-abd77106${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-abd77106${_scopeId}><div class="flex items-center mb-4" data-v-abd77106${_scopeId}><div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3" data-v-abd77106${_scopeId}><svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-abd77106${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-abd77106${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-gray-900" data-v-abd77106${_scopeId}>Konfirmasi Persetujuan</h3></div><div class="mb-6 space-y-3" data-v-abd77106${_scopeId}><p class="text-gray-600" data-v-abd77106${_scopeId}>Apakah Anda yakin ingin menyetujui sales order ini?</p><div class="bg-gray-50 p-3 rounded-lg space-y-2" data-v-abd77106${_scopeId}><div class="flex justify-between text-sm" data-v-abd77106${_scopeId}><span class="font-medium" data-v-abd77106${_scopeId}>Order Number:</span><span data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.order_number)}</span></div><div class="flex justify-between text-sm" data-v-abd77106${_scopeId}><span class="font-medium" data-v-abd77106${_scopeId}>Customer:</span><span data-v-abd77106${_scopeId}>${ssrInterpolate(__props.salesOrder.customer)}</span></div><div class="flex justify-between text-sm" data-v-abd77106${_scopeId}><span class="font-medium" data-v-abd77106${_scopeId}>Status Saat Ini:</span><span class="${ssrRenderClass([getStatusColor(__props.salesOrder.status), "inline-flex items-center px-2 py-1 rounded text-xs font-medium"])}" data-v-abd77106${_scopeId}>${ssrInterpolate(getStatusLabel(__props.salesOrder.status))}</span></div></div>`);
              if (debugInfo.value) {
                _push2(`<div class="bg-yellow-50 border border-yellow-200 p-3 rounded-lg" data-v-abd77106${_scopeId}><div class="text-sm font-medium text-yellow-800 mb-1" data-v-abd77106${_scopeId}>Debug Info:</div><div class="text-xs text-yellow-700" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}>Status: ${ssrInterpolate(__props.salesOrder.status)}</div><div data-v-abd77106${_scopeId}>Released At: ${ssrInterpolate(__props.salesOrder.released_at || "NULL")}</div><div data-v-abd77106${_scopeId}>Released By: ${ssrInterpolate(((_c = __props.salesOrder.released_by) == null ? void 0 : _c.name) || "NULL")}</div></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex justify-end space-x-3" data-v-abd77106${_scopeId}><button class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors" data-v-abd77106${_scopeId}> Batal </button><button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" data-v-abd77106${_scopeId}> Ya, Setujui </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showRejectModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-abd77106${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-abd77106${_scopeId}><h3 class="text-lg font-semibold mb-4" data-v-abd77106${_scopeId}>Tolak Sales Order</h3><p class="text-gray-600 mb-4" data-v-abd77106${_scopeId}>Berikan alasan penolakan:</p><textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" rows="4" placeholder="Masukkan alasan penolakan..." data-v-abd77106${_scopeId}>${ssrInterpolate(rejectionReason.value)}</textarea><div class="flex justify-end space-x-3 mt-4" data-v-abd77106${_scopeId}><button class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors" data-v-abd77106${_scopeId}> Batal </button><button${ssrIncludeBooleanAttr(!rejectionReason.value.trim()) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-abd77106${_scopeId}> Tolak </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showVoucherRejectModal.value && selectedVoucher.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-abd77106${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-abd77106${_scopeId}><h3 class="text-lg font-semibold mb-4" data-v-abd77106${_scopeId}>Tolak Voucher</h3><p class="text-gray-600 mb-2" data-v-abd77106${_scopeId}>Voucher: <strong data-v-abd77106${_scopeId}>${ssrInterpolate(selectedVoucher.value.voucher_no)}</strong></p><p class="text-gray-600 mb-4" data-v-abd77106${_scopeId}>Berikan alasan penolakan:</p><textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" rows="4" placeholder="Masukkan alasan penolakan voucher..." data-v-abd77106${_scopeId}>${ssrInterpolate(voucherRejectionReason.value)}</textarea><div class="flex justify-end space-x-3 mt-4" data-v-abd77106${_scopeId}><button class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors" data-v-abd77106${_scopeId}> Batal </button><button${ssrIncludeBooleanAttr(!voucherRejectionReason.value.trim()) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-abd77106${_scopeId}> Tolak Voucher </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showInvoiceCreateModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-abd77106${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-abd77106${_scopeId}><div class="flex items-center mb-4" data-v-abd77106${_scopeId}><div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3" data-v-abd77106${_scopeId}><svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-abd77106${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-abd77106${_scopeId}></path></svg></div><h3 class="text-lg font-semibold text-gray-900" data-v-abd77106${_scopeId}>Pilih Tipe Invoice</h3></div><div class="mb-6" data-v-abd77106${_scopeId}><p class="text-gray-600 mb-4" data-v-abd77106${_scopeId}>Pilih tipe invoice yang ingin dibuat untuk sales order ini:</p><div class="space-y-3" data-v-abd77106${_scopeId}><label class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" data-v-abd77106${_scopeId}><input type="radio" name="invoice_type" value="main"${ssrIncludeBooleanAttr(ssrLooseEqual(selectedInvoiceType.value, "main")) ? " checked" : ""} class="mr-3" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><div class="font-medium text-gray-900" data-v-abd77106${_scopeId}>Main Invoice</div><div class="text-sm text-gray-600" data-v-abd77106${_scopeId}>Invoice utama untuk tagihan customer</div></div></label><label class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" data-v-abd77106${_scopeId}><input type="radio" name="invoice_type" value="reimbursement"${ssrIncludeBooleanAttr(ssrLooseEqual(selectedInvoiceType.value, "reimbursement")) ? " checked" : ""} class="mr-3" data-v-abd77106${_scopeId}><div data-v-abd77106${_scopeId}><div class="font-medium text-gray-900" data-v-abd77106${_scopeId}>Reimbursement Invoice</div><div class="text-sm text-gray-600" data-v-abd77106${_scopeId}>Invoice untuk penggantian biaya pihak ketiga </div></div></label></div></div><div class="flex justify-end space-x-3" data-v-abd77106${_scopeId}><button class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors" data-v-abd77106${_scopeId}> Batal </button><button${ssrIncludeBooleanAttr(!selectedInvoiceType.value) ? " disabled" : ""} class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-abd77106${_scopeId}> Lanjutkan </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
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
                            createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, "Sales Order: " + toDisplayString(__props.salesOrder.order_number), 1),
                            createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Review dan kelola sales order dari CS")
                          ])
                        ]),
                        createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                          __props.salesOrder.status === "released" ? (openBlock(), createBlock("button", {
                            key: 0,
                            onClick: showApprovalDialog,
                            class: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          }, [
                            createVNode(unref(Check), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Setujui ")
                          ])) : createCommentVNode("", true),
                          __props.salesOrder.status === "released" ? (openBlock(), createBlock("button", {
                            key: 1,
                            onClick: ($event) => showRejectModal.value = true,
                            class: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          }, [
                            createVNode(unref(X), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Tolak ")
                          ], 8, ["onClick"])) : createCommentVNode("", true),
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-keuangan.sales-orders.index"),
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Kembali ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                    createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                      createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Informasi Sales Order")
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
                              ]),
                              createVNode("p", { class: "text-gray-900" }, [
                                createVNode("span", { class: "font-semibold text-gray-700" }, "PREPARED BY:"),
                                createTextVNode(" " + toDisplayString(__props.salesOrder.prepared_by || "-"), 1)
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
                            createVNode("h4", { class: "text-md font-semibold text-gray-800 mb-4" }, "Detail Informasi"),
                            createVNode("div", { class: "overflow-x-auto mb-6" }, [
                              createVNode("table", { class: "min-w-full" }, [
                                createVNode("thead", null, [
                                  createVNode("tr", { class: "bg-sage-50" }, [
                                    createVNode("th", { class: "px-6 py-4 text-left text-sm font-bold text-sage-800 uppercase tracking-wide" }, " JENIS BIAYA"),
                                    createVNode("th", { class: "px-6 py-4 text-center text-sm font-bold text-sage-800 uppercase tracking-wide" }, " BUYING"),
                                    createVNode("th", { class: "px-6 py-4 text-center text-sm font-bold text-sage-800 uppercase tracking-wide" }, " SELLING"),
                                    createVNode("th", { class: "px-6 py-4 text-center text-sm font-bold text-sage-800 uppercase tracking-wide" }, " REVENUE"),
                                    createVNode("th", { class: "px-6 py-4 text-left text-sm font-bold text-sage-800 uppercase tracking-wide" }, " REMARKS")
                                  ])
                                ]),
                                createVNode("tbody", null, [
                                  __props.salesOrder.vendor_breakdown && __props.salesOrder.vendor_breakdown.length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.salesOrder.vendor_breakdown, (item, index) => {
                                    return openBlock(), createBlock("tr", {
                                      key: index,
                                      class: "hover:bg-sage-50 transition-colors"
                                    }, [
                                      createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(item.description || "Service Type"), 1),
                                      createVNode("td", { class: "px-6 py-4 text-center text-sm font-mono text-gray-900" }, toDisplayString(formatCurrency(item.buying_amount || 0)), 1),
                                      createVNode("td", { class: "px-6 py-4 text-center text-sm font-mono text-gray-900" }, toDisplayString(formatCurrency(item.selling_amount || 0)), 1),
                                      createVNode("td", {
                                        class: ["px-6 py-4 text-center text-sm font-mono", getVendorProfit(item) >= 0 ? "text-sage-700" : "text-red-600"]
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
                                        createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-2" }, "Tidak ada data breakdown"),
                                        createVNode("p", { class: "text-sm text-gray-500 max-w-sm" }, "Belum ada informasi vendor breakdown. Data akan muncul setelah informasi pricing diisi.")
                                      ])
                                    ])
                                  ])),
                                  __props.salesOrder.vendor_breakdown && __props.salesOrder.vendor_breakdown.length > 0 ? (openBlock(), createBlock("tr", {
                                    key: 2,
                                    class: "bg-sage-50 border-t border-gray-200"
                                  }, [
                                    createVNode("td", { class: "px-6 py-4 text-sm font-semibold text-sage-800 uppercase" }, " TOTAL "),
                                    createVNode("td", { class: "px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900" }, toDisplayString(formatCurrency(totalBuying.value)), 1),
                                    createVNode("td", { class: "px-6 py-4 text-center text-sm font-mono font-semibold text-gray-900" }, toDisplayString(formatCurrency(totalSelling.value)), 1),
                                    createVNode("td", {
                                      class: ["px-6 py-4 text-center text-sm font-mono font-semibold", totalRevenue.value >= 0 ? "text-sage-700" : "text-red-600"]
                                    }, toDisplayString(formatCurrency(totalRevenue.value)), 3),
                                    createVNode("td", { class: "px-6 py-4 text-center text-gray-400" }, " - ")
                                  ])) : createCommentVNode("", true)
                                ])
                              ])
                            ]),
                            __props.salesOrder.remarks ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mb-6"
                            }, [
                              createVNode("h5", { class: "text-sm font-semibold text-gray-800 mb-3" }, "Catatan (Remarks)"),
                              createVNode("div", { class: "bg-yellow-50 border border-yellow-200 rounded-lg p-4" }, [
                                createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.remarks), 1)
                              ])
                            ])) : createCommentVNode("", true),
                            __props.salesOrder.note ? (openBlock(), createBlock("div", {
                              key: 1,
                              class: "mb-6"
                            }, [
                              createVNode("h5", { class: "text-sm font-semibold text-gray-800 mb-3" }, "Catatan Tambahan (Note) "),
                              createVNode("div", { class: "bg-blue-50 border border-blue-200 rounded-lg p-4" }, [
                                createVNode("p", { class: "text-gray-900 whitespace-pre-wrap" }, toDisplayString(__props.salesOrder.note), 1)
                              ])
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200" }, [
                              createVNode("div", { class: "space-y-3" }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "COMMODITY/URAIAN BARANG"),
                                  createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.commodity || "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "QTY"),
                                  createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.qty || "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "NET WEIGHT (KG)"),
                                  createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.net_weight ? formatWeight(__props.salesOrder.net_weight) : "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "MEAS (M³)"),
                                  createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.salesOrder.measurement ? formatMeasurement(__props.salesOrder.measurement) : "-"), 1)
                                ])
                              ]),
                              createVNode("div", { class: "space-y-3" }, [
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
                                ])
                              ])
                            ])
                          ])
                        ])
                      ]),
                      __props.salesOrder.vouchers && __props.salesOrder.vouchers.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
                      }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Voucher Management")
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
                      ])) : createCommentVNode("", true),
                      (__props.salesOrder.status === "released" || __props.salesOrder.status === "approved") && __props.salesOrder.released_at ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
                      }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Invoice Management"),
                            createVNode("button", {
                              onClick: ($event) => showInvoiceCreateModal.value = true,
                              class: "inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
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
                                  d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                                })
                              ])),
                              createTextVNode(" Buat Invoice ")
                            ], 8, ["onClick"])
                          ])
                        ]),
                        createVNode("div", { class: "p-6" }, [
                          __props.salesOrder.invoices && __props.salesOrder.invoices.filter((inv) => inv.invoice_type === "main").length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("h4", { class: "text-md font-semibold text-gray-800 mb-4" }, "Main Invoices"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrder.invoices.filter((inv) => inv.invoice_type === "main"), (invoice) => {
                              return openBlock(), createBlock("div", {
                                key: "main-" + invoice.id,
                                class: "border border-gray-200 rounded-lg p-4 mb-4 last:mb-0"
                              }, [
                                createVNode("div", { class: "flex justify-between items-start mb-3" }, [
                                  createVNode("div", null, [
                                    createVNode("h5", { class: "font-semibold text-gray-900 flex items-center" }, [
                                      createVNode("span", { class: "inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2 bg-blue-100 text-blue-800" }, " Main "),
                                      createTextVNode(" " + toDisplayString(invoice.invoice_number), 1)
                                    ]),
                                    createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(invoice.description || "MainInvoice"), 1)
                                  ]),
                                  createVNode("div", { class: "text-right" }, [
                                    createVNode("p", { class: "font-semibold text-gray-900" }, toDisplayString(formatCurrency(invoice.total_amount || 0)), 1),
                                    createVNode("span", {
                                      class: ["inline-flex items-center px-2 py-1 rounded-full text-xs font-medium", getInvoiceStatusColor(invoice.status)]
                                    }, toDisplayString(getInvoiceStatusLabel(invoice.status)), 3)
                                  ])
                                ]),
                                createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm" }, [
                                  createVNode("div", null, [
                                    createVNode("span", { class: "text-gray-500" }, "Date:"),
                                    createVNode("span", { class: "ml-1 text-gray-900" }, toDisplayString(formatDate(invoice.invoice_date)), 1)
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("span", { class: "text-gray-500" }, "Customer:"),
                                    createVNode("span", { class: "ml-1 text-gray-900" }, toDisplayString(invoice.customer_name || __props.salesOrder.customer), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "mt-3 flex space-x-2" }, [
                                  createVNode("a", {
                                    href: _ctx.route("admin-keuangan.invoices.print", invoice.id),
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
                                  ], 8, ["href"]),
                                  createVNode(unref(Link), {
                                    href: _ctx.route("admin-keuangan.invoices.show", invoice.id),
                                    class: "inline-flex items-center px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                                  }, {
                                    default: withCtx(() => [
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
                                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        }),
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        })
                                      ])),
                                      createTextVNode(" View ")
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ])
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true),
                          __props.salesOrder.invoices && __props.salesOrder.invoices.filter((inv) => inv.invoice_type === "reimbursement").length > 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mt-6"
                          }, [
                            createVNode("h4", { class: "text-md font-semibold text-gray-800 mb-4" }, "Reimbursement Invoices"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrder.invoices.filter((inv) => inv.invoice_type === "reimbursement"), (invoice) => {
                              return openBlock(), createBlock("div", {
                                key: "reimb-" + invoice.id,
                                class: "border border-gray-200 rounded-lg p-4 mb-4 last:mb-0"
                              }, [
                                createVNode("div", { class: "flex justify-between items-start mb-3" }, [
                                  createVNode("div", null, [
                                    createVNode("h5", { class: "font-semibold text-gray-900 flex items-center" }, [
                                      createVNode("span", { class: "inline-flex items-center px-2 py-1 rounded text-xs font-medium mr-2 bg-orange-100 text-orange-800" }, " Reimbursement "),
                                      createTextVNode(" " + toDisplayString(invoice.invoice_number), 1)
                                    ]),
                                    createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(invoice.description || "Reimbursement Invoice"), 1)
                                  ]),
                                  createVNode("div", { class: "text-right" }, [
                                    createVNode("p", { class: "font-semibold text-gray-900" }, toDisplayString(formatCurrency(invoice.total_amount || 0)), 1),
                                    createVNode("span", {
                                      class: ["inline-flex items-center px-2 py-1 rounded-full text-xs font-medium", getInvoiceStatusColor(invoice.status)]
                                    }, toDisplayString(getInvoiceStatusLabel(invoice.status)), 3)
                                  ])
                                ]),
                                createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm" }, [
                                  createVNode("div", null, [
                                    createVNode("span", { class: "text-gray-500" }, "Date:"),
                                    createVNode("span", { class: "ml-1 text-gray-900" }, toDisplayString(formatDate(invoice.invoice_date)), 1)
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("span", { class: "text-gray-500" }, "Customer:"),
                                    createVNode("span", { class: "ml-1 text-gray-900" }, toDisplayString(invoice.customer_name || __props.salesOrder.customer), 1)
                                  ])
                                ]),
                                createVNode("div", { class: "mt-3 flex space-x-2" }, [
                                  createVNode("a", {
                                    href: _ctx.route("admin-keuangan.invoices.print", invoice.id),
                                    target: "_blank",
                                    class: "inline-flex items-center px-3 py-1 bg-orange-600 text-white text-sm rounded hover:bg-orange-700 transition-colors"
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
                                    createTextVNode(" Download PDF -R ")
                                  ], 8, ["href"]),
                                  createVNode(unref(Link), {
                                    href: _ctx.route("admin-keuangan.invoices.show", invoice.id),
                                    class: "inline-flex items-center px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                                  }, {
                                    default: withCtx(() => [
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
                                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        }),
                                        createVNode("path", {
                                          "stroke-linecap": "round",
                                          "stroke-linejoin": "round",
                                          "stroke-width": "2",
                                          d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        })
                                      ])),
                                      createTextVNode(" View ")
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])
                                ])
                              ]);
                            }), 128))
                          ])) : createCommentVNode("", true),
                          !__props.salesOrder.invoices || __props.salesOrder.invoices.length === 0 ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "text-center py-8"
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
                              createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-2" }, "Belum ada invoice"),
                              createVNode("p", { class: "text-sm text-gray-500 max-w-sm" }, 'Belum ada invoice yang dibuat untuk sales order ini. Klik tombol "Buat Invoice" untuk memulai.')
                            ])
                          ])) : createCommentVNode("", true)
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Status")
                        ]),
                        createVNode("div", { class: "p-6" }, [
                          createVNode("span", {
                            class: ["inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center", getStatusColor(__props.salesOrder.status)]
                          }, toDisplayString(getStatusLabel(__props.salesOrder.status || "released")), 3)
                        ])
                      ]),
                      createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Rilis")
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
                      createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                          createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "System Information")
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
                ])) : createCommentVNode("", true),
                showInvoiceCreateModal.value ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                }, [
                  createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }, [
                    createVNode("div", { class: "flex items-center mb-4" }, [
                      createVNode("div", { class: "w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5 text-blue-600",
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
                      createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Pilih Tipe Invoice")
                    ]),
                    createVNode("div", { class: "mb-6" }, [
                      createVNode("p", { class: "text-gray-600 mb-4" }, "Pilih tipe invoice yang ingin dibuat untuk sales order ini:"),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode("label", { class: "flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" }, [
                          withDirectives(createVNode("input", {
                            type: "radio",
                            name: "invoice_type",
                            value: "main",
                            "onUpdate:modelValue": ($event) => selectedInvoiceType.value = $event,
                            class: "mr-3"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelRadio, selectedInvoiceType.value]
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "font-medium text-gray-900" }, "Main Invoice"),
                            createVNode("div", { class: "text-sm text-gray-600" }, "Invoice utama untuk tagihan customer")
                          ])
                        ]),
                        createVNode("label", { class: "flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer" }, [
                          withDirectives(createVNode("input", {
                            type: "radio",
                            name: "invoice_type",
                            value: "reimbursement",
                            "onUpdate:modelValue": ($event) => selectedInvoiceType.value = $event,
                            class: "mr-3"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelRadio, selectedInvoiceType.value]
                          ]),
                          createVNode("div", null, [
                            createVNode("div", { class: "font-medium text-gray-900" }, "Reimbursement Invoice"),
                            createVNode("div", { class: "text-sm text-gray-600" }, "Invoice untuk penggantian biaya pihak ketiga ")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3" }, [
                      createVNode("button", {
                        onClick: closeInvoiceCreateModal,
                        class: "px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      }, " Batal "),
                      createVNode("button", {
                        onClick: createInvoice,
                        disabled: !selectedInvoiceType.value,
                        class: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      }, " Lanjutkan ", 8, ["disabled"])
                    ])
                  ])
                ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/SalesOrders/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-abd77106"]]);
export {
  Show as default
};
