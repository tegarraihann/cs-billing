import { ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { ArrowLeft, Edit, ToggleLeft, Trash2 } from "lucide-vue-next";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-COylVoWG.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DIYzn6Nn.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    packageUnit: Object
  },
  setup(__props) {
    const props = __props;
    const showDeleteModal = ref(false);
    const formatDate = (date) => {
      return new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const toggleStatus = () => {
      router.patch(route("admin-keuangan.master-package-units.toggle-status", props.packageUnit.id), {}, {
        preserveScroll: true
      });
    };
    const deleteUnit = () => {
      router.delete(route("admin-keuangan.master-package-units.destroy", props.packageUnit.id), {
        onSuccess: () => {
          showDeleteModal.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Detail Satuan Package" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div class="flex items-center space-x-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.master-package-units.index"),
              class: "text-sage-600 hover:text-sage-800 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-5 h-5" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-5 h-5" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div${_scopeId}><h1 class="text-2xl font-bold text-sage-800"${_scopeId}>${ssrInterpolate(__props.packageUnit.name)}</h1><p class="text-sm text-sage-600"${_scopeId}>Kode: ${ssrInterpolate(__props.packageUnit.code)}</p></div></div><div class="flex items-center space-x-3"${_scopeId}><span class="${ssrRenderClass([__props.packageUnit.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(__props.packageUnit.is_active ? "Aktif" : "Nonaktif")}</span>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.master-package-units.edit", __props.packageUnit.id),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
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
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"${_scopeId}><div class="lg:col-span-2"${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6"${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4"${_scopeId}>Informasi Satuan</h3><div class="space-y-4"${_scopeId}><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Kode</label><div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"${_scopeId}><span class="text-sm font-mono"${_scopeId}>${ssrInterpolate(__props.packageUnit.code)}</span></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Nama</label><div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"${_scopeId}><span class="text-sm"${_scopeId}>${ssrInterpolate(__props.packageUnit.name)}</span></div></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Deskripsi</label><div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[60px]"${_scopeId}><span class="text-sm"${_scopeId}>${ssrInterpolate(__props.packageUnit.description || "Tidak ada deskripsi")}</span></div></div><div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Urutan Tampil</label><div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"${_scopeId}><span class="text-sm"${_scopeId}>${ssrInterpolate(__props.packageUnit.sort_order)}</span></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1"${_scopeId}>Status</label><div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"${_scopeId}><span class="${ssrRenderClass([__props.packageUnit.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"])}"${_scopeId}>${ssrInterpolate(__props.packageUnit.is_active ? "Aktif" : "Nonaktif")}</span></div></div></div></div></div></div><div class="space-y-6"${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6"${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4"${_scopeId}>Aksi Cepat</h3><div class="space-y-3"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.master-package-units.edit", __props.packageUnit.id),
              class: "w-full inline-flex items-center justify-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Edit), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Edit Satuan `);
                } else {
                  return [
                    createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Edit Satuan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(ToggleLeft), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(__props.packageUnit.is_active ? "Nonaktifkan" : "Aktifkan")}</button><button class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Hapus Satuan </button></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6"${_scopeId}><h3 class="text-lg font-semibold text-sage-800 mb-4"${_scopeId}>Informasi Sistem</h3><div class="space-y-3 text-sm"${_scopeId}><div${_scopeId}><label class="block font-medium text-gray-700"${_scopeId}>ID</label><span class="text-gray-600"${_scopeId}>${ssrInterpolate(__props.packageUnit.id)}</span></div><div${_scopeId}><label class="block font-medium text-gray-700"${_scopeId}>Dibuat</label><span class="text-gray-600"${_scopeId}>${ssrInterpolate(formatDate(__props.packageUnit.created_at))}</span></div><div${_scopeId}><label class="block font-medium text-gray-700"${_scopeId}>Diperbarui</label><span class="text-gray-600"${_scopeId}>${ssrInterpolate(formatDate(__props.packageUnit.updated_at))}</span></div></div></div></div></div></div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: showDeleteModal.value,
              type: "danger",
              title: "Hapus Satuan Package",
              message: `Apakah Anda yakin ingin menghapus satuan '${__props.packageUnit.code}'? Aksi ini tidak dapat dibatalkan.`,
              "confirm-text": "Hapus",
              "cancel-text": "Batal",
              onConfirm: deleteUnit,
              onCancel: ($event) => showDeleteModal.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Detail Satuan Package" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center space-x-3" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.master-package-units.index"),
                          class: "text-sage-600 hover:text-sage-800 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "w-5 h-5" })
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, toDisplayString(__props.packageUnit.name), 1),
                          createVNode("p", { class: "text-sm text-sage-600" }, "Kode: " + toDisplayString(__props.packageUnit.code), 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center space-x-3" }, [
                        createVNode("span", {
                          class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", __props.packageUnit.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"]
                        }, toDisplayString(__props.packageUnit.is_active ? "Aktif" : "Nonaktif"), 3),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.master-package-units.edit", __props.packageUnit.id),
                          class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Edit ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                    createVNode("div", { class: "lg:col-span-2" }, [
                      createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Informasi Satuan"),
                        createVNode("div", { class: "space-y-4" }, [
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Kode"),
                              createVNode("div", { class: "px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg" }, [
                                createVNode("span", { class: "text-sm font-mono" }, toDisplayString(__props.packageUnit.code), 1)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Nama"),
                              createVNode("div", { class: "px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg" }, [
                                createVNode("span", { class: "text-sm" }, toDisplayString(__props.packageUnit.name), 1)
                              ])
                            ])
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Deskripsi"),
                            createVNode("div", { class: "px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg min-h-[60px]" }, [
                              createVNode("span", { class: "text-sm" }, toDisplayString(__props.packageUnit.description || "Tidak ada deskripsi"), 1)
                            ])
                          ]),
                          createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Urutan Tampil"),
                              createVNode("div", { class: "px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg" }, [
                                createVNode("span", { class: "text-sm" }, toDisplayString(__props.packageUnit.sort_order), 1)
                              ])
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Status"),
                              createVNode("div", { class: "px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg" }, [
                                createVNode("span", {
                                  class: ["inline-flex items-center px-2 py-1 rounded-full text-xs font-medium", __props.packageUnit.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"]
                                }, toDisplayString(__props.packageUnit.is_active ? "Aktif" : "Nonaktif"), 3)
                              ])
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Aksi Cepat"),
                        createVNode("div", { class: "space-y-3" }, [
                          createVNode(unref(Link), {
                            href: _ctx.route("admin-keuangan.master-package-units.edit", __props.packageUnit.id),
                            class: "w-full inline-flex items-center justify-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Edit Satuan ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode("button", {
                            onClick: toggleStatus,
                            class: "w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          }, [
                            createVNode(unref(ToggleLeft), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" " + toDisplayString(__props.packageUnit.is_active ? "Nonaktifkan" : "Aktifkan"), 1)
                          ]),
                          createVNode("button", {
                            onClick: ($event) => showDeleteModal.value = true,
                            class: "w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                          }, [
                            createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                            createTextVNode(" Hapus Satuan ")
                          ], 8, ["onClick"])
                        ])
                      ]),
                      createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800 mb-4" }, "Informasi Sistem"),
                        createVNode("div", { class: "space-y-3 text-sm" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block font-medium text-gray-700" }, "ID"),
                            createVNode("span", { class: "text-gray-600" }, toDisplayString(__props.packageUnit.id), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block font-medium text-gray-700" }, "Dibuat"),
                            createVNode("span", { class: "text-gray-600" }, toDisplayString(formatDate(__props.packageUnit.created_at)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block font-medium text-gray-700" }, "Diperbarui"),
                            createVNode("span", { class: "text-gray-600" }, toDisplayString(formatDate(__props.packageUnit.updated_at)), 1)
                          ])
                        ])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(AlertDialog, {
                show: showDeleteModal.value,
                type: "danger",
                title: "Hapus Satuan Package",
                message: `Apakah Anda yakin ingin menghapus satuan '${__props.packageUnit.code}'? Aksi ini tidak dapat dibatalkan.`,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/MasterPackageUnits/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
