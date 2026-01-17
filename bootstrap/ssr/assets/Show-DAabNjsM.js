import { ref, withCtx, unref, createBlock, openBlock, createVNode, createTextVNode, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { Edit, CheckCircle, Trash2, DollarSign, ArrowLeft, Download } from "lucide-vue-next";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-DHZZ6J07.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-BKkkTg7p.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    generalExpense: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const showDeleteModal = ref(false);
    const showApproveModal = ref(false);
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
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const formatPeriod = (month, year) => {
      const monthNames = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
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
    const confirmDelete = () => {
      showDeleteModal.value = true;
    };
    const deleteExpense = () => {
      router.delete(route("admin-keuangan.general-expenses.destroy", props.generalExpense.id), {
        onSuccess: () => {
          showDeleteModal.value = false;
        }
      });
    };
    const approveExpense = () => {
      showApproveModal.value = true;
    };
    const confirmApprove = () => {
      router.post(route("admin-keuangan.general-expenses.approve", props.generalExpense.id), {}, {
        onSuccess: () => {
          showApproveModal.value = false;
        }
      });
    };
    const exportExpense = () => {
      window.open(route("admin-keuangan.general-expenses.export", { id: props.generalExpense.id }), "_blank");
    };
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.general-expenses.index": "/admin-keuangan/general-expenses",
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
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Detail Pengeluaran Lain-lain" }, null, _parent2, _scopeId));
            _push2(`<div class="p-6 max-w-6xl mx-auto"${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><div class="flex items-center space-x-4"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.general-expenses.index"),
              class: "text-sage-600 hover:text-sage-800 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId2}></path></svg>`);
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
            _push2(`<div${_scopeId}><h1 class="text-2xl font-bold text-sage-800"${_scopeId}>Detail Pengeluaran Lain-lain</h1><p class="text-sm text-sage-600"${_scopeId}>ID: ${ssrInterpolate(__props.generalExpense.id)}</p></div></div><div class="flex items-center space-x-3"${_scopeId}><span class="${ssrRenderClass([getStatusClass(__props.generalExpense.status), "px-3 py-1 rounded-full text-sm font-medium"])}"${_scopeId}>${ssrInterpolate(getStatusLabel(__props.generalExpense.status))}</span><div class="flex space-x-2"${_scopeId}>`);
            if (__props.generalExpense.status === "draft") {
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.general-expenses.edit", __props.generalExpense.id),
                class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Edit), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` Edit `);
                  } else {
                    return [
                      createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                      createTextVNode(" Edit ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (__props.generalExpense.status === "draft" && __props.generalExpense.can_approve) {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(CheckCircle), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Approve </button>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.generalExpense.status === "draft") {
              _push2(`<button class="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Hapus </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><div class="lg:col-span-2 space-y-6"${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6"${_scopeId}><h2 class="text-lg font-semibold text-sage-800 mb-4"${_scopeId}>Informasi Pengeluaran</h2><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}>Tanggal Pengeluaran</label><p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg"${_scopeId}>${ssrInterpolate(formatDate(__props.generalExpense.expense_date))}</p></div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}>Kategori</label><p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg"${_scopeId}>${ssrInterpolate(__props.generalExpense.category)}</p></div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}>Periode</label><p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg"${_scopeId}>${ssrInterpolate(formatPeriod(__props.generalExpense.period_month, __props.generalExpense.period_year))}</p></div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}>Status</label><span class="${ssrRenderClass([getStatusClass(__props.generalExpense.status), "inline-flex px-3 py-1 rounded-full text-sm font-medium"])}"${_scopeId}>${ssrInterpolate(getStatusLabel(__props.generalExpense.status))}</span></div></div>`);
            if (__props.generalExpense.notes) {
              _push2(`<div class="mt-6"${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}>Catatan</label><p class="text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg"${_scopeId}>${ssrInterpolate(__props.generalExpense.notes)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6"${_scopeId}><h2 class="text-lg font-semibold text-sage-800 mb-4"${_scopeId}>Detail Item Pengeluaran</h2><div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.generalExpense.items, (item, index) => {
              _push2(`<div class="p-4 border border-sage-200 rounded-lg bg-sage-50"${_scopeId}><div class="flex justify-between items-start mb-3"${_scopeId}><h3 class="text-sm font-medium text-sage-800"${_scopeId}>Item #${ssrInterpolate(index + 1)}</h3><span class="text-lg font-semibold text-sage-900"${_scopeId}>${ssrInterpolate(formatCurrency(item.amount))}</span></div><div class="grid grid-cols-1 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1"${_scopeId}>Deskripsi</label><p class="text-sm text-sage-900"${_scopeId}>${ssrInterpolate(item.description)}</p></div>`);
              if (item.notes) {
                _push2(`<div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-1"${_scopeId}>Catatan Item</label><p class="text-sm text-sage-600"${_scopeId}>${ssrInterpolate(item.notes)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            });
            _push2(`<!--]-->`);
            if (!__props.generalExpense.items || __props.generalExpense.items.length === 0) {
              _push2(`<div class="text-center py-8 text-gray-500"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(DollarSign), { class: "w-12 h-12 mx-auto mb-4 text-gray-300" }, null, _parent2, _scopeId));
              _push2(`<p class="text-sm"${_scopeId}>Tidak ada item pengeluaran</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.generalExpense.items && __props.generalExpense.items.length > 0) {
              _push2(`<div class="mt-6 pt-4 border-t border-sage-200"${_scopeId}><div class="flex justify-between items-center"${_scopeId}><span class="text-sm font-medium text-sage-700"${_scopeId}>Total ${ssrInterpolate(__props.generalExpense.items.length)} item${ssrInterpolate(__props.generalExpense.items.length > 1 ? "s" : "")}:</span><span class="text-lg font-bold text-sage-900"${_scopeId}>${ssrInterpolate(formatCurrency(__props.generalExpense.total_amount))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="space-y-6"${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6"${_scopeId}><h2 class="text-lg font-semibold text-sage-800 mb-4"${_scopeId}>Ringkasan Jumlah</h2><div class="space-y-4"${_scopeId}><div class="text-center"${_scopeId}><div class="text-3xl font-bold text-red-600 mb-2"${_scopeId}>${ssrInterpolate(formatCurrency(__props.generalExpense.total_amount))}</div><div class="text-sm text-sage-600"${_scopeId}> Total Pengeluaran </div></div><div class="border-t border-sage-200 pt-4"${_scopeId}><div class="flex justify-between items-center text-sm"${_scopeId}><span class="text-sage-600"${_scopeId}>Jumlah Item:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(((_a = __props.generalExpense.items) == null ? void 0 : _a.length) || 0)}</span></div><div class="flex justify-between items-center text-sm mt-2"${_scopeId}><span class="text-sage-600"${_scopeId}>Rata-rata per Item:</span><span class="font-medium"${_scopeId}>${ssrInterpolate(((_b = __props.generalExpense.items) == null ? void 0 : _b.length) > 0 ? formatCurrency(__props.generalExpense.total_amount / __props.generalExpense.items.length) : formatCurrency(0))}</span></div></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6"${_scopeId}><h2 class="text-lg font-semibold text-sage-800 mb-4"${_scopeId}>Informasi Tambahan</h2><div class="space-y-4 text-sm"${_scopeId}><div${_scopeId}><span class="font-medium text-sage-700"${_scopeId}>Dibuat oleh:</span><p class="text-sage-900 mt-1"${_scopeId}>${ssrInterpolate(((_c = __props.generalExpense.creator) == null ? void 0 : _c.name) || "-")}</p></div><div${_scopeId}><span class="font-medium text-sage-700"${_scopeId}>Tanggal dibuat:</span><p class="text-sage-900 mt-1"${_scopeId}>${ssrInterpolate(formatDateTime(__props.generalExpense.created_at))}</p></div>`);
            if (__props.generalExpense.updated_at !== __props.generalExpense.created_at) {
              _push2(`<div${_scopeId}><span class="font-medium text-sage-700"${_scopeId}>Terakhir diubah:</span><p class="text-sage-900 mt-1"${_scopeId}>${ssrInterpolate(formatDateTime(__props.generalExpense.updated_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.generalExpense.approved_by && __props.generalExpense.approved_at) {
              _push2(`<div${_scopeId}><span class="font-medium text-sage-700"${_scopeId}>Disetujui oleh:</span><p class="text-sage-900 mt-1"${_scopeId}>${ssrInterpolate(((_d = __props.generalExpense.approver) == null ? void 0 : _d.name) || "-")}</p><p class="text-sage-600 text-xs mt-1"${_scopeId}>${ssrInterpolate(formatDateTime(__props.generalExpense.approved_at))}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6"${_scopeId}><h2 class="text-lg font-semibold text-sage-800 mb-4"${_scopeId}>Aksi</h2><div class="space-y-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.general-expenses.index"),
              class: "w-full inline-flex justify-center items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Kembali ke Daftar `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Kembali ke Daftar ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Download), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Export Detail </button></div></div></div></div></div>`);
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"${_scopeId}><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4"${_scopeId}><h3 class="text-lg font-medium text-sage-900 mb-4"${_scopeId}>Konfirmasi Hapus</h3><p class="text-sm text-sage-600 mb-6"${_scopeId}> Apakah Anda yakin ingin menghapus pengeluaran kategori &quot;${ssrInterpolate(__props.generalExpense.category)}&quot;? Tindakan ini tidak dapat dibatalkan. </p><div class="flex justify-end space-x-3"${_scopeId}><button class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"${_scopeId}> Batal </button><button class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"${_scopeId}> Hapus </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (showApproveModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"${_scopeId}><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4"${_scopeId}><h3 class="text-lg font-medium text-sage-900 mb-4"${_scopeId}>Konfirmasi Approve</h3><p class="text-sm text-sage-600 mb-6"${_scopeId}> Apakah Anda yakin ingin menyetujui pengeluaran kategori &quot;${ssrInterpolate(__props.generalExpense.category)}&quot; dengan total ${ssrInterpolate(formatCurrency(__props.generalExpense.total_amount))}? </p><div class="flex justify-end space-x-3"${_scopeId}><button class="px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"${_scopeId}> Batal </button><button class="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"${_scopeId}> Approve </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Detail Pengeluaran Lain-lain" }),
              createVNode("div", { class: "p-6 max-w-6xl mx-auto" }, [
                createVNode("div", { class: "mb-6" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                    createVNode("div", { class: "flex items-center space-x-4" }, [
                      createVNode(unref(Link), {
                        href: unref(route)("admin-keuangan.general-expenses.index"),
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
                        createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, "Detail Pengeluaran Lain-lain"),
                        createVNode("p", { class: "text-sm text-sage-600" }, "ID: " + toDisplayString(__props.generalExpense.id), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center space-x-3" }, [
                      createVNode("span", {
                        class: [getStatusClass(__props.generalExpense.status), "px-3 py-1 rounded-full text-sm font-medium"]
                      }, toDisplayString(getStatusLabel(__props.generalExpense.status)), 3),
                      createVNode("div", { class: "flex space-x-2" }, [
                        __props.generalExpense.status === "draft" ? (openBlock(), createBlock(unref(Link), {
                          key: 0,
                          href: unref(route)("admin-keuangan.general-expenses.edit", __props.generalExpense.id),
                          class: "inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Edit ")
                          ]),
                          _: 1
                        }, 8, ["href"])) : createCommentVNode("", true),
                        __props.generalExpense.status === "draft" && __props.generalExpense.can_approve ? (openBlock(), createBlock("button", {
                          key: 1,
                          onClick: approveExpense,
                          class: "inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        }, [
                          createVNode(unref(CheckCircle), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Approve ")
                        ])) : createCommentVNode("", true),
                        __props.generalExpense.status === "draft" ? (openBlock(), createBlock("button", {
                          key: 2,
                          onClick: confirmDelete,
                          class: "inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        }, [
                          createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Hapus ")
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Informasi Pengeluaran"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Tanggal Pengeluaran"),
                          createVNode("p", { class: "text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" }, toDisplayString(formatDate(__props.generalExpense.expense_date)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Kategori"),
                          createVNode("p", { class: "text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" }, toDisplayString(__props.generalExpense.category), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Periode"),
                          createVNode("p", { class: "text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" }, toDisplayString(formatPeriod(__props.generalExpense.period_month, __props.generalExpense.period_year)), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Status"),
                          createVNode("span", {
                            class: [getStatusClass(__props.generalExpense.status), "inline-flex px-3 py-1 rounded-full text-sm font-medium"]
                          }, toDisplayString(getStatusLabel(__props.generalExpense.status)), 3)
                        ])
                      ]),
                      __props.generalExpense.notes ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6"
                      }, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Catatan"),
                        createVNode("p", { class: "text-sm text-sage-900 bg-sage-50 px-3 py-2 rounded-lg" }, toDisplayString(__props.generalExpense.notes), 1)
                      ])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Detail Item Pengeluaran"),
                      createVNode("div", { class: "space-y-4" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.generalExpense.items, (item, index) => {
                          return openBlock(), createBlock("div", {
                            key: item.id,
                            class: "p-4 border border-sage-200 rounded-lg bg-sage-50"
                          }, [
                            createVNode("div", { class: "flex justify-between items-start mb-3" }, [
                              createVNode("h3", { class: "text-sm font-medium text-sage-800" }, "Item #" + toDisplayString(index + 1), 1),
                              createVNode("span", { class: "text-lg font-semibold text-sage-900" }, toDisplayString(formatCurrency(item.amount)), 1)
                            ]),
                            createVNode("div", { class: "grid grid-cols-1 gap-4" }, [
                              createVNode("div", null, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, "Deskripsi"),
                                createVNode("p", { class: "text-sm text-sage-900" }, toDisplayString(item.description), 1)
                              ]),
                              item.notes ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-1" }, "Catatan Item"),
                                createVNode("p", { class: "text-sm text-sage-600" }, toDisplayString(item.notes), 1)
                              ])) : createCommentVNode("", true)
                            ])
                          ]);
                        }), 128)),
                        !__props.generalExpense.items || __props.generalExpense.items.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center py-8 text-gray-500"
                        }, [
                          createVNode(unref(DollarSign), { class: "w-12 h-12 mx-auto mb-4 text-gray-300" }),
                          createVNode("p", { class: "text-sm" }, "Tidak ada item pengeluaran")
                        ])) : createCommentVNode("", true)
                      ]),
                      __props.generalExpense.items && __props.generalExpense.items.length > 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mt-6 pt-4 border-t border-sage-200"
                      }, [
                        createVNode("div", { class: "flex justify-between items-center" }, [
                          createVNode("span", { class: "text-sm font-medium text-sage-700" }, "Total " + toDisplayString(__props.generalExpense.items.length) + " item" + toDisplayString(__props.generalExpense.items.length > 1 ? "s" : "") + ":", 1),
                          createVNode("span", { class: "text-lg font-bold text-sage-900" }, toDisplayString(formatCurrency(__props.generalExpense.total_amount)), 1)
                        ])
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Ringkasan Jumlah"),
                      createVNode("div", { class: "space-y-4" }, [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("div", { class: "text-3xl font-bold text-red-600 mb-2" }, toDisplayString(formatCurrency(__props.generalExpense.total_amount)), 1),
                          createVNode("div", { class: "text-sm text-sage-600" }, " Total Pengeluaran ")
                        ]),
                        createVNode("div", { class: "border-t border-sage-200 pt-4" }, [
                          createVNode("div", { class: "flex justify-between items-center text-sm" }, [
                            createVNode("span", { class: "text-sage-600" }, "Jumlah Item:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(((_e = __props.generalExpense.items) == null ? void 0 : _e.length) || 0), 1)
                          ]),
                          createVNode("div", { class: "flex justify-between items-center text-sm mt-2" }, [
                            createVNode("span", { class: "text-sage-600" }, "Rata-rata per Item:"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(((_f = __props.generalExpense.items) == null ? void 0 : _f.length) > 0 ? formatCurrency(__props.generalExpense.total_amount / __props.generalExpense.items.length) : formatCurrency(0)), 1)
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Informasi Tambahan"),
                      createVNode("div", { class: "space-y-4 text-sm" }, [
                        createVNode("div", null, [
                          createVNode("span", { class: "font-medium text-sage-700" }, "Dibuat oleh:"),
                          createVNode("p", { class: "text-sage-900 mt-1" }, toDisplayString(((_g = __props.generalExpense.creator) == null ? void 0 : _g.name) || "-"), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("span", { class: "font-medium text-sage-700" }, "Tanggal dibuat:"),
                          createVNode("p", { class: "text-sage-900 mt-1" }, toDisplayString(formatDateTime(__props.generalExpense.created_at)), 1)
                        ]),
                        __props.generalExpense.updated_at !== __props.generalExpense.created_at ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("span", { class: "font-medium text-sage-700" }, "Terakhir diubah:"),
                          createVNode("p", { class: "text-sage-900 mt-1" }, toDisplayString(formatDateTime(__props.generalExpense.updated_at)), 1)
                        ])) : createCommentVNode("", true),
                        __props.generalExpense.approved_by && __props.generalExpense.approved_at ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("span", { class: "font-medium text-sage-700" }, "Disetujui oleh:"),
                          createVNode("p", { class: "text-sage-900 mt-1" }, toDisplayString(((_h = __props.generalExpense.approver) == null ? void 0 : _h.name) || "-"), 1),
                          createVNode("p", { class: "text-sage-600 text-xs mt-1" }, toDisplayString(formatDateTime(__props.generalExpense.approved_at)), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                      createVNode("h2", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Aksi"),
                      createVNode("div", { class: "space-y-3" }, [
                        createVNode(unref(Link), {
                          href: unref(route)("admin-keuangan.general-expenses.index"),
                          class: "w-full inline-flex justify-center items-center px-4 py-2 bg-sage-600 text-white text-sm font-medium rounded-lg hover:bg-sage-700 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Kembali ke Daftar ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          onClick: exportExpense,
                          class: "w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        }, [
                          createVNode(unref(Download), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Export Detail ")
                        ])
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
                  createVNode("p", { class: "text-sm text-sage-600 mb-6" }, ' Apakah Anda yakin ingin menghapus pengeluaran kategori "' + toDisplayString(__props.generalExpense.category) + '"? Tindakan ini tidak dapat dibatalkan. ', 1),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: ($event) => showDeleteModal.value = false,
                      class: "px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
                    }, " Batal ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: deleteExpense,
                      class: "px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
                    }, " Hapus ")
                  ])
                ])
              ])) : createCommentVNode("", true),
              showApproveModal.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 max-w-md w-full mx-4" }, [
                  createVNode("h3", { class: "text-lg font-medium text-sage-900 mb-4" }, "Konfirmasi Approve"),
                  createVNode("p", { class: "text-sm text-sage-600 mb-6" }, ' Apakah Anda yakin ingin menyetujui pengeluaran kategori "' + toDisplayString(__props.generalExpense.category) + '" dengan total ' + toDisplayString(formatCurrency(__props.generalExpense.total_amount)) + "? ", 1),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: ($event) => showApproveModal.value = false,
                      class: "px-4 py-2 text-sm font-medium text-sage-700 bg-white border border-sage-300 rounded-lg hover:bg-sage-50 transition-colors"
                    }, " Batal ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: confirmApprove,
                      class: "px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                    }, " Approve ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/GeneralExpenses/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
