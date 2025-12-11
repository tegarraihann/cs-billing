import { computed, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withModifiers, withDirectives, createCommentVNode, vModelText, toDisplayString, vModelCheckbox, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-Cm66Fn0p.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-C7BgyxQX.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    shipmentType: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      name: props.shipmentType.name,
      code: props.shipmentType.code,
      description: props.shipmentType.description || "",
      is_active: props.shipmentType.is_active
    });
    const submit = () => {
      form.put(route("admin-keuangan.shipment-types.update", props.shipmentType.id));
    };
    const processing = computed(() => form.processing);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-c81cb1da${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-c81cb1da${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-c81cb1da${_scopeId}><div class="flex items-center" data-v-c81cb1da${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-c81cb1da${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c81cb1da${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-c81cb1da${_scopeId}></path></svg></div><div data-v-c81cb1da${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-c81cb1da${_scopeId}> Edit Shipment Type </h2><p class="text-sage-600" data-v-c81cb1da${_scopeId}> Perbarui informasi jenis pengiriman </p></div></div><div class="mt-4 sm:mt-0" data-v-c81cb1da${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.shipment-types.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-c81cb1da${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-c81cb1da${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-c81cb1da${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-c81cb1da${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-c81cb1da${_scopeId}> Form Edit Shipment Type </h3><p class="text-sm text-sage-600 mt-1" data-v-c81cb1da${_scopeId}> Perbarui informasi shipment type dengan benar </p></div><div class="p-6" data-v-c81cb1da${_scopeId}><form class="space-y-6" data-v-c81cb1da${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-c81cb1da${_scopeId}><div data-v-c81cb1da${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-c81cb1da${_scopeId}> Nama Shipment Type <span class="text-red-500" data-v-c81cb1da${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).name)} type="text" class="${ssrRenderClass([{ "border-red-500": unref(form).errors.name }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"])}" placeholder="Contoh: Sea Freight" data-v-c81cb1da${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-c81cb1da${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-c81cb1da${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-c81cb1da${_scopeId}> Kode Shipment Type <span class="text-red-500" data-v-c81cb1da${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).code)} type="text" class="${ssrRenderClass([{ "border-red-500": unref(form).errors.code }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors"])}" placeholder="Contoh: SEA" data-v-c81cb1da${_scopeId}>`);
            if (unref(form).errors.code) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-c81cb1da${_scopeId}>${ssrInterpolate(unref(form).errors.code)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-c81cb1da${_scopeId}><label class="flex items-center" data-v-c81cb1da${_scopeId}><input${ssrIncludeBooleanAttr(Array.isArray(unref(form).is_active) ? ssrLooseContain(unref(form).is_active, null) : unref(form).is_active) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded" data-v-c81cb1da${_scopeId}><span class="ml-2 block text-sm text-sage-900" data-v-c81cb1da${_scopeId}> Status Aktif </span></label></div><div data-v-c81cb1da${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-c81cb1da${_scopeId}> Deskripsi </label><textarea rows="4" class="${ssrRenderClass([{ "border-red-500": unref(form).errors.description }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none"])}" placeholder="Deskripsi detail tentang jenis pengiriman..." data-v-c81cb1da${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(form).errors.description) {
              _push2(`<div class="mt-2 text-sm text-red-600" data-v-c81cb1da${_scopeId}>${ssrInterpolate(unref(form).errors.description)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end space-x-3" data-v-c81cb1da${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.shipment-types.index"),
              class: "px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50" data-v-c81cb1da${_scopeId}>`);
            if (processing.value) {
              _push2(`<span data-v-c81cb1da${_scopeId}>Menyimpan...</span>`);
            } else {
              _push2(`<span data-v-c81cb1da${_scopeId}>Simpan Perubahan</span>`);
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
                            d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          })
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, " Edit Shipment Type "),
                        createVNode("p", { class: "text-sage-600" }, " Perbarui informasi jenis pengiriman ")
                      ])
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.shipment-types.index"),
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
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Form Edit Shipment Type "),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Perbarui informasi shipment type dengan benar ")
                  ]),
                  createVNode("div", { class: "p-6" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"]),
                      class: "space-y-6"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                            createTextVNode(" Nama Shipment Type "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).name = $event,
                            type: "text",
                            class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors", { "border-red-500": unref(form).errors.name }],
                            placeholder: "Contoh: Sea Freight"
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).name]
                          ]),
                          unref(form).errors.name ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                            createTextVNode(" Kode Shipment Type "),
                            createVNode("span", { class: "text-red-500" }, "*")
                          ]),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).code = $event,
                            type: "text",
                            class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors", { "border-red-500": unref(form).errors.code }],
                            placeholder: "Contoh: SEA"
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).code]
                          ]),
                          unref(form).errors.code ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(unref(form).errors.code), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "flex items-center" }, [
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                            type: "checkbox",
                            class: "h-4 w-4 text-sage-600 focus:ring-sage-500 border-gray-300 rounded"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelCheckbox, unref(form).is_active]
                          ]),
                          createVNode("span", { class: "ml-2 block text-sm text-sage-900" }, " Status Aktif ")
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Deskripsi "),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(form).description = $event,
                          rows: "4",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-colors resize-none", { "border-red-500": unref(form).errors.description }],
                          placeholder: "Deskripsi detail tentang jenis pengiriman..."
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).description]
                        ]),
                        unref(form).errors.description ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-2 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-3" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.shipment-types.index"),
                          class: "px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Batal ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          type: "submit",
                          disabled: processing.value,
                          class: "px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors disabled:opacity-50"
                        }, [
                          processing.value ? (openBlock(), createBlock("span", { key: 0 }, "Menyimpan...")) : (openBlock(), createBlock("span", { key: 1 }, "Simpan Perubahan"))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ShipmentTypes/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c81cb1da"]]);
export {
  Edit as default
};
