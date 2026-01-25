import { withCtx, unref, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from "vue/server-renderer";
import { Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BXHi-kqO.js";
import { Users, FileText, Edit, ArrowLeft, TrendingUp } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./useIdleTimeout-BVnZv5Lp.js";
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
            _push2(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-61481228${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-61481228${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-61481228${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-61481228${_scopeId}><div class="flex items-center" data-v-61481228${_scopeId}><div class="w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" data-v-61481228${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Users), { class: "w-6 h-6 text-white" }, null, _parent2, _scopeId));
            _push2(`</div><div data-v-61481228${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.company_name)}</h1><p class="mt-1 text-sm text-gray-600" data-v-61481228${_scopeId}>Customer information details</p></div></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-61481228${_scopeId}><a${ssrRenderAttr("href", route("admin-keuangan.customers.pdf", __props.customer.id))} target="_blank" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-sage-600 text-sm font-medium text-white hover:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-61481228${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileText), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Export PDF </a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: route("admin-keuangan.customers.edit", __props.customer.id),
              class: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-700 hover:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
              href: route("admin-keuangan.customers.index"),
              class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
            _push2(`</div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-61481228${_scopeId}><div class="lg:col-span-2 space-y-6" data-v-61481228${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-61481228${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-61481228${_scopeId}><h3 class="text-lg font-medium text-gray-900 flex items-center" data-v-61481228${_scopeId}> Company Information </h3></div><div class="p-6" data-v-61481228${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-61481228${_scopeId}><div data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>Company Name</label><p class="text-gray-900 font-medium" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.company_name || "-")}</p></div><div data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>Business Type</label><p class="text-gray-900 font-medium" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.company_type || "-")}</p></div><div class="md:col-span-2" data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>Address</label><p class="text-gray-900" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.company_address || "-")}</p></div>`);
            if (__props.customer.invoice_address) {
              _push2(`<div class="md:col-span-2" data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>Invoice Address</label><p class="text-gray-900" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.invoice_address)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-61481228${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-61481228${_scopeId}><h3 class="text-lg font-medium text-gray-900 flex items-center" data-v-61481228${_scopeId}> PIC Information </h3></div><div class="p-6" data-v-61481228${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-61481228${_scopeId}><div data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>PIC Name</label><p class="text-gray-900 font-medium" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.pic_name || "-")}</p></div><div data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>PIC Email</label><p class="text-gray-900 font-medium" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.pic_email || "-")}</p></div><div class="md:col-span-2" data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>PIC Phone</label><p class="text-gray-900" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.pic_phone || "-")}</p></div></div></div></div>`);
            if (__props.customer.nib || __props.customer.npwp || __props.customer.ktp_number) {
              _push2(`<div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-61481228${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-61481228${_scopeId}><h3 class="text-lg font-medium text-gray-900 flex items-center" data-v-61481228${_scopeId}> Legal Information </h3></div><div class="p-6" data-v-61481228${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-61481228${_scopeId}>`);
              if (__props.customer.nib) {
                _push2(`<div data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>NIB</label><p class="text-gray-900 font-medium" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.nib)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.customer.npwp) {
                _push2(`<div data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>NPWP</label><p class="text-gray-900 font-medium" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.npwp)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.customer.ktp_number) {
                _push2(`<div data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>National ID Number (KTP)</label><p class="text-gray-900 font-medium" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.ktp_number)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="space-y-6" data-v-61481228${_scopeId}><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-61481228${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-61481228${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-61481228${_scopeId}>Status</h3></div><div class="p-6 space-y-3" data-v-61481228${_scopeId}><div class="flex items-center justify-between" data-v-61481228${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>Customer Status</span><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" data-v-61481228${_scopeId}> Active </span></div><div class="flex items-center justify-between" data-v-61481228${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>Created</span><span class="text-gray-900 text-sm" data-v-61481228${_scopeId}>${ssrInterpolate(formatDate(__props.customer.created_at))}</span></div>`);
            if (__props.customer.handler) {
              _push2(`<div class="flex items-center justify-between" data-v-61481228${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>Handled By</span><span class="text-gray-900 text-sm font-medium" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.handler.name)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (__props.customer.marketing_name || __props.customer.marketing_email || __props.customer.marketing_phone) {
              _push2(`<div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-61481228${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-61481228${_scopeId}><h3 class="text-lg font-medium text-gray-900 flex items-center" data-v-61481228${_scopeId}>`);
              _push2(ssrRenderComponent(unref(TrendingUp), { class: "mr-2 h-5 w-5" }, null, _parent2, _scopeId));
              _push2(` Marketing Information </h3></div><div class="p-6 space-y-3" data-v-61481228${_scopeId}>`);
              if (__props.customer.marketing_name) {
                _push2(`<div data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>Marketing Name</label><p class="text-gray-900 font-medium" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.marketing_name)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.customer.marketing_email) {
                _push2(`<div data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>Marketing Email</label><p class="text-gray-900" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.marketing_email)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.customer.marketing_phone) {
                _push2(`<div data-v-61481228${_scopeId}><label class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>Marketing Phone</label><p class="text-gray-900" data-v-61481228${_scopeId}>${ssrInterpolate(__props.customer.marketing_phone)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.customer.photo_path || __props.customer.legal_document_path) {
              _push2(`<div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-61481228${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-61481228${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-61481228${_scopeId}>Documents</h3></div><div class="p-6 space-y-3" data-v-61481228${_scopeId}>`);
              if (__props.customer.photo_path) {
                _push2(`<div class="flex items-center justify-between" data-v-61481228${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>Photo</span><a${ssrRenderAttr("href", `/storage/${__props.customer.photo_path}`)} target="_blank" class="text-indigo-600 hover:text-indigo-900 text-sm" data-v-61481228${_scopeId}> View Photo </a></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.customer.legal_document_path) {
                _push2(`<div class="flex items-center justify-between" data-v-61481228${_scopeId}><span class="text-sm font-medium text-gray-500" data-v-61481228${_scopeId}>Legal Document</span><a${ssrRenderAttr("href", `/storage/${__props.customer.legal_document_path}`)} target="_blank" class="text-indigo-600 hover:text-indigo-900 text-sm" data-v-61481228${_scopeId}> Download PDF </a></div>`);
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
              createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("div", { class: "w-12 h-12 bg-sage-600 rounded-full flex items-center justify-center mr-4" }, [
                          createVNode(unref(Users), { class: "w-6 h-6 text-white" })
                        ]),
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, toDisplayString(__props.customer.company_name), 1),
                          createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Customer information details")
                        ])
                      ]),
                      createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                        createVNode("a", {
                          href: route("admin-keuangan.customers.pdf", __props.customer.id),
                          target: "_blank",
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-sage-600 text-sm font-medium text-white hover:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, [
                          createVNode(unref(FileText), { class: "mr-2 h-4 w-4" }),
                          createTextVNode(" Export PDF ")
                        ], 8, ["href"]),
                        createVNode(unref(Link), {
                          href: route("admin-keuangan.customers.edit", __props.customer.id),
                          class: "inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-700 hover:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Edit), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Edit ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode(unref(Link), {
                          href: route("admin-keuangan.customers.index"),
                          class: "inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
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
                  createVNode("div", { class: "lg:col-span-2 space-y-6" }, [
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 flex items-center" }, " Company Information ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Company Name"),
                            createVNode("p", { class: "text-gray-900 font-medium" }, toDisplayString(__props.customer.company_name || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Business Type"),
                            createVNode("p", { class: "text-gray-900 font-medium" }, toDisplayString(__props.customer.company_type || "-"), 1)
                          ]),
                          createVNode("div", { class: "md:col-span-2" }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Address"),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.company_address || "-"), 1)
                          ]),
                          __props.customer.invoice_address ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "md:col-span-2"
                          }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Invoice Address"),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.invoice_address), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 flex items-center" }, " PIC Information ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          createVNode("div", null, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "PIC Name"),
                            createVNode("p", { class: "text-gray-900 font-medium" }, toDisplayString(__props.customer.pic_name || "-"), 1)
                          ]),
                          createVNode("div", null, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "PIC Email"),
                            createVNode("p", { class: "text-gray-900 font-medium" }, toDisplayString(__props.customer.pic_email || "-"), 1)
                          ]),
                          createVNode("div", { class: "md:col-span-2" }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "PIC Phone"),
                            createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.pic_phone || "-"), 1)
                          ])
                        ])
                      ])
                    ]),
                    __props.customer.nib || __props.customer.npwp || __props.customer.ktp_number ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white shadow overflow-hidden sm:rounded-lg"
                    }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 flex items-center" }, " Legal Information ")
                      ]),
                      createVNode("div", { class: "p-6" }, [
                        createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                          __props.customer.nib ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "NIB"),
                            createVNode("p", { class: "text-gray-900 font-medium" }, toDisplayString(__props.customer.nib), 1)
                          ])) : createCommentVNode("", true),
                          __props.customer.npwp ? (openBlock(), createBlock("div", { key: 1 }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "NPWP"),
                            createVNode("p", { class: "text-gray-900 font-medium" }, toDisplayString(__props.customer.npwp), 1)
                          ])) : createCommentVNode("", true),
                          __props.customer.ktp_number ? (openBlock(), createBlock("div", { key: 2 }, [
                            createVNode("label", { class: "text-sm font-medium text-gray-500" }, "National ID Number (KTP)"),
                            createVNode("p", { class: "text-gray-900 font-medium" }, toDisplayString(__props.customer.ktp_number), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "space-y-6" }, [
                    createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Status")
                      ]),
                      createVNode("div", { class: "p-6 space-y-3" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Customer Status"),
                          createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" }, " Active ")
                        ]),
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Created"),
                          createVNode("span", { class: "text-gray-900 text-sm" }, toDisplayString(formatDate(__props.customer.created_at)), 1)
                        ]),
                        __props.customer.handler ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-between"
                        }, [
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Handled By"),
                          createVNode("span", { class: "text-gray-900 text-sm font-medium" }, toDisplayString(__props.customer.handler.name), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    __props.customer.marketing_name || __props.customer.marketing_email || __props.customer.marketing_phone ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white shadow overflow-hidden sm:rounded-lg"
                    }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900 flex items-center" }, [
                          createVNode(unref(TrendingUp), { class: "mr-2 h-5 w-5" }),
                          createTextVNode(" Marketing Information ")
                        ])
                      ]),
                      createVNode("div", { class: "p-6 space-y-3" }, [
                        __props.customer.marketing_name ? (openBlock(), createBlock("div", { key: 0 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Marketing Name"),
                          createVNode("p", { class: "text-gray-900 font-medium" }, toDisplayString(__props.customer.marketing_name), 1)
                        ])) : createCommentVNode("", true),
                        __props.customer.marketing_email ? (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Marketing Email"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.marketing_email), 1)
                        ])) : createCommentVNode("", true),
                        __props.customer.marketing_phone ? (openBlock(), createBlock("div", { key: 2 }, [
                          createVNode("label", { class: "text-sm font-medium text-gray-500" }, "Marketing Phone"),
                          createVNode("p", { class: "text-gray-900" }, toDisplayString(__props.customer.marketing_phone), 1)
                        ])) : createCommentVNode("", true)
                      ])
                    ])) : createCommentVNode("", true),
                    __props.customer.photo_path || __props.customer.legal_document_path ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "bg-white shadow overflow-hidden sm:rounded-lg"
                    }, [
                      createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                        createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Documents")
                      ]),
                      createVNode("div", { class: "p-6 space-y-3" }, [
                        __props.customer.photo_path ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "flex items-center justify-between"
                        }, [
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Photo"),
                          createVNode("a", {
                            href: `/storage/${__props.customer.photo_path}`,
                            target: "_blank",
                            class: "text-indigo-600 hover:text-indigo-900 text-sm"
                          }, " View Photo ", 8, ["href"])
                        ])) : createCommentVNode("", true),
                        __props.customer.legal_document_path ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "flex items-center justify-between"
                        }, [
                          createVNode("span", { class: "text-sm font-medium text-gray-500" }, "Legal Document"),
                          createVNode("a", {
                            href: `/storage/${__props.customer.legal_document_path}`,
                            target: "_blank",
                            class: "text-indigo-600 hover:text-indigo-900 text-sm"
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
const Show = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-61481228"]]);
export {
  Show as default
};
