import { reactive, computed, ref, onMounted, onBeforeUnmount, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, withDirectives, vModelText, vModelSelect, openBlock, Fragment, renderList, Teleport, Transition, createTextVNode, nextTick, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderStyle, ssrRenderClass, ssrRenderTeleport } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BXHi-kqO.js";
import { CreditCard, AlertTriangle, Users, Building2 } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const POPOVER_WIDTH = 288;
const POPOVER_MARGIN = 16;
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
    const summarizeList = (items = []) => {
      const filtered = items.filter(Boolean);
      if (filtered.length === 0) {
        return "";
      }
      if (filtered.length <= 2) {
        return filtered.join(", ");
      }
      return `${filtered.slice(0, 2).join(", ")} +${filtered.length - 2} others`;
    };
    const summarizeNames = (names = []) => {
      const uniqueNames = [...new Set(names.filter(Boolean))];
      return summarizeList(uniqueNames);
    };
    const vendorSummaryRows = computed(() => {
      const summary = Array.isArray(props.vendorSummary) ? props.vendorSummary : [];
      if (summary.length === 0) {
        return [];
      }
      const groups = /* @__PURE__ */ new Map();
      summary.forEach((item) => {
        if (!item) {
          return;
        }
        const vendorId = item.vendor_id ?? null;
        const vendorName = item.vendor_name || "Internal";
        const key = vendorId !== null ? `id_${vendorId}` : `name_${vendorName}`;
        if (!groups.has(key)) {
          groups.set(key, {
            key,
            vendor_id: vendorId,
            vendor_name: vendorName,
            total_amount: 0,
            total_paid: 0,
            total_outstanding: 0,
            count_invoices: 0,
            count_overdue: 0
          });
        }
        const aggregated = groups.get(key);
        aggregated.total_amount += Number(item.total_amount || 0);
        aggregated.total_paid += Number(item.total_paid || 0);
        aggregated.total_outstanding += Number(item.total_outstanding || 0);
        aggregated.count_invoices += Number(item.count_invoices || 0);
        aggregated.count_overdue += Number(item.count_overdue || 0);
      });
      return Array.from(groups.values());
    });
    const activeVendorPopover = ref(null);
    const vendorSummaryContainer = ref(null);
    const vendorPopoverElement = ref(null);
    const popoverPosition = reactive({
      top: 0,
      left: 0
    });
    let hidePopoverTimeout = null;
    const cancelVendorPopoverHide = () => {
      if (hidePopoverTimeout) {
        clearTimeout(hidePopoverTimeout);
        hidePopoverTimeout = null;
      }
    };
    const updatePopoverPosition = () => {
      if (!activeVendorPopover.value || typeof window === "undefined") {
        return;
      }
      const triggerEl = document.querySelector(`[data-vendor-popover-trigger-key="${activeVendorPopover.value.key}"]`);
      if (!triggerEl) {
        return;
      }
      const rect = triggerEl.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const center = rect.left + scrollX + rect.width / 2;
      const viewportWidth = window.innerWidth;
      const minCenter = scrollX + POPOVER_MARGIN + POPOVER_WIDTH / 2;
      const maxCenter = scrollX + viewportWidth - POPOVER_MARGIN - POPOVER_WIDTH / 2;
      popoverPosition.left = Math.max(minCenter, Math.min(maxCenter, center));
      popoverPosition.top = rect.bottom + scrollY + 12;
    };
    const scheduleHideVendorSummaryPopover = () => {
      cancelVendorPopoverHide();
      hidePopoverTimeout = setTimeout(() => {
        activeVendorPopover.value = null;
      }, 120);
    };
    const showVendorSummaryPopover = (vendor) => {
      cancelVendorPopoverHide();
      activeVendorPopover.value = vendor ?? null;
      nextTick(() => updatePopoverPosition());
    };
    const toggleVendorSummaryPopover = (vendor) => {
      var _a;
      if (((_a = activeVendorPopover.value) == null ? void 0 : _a.key) === vendor.key) {
        activeVendorPopover.value = null;
      } else {
        showVendorSummaryPopover(vendor);
      }
    };
    const goToVendorSummaryDetail = (vendor = activeVendorPopover.value) => {
      if (!vendor) return;
      const params = {
        search: vendor.vendor_id ? "" : vendor.vendor_name || "",
        status: searchForm.status,
        vendor_id: vendor.vendor_id ?? "",
        date_from: searchForm.date_from,
        date_to: searchForm.date_to
      };
      searchForm.vendor_id = params.vendor_id;
      searchForm.search = params.search;
      router.get(route("admin-keuangan.account-payables.index"), params, {
        preserveState: true,
        replace: true
      });
      activeVendorPopover.value = null;
    };
    const handleDocumentClick = (event) => {
      var _a;
      if (!activeVendorPopover.value) return;
      const trigger = event.target.closest('[data-vendor-popover-trigger="true"]');
      if (trigger && trigger.getAttribute("data-vendor-popover-trigger-key") === activeVendorPopover.value.key) {
        return;
      }
      if ((_a = vendorPopoverElement.value) == null ? void 0 : _a.contains(event.target)) {
        return;
      }
      activeVendorPopover.value = null;
    };
    const handleViewportChange = () => {
      if (activeVendorPopover.value) {
        updatePopoverPosition();
      }
    };
    onMounted(() => {
      if (typeof window !== "undefined") {
        document.addEventListener("click", handleDocumentClick, true);
        window.addEventListener("scroll", handleViewportChange, true);
        window.addEventListener("resize", handleViewportChange);
      }
      if (vendorSummaryContainer.value) {
        vendorSummaryContainer.value.addEventListener("scroll", handleViewportChange);
      }
    });
    onBeforeUnmount(() => {
      cancelVendorPopoverHide();
      if (typeof window !== "undefined") {
        document.removeEventListener("click", handleDocumentClick, true);
        window.removeEventListener("scroll", handleViewportChange, true);
        window.removeEventListener("resize", handleViewportChange);
      }
      if (vendorSummaryContainer.value) {
        vendorSummaryContainer.value.removeEventListener("scroll", handleViewportChange);
      }
    });
    const calculateDaysOverdue = (dueDate, status) => {
      if (!dueDate || status === "paid") {
        return 0;
      }
      const parsedDate = new Date(dueDate);
      if (Number.isNaN(parsedDate.getTime())) {
        return 0;
      }
      const diff = Math.floor((Date.now() - parsedDate.getTime()) / (1e3 * 60 * 60 * 24));
      return diff > 0 ? diff : 0;
    };
    const tableRows = computed(() => {
      var _a;
      const data = ((_a = props.payables) == null ? void 0 : _a.data) || [];
      return data.map((group, index) => {
        var _a2, _b, _c;
        const payables = Array.isArray(group.account_payables) ? group.account_payables : [];
        const vendorSummary = Array.isArray(group.vendor_summary) ? group.vendor_summary : [];
        const invoiceNumbers = Array.isArray(group.invoice_numbers) ? group.invoice_numbers : [];
        const salesOrder = group.sales_order || null;
        const firstPayable = payables[0] || {};
        const dueDate = group.due_date || firstPayable.payment_due_date || null;
        const status = group.status || "unpaid";
        const vendorNames = vendorSummary.length ? vendorSummary.map((entry) => entry.vendor_name) : payables.map((current) => {
          var _a3;
          return ((_a3 = current.vendor) == null ? void 0 : _a3.nama_vendor) || current.vendor_name;
        });
        const openingPayable = payables.find((current) => current.is_opening);
        const isOpening = payables.some((current) => current.is_opening);
        const fallbackKey = (salesOrder == null ? void 0 : salesOrder.id) ? `sales-order-${salesOrder.id}` : firstPayable.id ? `payable-${firstPayable.id}` : `group-${index}`;
        return {
          key: group.group_key || fallbackKey,
          groupType: group.group_type || "sales_order",
          salesOrder,
          accountPayables: payables,
          primaryPayableId: firstPayable.id || null,
          vendorSummary,
          vendorSummaryLabel: summarizeNames(vendorNames),
          invoiceSummary: summarizeList(
            invoiceNumbers.length ? invoiceNumbers : payables.map((current) => current.vendor_invoice_number)
          ),
          vendorInvoiceDate: group.latest_vendor_invoice_date || firstPayable.vendor_invoice_date || null,
          isOpening,
          sourceSoNumber: (openingPayable == null ? void 0 : openingPayable.source_so_number) || null,
          openingPaymentDate: (openingPayable == null ? void 0 : openingPayable.opening_payment_date) || null,
          openingType: (openingPayable == null ? void 0 : openingPayable.opening_type) || null,
          serviceDescription: group.service_description || firstPayable.service_description || "",
          serviceRemarks: group.service_remarks || firstPayable.service_remarks || "",
          amount: Number(((_a2 = group.totals) == null ? void 0 : _a2.amount) ?? 0),
          paidAmount: Number(((_b = group.totals) == null ? void 0 : _b.paid) ?? 0),
          outstanding: Number(((_c = group.totals) == null ? void 0 : _c.outstanding) ?? 0),
          status,
          dueDate,
          daysOverdue: calculateDaysOverdue(dueDate, status)
        };
      });
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
        preserveState: false,
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
    const openingTypeLabel = (type) => {
      if (type === "reimbursement") {
        return "Opening Balance - Reimbursement";
      }
      return "Opening Balance - Main";
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
    const showPayable = (row) => {
      if (!row.primaryPayableId) {
        return;
      }
      router.visit(route("admin-keuangan.account-payables.show", {
        accountPayable: row.primaryPayableId
      }));
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
            _push2(ssrRenderComponent(unref(Head), { title: "Accounts Payable" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6" data-v-398e24e1${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-398e24e1${_scopeId}><div class="flex justify-between items-center mb-6" data-v-398e24e1${_scopeId}><div data-v-398e24e1${_scopeId}><h1 class="text-2xl font-bold text-gray-900" data-v-398e24e1${_scopeId}>Accounts Payable</h1><p class="mt-1 text-sm text-gray-600" data-v-398e24e1${_scopeId}>Manage payables and vendor payments</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" data-v-398e24e1${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg" data-v-398e24e1${_scopeId}><div class="p-5" data-v-398e24e1${_scopeId}><div class="flex items-center" data-v-398e24e1${_scopeId}><div class="flex-shrink-0" data-v-398e24e1${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CreditCard), { class: "h-6 w-6 text-red-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-398e24e1${_scopeId}><dl data-v-398e24e1${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-398e24e1${_scopeId}>Total Outstanding</dt><dd class="text-lg font-medium text-gray-900" data-v-398e24e1${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_outstanding))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-398e24e1${_scopeId}><div class="p-5" data-v-398e24e1${_scopeId}><div class="flex items-center" data-v-398e24e1${_scopeId}><div class="flex-shrink-0" data-v-398e24e1${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-6 w-6 text-orange-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-398e24e1${_scopeId}><dl data-v-398e24e1${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-398e24e1${_scopeId}>Total Overdue</dt><dd class="text-lg font-medium text-orange-600" data-v-398e24e1${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_overdue))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-398e24e1${_scopeId}><div class="p-5" data-v-398e24e1${_scopeId}><div class="flex items-center" data-v-398e24e1${_scopeId}><div class="flex-shrink-0" data-v-398e24e1${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "h-6 w-6 text-yellow-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-398e24e1${_scopeId}><dl data-v-398e24e1${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-398e24e1${_scopeId}>Overdue Count</dt><dd class="text-lg font-medium text-gray-900" data-v-398e24e1${_scopeId}>${ssrInterpolate(__props.summary.count_overdue)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-398e24e1${_scopeId}><div class="p-5" data-v-398e24e1${_scopeId}><div class="flex items-center" data-v-398e24e1${_scopeId}><div class="flex-shrink-0" data-v-398e24e1${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Building2), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-398e24e1${_scopeId}><dl data-v-398e24e1${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-398e24e1${_scopeId}>Unpaid Active</dt><dd class="text-lg font-medium text-gray-900" data-v-398e24e1${_scopeId}>${ssrInterpolate(__props.summary.count_unpaid)}</dd></dl></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-398e24e1${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-398e24e1${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-398e24e1${_scopeId}>Filters</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" data-v-398e24e1${_scopeId}><div data-v-398e24e1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-398e24e1${_scopeId}>Search</label><input${ssrRenderAttr("value", searchForm.search)} type="text" placeholder="Search vendors or services..." class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-398e24e1${_scopeId}></div><div data-v-398e24e1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-398e24e1${_scopeId}>Status</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-398e24e1${_scopeId}><option value="" data-v-398e24e1${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "") : ssrLooseEqual(searchForm.status, "")) ? " selected" : ""}${_scopeId}>All Statuses</option><option value="unpaid" data-v-398e24e1${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "unpaid") : ssrLooseEqual(searchForm.status, "unpaid")) ? " selected" : ""}${_scopeId}>Unpaid</option><option value="partial" data-v-398e24e1${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "partial") : ssrLooseEqual(searchForm.status, "partial")) ? " selected" : ""}${_scopeId}>Partial</option><option value="paid" data-v-398e24e1${ssrIncludeBooleanAttr(Array.isArray(searchForm.status) ? ssrLooseContain(searchForm.status, "paid") : ssrLooseEqual(searchForm.status, "paid")) ? " selected" : ""}${_scopeId}>Paid</option></select></div><div data-v-398e24e1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-398e24e1${_scopeId}>Vendor</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-398e24e1${_scopeId}><option value="" data-v-398e24e1${ssrIncludeBooleanAttr(Array.isArray(searchForm.vendor_id) ? ssrLooseContain(searchForm.vendor_id, "") : ssrLooseEqual(searchForm.vendor_id, "")) ? " selected" : ""}${_scopeId}>All Vendors</option><!--[-->`);
            ssrRenderList(__props.vendors, (vendor) => {
              _push2(`<option${ssrRenderAttr("value", vendor.id)} data-v-398e24e1${ssrIncludeBooleanAttr(Array.isArray(searchForm.vendor_id) ? ssrLooseContain(searchForm.vendor_id, vendor.id) : ssrLooseEqual(searchForm.vendor_id, vendor.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendor.nama_vendor)}</option>`);
            });
            _push2(`<!--]--></select></div><div data-v-398e24e1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-398e24e1${_scopeId}>From Date</label><input${ssrRenderAttr("value", searchForm.date_from)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-398e24e1${_scopeId}></div><div data-v-398e24e1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-398e24e1${_scopeId}>To Date</label><input${ssrRenderAttr("value", searchForm.date_to)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500" data-v-398e24e1${_scopeId}></div></div></div></div>`);
            if (vendorSummaryRows.value.length > 0) {
              _push2(`<div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-398e24e1${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-398e24e1${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-398e24e1${_scopeId}>Vendor Summary</h3><div class="overflow-x-auto" style="${ssrRenderStyle({ "overflow-x": "auto" })}" data-v-398e24e1${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-398e24e1${_scopeId}><thead class="bg-gray-50" data-v-398e24e1${_scopeId}><tr data-v-398e24e1${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}>Vendor</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}>Total Amount</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}>Total Paid</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}>Total Outstanding</th><th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}>Invoice Count</th><th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}>Overdue</th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-398e24e1${_scopeId}><!--[-->`);
              ssrRenderList(vendorSummaryRows.value, (vendor) => {
                _push2(`<tr class="hover:bg-gray-50" data-v-398e24e1${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-398e24e1${_scopeId}><div class="inline-flex items-center space-x-1 text-sm font-medium text-gray-900 cursor-pointer select-none" data-vendor-popover-trigger="true"${ssrRenderAttr("data-vendor-popover-trigger-key", vendor.key)} tabindex="0" data-v-398e24e1${_scopeId}><span data-v-398e24e1${_scopeId}>${ssrInterpolate(vendor.vendor_name)}</span><svg class="w-4 h-4 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-398e24e1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 18a6 6 0 100-12 6 6 0 000 12z" data-v-398e24e1${_scopeId}></path></svg></div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" data-v-398e24e1${_scopeId}> Rp ${ssrInterpolate(formatNumber(vendor.total_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-green-600" data-v-398e24e1${_scopeId}> Rp ${ssrInterpolate(formatNumber(vendor.total_paid))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" data-v-398e24e1${_scopeId}><span class="${ssrRenderClass(vendor.total_outstanding > 0 ? "text-red-600" : "text-green-600")}" data-v-398e24e1${_scopeId}> Rp ${ssrInterpolate(formatNumber(vendor.total_outstanding))}</span></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-900" data-v-398e24e1${_scopeId}>${ssrInterpolate(vendor.count_invoices)}</td><td class="px-6 py-4 whitespace-nowrap text-center text-sm" data-v-398e24e1${_scopeId}>`);
                if (vendor.count_overdue > 0) {
                  _push2(`<span class="text-red-600 font-medium" data-v-398e24e1${_scopeId}>${ssrInterpolate(vendor.count_overdue)}</span>`);
                } else {
                  _push2(`<span class="text-gray-400" data-v-398e24e1${_scopeId}>0</span>`);
                }
                _push2(`</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div>`);
              ssrRenderTeleport(_push2, (_push3) => {
                if (activeVendorPopover.value) {
                  _push3(`<div class="absolute z-50 w-72 rounded-lg border border-sage-200 bg-white shadow-xl p-4" style="${ssrRenderStyle({ top: popoverPosition.top + "px", left: popoverPosition.left + "px", transform: "translateX(-50%)" })}" data-v-398e24e1${_scopeId}><div class="flex items-start justify-between" data-v-398e24e1${_scopeId}><div data-v-398e24e1${_scopeId}><h4 class="text-sm font-semibold text-gray-900" data-v-398e24e1${_scopeId}>${ssrInterpolate(activeVendorPopover.value.vendor_name)}</h4><p class="text-xs text-gray-500" data-v-398e24e1${_scopeId}> Summary for outstanding payables </p></div><span class="${ssrRenderClass([activeVendorPopover.value.total_outstanding > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700", "px-2 py-0.5 text-xs font-medium rounded-full"])}" data-v-398e24e1${_scopeId}>${ssrInterpolate(activeVendorPopover.value.total_outstanding > 0 ? "Outstanding" : "Cleared")}</span></div><div class="mt-3 space-y-2 text-sm" data-v-398e24e1${_scopeId}><div class="flex justify-between" data-v-398e24e1${_scopeId}><span class="text-gray-600" data-v-398e24e1${_scopeId}>Total Amount</span><span class="font-medium text-gray-900" data-v-398e24e1${_scopeId}>${ssrInterpolate(formatCurrency(activeVendorPopover.value.total_amount))}</span></div><div class="flex justify-between" data-v-398e24e1${_scopeId}><span class="text-gray-600" data-v-398e24e1${_scopeId}>Total Paid</span><span class="font-medium text-green-600" data-v-398e24e1${_scopeId}>${ssrInterpolate(formatCurrency(activeVendorPopover.value.total_paid))}</span></div><div class="flex justify-between" data-v-398e24e1${_scopeId}><span class="text-gray-600" data-v-398e24e1${_scopeId}>Outstanding</span><span class="${ssrRenderClass(activeVendorPopover.value.total_outstanding > 0 ? "font-medium text-red-600" : "font-medium text-green-600")}" data-v-398e24e1${_scopeId}>${ssrInterpolate(formatCurrency(activeVendorPopover.value.total_outstanding))}</span></div><div class="flex justify-between" data-v-398e24e1${_scopeId}><span class="text-gray-600" data-v-398e24e1${_scopeId}>Invoices</span><span class="font-medium text-gray-900" data-v-398e24e1${_scopeId}>${ssrInterpolate(activeVendorPopover.value.count_invoices)}</span></div><div class="flex justify-between" data-v-398e24e1${_scopeId}><span class="text-gray-600" data-v-398e24e1${_scopeId}>Overdue</span><span class="${ssrRenderClass(activeVendorPopover.value.count_overdue > 0 ? "font-medium text-red-600" : "font-medium text-gray-500")}" data-v-398e24e1${_scopeId}>${ssrInterpolate(activeVendorPopover.value.count_overdue)}</span></div></div><div class="mt-4" data-v-398e24e1${_scopeId}><button type="button" class="w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 rounded-md transition" data-v-398e24e1${_scopeId}> View Details </button></div></div>`);
                } else {
                  _push3(`<!---->`);
                }
              }, "body", false, _parent2);
              _push2(`<div class="bg-white rounded-lg shadow-sm overflow-hidden" data-v-398e24e1${_scopeId}><div class="overflow-x-auto" data-v-398e24e1${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-398e24e1${_scopeId}><thead class="bg-gray-50" data-v-398e24e1${_scopeId}><tr data-v-398e24e1${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}> Sales Order </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}> Vendor / Service </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}> Invoice </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}> Amount </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}> Paid </th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}> Outstanding </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}> Status </th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-398e24e1${_scopeId}> Actions </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-398e24e1${_scopeId}><!--[-->`);
              ssrRenderList(tableRows.value, (row) => {
                var _a, _b, _c, _d, _e;
                _push2(`<tr class="hover:bg-gray-50" data-v-398e24e1${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-398e24e1${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-398e24e1${_scopeId}>${ssrInterpolate(((_a = row.salesOrder) == null ? void 0 : _a.order_number) || row.sourceSoNumber || "No Sales Order")}</div>`);
                if (row.isOpening) {
                  _push2(`<div class="mt-1 inline-flex items-center rounded-full bg-sage-100 px-2 py-0.5 text-xs font-semibold text-sage-700" data-v-398e24e1${_scopeId}>${ssrInterpolate(openingTypeLabel(row.openingType))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="text-sm text-gray-600" data-v-398e24e1${_scopeId}>${ssrInterpolate(((_b = row.salesOrder) == null ? void 0 : _b.customer) || "-")}</div><div class="text-sm text-gray-500" data-v-398e24e1${_scopeId}>${ssrInterpolate(((_c = row.salesOrder) == null ? void 0 : _c.shipper) || "-")}</div><div class="text-xs text-gray-500 mt-1" data-v-398e24e1${_scopeId}> Release: ${ssrInterpolate(((_d = row.salesOrder) == null ? void 0 : _d.released_at) ? formatDate(row.salesOrder.released_at) : "-")}</div></td><td class="px-6 py-4" data-v-398e24e1${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-398e24e1${_scopeId}>${ssrInterpolate(row.vendorSummaryLabel || "-")}</div>`);
                if (row.serviceDescription) {
                  _push2(`<div class="text-sm text-gray-600" data-v-398e24e1${_scopeId}>${ssrInterpolate(row.serviceDescription)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                if (row.serviceRemarks) {
                  _push2(`<div class="text-sm text-gray-500" data-v-398e24e1${_scopeId}>${ssrInterpolate(row.serviceRemarks.substring(0, 50))}${ssrInterpolate(row.serviceRemarks.length > 50 ? "..." : "")}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td><td class="px-6 py-4 whitespace-nowrap" data-v-398e24e1${_scopeId}><div class="text-sm text-gray-900" data-v-398e24e1${_scopeId}><div data-v-398e24e1${_scopeId}> Invoice: ${ssrInterpolate(row.invoiceSummary || "-")}</div>`);
                if ((_e = row.salesOrder) == null ? void 0 : _e.order_number) {
                  _push2(`<div data-v-398e24e1${_scopeId}> SO: ${ssrInterpolate(row.salesOrder.order_number)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="text-sm text-gray-500" data-v-398e24e1${_scopeId}>${ssrInterpolate(row.vendorInvoiceDate ? formatDate(row.vendorInvoiceDate) : "-")}</div>`);
                if (row.isOpening && row.openingPaymentDate) {
                  _push2(`<div class="text-xs text-gray-500" data-v-398e24e1${_scopeId}> Opening Payment: ${ssrInterpolate(formatDate(row.openingPaymentDate))}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" data-v-398e24e1${_scopeId}> Rp ${ssrInterpolate(formatNumber(row.amount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" data-v-398e24e1${_scopeId}> Rp ${ssrInterpolate(formatNumber(row.paidAmount))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" data-v-398e24e1${_scopeId}> Rp ${ssrInterpolate(formatNumber(row.outstanding))}</td><td class="px-6 py-4 whitespace-nowrap text-center" data-v-398e24e1${_scopeId}><span class="${ssrRenderClass([getStatusClass(row.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-398e24e1${_scopeId}>${ssrInterpolate(getStatusText(row.status))} `);
                if (row.daysOverdue > 0) {
                  _push2(`<span class="ml-1" data-v-398e24e1${_scopeId}> (${ssrInterpolate(row.daysOverdue)} days) </span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</span></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium" data-v-398e24e1${_scopeId}><button class="inline-flex items-center px-3 py-2 border border-blue-200 rounded-md text-blue-600 hover:text-blue-900 hover:border-blue-400 disabled:text-gray-400 disabled:border-gray-200"${ssrIncludeBooleanAttr(!row.primaryPayableId) ? " disabled" : ""} data-v-398e24e1${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-398e24e1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-398e24e1${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-398e24e1${_scopeId}></path></svg> Details </button></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div><div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6" data-v-398e24e1${_scopeId}><div class="flex items-center justify-between" data-v-398e24e1${_scopeId}><div class="text-sm text-gray-700" data-v-398e24e1${_scopeId}> Showing ${ssrInterpolate(__props.payables.from || 0)} to ${ssrInterpolate(__props.payables.to || 0)} of ${ssrInterpolate(__props.payables.total || 0)} results </div><div class="flex space-x-1" data-v-398e24e1${_scopeId}><!--[-->`);
              ssrRenderList(__props.payables.links, (link) => {
                _push2(`<!--[-->`);
                if (link.url) {
                  _push2(`<button class="${ssrRenderClass([
                    "px-3 py-2 text-sm rounded-md",
                    link.active ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:text-gray-700 border border-gray-300"
                  ])}" data-v-398e24e1${_scopeId}>${link.label ?? ""}</button>`);
                } else {
                  _push2(`<span class="px-3 py-2 text-sm text-gray-400" data-v-398e24e1${_scopeId}>${link.label ?? ""}</span>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Accounts Payable" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Accounts Payable"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Manage payables and vendor payments")
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
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Overdue Count"),
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
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Filters"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Search"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => searchForm.search = $event,
                            type: "text",
                            placeholder: "Search vendors or services...",
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
                            createVNode("option", { value: "" }, "All Statuses"),
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
                            createVNode("option", { value: "" }, "All Vendors"),
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
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "From Date"),
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
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "To Date"),
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
                  vendorSummaryRows.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-white shadow overflow-hidden sm:rounded-md mb-6"
                  }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Vendor Summary"),
                      createVNode("div", {
                        ref_key: "vendorSummaryContainer",
                        ref: vendorSummaryContainer,
                        class: "overflow-x-auto",
                        style: { "overflow-x": "auto" }
                      }, [
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
                              }, "Invoice Count"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Overdue")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(vendorSummaryRows.value, (vendor) => {
                              return openBlock(), createBlock("tr", {
                                key: vendor.key,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", {
                                    class: "inline-flex items-center space-x-1 text-sm font-medium text-gray-900 cursor-pointer select-none",
                                    "data-vendor-popover-trigger": "true",
                                    "data-vendor-popover-trigger-key": vendor.key,
                                    onMouseenter: ($event) => showVendorSummaryPopover(vendor),
                                    onMouseleave: scheduleHideVendorSummaryPopover,
                                    onFocus: ($event) => showVendorSummaryPopover(vendor),
                                    onBlur: scheduleHideVendorSummaryPopover,
                                    onClick: ($event) => toggleVendorSummaryPopover(vendor),
                                    tabindex: "0"
                                  }, [
                                    createVNode("span", null, toDisplayString(vendor.vendor_name), 1),
                                    (openBlock(), createBlock("svg", {
                                      class: "w-4 h-4 text-sage-500",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M13 16h-1v-4h-1m1-4h.01M12 18a6 6 0 100-12 6 6 0 000 12z"
                                      })
                                    ]))
                                  ], 40, ["data-vendor-popover-trigger-key", "onMouseenter", "onFocus", "onClick"])
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
                      ], 512)
                    ]),
                    (openBlock(), createBlock(Teleport, { to: "body" }, [
                      createVNode(Transition, { name: "fade" }, {
                        default: withCtx(() => [
                          activeVendorPopover.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            ref_key: "vendorPopoverElement",
                            ref: vendorPopoverElement,
                            class: "absolute z-50 w-72 rounded-lg border border-sage-200 bg-white shadow-xl p-4",
                            style: { top: popoverPosition.top + "px", left: popoverPosition.left + "px", transform: "translateX(-50%)" },
                            onMouseenter: cancelVendorPopoverHide,
                            onMouseleave: scheduleHideVendorSummaryPopover
                          }, [
                            createVNode("div", { class: "flex items-start justify-between" }, [
                              createVNode("div", null, [
                                createVNode("h4", { class: "text-sm font-semibold text-gray-900" }, toDisplayString(activeVendorPopover.value.vendor_name), 1),
                                createVNode("p", { class: "text-xs text-gray-500" }, " Summary for outstanding payables ")
                              ]),
                              createVNode("span", {
                                class: ["px-2 py-0.5 text-xs font-medium rounded-full", activeVendorPopover.value.total_outstanding > 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"]
                              }, toDisplayString(activeVendorPopover.value.total_outstanding > 0 ? "Outstanding" : "Cleared"), 3)
                            ]),
                            createVNode("div", { class: "mt-3 space-y-2 text-sm" }, [
                              createVNode("div", { class: "flex justify-between" }, [
                                createVNode("span", { class: "text-gray-600" }, "Total Amount"),
                                createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(formatCurrency(activeVendorPopover.value.total_amount)), 1)
                              ]),
                              createVNode("div", { class: "flex justify-between" }, [
                                createVNode("span", { class: "text-gray-600" }, "Total Paid"),
                                createVNode("span", { class: "font-medium text-green-600" }, toDisplayString(formatCurrency(activeVendorPopover.value.total_paid)), 1)
                              ]),
                              createVNode("div", { class: "flex justify-between" }, [
                                createVNode("span", { class: "text-gray-600" }, "Outstanding"),
                                createVNode("span", {
                                  class: activeVendorPopover.value.total_outstanding > 0 ? "font-medium text-red-600" : "font-medium text-green-600"
                                }, toDisplayString(formatCurrency(activeVendorPopover.value.total_outstanding)), 3)
                              ]),
                              createVNode("div", { class: "flex justify-between" }, [
                                createVNode("span", { class: "text-gray-600" }, "Invoices"),
                                createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(activeVendorPopover.value.count_invoices), 1)
                              ]),
                              createVNode("div", { class: "flex justify-between" }, [
                                createVNode("span", { class: "text-gray-600" }, "Overdue"),
                                createVNode("span", {
                                  class: activeVendorPopover.value.count_overdue > 0 ? "font-medium text-red-600" : "font-medium text-gray-500"
                                }, toDisplayString(activeVendorPopover.value.count_overdue), 3)
                              ])
                            ]),
                            createVNode("div", { class: "mt-4" }, [
                              createVNode("button", {
                                type: "button",
                                class: "w-full inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 rounded-md transition",
                                onClick: ($event) => goToVendorSummaryDetail()
                              }, " View Details ", 8, ["onClick"])
                            ])
                          ], 36)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      })
                    ])),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm overflow-hidden" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Sales Order "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Vendor / Service "),
                              createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Invoice "),
                              createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Amount "),
                              createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Paid "),
                              createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Outstanding "),
                              createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status "),
                              createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Actions ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(tableRows.value, (row) => {
                              var _a, _b, _c, _d, _e;
                              return openBlock(), createBlock("tr", {
                                key: row.key,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(((_a = row.salesOrder) == null ? void 0 : _a.order_number) || row.sourceSoNumber || "No Sales Order"), 1),
                                  row.isOpening ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mt-1 inline-flex items-center rounded-full bg-sage-100 px-2 py-0.5 text-xs font-semibold text-sage-700"
                                  }, toDisplayString(openingTypeLabel(row.openingType)), 1)) : createCommentVNode("", true),
                                  createVNode("div", { class: "text-sm text-gray-600" }, toDisplayString(((_b = row.salesOrder) == null ? void 0 : _b.customer) || "-"), 1),
                                  createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(((_c = row.salesOrder) == null ? void 0 : _c.shipper) || "-"), 1),
                                  createVNode("div", { class: "text-xs text-gray-500 mt-1" }, " Release: " + toDisplayString(((_d = row.salesOrder) == null ? void 0 : _d.released_at) ? formatDate(row.salesOrder.released_at) : "-"), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(row.vendorSummaryLabel || "-"), 1),
                                  row.serviceDescription ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-sm text-gray-600"
                                  }, toDisplayString(row.serviceDescription), 1)) : createCommentVNode("", true),
                                  row.serviceRemarks ? (openBlock(), createBlock("div", {
                                    key: 1,
                                    class: "text-sm text-gray-500"
                                  }, toDisplayString(row.serviceRemarks.substring(0, 50)) + toDisplayString(row.serviceRemarks.length > 50 ? "..." : ""), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, [
                                    createVNode("div", null, " Invoice: " + toDisplayString(row.invoiceSummary || "-"), 1),
                                    ((_e = row.salesOrder) == null ? void 0 : _e.order_number) ? (openBlock(), createBlock("div", { key: 0 }, " SO: " + toDisplayString(row.salesOrder.order_number), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(row.vendorInvoiceDate ? formatDate(row.vendorInvoiceDate) : "-"), 1),
                                  row.isOpening && row.openingPaymentDate ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-xs text-gray-500"
                                  }, " Opening Payment: " + toDisplayString(formatDate(row.openingPaymentDate)), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(row.amount)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(row.paidAmount)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900" }, " Rp " + toDisplayString(formatNumber(row.outstanding)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center" }, [
                                  createVNode("span", {
                                    class: [getStatusClass(row.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                  }, [
                                    createTextVNode(toDisplayString(getStatusText(row.status)) + " ", 1),
                                    row.daysOverdue > 0 ? (openBlock(), createBlock("span", {
                                      key: 0,
                                      class: "ml-1"
                                    }, " (" + toDisplayString(row.daysOverdue) + " days) ", 1)) : createCommentVNode("", true)
                                  ], 2)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm font-medium" }, [
                                  createVNode("button", {
                                    onClick: ($event) => showPayable(row),
                                    class: "inline-flex items-center px-3 py-2 border border-blue-200 rounded-md text-blue-600 hover:text-blue-900 hover:border-blue-400 disabled:text-gray-400 disabled:border-gray-200",
                                    disabled: !row.primaryPayableId
                                  }, [
                                    (openBlock(), createBlock("svg", {
                                      class: "w-4 h-4 mr-1",
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
                                    createTextVNode(" Details ")
                                  ], 8, ["onClick", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/AccountPayables/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-398e24e1"]]);
export {
  Index as default
};
