import { ref, computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, withDirectives, createCommentVNode, vModelText, toDisplayString, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-UNX0Jsz9.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-1lZGX5DV.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    customers: Array,
    vendors: Array,
    orderNumber: String
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      order_number: props.orderNumber || "",
      ref_no: "",
      so_date: "",
      customer: "",
      shipper: "",
      bl_awb: "",
      pol: "",
      pod: "",
      eta: "",
      etd: "",
      vessel: "",
      measurement: "",
      buying: 0,
      selling: 0,
      revenue: 0
    });
    const vendorDetails = ref([]);
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
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(amount);
    };
    const submit = () => {
      const formData = {
        ...form.data(),
        vendor_details: vendorDetails.value
      };
      form.transform((data) => formData).post(route("admin-keuangan.sales-orders.store"), {
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
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-ffe57bfe${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-ffe57bfe${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-ffe57bfe${_scopeId}><div class="flex items-center" data-v-ffe57bfe${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-ffe57bfe${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ffe57bfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-ffe57bfe${_scopeId}></path></svg></div><div data-v-ffe57bfe${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-ffe57bfe${_scopeId}>Buat Sales Order Baru</h2><p class="text-sage-600" data-v-ffe57bfe${_scopeId}>Buat dokumen sales order untuk pelanggan</p></div></div><div class="mt-4 sm:mt-0" data-v-ffe57bfe${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.sales-orders.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ffe57bfe${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-ffe57bfe${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><form class="space-y-6" data-v-ffe57bfe${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-ffe57bfe${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-ffe57bfe${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-ffe57bfe${_scopeId}>Informasi Dasar</h3></div><div class="p-6 space-y-4" data-v-ffe57bfe${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-ffe57bfe${_scopeId}><div data-v-ffe57bfe${_scopeId}><label for="order_number" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}> Order Number <span class="text-red-500" data-v-ffe57bfe${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).order_number)} type="text" id="order_number" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan order number" data-v-ffe57bfe${_scopeId}>`);
            if (unref(form).errors.order_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-ffe57bfe${_scopeId}>${ssrInterpolate(unref(form).errors.order_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-ffe57bfe${_scopeId}><label for="ref_no" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}> Ref No </label><input${ssrRenderAttr("value", unref(form).ref_no)} type="text" id="ref_no" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan ref number" data-v-ffe57bfe${_scopeId}>`);
            if (unref(form).errors.ref_no) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-ffe57bfe${_scopeId}>${ssrInterpolate(unref(form).errors.ref_no)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-ffe57bfe${_scopeId}><label for="so_date" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}> Date </label><input${ssrRenderAttr("value", unref(form).so_date)} type="date" id="so_date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ffe57bfe${_scopeId}>`);
            if (unref(form).errors.so_date) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-ffe57bfe${_scopeId}>${ssrInterpolate(unref(form).errors.so_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-ffe57bfe${_scopeId}><div data-v-ffe57bfe${_scopeId}><label for="customer" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}> Customer <span class="text-red-500" data-v-ffe57bfe${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).customer)} type="text" id="customer" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan nama customer" data-v-ffe57bfe${_scopeId}>`);
            if (unref(form).errors.customer) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-ffe57bfe${_scopeId}>${ssrInterpolate(unref(form).errors.customer)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-ffe57bfe${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-ffe57bfe${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-ffe57bfe${_scopeId}>Informasi Pengiriman</h3></div><div class="p-6 space-y-4" data-v-ffe57bfe${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-ffe57bfe${_scopeId}><div data-v-ffe57bfe${_scopeId}><label for="shipper" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}>Shipper</label><input${ssrRenderAttr("value", unref(form).shipper)} type="text" id="shipper" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan shipper" data-v-ffe57bfe${_scopeId}></div><div data-v-ffe57bfe${_scopeId}><label for="bl_awb" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}>BL/AWB</label><input${ssrRenderAttr("value", unref(form).bl_awb)} type="text" id="bl_awb" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan BL/AWB" data-v-ffe57bfe${_scopeId}></div><div data-v-ffe57bfe${_scopeId}><label for="pol" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}>POL</label><input${ssrRenderAttr("value", unref(form).pol)} type="text" id="pol" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Port of Loading" data-v-ffe57bfe${_scopeId}></div><div data-v-ffe57bfe${_scopeId}><label for="pod" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}>POD</label><input${ssrRenderAttr("value", unref(form).pod)} type="text" id="pod" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Port of Discharge" data-v-ffe57bfe${_scopeId}></div><div data-v-ffe57bfe${_scopeId}><label for="eta" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}>ETA</label><input${ssrRenderAttr("value", unref(form).eta)} type="date" id="eta" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ffe57bfe${_scopeId}></div><div data-v-ffe57bfe${_scopeId}><label for="vessel" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}>Vessel</label><input${ssrRenderAttr("value", unref(form).vessel)} type="text" id="vessel" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Masukkan vessel" data-v-ffe57bfe${_scopeId}></div><div data-v-ffe57bfe${_scopeId}><label for="etd" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}>ETD</label><input${ssrRenderAttr("value", unref(form).etd)} type="date" id="etd" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ffe57bfe${_scopeId}></div><div data-v-ffe57bfe${_scopeId}><label for="measurement" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}>Meas (M³)</label><input${ssrRenderAttr("value", unref(form).measurement)} type="number" step="0.001" min="0" id="measurement" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Volume dalam m³" data-v-ffe57bfe${_scopeId}></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-ffe57bfe${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-ffe57bfe${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-ffe57bfe${_scopeId}>Informasi Keuangan</h3></div><div class="p-6 space-y-4" data-v-ffe57bfe${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4" data-v-ffe57bfe${_scopeId}><div data-v-ffe57bfe${_scopeId}><label for="buying" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}>Buying</label><input${ssrRenderAttr("value", unref(form).buying)} type="number" id="buying" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="0.00" data-v-ffe57bfe${_scopeId}></div><div data-v-ffe57bfe${_scopeId}><label for="selling" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}>Selling</label><input${ssrRenderAttr("value", unref(form).selling)} type="number" id="selling" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="0.00" data-v-ffe57bfe${_scopeId}></div><div data-v-ffe57bfe${_scopeId}><label for="revenue" class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}>Revenue</label><input${ssrRenderAttr("value", unref(form).revenue)} type="number" id="revenue" step="0.01" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="0.00" data-v-ffe57bfe${_scopeId}></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-ffe57bfe${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-ffe57bfe${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-ffe57bfe${_scopeId}>Vendor Information (Buying)</h3></div><div class="p-6 space-y-4" data-v-ffe57bfe${_scopeId}><div class="flex items-center justify-between mb-4" data-v-ffe57bfe${_scopeId}><p class="text-sm text-gray-600" data-v-ffe57bfe${_scopeId}>Tambahkan detail vendor untuk setiap item buying</p><button type="button" class="inline-flex items-center px-3 py-1 bg-sage-600 text-white rounded-md hover:bg-sage-700 transition-colors" data-v-ffe57bfe${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ffe57bfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-ffe57bfe${_scopeId}></path></svg> Add Vendor </button></div>`);
            if (vendorDetails.value.length === 0) {
              _push2(`<div class="text-gray-500 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg" data-v-ffe57bfe${_scopeId}> No vendor details added yet. Click &quot;Add Vendor&quot; to start. </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(vendorDetails.value, (vendorDetail, index) => {
              _push2(`<div class="border border-sage-200 rounded-lg p-4 space-y-4" data-v-ffe57bfe${_scopeId}><div class="flex justify-between items-center" data-v-ffe57bfe${_scopeId}><h5 class="font-medium text-sage-700" data-v-ffe57bfe${_scopeId}>Vendor #${ssrInterpolate(index + 1)}</h5><button type="button" class="text-red-600 hover:text-red-800 p-1" data-v-ffe57bfe${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ffe57bfe${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-ffe57bfe${_scopeId}></path></svg></button></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-ffe57bfe${_scopeId}><div data-v-ffe57bfe${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}> Pilih Vendor <span class="text-red-500" data-v-ffe57bfe${_scopeId}>*</span></label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ffe57bfe${_scopeId}><option value="" data-v-ffe57bfe${ssrIncludeBooleanAttr(Array.isArray(vendorDetail.vendor_id) ? ssrLooseContain(vendorDetail.vendor_id, "") : ssrLooseEqual(vendorDetail.vendor_id, "")) ? " selected" : ""}${_scopeId}>Pilih vendor...</option><!--[-->`);
              ssrRenderList(__props.vendors, (vendorOption) => {
                _push2(`<option${ssrRenderAttr("value", vendorOption.id)} data-v-ffe57bfe${ssrIncludeBooleanAttr(Array.isArray(vendorDetail.vendor_id) ? ssrLooseContain(vendorDetail.vendor_id, vendorOption.id) : ssrLooseEqual(vendorDetail.vendor_id, vendorOption.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendorOption.nama_vendor)}</option>`);
              });
              _push2(`<!--]--></select></div><div data-v-ffe57bfe${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}> Deskripsi Service </label><input${ssrRenderAttr("value", vendorDetail.deskripsi)} type="text" placeholder="Deskripsi layanan vendor" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ffe57bfe${_scopeId}></div></div>`);
              if (vendorDetail.vendor_id) {
                _push2(`<div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-sage-50 rounded-lg" data-v-ffe57bfe${_scopeId}><div data-v-ffe57bfe${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-ffe57bfe${_scopeId}>Nama Vendor</label><p class="text-sm text-gray-900" data-v-ffe57bfe${_scopeId}>${ssrInterpolate(vendorDetail.nama_vendor || "-")}</p></div><div data-v-ffe57bfe${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-ffe57bfe${_scopeId}>Nomor Rekening</label><p class="text-sm text-gray-900 font-mono" data-v-ffe57bfe${_scopeId}>${ssrInterpolate(vendorDetail.no_rekening || "-")}</p></div><div data-v-ffe57bfe${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-ffe57bfe${_scopeId}>Nama Rekening</label><p class="text-sm text-gray-900" data-v-ffe57bfe${_scopeId}>${ssrInterpolate(vendorDetail.nama_rekening || "-")}</p></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-ffe57bfe${_scopeId}><div data-v-ffe57bfe${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}> Nominal <span class="text-red-500" data-v-ffe57bfe${_scopeId}>*</span></label><input${ssrRenderAttr("value", vendorDetail.nominal)} type="number" step="0.01" placeholder="0" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ffe57bfe${_scopeId}></div><div data-v-ffe57bfe${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-ffe57bfe${_scopeId}> RCVD INV </label><input${ssrRenderAttr("value", vendorDetail.rcvd_inv)} type="text" placeholder="Nomor invoice yang diterima" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-ffe57bfe${_scopeId}></div></div></div>`);
            });
            _push2(`<!--]-->`);
            if (vendorDetails.value.length > 0) {
              _push2(`<div class="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg" data-v-ffe57bfe${_scopeId}><div class="flex justify-between items-center" data-v-ffe57bfe${_scopeId}><span class="font-medium text-blue-700" data-v-ffe57bfe${_scopeId}>Total Vendor Costs:</span><span class="text-xl font-bold text-blue-800" data-v-ffe57bfe${_scopeId}>${ssrInterpolate(formatCurrency(totalVendorCosts.value))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6" data-v-ffe57bfe${_scopeId}>`);
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-ffe57bfe${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-ffe57bfe${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-ffe57bfe${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-ffe57bfe${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-ffe57bfe${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-ffe57bfe${_scopeId}>Simpan Sales Order</span>`);
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
                            d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          })
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Buat Sales Order Baru"),
                        createVNode("p", { class: "text-sage-600" }, "Buat dokumen sales order untuk pelanggan")
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
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
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
                            for: "ref_no",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, " Ref No "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).ref_no = $event,
                            type: "text",
                            id: "ref_no",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Masukkan ref number"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).ref_no]
                          ]),
                          unref(form).errors.ref_no ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.ref_no), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "so_date",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, " Date "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).so_date = $event,
                            type: "date",
                            id: "so_date",
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
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
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
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "etd",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "ETD"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).etd = $event,
                            type: "date",
                            id: "etd",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).etd]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "measurement",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "Meas (M³)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).measurement = $event,
                            type: "number",
                            step: "0.001",
                            min: "0",
                            id: "measurement",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "Volume dalam m³"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).measurement]
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
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "buying",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "Buying"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).buying = $event,
                            type: "number",
                            id: "buying",
                            step: "0.01",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "0.00"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).buying]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "selling",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "Selling"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).selling = $event,
                            type: "number",
                            id: "selling",
                            step: "0.01",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "0.00"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).selling]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "revenue",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, "Revenue"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).revenue = $event,
                            type: "number",
                            id: "revenue",
                            step: "0.01",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                            placeholder: "0.00"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).revenue]
                          ])
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
                      unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Menyimpan...")) : (openBlock(), createBlock("span", { key: 2 }, "Simpan Sales Order"))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/SalesOrders/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ffe57bfe"]]);
export {
  Create as default
};
