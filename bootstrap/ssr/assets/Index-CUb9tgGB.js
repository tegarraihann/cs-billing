import { ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, withDirectives, vModelText, createBlock, openBlock, Fragment, renderList, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-1gZAo0_N.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { Head, Link, router } from "@inertiajs/vue3";
import { Plus, TrendingUp, Calendar, CalendarDays, CheckCircle, Clock, Filter, X, Eye, Edit, XCircle, Trash2 } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DLLX4jgl.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    otherIncomes: Object,
    summary: Object,
    categories: Array,
    filters: Object
  },
  setup(__props) {
    var _a, _b, _c, _d;
    const props = __props;
    const filterForm = ref({
      start_date: ((_a = props.filters) == null ? void 0 : _a.start_date) || "",
      end_date: ((_b = props.filters) == null ? void 0 : _b.end_date) || "",
      category: ((_c = props.filters) == null ? void 0 : _c.category) || "",
      posted: ((_d = props.filters) == null ? void 0 : _d.posted) || ""
    });
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
    const getCategoryBadge = (category) => {
      const badges = {
        "Bunga Bank Mandiri": "bg-blue-100 text-blue-800",
        "Bunga Bank BCA": "bg-purple-100 text-purple-800",
        "Lainnya": "bg-gray-100 text-gray-800"
      };
      return badges[category] || "bg-gray-100 text-gray-800";
    };
    const applyFilters = () => {
      router.get(route("admin-keuangan.other-incomes.index"), filterForm.value, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const resetFilters = () => {
      filterForm.value = {
        start_date: "",
        end_date: "",
        category: "",
        posted: ""
      };
      router.get(route("admin-keuangan.other-incomes.index"));
    };
    const postToProfitLoss = (income) => {
      if (confirm(`Posting pendapatan "${income.description}" ke Laba Rugi?`)) {
        router.post(route("admin-keuangan.other-incomes.post-to-profit-loss", income.id));
      }
    };
    const unpostFromProfitLoss = (income) => {
      if (confirm(`Unpost pendapatan "${income.description}" dari Laba Rugi?`)) {
        router.post(route("admin-keuangan.other-incomes.unpost-from-profit-loss", income.id));
      }
    };
    const deleteIncome = (income) => {
      if (confirm(`Apakah Anda yakin ingin menghapus pendapatan "${income.description}"?`)) {
        router.delete(route("admin-keuangan.other-incomes.destroy", income.id));
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Pendapatan Lain-lain" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Pendapatan Lain-lain</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Kelola pendapatan selain dari jasa logistik</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.other-incomes.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Tambah Pendapatan `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Tambah Pendapatan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(TrendingUp), { class: "h-6 w-6 text-blue-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Total Semua</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_amount))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Calendar), { class: "h-6 w-6 text-green-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Bulan Ini</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_this_month))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CalendarDays), { class: "h-6 w-6 text-purple-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Tahun Ini</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_this_year))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(CheckCircle), { class: "h-6 w-6 text-green-500" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Posted</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_posted))}</dd></dl></div></div></div></div><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Clock), { class: "h-6 w-6 text-yellow-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Pending</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.summary.total_not_posted))}</dd></dl></div></div></div></div></div><div class="bg-white shadow rounded-lg mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-4 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Tanggal Mulai</label><input${ssrRenderAttr("value", filterForm.value.start_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Tanggal Akhir</label><input${ssrRenderAttr("value", filterForm.value.end_date)} type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Kategori</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterForm.value.category) ? ssrLooseContain(filterForm.value.category, "") : ssrLooseEqual(filterForm.value.category, "")) ? " selected" : ""}${_scopeId}>Semua Kategori</option><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<option${ssrRenderAttr("value", category)}${ssrIncludeBooleanAttr(Array.isArray(filterForm.value.category) ? ssrLooseContain(filterForm.value.category, category) : ssrLooseEqual(filterForm.value.category, category)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(filterForm.value.posted) ? ssrLooseContain(filterForm.value.posted, "") : ssrLooseEqual(filterForm.value.posted, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="yes"${ssrIncludeBooleanAttr(Array.isArray(filterForm.value.posted) ? ssrLooseContain(filterForm.value.posted, "yes") : ssrLooseEqual(filterForm.value.posted, "yes")) ? " selected" : ""}${_scopeId}>Posted</option><option value="no"${ssrIncludeBooleanAttr(Array.isArray(filterForm.value.posted) ? ssrLooseContain(filterForm.value.posted, "no") : ssrLooseEqual(filterForm.value.posted, "no")) ? " selected" : ""}${_scopeId}>Pending</option></select></div></div><div class="mt-4 flex space-x-2"${_scopeId}><button class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Filter), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Terapkan Filter </button><button class="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(X), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Reset </button></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Tanggal </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Kategori </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Deskripsi </th><th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Jumlah </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}> Dibuat Oleh </th><th scope="col" class="relative px-6 py-3"${_scopeId}><span class="sr-only"${_scopeId}>Actions</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.otherIncomes.data, (income) => {
              var _a2;
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(income.transaction_date))}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([getCategoryBadge(income.category), "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(income.category)}</span></td><td class="px-6 py-4"${_scopeId}><div class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(income.description)}</div>`);
              if (income.notes) {
                _push2(`<div class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(income.notes)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-right"${_scopeId}><div class="text-sm font-medium text-green-600"${_scopeId}>${ssrInterpolate(formatCurrency(income.amount))}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass([income.posted_to_profit_loss ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800", "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(income.posted_to_profit_loss ? "Posted" : "Pending")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"${_scopeId}>${ssrInterpolate(((_a2 = income.creator) == null ? void 0 : _a2.name) || "-")}</td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><div class="flex justify-end space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.other-incomes.show", income.id),
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
              if (!income.posted_to_profit_loss) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: _ctx.route("admin-keuangan.other-incomes.edit", income.id),
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
              if (!income.posted_to_profit_loss) {
                _push2(`<button class="text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50" title="Post ke Laba Rugi"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              if (income.posted_to_profit_loss) {
                _push2(`<button class="text-orange-600 hover:text-orange-900 p-2 rounded-md hover:bg-orange-50" title="Unpost dari Laba Rugi"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(XCircle), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              if (!income.posted_to_profit_loss) {
                _push2(`<button class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" title="Hapus"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.otherIncomes.data.length === 0) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(TrendingUp), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900"${_scopeId}>Belum ada pendapatan lain-lain</h3><p class="mt-1 text-sm text-gray-500"${_scopeId}>Mulai dengan menambahkan pendapatan lain-lain pertama</p><div class="mt-6"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.other-incomes.create"),
                class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` Tambah Pendapatan `);
                  } else {
                    return [
                      createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" Tambah Pendapatan ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.otherIncomes.links && __props.otherIncomes.data.length > 0) {
              _push2(`<div class="mt-6"${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.otherIncomes }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode(unref(Head), { title: "Pendapatan Lain-lain" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Pendapatan Lain-lain"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Kelola pendapatan selain dari jasa logistik")
                    ]),
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.other-incomes.create"),
                      class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Tambah Pendapatan ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(TrendingUp), { class: "h-6 w-6 text-blue-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Total Semua"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.summary.total_amount)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(Calendar), { class: "h-6 w-6 text-green-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Bulan Ini"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.summary.total_this_month)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(CalendarDays), { class: "h-6 w-6 text-purple-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Tahun Ini"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.summary.total_this_year)), 1)
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(CheckCircle), { class: "h-6 w-6 text-green-500" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Posted"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.summary.total_posted)), 1)
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
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Pending"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(__props.summary.total_not_posted)), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Tanggal Mulai"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => filterForm.value.start_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, filterForm.value.start_date]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Tanggal Akhir"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => filterForm.value.end_date = $event,
                            type: "date",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, filterForm.value.end_date]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Kategori"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => filterForm.value.category = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Semua Kategori"),
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                              return openBlock(), createBlock("option", {
                                key: category,
                                value: category
                              }, toDisplayString(category), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, filterForm.value.category]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Status"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => filterForm.value.posted = $event,
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-sage-500 focus:border-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Semua Status"),
                            createVNode("option", { value: "yes" }, "Posted"),
                            createVNode("option", { value: "no" }, "Pending")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, filterForm.value.posted]
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "mt-4 flex space-x-2" }, [
                        createVNode("button", {
                          onClick: applyFilters,
                          class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition"
                        }, [
                          createVNode(unref(Filter), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Terapkan Filter ")
                        ]),
                        createVNode("button", {
                          onClick: resetFilters,
                          class: "inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition"
                        }, [
                          createVNode(unref(X), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Reset ")
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
                              }, " Tanggal "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Kategori "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Deskripsi "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Jumlah "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Status "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Dibuat Oleh "),
                              createVNode("th", {
                                scope: "col",
                                class: "relative px-6 py-3"
                              }, [
                                createVNode("span", { class: "sr-only" }, "Actions")
                              ])
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.otherIncomes.data, (income) => {
                              var _a2;
                              return openBlock(), createBlock("tr", {
                                key: income.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(formatDate(income.transaction_date)), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: ["inline-flex px-2 py-1 text-xs font-semibold rounded-full", getCategoryBadge(income.category)]
                                  }, toDisplayString(income.category), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(income.description), 1),
                                  income.notes ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-sm text-gray-500"
                                  }, toDisplayString(income.notes), 1)) : createCommentVNode("", true)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right" }, [
                                  createVNode("div", { class: "text-sm font-medium text-green-600" }, toDisplayString(formatCurrency(income.amount)), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("span", {
                                    class: [income.posted_to_profit_loss ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800", "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                                  }, toDisplayString(income.posted_to_profit_loss ? "Posted" : "Pending"), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-500" }, toDisplayString(((_a2 = income.creator) == null ? void 0 : _a2.name) || "-"), 1),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                  createVNode("div", { class: "flex justify-end space-x-2" }, [
                                    createVNode(unref(Link), {
                                      href: _ctx.route("admin-keuangan.other-incomes.show", income.id),
                                      class: "text-sage-600 hover:text-sage-900 p-2 rounded-md hover:bg-sage-50",
                                      title: "Lihat Detail"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Eye), { class: "w-4 h-4" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    !income.posted_to_profit_loss ? (openBlock(), createBlock(unref(Link), {
                                      key: 0,
                                      href: _ctx.route("admin-keuangan.other-incomes.edit", income.id),
                                      class: "text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50",
                                      title: "Edit"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Edit), { class: "w-4 h-4" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"])) : createCommentVNode("", true),
                                    !income.posted_to_profit_loss ? (openBlock(), createBlock("button", {
                                      key: 1,
                                      onClick: ($event) => postToProfitLoss(income),
                                      class: "text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50",
                                      title: "Post ke Laba Rugi"
                                    }, [
                                      createVNode(unref(CheckCircle), { class: "w-4 h-4" })
                                    ], 8, ["onClick"])) : createCommentVNode("", true),
                                    income.posted_to_profit_loss ? (openBlock(), createBlock("button", {
                                      key: 2,
                                      onClick: ($event) => unpostFromProfitLoss(income),
                                      class: "text-orange-600 hover:text-orange-900 p-2 rounded-md hover:bg-orange-50",
                                      title: "Unpost dari Laba Rugi"
                                    }, [
                                      createVNode(unref(XCircle), { class: "w-4 h-4" })
                                    ], 8, ["onClick"])) : createCommentVNode("", true),
                                    !income.posted_to_profit_loss ? (openBlock(), createBlock("button", {
                                      key: 3,
                                      onClick: ($event) => deleteIncome(income),
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
                      __props.otherIncomes.data.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-12"
                      }, [
                        createVNode(unref(TrendingUp), { class: "mx-auto h-12 w-12 text-gray-400" }),
                        createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "Belum ada pendapatan lain-lain"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Mulai dengan menambahkan pendapatan lain-lain pertama"),
                        createVNode("div", { class: "mt-6" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-keuangan.other-incomes.create"),
                            class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-700"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Tambah Pendapatan ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])) : createCommentVNode("", true),
                      __props.otherIncomes.links && __props.otherIncomes.data.length > 0 ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-6"
                      }, [
                        createVNode(Pagination, { data: __props.otherIncomes }, null, 8, ["data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/OtherIncomes/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
