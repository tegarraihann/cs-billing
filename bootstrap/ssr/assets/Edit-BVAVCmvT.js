import { ref, computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, withModifiers, withDirectives, createCommentVNode, vModelText, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
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
    vendors: Array
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      order_number: props.salesOrder.order_number || "",
      customer: props.salesOrder.customer || "",
      shipper: props.salesOrder.shipper || "",
      bl_awb: props.salesOrder.bl_awb || "",
      pol: props.salesOrder.pol || "",
      pod: props.salesOrder.pod || "",
      eta: props.salesOrder.eta ? new Date(props.salesOrder.eta).toISOString().split("T")[0] : "",
      vessel: props.salesOrder.vessel || "",
      buying_breakdown: props.salesOrder.buying_breakdown || [{ vendor: "", amount: 0 }],
      selling_breakdown: props.salesOrder.selling_breakdown || [{ description: "", amount: 0 }]
    });
    const vendorDetails = ref([]);
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
              nominal: parseFloat(vendorData.nominal) || 0,
              rcvd_inv: vendorData.rcvd_inv || ""
            });
          });
        } else if (typeof props.salesOrder.vendors === "object" && !Array.isArray(props.salesOrder.vendors)) {
          vendorDetails.value.push({
            vendor_id: props.salesOrder.vendors.vendor_id || "",
            nama_vendor: props.salesOrder.vendors.company_name || props.salesOrder.vendors.nama_vendor || "",
            no_rekening: props.salesOrder.vendors.no_rekening || "",
            nama_rekening: props.salesOrder.vendors.nama_rekening || "",
            deskripsi: props.salesOrder.vendors.deskripsi || "",
            nominal: parseFloat(props.salesOrder.vendors.nominal) || 0,
            rcvd_inv: props.salesOrder.vendors.rcvd_inv || ""
          });
        }
      }
      if (vendorDetails.value.length === 0) {
        vendorDetails.value.push({
          vendor_id: "",
          nama_vendor: "",
          no_rekening: "",
          nama_rekening: "",
          deskripsi: "",
          nominal: 0,
          rcvd_inv: ""
        });
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
      vendorDetails.value.splice(index, 1);
    };
    const onVendorSelect = (index) => {
      const selectedVendor = props.vendors.find((v) => v.id == vendorDetails.value[index].vendor_id);
      if (selectedVendor) {
        vendorDetails.value[index].nama_vendor = selectedVendor.nama_vendor;
        vendorDetails.value[index].no_rekening = selectedVendor.nomor_rekening;
        vendorDetails.value[index].nama_rekening = selectedVendor.nama_rekening;
      }
    };
    const totalVendorCosts = computed(() => {
      return vendorDetails.value.reduce((total, vendor) => {
        return total + (parseFloat(vendor.nominal) || 0);
      }, 0);
    });
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
    const submit = () => {
      const formData = {
        ...form.data(),
        vendor_details: vendorDetails.value
      };
      form.transform((data) => formData).put(route("admin-keuangan.sales-orders.update", props.salesOrder.id), {
        onSuccess: () => {
        },
        onError: (errors) => {
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-4fb8ca02${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-4fb8ca02${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-4fb8ca02${_scopeId}><div class="flex items-center" data-v-4fb8ca02${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-4fb8ca02${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4fb8ca02${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-4fb8ca02${_scopeId}></path></svg></div><div data-v-4fb8ca02${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-4fb8ca02${_scopeId}>Edit Sales Order: ${ssrInterpolate(__props.salesOrder.order_number)}</h2><p class="text-sage-600" data-v-4fb8ca02${_scopeId}>Perbarui informasi sales order</p></div></div><div class="mt-4 sm:mt-0" data-v-4fb8ca02${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4fb8ca02${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-4fb8ca02${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><form class="space-y-6" data-v-4fb8ca02${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-4fb8ca02${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-4fb8ca02${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-4fb8ca02${_scopeId}>Informasi Dasar</h3></div><div class="p-6 space-y-4" data-v-4fb8ca02${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-4fb8ca02${_scopeId}><div data-v-4fb8ca02${_scopeId}><label for="order_number" class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}> Order Number <span class="text-red-500" data-v-4fb8ca02${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).order_number)} type="text" id="order_number" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan order number" data-v-4fb8ca02${_scopeId}>`);
            if (unref(form).errors.order_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-4fb8ca02${_scopeId}>${ssrInterpolate(unref(form).errors.order_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-4fb8ca02${_scopeId}><label for="customer" class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}> Customer <span class="text-red-500" data-v-4fb8ca02${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).customer)} type="text" id="customer" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan nama customer" data-v-4fb8ca02${_scopeId}>`);
            if (unref(form).errors.customer) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-4fb8ca02${_scopeId}>${ssrInterpolate(unref(form).errors.customer)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-4fb8ca02${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-4fb8ca02${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-4fb8ca02${_scopeId}>Informasi Pengiriman</h3></div><div class="p-6 space-y-4" data-v-4fb8ca02${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-4fb8ca02${_scopeId}><div data-v-4fb8ca02${_scopeId}><label for="shipper" class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}>Shipper</label><input${ssrRenderAttr("value", unref(form).shipper)} type="text" id="shipper" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan shipper" data-v-4fb8ca02${_scopeId}></div><div data-v-4fb8ca02${_scopeId}><label for="bl_awb" class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}>BL/AWB</label><input${ssrRenderAttr("value", unref(form).bl_awb)} type="text" id="bl_awb" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan BL/AWB" data-v-4fb8ca02${_scopeId}></div><div data-v-4fb8ca02${_scopeId}><label for="pol" class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}>POL</label><input${ssrRenderAttr("value", unref(form).pol)} type="text" id="pol" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Port of Loading" data-v-4fb8ca02${_scopeId}></div><div data-v-4fb8ca02${_scopeId}><label for="pod" class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}>POD</label><input${ssrRenderAttr("value", unref(form).pod)} type="text" id="pod" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Port of Discharge" data-v-4fb8ca02${_scopeId}></div><div data-v-4fb8ca02${_scopeId}><label for="eta" class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}>ETA</label><input${ssrRenderAttr("value", unref(form).eta)} type="date" id="eta" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-4fb8ca02${_scopeId}></div><div data-v-4fb8ca02${_scopeId}><label for="vessel" class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}>Vessel</label><input${ssrRenderAttr("value", unref(form).vessel)} type="text" id="vessel" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan vessel" data-v-4fb8ca02${_scopeId}></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-4fb8ca02${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-4fb8ca02${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-4fb8ca02${_scopeId}>Informasi Keuangan</h3></div><div class="p-6 space-y-4" data-v-4fb8ca02${_scopeId}><div class="space-y-4" data-v-4fb8ca02${_scopeId}><div class="flex items-center justify-between" data-v-4fb8ca02${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-4fb8ca02${_scopeId}>BUYING BREAKDOWN</label><button type="button" class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors" data-v-4fb8ca02${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4fb8ca02${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-4fb8ca02${_scopeId}></path></svg> Add Item </button></div><div class="space-y-3" data-v-4fb8ca02${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).buying_breakdown, (item, index) => {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border border-gray-200 rounded-lg" data-v-4fb8ca02${_scopeId}><div class="md:col-span-6" data-v-4fb8ca02${_scopeId}><input${ssrRenderAttr("value", item.vendor)} type="text" placeholder="Vendor name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-4fb8ca02${_scopeId}></div><div class="md:col-span-5" data-v-4fb8ca02${_scopeId}><input${ssrRenderAttr("value", item.amount)} type="number" step="0.01" placeholder="Amount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-4fb8ca02${_scopeId}></div><div class="md:col-span-1" data-v-4fb8ca02${_scopeId}><button type="button" class="w-full h-10 text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:border-red-400 transition-colors" data-v-4fb8ca02${_scopeId}><svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4fb8ca02${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-4fb8ca02${_scopeId}></path></svg></button></div></div>`);
            });
            _push2(`<!--]--></div><div class="p-2 bg-gray-50 rounded-md" data-v-4fb8ca02${_scopeId}><strong data-v-4fb8ca02${_scopeId}>Total Buying: ${ssrInterpolate(formatCurrency(totalBuying.value))}</strong></div></div><div class="space-y-4" data-v-4fb8ca02${_scopeId}><div class="flex items-center justify-between" data-v-4fb8ca02${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-4fb8ca02${_scopeId}>SELLING BREAKDOWN</label><button type="button" class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors" data-v-4fb8ca02${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4fb8ca02${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-4fb8ca02${_scopeId}></path></svg> Add Item </button></div><div class="space-y-3" data-v-4fb8ca02${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).selling_breakdown, (item, index) => {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-12 gap-3 p-3 border border-gray-200 rounded-lg" data-v-4fb8ca02${_scopeId}><div class="md:col-span-6" data-v-4fb8ca02${_scopeId}><input${ssrRenderAttr("value", item.description)} type="text" placeholder="Service description" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-4fb8ca02${_scopeId}></div><div class="md:col-span-5" data-v-4fb8ca02${_scopeId}><input${ssrRenderAttr("value", item.amount)} type="number" step="0.01" placeholder="Amount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-4fb8ca02${_scopeId}></div><div class="md:col-span-1" data-v-4fb8ca02${_scopeId}><button type="button" class="w-full h-10 text-red-600 hover:text-red-800 border border-red-300 rounded-md hover:border-red-400 transition-colors" data-v-4fb8ca02${_scopeId}><svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4fb8ca02${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-4fb8ca02${_scopeId}></path></svg></button></div></div>`);
            });
            _push2(`<!--]--></div><div class="p-2 bg-gray-50 rounded-md" data-v-4fb8ca02${_scopeId}><strong data-v-4fb8ca02${_scopeId}>Total Selling: ${ssrInterpolate(formatCurrency(totalSelling.value))}</strong></div></div><div data-v-4fb8ca02${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}>REVENUE (AUTO CALCULATED)</label><div class="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg" data-v-4fb8ca02${_scopeId}><div class="${ssrRenderClass([totalRevenue.value >= 0 ? "text-green-600" : "text-red-600", "text-lg font-bold"])}" data-v-4fb8ca02${_scopeId}>${ssrInterpolate(formatCurrency(totalRevenue.value))}</div><div class="text-sm text-gray-600 mt-1" data-v-4fb8ca02${_scopeId}> Selling: ${ssrInterpolate(formatCurrency(totalSelling.value))} - Buying: ${ssrInterpolate(formatCurrency(totalBuying.value))}</div></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-4fb8ca02${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-4fb8ca02${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-4fb8ca02${_scopeId}>Vendor Information (Buying)</h3></div><div class="p-6 space-y-4" data-v-4fb8ca02${_scopeId}><div class="flex items-center justify-between mb-4" data-v-4fb8ca02${_scopeId}><p class="text-sm text-gray-600" data-v-4fb8ca02${_scopeId}>Tambahkan detail vendor untuk setiap item buying</p><button type="button" class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors" data-v-4fb8ca02${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4fb8ca02${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-4fb8ca02${_scopeId}></path></svg> Add Vendor </button></div>`);
            if (vendorDetails.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" data-v-4fb8ca02${_scopeId}> No vendor details added yet. Click &quot;Add Vendor&quot; to start. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(vendorDetails.value, (vendorDetail, index) => {
              _push2(`<div class="border border-sage-200 rounded-lg p-4 space-y-4" data-v-4fb8ca02${_scopeId}><div class="flex justify-between items-center" data-v-4fb8ca02${_scopeId}><h5 class="font-medium text-sage-700" data-v-4fb8ca02${_scopeId}>Vendor #${ssrInterpolate(index + 1)}</h5><button type="button" class="text-red-600 hover:text-red-800 p-1" data-v-4fb8ca02${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-4fb8ca02${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-4fb8ca02${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-4fb8ca02${_scopeId}><div data-v-4fb8ca02${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}> Pilih Vendor <span class="text-red-500" data-v-4fb8ca02${_scopeId}>*</span></label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-4fb8ca02${_scopeId}><option value="" data-v-4fb8ca02${ssrIncludeBooleanAttr(Array.isArray(vendorDetail.vendor_id) ? ssrLooseContain(vendorDetail.vendor_id, "") : ssrLooseEqual(vendorDetail.vendor_id, "")) ? " selected" : ""}${_scopeId}>Pilih vendor...</option><!--[-->`);
              ssrRenderList(__props.vendors, (vendorOption) => {
                _push2(`<option${ssrRenderAttr("value", vendorOption.id)} data-v-4fb8ca02${ssrIncludeBooleanAttr(Array.isArray(vendorDetail.vendor_id) ? ssrLooseContain(vendorDetail.vendor_id, vendorOption.id) : ssrLooseEqual(vendorDetail.vendor_id, vendorOption.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendorOption.nama_vendor)}</option>`);
              });
              _push2(`<!--]--></select></div><div data-v-4fb8ca02${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}> Deskripsi Service </label><input${ssrRenderAttr("value", vendorDetail.deskripsi)} type="text" placeholder="Deskripsi layanan vendor" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-4fb8ca02${_scopeId}></div></div>`);
              if (vendorDetail.vendor_id) {
                _push2(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-sage-50 rounded-lg" data-v-4fb8ca02${_scopeId}><div data-v-4fb8ca02${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-4fb8ca02${_scopeId}>Nama Vendor</label><p class="text-sm text-gray-900" data-v-4fb8ca02${_scopeId}>${ssrInterpolate(vendorDetail.nama_vendor || "-")}</p></div><div data-v-4fb8ca02${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-4fb8ca02${_scopeId}>Nomor Rekening</label><p class="text-sm text-gray-900 font-mono" data-v-4fb8ca02${_scopeId}>${ssrInterpolate(vendorDetail.no_rekening || "-")}</p></div><div data-v-4fb8ca02${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-4fb8ca02${_scopeId}>Nama Rekening</label><p class="text-sm text-gray-900" data-v-4fb8ca02${_scopeId}>${ssrInterpolate(vendorDetail.nama_rekening || "-")}</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-4fb8ca02${_scopeId}><div data-v-4fb8ca02${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}> Nominal <span class="text-red-500" data-v-4fb8ca02${_scopeId}>*</span></label><input${ssrRenderAttr("value", vendorDetail.nominal)} type="number" step="0.01" placeholder="0" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-4fb8ca02${_scopeId}></div><div data-v-4fb8ca02${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-4fb8ca02${_scopeId}> RCVD INV </label><input${ssrRenderAttr("value", vendorDetail.rcvd_inv)} type="text" placeholder="Nomor invoice yang diterima" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-4fb8ca02${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]-->`);
            if (vendorDetails.value.length > 0) {
              _push2(`<div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg" data-v-4fb8ca02${_scopeId}><div class="flex justify-between items-center" data-v-4fb8ca02${_scopeId}><span class="font-medium text-blue-700" data-v-4fb8ca02${_scopeId}>Total Vendor Costs:</span><span class="text-xl font-bold text-blue-800" data-v-4fb8ca02${_scopeId}>${ssrInterpolate(formatCurrency(totalVendorCosts.value))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" data-v-4fb8ca02${_scopeId}>`);
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-4fb8ca02${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-4fb8ca02${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-4fb8ca02${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-4fb8ca02${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-4fb8ca02${_scopeId}>Memperbarui...</span>`);
            } else {
              _push2(`<span data-v-4fb8ca02${_scopeId}>Perbarui Sales Order</span>`);
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
                        createVNode("p", { class: "text-sage-600" }, "Perbarui informasi sales order")
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
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Dasar")
                    ]),
                    createVNode("div", { class: "p-6 space-y-4" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "order_number",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" Order Number "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).order_number = $event,
                            type: "text",
                            id: "order_number",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Masukkan order number"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).order_number]
                          ]),
                          unref(form).errors.order_number ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.order_number), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "customer",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" Customer "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).customer = $event,
                            type: "text",
                            id: "customer",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Masukkan nama customer"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).customer]
                          ]),
                          unref(form).errors.customer ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.customer), 1)) : createCommentVNode("", true)
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Pengiriman")
                    ]),
                    createVNode("div", { class: "p-6 space-y-4" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "shipper",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "Shipper"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).shipper = $event,
                            type: "text",
                            id: "shipper",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Masukkan shipper"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).shipper]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "bl_awb",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "BL/AWB"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).bl_awb = $event,
                            type: "text",
                            id: "bl_awb",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Masukkan BL/AWB"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).bl_awb]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "pol",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "POL"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pol = $event,
                            type: "text",
                            id: "pol",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Port of Loading"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pol]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "pod",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "POD"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).pod = $event,
                            type: "text",
                            id: "pod",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Port of Discharge"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).pod]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "eta",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "ETA"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).eta = $event,
                            type: "date",
                            id: "eta",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).eta]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "vessel",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "Vessel"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).vessel = $event,
                            type: "text",
                            id: "vessel",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Masukkan vessel"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).vessel]
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Keuangan")
                    ]),
                    createVNode("div", { class: "p-6 space-y-4" }, [
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
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
                        createVNode("div", { class: "p-2 bg-gray-50 rounded-md" }, [
                          createVNode("strong", null, "Total Buying: " + toDisplayString(formatCurrency(totalBuying.value)), 1)
                        ])
                      ]),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
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
                        createVNode("div", { class: "p-2 bg-gray-50 rounded-md" }, [
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
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Vendor Information (Buying)")
                    ]),
                    createVNode("div", { class: "p-6 space-y-4" }, [
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
                      disabled: unref(form).processing,
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
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4fb8ca02"]]);
export {
  Edit as default
};
