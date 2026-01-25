import { computed, withCtx, unref, createTextVNode, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { Head, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BXHi-kqO.js";
import { P as Pagination } from "./Pagination-JgWO_U2H.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    receivablesMain: Object,
    receivablesReimbursement: Object
  },
  setup(__props) {
    const props = __props;
    const sections = computed(() => [
      {
        key: "main",
        title: "Main Invoice Opening",
        description: "Opening receivables for main invoices.",
        data: props.receivablesMain
      },
      {
        key: "reimbursement",
        title: "Reimbursement Opening",
        description: "Opening receivables for reimbursements.",
        data: props.receivablesReimbursement
      }
    ]);
    const formatDate = (value) => {
      if (!value) return "-";
      return new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    };
    const formatCurrency = (value) => {
      const amount = Number(value || 0);
      return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Opening Receivables" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Opening Receivables</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Opening balance records for accounts receivable.</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.opening-receivables.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Add Opening Receivable `);
                } else {
                  return [
                    createTextVNode(" Add Opening Receivable ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-8"${_scopeId}><!--[-->`);
            ssrRenderList(sections.value, (section) => {
              _push2(`<div${_scopeId}><div class="mb-3"${_scopeId}><h2 class="text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(section.title)}</h2><p class="text-sm text-gray-600"${_scopeId}>${ssrInterpolate(section.description)}</p></div><div class="bg-white shadow overflow-hidden sm:rounded-md"${_scopeId}>`);
              if (section.data && section.data.data && section.data.data.length) {
                _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Customer</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>SO Number</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Invoice</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Invoice Date</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Amount</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Outstanding</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Payment Date</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
                ssrRenderList(section.data.data, (receivable) => {
                  var _a;
                  _push2(`<tr${_scopeId}><td class="px-6 py-4 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(((_a = receivable.customer) == null ? void 0 : _a.company_name) || receivable.customer_name || "-")}</td><td class="px-6 py-4 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(receivable.source_so_number || "-")}</td><td class="px-6 py-4 text-sm text-gray-900"${_scopeId}>${ssrInterpolate(receivable.invoice_number)}</td><td class="px-6 py-4 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(formatDate(receivable.invoice_date))}</td><td class="px-6 py-4 text-right text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(receivable.invoice_amount))}</td><td class="px-6 py-4 text-right text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(receivable.outstanding_amount))}</td><td class="px-6 py-4 text-sm text-gray-600"${_scopeId}>${ssrInterpolate(formatDate(receivable.opening_payment_date))}</td><td class="px-6 py-4 text-right text-sm font-medium"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("admin-keuangan.account-receivables.show", receivable.id),
                    class: "text-sage-600 hover:text-sage-900"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` View `);
                      } else {
                        return [
                          createTextVNode(" View ")
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                  _push2(`</td></tr>`);
                });
                _push2(`<!--]--></tbody></table></div>`);
              } else {
                _push2(`<div class="px-6 py-8 text-center text-sm text-gray-500"${_scopeId}> No opening receivables recorded. </div>`);
              }
              _push2(`</div>`);
              if (section.data) {
                _push2(`<div class="mt-6"${_scopeId}>`);
                _push2(ssrRenderComponent(Pagination, {
                  data: section.data
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Opening Receivables" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Opening Receivables"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Opening balance records for accounts receivable.")
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.opening-receivables.create"),
                      class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Add Opening Receivable ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "space-y-8" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(sections.value, (section) => {
                      return openBlock(), createBlock("div", {
                        key: section.key
                      }, [
                        createVNode("div", { class: "mb-3" }, [
                          createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, toDisplayString(section.title), 1),
                          createVNode("p", { class: "text-sm text-gray-600" }, toDisplayString(section.description), 1)
                        ]),
                        createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                          section.data && section.data.data && section.data.data.length ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "overflow-x-auto"
                          }, [
                            createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                              createVNode("thead", { class: "bg-gray-50" }, [
                                createVNode("tr", null, [
                                  createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Customer"),
                                  createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "SO Number"),
                                  createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Invoice"),
                                  createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Invoice Date"),
                                  createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Amount"),
                                  createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Outstanding"),
                                  createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Payment Date"),
                                  createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions")
                                ])
                              ]),
                              createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(section.data.data, (receivable) => {
                                  var _a;
                                  return openBlock(), createBlock("tr", {
                                    key: receivable.id
                                  }, [
                                    createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(((_a = receivable.customer) == null ? void 0 : _a.company_name) || receivable.customer_name || "-"), 1),
                                    createVNode("td", { class: "px-6 py-4 text-sm text-gray-600" }, toDisplayString(receivable.source_so_number || "-"), 1),
                                    createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(receivable.invoice_number), 1),
                                    createVNode("td", { class: "px-6 py-4 text-sm text-gray-600" }, toDisplayString(formatDate(receivable.invoice_date)), 1),
                                    createVNode("td", { class: "px-6 py-4 text-right text-sm text-gray-900" }, toDisplayString(formatCurrency(receivable.invoice_amount)), 1),
                                    createVNode("td", { class: "px-6 py-4 text-right text-sm text-gray-900" }, toDisplayString(formatCurrency(receivable.outstanding_amount)), 1),
                                    createVNode("td", { class: "px-6 py-4 text-sm text-gray-600" }, toDisplayString(formatDate(receivable.opening_payment_date)), 1),
                                    createVNode("td", { class: "px-6 py-4 text-right text-sm font-medium" }, [
                                      createVNode(unref(Link), {
                                        href: _ctx.route("admin-keuangan.account-receivables.show", receivable.id),
                                        class: "text-sage-600 hover:text-sage-900"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" View ")
                                        ]),
                                        _: 2
                                      }, 1032, ["href"])
                                    ])
                                  ]);
                                }), 128))
                              ])
                            ])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "px-6 py-8 text-center text-sm text-gray-500"
                          }, " No opening receivables recorded. "))
                        ]),
                        section.data ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-6"
                        }, [
                          createVNode(Pagination, {
                            data: section.data
                          }, null, 8, ["data"])
                        ])) : createCommentVNode("", true)
                      ]);
                    }), 128))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/OpeningReceivables/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
