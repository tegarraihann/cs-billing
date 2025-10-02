import { withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-S8MrU6NK.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { Globe, Users, Plus, DollarSign, Clock, CheckCircle, Eye, Edit, Check, Trash2 } from "lucide-vue-next";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B6ie8KC7.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    salaries: Object,
    stats: Object,
    filters: Object,
    divisions: Object,
    periods: Array
  },
  setup(__props) {
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(amount || 0);
    };
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const formatPeriod = (period) => {
      const [year, month] = period.split("-");
      const months = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "Mei",
        "06": "Jun",
        "07": "Jul",
        "08": "Agu",
        "09": "Sep",
        "10": "Okt",
        "11": "Nov",
        "12": "Des"
      };
      return `${months[month]} ${year}`;
    };
    const getDivisionLabel = (division) => {
      const labels = {
        "customer_support": "Customer Support",
        "marketing": "Marketing",
        "finance": "Finance",
        "operations": "Operations",
        "management": "Management"
      };
      return labels[division] || division;
    };
    const getStatusBadge = (status) => {
      const badges = {
        "draft": "bg-yellow-100 text-yellow-800",
        "paid": "bg-green-100 text-green-800",
        "cancelled": "bg-red-100 text-red-800"
      };
      return badges[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusText = (status) => {
      const texts = {
        "draft": "Draft",
        "paid": "Dibayar",
        "cancelled": "Dibatalkan"
      };
      return texts[status] || status;
    };
    const approveSalary = (salary) => {
      if (confirm(`Approve gaji ${salary.employee_name} sebesar ${formatCurrency(salary.total_salary)}?`)) {
        router.post(route("admin-keuangan.employee-salary.approve", salary.id));
      }
    };
    const deleteSalary = (salary) => {
      if (confirm(`Hapus data gaji ${salary.employee_name}?`)) {
        router.delete(route("admin-keuangan.employee-salary.destroy", salary.id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Gaji Karyawan" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Gaji Karyawan</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Kelola data gaji karyawan perusahaan</p></div><div class="flex space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.employee-salary.all-in-create"),
              class: "inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Globe), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` ALL IN `);
                } else {
                  return [
                    createVNode(unref(Globe), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" ALL IN ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.employee-salary.bulk-create"),
              class: "inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Users), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Bulk Input `);
                } else {
                  return [
                    createVNode(unref(Users), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Bulk Input ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.employee-salary.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Tambah Gaji `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Tambah Gaji ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "h-6 w-6 text-gray-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Karyawan</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.total_employees)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Bulan Ini</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.stats.current_month_total))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Clock), { class: "h-6 w-6 text-yellow-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Draft</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.draft_count)}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Dibayar</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(__props.stats.paid_count)}</dd></dl></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Karyawan </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Posisi </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Periode </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Total Gaji </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Tanggal Gaji </th><th scope="col" class="relative px-6 py-3"${_scopeId}><span class="sr-only"${_scopeId}>Actions</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}>`);
            if (!__props.salaries || !__props.salaries.data || __props.salaries.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="6" class="px-6 py-12 text-center text-gray-500"${_scopeId}><div class="flex flex-col items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Users), { class: "w-12 h-12 text-gray-300 mb-4" }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-lg font-medium text-gray-900 mb-2"${_scopeId}>Belum ada data gaji</h3><p class="text-sm text-gray-500 mb-4"${_scopeId}>Mulai dengan menambahkan data gaji karyawan</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.employee-salary.create"),
                class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` Tambah Gaji Pertama `);
                  } else {
                    return [
                      createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" Tambah Gaji Pertama ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></td></tr>`);
            } else {
              _push2(`<!--[-->`);
              ssrRenderList(__props.salaries.data, (salary) => {
                _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(salary.employee_name)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(salary.employee_id || "N/A")}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(salary.position)}</div><div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(getDivisionLabel(salary.division))}</div></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatPeriod(salary.period_month))}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(salary.total_salary))}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([getStatusBadge(salary.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(getStatusText(salary.status))}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(salary.salary_date))}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><div class="flex space-x-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("admin-keuangan.employee-salary.show", salary.id),
                  class: "text-sage-600 hover:text-sage-900 p-2 rounded-md hover:bg-sage-50",
                  title: "Lihat Detail"
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
                if (salary.status === "draft") {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: _ctx.route("admin-keuangan.employee-salary.edit", salary.id),
                    class: "text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50",
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
                if (salary.status === "draft") {
                  _push2(`<button class="text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50" title="Approve"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Check), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                  _push2(`</button>`);
                } else {
                  _push2(`<!---->`);
                }
                if (salary.status === "draft") {
                  _push2(`<button class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" title="Hapus"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                  _push2(`</button>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td></tr>`);
              });
              _push2(`<!--]-->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.salaries && __props.salaries.links && __props.salaries.last_page > 1) {
              _push2(`<div class="mt-6"${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, {
                links: __props.salaries.links
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Gaji Karyawan" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Gaji Karyawan"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Kelola data gaji karyawan perusahaan")
                    ]),
                    createVNode("div", { class: "flex space-x-3" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.employee-salary.all-in-create"),
                        class: "inline-flex items-center px-4 py-2 bg-purple-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Globe), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" ALL IN ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.employee-salary.bulk-create"),
                        class: "inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Users), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Bulk Input ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.employee-salary.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Tambah Gaji ")
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
                            createVNode(unref(Users), { class: "h-6 w-6 text-gray-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Karyawan"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.total_employees), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(DollarSign), { class: "h-6 w-6 text-blue-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Bulan Ini"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.stats.current_month_total)), 1)
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
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.draft_count), 1)
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
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Dibayar"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(__props.stats.paid_count), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Karyawan "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Posisi "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Periode "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Total Gaji "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Status "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Tanggal Gaji "),
                              createVNode("th", {
                                scope: "col",
                                class: "relative px-6 py-3"
                              }, [
                                createVNode("span", { class: "sr-only" }, "Actions")
                              ])
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            !__props.salaries || !__props.salaries.data || __props.salaries.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                              createVNode("td", {
                                colspan: "6",
                                class: "px-6 py-12 text-center text-gray-500"
                              }, [
                                createVNode("div", { class: "flex flex-col items-center" }, [
                                  createVNode(unref(Users), { class: "w-12 h-12 text-gray-300 mb-4" }),
                                  createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-2" }, "Belum ada data gaji"),
                                  createVNode("p", { class: "text-sm text-gray-500 mb-4" }, "Mulai dengan menambahkan data gaji karyawan"),
                                  createVNode(unref(Link), {
                                    href: _ctx.route("admin-keuangan.employee-salary.create"),
                                    class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                                      createTextVNode(" Tambah Gaji Pertama ")
                                    ]),
                                    _: 1
                                  }, 8, ["href"])
                                ])
                              ])
                            ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(__props.salaries.data, (salary) => {
                              return openBlock(), createBlock("tr", {
                                key: salary.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(salary.employee_name), 1),
                                  createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(salary.employee_id || "N/A"), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(salary.position), 1),
                                  createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(getDivisionLabel(salary.division)), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatPeriod(salary.period_month)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(formatCurrency(salary.total_salary)), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: [getStatusBadge(salary.status), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                  }, toDisplayString(getStatusText(salary.status)), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(formatDate(salary.salary_date)), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                  createVNode("div", { class: "flex space-x-2" }, [
                                    createVNode(unref(Link), {
                                      href: _ctx.route("admin-keuangan.employee-salary.show", salary.id),
                                      class: "text-sage-600 hover:text-sage-900 p-2 rounded-md hover:bg-sage-50",
                                      title: "Lihat Detail"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Eye), { class: "w-4 h-4" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    salary.status === "draft" ? (openBlock(), createBlock(unref(Link), {
                                      key: 0,
                                      href: _ctx.route("admin-keuangan.employee-salary.edit", salary.id),
                                      class: "text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50",
                                      title: "Edit"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Edit), { class: "w-4 h-4" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])) : createCommentVNode("", true),
                                    salary.status === "draft" ? (openBlock(), createBlock("button", {
                                      key: 1,
                                      onClick: ($event) => approveSalary(salary),
                                      class: "text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50",
                                      title: "Approve"
                                    }, [
                                      createVNode(unref(Check), { class: "w-4 h-4" })
                                    ], 8, ["onClick"])) : createCommentVNode("", true),
                                    salary.status === "draft" ? (openBlock(), createBlock("button", {
                                      key: 2,
                                      onClick: ($event) => deleteSalary(salary),
                                      class: "text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50",
                                      title: "Hapus"
                                    }, [
                                      createVNode(unref(Trash2), { class: "w-4 h-4" })
                                    ], 8, ["onClick"])) : createCommentVNode("", true)
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      __props.salaries && __props.salaries.links && __props.salaries.last_page > 1 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6"
                      }, [
                        createVNode(Pagination, {
                          links: __props.salaries.links
                        }, null, 8, ["links"])
                      ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/EmployeeSalary/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
