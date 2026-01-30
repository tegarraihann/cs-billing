import { ref, withCtx, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { Head, router } from "@inertiajs/vue3";
import { M as MasterAdminLayout } from "./MasterAdminLayout-DdhkBJT4.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-Docsn73D.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const dashboardRoute = "/master-admin/dashboard";
const createServiceRoute = "/master-admin/website-settings/services/create";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    services: Array
  },
  setup(__props) {
    const showDeleteModal = ref(false);
    const serviceToDelete = ref(null);
    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    const getEditRoute = (serviceId) => {
      return `/master-admin/website-settings/services/${serviceId}/edit`;
    };
    const toggleServiceStatus = (service) => {
      var _a;
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append(
        "_token",
        (_a = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : _a.getAttribute("content")
      );
      router.post(
        `/master-admin/website-settings/services/${service.id}/toggle-status`,
        formData,
        {
          preserveState: false
        }
      );
    };
    const confirmDelete = (service) => {
      serviceToDelete.value = service;
      showDeleteModal.value = true;
    };
    const cancelDelete = () => {
      serviceToDelete.value = null;
      showDeleteModal.value = false;
    };
    const deleteService = () => {
      if (serviceToDelete.value) {
        router.delete(
          `/master-admin/website-settings/services/${serviceToDelete.value.id}`,
          {
            preserveState: false
          }
        );
        serviceToDelete.value = null;
        showDeleteModal.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(MasterAdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Kelola Service" }, null, _parent2, _scopeId));
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-2948339d${_scopeId}>`);
            if ((_a = _ctx.$page.props.flash) == null ? void 0 : _a.success) {
              _push2(`<div class="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" data-v-2948339d${_scopeId}><span class="block sm:inline" data-v-2948339d${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.success)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if ((_b = _ctx.$page.props.flash) == null ? void 0 : _b.error) {
              _push2(`<div class="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" data-v-2948339d${_scopeId}><span class="block sm:inline" data-v-2948339d${_scopeId}>${ssrInterpolate(_ctx.$page.props.flash.error)}</span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="mb-6" data-v-2948339d${_scopeId}><nav class="flex" aria-label="Breadcrumb" data-v-2948339d${_scopeId}><ol class="inline-flex items-center space-x-1 md:space-x-3" data-v-2948339d${_scopeId}><li class="inline-flex items-center" data-v-2948339d${_scopeId}><a${ssrRenderAttr("href", dashboardRoute)} class="text-sage-600 hover:text-sage-800" data-v-2948339d${_scopeId}>Dashboard</a></li><li data-v-2948339d${_scopeId}><div class="flex items-center" data-v-2948339d${_scopeId}><svg class="w-4 h-4 text-sage-400" fill="currentColor" viewBox="0 0 20 20" data-v-2948339d${_scopeId}><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" data-v-2948339d${_scopeId}></path></svg><span class="ml-1 text-sage-500 md:ml-2" data-v-2948339d${_scopeId}>Kelola Service</span></div></li></ol></nav></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-2948339d${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-2948339d${_scopeId}><div data-v-2948339d${_scopeId}><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-2948339d${_scopeId}> Kelola Service </h2><p class="text-sage-600" data-v-2948339d${_scopeId}> Tambah, edit, dan kelola layanan yang ditampilkan di website </p></div><div class="mt-4 sm:mt-0" data-v-2948339d${_scopeId}><a${ssrRenderAttr("href", createServiceRoute)} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-2948339d${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2948339d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-2948339d${_scopeId}></path></svg> Tambah Service </a></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-2948339d${_scopeId}><div class="px-6 py-4 border-b border-sage-200" data-v-2948339d${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-2948339d${_scopeId}>Daftar Service</h3><p class="text-sm text-sage-600 mt-1" data-v-2948339d${_scopeId}> Total: ${ssrInterpolate(((_c = __props.services) == null ? void 0 : _c.length) || 0)} service </p></div>`);
            if (!__props.services || __props.services.length === 0) {
              _push2(`<div class="p-8 text-center" data-v-2948339d${_scopeId}><svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2948339d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z" data-v-2948339d${_scopeId}></path></svg><h3 class="text-lg font-medium text-gray-900 mb-2" data-v-2948339d${_scopeId}> Belum ada service </h3><p class="text-gray-500 mb-4" data-v-2948339d${_scopeId}> Mulai dengan menambahkan service pertama Anda. </p><a${ssrRenderAttr("href", createServiceRoute)} class="inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-2948339d${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2948339d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-2948339d${_scopeId}></path></svg> Tambah Service </a></div>`);
            } else {
              _push2(`<div class="divide-y divide-sage-200" data-v-2948339d${_scopeId}><!--[-->`);
              ssrRenderList(__props.services, (service) => {
                _push2(`<div class="p-6 hover:bg-sage-50 transition-colors" data-v-2948339d${_scopeId}><div class="flex justify-between items-start" data-v-2948339d${_scopeId}><div class="flex space-x-4 flex-1" data-v-2948339d${_scopeId}>`);
                if (service.image_path) {
                  _push2(`<div class="flex-shrink-0" data-v-2948339d${_scopeId}><img${ssrRenderAttr("src", `/storage/${service.image_path}`)}${ssrRenderAttr("alt", service.title)} class="w-20 h-20 object-cover rounded border" data-v-2948339d${_scopeId}></div>`);
                } else {
                  _push2(`<div class="flex-shrink-0 w-20 h-20 bg-gray-200 rounded border flex items-center justify-center" data-v-2948339d${_scopeId}><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2948339d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-2948339d${_scopeId}></path></svg></div>`);
                }
                _push2(`<div class="flex-1 min-w-0" data-v-2948339d${_scopeId}><div class="flex items-center space-x-3 mb-2" data-v-2948339d${_scopeId}><h3 class="text-lg font-medium text-gray-900 truncate" data-v-2948339d${_scopeId}>${ssrInterpolate(service.title)}</h3><span class="${ssrRenderClass([
                  "px-2 py-1 text-xs rounded-full",
                  service.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                ])}" data-v-2948339d${_scopeId}>${ssrInterpolate(service.is_active ? "Aktif" : "Tidak Aktif")}</span></div><p class="text-sm text-gray-600 mb-3 line-clamp-2" data-v-2948339d${_scopeId}>${ssrInterpolate(service.description)}</p><div class="flex items-center text-xs text-gray-500 space-x-4" data-v-2948339d${_scopeId}><span data-v-2948339d${_scopeId}>Urutan: ${ssrInterpolate(service.order_index)}</span><span data-v-2948339d${_scopeId}>Dibuat: ${ssrInterpolate(formatDate(service.created_at))}</span>`);
                if (service.updated_at !== service.created_at) {
                  _push2(`<span data-v-2948339d${_scopeId}>Diperbarui: ${ssrInterpolate(formatDate(service.updated_at))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div></div><div class="flex items-center space-x-2 ml-4" data-v-2948339d${_scopeId}><a${ssrRenderAttr("href", getEditRoute(service.id))} class="text-blue-600 hover:text-blue-800 p-2 rounded transition-colors" title="Edit" data-v-2948339d${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2948339d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-2948339d${_scopeId}></path></svg></a><button class="${ssrRenderClass([
                  service.is_active ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800",
                  "p-2 rounded transition-colors"
                ])}"${ssrRenderAttr("title", service.is_active ? "Nonaktifkan" : "Aktifkan")} data-v-2948339d${_scopeId}>`);
                if (service.is_active) {
                  _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2948339d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" data-v-2948339d${_scopeId}></path></svg>`);
                } else {
                  _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2948339d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" data-v-2948339d${_scopeId}></path></svg>`);
                }
                _push2(`</button><button class="text-red-600 hover:text-red-800 p-2 rounded transition-colors" title="Hapus" data-v-2948339d${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-2948339d${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-2948339d${_scopeId}></path></svg></button></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            }
            _push2(`</div></div>`);
            if (showDeleteModal.value) {
              _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" data-v-2948339d${_scopeId}><div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" data-v-2948339d${_scopeId}><h3 class="text-lg font-semibold text-gray-900 mb-4" data-v-2948339d${_scopeId}> Konfirmasi Hapus </h3><p class="text-gray-600 mb-6" data-v-2948339d${_scopeId}> Apakah Anda yakin ingin menghapus service &quot;${ssrInterpolate((_d = serviceToDelete.value) == null ? void 0 : _d.title)}&quot;? Tindakan ini tidak dapat dibatalkan. </p><div class="flex justify-end space-x-3" data-v-2948339d${_scopeId}><button class="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors" data-v-2948339d${_scopeId}> Batal </button><button class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors" data-v-2948339d${_scopeId}> Hapus </button></div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(unref(Head), { title: "Kelola Service" }),
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                ((_e = _ctx.$page.props.flash) == null ? void 0 : _e.success) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                }, [
                  createVNode("span", { class: "block sm:inline" }, toDisplayString(_ctx.$page.props.flash.success), 1)
                ])) : createCommentVNode("", true),
                ((_f = _ctx.$page.props.flash) == null ? void 0 : _f.error) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                }, [
                  createVNode("span", { class: "block sm:inline" }, toDisplayString(_ctx.$page.props.flash.error), 1)
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "mb-6" }, [
                  createVNode("nav", {
                    class: "flex",
                    "aria-label": "Breadcrumb"
                  }, [
                    createVNode("ol", { class: "inline-flex items-center space-x-1 md:space-x-3" }, [
                      createVNode("li", { class: "inline-flex items-center" }, [
                        createVNode("a", {
                          href: dashboardRoute,
                          class: "text-sage-600 hover:text-sage-800"
                        }, "Dashboard")
                      ]),
                      createVNode("li", null, [
                        createVNode("div", { class: "flex items-center" }, [
                          (openBlock(), createBlock("svg", {
                            class: "w-4 h-4 text-sage-400",
                            fill: "currentColor",
                            viewBox: "0 0 20 20"
                          }, [
                            createVNode("path", {
                              "fill-rule": "evenodd",
                              d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",
                              "clip-rule": "evenodd"
                            })
                          ])),
                          createVNode("span", { class: "ml-1 text-sage-500 md:ml-2" }, "Kelola Service")
                        ])
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800 mb-2" }, " Kelola Service "),
                      createVNode("p", { class: "text-sage-600" }, " Tambah, edit, dan kelola layanan yang ditampilkan di website ")
                    ]),
                    createVNode("div", { class: "mt-4 sm:mt-0" }, [
                      createVNode("a", {
                        href: createServiceRoute,
                        class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                      }, [
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
                        createTextVNode(" Tambah Service ")
                      ])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Daftar Service"),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Total: " + toDisplayString(((_g = __props.services) == null ? void 0 : _g.length) || 0) + " service ", 1)
                  ]),
                  !__props.services || __props.services.length === 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "p-8 text-center"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-16 h-16 mx-auto text-gray-400 mb-4",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6z"
                      })
                    ])),
                    createVNode("h3", { class: "text-lg font-medium text-gray-900 mb-2" }, " Belum ada service "),
                    createVNode("p", { class: "text-gray-500 mb-4" }, " Mulai dengan menambahkan service pertama Anda. "),
                    createVNode("a", {
                      href: createServiceRoute,
                      class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                    }, [
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
                      createTextVNode(" Tambah Service ")
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "divide-y divide-sage-200"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.services, (service) => {
                      return openBlock(), createBlock("div", {
                        key: service.id,
                        class: "p-6 hover:bg-sage-50 transition-colors"
                      }, [
                        createVNode("div", { class: "flex justify-between items-start" }, [
                          createVNode("div", { class: "flex space-x-4 flex-1" }, [
                            service.image_path ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "flex-shrink-0"
                            }, [
                              createVNode("img", {
                                src: `/storage/${service.image_path}`,
                                alt: service.title,
                                class: "w-20 h-20 object-cover rounded border"
                              }, null, 8, ["src", "alt"])
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "flex-shrink-0 w-20 h-20 bg-gray-200 rounded border flex items-center justify-center"
                            }, [
                              (openBlock(), createBlock("svg", {
                                class: "w-8 h-8 text-gray-400",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                })
                              ]))
                            ])),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("div", { class: "flex items-center space-x-3 mb-2" }, [
                                createVNode("h3", { class: "text-lg font-medium text-gray-900 truncate" }, toDisplayString(service.title), 1),
                                createVNode("span", {
                                  class: [
                                    "px-2 py-1 text-xs rounded-full",
                                    service.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                  ]
                                }, toDisplayString(service.is_active ? "Aktif" : "Tidak Aktif"), 3)
                              ]),
                              createVNode("p", { class: "text-sm text-gray-600 mb-3 line-clamp-2" }, toDisplayString(service.description), 1),
                              createVNode("div", { class: "flex items-center text-xs text-gray-500 space-x-4" }, [
                                createVNode("span", null, "Urutan: " + toDisplayString(service.order_index), 1),
                                createVNode("span", null, "Dibuat: " + toDisplayString(formatDate(service.created_at)), 1),
                                service.updated_at !== service.created_at ? (openBlock(), createBlock("span", { key: 0 }, "Diperbarui: " + toDisplayString(formatDate(service.updated_at)), 1)) : createCommentVNode("", true)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center space-x-2 ml-4" }, [
                            createVNode("a", {
                              href: getEditRoute(service.id),
                              class: "text-blue-600 hover:text-blue-800 p-2 rounded transition-colors",
                              title: "Edit"
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
                                  d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                })
                              ]))
                            ], 8, ["href"]),
                            createVNode("button", {
                              onClick: ($event) => toggleServiceStatus(service),
                              class: [
                                "p-2 rounded transition-colors",
                                service.is_active ? "text-orange-600 hover:text-orange-800" : "text-green-600 hover:text-green-800"
                              ],
                              title: service.is_active ? "Nonaktifkan" : "Aktifkan"
                            }, [
                              service.is_active ? (openBlock(), createBlock("svg", {
                                key: 0,
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
                                })
                              ])) : (openBlock(), createBlock("svg", {
                                key: 1,
                                class: "w-4 h-4",
                                fill: "none",
                                stroke: "currentColor",
                                viewBox: "0 0 24 24"
                              }, [
                                createVNode("path", {
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round",
                                  "stroke-width": "2",
                                  d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                })
                              ]))
                            ], 10, ["onClick", "title"]),
                            createVNode("button", {
                              onClick: ($event) => confirmDelete(service),
                              class: "text-red-600 hover:text-red-800 p-2 rounded transition-colors",
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
                  ]))
                ])
              ]),
              showDeleteModal.value ? (openBlock(), createBlock("div", {
                key: 0,
                class: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              }, [
                createVNode("div", { class: "bg-white rounded-lg p-6 max-w-md w-full mx-4" }, [
                  createVNode("h3", { class: "text-lg font-semibold text-gray-900 mb-4" }, " Konfirmasi Hapus "),
                  createVNode("p", { class: "text-gray-600 mb-6" }, ' Apakah Anda yakin ingin menghapus service "' + toDisplayString((_h = serviceToDelete.value) == null ? void 0 : _h.title) + '"? Tindakan ini tidak dapat dibatalkan. ', 1),
                  createVNode("div", { class: "flex justify-end space-x-3" }, [
                    createVNode("button", {
                      onClick: cancelDelete,
                      class: "px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    }, " Batal "),
                    createVNode("button", {
                      onClick: deleteService,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/MasterAdmin/WebsiteSettings/Service/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2948339d"]]);
export {
  Index as default
};
