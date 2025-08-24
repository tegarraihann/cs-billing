import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BZZyudmx.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-B73_Se2C.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    vendor: Object
  },
  setup(__props) {
    const props = __props;
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const deleteVendor = () => {
      if (confirm(`Apakah Anda yakin ingin menghapus vendor ${props.vendor.nama_vendor}?`)) {
        router.delete(route("admin-keuangan.vendors.destroy", props.vendor.id), {
          onSuccess: () => {
          }
        });
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-936fb7ec${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-936fb7ec${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-936fb7ec${_scopeId}><div class="flex items-center" data-v-936fb7ec${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-936fb7ec${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-936fb7ec${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-936fb7ec${_scopeId}></path></svg></div><div data-v-936fb7ec${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-936fb7ec${_scopeId}>${ssrInterpolate(__props.vendor.nama_vendor)}</h2><p class="text-sage-600" data-v-936fb7ec${_scopeId}> Detail informasi vendor </p></div></div><div class="flex space-x-2 mt-4 sm:mt-0" data-v-936fb7ec${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.vendors.edit", __props.vendor.id),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-936fb7ec${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-936fb7ec${_scopeId2}></path></svg> Edit `);
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
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.vendors.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-936fb7ec${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-936fb7ec${_scopeId2}></path></svg> Kembali `);
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
                        d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                      })
                    ])),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-936fb7ec${_scopeId}><div class="lg:col-span-2 space-y-6" data-v-936fb7ec${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-936fb7ec${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-936fb7ec${_scopeId}><h3 class="text-lg font-semibold text-sage-800 flex items-center" data-v-936fb7ec${_scopeId}> 🏢 Informasi Dasar </h3></div><div class="p-6" data-v-936fb7ec${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-936fb7ec${_scopeId}><div data-v-936fb7ec${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-936fb7ec${_scopeId}>ID</label><p class="text-sage-900 font-medium" data-v-936fb7ec${_scopeId}>#${ssrInterpolate(__props.vendor.id)}</p></div><div data-v-936fb7ec${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-936fb7ec${_scopeId}>Nama Vendor</label><p class="text-sage-900 font-medium" data-v-936fb7ec${_scopeId}>${ssrInterpolate(__props.vendor.nama_vendor)}</p></div>`);
            if (__props.vendor.nib) {
              _push2(`<div class="md:col-span-2" data-v-936fb7ec${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-936fb7ec${_scopeId}>NIB (Nomor Induk Berusaha)</label><p class="text-sage-900" data-v-936fb7ec${_scopeId}>${ssrInterpolate(__props.vendor.nib)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-936fb7ec${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-936fb7ec${_scopeId}><h3 class="text-lg font-semibold text-sage-800 flex items-center" data-v-936fb7ec${_scopeId}> 🏦 Informasi Rekening </h3></div><div class="p-6" data-v-936fb7ec${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-936fb7ec${_scopeId}><div data-v-936fb7ec${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-936fb7ec${_scopeId}>Nomor Rekening</label><p class="text-sage-900 font-medium font-mono" data-v-936fb7ec${_scopeId}>${ssrInterpolate(__props.vendor.nomor_rekening)}</p></div><div data-v-936fb7ec${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-936fb7ec${_scopeId}>Nama Rekening</label><p class="text-sage-900 font-medium" data-v-936fb7ec${_scopeId}>${ssrInterpolate(__props.vendor.nama_rekening)}</p></div></div></div></div>`);
            if (__props.vendor.photo_path || __props.vendor.legal_document_path) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-936fb7ec${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-936fb7ec${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-936fb7ec${_scopeId}>📄 Dokumen &amp; File</h3></div><div class="p-6" data-v-936fb7ec${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-936fb7ec${_scopeId}>`);
              if (__props.vendor.photo_path) {
                _push2(`<div class="space-y-3" data-v-936fb7ec${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-936fb7ec${_scopeId}>Foto Vendor</label><div class="border border-sage-200 rounded-lg overflow-hidden" data-v-936fb7ec${_scopeId}><img${ssrRenderAttr("src", `/storage/${__props.vendor.photo_path}`)}${ssrRenderAttr("alt", __props.vendor.nama_vendor)} class="w-full h-48 object-cover" data-v-936fb7ec${_scopeId}></div><a${ssrRenderAttr("href", `/storage/${__props.vendor.photo_path}`)} target="_blank" class="inline-flex items-center text-sage-600 hover:text-sage-700 text-sm" data-v-936fb7ec${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-936fb7ec${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" data-v-936fb7ec${_scopeId}></path></svg> Buka di tab baru </a></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.vendor.legal_document_path) {
                _push2(`<div class="space-y-3" data-v-936fb7ec${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-936fb7ec${_scopeId}>Dokumen Legal</label><div class="border border-sage-200 rounded-lg p-4 text-center" data-v-936fb7ec${_scopeId}><svg class="w-12 h-12 text-red-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20" data-v-936fb7ec${_scopeId}><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd" data-v-936fb7ec${_scopeId}></path></svg><p class="text-sm text-gray-600" data-v-936fb7ec${_scopeId}>PDF Document</p></div><a${ssrRenderAttr("href", `/storage/${__props.vendor.legal_document_path}`)} target="_blank" class="inline-flex items-center text-sage-600 hover:text-sage-700 text-sm" data-v-936fb7ec${_scopeId}><svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-936fb7ec${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-936fb7ec${_scopeId}></path></svg> Download PDF </a></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-6" data-v-936fb7ec${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-936fb7ec${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-936fb7ec${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-936fb7ec${_scopeId}>Status</h3></div><div class="p-6 space-y-3" data-v-936fb7ec${_scopeId}><div class="flex items-center justify-between" data-v-936fb7ec${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-936fb7ec${_scopeId}>Status Vendor</span><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" data-v-936fb7ec${_scopeId}> Aktif </span></div><div class="flex items-center justify-between" data-v-936fb7ec${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-936fb7ec${_scopeId}>Dibuat</span><span class="text-sage-900 text-sm" data-v-936fb7ec${_scopeId}>${ssrInterpolate(formatDate(__props.vendor.created_at))}</span></div><div class="flex items-center justify-between" data-v-936fb7ec${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-936fb7ec${_scopeId}>Terakhir Diupdate</span><span class="text-sage-900 text-sm" data-v-936fb7ec${_scopeId}>${ssrInterpolate(formatDate(__props.vendor.updated_at))}</span></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-936fb7ec${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-936fb7ec${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-936fb7ec${_scopeId}>Quick Actions</h3></div><div class="p-6 space-y-3" data-v-936fb7ec${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.vendors.edit", __props.vendor.id),
              class: "w-full inline-flex items-center justify-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-936fb7ec${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-936fb7ec${_scopeId2}></path></svg> Edit Vendor `);
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
                    createTextVNode(" Edit Vendor ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-936fb7ec${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-936fb7ec${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-936fb7ec${_scopeId}></path></svg> Hapus Vendor </button></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-6 h-6 text-white",
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
                        ]))
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, toDisplayString(__props.vendor.nama_vendor), 1),
                        createVNode("p", { class: "text-sage-600" }, " Detail informasi vendor ")
                      ])
                    ]),
                    createVNode("div", { class: "flex space-x-2 mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.vendors.edit", __props.vendor.id),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
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
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.vendors.index"),
                        class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
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
                              d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                            })
                          ])),
                          createTextVNode(" Kembali ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800 flex items-center" }, " 🏢 Informasi Dasar ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "ID"),
                            createVNode("p", { class: "text-sage-900 font-medium" }, "#" + toDisplayString(__props.vendor.id), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Nama Vendor"),
                            createVNode("p", { class: "text-sage-900 font-medium" }, toDisplayString(__props.vendor.nama_vendor), 1)
                          ]),
                          __props.vendor.nib ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "md:col-span-2"
                          }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "NIB (Nomor Induk Berusaha)"),
                            createVNode("p", { class: "text-sage-900" }, toDisplayString(__props.vendor.nib), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800 flex items-center" }, " 🏦 Informasi Rekening ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Nomor Rekening"),
                            createVNode("p", { class: "text-sage-900 font-medium font-mono" }, toDisplayString(__props.vendor.nomor_rekening), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Nama Rekening"),
                            createVNode("p", { class: "text-sage-900 font-medium" }, toDisplayString(__props.vendor.nama_rekening), 1)
                          ])
                        ])
                      ])
                    ]),
                    __props.vendor.photo_path || __props.vendor.legal_document_path ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white rounded-lg shadow-sm border border-sage-200"
                    }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "📄 Dokumen & File")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                          __props.vendor.photo_path ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "space-y-3"
                          }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Foto Vendor"),
                            createVNode("div", { class: "border border-sage-200 rounded-lg overflow-hidden" }, [
                              createVNode("img", {
                                src: `/storage/${__props.vendor.photo_path}`,
                                alt: __props.vendor.nama_vendor,
                                class: "w-full h-48 object-cover"
                              }, null, 8, ["src", "alt"])
                            ]),
                            createVNode("a", {
                              href: `/storage/${__props.vendor.photo_path}`,
                              target: "_blank",
                              class: "inline-flex items-center text-sage-600 hover:text-sage-700 text-sm"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4 mr-1",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                })
                              ])),
                              createTextVNode(" Buka di tab baru ")
                            ], 8, ["href"])
                          ])) : createCommentVNode("", true),
                          __props.vendor.legal_document_path ? (openBlock(), createBlock("div", {
                            key: 1,
                            class: "space-y-3"
                          }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Dokumen Legal"),
                            createVNode("div", { class: "border border-sage-200 rounded-lg p-4 text-center" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-12 h-12 text-red-500 mx-auto mb-2",
                                fill: "currentColor",
                                viewBox: "0 0 20 20"
                              }, [
                                createVNode("path", {
                                  "fill-rule": "evenodd",
                                  d: "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z",
                                  "clip-rule": "evenodd"
                                })
                              ])),
                              createVNode("p", { class: "text-sm text-gray-600" }, "PDF Document")
                            ]),
                            createVNode("a", {
                              href: `/storage/${__props.vendor.legal_document_path}`,
                              target: "_blank",
                              class: "inline-flex items-center text-sage-600 hover:text-sage-700 text-sm"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-4 h-4 mr-1",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                })
                              ])),
                              createTextVNode(" Download PDF ")
                            ], 8, ["href"])
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Status")
                      ]),
                      createVNode("div", { class: "p-6 space-y-3" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Status Vendor"),
                          createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" }, " Aktif ")
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Dibuat"),
                          createVNode("span", { class: "text-sage-900 text-sm" }, toDisplayString(formatDate(__props.vendor.created_at)), 1)
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Terakhir Diupdate"),
                          createVNode("span", { class: "text-sage-900 text-sm" }, toDisplayString(formatDate(__props.vendor.updated_at)), 1)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Quick Actions")
                      ]),
                      createVNode("div", { class: "p-6 space-y-3" }, [
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.vendors.edit", __props.vendor.id),
                          class: "w-full inline-flex items-center justify-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
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
                            createTextVNode(" Edit Vendor ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          onClick: deleteVendor,
                          class: "w-full inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
                          createTextVNode(" Hapus Vendor ")
                        ])
                      ])
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Vendors/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-936fb7ec"]]);
export {
  Show as default
};
