import { withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-KfHTSO_U.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    customer: Object
  },
  setup(__props) {
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-647d292d${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-647d292d${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-647d292d${_scopeId}><div class="flex items-center" data-v-647d292d${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-647d292d${_scopeId}><span class="text-white font-semibold text-lg" data-v-647d292d${_scopeId}>${ssrInterpolate(getInitials(__props.customer.name))}</span></div><div data-v-647d292d${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-647d292d${_scopeId}>${ssrInterpolate(__props.customer.name)}</h2><p class="text-sage-600" data-v-647d292d${_scopeId}> Detail informasi pelanggan dan riwayat komunikasi </p></div></div><div class="flex space-x-2 mt-4 sm:mt-0" data-v-647d292d${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.customers.edit", __props.customer.id),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-647d292d${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-647d292d${_scopeId2}></path></svg> Edit `);
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
              href: _ctx.route("admin-cs.customers.index"),
              class: "inline-flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-647d292d${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" data-v-647d292d${_scopeId2}></path></svg> Kembali `);
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
            _push2(`</div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" data-v-647d292d${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-647d292d${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-647d292d${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-647d292d${_scopeId}>Informasi Dasar</h3></div><div class="p-6 space-y-4" data-v-647d292d${_scopeId}><div data-v-647d292d${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-647d292d${_scopeId}>Nama Lengkap</label><p class="mt-1 text-sm text-gray-900 font-semibold" data-v-647d292d${_scopeId}>${ssrInterpolate(__props.customer.name)}</p></div><div data-v-647d292d${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-647d292d${_scopeId}>Email</label><p class="mt-1 text-sm" data-v-647d292d${_scopeId}><a${ssrRenderAttr("href", `mailto:${__props.customer.email}`)} class="text-sage-600 hover:text-sage-800 transition-colors" data-v-647d292d${_scopeId}>${ssrInterpolate(__props.customer.email)}</a></p></div><div data-v-647d292d${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-647d292d${_scopeId}>Nomor Telepon</label><p class="mt-1 text-sm" data-v-647d292d${_scopeId}><a${ssrRenderAttr("href", `tel:${__props.customer.phone}`)} class="text-sage-600 hover:text-sage-800 transition-colors" data-v-647d292d${_scopeId}>${ssrInterpolate(__props.customer.phone)}</a></p></div><div data-v-647d292d${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-647d292d${_scopeId}>Perusahaan</label><p class="mt-1 text-sm text-gray-900" data-v-647d292d${_scopeId}>${ssrInterpolate(__props.customer.company || "-")}</p></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-647d292d${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-647d292d${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-647d292d${_scopeId}>Status &amp; Tracking</h3></div><div class="p-6 space-y-4" data-v-647d292d${_scopeId}><div data-v-647d292d${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-647d292d${_scopeId}>Sumber Inquiry</label><p class="mt-1 text-sm text-gray-900" data-v-647d292d${_scopeId}>${ssrInterpolate(__props.customer.inquiry_source_label)}</p></div><div data-v-647d292d${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-647d292d${_scopeId}>Status</label><span class="${ssrRenderClass([__props.customer.status_color, "inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1"])}" data-v-647d292d${_scopeId}>${ssrInterpolate(__props.customer.status_label)}</span></div><div data-v-647d292d${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-647d292d${_scopeId}>Ditangani Oleh</label><p class="mt-1 text-sm text-gray-900" data-v-647d292d${_scopeId}>${ssrInterpolate(((_a = __props.customer.handler) == null ? void 0 : _a.name) || "-")}</p></div><div data-v-647d292d${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-647d292d${_scopeId}>Kontak Terakhir</label><p class="mt-1 text-sm text-gray-900" data-v-647d292d${_scopeId}>${ssrInterpolate(__props.customer.last_contact_at ? formatDate(__props.customer.last_contact_at) : "-")}</p></div><div data-v-647d292d${_scopeId}><label class="block text-sm font-medium text-sage-700" data-v-647d292d${_scopeId}>Tanggal Dibuat</label><p class="mt-1 text-sm text-gray-900" data-v-647d292d${_scopeId}>${ssrInterpolate(formatDate(__props.customer.created_at))}</p></div></div></div></div>`);
            if (__props.customer.address) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6" data-v-647d292d${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-647d292d${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-647d292d${_scopeId}>Alamat</h3></div><div class="p-6" data-v-647d292d${_scopeId}><p class="text-sm text-gray-900 whitespace-pre-line" data-v-647d292d${_scopeId}>${ssrInterpolate(__props.customer.address)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.customer.notes) {
              _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6" data-v-647d292d${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-647d292d${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-647d292d${_scopeId}>Catatan</h3></div><div class="p-6" data-v-647d292d${_scopeId}><p class="text-sm text-gray-900 whitespace-pre-line" data-v-647d292d${_scopeId}>${ssrInterpolate(__props.customer.notes)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-647d292d${_scopeId}><div class="px-6 py-4 border-b border-sage-200 bg-sage-50" data-v-647d292d${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-647d292d${_scopeId}>Aksi Cepat</h3></div><div class="p-6" data-v-647d292d${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-3 gap-4" data-v-647d292d${_scopeId}><a${ssrRenderAttr("href", `https://wa.me/${__props.customer.phone.replace(/[^0-9]/g, "")}`)} target="_blank" class="inline-flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors" data-v-647d292d${_scopeId}><svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" data-v-647d292d${_scopeId}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" data-v-647d292d${_scopeId}></path></svg> WhatsApp </a><a${ssrRenderAttr("href", `mailto:${__props.customer.email}?subject=Inquiry%20Follow-up`)} class="inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-647d292d${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-647d292d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" data-v-647d292d${_scopeId}></path></svg> Email </a><a${ssrRenderAttr("href", `tel:${__props.customer.phone}`)} class="inline-flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors" data-v-647d292d${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-647d292d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" data-v-647d292d${_scopeId}></path></svg> Telepon </a></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("div", { class: "w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" }, [
                        createVNode("span", { class: "text-white font-semibold text-lg" }, toDisplayString(getInitials(__props.customer.name)), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, toDisplayString(__props.customer.name), 1),
                        createVNode("p", { class: "text-sage-600" }, " Detail informasi pelanggan dan riwayat komunikasi ")
                      ])
                    ]),
                    createVNode("div", { class: "flex space-x-2 mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.customers.edit", __props.customer.id),
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
                        href: _ctx.route("admin-cs.customers.index"),
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
                createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" }, [
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Informasi Dasar")
                    ]),
                    createVNode("div", { class: "p-6 space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "Nama Lengkap"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-900 font-semibold" }, toDisplayString(__props.customer.name), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "Email"),
                        createVNode("p", { class: "mt-1 text-sm" }, [
                          createVNode("a", {
                            href: `mailto:${__props.customer.email}`,
                            class: "text-sage-600 hover:text-sage-800 transition-colors"
                          }, toDisplayString(__props.customer.email), 9, ["href"])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "Nomor Telepon"),
                        createVNode("p", { class: "mt-1 text-sm" }, [
                          createVNode("a", {
                            href: `tel:${__props.customer.phone}`,
                            class: "text-sage-600 hover:text-sage-800 transition-colors"
                          }, toDisplayString(__props.customer.phone), 9, ["href"])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "Perusahaan"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.customer.company || "-"), 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                      createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Status & Tracking")
                    ]),
                    createVNode("div", { class: "p-6 space-y-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "Sumber Inquiry"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.customer.inquiry_source_label), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "Status"),
                        createVNode("span", {
                          class: [__props.customer.status_color, "inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1"]
                        }, toDisplayString(__props.customer.status_label), 3)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "Ditangani Oleh"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(((_b = __props.customer.handler) == null ? void 0 : _b.name) || "-"), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "Kontak Terakhir"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(__props.customer.last_contact_at ? formatDate(__props.customer.last_contact_at) : "-"), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-sage-700" }, "Tanggal Dibuat"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-900" }, toDisplayString(formatDate(__props.customer.created_at)), 1)
                      ])
                    ])
                  ])
                ]),
                __props.customer.address ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6"
                }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Alamat")
                  ]),
                  createVNode("div", { class: "p-6" }, [
                    createVNode("p", { class: "text-sm text-gray-900 whitespace-pre-line" }, toDisplayString(__props.customer.address), 1)
                  ])
                ])) : createCommentVNode("", true),
                __props.customer.notes ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden mb-6"
                }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Catatan")
                  ]),
                  createVNode("div", { class: "p-6" }, [
                    createVNode("p", { class: "text-sm text-gray-900 whitespace-pre-line" }, toDisplayString(__props.customer.notes), 1)
                  ])
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200 bg-sage-50" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Aksi Cepat")
                  ]),
                  createVNode("div", { class: "p-6" }, [
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4" }, [
                      createVNode("a", {
                        href: `https://wa.me/${__props.customer.phone.replace(/[^0-9]/g, "")}`,
                        target: "_blank",
                        class: "inline-flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      }, [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5 mr-2",
                          fill: "currentColor",
                          viewBox: "0 0 24 24"
                        }, [
                          createVNode("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106" })
                        ])),
                        createTextVNode(" WhatsApp ")
                      ], 8, ["href"]),
                      createVNode("a", {
                        href: `mailto:${__props.customer.email}?subject=Inquiry%20Follow-up`,
                        class: "inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
                            d: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          })
                        ])),
                        createTextVNode(" Email ")
                      ], 8, ["href"]),
                      createVNode("a", {
                        href: `tel:${__props.customer.phone}`,
                        class: "inline-flex items-center justify-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
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
                            d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          })
                        ])),
                        createTextVNode(" Telepon ")
                      ], 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Customers/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-647d292d"]]);
export {
  Show as default
};
