import { ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, vModelSelect, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BXHi-kqO.js";
import { Edit as Edit$1, Eye, ArrowLeft, ChevronDown } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    customer: Object
  },
  setup(__props) {
    const props = __props;
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
    const handlePhotoChange = (event) => {
      const file = event.target.files[0];
      form.photo = file || null;
    };
    const handleLegalDocumentChange = (event) => {
      const file = event.target.files[0];
      form.legal_document = file || null;
    };
    const form = useForm({
      customer_code: props.customer.customer_code || "",
      company_name: props.customer.company_name || "",
      company_type: props.customer.company_type || "",
      company_address: props.customer.company_address || "",
      invoice_address: props.customer.invoice_address || "",
      nib: props.customer.nib || "",
      npwp: props.customer.npwp || "",
      ktp_number: props.customer.ktp_number || "",
      pic_name: props.customer.pic_name || "",
      pic_phone: props.customer.pic_phone || "",
      pic_email: props.customer.pic_email || "",
      marketing_name: props.customer.marketing_name || "",
      marketing_phone: props.customer.marketing_phone || "",
      marketing_email: props.customer.marketing_email || "",
      photo: null,
      legal_document: null
    });
    const submit = () => {
      form.put(route("admin-keuangan.customers.update", props.customer.id), {
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
            _push2(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-b67c7a26${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-b67c7a26${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-b67c7a26${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-b67c7a26${_scopeId}><div class="flex items-center" data-v-b67c7a26${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-b67c7a26${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Edit$1), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-b67c7a26${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-b67c7a26${_scopeId}>Edit Customer: ${ssrInterpolate(__props.customer.customer_code || __props.customer.no)}</h1><p class="mt-1 text-sm text-gray-600" data-v-b67c7a26${_scopeId}>Update customer information</p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-b67c7a26${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.customers.show", __props.customer.id),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Eye), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` View Details `);
                } else {
                  return [
                    createVNode(unref(Eye), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" View Details ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.customers.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
            _push2(`</div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-b67c7a26${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-b67c7a26${_scopeId}><h3 class="text-lg font-semibold text-gray-900" data-v-b67c7a26${_scopeId}>Edit Customer Form</h3><p class="mt-1 text-sm text-gray-600" data-v-b67c7a26${_scopeId}>Update the customer information accurately</p></div><div class="p-6" data-v-b67c7a26${_scopeId}><form class="space-y-8" data-v-b67c7a26${_scopeId}><div class="border border-sage-200 rounded-lg" data-v-b67c7a26${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-b67c7a26${_scopeId}><h4 class="text-lg font-semibold text-sage-800 flex items-center" data-v-b67c7a26${_scopeId}> Company / Individual Information </h4>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": isCompanyInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</button><div style="${ssrRenderStyle(isCompanyInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-b67c7a26${_scopeId}><div data-v-b67c7a26${_scopeId}><label for="customer_code" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Customer Code </label><input${ssrRenderAttr("value", unref(form).customer_code)} type="text" id="customer_code" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Customer code (e.g., CUST0001)" data-v-b67c7a26${_scopeId}>`);
            if (unref(form).errors.customer_code) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.customer_code)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-sm text-gray-500" data-v-b67c7a26${_scopeId}> Customer codes must be unique for each customer </p></div><div data-v-b67c7a26${_scopeId}><label for="company_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Company / Individual Name <span class="text-red-500" data-v-b67c7a26${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).company_name)} type="text" id="company_name" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Enter the company name or full name" data-v-b67c7a26${_scopeId}>`);
            if (unref(form).errors.company_name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.company_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b67c7a26${_scopeId}><label for="company_type" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Business Type <span class="text-red-500" data-v-b67c7a26${_scopeId}>*</span></label><select id="company_type" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-b67c7a26${_scopeId}><option value="" data-v-b67c7a26${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "") : ssrLooseEqual(unref(form).company_type, "")) ? " selected" : ""}${_scopeId}>Select business type...</option><option value="PT" data-v-b67c7a26${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "PT") : ssrLooseEqual(unref(form).company_type, "PT")) ? " selected" : ""}${_scopeId}>PT (Limited Liability Company)</option><option value="CV" data-v-b67c7a26${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "CV") : ssrLooseEqual(unref(form).company_type, "CV")) ? " selected" : ""}${_scopeId}>CV (Limited Partnership)</option><option value="Perorangan" data-v-b67c7a26${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Perorangan") : ssrLooseEqual(unref(form).company_type, "Perorangan")) ? " selected" : ""}${_scopeId}>Individual</option><option value="Yayasan" data-v-b67c7a26${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Yayasan") : ssrLooseEqual(unref(form).company_type, "Yayasan")) ? " selected" : ""}${_scopeId}>Foundation</option><option value="Koperasi" data-v-b67c7a26${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Koperasi") : ssrLooseEqual(unref(form).company_type, "Koperasi")) ? " selected" : ""}${_scopeId}>Cooperative</option><option value="Lainnya" data-v-b67c7a26${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Lainnya") : ssrLooseEqual(unref(form).company_type, "Lainnya")) ? " selected" : ""}${_scopeId}>Other</option></select>`);
            if (unref(form).errors.company_type) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.company_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b67c7a26${_scopeId}><label for="company_address" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Company / Domicile Address <span class="text-red-500" data-v-b67c7a26${_scopeId}>*</span></label><textarea id="company_address" rows="3" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" placeholder="Enter the full company/domicile address" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).company_address)}</textarea>`);
            if (unref(form).errors.company_address) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.company_address)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b67c7a26${_scopeId}><label for="invoice_address" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Invoice Mailing Address </label><textarea id="invoice_address" rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" placeholder="Enter the invoice mailing address (optional)" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).invoice_address)}</textarea>`);
            if (unref(form).errors.invoice_address) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_address)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-b67c7a26${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-b67c7a26${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-b67c7a26${_scopeId}> Legal Information </h4>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": isLegalInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</button><div style="${ssrRenderStyle(isLegalInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-b67c7a26${_scopeId}><div data-v-b67c7a26${_scopeId}><label for="nib" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Business Registration Number (NIB) </label><input${ssrRenderAttr("value", unref(form).nib)} type="text" id="nib" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Enter the business registration number" data-v-b67c7a26${_scopeId}>`);
            if (unref(form).errors.nib) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.nib)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b67c7a26${_scopeId}><label for="npwp" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> NPWP (Tax ID) </label><input${ssrRenderAttr("value", unref(form).npwp)} type="text" id="npwp" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Enter the NPWP number" data-v-b67c7a26${_scopeId}>`);
            if (unref(form).errors.npwp) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.npwp)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div style="${ssrRenderStyle(unref(form).company_type === "Perorangan" ? null : { display: "none" })}" data-v-b67c7a26${_scopeId}><label for="ktp_number" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> National ID Number (KTP) </label><input${ssrRenderAttr("value", unref(form).ktp_number)} type="text" id="ktp_number" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Enter the KTP number" data-v-b67c7a26${_scopeId}>`);
            if (unref(form).errors.ktp_number) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.ktp_number)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-b67c7a26${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-b67c7a26${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-b67c7a26${_scopeId}> PIC (Person in Charge) Details </h4>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": isPicInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</button><div style="${ssrRenderStyle(isPicInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-b67c7a26${_scopeId}><div data-v-b67c7a26${_scopeId}><label for="pic_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> PIC Name <span class="text-red-500" data-v-b67c7a26${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).pic_name)} type="text" id="pic_name" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Enter the PIC&#39;s full name" data-v-b67c7a26${_scopeId}>`);
            if (unref(form).errors.pic_name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.pic_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b67c7a26${_scopeId}><label for="pic_phone" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Active PIC Phone Number <span class="text-red-500" data-v-b67c7a26${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).pic_phone)} type="tel" id="pic_phone" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Example: 08123456789" data-v-b67c7a26${_scopeId}>`);
            if (unref(form).errors.pic_phone) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.pic_phone)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b67c7a26${_scopeId}><label for="pic_email" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Active PIC Email <span class="text-red-500" data-v-b67c7a26${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).pic_email)} type="email" id="pic_email" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="example@email.com" data-v-b67c7a26${_scopeId}>`);
            if (unref(form).errors.pic_email) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.pic_email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-b67c7a26${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-b67c7a26${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-b67c7a26${_scopeId}> Marketing Details </h4>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": isMarketingInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</button><div style="${ssrRenderStyle(isMarketingInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-b67c7a26${_scopeId}><div data-v-b67c7a26${_scopeId}><label for="marketing_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Marketing Name </label><input${ssrRenderAttr("value", unref(form).marketing_name)} type="text" id="marketing_name" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Enter the responsible marketing contact" data-v-b67c7a26${_scopeId}>`);
            if (unref(form).errors.marketing_name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.marketing_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b67c7a26${_scopeId}><label for="marketing_phone" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Marketing Phone Number </label><input${ssrRenderAttr("value", unref(form).marketing_phone)} type="tel" id="marketing_phone" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Example: 08123456789" data-v-b67c7a26${_scopeId}>`);
            if (unref(form).errors.marketing_phone) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.marketing_phone)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b67c7a26${_scopeId}><label for="marketing_email" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Marketing Email </label><input${ssrRenderAttr("value", unref(form).marketing_email)} type="email" id="marketing_email" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="marketing@email.com" data-v-b67c7a26${_scopeId}>`);
            if (unref(form).errors.marketing_email) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.marketing_email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border border-sage-200 rounded-lg" data-v-b67c7a26${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-sage-50 hover:bg-sage-100 transition-colors rounded-t-lg" data-v-b67c7a26${_scopeId}><h4 class="text-lg font-semibold text-sage-800" data-v-b67c7a26${_scopeId}> Documents &amp; Photos </h4>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": isDocumentInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</button><div style="${ssrRenderStyle(isDocumentInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-b67c7a26${_scopeId}><div data-v-b67c7a26${_scopeId}><label for="photo" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Customer Photo </label><input type="file" id="photo" accept="image/*" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200" data-v-b67c7a26${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-b67c7a26${_scopeId}> Supported formats: JPG, PNG, GIF. Max 2MB. </p>`);
            if (unref(form).errors.photo) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.photo)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-b67c7a26${_scopeId}><label for="legal_document" class="block text-sm font-medium text-sage-700 mb-2" data-v-b67c7a26${_scopeId}> Legal Document </label><input type="file" id="legal_document" accept=".pdf" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200" data-v-b67c7a26${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-b67c7a26${_scopeId}> Supported format: PDF. Max 10MB. </p>`);
            if (unref(form).errors.legal_document) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-b67c7a26${_scopeId}>${ssrInterpolate(unref(form).errors.legal_document)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200" data-v-b67c7a26${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.customers.index"),
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-b67c7a26${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-b67c7a26${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-b67c7a26${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-b67c7a26${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-b67c7a26${_scopeId}>Updating...</span>`);
            } else {
              _push2(`<span data-v-b67c7a26${_scopeId}>Update Customer</span>`);
            }
            _push2(`</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" }, [
                          createVNode(unref(Edit$1), { class: "w-6 h-6 text-white" })
                        ]),
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, "Edit Customer: " + toDisplayString(__props.customer.customer_code || __props.customer.no), 1),
                          createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Update customer information")
                        ])
                      ]),
                      createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.customers.show", __props.customer.id),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Eye), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" View Details ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.customers.index"),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-gray-900" }, "Edit Customer Form"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Update the customer information accurately")
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
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800 flex items-center" }, " Company / Individual Information "),
                          createVNode(unref(ChevronDown), {
                            class: [{ "rotate-180": isCompanyInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                          }, null, 8, ["class"])
                        ]),
                        withDirectives(createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "customer_code",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Customer Code "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).customer_code = $event,
                              type: "text",
                              id: "customer_code",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Customer code (e.g., CUST0001)"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).customer_code]
                            ]),
                            unref(form).errors.customer_code ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.customer_code), 1)) : createCommentVNode("", true),
                            createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " Customer codes must be unique for each customer ")
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "company_name",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Company / Individual Name "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).company_name = $event,
                              type: "text",
                              id: "company_name",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Enter the company name or full name"
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
                              createTextVNode(" Business Type "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("select", {
                              "onUpdate:modelValue": ($event) => unref(form).company_type = $event,
                              id: "company_type",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"
                            }, [
                              createVNode("option", { value: "" }, "Select business type..."),
                              createVNode("option", { value: "PT" }, "PT (Limited Liability Company)"),
                              createVNode("option", { value: "CV" }, "CV (Limited Partnership)"),
                              createVNode("option", { value: "Perorangan" }, "Individual"),
                              createVNode("option", { value: "Yayasan" }, "Foundation"),
                              createVNode("option", { value: "Koperasi" }, "Cooperative"),
                              createVNode("option", { value: "Lainnya" }, "Other")
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
                              createTextVNode(" Company / Domicile Address "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).company_address = $event,
                              id: "company_address",
                              rows: "3",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none",
                              placeholder: "Enter the full company/domicile address"
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
                            }, " Invoice Mailing Address "),
                            withDirectives(createVNode("textarea", {
                              "onUpdate:modelValue": ($event) => unref(form).invoice_address = $event,
                              id: "invoice_address",
                              rows: "3",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none",
                              placeholder: "Enter the invoice mailing address (optional)"
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
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, " Legal Information "),
                          createVNode(unref(ChevronDown), {
                            class: [{ "rotate-180": isLegalInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                          }, null, 8, ["class"])
                        ]),
                        withDirectives(createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "nib",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Business Registration Number (NIB) "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).nib = $event,
                              type: "text",
                              id: "nib",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Enter the business registration number"
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
                            }, " NPWP (Tax ID) "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).npwp = $event,
                              type: "text",
                              id: "npwp",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Enter the NPWP number"
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
                            }, " National ID Number (KTP) "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).ktp_number = $event,
                              type: "text",
                              id: "ktp_number",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Enter the KTP number"
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
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, " PIC (Person in Charge) Details "),
                          createVNode(unref(ChevronDown), {
                            class: [{ "rotate-180": isPicInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                          }, null, 8, ["class"])
                        ]),
                        withDirectives(createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "pic_name",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" PIC Name "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_name = $event,
                              type: "text",
                              id: "pic_name",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Enter the PIC's full name"
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
                              createTextVNode(" Active PIC Phone Number "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_phone = $event,
                              type: "tel",
                              id: "pic_phone",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Example: 08123456789"
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
                              createTextVNode(" Active PIC Email "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).pic_email = $event,
                              type: "email",
                              id: "pic_email",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "example@email.com"
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
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, " Marketing Details "),
                          createVNode(unref(ChevronDown), {
                            class: [{ "rotate-180": isMarketingInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                          }, null, 8, ["class"])
                        ]),
                        withDirectives(createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "marketing_name",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Marketing Name "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).marketing_name = $event,
                              type: "text",
                              id: "marketing_name",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Enter the responsible marketing contact"
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
                            }, " Marketing Phone Number "),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).marketing_phone = $event,
                              type: "tel",
                              id: "marketing_phone",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Example: 08123456789"
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
                            }, " Marketing Email "),
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
                          createVNode("h4", { class: "text-lg font-semibold text-sage-800" }, " Documents & Photos "),
                          createVNode(unref(ChevronDown), {
                            class: [{ "rotate-180": isDocumentInfoOpen.value }, "w-5 h-5 text-sage-600 transition-transform duration-200"]
                          }, null, 8, ["class"])
                        ]),
                        withDirectives(createVNode("div", { class: "p-4 space-y-4" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "photo",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Customer Photo "),
                            createVNode("input", {
                              type: "file",
                              id: "photo",
                              onChange: handlePhotoChange,
                              accept: "image/*",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                            }, null, 32),
                            createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Supported formats: JPG, PNG, GIF. Max 2MB. "),
                            unref(form).errors.photo ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.photo), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "legal_document",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Legal Document "),
                            createVNode("input", {
                              type: "file",
                              id: "legal_document",
                              onChange: handleLegalDocumentChange,
                              accept: ".pdf",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"
                            }, null, 32),
                            createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Supported format: PDF. Max 10MB. "),
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
                            createTextVNode(" Cancel ")
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
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Updating...")) : (openBlock(), createBlock("span", { key: 2 }, "Update Customer"))
                        ], 8, ["disabled"])
                      ])
                    ], 32)
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Customers/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b67c7a26"]]);
export {
  Edit as default
};
