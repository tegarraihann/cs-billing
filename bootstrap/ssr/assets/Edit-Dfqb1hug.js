import { ref, computed, watch, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, vShow, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminCSLayout } from "./AdminCSLayout-BdrUgyww.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { _ as _sfc_main$1 } from "./SearchableSelect-DfkOp0gQ.js";
import { Pen, Eye, ArrowLeft, ChevronDown, Plus, Trash2, Loader2 } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DbFW_YBg.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    salesOrder: Object,
    vendors: Array,
    shipmentTypes: Array,
    serviceTypes: {
      type: Array,
      default: () => []
    },
    operationalCostCategories: Array,
    packageUnits: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const alertDialog = ref({
      show: false,
      type: "info",
      title: "",
      message: "",
      confirmText: "",
      cancelText: "",
      onConfirm: null
    });
    const sections = ref({
      basic: true,
      shipping: false,
      pricing: false,
      goods: false,
      invoice: false,
      other_costs: false,
      reimbursement: false
    });
    const operationalCostCategories = computed(() => props.operationalCostCategories ?? []);
    const rawPackageUnits = computed(() => props.packageUnits ?? []);
    const initializeVendorBreakdown = () => {
      if (props.salesOrder.vendor_breakdown && Array.isArray(props.salesOrder.vendor_breakdown)) {
        return props.salesOrder.vendor_breakdown.map((item) => ({
          id: item.id ?? null,
          vendor_id: item.vendor_id || "",
          nama_vendor: item.nama_vendor || "",
          no_rekening: item.no_rekening || "",
          nama_rekening: item.nama_rekening || "",
          description: item.description || "",
          quantity: item.quantity ?? "",
          unit: item.unit ?? "",
          buying_amount: item.buying_amount || 0,
          selling_amount: item.selling_amount || 0,
          rcvd_inv: item.rcvd_inv || "",
          remarks: item.remarks || ""
        }));
      }
      return [{
        id: null,
        vendor_id: "",
        nama_vendor: "",
        no_rekening: "",
        nama_rekening: "",
        description: "",
        quantity: "",
        unit: "",
        buying_amount: 0,
        selling_amount: 0,
        rcvd_inv: "",
        remarks: ""
      }];
    };
    const initializeOtherCosts = () => {
      if (props.salesOrder.other_costs && Array.isArray(props.salesOrder.other_costs)) {
        return props.salesOrder.other_costs.length > 0 ? props.salesOrder.other_costs.map((cost) => ({
          id: cost.id || null,
          description: cost.description || "",
          amount: cost.amount ?? 0,
          category: cost.category || "",
          category_id: cost.category_id || "",
          category_name: cost.category_name || cost.category || "",
          quantity: cost.quantity ?? "",
          unit: cost.unit ?? "",
          vendor_id: cost.vendor_id ?? "",
          is_paid_locked: !!cost.is_paid_locked
        })) : [{ id: null, description: "", amount: 0, category: "", category_id: "", category_name: "", quantity: "", unit: "", vendor_id: "", is_paid_locked: false }];
      }
      return [{ id: null, description: "", amount: 0, category: "", category_id: "", category_name: "", quantity: "", unit: "", vendor_id: "", is_paid_locked: false }];
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
          console.warn("Failed to parse receipt_info JSON:", error);
          return {};
        }
      }
      return info;
    };
    const vendorSelectOptions = computed(() => {
      const baseOptions = [
        { value: "internal", label: "-- Internal (Operational Division) --" }
      ];
      const vendorOptions = (props.vendors ?? []).map((vendor) => ({
        value: vendor.id,
        label: vendor.nama_vendor
      }));
      return [...baseOptions, ...vendorOptions];
    });
    const serviceTypeOptions = computed(() => {
      return (props.serviceTypes ?? []).map((type) => ({
        value: type.code,
        label: type.code,
        subLabel: type.description || ""
      }));
    });
    const serviceTypeMap = computed(() => {
      return (props.serviceTypes ?? []).reduce((acc, type) => {
        acc[type.code] = type.description || type.code;
        return acc;
      }, {});
    });
    const isKnownServiceType = (code) => {
      if (!code) {
        return false;
      }
      return Object.prototype.hasOwnProperty.call(serviceTypeMap.value, code);
    };
    const getServiceTypeOptions = (currentValue) => {
      if (!currentValue || isKnownServiceType(currentValue)) {
        return serviceTypeOptions.value;
      }
      return [
        ...serviceTypeOptions.value,
        { value: currentValue, label: currentValue, subLabel: "" }
      ];
    };
    const shipmentTypeOptions = computed(() => {
      return [
        { value: "", label: "Select Shipment Type" },
        ...(props.shipmentTypes ?? []).map((type) => ({
          value: type.code,
          label: type.name
        }))
      ];
    });
    const packageUnitOptions = computed(() => {
      const units = packageUnits.value ?? [];
      return [
        { value: null, label: "Select Unit" },
        ...units.map((unit) => ({
          value: unit.code,
          label: unit.name
        }))
      ];
    });
    const operationalCostCategoryOptions = computed(() => {
      return [
        { value: "", label: "Select category" },
        ...(props.operationalCostCategories ?? []).map((category) => ({
          value: category.id,
          label: category.name,
          subLabel: category.description || ""
        }))
      ];
    });
    const initializeReimbursementItems = () => {
      if (props.salesOrder.reimbursement_items && Array.isArray(props.salesOrder.reimbursement_items) && props.salesOrder.reimbursement_items.length > 0) {
        return props.salesOrder.reimbursement_items.map((item) => {
          var _a;
          const receiptInfo = parseReceiptInfo(item.receipt_info);
          const rawVendor = item.vendor_selection ?? receiptInfo.vendor_selection ?? item.vendor_id ?? ((_a = item.vendor) == null ? void 0 : _a.id) ?? item.vendor_code ?? null;
          const normalizedVendorId = rawVendor === null || rawVendor === void 0 || rawVendor === "" ? "" : String(rawVendor).toLowerCase() === "internal" ? "internal" : rawVendor;
          return {
            id: item.id ?? null,
            description: item.description || "",
            amount: item.amount ?? 0,
            quantity: item.quantity ?? receiptInfo.quantity ?? "",
            unit: item.unit ?? receiptInfo.unit ?? "",
            category: item.category || "",
            notes: item.notes || "",
            vendor_id: normalizedVendorId,
            is_paid_locked: !!item.is_paid_locked
          };
        });
      }
      return [{ id: null, description: "", amount: 0, quantity: "", unit: "", category: "", notes: "", vendor_id: "", is_paid_locked: false }];
    };
    const form = useForm({
      // Required fields based on requirements only
      order_number: props.salesOrder.order_number || "",
      ref_no: props.salesOrder.ref_no || "",
      so_date: props.salesOrder.so_date ? new Date(props.salesOrder.so_date).toISOString().split("T")[0] : "",
      customer: props.salesOrder.customer || "",
      shipper: props.salesOrder.shipper || "",
      bl_awb: props.salesOrder.bl_awb || "",
      liner: props.salesOrder.liner || "",
      vessel: props.salesOrder.vessel || "",
      eta: props.salesOrder.eta ? new Date(props.salesOrder.eta).toISOString().split("T")[0] : "",
      etd: props.salesOrder.etd ? new Date(props.salesOrder.etd).toISOString().split("T")[0] : "",
      aju: props.salesOrder.aju || "",
      sppb_date: props.salesOrder.sppb_date ? new Date(props.salesOrder.sppb_date).toISOString().split("T")[0] : "",
      shipment_type: props.salesOrder.shipment_type || "",
      pol: props.salesOrder.pol || "",
      pod: props.salesOrder.pod || "",
      gudang_utc: props.salesOrder.gudang_utc || "",
      party_lcl: props.salesOrder.party_lcl || "",
      exchange_rate: props.salesOrder.exchange_rate || "",
      vendor_breakdown: initializeVendorBreakdown(),
      remarks: props.salesOrder.remarks || "",
      note: props.salesOrder.note || "",
      commodity: props.salesOrder.commodity || "",
      qty: props.salesOrder.qty || "",
      net_weight: props.salesOrder.net_weight || "",
      gross_weight: props.salesOrder.gross_weight || "",
      measurement: props.salesOrder.measurement || "",
      container_no: Array.isArray(props.salesOrder.container_no) ? props.salesOrder.container_no : props.salesOrder.container_no ? [props.salesOrder.container_no] : [""],
      invoice_number: props.salesOrder.invoice_number || "",
      invoice_date: props.salesOrder.invoice_date ? new Date(props.salesOrder.invoice_date).toISOString().split("T")[0] : "",
      top: props.salesOrder.top || "",
      package_unit: props.salesOrder.package_unit ?? null,
      other_costs: initializeOtherCosts()
    });
    const parseLegacyPackageUnitValue = (value) => {
      if (!value || typeof value !== "string") {
        return null;
      }
      const attemptParse = (source) => {
        try {
          const parsed = JSON.parse(source);
          if (parsed && typeof parsed === "object" && parsed.code) {
            return {
              code: parsed.code,
              label: parsed.name || parsed.code
            };
          }
        } catch (error) {
          return null;
        }
        return null;
      };
      let result = attemptParse(value);
      if (result) {
        return result;
      }
      if (value.includes("'")) {
        result = attemptParse(value.replace(/'/g, '"'));
        if (result) {
          return result;
        }
      }
      const codeMatch = value.match(/"code"\s*:\s*"([^"]+)"/);
      if (codeMatch) {
        const nameMatch = value.match(/"name"\s*:\s*"([^"]+)"/);
        return {
          code: codeMatch[1],
          label: nameMatch ? nameMatch[1] : codeMatch[1]
        };
      }
      return null;
    };
    const packageUnits = computed(() => {
      const units = rawPackageUnits.value ?? [];
      let legacyUnit = form.package_unit;
      if (!legacyUnit) {
        return units;
      }
      let label = legacyUnit;
      if (typeof legacyUnit === "object") {
        const normalized = legacyUnit.code || "";
        if (normalized) {
          label = legacyUnit.name || normalized;
          legacyUnit = normalized;
        } else {
          legacyUnit = "";
        }
      }
      const parsedLegacy = parseLegacyPackageUnitValue(legacyUnit);
      if (parsedLegacy) {
        legacyUnit = parsedLegacy.code;
        label = parsedLegacy.label;
      }
      if (legacyUnit !== form.package_unit) {
        form.package_unit = legacyUnit;
      }
      const exists = units.some((unit) => unit.code === legacyUnit);
      if (!exists) {
        return [
          {
            code: legacyUnit,
            name: label,
            description: ""
          },
          ...units
        ];
      }
      return units;
    });
    const baseOperationalCostCategoryOptions = computed(() => {
      return (props.operationalCostCategories ?? []).map((category) => ({
        value: category.name,
        label: category.name,
        description: category.description || ""
      }));
    });
    const isPricingLocked = computed(() => false);
    const isOtherCostLocked = (cost) => !!(cost == null ? void 0 : cost.is_paid_locked);
    const isReimbursementLocked = (item) => !!(item == null ? void 0 : item.is_paid_locked);
    const hasLockedOtherCosts = computed(() => (form.other_costs || []).some(isOtherCostLocked));
    const hasLockedReimbursements = computed(() => (reimbursementItems.value || []).some(isReimbursementLocked));
    const reimbursementItems = ref(initializeReimbursementItems());
    const reimbursementCategoryOptions = computed(() => {
      const optionMap = new Map(baseOperationalCostCategoryOptions.value.map((option) => [option.value, option]));
      reimbursementItems.value.forEach((item) => {
        if (item.category && !optionMap.has(item.category)) {
          optionMap.set(item.category, {
            value: item.category,
            label: item.category,
            description: ""
          });
        }
      });
      return Array.from(optionMap.values());
    });
    const toggleSection = (section) => {
      sections.value[section] = !sections.value[section];
    };
    const onVendorSelect = (index) => {
      const vendorItem = form.vendor_breakdown[index];
      if (vendorItem.vendor_id) {
        const selectedVendor = props.vendors.find((v) => v.id == vendorItem.vendor_id);
        if (selectedVendor) {
          vendorItem.nama_vendor = selectedVendor.nama_vendor;
          vendorItem.no_rekening = selectedVendor.nomor_rekening;
          vendorItem.nama_rekening = selectedVendor.nama_rekening;
        }
      } else {
        vendorItem.nama_vendor = "";
        vendorItem.no_rekening = "";
        vendorItem.nama_rekening = "";
      }
    };
    const addVendorItem = () => {
      form.vendor_breakdown.push({
        id: null,
        vendor_id: "",
        nama_vendor: "",
        no_rekening: "",
        nama_rekening: "",
        description: "",
        quantity: "",
        unit: "",
        buying_amount: 0,
        selling_amount: 0,
        rcvd_inv: "",
        remarks: ""
      });
    };
    const removeVendorItem = (index) => {
      if (form.vendor_breakdown.length > 1) {
        form.vendor_breakdown.splice(index, 1);
      }
    };
    const addContainerNo = () => {
      form.container_no.push("");
    };
    const removeContainerNo = (index) => {
      if (form.container_no.length > 1) {
        form.container_no.splice(index, 1);
      }
    };
    const addOtherCost = () => {
      form.other_costs.push({
        id: null,
        description: "",
        amount: 0,
        category: "",
        category_id: "",
        category_name: "",
        quantity: "",
        unit: "",
        vendor_id: "",
        is_paid_locked: false
      });
    };
    const removeOtherCost = (index) => {
      const target = form.other_costs[index];
      if (!target || isOtherCostLocked(target)) {
        return;
      }
      if (form.other_costs.length > 0) {
        form.other_costs.splice(index, 1);
      }
    };
    const onOtherCostCategoryChange = (cost) => {
      if (!cost) {
        return;
      }
      const categories = operationalCostCategories.value ?? [];
      const selected = categories.find(
        (category) => String(category.id) === String(cost.category_id)
      );
      cost.category_name = (selected == null ? void 0 : selected.name) || cost.category_name || "";
      cost.category = cost.category_name || cost.category || "";
    };
    const syncOtherCostCategorySelections = () => {
      if (!Array.isArray(form.other_costs)) {
        return;
      }
      const categories = operationalCostCategories.value ?? [];
      form.other_costs.forEach((cost) => {
        if (!cost) return;
        const currentLabel = (cost.category_name || cost.category || "").toString().trim();
        if (cost.category_id) {
          const match = categories.find(
            (category) => String(category.id) === String(cost.category_id)
          );
          if (match) {
            cost.category_name = match.name;
            cost.category = match.name;
          }
        } else if (currentLabel !== "") {
          const labelLower = currentLabel.toLowerCase();
          const match = categories.find(
            (category) => (category.name || "").toLowerCase() === labelLower
          );
          if (match) {
            cost.category_id = String(match.id);
            cost.category_name = match.name;
            cost.category = match.name;
          }
        }
      });
    };
    watch(
      () => props.operationalCostCategories,
      () => {
        syncOtherCostCategorySelections();
      },
      { immediate: true }
    );
    const formatCostAmount = (cost, event) => {
      let value = event.target.value;
      value = value.replace(/[^\d.,]/g, "");
      cost.amount = value;
    };
    const normalizeNumber = (value) => {
      if (!value) return 0;
      let normalized = value.toString().trim();
      normalized = normalized.replace(/[^\d.,]/g, "");
      const commaCount = (normalized.match(/,/g) || []).length;
      const dotCount = (normalized.match(/\./g) || []).length;
      if (commaCount > 1 && dotCount === 0) {
        normalized = normalized.replace(/,/g, "");
      } else if (dotCount > 1 && commaCount === 0) {
        normalized = normalized.replace(/\./g, "");
      } else if (commaCount > 0 && dotCount > 0) {
        normalized = normalized.replace(/\./g, "").replace(",", ".");
      } else if (commaCount === 1 && dotCount === 0) {
        normalized = normalized.replace(",", ".");
      }
      if ((normalized.match(/\./g) || []).length > 1) {
        const parts = normalized.split(".");
        const decimal = parts.pop();
        normalized = parts.join("") + (decimal ? "." + decimal : "");
      }
      const parsed = parseFloat(normalized);
      return Number.isNaN(parsed) ? 0 : parsed;
    };
    const resolveQuantityValue = (rawValue) => {
      if (rawValue === "" || rawValue === null || rawValue === void 0) {
        return 1;
      }
      const parsed = normalizeNumber(rawValue);
      return parsed > 0 ? parsed : 0;
    };
    const addReimbursementItem = () => {
      reimbursementItems.value.push({
        id: null,
        description: "",
        amount: 0,
        quantity: "",
        unit: "",
        category: "",
        notes: "",
        vendor_id: "",
        is_paid_locked: false
      });
    };
    const removeReimbursementItem = (index) => {
      const target = reimbursementItems.value[index];
      if (!target || isReimbursementLocked(target)) {
        return;
      }
      if (reimbursementItems.value.length > 1) {
        reimbursementItems.value.splice(index, 1);
      }
    };
    const formatCurrency = (amount) => {
      const numAmount = parseFloat(amount) || 0;
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(numAmount);
    };
    const getTotalBuyingAmount = (item) => {
      const unitPrice = parseFloat(item.buying_amount.toString().replace(/\./g, "")) || 0;
      const qty = parseFloat(item.quantity) || 1;
      return unitPrice * qty;
    };
    const getTotalSellingAmount = (item) => {
      const unitPrice = parseFloat(item.selling_amount.toString().replace(/\./g, "")) || 0;
      const qty = parseFloat(item.quantity) || 1;
      return unitPrice * qty;
    };
    const getTotalCostAmount = (cost) => {
      const unitPrice = normalizeNumber(cost.amount);
      const qty = parseFloat(cost.quantity) || 1;
      return unitPrice * qty;
    };
    const onBuyingAmountInput = (item) => {
      if (!item.buying_unit_price) {
        item.buying_unit_price = 0;
      }
    };
    const onSellingAmountInput = (item) => {
      if (!item.selling_unit_price) {
        item.selling_unit_price = 0;
      }
    };
    const onCostAmountInput = (cost) => {
      if (!cost.unit_price) {
        cost.unit_price = 0;
      }
    };
    const recalculateVendorAmounts = (item) => {
      calculateTotals();
    };
    const recalculateCostAmount = (cost) => {
    };
    const totalBuying = computed(() => {
      return form.vendor_breakdown.reduce((sum, item) => {
        return sum + getTotalBuyingAmount(item);
      }, 0);
    });
    const totalSelling = computed(() => {
      return form.vendor_breakdown.reduce((sum, item) => {
        return sum + getTotalSellingAmount(item);
      }, 0);
    });
    const totalRevenue = computed(() => {
      return totalSelling.value - (totalBuying.value + totalOtherCosts.value + totalReimbursement.value);
    });
    const getProfit = (vendorItem) => {
      const buying = getTotalBuyingAmount(vendorItem);
      const selling = getTotalSellingAmount(vendorItem);
      return selling - buying;
    };
    const totalOtherCosts = computed(() => {
      return form.other_costs.reduce((sum, item) => sum + getTotalCostAmount(item), 0);
    });
    const getReimbursementLineTotal = (item) => {
      const quantity = resolveQuantityValue(item == null ? void 0 : item.quantity);
      return quantity * normalizeNumber(item == null ? void 0 : item.amount);
    };
    const totalReimbursement = computed(() => {
      return reimbursementItems.value.reduce((sum, item) => sum + getReimbursementLineTotal(item), 0);
    });
    const calculateTotals = () => {
      return {
        totalBuying: totalBuying.value,
        totalSelling: totalSelling.value,
        totalOtherCosts: totalOtherCosts.value,
        totalReimbursement: totalReimbursement.value,
        totalRevenue: totalRevenue.value
      };
    };
    const showAlert = (type, title, message, confirmText = "", cancelText = "", onConfirmCallback = null) => {
      alertDialog.value = {
        show: true,
        type,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: onConfirmCallback
      };
    };
    const handleAlertConfirm = () => {
      if (alertDialog.value.onConfirm) {
        alertDialog.value.onConfirm();
      }
      closeAlert();
    };
    const handleAlertCancel = () => {
    };
    const closeAlert = () => {
      alertDialog.value.show = false;
    };
    const submit = () => {
      const sanitizedOtherCosts = (form.other_costs || []).filter((cost) => {
        const description = (cost.description || "").toString().trim();
        const amount = normalizeNumber(cost.amount);
        const category = (cost.category_name || cost.category || "").toString().trim();
        const vendor = cost.vendor_id !== void 0 && cost.vendor_id !== null ? cost.vendor_id.toString().trim() : "";
        return description !== "" || amount > 0 || category !== "" || vendor !== "";
      }).map((cost) => ({
        id: cost.id ?? null,
        description: cost.description || "",
        amount: normalizeNumber(cost.amount),
        category_id: cost.category_id || "",
        category_name: cost.category_name || cost.category || "",
        category: cost.category_name || cost.category || "",
        quantity: cost.quantity !== "" ? parseFloat(cost.quantity) || cost.quantity : "",
        unit: cost.unit || "",
        vendor_id: cost.vendor_id === "" ? null : cost.vendor_id
      }));
      const sanitizedReimbursements = (reimbursementItems.value || []).filter((item) => {
        const description = (item.description || "").toString().trim();
        const amount = normalizeNumber(item.amount);
        const category = (item.category || "").toString().trim();
        const vendor = item.vendor_id !== void 0 && item.vendor_id !== null ? item.vendor_id.toString().trim() : "";
        return description !== "" || amount > 0 || category !== "" || vendor !== "";
      }).map((item) => ({
        id: item.id ?? null,
        description: item.description || "",
        amount: normalizeNumber(item.amount),
        quantity: item.quantity !== "" ? parseFloat(item.quantity) || item.quantity : "",
        unit: item.unit || "",
        category: item.category || "",
        notes: item.notes || "",
        vendor_id: item.vendor_id === "" ? null : item.vendor_id
      }));
      const cleanedData = {
        ...form.data(),
        vendor_breakdown: form.vendor_breakdown.map((item) => ({
          ...item,
          quantity: item.quantity !== "" ? parseFloat(item.quantity) || item.quantity : "",
          unit: item.unit || "",
          buying_amount: normalizeNumber(item.buying_amount),
          selling_amount: normalizeNumber(item.selling_amount)
        })),
        other_costs: sanitizedOtherCosts,
        reimbursement_items: sanitizedReimbursements
      };
      form.transform(() => cleanedData).put(route("admin-cs.sales-orders.update", props.salesOrder.id), {
        onSuccess: (page) => {
          console.log("Success response received:", page);
          if (page.component === "Admin/AdminCS/SalesOrders/Index") {
            console.log("Successfully redirected to index page");
            showAlert("success", "Success", "Shipping Order successfully updated.");
          } else {
            console.log("Not redirected to index, component:", page.component);
            showAlert("success", "Success", "Shipping Order successfully updated.", "OK", "", () => {
              window.location.href = route("admin-cs.sales-orders.index");
            });
          }
        },
        onError: (errors) => {
          console.error("Shipping Order Update Error:", errors);
          if (errors && Object.keys(errors).length > 0) {
            let errorMessages = [];
            Object.keys(errors).forEach((field) => {
              if (Array.isArray(errors[field])) {
                errorMessages.push(...errors[field]);
              } else {
                errorMessages.push(errors[field]);
              }
            });
            const errorMessage = errorMessages.length > 0 ? errorMessages.join(". ") : "There are errors in the form. Please check the data you entered.";
            showAlert("error", "Failed to Save", errorMessage);
          } else {
            showAlert("error", "Failed to Save", "An error occurred while updating the Shipping Order. Please try again.");
          }
        },
        onFinish: () => {
          console.log("Request finished");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminCSLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-6" data-v-0f01cc04${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-0f01cc04${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-0f01cc04${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-0f01cc04${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-0f01cc04${_scopeId}><div class="flex items-center" data-v-0f01cc04${_scopeId}><div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" data-v-0f01cc04${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Pen), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-0f01cc04${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-0f01cc04${_scopeId}>Edit Shipping: ${ssrInterpolate(__props.salesOrder.order_number)}</h1><p class="mt-1 text-sm text-gray-600" data-v-0f01cc04${_scopeId}>Update shipping order information for the customer. </p></div></div><div class="mt-4 sm:mt-0 flex gap-3" data-v-0f01cc04${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.show", __props.salesOrder.id),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Eye), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` View Details `);
                } else {
                  return [
                    createVNode(unref(Eye), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" View Details ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Back `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Back ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><form class="space-y-6" data-v-0f01cc04${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-0f01cc04${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-0f01cc04${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-0f01cc04${_scopeId}>Basic Information</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.basic ? null : { display: "none" })}" class="p-6 space-y-4" data-v-0f01cc04${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-0f01cc04${_scopeId}><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>ORDER NUMB <span class="text-red-500" data-v-0f01cc04${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).order_number)} type="text" required readonly placeholder="EWILOG2509001001" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.order_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.order_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>REF NO</label><input${ssrRenderAttr("value", unref(form).ref_no)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.ref_no) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.ref_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>DATE</label><input${ssrRenderAttr("value", unref(form).so_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.so_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.so_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>CUSTOMER <span class="text-red-500" data-v-0f01cc04${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).customer)} type="text" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.customer) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.customer)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>SHIPPER</label><input${ssrRenderAttr("value", unref(form).shipper)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.shipper) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.shipper)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-0f01cc04${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-0f01cc04${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-0f01cc04${_scopeId}>Shipping Information</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.shipping ? null : { display: "none" })}" class="p-6 space-y-4" data-v-0f01cc04${_scopeId}><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>BL/AWB</label><input${ssrRenderAttr("value", unref(form).bl_awb)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.bl_awb) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.bl_awb)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>LINER</label><input${ssrRenderAttr("value", unref(form).liner)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.liner) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.liner)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>VESSEL</label><input${ssrRenderAttr("value", unref(form).vessel)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.vessel) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.vessel)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-0f01cc04${_scopeId}><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>ETA</label><input${ssrRenderAttr("value", unref(form).eta)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.eta) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.eta)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>ETD</label><input${ssrRenderAttr("value", unref(form).etd)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.etd) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.etd)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>AJU</label><input${ssrRenderAttr("value", unref(form).aju)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.aju) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.aju)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>SPPB DATE</label><input${ssrRenderAttr("value", unref(form).sppb_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.sppb_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.sppb_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>SHIPMENT TYPE</label>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).shipment_type,
              "onUpdate:modelValue": ($event) => unref(form).shipment_type = $event,
              options: shipmentTypeOptions.value,
              placeholder: "Select Shipment Type",
              "search-fields": ["label"],
              "input-class": "w-full px-3 py-2 pr-8 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            }, null, _parent2, _scopeId));
            if (unref(form).errors.shipment_type) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.shipment_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>POL</label><input${ssrRenderAttr("value", unref(form).pol)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.pol) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.pol)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>POD</label><input${ssrRenderAttr("value", unref(form).pod)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.pod) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.pod)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>GUDANG/UTC</label><input${ssrRenderAttr("value", unref(form).gudang_utc)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.gudang_utc) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.gudang_utc)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>PARTY/LCL</label><input${ssrRenderAttr("value", unref(form).party_lcl)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.party_lcl) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.party_lcl)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>EXCHANGE RATE</label><input${ssrRenderAttr("value", unref(form).exchange_rate)} type="number" step="0.0001" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.exchange_rate) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.exchange_rate)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-0f01cc04${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-0f01cc04${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-0f01cc04${_scopeId}>Pricing Information</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.pricing ? null : { display: "none" })}" class="p-6 space-y-6" data-v-0f01cc04${_scopeId}><div class="bg-gray-50 rounded-lg p-4" data-v-0f01cc04${_scopeId}><div class="flex justify-between items-center mb-4" data-v-0f01cc04${_scopeId}><h4 class="text-md font-semibold text-sage-800" data-v-0f01cc04${_scopeId}>Vendor Breakdown (Buying &amp; Selling) </h4><button type="button"${ssrIncludeBooleanAttr(isPricingLocked.value) ? " disabled" : ""} class="${ssrRenderClass([
              "inline-flex items-center text-sm bg-sage-600 text-white px-3 py-1 rounded transition-colors",
              isPricingLocked.value ? "opacity-50 cursor-not-allowed" : "hover:bg-sage-700"
            ])}" data-v-0f01cc04${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Add Vendor </button></div>`);
            if (isPricingLocked.value) {
              _push2(`<div class="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700" data-v-0f01cc04${_scopeId}> Pricing terkunci karena invoice sudah dibayar. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(form).vendor_breakdown, (item, index) => {
              _push2(`<div class="border border-sage-200 rounded-lg p-4 mb-4 space-y-4" data-v-0f01cc04${_scopeId}><div data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-0f01cc04${_scopeId}>Vendor Name</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: item.vendor_id,
                "onUpdate:modelValue": [($event) => item.vendor_id = $event, () => onVendorSelect(index)],
                options: vendorSelectOptions.value,
                placeholder: "Select vendor...",
                "search-fields": ["label"],
                "input-class": "w-full px-3 py-2 pr-8 border border-sage-300 rounded text-sm focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-0f01cc04${_scopeId}>Service Description / Cost Type</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: item.description,
                "onUpdate:modelValue": ($event) => item.description = $event,
                options: getServiceTypeOptions(item.description),
                placeholder: "Select Cost Type",
                "label-field": "label",
                "value-field": "value",
                "sub-label-field": "subLabel",
                "search-fields": ["label", "subLabel"],
                "input-class": "w-full px-3 py-2 pr-8 border border-sage-300 rounded text-sm focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-0f01cc04${_scopeId}>Qty (Optional)</label><input${ssrRenderAttr("value", item.quantity)} type="number" step="0.01" min="0" placeholder="Amount"${ssrIncludeBooleanAttr(isPricingLocked.value) ? " disabled" : ""} class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500 disabled:bg-gray-100 disabled:text-gray-500" data-v-0f01cc04${_scopeId}></div><div data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-0f01cc04${_scopeId}>Unit (Optional)</label><input${ssrRenderAttr("value", item.unit)} type="text" placeholder="Unit" class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}></div><div data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-0f01cc04${_scopeId}>RCVD INV</label><input${ssrRenderAttr("value", item.rcvd_inv)} type="text" placeholder="Received invoice number" class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}></div><div data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-0f01cc04${_scopeId}>Remarks (Individual)</label><input${ssrRenderAttr("value", item.remarks)} type="text" placeholder="Special notes for this item" class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}></div><div class="grid grid-cols-1 gap-3 p-3 bg-blue-50 rounded-lg" data-v-0f01cc04${_scopeId}><div data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-blue-700 mb-1" data-v-0f01cc04${_scopeId}>Buying Amount (Unit Price)</label><input${ssrRenderAttr("value", item.buying_amount)} type="text" placeholder="0"${ssrIncludeBooleanAttr(isPricingLocked.value) ? " disabled" : ""} class="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500" data-v-0f01cc04${_scopeId}>`);
              if (item.quantity && parseFloat(item.quantity) > 0) {
                _push2(`<p class="text-xs text-blue-600 mt-1" data-v-0f01cc04${_scopeId}> Total: ${ssrInterpolate(formatCurrency(getTotalBuyingAmount(item)))} (${ssrInterpolate(item.quantity)} × ${ssrInterpolate(formatCurrency(parseFloat(item.buying_amount.toString().replace(/\./g, "")) || 0))}) </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-green-700 mb-1" data-v-0f01cc04${_scopeId}>Selling Amount (Unit Price)</label><input${ssrRenderAttr("value", item.selling_amount)} type="text" placeholder="0"${ssrIncludeBooleanAttr(isPricingLocked.value) ? " disabled" : ""} class="w-full px-3 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:text-gray-500" data-v-0f01cc04${_scopeId}>`);
              if (item.quantity && parseFloat(item.quantity) > 0) {
                _push2(`<p class="text-xs text-green-600 mt-1" data-v-0f01cc04${_scopeId}> Total: ${ssrInterpolate(formatCurrency(getTotalSellingAmount(item)))} (${ssrInterpolate(item.quantity)} × ${ssrInterpolate(formatCurrency(parseFloat(item.selling_amount.toString().replace(/\./g, "")) || 0))}) </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-0f01cc04${_scopeId}>Profit</label><p class="${ssrRenderClass([getProfit(item) >= 0 ? "text-green-600" : "text-red-600", "px-3 py-2 bg-white border border-purple-300 rounded text-sm font-semibold"])}" data-v-0f01cc04${_scopeId}>${ssrInterpolate(formatCurrency(getProfit(item)))}</p></div></div>`);
              if (item.vendor_id) {
                _push2(`<div class="grid grid-cols-1 gap-3 p-3 bg-sage-50 rounded-lg" data-v-0f01cc04${_scopeId}><div data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-0f01cc04${_scopeId}>Nama Vendor</label><p class="text-sm text-gray-900" data-v-0f01cc04${_scopeId}>${ssrInterpolate(item.nama_vendor || "-")}</p></div><div data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-0f01cc04${_scopeId}>Nomor Rekening</label><p class="text-sm text-gray-900 font-mono" data-v-0f01cc04${_scopeId}>${ssrInterpolate(item.no_rekening || "-")}</p></div><div data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-0f01cc04${_scopeId}>Nama Rekening</label><p class="text-sm text-gray-900" data-v-0f01cc04${_scopeId}>${ssrInterpolate(item.nama_rekening || "-")}</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-end" data-v-0f01cc04${_scopeId}><button type="button"${ssrIncludeBooleanAttr(isPricingLocked.value || unref(form).vendor_breakdown.length <= 1) ? " disabled" : ""} class="inline-flex items-center px-3 py-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-0f01cc04${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
              _push2(` Remove Vendor </button></div></div>`);
            });
            _push2(`<!--]--><div class="mt-4 pt-4 border-t border-gray-300 grid grid-cols-3 gap-4 text-center" data-v-0f01cc04${_scopeId}><div class="p-3 bg-blue-100 rounded-lg" data-v-0f01cc04${_scopeId}><p class="text-xs font-medium text-blue-700" data-v-0f01cc04${_scopeId}>Total Buying</p><p class="text-lg font-bold text-blue-800" data-v-0f01cc04${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</p></div><div class="p-3 bg-green-100 rounded-lg" data-v-0f01cc04${_scopeId}><p class="text-xs font-medium text-green-700" data-v-0f01cc04${_scopeId}>Total Selling</p><p class="text-lg font-bold text-green-800" data-v-0f01cc04${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</p></div><div class="${ssrRenderClass([totalRevenue.value >= 0 ? "bg-purple-100" : "bg-red-100", "p-3 rounded-lg"])}" data-v-0f01cc04${_scopeId}><p class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-purple-700" : "text-red-700", "text-xs font-medium"])}" data-v-0f01cc04${_scopeId}>Total Profit </p><p class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-purple-800" : "text-red-800", "text-lg font-bold"])}" data-v-0f01cc04${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</p></div></div></div><div class="bg-blue-50 rounded-lg p-4" data-v-0f01cc04${_scopeId}><h4 class="text-md font-semibold text-blue-800 mb-3" data-v-0f01cc04${_scopeId}>Revenue Summary</h4><div class="space-y-2" data-v-0f01cc04${_scopeId}><div class="flex justify-between" data-v-0f01cc04${_scopeId}><span data-v-0f01cc04${_scopeId}>Total Income (Selling):</span><span class="font-medium" data-v-0f01cc04${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</span></div><div class="flex justify-between" data-v-0f01cc04${_scopeId}><span data-v-0f01cc04${_scopeId}>Total Expenses (Buying):</span><span class="font-medium" data-v-0f01cc04${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</span></div><div class="flex justify-between items-center pt-2 border-t border-blue-300 font-bold text-lg" data-v-0f01cc04${_scopeId}><span data-v-0f01cc04${_scopeId}>Profit (Revenue):</span><span class="${ssrRenderClass(totalRevenue.value >= 0 ? "text-green-600" : "text-red-600")}" data-v-0f01cc04${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</span></div></div></div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>REMARKS</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea>`);
            if (unref(form).errors.remarks) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.remarks)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>NOTE</label><textarea rows="3" placeholder="Catatan tambahan untuk Shipping Order ini" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).note)}</textarea>`);
            if (unref(form).errors.note) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.note)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-0f01cc04${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-0f01cc04${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-0f01cc04${_scopeId}>Goods Information</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.goods ? null : { display: "none" })}" class="p-6 space-y-4" data-v-0f01cc04${_scopeId}><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>COMMODITY/GOODS DESCRIPTION</label><textarea rows="3" placeholder="Enter detailed goods/commodity description" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).commodity)}</textarea>`);
            if (unref(form).errors.commodity) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.commodity)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-0f01cc04${_scopeId}><div class="grid grid-cols-2 gap-3" data-v-0f01cc04${_scopeId}><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>QTY</label><input${ssrRenderAttr("value", unref(form).qty)} type="number" min="0" placeholder="Enter quantity" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.qty) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.qty)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>Package Unit</label>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).package_unit,
              "onUpdate:modelValue": ($event) => unref(form).package_unit = $event,
              options: packageUnitOptions.value,
              placeholder: "Select Unit",
              "search-fields": ["label"],
              "input-class": "w-full px-3 py-2 pr-8 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            }, null, _parent2, _scopeId));
            if (unref(form).errors.package_unit) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.package_unit)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>NET WEIGHT (KG)</label><input${ssrRenderAttr("value", unref(form).net_weight)} type="number" step="0.01" min="0" placeholder="Enter net weight in kg" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.net_weight) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.net_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>GROSS WEIGHT (KG)</label><input${ssrRenderAttr("value", unref(form).gross_weight)} type="number" step="0.01" min="0" placeholder="Enter gross weight in kg" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.gross_weight) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.gross_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>MEAS (M³)</label><input${ssrRenderAttr("value", unref(form).measurement)} type="number" step="0.001" min="0" placeholder="Enter volume in m³" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.measurement) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.measurement)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-0f01cc04${_scopeId}><div class="flex justify-between items-center mb-2" data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-0f01cc04${_scopeId}>CONTAINER NO</label><button type="button" class="inline-flex items-center text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors" data-v-0f01cc04${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Add Container </button></div><!--[-->`);
            ssrRenderList(unref(form).container_no, (container, index) => {
              _push2(`<div class="flex gap-2 mb-2" data-v-0f01cc04${_scopeId}><input${ssrRenderAttr("value", unref(form).container_no[index])} type="text" placeholder="Enter container number (e.g., TCLU1234567)" class="flex-1 px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
              if (unref(form).container_no.length > 1) {
                _push2(`<button type="button" class="px-3 py-2 inline-flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors" data-v-0f01cc04${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (unref(form).errors.container_no) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.container_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-0f01cc04${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-0f01cc04${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-0f01cc04${_scopeId}>Invoice Information</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.invoice }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.invoice ? null : { display: "none" })}" class="p-6 space-y-4" data-v-0f01cc04${_scopeId}><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>INVOICE NUMB</label><input${ssrRenderAttr("value", unref(form).invoice_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.invoice_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>INVOICE DATE</label><input${ssrRenderAttr("value", unref(form).invoice_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.invoice_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0f01cc04${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0f01cc04${_scopeId}>T.O.P</label><input${ssrRenderAttr("value", unref(form).top)} type="text" placeholder="e.g., NET 30" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).errors.top) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0f01cc04${_scopeId}>${ssrInterpolate(unref(form).errors.top)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-0f01cc04${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-0f01cc04${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-0f01cc04${_scopeId}>Other Costs (Operational)</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.other_costs }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.other_costs ? null : { display: "none" })}" class="p-6" data-v-0f01cc04${_scopeId}><div class="bg-orange-50 rounded-lg p-4" data-v-0f01cc04${_scopeId}><div class="flex justify-between items-center mb-4" data-v-0f01cc04${_scopeId}><h4 class="text-md font-semibold text-orange-800" data-v-0f01cc04${_scopeId}>Other Costs (Operational)</h4><button type="button" class="inline-flex items-center text-sm bg-orange-600 text-white px-3 py-1 rounded transition-colors hover:bg-orange-700" data-v-0f01cc04${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Add Cost </button></div>`);
            if (hasLockedOtherCosts.value) {
              _push2(`<div class="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700" data-v-0f01cc04${_scopeId}> Beberapa item sudah <strong data-v-0f01cc04${_scopeId}>Paid</strong> di AP, jadi item tersebut terkunci dan tidak bisa diubah/dihapus. </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).other_costs && unref(form).other_costs.length > 0) {
              _push2(`<div class="space-y-3" data-v-0f01cc04${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).other_costs, (cost, index) => {
                _push2(`<div class="relative border border-orange-200 rounded-lg p-3 bg-white" data-v-0f01cc04${_scopeId}><button type="button"${ssrIncludeBooleanAttr(isOtherCostLocked(cost) || unref(form).other_costs.length <= 1) ? " disabled" : ""} class="${ssrRenderClass([
                  "absolute bottom-1 right-4 px-2 py-1 flex items-center justify-center rounded transition-colors",
                  isOtherCostLocked(cost) || unref(form).other_costs.length <= 1 ? "opacity-50 cursor-not-allowed text-red-400" : "text-red-600 hover:text-red-800 hover:bg-red-100"
                ])}" data-v-0f01cc04${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button><div class="grid grid-cols-12 gap-3" data-v-0f01cc04${_scopeId}><div class="col-span-12" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-0f01cc04${_scopeId}>Cost Description</label><input${ssrRenderAttr("value", cost.description)} type="text" placeholder="Example: handling fees, documents, etc."${ssrIncludeBooleanAttr(isOtherCostLocked(cost)) ? " disabled" : ""} class="w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" data-v-0f01cc04${_scopeId}></div><div class="col-span-12" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-0f01cc04${_scopeId}>Cost Amount (Unit Price)</label><input${ssrRenderAttr("value", cost.amount)} type="text" placeholder="0"${ssrIncludeBooleanAttr(isOtherCostLocked(cost)) ? " disabled" : ""} class="w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500" data-v-0f01cc04${_scopeId}>`);
                if (cost.quantity && parseFloat(cost.quantity) > 0) {
                  _push2(`<p class="text-xs text-orange-600 mt-1" data-v-0f01cc04${_scopeId}> Total: ${ssrInterpolate(formatCurrency(getTotalCostAmount(cost)))}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="col-span-12" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-0f01cc04${_scopeId}>Qty (Optional)</label><input${ssrRenderAttr("value", cost.quantity)} type="number" min="0" step="0.01" placeholder="Quantity"${ssrIncludeBooleanAttr(isOtherCostLocked(cost)) ? " disabled" : ""} class="w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500" data-v-0f01cc04${_scopeId}></div><div class="col-span-12" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-0f01cc04${_scopeId}>Unit (Optional)</label><input${ssrRenderAttr("value", cost.unit)} type="text" placeholder="Unit"${ssrIncludeBooleanAttr(isOtherCostLocked(cost)) ? " disabled" : ""} class="w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" data-v-0f01cc04${_scopeId}></div><div class="col-span-12" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-0f01cc04${_scopeId}>Category</label>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  modelValue: cost.category_id,
                  "onUpdate:modelValue": [($event) => cost.category_id = $event, () => onOtherCostCategoryChange(cost)],
                  options: operationalCostCategoryOptions.value,
                  placeholder: "Select category",
                  "search-fields": ["label", "subLabel"],
                  "label-field": "label",
                  "value-field": "value",
                  "sub-label-field": "subLabel",
                  disabled: isOtherCostLocked(cost),
                  "input-class": "w-full px-3 py-2 pr-8 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="col-span-12" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-0f01cc04${_scopeId}>Vendor / Recipient</label>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  modelValue: cost.vendor_id,
                  "onUpdate:modelValue": ($event) => cost.vendor_id = $event,
                  options: vendorSelectOptions.value,
                  placeholder: "Select vendor",
                  "search-fields": ["label"],
                  disabled: isOtherCostLocked(cost),
                  "input-class": "w-full px-3 py-2 pr-8 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                }, null, _parent2, _scopeId));
                _push2(`<p class="text-xs text-orange-600 mt-1" data-v-0f01cc04${_scopeId}>Select vendor jika sudah tahu akan dibayar ke siapa</p></div></div></div>`);
              });
              _push2(`<!--]--><div class="pt-3 border-t border-orange-300" data-v-0f01cc04${_scopeId}><div class="flex justify-between items-center" data-v-0f01cc04${_scopeId}><span class="text-sm font-medium text-orange-700" data-v-0f01cc04${_scopeId}>Total Other Costs:</span><span class="text-lg font-bold text-orange-800" data-v-0f01cc04${_scopeId}>${ssrInterpolate(formatCurrency(totalOtherCosts.value))}</span></div></div><div class="mt-6 pt-4 border-t border-orange-200" data-v-0f01cc04${_scopeId}><button type="button" class="w-full flex flex-col items-center justify-center px-4 py-3 border-2 border-dashed border-orange-200 rounded-lg text-orange-700 transition-colors hover:border-orange-300 hover:bg-orange-50" data-v-0f01cc04${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Plus), { class: "w-5 h-5 mb-1" }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm font-medium" data-v-0f01cc04${_scopeId}>Add Another Cost</span></button></div></div>`);
            } else {
              _push2(`<div class="text-center py-4 text-orange-600" data-v-0f01cc04${_scopeId}><p class="text-sm" data-v-0f01cc04${_scopeId}>No other costs yet</p><p class="text-xs text-orange-500" data-v-0f01cc04${_scopeId}>Click &quot;Add Cost&quot; to add one</p></div>`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-0f01cc04${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-0f01cc04${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-0f01cc04${_scopeId}>Reimbursement Items</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.reimbursement }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.reimbursement ? null : { display: "none" })}" class="p-6" data-v-0f01cc04${_scopeId}><div class="bg-purple-50 rounded-lg p-4" data-v-0f01cc04${_scopeId}><div class="flex justify-between items-center mb-4" data-v-0f01cc04${_scopeId}><h4 class="text-md font-semibold text-purple-800" data-v-0f01cc04${_scopeId}>Reimbursement Items</h4><button type="button" class="inline-flex items-center text-sm bg-purple-600 text-white px-3 py-1 rounded transition-colors hover:bg-purple-700" data-v-0f01cc04${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Add Reimbursement </button></div>`);
            if (hasLockedReimbursements.value) {
              _push2(`<div class="mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700" data-v-0f01cc04${_scopeId}> Item reimbursement yang sudah <strong data-v-0f01cc04${_scopeId}>Paid</strong> di AP terkunci dan tidak bisa diubah/dihapus. </div>`);
            } else {
              _push2(`<!---->`);
            }
            if (reimbursementItems.value && reimbursementItems.value.length > 0) {
              _push2(`<div class="space-y-3" data-v-0f01cc04${_scopeId}><!--[-->`);
              ssrRenderList(reimbursementItems.value, (item, index) => {
                _push2(`<div class="relative border border-purple-200 rounded-lg p-3 pb-8 bg-white" data-v-0f01cc04${_scopeId}><button type="button"${ssrIncludeBooleanAttr(isReimbursementLocked(item)) ? " disabled" : ""} class="${ssrRenderClass([
                  "absolute bottom-2 right-4 px-2 py-1 flex items-center justify-center rounded transition-colors",
                  isReimbursementLocked(item) ? "opacity-50 cursor-not-allowed text-red-400" : "text-red-600 hover:text-red-800 hover:bg-red-100"
                ])}" data-v-0f01cc04${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button><div class="grid grid-cols-12 gap-3" data-v-0f01cc04${_scopeId}><div class="col-span-12" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-0f01cc04${_scopeId}>Description</label><input${ssrRenderAttr("value", item.description)} type="text" placeholder="Example: transport, accommodation, etc."${ssrIncludeBooleanAttr(isReimbursementLocked(item)) ? " disabled" : ""} class="w-full px-3 py-2 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" data-v-0f01cc04${_scopeId}></div><div class="col-span-6" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-0f01cc04${_scopeId}>Qty</label><input${ssrRenderAttr("value", item.quantity)} type="number" min="0" step="0.01" placeholder="1"${ssrIncludeBooleanAttr(isReimbursementLocked(item)) ? " disabled" : ""} class="w-full px-3 py-2 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:text-gray-500" data-v-0f01cc04${_scopeId}></div><div class="col-span-6" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-0f01cc04${_scopeId}>Unit</label><input${ssrRenderAttr("value", item.unit)} type="text" placeholder="Unit"${ssrIncludeBooleanAttr(isReimbursementLocked(item)) ? " disabled" : ""} class="w-full px-3 py-2 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" data-v-0f01cc04${_scopeId}></div><div class="col-span-12" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-0f01cc04${_scopeId}>Amount</label><input${ssrRenderAttr("value", item.amount)} type="number" min="0" step="0.01" placeholder="0"${ssrIncludeBooleanAttr(isReimbursementLocked(item)) ? " disabled" : ""} class="w-full px-3 py-2 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:text-gray-500" data-v-0f01cc04${_scopeId}></div><div class="col-span-12" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-0f01cc04${_scopeId}>Category</label>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  modelValue: item.category,
                  "onUpdate:modelValue": ($event) => item.category = $event,
                  options: reimbursementCategoryOptions.value,
                  placeholder: "Select category",
                  "search-fields": ["label", "description"],
                  "label-field": "label",
                  "value-field": "value",
                  disabled: isReimbursementLocked(item) || reimbursementCategoryOptions.value.length === 0,
                  "input-class": `w-full px-3 py-2 pr-8 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${reimbursementCategoryOptions.value.length === 0 ? "bg-gray-100 pointer-events-none" : ""}`
                }, null, _parent2, _scopeId));
                if (reimbursementCategoryOptions.value.length === 0) {
                  _push2(`<p class="text-xs text-purple-600 mt-1" data-v-0f01cc04${_scopeId}> No categories available. Please add master Operational Cost Categories first. </p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="col-span-12" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-0f01cc04${_scopeId}>Vendor / Recipient</label>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  modelValue: item.vendor_id,
                  "onUpdate:modelValue": ($event) => item.vendor_id = $event,
                  options: vendorSelectOptions.value,
                  placeholder: "Select vendor",
                  "search-fields": ["label"],
                  disabled: isReimbursementLocked(item),
                  "input-class": "w-full px-3 py-2 pr-8 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                }, null, _parent2, _scopeId));
                _push2(`<p class="text-xs text-purple-600 mt-1" data-v-0f01cc04${_scopeId}>Select vendor jika sudah tahu akan dibayar ke siapa</p></div></div><div class="mt-2" data-v-0f01cc04${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-0f01cc04${_scopeId}>Notes (opsional)</label><textarea rows="2" placeholder="Additional notes for this reimbursement item"${ssrIncludeBooleanAttr(isReimbursementLocked(item)) ? " disabled" : ""} class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 resize-none" data-v-0f01cc04${_scopeId}>${ssrInterpolate(item.notes)}</textarea></div></div>`);
              });
              _push2(`<!--]--><div class="pt-3 border-t border-purple-300" data-v-0f01cc04${_scopeId}><div class="flex justify-between items-center" data-v-0f01cc04${_scopeId}><span class="text-sm font-medium text-purple-700" data-v-0f01cc04${_scopeId}>Total Reimbursement:</span><span class="text-lg font-bold text-purple-800" data-v-0f01cc04${_scopeId}>${ssrInterpolate(formatCurrency(totalReimbursement.value))}</span></div></div><div class="mt-6 pt-4 border-t border-purple-200" data-v-0f01cc04${_scopeId}><button type="button" class="w-full flex flex-col items-center justify-center px-4 py-3 border-2 border-dashed border-purple-200 rounded-lg text-purple-700 transition-colors hover:border-purple-300 hover:bg-purple-50" data-v-0f01cc04${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Plus), { class: "w-5 h-5 mb-1" }, null, _parent2, _scopeId));
              _push2(`<span class="text-sm font-medium" data-v-0f01cc04${_scopeId}>Add Another Reimbursement</span></button></div></div>`);
            } else {
              _push2(`<div class="text-center py-4 text-purple-600" data-v-0f01cc04${_scopeId}><p class="text-sm" data-v-0f01cc04${_scopeId}>No reimbursement items yet</p><p class="text-xs text-purple-500" data-v-0f01cc04${_scopeId}>Click &quot;Add Reimbursement&quot; to menambahkan</p></div>`);
            }
            _push2(`</div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" data-v-0f01cc04${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-0f01cc04${_scopeId}>`);
            if (unref(form).processing) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "animate-spin -ml-1 mr-3 h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-0f01cc04${_scopeId}>Saving...</span>`);
            } else {
              _push2(`<span data-v-0f01cc04${_scopeId}>Update Shipping Order</span>`);
            }
            _push2(`</button></div></form></div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: alertDialog.value.show,
              type: alertDialog.value.type,
              title: alertDialog.value.title,
              message: alertDialog.value.message,
              "confirm-text": alertDialog.value.confirmText,
              "cancel-text": alertDialog.value.cancelText,
              onConfirm: handleAlertConfirm,
              onCancel: handleAlertCancel,
              onClose: closeAlert
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" }, [
                            createVNode(unref(Pen), { class: "w-6 h-6 text-white" })
                          ]),
                          createVNode("div", null, [
                            createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, "Edit Shipping: " + toDisplayString(__props.salesOrder.order_number), 1),
                            createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Update shipping order information for the customer. ")
                          ])
                        ]),
                        createVNode("div", { class: "mt-4 sm:mt-0 flex gap-3" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-cs.sales-orders.show", __props.salesOrder.id),
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Eye), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" View Details ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-cs.sales-orders.index"),
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Back ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", {
                        onClick: ($event) => toggleSection("basic"),
                        class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                      }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Basic Information"),
                        createVNode(unref(ChevronDown), {
                          class: [{ "rotate-180": !sections.value.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                        }, null, 8, ["class"])
                      ], 8, ["onClick"]),
                      withDirectives(createVNode("div", { class: "p-6 space-y-4" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                              createTextVNode("ORDER NUMB "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).order_number = $event,
                              type: "text",
                              required: "",
                              readonly: "",
                              placeholder: "EWILOG2509001001",
                              class: "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).order_number]
                            ]),
                            unref(form).errors.order_number ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.order_number), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "REF NO"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).ref_no = $event,
                              type: "text",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).ref_no]
                            ]),
                            unref(form).errors.ref_no ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.ref_no), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "DATE"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).so_date = $event,
                              type: "date",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).so_date]
                            ]),
                            unref(form).errors.so_date ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.so_date), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                            createTextVNode("CUSTOMER "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).customer = $event,
                            type: "text",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).customer]
                          ]),
                          unref(form).errors.customer ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.customer), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "SHIPPER"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).shipper = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).shipper]
                          ]),
                          unref(form).errors.shipper ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.shipper), 1)) : createCommentVNode("", true)
                        ])
                      ], 512), [
                        [vShow, sections.value.basic]
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", {
                        onClick: ($event) => toggleSection("shipping"),
                        class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                      }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Shipping Information"),
                        createVNode(unref(ChevronDown), {
                          class: [{ "rotate-180": !sections.value.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                        }, null, 8, ["class"])
                      ], 8, ["onClick"]),
                      withDirectives(createVNode("div", { class: "p-6 space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "BL/AWB"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).bl_awb = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).bl_awb]
                          ]),
                          unref(form).errors.bl_awb ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.bl_awb), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "LINER"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).liner = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).liner]
                          ]),
                          unref(form).errors.liner ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.liner), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "VESSEL"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).vessel = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).vessel]
                          ]),
                          unref(form).errors.vessel ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.vessel), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "ETA"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).eta = $event,
                              type: "date",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).eta]
                            ]),
                            unref(form).errors.eta ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.eta), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "ETD"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).etd = $event,
                              type: "date",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).etd]
                            ]),
                            unref(form).errors.etd ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.etd), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "AJU"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).aju = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).aju]
                          ]),
                          unref(form).errors.aju ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.aju), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "SPPB DATE"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).sppb_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).sppb_date]
                          ]),
                          unref(form).errors.sppb_date ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.sppb_date), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "SHIPMENT TYPE"),
                          createVNode(_sfc_main$1, {
                            modelValue: unref(form).shipment_type,
                            "onUpdate:modelValue": ($event) => unref(form).shipment_type = $event,
                            options: shipmentTypeOptions.value,
                            placeholder: "Select Shipment Type",
                            "search-fields": ["label"],
                            "input-class": "w-full px-3 py-2 pr-8 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                          unref(form).errors.shipment_type ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.shipment_type), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "POL"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pol = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pol]
                          ]),
                          unref(form).errors.pol ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.pol), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "POD"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pod = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pod]
                          ]),
                          unref(form).errors.pod ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.pod), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "GUDANG/UTC"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).gudang_utc = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).gudang_utc]
                          ]),
                          unref(form).errors.gudang_utc ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.gudang_utc), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "PARTY/LCL"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).party_lcl = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).party_lcl]
                          ]),
                          unref(form).errors.party_lcl ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.party_lcl), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "EXCHANGE RATE"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).exchange_rate = $event,
                            type: "number",
                            step: "0.0001",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).exchange_rate]
                          ]),
                          unref(form).errors.exchange_rate ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.exchange_rate), 1)) : createCommentVNode("", true)
                        ])
                      ], 512), [
                        [vShow, sections.value.shipping]
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", {
                        onClick: ($event) => toggleSection("pricing"),
                        class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                      }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Pricing Information"),
                        createVNode(unref(ChevronDown), {
                          class: [{ "rotate-180": !sections.value.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                        }, null, 8, ["class"])
                      ], 8, ["onClick"]),
                      withDirectives(createVNode("div", { class: "p-6 space-y-6" }, [
                        createVNode("div", { class: "bg-gray-50 rounded-lg p-4" }, [
                          createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                            createVNode("h4", { class: "text-md font-semibold text-sage-800" }, "Vendor Breakdown (Buying & Selling) "),
                            createVNode("button", {
                              type: "button",
                              onClick: addVendorItem,
                              disabled: isPricingLocked.value,
                              class: [
                                "inline-flex items-center text-sm bg-sage-600 text-white px-3 py-1 rounded transition-colors",
                                isPricingLocked.value ? "opacity-50 cursor-not-allowed" : "hover:bg-sage-700"
                              ]
                            }, [
                              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Add Vendor ")
                            ], 10, ["disabled"])
                          ]),
                          isPricingLocked.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700"
                          }, " Pricing terkunci karena invoice sudah dibayar. ")) : createCommentVNode("", true),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).vendor_breakdown, (item, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "border border-sage-200 rounded-lg p-4 mb-4 space-y-4"
                            }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Vendor Name"),
                                createVNode(_sfc_main$1, {
                                  modelValue: item.vendor_id,
                                  "onUpdate:modelValue": [($event) => item.vendor_id = $event, () => onVendorSelect(index)],
                                  options: vendorSelectOptions.value,
                                  placeholder: "Select vendor...",
                                  "search-fields": ["label"],
                                  "input-class": "w-full px-3 py-2 pr-8 border border-sage-300 rounded text-sm focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Service Description / Cost Type"),
                                createVNode(_sfc_main$1, {
                                  modelValue: item.description,
                                  "onUpdate:modelValue": ($event) => item.description = $event,
                                  options: getServiceTypeOptions(item.description),
                                  placeholder: "Select Cost Type",
                                  "label-field": "label",
                                  "value-field": "value",
                                  "sub-label-field": "subLabel",
                                  "search-fields": ["label", "subLabel"],
                                  "input-class": "w-full px-3 py-2 pr-8 border border-sage-300 rounded text-sm focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Qty (Optional)"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.quantity = $event,
                                  type: "number",
                                  step: "0.01",
                                  min: "0",
                                  placeholder: "Amount",
                                  disabled: isPricingLocked.value,
                                  onInput: () => recalculateVendorAmounts(),
                                  onBlur: calculateTotals,
                                  class: "w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500 disabled:bg-gray-100 disabled:text-gray-500"
                                }, null, 40, ["onUpdate:modelValue", "disabled", "onInput"]), [
                                  [vModelText, item.quantity]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Unit (Optional)"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.unit = $event,
                                  type: "text",
                                  placeholder: "Unit",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.unit]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "RCVD INV"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.rcvd_inv = $event,
                                  type: "text",
                                  placeholder: "Received invoice number",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.rcvd_inv]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Remarks (Individual)"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.remarks = $event,
                                  type: "text",
                                  placeholder: "Special notes for this item",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.remarks]
                                ])
                              ]),
                              createVNode("div", { class: "grid grid-cols-1 gap-3 p-3 bg-blue-50 rounded-lg" }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-xs font-medium text-blue-700 mb-1" }, "Buying Amount (Unit Price)"),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => item.buying_amount = $event,
                                    type: "text",
                                    placeholder: "0",
                                    disabled: isPricingLocked.value,
                                    onInput: ($event) => onBuyingAmountInput(item),
                                    onBlur: () => {
                                      recalculateVendorAmounts();
                                      calculateTotals();
                                    },
                                    class: "w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  }, null, 40, ["onUpdate:modelValue", "disabled", "onInput", "onBlur"]), [
                                    [vModelText, item.buying_amount]
                                  ]),
                                  item.quantity && parseFloat(item.quantity) > 0 ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-xs text-blue-600 mt-1"
                                  }, " Total: " + toDisplayString(formatCurrency(getTotalBuyingAmount(item))) + " (" + toDisplayString(item.quantity) + " × " + toDisplayString(formatCurrency(parseFloat(item.buying_amount.toString().replace(/\./g, "")) || 0)) + ") ", 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-xs font-medium text-green-700 mb-1" }, "Selling Amount (Unit Price)"),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => item.selling_amount = $event,
                                    type: "text",
                                    placeholder: "0",
                                    disabled: isPricingLocked.value,
                                    onInput: ($event) => onSellingAmountInput(item),
                                    onBlur: () => {
                                      recalculateVendorAmounts();
                                      calculateTotals();
                                    },
                                    class: "w-full px-3 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  }, null, 40, ["onUpdate:modelValue", "disabled", "onInput", "onBlur"]), [
                                    [vModelText, item.selling_amount]
                                  ]),
                                  item.quantity && parseFloat(item.quantity) > 0 ? (openBlock(), createBlock("p", {
                                    key: 0,
                                    class: "text-xs text-green-600 mt-1"
                                  }, " Total: " + toDisplayString(formatCurrency(getTotalSellingAmount(item))) + " (" + toDisplayString(item.quantity) + " × " + toDisplayString(formatCurrency(parseFloat(item.selling_amount.toString().replace(/\./g, "")) || 0)) + ") ", 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Profit"),
                                  createVNode("p", {
                                    class: ["px-3 py-2 bg-white border border-purple-300 rounded text-sm font-semibold", getProfit(item) >= 0 ? "text-green-600" : "text-red-600"]
                                  }, toDisplayString(formatCurrency(getProfit(item))), 3)
                                ])
                              ]),
                              item.vendor_id ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "grid grid-cols-1 gap-3 p-3 bg-sage-50 rounded-lg"
                              }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Nama Vendor"),
                                  createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(item.nama_vendor || "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Nomor Rekening"),
                                  createVNode("p", { class: "text-sm text-gray-900 font-mono" }, toDisplayString(item.no_rekening || "-"), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Nama Rekening"),
                                  createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(item.nama_rekening || "-"), 1)
                                ])
                              ])) : createCommentVNode("", true),
                              createVNode("div", { class: "flex justify-end" }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeVendorItem(index),
                                  disabled: isPricingLocked.value || unref(form).vendor_breakdown.length <= 1,
                                  class: "inline-flex items-center px-3 py-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                }, [
                                  createVNode(unref(Trash2), { class: "w-4 h-4 mr-1" }),
                                  createTextVNode(" Remove Vendor ")
                                ], 8, ["onClick", "disabled"])
                              ])
                            ]);
                          }), 128)),
                          createVNode("div", { class: "mt-4 pt-4 border-t border-gray-300 grid grid-cols-3 gap-4 text-center" }, [
                            createVNode("div", { class: "p-3 bg-blue-100 rounded-lg" }, [
                              createVNode("p", { class: "text-xs font-medium text-blue-700" }, "Total Buying"),
                              createVNode("p", { class: "text-lg font-bold text-blue-800" }, toDisplayString(formatCurrency(totalBuying.value)), 1)
                            ]),
                            createVNode("div", { class: "p-3 bg-green-100 rounded-lg" }, [
                              createVNode("p", { class: "text-xs font-medium text-green-700" }, "Total Selling"),
                              createVNode("p", { class: "text-lg font-bold text-green-800" }, toDisplayString(formatCurrency(totalSelling.value)), 1)
                            ]),
                            createVNode("div", {
                              class: ["p-3 rounded-lg", totalRevenue.value >= 0 ? "bg-purple-100" : "bg-red-100"]
                            }, [
                              createVNode("p", {
                                class: ["text-xs font-medium", totalRevenue.value >= 0 ? "text-purple-700" : "text-red-700"]
                              }, "Total Profit ", 2),
                              createVNode("p", {
                                class: ["text-lg font-bold", totalRevenue.value >= 0 ? "text-purple-800" : "text-red-800"]
                              }, toDisplayString(formatCurrency(totalRevenue.value)), 3)
                            ], 2)
                          ])
                        ]),
                        createVNode("div", { class: "bg-blue-50 rounded-lg p-4" }, [
                          createVNode("h4", { class: "text-md font-semibold text-blue-800 mb-3" }, "Revenue Summary"),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", null, "Total Income (Selling):"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(totalSelling.value)), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", null, "Total Expenses (Buying):"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(totalBuying.value)), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between items-center pt-2 border-t border-blue-300 font-bold text-lg" }, [
                              createVNode("span", null, "Profit (Revenue):"),
                              createVNode("span", {
                                class: totalRevenue.value >= 0 ? "text-green-600" : "text-red-600"
                              }, toDisplayString(formatCurrency(totalRevenue.value)), 3)
                            ])
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "REMARKS"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).remarks = $event,
                            rows: "3",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).remarks]
                          ]),
                          unref(form).errors.remarks ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.remarks), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "NOTE"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).note = $event,
                            rows: "3",
                            placeholder: "Catatan tambahan untuk Shipping Order ini",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).note]
                          ]),
                          unref(form).errors.note ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.note), 1)) : createCommentVNode("", true)
                        ])
                      ], 512), [
                        [vShow, sections.value.pricing]
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", {
                        onClick: ($event) => toggleSection("goods"),
                        class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                      }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Goods Information"),
                        createVNode(unref(ChevronDown), {
                          class: [{ "rotate-180": !sections.value.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                        }, null, 8, ["class"])
                      ], 8, ["onClick"]),
                      withDirectives(createVNode("div", { class: "p-6 space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "COMMODITY/GOODS DESCRIPTION"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).commodity = $event,
                            rows: "3",
                            placeholder: "Enter detailed goods/commodity description",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).commodity]
                          ]),
                          unref(form).errors.commodity ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.commodity), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                          createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "QTY"),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).qty = $event,
                                type: "number",
                                min: "0",
                                placeholder: "Enter quantity",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).qty]
                              ]),
                              unref(form).errors.qty ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.qty), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Package Unit"),
                              createVNode(_sfc_main$1, {
                                modelValue: unref(form).package_unit,
                                "onUpdate:modelValue": ($event) => unref(form).package_unit = $event,
                                options: packageUnitOptions.value,
                                placeholder: "Select Unit",
                                "search-fields": ["label"],
                                "input-class": "w-full px-3 py-2 pr-8 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                              unref(form).errors.package_unit ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.package_unit), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "NET WEIGHT (KG)"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).net_weight = $event,
                              type: "number",
                              step: "0.01",
                              min: "0",
                              placeholder: "Enter net weight in kg",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).net_weight]
                            ]),
                            unref(form).errors.net_weight ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.net_weight), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "GROSS WEIGHT (KG)"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).gross_weight = $event,
                              type: "number",
                              step: "0.01",
                              min: "0",
                              placeholder: "Enter gross weight in kg",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).gross_weight]
                            ]),
                            unref(form).errors.gross_weight ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.gross_weight), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "MEAS (M³)"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).measurement = $event,
                              type: "number",
                              step: "0.001",
                              min: "0",
                              placeholder: "Enter volume in m³",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).measurement]
                            ]),
                            unref(form).errors.measurement ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.measurement), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("div", { class: "flex justify-between items-center mb-2" }, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "CONTAINER NO"),
                            createVNode("button", {
                              type: "button",
                              onClick: addContainerNo,
                              class: "inline-flex items-center text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors"
                            }, [
                              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Add Container ")
                            ])
                          ]),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).container_no, (container, index) => {
                            return openBlock(), createBlock("div", {
                              key: "container-" + index,
                              class: "flex gap-2 mb-2"
                            }, [
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => unref(form).container_no[index] = $event,
                                type: "text",
                                placeholder: "Enter container number (e.g., TCLU1234567)",
                                class: "flex-1 px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).container_no[index]]
                              ]),
                              unref(form).container_no.length > 1 ? (openBlock(), createBlock("button", {
                                key: 0,
                                type: "button",
                                onClick: ($event) => removeContainerNo(index),
                                class: "px-3 py-2 inline-flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                              }, [
                                createVNode(unref(Trash2), { class: "w-4 h-4" })
                              ], 8, ["onClick"])) : createCommentVNode("", true)
                            ]);
                          }), 128)),
                          unref(form).errors.container_no ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.container_no), 1)) : createCommentVNode("", true)
                        ])
                      ], 512), [
                        [vShow, sections.value.goods]
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", {
                        onClick: ($event) => toggleSection("invoice"),
                        class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                      }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Invoice Information"),
                        createVNode(unref(ChevronDown), {
                          class: [{ "rotate-180": !sections.value.invoice }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                        }, null, 8, ["class"])
                      ], 8, ["onClick"]),
                      withDirectives(createVNode("div", { class: "p-6 space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "INVOICE NUMB"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).invoice_number = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).invoice_number]
                          ]),
                          unref(form).errors.invoice_number ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.invoice_number), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "INVOICE DATE"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).invoice_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).invoice_date]
                          ]),
                          unref(form).errors.invoice_date ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.invoice_date), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "T.O.P"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).top = $event,
                            type: "text",
                            placeholder: "e.g., NET 30",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).top]
                          ]),
                          unref(form).errors.top ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.top), 1)) : createCommentVNode("", true)
                        ])
                      ], 512), [
                        [vShow, sections.value.invoice]
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", {
                        onClick: ($event) => toggleSection("other_costs"),
                        class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                      }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Other Costs (Operational)"),
                        createVNode(unref(ChevronDown), {
                          class: [{ "rotate-180": !sections.value.other_costs }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                        }, null, 8, ["class"])
                      ], 8, ["onClick"]),
                      withDirectives(createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "bg-orange-50 rounded-lg p-4" }, [
                          createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                            createVNode("h4", { class: "text-md font-semibold text-orange-800" }, "Other Costs (Operational)"),
                            createVNode("button", {
                              type: "button",
                              onClick: addOtherCost,
                              class: "inline-flex items-center text-sm bg-orange-600 text-white px-3 py-1 rounded transition-colors hover:bg-orange-700"
                            }, [
                              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Add Cost ")
                            ])
                          ]),
                          hasLockedOtherCosts.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700"
                          }, [
                            createTextVNode(" Beberapa item sudah "),
                            createVNode("strong", null, "Paid"),
                            createTextVNode(" di AP, jadi item tersebut terkunci dan tidak bisa diubah/dihapus. ")
                          ])) : createCommentVNode("", true),
                          unref(form).other_costs && unref(form).other_costs.length > 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(form).other_costs, (cost, index) => {
                              return openBlock(), createBlock("div", {
                                key: "cost-" + index,
                                class: "relative border border-orange-200 rounded-lg p-3 bg-white"
                              }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeOtherCost(index),
                                  disabled: isOtherCostLocked(cost) || unref(form).other_costs.length <= 1,
                                  class: [
                                    "absolute bottom-1 right-4 px-2 py-1 flex items-center justify-center rounded transition-colors",
                                    isOtherCostLocked(cost) || unref(form).other_costs.length <= 1 ? "opacity-50 cursor-not-allowed text-red-400" : "text-red-600 hover:text-red-800 hover:bg-red-100"
                                  ]
                                }, [
                                  createVNode(unref(Trash2), { class: "w-4 h-4" })
                                ], 10, ["onClick", "disabled"]),
                                createVNode("div", { class: "grid grid-cols-12 gap-3" }, [
                                  createVNode("div", { class: "col-span-12" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Cost Description"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => cost.description = $event,
                                      type: "text",
                                      placeholder: "Example: handling fees, documents, etc.",
                                      disabled: isOtherCostLocked(cost),
                                      class: "w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                    }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                                      [vModelText, cost.description]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-12" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Cost Amount (Unit Price)"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => cost.amount = $event,
                                      type: "text",
                                      placeholder: "0",
                                      disabled: isOtherCostLocked(cost),
                                      onInput: (e) => {
                                        formatCostAmount(cost, e);
                                        onCostAmountInput(cost);
                                      },
                                      onBlur: () => recalculateCostAmount(),
                                      class: "w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    }, null, 40, ["onUpdate:modelValue", "disabled", "onInput", "onBlur"]), [
                                      [vModelText, cost.amount]
                                    ]),
                                    cost.quantity && parseFloat(cost.quantity) > 0 ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "text-xs text-orange-600 mt-1"
                                    }, " Total: " + toDisplayString(formatCurrency(getTotalCostAmount(cost))), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "col-span-12" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Qty (Optional)"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => cost.quantity = $event,
                                      type: "number",
                                      min: "0",
                                      step: "0.01",
                                      placeholder: "Quantity",
                                      disabled: isOtherCostLocked(cost),
                                      onInput: () => recalculateCostAmount(),
                                      class: "w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    }, null, 40, ["onUpdate:modelValue", "disabled", "onInput"]), [
                                      [vModelText, cost.quantity]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-12" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Unit (Optional)"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => cost.unit = $event,
                                      type: "text",
                                      placeholder: "Unit",
                                      disabled: isOtherCostLocked(cost),
                                      class: "w-full px-3 py-2 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                    }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                                      [vModelText, cost.unit]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-12" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Category"),
                                    createVNode(_sfc_main$1, {
                                      modelValue: cost.category_id,
                                      "onUpdate:modelValue": [($event) => cost.category_id = $event, () => onOtherCostCategoryChange(cost)],
                                      options: operationalCostCategoryOptions.value,
                                      placeholder: "Select category",
                                      "search-fields": ["label", "subLabel"],
                                      "label-field": "label",
                                      "value-field": "value",
                                      "sub-label-field": "subLabel",
                                      disabled: isOtherCostLocked(cost),
                                      "input-class": "w-full px-3 py-2 pr-8 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"])
                                  ]),
                                  createVNode("div", { class: "col-span-12" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Vendor / Recipient"),
                                    createVNode(_sfc_main$1, {
                                      modelValue: cost.vendor_id,
                                      "onUpdate:modelValue": ($event) => cost.vendor_id = $event,
                                      options: vendorSelectOptions.value,
                                      placeholder: "Select vendor",
                                      "search-fields": ["label"],
                                      disabled: isOtherCostLocked(cost),
                                      "input-class": "w-full px-3 py-2 pr-8 border border-orange-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"]),
                                    createVNode("p", { class: "text-xs text-orange-600 mt-1" }, "Select vendor jika sudah tahu akan dibayar ke siapa")
                                  ])
                                ])
                              ]);
                            }), 128)),
                            createVNode("div", { class: "pt-3 border-t border-orange-300" }, [
                              createVNode("div", { class: "flex justify-between items-center" }, [
                                createVNode("span", { class: "text-sm font-medium text-orange-700" }, "Total Other Costs:"),
                                createVNode("span", { class: "text-lg font-bold text-orange-800" }, toDisplayString(formatCurrency(totalOtherCosts.value)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "mt-6 pt-4 border-t border-orange-200" }, [
                              createVNode("button", {
                                type: "button",
                                onClick: addOtherCost,
                                class: "w-full flex flex-col items-center justify-center px-4 py-3 border-2 border-dashed border-orange-200 rounded-lg text-orange-700 transition-colors hover:border-orange-300 hover:bg-orange-50"
                              }, [
                                createVNode(unref(Plus), { class: "w-5 h-5 mb-1" }),
                                createVNode("span", { class: "text-sm font-medium" }, "Add Another Cost")
                              ])
                            ])
                          ])) : (openBlock(), createBlock("div", {
                            key: 2,
                            class: "text-center py-4 text-orange-600"
                          }, [
                            createVNode("p", { class: "text-sm" }, "No other costs yet"),
                            createVNode("p", { class: "text-xs text-orange-500" }, 'Click "Add Cost" to add one')
                          ]))
                        ])
                      ], 512), [
                        [vShow, sections.value.other_costs]
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                      createVNode("div", {
                        onClick: ($event) => toggleSection("reimbursement"),
                        class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                      }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Reimbursement Items"),
                        createVNode(unref(ChevronDown), {
                          class: [{ "rotate-180": !sections.value.reimbursement }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                        }, null, 8, ["class"])
                      ], 8, ["onClick"]),
                      withDirectives(createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "bg-purple-50 rounded-lg p-4" }, [
                          createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                            createVNode("h4", { class: "text-md font-semibold text-purple-800" }, "Reimbursement Items"),
                            createVNode("button", {
                              type: "button",
                              onClick: addReimbursementItem,
                              class: "inline-flex items-center text-sm bg-purple-600 text-white px-3 py-1 rounded transition-colors hover:bg-purple-700"
                            }, [
                              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Add Reimbursement ")
                            ])
                          ]),
                          hasLockedReimbursements.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700"
                          }, [
                            createTextVNode(" Item reimbursement yang sudah "),
                            createVNode("strong", null, "Paid"),
                            createTextVNode(" di AP terkunci dan tidak bisa diubah/dihapus. ")
                          ])) : createCommentVNode("", true),
                          reimbursementItems.value && reimbursementItems.value.length > 0 ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-3"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(reimbursementItems.value, (item, index) => {
                              return openBlock(), createBlock("div", {
                                key: "reimburse-" + index,
                                class: "relative border border-purple-200 rounded-lg p-3 pb-8 bg-white"
                              }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeReimbursementItem(index),
                                  disabled: isReimbursementLocked(item),
                                  class: [
                                    "absolute bottom-2 right-4 px-2 py-1 flex items-center justify-center rounded transition-colors",
                                    isReimbursementLocked(item) ? "opacity-50 cursor-not-allowed text-red-400" : "text-red-600 hover:text-red-800 hover:bg-red-100"
                                  ]
                                }, [
                                  createVNode(unref(Trash2), { class: "w-4 h-4" })
                                ], 10, ["onClick", "disabled"]),
                                createVNode("div", { class: "grid grid-cols-12 gap-3" }, [
                                  createVNode("div", { class: "col-span-12" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Description"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => item.description = $event,
                                      type: "text",
                                      placeholder: "Example: transport, accommodation, etc.",
                                      disabled: isReimbursementLocked(item),
                                      class: "w-full px-3 py-2 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                    }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                                      [vModelText, item.description]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-6" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Qty"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => item.quantity = $event,
                                      type: "number",
                                      min: "0",
                                      step: "0.01",
                                      placeholder: "1",
                                      disabled: isReimbursementLocked(item),
                                      class: "w-full px-3 py-2 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                                      [vModelText, item.quantity]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-6" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Unit"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => item.unit = $event,
                                      type: "text",
                                      placeholder: "Unit",
                                      disabled: isReimbursementLocked(item),
                                      class: "w-full px-3 py-2 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                    }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                                      [vModelText, item.unit]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-12" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Amount"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => item.amount = $event,
                                      type: "number",
                                      min: "0",
                                      step: "0.01",
                                      placeholder: "0",
                                      disabled: isReimbursementLocked(item),
                                      class: "w-full px-3 py-2 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                                      [vModelText, item.amount]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-12" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Category"),
                                    createVNode(_sfc_main$1, {
                                      modelValue: item.category,
                                      "onUpdate:modelValue": ($event) => item.category = $event,
                                      options: reimbursementCategoryOptions.value,
                                      placeholder: "Select category",
                                      "search-fields": ["label", "description"],
                                      "label-field": "label",
                                      "value-field": "value",
                                      disabled: isReimbursementLocked(item) || reimbursementCategoryOptions.value.length === 0,
                                      "input-class": `w-full px-3 py-2 pr-8 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${reimbursementCategoryOptions.value.length === 0 ? "bg-gray-100 pointer-events-none" : ""}`
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled", "input-class"]),
                                    reimbursementCategoryOptions.value.length === 0 ? (openBlock(), createBlock("p", {
                                      key: 0,
                                      class: "text-xs text-purple-600 mt-1"
                                    }, " No categories available. Please add master Operational Cost Categories first. ")) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "col-span-12" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Vendor / Recipient"),
                                    createVNode(_sfc_main$1, {
                                      modelValue: item.vendor_id,
                                      "onUpdate:modelValue": ($event) => item.vendor_id = $event,
                                      options: vendorSelectOptions.value,
                                      placeholder: "Select vendor",
                                      "search-fields": ["label"],
                                      disabled: isReimbursementLocked(item),
                                      "input-class": "w-full px-3 py-2 pr-8 border border-purple-300 rounded-lg text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "disabled"]),
                                    createVNode("p", { class: "text-xs text-purple-600 mt-1" }, "Select vendor jika sudah tahu akan dibayar ke siapa")
                                  ])
                                ]),
                                createVNode("div", { class: "mt-2" }, [
                                  createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Notes (opsional)"),
                                  withDirectives(createVNode("textarea", {
                                    "onUpdate:modelValue": ($event) => item.notes = $event,
                                    rows: "2",
                                    placeholder: "Additional notes for this reimbursement item",
                                    disabled: isReimbursementLocked(item),
                                    class: "w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 resize-none"
                                  }, null, 8, ["onUpdate:modelValue", "disabled"]), [
                                    [vModelText, item.notes]
                                  ])
                                ])
                              ]);
                            }), 128)),
                            createVNode("div", { class: "pt-3 border-t border-purple-300" }, [
                              createVNode("div", { class: "flex justify-between items-center" }, [
                                createVNode("span", { class: "text-sm font-medium text-purple-700" }, "Total Reimbursement:"),
                                createVNode("span", { class: "text-lg font-bold text-purple-800" }, toDisplayString(formatCurrency(totalReimbursement.value)), 1)
                              ])
                            ]),
                            createVNode("div", { class: "mt-6 pt-4 border-t border-purple-200" }, [
                              createVNode("button", {
                                type: "button",
                                onClick: addReimbursementItem,
                                class: "w-full flex flex-col items-center justify-center px-4 py-3 border-2 border-dashed border-purple-200 rounded-lg text-purple-700 transition-colors hover:border-purple-300 hover:bg-purple-50"
                              }, [
                                createVNode(unref(Plus), { class: "w-5 h-5 mb-1" }),
                                createVNode("span", { class: "text-sm font-medium" }, "Add Another Reimbursement")
                              ])
                            ])
                          ])) : (openBlock(), createBlock("div", {
                            key: 2,
                            class: "text-center py-4 text-purple-600"
                          }, [
                            createVNode("p", { class: "text-sm" }, "No reimbursement items yet"),
                            createVNode("p", { class: "text-xs text-purple-500" }, 'Click "Add Reimbursement" to menambahkan')
                          ]))
                        ])
                      ], 512), [
                        [vShow, sections.value.reimbursement]
                      ])
                    ]),
                    createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.sales-orders.index"),
                        class: "inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Cancel ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      }, [
                        unref(form).processing ? (openBlock(), createBlock(unref(Loader2), {
                          key: 0,
                          class: "animate-spin -ml-1 mr-3 h-4 w-4"
                        })) : createCommentVNode("", true),
                        unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Saving...")) : (openBlock(), createBlock("span", { key: 2 }, "Update Shipping Order"))
                      ], 8, ["disabled"])
                    ])
                  ], 32)
                ])
              ]),
              createVNode(AlertDialog, {
                show: alertDialog.value.show,
                type: alertDialog.value.type,
                title: alertDialog.value.title,
                message: alertDialog.value.message,
                "confirm-text": alertDialog.value.confirmText,
                "cancel-text": alertDialog.value.cancelText,
                onConfirm: handleAlertConfirm,
                onCancel: handleAlertCancel,
                onClose: closeAlert
              }, null, 8, ["show", "type", "title", "message", "confirm-text", "cancel-text"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/SalesOrders/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0f01cc04"]]);
export {
  Edit as default
};
