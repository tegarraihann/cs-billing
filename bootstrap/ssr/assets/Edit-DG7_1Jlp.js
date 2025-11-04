import { withCtx, unref, createBlock, createVNode, openBlock, createTextVNode, withModifiers, withDirectives, createCommentVNode, vModelText, toDisplayString, vModelRadio, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-qa9VKRBZ.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DZF7sKpL.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    operationalCostCategory: Object
  },
  setup(__props) {
    const props = __props;
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.operational-cost-categories.index": "/admin-keuangan/operational-cost-categories",
        "admin-keuangan.operational-cost-categories.show": "/admin-keuangan/operational-cost-categories",
        "admin-keuangan.operational-cost-categories.update": "/admin-keuangan/operational-cost-categories"
      };
      const baseRoute = routes[name] || "#";
      return params ? `${baseRoute}/${params}` : baseRoute;
    };
    const form = useForm({
      name: props.operationalCostCategory.name,
      description: props.operationalCostCategory.description || "",
      is_active: props.operationalCostCategory.is_active
    });
    const submit = () => {
      form.put(route("admin-keuangan.operational-cost-categories.update", props.operationalCostCategory.id), {
        onSuccess: () => {
        }
      });
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8" data-v-ca807079${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6" data-v-ca807079${_scopeId}><div class="flex items-center justify-between" data-v-ca807079${_scopeId}><div data-v-ca807079${_scopeId}><h1 class="text-2xl font-bold text-sage-800" data-v-ca807079${_scopeId}> Edit Kategori Biaya Operasional </h1><p class="text-sage-600 mt-1" data-v-ca807079${_scopeId}> Perbarui informasi kategori biaya operasional </p></div><div class="flex items-center space-x-3" data-v-ca807079${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.operational-cost-categories.show", __props.operationalCostCategory.id),
              class: "bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ca807079${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-ca807079${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-ca807079${_scopeId2}></path></svg><span data-v-ca807079${_scopeId2}>Lihat Detail</span>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      }),
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      })
                    ])),
                    createVNode("span", null, "Lihat Detail")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.operational-cost-categories.index"),
              class: "bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ca807079${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-ca807079${_scopeId2}></path></svg><span data-v-ca807079${_scopeId2}>Kembali</span>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4",
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
                    createVNode("span", null, "Kembali")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-ca807079${_scopeId}><div class="p-6 border-b border-sage-200" data-v-ca807079${_scopeId}><h2 class="text-lg font-semibold text-sage-800" data-v-ca807079${_scopeId}> Informasi Kategori </h2><p class="text-sm text-sage-600 mt-1" data-v-ca807079${_scopeId}> Perbarui form di bawah untuk mengubah informasi kategori biaya operasional </p></div><form class="p-6 space-y-6" data-v-ca807079${_scopeId}><div data-v-ca807079${_scopeId}><label for="name" class="block text-sm font-medium text-sage-700 mb-2" data-v-ca807079${_scopeId}> Nama Kategori <span class="text-red-500" data-v-ca807079${_scopeId}>*</span></label><input id="name"${ssrRenderAttr("value", unref(form).name)} type="text" placeholder="Masukkan nama kategori biaya operasional" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500": unref(form).errors.name }, "w-full rounded-lg border-sage-300 focus:border-sage-500 focus:ring-sage-500"])}" required data-v-ca807079${_scopeId}>`);
            if (unref(form).errors.name) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-ca807079${_scopeId}>${ssrInterpolate(unref(form).errors.name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-ca807079${_scopeId}><label for="description" class="block text-sm font-medium text-sage-700 mb-2" data-v-ca807079${_scopeId}> Deskripsi </label><textarea id="description" rows="3" placeholder="Masukkan deskripsi kategori (opsional)" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500": unref(form).errors.description }, "w-full rounded-lg border-sage-300 focus:border-sage-500 focus:ring-sage-500"])}" data-v-ca807079${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(form).errors.description) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-ca807079${_scopeId}>${ssrInterpolate(unref(form).errors.description)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-ca807079${_scopeId}><label for="is_active" class="block text-sm font-medium text-sage-700 mb-2" data-v-ca807079${_scopeId}> Status </label><div class="flex items-center space-x-6" data-v-ca807079${_scopeId}><label class="flex items-center" data-v-ca807079${_scopeId}><input id="is_active_true"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).is_active, true)) ? " checked" : ""} type="radio"${ssrRenderAttr("value", true)} class="text-sage-600 focus:ring-sage-500" data-v-ca807079${_scopeId}><span class="ml-2 text-sm text-sage-700" data-v-ca807079${_scopeId}>Aktif</span></label><label class="flex items-center" data-v-ca807079${_scopeId}><input id="is_active_false"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(form).is_active, false)) ? " checked" : ""} type="radio"${ssrRenderAttr("value", false)} class="text-sage-600 focus:ring-sage-500" data-v-ca807079${_scopeId}><span class="ml-2 text-sm text-sage-700" data-v-ca807079${_scopeId}>Tidak Aktif</span></label></div>`);
            if (unref(form).errors.is_active) {
              _push2(`<div class="mt-1 text-sm text-red-600" data-v-ca807079${_scopeId}>${ssrInterpolate(unref(form).errors.is_active)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end space-x-4 pt-6 border-t border-sage-200" data-v-ca807079${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.operational-cost-categories.show", __props.operationalCostCategory.id),
              class: "bg-sage-100 hover:bg-sage-200 text-sage-700 px-6 py-2 rounded-lg transition-colors font-medium"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="bg-sage-600 hover:bg-sage-700 disabled:bg-sage-400 text-white px-6 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2" data-v-ca807079${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" data-v-ca807079${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-ca807079${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-ca807079${_scopeId}></path></svg>`);
            } else {
              _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-ca807079${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" data-v-ca807079${_scopeId}></path></svg>`);
            }
            _push2(`<span data-v-ca807079${_scopeId}>${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Update Kategori")}</span></button></div></form></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 mt-6" data-v-ca807079${_scopeId}><div class="p-6 border-b border-sage-200" data-v-ca807079${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-ca807079${_scopeId}> Informasi Saat Ini </h3></div><div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6" data-v-ca807079${_scopeId}><div data-v-ca807079${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-ca807079${_scopeId}> Nama Kategori </label><div class="text-sm text-sage-800" data-v-ca807079${_scopeId}>${ssrInterpolate(__props.operationalCostCategory.name)}</div></div><div data-v-ca807079${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-ca807079${_scopeId}> Status </label><span class="${ssrRenderClass([
              "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
              __props.operationalCostCategory.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            ])}" data-v-ca807079${_scopeId}>${ssrInterpolate(__props.operationalCostCategory.is_active ? "Aktif" : "Tidak Aktif")}</span></div><div data-v-ca807079${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1" data-v-ca807079${_scopeId}> Terakhir Diperbarui </label><div class="text-sm text-sage-800" data-v-ca807079${_scopeId}>${ssrInterpolate(formatDate(__props.operationalCostCategory.updated_at))}</div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, " Edit Kategori Biaya Operasional "),
                      createVNode("p", { class: "text-sage-600 mt-1" }, " Perbarui informasi kategori biaya operasional ")
                    ]),
                    createVNode("div", { class: "flex items-center space-x-3" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.operational-cost-categories.show", __props.operationalCostCategory.id),
                        class: "bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            }),
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            })
                          ])),
                          createVNode("span", null, "Lihat Detail")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.operational-cost-categories.index"),
                        class: "bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4",
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
                          createVNode("span", null, "Kembali")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200" }, [
                  createVNode("div", { class: "p-6 border-b border-sage-200" }, [
                    createVNode("h2", { class: "text-lg font-semibold text-sage-800" }, " Informasi Kategori "),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Perbarui form di bawah untuk mengubah informasi kategori biaya operasional ")
                  ]),
                  createVNode("form", {
                    onSubmit: withModifiers(submit, ["prevent"]),
                    class: "p-6 space-y-6"
                  }, [
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "name",
                        class: "block text-sm font-medium text-sage-700 mb-2"
                      }, [
                        createTextVNode(" Nama Kategori "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        id: "name",
                        "onUpdate:modelValue": ($event) => unref(form).name = $event,
                        type: "text",
                        placeholder: "Masukkan nama kategori biaya operasional",
                        class: ["w-full rounded-lg border-sage-300 focus:border-sage-500 focus:ring-sage-500", { "border-red-300 focus:border-red-500": unref(form).errors.name }],
                        required: ""
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).name]
                      ]),
                      unref(form).errors.name ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.name), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "description",
                        class: "block text-sm font-medium text-sage-700 mb-2"
                      }, " Deskripsi "),
                      withDirectives(createVNode("textarea", {
                        id: "description",
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        rows: "3",
                        placeholder: "Masukkan deskripsi kategori (opsional)",
                        class: ["w-full rounded-lg border-sage-300 focus:border-sage-500 focus:ring-sage-500", { "border-red-300 focus:border-red-500": unref(form).errors.description }]
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ]),
                      unref(form).errors.description ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        for: "is_active",
                        class: "block text-sm font-medium text-sage-700 mb-2"
                      }, " Status "),
                      createVNode("div", { class: "flex items-center space-x-6" }, [
                        createVNode("label", { class: "flex items-center" }, [
                          withDirectives(createVNode("input", {
                            id: "is_active_true",
                            "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                            type: "radio",
                            value: true,
                            class: "text-sage-600 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelRadio, unref(form).is_active]
                          ]),
                          createVNode("span", { class: "ml-2 text-sm text-sage-700" }, "Aktif")
                        ]),
                        createVNode("label", { class: "flex items-center" }, [
                          withDirectives(createVNode("input", {
                            id: "is_active_false",
                            "onUpdate:modelValue": ($event) => unref(form).is_active = $event,
                            type: "radio",
                            value: false,
                            class: "text-sage-600 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelRadio, unref(form).is_active]
                          ]),
                          createVNode("span", { class: "ml-2 text-sm text-sage-700" }, "Tidak Aktif")
                        ])
                      ]),
                      unref(form).errors.is_active ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.is_active), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-4 pt-6 border-t border-sage-200" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.operational-cost-categories.show", __props.operationalCostCategory.id),
                        class: "bg-sage-100 hover:bg-sage-200 text-sage-700 px-6 py-2 rounded-lg transition-colors font-medium"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "bg-sage-600 hover:bg-sage-700 disabled:bg-sage-400 text-white px-6 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
                      }, [
                        unref(form).processing ? (openBlock(), createBlock("svg", {
                          key: 0,
                          class: "animate-spin w-4 h-4",
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
                          class: "w-4 h-4",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                          })
                        ])),
                        createVNode("span", null, toDisplayString(unref(form).processing ? "Menyimpan..." : "Update Kategori"), 1)
                      ], 8, ["disabled"])
                    ])
                  ], 32)
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 mt-6" }, [
                  createVNode("div", { class: "p-6 border-b border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Informasi Saat Ini ")
                  ]),
                  createVNode("div", { class: "p-6 grid grid-cols-1 md:grid-cols-3 gap-6" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Nama Kategori "),
                      createVNode("div", { class: "text-sm text-sage-800" }, toDisplayString(__props.operationalCostCategory.name), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Status "),
                      createVNode("span", {
                        class: [
                          "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                          __props.operationalCostCategory.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        ]
                      }, toDisplayString(__props.operationalCostCategory.is_active ? "Aktif" : "Tidak Aktif"), 3)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, " Terakhir Diperbarui "),
                      createVNode("div", { class: "text-sm text-sage-800" }, toDisplayString(formatDate(__props.operationalCostCategory.updated_at)), 1)
                    ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/OperationalCostCategories/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Edit = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ca807079"]]);
export {
  Edit as default
};
