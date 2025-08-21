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
    customers: Object,
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
      router.get(route("admin-cs.customers.index"), params, {
        preserveState: true,
        replace: true
      });
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID");
    };
    const getVendorInfo = (vendors) => {
      if (!vendors) return null;
      if (Array.isArray(vendors) && vendors.length > 0) {
        return vendors[0];
      }
      if (typeof vendors === "object" && !Array.isArray(vendors)) {
        return vendors;
      }
      return null;
    };
    const formatCurrency = (amount) => {
      if (!amount) return "-";
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
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
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-2c50fefb${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-2c50fefb${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-2c50fefb${_scopeId}><div data-v-2c50fefb${_scopeId}><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-2c50fefb${_scopeId}> Manajemen Data Pelanggan </h2><p class="text-sage-600" data-v-2c50fefb${_scopeId}> Kelola data pengiriman dan vendor pelanggan </p></div><div class="mt-4 sm:mt-0" data-v-2c50fefb${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.customers.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2c50fefb${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-2c50fefb${_scopeId2}></path></svg> Tambah Data Pelanggan `);
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
                    createTextVNode(" Tambah Data Pelanggan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-2c50fefb${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-2c50fefb${_scopeId}><div data-v-2c50fefb${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-2c50fefb${_scopeId}>Cari Data</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari No, SO Number, Customer Code, AWB/BL..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-2c50fefb${_scopeId}></div><div class="flex items-end" data-v-2c50fefb${_scopeId}><button class="w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-2c50fefb${_scopeId}> Cari </button></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-2c50fefb${_scopeId}><div class="px-6 py-4 border-b border-sage-200" data-v-2c50fefb${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-2c50fefb${_scopeId}>Daftar Data Pelanggan</h3><p class="text-sm text-sage-600 mt-1" data-v-2c50fefb${_scopeId}> Total: ${ssrInterpolate(((_a2 = __props.customers) == null ? void 0 : _a2.total) || 0)} data </p></div><div class="overflow-x-auto" data-v-2c50fefb${_scopeId}><table class="w-full" data-v-2c50fefb${_scopeId}><thead class="bg-sage-50" data-v-2c50fefb${_scopeId}><tr data-v-2c50fefb${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-2c50fefb${_scopeId}> No </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-2c50fefb${_scopeId}> SO Number </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-2c50fefb${_scopeId}> Customer Code </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-2c50fefb${_scopeId}> Consignee/Shipper </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-2c50fefb${_scopeId}> AWB/BL Number </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-2c50fefb${_scopeId}> ETA </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-2c50fefb${_scopeId}> Vendors </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-2c50fefb${_scopeId}> Aksi </th></tr></thead><tbody class="divide-y divide-sage-200" data-v-2c50fefb${_scopeId}><!--[-->`);
            ssrRenderList(__props.customers.data, (customer) => {
              _push2(`<tr class="hover:bg-sage-50 transition-colors" data-v-2c50fefb${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-900" data-v-2c50fefb${_scopeId}>${ssrInterpolate(customer.no)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-2c50fefb${_scopeId}>${ssrInterpolate(customer.so_number)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-2c50fefb${_scopeId}>${ssrInterpolate(customer.customer_code)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-2c50fefb${_scopeId}>${ssrInterpolate(customer.consignee_shipper)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-2c50fefb${_scopeId}>${ssrInterpolate(customer.awb_bl_number)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-2c50fefb${_scopeId}>${ssrInterpolate(customer.eta ? formatDate(customer.eta) : "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-2c50fefb${_scopeId}>`);
              if (getVendorInfo(customer.vendors)) {
                _push2(`<div data-v-2c50fefb${_scopeId}><div class="space-y-1" data-v-2c50fefb${_scopeId}><div class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block" data-v-2c50fefb${_scopeId}>${ssrInterpolate(getVendorInfo(customer.vendors).company_name || "Vendor")}</div><div class="text-xs text-gray-500" data-v-2c50fefb${_scopeId}>${ssrInterpolate(formatCurrency(getVendorInfo(customer.vendors).nominal))}</div></div></div>`);
              } else {
                _push2(`<span class="text-gray-400" data-v-2c50fefb${_scopeId}>-</span>`);
              }
              _push2(`</td><td class="px-6 py-4 text-sm font-medium" data-v-2c50fefb${_scopeId}><div class="flex items-center space-x-2" data-v-2c50fefb${_scopeId}><a${ssrRenderAttr("href", `/admin-cs/customers/${customer.id}/print`)} class="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full transition-colors" title="Cetak PDF" target="_blank" data-v-2c50fefb${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2c50fefb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" data-v-2c50fefb${_scopeId}></path></svg></a>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-cs.customers.show", customer.id),
                class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
                title: "Lihat Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2c50fefb${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-2c50fefb${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-2c50fefb${_scopeId2}></path></svg>`);
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
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!__props.customers.data || __props.customers.data.length === 0) {
              _push2(`<tr data-v-2c50fefb${_scopeId}><td colspan="8" class="px-6 py-8 text-center text-gray-500" data-v-2c50fefb${_scopeId}><div class="flex flex-col items-center" data-v-2c50fefb${_scopeId}><svg class="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2c50fefb${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" data-v-2c50fefb${_scopeId}></path></svg><p class="text-lg font-medium mb-2" data-v-2c50fefb${_scopeId}>Tidak ada data</p><p class="text-sm text-gray-400" data-v-2c50fefb${_scopeId}> Belum ada data pelanggan yang tersedia </p></div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.customers.last_page > 1) {
              _push2(`<div class="px-6 py-4 border-t border-sage-200" data-v-2c50fefb${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.customers }, null, _parent2, _scopeId));
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
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800 mb-2" }, " Manajemen Data Pelanggan "),
                      createVNode("p", { class: "text-sage-600" }, " Kelola data pengiriman dan vendor pelanggan ")
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-cs.customers.create"),
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
                          createTextVNode(" Tambah Data Pelanggan ")
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
                        placeholder: "Cari No, SO Number, Customer Code, AWB/BL...",
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
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Daftar Data Pelanggan"),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Total: " + toDisplayString(((_b = __props.customers) == null ? void 0 : _b.total) || 0) + " data ", 1)
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " No "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " SO Number "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Customer Code "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Consignee/Shipper "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " AWB/BL Number "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " ETA "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Vendors "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Aksi ")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.customers.data, (customer) => {
                          return openBlock(), createBlock("tr", {
                            key: customer.id,
                            class: "hover:bg-sage-50 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-900" }, toDisplayString(customer.no), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(customer.so_number), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(customer.customer_code), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(customer.consignee_shipper), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(customer.awb_bl_number), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(customer.eta ? formatDate(customer.eta) : "-"), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                              getVendorInfo(customer.vendors) ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode("div", { class: "space-y-1" }, [
                                  createVNode("div", { class: "text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block" }, toDisplayString(getVendorInfo(customer.vendors).company_name || "Vendor"), 1),
                                  createVNode("div", { class: "text-xs text-gray-500" }, toDisplayString(formatCurrency(getVendorInfo(customer.vendors).nominal)), 1)
                                ])
                              ])) : (openBlock(), createBlock("span", {
                                key: 1,
                                class: "text-gray-400"
                              }, "-"))
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm font-medium" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                createVNode("a", {
                                  href: `/admin-cs/customers/${customer.id}/print`,
                                  class: "inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-900 hover:bg-blue-100 rounded-full transition-colors",
                                  title: "Cetak PDF",
                                  target: "_blank"
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
                                      d: "M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                                    })
                                  ]))
                                ], 8, ["href"]),
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin-cs.customers.show", customer.id),
                                  class: "inline-flex items-center justify-center w-8 h-8 text-sage-600 hover:text-sage-900 hover:bg-sage-100 rounded-full transition-colors",
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
                                }, 1032, ["href"])
                              ])
                            ])
                          ]);
                        }), 128)),
                        !__props.customers.data || __props.customers.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
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
                                  d: "M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                })
                              ])),
                              createVNode("p", { class: "text-lg font-medium mb-2" }, "Tidak ada data"),
                              createVNode("p", { class: "text-sm text-gray-400" }, " Belum ada data pelanggan yang tersedia ")
                            ])
                          ])
                        ])) : createCommentVNode("", true)
                      ])
                    ])
                  ]),
                  __props.customers.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "px-6 py-4 border-t border-sage-200"
                  }, [
                    createVNode(Pagination, { data: __props.customers }, null, 8, ["data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminCS/Customers/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2c50fefb"]]);
export {
  Index as default
};
