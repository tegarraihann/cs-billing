import { withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-Ce1gujPB.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { ArrowLeft, Edit, CheckCircle, Clock, Calendar, Tag, FileText, DollarSign, MessageSquare, Paperclip, XCircle, Trash2 } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DXLFoR_k.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    otherIncome: Object
  },
  setup(__props) {
    const props = __props;
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(amount || 0);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateTime = (dateTime) => {
      return new Date(dateTime).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getCategoryBadge = (category) => {
      const badges = {
        "Bunga Bank Mandiri": "bg-blue-100 text-blue-800",
        "Bunga Bank BCA": "bg-purple-100 text-purple-800",
        "Lainnya": "bg-gray-100 text-gray-800"
      };
      return badges[category] || "bg-gray-100 text-gray-800";
    };
    const postToProfitLoss = () => {
      if (confirm(`Posting pendapatan ini ke Laba Rugi?`)) {
        router.post(route("admin-keuangan.other-incomes.post-to-profit-loss", props.otherIncome.id));
      }
    };
    const unpostFromProfitLoss = () => {
      if (confirm(`Unpost pendapatan ini dari Laba Rugi?`)) {
        router.post(route("admin-keuangan.other-incomes.unpost-from-profit-loss", props.otherIncome.id));
      }
    };
    const deleteIncome = () => {
      if (confirm(`Apakah Anda yakin ingin menghapus pendapatan ini?`)) {
        router.delete(route("admin-keuangan.other-incomes.destroy", props.otherIncome.id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Detail Pendapatan Lain-lain" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center space-x-4"${_scopeId}>`);
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
            _push2(`<div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Detail Pendapatan Lain-lain</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Informasi lengkap pendapatan</p></div></div><div class="flex space-x-2"${_scopeId}>`);
            if (!__props.otherIncome.posted_to_profit_loss) {
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.other-incomes.edit", __props.otherIncome.id),
                class: "inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Edit), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` Edit `);
                  } else {
                    return [
                      createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" Edit ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="mb-6"${_scopeId}><span class="${ssrRenderClass([__props.otherIncome.posted_to_profit_loss ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800", "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"])}"${_scopeId}>`);
            if (__props.otherIncome.posted_to_profit_loss) {
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Clock), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            }
            _push2(` ${ssrInterpolate(__props.otherIncome.posted_to_profit_loss ? "Posted ke Laba Rugi" : "Pending")}</span></div><div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6"${_scopeId}><div class="px-4 py-5 sm:px-6 bg-sage-50"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Informasi Pendapatan</h3></div><div class="border-t border-gray-200"${_scopeId}><dl${_scopeId}><div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent2, _scopeId));
            _push2(` Tanggal </dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium"${_scopeId}>${ssrInterpolate(formatDate(__props.otherIncome.transaction_date))}</dd></div><div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Tag), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent2, _scopeId));
            _push2(` Kategori </dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}><span class="${ssrRenderClass([getCategoryBadge(__props.otherIncome.category), "inline-flex px-3 py-1 text-sm font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(__props.otherIncome.category)}</span></dd></div><div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent2, _scopeId));
            _push2(` Deskripsi </dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(__props.otherIncome.description)}</dd></div><div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 flex items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent2, _scopeId));
            _push2(` Jumlah </dt><dd class="mt-1 text-lg font-bold text-green-600 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(formatCurrency(__props.otherIncome.amount))}</dd></div>`);
            if (__props.otherIncome.notes) {
              _push2(`<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(MessageSquare), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent2, _scopeId));
              _push2(` Catatan </dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(__props.otherIncome.notes)}</dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.otherIncome.receipt_file) {
              _push2(`<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500 flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Paperclip), { class: "w-4 h-4 mr-2 text-gray-400" }, null, _parent2, _scopeId));
              _push2(` Bukti Pendapatan </dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}><a${ssrRenderAttr("href", `/storage/${__props.otherIncome.receipt_file}`)} target="_blank" class="inline-flex items-center text-sage-600 hover:text-sage-800"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "w-4 h-4 mr-1" }, null, _parent2, _scopeId));
              _push2(` Lihat File </a></dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</dl></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6"${_scopeId}><div class="px-4 py-5 sm:px-6 bg-gray-50"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Informasi Audit</h3></div><div class="border-t border-gray-200"${_scopeId}><dl${_scopeId}><div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Dibuat Oleh</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(((_a = __props.otherIncome.creator) == null ? void 0 : _a.name) || "-")} <span class="text-gray-500 ml-2"${_scopeId}>${ssrInterpolate(formatDateTime(__props.otherIncome.created_at))}</span></dd></div>`);
            if (__props.otherIncome.posted_to_profit_loss) {
              _push2(`<div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Di-post ke Laba Rugi Oleh</dt><dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"${_scopeId}>${ssrInterpolate(((_b = __props.otherIncome.approver) == null ? void 0 : _b.name) || "-")} <span class="text-gray-500 ml-2"${_scopeId}>${ssrInterpolate(formatDateTime(__props.otherIncome.posted_at))}</span></dd></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</dl></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}>Aksi</h3><div class="flex flex-wrap gap-3"${_scopeId}>`);
            if (!__props.otherIncome.posted_to_profit_loss) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 transition"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Post ke Laba Rugi </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.otherIncome.posted_to_profit_loss) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 transition"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(XCircle), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Unpost dari Laba Rugi </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (!__props.otherIncome.posted_to_profit_loss) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 transition"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Hapus Pendapatan </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Detail Pendapatan Lain-lain" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center space-x-4" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.other-incomes.index"),
                          class: "text-sage-600 hover:text-sage-800 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "w-5 h-5" })
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Detail Pendapatan Lain-lain"),
                          createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Informasi lengkap pendapatan")
                        ])
                      ]),
                      createVNode("div", { class: "flex space-x-2" }, [
                        !__props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: _ctx.route("admin-keuangan.other-incomes.edit", __props.otherIncome.id),
                          class: "inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 transition"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Edit ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("span", {
                      class: [__props.otherIncome.posted_to_profit_loss ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800", "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"]
                    }, [
                      __props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock(unref(CheckCircle), {
                        key: 0,
                        class: "w-4 h-4 mr-2"
                      })) : (openBlock(), createBlock(unref(Clock), {
                        key: 1,
                        class: "w-4 h-4 mr-2"
                      })),
                      createTextVNode(" " + toDisplayString(__props.otherIncome.posted_to_profit_loss ? "Posted ke Laba Rugi" : "Pending"), 1)
                    ], 2)
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:px-6 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Informasi Pendapatan")
                    ]),
                    createVNode("div", { class: "border-t border-gray-200" }, [
                      createVNode("dl", null, [
                        createVNode("div", { class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 flex items-center" }, [
                            createVNode(unref(Calendar), { class: "w-4 h-4 mr-2 text-gray-400" }),
                            createTextVNode(" Tanggal ")
                          ]),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 font-medium" }, toDisplayString(formatDate(__props.otherIncome.transaction_date)), 1)
                        ]),
                        createVNode("div", { class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 flex items-center" }, [
                            createVNode(unref(Tag), { class: "w-4 h-4 mr-2 text-gray-400" }),
                            createTextVNode(" Kategori ")
                          ]),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, [
                            createVNode("span", {
                              class: ["inline-flex px-3 py-1 text-sm font-semibold rounded-full", getCategoryBadge(__props.otherIncome.category)]
                            }, toDisplayString(__props.otherIncome.category), 3)
                          ])
                        ]),
                        createVNode("div", { class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 flex items-center" }, [
                            createVNode(unref(FileText), { class: "w-4 h-4 mr-2 text-gray-400" }),
                            createTextVNode(" Deskripsi ")
                          ]),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(__props.otherIncome.description), 1)
                        ]),
                        createVNode("div", { class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 flex items-center" }, [
                            createVNode(unref(DollarSign), { class: "w-4 h-4 mr-2 text-gray-400" }),
                            createTextVNode(" Jumlah ")
                          ]),
                          createVNode("dd", { class: "mt-1 text-lg font-bold text-green-600 sm:mt-0 sm:col-span-2" }, toDisplayString(formatCurrency(__props.otherIncome.amount)), 1)
                        ]),
                        __props.otherIncome.notes ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 flex items-center" }, [
                            createVNode(unref(MessageSquare), { class: "w-4 h-4 mr-2 text-gray-400" }),
                            createTextVNode(" Catatan ")
                          ]),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, toDisplayString(__props.otherIncome.notes), 1)
                        ])) : createCommentVNode("", true),
                        __props.otherIncome.receipt_file ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500 flex items-center" }, [
                            createVNode(unref(Paperclip), { class: "w-4 h-4 mr-2 text-gray-400" }),
                            createTextVNode(" Bukti Pendapatan ")
                          ]),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, [
                            createVNode("a", {
                              href: `/storage/${__props.otherIncome.receipt_file}`,
                              target: "_blank",
                              class: "inline-flex items-center text-sage-600 hover:text-sage-800"
                            }, [
                              createVNode(unref(FileText), { class: "w-4 h-4 mr-1" }),
                              createTextVNode(" Lihat File ")
                            ], 8, ["href"])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:px-6 bg-gray-50" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Informasi Audit")
                    ]),
                    createVNode("div", { class: "border-t border-gray-200" }, [
                      createVNode("dl", null, [
                        createVNode("div", { class: "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Dibuat Oleh"),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, [
                            createTextVNode(toDisplayString(((_c = __props.otherIncome.creator) == null ? void 0 : _c.name) || "-") + " ", 1),
                            createVNode("span", { class: "text-gray-500 ml-2" }, toDisplayString(formatDateTime(__props.otherIncome.created_at)), 1)
                          ])
                        ]),
                        __props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                        }, [
                          createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Di-post ke Laba Rugi Oleh"),
                          createVNode("dd", { class: "mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2" }, [
                            createTextVNode(toDisplayString(((_d = __props.otherIncome.approver) == null ? void 0 : _d.name) || "-") + " ", 1),
                            createVNode("span", { class: "text-gray-500 ml-2" }, toDisplayString(formatDateTime(__props.otherIncome.posted_at)), 1)
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                    createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Aksi"),
                      createVNode("div", { class: "flex flex-wrap gap-3" }, [
                        !__props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock("button", {
                          key: 0,
                          onClick: postToProfitLoss,
                          class: "inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 transition"
                        }, [
                          createVNode(unref(CheckCircle), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Post ke Laba Rugi ")
                        ])) : createCommentVNode("", true),
                        __props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock("button", {
                          key: 1,
                          onClick: unpostFromProfitLoss,
                          class: "inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-700 transition"
                        }, [
                          createVNode(unref(XCircle), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Unpost dari Laba Rugi ")
                        ])) : createCommentVNode("", true),
                        !__props.otherIncome.posted_to_profit_loss ? (openBlock(), createBlock("button", {
                          key: 2,
                          onClick: deleteIncome,
                          class: "inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 transition"
                        }, [
                          createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Hapus Pendapatan ")
                        ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/OtherIncomes/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
