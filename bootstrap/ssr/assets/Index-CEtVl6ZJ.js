import { ref, reactive, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, createCommentVNode, withDirectives, Fragment, renderList, toDisplayString, vModelSelect, withKeys, vModelText, useSSRContext } from "vue";
import { ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-COfqywW7.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-BQ7a3c_z.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    templates: Object,
    categories: Array,
    filters: Object
  },
  setup(__props) {
    const props = __props;
    const showDeleteModal = ref(false);
    const templateToDelete = ref(null);
    const filters = reactive({
      category_id: props.filters.category_id || "",
      is_active: props.filters.is_active || "",
      search: props.filters.search || ""
    });
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID").format(amount || 0);
    };
    const search = () => {
      router.get(route("admin-keuangan.expense-templates.index"), filters, {
        preserveState: true,
        replace: true
      });
    };
    const toggleStatus = (template) => {
      router.patch(route("admin-keuangan.expense-templates.toggle-status", template.id), {}, {
        preserveScroll: true
      });
    };
    const confirmDelete = (template) => {
      templateToDelete.value = template;
      showDeleteModal.value = true;
    };
    const deleteTemplate = () => {
      router.delete(route("admin-keuangan.expense-templates.destroy", templateToDelete.value.id), {
        onSuccess: () => {
          showDeleteModal.value = false;
          templateToDelete.value = null;
        }
      });
    };
    const route = window.route || function(name, params) {
      const routes = {
        "admin-keuangan.expense-templates.index": "/admin-keuangan/expense-templates",
        "admin-keuangan.expense-templates.create": "/admin-keuangan/expense-templates/create",
        "admin-keuangan.expense-templates.show": (id) => `/admin-keuangan/expense-templates/${id}`,
        "admin-keuangan.expense-templates.edit": (id) => `/admin-keuangan/expense-templates/${id}/edit`,
        "admin-keuangan.expense-templates.destroy": (id) => `/admin-keuangan/expense-templates/${id}`,
        "admin-keuangan.expense-templates.toggle-status": (id) => `/admin-keuangan/expense-templates/${id}/toggle-status`
      };
      return typeof routes[name] === "function" ? routes[name](params) : routes[name] || "#";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-3f73329d${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-3f73329d${_scopeId}><div class="flex items-center justify-between" data-v-3f73329d${_scopeId}><div data-v-3f73329d${_scopeId}><h2 class="text-2xl font-bold text-sage-800" data-v-3f73329d${_scopeId}>Template Biaya</h2><p class="text-sage-600" data-v-3f73329d${_scopeId}>Kelola template biaya operasional untuk efisiensi input dan konsistensi</p></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: unref(route)("admin-keuangan.expense-templates.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3f73329d${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-3f73329d${_scopeId2}></path></svg> Tambah Template `);
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
                    createTextVNode(" Tambah Template ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" data-v-3f73329d${_scopeId}><div class="bg-blue-50 rounded-lg p-4 border border-blue-200" data-v-3f73329d${_scopeId}><div class="text-blue-600 text-sm font-medium" data-v-3f73329d${_scopeId}>Fungsi Template:</div><div class="text-blue-800 text-xs" data-v-3f73329d${_scopeId}>Nama standar + referensi biaya</div></div><div class="bg-green-50 rounded-lg p-4 border border-green-200" data-v-3f73329d${_scopeId}><div class="text-green-600 text-sm font-medium" data-v-3f73329d${_scopeId}>Range Biaya:</div><div class="text-green-800 text-xs" data-v-3f73329d${_scopeId}>Panduan estimasi wajar</div></div><div class="bg-purple-50 rounded-lg p-4 border border-purple-200" data-v-3f73329d${_scopeId}><div class="text-purple-600 text-sm font-medium" data-v-3f73329d${_scopeId}>Usage Count:</div><div class="text-purple-800 text-xs" data-v-3f73329d${_scopeId}>Statistik &amp; prioritas template</div></div><div class="bg-orange-50 rounded-lg p-4 border border-orange-200" data-v-3f73329d${_scopeId}><div class="text-orange-600 text-sm font-medium" data-v-3f73329d${_scopeId}>Auto-Kategori:</div><div class="text-orange-800 text-xs" data-v-3f73329d${_scopeId}>Otomatis ke petty cash sesuai kategori</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-3f73329d${_scopeId}><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-3f73329d${_scopeId}><div data-v-3f73329d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-3f73329d${_scopeId}>Kategori</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-3f73329d${_scopeId}><option value="" data-v-3f73329d${ssrIncludeBooleanAttr(Array.isArray(filters.category_id) ? ssrLooseContain(filters.category_id, "") : ssrLooseEqual(filters.category_id, "")) ? " selected" : ""}${_scopeId}>Semua Kategori</option><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<option${ssrRenderAttr("value", category.id)} data-v-3f73329d${ssrIncludeBooleanAttr(Array.isArray(filters.category_id) ? ssrLooseContain(filters.category_id, category.id) : ssrLooseEqual(filters.category_id, category.id)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(category.name)}</option>`);
            });
            _push2(`<!--]--></select></div><div data-v-3f73329d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-3f73329d${_scopeId}>Status</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-3f73329d${_scopeId}><option value="" data-v-3f73329d${ssrIncludeBooleanAttr(Array.isArray(filters.is_active) ? ssrLooseContain(filters.is_active, "") : ssrLooseEqual(filters.is_active, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><option value="1" data-v-3f73329d${ssrIncludeBooleanAttr(Array.isArray(filters.is_active) ? ssrLooseContain(filters.is_active, "1") : ssrLooseEqual(filters.is_active, "1")) ? " selected" : ""}${_scopeId}>Aktif</option><option value="0" data-v-3f73329d${ssrIncludeBooleanAttr(Array.isArray(filters.is_active) ? ssrLooseContain(filters.is_active, "0") : ssrLooseEqual(filters.is_active, "0")) ? " selected" : ""}${_scopeId}>Tidak Aktif</option></select></div><div data-v-3f73329d${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2" data-v-3f73329d${_scopeId}>Pencarian</label><input type="text"${ssrRenderAttr("value", filters.search)} class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" placeholder="Nama template..." data-v-3f73329d${_scopeId}></div><div class="flex items-end" data-v-3f73329d${_scopeId}><button class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" data-v-3f73329d${_scopeId}> Cari </button></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-3f73329d${_scopeId}><div class="overflow-x-auto" data-v-3f73329d${_scopeId}><table class="w-full" data-v-3f73329d${_scopeId}><thead class="bg-gray-50" data-v-3f73329d${_scopeId}><tr data-v-3f73329d${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-3f73329d${_scopeId}>Template</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-3f73329d${_scopeId}>Kategori</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-3f73329d${_scopeId}>Range Biaya</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-3f73329d${_scopeId}>Penggunaan</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-3f73329d${_scopeId}>Status</th><th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" data-v-3f73329d${_scopeId}>Aksi</th></tr></thead><tbody class="bg-white divide-y divide-gray-200" data-v-3f73329d${_scopeId}>`);
            if (__props.templates.data.length === 0) {
              _push2(`<tr data-v-3f73329d${_scopeId}><td colspan="6" class="px-6 py-12 text-center text-gray-500" data-v-3f73329d${_scopeId}><svg class="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3f73329d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-3f73329d${_scopeId}></path></svg><p data-v-3f73329d${_scopeId}>Tidak ada template biaya ditemukan</p>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.expense-templates.create"),
                class: "inline-flex items-center mt-4 text-sage-600 hover:text-sage-800"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Buat template pertama `);
                  } else {
                    return [
                      createTextVNode(" Buat template pertama ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(__props.templates.data, (template) => {
              _push2(`<tr class="hover:bg-gray-50" data-v-3f73329d${_scopeId}><td class="px-6 py-4 whitespace-nowrap" data-v-3f73329d${_scopeId}><div data-v-3f73329d${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-3f73329d${_scopeId}>${ssrInterpolate(template.name)}</div>`);
              if (template.description) {
                _push2(`<div class="text-sm text-gray-500" data-v-3f73329d${_scopeId}>${ssrInterpolate(template.description)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-6 py-4 whitespace-nowrap" data-v-3f73329d${_scopeId}><span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-v-3f73329d${_scopeId}>${ssrInterpolate(template.category.name)}</span></td><td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900" data-v-3f73329d${_scopeId}>`);
              if (template.typical_amount_min > 0) {
                _push2(`<div data-v-3f73329d${_scopeId}>${ssrInterpolate(formatCurrency(template.typical_amount_min))} - ${ssrInterpolate(formatCurrency(template.typical_amount_max))}</div>`);
              } else {
                _push2(`<div class="text-gray-400" data-v-3f73329d${_scopeId}>Tidak ditentukan</div>`);
              }
              _push2(`</td><td class="px-6 py-4 whitespace-nowrap" data-v-3f73329d${_scopeId}><div class="text-sm" data-v-3f73329d${_scopeId}><span class="font-medium text-purple-600" data-v-3f73329d${_scopeId}>${ssrInterpolate(template.usage_count)}x</span><span class="text-gray-500" data-v-3f73329d${_scopeId}>digunakan</span></div></td><td class="px-6 py-4 whitespace-nowrap" data-v-3f73329d${_scopeId}><button class="${ssrRenderClass([
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                template.is_active ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"
              ])}" data-v-3f73329d${_scopeId}>${ssrInterpolate(template.is_active ? "Aktif" : "Tidak Aktif")}</button></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium" data-v-3f73329d${_scopeId}><div class="flex items-center space-x-3" data-v-3f73329d${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.expense-templates.show", template.id),
                class: "text-sage-600 hover:text-sage-900"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Lihat `);
                  } else {
                    return [
                      createTextVNode(" Lihat ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(Link), {
                href: unref(route)("admin-keuangan.expense-templates.edit", template.id),
                class: "text-blue-600 hover:text-blue-900"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Edit `);
                  } else {
                    return [
                      createTextVNode(" Edit ")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`<button class="text-red-600 hover:text-red-900" data-v-3f73329d${_scopeId}> Hapus </button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.templates.links) {
              _push2(`<div class="bg-gray-50 px-6 py-3 border-t border-gray-200" data-v-3f73329d${_scopeId}><div class="flex items-center justify-between" data-v-3f73329d${_scopeId}><div class="text-sm text-gray-700" data-v-3f73329d${_scopeId}> Menampilkan ${ssrInterpolate(__props.templates.from || 0)} - ${ssrInterpolate(__props.templates.to || 0)} dari ${ssrInterpolate(__props.templates.total || 0)} template </div><div class="flex space-x-1" data-v-3f73329d${_scopeId}><!--[-->`);
              ssrRenderList(__props.templates.links, (link) => {
                _push2(`<!--[-->`);
                if (link.url) {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: link.url,
                    class: [
                      "px-3 py-2 text-sm rounded-lg border",
                      link.active ? "bg-sage-600 text-white border-sage-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    ]
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<span class="${ssrRenderClass([
                    "px-3 py-2 text-sm rounded-lg border cursor-not-allowed",
                    link.active ? "bg-sage-600 text-white border-sage-600" : "bg-gray-100 text-gray-400 border-gray-300"
                  ])}" data-v-3f73329d${_scopeId}>${link.label ?? ""}</span>`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-3f73329d${_scopeId}><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" data-v-3f73329d${_scopeId}><h3 class="text-lg font-medium text-gray-900 mb-4" data-v-3f73329d${_scopeId}>Hapus Template Biaya</h3><p class="text-gray-600 mb-6" data-v-3f73329d${_scopeId}> Apakah Anda yakin ingin menghapus template &quot;${ssrInterpolate((_a = templateToDelete.value) == null ? void 0 : _a.name)}&quot;? Tindakan ini tidak dapat dibatalkan. </p><div class="flex justify-end space-x-3" data-v-3f73329d${_scopeId}><button class="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors" data-v-3f73329d${_scopeId}> Batal </button><button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-3f73329d${_scopeId}> Hapus </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800" }, "Template Biaya"),
                      createVNode("p", { class: "text-sage-600" }, "Kelola template biaya operasional untuk efisiensi input dan konsistensi")
                    ]),
                    createVNode(unref(Link), {
                      href: unref(route)("admin-keuangan.expense-templates.create"),
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
                        createTextVNode(" Tambah Template ")
                      ]),
                      _: 1
                    }, 8, ["href"])
                  ])
                ]),
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6" }, [
                  createVNode("div", { class: "bg-blue-50 rounded-lg p-4 border border-blue-200" }, [
                    createVNode("div", { class: "text-blue-600 text-sm font-medium" }, "Fungsi Template:"),
                    createVNode("div", { class: "text-blue-800 text-xs" }, "Nama standar + referensi biaya")
                  ]),
                  createVNode("div", { class: "bg-green-50 rounded-lg p-4 border border-green-200" }, [
                    createVNode("div", { class: "text-green-600 text-sm font-medium" }, "Range Biaya:"),
                    createVNode("div", { class: "text-green-800 text-xs" }, "Panduan estimasi wajar")
                  ]),
                  createVNode("div", { class: "bg-purple-50 rounded-lg p-4 border border-purple-200" }, [
                    createVNode("div", { class: "text-purple-600 text-sm font-medium" }, "Usage Count:"),
                    createVNode("div", { class: "text-purple-800 text-xs" }, "Statistik & prioritas template")
                  ]),
                  createVNode("div", { class: "bg-orange-50 rounded-lg p-4 border border-orange-200" }, [
                    createVNode("div", { class: "text-orange-600 text-sm font-medium" }, "Auto-Kategori:"),
                    createVNode("div", { class: "text-orange-800 text-xs" }, "Otomatis ke petty cash sesuai kategori")
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Kategori"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => filters.category_id = $event,
                        onChange: search,
                        class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, [
                        createVNode("option", { value: "" }, "Semua Kategori"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.categories, (category) => {
                          return openBlock(), createBlock("option", {
                            key: category.id,
                            value: category.id
                          }, toDisplayString(category.name), 9, ["value"]);
                        }), 128))
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, filters.category_id]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Status"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => filters.is_active = $event,
                        onChange: search,
                        class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, [
                        createVNode("option", { value: "" }, "Semua Status"),
                        createVNode("option", { value: "1" }, "Aktif"),
                        createVNode("option", { value: "0" }, "Tidak Aktif")
                      ], 40, ["onUpdate:modelValue"]), [
                        [vModelSelect, filters.is_active]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Pencarian"),
                      withDirectives(createVNode("input", {
                        type: "text",
                        "onUpdate:modelValue": ($event) => filters.search = $event,
                        onKeyup: withKeys(search, ["enter"]),
                        class: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500",
                        placeholder: "Nama template..."
                      }, null, 40, ["onUpdate:modelValue"]), [
                        [vModelText, filters.search]
                      ])
                    ]),
                    createVNode("div", { class: "flex items-end" }, [
                      createVNode("button", {
                        onClick: search,
                        class: "w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      }, " Cari ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-gray-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Template"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Kategori"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Range Biaya"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Penggunaan"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Status"),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Aksi")
                        ])
                      ]),
                      createVNode("tbody", { class: "bg-white divide-y divide-gray-200" }, [
                        __props.templates.data.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "6",
                            class: "px-6 py-12 text-center text-gray-500"
                          }, [
                            (openBlock(), createBlock("svg", {
                              class: "w-12 h-12 text-gray-300 mx-auto mb-4",
                              fill: "none",
                              stroke: "currentColor",
                              viewBox: "0 0 24 24"
                            }, [
                              createVNode("path", {
                                "stroke-linecap": "round",
                                "stroke-linejoin": "round",
                                "stroke-width": "2",
                                d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              })
                            ])),
                            createVNode("p", null, "Tidak ada template biaya ditemukan"),
                            createVNode(unref(Link), {
                              href: unref(route)("admin-keuangan.expense-templates.create"),
                              class: "inline-flex items-center mt-4 text-sage-600 hover:text-sage-800"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Buat template pertama ")
                              ]),
                              _: 1
                            }, 8, ["href"])
                          ])
                        ])) : createCommentVNode("", true),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.templates.data, (template) => {
                          return openBlock(), createBlock("tr", {
                            key: template.id,
                            class: "hover:bg-gray-50"
                          }, [
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", null, [
                                createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(template.name), 1),
                                template.description ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-sm text-gray-500"
                                }, toDisplayString(template.description), 1)) : createCommentVNode("", true)
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("span", { class: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800" }, toDisplayString(template.category.name), 1)
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm text-gray-900" }, [
                              template.typical_amount_min > 0 ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(formatCurrency(template.typical_amount_min)) + " - " + toDisplayString(formatCurrency(template.typical_amount_max)), 1)) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "text-gray-400"
                              }, "Tidak ditentukan"))
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("div", { class: "text-sm" }, [
                                createVNode("span", { class: "font-medium text-purple-600" }, toDisplayString(template.usage_count) + "x", 1),
                                createVNode("span", { class: "text-gray-500" }, "digunakan")
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap" }, [
                              createVNode("button", {
                                onClick: ($event) => toggleStatus(template),
                                class: [
                                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                  template.is_active ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-red-100 text-red-800 hover:bg-red-200"
                                ]
                              }, toDisplayString(template.is_active ? "Aktif" : "Tidak Aktif"), 11, ["onClick"])
                            ]),
                            createVNode("td", { class: "px-6 py-4 whitespace-nowrap text-sm font-medium" }, [
                              createVNode("div", { class: "flex items-center space-x-3" }, [
                                createVNode(unref(Link), {
                                  href: unref(route)("admin-keuangan.expense-templates.show", template.id),
                                  class: "text-sage-600 hover:text-sage-900"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Lihat ")
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode(unref(Link), {
                                  href: unref(route)("admin-keuangan.expense-templates.edit", template.id),
                                  class: "text-blue-600 hover:text-blue-900"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Edit ")
                                  ]),
                                  _: 2
                                }, 1032, ["href"]),
                                createVNode("button", {
                                  onClick: ($event) => confirmDelete(template),
                                  class: "text-red-600 hover:text-red-900"
                                }, " Hapus ", 8, ["onClick"])
                              ])
                            ])
                          ]);
                        }), 128))
                      ])
                    ])
                  ]),
                  __props.templates.links ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-gray-50 px-6 py-3 border-t border-gray-200"
                  }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-sm text-gray-700" }, " Menampilkan " + toDisplayString(__props.templates.from || 0) + " - " + toDisplayString(__props.templates.to || 0) + " dari " + toDisplayString(__props.templates.total || 0) + " template ", 1),
                      createVNode("div", { class: "flex space-x-1" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.templates.links, (link) => {
                          return openBlock(), createBlock(Fragment, {
                            key: link.label
                          }, [
                            link.url ? (openBlock(), createBlock(unref(Link), {
                              key: 0,
                              href: link.url,
                              class: [
                                "px-3 py-2 text-sm rounded-lg border",
                                link.active ? "bg-sage-600 text-white border-sage-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                              ],
                              innerHTML: link.label
                            }, null, 8, ["href", "class", "innerHTML"])) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: [
                                "px-3 py-2 text-sm rounded-lg border cursor-not-allowed",
                                link.active ? "bg-sage-600 text-white border-sage-600" : "bg-gray-100 text-gray-400 border-gray-300"
                              ],
                              innerHTML: link.label
                            }, null, 10, ["innerHTML"]))
                          ], 64);
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
                createVNode("div", { class: "bg-white rounded-lg p-6 max-w-md w-full mx-4" }, [
                  createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-4" }, "Hapus Template Biaya"),
                  createVNode("p", { class: "text-gray-600 mb-6" }, ' Apakah Anda yakin ingin menghapus template "' + toDisplayString((_b = templateToDelete.value) == null ? void 0 : _b.name) + '"? Tindakan ini tidak dapat dibatalkan. ', 1),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: ($event) => showDeleteModal.value = false,
                      class: "px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    }, " Batal ", 8, ["onClick"]),
                    createVNode("button", {
                      onClick: deleteTemplate,
                      class: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/ExpenseTemplates/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3f73329d"]]);
export {
  Index as default
};
