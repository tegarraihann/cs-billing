import { reactive, ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, withDirectives, vModelText, Fragment, renderList, vModelSelect, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BfoyVaUl.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-B6ie8KC7.js";
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
    const filters = reactive({
      start_date: "",
      end_date: "",
      category_id: "",
      type: "",
      status: ""
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
      router.get(route("admin-keuangan.petty-cash.index"), filters, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const clearFilters = () => {
      Object.keys(filters).forEach((key) => {
        filters[key] = "";
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
        "admin-keuangan.petty-cash.show": "/admin-keuangan/petty-cash",
        "admin-keuangan.petty-cash.edit": "/admin-keuangan/petty-cash",
        "admin-keuangan.petty-cash.destroy": "/admin-keuangan/petty-cash",
        "admin-keuangan.petty-cash.sync-transaction-balances": "/admin-keuangan/petty-cash/sync-transaction-balances"
      };
      let url = routes[name] || "#";
      if (params) {
        url += `/${params}`;
      }
      return url;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="p-6 space-y-6" data-v-55885894${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0" data-v-55885894${_scopeId}><div data-v-55885894${_scopeId}><h1 class="text-2xl font-bold text-sage-800" data-v-55885894${_scopeId}>Petty Cash Management</h1><p class="text-sm text-sage-600" data-v-55885894${_scopeId}>Kelola transaksi petty cash harian</p></div><div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3" data-v-55885894${_scopeId}><div class="text-right" data-v-55885894${_scopeId}><div class="text-xs text-sage-500" data-v-55885894${_scopeId}>Saldo Saat Ini</div><div class="text-xl font-bold text-sage-800" data-v-55885894${_scopeId}>${ssrInterpolate(formatCurrency(__props.currentBalance))}</div></div><div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2" data-v-55885894${_scopeId}><button class="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" title="Sinkronkan saldo kolom tabel dengan saldo saat ini" data-v-55885894${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-55885894${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-55885894${_scopeId}></path></svg> Sync Saldo </button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.petty-cash.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-55885894${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-55885894${_scopeId2}></path></svg> Tambah Transaksi `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 mr-2",
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
                    ])),
                    createTextVNode(" Tambah Transaksi ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6" data-v-55885894${_scopeId}><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-55885894${_scopeId}><div data-v-55885894${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-55885894${_scopeId}>Tanggal Mulai</label><input${ssrRenderAttr("value", filters.start_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm" data-v-55885894${_scopeId}></div><div data-v-55885894${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-55885894${_scopeId}>Tanggal Selesai</label><input${ssrRenderAttr("value", filters.end_date)} type="date" class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm" data-v-55885894${_scopeId}></div><div data-v-55885894${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-55885894${_scopeId}>Kategori</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm" data-v-55885894${_scopeId}><option value="" data-v-55885894${ssrIncludeBooleanAttr(Array.isArray(filters.category_id) ? ssrLooseContain(filters.category_id, "") : ssrLooseEqual(filters.category_id, "")) ? " selected" : ""}${_scopeId}>Semua Kategori</option><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)} data-v-55885894${ssrIncludeBooleanAttr(Array.isArray(filters.category_id) ? ssrLooseContain(filters.category_id, category.id) : ssrLooseEqual(filters.category_id, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select></div><div data-v-55885894${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-55885894${_scopeId}>Jenis</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm" data-v-55885894${_scopeId}><option value="" data-v-55885894${ssrIncludeBooleanAttr(Array.isArray(filters.type) ? ssrLooseContain(filters.type, "") : ssrLooseEqual(filters.type, "")) ? " selected" : ""}${_scopeId}>Semua Jenis</option><option value="expense" data-v-55885894${ssrIncludeBooleanAttr(Array.isArray(filters.type) ? ssrLooseContain(filters.type, "expense") : ssrLooseEqual(filters.type, "expense")) ? " selected" : ""}${_scopeId}>Pengeluaran</option><option value="topup" data-v-55885894${ssrIncludeBooleanAttr(Array.isArray(filters.type) ? ssrLooseContain(filters.type, "topup") : ssrLooseEqual(filters.type, "topup")) ? " selected" : ""}${_scopeId}>Top Up</option><option value="refund" data-v-55885894${ssrIncludeBooleanAttr(Array.isArray(filters.type) ? ssrLooseContain(filters.type, "refund") : ssrLooseEqual(filters.type, "refund")) ? " selected" : ""}${_scopeId}>Refund</option></select></div></div><div class="flex justify-end space-x-3 mt-4" data-v-55885894${_scopeId}><button class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors" data-v-55885894${_scopeId}> Clear </button><button class="px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-lg hover:bg-sage-700 transition-colors" data-v-55885894${_scopeId}> Filter </button></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-55885894${_scopeId}><div class="px-6 py-4 border-b border-sage-200" data-v-55885894${_scopeId}><h3 class="text-lg font-medium text-sage-800" data-v-55885894${_scopeId}>Daftar Transaksi</h3></div><div class="overflow-x-auto" data-v-55885894${_scopeId}><table class="w-full" data-v-55885894${_scopeId}><thead class="bg-sage-50" data-v-55885894${_scopeId}><tr data-v-55885894${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-55885894${_scopeId}>Tanggal</th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-55885894${_scopeId}>Deskripsi</th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-55885894${_scopeId}>Kategori</th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-55885894${_scopeId}>Jenis</th><th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-55885894${_scopeId}>Jumlah</th><th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-55885894${_scopeId}>Saldo</th><th class="px-6 py-3 text-center text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-55885894${_scopeId}>Aksi</th></tr></thead><tbody class="bg-white divide-y divide-sage-200" data-v-55885894${_scopeId}><!--[-->`);
            ssrRenderList(__props.transactions.data, (transaction) => {
              var _a2;
              _push2(`<tr class="hover:bg-sage-50" data-v-55885894${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-sage-900" data-v-55885894${_scopeId}>${ssrInterpolate(formatDate(transaction.transaction_date))}</td><td class="px-6 py-4 text-sm text-sage-900" data-v-55885894${_scopeId}><div class="font-medium" data-v-55885894${_scopeId}>${ssrInterpolate(transaction.description)}</div>`);
              if (transaction.so_number) {
                _push2(`<div class="text-xs text-sage-500" data-v-55885894${_scopeId}> SO: ${ssrInterpolate(transaction.so_number)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap text-sm text-sage-900" data-v-55885894${_scopeId}>${ssrInterpolate((_a2 = transaction.category) == null ? void 0 : _a2.name)}</td><td class="px-6 py-4 whitespace-nowrap text-sm" data-v-55885894${_scopeId}><span class="${ssrRenderClass([getTypeClass(transaction.type), "px-2 py-1 rounded-full text-xs font-medium"])}" data-v-55885894${_scopeId}>${ssrInterpolate(getTypeLabel(transaction.type))}</span></td><td class="${ssrRenderClass([getAmountClass(transaction.type), "px-6 py-4 whitespace-nowrap text-sm text-right font-medium"])}" data-v-55885894${_scopeId}>${ssrInterpolate(transaction.type === "expense" ? "-" : "+")}${ssrInterpolate(formatCurrency(transaction.amount))}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-right text-sage-900" data-v-55885894${_scopeId}>${ssrInterpolate(formatCurrency(transaction.balance_after))}</td><td class="px-6 py-4 whitespace-nowrap text-center text-sm" data-v-55885894${_scopeId}><div class="flex items-center justify-center space-x-2" data-v-55885894${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.petty-cash.show", transaction.id),
                class: "text-sage-600 hover:text-sage-800 transition-colors",
                title: "Lihat Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-55885894${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-55885894${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-55885894${_scopeId2}></path></svg>`);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        }),
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        })
                      ]))
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
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-55885894${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-55885894${_scopeId2}></path></svg>`);
                  } else {
                    return [
                      (openBlock(), createBlock("svg", {
                        class: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        })
                      ]))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="text-red-600 hover:text-red-800 transition-colors" title="Hapus" data-v-55885894${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-55885894${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-55885894${_scopeId}></path></svg></button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.transactions.data.length === 0) {
              _push2(`<tr data-v-55885894${_scopeId}><td colspan="7" class="px-6 py-12 text-center text-sm text-sage-500" data-v-55885894${_scopeId}> Tidak ada transaksi ditemukan </td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.transactions.links.length > 3) {
              _push2(`<div class="px-6 py-4 border-t border-sage-200" data-v-55885894${_scopeId}><div class="flex items-center justify-between" data-v-55885894${_scopeId}><div class="text-sm text-sage-700" data-v-55885894${_scopeId}> Menampilkan ${ssrInterpolate(__props.transactions.from ?? 0)} sampai ${ssrInterpolate(__props.transactions.to ?? 0)} dari ${ssrInterpolate(__props.transactions.total)} transaksi </div><nav class="flex space-x-1" data-v-55885894${_scopeId}><!--[-->`);
              ssrRenderList(__props.transactions.links, (link) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: link.label,
                  href: link.url,
                  class: [
                    "px-3 py-2 text-sm rounded-lg transition-colors",
                    link.active ? "bg-sage-600 text-white" : link.url ? "text-sage-700 hover:bg-sage-100" : "text-sage-400 cursor-not-allowed"
                  ]
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></nav></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-55885894${_scopeId}><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" data-v-55885894${_scopeId}><h3 class="text-lg font-medium text-sage-900 mb-4" data-v-55885894${_scopeId}>Konfirmasi Hapus</h3><p class="text-sm text-sage-600 mb-6" data-v-55885894${_scopeId}> Apakah Anda yakin ingin menghapus transaksi &quot;${ssrInterpolate((_a = selectedTransaction.value) == null ? void 0 : _a.description)}&quot;? Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi saldo petty cash. </p><div class="flex justify-end space-x-3" data-v-55885894${_scopeId}><button class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors" data-v-55885894${_scopeId}> Batal </button><button class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors" data-v-55885894${_scopeId}> Hapus </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "p-6 space-y-6" }, [
                createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0" }, [
                  createVNode("div", null, [
                    createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, "Petty Cash Management"),
                    createVNode("p", { class: "text-sm text-sage-600" }, "Kelola transaksi petty cash harian")
                  ]),
                  createVNode("div", { class: "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3" }, [
                    createVNode("div", { class: "text-right" }, [
                      createVNode("div", { class: "text-xs text-sage-500" }, "Saldo Saat Ini"),
                      createVNode("div", { class: "text-xl font-bold text-sage-800" }, toDisplayString(formatCurrency(__props.currentBalance)), 1)
                    ]),
                    createVNode("div", { class: "flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2" }, [
                      createVNode("button", {
                        onClick: syncTransactionBalances,
                        class: "inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                        title: "Sinkronkan saldo kolom tabel dengan saldo saat ini"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-4 h-4 mr-2",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          })
                        ])),
                        createTextVNode(" Sync Saldo ")
                      ]),
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.petty-cash.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 mr-2",
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
                          ])),
                          createTextVNode(" Tambah Transaksi ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Tanggal Mulai"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => filters.start_date = $event,
                        type: "date",
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, filters.start_date]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Tanggal Selesai"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => filters.end_date = $event,
                        type: "date",
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, filters.end_date]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Kategori"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => filters.category_id = $event,
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                      }, [
                        createVNode("option", { value: "" }, "Semua Kategori"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                          return openBlock(), createBlock("option", {
                            key: category.id,
                            value: category.id
                          }, toDisplayString(category.name), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, filters.category_id]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Jenis"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => filters.type = $event,
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500 text-sm"
                      }, [
                        createVNode("option", { value: "" }, "Semua Jenis"),
                        createVNode("option", { value: "expense" }, "Pengeluaran"),
                        createVNode("option", { value: "topup" }, "Top Up"),
                        createVNode("option", { value: "refund" }, "Refund")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, filters.type]
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-end space-x-3 mt-4" }, [
                    createVNode("button", {
                      onClick: clearFilters,
                      class: "px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
                    }, " Clear "),
                    createVNode("button", {
                      onClick: applyFilters,
                      class: "px-4 py-2 text-sm font-medium text-white bg-sage-600 rounded-lg hover:bg-sage-700 transition-colors"
                    }, " Filter ")
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-medium text-sage-800" }, "Daftar Transaksi")
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, "Tanggal"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, "Deskripsi"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, "Kategori"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, "Jenis"),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" }, "Jumlah"),
                          createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" }, "Saldo"),
                          createVNode("th", { class: "px-6 py-3 text-center text-xs font-medium text-sage-500 uppercase tracking-wider" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.transactions.data, (transaction) => {
                          var _a2;
                          return openBlock(), createBlock("tr", {
                            key: transaction.id,
                            class: "hover:bg-sage-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-sage-900" }, toDisplayString(formatDate(transaction.transaction_date)), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-sage-900" }, [
                              createVNode("div", { class: "font-medium" }, toDisplayString(transaction.description), 1),
                              transaction.so_number ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "text-xs text-sage-500"
                              }, " SO: " + toDisplayString(transaction.so_number), 1)) : createCommentVNode("", true)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-sage-900" }, toDisplayString((_a2 = transaction.category) == null ? void 0 : _a2.name), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm" }, [
                              createVNode("span", {
                                class: [getTypeClass(transaction.type), "px-2 py-1 rounded-full text-xs font-medium"]
                              }, toDisplayString(getTypeLabel(transaction.type)), 3)
                            ]),
                            createVNode("td", {
                              class: ["px-6 py-4 whitespace-nowrap text-sm text-right font-medium", getAmountClass(transaction.type)]
                            }, toDisplayString(transaction.type === "expense" ? "-" : "+") + toDisplayString(formatCurrency(transaction.amount)), 3),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-right text-sage-900" }, toDisplayString(formatCurrency(transaction.balance_after)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-center text-sm" }, [
                              createVNode("div", { class: "flex items-center justify-center space-x-2" }, [
                                createVNode(unref(Link), {
                                  href: unref(route)("admin-keuangan.petty-cash.show", transaction.id),
                                  class: "text-sage-600 hover:text-sage-800 transition-colors",
                                  title: "Lihat Detail"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock("svg", {
                                      class: "w-4 h-4",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                      }),
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                      })
                                    ]))
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode(unref(Link), {
                                  href: unref(route)("admin-keuangan.petty-cash.edit", transaction.id),
                                  class: "text-blue-600 hover:text-blue-800 transition-colors",
                                  title: "Edit"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock("svg", {
                                      class: "w-4 h-4",
                                      fill: "none",
                                      stroke: "currentColor",
                                      viewBox: "0 0 24 24"
                                    }, [
                                      createVNode("path", {
                                        "stroke-linecap": "round",
                                        "stroke-linejoin": "round",
                                        "stroke-width": "2",
                                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      })
                                    ]))
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => confirmDelete(transaction),
                                  class: "text-red-600 hover:text-red-800 transition-colors",
                                  title: "Hapus"
                                }, [
                                  (openBlock(), createBlock("svg", {
                                    class: "w-4 h-4",
                                    fill: "none",
                                    stroke: "currentColor",
                                    viewBox: "0 0 24 24"
                                  }, [
                                    createVNode("path", {
                                      "stroke-linecap": "round",
                                      "stroke-linejoin": "round",
                                      "stroke-width": "2",
                                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    })
                                  ]))
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128)),
                        __props.transactions.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "7",
                            class: "px-6 py-12 text-center text-sm text-sage-500"
                          }, " Tidak ada transaksi ditemukan ")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  __props.transactions.links.length > 3 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "px-6 py-4 border-t border-sage-200"
                  }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-sm text-sage-700" }, " Menampilkan " + toDisplayString(__props.transactions.from ?? 0) + " sampai " + toDisplayString(__props.transactions.to ?? 0) + " dari " + toDisplayString(__props.transactions.total) + " transaksi ", 1),
                      createVNode("nav", { class: "flex space-x-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.transactions.links, (link) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: link.label,
                            href: link.url,
                            class: [
                              "px-3 py-2 text-sm rounded-lg transition-colors",
                              link.active ? "bg-sage-600 text-white" : link.url ? "text-sage-700 hover:bg-sage-100" : "text-sage-400 cursor-not-allowed"
                            ],
                            innerHTML: link.label
                          }, null, 8, ["href", "class", "innerHTML"]);
                        }), 128))
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              showDeleteModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 max-w-md w-full mx-4" }, [
                  createVNode("h3", { class: "text-lg font-medium text-sage-900 mb-4" }, "Konfirmasi Hapus"),
                  createVNode("p", { class: "text-sm text-sage-600 mb-6" }, ' Apakah Anda yakin ingin menghapus transaksi "' + toDisplayString((_b = selectedTransaction.value) == null ? void 0 : _b.description) + '"? Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi saldo petty cash. ', 1),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: ($event) => showDeleteModal.value = false,
                      class: "px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
                    }, " Batal ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: deleteTransaction,
                      class: "px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                    }, " Hapus ")
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
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-55885894"]]);
export {
  Index as default
};
