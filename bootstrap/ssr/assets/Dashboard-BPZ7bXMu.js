import { computed, onMounted, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-CnL2CSWj.js";
import { Head } from "@inertiajs/vue3";
import { DollarSign, TrendingDown, TrendingUp, Calculator, Receipt, AlertTriangle, CheckCircle, Clock, FileText, Plus, CreditCard, BarChart3, AlertCircle } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-BkEnLfKi.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    user: Object,
    userRole: String,
    stats: Object,
    monthlyProfits: Array,
    recentTransactions: Array
  },
  setup(__props) {
    const props = __props;
    computed(() => props.user);
    const recentTransactions = computed(() => props.recentTransactions || []);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const getStatusBadge = (value) => {
      if (typeof value === "number") {
        if (value >= 20) return "bg-green-100 text-green-800";
        if (value >= 10) return "bg-yellow-100 text-yellow-800";
        return "bg-red-100 text-red-800";
      }
      const badges = {
        "Completed": "bg-green-100 text-green-800",
        "Pending": "bg-yellow-100 text-yellow-800",
        "Processing": "bg-red-100 text-red-800"
      };
      return badges[value] || "bg-gray-100 text-gray-800";
    };
    onMounted(() => {
      console.log("AdminKeuangan Dashboard props:", props);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Dashboard Finance" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6" data-v-f828edc2${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-f828edc2${_scopeId}><div class="flex justify-between items-center mb-6" data-v-f828edc2${_scopeId}><div data-v-f828edc2${_scopeId}><h1 class="text-2xl font-bold text-gray-900" data-v-f828edc2${_scopeId}>Dashboard Finance</h1><p class="mt-1 text-sm text-gray-600" data-v-f828edc2${_scopeId}>Kelola operasi keuangan, penagihan, dan pembayaran secara efisien</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" data-v-f828edc2${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg" data-v-f828edc2${_scopeId}><div class="p-5" data-v-f828edc2${_scopeId}><div class="flex items-center" data-v-f828edc2${_scopeId}><div class="flex-shrink-0" data-v-f828edc2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-f828edc2${_scopeId}><dl data-v-f828edc2${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-f828edc2${_scopeId}>Gross Revenue</dt><dd class="text-lg font-medium text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(formatCurrency(((_a = __props.stats) == null ? void 0 : _a.grossRevenue) || 0))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-f828edc2${_scopeId}><div class="p-5" data-v-f828edc2${_scopeId}><div class="flex items-center" data-v-f828edc2${_scopeId}><div class="flex-shrink-0" data-v-f828edc2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(TrendingDown), { class: "h-6 w-6 text-red-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-f828edc2${_scopeId}><dl data-v-f828edc2${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-f828edc2${_scopeId}>Operational Costs</dt><dd class="text-lg font-medium text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(formatCurrency(((_b = __props.stats) == null ? void 0 : _b.operationalCosts) || 0))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-f828edc2${_scopeId}><div class="p-5" data-v-f828edc2${_scopeId}><div class="flex items-center" data-v-f828edc2${_scopeId}><div class="flex-shrink-0" data-v-f828edc2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(TrendingUp), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-f828edc2${_scopeId}><dl data-v-f828edc2${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-f828edc2${_scopeId}>Net Profit</dt><dd class="${ssrRenderClass(((_c = __props.stats) == null ? void 0 : _c.netProfit) >= 0 ? "text-lg font-medium text-green-600" : "text-lg font-medium text-red-600")}" data-v-f828edc2${_scopeId}>${ssrInterpolate(formatCurrency(((_d = __props.stats) == null ? void 0 : _d.netProfit) || 0))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-f828edc2${_scopeId}><div class="p-5" data-v-f828edc2${_scopeId}><div class="flex items-center" data-v-f828edc2${_scopeId}><div class="flex-shrink-0" data-v-f828edc2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calculator), { class: "h-6 w-6 text-purple-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-f828edc2${_scopeId}><dl data-v-f828edc2${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-f828edc2${_scopeId}>Profit Margin</dt><dd class="text-lg font-medium text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(((_e = __props.stats) == null ? void 0 : _e.profitMargin) || 0)}%</dd></dl></div></div></div></div></div>`);
            if (__props.monthlyProfits && __props.monthlyProfits.length > 0) {
              _push2(`<div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-f828edc2${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-f828edc2${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-f828edc2${_scopeId}>Tren Profit 6 Bulan Terakhir</h3><div class="overflow-x-auto" data-v-f828edc2${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-f828edc2${_scopeId}><thead class="bg-gray-50" data-v-f828edc2${_scopeId}><tr data-v-f828edc2${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f828edc2${_scopeId}>Periode</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f828edc2${_scopeId}>Gross Revenue</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f828edc2${_scopeId}>Operational Costs</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f828edc2${_scopeId}>Net Profit</th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f828edc2${_scopeId}>Profit Margin</th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-f828edc2${_scopeId}><!--[-->`);
              ssrRenderList(__props.monthlyProfits, (month) => {
                _push2(`<tr class="hover:bg-gray-50" data-v-f828edc2${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(month.month)}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-green-600" data-v-f828edc2${_scopeId}>${ssrInterpolate(formatCurrency(month.gross_revenue))}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-red-600" data-v-f828edc2${_scopeId}>${ssrInterpolate(formatCurrency(month.operational_costs))}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(formatCurrency(month.net_profit))}</td><td class="px-6 py-4 whitespace-nowrap text-right" data-v-f828edc2${_scopeId}><span class="${ssrRenderClass([getStatusBadge(month.profit_margin), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-f828edc2${_scopeId}>${ssrInterpolate(month.profit_margin.toFixed(1))}% </span></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" data-v-f828edc2${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg" data-v-f828edc2${_scopeId}><div class="p-5" data-v-f828edc2${_scopeId}><div class="flex items-center" data-v-f828edc2${_scopeId}><div class="flex-shrink-0" data-v-f828edc2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Receipt), { class: "h-6 w-6 text-gray-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-f828edc2${_scopeId}><dl data-v-f828edc2${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-f828edc2${_scopeId}>Total Revenue</dt><dd class="text-lg font-medium text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(formatCurrency(((_f = __props.stats) == null ? void 0 : _f.totalRevenue) || 0))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-f828edc2${_scopeId}><div class="p-5" data-v-f828edc2${_scopeId}><div class="flex items-center" data-v-f828edc2${_scopeId}><div class="flex-shrink-0" data-v-f828edc2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertTriangle), { class: "h-6 w-6 text-yellow-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-f828edc2${_scopeId}><dl data-v-f828edc2${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-f828edc2${_scopeId}>Outstanding Bills</dt><dd class="text-lg font-medium text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(formatCurrency(((_g = __props.stats) == null ? void 0 : _g.pendingPayments) || 0))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-f828edc2${_scopeId}><div class="p-5" data-v-f828edc2${_scopeId}><div class="flex items-center" data-v-f828edc2${_scopeId}><div class="flex-shrink-0" data-v-f828edc2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-f828edc2${_scopeId}><dl data-v-f828edc2${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-f828edc2${_scopeId}>Paid This Month</dt><dd class="text-lg font-medium text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(formatCurrency(((_h = __props.stats) == null ? void 0 : _h.paidThisMonth) || 0))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg" data-v-f828edc2${_scopeId}><div class="p-5" data-v-f828edc2${_scopeId}><div class="flex items-center" data-v-f828edc2${_scopeId}><div class="flex-shrink-0" data-v-f828edc2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Clock), { class: "h-6 w-6 text-red-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1" data-v-f828edc2${_scopeId}><dl data-v-f828edc2${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate" data-v-f828edc2${_scopeId}>Overdue Invoices</dt><dd class="text-lg font-medium text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(((_i = __props.stats) == null ? void 0 : _i.overdueInvoices) || 0)}</dd></dl></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-f828edc2${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-f828edc2${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-f828edc2${_scopeId}>Recent Financial Transactions</h3><div class="overflow-x-auto" data-v-f828edc2${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-f828edc2${_scopeId}><thead class="bg-gray-50" data-v-f828edc2${_scopeId}><tr data-v-f828edc2${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f828edc2${_scopeId}>Transaction ID</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f828edc2${_scopeId}>Customer</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f828edc2${_scopeId}>Amount</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f828edc2${_scopeId}>Type</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f828edc2${_scopeId}>Status</th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f828edc2${_scopeId}>Date</th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-f828edc2${_scopeId}><!--[-->`);
            ssrRenderList(recentTransactions.value, (transaction) => {
              _push2(`<tr class="hover:bg-gray-50" data-v-f828edc2${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(transaction.id)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(transaction.customer)}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(formatCurrency(transaction.amount))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-f828edc2${_scopeId}>${ssrInterpolate(transaction.type)}</td><td class="px-6 py-4 whitespace-nowrap" data-v-f828edc2${_scopeId}><span class="${ssrRenderClass([getStatusBadge(transaction.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-f828edc2${_scopeId}>${ssrInterpolate(transaction.status)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500" data-v-f828edc2${_scopeId}>${ssrInterpolate(transaction.date)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
            if (recentTransactions.value.length === 0) {
              _push2(`<div class="text-center py-12" data-v-f828edc2${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900" data-v-f828edc2${_scopeId}>Belum ada transaksi</h3><p class="mt-1 text-sm text-gray-500" data-v-f828edc2${_scopeId}>Belum ada transaksi keuangan terbaru</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md" data-v-f828edc2${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-f828edc2${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-f828edc2${_scopeId}>Quick Actions</h3><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-v-f828edc2${_scopeId}><a href="/admin-keuangan/invoices/create" class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-f828edc2${_scopeId}><div class="flex-shrink-0" data-v-f828edc2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Plus), { class: "h-6 w-6 text-sage-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1 min-w-0" data-v-f828edc2${_scopeId}><span class="absolute inset-0" aria-hidden="true" data-v-f828edc2${_scopeId}></span><p class="text-sm font-medium text-gray-900" data-v-f828edc2${_scopeId}>New Invoice</p><p class="text-sm text-gray-500 truncate" data-v-f828edc2${_scopeId}>Create billing invoice</p></div></a><a href="/admin-keuangan/invoices/payment-history" class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-f828edc2${_scopeId}><div class="flex-shrink-0" data-v-f828edc2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CreditCard), { class: "h-6 w-6 text-blue-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1 min-w-0" data-v-f828edc2${_scopeId}><span class="absolute inset-0" aria-hidden="true" data-v-f828edc2${_scopeId}></span><p class="text-sm font-medium text-gray-900" data-v-f828edc2${_scopeId}>Payment Monitoring</p><p class="text-sm text-gray-500 truncate" data-v-f828edc2${_scopeId}>Monitor payment status</p></div></a><div class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 cursor-pointer" data-v-f828edc2${_scopeId}><div class="flex-shrink-0" data-v-f828edc2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(BarChart3), { class: "h-6 w-6 text-purple-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1 min-w-0" data-v-f828edc2${_scopeId}><p class="text-sm font-medium text-gray-900" data-v-f828edc2${_scopeId}>Financial Report</p><p class="text-sm text-gray-500 truncate" data-v-f828edc2${_scopeId}>Generate reports</p></div></div><a href="/admin-keuangan/invoices?status=overdue" class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-f828edc2${_scopeId}><div class="flex-shrink-0" data-v-f828edc2${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AlertCircle), { class: "h-6 w-6 text-orange-600" }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1 min-w-0" data-v-f828edc2${_scopeId}><span class="absolute inset-0" aria-hidden="true" data-v-f828edc2${_scopeId}></span><p class="text-sm font-medium text-gray-900" data-v-f828edc2${_scopeId}>Pending Bills</p><p class="text-sm text-gray-500 truncate" data-v-f828edc2${_scopeId}>Review overdue</p></div></a></div></div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Dashboard Finance" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Dashboard Finance"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Kelola operasi keuangan, penagihan, dan pembayaran secara efisien")
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
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Gross Revenue"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(((_j = __props.stats) == null ? void 0 : _j.grossRevenue) || 0)), 1)
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
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Operational Costs"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(((_k = __props.stats) == null ? void 0 : _k.operationalCosts) || 0)), 1)
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
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Net Profit"),
                              createVNode("dd", {
                                class: ((_l = __props.stats) == null ? void 0 : _l.netProfit) >= 0 ? "text-lg font-medium text-green-600" : "text-lg font-medium text-red-600"
                              }, toDisplayString(formatCurrency(((_m = __props.stats) == null ? void 0 : _m.netProfit) || 0)), 3)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Calculator), { class: "h-6 w-6 text-purple-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Profit Margin"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(((_n = __props.stats) == null ? void 0 : _n.profitMargin) || 0) + "%", 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  __props.monthlyProfits && __props.monthlyProfits.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-white shadow overflow-hidden sm:rounded-md mb-6"
                  }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Tren Profit 6 Bulan Terakhir"),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Periode"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Gross Revenue"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Operational Costs"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Net Profit"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Profit Margin")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.monthlyProfits, (month) => {
                              return openBlock(), createBlock("tr", {
                                key: month.month,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, toDisplayString(month.month), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-green-600" }, toDisplayString(formatCurrency(month.gross_revenue)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-red-600" }, toDisplayString(formatCurrency(month.operational_costs)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-right text-gray-900" }, toDisplayString(formatCurrency(month.net_profit)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right" }, [
                                  createVNode("span", {
                                    class: [getStatusBadge(month.profit_margin), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                  }, toDisplayString(month.profit_margin.toFixed(1)) + "% ", 3)
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ])
                    ])
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Receipt), { class: "h-6 w-6 text-gray-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Revenue"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(((_o = __props.stats) == null ? void 0 : _o.totalRevenue) || 0)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(AlertTriangle), { class: "h-6 w-6 text-yellow-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Outstanding Bills"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(((_p = __props.stats) == null ? void 0 : _p.pendingPayments) || 0)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(CheckCircle), { class: "h-6 w-6 text-green-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Paid This Month"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(((_q = __props.stats) == null ? void 0 : _q.paidThisMonth) || 0)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Clock), { class: "h-6 w-6 text-red-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Overdue Invoices"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(((_r = __props.stats) == null ? void 0 : _r.overdueInvoices) || 0), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Recent Financial Transactions"),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Transaction ID"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Customer"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Amount"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Type"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Status"),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, "Date")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(recentTransactions.value, (transaction) => {
                              return openBlock(), createBlock("tr", {
                                key: transaction.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, toDisplayString(transaction.id), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(transaction.customer), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(transaction.amount)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(transaction.type), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: [getStatusBadge(transaction.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                  }, toDisplayString(transaction.status), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(transaction.date), 1)
                              ]);
                            }), 128))
                          ])
                        ]),
                        recentTransactions.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center py-12"
                        }, [
                          createVNode(unref(FileText), { class: "mx-auto h-12 w-12 text-gray-400" }),
                          createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "Belum ada transaksi"),
                          createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Belum ada transaksi keuangan terbaru")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Quick Actions"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                        createVNode("a", {
                          href: "/admin-keuangan/invoices/create",
                          class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Plus), { class: "h-6 w-6 text-sage-600" })
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("span", {
                              class: "absolute inset-0",
                              "aria-hidden": "true"
                            }),
                            createVNode("p", { class: "text-sm font-medium text-gray-900" }, "New Invoice"),
                            createVNode("p", { class: "text-sm text-gray-500 truncate" }, "Create billing invoice")
                          ])
                        ]),
                        createVNode("a", {
                          href: "/admin-keuangan/invoices/payment-history",
                          class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(CreditCard), { class: "h-6 w-6 text-blue-600" })
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("span", {
                              class: "absolute inset-0",
                              "aria-hidden": "true"
                            }),
                            createVNode("p", { class: "text-sm font-medium text-gray-900" }, "Payment Monitoring"),
                            createVNode("p", { class: "text-sm text-gray-500 truncate" }, "Monitor payment status")
                          ])
                        ]),
                        createVNode("div", { class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500 cursor-pointer" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(BarChart3), { class: "h-6 w-6 text-purple-600" })
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("p", { class: "text-sm font-medium text-gray-900" }, "Financial Report"),
                            createVNode("p", { class: "text-sm text-gray-500 truncate" }, "Generate reports")
                          ])
                        ]),
                        createVNode("a", {
                          href: "/admin-keuangan/invoices?status=overdue",
                          class: "relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(AlertCircle), { class: "h-6 w-6 text-orange-600" })
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0" }, [
                            createVNode("span", {
                              class: "absolute inset-0",
                              "aria-hidden": "true"
                            }),
                            createVNode("p", { class: "text-sm font-medium text-gray-900" }, "Pending Bills"),
                            createVNode("p", { class: "text-sm text-gray-500 truncate" }, "Review overdue")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f828edc2"]]);
export {
  Dashboard as default
};
