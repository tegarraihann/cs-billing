import { reactive, withCtx, unref, createVNode, createTextVNode, withDirectives, vModelText, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { router, Link } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-DJEEoxYb.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { debounce } from "lodash";
import { Plus, Eye, Edit, FileText } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DOs0Z51M.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    salesOrders: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const form = reactive({
      search: props.filters.search || ""
    });
    const search = debounce(() => {
      router.get(route("admin-keuangan.sales-orders.index"), {
        search: form.search
      }, {
        preserveState: true,
        replace: true
      });
    }, 300);
    const getStatusLabel = (status) => {
      const labels = {
        released: "Dirilis",
        approved: "Disetujui",
        rejected: "Ditolak"
      };
      return labels[status] || status;
    };
    const getStatusColor = (status) => {
      const colors = {
        released: "bg-purple-100 text-purple-800",
        approved: "bg-green-100 text-green-800",
        rejected: "bg-red-100 text-red-800"
      };
      return colors[status] || "bg-gray-100 text-gray-800";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="py-6" data-v-c80a0fbe${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-c80a0fbe${_scopeId}><div class="flex justify-between items-center mb-6" data-v-c80a0fbe${_scopeId}><div data-v-c80a0fbe${_scopeId}><h1 class="text-2xl font-bold text-gray-900" data-v-c80a0fbe${_scopeId}>Manajemen Shipping Orders</h1><p class="mt-1 text-sm text-gray-600" data-v-c80a0fbe${_scopeId}>Kelola Shipping order dari CS dan buat Shipping order baru</p></div><div class="flex space-x-2" data-v-c80a0fbe${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.sales-orders.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Buat Shipping Order `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Buat Shipping Order ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-c80a0fbe${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-c80a0fbe${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-c80a0fbe${_scopeId}>Filter Data</h3><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-c80a0fbe${_scopeId}><div class="md:col-span-3" data-v-c80a0fbe${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-c80a0fbe${_scopeId}>Cari Data</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari berdasarkan nomor order, customer, atau invoice..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-c80a0fbe${_scopeId}></div><div class="flex items-end" data-v-c80a0fbe${_scopeId}><button class="w-full px-4 py-2 bg-sage-800 text-white rounded-md transition-colors" data-v-c80a0fbe${_scopeId}> Cari </button></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md" data-v-c80a0fbe${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-c80a0fbe${_scopeId}><div class="sm:flex sm:items-center sm:justify-between mb-4" data-v-c80a0fbe${_scopeId}><div data-v-c80a0fbe${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900" data-v-c80a0fbe${_scopeId}>Daftar Shipping Orders</h3><p class="mt-1 text-sm text-gray-600" data-v-c80a0fbe${_scopeId}>Total: ${ssrInterpolate(((_a = __props.salesOrders) == null ? void 0 : _a.total) || 0)} data</p></div></div><div class="overflow-x-auto" data-v-c80a0fbe${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-c80a0fbe${_scopeId}><thead class="bg-gray-50" data-v-c80a0fbe${_scopeId}><tr data-v-c80a0fbe${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c80a0fbe${_scopeId}> Order Number </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c80a0fbe${_scopeId}> Customer </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c80a0fbe${_scopeId}> Shipper </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c80a0fbe${_scopeId}> Shipment Type </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c80a0fbe${_scopeId}> Commodity </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c80a0fbe${_scopeId}> QTY </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c80a0fbe${_scopeId}> Container No </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c80a0fbe${_scopeId}> Status </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-c80a0fbe${_scopeId}> Aksi </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-c80a0fbe${_scopeId}><!--[-->`);
            ssrRenderList(__props.salesOrders.data, (salesOrder) => {
              _push2(`<tr class="hover:bg-gray-50" data-v-c80a0fbe${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-900" data-v-c80a0fbe${_scopeId}>${ssrInterpolate(salesOrder.order_number || salesOrder.so_number)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-c80a0fbe${_scopeId}><div data-v-c80a0fbe${_scopeId}><div class="font-medium" data-v-c80a0fbe${_scopeId}>${ssrInterpolate(salesOrder.customer || salesOrder.customer_name)}</div>`);
              if (salesOrder.customer_code) {
                _push2(`<div class="text-gray-500" data-v-c80a0fbe${_scopeId}>${ssrInterpolate(salesOrder.customer_code)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-6 py-4 text-sm text-gray-900" data-v-c80a0fbe${_scopeId}>${ssrInterpolate(salesOrder.shipper || salesOrder.consignee_shipper || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-c80a0fbe${_scopeId}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-v-c80a0fbe${_scopeId}>${ssrInterpolate(salesOrder.shipment_type || "-")}</span></td><td class="px-6 py-4 text-sm text-gray-900" data-v-c80a0fbe${_scopeId}><div class="max-w-32 truncate"${ssrRenderAttr("title", salesOrder.commodity)} data-v-c80a0fbe${_scopeId}>${ssrInterpolate(salesOrder.commodity || salesOrder.goods || "-")}</div></td><td class="px-6 py-4 text-sm text-gray-900" data-v-c80a0fbe${_scopeId}>${ssrInterpolate(salesOrder.qty || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-c80a0fbe${_scopeId}>`);
              if (salesOrder.container_no && Array.isArray(salesOrder.container_no)) {
                _push2(`<div class="space-y-1" data-v-c80a0fbe${_scopeId}><!--[-->`);
                ssrRenderList(salesOrder.container_no.slice(0, 2), (container, index) => {
                  _push2(`<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1" data-v-c80a0fbe${_scopeId}>${ssrInterpolate(container)}</span>`);
                });
                _push2(`<!--]-->`);
                if (salesOrder.container_no.length > 2) {
                  _push2(`<div class="text-xs text-gray-500" data-v-c80a0fbe${_scopeId}> +${ssrInterpolate(salesOrder.container_no.length - 2)} lainnya </div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else if (salesOrder.container_no) {
                _push2(`<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full" data-v-c80a0fbe${_scopeId}>${ssrInterpolate(salesOrder.container_no)}</span>`);
              } else {
                _push2(`<span class="text-gray-500" data-v-c80a0fbe${_scopeId}>-</span>`);
              }
              _push2(`</td><td class="px-6 py-4 text-sm" data-v-c80a0fbe${_scopeId}><span class="${ssrRenderClass([getStatusColor(salesOrder.status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}" data-v-c80a0fbe${_scopeId}>${ssrInterpolate(getStatusLabel(salesOrder.status))}</span></td><td class="px-6 py-4 text-sm font-medium" data-v-c80a0fbe${_scopeId}><div class="flex items-center space-x-2" data-v-c80a0fbe${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.sales-orders.show", salesOrder.id),
                class: "text-sage-800 hover:text-sage-900 p-2 rounded-md hover:bg-sage-50",
                title: "Lihat Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Eye), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Eye), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-keuangan.sales-orders.edit", salesOrder.id),
                class: "text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50",
                title: "Edit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Edit), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Edit), { class: "w-4 h-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<a${ssrRenderAttr("href", _ctx.route("admin-keuangan.sales-orders.print", salesOrder.id))} class="text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50" title="Download PDF" target="_blank" data-v-c80a0fbe${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`</a></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (!__props.salesOrders.data || __props.salesOrders.data.length === 0) {
              _push2(`<div class="text-center py-12" data-v-c80a0fbe${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900" data-v-c80a0fbe${_scopeId}>Belum ada data Shipping orders</h3><p class="mt-1 text-sm text-gray-500" data-v-c80a0fbe${_scopeId}>Mulai dengan menambahkan Shipping order pertama</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.salesOrders.links) {
              _push2(`<div class="mt-6" data-v-c80a0fbe${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.salesOrders }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Manajemen Shipping Orders"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Kelola Shipping order dari CS dan buat Shipping order baru")
                    ]),
                    createVNode("div", { class: "flex space-x-2" }, [
                      createVNode(unref(Link), {
                        href: _ctx.route("admin-keuangan.sales-orders.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Buat Shipping Order ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Filter Data"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                        createVNode("div", { class: "md:col-span-3" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Cari Data"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => form.search = $event,
                            onInput: unref(search),
                            type: "text",
                            placeholder: "Cari berdasarkan nomor order, customer, atau invoice...",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 40, ["onUpdate:modelValue", "onInput"]), [
                            [vModelText, form.search]
                          ])
                        ]),
                        createVNode("div", { class: "flex items-end" }, [
                          createVNode("button", {
                            onClick: unref(search),
                            class: "w-full px-4 py-2 bg-sage-800 text-white rounded-md transition-colors"
                          }, " Cari ", 8, ["onClick"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "sm:flex sm:items-center sm:justify-between mb-4" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Daftar Shipping Orders"),
                          createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Total: " + toDisplayString(((_b = __props.salesOrders) == null ? void 0 : _b.total) || 0) + " data", 1)
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Order Number "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Customer "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Shipper "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Shipment Type "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Commodity "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " QTY "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Container No "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Status "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Aksi ")
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.salesOrders.data, (salesOrder) => {
                              return openBlock(), createBlock("tr", {
                                key: salesOrder.id,
                                class: "hover:bg-gray-50"
                              }, [
                                createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-900" }, toDisplayString(salesOrder.order_number || salesOrder.so_number), 1),
                                createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                                  createVNode("div", null, [
                                    createVNode("div", { class: "font-medium" }, toDisplayString(salesOrder.customer || salesOrder.customer_name), 1),
                                    salesOrder.customer_code ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-gray-500"
                                    }, toDisplayString(salesOrder.customer_code), 1)) : createCommentVNode("", true)
                                  ])
                                ]),
                                createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(salesOrder.shipper || salesOrder.consignee_shipper || "-"), 1),
                                createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                                  createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" }, toDisplayString(salesOrder.shipment_type || "-"), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                                  createVNode("div", {
                                    class: "max-w-32 truncate",
                                    title: salesOrder.commodity
                                  }, toDisplayString(salesOrder.commodity || salesOrder.goods || "-"), 9, ["title"])
                                ]),
                                createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(salesOrder.qty || "-"), 1),
                                createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, [
                                  salesOrder.container_no && Array.isArray(salesOrder.container_no) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "space-y-1"
                                  }, [
                                    (openBlock(true), createBlock(Fragment, null, renderList(salesOrder.container_no.slice(0, 2), (container, index) => {
                                      return openBlock(), createBlock("span", {
                                        key: index,
                                        class: "inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1"
                                      }, toDisplayString(container), 1);
                                    }), 128)),
                                    salesOrder.container_no.length > 2 ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-gray-500"
                                    }, " +" + toDisplayString(salesOrder.container_no.length - 2) + " lainnya ", 1)) : createCommentVNode("", true)
                                  ])) : salesOrder.container_no ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                  }, toDisplayString(salesOrder.container_no), 1)) : (openBlock(), createBlock("span", {
                                    key: 2,
                                    class: "text-gray-500"
                                  }, "-"))
                                ]),
                                createVNode("td", { class: "px-6 py-4 text-sm" }, [
                                  createVNode("span", {
                                    class: ["inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium", getStatusColor(salesOrder.status)]
                                  }, toDisplayString(getStatusLabel(salesOrder.status)), 3)
                                ]),
                                createVNode("td", { class: "px-6 py-4 text-sm font-medium" }, [
                                  createVNode("div", { class: "flex items-center space-x-2" }, [
                                    createVNode(unref(Link), {
                                      href: _ctx.route("admin-keuangan.sales-orders.show", salesOrder.id),
                                      class: "text-sage-800 hover:text-sage-900 p-2 rounded-md hover:bg-sage-50",
                                      title: "Lihat Detail"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Eye), { class: "w-4 h-4" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    createVNode(unref(Link), {
                                      href: _ctx.route("admin-keuangan.sales-orders.edit", salesOrder.id),
                                      class: "text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50",
                                      title: "Edit"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(Edit), { class: "w-4 h-4" })
                                      ]),
                                      _: 2
                                    }, 1032, ["href"]),
                                    createVNode("a", {
                                      href: _ctx.route("admin-keuangan.sales-orders.print", salesOrder.id),
                                      class: "text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50",
                                      title: "Download PDF",
                                      target: "_blank"
                                    }, [
                                      createVNode(unref(FileText), { class: "w-4 h-4" })
                                    ], 8, ["href"])
                                  ])
                                ])
                              ]);
                            }), 128))
                          ])
                        ])
                      ]),
                      !__props.salesOrders.data || __props.salesOrders.data.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-12"
                      }, [
                        createVNode(unref(FileText), { class: "mx-auto h-12 w-12 text-gray-400" }),
                        createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "Belum ada data Shipping orders"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Mulai dengan menambahkan Shipping order pertama")
                      ])) : createCommentVNode("", true),
                      __props.salesOrders.links ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-6"
                      }, [
                        createVNode(Pagination, { data: __props.salesOrders }, null, 8, ["data"])
                      ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/SalesOrders/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c80a0fbe"]]);
export {
  Index as default
};
