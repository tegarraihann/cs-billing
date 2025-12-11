import { reactive, ref, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, toDisplayString, withDirectives, vModelText, openBlock, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { RefreshCw, Plus, DollarSign, Eye, Edit, Trash2 } from "lucide-vue-next";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-Cm66Fn0p.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-C7BgyxQX.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    transactions: {
      type: Object,
      required: true
    },
    categories: {
      type: Array,
      required: true
    },
    currentBalance: {
      type: [Number, String],
      required: true
    },
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const props = __props;
    const formFilters = reactive({
      start_date: props.filters.start_date || "",
      end_date: props.filters.end_date || "",
      category_id: props.filters.category_id || "",
      type: props.filters.type || "",
      status: props.filters.status || ""
    });
    const showDeleteModal = ref(false);
    const selectedTransaction = ref(null);
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
    const getTypeLabel = (type) => {
      const labels = {
        expense: "Pengeluaran",
        topup: "Top Up",
        refund: "Refund"
      };
      return labels[type] || type;
    };
    const getTypeClass = (type) => {
      const classes = {
        expense: "bg-red-100 text-red-800",
        topup: "bg-green-100 text-green-800",
        refund: "bg-blue-100 text-blue-800"
      };
      return classes[type] || "bg-sage-100 text-sage-800";
    };
    const getAmountClass = (type) => {
      return type === "expense" ? "text-red-600" : "text-green-600";
    };
    const applyFilters = () => {
      router.get(route("admin-keuangan.petty-cash.index"), formFilters, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const clearFilters = () => {
      Object.keys(formFilters).forEach((key) => {
        formFilters[key] = "";
      });
      router.get(route("admin-keuangan.petty-cash.index"));
    };
    const confirmDelete = (transaction) => {
      selectedTransaction.value = transaction;
      showDeleteModal.value = true;
    };
    const deleteTransaction = () => {
      if (selectedTransaction.value) {
        router.delete(route("admin-keuangan.petty-cash.destroy", selectedTransaction.value.id), {
          onSuccess: () => {
            showDeleteModal.value = false;
            selectedTransaction.value = null;
          }
        });
      }
    };
    const syncTransactionBalances = () => {
      router.post(route("admin-keuangan.petty-cash.sync-transaction-balances"), {}, {
        onSuccess: (page) => {
          router.reload();
        }
      });
    };
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.petty-cash.index": "/admin-keuangan/petty-cash",
        "admin-keuangan.petty-cash.create": "/admin-keuangan/petty-cash/create",
        "admin-keuangan.petty-cash.show": (id) => `/admin-keuangan/petty-cash/${id}`,
        "admin-keuangan.petty-cash.edit": (id) => `/admin-keuangan/petty-cash/${id}/edit`,
        "admin-keuangan.petty-cash.destroy": (id) => `/admin-keuangan/petty-cash/${id}`,
        "admin-keuangan.petty-cash.sync-transaction-balances": "/admin-keuangan/petty-cash/sync-transaction-balances"
      };
      return typeof routes[name] === "function" ? routes[name](params) : routes[name] || "#";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Petty Cash Management" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="flex justify-between items-center mb-6"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Petty Cash Management</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>Kelola transaksi petty cash harian</p></div><div class="flex items-center space-x-3"${_scopeId}><button class="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" title="Sinkronkan saldo kolom tabel dengan saldo saat ini"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(RefreshCw), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Sync Saldo </button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.petty-cash.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Tambah Transaksi `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Tambah Transaksi ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6"${_scopeId}><div class="bg-white overflow-hidden shadow rounded-lg"${_scopeId}><div class="p-5"${_scopeId}><div class="flex items-center"${_scopeId}><div class="flex-shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DollarSign), { class: "h-6 w-6 text-gray-400" }, null, _parent2, _scopeId));
            _push2(`</div><div class="ml-5 w-0 flex-1"${_scopeId}><dl${_scopeId}><dt class="text-sm font-medium text-gray-500 truncate"${_scopeId}>Saldo Saat Ini</dt><dd class="text-lg font-medium text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(props.currentBalance))}</dd></dl></div></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6"${_scopeId}><div class="px-4 py-5 sm:p-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4"${_scopeId}>Filter Transaksi</h3><div class="grid grid-cols-1 md:grid-cols-4 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Tanggal Mulai</label><input${ssrRenderAttr("value", formFilters.start_date)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Tanggal Selesai</label><input${ssrRenderAttr("value", formFilters.end_date)} type="date" class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Kategori</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(formFilters.category_id) ? ssrLooseContain(formFilters.category_id, "") : ssrLooseEqual(formFilters.category_id, "")) ? " selected" : ""}${_scopeId}>Semua Kategori</option><!--[-->`);
            ssrRenderList(props.categories, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)}${ssrIncludeBooleanAttr(Array.isArray(formFilters.category_id) ? ssrLooseContain(formFilters.category_id, category.id) : ssrLooseEqual(formFilters.category_id, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Jenis</label><select class="w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(formFilters.type) ? ssrLooseContain(formFilters.type, "") : ssrLooseEqual(formFilters.type, "")) ? " selected" : ""}${_scopeId}>Semua Jenis</option><option value="expense"${ssrIncludeBooleanAttr(Array.isArray(formFilters.type) ? ssrLooseContain(formFilters.type, "expense") : ssrLooseEqual(formFilters.type, "expense")) ? " selected" : ""}${_scopeId}>Pengeluaran</option><option value="topup"${ssrIncludeBooleanAttr(Array.isArray(formFilters.type) ? ssrLooseContain(formFilters.type, "topup") : ssrLooseEqual(formFilters.type, "topup")) ? " selected" : ""}${_scopeId}>Top Up</option><option value="refund"${ssrIncludeBooleanAttr(Array.isArray(formFilters.type) ? ssrLooseContain(formFilters.type, "refund") : ssrLooseEqual(formFilters.type, "refund")) ? " selected" : ""}${_scopeId}>Refund</option></select></div></div><div class="flex justify-end space-x-3 mt-4"${_scopeId}><button class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"${_scopeId}> Clear </button><button class="px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"${_scopeId}> Filter </button></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md"${_scopeId}><div class="px-4 py-5 sm:px-6"${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900"${_scopeId}>Daftar Transaksi</h3></div><div class="overflow-x-auto"${_scopeId}><table class="min-w-full divide-y divide-gray-200"${_scopeId}><thead class="bg-gray-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Tanggal</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Deskripsi</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Kategori</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Jenis</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Jumlah</th><th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Saldo</th><th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"${_scopeId}>Aksi</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"${_scopeId}><!--[-->`);
            ssrRenderList(props.transactions.data, (transaction) => {
              var _a2;
              _push2(`<tr class="hover:bg-gray-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate(formatDate(transaction.transaction_date))}</td><td class="px-6 py-4 text-sm text-gray-900"${_scopeId}><div class="font-medium"${_scopeId}>${ssrInterpolate(transaction.description)}</div>`);
              if (transaction.so_number) {
                _push2(`<div class="text-xs text-gray-500"${_scopeId}> SO: ${ssrInterpolate(transaction.so_number)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"${_scopeId}>${ssrInterpolate((_a2 = transaction.category) == null ? void 0 : _a2.name)}</td><td class="px-6 py-4 whitespace-nowrap text-sm"${_scopeId}><span class="${ssrRenderClass([getTypeClass(transaction.type), "px-2 py-1 rounded-full text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(getTypeLabel(transaction.type))}</span></td><td class="${ssrRenderClass([getAmountClass(transaction.type), "px-6 py-4 whitespace-nowrap text-sm text-right font-medium"])}"${_scopeId}>${ssrInterpolate(transaction.type === "expense" ? "-" : "+")}${ssrInterpolate(formatCurrency(transaction.amount))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900"${_scopeId}>${ssrInterpolate(formatCurrency(transaction.balance_after))}</td><td class="px-6 py-4 whitespace-nowrap text-center text-sm"${_scopeId}><div class="flex items-center justify-center space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.petty-cash.show", transaction.id),
                class: "text-gray-600 hover:text-gray-800 transition-colors",
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
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.petty-cash.edit", transaction.id),
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
              _push2(`<button class="text-red-600 hover:text-red-800 transition-colors" title="Hapus"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`</button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (props.transactions.data.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="7" class="px-6 py-12 text-center text-sm text-gray-500"${_scopeId}> Tidak ada transaksi ditemukan </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (props.transactions.links.length > 3) {
              _push2(`<div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"${_scopeId}><div class="flex-1 flex justify-between sm:hidden"${_scopeId}>`);
              if (props.transactions.prev_page_url) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: props.transactions.prev_page_url,
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
              if (props.transactions.next_page_url) {
                _push2(ssrRenderComponent(unref(Link), {
                  href: props.transactions.next_page_url,
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
              _push2(`</div><div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-700"${_scopeId}> Menampilkan <span class="font-medium"${_scopeId}>${ssrInterpolate(props.transactions.from ?? 0)}</span> sampai <span class="font-medium"${_scopeId}>${ssrInterpolate(props.transactions.to ?? 0)}</span> dari <span class="font-medium"${_scopeId}>${ssrInterpolate(props.transactions.total)}</span> transaksi </p></div><div${_scopeId}><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"${_scopeId}><!--[-->`);
              ssrRenderList(props.transactions.links, (link) => {
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
              _push2(`<div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"${_scopeId}><div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"${_scopeId}><div class="mt-3 text-center"${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4"${_scopeId}>Konfirmasi Hapus</h3><div class="mt-2 px-7 py-3"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}> Apakah Anda yakin ingin menghapus transaksi &quot;${ssrInterpolate((_a = selectedTransaction.value) == null ? void 0 : _a.description)}&quot;? Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi saldo petty cash. </p></div><div class="flex justify-center space-x-3 mt-4"${_scopeId}><button class="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"${_scopeId}> Batal </button><button class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"${_scopeId}> Hapus </button></div></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Petty Cash Management" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Petty Cash Management"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Kelola transaksi petty cash harian")
                    ]),
                    createVNode("div", { class: "flex items-center space-x-3" }, [
                      createVNode("button", {
                        onClick: syncTransactionBalances,
                        class: "inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                        title: "Sinkronkan saldo kolom tabel dengan saldo saat ini"
                      }, [
                        createVNode(unref(RefreshCw), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Sync Saldo ")
                      ]),
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.petty-cash.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-md hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Tambah Transaksi ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6" }, [
                    createVNode("div", { class: "bg-white overflow-hidden shadow rounded-lg" }, [
                      createVNode("div", { class: "p-5" }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("div", { class: "flex-shrink-0" }, [
                            createVNode(unref(DollarSign), { class: "h-6 w-6 text-gray-400" })
                          ]),
                          createVNode("div", { class: "ml-5 w-0 flex-1" }, [
                            createVNode("dl", null, [
                              createVNode("dt", { class: "text-sm font-medium text-gray-500 truncate" }, "Saldo Saat Ini"),
                              createVNode("dd", { class: "text-lg font-medium text-gray-900" }, toDisplayString(formatCurrency(props.currentBalance)), 1)
                            ])
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Filter Transaksi"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Tanggal Mulai"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => formFilters.start_date = $event,
                            type: "date",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, formFilters.start_date]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Tanggal Selesai"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => formFilters.end_date = $event,
                            type: "date",
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, formFilters.end_date]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Kategori"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => formFilters.category_id = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Semua Kategori"),
                            (openBlock(true), createBlock(Fragment, null, renderList(props.categories, (category) => {
                              return openBlock(), createBlock("option", {
                                key: category.id,
                                value: category.id
                              }, toDisplayString(category.name), 9, ["value"]);
                            }), 128))
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, formFilters.category_id]
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Jenis"),
                          withDirectives(createVNode("select", {
                            "onUpdate:modelValue": ($event) => formFilters.type = $event,
                            class: "w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500"
                          }, [
                            createVNode("option", { value: "" }, "Semua Jenis"),
                            createVNode("option", { value: "expense" }, "Pengeluaran"),
                            createVNode("option", { value: "topup" }, "Top Up"),
                            createVNode("option", { value: "refund" }, "Refund")
                          ], 8, ["onUpdate:modelValue"]), [
                            [vModelSelect, formFilters.type]
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
                        }, " Filter ")
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:px-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Daftar Transaksi")
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Tanggal"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Deskripsi"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Kategori"),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Jenis"),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Jumlah"),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Saldo"),
                            createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Aksi")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(props.transactions.data, (transaction) => {
                            var _a2;
                            return openBlock(), createBlock("tr", {
                              key: transaction.id,
                              class: "hover:bg-gray-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString(formatDate(transaction.transaction_date)), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                                createVNode("div", { class: "font-medium" }, toDisplayString(transaction.description), 1),
                                transaction.so_number ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-xs text-gray-500"
                                }, " SO: " + toDisplayString(transaction.so_number), 1)) : createCommentVNode("", true)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, toDisplayString((_a2 = transaction.category) == null ? void 0 : _a2.name), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm" }, [
                                createVNode("span", {
                                  class: [getTypeClass(transaction.type), "px-2 py-1 rounded-full text-xs font-medium"]
                                }, toDisplayString(getTypeLabel(transaction.type)), 3)
                              ]),
                              createVNode("td", {
                                class: ["px-6 py-4 whitespace-nowrap text-sm text-right font-medium", getAmountClass(transaction.type)]
                              }, toDisplayString(transaction.type === "expense" ? "-" : "+") + toDisplayString(formatCurrency(transaction.amount)), 3),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900" }, toDisplayString(formatCurrency(transaction.balance_after)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm" }, [
                                createVNode("div", { class: "flex items-center justify-center space-x-2" }, [
                                  createVNode(unref(Link), {
                                    href: unref(route)("admin-keuangan.petty-cash.show", transaction.id),
                                    class: "text-gray-600 hover:text-gray-800 transition-colors",
                                    title: "Lihat Detail"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Eye), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode(unref(Link), {
                                    href: unref(route)("admin-keuangan.petty-cash.edit", transaction.id),
                                    class: "text-blue-600 hover:text-blue-800 transition-colors",
                                    title: "Edit"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Edit), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode("button", {
                                    onClick: ($event) => confirmDelete(transaction),
                                    class: "text-red-600 hover:text-red-800 transition-colors",
                                    title: "Hapus"
                                  }, [
                                    createVNode(unref(Trash2), { class: "w-4 h-4" })
                                  ], 8, ["onClick"])
                                ])
                              ])
                            ]);
                          }), 128)),
                          props.transactions.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "7",
                              class: "px-6 py-12 text-center text-sm text-gray-500"
                            }, " Tidak ada transaksi ditemukan ")
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    props.transactions.links.length > 3 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                    }, [
                      createVNode("div", { class: "flex-1 flex justify-between sm:hidden" }, [
                        props.transactions.prev_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: props.transactions.prev_page_url,
                          class: "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Previous ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        props.transactions.next_page_url ? (openBlock(), createBlock(unref(Link), {
                          key: 1,
                          href: props.transactions.next_page_url,
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
                            createTextVNode(" Menampilkan "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(props.transactions.from ?? 0), 1),
                            createTextVNode(" sampai "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(props.transactions.to ?? 0), 1),
                            createTextVNode(" dari "),
                            createVNode("span", { class: "font-medium" }, toDisplayString(props.transactions.total), 1),
                            createTextVNode(" transaksi ")
                          ])
                        ]),
                        createVNode("div", null, [
                          createVNode("nav", {
                            class: "relative z-0 inline-flex rounded-md shadow-sm -space-x-px",
                            "aria-label": "Pagination"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(props.transactions.links, (link) => {
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
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Konfirmasi Hapus"),
                    createVNode("div", { class: "mt-2 px-7 py-3" }, [
                      createVNode("p", { class: "text-sm text-gray-500" }, ' Apakah Anda yakin ingin menghapus transaksi "' + toDisplayString((_b = selectedTransaction.value) == null ? void 0 : _b.description) + '"? Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi saldo petty cash. ', 1)
                    ]),
                    createVNode("div", { class: "flex justify-center space-x-3 mt-4" }, [
                      createVNode("button", {
                        onClick: ($event) => showDeleteModal.value = false,
                        class: "px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      }, " Batal ", 8, ["onClick"]),
                      createVNode("button", {
                        onClick: deleteTransaction,
                        class: "px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      }, " Hapus ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/PettyCash/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
