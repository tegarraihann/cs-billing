import { reactive, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, withDirectives, vModelText, vModelSelect, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { router, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BfoyVaUl.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { debounce } from "lodash";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-B6ie8KC7.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    invoices: Object,
    filters: Object,
    stats: Object
  },
  setup(__props) {
    const props = __props;
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.invoices.index": "/admin-keuangan/invoices",
        "admin-keuangan.invoices.create": "/admin-keuangan/invoices/create",
        "admin-keuangan.invoices.show": (id) => `/admin-keuangan/invoices/${id}`,
        "admin-keuangan.invoices.edit": (id) => `/admin-keuangan/invoices/${id}/edit`,
        "admin-keuangan.invoices.pdf": (id) => `/admin-keuangan/invoices/${id}/pdf`,
        "admin-keuangan.invoices.payment-history": "/admin-keuangan/invoices/payment-history"
      };
      return typeof routes[name] === "function" ? routes[name](params) : routes[name] || "#";
    };
    const form = reactive({
      search: props.filters.search || "",
      status: props.filters.status || "",
      invoice_type: props.filters.invoice_type || "",
      date_from: props.filters.date_from || "",
      date_to: props.filters.date_to || ""
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
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID");
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
    const calculateProfitMargin = (invoice) => {
      if (!invoice.items || invoice.items.length === 0) return 0;
      const grossRevenue = invoice.items.filter((item) => (item.item_type || "billable") !== "operational_cost").filter((item) => item.include_in_customer_invoice !== false).filter((item) => !item.is_hidden_from_customer).reduce((sum, item) => sum + (item.amount || 0), 0);
      const operationalCosts = invoice.items.filter((item) => (item.item_type || "billable") === "operational_cost").reduce((sum, item) => sum + (item.amount || 0), 0);
      const netProfit = grossRevenue - operationalCosts;
      return grossRevenue > 0 ? netProfit / grossRevenue * 100 : 0;
    };
    const getProfitMarginClass = (margin) => {
      if (margin >= 20) return "bg-green-100 text-green-800";
      if (margin >= 10) return "bg-yellow-100 text-yellow-800";
      return "bg-red-100 text-red-800";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-589c8af2${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-589c8af2${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-589c8af2${_scopeId}><div class="flex items-center" data-v-589c8af2${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-589c8af2${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-589c8af2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-589c8af2${_scopeId}></path></svg></div><div data-v-589c8af2${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-589c8af2${_scopeId}>Invoice Management</h2><p class="text-sage-600" data-v-589c8af2${_scopeId}>Kelola invoice untuk sales order yang telah disetujui</p></div></div><div class="mt-4 sm:mt-0 flex gap-3" data-v-589c8af2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.payment-history"),
              class: "inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-589c8af2${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75" data-v-589c8af2${_scopeId2}></path></svg> Payment History `);
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
                        d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75"
                      })
                    ])),
                    createTextVNode(" Payment History ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-589c8af2${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-589c8af2${_scopeId2}></path></svg> Buat Invoice `);
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
                    createTextVNode(" Buat Invoice ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" data-v-589c8af2${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-589c8af2${_scopeId}><div class="flex items-center" data-v-589c8af2${_scopeId}><div class="flex-1" data-v-589c8af2${_scopeId}><p class="text-sm font-medium text-gray-600" data-v-589c8af2${_scopeId}>Total Invoice</p><p class="text-2xl font-bold text-gray-900" data-v-589c8af2${_scopeId}>${ssrInterpolate(((_a = __props.stats) == null ? void 0 : _a.total_invoices) || 0)}</p></div><div class="p-3 bg-blue-100 rounded-full" data-v-589c8af2${_scopeId}><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-589c8af2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-589c8af2${_scopeId}></path></svg></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-589c8af2${_scopeId}><div class="flex items-center" data-v-589c8af2${_scopeId}><div class="flex-1" data-v-589c8af2${_scopeId}><p class="text-sm font-medium text-gray-600" data-v-589c8af2${_scopeId}>Invoice Lunas</p><p class="text-2xl font-bold text-green-600" data-v-589c8af2${_scopeId}>${ssrInterpolate(((_b = __props.stats) == null ? void 0 : _b.paid_invoices) || 0)}</p></div><div class="p-3 bg-green-100 rounded-full" data-v-589c8af2${_scopeId}><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-589c8af2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-589c8af2${_scopeId}></path></svg></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-589c8af2${_scopeId}><div class="flex items-center" data-v-589c8af2${_scopeId}><div class="flex-1" data-v-589c8af2${_scopeId}><p class="text-sm font-medium text-gray-600" data-v-589c8af2${_scopeId}>Invoice Overdue</p><p class="text-2xl font-bold text-red-600" data-v-589c8af2${_scopeId}>${ssrInterpolate(((_c = __props.stats) == null ? void 0 : _c.overdue_invoices) || 0)}</p></div><div class="p-3 bg-red-100 rounded-full" data-v-589c8af2${_scopeId}><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-589c8af2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-589c8af2${_scopeId}></path></svg></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-589c8af2${_scopeId}><div class="flex items-center" data-v-589c8af2${_scopeId}><div class="flex-1" data-v-589c8af2${_scopeId}><p class="text-sm font-medium text-gray-600" data-v-589c8af2${_scopeId}>Outstanding Amount</p><p class="text-2xl font-bold text-amber-600" data-v-589c8af2${_scopeId}>${ssrInterpolate(formatCurrency(((_d = __props.stats) == null ? void 0 : _d.outstanding_amount) || 0))}</p></div><div class="p-3 bg-amber-100 rounded-full" data-v-589c8af2${_scopeId}><svg class="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-589c8af2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75" data-v-589c8af2${_scopeId}></path></svg></div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-589c8af2${_scopeId}><div class="flex flex-col sm:flex-row gap-4" data-v-589c8af2${_scopeId}><div class="flex-1" data-v-589c8af2${_scopeId}><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari berdasarkan nomor invoice, customer, atau sales order..." class="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-589c8af2${_scopeId}></div><div class="w-48" data-v-589c8af2${_scopeId}><select class="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-589c8af2${_scopeId}><option value="" data-v-589c8af2${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "") : ssrLooseEqual(form.status, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="draft" data-v-589c8af2${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "draft") : ssrLooseEqual(form.status, "draft")) ? " selected" : ""}${_scopeId}>Draft</option><option value="sent" data-v-589c8af2${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "sent") : ssrLooseEqual(form.status, "sent")) ? " selected" : ""}${_scopeId}>Terkirim</option><option value="paid" data-v-589c8af2${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "paid") : ssrLooseEqual(form.status, "paid")) ? " selected" : ""}${_scopeId}>Dibayar</option><option value="overdue" data-v-589c8af2${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "overdue") : ssrLooseEqual(form.status, "overdue")) ? " selected" : ""}${_scopeId}>Overdue</option><option value="cancelled" data-v-589c8af2${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "cancelled") : ssrLooseEqual(form.status, "cancelled")) ? " selected" : ""}${_scopeId}>Dibatalkan</option></select></div><div class="w-48" data-v-589c8af2${_scopeId}><select class="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-589c8af2${_scopeId}><option value="" data-v-589c8af2${ssrIncludeBooleanAttr(Array.isArray(form.invoice_type) ? ssrLooseContain(form.invoice_type, "") : ssrLooseEqual(form.invoice_type, "")) ? " selected" : ""}${_scopeId}>Semua Tipe</option><option value="main" data-v-589c8af2${ssrIncludeBooleanAttr(Array.isArray(form.invoice_type) ? ssrLooseContain(form.invoice_type, "main") : ssrLooseEqual(form.invoice_type, "main")) ? " selected" : ""}${_scopeId}>Main Invoice</option><option value="reimbursement" data-v-589c8af2${ssrIncludeBooleanAttr(Array.isArray(form.invoice_type) ? ssrLooseContain(form.invoice_type, "reimbursement") : ssrLooseEqual(form.invoice_type, "reimbursement")) ? " selected" : ""}${_scopeId}>Reimbursement</option></select></div><div class="w-48" data-v-589c8af2${_scopeId}><input${ssrRenderAttr("value", form.date_from)} type="date" placeholder="Dari Tanggal" class="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-589c8af2${_scopeId}></div><div class="w-48" data-v-589c8af2${_scopeId}><input${ssrRenderAttr("value", form.date_to)} type="date" placeholder="Sampai Tanggal" class="w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-589c8af2${_scopeId}></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-589c8af2${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-589c8af2${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-589c8af2${_scopeId}>Daftar Invoice</h3></div><div class="overflow-x-auto" data-v-589c8af2${_scopeId}><table class="w-full" data-v-589c8af2${_scopeId}><thead class="bg-sage-50" data-v-589c8af2${_scopeId}><tr data-v-589c8af2${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-589c8af2${_scopeId}> Invoice Number </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-589c8af2${_scopeId}> Customer </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-589c8af2${_scopeId}> Sales Order </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-589c8af2${_scopeId}> Invoice Date </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-589c8af2${_scopeId}> Due Date </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-589c8af2${_scopeId}> Total </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-589c8af2${_scopeId}> Profit Margin </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-589c8af2${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-589c8af2${_scopeId}> Payment Status </th><th class="px-6 py-3 text-center text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-589c8af2${_scopeId}> Aksi </th></tr></thead><tbody class="bg-white divide-y divide-sage-200" data-v-589c8af2${_scopeId}><!--[-->`);
            ssrRenderList(__props.invoices.data, (invoice) => {
              var _a2, _b2, _c2, _d2, _e2;
              _push2(`<tr class="hover:bg-sage-50" data-v-589c8af2${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-589c8af2${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-589c8af2${_scopeId}>${ssrInterpolate(invoice.invoice_number)}</div><div class="mt-1 flex flex-wrap gap-1" data-v-589c8af2${_scopeId}><!--[-->`);
              ssrRenderList(invoice.invoice_types || [invoice.invoice_type], (type) => {
                _push2(`<span class="${ssrRenderClass([
                  "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                  type === "main" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"
                ])}" data-v-589c8af2${_scopeId}>${ssrInterpolate(type === "main" ? "Main" : "Reimbursement")}</span>`);
              });
              _push2(`<!--]--></div></td><td class="px-6 py-4 whitespace-nowrap" data-v-589c8af2${_scopeId}><div class="text-sm text-gray-900" data-v-589c8af2${_scopeId}>${ssrInterpolate(((_a2 = invoice.customer) == null ? void 0 : _a2.consignee_shipper) || ((_b2 = invoice.customer) == null ? void 0 : _b2.company_name) || ((_c2 = invoice.sales_order) == null ? void 0 : _c2.customer) || ((_d2 = invoice.sales_order) == null ? void 0 : _d2.customer_name) || "-")}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-589c8af2${_scopeId}><div class="text-sm text-gray-900" data-v-589c8af2${_scopeId}>${ssrInterpolate(((_e2 = invoice.sales_order) == null ? void 0 : _e2.order_number) || "-")}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-589c8af2${_scopeId}><div class="text-sm text-gray-900" data-v-589c8af2${_scopeId}>${ssrInterpolate(formatDate(invoice.invoice_date))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-589c8af2${_scopeId}><div class="text-sm text-gray-900" data-v-589c8af2${_scopeId}>${ssrInterpolate(formatDate(invoice.due_date))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-589c8af2${_scopeId}><div class="text-sm text-gray-900" data-v-589c8af2${_scopeId}>${ssrInterpolate(formatCurrency(invoice.total))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-589c8af2${_scopeId}><span class="${ssrRenderClass([getProfitMarginClass(calculateProfitMargin(invoice)), "inline-flex items-center px-2 py-1 rounded-full text-sm font-medium"])}" data-v-589c8af2${_scopeId}>${ssrInterpolate(calculateProfitMargin(invoice).toFixed(1))}% </span></td><td class="px-6 py-4 whitespace-nowrap" data-v-589c8af2${_scopeId}><span class="${ssrRenderClass([getStatusColor(invoice.status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-589c8af2${_scopeId}>${ssrInterpolate(getStatusLabel(invoice.status))}</span></td><td class="px-6 py-4 whitespace-nowrap" data-v-589c8af2${_scopeId}><span class="${ssrRenderClass([getPaymentStatusColor(invoice), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-589c8af2${_scopeId}>${ssrInterpolate(getPaymentStatusLabel(invoice))}</span></td><td class="px-6 py-4 whitespace-nowrap text-center space-x-2" data-v-589c8af2${_scopeId}><div class="flex items-center justify-center space-x-2" data-v-589c8af2${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.invoices.show", invoice.id),
                class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
                title: "Lihat Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-589c8af2${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-589c8af2${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-589c8af2${_scopeId2}></path></svg>`);
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
              if (invoice.status === "draft") {
                _push2(ssrRenderComponent(unref(Link), {
                  href: unref(route)("admin-keuangan.invoices.edit", invoice.id),
                  class: "inline-flex items-center justify-center w-8 h-8 text-amber-600 hover:text-amber-900 hover:bg-amber-100 rounded-full transition-colors",
                  title: "Edit"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-589c8af2${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-589c8af2${_scopeId2}></path></svg>`);
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
                _push2(`<!---->`);
              }
              _push2(`<a${ssrRenderAttr("href", unref(route)("admin-keuangan.invoices.export-pdf", invoice.id))} class="inline-flex items-center justify-center w-8 h-8 text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-full transition-colors" title="Export to PDF" target="_blank" data-v-589c8af2${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-589c8af2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" data-v-589c8af2${_scopeId}></path></svg></a></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.invoices.data.length === 0) {
              _push2(`<div class="text-center py-12" data-v-589c8af2${_scopeId}><svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-589c8af2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-589c8af2${_scopeId}></path></svg><p class="text-gray-500" data-v-589c8af2${_scopeId}>Belum ada invoice yang dibuat</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.invoices.data.length > 0) {
              _push2(`<div class="px-6 py-4 border-t border-sage-200" data-v-589c8af2${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.invoices }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
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
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Invoice Management"),
                        createVNode("p", { class: "text-sage-600" }, "Kelola invoice untuk sales order yang telah disetujui")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0 flex gap-3" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.invoices.payment-history"),
                        class: "inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
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
                              d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75"
                            })
                          ])),
                          createTextVNode(" Payment History ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.invoices.create"),
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
                          createTextVNode(" Buat Invoice ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Total Invoice"),
                        createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(((_e = __props.stats) == null ? void 0 : _e.total_invoices) || 0), 1)
                      ]),
                      createVNode("div", { class: "p-3 bg-blue-100 rounded-full" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-blue-600",
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
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Invoice Lunas"),
                        createVNode("p", { class: "text-2xl font-bold text-green-600" }, toDisplayString(((_f = __props.stats) == null ? void 0 : _f.paid_invoices) || 0), 1)
                      ]),
                      createVNode("div", { class: "p-3 bg-green-100 rounded-full" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-green-600",
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
                        ]))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Invoice Overdue"),
                        createVNode("p", { class: "text-2xl font-bold text-red-600" }, toDisplayString(((_g = __props.stats) == null ? void 0 : _g.overdue_invoices) || 0), 1)
                      ]),
                      createVNode("div", { class: "p-3 bg-red-100 rounded-full" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-red-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ]))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "flex-1" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Outstanding Amount"),
                        createVNode("p", { class: "text-2xl font-bold text-amber-600" }, toDisplayString(formatCurrency(((_h = __props.stats) == null ? void 0 : _h.outstanding_amount) || 0)), 1)
                      ]),
                      createVNode("div", { class: "p-3 bg-amber-100 rounded-full" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-amber-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75"
                          })
                        ]))
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                    createVNode("div", { class: "flex-1" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => form.search = $event,
                        onInput: unref(search),
                        type: "text",
                        placeholder: "Cari berdasarkan nomor invoice, customer, atau sales order...",
                        class: "w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                        [vModelText, form.search]
                      ])
                    ]),
                    createVNode("div", { class: "w-48" }, [
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => form.status = $event,
                        onChange: unref(search),
                        class: "w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
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
                        class: "w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, [
                        createVNode("option", { value: "" }, "Semua Tipe"),
                        createVNode("option", { value: "main" }, "Main Invoice"),
                        createVNode("option", { value: "reimbursement" }, "Reimbursement")
                      ], 40, ["onUpdate:modelValue", "onChange"]), [
                        [vModelSelect, form.invoice_type]
                      ])
                    ]),
                    createVNode("div", { class: "w-48" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => form.date_from = $event,
                        onChange: unref(search),
                        type: "date",
                        placeholder: "Dari Tanggal",
                        class: "w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, null, 40, ["onUpdate:modelValue", "onChange"]), [
                        [vModelText, form.date_from]
                      ])
                    ]),
                    createVNode("div", { class: "w-48" }, [
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => form.date_to = $event,
                        onChange: unref(search),
                        type: "date",
                        placeholder: "Sampai Tanggal",
                        class: "w-full px-4 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, null, 40, ["onUpdate:modelValue", "onChange"]), [
                        [vModelText, form.date_to]
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Daftar Invoice")
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Invoice Number "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Customer "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Sales Order "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Invoice Date "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Due Date "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Total "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Profit Margin "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Status "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Payment Status "),
                          createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Aksi ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.invoices.data, (invoice) => {
                          var _a2, _b2, _c2, _d2, _e2;
                          return openBlock(), createBlock("tr", {
                            key: invoice.id,
                            class: "hover:bg-sage-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(invoice.invoice_number), 1),
                              createVNode("div", { class: "mt-1 flex flex-wrap gap-1" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(invoice.invoice_types || [invoice.invoice_type], (type) => {
                                  return openBlock(), createBlock("span", {
                                    key: type,
                                    class: [
                                      "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium",
                                      type === "main" ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"
                                    ]
                                  }, toDisplayString(type === "main" ? "Main" : "Reimbursement"), 3);
                                }), 128))
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(((_a2 = invoice.customer) == null ? void 0 : _a2.consignee_shipper) || ((_b2 = invoice.customer) == null ? void 0 : _b2.company_name) || ((_c2 = invoice.sales_order) == null ? void 0 : _c2.customer) || ((_d2 = invoice.sales_order) == null ? void 0 : _d2.customer_name) || "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(((_e2 = invoice.sales_order) == null ? void 0 : _e2.order_number) || "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(invoice.invoice_date)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(invoice.due_date)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatCurrency(invoice.total)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("span", {
                                class: ["inline-flex items-center px-2 py-1 rounded-full text-sm font-medium", getProfitMarginClass(calculateProfitMargin(invoice))]
                              }, toDisplayString(calculateProfitMargin(invoice).toFixed(1)) + "% ", 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("span", {
                                class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusColor(invoice.status)]
                              }, toDisplayString(getStatusLabel(invoice.status)), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("span", {
                                class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getPaymentStatusColor(invoice)]
                              }, toDisplayString(getPaymentStatusLabel(invoice)), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center space-x-2" }, [
                              createVNode("div", { class: "flex items-center justify-center space-x-2" }, [
                                createVNode(unref(Link), {
                                  href: unref(route)("admin-keuangan.invoices.show", invoice.id),
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
                                invoice.status === "draft" ? (openBlock(), createBlock(unref(Link), {
                                  key: 0,
                                  href: unref(route)("admin-keuangan.invoices.edit", invoice.id),
                                  class: "inline-flex items-center justify-center w-8 h-8 text-amber-600 hover:text-amber-900 hover:bg-amber-100 rounded-full transition-colors",
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
                                }, 1032, ["href"])) : createCommentVNode("", true),
                                createVNode("a", {
                                  href: unref(route)("admin-keuangan.invoices.export-pdf", invoice.id),
                                  class: "inline-flex items-center justify-center w-8 h-8 text-purple-600 hover:text-purple-900 hover:bg-purple-100 rounded-full transition-colors",
                                  title: "Export to PDF",
                                  target: "_blank"
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
                                      d: "M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                                    })
                                  ]))
                                ], 8, ["href"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  __props.invoices.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center py-12"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-12 h-12 text-gray-400 mx-auto mb-4",
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
                    createVNode("p", { class: "text-gray-500" }, "Belum ada invoice yang dibuat")
                  ])) : createCommentVNode("", true),
                  __props.invoices.data.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "px-6 py-4 border-t border-sage-200"
                  }, [
                    createVNode(Pagination, { data: __props.invoices }, null, 8, ["data"])
                  ])) : createCommentVNode("", true)
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
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-589c8af2"]]);
export {
  Index as default
};
