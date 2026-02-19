import { computed, withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { usePage, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { Users, FileText, Edit, ArrowLeft } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./useIdleTimeout-CR--SBvC.js";
import "axios";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    vendor: Object
  },
  setup(__props) {
    const props = __props;
    const page = usePage();
    const backQuery = computed(() => {
      const queryString = page.url.includes("?") ? page.url.split("?")[1] : "";
      const params = new URLSearchParams(queryString);
      const query = {};
      ["search", "page"].forEach((key) => {
        const value = params.get(key);
        if (value) {
          query[key] = value;
        }
      });
      return query;
    });
    const backToIndexUrl = computed(() => route("admin-keuangan.vendors.index", backQuery.value));
    const editVendorUrl = computed(() => route("admin-keuangan.vendors.edit", {
      vendor: props.vendor.id,
      ...backQuery.value
    }));
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
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-6" data-v-1989041a${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-1989041a${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-1989041a${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-1989041a${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-1989041a${_scopeId}><div class="flex items-center" data-v-1989041a${_scopeId}><div class="w-12 h-12 bg-sage-800 rounded-full flex items-center justify-center mr-4" data-v-1989041a${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-1989041a${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-1989041a${_scopeId}>${ssrInterpolate(__props.vendor.nama_vendor)}</h1><p class="mt-1 text-sm text-gray-600" data-v-1989041a${_scopeId}>Vendor details and profile</p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-1989041a${_scopeId}><a${ssrRenderAttr("href", route("admin-keuangan.vendors.pdf", __props.vendor.id))} target="_blank" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-sage-600 text-sm font-medium text-white hover:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" data-v-1989041a${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Export PDF </a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: editVendorUrl.value,
              class: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
              href: backToIndexUrl.value,
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Back `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Back ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-1989041a${_scopeId}><div class="lg:col-span-2" data-v-1989041a${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-1989041a${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-1989041a${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-1989041a${_scopeId}>Vendor Information</h3></div><div class="p-6" data-v-1989041a${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-1989041a${_scopeId}><div data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}>Vendor ID</label><p class="text-gray-900 font-medium" data-v-1989041a${_scopeId}>#${ssrInterpolate(__props.vendor.id)}</p></div><div data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> Vendor Name </label><p class="text-gray-900" data-v-1989041a${_scopeId}>${ssrInterpolate(__props.vendor.nama_vendor)}</p></div><div data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> Primary Contact (PIC) </label><p class="text-gray-900" data-v-1989041a${_scopeId}>${ssrInterpolate(__props.vendor.pic || "-")}</p></div><div data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> Mobile Phone </label><p class="text-gray-900 font-mono" data-v-1989041a${_scopeId}>${ssrInterpolate(__props.vendor.no_hp || "-")}</p></div><div data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> Email </label><p class="text-gray-900" data-v-1989041a${_scopeId}>${ssrInterpolate(__props.vendor.email || "-")}</p></div><div data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> Office Phone </label><p class="text-gray-900 font-mono" data-v-1989041a${_scopeId}>${ssrInterpolate(__props.vendor.no_kantor || "-")}</p></div><div data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> Account Number </label><p class="text-gray-900 font-mono" data-v-1989041a${_scopeId}>${ssrInterpolate(__props.vendor.nomor_rekening)}</p></div><div data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> Account Name </label><p class="text-gray-900" data-v-1989041a${_scopeId}>${ssrInterpolate(__props.vendor.nama_rekening)}</p></div><div data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> NIB (Business Registration ID) </label><p class="text-gray-900 font-mono" data-v-1989041a${_scopeId}>${ssrInterpolate(__props.vendor.nib || "-")}</p></div><div class="md:col-span-2" data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> Vendor Photo </label>`);
            if (__props.vendor.photo_path) {
              _push2(`<div data-v-1989041a${_scopeId}><img${ssrRenderAttr("src", `/storage/${__props.vendor.photo_path}`)} alt="Vendor Photo" class="w-32 h-32 object-cover rounded-lg border border-gray-200 mt-2" data-v-1989041a${_scopeId}></div>`);
            } else {
              _push2(`<p class="text-gray-500 italic" data-v-1989041a${_scopeId}>No photo available</p>`);
            }
            _push2(`</div><div class="md:col-span-2" data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> Legal Document </label>`);
            if (__props.vendor.legal_document_path) {
              _push2(`<div data-v-1989041a${_scopeId}><a${ssrRenderAttr("href", `/storage/${__props.vendor.legal_document_path}`)} target="_blank" class="inline-flex items-center px-4 py-2 mt-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors" data-v-1989041a${_scopeId}><svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-1989041a${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-1989041a${_scopeId}></path></svg> View Document </a></div>`);
            } else {
              _push2(`<p class="text-gray-500 italic" data-v-1989041a${_scopeId}>No document available</p>`);
            }
            _push2(`</div></div></div></div></div><div class="lg:col-span-1" data-v-1989041a${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-1989041a${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-1989041a${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-1989041a${_scopeId}>System Information</h3></div><div class="p-6" data-v-1989041a${_scopeId}><div class="space-y-6" data-v-1989041a${_scopeId}><div data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> Created Date </label><p class="text-gray-900" data-v-1989041a${_scopeId}>${ssrInterpolate(formatDateTime(__props.vendor.created_at))}</p></div><div data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> Last Updated </label><p class="text-gray-900" data-v-1989041a${_scopeId}>${ssrInterpolate(formatDateTime(__props.vendor.updated_at))}</p></div><div data-v-1989041a${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-1" data-v-1989041a${_scopeId}> Status </label><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" data-v-1989041a${_scopeId}><svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 8 8" data-v-1989041a${_scopeId}><circle cx="4" cy="4" r="3" data-v-1989041a${_scopeId}></circle></svg> Active </span></div></div></div></div></div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-6" }, [
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
                            createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Vendor details and profile")
                          ])
                        ]),
                        createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                          createVNode("a", {
                            href: route("admin-keuangan.vendors.pdf", __props.vendor.id),
                            target: "_blank",
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-sage-600 text-sm font-medium text-white hover:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          }, [
                            createVNode(unref(FileText), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Export PDF ")
                          ], 8, ["href"]),
                          createVNode(unref(Link), {
                            href: editVendorUrl.value,
                            class: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-600 hover:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Edit), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Edit ")
                            ]),
                            _: 1
                          }, 8, ["href"]),
                          createVNode(unref(Link), {
                            href: backToIndexUrl.value,
                            class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(ArrowLeft), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Back ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "grid grid-cols-1 lg:grid-cols-3 gap-6" }, [
                    createVNode("div", { class: "lg:col-span-2" }, [
                      createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Vendor Information")
                        ]),
                        createVNode("div", { class: "p-6" }, [
                          createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, "Vendor ID"),
                              createVNode("p", { class: "text-gray-900 font-medium" }, "#" + toDisplayString(__props.vendor.id), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Vendor Name "),
                              createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.vendor.nama_vendor), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Primary Contact (PIC) "),
                              createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.vendor.pic || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Mobile Phone "),
                              createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(__props.vendor.no_hp || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Email "),
                              createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.vendor.email || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Office Phone "),
                              createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(__props.vendor.no_kantor || "-"), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Account Number "),
                              createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(__props.vendor.nomor_rekening), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Account Name "),
                              createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.vendor.nama_rekening), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " NIB (Business Registration ID) "),
                              createVNode("p", { class: "text-gray-900 font-mono" }, toDisplayString(__props.vendor.nib || "-"), 1)
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Vendor Photo "),
                              __props.vendor.photo_path ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("img", {
                                  src: `/storage/${__props.vendor.photo_path}`,
                                  alt: "Vendor Photo",
                                  class: "w-32 h-32 object-cover rounded-lg border border-gray-200 mt-2"
                                }, null, 8, ["src"])
                              ])) : (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-gray-500 italic"
                              }, "No photo available"))
                            ]),
                            createVNode("div", { class: "md:col-span-2" }, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Legal Document "),
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
                                  createTextVNode(" View Document ")
                                ], 8, ["href"])
                              ])) : (openBlock(), createBlock("p", {
                                key: 1,
                                class: "text-gray-500 italic"
                              }, "No document available"))
                            ])
                          ])
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "lg:col-span-1" }, [
                      createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                        createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                          createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "System Information")
                        ]),
                        createVNode("div", { class: "p-6" }, [
                          createVNode("div", { class: "space-y-6" }, [
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Created Date "),
                              createVNode("p", { class: "text-gray-900" }, toDisplayString(formatDateTime(__props.vendor.created_at)), 1)
                            ]),
                            createVNode("div", null, [
                              createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-1" }, " Last Updated "),
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
                                createTextVNode(" Active ")
                              ])
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
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1989041a"]]);
export {
  Show as default
};
