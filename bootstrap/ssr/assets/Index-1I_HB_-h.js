import { ref, onMounted, watch, withCtx, unref, createBlock, createTextVNode, openBlock, createVNode, withDirectives, vModelText, Fragment, renderList, toDisplayString, vModelSelect, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { Link, router } from "@inertiajs/vue3";
import { A as AdminLayout } from "./AdminLayout-KfHTSO_U.js";
import { A as AlertDialog } from "./AlertDialog-BojnVlyV.js";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./DropdownLink-DStkidMI.js";
const _sfc_main = {
  __name: "Index",
  __ssrInlineRender: true,
  props: {
    customers: Object,
    filters: Object,
    statuses: Object,
    sources: Object
  },
  setup(__props) {
    const props = __props;
    const form = ref({
      search: props.filters.search || "",
      status: props.filters.status || "",
      source: props.filters.source || ""
    });
    const alertDialog = ref({
      show: false,
      type: "info",
      title: "",
      message: "",
      confirmText: "",
      cancelText: "",
      onConfirm: null
    });
    const search = () => {
      router.get(route("admin-cs.customers.index"), form.value, {
        preserveState: true,
        replace: true
      });
    };
    const deleteCustomer = (customer) => {
      alertDialog.value = {
        show: true,
        type: "confirm",
        title: "Konfirmasi Hapus",
        message: `Apakah Anda yakin ingin menghapus data pelanggan "${customer.name}"? Tindakan ini tidak dapat dibatalkan.`,
        confirmText: "Ya, Hapus",
        cancelText: "Batal",
        onConfirm: () => {
          router.delete(route("admin-cs.customers.destroy", customer.id), {
            onSuccess: () => {
              showAlert("success", "Berhasil", "Data pelanggan berhasil dihapus.");
            },
            onError: () => {
              showAlert("error", "Gagal", "Terjadi kesalahan saat menghapus data pelanggan.");
            }
          });
        }
      };
    };
    const showAlert = (type, title, message, confirmText = "", cancelText = "") => {
      alertDialog.value = {
        show: true,
        type,
        title,
        message,
        confirmText,
        cancelText,
        onConfirm: null
      };
    };
    const handleAlertConfirm = () => {
      if (alertDialog.value.onConfirm) {
        alertDialog.value.onConfirm();
      }
    };
    const handleAlertCancel = () => {
    };
    const closeAlert = () => {
      alertDialog.value.show = false;
    };
    const getInitials = (name) => {
      if (!name) return "U";
      return name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    };
    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const successParam = urlParams.get("success");
      const errorParam = urlParams.get("error");
      if (successParam) {
        showAlert("success", "Berhasil", decodeURIComponent(successParam));
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (errorParam) {
        showAlert("error", "Terjadi Kesalahan", decodeURIComponent(errorParam));
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    });
    watch(form, () => {
      search();
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            _push2(`<div class="p-4 sm:p-6 lg:p-8" data-v-0efbba01${_scopeId}><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-0efbba01${_scopeId}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between" data-v-0efbba01${_scopeId}><div data-v-0efbba01${_scopeId}><h2 class="text-2xl font-bold text-sage-800 mb-2" data-v-0efbba01${_scopeId}> Manajemen Pelanggan </h2><p class="text-sage-600" data-v-0efbba01${_scopeId}> Kelola data pelanggan - lihat, tambah, edit, dan hapus data pelanggan </p></div><div class="mt-4 sm:mt-0" data-v-0efbba01${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-cs.customers.create"),
              class: "inline-flex items-center px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efbba01${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" data-v-0efbba01${_scopeId2}></path></svg> Tambah Pelanggan `);
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
                    createTextVNode(" Tambah Pelanggan ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div><div class="bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" data-v-0efbba01${_scopeId}><div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-0efbba01${_scopeId}><div data-v-0efbba01${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0efbba01${_scopeId}>Cari Pelanggan</label><input${ssrRenderAttr("value", form.value.search)} type="text" placeholder="Cari nama, email, telepon..." class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0efbba01${_scopeId}></div><div data-v-0efbba01${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0efbba01${_scopeId}>Filter Status</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0efbba01${_scopeId}><option value="" data-v-0efbba01${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "") : ssrLooseEqual(form.value.status, "")) ? " selected" : ""}${_scopeId}>Semua Status</option><!--[-->`);
            ssrRenderList(__props.statuses, (label, value) => {
              _push2(`<option${ssrRenderAttr("value", value)} data-v-0efbba01${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, value) : ssrLooseEqual(form.value.status, value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(label)}</option>`);
            });
            _push2(`<!--]--></select></div><div data-v-0efbba01${_scopeId}><label class="block text-sm font-medium text-sage-700 mb-2" data-v-0efbba01${_scopeId}>Filter Sumber</label><select class="w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500" data-v-0efbba01${_scopeId}><option value="" data-v-0efbba01${ssrIncludeBooleanAttr(Array.isArray(form.value.source) ? ssrLooseContain(form.value.source, "") : ssrLooseEqual(form.value.source, "")) ? " selected" : ""}${_scopeId}>Semua Sumber</option><!--[-->`);
            ssrRenderList(__props.sources, (label, value) => {
              _push2(`<option${ssrRenderAttr("value", value)} data-v-0efbba01${ssrIncludeBooleanAttr(Array.isArray(form.value.source) ? ssrLooseContain(form.value.source, value) : ssrLooseEqual(form.value.source, value)) ? " selected" : ""}${_scopeId}>${ssrInterpolate(label)}</option>`);
            });
            _push2(`<!--]--></select></div><div class="flex items-end" data-v-0efbba01${_scopeId}><button class="w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors" data-v-0efbba01${_scopeId}> Filter </button></div></div></div><div class="bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" data-v-0efbba01${_scopeId}><div class="px-6 py-4 border-b border-sage-200" data-v-0efbba01${_scopeId}><h3 class="text-lg font-semibold text-sage-800" data-v-0efbba01${_scopeId}>Daftar Pelanggan</h3><p class="text-sm text-sage-600 mt-1" data-v-0efbba01${_scopeId}> Total: ${ssrInterpolate(((_a = __props.customers) == null ? void 0 : _a.total) || 0)} pelanggan </p></div><div class="overflow-x-auto" data-v-0efbba01${_scopeId}><table class="w-full" data-v-0efbba01${_scopeId}><thead class="bg-sage-50" data-v-0efbba01${_scopeId}><tr data-v-0efbba01${_scopeId}><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-0efbba01${_scopeId}> Pelanggan </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-0efbba01${_scopeId}> Perusahaan </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-0efbba01${_scopeId}> Sumber </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-0efbba01${_scopeId}> Status </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-0efbba01${_scopeId}> Handler </th><th class="px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" data-v-0efbba01${_scopeId}> Aksi </th></tr></thead><tbody class="divide-y divide-sage-200" data-v-0efbba01${_scopeId}><!--[-->`);
            ssrRenderList(__props.customers.data, (customer) => {
              var _a2;
              _push2(`<tr class="hover:bg-sage-50 transition-colors" data-v-0efbba01${_scopeId}><td class="px-6 py-4" data-v-0efbba01${_scopeId}><div class="flex items-center" data-v-0efbba01${_scopeId}><div class="w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center mr-3" data-v-0efbba01${_scopeId}><span class="text-white font-semibold text-sm" data-v-0efbba01${_scopeId}>${ssrInterpolate(getInitials(customer.name))}</span></div><div data-v-0efbba01${_scopeId}><div class="text-sm font-medium text-gray-900" data-v-0efbba01${_scopeId}>${ssrInterpolate(customer.name)}</div><div class="text-sm text-gray-500" data-v-0efbba01${_scopeId}>${ssrInterpolate(customer.email)}</div><div class="text-xs text-gray-400" data-v-0efbba01${_scopeId}>${ssrInterpolate(customer.phone)}</div></div></div></td><td class="px-6 py-4 text-sm text-gray-900" data-v-0efbba01${_scopeId}>${ssrInterpolate(customer.company || "-")}</td><td class="px-6 py-4 text-sm text-gray-900" data-v-0efbba01${_scopeId}>${ssrInterpolate(customer.inquiry_source_label)}</td><td class="px-6 py-4" data-v-0efbba01${_scopeId}><span class="${ssrRenderClass([customer.status_color, "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}" data-v-0efbba01${_scopeId}>${ssrInterpolate(customer.status_label)}</span></td><td class="px-6 py-4 text-sm text-gray-900" data-v-0efbba01${_scopeId}>${ssrInterpolate(((_a2 = customer.handler) == null ? void 0 : _a2.name) || "-")}</td><td class="px-6 py-4" data-v-0efbba01${_scopeId}><div class="flex items-center space-x-2" data-v-0efbba01${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: _ctx.route("admin-cs.customers.show", customer.id),
                class: "text-sage-600 hover:text-sage-800 p-1 rounded transition-colors",
                title: "Lihat Detail"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efbba01${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-0efbba01${_scopeId2}></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" data-v-0efbba01${_scopeId2}></path></svg>`);
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
                href: _ctx.route("admin-cs.customers.edit", customer.id),
                class: "text-blue-600 hover:text-blue-800 p-1 rounded transition-colors",
                title: "Edit"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efbba01${_scopeId2}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" data-v-0efbba01${_scopeId2}></path></svg>`);
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
              _push2(`<button class="text-red-600 hover:text-red-800 p-1 rounded transition-colors" title="Hapus" data-v-0efbba01${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-0efbba01${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-0efbba01${_scopeId}></path></svg></button></div></td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (((_b = __props.customers) == null ? void 0 : _b.last_page) > 1) {
              _push2(`<div class="px-6 py-4 border-t border-sage-200" data-v-0efbba01${_scopeId}><div class="flex items-center justify-between" data-v-0efbba01${_scopeId}><div class="text-sm text-sage-600" data-v-0efbba01${_scopeId}> Menampilkan ${ssrInterpolate(__props.customers.from)} sampai ${ssrInterpolate(__props.customers.to)} dari ${ssrInterpolate(__props.customers.total)} hasil </div><div class="flex space-x-1" data-v-0efbba01${_scopeId}>`);
              if (_ctx.link.url) {
                _push2(`<!--[-->`);
                ssrRenderList(__props.customers.links, (link, index) => {
                  _push2(ssrRenderComponent(unref(Link), {
                    key: index,
                    href: link.url,
                    class: ["px-3 py-2 text-sm rounded-md transition-colors", link.active ? "bg-sage-600 text-white" : "text-sage-600 hover:bg-sage-100"]
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              } else {
                _push2(`<span class="px-3 py-2 text-sm text-gray-500" style="${ssrRenderStyle({ "pointer-events": "none", "opacity": "0.5" })}" data-v-0efbba01${_scopeId}>${_ctx.link.label ?? ""}</span>`);
              }
              _push2(`</div></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: alertDialog.value.show,
              type: alertDialog.value.type,
              title: alertDialog.value.title,
              message: alertDialog.value.message,
              "confirm-text": alertDialog.value.confirmText,
              "cancel-text": alertDialog.value.cancelText,
              onConfirm: handleAlertConfirm,
              onCancel: handleAlertCancel,
              onClose: closeAlert
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "p-4 sm:p-6 lg:p-8" }, [
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "flex flex-col sm:flex-row sm:items-center sm:justify-between" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-2xl font-bold text-sage-800 mb-2" }, " Manajemen Pelanggan "),
                      createVNode("p", { class: "text-sage-600" }, " Kelola data pelanggan - lihat, tambah, edit, dan hapus data pelanggan ")
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
                          createTextVNode(" Tambah Pelanggan ")
                        ]),
                        _: 1
                      }, 8, ["href"])
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm p-6 mb-6 border border-sage-200" }, [
                  createVNode("div", { class: "grid grid-cols-1 md:grid-cols-4 gap-4" }, [
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Cari Pelanggan"),
                      withDirectives(createVNode("input", {
                        "onUpdate:modelValue": ($event) => form.value.search = $event,
                        type: "text",
                        placeholder: "Cari nama, email, telepon...",
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, null, 8, ["onUpdate:modelValue"]), [
                        [vModelText, form.value.search]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Filter Status"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => form.value.status = $event,
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, [
                        createVNode("option", { value: "" }, "Semua Status"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.statuses, (label, value) => {
                          return openBlock(), createBlock("option", {
                            key: value,
                            value
                          }, toDisplayString(label), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, form.value.status]
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-sage-700 mb-2" }, "Filter Sumber"),
                      withDirectives(createVNode("select", {
                        "onUpdate:modelValue": ($event) => form.value.source = $event,
                        class: "w-full px-3 py-2 border border-sage-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-sage-500"
                      }, [
                        createVNode("option", { value: "" }, "Semua Sumber"),
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.sources, (label, value) => {
                          return openBlock(), createBlock("option", {
                            key: value,
                            value
                          }, toDisplayString(label), 9, ["value"]);
                        }), 128))
                      ], 8, ["onUpdate:modelValue"]), [
                        [vModelSelect, form.value.source]
                      ])
                    ]),
                    createVNode("div", { class: "flex items-end" }, [
                      createVNode("button", {
                        onClick: search,
                        class: "w-full px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors"
                      }, " Filter ")
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-white rounded-lg shadow-sm border border-sage-200 overflow-hidden" }, [
                  createVNode("div", { class: "px-6 py-4 border-b border-sage-200" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-sage-800" }, "Daftar Pelanggan"),
                    createVNode("p", { class: "text-sm text-sage-600 mt-1" }, " Total: " + toDisplayString(((_c = __props.customers) == null ? void 0 : _c.total) || 0) + " pelanggan ", 1)
                  ]),
                  createVNode("div", { class: "overflow-x-auto" }, [
                    createVNode("table", { class: "w-full" }, [
                      createVNode("thead", { class: "bg-sage-50" }, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Pelanggan "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Perusahaan "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Sumber "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Status "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Handler "),
                          createVNode("th", { class: "px-6 py-3 text-left text-xs font-medium text-sage-500 uppercase tracking-wider" }, " Aksi ")
                        ])
                      ]),
                      createVNode("tbody", { class: "divide-y divide-sage-200" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(__props.customers.data, (customer) => {
                          var _a2;
                          return openBlock(), createBlock("tr", {
                            key: customer.id,
                            class: "hover:bg-sage-50 transition-colors"
                          }, [
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode("div", { class: "w-10 h-10 bg-sage-600 rounded-full flex items-center justify-center mr-3" }, [
                                  createVNode("span", { class: "text-white font-semibold text-sm" }, toDisplayString(getInitials(customer.name)), 1)
                                ]),
                                createVNode("div", null, [
                                  createVNode("div", { class: "text-sm font-medium text-gray-900" }, toDisplayString(customer.name), 1),
                                  createVNode("div", { class: "text-sm text-gray-500" }, toDisplayString(customer.email), 1),
                                  createVNode("div", { class: "text-xs text-gray-400" }, toDisplayString(customer.phone), 1)
                                ])
                              ])
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(customer.company || "-"), 1),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(customer.inquiry_source_label), 1),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("span", {
                                class: [customer.status_color, "inline-flex px-2 py-1 text-xs font-semibold rounded-full"]
                              }, toDisplayString(customer.status_label), 3)
                            ]),
                            createVNode("td", { class: "px-6 py-4 text-sm text-gray-900" }, toDisplayString(((_a2 = customer.handler) == null ? void 0 : _a2.name) || "-"), 1),
                            createVNode("td", { class: "px-6 py-4" }, [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                createVNode(unref(Link), {
                                  href: _ctx.route("admin-cs.customers.show", customer.id),
                                  class: "text-sage-600 hover:text-sage-800 p-1 rounded transition-colors",
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
                                  href: _ctx.route("admin-cs.customers.edit", customer.id),
                                  class: "text-blue-600 hover:text-blue-800 p-1 rounded transition-colors",
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
                                  onClick: ($event) => deleteCustomer(customer),
                                  class: "text-red-600 hover:text-red-800 p-1 rounded transition-colors",
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
                    ])
                  ]),
                  ((_d = __props.customers) == null ? void 0 : _d.last_page) > 1 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "px-6 py-4 border-t border-sage-200"
                  }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "text-sm text-sage-600" }, " Menampilkan " + toDisplayString(__props.customers.from) + " sampai " + toDisplayString(__props.customers.to) + " dari " + toDisplayString(__props.customers.total) + " hasil ", 1),
                      createVNode("div", { class: "flex space-x-1" }, [
                        _ctx.link.url ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(__props.customers.links, (link, index) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: index,
                            href: link.url,
                            innerHTML: link.label,
                            class: ["px-3 py-2 text-sm rounded-md transition-colors", link.active ? "bg-sage-600 text-white" : "text-sage-600 hover:bg-sage-100"]
                          }, null, 8, ["href", "innerHTML", "class"]);
                        }), 128)) : (openBlock(), createBlock("span", {
                          key: 1,
                          innerHTML: _ctx.link.label,
                          class: "px-3 py-2 text-sm text-gray-500",
                          style: { "pointer-events": "none", "opacity": "0.5" }
                        }, null, 8, ["innerHTML"]))
                      ])
                    ])
                  ])) : createCommentVNode("", true)
                ])
              ]),
              createVNode(AlertDialog, {
                show: alertDialog.value.show,
                type: alertDialog.value.type,
                title: alertDialog.value.title,
                message: alertDialog.value.message,
                "confirm-text": alertDialog.value.confirmText,
                "cancel-text": alertDialog.value.cancelText,
                onConfirm: handleAlertConfirm,
                onCancel: handleAlertCancel,
                onClose: closeAlert
              }, null, 8, ["show", "type", "title", "message", "confirm-text", "cancel-text"])
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
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0efbba01"]]);
export {
  Index as default
};
