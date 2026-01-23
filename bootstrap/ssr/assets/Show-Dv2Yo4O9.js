import { withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, withModifiers, createCommentVNode, withDirectives, vModelText, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from "vue/server-renderer";
import { useForm, Head, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-DcSfvd5K.js";
import { ArrowLeft, CreditCard, DollarSign, TrendingUp, TrendingDown, Activity, History, Plus, Loader2, Download } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DPytNLut.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    bank: {
      type: Object,
      required: true
    },
    currentBalance: {
      type: Number,
      default: 0
    },
    stats: {
      type: Object,
      default: () => ({
        credit_this_month: 0,
        debit_this_month: 0,
        transactions_count: 0,
        net_flow: 0
      })
    },
    transactions: {
      type: Array,
      default: () => []
    }
  },
  setup(__props) {
    const props = __props;
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount || 0);
    };
    const formatDate = (date) => {
      if (!date) return "-";
      return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const capitalForm = useForm({
      amount: "",
      transaction_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      notes: ""
    });
    const submitCapitalDeposit = () => {
      capitalForm.post(route("admin-keuangan.bank-balance.capital-deposit", props.bank.id), {
        preserveScroll: true,
        onSuccess: () => {
          capitalForm.reset("amount", "notes");
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), {
              title: `Bank ${__props.bank.bank_name} Details`
            }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Bank ${ssrInterpolate(__props.bank.bank_name)} Details</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}> Balance and transaction details for ${ssrInterpolate(__props.bank.bank_name)}</p></div><div class="flex items-center space-x-2"${_scopeId}><a${ssrRenderAttr("href", _ctx.route("admin-keuangan.bank-balance.export-pdf", __props.bank.id))} class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2" target="_blank" rel="noopener noreferrer"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2 transform rotate-180" }, null, _parent2, _scopeId));
            _push2(` Export PDF </a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.bank-balance.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Back `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Back ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CreditCard), { class: "w-8 h-8 text-white" }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="ml-6 flex-1"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId}><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Bank Name</dt><dd class="mt-1 text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.bank.bank_name)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Account Number</dt><dd class="mt-1 text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.bank.account_number)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Account Name</dt><dd class="mt-1 text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.bank.account_name)}</dd></div><div${_scopeId}><dt class="text-sm font-medium text-gray-500"${_scopeId}>Swift Code</dt><dd class="mt-1 text-lg font-semibold text-gray-900"${_scopeId}>${ssrInterpolate(__props.bank.swift_code || "-")}</dd></div></div></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Current Balance</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.currentBalance))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(TrendingUp), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Credit This Month</dt><dd class="text-lg font-medium text-green-600"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.credit_this_month))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(TrendingDown), { class: "h-6 w-6 text-red-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Debit This Month</dt><dd class="text-lg font-medium text-red-600"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.debit_this_month))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Activity), { class: "h-6 w-6 text-purple-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Transactions</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.transactions_count)}</dd></dl></div></div></div></div></div><div class="mb-6"${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}>Net Cash Flow This Month</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}> Total credit minus total debit for this month </p></div><div class="text-right"${_scopeId}><p class="${ssrRenderClass(__props.stats.net_flow >= 0 ? "text-2xl font-bold text-green-600" : "text-2xl font-bold text-red-600")}"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.net_flow))}</p><div class="flex items-center mt-1"${_scopeId}>`);
            if (__props.stats.net_flow >= 0) {
              _push2(ssrRenderComponent(unref(TrendingUp), { class: "w-4 h-4 text-green-500 mr-1" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(TrendingDown), { class: "w-4 h-4 text-red-500 mr-1" }, null, _parent2, _scopeId));
            }
            _push2(`<span class="${ssrRenderClass(__props.stats.net_flow >= 0 ? "text-sm text-green-600" : "text-sm text-red-600")}"${_scopeId}>${ssrInterpolate(__props.stats.net_flow >= 0 ? "Positive Flow" : "Negative Flow")}</span></div></div></div></div></div></div><div class="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0 mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.bank-balance.history", __props.bank.id),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(History), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` View Full History `);
                } else {
                  return [
                    createVNode(unref(History), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" View Full History ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.bank-balance.create"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Input Opening Balance `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Input Opening Balance ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<form class="bg-white border border-sage-200 rounded-lg shadow-sm p-4 w-full lg:w-auto"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-end sm:space-x-3 space-y-3 sm:space-y-0"${_scopeId}><div class="w-full sm:w-32"${_scopeId}><label class="block text-xs font-medium text-gray-600 mb-1"${_scopeId}>Date</label><input${ssrRenderAttr("value", unref(capitalForm).transaction_date)} type="date" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm" required${_scopeId}></div><div class="w-full sm:w-40"${_scopeId}><label class="block text-xs font-medium text-gray-600 mb-1"${_scopeId}>Deposit Amount</label><input${ssrRenderAttr("value", unref(capitalForm).amount)} type="number" step="0.01" min="0" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm" required${_scopeId}></div><div class="w-full sm:w-48"${_scopeId}><label class="block text-xs font-medium text-gray-600 mb-1"${_scopeId}>Notes (optional)</label><input${ssrRenderAttr("value", unref(capitalForm).notes)} type="text" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm" placeholder="Example: Shareholder capital deposit"${_scopeId}></div><div${_scopeId}><button type="submit"${ssrIncludeBooleanAttr(unref(capitalForm).processing) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"${_scopeId}>`);
            if (unref(capitalForm).processing) {
              _push2(ssrRenderComponent(unref(Loader2), { class: "w-4 h-4 mr-2 animate-spin" }, null, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(unref(Download), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            }
            _push2(` Deposit Capital </button></div></div>`);
            if (unref(capitalForm).errors.amount) {
              _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(capitalForm).errors.amount)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(capitalForm).errors.transaction_date) {
              _push2(`<div class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(capitalForm).errors.transaction_date)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(capitalForm).errors.notes) {
              _push2(`<div class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(capitalForm).errors.notes)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(capitalForm).errors.error) {
              _push2(`<div class="text-xs text-red-600 mt-1"${_scopeId}>${ssrInterpolate(unref(capitalForm).errors.error)}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</form></div><div class="bg-white shadow overflow-hidden sm:rounded-md"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Recent Transactions</h3>`);
            if (__props.transactions && __props.transactions.length > 0) {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Date </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Type </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Description </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Amount </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Reference </th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
              ssrRenderList(__props.transactions.slice(0, 10), (transaction) => {
                _push2(`<tr${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(transaction.transaction_date))}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass(transaction.transaction_type === "credit" ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800")}"${_scopeId}>`);
                if (transaction.transaction_type === "credit") {
                  _push2(ssrRenderComponent(unref(TrendingUp), { class: "w-3 h-3 mr-1" }, null, _parent2, _scopeId));
                } else {
                  _push2(ssrRenderComponent(unref(TrendingDown), { class: "w-3 h-3 mr-1" }, null, _parent2, _scopeId));
                }
                _push2(` ${ssrInterpolate(transaction.transaction_type === "credit" ? "Credit" : "Debit")}</span></td><td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate"${_scopeId}>${ssrInterpolate(transaction.description)}</td><td class="${ssrRenderClass([transaction.transaction_type === "credit" ? "text-green-600" : "text-red-600", "px-6 py-4 whitespace-nowrap text-sm font-medium"])}"${_scopeId}>${ssrInterpolate(transaction.transaction_type === "credit" ? "+" : "-")}${ssrInterpolate(formatCurrency(transaction.amount))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(transaction.reference_type || "-")}</td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            } else {
              _push2(`<div class="text-center py-8"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Activity), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}>No transactions found</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}> Transactions will appear after customer or vendor payments are posted. </p></div>`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), {
                title: `Bank ${__props.bank.bank_name} Details`
              }, null, 8, ["title"]),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Bank " + toDisplayString(__props.bank.bank_name) + " Details", 1),
                        createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " Balance and transaction details for " + toDisplayString(__props.bank.bank_name), 1)
                      ]),
                      createVNode("div", { class: "flex items-center space-x-2" }, [
                        createVNode("a", {
                          href: _ctx.route("admin-keuangan.bank-balance.export-pdf", __props.bank.id),
                          class: "inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2",
                          target: "_blank",
                          rel: "noopener noreferrer"
                        }, [
                          createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2 transform rotate-180" }),
                          createTextVNode(" Export PDF ")
                        ], 8, ["href"]),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.bank-balance.index"),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Back ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "flex-shrink-0" }, [
                          createVNode("div", { class: "w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center" }, [
                            createVNode(unref(CreditCard), { class: "w-8 h-8 text-white" })
                          ])
                        ]),
                        createVNode("div", { class: "ml-6 flex-1" }, [
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Bank Name"),
                              createVNode("dd", { class: "mt-1 text-lg font-semibold text-gray-900" }, toDisplayString(__props.bank.bank_name), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Account Number"),
                              createVNode("dd", { class: "mt-1 text-lg font-semibold text-gray-900" }, toDisplayString(__props.bank.account_number), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Account Name"),
                              createVNode("dd", { class: "mt-1 text-lg font-semibold text-gray-900" }, toDisplayString(__props.bank.account_name), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500" }, "Swift Code"),
                              createVNode("dd", { class: "mt-1 text-lg font-semibold text-gray-900" }, toDisplayString(__props.bank.swift_code || "-"), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(DollarSign), { class: "h-6 w-6 text-green-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Current Balance"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.currentBalance)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(TrendingUp), { class: "h-6 w-6 text-blue-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Credit This Month"),
                              createVNode("dd", { class: "text-lg font-medium text-green-600" }, toDisplayString(formatCurrency(__props.stats.credit_this_month)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(TrendingDown), { class: "h-6 w-6 text-red-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Debit This Month"),
                              createVNode("dd", { class: "text-lg font-medium text-red-600" }, toDisplayString(formatCurrency(__props.stats.debit_this_month)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Activity), { class: "h-6 w-6 text-purple-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Transactions"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.transactions_count), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                      createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Net Cash Flow This Month"),
                            createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " Total credit minus total debit for this month ")
                          ]),
                          createVNode("div", { class: "text-right" }, [
                            createVNode("p", {
                              class: __props.stats.net_flow >= 0 ? "text-2xl font-bold text-green-600" : "text-2xl font-bold text-red-600"
                            }, toDisplayString(formatCurrency(__props.stats.net_flow)), 3),
                            createVNode("div", { class: "flex items-center mt-1" }, [
                              __props.stats.net_flow >= 0 ? (openBlock(), createBlock(unref(TrendingUp), {
                                key: 0,
                                class: "w-4 h-4 text-green-500 mr-1"
                              })) : (openBlock(), createBlock(unref(TrendingDown), {
                                key: 1,
                                class: "w-4 h-4 text-red-500 mr-1"
                              })),
                              createVNode("span", {
                                class: __props.stats.net_flow >= 0 ? "text-sm text-green-600" : "text-sm text-red-600"
                              }, toDisplayString(__props.stats.net_flow >= 0 ? "Positive Flow" : "Negative Flow"), 3)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-4 lg:space-y-0 mb-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.bank-balance.history", __props.bank.id),
                      class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(History), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" View Full History ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.bank-balance.create"),
                      class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Input Opening Balance ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("form", {
                      onSubmit: withModifiers(submitCapitalDeposit, ["prevent"]),
                      class: "bg-white border border-sage-200 rounded-lg shadow-sm p-4 w-full lg:w-auto"
                    }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:items-end sm:space-x-3 space-y-3 sm:space-y-0" }, [
                        createVNode("div", { class: "w-full sm:w-32" }, [
                          createVNode("label", { class: "block text-xs font-medium text-gray-600 mb-1" }, "Date"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(capitalForm).transaction_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(capitalForm).transaction_date]
                          ])
                        ]),
                        createVNode("div", { class: "w-full sm:w-40" }, [
                          createVNode("label", { class: "block text-xs font-medium text-gray-600 mb-1" }, "Deposit Amount"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(capitalForm).amount = $event,
                            type: "number",
                            step: "0.01",
                            min: "0",
                            class: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm",
                            required: ""
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(capitalForm).amount]
                          ])
                        ]),
                        createVNode("div", { class: "w-full sm:w-48" }, [
                          createVNode("label", { class: "block text-xs font-medium text-gray-600 mb-1" }, "Notes (optional)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(capitalForm).notes = $event,
                            type: "text",
                            class: "w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm",
                            placeholder: "Example: Shareholder capital deposit"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(capitalForm).notes]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("button", {
                            type: "submit",
                            disabled: unref(capitalForm).processing,
                            class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                          }, [
                            unref(capitalForm).processing ? (openBlock(), createBlock(unref(Loader2), {
                              key: 0,
                              class: "w-4 h-4 mr-2 animate-spin"
                            })) : (openBlock(), createBlock(unref(Download), {
                              key: 1,
                              class: "w-4 h-4 mr-2"
                            })),
                            createTextVNode(" Deposit Capital ")
                          ], 8, ["disabled"])
                        ])
                      ]),
                      unref(capitalForm).errors.amount ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-xs text-red-600 mt-2"
                      }, toDisplayString(unref(capitalForm).errors.amount), 1)) : createCommentVNode("", true),
                      unref(capitalForm).errors.transaction_date ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-xs text-red-600 mt-1"
                      }, toDisplayString(unref(capitalForm).errors.transaction_date), 1)) : createCommentVNode("", true),
                      unref(capitalForm).errors.notes ? (openBlock(), createBlock("div", {
                        key: 2,
                        class: "text-xs text-red-600 mt-1"
                      }, toDisplayString(unref(capitalForm).errors.notes), 1)) : createCommentVNode("", true),
                      unref(capitalForm).errors.error ? (openBlock(), createBlock("div", {
                        key: 3,
                        class: "text-xs text-red-600 mt-1"
                      }, toDisplayString(unref(capitalForm).errors.error), 1)) : createCommentVNode("", true)
                    ], 32)
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Recent Transactions"),
                      __props.transactions && __props.transactions.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "overflow-x-auto"
                      }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Date "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Type "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Description "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Amount "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Reference ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.transactions.slice(0, 10), (transaction) => {
                              return openBlock(), createBlock("tr", {
                                key: transaction.id
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatDate(transaction.transaction_date)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: transaction.transaction_type === "credit" ? "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" : "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                                  }, [
                                    transaction.transaction_type === "credit" ? (openBlock(), createBlock(unref(TrendingUp), {
                                      key: 0,
                                      class: "w-3 h-3 mr-1"
                                    })) : (openBlock(), createBlock(unref(TrendingDown), {
                                      key: 1,
                                      class: "w-3 h-3 mr-1"
                                    })),
                                    createTextVNode(" " + toDisplayString(transaction.transaction_type === "credit" ? "Credit" : "Debit"), 1)
                                  ], 2)
                                ]),
                                createVNode("td", { class: "px-6 py-4 text-sm text-gray-900 max-w-xs truncate" }, toDisplayString(transaction.description), 1),
                                createVNode("td", {
                                  class: ["px-6 py-4 whitespace-nowrap text-sm font-medium", transaction.transaction_type === "credit" ? "text-green-600" : "text-red-600"]
                                }, toDisplayString(transaction.transaction_type === "credit" ? "+" : "-") + toDisplayString(formatCurrency(transaction.amount)), 3),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(transaction.reference_type || "-"), 1)
                              ]);
                            }), 128))
                          ])
                        ])
                      ])) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "text-center py-8"
                      }, [
                        createVNode(unref(Activity), { class: "mx-auto h-12 w-12 text-gray-400" }),
                        createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No transactions found"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " Transactions will appear after customer or vendor payments are posted. ")
                      ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/BankBalance/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
