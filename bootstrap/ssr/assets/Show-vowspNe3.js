import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, toDisplayString, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-Bh_iK4Af.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
import "./SidebarNavigation-COHQr_F5.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    customer: Object
  },
  setup(__props) {
    const routes = {
      "admin-keuangan.customers.pdf": (id) => `/admin-keuangan/customers/${id}/pdf`
    };
    const route = (name, params) => {
      if (routes[name]) {
        return typeof routes[name] === "function" ? routes[name](params) : routes[name];
      }
      return window.route ? window.route(name, params) : `#${name}`;
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-44f8e1b3${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-44f8e1b3${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-44f8e1b3${_scopeId}><div class="flex items-center" data-v-44f8e1b3${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-44f8e1b3${_scopeId}><svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-44f8e1b3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-44f8e1b3${_scopeId}></path></svg></div><div data-v-44f8e1b3${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.company_name)}</h2><p class="text-sage-600" data-v-44f8e1b3${_scopeId}> Detail informasi pelanggan </p></div></div><div class="flex space-x-2 mt-4 sm:mt-0" data-v-44f8e1b3${_scopeId}><a${ssrRenderAttr("href", route("admin-keuangan.customers.pdf", __props.customer.id))} target="_blank" class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-44f8e1b3${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-44f8e1b3${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" data-v-44f8e1b3${_scopeId}></path></svg> Export PDF </a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: route("admin-keuangan.customers.edit", __props.customer.id),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-44f8e1b3${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-44f8e1b3${_scopeId2}></path></svg> Edit `);
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
              href: route("admin-keuangan.customers.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-44f8e1b3${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-44f8e1b3${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-44f8e1b3${_scopeId}><div class="lg:col-span-2 space-y-6" data-v-44f8e1b3${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-44f8e1b3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-44f8e1b3${_scopeId}><h3 class="text-lg font-semibold text-sage-800 flex items-center" data-v-44f8e1b3${_scopeId}> 🏢 Informasi Perusahaan </h3></div><div class="p-6" data-v-44f8e1b3${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-44f8e1b3${_scopeId}><div data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Nama Perusahaan</label><p class="text-sage-900 font-medium" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.company_name || "-")}</p></div><div data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Jenis Usaha</label><p class="text-sage-900 font-medium" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.company_type || "-")}</p></div><div class="md:col-span-2" data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Alamat</label><p class="text-sage-900" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.company_address || "-")}</p></div>`);
            if (__props.customer.invoice_address) {
              _push2(`<div class="md:col-span-2" data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Alamat Invoice</label><p class="text-sage-900" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.invoice_address)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-44f8e1b3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-44f8e1b3${_scopeId}><h3 class="text-lg font-semibold text-sage-800 flex items-center" data-v-44f8e1b3${_scopeId}> 👤 Informasi PIC </h3></div><div class="p-6" data-v-44f8e1b3${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-44f8e1b3${_scopeId}><div data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Nama PIC</label><p class="text-sage-900 font-medium" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.pic_name || "-")}</p></div><div data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Email PIC</label><p class="text-sage-900 font-medium" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.pic_email || "-")}</p></div><div class="md:col-span-2" data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Telepon PIC</label><p class="text-sage-900" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.pic_phone || "-")}</p></div></div></div></div>`);
            if (__props.customer.nib || __props.customer.npwp || __props.customer.ktp_number) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-44f8e1b3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-44f8e1b3${_scopeId}><h3 class="text-lg font-semibold text-sage-800 flex items-center" data-v-44f8e1b3${_scopeId}> 📄 Data Legalitas </h3></div><div class="p-6" data-v-44f8e1b3${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-44f8e1b3${_scopeId}>`);
              if (__props.customer.nib) {
                _push2(`<div data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>NIB</label><p class="text-sage-900 font-medium" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.nib)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.customer.npwp) {
                _push2(`<div data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>NPWP</label><p class="text-sage-900 font-medium" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.npwp)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.customer.ktp_number) {
                _push2(`<div data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Nomor KTP</label><p class="text-sage-900 font-medium" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.ktp_number)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-6" data-v-44f8e1b3${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-44f8e1b3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-44f8e1b3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-44f8e1b3${_scopeId}>Status</h3></div><div class="p-6 space-y-3" data-v-44f8e1b3${_scopeId}><div class="flex items-center justify-between" data-v-44f8e1b3${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Status Pelanggan</span><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" data-v-44f8e1b3${_scopeId}> Aktif </span></div><div class="flex items-center justify-between" data-v-44f8e1b3${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Dibuat</span><span class="text-sage-900 text-sm" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(formatDate(__props.customer.created_at))}</span></div>`);
            if (__props.customer.handler) {
              _push2(`<div class="flex items-center justify-between" data-v-44f8e1b3${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Ditangani oleh</span><span class="text-sage-900 text-sm font-medium" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.handler.name)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.customer.marketing_name || __props.customer.marketing_email || __props.customer.marketing_phone) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-44f8e1b3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-44f8e1b3${_scopeId}><h3 class="text-lg font-semibold text-sage-800 flex items-center" data-v-44f8e1b3${_scopeId}> 📈 Data Marketing </h3></div><div class="p-6 space-y-3" data-v-44f8e1b3${_scopeId}>`);
              if (__props.customer.marketing_name) {
                _push2(`<div data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Nama Marketing</label><p class="text-sage-900 font-medium" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.marketing_name)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.customer.marketing_email) {
                _push2(`<div data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Email Marketing</label><p class="text-sage-900" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.marketing_email)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.customer.marketing_phone) {
                _push2(`<div data-v-44f8e1b3${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Telepon Marketing</label><p class="text-sage-900" data-v-44f8e1b3${_scopeId}>${ssrInterpolate(__props.customer.marketing_phone)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.customer.photo_path || __props.customer.legal_document_path) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-44f8e1b3${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-44f8e1b3${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-44f8e1b3${_scopeId}>Dokumen</h3></div><div class="p-6 space-y-3" data-v-44f8e1b3${_scopeId}>`);
              if (__props.customer.photo_path) {
                _push2(`<div class="flex items-center justify-between" data-v-44f8e1b3${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Foto</span><a${ssrRenderAttr("href", `/storage/${__props.customer.photo_path}`)} target="_blank" class="text-sage-600 hover:text-sage-700 text-sm" data-v-44f8e1b3${_scopeId}> Lihat Foto </a></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.customer.legal_document_path) {
                _push2(`<div class="flex items-center justify-between" data-v-44f8e1b3${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-44f8e1b3${_scopeId}>Dokumen Legal</span><a${ssrRenderAttr("href", `/storage/${__props.customer.legal_document_path}`)} target="_blank" class="text-sage-600 hover:text-sage-700 text-sm" data-v-44f8e1b3${_scopeId}> Download PDF </a></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
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
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, toDisplayString(__props.customer.company_name), 1),
                        createVNode("p", { class: "text-sage-600" }, " Detail informasi pelanggan ")
                      ])
                    ]),
                    createVNode("div", { class: "flex space-x-2 mt-4 sm:mt-0" }, [
                      createVNode("a", {
                        href: route("admin-keuangan.customers.pdf", __props.customer.id),
                        target: "_blank",
                        class: "inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
                            d: "M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                          })
                        ])),
                        createTextVNode(" Export PDF ")
                      ], 8, ["href"]),
                      createVNode(unref(Link), {
                        href: route("admin-keuangan.customers.edit", __props.customer.id),
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
                        href: route("admin-keuangan.customers.index"),
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
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800 flex items-center" }, " 🏢 Informasi Perusahaan ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Nama Perusahaan"),
                            createVNode("p", { class: "text-sage-900 font-medium" }, toDisplayString(__props.customer.company_name || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Jenis Usaha"),
                            createVNode("p", { class: "text-sage-900 font-medium" }, toDisplayString(__props.customer.company_type || "-"), 1)
                          ]),
                          createVNode("div", { class: "md:col-span-2" }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Alamat"),
                            createVNode("p", { class: "text-sage-900" }, toDisplayString(__props.customer.company_address || "-"), 1)
                          ]),
                          __props.customer.invoice_address ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "md:col-span-2"
                          }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Alamat Invoice"),
                            createVNode("p", { class: "text-sage-900" }, toDisplayString(__props.customer.invoice_address), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800 flex items-center" }, " 👤 Informasi PIC ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Nama PIC"),
                            createVNode("p", { class: "text-sage-900 font-medium" }, toDisplayString(__props.customer.pic_name || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Email PIC"),
                            createVNode("p", { class: "text-sage-900 font-medium" }, toDisplayString(__props.customer.pic_email || "-"), 1)
                          ]),
                          createVNode("div", { class: "md:col-span-2" }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Telepon PIC"),
                            createVNode("p", { class: "text-sage-900" }, toDisplayString(__props.customer.pic_phone || "-"), 1)
                          ])
                        ])
                      ])
                    ]),
                    __props.customer.nib || __props.customer.npwp || __props.customer.ktp_number ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white rounded-lg shadow-sm border border-sage-200"
                    }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800 flex items-center" }, " 📄 Data Legalitas ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          __props.customer.nib ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "NIB"),
                            createVNode("p", { class: "text-sage-900 font-medium" }, toDisplayString(__props.customer.nib), 1)
                          ])) : createCommentVNode("", true),
                          __props.customer.npwp ? (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "NPWP"),
                            createVNode("p", { class: "text-sage-900 font-medium" }, toDisplayString(__props.customer.npwp), 1)
                          ])) : createCommentVNode("", true),
                          __props.customer.ktp_number ? (openBlock(), createBlock("div", { key: 2 }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Nomor KTP"),
                            createVNode("p", { class: "text-sage-900 font-medium" }, toDisplayString(__props.customer.ktp_number), 1)
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
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Status Pelanggan"),
                          createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" }, " Aktif ")
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Dibuat"),
                          createVNode("span", { class: "text-sage-900 text-sm" }, toDisplayString(formatDate(__props.customer.created_at)), 1)
                        ]),
                        __props.customer.handler ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-between"
                        }, [
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Ditangani oleh"),
                          createVNode("span", { class: "text-sage-900 text-sm font-medium" }, toDisplayString(__props.customer.handler.name), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    __props.customer.marketing_name || __props.customer.marketing_email || __props.customer.marketing_phone ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white rounded-lg shadow-sm border border-sage-200"
                    }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800 flex items-center" }, " 📈 Data Marketing ")
                      ]),
                      createVNode("div", { class: "p-6 space-y-3" }, [
                        __props.customer.marketing_name ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Nama Marketing"),
                          createVNode("p", { class: "text-sage-900 font-medium" }, toDisplayString(__props.customer.marketing_name), 1)
                        ])) : createCommentVNode("", true),
                        __props.customer.marketing_email ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Email Marketing"),
                          createVNode("p", { class: "text-sage-900" }, toDisplayString(__props.customer.marketing_email), 1)
                        ])) : createCommentVNode("", true),
                        __props.customer.marketing_phone ? (openBlock(), createBlock("div", { key: 2 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Telepon Marketing"),
                          createVNode("p", { class: "text-sage-900" }, toDisplayString(__props.customer.marketing_phone), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])) : createCommentVNode("", true),
                    __props.customer.photo_path || __props.customer.legal_document_path ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "bg-white rounded-lg shadow-sm border border-sage-200"
                    }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                        createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Dokumen")
                      ]),
                      createVNode("div", { class: "p-6 space-y-3" }, [
                        __props.customer.photo_path ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-between"
                        }, [
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Foto"),
                          createVNode("a", {
                            href: `/storage/${__props.customer.photo_path}`,
                            target: "_blank",
                            class: "text-sage-600 hover:text-sage-700 text-sm"
                          }, " Lihat Foto ", 8, ["href"])
                        ])) : createCommentVNode("", true),
                        __props.customer.legal_document_path ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex items-center justify-between"
                        }, [
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Dokumen Legal"),
                          createVNode("a", {
                            href: `/storage/${__props.customer.legal_document_path}`,
                            target: "_blank",
                            class: "text-sage-600 hover:text-sage-700 text-sm"
                          }, " Download PDF ", 8, ["href"])
                        ])) : createCommentVNode("", true)
                      ])
                    ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Customers/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-44f8e1b3"]]);
export {
  Show as default
};
