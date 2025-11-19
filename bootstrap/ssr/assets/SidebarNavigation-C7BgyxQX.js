import { unref, useSSRContext } from "vue";
import { ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { usePage } from "@inertiajs/vue3";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "SidebarNavigation",
  __ssrInlineRender: true,
  props: {
    isMobileSidebarOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ["closeMobileSidebar"],
  setup(__props, { emit: __emit }) {
    usePage();
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.dashboard": "/admin-keuangan/dashboard",
        "admin-keuangan.customers.index": "/admin-keuangan/customers",
        "admin-keuangan.customers.create": "/admin-keuangan/customers/create",
        "admin-keuangan.vendors.index": "/admin-keuangan/vendors",
        "admin-keuangan.vendors.create": "/admin-keuangan/vendors/create",
        "admin-keuangan.sales-orders.index": "/admin-keuangan/sales-orders",
        "admin-keuangan.invoices.index": "/admin-keuangan/invoices",
        "admin-keuangan.account-receivables.index": "/admin-keuangan/account-receivables",
        "admin-keuangan.account-payables.index": "/admin-keuangan/account-payables",
        "admin-keuangan.profit-reports.index": "/admin-keuangan/profit-reports",
        "admin-keuangan.petty-cash.index": "/admin-keuangan/petty-cash",
        "admin-keuangan.general-expenses.index": "/admin-keuangan/general-expenses",
        "admin-keuangan.other-incomes.index": "/admin-keuangan/other-incomes",
        "admin-keuangan.profit-loss.index": "/admin-keuangan/profit-loss",
        "admin-keuangan.financial-position.index": "/admin-keuangan/financial-position",
        "admin-keuangan.bank-balance.index": "/admin-keuangan/bank-balance",
        "admin-keuangan.bank-balance.create": "/admin-keuangan/bank-balance/create",
        "admin-keuangan.employee-salary.index": "/admin-keuangan/employee-salary",
        "admin-keuangan.shipment-types.index": "/admin-keuangan/shipment-types",
        "admin-keuangan.shipment-types.create": "/admin-keuangan/shipment-types/create",
        "admin-keuangan.service-types.index": "/admin-keuangan/service-types",
        "admin-keuangan.service-types.create": "/admin-keuangan/service-types/create",
        "admin-keuangan.service-types.edit": "/admin-keuangan/service-types/:id/edit",
        "admin-keuangan.operational-cost-categories.index": "/admin-keuangan/operational-cost-categories",
        "admin-keuangan.operational-cost-categories.create": "/admin-keuangan/operational-cost-categories/create",
        "admin-keuangan.master-package-units.index": "/admin-keuangan/master-package-units",
        "admin-keuangan.master-package-units.create": "/admin-keuangan/master-package-units/create"
      };
      return routes[name] || "#";
    };
    const isActive = (routePattern) => {
      const currentUrl = window.location.pathname;
      if (routePattern.includes("*")) {
        const basePattern = routePattern.replace("*", "");
        const routeMap2 = {
          "admin-keuangan.dashboard": "/admin-keuangan/dashboard",
          "admin-keuangan.customers": "/admin-keuangan/customers",
          "admin-keuangan.vendors": "/admin-keuangan/vendors",
          "admin-keuangan.sales-orders": "/admin-keuangan/sales-orders",
          "admin-keuangan.shipment-types.": "/admin-keuangan/shipment-types",
          "admin-keuangan.service-types.": "/admin-keuangan/service-types",
          "admin-keuangan.operational-cost-categories.": "/admin-keuangan/operational-cost-categories",
          "admin-keuangan.master-package-units.": "/admin-keuangan/master-package-units"
        };
        const basePath = routeMap2[basePattern] || basePattern;
        return currentUrl.startsWith(basePath);
      }
      const routeMap = {
        "admin-keuangan.dashboard": "/admin-keuangan/dashboard",
        "admin-keuangan.customers": "/admin-keuangan/customers",
        "admin-keuangan.vendors": "/admin-keuangan/vendors",
        "admin-keuangan.sales-orders": "/admin-keuangan/sales-orders",
        "admin-keuangan.invoices": "/admin-keuangan/invoices",
        "admin-keuangan.account-receivables": "/admin-keuangan/account-receivables",
        "admin-keuangan.account-payables": "/admin-keuangan/account-payables",
        "admin-keuangan.profit-reports": "/admin-keuangan/profit-reports",
        "admin-keuangan.petty-cash": "/admin-keuangan/petty-cash",
        "admin-keuangan.general-expenses": "/admin-keuangan/general-expenses",
        "admin-keuangan.other-incomes": "/admin-keuangan/other-incomes",
        "admin-keuangan.profit-loss": "/admin-keuangan/profit-loss",
        "admin-keuangan.supplies": "/admin-keuangan/supplies",
        "admin-keuangan.prepaid-rent": "/admin-keuangan/prepaid-rent",
        "admin-keuangan.equipment": "/admin-keuangan/equipment",
        "admin-keuangan.financial-position": "/admin-keuangan/financial-position",
        "admin-keuangan.bank-balance": "/admin-keuangan/bank-balance",
        "admin-keuangan.employee-salary": "/admin-keuangan/employee-salary",
        "admin-keuangan.shipment-types": "/admin-keuangan/shipment-types",
        "admin-keuangan.service-types": "/admin-keuangan/service-types",
        "admin-keuangan.operational-cost-categories": "/admin-keuangan/operational-cost-categories",
        "admin-keuangan.master-package-units": "/admin-keuangan/master-package-units"
      };
      const routePath = routeMap[routePattern];
      if (routePath) {
        return currentUrl.startsWith(routePath);
      }
      return currentUrl === routePattern;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (__props.isMobileSidebarOpen) {
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-f26ae235></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": __props.isMobileSidebarOpen,
        "-translate-x-full": !__props.isMobileSidebarOpen
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col"])}" data-v-f26ae235><div class="px-6 py-6 border-b border-sage-200 flex-shrink-0" data-v-f26ae235><div class="flex items-center space-x-3" data-v-f26ae235><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-f26ae235><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-f26ae235></path></svg></div><div data-v-f26ae235><h2 class="text-lg font-bold text-sage-700" data-v-f26ae235>Finance Dept</h2><p class="text-xs text-sage-500" data-v-f26ae235>Finance Admin</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto min-h-0" data-v-f26ae235><a${ssrRenderAttr("href", unref(route)("admin-keuangan.dashboard"))} class="${ssrRenderClass([
        isActive("admin-keuangan.dashboard") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Dashboard</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.customers.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.customers") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Customer Management</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.vendors.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.vendors") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Vendor Management</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.sales-orders.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.sales-orders") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Shipping Orders</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.invoices.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.invoices") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Invoices</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.account-receivables.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.account-receivables") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Piutang Management</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.account-payables.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.account-payables") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Hutang Management</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.profit-reports.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.profit-reports") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Profit Reports</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.petty-cash.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.petty-cash") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Petty Cash</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.general-expenses.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.general-expenses") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Pengeluaran Lain-lain</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.other-incomes.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.other-incomes") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Pendapatan Lain-lain</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.supplies.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.supplies") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2H5a2 2 0 01-2-2v-1a2 2 0 012-2h4V8a3 3 0 016 0v2h4a2 2 0 012 2v1a2 2 0 01-2 2h-4v2a3 3 0 01-6 0z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Supplies</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.prepaid-rent.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.prepaid-rent") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V5a3 3 0 013-3h2a3 3 0 013 3v2m4 0H4m14 0v12a2 2 0 01-2 2H8a2 2 0 01-2-2V7" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Prepaid Rent</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.equipment.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.equipment") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7h16M4 12h8m-8 5h16M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Equipment</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.profit-loss.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.profit-loss") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Income Statement</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.financial-position.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.financial-position") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H6a2 2 0 00-2 2v2m0 0v10a2 2 0 002 2h2m-2-12h2m8-4h2a2 2 0 012 2v2m0 0v10a2 2 0 01-2 2h-2m2-12h-2M9 16h6m-6-4h6" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Financial Position</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.bank-balance.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.bank-balance") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Saldo Bank</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.employee-salary.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.employee-salary") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Gaji Karyawan</span></a><div class="pt-4 mt-6 border-t border-sage-200" data-v-f26ae235><div class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2" data-v-f26ae235> Master Data </div><a${ssrRenderAttr("href", unref(route)("admin-keuangan.shipment-types.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.shipment-types.*") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2v0a2 2 0 01-2-2v-5H8z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Shipment Type</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.service-types.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.service-types.*") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Service Type</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.operational-cost-categories.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.operational-cost-categories.*") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Chart Of Accounts</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.master-package-units.index"))} class="${ssrRenderClass([
        isActive("admin-keuangan.master-package-units.*") ? "bg-sage-100 text-sage-800 shadow-sm" : "text-sage-700 hover:bg-sage-50 hover:text-sage-800",
        "flex items-center space-x-3 p-3 rounded-lg transition-all duration-200"
      ])}" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Master Satuan Package</span></a></div><div class="pt-4 mt-6 border-t border-sage-200" data-v-f26ae235><div class="text-xs font-semibold text-sage-500 uppercase tracking-wider px-3 py-2" data-v-f26ae235> Quick Actions </div><a${ssrRenderAttr("href", unref(route)("admin-keuangan.customers.create"))} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Add Customer</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.vendors.create"))} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Add Vendor</span></a><a${ssrRenderAttr("href", unref(route)("admin-keuangan.sales-orders.index"))} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-50 hover:text-sage-800 transition-all duration-200" data-v-f26ae235><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-f26ae235><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2z" data-v-f26ae235></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM9 17a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" data-v-f26ae235></path></svg><span class="font-medium" data-v-f26ae235>Pending Reviews</span></a></div></nav></aside><!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Components/SidebarNavigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SidebarNavigation = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f26ae235"]]);
export {
  SidebarNavigation as default
};
