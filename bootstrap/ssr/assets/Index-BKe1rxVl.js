import { reactive, computed, ref, watch, withCtx, unref, createVNode, createTextVNode, withDirectives, vModelText, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import axios from "axios";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { P as Pagination } from "./Pagination-JgWO_U2H.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { FileDown, Plus, Trash2, Users } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./useIdleTimeout-CR--SBvC.js";
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
    const routes = {
      "admin-keuangan.customers.export.pdf": "/admin-keuangan/customers/export/pdf"
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
      const baseUrl = route("admin-keuangan.customers.export.pdf");
      const params = new URLSearchParams();
      if (form.search) {
        params.append("search", form.search);
      }
      return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    });
    const search = () => {
      const params = {};
      if (form.search) params.search = form.search;
      router.get(route("admin-keuangan.customers.index"), params, {
        preserveState: true,
        replace: true
      });
    };
    const goToDetail = (customer) => {
      router.get(route("admin-keuangan.customers.show", customer.id));
    };
    const showDeleteDialog = ref(false);
    const customerToDelete = ref(null);
    const deleteCustomer = (customer) => {
      customerToDelete.value = customer;
      showDeleteDialog.value = true;
    };
    const confirmDelete = () => {
      if (customerToDelete.value) {
        router.delete(route("admin-keuangan.customers.destroy", customerToDelete.value.id), {
          onSuccess: () => {
            router.get(route("admin-keuangan.customers.index"), {
              search: form.search
            }, {
              preserveState: true,
              replace: true
            });
          },
          onError: (errors) => {
            alert("Failed to delete customer: " + Object.values(errors).join(", "));
          }
        });
      }
      showDeleteDialog.value = false;
      customerToDelete.value = null;
    };
    const cancelDelete = () => {
      showDeleteDialog.value = false;
      customerToDelete.value = null;
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
    const handleExportPdf = async () => {
      try {
        const response = await axios.get(exportPdfUrl.value, {
          responseType: "blob"
        });
        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);
        let iframe = document.getElementById("pdf-print-iframe");
        if (!iframe) {
          iframe = document.createElement("iframe");
          iframe.id = "pdf-print-iframe";
          iframe.style.display = "none";
          document.body.appendChild(iframe);
        }
        iframe.src = url;
        iframe.onload = function() {
          setTimeout(function() {
            iframe.focus();
            iframe.contentWindow.print();
          }, 1);
        };
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Gagal mengunduh PDF");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b, _c, _d;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Customer Management" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6" data-v-cc369710${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-cc369710${_scopeId}><div class="flex justify-between items-center mb-6" data-v-cc369710${_scopeId}><div data-v-cc369710${_scopeId}><h1 class="text-2xl font-bold text-gray-900" data-v-cc369710${_scopeId}>Customer Management</h1><p class="mt-1 text-sm text-gray-600" data-v-cc369710${_scopeId}>Manage customer records and contact information</p></div><div class="flex space-x-2" data-v-cc369710${_scopeId}><button class="inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-900 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150" data-v-cc369710${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileDown), { class: "w-4 h-4 mr-2" }, null, _parent2, _scopeId));
            _push2(` Export PDF </button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: route("admin-keuangan.customers.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-900 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Add Customer `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Add Customer ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-cc369710${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-cc369710${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900 mb-4" data-v-cc369710${_scopeId}>Filters</h3><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-cc369710${_scopeId}><div class="md:col-span-3" data-v-cc369710${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-cc369710${_scopeId}>Search</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Search company name, contact, email, marketing..." class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-cc369710${_scopeId}></div><div class="flex items-end" data-v-cc369710${_scopeId}><button class="w-full px-4 py-2 bg-sage-600 text-white rounded-md hover:bg-sage-900 transition-colors" data-v-cc369710${_scopeId}> Search </button></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md" data-v-cc369710${_scopeId}><div class="px-4 py-5 sm:p-6" data-v-cc369710${_scopeId}><div class="sm:flex sm:items-center sm:justify-between mb-4" data-v-cc369710${_scopeId}><div data-v-cc369710${_scopeId}><h3 class="text-lg leading-6 font-medium text-gray-900" data-v-cc369710${_scopeId}>Customer Data List</h3><p class="mt-1 text-sm text-gray-600" data-v-cc369710${_scopeId}>Total: ${ssrInterpolate(((_a2 = __props.customers) == null ? void 0 : _a2.total) || 0)} records</p></div></div><div class="overflow-x-auto" data-v-cc369710${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-cc369710${_scopeId}><thead class="bg-gray-50" data-v-cc369710${_scopeId}><tr data-v-cc369710${_scopeId}><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-cc369710${_scopeId}> Customer Code </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-cc369710${_scopeId}> Company Name </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-cc369710${_scopeId}> Business Type </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-cc369710${_scopeId}> Contact Name </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-cc369710${_scopeId}> Contact Email </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-cc369710${_scopeId}> Marketing </th><th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-cc369710${_scopeId}> Handler </th><th scope="col" class="relative px-6 py-3" data-v-cc369710${_scopeId}><span class="sr-only" data-v-cc369710${_scopeId}>Delete</span></th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-cc369710${_scopeId}><!--[-->`);
            ssrRenderList(__props.customers.data, (customer) => {
              var _a3;
              _push2(`<tr class="hover:bg-gray-50 cursor-pointer" data-v-cc369710${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-cc369710${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-cc369710${_scopeId}>${ssrInterpolate(customer.customer_code || "-")}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-cc369710${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-cc369710${_scopeId}>${ssrInterpolate(customer.company_name)}</div><div class="text-sm text-gray-500" data-v-cc369710${_scopeId}>${ssrInterpolate(customer.company_type)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-cc369710${_scopeId}><div class="text-sm text-gray-900" data-v-cc369710${_scopeId}>${ssrInterpolate(customer.company_type)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-cc369710${_scopeId}><div class="text-sm text-gray-900" data-v-cc369710${_scopeId}>${ssrInterpolate(customer.pic_name)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-cc369710${_scopeId}><div class="text-sm text-gray-900" data-v-cc369710${_scopeId}>${ssrInterpolate(customer.pic_email)}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-cc369710${_scopeId}><div class="text-sm text-gray-900" data-v-cc369710${_scopeId}>${ssrInterpolate(customer.marketing_name || "-")}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-cc369710${_scopeId}><div class="text-sm text-gray-900" data-v-cc369710${_scopeId}>${ssrInterpolate(((_a3 = customer.handler) == null ? void 0 : _a3.name) || "-")}</div></td><td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" data-v-cc369710${_scopeId}><button class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" title="Delete" data-v-cc369710${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "w-4 h-4" }, null, _parent2, _scopeId));
              _push2(`</button></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (!__props.customers.data || __props.customers.data.length === 0) {
              _push2(`<div class="text-center py-12" data-v-cc369710${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Users), { class: "mx-auto h-12 w-12 text-gray-400" }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-2 text-sm font-medium text-gray-900" data-v-cc369710${_scopeId}>No customer data yet</h3><p class="mt-1 text-sm text-gray-500" data-v-cc369710${_scopeId}>Start by adding your first customer</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.customers.links) {
              _push2(`<div class="mt-6" data-v-cc369710${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.customers }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div></div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: showDeleteDialog.value,
              type: "confirm",
              title: "Delete Customer",
              message: `Are you sure you want to delete customer '${(_b = customerToDelete.value) == null ? void 0 : _b.company_name}'? This action cannot be undone.`,
              "confirm-text": "Yes, Delete",
              "cancel-text": "Cancel",
              onConfirm: confirmDelete,
              onCancel: cancelDelete,
              onClose: cancelDelete
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Customer Management" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "flex justify-between items-center mb-6" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Customer Management"),
                      createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Manage customer records and contact information")
                    ]),
                    createVNode("div", { class: "flex space-x-2" }, [
                      createVNode("button", {
                        onClick: handleExportPdf,
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-900 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, [
                        createVNode(unref(FileDown), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Export PDF ")
                      ]),
                      createVNode(unref(Link), {
                        href: route("admin-keuangan.customers.create"),
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-sage-900 focus:bg-sage-700 active:bg-sage-900 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 transition ease-in-out duration-150"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(Plus), { class: "w-4 h-4 mr-2" }),
                          createTextVNode(" Add Customer ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md mb-6" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900 mb-4" }, "Filters"),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                        createVNode("div", { class: "md:col-span-3" }, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Search"),
                          withDirectives(createVNode("input", {
                            "onUpdate:modelValue": ($event) => form.search = $event,
                            type: "text",
                            placeholder: "Search company name, contact, email, marketing...",
                            class: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                          }, null, 8, ["onUpdate:modelValue"]), [
                            [vModelText, form.search]
                          ])
                        ]),
                        createVNode("div", { class: "flex items-end" }, [
                          createVNode("button", {
                            onClick: search,
                            class: "w-full px-4 py-2 bg-sage-600 text-white rounded-md hover:bg-sage-900 transition-colors"
                          }, " Search ")
                        ])
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-md" }, [
                    createVNode("div", { class: "px-4 py-5 sm:p-6" }, [
                      createVNode("div", { class: "sm:flex sm:items-center sm:justify-between mb-4" }, [
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-lg leading-6 font-medium text-gray-900" }, "Customer Data List"),
                          createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Total: " + toDisplayString(((_c = __props.customers) == null ? void 0 : _c.total) || 0) + " records", 1)
                        ])
                      ]),
                      createVNode("div", { class: "overflow-x-auto" }, [
                        createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                          createVNode("thead", { class: "bg-gray-50" }, [
                            createVNode("tr", null, [
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Customer Code "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Company Name "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Business Type "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Contact Name "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Contact Email "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Marketing "),
                              createVNode("th", {
                                scope: "col",
                                class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              }, " Handler "),
                              createVNode("th", {
                                scope: "col",
                                class: "relative px-6 py-3"
                              }, [
                                createVNode("span", { class: "sr-only" }, "Delete")
                              ])
                            ])
                          ]),
                          createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(__props.customers.data, (customer) => {
                              var _a3;
                              return openBlock(), createBlock("tr", {
                                key: customer.id,
                                class: "hover:bg-gray-50 cursor-pointer",
                                onClick: ($event) => goToDetail(customer)
                              }, [
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(customer.customer_code || "-"), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(customer.company_name), 1),
                                  createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(customer.company_type), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(customer.company_type), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(customer.pic_name), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(customer.pic_email), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(customer.marketing_name || "-"), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                                  createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(((_a3 = customer.handler) == null ? void 0 : _a3.name) || "-"), 1)
                                ]),
                                createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-right text-sm font-medium" }, [
                                  createVNode("button", {
                                    onClick: withModifiers(($event) => deleteCustomer(customer), ["stop"]),
                                    class: "text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50",
                                    title: "Delete"
                                  }, [
                                    createVNode(unref(Trash2), { class: "w-4 h-4" })
                                  ], 8, ["onClick"])
                                ])
                              ], 8, ["onClick"]);
                            }), 128))
                          ])
                        ])
                      ]),
                      !__props.customers.data || __props.customers.data.length === 0 ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "text-center py-12"
                      }, [
                        createVNode(unref(Users), { class: "mx-auto h-12 w-12 text-gray-400" }),
                        createVNode("h3", { class: "mt-2 text-sm font-medium text-gray-900" }, "No customer data yet"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-500" }, "Start by adding your first customer")
                      ])) : createCommentVNode("", true),
                      __props.customers.links ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "mt-6"
                      }, [
                        createVNode(Pagination, { data: __props.customers }, null, 8, ["data"])
                      ])) : createCommentVNode("", true)
                    ])
                  ])
                ])
              ]),
              createVNode(AlertDialog, {
                show: showDeleteDialog.value,
                type: "confirm",
                title: "Delete Customer",
                message: `Are you sure you want to delete customer '${(_d = customerToDelete.value) == null ? void 0 : _d.company_name}'? This action cannot be undone.`,
                "confirm-text": "Yes, Delete",
                "cancel-text": "Cancel",
                onConfirm: confirmDelete,
                onCancel: cancelDelete,
                onClose: cancelDelete
              }, null, 8, ["show", "message"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Customers/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cc369710"]]);
export {
  Index as default
};
