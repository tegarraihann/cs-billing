import { reactive, ref, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withDirectives, vModelText, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-KnprtzM7.js";
import { P as Pagination } from "./Pagination-JgWO_U2H.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DOEtrGyc.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    shipmentTypes: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const form = reactive({
      search: props.filters.search || ""
    });
    const showDeleteDialog = ref(false);
    const selectedShipmentType = ref(null);
    const search = () => {
      router.get(route("admin-keuangan.shipment-types.index"), form, {
        preserveState: true,
        replace: true
      });
    };
    const confirmDelete = (shipmentType) => {
      selectedShipmentType.value = shipmentType;
      showDeleteDialog.value = true;
    };
    const confirmDeleteAction = () => {
      if (selectedShipmentType.value) {
        router.delete(route("admin-keuangan.shipment-types.destroy", selectedShipmentType.value.id), {
          onSuccess: () => {
            router.get(route("admin-keuangan.shipment-types.index"), {
              search: form.search
            }, {
              preserveState: true,
              replace: true
            });
          },
          onError: (errors) => {
            alert("Terjadi kesalahan saat menghapus shipment type: " + Object.values(errors).join(", "));
          }
        });
      }
      showDeleteDialog.value = false;
      selectedShipmentType.value = null;
    };
    const cancelDelete = () => {
      showDeleteDialog.value = false;
      selectedShipmentType.value = null;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-b533cb47${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-b533cb47${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-b533cb47${_scopeId}><div data-v-b533cb47${_scopeId}><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-b533cb47${_scopeId}> Manajemen Shipment Type </h2><p class="text-sage-600" data-v-b533cb47${_scopeId}> Kelola data jenis pengiriman untuk sales order </p></div><div class="mt-4 sm:mt-0" data-v-b533cb47${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.shipment-types.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b533cb47${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-b533cb47${_scopeId2}></path></svg> Tambah Shipment Type `);
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
                    createTextVNode(" Tambah Shipment Type ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-b533cb47${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-b533cb47${_scopeId}><div data-v-b533cb47${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-b533cb47${_scopeId}>Cari Data</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari nama, kode, atau deskripsi..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-b533cb47${_scopeId}></div><div class="flex items-end" data-v-b533cb47${_scopeId}><button class="w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-b533cb47${_scopeId}> Cari </button></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-b533cb47${_scopeId}><div class="px-6 py-4 border-b border-sage-200" data-v-b533cb47${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-b533cb47${_scopeId}>Daftar Shipment Type</h3><p class="text-sm text-sage-600 mt-1" data-v-b533cb47${_scopeId}> Total: ${ssrInterpolate(((_a = __props.shipmentTypes) == null ? void 0 : _a.total) || 0)} data </p></div><div class="overflow-x-auto" data-v-b533cb47${_scopeId}><table class="w-full" data-v-b533cb47${_scopeId}><thead class="bg-sage-50" data-v-b533cb47${_scopeId}><tr data-v-b533cb47${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b533cb47${_scopeId}> Kode </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b533cb47${_scopeId}> Nama </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b533cb47${_scopeId}> Deskripsi </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b533cb47${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-b533cb47${_scopeId}> Aksi </th></tr></thead><tbody class="divide-y divide-sage-200" data-v-b533cb47${_scopeId}><!--[-->`);
            ssrRenderList(__props.shipmentTypes.data, (shipmentType) => {
              _push2(`<tr class="hover:bg-sage-50 transition-colors" data-v-b533cb47${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900" data-v-b533cb47${_scopeId}>${ssrInterpolate(shipmentType.code)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-sage-900" data-v-b533cb47${_scopeId}>${ssrInterpolate(shipmentType.name)}</td><td class="px-6 py-4 text-sm text-sage-900" data-v-b533cb47${_scopeId}>${ssrInterpolate(shipmentType.description || "-")}</td><td class="px-6 py-4 whitespace-nowrap" data-v-b533cb47${_scopeId}><span class="${ssrRenderClass(
                shipmentType.is_active ? "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800" : "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"
              )}" data-v-b533cb47${_scopeId}>${ssrInterpolate(shipmentType.is_active ? "Aktif" : "Tidak Aktif")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium" data-v-b533cb47${_scopeId}><div class="flex items-center space-x-2" data-v-b533cb47${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.shipment-types.edit", shipmentType.id),
                class: "inline-flex items-center justify-center w-8 h-8 text-amber-600 hover:text-amber-900 hover:bg-amber-100 rounded-full transition-colors",
                title: "Edit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b533cb47${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-b533cb47${_scopeId2}></path></svg>`);
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
              _push2(`<button class="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors" title="Hapus" data-v-b533cb47${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b533cb47${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-b533cb47${_scopeId}></path></svg></button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.shipmentTypes.data.length === 0) {
              _push2(`<div class="px-6 py-8 text-center text-sage-500" data-v-b533cb47${_scopeId}><div class="flex flex-col items-center" data-v-b533cb47${_scopeId}><svg class="w-12 h-12 text-sage-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b533cb47${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" data-v-b533cb47${_scopeId}></path></svg><p class="text-lg font-medium" data-v-b533cb47${_scopeId}>Tidak ada data shipment type</p><p class="text-sm mt-1" data-v-b533cb47${_scopeId}>Mulai dengan menambahkan shipment type baru</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.shipmentTypes.data.length > 0 && __props.shipmentTypes.last_page > 1) {
              _push2(`<div class="px-6 py-4 border-t border-sage-200" data-v-b533cb47${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.shipmentTypes }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: showDeleteDialog.value,
              type: "confirm",
              title: "Konfirmasi Hapus Shipment Type",
              message: `Apakah Anda yakin ingin menghapus shipment type '${(_b = selectedShipmentType.value) == null ? void 0 : _b.name}'? Tindakan ini tidak dapat dibatalkan.`,
              "confirm-text": "Ya, Hapus",
              "cancel-text": "Batal",
              onConfirm: confirmDeleteAction,
              onCancel: cancelDelete,
              onClose: cancelDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800 mb-2" }, " Manajemen Shipment Type "),
                      createVNode("p", { class: "text-sage-600" }, " Kelola data jenis pengiriman untuk sales order ")
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.shipment-types.create"),
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
                          createTextVNode(" Tambah Shipment Type ")
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
                        placeholder: "Cari nama, kode, atau deskripsi...",
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
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Daftar Shipment Type"),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Total: " + toDisplayString(((_c = __props.shipmentTypes) == null ? void 0 : _c.total) || 0) + " data ", 1)
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Kode "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Nama "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Deskripsi "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Status "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Aksi ")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.shipmentTypes.data, (shipmentType) => {
                          return openBlock(), createBlock("tr", {
                            key: shipmentType.id,
                            class: "hover:bg-sage-50 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900" }, toDisplayString(shipmentType.code), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-sage-900" }, toDisplayString(shipmentType.name), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-sage-900" }, toDisplayString(shipmentType.description || "-"), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("span", {
                                class: shipmentType.is_active ? "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800" : "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"
                              }, toDisplayString(shipmentType.is_active ? "Aktif" : "Tidak Aktif"), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin-keuangan.shipment-types.edit", shipmentType.id),
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
                                createVNode("button", {
                                  onClick: ($event) => confirmDelete(shipmentType),
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
                        }), 128))
                      ])
                    ])
                  ]),
                  __props.shipmentTypes.data.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "px-6 py-8 text-center text-sage-500"
                  }, [
                    createVNode("div", { class: "flex flex-col items-center" }, [
                      (openBlock(), createBlock("svg", {
                        class: "w-12 h-12 text-sage-400 mb-4",
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
                      createVNode("p", { class: "text-lg font-medium" }, "Tidak ada data shipment type"),
                      createVNode("p", { class: "text-sm mt-1" }, "Mulai dengan menambahkan shipment type baru")
                    ])
                  ])) : createCommentVNode("", true),
                  __props.shipmentTypes.data.length > 0 && __props.shipmentTypes.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "px-6 py-4 border-t border-sage-200"
                  }, [
                    createVNode(Pagination, { data: __props.shipmentTypes }, null, 8, ["data"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(AlertDialog, {
                show: showDeleteDialog.value,
                type: "confirm",
                title: "Konfirmasi Hapus Shipment Type",
                message: `Apakah Anda yakin ingin menghapus shipment type '${(_d = selectedShipmentType.value) == null ? void 0 : _d.name}'? Tindakan ini tidak dapat dibatalkan.`,
                "confirm-text": "Ya, Hapus",
                "cancel-text": "Batal",
                onConfirm: confirmDeleteAction,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ShipmentTypes/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b533cb47"]]);
export {
  Index as default
};
