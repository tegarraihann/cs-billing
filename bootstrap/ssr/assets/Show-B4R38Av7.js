import { computed, ref, reactive, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, createTextVNode, openBlock, Fragment, renderList, withModifiers, withDirectives, vModelSelect, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
import { useForm, Head, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BDTNgS_F.js";
import { ArrowLeft, CreditCard, FileText, Edit, Plus } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-C7BgyxQX.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    payable: Object,
    groupSummary: {
      type: Object,
      default: () => null
    },
    groupPayables: {
      type: Array,
      default: () => []
    },
    bankAccounts: {
      type: Array,
      default: () => []
    },
    selectedComponentId: {
      type: [Number, String, null],
      default: null
    },
    reimbursementItems: {
      type: Array,
      default: () => []
    },
    operationalCostCategories: {
      type: Array,
      default: () => []
    },
    vendors: {
      type: Array,
      default: () => []
    },
    pettyCashCategories: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const bankAccounts = computed(() => props.bankAccounts ?? []);
    const pettyCashCategories = computed(() => props.pettyCashCategories ?? []);
    const payables = computed(() => {
      if (Array.isArray(props.groupPayables) && props.groupPayables.length) {
        return props.groupPayables;
      }
      return props.payable ? [props.payable] : [];
    });
    const payable = computed(() => {
      if (props.payable) {
        return props.payable;
      }
      return payables.value[0] || null;
    });
    const showPaymentModal = ref(false);
    const showEditModal = ref(false);
    const showAdditionalCostModal = ref(false);
    const processing = ref(false);
    const postingVat = ref(false);
    const paymentForm = useForm({
      amount: "",
      payment_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      payment_source: "bank",
      bank_account_id: "",
      petty_cash_category_id: "",
      payment_method: "",
      notes: "",
      component_id: ""
    });
    const summary = computed(() => {
      if (props.groupSummary) {
        return {
          total_amount: props.groupSummary.total_amount ?? 0,
          total_paid: props.groupSummary.total_paid ?? 0,
          total_outstanding: props.groupSummary.total_outstanding ?? 0,
          status: props.groupSummary.status ?? null,
          sales_order: props.groupSummary.sales_order ?? null,
          invoice_numbers: props.groupSummary.invoice_numbers ?? [],
          vendor_names: props.groupSummary.vendor_names ?? [],
          due_date: props.groupSummary.due_date ?? null,
          latest_vendor_invoice_date: props.groupSummary.latest_vendor_invoice_date ?? null
        };
      }
      const current = payable.value;
      return {
        total_amount: (current == null ? void 0 : current.amount) ?? 0,
        total_paid: (current == null ? void 0 : current.paid_amount) ?? 0,
        total_outstanding: (current == null ? void 0 : current.outstanding_amount) ?? 0,
        status: (current == null ? void 0 : current.status) ?? null,
        sales_order: (current == null ? void 0 : current.sales_order) ?? null,
        invoice_numbers: (current == null ? void 0 : current.vendor_invoice_number) ? [current.vendor_invoice_number] : [],
        vendor_names: (current == null ? void 0 : current.vendor_name) ? [current.vendor_name] : [],
        due_date: (current == null ? void 0 : current.payment_due_date) ?? null,
        latest_vendor_invoice_date: (current == null ? void 0 : current.vendor_invoice_date) ?? null
      };
    });
    const summaryStatus = computed(() => {
      var _a;
      return summary.value.status ?? ((_a = payable.value) == null ? void 0 : _a.status) ?? "unpaid";
    });
    const activeVendorName = computed(() => {
      var _a, _b, _c;
      return ((_b = (_a = payable.value) == null ? void 0 : _a.vendor) == null ? void 0 : _b.nama_vendor) ?? ((_c = payable.value) == null ? void 0 : _c.vendor_name) ?? "-";
    });
    const activeDaysOverdue = computed(() => {
      var _a;
      return ((_a = payable.value) == null ? void 0 : _a.days_overdue) ?? 0;
    });
    const overdueDays = computed(() => activeDaysOverdue.value);
    const canPostVat = computed(() => (summary.value.total_outstanding || 0) > 0 && summaryStatus.value !== "paid");
    const headerSubtitle = computed(() => {
      var _a, _b;
      if ((_a = summary.value.sales_order) == null ? void 0 : _a.order_number) {
        return `SO ${summary.value.sales_order.order_number}`;
      }
      if ((_b = summary.value.vendor_names) == null ? void 0 : _b.length) {
        return `Vendor ${summary.value.vendor_names[0]}`;
      }
      return `Vendor ${activeVendorName.value}`;
    });
    const editForm = reactive({
      vendor_invoice_number: "",
      vendor_invoice_date: "",
      service_remarks: ""
    });
    const additionalCostForm = useForm({
      component_type: "operational_cost",
      description: "",
      amount: "",
      category_id: "",
      vendor_id: "",
      notes: ""
    });
    const additionalCostContext = ref({
      componentType: "operational_cost",
      categoryId: "",
      vendorId: "",
      categoryLocked: false
    });
    watch(payable, (current) => {
      editForm.vendor_invoice_number = (current == null ? void 0 : current.vendor_invoice_number) || "";
      editForm.vendor_invoice_date = (current == null ? void 0 : current.vendor_invoice_date) || "";
      editForm.service_remarks = (current == null ? void 0 : current.service_remarks) || "";
      const vendorId = (current == null ? void 0 : current.vendor_id) ? String(current.vendor_id) : "";
      additionalCostContext.value.vendorId = vendorId;
      additionalCostForm.vendor_id = vendorId;
    }, { immediate: true });
    const componentOptions = computed(() => {
      const items = [];
      payables.value.forEach((payableItem = {}, payableIndex) => {
        const components = Array.isArray(payableItem.components) ? payableItem.components : [];
        Number(payableItem.id) || payableIndex + 1;
        components.forEach((component = {}, componentIndex) => {
          var _a;
          const numericId = Number(component.id ?? component.component_id);
          if (Number.isNaN(numericId) || numericId <= 0) {
            return;
          }
          items.push({
            ...component,
            parent_payable_id: payableItem.id ?? component.account_payable_id ?? null,
            parent_vendor_name: ((_a = payableItem.vendor) == null ? void 0 : _a.nama_vendor) || payableItem.vendor_name || component.recipient_name || "",
            parent_invoice_number: payableItem.vendor_invoice_number || null,
            id: numericId,
            amount: parseFloat(component.amount || 0),
            paid_amount: parseFloat(component.paid_amount || 0),
            outstanding_amount: parseFloat(component.outstanding_amount || 0)
          });
        });
      });
      return items;
    });
    const selectedComponentIdProp = computed(() => {
      if (props.selectedComponentId === null || props.selectedComponentId === void 0 || props.selectedComponentId === "") {
        return null;
      }
      const numeric = Number(props.selectedComponentId);
      return Number.isNaN(numeric) ? null : numeric;
    });
    const operationalCostCategories = computed(() => props.operationalCostCategories ?? []);
    computed(() => props.reimbursementItems ?? []);
    const isCategoryLocked = computed(() => additionalCostContext.value.categoryLocked);
    const requiresCategory = computed(() => {
      if (additionalCostForm.component_type !== "operational_cost") {
        return false;
      }
      return !additionalCostContext.value.categoryLocked;
    });
    const shouldShowCategoryField = computed(() => requiresCategory.value);
    const visibleComponents = computed(() => {
      if (!componentOptions.value.length) {
        return [];
      }
      if (selectedComponentIdProp.value) {
        const match = componentOptions.value.find((component) => component.id === selectedComponentIdProp.value);
        if (match) {
          return [match];
        }
      }
      return componentOptions.value;
    });
    const payableComponentOptions = computed(
      () => componentOptions.value.filter((component) => parseFloat(component.outstanding_amount || 0) > 0.01)
    );
    const hasMultipleComponents = computed(() => payableComponentOptions.value.length > 1);
    const selectedComponent = computed(() => {
      const options = payableComponentOptions.value.length ? payableComponentOptions.value : componentOptions.value;
      const id = paymentForm.component_id ? Number(paymentForm.component_id) : null;
      if (!id && options.length === 1) {
        return options[0];
      }
      return options.find((component) => component.id === id) || null;
    });
    watch(() => paymentForm.component_id, () => {
      if (hasMultipleComponents.value && !paymentForm.component_id) {
        paymentForm.amount = "";
      }
    });
    watch(() => paymentForm.payment_source, (source) => {
      if (source === "bank") {
        if (!paymentForm.bank_account_id && bankAccounts.value.length) {
          paymentForm.bank_account_id = String(bankAccounts.value[0].id);
        }
        paymentForm.petty_cash_category_id = "";
        if (!paymentForm.payment_method || paymentForm.payment_method === "Petty Cash") {
          paymentForm.payment_method = "Transfer Bank";
        }
      } else if (source === "petty_cash") {
        paymentForm.bank_account_id = "";
        if (!paymentForm.payment_method || paymentForm.payment_method === "Transfer Bank") {
          paymentForm.payment_method = "Petty Cash";
        }
      }
    });
    watch(
      () => [selectedComponentIdProp.value, payableComponentOptions.value, componentOptions.value],
      ([selectedId, payableOptions, allOptions]) => {
        const options = payableOptions.length ? payableOptions : allOptions;
        if (!options.length) {
          paymentForm.component_id = "";
          return;
        }
        if (selectedId && options.find((component) => component.id === selectedId)) {
          paymentForm.component_id = String(selectedId);
          return;
        }
        if (!paymentForm.component_id) {
          const defaultComponent = payableOptions.find((component) => parseFloat(component.outstanding_amount || 0) > 0) || payableOptions[0] || allOptions.find((component) => parseFloat(component.outstanding_amount || 0) > 0) || allOptions[0];
          paymentForm.component_id = defaultComponent ? String(defaultComponent.id) : "";
        }
      },
      { immediate: true, deep: true }
    );
    watch(
      () => additionalCostForm.component_type,
      (type) => {
        if (type !== "operational_cost") {
          additionalCostForm.category_id = "";
        }
      }
    );
    const formatNumber = (number) => {
      return new Intl.NumberFormat("id-ID").format(number || 0);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateTime = (datetime) => {
      return new Date(datetime).toLocaleString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getComponentCategory = (component) => {
      var _a;
      return ((_a = component == null ? void 0 : component.related_items) == null ? void 0 : _a.category_name) || "";
    };
    const normalizeCurrencyInput = (value) => {
      if (value === null || value === void 0) {
        return 0;
      }
      if (typeof value === "number") {
        return value;
      }
      let normalized = value.toString().trim();
      if (normalized === "") {
        return 0;
      }
      if (normalized.includes(".") && normalized.includes(",")) {
        normalized = normalized.replace(/\./g, "").replace(",", ".");
      } else if (normalized.includes(".") && !normalized.includes(",")) {
        const parts = normalized.split(".");
        if (parts.length === 2) {
          const decimalPart = parts[1];
          const likelyDecimal = decimalPart.length <= 2 && Number(decimalPart) < 100;
          if (!likelyDecimal) {
            normalized = normalized.replace(/\./g, "");
          }
        } else {
          normalized = normalized.replace(/\./g, "");
        }
      } else if (normalized.includes(",")) {
        normalized = normalized.replace(",", ".");
      }
      normalized = normalized.replace(/\s+/g, "");
      const parsed = parseFloat(normalized);
      return Number.isNaN(parsed) ? 0 : parsed;
    };
    const getCategoryNameById = (id) => {
      if (!id) {
        return "";
      }
      const match = operationalCostCategories.value.find((category) => String(category.id) === String(id));
      return match ? match.name : "";
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
        partial: "Partial Payment",
        paid: "Paid"
      };
      return texts[status] || status;
    };
    const getComponentLabel = (type) => {
      const labels = {
        "vendor_payment": "Pembayaran Vendor",
        "operational_cost": "Biaya Operational",
        "reimbursement": "Reimbursement"
      };
      return labels[type] || type;
    };
    const postVatPayable = () => {
      if (!canPostVat.value || postingVat.value || !payable.value) {
        return;
      }
      const ok = window.confirm("Post outstanding ke VAT Payable dan tutup hutang ini?");
      if (!ok) {
        return;
      }
      postingVat.value = true;
      router.post(
        route("admin-keuangan.account-payables.post-vat", payable.value.id),
        {},
        {
          onFinish: () => {
            postingVat.value = false;
          }
        }
      );
    };
    const goBack = () => {
      router.visit(route("admin-keuangan.account-payables.index"));
    };
    const resetPaymentForm = () => {
      paymentForm.reset();
      paymentForm.payment_date = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      paymentForm.payment_source = "bank";
      paymentForm.petty_cash_category_id = "";
      paymentForm.payment_method = "Transfer Bank";
      const defaultBank = bankAccounts.value.length ? bankAccounts.value[0] : null;
      paymentForm.bank_account_id = defaultBank ? String(defaultBank.id) : "";
    };
    const openPaymentModal = () => {
      resetPaymentForm();
      const availableOptions = payableComponentOptions.value.length ? payableComponentOptions.value : componentOptions.value;
      const defaultComponent = availableOptions.length === 1 ? availableOptions[0] : availableOptions.find((component) => parseFloat(component.outstanding_amount || 0) > 0) || availableOptions[0];
      paymentForm.component_id = defaultComponent ? String(defaultComponent.id) : "";
      showPaymentModal.value = true;
    };
    const closePaymentModal = () => {
      showPaymentModal.value = false;
      resetPaymentForm();
    };
    const openEditModal = () => {
      showEditModal.value = true;
    };
    const closeEditModal = () => {
      showEditModal.value = false;
    };
    const resetAdditionalCostForm = () => {
      var _a;
      additionalCostForm.reset();
      const vendorId = ((_a = payable.value) == null ? void 0 : _a.vendor_id) ? String(payable.value.vendor_id) : "";
      additionalCostContext.value = {
        componentType: "operational_cost",
        categoryId: "",
        vendorId,
        categoryLocked: false
      };
      additionalCostForm.component_type = additionalCostContext.value.componentType;
      additionalCostForm.vendor_id = additionalCostContext.value.vendorId;
      additionalCostForm.category_id = additionalCostContext.value.categoryId;
      additionalCostForm.clearErrors();
    };
    const openAdditionalCostModal = (context = {}) => {
      var _a;
      resetAdditionalCostForm();
      const fromComponent = Boolean(context.fromComponent);
      const contextCategoryId = context.categoryId ? String(context.categoryId) : "";
      additionalCostContext.value = {
        componentType: context.componentType || "operational_cost",
        categoryId: contextCategoryId,
        vendorId: context.vendorId ? String(context.vendorId) : ((_a = payable.value) == null ? void 0 : _a.vendor_id) ? String(payable.value.vendor_id) : "",
        categoryLocked: fromComponent
      };
      additionalCostForm.component_type = additionalCostContext.value.componentType;
      additionalCostForm.category_id = additionalCostContext.value.categoryId;
      additionalCostForm.vendor_id = additionalCostContext.value.vendorId;
      showAdditionalCostModal.value = true;
    };
    const closeAdditionalCostModal = () => {
      showAdditionalCostModal.value = false;
      resetAdditionalCostForm();
    };
    const markPayment = () => {
      var _a;
      processing.value = true;
      const targetComponent = selectedComponent.value;
      const targetPayableId = (targetComponent == null ? void 0 : targetComponent.parent_payable_id) || ((_a = payable.value) == null ? void 0 : _a.id);
      if (!targetPayableId) {
        processing.value = false;
        return;
      }
      paymentForm.transform((data) => ({
        ...data,
        amount: normalizeCurrencyInput(data.amount),
        bank_account_id: data.bank_account_id || null,
        petty_cash_category_id: data.petty_cash_category_id || null
      })).post(
        route("admin-keuangan.account-payables.mark-as-paid", targetPayableId),
        {
          onSuccess: () => {
            closePaymentModal();
            resetPaymentForm();
            processing.value = false;
          },
          onError: () => {
            processing.value = false;
          }
        }
      );
    };
    const submitAdditionalCost = () => {
      var _a;
      if (!((_a = payable.value) == null ? void 0 : _a.id)) {
        return;
      }
      additionalCostForm.transform((data) => ({
        ...data,
        amount: normalizeCurrencyInput(data.amount)
      })).post(
        route("admin-keuangan.account-payables.components.store", payable.value.id),
        {
          preserveScroll: true,
          onSuccess: () => {
            closeAdditionalCostModal();
          }
        }
      );
    };
    const updateDetails = () => {
      var _a;
      if (!((_a = payable.value) == null ? void 0 : _a.id)) {
        return;
      }
      processing.value = true;
      router.post(
        route("admin-keuangan.account-payables.update-vendor-invoice", payable.value.id),
        editForm,
        {
          onSuccess: () => {
            closeEditModal();
            processing.value = false;
          },
          onError: () => {
            processing.value = false;
          }
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Detail Hutang" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div class="flex items-center space-x-3"${_scopeId}><button class="text-gray-400 hover:text-gray-600"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-6 h-6" }, null, _parent2, _scopeId));
            _push2(`</button><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Detail Hutang</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(headerSubtitle.value)}</p></div></div><div class="flex items-center space-x-3"${_scopeId}><span class="${ssrRenderClass([getStatusClass(summaryStatus.value), "inline-flex px-3 py-1 text-sm font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(summaryStatus.value))} `);
            if (overdueDays.value > 0) {
              _push2(`<span class="ml-1"${_scopeId}> (${ssrInterpolate(overdueDays.value)} hari overdue) </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span>`);
            if (summary.value.total_outstanding > 0) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CreditCard), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Mark Payment </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (canPostVat.value) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-amber-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-700 focus:bg-amber-700 active:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition ease-in-out duration-150"${ssrIncludeBooleanAttr(postingVat.value) ? " disabled" : ""}${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(postingVat.value ? "Posting..." : "Post VAT Payable")}</button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Edit), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Edit Details </button></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}>Informasi Vendor</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Vendor Name</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_a = payable.value.vendor) == null ? void 0 : _a.nama_vendor) || payable.value.vendor_name)}</p></div>`);
            if ((_b = payable.value.vendor) == null ? void 0 : _b.alamat) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Address</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(payable.value.vendor.alamat)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (payable.value.vendor_bank_account) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Bank Account</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(payable.value.vendor_bank_account)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><div class="space-y-3"${_scopeId}>`);
            if ((_c = payable.value.vendor) == null ? void 0 : _c.pic_name) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>PIC Name</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(payable.value.vendor.pic_name)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_d = payable.value.vendor) == null ? void 0 : _d.pic_phone) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>PIC Phone</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(payable.value.vendor.pic_phone)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (payable.value.vendor_account_name) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Account Name</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(payable.value.vendor_account_name)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Informasi Service</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Service Description</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(payable.value.service_description)}</p></div>`);
            if (payable.value.vendor_invoice_number) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Vendor Invoice Number</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(payable.value.vendor_invoice_number)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (payable.value.vendor_invoice_date) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Vendor Invoice Date</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(payable.value.vendor_invoice_date))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><div class="space-y-3"${_scopeId}>`);
            if (payable.value.sales_order) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Sales Order</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(payable.value.sales_order.order_number)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (payable.value.payment_due_date) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Payment Due Date</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(payable.value.payment_due_date))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (payable.value.payment_date) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Payment Date</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(payable.value.payment_date))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            if (payable.value.service_remarks) {
              _push2(`<div class="mt-4"${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Service Remarks</label><div class="mt-1 bg-gray-50 p-3 rounded-md"${_scopeId}><p class="text-sm text-gray-700 whitespace-pre-line"${_scopeId}>${ssrInterpolate(payable.value.service_remarks)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Ringkasan Keuangan</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="bg-blue-50 p-4 rounded-lg border border-blue-200"${_scopeId}><div class="text-sm font-medium text-blue-600 mb-1"${_scopeId}>Total Amount</div><div class="text-xl font-bold text-blue-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(summary.value.total_amount))}</div></div><div class="bg-green-50 p-4 rounded-lg border border-green-200"${_scopeId}><div class="text-sm font-medium text-green-600 mb-1"${_scopeId}>Paid Amount</div><div class="text-xl font-bold text-green-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(summary.value.total_paid))}</div></div><div class="bg-red-50 p-4 rounded-lg border border-red-200"${_scopeId}><div class="text-sm font-medium text-red-600 mb-1"${_scopeId}>Outstanding Amount</div><div class="text-xl font-bold text-red-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(summary.value.total_outstanding))}</div></div></div></div>`);
            if (visibleComponents.value.length) {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4"${_scopeId}><div${_scopeId}><h2 class="text-lg font-semibold text-gray-900"${_scopeId}>Rincian Komponen Hutang</h2><p class="text-sm text-gray-500"${_scopeId}>Semua komponen biaya (main invoice, reimbursement, operasional) ditampilkan di tabel ini.</p></div><button class="inline-flex items-center px-4 py-2 border border-red-200 text-red-700 text-sm font-medium rounded-md bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Tambah Biaya </button></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Komponen </th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Kategori </th><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Penerima </th><th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Nilai Hutang </th><th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Terbayar </th><th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Outstanding </th><th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(visibleComponents.value, (component) => {
                _push2(`<tr${_scopeId}><td class="px-4 py-3 text-sm text-gray-900"${_scopeId}><div class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(component.description || "Tidak ada deskripsi")}</div></td><td class="px-4 py-3 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(getComponentCategory(component) || "-")}</td><td class="px-4 py-3 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(component.recipient_name || "-")}</td><td class="px-4 py-3 text-sm text-gray-900 text-right"${_scopeId}> Rp ${ssrInterpolate(formatNumber(component.amount))}</td><td class="px-4 py-3 text-sm text-gray-900 text-right"${_scopeId}> Rp ${ssrInterpolate(formatNumber(component.paid_amount))}</td><td class="px-4 py-3 text-sm text-gray-900 text-right"${_scopeId}> Rp ${ssrInterpolate(formatNumber(component.outstanding_amount))}</td><td class="px-4 py-3 text-sm text-right"${_scopeId}><span class="${ssrRenderClass([getStatusClass(component.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(component.status))}</span></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (payable.value.payment_method || payable.value.payment_notes) {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Payment Information</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}>`);
              if (payable.value.payment_method) {
                _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Payment Method</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(payable.value.payment_method)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (payable.value.paid_by_user) {
                _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Paid By</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(payable.value.paid_by_user.name)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (payable.value.payment_notes) {
                _push2(`<div class="mt-4"${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Payment Notes</label><div class="mt-1 bg-gray-50 p-3 rounded-md"${_scopeId}><p class="text-sm text-gray-700 whitespace-pre-line"${_scopeId}>${ssrInterpolate(payable.value.payment_notes)}</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white rounded-lg shadow-sm p-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>System Information</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><div class="space-y-3"${_scopeId}>`);
            if (payable.value.creator) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Created By</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(payable.value.creator.name)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Created At</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(payable.value.created_at))}</p></div></div></div><div${_scopeId}><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Last Updated</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(payable.value.updated_at))}</p></div></div></div></div></div></div>`);
            if (showPaymentModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"${_scopeId}><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"${_scopeId}><div class="mt-3"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Mark Payment</h3><div class="mb-4 bg-gray-50 p-3 rounded-md"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}> Vendor: ${ssrInterpolate(((_e = selectedComponent.value) == null ? void 0 : _e.recipient_name) || ((_f = payable.value.vendor) == null ? void 0 : _f.nama_vendor) || payable.value.vendor_name)}</p>`);
              if (selectedComponent.value) {
                _push2(`<p class="text-sm text-gray-600"${_scopeId}> Komponen: ${ssrInterpolate(getComponentLabel(selectedComponent.value.component_type))}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="text-sm text-gray-600"${_scopeId}> Outstanding: Rp ${ssrInterpolate(formatNumber(
                selectedComponent.value ? selectedComponent.value.outstanding_amount : payable.value.outstanding_amount
              ))}</p></div><form${_scopeId}>`);
              if (hasMultipleComponents.value) {
                _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Komponen Pembayaran *</label><select required class="${ssrRenderClass([unref(paymentForm).errors.component_id ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300", "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).component_id) ? ssrLooseContain(unref(paymentForm).component_id, "") : ssrLooseEqual(unref(paymentForm).component_id, "")) ? " selected" : ""}${_scopeId}>Pilih Komponen</option><!--[-->`);
                ssrRenderList(payableComponentOptions.value, (component) => {
                  _push2(`<option${ssrRenderAttr("value", component.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).component_id) ? ssrLooseContain(unref(paymentForm).component_id, component.id) : ssrLooseEqual(unref(paymentForm).component_id, component.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(getComponentLabel(component.component_type))} - ${ssrInterpolate(component.recipient_name)} - Outstanding Rp ${ssrInterpolate(formatNumber(component.outstanding_amount))}</option>`);
                });
                _push2(`<!--]--></select>`);
                if (unref(paymentForm).errors.component_id) {
                  _push2(`<p class="text-sm text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(paymentForm).errors.component_id)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Amount *</label><input${ssrRenderAttr("value", unref(paymentForm).amount)} type="text" inputmode="decimal" required class="${ssrRenderClass([unref(paymentForm).errors.amount ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300", "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"])}" placeholder="Masukkan nominal pembayaran (mis. 120000 atau 120.000)"${_scopeId}>`);
              if (unref(paymentForm).errors.amount) {
                _push2(`<p class="text-sm text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(paymentForm).errors.amount)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Payment Date *</label><input${ssrRenderAttr("value", unref(paymentForm).payment_date)} type="date" required class="${ssrRenderClass([unref(paymentForm).errors.payment_date ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300", "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}>`);
              if (unref(paymentForm).errors.payment_date) {
                _push2(`<p class="text-sm text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(paymentForm).errors.payment_date)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Sumber Pembayaran *</label><select required class="${ssrRenderClass([unref(paymentForm).errors.payment_source ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300", "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}><option value="bank"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_source) ? ssrLooseContain(unref(paymentForm).payment_source, "bank") : ssrLooseEqual(unref(paymentForm).payment_source, "bank")) ? " selected" : ""}${_scopeId}>Bank</option><option value="petty_cash"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_source) ? ssrLooseContain(unref(paymentForm).payment_source, "petty_cash") : ssrLooseEqual(unref(paymentForm).payment_source, "petty_cash")) ? " selected" : ""}${_scopeId}>Petty Cash</option></select>`);
              if (unref(paymentForm).errors.payment_source) {
                _push2(`<p class="text-sm text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(paymentForm).errors.payment_source)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (unref(paymentForm).payment_source === "bank") {
                _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Bank Account *</label><select${ssrIncludeBooleanAttr(unref(paymentForm).payment_source === "bank") ? " required" : ""} class="${ssrRenderClass([unref(paymentForm).errors.bank_account_id ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300", "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).bank_account_id) ? ssrLooseContain(unref(paymentForm).bank_account_id, "") : ssrLooseEqual(unref(paymentForm).bank_account_id, "")) ? " selected" : ""}${_scopeId}>Select Bank Account</option><!--[-->`);
                ssrRenderList(bankAccounts.value, (bank) => {
                  _push2(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).bank_account_id) ? ssrLooseContain(unref(paymentForm).bank_account_id, bank.id) : ssrLooseEqual(unref(paymentForm).bank_account_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} - ${ssrInterpolate(bank.account_number)}</option>`);
                });
                _push2(`<!--]--></select>`);
                if (unref(paymentForm).errors.bank_account_id) {
                  _push2(`<p class="text-sm text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(paymentForm).errors.bank_account_id)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(paymentForm).payment_source === "petty_cash") {
                _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Kategori Petty Cash *</label><select${ssrIncludeBooleanAttr(unref(paymentForm).payment_source === "petty_cash") ? " required" : ""} class="${ssrRenderClass([unref(paymentForm).errors.petty_cash_category_id ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300", "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).petty_cash_category_id) ? ssrLooseContain(unref(paymentForm).petty_cash_category_id, "") : ssrLooseEqual(unref(paymentForm).petty_cash_category_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kategori</option><!--[-->`);
                ssrRenderList(pettyCashCategories.value, (category) => {
                  _push2(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).petty_cash_category_id) ? ssrLooseContain(unref(paymentForm).petty_cash_category_id, category.id) : ssrLooseEqual(unref(paymentForm).petty_cash_category_id, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
                });
                _push2(`<!--]--></select>`);
                if (unref(paymentForm).errors.petty_cash_category_id) {
                  _push2(`<p class="text-sm text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(paymentForm).errors.petty_cash_category_id)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Payment Method *</label><select required class="${ssrRenderClass([unref(paymentForm).errors.payment_method ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300", "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"])}"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "") : ssrLooseEqual(unref(paymentForm).payment_method, "")) ? " selected" : ""}${_scopeId}>Select Payment Method</option><option value="Transfer Bank"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "Transfer Bank") : ssrLooseEqual(unref(paymentForm).payment_method, "Transfer Bank")) ? " selected" : ""}${_scopeId}>Transfer Bank</option><option value="Cash"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "Cash") : ssrLooseEqual(unref(paymentForm).payment_method, "Cash")) ? " selected" : ""}${_scopeId}>Cash</option><option value="Check"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "Check") : ssrLooseEqual(unref(paymentForm).payment_method, "Check")) ? " selected" : ""}${_scopeId}>Check</option><option value="Other"${ssrIncludeBooleanAttr(Array.isArray(unref(paymentForm).payment_method) ? ssrLooseContain(unref(paymentForm).payment_method, "Other") : ssrLooseEqual(unref(paymentForm).payment_method, "Other")) ? " selected" : ""}${_scopeId}>Other</option></select>`);
              if (unref(paymentForm).errors.payment_method) {
                _push2(`<p class="text-sm text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(paymentForm).errors.payment_method)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Notes</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Payment notes (optional)"${_scopeId}>${ssrInterpolate(unref(paymentForm).notes)}</textarea></div><div class="flex justify-end space-x-3"${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"${_scopeId}> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50"${_scopeId}>${ssrInterpolate(processing.value ? "Processing..." : "Mark Payment")}</button></div></form></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showEditModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"${_scopeId}><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"${_scopeId}><div class="mt-3"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Edit Vendor Invoice Details</h3><form${_scopeId}><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Vendor Invoice Number</label><input${ssrRenderAttr("value", editForm.vendor_invoice_number)} type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Enter vendor invoice number"${_scopeId}></div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Vendor Invoice Date</label><input${ssrRenderAttr("value", editForm.vendor_invoice_date)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Service Remarks</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Additional remarks"${_scopeId}>${ssrInterpolate(editForm.service_remarks)}</textarea></div><div class="flex justify-end space-x-3"${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"${_scopeId}> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"${_scopeId}>${ssrInterpolate(processing.value ? "Updating..." : "Update Details")}</button></div></form></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showAdditionalCostModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"${_scopeId}><div class="relative top-20 mx-auto p-5 border w-[420px] shadow-lg rounded-md bg-white"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}>Tambah Biaya</h3><button class="text-gray-400 hover:text-gray-600"${_scopeId}>×</button></div><form${_scopeId}><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Jenis Biaya *</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"${_scopeId}><option value="operational_cost"${ssrIncludeBooleanAttr(Array.isArray(unref(additionalCostForm).component_type) ? ssrLooseContain(unref(additionalCostForm).component_type, "operational_cost") : ssrLooseEqual(unref(additionalCostForm).component_type, "operational_cost")) ? " selected" : ""}${_scopeId}>Biaya Operasional (Internal)</option><option value="reimbursement"${ssrIncludeBooleanAttr(Array.isArray(unref(additionalCostForm).component_type) ? ssrLooseContain(unref(additionalCostForm).component_type, "reimbursement") : ssrLooseEqual(unref(additionalCostForm).component_type, "reimbursement")) ? " selected" : ""}${_scopeId}>Reimbursement (Ter-tagih)</option></select><p class="text-xs text-gray-500 mt-1"${_scopeId}> Biaya operasional hanya memengaruhi profit. Reimbursement akan otomatis masuk ke invoice reimbursement. </p></div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Deskripsi *</label><input${ssrRenderAttr("value", unref(additionalCostForm).description)} type="text" class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" placeholder="Contoh: Admin Bank" required${_scopeId}>`);
              if (unref(additionalCostForm).errors.description) {
                _push2(`<p class="text-sm text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(additionalCostForm).errors.description)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Nominal *</label><input${ssrRenderAttr("value", unref(additionalCostForm).amount)} type="number" min="0" step="0.01" class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" placeholder="0" required${_scopeId}>`);
              if (unref(additionalCostForm).errors.amount) {
                _push2(`<p class="text-sm text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(additionalCostForm).errors.amount)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
              if (shouldShowCategoryField.value) {
                _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Kategori Biaya *</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"${ssrIncludeBooleanAttr(shouldShowCategoryField.value) ? " required" : ""}${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(additionalCostForm).category_id) ? ssrLooseContain(unref(additionalCostForm).category_id, "") : ssrLooseEqual(unref(additionalCostForm).category_id, "")) ? " selected" : ""}${_scopeId}>-- Pilih Kategori --</option><!--[-->`);
                ssrRenderList(operationalCostCategories.value, (category) => {
                  _push2(`<option${ssrRenderAttr("value", String(category.id))}${ssrIncludeBooleanAttr(Array.isArray(unref(additionalCostForm).category_id) ? ssrLooseContain(unref(additionalCostForm).category_id, String(category.id)) : ssrLooseEqual(unref(additionalCostForm).category_id, String(category.id))) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
                });
                _push2(`<!--]--></select>`);
                if (unref(additionalCostForm).errors.category_id) {
                  _push2(`<p class="text-sm text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(additionalCostForm).errors.category_id)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else if (isCategoryLocked.value && unref(additionalCostForm).category_id) {
                _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Kategori Biaya</label><div class="px-3 py-2 rounded-md border border-gray-200 bg-gray-50 text-gray-700"${_scopeId}>${ssrInterpolate(getCategoryNameById(unref(additionalCostForm).category_id) || "Mengikuti komponen")}</div><p class="text-xs text-gray-500 mt-1"${_scopeId}>Kategori mengikuti komponen yang sedang dibuka.</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Vendor / Penerima</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(additionalCostForm).vendor_id) ? ssrLooseContain(unref(additionalCostForm).vendor_id, "") : ssrLooseEqual(unref(additionalCostForm).vendor_id, "")) ? " selected" : ""}${_scopeId}>-- Internal (Divisi Operational) --</option><!--[-->`);
              ssrRenderList(__props.vendors, (vendor) => {
                _push2(`<option${ssrRenderAttr("value", String(vendor.id))}${ssrIncludeBooleanAttr(Array.isArray(unref(additionalCostForm).vendor_id) ? ssrLooseContain(unref(additionalCostForm).vendor_id, String(vendor.id)) : ssrLooseEqual(unref(additionalCostForm).vendor_id, String(vendor.id))) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendor.nama_vendor)}</option>`);
              });
              _push2(`<!--]--></select>`);
              if (unref(additionalCostForm).errors.vendor_id) {
                _push2(`<p class="text-sm text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(additionalCostForm).errors.vendor_id)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Catatan</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500" placeholder="Catatan tambahan"${_scopeId}>${ssrInterpolate(unref(additionalCostForm).notes)}</textarea>`);
              if (unref(additionalCostForm).errors.notes) {
                _push2(`<p class="text-sm text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(additionalCostForm).errors.notes)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex justify-end space-x-3"${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"${_scopeId}> Batal </button><button type="submit"${ssrIncludeBooleanAttr(unref(additionalCostForm).processing) ? " disabled" : ""} class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(additionalCostForm).processing ? "Menyimpan..." : "Simpan Biaya")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Detail Hutang" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", { class: "flex items-center space-x-3" }, [
                      createVNode("button", {
                        onClick: goBack,
                        class: "text-gray-400 hover:text-gray-600"
                      }, [
                        createVNode(unref(ArrowLeft), { class: "w-6 h-6" })
                      ]),
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Detail Hutang"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-600" }, toDisplayString(headerSubtitle.value), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center space-x-3" }, [
                      createVNode("span", {
                        class: [getStatusClass(summaryStatus.value), "inline-flex px-3 py-1 text-sm font-semibold rounded-full"]
                      }, [
                        createTextVNode(toDisplayString(getStatusText(summaryStatus.value)) + " ", 1),
                        overdueDays.value > 0 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "ml-1"
                        }, " (" + toDisplayString(overdueDays.value) + " hari overdue) ", 1)) : createCommentVNode("", true)
                      ], 2),
                      summary.value.total_outstanding > 0 ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: openPaymentModal,
                        class: "inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, [
                        createVNode(unref(CreditCard), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Mark Payment ")
                      ])) : createCommentVNode("", true),
                      canPostVat.value ? (openBlock(), createBlock("button", {
                        key: 1,
                        onClick: postVatPayable,
                        class: "inline-flex items-center px-4 py-2 bg-amber-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-700 focus:bg-amber-700 active:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition ease-in-out duration-150",
                        disabled: postingVat.value
                      }, [
                        createVNode(unref(FileText), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" " + toDisplayString(postingVat.value ? "Posting..." : "Post VAT Payable"), 1)
                      ], 8, ["disabled"])) : createCommentVNode("", true),
                      createVNode("button", {
                        onClick: openEditModal,
                        class: "inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, [
                        createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Edit Details ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Informasi Vendor"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Vendor Name"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(((_g = payable.value.vendor) == null ? void 0 : _g.nama_vendor) || payable.value.vendor_name), 1)
                            ]),
                            ((_h = payable.value.vendor) == null ? void 0 : _h.alamat) ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Address"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(payable.value.vendor.alamat), 1)
                            ])) : createCommentVNode("", true),
                            payable.value.vendor_bank_account ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Bank Account"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(payable.value.vendor_bank_account), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "space-y-3" }, [
                            ((_i = payable.value.vendor) == null ? void 0 : _i.pic_name) ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "PIC Name"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(payable.value.vendor.pic_name), 1)
                            ])) : createCommentVNode("", true),
                            ((_j = payable.value.vendor) == null ? void 0 : _j.pic_phone) ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "PIC Phone"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(payable.value.vendor.pic_phone), 1)
                            ])) : createCommentVNode("", true),
                            payable.value.vendor_account_name ? (openBlock(), createBlock("div", { key: 2 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Account Name"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(payable.value.vendor_account_name), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Informasi Service"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Service Description"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(payable.value.service_description), 1)
                            ]),
                            payable.value.vendor_invoice_number ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Vendor Invoice Number"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(payable.value.vendor_invoice_number), 1)
                            ])) : createCommentVNode("", true),
                            payable.value.vendor_invoice_date ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Vendor Invoice Date"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(payable.value.vendor_invoice_date)), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "space-y-3" }, [
                            payable.value.sales_order ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Sales Order"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(payable.value.sales_order.order_number), 1)
                            ])) : createCommentVNode("", true),
                            payable.value.payment_due_date ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Payment Due Date"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(payable.value.payment_due_date)), 1)
                            ])) : createCommentVNode("", true),
                            payable.value.payment_date ? (openBlock(), createBlock("div", { key: 2 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Payment Date"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(payable.value.payment_date)), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      payable.value.service_remarks ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-4"
                      }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Service Remarks"),
                        createVNode("div", { class: "mt-1 bg-gray-50 p-3 rounded-md" }, [
                          createVNode("p", { class: "text-sm text-gray-700 whitespace-pre-line" }, toDisplayString(payable.value.service_remarks), 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Ringkasan Keuangan"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                        createVNode("div", { class: "bg-blue-50 p-4 rounded-lg border border-blue-200" }, [
                          createVNode("div", { class: "text-sm font-medium text-blue-600 mb-1" }, "Total Amount"),
                          createVNode("div", { class: "text-xl font-bold text-blue-900" }, " Rp " + toDisplayString(formatNumber(summary.value.total_amount)), 1)
                        ]),
                        createVNode("div", { class: "bg-green-50 p-4 rounded-lg border border-green-200" }, [
                          createVNode("div", { class: "text-sm font-medium text-green-600 mb-1" }, "Paid Amount"),
                          createVNode("div", { class: "text-xl font-bold text-green-900" }, " Rp " + toDisplayString(formatNumber(summary.value.total_paid)), 1)
                        ]),
                        createVNode("div", { class: "bg-red-50 p-4 rounded-lg border border-red-200" }, [
                          createVNode("div", { class: "text-sm font-medium text-red-600 mb-1" }, "Outstanding Amount"),
                          createVNode("div", { class: "text-xl font-bold text-red-900" }, " Rp " + toDisplayString(formatNumber(summary.value.total_outstanding)), 1)
                        ])
                      ])
                    ]),
                    visibleComponents.value.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white rounded-lg shadow-sm p-6 mb-6"
                    }, [
                      createVNode("div", { class: "flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, "Rincian Komponen Hutang"),
                          createVNode("p", { class: "text-sm text-gray-500" }, "Semua komponen biaya (main invoice, reimbursement, operasional) ditampilkan di tabel ini.")
                        ]),
                        createVNode("button", {
                          onClick: openAdditionalCostModal,
                          class: "inline-flex items-center px-4 py-2 border border-red-200 text-red-700 text-sm font-medium rounded-md bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition"
                        }, [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Tambah Biaya ")
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Komponen "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Kategori "),
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Penerima "),
                              createVNode("th", { class: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Nilai Hutang "),
                              createVNode("th", { class: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Terbayar "),
                              createVNode("th", { class: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Outstanding "),
                              createVNode("th", { class: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(visibleComponents.value, (component) => {
                              return openBlock(), createBlock("tr", {
                                key: component.id
                              }, [
                                createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, [
                                  createVNode("div", { class: "font-medium text-gray-900" }, toDisplayString(component.description || "Tidak ada deskripsi"), 1)
                                ]),
                                createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(getComponentCategory(component) || "-"), 1),
                                createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(component.recipient_name || "-"), 1),
                                createVNode("td", { class: "px-4 py-3 text-sm text-gray-900 text-right" }, " Rp " + toDisplayString(formatNumber(component.amount)), 1),
                                createVNode("td", { class: "px-4 py-3 text-sm text-gray-900 text-right" }, " Rp " + toDisplayString(formatNumber(component.paid_amount)), 1),
                                createVNode("td", { class: "px-4 py-3 text-sm text-gray-900 text-right" }, " Rp " + toDisplayString(formatNumber(component.outstanding_amount)), 1),
                                createVNode("td", { class: "px-4 py-3 text-sm text-right" }, [
                                  createVNode("span", {
                                    class: [getStatusClass(component.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                  }, toDisplayString(getStatusText(component.status)), 3)
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true),
                    payable.value.payment_method || payable.value.payment_notes ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "bg-white rounded-lg shadow-sm p-6 mb-6"
                    }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Payment Information"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        payable.value.payment_method ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Payment Method"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(payable.value.payment_method), 1)
                        ])) : createCommentVNode("", true),
                        payable.value.paid_by_user ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Paid By"),
                          createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(payable.value.paid_by_user.name), 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      payable.value.payment_notes ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-4"
                      }, [
                        createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Payment Notes"),
                        createVNode("div", { class: "mt-1 bg-gray-50 p-3 rounded-md" }, [
                          createVNode("p", { class: "text-sm text-gray-700 whitespace-pre-line" }, toDisplayString(payable.value.payment_notes), 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "System Information"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "space-y-3" }, [
                            payable.value.creator ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Created By"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(payable.value.creator.name), 1)
                            ])) : createCommentVNode("", true),
                            createVNode("div", null, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Created At"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(formatDateTime(payable.value.created_at)), 1)
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Last Updated"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(formatDateTime(payable.value.updated_at)), 1)
                            ])
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
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Mark Payment"),
                        createVNode("div", { class: "mb-4 bg-gray-50 p-3 rounded-md" }, [
                          createVNode("p", { class: "text-sm text-gray-600" }, " Vendor: " + toDisplayString(((_k = selectedComponent.value) == null ? void 0 : _k.recipient_name) || ((_l = payable.value.vendor) == null ? void 0 : _l.nama_vendor) || payable.value.vendor_name), 1),
                          selectedComponent.value ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-gray-600"
                          }, " Komponen: " + toDisplayString(getComponentLabel(selectedComponent.value.component_type)), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-gray-600" }, " Outstanding: Rp " + toDisplayString(formatNumber(
                            selectedComponent.value ? selectedComponent.value.outstanding_amount : payable.value.outstanding_amount
                          )), 1)
                        ]),
                        createVNode("form", {
                          onSubmit: withModifiers(markPayment, ["prevent"])
                        }, [
                          hasMultipleComponents.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-4"
                          }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Komponen Pembayaran *"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(paymentForm).component_id = $event,
                              required: "",
                              class: ["w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", unref(paymentForm).errors.component_id ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300"]
                            }, [
                              createVNode("option", { value: "" }, "Pilih Komponen"),
                              (openBlock(true), createBlock(Fragment, null, renderList(payableComponentOptions.value, (component) => {
                                return openBlock(), createBlock("option", {
                                  key: component.id,
                                  value: component.id
                                }, toDisplayString(getComponentLabel(component.component_type)) + " - " + toDisplayString(component.recipient_name) + " - Outstanding Rp " + toDisplayString(formatNumber(component.outstanding_amount)), 9, ["value"]);
                              }), 128))
                            ], 10, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(paymentForm).component_id]
                            ]),
                            unref(paymentForm).errors.component_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-red-600 mt-1"
                            }, toDisplayString(unref(paymentForm).errors.component_id), 1)) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(paymentForm).amount = $event,
                              type: "text",
                              inputmode: "decimal",
                              required: "",
                              class: ["w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", unref(paymentForm).errors.amount ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300"],
                              placeholder: "Masukkan nominal pembayaran (mis. 120000 atau 120.000)"
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(paymentForm).amount]
                            ]),
                            unref(paymentForm).errors.amount ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-red-600 mt-1"
                            }, toDisplayString(unref(paymentForm).errors.amount), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Payment Date *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(paymentForm).payment_date = $event,
                              type: "date",
                              required: "",
                              class: ["w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", unref(paymentForm).errors.payment_date ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300"]
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(paymentForm).payment_date]
                            ]),
                            unref(paymentForm).errors.payment_date ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-red-600 mt-1"
                            }, toDisplayString(unref(paymentForm).errors.payment_date), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Sumber Pembayaran *"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(paymentForm).payment_source = $event,
                              required: "",
                              class: ["w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", unref(paymentForm).errors.payment_source ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300"]
                            }, [
                              createVNode("option", { value: "bank" }, "Bank"),
                              createVNode("option", { value: "petty_cash" }, "Petty Cash")
                            ], 10, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(paymentForm).payment_source]
                            ]),
                            unref(paymentForm).errors.payment_source ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-red-600 mt-1"
                            }, toDisplayString(unref(paymentForm).errors.payment_source), 1)) : createCommentVNode("", true)
                          ]),
                          unref(paymentForm).payment_source === "bank" ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "mb-4"
                          }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bank Account *"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(paymentForm).bank_account_id = $event,
                              required: unref(paymentForm).payment_source === "bank",
                              class: ["w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", unref(paymentForm).errors.bank_account_id ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300"]
                            }, [
                              createVNode("option", { value: "" }, "Select Bank Account"),
                              (openBlock(true), createBlock(Fragment, null, renderList(bankAccounts.value, (bank) => {
                                return openBlock(), createBlock("option", {
                                  key: bank.id,
                                  value: bank.id
                                }, toDisplayString(bank.bank_name) + " - " + toDisplayString(bank.account_number), 9, ["value"]);
                              }), 128))
                            ], 10, ["onUpdate:modelValue", "required"]), [
                              [vModelSelect, unref(paymentForm).bank_account_id]
                            ]),
                            unref(paymentForm).errors.bank_account_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-red-600 mt-1"
                            }, toDisplayString(unref(paymentForm).errors.bank_account_id), 1)) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true),
                          unref(paymentForm).payment_source === "petty_cash" ? (openBlock(), createBlock("div", {
                            key: 2,
                            class: "mb-4"
                          }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Kategori Petty Cash *"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(paymentForm).petty_cash_category_id = $event,
                              required: unref(paymentForm).payment_source === "petty_cash",
                              class: ["w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", unref(paymentForm).errors.petty_cash_category_id ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300"]
                            }, [
                              createVNode("option", { value: "" }, "Pilih Kategori"),
                              (openBlock(true), createBlock(Fragment, null, renderList(pettyCashCategories.value, (category) => {
                                return openBlock(), createBlock("option", {
                                  key: category.id,
                                  value: category.id
                                }, toDisplayString(category.name), 9, ["value"]);
                              }), 128))
                            ], 10, ["onUpdate:modelValue", "required"]), [
                              [vModelSelect, unref(paymentForm).petty_cash_category_id]
                            ]),
                            unref(paymentForm).errors.petty_cash_category_id ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-red-600 mt-1"
                            }, toDisplayString(unref(paymentForm).errors.petty_cash_category_id), 1)) : createCommentVNode("", true)
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Payment Method *"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(paymentForm).payment_method = $event,
                              required: "",
                              class: ["w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500", unref(paymentForm).errors.payment_method ? "border-red-300 focus:border-red-500 focus:ring-red-500" : "border-gray-300"]
                            }, [
                              createVNode("option", { value: "" }, "Select Payment Method"),
                              createVNode("option", { value: "Transfer Bank" }, "Transfer Bank"),
                              createVNode("option", { value: "Cash" }, "Cash"),
                              createVNode("option", { value: "Check" }, "Check"),
                              createVNode("option", { value: "Other" }, "Other")
                            ], 10, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(paymentForm).payment_method]
                            ]),
                            unref(paymentForm).errors.payment_method ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-red-600 mt-1"
                            }, toDisplayString(unref(paymentForm).errors.payment_method), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Notes"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(paymentForm).notes = $event,
                              rows: "3",
                              class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                              placeholder: "Payment notes (optional)"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(paymentForm).notes]
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
                              class: "px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50"
                            }, toDisplayString(processing.value ? "Processing..." : "Mark Payment"), 9, ["disabled"])
                          ])
                        ], 32)
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  showEditModal.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
                  }, [
                    createVNode("div", { class: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" }, [
                      createVNode("div", { class: "mt-3" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Edit Vendor Invoice Details"),
                        createVNode("form", {
                          onSubmit: withModifiers(updateDetails, ["prevent"])
                        }, [
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Vendor Invoice Number"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => editForm.vendor_invoice_number = $event,
                              type: "text",
                              class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                              placeholder: "Enter vendor invoice number"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, editForm.vendor_invoice_number]
                            ])
                          ]),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Vendor Invoice Date"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => editForm.vendor_invoice_date = $event,
                              type: "date",
                              class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, editForm.vendor_invoice_date]
                            ])
                          ]),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Service Remarks"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => editForm.service_remarks = $event,
                              rows: "3",
                              class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                              placeholder: "Additional remarks"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, editForm.service_remarks]
                            ])
                          ]),
                          createVNode("div", { class: "flex justify-end space-x-3" }, [
                            createVNode("button", {
                              type: "button",
                              onClick: closeEditModal,
                              class: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            }, " Cancel "),
                            createVNode("button", {
                              type: "submit",
                              disabled: processing.value,
                              class: "px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                            }, toDisplayString(processing.value ? "Updating..." : "Update Details"), 9, ["disabled"])
                          ])
                        ], 32)
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  showAdditionalCostModal.value ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
                  }, [
                    createVNode("div", { class: "relative top-20 mx-auto p-5 border w-[420px] shadow-lg rounded-md bg-white" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Tambah Biaya"),
                        createVNode("button", {
                          onClick: closeAdditionalCostModal,
                          class: "text-gray-400 hover:text-gray-600"
                        }, "×")
                      ]),
                      createVNode("form", {
                        onSubmit: withModifiers(submitAdditionalCost, ["prevent"])
                      }, [
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Jenis Biaya *"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(additionalCostForm).component_type = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          }, [
                            createVNode("option", { value: "operational_cost" }, "Biaya Operasional (Internal)"),
                            createVNode("option", { value: "reimbursement" }, "Reimbursement (Ter-tagih)")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(additionalCostForm).component_type]
                          ]),
                          createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Biaya operasional hanya memengaruhi profit. Reimbursement akan otomatis masuk ke invoice reimbursement. ")
                        ]),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Deskripsi *"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(additionalCostForm).description = $event,
                            type: "text",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500",
                            placeholder: "Contoh: Admin Bank",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(additionalCostForm).description]
                          ]),
                          unref(additionalCostForm).errors.description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-600 mt-1"
                          }, toDisplayString(unref(additionalCostForm).errors.description), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Nominal *"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(additionalCostForm).amount = $event,
                            type: "number",
                            min: "0",
                            step: "0.01",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500",
                            placeholder: "0",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(additionalCostForm).amount]
                          ]),
                          unref(additionalCostForm).errors.amount ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-600 mt-1"
                          }, toDisplayString(unref(additionalCostForm).errors.amount), 1)) : createCommentVNode("", true)
                        ]),
                        shouldShowCategoryField.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-4"
                        }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Kategori Biaya *"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(additionalCostForm).category_id = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500",
                            required: shouldShowCategoryField.value
                          }, [
                            createVNode("option", { value: "" }, "-- Pilih Kategori --"),
                            (openBlock(true), createBlock(Fragment, null, renderList(operationalCostCategories.value, (category) => {
                              return openBlock(), createBlock("option", {
                                key: category.id,
                                value: String(category.id)
                              }, toDisplayString(category.name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue", "required"]), [
                            [vModelSelect, unref(additionalCostForm).category_id]
                          ]),
                          unref(additionalCostForm).errors.category_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-600 mt-1"
                          }, toDisplayString(unref(additionalCostForm).errors.category_id), 1)) : createCommentVNode("", true)
                        ])) : isCategoryLocked.value && unref(additionalCostForm).category_id ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mb-4"
                        }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Kategori Biaya"),
                          createVNode("div", { class: "px-3 py-2 rounded-md border border-gray-200 bg-gray-50 text-gray-700" }, toDisplayString(getCategoryNameById(unref(additionalCostForm).category_id) || "Mengikuti komponen"), 1),
                          createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Kategori mengikuti komponen yang sedang dibuka.")
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Vendor / Penerima"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(additionalCostForm).vendor_id = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                          }, [
                            createVNode("option", { value: "" }, "-- Internal (Divisi Operational) --"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors, (vendor) => {
                              return openBlock(), createBlock("option", {
                                key: vendor.id,
                                value: String(vendor.id)
                              }, toDisplayString(vendor.nama_vendor), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(additionalCostForm).vendor_id]
                          ]),
                          unref(additionalCostForm).errors.vendor_id ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-600 mt-1"
                          }, toDisplayString(unref(additionalCostForm).errors.vendor_id), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "mb-4" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Catatan"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(additionalCostForm).notes = $event,
                            rows: "3",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500",
                            placeholder: "Catatan tambahan"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(additionalCostForm).notes]
                          ]),
                          unref(additionalCostForm).errors.notes ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-red-600 mt-1"
                          }, toDisplayString(unref(additionalCostForm).errors.notes), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "flex justify-end space-x-3" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: closeAdditionalCostModal,
                            class: "px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                          }, " Batal "),
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(additionalCostForm).processing,
                            class: "px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                          }, toDisplayString(unref(additionalCostForm).processing ? "Menyimpan..." : "Simpan Biaya"), 9, ["disabled"])
                        ])
                      ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/AccountPayables/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
