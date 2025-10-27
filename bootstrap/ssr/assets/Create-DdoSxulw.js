import { withCtx, unref, createVNode, createTextVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ArrowLeft, Loader2 } from "lucide-vue-next";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-COfqywW7.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-BQ7a3c_z.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  setup(__props) {
    const form = useForm({
      code: "",
      name: "",
      description: "",
      sort_order: 0,
      is_active: true
    });
    const submit = () => {
      form.post(route("admin-keuangan.master-package-units.store"));
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Tambah Satuan Package" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center space-x-3 mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.master-package-units.index"),
              class: "text-sage-600 hover:text-sage-800 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-5 h-5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-sage-800"${_scopeId}>Tambah Satuan Package</h1></div><p class="text-sm text-sage-600"${_scopeId}> Buat satuan packaging baru untuk digunakan di Sales Order dan Invoice </p></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6"${_scopeId}><form${_scopeId}><div class="space-y-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Kode Satuan <span class="text-red-500"${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).code)} type="text" required maxlength="10" placeholder="e.g., PLT, CTN, BOX" class="${ssrRenderClass([{ "border-red-500": unref(form).errors.code }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}"${_scopeId}>`);
            if (unref(form).errors.code) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.code)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-xs text-gray-500"${_scopeId}> Maksimal 10 karakter, gunakan huruf kapital </p></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Nama Satuan <span class="text-red-500"${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).name)} type="text" required maxlength="50" placeholder="e.g., Pallet, Carton, Box" class="${ssrRenderClass([{ "border-red-500": unref(form).errors.name }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}"${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Deskripsi </label><textarea rows="3" maxlength="255" placeholder="Deskripsi tambahan tentang satuan ini..." class="${ssrRenderClass([{ "border-red-500": unref(form).errors.description }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}"${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(form).errors.description) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Urutan Tampil </label><input${ssrRenderAttr("value", unref(form).sort_order)} type="number" min="0" placeholder="0" class="${ssrRenderClass([{ "border-red-500": unref(form).errors.sort_order }, "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"])}"${_scopeId}>`);
            if (unref(form).errors.sort_order) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.sort_order)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-xs text-gray-500"${_scopeId}> Angka kecil akan tampil di urutan atas </p></div><div${_scopeId}><label class="flex items-center"${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="rounded border-gray-300 text-sage-600 shadow-sm focus:ring-sage-500"${_scopeId}><span class="ml-2 text-sm text-gray-700"${_scopeId}>Aktif</span></label><p class="mt-1 text-xs text-gray-500"${_scopeId}> Satuan aktif akan muncul di dropdown form </p></div></div><div class="mt-8 flex items-center justify-end space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.master-package-units.index"),
              class: "px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 transition-colors flex items-center"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan")}</button></div></form></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Tambah Satuan Package" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-2xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("div", { class: "flex items-center space-x-3 mb-2" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.master-package-units.index"),
                        class: "text-sage-600 hover:text-sage-800 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "w-5 h-5" })
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, "Tambah Satuan Package")
                    ]),
                    createVNode("p", { class: "text-sm text-sage-600" }, " Buat satuan packaging baru untuk digunakan di Sales Order dan Invoice ")
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "space-y-6" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, [
                            createTextVNode(" Kode Satuan "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).code = $event,
                            type: "text",
                            required: "",
                            maxlength: "10",
                            placeholder: "e.g., PLT, CTN, BOX",
                            class: ["w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": unref(form).errors.code }]
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).code]
                          ]),
                          unref(form).errors.code ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.code), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Maksimal 10 karakter, gunakan huruf kapital ")
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, [
                            createTextVNode(" Nama Satuan "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            required: "",
                            maxlength: "50",
                            placeholder: "e.g., Pallet, Carton, Box",
                            class: ["w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": unref(form).errors.name }]
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).name]
                          ]),
                          unref(form).errors.name ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, " Deskripsi "),
                          withDirectives(createVNode("textarea", {
                            "onUpdate:modelValue": ($event) => unref(form).description = $event,
                            rows: "3",
                            maxlength: "255",
                            placeholder: "Deskripsi tambahan tentang satuan ini...",
                            class: ["w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": unref(form).errors.description }]
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).description]
                          ]),
                          unref(form).errors.description ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, " Urutan Tampil "),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).sort_order = $event,
                            type: "number",
                            min: "0",
                            placeholder: "0",
                            class: ["w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500", { "border-red-500": unref(form).errors.sort_order }]
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).sort_order]
                          ]),
                          unref(form).errors.sort_order ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "mt-1 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.sort_order), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Angka kecil akan tampil di urutan atas ")
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "flex items-center" }, [
                            withDirectives(createVNode("input", {
                              "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                              type: "checkbox",
                              class: "rounded border-gray-300 text-sage-600 shadow-sm focus:ring-sage-500"
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelCheckbox, unref(form).is_active]
                            ]),
                            createVNode("span", { class: "ml-2 text-sm text-gray-700" }, "Aktif")
                          ]),
                          createVNode("p", { class: "mt-1 text-xs text-gray-500" }, " Satuan aktif akan muncul di dropdown form ")
                        ])
                      ]),
                      createVNode("div", { class: "mt-8 flex items-center justify-end space-x-3" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.master-package-units.index"),
                          class: "px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(form).processing,
                          class: "px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 transition-colors flex items-center"
                        }, [
                          unref(form).processing ? (openBlock(), createBlock(unref(Loader2), {
                            key: 0,
                            class: "w-4 h-4 mr-2 animate-spin"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/MasterPackageUnits/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
