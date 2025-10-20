import { computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout--JWx9Y38.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ArrowLeft, Loader2, AlertTriangle } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DtF6z6FY.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Edit",
  __ssrInlineRender: true,
  props: {
    period: Object,
    accounts: Array,
    errors: Object
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      period_name: props.period.period_name,
      start_date: props.period.start_date,
      end_date: props.period.end_date,
      notes: props.period.notes || ""
    });
    const processing = computed(() => form.processing);
    const submit = () => {
      form.put(route("admin-keuangan.profit-loss.update", props.period.id));
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
            _push2(ssrRenderComponent(unref(Head), { title: "Edit Periode Laba Rugi" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.profit-loss.show", __props.period.id),
              class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Kembali ke Detail `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Kembali ke Detail ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Edit Periode Laba Rugi</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Edit periode ${ssrInterpolate(__props.period.period_name)}</p></div><div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl"${_scopeId}><div class="px-6 py-8"${_scopeId}><form${_scopeId}><div class="grid grid-cols-1 gap-6"${_scopeId}><div${_scopeId}><label for="period_name" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Nama Periode <span class="text-red-500"${_scopeId}>*</span></label><input id="period_name"${ssrRenderAttr("value", unref(form).period_name)} type="text" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.period_name }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="Contoh: Laporan Laba Rugi Desember 2024"${_scopeId}>`);
            if (__props.errors.period_name) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.period_name)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="period_type" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Tipe Periode </label><select id="period_type" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 cursor-not-allowed" disabled${_scopeId}><option value="monthly"${ssrIncludeBooleanAttr(Array.isArray(__props.period.period_type) ? ssrLooseContain(__props.period.period_type, "monthly") : ssrLooseEqual(__props.period.period_type, "monthly")) ? " selected" : ""}${_scopeId}>Bulanan</option><option value="quarterly"${ssrIncludeBooleanAttr(Array.isArray(__props.period.period_type) ? ssrLooseContain(__props.period.period_type, "quarterly") : ssrLooseEqual(__props.period.period_type, "quarterly")) ? " selected" : ""}${_scopeId}>Triwulan</option><option value="yearly"${ssrIncludeBooleanAttr(Array.isArray(__props.period.period_type) ? ssrLooseContain(__props.period.period_type, "yearly") : ssrLooseEqual(__props.period.period_type, "yearly")) ? " selected" : ""}${_scopeId}>Tahunan</option></select><p class="mt-1 text-sm text-gray-500"${_scopeId}> Tipe periode tidak dapat diubah setelah dibuat </p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label for="start_date" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Tanggal Mulai <span class="text-red-500"${_scopeId}>*</span></label><input id="start_date"${ssrRenderAttr("value", unref(form).start_date)} type="date" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.start_date }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}>`);
            if (__props.errors.start_date) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.start_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label for="end_date" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Tanggal Selesai <span class="text-red-500"${_scopeId}>*</span></label><input id="end_date"${ssrRenderAttr("value", unref(form).end_date)} type="date" class="${ssrRenderClass([{ "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.end_date }, "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}>`);
            if (__props.errors.end_date) {
              _push2(`<div class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.end_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div${_scopeId}><label for="notes" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Catatan </label><textarea id="notes" rows="3" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm" placeholder="Catatan tambahan untuk periode ini..."${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea></div><div class="bg-blue-50 border border-blue-200 rounded-md p-4"${_scopeId}><h3 class="text-sm font-medium text-blue-900 mb-2"${_scopeId}>Informasi Periode</h3><div class="text-sm text-blue-700 space-y-1"${_scopeId}><p${_scopeId}><strong${_scopeId}>Kode Periode:</strong> ${ssrInterpolate(__props.period.period_code)}</p><p${_scopeId}><strong${_scopeId}>Status:</strong><span class="${ssrRenderClass([{
              "bg-yellow-100 text-yellow-800": __props.period.status === "draft",
              "bg-green-100 text-green-800": __props.period.status === "closed"
            }, "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(__props.period.status === "draft" ? "Draft" : "Ditutup")}</span></p><p${_scopeId}><strong${_scopeId}>Dibuat:</strong> ${ssrInterpolate(formatDate(__props.period.created_at))}</p>`);
            if (__props.period.approved_at) {
              _push2(`<p${_scopeId}><strong${_scopeId}>Disetujui:</strong> ${ssrInterpolate(formatDate(__props.period.approved_at))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="mt-8 flex justify-end space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.profit-loss.show", __props.period.id),
              class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value) ? " disabled" : ""} class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"${_scopeId}>`);
            if (processing.value) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "animate-spin -ml-1 mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(processing.value ? "Menyimpan..." : "Simpan Perubahan")}</button></div></form></div></div><div class="mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-5 w-5 text-yellow-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-yellow-800"${_scopeId}>Peringatan</h3><div class="mt-2 text-sm text-yellow-700"${_scopeId}><ul class="list-disc list-inside space-y-1"${_scopeId}><li${_scopeId}>Mengubah tanggal periode akan mempengaruhi data yang diimpor otomatis</li><li${_scopeId}>Setelah menyimpan, Anda mungkin perlu melakukan regenerate entries untuk memperbarui data otomatis</li><li${_scopeId}>Periode yang sudah ditutup tidak dapat diedit</li></ul></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Edit Periode Laba Rugi" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.profit-loss.show", __props.period.id),
                      class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Kembali ke Detail ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Edit Periode Laba Rugi"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Edit periode " + toDisplayString(__props.period.period_name), 1)
                  ]),
                  createVNode("div", { class: "bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl" }, [
                    createVNode("div", { class: "px-6 py-8" }, [
                      createVNode("form", {
                        onSubmit: withModifiers(submit, ["prevent"])
                      }, [
                        createVNode("div", { class: "grid grid-cols-1 gap-6" }, [
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "period_name",
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, [
                              createTextVNode(" Nama Periode "),
                              createVNode("span", { class: "text-red-500" }, "*")
                            ]),
                            withDirectives(createVNode("input", {
                              id: "period_name",
                              "onUpdate:modelValue": ($event) => unref(form).period_name = $event,
                              type: "text",
                              class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.period_name }],
                              placeholder: "Contoh: Laporan Laba Rugi Desember 2024"
                            }, null, 10, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).period_name]
                            ]),
                            __props.errors.period_name ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-1 text-sm text-red-600"
                            }, toDisplayString(__props.errors.period_name), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "period_type",
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, " Tipe Periode "),
                            withDirectives(createVNode("select", {
                              id: "period_type",
                              "onUpdate:modelValue": ($event) => __props.period.period_type = $event,
                              class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 cursor-not-allowed",
                              disabled: ""
                            }, [
                              createVNode("option", { value: "monthly" }, "Bulanan"),
                              createVNode("option", { value: "quarterly" }, "Triwulan"),
                              createVNode("option", { value: "yearly" }, "Tahunan")
                            ], 8, ["onUpdate:modelValue"]), [
                              [vModelSelect, __props.period.period_type]
                            ]),
                            createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " Tipe periode tidak dapat diubah setelah dibuat ")
                          ]),
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "start_date",
                                class: "block text-sm font-medium text-gray-700 mb-2"
                              }, [
                                createTextVNode(" Tanggal Mulai "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                id: "start_date",
                                "onUpdate:modelValue": ($event) => unref(form).start_date = $event,
                                type: "date",
                                class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.start_date }]
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).start_date]
                              ]),
                              __props.errors.start_date ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-1 text-sm text-red-600"
                              }, toDisplayString(__props.errors.start_date), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", {
                                for: "end_date",
                                class: "block text-sm font-medium text-gray-700 mb-2"
                              }, [
                                createTextVNode(" Tanggal Selesai "),
                                createVNode("span", { class: "text-red-500" }, "*")
                              ]),
                              withDirectives(createVNode("input", {
                                id: "end_date",
                                "onUpdate:modelValue": ($event) => unref(form).end_date = $event,
                                type: "date",
                                class: ["mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 focus:border-red-500 focus:ring-red-500": __props.errors.end_date }]
                              }, null, 10, ["onUpdate:modelValue"]), [
                                [vModelText, unref(form).end_date]
                              ]),
                              __props.errors.end_date ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-1 text-sm text-red-600"
                              }, toDisplayString(__props.errors.end_date), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", {
                              for: "notes",
                              class: "block text-sm font-medium text-gray-700 mb-2"
                            }, " Catatan "),
                            withDirectives(createVNode("textarea", {
                              id: "notes",
                              "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                              rows: "3",
                              class: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm",
                              placeholder: "Catatan tambahan untuk periode ini..."
                            }, null, 8, ["onUpdate:modelValue"]), [
                              [vModelText, unref(form).notes]
                            ])
                          ]),
                          createVNode("div", { class: "bg-blue-50 border border-blue-200 rounded-md p-4" }, [
                            createVNode("h3", { class: "text-sm font-medium text-blue-900 mb-2" }, "Informasi Periode"),
                            createVNode("div", { class: "text-sm text-blue-700 space-y-1" }, [
                              createVNode("p", null, [
                                createVNode("strong", null, "Kode Periode:"),
                                createTextVNode(" " + toDisplayString(__props.period.period_code), 1)
                              ]),
                              createVNode("p", null, [
                                createVNode("strong", null, "Status:"),
                                createVNode("span", {
                                  class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", {
                                    "bg-yellow-100 text-yellow-800": __props.period.status === "draft",
                                    "bg-green-100 text-green-800": __props.period.status === "closed"
                                  }]
                                }, toDisplayString(__props.period.status === "draft" ? "Draft" : "Ditutup"), 3)
                              ]),
                              createVNode("p", null, [
                                createVNode("strong", null, "Dibuat:"),
                                createTextVNode(" " + toDisplayString(formatDate(__props.period.created_at)), 1)
                              ]),
                              __props.period.approved_at ? (openBlock(), createBlock("p", { key: 0 }, [
                                createVNode("strong", null, "Disetujui:"),
                                createTextVNode(" " + toDisplayString(formatDate(__props.period.approved_at)), 1)
                              ])) : createCommentVNode("", true)
                            ])
                          ])
                        ]),
                        createVNode("div", { class: "mt-8 flex justify-end space-x-3" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-keuangan.profit-loss.show", __props.period.id),
                            class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: processing.value,
                            class: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 disabled:opacity-50"
                          }, [
                            processing.value ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "animate-spin -ml-1 mr-2 h-4 w-4"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(processing.value ? "Menyimpan..." : "Simpan Perubahan"), 1)
                          ], 8, ["disabled"])
                        ])
                      ], 32)
                    ])
                  ]),
                  createVNode("div", { class: "mt-6 bg-yellow-50 border border-yellow-200 rounded-md p-4" }, [
                    createVNode("div", { class: "flex" }, [
                      createVNode("div", { class: "flex-shrink-0" }, [
                        createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-yellow-400" })
                      ]),
                      createVNode("div", { class: "ml-3" }, [
                        createVNode("h3", { class: "text-sm font-medium text-yellow-800" }, "Peringatan"),
                        createVNode("div", { class: "mt-2 text-sm text-yellow-700" }, [
                          createVNode("ul", { class: "list-disc list-inside space-y-1" }, [
                            createVNode("li", null, "Mengubah tanggal periode akan mempengaruhi data yang diimpor otomatis"),
                            createVNode("li", null, "Setelah menyimpan, Anda mungkin perlu melakukan regenerate entries untuk memperbarui data otomatis"),
                            createVNode("li", null, "Periode yang sudah ditutup tidak dapat diedit")
                          ])
                        ])
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ProfitLoss/Edit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
