import { ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, withModifiers, withDirectives, createCommentVNode, vModelText, vModelSelect, vShow, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-5dkykGfh.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B-2d_OMK.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    customer: Object,
    vendors: Array
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
    const isCompanyInfoOpen = ref(true);
    const isLegalInfoOpen = ref(true);
    const isPicInfoOpen = ref(true);
    const isMarketingInfoOpen = ref(true);
    const isShippingInfoOpen = ref(true);
    const isDocumentInfoOpen = ref(true);
    const isVendorInfoOpen = ref(true);
    const toggleCompanyInfo = () => {
      isCompanyInfoOpen.value = !isCompanyInfoOpen.value;
    };
    const toggleLegalInfo = () => {
      isLegalInfoOpen.value = !isLegalInfoOpen.value;
    };
    const togglePicInfo = () => {
      isPicInfoOpen.value = !isPicInfoOpen.value;
    };
    const toggleMarketingInfo = () => {
      isMarketingInfoOpen.value = !isMarketingInfoOpen.value;
    };
    const toggleShippingInfo = () => {
      isShippingInfoOpen.value = !isShippingInfoOpen.value;
    };
    const toggleDocumentInfo = () => {
      isDocumentInfoOpen.value = !isDocumentInfoOpen.value;
    };
    const toggleVendorInfo = () => {
      isVendorInfoOpen.value = !isVendorInfoOpen.value;
    };
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    };
    const form = useForm({
      so_number: props.customer.so_number || "",
      customer_code: props.customer.customer_code || "",
      // Informasi Perusahaan/Perorangan
      company_name: props.customer.company_name || "",
      company_type: props.customer.company_type || "",
      company_address: props.customer.company_address || "",
      invoice_address: props.customer.invoice_address || "",
      // Data Legalitas
      nib: props.customer.nib || "",
      npwp: props.customer.npwp || "",
      ktp_number: props.customer.ktp_number || "",
      // Data PIC
      pic_name: props.customer.pic_name || "",
      pic_phone: props.customer.pic_phone || "",
      pic_email: props.customer.pic_email || "",
      // Data Marketing
      marketing_name: props.customer.marketing_name || "",
      marketing_phone: props.customer.marketing_phone || "",
      marketing_email: props.customer.marketing_email || "",
      // Data Pengiriman
      consignee_shipper: props.customer.consignee_shipper || "",
      awb_bl_number: props.customer.awb_bl_number || "",
      cust_doc_name: props.customer.cust_doc_name || "",
      type_qty: props.customer.type_qty || "",
      no_kont_pallet: props.customer.no_kont_pallet || "",
      pol_pod: props.customer.pol_pod || "",
      eta: formatDate(props.customer.eta) || "",
      vendor: (() => {
        let vendorData = {
          vendor_id: "",
          deskripsi: "",
          nominal: "",
          no_rekening: "",
          company_name: "",
          nama_rekening: "",
          rcvd_inv: ""
        };
        if (props.customer.vendors) {
          if (Array.isArray(props.customer.vendors) && props.customer.vendors.length > 0) {
            vendorData = { ...vendorData, ...props.customer.vendors[0] };
          } else if (typeof props.customer.vendors === "object" && !Array.isArray(props.customer.vendors)) {
            vendorData = { ...vendorData, ...props.customer.vendors };
          }
        }
        let vendorId = vendorData.vendor_id || "";
        if (!vendorId && vendorData.company_name && props.vendors) {
          const foundVendor = props.vendors.find((v) => v.nama_vendor === vendorData.company_name);
          if (foundVendor) {
            vendorId = foundVendor.id;
          }
        }
        return {
          ...vendorData,
          vendor_id: vendorId,
          nominalFormatted: vendorData.nominal ? vendorData.nominal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : ""
        };
      })(),
      photo: null,
      legal_document: null
    });
    const onVendorChange = () => {
      const selectedVendorId = form.vendor.vendor_id;
      if (selectedVendorId) {
        const selectedVendor = props.vendors.find((v) => v.id == selectedVendorId);
        if (selectedVendor) {
          form.vendor.no_rekening = selectedVendor.nomor_rekening;
          form.vendor.company_name = selectedVendor.nama_vendor;
          form.vendor.nama_rekening = selectedVendor.nama_rekening;
          form.vendor.nib = selectedVendor.nib || "";
        }
      } else {
        form.vendor.no_rekening = "";
        form.vendor.company_name = "";
        form.vendor.nama_rekening = "";
        form.vendor.nib = "";
      }
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
    const formatNominal = (event) => {
      let value = event.target.value;
      value = value.replace(/\D/g, "");
      if (value) {
        value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      form.vendor.nominalFormatted = value;
    };
    const updateNominalValue = () => {
      if (form.vendor.nominalFormatted && form.vendor.nominalFormatted.trim() !== "") {
        form.vendor.nominal = parseInt(form.vendor.nominalFormatted.replace(/\./g, ""));
      } else {
        form.vendor.nominal = null;
      }
    };
    const handlePhotoChange = (event) => {
      const file = event.target.files[0];
      form.photo = file || null;
    };
    const handleLegalDocumentChange = (event) => {
      const file = event.target.files[0];
      form.legal_document = file || null;
    };
    const submit = () => {
      updateNominalValue();
      const hasFiles = form.photo || form.legal_document;
      if (hasFiles) {
        form.transform((data) => ({
          ...data,
          _method: "PUT"
        })).post(route("admin-cs.customers.update", props.customer.id), {
          onSuccess: () => {
            showAlert("success", "Berhasil", "Data pelanggan berhasil diperbarui.");
          },
          onError: (errors) => {
            console.log("Validation errors:", errors);
            const errorMessage = Object.keys(errors).length > 0 ? "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan." : "Terjadi kesalahan saat memperbarui data pelanggan.";
            showAlert("error", "Gagal Memperbarui", errorMessage);
          }
        });
      } else {
        form.put(route("admin-cs.customers.update", props.customer.id), {
          onSuccess: () => {
            showAlert("success", "Berhasil", "Data pelanggan berhasil diperbarui.");
          },
          onError: (errors) => {
            console.log("Validation errors:", errors);
            const errorMessage = Object.keys(errors).length > 0 ? "Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan." : "Terjadi kesalahan saat memperbarui data pelanggan.";
            showAlert("error", "Gagal Memperbarui", errorMessage);
          }
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-5cb7ff1a${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-5cb7ff1a${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-5cb7ff1a${_scopeId}><div class="flex items-center" data-v-5cb7ff1a${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-5cb7ff1a${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5cb7ff1a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-5cb7ff1a${_scopeId}></path></svg></div><div data-v-5cb7ff1a${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-5cb7ff1a${_scopeId}> Edit Pelanggan: ${ssrInterpolate(__props.customer.customer_code || __props.customer.no)}</h2><p class="text-sage-600" data-v-5cb7ff1a${_scopeId}> Perbarui informasi pelanggan dan status komunikasi </p></div></div><div class="mt-4 sm:mt-0" data-v-5cb7ff1a${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.customers.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5cb7ff1a${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-5cb7ff1a${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-5cb7ff1a${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-5cb7ff1a${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-5cb7ff1a${_scopeId}> Form Edit Pelanggan </h3><p class="text-sm text-sage-600 mt-1" data-v-5cb7ff1a${_scopeId}> Lengkapi informasi pelanggan dengan benar </p></div><div class="p-6" data-v-5cb7ff1a${_scopeId}><form class="space-y-8" data-v-5cb7ff1a${_scopeId}><div class="border border-sage-200 rounded-lg" data-v-5cb7ff1a${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-5cb7ff1a${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-5cb7ff1a${_scopeId}> 🏢 Informasi Perusahaan/Perorangan </h4><svg class="${ssrRenderClass([{ "rotate-180": isCompanyInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5cb7ff1a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-5cb7ff1a${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isCompanyInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-5cb7ff1a${_scopeId}><div data-v-5cb7ff1a${_scopeId}><label for="company_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Nama PT/Perorangan <span class="text-red-500" data-v-5cb7ff1a${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).company_name)} type="text" id="company_name" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nama perusahaan atau nama lengkap" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.company_name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.company_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="company_type" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Jenis Usaha <span class="text-red-500" data-v-5cb7ff1a${_scopeId}>*</span></label><select id="company_type" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}><option value="" data-v-5cb7ff1a${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "") : ssrLooseEqual(unref(form).company_type, "")) ? " selected" : ""}${_scopeId}>Pilih jenis usaha...</option><option value="PT" data-v-5cb7ff1a${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "PT") : ssrLooseEqual(unref(form).company_type, "PT")) ? " selected" : ""}${_scopeId}>PT (Perseroan Terbatas)</option><option value="CV" data-v-5cb7ff1a${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "CV") : ssrLooseEqual(unref(form).company_type, "CV")) ? " selected" : ""}${_scopeId}>CV (Commanditaire Vennootschap)</option><option value="Perorangan" data-v-5cb7ff1a${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Perorangan") : ssrLooseEqual(unref(form).company_type, "Perorangan")) ? " selected" : ""}${_scopeId}>Perorangan</option><option value="Yayasan" data-v-5cb7ff1a${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Yayasan") : ssrLooseEqual(unref(form).company_type, "Yayasan")) ? " selected" : ""}${_scopeId}>Yayasan</option><option value="Koperasi" data-v-5cb7ff1a${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Koperasi") : ssrLooseEqual(unref(form).company_type, "Koperasi")) ? " selected" : ""}${_scopeId}>Koperasi</option><option value="Lainnya" data-v-5cb7ff1a${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Lainnya") : ssrLooseEqual(unref(form).company_type, "Lainnya")) ? " selected" : ""}${_scopeId}>Lainnya</option></select>`);
            if (unref(form).errors.company_type) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.company_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="company_address" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Alamat PT/Domisili <span class="text-red-500" data-v-5cb7ff1a${_scopeId}>*</span></label><textarea id="company_address" rows="3" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" placeholder="Masukkan alamat lengkap perusahaan/domisili" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).company_address)}</textarea>`);
            if (unref(form).errors.company_address) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.company_address)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="invoice_address" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Alamat Kirim Invoice </label><textarea id="invoice_address" rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" placeholder="Masukkan alamat untuk pengiriman invoice (opsional)" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).invoice_address)}</textarea>`);
            if (unref(form).errors.invoice_address) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_address)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-5cb7ff1a${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-5cb7ff1a${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-5cb7ff1a${_scopeId}> 📄 Data Legalitas </h4><svg class="${ssrRenderClass([{ "rotate-180": isLegalInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5cb7ff1a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-5cb7ff1a${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isLegalInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-5cb7ff1a${_scopeId}><div data-v-5cb7ff1a${_scopeId}><label for="nib" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> NIB (Nomor Induk Berusaha) </label><input${ssrRenderAttr("value", unref(form).nib)} type="text" id="nib" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nomor induk berusaha" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.nib) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.nib)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="npwp" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> NPWP </label><input${ssrRenderAttr("value", unref(form).npwp)} type="text" id="npwp" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nomor NPWP" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.npwp) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.npwp)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div style="${ssrRenderStyle(unref(form).company_type === "Perorangan" ? null : { display: "none" })}" data-v-5cb7ff1a${_scopeId}><label for="ktp_number" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Nomor KTP </label><input${ssrRenderAttr("value", unref(form).ktp_number)} type="text" id="ktp_number" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nomor KTP" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.ktp_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.ktp_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-5cb7ff1a${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-5cb7ff1a${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-5cb7ff1a${_scopeId}> 👤 Data PIC (Person In Charge) </h4><svg class="${ssrRenderClass([{ "rotate-180": isPicInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5cb7ff1a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-5cb7ff1a${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isPicInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-5cb7ff1a${_scopeId}><div data-v-5cb7ff1a${_scopeId}><label for="pic_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Nama PIC <span class="text-red-500" data-v-5cb7ff1a${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).pic_name)} type="text" id="pic_name" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nama lengkap PIC" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.pic_name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.pic_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="pic_phone" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Kontak/Telepon Aktif PIC <span class="text-red-500" data-v-5cb7ff1a${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).pic_phone)} type="tel" id="pic_phone" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Contoh: 08123456789" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.pic_phone) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.pic_phone)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="pic_email" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Email Aktif PIC <span class="text-red-500" data-v-5cb7ff1a${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).pic_email)} type="email" id="pic_email" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="contoh@email.com" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.pic_email) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.pic_email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-5cb7ff1a${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-5cb7ff1a${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-5cb7ff1a${_scopeId}> 📈 Data Marketing </h4><svg class="${ssrRenderClass([{ "rotate-180": isMarketingInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5cb7ff1a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-5cb7ff1a${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isMarketingInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-5cb7ff1a${_scopeId}><div data-v-5cb7ff1a${_scopeId}><label for="marketing_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Nama Marketing </label><input${ssrRenderAttr("value", unref(form).marketing_name)} type="text" id="marketing_name" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nama marketing yang bertanggung jawab" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.marketing_name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.marketing_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="marketing_phone" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Nomor Telepon Marketing </label><input${ssrRenderAttr("value", unref(form).marketing_phone)} type="tel" id="marketing_phone" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Contoh: 08123456789" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.marketing_phone) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.marketing_phone)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="marketing_email" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Email Marketing </label><input${ssrRenderAttr("value", unref(form).marketing_email)} type="email" id="marketing_email" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="marketing@email.com" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.marketing_email) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.marketing_email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-5cb7ff1a${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-5cb7ff1a${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-5cb7ff1a${_scopeId}> Informasi Pengiriman </h4><svg class="${ssrRenderClass([{ "rotate-180": isShippingInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5cb7ff1a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-5cb7ff1a${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isShippingInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-5cb7ff1a${_scopeId}><div data-v-5cb7ff1a${_scopeId}><label for="so_number" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> SO Number <span class="text-red-500" data-v-5cb7ff1a${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).so_number)} type="text" id="so_number" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.so_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.so_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="customer_code" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Customer Code <span class="text-red-500" data-v-5cb7ff1a${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).customer_code)} type="text" id="customer_code" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.customer_code) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.customer_code)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="consignee_shipper" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Consignee/Shipper <span class="text-red-500" data-v-5cb7ff1a${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).consignee_shipper)} type="text" id="consignee_shipper" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.consignee_shipper) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.consignee_shipper)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="awb_bl_number" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> AWB/BL Number <span class="text-red-500" data-v-5cb7ff1a${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).awb_bl_number)} type="text" id="awb_bl_number" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.awb_bl_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.awb_bl_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="cust_doc_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Cust Doc Name </label><input${ssrRenderAttr("value", unref(form).cust_doc_name)} type="text" id="cust_doc_name" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.cust_doc_name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.cust_doc_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="type_qty" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Type Qty </label><input${ssrRenderAttr("value", unref(form).type_qty)} type="text" id="type_qty" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.type_qty) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.type_qty)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="no_kont_pallet" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> No Kont/Pallet </label><input${ssrRenderAttr("value", unref(form).no_kont_pallet)} type="text" id="no_kont_pallet" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.no_kont_pallet) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.no_kont_pallet)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="pol_pod" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> POL/POD </label><input${ssrRenderAttr("value", unref(form).pol_pod)} type="text" id="pol_pod" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.pol_pod) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.pol_pod)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="eta" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> ETA </label><input${ssrRenderAttr("value", unref(form).eta)} type="date" id="eta" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).errors.eta) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.eta)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-5cb7ff1a${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-5cb7ff1a${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-5cb7ff1a${_scopeId}> Dokumen &amp; Foto </h4><svg class="${ssrRenderClass([{ "rotate-180": isDocumentInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5cb7ff1a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-5cb7ff1a${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isDocumentInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-5cb7ff1a${_scopeId}>`);
            if (__props.customer.photo_path) {
              _push2(`<div data-v-5cb7ff1a${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Foto Saat Ini </label><div class="flex items-center space-x-4" data-v-5cb7ff1a${_scopeId}><img${ssrRenderAttr("src", `/storage/${__props.customer.photo_path}`)} alt="Foto Pelanggan" class="w-20 h-20 object-cover rounded-lg border border-gray-200" data-v-5cb7ff1a${_scopeId}><p class="text-sm text-gray-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(__props.customer.photo_path.split("/").pop())}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div data-v-5cb7ff1a${_scopeId}><label for="photo" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(__props.customer.photo_path ? "Ganti Foto Pelanggan" : "Foto Pelanggan")}</label><input type="file" id="photo" accept="image/*" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200" data-v-5cb7ff1a${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-5cb7ff1a${_scopeId}> Format yang didukung: JPG, PNG, GIF. Maksimal 2MB. </p>`);
            if (unref(form).errors.photo) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.photo)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.customer.legal_document_path) {
              _push2(`<div data-v-5cb7ff1a${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Dokumen Legal Saat Ini </label><div class="flex items-center space-x-4" data-v-5cb7ff1a${_scopeId}><div class="flex items-center space-x-2" data-v-5cb7ff1a${_scopeId}><svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5cb7ff1a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-5cb7ff1a${_scopeId}></path></svg><div data-v-5cb7ff1a${_scopeId}><p class="text-sm text-gray-900" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(__props.customer.legal_document_path.split("/").pop())}</p><a${ssrRenderAttr("href", `/storage/${__props.customer.legal_document_path}`)} target="_blank" class="text-xs text-sage-600 hover:text-sage-800" data-v-5cb7ff1a${_scopeId}> Lihat Dokumen </a></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div data-v-5cb7ff1a${_scopeId}><label for="legal_document" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(__props.customer.legal_document_path ? "Ganti Dokumen Legal" : "Dokumen Legal")}</label><input type="file" id="legal_document" accept=".pdf" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200" data-v-5cb7ff1a${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-5cb7ff1a${_scopeId}> Format yang didukung: PDF. Maksimal 10MB. </p>`);
            if (unref(form).errors.legal_document) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.legal_document)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-5cb7ff1a${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-5cb7ff1a${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-5cb7ff1a${_scopeId}> Buying to Vendor </h4><svg class="${ssrRenderClass([{ "rotate-180": isVendorInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-5cb7ff1a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-5cb7ff1a${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isVendorInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-5cb7ff1a${_scopeId}><div data-v-5cb7ff1a${_scopeId}><label for="deskripsi" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Deskripsi <span class="text-red-500" data-v-5cb7ff1a${_scopeId}>*</span></label><textarea id="deskripsi" rows="2" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).vendor.deskripsi)}</textarea>`);
            if ((_a = unref(form).errors.vendor) == null ? void 0 : _a.deskripsi) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.vendor.deskripsi)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="nominal" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Nominal </label><input${ssrRenderAttr("value", unref(form).vendor.nominalFormatted)} type="text" id="nominal" placeholder="0" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}>`);
            if ((_b = unref(form).errors.vendor) == null ? void 0 : _b.nominal) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.vendor.nominal)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5cb7ff1a${_scopeId}><label for="vendor_id" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> Pilih Vendor <span class="text-red-500" data-v-5cb7ff1a${_scopeId}>*</span></label><select id="vendor_id" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}><option value="" data-v-5cb7ff1a${ssrIncludeBooleanAttr(Array.isArray(unref(form).vendor.vendor_id) ? ssrLooseContain(unref(form).vendor.vendor_id, "") : ssrLooseEqual(unref(form).vendor.vendor_id, "")) ? " selected" : ""}${_scopeId}>Pilih vendor...</option><!--[-->`);
            ssrRenderList(__props.vendors, (vendorOption) => {
              _push2(`<option${ssrRenderAttr("value", vendorOption.id)} data-v-5cb7ff1a${ssrIncludeBooleanAttr(Array.isArray(unref(form).vendor.vendor_id) ? ssrLooseContain(unref(form).vendor.vendor_id, vendorOption.id) : ssrLooseEqual(unref(form).vendor.vendor_id, vendorOption.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(vendorOption.nama_vendor)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if ((_c = unref(form).errors.vendor) == null ? void 0 : _c.vendor_id) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.vendor.vendor_id)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(form).vendor.vendor_id) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3 bg-sage-100 rounded-lg" data-v-5cb7ff1a${_scopeId}><div data-v-5cb7ff1a${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-5cb7ff1a${_scopeId}> Nomor Rekening </label><p class="text-sm text-gray-900 font-mono" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).vendor.no_rekening || "-")}</p></div><div data-v-5cb7ff1a${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-5cb7ff1a${_scopeId}> Nama Rekening </label><p class="text-sm text-gray-900" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).vendor.nama_rekening || "-")}</p></div><div data-v-5cb7ff1a${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-5cb7ff1a${_scopeId}> NIB </label><p class="text-sm text-gray-900 font-mono" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).vendor.nib || "-")}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div data-v-5cb7ff1a${_scopeId}><label for="rcvd_inv" class="block text-sm font-medium text-sage-700 mb-2" data-v-5cb7ff1a${_scopeId}> RCVD INV </label><input${ssrRenderAttr("value", unref(form).vendor.rcvd_inv)} type="text" id="rcvd_inv" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-5cb7ff1a${_scopeId}>`);
            if ((_d = unref(form).errors.vendor) == null ? void 0 : _d.rcvd_inv) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-5cb7ff1a${_scopeId}>${ssrInterpolate(unref(form).errors.vendor.rcvd_inv)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200" data-v-5cb7ff1a${_scopeId}>`);
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-5cb7ff1a${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-5cb7ff1a${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-5cb7ff1a${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-5cb7ff1a${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-5cb7ff1a${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-5cb7ff1a${_scopeId}>Update Pelanggan</span>`);
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
                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          })
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, " Edit Pelanggan: " + toDisplayString(__props.customer.customer_code || __props.customer.no), 1),
                        createVNode("p", { class: "text-sage-600" }, " Perbarui informasi pelanggan dan status komunikasi ")
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
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Form Edit Pelanggan "),
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
                          onClick: toggleCompanyInfo,
                          class: "w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
                        }, [
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, " 🏢 Informasi Perusahaan/Perorangan "),
                          (openBlock(), createBlock("svg", {
                            class: [{ "rotate-180": isCompanyInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                              for: "company_name",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Nama PT/Perorangan "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).company_name = $event,
                              type: "text",
                              id: "company_name",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Masukkan nama perusahaan atau nama lengkap"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).company_name]
                            ]),
                            unref(form).errors.company_name ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.company_name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "company_type",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Jenis Usaha "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).company_type = $event,
                              id: "company_type",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, [
                              createVNode("option", { value: "" }, "Pilih jenis usaha..."),
                              createVNode("option", { value: "PT" }, "PT (Perseroan Terbatas)"),
                              createVNode("option", { value: "CV" }, "CV (Commanditaire Vennootschap)"),
                              createVNode("option", { value: "Perorangan" }, "Perorangan"),
                              createVNode("option", { value: "Yayasan" }, "Yayasan"),
                              createVNode("option", { value: "Koperasi" }, "Koperasi"),
                              createVNode("option", { value: "Lainnya" }, "Lainnya")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, unref(form).company_type]
                            ]),
                            unref(form).errors.company_type ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.company_type), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "company_address",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Alamat PT/Domisili "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).company_address = $event,
                              id: "company_address",
                              rows: "3",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none",
                              placeholder: "Masukkan alamat lengkap perusahaan/domisili"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).company_address]
                            ]),
                            unref(form).errors.company_address ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.company_address), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "invoice_address",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Alamat Kirim Invoice "),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).invoice_address = $event,
                              id: "invoice_address",
                              rows: "3",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none",
                              placeholder: "Masukkan alamat untuk pengiriman invoice (opsional)"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).invoice_address]
                            ]),
                            unref(form).errors.invoice_address ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.invoice_address), 1)) : createCommentVNode("", true)
                          ])
                        ], 512), [
                          [vShow, isCompanyInfoOpen.value]
                        ])
                      ]),
                      createVNode("div", { class: "border border-sage-200 rounded-lg" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: toggleLegalInfo,
                          class: "w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
                        }, [
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, " 📄 Data Legalitas "),
                          (openBlock(), createBlock("svg", {
                            class: [{ "rotate-180": isLegalInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                              for: "nib",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " NIB (Nomor Induk Berusaha) "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).nib = $event,
                              type: "text",
                              id: "nib",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Masukkan nomor induk berusaha"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).nib]
                            ]),
                            unref(form).errors.nib ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.nib), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "npwp",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " NPWP "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).npwp = $event,
                              type: "text",
                              id: "npwp",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Masukkan nomor NPWP"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).npwp]
                            ]),
                            unref(form).errors.npwp ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.npwp), 1)) : createCommentVNode("", true)
                          ]),
                          withDirectives(createVNode("div", null, [
                            createVNode("label", {
                              for: "ktp_number",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Nomor KTP "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).ktp_number = $event,
                              type: "text",
                              id: "ktp_number",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Masukkan nomor KTP"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).ktp_number]
                            ]),
                            unref(form).errors.ktp_number ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.ktp_number), 1)) : createCommentVNode("", true)
                          ], 512), [
                            [vShow, unref(form).company_type === "Perorangan"]
                          ])
                        ], 512), [
                          [vShow, isLegalInfoOpen.value]
                        ])
                      ]),
                      createVNode("div", { class: "border border-sage-200 rounded-lg" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: togglePicInfo,
                          class: "w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
                        }, [
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, " 👤 Data PIC (Person In Charge) "),
                          (openBlock(), createBlock("svg", {
                            class: [{ "rotate-180": isPicInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                              for: "pic_name",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Nama PIC "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_name = $event,
                              type: "text",
                              id: "pic_name",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Masukkan nama lengkap PIC"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).pic_name]
                            ]),
                            unref(form).errors.pic_name ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.pic_name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "pic_phone",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Kontak/Telepon Aktif PIC "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_phone = $event,
                              type: "tel",
                              id: "pic_phone",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Contoh: 08123456789"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).pic_phone]
                            ]),
                            unref(form).errors.pic_phone ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.pic_phone), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "pic_email",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Email Aktif PIC "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_email = $event,
                              type: "email",
                              id: "pic_email",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "contoh@email.com"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).pic_email]
                            ]),
                            unref(form).errors.pic_email ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.pic_email), 1)) : createCommentVNode("", true)
                          ])
                        ], 512), [
                          [vShow, isPicInfoOpen.value]
                        ])
                      ]),
                      createVNode("div", { class: "border border-sage-200 rounded-lg" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: toggleMarketingInfo,
                          class: "w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
                        }, [
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, " 📈 Data Marketing "),
                          (openBlock(), createBlock("svg", {
                            class: [{ "rotate-180": isMarketingInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                              for: "marketing_name",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Nama Marketing "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).marketing_name = $event,
                              type: "text",
                              id: "marketing_name",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Masukkan nama marketing yang bertanggung jawab"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).marketing_name]
                            ]),
                            unref(form).errors.marketing_name ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.marketing_name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "marketing_phone",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Nomor Telepon Marketing "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).marketing_phone = $event,
                              type: "tel",
                              id: "marketing_phone",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Contoh: 08123456789"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).marketing_phone]
                            ]),
                            unref(form).errors.marketing_phone ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.marketing_phone), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "marketing_email",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Email Marketing "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).marketing_email = $event,
                              type: "email",
                              id: "marketing_email",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "marketing@email.com"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).marketing_email]
                            ]),
                            unref(form).errors.marketing_email ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.marketing_email), 1)) : createCommentVNode("", true)
                          ])
                        ], 512), [
                          [vShow, isMarketingInfoOpen.value]
                        ])
                      ]),
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
                          onClick: toggleDocumentInfo,
                          class: "w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
                        }, [
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, " Dokumen & Foto "),
                          (openBlock(), createBlock("svg", {
                            class: [{ "rotate-180": isDocumentInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"],
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
                          __props.customer.photo_path ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Foto Saat Ini "),
                            createVNode("div", { class: "flex items-center space-x-4" }, [
                              createVNode("img", {
                                src: `/storage/${__props.customer.photo_path}`,
                                alt: "Foto Pelanggan",
                                class: "w-20 h-20 object-cover rounded-lg border border-gray-200"
                              }, null, 8, ["src"]),
                              createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(__props.customer.photo_path.split("/").pop()), 1)
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "photo",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, toDisplayString(__props.customer.photo_path ? "Ganti Foto Pelanggan" : "Foto Pelanggan"), 1),
                            createVNode("input", {
                              type: "file",
                              id: "photo",
                              onChange: handlePhotoChange,
                              accept: "image/*",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                            }, null, 32),
                            createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Format yang didukung: JPG, PNG, GIF. Maksimal 2MB. "),
                            unref(form).errors.photo ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.photo), 1)) : createCommentVNode("", true)
                          ]),
                          __props.customer.legal_document_path ? (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Dokumen Legal Saat Ini "),
                            createVNode("div", { class: "flex items-center space-x-4" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                (openBlock(), createBlock("svg", {
                                  class: "w-8 h-8 text-red-600",
                                  fill: "none",
                                  stroke: "currentColor",
                                  viewBox: "0 0 24 24"
                                }, [
                                  createVNode("path", {
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round",
                                    "stroke-width": "2",
                                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                  })
                                ])),
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(__props.customer.legal_document_path.split("/").pop()), 1),
                                  createVNode("a", {
                                    href: `/storage/${__props.customer.legal_document_path}`,
                                    target: "_blank",
                                    class: "text-xs text-sage-600 hover:text-sage-800"
                                  }, " Lihat Dokumen ", 8, ["href"])
                                ])
                              ])
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "legal_document",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, toDisplayString(__props.customer.legal_document_path ? "Ganti Dokumen Legal" : "Dokumen Legal"), 1),
                            createVNode("input", {
                              type: "file",
                              id: "legal_document",
                              onChange: handleLegalDocumentChange,
                              accept: ".pdf",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                            }, null, 32),
                            createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Format yang didukung: PDF. Maksimal 10MB. "),
                            unref(form).errors.legal_document ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.legal_document), 1)) : createCommentVNode("", true)
                          ])
                        ], 512), [
                          [vShow, isDocumentInfoOpen.value]
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
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "deskripsi",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Deskripsi "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).vendor.deskripsi = $event,
                              id: "deskripsi",
                              rows: "2",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).vendor.deskripsi]
                            ]),
                            ((_e = unref(form).errors.vendor) == null ? void 0 : _e.deskripsi) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.vendor.deskripsi), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "nominal",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Nominal "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).vendor.nominalFormatted = $event,
                              type: "text",
                              id: "nominal",
                              onInput: ($event) => formatNominal($event),
                              onBlur: ($event) => updateNominalValue(),
                              placeholder: "0",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, null, 40, ["onUpdate:modelValue", "onInput", "onBlur"]), [
                              [vModelText, unref(form).vendor.nominalFormatted]
                            ]),
                            ((_f = unref(form).errors.vendor) == null ? void 0 : _f.nominal) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.vendor.nominal), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "vendor_id",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Pilih Vendor "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).vendor.vendor_id = $event,
                              id: "vendor_id",
                              required: "",
                              onChange: ($event) => onVendorChange(),
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, [
                              createVNode("option", { value: "" }, "Pilih vendor..."),
                              (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors, (vendorOption) => {
                                return openBlock(), createBlock("option", {
                                  key: vendorOption.id,
                                  value: vendorOption.id
                                }, toDisplayString(vendorOption.nama_vendor), 9, ["value"]);
                              }), 128))
                            ], 40, ["onUpdate:modelValue", "onChange"]), [
                              [vModelSelect, unref(form).vendor.vendor_id]
                            ]),
                            ((_g = unref(form).errors.vendor) == null ? void 0 : _g.vendor_id) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.vendor.vendor_id), 1)) : createCommentVNode("", true)
                          ]),
                          unref(form).vendor.vendor_id ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3 bg-sage-100 rounded-lg"
                          }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nomor Rekening "),
                              createVNode("p", { class: "text-sm text-gray-900 font-mono" }, toDisplayString(unref(form).vendor.no_rekening || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nama Rekening "),
                              createVNode("p", { class: "text-sm text-gray-900" }, toDisplayString(unref(form).vendor.nama_rekening || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " NIB "),
                              createVNode("p", { class: "text-sm text-gray-900 font-mono" }, toDisplayString(unref(form).vendor.nib || "-"), 1)
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "rcvd_inv",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " RCVD INV "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).vendor.rcvd_inv = $event,
                              type: "text",
                              id: "rcvd_inv",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).vendor.rcvd_inv]
                            ]),
                            ((_h = unref(form).errors.vendor) == null ? void 0 : _h.rcvd_inv) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.vendor.rcvd_inv), 1)) : createCommentVNode("", true)
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
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Menyimpan...")) : (openBlock(), createBlock("span", { key: 2 }, "Update Pelanggan"))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Customers/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5cb7ff1a"]]);
export {
  Edit as default
};
