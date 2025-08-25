import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, withDirectives, createCommentVNode, vModelText, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-B9DgXThx.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-DiVH08Np.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      nama_vendor: "",
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
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-eb93c4c9${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-eb93c4c9${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-eb93c4c9${_scopeId}><div class="flex items-center" data-v-eb93c4c9${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-eb93c4c9${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb93c4c9${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-eb93c4c9${_scopeId}></path></svg></div><div data-v-eb93c4c9${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-eb93c4c9${_scopeId}> Tambah Vendor Baru </h2><p class="text-sage-600" data-v-eb93c4c9${_scopeId}> Tambahkan data vendor baru ke dalam sistem </p></div></div><div class="mt-4 sm:mt-0" data-v-eb93c4c9${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.vendors.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb93c4c9${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-eb93c4c9${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-eb93c4c9${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-eb93c4c9${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-eb93c4c9${_scopeId}> Form Tambah Vendor </h3><p class="text-sm text-sage-600 mt-1" data-v-eb93c4c9${_scopeId}> Lengkapi informasi vendor dengan benar </p></div><div class="p-6" data-v-eb93c4c9${_scopeId}><form class="space-y-6" data-v-eb93c4c9${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-eb93c4c9${_scopeId}><div data-v-eb93c4c9${_scopeId}><label for="nama_vendor" class="block text-sm font-medium text-sage-700 mb-2" data-v-eb93c4c9${_scopeId}> Nama Vendor <span class="text-red-500" data-v-eb93c4c9${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).nama_vendor)} type="text" id="nama_vendor" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nama vendor" data-v-eb93c4c9${_scopeId}>`);
            if (unref(form).errors.nama_vendor) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-eb93c4c9${_scopeId}>${ssrInterpolate(unref(form).errors.nama_vendor)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-eb93c4c9${_scopeId}><label for="nib" class="block text-sm font-medium text-sage-700 mb-2" data-v-eb93c4c9${_scopeId}> NIB </label><input${ssrRenderAttr("value", unref(form).nib)} type="text" id="nib" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Nomor Induk Berusaha" data-v-eb93c4c9${_scopeId}>`);
            if (unref(form).errors.nib) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-eb93c4c9${_scopeId}>${ssrInterpolate(unref(form).errors.nib)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="border-t border-sage-200 pt-6" data-v-eb93c4c9${_scopeId}><h4 class="text-lg font-semibold text-sage-800 mb-4" data-v-eb93c4c9${_scopeId}>Informasi Rekening</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-eb93c4c9${_scopeId}><div data-v-eb93c4c9${_scopeId}><label for="nomor_rekening" class="block text-sm font-medium text-sage-700 mb-2" data-v-eb93c4c9${_scopeId}> Nomor Rekening <span class="text-red-500" data-v-eb93c4c9${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).nomor_rekening)} type="text" id="nomor_rekening" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Masukkan nomor rekening" data-v-eb93c4c9${_scopeId}>`);
            if (unref(form).errors.nomor_rekening) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-eb93c4c9${_scopeId}>${ssrInterpolate(unref(form).errors.nomor_rekening)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-eb93c4c9${_scopeId}><label for="nama_rekening" class="block text-sm font-medium text-sage-700 mb-2" data-v-eb93c4c9${_scopeId}> Nama Rekening <span class="text-red-500" data-v-eb93c4c9${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).nama_rekening)} type="text" id="nama_rekening" required class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors" placeholder="Nama pemilik rekening" data-v-eb93c4c9${_scopeId}>`);
            if (unref(form).errors.nama_rekening) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-eb93c4c9${_scopeId}>${ssrInterpolate(unref(form).errors.nama_rekening)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="border-t border-sage-200 pt-6" data-v-eb93c4c9${_scopeId}><h4 class="text-lg font-semibold text-sage-800 mb-4" data-v-eb93c4c9${_scopeId}>Dokumen &amp; File</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-eb93c4c9${_scopeId}><div data-v-eb93c4c9${_scopeId}><label for="photo" class="block text-sm font-medium text-sage-700 mb-2" data-v-eb93c4c9${_scopeId}> Foto Vendor </label><input type="file" id="photo" accept="image/*" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200" data-v-eb93c4c9${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-eb93c4c9${_scopeId}> Format yang didukung: JPG, PNG, GIF. Maksimal 2MB. </p>`);
            if (unref(form).errors.photo) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-eb93c4c9${_scopeId}>${ssrInterpolate(unref(form).errors.photo)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-eb93c4c9${_scopeId}><label for="legal_document" class="block text-sm font-medium text-sage-700 mb-2" data-v-eb93c4c9${_scopeId}> Dokumen Legal </label><input type="file" id="legal_document" accept=".pdf" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sage-100 file:text-sage-700 hover:file:bg-sage-200" data-v-eb93c4c9${_scopeId}><p class="mt-1 text-xs text-gray-500" data-v-eb93c4c9${_scopeId}> Format yang didukung: PDF. Maksimal 10MB. </p>`);
            if (unref(form).errors.legal_document) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-eb93c4c9${_scopeId}>${ssrInterpolate(unref(form).errors.legal_document)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200" data-v-eb93c4c9${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.vendors.index"),
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center justify-center px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-v-eb93c4c9${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" data-v-eb93c4c9${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-eb93c4c9${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-eb93c4c9${_scopeId}></path></svg>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).processing) {
              _push2(`<span data-v-eb93c4c9${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-eb93c4c9${_scopeId}>Simpan Vendor</span>`);
            }
            _push2(`</button></div></form></div></div></div>`);
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
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, " Tambah Vendor Baru "),
                        createVNode("p", { class: "text-sage-600" }, " Tambahkan data vendor baru ke dalam sistem ")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.vendors.index"),
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
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Form Tambah Vendor "),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Lengkapi informasi vendor dengan benar ")
                  ]),
                  createVNode("div", { class: "p-6" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "nama_vendor",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, [
                            createTextVNode(" Nama Vendor "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).nama_vendor = $event,
                            type: "text",
                            id: "nama_vendor",
                            required: "",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                            placeholder: "Masukkan nama vendor"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).nama_vendor]
                          ]),
                          unref(form).errors.nama_vendor ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.nama_vendor), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "nib",
                            class: "block text-sm font-medium text-sage-700 mb-2"
                          }, " NIB "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).nib = $event,
                            type: "text",
                            id: "nib",
                            class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                            placeholder: "Nomor Induk Berusaha"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).nib]
                          ]),
                          unref(form).errors.nib ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.nib), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "border-t border-sage-200 pt-6" }, [
                        createVNode("h4", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Informasi Rekening"),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "nomor_rekening",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Nomor Rekening "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).nomor_rekening = $event,
                              type: "text",
                              id: "nomor_rekening",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Masukkan nomor rekening"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).nomor_rekening]
                            ]),
                            unref(form).errors.nomor_rekening ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.nomor_rekening), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "nama_rekening",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, [
                              createTextVNode(" Nama Rekening "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).nama_rekening = $event,
                              type: "text",
                              id: "nama_rekening",
                              required: "",
                              class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors",
                              placeholder: "Nama pemilik rekening"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).nama_rekening]
                            ]),
                            unref(form).errors.nama_rekening ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-2 text-sm text-red-600"
                            }, toDisplayString(unref(form).errors.nama_rekening), 1)) : createCommentVNode("", true)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "border-t border-sage-200 pt-6" }, [
                        createVNode("h4", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Dokumen & File"),
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "photo",
                              class: "block text-sm font-medium text-sage-700 mb-2"
                            }, " Foto Vendor "),
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
                        ])
                      ]),
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-6 border-t border-sage-200" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.vendors.index"),
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
                          unref(form).processing ? (openBlock(), createBlock("span", { key: 1 }, "Menyimpan...")) : (openBlock(), createBlock("span", { key: 2 }, "Simpan Vendor"))
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
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb93c4c9"]]);
export {
  Create as default
};
