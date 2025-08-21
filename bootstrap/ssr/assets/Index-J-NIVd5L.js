import { reactive, watch, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withDirectives, vModelText, createCommentVNode, toDisplayString, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-5dkykGfh.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B-2d_OMK.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    vendors: Object,
    filters: Object
  },
  setup(__props) {
    var _a;
    const props = __props;
    const form = reactive({
      search: ((_a = props.filters) == null ? void 0 : _a.search) || ""
    });
    const search = () => {
      const params = {};
      if (form.search) params.search = form.search;
      router.get(route("admin-cs.vendors.index"), params, {
        preserveState: true,
        replace: true
      });
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID");
    };
    const deleteVendor = (vendorId) => {
      if (confirm("Apakah Anda yakin ingin menghapus vendor ini?")) {
        router.delete(route("admin-cs.vendors.destroy", vendorId), {
          onSuccess: () => {
            alert("Vendor berhasil dihapus!");
          }
        });
      }
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
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-81574f69${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-81574f69${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-81574f69${_scopeId}><div data-v-81574f69${_scopeId}><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-81574f69${_scopeId}> Master Data Vendor </h2><p class="text-sage-600" data-v-81574f69${_scopeId}> Kelola data vendor untuk transaksi </p></div><div class="mt-4 sm:mt-0" data-v-81574f69${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.vendors.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-81574f69${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-81574f69${_scopeId2}></path></svg> Tambah Vendor `);
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
                    createTextVNode(" Tambah Vendor ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-81574f69${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-81574f69${_scopeId}><div data-v-81574f69${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-81574f69${_scopeId}>Cari Data</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari nama vendor, nomor rekening, nama rekening, NIB..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-81574f69${_scopeId}></div><div class="flex items-end" data-v-81574f69${_scopeId}><button class="w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-81574f69${_scopeId}> Cari </button></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-81574f69${_scopeId}><div class="px-6 py-4 border-b border-sage-200" data-v-81574f69${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-81574f69${_scopeId}>Daftar Vendor</h3><p class="text-sm text-sage-600 mt-1" data-v-81574f69${_scopeId}> Total: ${ssrInterpolate(((_a2 = __props.vendors) == null ? void 0 : _a2.total) || 0)} data </p></div><div class="overflow-x-auto" data-v-81574f69${_scopeId}><table class="w-full" data-v-81574f69${_scopeId}><thead class="bg-sage-50" data-v-81574f69${_scopeId}><tr data-v-81574f69${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-81574f69${_scopeId}> ID </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-81574f69${_scopeId}> Nama Vendor </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-81574f69${_scopeId}> Nomor Rekening </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-81574f69${_scopeId}> Nama Rekening </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-81574f69${_scopeId}> NIB </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-81574f69${_scopeId}> Status Dokumen </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-81574f69${_scopeId}> Tanggal Dibuat </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-81574f69${_scopeId}> Aksi </th></tr></thead><tbody class="divide-y divide-sage-200" data-v-81574f69${_scopeId}><!--[-->`);
            ssrRenderList(__props.vendors.data, (vendor) => {
              _push2(`<tr class="hover:bg-sage-50 transition-colors" data-v-81574f69${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-900" data-v-81574f69${_scopeId}>${ssrInterpolate(vendor.id)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-81574f69${_scopeId}>${ssrInterpolate(vendor.nama_vendor)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-81574f69${_scopeId}>${ssrInterpolate(vendor.nomor_rekening)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-81574f69${_scopeId}>${ssrInterpolate(vendor.nama_rekening)}</td><td class="px-6 py-4 text-sm text-gray-900 font-mono" data-v-81574f69${_scopeId}>${ssrInterpolate(vendor.nib || "-")}</td><td class="px-6 py-4 text-sm" data-v-81574f69${_scopeId}><div class="flex space-x-1" data-v-81574f69${_scopeId}>`);
              if (vendor.photo_path) {
                _push2(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" data-v-81574f69${_scopeId}> Foto </span>`);
              } else {
                _push2(`<!---->`);
              }
              if (vendor.legal_document_path) {
                _push2(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-v-81574f69${_scopeId}> Legal </span>`);
              } else {
                _push2(`<!---->`);
              }
              if (!vendor.photo_path && !vendor.legal_document_path) {
                _push2(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800" data-v-81574f69${_scopeId}> Kosong </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-6 py-4 text-sm text-gray-900" data-v-81574f69${_scopeId}>${ssrInterpolate(formatDate(vendor.created_at))}</td><td class="px-6 py-4 text-sm font-medium" data-v-81574f69${_scopeId}><div class="flex items-center space-x-2" data-v-81574f69${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-cs.vendors.show", vendor.id),
                class: "inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full transition-colors",
                title: "Lihat Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-81574f69${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-81574f69${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-81574f69${_scopeId2}></path></svg>`);
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
                href: _ctx.route("admin-cs.vendors.edit", vendor.id),
                class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
                title: "Edit Vendor"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-81574f69${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-81574f69${_scopeId2}></path></svg>`);
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
              _push2(`<button class="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors" title="Hapus Vendor" data-v-81574f69${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-81574f69${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-81574f69${_scopeId}></path></svg></button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!__props.vendors.data || __props.vendors.data.length === 0) {
              _push2(`<tr data-v-81574f69${_scopeId}><td colspan="8" class="px-6 py-8 text-center text-gray-500" data-v-81574f69${_scopeId}><div class="flex flex-col items-center" data-v-81574f69${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-81574f69${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-v-81574f69${_scopeId}></path></svg><p class="text-lg font-medium mb-2" data-v-81574f69${_scopeId}>Tidak ada data</p><p class="text-sm text-gray-400" data-v-81574f69${_scopeId}> Belum ada data vendor yang tersedia </p></div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.vendors.last_page > 1) {
              _push2(`<div class="px-6 py-4 border-t border-sage-200" data-v-81574f69${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.vendors }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800 mb-2" }, " Master Data Vendor "),
                      createVNode("p", { class: "text-sage-600" }, " Kelola data vendor untuk transaksi ")
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.vendors.create"),
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
                          createTextVNode(" Tambah Vendor ")
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
                        placeholder: "Cari nama vendor, nomor rekening, nama rekening, NIB...",
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
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Daftar Vendor"),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Total: " + toDisplayString(((_b = __props.vendors) == null ? void 0 : _b.total) || 0) + " data ", 1)
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " ID "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Nama Vendor "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Nomor Rekening "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Nama Rekening "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " NIB "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Status Dokumen "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Tanggal Dibuat "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Aksi ")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors.data, (vendor) => {
                          return openBlock(), createBlock("tr", {
                            key: vendor.id,
                            class: "hover:bg-sage-50 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-900" }, toDisplayString(vendor.id), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(vendor.nama_vendor), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(vendor.nomor_rekening), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(vendor.nama_rekening), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900 font-mono" }, toDisplayString(vendor.nib || "-"), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm" }, [
                              createVNode("div", { class: "flex space-x-1" }, [
                                vendor.photo_path ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                }, " Foto ")) : createCommentVNode("", true),
                                vendor.legal_document_path ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                }, " Legal ")) : createCommentVNode("", true),
                                !vendor.photo_path && !vendor.legal_document_path ? (openBlock(), createBlock("span", {
                                  key: 2,
                                  class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                }, " Kosong ")) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(formatDate(vendor.created_at)), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm font-medium" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin-cs.vendors.show", vendor.id),
                                  class: "inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full transition-colors",
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
                                  href: _ctx.route("admin-cs.vendors.edit", vendor.id),
                                  class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
                                  title: "Edit Vendor"
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
                                  onClick: ($event) => deleteVendor(vendor.id),
                                  class: "inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-900 hover:bg-red-100 rounded-full transition-colors",
                                  title: "Hapus Vendor"
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
                        !__props.vendors.data || __props.vendors.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "8",
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
                                  d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                })
                              ])),
                              createVNode("p", { class: "text-lg font-medium mb-2" }, "Tidak ada data"),
                              createVNode("p", { class: "text-sm text-gray-400" }, " Belum ada data vendor yang tersedia ")
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  __props.vendors.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "px-6 py-4 border-t border-sage-200"
                  }, [
                    createVNode(Pagination, { data: __props.vendors }, null, 8, ["data"])
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Vendors/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-81574f69"]]);
export {
  Index as default
};
