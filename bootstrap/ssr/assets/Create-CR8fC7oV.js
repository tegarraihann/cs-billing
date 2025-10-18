import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, createCommentVNode, withDirectives, vModelText, toDisplayString, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-B9MqIz3y.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-IqhAJ9D3.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    categories: Array,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: "",
      category_id: "",
      description: "",
      typical_amount_min: "",
      typical_amount_max: "",
      is_active: true
    });
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID").format(amount || 0);
    };
    const getSelectedCategoryName = () => {
      const category = props.categories.find((cat) => cat.id == form.category_id);
      return category ? category.name : "";
    };
    const submit = () => {
      form.post(route("admin-keuangan.expense-templates.store"));
    };
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.expense-templates.index": "/admin-keuangan/expense-templates",
        "admin-keuangan.expense-templates.store": "/admin-keuangan/expense-templates"
      };
      return routes[name] || "#";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-794a3597${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-794a3597${_scopeId}><div class="flex items-center justify-between" data-v-794a3597${_scopeId}><div data-v-794a3597${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-794a3597${_scopeId}>Buat Template Biaya</h2><p class="text-sage-600" data-v-794a3597${_scopeId}>Buat template biaya baru untuk efisiensi input dan konsistensi</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.expense-templates.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-794a3597${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-794a3597${_scopeId2}></path></svg> Kembali `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 mr-2",
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
            _push2(`</div></div><form class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-794a3597${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-794a3597${_scopeId}><div class="md:col-span-2" data-v-794a3597${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-794a3597${_scopeId}> Nama Template <span class="text-red-500" data-v-794a3597${_scopeId}>*</span></label><input type="text"${ssrRenderAttr("value", unref(form).name)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="e.g., Biaya Konsumsi Meeting, Ongkos Kirim Dokumen" required data-v-794a3597${_scopeId}>`);
            if (__props.errors.name) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-794a3597${_scopeId}>${ssrInterpolate(__props.errors.name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-794a3597${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-794a3597${_scopeId}> Kategori <span class="text-red-500" data-v-794a3597${_scopeId}>*</span></label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" required data-v-794a3597${_scopeId}><option value="" data-v-794a3597${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}${_scopeId}>-- Pilih Kategori --</option><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)} data-v-794a3597${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, category.id) : ssrLooseEqual(unref(form).category_id, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (__props.errors.category_id) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-794a3597${_scopeId}>${ssrInterpolate(__props.errors.category_id)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-794a3597${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-794a3597${_scopeId}>Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-794a3597${_scopeId}><option${ssrRenderAttr("value", true)} data-v-794a3597${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, true) : ssrLooseEqual(unref(form).is_active, true)) ? " selected" : ""}${_scopeId}>Aktif</option><option${ssrRenderAttr("value", false)} data-v-794a3597${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, false) : ssrLooseEqual(unref(form).is_active, false)) ? " selected" : ""}${_scopeId}>Tidak Aktif</option></select></div><div class="md:col-span-2" data-v-794a3597${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-794a3597${_scopeId}>Deskripsi</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Deskripsi detail tentang template biaya ini..." data-v-794a3597${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (__props.errors.description) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-794a3597${_scopeId}>${ssrInterpolate(__props.errors.description)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-794a3597${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-794a3597${_scopeId}> Biaya Minimum <span class="text-red-500" data-v-794a3597${_scopeId}>*</span></label><input type="number"${ssrRenderAttr("value", unref(form).typical_amount_min)} min="0" step="1000" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="50000" required data-v-794a3597${_scopeId}><div class="text-xs text-gray-500 mt-1" data-v-794a3597${_scopeId}>Estimasi biaya terendah</div>`);
            if (__props.errors.typical_amount_min) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-794a3597${_scopeId}>${ssrInterpolate(__props.errors.typical_amount_min)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-794a3597${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-794a3597${_scopeId}> Biaya Maksimum <span class="text-red-500" data-v-794a3597${_scopeId}>*</span></label><input type="number"${ssrRenderAttr("value", unref(form).typical_amount_max)} min="0" step="1000" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="200000" required data-v-794a3597${_scopeId}><div class="text-xs text-gray-500 mt-1" data-v-794a3597${_scopeId}>Estimasi biaya tertinggi</div>`);
            if (__props.errors.typical_amount_max) {
              _push2(`<div class="text-red-500 text-sm mt-1" data-v-794a3597${_scopeId}>${ssrInterpolate(__props.errors.typical_amount_max)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (unref(form).name && unref(form).category_id) {
              _push2(`<div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200" data-v-794a3597${_scopeId}><h4 class="text-sm font-medium text-blue-800 mb-2" data-v-794a3597${_scopeId}>Preview Template</h4><div class="text-sm text-blue-700" data-v-794a3597${_scopeId}><div data-v-794a3597${_scopeId}><strong data-v-794a3597${_scopeId}>Nama:</strong> ${ssrInterpolate(unref(form).name)}</div><div data-v-794a3597${_scopeId}><strong data-v-794a3597${_scopeId}>Kategori:</strong> ${ssrInterpolate(getSelectedCategoryName())}</div>`);
              if (unref(form).typical_amount_min && unref(form).typical_amount_max) {
                _push2(`<div data-v-794a3597${_scopeId}><strong data-v-794a3597${_scopeId}>Range Biaya:</strong> ${ssrInterpolate(formatCurrency(unref(form).typical_amount_min))} - ${ssrInterpolate(formatCurrency(unref(form).typical_amount_max))}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(form).description) {
                _push2(`<div data-v-794a3597${_scopeId}><strong data-v-794a3597${_scopeId}>Deskripsi:</strong> ${ssrInterpolate(unref(form).description)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div data-v-794a3597${_scopeId}><strong data-v-794a3597${_scopeId}>Status:</strong> ${ssrInterpolate(unref(form).is_active ? "Aktif" : "Tidak Aktif")}</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200" data-v-794a3597${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.expense-templates.index"),
              class: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50" data-v-794a3597${_scopeId}>${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Template")}</button></div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Buat Template Biaya"),
                      createVNode("p", { class: "text-sage-600" }, "Buat template biaya baru untuk efisiensi input dan konsistensi")
                    ]),
                    createVNode(unref(Link), {
                      href: unref(route)("admin-keuangan.expense-templates.index"),
                      class: "inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5 mr-2",
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
                ]),
                createVNode("form", {
                  onSubmit: withModifiers(submit, ["prevent"]),
                  class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200"
                }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                    createVNode("div", { class: "md:col-span-2" }, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, [
                        createTextVNode(" Nama Template "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                        placeholder: "e.g., Biaya Konsumsi Meeting, Ongkos Kirim Dokumen",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).name]
                      ]),
                      __props.errors.name ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-red-500 text-sm mt-1"
                      }, toDisplayString(__props.errors.name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, [
                        createTextVNode(" Kategori "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).category_id = $event,
                        class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                        required: ""
                      }, [
                        createVNode("option", { value: "" }, "-- Pilih Kategori --"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                          return openBlock(), createBlock("option", {
                            key: category.id,
                            value: category.id
                          }, toDisplayString(category.name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).category_id]
                      ]),
                      __props.errors.category_id ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-red-500 text-sm mt-1"
                      }, toDisplayString(__props.errors.category_id), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Status"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                        class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, [
                        createVNode("option", { value: true }, "Aktif"),
                        createVNode("option", { value: false }, "Tidak Aktif")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, unref(form).is_active]
                      ])
                    ]),
                    createVNode("div", { class: "md:col-span-2" }, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Deskripsi"),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        rows: "3",
                        class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                        placeholder: "Deskripsi detail tentang template biaya ini..."
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ]),
                      __props.errors.description ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-red-500 text-sm mt-1"
                      }, toDisplayString(__props.errors.description), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, [
                        createTextVNode(" Biaya Minimum "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "number",
                        "onUpdate:modelValue": ($event) => unref(form).typical_amount_min = $event,
                        min: "0",
                        step: "1000",
                        class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                        placeholder: "50000",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).typical_amount_min]
                      ]),
                      createVNode("div", { class: "text-xs text-gray-500 mt-1" }, "Estimasi biaya terendah"),
                      __props.errors.typical_amount_min ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-red-500 text-sm mt-1"
                      }, toDisplayString(__props.errors.typical_amount_min), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, [
                        createTextVNode(" Biaya Maksimum "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        type: "number",
                        "onUpdate:modelValue": ($event) => unref(form).typical_amount_max = $event,
                        min: "0",
                        step: "1000",
                        class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                        placeholder: "200000",
                        required: ""
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).typical_amount_max]
                      ]),
                      createVNode("div", { class: "text-xs text-gray-500 mt-1" }, "Estimasi biaya tertinggi"),
                      __props.errors.typical_amount_max ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-red-500 text-sm mt-1"
                      }, toDisplayString(__props.errors.typical_amount_max), 1)) : createCommentVNode("", true)
                    ])
                  ]),
                  unref(form).name && unref(form).category_id ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
                  }, [
                    createVNode("h4", { class: "text-sm font-medium text-blue-800 mb-2" }, "Preview Template"),
                    createVNode("div", { class: "text-sm text-blue-700" }, [
                      createVNode("div", null, [
                        createVNode("strong", null, "Nama:"),
                        createTextVNode(" " + toDisplayString(unref(form).name), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("strong", null, "Kategori:"),
                        createTextVNode(" " + toDisplayString(getSelectedCategoryName()), 1)
                      ]),
                      unref(form).typical_amount_min && unref(form).typical_amount_max ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("strong", null, "Range Biaya:"),
                        createTextVNode(" " + toDisplayString(formatCurrency(unref(form).typical_amount_min)) + " - " + toDisplayString(formatCurrency(unref(form).typical_amount_max)), 1)
                      ])) : createCommentVNode("", true),
                      unref(form).description ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("strong", null, "Deskripsi:"),
                        createTextVNode(" " + toDisplayString(unref(form).description), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("div", null, [
                        createVNode("strong", null, "Status:"),
                        createTextVNode(" " + toDisplayString(unref(form).is_active ? "Aktif" : "Tidak Aktif"), 1)
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "flex items-center justify-end space-x-4 mt-6 pt-6 border-t border-gray-200" }, [
                    createVNode(unref(Link), {
                      href: unref(route)("admin-keuangan.expense-templates.index"),
                      class: "px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Batal ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("button", {
                      type: "submit",
                      disabled: unref(form).processing,
                      class: "px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50"
                    }, toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Template"), 9, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ExpenseTemplates/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-794a3597"]]);
export {
  Create as default
};
