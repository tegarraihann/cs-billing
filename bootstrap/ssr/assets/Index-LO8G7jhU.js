import { reactive, ref, watch, withCtx, unref, createBlock, createVNode, openBlock, createCommentVNode, withModifiers, withDirectives, vModelText, vModelSelect, Fragment, renderList, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-1gZAo0_N.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-DLLX4jgl.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    operationalCostCategories: Object,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.operational-cost-categories.index": "/admin-keuangan/operational-cost-categories",
        "admin-keuangan.operational-cost-categories.create": "/admin-keuangan/operational-cost-categories/create",
        "admin-keuangan.operational-cost-categories.show": "/admin-keuangan/operational-cost-categories",
        "admin-keuangan.operational-cost-categories.edit": "/admin-keuangan/operational-cost-categories"
      };
      const baseRoute = routes[name] || "#";
      return params ? `${baseRoute}/${params}` : baseRoute;
    };
    const form = reactive({
      search: props.filters.search || "",
      status: props.filters.status || ""
    });
    const showDeleteModal = ref(false);
    const categoryToDelete = ref(null);
    const submitSearch = () => {
      router.get(route("admin-keuangan.operational-cost-categories.index"), form, {
        preserveState: true,
        replace: true
      });
    };
    const resetFilters = () => {
      form.search = "";
      form.status = "";
      router.get(route("admin-keuangan.operational-cost-categories.index"), {}, {
        preserveState: true,
        replace: true
      });
    };
    const confirmDelete = (category) => {
      categoryToDelete.value = category;
      showDeleteModal.value = true;
    };
    const deleteCategory = () => {
      if (categoryToDelete.value) {
        router.delete(route("admin-keuangan.operational-cost-categories.destroy", categoryToDelete.value.id), {
          onSuccess: () => {
            showDeleteModal.value = false;
            categoryToDelete.value = null;
          }
        });
      }
    };
    const formatDate = (dateString) => {
      if (!dateString) return "-";
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    let searchTimeout = null;
    watch(() => form.search, () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        submitSearch();
      }, 500);
    });
    watch(() => form.status, () => {
      submitSearch();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8" data-v-444478d8${_scopeId}><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6" data-v-444478d8${_scopeId}><div class="flex justify-between items-center" data-v-444478d8${_scopeId}><div data-v-444478d8${_scopeId}><h1 class="text-2xl font-bold text-sage-800" data-v-444478d8${_scopeId}> Kategori Biaya Operasional </h1><p class="text-sage-600 mt-1" data-v-444478d8${_scopeId}> Kelola kategori biaya operasional untuk sistem finance </p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.operational-cost-categories.create"),
              class: "bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-444478d8${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-444478d8${_scopeId2}></path></svg><span data-v-444478d8${_scopeId2}>Tambah Kategori</span>`);
                } else {
                  return [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5",
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
                    createVNode("span", null, "Tambah Kategori")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 p-4 mb-6" data-v-444478d8${_scopeId}><form class="flex flex-wrap gap-4" data-v-444478d8${_scopeId}><div class="flex-1 min-w-64" data-v-444478d8${_scopeId}><label for="search" class="block text-sm font-medium text-sage-700 mb-1" data-v-444478d8${_scopeId}> Pencarian </label><input id="search"${ssrRenderAttr("value", form.search)} type="text" placeholder="Cari nama atau deskripsi kategori..." class="w-full rounded-lg border-sage-300 focus:border-sage-500 focus:ring-sage-500" data-v-444478d8${_scopeId}></div><div class="w-48" data-v-444478d8${_scopeId}><label for="status" class="block text-sm font-medium text-sage-700 mb-1" data-v-444478d8${_scopeId}> Status </label><select id="status" class="w-full rounded-lg border-sage-300 focus:border-sage-500 focus:ring-sage-500" data-v-444478d8${_scopeId}><option value="" data-v-444478d8${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "") : ssrLooseEqual(form.status, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="active" data-v-444478d8${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "active") : ssrLooseEqual(form.status, "active")) ? " selected" : ""}${_scopeId}>Aktif</option><option value="inactive" data-v-444478d8${ssrIncludeBooleanAttr(Array.isArray(form.status) ? ssrLooseContain(form.status, "inactive") : ssrLooseEqual(form.status, "inactive")) ? " selected" : ""}${_scopeId}>Tidak Aktif</option></select></div><div class="flex items-end space-x-2" data-v-444478d8${_scopeId}><button type="submit" class="bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2" data-v-444478d8${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-444478d8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-444478d8${_scopeId}></path></svg><span data-v-444478d8${_scopeId}>Cari</span></button><button type="button" class="bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium" data-v-444478d8${_scopeId}> Reset </button></div></form></div><div class="bg-white rounded-lg shadow-sm border border-sage-200" data-v-444478d8${_scopeId}><div class="p-6 border-b border-sage-200" data-v-444478d8${_scopeId}><h2 class="text-lg font-semibold text-sage-800" data-v-444478d8${_scopeId}> Daftar Kategori Biaya Operasional </h2></div><div class="overflow-x-auto" data-v-444478d8${_scopeId}><table class="w-full" data-v-444478d8${_scopeId}><thead class="bg-sage-50" data-v-444478d8${_scopeId}><tr data-v-444478d8${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-444478d8${_scopeId}> Nama Kategori </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-444478d8${_scopeId}> Deskripsi </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-444478d8${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-444478d8${_scopeId}> Dibuat Oleh </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-444478d8${_scopeId}> Dibuat Pada </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-444478d8${_scopeId}> Aksi </th></tr></thead><tbody class="bg-white divide-y divide-sage-200" data-v-444478d8${_scopeId}><!--[-->`);
            ssrRenderList(__props.operationalCostCategories.data, (category) => {
              var _a2;
              _push2(`<tr class="hover:bg-sage-50" data-v-444478d8${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-444478d8${_scopeId}><div class="text-sm font-medium text-sage-900" data-v-444478d8${_scopeId}>${ssrInterpolate(category.name)}</div></td><td class="px-6 py-4" data-v-444478d8${_scopeId}><div class="text-sm text-sage-600 max-w-xs truncate" data-v-444478d8${_scopeId}>${ssrInterpolate(category.description || "-")}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-444478d8${_scopeId}><span class="${ssrRenderClass([
                "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                category.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              ])}" data-v-444478d8${_scopeId}>${ssrInterpolate(category.is_active ? "Aktif" : "Tidak Aktif")}</span></td><td class="px-6 py-4 whitespace-nowrap" data-v-444478d8${_scopeId}><div class="text-sm text-sage-600" data-v-444478d8${_scopeId}>${ssrInterpolate(((_a2 = category.creator) == null ? void 0 : _a2.name) || "-")}</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-444478d8${_scopeId}><div class="text-sm text-sage-600" data-v-444478d8${_scopeId}>${ssrInterpolate(formatDate(category.created_at))}</div></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium" data-v-444478d8${_scopeId}><div class="flex items-center space-x-2" data-v-444478d8${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.operational-cost-categories.show", category.id),
                class: "text-sage-600 hover:text-sage-900 transition-colors",
                title: "Lihat Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-444478d8${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-444478d8${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-444478d8${_scopeId2}></path></svg>`);
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
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.operational-cost-categories.edit", category.id),
                class: "text-blue-600 hover:text-blue-900 transition-colors",
                title: "Edit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-444478d8${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-444478d8${_scopeId2}></path></svg>`);
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
                          d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        })
                      ]))
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="text-red-600 hover:text-red-900 transition-colors" title="Hapus" data-v-444478d8${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-444478d8${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-444478d8${_scopeId}></path></svg></button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table>`);
            if (__props.operationalCostCategories.data.length === 0) {
              _push2(`<div class="text-center py-8" data-v-444478d8${_scopeId}><p class="text-sage-500" data-v-444478d8${_scopeId}>Tidak ada data kategori biaya operasional.</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (__props.operationalCostCategories.last_page > 1) {
              _push2(`<div class="px-6 py-3 border-t border-sage-200" data-v-444478d8${_scopeId}><div class="flex items-center justify-between" data-v-444478d8${_scopeId}><div class="text-sm text-sage-700" data-v-444478d8${_scopeId}> Menampilkan ${ssrInterpolate(__props.operationalCostCategories.from)} sampai ${ssrInterpolate(__props.operationalCostCategories.to)} dari ${ssrInterpolate(__props.operationalCostCategories.total)} hasil </div><div class="flex space-x-1" data-v-444478d8${_scopeId}><!--[-->`);
              ssrRenderList(__props.operationalCostCategories.links, (link, index) => {
                _push2(ssrRenderComponent(unref(Link), {
                  key: index,
                  href: link.url,
                  class: [
                    "px-3 py-2 text-sm border rounded",
                    link.active ? "bg-sage-600 text-white border-sage-600" : "bg-white text-sage-700 border-sage-300 hover:bg-sage-50"
                  ]
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-444478d8${_scopeId}><div class="bg-white rounded-lg p-6 w-full max-w-md mx-4" data-v-444478d8${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4" data-v-444478d8${_scopeId}>Konfirmasi Hapus</h3><p class="text-sm text-gray-600 mb-6" data-v-444478d8${_scopeId}> Apakah Anda yakin ingin menghapus kategori &quot;${ssrInterpolate((_a = categoryToDelete.value) == null ? void 0 : _a.name)}&quot;? Tindakan ini tidak dapat dibatalkan. </p><div class="flex justify-end space-x-3" data-v-444478d8${_scopeId}><button class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors" data-v-444478d8${_scopeId}> Batal </button><button class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors" data-v-444478d8${_scopeId}> Hapus </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-sage-50 p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-6 mb-6" }, [
                  createVNode("div", { class: "flex justify-between items-center" }, [
                    createVNode("div", null, [
                      createVNode("h1", { class: "text-2xl font-bold text-sage-800" }, " Kategori Biaya Operasional "),
                      createVNode("p", { class: "text-sage-600 mt-1" }, " Kelola kategori biaya operasional untuk sistem finance ")
                    ]),
                    createVNode(unref(Link), {
                      href: unref(route)("admin-keuangan.operational-cost-categories.create"),
                      class: "bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
                    }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock("svg", {
                          class: "w-5 h-5",
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
                        createVNode("span", null, "Tambah Kategori")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 p-4 mb-6" }, [
                  createVNode("form", {
                    onSubmit: withModifiers(submitSearch, ["prevent"]),
                    class: "flex flex-wrap gap-4"
                  }, [
                    createVNode("div", { class: "flex-1 min-w-64" }, [
                      createVNode("label", {
                        for: "search",
                        class: "block text-sm font-medium text-sage-700 mb-1"
                      }, " Pencarian "),
                      withDirectives(createVNode("input", {
                        id: "search",
                        "onUpdate:modelValue": ($event) => form.search = $event,
                        type: "text",
                        placeholder: "Cari nama atau deskripsi kategori...",
                        class: "w-full rounded-lg border-sage-300 focus:border-sage-500 focus:ring-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, form.search]
                      ])
                    ]),
                    createVNode("div", { class: "w-48" }, [
                      createVNode("label", {
                        for: "status",
                        class: "block text-sm font-medium text-sage-700 mb-1"
                      }, " Status "),
                      withDirectives(createVNode("select", {
                        id: "status",
                        "onUpdate:modelValue": ($event) => form.status = $event,
                        class: "w-full rounded-lg border-sage-300 focus:border-sage-500 focus:ring-sage-500"
                      }, [
                        createVNode("option", { value: "" }, "Semua Status"),
                        createVNode("option", { value: "active" }, "Aktif"),
                        createVNode("option", { value: "inactive" }, "Tidak Aktif")
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, form.status]
                      ])
                    ]),
                    createVNode("div", { class: "flex items-end space-x-2" }, [
                      createVNode("button", {
                        type: "submit",
                        class: "bg-sage-600 hover:bg-sage-700 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center space-x-2"
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
                            d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          })
                        ])),
                        createVNode("span", null, "Cari")
                      ]),
                      createVNode("button", {
                        type: "button",
                        onClick: resetFilters,
                        class: "bg-sage-100 hover:bg-sage-200 text-sage-700 px-4 py-2 rounded-lg transition-colors font-medium"
                      }, " Reset ")
                    ])
                  ], 32)
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200" }, [
                  createVNode("div", { class: "p-6 border-b border-sage-200" }, [
                    createVNode("h2", { class: "text-lg font-semibold text-sage-800" }, " Daftar Kategori Biaya Operasional ")
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Nama Kategori "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Deskripsi "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Status "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Dibuat Oleh "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Dibuat Pada "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Aksi ")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.operationalCostCategories.data, (category) => {
                          var _a2;
                          return openBlock(), createBlock("tr", {
                            key: category.id,
                            class: "hover:bg-sage-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm font-medium text-sage-900" }, toDisplayString(category.name), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "text-sm text-sage-600 max-w-xs truncate" }, toDisplayString(category.description || "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("span", {
                                class: [
                                  "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                                  category.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                ]
                              }, toDisplayString(category.is_active ? "Aktif" : "Tidak Aktif"), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-sage-600" }, toDisplayString(((_a2 = category.creator) == null ? void 0 : _a2.name) || "-"), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm text-sage-600" }, toDisplayString(formatDate(category.created_at)), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                createVNode(unref(Link), {
                                  href: unref(route)("admin-keuangan.operational-cost-categories.show", category.id),
                                  class: "text-sage-600 hover:text-sage-900 transition-colors",
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
                                }, 1032, ["href"]),
                                createVNode(unref(Link), {
                                  href: unref(route)("admin-keuangan.operational-cost-categories.edit", category.id),
                                  class: "text-blue-600 hover:text-blue-900 transition-colors",
                                  title: "Edit"
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
                                        d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                      })
                                    ]))
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => confirmDelete(category),
                                  class: "text-red-600 hover:text-red-900 transition-colors",
                                  title: "Hapus"
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
                                      d: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    })
                                  ]))
                                ], 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ]),
                    __props.operationalCostCategories.data.length === 0 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-center py-8"
                    }, [
                      createVNode("p", { class: "text-sage-500" }, "Tidak ada data kategori biaya operasional.")
                    ])) : createCommentVNode("", true)
                  ]),
                  __props.operationalCostCategories.last_page > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "px-6 py-3 border-t border-sage-200"
                  }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-sm text-sage-700" }, " Menampilkan " + toDisplayString(__props.operationalCostCategories.from) + " sampai " + toDisplayString(__props.operationalCostCategories.to) + " dari " + toDisplayString(__props.operationalCostCategories.total) + " hasil ", 1),
                      createVNode("div", { class: "flex space-x-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.operationalCostCategories.links, (link, index) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: index,
                            href: link.url,
                            class: [
                              "px-3 py-2 text-sm border rounded",
                              link.active ? "bg-sage-600 text-white border-sage-600" : "bg-white text-sage-700 border-sage-300 hover:bg-sage-50"
                            ],
                            innerHTML: link.label
                          }, null, 8, ["href", "class", "innerHTML"]);
                        }), 128))
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              showDeleteModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 w-full max-w-md mx-4" }, [
                  createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Konfirmasi Hapus"),
                  createVNode("p", { class: "text-sm text-gray-600 mb-6" }, ' Apakah Anda yakin ingin menghapus kategori "' + toDisplayString((_b = categoryToDelete.value) == null ? void 0 : _b.name) + '"? Tindakan ini tidak dapat dibatalkan. ', 1),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: ($event) => showDeleteModal.value = false,
                      class: "bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                    }, " Batal ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: deleteCategory,
                      class: "bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                    }, " Hapus ")
                  ])
                ])
              ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/OperationalCostCategories/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-444478d8"]]);
export {
  Index as default
};
