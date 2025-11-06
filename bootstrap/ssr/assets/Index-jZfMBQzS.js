import { reactive, computed, watch, withCtx, unref, createVNode, createTextVNode, withDirectives, vModelText, createBlock, createCommentVNode, toDisplayString, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-Ce1gujPB.js";
import { P as Pagination } from "./Pagination-gQsm_ev8.js";
import { FileDown, Plus, Eye, Edit, FileText, Trash2, Users } from "lucide-vue-next";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DXLFoR_k.js";
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
      "admin-keuangan.vendors.export.pdf": "/admin-keuangan/vendors/export/pdf",
      "admin-keuangan.vendors.pdf": (id) => `/admin-keuangan/vendors/${id}/pdf`
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
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID");
    };
    const deleteVendor = (vendorId) => {
      if (confirm("Apakah Anda yakin ingin menghapus vendor ini?")) {
        router.delete(route("admin-keuangan.vendors.destroy", vendorId), {
          onSuccess: () => {
            alert("Vendor berhasil dihapus!");
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
            _push2(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-afe6e823${_scopeId}><div class="bg-white shadow rounded-lg mb-6" data-v-afe6e823${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-afe6e823${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-afe6e823${_scopeId}><div data-v-afe6e823${_scopeId}><h1 class="text-2xl font-semibold text-gray-900" data-v-afe6e823${_scopeId}>Master Data Vendor</h1><p class="mt-1 text-sm text-gray-600" data-v-afe6e823${_scopeId}>Kelola data vendor untuk transaksi</p></div><div class="mt-4 sm:mt-0 flex space-x-3" data-v-afe6e823${_scopeId}><a${ssrRenderAttr("href", exportPdfUrl.value)} target="_blank" class="inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2" data-v-afe6e823${_scopeId}>`);
            _push2(ssrRenderComponent(unref(FileDown), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` Export PDF </a>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: route("admin-keuangan.vendors.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent3, _scopeId2));
                  _push3(` Tambah Vendor `);
                } else {
                  return [
                    createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
                    createTextVNode(" Tambah Vendor ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-md mb-6" data-v-afe6e823${_scopeId}><div class="px-6 py-4" data-v-afe6e823${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-afe6e823${_scopeId}><div data-v-afe6e823${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-afe6e823${_scopeId}>Cari Data</label><input${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari nama vendor, PIC, HP, email, kantor, nomor rekening, nama rekening, NIB..." class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500 sm:text-sm" data-v-afe6e823${_scopeId}></div><div class="flex items-end" data-v-afe6e823${_scopeId}><button class="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500" data-v-afe6e823${_scopeId}> Cari </button></div></div></div></div><div class="bg-white shadow overflow-hidden sm:rounded-lg" data-v-afe6e823${_scopeId}><div class="px-6 py-4 border-b border-gray-200" data-v-afe6e823${_scopeId}><h3 class="text-lg font-medium text-gray-900" data-v-afe6e823${_scopeId}>Daftar Vendor</h3><p class="mt-1 text-sm text-gray-600" data-v-afe6e823${_scopeId}> Total: ${ssrInterpolate(((_a2 = __props.vendors) == null ? void 0 : _a2.total) || 0)} data </p></div><div class="overflow-x-auto" data-v-afe6e823${_scopeId}><table class="min-w-full divide-y divide-gray-200" data-v-afe6e823${_scopeId}><thead class="bg-gray-50" data-v-afe6e823${_scopeId}><tr data-v-afe6e823${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-afe6e823${_scopeId}> ID </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-afe6e823${_scopeId}> Nama Vendor </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-afe6e823${_scopeId}> PIC </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-afe6e823${_scopeId}> No HP </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-afe6e823${_scopeId}> Email </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-afe6e823${_scopeId}> No Kantor </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-afe6e823${_scopeId}> Nomor Rekening </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-afe6e823${_scopeId}> Nama Rekening </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-afe6e823${_scopeId}> NIB </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-afe6e823${_scopeId}> Status Dokumen </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-afe6e823${_scopeId}> Tanggal Dibuat </th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-afe6e823${_scopeId}> Aksi </th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-afe6e823${_scopeId}><!--[-->`);
            ssrRenderList(__props.vendors.data, (vendor) => {
              _push2(`<tr class="hover:bg-gray-50" data-v-afe6e823${_scopeId}><td class="px-6 py-4 text-sm font-medium text-gray-900" data-v-afe6e823${_scopeId}>${ssrInterpolate(vendor.id)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-afe6e823${_scopeId}>${ssrInterpolate(vendor.nama_vendor)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-afe6e823${_scopeId}>${ssrInterpolate(vendor.pic || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-afe6e823${_scopeId}>${ssrInterpolate(vendor.no_hp || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-afe6e823${_scopeId}>${ssrInterpolate(vendor.email || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-afe6e823${_scopeId}>${ssrInterpolate(vendor.no_kantor || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-afe6e823${_scopeId}>${ssrInterpolate(vendor.nomor_rekening)}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-afe6e823${_scopeId}>${ssrInterpolate(vendor.nama_rekening)}</td><td class="px-6 py-4 text-sm text-gray-900 font-mono" data-v-afe6e823${_scopeId}>${ssrInterpolate(vendor.nib || "-")}</td><td class="px-6 py-4 text-sm" data-v-afe6e823${_scopeId}><div class="flex space-x-1" data-v-afe6e823${_scopeId}>`);
              if (vendor.photo_path) {
                _push2(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800" data-v-afe6e823${_scopeId}> Foto </span>`);
              } else {
                _push2(`<!---->`);
              }
              if (vendor.legal_document_path) {
                _push2(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-v-afe6e823${_scopeId}> Legal </span>`);
              } else {
                _push2(`<!---->`);
              }
              if (!vendor.photo_path && !vendor.legal_document_path) {
                _push2(`<span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800" data-v-afe6e823${_scopeId}> Kosong </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-6 py-4 text-sm text-gray-900" data-v-afe6e823${_scopeId}>${ssrInterpolate(formatDate(vendor.created_at))}</td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium" data-v-afe6e823${_scopeId}><div class="flex items-center space-x-2" data-v-afe6e823${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: route("admin-keuangan.vendors.show", vendor.id),
                class: "text-sage-800 p-2 rounded-md",
                title: "Lihat Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Eye), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Eye), { class: "h-4 w-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: route("admin-keuangan.vendors.edit", vendor.id),
                class: "text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50",
                title: "Edit Vendor"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(Edit), { class: "h-4 w-4" }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(Edit), { class: "h-4 w-4" })
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<a${ssrRenderAttr("href", route("admin-keuangan.vendors.pdf", vendor.id))} target="_blank" class="text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50" title="Export PDF" data-v-afe6e823${_scopeId}>`);
              _push2(ssrRenderComponent(unref(FileText), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</a><button class="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50" title="Hapus Vendor" data-v-afe6e823${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Trash2), { class: "h-4 w-4" }, null, _parent2, _scopeId));
              _push2(`</button></div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (!__props.vendors.data || __props.vendors.data.length === 0) {
              _push2(`<tr data-v-afe6e823${_scopeId}><td colspan="12" class="px-6 py-12 text-center" data-v-afe6e823${_scopeId}><div class="flex flex-col items-center" data-v-afe6e823${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Users), { class: "h-12 w-12 text-gray-300 mb-4" }, null, _parent2, _scopeId));
              _push2(`<h3 class="text-sm font-medium text-gray-900 mb-1" data-v-afe6e823${_scopeId}>Tidak ada data vendor</h3><p class="text-sm text-gray-500" data-v-afe6e823${_scopeId}>Belum ada data vendor yang tersedia</p></div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div>`);
            if (__props.vendors.last_page > 1) {
              _push2(`<div class="bg-white px-6 py-3 border-t border-gray-200" data-v-afe6e823${_scopeId}>`);
              _push2(ssrRenderComponent(Pagination, { data: __props.vendors }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                createVNode("div", { class: "bg-white shadow rounded-lg mb-6" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                    createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-2xl font-semibold text-gray-900" }, "Master Data Vendor"),
                        createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "Kelola data vendor untuk transaksi")
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
                            createTextVNode(" Tambah Vendor ")
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
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Cari Data"),
                        withDirectives(createVNode("input", {
                          "onUpdate:modelValue": ($event) => form.search = $event,
                          type: "text",
                          placeholder: "Cari nama vendor, PIC, HP, email, kantor, nomor rekening, nama rekening, NIB...",
                          class: "block w-full rounded-md border-gray-300 shadow-sm focus:border-sage-500 focus:ring-sage-500 sm:text-sm"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelText, form.search]
                        ])
                      ]),
                      createVNode("div", { class: "flex items-end" }, [
                        createVNode("button", {
                          onClick: search,
                          class: "w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sage-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, " Cari ")
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white shadow overflow-hidden sm:rounded-lg" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-gray-200" }, [
                    createVNode("h3", { class: "text-lg font-medium text-gray-900" }, "Daftar Vendor"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, " Total: " + toDisplayString(((_b = __props.vendors) == null ? void 0 : _b.total) || 0) + " data ", 1)
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "min-w-full divide-y divide-gray-200" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " ID "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Nama Vendor "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " PIC "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " No HP "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Email "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " No Kantor "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Nomor Rekening "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Nama Rekening "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " NIB "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Status Dokumen "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Tanggal Dibuat "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, " Aksi ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.vendors.data, (vendor) => {
                          return openBlock(), createBlock("tr", {
                            key: vendor.id,
                            class: "hover:bg-gray-50"
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
                                }, " Foto ")) : createCommentVNode("", true),
                                vendor.legal_document_path ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                }, " Legal ")) : createCommentVNode("", true),
                                !vendor.photo_path && !vendor.legal_document_path ? (openBlock(), createBlock("span", {
                                  key: 2,
                                  class: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                }, " Kosong ")) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(formatDate(vendor.created_at)), 1),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                createVNode(unref(Link), {
                                  href: route("admin-keuangan.vendors.show", vendor.id),
                                  class: "text-sage-800 p-2 rounded-md",
                                  title: "Lihat Detail"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Eye), { class: "h-4 w-4" })
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode(unref(Link), {
                                  href: route("admin-keuangan.vendors.edit", vendor.id),
                                  class: "text-blue-600 hover:text-blue-900 p-2 rounded-md hover:bg-blue-50",
                                  title: "Edit Vendor"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(Edit), { class: "h-4 w-4" })
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("a", {
                                  href: route("admin-keuangan.vendors.pdf", vendor.id),
                                  target: "_blank",
                                  class: "text-green-600 hover:text-green-900 p-2 rounded-md hover:bg-green-50",
                                  title: "Export PDF"
                                }, [
                                  createVNode(unref(FileText), { class: "h-4 w-4" })
                                ], 8, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => deleteVendor(vendor.id),
                                  class: "text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50",
                                  title: "Hapus Vendor"
                                }, [
                                  createVNode(unref(Trash2), { class: "h-4 w-4" })
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128)),
                        !__props.vendors.data || __props.vendors.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "12",
                            class: "px-6 py-12 text-center"
                          }, [
                            createVNode("div", { class: "flex flex-col items-center" }, [
                              createVNode(unref(Users), { class: "h-12 w-12 text-gray-300 mb-4" }),
                              createVNode("h3", { class: "text-sm font-medium text-gray-900 mb-1" }, "Tidak ada data vendor"),
                              createVNode("p", { class: "text-sm text-gray-500" }, "Belum ada data vendor yang tersedia")
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
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-afe6e823"]]);
export {
  Index as default
};
