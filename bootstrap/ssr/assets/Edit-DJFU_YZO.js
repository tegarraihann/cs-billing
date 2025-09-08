import { ref, onMounted, computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, withModifiers, withDirectives, createCommentVNode, vModelText, vShow, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-VdCtsuep.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-DeTpBoIP.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    salesOrder: Object,
    vendors: Array,
    shipmentTypes: Array
  },
  setup(__props) {
    const props = __props;
    const sections = ref({
      basic: true,
      shipping: true,
      pricing: true,
      additional: true
    });
    const toggleSection = (section) => {
      sections.value[section] = !sections.value[section];
    };
    const form = useForm({
      order_number: props.salesOrder.order_number || "",
      ref_no: props.salesOrder.ref_no || "",
      so_date: props.salesOrder.so_date ? props.salesOrder.so_date.split("T")[0] : "",
      customer: props.salesOrder.customer || "",
      shipper: props.salesOrder.shipper || "",
      bl_awb: props.salesOrder.bl_awb || "",
      liner: props.salesOrder.liner || "",
      vessel: props.salesOrder.vessel || "",
      eta: props.salesOrder.eta ? props.salesOrder.eta.split("T")[0] : "",
      etd: props.salesOrder.etd ? props.salesOrder.etd.split("T")[0] : "",
      aju: props.salesOrder.aju || "",
      sppb_date: props.salesOrder.sppb_date ? props.salesOrder.sppb_date.split("T")[0] : "",
      shipment_type: props.salesOrder.shipment_type || "",
      pol: props.salesOrder.pol || "",
      pod: props.salesOrder.pod || "",
      gudang_utc: props.salesOrder.gudang_utc || "",
      party_lcl: props.salesOrder.party_lcl || "",
      prepared_by: props.salesOrder.prepared_by || "",
      exchange_rate: props.salesOrder.exchange_rate || "",
      commodity: props.salesOrder.commodity || "",
      qty: props.salesOrder.qty || "",
      net_weight: props.salesOrder.net_weight || "",
      measurement: props.salesOrder.measurement || "",
      container_no: props.salesOrder.container_no || "",
      invoice_number: props.salesOrder.invoice_number || "",
      invoice_date: props.salesOrder.invoice_date ? props.salesOrder.invoice_date.split("T")[0] : "",
      top: props.salesOrder.top || "",
      remarks: props.salesOrder.remarks || "",
      note: props.salesOrder.note || "",
      vendor_breakdown: []
    });
    onMounted(() => {
      if (props.salesOrder.vendor_breakdown && props.salesOrder.vendor_breakdown.length > 0) {
        form.vendor_breakdown = props.salesOrder.vendor_breakdown.map((item) => ({
          vendor_id: item.vendor_id || "",
          nama_vendor: item.nama_vendor || "",
          no_rekening: item.no_rekening || "",
          nama_rekening: item.nama_rekening || "",
          description: item.description || "",
          buying_amount: item.buying_amount || "",
          selling_amount: item.selling_amount || "",
          remarks: item.remarks || ""
        }));
      } else {
        addVendorItem();
      }
      if (form.exchange_rate) {
        formatExchangeRate();
      }
    });
    const addVendorItem = () => {
      form.vendor_breakdown.push({
        vendor_id: "",
        nama_vendor: "",
        no_rekening: "",
        nama_rekening: "",
        description: "",
        buying_amount: "",
        selling_amount: "",
        remarks: ""
      });
    };
    const removeVendorItem = (index) => {
      if (form.vendor_breakdown.length > 1) {
        form.vendor_breakdown.splice(index, 1);
      }
    };
    const onVendorSelect = (index) => {
      const selectedVendor = props.vendors.find((v) => v.id == form.vendor_breakdown[index].vendor_id);
      if (selectedVendor) {
        form.vendor_breakdown[index].nama_vendor = selectedVendor.nama_vendor;
        form.vendor_breakdown[index].no_rekening = selectedVendor.nomor_rekening;
        form.vendor_breakdown[index].nama_rekening = selectedVendor.nama_rekening;
      }
    };
    const formatNumber = (item, field) => {
      const value = item[field];
      if (!value) return;
      const numericValue = value.toString().replace(/[^\d]/g, "");
      const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      item[field] = formatted;
    };
    const formatExchangeRate = () => {
      const value = form.exchange_rate;
      if (!value) return;
      const numericValue = value.toString().replace(/[^\d.]/g, "");
      const parts = numericValue.split(".");
      if (parts[0]) {
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      form.exchange_rate = parts.join(".");
    };
    const formatCurrency = (amount) => {
      if (!amount && amount !== 0) return "Rp 0";
      const numericValue = typeof amount === "string" ? parseFloat(amount.replace(/[^\d]/g, "")) || 0 : amount;
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(numericValue);
    };
    const totalBuying = computed(() => {
      return form.vendor_breakdown.reduce((sum, item) => {
        const amount = parseFloat((item.buying_amount || "0").toString().replace(/[^\d]/g, "")) || 0;
        return sum + amount;
      }, 0);
    });
    const totalSelling = computed(() => {
      return form.vendor_breakdown.reduce((sum, item) => {
        const amount = parseFloat((item.selling_amount || "0").toString().replace(/[^\d]/g, "")) || 0;
        return sum + amount;
      }, 0);
    });
    const totalProfit = computed(() => {
      return totalSelling.value - totalBuying.value;
    });
    const getItemProfit = (item) => {
      const buying = parseFloat((item.buying_amount || "0").toString().replace(/[^\d]/g, "")) || 0;
      const selling = parseFloat((item.selling_amount || "0").toString().replace(/[^\d]/g, "")) || 0;
      return selling - buying;
    };
    const submit = () => {
      const cleanedData = {
        ...form.data(),
        vendor_breakdown: form.vendor_breakdown.map((item) => ({
          ...item,
          buying_amount: (item.buying_amount || "0").toString().replace(/[^\d]/g, ""),
          selling_amount: (item.selling_amount || "0").toString().replace(/[^\d]/g, "")
        })),
        exchange_rate: form.exchange_rate.toString().replace(/\./g, "")
      };
      form.transform(() => cleanedData).put(route("admin-keuangan.sales-orders.update", props.salesOrder.id), {
        onError: (errors) => {
          console.error("Validation errors:", errors);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-57f0d588${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-57f0d588${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-57f0d588${_scopeId}><div class="flex items-center" data-v-57f0d588${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-57f0d588${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-57f0d588${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-57f0d588${_scopeId}></path></svg></div><div data-v-57f0d588${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-57f0d588${_scopeId}>Edit Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h2><p class="text-sage-600" data-v-57f0d588${_scopeId}>Edit dokumen sales order dari admin CS</p></div></div><div class="mt-4 sm:mt-0" data-v-57f0d588${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-57f0d588${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-57f0d588${_scopeId2}></path></svg> Kembali `);
                } else {
                  return [
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
                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                      })
                    ])),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><form class="space-y-6" data-v-57f0d588${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-57f0d588${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-57f0d588${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-57f0d588${_scopeId}>Informasi Dasar</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-57f0d588${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-57f0d588${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.basic ? null : { display: "none" })}" class="p-6 space-y-4" data-v-57f0d588${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>ORDER NUMB <span class="text-red-500" data-v-57f0d588${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).order_number)} type="text" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.order_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.order_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>REF NO</label><input${ssrRenderAttr("value", unref(form).ref_no)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.ref_no) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.ref_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>DATE</label><input${ssrRenderAttr("value", unref(form).so_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.so_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.so_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>CUSTOMER <span class="text-red-500" data-v-57f0d588${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).customer)} type="text" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.customer) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.customer)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>SHIPPER</label><input${ssrRenderAttr("value", unref(form).shipper)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.shipper) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.shipper)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-57f0d588${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-57f0d588${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-57f0d588${_scopeId}>Informasi Pengiriman</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-57f0d588${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-57f0d588${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.shipping ? null : { display: "none" })}" class="p-6 space-y-4" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>BL/AWB</label><input${ssrRenderAttr("value", unref(form).bl_awb)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.bl_awb) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.bl_awb)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>LINER</label><input${ssrRenderAttr("value", unref(form).liner)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.liner) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.liner)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>VESSEL</label><input${ssrRenderAttr("value", unref(form).vessel)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.vessel) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.vessel)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>ETA</label><input${ssrRenderAttr("value", unref(form).eta)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.eta) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.eta)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>ETD</label><input${ssrRenderAttr("value", unref(form).etd)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.etd) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.etd)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>AJU</label><input${ssrRenderAttr("value", unref(form).aju)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.aju) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.aju)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>SPPB DATE</label><input${ssrRenderAttr("value", unref(form).sppb_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.sppb_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.sppb_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>SHIPMENT TYPE</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}><option value="" data-v-57f0d588${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "") : ssrLooseEqual(unref(form).shipment_type, "")) ? " selected" : ""}${_scopeId}>Pilih Shipment Type</option><!--[-->`);
            ssrRenderList(__props.shipmentTypes, (shipmentType) => {
              _push2(`<option${ssrRenderAttr("value", shipmentType.code)} data-v-57f0d588${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, shipmentType.code) : ssrLooseEqual(unref(form).shipment_type, shipmentType.code)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(shipmentType.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(form).errors.shipment_type) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.shipment_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>POL</label><input${ssrRenderAttr("value", unref(form).pol)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.pol) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.pol)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>POD</label><input${ssrRenderAttr("value", unref(form).pod)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.pod) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.pod)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>GUDANG/UTC</label><input${ssrRenderAttr("value", unref(form).gudang_utc)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.gudang_utc) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.gudang_utc)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>PARTY/LCL</label><input${ssrRenderAttr("value", unref(form).party_lcl)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.party_lcl) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.party_lcl)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>PREPARED BY</label><input${ssrRenderAttr("value", unref(form).prepared_by)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.prepared_by) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.prepared_by)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-57f0d588${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-57f0d588${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-57f0d588${_scopeId}>Informasi Vendor &amp; Pricing</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-57f0d588${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-57f0d588${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.pricing ? null : { display: "none" })}" class="p-6 space-y-6" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>EXCHANGE RATE</label><input${ssrRenderAttr("value", unref(form).exchange_rate)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 font-mono" placeholder="14.000" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.exchange_rate) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.exchange_rate)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-4" data-v-57f0d588${_scopeId}><div class="flex items-center justify-between" data-v-57f0d588${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-57f0d588${_scopeId}>Vendor Breakdown</h4><button type="button" class="inline-flex items-center px-3 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-57f0d588${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-57f0d588${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-57f0d588${_scopeId}></path></svg> Add Vendor Item </button></div>`);
            if (unref(form).vendor_breakdown.length === 0) {
              _push2(`<div class="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" data-v-57f0d588${_scopeId}><div class="text-gray-400 mb-2" data-v-57f0d588${_scopeId}><svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-57f0d588${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-57f0d588${_scopeId}></path></svg></div><p class="text-gray-500" data-v-57f0d588${_scopeId}>No vendor items added yet. Click &quot;Add Vendor Item&quot; to start.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(unref(form).vendor_breakdown, (item, index) => {
              _push2(`<div class="border border-gray-200 rounded-lg p-4 space-y-4" data-v-57f0d588${_scopeId}><div class="flex justify-between items-center" data-v-57f0d588${_scopeId}><h5 class="font-medium text-sage-700" data-v-57f0d588${_scopeId}>Vendor Item #${ssrInterpolate(index + 1)}</h5><button type="button" class="text-red-600 hover:text-red-800 p-1" data-v-57f0d588${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-57f0d588${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-57f0d588${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}> Vendor <span class="text-red-500" data-v-57f0d588${_scopeId}>*</span></label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}><option value="" data-v-57f0d588${ssrIncludeBooleanAttr(Array.isArray(item.vendor_id) ? ssrLooseContain(item.vendor_id, "") : ssrLooseEqual(item.vendor_id, "")) ? " selected" : ""}${_scopeId}>Pilih vendor...</option><!--[-->`);
              ssrRenderList(__props.vendors, (vendor) => {
                _push2(`<option${ssrRenderAttr("value", vendor.id)} data-v-57f0d588${ssrIncludeBooleanAttr(Array.isArray(item.vendor_id) ? ssrLooseContain(item.vendor_id, vendor.id) : ssrLooseEqual(item.vendor_id, vendor.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendor.nama_vendor)}</option>`);
              });
              _push2(`<!--]--></select></div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}> Service Description </label><input${ssrRenderAttr("value", item.description)} type="text" placeholder="Deskripsi layanan vendor" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}></div></div>`);
              if (item.vendor_id) {
                _push2(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-sage-50 rounded-lg" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-57f0d588${_scopeId}>Nama Vendor</label><p class="text-sm text-gray-900" data-v-57f0d588${_scopeId}>${ssrInterpolate(item.nama_vendor || "-")}</p></div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-57f0d588${_scopeId}>Nomor Rekening</label><p class="text-sm text-gray-900 font-mono" data-v-57f0d588${_scopeId}>${ssrInterpolate(item.no_rekening || "-")}</p></div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-57f0d588${_scopeId}>Nama Rekening</label><p class="text-sm text-gray-900" data-v-57f0d588${_scopeId}>${ssrInterpolate(item.nama_rekening || "-")}</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}> Buying Amount <span class="text-red-500" data-v-57f0d588${_scopeId}>*</span></label><input${ssrRenderAttr("value", item.buying_amount)} type="text" placeholder="0" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 font-mono" data-v-57f0d588${_scopeId}></div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}> Selling Amount <span class="text-red-500" data-v-57f0d588${_scopeId}>*</span></label><input${ssrRenderAttr("value", item.selling_amount)} type="text" placeholder="0" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 font-mono" data-v-57f0d588${_scopeId}></div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>Profit (Auto)</label><input${ssrRenderAttr("value", formatCurrency(getItemProfit(item)))} readonly class="${ssrRenderClass([getItemProfit(item) >= 0 ? "text-sage-700" : "text-red-600", "w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono"])}" data-v-57f0d588${_scopeId}></div></div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>Remarks</label><textarea rows="2" placeholder="Catatan untuk vendor ini..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-57f0d588${_scopeId}>${ssrInterpolate(item.remarks)}</textarea></div></div>`);
            });
            _push2(`<!--]-->`);
            if (unref(form).vendor_breakdown.length > 0) {
              _push2(`<div class="mt-6 p-4 bg-gradient-to-r from-sage-50 to-blue-50 border border-sage-200 rounded-lg" data-v-57f0d588${_scopeId}><h4 class="font-semibold text-sage-800 mb-3" data-v-57f0d588${_scopeId}>Summary</h4><div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-center" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><div class="text-sm text-gray-600" data-v-57f0d588${_scopeId}>Total Items</div><div class="text-xl font-bold text-sage-700" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).vendor_breakdown.length)}</div></div><div data-v-57f0d588${_scopeId}><div class="text-sm text-gray-600" data-v-57f0d588${_scopeId}>Total Buying</div><div class="text-xl font-bold text-blue-700" data-v-57f0d588${_scopeId}>${ssrInterpolate(formatCurrency(totalBuying.value))}</div></div><div data-v-57f0d588${_scopeId}><div class="text-sm text-gray-600" data-v-57f0d588${_scopeId}>Total Selling</div><div class="text-xl font-bold text-green-700" data-v-57f0d588${_scopeId}>${ssrInterpolate(formatCurrency(totalSelling.value))}</div></div><div data-v-57f0d588${_scopeId}><div class="text-sm text-gray-600" data-v-57f0d588${_scopeId}>Total Profit</div><div class="${ssrRenderClass([totalProfit.value >= 0 ? "text-sage-700" : "text-red-600", "text-xl font-bold"])}" data-v-57f0d588${_scopeId}>${ssrInterpolate(formatCurrency(totalProfit.value))}</div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-57f0d588${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-57f0d588${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-57f0d588${_scopeId}>Informasi Tambahan</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.value.additional }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-57f0d588${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-57f0d588${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.value.additional ? null : { display: "none" })}" class="p-6 space-y-4" data-v-57f0d588${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>COMMODITY/URAIAN BARANG</label><input${ssrRenderAttr("value", unref(form).commodity)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.commodity) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.commodity)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>QTY</label><input${ssrRenderAttr("value", unref(form).qty)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.qty) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.qty)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>NET WEIGHT (KG)</label><input${ssrRenderAttr("value", unref(form).net_weight)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.net_weight) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.net_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>MEAS (M³)</label><input${ssrRenderAttr("value", unref(form).measurement)} type="number" step="0.001" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.measurement) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.measurement)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>CONTAINER NO</label><input${ssrRenderAttr("value", unref(form).container_no)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.container_no) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.container_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-57f0d588${_scopeId}><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>INVOICE NUMB</label><input${ssrRenderAttr("value", unref(form).invoice_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.invoice_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>INVOICE DATE</label><input${ssrRenderAttr("value", unref(form).invoice_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.invoice_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>T.O.P</label><input${ssrRenderAttr("value", unref(form).top)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-57f0d588${_scopeId}>`);
            if (unref(form).errors.top) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.top)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>REMARKS</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" placeholder="Catatan umum untuk sales order ini..." data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea>`);
            if (unref(form).errors.remarks) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.remarks)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-57f0d588${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-57f0d588${_scopeId}>NOTE</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" placeholder="Catatan tambahan..." data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).note)}</textarea>`);
            if (unref(form).errors.note) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-57f0d588${_scopeId}>${ssrInterpolate(unref(form).errors.note)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" data-v-57f0d588${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.sales-orders.index"),
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing || unref(form).vendor_breakdown.length === 0) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-57f0d588${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-57f0d588${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-57f0d588${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-57f0d588${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-57f0d588${_scopeId}>Memperbarui...</span>`);
            } else {
              _push2(`<span data-v-57f0d588${_scopeId}>Perbarui Sales Order</span>`);
            }
            _push2(`</button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-white",
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
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Edit Sales Order: " + toDisplayString(__props.salesOrder.order_number), 1),
                        createVNode("p", { class: "text-sage-600" }, "Edit dokumen sales order dari admin CS")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.sales-orders.index"),
                        class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      }, {
                        default: withCtx(() => [
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
                              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                            })
                          ])),
                          createTextVNode(" Kembali ")
                        ]),
                        _: 1
                      }, 8, ["href"])
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
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.value.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M19 9l-7 7-7-7"
                        })
                      ], 2))
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
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
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
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.value.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M19 9l-7 7-7-7"
                        })
                      ], 2))
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
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
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
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
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
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "PREPARED BY"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).prepared_by = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).prepared_by]
                        ]),
                        unref(form).errors.prepared_by ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.prepared_by), 1)) : createCommentVNode("", true)
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
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Vendor & Pricing"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.value.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M19 9l-7 7-7-7"
                        })
                      ], 2))
                    ], 8, ["onClick"]),
                    withDirectives(createVNode("div", { class: "p-6 space-y-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "EXCHANGE RATE"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).exchange_rate = $event,
                          onInput: formatExchangeRate,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 font-mono",
                          placeholder: "14.000"
                        }, null, 40, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).exchange_rate]
                        ]),
                        unref(form).errors.exchange_rate ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.exchange_rate), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, "Vendor Breakdown"),
                          createVNode("button", {
                            type: "button",
                            onClick: addVendorItem,
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
                            createTextVNode(" Add Vendor Item ")
                          ])
                        ]),
                        unref(form).vendor_breakdown.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center py-8 border-2 border-dashed border-gray-300 rounded-lg"
                        }, [
                          createVNode("div", { class: "text-gray-400 mb-2" }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-12 h-12 mx-auto",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "1",
                                d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                              })
                            ]))
                          ]),
                          createVNode("p", { class: "text-gray-500" }, 'No vendor items added yet. Click "Add Vendor Item" to start.')
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(form).vendor_breakdown, (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: `vendor-${index}`,
                            class: "border border-gray-200 rounded-lg p-4 space-y-4"
                          }, [
                            createVNode("div", { class: "flex justify-between items-center" }, [
                              createVNode("h5", { class: "font-medium text-sage-700" }, "Vendor Item #" + toDisplayString(index + 1), 1),
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => removeVendorItem(index),
                                class: "text-red-600 hover:text-red-800 p-1"
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
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                                  createTextVNode(" Vendor "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                withDirectives(createVNode("select", {
                                  "onUpdate:modelValue": ($event) => item.vendor_id = $event,
                                  onChange: ($event) => onVendorSelect(index),
                                  class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, [
                                  createVNode("option", { value: "" }, "Pilih vendor..."),
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors, (vendor) => {
                                    return openBlock(), createBlock("option", {
                                      key: vendor.id,
                                      value: vendor.id
                                    }, toDisplayString(vendor.nama_vendor), 9, ["value"]);
                                  }), 128))
                                ], 40, ["onUpdate:modelValue", "onChange"]), [
                                  [vModelSelect, item.vendor_id]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Service Description "),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.description = $event,
                                  type: "text",
                                  placeholder: "Deskripsi layanan vendor",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.description]
                                ])
                              ])
                            ]),
                            item.vendor_id ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-sage-50 rounded-lg"
                            }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, "Nama Vendor"),
                                createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(item.nama_vendor || "-"), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, "Nomor Rekening"),
                                createVNode("p", { class: "text-sm text-gray-900 font-mono" }, toDisplayString(item.no_rekening || "-"), 1)
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, "Nama Rekening"),
                                createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(item.nama_rekening || "-"), 1)
                              ])
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                                  createTextVNode(" Buying Amount "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.buying_amount = $event,
                                  onInput: ($event) => formatNumber(item, "buying_amount"),
                                  type: "text",
                                  placeholder: "0",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 font-mono"
                                }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                  [vModelText, item.buying_amount]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                                  createTextVNode(" Selling Amount "),
                                  createVNode("span", { class: "text-red-500" }, "*")
                                ]),
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.selling_amount = $event,
                                  onInput: ($event) => formatNumber(item, "selling_amount"),
                                  type: "text",
                                  placeholder: "0",
                                  class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 font-mono"
                                }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                                  [vModelText, item.selling_amount]
                                ])
                              ]),
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Profit (Auto)"),
                                createVNode("input", {
                                  value: formatCurrency(getItemProfit(item)),
                                  readonly: "",
                                  class: ["w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono", getItemProfit(item) >= 0 ? "text-sage-700" : "text-red-600"]
                                }, null, 10, ["value"])
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Remarks"),
                              withDirectives(createVNode("textarea", {
                                "onUpdate:modelValue": ($event) => item.remarks = $event,
                                rows: "2",
                                placeholder: "Catatan untuk vendor ini...",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, item.remarks]
                              ])
                            ])
                          ]);
                        }), 128)),
                        unref(form).vendor_breakdown.length > 0 ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "mt-6 p-4 bg-gradient-to-r from-sage-50 to-blue-50 border border-sage-200 rounded-lg"
                        }, [
                          createVNode("h4", { class: "font-semibold text-sage-800 mb-3" }, "Summary"),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4 text-center" }, [
                            createVNode("div", null, [
                              createVNode("div", { class: "text-sm text-gray-600" }, "Total Items"),
                              createVNode("div", { class: "text-xl font-bold text-sage-700" }, toDisplayString(unref(form).vendor_breakdown.length), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("div", { class: "text-sm text-gray-600" }, "Total Buying"),
                              createVNode("div", { class: "text-xl font-bold text-blue-700" }, toDisplayString(formatCurrency(totalBuying.value)), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("div", { class: "text-sm text-gray-600" }, "Total Selling"),
                              createVNode("div", { class: "text-xl font-bold text-green-700" }, toDisplayString(formatCurrency(totalSelling.value)), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("div", { class: "text-sm text-gray-600" }, "Total Profit"),
                              createVNode("div", {
                                class: ["text-xl font-bold", totalProfit.value >= 0 ? "text-sage-700" : "text-red-600"]
                              }, toDisplayString(formatCurrency(totalProfit.value)), 3)
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.value.pricing]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", {
                      onClick: ($event) => toggleSection("additional"),
                      class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Tambahan"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.value.additional }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M19 9l-7 7-7-7"
                        })
                      ], 2))
                    ], 8, ["onClick"]),
                    withDirectives(createVNode("div", { class: "p-6 space-y-4" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "COMMODITY/URAIAN BARANG"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).commodity = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).commodity]
                          ]),
                          unref(form).errors.commodity ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.commodity), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "QTY"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).qty = $event,
                            type: "text",
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
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).net_weight]
                          ]),
                          unref(form).errors.net_weight ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.net_weight), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "MEAS (M³)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).measurement = $event,
                            type: "number",
                            step: "0.001",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).measurement]
                          ]),
                          unref(form).errors.measurement ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.measurement), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "CONTAINER NO"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).container_no = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).container_no]
                          ]),
                          unref(form).errors.container_no ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.container_no), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
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
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).top]
                          ]),
                          unref(form).errors.top ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.top), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "REMARKS"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).remarks = $event,
                          rows: "3",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none",
                          placeholder: "Catatan umum untuk sales order ini..."
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
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none",
                          placeholder: "Catatan tambahan..."
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).note]
                        ]),
                        unref(form).errors.note ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.note), 1)) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.value.additional]
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.sales-orders.index"),
                      class: "inline-flex items-center justify-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Batal ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(form).processing || unref(form).vendor_breakdown.length === 0,
                      class: "inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                      unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Memperbarui...")) : (openBlock(), createBlock("span", { key: 2 }, "Perbarui Sales Order"))
                    ], 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/SalesOrders/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-57f0d588"]]);
export {
  Edit as default
};
