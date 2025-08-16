import { ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-_mw6ZYQZ.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-CwaJcSy0.js";
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-42631a3b${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-blue-200" data-v-42631a3b${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-42631a3b${_scopeId}><div class="flex items-center" data-v-42631a3b${_scopeId}><div class="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4" data-v-42631a3b${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-42631a3b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-42631a3b${_scopeId}></path></svg></div><div data-v-42631a3b${_scopeId}><h2 class="text-2xl font-bold text-blue-800" data-v-42631a3b${_scopeId}> Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h2><p class="text-blue-600" data-v-42631a3b${_scopeId}> Review dan kelola sales order dari CS </p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-42631a3b${_scopeId}>`);
            if (__props.salesOrder.status === "released") {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" data-v-42631a3b${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-42631a3b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-42631a3b${_scopeId}></path></svg> Setujui </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrder.status === "released") {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-42631a3b${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-42631a3b${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-v-42631a3b${_scopeId}></path></svg> Tolak </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-42631a3b${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-42631a3b${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-42631a3b${_scopeId}><div class="lg:col-span-2 space-y-6" data-v-42631a3b${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-42631a3b${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-42631a3b${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-42631a3b${_scopeId}>Informasi Sales Order</h3></div><div class="p-6 space-y-4" data-v-42631a3b${_scopeId}><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>ORDER NUMB</label><p class="text-gray-900 font-semibold" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.order_number)}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>CUSTOMER</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.customer)}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>SHIPPER</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.shipper || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>BL/AWB</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.bl_awb || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>LINER</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.liner || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>VESSEL</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.vessel || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>ETA</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.eta ? formatDate(__props.salesOrder.eta) : "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>AJU</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.aju || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>SPPB DATE</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.sppb_date ? formatDate(__props.salesOrder.sppb_date) : "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>SHIPMENT TYPE</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.shipment_type || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>POL</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.pol || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>POD</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.pod || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>GUDANG/UTC</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.gudang_utc || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>PARTY/LCL</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.party_lcl || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>PREPARED BY</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.prepared_by || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>EXCHANGE RATE</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.exchange_rate || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>JENIS BIAYA</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.jenis_biaya || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>BUYING</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.buying ? formatCurrency(__props.salesOrder.buying) : "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>SELLING</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.selling ? formatCurrency(__props.salesOrder.selling) : "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>REVENUE</label><p class="text-gray-900 font-semibold text-lg" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.revenue ? formatCurrency(__props.salesOrder.revenue) : "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>REMARKS</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.remarks || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>GOODS</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.goods || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>CONTAINER NO</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.container_no || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>INVOICE NUMB</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_number || "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>INVOICE DATE</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.invoice_date ? formatDate(__props.salesOrder.invoice_date) : "-")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>T.O.P</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(__props.salesOrder.top || "-")}</p></div></div></div></div><div class="space-y-6" data-v-42631a3b${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-42631a3b${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-42631a3b${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-42631a3b${_scopeId}>Status</h3></div><div class="p-6" data-v-42631a3b${_scopeId}><span class="${ssrRenderClass([getStatusColor(__props.salesOrder.status), "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium w-full justify-center"])}" data-v-42631a3b${_scopeId}>${ssrInterpolate(getStatusLabel(__props.salesOrder.status || "released"))}</span></div></div><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-42631a3b${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-42631a3b${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-42631a3b${_scopeId}>Informasi Rilis</h3></div><div class="p-6 space-y-4" data-v-42631a3b${_scopeId}><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>Dirilis Oleh</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(((_a = __props.salesOrder.released_by) == null ? void 0 : _a.name) || "Unknown")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>Tanggal Rilis</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.released_at))}</p></div></div></div><div class="bg-white rounded-lg shadow-sm border border-blue-200 overflow-hidden" data-v-42631a3b${_scopeId}><div class="px-6 py-4 border-b border-blue-200 bg-blue-50" data-v-42631a3b${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-42631a3b${_scopeId}>System Information</h3></div><div class="p-6 space-y-4" data-v-42631a3b${_scopeId}><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>Created By</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(((_b = __props.salesOrder.creator) == null ? void 0 : _b.name) || "Unknown")}</p></div><div data-v-42631a3b${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-42631a3b${_scopeId}>Created At</label><p class="text-gray-900" data-v-42631a3b${_scopeId}>${ssrInterpolate(formatDateTime(__props.salesOrder.created_at))}</p></div></div></div></div></div></div>`);
            if (showRejectModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-42631a3b${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-42631a3b${_scopeId}><h3 class="text-lg font-semibold mb-4" data-v-42631a3b${_scopeId}>Tolak Sales Order</h3><p class="text-gray-600 mb-4" data-v-42631a3b${_scopeId}>Berikan alasan penolakan:</p><textarea class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" rows="4" placeholder="Masukkan alasan penolakan..." data-v-42631a3b${_scopeId}>${ssrInterpolate(rejectionReason.value)}</textarea><div class="flex justify-end space-x-3 mt-4" data-v-42631a3b${_scopeId}><button class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors" data-v-42631a3b${_scopeId}> Batal </button><button${ssrIncludeBooleanAttr(!rejectionReason.value.trim()) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-42631a3b${_scopeId}> Tolak </button></div></div></div>`);
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
                        ])
                      ])
                    ])
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
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-42631a3b"]]);
export {
  Show as default
};
