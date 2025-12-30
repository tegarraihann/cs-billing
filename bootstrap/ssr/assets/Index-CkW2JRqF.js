import { reactive, ref, onBeforeUnmount, withCtx, unref, createVNode, createTextVNode, withDirectives, vModelText, vModelSelect, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { debounce } from "lodash";
import { A as AdminCSLayout } from "./AdminCSLayout-dOlwp0Z4.js";
import { P as Pagination } from "./Pagination-JgWO_U2H.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { Plus, Send, Eye, Pencil, Trash2, FileText } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DsyuYSGu.js";
import "./useIdleTimeout-BVnZv5Lp.js";
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
    const applyFilters = () => {
      const params = {};
      if (form.search) params.search = form.search;
      if (form.status) params.status = form.status;
      router.get(route("admin-cs.sales-orders.index"), params, {
        preserveState: true,
        replace: true
      });
    };
    const debouncedSearch = debounce(applyFilters, 300);
    const onStatusChange = () => applyFilters();
    const showReleaseDialog = ref(false);
    const showDeleteDialog = ref(false);
    const currentSalesOrderId = ref(null);
    const processedStatuses = ["released", "confirmed", "approved", "rejected"];
    const isProcessedStatus = (status) => processedStatuses.includes(status);
    const releaseSalesOrder = (salesOrderId) => {
      currentSalesOrderId.value = salesOrderId;
      showReleaseDialog.value = true;
    };
    const confirmRelease = () => {
      if (!currentSalesOrderId.value) return;
      router.post(route("admin-cs.sales-orders.release", currentSalesOrderId.value), {}, {
        onSuccess: () => applyFilters(),
        onError: (errors) => {
          alert("Terjadi kesalahan saat merilis Shipping Order: " + Object.values(errors).join(", "));
        },
        onFinish: () => {
          showReleaseDialog.value = false;
          currentSalesOrderId.value = null;
        }
      });
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
      if (!currentSalesOrderId.value) return;
      router.delete(route("admin-cs.sales-orders.destroy", currentSalesOrderId.value), {
        onSuccess: () => applyFilters(),
        onError: (errors) => {
          alert("Terjadi kesalahan saat menghapus Shipping Order: " + Object.values(errors).join(", "));
        },
        onFinish: () => {
          showDeleteDialog.value = false;
          currentSalesOrderId.value = null;
        }
      });
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
    onBeforeUnmount(() => {
      debouncedSearch.cancel();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminCSLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`<div class="py-6" data-v-e5af76ef${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-e5af76ef${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6" data-v-e5af76ef${_scopeId}><div data-v-e5af76ef${_scopeId}><h1 class="text-2xl font-bold text-gray-900" data-v-e5af76ef${_scopeId}>Manajemen Shipping Order</h1><p class="mt-1 text-sm text-gray-600" data-v-e5af76ef${_scopeId}>Kelola dokumen Shipping Order dan penawaran harga</p></div><div class="mt-4 sm:mt-0 flex space-x-2" data-v-e5af76ef${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 hover:bg-sage-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Buat Shipping Order `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Buat Shipping Order ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-e5af76ef${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-e5af76ef${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-e5af76ef${_scopeId}>Filter Data</h3><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-e5af76ef${_scopeId}><div class="md:col-span-2" data-v-e5af76ef${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-e5af76ef${_scopeId}>Cari Data</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari SO Number, Customer, Consignee..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-e5af76ef${_scopeId}></div><div data-v-e5af76ef${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-e5af76ef${_scopeId}>Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-e5af76ef${_scopeId}><option value="" data-v-e5af76ef${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "") : ssrLooseEqual(form.status, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="draft" data-v-e5af76ef${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "draft") : ssrLooseEqual(form.status, "draft")) ? " selected" : ""}${_scopeId}>Draft</option><option value="sent" data-v-e5af76ef${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "sent") : ssrLooseEqual(form.status, "sent")) ? " selected" : ""}${_scopeId}>Terkirim</option><option value="confirmed" data-v-e5af76ef${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "confirmed") : ssrLooseEqual(form.status, "confirmed")) ? " selected" : ""}${_scopeId}>Dikonfirmasi</option><option value="cancelled" data-v-e5af76ef${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "cancelled") : ssrLooseEqual(form.status, "cancelled")) ? " selected" : ""}${_scopeId}>Dibatalkan</option></select></div><div class="flex items-end" data-v-e5af76ef${_scopeId}><button class="w-full px-4 py-2 bg-sage-800 text-white rounded-md transition-colors hover:bg-sage-900" data-v-e5af76ef${_scopeId}> Cari </button></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md" data-v-e5af76ef${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-e5af76ef${_scopeId}><div class="sm:flex sm:items-center sm:justify-between mb-4" data-v-e5af76ef${_scopeId}><div data-v-e5af76ef${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900" data-v-e5af76ef${_scopeId}>Daftar Shipping Order</h3><p class="mt-1 text-sm text-gray-600" data-v-e5af76ef${_scopeId}>Total: ${ssrInterpolate(((_a2 = __props.salesOrders) == null ? void 0 : _a2.total) || 0)} data</p></div></div><div class="overflow-x-auto" data-v-e5af76ef${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-e5af76ef${_scopeId}><thead class="bg-gray-50" data-v-e5af76ef${_scopeId}><tr data-v-e5af76ef${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-e5af76ef${_scopeId}> Order Number </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-e5af76ef${_scopeId}> Customer </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-e5af76ef${_scopeId}> Shipper </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-e5af76ef${_scopeId}> Shipment Type </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-e5af76ef${_scopeId}> Commodity </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-e5af76ef${_scopeId}> QTY </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-e5af76ef${_scopeId}> Container No </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-e5af76ef${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-e5af76ef${_scopeId}> Aksi </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-e5af76ef${_scopeId}><!--[-->`);
            ssrRenderList(__props.salesOrders.data, (salesOrder) => {
              _push2(`<tr class="hover:bg-gray-50 transition-colors" data-v-e5af76ef${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-900" data-v-e5af76ef${_scopeId}>${ssrInterpolate(salesOrder.order_number || salesOrder.so_number)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-e5af76ef${_scopeId}><div data-v-e5af76ef${_scopeId}><div class="font-medium" data-v-e5af76ef${_scopeId}>${ssrInterpolate(salesOrder.customer || salesOrder.customer_name)}</div>`);
              if (salesOrder.customer_code) {
                _push2(`<div class="text-gray-500" data-v-e5af76ef${_scopeId}>${ssrInterpolate(salesOrder.customer_code)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-6 py-4 text-sm text-gray-900" data-v-e5af76ef${_scopeId}>${ssrInterpolate(salesOrder.shipper || salesOrder.consignee_shipper || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-e5af76ef${_scopeId}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-v-e5af76ef${_scopeId}>${ssrInterpolate(salesOrder.shipment_type || "-")}</span></td><td class="px-6 py-4 text-sm text-gray-900" data-v-e5af76ef${_scopeId}><div class="max-w-32 truncate"${ssrRenderAttr("title", salesOrder.commodity)} data-v-e5af76ef${_scopeId}>${ssrInterpolate(salesOrder.commodity || salesOrder.goods || "-")}</div></td><td class="px-6 py-4 text-sm text-gray-900" data-v-e5af76ef${_scopeId}>${ssrInterpolate(salesOrder.qty || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-e5af76ef${_scopeId}>`);
              if (salesOrder.container_no && Array.isArray(salesOrder.container_no)) {
                _push2(`<div class="space-y-1" data-v-e5af76ef${_scopeId}><!--[-->`);
                ssrRenderList(salesOrder.container_no.slice(0, 2), (container, index) => {
                  _push2(`<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1" data-v-e5af76ef${_scopeId}>${ssrInterpolate(container)}</span>`);
                });
                _push2(`<!--]-->`);
                if (salesOrder.container_no.length > 2) {
                  _push2(`<div class="text-xs text-gray-500" data-v-e5af76ef${_scopeId}> +${ssrInterpolate(salesOrder.container_no.length - 2)} lainnya </div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else if (salesOrder.container_no) {
                _push2(`<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full" data-v-e5af76ef${_scopeId}>${ssrInterpolate(salesOrder.container_no)}</span>`);
              } else {
                _push2(`<span class="text-gray-500" data-v-e5af76ef${_scopeId}>-</span>`);
              }
              _push2(`</td><td class="px-6 py-4 text-sm" data-v-e5af76ef${_scopeId}><span class="${ssrRenderClass([getStatusColor(salesOrder.status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-e5af76ef${_scopeId}>${ssrInterpolate(getStatusLabel(salesOrder.status))}</span></td><td class="px-6 py-4 text-sm font-medium" data-v-e5af76ef${_scopeId}><div class="flex items-center space-x-2" data-v-e5af76ef${_scopeId}><button${ssrIncludeBooleanAttr(isProcessedStatus(salesOrder.status)) ? " disabled" : ""} class="${ssrRenderClass([isProcessedStatus(salesOrder.status) ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-sage-600 hover:text-sage-900 hover:bg-sage-100", "inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors"])}"${ssrRenderAttr("title", isProcessedStatus(salesOrder.status) ? "Sudah Diproses" : "Rilis Shipping Order")} data-v-e5af76ef${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Send), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`</button>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-cs.sales-orders.show", salesOrder.id),
                class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
                title: "Lihat Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Eye), { class: "w-4 h-4" })
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
                      _push3(ssrRenderComponent(unref(Pencil), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(Pencil), { class: "w-4 h-4" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<span class="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-100 rounded-full cursor-not-allowed" title="Tidak dapat diedit (Shipping Order sudah diproses)" data-v-e5af76ef${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Pencil), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</span>`);
              }
              if (salesOrder.status === "draft") {
                _push2(`<button class="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors" title="Hapus" data-v-e5af76ef${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<span class="inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-100 rounded-full cursor-not-allowed" title="Tidak dapat dihapus (Shipping Order sudah diproses)" data-v-e5af76ef${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</span>`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!__props.salesOrders.data || __props.salesOrders.data.length === 0) {
              _push2(`<tr data-v-e5af76ef${_scopeId}><td colspan="9" class="px-6 py-8 text-center text-gray-500" data-v-e5af76ef${_scopeId}><div class="flex flex-col items-center" data-v-e5af76ef${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "w-12 h-12 text-gray-300 mb-4" }, null, _parent2, _scopeId));
              _push2(`<p class="text-lg font-medium mb-2" data-v-e5af76ef${_scopeId}>Tidak ada data</p><p class="text-sm text-gray-400" data-v-e5af76ef${_scopeId}> Belum ada Shipping Order yang tersedia </p></div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.salesOrders.last_page > 1) {
              _push2(`<div class="px-4 py-4 border-t border-gray-200" data-v-e5af76ef${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.salesOrders }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: showReleaseDialog.value,
              type: "confirm",
              title: "Konfirmasi Rilis Shipping Order",
              message: "Apakah Anda yakin ingin merilis Shipping Order ini? Shipping Order yang sudah dirilis akan dikirim ke admin keuangan dan tidak dapat diubah lagi.",
              "confirm-text": "Ya, Rilis",
              "cancel-text": "Batal",
              onConfirm: confirmRelease,
              onCancel: cancelRelease,
              onClose: cancelRelease
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(AlertDialog, {
              show: showDeleteDialog.value,
              type: "confirm",
              title: "Konfirmasi Hapus Shipping Orderr",
              message: "Apakah Anda yakin ingin menghapus Shipping Order ini? Tindakan ini tidak dapat dibatalkan.",
              "confirm-text": "Ya, Hapus",
              "cancel-text": "Batal",
              onConfirm: confirmDelete,
              onCancel: cancelDelete,
              onClose: cancelDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Manajemen Shipping Order"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Kelola dokumen Shipping Order dan penawaran harga")
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-2" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.sales-orders.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 hover:bg-sage-900"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Buat Shipping Order ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Filter Data"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                        createVNode("div", { class: "md:col-span-2" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Cari Data"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => form.search = $event,
                            onInput: ($event) => unref(debouncedSearch)(),
                            type: "text",
                            placeholder: "Cari SO Number, Customer, Consignee...",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                            [vModelText, form.search]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Status"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => form.status = $event,
                            onChange: onStatusChange,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Semua Status"),
                            createVNode("option", { value: "draft" }, "Draft"),
                            createVNode("option", { value: "sent" }, "Terkirim"),
                            createVNode("option", { value: "confirmed" }, "Dikonfirmasi"),
                            createVNode("option", { value: "cancelled" }, "Dibatalkan")
                          ], 40, ["onUpdate:modelValue"]), [
                            [vModelSelect, form.status]
                          ])
                        ]),
                        createVNode("div", { class: "flex items-end" }, [
                          createVNode("button", {
                            onClick: applyFilters,
                            class: "w-full px-4 py-2 bg-sage-800 text-white rounded-md transition-colors hover:bg-sage-900"
                          }, " Cari ")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "sm:flex sm:items-center sm:justify-between mb-4" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Daftar Shipping Order"),
                          createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Total: " + toDisplayString(((_b2 = __props.salesOrders) == null ? void 0 : _b2.total) || 0) + " data", 1)
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Order Number "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Customer "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Shipper "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Shipment Type "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Commodity "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " QTY "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Container No "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Status "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Aksi ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrders.data, (salesOrder) => {
                              return openBlock(), createBlock("tr", {
                                key: salesOrder.id,
                                class: "hover:bg-gray-50 transition-colors"
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
                                      disabled: isProcessedStatus(salesOrder.status),
                                      class: ["inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors", isProcessedStatus(salesOrder.status) ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "text-sage-600 hover:text-sage-900 hover:bg-sage-100"],
                                      title: isProcessedStatus(salesOrder.status) ? "Sudah Diproses" : "Rilis Shipping Order"
                                    }, [
                                      createVNode(unref(Send), { class: "w-4 h-4" })
                                    ], 10, ["onClick", "disabled", "title"]),
                                    createVNode(unref(Link), {
                                      href: _ctx.route("admin-cs.sales-orders.show", salesOrder.id),
                                      class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
                                      title: "Lihat Detail"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Eye), { class: "w-4 h-4" })
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
                                        createVNode(unref(Pencil), { class: "w-4 h-4" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])) : (openBlock(), createBlock("span", {
                                      key: 1,
                                      class: "inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-100 rounded-full cursor-not-allowed",
                                      title: "Tidak dapat diedit (Shipping Order sudah diproses)"
                                    }, [
                                      createVNode(unref(Pencil), { class: "w-4 h-4" })
                                    ])),
                                    salesOrder.status === "draft" ? (openBlock(), createBlock("button", {
                                      key: 2,
                                      onClick: ($event) => deleteSalesOrder(salesOrder.id),
                                      class: "inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors",
                                      title: "Hapus"
                                    }, [
                                      createVNode(unref(Trash2), { class: "w-4 h-4" })
                                    ], 8, ["onClick"])) : (openBlock(), createBlock("span", {
                                      key: 3,
                                      class: "inline-flex items-center justify-center w-8 h-8 text-gray-400 bg-gray-100 rounded-full cursor-not-allowed",
                                      title: "Tidak dapat dihapus (Shipping Order sudah diproses)"
                                    }, [
                                      createVNode(unref(Trash2), { class: "w-4 h-4" })
                                    ]))
                                  ])
                                ])
                              ]);
                            }), 128)),
                            !__props.salesOrders.data || __props.salesOrders.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "9",
                                class: "px-6 py-8 text-center text-gray-500"
                              }, [
                                createVNode("div", { class: "flex flex-col items-center" }, [
                                  createVNode(unref(FileText), { class: "w-12 h-12 text-gray-300 mb-4" }),
                                  createVNode("p", { class: "text-lg font-medium mb-2" }, "Tidak ada data"),
                                  createVNode("p", { class: "text-sm text-gray-400" }, " Belum ada Shipping Order yang tersedia ")
                                ])
                              ])
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      __props.salesOrders.last_page > 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "px-4 py-4 border-t border-gray-200"
                      }, [
                        createVNode(Pagination, { data: __props.salesOrders }, null, 8, ["data"])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ]),
              createVNode(AlertDialog, {
                show: showReleaseDialog.value,
                type: "confirm",
                title: "Konfirmasi Rilis Shipping Order",
                message: "Apakah Anda yakin ingin merilis Shipping Order ini? Shipping Order yang sudah dirilis akan dikirim ke admin keuangan dan tidak dapat diubah lagi.",
                "confirm-text": "Ya, Rilis",
                "cancel-text": "Batal",
                onConfirm: confirmRelease,
                onCancel: cancelRelease,
                onClose: cancelRelease
              }, null, 8, ["show"]),
              createVNode(AlertDialog, {
                show: showDeleteDialog.value,
                type: "confirm",
                title: "Konfirmasi Hapus Shipping Orderr",
                message: "Apakah Anda yakin ingin menghapus Shipping Order ini? Tindakan ini tidak dapat dibatalkan.",
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
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e5af76ef"]]);
export {
  Index as default
};
