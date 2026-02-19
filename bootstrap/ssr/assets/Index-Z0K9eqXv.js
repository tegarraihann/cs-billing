import { onMounted, ref, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, withModifiers, Fragment, renderList, toDisplayString, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { useRemember, useForm, Head, Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { ArrowLeftRight, Plus, CreditCard, DollarSign, Activity, Calendar, History, Download, Eye } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    bankData: {
      type: Array,
      default: () => []
    },
    currentMonth: {
      type: String,
      required: true
    },
    stats: {
      type: Object,
      default: () => ({
        mandiri_balance: 0,
        bca_balance: 0,
        total_balance: 0,
        transactions_this_month: 0
      })
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    var _a;
    const props = __props;
    const filterForm = useRemember({
      period_month: ((_a = props.filters) == null ? void 0 : _a.period_month) || props.currentMonth
    }, "bank-balance-index-filters");
    const applyFilters = () => {
      router.get(route("admin-keuangan.bank-balance.index"), {
        period_month: filterForm.period_month
      }, {
        preserveState: true,
        preserveScroll: true,
        replace: true
      });
    };
    onMounted(() => {
      var _a2;
      if (!((_a2 = props.filters) == null ? void 0 : _a2.period_month)) {
        applyFilters();
      }
    });
    const showTransfer = ref(false);
    const transferForm = useForm({
      from_bank_id: "",
      to_bank_id: "",
      transfer_date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
      amount: "",
      notes: ""
    });
    const closeTransfer = () => {
      showTransfer.value = false;
      transferForm.reset();
      transferForm.clearErrors();
      transferForm.transfer_date = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    };
    const submitTransfer = () => {
      transferForm.post(route("admin-keuangan.bank-balance.transfer"), {
        onSuccess: () => {
          closeTransfer();
        }
      });
    };
    const exportPdfUrl = (bankId) => {
      const periodMonth = filterForm.period_month || props.currentMonth;
      const baseUrl = route("admin-keuangan.bank-balance.export-pdf", bankId);
      if (!periodMonth) {
        return baseUrl;
      }
      return `${baseUrl}?period_month=${encodeURIComponent(periodMonth)}`;
    };
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
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Bank Balance Management" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Bank Balance Management</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Manage bank balances and input monthly opening balances.</p></div><div class="flex items-center gap-3"${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 border border-sage-300 rounded-md font-semibold text-xs text-sage-700 uppercase tracking-widest hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ArrowLeftRight), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Transfer Bank </button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.bank-balance.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
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
            _push2(`</div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}>Period Filter</h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Period (YYYY-MM)</label><input${ssrRenderAttr("value", unref(filterForm).period_month)} type="month" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}></div><div class="flex items-end"${_scopeId}><button type="button" class="w-full px-4 py-2 bg-sage-600 text-white rounded-md transition-colors hover:bg-sage-700"${_scopeId}> Apply </button></div></div></div></div>`);
            if (showTransfer.value) {
              _push2(`<div class="bg-white border border-sage-200 rounded-lg shadow-sm p-6 mb-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><div${_scopeId}><h2 class="text-lg font-semibold text-gray-900"${_scopeId}>Bank Transfer</h2><p class="text-sm text-gray-500"${_scopeId}>Move funds between bank accounts without affecting other modules.</p></div><button type="button" class="text-xs font-semibold text-gray-500 uppercase tracking-widest hover:text-gray-700"${_scopeId}> Close </button></div><form class="space-y-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>From Bank</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(transferForm).from_bank_id) ? ssrLooseContain(unref(transferForm).from_bank_id, "") : ssrLooseEqual(unref(transferForm).from_bank_id, "")) ? " selected" : ""}${_scopeId}>Select bank</option><!--[-->`);
              ssrRenderList(__props.bankData, (bank) => {
                _push2(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(transferForm).from_bank_id) ? ssrLooseContain(unref(transferForm).from_bank_id, bank.id) : ssrLooseEqual(unref(transferForm).from_bank_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} - ${ssrInterpolate(bank.account_number)}</option>`);
              });
              _push2(`<!--]--></select>`);
              if (unref(transferForm).errors.from_bank_id) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(transferForm).errors.from_bank_id)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>To Bank</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(transferForm).to_bank_id) ? ssrLooseContain(unref(transferForm).to_bank_id, "") : ssrLooseEqual(unref(transferForm).to_bank_id, "")) ? " selected" : ""}${_scopeId}>Select bank</option><!--[-->`);
              ssrRenderList(__props.bankData, (bank) => {
                _push2(`<option${ssrRenderAttr("value", bank.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(transferForm).to_bank_id) ? ssrLooseContain(unref(transferForm).to_bank_id, bank.id) : ssrLooseEqual(unref(transferForm).to_bank_id, bank.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(bank.bank_name)} - ${ssrInterpolate(bank.account_number)}</option>`);
              });
              _push2(`<!--]--></select>`);
              if (unref(transferForm).errors.to_bank_id) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(transferForm).errors.to_bank_id)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Transfer Date</label><input${ssrRenderAttr("value", unref(transferForm).transfer_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
              if (unref(transferForm).errors.transfer_date) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(transferForm).errors.transfer_date)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Amount (IDR)</label><input${ssrRenderAttr("value", unref(transferForm).amount)} type="number" min="0" step="0.01" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}>`);
              if (unref(transferForm).errors.amount) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(transferForm).errors.amount)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Notes (Optional)</label><textarea rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500" placeholder="Transfer notes"${_scopeId}>${ssrInterpolate(unref(transferForm).notes)}</textarea>`);
              if (unref(transferForm).errors.notes) {
                _push2(`<div class="text-xs text-red-600 mt-2"${_scopeId}>${ssrInterpolate(unref(transferForm).errors.notes)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex items-center justify-end gap-3"${_scopeId}><button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"${_scopeId}> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(transferForm).processing) ? " disabled" : ""} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50"${_scopeId}> Save Transfer </button></div>`);
              if (unref(transferForm).errors.error) {
                _push2(`<div class="text-xs text-red-600"${_scopeId}>${ssrInterpolate(unref(transferForm).errors.error)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</form></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CreditCard), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Mandiri Bank Balance</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.mandiri_balance))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CreditCard), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>BCA Bank Balance</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.bca_balance))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), { class: "h-6 w-6 text-sage-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Bank Balance</dt><dd class="text-lg font-medium text-sage-600 font-bold"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.total_balance))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Activity), { class: "h-6 w-6 text-purple-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Transactions This Month</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.transactions_this_month)}</dd></dl></div></div></div></div></div><div class="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6"${_scopeId}><div class="flex"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), { class: "h-5 w-5 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-3"${_scopeId}><h3 class="text-sm font-medium text-blue-800"${_scopeId}> Active Period: ${ssrInterpolate(__props.currentMonth)}</h3><div class="mt-2 text-sm text-blue-700"${_scopeId}><p${_scopeId}>Make sure the opening balance is entered for this period to keep bank balance tracking accurate.</p></div></div></div></div><div class="space-y-6"${_scopeId}><!--[-->`);
            ssrRenderList(__props.bankData, (bank) => {
              _push2(`<div class="bg-white shadow overflow-hidden sm:rounded-lg"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}><div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CreditCard), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="ml-4"${_scopeId}><h3 class="text-lg font-medium text-gray-900"${_scopeId}> Bank ${ssrInterpolate(bank.bank_name)}</h3><p class="text-sm text-gray-500"${_scopeId}> Account: ${ssrInterpolate(bank.account_number)} • ${ssrInterpolate(bank.account_name)}</p></div></div><div class="text-right"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Current Balance</p><p class="text-2xl font-bold text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(bank.current_balance))}</p>`);
              if (bank.last_updated) {
                _push2(`<p class="text-xs text-gray-400"${_scopeId}> Last updated: ${ssrInterpolate(formatDate(bank.last_updated))}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="mt-6 flex justify-between items-center"${_scopeId}><div class="flex space-x-4"${_scopeId}>`);
              if (bank.recent_balances && bank.recent_balances.length > 0) {
                _push2(`<div class="text-sm text-gray-600"${_scopeId}><span class="font-medium"${_scopeId}>Recent Opening Balances:</span><div class="mt-1 space-y-1"${_scopeId}><!--[-->`);
                ssrRenderList(bank.recent_balances.slice(0, 3), (balance) => {
                  _push2(`<div class="flex justify-between"${_scopeId}><span${_scopeId}>${ssrInterpolate(balance.period_month)}</span><span class="font-medium"${_scopeId}>${ssrInterpolate(formatCurrency(balance.opening_balance))}</span></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex space-x-3"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.bank-balance.history", { bank: bank.id, period_month: unref(filterForm).period_month }),
                class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(History), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` View History `);
                  } else {
                    return [
                      createVNode(unref(History), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" View History ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<a${ssrRenderAttr("href", exportPdfUrl(bank.id))} class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Download), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Export PDF </a>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.bank-balance.show", { bankBalance: bank.id, period_month: unref(filterForm).period_month }),
                class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Eye), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` View Details `);
                  } else {
                    return [
                      createVNode(unref(Eye), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" View Details ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</div></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            if (!__props.bankData || __props.bankData.length === 0) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CreditCard), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}>No bank accounts found</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}> Bank accounts will appear after opening balances are entered. </p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Bank Balance Management" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Bank Balance Management"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Manage bank balances and input monthly opening balances.")
                    ]),
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("button", {
                        type: "button",
                        onClick: ($event) => showTransfer.value = true,
                        class: "inline-flex items-center px-4 py-2 border border-sage-300 rounded-md font-semibold text-xs text-sage-700 uppercase tracking-widest hover:bg-sage-50 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, [
                        createVNode(unref(ArrowLeftRight), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Transfer Bank ")
                      ], 8, ["onClick"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.bank-balance.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Input Opening Balance ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Period Filter"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Period (YYYY-MM)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(filterForm).period_month = $event,
                            type: "month",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(filterForm).period_month]
                          ])
                        ]),
                        createVNode("div", { class: "flex items-end" }, [
                          createVNode("button", {
                            type: "button",
                            onClick: applyFilters,
                            class: "w-full px-4 py-2 bg-sage-600 text-white rounded-md transition-colors hover:bg-sage-700"
                          }, " Apply ")
                        ])
                      ])
                    ])
                  ]),
                  showTransfer.value ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-white border border-sage-200 rounded-lg shadow-sm p-6 mb-6"
                  }, [
                    createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-lg font-semibold text-gray-900" }, "Bank Transfer"),
                        createVNode("p", { class: "text-sm text-gray-500" }, "Move funds between bank accounts without affecting other modules.")
                      ]),
                      createVNode("button", {
                        type: "button",
                        onClick: closeTransfer,
                        class: "text-xs font-semibold text-gray-500 uppercase tracking-widest hover:text-gray-700"
                      }, " Close ")
                    ]),
                    createVNode("form", {
                      onSubmit: withModifiers(submitTransfer, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "From Bank"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(transferForm).from_bank_id = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Select bank"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.bankData, (bank) => {
                              return openBlock(), createBlock("option", {
                                key: bank.id,
                                value: bank.id
                              }, toDisplayString(bank.bank_name) + " - " + toDisplayString(bank.account_number), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(transferForm).from_bank_id]
                          ]),
                          unref(transferForm).errors.from_bank_id ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(transferForm).errors.from_bank_id), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "To Bank"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => unref(transferForm).to_bank_id = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Select bank"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.bankData, (bank) => {
                              return openBlock(), createBlock("option", {
                                key: bank.id,
                                value: bank.id
                              }, toDisplayString(bank.bank_name) + " - " + toDisplayString(bank.account_number), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, unref(transferForm).to_bank_id]
                          ]),
                          unref(transferForm).errors.to_bank_id ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(transferForm).errors.to_bank_id), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Transfer Date"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(transferForm).transfer_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(transferForm).transfer_date]
                          ]),
                          unref(transferForm).errors.transfer_date ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(transferForm).errors.transfer_date), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Amount (IDR)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => unref(transferForm).amount = $event,
                            type: "number",
                            min: "0",
                            step: "0.01",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, unref(transferForm).amount]
                          ]),
                          unref(transferForm).errors.amount ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-xs text-red-600 mt-2"
                          }, toDisplayString(unref(transferForm).errors.amount), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Notes (Optional)"),
                        withDirectives(createVNode("textarea", {
                          "onUpdate:modelValue": ($event) => unref(transferForm).notes = $event,
                          rows: "3",
                          class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500",
                          placeholder: "Transfer notes"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, unref(transferForm).notes]
                        ]),
                        unref(transferForm).errors.notes ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-xs text-red-600 mt-2"
                        }, toDisplayString(unref(transferForm).errors.notes), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "flex items-center justify-end gap-3" }, [
                        createVNode("button", {
                          type: "button",
                          onClick: closeTransfer,
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 text-xs font-semibold rounded-md text-gray-700 hover:bg-gray-50"
                        }, " Cancel "),
                        createVNode("button", {
                          type: "submit",
                          disabled: unref(transferForm).processing,
                          class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-xs font-semibold rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 disabled:opacity-50"
                        }, " Save Transfer ", 8, ["disabled"])
                      ]),
                      unref(transferForm).errors.error ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-xs text-red-600"
                      }, toDisplayString(unref(transferForm).errors.error), 1)) : createCommentVNode("", true)
                    ], 32)
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(CreditCard), { class: "h-6 w-6 text-blue-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Mandiri Bank Balance"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.stats.mandiri_balance)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(CreditCard), { class: "h-6 w-6 text-green-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "BCA Bank Balance"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.stats.bca_balance)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(DollarSign), { class: "h-6 w-6 text-sage-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Bank Balance"),
                              createVNode("dd", { class: "text-lg font-medium text-sage-600 font-bold" }, toDisplayString(formatCurrency(__props.stats.total_balance)), 1)
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
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Transactions This Month"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.transactions_this_month), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-blue-50 border border-blue-200 rounded-md p-4 mb-6" }, [
                    createVNode("div", { class: "flex" }, [
                      createVNode("div", { class: "flex-shrink-0" }, [
                        createVNode(unref(Calendar), { class: "h-5 w-5 text-blue-400" })
                      ]),
                      createVNode("div", { class: "ml-3" }, [
                        createVNode("h3", { class: "text-sm font-medium text-blue-800" }, " Active Period: " + toDisplayString(__props.currentMonth), 1),
                        createVNode("div", { class: "mt-2 text-sm text-blue-700" }, [
                          createVNode("p", null, "Make sure the opening balance is entered for this period to keep bank balance tracking accurate.")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.bankData, (bank) => {
                      return openBlock(), createBlock("div", {
                        key: bank.id,
                        class: "bg-white shadow overflow-hidden sm:rounded-lg"
                      }, [
                        createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                          createVNode("div", { class: "flex items-center justify-between" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("div", { class: "flex-shrink-0" }, [
                                createVNode("div", { class: "w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center" }, [
                                  createVNode(unref(CreditCard), { class: "w-6 h-6 text-white" })
                                ])
                              ]),
                              createVNode("div", { class: "ml-4" }, [
                                createVNode("h3", { class: "text-lg font-medium text-gray-900" }, " Bank " + toDisplayString(bank.bank_name), 1),
                                createVNode("p", { class: "text-sm text-gray-500" }, " Account: " + toDisplayString(bank.account_number) + " • " + toDisplayString(bank.account_name), 1)
                              ])
                            ]),
                            createVNode("div", { class: "text-right" }, [
                              createVNode("p", { class: "text-sm text-gray-500" }, "Current Balance"),
                              createVNode("p", { class: "text-2xl font-bold text-gray-900" }, toDisplayString(formatCurrency(bank.current_balance)), 1),
                              bank.last_updated ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-gray-400"
                              }, " Last updated: " + toDisplayString(formatDate(bank.last_updated)), 1)) : createCommentVNode("", true)
                            ])
                          ]),
                          createVNode("div", { class: "mt-6 flex justify-between items-center" }, [
                            createVNode("div", { class: "flex space-x-4" }, [
                              bank.recent_balances && bank.recent_balances.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-sm text-gray-600"
                              }, [
                                createVNode("span", { class: "font-medium" }, "Recent Opening Balances:"),
                                createVNode("div", { class: "mt-1 space-y-1" }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(bank.recent_balances.slice(0, 3), (balance) => {
                                    return openBlock(), createBlock("div", {
                                      key: balance.id,
                                      class: "flex justify-between"
                                    }, [
                                      createVNode("span", null, toDisplayString(balance.period_month), 1),
                                      createVNode("span", { class: "font-medium" }, toDisplayString(formatCurrency(balance.opening_balance)), 1)
                                    ]);
                                  }), 128))
                                ])
                              ])) : createCommentVNode("", true)
                            ]),
                            createVNode("div", { class: "flex space-x-3" }, [
                              createVNode(unref(Link), {
                                href: _ctx.route("admin-keuangan.bank-balance.history", { bank: bank.id, period_month: unref(filterForm).period_month }),
                                class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(History), { class: "w-4 h-4 mr-2" }),
                                  createTextVNode(" View History ")
                                ]),
                                _: 2
                              }, 1032, ["href"]),
                              createVNode("a", {
                                href: exportPdfUrl(bank.id),
                                class: "inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                              }, [
                                createVNode(unref(Download), { class: "w-4 h-4 mr-2" }),
                                createTextVNode(" Export PDF ")
                              ], 8, ["href"]),
                              createVNode(unref(Link), {
                                href: _ctx.route("admin-keuangan.bank-balance.show", { bankBalance: bank.id, period_month: unref(filterForm).period_month }),
                                class: "inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(Eye), { class: "w-4 h-4 mr-2" }),
                                  createTextVNode(" View Details ")
                                ]),
                                _: 2
                              }, 1032, ["href"])
                            ])
                          ])
                        ])
                      ]);
                    }), 128))
                  ]),
                  !__props.bankData || __props.bankData.length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center py-12"
                  }, [
                    createVNode(unref(CreditCard), { class: "mx-auto h-12 w-12 text-gray-400" }),
                    createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No bank accounts found"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-500" }, " Bank accounts will appear after opening balances are entered. ")
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/BankBalance/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
