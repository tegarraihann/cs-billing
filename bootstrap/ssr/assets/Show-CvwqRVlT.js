import { ref, reactive, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, Fragment, renderList, withModifiers, withDirectives, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-B9DgXThx.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-DiVH08Np.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    invoice: Object
  },
  setup(__props) {
    const props = __props;
    const showPaymentModal = ref(false);
    const showMarkSentModal = ref(false);
    const processing = ref(false);
    const paymentForm = reactive({
      paid_amount: props.invoice.total,
      paid_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      payment_method: "",
      payment_notes: ""
    });
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.invoices.index": "/admin-keuangan/invoices",
        "admin-keuangan.invoices.edit": (id) => `/admin-keuangan/invoices/${id}/edit`,
        "admin-keuangan.invoices.pdf": (id) => `/admin-keuangan/invoices/${id}/pdf`,
        "admin-keuangan.invoices.confirm-payment": (id) => `/admin-keuangan/invoices/${id}/confirm-payment`,
        "admin-keuangan.invoices.mark-sent": (id) => `/admin-keuangan/invoices/${id}/mark-sent`
      };
      return typeof routes[name] === "function" ? routes[name](params) : routes[name] || "#";
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID");
    };
    const formatNumber = (number) => {
      return new Intl.NumberFormat("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      }).format(number);
    };
    const formatCurrency = (amount, currency = "IDR") => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
        minimumFractionDigits: 0
      }).format(amount);
    };
    const formatDateTime = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleString("id-ID");
    };
    const getStatusLabel = (status) => {
      const labels = {
        draft: "Draft",
        sent: "Terkirim",
        paid: "Dibayar",
        overdue: "Overdue",
        cancelled: "Dibatalkan"
      };
      return labels[status] || status;
    };
    const getStatusColor = (status) => {
      const colors = {
        draft: "bg-gray-100 text-gray-800",
        sent: "bg-blue-100 text-blue-800",
        paid: "bg-green-100 text-green-800",
        overdue: "bg-red-100 text-red-800",
        cancelled: "bg-red-100 text-red-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    const getPaymentStatusLabel = (invoice) => {
      if (invoice.status === "paid") {
        return "Lunas";
      }
      const dueDate = new Date(invoice.due_date);
      const today = /* @__PURE__ */ new Date();
      if (invoice.status !== "paid" && dueDate < today) {
        return "Overdue";
      }
      return "Belum Dibayar";
    };
    const getPaymentStatusColor = (invoice) => {
      const status = getPaymentStatusLabel(invoice);
      const colors = {
        "Lunas": "bg-green-100 text-green-800",
        "Overdue": "bg-red-100 text-red-800",
        "Belum Dibayar": "bg-yellow-100 text-yellow-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    const confirmPayment = () => {
      processing.value = true;
      router.post(route("admin-keuangan.invoices.confirm-payment", props.invoice.id), paymentForm, {
        onSuccess: () => {
          showPaymentModal.value = false;
          processing.value = false;
        },
        onError: () => {
          processing.value = false;
        }
      });
    };
    const markAsSent = () => {
      processing.value = true;
      router.post(route("admin-keuangan.invoices.mark-sent", props.invoice.id), {}, {
        onSuccess: () => {
          showMarkSentModal.value = false;
          processing.value = false;
        },
        onError: () => {
          processing.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-5a047c29${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-5a047c29${_scopeId}><div class="flex items-center justify-between" data-v-5a047c29${_scopeId}><div data-v-5a047c29${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-5a047c29${_scopeId}>Detail Invoice</h2><p class="text-sage-600" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.invoice_number)}</p></div><div class="flex space-x-3" data-v-5a047c29${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5a047c29${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-5a047c29${_scopeId2}></path></svg> Kembali `);
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
                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                      })
                    ])),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.invoice.status === "draft") {
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.invoices.edit", __props.invoice.id),
                class: "inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5a047c29${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-5a047c29${_scopeId2}></path></svg> Edit `);
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
              _push2(`<!---->`);
            }
            if (__props.invoice.status === "draft") {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-5a047c29${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5a047c29${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" data-v-5a047c29${_scopeId}></path></svg> Tandai Terkirim </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.invoice.status !== "paid") {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" data-v-5a047c29${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5a047c29${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-5a047c29${_scopeId}></path></svg> Konfirmasi Pembayaran </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<a${ssrRenderAttr("href", unref(route)("admin-keuangan.invoices.preview", __props.invoice.id))} class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" target="_blank" data-v-5a047c29${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5a047c29${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-5a047c29${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-5a047c29${_scopeId}></path></svg> Preview PDF </a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.invoices.pdf", __props.invoice.id))} class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" target="_blank" data-v-5a047c29${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5a047c29${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" data-v-5a047c29${_scopeId}></path></svg> Download PDF </a></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" data-v-5a047c29${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-5a047c29${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-5a047c29${_scopeId}>Informasi Invoice</h3><div class="space-y-3" data-v-5a047c29${_scopeId}><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Nomor Invoice:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.invoice_number)}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Sales Order:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate((_a = __props.invoice.sales_order) == null ? void 0 : _a.order_number)}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Customer:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(((_b = __props.invoice.customer) == null ? void 0 : _b.consignee_shipper) || ((_c = __props.invoice.customer) == null ? void 0 : _c.company_name))}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Tanggal Invoice:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(formatDate(__props.invoice.invoice_date))}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Jatuh Tempo:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(formatDate(__props.invoice.due_date))}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Term:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.term_days)} Hari</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Status:</span><span class="${ssrRenderClass([getStatusColor(__props.invoice.status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-5a047c29${_scopeId}>${ssrInterpolate(getStatusLabel(__props.invoice.status))}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Payment Status:</span><span class="${ssrRenderClass([getPaymentStatusColor(__props.invoice), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-5a047c29${_scopeId}>${ssrInterpolate(getPaymentStatusLabel(__props.invoice))}</span></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-5a047c29${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-5a047c29${_scopeId}>Detail Pengiriman</h3><div class="space-y-3" data-v-5a047c29${_scopeId}><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Shipper:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.shipper || "-")}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Consignee:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.consignee || "-")}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Vessel:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.vessel || "-")}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Flight/VOY:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.flight_voy || "-")}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>AWB/BL No:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.awb_bl_no || "-")}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>POL/POD:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.pol_pod || "-")}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Origin:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.origin || "-")}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Destination:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.destination || "-")}</span></div></div></div>`);
            if (__props.invoice.status === "paid") {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-5a047c29${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-5a047c29${_scopeId}>Informasi Pembayaran</h3><div class="space-y-3" data-v-5a047c29${_scopeId}><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Tanggal Dibayar:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(formatDate(__props.invoice.paid_date))}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Jumlah Dibayar:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(formatCurrency(__props.invoice.paid_amount))}</span></div>`);
              if (__props.invoice.payment_method) {
                _push2(`<div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Metode Pembayaran:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.payment_method)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Dikonfirmasi oleh:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(((_d = __props.invoice.confirmed_by) == null ? void 0 : _d.name) || "-")}</span></div><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Waktu Konfirmasi:</span><span class="font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(formatDateTime(__props.invoice.payment_confirmed_at))}</span></div>`);
              if (__props.invoice.payment_notes) {
                _push2(`<div class="pt-2" data-v-5a047c29${_scopeId}><span class="text-gray-600" data-v-5a047c29${_scopeId}>Catatan:</span><p class="text-gray-900 mt-1" data-v-5a047c29${_scopeId}>${ssrInterpolate(__props.invoice.payment_notes)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-5a047c29${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-5a047c29${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-5a047c29${_scopeId}>Item Invoice</h3></div><div class="overflow-x-auto" data-v-5a047c29${_scopeId}><table class="w-full" data-v-5a047c29${_scopeId}><thead class="bg-sage-50" data-v-5a047c29${_scopeId}><tr data-v-5a047c29${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-5a047c29${_scopeId}> Deskripsi </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-5a047c29${_scopeId}> Qty </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-5a047c29${_scopeId}> Unit </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-5a047c29${_scopeId}> Rate </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-5a047c29${_scopeId}> Currency </th><th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-5a047c29${_scopeId}> Amount </th></tr></thead><tbody class="bg-white divide-y divide-sage-200" data-v-5a047c29${_scopeId}><!--[-->`);
            ssrRenderList(__props.invoice.items, (item) => {
              _push2(`<tr class="hover:bg-sage-50" data-v-5a047c29${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-5a047c29${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-5a047c29${_scopeId}>${ssrInterpolate(item.description)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-5a047c29${_scopeId}><div class="text-sm text-gray-900" data-v-5a047c29${_scopeId}>${ssrInterpolate(formatNumber(item.quantity))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-5a047c29${_scopeId}><div class="text-sm text-gray-900" data-v-5a047c29${_scopeId}>${ssrInterpolate(item.unit)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-5a047c29${_scopeId}><div class="text-sm text-gray-900" data-v-5a047c29${_scopeId}>${ssrInterpolate(formatCurrency(item.rate, item.currency))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-5a047c29${_scopeId}><div class="text-sm text-gray-900" data-v-5a047c29${_scopeId}>${ssrInterpolate(item.currency)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right" data-v-5a047c29${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-5a047c29${_scopeId}>${ssrInterpolate(formatCurrency(item.amount, item.currency))}</div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div><div class="px-6 py-4 bg-gray-50 border-t border-sage-200" data-v-5a047c29${_scopeId}><div class="flex justify-end" data-v-5a047c29${_scopeId}><div class="w-64 space-y-2" data-v-5a047c29${_scopeId}><div class="flex justify-between" data-v-5a047c29${_scopeId}><span class="text-sm text-gray-600" data-v-5a047c29${_scopeId}>Subtotal:</span><span class="text-sm font-medium" data-v-5a047c29${_scopeId}>${ssrInterpolate(formatCurrency(__props.invoice.subtotal))}</span></div><div class="flex justify-between text-lg font-semibold" data-v-5a047c29${_scopeId}><span data-v-5a047c29${_scopeId}>Total:</span><span data-v-5a047c29${_scopeId}>${ssrInterpolate(formatCurrency(__props.invoice.total))}</span></div></div></div></div></div></div>`);
            if (showPaymentModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-5a047c29${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-5a047c29${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-5a047c29${_scopeId}>Konfirmasi Pembayaran</h3><form data-v-5a047c29${_scopeId}><div class="space-y-4" data-v-5a047c29${_scopeId}><div data-v-5a047c29${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-5a047c29${_scopeId}>Jumlah Dibayar</label><input type="number"${ssrRenderAttr("value", paymentForm.paid_amount)}${ssrRenderAttr("placeholder", formatCurrency(__props.invoice.total))} step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-5a047c29${_scopeId}></div><div data-v-5a047c29${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-5a047c29${_scopeId}>Tanggal Pembayaran</label><input type="date"${ssrRenderAttr("value", paymentForm.paid_date)}${ssrRenderAttr("max", (/* @__PURE__ */ new Date()).toISOString().split("T")[0])} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-5a047c29${_scopeId}></div><div data-v-5a047c29${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-5a047c29${_scopeId}>Metode Pembayaran</label><input type="text"${ssrRenderAttr("value", paymentForm.payment_method)} placeholder="Transfer Bank, Cash, dll." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-5a047c29${_scopeId}></div><div data-v-5a047c29${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-5a047c29${_scopeId}>Catatan (Opsional)</label><textarea rows="3" placeholder="Catatan tambahan tentang pembayaran..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-5a047c29${_scopeId}>${ssrInterpolate(paymentForm.payment_notes)}</textarea></div></div><div class="flex justify-end space-x-3 mt-6" data-v-5a047c29${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-5a047c29${_scopeId}> Batal </button><button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50" data-v-5a047c29${_scopeId}>${ssrInterpolate(processing.value ? "Memproses..." : "Konfirmasi Pembayaran")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showMarkSentModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-5a047c29${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-5a047c29${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-5a047c29${_scopeId}>Tandai Invoice Sebagai Terkirim</h3><p class="text-gray-600 mb-6" data-v-5a047c29${_scopeId}>Apakah Anda yakin ingin menandai invoice ini sebagai terkirim ke customer?</p><div class="flex justify-end space-x-3" data-v-5a047c29${_scopeId}><button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-5a047c29${_scopeId}> Batal </button><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-5a047c29${_scopeId}> Ya, Tandai Terkirim </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Detail Invoice"),
                      createVNode("p", { class: "text-sage-600" }, toDisplayString(__props.invoice.invoice_number), 1)
                    ]),
                    createVNode("div", { class: "flex space-x-3" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.invoices.index"),
                        class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
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
                              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                            })
                          ])),
                          createTextVNode(" Kembali ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      __props.invoice.status === "draft" ? (openBlock(), createBlock(unref(Link), {
                        key: 0,
                        href: unref(route)("admin-keuangan.invoices.edit", __props.invoice.id),
                        class: "inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
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
                              d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            })
                          ])),
                          createTextVNode(" Edit ")
                        ]),
                        _: 1
                      }, 8, ["href"])) : createCommentVNode("", true),
                      __props.invoice.status === "draft" ? (openBlock(), createBlock("button", {
                        key: 1,
                        onClick: ($event) => showMarkSentModal.value = true,
                        class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      }, [
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
                            d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          })
                        ])),
                        createTextVNode(" Tandai Terkirim ")
                      ], 8, ["onClick"])) : createCommentVNode("", true),
                      __props.invoice.status !== "paid" ? (openBlock(), createBlock("button", {
                        key: 2,
                        onClick: ($event) => showPaymentModal.value = true,
                        class: "inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      }, [
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
                            d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ])),
                        createTextVNode(" Konfirmasi Pembayaran ")
                      ], 8, ["onClick"])) : createCommentVNode("", true),
                      createVNode("a", {
                        href: unref(route)("admin-keuangan.invoices.preview", __props.invoice.id),
                        class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",
                        target: "_blank"
                      }, [
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
                            d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          }),
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          })
                        ])),
                        createTextVNode(" Preview PDF ")
                      ], 8, ["href"]),
                      createVNode("a", {
                        href: unref(route)("admin-keuangan.invoices.pdf", __props.invoice.id),
                        class: "inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors",
                        target: "_blank"
                      }, [
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
                            d: "M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                          })
                        ])),
                        createTextVNode(" Download PDF ")
                      ], 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Informasi Invoice"),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Nomor Invoice:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.invoice_number), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Sales Order:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString((_e = __props.invoice.sales_order) == null ? void 0 : _e.order_number), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Customer:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(((_f = __props.invoice.customer) == null ? void 0 : _f.consignee_shipper) || ((_g = __props.invoice.customer) == null ? void 0 : _g.company_name)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Tanggal Invoice:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(__props.invoice.invoice_date)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Jatuh Tempo:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(__props.invoice.due_date)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Term:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.term_days) + " Hari", 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Status:"),
                        createVNode("span", {
                          class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusColor(__props.invoice.status)]
                        }, toDisplayString(getStatusLabel(__props.invoice.status)), 3)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Payment Status:"),
                        createVNode("span", {
                          class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getPaymentStatusColor(__props.invoice)]
                        }, toDisplayString(getPaymentStatusLabel(__props.invoice)), 3)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Detail Pengiriman"),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Shipper:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.shipper || "-"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Consignee:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.consignee || "-"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Vessel:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.vessel || "-"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Flight/VOY:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.flight_voy || "-"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "AWB/BL No:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.awb_bl_no || "-"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "POL/POD:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.pol_pod || "-"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Origin:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.origin || "-"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Destination:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.destination || "-"), 1)
                      ])
                    ])
                  ]),
                  __props.invoice.status === "paid" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200"
                  }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Informasi Pembayaran"),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Tanggal Dibayar:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(__props.invoice.paid_date)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Jumlah Dibayar:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.invoice.paid_amount)), 1)
                      ]),
                      __props.invoice.payment_method ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex justify-between"
                      }, [
                        createVNode("span", { class: "text-gray-600" }, "Metode Pembayaran:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.payment_method), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Dikonfirmasi oleh:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(((_h = __props.invoice.confirmed_by) == null ? void 0 : _h.name) || "-"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Waktu Konfirmasi:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDateTime(__props.invoice.payment_confirmed_at)), 1)
                      ]),
                      __props.invoice.payment_notes ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "pt-2"
                      }, [
                        createVNode("span", { class: "text-gray-600" }, "Catatan:"),
                        createVNode("p", { class: "text-gray-900 mt-1" }, toDisplayString(__props.invoice.payment_notes), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Item Invoice")
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Deskripsi "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Qty "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Unit "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Rate "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Currency "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Amount ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.invoice.items, (item) => {
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-sage-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(item.description), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatNumber(item.quantity)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(item.unit), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatCurrency(item.rate, item.currency)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(item.currency), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(item.amount, item.currency)), 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "px-6 py-4 bg-gray-50 border-t border-sage-200" }, [
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode("div", { class: "w-64 space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-gray-600" }, "Subtotal:"),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(formatCurrency(__props.invoice.subtotal)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between text-lg font-semibold" }, [
                          createVNode("span", null, "Total:"),
                          createVNode("span", null, toDisplayString(formatCurrency(__props.invoice.total)), 1)
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              showPaymentModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Konfirmasi Pembayaran"),
                  createVNode("form", {
                    onSubmit: withModifiers(confirmPayment, ["prevent"])
                  }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Jumlah Dibayar"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => paymentForm.paid_amount = $event,
                          placeholder: formatCurrency(__props.invoice.total),
                          step: "0.01",
                          min: "0",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue", "placeholder"]), [
                          [vModelText, paymentForm.paid_amount]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Tanggal Pembayaran"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => paymentForm.paid_date = $event,
                          max: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue", "max"]), [
                          [vModelText, paymentForm.paid_date]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Metode Pembayaran"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => paymentForm.payment_method = $event,
                          placeholder: "Transfer Bank, Cash, dll.",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, paymentForm.payment_method]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Catatan (Opsional)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => paymentForm.payment_notes = $event,
                          rows: "3",
                          placeholder: "Catatan tambahan tentang pembayaran...",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, paymentForm.payment_notes]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3 mt-6" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => showPaymentModal.value = false,
                        class: "px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      }, " Batal ", 8, ["onClick"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: processing.value,
                        class: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      }, toDisplayString(processing.value ? "Memproses..." : "Konfirmasi Pembayaran"), 9, ["disabled"])
                    ])
                  ], 32)
                ])
              ])) : createCommentVNode("", true),
              showMarkSentModal.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Tandai Invoice Sebagai Terkirim"),
                  createVNode("p", { class: "text-gray-600 mb-6" }, "Apakah Anda yakin ingin menandai invoice ini sebagai terkirim ke customer?"),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: ($event) => showMarkSentModal.value = false,
                      class: "px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    }, " Batal ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: markAsSent,
                      class: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    }, " Ya, Tandai Terkirim ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Invoices/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5a047c29"]]);
export {
  Show as default
};
