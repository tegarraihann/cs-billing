import { withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-CTU0_3P0.js";
import { Users, FileText, Edit, ArrowLeft, Trash2 } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-k8TKLlBi.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    vendor: Object
  },
  setup(__props) {
    const props = __props;
    const routes = {
      "admin-keuangan.vendors.pdf": (id) => `/admin-keuangan/vendors/${id}/pdf`,
      "admin-keuangan.vendors.export.pdf": "/admin-keuangan/vendors/export/pdf"
    };
    const route = (name, params) => {
      if (routes[name]) {
        return typeof routes[name] === "function" ? routes[name](params) : routes[name];
      }
      return window.route ? window.route(name, params) : `#${name}`;
    };
    const formatDateTime = (dateString) => {
      return new Date(dateString).toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const deleteVendor = () => {
      if (confirm(`Apakah Anda yakin ingin menghapus vendor "${props.vendor.nama_vendor}"?`)) {
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
            _push2(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-b4467af1${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-b4467af1${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-b4467af1${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-b4467af1${_scopeId}><div class="flex items-center" data-v-b4467af1${_scopeId}><div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" data-v-b4467af1${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-b4467af1${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-b4467af1${_scopeId}>${ssrInterpolate(__props.vendor.nama_vendor)}</h1><p class="mt-1 text-sm text-gray-600" data-v-b4467af1${_scopeId}>Detail informasi vendor</p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-b4467af1${_scopeId}><a${ssrRenderAttr("href", route("admin-keuangan.vendors.pdf", __props.vendor.id))} target="_blank" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" data-v-b4467af1${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Export PDF </a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: route("admin-keuangan.vendors.edit", __props.vendor.id),
              class: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Edit), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Edit `);
                } else {
                  return [
                    createVNode(unref(Edit), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Edit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: route("admin-keuangan.vendors.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Kembali `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Kembali ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6" data-v-b4467af1${_scopeId}><div class="lg:col-span-1" data-v-b4467af1${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-b4467af1${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-b4467af1${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-b4467af1${_scopeId}>Informasi Vendor</h3></div><div class="p-6" data-v-b4467af1${_scopeId}><div class="space-y-6" data-v-b4467af1${_scopeId}><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}>ID Vendor</label><p class="text-gray-900 font-medium" data-v-b4467af1${_scopeId}>#${ssrInterpolate(__props.vendor.id)}</p></div><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> Nama Vendor </label><p class="text-gray-900" data-v-b4467af1${_scopeId}>${ssrInterpolate(__props.vendor.nama_vendor)}</p></div><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> PIC (Person In Charge) </label><p class="text-gray-900" data-v-b4467af1${_scopeId}>${ssrInterpolate(__props.vendor.pic || "-")}</p></div><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> No HP </label><p class="text-gray-900 font-mono" data-v-b4467af1${_scopeId}>${ssrInterpolate(__props.vendor.no_hp || "-")}</p></div><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> Email </label><p class="text-gray-900" data-v-b4467af1${_scopeId}>${ssrInterpolate(__props.vendor.email || "-")}</p></div><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> No Kantor </label><p class="text-gray-900 font-mono" data-v-b4467af1${_scopeId}>${ssrInterpolate(__props.vendor.no_kantor || "-")}</p></div><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> Nomor Rekening </label><p class="text-gray-900 font-mono" data-v-b4467af1${_scopeId}>${ssrInterpolate(__props.vendor.nomor_rekening)}</p></div><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> Nama Rekening </label><p class="text-gray-900" data-v-b4467af1${_scopeId}>${ssrInterpolate(__props.vendor.nama_rekening)}</p></div><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> NIB (Nomor Induk Berusaha) </label><p class="text-gray-900 font-mono" data-v-b4467af1${_scopeId}>${ssrInterpolate(__props.vendor.nib || "-")}</p></div><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> Foto Vendor </label>`);
            if (__props.vendor.photo_path) {
              _push2(`<div data-v-b4467af1${_scopeId}><img${ssrRenderAttr("src", `/storage/${__props.vendor.photo_path}`)} alt="Foto Vendor" class="w-32 h-32 object-cover rounded-lg border border-gray-200 mt-2" data-v-b4467af1${_scopeId}></div>`);
            } else {
              _push2(`<p class="text-gray-500 italic" data-v-b4467af1${_scopeId}>Tidak ada foto</p>`);
            }
            _push2(`</div><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> Dokumen Legal </label>`);
            if (__props.vendor.legal_document_path) {
              _push2(`<div data-v-b4467af1${_scopeId}><a${ssrRenderAttr("href", `/storage/${__props.vendor.legal_document_path}`)} target="_blank" class="inline-flex items-center px-4 py-2 mt-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors" data-v-b4467af1${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-b4467af1${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-b4467af1${_scopeId}></path></svg> Lihat Dokumen </a></div>`);
            } else {
              _push2(`<p class="text-gray-500 italic" data-v-b4467af1${_scopeId}>Tidak ada dokumen</p>`);
            }
            _push2(`</div></div></div></div></div><div class="lg:col-span-1" data-v-b4467af1${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-b4467af1${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-b4467af1${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-b4467af1${_scopeId}>Informasi Sistem</h3></div><div class="p-6" data-v-b4467af1${_scopeId}><div class="space-y-6" data-v-b4467af1${_scopeId}><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> Tanggal Dibuat </label><p class="text-gray-900" data-v-b4467af1${_scopeId}>${ssrInterpolate(formatDateTime(__props.vendor.created_at))}</p></div><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> Terakhir Diperbarui </label><p class="text-gray-900" data-v-b4467af1${_scopeId}>${ssrInterpolate(formatDateTime(__props.vendor.updated_at))}</p></div><div data-v-b4467af1${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-b4467af1${_scopeId}> Status </label><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" data-v-b4467af1${_scopeId}><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 8 8" data-v-b4467af1${_scopeId}><circle cx="4" cy="4" r="3" data-v-b4467af1${_scopeId}></circle></svg> Aktif </span></div></div></div></div><div class="mt-6" data-v-b4467af1${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-b4467af1${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-b4467af1${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-b4467af1${_scopeId}>Aksi</h3></div><div class="p-6" data-v-b4467af1${_scopeId}><div class="space-y-3" data-v-b4467af1${_scopeId}><a${ssrRenderAttr("href", route("admin-keuangan.vendors.pdf", __props.vendor.id))} target="_blank" class="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" data-v-b4467af1${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Export PDF </a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: route("admin-keuangan.vendors.edit", __props.vendor.id),
              class: "w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Edit), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Edit Vendor `);
                } else {
                  return [
                    createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Edit Vendor ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" data-v-b4467af1${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Hapus Vendor </button></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" }, [
                          createVNode(unref(Users), { class: "w-6 h-6 text-white" })
                        ]),
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, toDisplayString(__props.vendor.nama_vendor), 1),
                          createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Detail informasi vendor")
                        ])
                      ]),
                      createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                        createVNode("a", {
                          href: route("admin-keuangan.vendors.pdf", __props.vendor.id),
                          target: "_blank",
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        }, [
                          createVNode(unref(FileText), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Export PDF ")
                        ], 8, ["href"]),
                        createVNode(unref(Link), {
                          href: route("admin-keuangan.vendors.edit", __props.vendor.id),
                          class: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Edit), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Edit ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: route("admin-keuangan.vendors.index"),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Kembali ")
                          ]),
                          _: 1
                        }, 8, ["href"])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, [
                  createVNode("div", { class: "lg:col-span-1" }, [
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Informasi Vendor")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "space-y-6" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "ID Vendor"),
                            createVNode("p", { class: "text-gray-900 font-medium" }, "#" + toDisplayString(__props.vendor.id), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Nama Vendor "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.vendor.nama_vendor), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " PIC (Person In Charge) "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.vendor.pic || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " No HP "),
                            createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(__props.vendor.no_hp || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Email "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.vendor.email || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " No Kantor "),
                            createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(__props.vendor.no_kantor || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Nomor Rekening "),
                            createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(__props.vendor.nomor_rekening), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Nama Rekening "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.vendor.nama_rekening), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " NIB (Nomor Induk Berusaha) "),
                            createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(__props.vendor.nib || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Foto Vendor "),
                            __props.vendor.photo_path ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("img", {
                                src: `/storage/${__props.vendor.photo_path}`,
                                alt: "Foto Vendor",
                                class: "w-32 h-32 object-cover rounded-lg border border-gray-200 mt-2"
                              }, null, 8, ["src"])
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-gray-500 italic"
                            }, "Tidak ada foto"))
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Dokumen Legal "),
                            __props.vendor.legal_document_path ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode("a", {
                                href: `/storage/${__props.vendor.legal_document_path}`,
                                target: "_blank",
                                class: "inline-flex items-center px-4 py-2 mt-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
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
                                    d: "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                  })
                                ])),
                                createTextVNode(" Lihat Dokumen ")
                              ], 8, ["href"])
                            ])) : (openBlock(), createBlock("p", {
                              key: 1,
                              class: "text-gray-500 italic"
                            }, "Tidak ada dokumen"))
                          ])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "lg:col-span-1" }, [
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Informasi Sistem")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "space-y-6" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Tanggal Dibuat "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.vendor.created_at)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Terakhir Diperbarui "),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.vendor.updated_at)), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Status "),
                            createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-3 h-3 mr-1",
                                fill: "currentColor",
                                viewBox: "0 0 8 8"
                              }, [
                                createVNode("circle", {
                                  cx: "4",
                                  cy: "4",
                                  r: "3"
                                })
                              ])),
                              createTextVNode(" Aktif ")
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "mt-6" }, [
                      createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Aksi")
                        ]),
                        createVNode("div", { class: "p-6" }, [
                          createVNode("div", { class: "space-y-3" }, [
                            createVNode("a", {
                              href: route("admin-keuangan.vendors.pdf", __props.vendor.id),
                              target: "_blank",
                              class: "w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            }, [
                              createVNode(unref(FileText), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Export PDF ")
                            ], 8, ["href"]),
                            createVNode(unref(Link), {
                              href: route("admin-keuangan.vendors.edit", __props.vendor.id),
                              class: "w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Edit), { class: "w-4 h-4 mr-2" }),
                                createTextVNode(" Edit Vendor ")
                              ]),
                              _: 1
                            }, 8, ["href"]),
                            createVNode("button", {
                              onClick: deleteVendor,
                              class: "w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            }, [
                              createVNode(unref(Trash2), { class: "w-4 h-4 mr-2" }),
                              createTextVNode(" Hapus Vendor ")
                            ])
                          ])
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
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b4467af1"]]);
export {
  Show as default
};
