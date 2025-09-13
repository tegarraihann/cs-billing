import { reactive, computed, ref, watch, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withDirectives, vModelText, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-yyCbRIkG.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-egdkIpsX.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    customers: Object,
    filters: Object
  },
  setup(__props) {
    var _a;
    const props = __props;
    const routes = {
      "admin-keuangan.customers.export.pdf": "/admin-keuangan/customers/export/pdf"
    };
    const route = (name, params) => {
      if (routes[name]) {
        return typeof routes[name] === "function" ? routes[name](params) : routes[name];
      }
      return window.route ? window.route(name, params) : `#${name}`;
    };
    const form = reactive({
      search: ((_a = props.filters) == null ? void 0 : _a.search) || ""
    });
    const exportPdfUrl = computed(() => {
      const baseUrl = route("admin-keuangan.customers.export.pdf");
      const params = new URLSearchParams();
      if (form.search) {
        params.append("search", form.search);
      }
      return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    });
    const search = () => {
      const params = {};
      if (form.search) params.search = form.search;
      router.get(route("admin-keuangan.customers.index"), params, {
        preserveState: true,
        replace: true
      });
    };
    const showDeleteDialog = ref(false);
    const customerToDelete = ref(null);
    const deleteCustomer = (customer) => {
      customerToDelete.value = customer;
      showDeleteDialog.value = true;
    };
    const confirmDelete = () => {
      if (customerToDelete.value) {
        router.delete(route("admin-keuangan.customers.destroy", customerToDelete.value.id), {
          onSuccess: () => {
            router.get(route("admin-keuangan.customers.index"), {
              search: form.search
            }, {
              preserveState: true,
              replace: true
            });
          },
          onError: (errors) => {
            alert("Terjadi kesalahan saat menghapus customer: " + Object.values(errors).join(", "));
          }
        });
      }
      showDeleteDialog.value = false;
      customerToDelete.value = null;
    };
    const cancelDelete = () => {
      showDeleteDialog.value = false;
      customerToDelete.value = null;
    };
    watch(
      () => form.search,
      () => {
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
          search();
        }, 500);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-eb763866${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-eb763866${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-eb763866${_scopeId}><div data-v-eb763866${_scopeId}><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-eb763866${_scopeId}> Manajemen Data Pelanggan </h2><p class="text-sage-600" data-v-eb763866${_scopeId}> Kelola data pelanggan dan informasi kontak </p></div><div class="mt-4 sm:mt-0 flex space-x-2" data-v-eb763866${_scopeId}><a${ssrRenderAttr("href", exportPdfUrl.value)} target="_blank" class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-eb763866${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb763866${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" data-v-eb763866${_scopeId}></path></svg> Export PDF </a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: route("admin-keuangan.customers.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb763866${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-eb763866${_scopeId2}></path></svg> Tambah Data Pelanggan `);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 mr-2",
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
                    createTextVNode(" Tambah Data Pelanggan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-eb763866${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-eb763866${_scopeId}><div data-v-eb763866${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-eb763866${_scopeId}>Cari Data</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari nama perusahaan, PIC, email, marketing..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-eb763866${_scopeId}></div><div class="flex items-end" data-v-eb763866${_scopeId}><button class="w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-eb763866${_scopeId}> Cari </button></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-eb763866${_scopeId}><div class="px-6 py-4 border-b border-sage-200" data-v-eb763866${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-eb763866${_scopeId}>Daftar Data Pelanggan</h3><p class="text-sm text-sage-600 mt-1" data-v-eb763866${_scopeId}> Total: ${ssrInterpolate(((_a2 = __props.customers) == null ? void 0 : _a2.total) || 0)} data </p></div><div class="overflow-x-auto" data-v-eb763866${_scopeId}><table class="w-full" data-v-eb763866${_scopeId}><thead class="bg-sage-50" data-v-eb763866${_scopeId}><tr data-v-eb763866${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-eb763866${_scopeId}> Nama Perusahaan </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-eb763866${_scopeId}> Jenis Usaha </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-eb763866${_scopeId}> PIC Name </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-eb763866${_scopeId}> PIC Email </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-eb763866${_scopeId}> Marketing </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-eb763866${_scopeId}> Handler </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-eb763866${_scopeId}> Aksi </th></tr></thead><tbody class="divide-y divide-sage-200" data-v-eb763866${_scopeId}><!--[-->`);
            ssrRenderList(__props.customers.data, (customer) => {
              var _a3;
              _push2(`<tr class="hover:bg-sage-50 transition-colors" data-v-eb763866${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-900" data-v-eb763866${_scopeId}>${ssrInterpolate(customer.company_name)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-eb763866${_scopeId}>${ssrInterpolate(customer.company_type)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-eb763866${_scopeId}>${ssrInterpolate(customer.pic_name)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-eb763866${_scopeId}>${ssrInterpolate(customer.pic_email)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-eb763866${_scopeId}>${ssrInterpolate(customer.marketing_name || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-eb763866${_scopeId}>${ssrInterpolate(((_a3 = customer.handler) == null ? void 0 : _a3.name) || "-")}</td><td class="px-6 py-4 text-sm font-medium" data-v-eb763866${_scopeId}><div class="flex items-center space-x-2" data-v-eb763866${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: route("admin-keuangan.customers.show", customer.id),
                class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
                title: "Lihat Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb763866${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-eb763866${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-eb763866${_scopeId2}></path></svg>`);
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
                href: route("admin-keuangan.customers.edit", customer.id),
                class: "inline-flex items-center justify-center w-8 h-8 text-amber-600 hover:text-amber-900 hover:bg-amber-100 rounded-full transition-colors",
                title: "Edit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb763866${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-eb763866${_scopeId2}></path></svg>`);
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
              _push2(`<a${ssrRenderAttr("href", `/admin-keuangan/customers/${customer.id}/pdf`)} class="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full transition-colors" title="Cetak PDF" target="_blank" data-v-eb763866${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb763866${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" data-v-eb763866${_scopeId}></path></svg></a><button class="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors" title="Hapus" data-v-eb763866${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb763866${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-eb763866${_scopeId}></path></svg></button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!__props.customers.data || __props.customers.data.length === 0) {
              _push2(`<tr data-v-eb763866${_scopeId}><td colspan="7" class="px-6 py-8 text-center text-gray-500" data-v-eb763866${_scopeId}><div class="flex flex-col items-center" data-v-eb763866${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-eb763866${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" data-v-eb763866${_scopeId}></path></svg><p class="text-lg font-medium mb-2" data-v-eb763866${_scopeId}>Tidak ada data</p><p class="text-sm text-gray-400" data-v-eb763866${_scopeId}> Belum ada data pelanggan yang tersedia </p></div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.customers.last_page > 1) {
              _push2(`<div class="px-6 py-4 border-t border-sage-200" data-v-eb763866${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.customers }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: showDeleteDialog.value,
              type: "confirm",
              title: "Konfirmasi Hapus Customer",
              message: `Apakah Anda yakin ingin menghapus customer '${(_b = customerToDelete.value) == null ? void 0 : _b.company_name}'? Tindakan ini tidak dapat dibatalkan.`,
              "confirm-text": "Ya, Hapus",
              "cancel-text": "Batal",
              onConfirm: confirmDelete,
              onCancel: cancelDelete,
              onClose: cancelDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800 mb-2" }, " Manajemen Data Pelanggan "),
                      createVNode("p", { class: "text-sage-600" }, " Kelola data pelanggan dan informasi kontak ")
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-2" }, [
                      createVNode("a", {
                        href: exportPdfUrl.value,
                        target: "_blank",
                        class: "inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5 mr-2",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", {
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round",
                            "stroke-width": "2",
                            d: "M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                          })
                        ])),
                        createTextVNode(" Export PDF ")
                      ], 8, ["href"]),
                      createVNode(unref(Link), {
                        href: route("admin-keuangan.customers.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock("svg", {
                            class: "w-5 h-5 mr-2",
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
                          createTextVNode(" Tambah Data Pelanggan ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Cari Data"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => form.search = $event,
                        type: "text",
                        placeholder: "Cari nama perusahaan, PIC, email, marketing...",
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, form.search]
                      ])
                    ]),
                    createVNode("div", { class: "flex items-end" }, [
                      createVNode("button", {
                        onClick: search,
                        class: "w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                      }, " Cari ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Daftar Data Pelanggan"),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Total: " + toDisplayString(((_c = __props.customers) == null ? void 0 : _c.total) || 0) + " data ", 1)
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Nama Perusahaan "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Jenis Usaha "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " PIC Name "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " PIC Email "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Marketing "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Handler "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Aksi ")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.customers.data, (customer) => {
                          var _a3;
                          return openBlock(), createBlock("tr", {
                            key: customer.id,
                            class: "hover:bg-sage-50 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-900" }, toDisplayString(customer.company_name), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(customer.company_type), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(customer.pic_name), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(customer.pic_email), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(customer.marketing_name || "-"), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(((_a3 = customer.handler) == null ? void 0 : _a3.name) || "-"), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm font-medium" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                createVNode(unref(Link), {
                                  href: route("admin-keuangan.customers.show", customer.id),
                                  class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
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
                                  href: route("admin-keuangan.customers.edit", customer.id),
                                  class: "inline-flex items-center justify-center w-8 h-8 text-amber-600 hover:text-amber-900 hover:bg-amber-100 rounded-full transition-colors",
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
                                createVNode("a", {
                                  href: `/admin-keuangan/customers/${customer.id}/pdf`,
                                  class: "inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full transition-colors",
                                  title: "Cetak PDF",
                                  target: "_blank"
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
                                      d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                    })
                                  ]))
                                ], 8, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => deleteCustomer(customer),
                                  class: "inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors",
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
                        !__props.customers.data || __props.customers.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "7",
                            class: "px-6 py-8 text-center text-gray-500"
                          }, [
                            createVNode("div", { class: "flex flex-col items-center" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-12 h-12 text-gray-300 mb-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                })
                              ])),
                              createVNode("p", { class: "text-lg font-medium mb-2" }, "Tidak ada data"),
                              createVNode("p", { class: "text-sm text-gray-400" }, " Belum ada data pelanggan yang tersedia ")
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  __props.customers.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "px-6 py-4 border-t border-sage-200"
                  }, [
                    createVNode(Pagination, { data: __props.customers }, null, 8, ["data"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(AlertDialog, {
                show: showDeleteDialog.value,
                type: "confirm",
                title: "Konfirmasi Hapus Customer",
                message: `Apakah Anda yakin ingin menghapus customer '${(_d = customerToDelete.value) == null ? void 0 : _d.company_name}'? Tindakan ini tidak dapat dibatalkan.`,
                "confirm-text": "Ya, Hapus",
                "cancel-text": "Batal",
                onConfirm: confirmDelete,
                onCancel: cancelDelete,
                onClose: cancelDelete
              }, null, 8, ["show", "message"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Customers/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-eb763866"]]);
export {
  Index as default
};
