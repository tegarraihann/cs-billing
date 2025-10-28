import { ref, computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, vShow, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminCSLayout } from "./AdminCSLayout-DmyXajiM.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { Pen, Eye, ArrowLeft, ChevronDown, Plus, Trash2, Loader2 } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-v1m7YKEO.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    salesOrder: Object,
    vendors: Array,
    shipmentTypes: Array,
    serviceTypes: Array,
    operationalCostCategories: Array
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
    const initializeVendorBreakdown = () => {
      if (props.salesOrder.vendor_breakdown && Array.isArray(props.salesOrder.vendor_breakdown)) {
        return props.salesOrder.vendor_breakdown.map((item) => ({
          vendor_id: item.vendor_id || "",
          nama_vendor: item.nama_vendor || "",
          no_rekening: item.no_rekening || "",
          nama_rekening: item.nama_rekening || "",
          description: item.description || "",
          buying_amount: item.buying_amount || 0,
          selling_amount: item.selling_amount || 0,
          rcvd_inv: item.rcvd_inv || "",
          remarks: item.remarks || ""
        }));
      }
      return [{
        vendor_id: "",
        nama_vendor: "",
        no_rekening: "",
        nama_rekening: "",
        description: "",
        buying_amount: 0,
        selling_amount: 0,
        rcvd_inv: "",
        remarks: ""
      }];
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
      package_unit: props.salesOrder.package_unit || "",
      other_costs: props.salesOrder.other_costs || [{ description: "", amount: 0, category: "" }]
    });
    const reimbursementItems = ref(
      props.salesOrder.reimbursement_items && props.salesOrder.reimbursement_items.length > 0 ? props.salesOrder.reimbursement_items : [{ description: "", amount: 0, category: "", notes: "" }]
    );
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
        vendor_id: "",
        nama_vendor: "",
        no_rekening: "",
        nama_rekening: "",
        description: "",
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
        description: "",
        amount: 0,
        category: ""
      });
    };
    const removeOtherCost = (index) => {
      if (form.other_costs.length > 0) {
        form.other_costs.splice(index, 1);
      }
    };
    const formatCostAmount = (cost, event) => {
      let value = event.target.value;
      value = value.replace(/[^\d.,]/g, "");
      cost.amount = value;
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
          if (decimalPart.length >= 3 || parseInt(decimalPart) >= 100 || parts[0].length >= 2) {
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
    const addReimbursementItem = () => {
      reimbursementItems.value.push({
        description: "",
        amount: 0,
        category: "",
        notes: ""
      });
    };
    const removeReimbursementItem = (index) => {
      if (reimbursementItems.value.length > 1) {
        reimbursementItems.value.splice(index, 1);
      }
    };
    const formatNumber = (item, field) => {
      const value = item[field];
      if (!value) return;
      const numericValue = value.toString().replace(/[^\d]/g, "");
      const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      item[field] = formatted;
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
    const totalBuying = computed(() => {
      return form.vendor_breakdown.reduce((sum, item) => {
        const amount = parseFloat(item.buying_amount.toString().replace(/\./g, "")) || 0;
        return sum + amount;
      }, 0);
    });
    const totalSelling = computed(() => {
      return form.vendor_breakdown.reduce((sum, item) => {
        const amount = parseFloat(item.selling_amount.toString().replace(/\./g, "")) || 0;
        return sum + amount;
      }, 0);
    });
    const totalRevenue = computed(() => {
      return totalSelling.value - totalBuying.value;
    });
    const getProfit = (vendorItem) => {
      const buying = parseFloat(vendorItem.buying_amount.toString().replace(/\./g, "")) || 0;
      const selling = parseFloat(vendorItem.selling_amount.toString().replace(/\./g, "")) || 0;
      return selling - buying;
    };
    const totalOtherCosts = computed(() => {
      return form.other_costs.reduce((sum, item) => sum + normalizeNumber(item.amount), 0);
    });
    const totalReimbursement = computed(() => {
      return reimbursementItems.value.reduce((sum, item) => sum + normalizeNumber(item.amount), 0);
    });
    const calculateTotals = () => {
      return {
        totalBuying: totalBuying.value,
        totalSelling: totalSelling.value,
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
      const cleanedData = {
        ...form.data(),
        vendor_breakdown: form.vendor_breakdown.map((item) => ({
          ...item,
          buying_amount: parseFloat(item.buying_amount.toString().replace(/\./g, "")) || 0,
          selling_amount: parseFloat(item.selling_amount.toString().replace(/\./g, "")) || 0
        })),
        reimbursement_items: (reimbursementItems.value || []).map((it) => ({
          description: it.description || "",
          amount: normalizeNumber(it.amount),
          // pakai normalizermu
          category: it.category || "",
          notes: it.notes || "",
          vendor_id: it.vendor_id ?? null
        }))
      };
      form.transform(() => cleanedData).put(route("admin-cs.sales-orders.update", props.salesOrder.id), {
        onSuccess: (page) => {
          console.log("Success response received:", page);
          if (page.component === "Admin/AdminCS/SalesOrders/Index") {
            console.log("Successfully redirected to index page");
            showAlert("success", "Berhasil", "Sales Order berhasil diperbarui.");
          } else {
            console.log("Not redirected to index, component:", page.component);
            showAlert("success", "Berhasil", "Sales Order berhasil diperbarui.", "OK", "", () => {
              window.location.href = route("admin-cs.sales-orders.index");
            });
          }
        },
        onError: (errors) => {
          console.error("Sales Order Update Error:", errors);
          if (errors && Object.keys(errors).length > 0) {
            let errorMessages = [];
            Object.keys(errors).forEach((field) => {
              if (Array.isArray(errors[field])) {
                errorMessages.push(...errors[field]);
              } else {
                errorMessages.push(errors[field]);
              }
            });
            const errorMessage = errorMessages.length > 0 ? errorMessages.join(". ") : "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan.";
            showAlert("error", "Gagal Menyimpan", errorMessage);
          } else {
            showAlert("error", "Gagal Menyimpan", "Terjadi kesalahan saat memperbarui sales order. Silakan coba lagi.");
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
            _push2(`<div class="py-6" data-v-85d6fbf3${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-85d6fbf3${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-85d6fbf3${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-85d6fbf3${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-85d6fbf3${_scopeId}><div class="flex items-center" data-v-85d6fbf3${_scopeId}><div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" data-v-85d6fbf3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Pen), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-85d6fbf3${_scopeId}>Edit Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h1><p class="mt-1 text-sm text-gray-600" data-v-85d6fbf3${_scopeId}>Perbarui informasi sales order untuk pelanggan </p></div></div><div class="mt-4 sm:mt-0 flex gap-3" data-v-85d6fbf3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.show", __props.salesOrder.id),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Eye), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Lihat Detail `);
                } else {
                  return [
                    createVNode(unref(Eye), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Lihat Detail ")
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
                  _push3(` Kembali `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><form class="space-y-6" data-v-85d6fbf3${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85d6fbf3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-85d6fbf3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85d6fbf3${_scopeId}>Informasi Dasar</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.basic ? null : { display: "none" })}" class="p-6 space-y-4" data-v-85d6fbf3${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-85d6fbf3${_scopeId}><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>ORDER NUMB <span class="text-red-500" data-v-85d6fbf3${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).order_number)} type="text" required readonly placeholder="EWILOG2509001001" class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.order_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.order_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>REF NO</label><input${ssrRenderAttr("value", unref(form).ref_no)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.ref_no) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.ref_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>DATE</label><input${ssrRenderAttr("value", unref(form).so_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.so_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.so_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>CUSTOMER <span class="text-red-500" data-v-85d6fbf3${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).customer)} type="text" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.customer) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.customer)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>SHIPPER</label><input${ssrRenderAttr("value", unref(form).shipper)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.shipper) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.shipper)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85d6fbf3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-85d6fbf3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85d6fbf3${_scopeId}>Informasi Pengiriman</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.shipping ? null : { display: "none" })}" class="p-6 space-y-4" data-v-85d6fbf3${_scopeId}><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>BL/AWB</label><input${ssrRenderAttr("value", unref(form).bl_awb)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.bl_awb) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.bl_awb)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>LINER</label><input${ssrRenderAttr("value", unref(form).liner)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.liner) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.liner)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>VESSEL</label><input${ssrRenderAttr("value", unref(form).vessel)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.vessel) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.vessel)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-85d6fbf3${_scopeId}><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>ETA</label><input${ssrRenderAttr("value", unref(form).eta)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.eta) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.eta)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>ETD</label><input${ssrRenderAttr("value", unref(form).etd)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.etd) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.etd)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>AJU</label><input${ssrRenderAttr("value", unref(form).aju)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.aju) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.aju)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>SPPB DATE</label><input${ssrRenderAttr("value", unref(form).sppb_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.sppb_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.sppb_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>SHIPMENT TYPE</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}><option value="" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "") : ssrLooseEqual(unref(form).shipment_type, "")) ? " selected" : ""}${_scopeId}>Pilih Shipment Type</option><!--[-->`);
            ssrRenderList(__props.shipmentTypes, (shipmentType) => {
              _push2(`<option${ssrRenderAttr("value", shipmentType.code)} data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, shipmentType.code) : ssrLooseEqual(unref(form).shipment_type, shipmentType.code)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(shipmentType.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(form).errors.shipment_type) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.shipment_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>POL</label><input${ssrRenderAttr("value", unref(form).pol)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.pol) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.pol)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>POD</label><input${ssrRenderAttr("value", unref(form).pod)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.pod) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.pod)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>GUDANG/UTC</label><input${ssrRenderAttr("value", unref(form).gudang_utc)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.gudang_utc) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.gudang_utc)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>PARTY/LCL</label><input${ssrRenderAttr("value", unref(form).party_lcl)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.party_lcl) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.party_lcl)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>EXCHANGE RATE</label><input${ssrRenderAttr("value", unref(form).exchange_rate)} type="number" step="0.0001" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.exchange_rate) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.exchange_rate)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85d6fbf3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-85d6fbf3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85d6fbf3${_scopeId}>Informasi Pricing</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.pricing ? null : { display: "none" })}" class="p-6 space-y-6" data-v-85d6fbf3${_scopeId}><div class="bg-gray-50 rounded-lg p-4" data-v-85d6fbf3${_scopeId}><div class="flex justify-between items-center mb-4" data-v-85d6fbf3${_scopeId}><h4 class="text-md font-semibold text-sage-800" data-v-85d6fbf3${_scopeId}>Rincian Vendor (Buying &amp; Selling) </h4><button type="button" class="inline-flex items-center text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors" data-v-85d6fbf3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Tambah Vendor </button></div><!--[-->`);
            ssrRenderList(unref(form).vendor_breakdown, (item, index) => {
              _push2(`<div class="border border-sage-200 rounded-lg p-4 mb-4 space-y-4" data-v-85d6fbf3${_scopeId}><div class="grid grid-cols-12 gap-3" data-v-85d6fbf3${_scopeId}><div class="col-span-11" data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-85d6fbf3${_scopeId}>Nama Vendor</label><select class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}><option value="" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.vendor_id) ? ssrLooseContain(item.vendor_id, "") : ssrLooseEqual(item.vendor_id, "")) ? " selected" : ""}${_scopeId}>Pilih vendor...</option><!--[-->`);
              ssrRenderList(__props.vendors, (vendorOption) => {
                _push2(`<option${ssrRenderAttr("value", vendorOption.id)} data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.vendor_id) ? ssrLooseContain(item.vendor_id, vendorOption.id) : ssrLooseEqual(item.vendor_id, vendorOption.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendorOption.nama_vendor)}</option>`);
              });
              _push2(`<!--]--></select></div><div class="col-span-1" data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-transparent mb-1" data-v-85d6fbf3${_scopeId}>Del</label><button type="button" class="w-full h-10 inline-flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors" data-v-85d6fbf3${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`</button></div></div><div class="grid grid-cols-2 gap-3" data-v-85d6fbf3${_scopeId}><div data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-85d6fbf3${_scopeId}>Deskripsi Service / Jenis Biaya</label><select class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}><option value="" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, "") : ssrLooseEqual(item.description, "")) ? " selected" : ""}${_scopeId}>Pilih Jenis Biaya</option><!--[-->`);
              ssrRenderList(__props.serviceTypes, (serviceType) => {
                _push2(`<option${ssrRenderAttr("value", serviceType.code)} data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, serviceType.code) : ssrLooseEqual(item.description, serviceType.code)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(serviceType.code)}</option>`);
              });
              _push2(`<!--]--><option value="D/O CHARGES" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, "D/O CHARGES") : ssrLooseEqual(item.description, "D/O CHARGES")) ? " selected" : ""}${_scopeId}>D/O CHARGES</option><option value="LOLO" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, "LOLO") : ssrLooseEqual(item.description, "LOLO")) ? " selected" : ""}${_scopeId}>LOLO</option><option value="STORAGE" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, "STORAGE") : ssrLooseEqual(item.description, "STORAGE")) ? " selected" : ""}${_scopeId}>STORAGE</option><option value="REFUND" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, "REFUND") : ssrLooseEqual(item.description, "REFUND")) ? " selected" : ""}${_scopeId}>REFUND</option><option value="OTHER" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.description) ? ssrLooseContain(item.description, "OTHER") : ssrLooseEqual(item.description, "OTHER")) ? " selected" : ""}${_scopeId}>OTHER</option></select></div><div data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-85d6fbf3${_scopeId}>RCVD INV</label><input${ssrRenderAttr("value", item.rcvd_inv)} type="text" placeholder="Nomor invoice yang diterima" class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}></div></div><div data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-85d6fbf3${_scopeId}>Remarks (Individual)</label><input${ssrRenderAttr("value", item.remarks)} type="text" placeholder="Catatan khusus untuk item ini" class="w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}></div><div class="grid grid-cols-3 gap-3 p-3 bg-blue-50 rounded-lg" data-v-85d6fbf3${_scopeId}><div data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-blue-700 mb-1" data-v-85d6fbf3${_scopeId}>Buying Amount (Cost)</label><input${ssrRenderAttr("value", item.buying_amount)} type="text" placeholder="0" class="w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" data-v-85d6fbf3${_scopeId}></div><div data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-green-700 mb-1" data-v-85d6fbf3${_scopeId}>Selling Amount (Revenue)</label><input${ssrRenderAttr("value", item.selling_amount)} type="text" placeholder="0" class="w-full px-3 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500" data-v-85d6fbf3${_scopeId}></div><div data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-85d6fbf3${_scopeId}>Profit</label><p class="${ssrRenderClass([getProfit(item) >= 0 ? "text-green-600" : "text-red-600", "px-3 py-2 bg-white border border-purple-300 rounded text-sm font-semibold"])}" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(formatCurrency(getProfit(item)))}</p></div></div>`);
              if (item.vendor_id) {
                _push2(`<div class="grid grid-cols-3 gap-3 p-3 bg-sage-50 rounded-lg" data-v-85d6fbf3${_scopeId}><div data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-85d6fbf3${_scopeId}>Nama Vendor</label><p class="text-sm text-gray-900" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(item.nama_vendor || "-")}</p></div><div data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-85d6fbf3${_scopeId}>Nomor Rekening</label><p class="text-sm text-gray-900 font-mono" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(item.no_rekening || "-")}</p></div><div data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-sage-700 mb-1" data-v-85d6fbf3${_scopeId}>Nama Rekening</label><p class="text-sm text-gray-900" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(item.nama_rekening || "-")}</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--><div class="mt-4 pt-4 border-t border-gray-300 grid grid-cols-3 gap-4 text-center" data-v-85d6fbf3${_scopeId}><div class="p-3 bg-blue-100 rounded-lg" data-v-85d6fbf3${_scopeId}><p class="text-xs font-medium text-blue-700" data-v-85d6fbf3${_scopeId}>Total Buying</p><p class="text-lg font-bold text-blue-800" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</p></div><div class="p-3 bg-green-100 rounded-lg" data-v-85d6fbf3${_scopeId}><p class="text-xs font-medium text-green-700" data-v-85d6fbf3${_scopeId}>Total Selling</p><p class="text-lg font-bold text-green-800" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</p></div><div class="${ssrRenderClass([totalRevenue.value >= 0 ? "bg-purple-100" : "bg-red-100", "p-3 rounded-lg"])}" data-v-85d6fbf3${_scopeId}><p class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-purple-700" : "text-red-700", "text-xs font-medium"])}" data-v-85d6fbf3${_scopeId}>Total Profit </p><p class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-purple-800" : "text-red-800", "text-lg font-bold"])}" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</p></div></div></div><div class="bg-blue-50 rounded-lg p-4" data-v-85d6fbf3${_scopeId}><h4 class="text-md font-semibold text-blue-800 mb-3" data-v-85d6fbf3${_scopeId}>Ringkasan Revenue</h4><div class="space-y-2" data-v-85d6fbf3${_scopeId}><div class="flex justify-between" data-v-85d6fbf3${_scopeId}><span data-v-85d6fbf3${_scopeId}>Total Pemasukan (Selling):</span><span class="font-medium" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</span></div><div class="flex justify-between" data-v-85d6fbf3${_scopeId}><span data-v-85d6fbf3${_scopeId}>Total Pengeluaran (Buying):</span><span class="font-medium" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</span></div><div class="flex justify-between items-center pt-2 border-t border-blue-300 font-bold text-lg" data-v-85d6fbf3${_scopeId}><span data-v-85d6fbf3${_scopeId}>Profit (Revenue):</span><span class="${ssrRenderClass(totalRevenue.value >= 0 ? "text-green-600" : "text-red-600")}" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</span></div></div></div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>REMARKS</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea>`);
            if (unref(form).errors.remarks) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.remarks)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>NOTE</label><textarea rows="3" placeholder="Catatan tambahan untuk sales order ini" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).note)}</textarea>`);
            if (unref(form).errors.note) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.note)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85d6fbf3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-85d6fbf3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85d6fbf3${_scopeId}>Informasi Barang</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.goods ? null : { display: "none" })}" class="p-6 space-y-4" data-v-85d6fbf3${_scopeId}><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>COMMODITY/URAIAN BARANG</label><textarea rows="3" placeholder="Masukkan uraian barang/commodity yang detail" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).commodity)}</textarea>`);
            if (unref(form).errors.commodity) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.commodity)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-85d6fbf3${_scopeId}><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>QTY</label><input${ssrRenderAttr("value", unref(form).qty)} type="number" min="0" placeholder="Masukkan quantity" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.qty) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.qty)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>NET WEIGHT (KG)</label><input${ssrRenderAttr("value", unref(form).net_weight)} type="number" step="0.01" min="0" placeholder="Masukkan berat netto dalam kg" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.net_weight) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.net_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>GROSS WEIGHT (KG)</label><input${ssrRenderAttr("value", unref(form).gross_weight)} type="number" step="0.01" min="0" placeholder="Masukkan berat kotor dalam kg" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.gross_weight) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.gross_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>MEAS (M³)</label><input${ssrRenderAttr("value", unref(form).measurement)} type="number" step="0.001" min="0" placeholder="Masukkan volume dalam m³" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.measurement) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.measurement)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-85d6fbf3${_scopeId}><div class="flex justify-between items-center mb-2" data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-85d6fbf3${_scopeId}>CONTAINER NO</label><button type="button" class="inline-flex items-center text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors" data-v-85d6fbf3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Tambah Container </button></div><!--[-->`);
            ssrRenderList(unref(form).container_no, (container, index) => {
              _push2(`<div class="flex gap-2 mb-2" data-v-85d6fbf3${_scopeId}><input${ssrRenderAttr("value", unref(form).container_no[index])} type="text" placeholder="Masukkan nomor container (misal: TCLU1234567)" class="flex-1 px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
              if (unref(form).container_no.length > 1) {
                _push2(`<button type="button" class="px-3 py-2 inline-flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors" data-v-85d6fbf3${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
            if (unref(form).errors.container_no) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.container_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85d6fbf3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-85d6fbf3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85d6fbf3${_scopeId}>Informasi Invoice</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.invoice }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.invoice ? null : { display: "none" })}" class="p-6 space-y-4" data-v-85d6fbf3${_scopeId}><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>INVOICE NUMB</label><input${ssrRenderAttr("value", unref(form).invoice_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.invoice_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>INVOICE DATE</label><input${ssrRenderAttr("value", unref(form).invoice_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.invoice_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-85d6fbf3${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-85d6fbf3${_scopeId}>T.O.P</label><input${ssrRenderAttr("value", unref(form).top)} type="text" placeholder="e.g., NET 30" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).errors.top) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(unref(form).errors.top)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85d6fbf3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-85d6fbf3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85d6fbf3${_scopeId}>Biaya Beban Lain (Operational)</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.other_costs }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.other_costs ? null : { display: "none" })}" class="p-6" data-v-85d6fbf3${_scopeId}><div class="bg-orange-50 rounded-lg p-4" data-v-85d6fbf3${_scopeId}><div class="flex justify-between items-center mb-4" data-v-85d6fbf3${_scopeId}><h4 class="text-md font-semibold text-orange-800" data-v-85d6fbf3${_scopeId}>Biaya Beban Lain (Operational) </h4><button type="button" class="inline-flex items-center text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition-colors" data-v-85d6fbf3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Tambah Biaya </button></div>`);
            if (unref(form).other_costs && unref(form).other_costs.length > 0) {
              _push2(`<div class="space-y-3" data-v-85d6fbf3${_scopeId}><!--[-->`);
              ssrRenderList(unref(form).other_costs, (cost, index) => {
                _push2(`<div class="border border-orange-200 rounded-lg p-3 bg-white" data-v-85d6fbf3${_scopeId}><div class="grid grid-cols-12 gap-3" data-v-85d6fbf3${_scopeId}><div class="col-span-5" data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-85d6fbf3${_scopeId}>Deskripsi Biaya</label><input${ssrRenderAttr("value", cost.description)} type="text" placeholder="Contoh: Biaya handling, dokumen, dll" class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" data-v-85d6fbf3${_scopeId}></div><div class="col-span-3" data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-85d6fbf3${_scopeId}>Jumlah Biaya</label><input${ssrRenderAttr("value", cost.amount)} type="text" placeholder="0 (contoh: 2.500 atau 2500)" class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" data-v-85d6fbf3${_scopeId}></div><div class="col-span-3" data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-orange-700 mb-1" data-v-85d6fbf3${_scopeId}>Kategori</label><select class="w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500" data-v-85d6fbf3${_scopeId}><option value="" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(cost.category) ? ssrLooseContain(cost.category, "") : ssrLooseEqual(cost.category, "")) ? " selected" : ""}${_scopeId}>Pilih kategori</option><!--[-->`);
                ssrRenderList(__props.operationalCostCategories, (category) => {
                  _push2(`<option${ssrRenderAttr("value", category.name)}${ssrRenderAttr("title", category.description)} data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(cost.category) ? ssrLooseContain(cost.category, category.name) : ssrLooseEqual(cost.category, category.name)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
                });
                _push2(`<!--]--></select></div><div class="col-span-1 flex items-end" data-v-85d6fbf3${_scopeId}><button type="button" class="w-full px-2 py-1 inline-flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"${ssrIncludeBooleanAttr(unref(form).other_costs.length <= 1) ? " disabled" : ""} data-v-85d6fbf3${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button></div></div></div>`);
              });
              _push2(`<!--]--><div class="pt-3 border-t border-orange-300" data-v-85d6fbf3${_scopeId}><div class="flex justify-between items-center" data-v-85d6fbf3${_scopeId}><span class="text-sm font-medium text-orange-700" data-v-85d6fbf3${_scopeId}>Total Biaya Beban Lain:</span><span class="text-lg font-bold text-orange-800" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(formatCurrency(totalOtherCosts.value))}</span></div></div><div class="flex justify-center mt-6 pt-4 border-t border-orange-200" data-v-85d6fbf3${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors" data-v-85d6fbf3${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Tambah Biaya Lagi </button></div></div>`);
            } else {
              _push2(`<div class="text-center py-4 text-orange-600" data-v-85d6fbf3${_scopeId}><p class="text-sm" data-v-85d6fbf3${_scopeId}>Belum ada biaya beban lain</p><p class="text-xs text-orange-500" data-v-85d6fbf3${_scopeId}>Klik tombol &quot;Tambah Biaya&quot; untuk menambahkan</p></div>`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-85d6fbf3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-85d6fbf3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-85d6fbf3${_scopeId}>Items Reimbursement</h3>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": !sections.value.reimbursement }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</div><div style="${ssrRenderStyle(sections.value.reimbursement ? null : { display: "none" })}" class="p-6" data-v-85d6fbf3${_scopeId}><div class="bg-purple-50 rounded-lg p-4" data-v-85d6fbf3${_scopeId}><div class="flex justify-between items-center mb-4" data-v-85d6fbf3${_scopeId}><h4 class="text-md font-semibold text-purple-800" data-v-85d6fbf3${_scopeId}>Items Reimbursement</h4><button type="button" class="inline-flex items-center text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors" data-v-85d6fbf3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Tambah Reimbursement </button></div>`);
            if (reimbursementItems.value && reimbursementItems.value.length > 0) {
              _push2(`<div class="space-y-3" data-v-85d6fbf3${_scopeId}><!--[-->`);
              ssrRenderList(reimbursementItems.value, (item, index) => {
                _push2(`<div class="border border-purple-200 rounded-lg p-3 bg-white" data-v-85d6fbf3${_scopeId}><div class="grid grid-cols-12 gap-3" data-v-85d6fbf3${_scopeId}><div class="col-span-4" data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-85d6fbf3${_scopeId}>Deskripsi</label><input${ssrRenderAttr("value", item.description)} type="text" placeholder="Contoh: Transport ke pelabuhan" class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" data-v-85d6fbf3${_scopeId}></div><div class="col-span-2" data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-85d6fbf3${_scopeId}>Jumlah</label><input${ssrRenderAttr("value", item.amount)} type="number" step="0.01" placeholder="0.00" class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" data-v-85d6fbf3${_scopeId}></div><div class="col-span-3" data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-85d6fbf3${_scopeId}>Kategori</label><select class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" data-v-85d6fbf3${_scopeId}><option value="" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "") : ssrLooseEqual(item.category, "")) ? " selected" : ""}${_scopeId}>Pilih Kategori</option><option value="transport" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "transport") : ssrLooseEqual(item.category, "transport")) ? " selected" : ""}${_scopeId}>Transportasi</option><option value="accommodation" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "accommodation") : ssrLooseEqual(item.category, "accommodation")) ? " selected" : ""}${_scopeId}>Akomodasi</option><option value="meal" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "meal") : ssrLooseEqual(item.category, "meal")) ? " selected" : ""}${_scopeId}>Makan &amp; Minum</option><option value="fuel" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "fuel") : ssrLooseEqual(item.category, "fuel")) ? " selected" : ""}${_scopeId}>BBM</option><option value="parking" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "parking") : ssrLooseEqual(item.category, "parking")) ? " selected" : ""}${_scopeId}>Parkir</option><option value="toll" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "toll") : ssrLooseEqual(item.category, "toll")) ? " selected" : ""}${_scopeId}>Tol</option><option value="admin" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "admin") : ssrLooseEqual(item.category, "admin")) ? " selected" : ""}${_scopeId}>Administrasi</option><option value="communication" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "communication") : ssrLooseEqual(item.category, "communication")) ? " selected" : ""}${_scopeId}>Komunikasi</option><option value="equipment" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "equipment") : ssrLooseEqual(item.category, "equipment")) ? " selected" : ""}${_scopeId}>Peralatan</option><option value="general" data-v-85d6fbf3${ssrIncludeBooleanAttr(Array.isArray(item.category) ? ssrLooseContain(item.category, "general") : ssrLooseEqual(item.category, "general")) ? " selected" : ""}${_scopeId}>Lain-lain</option></select></div><div class="col-span-2" data-v-85d6fbf3${_scopeId}><label class="block text-xs font-medium text-purple-700 mb-1" data-v-85d6fbf3${_scopeId}>Catatan</label><input${ssrRenderAttr("value", item.notes)} type="text" placeholder="Opsional" class="w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500" data-v-85d6fbf3${_scopeId}></div><div class="col-span-1 flex items-end" data-v-85d6fbf3${_scopeId}><button type="button" class="w-full px-2 py-1 inline-flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors" data-v-85d6fbf3${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button></div></div></div>`);
              });
              _push2(`<!--]--><div class="pt-3 border-t border-purple-300" data-v-85d6fbf3${_scopeId}><div class="flex justify-between items-center" data-v-85d6fbf3${_scopeId}><span class="text-sm font-medium text-purple-700" data-v-85d6fbf3${_scopeId}>Total Reimbursement:</span><span class="text-lg font-bold text-purple-800" data-v-85d6fbf3${_scopeId}>${ssrInterpolate(formatCurrency(totalReimbursement.value))}</span></div></div><div class="flex justify-center mt-6 pt-4 border-t border-purple-200" data-v-85d6fbf3${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors" data-v-85d6fbf3${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Tambah Reimbursement Lagi </button></div></div>`);
            } else {
              _push2(`<div class="text-center py-4 text-purple-600" data-v-85d6fbf3${_scopeId}><p class="text-sm" data-v-85d6fbf3${_scopeId}>Belum ada item reimbursement</p><p class="text-xs text-purple-500" data-v-85d6fbf3${_scopeId}>Klik tombol &quot;Tambah Reimbursement&quot; untuk menambahkan</p></div>`);
            }
            _push2(`</div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" data-v-85d6fbf3${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-85d6fbf3${_scopeId}>`);
            if (unref(form).processing) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "animate-spin -ml-1 mr-3 h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-85d6fbf3${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-85d6fbf3${_scopeId}>Update Sales Order</span>`);
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
                            createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, "Edit Sales Order: " + toDisplayString(__props.salesOrder.order_number), 1),
                            createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Perbarui informasi sales order untuk pelanggan ")
                          ])
                        ]),
                        createVNode("div", { class: "mt-4 sm:mt-0 flex gap-3" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-cs.sales-orders.show", __props.salesOrder.id),
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Eye), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Lihat Detail ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-cs.sales-orders.index"),
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Kembali ")
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
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Dasar"),
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
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Pengiriman"),
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
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(form).shipment_type = $event,
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Pilih Shipment Type"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.shipmentTypes, (shipmentType) => {
                              return openBlock(), createBlock("option", {
                                key: shipmentType.id,
                                value: shipmentType.code
                              }, toDisplayString(shipmentType.name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(form).shipment_type]
                          ]),
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
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Pricing"),
                        createVNode(unref(ChevronDown), {
                          class: [{ "rotate-180": !sections.value.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                        }, null, 8, ["class"])
                      ], 8, ["onClick"]),
                      withDirectives(createVNode("div", { class: "p-6 space-y-6" }, [
                        createVNode("div", { class: "bg-gray-50 rounded-lg p-4" }, [
                          createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                            createVNode("h4", { class: "text-md font-semibold text-sage-800" }, "Rincian Vendor (Buying & Selling) "),
                            createVNode("button", {
                              type: "button",
                              onClick: addVendorItem,
                              class: "inline-flex items-center text-sm bg-sage-600 text-white px-3 py-1 rounded hover:bg-sage-700 transition-colors"
                            }, [
                              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Tambah Vendor ")
                            ])
                          ]),
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).vendor_breakdown, (item, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "border border-sage-200 rounded-lg p-4 mb-4 space-y-4"
                            }, [
                              createVNode("div", { class: "grid grid-cols-12 gap-3" }, [
                                createVNode("div", { class: "col-span-11" }, [
                                  createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Nama Vendor"),
                                  withDirectives(createVNode("select", {
                                    "onUpdate:modelValue": ($event) => item.vendor_id = $event,
                                    onChange: ($event) => onVendorSelect(index),
                                    class: "w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                  }, [
                                    createVNode("option", { value: "" }, "Pilih vendor..."),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors, (vendorOption) => {
                                      return openBlock(), createBlock("option", {
                                        key: vendorOption.id,
                                        value: vendorOption.id
                                      }, toDisplayString(vendorOption.nama_vendor), 9, ["value"]);
                                    }), 128))
                                  ], 40, ["onUpdate:modelValue", "onChange"]), [
                                    [vModelSelect, item.vendor_id]
                                  ])
                                ]),
                                createVNode("div", { class: "col-span-1" }, [
                                  createVNode("label", { class: "block text-xs font-medium text-transparent mb-1" }, "Del"),
                                  createVNode("button", {
                                    type: "button",
                                    onClick: ($event) => removeVendorItem(index),
                                    class: "w-full h-10 inline-flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                                  }, [
                                    createVNode(unref(Trash2), { class: "w-4 h-4" })
                                  ], 8, ["onClick"])
                                ])
                              ]),
                              createVNode("div", { class: "grid grid-cols-2 gap-3" }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Deskripsi Service / Jenis Biaya"),
                                  withDirectives(createVNode("select", {
                                    "onUpdate:modelValue": ($event) => item.description = $event,
                                    class: "w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                  }, [
                                    createVNode("option", { value: "" }, "Pilih Jenis Biaya"),
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.serviceTypes, (serviceType) => {
                                      return openBlock(), createBlock("option", {
                                        key: serviceType.id,
                                        value: serviceType.code
                                      }, toDisplayString(serviceType.code), 9, ["value"]);
                                    }), 128)),
                                    createVNode("option", { value: "D/O CHARGES" }, "D/O CHARGES"),
                                    createVNode("option", { value: "LOLO" }, "LOLO"),
                                    createVNode("option", { value: "STORAGE" }, "STORAGE"),
                                    createVNode("option", { value: "REFUND" }, "REFUND"),
                                    createVNode("option", { value: "OTHER" }, "OTHER")
                                  ], 8, ["onUpdate:modelValue"]), [
                                    [vModelSelect, item.description]
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
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-xs font-medium text-sage-700 mb-1" }, "Remarks (Individual)"),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.remarks = $event,
                                  type: "text",
                                  placeholder: "Catatan khusus untuk item ini",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.remarks]
                                ])
                              ]),
                              createVNode("div", { class: "grid grid-cols-3 gap-3 p-3 bg-blue-50 rounded-lg" }, [
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-xs font-medium text-blue-700 mb-1" }, "Buying Amount (Cost)"),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => item.buying_amount = $event,
                                    type: "text",
                                    placeholder: "0",
                                    onInput: ($event) => formatNumber(item, "buying_amount"),
                                    onBlur: calculateTotals,
                                    class: "w-full px-3 py-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                    [vModelText, item.buying_amount]
                                  ])
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", { class: "block text-xs font-medium text-green-700 mb-1" }, "Selling Amount (Revenue)"),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => item.selling_amount = $event,
                                    type: "text",
                                    placeholder: "0",
                                    onInput: ($event) => formatNumber(item, "selling_amount"),
                                    onBlur: calculateTotals,
                                    class: "w-full px-3 py-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                  }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                    [vModelText, item.selling_amount]
                                  ])
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
                                class: "grid grid-cols-3 gap-3 p-3 bg-sage-50 rounded-lg"
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
                              ])) : createCommentVNode("", true)
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
                          createVNode("h4", { class: "text-md font-semibold text-blue-800 mb-3" }, "Ringkasan Revenue"),
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", null, "Total Pemasukan (Selling):"),
                              createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(totalSelling.value)), 1)
                            ]),
                            createVNode("div", { class: "flex justify-between" }, [
                              createVNode("span", null, "Total Pengeluaran (Buying):"),
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
                            placeholder: "Catatan tambahan untuk sales order ini",
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
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Barang"),
                        createVNode(unref(ChevronDown), {
                          class: [{ "rotate-180": !sections.value.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                        }, null, 8, ["class"])
                      ], 8, ["onClick"]),
                      withDirectives(createVNode("div", { class: "p-6 space-y-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "COMMODITY/URAIAN BARANG"),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).commodity = $event,
                            rows: "3",
                            placeholder: "Masukkan uraian barang/commodity yang detail",
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
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "QTY"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).qty = $event,
                              type: "number",
                              min: "0",
                              placeholder: "Masukkan quantity",
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
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "NET WEIGHT (KG)"),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).net_weight = $event,
                              type: "number",
                              step: "0.01",
                              min: "0",
                              placeholder: "Masukkan berat netto dalam kg",
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
                              placeholder: "Masukkan berat kotor dalam kg",
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
                              placeholder: "Masukkan volume dalam m³",
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
                              createTextVNode(" Tambah Container ")
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
                                placeholder: "Masukkan nomor container (misal: TCLU1234567)",
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
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Invoice"),
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
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Biaya Beban Lain (Operational)"),
                        createVNode(unref(ChevronDown), {
                          class: [{ "rotate-180": !sections.value.other_costs }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                        }, null, 8, ["class"])
                      ], 8, ["onClick"]),
                      withDirectives(createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "bg-orange-50 rounded-lg p-4" }, [
                          createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                            createVNode("h4", { class: "text-md font-semibold text-orange-800" }, "Biaya Beban Lain (Operational) "),
                            createVNode("button", {
                              type: "button",
                              onClick: addOtherCost,
                              class: "inline-flex items-center text-sm bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700 transition-colors"
                            }, [
                              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Tambah Biaya ")
                            ])
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
                                  createVNode("div", { class: "col-span-5" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Deskripsi Biaya"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => cost.description = $event,
                                      type: "text",
                                      placeholder: "Contoh: Biaya handling, dokumen, dll",
                                      class: "w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, cost.description]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-3" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Jumlah Biaya"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => cost.amount = $event,
                                      type: "text",
                                      placeholder: "0 (contoh: 2.500 atau 2500)",
                                      onInput: ($event) => formatCostAmount(cost, $event),
                                      class: "w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                    }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                      [vModelText, cost.amount]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-3" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-orange-700 mb-1" }, "Kategori"),
                                    withDirectives(createVNode("select", {
                                      "onUpdate:modelValue": ($event) => cost.category = $event,
                                      class: "w-full px-2 py-1 border border-orange-300 rounded text-sm focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                    }, [
                                      createVNode("option", { value: "" }, "Pilih kategori"),
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.operationalCostCategories, (category) => {
                                        return openBlock(), createBlock("option", {
                                          key: category.id,
                                          value: category.name,
                                          title: category.description
                                        }, toDisplayString(category.name), 9, ["value", "title"]);
                                      }), 128))
                                    ], 8, ["onUpdate:modelValue"]), [
                                      [vModelSelect, cost.category]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-1 flex items-end" }, [
                                    createVNode("button", {
                                      type: "button",
                                      onClick: ($event) => removeOtherCost(index),
                                      class: "w-full px-2 py-1 inline-flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors",
                                      disabled: unref(form).other_costs.length <= 1
                                    }, [
                                      createVNode(unref(Trash2), { class: "w-4 h-4" })
                                    ], 8, ["onClick", "disabled"])
                                  ])
                                ])
                              ]);
                            }), 128)),
                            createVNode("div", { class: "pt-3 border-t border-orange-300" }, [
                              createVNode("div", { class: "flex justify-between items-center" }, [
                                createVNode("span", { class: "text-sm font-medium text-orange-700" }, "Total Biaya Beban Lain:"),
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
                                createTextVNode(" Tambah Biaya Lagi ")
                              ])
                            ])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center py-4 text-orange-600"
                          }, [
                            createVNode("p", { class: "text-sm" }, "Belum ada biaya beban lain"),
                            createVNode("p", { class: "text-xs text-orange-500" }, 'Klik tombol "Tambah Biaya" untuk menambahkan')
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
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Items Reimbursement"),
                        createVNode(unref(ChevronDown), {
                          class: [{ "rotate-180": !sections.value.reimbursement }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                        }, null, 8, ["class"])
                      ], 8, ["onClick"]),
                      withDirectives(createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "bg-purple-50 rounded-lg p-4" }, [
                          createVNode("div", { class: "flex justify-between items-center mb-4" }, [
                            createVNode("h4", { class: "text-md font-semibold text-purple-800" }, "Items Reimbursement"),
                            createVNode("button", {
                              type: "button",
                              onClick: addReimbursementItem,
                              class: "inline-flex items-center text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition-colors"
                            }, [
                              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Tambah Reimbursement ")
                            ])
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
                                createVNode("div", { class: "grid grid-cols-12 gap-3" }, [
                                  createVNode("div", { class: "col-span-4" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Deskripsi"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => item.description = $event,
                                      type: "text",
                                      placeholder: "Contoh: Transport ke pelabuhan",
                                      class: "w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, item.description]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-2" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Jumlah"),
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
                                  createVNode("div", { class: "col-span-3" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Kategori"),
                                    withDirectives(createVNode("select", {
                                      "onUpdate:modelValue": ($event) => item.category = $event,
                                      class: "w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                    }, [
                                      createVNode("option", { value: "" }, "Pilih Kategori"),
                                      createVNode("option", { value: "transport" }, "Transportasi"),
                                      createVNode("option", { value: "accommodation" }, "Akomodasi"),
                                      createVNode("option", { value: "meal" }, "Makan & Minum"),
                                      createVNode("option", { value: "fuel" }, "BBM"),
                                      createVNode("option", { value: "parking" }, "Parkir"),
                                      createVNode("option", { value: "toll" }, "Tol"),
                                      createVNode("option", { value: "admin" }, "Administrasi"),
                                      createVNode("option", { value: "communication" }, "Komunikasi"),
                                      createVNode("option", { value: "equipment" }, "Peralatan"),
                                      createVNode("option", { value: "general" }, "Lain-lain")
                                    ], 8, ["onUpdate:modelValue"]), [
                                      [vModelSelect, item.category]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-2" }, [
                                    createVNode("label", { class: "block text-xs font-medium text-purple-700 mb-1" }, "Catatan"),
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => item.notes = $event,
                                      type: "text",
                                      placeholder: "Opsional",
                                      class: "w-full px-2 py-1 border border-purple-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, item.notes]
                                    ])
                                  ]),
                                  createVNode("div", { class: "col-span-1 flex items-end" }, [
                                    createVNode("button", {
                                      type: "button",
                                      onClick: ($event) => removeReimbursementItem(index),
                                      class: "w-full px-2 py-1 inline-flex items-center justify-center text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
                                    }, [
                                      createVNode(unref(Trash2), { class: "w-4 h-4" })
                                    ], 8, ["onClick"])
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
                                createTextVNode(" Tambah Reimbursement Lagi ")
                              ])
                            ])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "text-center py-4 text-purple-600"
                          }, [
                            createVNode("p", { class: "text-sm" }, "Belum ada item reimbursement"),
                            createVNode("p", { class: "text-xs text-purple-500" }, 'Klik tombol "Tambah Reimbursement" untuk menambahkan')
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
                          createTextVNode(" Batal ")
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
                        unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Menyimpan...")) : (openBlock(), createBlock("span", { key: 2 }, "Update Sales Order"))
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
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-85d6fbf3"]]);
export {
  Edit as default
};
