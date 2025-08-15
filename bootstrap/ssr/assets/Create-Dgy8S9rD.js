import { ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, withDirectives, createCommentVNode, vModelText, toDisplayString, vShow, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-DYH406Kd.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const alertDialog = ref({
      show: false,
      type: "info",
      title: "",
      message: "",
      confirmText: "",
      cancelText: "",
      onConfirm: null
    });
    const isShippingInfoOpen = ref(true);
    const isVendorInfoOpen = ref(true);
    const vendorCollapseStates = ref([]);
    const toggleShippingInfo = () => {
      isShippingInfoOpen.value = !isShippingInfoOpen.value;
    };
    const toggleVendorInfo = () => {
      isVendorInfoOpen.value = !isVendorInfoOpen.value;
    };
    const toggleVendorCollapse = (index) => {
      if (vendorCollapseStates.value[index] === void 0) {
        vendorCollapseStates.value[index] = false;
      } else {
        vendorCollapseStates.value[index] = !vendorCollapseStates.value[index];
      }
    };
    const isVendorOpen = (index) => {
      return vendorCollapseStates.value[index] !== false;
    };
    const form = useForm({
      so_number: "",
      customer_code: "",
      consignee_shipper: "",
      awb_bl_number: "",
      cust_doc_name: "",
      type_qty: "",
      no_kont_pallet: "",
      pol_pod: "",
      eta: "",
      vendors: [
        {
          deskripsi: "",
          nominal: "",
          nominalFormatted: "",
          no_rekening: "",
          company_name: "",
          rcvd_inv: ""
        }
      ]
    });
    const addVendor = () => {
      form.vendors.push({
        deskripsi: "",
        nominal: "",
        nominalFormatted: "",
        no_rekening: "",
        company_name: "",
        rcvd_inv: ""
      });
      vendorCollapseStates.value[form.vendors.length - 1] = true;
    };
    const removeVendor = (index) => {
      if (form.vendors.length > 1) {
        form.vendors.splice(index, 1);
        vendorCollapseStates.value.splice(index, 1);
      }
    };
    const formatNominal = (vendor, event) => {
      let value = event.target.value;
      value = value.replace(/\D/g, "");
      if (value) {
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      vendor.nominalFormatted = value;
    };
    const updateNominalValue = (vendor) => {
      vendor.nominal = vendor.nominalFormatted ? parseInt(vendor.nominalFormatted.replace(/\./g, "")) : "";
    };
    const showAlert = (type, title, message, confirmText = "", cancelText = "") => {
      alertDialog.value = {
        show: true,
        type,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: null
      };
    };
    const handleAlertConfirm = () => {
      if (alertDialog.value.onConfirm) {
        alertDialog.value.onConfirm();
      }
    };
    const handleAlertCancel = () => {
    };
    const closeAlert = () => {
      alertDialog.value.show = false;
    };
    const submit = () => {
      form.post(route("admin-cs.customers.store"), {
        onSuccess: () => {
          showAlert(
            "success",
            "Berhasil",
            "Data pelanggan berhasil ditambahkan ke dalam sistem."
          );
        },
        onError: (errors) => {
          const errorMessage = Object.keys(errors).length > 0 ? "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan." : "Terjadi kesalahan saat menyimpan data pelanggan.";
          showAlert("error", "Gagal Menyimpan", errorMessage);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-f0f3ed51${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-f0f3ed51${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-f0f3ed51${_scopeId}><div class="flex items-center" data-v-f0f3ed51${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-f0f3ed51${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f0f3ed51${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-f0f3ed51${_scopeId}></path></svg></div><div data-v-f0f3ed51${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-f0f3ed51${_scopeId}> Tambah Pelanggan Baru </h2><p class="text-sage-600" data-v-f0f3ed51${_scopeId}> Tambahkan data pelanggan baru ke dalam sistem </p></div></div><div class="mt-4 sm:mt-0" data-v-f0f3ed51${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.customers.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f0f3ed51${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-f0f3ed51${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-f0f3ed51${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-f0f3ed51${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-f0f3ed51${_scopeId}> Form Tambah Pelanggan </h3><p class="text-sm text-sage-600 mt-1" data-v-f0f3ed51${_scopeId}> Lengkapi informasi pelanggan dengan benar </p></div><div class="p-6" data-v-f0f3ed51${_scopeId}><form class="space-y-8" data-v-f0f3ed51${_scopeId}><div class="border border-sage-200 rounded-lg" data-v-f0f3ed51${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-f0f3ed51${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-f0f3ed51${_scopeId}> Informasi Pengiriman </h4><svg class="${ssrRenderClass([{ "rotate-180": isShippingInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f0f3ed51${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-f0f3ed51${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isShippingInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-f0f3ed51${_scopeId}><div data-v-f0f3ed51${_scopeId}><label for="so_number" class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> SO Number <span class="text-red-500" data-v-f0f3ed51${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).so_number)} type="text" id="so_number" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
            if (unref(form).errors.so_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors.so_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-f0f3ed51${_scopeId}><label for="customer_code" class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> Customer Code <span class="text-red-500" data-v-f0f3ed51${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).customer_code)} type="text" id="customer_code" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
            if (unref(form).errors.customer_code) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors.customer_code)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-f0f3ed51${_scopeId}><label for="consignee_shipper" class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> Consignee/Shipper <span class="text-red-500" data-v-f0f3ed51${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).consignee_shipper)} type="text" id="consignee_shipper" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
            if (unref(form).errors.consignee_shipper) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors.consignee_shipper)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-f0f3ed51${_scopeId}><label for="awb_bl_number" class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> AWB/BL Number <span class="text-red-500" data-v-f0f3ed51${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).awb_bl_number)} type="text" id="awb_bl_number" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
            if (unref(form).errors.awb_bl_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors.awb_bl_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-f0f3ed51${_scopeId}><label for="cust_doc_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> Cust Doc Name </label><input${ssrRenderAttr("value", unref(form).cust_doc_name)} type="text" id="cust_doc_name" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
            if (unref(form).errors.cust_doc_name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors.cust_doc_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-f0f3ed51${_scopeId}><label for="type_qty" class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> Type Qty </label><input${ssrRenderAttr("value", unref(form).type_qty)} type="text" id="type_qty" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
            if (unref(form).errors.type_qty) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors.type_qty)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-f0f3ed51${_scopeId}><label for="no_kont_pallet" class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> No Kont/Pallet </label><input${ssrRenderAttr("value", unref(form).no_kont_pallet)} type="text" id="no_kont_pallet" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
            if (unref(form).errors.no_kont_pallet) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors.no_kont_pallet)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-f0f3ed51${_scopeId}><label for="pol_pod" class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> POL/POD </label><input${ssrRenderAttr("value", unref(form).pol_pod)} type="text" id="pol_pod" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
            if (unref(form).errors.pol_pod) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors.pol_pod)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-f0f3ed51${_scopeId}><label for="eta" class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> ETA </label><input${ssrRenderAttr("value", unref(form).eta)} type="date" id="eta" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
            if (unref(form).errors.eta) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors.eta)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-f0f3ed51${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-f0f3ed51${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-f0f3ed51${_scopeId}> Buying to Vendor </h4><svg class="${ssrRenderClass([{ "rotate-180": isVendorInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f0f3ed51${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-f0f3ed51${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isVendorInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-f0f3ed51${_scopeId}><!--[-->`);
            ssrRenderList(unref(form).vendors, (vendor, index) => {
              _push2(`<div class="border border-sage-200 rounded-lg bg-sage-50" data-v-f0f3ed51${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-100 hover:bg-sage-200 transition-colors rounded-t-lg" data-v-f0f3ed51${_scopeId}><h5 class="font-medium text-sage-800" data-v-f0f3ed51${_scopeId}>Vendor ${ssrInterpolate(index + 1)}</h5><div class="flex items-center space-x-2" data-v-f0f3ed51${_scopeId}>`);
              if (unref(form).vendors.length > 1) {
                _push2(`<button type="button" class="text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50" data-v-f0f3ed51${_scopeId}> Hapus </button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<svg class="${ssrRenderClass([{ "rotate-180": !isVendorOpen(index) }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f0f3ed51${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-f0f3ed51${_scopeId}></path></svg></div></button><div style="${ssrRenderStyle(isVendorOpen(index) ? null : { display: "none" })}" class="p-4 space-y-4" data-v-f0f3ed51${_scopeId}><div data-v-f0f3ed51${_scopeId}><label${ssrRenderAttr("for", "deskripsi_" + index)} class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> Deskripsi <span class="text-red-500" data-v-f0f3ed51${_scopeId}>*</span></label><textarea${ssrRenderAttr("id", "deskripsi_" + index)} rows="2" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(vendor.deskripsi)}</textarea>`);
              if (unref(form).errors[`vendors.${index}.deskripsi`]) {
                _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors[`vendors.${index}.deskripsi`])}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-f0f3ed51${_scopeId}><label${ssrRenderAttr("for", "nominal_" + index)} class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> Nominal <span class="text-red-500" data-v-f0f3ed51${_scopeId}>*</span></label><input${ssrRenderAttr("value", vendor.nominalFormatted)} type="text"${ssrRenderAttr("id", "nominal_" + index)} required placeholder="0" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
              if (unref(form).errors[`vendors.${index}.nominal`]) {
                _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors[`vendors.${index}.nominal`])}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-f0f3ed51${_scopeId}><label${ssrRenderAttr("for", "no_rekening_" + index)} class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> No Rekening <span class="text-red-500" data-v-f0f3ed51${_scopeId}>*</span></label><input${ssrRenderAttr("value", vendor.no_rekening)} type="text"${ssrRenderAttr("id", "no_rekening_" + index)} required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
              if (unref(form).errors[`vendors.${index}.no_rekening`]) {
                _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors[`vendors.${index}.no_rekening`])}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-f0f3ed51${_scopeId}><label${ssrRenderAttr("for", "company_name_" + index)} class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> Company Name <span class="text-red-500" data-v-f0f3ed51${_scopeId}>*</span></label><input${ssrRenderAttr("value", vendor.company_name)} type="text"${ssrRenderAttr("id", "company_name_" + index)} required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
              if (unref(form).errors[`vendors.${index}.company_name`]) {
                _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors[`vendors.${index}.company_name`])}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div data-v-f0f3ed51${_scopeId}><label${ssrRenderAttr("for", "rcvd_inv_" + index)} class="block text-sm font-medium text-sage-700 mb-2" data-v-f0f3ed51${_scopeId}> RCVD INV </label><input${ssrRenderAttr("value", vendor.rcvd_inv)} type="text"${ssrRenderAttr("id", "rcvd_inv_" + index)} class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-f0f3ed51${_scopeId}>`);
              if (unref(form).errors[`vendors.${index}.rcvd_inv`]) {
                _push2(`<div class="mt-2 text-sm text-red-600" data-v-f0f3ed51${_scopeId}>${ssrInterpolate(unref(form).errors[`vendors.${index}.rcvd_inv`])}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            });
            _push2(`<!--]--><button type="button" class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-f0f3ed51${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f0f3ed51${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-f0f3ed51${_scopeId}></path></svg> Tambah Vendor </button></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200" data-v-f0f3ed51${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.customers.index"),
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-f0f3ed51${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-f0f3ed51${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-f0f3ed51${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-f0f3ed51${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-f0f3ed51${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-f0f3ed51${_scopeId}>Simpan Pelanggan</span>`);
            }
            _push2(`</button></div></form></div></div></div>`);
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
                            d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                          })
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, " Tambah Pelanggan Baru "),
                        createVNode("p", { class: "text-sage-600" }, " Tambahkan data pelanggan baru ke dalam sistem ")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.customers.index"),
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
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Form Tambah Pelanggan "),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Lengkapi informasi pelanggan dengan benar ")
                  ]),
                  createVNode("div", { class: "p-6" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-8"
                    }, [
                      createVNode("div", { class: "border border-sage-200 rounded-lg" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: toggleShippingInfo,
                          class: "w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
                        }, [
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, " Informasi Pengiriman "),
                          (openBlock(), createBlock("svg", {
                            class: [{ "rotate-180": isShippingInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                        ]),
                        withDirectives(createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "so_number",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" SO Number "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).so_number = $event,
                              type: "text",
                              id: "so_number",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).so_number]
                            ]),
                            unref(form).errors.so_number ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.so_number), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "customer_code",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Customer Code "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).customer_code = $event,
                              type: "text",
                              id: "customer_code",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).customer_code]
                            ]),
                            unref(form).errors.customer_code ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.customer_code), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "consignee_shipper",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Consignee/Shipper "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).consignee_shipper = $event,
                              type: "text",
                              id: "consignee_shipper",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).consignee_shipper]
                            ]),
                            unref(form).errors.consignee_shipper ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.consignee_shipper), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "awb_bl_number",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" AWB/BL Number "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).awb_bl_number = $event,
                              type: "text",
                              id: "awb_bl_number",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).awb_bl_number]
                            ]),
                            unref(form).errors.awb_bl_number ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.awb_bl_number), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "cust_doc_name",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Cust Doc Name "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).cust_doc_name = $event,
                              type: "text",
                              id: "cust_doc_name",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).cust_doc_name]
                            ]),
                            unref(form).errors.cust_doc_name ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.cust_doc_name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "type_qty",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Type Qty "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).type_qty = $event,
                              type: "text",
                              id: "type_qty",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).type_qty]
                            ]),
                            unref(form).errors.type_qty ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.type_qty), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "no_kont_pallet",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " No Kont/Pallet "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).no_kont_pallet = $event,
                              type: "text",
                              id: "no_kont_pallet",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).no_kont_pallet]
                            ]),
                            unref(form).errors.no_kont_pallet ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.no_kont_pallet), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "pol_pod",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " POL/POD "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).pol_pod = $event,
                              type: "text",
                              id: "pol_pod",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).pol_pod]
                            ]),
                            unref(form).errors.pol_pod ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.pol_pod), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "eta",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " ETA "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).eta = $event,
                              type: "date",
                              id: "eta",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).eta]
                            ]),
                            unref(form).errors.eta ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.eta), 1)) : createCommentVNode("", true)
                          ])
                        ], 512), [
                          [vShow, isShippingInfoOpen.value]
                        ])
                      ]),
                      createVNode("div", { class: "border border-sage-200 rounded-lg" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: toggleVendorInfo,
                          class: "w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
                        }, [
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, " Buying to Vendor "),
                          (openBlock(), createBlock("svg", {
                            class: [{ "rotate-180": isVendorInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                        ]),
                        withDirectives(createVNode("div", { class: "p-4 space-y-4" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(form).vendors, (vendor, index) => {
                            return openBlock(), createBlock("div", {
                              key: index,
                              class: "border border-sage-200 rounded-lg bg-sage-50"
                            }, [
                              createVNode("button", {
                                type: "button",
                                onClick: ($event) => toggleVendorCollapse(index),
                                class: "w-full flex items-center justify-between p-4 bg-sage-100 hover:bg-sage-200 transition-colors rounded-t-lg"
                              }, [
                                createVNode("h5", { class: "font-medium text-sage-800" }, "Vendor " + toDisplayString(index + 1), 1),
                                createVNode("div", { class: "flex items-center space-x-2" }, [
                                  unref(form).vendors.length > 1 ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    type: "button",
                                    onClick: withModifiers(($event) => removeVendor(index), ["stop"]),
                                    class: "text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded hover:bg-red-50"
                                  }, " Hapus ", 8, ["onClick"])) : createCommentVNode("", true),
                                  (openBlock(), createBlock("svg", {
                                    class: [{ "rotate-180": !isVendorOpen(index) }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                                ])
                              ], 8, ["onClick"]),
                              withDirectives(createVNode("div", { class: "p-4 space-y-4" }, [
                                createVNode("div", null, [
                                  createVNode("label", {
                                    for: "deskripsi_" + index,
                                    class: "block text-sm font-medium text-sage-700 mb-2"
                                  }, [
                                    createTextVNode(" Deskripsi "),
                                    createVNode("span", { class: "text-red-500" }, "*")
                                  ], 8, ["for"]),
                                  withDirectives(createVNode("textarea", {
                                    "onUpdate:modelValue": ($event) => vendor.deskripsi = $event,
                                    id: "deskripsi_" + index,
                                    rows: "2",
                                    required: "",
                                    class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                                  }, null, 8, ["onUpdate:modelValue", "id"]), [
                                    [vModelText, vendor.deskripsi]
                                  ]),
                                  unref(form).errors[`vendors.${index}.deskripsi`] ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mt-2 text-sm text-red-600"
                                  }, toDisplayString(unref(form).errors[`vendors.${index}.deskripsi`]), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", {
                                    for: "nominal_" + index,
                                    class: "block text-sm font-medium text-sage-700 mb-2"
                                  }, [
                                    createTextVNode(" Nominal "),
                                    createVNode("span", { class: "text-red-500" }, "*")
                                  ], 8, ["for"]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => vendor.nominalFormatted = $event,
                                    type: "text",
                                    id: "nominal_" + index,
                                    required: "",
                                    onInput: ($event) => formatNominal(vendor, $event),
                                    onBlur: ($event) => updateNominalValue(vendor),
                                    placeholder: "0",
                                    class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                  }, null, 40, ["onUpdate:modelValue", "id", "onInput", "onBlur"]), [
                                    [vModelText, vendor.nominalFormatted]
                                  ]),
                                  unref(form).errors[`vendors.${index}.nominal`] ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mt-2 text-sm text-red-600"
                                  }, toDisplayString(unref(form).errors[`vendors.${index}.nominal`]), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", {
                                    for: "no_rekening_" + index,
                                    class: "block text-sm font-medium text-sage-700 mb-2"
                                  }, [
                                    createTextVNode(" No Rekening "),
                                    createVNode("span", { class: "text-red-500" }, "*")
                                  ], 8, ["for"]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => vendor.no_rekening = $event,
                                    type: "text",
                                    id: "no_rekening_" + index,
                                    required: "",
                                    class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                  }, null, 8, ["onUpdate:modelValue", "id"]), [
                                    [vModelText, vendor.no_rekening]
                                  ]),
                                  unref(form).errors[`vendors.${index}.no_rekening`] ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mt-2 text-sm text-red-600"
                                  }, toDisplayString(unref(form).errors[`vendors.${index}.no_rekening`]), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", {
                                    for: "company_name_" + index,
                                    class: "block text-sm font-medium text-sage-700 mb-2"
                                  }, [
                                    createTextVNode(" Company Name "),
                                    createVNode("span", { class: "text-red-500" }, "*")
                                  ], 8, ["for"]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => vendor.company_name = $event,
                                    type: "text",
                                    id: "company_name_" + index,
                                    required: "",
                                    class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                  }, null, 8, ["onUpdate:modelValue", "id"]), [
                                    [vModelText, vendor.company_name]
                                  ]),
                                  unref(form).errors[`vendors.${index}.company_name`] ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mt-2 text-sm text-red-600"
                                  }, toDisplayString(unref(form).errors[`vendors.${index}.company_name`]), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("div", null, [
                                  createVNode("label", {
                                    for: "rcvd_inv_" + index,
                                    class: "block text-sm font-medium text-sage-700 mb-2"
                                  }, " RCVD INV ", 8, ["for"]),
                                  withDirectives(createVNode("input", {
                                    "onUpdate:modelValue": ($event) => vendor.rcvd_inv = $event,
                                    type: "text",
                                    id: "rcvd_inv_" + index,
                                    class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                                  }, null, 8, ["onUpdate:modelValue", "id"]), [
                                    [vModelText, vendor.rcvd_inv]
                                  ]),
                                  unref(form).errors[`vendors.${index}.rcvd_inv`] ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "mt-2 text-sm text-red-600"
                                  }, toDisplayString(unref(form).errors[`vendors.${index}.rcvd_inv`]), 1)) : createCommentVNode("", true)
                                ])
                              ], 512), [
                                [vShow, isVendorOpen(index)]
                              ])
                            ]);
                          }), 128)),
                          createVNode("button", {
                            type: "button",
                            onClick: addVendor,
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
                            createTextVNode(" Tambah Vendor ")
                          ])
                        ], 512), [
                          [vShow, isVendorInfoOpen.value]
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-cs.customers.index"),
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
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Menyimpan...")) : (openBlock(), createBlock("span", { key: 2 }, "Simpan Pelanggan"))
                        ], 8, ["disabled"])
                      ])
                    ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Customers/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f0f3ed51"]]);
export {
  Create as default
};
