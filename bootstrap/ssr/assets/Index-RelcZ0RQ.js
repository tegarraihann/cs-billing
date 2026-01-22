import { reactive, ref, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, toDisplayString, withDirectives, vModelText, vModelSelect, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { Download, Plus, DollarSign, Calendar, Clock, CheckCircle, Eye, Edit, Trash2 } from "lucide-vue-next";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-d08FDE25.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-BHWh3obl.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    expenses: {
      type: Object,
      default: () => ({
        data: [],
        links: [],
        from: 0,
        to: 0,
        total: 0
      })
    },
    stats: {
      type: Object,
      default: () => ({
        current_month_total: 0,
        current_year_total: 0,
        draft_count: 0,
        approved_count: 0
      })
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const formFilters = reactive({
      period: props.filters.period || "",
      category: props.filters.category || "",
      status: props.filters.status || "",
      expense_date: props.filters.expense_date || ""
    });
    const showDeleteModal = ref(false);
    const selectedExpense = ref(null);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const formatPeriod = (month, year) => {
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      return `${monthNames[month - 1]} ${year}`;
    };
    const getStatusLabel = (status) => {
      const labels = {
        draft: "Draft",
        approved: "Approved"
      };
      return labels[status] || status;
    };
    const getStatusClass = (status) => {
      const classes = {
        draft: "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const applyFilters = () => {
      router.get(route("admin-keuangan.general-expenses.index"), formFilters, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const clearFilters = () => {
      Object.keys(formFilters).forEach((key) => {
        formFilters[key] = "";
      });
      router.get(route("admin-keuangan.general-expenses.index"));
    };
    const confirmDelete = (expense) => {
      selectedExpense.value = expense;
      showDeleteModal.value = true;
    };
    const deleteExpense = () => {
      if (selectedExpense.value) {
        router.delete(route("admin-keuangan.general-expenses.destroy", selectedExpense.value.id), {
          onSuccess: () => {
            showDeleteModal.value = false;
            selectedExpense.value = null;
          }
        });
      }
    };
    const approveExpense = (expense) => {
      router.post(route("admin-keuangan.general-expenses.approve", expense.id), {}, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const exportData = () => {
      window.open(route("admin-keuangan.general-expenses.export", formFilters), "_blank");
    };
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.general-expenses.index": "/admin-keuangan/general-expenses",
        "admin-keuangan.general-expenses.create": "/admin-keuangan/general-expenses/create",
        "admin-keuangan.general-expenses.show": (id) => `/admin-keuangan/general-expenses/${id}`,
        "admin-keuangan.general-expenses.edit": (id) => `/admin-keuangan/general-expenses/${id}/edit`,
        "admin-keuangan.general-expenses.destroy": (id) => `/admin-keuangan/general-expenses/${id}`,
        "admin-keuangan.general-expenses.approve": (id) => `/admin-keuangan/general-expenses/${id}/approve`,
        "admin-keuangan.general-expenses.export": "/admin-keuangan/general-expenses/export"
      };
      return typeof routes[name] === "function" ? routes[name](params) : routes[name] || "#";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "General Expenses" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>General Expenses</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Manage non-SO, non-petty cash expenses</p></div><div class="flex items-center space-x-3"${_scopeId}><button class="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Download), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Export </button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.general-expenses.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Add Expense `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Add Expense ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), { class: "h-6 w-6 text-red-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total This Month</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(((_a = __props.stats) == null ? void 0 : _a.current_month_total) || 0))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total This Year</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(((_b = __props.stats) == null ? void 0 : _b.current_year_total) || 0))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Clock), { class: "h-6 w-6 text-yellow-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Draft</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_c = __props.stats) == null ? void 0 : _c.draft_count) || 0)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Approved</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(((_d = __props.stats) == null ? void 0 : _d.approved_count) || 0)}</dd></dl></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}>Expense Filters</h3><div class="grid grid-cols-1 md:grid-cols-4 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Period (Month-Year)</label><input${ssrRenderAttr("value", formFilters.period)} type="month" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Category</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(formFilters.category) ? ssrLooseContain(formFilters.category, "") : ssrLooseEqual(formFilters.category, "")) ? " selected" : ""}${_scopeId}>All Categories</option><option value="Salary Staff"${ssrIncludeBooleanAttr(Array.isArray(formFilters.category) ? ssrLooseContain(formFilters.category, "Salary Staff") : ssrLooseEqual(formFilters.category, "Salary Staff")) ? " selected" : ""}${_scopeId}>Staff Salary</option><option value="Bank Admin"${ssrIncludeBooleanAttr(Array.isArray(formFilters.category) ? ssrLooseContain(formFilters.category, "Bank Admin") : ssrLooseEqual(formFilters.category, "Bank Admin")) ? " selected" : ""}${_scopeId}>Bank Admin Fee</option><option value="Reimbursements"${ssrIncludeBooleanAttr(Array.isArray(formFilters.category) ? ssrLooseContain(formFilters.category, "Reimbursements") : ssrLooseEqual(formFilters.category, "Reimbursements")) ? " selected" : ""}${_scopeId}>Reimbursements</option><option value="Office Expenses"${ssrIncludeBooleanAttr(Array.isArray(formFilters.category) ? ssrLooseContain(formFilters.category, "Office Expenses") : ssrLooseEqual(formFilters.category, "Office Expenses")) ? " selected" : ""}${_scopeId}>Office Expenses</option><option value="Other"${ssrIncludeBooleanAttr(Array.isArray(formFilters.category) ? ssrLooseContain(formFilters.category, "Other") : ssrLooseEqual(formFilters.category, "Other")) ? " selected" : ""}${_scopeId}>Other</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Status</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(formFilters.status) ? ssrLooseContain(formFilters.status, "") : ssrLooseEqual(formFilters.status, "")) ? " selected" : ""}${_scopeId}>All Statuses</option><option value="draft"${ssrIncludeBooleanAttr(Array.isArray(formFilters.status) ? ssrLooseContain(formFilters.status, "draft") : ssrLooseEqual(formFilters.status, "draft")) ? " selected" : ""}${_scopeId}>Draft</option><option value="approved"${ssrIncludeBooleanAttr(Array.isArray(formFilters.status) ? ssrLooseContain(formFilters.status, "approved") : ssrLooseEqual(formFilters.status, "approved")) ? " selected" : ""}${_scopeId}>Approved</option></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Date</label><input${ssrRenderAttr("value", formFilters.expense_date)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div></div><div class="flex justify-end space-x-3 mt-4"${_scopeId}><button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"${_scopeId}> Clear </button><button class="px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"${_scopeId}> Apply Filters </button></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Expense List</h3></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Date</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Category</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Period</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Total</th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Items</th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Status</th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(((_e = __props.expenses) == null ? void 0 : _e.data) || [], (expense) => {
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(expense.expense_date))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}><div class="font-medium"${_scopeId}>${ssrInterpolate(expense.category)}</div>`);
              if (expense.notes) {
                _push2(`<div class="text-xs text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(expense.notes.substring(0, 50))}${ssrInterpolate(expense.notes.length > 50 ? "..." : "")}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatPeriod(expense.period_month, expense.period_year))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(expense.total_amount))}</td><td class="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500"${_scopeId}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"${_scopeId}>${ssrInterpolate(expense.items_count)} item${ssrInterpolate(expense.items_count > 1 ? "s" : "")}</span></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm"${_scopeId}><span class="${ssrRenderClass([getStatusClass(expense.status), "px-2 py-1 rounded-full text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(getStatusLabel(expense.status))}</span></td><td class="px-6 py-4 whitespace-nowrap text-center text-sm"${_scopeId}><div class="flex items-center justify-center space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.general-expenses.show", expense.id),
                class: "text-gray-600 hover:text-gray-800 transition-colors",
                title: "View Details"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Eye), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              if (expense.status === "draft") {
                _push2(ssrRenderComponent(unref(Link), {
                  href: unref(route)("admin-keuangan.general-expenses.edit", expense.id),
                  class: "text-blue-600 hover:text-blue-800 transition-colors",
                  title: "Edit"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(unref(Edit), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(unref(Edit), { class: "w-4 h-4" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (expense.status === "draft" && expense.can_approve) {
                _push2(`<button class="text-green-600 hover:text-green-800 transition-colors" title="Approve"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              if (expense.status === "draft") {
                _push2(`<button class="text-red-600 hover:text-red-800 transition-colors" title="Delete"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!((_f = __props.expenses) == null ? void 0 : _f.data) || __props.expenses.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="7" class="px-6 py-12 text-center text-sm text-gray-500"${_scopeId}><div class="flex flex-col items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(DollarSign), { class: "w-12 h-12 text-gray-300 mb-4" }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-lg font-medium text-gray-900 mb-2"${_scopeId}>No expenses yet</h3><p class="text-sm text-gray-500 mb-4"${_scopeId}>Get started by adding your first expense</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.general-expenses.create"),
                class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` Add First Expense `);
                  } else {
                    return [
                      createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" Add First Expense ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (((_g = __props.expenses) == null ? void 0 : _g.links) && __props.expenses.links.length > 3) {
              _push2(`<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"${_scopeId}><div class="flex-1 flex justify-between sm:hidden"${_scopeId}>`);
              if (__props.expenses.prev_page_url) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: __props.expenses.prev_page_url,
                  class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Previous `);
                    } else {
                      return [
                        createTextVNode(" Previous ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (__props.expenses.next_page_url) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: __props.expenses.next_page_url,
                  class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` Next `);
                    } else {
                      return [
                        createTextVNode(" Next ")
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Showing <span class="font-medium"${_scopeId}>${ssrInterpolate(((_h = __props.expenses) == null ? void 0 : _h.from) ?? 0)}</span> to <span class="font-medium"${_scopeId}>${ssrInterpolate(((_i = __props.expenses) == null ? void 0 : _i.to) ?? 0)}</span> of <span class="font-medium"${_scopeId}>${ssrInterpolate(((_j = __props.expenses) == null ? void 0 : _j.total) ?? 0)}</span> expenses </p></div><div${_scopeId}><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"${_scopeId}><!--[-->`);
              ssrRenderList(((_k = __props.expenses) == null ? void 0 : _k.links) || [], (link) => {
                _push2(`<!--[-->`);
                if (link.url) {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url,
                    class: [
                      "relative inline-flex items-center px-2 py-2 text-sm font-medium",
                      link.active ? "z-10 bg-sage-50 border-sage-500 text-sage-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                      link.label.includes("Previous") ? "rounded-l-md" : "",
                      link.label.includes("Next") ? "rounded-r-md" : "",
                      !link.label.includes("Previous") && !link.label.includes("Next") ? "border-t border-b" : "border"
                    ]
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<span class="${ssrRenderClass([
                    "relative inline-flex items-center px-2 py-2 text-sm font-medium",
                    "bg-white border-gray-300 text-gray-300 cursor-default",
                    link.label.includes("Previous") ? "rounded-l-md" : "",
                    link.label.includes("Next") ? "rounded-r-md" : "",
                    !link.label.includes("Previous") && !link.label.includes("Next") ? "border-t border-b" : "border"
                  ])}"${_scopeId}>${link.label ?? ""}</span>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></nav></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"${_scopeId}><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"${_scopeId}><div class="mt-3 text-center"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Confirm Delete</h3><div class="mt-2 px-7 py-3"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}> Are you sure you want to delete the expense in category &quot;${ssrInterpolate((_l = selectedExpense.value) == null ? void 0 : _l.category)}&quot;? This action cannot be undone. </p></div><div class="flex justify-center space-x-3 mt-4"${_scopeId}><button class="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"${_scopeId}> Cancel </button><button class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"${_scopeId}> Delete </button></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "General Expenses" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "General Expenses"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Manage non-SO, non-petty cash expenses")
                    ]),
                    createVNode("div", { class: "flex items-center space-x-3" }, [
                      createVNode("button", {
                        onClick: exportData,
                        class: "inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      }, [
                        createVNode(unref(Download), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Export ")
                      ]),
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.general-expenses.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Add Expense ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(DollarSign), { class: "h-6 w-6 text-red-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total This Month"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(((_m = __props.stats) == null ? void 0 : _m.current_month_total) || 0)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Calendar), { class: "h-6 w-6 text-blue-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total This Year"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(((_n = __props.stats) == null ? void 0 : _n.current_year_total) || 0)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Clock), { class: "h-6 w-6 text-yellow-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Draft"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(((_o = __props.stats) == null ? void 0 : _o.draft_count) || 0), 1)
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
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Approved"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(((_p = __props.stats) == null ? void 0 : _p.approved_count) || 0), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Expense Filters"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Period (Month-Year)"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => formFilters.period = $event,
                            type: "month",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, formFilters.period]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Category"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => formFilters.category = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "All Categories"),
                            createVNode("option", { value: "Salary Staff" }, "Staff Salary"),
                            createVNode("option", { value: "Bank Admin" }, "Bank Admin Fee"),
                            createVNode("option", { value: "Reimbursements" }, "Reimbursements"),
                            createVNode("option", { value: "Office Expenses" }, "Office Expenses"),
                            createVNode("option", { value: "Other" }, "Other")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, formFilters.category]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Status"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => formFilters.status = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "All Statuses"),
                            createVNode("option", { value: "draft" }, "Draft"),
                            createVNode("option", { value: "approved" }, "Approved")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, formFilters.status]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Date"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => formFilters.expense_date = $event,
                            type: "date",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, formFilters.expense_date]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-3 mt-4" }, [
                        createVNode("button", {
                          onClick: clearFilters,
                          class: "px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        }, " Clear "),
                        createVNode("button", {
                          onClick: applyFilters,
                          class: "px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                        }, " Apply Filters ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Expense List")
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Date"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Category"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Period"),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Total"),
                            createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Items"),
                            createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                            createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Actions")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(((_q = __props.expenses) == null ? void 0 : _q.data) || [], (expense) => {
                            return openBlock(), createBlock("tr", {
                              key: expense.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatDate(expense.expense_date)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, [
                                createVNode("div", { class: "font-medium" }, toDisplayString(expense.category), 1),
                                expense.notes ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-xs text-gray-500 mt-1"
                                }, toDisplayString(expense.notes.substring(0, 50)) + toDisplayString(expense.notes.length > 50 ? "..." : ""), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatPeriod(expense.period_month, expense.period_year)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900" }, toDisplayString(formatCurrency(expense.total_amount)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500" }, [
                                createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" }, toDisplayString(expense.items_count) + " item" + toDisplayString(expense.items_count > 1 ? "s" : ""), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm" }, [
                                createVNode("span", {
                                  class: [getStatusClass(expense.status), "px-2 py-1 rounded-full text-xs font-medium"]
                                }, toDisplayString(getStatusLabel(expense.status)), 3)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm" }, [
                                createVNode("div", { class: "flex items-center justify-center space-x-2" }, [
                                  createVNode(unref(Link), {
                                    href: unref(route)("admin-keuangan.general-expenses.show", expense.id),
                                    class: "text-gray-600 hover:text-gray-800 transition-colors",
                                    title: "View Details"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Eye), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  expense.status === "draft" ? (openBlock(), createBlock(unref(Link), {
                                    key: 0,
                                    href: unref(route)("admin-keuangan.general-expenses.edit", expense.id),
                                    class: "text-blue-600 hover:text-blue-800 transition-colors",
                                    title: "Edit"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Edit), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"])) : createCommentVNode("", true),
                                  expense.status === "draft" && expense.can_approve ? (openBlock(), createBlock("button", {
                                    key: 1,
                                    onClick: ($event) => approveExpense(expense),
                                    class: "text-green-600 hover:text-green-800 transition-colors",
                                    title: "Approve"
                                  }, [
                                    createVNode(unref(CheckCircle), { class: "w-4 h-4" })
                                  ], 8, ["onClick"])) : createCommentVNode("", true),
                                  expense.status === "draft" ? (openBlock(), createBlock("button", {
                                    key: 2,
                                    onClick: ($event) => confirmDelete(expense),
                                    class: "text-red-600 hover:text-red-800 transition-colors",
                                    title: "Delete"
                                  }, [
                                    createVNode(unref(Trash2), { class: "w-4 h-4" })
                                  ], 8, ["onClick"])) : createCommentVNode("", true)
                                ])
                              ])
                            ]);
                          }), 128)),
                          !((_r = __props.expenses) == null ? void 0 : _r.data) || __props.expenses.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "7",
                              class: "px-6 py-12 text-center text-sm text-gray-500"
                            }, [
                              createVNode("div", { class: "flex flex-col items-center" }, [
                                createVNode(unref(DollarSign), { class: "w-12 h-12 text-gray-300 mb-4" }),
                                createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-2" }, "No expenses yet"),
                                createVNode("p", { class: "text-sm text-gray-500 mb-4" }, "Get started by adding your first expense"),
                                createVNode(unref(Link), {
                                  href: unref(route)("admin-keuangan.general-expenses.create"),
                                  class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                    createTextVNode(" Add First Expense ")
                                  ]),
                                  _: 1
                                }, 8, ["href"])
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    ((_s = __props.expenses) == null ? void 0 : _s.links) && __props.expenses.links.length > 3 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                    }, [
                      createVNode("div", { class: "flex-1 flex justify-between sm:hidden" }, [
                        __props.expenses.prev_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: __props.expenses.prev_page_url,
                          class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Previous ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        __props.expenses.next_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 1,
                          href: __props.expenses.next_page_url,
                          class: "ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Next ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "hidden sm:flex-1 sm:flex sm:items-center sm:justify-between" }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm text-gray-700" }, [
                            createTextVNode(" Showing "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(((_t = __props.expenses) == null ? void 0 : _t.from) ?? 0), 1),
                            createTextVNode(" to "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(((_u = __props.expenses) == null ? void 0 : _u.to) ?? 0), 1),
                            createTextVNode(" of "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(((_v = __props.expenses) == null ? void 0 : _v.total) ?? 0), 1),
                            createTextVNode(" expenses ")
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("nav", {
                            class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
                            "aria-label": "Pagination"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(((_w = __props.expenses) == null ? void 0 : _w.links) || [], (link) => {
                              return openBlock(), createBlock(Fragment, {
                                key: link.label
                              }, [
                                link.url ? (openBlock(), createBlock(unref(Link), {
                                  key: 0,
                                  href: link.url,
                                  class: [
                                    "relative inline-flex items-center px-2 py-2 text-sm font-medium",
                                    link.active ? "z-10 bg-sage-50 border-sage-500 text-sage-600" : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50",
                                    link.label.includes("Previous") ? "rounded-l-md" : "",
                                    link.label.includes("Next") ? "rounded-r-md" : "",
                                    !link.label.includes("Previous") && !link.label.includes("Next") ? "border-t border-b" : "border"
                                  ],
                                  innerHTML: link.label
                                }, null, 8, ["href", "class", "innerHTML"])) : (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: [
                                    "relative inline-flex items-center px-2 py-2 text-sm font-medium",
                                    "bg-white border-gray-300 text-gray-300 cursor-default",
                                    link.label.includes("Previous") ? "rounded-l-md" : "",
                                    link.label.includes("Next") ? "rounded-r-md" : "",
                                    !link.label.includes("Previous") && !link.label.includes("Next") ? "border-t border-b" : "border"
                                  ],
                                  innerHTML: link.label
                                }, null, 10, ["innerHTML"]))
                              ], 64);
                            }), 128))
                          ])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              showDeleteModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
              }, [
                createVNode("div", { class: "relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" }, [
                  createVNode("div", { class: "mt-3 text-center" }, [
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Confirm Delete"),
                    createVNode("div", { class: "mt-2 px-7 py-3" }, [
                      createVNode("p", { class: "text-sm text-gray-500" }, ' Are you sure you want to delete the expense in category "' + toDisplayString((_x = selectedExpense.value) == null ? void 0 : _x.category) + '"? This action cannot be undone. ', 1)
                    ]),
                    createVNode("div", { class: "flex justify-center space-x-3 mt-4" }, [
                      createVNode("button", {
                        onClick: ($event) => showDeleteModal.value = false,
                        class: "px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      }, " Cancel ", 8, ["onClick"]),
                      createVNode("button", {
                        onClick: deleteExpense,
                        class: "px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      }, " Delete ")
                    ])
                  ])
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/GeneralExpenses/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
