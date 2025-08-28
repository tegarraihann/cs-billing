import { ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, withDirectives, createCommentVNode, vModelText, toDisplayString, vModelSelect, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BEyxLQNh.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B8fnJf_r.js";
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
    const isCompanyInfoOpen = ref(true);
    const isLegalInfoOpen = ref(true);
    const isPicInfoOpen = ref(true);
    const isMarketingInfoOpen = ref(true);
    const isDocumentInfoOpen = ref(true);
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
    const toggleDocumentInfo = () => {
      isDocumentInfoOpen.value = !isDocumentInfoOpen.value;
    };
    const form = useForm({
      // Informasi Perusahaan/Perorangan
      company_name: "",
      company_type: "",
      company_address: "",
      invoice_address: "",
      // Data Legalitas
      nib: "",
      npwp: "",
      ktp_number: "",
      // Data PIC
      pic_name: "",
      pic_phone: "",
      pic_email: "",
      // Data Marketing
      marketing_name: "",
      marketing_phone: "",
      marketing_email: "",
      photo: null,
      legal_document: null
    });
    const handlePhotoChange = (event) => {
      const file = event.target.files[0];
      form.photo = file || null;
    };
    const handleLegalDocumentChange = (event) => {
      const file = event.target.files[0];
      form.legal_document = file || null;
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
      form.post(route("admin-keuangan.customers.store"), {
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
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-0b829811${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-0b829811${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-0b829811${_scopeId}><div class="flex items-center" data-v-0b829811${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-0b829811${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0b829811${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-0b829811${_scopeId}></path></svg></div><div data-v-0b829811${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-0b829811${_scopeId}> Tambah Pelanggan Baru </h2><p class="text-sage-600" data-v-0b829811${_scopeId}> Tambahkan data pelanggan baru ke dalam sistem </p></div></div><div class="mt-4 sm:mt-0" data-v-0b829811${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.customers.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0b829811${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-0b829811${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-0b829811${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-0b829811${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-0b829811${_scopeId}> Form Tambah Pelanggan </h3><p class="text-sm text-sage-600 mt-1" data-v-0b829811${_scopeId}> Lengkapi informasi pelanggan dengan benar </p></div><div class="p-6" data-v-0b829811${_scopeId}><form class="space-y-8" data-v-0b829811${_scopeId}><div class="border border-sage-200 rounded-lg" data-v-0b829811${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-0b829811${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-0b829811${_scopeId}> 🏢 Informasi Perusahaan/Perorangan </h4><svg class="${ssrRenderClass([{ "rotate-180": isCompanyInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0b829811${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-0b829811${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isCompanyInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-0b829811${_scopeId}><div data-v-0b829811${_scopeId}><label for="company_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Nama PT/Perorangan <span class="text-red-500" data-v-0b829811${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).company_name)} type="text" id="company_name" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nama perusahaan atau nama lengkap" data-v-0b829811${_scopeId}>`);
            if (unref(form).errors.company_name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.company_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0b829811${_scopeId}><label for="company_type" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Jenis Usaha <span class="text-red-500" data-v-0b829811${_scopeId}>*</span></label><select id="company_type" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-0b829811${_scopeId}><option value="" data-v-0b829811${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "") : ssrLooseEqual(unref(form).company_type, "")) ? " selected" : ""}${_scopeId}>Pilih jenis usaha...</option><option value="PT" data-v-0b829811${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "PT") : ssrLooseEqual(unref(form).company_type, "PT")) ? " selected" : ""}${_scopeId}>PT (Perseroan Terbatas)</option><option value="CV" data-v-0b829811${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "CV") : ssrLooseEqual(unref(form).company_type, "CV")) ? " selected" : ""}${_scopeId}>CV (Commanditaire Vennootschap)</option><option value="Perorangan" data-v-0b829811${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Perorangan") : ssrLooseEqual(unref(form).company_type, "Perorangan")) ? " selected" : ""}${_scopeId}>Perorangan</option><option value="Yayasan" data-v-0b829811${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Yayasan") : ssrLooseEqual(unref(form).company_type, "Yayasan")) ? " selected" : ""}${_scopeId}>Yayasan</option><option value="Koperasi" data-v-0b829811${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Koperasi") : ssrLooseEqual(unref(form).company_type, "Koperasi")) ? " selected" : ""}${_scopeId}>Koperasi</option><option value="Lainnya" data-v-0b829811${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Lainnya") : ssrLooseEqual(unref(form).company_type, "Lainnya")) ? " selected" : ""}${_scopeId}>Lainnya</option></select>`);
            if (unref(form).errors.company_type) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.company_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0b829811${_scopeId}><label for="company_address" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Alamat PT/Domisili <span class="text-red-500" data-v-0b829811${_scopeId}>*</span></label><textarea id="company_address" rows="3" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" placeholder="Masukkan alamat lengkap perusahaan/domisili" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).company_address)}</textarea>`);
            if (unref(form).errors.company_address) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.company_address)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0b829811${_scopeId}><label for="invoice_address" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Alamat Kirim Invoice </label><textarea id="invoice_address" rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" placeholder="Masukkan alamat untuk pengiriman invoice (opsional)" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).invoice_address)}</textarea>`);
            if (unref(form).errors.invoice_address) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_address)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-0b829811${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-0b829811${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-0b829811${_scopeId}> 📄 Data Legalitas </h4><svg class="${ssrRenderClass([{ "rotate-180": isLegalInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0b829811${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-0b829811${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isLegalInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-0b829811${_scopeId}><div data-v-0b829811${_scopeId}><label for="nib" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> NIB (Nomor Induk Berusaha) </label><input${ssrRenderAttr("value", unref(form).nib)} type="text" id="nib" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nomor induk berusaha" data-v-0b829811${_scopeId}>`);
            if (unref(form).errors.nib) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.nib)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0b829811${_scopeId}><label for="npwp" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> NPWP </label><input${ssrRenderAttr("value", unref(form).npwp)} type="text" id="npwp" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nomor NPWP" data-v-0b829811${_scopeId}>`);
            if (unref(form).errors.npwp) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.npwp)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div style="${ssrRenderStyle(unref(form).company_type === "Perorangan" ? null : { display: "none" })}" data-v-0b829811${_scopeId}><label for="ktp_number" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Nomor KTP </label><input${ssrRenderAttr("value", unref(form).ktp_number)} type="text" id="ktp_number" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nomor KTP" data-v-0b829811${_scopeId}>`);
            if (unref(form).errors.ktp_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.ktp_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-0b829811${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-0b829811${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-0b829811${_scopeId}> 👤 Data PIC (Person In Charge) </h4><svg class="${ssrRenderClass([{ "rotate-180": isPicInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0b829811${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-0b829811${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isPicInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-0b829811${_scopeId}><div data-v-0b829811${_scopeId}><label for="pic_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Nama PIC <span class="text-red-500" data-v-0b829811${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).pic_name)} type="text" id="pic_name" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nama lengkap PIC" data-v-0b829811${_scopeId}>`);
            if (unref(form).errors.pic_name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.pic_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0b829811${_scopeId}><label for="pic_phone" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Kontak/Telepon Aktif PIC <span class="text-red-500" data-v-0b829811${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).pic_phone)} type="tel" id="pic_phone" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Contoh: 08123456789" data-v-0b829811${_scopeId}>`);
            if (unref(form).errors.pic_phone) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.pic_phone)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0b829811${_scopeId}><label for="pic_email" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Email Aktif PIC <span class="text-red-500" data-v-0b829811${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).pic_email)} type="email" id="pic_email" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="contoh@email.com" data-v-0b829811${_scopeId}>`);
            if (unref(form).errors.pic_email) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.pic_email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-0b829811${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-0b829811${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-0b829811${_scopeId}> 📈 Data Marketing </h4><svg class="${ssrRenderClass([{ "rotate-180": isMarketingInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0b829811${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-0b829811${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isMarketingInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-0b829811${_scopeId}><div data-v-0b829811${_scopeId}><label for="marketing_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Nama Marketing </label><input${ssrRenderAttr("value", unref(form).marketing_name)} type="text" id="marketing_name" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nama marketing yang bertanggung jawab" data-v-0b829811${_scopeId}>`);
            if (unref(form).errors.marketing_name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.marketing_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0b829811${_scopeId}><label for="marketing_phone" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Nomor Telepon Marketing </label><input${ssrRenderAttr("value", unref(form).marketing_phone)} type="tel" id="marketing_phone" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Contoh: 08123456789" data-v-0b829811${_scopeId}>`);
            if (unref(form).errors.marketing_phone) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.marketing_phone)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0b829811${_scopeId}><label for="marketing_email" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Email Marketing </label><input${ssrRenderAttr("value", unref(form).marketing_email)} type="email" id="marketing_email" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="marketing@email.com" data-v-0b829811${_scopeId}>`);
            if (unref(form).errors.marketing_email) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.marketing_email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-0b829811${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-0b829811${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-0b829811${_scopeId}> 📄 Dokumen &amp; Foto </h4><svg class="${ssrRenderClass([{ "rotate-180": isDocumentInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0b829811${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-0b829811${_scopeId}></path></svg></button><div style="${ssrRenderStyle(isDocumentInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-0b829811${_scopeId}><div data-v-0b829811${_scopeId}><label for="photo" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Foto Pelanggan </label><input type="file" id="photo" accept="image/*" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200" data-v-0b829811${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-0b829811${_scopeId}> Format yang didukung: JPG, PNG, GIF. Maksimal 2MB. </p>`);
            if (unref(form).errors.photo) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.photo)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-0b829811${_scopeId}><label for="legal_document" class="block text-sm font-medium text-sage-700 mb-2" data-v-0b829811${_scopeId}> Dokumen Legal </label><input type="file" id="legal_document" accept=".pdf" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200" data-v-0b829811${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-0b829811${_scopeId}> Format yang didukung: PDF. Maksimal 10MB. </p>`);
            if (unref(form).errors.legal_document) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-0b829811${_scopeId}>${ssrInterpolate(unref(form).errors.legal_document)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200" data-v-0b829811${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.customers.index"),
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-0b829811${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-0b829811${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-0b829811${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-0b829811${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-0b829811${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-0b829811${_scopeId}>Simpan Pelanggan</span>`);
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
                        href: _ctx.route("admin-keuangan.customers.index"),
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
                          onClick: toggleDocumentInfo,
                          class: "w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg"
                        }, [
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, " 📄 Dokumen & Foto "),
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
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "photo",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Foto Pelanggan "),
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
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "legal_document",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Dokumen Legal "),
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
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.customers.index"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Customers/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0b829811"]]);
export {
  Create as default
};
