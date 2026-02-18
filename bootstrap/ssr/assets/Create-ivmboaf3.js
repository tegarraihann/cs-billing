import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, withDirectives, createCommentVNode, vModelText, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    errors: Object
  },
  setup(__props) {
    const form = useForm({
      nama_vendor: "",
      pic: "",
      no_hp: "",
      email: "",
      no_kantor: "",
      nomor_rekening: "",
      nama_rekening: "",
      nib: "",
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
    const submit = () => {
      form.post(route("admin-keuangan.vendors.store"), {
        onSuccess: () => {
        },
        onError: (errors) => {
          console.log("Validation errors:", errors);
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-6497ccfd${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-6497ccfd${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-6497ccfd${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-6497ccfd${_scopeId}><div class="flex items-center" data-v-6497ccfd${_scopeId}><div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" data-v-6497ccfd${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6497ccfd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-6497ccfd${_scopeId}></path></svg></div><div data-v-6497ccfd${_scopeId}><h2 class="text-2xl font-bold text-gray-900" data-v-6497ccfd${_scopeId}> Add New Vendor </h2><p class="text-gray-600" data-v-6497ccfd${_scopeId}> Add a new vendor record to the master data </p></div></div><div class="mt-4 sm:mt-0" data-v-6497ccfd${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.vendors.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6497ccfd${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-6497ccfd${_scopeId2}></path></svg> Back `);
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
                    createTextVNode(" Back ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-6497ccfd${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-6497ccfd${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-6497ccfd${_scopeId}> Add Vendor Form </h3><p class="text-sm text-gray-600 mt-1" data-v-6497ccfd${_scopeId}> Complete the vendor information accurately </p></div><div class="p-6" data-v-6497ccfd${_scopeId}><form class="space-y-6" data-v-6497ccfd${_scopeId}><div data-v-6497ccfd${_scopeId}><label for="nama_vendor" class="block text-sm font-medium text-sage-700 mb-2" data-v-6497ccfd${_scopeId}> Vendor Name <span class="text-red-500" data-v-6497ccfd${_scopeId}>*</span></label><input id="nama_vendor"${ssrRenderAttr("value", unref(form).nama_vendor)} type="text" placeholder="Enter vendor name" class="${ssrRenderClass([{ "border-red-500": __props.errors.nama_vendor }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-6497ccfd${_scopeId}>`);
            if (__props.errors.nama_vendor) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-6497ccfd${_scopeId}>${ssrInterpolate(__props.errors.nama_vendor)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-6497ccfd${_scopeId}><label for="pic" class="block text-sm font-medium text-sage-700 mb-2" data-v-6497ccfd${_scopeId}> PIC (Person in Charge) </label><input id="pic"${ssrRenderAttr("value", unref(form).pic)} type="text" placeholder="Enter PIC name" class="${ssrRenderClass([{ "border-red-500": __props.errors.pic }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-6497ccfd${_scopeId}>`);
            if (__props.errors.pic) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-6497ccfd${_scopeId}>${ssrInterpolate(__props.errors.pic)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-6497ccfd${_scopeId}><label for="no_hp" class="block text-sm font-medium text-sage-700 mb-2" data-v-6497ccfd${_scopeId}> Phone Number </label><input id="no_hp"${ssrRenderAttr("value", unref(form).no_hp)} type="text" placeholder="Enter phone number" class="${ssrRenderClass([{ "border-red-500": __props.errors.no_hp }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-6497ccfd${_scopeId}>`);
            if (__props.errors.no_hp) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-6497ccfd${_scopeId}>${ssrInterpolate(__props.errors.no_hp)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-6497ccfd${_scopeId}><label for="email" class="block text-sm font-medium text-sage-700 mb-2" data-v-6497ccfd${_scopeId}> Email </label><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" placeholder="Enter email address" class="${ssrRenderClass([{ "border-red-500": __props.errors.email }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-6497ccfd${_scopeId}>`);
            if (__props.errors.email) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-6497ccfd${_scopeId}>${ssrInterpolate(__props.errors.email)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-6497ccfd${_scopeId}><label for="no_kantor" class="block text-sm font-medium text-sage-700 mb-2" data-v-6497ccfd${_scopeId}> Office Phone </label><input id="no_kantor"${ssrRenderAttr("value", unref(form).no_kantor)} type="text" placeholder="Enter office phone number" class="${ssrRenderClass([{ "border-red-500": __props.errors.no_kantor }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-6497ccfd${_scopeId}>`);
            if (__props.errors.no_kantor) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-6497ccfd${_scopeId}>${ssrInterpolate(__props.errors.no_kantor)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-6497ccfd${_scopeId}><label for="nomor_rekening" class="block text-sm font-medium text-sage-700 mb-2" data-v-6497ccfd${_scopeId}> Bank Account Number <span class="text-red-500" data-v-6497ccfd${_scopeId}>*</span></label><input id="nomor_rekening"${ssrRenderAttr("value", unref(form).nomor_rekening)} type="text" placeholder="Enter bank account number" class="${ssrRenderClass([{ "border-red-500": __props.errors.nomor_rekening }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-6497ccfd${_scopeId}>`);
            if (__props.errors.nomor_rekening) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-6497ccfd${_scopeId}>${ssrInterpolate(__props.errors.nomor_rekening)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-6497ccfd${_scopeId}><label for="nama_rekening" class="block text-sm font-medium text-sage-700 mb-2" data-v-6497ccfd${_scopeId}> Account Holder Name <span class="text-red-500" data-v-6497ccfd${_scopeId}>*</span></label><input id="nama_rekening"${ssrRenderAttr("value", unref(form).nama_rekening)} type="text" placeholder="Enter account holder name" class="${ssrRenderClass([{ "border-red-500": __props.errors.nama_rekening }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-6497ccfd${_scopeId}>`);
            if (__props.errors.nama_rekening) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-6497ccfd${_scopeId}>${ssrInterpolate(__props.errors.nama_rekening)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-6497ccfd${_scopeId}><label for="nib" class="block text-sm font-medium text-sage-700 mb-2" data-v-6497ccfd${_scopeId}> Business Identification Number (NIB) </label><input id="nib"${ssrRenderAttr("value", unref(form).nib)} type="text" placeholder="Enter business identification number" class="${ssrRenderClass([{ "border-red-500": __props.errors.nib }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}" data-v-6497ccfd${_scopeId}>`);
            if (__props.errors.nib) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-6497ccfd${_scopeId}>${ssrInterpolate(__props.errors.nib)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-6497ccfd${_scopeId}><label for="photo" class="block text-sm font-medium text-sage-700 mb-2" data-v-6497ccfd${_scopeId}> Vendor Photo </label><input type="file" id="photo" accept="image/*" class="${ssrRenderClass([{ "border-red-500": __props.errors.photo }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"])}" data-v-6497ccfd${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-6497ccfd${_scopeId}> Supported formats: JPG, PNG, GIF. Max 2MB. </p>`);
            if (__props.errors.photo) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-6497ccfd${_scopeId}>${ssrInterpolate(__props.errors.photo)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-6497ccfd${_scopeId}><label for="legal_document" class="block text-sm font-medium text-sage-700 mb-2" data-v-6497ccfd${_scopeId}> Legal Document </label><input type="file" id="legal_document" accept=".pdf" class="${ssrRenderClass([{ "border-red-500": __props.errors.legal_document }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200"])}" data-v-6497ccfd${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-6497ccfd${_scopeId}> Supported format: PDF. Max 10MB. </p>`);
            if (__props.errors.legal_document) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-6497ccfd${_scopeId}>${ssrInterpolate(__props.errors.legal_document)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end pt-4 border-t border-sage-200" data-v-6497ccfd${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed" data-v-6497ccfd${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24" data-v-6497ccfd${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-6497ccfd${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-6497ccfd${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-6497ccfd${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" data-v-6497ccfd${_scopeId}></path></svg>`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Saving..." : "Save Vendor")}</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" }, [
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
                          createVNode("h2", { class: "text-2xl font-bold text-gray-900" }, " Add New Vendor "),
                          createVNode("p", { class: "text-gray-600" }, " Add a new vendor record to the master data ")
                        ])
                      ]),
                      createVNode("div", { class: "mt-4 sm:mt-0" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.vendors.index"),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
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
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Add Vendor Form "),
                    createVNode("p", { class: "text-sm text-gray-600 mt-1" }, " Complete the vendor information accurately ")
                  ]),
                  createVNode("div", { class: "p-6" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "nama_vendor",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, [
                          createTextVNode(" Vendor Name "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          id: "nama_vendor",
                          "onUpdate:modelValue": ($event) => unref(form).nama_vendor = $event,
                          type: "text",
                          placeholder: "Enter vendor name",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.nama_vendor }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).nama_vendor]
                        ]),
                        __props.errors.nama_vendor ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.nama_vendor), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "pic",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " PIC (Person in Charge) "),
                        withDirectives(createVNode("input", {
                          id: "pic",
                          "onUpdate:modelValue": ($event) => unref(form).pic = $event,
                          type: "text",
                          placeholder: "Enter PIC name",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.pic }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).pic]
                        ]),
                        __props.errors.pic ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.pic), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "no_hp",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " Phone Number "),
                        withDirectives(createVNode("input", {
                          id: "no_hp",
                          "onUpdate:modelValue": ($event) => unref(form).no_hp = $event,
                          type: "text",
                          placeholder: "Enter phone number",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.no_hp }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).no_hp]
                        ]),
                        __props.errors.no_hp ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.no_hp), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "email",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " Email "),
                        withDirectives(createVNode("input", {
                          id: "email",
                          "onUpdate:modelValue": ($event) => unref(form).email = $event,
                          type: "email",
                          placeholder: "Enter email address",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.email }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).email]
                        ]),
                        __props.errors.email ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.email), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "no_kantor",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " Office Phone "),
                        withDirectives(createVNode("input", {
                          id: "no_kantor",
                          "onUpdate:modelValue": ($event) => unref(form).no_kantor = $event,
                          type: "text",
                          placeholder: "Enter office phone number",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.no_kantor }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).no_kantor]
                        ]),
                        __props.errors.no_kantor ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.no_kantor), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "nomor_rekening",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, [
                          createTextVNode(" Bank Account Number "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          id: "nomor_rekening",
                          "onUpdate:modelValue": ($event) => unref(form).nomor_rekening = $event,
                          type: "text",
                          placeholder: "Enter bank account number",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.nomor_rekening }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).nomor_rekening]
                        ]),
                        __props.errors.nomor_rekening ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.nomor_rekening), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "nama_rekening",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, [
                          createTextVNode(" Account Holder Name "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          id: "nama_rekening",
                          "onUpdate:modelValue": ($event) => unref(form).nama_rekening = $event,
                          type: "text",
                          placeholder: "Enter account holder name",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.nama_rekening }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).nama_rekening]
                        ]),
                        __props.errors.nama_rekening ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.nama_rekening), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "nib",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " Business Identification Number (NIB) "),
                        withDirectives(createVNode("input", {
                          id: "nib",
                          "onUpdate:modelValue": ($event) => unref(form).nib = $event,
                          type: "text",
                          placeholder: "Enter business identification number",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": __props.errors.nib }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).nib]
                        ]),
                        __props.errors.nib ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.nib), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", {
                          for: "photo",
                          class: "block text-sm font-medium text-sage-700 mb-2"
                        }, " Vendor Photo "),
                        createVNode("input", {
                          type: "file",
                          id: "photo",
                          onChange: handlePhotoChange,
                          accept: "image/*",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200", { "border-red-500": __props.errors.photo }]
                        }, null, 34),
                        createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Supported formats: JPG, PNG, GIF. Max 2MB. "),
                        __props.errors.photo ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.photo), 1)) : createCommentVNode("", true)
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
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200", { "border-red-500": __props.errors.legal_document }]
                        }, null, 34),
                        createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Supported format: PDF. Max 10MB. "),
                        __props.errors.legal_document ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.legal_document), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex justify-end pt-4 border-t border-sage-200" }, [
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        }, [
                          unref(form).processing ? (openBlock(), createBlock("svg", {
                            key: 0,
                            class: "w-4 h-4 mr-2 animate-spin",
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
                          ])) : (openBlock(), createBlock("svg", {
                            key: 1,
                            class: "w-4 h-4 mr-2",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M5 13l4 4L19 7"
                            })
                          ])),
                          createTextVNode(" " + toDisplayString(unref(form).processing ? "Saving..." : "Save Vendor"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Vendors/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6497ccfd"]]);
export {
  Create as default
};
