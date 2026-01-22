import { useSSRContext, ref, onMounted, computed, watch, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, createCommentVNode, withDirectives, Fragment, renderList, toDisplayString, vModelSelect, vModelText } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-d08FDE25.js";
import axios from "axios";
import { _ as _sfc_main$2 } from "./SearchableSelect-DfkOp0gQ.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-BHWh3obl.js";
import "./useIdleTimeout-BVnZv5Lp.js";
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
    preselectedOtherCosts: {
      type: Array,
      default: () => []
    },
    preselectedReimbursementItems: {
      type: Array,
      default: () => []
    },
    operationalCostCategories: {
      type: Array,
      default: () => []
    },
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
    const vendorSelectOptions = computed(() => {
      const baseOptions = [
        { value: "", label: "-- Internal (Operations Division) --" }
      ];
      const vendorOptions = (props.vendors ?? []).map((vendor) => ({
        value: vendor.id,
        label: vendor.nama_vendor
      }));
      return [...baseOptions, ...vendorOptions];
    });
    const operationalCostCategoryOptions = computed(() => {
      const baseOptions = [{ value: "", label: "-- Select Cost Category --" }];
      const categoryOptions = (props.operationalCostCategories ?? []).map((category) => ({
        value: category.id,
        label: category.name
      }));
      return [...baseOptions, ...categoryOptions];
    });
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
    const resolveOperationalCategory = (value) => {
      if (value === void 0 || value === null) {
        return null;
      }
      const valueStr = String(value).trim();
      if (valueStr === "") {
        return null;
      }
      const lowerValue = valueStr.toLowerCase();
      const normalizedValue = lowerValue.replace(/[^a-z0-9]/g, "");
      return props.operationalCostCategories.find((category) => {
        if (!category) {
          return false;
        }
        const categoryId = String(category.id ?? "").trim().toLowerCase();
        const categoryIdNormalized = categoryId.replace(/[^a-z0-9]/g, "");
        if (categoryId !== "" && (categoryId === lowerValue || categoryIdNormalized === normalizedValue)) {
          return true;
        }
        const categoryName = (category.name || "").trim().toLowerCase();
        const categoryNameNormalized = categoryName.replace(/[^a-z0-9]/g, "");
        return categoryName === lowerValue || categoryNameNormalized === normalizedValue;
      }) || null;
    };
    const deriveOperationalCategoryInfo = (cost) => {
      const candidates = [
        cost == null ? void 0 : cost.category_id,
        cost == null ? void 0 : cost.category,
        cost == null ? void 0 : cost.category_name,
        cost == null ? void 0 : cost.category_label,
        cost == null ? void 0 : cost.category_source
      ].filter((value) => value !== void 0 && value !== null && value !== "");
      for (const candidate of candidates) {
        const resolved = resolveOperationalCategory(candidate);
        if (resolved) {
          return { id: String(resolved.id), name: resolved.name, source: candidate };
        }
      }
      const fallback = candidates.find((value) => typeof value === "string");
      const fallbackValue = fallback || "";
      return { id: "", name: fallbackValue, source: fallbackValue };
    };
    const syncOperationalCostCategories = () => {
      if (!props.operationalCostCategories || props.operationalCostCategories.length === 0) {
        return;
      }
      operationalCosts.value.forEach((cost) => {
        const sourceValue = cost.category_id ?? cost.category_source ?? cost.category_name ?? cost.category;
        const resolved = resolveOperationalCategory(sourceValue);
        if (resolved) {
          cost.category_id = String(resolved.id);
          cost.category_name = resolved.name;
          cost.category_source = resolved.name;
          cost.category = resolved.name;
        }
      });
    };
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
      net_weight: "",
      volume: "",
      no_of_packages: "",
      package_unit: "BAG",
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
      vat_rate: "",
      items: []
    });
    const loadSalesOrderData = () => {
      const selectedOrder = props.salesOrders.find((order) => order.id == form.sales_order_id);
      if (selectedOrder) {
        console.log("Loading Sales Order data:", {
          id: selectedOrder.id,
          hasVendorBreakdown: selectedOrder.vendor_breakdown ? selectedOrder.vendor_breakdown.length : 0,
          hasReimbursementItems: selectedOrder.reimbursement_items ? selectedOrder.reimbursement_items.length : 0,
          hasOtherCosts: selectedOrder.other_costs ? selectedOrder.other_costs.length : 0,
          reimbursementData: selectedOrder.reimbursement_items,
          otherCostsData: selectedOrder.other_costs,
          fullOrderData: selectedOrder
        });
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
        form.gross_weight = selectedOrder.gross_weight || selectedOrder.net_weight || "";
        form.net_weight = selectedOrder.net_weight || "";
        form.volume = selectedOrder.measurement || "";
        form.no_of_packages = selectedOrder.qty || "";
        form.package_unit = selectedOrder.package_unit || "BAG";
        form.container_size = selectedOrder.party_lcl || "";
        if (selectedOrder.container_no) {
          form.container_no = Array.isArray(selectedOrder.container_no) ? selectedOrder.container_no.join(", ") : selectedOrder.container_no;
        }
        const fallbackData = {
          vendor_breakdown: selectedOrder.vendor_breakdown && selectedOrder.vendor_breakdown.length > 0 ? selectedOrder.vendor_breakdown : props.preselectedVendorBreakdown ?? [],
          reimbursement_items: selectedOrder.reimbursement_items && selectedOrder.reimbursement_items.length > 0 ? selectedOrder.reimbursement_items : props.preselectedReimbursementItems ?? [],
          other_costs: selectedOrder.other_costs && selectedOrder.other_costs.length > 0 ? selectedOrder.other_costs : props.preselectedOtherCosts ?? []
        };
        populateItemsFromSalesOrder(selectedOrder, fallbackData);
      }
    };
    const parseReceiptInfo = (info) => {
      if (!info) {
        return {};
      }
      if (typeof info === "string") {
        try {
          const parsed = JSON.parse(info);
          return parsed && typeof parsed === "object" ? parsed : {};
        } catch (error) {
          console.warn("Gagal mengurai receipt_info:", info, error);
          return {};
        }
      }
      if (typeof info === "object") {
        return info;
      }
      return {};
    };
    const resolveVendorSelectionFromRecord = (record) => {
      var _a, _b;
      if (!record || typeof record !== "object") {
        return { vendorId: "", vendorType: null };
      }
      const receiptInfo = parseReceiptInfo(record.receipt_info ?? record.receiptInfo);
      const selectionCandidates = [
        record.vendor_selection,
        record.vendorSelection,
        receiptInfo.vendor_selection,
        receiptInfo.vendorSelection,
        receiptInfo.vendor_type
      ];
      let vendorType = null;
      for (const candidate of selectionCandidates) {
        if (typeof candidate === "string" && candidate.trim() !== "") {
          vendorType = candidate.trim().toLowerCase();
          break;
        }
      }
      const vendorCandidates = [
        record.vendor_id,
        record.vendorId,
        (_a = record.vendor) == null ? void 0 : _a.id,
        (_b = record.vendor) == null ? void 0 : _b.vendor_id,
        record.vendor_code,
        record.vendor_code_id,
        record.vendor_uuid,
        receiptInfo.vendor_id,
        receiptInfo.vendorId,
        receiptInfo.vendor
      ];
      let rawVendor = vendorCandidates.find((value) => value !== void 0 && value !== null && value !== "");
      if (rawVendor && typeof rawVendor === "object") {
        rawVendor = rawVendor.id ?? rawVendor.value ?? rawVendor.vendor_id ?? rawVendor.vendorId ?? null;
      }
      if (typeof rawVendor === "string") {
        const trimmed = rawVendor.trim();
        if (trimmed === "" || trimmed === "-") {
          rawVendor = "";
        } else if (trimmed.toLowerCase() === "internal") {
          rawVendor = "";
          vendorType = "internal";
        } else if (/^-?\d+$/.test(trimmed)) {
          const parsed = Number(trimmed);
          rawVendor = Number.isNaN(parsed) ? "" : parsed;
        } else {
          rawVendor = "";
        }
      }
      if (typeof rawVendor === "number" && Number.isFinite(rawVendor)) {
        return { vendorId: rawVendor, vendorType };
      }
      if (rawVendor === "" || rawVendor === null || rawVendor === void 0) {
        if (vendorType === "internal") {
          return { vendorId: "", vendorType: "internal" };
        }
        return { vendorId: "", vendorType: vendorType ?? null };
      }
      return { vendorId: "", vendorType: vendorType ?? null };
    };
    const populateItemsFromSalesOrder = (salesOrder, overrides = {}) => {
      if (!salesOrder) return;
      mainItems.value = [];
      reimbursementItems.value = [];
      operationalCosts.value = [];
      const vendorBreakdown = overrides.vendor_breakdown ?? salesOrder.vendor_breakdown ?? [];
      const reimbursementSource = overrides.reimbursement_items ?? salesOrder.reimbursement_items ?? [];
      const otherCostsSource = overrides.other_costs ?? salesOrder.other_costs ?? [];
      if (vendorBreakdown && Array.isArray(vendorBreakdown)) {
        vendorBreakdown.forEach((vendor, index) => {
          const sellingAmount = normalizeNumber(vendor.selling_amount);
          if (sellingAmount > 0) {
            const quantity = resolveQuantityValue(vendor.quantity ?? vendor.qty ?? 1);
            const unit = vendor.unit || vendor.package_unit || "SET";
            const lineAmount = sellingAmount * quantity;
            mainItems.value.push({
              description: vendor.description || `Service ${index + 1}`,
              quantity,
              unit,
              rate: sellingAmount,
              currency: "IDR",
              amount: lineAmount,
              item_ref: `vendor_${vendor.vendor_id || index}`,
              type: "main",
              item_type: "billable"
            });
          }
          const buyingAmount = normalizeNumber(vendor.buying_amount);
          if (buyingAmount > 0) {
            const quantity = resolveQuantityValue(vendor.quantity ?? vendor.qty ?? 1);
            const unit = vendor.unit || vendor.package_unit || "SET";
            const lineAmount = buyingAmount * quantity;
            const vendorInfo = resolveVendorSelectionFromRecord(vendor);
            operationalCosts.value.push({
              description: `${vendor.description || `Service ${index + 1}`} - Buying Cost (COGS)`,
              quantity,
              unit,
              rate: buyingAmount,
              currency: "IDR",
              amount: lineAmount,
              category_id: "",
              category_name: "",
              category: "",
              category_source: "",
              vendor_id: vendorInfo.vendorId,
              item_type: "operational_cost",
              include_in_customer_invoice: false,
              is_hidden_from_customer: true,
              auto_generated: true,
              source: "vendor_breakdown_buying",
              item_ref: `cogs_vendor_${vendor.vendor_id || index}`
            });
          }
        });
      }
      if (reimbursementSource && Array.isArray(reimbursementSource)) {
        console.log("Populating reimbursement items from relationship:", reimbursementSource);
        reimbursementSource.forEach((item, index) => {
          if (item.amount && item.amount > 0) {
            const quantity = resolveQuantityValue(item.quantity ?? item.qty ?? 1);
            const rate = normalizeNumber(item.amount);
            const vendorInfo = resolveVendorSelectionFromRecord(item);
            reimbursementItems.value.push({
              description: item.description || `Reimbursement ${index + 1}`,
              quantity,
              unit: item.unit || "SET",
              rate,
              currency: "IDR",
              amount: rate * quantity,
              vendor_id: vendorInfo.vendorId,
              item_ref: `reimb_${item.id || index}`,
              type: "reimbursement",
              item_type: "reimbursement"
            });
          }
        });
      }
      if (otherCostsSource && Array.isArray(otherCostsSource)) {
        console.log("Populating operational costs from other_costs:", otherCostsSource);
        otherCostsSource.forEach((cost, index) => {
          const amount = normalizeNumber(cost.amount);
          if (amount > 0) {
            const quantity = resolveQuantityValue(cost.quantity ?? cost.qty ?? 1);
            const unit = cost.unit || "pcs";
            const categoryInfo = deriveOperationalCategoryInfo(cost);
            const vendorInfo = resolveVendorSelectionFromRecord(cost);
            operationalCosts.value.push({
              description: cost.description || `Operational Cost ${index + 1}`,
              quantity,
              unit,
              rate: amount,
              currency: cost.currency || "IDR",
              amount: amount * quantity,
              category_id: categoryInfo.id,
              category_name: categoryInfo.name,
              category: categoryInfo.name,
              category_source: categoryInfo.source,
              vendor_id: vendorInfo.vendorId,
              item_type: "operational_cost",
              include_in_customer_invoice: false,
              is_hidden_from_customer: true,
              auto_generated: true,
              source: "sales_order_other_costs",
              item_ref: `other_cost_${cost.id || index}`
            });
          }
        });
      }
      syncOperationalCostCategories();
      if (mainItems.value.length === 0) {
        addItem();
      }
      console.log("Data populated successfully:", {
        mainItemsCount: mainItems.value.length,
        reimbursementItemsCount: reimbursementItems.value.length,
        operationalCostsCount: operationalCosts.value.length,
        mainItems: mainItems.value,
        reimbursementItems: reimbursementItems.value,
        operationalCosts: operationalCosts.value
      });
    };
    const reloadFromSalesOrder = () => {
      const selectedOrder = props.salesOrders.find((order) => order.id == form.sales_order_id);
      if (selectedOrder) {
        const hasData = selectedOrder.vendor_breakdown && selectedOrder.vendor_breakdown.length > 0 || selectedOrder.reimbursement_items && selectedOrder.reimbursement_items.length > 0 || selectedOrder.other_costs && selectedOrder.other_costs.length > 0;
        if (hasData) {
          if (confirm("This will replace all existing items with data from the Sales Order. Continue?")) {
            populateItemsFromSalesOrder(selectedOrder);
          }
        } else {
          alert("Sales Order ini tidak memiliki data vendor breakdown, reimbursement items, atau operational costs untuk di-load.");
        }
      }
    };
    watch(
      () => props.operationalCostCategories,
      () => {
        syncOperationalCostCategories();
      },
      { immediate: true, deep: false }
    );
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
      item.amount = normalizeNumber(item.quantity || 0) * normalizeNumber(item.rate || 0);
    };
    const normalizeNumber = (value) => {
      if (!value) return 0;
      let normalized = value.toString().trim();
      if (normalized.includes(".") && normalized.includes(",")) {
        normalized = normalized.replace(/\./g, "").replace(",", ".");
      } else if (normalized.includes(".") && !normalized.includes(",")) {
        const parts = normalized.split(".");
        if (parts.length === 2) {
          const decimalPart = parts[1];
          const isLikelyDecimal = decimalPart.length <= 2 && parseInt(decimalPart, 10) < 100;
          if (!isLikelyDecimal) {
            normalized = normalized.replace(/\./g, "");
          }
        } else {
          normalized = normalized.replace(/\./g, "");
        }
      } else if (normalized.includes(",")) {
        normalized = normalized.replace(",", ".");
      }
      return parseFloat(normalized) || 0;
    };
    const resolveQuantityValue = (rawValue) => {
      if (rawValue === "" || rawValue === null || rawValue === void 0) {
        return 1;
      }
      const parsed = normalizeNumber(rawValue);
      return parsed > 0 ? parsed : 0;
    };
    const formatMainItemRate = (item, index, event) => {
      let value = event.target.value;
      value = value.replace(/[^\d.,]/g, "");
      item.rate = value;
      calculateMainAmount(index);
    };
    const addReimbursementItem = () => {
      reimbursementItems.value.push({
        description: "",
        quantity: 1,
        unit: "SET",
        rate: 0,
        currency: "IDR",
        amount: 0,
        item_ref: `reimb_${Date.now()}`,
        type: "reimbursement",
        item_type: "reimbursement",
        vendor_id: ""
      });
    };
    const removeReimbursementItem = (index) => {
      reimbursementItems.value.splice(index, 1);
    };
    const calculateReimbursementAmount = (index) => {
      const item = reimbursementItems.value[index];
      item.amount = normalizeNumber(item.quantity || 0) * normalizeNumber(item.rate || 0);
    };
    const formatReimbursementRate = (item, index, event) => {
      let value = event.target.value;
      value = value.replace(/[^\d.,]/g, "");
      item.rate = value;
      calculateReimbursementAmount(index);
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
        category_id: "",
        category_name: "",
        category_source: "",
        category: "",
        auto_generated: false,
        source: "manual_input",
        item_ref: `manual_${Date.now()}`,
        vendor_id: ""
      });
    };
    const removeOperationalCost = (index) => {
      operationalCosts.value.splice(index, 1);
    };
    const calculateOperationalAmount = (index) => {
      const cost = operationalCosts.value[index];
      const quantity = resolveQuantityValue(cost.quantity);
      cost.amount = normalizeNumber(cost.rate || 0) * quantity;
    };
    const formatOperationalRate = (cost, index, event) => {
      let value = event.target.value;
      value = value.replace(/[^\d.,]/g, "");
      cost.rate = value;
      calculateOperationalAmount(index);
    };
    const calculateOperationalTotal = () => {
      return operationalCosts.value.reduce((total, cost) => {
        return total + normalizeNumber(cost.amount || 0);
      }, 0);
    };
    const calculateGrossRevenue = () => {
      const mainTotal = mainItems.value.reduce((total, item) => {
        return total + normalizeNumber(item.amount || 0);
      }, 0);
      return mainTotal;
    };
    const calculateReimbursementTotal = () => {
      return reimbursementItems.value.reduce((total, item) => {
        return total + normalizeNumber(item.amount || 0);
      }, 0);
    };
    const calculateNetProfit = () => {
      return calculateGrossRevenue() - calculateOperationalTotal();
    };
    const calculateProfitMargin = () => {
      const grossRevenue = calculateGrossRevenue();
      if (grossRevenue <= 0) return "0.00";
      return (calculateNetProfit() / grossRevenue * 100).toFixed(2);
    };
    const calculateVatAmount = () => {
      const rate = parseFloat(form.vat_rate);
      if (Number.isNaN(rate) || rate <= 0) return 0;
      const baseAmount = mainItems.value.reduce((total, item) => {
        return total + normalizeNumber(item.amount || 0);
      }, 0);
      return Math.round(baseAmount * (rate / 100) * 100) / 100;
    };
    const calculateTotal = () => {
      const mainTotal = mainItems.value.reduce((total, item) => {
        return total + normalizeNumber(item.amount || 0);
      }, 0);
      const reimbursementTotal = reimbursementItems.value.reduce((total, item) => {
        return total + normalizeNumber(item.amount || 0);
      }, 0);
      return mainTotal + reimbursementTotal + calculateVatAmount();
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
          item_type: "reimbursement",
          include_in_customer_invoice: true,
          is_hidden_from_customer: false
        })),
        ...operationalCosts.value.map((cost) => ({
          ...cost,
          type: "operational",
          item_ref: cost.item_ref || "operational_cost",
          item_type: "operational_cost",
          include_in_customer_invoice: cost.include_in_customer_invoice ?? false,
          is_hidden_from_customer: cost.is_hidden_from_customer ?? true
        }))
      ];
      form.items = allItems;
      console.log("DEBUG: Submitting invoice with items:", allItems);
      console.log("DEBUG: Form data:", form.data());
      if (mainItems.value.length > 0 && reimbursementItems.value.length > 0) {
        form.invoice_type = "combined";
      } else if (reimbursementItems.value.length > 0) {
        form.invoice_type = "reimbursement";
      } else {
        form.invoice_type = "main";
      }
      form.post(route("admin-keuangan.invoices.store"), {
        onSuccess: (page) => {
          console.log("Invoice created successfully:", page);
        },
        onError: (errors) => {
          console.error("Invoice creation failed:", errors);
          console.error("Form data:", form.data());
          alert("Error creating invoice: " + JSON.stringify(errors));
        },
        onFinish: () => {
          console.log("Invoice creation finished");
        }
      });
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
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-0a264253${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-0a264253${_scopeId}><div class="flex items-center justify-between" data-v-0a264253${_scopeId}><div data-v-0a264253${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-0a264253${_scopeId}>Create New Invoice</h2><p class="text-sage-600" data-v-0a264253${_scopeId}>Create an invoice from an approved sales order.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-0a264253${_scopeId2}></path></svg> Back `);
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
            _push2(`</div></div><form class="space-y-6" data-v-0a264253${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-0a264253${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-0a264253${_scopeId}>Select Sales Order &amp; Invoice Type</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-0a264253${_scopeId}><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Sales Order</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-0a264253${_scopeId}><option value="" data-v-0a264253${ssrIncludeBooleanAttr(Array.isArray(unref(form).sales_order_id) ? ssrLooseContain(unref(form).sales_order_id, "") : ssrLooseEqual(unref(form).sales_order_id, "")) ? " selected" : ""}${_scopeId}>Select Sales Order</option><!--[-->`);
            ssrRenderList(__props.salesOrders, (order) => {
              var _a;
              _push2(`<option${ssrRenderAttr("value", order.id)} data-v-0a264253${ssrIncludeBooleanAttr(Array.isArray(unref(form).sales_order_id) ? ssrLooseContain(unref(form).sales_order_id, order.id) : ssrLooseEqual(unref(form).sales_order_id, order.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(order.order_number)} - ${ssrInterpolate(order.customer || order.customer_name || "No Customer")} (${ssrInterpolate(((_a = order.status) == null ? void 0 : _a.toUpperCase()) || "APPROVED")}) </option>`);
            });
            _push2(`<!--]--></select>`);
            if (__props.errors.sales_order_id) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-0a264253${_scopeId}>${ssrInterpolate(__props.errors.sales_order_id)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).sales_order_id) {
              _push2(`<div class="mt-2 p-2 bg-green-50 border border-green-200 rounded-md" data-v-0a264253${_scopeId}><p class="text-xs text-green-700" data-v-0a264253${_scopeId}> Data loaded automatically from the Sales Order: ${ssrInterpolate(mainItems.value.length)} main items, ${ssrInterpolate(reimbursementItems.value.length)} reimbursement items, ${ssrInterpolate(operationalCosts.value.length)} operational costs </p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Invoice Type</label><div class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600" data-v-0a264253${_scopeId}> Combined Invoice (Main + Reimbursement) </div><input type="hidden"${ssrRenderAttr("value", unref(form).invoice_type)} data-v-0a264253${_scopeId}></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-0a264253${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-0a264253${_scopeId}>Invoice Details</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-0a264253${_scopeId}><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Invoice Date</label><input type="date"${ssrRenderAttr("value", unref(form).invoice_date)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-0a264253${_scopeId}>`);
            if (__props.errors.invoice_date) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-0a264253${_scopeId}>${ssrInterpolate(__props.errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Term (Days)</label><input type="number"${ssrRenderAttr("value", unref(form).term_days)} min="1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-0a264253${_scopeId}>`);
            if (__props.errors.term_days) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-0a264253${_scopeId}>${ssrInterpolate(__props.errors.term_days)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-0a264253${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-0a264253${_scopeId}>Shipment Details</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-0a264253${_scopeId}><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Shipper</label><input type="text"${ssrRenderAttr("value", unref(form).shipper)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Consignee</label><input type="text"${ssrRenderAttr("value", unref(form).consignee)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>AWB/BL No.</label><input type="text"${ssrRenderAttr("value", unref(form).awb_bl_no)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>MAWB/OBL No.</label><input type="text"${ssrRenderAttr("value", unref(form).mawb_obl_no)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Vessel</label><input type="text"${ssrRenderAttr("value", unref(form).vessel)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Flight/VOY</label><input type="text"${ssrRenderAttr("value", unref(form).flight_voy)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>POL/POD</label><input type="text"${ssrRenderAttr("value", unref(form).pol_pod)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Origin</label><input type="text"${ssrRenderAttr("value", unref(form).origin)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Destination</label><input type="text"${ssrRenderAttr("value", unref(form).destination)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>ETD</label><input type="date"${ssrRenderAttr("value", unref(form).etd)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>ETA</label><input type="date"${ssrRenderAttr("value", unref(form).eta)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Gross Weight (KG)</label><input type="number"${ssrRenderAttr("value", unref(form).gross_weight)} step="0.0001" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Net Weight (KG)</label><input type="number"${ssrRenderAttr("value", unref(form).net_weight)} step="0.0001" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Volume</label><input type="text"${ssrRenderAttr("value", unref(form).volume)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., 10.5 M³" data-v-0a264253${_scopeId}></div><div class="grid grid-cols-2 gap-3" data-v-0a264253${_scopeId}><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>No of Packages</label><input type="number"${ssrRenderAttr("value", unref(form).no_of_packages)} min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Package Unit</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}><option value="" data-v-0a264253${ssrIncludeBooleanAttr(Array.isArray(unref(form).package_unit) ? ssrLooseContain(unref(form).package_unit, "") : ssrLooseEqual(unref(form).package_unit, "")) ? " selected" : ""}${_scopeId}>Select Unit</option><!--[-->`);
            ssrRenderList(__props.packageUnits, (unit) => {
              _push2(`<option${ssrRenderAttr("value", unit.code)} data-v-0a264253${ssrIncludeBooleanAttr(Array.isArray(unref(form).package_unit) ? ssrLooseContain(unref(form).package_unit, unit.code) : ssrLooseEqual(unref(form).package_unit, unit.code)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unit.name)}</option>`);
            });
            _push2(`<!--]--></select></div></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>20&#39;/40&#39;/45&#39;</label><input type="text"${ssrRenderAttr("value", unref(form).container_size)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., 20GP, 40GP, 45GP" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Container No.</label><input type="text"${ssrRenderAttr("value", unref(form).container_no)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., MSKU2934199" data-v-0a264253${_scopeId}></div><div class="md:col-span-2" data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Remarks</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-0a264253${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-0a264253${_scopeId}>Down Payment (DP)</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-0a264253${_scopeId}><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Down Payment Amount</label><input type="number"${ssrRenderAttr("value", unref(form).down_payment_amount)} step="0.01" min="0" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="0.00" data-v-0a264253${_scopeId}>`);
            if (__props.errors.down_payment_amount) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-0a264253${_scopeId}>${ssrInterpolate(__props.errors.down_payment_amount)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Down Payment Date</label><input type="date"${ssrRenderAttr("value", unref(form).down_payment_date)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}>`);
            if (__props.errors.down_payment_date) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-0a264253${_scopeId}>${ssrInterpolate(__props.errors.down_payment_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Down Payment Notes</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Notes for the down payment..." data-v-0a264253${_scopeId}>${ssrInterpolate(unref(form).down_payment_notes)}</textarea>`);
            if (__props.errors.down_payment_notes) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-0a264253${_scopeId}>${ssrInterpolate(__props.errors.down_payment_notes)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-0a264253${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4" data-v-0a264253${_scopeId}>VAT (PPN)</h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-0a264253${_scopeId}><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>VAT Rate</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}><option value="" data-v-0a264253${ssrIncludeBooleanAttr(Array.isArray(unref(form).vat_rate) ? ssrLooseContain(unref(form).vat_rate, "") : ssrLooseEqual(unref(form).vat_rate, "")) ? " selected" : ""}${_scopeId}>No VAT</option><option value="11" data-v-0a264253${ssrIncludeBooleanAttr(Array.isArray(unref(form).vat_rate) ? ssrLooseContain(unref(form).vat_rate, "11") : ssrLooseEqual(unref(form).vat_rate, "11")) ? " selected" : ""}${_scopeId}>11%</option><option value="1.1" data-v-0a264253${ssrIncludeBooleanAttr(Array.isArray(unref(form).vat_rate) ? ssrLooseContain(unref(form).vat_rate, "1.1") : ssrLooseEqual(unref(form).vat_rate, "1.1")) ? " selected" : ""}${_scopeId}>1.1%</option></select>`);
            if (__props.errors.vat_rate) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-0a264253${_scopeId}>${ssrInterpolate(__props.errors.vat_rate)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>VAT Amount</label><input type="text"${ssrRenderAttr("value", formatCurrency(calculateVatAmount()))} class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" readonly data-v-0a264253${_scopeId}></div></div></div><div class="space-y-6" data-v-0a264253${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-0a264253${_scopeId}><div class="flex items-center justify-between mb-4" data-v-0a264253${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-0a264253${_scopeId}>Main Invoice Items</h3><div class="flex space-x-2" data-v-0a264253${_scopeId}>`);
            if (unref(form).sales_order_id) {
              _push2(`<button type="button" class="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-0a264253${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-0a264253${_scopeId}></path></svg> Load from SO </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="button" class="inline-flex items-center px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-0a264253${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-0a264253${_scopeId}></path></svg> Add Item </button></div></div>`);
            if (mainItems.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" data-v-0a264253${_scopeId}><div class="flex flex-col items-center" data-v-0a264253${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-0a264253${_scopeId}></path></svg><p data-v-0a264253${_scopeId}>No main invoice items yet</p><p class="text-sm" data-v-0a264253${_scopeId}>Click &quot;Add Item&quot; to add an item</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4" data-v-0a264253${_scopeId}><!--[-->`);
            ssrRenderList(mainItems.value, (item, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4" data-v-0a264253${_scopeId}><div class="flex items-center justify-between mb-4" data-v-0a264253${_scopeId}><h4 class="font-medium text-gray-900" data-v-0a264253${_scopeId}>Item ${ssrInterpolate(index + 1)}</h4><button type="button" class="text-red-600 hover:text-red-800" data-v-0a264253${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-0a264253${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-6 gap-4" data-v-0a264253${_scopeId}><div class="md:col-span-2" data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Description</label><input type="text"${ssrRenderAttr("value", item.description)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Qty</label><input type="number"${ssrRenderAttr("value", item.quantity)} step="0.01" min="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Unit</label><input type="text"${ssrRenderAttr("value", item.unit)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Rate</label><input type="text"${ssrRenderAttr("value", item.rate)} placeholder="0 (e.g., 2,500 or 2500)" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-0a264253${_scopeId}>Amount</label><input type="text"${ssrRenderAttr("value", formatCurrency(item.amount || 0))} class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" readonly data-v-0a264253${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (mainItems.value.length > 0) {
              _push2(`<div class="flex justify-center mt-6 pt-4 border-t border-gray-200" data-v-0a264253${_scopeId}><div class="flex space-x-2" data-v-0a264253${_scopeId}>`);
              if (unref(form).sales_order_id) {
                _push2(`<button type="button" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-0a264253${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-0a264253${_scopeId}></path></svg> Load from SO </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<button type="button" class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-0a264253${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-0a264253${_scopeId}></path></svg> Add Another Item </button></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-0a264253${_scopeId}><div class="flex items-center justify-between mb-4" data-v-0a264253${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-0a264253${_scopeId}>Reimbursement Items</h3><button type="button" class="inline-flex items-center px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors" data-v-0a264253${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-0a264253${_scopeId}></path></svg> Add Reimbursement Item </button></div>`);
            if (reimbursementItems.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" data-v-0a264253${_scopeId}><div class="flex flex-col items-center" data-v-0a264253${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-0a264253${_scopeId}></path></svg><p data-v-0a264253${_scopeId}>No reimbursement items yet</p><p class="text-sm" data-v-0a264253${_scopeId}>Click &quot;Add Reimbursement Item&quot; to add an item</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4" data-v-0a264253${_scopeId}><!--[-->`);
            ssrRenderList(reimbursementItems.value, (item, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4" data-v-0a264253${_scopeId}><div class="flex justify-between items-center mb-3" data-v-0a264253${_scopeId}><h4 class="font-medium text-gray-700" data-v-0a264253${_scopeId}>Reimbursement Item #${ssrInterpolate(index + 1)}</h4><button type="button" class="text-red-600 hover:text-red-800" data-v-0a264253${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-0a264253${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-0a264253${_scopeId}><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-0a264253${_scopeId}>Item Number/Ref</label><input${ssrRenderAttr("value", item.item_ref)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., REIMB-001" data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-0a264253${_scopeId}>Currency</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0a264253${_scopeId}><option value="IDR" data-v-0a264253${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "IDR") : ssrLooseEqual(item.currency, "IDR")) ? " selected" : ""}${_scopeId}>IDR</option><option value="USD" data-v-0a264253${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "USD") : ssrLooseEqual(item.currency, "USD")) ? " selected" : ""}${_scopeId}>USD</option><option value="EUR" data-v-0a264253${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "EUR") : ssrLooseEqual(item.currency, "EUR")) ? " selected" : ""}${_scopeId}>EUR</option><option value="SGD" data-v-0a264253${ssrIncludeBooleanAttr(Array.isArray(item.currency) ? ssrLooseContain(item.currency, "SGD") : ssrLooseEqual(item.currency, "SGD")) ? " selected" : ""}${_scopeId}>SGD</option></select></div></div><div class="mt-3" data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-0a264253${_scopeId}>Description</label><textarea rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" placeholder="e.g., Trucking cost from warehouse to port" required data-v-0a264253${_scopeId}>${ssrInterpolate(item.description)}</textarea></div><div class="mt-3" data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-0a264253${_scopeId}> Vendor / Recipient </label>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                modelValue: item.vendor_id,
                "onUpdate:modelValue": ($event) => item.vendor_id = $event,
                options: vendorSelectOptions.value,
                placeholder: "Select vendor",
                "search-fields": ["label"],
                "input-class": "w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-xs text-gray-600 mt-1" data-v-0a264253${_scopeId}> Select a vendor if this cost will be paid to an external vendor; leave blank for internal </p></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3" data-v-0a264253${_scopeId}><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-0a264253${_scopeId}>Quantity</label><input${ssrRenderAttr("value", item.quantity)} type="number" step="0.01" min="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="1" required data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-0a264253${_scopeId}>Unit Rate</label><input${ssrRenderAttr("value", item.rate)} type="text" placeholder="0 (e.g., 500,000 or 500000)" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-0a264253${_scopeId}>Total Amount</label><input type="text"${ssrRenderAttr("value", formatCurrency(item.amount || 0, item.currency || "IDR"))} class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600" readonly data-v-0a264253${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (reimbursementItems.value.length > 0) {
              _push2(`<div class="flex justify-center mt-6 pt-4 border-t border-orange-200" data-v-0a264253${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors" data-v-0a264253${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-0a264253${_scopeId}></path></svg> Add Another Reimbursement Item </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 border-l-4 border-l-red-500" data-v-0a264253${_scopeId}><div class="flex items-center justify-between mb-4" data-v-0a264253${_scopeId}><div data-v-0a264253${_scopeId}><h3 class="text-lg font-semibold text-red-800" data-v-0a264253${_scopeId}>Operational Costs (Internal)</h3><p class="text-sm text-red-600" data-v-0a264253${_scopeId}>These costs will not appear on the customer invoice and will reduce profit</p>`);
            if (operationalCosts.value.some((cost) => cost.auto_generated)) {
              _push2(`<div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg" data-v-0a264253${_scopeId}><div class="flex items-start space-x-2" data-v-0a264253${_scopeId}><svg class="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-0a264253${_scopeId}></path></svg><div class="text-xs text-blue-800" data-v-0a264253${_scopeId}><strong data-v-0a264253${_scopeId}>Info:</strong> Costs with the label <span class="inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800" data-v-0a264253${_scopeId}>Auto from SO</span> were loaded automatically from the Sales Order. You can edit the amount or description as needed. </div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><button type="button" class="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-0a264253${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-0a264253${_scopeId}></path></svg> Add Operational Cost </button></div>`);
            if (operationalCosts.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-red-300 rounded-lg bg-red-50" data-v-0a264253${_scopeId}><div class="flex flex-col items-center" data-v-0a264253${_scopeId}><svg class="w-12 h-12 text-red-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-0a264253${_scopeId}></path></svg><p class="text-red-600" data-v-0a264253${_scopeId}>No operational costs yet</p><p class="text-sm text-red-500" data-v-0a264253${_scopeId}>Example: document delivery, escort fees, parking, etc.</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-4" data-v-0a264253${_scopeId}><!--[-->`);
            ssrRenderList(operationalCosts.value, (cost, index) => {
              _push2(`<div class="${ssrRenderClass([
                "border rounded-lg p-4",
                cost.auto_generated ? "border-blue-200 bg-blue-50" : "border-red-200 bg-red-50"
              ])}" data-v-0a264253${_scopeId}><div class="flex items-center justify-between mb-4" data-v-0a264253${_scopeId}><div class="flex items-center space-x-2" data-v-0a264253${_scopeId}><h4 class="${ssrRenderClass([
                "font-medium",
                cost.auto_generated ? "text-blue-800" : "text-red-800"
              ])}" data-v-0a264253${_scopeId}> Operational Cost ${ssrInterpolate(index + 1)}</h4>`);
              if (cost.auto_generated) {
                _push2(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-v-0a264253${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" data-v-0a264253${_scopeId}></path></svg> Auto from SO </span>`);
              } else {
                _push2(`<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800" data-v-0a264253${_scopeId}><svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-0a264253${_scopeId}></path></svg> Manual </span>`);
              }
              _push2(`</div><button type="button" class="${ssrRenderClass([
                "hover:text-red-800",
                cost.auto_generated ? "text-blue-600" : "text-red-600"
              ])}" data-v-0a264253${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-0a264253${_scopeId}></path></svg></button></div><div class="mb-4" data-v-0a264253${_scopeId}><label class="${ssrRenderClass([
                "block text-sm font-medium mb-2",
                cost.auto_generated ? "text-blue-700" : "text-red-700"
              ])}" data-v-0a264253${_scopeId}> Cost Category `);
              if (cost.source !== "vendor_breakdown_buying") {
                _push2(`<span data-v-0a264253${_scopeId}>*</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</label>`);
              if (cost.source === "vendor_breakdown_buying") {
                _push2(`<div class="px-3 py-2 border border-blue-200 rounded-lg bg-blue-50 text-sm text-blue-800" data-v-0a264253${_scopeId}> Buying cost (COGS) is loaded from the Sales Order. Category is not required. </div>`);
              } else {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  modelValue: cost.category_id,
                  "onUpdate:modelValue": ($event) => cost.category_id = $event,
                  options: operationalCostCategoryOptions.value,
                  placeholder: "Select cost category",
                  "search-fields": ["label"],
                  "input-class": [
                    "w-full px-3 py-2 pr-8 border rounded-lg focus:ring-2",
                    cost.auto_generated ? "border-blue-300 focus:ring-blue-500 focus:border-blue-500" : "border-red-300 focus:ring-red-500 focus:border-red-500"
                  ].join(" "),
                  required: cost.source !== "vendor_breakdown_buying"
                }, null, _parent2, _scopeId));
              }
              _push2(`</div><div class="mb-4" data-v-0a264253${_scopeId}><label class="${ssrRenderClass([
                "block text-sm font-medium mb-2",
                cost.auto_generated ? "text-blue-700" : "text-red-700"
              ])}" data-v-0a264253${_scopeId}> Vendor / Recipient </label>`);
              _push2(ssrRenderComponent(_sfc_main$2, {
                modelValue: cost.vendor_id,
                "onUpdate:modelValue": ($event) => cost.vendor_id = $event,
                options: vendorSelectOptions.value,
                placeholder: "Select vendor",
                "search-fields": ["label"],
                "input-class": [
                  "w-full px-3 py-2 pr-8 border rounded-lg focus:ring-2",
                  cost.auto_generated ? "border-blue-300 focus:ring-blue-500 focus:border-blue-500" : "border-red-300 focus:ring-red-500 focus:border-red-500"
                ].join(" ")
              }, null, _parent2, _scopeId));
              _push2(`<p class="${ssrRenderClass([
                "text-xs mt-1",
                cost.auto_generated ? "text-blue-600" : "text-red-600"
              ])}" data-v-0a264253${_scopeId}> Select a vendor if this cost will be paid to an external vendor; leave blank for internal </p></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-0a264253${_scopeId}><div class="md:col-span-2" data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-red-700 mb-2" data-v-0a264253${_scopeId}>Description</label><input type="text"${ssrRenderAttr("value", cost.description)} class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" placeholder="e.g., document delivery, escort fees, refreshments" required data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-red-700 mb-2" data-v-0a264253${_scopeId}>Cost</label><input type="text"${ssrRenderAttr("value", cost.rate)} placeholder="0 (e.g., 50,000 or 50000)" class="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" required data-v-0a264253${_scopeId}></div><div data-v-0a264253${_scopeId}><label class="block text-sm font-medium text-red-700 mb-2" data-v-0a264253${_scopeId}>Total</label><input type="text"${ssrRenderAttr("value", formatCurrency(cost.amount || 0))} class="w-full px-3 py-2 border border-red-300 rounded-lg bg-red-100" readonly data-v-0a264253${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (operationalCosts.value.length > 0) {
              _push2(`<div class="mt-4 pt-4 border-t border-red-200" data-v-0a264253${_scopeId}><div class="flex justify-between items-center text-sm" data-v-0a264253${_scopeId}><span class="font-medium text-red-700" data-v-0a264253${_scopeId}>Total Operational Costs:</span><span class="font-bold text-red-800" data-v-0a264253${_scopeId}>${ssrInterpolate(formatCurrency(calculateOperationalTotal()))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (operationalCosts.value.length > 0) {
              _push2(`<div class="flex justify-center mt-6 pt-4 border-t border-red-200" data-v-0a264253${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-0a264253${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0a264253${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-0a264253${_scopeId}></path></svg> Add Another Operational Cost </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (operationalCosts.value.length > 0) {
              _push2(`<div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-blue-200" data-v-0a264253${_scopeId}><h3 class="text-lg font-semibold text-blue-800 mb-4" data-v-0a264253${_scopeId}>Profit Summary</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm" data-v-0a264253${_scopeId}><div class="bg-white rounded-lg p-4 border border-blue-200" data-v-0a264253${_scopeId}><div class="text-blue-600 font-medium" data-v-0a264253${_scopeId}>Gross Revenue</div><div class="text-xl font-bold text-blue-800" data-v-0a264253${_scopeId}>${ssrInterpolate(formatCurrency(calculateGrossRevenue()))}</div><div class="text-xs text-blue-500" data-v-0a264253${_scopeId}>Billable items only</div></div><div class="bg-white rounded-lg p-4 border border-red-200" data-v-0a264253${_scopeId}><div class="text-red-600 font-medium" data-v-0a264253${_scopeId}>Operational Costs</div><div class="text-xl font-bold text-red-800" data-v-0a264253${_scopeId}>${ssrInterpolate(formatCurrency(calculateOperationalTotal()))}</div><div class="text-xs text-red-500" data-v-0a264253${_scopeId}>Internal costs only</div></div><div class="bg-white rounded-lg p-4 border border-green-200" data-v-0a264253${_scopeId}><div class="text-green-600 font-medium" data-v-0a264253${_scopeId}>Net Profit</div><div class="text-xl font-bold text-green-800" data-v-0a264253${_scopeId}>${ssrInterpolate(formatCurrency(calculateNetProfit()))}</div><div class="text-xs text-green-500" data-v-0a264253${_scopeId}>Gross - Operational</div></div><div class="bg-white rounded-lg p-4 border border-purple-200" data-v-0a264253${_scopeId}><div class="text-purple-600 font-medium" data-v-0a264253${_scopeId}>Profit Margin</div><div class="text-xl font-bold text-purple-800" data-v-0a264253${_scopeId}>${ssrInterpolate(calculateProfitMargin())}%</div><div class="text-xs text-purple-500" data-v-0a264253${_scopeId}>Net profit percentage</div></div></div><div class="mt-6 bg-white rounded-lg p-4 border border-blue-200" data-v-0a264253${_scopeId}><h4 class="text-sm font-semibold text-blue-800 mb-3" data-v-0a264253${_scopeId}>Calculation Details</h4><div class="space-y-2 text-sm text-gray-700" data-v-0a264253${_scopeId}><div class="flex items-center justify-between" data-v-0a264253${_scopeId}><span data-v-0a264253${_scopeId}>Main Invoice</span><span class="font-medium text-gray-900" data-v-0a264253${_scopeId}>${ssrInterpolate(formatCurrency(calculateGrossRevenue()))}</span></div><div class="flex items-center justify-between" data-v-0a264253${_scopeId}><span data-v-0a264253${_scopeId}>VAT</span><span class="font-medium text-gray-900" data-v-0a264253${_scopeId}>${ssrInterpolate(formatCurrency(calculateVatAmount()))}</span></div><div class="flex items-center justify-between py-1 border-t border-b border-blue-100" data-v-0a264253${_scopeId}><span data-v-0a264253${_scopeId}>Total Main Invoice + VAT</span><span class="font-semibold text-blue-900" data-v-0a264253${_scopeId}>${ssrInterpolate(formatCurrency(calculateGrossRevenue() + calculateVatAmount()))}</span></div><div class="flex items-center justify-between" data-v-0a264253${_scopeId}><span data-v-0a264253${_scopeId}>Reimbursement</span><span class="font-medium text-gray-900" data-v-0a264253${_scopeId}>${ssrInterpolate(formatCurrency(calculateReimbursementTotal()))}</span></div><div class="flex items-center justify-between py-1 border-t border-b border-blue-100" data-v-0a264253${_scopeId}><span data-v-0a264253${_scopeId}>Total Invoice + Reimbursement</span><span class="font-semibold text-blue-900" data-v-0a264253${_scopeId}>${ssrInterpolate(formatCurrency(calculateGrossRevenue() + calculateVatAmount() + calculateReimbursementTotal()))}</span></div><div class="flex items-center justify-between pt-2 border-t border-blue-100" data-v-0a264253${_scopeId}><span data-v-0a264253${_scopeId}>Operational Costs</span><span class="font-semibold text-red-700" data-v-0a264253${_scopeId}>${ssrInterpolate(formatCurrency(calculateOperationalTotal()))}</span></div><div class="flex items-center justify-between" data-v-0a264253${_scopeId}><span data-v-0a264253${_scopeId}>Net Profit</span><span class="font-semibold text-green-700" data-v-0a264253${_scopeId}>${ssrInterpolate(formatCurrency(calculateNetProfit()))}</span></div><div class="flex items-center justify-between" data-v-0a264253${_scopeId}><span data-v-0a264253${_scopeId}>Profit Percentage</span><span class="font-semibold text-purple-700" data-v-0a264253${_scopeId}>${ssrInterpolate(calculateProfitMargin())}%</span></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-0a264253${_scopeId}><div class="flex items-center justify-between" data-v-0a264253${_scopeId}><div class="text-lg font-semibold text-sage-800" data-v-0a264253${_scopeId}> Total: ${ssrInterpolate(formatCurrency(calculateTotal()))}</div><div class="flex space-x-4" data-v-0a264253${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.invoices.index"),
              class: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Cancel `);
                } else {
                  return [
                    createTextVNode(" Cancel ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50" data-v-0a264253${_scopeId}>${ssrInterpolate(unref(form).processing ? "Saving..." : "Save Invoice")}</button></div></div></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Create New Invoice"),
                      createVNode("p", { class: "text-sage-600" }, "Create an invoice from an approved sales order.")
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
                        createTextVNode(" Back ")
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
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Select Sales Order & Invoice Type"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Sales Order"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).sales_order_id = $event,
                          onChange: loadSalesOrderData,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, [
                          createVNode("option", { value: "" }, "Select Sales Order"),
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
                        }, toDisplayString(__props.errors.sales_order_id), 1)) : createCommentVNode("", true),
                        unref(form).sales_order_id ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-2 p-2 bg-green-50 border border-green-200 rounded-md"
                        }, [
                          createVNode("p", { class: "text-xs text-green-700" }, " Data loaded automatically from the Sales Order: " + toDisplayString(mainItems.value.length) + " main items, " + toDisplayString(reimbursementItems.value.length) + " reimbursement items, " + toDisplayString(operationalCosts.value.length) + " operational costs ", 1)
                        ])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Invoice Type"),
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
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Invoice Details"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Invoice Date"),
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
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Term (Days)"),
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
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Shipment Details"),
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
                          "onUpdate:modelValue": ($event) => unref(form).gross_weight = $event,
                          step: "0.0001",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).gross_weight]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Net Weight (KG)"),
                        withDirectives(createVNode("input", {
                          type: "number",
                          "onUpdate:modelValue": ($event) => unref(form).net_weight = $event,
                          step: "0.0001",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).net_weight]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Volume"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).volume = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          placeholder: "e.g., 10.5 M³"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).volume]
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "No of Packages"),
                          withDirectives(createVNode("input", {
                            type: "number",
                            "onUpdate:modelValue": ($event) => unref(form).no_of_packages = $event,
                            min: "0",
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
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "20'/40'/45'"),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).container_size = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          placeholder: "e.g., 20GP, 40GP, 45GP"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).container_size]
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Container No."),
                        withDirectives(createVNode("input", {
                          type: "text",
                          "onUpdate:modelValue": ($event) => unref(form).container_no = $event,
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          placeholder: "e.g., MSKU2934199"
                        }, null, 8, ["onUpdate:modelValue"]), [
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
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Down Payment Amount"),
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
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Down Payment Date"),
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
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Down Payment Notes"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).down_payment_notes = $event,
                          rows: "2",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          placeholder: "Notes for the down payment..."
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
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
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
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Main Invoice Items"),
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
                            createTextVNode(" Load from SO ")
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
                            createTextVNode(" Add Item ")
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
                          createVNode("p", null, "No main invoice items yet"),
                          createVNode("p", { class: "text-sm" }, 'Click "Add Item" to add an item')
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
                                createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Description"),
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
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => item.rate = $event,
                                  onInput: ($event) => formatMainItemRate(item, index, $event),
                                  placeholder: "0 (e.g., 2,500 or 2500)",
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
                            createTextVNode(" Load from SO ")
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
                            createTextVNode(" Add Another Item ")
                          ])
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Reimbursement Items"),
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
                          createTextVNode(" Add Reimbursement Item ")
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
                          createVNode("p", null, "No reimbursement items yet"),
                          createVNode("p", { class: "text-sm" }, 'Click "Add Reimbursement Item" to add an item')
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
                                placeholder: "e.g., Trucking cost from warehouse to port",
                                required: ""
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, item.description]
                              ])
                            ]),
                            createVNode("div", { class: "mt-3" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Vendor / Recipient "),
                              createVNode(_sfc_main$2, {
                                modelValue: item.vendor_id,
                                "onUpdate:modelValue": ($event) => item.vendor_id = $event,
                                options: vendorSelectOptions.value,
                                placeholder: "Select vendor",
                                "search-fields": ["label"],
                                "input-class": "w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                              createVNode("p", { class: "text-xs text-gray-600 mt-1" }, " Select a vendor if this cost will be paid to an external vendor; leave blank for internal ")
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
                                  onInput: ($event) => formatReimbursementRate(item, index, $event),
                                  type: "text",
                                  placeholder: "0 (e.g., 500,000 or 500000)",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
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
                          createTextVNode(" Add Another Reimbursement Item ")
                        ])
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200 border-l-4 border-l-red-500" }, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg font-semibold text-red-800" }, "Operational Costs (Internal)"),
                          createVNode("p", { class: "text-sm text-red-600" }, "These costs will not appear on the customer invoice and will reduce profit"),
                          operationalCosts.value.some((cost) => cost.auto_generated) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg"
                          }, [
                            createVNode("div", { class: "flex items-start space-x-2" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0",
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
                              createVNode("div", { class: "text-xs text-blue-800" }, [
                                createVNode("strong", null, "Info:"),
                                createTextVNode(" Costs with the label "),
                                createVNode("span", { class: "inline-flex items-center px-1 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800" }, "Auto from SO"),
                                createTextVNode(" were loaded automatically from the Sales Order. You can edit the amount or description as needed. ")
                              ])
                            ])
                          ])) : createCommentVNode("", true)
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
                          createTextVNode(" Add Operational Cost ")
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
                          createVNode("p", { class: "text-red-600" }, "No operational costs yet"),
                          createVNode("p", { class: "text-sm text-red-500" }, "Example: document delivery, escort fees, parking, etc.")
                        ])
                      ])) : createCommentVNode("", true),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(operationalCosts.value, (cost, index) => {
                          return openBlock(), createBlock("div", {
                            key: "opex-" + index,
                            class: [
                              "border rounded-lg p-4",
                              cost.auto_generated ? "border-blue-200 bg-blue-50" : "border-red-200 bg-red-50"
                            ]
                          }, [
                            createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                createVNode("h4", {
                                  class: [
                                    "font-medium",
                                    cost.auto_generated ? "text-blue-800" : "text-red-800"
                                  ]
                                }, " Operational Cost " + toDisplayString(index + 1), 3),
                                cost.auto_generated ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-3 h-3 mr-1",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M13 10V3L4 14h7v7l9-11h-7z"
                                    })
                                  ])),
                                  createTextVNode(" Auto from SO ")
                                ])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-3 h-3 mr-1",
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
                                  createTextVNode(" Manual ")
                                ]))
                              ]),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeOperationalCost(index),
                                class: [
                                  "hover:text-red-800",
                                  cost.auto_generated ? "text-blue-600" : "text-red-600"
                                ]
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
                              ], 10, ["onClick"])
                            ]),
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("label", {
                                class: [
                                  "block text-sm font-medium mb-2",
                                  cost.auto_generated ? "text-blue-700" : "text-red-700"
                                ]
                              }, [
                                createTextVNode(" Cost Category "),
                                cost.source !== "vendor_breakdown_buying" ? (openBlock(), createBlock("span", { key: 0 }, "*")) : createCommentVNode("", true)
                              ], 2),
                              cost.source === "vendor_breakdown_buying" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "px-3 py-2 border border-blue-200 rounded-lg bg-blue-50 text-sm text-blue-800"
                              }, " Buying cost (COGS) is loaded from the Sales Order. Category is not required. ")) : (openBlock(), createBlock(_sfc_main$2, {
                                key: 1,
                                modelValue: cost.category_id,
                                "onUpdate:modelValue": ($event) => cost.category_id = $event,
                                options: operationalCostCategoryOptions.value,
                                placeholder: "Select cost category",
                                "search-fields": ["label"],
                                "input-class": [
                                  "w-full px-3 py-2 pr-8 border rounded-lg focus:ring-2",
                                  cost.auto_generated ? "border-blue-300 focus:ring-blue-500 focus:border-blue-500" : "border-red-300 focus:ring-red-500 focus:border-red-500"
                                ].join(" "),
                                required: cost.source !== "vendor_breakdown_buying"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class", "required"]))
                            ]),
                            createVNode("div", { class: "mb-4" }, [
                              createVNode("label", {
                                class: [
                                  "block text-sm font-medium mb-2",
                                  cost.auto_generated ? "text-blue-700" : "text-red-700"
                                ]
                              }, " Vendor / Recipient ", 2),
                              createVNode(_sfc_main$2, {
                                modelValue: cost.vendor_id,
                                "onUpdate:modelValue": ($event) => cost.vendor_id = $event,
                                options: vendorSelectOptions.value,
                                placeholder: "Select vendor",
                                "search-fields": ["label"],
                                "input-class": [
                                  "w-full px-3 py-2 pr-8 border rounded-lg focus:ring-2",
                                  cost.auto_generated ? "border-blue-300 focus:ring-blue-500 focus:border-blue-500" : "border-red-300 focus:ring-red-500 focus:border-red-500"
                                ].join(" ")
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class"]),
                              createVNode("p", {
                                class: [
                                  "text-xs mt-1",
                                  cost.auto_generated ? "text-blue-600" : "text-red-600"
                                ]
                              }, " Select a vendor if this cost will be paid to an external vendor; leave blank for internal ", 2)
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                              createVNode("div", { class: "md:col-span-2" }, [
                                createVNode("label", { class: "block text-sm font-medium text-red-700 mb-2" }, "Description"),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => cost.description = $event,
                                  class: "w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500",
                                  placeholder: "e.g., document delivery, escort fees, refreshments",
                                  required: ""
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, cost.description]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-red-700 mb-2" }, "Cost"),
                                withDirectives(createVNode("input", {
                                  type: "text",
                                  "onUpdate:modelValue": ($event) => cost.rate = $event,
                                  onInput: ($event) => formatOperationalRate(cost, index, $event),
                                  placeholder: "0 (e.g., 50,000 or 50000)",
                                  class: "w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500",
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
                          ], 2);
                        }), 128))
                      ]),
                      operationalCosts.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-4 pt-4 border-t border-red-200"
                      }, [
                        createVNode("div", { class: "flex justify-between items-center text-sm" }, [
                          createVNode("span", { class: "font-medium text-red-700" }, "Total Operational Costs:"),
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
                          createTextVNode(" Add Another Operational Cost ")
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  operationalCosts.value.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm p-6 border border-blue-200"
                  }, [
                    createVNode("h3", { class: "text-lg font-semibold text-blue-800 mb-4" }, "Profit Summary"),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm" }, [
                      createVNode("div", { class: "bg-white rounded-lg p-4 border border-blue-200" }, [
                        createVNode("div", { class: "text-blue-600 font-medium" }, "Gross Revenue"),
                        createVNode("div", { class: "text-xl font-bold text-blue-800" }, toDisplayString(formatCurrency(calculateGrossRevenue())), 1),
                        createVNode("div", { class: "text-xs text-blue-500" }, "Billable items only")
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
                    ]),
                    createVNode("div", { class: "mt-6 bg-white rounded-lg p-4 border border-blue-200" }, [
                      createVNode("h4", { class: "text-sm font-semibold text-blue-800 mb-3" }, "Calculation Details"),
                      createVNode("div", { class: "space-y-2 text-sm text-gray-700" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", null, "Main Invoice"),
                          createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(formatCurrency(calculateGrossRevenue())), 1)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", null, "VAT"),
                          createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(formatCurrency(calculateVatAmount())), 1)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between py-1 border-t border-b border-blue-100" }, [
                          createVNode("span", null, "Total Main Invoice + VAT"),
                          createVNode("span", { class: "font-semibold text-blue-900" }, toDisplayString(formatCurrency(calculateGrossRevenue() + calculateVatAmount())), 1)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", null, "Reimbursement"),
                          createVNode("span", { class: "font-medium text-gray-900" }, toDisplayString(formatCurrency(calculateReimbursementTotal())), 1)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between py-1 border-t border-b border-blue-100" }, [
                          createVNode("span", null, "Total Invoice + Reimbursement"),
                          createVNode("span", { class: "font-semibold text-blue-900" }, toDisplayString(formatCurrency(calculateGrossRevenue() + calculateVatAmount() + calculateReimbursementTotal())), 1)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between pt-2 border-t border-blue-100" }, [
                          createVNode("span", null, "Operational Costs"),
                          createVNode("span", { class: "font-semibold text-red-700" }, toDisplayString(formatCurrency(calculateOperationalTotal())), 1)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", null, "Net Profit"),
                          createVNode("span", { class: "font-semibold text-green-700" }, toDisplayString(formatCurrency(calculateNetProfit())), 1)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", null, "Profit Percentage"),
                          createVNode("span", { class: "font-semibold text-purple-700" }, toDisplayString(calculateProfitMargin()) + "%", 1)
                        ])
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
                            createTextVNode(" Cancel ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50"
                        }, toDisplayString(unref(form).processing ? "Saving..." : "Save Invoice"), 9, ["disabled"])
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
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0a264253"]]);
export {
  Create as default
};
