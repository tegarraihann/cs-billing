import { reactive, withCtx, unref, createVNode, createTextVNode, toDisplayString, withDirectives, vModelText, vModelSelect, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { router, Head, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-DX4KxCqj.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { DollarSign, Plus, FileText, CheckCircle, Clock } from "lucide-vue-next";
import { debounce } from "lodash";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLSkt1dX.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    invoices: Object,
    filters: Object,
    stats: Object
  },
  setup(__props) {
    var _a, _b, _c, _d, _e;
    const props = __props;
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.invoices.index": "/admin-keuangan/invoices",
        "admin-keuangan.invoices.create": "/admin-keuangan/invoices/create",
        "admin-keuangan.invoices.show": (id) => `/admin-keuangan/invoices/${id}`,
        "admin-keuangan.invoices.edit": (id) => `/admin-keuangan/invoices/${id}/edit`,
        "admin-keuangan.invoices.payment-history": "/admin-keuangan/invoices/payment-history"
      };
      return routes[name] ? typeof routes[name] === "function" ? routes[name](params) : routes[name] : "#";
    };
    const form = reactive({
      search: ((_a = props.filters) == null ? void 0 : _a.search) || "",
      status: ((_b = props.filters) == null ? void 0 : _b.status) || "",
      invoice_type: ((_c = props.filters) == null ? void 0 : _c.invoice_type) || "",
      date_from: ((_d = props.filters) == null ? void 0 : _d.date_from) || "",
      date_to: ((_e = props.filters) == null ? void 0 : _e.date_to) || ""
    });
    const search = debounce(() => {
      router.get(route("admin-keuangan.invoices.index"), {
        search: form.search,
        status: form.status,
        invoice_type: form.invoice_type,
        date_from: form.date_from,
        date_to: form.date_to
      }, {
        preserveState: true,
        replace: true
      });
    }, 300);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount || 0);
    };
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getStatusClass = (status) => {
      const statusClasses = {
        "draft": "bg-gray-100 text-gray-800",
        "sent": "bg-blue-100 text-blue-800",
        "paid": "bg-green-100 text-green-800",
        "partial": "bg-yellow-100 text-yellow-800",
        "overdue": "bg-red-100 text-red-800",
        "cancelled": "bg-red-100 text-red-800"
      };
      return statusClasses[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusText = (status) => {
      const statusTexts = {
        "draft": "Draft",
        "sent": "Terkirim",
        "paid": "Dibayar",
        "partial": "Sebagian",
        "overdue": "Terlambat",
        "cancelled": "Dibatalkan"
      };
      return statusTexts[status] || status;
    };
    const getInvoiceTypeClass = (type) => {
      const typeClasses = {
        "main": "bg-blue-100 text-blue-800",
        "reimbursement": "bg-green-100 text-green-800",
        "combined": "bg-purple-100 text-purple-800"
      };
      return typeClasses[type] || "bg-gray-100 text-gray-800";
    };
    const getInvoiceTypeText = (type) => {
      const typeTexts = {
        "main": "Main",
        "reimbursement": "Reimbursement",
        "combined": "Combined"
      };
      return typeTexts[type] || type;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c2, _d2, _e2, _f, _g, _h;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Invoice Management" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6" data-v-c51c1374${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-c51c1374${_scopeId}><div class="flex justify-between items-center mb-6" data-v-c51c1374${_scopeId}><div data-v-c51c1374${_scopeId}><h1 class="text-2xl font-bold text-gray-900" data-v-c51c1374${_scopeId}>Invoice Management</h1><p class="mt-1 text-sm text-gray-600" data-v-c51c1374${_scopeId}>Kelola invoice untuk sales order yang telah disetujui</p></div><div class="flex gap-3" data-v-c51c1374${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.payment-history"),
              class: "inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(DollarSign), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Payment History `);
                } else {
                  return [
                    createVNode(unref(DollarSign), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Payment History ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Buat Invoice `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Buat Invoice ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" data-v-c51c1374${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg" data-v-c51c1374${_scopeId}><div class="p-5" data-v-c51c1374${_scopeId}><div class="flex items-center" data-v-c51c1374${_scopeId}><div class="flex-shrink-0" data-v-c51c1374${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "h-6 w-6 text-gray-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-c51c1374${_scopeId}><dl data-v-c51c1374${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-c51c1374${_scopeId}>Total Invoice</dt><dd class="text-lg font-medium text-gray-900" data-v-c51c1374${_scopeId}>${ssrInterpolate(((_a2 = __props.stats) == null ? void 0 : _a2.total_invoices) || 0)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-c51c1374${_scopeId}><div class="p-5" data-v-c51c1374${_scopeId}><div class="flex items-center" data-v-c51c1374${_scopeId}><div class="flex-shrink-0" data-v-c51c1374${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-c51c1374${_scopeId}><dl data-v-c51c1374${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-c51c1374${_scopeId}>Invoice Lunas</dt><dd class="text-lg font-medium text-gray-900" data-v-c51c1374${_scopeId}>${ssrInterpolate(((_b2 = __props.stats) == null ? void 0 : _b2.paid_invoices) || 0)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-c51c1374${_scopeId}><div class="p-5" data-v-c51c1374${_scopeId}><div class="flex items-center" data-v-c51c1374${_scopeId}><div class="flex-shrink-0" data-v-c51c1374${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Clock), { class: "h-6 w-6 text-red-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-c51c1374${_scopeId}><dl data-v-c51c1374${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-c51c1374${_scopeId}>Invoice Overdue</dt><dd class="text-lg font-medium text-gray-900" data-v-c51c1374${_scopeId}>${ssrInterpolate(((_c2 = __props.stats) == null ? void 0 : _c2.overdue_invoices) || 0)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-c51c1374${_scopeId}><div class="p-5" data-v-c51c1374${_scopeId}><div class="flex items-center" data-v-c51c1374${_scopeId}><div class="flex-shrink-0" data-v-c51c1374${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), { class: "h-6 w-6 text-amber-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-c51c1374${_scopeId}><dl data-v-c51c1374${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-c51c1374${_scopeId}>Outstanding Amount</dt><dd class="text-lg font-medium text-gray-900" data-v-c51c1374${_scopeId}>${ssrInterpolate(formatCurrency(((_d2 = __props.stats) == null ? void 0 : _d2.outstanding_amount) || 0))}</dd></dl></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-c51c1374${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-c51c1374${_scopeId}><div class="flex flex-col sm:flex-row gap-4" data-v-c51c1374${_scopeId}><div class="flex-1" data-v-c51c1374${_scopeId}><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari berdasarkan nomor invoice, customer, atau sales order..." class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-c51c1374${_scopeId}></div><div class="w-48" data-v-c51c1374${_scopeId}><select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-c51c1374${_scopeId}><option value="" data-v-c51c1374${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "") : ssrLooseEqual(form.status, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="draft" data-v-c51c1374${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "draft") : ssrLooseEqual(form.status, "draft")) ? " selected" : ""}${_scopeId}>Draft</option><option value="sent" data-v-c51c1374${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "sent") : ssrLooseEqual(form.status, "sent")) ? " selected" : ""}${_scopeId}>Terkirim</option><option value="paid" data-v-c51c1374${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "paid") : ssrLooseEqual(form.status, "paid")) ? " selected" : ""}${_scopeId}>Dibayar</option><option value="overdue" data-v-c51c1374${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "overdue") : ssrLooseEqual(form.status, "overdue")) ? " selected" : ""}${_scopeId}>Overdue</option><option value="cancelled" data-v-c51c1374${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "cancelled") : ssrLooseEqual(form.status, "cancelled")) ? " selected" : ""}${_scopeId}>Dibatalkan</option></select></div><div class="w-48" data-v-c51c1374${_scopeId}><select class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-c51c1374${_scopeId}><option value="" data-v-c51c1374${ssrIncludeBooleanAttr(Array.isArray(form.invoice_type) ? ssrLooseContain(form.invoice_type, "") : ssrLooseEqual(form.invoice_type, "")) ? " selected" : ""}${_scopeId}>Semua Tipe</option><option value="main" data-v-c51c1374${ssrIncludeBooleanAttr(Array.isArray(form.invoice_type) ? ssrLooseContain(form.invoice_type, "main") : ssrLooseEqual(form.invoice_type, "main")) ? " selected" : ""}${_scopeId}>Main Invoice</option><option value="reimbursement" data-v-c51c1374${ssrIncludeBooleanAttr(Array.isArray(form.invoice_type) ? ssrLooseContain(form.invoice_type, "reimbursement") : ssrLooseEqual(form.invoice_type, "reimbursement")) ? " selected" : ""}${_scopeId}>Reimbursement</option></select></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md" data-v-c51c1374${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-c51c1374${_scopeId}><div class="overflow-x-auto" data-v-c51c1374${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-c51c1374${_scopeId}><thead class="bg-gray-50" data-v-c51c1374${_scopeId}><tr data-v-c51c1374${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c51c1374${_scopeId}> Invoice Number </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c51c1374${_scopeId}> Customer </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c51c1374${_scopeId}> Sales Order </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c51c1374${_scopeId}> Invoice Date </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c51c1374${_scopeId}> Due Date </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c51c1374${_scopeId}> Total </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c51c1374${_scopeId}> Type </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c51c1374${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c51c1374${_scopeId}> Aksi </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-c51c1374${_scopeId}><!--[-->`);
            ssrRenderList(__props.invoices.data, (invoice) => {
              var _a3;
              _push2(`<tr class="hover:bg-gray-50" data-v-c51c1374${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-c51c1374${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-c51c1374${_scopeId}>${ssrInterpolate(invoice.invoice_number)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-c51c1374${_scopeId}><div class="text-sm text-gray-900" data-v-c51c1374${_scopeId}>${ssrInterpolate(invoice.customer_name)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-c51c1374${_scopeId}><div class="text-sm text-gray-900" data-v-c51c1374${_scopeId}>${ssrInterpolate((_a3 = invoice.sales_order) == null ? void 0 : _a3.order_number)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-c51c1374${_scopeId}><div class="text-sm text-gray-900" data-v-c51c1374${_scopeId}>${ssrInterpolate(formatDate(invoice.invoice_date))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-c51c1374${_scopeId}><div class="text-sm text-gray-900" data-v-c51c1374${_scopeId}>${ssrInterpolate(formatDate(invoice.due_date))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-c51c1374${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-c51c1374${_scopeId}>${ssrInterpolate(formatCurrency(invoice.total_amount))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-c51c1374${_scopeId}><div class="flex flex-wrap gap-1" data-v-c51c1374${_scopeId}><!--[-->`);
              ssrRenderList(invoice.related_invoice_types || [invoice.invoice_type], (type) => {
                _push2(`<span class="${ssrRenderClass([getInvoiceTypeClass(type), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-c51c1374${_scopeId}>${ssrInterpolate(getInvoiceTypeText(type))}</span>`);
              });
              _push2(`<!--]--></div></td><td class="px-6 py-4 whitespace-nowrap" data-v-c51c1374${_scopeId}><span class="${ssrRenderClass([getStatusClass(invoice.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-c51c1374${_scopeId}>${ssrInterpolate(getStatusText(invoice.status))}</span></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium" data-v-c51c1374${_scopeId}><div class="flex justify-center gap-2" data-v-c51c1374${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.invoices.show", invoice.id),
                class: "text-blue-600 hover:text-blue-900"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` View `);
                  } else {
                    return [
                      createTextVNode(" View ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.invoices.edit", invoice.id),
                class: "text-sage-600 hover:text-sage-900"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Edit `);
                  } else {
                    return [
                      createTextVNode(" Edit ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
            if (__props.invoices.data.length === 0) {
              _push2(`<div class="text-center py-12" data-v-c51c1374${_scopeId}><svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" data-v-c51c1374${_scopeId}><path d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-c51c1374${_scopeId}></path></svg><p class="text-gray-500" data-v-c51c1374${_scopeId}>Belum ada invoice yang dibuat</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.invoices.data.length > 0) {
              _push2(`<div class="px-6 py-4 border-t border-gray-200" data-v-c51c1374${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.invoices }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Invoice Management" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Invoice Management"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Kelola invoice untuk sales order yang telah disetujui")
                    ]),
                    createVNode("div", { class: "flex gap-3" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.invoices.payment-history"),
                        class: "inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(DollarSign), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Payment History ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.invoices.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Buat Invoice ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(FileText), { class: "h-6 w-6 text-gray-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Invoice"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(((_e2 = __props.stats) == null ? void 0 : _e2.total_invoices) || 0), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(CheckCircle), { class: "h-6 w-6 text-green-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Invoice Lunas"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(((_f = __props.stats) == null ? void 0 : _f.paid_invoices) || 0), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Clock), { class: "h-6 w-6 text-red-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Invoice Overdue"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(((_g = __props.stats) == null ? void 0 : _g.overdue_invoices) || 0), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(DollarSign), { class: "h-6 w-6 text-amber-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Outstanding Amount"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(((_h = __props.stats) == null ? void 0 : _h.outstanding_amount) || 0)), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                        createVNode("div", { class: "flex-1" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => form.search = $event,
                            onInput: unref(search),
                            type: "text",
                            placeholder: "Cari berdasarkan nomor invoice, customer, atau sales order...",
                            class: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                            [vModelText, form.search]
                          ])
                        ]),
                        createVNode("div", { class: "w-48" }, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => form.status = $event,
                            onChange: unref(search),
                            class: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Semua Status"),
                            createVNode("option", { value: "draft" }, "Draft"),
                            createVNode("option", { value: "sent" }, "Terkirim"),
                            createVNode("option", { value: "paid" }, "Dibayar"),
                            createVNode("option", { value: "overdue" }, "Overdue"),
                            createVNode("option", { value: "cancelled" }, "Dibatalkan")
                          ], 40, ["onUpdate:modelValue", "onChange"]), [
                            [vModelSelect, form.status]
                          ])
                        ]),
                        createVNode("div", { class: "w-48" }, [
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => form.invoice_type = $event,
                            onChange: unref(search),
                            class: "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Semua Tipe"),
                            createVNode("option", { value: "main" }, "Main Invoice"),
                            createVNode("option", { value: "reimbursement" }, "Reimbursement")
                          ], 40, ["onUpdate:modelValue", "onChange"]), [
                            [vModelSelect, form.invoice_type]
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Invoice Number "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Customer "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Sales Order "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Invoice Date "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Due Date "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Total "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Type "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Status "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Aksi ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.invoices.data, (invoice) => {
                              var _a3;
                              return openBlock(), createBlock("tr", {
                                key: invoice.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(invoice.invoice_number), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(invoice.customer_name), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString((_a3 = invoice.sales_order) == null ? void 0 : _a3.order_number), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(invoice.invoice_date)), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(invoice.due_date)), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(invoice.total_amount)), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "flex flex-wrap gap-1" }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(invoice.related_invoice_types || [invoice.invoice_type], (type) => {
                                      return openBlock(), createBlock("span", {
                                        key: type,
                                        class: [getInvoiceTypeClass(type), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                      }, toDisplayString(getInvoiceTypeText(type)), 3);
                                    }), 128))
                                  ])
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: [getStatusClass(invoice.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                  }, toDisplayString(getStatusText(invoice.status)), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm font-medium" }, [
                                  createVNode("div", { class: "flex justify-center gap-2" }, [
                                    createVNode(unref(Link), {
                                      href: unref(route)("admin-keuangan.invoices.show", invoice.id),
                                      class: "text-blue-600 hover:text-blue-900"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" View ")
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    createVNode(unref(Link), {
                                      href: unref(route)("admin-keuangan.invoices.edit", invoice.id),
                                      class: "text-sage-600 hover:text-sage-900"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Edit ")
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ]),
                        __props.invoices.data.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center py-12"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "mx-auto h-12 w-12 text-gray-400",
                            stroke: "currentColor",
                            fill: "none",
                            viewBox: "0 0 48 48"
                          }, [
                            createVNode("path", {
                              d: "M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z",
                              "stroke-width": "2",
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round"
                            })
                          ])),
                          createVNode("p", { class: "text-gray-500" }, "Belum ada invoice yang dibuat")
                        ])) : createCommentVNode("", true),
                        __props.invoices.data.length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "px-6 py-4 border-t border-gray-200"
                        }, [
                          createVNode(Pagination, { data: __props.invoices }, null, 8, ["data"])
                        ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Invoices/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c51c1374"]]);
export {
  Index as default
};
