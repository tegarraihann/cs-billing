import { computed, withCtx, unref, createVNode, createTextVNode, withModifiers, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-Ce1gujPB.js";
import { ArrowLeft, Info, AlertTriangle, CreditCard } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DXLFoR_k.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Create",
  __ssrInlineRender: true,
  props: {
    bankAccounts: {
      type: Array,
      required: true
    },
    currentMonth: {
      type: String,
      required: true
    },
    existingBalances: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const form = useForm({
      period_month: props.currentMonth,
      balances: props.bankAccounts.map((bank) => {
        var _a, _b;
        return {
          bank_account_id: bank.id,
          opening_balance: ((_a = props.existingBalances[bank.id]) == null ? void 0 : _a.opening_balance) || "",
          notes: ((_b = props.existingBalances[bank.id]) == null ? void 0 : _b.notes) || ""
        };
      })
    });
    const hasExistingBalances = computed(() => {
      return Object.keys(props.existingBalances).length > 0;
    });
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount || 0);
    };
    const formatCurrencyInput = (event, index) => {
      let value = event.target.value.replace(/[^\d]/g, "");
      if (value) {
        value = new Intl.NumberFormat("id-ID").format(parseInt(value));
      }
      form.balances[index].opening_balance = value;
    };
    const submit = () => {
      const processedBalances = form.balances.map((balance) => ({
        ...balance,
        opening_balance: balance.opening_balance.replace(/[^\d]/g, "") || "0"
      }));
      form.transform((data) => ({
        ...data,
        balances: processedBalances
      })).post(route("admin-keuangan.bank-balance.store"), {
        onSuccess: () => {
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Input Opening Balance" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Input Opening Balance</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}> Input saldo awal bank untuk periode bulan tertentu </p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.bank-balance.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Kembali `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Info), { class: "h-5 w-5 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-blue-800"${_scopeId}> Informasi Opening Balance </h3><div class="mt-2 text-sm text-blue-700"${_scopeId}><ul class="list-disc list-inside space-y-1"${_scopeId}><li${_scopeId}>Opening balance hanya perlu diinput sekali per bulan untuk setiap bank</li><li${_scopeId}>Saldo akan otomatis terupdate saat ada customer payment atau vendor payment</li><li${_scopeId}>Jika sudah ada opening balance untuk periode ini, input baru akan mengupdate data sebelumnya</li></ul></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><form${_scopeId}><div class="px-4 py-5 sm:p-6 space-y-6"${_scopeId}><div${_scopeId}><label for="period_month" class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Periode Bulan </label><input id="period_month"${ssrRenderAttr("value", unref(form).period_month)} type="month" class="${ssrRenderClass([{ "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500": __props.errors.period_month }, "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}"${_scopeId}>`);
            if (__props.errors.period_month) {
              _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors.period_month)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<p class="mt-1 text-sm text-gray-500"${_scopeId}> Pilih bulan dan tahun untuk opening balance </p></div>`);
            if (hasExistingBalances.value) {
              _push2(`<div class="bg-yellow-50 border border-yellow-200 rounded-md p-4"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-5 w-5 text-yellow-400" }, null, _parent2, _scopeId));
              _push2(`</div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-yellow-800"${_scopeId}> Opening Balance Sudah Ada </h3><div class="mt-2 text-sm text-yellow-700"${_scopeId}><p${_scopeId}>Opening balance untuk periode ${ssrInterpolate(unref(form).period_month)} sudah pernah diinput. Input baru akan mengupdate data yang ada.</p></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="space-y-6"${_scopeId}><!--[-->`);
            ssrRenderList(__props.bankAccounts, (bank, index) => {
              _push2(`<div${_scopeId}><div class="border border-gray-200 rounded-lg p-6"${_scopeId}><div class="flex items-center mb-4"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CreditCard), { class: "w-5 h-5 text-white" }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="ml-4"${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}> Bank ${ssrInterpolate(bank.bank_name)}</h3><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(bank.account_number)} • ${ssrInterpolate(bank.account_name)}</p></div></div>`);
              if (__props.existingBalances[bank.id]) {
                _push2(`<div class="mb-4 p-3 bg-gray-50 rounded-md"${_scopeId}><p class="text-sm text-gray-700"${_scopeId}><span class="font-medium"${_scopeId}>Current Opening Balance:</span> ${ssrInterpolate(formatCurrency(__props.existingBalances[bank.id].opening_balance))}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label${ssrRenderAttr("for", `opening_balance_${bank.id}`)} class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Opening Balance <span class="text-red-500"${_scopeId}>*</span></label><div class="relative rounded-md shadow-sm"${_scopeId}><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"${_scopeId}><span class="text-gray-500 sm:text-sm"${_scopeId}>Rp</span></div><input${ssrRenderAttr("id", `opening_balance_${bank.id}`)}${ssrRenderAttr("value", unref(form).balances[index].opening_balance)} type="text" class="${ssrRenderClass([{ "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500": __props.errors[`balances.${index}.opening_balance`] }, "mt-1 block w-full pl-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm"])}" placeholder="0"${_scopeId}></div>`);
              if (__props.errors[`balances.${index}.opening_balance`]) {
                _push2(`<div class="mt-2 text-sm text-red-600"${_scopeId}>${ssrInterpolate(__props.errors[`balances.${index}.opening_balance`])}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label${ssrRenderAttr("for", `notes_${bank.id}`)} class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}> Catatan (Opsional) </label><textarea${ssrRenderAttr("id", `notes_${bank.id}`)} rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm" placeholder="Catatan untuk opening balance ini..."${_scopeId}>${ssrInterpolate(unref(form).balances[index].notes)}</textarea></div></div></div></div>`);
            });
            _push2(`<!--]--></div></div><div class="px-4 py-3 bg-gray-50 text-right sm:px-6"${_scopeId}><div class="flex justify-end space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.bank-balance.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
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
            _push2(`<button type="submit"${ssrIncludeBooleanAttr(unref(form).processing) ? " disabled" : ""} class="${ssrRenderClass([{ "opacity-25": unref(form).processing }, "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"])}"${_scopeId}>`);
            if (unref(form).processing) {
              _push2(`<span class="mr-2"${_scopeId}><svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(form).processing ? "Menyimpan..." : "Simpan Opening Balance")}</button></div></div></form></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Input Opening Balance" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Input Opening Balance"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " Input saldo awal bank untuk periode bulan tertentu ")
                      ]),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.bank-balance.index"),
                        class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Kembali ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", { class: "bg-blue-50 border border-blue-200 rounded-md p-4 mb-6" }, [
                    createVNode("div", { class: "flex" }, [
                      createVNode("div", { class: "flex-shrink-0" }, [
                        createVNode(unref(Info), { class: "h-5 w-5 text-blue-400" })
                      ]),
                      createVNode("div", { class: "ml-3" }, [
                        createVNode("h3", { class: "text-sm font-medium text-blue-800" }, " Informasi Opening Balance "),
                        createVNode("div", { class: "mt-2 text-sm text-blue-700" }, [
                          createVNode("ul", { class: "list-disc list-inside space-y-1" }, [
                            createVNode("li", null, "Opening balance hanya perlu diinput sekali per bulan untuk setiap bank"),
                            createVNode("li", null, "Saldo akan otomatis terupdate saat ada customer payment atau vendor payment"),
                            createVNode("li", null, "Jika sudah ada opening balance untuk periode ini, input baru akan mengupdate data sebelumnya")
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                    createVNode("form", {
                      onSubmit: withModifiers(submit, ["prevent"])
                    }, [
                      createVNode("div", { class: "px-4 py-5 sm:p-6 space-y-6" }, [
                        createVNode("div", null, [
                          createVNode("label", {
                            for: "period_month",
                            class: "block text-sm font-medium text-gray-700 mb-2"
                          }, " Periode Bulan "),
                          withDirectives(createVNode("input", {
                            id: "period_month",
                            "onUpdate:modelValue": ($event) => unref(form).period_month = $event,
                            type: "month",
                            class: ["mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500": __props.errors.period_month }]
                          }, null, 10, ["onUpdate:modelValue"]), [
                            [vModelText, unref(form).period_month]
                          ]),
                          __props.errors.period_month ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-2 text-sm text-red-600"
                          }, toDisplayString(__props.errors.period_month), 1)) : createCommentVNode("", true),
                          createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " Pilih bulan dan tahun untuk opening balance ")
                        ]),
                        hasExistingBalances.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-yellow-50 border border-yellow-200 rounded-md p-4"
                        }, [
                          createVNode("div", { class: "flex" }, [
                            createVNode("div", { class: "flex-shrink-0" }, [
                              createVNode(unref(AlertTriangle), { class: "h-5 w-5 text-yellow-400" })
                            ]),
                            createVNode("div", { class: "ml-3" }, [
                              createVNode("h3", { class: "text-sm font-medium text-yellow-800" }, " Opening Balance Sudah Ada "),
                              createVNode("div", { class: "mt-2 text-sm text-yellow-700" }, [
                                createVNode("p", null, "Opening balance untuk periode " + toDisplayString(unref(form).period_month) + " sudah pernah diinput. Input baru akan mengupdate data yang ada.", 1)
                              ])
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", { class: "space-y-6" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.bankAccounts, (bank, index) => {
                            return openBlock(), createBlock("div", {
                              key: bank.id
                            }, [
                              createVNode("div", { class: "border border-gray-200 rounded-lg p-6" }, [
                                createVNode("div", { class: "flex items-center mb-4" }, [
                                  createVNode("div", { class: "flex-shrink-0" }, [
                                    createVNode("div", { class: "w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center" }, [
                                      createVNode(unref(CreditCard), { class: "w-5 h-5 text-white" })
                                    ])
                                  ]),
                                  createVNode("div", { class: "ml-4" }, [
                                    createVNode("h3", { class: "text-lg font-medium text-gray-900" }, " Bank " + toDisplayString(bank.bank_name), 1),
                                    createVNode("p", { class: "text-sm text-gray-500" }, toDisplayString(bank.account_number) + " • " + toDisplayString(bank.account_name), 1)
                                  ])
                                ]),
                                __props.existingBalances[bank.id] ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "mb-4 p-3 bg-gray-50 rounded-md"
                                }, [
                                  createVNode("p", { class: "text-sm text-gray-700" }, [
                                    createVNode("span", { class: "font-medium" }, "Current Opening Balance:"),
                                    createTextVNode(" " + toDisplayString(formatCurrency(__props.existingBalances[bank.id].opening_balance)), 1)
                                  ])
                                ])) : createCommentVNode("", true),
                                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                                  createVNode("div", null, [
                                    createVNode("label", {
                                      for: `opening_balance_${bank.id}`,
                                      class: "block text-sm font-medium text-gray-700 mb-2"
                                    }, [
                                      createTextVNode(" Opening Balance "),
                                      createVNode("span", { class: "text-red-500" }, "*")
                                    ], 8, ["for"]),
                                    createVNode("div", { class: "relative rounded-md shadow-sm" }, [
                                      createVNode("div", { class: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" }, [
                                        createVNode("span", { class: "text-gray-500 sm:text-sm" }, "Rp")
                                      ]),
                                      withDirectives(createVNode("input", {
                                        id: `opening_balance_${bank.id}`,
                                        "onUpdate:modelValue": ($event) => unref(form).balances[index].opening_balance = $event,
                                        type: "text",
                                        class: ["mt-1 block w-full pl-12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm", { "border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500": __props.errors[`balances.${index}.opening_balance`] }],
                                        placeholder: "0",
                                        onInput: ($event) => formatCurrencyInput($event, index)
                                      }, null, 42, ["id", "onUpdate:modelValue", "onInput"]), [
                                        [vModelText, unref(form).balances[index].opening_balance]
                                      ])
                                    ]),
                                    __props.errors[`balances.${index}.opening_balance`] ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "mt-2 text-sm text-red-600"
                                    }, toDisplayString(__props.errors[`balances.${index}.opening_balance`]), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", null, [
                                    createVNode("label", {
                                      for: `notes_${bank.id}`,
                                      class: "block text-sm font-medium text-gray-700 mb-2"
                                    }, " Catatan (Opsional) ", 8, ["for"]),
                                    withDirectives(createVNode("textarea", {
                                      id: `notes_${bank.id}`,
                                      "onUpdate:modelValue": ($event) => unref(form).balances[index].notes = $event,
                                      rows: "3",
                                      class: "mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sage-500 focus:border-sage-500 sm:text-sm",
                                      placeholder: "Catatan untuk opening balance ini..."
                                    }, null, 8, ["id", "onUpdate:modelValue"]), [
                                      [vModelText, unref(form).balances[index].notes]
                                    ])
                                  ])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ]),
                      createVNode("div", { class: "px-4 py-3 bg-gray-50 text-right sm:px-6" }, [
                        createVNode("div", { class: "flex justify-end space-x-3" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-keuangan.bank-balance.index"),
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Batal ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(form).processing,
                            class: ["inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150", { "opacity-25": unref(form).processing }]
                          }, [
                            unref(form).processing ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "mr-2"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "animate-spin h-4 w-4",
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
                              ]))
                            ])) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(unref(form).processing ? "Menyimpan..." : "Simpan Opening Balance"), 1)
                          ], 10, ["disabled"])
                        ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/BankBalance/Create.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
