import { ref, reactive, computed, watch, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, Fragment, renderList, withModifiers, withDirectives, vModelText, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-1gZAo0_N.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DLLX4jgl.js";
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
    const reimbursementPaymentForm = useForm({
      status: "paid",
      vendor_name: "",
      paid_at: "",
      notes: ""
    });
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.invoices.index": "/admin-keuangan/invoices",
        "admin-keuangan.invoices.edit": (id) => `/admin-keuangan/invoices/${id}/edit`,
        "admin-keuangan.invoices.pdf": (id) => `/admin-keuangan/invoices/${id}/pdf`,
        "admin-keuangan.invoices.confirm-payment": (id) => `/admin-keuangan/invoices/${id}/confirm-payment`,
        "admin-keuangan.invoices.mark-sent": (id) => `/admin-keuangan/invoices/${id}/mark-sent`,
        "admin-keuangan.invoices.post-to-profit-loss": (id) => `/admin-keuangan/invoices/${id}/post-to-profit-loss`,
        "admin-keuangan.invoices.unpost-from-profit-loss": (id) => `/admin-keuangan/invoices/${id}/unpost-from-profit-loss`,
        "admin-keuangan.invoices.profit-loss-periods": "/admin-keuangan/invoices/profit-loss-periods",
        "admin-keuangan.invoices.reimbursement-items.update-payment": (value) => {
          if (Array.isArray(value)) {
            const [invoiceId, itemId] = value;
            return `/admin-keuangan/invoices/${invoiceId}/reimbursement-items/${itemId}/update-payment`;
          }
          if (typeof value === "object" && value !== null) {
            const invoiceId = value.invoice || value.id;
            const itemId = value.reimbursementItem || value.item;
            return `/admin-keuangan/invoices/${invoiceId}/reimbursement-items/${itemId}/update-payment`;
          }
          return "#";
        }
      };
      return typeof routes[name] === "function" ? routes[name](params) : routes[name] || "#";
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      return new Date(dateString).toLocaleDateString("id-ID");
    };
    const formatPeriodLabel = (period) => {
      if (!period || typeof period !== "object") {
        return "Periode";
      }
      const name = period.period_name || period.name || period.period_code || `Periode ${period.id ?? ""}`.trim();
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
      return normalizedReimbursementEntries.value.filter((item) => {
        const status = (item.status || "").toLowerCase();
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
    const openReimbursementPaymentModal = (entry) => {
      if (!(entry == null ? void 0 : entry.id)) {
        return;
      }
      selectedReimbursementEntry.value = entry;
      reimbursementPaymentForm.reset();
      reimbursementPaymentForm.status = "paid";
      reimbursementPaymentForm.vendor_name = entry.vendor_name || "Eshaka Wijaya Logistics";
      reimbursementPaymentForm.paid_at = entry.paid_at ? entry.paid_at.split(" ")[0] : (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      reimbursementPaymentForm.notes = entry.notes || "";
      showReimbursementPaymentModal.value = true;
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
        route("admin-keuangan.invoices.reimbursement-items.update-payment", [props.invoice.id, selectedReimbursementEntry.value.id]),
        {
          preserveScroll: true,
          onSuccess: () => {
            closeReimbursementPaymentModal();
          }
        }
      );
    };
    const isMainInvoiceItem = (item) => {
      if (!item) {
        return false;
      }
      const itemType = (item.item_type || "").toLowerCase();
      const includeInInvoice = item.include_in_customer_invoice ?? true;
      const hiddenFromCustomer = item.is_hidden_from_customer ?? false;
      if (!includeInInvoice || hiddenFromCustomer) {
        return false;
      }
      if (itemType === "operational_cost" || itemType === "reimbursement") {
        return false;
      }
      if (itemType === "billable" || itemType === "") {
        return true;
      }
      const ref2 = (item.item_ref || "").toLowerCase().trim();
      return !ref2 || ref2 === "main" || ref2 === "m" || ref2 === "1" || ref2.includes("main");
    };
    const filterMainInvoiceItems = (items = []) => {
      return (items || []).filter(isMainInvoiceItem);
    };
    const getMainItems = computed(() => {
      var _a;
      if (props.invoice.invoice_type === "combined") {
        if ((_a = props.mainInvoice) == null ? void 0 : _a.items) {
          return filterMainInvoiceItems(props.mainInvoice.items);
        }
        return filterMainInvoiceItems(props.invoice.items);
      }
      if (props.mainInvoice) {
        return filterMainInvoiceItems(props.mainInvoice.items);
      }
      if (props.invoice.invoice_type === "main") {
        return filterMainInvoiceItems(props.invoice.items);
      }
      return [];
    });
    const getReimbursementItems = computed(() => {
      if (props.invoice.invoice_type === "combined") {
        return (props.invoice.items || []).filter((item) => {
          if (item.item_type === "reimbursement") {
            return true;
          }
          if (!item.item_type || item.item_type === null) {
            const ref2 = (item.item_ref || "").toLowerCase().trim();
            return ref2 === "reimbursement" || ref2 === "r" || ref2 === "2" || ref2.includes("reimbur");
          }
          return false;
        });
      }
      if (props.reimbursementInvoice) {
        return props.reimbursementInvoice.items || [];
      }
      if (props.invoice.invoice_type === "reimbursement") {
        return props.invoice.items || [];
      }
      return [];
    });
    const getMainTotal = computed(() => {
      return getMainItems.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
    });
    const getReimbursementTotal = computed(() => {
      return getReimbursementItems.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
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
      return filteredReimbursementEntries.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
    });
    const reimbursementOverallSubtotal = computed(() => {
      if (!hasReimbursementEntries.value) {
        return getReimbursementTotal.value;
      }
      return normalizedReimbursementEntries.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
    });
    const reimbursementSubtotalLabel = computed(() => {
      if (!hasReimbursementEntries.value || reimbursementFilter.value === "all") {
        return "Subtotal Reimbursement";
      }
      return "Subtotal (Sesuai Filter)";
    });
    const getReimbursementStatusLabel = (status) => {
      const labels = {
        pending: "Belum Diproses",
        linked: "Tertaut",
        invoiced: "Ditagihkan",
        paid: "Sudah Dibayar"
      };
      if (!status) {
        return "Tidak Diketahui";
      }
      return labels[status] || status.charAt(0).toUpperCase() + status.slice(1);
    };
    const getReimbursementStatusColor = (status) => {
      const colors = {
        pending: "bg-yellow-100 text-yellow-800",
        linked: "bg-blue-100 text-blue-800",
        invoiced: "bg-orange-100 text-orange-800",
        paid: "bg-green-100 text-green-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
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
      return (props.invoice.items || []).filter((item) => {
        if (item.item_type !== "operational_cost") return false;
        const description = (item.description || "").toLowerCase();
        const itemRef = (item.item_ref || "").toLowerCase();
        const isBuyingCost = description.includes("buying cost") || description.includes("cogs") || itemRef.startsWith("cogs_vendor_");
        return !isBuyingCost;
      });
    });
    const getOperationalCostsTotal = computed(() => {
      return getOperationalCosts.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
    });
    const getAllOperationalCostsForCalculation = computed(() => {
      return (props.invoice.items || []).filter((item) => item.item_type === "operational_cost");
    });
    const getAllOperationalCostsTotal = computed(() => {
      return getAllOperationalCostsForCalculation.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
    });
    const getBillableItems = computed(() => {
      return filterMainInvoiceItems(props.invoice.items);
    });
    const getGrossRevenue = computed(() => {
      return getBillableItems.value.reduce((total, item) => total + (parseFloat(item.amount) || 0), 0);
    });
    const getNetProfit = computed(() => {
      return getGrossRevenue.value - getAllOperationalCostsTotal.value;
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
      if (confirm("Apakah Anda yakin ingin membatalkan posting ke laba rugi?")) {
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
      if (confirm("Menambahkan operational cost dari Sales Order vendor breakdown. Lanjutkan?")) {
        processing.value = true;
        router.post(route("admin-keuangan.invoices.fix-operational-costs", props.invoice.id), {}, {
          onSuccess: (page) => {
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
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-77086267${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-77086267${_scopeId}><div class="flex items-center justify-between" data-v-77086267${_scopeId}><div data-v-77086267${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-77086267${_scopeId}>Detail Invoice</h2><p class="text-sage-600" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.invoice_number)}</p></div><div class="flex space-x-3" data-v-77086267${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-77086267${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-77086267${_scopeId2}></path></svg> Kembali `);
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
                    _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-77086267${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-77086267${_scopeId2}></path></svg> Edit `);
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
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-77086267${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-77086267${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" data-v-77086267${_scopeId}></path></svg> Tandai Terkirim </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.invoice.status !== "paid") {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" data-v-77086267${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-77086267${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-77086267${_scopeId}></path></svg> Konfirmasi Pembayaran </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (shouldShowFixOperationalCostsButton.value) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors" data-v-77086267${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-77086267${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-77086267${_scopeId}></path></svg> Fix Operational Costs </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (shouldShowProfitLossButton.value) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors" data-v-77086267${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-77086267${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-77086267${_scopeId}></path></svg> Post ke Laba Rugi </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.invoice.posted_to_profit_loss) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors" data-v-77086267${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-77086267${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" data-v-77086267${_scopeId}></path></svg> Batal Post Laba Rugi </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" data-v-77086267${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-77086267${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-77086267${_scopeId}>Informasi Invoice</h3><div class="space-y-3" data-v-77086267${_scopeId}><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Nomor Invoice:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.invoice_number)}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Sales Order:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate((_a = __props.invoice.sales_order) == null ? void 0 : _a.order_number)}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Customer:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(((_b = __props.invoice.customer) == null ? void 0 : _b.consignee_shipper) || ((_c = __props.invoice.customer) == null ? void 0 : _c.company_name))}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Tanggal Invoice:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(formatDate(__props.invoice.invoice_date))}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Jatuh Tempo:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(formatDate(__props.invoice.due_date))}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Term:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.term_days)} Hari</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Status:</span><span class="${ssrRenderClass([getStatusColor(__props.invoice.status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-77086267${_scopeId}>${ssrInterpolate(getStatusLabel(__props.invoice.status))}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Payment Status:</span><span class="${ssrRenderClass([getPaymentStatusColor(__props.invoice), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-77086267${_scopeId}>${ssrInterpolate(getPaymentStatusLabel(__props.invoice))}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Status Laba Rugi:</span><span class="${ssrRenderClass([__props.invoice.posted_to_profit_loss ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.posted_to_profit_loss ? "Sudah Di-post" : "Belum Di-post")}</span></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-77086267${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-77086267${_scopeId}>Detail Pengiriman</h3><div class="space-y-3" data-v-77086267${_scopeId}><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Shipper:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.shipper || "-")}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Consignee:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.consignee || "-")}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Vessel:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.vessel || "-")}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Flight/VOY:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.flight_voy || "-")}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>AWB/BL No:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.awb_bl_no || "-")}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>POL/POD:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.pol_pod || "-")}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Origin:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.origin || "-")}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Destination:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.destination || "-")}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Gross Weight:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.gross_weight || "-")}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Volume:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.volume || "-")}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>No. of Packages:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.no_of_packages || "-")} ${ssrInterpolate(__props.invoice.package_unit || "BAG")}</span></div></div></div>`);
            if (__props.invoice.status === "paid") {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-77086267${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-77086267${_scopeId}>Informasi Pembayaran</h3><div class="space-y-3" data-v-77086267${_scopeId}><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Tanggal Dibayar:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(formatDate(__props.invoice.paid_date))}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Jumlah Dibayar:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(__props.invoice.paid_amount))}</span></div>`);
              if (__props.invoice.payment_method) {
                _push2(`<div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Metode Pembayaran:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.payment_method)}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Dikonfirmasi oleh:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(((_d = __props.invoice.confirmed_by) == null ? void 0 : _d.name) || "-")}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Waktu Konfirmasi:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(formatDateTime(__props.invoice.payment_confirmed_at))}</span></div>`);
              if (__props.invoice.payment_notes) {
                _push2(`<div class="pt-2" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Catatan:</span><p class="text-gray-900 mt-1" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.payment_notes)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.invoice.posted_to_profit_loss) {
              _push2(`<div class="bg-white rounded-lg shadow-sm p-6 border border-purple-200" data-v-77086267${_scopeId}><h3 class="text-lg font-semibold text-purple-800 mb-4" data-v-77086267${_scopeId}>Informasi Posting Laba Rugi</h3><div class="space-y-3" data-v-77086267${_scopeId}><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Status:</span><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800" data-v-77086267${_scopeId}> Sudah Di-post </span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Tanggal Posting:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(formatDateTime(__props.invoice.posted_to_profit_loss_at))}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Di-post oleh:</span><span class="font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(((_e = __props.invoice.posted_by_user) == null ? void 0 : _e.name) || "-")}</span></div>`);
              if (__props.invoice.profit_loss_entries && __props.invoice.profit_loss_entries.length > 0) {
                _push2(`<div class="pt-2" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Entry IDs:</span><p class="text-gray-900 mt-1 text-sm" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.profit_loss_entries.join(", "))}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.mainInvoice || __props.invoice.invoice_type === "main" || __props.invoice.invoice_type === "combined") {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6" data-v-77086267${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-blue-50" data-v-77086267${_scopeId}><div class="flex items-center justify-between" data-v-77086267${_scopeId}><div class="flex items-center space-x-3" data-v-77086267${_scopeId}><h3 class="text-lg font-semibold text-blue-800" data-v-77086267${_scopeId}>Items Invoice Main</h3><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800" data-v-77086267${_scopeId}>${ssrInterpolate((__props.mainInvoice || __props.invoice).invoice_number)}</span></div><div class="flex space-x-2" data-v-77086267${_scopeId}><a${ssrRenderAttr("href", unref(route)("admin-keuangan.invoices.preview-pdf", (__props.mainInvoice || __props.invoice).id))} class="inline-flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors" target="_blank" data-v-77086267${_scopeId}><svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-77086267${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-77086267${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-77086267${_scopeId}></path></svg> Preview PDF </a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.invoices.export-pdf", (__props.mainInvoice || __props.invoice).id))} class="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors" target="_blank" data-v-77086267${_scopeId}><svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-77086267${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" data-v-77086267${_scopeId}></path></svg> Download PDF </a></div></div></div><div class="overflow-x-auto" data-v-77086267${_scopeId}><table class="w-full" data-v-77086267${_scopeId}><thead class="bg-sage-50" data-v-77086267${_scopeId}><tr data-v-77086267${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Deskripsi </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Qty </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Unit </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Rate </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Currency </th><th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Amount </th></tr></thead><tbody class="bg-white divide-y divide-sage-200" data-v-77086267${_scopeId}><!--[-->`);
              ssrRenderList(getMainItems.value, (item) => {
                _push2(`<tr class="hover:bg-sage-50" data-v-77086267${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.description)}</div>`);
                if (getReimbursementLatestHistory(item)) {
                  _push2(`<div class="text-xs text-gray-500 mt-1 space-y-0.5" data-v-77086267${_scopeId}><div class="flex flex-wrap items-center gap-2" data-v-77086267${_scopeId}><span data-v-77086267${_scopeId}>Terakhir:</span><span class="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700" data-v-77086267${_scopeId}>${ssrInterpolate(getReimbursementStatusLabel(getReimbursementLatestHistory(item).status))}</span>`);
                  if (getReimbursementLatestHistory(item).vendor_name) {
                    _push2(`<span data-v-77086267${_scopeId}> oleh ${ssrInterpolate(getReimbursementLatestHistory(item).vendor_name)}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (getReimbursementLatestHistory(item).timestamp) {
                    _push2(`<span data-v-77086267${_scopeId}> (${ssrInterpolate(formatDate(getReimbursementLatestHistory(item).timestamp))}) </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                  if (getReimbursementLatestHistory(item).notes) {
                    _push2(`<div data-v-77086267${_scopeId}> Catatan: ${ssrInterpolate(getReimbursementLatestHistory(item).notes)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (getReimbursementLatestHistory(item).user) {
                    _push2(`<div data-v-77086267${_scopeId}> Diproses oleh: ${ssrInterpolate(getReimbursementLatestHistory(item).user)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(formatNumber(item.quantity))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.unit)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(item.rate, item.currency))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.currency)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right" data-v-77086267${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(item.amount, item.currency))}</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div><div class="px-6 py-4 bg-blue-50 border-t border-sage-200" data-v-77086267${_scopeId}><div class="flex justify-end" data-v-77086267${_scopeId}><div class="w-64 space-y-2" data-v-77086267${_scopeId}><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-sm text-gray-600" data-v-77086267${_scopeId}>Subtotal Main:</span><span class="text-sm font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getMainTotal.value))}</span></div><div class="flex justify-between pt-2 border-t border-blue-200" data-v-77086267${_scopeId}><span class="text-lg font-semibold text-blue-800" data-v-77086267${_scopeId}>Total Main:</span><span class="text-lg font-bold text-blue-800" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getMainTotal.value))}</span></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.reimbursementInvoice || __props.invoice.invoice_type === "reimbursement" || __props.invoice.invoice_type === "combined") {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6" data-v-77086267${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-orange-50" data-v-77086267${_scopeId}><div class="flex items-center justify-between" data-v-77086267${_scopeId}><div class="flex items-center space-x-3" data-v-77086267${_scopeId}><h3 class="text-lg font-semibold text-orange-800" data-v-77086267${_scopeId}>Items Invoice Reimbursement</h3><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800" data-v-77086267${_scopeId}>${ssrInterpolate((__props.reimbursementInvoice || __props.invoice).invoice_number)}</span></div><div class="flex space-x-2" data-v-77086267${_scopeId}><a${ssrRenderAttr("href", unref(route)("admin-keuangan.invoices.preview-pdf-reimbursement", (__props.reimbursementInvoice || __props.invoice).id))} class="inline-flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors" target="_blank" data-v-77086267${_scopeId}><svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-77086267${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-77086267${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-77086267${_scopeId}></path></svg> Preview PDF </a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.invoices.export-pdf-reimbursement", (__props.reimbursementInvoice || __props.invoice).id))} class="inline-flex items-center px-3 py-1.5 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors" target="_blank" data-v-77086267${_scopeId}><svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-77086267${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" data-v-77086267${_scopeId}></path></svg> Download PDF </a></div></div></div>`);
              if (hasReimbursementEntries.value) {
                _push2(`<div class="px-6 py-3 bg-white border-b border-sage-200 flex flex-wrap items-center gap-2" data-v-77086267${_scopeId}><span class="text-sm text-sage-600 mr-2" data-v-77086267${_scopeId}>Filter Status:</span><button type="button" class="${ssrRenderClass([reimbursementFilter.value === "all" ? "bg-orange-600 text-white border border-orange-600 shadow-sm" : "bg-white text-sage-700 border border-sage-200 hover:border-orange-300", "px-3 py-1.5 text-sm rounded-md transition-colors"])}" data-v-77086267${_scopeId}> Semua </button><button type="button" class="${ssrRenderClass([reimbursementFilter.value === "unpaid" ? "bg-orange-600 text-white border border-orange-600 shadow-sm" : "bg-white text-sage-700 border border-sage-200 hover:border-orange-300", "px-3 py-1.5 text-sm rounded-md transition-colors"])}" data-v-77086267${_scopeId}> Belum Dibayar </button><button type="button" class="${ssrRenderClass([reimbursementFilter.value === "paid" ? "bg-orange-600 text-white border border-orange-600 shadow-sm" : "bg-white text-sage-700 border border-sage-200 hover:border-orange-300", "px-3 py-1.5 text-sm rounded-md transition-colors"])}" data-v-77086267${_scopeId}> Sudah Dibayar </button></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (hasReimbursementEntries.value) {
                _push2(`<div class="overflow-x-auto" data-v-77086267${_scopeId}><table class="w-full" data-v-77086267${_scopeId}><thead class="bg-sage-50" data-v-77086267${_scopeId}><tr data-v-77086267${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Deskripsi </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Qty </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Unit </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Rate </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Currency </th><th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Amount </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Vendor </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Tanggal Bayar </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}></th></tr></thead><tbody class="bg-white divide-y divide-sage-200" data-v-77086267${_scopeId}>`);
                if (filteredReimbursementEntries.value.length === 0) {
                  _push2(`<tr data-v-77086267${_scopeId}><td colspan="10" class="px-6 py-6 text-center text-sm text-gray-500" data-v-77086267${_scopeId}> Tidak ada data reimbursement untuk filter ini. </td></tr>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--[-->`);
                ssrRenderList(filteredReimbursementEntries.value, (item) => {
                  _push2(`<tr class="hover:bg-sage-50" data-v-77086267${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.description)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(formatNumber(item.quantity))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.unit)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(item.rate, item.currency || reimbursementCurrency.value))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.currency || reimbursementCurrency.value)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right" data-v-77086267${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(item.amount, item.currency || reimbursementCurrency.value))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.vendor_name)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><span class="${ssrRenderClass([getReimbursementStatusColor(item.status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-77086267${_scopeId}>${ssrInterpolate(getReimbursementStatusLabel(item.status))}</span></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.paid_at ? formatDate(item.paid_at) : "-")}</div></td><td class="px-6 py-4 whitespace-nowrap text-right" data-v-77086267${_scopeId}>`);
                  if (item.can_update) {
                    _push2(`<button class="px-3 py-1.5 text-sm rounded-md border border-orange-500 text-orange-600 hover:bg-orange-50 transition-colors" data-v-77086267${_scopeId}>${ssrInterpolate(item.status === "paid" ? "Ubah Status" : "Tandai Dibayar")}</button>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div>`);
              } else {
                _push2(`<div class="overflow-x-auto" data-v-77086267${_scopeId}><table class="w-full" data-v-77086267${_scopeId}><thead class="bg-sage-50" data-v-77086267${_scopeId}><tr data-v-77086267${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Deskripsi </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Qty </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Unit </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Rate </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Currency </th><th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Amount </th></tr></thead><tbody class="bg-white divide-y divide-sage-200" data-v-77086267${_scopeId}><!--[-->`);
                ssrRenderList(getReimbursementItems.value, (item) => {
                  _push2(`<tr class="hover:bg-sage-50" data-v-77086267${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.description)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(formatNumber(item.quantity))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.unit)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(item.rate, item.currency))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.currency)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right" data-v-77086267${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(item.amount, item.currency))}</div></td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div>`);
              }
              _push2(`<div class="px-6 py-4 bg-orange-50 border-t border-sage-200" data-v-77086267${_scopeId}><div class="flex justify-end" data-v-77086267${_scopeId}><div class="w-64 space-y-2" data-v-77086267${_scopeId}><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-sm text-gray-600" data-v-77086267${_scopeId}>${ssrInterpolate(reimbursementSubtotalLabel.value)}</span><span class="text-sm font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(reimbursementFilteredSubtotal.value, reimbursementCurrency.value))}</span></div>`);
              if (hasReimbursementEntries.value && reimbursementFilter.value !== "all") {
                _push2(`<div class="text-xs text-gray-500 text-right" data-v-77086267${_scopeId}> Menampilkan ${ssrInterpolate(filteredReimbursementEntries.value.length)} dari ${ssrInterpolate(normalizedReimbursementEntries.value.length)} item </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-between pt-2 border-t border-orange-200" data-v-77086267${_scopeId}><span class="text-lg font-semibold text-orange-800" data-v-77086267${_scopeId}>Total Reimbursement:</span><span class="text-lg font-bold text-orange-800" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(reimbursementOverallSubtotal.value, reimbursementCurrency.value))}</span></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (getOperationalCosts.value.length > 0) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-red-200 overflow-hidden mb-6" data-v-77086267${_scopeId}><div class="px-6 py-4 border-b border-red-200 bg-red-50" data-v-77086267${_scopeId}><div class="flex items-center justify-between" data-v-77086267${_scopeId}><div class="flex items-center space-x-3" data-v-77086267${_scopeId}><h3 class="text-lg font-semibold text-red-800" data-v-77086267${_scopeId}>Biaya Lain / Operational Costs</h3><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800" data-v-77086267${_scopeId}> Internal Only </span></div><div class="text-sm text-red-600" data-v-77086267${_scopeId}> Tidak terlihat oleh customer </div></div></div><div class="overflow-x-auto" data-v-77086267${_scopeId}><table class="w-full" data-v-77086267${_scopeId}><thead class="bg-red-50" data-v-77086267${_scopeId}><tr data-v-77086267${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Deskripsi </th><th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Qty </th><th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Unit </th><th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Rate </th><th class="px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Currency </th><th class="px-6 py-3 text-right text-xs font-medium text-red-500 uppercase tracking-wider" data-v-77086267${_scopeId}> Amount </th></tr></thead><tbody class="bg-white divide-y divide-red-200" data-v-77086267${_scopeId}><!--[-->`);
              ssrRenderList(getOperationalCosts.value, (item) => {
                _push2(`<tr class="hover:bg-red-50" data-v-77086267${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.description)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(formatNumber(item.quantity))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.unit)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(item.rate, item.currency))}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-77086267${_scopeId}><div class="text-sm text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(item.currency)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right" data-v-77086267${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(item.amount, item.currency))}</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div><div class="px-6 py-4 bg-red-50 border-t border-red-200" data-v-77086267${_scopeId}><div class="flex justify-end" data-v-77086267${_scopeId}><div class="w-64 space-y-2" data-v-77086267${_scopeId}><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-sm text-gray-600" data-v-77086267${_scopeId}>Subtotal Biaya Lain:</span><span class="text-sm font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getOperationalCostsTotal.value))}</span></div><div class="flex justify-between pt-2 border-t border-red-200" data-v-77086267${_scopeId}><span class="text-lg font-semibold text-red-800" data-v-77086267${_scopeId}>Total Biaya Lain:</span><span class="text-lg font-bold text-red-800" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getOperationalCostsTotal.value))}</span></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white rounded-lg shadow-sm border border-purple-200 overflow-hidden mb-6" data-v-77086267${_scopeId}><div class="px-6 py-4 border-b border-purple-200 bg-purple-50" data-v-77086267${_scopeId}><div class="flex items-center justify-between" data-v-77086267${_scopeId}><div class="flex items-center space-x-3" data-v-77086267${_scopeId}><h3 class="text-lg font-semibold text-purple-800" data-v-77086267${_scopeId}>Analisis Profit</h3><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800" data-v-77086267${_scopeId}> Internal Analysis </span></div></div></div><div class="px-6 py-4" data-v-77086267${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" data-v-77086267${_scopeId}><div class="bg-green-50 rounded-lg p-4 border border-green-200" data-v-77086267${_scopeId}><div class="text-center" data-v-77086267${_scopeId}><div class="text-2xl font-bold text-green-800" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getGrossRevenue.value))}</div><div class="text-sm text-green-600 mt-1" data-v-77086267${_scopeId}>Gross Revenue</div><div class="text-xs text-gray-500 mt-1" data-v-77086267${_scopeId}>Total yang dapat ditagih</div></div></div><div class="bg-red-50 rounded-lg p-4 border border-red-200" data-v-77086267${_scopeId}><div class="text-center" data-v-77086267${_scopeId}><div class="text-2xl font-bold text-red-800" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getOperationalCostsTotal.value))}</div><div class="text-sm text-red-600 mt-1" data-v-77086267${_scopeId}>Operational Costs</div><div class="text-xs text-gray-500 mt-1" data-v-77086267${_scopeId}>Biaya operasional</div></div></div><div class="bg-orange-50 rounded-lg p-4 border border-orange-200" data-v-77086267${_scopeId}><div class="text-center" data-v-77086267${_scopeId}><div class="text-2xl font-bold text-orange-800" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getReimbursementTotal.value))}</div><div class="text-sm text-orange-600 mt-1" data-v-77086267${_scopeId}>Reimbursement</div><div class="text-xs text-gray-500 mt-1" data-v-77086267${_scopeId}>Cost Neutral</div></div></div><div class="bg-blue-50 rounded-lg p-4 border border-blue-200" data-v-77086267${_scopeId}><div class="text-center" data-v-77086267${_scopeId}><div class="text-2xl font-bold text-blue-800" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getNetProfit.value))}</div><div class="text-sm text-blue-600 mt-1" data-v-77086267${_scopeId}>Net Profit</div><div class="text-xs text-gray-500 mt-1" data-v-77086267${_scopeId}>Keuntungan bersih</div></div></div><div class="bg-purple-50 rounded-lg p-4 border border-purple-200" data-v-77086267${_scopeId}><div class="text-center" data-v-77086267${_scopeId}><div class="text-2xl font-bold text-purple-800" data-v-77086267${_scopeId}>${ssrInterpolate(getProfitMargin.value)}%</div><div class="text-sm text-purple-600 mt-1" data-v-77086267${_scopeId}>Profit Margin</div><div class="text-xs text-gray-500 mt-1" data-v-77086267${_scopeId}>Persentase keuntungan</div></div></div></div><div class="mt-6 bg-gray-50 rounded-lg p-4" data-v-77086267${_scopeId}><h4 class="text-sm font-semibold text-gray-800 mb-3" data-v-77086267${_scopeId}>Detail Perhitungan:</h4><div class="space-y-2 text-sm" data-v-77086267${_scopeId}><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Gross Revenue (Items yang dapat ditagih):</span><span class="font-medium text-green-700" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getGrossRevenue.value))}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Operational Costs (Biaya internal):</span><span class="font-medium text-red-700" data-v-77086267${_scopeId}>- ${ssrInterpolate(formatCurrency(getOperationalCostsTotal.value))}</span></div><hr class="border-gray-300" data-v-77086267${_scopeId}><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Reimbursement (Cost Neutral - Tidak mengurangi profit):</span><span class="font-medium text-orange-700" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getReimbursementTotal.value))}</span></div><hr class="border-gray-300" data-v-77086267${_scopeId}><div class="flex justify-between font-semibold" data-v-77086267${_scopeId}><span class="text-gray-800" data-v-77086267${_scopeId}>Net Profit:</span><span class="text-blue-700" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getNetProfit.value))}</span></div><div class="flex justify-between text-sm" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Profit Margin:</span><span class="text-purple-700 font-medium" data-v-77086267${_scopeId}>${ssrInterpolate(getProfitMargin.value)}%</span></div></div></div></div></div>`);
            if (__props.invoice.invoice_type === "combined" && getMainItems.value.length > 0 && getReimbursementItems.value.length > 0) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-77086267${_scopeId}><div class="px-6 py-4 bg-sage-50" data-v-77086267${_scopeId}><div class="flex justify-end" data-v-77086267${_scopeId}><div class="w-80 space-y-3" data-v-77086267${_scopeId}><div class="text-center text-lg font-semibold text-sage-800 pb-2 border-b border-sage-300" data-v-77086267${_scopeId}> Combined Invoice Summary </div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-sm text-blue-700" data-v-77086267${_scopeId}>Total Main Items:</span><span class="text-sm font-medium text-blue-700" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getMainTotal.value))}</span></div><div class="flex justify-between" data-v-77086267${_scopeId}><span class="text-sm text-orange-700" data-v-77086267${_scopeId}>Total Reimbursement Items:</span><span class="text-sm font-medium text-orange-700" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getReimbursementTotal.value))}</span></div><div class="flex justify-between pt-3 border-t border-sage-400" data-v-77086267${_scopeId}><span class="text-xl font-bold text-sage-800" data-v-77086267${_scopeId}>Grand Total:</span><span class="text-xl font-bold text-sage-800" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getMainTotal.value + getReimbursementTotal.value))}</span></div></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (showPaymentModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-77086267${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-77086267${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-77086267${_scopeId}>Konfirmasi Pembayaran</h3><form data-v-77086267${_scopeId}><div class="space-y-4" data-v-77086267${_scopeId}><div data-v-77086267${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-77086267${_scopeId}>Jumlah Dibayar</label><input type="number"${ssrRenderAttr("value", paymentForm.paid_amount)}${ssrRenderAttr("placeholder", formatCurrency(__props.invoice.total))} step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-77086267${_scopeId}></div><div data-v-77086267${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-77086267${_scopeId}>Tanggal Pembayaran</label><input type="date"${ssrRenderAttr("value", paymentForm.paid_date)}${ssrRenderAttr("max", (/* @__PURE__ */ new Date()).toISOString().split("T")[0])} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-77086267${_scopeId}></div><div data-v-77086267${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-77086267${_scopeId}>Metode Pembayaran</label><input type="text"${ssrRenderAttr("value", paymentForm.payment_method)} placeholder="Transfer Bank, Cash, dll." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-77086267${_scopeId}></div><div data-v-77086267${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-77086267${_scopeId}>Catatan (Opsional)</label><textarea rows="3" placeholder="Catatan tambahan tentang pembayaran..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-77086267${_scopeId}>${ssrInterpolate(paymentForm.payment_notes)}</textarea></div></div><div class="flex justify-end space-x-3 mt-6" data-v-77086267${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-77086267${_scopeId}> Batal </button><button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50" data-v-77086267${_scopeId}>${ssrInterpolate(processing.value ? "Memproses..." : "Konfirmasi Pembayaran")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showMarkSentModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-77086267${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-77086267${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-77086267${_scopeId}>Tandai Invoice Sebagai Terkirim</h3><p class="text-gray-600 mb-6" data-v-77086267${_scopeId}>Apakah Anda yakin ingin menandai invoice ini sebagai terkirim ke customer?</p><div class="flex justify-end space-x-3" data-v-77086267${_scopeId}><button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-77086267${_scopeId}> Batal </button><button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-77086267${_scopeId}> Ya, Tandai Terkirim </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showReimbursementPaymentModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-77086267${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-77086267${_scopeId}><h3 class="text-lg font-semibold text-orange-800 mb-4" data-v-77086267${_scopeId}>Perbarui Status Reimbursement</h3>`);
              if (selectedReimbursementEntry.value) {
                _push2(`<div class="mb-4 text-sm text-gray-600" data-v-77086267${_scopeId}><div class="font-medium text-gray-800" data-v-77086267${_scopeId}>${ssrInterpolate(selectedReimbursementEntry.value.description)}</div><div data-v-77086267${_scopeId}>Nominal: ${ssrInterpolate(formatCurrency(selectedReimbursementEntry.value.amount, selectedReimbursementEntry.value.currency || "IDR"))}</div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<form data-v-77086267${_scopeId}><div class="space-y-4" data-v-77086267${_scopeId}><div data-v-77086267${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-77086267${_scopeId}>Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" data-v-77086267${_scopeId}><option value="paid" data-v-77086267${ssrIncludeBooleanAttr(Array.isArray(unref(reimbursementPaymentForm).status) ? ssrLooseContain(unref(reimbursementPaymentForm).status, "paid") : ssrLooseEqual(unref(reimbursementPaymentForm).status, "paid")) ? " selected" : ""}${_scopeId}>Sudah Dibayar</option><option value="invoiced" data-v-77086267${ssrIncludeBooleanAttr(Array.isArray(unref(reimbursementPaymentForm).status) ? ssrLooseContain(unref(reimbursementPaymentForm).status, "invoiced") : ssrLooseEqual(unref(reimbursementPaymentForm).status, "invoiced")) ? " selected" : ""}${_scopeId}>Belum Dibayar</option></select></div>`);
              if (unref(reimbursementPaymentForm).status === "paid") {
                _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-77086267${_scopeId}><div data-v-77086267${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-77086267${_scopeId}>Vendor / Pembayar</label><input type="text"${ssrRenderAttr("value", unref(reimbursementPaymentForm).vendor_name)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Eshaka Wijaya Logistics" required data-v-77086267${_scopeId}></div><div data-v-77086267${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-77086267${_scopeId}>Tanggal Bayar</label><input type="date"${ssrRenderAttr("value", unref(reimbursementPaymentForm).paid_at)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required data-v-77086267${_scopeId}></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div data-v-77086267${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-77086267${_scopeId}>Catatan (Opsional)</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" placeholder="Contoh: Dibayar melalui rekening BCA perusahaan" data-v-77086267${_scopeId}>${ssrInterpolate(unref(reimbursementPaymentForm).notes)}</textarea></div></div><div class="flex justify-end space-x-3 mt-6" data-v-77086267${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-77086267${_scopeId}> Batal </button><button type="submit"${ssrIncludeBooleanAttr(unref(reimbursementPaymentForm).processing) ? " disabled" : ""} class="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50" data-v-77086267${_scopeId}>${ssrInterpolate(unref(reimbursementPaymentForm).processing ? "Menyimpan..." : "Simpan Perubahan")}</button></div></form></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showProfitLossModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-77086267${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-2xl mx-4" data-v-77086267${_scopeId}><h3 class="text-lg font-semibold text-purple-800 mb-4" data-v-77086267${_scopeId}>Post Invoice ke Laba Rugi</h3><div class="bg-purple-50 rounded-lg p-4 mb-6 border border-purple-200" data-v-77086267${_scopeId}><h4 class="text-sm font-semibold text-purple-800 mb-3" data-v-77086267${_scopeId}>Ringkasan Invoice:</h4><div class="grid grid-cols-2 gap-4 text-sm" data-v-77086267${_scopeId}><div data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Invoice Number:</span><span class="font-medium text-purple-800 ml-2" data-v-77086267${_scopeId}>${ssrInterpolate(__props.invoice.invoice_number)}</span></div><div data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Customer:</span><span class="font-medium text-purple-800 ml-2" data-v-77086267${_scopeId}>${ssrInterpolate((_f = __props.invoice.customer) == null ? void 0 : _f.company_name)}</span></div><div data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Gross Revenue:</span><span class="font-medium text-green-700 ml-2" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getGrossRevenue.value))}</span></div><div data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Operational Costs:</span><span class="font-medium text-red-700 ml-2" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getOperationalCostsTotal.value))}</span></div><div class="col-span-2 pt-2 border-t border-purple-200" data-v-77086267${_scopeId}><span class="text-gray-600" data-v-77086267${_scopeId}>Net Profit:</span><span class="font-bold text-blue-700 ml-2" data-v-77086267${_scopeId}>${ssrInterpolate(formatCurrency(getNetProfit.value))}</span></div></div></div><form data-v-77086267${_scopeId}><div class="space-y-4" data-v-77086267${_scopeId}><div data-v-77086267${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-77086267${_scopeId}> Periode Laba Rugi <span class="text-red-500" data-v-77086267${_scopeId}>*</span></label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" required data-v-77086267${_scopeId}><option value="" data-v-77086267${ssrIncludeBooleanAttr(Array.isArray(profitLossForm.period_id) ? ssrLooseContain(profitLossForm.period_id, "") : ssrLooseEqual(profitLossForm.period_id, "")) ? " selected" : ""}${_scopeId}>Pilih Periode...</option><!--[-->`);
              ssrRenderList(profitLossPeriods.value, (period) => {
                _push2(`<option${ssrRenderAttr("value", period.id)} data-v-77086267${ssrIncludeBooleanAttr(Array.isArray(profitLossForm.period_id) ? ssrLooseContain(profitLossForm.period_id, period.id) : ssrLooseEqual(profitLossForm.period_id, period.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(formatPeriodLabel(period))}</option>`);
              });
              _push2(`<!--]--></select><p class="text-xs text-gray-500 mt-1" data-v-77086267${_scopeId}> Pilih periode laba rugi dimana transaksi ini akan dicatat </p></div><div data-v-77086267${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-77086267${_scopeId}>Catatan (Opsional)</label><textarea rows="3" placeholder="Catatan tambahan untuk posting laba rugi..." class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" data-v-77086267${_scopeId}>${ssrInterpolate(profitLossForm.notes)}</textarea></div><div class="bg-blue-50 border border-blue-200 rounded-lg p-4" data-v-77086267${_scopeId}><div class="flex items-start" data-v-77086267${_scopeId}><svg class="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-77086267${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-77086267${_scopeId}></path></svg><div class="text-sm" data-v-77086267${_scopeId}><p class="text-blue-800 font-medium mb-1" data-v-77086267${_scopeId}>Yang akan di-posting:</p><ul class="text-blue-700 space-y-1" data-v-77086267${_scopeId}>`);
              if (getGrossRevenue.value > 0) {
                _push2(`<li data-v-77086267${_scopeId}>• Pendapatan: ${ssrInterpolate(formatCurrency(getGrossRevenue.value))}</li>`);
              } else {
                _push2(`<!---->`);
              }
              if (getOperationalCostsTotal.value > 0) {
                _push2(`<li data-v-77086267${_scopeId}>• Biaya Operasional: ${ssrInterpolate(formatCurrency(getOperationalCostsTotal.value))}</li>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<li data-v-77086267${_scopeId}>• Net Profit Impact: ${ssrInterpolate(formatCurrency(getNetProfit.value))}</li></ul></div></div></div></div><div class="flex justify-end space-x-3 mt-6" data-v-77086267${_scopeId}><button type="button" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors" data-v-77086267${_scopeId}> Batal </button><button type="submit"${ssrIncludeBooleanAttr(processing.value || !profitLossForm.period_id) ? " disabled" : ""} class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50" data-v-77086267${_scopeId}>${ssrInterpolate(processing.value ? "Memproses..." : "Post ke Laba Rugi")}</button></div></form></div></div>`);
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
                      shouldShowFixOperationalCostsButton.value ? (openBlock(), createBlock("button", {
                        key: 3,
                        onClick: fixOperationalCosts,
                        class: "inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
                            d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          })
                        ])),
                        createTextVNode(" Fix Operational Costs ")
                      ])) : createCommentVNode("", true),
                      shouldShowProfitLossButton.value ? (openBlock(), createBlock("button", {
                        key: 4,
                        onClick: openProfitLossModal,
                        class: "inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
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
                        createTextVNode(" Post ke Laba Rugi ")
                      ])) : createCommentVNode("", true),
                      __props.invoice.posted_to_profit_loss ? (openBlock(), createBlock("button", {
                        key: 5,
                        onClick: unpostFromProfitLoss,
                        class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
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
                        createTextVNode(" Batal Post Laba Rugi ")
                      ])) : createCommentVNode("", true)
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
                        createVNode("span", { class: "font-medium" }, toDisplayString((_g = __props.invoice.sales_order) == null ? void 0 : _g.order_number), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Customer:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(((_h = __props.invoice.customer) == null ? void 0 : _h.consignee_shipper) || ((_i = __props.invoice.customer) == null ? void 0 : _i.company_name)), 1)
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
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Status Laba Rugi:"),
                        createVNode("span", {
                          class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", __props.invoice.posted_to_profit_loss ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800"]
                        }, toDisplayString(__props.invoice.posted_to_profit_loss ? "Sudah Di-post" : "Belum Di-post"), 3)
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
                        createVNode("span", { class: "font-medium" }, toDisplayString(((_j = __props.invoice.confirmed_by) == null ? void 0 : _j.name) || "-"), 1)
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
                  ])) : createCommentVNode("", true),
                  __props.invoice.posted_to_profit_loss ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "bg-white rounded-lg shadow-sm p-6 border border-purple-200"
                  }, [
                    createVNode("h3", { class: "text-lg font-semibold text-purple-800 mb-4" }, "Informasi Posting Laba Rugi"),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Status:"),
                        createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800" }, " Sudah Di-post ")
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Tanggal Posting:"),
                        createVNode("span", { class: "font-medium" }, toDisplayString(formatDateTime(__props.invoice.posted_to_profit_loss_at)), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", { class: "text-gray-600" }, "Di-post oleh:"),
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
                __props.mainInvoice || __props.invoice.invoice_type === "main" || __props.invoice.invoice_type === "combined" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6"
                }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-blue-50" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center space-x-3" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-blue-800" }, "Items Invoice Main"),
                        createVNode("span", { class: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800" }, toDisplayString((__props.mainInvoice || __props.invoice).invoice_number), 1)
                      ]),
                      createVNode("div", { class: "flex space-x-2" }, [
                        createVNode("a", {
                          href: unref(route)("admin-keuangan.invoices.preview-pdf", (__props.mainInvoice || __props.invoice).id),
                          class: "inline-flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors",
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
                          href: unref(route)("admin-keuangan.invoices.export-pdf", (__props.mainInvoice || __props.invoice).id),
                          class: "inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors",
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
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Deskripsi "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Qty "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Unit "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Rate "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Currency "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Amount ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(getMainItems.value, (item) => {
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-sage-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(item.description), 1),
                              getReimbursementLatestHistory(item) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-gray-500 mt-1 space-y-0.5"
                              }, [
                                createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                                  createVNode("span", null, "Terakhir:"),
                                  createVNode("span", { class: "inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 text-gray-700" }, toDisplayString(getReimbursementStatusLabel(getReimbursementLatestHistory(item).status)), 1),
                                  getReimbursementLatestHistory(item).vendor_name ? (openBlock(), createBlock("span", { key: 0 }, " oleh " + toDisplayString(getReimbursementLatestHistory(item).vendor_name), 1)) : createCommentVNode("", true),
                                  getReimbursementLatestHistory(item).timestamp ? (openBlock(), createBlock("span", { key: 1 }, " (" + toDisplayString(formatDate(getReimbursementLatestHistory(item).timestamp)) + ") ", 1)) : createCommentVNode("", true)
                                ]),
                                getReimbursementLatestHistory(item).notes ? (openBlock(), createBlock("div", { key: 0 }, " Catatan: " + toDisplayString(getReimbursementLatestHistory(item).notes), 1)) : createCommentVNode("", true),
                                getReimbursementLatestHistory(item).user ? (openBlock(), createBlock("div", { key: 1 }, " Diproses oleh: " + toDisplayString(getReimbursementLatestHistory(item).user), 1)) : createCommentVNode("", true)
                              ])) : createCommentVNode("", true)
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
                  createVNode("div", { class: "px-6 py-4 bg-blue-50 border-t border-sage-200" }, [
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode("div", { class: "w-64 space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-gray-600" }, "Subtotal Main:"),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(formatCurrency(getMainTotal.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between pt-2 border-t border-blue-200" }, [
                          createVNode("span", { class: "text-lg font-semibold text-blue-800" }, "Total Main:"),
                          createVNode("span", { class: "text-lg font-bold text-blue-800" }, toDisplayString(formatCurrency(getMainTotal.value)), 1)
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
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center space-x-3" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-orange-800" }, "Items Invoice Reimbursement"),
                        createVNode("span", { class: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800" }, toDisplayString((__props.reimbursementInvoice || __props.invoice).invoice_number), 1)
                      ]),
                      createVNode("div", { class: "flex space-x-2" }, [
                        createVNode("a", {
                          href: unref(route)("admin-keuangan.invoices.preview-pdf-reimbursement", (__props.reimbursementInvoice || __props.invoice).id),
                          class: "inline-flex items-center px-3 py-1.5 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors",
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
                          href: unref(route)("admin-keuangan.invoices.export-pdf-reimbursement", (__props.reimbursementInvoice || __props.invoice).id),
                          class: "inline-flex items-center px-3 py-1.5 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700 transition-colors",
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
                    class: "px-6 py-3 bg-white border-b border-sage-200 flex flex-wrap items-center gap-2"
                  }, [
                    createVNode("span", { class: "text-sm text-sage-600 mr-2" }, "Filter Status:"),
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => reimbursementFilter.value = "all",
                      class: [reimbursementFilter.value === "all" ? "bg-orange-600 text-white border border-orange-600 shadow-sm" : "bg-white text-sage-700 border border-sage-200 hover:border-orange-300", "px-3 py-1.5 text-sm rounded-md transition-colors"]
                    }, " Semua ", 10, ["onClick"]),
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => reimbursementFilter.value = "unpaid",
                      class: [reimbursementFilter.value === "unpaid" ? "bg-orange-600 text-white border border-orange-600 shadow-sm" : "bg-white text-sage-700 border border-sage-200 hover:border-orange-300", "px-3 py-1.5 text-sm rounded-md transition-colors"]
                    }, " Belum Dibayar ", 10, ["onClick"]),
                    createVNode("button", {
                      type: "button",
                      onClick: ($event) => reimbursementFilter.value = "paid",
                      class: [reimbursementFilter.value === "paid" ? "bg-orange-600 text-white border border-orange-600 shadow-sm" : "bg-white text-sage-700 border border-sage-200 hover:border-orange-300", "px-3 py-1.5 text-sm rounded-md transition-colors"]
                    }, " Sudah Dibayar ", 10, ["onClick"])
                  ])) : createCommentVNode("", true),
                  hasReimbursementEntries.value ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "overflow-x-auto"
                  }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Deskripsi "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Qty "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Unit "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Rate "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Currency "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Amount "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Vendor "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Status "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Tanggal Bayar "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" })
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-sage-200" }, [
                        filteredReimbursementEntries.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "10",
                            class: "px-6 py-6 text-center text-sm text-gray-500"
                          }, " Tidak ada data reimbursement untuk filter ini. ")
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(filteredReimbursementEntries.value, (item) => {
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
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatCurrency(item.rate, item.currency || reimbursementCurrency.value)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(item.currency || reimbursementCurrency.value), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right" }, [
                              createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(item.amount, item.currency || reimbursementCurrency.value)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(item.vendor_name), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("span", {
                                class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getReimbursementStatusColor(item.status)]
                              }, toDisplayString(getReimbursementStatusLabel(item.status)), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(item.paid_at ? formatDate(item.paid_at) : "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right" }, [
                              item.can_update ? (openBlock(), createBlock("button", {
                                key: 0,
                                onClick: ($event) => openReimbursementPaymentModal(item),
                                class: "px-3 py-1.5 text-sm rounded-md border border-orange-500 text-orange-600 hover:bg-orange-50 transition-colors"
                              }, toDisplayString(item.status === "paid" ? "Ubah Status" : "Tandai Dibayar"), 9, ["onClick"])) : createCommentVNode("", true)
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 2,
                    class: "overflow-x-auto"
                  }, [
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
                        (openBlock(true), createBlock(Fragment, null, renderList(getReimbursementItems.value, (item) => {
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
                        }, " Menampilkan " + toDisplayString(filteredReimbursementEntries.value.length) + " dari " + toDisplayString(normalizedReimbursementEntries.value.length) + " item ", 1)) : createCommentVNode("", true),
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
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center space-x-3" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-red-800" }, "Biaya Lain / Operational Costs"),
                        createVNode("span", { class: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800" }, " Internal Only ")
                      ]),
                      createVNode("div", { class: "text-sm text-red-600" }, " Tidak terlihat oleh customer ")
                    ])
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-red-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" }, " Deskripsi "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" }, " Qty "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" }, " Unit "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" }, " Rate "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-red-500 uppercase tracking-wider" }, " Currency "),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-red-500 uppercase tracking-wider" }, " Amount ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-red-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(getOperationalCosts.value, (item) => {
                          return openBlock(), createBlock("tr", {
                            key: item.id,
                            class: "hover:bg-red-50"
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
                  createVNode("div", { class: "px-6 py-4 bg-red-50 border-t border-red-200" }, [
                    createVNode("div", { class: "flex justify-end" }, [
                      createVNode("div", { class: "w-64 space-y-2" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-sm text-gray-600" }, "Subtotal Biaya Lain:"),
                          createVNode("span", { class: "text-sm font-medium" }, toDisplayString(formatCurrency(getOperationalCostsTotal.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between pt-2 border-t border-red-200" }, [
                          createVNode("span", { class: "text-lg font-semibold text-red-800" }, "Total Biaya Lain:"),
                          createVNode("span", { class: "text-lg font-bold text-red-800" }, toDisplayString(formatCurrency(getOperationalCostsTotal.value)), 1)
                        ])
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-purple-200 overflow-hidden mb-6" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-purple-200 bg-purple-50" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center space-x-3" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-purple-800" }, "Analisis Profit"),
                        createVNode("span", { class: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800" }, " Internal Analysis ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "px-6 py-4" }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" }, [
                      createVNode("div", { class: "bg-green-50 rounded-lg p-4 border border-green-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-green-800" }, toDisplayString(formatCurrency(getGrossRevenue.value)), 1),
                          createVNode("div", { class: "text-sm text-green-600 mt-1" }, "Gross Revenue"),
                          createVNode("div", { class: "text-xs text-gray-500 mt-1" }, "Total yang dapat ditagih")
                        ])
                      ]),
                      createVNode("div", { class: "bg-red-50 rounded-lg p-4 border border-red-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-red-800" }, toDisplayString(formatCurrency(getOperationalCostsTotal.value)), 1),
                          createVNode("div", { class: "text-sm text-red-600 mt-1" }, "Operational Costs"),
                          createVNode("div", { class: "text-xs text-gray-500 mt-1" }, "Biaya operasional")
                        ])
                      ]),
                      createVNode("div", { class: "bg-orange-50 rounded-lg p-4 border border-orange-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-orange-800" }, toDisplayString(formatCurrency(getReimbursementTotal.value)), 1),
                          createVNode("div", { class: "text-sm text-orange-600 mt-1" }, "Reimbursement"),
                          createVNode("div", { class: "text-xs text-gray-500 mt-1" }, "Cost Neutral")
                        ])
                      ]),
                      createVNode("div", { class: "bg-blue-50 rounded-lg p-4 border border-blue-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-blue-800" }, toDisplayString(formatCurrency(getNetProfit.value)), 1),
                          createVNode("div", { class: "text-sm text-blue-600 mt-1" }, "Net Profit"),
                          createVNode("div", { class: "text-xs text-gray-500 mt-1" }, "Keuntungan bersih")
                        ])
                      ]),
                      createVNode("div", { class: "bg-purple-50 rounded-lg p-4 border border-purple-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-2xl font-bold text-purple-800" }, toDisplayString(getProfitMargin.value) + "%", 1),
                          createVNode("div", { class: "text-sm text-purple-600 mt-1" }, "Profit Margin"),
                          createVNode("div", { class: "text-xs text-gray-500 mt-1" }, "Persentase keuntungan")
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mt-6 bg-gray-50 rounded-lg p-4" }, [
                      createVNode("h4", { class: "text-sm font-semibold text-gray-800 mb-3" }, "Detail Perhitungan:"),
                      createVNode("div", { class: "space-y-2 text-sm" }, [
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600" }, "Gross Revenue (Items yang dapat ditagih):"),
                          createVNode("span", { class: "font-medium text-green-700" }, toDisplayString(formatCurrency(getGrossRevenue.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600" }, "Operational Costs (Biaya internal):"),
                          createVNode("span", { class: "font-medium text-red-700" }, "- " + toDisplayString(formatCurrency(getOperationalCostsTotal.value)), 1)
                        ]),
                        createVNode("hr", { class: "border-gray-300" }),
                        createVNode("div", { class: "flex justify-between" }, [
                          createVNode("span", { class: "text-gray-600" }, "Reimbursement (Cost Neutral - Tidak mengurangi profit):"),
                          createVNode("span", { class: "font-medium text-orange-700" }, toDisplayString(formatCurrency(getReimbursementTotal.value)), 1)
                        ]),
                        createVNode("hr", { class: "border-gray-300" }),
                        createVNode("div", { class: "flex justify-between font-semibold" }, [
                          createVNode("span", { class: "text-gray-800" }, "Net Profit:"),
                          createVNode("span", { class: "text-blue-700" }, toDisplayString(formatCurrency(getNetProfit.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between text-sm" }, [
                          createVNode("span", { class: "text-gray-600" }, "Profit Margin:"),
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
                          createVNode("span", { class: "text-sm text-orange-700" }, "Total Reimbursement Items:"),
                          createVNode("span", { class: "text-sm font-medium text-orange-700" }, toDisplayString(formatCurrency(getReimbursementTotal.value)), 1)
                        ]),
                        createVNode("div", { class: "flex justify-between pt-3 border-t border-sage-400" }, [
                          createVNode("span", { class: "text-xl font-bold text-sage-800" }, "Grand Total:"),
                          createVNode("span", { class: "text-xl font-bold text-sage-800" }, toDisplayString(formatCurrency(getMainTotal.value + getReimbursementTotal.value)), 1)
                        ])
                      ])
                    ])
                  ])
                ])) : createCommentVNode("", true)
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
              ])) : createCommentVNode("", true),
              showReimbursementPaymentModal.value ? (openBlock(), createBlock("div", {
                key: 2,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-orange-800 mb-4" }, "Perbarui Status Reimbursement"),
                  selectedReimbursementEntry.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mb-4 text-sm text-gray-600"
                  }, [
                    createVNode("div", { class: "font-medium text-gray-800" }, toDisplayString(selectedReimbursementEntry.value.description), 1),
                    createVNode("div", null, "Nominal: " + toDisplayString(formatCurrency(selectedReimbursementEntry.value.amount, selectedReimbursementEntry.value.currency || "IDR")), 1)
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
                          createVNode("option", { value: "paid" }, "Sudah Dibayar"),
                          createVNode("option", { value: "invoiced" }, "Belum Dibayar")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(reimbursementPaymentForm).status]
                        ])
                      ]),
                      unref(reimbursementPaymentForm).status === "paid" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "grid grid-cols-1 md:grid-cols-2 gap-4"
                      }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Vendor / Pembayar"),
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
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Tanggal Bayar"),
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
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Catatan (Opsional)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(reimbursementPaymentForm).notes = $event,
                          rows: "3",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500",
                          placeholder: "Contoh: Dibayar melalui rekening BCA perusahaan"
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
                      }, " Batal "),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(reimbursementPaymentForm).processing,
                        class: "px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors disabled:opacity-50"
                      }, toDisplayString(unref(reimbursementPaymentForm).processing ? "Menyimpan..." : "Simpan Perubahan"), 9, ["disabled"])
                    ])
                  ], 32)
                ])
              ])) : createCommentVNode("", true),
              showProfitLossModal.value ? (openBlock(), createBlock("div", {
                key: 3,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-2xl mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-purple-800 mb-4" }, "Post Invoice ke Laba Rugi"),
                  createVNode("div", { class: "bg-purple-50 rounded-lg p-4 mb-6 border border-purple-200" }, [
                    createVNode("h4", { class: "text-sm font-semibold text-purple-800 mb-3" }, "Ringkasan Invoice:"),
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
                          createTextVNode(" Periode Laba Rugi "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => profitLossForm.period_id = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500",
                          required: ""
                        }, [
                          createVNode("option", { value: "" }, "Pilih Periode..."),
                          (openBlock(true), createBlock(Fragment, null, renderList(profitLossPeriods.value, (period) => {
                            return openBlock(), createBlock("option", {
                              key: period.id,
                              value: period.id
                            }, toDisplayString(formatPeriodLabel(period)), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, profitLossForm.period_id]
                        ]),
                        createVNode("p", { class: "text-xs text-gray-500 mt-1" }, " Pilih periode laba rugi dimana transaksi ini akan dicatat ")
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Catatan (Opsional)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => profitLossForm.notes = $event,
                          rows: "3",
                          placeholder: "Catatan tambahan untuk posting laba rugi...",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, profitLossForm.notes]
                        ])
                      ]),
                      createVNode("div", { class: "bg-blue-50 border border-blue-200 rounded-lg p-4" }, [
                        createVNode("div", { class: "flex items-start" }, [
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
                            createVNode("p", { class: "text-blue-800 font-medium mb-1" }, "Yang akan di-posting:"),
                            createVNode("ul", { class: "text-blue-700 space-y-1" }, [
                              getGrossRevenue.value > 0 ? (openBlock(), createBlock("li", { key: 0 }, "• Pendapatan: " + toDisplayString(formatCurrency(getGrossRevenue.value)), 1)) : createCommentVNode("", true),
                              getOperationalCostsTotal.value > 0 ? (openBlock(), createBlock("li", { key: 1 }, "• Biaya Operasional: " + toDisplayString(formatCurrency(getOperationalCostsTotal.value)), 1)) : createCommentVNode("", true),
                              createVNode("li", null, "• Net Profit Impact: " + toDisplayString(formatCurrency(getNetProfit.value)), 1)
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
                      }, " Batal ", 8, ["onClick"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: processing.value || !profitLossForm.period_id,
                        class: "px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                      }, toDisplayString(processing.value ? "Memproses..." : "Post ke Laba Rugi"), 9, ["disabled"])
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
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-77086267"]]);
export {
  Show as default
};
