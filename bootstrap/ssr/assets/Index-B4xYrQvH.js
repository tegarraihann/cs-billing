import { reactive, ref, withCtx, unref, createVNode, createTextVNode, createBlock, createCommentVNode, withDirectives, vModelText, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { router, Head, Link } from "@inertiajs/vue3";
import { Plus, Eye, Edit, Trash2, Package } from "lucide-vue-next";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BDTNgS_F.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { debounce } from "lodash";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-C7BgyxQX.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    packageUnits: Object,
    search: String
  },
  setup(__props) {
    const props = __props;
    const searchForm = reactive({
      search: props.search || ""
    });
    const showDeleteModal = ref(false);
    const unitToDelete = ref(null);
    const debounceSearch = debounce(() => {
      router.get(route("admin-keuangan.master-package-units.index"), {
        search: searchForm.search
      }, {
        preserveState: true,
        replace: true
      });
    }, 300);
    const clearSearch = () => {
      searchForm.search = "";
      router.get(route("admin-keuangan.master-package-units.index"));
    };
    const toggleStatus = (unit) => {
      router.patch(route("admin-keuangan.master-package-units.toggle-status", unit.id), {}, {
        preserveScroll: true
      });
    };
    const confirmDelete = (unit) => {
      unitToDelete.value = unit;
      showDeleteModal.value = true;
    };
    const deleteUnit = () => {
      router.delete(route("admin-keuangan.master-package-units.destroy", unitToDelete.value.id), {
        onSuccess: () => {
          showDeleteModal.value = false;
          unitToDelete.value = null;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Master Satuan Package" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><h1 class="text-2xl font-bold text-sage-800"${_scopeId}>Master Satuan Package</h1><p class="mt-1 text-sm text-sage-600"${_scopeId}> Kelola master data satuan packaging untuk Sales Order dan Invoice </p></div><div class="mt-4 sm:mt-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.master-package-units.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-5 h-5 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Tambah Satuan `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-5 h-5 mr-2" }),
                    createTextVNode(" Tambah Satuan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="mb-6 bg-white rounded-lg shadow-sm p-4 border border-sage-200"${_scopeId}><div class="flex flex-col sm:flex-row gap-4"${_scopeId}><div class="flex-1"${_scopeId}><input${ssrRenderAttr("value", searchForm.search)} type="text" placeholder="Cari berdasarkan kode, nama, atau deskripsi..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"${_scopeId}></div>`);
            if (__props.search) {
              _push2(`<button class="px-4 py-2 text-sage-600 hover:text-sage-800 transition-colors"${_scopeId}> Clear </button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"${_scopeId}><div class="px-6 py-4 border-b border-sage-200"${_scopeId}><h3 class="text-lg font-semibold text-sage-800"${_scopeId}> Daftar Satuan Package (${ssrInterpolate(__props.packageUnits.total)}) </h3></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-sage-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"${_scopeId}> Kode </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"${_scopeId}> Nama </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"${_scopeId}> Deskripsi </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"${_scopeId}> Urutan </th><th class="px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider"${_scopeId}> Aksi </th></tr></thead><tbody class="bg-white divide-y divide-sage-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.packageUnits.data, (unit) => {
              _push2(`<tr class="hover:bg-sage-50"${_scopeId}><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm font-medium text-sage-900"${_scopeId}>${ssrInterpolate(unit.code)}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-sage-900"${_scopeId}>${ssrInterpolate(unit.name)}</div></td><td class="px-6 py-4"${_scopeId}><div class="text-sm text-sage-600"${_scopeId}>${ssrInterpolate(unit.description || "-")}</div></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><button class="${ssrRenderClass([unit.is_active ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors"])}"${_scopeId}>${ssrInterpolate(unit.is_active ? "Aktif" : "Nonaktif")}</button></td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><div class="text-sm text-sage-600"${_scopeId}>${ssrInterpolate(unit.sort_order)}</div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"${_scopeId}><div class="flex items-center justify-end space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.master-package-units.show", unit.id),
                class: "text-sage-600 hover:text-sage-900 transition-colors",
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
                href: _ctx.route("admin-keuangan.master-package-units.edit", unit.id),
                class: "text-blue-600 hover:text-blue-900 transition-colors",
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
              _push2(`<button class="text-red-600 hover:text-red-900 transition-colors" title="Hapus"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`</button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.packageUnits.data.length === 0) {
              _push2(`<div class="px-6 py-12 text-center"${_scopeId}><div class="text-sage-400 mb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Package), { class: "w-12 h-12 mx-auto" }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-lg font-medium text-sage-900 mb-2"${_scopeId}>Belum ada satuan package</h3><p class="text-sage-500 mb-6"${_scopeId}>Mulai dengan menambahkan satuan package pertama.</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.master-package-units.create"),
                class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Plus), { class: "w-5 h-5 mr-2" }, null, _parent3, _scopeId2));
                    _push3(` Tambah Satuan Package `);
                  } else {
                    return [
                      createVNode(unref(Plus), { class: "w-5 h-5 mr-2" }),
                      createTextVNode(" Tambah Satuan Package ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.packageUnits.data.length > 0) {
              _push2(`<div class="px-6 py-4 border-t border-sage-200"${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.packageUnits }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: showDeleteModal.value,
              type: "danger",
              title: "Hapus Satuan Package",
              message: `Apakah Anda yakin ingin menghapus satuan '${(_a = unitToDelete.value) == null ? void 0 : _a.code}'? Aksi ini tidak dapat dibatalkan.`,
              "confirm-text": "Hapus",
              "cancel-text": "Batal",
              onConfirm: deleteUnit,
              onCancel: ($event) => showDeleteModal.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Master Satuan Package" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, "Master Satuan Package"),
                      createVNode("p", { class: "mt-1 text-sm text-sage-600" }, " Kelola master data satuan packaging untuk Sales Order dan Invoice ")
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.master-package-units.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-5 h-5 mr-2" }),
                          createTextVNode(" Tambah Satuan ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", { class: "mb-6 bg-white rounded-lg shadow-sm p-4 border border-sage-200" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                      createVNode("div", { class: "flex-1" }, [
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => searchForm.search = $event,
                          onInput: unref(debounceSearch),
                          type: "text",
                          placeholder: "Cari berdasarkan kode, nama, atau deskripsi...",
                          class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                        }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                          [vModelText, searchForm.search]
                        ])
                      ]),
                      __props.search ? (openBlock(), createBlock("button", {
                        key: 0,
                        onClick: clearSearch,
                        class: "px-4 py-2 text-sage-600 hover:text-sage-800 transition-colors"
                      }, " Clear ")) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, " Daftar Satuan Package (" + toDisplayString(__props.packageUnits.total) + ") ", 1)
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "w-full" }, [
                        createVNode("thead", { class: "bg-sage-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Kode "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Nama "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Deskripsi "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Status "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Urutan "),
                            createVNode("th", { class: "px-6 py-3 text-right text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Aksi ")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-sage-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.packageUnits.data, (unit) => {
                            return openBlock(), createBlock("tr", {
                              key: unit.id,
                              class: "hover:bg-sage-50"
                            }, [
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm font-medium text-sage-900" }, toDisplayString(unit.code), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm text-sage-900" }, toDisplayString(unit.name), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4" }, [
                                createVNode("div", { class: "text-sm text-sage-600" }, toDisplayString(unit.description || "-"), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("button", {
                                  onClick: ($event) => toggleStatus(unit),
                                  class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors", unit.is_active ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"]
                                }, toDisplayString(unit.is_active ? "Aktif" : "Nonaktif"), 11, ["onClick"])
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                createVNode("div", { class: "text-sm text-sage-600" }, toDisplayString(unit.sort_order), 1)
                              ]),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                createVNode("div", { class: "flex items-center justify-end space-x-2" }, [
                                  createVNode(unref(Link), {
                                    href: _ctx.route("admin-keuangan.master-package-units.show", unit.id),
                                    class: "text-sage-600 hover:text-sage-900 transition-colors",
                                    title: "Lihat Detail"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Eye), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode(unref(Link), {
                                    href: _ctx.route("admin-keuangan.master-package-units.edit", unit.id),
                                    class: "text-blue-600 hover:text-blue-900 transition-colors",
                                    title: "Edit"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(Edit), { class: "w-4 h-4" })
                                    ]),
                                    _: 2
                                  }, 1032, ["href"]),
                                  createVNode("button", {
                                    onClick: ($event) => confirmDelete(unit),
                                    class: "text-red-600 hover:text-red-900 transition-colors",
                                    title: "Hapus"
                                  }, [
                                    createVNode(unref(Trash2), { class: "w-4 h-4" })
                                  ], 8, ["onClick"])
                                ])
                              ])
                            ]);
                          }), 128))
                        ])
                      ])
                    ]),
                    __props.packageUnits.data.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "px-6 py-12 text-center"
                    }, [
                      createVNode("div", { class: "text-sage-400 mb-4" }, [
                        createVNode(unref(Package), { class: "w-12 h-12 mx-auto" })
                      ]),
                      createVNode("h3", { class: "text-lg font-medium text-sage-900 mb-2" }, "Belum ada satuan package"),
                      createVNode("p", { class: "text-sage-500 mb-6" }, "Mulai dengan menambahkan satuan package pertama."),
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.master-package-units.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-5 h-5 mr-2" }),
                          createTextVNode(" Tambah Satuan Package ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])) : createCommentVNode("", true),
                    __props.packageUnits.data.length > 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "px-6 py-4 border-t border-sage-200"
                    }, [
                      createVNode(Pagination, { data: __props.packageUnits }, null, 8, ["data"])
                    ])) : createCommentVNode("", true)
                  ])
                ])
              ]),
              createVNode(AlertDialog, {
                show: showDeleteModal.value,
                type: "danger",
                title: "Hapus Satuan Package",
                message: `Apakah Anda yakin ingin menghapus satuan '${(_b = unitToDelete.value) == null ? void 0 : _b.code}'? Aksi ini tidak dapat dibatalkan.`,
                "confirm-text": "Hapus",
                "cancel-text": "Batal",
                onConfirm: deleteUnit,
                onCancel: ($event) => showDeleteModal.value = false
              }, null, 8, ["show", "message", "onCancel"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/MasterPackageUnits/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
