import { ref, computed, watch, withCtx, unref, createBlock, openBlock, createVNode, createTextVNode, toDisplayString, withModifiers, withDirectives, createCommentVNode, vModelText, vModelSelect, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from "vue/server-renderer";
import { useForm, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-yyCbRIkG.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-egdkIpsX.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    categories: {
      type: Array,
      required: true
    },
    currentBalance: {
      type: [Number, String],
      required: true
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const fileInput = ref(null);
    const processing = ref(false);
    const form = useForm({
      transaction_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
      description: "",
      category_id: "",
      amount: "",
      type: "",
      so_number: "",
      notes: "",
      receipt_file: null
    });
    const today = computed(() => {
      return (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    });
    const projectedBalance = computed(() => {
      if (!form.amount || isNaN(form.amount)) return props.currentBalance;
      const amount = parseFloat(form.amount);
      if (form.type === "expense") {
        return props.currentBalance - amount;
      } else if (form.type === "topup" || form.type === "refund") {
        return parseFloat(props.currentBalance) + amount;
      }
      return props.currentBalance;
    });
    const willBeNegative = computed(() => {
      return form.type === "expense" && projectedBalance.value < 0;
    });
    watch(() => form.type, (newType) => {
      if (newType !== "expense") {
        form.category_id = "";
      }
    });
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount || 0);
    };
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      form.receipt_file = file;
    };
    const submitForm = () => {
      if (willBeNegative.value) {
        if (!confirm("Transaksi ini akan membuat saldo petty cash menjadi minus. Apakah Anda yakin ingin melanjutkan?")) {
          return;
        }
      }
      form.post(route("admin-keuangan.petty-cash.store"), {
        onStart: () => processing.value = true,
        onFinish: () => processing.value = false
      });
    };
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.petty-cash.index": "/admin-keuangan/petty-cash",
        "admin-keuangan.petty-cash.store": "/admin-keuangan/petty-cash"
      };
      return routes[name] || "#";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-w-4xl mx-auto" data-v-9b4c73fb${_scopeId}><div class="mb-6" data-v-9b4c73fb${_scopeId}><div class="flex items-center space-x-4 mb-2" data-v-9b4c73fb${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.petty-cash.index"),
              class: "text-sage-600 hover:text-sage-800 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-9b4c73fb${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-9b4c73fb${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5",
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
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-sage-800" data-v-9b4c73fb${_scopeId}>Tambah Transaksi Petty Cash</h1></div><div class="flex items-center justify-between" data-v-9b4c73fb${_scopeId}><p class="text-sm text-sage-600" data-v-9b4c73fb${_scopeId}>Buat transaksi baru untuk petty cash</p><div class="text-right" data-v-9b4c73fb${_scopeId}><div class="text-xs text-sage-500" data-v-9b4c73fb${_scopeId}>Saldo Saat Ini</div><div class="text-lg font-bold text-sage-800" data-v-9b4c73fb${_scopeId}>${ssrInterpolate(formatCurrency(__props.currentBalance))}</div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6" data-v-9b4c73fb${_scopeId}><form class="space-y-6" data-v-9b4c73fb${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-9b4c73fb${_scopeId}><div data-v-9b4c73fb${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-9b4c73fb${_scopeId}> Tanggal Transaksi <span class="text-red-500" data-v-9b4c73fb${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).transaction_date)} type="date"${ssrRenderAttr("max", today.value)} class="${ssrRenderClass([{ "border-red-300": __props.errors.transaction_date }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-9b4c73fb${_scopeId}>`);
            if (__props.errors.transaction_date) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-9b4c73fb${_scopeId}>${ssrInterpolate(__props.errors.transaction_date)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-9b4c73fb${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-9b4c73fb${_scopeId}> Jenis Transaksi <span class="text-red-500" data-v-9b4c73fb${_scopeId}>*</span></label><select class="${ssrRenderClass([{ "border-red-300": __props.errors.type }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-9b4c73fb${_scopeId}><option value="" data-v-9b4c73fb${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "") : ssrLooseEqual(unref(form).type, "")) ? " selected" : ""}${_scopeId}>Pilih Jenis Transaksi</option><option value="expense" data-v-9b4c73fb${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "expense") : ssrLooseEqual(unref(form).type, "expense")) ? " selected" : ""}${_scopeId}>Pengeluaran</option><option value="topup" data-v-9b4c73fb${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "topup") : ssrLooseEqual(unref(form).type, "topup")) ? " selected" : ""}${_scopeId}>Top Up</option><option value="refund" data-v-9b4c73fb${ssrIncludeBooleanAttr(Array.isArray(unref(form).type) ? ssrLooseContain(unref(form).type, "refund") : ssrLooseEqual(unref(form).type, "refund")) ? " selected" : ""}${_scopeId}>Refund</option></select>`);
            if (__props.errors.type) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-9b4c73fb${_scopeId}>${ssrInterpolate(__props.errors.type)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-9b4c73fb${_scopeId}><div data-v-9b4c73fb${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-9b4c73fb${_scopeId}> Kategori `);
            if (unref(form).type === "expense") {
              _push2(`<span class="text-red-500" data-v-9b4c73fb${_scopeId}>*</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</label><select class="${ssrRenderClass([{ "border-red-300": __props.errors.category_id }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}"${ssrIncludeBooleanAttr(unref(form).type !== "expense") ? " disabled" : ""} data-v-9b4c73fb${_scopeId}><option value="" data-v-9b4c73fb${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, "") : ssrLooseEqual(unref(form).category_id, "")) ? " selected" : ""}${_scopeId}>Pilih Kategori</option><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)} data-v-9b4c73fb${ssrIncludeBooleanAttr(Array.isArray(unref(form).category_id) ? ssrLooseContain(unref(form).category_id, category.id) : ssrLooseEqual(unref(form).category_id, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select>`);
            if (__props.errors.category_id) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-9b4c73fb${_scopeId}>${ssrInterpolate(__props.errors.category_id)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).type !== "expense") {
              _push2(`<p class="mt-1 text-xs text-sage-500" data-v-9b4c73fb${_scopeId}> Kategori hanya untuk transaksi pengeluaran </p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-9b4c73fb${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-9b4c73fb${_scopeId}> Jumlah (Rp) <span class="text-red-500" data-v-9b4c73fb${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).amount)} type="number" step="0.01" min="0" placeholder="0" class="${ssrRenderClass([{ "border-red-300": __props.errors.amount }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-9b4c73fb${_scopeId}>`);
            if (__props.errors.amount) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-9b4c73fb${_scopeId}>${ssrInterpolate(__props.errors.amount)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(form).amount && unref(form).type === "expense") {
              _push2(`<div class="${ssrRenderClass([willBeNegative.value ? "text-red-500" : "text-sage-500", "mt-1 text-xs"])}" data-v-9b4c73fb${_scopeId}> Saldo setelah transaksi: ${ssrInterpolate(formatCurrency(projectedBalance.value))} `);
              if (willBeNegative.value) {
                _push2(`<span class="font-medium" data-v-9b4c73fb${_scopeId}>(Saldo akan minus!)</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else if (unref(form).amount && unref(form).type !== "expense") {
              _push2(`<div class="mt-1 text-xs text-sage-500" data-v-9b4c73fb${_scopeId}> Saldo setelah transaksi: ${ssrInterpolate(formatCurrency(projectedBalance.value))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-9b4c73fb${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-9b4c73fb${_scopeId}> Deskripsi <span class="text-red-500" data-v-9b4c73fb${_scopeId}>*</span></label><input${ssrRenderAttr("value", unref(form).description)} type="text" placeholder="Masukkan deskripsi transaksi" class="${ssrRenderClass([{ "border-red-300": __props.errors.description }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-9b4c73fb${_scopeId}>`);
            if (__props.errors.description) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-9b4c73fb${_scopeId}>${ssrInterpolate(__props.errors.description)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-9b4c73fb${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-9b4c73fb${_scopeId}> Nomor Sales Order (Opsional) </label><input${ssrRenderAttr("value", unref(form).so_number)} type="text" placeholder="Contoh: SO-2024-001" class="${ssrRenderClass([{ "border-red-300": __props.errors.so_number }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-9b4c73fb${_scopeId}>`);
            if (__props.errors.so_number) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-9b4c73fb${_scopeId}>${ssrInterpolate(__props.errors.so_number)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-9b4c73fb${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-9b4c73fb${_scopeId}> Catatan (Opsional) </label><textarea rows="3" placeholder="Catatan tambahan untuk transaksi ini" class="${ssrRenderClass([{ "border-red-300": __props.errors.notes }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none"])}" data-v-9b4c73fb${_scopeId}>${ssrInterpolate(unref(form).notes)}</textarea>`);
            if (__props.errors.notes) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-9b4c73fb${_scopeId}>${ssrInterpolate(__props.errors.notes)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-9b4c73fb${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-9b4c73fb${_scopeId}> File Bukti (Opsional) </label><input type="file" accept=".jpg,.jpeg,.png,.pdf" class="${ssrRenderClass([{ "border-red-300": __props.errors.receipt_file }, "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"])}" data-v-9b4c73fb${_scopeId}><p class="mt-1 text-xs text-sage-500" data-v-9b4c73fb${_scopeId}> Maksimal 2MB. Format yang didukung: JPG, PNG, PDF </p>`);
            if (__props.errors.receipt_file) {
              _push2(`<p class="mt-1 text-sm text-red-600" data-v-9b4c73fb${_scopeId}>${ssrInterpolate(__props.errors.receipt_file)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end space-x-3 pt-4 border-t border-sage-200" data-v-9b4c73fb${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.petty-cash.index"),
              class: "px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(processing.value || willBeNegative.value) ? " disabled" : ""} class="${ssrRenderClass([willBeNegative.value ? "bg-red-600 hover:bg-red-700" : "bg-sage-600 hover:bg-sage-700", "px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"])}" data-v-9b4c73fb${_scopeId}>`);
            if (processing.value) {
              _push2(`<span class="flex items-center" data-v-9b4c73fb${_scopeId}><svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" data-v-9b4c73fb${_scopeId}><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" class="opacity-25" data-v-9b4c73fb${_scopeId}></circle><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" class="opacity-75" data-v-9b4c73fb${_scopeId}></path></svg> Menyimpan... </span>`);
            } else {
              _push2(`<span data-v-9b4c73fb${_scopeId}>${ssrInterpolate(willBeNegative.value ? "Simpan (Saldo Minus!)" : "Simpan Transaksi")}</span>`);
            }
            _push2(`</button></div></form></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 max-w-4xl mx-auto" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("div", { class: "flex items-center space-x-4 mb-2" }, [
                    createVNode(unref(Link), {
                      href: unref(route)("admin-keuangan.petty-cash.index"),
                      class: "text-sage-600 hover:text-sage-800 transition-colors"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5",
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
                        ]))
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, "Tambah Transaksi Petty Cash")
                  ]),
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("p", { class: "text-sm text-sage-600" }, "Buat transaksi baru untuk petty cash"),
                    createVNode("div", { class: "text-right" }, [
                      createVNode("div", { class: "text-xs text-sage-500" }, "Saldo Saat Ini"),
                      createVNode("div", { class: "text-lg font-bold text-sage-800" }, toDisplayString(formatCurrency(__props.currentBalance)), 1)
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submitForm, ["prevent"]),
                    class: "space-y-6"
                  }, [
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Tanggal Transaksi "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).transaction_date = $event,
                          type: "date",
                          max: today.value,
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": __props.errors.transaction_date }]
                        }, null, 10, ["onUpdate:modelValue", "max"]), [
                          [vModelText, unref(form).transaction_date]
                        ]),
                        __props.errors.transaction_date ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.transaction_date), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Jenis Transaksi "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).type = $event,
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": __props.errors.type }]
                        }, [
                          createVNode("option", { value: "" }, "Pilih Jenis Transaksi"),
                          createVNode("option", { value: "expense" }, "Pengeluaran"),
                          createVNode("option", { value: "topup" }, "Top Up"),
                          createVNode("option", { value: "refund" }, "Refund")
                        ], 10, ["onUpdate:modelValue"]), [
                          [vModelSelect, unref(form).type]
                        ]),
                        __props.errors.type ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.type), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Kategori "),
                          unref(form).type === "expense" ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-red-500"
                          }, "*")) : createCommentVNode("", true)
                        ]),
                        withDirectives(createVNode("select", {
                          "onUpdate:modelValue": ($event) => unref(form).category_id = $event,
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": __props.errors.category_id }],
                          disabled: unref(form).type !== "expense"
                        }, [
                          createVNode("option", { value: "" }, "Pilih Kategori"),
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                            return openBlock(), createBlock("option", {
                              key: category.id,
                              value: category.id
                            }, toDisplayString(category.name), 9, ["value"]);
                          }), 128))
                        ], 10, ["onUpdate:modelValue", "disabled"]), [
                          [vModelSelect, unref(form).category_id]
                        ]),
                        __props.errors.category_id ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.category_id), 1)) : createCommentVNode("", true),
                        unref(form).type !== "expense" ? (openBlock(), createBlock("p", {
                          key: 1,
                          class: "mt-1 text-xs text-sage-500"
                        }, " Kategori hanya untuk transaksi pengeluaran ")) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                          createTextVNode(" Jumlah (Rp) "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => unref(form).amount = $event,
                          type: "number",
                          step: "0.01",
                          min: "0",
                          placeholder: "0",
                          class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": __props.errors.amount }]
                        }, null, 10, ["onUpdate:modelValue"]), [
                          [vModelText, unref(form).amount]
                        ]),
                        __props.errors.amount ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "mt-1 text-sm text-red-600"
                        }, toDisplayString(__props.errors.amount), 1)) : createCommentVNode("", true),
                        unref(form).amount && unref(form).type === "expense" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: ["mt-1 text-xs", willBeNegative.value ? "text-red-500" : "text-sage-500"]
                        }, [
                          createTextVNode(" Saldo setelah transaksi: " + toDisplayString(formatCurrency(projectedBalance.value)) + " ", 1),
                          willBeNegative.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "font-medium"
                          }, "(Saldo akan minus!)")) : createCommentVNode("", true)
                        ], 2)) : unref(form).amount && unref(form).type !== "expense" ? (openBlock(), createBlock("div", {
                          key: 2,
                          class: "mt-1 text-xs text-sage-500"
                        }, " Saldo setelah transaksi: " + toDisplayString(formatCurrency(projectedBalance.value)), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, [
                        createTextVNode(" Deskripsi "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).description = $event,
                        type: "text",
                        placeholder: "Masukkan deskripsi transaksi",
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": __props.errors.description }]
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).description]
                      ]),
                      __props.errors.description ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(__props.errors.description), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Nomor Sales Order (Opsional) "),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => unref(form).so_number = $event,
                        type: "text",
                        placeholder: "Contoh: SO-2024-001",
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": __props.errors.so_number }]
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).so_number]
                      ]),
                      __props.errors.so_number ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(__props.errors.so_number), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " Catatan (Opsional) "),
                      withDirectives(createVNode("textarea", {
                        "onUpdate:modelValue": ($event) => unref(form).notes = $event,
                        rows: "3",
                        placeholder: "Catatan tambahan untuk transaksi ini",
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm resize-none", { "border-red-300": __props.errors.notes }]
                      }, null, 10, ["onUpdate:modelValue"]), [
                        [vModelText, unref(form).notes]
                      ]),
                      __props.errors.notes ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(__props.errors.notes), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, " File Bukti (Opsional) "),
                      createVNode("input", {
                        ref_key: "fileInput",
                        ref: fileInput,
                        type: "file",
                        accept: ".jpg,.jpeg,.png,.pdf",
                        onChange: handleFileChange,
                        class: ["w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm", { "border-red-300": __props.errors.receipt_file }]
                      }, null, 34),
                      createVNode("p", { class: "mt-1 text-xs text-sage-500" }, " Maksimal 2MB. Format yang didukung: JPG, PNG, PDF "),
                      __props.errors.receipt_file ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "mt-1 text-sm text-red-600"
                      }, toDisplayString(__props.errors.receipt_file), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-3 pt-4 border-t border-sage-200" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.petty-cash.index"),
                        class: "px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        type: "submit",
                        disabled: processing.value || willBeNegative.value,
                        class: ["px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed", willBeNegative.value ? "bg-red-600 hover:bg-red-700" : "bg-sage-600 hover:bg-sage-700"]
                      }, [
                        processing.value ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "flex items-center"
                        }, [
                          (openBlock(), createBlock("svg", {
                            class: "animate-spin -ml-1 mr-2 h-4 w-4",
                            fill: "none",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("circle", {
                              cx: "12",
                              cy: "12",
                              r: "10",
                              stroke: "currentColor",
                              "stroke-width": "4",
                              class: "opacity-25"
                            }),
                            createVNode("path", {
                              fill: "currentColor",
                              d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
                              class: "opacity-75"
                            })
                          ])),
                          createTextVNode(" Menyimpan... ")
                        ])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(willBeNegative.value ? "Simpan (Saldo Minus!)" : "Simpan Transaksi"), 1))
                      ], 10, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/PettyCash/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Create = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9b4c73fb"]]);
export {
  Create as default
};
