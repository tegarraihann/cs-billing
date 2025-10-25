import { watch, mergeProps, useSSRContext, reactive, ref, withCtx, unref, createVNode, toDisplayString, createBlock, createCommentVNode, withDirectives, vModelText, vModelSelect, openBlock, Fragment, renderList, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderSlot, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-CTU0_3P0.js";
import { CreditCard, AlertTriangle, Users, Building2 } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-k8TKLlBi.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main$1 = {
  __name: "ReimbursementPaymentModal",
  __ssrInlineRender: true,
  props: {
    visible: Boolean,
    processing: Boolean,
    title: {
      type: String,
      default: "Mark Payment"
    },
    submitLabel: {
      type: String,
      default: "Mark Payment"
    },
    maxAmount: {
      type: Number,
      default: 0
    },
    bankAccounts: {
      type: Array,
      default: () => []
    },
    reimbursementItems: {
      type: Array,
      default: () => []
    },
    form: {
      type: Object,
      required: true
    }
  },
  emits: ["submit", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const formatNumber = (number) => new Intl.NumberFormat("id-ID").format(number || 0);
    const formatDate = (date) => date ? new Date(date).toLocaleDateString("id-ID") : "";
    const statusLabels = {
      pending: "Pending",
      linked: "Linked",
      invoiced: "Ditagihkan",
      paid: "Sudah Dibayar"
    };
    const statusClasses = {
      pending: "bg-gray-100 text-gray-700",
      linked: "bg-blue-100 text-blue-700",
      invoiced: "bg-orange-100 text-orange-700",
      paid: "bg-green-100 text-green-700"
    };
    const getStatusLabel = (status) => statusLabels[status] || status;
    const getStatusClass = (status) => statusClasses[status] || "bg-gray-100 text-gray-700";
    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          if (!props.form.payment_date) {
            props.form.payment_date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          }
          if (!props.form.reimbursement_paid_at) {
            props.form.reimbursement_paid_at = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          }
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.visible) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" }, _attrs))}><div class="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white"><div class="mt-3"><h3 class="text-lg font-medium text-gray-900 mb-4">${ssrInterpolate(__props.title)}</h3>`);
        ssrRenderSlot(_ctx.$slots, "summary", {}, null, _push, _parent);
        _push(`<form>`);
        ssrRenderSlot(_ctx.$slots, "before-fields", {}, null, _push, _parent);
        _push(`<div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-1">Amount *</label><input${ssrRenderAttr("value", __props.form.amount)} type="number" step="0.01"${ssrRenderAttr("max", __props.maxAmount)} required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Enter payment amount"></div><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label><input${ssrRenderAttr("value", __props.form.payment_date)} type="date" required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></div><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-1">Bank Account *</label><select required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(__props.form.bank_account_id) ? ssrLooseContain(__props.form.bank_account_id, "") : ssrLooseEqual(__props.form.bank_account_id, "")) ? " selected" : ""}>Select Bank Account</option><!--[-->`);
        ssrRenderList(__props.bankAccounts, (bank) => {
          _push(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(__props.form.bank_account_id) ? ssrLooseContain(__props.form.bank_account_id, bank.id) : ssrLooseEqual(__props.form.bank_account_id, bank.id)) ? " selected" : ""}>${ssrInterpolate(bank.bank_name)} - ${ssrInterpolate(bank.account_number)}</option>`);
        });
        _push(`<!--]--></select></div><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label><select required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(__props.form.payment_method) ? ssrLooseContain(__props.form.payment_method, "") : ssrLooseEqual(__props.form.payment_method, "")) ? " selected" : ""}>Select Payment Method</option><option value="Transfer Bank"${ssrIncludeBooleanAttr(Array.isArray(__props.form.payment_method) ? ssrLooseContain(__props.form.payment_method, "Transfer Bank") : ssrLooseEqual(__props.form.payment_method, "Transfer Bank")) ? " selected" : ""}>Transfer Bank</option><option value="Cash"${ssrIncludeBooleanAttr(Array.isArray(__props.form.payment_method) ? ssrLooseContain(__props.form.payment_method, "Cash") : ssrLooseEqual(__props.form.payment_method, "Cash")) ? " selected" : ""}>Cash</option><option value="Check"${ssrIncludeBooleanAttr(Array.isArray(__props.form.payment_method) ? ssrLooseContain(__props.form.payment_method, "Check") : ssrLooseEqual(__props.form.payment_method, "Check")) ? " selected" : ""}>Check</option><option value="Other"${ssrIncludeBooleanAttr(Array.isArray(__props.form.payment_method) ? ssrLooseContain(__props.form.payment_method, "Other") : ssrLooseEqual(__props.form.payment_method, "Other")) ? " selected" : ""}>Other</option></select></div><div class="mb-4"><label class="block text-sm font-medium text-gray-700 mb-1">Notes</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Payment notes (optional)">${ssrInterpolate(__props.form.notes)}</textarea></div>`);
        if (__props.reimbursementItems.length > 0) {
          _push(`<div class="mb-6 border-t border-gray-200 pt-4"><div class="flex items-center justify-between mb-3"><h4 class="text-sm font-semibold text-orange-700">Reimbursement Items</h4><span class="text-xs text-gray-500">Pilih reimbursement yang ikut dilunasi</span></div><div class="space-y-3 max-h-48 overflow-y-auto pr-1"><!--[-->`);
          ssrRenderList(__props.reimbursementItems, (item) => {
            _push(`<label class="${ssrRenderClass([item.status === "paid" ? "bg-green-50 border-green-200" : "border-gray-200", "flex items-start space-x-3 p-2 rounded-md border"])}"><input type="checkbox"${ssrRenderAttr("value", item.id)}${ssrIncludeBooleanAttr(Array.isArray(__props.form.reimbursement_items) ? ssrLooseContain(__props.form.reimbursement_items, item.id) : __props.form.reimbursement_items) ? " checked" : ""}${ssrIncludeBooleanAttr(item.status === "paid") ? " disabled" : ""} class="mt-1 h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"><div class="flex-1"><div class="flex items-center justify-between text-sm font-medium text-gray-900"><span>${ssrInterpolate(item.description)}</span><span>Rp ${ssrInterpolate(formatNumber(item.amount))}</span></div><div class="flex items-center text-xs text-gray-500 flex-wrap gap-x-2"><span class="${ssrRenderClass([getStatusClass(item.status), "inline-flex items-center px-2 py-0.5 rounded-full"])}">${ssrInterpolate(getStatusLabel(item.status))}</span>`);
            if (item.invoice_number) {
              _push(`<span>Invoice: ${ssrInterpolate(item.invoice_number)}</span>`);
            } else {
              _push(`<!---->`);
            }
            if (item.paid_at) {
              _push(`<span>Dibayar: ${ssrInterpolate(formatDate(item.paid_at))}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div></label>`);
          });
          _push(`<!--]--></div>`);
          if (__props.form.reimbursement_items.length > 0) {
            _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"><div><label class="block text-sm font-medium text-gray-700 mb-1">Vendor / Pembayar</label><input type="text"${ssrRenderAttr("value", __props.form.reimbursement_vendor_name)} class="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="Eshaka Wijaya Logistics"></div><div><label class="block text-sm font-medium text-gray-700 mb-1">Tanggal Bayar</label><input type="date"${ssrRenderAttr("value", __props.form.reimbursement_paid_at)} class="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"></div></div>`);
          } else {
            _push(`<!---->`);
          }
          if (__props.form.reimbursement_items.length > 0) {
            _push(`<div class="mt-4"><label class="block text-sm font-medium text-gray-700 mb-1">Catatan Reimbursement</label><textarea rows="2" class="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500" placeholder="Contoh: Talangan oleh Eshaka">${ssrInterpolate(__props.form.reimbursement_notes)}</textarea></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        ssrRenderSlot(_ctx.$slots, "after-fields", {}, null, _push, _parent);
        _push(`<div class="flex justify-end space-x-3 mt-6"><button type="button" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(__props.processing) ? " disabled" : ""} class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50">${ssrInterpolate(__props.processing ? "Processing..." : __props.submitLabel)}</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/ReimbursementPaymentModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    payables: Object,
    summary: Object,
    vendorSummary: Array,
    vendors: Array,
    filters: Object,
    bankAccounts: Array
  },
  setup(__props) {
    const props = __props;
    const searchForm = reactive({
      search: props.filters.search || "",
      status: props.filters.status || "",
      vendor_id: props.filters.vendor_id || "",
      date_from: props.filters.date_from || "",
      date_to: props.filters.date_to || ""
    });
    const showPaymentModal = ref(false);
    const selectedPayable = ref(null);
    const processing = ref(false);
    const reimbursementItems = ref([]);
    const paymentForm = reactive({
      amount: "",
      payment_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      bank_account_id: "",
      payment_method: "",
      notes: "",
      reimbursement_items: [],
      reimbursement_vendor_name: "",
      reimbursement_paid_at: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      reimbursement_notes: ""
    });
    let debounceTimer = null;
    const debounceSearch = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        applyFilters();
      }, 500);
    };
    const applyFilters = () => {
      router.get(route("admin-keuangan.account-payables.index"), searchForm, {
        preserveState: true,
        replace: true
      });
    };
    const formatNumber = (number) => {
      return new Intl.NumberFormat("id-ID").format(number || 0);
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount || 0);
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
        unpaid: "bg-red-100 text-red-800",
        partial: "bg-yellow-100 text-yellow-800",
        paid: "bg-green-100 text-green-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusText = (status) => {
      const texts = {
        unpaid: "Unpaid",
        partial: "Partial",
        paid: "Paid"
      };
      return texts[status] || status;
    };
    const showPayable = (payable) => {
      router.visit(route("admin-keuangan.account-payables.show", payable.id));
    };
    const openPaymentModal = async (payable) => {
      var _a;
      selectedPayable.value = payable;
      paymentForm.amount = "";
      paymentForm.bank_account_id = "";
      paymentForm.payment_method = "";
      paymentForm.notes = "";
      paymentForm.reimbursement_vendor_name = ((_a = payable.vendor) == null ? void 0 : _a.nama_vendor) || payable.vendor_name || "Eshaka Wijaya Logistics";
      paymentForm.reimbursement_paid_at = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      paymentForm.reimbursement_notes = "";
      reimbursementItems.value = [];
      try {
        const response = await fetch(route("admin-keuangan.account-payables.reimbursement-items", payable.id));
        if (response.ok) {
          reimbursementItems.value = await response.json();
          paymentForm.reimbursement_items = reimbursementItems.value.filter((item) => item.status !== "paid").map((item) => item.id);
        }
      } catch (error) {
        console.error("Failed to fetch reimbursement items", error);
      }
      showPaymentModal.value = true;
    };
    const closePaymentModal = () => {
      showPaymentModal.value = false;
      selectedPayable.value = null;
      reimbursementItems.value = [];
    };
    const markPayment = () => {
      processing.value = true;
      router.post(
        route("admin-keuangan.account-payables.mark-as-paid", selectedPayable.value.id),
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
    const visitPage = (url) => {
      router.visit(url, {
        preserveState: true,
        replace: true
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Manajemen Hutang" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Manajemen Hutang</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Kelola hutang dan pembayaran vendor</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CreditCard), { class: "h-6 w-6 text-red-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Outstanding</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_outstanding))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-6 w-6 text-orange-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Overdue</dt><dd class="text-lg font-medium text-orange-600"${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_overdue))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "h-6 w-6 text-yellow-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Jumlah Overdue</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.summary.count_overdue)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Building2), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Unpaid Active</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.summary.count_unpaid)}</dd></dl></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}>Filter Data</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Search</label><input${ssrRenderAttr("value", searchForm.search)} type="text" placeholder="Cari vendor atau service..." class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Status</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "") : ssrLooseEqual(searchForm.status, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="unpaid"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "unpaid") : ssrLooseEqual(searchForm.status, "unpaid")) ? " selected" : ""}${_scopeId}>Unpaid</option><option value="partial"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "partial") : ssrLooseEqual(searchForm.status, "partial")) ? " selected" : ""}${_scopeId}>Partial</option><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "paid") : ssrLooseEqual(searchForm.status, "paid")) ? " selected" : ""}${_scopeId}>Paid</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Vendor</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(searchForm.vendor_id) ? ssrLooseContain(searchForm.vendor_id, "") : ssrLooseEqual(searchForm.vendor_id, "")) ? " selected" : ""}${_scopeId}>Semua Vendor</option><!--[-->`);
            ssrRenderList(__props.vendors, (vendor) => {
              _push2(`<option${ssrRenderAttr("value", vendor.id)}${ssrIncludeBooleanAttr(Array.isArray(searchForm.vendor_id) ? ssrLooseContain(searchForm.vendor_id, vendor.id) : ssrLooseEqual(searchForm.vendor_id, vendor.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendor.nama_vendor)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Dari Tanggal</label><input${ssrRenderAttr("value", searchForm.date_from)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Sampai Tanggal</label><input${ssrRenderAttr("value", searchForm.date_to)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div></div></div></div>`);
            if (__props.vendorSummary && __props.vendorSummary.length > 0) {
              _push2(`<div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}>Ringkasan per Vendor</h3><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Vendor</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Total Amount</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Total Paid</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Total Outstanding</th><th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Jumlah Invoice</th><th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Overdue</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(__props.vendorSummary, (vendor) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(vendor.vendor_name)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(vendor.total_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600"${_scopeId}> Rp ${ssrInterpolate(formatNumber(vendor.total_paid))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><span class="${ssrRenderClass(vendor.total_outstanding > 0 ? "text-red-600" : "text-green-600")}"${_scopeId}> Rp ${ssrInterpolate(formatNumber(vendor.total_outstanding))}</span></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900"${_scopeId}>${ssrInterpolate(vendor.count_invoices)}</td><td class="px-6 py-4 whitespace-nowrap text-center text-sm"${_scopeId}>`);
                if (vendor.count_overdue > 0) {
                  _push2(`<span class="text-red-600 font-medium"${_scopeId}>${ssrInterpolate(vendor.count_overdue)}</span>`);
                } else {
                  _push2(`<span class="text-gray-400"${_scopeId}>0</span>`);
                }
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div><div class="bg-white rounded-lg shadow-sm overflow-hidden"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Vendor </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Service </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Invoice/SO </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Amount </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Paid </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Outstanding </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(__props.payables.data, (payable) => {
                var _a;
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_a = payable.vendor) == null ? void 0 : _a.nama_vendor) || payable.vendor_name)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(payable.vendor_invoice_date ? formatDate(payable.vendor_invoice_date) : "-")}</div></td><td class="px-6 py-4"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(payable.service_description)}</div>`);
                if (payable.service_remarks) {
                  _push2(`<div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(payable.service_remarks.substring(0, 50))}${ssrInterpolate(payable.service_remarks.length > 50 ? "..." : "")}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-900"${_scopeId}>`);
                if (payable.vendor_invoice_number) {
                  _push2(`<div${_scopeId}> Invoice: ${ssrInterpolate(payable.vendor_invoice_number)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (payable.sales_order) {
                  _push2(`<div${_scopeId}> SO: ${ssrInterpolate(payable.sales_order.order_number)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(payable.amount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(payable.paid_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(payable.outstanding_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-center"${_scopeId}><span class="${ssrRenderClass([getStatusClass(payable.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(payable.status))} `);
                if (payable.days_overdue > 0) {
                  _push2(`<span class="ml-1"${_scopeId}> (${ssrInterpolate(payable.days_overdue)} hari) </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium"${_scopeId}><div class="flex items-center justify-center space-x-2"${_scopeId}><button class="text-blue-600 hover:text-blue-900" title="Lihat Detail"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg></button>`);
                if (payable.status !== "paid") {
                  _push2(`<button class="text-green-600 hover:text-green-900" title="Mark Payment"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"${_scopeId}></path></svg></button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div><div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="text-sm text-gray-700"${_scopeId}> Showing ${ssrInterpolate(__props.payables.from || 0)} to ${ssrInterpolate(__props.payables.to || 0)} of ${ssrInterpolate(__props.payables.total || 0)} results </div><div class="flex space-x-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.payables.links, (link) => {
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
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_sfc_main$1, {
              visible: showPaymentModal.value,
              processing: processing.value,
              form: paymentForm,
              "bank-accounts": props.bankAccounts,
              "reimbursement-items": reimbursementItems.value,
              "max-amount": selectedPayable.value ? Number(selectedPayable.value.outstanding_amount || 0) : 0,
              title: "Mark Payment",
              "submit-label": "Mark Payment",
              onClose: closePaymentModal,
              onSubmit: markPayment
            }, {
              summary: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                if (_push3) {
                  _push3(`<div class="mb-4 bg-gray-50 p-3 rounded-md"${_scopeId2}><p class="text-sm text-gray-600"${_scopeId2}>Vendor: ${ssrInterpolate(((_b = (_a = selectedPayable.value) == null ? void 0 : _a.vendor) == null ? void 0 : _b.nama_vendor) || ((_c = selectedPayable.value) == null ? void 0 : _c.vendor_name))}</p><p class="text-sm text-gray-600"${_scopeId2}>Outstanding: Rp ${ssrInterpolate(formatNumber((_d = selectedPayable.value) == null ? void 0 : _d.outstanding_amount))}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "mb-4 bg-gray-50 p-3 rounded-md" }, [
                      createVNode("p", { class: "text-sm text-gray-600" }, "Vendor: " + toDisplayString(((_f = (_e = selectedPayable.value) == null ? void 0 : _e.vendor) == null ? void 0 : _f.nama_vendor) || ((_g = selectedPayable.value) == null ? void 0 : _g.vendor_name)), 1),
                      createVNode("p", { class: "text-sm text-gray-600" }, "Outstanding: Rp " + toDisplayString(formatNumber((_h = selectedPayable.value) == null ? void 0 : _h.outstanding_amount)), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Manajemen Hutang" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Manajemen Hutang"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Kelola hutang dan pembayaran vendor")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(CreditCard), { class: "h-6 w-6 text-red-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Outstanding"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.summary.total_outstanding)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(AlertTriangle), { class: "h-6 w-6 text-orange-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Overdue"),
                              createVNode("dd", { class: "text-lg font-medium text-orange-600" }, toDisplayString(formatCurrency(__props.summary.total_overdue)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Users), { class: "h-6 w-6 text-yellow-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Jumlah Overdue"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.summary.count_overdue), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Building2), { class: "h-6 w-6 text-blue-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Unpaid Active"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.summary.count_unpaid), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Filter Data"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Search"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => searchForm.search = $event,
                            type: "text",
                            placeholder: "Cari vendor atau service...",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                            onInput: debounceSearch
                          }, null, 40, ["onUpdate:modelValue"]), [
                            [vModelText, searchForm.search]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Status"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => searchForm.status = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                            onChange: applyFilters
                          }, [
                            createVNode("option", { value: "" }, "Semua Status"),
                            createVNode("option", { value: "unpaid" }, "Unpaid"),
                            createVNode("option", { value: "partial" }, "Partial"),
                            createVNode("option", { value: "paid" }, "Paid")
                          ], 40, ["onUpdate:modelValue"]), [
                            [vModelSelect, searchForm.status]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Vendor"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => searchForm.vendor_id = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                            onChange: applyFilters
                          }, [
                            createVNode("option", { value: "" }, "Semua Vendor"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors, (vendor) => {
                              return openBlock(), createBlock("option", {
                                key: vendor.id,
                                value: vendor.id
                              }, toDisplayString(vendor.nama_vendor), 9, ["value"]);
                            }), 128))
                          ], 40, ["onUpdate:modelValue"]), [
                            [vModelSelect, searchForm.vendor_id]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Dari Tanggal"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => searchForm.date_from = $event,
                            type: "date",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
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
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
                            onChange: applyFilters
                          }, null, 40, ["onUpdate:modelValue"]), [
                            [vModelText, searchForm.date_to]
                          ])
                        ])
                      ])
                    ])
                  ]),
                  __props.vendorSummary && __props.vendorSummary.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-white shadow overflow-hidden sm:rounded-md mb-6"
                  }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Ringkasan per Vendor"),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Vendor"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Total Amount"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Total Paid"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Total Outstanding"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Jumlah Invoice"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Overdue")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.vendorSummary, (vendor) => {
                              return openBlock(), createBlock("tr", {
                                key: vendor.vendor_id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(vendor.vendor_name), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(vendor.total_amount)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-green-600" }, " Rp " + toDisplayString(formatNumber(vendor.total_paid)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                  createVNode("span", {
                                    class: vendor.total_outstanding > 0 ? "text-red-600" : "text-green-600"
                                  }, " Rp " + toDisplayString(formatNumber(vendor.total_outstanding)), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900" }, toDisplayString(vendor.count_invoices), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm" }, [
                                  vendor.count_overdue > 0 ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "text-red-600 font-medium"
                                  }, toDisplayString(vendor.count_overdue), 1)) : (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "text-gray-400"
                                  }, "0"))
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm overflow-hidden" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Vendor "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Service "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Invoice/SO "),
                              createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Amount "),
                              createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Paid "),
                              createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Outstanding "),
                              createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                              createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.payables.data, (payable) => {
                              var _a;
                              return openBlock(), createBlock("tr", {
                                key: payable.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_a = payable.vendor) == null ? void 0 : _a.nama_vendor) || payable.vendor_name), 1),
                                  createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(payable.vendor_invoice_date ? formatDate(payable.vendor_invoice_date) : "-"), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(payable.service_description), 1),
                                  payable.service_remarks ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-sm text-gray-500"
                                  }, toDisplayString(payable.service_remarks.substring(0, 50)) + toDisplayString(payable.service_remarks.length > 50 ? "..." : ""), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, [
                                    payable.vendor_invoice_number ? (openBlock(), createBlock("div", { key: 0 }, " Invoice: " + toDisplayString(payable.vendor_invoice_number), 1)) : createCommentVNode("", true),
                                    payable.sales_order ? (openBlock(), createBlock("div", { key: 1 }, " SO: " + toDisplayString(payable.sales_order.order_number), 1)) : createCommentVNode("", true)
                                  ])
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(payable.amount)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(payable.paid_amount)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(payable.outstanding_amount)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center" }, [
                                  createVNode("span", {
                                    class: [getStatusClass(payable.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                  }, [
                                    createTextVNode(toDisplayString(getStatusText(payable.status)) + " ", 1),
                                    payable.days_overdue > 0 ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "ml-1"
                                    }, " (" + toDisplayString(payable.days_overdue) + " hari) ", 1)) : createCommentVNode("", true)
                                  ], 2)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm font-medium" }, [
                                  createVNode("div", { class: "flex items-center justify-center space-x-2" }, [
                                    createVNode("button", {
                                      onClick: ($event) => showPayable(payable),
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
                                    payable.status !== "paid" ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      onClick: ($event) => openPaymentModal(payable),
                                      class: "text-green-600 hover:text-green-900",
                                      title: "Mark Payment"
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
                                    ], 8, ["onClick"])) : createCommentVNode("", true)
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "bg-white px-4 py-3 border-t border-gray-200 sm:px-6" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.payables.from || 0) + " to " + toDisplayString(__props.payables.to || 0) + " of " + toDisplayString(__props.payables.total || 0) + " results ", 1),
                          createVNode("div", { class: "flex space-x-1" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.payables.links, (link) => {
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
                  ])) : createCommentVNode("", true),
                  createVNode(_sfc_main$1, {
                    visible: showPaymentModal.value,
                    processing: processing.value,
                    form: paymentForm,
                    "bank-accounts": props.bankAccounts,
                    "reimbursement-items": reimbursementItems.value,
                    "max-amount": selectedPayable.value ? Number(selectedPayable.value.outstanding_amount || 0) : 0,
                    title: "Mark Payment",
                    "submit-label": "Mark Payment",
                    onClose: closePaymentModal,
                    onSubmit: markPayment
                  }, {
                    summary: withCtx(() => {
                      var _a, _b, _c, _d;
                      return [
                        createVNode("div", { class: "mb-4 bg-gray-50 p-3 rounded-md" }, [
                          createVNode("p", { class: "text-sm text-gray-600" }, "Vendor: " + toDisplayString(((_b = (_a = selectedPayable.value) == null ? void 0 : _a.vendor) == null ? void 0 : _b.nama_vendor) || ((_c = selectedPayable.value) == null ? void 0 : _c.vendor_name)), 1),
                          createVNode("p", { class: "text-sm text-gray-600" }, "Outstanding: Rp " + toDisplayString(formatNumber((_d = selectedPayable.value) == null ? void 0 : _d.outstanding_amount)), 1)
                        ])
                      ];
                    }),
                    _: 1
                  }, 8, ["visible", "processing", "form", "bank-accounts", "reimbursement-items", "max-amount"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/AccountPayables/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
