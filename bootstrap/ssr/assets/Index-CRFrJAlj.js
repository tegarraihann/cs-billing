import { reactive, computed, watch, withCtx, unref, createVNode, createTextVNode, withDirectives, vModelText, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import axios from "axios";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-C1XXA0iB.js";
import { FileDown, Plus, Trash2, Users } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./useIdleTimeout-CR--SBvC.js";
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
    const currentPage = computed(() => {
      var _a2;
      return Number(((_a2 = props.vendors) == null ? void 0 : _a2.current_page) || 1);
    });
    const lastPage = computed(() => {
      var _a2;
      return Number(((_a2 = props.vendors) == null ? void 0 : _a2.last_page) || 1);
    });
    const paginationItems = computed(() => {
      const total = lastPage.value;
      const current = currentPage.value;
      const items = [];
      if (total <= 7) {
        for (let i = 1; i <= total; i += 1) {
          items.push({ type: "page", page: i, key: `page-${i}` });
        }
        return items;
      }
      items.push({ type: "page", page: 1, key: "page-1" });
      const start = Math.max(2, current - 2);
      const end = Math.min(total - 1, current + 2);
      if (start > 2) {
        items.push({ type: "ellipsis", key: "ellipsis-left" });
      }
      for (let i = start; i <= end; i += 1) {
        items.push({ type: "page", page: i, key: `page-${i}` });
      }
      if (end < total - 1) {
        items.push({ type: "ellipsis", key: "ellipsis-right" });
      }
      items.push({ type: "page", page: total, key: `page-${total}` });
      return items;
    });
    const currentIndexQuery = computed(() => {
      const query = {};
      if (form.search) query.search = form.search;
      const page = currentPage.value;
      if (page > 1) {
        query.page = page;
      }
      return query;
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
    const goToPage = (page) => {
      if (page < 1 || page > lastPage.value || page === currentPage.value) {
        return;
      }
      const params = {};
      if (form.search) params.search = form.search;
      if (page > 1) params.page = page;
      router.get(route("admin-keuangan.vendors.index"), params, {
        preserveState: true,
        replace: true
      });
    };
    const goToDetail = (vendor) => {
      router.get(route("admin-keuangan.vendors.show", {
        vendor: vendor.id,
        ...currentIndexQuery.value
      }));
    };
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US");
    };
    const deleteVendor = (vendorId) => {
      if (confirm("Are you sure you want to delete this vendor?")) {
        router.delete(route("admin-keuangan.vendors.destroy", {
          vendor: vendorId,
          ...currentIndexQuery.value
        }), {
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
          var _a2, _b;
          if (_push2) {
            _push2(`<div class="py-6" data-v-f266e89c${_scopeId}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-f266e89c${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-f266e89c${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-f266e89c${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-f266e89c${_scopeId}><div data-v-f266e89c${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-f266e89c${_scopeId}>Vendor Master Data</h1><p class="mt-1 text-sm text-gray-600" data-v-f266e89c${_scopeId}>Manage vendor records for transactions</p></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-f266e89c${_scopeId}><button class="inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2" data-v-f266e89c${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileDown), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Export PDF </button>`);
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
            _push2(`</div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-f266e89c${_scopeId}><div class="px-6 py-4" data-v-f266e89c${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-f266e89c${_scopeId}><div data-v-f266e89c${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-f266e89c${_scopeId}>Search</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Search vendor name, contact, phone, email, office, account number, account name, NIB..." class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500 sm:text-sm" data-v-f266e89c${_scopeId}></div><div class="flex items-end" data-v-f266e89c${_scopeId}><button class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-f266e89c${_scopeId}> Search </button></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-f266e89c${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-f266e89c${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-f266e89c${_scopeId}>Vendor List</h3><p class="mt-1 text-sm text-gray-600" data-v-f266e89c${_scopeId}> Total: ${ssrInterpolate(((_a2 = __props.vendors) == null ? void 0 : _a2.total) || 0)} records </p></div><div class="overflow-x-auto" data-v-f266e89c${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-f266e89c${_scopeId}><thead class="bg-gray-50" data-v-f266e89c${_scopeId}><tr data-v-f266e89c${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f266e89c${_scopeId}> ID </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f266e89c${_scopeId}> Vendor Name </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f266e89c${_scopeId}> Contact </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f266e89c${_scopeId}> Phone </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f266e89c${_scopeId}> Email </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f266e89c${_scopeId}> Office Phone </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f266e89c${_scopeId}> Account Number </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f266e89c${_scopeId}> Account Name </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f266e89c${_scopeId}> NIB </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f266e89c${_scopeId}> Document Status </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f266e89c${_scopeId}> Created Date </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-f266e89c${_scopeId}> Delete </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-f266e89c${_scopeId}><!--[-->`);
            ssrRenderList(__props.vendors.data, (vendor) => {
              _push2(`<tr class="hover:bg-gray-50 cursor-pointer" data-v-f266e89c${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-900" data-v-f266e89c${_scopeId}>${ssrInterpolate(vendor.id)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-f266e89c${_scopeId}>${ssrInterpolate(vendor.nama_vendor)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-f266e89c${_scopeId}>${ssrInterpolate(vendor.pic || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-f266e89c${_scopeId}>${ssrInterpolate(vendor.no_hp || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-f266e89c${_scopeId}>${ssrInterpolate(vendor.email || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-f266e89c${_scopeId}>${ssrInterpolate(vendor.no_kantor || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-f266e89c${_scopeId}>${ssrInterpolate(vendor.nomor_rekening)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-f266e89c${_scopeId}>${ssrInterpolate(vendor.nama_rekening)}</td><td class="px-6 py-4 text-sm text-gray-900 font-mono" data-v-f266e89c${_scopeId}>${ssrInterpolate(vendor.nib || "-")}</td><td class="px-6 py-4 text-sm" data-v-f266e89c${_scopeId}><div class="flex space-x-1" data-v-f266e89c${_scopeId}>`);
              if (vendor.photo_path) {
                _push2(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" data-v-f266e89c${_scopeId}> Photo </span>`);
              } else {
                _push2(`<!---->`);
              }
              if (vendor.legal_document_path) {
                _push2(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-v-f266e89c${_scopeId}> Legal </span>`);
              } else {
                _push2(`<!---->`);
              }
              if (!vendor.photo_path && !vendor.legal_document_path) {
                _push2(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800" data-v-f266e89c${_scopeId}> None </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-6 py-4 text-sm text-gray-900" data-v-f266e89c${_scopeId}>${ssrInterpolate(formatDate(vendor.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium" data-v-f266e89c${_scopeId}><button class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" title="Delete Vendor" data-v-f266e89c${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</button></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!__props.vendors.data || __props.vendors.data.length === 0) {
              _push2(`<tr data-v-f266e89c${_scopeId}><td colspan="12" class="px-6 py-12 text-center" data-v-f266e89c${_scopeId}><div class="flex flex-col items-center" data-v-f266e89c${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Users), { class: "h-12 w-12 text-gray-300 mb-4" }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-sm font-medium text-gray-900 mb-1" data-v-f266e89c${_scopeId}>No vendor data</h3><p class="text-sm text-gray-500" data-v-f266e89c${_scopeId}>There are no vendor records yet</p></div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.vendors.links) {
              _push2(`<div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6" data-v-f266e89c${_scopeId}><div class="flex items-center justify-between" data-v-f266e89c${_scopeId}><div class="text-sm text-gray-700" data-v-f266e89c${_scopeId}> Showing ${ssrInterpolate(__props.vendors.from || 0)} to ${ssrInterpolate(__props.vendors.to || 0)} of ${ssrInterpolate(__props.vendors.total || 0)} results </div><div class="flex items-center space-x-1" data-v-f266e89c${_scopeId}><button${ssrIncludeBooleanAttr(currentPage.value <= 1) ? " disabled" : ""} class="${ssrRenderClass([
                "px-3 py-2 text-sm rounded-md border",
                currentPage.value <= 1 ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white text-gray-500 hover:text-gray-700 border-gray-300"
              ])}" data-v-f266e89c${_scopeId}> « Previous </button><!--[-->`);
              ssrRenderList(paginationItems.value, (item) => {
                _push2(`<!--[-->`);
                if (item.type === "ellipsis") {
                  _push2(`<span class="px-3 py-2 text-sm text-gray-400" data-v-f266e89c${_scopeId}> ... </span>`);
                } else {
                  _push2(`<button class="${ssrRenderClass([
                    "px-3 py-2 text-sm rounded-md border",
                    item.page === currentPage.value ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-500 hover:text-gray-700 border-gray-300"
                  ])}" data-v-f266e89c${_scopeId}>${ssrInterpolate(item.page)}</button>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--><button${ssrIncludeBooleanAttr(currentPage.value >= lastPage.value) ? " disabled" : ""} class="${ssrRenderClass([
                "px-3 py-2 text-sm rounded-md border",
                currentPage.value >= lastPage.value ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white text-gray-500 hover:text-gray-700 border-gray-300"
              ])}" data-v-f266e89c${_scopeId}> Next » </button></div></div></div>`);
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
                          createVNode("button", {
                            onClick: handleExportPdf,
                            class: "inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
                          }, [
                            createVNode(unref(FileDown), { class: "mr-2 h-4 w-4" }),
                            createTextVNode(" Export PDF ")
                          ]),
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
                    __props.vendors.links ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "bg-white px-4 py-3 border-t border-gray-200 sm:px-6"
                    }, [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "text-sm text-gray-700" }, " Showing " + toDisplayString(__props.vendors.from || 0) + " to " + toDisplayString(__props.vendors.to || 0) + " of " + toDisplayString(__props.vendors.total || 0) + " results ", 1),
                        createVNode("div", { class: "flex items-center space-x-1" }, [
                          createVNode("button", {
                            onClick: ($event) => goToPage(currentPage.value - 1),
                            disabled: currentPage.value <= 1,
                            class: [
                              "px-3 py-2 text-sm rounded-md border",
                              currentPage.value <= 1 ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white text-gray-500 hover:text-gray-700 border-gray-300"
                            ]
                          }, " « Previous ", 10, ["onClick", "disabled"]),
                          (openBlock(true), createBlock(Fragment, null, renderList(paginationItems.value, (item) => {
                            return openBlock(), createBlock(Fragment, {
                              key: item.key
                            }, [
                              item.type === "ellipsis" ? (openBlock(), createBlock("span", {
                                key: 0,
                                class: "px-3 py-2 text-sm text-gray-400"
                              }, " ... ")) : (openBlock(), createBlock("button", {
                                key: 1,
                                onClick: ($event) => goToPage(item.page),
                                class: [
                                  "px-3 py-2 text-sm rounded-md border",
                                  item.page === currentPage.value ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-500 hover:text-gray-700 border-gray-300"
                                ]
                              }, toDisplayString(item.page), 11, ["onClick"]))
                            ], 64);
                          }), 128)),
                          createVNode("button", {
                            onClick: ($event) => goToPage(currentPage.value + 1),
                            disabled: currentPage.value >= lastPage.value,
                            class: [
                              "px-3 py-2 text-sm rounded-md border",
                              currentPage.value >= lastPage.value ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed" : "bg-white text-gray-500 hover:text-gray-700 border-gray-300"
                            ]
                          }, " Next » ", 10, ["onClick", "disabled"])
                        ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/Vendors/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f266e89c"]]);
export {
  Index as default
};
