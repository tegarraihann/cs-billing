import { reactive, ref, watch, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withDirectives, vModelText, vModelSelect, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-BY-IIBq-.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-v1m7YKEO.js";
import "lucide-vue-next";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    salesOrders: Object,
    filters: Object
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const form = reactive({
      search: ((_a = props.filters) == null ? void 0 : _a.search) || "",
      status: ((_b = props.filters) == null ? void 0 : _b.status) || ""
    });
    const search = () => {
      const params = {};
      if (form.search) params.search = form.search;
      if (form.status) params.status = form.status;
      router.get(route("admin-cs.sales-orders.index"), params, {
        preserveState: true,
        replace: true
      });
    };
    const showReleaseDialog = ref(false);
    const showDeleteDialog = ref(false);
    const currentSalesOrderId = ref(null);
    const releaseSalesOrder = (salesOrderId) => {
      currentSalesOrderId.value = salesOrderId;
      showReleaseDialog.value = true;
    };
    const confirmRelease = () => {
      if (currentSalesOrderId.value) {
        router.post(route("admin-cs.sales-orders.release", currentSalesOrderId.value), {}, {
          onSuccess: () => {
            router.get(route("admin-cs.sales-orders.index"), {
              search: form.search,
              status: form.status
            }, {
              preserveState: true,
              replace: true
            });
          },
          onError: (errors) => {
            alert("Terjadi kesalahan saat merilis sales order: " + Object.values(errors).join(", "));
          }
        });
      }
      showReleaseDialog.value = false;
      currentSalesOrderId.value = null;
    };
    const cancelRelease = () => {
      showReleaseDialog.value = false;
      currentSalesOrderId.value = null;
    };
    const deleteSalesOrder = (salesOrderId) => {
      currentSalesOrderId.value = salesOrderId;
      showDeleteDialog.value = true;
    };
    const confirmDelete = () => {
      if (currentSalesOrderId.value) {
        router.delete(route("admin-cs.sales-orders.destroy", currentSalesOrderId.value), {
          onSuccess: () => {
            router.get(route("admin-cs.sales-orders.index"), {
              search: form.search,
              status: form.status
            }, {
              preserveState: true,
              replace: true
            });
          },
          onError: (errors) => {
            alert("Terjadi kesalahan saat menghapus sales order: " + Object.values(errors).join(", "));
          }
        });
      }
      showDeleteDialog.value = false;
      currentSalesOrderId.value = null;
    };
    const cancelDelete = () => {
      showDeleteDialog.value = false;
      currentSalesOrderId.value = null;
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
    watch(
      () => form.search,
      () => {
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
          search();
        }, 500);
      }
    );
    watch(
      () => form.status,
      () => {
        search();
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-d2a3ce5f${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-d2a3ce5f${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-d2a3ce5f${_scopeId}><div data-v-d2a3ce5f${_scopeId}><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-d2a3ce5f${_scopeId}> Manajemen Sales Order </h2><p class="text-sage-600" data-v-d2a3ce5f${_scopeId}> Kelola dokumen sales order dan penawaran harga </p></div><div class="mt-4 sm:mt-0" data-v-d2a3ce5f${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d2a3ce5f${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-d2a3ce5f${_scopeId2}></path></svg> Buat Sales Order `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 mr-2",
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
                    createTextVNode(" Buat Sales Order ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-d2a3ce5f${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-d2a3ce5f${_scopeId}><div data-v-d2a3ce5f${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d2a3ce5f${_scopeId}>Cari Data</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari SO Number, Customer, Consignee..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d2a3ce5f${_scopeId}></div><div data-v-d2a3ce5f${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-d2a3ce5f${_scopeId}>Status</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-d2a3ce5f${_scopeId}><option value="" data-v-d2a3ce5f${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "") : ssrLooseEqual(form.status, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="draft" data-v-d2a3ce5f${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "draft") : ssrLooseEqual(form.status, "draft")) ? " selected" : ""}${_scopeId}>Draft</option><option value="sent" data-v-d2a3ce5f${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "sent") : ssrLooseEqual(form.status, "sent")) ? " selected" : ""}${_scopeId}>Terkirim</option><option value="confirmed" data-v-d2a3ce5f${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "confirmed") : ssrLooseEqual(form.status, "confirmed")) ? " selected" : ""}${_scopeId}>Dikonfirmasi</option><option value="cancelled" data-v-d2a3ce5f${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "cancelled") : ssrLooseEqual(form.status, "cancelled")) ? " selected" : ""}${_scopeId}>Dibatalkan</option></select></div><div class="flex items-end" data-v-d2a3ce5f${_scopeId}><button class="w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-d2a3ce5f${_scopeId}> Cari </button></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-d2a3ce5f${_scopeId}><div class="px-6 py-4 border-b border-sage-200" data-v-d2a3ce5f${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-d2a3ce5f${_scopeId}>Daftar Sales Order</h3><p class="text-sm text-sage-600 mt-1" data-v-d2a3ce5f${_scopeId}> Total: ${ssrInterpolate(((_a2 = __props.salesOrders) == null ? void 0 : _a2.total) || 0)} data </p></div><div class="overflow-x-auto" data-v-d2a3ce5f${_scopeId}><table class="w-full" data-v-d2a3ce5f${_scopeId}><thead class="bg-sage-50" data-v-d2a3ce5f${_scopeId}><tr data-v-d2a3ce5f${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-d2a3ce5f${_scopeId}> Order Number </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-d2a3ce5f${_scopeId}> Customer </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-d2a3ce5f${_scopeId}> Shipper </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-d2a3ce5f${_scopeId}> Shipment Type </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-d2a3ce5f${_scopeId}> Commodity </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-d2a3ce5f${_scopeId}> QTY </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-d2a3ce5f${_scopeId}> Container No </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-d2a3ce5f${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-d2a3ce5f${_scopeId}> Aksi </th></tr></thead><tbody class="divide-y divide-sage-200" data-v-d2a3ce5f${_scopeId}><!--[-->`);
            ssrRenderList(__props.salesOrders.data, (salesOrder) => {
              _push2(`<tr class="hover:bg-sage-50 transition-colors" data-v-d2a3ce5f${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-900" data-v-d2a3ce5f${_scopeId}>${ssrInterpolate(salesOrder.order_number || salesOrder.so_number)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-d2a3ce5f${_scopeId}><div data-v-d2a3ce5f${_scopeId}><div class="font-medium" data-v-d2a3ce5f${_scopeId}>${ssrInterpolate(salesOrder.customer || salesOrder.customer_name)}</div>`);
              if (salesOrder.customer_code) {
                _push2(`<div class="text-gray-500" data-v-d2a3ce5f${_scopeId}>${ssrInterpolate(salesOrder.customer_code)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-6 py-4 text-sm text-gray-900" data-v-d2a3ce5f${_scopeId}>${ssrInterpolate(salesOrder.shipper || salesOrder.consignee_shipper || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-d2a3ce5f${_scopeId}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-v-d2a3ce5f${_scopeId}>${ssrInterpolate(salesOrder.shipment_type || "-")}</span></td><td class="px-6 py-4 text-sm text-gray-900" data-v-d2a3ce5f${_scopeId}><div class="max-w-32 truncate"${ssrRenderAttr("title", salesOrder.commodity)} data-v-d2a3ce5f${_scopeId}>${ssrInterpolate(salesOrder.commodity || salesOrder.goods || "-")}</div></td><td class="px-6 py-4 text-sm text-gray-900" data-v-d2a3ce5f${_scopeId}>${ssrInterpolate(salesOrder.qty || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-d2a3ce5f${_scopeId}>`);
              if (salesOrder.container_no && Array.isArray(salesOrder.container_no)) {
                _push2(`<div class="space-y-1" data-v-d2a3ce5f${_scopeId}><!--[-->`);
                ssrRenderList(salesOrder.container_no.slice(0, 2), (container, index) => {
                  _push2(`<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1" data-v-d2a3ce5f${_scopeId}>${ssrInterpolate(container)}</span>`);
                });
                _push2(`<!--]-->`);
                if (salesOrder.container_no.length > 2) {
                  _push2(`<div class="text-xs text-gray-500" data-v-d2a3ce5f${_scopeId}> +${ssrInterpolate(salesOrder.container_no.length - 2)} lainnya </div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else if (salesOrder.container_no) {
                _push2(`<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full" data-v-d2a3ce5f${_scopeId}>${ssrInterpolate(salesOrder.container_no)}</span>`);
              } else {
                _push2(`<span class="text-gray-500" data-v-d2a3ce5f${_scopeId}>-</span>`);
              }
              _push2(`</td><td class="px-6 py-4 text-sm" data-v-d2a3ce5f${_scopeId}><span class="${ssrRenderClass([getStatusColor(salesOrder.status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-d2a3ce5f${_scopeId}>${ssrInterpolate(getStatusLabel(salesOrder.status))}</span></td><td class="px-6 py-4 text-sm font-medium" data-v-d2a3ce5f${_scopeId}><div class="flex items-center space-x-2" data-v-d2a3ce5f${_scopeId}><button${ssrIncludeBooleanAttr(salesOrder.status === "released" || salesOrder.status === "confirmed" || salesOrder.status === "approved" || salesOrder.status === "rejected") ? " disabled" : ""} class="${ssrRenderClass([salesOrder.status === "released" || salesOrder.status === "confirmed" || salesOrder.status === "approved" || salesOrder.status === "rejected" ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-blue-600 hover:text-blue-900 hover:bg-blue-100", "inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors"])}"${ssrRenderAttr("title", salesOrder.status === "released" || salesOrder.status === "confirmed" || salesOrder.status === "approved" || salesOrder.status === "rejected" ? "Sudah Diproses" : "Rilis Sales Order")} data-v-d2a3ce5f${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d2a3ce5f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" data-v-d2a3ce5f${_scopeId}></path></svg></button>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-cs.sales-orders.show", salesOrder.id),
                class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
                title: "Lihat Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d2a3ce5f${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-d2a3ce5f${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-d2a3ce5f${_scopeId2}></path></svg>`);
                  } else {
                    return [
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
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (salesOrder.status === "draft") {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("admin-cs.sales-orders.edit", salesOrder.id),
                  class: "inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full transition-colors",
                  title: "Edit"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d2a3ce5f${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-d2a3ce5f${_scopeId2}></path></svg>`);
                    } else {
                      return [
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
                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          })
                        ]))
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<span class="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-100 rounded-full cursor-not-allowed" title="Tidak dapat diedit (Sales Order sudah dirilis)" data-v-d2a3ce5f${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d2a3ce5f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-d2a3ce5f${_scopeId}></path></svg></span>`);
              }
              if (salesOrder.status === "draft") {
                _push2(`<button class="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors" title="Hapus" data-v-d2a3ce5f${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d2a3ce5f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d2a3ce5f${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<span class="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-100 rounded-full cursor-not-allowed" title="Tidak dapat dihapus (Sales Order sudah dirilis)" data-v-d2a3ce5f${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d2a3ce5f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d2a3ce5f${_scopeId}></path></svg></span>`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!__props.salesOrders.data || __props.salesOrders.data.length === 0) {
              _push2(`<tr data-v-d2a3ce5f${_scopeId}><td colspan="8" class="px-6 py-8 text-center text-gray-500" data-v-d2a3ce5f${_scopeId}><div class="flex flex-col items-center" data-v-d2a3ce5f${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-d2a3ce5f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-d2a3ce5f${_scopeId}></path></svg><p class="text-lg font-medium mb-2" data-v-d2a3ce5f${_scopeId}>Tidak ada data</p><p class="text-sm text-gray-400" data-v-d2a3ce5f${_scopeId}> Belum ada sales order yang tersedia </p></div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.salesOrders.last_page > 1) {
              _push2(`<div class="px-6 py-4 border-t border-sage-200" data-v-d2a3ce5f${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.salesOrders }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: showReleaseDialog.value,
              type: "confirm",
              title: "Konfirmasi Rilis Sales Order",
              message: "Apakah Anda yakin ingin merilis sales order ini? Sales order yang sudah dirilis akan dikirim ke admin keuangan dan tidak dapat diubah lagi.",
              "confirm-text": "Ya, Rilis",
              "cancel-text": "Batal",
              onConfirm: confirmRelease,
              onCancel: cancelRelease,
              onClose: cancelRelease
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(AlertDialog, {
              show: showDeleteDialog.value,
              type: "confirm",
              title: "Konfirmasi Hapus Sales Order",
              message: "Apakah Anda yakin ingin menghapus sales order ini? Tindakan ini tidak dapat dibatalkan.",
              "confirm-text": "Ya, Hapus",
              "cancel-text": "Batal",
              onConfirm: confirmDelete,
              onCancel: cancelDelete,
              onClose: cancelDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800 mb-2" }, " Manajemen Sales Order "),
                      createVNode("p", { class: "text-sage-600" }, " Kelola dokumen sales order dan penawaran harga ")
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.sales-orders.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5 mr-2",
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
                          createTextVNode(" Buat Sales Order ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Cari Data"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => form.search = $event,
                        type: "text",
                        placeholder: "Cari SO Number, Customer, Consignee...",
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, form.search]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Status"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => form.status = $event,
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, [
                        createVNode("option", { value: "" }, "Semua Status"),
                        createVNode("option", { value: "draft" }, "Draft"),
                        createVNode("option", { value: "sent" }, "Terkirim"),
                        createVNode("option", { value: "confirmed" }, "Dikonfirmasi"),
                        createVNode("option", { value: "cancelled" }, "Dibatalkan")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, form.status]
                      ])
                    ]),
                    createVNode("div", { class: "flex items-end" }, [
                      createVNode("button", {
                        onClick: search,
                        class: "w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                      }, " Cari ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Daftar Sales Order"),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Total: " + toDisplayString(((_b2 = __props.salesOrders) == null ? void 0 : _b2.total) || 0) + " data ", 1)
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Order Number "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Customer "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Shipper "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Shipment Type "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Commodity "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " QTY "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Container No "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Status "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Aksi ")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrders.data, (salesOrder) => {
                          return openBlock(), createBlock("tr", {
                            key: salesOrder.id,
                            class: "hover:bg-sage-50 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-900" }, toDisplayString(salesOrder.order_number || salesOrder.so_number), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                              createVNode("div", null, [
                                createVNode("div", { class: "font-medium" }, toDisplayString(salesOrder.customer || salesOrder.customer_name), 1),
                                salesOrder.customer_code ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-gray-500"
                                }, toDisplayString(salesOrder.customer_code), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(salesOrder.shipper || salesOrder.consignee_shipper || "-"), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                              createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" }, toDisplayString(salesOrder.shipment_type || "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                              createVNode("div", {
                                class: "max-w-32 truncate",
                                title: salesOrder.commodity
                              }, toDisplayString(salesOrder.commodity || salesOrder.goods || "-"), 9, ["title"])
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(salesOrder.qty || "-"), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                              salesOrder.container_no && Array.isArray(salesOrder.container_no) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "space-y-1"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(salesOrder.container_no.slice(0, 2), (container, index) => {
                                  return openBlock(), createBlock("span", {
                                    key: index,
                                    class: "inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1"
                                  }, toDisplayString(container), 1);
                                }), 128)),
                                salesOrder.container_no.length > 2 ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-xs text-gray-500"
                                }, " +" + toDisplayString(salesOrder.container_no.length - 2) + " lainnya ", 1)) : createCommentVNode("", true)
                              ])) : salesOrder.container_no ? (openBlock(), createBlock("span", {
                                key: 1,
                                class: "inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                              }, toDisplayString(salesOrder.container_no), 1)) : (openBlock(), createBlock("span", {
                                key: 2,
                                class: "text-gray-500"
                              }, "-"))
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm" }, [
                              createVNode("span", {
                                class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusColor(salesOrder.status)]
                              }, toDisplayString(getStatusLabel(salesOrder.status)), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm font-medium" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => releaseSalesOrder(salesOrder.id),
                                  disabled: salesOrder.status === "released" || salesOrder.status === "confirmed" || salesOrder.status === "approved" || salesOrder.status === "rejected",
                                  class: ["inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors", salesOrder.status === "released" || salesOrder.status === "confirmed" || salesOrder.status === "approved" || salesOrder.status === "rejected" ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-blue-600 hover:text-blue-900 hover:bg-blue-100"],
                                  title: salesOrder.status === "released" || salesOrder.status === "confirmed" || salesOrder.status === "approved" || salesOrder.status === "rejected" ? "Sudah Diproses" : "Rilis Sales Order"
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
                                      d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                    })
                                  ]))
                                ], 10, ["onClick", "disabled", "title"]),
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin-cs.sales-orders.show", salesOrder.id),
                                  class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
                                  title: "Lihat Detail"
                                }, {
                                  default: withCtx(() => [
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
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                salesOrder.status === "draft" ? (openBlock(), createBlock(unref(Link), {
                                  key: 0,
                                  href: _ctx.route("admin-cs.sales-orders.edit", salesOrder.id),
                                  class: "inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full transition-colors",
                                  title: "Edit"
                                }, {
                                  default: withCtx(() => [
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
                                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      })
                                    ]))
                                  ]),
                                  _: 2
                                }, 1032, ["href"])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-100 rounded-full cursor-not-allowed",
                                  title: "Tidak dapat diedit (Sales Order sudah dirilis)"
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
                                      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    })
                                  ]))
                                ])),
                                salesOrder.status === "draft" ? (openBlock(), createBlock("button", {
                                  key: 2,
                                  onClick: ($event) => deleteSalesOrder(salesOrder.id),
                                  class: "inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors",
                                  title: "Hapus"
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
                                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    })
                                  ]))
                                ], 8, ["onClick"])) : (openBlock(), createBlock("span", {
                                  key: 3,
                                  class: "inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-100 rounded-full cursor-not-allowed",
                                  title: "Tidak dapat dihapus (Sales Order sudah dirilis)"
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
                                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    })
                                  ]))
                                ]))
                              ])
                            ])
                          ]);
                        }), 128)),
                        !__props.salesOrders.data || __props.salesOrders.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "8",
                            class: "px-6 py-8 text-center text-gray-500"
                          }, [
                            createVNode("div", { class: "flex flex-col items-center" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-12 h-12 text-gray-300 mb-4",
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
                              ])),
                              createVNode("p", { class: "text-lg font-medium mb-2" }, "Tidak ada data"),
                              createVNode("p", { class: "text-sm text-gray-400" }, " Belum ada sales order yang tersedia ")
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  __props.salesOrders.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "px-6 py-4 border-t border-sage-200"
                  }, [
                    createVNode(Pagination, { data: __props.salesOrders }, null, 8, ["data"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(AlertDialog, {
                show: showReleaseDialog.value,
                type: "confirm",
                title: "Konfirmasi Rilis Sales Order",
                message: "Apakah Anda yakin ingin merilis sales order ini? Sales order yang sudah dirilis akan dikirim ke admin keuangan dan tidak dapat diubah lagi.",
                "confirm-text": "Ya, Rilis",
                "cancel-text": "Batal",
                onConfirm: confirmRelease,
                onCancel: cancelRelease,
                onClose: cancelRelease
              }, null, 8, ["show"]),
              createVNode(AlertDialog, {
                show: showDeleteDialog.value,
                type: "confirm",
                title: "Konfirmasi Hapus Sales Order",
                message: "Apakah Anda yakin ingin menghapus sales order ini? Tindakan ini tidak dapat dibatalkan.",
                "confirm-text": "Ya, Hapus",
                "cancel-text": "Batal",
                onConfirm: confirmDelete,
                onCancel: cancelDelete,
                onClose: cancelDelete
              }, null, 8, ["show"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/SalesOrders/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d2a3ce5f"]]);
export {
  Index as default
};
