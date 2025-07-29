import { computed, ref, onMounted, onUnmounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
const dashboardRoute = "/admin-keuangan/dashboard";
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
    const isMobileSidebarOpen = ref(false);
    const showDropdown = ref(false);
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
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
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
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        showDropdown.value = false;
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        isMobileSidebarOpen.value = false;
      }
    };
    onMounted(() => {
      window.addEventListener("resize", handleResize);
      window.addEventListener("click", handleClickOutside);
      console.log("AdminKeuangan Dashboard props:", props);
    });
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleClickOutside);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-sage-50" }, _attrs))} data-v-af0252be><nav class="bg-white shadow-sm border-b border-sage-200 fixed top-0 left-0 right-0 z-50" data-v-af0252be><div class="px-4 sm:px-6 lg:ml-64 lg:px-8" data-v-af0252be><div class="flex justify-between items-center h-16" data-v-af0252be><div class="lg:hidden" data-v-af0252be><button class="p-2 rounded-lg text-sage-600 hover:bg-sage-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500" data-v-af0252be><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-v-af0252be></path></svg></button></div><div class="flex-1 lg:flex-none" data-v-af0252be><h1 class="text-lg sm:text-xl font-semibold text-sage-800 truncate" data-v-af0252be> Admin Keuangan Dashboard </h1></div><div class="flex items-center space-x-2 sm:space-x-4" data-v-af0252be><div class="relative" data-v-af0252be><button class="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-sage-100 transition-colors" data-v-af0252be><div class="w-7 h-7 sm:w-8 sm:h-8 bg-sage-600 rounded-full flex items-center justify-center" data-v-af0252be><span class="text-white font-semibold text-xs sm:text-sm" data-v-af0252be>${ssrInterpolate(getInitials((_a = authUser.value) == null ? void 0 : _a.name))}</span></div><div class="hidden sm:block text-left" data-v-af0252be><p class="text-sm font-medium text-sage-700" data-v-af0252be>${ssrInterpolate((_b = authUser.value) == null ? void 0 : _b.name)}</p><p class="text-xs text-sage-500" data-v-af0252be>Admin Keuangan</p></div><svg class="${ssrRenderClass([{ "rotate-180": showDropdown.value }, "w-4 h-4 text-sage-600 hidden sm:block transition-transform"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-v-af0252be></path></svg></button>`);
      if (showDropdown.value) {
        _push(`<div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200" data-v-af0252be><a href="/profile" class="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors" data-v-af0252be><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-af0252be></path></svg><span data-v-af0252be>Profile</span></a><div class="border-t border-gray-100 my-1" data-v-af0252be></div><button class="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors" data-v-af0252be><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-af0252be></path></svg><span data-v-af0252be>Log Out</span></button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (showDropdown.value) {
        _push(`<div class="fixed inset-0 z-40" data-v-af0252be></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></nav>`);
      if (isMobileSidebarOpen.value) {
        _push(`<div class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" data-v-af0252be></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<aside class="${ssrRenderClass([{
        "translate-x-0": isMobileSidebarOpen.value,
        "-translate-x-full": !isMobileSidebarOpen.value
      }, "fixed inset-y-0 left-0 bg-white shadow-lg w-64 mt-16 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0"])}" data-v-af0252be><div class="px-6 py-6 border-b border-sage-200" data-v-af0252be><div class="flex items-center space-x-3" data-v-af0252be><div class="w-10 h-10 bg-sage-600 rounded-lg flex items-center justify-center" data-v-af0252be><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-af0252be></path></svg></div><div data-v-af0252be><h2 class="text-lg font-bold text-sage-700" data-v-af0252be>Admin Keuangan</h2><p class="text-xs text-sage-500" data-v-af0252be>Financial Management</p></div></div></div><nav class="p-4 space-y-2 flex-1 overflow-y-auto" data-v-af0252be><a${ssrRenderAttr("href", dashboardRoute)} class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 group bg-sage-100 text-sage-800" data-v-af0252be><svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-af0252be></path></svg><span class="font-medium" data-v-af0252be>Dashboard</span></a><a href="#" class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 group" data-v-af0252be><svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-af0252be></path></svg><span class="font-medium" data-v-af0252be>Invoices</span></a><a href="#" class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 group" data-v-af0252be><svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" data-v-af0252be></path></svg><span class="font-medium" data-v-af0252be>Payments</span></a><a href="#" class="flex items-center space-x-3 p-3 rounded-lg text-sage-700 hover:bg-sage-100 hover:text-sage-800 transition-all duration-200 group" data-v-af0252be><svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-af0252be></path></svg><span class="font-medium" data-v-af0252be>Reports</span></a></nav><div class="p-4 border-t border-sage-200 bg-sage-50" data-v-af0252be><div class="flex items-center space-x-3 p-3 rounded-lg hover:bg-sage-100 transition-colors cursor-pointer" data-v-af0252be><div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center" data-v-af0252be><span class="text-white font-semibold text-sm" data-v-af0252be>${ssrInterpolate(getInitials((_c = authUser.value) == null ? void 0 : _c.name))}</span></div><div class="flex-1 min-w-0" data-v-af0252be><p class="text-sm font-medium text-sage-700 truncate" data-v-af0252be>${ssrInterpolate((_d = authUser.value) == null ? void 0 : _d.name)}</p><p class="text-xs text-sage-500 truncate" data-v-af0252be>${ssrInterpolate((_e = authUser.value) == null ? void 0 : _e.email)}</p></div></div></div></aside><main class="lg:ml-64 pt-16 min-h-screen" data-v-af0252be><div class="p-4 sm:p-6 lg:p-8" data-v-af0252be><div class="bg-gradient-to-r from-sage-600 to-sage-700 rounded-xl shadow-lg p-6 mb-8 text-white" data-v-af0252be><h2 class="text-2xl font-bold mb-2" data-v-af0252be> Welcome back, ${ssrInterpolate((_f = authUser.value) == null ? void 0 : _f.name)}! </h2><p class="text-sage-100" data-v-af0252be> Manage financial operations, billing, and payments efficiently. </p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" data-v-af0252be><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-af0252be><div class="flex items-center" data-v-af0252be><div class="p-3 rounded-lg bg-sage-100" data-v-af0252be><svg class="w-6 h-6 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-af0252be></path></svg></div><div class="ml-4" data-v-af0252be><p class="text-sm font-medium text-gray-600" data-v-af0252be>Total Revenue</p><p class="text-2xl font-semibold text-gray-900" data-v-af0252be>${ssrInterpolate(formatCurrency(((_g = __props.stats) == null ? void 0 : _g.totalRevenue) || 1254e5))}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-af0252be><div class="flex items-center" data-v-af0252be><div class="p-3 rounded-lg bg-yellow-100" data-v-af0252be><svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" data-v-af0252be></path></svg></div><div class="ml-4" data-v-af0252be><p class="text-sm font-medium text-gray-600" data-v-af0252be> Outstanding Bills </p><p class="text-2xl font-semibold text-gray-900" data-v-af0252be>${ssrInterpolate(formatCurrency(((_h = __props.stats) == null ? void 0 : _h.pendingPayments) || 82e5))}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-af0252be><div class="flex items-center" data-v-af0252be><div class="p-3 rounded-lg bg-blue-100" data-v-af0252be><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-af0252be></path></svg></div><div class="ml-4" data-v-af0252be><p class="text-sm font-medium text-gray-600" data-v-af0252be>Paid This Month</p><p class="text-2xl font-semibold text-gray-900" data-v-af0252be>${ssrInterpolate(formatCurrency(185e5))}</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200" data-v-af0252be><div class="flex items-center" data-v-af0252be><div class="p-3 rounded-lg bg-purple-100" data-v-af0252be><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" data-v-af0252be></path></svg></div><div class="ml-4" data-v-af0252be><p class="text-sm font-medium text-gray-600" data-v-af0252be>Profit Margin</p><p class="text-2xl font-semibold text-gray-900" data-v-af0252be>24.8%</p></div></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-8 border border-sage-200" data-v-af0252be><h3 class="text-xl font-bold text-sage-800 mb-4" data-v-af0252be> Recent Financial Transactions </h3><div class="overflow-x-auto" data-v-af0252be><table class="w-full" data-v-af0252be><thead data-v-af0252be><tr class="border-b border-sage-200" data-v-af0252be><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-af0252be> Transaction ID </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-af0252be> Customer </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-af0252be> Amount </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-af0252be> Type </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-af0252be> Status </th><th class="text-left py-3 px-4 font-semibold text-sage-800" data-v-af0252be> Date </th></tr></thead><tbody data-v-af0252be><!--[-->`);
      ssrRenderList(sampleTransactions.value, (transaction) => {
        _push(`<tr class="border-b border-gray-100" data-v-af0252be><td class="py-3 px-4 text-sage-600 font-medium" data-v-af0252be>${ssrInterpolate(transaction.id)}</td><td class="py-3 px-4" data-v-af0252be>${ssrInterpolate(transaction.customer)}</td><td class="py-3 px-4 font-semibold" data-v-af0252be>${ssrInterpolate(formatCurrency(transaction.amount))}</td><td class="py-3 px-4" data-v-af0252be>${ssrInterpolate(transaction.type)}</td><td class="py-3 px-4" data-v-af0252be><span class="${ssrRenderClass([getStatusClass(transaction.status), "px-2 py-1 text-xs font-medium rounded-full"])}" data-v-af0252be>${ssrInterpolate(transaction.status)}</span></td><td class="py-3 px-4 text-gray-500" data-v-af0252be>${ssrInterpolate(transaction.date)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" data-v-af0252be><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer" data-v-af0252be><div class="flex items-center space-x-4" data-v-af0252be><div class="p-3 bg-green-100 rounded-lg" data-v-af0252be><svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-af0252be></path></svg></div><div data-v-af0252be><h4 class="font-semibold text-sage-800" data-v-af0252be>New Invoice</h4><p class="text-sm text-sage-600" data-v-af0252be>Create billing invoice</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer" data-v-af0252be><div class="flex items-center space-x-4" data-v-af0252be><div class="p-3 bg-blue-100 rounded-lg" data-v-af0252be><svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" data-v-af0252be></path></svg></div><div data-v-af0252be><h4 class="font-semibold text-sage-800" data-v-af0252be>Record Payment</h4><p class="text-sm text-sage-600" data-v-af0252be>Log new payment</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer" data-v-af0252be><div class="flex items-center space-x-4" data-v-af0252be><div class="p-3 bg-purple-100 rounded-lg" data-v-af0252be><svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" data-v-af0252be></path></svg></div><div data-v-af0252be><h4 class="font-semibold text-sage-800" data-v-af0252be>Financial Report</h4><p class="text-sm text-sage-600" data-v-af0252be>Generate reports</p></div></div></div><div class="bg-white rounded-lg shadow-sm p-6 border border-sage-200 hover:shadow-md transition-shadow cursor-pointer" data-v-af0252be><div class="flex items-center space-x-4" data-v-af0252be><div class="p-3 bg-orange-100 rounded-lg" data-v-af0252be><svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-af0252be><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-af0252be></path></svg></div><div data-v-af0252be><h4 class="font-semibold text-sage-800" data-v-af0252be>Pending Bills</h4><p class="text-sm text-sage-600" data-v-af0252be>Review overdue</p></div></div></div></div></div></main></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-af0252be"]]);
export {
  Dashboard as default
};
