import { computed, ref, onMounted, withCtx, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-yyCbRIkG.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "@inertiajs/vue3";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-egdkIpsX.js";
const _sfc_main = {
  __name: "Dashboard",
  __ssrInlineRender: true,
  props: {
    user: Object,
    userRole: String,
    stats: Object
  },
  setup(__props) {
    const props = __props;
    const authUser = computed(() => props.user);
    const sampleTransactions = ref([
      {
        id: "#FIN-001",
        customer: "PT. Tech Solutions",
        amount: 25e5,
        type: "Payment",
        status: "Completed",
        date: "2025-07-28"
      },
      {
        id: "#FIN-002",
        customer: "CV. Mandiri Jaya",
        amount: 12e5,
        type: "Invoice",
        status: "Pending",
        date: "2025-07-27"
      },
      {
        id: "#FIN-003",
        customer: "UD. Berkah Usaha",
        amount: 8e5,
        type: "Payment",
        status: "Completed",
        date: "2025-07-27"
      },
      {
        id: "#FIN-004",
        customer: "PT. Digital Kreatif",
        amount: 32e5,
        type: "Refund",
        status: "Processing",
        date: "2025-07-26"
      }
    ]);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const getStatusClass = (status) => {
      const classes = {
        Completed: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Processing: "bg-red-100 text-red-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    onMounted(() => {
      console.log("AdminKeuangan Dashboard props:", props);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-f93352bb${_scopeId}><div class="bg-gradient-to-r from-sage-600 to-sage-700 rounded-xl shadow-lg p-6 mb-8 text-white" data-v-f93352bb${_scopeId}><h2 class="text-2xl font-bold mb-2" data-v-f93352bb${_scopeId}> Welcome back, ${ssrInterpolate((_a = authUser.value) == null ? void 0 : _a.name)}! </h2><p class="text-sage-100" data-v-f93352bb${_scopeId}> Manage financial operations, billing, and payments efficiently. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-v-f93352bb${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-f93352bb${_scopeId}><div class="flex items-center" data-v-f93352bb${_scopeId}><div class="p-3 rounded-lg bg-sage-100" data-v-f93352bb${_scopeId}><svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f93352bb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-f93352bb${_scopeId}></path></svg></div><div class="ml-4" data-v-f93352bb${_scopeId}><p class="text-sm font-medium text-gray-600" data-v-f93352bb${_scopeId}>Total Revenue</p><p class="text-2xl font-semibold text-gray-900" data-v-f93352bb${_scopeId}>${ssrInterpolate(formatCurrency(((_b = __props.stats) == null ? void 0 : _b.totalRevenue) || 0))}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-f93352bb${_scopeId}><div class="flex items-center" data-v-f93352bb${_scopeId}><div class="p-3 rounded-lg bg-yellow-100" data-v-f93352bb${_scopeId}><svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f93352bb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-f93352bb${_scopeId}></path></svg></div><div class="ml-4" data-v-f93352bb${_scopeId}><p class="text-sm font-medium text-gray-600" data-v-f93352bb${_scopeId}> Outstanding Bills </p><p class="text-2xl font-semibold text-gray-900" data-v-f93352bb${_scopeId}>${ssrInterpolate(formatCurrency(((_c = __props.stats) == null ? void 0 : _c.pendingPayments) || 0))}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-f93352bb${_scopeId}><div class="flex items-center" data-v-f93352bb${_scopeId}><div class="p-3 rounded-lg bg-blue-100" data-v-f93352bb${_scopeId}><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f93352bb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-f93352bb${_scopeId}></path></svg></div><div class="ml-4" data-v-f93352bb${_scopeId}><p class="text-sm font-medium text-gray-600" data-v-f93352bb${_scopeId}>Paid This Month</p><p class="text-2xl font-semibold text-gray-900" data-v-f93352bb${_scopeId}>${ssrInterpolate(formatCurrency(((_d = __props.stats) == null ? void 0 : _d.paidThisMonth) || 0))}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-f93352bb${_scopeId}><div class="flex items-center" data-v-f93352bb${_scopeId}><div class="p-3 rounded-lg bg-red-100" data-v-f93352bb${_scopeId}><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f93352bb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-f93352bb${_scopeId}></path></svg></div><div class="ml-4" data-v-f93352bb${_scopeId}><p class="text-sm font-medium text-gray-600" data-v-f93352bb${_scopeId}>Overdue Invoices</p><p class="text-2xl font-semibold text-gray-900" data-v-f93352bb${_scopeId}>${ssrInterpolate(((_e = __props.stats) == null ? void 0 : _e.overdueInvoices) || 0)}</p></div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-sage-200" data-v-f93352bb${_scopeId}><h3 class="text-xl font-bold text-sage-800 mb-4" data-v-f93352bb${_scopeId}> Recent Financial Transactions </h3><div class="overflow-x-auto" data-v-f93352bb${_scopeId}><table class="w-full" data-v-f93352bb${_scopeId}><thead data-v-f93352bb${_scopeId}><tr class="border-b border-sage-200" data-v-f93352bb${_scopeId}><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-f93352bb${_scopeId}> Transaction ID </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-f93352bb${_scopeId}> Customer </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-f93352bb${_scopeId}> Amount </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-f93352bb${_scopeId}> Type </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-f93352bb${_scopeId}> Status </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-f93352bb${_scopeId}> Date </th></tr></thead><tbody data-v-f93352bb${_scopeId}><!--[-->`);
            ssrRenderList(sampleTransactions.value, (transaction) => {
              _push2(`<tr class="border-b border-gray-100" data-v-f93352bb${_scopeId}><td class="py-3 px-4 text-sage-600 font-medium" data-v-f93352bb${_scopeId}>${ssrInterpolate(transaction.id)}</td><td class="py-3 px-4" data-v-f93352bb${_scopeId}>${ssrInterpolate(transaction.customer)}</td><td class="py-3 px-4 font-semibold" data-v-f93352bb${_scopeId}>${ssrInterpolate(formatCurrency(transaction.amount))}</td><td class="py-3 px-4" data-v-f93352bb${_scopeId}>${ssrInterpolate(transaction.type)}</td><td class="py-3 px-4" data-v-f93352bb${_scopeId}><span class="${ssrRenderClass([getStatusClass(transaction.status), "px-2 py-1 text-xs font-medium rounded-full"])}" data-v-f93352bb${_scopeId}>${ssrInterpolate(transaction.status)}</span></td><td class="py-3 px-4 text-gray-500" data-v-f93352bb${_scopeId}>${ssrInterpolate(transaction.date)}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-v-f93352bb${_scopeId}><a href="/admin-keuangan/invoices/create" class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer block" data-v-f93352bb${_scopeId}><div class="flex items-center space-x-4" data-v-f93352bb${_scopeId}><div class="p-3 bg-green-100 rounded-lg" data-v-f93352bb${_scopeId}><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f93352bb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-f93352bb${_scopeId}></path></svg></div><div data-v-f93352bb${_scopeId}><h4 class="font-semibold text-sage-800" data-v-f93352bb${_scopeId}>New Invoice</h4><p class="text-sm text-sage-600" data-v-f93352bb${_scopeId}>Create billing invoice</p></div></div></a><a href="/admin-keuangan/invoices/payment-history" class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer block" data-v-f93352bb${_scopeId}><div class="flex items-center space-x-4" data-v-f93352bb${_scopeId}><div class="p-3 bg-blue-100 rounded-lg" data-v-f93352bb${_scopeId}><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f93352bb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75" data-v-f93352bb${_scopeId}></path></svg></div><div data-v-f93352bb${_scopeId}><h4 class="font-semibold text-sage-800" data-v-f93352bb${_scopeId}>Payment Monitoring</h4><p class="text-sm text-sage-600" data-v-f93352bb${_scopeId}>Monitor payment status</p></div></div></a><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer" data-v-f93352bb${_scopeId}><div class="flex items-center space-x-4" data-v-f93352bb${_scopeId}><div class="p-3 bg-purple-100 rounded-lg" data-v-f93352bb${_scopeId}><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f93352bb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-f93352bb${_scopeId}></path></svg></div><div data-v-f93352bb${_scopeId}><h4 class="font-semibold text-sage-800" data-v-f93352bb${_scopeId}>Financial Report</h4><p class="text-sm text-sage-600" data-v-f93352bb${_scopeId}>Generate reports</p></div></div></div><a href="/admin-keuangan/invoices?status=overdue" class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer block" data-v-f93352bb${_scopeId}><div class="flex items-center space-x-4" data-v-f93352bb${_scopeId}><div class="p-3 bg-orange-100 rounded-lg" data-v-f93352bb${_scopeId}><svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f93352bb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-f93352bb${_scopeId}></path></svg></div><div data-v-f93352bb${_scopeId}><h4 class="font-semibold text-sage-800" data-v-f93352bb${_scopeId}>Pending Bills</h4><p class="text-sm text-sage-600" data-v-f93352bb${_scopeId}>Review overdue</p></div></div></a></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-gradient-to-r from-sage-600 to-sage-700 rounded-xl shadow-lg p-6 mb-8 text-white" }, [
                  createVNode("h2", { class: "text-2xl font-bold mb-2" }, " Welcome back, " + toDisplayString((_f = authUser.value) == null ? void 0 : _f.name) + "! ", 1),
                  createVNode("p", { class: "text-sage-100" }, " Manage financial operations, billing, and payments efficiently. ")
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "p-3 rounded-lg bg-sage-100" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-sage-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ]))
                      ]),
                      createVNode("div", { class: "ml-4" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Total Revenue"),
                        createVNode("p", { class: "text-2xl font-semibold text-gray-900" }, toDisplayString(formatCurrency(((_g = __props.stats) == null ? void 0 : _g.totalRevenue) || 0)), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "p-3 rounded-lg bg-yellow-100" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-yellow-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                          })
                        ]))
                      ]),
                      createVNode("div", { class: "ml-4" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, " Outstanding Bills "),
                        createVNode("p", { class: "text-2xl font-semibold text-gray-900" }, toDisplayString(formatCurrency(((_h = __props.stats) == null ? void 0 : _h.pendingPayments) || 0)), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "p-3 rounded-lg bg-blue-100" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-blue-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ]))
                      ]),
                      createVNode("div", { class: "ml-4" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Paid This Month"),
                        createVNode("p", { class: "text-2xl font-semibold text-gray-900" }, toDisplayString(formatCurrency(((_i = __props.stats) == null ? void 0 : _i.paidThisMonth) || 0)), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "p-3 rounded-lg bg-red-100" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-red-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ]))
                      ]),
                      createVNode("div", { class: "ml-4" }, [
                        createVNode("p", { class: "text-sm font-medium text-gray-600" }, "Overdue Invoices"),
                        createVNode("p", { class: "text-2xl font-semibold text-gray-900" }, toDisplayString(((_j = __props.stats) == null ? void 0 : _j.overdueInvoices) || 0), 1)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-8 border border-sage-200" }, [
                  createVNode("h3", { class: "text-xl font-bold text-sage-800 mb-4" }, " Recent Financial Transactions "),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", null, [
                        createVNode("tr", { class: "border-b border-sage-200" }, [
                          createVNode("th", { class: "text-left py-3 px-4 font-semibold text-sage-800" }, " Transaction ID "),
                          createVNode("th", { class: "text-left py-3 px-4 font-semibold text-sage-800" }, " Customer "),
                          createVNode("th", { class: "text-left py-3 px-4 font-semibold text-sage-800" }, " Amount "),
                          createVNode("th", { class: "text-left py-3 px-4 font-semibold text-sage-800" }, " Type "),
                          createVNode("th", { class: "text-left py-3 px-4 font-semibold text-sage-800" }, " Status "),
                          createVNode("th", { class: "text-left py-3 px-4 font-semibold text-sage-800" }, " Date ")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(sampleTransactions.value, (transaction) => {
                          return openBlock(), createBlock("tr", {
                            key: transaction.id,
                            class: "border-b border-gray-100"
                          }, [
                            createVNode("td", { class: "py-3 px-4 text-sage-600 font-medium" }, toDisplayString(transaction.id), 1),
                            createVNode("td", { class: "py-3 px-4" }, toDisplayString(transaction.customer), 1),
                            createVNode("td", { class: "py-3 px-4 font-semibold" }, toDisplayString(formatCurrency(transaction.amount)), 1),
                            createVNode("td", { class: "py-3 px-4" }, toDisplayString(transaction.type), 1),
                            createVNode("td", { class: "py-3 px-4" }, [
                              createVNode("span", {
                                class: ["px-2 py-1 text-xs font-medium rounded-full", getStatusClass(transaction.status)]
                              }, toDisplayString(transaction.status), 3)
                            ]),
                            createVNode("td", { class: "py-3 px-4 text-gray-500" }, toDisplayString(transaction.date), 1)
                          ]);
                        }), 128))
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" }, [
                  createVNode("a", {
                    href: "/admin-keuangan/invoices/create",
                    class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer block"
                  }, [
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      createVNode("div", { class: "p-3 bg-green-100 rounded-lg" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-green-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                          })
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "font-semibold text-sage-800" }, "New Invoice"),
                        createVNode("p", { class: "text-sm text-sage-600" }, "Create billing invoice")
                      ])
                    ])
                  ]),
                  createVNode("a", {
                    href: "/admin-keuangan/invoices/payment-history",
                    class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer block"
                  }, [
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      createVNode("div", { class: "p-3 bg-blue-100 rounded-lg" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-blue-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m-4-3.5c0-1.55 1.88-2.75 4-2.75s4 1.2 4 2.75"
                          })
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "font-semibold text-sage-800" }, "Payment Monitoring"),
                        createVNode("p", { class: "text-sm text-sage-600" }, "Monitor payment status")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer" }, [
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      createVNode("div", { class: "p-3 bg-purple-100 rounded-lg" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-purple-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          })
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "font-semibold text-sage-800" }, "Financial Report"),
                        createVNode("p", { class: "text-sm text-sage-600" }, "Generate reports")
                      ])
                    ])
                  ]),
                  createVNode("a", {
                    href: "/admin-keuangan/invoices?status=overdue",
                    class: "bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer block"
                  }, [
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      createVNode("div", { class: "p-3 bg-orange-100 rounded-lg" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-orange-600",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          })
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "font-semibold text-sage-800" }, "Pending Bills"),
                        createVNode("p", { class: "text-sm text-sage-600" }, "Review overdue")
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
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f93352bb"]]);
export {
  Dashboard as default
};
