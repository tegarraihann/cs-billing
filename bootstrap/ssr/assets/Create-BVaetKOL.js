import { ref, computed, withCtx, unref, createVNode, createTextVNode, withModifiers, withDirectives, createBlock, createCommentVNode, vModelText, openBlock, toDisplayString, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BAq-XFJ2.js";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { ArrowLeft, Upload, X, Info, Save } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DoATCgt2.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    categories: Array
  },
  setup(__props) {
    const form = useForm({
      transaction_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      category: "",
      description: "",
      amount: "",
      notes: "",
      receipt_file: null
    });
    const filePreview = ref("");
    const today = computed(() => {
      return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    });
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        form.receipt_file = file;
        filePreview.value = file.name;
      }
    };
    const removeFile = () => {
      form.receipt_file = null;
      filePreview.value = "";
    };
    const submitForm = () => {
      form.post(route("admin-keuangan.other-incomes.store"), {
        preserveScroll: true,
        onSuccess: () => {
          form.reset();
          filePreview.value = "";
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Tambah Pendapatan Lain-lain" }, null, _parent2, _scopeId));
            _push2(`<div class="p-6 max-w-4xl mx-auto"${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center space-x-4 mb-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.other-incomes.index"),
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
            _push2(`<h1 class="text-2xl font-bold text-sage-800"${_scopeId}>Tambah Pendapatan Lain-lain</h1></div><p class="text-sm text-sage-600 ml-9"${_scopeId}>Catat pendapatan selain dari jasa logistik</p></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6"${_scopeId}><form class="space-y-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Tanggal Pendapatan <span class="text-red-500"${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).transaction_date)} type="date"${ssrRenderAttr("max", today.value)} class="${ssrRenderClass([{ "border-red-300": unref(form).errors.transaction_date }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" required${_scopeId}>`);
            if (unref(form).errors.transaction_date) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.transaction_date)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Kategori <span class="text-red-500"${_scopeId}>*</span></label><select class="${ssrRenderClass([{ "border-red-300": unref(form).errors.category }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" required${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, "") : ssrLooseEqual(unref(form).category, "")) ? " selected" : ""}${_scopeId}>Pilih Kategori</option><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<option${ssrRenderAttr("value", category)}${ssrIncludeBooleanAttr(Array.isArray(unref(form).category) ? ssrLooseContain(unref(form).category, category) : ssrLooseEqual(unref(form).category, category)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (unref(form).errors.category) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.category)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-xs text-sage-500"${_scopeId}> Sesuai format Laba Rugi: Bunga Bank Mandiri, Bunga Bank BCA, atau Lainnya </p></div></div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Deskripsi <span class="text-red-500"${_scopeId}>*</span></label><textarea rows="3" class="${ssrRenderClass([{ "border-red-300": unref(form).errors.description }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"])}" placeholder="Contoh: Bunga bank periode Desember 2024" required${_scopeId}>${ssrInterpolate(unref(form).description)}</textarea>`);
            if (unref(form).errors.description) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Jumlah (Rp) <span class="text-red-500"${_scopeId}>*</span></label><div class="relative"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}><span class="text-gray-500 text-sm"${_scopeId}>Rp</span></div><input${ssrRenderAttr("value", unref(form).amount)} type="number" step="0.01" min="0.01" class="${ssrRenderClass([{ "border-red-300": unref(form).errors.amount }, "w-full pl-12 pr-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" placeholder="0.00" required${_scopeId}></div>`);
            if (unref(form).errors.amount) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.amount)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-xs text-sage-500"${_scopeId}> Masukkan nominal pendapatan yang diterima </p></div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Catatan (Optional) </label><textarea rows="2" class="${ssrRenderClass([{ "border-red-300": unref(form).errors.notes }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"])}" placeholder="Catatan tambahan jika ada..."${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea>`);
            if (unref(form).errors.notes) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.notes)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}> Upload Bukti (Optional) </label><div class="flex items-center space-x-4"${_scopeId}><label class="flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-sage-300 rounded-lg cursor-pointer hover:border-sage-400 transition-colors"${_scopeId}><div class="text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Upload), { class: "mx-auto h-8 w-8 text-sage-400" }, null, _parent2, _scopeId));
            _push2(`<p class="mt-1 text-sm text-sage-600"${_scopeId}><span class="font-medium"${_scopeId}>Klik untuk upload</span> atau drag &amp; drop </p><p class="text-xs text-sage-500"${_scopeId}>JPG, PNG, PDF (max 2MB)</p></div><input type="file" accept=".jpg,.jpeg,.png,.pdf" class="hidden"${_scopeId}></label></div>`);
            if (filePreview.value) {
              _push2(`<p class="mt-2 text-sm text-sage-600"${_scopeId}> File terpilih: <span class="font-medium"${_scopeId}>${ssrInterpolate(filePreview.value)}</span><button type="button" class="ml-2 text-red-600 hover:text-red-800"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(X), { class: "w-4 h-4 inline" }, null, _parent2, _scopeId));
              _push2(`</button></p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).errors.receipt_file) {
              _push2(`<p class="mt-1 text-sm text-red-600"${_scopeId}>${ssrInterpolate(unref(form).errors.receipt_file)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-blue-50 border-l-4 border-blue-400 p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Info), { class: "h-5 w-5 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-3"${_scopeId}><p class="text-sm text-blue-700"${_scopeId}><strong${_scopeId}>Info:</strong> Pendapatan lain-lain adalah pendapatan yang TIDAK berasal dari jasa logistik (tidak ada SO). Contoh: bunga bank, penjualan aset, pendapatan sewa, dll. </p></div></div></div><div class="flex justify-end space-x-3 pt-4 border-t border-sage-200"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.other-incomes.index"),
              class: "inline-flex items-center px-4 py-2 border border-sage-300 rounded-lg text-sm font-medium text-sage-700 bg-white hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition disabled:opacity-50"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Save), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Pendapatan")}</button></div></form></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Tambah Pendapatan Lain-lain" }),
              createVNode("div", { class: "p-6 max-w-4xl mx-auto" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("div", { class: "flex items-center space-x-4 mb-2" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.other-incomes.index"),
                      class: "text-sage-600 hover:text-sage-800 transition-colors"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "w-5 h-5" })
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, "Tambah Pendapatan Lain-lain")
                  ]),
                  createVNode("p", { class: "text-sm text-sage-600 ml-9" }, "Catat pendapatan selain dari jasa logistik")
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Tanggal Pendapatan "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).transaction_date = $event,
                          type: "date",
                          max: today.value,
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": unref(form).errors.transaction_date }],
                          required: ""
                        }, null, 10, ["onUpdate:modelValue", "max"]), [
                          [vModelText, unref(form).transaction_date]
                        ]),
                        unref(form).errors.transaction_date ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.transaction_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Kategori "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).category = $event,
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": unref(form).errors.category }],
                          required: ""
                        }, [
                          createVNode("option", { value: "" }, "Pilih Kategori"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                            return openBlock(), createBlock("option", {
                              key: category,
                              value: category
                            }, toDisplayString(category), 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).category]
                        ]),
                        unref(form).errors.category ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(unref(form).errors.category), 1)) : createCommentVNode("", true),
                        createVNode("p", { class: "mt-1 text-xs text-sage-500" }, " Sesuai format Laba Rugi: Bunga Bank Mandiri, Bunga Bank BCA, atau Lainnya ")
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                        createTextVNode(" Deskripsi "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        rows: "3",
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none", { "border-red-300": unref(form).errors.description }],
                        placeholder: "Contoh: Bunga bank periode Desember 2024",
                        required: ""
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ]),
                      unref(form).errors.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.description), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                        createTextVNode(" Jumlah (Rp) "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode("div", { class: "relative" }, [
                        createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                          createVNode("span", { class: "text-gray-500 text-sm" }, "Rp")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                          type: "number",
                          step: "0.01",
                          min: "0.01",
                          class: ["w-full pl-12 pr-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": unref(form).errors.amount }],
                          placeholder: "0.00",
                          required: ""
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).amount]
                        ])
                      ]),
                      unref(form).errors.amount ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.amount), 1)) : createCommentVNode("", true),
                      createVNode("p", { class: "mt-1 text-xs text-sage-500" }, " Masukkan nominal pendapatan yang diterima ")
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Catatan (Optional) "),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                        rows: "2",
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none", { "border-red-300": unref(form).errors.notes }],
                        placeholder: "Catatan tambahan jika ada..."
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).notes]
                      ]),
                      unref(form).errors.notes ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.notes), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Upload Bukti (Optional) "),
                      createVNode("div", { class: "flex items-center space-x-4" }, [
                        createVNode("label", { class: "flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-sage-300 rounded-lg cursor-pointer hover:border-sage-400 transition-colors" }, [
                          createVNode("div", { class: "text-center" }, [
                            createVNode(unref(Upload), { class: "mx-auto h-8 w-8 text-sage-400" }),
                            createVNode("p", { class: "mt-1 text-sm text-sage-600" }, [
                              createVNode("span", { class: "font-medium" }, "Klik untuk upload"),
                              createTextVNode(" atau drag & drop ")
                            ]),
                            createVNode("p", { class: "text-xs text-sage-500" }, "JPG, PNG, PDF (max 2MB)")
                          ]),
                          createVNode("input", {
                            type: "file",
                            onChange: handleFileUpload,
                            accept: ".jpg,.jpeg,.png,.pdf",
                            class: "hidden"
                          }, null, 32)
                        ])
                      ]),
                      filePreview.value ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-2 text-sm text-sage-600"
                      }, [
                        createTextVNode(" File terpilih: "),
                        createVNode("span", { class: "font-medium" }, toDisplayString(filePreview.value), 1),
                        createVNode("button", {
                          onClick: removeFile,
                          type: "button",
                          class: "ml-2 text-red-600 hover:text-red-800"
                        }, [
                          createVNode(unref(X), { class: "w-4 h-4 inline" })
                        ])
                      ])) : createCommentVNode("", true),
                      unref(form).errors.receipt_file ? (openBlock(), createBlock("p", {
                        key: 1,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(unref(form).errors.receipt_file), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "bg-blue-50 border-l-4 border-blue-400 p-4" }, [
                      createVNode("div", { class: "flex" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode(unref(Info), { class: "h-5 w-5 text-blue-400" })
                        ]),
                        createVNode("div", { class: "ml-3" }, [
                          createVNode("p", { class: "text-sm text-blue-700" }, [
                            createVNode("strong", null, "Info:"),
                            createTextVNode(" Pendapatan lain-lain adalah pendapatan yang TIDAK berasal dari jasa logistik (tidak ada SO). Contoh: bunga bank, penjualan aset, pendapatan sewa, dll. ")
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3 pt-4 border-t border-sage-200" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.other-incomes.index"),
                        class: "inline-flex items-center px-4 py-2 border border-sage-300 rounded-lg text-sm font-medium text-sage-700 bg-white hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: unref(form).processing,
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-lg font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition disabled:opacity-50"
                      }, [
                        createVNode(unref(Save), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Pendapatan"), 1)
                      ], 8, ["disabled"])
                    ])
                  ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/OtherIncomes/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
