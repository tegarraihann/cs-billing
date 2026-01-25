import { reactive, computed, watch, withCtx, unref, createVNode, createTextVNode, withDirectives, vModelText, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BXHi-kqO.js";
import { P as Pagination } from "./Pagination-JgWO_U2H.js";
import { FileDown, Plus, Trash2, Users } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./useIdleTimeout-BVnZv5Lp.js";
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
    const routes = {
      "admin-keuangan.vendors.export.pdf": "/admin-keuangan/vendors/export/pdf"
    };
    const route = (name, params) => {
      if (routes[name]) {
        return typeof routes[name] === "function" ? routes[name](params) : routes[name];
      }
      return window.route ? window.route(name, params) : `#${name}`;
    };
    const form = reactive({
      search: ((_a = props.filters) == null ? void 0 : _a.search) || ""
    });
    const exportPdfUrl = computed(() => {
      const baseUrl = route("admin-keuangan.vendors.export.pdf");
      const params = new URLSearchParams();
      if (form.search) {
        params.append("search", form.search);
      }
      return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    });
    const search = () => {
      const params = {};
      if (form.search) params.search = form.search;
      router.get(route("admin-keuangan.vendors.index"), params, {
        preserveState: true,
        replace: true
      });
    };
    const goToDetail = (vendor) => {
      router.get(route("admin-keuangan.vendors.show", vendor.id));
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US");
    };
    const deleteVendor = (vendorId) => {
      if (confirm("Are you sure you want to delete this vendor?")) {
        router.delete(route("admin-keuangan.vendors.destroy", vendorId), {
          onSuccess: () => {
            alert("Vendor deleted successfully!");
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
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b;
          if (_push2) {
            _push2(`<div class="py-6" data-v-4c020a00${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-4c020a00${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-4c020a00${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-4c020a00${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-4c020a00${_scopeId}><div data-v-4c020a00${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-4c020a00${_scopeId}>Vendor Master Data</h1><p class="mt-1 text-sm text-gray-600" data-v-4c020a00${_scopeId}>Manage vendor records for transactions</p></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-4c020a00${_scopeId}><a${ssrRenderAttr("href", exportPdfUrl.value)} target="_blank" class="inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2" data-v-4c020a00${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileDown), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Export PDF </a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: route("admin-keuangan.vendors.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Add Vendor `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Add Vendor ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-4c020a00${_scopeId}><div class="px-6 py-4" data-v-4c020a00${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-4c020a00${_scopeId}><div data-v-4c020a00${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-4c020a00${_scopeId}>Search</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Search vendor name, contact, phone, email, office, account number, account name, NIB..." class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500 sm:text-sm" data-v-4c020a00${_scopeId}></div><div class="flex items-end" data-v-4c020a00${_scopeId}><button class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-4c020a00${_scopeId}> Search </button></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-4c020a00${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-4c020a00${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-4c020a00${_scopeId}>Vendor List</h3><p class="mt-1 text-sm text-gray-600" data-v-4c020a00${_scopeId}> Total: ${ssrInterpolate(((_a2 = __props.vendors) == null ? void 0 : _a2.total) || 0)} records </p></div><div class="overflow-x-auto" data-v-4c020a00${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-4c020a00${_scopeId}><thead class="bg-gray-50" data-v-4c020a00${_scopeId}><tr data-v-4c020a00${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-4c020a00${_scopeId}> ID </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-4c020a00${_scopeId}> Vendor Name </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-4c020a00${_scopeId}> Contact </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-4c020a00${_scopeId}> Phone </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-4c020a00${_scopeId}> Email </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-4c020a00${_scopeId}> Office Phone </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-4c020a00${_scopeId}> Account Number </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-4c020a00${_scopeId}> Account Name </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-4c020a00${_scopeId}> NIB </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-4c020a00${_scopeId}> Document Status </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-4c020a00${_scopeId}> Created Date </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-4c020a00${_scopeId}> Delete </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-4c020a00${_scopeId}><!--[-->`);
            ssrRenderList(__props.vendors.data, (vendor) => {
              _push2(`<tr class="hover:bg-gray-50 cursor-pointer" data-v-4c020a00${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-900" data-v-4c020a00${_scopeId}>${ssrInterpolate(vendor.id)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-4c020a00${_scopeId}>${ssrInterpolate(vendor.nama_vendor)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-4c020a00${_scopeId}>${ssrInterpolate(vendor.pic || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-4c020a00${_scopeId}>${ssrInterpolate(vendor.no_hp || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-4c020a00${_scopeId}>${ssrInterpolate(vendor.email || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-4c020a00${_scopeId}>${ssrInterpolate(vendor.no_kantor || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-4c020a00${_scopeId}>${ssrInterpolate(vendor.nomor_rekening)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-4c020a00${_scopeId}>${ssrInterpolate(vendor.nama_rekening)}</td><td class="px-6 py-4 text-sm text-gray-900 font-mono" data-v-4c020a00${_scopeId}>${ssrInterpolate(vendor.nib || "-")}</td><td class="px-6 py-4 text-sm" data-v-4c020a00${_scopeId}><div class="flex space-x-1" data-v-4c020a00${_scopeId}>`);
              if (vendor.photo_path) {
                _push2(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" data-v-4c020a00${_scopeId}> Photo </span>`);
              } else {
                _push2(`<!---->`);
              }
              if (vendor.legal_document_path) {
                _push2(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-v-4c020a00${_scopeId}> Legal </span>`);
              } else {
                _push2(`<!---->`);
              }
              if (!vendor.photo_path && !vendor.legal_document_path) {
                _push2(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800" data-v-4c020a00${_scopeId}> None </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-6 py-4 text-sm text-gray-900" data-v-4c020a00${_scopeId}>${ssrInterpolate(formatDate(vendor.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium" data-v-4c020a00${_scopeId}><button class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" title="Delete Vendor" data-v-4c020a00${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!__props.vendors.data || __props.vendors.data.length === 0) {
              _push2(`<tr data-v-4c020a00${_scopeId}><td colspan="12" class="px-6 py-12 text-center" data-v-4c020a00${_scopeId}><div class="flex flex-col items-center" data-v-4c020a00${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Users), { class: "h-12 w-12 text-gray-300 mb-4" }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-sm font-medium text-gray-900 mb-1" data-v-4c020a00${_scopeId}>No vendor data</h3><p class="text-sm text-gray-500" data-v-4c020a00${_scopeId}>There are no vendor records yet</p></div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.vendors.last_page > 1) {
              _push2(`<div class="bg-white px-6 py-3 border-t border-gray-200" data-v-4c020a00${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.vendors }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                      createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, "Vendor Master Data"),
                          createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Manage vendor records for transactions")
                        ]),
                        createVNode("div", { class: "mt-4 sm:mt-0 flex space-x-3" }, [
                          createVNode("a", {
                            href: exportPdfUrl.value,
                            target: "_blank",
                            class: "inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                          }, [
                            createVNode(unref(FileDown), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Export PDF ")
                          ], 8, ["href"]),
                          createVNode(unref(Link), {
                            href: route("admin-keuangan.vendors.create"),
                            class: "inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                              createTextVNode(" Add Vendor ")
                            ]),
                            _: 1
                          }, 8, ["href"])
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-6 py-4" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Search"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => form.search = $event,
                            type: "text",
                            placeholder: "Search vendor name, contact, phone, email, office, account number, account name, NIB...",
                            class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500 sm:text-sm"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.search]
                          ])
                        ]),
                        createVNode("div", { class: "flex items-end" }, [
                          createVNode("button", {
                            onClick: search,
                            class: "w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                          }, " Search ")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                    createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                      createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Vendor List"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " Total: " + toDisplayString(((_b = __props.vendors) == null ? void 0 : _b.total) || 0) + " records ", 1)
                    ]),
                    createVNode("div", { class: "overflow-x-auto" }, [
                      createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                        createVNode("thead", { class: "bg-gray-50" }, [
                          createVNode("tr", null, [
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " ID "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Vendor Name "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Contact "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Phone "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Email "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Office Phone "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Account Number "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Account Name "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " NIB "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Document Status "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Created Date "),
                            createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Delete ")
                          ])
                        ]),
                        createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors.data, (vendor) => {
                            return openBlock(), createBlock("tr", {
                              key: vendor.id,
                              class: "hover:bg-gray-50 cursor-pointer",
                              onClick: ($event) => goToDetail(vendor)
                            }, [
                              createVNode("td", { class: "px-6 py-4 text-sm font-medium text-gray-900" }, toDisplayString(vendor.id), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(vendor.nama_vendor), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(vendor.pic || "-"), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(vendor.no_hp || "-"), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(vendor.email || "-"), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(vendor.no_kantor || "-"), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(vendor.nomor_rekening), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(vendor.nama_rekening), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900 font-mono" }, toDisplayString(vendor.nib || "-"), 1),
                              createVNode("td", { class: "px-6 py-4 text-sm" }, [
                                createVNode("div", { class: "flex space-x-1" }, [
                                  vendor.photo_path ? (openBlock(), createBlock("span", {
                                    key: 0,
                                    class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                                  }, " Photo ")) : createCommentVNode("", true),
                                  vendor.legal_document_path ? (openBlock(), createBlock("span", {
                                    key: 1,
                                    class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                  }, " Legal ")) : createCommentVNode("", true),
                                  !vendor.photo_path && !vendor.legal_document_path ? (openBlock(), createBlock("span", {
                                    key: 2,
                                    class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                  }, " None ")) : createCommentVNode("", true)
                                ])
                              ]),
                              createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(formatDate(vendor.created_at)), 1),
                              createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, [
                                createVNode("button", {
                                  onClick: withModifiers(($event) => deleteVendor(vendor.id), ["stop"]),
                                  class: "text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50",
                                  title: "Delete Vendor"
                                }, [
                                  createVNode(unref(Trash2), { class: "h-4 w-4" })
                                ], 8, ["onClick"])
                              ])
                            ], 8, ["onClick"]);
                          }), 128)),
                          !__props.vendors.data || __props.vendors.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                            createVNode("td", {
                              colspan: "12",
                              class: "px-6 py-12 text-center"
                            }, [
                              createVNode("div", { class: "flex flex-col items-center" }, [
                                createVNode(unref(Users), { class: "h-12 w-12 text-gray-300 mb-4" }),
                                createVNode("h3", { class: "text-sm font-medium text-gray-900 mb-1" }, "No vendor data"),
                                createVNode("p", { class: "text-sm text-gray-500" }, "There are no vendor records yet")
                              ])
                            ])
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    __props.vendors.last_page > 1 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white px-6 py-3 border-t border-gray-200"
                    }, [
                      createVNode(Pagination, { data: __props.vendors }, null, 8, ["data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Vendors/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c020a00"]]);
export {
  Index as default
};
