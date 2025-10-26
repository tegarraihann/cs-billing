import { ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, vModelSelect, vShow, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BAq-XFJ2.js";
import { Edit as Edit$1, Eye, ArrowLeft, Building, ChevronDown } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DoATCgt2.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    customer: Object
  },
  setup(__props) {
    const props = __props;
    const isCompanyInfoOpen = ref(true);
    const toggleCompanyInfo = () => {
      isCompanyInfoOpen.value = !isCompanyInfoOpen.value;
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
            _push2(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-1f77e93b${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-1f77e93b${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-1f77e93b${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-1f77e93b${_scopeId}><div class="flex items-center" data-v-1f77e93b${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-1f77e93b${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Edit$1), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-1f77e93b${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-1f77e93b${_scopeId}>Edit Pelanggan: ${ssrInterpolate(__props.customer.customer_code || __props.customer.no)}</h1><p class="mt-1 text-sm text-gray-600" data-v-1f77e93b${_scopeId}>Perbarui informasi pelanggan</p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-1f77e93b${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.customers.show", __props.customer.id),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Eye), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Lihat Detail `);
                } else {
                  return [
                    createVNode(unref(Eye), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Lihat Detail ")
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
                  _push3(` Kembali `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-1f77e93b${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-1f77e93b${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-1f77e93b${_scopeId}>Form Edit Pelanggan</h3><p class="mt-1 text-sm text-gray-600" data-v-1f77e93b${_scopeId}>Perbarui informasi pelanggan dengan benar</p></div><div class="p-6" data-v-1f77e93b${_scopeId}><form class="space-y-8" data-v-1f77e93b${_scopeId}><div class="border border-gray-200 rounded-lg" data-v-1f77e93b${_scopeId}><button type="button" class="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg" data-v-1f77e93b${_scopeId}><h4 class="text-lg font-semibold text-gray-900 flex items-center" data-v-1f77e93b${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Building), { class: "mr-2 h-5 w-5" }, null, _parent2, _scopeId));
            _push2(` Informasi Perusahaan/Perorangan </h4>`);
            _push2(ssrRenderComponent(unref(ChevronDown), {
              class: [{ "rotate-180": isCompanyInfoOpen.value }, "w-5 h-5 text-gray-600 transition-transform duration-200"]
            }, null, _parent2, _scopeId));
            _push2(`</button><div style="${ssrRenderStyle(isCompanyInfoOpen.value ? null : { display: "none" })}" class="p-4 space-y-4" data-v-1f77e93b${_scopeId}><div data-v-1f77e93b${_scopeId}><label for="customer_code" class="block text-sm font-medium text-sage-700 mb-2" data-v-1f77e93b${_scopeId}> Customer Code </label><input${ssrRenderAttr("value", unref(form).customer_code)} type="text" id="customer_code" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Customer code (e.g., CUST0001)" data-v-1f77e93b${_scopeId}>`);
            if (unref(form).errors.customer_code) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-1f77e93b${_scopeId}>${ssrInterpolate(unref(form).errors.customer_code)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-sm text-gray-500" data-v-1f77e93b${_scopeId}> Customer code harus unik untuk setiap customer </p></div><div data-v-1f77e93b${_scopeId}><label for="company_name" class="block text-sm font-medium text-sage-700 mb-2" data-v-1f77e93b${_scopeId}> Nama PT/Perorangan <span class="text-red-500" data-v-1f77e93b${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).company_name)} type="text" id="company_name" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nama perusahaan atau nama lengkap" data-v-1f77e93b${_scopeId}>`);
            if (unref(form).errors.company_name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-1f77e93b${_scopeId}>${ssrInterpolate(unref(form).errors.company_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-1f77e93b${_scopeId}><label for="company_type" class="block text-sm font-medium text-sage-700 mb-2" data-v-1f77e93b${_scopeId}> Jenis Usaha <span class="text-red-500" data-v-1f77e93b${_scopeId}>*</span></label><select id="company_type" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" data-v-1f77e93b${_scopeId}><option value="" data-v-1f77e93b${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "") : ssrLooseEqual(unref(form).company_type, "")) ? " selected" : ""}${_scopeId}>Pilih jenis usaha...</option><option value="PT" data-v-1f77e93b${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "PT") : ssrLooseEqual(unref(form).company_type, "PT")) ? " selected" : ""}${_scopeId}>PT (Perseroan Terbatas)</option><option value="CV" data-v-1f77e93b${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "CV") : ssrLooseEqual(unref(form).company_type, "CV")) ? " selected" : ""}${_scopeId}>CV (Commanditaire Vennootschap)</option><option value="Perorangan" data-v-1f77e93b${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Perorangan") : ssrLooseEqual(unref(form).company_type, "Perorangan")) ? " selected" : ""}${_scopeId}>Perorangan</option><option value="Yayasan" data-v-1f77e93b${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Yayasan") : ssrLooseEqual(unref(form).company_type, "Yayasan")) ? " selected" : ""}${_scopeId}>Yayasan</option><option value="Koperasi" data-v-1f77e93b${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Koperasi") : ssrLooseEqual(unref(form).company_type, "Koperasi")) ? " selected" : ""}${_scopeId}>Koperasi</option><option value="Lainnya" data-v-1f77e93b${ssrIncludeBooleanAttr(Array.isArray(unref(form).company_type) ? ssrLooseContain(unref(form).company_type, "Lainnya") : ssrLooseEqual(unref(form).company_type, "Lainnya")) ? " selected" : ""}${_scopeId}>Lainnya</option></select>`);
            if (unref(form).errors.company_type) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-1f77e93b${_scopeId}>${ssrInterpolate(unref(form).errors.company_type)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-1f77e93b${_scopeId}><label for="company_address" class="block text-sm font-medium text-sage-700 mb-2" data-v-1f77e93b${_scopeId}> Alamat PT/Domisili <span class="text-red-500" data-v-1f77e93b${_scopeId}>*</span></label><textarea id="company_address" rows="3" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" placeholder="Masukkan alamat lengkap perusahaan/domisili" data-v-1f77e93b${_scopeId}>${ssrInterpolate(unref(form).company_address)}</textarea>`);
            if (unref(form).errors.company_address) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-1f77e93b${_scopeId}>${ssrInterpolate(unref(form).errors.company_address)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-1f77e93b${_scopeId}><label for="invoice_address" class="block text-sm font-medium text-sage-700 mb-2" data-v-1f77e93b${_scopeId}> Alamat Kirim Invoice </label><textarea id="invoice_address" rows="3" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none" placeholder="Masukkan alamat untuk pengiriman invoice (opsional)" data-v-1f77e93b${_scopeId}>${ssrInterpolate(unref(form).invoice_address)}</textarea>`);
            if (unref(form).errors.invoice_address) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-1f77e93b${_scopeId}>${ssrInterpolate(unref(form).errors.invoice_address)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200" data-v-1f77e93b${_scopeId}>`);
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-1f77e93b${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-1f77e93b${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-1f77e93b${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-1f77e93b${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-1f77e93b${_scopeId}>Memperbarui...</span>`);
            } else {
              _push2(`<span data-v-1f77e93b${_scopeId}>Perbarui Pelanggan</span>`);
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
                          createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, "Edit Pelanggan: " + toDisplayString(__props.customer.customer_code || __props.customer.no), 1),
                          createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Perbarui informasi pelanggan")
                        ])
                      ]),
                      createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.customers.show", __props.customer.id),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Eye), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Lihat Detail ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.customers.index"),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Kembali ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                    createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Form Edit Pelanggan"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Perbarui informasi pelanggan dengan benar")
                  ]),
                  createVNode("div", { class: "p-6" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-8"
                    }, [
                      createVNode("div", { class: "border border-gray-200 rounded-lg" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: toggleCompanyInfo,
                          class: "w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors rounded-t-lg"
                        }, [
                          createVNode("h4", { class: "text-lg font-semibold text-gray-900 flex items-center" }, [
                            createVNode(unref(Building), { class: "mr-2 h-5 w-5" }),
                            createTextVNode(" Informasi Perusahaan/Perorangan ")
                          ]),
                          createVNode(unref(ChevronDown), {
                            class: [{ "rotate-180": isCompanyInfoOpen.value }, "w-5 h-5 text-gray-600 transition-transform duration-200"]
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
                            createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " Customer code harus unik untuk setiap customer ")
                          ]),
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
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Memperbarui...")) : (openBlock(), createBlock("span", { key: 2 }, "Perbarui Pelanggan"))
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
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1f77e93b"]]);
export {
  Edit as default
};
