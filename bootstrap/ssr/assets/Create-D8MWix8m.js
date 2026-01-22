import { ref, computed, watch, withCtx, unref, createVNode, createTextVNode, withModifiers, createBlock, createCommentVNode, withDirectives, vModelRadio, openBlock, vModelText, toDisplayString, vShow, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrLooseContain } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminCSLayout } from "./AdminCSLayout-B0zM3kLa.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { _ as _sfc_main$1 } from "./SearchableSelect-DfkOp0gQ.js";
import { Plus, ArrowLeft, ChevronDown, Trash2 } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DplzU1dX.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    customers: Array,
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
    },
    orderNumber: String
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
    const inputMethod = ref("manual");
    const selectedCustomerId = ref("");
    const customerOptions = computed(() => {
      return props.customers.map((customer) => ({
        value: customer.id,
        label: customer.company_name,
        subLabel: customer.pic_name,
        company_name: customer.company_name,
        pic_name: customer.pic_name
      }));
    });
    const shipmentTypeOptions = computed(() => {
      return (props.shipmentTypes ?? []).map((type) => ({
        value: type.code,
        label: type.name || type.code,
        description: type.description || ""
      }));
    });
    const vendorSelectOptions = computed(() => {
      const baseOptions = [
        { value: "", label: "-- Not Set --" },
        { value: "internal", label: "-- Internal (Operations Division) --" }
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
    const operationalCostCategories = computed(() => props.operationalCostCategories ?? []);
    const operationalCostCategorySelectOptions = computed(() => {
      return (operationalCostCategories.value ?? []).map((category) => ({
        value: category.id,
        label: category.name,
        description: category.description || ""
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
    const sections = ref({
      basic: true,
      shipping: false,
      pricing: false,
      goods: false,
      invoice: false,
      vendor: false
    });
    const form = useForm({
      // Required fields based on requirements only
      order_number: props.orderNumber || "",
      ref_no: "",
      so_date: "",
      customer: "",
      shipper: "",
      bl_awb: "",
      liner: "",
      vessel: "",
      eta: "",
      etd: "",
      aju: "",
      sppb_date: "",
      shipment_type: "",
      pol: "",
      pod: "",
      gudang_utc: "",
      party_lcl: "",
      exchange_rate: "",
      vendor_breakdown: [{ id: null, vendor_id: "", nama_vendor: "", no_rekening: "", nama_rekening: "", description: "", quantity: "", unit: "", buying_amount: 0, selling_amount: 0, rcvd_inv: "", remarks: "" }],
      other_costs: [],
      remarks: "",
      note: "",
      commodity: "",
      qty: "",
      package_unit: "BAG",
      net_weight: "",
      gross_weight: "",
      measurement: "",
      container_no: [""],
      invoice_number: "",
      invoice_date: "",
      top: ""
    });
    const toggleSection = (section) => {
      sections.value[section] = !sections.value[section];
    };
    const onCustomerSelect = (selectedCustomer) => {
      if (selectedCustomer) {
        form.customer = selectedCustomer.company_name || "";
        form.bl_awb = "";
        form.pol = "";
        form.pod = "";
        form.eta = "";
      } else {
        if (inputMethod.value === "customer") {
          form.customer = "";
          form.bl_awb = "";
          form.pol = "";
          form.pod = "";
          form.eta = "";
        }
      }
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
    const addContainerNo = () => {
      form.container_no.push("");
    };
    const removeContainerNo = (index) => {
      if (form.container_no.length > 1) {
        form.container_no.splice(index, 1);
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
    const addOtherCost = () => {
      form.other_costs.push({
        description: "",
        amount: 0,
        category: "",
        category_id: "",
        category_name: "",
        quantity: "",
        unit: "",
        vendor_id: ""
        // Vendor/penerima pembayaran
      });
    };
    const removeOtherCost = (index) => {
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
        if (!cost) {
          return;
        }
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
    const reimbursementItems = ref([]);
    const baseOperationalCostCategoryOptions = computed(() => {
      return (props.operationalCostCategories ?? []).map((category) => ({
        value: category.name,
        label: category.name,
        description: category.description || ""
      }));
    });
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
    const addReimbursementItem = () => {
      reimbursementItems.value.push({
        description: "",
        amount: 0,
        category: "",
        notes: "",
        vendor_id: ""
        // Vendor/penerima pembayaran
      });
    };
    const removeReimbursementItem = (index) => {
      if (reimbursementItems.value.length > 0) {
        reimbursementItems.value.splice(index, 1);
      }
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount || 0);
    };
    const getTotalBuyingAmount = (item) => {
      const unitPrice = normalizeNumber(item.buying_amount);
      const qty = parseFloat(item.quantity) || 1;
      return unitPrice * qty;
    };
    const getTotalSellingAmount = (item) => {
      const unitPrice = normalizeNumber(item.selling_amount);
      const qty = parseFloat(item.quantity) || 1;
      return unitPrice * qty;
    };
    const getTotalCostAmount = (cost) => {
      const unitPrice = normalizeNumber(cost.amount);
      const qty = parseFloat(cost.quantity) || 1;
      return unitPrice * qty;
    };
    const onBuyingAmountInput = (item) => {
    };
    const onSellingAmountInput = (item) => {
    };
    const recalculateVendorAmounts = (item) => {
      calculateTotals();
    };
    const recalculateCostAmount = (cost) => {
    };
    const totalBuying = computed(() => {
      return form.vendor_breakdown.reduce((sum, item) => sum + getTotalBuyingAmount(item), 0);
    });
    const totalSelling = computed(() => {
      return form.vendor_breakdown.reduce((sum, item) => sum + getTotalSellingAmount(item), 0);
    });
    const totalRevenue = computed(() => {
      return totalSelling.value - (totalBuying.value + totalOtherCosts.value + totalReimbursement.value);
    });
    const totalOtherCosts = computed(() => {
      return form.other_costs.reduce((sum, item) => sum + getTotalCostAmount(item), 0);
    });
    const totalReimbursement = computed(() => {
      return reimbursementItems.value.reduce((sum, item) => sum + normalizeNumber(item.amount), 0);
    });
    const getProfit = (vendorItem) => {
      const buyingTotal = getTotalBuyingAmount(vendorItem);
      const sellingTotal = getTotalSellingAmount(vendorItem);
      return sellingTotal - buyingTotal;
    };
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
      console.log("Order number from props:", props.orderNumber);
      console.log("Order number in form:", form.order_number);
      console.log("Form data before submit:", form.data());
      const sanitizedOtherCosts = (form.other_costs || []).filter((cost) => {
        const description = (cost.description || "").toString().trim();
        const amount = normalizeNumber(cost.amount);
        const category = (cost.category || cost.category_name || "").toString().trim();
        const vendor = cost.vendor_id !== void 0 && cost.vendor_id !== null ? cost.vendor_id.toString().trim() : "";
        return description !== "" || amount > 0 || category !== "" || vendor !== "";
      }).map((cost) => ({
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
        description: item.description || "",
        amount: normalizeNumber(item.amount),
        category: item.category || "",
        notes: item.notes || "",
        vendor_id: item.vendor_id === "" ? null : item.vendor_id
      }));
      const cleanedVendorBreakdown = form.vendor_breakdown.map((item) => ({
        ...item,
        quantity: item.quantity !== "" ? parseFloat(item.quantity) || item.quantity : "",
        unit: item.unit || "",
        buying_amount: normalizeNumber(item.buying_amount),
        selling_amount: normalizeNumber(item.selling_amount)
      }));
      const formData = {
        ...form.data(),
        vendor_breakdown: cleanedVendorBreakdown,
        other_costs: sanitizedOtherCosts,
        reimbursement_items: sanitizedReimbursements
      };
      console.log("Final form data to submit:", formData);
      form.transform(() => formData).post(route("admin-cs.sales-orders.store"), {
        onSuccess: (page) => {
          var _a;
          console.log("Success response received:", page);
          console.log("Page component:", page.component);
          console.log("Page props:", page.props);
          console.log("Flash messages:", (_a = page.props) == null ? void 0 : _a.flash);
          if (page.component === "Admin/AdminCS/SalesOrders/Index") {
            console.log("Successfully redirected to index page");
            showAlert("success", "Success", "Shipping Order created successfully.");
          } else {
            console.log("Not redirected to index, component:", page.component);
            showAlert("success", "Success", "Shipping Order created successfully.", "OK", "", () => {
              window.location.href = route("admin-cs.sales-orders.index");
            });
          }
        },
        onError: (errors) => {
          console.error("Sales Order Creation Error:", errors);
          if (errors && Object.keys(errors).length > 0) {
            let errorMessages = [];
            Object.keys(errors).forEach((field) => {
              if (Array.isArray(errors[field])) {
                errorMessages.push(...errors[field]);
              } else {
                errorMessages.push(errors[field]);
              }
            });
            const errorMessage = errorMessages.length > 0 ? errorMessages.join(". ") : "There are errors in the form. Please review the entered data.";
            showAlert("error", "Save Failed", errorMessage);
          } else {
            showAlert("error", "Save Failed", "An error occurred while saving the shipping order. Please try again.");
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
            _push2(`<div class="py-6" data-v-aa0966e6${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-aa0966e6${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-aa0966e6${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-aa0966e6${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-aa0966e6${_scopeId}><div class="flex items-center" data-v-aa0966e6${_scopeId}><div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" data-v-aa0966e6${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-aa0966e6${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-aa0966e6${_scopeId}>Create New Shipping Order</h1><p class="mt-1 text-sm text-gray-600" data-v-aa0966e6${_scopeId}>Create a shipping order document for the customer.</p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-aa0966e6${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Back `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Back ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-aa0966e6${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-aa0966e6${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-aa0966e6${_scopeId}>New Shipping Order Form</h3><p class="mt-1 text-sm text-gray-600" data-v-aa0966e6${_scopeId}>Complete the shipping order information accurately.</p></div><div class="p-6" data-v-aa0966e6${_scopeId}><form class="space-y-6" data-v-aa0966e6${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-visible" data-v-aa0966e6${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-aa0966e6${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-aa0966e6${_scopeId}>Select Input Method</h3></div><div class="p-6" data-v-aa0966e6${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" data-v-aa0966e6${_scopeId}><div data-v-aa0966e6${_scopeId}><label class="flex items-center" data-v-aa0966e6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(inputMethod.value, "manual")) ? " checked" : ""} value="manual" class="mr-3 text-sage-600 focus:ring-sage-500" data-v-aa0966e6${_scopeId}><span class="text-sm font-medium text-sage-700" data-v-aa0966e6${_scopeId}>Manual Input</span></label><p class="text-xs text-sage-500 mt-1 ml-6" data-v-aa0966e6${_scopeId}>Fill in all data manually.</p></div><div data-v-aa0966e6${_scopeId}><label class="flex items-center" data-v-aa0966e6${_scopeId}><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(inputMethod.value, "customer")) ? " checked" : ""} value="customer" class="mr-3 text-sage-600 focus:ring-sage-500" data-v-aa0966e6${_scopeId}><span class="text-sm font-medium text-sage-700" data-v-aa0966e6${_scopeId}>Use Customer Data</span></label><p class="text-xs text-sage-500 mt-1 ml-6" data-v-aa0966e6${_scopeId}>Auto-fill from customer data.</p></div></div>`);
            if (inputMethod.value === "customer") {
              _push2(`<div class="mt-4" data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>Select Customer</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: selectedCustomerId.value,
                "onUpdate:modelValue": ($event) => selectedCustomerId.value = $event,
                options: customerOptions.value,
                placeholder: "Search customers... (example: CI)",
                "label-field": "label",
                "sub-label-field": "subLabel",
                "value-field": "value",
                "search-fields": ["label", "subLabel", "company_name", "pic_name"],
                "input-class": "w-full px-3 py-2 pr-10 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                onSelect: onCustomerSelect
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-aa0966e6${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-aa0966e6${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-aa0966e6${_scopeId}>Basic Information</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.basic ? null : { display: "none" })}" class="p-6 space-y-4" data-v-aa0966e6${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-aa0966e6${_scopeId}><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>ORDER NUMB <span class="text-red-500" data-v-aa0966e6${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).order_number)} type="text" required readonly placeholder="EWILOG2509001001" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.order_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.order_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>REF NO</label><input${ssrRenderAttr("value", unref(form).ref_no)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.ref_no) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.ref_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>DATE</label><input${ssrRenderAttr("value", unref(form).so_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.so_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.so_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>CUSTOMER <span class="text-red-500" data-v-aa0966e6${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).customer)} type="text" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.customer) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.customer)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>SHIPPER</label><input${ssrRenderAttr("value", unref(form).shipper)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.shipper) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.shipper)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-aa0966e6${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-aa0966e6${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-aa0966e6${_scopeId}>Shipping Information</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.shipping ? null : { display: "none" })}" class="p-6 space-y-4" data-v-aa0966e6${_scopeId}><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>BL/AWB</label><input${ssrRenderAttr("value", unref(form).bl_awb)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.bl_awb) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.bl_awb)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>LINER</label><input${ssrRenderAttr("value", unref(form).liner)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.liner) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.liner)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>VESSEL</label><input${ssrRenderAttr("value", unref(form).vessel)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.vessel) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.vessel)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-aa0966e6${_scopeId}><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>ETA</label><input${ssrRenderAttr("value", unref(form).eta)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.eta) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.eta)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>ETD</label><input${ssrRenderAttr("value", unref(form).etd)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.etd) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.etd)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>AJU</label><input${ssrRenderAttr("value", unref(form).aju)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.aju) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.aju)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>SPPB DATE</label><input${ssrRenderAttr("value", unref(form).sppb_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.sppb_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.sppb_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>SHIPMENT TYPE</label>`);
            _push2(ssrRenderComponent(_sfc_main$1, {
              modelValue: unref(form).shipment_type,
              "onUpdate:modelValue": ($event) => unref(form).shipment_type = $event,
              options: shipmentTypeOptions.value,
              placeholder: "Select Shipment Type",
              "label-field": "label",
              "value-field": "value",
              "sub-label-field": "description",
              "search-fields": ["label", "description"],
              "input-class": "w-full px-3 py-2 pr-10 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
            }, null, _parent2, _scopeId));
            if (unref(form).errors.shipment_type) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.shipment_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>POL</label><input${ssrRenderAttr("value", unref(form).pol)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.pol) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.pol)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>POD</label><input${ssrRenderAttr("value", unref(form).pod)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.pod) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.pod)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>WAREHOUSE/UTC</label><input${ssrRenderAttr("value", unref(form).gudang_utc)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.gudang_utc) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.gudang_utc)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>PARTY/LCL</label><input${ssrRenderAttr("value", unref(form).party_lcl)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.party_lcl) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.party_lcl)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>EXCHANGE RATE</label><input${ssrRenderAttr("value", unref(form).exchange_rate)} type="number" step="0.0001" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.exchange_rate) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.exchange_rate)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-aa0966e6${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-aa0966e6${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-aa0966e6${_scopeId}>Pricing Information</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.pricing ? null : { display: "none" })}" class="p-6 space-y-6" data-v-aa0966e6${_scopeId}><div class="bg-gray-50 rounded-lg p-4" data-v-aa0966e6${_scopeId}><div class="flex justify-between items-center mb-4" data-v-aa0966e6${_scopeId}><h4 class="text-md font-semibold text-sage-800" data-v-aa0966e6${_scopeId}>Vendor Breakdown (Buying &amp; Selling)</h4><button type="button" class="text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors" data-v-aa0966e6${_scopeId}> + Add Vendor </button></div><!--[-->`);
            ssrRenderList(unref(form).vendor_breakdown, (item, index) => {
              _push2(`<div class="border border-sage-200 rounded-lg p-4 mb-4 space-y-4" data-v-aa0966e6${_scopeId}><div data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-aa0966e6${_scopeId}>Vendor Name</label>`);
              _push2(ssrRenderComponent(_sfc_main$1, {
                modelValue: item.vendor_id,
                "onUpdate:modelValue": [($event) => item.vendor_id = $event, () => onVendorSelect(index)],
                options: vendorSelectOptions.value,
                placeholder: "Select vendor...",
                "search-fields": ["label"],
                "input-class": "w-full px-3 py-2 pr-8 border border-sage-300 rounded text-sm focus:ring-1 focus:ring-sage-500 focus:border-sage-500"
              }, null, _parent2, _scopeId));
              _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-aa0966e6${_scopeId}>Service Description / Cost Type</label>`);
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
              _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-aa0966e6${_scopeId}>Qty (Optional)</label><input${ssrRenderAttr("value", item.quantity)} type="number" step="0.01" min="0" placeholder="Quantity" class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}></div><div data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-aa0966e6${_scopeId}>Unit (Optional)</label><input${ssrRenderAttr("value", item.unit)} type="text" placeholder="Unit" class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}></div><div data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-aa0966e6${_scopeId}>RCVD INV</label><input${ssrRenderAttr("value", item.rcvd_inv)} type="text" placeholder="Nomor invoice yang diterima" class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}></div><div data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-aa0966e6${_scopeId}>Remarks (Individual)</label><input${ssrRenderAttr("value", item.remarks)} type="text" placeholder="Notes for this item" class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}></div><div class="grid grid-cols-1 gap-3 p-3 bg-blue-50 rounded-lg" data-v-aa0966e6${_scopeId}><div data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-blue-700 mb-1" data-v-aa0966e6${_scopeId}>Buying Amount (Unit Price)</label><input${ssrRenderAttr("value", item.buying_amount)} type="text" placeholder="0 (example: 25,000 or 25000)" class="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" data-v-aa0966e6${_scopeId}>`);
              if (item.quantity && parseFloat(item.quantity) > 0) {
                _push2(`<p class="text-xs text-blue-600 mt-1" data-v-aa0966e6${_scopeId}> Total: ${ssrInterpolate(formatCurrency(getTotalBuyingAmount(item)))} (${ssrInterpolate(item.quantity)} × ${ssrInterpolate(formatCurrency(normalizeNumber(item.buying_amount)))}) </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-green-700 mb-1" data-v-aa0966e6${_scopeId}>Selling Amount (Unit Price)</label><input${ssrRenderAttr("value", item.selling_amount)} type="text" placeholder="0 (example: 30,000 or 30000)" class="w-full px-3 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500" data-v-aa0966e6${_scopeId}>`);
              if (item.quantity && parseFloat(item.quantity) > 0) {
                _push2(`<p class="text-xs text-green-600 mt-1" data-v-aa0966e6${_scopeId}> Total: ${ssrInterpolate(formatCurrency(getTotalSellingAmount(item)))} (${ssrInterpolate(item.quantity)} × ${ssrInterpolate(formatCurrency(normalizeNumber(item.selling_amount)))}) </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-aa0966e6${_scopeId}>Revenue</label><p class="${ssrRenderClass([getProfit(item) >= 0 ? "text-green-600" : "text-red-600", "px-3 py-2 bg-white border border-purple-300 rounded text-sm font-semibold"])}" data-v-aa0966e6${_scopeId}>${ssrInterpolate(formatCurrency(getProfit(item)))}</p></div></div>`);
              if (item.vendor_id) {
                _push2(`<div class="grid grid-cols-1 gap-3 p-3 bg-sage-50 rounded-lg" data-v-aa0966e6${_scopeId}><div data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-aa0966e6${_scopeId}>Vendor Name</label><p class="text-sm text-gray-900" data-v-aa0966e6${_scopeId}>${ssrInterpolate(item.nama_vendor || "-")}</p></div><div data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-aa0966e6${_scopeId}>Account Number</label><p class="text-sm text-gray-900 font-mono" data-v-aa0966e6${_scopeId}>${ssrInterpolate(item.no_rekening || "-")}</p></div><div data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-aa0966e6${_scopeId}>Account Name</label><p class="text-sm text-gray-900" data-v-aa0966e6${_scopeId}>${ssrInterpolate(item.nama_rekening || "-")}</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-end" data-v-aa0966e6${_scopeId}><button type="button"${ssrIncludeBooleanAttr(unref(form).vendor_breakdown.length <= 1) ? " disabled" : ""} class="inline-flex items-center px-3 py-1 text-red-600 hover:text-red-900 hover:bg-red-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed" data-v-aa0966e6${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
              _push2(` Remove Vendor </button></div></div>`);
            });
            _push2(`<!--]--><div class="mt-4 pt-4 border-t border-gray-300 grid grid-cols-3 gap-4 text-center" data-v-aa0966e6${_scopeId}><div class="p-3 bg-blue-100 rounded-lg" data-v-aa0966e6${_scopeId}><p class="text-xs font-medium text-blue-700" data-v-aa0966e6${_scopeId}>Total Buying</p><p class="text-lg font-bold text-blue-800" data-v-aa0966e6${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</p></div><div class="p-3 bg-green-100 rounded-lg" data-v-aa0966e6${_scopeId}><p class="text-xs font-medium text-green-700" data-v-aa0966e6${_scopeId}>Total Selling</p><p class="text-lg font-bold text-green-800" data-v-aa0966e6${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</p></div><div class="${ssrRenderClass([totalRevenue.value >= 0 ? "bg-purple-100" : "bg-red-100", "p-3 rounded-lg"])}" data-v-aa0966e6${_scopeId}><p class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-purple-700" : "text-red-700", "text-xs font-medium"])}" data-v-aa0966e6${_scopeId}>Net Profit</p><p class="text-xs text-gray-500 mb-1" data-v-aa0966e6${_scopeId}>(All costs already deducted)</p><p class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-purple-800" : "text-red-800", "text-lg font-bold"])}" data-v-aa0966e6${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</p></div></div>`);
            if (unref(form).vendor_breakdown.length > 0) {
              _push2(`<div class="flex justify-center mt-6 pt-4 border-t border-gray-200" data-v-aa0966e6${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-aa0966e6${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Add Another Vendor </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-blue-50 rounded-lg p-4" data-v-aa0966e6${_scopeId}><h4 class="text-md font-semibold text-blue-800 mb-3" data-v-aa0966e6${_scopeId}>Revenue &amp; Profit Summary </h4><div class="space-y-2" data-v-aa0966e6${_scopeId}><div class="flex justify-between" data-v-aa0966e6${_scopeId}><span data-v-aa0966e6${_scopeId}>Total Revenue (Selling):</span><span class="font-medium text-green-700" data-v-aa0966e6${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</span></div><div class="flex justify-between" data-v-aa0966e6${_scopeId}><span data-v-aa0966e6${_scopeId}>Total Cost (Buying):</span><span class="font-medium text-red-700" data-v-aa0966e6${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</span></div><div class="flex justify-between" data-v-aa0966e6${_scopeId}><span data-v-aa0966e6${_scopeId}>Operational Costs:</span><span class="font-medium text-orange-700" data-v-aa0966e6${_scopeId}>${ssrInterpolate(formatCurrency(totalOtherCosts.value))}</span></div><div class="flex justify-between" data-v-aa0966e6${_scopeId}><span data-v-aa0966e6${_scopeId}>Total Reimbursement:</span><span class="font-medium text-purple-700" data-v-aa0966e6${_scopeId}>${ssrInterpolate(formatCurrency(totalReimbursement.value))}</span></div><div class="flex justify-between border-t border-blue-200 pt-2 mt-1" data-v-aa0966e6${_scopeId}><span class="text-sm font-medium text-gray-700" data-v-aa0966e6${_scopeId}>Total Overall Costs:</span><span class="text-sm font-bold text-red-800" data-v-aa0966e6${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value + totalOtherCosts.value + totalReimbursement.value))}</span></div><div class="flex justify-between items-center pt-2 border-t border-blue-300 font-bold text-lg" data-v-aa0966e6${_scopeId}><span data-v-aa0966e6${_scopeId}>Net Profit:</span><span class="${ssrRenderClass(totalRevenue.value >= 0 ? "text-green-600" : "text-red-600")}" data-v-aa0966e6${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</span></div></div></div><div class="bg-orange-50 rounded-lg p-4" data-v-aa0966e6${_scopeId}><div class="flex justify-between items-center mb-4" data-v-aa0966e6${_scopeId}><h4 class="text-md font-semibold text-orange-800" data-v-aa0966e6${_scopeId}>Other Operating Costs</h4><button type="button" class="text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition-colors" data-v-aa0966e6${_scopeId}> + Add Cost </button></div>`);
            if (unref(form).other_costs && unref(form).other_costs.length > 0) {
              _push2(`<div class="space-y-3" data-v-aa0966e6${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).other_costs, (cost, index) => {
                _push2(`<div class="border border-orange-200 rounded-lg p-3 bg-white" data-v-aa0966e6${_scopeId}><div class="grid grid-cols-12 gap-3" data-v-aa0966e6${_scopeId}><div class="col-span-4" data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-aa0966e6${_scopeId}>Cost Description</label><input${ssrRenderAttr("value", cost.description)} type="text" placeholder="Example: Handling, documents, etc." class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" data-v-aa0966e6${_scopeId}></div><div class="col-span-2" data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-aa0966e6${_scopeId}>Cost Amount (Unit Price)</label><input${ssrRenderAttr("value", cost.amount)} type="text" placeholder="0 (example: 2,500 or 2500)" class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" data-v-aa0966e6${_scopeId}>`);
                if (cost.quantity && parseFloat(cost.quantity) > 0) {
                  _push2(`<p class="text-xs text-orange-600 mt-1" data-v-aa0966e6${_scopeId}> Total: ${ssrInterpolate(formatCurrency(getTotalCostAmount(cost)))}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="col-span-12" data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-aa0966e6${_scopeId}>Qty (Optional)</label><input${ssrRenderAttr("value", cost.quantity)} type="number" min="0" step="0.01" placeholder="Quantity" class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" data-v-aa0966e6${_scopeId}></div><div class="col-span-12" data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-aa0966e6${_scopeId}>Unit (Optional)</label><input${ssrRenderAttr("value", cost.unit)} type="text" placeholder="Unit" class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" data-v-aa0966e6${_scopeId}></div><div class="col-span-2" data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-aa0966e6${_scopeId}>Category</label>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  modelValue: cost.category_id,
                  "onUpdate:modelValue": ($event) => cost.category_id = $event,
                  options: operationalCostCategorySelectOptions.value,
                  placeholder: "Select category",
                  "label-field": "label",
                  "value-field": "value",
                  "sub-label-field": "description",
                  "search-fields": ["label", "description"],
                  "input-class": `w-full px-2 py-1 pr-8 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${operationalCostCategorySelectOptions.value.length === 0 ? "bg-gray-100 pointer-events-none" : ""}`,
                  onSelect: () => onOtherCostCategoryChange(cost)
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="col-span-3" data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-aa0966e6${_scopeId}>Vendor / Payee</label>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  modelValue: cost.vendor_id,
                  "onUpdate:modelValue": ($event) => cost.vendor_id = $event,
                  options: vendorSelectOptions.value,
                  placeholder: "Select vendor",
                  "search-fields": ["label"],
                  "input-class": "w-full px-2 py-1 pr-8 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                }, null, _parent2, _scopeId));
                _push2(`<p class="text-xs text-orange-600 mt-1" data-v-aa0966e6${_scopeId}>Select a vendor if you already know the payee.</p></div><div class="col-span-1 flex items-end" data-v-aa0966e6${_scopeId}><button type="button" class="w-full px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"${ssrIncludeBooleanAttr(unref(form).other_costs.length <= 1) ? " disabled" : ""} data-v-aa0966e6${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mx-auto" }, null, _parent2, _scopeId));
                _push2(`</button></div></div></div>`);
              });
              _push2(`<!--]--><div class="pt-3 border-t border-orange-300" data-v-aa0966e6${_scopeId}><div class="flex justify-between items-center" data-v-aa0966e6${_scopeId}><span class="text-sm font-medium text-orange-700" data-v-aa0966e6${_scopeId}>Total Other Costs:</span><span class="text-lg font-bold text-orange-800" data-v-aa0966e6${_scopeId}>${ssrInterpolate(formatCurrency(totalOtherCosts.value))}</span></div></div><div class="flex justify-center mt-6 pt-4 border-t border-orange-200" data-v-aa0966e6${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors" data-v-aa0966e6${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Add Another Cost </button></div></div>`);
            } else {
              _push2(`<div class="text-center py-4 text-orange-600" data-v-aa0966e6${_scopeId}><p class="text-sm" data-v-aa0966e6${_scopeId}>No other costs yet</p><p class="text-xs text-orange-500" data-v-aa0966e6${_scopeId}>Click &quot;Add Cost&quot; to add items.</p></div>`);
            }
            _push2(`</div><div class="bg-purple-50 rounded-lg p-4" data-v-aa0966e6${_scopeId}><div class="flex justify-between items-center mb-4" data-v-aa0966e6${_scopeId}><h4 class="text-md font-semibold text-purple-800" data-v-aa0966e6${_scopeId}>Items Reimbursement</h4><button type="button" class="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors" data-v-aa0966e6${_scopeId}> + Add Reimbursement </button></div>`);
            if (reimbursementItems.value && reimbursementItems.value.length > 0) {
              _push2(`<div class="space-y-3" data-v-aa0966e6${_scopeId}><!--[-->`);
              ssrRenderList(reimbursementItems.value, (item, index) => {
                _push2(`<div class="border border-purple-200 rounded-lg p-3 bg-white" data-v-aa0966e6${_scopeId}><div class="grid grid-cols-12 gap-3 mb-2" data-v-aa0966e6${_scopeId}><div class="col-span-4" data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-aa0966e6${_scopeId}>Description</label><input${ssrRenderAttr("value", item.description)} type="text" placeholder="Example: Transport to port" class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" data-v-aa0966e6${_scopeId}></div><div class="col-span-2" data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-aa0966e6${_scopeId}>Amount</label><input${ssrRenderAttr("value", item.amount)} type="number" step="0.01" placeholder="0.00" class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" data-v-aa0966e6${_scopeId}></div><div class="col-span-2" data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-aa0966e6${_scopeId}>Category</label>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  modelValue: item.category,
                  "onUpdate:modelValue": ($event) => item.category = $event,
                  options: reimbursementCategoryOptions.value,
                  placeholder: "Select category",
                  "label-field": "label",
                  "value-field": "value",
                  "sub-label-field": "description",
                  "search-fields": ["label", "description"],
                  "input-class": `w-full px-2 py-1 pr-8 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${reimbursementCategoryOptions.value.length === 0 ? "bg-gray-100 pointer-events-none" : ""}`
                }, null, _parent2, _scopeId));
                if (reimbursementCategoryOptions.value.length === 0) {
                  _push2(`<p class="text-xs text-purple-600 mt-1" data-v-aa0966e6${_scopeId}> No categories available. Please add Operational Cost Categories first. </p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="col-span-3" data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-aa0966e6${_scopeId}>Vendor / Payee</label>`);
                _push2(ssrRenderComponent(_sfc_main$1, {
                  modelValue: item.vendor_id,
                  "onUpdate:modelValue": ($event) => item.vendor_id = $event,
                  options: vendorSelectOptions.value,
                  placeholder: "Select vendor",
                  "search-fields": ["label"],
                  "input-class": "w-full px-2 py-1 pr-8 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                }, null, _parent2, _scopeId));
                _push2(`<p class="text-xs text-purple-600 mt-1" data-v-aa0966e6${_scopeId}>Select a vendor if you already know the payee.</p></div><div class="col-span-1 flex items-end" data-v-aa0966e6${_scopeId}><button type="button" class="w-full px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors" data-v-aa0966e6${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mx-auto" }, null, _parent2, _scopeId));
                _push2(`</button></div></div><div class="grid grid-cols-12 gap-3" data-v-aa0966e6${_scopeId}><div class="col-span-11" data-v-aa0966e6${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-aa0966e6${_scopeId}>Notes</label><input${ssrRenderAttr("value", item.notes)} type="text" placeholder="Additional notes (optional)" class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" data-v-aa0966e6${_scopeId}></div></div></div>`);
              });
              _push2(`<!--]--><div class="pt-3 border-t border-purple-300" data-v-aa0966e6${_scopeId}><div class="flex justify-between items-center" data-v-aa0966e6${_scopeId}><span class="text-sm font-medium text-purple-700" data-v-aa0966e6${_scopeId}>Total Reimbursement:</span><span class="text-lg font-bold text-purple-800" data-v-aa0966e6${_scopeId}>${ssrInterpolate(formatCurrency(totalReimbursement.value))}</span></div></div><div class="flex justify-center mt-6 pt-4 border-t border-purple-200" data-v-aa0966e6${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors" data-v-aa0966e6${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Add Another Reimbursement </button></div></div>`);
            } else {
              _push2(`<div class="text-center py-4 text-purple-600" data-v-aa0966e6${_scopeId}><p class="text-sm" data-v-aa0966e6${_scopeId}>No reimbursement items yet</p><p class="text-xs text-purple-500" data-v-aa0966e6${_scopeId}>Click &quot;Add Reimbursement&quot; to add items. </p></div>`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>REMARKS</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea>`);
            if (unref(form).errors.remarks) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.remarks)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>NOTE</label><textarea rows="3" placeholder="Additional notes for this shipping order" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).note)}</textarea>`);
            if (unref(form).errors.note) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.note)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-aa0966e6${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-aa0966e6${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-aa0966e6${_scopeId}>Goods Information</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.goods ? null : { display: "none" })}" class="p-6 space-y-4" data-v-aa0966e6${_scopeId}><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>COMMODITY / GOODS DESCRIPTION</label><textarea rows="3" placeholder="Enter detailed goods/commodity description" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).commodity)}</textarea>`);
            if (unref(form).errors.commodity) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.commodity)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-aa0966e6${_scopeId}><div class="grid grid-cols-2 gap-3" data-v-aa0966e6${_scopeId}><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>QTY</label><input${ssrRenderAttr("value", unref(form).qty)} type="number" min="0" placeholder="Enter quantity" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.qty) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.qty)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>Package Unit</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}><option value="" data-v-aa0966e6${ssrIncludeBooleanAttr(Array.isArray(unref(form).package_unit) ? ssrLooseContain(unref(form).package_unit, "") : ssrLooseEqual(unref(form).package_unit, "")) ? " selected" : ""}${_scopeId}>Select Unit</option><!--[-->`);
            ssrRenderList(__props.packageUnits, (unit) => {
              _push2(`<option${ssrRenderAttr("value", unit.code)} data-v-aa0966e6${ssrIncludeBooleanAttr(Array.isArray(unref(form).package_unit) ? ssrLooseContain(unref(form).package_unit, unit.code) : ssrLooseEqual(unref(form).package_unit, unit.code)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(unit.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(form).errors.package_unit) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.package_unit)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>NET WEIGHT (KG)</label><input${ssrRenderAttr("value", unref(form).net_weight)} type="number" step="0.01" min="0" placeholder="Enter net weight in kg" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.net_weight) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.net_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>GROSS WEIGHT (KG)</label><input${ssrRenderAttr("value", unref(form).gross_weight)} type="number" step="0.01" min="0" placeholder="Enter gross weight in kg" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.gross_weight) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.gross_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>MEAS (M3)</label><input${ssrRenderAttr("value", unref(form).measurement)} type="number" step="0.001" min="0" placeholder="Enter volume in m3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.measurement) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.measurement)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-aa0966e6${_scopeId}><div class="flex justify-between items-center mb-2" data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-aa0966e6${_scopeId}>CONTAINER NO</label><button type="button" class="text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors" data-v-aa0966e6${_scopeId}> + Add Container </button></div><!--[-->`);
            ssrRenderList(unref(form).container_no, (container, index) => {
              _push2(`<div class="flex gap-2 mb-2" data-v-aa0966e6${_scopeId}><input${ssrRenderAttr("value", unref(form).container_no[index])} type="text" placeholder="Enter container number (example: TCLU1234567)" class="flex-1 px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
              if (unref(form).container_no.length > 1) {
                _push2(`<button type="button" class="px-3 py-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors" data-v-aa0966e6${_scopeId}> × </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (unref(form).errors.container_no) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.container_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).container_no.length > 0) {
              _push2(`<div class="flex justify-center mt-4 pt-4 border-t border-sage-200" data-v-aa0966e6${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-aa0966e6${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Add Another Container </button></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-aa0966e6${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-aa0966e6${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-aa0966e6${_scopeId}>Invoice Information</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.invoice }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.invoice ? null : { display: "none" })}" class="p-6 space-y-4" data-v-aa0966e6${_scopeId}><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>INVOICE NUMB</label><input${ssrRenderAttr("value", unref(form).invoice_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.invoice_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>INVOICE DATE</label><input${ssrRenderAttr("value", unref(form).invoice_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.invoice_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-aa0966e6${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-aa0966e6${_scopeId}>T.O.P</label><input${ssrRenderAttr("value", unref(form).top)} type="text" placeholder="e.g., NET 30" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).errors.top) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-aa0966e6${_scopeId}>${ssrInterpolate(unref(form).errors.top)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" data-v-aa0966e6${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-800 text-white rounded-lg hover:bg-sage-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-aa0966e6${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-aa0966e6${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-aa0966e6${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-aa0966e6${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-aa0966e6${_scopeId}>Saving...</span>`);
            } else {
              _push2(`<span data-v-aa0966e6${_scopeId}>Simpan shipping order</span>`);
            }
            _push2(`</button></div></form></div></div></div></div>`);
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
                            createVNode(unref(Plus), { class: "w-6 h-6 text-white" })
                          ]),
                          createVNode("div", null, [
                            createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, "Create New Shipping Order"),
                            createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Create a shipping order document for the customer.")
                          ])
                        ]),
                        createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-cs.sales-orders.index"),
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Back ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "New Shipping Order Form"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Complete the shipping order information accurately.")
                    ]),
                    createVNode("div", { class: "p-6" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"]),
                        class: "space-y-6"
                      }, [
                        createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-visible" }, [
                          createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                            createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Select Input Method")
                          ]),
                          createVNode("div", { class: "p-6" }, [
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6 mb-6" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "flex items-center" }, [
                                  withDirectives(createVNode("input", {
                                    type: "radio",
                                    "onUpdate:modelValue": ($event) => inputMethod.value = $event,
                                    value: "manual",
                                    class: "mr-3 text-sage-600 focus:ring-sage-500"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelRadio, inputMethod.value]
                                  ]),
                                  createVNode("span", { class: "text-sm font-medium text-sage-700" }, "Manual Input")
                                ]),
                                createVNode("p", { class: "text-xs text-sage-500 mt-1 ml-6" }, "Fill in all data manually.")
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "flex items-center" }, [
                                  withDirectives(createVNode("input", {
                                    type: "radio",
                                    "onUpdate:modelValue": ($event) => inputMethod.value = $event,
                                    value: "customer",
                                    class: "mr-3 text-sage-600 focus:ring-sage-500"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelRadio, inputMethod.value]
                                  ]),
                                  createVNode("span", { class: "text-sm font-medium text-sage-700" }, "Use Customer Data")
                                ]),
                                createVNode("p", { class: "text-xs text-sage-500 mt-1 ml-6" }, "Auto-fill from customer data.")
                              ])
                            ]),
                            inputMethod.value === "customer" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-4"
                            }, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Select Customer"),
                              createVNode(_sfc_main$1, {
                                modelValue: selectedCustomerId.value,
                                "onUpdate:modelValue": ($event) => selectedCustomerId.value = $event,
                                options: customerOptions.value,
                                placeholder: "Search customers... (example: CI)",
                                "label-field": "label",
                                "sub-label-field": "subLabel",
                                "value-field": "value",
                                "search-fields": ["label", "subLabel", "company_name", "pic_name"],
                                "input-class": "w-full px-3 py-2 pr-10 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                                onSelect: onCustomerSelect
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "options"])
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
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
                                "label-field": "label",
                                "value-field": "value",
                                "sub-label-field": "description",
                                "search-fields": ["label", "description"],
                                "input-class": "w-full px-3 py-2 pr-10 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
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
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "WAREHOUSE/UTC"),
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
                                createVNode("h4", { class: "text-md font-semibold text-sage-800" }, "Vendor Breakdown (Buying & Selling)"),
                                createVNode("button", {
                                  type: "button",
                                  onClick: addVendorItem,
                                  class: "text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors"
                                }, " + Add Vendor ")
                              ]),
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
                                      placeholder: "Quantity",
                                      onInput: () => recalculateVendorAmounts(),
                                      onBlur: calculateTotals,
                                      class: "w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                    }, null, 40, ["onUpdate:modelValue", "onInput"]), [
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
                                      placeholder: "Nomor invoice yang diterima",
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
                                      placeholder: "Notes for this item",
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
                                        placeholder: "0 (example: 25,000 or 25000)",
                                        onInput: ($event) => onBuyingAmountInput(),
                                        onBlur: () => {
                                          recalculateVendorAmounts();
                                          calculateTotals();
                                        },
                                        class: "w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      }, null, 40, ["onUpdate:modelValue", "onInput", "onBlur"]), [
                                        [vModelText, item.buying_amount]
                                      ]),
                                      item.quantity && parseFloat(item.quantity) > 0 ? (openBlock(), createBlock("p", {
                                        key: 0,
                                        class: "text-xs text-blue-600 mt-1"
                                      }, " Total: " + toDisplayString(formatCurrency(getTotalBuyingAmount(item))) + " (" + toDisplayString(item.quantity) + " × " + toDisplayString(formatCurrency(normalizeNumber(item.buying_amount))) + ") ", 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-xs font-medium text-green-700 mb-1" }, "Selling Amount (Unit Price)"),
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => item.selling_amount = $event,
                                        type: "text",
                                        placeholder: "0 (example: 30,000 or 30000)",
                                        onInput: ($event) => onSellingAmountInput(),
                                        onBlur: () => {
                                          recalculateVendorAmounts();
                                          calculateTotals();
                                        },
                                        class: "w-full px-3 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                      }, null, 40, ["onUpdate:modelValue", "onInput", "onBlur"]), [
                                        [vModelText, item.selling_amount]
                                      ]),
                                      item.quantity && parseFloat(item.quantity) > 0 ? (openBlock(), createBlock("p", {
                                        key: 0,
                                        class: "text-xs text-green-600 mt-1"
                                      }, " Total: " + toDisplayString(formatCurrency(getTotalSellingAmount(item))) + " (" + toDisplayString(item.quantity) + " × " + toDisplayString(formatCurrency(normalizeNumber(item.selling_amount))) + ") ", 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Revenue"),
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
                                      createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Vendor Name"),
                                      createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(item.nama_vendor || "-"), 1)
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Account Number"),
                                      createVNode("p", { class: "text-sm text-gray-900 font-mono" }, toDisplayString(item.no_rekening || "-"), 1)
                                    ]),
                                    createVNode("div", null, [
                                      createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Account Name"),
                                      createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(item.nama_rekening || "-"), 1)
                                    ])
                                  ])) : createCommentVNode("", true),
                                  createVNode("div", { class: "flex justify-end" }, [
                                    createVNode("button", {
                                      type: "button",
                                      onClick: ($event) => removeVendorItem(index),
                                      disabled: unref(form).vendor_breakdown.length <= 1,
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
                                  }, "Net Profit", 2),
                                  createVNode("p", { class: "text-xs text-gray-500 mb-1" }, "(All costs already deducted)"),
                                  createVNode("p", {
                                    class: ["text-lg font-bold", totalRevenue.value >= 0 ? "text-purple-800" : "text-red-800"]
                                  }, toDisplayString(formatCurrency(totalRevenue.value)), 3)
                                ], 2)
                              ]),
                              unref(form).vendor_breakdown.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "flex justify-center mt-6 pt-4 border-t border-gray-200"
                              }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: addVendorItem,
                                  class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                                }, [
                                  createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                  createTextVNode(" Add Another Vendor ")
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "bg-blue-50 rounded-lg p-4" }, [
                              createVNode("h4", { class: "text-md font-semibold text-blue-800 mb-3" }, "Revenue & Profit Summary "),
                              createVNode("div", { class: "space-y-2" }, [
                                createVNode("div", { class: "flex justify-between" }, [
                                  createVNode("span", null, "Total Revenue (Selling):"),
                                  createVNode("span", { class: "font-medium text-green-700" }, toDisplayString(formatCurrency(totalSelling.value)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between" }, [
                                  createVNode("span", null, "Total Cost (Buying):"),
                                  createVNode("span", { class: "font-medium text-red-700" }, toDisplayString(formatCurrency(totalBuying.value)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between" }, [
                                  createVNode("span", null, "Operational Costs:"),
                                  createVNode("span", { class: "font-medium text-orange-700" }, toDisplayString(formatCurrency(totalOtherCosts.value)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between" }, [
                                  createVNode("span", null, "Total Reimbursement:"),
                                  createVNode("span", { class: "font-medium text-purple-700" }, toDisplayString(formatCurrency(totalReimbursement.value)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between border-t border-blue-200 pt-2 mt-1" }, [
                                  createVNode("span", { class: "text-sm font-medium text-gray-700" }, "Total Overall Costs:"),
                                  createVNode("span", { class: "text-sm font-bold text-red-800" }, toDisplayString(formatCurrency(totalBuying.value + totalOtherCosts.value + totalReimbursement.value)), 1)
                                ]),
                                createVNode("div", { class: "flex justify-between items-center pt-2 border-t border-blue-300 font-bold text-lg" }, [
                                  createVNode("span", null, "Net Profit:"),
                                  createVNode("span", {
                                    class: totalRevenue.value >= 0 ? "text-green-600" : "text-red-600"
                                  }, toDisplayString(formatCurrency(totalRevenue.value)), 3)
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "bg-orange-50 rounded-lg p-4" }, [
                              createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                                createVNode("h4", { class: "text-md font-semibold text-orange-800" }, "Other Operating Costs"),
                                createVNode("button", {
                                  type: "button",
                                  onClick: addOtherCost,
                                  class: "text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition-colors"
                                }, " + Add Cost ")
                              ]),
                              unref(form).other_costs && unref(form).other_costs.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "space-y-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(form).other_costs, (cost, index) => {
                                  return openBlock(), createBlock("div", {
                                    key: index,
                                    class: "border border-orange-200 rounded-lg p-3 bg-white"
                                  }, [
                                    createVNode("div", { class: "grid grid-cols-12 gap-3" }, [
                                      createVNode("div", { class: "col-span-4" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Cost Description"),
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => cost.description = $event,
                                          type: "text",
                                          placeholder: "Example: Handling, documents, etc.",
                                          class: "w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, cost.description]
                                        ])
                                      ]),
                                      createVNode("div", { class: "col-span-2" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Cost Amount (Unit Price)"),
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => cost.amount = $event,
                                          type: "text",
                                          placeholder: "0 (example: 2,500 or 2500)",
                                          onInput: (e) => {
                                            formatCostAmount(cost, e);
                                          },
                                          onBlur: () => recalculateCostAmount(),
                                          class: "w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                        }, null, 40, ["onUpdate:modelValue", "onInput", "onBlur"]), [
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
                                          onInput: () => recalculateCostAmount(),
                                          class: "w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                        }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                          [vModelText, cost.quantity]
                                        ])
                                      ]),
                                      createVNode("div", { class: "col-span-12" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Unit (Optional)"),
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => cost.unit = $event,
                                          type: "text",
                                          placeholder: "Unit",
                                          class: "w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, cost.unit]
                                        ])
                                      ]),
                                      createVNode("div", { class: "col-span-2" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Category"),
                                        createVNode(_sfc_main$1, {
                                          modelValue: cost.category_id,
                                          "onUpdate:modelValue": ($event) => cost.category_id = $event,
                                          options: operationalCostCategorySelectOptions.value,
                                          placeholder: "Select category",
                                          "label-field": "label",
                                          "value-field": "value",
                                          "sub-label-field": "description",
                                          "search-fields": ["label", "description"],
                                          "input-class": `w-full px-2 py-1 pr-8 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500 ${operationalCostCategorySelectOptions.value.length === 0 ? "bg-gray-100 pointer-events-none" : ""}`,
                                          onSelect: () => onOtherCostCategoryChange(cost)
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class", "onSelect"])
                                      ]),
                                      createVNode("div", { class: "col-span-3" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Vendor / Payee"),
                                        createVNode(_sfc_main$1, {
                                          modelValue: cost.vendor_id,
                                          "onUpdate:modelValue": ($event) => cost.vendor_id = $event,
                                          options: vendorSelectOptions.value,
                                          placeholder: "Select vendor",
                                          "search-fields": ["label"],
                                          "input-class": "w-full px-2 py-1 pr-8 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                                        createVNode("p", { class: "text-xs text-orange-600 mt-1" }, "Select a vendor if you already know the payee.")
                                      ]),
                                      createVNode("div", { class: "col-span-1 flex items-end" }, [
                                        createVNode("button", {
                                          type: "button",
                                          onClick: ($event) => removeOtherCost(index),
                                          class: "w-full px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors",
                                          disabled: unref(form).other_costs.length <= 1
                                        }, [
                                          createVNode(unref(Trash2), { class: "w-4 h-4 mx-auto" })
                                        ], 8, ["onClick", "disabled"])
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
                                createVNode("div", { class: "flex justify-center mt-6 pt-4 border-t border-orange-200" }, [
                                  createVNode("button", {
                                    type: "button",
                                    onClick: addOtherCost,
                                    class: "inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                                  }, [
                                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                    createTextVNode(" Add Another Cost ")
                                  ])
                                ])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-center py-4 text-orange-600"
                              }, [
                                createVNode("p", { class: "text-sm" }, "No other costs yet"),
                                createVNode("p", { class: "text-xs text-orange-500" }, 'Click "Add Cost" to add items.')
                              ]))
                            ]),
                            createVNode("div", { class: "bg-purple-50 rounded-lg p-4" }, [
                              createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                                createVNode("h4", { class: "text-md font-semibold text-purple-800" }, "Items Reimbursement"),
                                createVNode("button", {
                                  type: "button",
                                  onClick: addReimbursementItem,
                                  class: "text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors"
                                }, " + Add Reimbursement ")
                              ]),
                              reimbursementItems.value && reimbursementItems.value.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "space-y-3"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(reimbursementItems.value, (item, index) => {
                                  return openBlock(), createBlock("div", {
                                    key: index,
                                    class: "border border-purple-200 rounded-lg p-3 bg-white"
                                  }, [
                                    createVNode("div", { class: "grid grid-cols-12 gap-3 mb-2" }, [
                                      createVNode("div", { class: "col-span-4" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Description"),
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => item.description = $event,
                                          type: "text",
                                          placeholder: "Example: Transport to port",
                                          class: "w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, item.description]
                                        ])
                                      ]),
                                      createVNode("div", { class: "col-span-2" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Amount"),
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => item.amount = $event,
                                          type: "number",
                                          step: "0.01",
                                          placeholder: "0.00",
                                          class: "w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, item.amount]
                                        ])
                                      ]),
                                      createVNode("div", { class: "col-span-2" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Category"),
                                        createVNode(_sfc_main$1, {
                                          modelValue: item.category,
                                          "onUpdate:modelValue": ($event) => item.category = $event,
                                          options: reimbursementCategoryOptions.value,
                                          placeholder: "Select category",
                                          "label-field": "label",
                                          "value-field": "value",
                                          "sub-label-field": "description",
                                          "search-fields": ["label", "description"],
                                          "input-class": `w-full px-2 py-1 pr-8 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 ${reimbursementCategoryOptions.value.length === 0 ? "bg-gray-100 pointer-events-none" : ""}`
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options", "input-class"]),
                                        reimbursementCategoryOptions.value.length === 0 ? (openBlock(), createBlock("p", {
                                          key: 0,
                                          class: "text-xs text-purple-600 mt-1"
                                        }, " No categories available. Please add Operational Cost Categories first. ")) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", { class: "col-span-3" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Vendor / Payee"),
                                        createVNode(_sfc_main$1, {
                                          modelValue: item.vendor_id,
                                          "onUpdate:modelValue": ($event) => item.vendor_id = $event,
                                          options: vendorSelectOptions.value,
                                          placeholder: "Select vendor",
                                          "search-fields": ["label"],
                                          "input-class": "w-full px-2 py-1 pr-8 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "options"]),
                                        createVNode("p", { class: "text-xs text-purple-600 mt-1" }, "Select a vendor if you already know the payee.")
                                      ]),
                                      createVNode("div", { class: "col-span-1 flex items-end" }, [
                                        createVNode("button", {
                                          type: "button",
                                          onClick: ($event) => removeReimbursementItem(index),
                                          class: "w-full px-2 py-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                                        }, [
                                          createVNode(unref(Trash2), { class: "w-4 h-4 mx-auto" })
                                        ], 8, ["onClick"])
                                      ])
                                    ]),
                                    createVNode("div", { class: "grid grid-cols-12 gap-3" }, [
                                      createVNode("div", { class: "col-span-11" }, [
                                        createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Notes"),
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => item.notes = $event,
                                          type: "text",
                                          placeholder: "Additional notes (optional)",
                                          class: "w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, item.notes]
                                        ])
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
                                createVNode("div", { class: "flex justify-center mt-6 pt-4 border-t border-purple-200" }, [
                                  createVNode("button", {
                                    type: "button",
                                    onClick: addReimbursementItem,
                                    class: "inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                  }, [
                                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                    createTextVNode(" Add Another Reimbursement ")
                                  ])
                                ])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-center py-4 text-purple-600"
                              }, [
                                createVNode("p", { class: "text-sm" }, "No reimbursement items yet"),
                                createVNode("p", { class: "text-xs text-purple-500" }, 'Click "Add Reimbursement" to add items. ')
                              ]))
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
                                placeholder: "Additional notes for this shipping order",
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
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "COMMODITY / GOODS DESCRIPTION"),
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
                                  withDirectives(createVNode("select", {
                                    "onUpdate:modelValue": ($event) => unref(form).package_unit = $event,
                                    class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
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
                                  ]),
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
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "MEAS (M3)"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => unref(form).measurement = $event,
                                  type: "number",
                                  step: "0.001",
                                  min: "0",
                                  placeholder: "Enter volume in m3",
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
                                  class: "text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors"
                                }, " + Add Container ")
                              ]),
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(form).container_no, (container, index) => {
                                return openBlock(), createBlock("div", {
                                  key: "container-" + index,
                                  class: "flex gap-2 mb-2"
                                }, [
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => unref(form).container_no[index] = $event,
                                    type: "text",
                                    placeholder: "Enter container number (example: TCLU1234567)",
                                    class: "flex-1 px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                  }, null, 8, ["onUpdate:modelValue"]), [
                                    [vModelText, unref(form).container_no[index]]
                                  ]),
                                  unref(form).container_no.length > 1 ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    type: "button",
                                    onClick: ($event) => removeContainerNo(index),
                                    class: "px-3 py-2 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-lg transition-colors"
                                  }, " × ", 8, ["onClick"])) : createCommentVNode("", true)
                                ]);
                              }), 128)),
                              unref(form).errors.container_no ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-2 text-sm text-red-600"
                              }, toDisplayString(unref(form).errors.container_no), 1)) : createCommentVNode("", true),
                              unref(form).container_no.length > 0 ? (openBlock(), createBlock("div", {
                                key: 1,
                                class: "flex justify-center mt-4 pt-4 border-t border-sage-200"
                              }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: addContainerNo,
                                  class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                                }, [
                                  createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                  createTextVNode(" Add Another Container ")
                                ])
                              ])) : createCommentVNode("", true)
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
                        createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-cs.sales-orders.index"),
                            class: "inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Cancel ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(form).processing,
                            class: "inline-flex items-center justify-center px-6 py-2 bg-sage-800 text-white rounded-lg hover:bg-sage-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, [
                            unref(form).processing ? (openBlock(), createBlock("svg", {
                              key: 0,
                              class: "animate-spin -ml-1 mr-3 h-4 w-4 text-white",
                              fill: "none",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("circle", {
                                class: "opacity-25",
                                cx: "12",
                                cy: "12",
                                r: "10",
                                stroke: "currentColor",
                                "stroke-width": "4"
                              }),
                              createVNode("path", {
                                class: "opacity-75",
                                fill: "currentColor",
                                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              })
                            ])) : createCommentVNode("", true),
                            unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Saving...")) : (openBlock(), createBlock("span", { key: 2 }, "Simpan shipping order"))
                          ], 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/SalesOrders/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aa0966e6"]]);
export {
  Create as default
};
