import { useSSRContext, ref, onMounted, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, createCommentVNode, withDirectives, Fragment, renderList, toDisplayString, vModelSelect, vModelText } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1Q9-d_q.js";
import axios from "axios";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-D8P-wM_6.js";
const _sfc_main$1 = {
  setup(props, { emit }) {
    const operationalCosts = ref(props.modelValue);
    const categorizedTemplates = ref([]);
    const isLoading = ref(false);
    onMounted(async () => {
      await loadTemplates();
    });
    const loadTemplates = async () => {
      try {
        isLoading.value = true;
        const response = await axios.get("/admin-keuangan/api/expense-templates/by-category");
        if (response.data.success) {
          categorizedTemplates.value = response.data.data;
        }
      } catch (error) {
        console.error("Failed to load templates:", error);
      } finally {
        isLoading.value = false;
      }
    };
    const addOperationalCost = () => {
      const newCost = {
        description: "",
        quantity: 1,
        unit: "pcs",
        rate: 0,
        currency: "IDR",
        amount: 0,
        item_type: "operational_cost",
        include_in_customer_invoice: false,
        is_hidden_from_customer: true,
        template_id: null,
        category_id: null,
        selected_template: null,
        manual_mode: false,
        suggested_category: null,
        categorization_method: "manual",
        amount_warning: null
      };
      operationalCosts.value.push(newCost);
      emit("update:modelValue", operationalCosts.value);
    };
    const removeOperationalCost = (index) => {
      operationalCosts.value.splice(index, 1);
      emit("update:modelValue", operationalCosts.value);
    };
    const selectTemplate = (costIndex) => {
      const cost = operationalCosts.value[costIndex];
      const template = findTemplateById(cost.template_id);
      if (template) {
        cost.selected_template = template;
        cost.description = template.name;
        cost.category_id = template.category_id;
        cost.manual_mode = false;
        cost.categorization_method = "template";
        if (!cost.rate && template.typical_amount_min > 0) {
          cost.rate = template.typical_amount_min;
        }
        if (cost.rate > 0 && !isInAmountRange(template, cost.rate)) {
          cost.amount_warning = `Amount outside typical range (${formatCurrency(template.typical_amount_min)} - ${formatCurrency(template.typical_amount_max)})`;
        } else {
          cost.amount_warning = null;
        }
        calculateOperationalAmount(costIndex);
      }
      emit("update:modelValue", operationalCosts.value);
    };
    const toggleManualMode = (costIndex) => {
      operationalCosts.value[costIndex].manual_mode = !operationalCosts.value[costIndex].manual_mode;
      emit("update:modelValue", operationalCosts.value);
    };
    const checkKeywords = async (costIndex) => {
      const cost = operationalCosts.value[costIndex];
      if (cost.description.length > 3) {
        try {
          const response = await axios.post("/admin-keuangan/api/expense-templates/check-keywords", {
            description: cost.description
          });
          if (response.data.success && response.data.data.found) {
            const result = response.data.data;
            cost.suggested_category = result.category_name;
            cost.category_id = result.category_id;
            cost.categorization_method = "keyword";
          }
        } catch (error) {
          console.warn("Keyword check failed:", error);
        }
      }
      emit("update:modelValue", operationalCosts.value);
    };
    const calculateOperationalAmount = (index) => {
      const cost = operationalCosts.value[index];
      cost.quantity = 1;
      cost.amount = parseFloat(cost.rate || 0);
      if (cost.selected_template && cost.rate > 0) {
        if (!isInAmountRange(cost.selected_template, cost.rate)) {
          cost.amount_warning = `Amount outside typical range (${formatCurrency(cost.selected_template.typical_amount_min)} - ${formatCurrency(cost.selected_template.typical_amount_max)})`;
        } else {
          cost.amount_warning = null;
        }
      }
      emit("update:modelValue", operationalCosts.value);
    };
    const calculateOperationalTotal = () => {
      return operationalCosts.value.reduce((total, cost) => {
        return total + parseFloat(cost.amount || 0);
      }, 0);
    };
    const findTemplateById = (templateId) => {
      for (let category of categorizedTemplates.value) {
        const template = category.templates.find((t) => t.id === templateId);
        if (template) return template;
      }
      return null;
    };
    const getCategoryName = (cost) => {
      if (cost.selected_template) {
        return cost.selected_template.category_name || "Unknown";
      }
      const category = props.categories.find((c) => c.id === cost.category_id);
      return category ? category.name : "Belum dipilih";
    };
    const getPreviewText = (cost) => {
      if (cost.selected_template) {
        return cost.selected_template.name;
      }
      return cost.description || "Belum ada deskripsi";
    };
    const getCategorizationMethodText = (method) => {
      switch (method) {
        case "template":
          return "Template";
        case "keyword":
          return "Keyword Match";
        case "manual":
          return "Manual";
        default:
          return "Unknown";
      }
    };
    const isInAmountRange = (template, amount) => {
      if (!template.typical_amount_min || !template.typical_amount_max) return true;
      return amount >= template.typical_amount_min && amount <= template.typical_amount_max;
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount || 0);
    };
    return {
      operationalCosts,
      categorizedTemplates,
      isLoading,
      addOperationalCost,
      removeOperationalCost,
      selectTemplate,
      toggleManualMode,
      checkKeywords,
      calculateOperationalAmount,
      calculateOperationalTotal,
      getCategoryName,
      getPreviewText,
      getCategorizationMethodText,
      formatCurrency
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Components/OperationalCostsSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    salesOrders: Array,
    errors: Object,
    preselectedSalesOrder: [String, Number],
    preselectedInvoiceType: String,
    preselectedVendorBreakdown: Array,
    pettyCashCategories: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.invoices.index": "/admin-keuangan/invoices",
        "admin-keuangan.invoices.store": "/admin-keuangan/invoices"
      };
      return routes[name] || "#";
    };
    const mainItems = ref([]);
    const reimbursementItems = ref([]);
    const operationalCosts = ref([]);
    const form = useForm({
      sales_order_id: props.preselectedSalesOrder || "",
      invoice_type: "combined",
      // Always combined since we show both sections
      invoice_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      term_days: 30,
      shipper: "",
      consignee: "",
      awb_bl_no: "",
      mawb_obl_no: "",
      gross_weight: "",
      volume: "",
      no_of_packages: "",
      vessel: "",
      flight_voy: "",
      pol_pod: "",
      origin: "",
      destination: "",
      etd: "",
      eta: "",
      container_no: "",
      container_size: "",
      remarks: "",
      down_payment_amount: "",
      down_payment_date: "",
      down_payment_notes: "",
      items: []
    });
    const loadSalesOrderData = () => {
      const selectedOrder = props.salesOrders.find((order) => order.id == form.sales_order_id);
      if (selectedOrder) {
        form.consignee = selectedOrder.customer || selectedOrder.customer_name || "";
        form.shipper = selectedOrder.shipper || "";
        form.vessel = selectedOrder.vessel || "";
        form.awb_bl_no = selectedOrder.bl_awb || selectedOrder.awb_bl_number || "";
        form.pol_pod = selectedOrder.pol && selectedOrder.pod ? `${selectedOrder.pol}/${selectedOrder.pod}` : selectedOrder.pol_pod || "";
        form.origin = selectedOrder.pol || "";
        form.destination = selectedOrder.pod || "";
        if (selectedOrder.eta) {
          form.eta = formatDateForInput(selectedOrder.eta);
        }
        if (selectedOrder.etd) {
          form.etd = formatDateForInput(selectedOrder.etd);
        }
        form.gross_weight = selectedOrder.net_weight || "";
        form.volume = selectedOrder.measurement || "";
        form.no_of_packages = selectedOrder.qty || "";
        form.container_size = selectedOrder.shipment_type || "";
        if (selectedOrder.container_no) {
          form.container_no = Array.isArray(selectedOrder.container_no) ? selectedOrder.container_no.join(", ") : selectedOrder.container_no;
        }
        populateItemsFromVendorBreakdown(selectedOrder.vendor_breakdown);
      }
    };
    const populateItemsFromVendorBreakdown = (vendorBreakdown) => {
      if (!vendorBreakdown || !Array.isArray(vendorBreakdown)) return;
      mainItems.value = [];
      reimbursementItems.value = [];
      vendorBreakdown.forEach((vendor, index) => {
        if (vendor.selling_amount && vendor.selling_amount > 0) {
          mainItems.value.push({
            description: vendor.description || `Service ${index + 1}`,
            quantity: 1,
            unit: "SET",
            rate: parseFloat(vendor.selling_amount),
            currency: "IDR",
            amount: parseFloat(vendor.selling_amount),
            item_ref: `vendor_${vendor.vendor_id || index}`,
            type: "main"
          });
        }
      });
      if (mainItems.value.length === 0) {
        addItem();
      }
    };
    const reloadFromSalesOrder = () => {
      const selectedOrder = props.salesOrders.find((order) => order.id == form.sales_order_id);
      if (selectedOrder && selectedOrder.vendor_breakdown) {
        if (confirm("Ini akan mengganti semua item yang sudah ada dengan data dari Sales Order. Lanjutkan?")) {
          populateItemsFromVendorBreakdown(selectedOrder.vendor_breakdown);
        }
      } else {
        alert("Sales Order ini tidak memiliki vendor breakdown untuk di-load.");
      }
    };
    const addItem = () => {
      mainItems.value.push({
        description: "",
        quantity: 1,
        unit: "SET",
        rate: 0,
        currency: "IDR",
        amount: 0,
        item_ref: "main",
        type: "main"
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
        type: "reimbursement"
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
        // Use decimal 1.0 to match validation
        unit: "pcs",
        rate: 0,
        currency: "IDR",
        amount: 0,
        item_type: "operational_cost",
        include_in_customer_invoice: false,
        is_hidden_from_customer: true,
        category_id: ""
      });
    };
    const removeOperationalCost = (index) => {
      operationalCosts.value.splice(index, 1);
    };
    const onCategoryChange = (index) => {
      const cost = operationalCosts.value[index];
      if (!cost.category_id) {
        return;
      }
      const selectedCategory = props.pettyCashCategories.find((cat) => cat.id == cost.category_id);
      if (selectedCategory) {
        if (!cost.description) {
          cost.description = `Biaya ${selectedCategory.name.toLowerCase()}`;
        }
      }
    };
    const calculateOperationalAmount = (index) => {
      const cost = operationalCosts.value[index];
      cost.quantity = 1;
      cost.amount = parseFloat(cost.rate || 0);
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
      if (grossRevenue <= 0) return "0.00";
      return (calculateNetProfit() / grossRevenue * 100).toFixed(2);
    };
    const calculateTotal = () => {
      const mainTotal = mainItems.value.reduce((total, item) => {
        return total + parseFloat(item.amount || 0);
      }, 0);
      const reimbursementTotal = reimbursementItems.value.reduce((total, item) => {
        return total + parseFloat(item.amount || 0);
      }, 0);
      return mainTotal + reimbursementTotal;
    };
    const formatCurrency = (amount, options = {}) => {
      const {
        style = "decimal",
        currency = "IDR",
        withCurrency = false
      } = options;
      if (withCurrency) {
        return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency,
          minimumFractionDigits: 0
        }).format(amount || 0);
      } else {
        return new Intl.NumberFormat("id-ID").format(amount || 0);
      }
    };
    const formatDateForInput = (dateString) => {
      if (!dateString) return "";
      try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
          return "";
        }
        return date.toISOString().split("T")[0];
      } catch (error) {
        console.warn("Error formatting date:", dateString, error);
        return "";
      }
    };
    const submit = () => {
      const allItems = [
        ...mainItems.value.map((item) => ({
          ...item,
          type: "main",
          item_ref: item.item_ref || "main",
          item_type: "billable",
          include_in_customer_invoice: true,
          is_hidden_from_customer: false
        })),
        ...reimbursementItems.value.map((item) => ({
          ...item,
          type: "reimbursement",
          item_ref: item.item_ref || "reimbursement",
          item_type: "billable",
          include_in_customer_invoice: true,
          is_hidden_from_customer: false
        })),
        ...operationalCosts.value.map((cost) => ({
          ...cost,
          type: "operational",
          item_ref: "operational_cost",
          item_type: "operational_cost",
          include_in_customer_invoice: false,
          is_hidden_from_customer: true
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
      form.post(route("admin-keuangan.invoices.store"));
    };
    if (props.preselectedSalesOrder) {
      loadSalesOrderData();
      if (props.preselectedInvoiceType === "reimbursement" && reimbursementItems.value.length === 0) {
        addReimbursementItem();
      }
    } else {
      addItem();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-c9614e68${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-c9614e68${_scopeId}><div class="flex items-center justify-between" data-v-c9614e68${_scopeId}><div data-v-c9614e68${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-c9614e68${_scopeId}>Buat Invoice Baru</h2><p class="text-sage-600" data-v-c9614e68${_scopeId}>Buat invoice dari sales order yang telah disetujui</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-c9614e68${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div><form class="space-y-6" data-v-c9614e68${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-c9614e68${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-c9614e68${_scopeId}>Pilih Sales Order &amp; Type Invoice</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-c9614e68${_scopeId}><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Sales Order</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-c9614e68${_scopeId}><option value="" data-v-c9614e68${ssrIncludeBooleanAttr(Array.isArray(unref(form).sales_order_id) ? ssrLooseContain(unref(form).sales_order_id, "") : ssrLooseEqual(unref(form).sales_order_id, "")) ? " selected" : ""}${_scopeId}>Pilih Sales Order</option><!--[-->`);
            ssrRenderList(__props.salesOrders, (order) => {
              var _a;
              _push2(`<option${ssrRenderAttr("value", order.id)} data-v-c9614e68${ssrIncludeBooleanAttr(Array.isArray(unref(form).sales_order_id) ? ssrLooseContain(unref(form).sales_order_id, order.id) : ssrLooseEqual(unref(form).sales_order_id, order.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(order.order_number)} - ${ssrInterpolate(order.customer || order.customer_name || "No Customer")} (${ssrInterpolate(((_a = order.status) == null ? void 0 : _a.toUpperCase()) || "APPROVED")}) </option>`);
            });
            _push2(`<!--]--></select>`);
            if (__props.errors.sales_order_id) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-c9614e68${_scopeId}>${ssrInterpolate(__props.errors.sales_order_id)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Tipe Invoice</label><div class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600" data-v-c9614e68${_scopeId}> Combined Invoice (Main + Reimbursement) </div><input type="hidden"${ssrRenderAttr("value", unref(form).invoice_type)} data-v-c9614e68${_scopeId}></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-c9614e68${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-c9614e68${_scopeId}>Detail Invoice</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-c9614e68${_scopeId}><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Tanggal Invoice</label><input type="date"${ssrRenderAttr("value", unref(form).invoice_date)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-c9614e68${_scopeId}>`);
            if (__props.errors.invoice_date) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-c9614e68${_scopeId}>${ssrInterpolate(__props.errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Term (Hari)</label><input type="number"${ssrRenderAttr("value", unref(form).term_days)} min="1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-c9614e68${_scopeId}>`);
            if (__props.errors.term_days) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-c9614e68${_scopeId}>${ssrInterpolate(__props.errors.term_days)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-c9614e68${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-c9614e68${_scopeId}>Detail Pengiriman</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-c9614e68${_scopeId}><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Shipper</label><input type="text"${ssrRenderAttr("value", unref(form).shipper)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Consignee</label><input type="text"${ssrRenderAttr("value", unref(form).consignee)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>AWB/BL No.</label><input type="text"${ssrRenderAttr("value", unref(form).awb_bl_no)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>MAWB/OBL No.</label><input type="text"${ssrRenderAttr("value", unref(form).mawb_obl_no)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Vessel</label><input type="text"${ssrRenderAttr("value", unref(form).vessel)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Flight/VOY</label><input type="text"${ssrRenderAttr("value", unref(form).flight_voy)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>POL/POD</label><input type="text"${ssrRenderAttr("value", unref(form).pol_pod)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Origin</label><input type="text"${ssrRenderAttr("value", unref(form).origin)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Destination</label><input type="text"${ssrRenderAttr("value", unref(form).destination)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>ETD</label><input type="date"${ssrRenderAttr("value", unref(form).etd)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>ETA</label><input type="date"${ssrRenderAttr("value", unref(form).eta)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Gross Weight (KG)</label><input type="number"${ssrRenderAttr("value", unref(form).gross_weight)} step="0.0001"${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Volume</label><input type="text"${ssrRenderAttr("value", unref(form).volume)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" placeholder="e.g., 10.5 M³" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>No of Packages</label><input type="number"${ssrRenderAttr("value", unref(form).no_of_packages)} min="0"${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>20&#39;/40&#39;/45&#39;</label><input type="text"${ssrRenderAttr("value", unref(form).container_size)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" placeholder="e.g., 20GP, 40GP, 45GP" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Container No.</label><input type="text"${ssrRenderAttr("value", unref(form).container_no)}${ssrIncludeBooleanAttr(unref(form).sales_order_id) ? " readonly" : ""} class="${ssrRenderClass([
              "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
              unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
            ])}" placeholder="e.g., MSKU2934199" data-v-c9614e68${_scopeId}></div><div class="md:col-span-2" data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Remarks</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-c9614e68${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-c9614e68${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-c9614e68${_scopeId}>Down Payment (DP)</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6" data-v-c9614e68${_scopeId}><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Jumlah DP</label><input type="number"${ssrRenderAttr("value", unref(form).down_payment_amount)} step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="0.00" data-v-c9614e68${_scopeId}>`);
            if (__props.errors.down_payment_amount) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-c9614e68${_scopeId}>${ssrInterpolate(__props.errors.down_payment_amount)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Tanggal DP</label><input type="date"${ssrRenderAttr("value", unref(form).down_payment_date)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-c9614e68${_scopeId}>`);
            if (__props.errors.down_payment_date) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-c9614e68${_scopeId}>${ssrInterpolate(__props.errors.down_payment_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Catatan DP</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Catatan terkait down payment..." data-v-c9614e68${_scopeId}>${ssrInterpolate(unref(form).down_payment_notes)}</textarea>`);
            if (__props.errors.down_payment_notes) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-c9614e68${_scopeId}>${ssrInterpolate(__props.errors.down_payment_notes)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="space-y-6" data-v-c9614e68${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-c9614e68${_scopeId}><div class="flex items-center justify-between mb-4" data-v-c9614e68${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-c9614e68${_scopeId}>Item Invoice Utama</h3><div class="flex space-x-2" data-v-c9614e68${_scopeId}>`);
            if (unref(form).sales_order_id) {
              _push2(`<button type="button" class="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-c9614e68${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-c9614e68${_scopeId}></path></svg> Load dari SO </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="button" class="inline-flex items-center px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-c9614e68${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-c9614e68${_scopeId}></path></svg> Tambah Item </button></div></div>`);
            if (mainItems.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" data-v-c9614e68${_scopeId}><div class="flex flex-col items-center" data-v-c9614e68${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-c9614e68${_scopeId}></path></svg><p data-v-c9614e68${_scopeId}>Belum ada item invoice utama</p><p class="text-sm" data-v-c9614e68${_scopeId}>Klik tombol &quot;Tambah Item&quot; untuk menambah item</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4" data-v-c9614e68${_scopeId}><!--[-->`);
            ssrRenderList(mainItems.value, (item, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4" data-v-c9614e68${_scopeId}><div class="flex items-center justify-between mb-4" data-v-c9614e68${_scopeId}><h4 class="font-medium text-gray-900" data-v-c9614e68${_scopeId}>Item ${ssrInterpolate(index + 1)}</h4><button type="button" class="text-red-600 hover:text-red-800" data-v-c9614e68${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-c9614e68${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-6 gap-4" data-v-c9614e68${_scopeId}><div class="md:col-span-2" data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Deskripsi</label><input type="text"${ssrRenderAttr("value", item.description)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Qty</label><input type="number"${ssrRenderAttr("value", item.quantity)} step="0.01" min="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Unit</label><input type="text"${ssrRenderAttr("value", item.unit)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Rate</label><input type="number"${ssrRenderAttr("value", item.rate)} step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c9614e68${_scopeId}>Amount</label><input type="text"${ssrRenderAttr("value", formatCurrency(item.amount || 0))} class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" readonly data-v-c9614e68${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (mainItems.value.length > 0) {
              _push2(`<div class="flex justify-center mt-6 pt-4 border-t border-gray-200" data-v-c9614e68${_scopeId}><div class="flex space-x-2" data-v-c9614e68${_scopeId}>`);
              if (unref(form).sales_order_id) {
                _push2(`<button type="button" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-c9614e68${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-c9614e68${_scopeId}></path></svg> Load dari SO </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button type="button" class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-c9614e68${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-c9614e68${_scopeId}></path></svg> Tambah Item Lagi </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-c9614e68${_scopeId}><div class="flex items-center justify-between mb-4" data-v-c9614e68${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-c9614e68${_scopeId}>Item Reimbursement</h3><button type="button" class="inline-flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors" data-v-c9614e68${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-c9614e68${_scopeId}></path></svg> Tambah Item Reimbursement </button></div>`);
            if (reimbursementItems.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" data-v-c9614e68${_scopeId}><div class="flex flex-col items-center" data-v-c9614e68${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-c9614e68${_scopeId}></path></svg><p data-v-c9614e68${_scopeId}>Belum ada item reimbursement</p><p class="text-sm" data-v-c9614e68${_scopeId}>Klik tombol &quot;Tambah Item Reimbursement&quot; untuk menambah item</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4" data-v-c9614e68${_scopeId}><!--[-->`);
            ssrRenderList(reimbursementItems.value, (item, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4" data-v-c9614e68${_scopeId}><div class="flex justify-between items-center mb-3" data-v-c9614e68${_scopeId}><h4 class="font-medium text-gray-700" data-v-c9614e68${_scopeId}>Reimbursement Item #${ssrInterpolate(index + 1)}</h4><button type="button" class="text-red-600 hover:text-red-800" data-v-c9614e68${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-c9614e68${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-c9614e68${_scopeId}><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-c9614e68${_scopeId}>Item Number/Ref</label><input${ssrRenderAttr("value", item.item_ref)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., REIMB-001" data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-c9614e68${_scopeId}>Currency</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-c9614e68${_scopeId}><option value="IDR" data-v-c9614e68${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "IDR") : ssrLooseEqual(item.currency, "IDR")) ? " selected" : ""}${_scopeId}>IDR</option><option value="USD" data-v-c9614e68${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "USD") : ssrLooseEqual(item.currency, "USD")) ? " selected" : ""}${_scopeId}>USD</option><option value="EUR" data-v-c9614e68${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "EUR") : ssrLooseEqual(item.currency, "EUR")) ? " selected" : ""}${_scopeId}>EUR</option><option value="SGD" data-v-c9614e68${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "SGD") : ssrLooseEqual(item.currency, "SGD")) ? " selected" : ""}${_scopeId}>SGD</option></select></div></div><div class="mt-3" data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-c9614e68${_scopeId}>Description</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" placeholder="e.g., Biaya trucking dari gudang ke pelabuhan" required data-v-c9614e68${_scopeId}>${ssrInterpolate(item.description)}</textarea></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3" data-v-c9614e68${_scopeId}><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-c9614e68${_scopeId}>Quantity</label><input${ssrRenderAttr("value", item.quantity)} type="number" step="0.01" min="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="1" required data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-c9614e68${_scopeId}>Unit Rate</label><input${ssrRenderAttr("value", item.rate)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="500000" required data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-c9614e68${_scopeId}>Total Amount</label><input type="text"${ssrRenderAttr("value", formatCurrency(item.amount || 0, item.currency || "IDR"))} class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600" readonly data-v-c9614e68${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (reimbursementItems.value.length > 0) {
              _push2(`<div class="flex justify-center mt-6 pt-4 border-t border-orange-200" data-v-c9614e68${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors" data-v-c9614e68${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-c9614e68${_scopeId}></path></svg> Tambah Item Reimbursement Lagi </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 border-l-4 border-l-red-500" data-v-c9614e68${_scopeId}><div class="flex items-center justify-between mb-4" data-v-c9614e68${_scopeId}><div data-v-c9614e68${_scopeId}><h3 class="text-lg font-semibold text-red-800" data-v-c9614e68${_scopeId}>Biaya Operasional (Internal)</h3><p class="text-sm text-red-600" data-v-c9614e68${_scopeId}>Biaya ini tidak akan ditampilkan di invoice customer dan akan mengurangi profit</p></div><button type="button" class="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-c9614e68${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-c9614e68${_scopeId}></path></svg> Tambah Biaya Operasional </button></div>`);
            if (operationalCosts.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50" data-v-c9614e68${_scopeId}><div class="flex flex-col items-center" data-v-c9614e68${_scopeId}><svg class="w-12 h-12 text-red-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-c9614e68${_scopeId}></path></svg><p class="text-red-600" data-v-c9614e68${_scopeId}>Belum ada biaya operasional</p><p class="text-sm text-red-500" data-v-c9614e68${_scopeId}>Contoh: Kirim dokumen, biaya kawalan, parkir, dll</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4" data-v-c9614e68${_scopeId}><!--[-->`);
            ssrRenderList(operationalCosts.value, (cost, index) => {
              _push2(`<div class="border border-red-200 rounded-lg p-4 bg-red-50" data-v-c9614e68${_scopeId}><div class="flex items-center justify-between mb-4" data-v-c9614e68${_scopeId}><h4 class="font-medium text-red-800" data-v-c9614e68${_scopeId}>Biaya Operasional ${ssrInterpolate(index + 1)}</h4><button type="button" class="text-red-600 hover:text-red-800" data-v-c9614e68${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-c9614e68${_scopeId}></path></svg></button></div><div class="mb-4" data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-red-700 mb-2" data-v-c9614e68${_scopeId}> Kategori Biaya </label><select class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required data-v-c9614e68${_scopeId}><option value="" data-v-c9614e68${ssrIncludeBooleanAttr(Array.isArray(cost.category_id) ? ssrLooseContain(cost.category_id, "") : ssrLooseEqual(cost.category_id, "")) ? " selected" : ""}${_scopeId}>-- Pilih Kategori Biaya --</option><!--[-->`);
              ssrRenderList(__props.pettyCashCategories, (category) => {
                _push2(`<option${ssrRenderAttr("value", category.id)} data-v-c9614e68${ssrIncludeBooleanAttr(Array.isArray(cost.category_id) ? ssrLooseContain(cost.category_id, category.id) : ssrLooseEqual(cost.category_id, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
              });
              _push2(`<!--]--></select></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-c9614e68${_scopeId}><div class="md:col-span-2" data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-red-700 mb-2" data-v-c9614e68${_scopeId}>Deskripsi</label><input type="text"${ssrRenderAttr("value", cost.description)} class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="e.g., Kirim dokumen, biaya kawalan, konsumsi" required data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-red-700 mb-2" data-v-c9614e68${_scopeId}>Biaya</label><input type="number"${ssrRenderAttr("value", cost.rate)} step="1000" min="0" class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="50000" required data-v-c9614e68${_scopeId}></div><div data-v-c9614e68${_scopeId}><label class="block text-sm font-medium text-red-700 mb-2" data-v-c9614e68${_scopeId}>Total</label><input type="text"${ssrRenderAttr("value", formatCurrency(cost.amount || 0))} class="w-full px-3 py-2 border border-red-300 rounded-lg bg-red-100" readonly data-v-c9614e68${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (operationalCosts.value.length > 0) {
              _push2(`<div class="mt-4 pt-4 border-t border-red-200" data-v-c9614e68${_scopeId}><div class="flex justify-between items-center text-sm" data-v-c9614e68${_scopeId}><span class="font-medium text-red-700" data-v-c9614e68${_scopeId}>Total Biaya Operasional:</span><span class="font-bold text-red-800" data-v-c9614e68${_scopeId}>${ssrInterpolate(formatCurrency(calculateOperationalTotal()))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (operationalCosts.value.length > 0) {
              _push2(`<div class="flex justify-center mt-6 pt-4 border-t border-red-200" data-v-c9614e68${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-c9614e68${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c9614e68${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-c9614e68${_scopeId}></path></svg> Tambah Biaya Operasional Lagi </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (operationalCosts.value.length > 0) {
              _push2(`<div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-blue-200" data-v-c9614e68${_scopeId}><h3 class="text-lg font-semibold text-blue-800 mb-4" data-v-c9614e68${_scopeId}>Ringkasan Profit</h3><div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm" data-v-c9614e68${_scopeId}><div class="bg-white rounded-lg p-4 border border-blue-200" data-v-c9614e68${_scopeId}><div class="text-blue-600 font-medium" data-v-c9614e68${_scopeId}>Gross Revenue</div><div class="text-xl font-bold text-blue-800" data-v-c9614e68${_scopeId}>${ssrInterpolate(formatCurrency(calculateGrossRevenue()))}</div><div class="text-xs text-blue-500" data-v-c9614e68${_scopeId}>Customer invoice total</div></div><div class="bg-white rounded-lg p-4 border border-red-200" data-v-c9614e68${_scopeId}><div class="text-red-600 font-medium" data-v-c9614e68${_scopeId}>Operational Costs</div><div class="text-xl font-bold text-red-800" data-v-c9614e68${_scopeId}>${ssrInterpolate(formatCurrency(calculateOperationalTotal()))}</div><div class="text-xs text-red-500" data-v-c9614e68${_scopeId}>Internal costs only</div></div><div class="bg-white rounded-lg p-4 border border-green-200" data-v-c9614e68${_scopeId}><div class="text-green-600 font-medium" data-v-c9614e68${_scopeId}>Net Profit</div><div class="text-xl font-bold text-green-800" data-v-c9614e68${_scopeId}>${ssrInterpolate(formatCurrency(calculateNetProfit()))}</div><div class="text-xs text-green-500" data-v-c9614e68${_scopeId}>Gross - Operational</div></div><div class="bg-white rounded-lg p-4 border border-purple-200" data-v-c9614e68${_scopeId}><div class="text-purple-600 font-medium" data-v-c9614e68${_scopeId}>Profit Margin</div><div class="text-xl font-bold text-purple-800" data-v-c9614e68${_scopeId}>${ssrInterpolate(calculateProfitMargin())}%</div><div class="text-xs text-purple-500" data-v-c9614e68${_scopeId}>Net profit percentage</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-c9614e68${_scopeId}><div class="flex items-center justify-between" data-v-c9614e68${_scopeId}><div class="text-lg font-semibold text-sage-800" data-v-c9614e68${_scopeId}> Total: ${ssrInterpolate(formatCurrency(calculateTotal()))}</div><div class="flex space-x-4" data-v-c9614e68${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.index"),
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50" data-v-c9614e68${_scopeId}>${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Invoice")}</button></div></div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Buat Invoice Baru"),
                      createVNode("p", { class: "text-sage-600" }, "Buat invoice dari sales order yang telah disetujui")
                    ]),
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
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "space-y-6"
                }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Pilih Sales Order & Type Invoice"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Sales Order"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).sales_order_id = $event,
                          onChange: loadSalesOrderData,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, [
                          createVNode("option", { value: "" }, "Pilih Sales Order"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrders, (order) => {
                            var _a;
                            return openBlock(), createBlock("option", {
                              key: order.id,
                              value: order.id
                            }, toDisplayString(order.order_number) + " - " + toDisplayString(order.customer || order.customer_name || "No Customer") + " (" + toDisplayString(((_a = order.status) == null ? void 0 : _a.toUpperCase()) || "APPROVED") + ") ", 9, ["value"]);
                          }), 128))
                        ], 40, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).sales_order_id]
                        ]),
                        __props.errors.sales_order_id ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-500 text-sm mt-1"
                        }, toDisplayString(__props.errors.sales_order_id), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Tipe Invoice"),
                        createVNode("div", { class: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600" }, " Combined Invoice (Main + Reimbursement) "),
                        withDirectives(createVNode("input", {
                          type: "hidden",
                          "onUpdate:modelValue": ($event) => unref(form).invoice_type = $event
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).invoice_type]
                        ])
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
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).shipper]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Consignee"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).consignee = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).consignee]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "AWB/BL No."),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).awb_bl_no = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
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
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
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
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "POL/POD"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).pol_pod = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).pol_pod]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Origin"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).origin = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).origin]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Destination"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).destination = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).destination]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "ETD"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).etd = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).etd]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "ETA"),
                        withDirectives(createVNode("input", {
                          type: "date",
                          "onUpdate:modelValue": ($event) => unref(form).eta = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).eta]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Gross Weight (KG)"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => unref(form).gross_weight = $event,
                          step: "0.0001",
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).gross_weight]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Volume"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).volume = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ],
                          placeholder: "e.g., 10.5 M³"
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).volume]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "No of Packages"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => unref(form).no_of_packages = $event,
                          min: "0",
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ]
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).no_of_packages]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "20'/40'/45'"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).container_size = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ],
                          placeholder: "e.g., 20GP, 40GP, 45GP"
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).container_size]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Container No."),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).container_no = $event,
                          readonly: unref(form).sales_order_id,
                          class: [
                            "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            unref(form).sales_order_id ? "bg-gray-100 text-gray-600" : ""
                          ],
                          placeholder: "e.g., MSKU2934199"
                        }, null, 10, ["onUpdate:modelValue", "readonly"]), [
                          [vModelText, unref(form).container_no]
                        ])
                      ]),
                      createVNode("div", { class: "md:col-span-2" }, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Remarks"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).remarks = $event,
                          rows: "3",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).remarks]
                        ])
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
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Item Invoice Utama"),
                        createVNode("div", { class: "flex space-x-2" }, [
                          unref(form).sales_order_id ? (openBlock(), createBlock("button", {
                            key: 0,
                            type: "button",
                            onClick: reloadFromSalesOrder,
                            class: "inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                                d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              })
                            ])),
                            createTextVNode(" Load dari SO ")
                          ])) : createCommentVNode("", true),
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
                      ]),
                      mainItems.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex justify-center mt-6 pt-4 border-t border-gray-200"
                      }, [
                        createVNode("div", { class: "flex space-x-2" }, [
                          unref(form).sales_order_id ? (openBlock(), createBlock("button", {
                            key: 0,
                            type: "button",
                            onClick: reloadFromSalesOrder,
                            class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                                d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                              })
                            ])),
                            createTextVNode(" Load dari SO ")
                          ])) : createCommentVNode("", true),
                          createVNode("button", {
                            type: "button",
                            onClick: addItem,
                            class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
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
                            createTextVNode(" Tambah Item Lagi ")
                          ])
                        ])
                      ])) : createCommentVNode("", true)
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
                      ]),
                      reimbursementItems.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "flex justify-center mt-6 pt-4 border-t border-orange-200"
                      }, [
                        createVNode("button", {
                          type: "button",
                          onClick: addReimbursementItem,
                          class: "inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
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
                          createTextVNode(" Tambah Item Reimbursement Lagi ")
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200 border-l-4 border-l-red-500" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-semibold text-red-800" }, "Biaya Operasional (Internal)"),
                          createVNode("p", { class: "text-sm text-red-600" }, "Biaya ini tidak akan ditampilkan di invoice customer dan akan mengurangi profit")
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
                      operationalCosts.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-gray-500 text-center py-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50"
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
                              d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            })
                          ])),
                          createVNode("p", { class: "text-red-600" }, "Belum ada biaya operasional"),
                          createVNode("p", { class: "text-sm text-red-500" }, "Contoh: Kirim dokumen, biaya kawalan, parkir, dll")
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(operationalCosts.value, (cost, index) => {
                          return openBlock(), createBlock("div", {
                            key: "opex-" + index,
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
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("label", { class: "block text-sm font-medium text-red-700 mb-2" }, " Kategori Biaya "),
                              withDirectives(createVNode("select", {
                                "onUpdate:modelValue": ($event) => cost.category_id = $event,
                                onChange: ($event) => onCategoryChange(index),
                                class: "w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500",
                                required: ""
                              }, [
                                createVNode("option", { value: "" }, "-- Pilih Kategori Biaya --"),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.pettyCashCategories, (category) => {
                                  return openBlock(), createBlock("option", {
                                    key: category.id,
                                    value: category.id
                                  }, toDisplayString(category.name), 9, ["value"]);
                                }), 128))
                              ], 40, ["onUpdate:modelValue", "onChange"]), [
                                [vModelSelect, cost.category_id]
                              ])
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                              createVNode("div", { class: "md:col-span-2" }, [
                                createVNode("label", { class: "block text-sm font-medium text-red-700 mb-2" }, "Deskripsi"),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => cost.description = $event,
                                  class: "w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500",
                                  placeholder: "e.g., Kirim dokumen, biaya kawalan, konsumsi",
                                  required: ""
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, cost.description]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-red-700 mb-2" }, "Biaya"),
                                withDirectives(createVNode("input", {
                                  type: "number",
                                  "onUpdate:modelValue": ($event) => cost.rate = $event,
                                  onInput: ($event) => calculateOperationalAmount(index),
                                  step: "1000",
                                  min: "0",
                                  class: "w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500",
                                  placeholder: "50000",
                                  required: ""
                                }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                  [vModelText, cost.rate]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-red-700 mb-2" }, "Total"),
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
                        class: "mt-4 pt-4 border-t border-red-200"
                      }, [
                        createVNode("div", { class: "flex justify-between items-center text-sm" }, [
                          createVNode("span", { class: "font-medium text-red-700" }, "Total Biaya Operasional:"),
                          createVNode("span", { class: "font-bold text-red-800" }, toDisplayString(formatCurrency(calculateOperationalTotal())), 1)
                        ])
                      ])) : createCommentVNode("", true),
                      operationalCosts.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "flex justify-center mt-6 pt-4 border-t border-red-200"
                      }, [
                        createVNode("button", {
                          type: "button",
                          onClick: addOperationalCost,
                          class: "inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
                          createTextVNode(" Tambah Biaya Operasional Lagi ")
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  operationalCosts.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-blue-200"
                  }, [
                    createVNode("h3", { class: "text-lg font-semibold text-blue-800 mb-4" }, "Ringkasan Profit"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4 text-sm" }, [
                      createVNode("div", { class: "bg-white rounded-lg p-4 border border-blue-200" }, [
                        createVNode("div", { class: "text-blue-600 font-medium" }, "Gross Revenue"),
                        createVNode("div", { class: "text-xl font-bold text-blue-800" }, toDisplayString(formatCurrency(calculateGrossRevenue())), 1),
                        createVNode("div", { class: "text-xs text-blue-500" }, "Customer invoice total")
                      ]),
                      createVNode("div", { class: "bg-white rounded-lg p-4 border border-red-200" }, [
                        createVNode("div", { class: "text-red-600 font-medium" }, "Operational Costs"),
                        createVNode("div", { class: "text-xl font-bold text-red-800" }, toDisplayString(formatCurrency(calculateOperationalTotal())), 1),
                        createVNode("div", { class: "text-xs text-red-500" }, "Internal costs only")
                      ]),
                      createVNode("div", { class: "bg-white rounded-lg p-4 border border-green-200" }, [
                        createVNode("div", { class: "text-green-600 font-medium" }, "Net Profit"),
                        createVNode("div", { class: "text-xl font-bold text-green-800" }, toDisplayString(formatCurrency(calculateNetProfit())), 1),
                        createVNode("div", { class: "text-xs text-green-500" }, "Gross - Operational")
                      ]),
                      createVNode("div", { class: "bg-white rounded-lg p-4 border border-purple-200" }, [
                        createVNode("div", { class: "text-purple-600 font-medium" }, "Profit Margin"),
                        createVNode("div", { class: "text-xl font-bold text-purple-800" }, toDisplayString(calculateProfitMargin()) + "%", 1),
                        createVNode("div", { class: "text-xs text-purple-500" }, "Net profit percentage")
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-lg font-semibold text-sage-800" }, " Total: " + toDisplayString(formatCurrency(calculateTotal())), 1),
                      createVNode("div", { class: "flex space-x-4" }, [
                        createVNode(unref(Link), {
                          href: unref(route)("admin-keuangan.invoices.index"),
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
                        }, toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Invoice"), 9, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Invoices/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c9614e68"]]);
export {
  Create as default
};
