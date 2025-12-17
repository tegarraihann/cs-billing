import { ref, reactive, computed, watch, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, createTextVNode, openBlock, Fragment, renderList, withModifiers, withDirectives, vModelSelect, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BDTNgS_F.js";
import { ArrowLeft, FileText, CreditCard } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-C7BgyxQX.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    receivable: Object,
    bankAccounts: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const showPaymentModal = ref(false);
    const processing = ref(false);
    const postingVat = ref(false);
    const amountError = ref("");
    const paymentForm = reactive({
      amount: "",
      payment_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      bank_account_id: "",
      notes: "",
      component_id: ""
    });
    const componentOptions = computed(() => (props.receivable.components || []).map((component) => ({
      ...component,
      id: Number(component.id),
      amount: parseFloat(component.amount || 0),
      paid_amount: parseFloat(component.paid_amount || 0),
      outstanding_amount: parseFloat(component.outstanding_amount || 0)
    })));
    const isPaymentDisabled = computed(() => {
      if (processing.value) return true;
      const hasMultiple = componentOptions.value.length > 1;
      if (hasMultiple && !paymentForm.component_id) return true;
      if (!paymentForm.amount || parseFloat(paymentForm.amount) <= 0) return true;
      if (!paymentForm.payment_date) return true;
      if (!paymentForm.bank_account_id) return true;
      return false;
    });
    const hasMultipleComponents = computed(() => componentOptions.value.length > 1);
    const selectedComponent = computed(() => {
      const id = paymentForm.component_id ? Number(paymentForm.component_id) : null;
      if (!id && componentOptions.value.length === 1) {
        return componentOptions.value[0];
      }
      return componentOptions.value.find((component) => component.id === id) || null;
    });
    const canPostVat = computed(() => {
      var _a, _b;
      return (((_a = props.receivable) == null ? void 0 : _a.outstanding_amount) || 0) > 0 && ((_b = props.receivable) == null ? void 0 : _b.status) !== "paid";
    });
    const getComponentLabel = (type) => {
      return type === "debit_note" ? "Debit Note" : "Invoice Main";
    };
    watch(componentOptions, (options) => {
      if (!showPaymentModal.value) {
        return;
      }
      if (!options.length) {
        paymentForm.component_id = "";
        return;
      }
      const currentId = paymentForm.component_id ? Number(paymentForm.component_id) : null;
      if (!currentId || !options.find((component) => component.id === currentId)) {
        const defaultComponent = options.find((component) => parseFloat(component.outstanding_amount || 0) > 0) || options[0];
        paymentForm.component_id = defaultComponent ? String(defaultComponent.id) : "";
      }
    }, { immediate: true });
    watch(
      () => paymentForm.component_id,
      () => {
        amountError.value = "";
        if (hasMultipleComponents.value && !paymentForm.component_id) {
          paymentForm.amount = "";
          return;
        }
        if (paymentForm.amount) {
          validateAmount();
        }
      },
      { immediate: true }
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
        partial: "Partial Payment",
        overdue: "Overdue",
        paid: "Paid"
      };
      return texts[status] || status;
    };
    const getInvoiceStatusClass = (status) => {
      const classes = {
        draft: "bg-gray-100 text-gray-800",
        sent: "bg-blue-100 text-blue-800",
        paid: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const goBack = () => {
      router.visit(route("admin-keuangan.account-receivables.index"));
    };
    const openPaymentModal = () => {
      paymentForm.amount = "";
      paymentForm.bank_account_id = "";
      paymentForm.notes = "";
      paymentForm.component_id = hasMultipleComponents.value ? "" : componentOptions.value[0] ? String(componentOptions.value[0].id) : "";
      amountError.value = "";
      showPaymentModal.value = true;
    };
    const closePaymentModal = () => {
      showPaymentModal.value = false;
      amountError.value = "";
      paymentForm.component_id = "";
    };
    const formatAmountInput = (event) => {
      amountError.value = "";
      if (hasMultipleComponents.value && !paymentForm.component_id) {
        amountError.value = "Pilih komponen terlebih dahulu";
        paymentForm.amount = "";
        return;
      }
      let value = event.target.value;
      value = value.replace(/[^\d.,]/g, "");
      paymentForm.amount = value;
    };
    const validateAmount = () => {
      if (hasMultipleComponents.value && !paymentForm.component_id) {
        amountError.value = "Pilih komponen terlebih dahulu";
        return;
      }
      let value = paymentForm.amount.toString().trim();
      if (!value) {
        amountError.value = "Amount is required";
        return;
      }
      let normalizedValue = value;
      if (value.includes(".") && value.includes(",")) {
        normalizedValue = value.replace(/\./g, "").replace(",", ".");
      } else if (value.includes(".") && !value.includes(",")) {
        const parts = value.split(".");
        if (parts.length === 2) {
          const decimalPart = parts[1];
          if (decimalPart.length <= 2 && parseInt(decimalPart) < 100 && parts[0].length <= 4) {
            normalizedValue = value;
          } else {
            normalizedValue = value.replace(/\./g, "");
          }
        } else {
          normalizedValue = value.replace(/\./g, "");
        }
      } else if (value.includes(",")) {
        normalizedValue = value.replace(",", ".");
      }
      const numericValue = parseFloat(normalizedValue);
      if (isNaN(numericValue) || numericValue <= 0) {
        amountError.value = "Please enter a valid amount";
        return;
      }
      const outstandingLimit = selectedComponent.value ? parseFloat(selectedComponent.value.outstanding_amount || 0) : props.receivable.outstanding_amount;
      if (numericValue > outstandingLimit) {
        const label = selectedComponent.value ? getComponentLabel(selectedComponent.value.component_type) : "invoice";
        amountError.value = `Amount cannot exceed outstanding balance for ${label} (Rp ${formatNumber(outstandingLimit)})`;
        return;
      }
      paymentForm.amount = normalizedValue;
      amountError.value = "";
    };
    const recordPayment = () => {
      validateAmount();
      if (amountError.value) {
        return;
      }
      processing.value = true;
      router.post(
        route("admin-keuangan.account-receivables.record-payment", props.receivable.id),
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
    const generateSOA = () => {
      if (!props.receivable.customer) {
        alert("Customer information not available");
        return;
      }
      window.open(
        route("admin-keuangan.account-receivables.generate-soa", props.receivable.customer.id),
        "_blank"
      );
    };
    const postVatPayable = () => {
      if (!canPostVat.value || postingVat.value) {
        return;
      }
      const ok = window.confirm("Post outstanding ke VAT Payable dan tutup piutang?");
      if (!ok) {
        return;
      }
      postingVat.value = true;
      router.post(
        route("admin-keuangan.account-receivables.post-vat", props.receivable.id),
        {},
        {
          onFinish: () => {
            postingVat.value = false;
          }
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Detail Piutang" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div class="flex items-center space-x-3"${_scopeId}><button class="text-gray-400 hover:text-gray-600"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-6 h-6" }, null, _parent2, _scopeId));
            _push2(`</button><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Detail Piutang</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Invoice ${ssrInterpolate(__props.receivable.invoice_number)}</p></div></div><div class="flex items-center space-x-3"${_scopeId}><span class="${ssrRenderClass([getStatusClass(__props.receivable.status), "inline-flex px-3 py-1 text-sm font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(__props.receivable.status))} `);
            if (__props.receivable.days_overdue > 0) {
              _push2(`<span class="ml-1"${_scopeId}> (${ssrInterpolate(__props.receivable.days_overdue)} hari overdue) </span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span>`);
            if (canPostVat.value) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-amber-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-700 focus:bg-amber-700 active:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition ease-in-out duration-150"${ssrIncludeBooleanAttr(postingVat.value) ? " disabled" : ""}${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(postingVat.value ? "Posting..." : "Post VAT Payable")}</button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.receivable.status !== "paid") {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CreditCard), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Record Payment </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.receivable.customer) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-150"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Generate SOA </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}>Informasi Invoice</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Invoice Number</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.invoice_number)}</p></div><div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Invoice Date</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(__props.receivable.invoice_date))}</p></div>`);
            if (__props.receivable.due_date) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Due Date</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(__props.receivable.due_date))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.receivable.payment_terms_days) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Payment Terms</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.payment_terms_days)} hari</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>SO Number</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_a = __props.receivable.sales_order) == null ? void 0 : _a.order_number) || "-")}</p></div>`);
            if (__props.receivable.last_payment_date) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Last Payment</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDateTime(__props.receivable.last_payment_date))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.receivable.creator) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Created By</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.creator.name)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Informasi Customer</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><div class="space-y-3"${_scopeId}><div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Company Name</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_b = __props.receivable.customer) == null ? void 0 : _b.company_name) || __props.receivable.customer_name)}</p></div>`);
            if ((_c = __props.receivable.customer) == null ? void 0 : _c.address) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>Address</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.customer.address)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><div class="space-y-3"${_scopeId}>`);
            if ((_d = __props.receivable.customer) == null ? void 0 : _d.pic_name) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>PIC Name</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.customer.pic_name)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_e = __props.receivable.customer) == null ? void 0 : _e.pic_phone) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>PIC Phone</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.customer.pic_phone)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_f = __props.receivable.customer) == null ? void 0 : _f.pic_email) {
              _push2(`<div${_scopeId}><label class="text-sm font-medium text-gray-500"${_scopeId}>PIC Email</label><p class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.customer.pic_email)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Ringkasan Keuangan</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6"${_scopeId}><div class="bg-blue-50 p-4 rounded-lg border border-blue-200"${_scopeId}><div class="text-sm font-medium text-blue-600 mb-1"${_scopeId}>Invoice Amount</div><div class="text-xl font-bold text-blue-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.receivable.invoice_amount))}</div></div><div class="bg-green-50 p-4 rounded-lg border border-green-200"${_scopeId}><div class="text-sm font-medium text-green-600 mb-1"${_scopeId}>Paid Amount</div><div class="text-xl font-bold text-green-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.receivable.paid_amount))}</div></div><div class="bg-yellow-50 p-4 rounded-lg border border-yellow-200"${_scopeId}><div class="text-sm font-medium text-yellow-600 mb-1"${_scopeId}>Outstanding Amount</div><div class="text-xl font-bold text-yellow-900"${_scopeId}> Rp ${ssrInterpolate(formatNumber(__props.receivable.outstanding_amount))}</div></div></div></div>`);
            if (componentOptions.value.length) {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Rincian Komponen Piutang</h2><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Komponen </th><th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Nilai Invoice </th><th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Terbayar </th><th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Outstanding </th><th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(componentOptions.value, (component) => {
                _push2(`<tr${_scopeId}><td class="px-4 py-3 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(getComponentLabel(component.component_type))}</td><td class="px-4 py-3 text-sm text-gray-900 text-right"${_scopeId}> Rp ${ssrInterpolate(formatNumber(component.amount))}</td><td class="px-4 py-3 text-sm text-gray-900 text-right"${_scopeId}> Rp ${ssrInterpolate(formatNumber(component.paid_amount))}</td><td class="px-4 py-3 text-sm text-gray-900 text-right"${_scopeId}> Rp ${ssrInterpolate(formatNumber(component.outstanding_amount))}</td><td class="px-4 py-3 text-sm text-right"${_scopeId}><span class="${ssrRenderClass([getStatusClass(component.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(component.status))}</span></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.receivable.notes) {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6 mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Notes</h2><div class="bg-gray-50 p-4 rounded-md"${_scopeId}><p class="text-sm text-gray-700 whitespace-pre-line"${_scopeId}>${ssrInterpolate(__props.receivable.notes)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.receivable.invoice) {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 mb-4"${_scopeId}>Related Invoice</h2><div class="border border-gray-200 rounded-lg p-4"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><div${_scopeId}><p class="font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.receivable.invoice.invoice_number)}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(__props.receivable.invoice.invoice_date))}</p></div><div class="text-right"${_scopeId}><p class="font-medium text-gray-900"${_scopeId}>Rp ${ssrInterpolate(formatNumber(__props.receivable.invoice.total))}</p><span class="${ssrRenderClass([getInvoiceStatusClass(__props.receivable.invoice.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(__props.receivable.invoice.status)}</span></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (showPaymentModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"${_scopeId}><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"${_scopeId}><div class="mt-3"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Record Payment</h3><div class="mb-4 bg-gray-50 p-3 rounded-md"${_scopeId}><p class="text-sm text-gray-600"${_scopeId}>Invoice: ${ssrInterpolate(__props.receivable.invoice_number)}</p>`);
              if (selectedComponent.value) {
                _push2(`<p class="text-sm text-gray-600"${_scopeId}> Komponen: ${ssrInterpolate(getComponentLabel(selectedComponent.value.component_type))}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="text-sm text-gray-600"${_scopeId}> Outstanding: Rp ${ssrInterpolate(formatNumber(
                selectedComponent.value ? selectedComponent.value.outstanding_amount : __props.receivable.outstanding_amount
              ))}</p></div><form${_scopeId}>`);
              if (hasMultipleComponents.value) {
                _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Komponen Pembayaran *</label><select required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(paymentForm.component_id) ? ssrLooseContain(paymentForm.component_id, "") : ssrLooseEqual(paymentForm.component_id, "")) ? " selected" : ""}${_scopeId}>Pilih Komponen</option><!--[-->`);
                ssrRenderList(componentOptions.value, (component) => {
                  _push2(`<option${ssrRenderAttr("value", component.id)}${ssrIncludeBooleanAttr(Array.isArray(paymentForm.component_id) ? ssrLooseContain(paymentForm.component_id, component.id) : ssrLooseEqual(paymentForm.component_id, component.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(getComponentLabel(component.component_type))} - Outstanding Rp ${ssrInterpolate(formatNumber(component.outstanding_amount))}</option>`);
                });
                _push2(`<!--]--></select></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Amount *</label><input${ssrRenderAttr("value", paymentForm.amount)} type="text" required${ssrIncludeBooleanAttr(hasMultipleComponents.value && !paymentForm.component_id) ? " disabled" : ""} class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Enter payment amount (e.g., 2500 or 2.500)"${_scopeId}>`);
              if (amountError.value) {
                _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(amountError.value)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Payment Date *</label><input${ssrRenderAttr("value", paymentForm.payment_date)} type="date" required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}></div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Bank Account *</label><select required class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(paymentForm.bank_account_id) ? ssrLooseContain(paymentForm.bank_account_id, "") : ssrLooseEqual(paymentForm.bank_account_id, "")) ? " selected" : ""}${_scopeId}>Select Bank Account</option><!--[-->`);
              ssrRenderList(__props.bankAccounts, (bank) => {
                _push2(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(paymentForm.bank_account_id) ? ssrLooseContain(paymentForm.bank_account_id, bank.id) : ssrLooseEqual(paymentForm.bank_account_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} - ${ssrInterpolate(bank.account_number)}</option>`);
              });
              _push2(`<!--]--></select></div><div class="mb-4"${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Notes</label><textarea rows="3" class="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" placeholder="Payment notes (optional)"${_scopeId}>${ssrInterpolate(paymentForm.notes)}</textarea></div><div class="flex justify-end space-x-3"${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"${_scopeId}> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(isPaymentDisabled.value) ? " disabled" : ""} class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"${_scopeId}>${ssrInterpolate(processing.value ? "Recording..." : "Record Payment")}</button></div></form></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Detail Piutang" }),
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
                        createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Detail Piutang"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Invoice " + toDisplayString(__props.receivable.invoice_number), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center space-x-3" }, [
                      createVNode("span", {
                        class: [getStatusClass(__props.receivable.status), "inline-flex px-3 py-1 text-sm font-semibold rounded-full"]
                      }, [
                        createTextVNode(toDisplayString(getStatusText(__props.receivable.status)) + " ", 1),
                        __props.receivable.days_overdue > 0 ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "ml-1"
                        }, " (" + toDisplayString(__props.receivable.days_overdue) + " hari overdue) ", 1)) : createCommentVNode("", true)
                      ], 2),
                      canPostVat.value ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: postVatPayable,
                        class: "inline-flex items-center px-4 py-2 bg-amber-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-700 focus:bg-amber-700 active:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition ease-in-out duration-150",
                        disabled: postingVat.value
                      }, [
                        createVNode(unref(FileText), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" " + toDisplayString(postingVat.value ? "Posting..." : "Post VAT Payable"), 1)
                      ], 8, ["disabled"])) : createCommentVNode("", true),
                      __props.receivable.status !== "paid" ? (openBlock(), createBlock("button", {
                        key: 1,
                        onClick: openPaymentModal,
                        class: "inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, [
                        createVNode(unref(CreditCard), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Record Payment ")
                      ])) : createCommentVNode("", true),
                      __props.receivable.customer ? (openBlock(), createBlock("button", {
                        key: 2,
                        onClick: generateSOA,
                        class: "inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, [
                        createVNode(unref(FileText), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Generate SOA ")
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Informasi Invoice"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Invoice Number"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.invoice_number), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Invoice Date"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(__props.receivable.invoice_date)), 1)
                            ]),
                            __props.receivable.due_date ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Due Date"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(__props.receivable.due_date)), 1)
                            ])) : createCommentVNode("", true),
                            __props.receivable.payment_terms_days ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Payment Terms"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.payment_terms_days) + " hari", 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "SO Number"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(((_g = __props.receivable.sales_order) == null ? void 0 : _g.order_number) || "-"), 1)
                            ]),
                            __props.receivable.last_payment_date ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Last Payment"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(formatDateTime(__props.receivable.last_payment_date)), 1)
                            ])) : createCommentVNode("", true),
                            __props.receivable.creator ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Created By"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.creator.name), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Informasi Customer"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Company Name"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(((_h = __props.receivable.customer) == null ? void 0 : _h.company_name) || __props.receivable.customer_name), 1)
                            ]),
                            ((_i = __props.receivable.customer) == null ? void 0 : _i.address) ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Address"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.customer.address), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "space-y-3" }, [
                            ((_j = __props.receivable.customer) == null ? void 0 : _j.pic_name) ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "PIC Name"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.customer.pic_name), 1)
                            ])) : createCommentVNode("", true),
                            ((_k = __props.receivable.customer) == null ? void 0 : _k.pic_phone) ? (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "PIC Phone"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.customer.pic_phone), 1)
                            ])) : createCommentVNode("", true),
                            ((_l = __props.receivable.customer) == null ? void 0 : _l.pic_email) ? (openBlock(), createBlock("div", { key: 2 }, [
                              createVNode("label", { class: "text-sm font-medium text-gray-500" }, "PIC Email"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.receivable.customer.pic_email), 1)
                            ])) : createCommentVNode("", true)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Ringkasan Keuangan"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                        createVNode("div", { class: "bg-blue-50 p-4 rounded-lg border border-blue-200" }, [
                          createVNode("div", { class: "text-sm font-medium text-blue-600 mb-1" }, "Invoice Amount"),
                          createVNode("div", { class: "text-xl font-bold text-blue-900" }, " Rp " + toDisplayString(formatNumber(__props.receivable.invoice_amount)), 1)
                        ]),
                        createVNode("div", { class: "bg-green-50 p-4 rounded-lg border border-green-200" }, [
                          createVNode("div", { class: "text-sm font-medium text-green-600 mb-1" }, "Paid Amount"),
                          createVNode("div", { class: "text-xl font-bold text-green-900" }, " Rp " + toDisplayString(formatNumber(__props.receivable.paid_amount)), 1)
                        ]),
                        createVNode("div", { class: "bg-yellow-50 p-4 rounded-lg border border-yellow-200" }, [
                          createVNode("div", { class: "text-sm font-medium text-yellow-600 mb-1" }, "Outstanding Amount"),
                          createVNode("div", { class: "text-xl font-bold text-yellow-900" }, " Rp " + toDisplayString(formatNumber(__props.receivable.outstanding_amount)), 1)
                        ])
                      ])
                    ]),
                    componentOptions.value.length ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white rounded-lg shadow-sm p-6 mb-6"
                    }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Rincian Komponen Piutang"),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", { class: "px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Komponen "),
                              createVNode("th", { class: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Nilai Invoice "),
                              createVNode("th", { class: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Terbayar "),
                              createVNode("th", { class: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Outstanding "),
                              createVNode("th", { class: "px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(componentOptions.value, (component) => {
                              return openBlock(), createBlock("tr", {
                                key: component.id
                              }, [
                                createVNode("td", { class: "px-4 py-3 text-sm text-gray-900" }, toDisplayString(getComponentLabel(component.component_type)), 1),
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
                    __props.receivable.notes ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "bg-white rounded-lg shadow-sm p-6 mb-6"
                    }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Notes"),
                      createVNode("div", { class: "bg-gray-50 p-4 rounded-md" }, [
                        createVNode("p", { class: "text-sm text-gray-700 whitespace-pre-line" }, toDisplayString(__props.receivable.notes), 1)
                      ])
                    ])) : createCommentVNode("", true),
                    __props.receivable.invoice ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "bg-white rounded-lg shadow-sm p-6"
                    }, [
                      createVNode("h2", { class: "text-lg font-semibold text-gray-900 mb-4" }, "Related Invoice"),
                      createVNode("div", { class: "border border-gray-200 rounded-lg p-4" }, [
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "font-medium text-gray-900" }, toDisplayString(__props.receivable.invoice.invoice_number), 1),
                            createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(formatDate(__props.receivable.invoice.invoice_date)), 1)
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("p", { class: "font-medium text-gray-900" }, "Rp " + toDisplayString(formatNumber(__props.receivable.invoice.total)), 1),
                            createVNode("span", {
                              class: [getInvoiceStatusClass(__props.receivable.invoice.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                            }, toDisplayString(__props.receivable.invoice.status), 3)
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  showPaymentModal.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
                  }, [
                    createVNode("div", { class: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" }, [
                      createVNode("div", { class: "mt-3" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Record Payment"),
                        createVNode("div", { class: "mb-4 bg-gray-50 p-3 rounded-md" }, [
                          createVNode("p", { class: "text-sm text-gray-600" }, "Invoice: " + toDisplayString(__props.receivable.invoice_number), 1),
                          selectedComponent.value ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-gray-600"
                          }, " Komponen: " + toDisplayString(getComponentLabel(selectedComponent.value.component_type)), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "text-sm text-gray-600" }, " Outstanding: Rp " + toDisplayString(formatNumber(
                            selectedComponent.value ? selectedComponent.value.outstanding_amount : __props.receivable.outstanding_amount
                          )), 1)
                        ]),
                        createVNode("form", {
                          onSubmit: withModifiers(recordPayment, ["prevent"])
                        }, [
                          hasMultipleComponents.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-4"
                          }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Komponen Pembayaran *"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => paymentForm.component_id = $event,
                              required: "",
                              class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            }, [
                              createVNode("option", { value: "" }, "Pilih Komponen"),
                              (openBlock(true), createBlock(Fragment, null, renderList(componentOptions.value, (component) => {
                                return openBlock(), createBlock("option", {
                                  key: component.id,
                                  value: component.id
                                }, toDisplayString(getComponentLabel(component.component_type)) + " - Outstanding Rp " + toDisplayString(formatNumber(component.outstanding_amount)), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, paymentForm.component_id]
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Amount *"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => paymentForm.amount = $event,
                              type: "text",
                              onInput: formatAmountInput,
                              onBlur: validateAmount,
                              required: "",
                              disabled: hasMultipleComponents.value && !paymentForm.component_id,
                              class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                              placeholder: "Enter payment amount (e.g., 2500 or 2.500)"
                            }, null, 40, ["onUpdate:modelValue", "disabled"]), [
                              [vModelText, paymentForm.amount]
                            ]),
                            amountError.value ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "mt-1 text-sm text-red-600"
                            }, toDisplayString(amountError.value), 1)) : createCommentVNode("", true)
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
                            ])
                          ]),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Bank Account *"),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => paymentForm.bank_account_id = $event,
                              required: "",
                              class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            }, [
                              createVNode("option", { value: "" }, "Select Bank Account"),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.bankAccounts, (bank) => {
                                return openBlock(), createBlock("option", {
                                  key: bank.id,
                                  value: bank.id
                                }, toDisplayString(bank.bank_name) + " - " + toDisplayString(bank.account_number), 9, ["value"]);
                              }), 128))
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, paymentForm.bank_account_id]
                            ])
                          ]),
                          createVNode("div", { class: "mb-4" }, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Notes"),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => paymentForm.notes = $event,
                              rows: "3",
                              class: "w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
                              placeholder: "Payment notes (optional)"
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
                              disabled: isPaymentDisabled.value,
                              class: "px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            }, toDisplayString(processing.value ? "Recording..." : "Record Payment"), 9, ["disabled"])
                          ])
                        ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/AccountReceivables/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
