import { ref, withCtx, unref, createBlock, openBlock, createVNode, createTextVNode, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-COfqywW7.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-BQ7a3c_z.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    transaction: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const showDeleteModal = ref(false);
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
        month: "long",
        year: "numeric"
      });
    };
    const formatDateTime = (datetime) => {
      return new Date(datetime).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
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
    const getStatusLabel = (status) => {
      const labels = {
        pending: "Menunggu",
        approved: "Disetujui",
        rejected: "Ditolak"
      };
      return labels[status] || status;
    };
    const getStatusClass = (status) => {
      const classes = {
        pending: "bg-yellow-100 text-yellow-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800"
      };
      return classes[status] || "bg-sage-100 text-sage-800";
    };
    const getAmountClass = (type) => {
      return type === "expense" ? "text-red-600" : "text-green-600";
    };
    const getFileName = (filePath) => {
      if (!filePath) return "";
      return filePath.split("/").pop() || filePath;
    };
    const getFileUrl = (filePath) => {
      if (!filePath) return "#";
      return `/storage/${filePath}`;
    };
    const confirmDelete = () => {
      showDeleteModal.value = true;
    };
    const deleteTransaction = () => {
      router.delete(route("admin-keuangan.petty-cash.destroy", transaction.id), {
        onSuccess: () => {
          router.visit(route("admin-keuangan.petty-cash.index"));
        }
      });
    };
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.petty-cash.index": "/admin-keuangan/petty-cash",
        "admin-keuangan.petty-cash.edit": "/admin-keuangan/petty-cash",
        "admin-keuangan.petty-cash.destroy": "/admin-keuangan/petty-cash"
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
          var _a, _b, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="p-6 max-w-4xl mx-auto" data-v-1ed75e52${_scopeId}><div class="mb-6" data-v-1ed75e52${_scopeId}><div class="flex items-center justify-between mb-4" data-v-1ed75e52${_scopeId}><div class="flex items-center space-x-4" data-v-1ed75e52${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.petty-cash.index"),
              class: "text-sage-600 hover:text-sage-800 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1ed75e52${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-1ed75e52${_scopeId2}></path></svg>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div data-v-1ed75e52${_scopeId}><h1 class="text-2xl font-bold text-sage-800" data-v-1ed75e52${_scopeId}>Detail Transaksi Petty Cash</h1><p class="text-sm text-sage-600" data-v-1ed75e52${_scopeId}>ID: ${ssrInterpolate(__props.transaction.id)}</p></div></div><div class="flex space-x-3" data-v-1ed75e52${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.petty-cash.edit", __props.transaction.id),
              class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1ed75e52${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-1ed75e52${_scopeId2}></path></svg> Edit `);
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
                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      })
                    ])),
                    createTextVNode(" Edit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" data-v-1ed75e52${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1ed75e52${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-1ed75e52${_scopeId}></path></svg> Hapus </button></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-1ed75e52${_scopeId}><div class="lg:col-span-2 space-y-6" data-v-1ed75e52${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6" data-v-1ed75e52${_scopeId}><h2 class="text-lg font-semibold text-sage-800 mb-4" data-v-1ed75e52${_scopeId}>Informasi Transaksi</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-1ed75e52${_scopeId}><div data-v-1ed75e52${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-1ed75e52${_scopeId}>Tanggal Transaksi</label><p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" data-v-1ed75e52${_scopeId}>${ssrInterpolate(formatDate(__props.transaction.transaction_date))}</p></div><div data-v-1ed75e52${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-1ed75e52${_scopeId}>Jenis Transaksi</label><span class="${ssrRenderClass([getTypeClass(__props.transaction.type), "inline-flex px-3 py-1 rounded-full text-sm font-medium"])}" data-v-1ed75e52${_scopeId}>${ssrInterpolate(getTypeLabel(__props.transaction.type))}</span></div><div data-v-1ed75e52${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-1ed75e52${_scopeId}>Deskripsi</label><p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" data-v-1ed75e52${_scopeId}>${ssrInterpolate(__props.transaction.description)}</p></div><div data-v-1ed75e52${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-1ed75e52${_scopeId}>Kategori</label><p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" data-v-1ed75e52${_scopeId}>${ssrInterpolate(((_a = __props.transaction.category) == null ? void 0 : _a.name) || "-")}</p></div>`);
            if (__props.transaction.so_number) {
              _push2(`<div data-v-1ed75e52${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-1ed75e52${_scopeId}>Nomor Sales Order</label><p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" data-v-1ed75e52${_scopeId}>${ssrInterpolate(__props.transaction.so_number)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div data-v-1ed75e52${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-1ed75e52${_scopeId}>Status</label><span class="${ssrRenderClass([getStatusClass(__props.transaction.status), "inline-flex px-3 py-1 rounded-full text-sm font-medium"])}" data-v-1ed75e52${_scopeId}>${ssrInterpolate(getStatusLabel(__props.transaction.status))}</span></div></div>`);
            if (__props.transaction.notes) {
              _push2(`<div class="mt-6" data-v-1ed75e52${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-1ed75e52${_scopeId}>Catatan</label><p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" data-v-1ed75e52${_scopeId}>${ssrInterpolate(__props.transaction.notes)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.transaction.receipt_file) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6" data-v-1ed75e52${_scopeId}><h2 class="text-lg font-semibold text-sage-800 mb-4" data-v-1ed75e52${_scopeId}>File Bukti</h2><div class="flex items-center space-x-3" data-v-1ed75e52${_scopeId}><svg class="w-8 h-8 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1ed75e52${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-1ed75e52${_scopeId}></path></svg><div data-v-1ed75e52${_scopeId}><p class="text-sm font-medium text-sage-900" data-v-1ed75e52${_scopeId}>${ssrInterpolate(getFileName(__props.transaction.receipt_file))}</p><a${ssrRenderAttr("href", getFileUrl(__props.transaction.receipt_file))} target="_blank" class="text-sm text-sage-600 hover:text-sage-800 transition-colors" data-v-1ed75e52${_scopeId}> Lihat File </a></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-6" data-v-1ed75e52${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6" data-v-1ed75e52${_scopeId}><h2 class="text-lg font-semibold text-sage-800 mb-4" data-v-1ed75e52${_scopeId}>Ringkasan Jumlah</h2><div class="space-y-4" data-v-1ed75e52${_scopeId}><div class="flex justify-between items-center" data-v-1ed75e52${_scopeId}><span class="text-sm font-medium text-sage-700" data-v-1ed75e52${_scopeId}>Jumlah:</span><span class="${ssrRenderClass([getAmountClass(__props.transaction.type), "text-lg font-bold"])}" data-v-1ed75e52${_scopeId}>${ssrInterpolate(__props.transaction.type === "expense" ? "-" : "+")}${ssrInterpolate(formatCurrency(__props.transaction.amount))}</span></div><div class="border-t border-sage-200 pt-4" data-v-1ed75e52${_scopeId}><div class="flex justify-between items-center" data-v-1ed75e52${_scopeId}><span class="text-sm font-medium text-sage-700" data-v-1ed75e52${_scopeId}>Saldo Setelah:</span><span class="text-lg font-bold text-sage-900" data-v-1ed75e52${_scopeId}>${ssrInterpolate(formatCurrency(__props.transaction.balance_after))}</span></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6" data-v-1ed75e52${_scopeId}><h2 class="text-lg font-semibold text-sage-800 mb-4" data-v-1ed75e52${_scopeId}>Informasi Tambahan</h2><div class="space-y-4 text-sm" data-v-1ed75e52${_scopeId}><div data-v-1ed75e52${_scopeId}><span class="font-medium text-sage-700" data-v-1ed75e52${_scopeId}>Dibuat oleh:</span><p class="text-sage-900 mt-1" data-v-1ed75e52${_scopeId}>${ssrInterpolate((_b = __props.transaction.user) == null ? void 0 : _b.name)}</p></div><div data-v-1ed75e52${_scopeId}><span class="font-medium text-sage-700" data-v-1ed75e52${_scopeId}>Tanggal dibuat:</span><p class="text-sage-900 mt-1" data-v-1ed75e52${_scopeId}>${ssrInterpolate(formatDateTime(__props.transaction.created_at))}</p></div>`);
            if (__props.transaction.updated_at !== __props.transaction.created_at) {
              _push2(`<div data-v-1ed75e52${_scopeId}><span class="font-medium text-sage-700" data-v-1ed75e52${_scopeId}>Terakhir diubah:</span><p class="text-sage-900 mt-1" data-v-1ed75e52${_scopeId}>${ssrInterpolate(formatDateTime(__props.transaction.updated_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.transaction.approved_by && __props.transaction.approved_at) {
              _push2(`<div data-v-1ed75e52${_scopeId}><span class="font-medium text-sage-700" data-v-1ed75e52${_scopeId}>Disetujui oleh:</span><p class="text-sage-900 mt-1" data-v-1ed75e52${_scopeId}>${ssrInterpolate((_c = __props.transaction.approver) == null ? void 0 : _c.name)}</p><p class="text-sage-600 text-xs mt-1" data-v-1ed75e52${_scopeId}>${ssrInterpolate(formatDateTime(__props.transaction.approved_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div></div>`);
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-1ed75e52${_scopeId}><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" data-v-1ed75e52${_scopeId}><h3 class="text-lg font-medium text-sage-900 mb-4" data-v-1ed75e52${_scopeId}>Konfirmasi Hapus</h3><p class="text-sm text-sage-600 mb-6" data-v-1ed75e52${_scopeId}> Apakah Anda yakin ingin menghapus transaksi &quot;${ssrInterpolate(__props.transaction.description)}&quot;? Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi saldo petty cash. </p><div class="flex justify-end space-x-3" data-v-1ed75e52${_scopeId}><button class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors" data-v-1ed75e52${_scopeId}> Batal </button><button class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors" data-v-1ed75e52${_scopeId}> Hapus </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "p-6 max-w-4xl mx-auto" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.petty-cash.index"),
                        class: "text-sage-600 hover:text-sage-800 transition-colors"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5",
                            fill: "none",
                            stroke: "currentColor",
                            viewBox: "0 0 24 24"
                          }, [
                            createVNode("path", {
                              "stroke-linecap": "round",
                              "stroke-linejoin": "round",
                              "stroke-width": "2",
                              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                            })
                          ]))
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, "Detail Transaksi Petty Cash"),
                        createVNode("p", { class: "text-sm text-sage-600" }, "ID: " + toDisplayString(__props.transaction.id), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex space-x-3" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.petty-cash.edit", __props.transaction.id),
                        class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                              d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            })
                          ])),
                          createTextVNode(" Edit ")
                        ]),
                        _: 1
                      }, 8, ["href"]),
                      createVNode("button", {
                        onClick: confirmDelete,
                        class: "inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
                            d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          })
                        ])),
                        createTextVNode(" Hapus ")
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Informasi Transaksi"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Tanggal Transaksi"),
                          createVNode("p", { class: "text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" }, toDisplayString(formatDate(__props.transaction.transaction_date)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Jenis Transaksi"),
                          createVNode("span", {
                            class: [getTypeClass(__props.transaction.type), "inline-flex px-3 py-1 rounded-full text-sm font-medium"]
                          }, toDisplayString(getTypeLabel(__props.transaction.type)), 3)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Deskripsi"),
                          createVNode("p", { class: "text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" }, toDisplayString(__props.transaction.description), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Kategori"),
                          createVNode("p", { class: "text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" }, toDisplayString(((_d = __props.transaction.category) == null ? void 0 : _d.name) || "-"), 1)
                        ]),
                        __props.transaction.so_number ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Nomor Sales Order"),
                          createVNode("p", { class: "text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" }, toDisplayString(__props.transaction.so_number), 1)
                        ])) : createCommentVNode("", true),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Status"),
                          createVNode("span", {
                            class: [getStatusClass(__props.transaction.status), "inline-flex px-3 py-1 rounded-full text-sm font-medium"]
                          }, toDisplayString(getStatusLabel(__props.transaction.status)), 3)
                        ])
                      ]),
                      __props.transaction.notes ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6"
                      }, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Catatan"),
                        createVNode("p", { class: "text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" }, toDisplayString(__props.transaction.notes), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    __props.transaction.receipt_file ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6"
                    }, [
                      createVNode("h2", { class: "text-lg font-semibold text-sage-800 mb-4" }, "File Bukti"),
                      createVNode("div", { class: "flex items-center space-x-3" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-8 h-8 text-sage-500",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          })
                        ])),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium text-sage-900" }, toDisplayString(getFileName(__props.transaction.receipt_file)), 1),
                          createVNode("a", {
                            href: getFileUrl(__props.transaction.receipt_file),
                            target: "_blank",
                            class: "text-sm text-sage-600 hover:text-sage-800 transition-colors"
                          }, " Lihat File ", 8, ["href"])
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Ringkasan Jumlah"),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("span", { class: "text-sm font-medium text-sage-700" }, "Jumlah:"),
                          createVNode("span", {
                            class: ["text-lg font-bold", getAmountClass(__props.transaction.type)]
                          }, toDisplayString(__props.transaction.type === "expense" ? "-" : "+") + toDisplayString(formatCurrency(__props.transaction.amount)), 3)
                        ]),
                        createVNode("div", { class: "border-t border-sage-200 pt-4" }, [
                          createVNode("div", { class: "flex justify-between items-center" }, [
                            createVNode("span", { class: "text-sm font-medium text-sage-700" }, "Saldo Setelah:"),
                            createVNode("span", { class: "text-lg font-bold text-sage-900" }, toDisplayString(formatCurrency(__props.transaction.balance_after)), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Informasi Tambahan"),
                      createVNode("div", { class: "space-y-4 text-sm" }, [
                        createVNode("div", null, [
                          createVNode("span", { class: "font-medium text-sage-700" }, "Dibuat oleh:"),
                          createVNode("p", { class: "text-sage-900 mt-1" }, toDisplayString((_e = __props.transaction.user) == null ? void 0 : _e.name), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("span", { class: "font-medium text-sage-700" }, "Tanggal dibuat:"),
                          createVNode("p", { class: "text-sage-900 mt-1" }, toDisplayString(formatDateTime(__props.transaction.created_at)), 1)
                        ]),
                        __props.transaction.updated_at !== __props.transaction.created_at ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("span", { class: "font-medium text-sage-700" }, "Terakhir diubah:"),
                          createVNode("p", { class: "text-sage-900 mt-1" }, toDisplayString(formatDateTime(__props.transaction.updated_at)), 1)
                        ])) : createCommentVNode("", true),
                        __props.transaction.approved_by && __props.transaction.approved_at ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("span", { class: "font-medium text-sage-700" }, "Disetujui oleh:"),
                          createVNode("p", { class: "text-sage-900 mt-1" }, toDisplayString((_f = __props.transaction.approver) == null ? void 0 : _f.name), 1),
                          createVNode("p", { class: "text-sage-600 text-xs mt-1" }, toDisplayString(formatDateTime(__props.transaction.approved_at)), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ])
              ]),
              showDeleteModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 max-w-md w-full mx-4" }, [
                  createVNode("h3", { class: "text-lg font-medium text-sage-900 mb-4" }, "Konfirmasi Hapus"),
                  createVNode("p", { class: "text-sm text-sage-600 mb-6" }, ' Apakah Anda yakin ingin menghapus transaksi "' + toDisplayString(__props.transaction.description) + '"? Tindakan ini tidak dapat dibatalkan dan akan mempengaruhi saldo petty cash. ', 1),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/PettyCash/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1ed75e52"]]);
export {
  Show as default
};
