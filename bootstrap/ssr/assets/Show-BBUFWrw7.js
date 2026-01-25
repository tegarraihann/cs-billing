import { ref, withCtx, unref, createVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { Head, Link, router } from "@inertiajs/vue3";
import { A as AdminKeuanganLayout } from "./AdminKeuanganLayout-BXHi-kqO.js";
import { A as AlertDialog } from "./AlertDialog-EBWNJU3S.js";
import { ArrowLeft } from "lucide-vue-next";
import "./DropdownLink-DlebuOGD.js";
import "./SidebarNavigation-CLvY_m2-.js";
import "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./useIdleTimeout-BVnZv5Lp.js";
const _sfc_main = {
  __name: "Show",
  __ssrInlineRender: true,
  props: {
    packageUnit: Object
  },
  setup(__props) {
    const props = __props;
    const showDeleteModal = ref(false);
    const toggleStatus = () => {
      router.patch(route("admin-keuangan.master-package-units.toggle-status", props.packageUnit.id), {}, {
        preserveScroll: true
      });
    };
    const deleteUnit = () => {
      router.delete(route("admin-keuangan.master-package-units.destroy", props.packageUnit.id), {
        onSuccess: () => {
          showDeleteModal.value = false;
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(AdminKeuanganLayout, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Head), { title: "Package Unit Details" }, null, _parent2, _scopeId));
            _push2(`<div class="py-6"${_scopeId}><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"${_scopeId}><div class="mb-6"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.master-package-units.index"),
              class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }, null, _parent3, _scopeId2));
                  _push3(` Back to Master Package Units `);
                } else {
                  return [
                    createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                    createTextVNode(" Back to Master Package Units ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h1 class="text-2xl font-bold text-gray-900"${_scopeId}>Package Unit Details</h1><p class="mt-1 text-sm text-gray-600"${_scopeId}>View package unit information</p></div><div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl"${_scopeId}><div class="px-6 py-8 space-y-6"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Unit Code</label><div class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.packageUnit.code)}</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Unit Name</label><div class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.packageUnit.name)}</div></div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Description</label><div class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.packageUnit.description || "-")}</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Sort Order</label><div class="text-sm text-gray-900"${_scopeId}>${ssrInterpolate(__props.packageUnit.sort_order)}</div></div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 mb-2"${_scopeId}>Status</label><span class="${ssrRenderClass([__props.packageUnit.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800", "inline-flex px-2 py-1 text-xs font-semibold rounded-full"])}"${_scopeId}>${ssrInterpolate(__props.packageUnit.is_active ? "Active" : "Inactive")}</span></div></div><div class="pt-6 border-t border-gray-200 flex justify-end space-x-3"${_scopeId}><button class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"${_scopeId}>${ssrInterpolate(__props.packageUnit.is_active ? "Deactivate" : "Activate")}</button>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: _ctx.route("admin-keuangan.master-package-units.edit", __props.packageUnit.id),
              class: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit Package Unit `);
                } else {
                  return [
                    createTextVNode(" Edit Package Unit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<button class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"${_scopeId}> Delete </button></div></div></div></div></div>`);
            _push2(ssrRenderComponent(AlertDialog, {
              show: showDeleteModal.value,
              title: "Delete Package Unit",
              message: `Are you sure you want to delete package unit '${__props.packageUnit.code}'?`,
              "confirm-text": "Delete",
              "cancel-text": "Cancel",
              onConfirm: deleteUnit,
              onCancel: ($event) => showDeleteModal.value = false
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(Head), { title: "Package Unit Details" }),
              createVNode("div", { class: "py-6" }, [
                createVNode("div", { class: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" }, [
                  createVNode("div", { class: "mb-6" }, [
                    createVNode(unref(Link), {
                      href: _ctx.route("admin-keuangan.master-package-units.index"),
                      class: "inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowLeft), { class: "w-4 h-4 mr-2" }),
                        createTextVNode(" Back to Master Package Units ")
                      ]),
                      _: 1
                    }, 8, ["href"]),
                    createVNode("h1", { class: "text-2xl font-bold text-gray-900" }, "Package Unit Details"),
                    createVNode("p", { class: "mt-1 text-sm text-gray-600" }, "View package unit information")
                  ]),
                  createVNode("div", { class: "bg-white shadow-sm ring-1 ring-gray-900/5 rounded-xl" }, [
                    createVNode("div", { class: "px-6 py-8 space-y-6" }, [
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Unit Code"),
                          createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(__props.packageUnit.code), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Unit Name"),
                          createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(__props.packageUnit.name), 1)
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Description"),
                        createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(__props.packageUnit.description || "-"), 1)
                      ]),
                      createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Sort Order"),
                          createVNode("div", { class: "text-sm text-gray-900" }, toDisplayString(__props.packageUnit.sort_order), 1)
                        ]),
                        createVNode("div", null, [
                          createVNode("label", { class: "block text-sm font-medium text-gray-700 mb-2" }, "Status"),
                          createVNode("span", {
                            class: ["inline-flex px-2 py-1 text-xs font-semibold rounded-full", __props.packageUnit.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"]
                          }, toDisplayString(__props.packageUnit.is_active ? "Active" : "Inactive"), 3)
                        ])
                      ]),
                      createVNode("div", { class: "pt-6 border-t border-gray-200 flex justify-end space-x-3" }, [
                        createVNode("button", {
                          onClick: toggleStatus,
                          class: "bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, toDisplayString(__props.packageUnit.is_active ? "Deactivate" : "Activate"), 1),
                        createVNode(unref(Link), {
                          href: _ctx.route("admin-keuangan.master-package-units.edit", __props.packageUnit.id),
                          class: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sage-600 hover:bg-sage-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage-500"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Edit Package Unit ")
                          ]),
                          _: 1
                        }, 8, ["href"]),
                        createVNode("button", {
                          onClick: ($event) => showDeleteModal.value = true,
                          class: "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        }, " Delete ", 8, ["onClick"])
                      ])
                    ])
                  ])
                ])
              ]),
              createVNode(AlertDialog, {
                show: showDeleteModal.value,
                title: "Delete Package Unit",
                message: `Are you sure you want to delete package unit '${__props.packageUnit.code}'?`,
                "confirm-text": "Delete",
                "cancel-text": "Cancel",
                onConfirm: deleteUnit,
                onCancel: ($event) => showDeleteModal.value = false
              }, null, 8, ["show", "message", "onCancel"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Admin/AdminKeuangan/MasterPackageUnits/Show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
