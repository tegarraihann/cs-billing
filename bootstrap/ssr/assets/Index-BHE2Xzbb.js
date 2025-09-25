import { reactive, ref, computed, mergeProps, withCtx, createVNode, createBlock, createCommentVNode, toDisplayString, withDirectives, vModelText, vModelSelect, openBlock, Fragment, renderList, createTextVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-DXgDL1QY.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-COHQr_F5.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./AutoLogoutTimer-hMhdGsqb.js";
import "axios";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    receivables: Object,
    summary: Object,
    customerSummary: Array,
    customers: Array,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const searchForm = reactive({
      search: props.filters.search || "",
      status: props.filters.status || "",
      customer_id: props.filters.customer_id || "",
      date_from: props.filters.date_from || "",
      date_to: props.filters.date_to || ""
    });
    const showPaymentModal = ref(false);
    const selectedReceivable = ref(null);
    const processing = ref(false);
    const paymentForm = reactive({
      amount: "",
      payment_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      notes: ""
    });
    let debounceTimer = null;
    const debounceSearch = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        applyFilters();
      }, 500);
    };
    const currentPageTotals = computed(() => {
      if (!props.receivables.data || props.receivables.data.length === 0) {
        return {
          totalAmount: 0,
          totalPaid: 0,
          totalOutstanding: 0
        };
      }
      return {
        totalAmount: props.receivables.data.reduce((sum, item) => sum + (parseFloat(item.invoice_amount) || 0), 0),
        totalPaid: props.receivables.data.reduce((sum, item) => sum + (parseFloat(item.paid_amount) || 0), 0),
        totalOutstanding: props.receivables.data.reduce((sum, item) => sum + (parseFloat(item.outstanding_amount) || 0), 0)
      };
    });
    const customerSummaryTotals = computed(() => {
      if (!props.customerSummary || props.customerSummary.length === 0) {
        return {
          totalAmount: 0,
          totalPaid: 0,
          totalOutstanding: 0,
          totalInvoices: 0,
          totalOverdue: 0
        };
      }
      return {
        totalAmount: props.customerSummary.reduce((sum, customer) => sum + (parseFloat(customer.total_amount) || 0), 0),
        totalPaid: props.customerSummary.reduce((sum, customer) => sum + (parseFloat(customer.total_paid) || 0), 0),
        totalOutstanding: props.customerSummary.reduce((sum, customer) => sum + (parseFloat(customer.total_outstanding) || 0), 0),
        totalInvoices: props.customerSummary.reduce((sum, customer) => sum + (parseInt(customer.count_invoices) || 0), 0),
        totalOverdue: props.customerSummary.reduce((sum, customer) => sum + (parseInt(customer.count_overdue) || 0), 0)
      };
    });
    const applyFilters = () => {
      router.get(route("admin-keuangan.account-receivables.index"), searchForm, {
        preserveState: true,
        replace: true
      });
    };
    const formatNumber = (number) => {
      return new Intl.NumberFormat("id-ID").format(number || 0);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getStatusClass = (status) => {
      const classes = {
        outstanding: "bg-yellow-100 text-yellow-800",
        partial: "bg-blue-100 text-blue-800",
        overdue: "bg-red-100 text-red-800",
        paid: "bg-green-100 text-green-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusText = (status) => {
      const texts = {
        outstanding: "Outstanding",
        partial: "Partial",
        overdue: "Overdue",
        paid: "Paid"
      };
      return texts[status] || status;
    };
    const showReceivable = (receivable) => {
      router.visit(route("admin-keuangan.account-receivables.show", receivable.id));
    };
    const openPaymentModal = (receivable) => {
      selectedReceivable.value = receivable;
      paymentForm.amount = "";
      paymentForm.notes = "";
      showPaymentModal.value = true;
    };
    const closePaymentModal = () => {
      showPaymentModal.value = false;
      selectedReceivable.value = null;
    };
    const recordPayment = () => {
      processing.value = true;
      router.post(
        route("admin-keuangan.account-receivables.record-payment", selectedReceivable.value.id),
        paymentForm,
        {
          onSuccess: () => {
            closePaymentModal();
            processing.value = false;
          },
          onError: () => {
            processing.value = false;
          }
        }
      );
    };
    const generateSOA = (customer) => {
      const params = new URLSearchParams({
        date_from: searchForm.date_from || "",
        date_to: searchForm.date_to || "",
        include_paid: "false"
      }).toString();
      window.open(
        route("admin-keuangan.account-receivables.generate-soa", customer.id) + "?" + params,
        "_blank"
      );
    };
    const visitPage = (url) => {
      router.visit(url, {
        preserveState: true,
        replace: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, mergeProps({ title: "Manajemen Piutang" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto"${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><div class="flex justify-between items-center mb-4"${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Manajemen Piutang</h1></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"${_scopeId}><div class="bg-blue-50 p-4 rounded-lg border border-blue-200"${_scopeId}><div class="text-sm font-medium text-blue-600"${_scopeId}>Total Outstanding</div><div class="text-2xl font-bold text-blue-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.summary.total_outstanding))}</div></div><div class="bg-red-50 p-4 rounded-lg border border-red-200"${_scopeId}><div class="text-sm font-medium text-red-600"${_scopeId}>Total Overdue</div><div class="text-2xl font-bold text-red-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.summary.total_overdue))}</div></div><div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200"${_scopeId}><div class="text-sm font-medium text-yellow-600"${_scopeId}>Jumlah Overdue</div><div class="text-2xl font-bold text-yellow-900"${_scopeId}>${ssrInterpolate(__props.summary.count_overdue)} invoice </div></div><div class="bg-green-50 p-4 rounded-lg border border-green-200"${_scopeId}><div class="text-sm font-medium text-green-600"${_scopeId}>Outstanding Active</div><div class="text-2xl font-bold text-green-900"${_scopeId}>${ssrInterpolate(__props.summary.count_outstanding)} invoice </div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Search</label><input${ssrRenderAttr("value", searchForm.search)} type="text" placeholder="Cari invoice atau customer..." class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Status</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "") : ssrLooseEqual(searchForm.status, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="outstanding"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "outstanding") : ssrLooseEqual(searchForm.status, "outstanding")) ? " selected" : ""}${_scopeId}>Outstanding</option><option value="partial"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "partial") : ssrLooseEqual(searchForm.status, "partial")) ? " selected" : ""}${_scopeId}>Partial</option><option value="overdue"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "overdue") : ssrLooseEqual(searchForm.status, "overdue")) ? " selected" : ""}${_scopeId}>Overdue</option><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "paid") : ssrLooseEqual(searchForm.status, "paid")) ? " selected" : ""}${_scopeId}>Paid</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Customer</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(searchForm.customer_id) ? ssrLooseContain(searchForm.customer_id, "") : ssrLooseEqual(searchForm.customer_id, "")) ? " selected" : ""}${_scopeId}>Semua Customer</option><!--[-->`);
            ssrRenderList(__props.customers, (customer) => {
              _push2(`<option${ssrRenderAttr("value", customer.id)}${ssrIncludeBooleanAttr(Array.isArray(searchForm.customer_id) ? ssrLooseContain(searchForm.customer_id, customer.id) : ssrLooseEqual(searchForm.customer_id, customer.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(customer.company_name)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Dari Tanggal</label><input${ssrRenderAttr("value", searchForm.date_from)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Sampai Tanggal</label><input${ssrRenderAttr("value", searchForm.date_to)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div></div></div>`);
            if (__props.customerSummary && __props.customerSummary.length > 0) {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Ringkasan Per Customer</h3><div class="overflow-x-auto"${_scopeId}><table class="min-w-full"${_scopeId}><thead${_scopeId}><tr class="border-b border-gray-200"${_scopeId}><th class="text-left py-2 text-sm font-medium text-gray-500"${_scopeId}>Customer</th><th class="text-right py-2 text-sm font-medium text-gray-500"${_scopeId}>Total Invoice</th><th class="text-right py-2 text-sm font-medium text-gray-500"${_scopeId}>Total Paid</th><th class="text-right py-2 text-sm font-medium text-gray-500"${_scopeId}>Outstanding</th><th class="text-center py-2 text-sm font-medium text-gray-500"${_scopeId}>Jumlah Invoice</th><th class="text-center py-2 text-sm font-medium text-gray-500"${_scopeId}>Overdue</th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(__props.customerSummary, (customer) => {
                _push2(`<tr class="border-b border-gray-100 hover:bg-gray-50"${_scopeId}><td class="py-2 text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(customer.customer_name)}</td><td class="py-2 text-sm text-right text-gray-900"${_scopeId}>Rp ${ssrInterpolate(formatNumber(customer.total_amount))}</td><td class="py-2 text-sm text-right text-gray-900"${_scopeId}>Rp ${ssrInterpolate(formatNumber(customer.total_paid))}</td><td class="${ssrRenderClass([customer.total_outstanding > 0 ? "text-red-600" : "text-green-600", "py-2 text-sm text-right font-semibold"])}"${_scopeId}> Rp ${ssrInterpolate(formatNumber(customer.total_outstanding))}</td><td class="py-2 text-sm text-center text-gray-900"${_scopeId}>${ssrInterpolate(customer.count_invoices)}</td><td class="${ssrRenderClass([customer.count_overdue > 0 ? "text-red-600 font-semibold" : "text-gray-900", "py-2 text-sm text-center"])}"${_scopeId}>${ssrInterpolate(customer.count_overdue)}</td></tr>`);
              });
              _push2(`<!--]--></tbody><tfoot class="bg-gray-50 font-semibold"${_scopeId}><tr${_scopeId}><td class="py-2 text-sm text-gray-900"${_scopeId}>Total</td><td class="py-2 text-sm text-right text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(customerSummaryTotals.value.totalAmount))}</td><td class="py-2 text-sm text-right text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(customerSummaryTotals.value.totalPaid))}</td><td class="py-2 text-sm text-right text-red-600"${_scopeId}> Rp ${ssrInterpolate(formatNumber(customerSummaryTotals.value.totalOutstanding))}</td><td class="py-2 text-sm text-center text-gray-900"${_scopeId}>${ssrInterpolate(customerSummaryTotals.value.totalInvoices)}</td><td class="py-2 text-sm text-center text-red-600"${_scopeId}>${ssrInterpolate(customerSummaryTotals.value.totalOverdue)}</td></tr></tfoot></table></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white rounded-lg shadow-sm overflow-hidden"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Invoice </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Customer </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> SO Number </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Amount </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Paid </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Outstanding </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.receivables.data, (receivable) => {
              var _a2, _b2;
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(receivable.invoice_number)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(receivable.invoice_date))}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_a2 = receivable.customer) == null ? void 0 : _a2.company_name) || receivable.customer_name)}</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_b2 = receivable.sales_order) == null ? void 0 : _b2.order_number) || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(receivable.invoice_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(receivable.paid_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(receivable.outstanding_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-center"${_scopeId}><span class="${ssrRenderClass([getStatusClass(receivable.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(receivable.status))} `);
              if (receivable.days_overdue > 0) {
                _push2(`<span class="ml-1"${_scopeId}> (${ssrInterpolate(receivable.days_overdue)} hari) </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"${_scopeId}><div class="flex items-center justify-center space-x-2"${_scopeId}><button class="text-blue-600 hover:text-blue-900" title="Lihat Detail"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg></button>`);
              if (receivable.status !== "paid") {
                _push2(`<button class="text-green-600 hover:text-green-900" title="Record Payment"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              if (receivable.customer) {
                _push2(`<button class="text-purple-600 hover:text-purple-900" title="Generate SOA"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"${_scopeId}></path></svg></button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]--></tbody><tfoot class="bg-gray-100 font-semibold"${_scopeId}><tr${_scopeId}><td colspan="3" class="px-6 py-4 text-left text-sm text-gray-900"${_scopeId}> Total Halaman Ini (${ssrInterpolate(__props.receivables.data.length)} items) </td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(currentPageTotals.value.totalAmount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(currentPageTotals.value.totalPaid))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(currentPageTotals.value.totalOutstanding))}</td><td colspan="2" class="px-6 py-4"${_scopeId}></td></tr></tfoot></table></div><div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(__props.receivables.from || 0)} to ${ssrInterpolate(__props.receivables.to || 0)} of ${ssrInterpolate(__props.receivables.total || 0)} results </div><div class="flex space-x-1"${_scopeId}><!--[-->`);
            ssrRenderList(__props.receivables.links, (link) => {
              _push2(`<!--[-->`);
              if (link.url) {
                _push2(`<button class="${ssrRenderClass([
                  "px-3 py-2 text-sm rounded-md",
                  link.active ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-300"
                ])}"${_scopeId}>${link.label ?? ""}</button>`);
              } else {
                _push2(`<span class="px-3 py-2 text-sm text-gray-400"${_scopeId}>${link.label ?? ""}</span>`);
              }
              _push2(`<!--]-->`);
            });
            _push2(`<!--]--></div></div></div></div></div>`);
            if (showPaymentModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"${_scopeId}><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"${_scopeId}><div class="mt-3"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Record Payment</h3><div class="mb-4"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}>Invoice: ${ssrInterpolate((_a = selectedReceivable.value) == null ? void 0 : _a.invoice_number)}</p><p class="text-sm text-gray-600"${_scopeId}>Outstanding: Rp ${ssrInterpolate(formatNumber((_b = selectedReceivable.value) == null ? void 0 : _b.outstanding_amount))}</p></div><form${_scopeId}><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Amount</label><input${ssrRenderAttr("value", paymentForm.amount)} type="number" step="0.01"${ssrRenderAttr("max", (_c = selectedReceivable.value) == null ? void 0 : _c.outstanding_amount)} required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Payment Date</label><input${ssrRenderAttr("value", paymentForm.payment_date)} type="date" required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Notes</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}>${ssrInterpolate(paymentForm.notes)}</textarea></div><div class="flex justify-end space-x-3"${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"${_scopeId}> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"${_scopeId}>${ssrInterpolate(processing.value ? "Recording..." : "Record Payment")}</button></div></form></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Manajemen Piutang")
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" }, [
                    createVNode("div", { class: "bg-blue-50 p-4 rounded-lg border border-blue-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-blue-600" }, "Total Outstanding"),
                      createVNode("div", { class: "text-2xl font-bold text-blue-900" }, " Rp " + toDisplayString(formatNumber(__props.summary.total_outstanding)), 1)
                    ]),
                    createVNode("div", { class: "bg-red-50 p-4 rounded-lg border border-red-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-red-600" }, "Total Overdue"),
                      createVNode("div", { class: "text-2xl font-bold text-red-900" }, " Rp " + toDisplayString(formatNumber(__props.summary.total_overdue)), 1)
                    ]),
                    createVNode("div", { class: "bg-yellow-50 p-4 rounded-lg border border-yellow-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-yellow-600" }, "Jumlah Overdue"),
                      createVNode("div", { class: "text-2xl font-bold text-yellow-900" }, toDisplayString(__props.summary.count_overdue) + " invoice ", 1)
                    ]),
                    createVNode("div", { class: "bg-green-50 p-4 rounded-lg border border-green-200" }, [
                      createVNode("div", { class: "text-sm font-medium text-green-600" }, "Outstanding Active"),
                      createVNode("div", { class: "text-2xl font-bold text-green-900" }, toDisplayString(__props.summary.count_outstanding) + " invoice ", 1)
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Search"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchForm.search = $event,
                        type: "text",
                        placeholder: "Cari invoice atau customer...",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                        onInput: debounceSearch
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchForm.search]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Status"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => searchForm.status = $event,
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                        onChange: applyFilters
                      }, [
                        createVNode("option", { value: "" }, "Semua Status"),
                        createVNode("option", { value: "outstanding" }, "Outstanding"),
                        createVNode("option", { value: "partial" }, "Partial"),
                        createVNode("option", { value: "overdue" }, "Overdue"),
                        createVNode("option", { value: "paid" }, "Paid")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, searchForm.status]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Customer"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => searchForm.customer_id = $event,
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                        onChange: applyFilters
                      }, [
                        createVNode("option", { value: "" }, "Semua Customer"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.customers, (customer) => {
                          return openBlock(), createBlock("option", {
                            key: customer.id,
                            value: customer.id
                          }, toDisplayString(customer.company_name), 9, ["value"]);
                        }), 128))
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, searchForm.customer_id]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Dari Tanggal"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchForm.date_from = $event,
                        type: "date",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                        onChange: applyFilters
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchForm.date_from]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Sampai Tanggal"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => searchForm.date_to = $event,
                        type: "date",
                        class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                        onChange: applyFilters
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, searchForm.date_to]
                      ])
                    ])
                  ])
                ]),
                __props.customerSummary && __props.customerSummary.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-white rounded-lg shadow-sm p-6 mb-6"
                }, [
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Ringkasan Per Customer"),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "min-w-full" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "border-b border-gray-200" }, [
                          createVNode("th", { class: "text-left py-2 text-sm font-medium text-gray-500" }, "Customer"),
                          createVNode("th", { class: "text-right py-2 text-sm font-medium text-gray-500" }, "Total Invoice"),
                          createVNode("th", { class: "text-right py-2 text-sm font-medium text-gray-500" }, "Total Paid"),
                          createVNode("th", { class: "text-right py-2 text-sm font-medium text-gray-500" }, "Outstanding"),
                          createVNode("th", { class: "text-center py-2 text-sm font-medium text-gray-500" }, "Jumlah Invoice"),
                          createVNode("th", { class: "text-center py-2 text-sm font-medium text-gray-500" }, "Overdue")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.customerSummary, (customer) => {
                          return openBlock(), createBlock("tr", {
                            key: customer.customer_id,
                            class: "border-b border-gray-100 hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "py-2 text-sm font-medium text-gray-900" }, toDisplayString(customer.customer_name), 1),
                            createVNode("td", { class: "py-2 text-sm text-right text-gray-900" }, "Rp " + toDisplayString(formatNumber(customer.total_amount)), 1),
                            createVNode("td", { class: "py-2 text-sm text-right text-gray-900" }, "Rp " + toDisplayString(formatNumber(customer.total_paid)), 1),
                            createVNode("td", {
                              class: ["py-2 text-sm text-right font-semibold", customer.total_outstanding > 0 ? "text-red-600" : "text-green-600"]
                            }, " Rp " + toDisplayString(formatNumber(customer.total_outstanding)), 3),
                            createVNode("td", { class: "py-2 text-sm text-center text-gray-900" }, toDisplayString(customer.count_invoices), 1),
                            createVNode("td", {
                              class: ["py-2 text-sm text-center", customer.count_overdue > 0 ? "text-red-600 font-semibold" : "text-gray-900"]
                            }, toDisplayString(customer.count_overdue), 3)
                          ]);
                        }), 128))
                      ]),
                      createVNode("tfoot", { class: "bg-gray-50 font-semibold" }, [
                        createVNode("tr", null, [
                          createVNode("td", { class: "py-2 text-sm text-gray-900" }, "Total"),
                          createVNode("td", { class: "py-2 text-sm text-right text-gray-900" }, " Rp " + toDisplayString(formatNumber(customerSummaryTotals.value.totalAmount)), 1),
                          createVNode("td", { class: "py-2 text-sm text-right text-gray-900" }, " Rp " + toDisplayString(formatNumber(customerSummaryTotals.value.totalPaid)), 1),
                          createVNode("td", { class: "py-2 text-sm text-right text-red-600" }, " Rp " + toDisplayString(formatNumber(customerSummaryTotals.value.totalOutstanding)), 1),
                          createVNode("td", { class: "py-2 text-sm text-center text-gray-900" }, toDisplayString(customerSummaryTotals.value.totalInvoices), 1),
                          createVNode("td", { class: "py-2 text-sm text-center text-red-600" }, toDisplayString(customerSummaryTotals.value.totalOverdue), 1)
                        ])
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm overflow-hidden" }, [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Invoice "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Customer "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " SO Number "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Amount "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Paid "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Outstanding "),
                          createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                          createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.receivables.data, (receivable) => {
                          var _a2, _b2;
                          return openBlock(), createBlock("tr", {
                            key: receivable.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(receivable.invoice_number), 1),
                              createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(receivable.invoice_date)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_a2 = receivable.customer) == null ? void 0 : _a2.company_name) || receivable.customer_name), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(((_b2 = receivable.sales_order) == null ? void 0 : _b2.order_number) || "-"), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(receivable.invoice_amount)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(receivable.paid_amount)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(receivable.outstanding_amount)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center" }, [
                              createVNode("span", {
                                class: [getStatusClass(receivable.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                              }, [
                                createTextVNode(toDisplayString(getStatusText(receivable.status)) + " ", 1),
                                receivable.days_overdue > 0 ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "ml-1"
                                }, " (" + toDisplayString(receivable.days_overdue) + " hari) ", 1)) : createCommentVNode("", true)
                              ], 2)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm font-medium" }, [
                              createVNode("div", { class: "flex items-center justify-center space-x-2" }, [
                                createVNode("button", {
                                  onClick: ($event) => showReceivable(receivable),
                                  class: "text-blue-600 hover:text-blue-900",
                                  title: "Lihat Detail"
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
                                      d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    }),
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    })
                                  ]))
                                ], 8, ["onClick"]),
                                receivable.status !== "paid" ? (openBlock(), createBlock("button", {
                                  key: 0,
                                  onClick: ($event) => openPaymentModal(receivable),
                                  class: "text-green-600 hover:text-green-900",
                                  title: "Record Payment"
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
                                      d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                                    })
                                  ]))
                                ], 8, ["onClick"])) : createCommentVNode("", true),
                                receivable.customer ? (openBlock(), createBlock("button", {
                                  key: 1,
                                  onClick: ($event) => generateSOA(receivable.customer),
                                  class: "text-purple-600 hover:text-purple-900",
                                  title: "Generate SOA"
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
                                      d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    })
                                  ]))
                                ], 8, ["onClick"])) : createCommentVNode("", true)
                              ])
                            ])
                          ]);
                        }), 128))
                      ]),
                      createVNode("tfoot", { class: "bg-gray-100 font-semibold" }, [
                        createVNode("tr", null, [
                          createVNode("td", {
                            colspan: "3",
                            class: "px-6 py-4 text-left text-sm text-gray-900"
                          }, " Total Halaman Ini (" + toDisplayString(__props.receivables.data.length) + " items) ", 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(currentPageTotals.value.totalAmount)), 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(currentPageTotals.value.totalPaid)), 1),
                          createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(currentPageTotals.value.totalOutstanding)), 1),
                          createVNode("td", {
                            colspan: "2",
                            class: "px-6 py-4"
                          })
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white px-4 py-3 border-t border-gray-200 sm:px-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.receivables.from || 0) + " to " + toDisplayString(__props.receivables.to || 0) + " of " + toDisplayString(__props.receivables.total || 0) + " results ", 1),
                      createVNode("div", { class: "flex space-x-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.receivables.links, (link) => {
                          return openBlock(), createBlock(Fragment, {
                            key: link.label
                          }, [
                            link.url ? (openBlock(), createBlock("button", {
                              key: 0,
                              onClick: ($event) => visitPage(link.url),
                              class: [
                                "px-3 py-2 text-sm rounded-md",
                                link.active ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-300"
                              ],
                              innerHTML: link.label
                            }, null, 10, ["onClick", "innerHTML"])) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "px-3 py-2 text-sm text-gray-400",
                              innerHTML: link.label
                            }, null, 8, ["innerHTML"]))
                          ], 64);
                        }), 128))
                      ])
                    ])
                  ])
                ])
              ]),
              showPaymentModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
              }, [
                createVNode("div", { class: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" }, [
                  createVNode("div", { class: "mt-3" }, [
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Record Payment"),
                    createVNode("div", { class: "mb-4" }, [
                      createVNode("p", { class: "text-sm text-gray-600" }, "Invoice: " + toDisplayString((_d = selectedReceivable.value) == null ? void 0 : _d.invoice_number), 1),
                      createVNode("p", { class: "text-sm text-gray-600" }, "Outstanding: Rp " + toDisplayString(formatNumber((_e = selectedReceivable.value) == null ? void 0 : _e.outstanding_amount)), 1)
                    ]),
                    createVNode("form", {
                      onSubmit: withModifiers(recordPayment, ["prevent"])
                    }, [
                      createVNode("div", { class: "mb-4" }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => paymentForm.amount = $event,
                          type: "number",
                          step: "0.01",
                          max: (_f = selectedReceivable.value) == null ? void 0 : _f.outstanding_amount,
                          required: "",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue", "max"]), [
                          [vModelText, paymentForm.amount]
                        ])
                      ]),
                      createVNode("div", { class: "mb-4" }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Payment Date"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => paymentForm.payment_date = $event,
                          type: "date",
                          required: "",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, paymentForm.payment_date]
                        ])
                      ]),
                      createVNode("div", { class: "mb-4" }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Notes"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => paymentForm.notes = $event,
                          rows: "3",
                          class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, paymentForm.notes]
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-3" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: closePaymentModal,
                          class: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        }, " Cancel "),
                        createVNode("button", {
                          type: "submit",
                          disabled: processing.value,
                          class: "px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                        }, toDisplayString(processing.value ? "Recording..." : "Record Payment"), 9, ["disabled"])
                      ])
                    ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/AccountReceivables/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
