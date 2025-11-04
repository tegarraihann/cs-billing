import { reactive, ref, computed, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, withDirectives, vModelText, vModelSelect, openBlock, Fragment, renderList, createTextVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-qa9VKRBZ.js";
import { DollarSign, AlertTriangle, FileText, CheckCircle } from "lucide-vue-next";
import axios from "axios";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DZF7sKpL.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
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
      component_id: "",
      amount: "",
      payment_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      bank_account_id: "",
      notes: ""
    });
    const paymentComponents = ref([]);
    const bankAccounts = ref([]);
    const paymentContext = reactive({
      outstanding_amount: 0,
      requires_component: false
    });
    const paymentDataLoading = ref(false);
    const paymentDataError = ref("");
    const amountError = ref("");
    const formErrors = ref({});
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
    const getComponentLabel = (type) => {
      switch (type) {
        case "invoice_main":
          return "Invoice Main";
        case "debit_note":
          return "Debit Note";
        case "reimbursement":
          return "Reimbursement";
        default:
          return type ? type.replace(/_/g, " ").toUpperCase() : "Komponen";
      }
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
      showPaymentModal.value = true;
      paymentDataLoading.value = true;
      paymentDataError.value = "";
      paymentComponents.value = [];
      bankAccounts.value = [];
      paymentForm.component_id = "";
      paymentForm.amount = "";
      paymentForm.payment_date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      paymentForm.bank_account_id = "";
      paymentForm.notes = "";
      amountError.value = "";
      formErrors.value = {};
      axios.get(route("admin-keuangan.account-receivables.payment-data", receivable.id)).then(({ data }) => {
        var _a;
        paymentComponents.value = (data.components || []).map((component) => ({
          ...component,
          id: component.id.toString()
        }));
        bankAccounts.value = (data.bank_accounts || []).map((bank) => ({
          ...bank,
          id: bank.id.toString()
        }));
        paymentContext.outstanding_amount = ((_a = data.receivable) == null ? void 0 : _a.outstanding_amount) || 0;
        paymentContext.requires_component = !!data.requires_component;
        paymentForm.payment_date = data.default_payment_date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        paymentForm.bank_account_id = bankAccounts.value.length > 0 ? bankAccounts.value[0].id : "";
        if (paymentComponents.value.length === 1) {
          paymentForm.component_id = paymentComponents.value[0].id;
        }
        amountError.value = "";
        formErrors.value = {};
      }).catch(() => {
        paymentDataError.value = "Gagal memuat data pembayaran. Silakan coba lagi.";
      }).finally(() => {
        paymentDataLoading.value = false;
      });
    };
    const closePaymentModal = () => {
      showPaymentModal.value = false;
      selectedReceivable.value = null;
      paymentComponents.value = [];
      bankAccounts.value = [];
      paymentContext.outstanding_amount = 0;
      paymentContext.requires_component = false;
      paymentForm.component_id = "";
      paymentForm.amount = "";
      paymentForm.bank_account_id = "";
      paymentForm.notes = "";
      amountError.value = "";
      paymentDataError.value = "";
      formErrors.value = {};
    };
    const recordPayment = () => {
      amountError.value = "";
      if (formErrors.value.amount) {
        const { amount, ...rest } = formErrors.value;
        formErrors.value = rest;
      }
      validateAmount();
      if (amountError.value) {
        return;
      }
      processing.value = true;
      router.post(
        route("admin-keuangan.account-receivables.record-payment", selectedReceivable.value.id),
        {
          component_id: paymentForm.component_id || null,
          amount: paymentForm.amount,
          payment_date: paymentForm.payment_date,
          bank_account_id: paymentForm.bank_account_id,
          notes: paymentForm.notes
        },
        {
          preserveScroll: true,
          onSuccess: () => {
            formErrors.value = {};
            closePaymentModal();
          },
          onError: (errors) => {
            formErrors.value = { ...errors };
            if (errors == null ? void 0 : errors.amount) {
              amountError.value = "";
            }
          },
          onFinish: () => {
            processing.value = false;
          }
        }
      );
    };
    const selectedComponent = computed(() => {
      if (!paymentForm.component_id) {
        return null;
      }
      return paymentComponents.value.find((component) => component.id === paymentForm.component_id) || null;
    });
    const requiresComponent = computed(() => paymentContext.requires_component);
    const currentOutstandingLimit = computed(() => {
      if (selectedComponent.value) {
        return selectedComponent.value.outstanding_amount || 0;
      }
      return paymentContext.outstanding_amount || 0;
    });
    const clearFormError = (field) => {
      if (formErrors.value[field]) {
        const newErrors = { ...formErrors.value };
        delete newErrors[field];
        formErrors.value = newErrors;
      }
    };
    const formatAmountInput = (event) => {
      clearFormError("amount");
      amountError.value = "";
      if (requiresComponent.value && !paymentForm.component_id) {
        amountError.value = "Pilih komponen terlebih dahulu";
        paymentForm.amount = "";
        return;
      }
      let value = event.target.value || "";
      value = value.replace(/[^\d.,]/g, "");
      paymentForm.amount = value;
    };
    const validateAmount = () => {
      clearFormError("amount");
      amountError.value = "";
      if (requiresComponent.value && !paymentForm.component_id) {
        amountError.value = "Pilih komponen terlebih dahulu";
        return;
      }
      const rawValue = (paymentForm.amount || "").toString().trim();
      if (!rawValue) {
        amountError.value = "Amount is required";
        return;
      }
      let normalizedValue = rawValue;
      if (rawValue.includes(".") && rawValue.includes(",")) {
        normalizedValue = rawValue.replace(/\./g, "").replace(",", ".");
      } else if (rawValue.includes(".") && !rawValue.includes(",")) {
        const parts = rawValue.split(".");
        if (parts.length === 2) {
          const decimalPart = parts[1];
          if (decimalPart.length <= 2 && parseInt(decimalPart) < 100 && parts[0].length <= 4) {
            normalizedValue = rawValue;
          } else {
            normalizedValue = rawValue.replace(/\./g, "");
          }
        } else {
          normalizedValue = rawValue.replace(/\./g, "");
        }
      } else if (rawValue.includes(",")) {
        normalizedValue = rawValue.replace(",", ".");
      }
      const numericValue = parseFloat(normalizedValue);
      if (isNaN(numericValue) || numericValue <= 0) {
        amountError.value = "Please enter a valid amount";
        return;
      }
      const limit = currentOutstandingLimit.value;
      if (numericValue > limit) {
        const label = selectedComponent.value ? getComponentLabel(selectedComponent.value.component_type) : "invoice";
        amountError.value = `Amount cannot exceed outstanding balance for ${label} (Rp ${formatNumber(limit)})`;
        return;
      }
      paymentForm.amount = normalizedValue;
    };
    watch(
      () => paymentForm.component_id,
      (newValue, oldValue) => {
        if (newValue !== oldValue) {
          clearFormError("component_id");
          amountError.value = "";
          if (!newValue && requiresComponent.value) {
            paymentForm.amount = "";
            return;
          }
          if (selectedComponent.value) {
            paymentForm.amount = selectedComponent.value.outstanding_amount;
          }
        }
      }
    );
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
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Manajemen Piutang" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Manajemen Piutang</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Kelola piutang dan pembayaran customer</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Outstanding</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_outstanding))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-6 w-6 text-red-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Overdue</dt><dd class="text-lg font-medium text-red-600"${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_overdue))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "h-6 w-6 text-yellow-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Jumlah Overdue</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.summary.count_overdue)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Outstanding Active</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.summary.count_outstanding)}</dd></dl></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}>Filter Data</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Search</label><input${ssrRenderAttr("value", searchForm.search)} type="text" placeholder="Cari invoice atau customer..." class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Status</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "") : ssrLooseEqual(searchForm.status, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="outstanding"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "outstanding") : ssrLooseEqual(searchForm.status, "outstanding")) ? " selected" : ""}${_scopeId}>Outstanding</option><option value="partial"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "partial") : ssrLooseEqual(searchForm.status, "partial")) ? " selected" : ""}${_scopeId}>Partial</option><option value="overdue"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "overdue") : ssrLooseEqual(searchForm.status, "overdue")) ? " selected" : ""}${_scopeId}>Overdue</option><option value="paid"${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "paid") : ssrLooseEqual(searchForm.status, "paid")) ? " selected" : ""}${_scopeId}>Paid</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Customer</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(searchForm.customer_id) ? ssrLooseContain(searchForm.customer_id, "") : ssrLooseEqual(searchForm.customer_id, "")) ? " selected" : ""}${_scopeId}>Semua Customer</option><!--[-->`);
            ssrRenderList(__props.customers, (customer) => {
              _push2(`<option${ssrRenderAttr("value", customer.id)}${ssrIncludeBooleanAttr(Array.isArray(searchForm.customer_id) ? ssrLooseContain(searchForm.customer_id, customer.id) : ssrLooseEqual(searchForm.customer_id, customer.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(customer.company_name)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Dari Tanggal</label><input${ssrRenderAttr("value", searchForm.date_from)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Sampai Tanggal</label><input${ssrRenderAttr("value", searchForm.date_to)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div></div></div></div>`);
            if (__props.customerSummary && __props.customerSummary.length > 0) {
              _push2(`<div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}>Ringkasan Per Customer</h3><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Customer</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Total Invoice</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Total Paid</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Outstanding</th><th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Jumlah Invoice</th><th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Overdue</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(__props.customerSummary, (customer) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(customer.customer_name)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(customer.total_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(customer.total_paid))}</td><td class="${ssrRenderClass([customer.total_outstanding > 0 ? "text-red-600" : "text-green-600", "px-6 py-4 whitespace-nowrap text-sm text-right font-semibold"])}"${_scopeId}>${ssrInterpolate(formatCurrency(customer.total_outstanding))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900"${_scopeId}>${ssrInterpolate(customer.count_invoices)}</td><td class="${ssrRenderClass([customer.count_overdue > 0 ? "text-red-600 font-semibold" : "text-gray-900", "px-6 py-4 whitespace-nowrap text-sm text-center"])}"${_scopeId}>${ssrInterpolate(customer.count_overdue)}</td></tr>`);
              });
              _push2(`<!--]--></tbody><tfoot class="bg-gray-50 font-semibold"${_scopeId}><tr${_scopeId}><td class="py-2 text-sm text-gray-900"${_scopeId}>Total</td><td class="py-2 text-sm text-right text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(customerSummaryTotals.value.totalAmount))}</td><td class="py-2 text-sm text-right text-gray-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(customerSummaryTotals.value.totalPaid))}</td><td class="py-2 text-sm text-right text-red-600"${_scopeId}> Rp ${ssrInterpolate(formatNumber(customerSummaryTotals.value.totalOutstanding))}</td><td class="py-2 text-sm text-center text-gray-900"${_scopeId}>${ssrInterpolate(customerSummaryTotals.value.totalInvoices)}</td><td class="py-2 text-sm text-center text-red-600"${_scopeId}>${ssrInterpolate(customerSummaryTotals.value.totalOverdue)}</td></tr></tfoot></table></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white shadow overflow-hidden sm:rounded-md"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Invoice </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Customer </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> SO Number </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Amount </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Paid </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Outstanding </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
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
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"${_scopeId}><div class="relative top-12 mx-auto w-full max-w-lg px-4"${_scopeId}><div class="bg-white rounded-lg shadow-lg border"${_scopeId}><div class="flex items-center justify-between px-6 py-4 border-b"${_scopeId}><div${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}>Record Payment</h3><p class="text-sm text-gray-600 mt-1"${_scopeId}> Invoice ${ssrInterpolate((_a = selectedReceivable.value) == null ? void 0 : _a.invoice_number)} `);
              if (paymentContext.outstanding_amount) {
                _push2(`<span${_scopeId}> · Outstanding: Rp ${ssrInterpolate(formatNumber(paymentContext.outstanding_amount))}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</p></div><button class="text-gray-400 hover:text-gray-600"${_scopeId}><span class="sr-only"${_scopeId}>Close</span> ✕ </button></div><div class="px-6 py-5"${_scopeId}>`);
              if (paymentDataLoading.value) {
                _push2(`<div class="py-6 text-center text-sm text-gray-600"${_scopeId}> Memuat data pembayaran... </div>`);
              } else {
                _push2(`<div${_scopeId}>`);
                if (paymentDataError.value) {
                  _push2(`<div class="mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700"${_scopeId}>${ssrInterpolate(paymentDataError.value)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<form${_scopeId}>`);
                if (paymentComponents.value.length > 0) {
                  _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}> Komponen Pembayaran `);
                  if (requiresComponent.value) {
                    _push2(`<span${_scopeId}>*</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</label><select${ssrIncludeBooleanAttr(paymentComponents.value.length === 1) ? " disabled" : ""} class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(paymentForm.component_id) ? ssrLooseContain(paymentForm.component_id, "") : ssrLooseEqual(paymentForm.component_id, "")) ? " selected" : ""}${_scopeId}>Pilih Komponen</option><!--[-->`);
                  ssrRenderList(paymentComponents.value, (component) => {
                    _push2(`<option${ssrRenderAttr("value", component.id.toString())}${ssrIncludeBooleanAttr(Array.isArray(paymentForm.component_id) ? ssrLooseContain(paymentForm.component_id, component.id.toString()) : ssrLooseEqual(paymentForm.component_id, component.id.toString())) ? " selected" : ""}${_scopeId}>${ssrInterpolate(getComponentLabel(component.component_type))} - Outstanding Rp ${ssrInterpolate(formatNumber(component.outstanding_amount))}</option>`);
                  });
                  _push2(`<!--]--></select>`);
                  if (formErrors.value.component_id) {
                    _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(formErrors.value.component_id)}</p>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Amount *</label><input${ssrRenderAttr("value", paymentForm.amount)} type="text"${ssrIncludeBooleanAttr(requiresComponent.value && !paymentForm.component_id) ? " disabled" : ""} class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Masukkan nominal (contoh: 2500 atau 2.500)"${_scopeId}>`);
                if (amountError.value) {
                  _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(amountError.value)}</p>`);
                } else if (formErrors.value.amount) {
                  _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(formErrors.value.amount)}</p>`);
                } else {
                  _push2(`<p class="mt-1 text-xs text-gray-500"${_scopeId}> Maksimal: Rp ${ssrInterpolate(formatNumber(currentOutstandingLimit.value))}</p>`);
                }
                _push2(`</div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Payment Date *</label><input${ssrRenderAttr("value", paymentForm.payment_date)} type="date" required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}>`);
                if (formErrors.value.payment_date) {
                  _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(formErrors.value.payment_date)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Bank Account *</label><select required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(paymentForm.bank_account_id) ? ssrLooseContain(paymentForm.bank_account_id, "") : ssrLooseEqual(paymentForm.bank_account_id, "")) ? " selected" : ""}${_scopeId}>Pilih Rekening</option><!--[-->`);
                ssrRenderList(bankAccounts.value, (bank) => {
                  _push2(`<option${ssrRenderAttr("value", bank.id.toString())}${ssrIncludeBooleanAttr(Array.isArray(paymentForm.bank_account_id) ? ssrLooseContain(paymentForm.bank_account_id, bank.id.toString()) : ssrLooseEqual(paymentForm.bank_account_id, bank.id.toString())) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} · ${ssrInterpolate(bank.account_name)} (${ssrInterpolate(bank.account_number)}) </option>`);
                });
                _push2(`<!--]--></select>`);
                if (bankAccounts.value.length === 0) {
                  _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}> Tidak ada rekening bank aktif. Tambahkan rekening terlebih dahulu. </p>`);
                } else {
                  _push2(`<!---->`);
                }
                if (formErrors.value.bank_account_id) {
                  _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(formErrors.value.bank_account_id)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="mb-6"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Notes</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Catatan pembayaran (opsional)"${_scopeId}>${ssrInterpolate(paymentForm.notes)}</textarea>`);
                if (formErrors.value.notes) {
                  _push2(`<p class="mt-1 text-xs text-red-600"${_scopeId}>${ssrInterpolate(formErrors.value.notes)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex justify-end space-x-3"${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"${_scopeId}> Batal </button><button type="submit"${ssrIncludeBooleanAttr(processing.value || bankAccounts.value.length === 0) ? " disabled" : ""} class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"${_scopeId}>${ssrInterpolate(processing.value ? "Menyimpan..." : "Record Payment")}</button></div></form></div>`);
              }
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Manajemen Piutang" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Manajemen Piutang"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Kelola piutang dan pembayaran customer")
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(DollarSign), { class: "h-6 w-6 text-blue-400" })
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
                            createVNode(unref(AlertTriangle), { class: "h-6 w-6 text-red-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Overdue"),
                              createVNode("dd", { class: "text-lg font-medium text-red-600" }, toDisplayString(formatCurrency(__props.summary.total_overdue)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(FileText), { class: "h-6 w-6 text-yellow-400" })
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
                            createVNode(unref(CheckCircle), { class: "h-6 w-6 text-green-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Outstanding Active"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.summary.count_outstanding), 1)
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
                            placeholder: "Cari invoice atau customer...",
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
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500",
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
                  __props.customerSummary && __props.customerSummary.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-white shadow overflow-hidden sm:rounded-md mb-6"
                  }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Ringkasan Per Customer"),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Customer"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Total Invoice"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Total Paid"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Outstanding"),
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
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.customerSummary, (customer) => {
                              return openBlock(), createBlock("tr", {
                                key: customer.customer_id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, toDisplayString(customer.customer_name), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900" }, toDisplayString(formatCurrency(customer.total_amount)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900" }, toDisplayString(formatCurrency(customer.total_paid)), 1),
                                createVNode("td", {
                                  class: ["px-6 py-4 whitespace-nowrap text-sm text-right font-semibold", customer.total_outstanding > 0 ? "text-red-600" : "text-green-600"]
                                }, toDisplayString(formatCurrency(customer.total_outstanding)), 3),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-center text-gray-900" }, toDisplayString(customer.count_invoices), 1),
                                createVNode("td", {
                                  class: ["px-6 py-4 whitespace-nowrap text-sm text-center", customer.count_overdue > 0 ? "text-red-600 font-semibold" : "text-gray-900"]
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
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
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
                    key: 1,
                    class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
                  }, [
                    createVNode("div", { class: "relative top-12 mx-auto w-full max-w-lg px-4" }, [
                      createVNode("div", { class: "bg-white rounded-lg shadow-lg border" }, [
                        createVNode("div", { class: "flex items-center justify-between px-6 py-4 border-b" }, [
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Record Payment"),
                            createVNode("p", { class: "text-sm text-gray-600 mt-1" }, [
                              createTextVNode(" Invoice " + toDisplayString((_b = selectedReceivable.value) == null ? void 0 : _b.invoice_number) + " ", 1),
                              paymentContext.outstanding_amount ? (openBlock(), createBlock("span", { key: 0 }, " · Outstanding: Rp " + toDisplayString(formatNumber(paymentContext.outstanding_amount)), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("button", {
                            onClick: closePaymentModal,
                            class: "text-gray-400 hover:text-gray-600"
                          }, [
                            createVNode("span", { class: "sr-only" }, "Close"),
                            createTextVNode(" ✕ ")
                          ])
                        ]),
                        createVNode("div", { class: "px-6 py-5" }, [
                          paymentDataLoading.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "py-6 text-center text-sm text-gray-600"
                          }, " Memuat data pembayaran... ")) : (openBlock(), createBlock("div", { key: 1 }, [
                            paymentDataError.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mb-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700"
                            }, toDisplayString(paymentDataError.value), 1)) : createCommentVNode("", true),
                            createVNode("form", {
                              onSubmit: withModifiers(recordPayment, ["prevent"])
                            }, [
                              paymentComponents.value.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mb-4"
                              }, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, [
                                  createTextVNode(" Komponen Pembayaran "),
                                  requiresComponent.value ? (openBlock(), createBlock("span", { key: 0 }, "*")) : createCommentVNode("", true)
                                ]),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => paymentForm.component_id = $event,
                                  disabled: paymentComponents.value.length === 1,
                                  class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                }, [
                                  createVNode("option", { value: "" }, "Pilih Komponen"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(paymentComponents.value, (component) => {
                                    return openBlock(), createBlock("option", {
                                      key: component.id,
                                      value: component.id.toString()
                                    }, toDisplayString(getComponentLabel(component.component_type)) + " - Outstanding Rp " + toDisplayString(formatNumber(component.outstanding_amount)), 9, ["value"]);
                                  }), 128))
                                ], 8, ["onUpdate:modelValue", "disabled"]), [
                                  [vModelSelect, paymentForm.component_id]
                                ]),
                                formErrors.value.component_id ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "mt-1 text-xs text-red-600"
                                }, toDisplayString(formErrors.value.component_id), 1)) : createCommentVNode("", true)
                              ])) : createCommentVNode("", true),
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount *"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => paymentForm.amount = $event,
                                  type: "text",
                                  onInput: formatAmountInput,
                                  onBlur: validateAmount,
                                  disabled: requiresComponent.value && !paymentForm.component_id,
                                  class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                                  placeholder: "Masukkan nominal (contoh: 2500 atau 2.500)"
                                }, null, 40, ["onUpdate:modelValue", "disabled"]), [
                                  [vModelText, paymentForm.amount]
                                ]),
                                amountError.value ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "mt-1 text-xs text-red-600"
                                }, toDisplayString(amountError.value), 1)) : formErrors.value.amount ? (openBlock(), createBlock("p", {
                                  key: 1,
                                  class: "mt-1 text-xs text-red-600"
                                }, toDisplayString(formErrors.value.amount), 1)) : (openBlock(), createBlock("p", {
                                  key: 2,
                                  class: "mt-1 text-xs text-gray-500"
                                }, " Maksimal: Rp " + toDisplayString(formatNumber(currentOutstandingLimit.value)), 1))
                              ]),
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Payment Date *"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => paymentForm.payment_date = $event,
                                  type: "date",
                                  required: "",
                                  class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, paymentForm.payment_date]
                                ]),
                                formErrors.value.payment_date ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "mt-1 text-xs text-red-600"
                                }, toDisplayString(formErrors.value.payment_date), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "mb-4" }, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bank Account *"),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => paymentForm.bank_account_id = $event,
                                  required: "",
                                  class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                }, [
                                  createVNode("option", { value: "" }, "Pilih Rekening"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(bankAccounts.value, (bank) => {
                                    return openBlock(), createBlock("option", {
                                      key: bank.id,
                                      value: bank.id.toString()
                                    }, toDisplayString(bank.bank_name) + " · " + toDisplayString(bank.account_name) + " (" + toDisplayString(bank.account_number) + ") ", 9, ["value"]);
                                  }), 128))
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, paymentForm.bank_account_id]
                                ]),
                                bankAccounts.value.length === 0 ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "mt-1 text-xs text-red-600"
                                }, " Tidak ada rekening bank aktif. Tambahkan rekening terlebih dahulu. ")) : createCommentVNode("", true),
                                formErrors.value.bank_account_id ? (openBlock(), createBlock("p", {
                                  key: 1,
                                  class: "mt-1 text-xs text-red-600"
                                }, toDisplayString(formErrors.value.bank_account_id), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "mb-6" }, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Notes"),
                                withDirectives(createVNode("textarea", {
                                  "onUpdate:modelValue": ($event) => paymentForm.notes = $event,
                                  rows: "3",
                                  class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                                  placeholder: "Catatan pembayaran (opsional)"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, paymentForm.notes]
                                ]),
                                formErrors.value.notes ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "mt-1 text-xs text-red-600"
                                }, toDisplayString(formErrors.value.notes), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("div", { class: "flex justify-end space-x-3" }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: closePaymentModal,
                                  class: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                }, " Batal "),
                                createVNode("button", {
                                  type: "submit",
                                  disabled: processing.value || bankAccounts.value.length === 0,
                                  class: "px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                                }, toDisplayString(processing.value ? "Menyimpan..." : "Record Payment"), 9, ["disabled"])
                              ])
                            ], 32)
                          ]))
                        ])
                      ])
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/AccountReceivables/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
