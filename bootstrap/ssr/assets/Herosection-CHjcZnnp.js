import { ref, onMounted, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
const _sfc_main = {
  __name: "Herosection",
  __ssrInlineRender: true,
  setup(__props) {
    const stats = ref({
      totalUsers: 12847,
      revenue: "$45,230",
      pageViews: 189567,
      conversionRate: 3.24
    });
    const recentActivities = ref([
      {
        id: 1,
        title: "New user registered",
        description: "John Smith created an account",
        time: "2 minutes ago",
        iconBg: "bg-emerald-100",
        iconColor: "text-emerald-600",
        iconPath: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
      },
      {
        id: 2,
        title: "Content published",
        description: 'Blog post "Getting Started Guide" was published',
        time: "15 minutes ago",
        iconBg: "bg-blue-100",
        iconColor: "text-blue-600",
        iconPath: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      },
      {
        id: 3,
        title: "System backup completed",
        description: "Automated daily backup finished successfully",
        time: "1 hour ago",
        iconBg: "bg-sage-100",
        iconColor: "text-sage-600",
        iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      },
      {
        id: 4,
        title: "Analytics report generated",
        description: "Monthly performance report is ready",
        time: "2 hours ago",
        iconBg: "bg-orange-100",
        iconColor: "text-orange-600",
        iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
      }
    ]);
    onMounted(() => {
      animateStats();
    });
    const animateStats = () => {
      setTimeout(() => {
        stats.value.totalUsers = 12847;
      }, 500);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "lg:ml-64 min-h-screen bg-gradient-to-br from-sage-50 to-sage-100 relative overflow-hidden" }, _attrs))}><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5"></path></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" class="text-sage-400"></rect></svg></div><div class="relative z-10 container mx-auto px-6 py-20"><div class="text-center mb-16 animate-fade-in"><h1 class="text-5xl md:text-6xl font-bold text-sage-800 mb-6 leading-tight"> Welcome to <span class="bg-gradient-to-r from-sage-600 to-sage-700 bg-clip-text text-transparent"> Master Admin </span></h1><p class="text-xl text-sage-600 mb-8 max-w-3xl mx-auto leading-relaxed"> Your powerful dashboard to manage users, content, and analytics with ease. Get insights, make decisions, and grow your business all in one place. </p><div class="flex flex-col sm:flex-row gap-4 justify-center items-center"><button class="btn-sage animate-slide-up"> Get Started </button><button class="px-8 py-4 border-2 border-sage-600 text-sage-700 font-semibold rounded-full hover:bg-sage-600 hover:text-white transition-all duration-300 animate-slide-up"> Learn More </button></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"><div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up group"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center group-hover:bg-sage-600 transition-colors duration-300"><svg class="w-6 h-6 text-sage-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div><span class="text-xs font-medium text-sage-500 bg-sage-100 px-2 py-1 rounded-full">+12%</span></div><h3 class="text-2xl font-bold text-sage-800 mb-1">${ssrInterpolate(stats.value.totalUsers.toLocaleString())}</h3><p class="text-sage-600 text-sm">Total Users</p></div><div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up group" style="${ssrRenderStyle({ "animation-delay": "0.1s" })}"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center group-hover:bg-sage-600 transition-colors duration-300"><svg class="w-6 h-6 text-sage-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div><span class="text-xs font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">+8%</span></div><h3 class="text-2xl font-bold text-sage-800 mb-1">${ssrInterpolate(stats.value.revenue)}</h3><p class="text-sage-600 text-sm">Monthly Revenue</p></div><div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up group" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center group-hover:bg-sage-600 transition-colors duration-300"><svg class="w-6 h-6 text-sage-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg></div><span class="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">+25%</span></div><h3 class="text-2xl font-bold text-sage-800 mb-1">${ssrInterpolate(stats.value.pageViews.toLocaleString())}</h3><p class="text-sage-600 text-sm">Page Views</p></div><div class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up group" style="${ssrRenderStyle({ "animation-delay": "0.3s" })}"><div class="flex items-center justify-between mb-4"><div class="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center group-hover:bg-sage-600 transition-colors duration-300"><svg class="w-6 h-6 text-sage-600 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg></div><span class="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-1 rounded-full">+18%</span></div><h3 class="text-2xl font-bold text-sage-800 mb-1">${ssrInterpolate(stats.value.conversionRate)}%</h3><p class="text-sage-600 text-sm">Conversion Rate</p></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"><div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up group"><div class="w-16 h-16 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg></div><h3 class="text-xl font-bold text-sage-800 mb-3">Add New User</h3><p class="text-sage-600 mb-6">Quickly create new user accounts and assign roles with our streamlined process.</p><button class="text-sage-600 font-semibold hover:text-sage-700 transition-colors flex items-center space-x-2"><span>Create User</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div><div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up group" style="${ssrRenderStyle({ "animation-delay": "0.1s" })}"><div class="w-16 h-16 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg></div><h3 class="text-xl font-bold text-sage-800 mb-3">View Analytics</h3><p class="text-sage-600 mb-6">Access detailed insights and reports to make data-driven decisions for your business.</p><button class="text-sage-600 font-semibold hover:text-sage-700 transition-colors flex items-center space-x-2"><span>View Reports</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div><div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up group" style="${ssrRenderStyle({ "animation-delay": "0.2s" })}"><div class="w-16 h-16 bg-gradient-to-br from-sage-500 to-sage-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg></div><h3 class="text-xl font-bold text-sage-800 mb-3">System Settings</h3><p class="text-sage-600 mb-6">Configure your system preferences, security settings, and customize your dashboard.</p><button class="text-sage-600 font-semibold hover:text-sage-700 transition-colors flex items-center space-x-2"><span>Manage Settings</span><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></button></div></div><div class="bg-white rounded-2xl p-8 shadow-lg animate-slide-up"><div class="flex items-center justify-between mb-6"><h3 class="text-2xl font-bold text-sage-800">Recent Activity</h3><button class="text-sage-600 hover:text-sage-700 font-medium">View All</button></div><div class="space-y-4"><!--[-->`);
      ssrRenderList(recentActivities.value, (activity) => {
        _push(`<div class="flex items-center p-4 border border-sage-200 rounded-xl hover:bg-sage-50 transition-colors"><div class="${ssrRenderClass([activity.iconBg, "w-10 h-10 rounded-full flex items-center justify-center mr-4"])}"><svg class="${ssrRenderClass([activity.iconColor, "w-5 h-5"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${ssrRenderAttr("d", activity.iconPath)}></path></svg></div><div class="flex-1"><p class="text-sage-800 font-medium">${ssrInterpolate(activity.title)}</p><p class="text-sage-600 text-sm">${ssrInterpolate(activity.description)}</p></div><span class="text-sage-500 text-sm">${ssrInterpolate(activity.time)}</span></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/masteradmin/Herosection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
