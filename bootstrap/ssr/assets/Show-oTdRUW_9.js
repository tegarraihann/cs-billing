import { ref, reactive, computed, watch, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, Fragment, renderList, withModifiers, withDirectives, vModelText, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { usePage, useForm, Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    invoice: Object,
    mainInvoice: Object,
    reimbursementInvoice: Object,
    relatedInvoices: Array,
    reimbursementEntries: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const showPaymentModal = ref(false);
    const showMarkSentModal = ref(false);
    const showProfitLossModal = ref(false);
    const showReimbursementPaymentModal = ref(false);
    const processing = ref(false);
    const paymentForm = reactive({
      paid_amount: props.invoice.total,
      paid_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      payment_method: "",
      payment_notes: ""
    });
    const profitLossForm = reactive({
      period_id: "",
      notes: ""
    });
    const profitLossPeriods = ref([]);
    const profitLossAccounts = ref([]);
    const selectedReimbursementEntry = ref(null);
    const page = usePage();
    const reimbursementPaymentForm = useForm({
      status: "paid",
      vendor_name: "",
      paid_at: "",
      notes: ""
    });
    const appendQuery = (path, query = {}) => {
      const params = new URLSearchParams();
      Object.entries(query || {}).forEach(([key, value]) => {
        if (value !== null && value !== void 0 && value !== "") {
          params.append(key, value);
        }
      });
      const queryString = params.toString();
      return queryString ? `${path}?${queryString}` : path;
    };
    const route = function(name, params = {}) {
      if (window.route) {
        return window.route(name, params);
      }
      const routes = {
        "admin-keuangan.invoices.index": "/admin-keuangan/invoices",
        "admin-keuangan.invoices.pdf": (id) => `/admin-keuangan/invoices/${id}/pdf`,
        "admin-keuangan.invoices.confirm-payment": (id) => `/admin-keuangan/invoices/${id}/confirm-payment`,
        "admin-keuangan.invoices.mark-sent": (id) => `/admin-keuangan/invoices/${id}/mark-sent`,
        "admin-keuangan.invoices.post-to-profit-loss": (id) => `/admin-keuangan/invoices/${id}/post-to-profit-loss`,
        "admin-keuangan.invoices.unpost-from-profit-loss": (id) => `/admin-keuangan/invoices/${id}/unpost-from-profit-loss`,
        "admin-keuangan.invoices.profit-loss-periods": "/admin-keuangan/invoices/profit-loss-periods",
        "admin-keuangan.invoices.reimbursement-itemss.update-payment": (value) => {
          if (Array.isArray(value)) {
            const [invoiceId, itemsId] = value;
            return `/admin-keuangan/invoices/${invoiceId}/reimbursement-itemss/${itemsId}/update-payment`;
          }
          if (typeof value === "object" && value !== null) {
            const invoiceId = value.invoice || value.id;
            const itemsId = value.reimbursementItem || value.items;
            return `/admin-keuangan/invoices/${invoiceId}/reimbursement-itemss/${itemsId}/update-payment`;
          }
          return "#";
        }
      };
      const resolver = routes[name];
      if (!resolver) {
        return "#";
      }
      if (typeof resolver === "function") {
        return resolver(params);
      }
      return appendQuery(resolver, params);
    };
    const backQuery = computed(() => {
      const queryString = page.url.includes("?") ? page.url.split("?")[1] : "";
      const params = new URLSearchParams(queryString);
      const query = {};
      ["search", "status", "invoice_type", "date_from", "date_to", "page"].forEach((key) => {
        const value = params.get(key);
        if (value) {
          query[key] = value;
        }
      });
      return query;
    });
    const backToIndexUrl = computed(() => route("admin-keuangan.invoices.index", backQuery.value));
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID");
    };
    const formatPeriodLabel = (period) => {
      if (!period || typeof period !== "object") {
        return "Period";
      }
      const name = period.period_name || period.name || period.period_code || `Period ${period.id ?? ""}`.trim();
      const start = period.start_date ? formatDate(period.start_date) : "-";
      const end = period.end_date ? formatDate(period.end_date) : "-";
      return `${name} (${start} - ${end})`;
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
    const reimbursementFilter = ref("all");
    const hasReimbursementEntries = computed(() => Array.isArray(props.reimbursementEntries) && props.reimbursementEntries.length > 0);
    const normalizedReimbursementEntries = computed(() => {
      if (!hasReimbursementEntries.value) {
        return [];
      }
      return props.reimbursementEntries.map((entry, index) => {
        const amount = parseFloat(entry.amount ?? entry.total ?? 0) || 0;
        const rate = parseFloat(entry.rate ?? entry.unit_price ?? amount) || amount;
        const quantity = parseFloat(entry.quantity ?? 1) || 1;
        return {
          id: entry.id ?? `reimbursement-entry-${index}`,
          description: entry.description ?? "Reimbursement",
          quantity,
          unit: entry.unit ?? "UNIT",
          rate,
          currency: entry.currency ?? "IDR",
          amount,
          status: entry.status ?? null,
          vendor_name: entry.vendor_name ?? "Eshaka Wijaya Logistics",
          paid_at: entry.paid_at ?? entry.paid_at_date ?? null,
          category: entry.category ?? null,
          notes: entry.notes ?? null,
          can_update: entry.can_update !== false
        };
      });
    });
    const filteredReimbursementEntries = computed(() => {
      if (!hasReimbursementEntries.value) {
        return [];
      }
      return normalizedReimbursementEntries.value.filter((items) => {
        const status = (items.status || "").toLowerCase();
        if (reimbursementFilter.value === "paid") {
          return status === "paid";
        }
        if (reimbursementFilter.value === "unpaid") {
          return status !== "paid";
        }
        return true;
      });
    });
    watch(
      () => reimbursementPaymentForm.status,
      (status) => {
        if (status === "paid") {
          if (!reimbursementPaymentForm.vendor_name) {
            reimbursementPaymentForm.vendor_name = "Eshaka Wijaya Logistics";
          }
          if (!reimbursementPaymentForm.paid_at) {
            reimbursementPaymentForm.paid_at = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
          }
        } else {
          reimbursementPaymentForm.vendor_name = "";
          reimbursementPaymentForm.paid_at = "";
        }
      }
    );
    const getStatusLabel = (status) => {
      const labels = {
        draft: "Draft",
        sent: "Sent",
        paid: "Paid",
        overdue: "Overdue",
        cancelled: "Cancelled"
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
        return "Paid";
      }
      const dueDate = new Date(invoice.due_date);
      const today = /* @__PURE__ */ new Date();
      if (invoice.status !== "paid" && dueDate < today) {
        return "Overdue";
      }
      return "Unpaid";
    };
    const getPaymentStatusColor = (invoice) => {
      const status = getPaymentStatusLabel(invoice);
      const colors = {
        "Paid": "bg-green-100 text-green-800",
        "Overdue": "bg-red-100 text-red-800",
        "Unpaid": "bg-yellow-100 text-yellow-800"
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
    const closeReimbursementPaymentModal = () => {
      showReimbursementPaymentModal.value = false;
      selectedReimbursementEntry.value = null;
      reimbursementPaymentForm.reset();
    };
    const submitReimbursementPayment = () => {
      if (!selectedReimbursementEntry.value) {
        return;
      }
      if (reimbursementPaymentForm.status !== "paid") {
        reimbursementPaymentForm.vendor_name = "";
        reimbursementPaymentForm.paid_at = "";
      }
      reimbursementPaymentForm.post(
        route("admin-keuangan.invoices.reimbursement-itemss.update-payment", [props.invoice.id, selectedReimbursementEntry.value.id]),
        {
          preserveScroll: true,
          onSuccess: () => {
            closeReimbursementPaymentModal();
          }
        }
      );
    };
    const isMainInvoiceItem = (items) => {
      if (!items) {
        return false;
      }
      const itemsType = (items.item_type || items.items_type || "").toLowerCase();
      const includeInInvoice = items.include_in_customer_invoice ?? true;
      const hiddenFromCustomer = items.is_hidden_from_customer ?? false;
      if (!includeInInvoice || hiddenFromCustomer) {
        return false;
      }
      if (itemsType === "operational_cost" || itemsType === "reimbursement") {
        return false;
      }
      const description = (items.description || "").toLowerCase();
      if (description.includes("reimbur")) {
        return false;
      }
      if (itemsType === "billable" || itemsType === "") {
        return true;
      }
      const ref2 = (items.item_ref || items.items_ref || "").toLowerCase().trim();
      return !ref2 || ref2 === "main" || ref2 === "m" || ref2 === "1" || ref2.includes("main");
    };
    const filterMainInvoiceItems = (itemss = []) => {
      return (itemss || []).filter(isMainInvoiceItem);
    };
    const getInvoiceItems = (invoiceLike) => {
      if (!invoiceLike) {
        return [];
      }
      return invoiceLike.items || invoiceLike.itemss || [];
    };
    const getMainItems = computed(() => {
      if (props.invoice.invoice_type === "combined") {
        const mainItems = getInvoiceItems(props.mainInvoice);
        if (mainItems.length > 0) {
          return filterMainInvoiceItems(mainItems);
        }
        return filterMainInvoiceItems(getInvoiceItems(props.invoice));
      }
      if (props.mainInvoice) {
        return filterMainInvoiceItems(getInvoiceItems(props.mainInvoice));
      }
      if (props.invoice.invoice_type === "main") {
        return filterMainInvoiceItems(getInvoiceItems(props.invoice));
      }
      return filterMainInvoiceItems(getInvoiceItems(props.invoice));
    });
    const getReimbursementItems = computed(() => {
      if (props.invoice.invoice_type === "combined") {
        return getInvoiceItems(props.invoice).filter((items) => {
          const itemType = (items.item_type || items.items_type || "").toLowerCase();
          if (itemType === "reimbursement") {
            return true;
          }
          if (!itemType) {
            const ref2 = (items.item_ref || items.items_ref || "").toLowerCase().trim();
            return ref2 === "reimbursement" || ref2 === "r" || ref2 === "2" || ref2.includes("reimbur");
          }
          return false;
        });
      }
      if (props.reimbursementInvoice) {
        return getInvoiceItems(props.reimbursementInvoice);
      }
      if (props.invoice.invoice_type === "reimbursement") {
        return getInvoiceItems(props.invoice);
      }
      return [];
    });
    const getMainTotal = computed(() => {
      return getMainItems.value.reduce((total, items) => total + (parseFloat(items.amount) || 0), 0);
    });
    const getReimbursementTotal = computed(() => {
      return getReimbursementItems.value.reduce((total, items) => total + (parseFloat(items.amount) || 0), 0);
    });
    const vatAmount = computed(() => {
      var _a;
      return Number(((_a = props.invoice) == null ? void 0 : _a.vat_amount) || 0);
    });
    const vatRateLabel = computed(() => {
      var _a;
      const rate = Number(((_a = props.invoice) == null ? void 0 : _a.vat_rate) || 0);
      if (!rate) {
        return "Total VAT";
      }
      const formatted = rate % 1 === 0 ? rate.toFixed(0) : rate.toString();
      return `Total VAT (${formatted}%)`;
    });
    const downPaymentAmount = computed(() => {
      var _a;
      return Number(((_a = props.invoice) == null ? void 0 : _a.down_payment_amount) || 0);
    });
    const hasDownPayment = computed(() => downPaymentAmount.value > 0);
    const mainTotalAfterDownPayment = computed(() => {
      return Math.max(getMainTotal.value - downPaymentAmount.value, 0);
    });
    const combinedTotalBeforeDownPayment = computed(() => {
      return getMainTotal.value + vatAmount.value + getReimbursementTotal.value;
    });
    const combinedTotalAfterDownPayment = computed(() => {
      return Math.max(combinedTotalBeforeDownPayment.value - downPaymentAmount.value, 0);
    });
    const reimbursementCurrency = computed(() => {
      if (hasReimbursementEntries.value && normalizedReimbursementEntries.value.length > 0) {
        return normalizedReimbursementEntries.value[0].currency || "IDR";
      }
      const fallbackItem = getReimbursementItems.value[0];
      return (fallbackItem == null ? void 0 : fallbackItem.currency) || "IDR";
    });
    const reimbursementFilteredSubtotal = computed(() => {
      if (!hasReimbursementEntries.value) {
        return getReimbursementTotal.value;
      }
      return filteredReimbursementEntries.value.reduce((total, items) => total + (parseFloat(items.amount) || 0), 0);
    });
    const reimbursementOverallSubtotal = computed(() => {
      if (!hasReimbursementEntries.value) {
        return getReimbursementTotal.value;
      }
      return normalizedReimbursementEntries.value.reduce((total, items) => total + (parseFloat(items.amount) || 0), 0);
    });
    const reimbursementSubtotalLabel = computed(() => {
      if (!hasReimbursementEntries.value || reimbursementFilter.value === "all") {
        return "Subtotal Reimbursement";
      }
      return "Subtotal (Filtered)";
    });
    const getReimbursementStatusLabel = (status) => {
      const labels = {
        pending: "Pending",
        linked: "Linked",
        invoiced: "Invoiced",
        paid: "Paid"
      };
      if (!status) {
        return "Unknown";
      }
      return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
    };
    const getReimbursementLatestHistory = (entry) => {
      var _a;
      if (!(entry == null ? void 0 : entry.payment_history) || entry.payment_history.length === 0) {
        return null;
      }
      const latest = [...entry.payment_history].pop();
      if (!latest) {
        return null;
      }
      return {
        status: latest.status,
        vendor_name: latest.vendor_name,
        notes: latest.notes,
        user: (_a = latest.user) == null ? void 0 : _a.name,
        timestamp: latest.timestamp
      };
    };
    const getOperationalCosts = computed(() => {
      return getInvoiceItems(props.invoice).filter((items) => {
        const itemType = (items.item_type || items.items_type || "").toLowerCase();
        return itemType === "operational_cost";
      });
    });
    const getItemQuantityValue = (items) => {
      const quantity = (items == null ? void 0 : items.quantity) ?? (items == null ? void 0 : items.qty) ?? null;
      if (quantity === null || quantity === "" || !isFinite(Number(quantity)) || Number(quantity) <= 0) {
        return null;
      }
      return Number(quantity);
    };
    const getItemUnitValue = (items) => {
      const unit = (items == null ? void 0 : items.unit) ?? (items == null ? void 0 : items.package_unit) ?? null;
      if (!unit || !String(unit).trim()) {
        return null;
      }
      return unit;
    };
    const getOperationalQtyValue = (items) => {
      const itemQuantity = getItemQuantityValue(items);
      if (itemQuantity) {
        return itemQuantity;
      }
      const source = resolveOperationalCostSource(items);
      if (!source) {
        return null;
      }
      const quantity = source.quantity ?? source.qty ?? null;
      if (quantity === null || quantity === "" || !isFinite(Number(quantity)) || Number(quantity) <= 0) {
        return null;
      }
      return Number(quantity);
    };
    const getOperationalAmountValue = (items) => {
      const quantity = getOperationalQtyValue(items);
      const rate = Number(items.rate || 0);
      if (quantity) {
        return rate * quantity;
      }
      return Number(items.amount || 0);
    };
    const getOperationalCostsTotal = computed(() => {
      return getOperationalCosts.value.reduce((total, items) => total + getOperationalAmountValue(items), 0);
    });
    const salesOrderSource = computed(() => {
      var _a, _b;
      return ((_a = props.invoice) == null ? void 0 : _a.salesOrder) || ((_b = props.invoice) == null ? void 0 : _b.sales_order) || null;
    });
    const getOperationalQtyDisplay = (items) => {
      const itemQuantity = getItemQuantityValue(items);
      if (itemQuantity) {
        return formatNumber(itemQuantity);
      }
      const source = resolveOperationalCostSource(items);
      if (!source) {
        return "-";
      }
      const quantity = source.quantity ?? source.qty ?? null;
      if (quantity === null || quantity === "" || !isFinite(Number(quantity)) || Number(quantity) <= 0) {
        return "-";
      }
      return formatNumber(Number(quantity));
    };
    const getOperationalUnitDisplay = (items) => {
      const itemUnit = getItemUnitValue(items);
      if (itemUnit) {
        return itemUnit;
      }
      const source = resolveOperationalCostSource(items);
      if (!source) {
        return "-";
      }
      const unit = source.unit ?? source.package_unit ?? null;
      if (!unit || !String(unit).trim()) {
        return "-";
      }
      return unit;
    };
    const resolveOperationalCostSource = (items) => {
      const refValue = (items == null ? void 0 : items.item_ref) ?? (items == null ? void 0 : items.items_ref) ?? null;
      if (!refValue) {
        return null;
      }
      const itemsRef = String(refValue);
      const so = salesOrderSource.value;
      if (!so) {
        return null;
      }
      if (itemsRef.startsWith("other_cost_")) {
        return resolveOtherCostSource(itemsRef.replace("other_cost_", ""), so.other_costs);
      }
      if (itemsRef.startsWith("cogs_vendor_")) {
        return resolveVendorBreakdownSource(itemsRef.replace("cogs_vendor_", ""), so.vendor_breakdown);
      }
      if (itemsRef.startsWith("vendor_")) {
        return resolveVendorBreakdownSource(itemsRef.replace("vendor_", ""), so.vendor_breakdown);
      }
      return null;
    };
    const resolveOtherCostSource = (suffix, otherCosts) => {
      if (!Array.isArray(otherCosts) || otherCosts.length === 0) {
        return null;
      }
      const normalizedSuffix = String(suffix);
      const byId = otherCosts.find((cost) => String((cost == null ? void 0 : cost.id) ?? "") === normalizedSuffix);
      if (byId) {
        return byId;
      }
      const index = Number(normalizedSuffix);
      if (Number.isInteger(index) && index >= 0 && index < otherCosts.length) {
        return otherCosts[index];
      }
      return null;
    };
    const resolveVendorBreakdownSource = (suffix, vendorBreakdown) => {
      if (!Array.isArray(vendorBreakdown) || vendorBreakdown.length === 0) {
        return null;
      }
      const normalizedSuffix = String(suffix);
      const byVendorId = vendorBreakdown.find((vendor) => String((vendor == null ? void 0 : vendor.vendor_id) ?? "") === normalizedSuffix);
      if (byVendorId) {
        return byVendorId;
      }
      const index = Number(normalizedSuffix);
      if (Number.isInteger(index) && index >= 0 && index < vendorBreakdown.length) {
        return vendorBreakdown[index];
      }
      return null;
    };
    const getBillableItems = computed(() => {
      return filterMainInvoiceItems(getInvoiceItems(props.invoice));
    });
    const getGrossRevenue = computed(() => {
      return getBillableItems.value.reduce((total, items) => total + (parseFloat(items.amount) || 0), 0);
    });
    const getNetProfit = computed(() => {
      return getGrossRevenue.value - getOperationalCostsTotal.value;
    });
    const getProfitMargin = computed(() => {
      if (getGrossRevenue.value <= 0) {
        return 0;
      }
      return (getNetProfit.value / getGrossRevenue.value * 100).toFixed(2);
    });
    const shouldShowFixOperationalCostsButton = computed(() => {
      return props.invoice.sales_order_id && getOperationalCostsTotal.value === 0 && props.invoice.status !== "paid" && !props.invoice.posted_to_profit_loss;
    });
    const shouldShowProfitLossButton = computed(() => {
      return props.invoice.status === "sent" && !props.invoice.posted_to_profit_loss && (getGrossRevenue.value > 0 || getOperationalCostsTotal.value > 0);
    });
    const loadProfitLossPeriods = async () => {
      try {
        const response = await fetch(route("admin-keuangan.invoices.profit-loss-periods"), {
          headers: {
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          credentials: "same-origin"
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        profitLossPeriods.value = Array.isArray(data) ? data : data.periods || [];
        profitLossAccounts.value = !Array.isArray(data) && data.accounts ? data.accounts : [];
      } catch (error) {
        console.error("Error loading profit loss periods:", error);
        profitLossPeriods.value = [];
        profitLossAccounts.value = [];
      }
    };
    const submitProfitLossPosting = () => {
      processing.value = true;
      router.post(route("admin-keuangan.invoices.post-to-profit-loss", props.invoice.id), profitLossForm, {
        onSuccess: () => {
          showProfitLossModal.value = false;
          processing.value = false;
        },
        onError: () => {
          processing.value = false;
        }
      });
    };
    const unpostFromProfitLoss = () => {
      if (confirm("Are you sure you want to unpost from profit & loss?")) {
        processing.value = true;
        router.delete(route("admin-keuangan.invoices.unpost-from-profit-loss", props.invoice.id), {
          onSuccess: () => {
            processing.value = false;
          },
          onError: () => {
            processing.value = false;
          }
        });
      }
    };
    const fixOperationalCosts = () => {
      if (confirm("Add operational costs from the sales order vendor breakdown. Continue?")) {
        processing.value = true;
        router.post(route("admin-keuangan.invoices.fix-operational-costs", props.invoice.id), {}, {
          onSuccess: (page2) => {
            processing.value = false;
            window.location.reload();
          },
          onError: (errors) => {
            processing.value = false;
            console.error("Error fixing operational costs:", errors);
          }
        });
      }
    };
    const openProfitLossModal = async () => {
      await loadProfitLossPeriods();
      showProfitLossModal.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-b958f5e4${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-b958f5e4${_scopeId}><div class="flex itemss-center justify-between" data-v-b958f5e4${_scopeId}><div data-v-b958f5e4${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-b958f5e4${_scopeId}>Invoice Details</h2><p class="text-sage-600" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.invoice_number)}</p></div><div class="flex space-x-3" data-v-b958f5e4${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: backToIndexUrl.value,
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-600 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b958f5e4${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-b958f5e4${_scopeId2}></path></svg> Back `);
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
                    createTextVNode(" Back ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (__props.invoice.status === "draft") {
              _push2(`<button class="inline-flex itemss-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-b958f5e4${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b958f5e4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" data-v-b958f5e4${_scopeId}></path></svg> Mark as Sent </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (shouldShowFixOperationalCostsButton.value) {
              _push2(`<button class="inline-flex itemss-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors" data-v-b958f5e4${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b958f5e4${_scopeId}><path stroke-l inecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-b958f5e4${_scopeId}></path></svg> Fix Operational Costs </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (shouldShowProfitLossButton.value) {
              _push2(`<button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-600 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" data-v-b958f5e4${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b958f5e4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-b958f5e4${_scopeId}></path></svg> Post to Profit &amp; Loss </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.invoice.posted_to_profit_loss) {
              _push2(`<button class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-600 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" data-v-b958f5e4${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b958f5e4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" data-v-b958f5e4${_scopeId}></path></svg> Unpost Profit &amp; Loss </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" data-v-b958f5e4${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-b958f5e4${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-b958f5e4${_scopeId}>Invoice Information</h3><div class="space-y-3" data-v-b958f5e4${_scopeId}><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Invoice Number:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.invoice_number)}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Sales Order:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate((_a = __props.invoice.sales_order) == null ? void 0 : _a.order_number)}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Customer:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(((_b = __props.invoice.customer) == null ? void 0 : _b.consignee_shipper) || ((_c = __props.invoice.customer) == null ? void 0 : _c.company_name))}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Invoice Date:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatDate(__props.invoice.invoice_date))}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Due Date:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatDate(__props.invoice.due_date))}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Term:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.term_days)} Days</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Status:</span><span class="${ssrRenderClass([getStatusColor(__props.invoice.status), "inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-b958f5e4${_scopeId}>${ssrInterpolate(getStatusLabel(__props.invoice.status))}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Payment Status:</span><span class="${ssrRenderClass([getPaymentStatusColor(__props.invoice), "inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-b958f5e4${_scopeId}>${ssrInterpolate(getPaymentStatusLabel(__props.invoice))}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Down Payment (DP):</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(hasDownPayment.value ? formatCurrency(downPaymentAmount.value) : "-")}</span></div>`);
            if (hasDownPayment.value) {
              _push2(`<div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>DP Date:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatDate(__props.invoice.down_payment_date))}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (hasDownPayment.value && __props.invoice.down_payment_notes) {
              _push2(`<div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>DP Notes:</span><span class="font-medium text-right" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.down_payment_notes)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Profit &amp; Loss Status:</span><span class="${ssrRenderClass([__props.invoice.posted_to_profit_loss ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800", "inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.posted_to_profit_loss ? "Posted" : "Not Posted")}</span></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-b958f5e4${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-b958f5e4${_scopeId}>Shipment Details</h3><div class="space-y-3" data-v-b958f5e4${_scopeId}><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Shipper:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.shipper || "-")}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Consignee:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.consignee || "-")}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Vessel:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.vessel || "-")}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Flight/VOY:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.flight_voy || "-")}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>AWB/BL No:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.awb_bl_no || "-")}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>POL/POD:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.pol_pod || "-")}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Origin:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.origin || "-")}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Destination:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.destination || "-")}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Gross Weight:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.gross_weight || "-")}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Volume:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.volume || "-")}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>No. of Packages:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.no_of_packages || "-")} ${ssrInterpolate(__props.invoice.package_unit || "BAG")}</span></div></div></div>`);
            if (__props.invoice.status === "paid") {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-b958f5e4${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-b958f5e4${_scopeId}>Payment Information</h3><div class="space-y-3" data-v-b958f5e4${_scopeId}><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Payment Date:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatDate(__props.invoice.paid_date))}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Amount Paid:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(__props.invoice.paid_amount))}</span></div>`);
              if (__props.invoice.payment_method) {
                _push2(`<div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Payment Method:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.payment_method)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Confirmed By:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(((_d = __props.invoice.confirmed_by) == null ? void 0 : _d.name) || "-")}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Confirmation Time:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatDateTime(__props.invoice.payment_confirmed_at))}</span></div>`);
              if (__props.invoice.payment_notes) {
                _push2(`<div class="pt-2" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Notes:</span><p class="text-gray-900 mt-1" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.payment_notes)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.invoice.posted_to_profit_loss) {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6 border border-purple-200" data-v-b958f5e4${_scopeId}><h3 class="text-lg font-semibold text-purple-800 mb-4" data-v-b958f5e4${_scopeId}>Profit &amp; Loss Posting Information</h3><div class="space-y-3" data-v-b958f5e4${_scopeId}><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Status:</span><span class="inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800" data-v-b958f5e4${_scopeId}> Posted </span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Posting Date:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatDateTime(__props.invoice.posted_to_profit_loss_at))}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Posted By:</span><span class="font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(((_e = __props.invoice.posted_by_user) == null ? void 0 : _e.name) || "-")}</span></div>`);
              if (__props.invoice.profit_loss_entries && __props.invoice.profit_loss_entries.length > 0) {
                _push2(`<div class="pt-2" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Entry IDs:</span><p class="text-gray-900 mt-1 text-sm" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.profit_loss_entries.join(", "))}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.mainInvoice || __props.invoice.invoice_type === "main" || __props.invoice.invoice_type === "combined" || getMainItems.value.length > 0) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6" data-v-b958f5e4${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-blue-50" data-v-b958f5e4${_scopeId}><div class="flex itemss-center justify-between" data-v-b958f5e4${_scopeId}><div class="flex itemss-center space-x-3" data-v-b958f5e4${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-b958f5e4${_scopeId}>Main Invoice Items</h3><span class="inline-flex itemss-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800" data-v-b958f5e4${_scopeId}>${ssrInterpolate((__props.mainInvoice || __props.invoice).invoice_number)}</span></div><div class="flex space-x-2" data-v-b958f5e4${_scopeId}><a${ssrRenderAttr("href", route("admin-keuangan.invoices.preview-pdf", (__props.mainInvoice || __props.invoice).id))} class="inline-flex itemss-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors" target="_blank" data-v-b958f5e4${_scopeId}><svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b958f5e4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-b958f5e4${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-b958f5e4${_scopeId}></path></svg> Preview PDF </a><a${ssrRenderAttr("href", route("admin-keuangan.invoices.export-pdf", (__props.mainInvoice || __props.invoice).id))} class="inline-flex itemss-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors" target="_blank" data-v-b958f5e4${_scopeId}><svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b958f5e4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" data-v-b958f5e4${_scopeId}></path></svg> Download PDF </a></div></div></div><div class="overflow-x-auto" data-v-b958f5e4${_scopeId}><table class="w-full" data-v-b958f5e4${_scopeId}><thead class="bg-sage-50" data-v-b958f5e4${_scopeId}><tr data-v-b958f5e4${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Description </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Qty </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Unit </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Rate </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Currency </th><th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Amount </th></tr></thead><tbody class="bg-white divide-y divide-sage-200" data-v-b958f5e4${_scopeId}><!--[-->`);
              ssrRenderList(getMainItems.value, (items) => {
                _push2(`<tr class="hover:bg-sage-50" data-v-b958f5e4${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(items.description)}</div>`);
                if (getReimbursementLatestHistory(items)) {
                  _push2(`<div class="text-xs text-gray-500 mt-1 space-y-0.5" data-v-b958f5e4${_scopeId}><div class="flex flex-wrap itemss-center gap-2" data-v-b958f5e4${_scopeId}><span data-v-b958f5e4${_scopeId}>Latest:</span><span class="inline-flex itemss-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700" data-v-b958f5e4${_scopeId}>${ssrInterpolate(getReimbursementStatusLabel(getReimbursementLatestHistory(items).status))}</span>`);
                  if (getReimbursementLatestHistory(items).vendor_name) {
                    _push2(`<span data-v-b958f5e4${_scopeId}> by ${ssrInterpolate(getReimbursementLatestHistory(items).vendor_name)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (getReimbursementLatestHistory(items).timestamp) {
                    _push2(`<span data-v-b958f5e4${_scopeId}> (${ssrInterpolate(formatDate(getReimbursementLatestHistory(items).timestamp))}) </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                  if (getReimbursementLatestHistory(items).notes) {
                    _push2(`<div data-v-b958f5e4${_scopeId}> Notes: ${ssrInterpolate(getReimbursementLatestHistory(items).notes)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (getReimbursementLatestHistory(items).user) {
                    _push2(`<div data-v-b958f5e4${_scopeId}> Processed by: ${ssrInterpolate(getReimbursementLatestHistory(items).user)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(getOperationalQtyDisplay(items))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(getOperationalUnitDisplay(items))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(items.rate, items.currency))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(items.currency)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right" data-v-b958f5e4${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(
                  getOperationalAmountValue(items),
                  items.currency
                ))}</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div><div class="px-6 py-4 bg-blue-50 border-t border-sage-200" data-v-b958f5e4${_scopeId}><div class="flex justify-end" data-v-b958f5e4${_scopeId}><div class="w-64 space-y-2" data-v-b958f5e4${_scopeId}><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-sm text-gray-600" data-v-b958f5e4${_scopeId}>Subtotal Main:</span><span class="text-sm font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getMainTotal.value))}</span></div>`);
              if (hasDownPayment.value && __props.invoice.invoice_type === "main") {
                _push2(`<div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-sm text-gray-600" data-v-b958f5e4${_scopeId}>Down Payment (-):</span><span class="text-sm font-medium text-red-700" data-v-b958f5e4${_scopeId}>- ${ssrInterpolate(formatCurrency(downPaymentAmount.value))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-between pt-2 border-t border-blue-200" data-v-b958f5e4${_scopeId}><span class="text-lg font-semibold text-blue-800" data-v-b958f5e4${_scopeId}>Total Main:</span><span class="text-lg font-bold text-blue-800" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(hasDownPayment.value && __props.invoice.invoice_type === "main" ? mainTotalAfterDownPayment.value : getMainTotal.value))}</span></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.reimbursementInvoice || __props.invoice.invoice_type === "reimbursement" || __props.invoice.invoice_type === "combined") {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6" data-v-b958f5e4${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-orange-50" data-v-b958f5e4${_scopeId}><div class="flex itemss-center justify-between" data-v-b958f5e4${_scopeId}><div class="flex itemss-center space-x-3" data-v-b958f5e4${_scopeId}><h3 class="text-lg font-semibold text-orange-800" data-v-b958f5e4${_scopeId}>Reimbursement Invoice Items</h3><span class="inline-flex itemss-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800" data-v-b958f5e4${_scopeId}>${ssrInterpolate((__props.reimbursementInvoice || __props.invoice).invoice_number)}</span></div><div class="flex space-x-2" data-v-b958f5e4${_scopeId}><a${ssrRenderAttr("href", route("admin-keuangan.invoices.preview-pdf-reimbursement", (__props.reimbursementInvoice || __props.invoice).id))} class="inline-flex itemss-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors" target="_blank" data-v-b958f5e4${_scopeId}><svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b958f5e4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-b958f5e4${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-b958f5e4${_scopeId}></path></svg> Preview PDF </a><a${ssrRenderAttr("href", route("admin-keuangan.invoices.export-pdf-reimbursement", (__props.reimbursementInvoice || __props.invoice).id))} class="inline-flex itemss-center px-3 py-1.5 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors" target="_blank" data-v-b958f5e4${_scopeId}><svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b958f5e4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" data-v-b958f5e4${_scopeId}></path></svg> Download PDF </a></div></div></div>`);
              if (hasReimbursementEntries.value) {
                _push2(`<div class="overflow-x-auto" data-v-b958f5e4${_scopeId}><table class="w-full" data-v-b958f5e4${_scopeId}><thead class="bg-sage-50" data-v-b958f5e4${_scopeId}><tr data-v-b958f5e4${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Description </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Qty </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Unit </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Rate </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Currency </th><th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Amount </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Vendor </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}></th></tr></thead><tbody class="bg-white divide-y divide-sage-200" data-v-b958f5e4${_scopeId}>`);
                if (filteredReimbursementEntries.value.length === 0) {
                  _push2(`<tr data-v-b958f5e4${_scopeId}><td colspan="10" class="px-6 py-6 text-center text-sm text-gray-500" data-v-b958f5e4${_scopeId}> No reimbursement data matches this filter. </td></tr>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--[-->`);
                ssrRenderList(filteredReimbursementEntries.value, (items) => {
                  _push2(`<tr class="hover:bg-sage-50" data-v-b958f5e4${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(items.description)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(getOperationalQtyDisplay(items))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(getOperationalUnitDisplay(items))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(items.rate, items.currency || reimbursementCurrency.value))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(items.currency || reimbursementCurrency.value)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right" data-v-b958f5e4${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(items.amount, items.currency || reimbursementCurrency.value))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(items.vendor_name)}</div></td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div>`);
              } else {
                _push2(`<div class="overflow-x-auto" data-v-b958f5e4${_scopeId}><table class="w-full" data-v-b958f5e4${_scopeId}><thead class="bg-sage-50" data-v-b958f5e4${_scopeId}><tr data-v-b958f5e4${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Description </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Qty </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Unit </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Rate </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Currency </th><th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Amount </th></tr></thead><tbody class="bg-white divide-y divide-sage-200" data-v-b958f5e4${_scopeId}><!--[-->`);
                ssrRenderList(getReimbursementItems.value, (items) => {
                  _push2(`<tr class="hover:bg-sage-50" data-v-b958f5e4${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(items.description)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatNumber(items.quantity))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(items.unit)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(items.rate, items.currency))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(items.currency)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right" data-v-b958f5e4${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(
                    items.amount,
                    items.currency
                  ))}</div></td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div>`);
              }
              _push2(`<div class="px-6 py-4 bg-orange-50 border-t border-sage-200" data-v-b958f5e4${_scopeId}><div class="flex justify-end" data-v-b958f5e4${_scopeId}><div class="w-64 space-y-2" data-v-b958f5e4${_scopeId}><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-sm text-gray-600" data-v-b958f5e4${_scopeId}>${ssrInterpolate(reimbursementSubtotalLabel.value)}</span><span class="text-sm font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(reimbursementFilteredSubtotal.value, reimbursementCurrency.value))}</span></div>`);
              if (hasReimbursementEntries.value && reimbursementFilter.value !== "all") {
                _push2(`<div class="text-xs text-gray-500 text-right" data-v-b958f5e4${_scopeId}> Showing ${ssrInterpolate(filteredReimbursementEntries.value.length)} of ${ssrInterpolate(normalizedReimbursementEntries.value.length)} items </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-between pt-2 border-t border-orange-200" data-v-b958f5e4${_scopeId}><span class="text-lg font-semibold text-orange-800" data-v-b958f5e4${_scopeId}>Total Reimbursement:</span><span class="text-lg font-bold text-orange-800" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(reimbursementOverallSubtotal.value, reimbursementCurrency.value))}</span></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (getOperationalCosts.value.length > 0) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden mb-6" data-v-b958f5e4${_scopeId}><div class="px-6 py-4 border-b border-red-200 bg-red-50" data-v-b958f5e4${_scopeId}><div class="flex itemss-center justify-between" data-v-b958f5e4${_scopeId}><div class="flex itemss-center space-x-3" data-v-b958f5e4${_scopeId}><h3 class="text-lg font-semibold text-red-800" data-v-b958f5e4${_scopeId}>Other Costs / Operational Costs</h3><span class="inline-flex itemss-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800" data-v-b958f5e4${_scopeId}> Internal Only </span></div><div class="text-sm text-red-600" data-v-b958f5e4${_scopeId}> Not visible to customer </div></div></div><div class="overflow-x-auto" data-v-b958f5e4${_scopeId}><table class="w-full" data-v-b958f5e4${_scopeId}><thead class="bg-red-50" data-v-b958f5e4${_scopeId}><tr data-v-b958f5e4${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Description </th><th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Qty </th><th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Unit </th><th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Rate </th><th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Currency </th><th class="px-6 py-3 text-right text-xs font-medium text-red-500 uppercase tracking-wider" data-v-b958f5e4${_scopeId}> Amount </th></tr></thead><tbody class="bg-white divide-y divide-red-200" data-v-b958f5e4${_scopeId}><!--[-->`);
              ssrRenderList(getOperationalCosts.value, (items) => {
                _push2(`<tr class="hover:bg-red-50" data-v-b958f5e4${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(items.description)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatNumber(items.quantity))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(items.unit)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(items.rate, items.currency))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-b958f5e4${_scopeId}><div class="text-sm text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(items.currency)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right" data-v-b958f5e4${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(
                  items.amount,
                  items.currency
                ))}</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div><div class="px-6 py-4 bg-red-50 border-t border-red-200" data-v-b958f5e4${_scopeId}><div class="flex justify-end" data-v-b958f5e4${_scopeId}><div class="w-64 space-y-2" data-v-b958f5e4${_scopeId}><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-sm text-gray-600" data-v-b958f5e4${_scopeId}>Other Costs Subtotal:</span><span class="text-sm font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getOperationalCostsTotal.value))}</span></div><div class="flex justify-between pt-2 border-t border-red-200" data-v-b958f5e4${_scopeId}><span class="text-lg font-semibold text-red-800" data-v-b958f5e4${_scopeId}>Total Other Costs:</span><span class="text-lg font-bold text-red-800" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getOperationalCostsTotal.value))}</span></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white rounded-lg shadow-sm border border-purple-200 overflow-hidden mb-6" data-v-b958f5e4${_scopeId}><div class="px-6 py-4 border-b border-purple-200 bg-purple-50" data-v-b958f5e4${_scopeId}><div class="flex itemss-center justify-between" data-v-b958f5e4${_scopeId}><div class="flex itemss-center space-x-3" data-v-b958f5e4${_scopeId}><h3 class="text-lg font-semibold text-purple-800" data-v-b958f5e4${_scopeId}>Profit Analysis</h3><span class="inline-flex itemss-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800" data-v-b958f5e4${_scopeId}> Internal Analysis </span></div></div></div><div class="px-6 py-4" data-v-b958f5e4${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-v-b958f5e4${_scopeId}><div class="bg-green-50 rounded-lg p-4 border border-green-200" data-v-b958f5e4${_scopeId}><div class="text-center" data-v-b958f5e4${_scopeId}><div class="text-2xl font-bold text-green-800" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getGrossRevenue.value))}</div><div class="text-sm text-green-600 mt-1" data-v-b958f5e4${_scopeId}>Gross Revenue</div><div class="text-xs text-gray-500 mt-1" data-v-b958f5e4${_scopeId}>Total billable</div></div></div><div class="bg-red-50 rounded-lg p-4 border border-red-200" data-v-b958f5e4${_scopeId}><div class="text-center" data-v-b958f5e4${_scopeId}><div class="text-2xl font-bold text-red-800" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getOperationalCostsTotal.value))}</div><div class="text-sm text-red-600 mt-1" data-v-b958f5e4${_scopeId}>Operational Costs</div><div class="text-xs text-gray-500 mt-1" data-v-b958f5e4${_scopeId}>Operational costs</div></div></div><div class="bg-blue-50 rounded-lg p-4 border border-blue-200" data-v-b958f5e4${_scopeId}><div class="text-center" data-v-b958f5e4${_scopeId}><div class="text-2xl font-bold text-blue-800" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getNetProfit.value))}</div><div class="text-sm text-blue-600 mt-1" data-v-b958f5e4${_scopeId}>Net Profit</div><div class="text-xs text-gray-500 mt-1" data-v-b958f5e4${_scopeId}>Net profit</div></div></div><div class="bg-purple-50 rounded-lg p-4 border border-purple-200" data-v-b958f5e4${_scopeId}><div class="text-center" data-v-b958f5e4${_scopeId}><div class="text-2xl font-bold text-purple-800" data-v-b958f5e4${_scopeId}>${ssrInterpolate(getProfitMargin.value)}%</div><div class="text-sm text-purple-600 mt-1" data-v-b958f5e4${_scopeId}>Profit Margin</div><div class="text-xs text-gray-500 mt-1" data-v-b958f5e4${_scopeId}>Profit percentage</div></div></div></div><div class="mt-6 bg-gray-50 rounded-lg p-4" data-v-b958f5e4${_scopeId}><h4 class="text-sm font-semibold text-gray-800 mb-3" data-v-b958f5e4${_scopeId}>Calculation Details:</h4><div class="space-y-2 text-sm" data-v-b958f5e4${_scopeId}><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Main Invoice</span><span class="font-medium text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getGrossRevenue.value))}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>VAT</span><span class="font-medium text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(vatAmount.value))}</span></div><div class="flex justify-between py-1 border-t border-b border-gray-200" data-v-b958f5e4${_scopeId}><span class="text-gray-700" data-v-b958f5e4${_scopeId}>Total Main Invoice + VAT</span><span class="font-semibold text-blue-700" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getGrossRevenue.value + vatAmount.value))}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Reimbursement</span><span class="font-medium text-gray-900" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getReimbursementTotal.value))}</span></div><div class="flex justify-between py-1 border-t border-b border-gray-200" data-v-b958f5e4${_scopeId}><span class="text-gray-700" data-v-b958f5e4${_scopeId}>Total Invoice + Reimbursement</span><span class="font-semibold text-blue-700" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getGrossRevenue.value + vatAmount.value + getReimbursementTotal.value))}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Operational Costs</span><span class="font-medium text-red-700" data-v-b958f5e4${_scopeId}>- ${ssrInterpolate(formatCurrency(getOperationalCostsTotal.value))}</span></div><div class="flex justify-between font-semibold" data-v-b958f5e4${_scopeId}><span class="text-gray-800" data-v-b958f5e4${_scopeId}>Net Profit</span><span class="text-green-700" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getNetProfit.value))}</span></div><div class="flex justify-between text-sm" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Profit Percentage</span><span class="text-purple-700 font-medium" data-v-b958f5e4${_scopeId}>${ssrInterpolate(getProfitMargin.value)}%</span></div></div></div></div></div>`);
            if (__props.invoice.invoice_type === "combined" && getMainItems.value.length > 0 && getReimbursementItems.value.length > 0) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-b958f5e4${_scopeId}><div class="px-6 py-4 bg-sage-50" data-v-b958f5e4${_scopeId}><div class="flex justify-end" data-v-b958f5e4${_scopeId}><div class="w-80 space-y-3" data-v-b958f5e4${_scopeId}><div class="text-center text-lg font-semibold text-sage-800 pb-2 border-b border-sage-300" data-v-b958f5e4${_scopeId}> Combined Invoice Summary </div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-sm text-blue-700" data-v-b958f5e4${_scopeId}>Total Main Items:</span><span class="text-sm font-medium text-blue-700" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getMainTotal.value))}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-sm text-gray-700" data-v-b958f5e4${_scopeId}>${ssrInterpolate(vatRateLabel.value)}:</span><span class="text-sm font-medium text-gray-700" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(vatAmount.value))}</span></div><div class="flex justify-between" data-v-b958f5e4${_scopeId}><span class="text-sm text-orange-700" data-v-b958f5e4${_scopeId}>Total Reimbursement Items:</span><span class="text-sm font-medium text-orange-700" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getReimbursementTotal.value))}</span></div><div class="flex justify-between pt-3 border-t border-sage-400" data-v-b958f5e4${_scopeId}><span class="text-xl font-bold text-sage-800" data-v-b958f5e4${_scopeId}>Grand Total:</span><span class="text-xl font-bold text-sage-800" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(combinedTotalBeforeDownPayment.value))}</span></div>`);
              if (hasDownPayment.value) {
                _push2(`<div class="flex justify-between text-sm text-red-700" data-v-b958f5e4${_scopeId}><span data-v-b958f5e4${_scopeId}>Down Payment (-):</span><span class="font-medium" data-v-b958f5e4${_scopeId}>- ${ssrInterpolate(formatCurrency(downPaymentAmount.value))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (hasDownPayment.value) {
                _push2(`<div class="flex justify-between pt-2 border-t border-sage-300" data-v-b958f5e4${_scopeId}><span class="text-lg font-bold text-sage-800" data-v-b958f5e4${_scopeId}>Total After DP:</span><span class="text-lg font-bold text-sage-800" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(combinedTotalAfterDownPayment.value))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (showPaymentModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex itemss-center justify-center z-50" data-v-b958f5e4${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-b958f5e4${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-b958f5e4${_scopeId}>Confirm Payment</h3><form data-v-b958f5e4${_scopeId}><div class="space-y-4" data-v-b958f5e4${_scopeId}><div data-v-b958f5e4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-b958f5e4${_scopeId}>Amount Paid</label><input type="number"${ssrRenderAttr("value", paymentForm.paid_amount)}${ssrRenderAttr("placeholder", formatCurrency(__props.invoice.total))} step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-b958f5e4${_scopeId}></div><div data-v-b958f5e4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-b958f5e4${_scopeId}>Payment Date</label><input type="date"${ssrRenderAttr("value", paymentForm.paid_date)}${ssrRenderAttr("max", (/* @__PURE__ */ new Date()).toISOString().split("T")[0])} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-b958f5e4${_scopeId}></div><div data-v-b958f5e4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-b958f5e4${_scopeId}>Payment Method</label><input type="text"${ssrRenderAttr("value", paymentForm.payment_method)} placeholder="Bank transfer, cash, etc." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-b958f5e4${_scopeId}></div><div data-v-b958f5e4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-b958f5e4${_scopeId}>Notes (Optional)</label><textarea rows="3" placeholder="Additional notes about this payment..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-b958f5e4${_scopeId}>${ssrInterpolate(paymentForm.payment_notes)}</textarea></div></div><div class="flex justify-end space-x-3 mt-6" data-v-b958f5e4${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-b958f5e4${_scopeId}> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50" data-v-b958f5e4${_scopeId}>${ssrInterpolate(processing.value ? "Processing..." : "Confirm Payment")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showMarkSentModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex itemss-center justify-center z-50" data-v-b958f5e4${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-b958f5e4${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-b958f5e4${_scopeId}>Mark Invoice as Sent</h3><p class="text-gray-600 mb-6" data-v-b958f5e4${_scopeId}>Are you sure you want to mark this invoice as sent to the customer? </p><div class="flex justify-end space-x-3" data-v-b958f5e4${_scopeId}><button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-b958f5e4${_scopeId}> Cancel </button><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-b958f5e4${_scopeId}> Yes, Mark as Sent </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showReimbursementPaymentModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex itemss-center justify-center z-50" data-v-b958f5e4${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-b958f5e4${_scopeId}><h3 class="text-lg font-semibold text-orange-800 mb-4" data-v-b958f5e4${_scopeId}>Update Reimbursement Status</h3>`);
              if (selectedReimbursementEntry.value) {
                _push2(`<div class="mb-4 text-sm text-gray-600" data-v-b958f5e4${_scopeId}><div class="font-medium text-gray-800" data-v-b958f5e4${_scopeId}>${ssrInterpolate(selectedReimbursementEntry.value.description)}</div><div data-v-b958f5e4${_scopeId}>Amount: ${ssrInterpolate(formatCurrency(
                  selectedReimbursementEntry.value.amount,
                  selectedReimbursementEntry.value.currency || "IDR"
                ))}</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<form data-v-b958f5e4${_scopeId}><div class="space-y-4" data-v-b958f5e4${_scopeId}><div data-v-b958f5e4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-b958f5e4${_scopeId}>Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" data-v-b958f5e4${_scopeId}><option value="paid" data-v-b958f5e4${ssrIncludeBooleanAttr(Array.isArray(unref(reimbursementPaymentForm).status) ? ssrLooseContain(unref(reimbursementPaymentForm).status, "paid") : ssrLooseEqual(unref(reimbursementPaymentForm).status, "paid")) ? " selected" : ""}${_scopeId}>Paid</option><option value="invoiced" data-v-b958f5e4${ssrIncludeBooleanAttr(Array.isArray(unref(reimbursementPaymentForm).status) ? ssrLooseContain(unref(reimbursementPaymentForm).status, "invoiced") : ssrLooseEqual(unref(reimbursementPaymentForm).status, "invoiced")) ? " selected" : ""}${_scopeId}>Unpaid</option></select></div>`);
              if (unref(reimbursementPaymentForm).status === "paid") {
                _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-b958f5e4${_scopeId}><div data-v-b958f5e4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-b958f5e4${_scopeId}>Vendor / Payer</label><input type="text"${ssrRenderAttr("value", unref(reimbursementPaymentForm).vendor_name)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Eshaka Wijaya Logistics" required data-v-b958f5e4${_scopeId}></div><div data-v-b958f5e4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-b958f5e4${_scopeId}>Payment Date</label><input type="date"${ssrRenderAttr("value", unref(reimbursementPaymentForm).paid_at)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required data-v-b958f5e4${_scopeId}></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div data-v-b958f5e4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-b958f5e4${_scopeId}>Notes (Optional)</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Example: Paid via the company BCA account" data-v-b958f5e4${_scopeId}>${ssrInterpolate(unref(reimbursementPaymentForm).notes)}</textarea></div></div><div class="flex justify-end space-x-3 mt-6" data-v-b958f5e4${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-b958f5e4${_scopeId}> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(reimbursementPaymentForm).processing) ? " disabled" : ""} class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50" data-v-b958f5e4${_scopeId}>${ssrInterpolate(unref(reimbursementPaymentForm).processing ? "Saving..." : "Save Changes")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showProfitLossModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex itemss-center justify-center z-50" data-v-b958f5e4${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4" data-v-b958f5e4${_scopeId}><h3 class="text-lg font-semibold text-purple-800 mb-4" data-v-b958f5e4${_scopeId}>Post Invoice to Profit &amp; Loss</h3><div class="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-200" data-v-b958f5e4${_scopeId}><h4 class="text-sm font-semibold text-purple-800 mb-3" data-v-b958f5e4${_scopeId}>Invoice Summary:</h4><div class="grid grid-cols-2 gap-4 text-sm" data-v-b958f5e4${_scopeId}><div data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Invoice Number:</span><span class="font-medium text-purple-800 ml-2" data-v-b958f5e4${_scopeId}>${ssrInterpolate(__props.invoice.invoice_number)}</span></div><div data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Customer:</span><span class="font-medium text-purple-800 ml-2" data-v-b958f5e4${_scopeId}>${ssrInterpolate((_f = __props.invoice.customer) == null ? void 0 : _f.company_name)}</span></div><div data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Gross Revenue:</span><span class="font-medium text-green-700 ml-2" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getGrossRevenue.value))}</span></div><div data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Operational Costs:</span><span class="font-medium text-red-700 ml-2" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getOperationalCostsTotal.value))}</span></div><div class="col-span-2 pt-2 border-t border-purple-200" data-v-b958f5e4${_scopeId}><span class="text-gray-600" data-v-b958f5e4${_scopeId}>Net Profit:</span><span class="font-bold text-blue-700 ml-2" data-v-b958f5e4${_scopeId}>${ssrInterpolate(formatCurrency(getNetProfit.value))}</span></div></div></div><form data-v-b958f5e4${_scopeId}><div class="space-y-4" data-v-b958f5e4${_scopeId}><div data-v-b958f5e4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-b958f5e4${_scopeId}> Profit &amp; Loss Period <span class="text-red-500" data-v-b958f5e4${_scopeId}>*</span></label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required data-v-b958f5e4${_scopeId}><option value="" data-v-b958f5e4${ssrIncludeBooleanAttr(Array.isArray(profitLossForm.period_id) ? ssrLooseContain(profitLossForm.period_id, "") : ssrLooseEqual(profitLossForm.period_id, "")) ? " selected" : ""}${_scopeId}>Select period...</option><!--[-->`);
              ssrRenderList(profitLossPeriods.value, (period) => {
                _push2(`<option${ssrRenderAttr("value", period.id)} data-v-b958f5e4${ssrIncludeBooleanAttr(Array.isArray(profitLossForm.period_id) ? ssrLooseContain(profitLossForm.period_id, period.id) : ssrLooseEqual(profitLossForm.period_id, period.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(formatPeriodLabel(period))}</option>`);
              });
              _push2(`<!--]--></select><p class="text-xs text-gray-500 mt-1" data-v-b958f5e4${_scopeId}> Select the profit &amp; loss period where this transaction will be recorded. </p></div><div data-v-b958f5e4${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-b958f5e4${_scopeId}>Notes (Optional)</label><textarea rows="3" placeholder="Additional notes for profit &amp; loss posting..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" data-v-b958f5e4${_scopeId}>${ssrInterpolate(profitLossForm.notes)}</textarea></div><div class="bg-blue-50 border border-blue-200 rounded-lg p-4" data-v-b958f5e4${_scopeId}><div class="flex itemss-start" data-v-b958f5e4${_scopeId}><svg class="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b958f5e4${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-b958f5e4${_scopeId}></path></svg><div class="text-sm" data-v-b958f5e4${_scopeId}><p class="text-blue-800 font-medium mb-1" data-v-b958f5e4${_scopeId}>Items to be posted:</p><ul class="text-blue-700 space-y-1" data-v-b958f5e4${_scopeId}>`);
              if (getGrossRevenue.value > 0) {
                _push2(`<li data-v-b958f5e4${_scopeId}>Revenue: ${ssrInterpolate(formatCurrency(getGrossRevenue.value))}</li>`);
              } else {
                _push2(`<!---->`);
              }
              if (getOperationalCostsTotal.value > 0) {
                _push2(`<li data-v-b958f5e4${_scopeId}>Operational Costs: ${ssrInterpolate(formatCurrency(getOperationalCostsTotal.value))}</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<li data-v-b958f5e4${_scopeId}>Net Profit Impact: ${ssrInterpolate(formatCurrency(getNetProfit.value))}</li></ul></div></div></div></div><div class="flex justify-end space-x-3 mt-6" data-v-b958f5e4${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-b958f5e4${_scopeId}> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(processing.value || !profitLossForm.period_id) ? " disabled" : ""} class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50" data-v-b958f5e4${_scopeId}>${ssrInterpolate(processing.value ? "Processing..." : "Post to Profit & Loss")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex itemss-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Invoice Details"),
                      createVNode("p", { class: "text-sage-600" }, toDisplayString(__props.invoice.invoice_number), 1)
                    ]),
                    createVNode("div", { class: "flex space-x-3" }, [
                      createVNode(unref(Link), {
                        href: backToIndexUrl.value,
                        class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-600 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
                          createTextVNode(" Back ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      __props.invoice.status === "draft" ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: ($event) => showMarkSentModal.value = true,
                        class: "inline-flex itemss-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                        createTextVNode(" Mark as Sent ")
                      ], 8, ["onClick"])) : createCommentVNode("", true),
                      shouldShowFixOperationalCostsButton.value ? (openBlock(), createBlock("button", {
                        key: 1,
                        onClick: fixOperationalCosts,
                        class: "inline-flex itemss-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5 mr-2",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-l": "",
                            inecap: "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          })
                        ])),
                        createTextVNode(" Fix Operational Costs ")
                      ])) : createCommentVNode("", true),
                      shouldShowProfitLossButton.value ? (openBlock(), createBlock("button", {
                        key: 2,
                        onClick: openProfitLossModal,
                        class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-600 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
                            d: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                          })
                        ])),
                        createTextVNode(" Post to Profit & Loss ")
                      ])) : createCommentVNode("", true),
                      __props.invoice.posted_to_profit_loss ? (openBlock(), createBlock("button", {
                        key: 3,
                        onClick: unpostFromProfitLoss,
                        class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-600 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
                            d: "M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                          })
                        ])),
                        createTextVNode(" Unpost Profit & Loss ")
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Invoice Information"),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Invoice Number:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.invoice_number), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Sales Order:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString((_g = __props.invoice.sales_order) == null ? void 0 : _g.order_number), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Customer:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(((_h = __props.invoice.customer) == null ? void 0 : _h.consignee_shipper) || ((_i = __props.invoice.customer) == null ? void 0 : _i.company_name)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Invoice Date:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(__props.invoice.invoice_date)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Due Date:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(__props.invoice.due_date)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Term:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.term_days) + " Days", 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Status:"),
                        createVNode("span", {
                          class: ["inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusColor(__props.invoice.status)]
                        }, toDisplayString(getStatusLabel(__props.invoice.status)), 3)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Payment Status:"),
                        createVNode("span", {
                          class: ["inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium", getPaymentStatusColor(__props.invoice)]
                        }, toDisplayString(getPaymentStatusLabel(__props.invoice)), 3)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Down Payment (DP):"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(hasDownPayment.value ? formatCurrency(downPaymentAmount.value) : "-"), 1)
                      ]),
                      hasDownPayment.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex justify-between"
                      }, [
                        createVNode("span", { class: "text-gray-600" }, "DP Date:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(__props.invoice.down_payment_date)), 1)
                      ])) : createCommentVNode("", true),
                      hasDownPayment.value && __props.invoice.down_payment_notes ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex justify-between"
                      }, [
                        createVNode("span", { class: "text-gray-600" }, "DP Notes:"),
                        createVNode("span", { class: "font-medium text-right" }, toDisplayString(__props.invoice.down_payment_notes), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Profit & Loss Status:"),
                        createVNode("span", {
                          class: ["inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium", __props.invoice.posted_to_profit_loss ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"]
                        }, toDisplayString(__props.invoice.posted_to_profit_loss ? "Posted" : "Not Posted"), 3)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Shipment Details"),
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
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Gross Weight:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.gross_weight || "-"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Volume:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.volume || "-"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "No. of Packages:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.no_of_packages || "-") + " " + toDisplayString(__props.invoice.package_unit || "BAG"), 1)
                      ])
                    ])
                  ]),
                  __props.invoice.status === "paid" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200"
                  }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Payment Information"),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Payment Date:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDate(__props.invoice.paid_date)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Amount Paid:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(__props.invoice.paid_amount)), 1)
                      ]),
                      __props.invoice.payment_method ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "flex justify-between"
                      }, [
                        createVNode("span", { class: "text-gray-600" }, "Payment Method:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(__props.invoice.payment_method), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Confirmed By:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(((_j = __props.invoice.confirmed_by) == null ? void 0 : _j.name) || "-"), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Confirmation Time:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDateTime(__props.invoice.payment_confirmed_at)), 1)
                      ]),
                      __props.invoice.payment_notes ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "pt-2"
                      }, [
                        createVNode("span", { class: "text-gray-600" }, "Notes:"),
                        createVNode("p", { class: "text-gray-900 mt-1" }, toDisplayString(__props.invoice.payment_notes), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true),
                  __props.invoice.posted_to_profit_loss ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "bg-white rounded-lg shadow-sm p-6 border border-purple-200"
                  }, [
                    createVNode("h3", { class: "text-lg font-semibold text-purple-800 mb-4" }, "Profit & Loss Posting Information"),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Status:"),
                        createVNode("span", { class: "inline-flex itemss-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800" }, " Posted ")
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Posting Date:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDateTime(__props.invoice.posted_to_profit_loss_at)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Posted By:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(((_k = __props.invoice.posted_by_user) == null ? void 0 : _k.name) || "-"), 1)
                      ]),
                      __props.invoice.profit_loss_entries && __props.invoice.profit_loss_entries.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "pt-2"
                      }, [
                        createVNode("span", { class: "text-gray-600" }, "Entry IDs:"),
                        createVNode("p", { class: "text-gray-900 mt-1 text-sm" }, toDisplayString(__props.invoice.profit_loss_entries.join(", ")), 1)
                      ])) : createCommentVNode("", true)
                    ])
                  ])) : createCommentVNode("", true)
                ]),
                __props.mainInvoice || __props.invoice.invoice_type === "main" || __props.invoice.invoice_type === "combined" || getMainItems.value.length > 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6"
                }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-blue-50" }, [
                    createVNode("div", { class: "flex itemss-center justify-between" }, [
                      createVNode("div", { class: "flex itemss-center space-x-3" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-blue-800" }, "Main Invoice Items"),
                        createVNode("span", { class: "inline-flex itemss-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800" }, toDisplayString((__props.mainInvoice || __props.invoice).invoice_number), 1)
                      ]),
                      createVNode("div", { class: "flex space-x-2" }, [
                        createVNode("a", {
                          href: route("admin-keuangan.invoices.preview-pdf", (__props.mainInvoice || __props.invoice).id),
                          class: "inline-flex itemss-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors",
                          target: "_blank"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 mr-1.5",
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
                          href: route("admin-keuangan.invoices.export-pdf", (__props.mainInvoice || __props.invoice).id),
                          class: "inline-flex itemss-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors",
                          target: "_blank"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 mr-1.5",
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
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Description "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Qty "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Unit "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Rate "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Currency "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Amount ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(getMainItems.value, (items) => {
                          return openBlock(), createBlock("tr", {
                            key: items.id,
                            class: "hover:bg-sage-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(items.description), 1),
                              getReimbursementLatestHistory(items) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-gray-500 mt-1 space-y-0.5"
                              }, [
                                createVNode("div", { class: "flex flex-wrap itemss-center gap-2" }, [
                                  createVNode("span", null, "Latest:"),
                                  createVNode("span", { class: "inline-flex itemss-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700" }, toDisplayString(getReimbursementStatusLabel(getReimbursementLatestHistory(items).status)), 1),
                                  getReimbursementLatestHistory(items).vendor_name ? (openBlock(), createBlock("span", { key: 0 }, " by " + toDisplayString(getReimbursementLatestHistory(items).vendor_name), 1)) : createCommentVNode("", true),
                                  getReimbursementLatestHistory(items).timestamp ? (openBlock(), createBlock("span", { key: 1 }, " (" + toDisplayString(formatDate(getReimbursementLatestHistory(items).timestamp)) + ") ", 1)) : createCommentVNode("", true)
                                ]),
                                getReimbursementLatestHistory(items).notes ? (openBlock(), createBlock("div", { key: 0 }, " Notes: " + toDisplayString(getReimbursementLatestHistory(items).notes), 1)) : createCommentVNode("", true),
                                getReimbursementLatestHistory(items).user ? (openBlock(), createBlock("div", { key: 1 }, " Processed by: " + toDisplayString(getReimbursementLatestHistory(items).user), 1)) : createCommentVNode("", true)
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(getOperationalQtyDisplay(items)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(getOperationalUnitDisplay(items)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatCurrency(items.rate, items.currency)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(items.currency), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(
                                getOperationalAmountValue(items),
                                items.currency
                              )), 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "px-6 py-4 bg-blue-50 border-t border-sage-200" }, [
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode("div", { class: "w-64 space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-gray-600" }, "Subtotal Main:"),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(formatCurrency(getMainTotal.value)), 1)
                        ]),
                        hasDownPayment.value && __props.invoice.invoice_type === "main" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between"
                        }, [
                          createVNode("span", { class: "text-sm text-gray-600" }, "Down Payment (-):"),
                          createVNode("span", { class: "text-sm font-medium text-red-700" }, "- " + toDisplayString(formatCurrency(downPaymentAmount.value)), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-between pt-2 border-t border-blue-200" }, [
                          createVNode("span", { class: "text-lg font-semibold text-blue-800" }, "Total Main:"),
                          createVNode("span", { class: "text-lg font-bold text-blue-800" }, toDisplayString(formatCurrency(hasDownPayment.value && __props.invoice.invoice_type === "main" ? mainTotalAfterDownPayment.value : getMainTotal.value)), 1)
                        ])
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                __props.reimbursementInvoice || __props.invoice.invoice_type === "reimbursement" || __props.invoice.invoice_type === "combined" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6"
                }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-orange-50" }, [
                    createVNode("div", { class: "flex itemss-center justify-between" }, [
                      createVNode("div", { class: "flex itemss-center space-x-3" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-orange-800" }, "Reimbursement Invoice Items"),
                        createVNode("span", { class: "inline-flex itemss-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800" }, toDisplayString((__props.reimbursementInvoice || __props.invoice).invoice_number), 1)
                      ]),
                      createVNode("div", { class: "flex space-x-2" }, [
                        createVNode("a", {
                          href: route("admin-keuangan.invoices.preview-pdf-reimbursement", (__props.reimbursementInvoice || __props.invoice).id),
                          class: "inline-flex itemss-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors",
                          target: "_blank"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 mr-1.5",
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
                          href: route("admin-keuangan.invoices.export-pdf-reimbursement", (__props.reimbursementInvoice || __props.invoice).id),
                          class: "inline-flex itemss-center px-3 py-1.5 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors",
                          target: "_blank"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 mr-1.5",
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
                  hasReimbursementEntries.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "overflow-x-auto"
                  }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Description "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Qty "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Unit "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Rate "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Currency "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Amount "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Vendor "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" })
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-sage-200" }, [
                        filteredReimbursementEntries.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "10",
                            class: "px-6 py-6 text-center text-sm text-gray-500"
                          }, " No reimbursement data matches this filter. ")
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredReimbursementEntries.value, (items) => {
                          return openBlock(), createBlock("tr", {
                            key: items.id,
                            class: "hover:bg-sage-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(items.description), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(getOperationalQtyDisplay(items)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(getOperationalUnitDisplay(items)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatCurrency(items.rate, items.currency || reimbursementCurrency.value)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(items.currency || reimbursementCurrency.value), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(items.amount, items.currency || reimbursementCurrency.value)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(items.vendor_name), 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "overflow-x-auto"
                  }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Description "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Qty "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Unit "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Rate "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Currency "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Amount ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(getReimbursementItems.value, (items) => {
                          return openBlock(), createBlock("tr", {
                            key: items.id,
                            class: "hover:bg-sage-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(items.description), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatNumber(items.quantity)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(items.unit), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatCurrency(items.rate, items.currency)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(items.currency), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(
                                items.amount,
                                items.currency
                              )), 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])),
                  createVNode("div", { class: "px-6 py-4 bg-orange-50 border-t border-sage-200" }, [
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode("div", { class: "w-64 space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-gray-600" }, toDisplayString(reimbursementSubtotalLabel.value), 1),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(formatCurrency(reimbursementFilteredSubtotal.value, reimbursementCurrency.value)), 1)
                        ]),
                        hasReimbursementEntries.value && reimbursementFilter.value !== "all" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-xs text-gray-500 text-right"
                        }, " Showing " + toDisplayString(filteredReimbursementEntries.value.length) + " of " + toDisplayString(normalizedReimbursementEntries.value.length) + " items ", 1)) : createCommentVNode("", true),
                        createVNode("div", { class: "flex justify-between pt-2 border-t border-orange-200" }, [
                          createVNode("span", { class: "text-lg font-semibold text-orange-800" }, "Total Reimbursement:"),
                          createVNode("span", { class: "text-lg font-bold text-orange-800" }, toDisplayString(formatCurrency(reimbursementOverallSubtotal.value, reimbursementCurrency.value)), 1)
                        ])
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                getOperationalCosts.value.length > 0 ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden mb-6"
                }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-red-200 bg-red-50" }, [
                    createVNode("div", { class: "flex itemss-center justify-between" }, [
                      createVNode("div", { class: "flex itemss-center space-x-3" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-red-800" }, "Other Costs / Operational Costs"),
                        createVNode("span", { class: "inline-flex itemss-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800" }, " Internal Only ")
                      ]),
                      createVNode("div", { class: "text-sm text-red-600" }, " Not visible to customer ")
                    ])
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-red-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" }, " Description "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" }, " Qty "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" }, " Unit "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" }, " Rate "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" }, " Currency "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-red-500 uppercase tracking-wider" }, " Amount ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-red-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(getOperationalCosts.value, (items) => {
                          return openBlock(), createBlock("tr", {
                            key: items.id,
                            class: "hover:bg-red-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(items.description), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatNumber(items.quantity)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(items.unit), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatCurrency(items.rate, items.currency)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(items.currency), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(
                                items.amount,
                                items.currency
                              )), 1)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "px-6 py-4 bg-red-50 border-t border-red-200" }, [
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode("div", { class: "w-64 space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-gray-600" }, "Other Costs Subtotal:"),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(formatCurrency(getOperationalCostsTotal.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between pt-2 border-t border-red-200" }, [
                          createVNode("span", { class: "text-lg font-semibold text-red-800" }, "Total Other Costs:"),
                          createVNode("span", { class: "text-lg font-bold text-red-800" }, toDisplayString(formatCurrency(getOperationalCostsTotal.value)), 1)
                        ])
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-purple-200 overflow-hidden mb-6" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-purple-200 bg-purple-50" }, [
                    createVNode("div", { class: "flex itemss-center justify-between" }, [
                      createVNode("div", { class: "flex itemss-center space-x-3" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-purple-800" }, "Profit Analysis"),
                        createVNode("span", { class: "inline-flex itemss-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800" }, " Internal Analysis ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "px-6 py-4" }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                      createVNode("div", { class: "bg-green-50 rounded-lg p-4 border border-green-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-green-800" }, toDisplayString(formatCurrency(getGrossRevenue.value)), 1),
                          createVNode("div", { class: "text-sm text-green-600 mt-1" }, "Gross Revenue"),
                          createVNode("div", { class: "text-xs text-gray-500 mt-1" }, "Total billable")
                        ])
                      ]),
                      createVNode("div", { class: "bg-red-50 rounded-lg p-4 border border-red-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-red-800" }, toDisplayString(formatCurrency(getOperationalCostsTotal.value)), 1),
                          createVNode("div", { class: "text-sm text-red-600 mt-1" }, "Operational Costs"),
                          createVNode("div", { class: "text-xs text-gray-500 mt-1" }, "Operational costs")
                        ])
                      ]),
                      createVNode("div", { class: "bg-blue-50 rounded-lg p-4 border border-blue-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-blue-800" }, toDisplayString(formatCurrency(getNetProfit.value)), 1),
                          createVNode("div", { class: "text-sm text-blue-600 mt-1" }, "Net Profit"),
                          createVNode("div", { class: "text-xs text-gray-500 mt-1" }, "Net profit")
                        ])
                      ]),
                      createVNode("div", { class: "bg-purple-50 rounded-lg p-4 border border-purple-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-purple-800" }, toDisplayString(getProfitMargin.value) + "%", 1),
                          createVNode("div", { class: "text-sm text-purple-600 mt-1" }, "Profit Margin"),
                          createVNode("div", { class: "text-xs text-gray-500 mt-1" }, "Profit percentage")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mt-6 bg-gray-50 rounded-lg p-4" }, [
                      createVNode("h4", { class: "text-sm font-semibold text-gray-800 mb-3" }, "Calculation Details:"),
                      createVNode("div", { class: "space-y-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600" }, "Main Invoice"),
                          createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(formatCurrency(getGrossRevenue.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600" }, "VAT"),
                          createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(formatCurrency(vatAmount.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between py-1 border-t border-b border-gray-200" }, [
                          createVNode("span", { class: "text-gray-700" }, "Total Main Invoice + VAT"),
                          createVNode("span", { class: "font-semibold text-blue-700" }, toDisplayString(formatCurrency(getGrossRevenue.value + vatAmount.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600" }, "Reimbursement"),
                          createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(formatCurrency(getReimbursementTotal.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between py-1 border-t border-b border-gray-200" }, [
                          createVNode("span", { class: "text-gray-700" }, "Total Invoice + Reimbursement"),
                          createVNode("span", { class: "font-semibold text-blue-700" }, toDisplayString(formatCurrency(getGrossRevenue.value + vatAmount.value + getReimbursementTotal.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600" }, "Operational Costs"),
                          createVNode("span", { class: "font-medium text-red-700" }, "- " + toDisplayString(formatCurrency(getOperationalCostsTotal.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between font-semibold" }, [
                          createVNode("span", { class: "text-gray-800" }, "Net Profit"),
                          createVNode("span", { class: "text-green-700" }, toDisplayString(formatCurrency(getNetProfit.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between text-sm" }, [
                          createVNode("span", { class: "text-gray-600" }, "Profit Percentage"),
                          createVNode("span", { class: "text-purple-700 font-medium" }, toDisplayString(getProfitMargin.value) + "%", 1)
                        ])
                      ])
                    ])
                  ])
                ]),
                __props.invoice.invoice_type === "combined" && getMainItems.value.length > 0 && getReimbursementItems.value.length > 0 ? (openBlock(), createBlock("div", {
                  key: 3,
                  class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"
                }, [
                  createVNode("div", { class: "px-6 py-4 bg-sage-50" }, [
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode("div", { class: "w-80 space-y-3" }, [
                        createVNode("div", { class: "text-center text-lg font-semibold text-sage-800 pb-2 border-b border-sage-300" }, " Combined Invoice Summary "),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-blue-700" }, "Total Main Items:"),
                          createVNode("span", { class: "text-sm font-medium text-blue-700" }, toDisplayString(formatCurrency(getMainTotal.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-gray-700" }, toDisplayString(vatRateLabel.value) + ":", 1),
                          createVNode("span", { class: "text-sm font-medium text-gray-700" }, toDisplayString(formatCurrency(vatAmount.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-orange-700" }, "Total Reimbursement Items:"),
                          createVNode("span", { class: "text-sm font-medium text-orange-700" }, toDisplayString(formatCurrency(getReimbursementTotal.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between pt-3 border-t border-sage-400" }, [
                          createVNode("span", { class: "text-xl font-bold text-sage-800" }, "Grand Total:"),
                          createVNode("span", { class: "text-xl font-bold text-sage-800" }, toDisplayString(formatCurrency(combinedTotalBeforeDownPayment.value)), 1)
                        ]),
                        hasDownPayment.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex justify-between text-sm text-red-700"
                        }, [
                          createVNode("span", null, "Down Payment (-):"),
                          createVNode("span", { class: "font-medium" }, "- " + toDisplayString(formatCurrency(downPaymentAmount.value)), 1)
                        ])) : createCommentVNode("", true),
                        hasDownPayment.value ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex justify-between pt-2 border-t border-sage-300"
                        }, [
                          createVNode("span", { class: "text-lg font-bold text-sage-800" }, "Total After DP:"),
                          createVNode("span", { class: "text-lg font-bold text-sage-800" }, toDisplayString(formatCurrency(combinedTotalAfterDownPayment.value)), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true)
              ]),
              showPaymentModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-black bg-opacity-50 flex itemss-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Confirm Payment"),
                  createVNode("form", {
                    onSubmit: withModifiers(confirmPayment, ["prevent"])
                  }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Amount Paid"),
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
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Payment Date"),
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
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Payment Method"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => paymentForm.payment_method = $event,
                          placeholder: "Bank transfer, cash, etc.",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, paymentForm.payment_method]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Notes (Optional)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => paymentForm.payment_notes = $event,
                          rows: "3",
                          placeholder: "Additional notes about this payment...",
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
                      }, " Cancel ", 8, ["onClick"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: processing.value,
                        class: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                      }, toDisplayString(processing.value ? "Processing..." : "Confirm Payment"), 9, ["disabled"])
                    ])
                  ], 32)
                ])
              ])) : createCommentVNode("", true),
              showMarkSentModal.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "fixed inset-0 bg-black bg-opacity-50 flex itemss-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Mark Invoice as Sent"),
                  createVNode("p", { class: "text-gray-600 mb-6" }, "Are you sure you want to mark this invoice as sent to the customer? "),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: ($event) => showMarkSentModal.value = false,
                      class: "px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    }, " Cancel ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: markAsSent,
                      class: "px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    }, " Yes, Mark as Sent ")
                  ])
                ])
              ])) : createCommentVNode("", true),
              showReimbursementPaymentModal.value ? (openBlock(), createBlock("div", {
                key: 2,
                class: "fixed inset-0 bg-black bg-opacity-50 flex itemss-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-orange-800 mb-4" }, "Update Reimbursement Status"),
                  selectedReimbursementEntry.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-4 text-sm text-gray-600"
                  }, [
                    createVNode("div", { class: "font-medium text-gray-800" }, toDisplayString(selectedReimbursementEntry.value.description), 1),
                    createVNode("div", null, "Amount: " + toDisplayString(formatCurrency(
                      selectedReimbursementEntry.value.amount,
                      selectedReimbursementEntry.value.currency || "IDR"
                    )), 1)
                  ])) : createCommentVNode("", true),
                  createVNode("form", {
                    onSubmit: withModifiers(submitReimbursementPayment, ["prevent"])
                  }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Status"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(reimbursementPaymentForm).status = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                        }, [
                          createVNode("option", { value: "paid" }, "Paid"),
                          createVNode("option", { value: "invoiced" }, "Unpaid")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(reimbursementPaymentForm).status]
                        ])
                      ]),
                      unref(reimbursementPaymentForm).status === "paid" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-1 md:grid-cols-2 gap-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Vendor / Payer"),
                          withDirectives(createVNode("input", {
                            type: "text",
                            "onUpdate:modelValue": ($event) => unref(reimbursementPaymentForm).vendor_name = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                            placeholder: "Eshaka Wijaya Logistics",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(reimbursementPaymentForm).vendor_name]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Payment Date"),
                          withDirectives(createVNode("input", {
                            type: "date",
                            "onUpdate:modelValue": ($event) => unref(reimbursementPaymentForm).paid_at = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(reimbursementPaymentForm).paid_at]
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Notes (Optional)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(reimbursementPaymentForm).notes = $event,
                          rows: "3",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                          placeholder: "Example: Paid via the company BCA account"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(reimbursementPaymentForm).notes]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3 mt-6" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: closeReimbursementPaymentModal,
                        class: "px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      }, " Cancel "),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(reimbursementPaymentForm).processing,
                        class: "px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                      }, toDisplayString(unref(reimbursementPaymentForm).processing ? "Saving..." : "Save Changes"), 9, ["disabled"])
                    ])
                  ], 32)
                ])
              ])) : createCommentVNode("", true),
              showProfitLossModal.value ? (openBlock(), createBlock("div", {
                key: 3,
                class: "fixed inset-0 bg-black bg-opacity-50 flex itemss-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-2xl mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-purple-800 mb-4" }, "Post Invoice to Profit & Loss"),
                  createVNode("div", { class: "bg-purple-50 rounded-lg p-4 mb-6 border border-purple-200" }, [
                    createVNode("h4", { class: "text-sm font-semibold text-purple-800 mb-3" }, "Invoice Summary:"),
                    createVNode("div", { class: "grid grid-cols-2 gap-4 text-sm" }, [
                      createVNode("div", null, [
                        createVNode("span", { class: "text-gray-600" }, "Invoice Number:"),
                        createVNode("span", { class: "font-medium text-purple-800 ml-2" }, toDisplayString(__props.invoice.invoice_number), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "text-gray-600" }, "Customer:"),
                        createVNode("span", { class: "font-medium text-purple-800 ml-2" }, toDisplayString((_l = __props.invoice.customer) == null ? void 0 : _l.company_name), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "text-gray-600" }, "Gross Revenue:"),
                        createVNode("span", { class: "font-medium text-green-700 ml-2" }, toDisplayString(formatCurrency(getGrossRevenue.value)), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("span", { class: "text-gray-600" }, "Operational Costs:"),
                        createVNode("span", { class: "font-medium text-red-700 ml-2" }, toDisplayString(formatCurrency(getOperationalCostsTotal.value)), 1)
                      ]),
                      createVNode("div", { class: "col-span-2 pt-2 border-t border-purple-200" }, [
                        createVNode("span", { class: "text-gray-600" }, "Net Profit:"),
                        createVNode("span", { class: "font-bold text-blue-700 ml-2" }, toDisplayString(formatCurrency(getNetProfit.value)), 1)
                      ])
                    ])
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submitProfitLossPosting, ["prevent"])
                  }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, [
                          createTextVNode(" Profit & Loss Period "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => profitLossForm.period_id = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500",
                          required: ""
                        }, [
                          createVNode("option", { value: "" }, "Select period..."),
                          (openBlock(true), createBlock(Fragment, null, renderList(profitLossPeriods.value, (period) => {
                            return openBlock(), createBlock("option", {
                              key: period.id,
                              value: period.id
                            }, toDisplayString(formatPeriodLabel(period)), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, profitLossForm.period_id]
                        ]),
                        createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Select the profit & loss period where this transaction will be recorded. ")
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Notes (Optional)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => profitLossForm.notes = $event,
                          rows: "3",
                          placeholder: "Additional notes for profit & loss posting...",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, profitLossForm.notes]
                        ])
                      ]),
                      createVNode("div", { class: "bg-blue-50 border border-blue-200 rounded-lg p-4" }, [
                        createVNode("div", { class: "flex itemss-start" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5 text-blue-500 mt-0.5 mr-3",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ])),
                          createVNode("div", { class: "text-sm" }, [
                            createVNode("p", { class: "text-blue-800 font-medium mb-1" }, "Items to be posted:"),
                            createVNode("ul", { class: "text-blue-700 space-y-1" }, [
                              getGrossRevenue.value > 0 ? (openBlock(), createBlock("li", { key: 0 }, "Revenue: " + toDisplayString(formatCurrency(getGrossRevenue.value)), 1)) : createCommentVNode("", true),
                              getOperationalCostsTotal.value > 0 ? (openBlock(), createBlock("li", { key: 1 }, "Operational Costs: " + toDisplayString(formatCurrency(getOperationalCostsTotal.value)), 1)) : createCommentVNode("", true),
                              createVNode("li", null, "Net Profit Impact: " + toDisplayString(formatCurrency(getNetProfit.value)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3 mt-6" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => showProfitLossModal.value = false,
                        class: "px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      }, " Cancel ", 8, ["onClick"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: processing.value || !profitLossForm.period_id,
                        class: "px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                      }, toDisplayString(processing.value ? "Processing..." : "Post to Profit & Loss"), 9, ["disabled"])
                    ])
                  ], 32)
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
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b958f5e4"]]);
export {
  Show as default
};
