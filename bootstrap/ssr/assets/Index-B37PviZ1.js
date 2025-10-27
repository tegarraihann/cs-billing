import { reactive, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withDirectives, vModelText, vModelSelect, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-COfqywW7.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-BQ7a3c_z.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    serviceTypes: Object,
    filters: Object
  },
  setup(__props) {
    var _a, _b;
    const props = __props;
    const form = reactive({
      search: ((_a = props.filters) == null ? void 0 : _a.search) || "",
      status: ((_b = props.filters) == null ? void 0 : _b.status) || ""
    });
    const deleteModal = reactive({
      show: false,
      serviceType: null
    });
    const search = () => {
      router.get(
        route("admin-keuangan.service-types.index"),
        {
          search: form.search,
          status: form.status
        },
        {
          preserveState: true,
          preserveScroll: true
        }
      );
    };
    const confirmDelete = (serviceType) => {
      deleteModal.serviceType = serviceType;
      deleteModal.show = true;
    };
    const deleteServiceType = () => {
      router.delete(route("admin-keuangan.service-types.destroy", deleteModal.serviceType.id), {
        onSuccess: () => {
          deleteModal.show = false;
          deleteModal.serviceType = null;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2, _c, _d, _e, _f;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8"${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between"${_scopeId}><div${_scopeId}><h2 class="text-2xl font-bold text-sage-800 mb-2"${_scopeId}> Manajemen Service Type </h2><p class="text-sage-600"${_scopeId}> Kelola data jenis biaya/service untuk vendor items </p></div><div class="mt-4 sm:mt-0"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.service-types.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId2}></path></svg> Tambah Service Type `);
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
                    createTextVNode(" Tambah Service Type ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}><div class="md:col-span-2"${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}>Cari Data</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari kode, nama, atau deskripsi..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"${_scopeId}></div><div${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2"${_scopeId}>Status</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"${_scopeId}><option value=""${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "") : ssrLooseEqual(form.status, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "1") : ssrLooseEqual(form.status, "1")) ? " selected" : ""}${_scopeId}>Aktif</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "0") : ssrLooseEqual(form.status, "0")) ? " selected" : ""}${_scopeId}>Tidak Aktif</option></select></div></div><div class="mt-4"${_scopeId}><button class="w-full md:w-auto px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"${_scopeId}> Cari </button></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden"${_scopeId}><div class="px-6 py-4 border-b border-sage-200"${_scopeId}><h3 class="text-lg font-semibold text-sage-800"${_scopeId}>Daftar Service Type</h3><p class="text-sm text-sage-600 mt-1"${_scopeId}> Total: ${ssrInterpolate(((_a2 = __props.serviceTypes) == null ? void 0 : _a2.total) || 0)} data </p></div><div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead class="bg-sage-50"${_scopeId}><tr${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"${_scopeId}> Urutan </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"${_scopeId}> Kode </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"${_scopeId}> Nama </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"${_scopeId}> Deskripsi </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider"${_scopeId}> Aksi </th></tr></thead><tbody class="divide-y divide-sage-200"${_scopeId}><!--[-->`);
            ssrRenderList(__props.serviceTypes.data, (serviceType) => {
              _push2(`<tr class="hover:bg-sage-50 transition-colors"${_scopeId}><td class="px-6 py-4 whitespace-nowrap text-sm text-sage-600"${_scopeId}>${ssrInterpolate(serviceType.sort_order)}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900"${_scopeId}>${ssrInterpolate(serviceType.code)}</td><td class="px-6 py-4 whitespace-nowrap text-sm text-sage-900"${_scopeId}>${ssrInterpolate(serviceType.name)}</td><td class="px-6 py-4 text-sm text-sage-900"${_scopeId}>${ssrInterpolate(serviceType.description || "-")}</td><td class="px-6 py-4 whitespace-nowrap"${_scopeId}><span class="${ssrRenderClass(
                serviceType.is_active ? "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800" : "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"
              )}"${_scopeId}>${ssrInterpolate(serviceType.is_active ? "Aktif" : "Tidak Aktif")}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"${_scopeId}><div class="flex items-center space-x-2"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.service-types.edit", serviceType.id),
                class: "inline-flex items-center justify-center w-8 h-8 text-amber-600 hover:text-amber-900 hover:bg-amber-100 rounded-full transition-colors",
                title: "Edit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId2}></path></svg>`);
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
              _push2(`<button class="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors" title="Hapus"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"${_scopeId}></path></svg></button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if ((_b2 = __props.serviceTypes) == null ? void 0 : _b2.links) {
              _push2(`<div class="px-6 py-4 border-t border-sage-200"${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, {
                links: __props.serviceTypes.links
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: deleteModal.show,
              title: "Konfirmasi Hapus",
              message: `Apakah Anda yakin ingin menghapus service type '${(_c = deleteModal.serviceType) == null ? void 0 : _c.code}'?`,
              "confirm-text": "Hapus",
              "cancel-text": "Batal",
              onConfirm: deleteServiceType,
              onCancel: ($event) => deleteModal.show = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800 mb-2" }, " Manajemen Service Type "),
                      createVNode("p", { class: "text-sage-600" }, " Kelola data jenis biaya/service untuk vendor items ")
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.service-types.create"),
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
                          createTextVNode(" Tambah Service Type ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                    createVNode("div", { class: "md:col-span-2" }, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Cari Data"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => form.search = $event,
                        type: "text",
                        placeholder: "Cari kode, nama, atau deskripsi...",
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, form.search]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Status"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => form.status = $event,
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, [
                        createVNode("option", { value: "" }, "Semua Status"),
                        createVNode("option", { value: "1" }, "Aktif"),
                        createVNode("option", { value: "0" }, "Tidak Aktif")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, form.status]
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "mt-4" }, [
                    createVNode("button", {
                      onClick: search,
                      class: "w-full md:w-auto px-6 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                    }, " Cari ")
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Daftar Service Type"),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Total: " + toDisplayString(((_d = __props.serviceTypes) == null ? void 0 : _d.total) || 0) + " data ", 1)
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Urutan "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Kode "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Nama "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Deskripsi "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Status "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Aksi ")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.serviceTypes.data, (serviceType) => {
                          return openBlock(), createBlock("tr", {
                            key: serviceType.id,
                            class: "hover:bg-sage-50 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-sage-600" }, toDisplayString(serviceType.sort_order), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium text-sage-900" }, toDisplayString(serviceType.code), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-sage-900" }, toDisplayString(serviceType.name), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-sage-900" }, toDisplayString(serviceType.description || "-"), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("span", {
                                class: serviceType.is_active ? "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800" : "inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800"
                              }, toDisplayString(serviceType.is_active ? "Aktif" : "Tidak Aktif"), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin-keuangan.service-types.edit", serviceType.id),
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
                                  onClick: ($event) => confirmDelete(serviceType),
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
                  ((_e = __props.serviceTypes) == null ? void 0 : _e.links) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "px-6 py-4 border-t border-sage-200"
                  }, [
                    createVNode(Pagination, {
                      links: __props.serviceTypes.links
                    }, null, 8, ["links"])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(AlertDialog, {
                show: deleteModal.show,
                title: "Konfirmasi Hapus",
                message: `Apakah Anda yakin ingin menghapus service type '${(_f = deleteModal.serviceType) == null ? void 0 : _f.code}'?`,
                "confirm-text": "Hapus",
                "cancel-text": "Batal",
                onConfirm: deleteServiceType,
                onCancel: ($event) => deleteModal.show = false
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ServiceTypes/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
