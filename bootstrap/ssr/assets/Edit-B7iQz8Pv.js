import { ref, reactive, computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, withModifiers, withDirectives, createCommentVNode, vModelText, vShow, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-3WrZpWry.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-eolbs7Yt.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    salesOrder: Object,
    errors: Object,
    vendors: Array,
    shipmentTypes: Array
  },
  setup(__props) {
    const props = __props;
    const vendorDetails = ref([]);
    const form = useForm({
      order_number: props.salesOrder.order_number || "",
      customer: props.salesOrder.customer || "",
      shipper: props.salesOrder.shipper || "",
      bl_awb: props.salesOrder.bl_awb || "",
      liner: props.salesOrder.liner || "",
      vessel: props.salesOrder.vessel || "",
      eta: props.salesOrder.eta ? new Date(props.salesOrder.eta).toISOString().split("T")[0] : "",
      aju: props.salesOrder.aju || "",
      sppb_date: props.salesOrder.sppb_date ? new Date(props.salesOrder.sppb_date).toISOString().split("T")[0] : "",
      shipment_type: props.salesOrder.shipment_type || "",
      pol: props.salesOrder.pol || "",
      pod: props.salesOrder.pod || "",
      gudang_utc: props.salesOrder.gudang_utc || "",
      party_lcl: props.salesOrder.party_lcl || "",
      prepared_by: props.salesOrder.prepared_by || "",
      exchange_rate: props.salesOrder.exchange_rate || "",
      jenis_biaya: props.salesOrder.jenis_biaya || "",
      buying_breakdown: props.salesOrder.buying_breakdown || [{ vendor: "", amount: 0 }],
      selling_breakdown: props.salesOrder.selling_breakdown || [{ description: "", amount: 0 }],
      remarks: props.salesOrder.remarks || "",
      commodity: props.salesOrder.commodity || "",
      qty: props.salesOrder.qty || "",
      net_weight: props.salesOrder.net_weight || "",
      container_no: props.salesOrder.container_no || "",
      invoice_number: props.salesOrder.invoice_number || "",
      invoice_date: props.salesOrder.invoice_date ? new Date(props.salesOrder.invoice_date).toISOString().split("T")[0] : "",
      top: props.salesOrder.top || ""
    });
    const sections = reactive({
      basic: true,
      shipping: false,
      pricing: false,
      goods: false,
      invoice: false,
      vendor: false
    });
    const processing = ref(false);
    const toggleSection = (section) => {
      sections[section] = !sections[section];
    };
    (() => {
      if (props.salesOrder.vendors) {
        if (Array.isArray(props.salesOrder.vendors) && props.salesOrder.vendors.length > 0) {
          props.salesOrder.vendors.forEach((vendorData) => {
            vendorDetails.value.push({
              vendor_id: vendorData.vendor_id || "",
              nama_vendor: vendorData.company_name || vendorData.nama_vendor || "",
              no_rekening: vendorData.no_rekening || "",
              nama_rekening: vendorData.nama_rekening || "",
              deskripsi: vendorData.deskripsi || "",
              nominal: vendorData.nominal || 0,
              rcvd_inv: vendorData.rcvd_inv || ""
            });
          });
        } else if (typeof props.salesOrder.vendors === "object" && !Array.isArray(props.salesOrder.vendors)) {
          const vendorData = props.salesOrder.vendors;
          vendorDetails.value.push({
            vendor_id: vendorData.vendor_id || "",
            nama_vendor: vendorData.company_name || vendorData.nama_vendor || "",
            no_rekening: vendorData.no_rekening || "",
            nama_rekening: vendorData.nama_rekening || "",
            deskripsi: vendorData.deskripsi || "",
            nominal: vendorData.nominal || 0,
            rcvd_inv: vendorData.rcvd_inv || ""
          });
        }
      }
    })();
    const addVendorDetail = () => {
      vendorDetails.value.push({
        vendor_id: "",
        nama_vendor: "",
        no_rekening: "",
        nama_rekening: "",
        deskripsi: "",
        nominal: 0,
        rcvd_inv: ""
      });
    };
    const removeVendorDetail = (index) => {
      if (vendorDetails.value.length > 0) {
        vendorDetails.value.splice(index, 1);
      }
    };
    const onVendorSelect = (index) => {
      const vendorDetail = vendorDetails.value[index];
      if (vendorDetail.vendor_id) {
        const selectedVendor = props.vendors.find((v) => v.id == vendorDetail.vendor_id);
        if (selectedVendor) {
          vendorDetail.nama_vendor = selectedVendor.nama_vendor;
          vendorDetail.no_rekening = selectedVendor.nomor_rekening;
          vendorDetail.nama_rekening = selectedVendor.nama_rekening;
        }
      } else {
        vendorDetail.nama_vendor = "";
        vendorDetail.no_rekening = "";
        vendorDetail.nama_rekening = "";
      }
    };
    const addBuyingItem = () => {
      form.buying_breakdown.push({ vendor: "", amount: 0 });
    };
    const removeBuyingItem = (index) => {
      if (form.buying_breakdown.length > 1) {
        form.buying_breakdown.splice(index, 1);
      }
    };
    const addSellingItem = () => {
      form.selling_breakdown.push({ description: "", amount: 0 });
    };
    const removeSellingItem = (index) => {
      if (form.selling_breakdown.length > 1) {
        form.selling_breakdown.splice(index, 1);
      }
    };
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount || 0);
    };
    const totalBuying = computed(() => {
      return form.buying_breakdown.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    });
    const totalSelling = computed(() => {
      return form.selling_breakdown.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
    });
    const totalRevenue = computed(() => {
      return totalSelling.value - totalBuying.value;
    });
    const totalVendorCosts = computed(() => {
      return vendorDetails.value.reduce((sum, vendor) => sum + (parseFloat(vendor.nominal) || 0), 0);
    });
    const submit = () => {
      const formData = {
        ...form.data(),
        vendor_details: vendorDetails.value.filter((v) => v.vendor_id && v.nominal > 0)
      };
      processing.value = true;
      form.transform(() => formData).put(route("admin-cs.sales-orders.update", props.salesOrder.id), {
        onFinish: () => {
          processing.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-a6381e97${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-a6381e97${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-a6381e97${_scopeId}><div class="flex items-center" data-v-a6381e97${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-a6381e97${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-a6381e97${_scopeId}></path></svg></div><div data-v-a6381e97${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-a6381e97${_scopeId}>Edit Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h2><p class="text-sage-600" data-v-a6381e97${_scopeId}>Edit dokumen sales order</p></div></div><div class="mt-4 sm:mt-0" data-v-a6381e97${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-a6381e97${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><form class="space-y-6" data-v-a6381e97${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-a6381e97${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-a6381e97${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-a6381e97${_scopeId}>Informasi Dasar</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-a6381e97${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.basic ? null : { display: "none" })}" class="p-6 space-y-4" data-v-a6381e97${_scopeId}><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>ORDER NUMB *</label><input${ssrRenderAttr("value", unref(form).order_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-a6381e97${_scopeId}>`);
            if (__props.errors.order_number) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.order_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>CUSTOMER *</label><input${ssrRenderAttr("value", unref(form).customer)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-a6381e97${_scopeId}>`);
            if (__props.errors.customer) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.customer)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>SHIPPER</label><input${ssrRenderAttr("value", unref(form).shipper)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.shipper) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.shipper)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>BL/AWB</label><input${ssrRenderAttr("value", unref(form).bl_awb)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.bl_awb) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.bl_awb)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>PREPARED BY</label><input${ssrRenderAttr("value", unref(form).prepared_by)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.prepared_by) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.prepared_by)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-a6381e97${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-a6381e97${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-a6381e97${_scopeId}>Informasi Pengiriman</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-a6381e97${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.shipping ? null : { display: "none" })}" class="p-6 space-y-4" data-v-a6381e97${_scopeId}><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>LINER</label><input${ssrRenderAttr("value", unref(form).liner)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.liner) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.liner)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>VESSEL</label><input${ssrRenderAttr("value", unref(form).vessel)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.vessel) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.vessel)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>ETA</label><input${ssrRenderAttr("value", unref(form).eta)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.eta) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.eta)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>AJU</label><input${ssrRenderAttr("value", unref(form).aju)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.aju) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.aju)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>SPPB DATE</label><input${ssrRenderAttr("value", unref(form).sppb_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.sppb_date) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.sppb_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>SHIPMENT TYPE</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}><option value="" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, "") : ssrLooseEqual(unref(form).shipment_type, "")) ? " selected" : ""}${_scopeId}>Pilih Shipment Type</option><!--[-->`);
            ssrRenderList(__props.shipmentTypes, (shipmentType) => {
              _push2(`<option${ssrRenderAttr("value", shipmentType.code)} data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).shipment_type) ? ssrLooseContain(unref(form).shipment_type, shipmentType.code) : ssrLooseEqual(unref(form).shipment_type, shipmentType.code)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(shipmentType.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (__props.errors.shipment_type) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.shipment_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>POL</label><input${ssrRenderAttr("value", unref(form).pol)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.pol) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.pol)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>POD</label><input${ssrRenderAttr("value", unref(form).pod)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.pod) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.pod)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>GUDANG/UTC</label><input${ssrRenderAttr("value", unref(form).gudang_utc)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.gudang_utc) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.gudang_utc)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>PARTY/LCL</label><input${ssrRenderAttr("value", unref(form).party_lcl)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.party_lcl) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.party_lcl)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-a6381e97${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-a6381e97${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-a6381e97${_scopeId}>Informasi Harga</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-a6381e97${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.pricing ? null : { display: "none" })}" class="p-6 space-y-4" data-v-a6381e97${_scopeId}><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>EXCHANGE RATE</label><input${ssrRenderAttr("value", unref(form).exchange_rate)} type="number" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.exchange_rate) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.exchange_rate)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>JENIS BIAYA</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}><option value="" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "") : ssrLooseEqual(unref(form).jenis_biaya, "")) ? " selected" : ""}${_scopeId}>-- Pilih Jenis Biaya --</option><option value="OF/AF" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "OF/AF") : ssrLooseEqual(unref(form).jenis_biaya, "OF/AF")) ? " selected" : ""}${_scopeId}>OF/AF</option><option value="HANDLING" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "HANDLING") : ssrLooseEqual(unref(form).jenis_biaya, "HANDLING")) ? " selected" : ""}${_scopeId}>HANDLING</option><option value="PIB EDI" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "PIB EDI") : ssrLooseEqual(unref(form).jenis_biaya, "PIB EDI")) ? " selected" : ""}${_scopeId}>PIB EDI</option><option value="ADMIN DOC" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "ADMIN DOC") : ssrLooseEqual(unref(form).jenis_biaya, "ADMIN DOC")) ? " selected" : ""}${_scopeId}>ADMIN DOC</option><option value="TRUCKING" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "TRUCKING") : ssrLooseEqual(unref(form).jenis_biaya, "TRUCKING")) ? " selected" : ""}${_scopeId}>TRUCKING</option><option value="D/O CHARGES" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "D/O CHARGES") : ssrLooseEqual(unref(form).jenis_biaya, "D/O CHARGES")) ? " selected" : ""}${_scopeId}>D/O CHARGES</option><option value="LOLO" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "LOLO") : ssrLooseEqual(unref(form).jenis_biaya, "LOLO")) ? " selected" : ""}${_scopeId}>LOLO</option><option value="STORAGE" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "STORAGE") : ssrLooseEqual(unref(form).jenis_biaya, "STORAGE")) ? " selected" : ""}${_scopeId}>STORAGE</option><option value="REFUND" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "REFUND") : ssrLooseEqual(unref(form).jenis_biaya, "REFUND")) ? " selected" : ""}${_scopeId}>REFUND</option><option value="OTHER" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(unref(form).jenis_biaya) ? ssrLooseContain(unref(form).jenis_biaya, "OTHER") : ssrLooseEqual(unref(form).jenis_biaya, "OTHER")) ? " selected" : ""}${_scopeId}>OTHER</option></select>`);
            if (__props.errors.jenis_biaya) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.jenis_biaya)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><div class="flex items-center justify-between mb-3" data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-a6381e97${_scopeId}>BUYING BREAKDOWN</label><button type="button" class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors" data-v-a6381e97${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-a6381e97${_scopeId}></path></svg> Add Item </button></div><div class="space-y-3" data-v-a6381e97${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).buying_breakdown, (item, index) => {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border border-gray-200 rounded-lg" data-v-a6381e97${_scopeId}><div class="md:col-span-6" data-v-a6381e97${_scopeId}><input${ssrRenderAttr("value", item.vendor)} type="text" placeholder="Vendor name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}></div><div class="md:col-span-5" data-v-a6381e97${_scopeId}><input${ssrRenderAttr("value", item.amount)} type="number" step="0.01" placeholder="Amount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}></div><div class="md:col-span-1" data-v-a6381e97${_scopeId}><button type="button" class="w-full h-10 text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:border-red-400 transition-colors" data-v-a6381e97${_scopeId}><svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-a6381e97${_scopeId}></path></svg></button></div></div>`);
            });
            _push2(`<!--]--></div><div class="mt-2 p-2 bg-gray-50 rounded-md" data-v-a6381e97${_scopeId}><strong data-v-a6381e97${_scopeId}>Total Buying: ${ssrInterpolate(formatCurrency(totalBuying.value))}</strong></div></div><div data-v-a6381e97${_scopeId}><div class="flex items-center justify-between mb-3" data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-a6381e97${_scopeId}>SELLING BREAKDOWN</label><button type="button" class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors" data-v-a6381e97${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-a6381e97${_scopeId}></path></svg> Add Item </button></div><div class="space-y-3" data-v-a6381e97${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).selling_breakdown, (item, index) => {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border border-gray-200 rounded-lg" data-v-a6381e97${_scopeId}><div class="md:col-span-6" data-v-a6381e97${_scopeId}><input${ssrRenderAttr("value", item.description)} type="text" placeholder="Service description" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}></div><div class="md:col-span-5" data-v-a6381e97${_scopeId}><input${ssrRenderAttr("value", item.amount)} type="number" step="0.01" placeholder="Amount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}></div><div class="md:col-span-1" data-v-a6381e97${_scopeId}><button type="button" class="w-full h-10 text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:border-red-400 transition-colors" data-v-a6381e97${_scopeId}><svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-a6381e97${_scopeId}></path></svg></button></div></div>`);
            });
            _push2(`<!--]--></div><div class="mt-2 p-2 bg-gray-50 rounded-md" data-v-a6381e97${_scopeId}><strong data-v-a6381e97${_scopeId}>Total Selling: ${ssrInterpolate(formatCurrency(totalSelling.value))}</strong></div></div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>REVENUE (AUTO CALCULATED)</label><div class="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg" data-v-a6381e97${_scopeId}><div class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-green-600" : "text-red-600", "text-lg font-bold"])}" data-v-a6381e97${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</div><div class="text-sm text-gray-600 mt-1" data-v-a6381e97${_scopeId}> Selling: ${ssrInterpolate(formatCurrency(totalSelling.value))} - Buying: ${ssrInterpolate(formatCurrency(totalBuying.value))}</div></div></div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>REMARKS</label><textarea rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>${ssrInterpolate(unref(form).remarks)}</textarea>`);
            if (__props.errors.remarks) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.remarks)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-a6381e97${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-a6381e97${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-a6381e97${_scopeId}>Informasi Barang</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-a6381e97${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.goods ? null : { display: "none" })}" class="p-6 space-y-4" data-v-a6381e97${_scopeId}><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>COMMODITY/URAIAN BARANG</label><textarea rows="3" placeholder="Masukkan uraian barang/commodity yang detail" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none" data-v-a6381e97${_scopeId}>${ssrInterpolate(unref(form).commodity)}</textarea>`);
            if (__props.errors.commodity) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.commodity)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-a6381e97${_scopeId}><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>QTY</label><input${ssrRenderAttr("value", unref(form).qty)} type="number" min="0" placeholder="Masukkan quantity" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.qty) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.qty)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>NET WEIGHT (KG)</label><input${ssrRenderAttr("value", unref(form).net_weight)} type="number" step="0.01" min="0" placeholder="Masukkan berat netto dalam kg" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.net_weight) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.net_weight)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>CONTAINER NO</label><input${ssrRenderAttr("value", unref(form).container_no)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.container_no) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.container_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-a6381e97${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-a6381e97${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-a6381e97${_scopeId}>Informasi Invoice</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.invoice }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-a6381e97${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.invoice ? null : { display: "none" })}" class="p-6 space-y-4" data-v-a6381e97${_scopeId}><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>INVOICE NUMB</label><input${ssrRenderAttr("value", unref(form).invoice_number)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.invoice_number) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.invoice_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>INVOICE DATE</label><input${ssrRenderAttr("value", unref(form).invoice_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.invoice_date) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.invoice_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}>T.O.P</label><input${ssrRenderAttr("value", unref(form).top)} type="text" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}>`);
            if (__props.errors.top) {
              _push2(`<div class="text-red-600 text-sm mt-1" data-v-a6381e97${_scopeId}>${ssrInterpolate(__props.errors.top)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-a6381e97${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors" data-v-a6381e97${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-a6381e97${_scopeId}>Vendor Information (Buying)</h3><svg class="${ssrRenderClass([{ "rotate-180": !sections.vendor }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-a6381e97${_scopeId}></path></svg></div><div style="${ssrRenderStyle(sections.vendor ? null : { display: "none" })}" class="p-6 space-y-4" data-v-a6381e97${_scopeId}><div class="flex items-center justify-between mb-4" data-v-a6381e97${_scopeId}><p class="text-sm text-gray-600" data-v-a6381e97${_scopeId}>Tambahkan detail vendor untuk setiap item buying</p><button type="button" class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors" data-v-a6381e97${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-a6381e97${_scopeId}></path></svg> Add Vendor </button></div>`);
            if (vendorDetails.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" data-v-a6381e97${_scopeId}> No vendor details added yet. Click &quot;Add Vendor&quot; to start. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(vendorDetails.value, (vendorDetail, index) => {
              _push2(`<div class="border border-sage-200 rounded-lg p-4 space-y-4" data-v-a6381e97${_scopeId}><div class="flex justify-between items-center" data-v-a6381e97${_scopeId}><h5 class="font-medium text-sage-700" data-v-a6381e97${_scopeId}>Vendor #${ssrInterpolate(index + 1)}</h5><button type="button" class="text-red-600 hover:text-red-800 p-1" data-v-a6381e97${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-a6381e97${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-a6381e97${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-a6381e97${_scopeId}><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}> Pilih Vendor <span class="text-red-500" data-v-a6381e97${_scopeId}>*</span></label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}><option value="" data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(vendorDetail.vendor_id) ? ssrLooseContain(vendorDetail.vendor_id, "") : ssrLooseEqual(vendorDetail.vendor_id, "")) ? " selected" : ""}${_scopeId}>Pilih vendor...</option><!--[-->`);
              ssrRenderList(__props.vendors, (vendorOption) => {
                _push2(`<option${ssrRenderAttr("value", vendorOption.id)} data-v-a6381e97${ssrIncludeBooleanAttr(Array.isArray(vendorDetail.vendor_id) ? ssrLooseContain(vendorDetail.vendor_id, vendorOption.id) : ssrLooseEqual(vendorDetail.vendor_id, vendorOption.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendorOption.nama_vendor)}</option>`);
              });
              _push2(`<!--]--></select></div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}> Deskripsi Service </label><input${ssrRenderAttr("value", vendorDetail.deskripsi)} type="text" placeholder="Deskripsi layanan vendor" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}></div></div>`);
              if (vendorDetail.vendor_id) {
                _push2(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-sage-50 rounded-lg" data-v-a6381e97${_scopeId}><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-a6381e97${_scopeId}>Nama Vendor</label><p class="text-sm text-gray-900" data-v-a6381e97${_scopeId}>${ssrInterpolate(vendorDetail.nama_vendor || "-")}</p></div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-a6381e97${_scopeId}>Nomor Rekening</label><p class="text-sm text-gray-900 font-mono" data-v-a6381e97${_scopeId}>${ssrInterpolate(vendorDetail.no_rekening || "-")}</p></div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-a6381e97${_scopeId}>Nama Rekening</label><p class="text-sm text-gray-900" data-v-a6381e97${_scopeId}>${ssrInterpolate(vendorDetail.nama_rekening || "-")}</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-a6381e97${_scopeId}><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}> Nominal <span class="text-red-500" data-v-a6381e97${_scopeId}>*</span></label><input${ssrRenderAttr("value", vendorDetail.nominal)} type="number" step="0.01" placeholder="0" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}></div><div data-v-a6381e97${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-a6381e97${_scopeId}> RCVD INV </label><input${ssrRenderAttr("value", vendorDetail.rcvd_inv)} type="text" placeholder="Nomor invoice yang diterima" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-a6381e97${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]-->`);
            if (vendorDetails.value.length > 0) {
              _push2(`<div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg" data-v-a6381e97${_scopeId}><div class="flex justify-between items-center" data-v-a6381e97${_scopeId}><span class="font-medium text-blue-700" data-v-a6381e97${_scopeId}>Total Vendor Costs:</span><span class="text-xl font-bold text-blue-800" data-v-a6381e97${_scopeId}>${ssrInterpolate(formatCurrency(totalVendorCosts.value))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6" data-v-a6381e97${_scopeId}><div class="flex justify-end space-x-4" data-v-a6381e97${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.sales-orders.index"),
              class: "px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-6 py-3 bg-sage-600 text-white font-medium rounded-lg hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-colors disabled:opacity-50" data-v-a6381e97${_scopeId}>`);
            if (processing.value) {
              _push2(`<span data-v-a6381e97${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-a6381e97${_scopeId}>Simpan Perubahan</span>`);
            }
            _push2(`</button></div></div></form></div>`);
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
                        createVNode("p", { class: "text-sage-600" }, "Edit dokumen sales order")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.sales-orders.index"),
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
                        class: [{ "rotate-180": !sections.basic }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "ORDER NUMB *"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).order_number = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).order_number]
                        ]),
                        __props.errors.order_number ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.order_number), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "CUSTOMER *"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).customer = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                          required: ""
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).customer]
                        ]),
                        __props.errors.customer ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.customer), 1)) : createCommentVNode("", true)
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
                        __props.errors.shipper ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.shipper), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "BL/AWB"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).bl_awb = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).bl_awb]
                        ]),
                        __props.errors.bl_awb ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.bl_awb), 1)) : createCommentVNode("", true)
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
                        __props.errors.prepared_by ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.prepared_by), 1)) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.basic]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", {
                      onClick: ($event) => toggleSection("shipping"),
                      class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Pengiriman"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.shipping }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "LINER"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).liner = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).liner]
                        ]),
                        __props.errors.liner ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.liner), 1)) : createCommentVNode("", true)
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
                        __props.errors.vessel ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.vessel), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "ETA"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).eta = $event,
                          type: "date",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).eta]
                        ]),
                        __props.errors.eta ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.eta), 1)) : createCommentVNode("", true)
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
                        __props.errors.aju ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.aju), 1)) : createCommentVNode("", true)
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
                        __props.errors.sppb_date ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.sppb_date), 1)) : createCommentVNode("", true)
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
                        __props.errors.shipment_type ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.shipment_type), 1)) : createCommentVNode("", true)
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
                        __props.errors.pol ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.pol), 1)) : createCommentVNode("", true)
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
                        __props.errors.pod ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.pod), 1)) : createCommentVNode("", true)
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
                        __props.errors.gudang_utc ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.gudang_utc), 1)) : createCommentVNode("", true)
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
                        __props.errors.party_lcl ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.party_lcl), 1)) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.shipping]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", {
                      onClick: ($event) => toggleSection("pricing"),
                      class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Harga"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.pricing }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "EXCHANGE RATE"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).exchange_rate = $event,
                          type: "number",
                          step: "0.01",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).exchange_rate]
                        ]),
                        __props.errors.exchange_rate ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.exchange_rate), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "JENIS BIAYA"),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).jenis_biaya = $event,
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, [
                          createVNode("option", { value: "" }, "-- Pilih Jenis Biaya --"),
                          createVNode("option", { value: "OF/AF" }, "OF/AF"),
                          createVNode("option", { value: "HANDLING" }, "HANDLING"),
                          createVNode("option", { value: "PIB EDI" }, "PIB EDI"),
                          createVNode("option", { value: "ADMIN DOC" }, "ADMIN DOC"),
                          createVNode("option", { value: "TRUCKING" }, "TRUCKING"),
                          createVNode("option", { value: "D/O CHARGES" }, "D/O CHARGES"),
                          createVNode("option", { value: "LOLO" }, "LOLO"),
                          createVNode("option", { value: "STORAGE" }, "STORAGE"),
                          createVNode("option", { value: "REFUND" }, "REFUND"),
                          createVNode("option", { value: "OTHER" }, "OTHER")
                        ], 8, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).jenis_biaya]
                        ]),
                        __props.errors.jenis_biaya ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.jenis_biaya), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "BUYING BREAKDOWN"),
                          createVNode("button", {
                            type: "button",
                            onClick: addBuyingItem,
                            class: "inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4 mr-1",
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
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).buying_breakdown, (item, index) => {
                            return openBlock(), createBlock("div", {
                              key: "buying-" + index,
                              class: "grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border border-gray-200 rounded-lg"
                            }, [
                              createVNode("div", { class: "md:col-span-6" }, [
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.vendor = $event,
                                  type: "text",
                                  placeholder: "Vendor name",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.vendor]
                                ])
                              ]),
                              createVNode("div", { class: "md:col-span-5" }, [
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.amount = $event,
                                  type: "number",
                                  step: "0.01",
                                  placeholder: "Amount",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.amount]
                                ])
                              ]),
                              createVNode("div", { class: "md:col-span-1" }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeBuyingItem(index),
                                  class: "w-full h-10 text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:border-red-400 transition-colors"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4 mx-auto",
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
                              ])
                            ]);
                          }), 128))
                        ]),
                        createVNode("div", { class: "mt-2 p-2 bg-gray-50 rounded-md" }, [
                          createVNode("strong", null, "Total Buying: " + toDisplayString(formatCurrency(totalBuying.value)), 1)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "SELLING BREAKDOWN"),
                          createVNode("button", {
                            type: "button",
                            onClick: addSellingItem,
                            class: "inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-4 h-4 mr-1",
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
                        ]),
                        createVNode("div", { class: "space-y-3" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).selling_breakdown, (item, index) => {
                            return openBlock(), createBlock("div", {
                              key: "selling-" + index,
                              class: "grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border border-gray-200 rounded-lg"
                            }, [
                              createVNode("div", { class: "md:col-span-6" }, [
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.description = $event,
                                  type: "text",
                                  placeholder: "Service description",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.description]
                                ])
                              ]),
                              createVNode("div", { class: "md:col-span-5" }, [
                                withDirectives(createVNode("input", {
                                  "onUpdate:modelValue": ($event) => item.amount = $event,
                                  type: "number",
                                  step: "0.01",
                                  placeholder: "Amount",
                                  class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                                }, null, 8, ["onUpdate:modelValue"]), [
                                  [vModelText, item.amount]
                                ])
                              ]),
                              createVNode("div", { class: "md:col-span-1" }, [
                                createVNode("button", {
                                  type: "button",
                                  onClick: ($event) => removeSellingItem(index),
                                  class: "w-full h-10 text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:border-red-400 transition-colors"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4 mx-auto",
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
                              ])
                            ]);
                          }), 128))
                        ]),
                        createVNode("div", { class: "mt-2 p-2 bg-gray-50 rounded-md" }, [
                          createVNode("strong", null, "Total Selling: " + toDisplayString(formatCurrency(totalSelling.value)), 1)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "REVENUE (AUTO CALCULATED)"),
                        createVNode("div", { class: "p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg" }, [
                          createVNode("div", {
                            class: ["text-lg font-bold", totalRevenue.value >= 0 ? "text-green-600" : "text-red-600"]
                          }, toDisplayString(formatCurrency(totalRevenue.value)), 3),
                          createVNode("div", { class: "text-sm text-gray-600 mt-1" }, " Selling: " + toDisplayString(formatCurrency(totalSelling.value)) + " - Buying: " + toDisplayString(formatCurrency(totalBuying.value)), 1)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "REMARKS"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).remarks = $event,
                          rows: "3",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).remarks]
                        ]),
                        __props.errors.remarks ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.remarks), 1)) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.pricing]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", {
                      onClick: ($event) => toggleSection("goods"),
                      class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Barang"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.goods }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "COMMODITY/URAIAN BARANG"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).commodity = $event,
                          rows: "3",
                          placeholder: "Masukkan uraian barang/commodity yang detail",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 resize-none"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).commodity]
                        ]),
                        __props.errors.commodity ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.commodity), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
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
                          __props.errors.qty ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-red-600 text-sm mt-1"
                          }, toDisplayString(__props.errors.qty), 1)) : createCommentVNode("", true)
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
                          __props.errors.net_weight ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-red-600 text-sm mt-1"
                          }, toDisplayString(__props.errors.net_weight), 1)) : createCommentVNode("", true)
                        ])
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
                        __props.errors.container_no ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.container_no), 1)) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.goods]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", {
                      onClick: ($event) => toggleSection("invoice"),
                      class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Invoice"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.invoice }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "INVOICE NUMB"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).invoice_number = $event,
                          type: "text",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).invoice_number]
                        ]),
                        __props.errors.invoice_number ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.invoice_number), 1)) : createCommentVNode("", true)
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
                        __props.errors.invoice_date ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.invoice_date), 1)) : createCommentVNode("", true)
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
                        __props.errors.top ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-red-600 text-sm mt-1"
                        }, toDisplayString(__props.errors.top), 1)) : createCommentVNode("", true)
                      ])
                    ], 512), [
                      [vShow, sections.invoice]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", {
                      onClick: ($event) => toggleSection("vendor"),
                      class: "px-6 py-4 border-b border-sage-200 bg-sage-50 cursor-pointer flex justify-between items-center hover:bg-sage-100 transition-colors"
                    }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Vendor Information (Buying)"),
                      (openBlock(), createBlock("svg", {
                        class: [{ "rotate-180": !sections.vendor }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("p", { class: "text-sm text-gray-600" }, "Tambahkan detail vendor untuk setiap item buying"),
                        createVNode("button", {
                          type: "button",
                          onClick: addVendorDetail,
                          class: "inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 mr-1",
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
                          createTextVNode(" Add Vendor ")
                        ])
                      ]),
                      vendorDetails.value.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg"
                      }, ' No vendor details added yet. Click "Add Vendor" to start. ')) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(vendorDetails.value, (vendorDetail, index) => {
                        return openBlock(), createBlock("div", {
                          key: "vendor-detail-" + index,
                          class: "border border-sage-200 rounded-lg p-4 space-y-4"
                        }, [
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("h5", { class: "font-medium text-sage-700" }, "Vendor #" + toDisplayString(index + 1), 1),
                            createVNode("button", {
                              type: "button",
                              onClick: ($event) => removeVendorDetail(index),
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
                                createTextVNode(" Pilih Vendor "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              withDirectives(createVNode("select", {
                                "onUpdate:modelValue": ($event) => vendorDetail.vendor_id = $event,
                                onChange: ($event) => onVendorSelect(index),
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, [
                                createVNode("option", { value: "" }, "Pilih vendor..."),
                                (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors, (vendorOption) => {
                                  return openBlock(), createBlock("option", {
                                    key: vendorOption.id,
                                    value: vendorOption.id
                                  }, toDisplayString(vendorOption.nama_vendor), 9, ["value"]);
                                }), 128))
                              ], 40, ["onUpdate:modelValue", "onChange"]), [
                                [vModelSelect, vendorDetail.vendor_id]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Deskripsi Service "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => vendorDetail.deskripsi = $event,
                                type: "text",
                                placeholder: "Deskripsi layanan vendor",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, vendorDetail.deskripsi]
                              ])
                            ])
                          ]),
                          vendorDetail.vendor_id ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-sage-50 rounded-lg"
                          }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, "Nama Vendor"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(vendorDetail.nama_vendor || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, "Nomor Rekening"),
                              createVNode("p", { class: "text-sm text-gray-900 font-mono" }, toDisplayString(vendorDetail.no_rekening || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, "Nama Rekening"),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(vendorDetail.nama_rekening || "-"), 1)
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                                createTextVNode(" Nominal "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => vendorDetail.nominal = $event,
                                type: "number",
                                step: "0.01",
                                placeholder: "0",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, vendorDetail.nominal]
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " RCVD INV "),
                              withDirectives(createVNode("input", {
                                "onUpdate:modelValue": ($event) => vendorDetail.rcvd_inv = $event,
                                type: "text",
                                placeholder: "Nomor invoice yang diterima",
                                class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                              }, null, 8, ["onUpdate:modelValue"]), [
                                [vModelText, vendorDetail.rcvd_inv]
                              ])
                            ])
                          ])
                        ]);
                      }), 128)),
                      vendorDetails.value.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                      }, [
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("span", { class: "font-medium text-blue-700" }, "Total Vendor Costs:"),
                          createVNode("span", { class: "text-xl font-bold text-blue-800" }, toDisplayString(formatCurrency(totalVendorCosts.value)), 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ], 512), [
                      [vShow, sections.vendor]
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                    createVNode("div", { class: "flex justify-end space-x-4" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.sales-orders.index"),
                        class: "px-6 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: processing.value,
                        class: "px-6 py-3 bg-sage-600 text-white font-medium rounded-lg hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 transition-colors disabled:opacity-50"
                      }, [
                        processing.value ? (openBlock(), createBlock("span", { key: 0 }, "Menyimpan...")) : (openBlock(), createBlock("span", { key: 1 }, "Simpan Perubahan"))
                      ], 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/SalesOrders/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a6381e97"]]);
export {
  Edit as default
};
