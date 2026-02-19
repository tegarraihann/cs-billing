import { computed, ref, onMounted, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, withModifiers, withDirectives, Fragment, renderList, vModelSelect, createCommentVNode, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { usePage, useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    invoice: Object,
    salesOrders: Array,
    errors: Object,
    packageUnits: {
      type: Array,
      default: () => []
    },
    vendors: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
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
        "admin-keuangan.invoices.update": "/admin-keuangan/invoices"
      };
      if (name === "admin-keuangan.invoices.update") {
        if (typeof params === "number" || typeof params === "string") {
          return `/admin-keuangan/invoices/${params}`;
        }
        const invoiceId = params.invoice ?? params.id;
        const query = { ...params };
        delete query.invoice;
        delete query.id;
        if (!invoiceId) {
          return "#";
        }
        return appendQuery(`/admin-keuangan/invoices/${invoiceId}`, query);
      }
      const basePath = routes[name];
      if (!basePath) {
        return "#";
      }
      return appendQuery(basePath, params);
    };
    const backQuery = computed(() => {
      const queryString = page.url.includes("?") ? page.url.split("?")[1] : "";
      const params = new URLSearchParams(queryString);
      const query = {};
      const preservedQueryKeys = ["search", "status", "invoice_type", "date_from", "date_to", "page"];
      preservedQueryKeys.forEach((key) => {
        const value = params.get(key);
        if (value) {
          query[key] = value;
        }
      });
      return query;
    });
    const backToIndexUrl = computed(() => route("admin-keuangan.invoices.index", backQuery.value));
    const mainItems = ref([]);
    const reimbursementItems = ref([]);
    const operationalCosts = ref([]);
    const cogsItems = ref([]);
    const vendorOptions = computed(() => props.vendors || []);
    const normalizeVendorId = (value) => {
      if (value === null || value === void 0 || value === "" || value === "internal") {
        return null;
      }
      const parsed = Number(value);
      return Number.isNaN(parsed) ? null : parsed;
    };
    const splitItemsByType = () => {
      mainItems.value = [];
      reimbursementItems.value = [];
      operationalCosts.value = [];
      cogsItems.value = [];
      if (props.invoice.items && props.invoice.items.length > 0) {
        props.invoice.items.forEach((item) => {
          const itemType = item.item_type || "billable";
          const itemRef = item.item_ref || "";
          const isCogs = itemType === "operational_cost" && /^cogs_vendor_/i.test(itemRef);
          if (isCogs) {
            cogsItems.value.push({
              ...item,
              item_type: "operational_cost",
              vendor_id: normalizeVendorId(item.vendor_id)
            });
          } else if (itemType === "operational_cost") {
            operationalCosts.value.push({
              ...item,
              item_type: "operational_cost",
              vendor_id: normalizeVendorId(item.vendor_id)
            });
          } else if (itemType === "reimbursement") {
            reimbursementItems.value.push({
              ...item,
              item_ref: item.item_ref || `reimb_${item.id || Date.now()}`,
              item_type: "reimbursement",
              vendor_id: normalizeVendorId(item.vendor_id)
            });
          } else {
            mainItems.value.push({
              ...item,
              item_type: "billable",
              vendor_id: normalizeVendorId(item.vendor_id)
            });
          }
        });
      }
    };
    const formatDateForInput = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    };
    const form = useForm({
      sales_order_id: props.invoice.sales_order_id,
      invoice_type: props.invoice.invoice_type || "combined",
      invoice_date: formatDateForInput(props.invoice.invoice_date),
      term_days: props.invoice.term_days,
      shipper: props.invoice.shipper || "",
      consignee: props.invoice.consignee || "",
      awb_bl_no: props.invoice.awb_bl_no || "",
      mawb_obl_no: props.invoice.mawb_obl_no || "",
      vessel: props.invoice.vessel || "",
      flight_voy: props.invoice.flight_voy || "",
      origin: props.invoice.origin || "",
      destination: props.invoice.destination || "",
      pol_pod: props.invoice.pol_pod || "",
      etd: formatDateForInput(props.invoice.etd),
      eta: formatDateForInput(props.invoice.eta),
      gross_weight: props.invoice.gross_weight || "",
      net_weight: props.invoice.net_weight || "",
      volume: props.invoice.volume || "",
      no_of_packages: props.invoice.no_of_packages || "",
      package_unit: props.invoice.package_unit || "BAG",
      container_no: props.invoice.container_no || "",
      container_size: props.invoice.container_size || "",
      remarks: props.invoice.remarks || "",
      down_payment_amount: props.invoice.down_payment_amount || "",
      down_payment_date: formatDateForInput(props.invoice.down_payment_date),
      down_payment_notes: props.invoice.down_payment_notes || "",
      vat_rate: props.invoice.vat_rate || "",
      items: []
    });
    const addItem = () => {
      mainItems.value.push({
        description: "",
        quantity: 1,
        unit: "SET",
        rate: 0,
        currency: "IDR",
        amount: 0,
        item_ref: "main",
        type: "main",
        item_type: "billable"
      });
    };
    const removeMainItem = (index) => {
      mainItems.value.splice(index, 1);
    };
    const calculateMainAmount = (index) => {
      const item = mainItems.value[index];
      item.amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
    };
    const addReimbursementItem = () => {
      reimbursementItems.value.push({
        description: "",
        quantity: 1,
        unit: "SET",
        rate: 0,
        currency: "IDR",
        amount: 0,
        item_ref: "reimbursement",
        type: "reimbursement",
        item_type: "reimbursement",
        vendor_id: null
      });
    };
    const removeReimbursementItem = (index) => {
      reimbursementItems.value.splice(index, 1);
    };
    const calculateReimbursementAmount = (index) => {
      const item = reimbursementItems.value[index];
      item.amount = parseFloat(item.quantity || 0) * parseFloat(item.rate || 0);
    };
    const addOperationalCost = () => {
      operationalCosts.value.push({
        description: "",
        quantity: 1,
        unit: "SET",
        rate: 0,
        currency: "IDR",
        amount: 0,
        item_type: "operational_cost",
        include_in_customer_invoice: false,
        is_hidden_from_customer: true,
        vendor_id: null
      });
    };
    const removeOperationalCost = (index) => {
      operationalCosts.value.splice(index, 1);
    };
    const calculateOperationalAmount = (index) => {
      const cost = operationalCosts.value[index];
      cost.amount = parseFloat(cost.quantity || 0) * parseFloat(cost.rate || 0);
    };
    const calculateOperationalTotal = () => {
      return operationalCosts.value.reduce((total, cost) => {
        return total + parseFloat(cost.amount || 0);
      }, 0);
    };
    const calculateGrossRevenue = () => {
      const mainTotal = mainItems.value.reduce((total, item) => {
        return total + parseFloat(item.amount || 0);
      }, 0);
      const reimbursementTotal = reimbursementItems.value.reduce((total, item) => {
        return total + parseFloat(item.amount || 0);
      }, 0);
      return mainTotal + reimbursementTotal;
    };
    const calculateNetProfit = () => {
      return calculateGrossRevenue() - calculateOperationalTotal();
    };
    const calculateProfitMargin = () => {
      const grossRevenue = calculateGrossRevenue();
      if (grossRevenue <= 0) {
        return "0.00";
      }
      return (calculateNetProfit() / grossRevenue * 100).toFixed(2);
    };
    const calculateVatAmount = () => {
      const rate = parseFloat(form.vat_rate);
      if (Number.isNaN(rate) || rate <= 0) {
        return 0;
      }
      const baseAmount = mainItems.value.reduce((total, item) => {
        return total + parseFloat(item.amount || 0);
      }, 0);
      return Math.round(baseAmount * (rate / 100) * 100) / 100;
    };
    const calculateTotal = () => {
      const mainTotal = mainItems.value.reduce((total, item) => {
        return total + parseFloat(item.amount || 0);
      }, 0);
      const reimbursementTotal = reimbursementItems.value.reduce((total, item) => {
        return total + parseFloat(item.amount || 0);
      }, 0);
      return mainTotal + reimbursementTotal + calculateVatAmount();
    };
    const formatCurrency = (amount, currency = "IDR") => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency,
        minimumFractionDigits: 0
      }).format(amount || 0);
    };
    const getInvoiceTypeLabel = (type) => {
      const labels = {
        "main": "Main Invoice",
        "reimbursement": "Reimbursement",
        "combined": "Combined Invoice (Main + Reimbursement)"
      };
      return labels[type] || type;
    };
    const submit = () => {
      const allItems = [
        ...mainItems.value.map((item) => ({
          ...item,
          type: "main",
          item_ref: item.item_ref || "main",
          item_type: "billable",
          include_in_customer_invoice: true,
          is_hidden_from_customer: false,
          vendor_id: normalizeVendorId(item.vendor_id)
        })),
        ...reimbursementItems.value.map((item) => ({
          ...item,
          type: "reimbursement",
          item_ref: item.item_ref || "reimbursement",
          item_type: "reimbursement",
          include_in_customer_invoice: true,
          is_hidden_from_customer: false,
          vendor_id: normalizeVendorId(item.vendor_id)
        })),
        ...operationalCosts.value.map((cost) => ({
          ...cost,
          type: "operational",
          item_ref: "operational_cost",
          item_type: "operational_cost",
          include_in_customer_invoice: false,
          is_hidden_from_customer: true,
          vendor_id: normalizeVendorId(cost.vendor_id)
        })),
        ...cogsItems.value.map((item) => ({
          ...item,
          type: "operational",
          item_ref: item.item_ref || "cogs_vendor",
          item_type: "operational_cost",
          include_in_customer_invoice: false,
          is_hidden_from_customer: true,
          vendor_id: normalizeVendorId(item.vendor_id)
        }))
      ];
      form.items = allItems;
      if (mainItems.value.length > 0 && reimbursementItems.value.length > 0) {
        form.invoice_type = "combined";
      } else if (reimbursementItems.value.length > 0) {
        form.invoice_type = "reimbursement";
      } else {
        form.invoice_type = "main";
      }
      form.put(route("admin-keuangan.invoices.update", {
        invoice: props.invoice.id,
        ...backQuery.value
      }));
    };
    onMounted(() => {
      splitItemsByType();
      if (mainItems.value.length > 0 && reimbursementItems.value.length > 0) {
        form.invoice_type = "combined";
      } else if (reimbursementItems.value.length > 0) {
        form.invoice_type = "reimbursement";
      } else {
        form.invoice_type = "main";
      }
      if (mainItems.value.length === 0 && reimbursementItems.value.length === 0) {
        addItem();
      }
      mainItems.value.forEach((item, index) => {
        calculateMainAmount(index);
      });
      reimbursementItems.value.forEach((item, index) => {
        calculateReimbursementAmount(index);
      });
      operationalCosts.value.forEach((cost, index) => {
        calculateOperationalAmount(index);
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-ba47b220${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-ba47b220${_scopeId}><div class="flex items-center justify-between" data-v-ba47b220${_scopeId}><div data-v-ba47b220${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-ba47b220${_scopeId}>Edit Invoice</h2><p class="text-sage-600" data-v-ba47b220${_scopeId}>${ssrInterpolate(__props.invoice.invoice_number)}</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: backToIndexUrl.value,
              class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ba47b220${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-ba47b220${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div><form class="space-y-6" data-v-ba47b220${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ba47b220${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-ba47b220${_scopeId}>Sales Order &amp; Type Invoice</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-ba47b220${_scopeId}><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Sales Order</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600" disabled data-v-ba47b220${_scopeId}><!--[-->`);
            ssrRenderList(__props.salesOrders, (salesOrder) => {
              _push2(`<option${ssrRenderAttr("value", salesOrder.id)} data-v-ba47b220${ssrIncludeBooleanAttr(Array.isArray(unref(form).sales_order_id) ? ssrLooseContain(unref(form).sales_order_id, salesOrder.id) : ssrLooseEqual(unref(form).sales_order_id, salesOrder.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(salesOrder.order_number)} - ${ssrInterpolate(salesOrder.customer || salesOrder.customer_name)}</option>`);
            });
            _push2(`<!--]--></select></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Tipe Invoice</label><div class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600" data-v-ba47b220${_scopeId}>${ssrInterpolate(getInvoiceTypeLabel(__props.invoice.invoice_type))}</div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ba47b220${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-ba47b220${_scopeId}>Detail Invoice</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-ba47b220${_scopeId}><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Tanggal Invoice</label><input type="date"${ssrRenderAttr("value", unref(form).invoice_date)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-ba47b220${_scopeId}>`);
            if (__props.errors.invoice_date) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-ba47b220${_scopeId}>${ssrInterpolate(__props.errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Term (Hari)</label><input type="number"${ssrRenderAttr("value", unref(form).term_days)} min="1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-ba47b220${_scopeId}>`);
            if (__props.errors.term_days) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-ba47b220${_scopeId}>${ssrInterpolate(__props.errors.term_days)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ba47b220${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-ba47b220${_scopeId}>Detail Pengiriman</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-ba47b220${_scopeId}><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Shipper</label><input type="text"${ssrRenderAttr("value", unref(form).shipper)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Consignee</label><input type="text"${ssrRenderAttr("value", unref(form).consignee)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>AWB/BL No.</label><input type="text"${ssrRenderAttr("value", unref(form).awb_bl_no)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>MAWB/OBL No.</label><input type="text"${ssrRenderAttr("value", unref(form).mawb_obl_no)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Vessel</label><input type="text"${ssrRenderAttr("value", unref(form).vessel)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Flight/VOY</label><input type="text"${ssrRenderAttr("value", unref(form).flight_voy)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Origin</label><input type="text"${ssrRenderAttr("value", unref(form).origin)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Destination</label><input type="text"${ssrRenderAttr("value", unref(form).destination)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>POL/POD</label><input type="text"${ssrRenderAttr("value", unref(form).pol_pod)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>ETD</label><input type="date"${ssrRenderAttr("value", unref(form).etd)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>ETA</label><input type="date"${ssrRenderAttr("value", unref(form).eta)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Gross Weight (KG)</label><input type="number" step="0.01" min="0"${ssrRenderAttr("value", unref(form).gross_weight)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Net Weight (KG)</label><input type="number" step="0.0001" min="0"${ssrRenderAttr("value", unref(form).net_weight)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}>`);
            if (__props.errors.net_weight) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-ba47b220${_scopeId}>${ssrInterpolate(__props.errors.net_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Volume</label><input type="text"${ssrRenderAttr("value", unref(form).volume)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div class="grid grid-cols-2 gap-3" data-v-ba47b220${_scopeId}><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>No. of Packages</label><input type="number"${ssrRenderAttr("value", unref(form).no_of_packages)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Package Unit</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}><option value="" data-v-ba47b220${ssrIncludeBooleanAttr(Array.isArray(unref(form).package_unit) ? ssrLooseContain(unref(form).package_unit, "") : ssrLooseEqual(unref(form).package_unit, "")) ? " selected" : ""}${_scopeId}>Select Unit</option><!--[-->`);
            ssrRenderList(__props.packageUnits, (unit) => {
              _push2(`<option${ssrRenderAttr("value", unit.code)} data-v-ba47b220${ssrIncludeBooleanAttr(Array.isArray(unref(form).package_unit) ? ssrLooseContain(unref(form).package_unit, unit.code) : ssrLooseEqual(unref(form).package_unit, unit.code)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unit.name)}</option>`);
            });
            _push2(`<!--]--></select></div></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Container No.</label><input type="text"${ssrRenderAttr("value", unref(form).container_no)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>20&#39;/40&#39;/45&#39;</label><input type="text"${ssrRenderAttr("value", unref(form).container_size)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., 20GP, 40GP, 45GP" data-v-ba47b220${_scopeId}></div></div><div class="mt-6" data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Remarks</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ba47b220${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-ba47b220${_scopeId}>Down Payment (DP)</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-ba47b220${_scopeId}><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Jumlah DP</label><input type="number"${ssrRenderAttr("value", unref(form).down_payment_amount)} step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="0.00" data-v-ba47b220${_scopeId}>`);
            if (__props.errors.down_payment_amount) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-ba47b220${_scopeId}>${ssrInterpolate(__props.errors.down_payment_amount)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Tanggal DP</label><input type="date"${ssrRenderAttr("value", unref(form).down_payment_date)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}>`);
            if (__props.errors.down_payment_date) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-ba47b220${_scopeId}>${ssrInterpolate(__props.errors.down_payment_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Catatan DP</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Catatan terkait down payment..." data-v-ba47b220${_scopeId}>${ssrInterpolate(unref(form).down_payment_notes)}</textarea>`);
            if (__props.errors.down_payment_notes) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-ba47b220${_scopeId}>${ssrInterpolate(__props.errors.down_payment_notes)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ba47b220${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-ba47b220${_scopeId}>VAT (PPN)</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-ba47b220${_scopeId}><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>VAT Rate</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}><option value="" data-v-ba47b220${ssrIncludeBooleanAttr(Array.isArray(unref(form).vat_rate) ? ssrLooseContain(unref(form).vat_rate, "") : ssrLooseEqual(unref(form).vat_rate, "")) ? " selected" : ""}${_scopeId}>No VAT</option><option value="11" data-v-ba47b220${ssrIncludeBooleanAttr(Array.isArray(unref(form).vat_rate) ? ssrLooseContain(unref(form).vat_rate, "11") : ssrLooseEqual(unref(form).vat_rate, "11")) ? " selected" : ""}${_scopeId}>11%</option><option value="1.1" data-v-ba47b220${ssrIncludeBooleanAttr(Array.isArray(unref(form).vat_rate) ? ssrLooseContain(unref(form).vat_rate, "1.1") : ssrLooseEqual(unref(form).vat_rate, "1.1")) ? " selected" : ""}${_scopeId}>1.1%</option></select>`);
            if (__props.errors.vat_rate) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-ba47b220${_scopeId}>${ssrInterpolate(__props.errors.vat_rate)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>VAT Amount</label><input type="text"${ssrRenderAttr("value", formatCurrency(calculateVatAmount()))} class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" readonly data-v-ba47b220${_scopeId}></div></div></div><div class="space-y-6" data-v-ba47b220${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ba47b220${_scopeId}><div class="flex items-center justify-between mb-4" data-v-ba47b220${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-ba47b220${_scopeId}>Item Invoice Utama</h3><button type="button" class="inline-flex items-center px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-ba47b220${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ba47b220${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-ba47b220${_scopeId}></path></svg> Tambah Item </button></div>`);
            if (mainItems.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" data-v-ba47b220${_scopeId}><div class="flex flex-col items-center" data-v-ba47b220${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ba47b220${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-ba47b220${_scopeId}></path></svg><p data-v-ba47b220${_scopeId}>Belum ada item invoice utama</p><p class="text-sm" data-v-ba47b220${_scopeId}>Klik tombol &quot;Tambah Item&quot; untuk menambah item</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4" data-v-ba47b220${_scopeId}><!--[-->`);
            ssrRenderList(mainItems.value, (item, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4" data-v-ba47b220${_scopeId}><div class="flex items-center justify-between mb-4" data-v-ba47b220${_scopeId}><h4 class="font-medium text-gray-900" data-v-ba47b220${_scopeId}>Item ${ssrInterpolate(index + 1)}</h4><button type="button" class="text-red-600 hover:text-red-800" data-v-ba47b220${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ba47b220${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-ba47b220${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-6 gap-4" data-v-ba47b220${_scopeId}><div class="md:col-span-2" data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Deskripsi</label><input type="text"${ssrRenderAttr("value", item.description)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Qty</label><input type="number"${ssrRenderAttr("value", item.quantity)} step="0.01" min="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Unit</label><input type="text"${ssrRenderAttr("value", item.unit)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Rate</label><input type="number"${ssrRenderAttr("value", item.rate)} step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-ba47b220${_scopeId}>Amount</label><input type="text"${ssrRenderAttr("value", formatCurrency(item.amount || 0))} class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" readonly data-v-ba47b220${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ba47b220${_scopeId}><div class="flex items-center justify-between mb-4" data-v-ba47b220${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-ba47b220${_scopeId}>Item Reimbursement</h3><button type="button" class="inline-flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors" data-v-ba47b220${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ba47b220${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-ba47b220${_scopeId}></path></svg> Tambah Item Reimbursement </button></div>`);
            if (reimbursementItems.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" data-v-ba47b220${_scopeId}><div class="flex flex-col items-center" data-v-ba47b220${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ba47b220${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-ba47b220${_scopeId}></path></svg><p data-v-ba47b220${_scopeId}>Belum ada item reimbursement</p><p class="text-sm" data-v-ba47b220${_scopeId}>Klik tombol &quot;Tambah Item Reimbursement&quot; untuk menambah item</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4" data-v-ba47b220${_scopeId}><!--[-->`);
            ssrRenderList(reimbursementItems.value, (item, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4" data-v-ba47b220${_scopeId}><div class="flex justify-between items-center mb-3" data-v-ba47b220${_scopeId}><h4 class="font-medium text-gray-700" data-v-ba47b220${_scopeId}>Reimbursement Item #${ssrInterpolate(index + 1)}</h4><button type="button" class="text-red-600 hover:text-red-800" data-v-ba47b220${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ba47b220${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-ba47b220${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-ba47b220${_scopeId}><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ba47b220${_scopeId}>Item Number/Ref</label><input${ssrRenderAttr("value", item.item_ref)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., REIMB-001" data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ba47b220${_scopeId}>Currency</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}><option value="IDR" data-v-ba47b220${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "IDR") : ssrLooseEqual(item.currency, "IDR")) ? " selected" : ""}${_scopeId}>IDR</option><option value="USD" data-v-ba47b220${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "USD") : ssrLooseEqual(item.currency, "USD")) ? " selected" : ""}${_scopeId}>USD</option><option value="EUR" data-v-ba47b220${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "EUR") : ssrLooseEqual(item.currency, "EUR")) ? " selected" : ""}${_scopeId}>EUR</option><option value="SGD" data-v-ba47b220${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "SGD") : ssrLooseEqual(item.currency, "SGD")) ? " selected" : ""}${_scopeId}>SGD</option></select></div></div><div class="mt-3" data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ba47b220${_scopeId}>Description</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" placeholder="e.g., Biaya trucking dari gudang ke pelabuhan" required data-v-ba47b220${_scopeId}>${ssrInterpolate(item.description)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3" data-v-ba47b220${_scopeId}><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ba47b220${_scopeId}>Vendor</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ba47b220${_scopeId}><option${ssrRenderAttr("value", null)} data-v-ba47b220${ssrIncludeBooleanAttr(Array.isArray(item.vendor_id) ? ssrLooseContain(item.vendor_id, null) : ssrLooseEqual(item.vendor_id, null)) ? " selected" : ""}${_scopeId}>-- Divisi Operational / Internal --</option><!--[-->`);
              ssrRenderList(vendorOptions.value, (vendor) => {
                _push2(`<option${ssrRenderAttr("value", vendor.id)} data-v-ba47b220${ssrIncludeBooleanAttr(Array.isArray(item.vendor_id) ? ssrLooseContain(item.vendor_id, vendor.id) : ssrLooseEqual(item.vendor_id, vendor.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendor.nama_vendor)}</option>`);
              });
              _push2(`<!--]--></select><p class="text-xs text-gray-500 mt-1" data-v-ba47b220${_scopeId}>Kosongkan jika biaya ditanggung internal / Divisi Operational.</p></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3" data-v-ba47b220${_scopeId}><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ba47b220${_scopeId}>Quantity</label><input${ssrRenderAttr("value", item.quantity)} type="number" step="0.01" min="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="1" required data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ba47b220${_scopeId}>Unit Rate</label><input${ssrRenderAttr("value", item.rate)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="500000" required data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-ba47b220${_scopeId}>Total Amount</label><input type="text"${ssrRenderAttr("value", formatCurrency(item.amount || 0, item.currency || "IDR"))} class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600" readonly data-v-ba47b220${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-red-200" data-v-ba47b220${_scopeId}><div class="flex items-center justify-between mb-4" data-v-ba47b220${_scopeId}><div class="flex items-center space-x-3" data-v-ba47b220${_scopeId}><h3 class="text-lg font-semibold text-red-800" data-v-ba47b220${_scopeId}>Biaya Lain / Operational Costs</h3><span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800" data-v-ba47b220${_scopeId}> Internal Only </span></div><button type="button" class="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-ba47b220${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ba47b220${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-ba47b220${_scopeId}></path></svg> Tambah Biaya Operasional </button></div><div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-4" data-v-ba47b220${_scopeId}><div class="flex items-start" data-v-ba47b220${_scopeId}><svg class="w-5 h-5 text-red-600 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ba47b220${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-ba47b220${_scopeId}></path></svg><div class="text-sm text-red-700" data-v-ba47b220${_scopeId}><p class="font-medium mb-1" data-v-ba47b220${_scopeId}>Catatan Penting:</p><p data-v-ba47b220${_scopeId}>Biaya operasional tidak akan muncul di invoice customer dan hanya digunakan untuk perhitungan profit internal.</p></div></div></div>`);
            if (operationalCosts.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-red-300 rounded-lg" data-v-ba47b220${_scopeId}><div class="flex flex-col items-center" data-v-ba47b220${_scopeId}><svg class="w-12 h-12 text-red-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ba47b220${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-3-6h6" data-v-ba47b220${_scopeId}></path></svg><p class="text-red-600" data-v-ba47b220${_scopeId}>Belum ada biaya operasional</p><p class="text-sm text-red-500" data-v-ba47b220${_scopeId}>Klik tombol &quot;Tambah Biaya Operasional&quot; untuk menambah biaya internal</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4" data-v-ba47b220${_scopeId}><!--[-->`);
            ssrRenderList(operationalCosts.value, (cost, index) => {
              _push2(`<div class="border border-red-200 rounded-lg p-4 bg-red-50" data-v-ba47b220${_scopeId}><div class="flex items-center justify-between mb-4" data-v-ba47b220${_scopeId}><h4 class="font-medium text-red-800" data-v-ba47b220${_scopeId}>Biaya Operasional ${ssrInterpolate(index + 1)}</h4><button type="button" class="text-red-600 hover:text-red-800" data-v-ba47b220${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ba47b220${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-ba47b220${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-6 gap-4" data-v-ba47b220${_scopeId}><div class="md:col-span-2" data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-red-700 mb-2" data-v-ba47b220${_scopeId}>Deskripsi</label><input type="text"${ssrRenderAttr("value", cost.description)} class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="e.g., Biaya trucking internal" required data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-red-700 mb-2" data-v-ba47b220${_scopeId}>Qty</label><input type="number"${ssrRenderAttr("value", cost.quantity)} step="0.01" min="0.01" class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-red-700 mb-2" data-v-ba47b220${_scopeId}>Unit</label><input type="text"${ssrRenderAttr("value", cost.unit)} class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="SET, KG, dll" required data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-red-700 mb-2" data-v-ba47b220${_scopeId}>Rate</label><input type="number"${ssrRenderAttr("value", cost.rate)} step="0.01" min="0" class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required data-v-ba47b220${_scopeId}></div><div data-v-ba47b220${_scopeId}><label class="block text-sm font-medium text-red-700 mb-2" data-v-ba47b220${_scopeId}>Amount</label><input type="text"${ssrRenderAttr("value", formatCurrency(cost.amount || 0))} class="w-full px-3 py-2 border border-red-300 rounded-lg bg-red-100" readonly data-v-ba47b220${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (operationalCosts.value.length > 0) {
              _push2(`<div class="mt-6 bg-red-50 border border-red-200 rounded-lg p-4" data-v-ba47b220${_scopeId}><div class="flex justify-between items-center" data-v-ba47b220${_scopeId}><span class="text-sm font-medium text-red-700" data-v-ba47b220${_scopeId}>Total Biaya Operasional:</span><span class="text-lg font-bold text-red-800" data-v-ba47b220${_scopeId}>${ssrInterpolate(formatCurrency(calculateOperationalTotal()))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white rounded-lg shadow-sm p-6 border border-purple-200" data-v-ba47b220${_scopeId}><h3 class="text-lg font-semibold text-purple-800 mb-4 flex items-center" data-v-ba47b220${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ba47b220${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-ba47b220${_scopeId}></path></svg> Ringkasan Profit </h3><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-ba47b220${_scopeId}><div class="bg-green-50 rounded-lg p-4 border border-green-200" data-v-ba47b220${_scopeId}><div class="text-center" data-v-ba47b220${_scopeId}><div class="text-xl font-bold text-green-800" data-v-ba47b220${_scopeId}>${ssrInterpolate(formatCurrency(calculateGrossRevenue()))}</div><div class="text-sm text-green-600 mt-1" data-v-ba47b220${_scopeId}>Gross Revenue</div></div></div><div class="bg-red-50 rounded-lg p-4 border border-red-200" data-v-ba47b220${_scopeId}><div class="text-center" data-v-ba47b220${_scopeId}><div class="text-xl font-bold text-red-800" data-v-ba47b220${_scopeId}>${ssrInterpolate(formatCurrency(calculateOperationalTotal()))}</div><div class="text-sm text-red-600 mt-1" data-v-ba47b220${_scopeId}>Operational Costs</div></div></div><div class="bg-blue-50 rounded-lg p-4 border border-blue-200" data-v-ba47b220${_scopeId}><div class="text-center" data-v-ba47b220${_scopeId}><div class="text-xl font-bold text-blue-800" data-v-ba47b220${_scopeId}>${ssrInterpolate(formatCurrency(calculateNetProfit()))}</div><div class="text-sm text-blue-600 mt-1" data-v-ba47b220${_scopeId}>Net Profit</div></div></div><div class="bg-purple-50 rounded-lg p-4 border border-purple-200" data-v-ba47b220${_scopeId}><div class="text-center" data-v-ba47b220${_scopeId}><div class="text-xl font-bold text-purple-800" data-v-ba47b220${_scopeId}>${ssrInterpolate(calculateProfitMargin())}%</div><div class="text-sm text-purple-600 mt-1" data-v-ba47b220${_scopeId}>Profit Margin</div></div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-ba47b220${_scopeId}><div class="flex items-center justify-between" data-v-ba47b220${_scopeId}><div class="text-lg font-semibold text-sage-800" data-v-ba47b220${_scopeId}> Total: ${ssrInterpolate(formatCurrency(calculateTotal()))}</div><div class="flex space-x-4" data-v-ba47b220${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: backToIndexUrl.value,
              class: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50" data-v-ba47b220${_scopeId}>${ssrInterpolate(unref(form).processing ? "Memperbarui..." : "Perbarui Invoice")}</button></div></div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Edit Invoice"),
                      createVNode("p", { class: "text-sage-600" }, toDisplayString(__props.invoice.invoice_number), 1)
                    ]),
                    createVNode(unref(Link), {
                      href: backToIndexUrl.value,
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
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Sales Order & Type Invoice"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Sales Order"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).sales_order_id = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600",
                          disabled: ""
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrders, (salesOrder) => {
                            return openBlock(), createBlock("option", {
                              key: salesOrder.id,
                              value: salesOrder.id
                            }, toDisplayString(salesOrder.order_number) + " - " + toDisplayString(salesOrder.customer || salesOrder.customer_name), 9, ["value"]);
                          }), 128))
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).sales_order_id]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Tipe Invoice"),
                        createVNode("div", { class: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600" }, toDisplayString(getInvoiceTypeLabel(__props.invoice.invoice_type)), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Detail Invoice"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Tanggal Invoice"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).invoice_date = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).invoice_date]
                        ]),
                        __props.errors.invoice_date ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(__props.errors.invoice_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Term (Hari)"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => unref(form).term_days = $event,
                          min: "1",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).term_days]
                        ]),
                        __props.errors.term_days ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(__props.errors.term_days), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Detail Pengiriman"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Shipper"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).shipper = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).shipper]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Consignee"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).consignee = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).consignee]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "AWB/BL No."),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).awb_bl_no = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).awb_bl_no]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "MAWB/OBL No."),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).mawb_obl_no = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).mawb_obl_no]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Vessel"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).vessel = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).vessel]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Flight/VOY"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).flight_voy = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).flight_voy]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Origin"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).origin = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).origin]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Destination"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).destination = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).destination]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "POL/POD"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).pol_pod = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).pol_pod]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "ETD"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).etd = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).etd]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "ETA"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).eta = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).eta]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Gross Weight (KG)"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          step: "0.01",
                          min: "0",
                          "onUpdate:modelValue": ($event) => unref(form).gross_weight = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).gross_weight]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Net Weight (KG)"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          step: "0.0001",
                          min: "0",
                          "onUpdate:modelValue": ($event) => unref(form).net_weight = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).net_weight]
                        ]),
                        __props.errors.net_weight ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(__props.errors.net_weight), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Volume"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).volume = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).volume]
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "No. of Packages"),
                          withDirectives(createVNode("input", {
                            type: "number",
                            "onUpdate:modelValue": ($event) => unref(form).no_of_packages = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).no_of_packages]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Package Unit"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).package_unit = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Select Unit"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.packageUnits, (unit) => {
                              return openBlock(), createBlock("option", {
                                key: unit.code,
                                value: unit.code
                              }, toDisplayString(unit.name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).package_unit]
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Container No."),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).container_no = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).container_no]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "20'/40'/45'"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).container_size = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          placeholder: "e.g., 20GP, 40GP, 45GP"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).container_size]
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mt-6" }, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Remarks"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).remarks = $event,
                        rows: "3",
                        class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).remarks]
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Down Payment (DP)"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Jumlah DP"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => unref(form).down_payment_amount = $event,
                          step: "0.01",
                          min: "0",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          placeholder: "0.00"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).down_payment_amount]
                        ]),
                        __props.errors.down_payment_amount ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(__props.errors.down_payment_amount), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Tanggal DP"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).down_payment_date = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).down_payment_date]
                        ]),
                        __props.errors.down_payment_date ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(__props.errors.down_payment_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Catatan DP"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).down_payment_notes = $event,
                          rows: "2",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          placeholder: "Catatan terkait down payment..."
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).down_payment_notes]
                        ]),
                        __props.errors.down_payment_notes ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(__props.errors.down_payment_notes), 1)) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "VAT (PPN)"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "VAT Rate"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).vat_rate = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, [
                          createVNode("option", { value: "" }, "No VAT"),
                          createVNode("option", { value: "11" }, "11%"),
                          createVNode("option", { value: "1.1" }, "1.1%")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).vat_rate]
                        ]),
                        __props.errors.vat_rate ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(__props.errors.vat_rate), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "VAT Amount"),
                        createVNode("input", {
                          type: "text",
                          value: formatCurrency(calculateVatAmount()),
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100",
                          readonly: ""
                        }, null, 8, ["value"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Item Invoice Utama"),
                        createVNode("button", {
                          type: "button",
                          onClick: addItem,
                          class: "inline-flex items-center px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 mr-2",
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
                          createTextVNode(" Tambah Item ")
                        ])
                      ]),
                      mainItems.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg"
                      }, [
                        createVNode("div", { class: "flex flex-col items-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-12 h-12 text-gray-300 mb-2",
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
                          createVNode("p", null, "Belum ada item invoice utama"),
                          createVNode("p", { class: "text-sm" }, 'Klik tombol "Tambah Item" untuk menambah item')
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(mainItems.value, (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: "main-" + index,
                            class: "border border-gray-200 rounded-lg p-4"
                          }, [
                            createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                              createVNode("h4", { class: "font-medium text-gray-900" }, "Item " + toDisplayString(index + 1), 1),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeMainItem(index),
                                class: "text-red-600 hover:text-red-800"
                              }, [
                                (openBlock(), createBlock("svg", {
                                  class: "w-5 h-5",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  })
                                ]))
                              ], 8, ["onClick"])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-6 gap-4" }, [
                              createVNode("div", { class: "md:col-span-2" }, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Deskripsi"),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => item.description = $event,
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  required: ""
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.description]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Qty"),
                                withDirectives(createVNode("input", {
                                  type: "number",
                                  "onUpdate:modelValue": ($event) => item.quantity = $event,
                                  onInput: ($event) => calculateMainAmount(index),
                                  step: "0.01",
                                  min: "0.01",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  required: ""
                                }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                  [vModelText, item.quantity]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Unit"),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => item.unit = $event,
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  required: ""
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.unit]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Rate"),
                                withDirectives(createVNode("input", {
                                  type: "number",
                                  "onUpdate:modelValue": ($event) => item.rate = $event,
                                  onInput: ($event) => calculateMainAmount(index),
                                  step: "0.01",
                                  min: "0",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  required: ""
                                }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                  [vModelText, item.rate]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Amount"),
                                createVNode("input", {
                                  type: "text",
                                  value: formatCurrency(item.amount || 0),
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100",
                                  readonly: ""
                                }, null, 8, ["value"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Item Reimbursement"),
                        createVNode("button", {
                          type: "button",
                          onClick: addReimbursementItem,
                          class: "inline-flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 mr-2",
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
                          createTextVNode(" Tambah Item Reimbursement ")
                        ])
                      ]),
                      reimbursementItems.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg"
                      }, [
                        createVNode("div", { class: "flex flex-col items-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-12 h-12 text-gray-300 mb-2",
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
                          createVNode("p", null, "Belum ada item reimbursement"),
                          createVNode("p", { class: "text-sm" }, 'Klik tombol "Tambah Item Reimbursement" untuk menambah item')
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(reimbursementItems.value, (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: "reimb-" + index,
                            class: "border border-gray-200 rounded-lg p-4"
                          }, [
                            createVNode("div", { class: "flex justify-between items-center mb-3" }, [
                              createVNode("h4", { class: "font-medium text-gray-700" }, "Reimbursement Item #" + toDisplayString(index + 1), 1),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeReimbursementItem(index),
                                class: "text-red-600 hover:text-red-800"
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
                                    d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  })
                                ]))
                              ], 8, ["onClick"])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Item Number/Ref"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.item_ref = $event,
                                  type: "text",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  placeholder: "e.g., REIMB-001"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.item_ref]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Currency"),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => item.currency = $event,
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, [
                                  createVNode("option", { value: "IDR" }, "IDR"),
                                  createVNode("option", { value: "USD" }, "USD"),
                                  createVNode("option", { value: "EUR" }, "EUR"),
                                  createVNode("option", { value: "SGD" }, "SGD")
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, item.currency]
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "mt-3" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Description"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => item.description = $event,
                                rows: "2",
                                class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none",
                                placeholder: "e.g., Biaya trucking dari gudang ke pelabuhan",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, item.description]
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 mt-3" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Vendor"),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => item.vendor_id = $event,
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, [
                                  createVNode("option", { value: null }, "-- Divisi Operational / Internal --"),
                                  (openBlock(true), createBlock(Fragment, null, renderList(vendorOptions.value, (vendor) => {
                                    return openBlock(), createBlock("option", {
                                      key: vendor.id,
                                      value: vendor.id
                                    }, toDisplayString(vendor.nama_vendor), 9, ["value"]);
                                  }), 128))
                                ], 8, ["onUpdate:modelValue"]), [
                                  [vModelSelect, item.vendor_id]
                                ]),
                                createVNode("p", { class: "text-xs text-gray-500 mt-1" }, "Kosongkan jika biaya ditanggung internal / Divisi Operational.")
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4 mt-3" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Quantity"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.quantity = $event,
                                  onInput: ($event) => calculateReimbursementAmount(index),
                                  type: "number",
                                  step: "0.01",
                                  min: "0.01",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  placeholder: "1",
                                  required: ""
                                }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                  [vModelText, item.quantity]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Unit Rate"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.rate = $event,
                                  onInput: ($event) => calculateReimbursementAmount(index),
                                  type: "number",
                                  step: "0.01",
                                  min: "0",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                  placeholder: "500000",
                                  required: ""
                                }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                  [vModelText, item.rate]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Total Amount"),
                                createVNode("input", {
                                  type: "text",
                                  value: formatCurrency(item.amount || 0, item.currency || "IDR"),
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600",
                                  readonly: ""
                                }, null, 8, ["value"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-red-200" }, [
                    createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                      createVNode("div", { class: "flex items-center space-x-3" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-red-800" }, "Biaya Lain / Operational Costs"),
                        createVNode("span", { class: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800" }, " Internal Only ")
                      ]),
                      createVNode("button", {
                        type: "button",
                        onClick: addOperationalCost,
                        class: "inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 mr-2",
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
                        createTextVNode(" Tambah Biaya Operasional ")
                      ])
                    ]),
                    createVNode("div", { class: "bg-red-50 border border-red-200 rounded-lg p-4 mb-4" }, [
                      createVNode("div", { class: "flex items-start" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5 text-red-600 mt-0.5 mr-3",
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
                        createVNode("div", { class: "text-sm text-red-700" }, [
                          createVNode("p", { class: "font-medium mb-1" }, "Catatan Penting:"),
                          createVNode("p", null, "Biaya operasional tidak akan muncul di invoice customer dan hanya digunakan untuk perhitungan profit internal.")
                        ])
                      ])
                    ]),
                    operationalCosts.value.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-gray-500 text-center py-8 border-2 border-dashed border-red-300 rounded-lg"
                    }, [
                      createVNode("div", { class: "flex flex-col items-center" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-12 h-12 text-red-300 mb-2",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-3-6h6"
                          })
                        ])),
                        createVNode("p", { class: "text-red-600" }, "Belum ada biaya operasional"),
                        createVNode("p", { class: "text-sm text-red-500" }, 'Klik tombol "Tambah Biaya Operasional" untuk menambah biaya internal')
                      ])
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "space-y-4" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(operationalCosts.value, (cost, index) => {
                        return openBlock(), createBlock("div", {
                          key: "op-cost-" + index,
                          class: "border border-red-200 rounded-lg p-4 bg-red-50"
                        }, [
                          createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                            createVNode("h4", { class: "font-medium text-red-800" }, "Biaya Operasional " + toDisplayString(index + 1), 1),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => removeOperationalCost(index),
                              class: "text-red-600 hover:text-red-800"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-5 h-5",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                })
                              ]))
                            ], 8, ["onClick"])
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-6 gap-4" }, [
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode("label", { class: "block text-sm font-medium text-red-700 mb-2" }, "Deskripsi"),
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => cost.description = $event,
                                class: "w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500",
                                placeholder: "e.g., Biaya trucking internal",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, cost.description]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-red-700 mb-2" }, "Qty"),
                              withDirectives(createVNode("input", {
                                type: "number",
                                "onUpdate:modelValue": ($event) => cost.quantity = $event,
                                onInput: ($event) => calculateOperationalAmount(index),
                                step: "0.01",
                                min: "0.01",
                                class: "w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500",
                                required: ""
                              }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                [vModelText, cost.quantity]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-red-700 mb-2" }, "Unit"),
                              withDirectives(createVNode("input", {
                                type: "text",
                                "onUpdate:modelValue": ($event) => cost.unit = $event,
                                class: "w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500",
                                placeholder: "SET, KG, dll",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, cost.unit]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-red-700 mb-2" }, "Rate"),
                              withDirectives(createVNode("input", {
                                type: "number",
                                "onUpdate:modelValue": ($event) => cost.rate = $event,
                                onInput: ($event) => calculateOperationalAmount(index),
                                step: "0.01",
                                min: "0",
                                class: "w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500",
                                required: ""
                              }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                [vModelText, cost.rate]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-red-700 mb-2" }, "Amount"),
                              createVNode("input", {
                                type: "text",
                                value: formatCurrency(cost.amount || 0),
                                class: "w-full px-3 py-2 border border-red-300 rounded-lg bg-red-100",
                                readonly: ""
                              }, null, 8, ["value"])
                            ])
                          ])
                        ]);
                      }), 128))
                    ]),
                    operationalCosts.value.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-6 bg-red-50 border border-red-200 rounded-lg p-4"
                    }, [
                      createVNode("div", { class: "flex justify-between items-center" }, [
                        createVNode("span", { class: "text-sm font-medium text-red-700" }, "Total Biaya Operasional:"),
                        createVNode("span", { class: "text-lg font-bold text-red-800" }, toDisplayString(formatCurrency(calculateOperationalTotal())), 1)
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-purple-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-purple-800 mb-4 flex items-center" }, [
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
                          d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        })
                      ])),
                      createTextVNode(" Ringkasan Profit ")
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                      createVNode("div", { class: "bg-green-50 rounded-lg p-4 border border-green-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-xl font-bold text-green-800" }, toDisplayString(formatCurrency(calculateGrossRevenue())), 1),
                          createVNode("div", { class: "text-sm text-green-600 mt-1" }, "Gross Revenue")
                        ])
                      ]),
                      createVNode("div", { class: "bg-red-50 rounded-lg p-4 border border-red-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-xl font-bold text-red-800" }, toDisplayString(formatCurrency(calculateOperationalTotal())), 1),
                          createVNode("div", { class: "text-sm text-red-600 mt-1" }, "Operational Costs")
                        ])
                      ]),
                      createVNode("div", { class: "bg-blue-50 rounded-lg p-4 border border-blue-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-xl font-bold text-blue-800" }, toDisplayString(formatCurrency(calculateNetProfit())), 1),
                          createVNode("div", { class: "text-sm text-blue-600 mt-1" }, "Net Profit")
                        ])
                      ]),
                      createVNode("div", { class: "bg-purple-50 rounded-lg p-4 border border-purple-200" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-xl font-bold text-purple-800" }, toDisplayString(calculateProfitMargin()) + "%", 1),
                          createVNode("div", { class: "text-sm text-purple-600 mt-1" }, "Profit Margin")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-lg font-semibold text-sage-800" }, " Total: " + toDisplayString(formatCurrency(calculateTotal())), 1),
                      createVNode("div", { class: "flex space-x-4" }, [
                        createVNode(unref(Link), {
                          href: backToIndexUrl.value,
                          class: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50"
                        }, toDisplayString(unref(form).processing ? "Memperbarui..." : "Perbarui Invoice"), 9, ["disabled"])
                      ])
                    ])
                  ])
                ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Invoices/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ba47b220"]]);
export {
  Edit as default
};
